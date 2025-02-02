// 'use strict';

// const { Review } = require('../models');

// let options = {};
// if (process.env.NODE_ENV === 'production') {
// 	options.schema = process.env.SCHEMA;
// }

// const seedData = [
//   {
//     spotId: 1,
//     userId: 4,
//     review: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Nec egestas cras taciti aenean ligula ex turpis amet vulputate sem sollicitudin scelerisque justo pretium nibh scelerisque fermentum lectus arcu.',
//     stars: 4
//   },
//   {
//     spotId: 1,
//     userId: 1,
//     review: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Nec egestas cras taciti aenean ligula ex turpis amet vulputate sem sollicitudin scelerisque justo pretium nibh scelerisque fermentum lectus arcu. ipsum odor amet, consectetuer adipiscing elit.',
//     stars: 3
//   },
//   {
//     spotId: 2,
//     userId: 3,
//     review: 'Lorem ipsum odor amet, consecteitudin scelerisque justo pretium nibh scelerisque fermentum lectus arcu.',
//     stars: 5
//   },
//   {
//     spotId: 2,
//     userId: 3,
//     review: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Nec egestas cras taciti aenean ligula ex turpis amet vulputate sem sollicitudin sceleri justo pretium nibh scelerisque fermentum lectus arcu.',
//     stars: 4
//   },
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
//     await Review.bulkCreate(seedData, {validate: true});
//   },

//   async down (queryInterface, Sequelize) {
//     /**
//      * Add commands to revert seed here.
//      *
//      * Example:
//      * await queryInterface.bulkDelete('People', null, {});
//      */
//   options.tableName = 'Reviews';
//   const Op = Sequelize.Op;
//   return queryInterface.bulkDelete(
//     options,
//     review: { [Op.in]: seedData.map(image => image.url) },

//   )

//   }
// };
