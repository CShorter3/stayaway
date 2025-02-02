// 'use strict';

// const bcrypt = require('bcryptjs');
// const { User } = require('../models');

// const { Op } = require('sequelize');

// const userSeedData = [
//   {
//     firstName: 'Demo',
//     lastName: 'Lition',
//     email: 'demo@user.io',
//     username: 'Demo-lition',
//     hashedPassword: bcrypt.hashSync('password'),
//   },
//   {
//     firstName: 'Karl',
//     lastName: 'Malone',
//     email: 'user1@gmail.com',
//     username: 'KMalone',
//     hashedPassword: bcrypt.hashSync('password'),
//   },
//   {
//     firstName: 'Larry',
//     lastName: 'Bird',
//     email: 'user2@gmail.com',
//     username: 'LBird',
//     hashedPassword: bcrypt.hashSync('password'),
//   },
//   {
//     firstName: 'Antwan',
//     lastName: 'Randle El',
//     email: 'user4@gmail.com',
//     username: 'Aelman',
//     hashedPassword: bcrypt.hashSync('password'),
//   },
//   {
//     firstName: 'Jayden',
//     lastName: 'Daniels',
//     email: 'user5@gmail.com',
//     username: 'TheKid',
//     hashedPassword: bcrypt.hashSync('password'),
//   }
// ];

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up (queryInterface, Sequelize) {
//     /**
//      * Add seed commands here.
//      *
//      * Example:
//      * await queryInterface.bulkInsert('People', [{
//      *   name: 'John Doe',
//      *   isBetaMember: false
//      * }], {});
//     */
//     await User.bulkCreate(userSeedData, { validate: true });
//   },

//   async down (queryInterface, Sequelize) {
//     /**
//      * Add commands to revert seed here.
//      *
//      * Example:
//      * await queryInterface.bulkDelete('People', null, {});
//      */

//     // like 40 mins were spent here trying to make this
//     // a cool self-building scalable query but sequelize
//     // is really just terrible in pretty much every
//     // conceivable way so we're stuck with this
//     for (const user of userSeedData) {
//       await User.destroy({
//         where: {
//           [Op.and]: [
//             { username: user.username },
//             { email: user.email },
//           ]
//         }
//       });
//     };
//   }
// };
