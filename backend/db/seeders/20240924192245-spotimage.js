// 'use strict';

// const { SpotImage } = require('../models');

// let options = {};
// if (process.env.NODE_ENV === 'production') {
//   options.schema = process.env.SCHEMA;
// }

// const seedData = [
//   {
//     spotId: 1,
//     url: 'https://metricon.imgix.net/gallery/2023/Palisades-Craigburn-Farm/metricon_proofgallery_001_edit_3.jpg?auto=format%2Ccompress&w=1280',
//     preview: true,
//   },
//   {
//     spotId: 1,
//     url: 'https://metricon.imgix.net/gallery/2023/Palisades-Craigburn-Farm/metricon_proofgallery_001_edit_3.jpg?auto=format%2Ccompress&w=1280',
//     preview: false,
//   },
//   {
//     spotId: 1,
//     url: 'https://metricon.imgix.net/gallery/2023/Palisades-Craigburn-Farm/metricon_proofgallery_001_edit_3.jpg?auto=format%2Ccompress&w=1280',
//     preview: false,
//   },
//   {
//     spotId: 1,
//     url: 'https://metricon.imgix.net/gallery/2023/Palisades-Craigburn-Farm/metricon_proofgallery_001_edit_3.jpg?auto=format%2Ccompress&w=1280',
//     preview: false,
//   },
//   {
//     spotId: 1,
//     url: 'https://metricon.imgix.net/gallery/2023/Palisades-Craigburn-Farm/metricon_proofgallery_001_edit_3.jpg?auto=format%2Ccompress&w=1280',
//     preview: false,
//   },
//   {
//     spotId: 2,
//     url: 'https://metricon.imgix.net/gallery/2023/Glendale-Marsden-Park/Glendale-37-Yale-Facade.jpg?auto=format%2Ccompress&w=1280',
//     preview: true,
//   },
//   {
//     spotId: 2,
//     url: 'https://metricon.imgix.net/gallery/2023/Glendale-Marsden-Park/Glendale-37-Yale-Facade.jpg?auto=format%2Ccompress&w=1280',
//     preview: false,
//   },
//   {
//     spotId: 2,
//     url: 'https://metricon.imgix.net/gallery/2023/Glendale-Marsden-Park/Glendale-37-Yale-Facade.jpg?auto=format%2Ccompress&w=1280',
//     preview: false,
//   },
//   {
//     spotId: 2,
//     url: 'https://metricon.imgix.net/gallery/2023/Glendale-Marsden-Park/Glendale-37-Yale-Facade.jpg?auto=format%2Ccompress&w=1280',
//     preview: false,
//   },
//   {
//     spotId: 2,
//     url: 'https://metricon.imgix.net/gallery/2023/Glendale-Marsden-Park/Glendale-37-Yale-Facade.jpg?auto=format%2Ccompress&w=1280',
//     preview: false,
//   },
// ];

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     options.tableName = 'SpotImages'; 
//     await queryInterface.bulkInsert(options.tableName, seedData, options);
//   },

//   async down(queryInterface, Sequelize) {
//     options.tableName = 'SpotImages'; 
//     const Op = Sequelize.Op;
//     const deleteConditions = [];

//     for (const image of seedData) {
//       deleteConditions.push({
//         spotId: image.spotId,
//         url: image.url,
//       });
//     }

//     return queryInterface.bulkDelete(
//       options.tableName,
//       { [Op.or]: deleteConditions }, 
//       options 
//     );
//   },
// };



// // /** @type {import('sequelize-cli').Migration} */
// // module.exports = {
// //   async up(queryInterface, Sequelize) {
// //     options.tableName = 'SpotImages';
// //     await queryInterface.bulkInsert(options.tableName, seedData, options);
// //   },

// //   async down(queryInterface, Sequelize) {
// //     options.tableName = 'SpotImages';
// //     const Op = Sequelize.Op;
// //     await queryInterface.bulkDelete(options.tableName, {
// //       [Op.or]: seedData.map(image => ({
// //         spotId: image.spotId,
// //         url: image.url,
// //       })),
// //     }, options);
// //   },
// // };



// // /** @type {import('sequelize-cli').Migration} */
// // module.exports = {
// //   async up(queryInterface, Sequelize) {
// //     await SpotImage.bulkCreate(seedData, { validate: true });
// //   },

// //   async down(queryInterface, Sequelize) {
// //     options.tableName = 'SpotImages';
// //     const Op = Sequelize.Op;
// //     return queryInterface.bulkDelete('SpotImages', {
// //       options,
// //       url: { [Op.in]: seedData.map(image => image.url) },
// //     });
// //   },
// // };
