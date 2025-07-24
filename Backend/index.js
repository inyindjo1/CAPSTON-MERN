import express from 'express'; /* Import Express framework */
import mongoose from 'mongoose'; /* Import Mongoose for MongoDB interaction */
import dotenv from 'dotenv'; /* Load environment variables from .env file */
import cors from 'cors'; /* Import CORS middleware */
import User from './User.js'; /* Import the User model */

dotenv.config(); /* Load environment variables */

const app = express(); /* Create an Express app instance */
const PORT = process.env.PORT || 8080; /* Set the port for the server */

app.use(cors()); /* Enable CORS for all requests */
app.use(express.json()); /* Parse incoming JSON request bodies */

// Function to connect to MongoDB
async function connectToMongoDB() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URL); /* Connect using MONGO_URL from .env */
    console.log(' Connected to MongoDB!');
  } catch (error) {
    console.error(' MongoDB connection error:', error.message); /* Log any connection errors */
    process.exit(1); /* Exit if connection fails */
  }
}
await connectToMongoDB(); /* Call the connection function */

// Registration route
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body; /* Destructure username and password from request body */
  try {
    const existingUser = await User.findOne({ username }); /* Check if username already exists */
    if (existingUser) {
      console.log(` Username already taken: ${username}`);
      return res.status(409).json({ error: 'Username already exists' }); /* Return 409 conflict if taken */
    }

    const newUser = new User({ username, password }); /* Create new user document */
    await newUser.save(); /* Save user to MongoDB */
    console.log(` Registered: ${username}, ID: ${newUser._id}`);
    res.status(201).json({ message: 'User registered successfully', userId: newUser._id }); /* Success response */
  } catch (error) {
    console.error(' Registration error:', error.message); /* Log registration error */
    res.status(500).json({ error: 'Server error' }); /* Return 500 on failure */
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body; /* Destructure credentials from request body */
  try {
    const user = await User.findOne({ username }); /* Find user by username */
    if (!user || user.password !== password) {
      console.log(` Login failed for user: ${username}`);
      return res.status(401).json({ error: 'Invalid credentials' }); /* Return 401 if invalid */
    }

    console.log(` Login successful for user: ${username}`);
    res.json({ message: 'Login successful', userId: user._id }); /* Success response */
  } catch (error) {
    console.error(' Login error:', error.message); /* Log login error */
    res.status(500).json({ error: 'Server error' }); /* Return 500 on failure */
  }
});

// This starts the server
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`); /* Log server start */
});
