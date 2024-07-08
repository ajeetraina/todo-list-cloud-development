// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// exports.register = async (req, res) => {
//   const { username, password } = req.body;
//   console.log('Registration request received:', { username });
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ username, password: hashedPassword });
//     await user.save();
//     console.log('User registered successfully:', { username });
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     console.error('Registration error:', error.message);
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.login = async (req, res) => {
//   const { username, password } = req.body;
//   console.log('Login request received:', { username });
//   try {
//     const user = await User.findOne({ username });
//     if (!user) {
//       console.error('Login error: Invalid credentials');
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       console.error('Login error: Invalid credentials');
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     console.log('User logged in successfully:', { username });
//     res.json({ token });
//   } catch (error) {
//     console.error('Login error:', error.message);
//     res.status(500).json({ error: error.message });
//   }
// };


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

exports.register = async (req, res) => {
  const { username, password } = req.body;
  console.log('Registration request received:', { username });
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    console.log('User registered successfully:', { username });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  console.log('Login request received:', { username });
  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.error('Login error: Invalid credentials');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error('Login error: Invalid credentials');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Ensure the JWT secret is available
    if (!process.env.JWT_SECRET) {
      console.error('Login error: JWT_SECRET is not defined');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('User logged in successfully:', { username });
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ error: error.message });
  }
};
