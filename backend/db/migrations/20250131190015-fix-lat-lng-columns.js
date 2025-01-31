'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Spots', 'lat', {
      type: Sequelize.DECIMAL,
      allowNull: true, // set to true or false based on your model requirement
    });
    await queryInterface.changeColumn('Spots', 'lng', {
      type: Sequelize.DECIMAL,
      allowNull: true, // set to true or false based on your model requirement
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Spots', 'lat', {
      type: Sequelize.DECIMAL,
      allowNull: false, // revert to the previous state if necessary
    });
    await queryInterface.changeColumn('Spots', 'lng', {
      type: Sequelize.DECIMAL,
      allowNull: false, // revert to the previous state if necessary
    });
  },
};

