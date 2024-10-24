// backend/routes/index.js

const express = require('express');
const router = express.Router();
const apiRouter = require('./api');

// trouble shoot deployment
app.get('/', (req, res) => {
  res.send('Hello World!');
});


router.use('/api', apiRouter);

//dumby route, test express, db, server 
router.get('/hello/world', function(req, res) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('Hello World!');
});

// server generates and verifies unique csrf token at each session
// prepares the client to include such token in future requests
router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    'XSRF-Token': csrfToken
  });
});

module.exports = router;
