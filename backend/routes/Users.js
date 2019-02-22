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
      if( users ) {
        res.json(users);
      } else {
        res.status(404).json(0);
      }
    })
    .catch( (err) => {
      res.status(500).json({ error: "User information could not be retrieved." });
    });
  // end-getByAuth
});

// Get a user by userId
router.get( '/:id', (req, res) => {
  const { id } = req.params;

  user.get(id)
    .then( (users) => {
      if( users )
      {  
        res.json(users);
      }
      else {
        res.status(404).json(0);
      }
    })
    .catch( (err) => {
      res.status(500).json({ error: "User information could not be retrieved." });
    });
  // end-get
});

// Post new user data
router.post( '/add', (req, res) => {
  const newUserData = req.body;

  // Check for empty fields:
  if( newUserData.authId && newUserData.email ){
    user.insert(newUserData)
      .then( (newUser) => {
        res.json(newUser);
      })
      .catch( (err) => {
        res.status(500).json({ error: "Could not add new user." });
      });
    // end-user.insert
  } else {
    res.status(400).json({ error: "Missing authId or Email." });
  }

});


/* ---------- Export ---------- */
module.exports = router;