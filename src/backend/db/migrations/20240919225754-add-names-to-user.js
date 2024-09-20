'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
  console.log('SCHEMA =====>', options.schema);
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Sequelize.query('SET search_path = airdb, $user, public');

    await queryInterface.addColumn('Users', 'firstName', {
      type: Sequelize.STRING(30),
      allowNull: false,
      validate: { len: [1, 30] },
    }, options);

    await queryInterface.addColumn('Users', 'lastName', {
      type: Sequelize.STRING(30),
      allowNull: false,
      validate: { len: [1, 30] },
    }, options);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'firstName', options);
    await queryInterface.removeColumn('Users', 'lastName', options);
  }
};
