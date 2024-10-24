// backend/config/index.js

//console.log('ENV =====>', process.env);

// read and export app's enviromental variables
module.exports = {
  environment: process.env.NODE_ENV || 'development',         // determine runtime enviroment eg. dev | prod | test
  port: process.env.PORT || 8000,                             // determine associated enviroments port otherwise default 
  dbFile: process.env.DB_FILE,                                // declare db to connect with app
  jwtConfig: {                                                // provide json webtoken settings used for authentication and authorization
    secret: process.env.JWT_SECRET,                           // jwt consists of header.payload.secret to be signed and verified
    expiresIn: process.env.JWT_EXPIRES_IN
  }
};