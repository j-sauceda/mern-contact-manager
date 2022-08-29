// load env variables
const dotenv = require('dotenv').config();

// load libraries
const colors = require('colors');
const { errorHandler } = require('./middleware/errorMiddleware');
const express = require('express');
const path = require('path');
const port = process.env.PORT || 5000;

// DB connection
const connectDB = require('./config/db');
connectDB();

// initialize server
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// frontend route for production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

// error handler
app.use(errorHandler);

// start server
app.listen(port, () => console.log(`Server running on port ${port}`));