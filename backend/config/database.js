// backend/config/database.js 

const config = require('./index');

// console.log('development dbFile =====>', config.dbFile);
// console.log('production DB-URL =====>', process.env.DATABASE_URL);

/* load database config enviroment variables from .env to config/index.js 
   allowing app to determine scope of and configure the runtime enviroment */

module.exports = {
  development: {
    storage: config.dbFile,
    dialect: "sqlite",
    seederStorage: "sequelize",
    logQueryParameters: true,
    typeValidation: true,
    logging: console.log,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    define: {
      schema: process.env.SCHEMA
    },
    logging: console.log,
  }
};
