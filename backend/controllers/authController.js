const User = require('../models/User');
const jwt = require('jsonwebtoken');

const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

exports.signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const newUser = new User({ email, password });
    await newUser.save();

    const token = createToken(newUser._id);
    res.status(201).json({ token, user: { email: newUser.email } });
  } catch (err) {
    res.status(500).json({ error: 'Signup failed', details: err.message });
  }
};

exports.signinUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = createToken(user._id);
    res.status(200).json({ token, user: { email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Signin failed', details: err.message });
  }
};
