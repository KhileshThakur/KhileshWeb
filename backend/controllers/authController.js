import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1. Check if user exists
    const user = await User.findOne({ username });

    // 2. Check if password matches
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        token: generateToken(user._id), // <--- THIS IS YOUR KEY
      });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};