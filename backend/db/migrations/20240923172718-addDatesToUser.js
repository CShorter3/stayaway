'use strict';

const { sequelize } = require('../models');

const options = {schema: process.env.SCHEMA};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // string table name OR object with schema and table name in it
    await queryInterface.addColumn({
      tableName: 'Users',
      schema: options.schema,
    }, 'createdAt', {type: Sequelize.DATE}) // default at migration?
  
    await queryInterface.addColumn({
      tableName: 'Users',
      schema: options.schema,
    }, 'updatedAt', {type: Sequelize.DATE}) // default at migration?
  },

  

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn({
      tableName: 'Users',
      schema: options.schema,
    }, 'createdAt')

    await queryInterface.removeColumn({
      tableName: 'Users',
      schema: options.schema,
    }, 'updatedAt')
  }
};
