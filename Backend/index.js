// User.js
import express from 'express';
// Backend/index.js
import User from './User.js';

const router = express.Router();

// Register endpoint
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const newUser = new User({ username, password }); // NOTE: Hash password in real apps
    await newUser.save();
    res.status(201).json({ message: 'Registered successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
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

export default router;
