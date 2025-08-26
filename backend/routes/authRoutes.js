const express = require('express');
const { signupUser, signinUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/signup', signupUser);
router.post('/signin', signinUser);

router.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: 'You are authenticated', user: req.user });
});

module.exports = router;
