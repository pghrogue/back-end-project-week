// Base requires:
const express = require('express');
const router = express.Router();

// App requires:
const user = require('../data/helpers/userModel');

// Middleware
const auth0 = require('../middleware/autho');

/* ---------- Endpoints: ---------- */
// Default route
router.get( '/', (req, res) => {
  res.json({ message: "Api online" });
});

// Get a single user by authId
router.get( '/getByAuth/:id', (req, res) => {
  const { id } = req.params;

  console.log("in router get");
  user.getByAuth(id)
    .then( (users) => {
      //console.log("note: ", note);
      res.json(users);
    })
    .catch( (err) => {
      res.status(500).json({ error: `Note ${id} could not be found.` });
    });
  // end-getByAuth
});

// Get a user by userId
router.get( '/:id', (req, res) => {
  const { id } = req.params;

  user.get(id)
    .then( (users) => {
      res.json(users);
    })
    .catch( (err) => {
      res.status(500).json({ error: `Note ${id} could not be found.` });
    });
  // end-get
});


/* ---------- Export ---------- */
module.exports = router;