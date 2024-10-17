const { sequelize } = require('./db/models');         // pulls squelize instance from models directory

// ensure targeted schema is available, creating it if not found
sequelize.showAllSchemas({ logging: false }).then(async (data) => {
  if (!data.includes(process.env.SCHEMA)) {
    await sequelize.createSchema(process.env.SCHEMA);
  }
});