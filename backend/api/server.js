// Base Requires:
const express = require('express');

// Middleware Requires:
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

// Route requires:
const noteRouter = require('../routes/Notes');

// Server:
const server = express();
const PORT = process.env.PORT || 1234;


/* ---------- Middleware: ---------- */
server.use(
  express.json(),
  morgan('dev'),
  helmet(),
  cors()
);


/* ---------- Routes: ---------- */
server.use('/note', noteRouter);

// Test base route:
server.get('/', (req, res) => {
  res.status(200).json({ api: "running!" });
});



module.exports = server;