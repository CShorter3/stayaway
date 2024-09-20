'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
  console.log('SCHEMA =====>', options.schema);
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      { tableName: 'Users', schema: options.schema },
      'firstName',
      {
        type: Sequelize.STRING(30),
        allowNull: false,
        validate: { len: [1, 30] },
      }
    );

    await queryInterface.addColumn(
      { tableName: 'Users', schema: options.schema },
      'lastName',
      {
        type: Sequelize.STRING(30),
        allowNull: false,
        validate: { len: [1, 30] },
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'firstName', options);
    await queryInterface.removeColumn('Users', 'lastName', options);
  }
};
