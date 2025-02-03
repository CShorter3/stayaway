// 'use strict';

// const { Spot } = require('../models');

// const seedData = [
//   {
//     ownerId: 2,
//     address: '124 Gatlin Way',
//     city: 'Sewanee',
//     state: 'Tennesee',
//     country: 'USA',
//     lat: '144.99',
//     lng: '-93.90',
//     name: 'Tilt Temple',
//     description: 'Tilt House is an architectural marvel that plays with balance, perception, and space. Designed to challenge the senses, its asymmetrical walls and slanted floors create a surreal yet surprisingly comfortable living experience. Every room is an artistic illusion, with tilted windows that frame the sky in unexpected ways and furniture designed to match the home’s unique angles.',
//     price: 123,
//   },
//   {
//     ownerId: 3,
//     address: '3505 Spenard Rd',
//     city: 'Anchorage',
//     state: 'Alaska',
//     country: 'USA',
//     lat: '61.188339',
//     lng: '-149.908256',
//     name: 'Cold Abode',
//     description: 'Nestled in the vibrant Spenard neighborhood, Cold Abode offers a warm and inviting stay amidst Alaska’s breathtaking landscapes. This modern yet rustic retreat is perfect for those looking to experience the beauty of Anchorage while enjoying comfort and convenience.',
//     price: 250,
//   },
//   ,
// ]

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
//     await Spot.bulkCreate(seedData);
//   },

//   async down (queryInterface, Sequelize) {
//     /**
//      * Add commands to revert seed here.
//      *
//      * Example:
//      * await queryInterface.bulkDelete('People', null, {});
//      */
//     for (const spot of seedData) {
//       await Spot.destroy({ where: spot });
//     }
//   }
// };

