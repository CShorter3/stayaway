const express = require('express');               // backend web app framework for node
require('express-async-errors');                  // handle async route handlers
const morgan = require('morgan');                 // log server req and res info
const cors = require('cors');                     // cross-origin request provision
const csurf = require('csurf');                   // csrf protection
const helmet = require('helmet');                 // common security protection
const cookieParser = require('cookie-parser');    // parses cookies from requests
const { ValidationError } = require('sequelize');

// check, in config file, if enviroment variable is in production
const { environment } = require('./config');
const isProduction = environment === 'production'; 

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

// Security Middleware
if (!isProduction) {
  // enable cors only in development
  app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  })
);

// Set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true
    }
  })
);

const routes = require('./routes'); // import router routes after all middlewares

// ...

app.use(routes); // Connect all the routes

// catch unhandled requests that don't match any defined routes in app
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = { message: "The requested resource couldn't be found." };
  err.status = 404;
  next(err);  // pass error sequelize formatting 
});

// process sequelize errors and pass to 
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    let errors = {};
    for (let error of err.errors) {
      errors[error.path] = error.message;
    }
    err.title = 'Validation error';
    err.errors = errors;
  }
  next(err);
});

// format errors without passing error
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack
  });
});

module.exports = app;
