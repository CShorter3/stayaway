// backend/routes/index.js

const express = require('express');
const router = express.Router();
const apiRouter = require('./api');

//trouble shoot deployment
router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.use('/api', apiRouter);

// static routes - serves react build files in prod
if (process.env.NODE_ENV === 'production'){
  const path = require('path');
  // Serve the frontend's index.html file at the root route
  router.get('/', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname,'../../frontend', 'dist', 'index.html')
    );
  });

  // serve the static assets in the frontend's build folder
  router.use(express.static(path.resolve("../frontend/dist")));

  // serve the frontend's index.html file at all other routes NOT starting with /api
  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, '../../frontend', 'dist', 'index.html')
    );
  });
}

// Add XSRF-TOKEN cookie in development
if(process.env.NODE_ENV !== 'production'){
  router.get('/api/csrf/restore',
    (req, res) => {
      res.cookie('XSRF-TOKEN', req.csrfToken());
      return res.json({'XSRF-TOKEN': req.csrfToken()});
    }
  );
}

// //dumby route, test express, db, server 
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
