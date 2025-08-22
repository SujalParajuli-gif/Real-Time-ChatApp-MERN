// Importing required modules
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Initialize dotenv to load environment variables
dotenv.config();

// Initialize express and set up server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection setup
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Define User and ChatHistory Models

// User Schema
const User = mongoose.model('User', new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
}));

// Chat History Schema
const ChatHistory = mongoose.model('ChatHistory', new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  message: String,
  timestamp: { type: Date, default: Date.now }
}));

// User registration
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // Encrypt password
  
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();
  res.status(201).send("User Registered");
});

// User login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).send("User not found");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(400).send("Invalid password");
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Socket.IO for real-time communication
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('sendMessage', async (data) => {
    const { userId, message } = data;
    const newMessage = new ChatHistory({ userId, message });
    await newMessage.save(); // Save message to MongoDB

    // Emit message to all connected clients
    io.emit('newMessage', { userId, message });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
