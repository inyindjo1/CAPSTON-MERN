import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import User from './User.js'; // Make sure you have this file and schema

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
async function connectToMongoDB() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URL);
    console.log(' Successfully connected to MongoDB!');
  } catch (error) {
    console.error(' MongoDB connection error:', error.message);
    process.exit(1);
  }
}
await connectToMongoDB();

// Root Route
app.get('/', (req, res) => {
  res.send(' Welcome to the Job Finder API!');
});

//  Register Route
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log(` Username already taken: ${username}`);
      return res.status(409).json({ error: 'Username already exists' });
    }

    const newUser = new User({ username, password });
    await newUser.save();
    console.log(` Registered: ${username}, ID: ${newUser._id}`);
    res.status(201).json({ message: 'User registered successfully', userId: newUser._id });
  } catch (error) {
    console.error(' Registration error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
