const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

router.post(
  '/login',
  [
    // Validate input
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ],
  async (req, res) => {
    // Check if input is valid
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      // Find user by email
      const user = await User.findOne({ email: req.body.email })
      if (!user) {
        return res.status(401).json({ message: 'Incorrect email' })
      }

      // Compare password
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      )
      if (!validPassword) {
        return res.status(401).json({ message: 'Incorrect password' })
      }

      // Create and send JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '4h',
      })
      res.status(200).json({ token })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
)

router.post(
  '/register',
  [
    // Validate input
    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  async (req, res) => {
    // Check if input is valid
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      // Check for existing User
      const exists = await User.findOne({ email: req.body.email })
      if (exists) {
        return res.status(409).json({ message: 'Email already registered' })
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(req.body.password, 10)

      // Create user
      const user = await User.create({
        email: req.body.email,
        password: hashedPassword,
      })

      // Create and send JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '4h',
      })

      res.status(201).json({ token })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
)

router.post('/test', (req, res) => {
  res.json(req.headers)
})

module.exports = router
