import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import User from './User.js';

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

// Home route
app.get('/', (req, res) => {
  console.log(' GET / called');
  res.send(' Welcome to Job Finder API');
});

// Register user
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  console.log(' Registering:', username);

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log(' Username already exists');
      return res.status(400).json({ error: 'Username already exists' });
    }

    const newUser = new User({ username, password });
    await newUser.save();
    console.log(' Registered:', username);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(' Registration error:', err.message);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login user
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(' Login attempt:', username);

  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      console.log(' Invalid credentials for:', username);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log(' Login successful:', username);
    res.json({ message: 'Login successful' });
  } catch (err) {
    console.error(' Login error:', err.message);
    res.status(500).json({ error: 'Login failed' });
  }
});

app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
