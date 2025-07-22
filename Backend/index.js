import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './User.js';
; // or './User.js' if not moved

dotenv.config();
const app = express();
app.use(express.json());

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: 'Registered successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.json({ message: 'Login successful!' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// 🔥 Start server & connect to MongoDB
const PORT = process.env.PORT || 8080;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));
