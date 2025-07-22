import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import User from './User.js'; // Make sure this path is correct

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

async function connectToMongoDB() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URL);
    console.log(' Connected to MongoDB!');
  } catch (error) {
    console.error(' MongoDB connection error:', error.message);
    process.exit(1);
  }
}
await connectToMongoDB();

// REGISTER
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

// LOGIN 
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      console.log(` Login failed for user: ${username}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log(` Login successful for user: ${username}`);
    res.json({ message: 'Login successful', userId: user._id });
  } catch (error) {
    console.error(' Login error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
