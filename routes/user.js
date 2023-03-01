const express = require('express')
const router = express.Router()

const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const authMiddleware = require('../middleware/authmiddleware')
const User = require('../models/user')

router.patch(
  '/:id',
  authMiddleware,
  [
    // Validate input
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ],
  async (req, res) => {
    try {
      // Check if input is valid
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      // Validate user
      const user = await User.findOne({ _id: req.params.id })
      if (!user) {
        return res.status(401).json({ message: 'User not found' })
      }

      // Check if user is authorized to update
      if (req.params.id !== req.user.id) {
        return res.status(401).json({ message: 'Unauthorized to update user' })
      }

      // Update user
      const updates = {
        email: req.body.email || user.email,
        password: req.body.password
          ? await bcrypt.hash(req.body.password, 10)
          : user.password,
      }

      const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, {
        new: true,
      })

      res.status(200).json(updatedUser)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
)

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    // validate user
    const user = await User.findOne({ _id: req.params.id })
    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }

    // check if user is authorized to delete
    if (req.params.id !== req.user.id) {
      return res.status(401).json({ message: 'Unauthorized to delete user' })
    }

    // delete user
    await User.findOneAndDelete({ _id: req.params.id })
    res.status(200).json({ message: 'user has been deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router

// // todo: fix update and delete routes
