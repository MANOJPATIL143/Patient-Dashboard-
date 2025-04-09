const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
const cors = require("cors");
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboard');
const weightRoutes = require('./routes/weight');
const shipmentRoutes = require('./routes/shipments');
const medicationRoutes = require('./routes/medication');
const { initSocket } = require("./socket");

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const server = http.createServer(app);

// Enable CORS for all origins
app.use(cors());

// Middleware
app.use((req, res, next) => {
  if (req.method === 'GET') {
    return next();
  }
  express.json()(req, res, next);
});

const io = initSocket(server);


// Routes
app.use('/api/users', userRoutes); //userlist api here
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/weight', weightRoutes);
app.use('/api/shipments', shipmentRoutes);
app.use('/api/medication', medicationRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(200).send("Server is running");
})

server.listen(PORT, () => {
  console.log('Server is running on port 5000');
});


module.exports = { app };

