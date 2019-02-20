// Base requires:
const express = require('express');
const router = express.Router();

// App requires:
const notes = require('../data/helpers/userModel');

// Middleware
const auth0 = require('../middleware/autho');

/* ---------- Endpoints: ---------- */
// Default route
router.get( '/', (req, res) => {
  res.json({ message: "Api online" });
});


/* ---------- Export ---------- */
module.exports = router;