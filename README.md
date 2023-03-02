# Node.js API with JWT Authentication Template

This is a simple Node.js Express server with JSON Web Token (JWT) authentication built in. It can be used as a starting point for building RESTful APIs with Node.js and Express.

## Getting Started

To get started, clone the repository and install the dependencies:

```bash
git clone https://github.com/shravzzv/api-template.git
cd api-template
npm install
```

Create a .env file in the root directory with the following environment variables:

```.env
PORT=3000
JWT_SECRET=your-secret-key
MONGODB_URI=mongodb://localhost:27017/myapp
```

You can set the PORT to any available port number. JWT_SECRET is used to sign and verify JWT tokens. MONGODB_URI is used to connect to the MongoDB database.

Start the server:

```bash
npm run dev
```

The server will listen on the specified port.

## API Endpoints
The following API endpoints are available:

### Authentication
- POST /api/auth/login - Log in with email and password. Returns a JWT token.
- POST /api/auth/register - Register a new user with email and password. Returns a JWT token.

### Users
- PATCH /api/users/:id - Update a user by ID.
- DELETE /api/users/:id - Delete a user by ID.

All endpoints except authentication require a valid JWT token in the Authorization header.

## Dependencies
This template uses the following dependencies:

- Express - A fast and minimalist web framework for Node.js.
- bcrypt - A library for hashing passwords.
- dotenv - A library for loading environment variables from a .env file.
- express-validator - A library for validating input data.
- jsonwebtoken - A library for generating and verifying JSON Web Tokens.
- mongoose - An object modeling tool for MongoDB.
- morgan - A logging middleware for Express.
- nodemon - A utility that monitors any changes in your source code and automatically restarts your server.
