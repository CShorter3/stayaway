'use strict';

let options = {};

if(process.env.NODE_ENV === 'production'){
  if(!process.env.SCHEMA){
    throw new Error('SCHEMA environment variable not defined');
  }
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
//module.exports = {
//   async up (queryInterface, Sequelize) {
//     /**
//      * Add altering commands here.
//      *
//      * Example:
//      * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
//      */
//     await queryInterface.changeColumn('Spots', 'lat', {
//       type: Sequelize.DECIMAL,
//       allowNull: true,
//     });
//     await queryInterface.changeColumn('Spots', 'lng', {
//       type: Sequelize.DECIMAL,
//       allowNull: true, 
//     });
//   },

//   async down (queryInterface, Sequelize) {
//     /**
//      * Add reverting commands here.
//      *
//      * Example:
//      * await queryInterface.dropTable('users');
//      */
//     await queryInterface.changeColumn('Spots', 'lat', {
//       type: Sequelize.DECIMAL,
//       allowNull: false,
//     });
//     await queryInterface.changeColumn('Spots', 'lng', {
//       type: Sequelize.DECIMAL,
//       allowNull: false, 
//     });
//   }
// };

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      { tableName: 'Spots', schema: options.schema },
      'lat',
      {
        type: Sequelize.DECIMAL,
        allowNull: true,
      }
    );
    await queryInterface.changeColumn(
      { tableName: 'Spots', schema: options.schema },
      'lng',
      {
        type: Sequelize.DECIMAL,
        allowNull: true,
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      { tableName: 'Spots', schema: options.schema },
      'lat',
      {
        type: Sequelize.DECIMAL,
        allowNull: false, 
      }
    );
    await queryInterface.changeColumn(
      { tableName: 'Spots', schema: options.schema },
      'lng',
      {
        type: Sequelize.DECIMAL,
        allowNull: false,
      }
    );
  }
}