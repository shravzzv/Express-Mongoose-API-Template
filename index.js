const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
// Log requests using morgan
// Define a custom format string
const myFormat = ':status :method:url :response-time ms'
// Use the custom format string
app.use(morgan(myFormat))

// Use JSON body parser middleware
app.use(express.json())
app.use(cors())

// views
app.set('view engine', 'ejs')
app.set('views', './views')

// Connect to MongoDB
// mongoose.set('strictQuery', false)
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.error('Failed to connect to MongoDB:', err))

// Use auth routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/user', require('./routes/user'))

// Use root route
app.get('/', (req, res) => {
  res.render('index')
})

// Use environment variable for port
const port = process.env.PORT || 3000

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`))

// Handle uncaught exceptions and rejections
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err)
  process.exit(1)
})

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err)
  process.exit(1)
})
