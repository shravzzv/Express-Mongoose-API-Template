const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Authorization token missing' })
  }

  // Verify the token with the secret key
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid authorization token' })
    }

    // Set the decoded user object on the request
    req.user = decoded

    next()
  })
}

module.exports = authMiddleware
