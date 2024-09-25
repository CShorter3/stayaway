const router = require('express').Router();  // import server and route handling functionality
const { Spot, Review, SpotImage, User, Sequelize } = require('../../db/models'); // import relevant models

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// restoreUser verifies token on request
// requireAuth directs an (un)authorized request
const { restoreUser, requireAuth } = require('../../utils/auth'); 

// user must be authenticated to create a spot

// create post function 
// path should use api/spots, take async callback function taking req, res
// destrucure column names from reqest body
// create try catch logic 
//       try
//       initialize new resource using Model.create({}) to variable
//       send 201 redirect with new user
//       catch


/**** Validate Create Spot POST body ****/
const validateSpotData = [
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Street address is required'),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage('City is required'),
  check('state')
    .exists({ checkFalsy: true })
  .withMessage('State is required'),
    check('country')
  .exists({ checkFalsy: true })
    .withMessage('Country is required'),
  check('lat')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must range -90 to 90'),
  check('lng')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must range -180 to 180'),
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage('Name must be less than 50 characters'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required'),
  check('price')
    .isFloat({ gt: 0 })
    .withMessage('Price per day must be a positive number'),
  handleValidationErrors
];

/**** Create spot POST ****/
router.post('/',
  restoreUser, requireAuth, validateSpotData,
  async (req, res, next) => {
    
  try{

    const { address, city, state, country, lat, lng, name, description, price, createdAt, updatedAt } = req.body; // missing id, ownerId
    const { user } = req;
    const userId = user.id;
 
    //only authenticated users can create a new spot listing
    if(!user){  
      return res.status(404).json({
        message: "Authentication required"
      });
    }

    const newSpot = await Spot.create({
      id: userId,
      ownerId: userId,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      createdAt,
      updatedAt
    });
    
    return res.status(201).json(newSpot);

  } catch(error) {
    next(error);
  }
});

/**** GET all spots ****/
router.get('/',
    async (req, res, next) => {

    try {
      const allSpots = await Spot.findAll({
        attributes: [ 
          'id', 'ownerId', 'address', 'city', 'state', 'country',
          'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt',
          [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgRating'], // Calculate average rating
        ],
        include: [
          {
            model: SpotImage, // Include associated images
            attributes: ['url'], // Get image URL
            as: 'previewImage' // Alias for easier access
          }
        ]
      });
      
      const allSpotsArray = allSpots.map(spot => ({
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        avgRating: parseFloat(spot.get('avgRating')).toFixed(1) || null, // Format average rating
        previewImage: spot.previewImage || null 
      }));

      return res.status(200).json({ Spots: allSpotsArray });
    
    } catch (error) {
        next(error);
    }
});

/**** GET all spots of current user ****/
router.get('/current', 
  restoreUser, requireAuth,
  async(req, res, next) => {
  
  try {
    const {user} = req;

    // Restore user ensures user is loggedin
    if(user){
      const userId = user.id;

      // Capture user's spot listings + associated preview images 
      const userSpots = await Spot.findAll({
        where: { ownerId: userId },
        include: [                      // Fetch images
          {
            model: SpotImage,
            as: 'previewImage',
            // where: {preview: true},  // Include only where there are pics
            required: false,            // without voiding query if no pics
            attributes: ['url'],
          },
          {
            model: Review,              // Fetch reviews for forthcoming aggregation
            attributes: ['id']
          }
        ],
        attributes: [                   // DELETE. not listing any would pull all atts? listing some will pull that exclusive list of atts? 
          'id', 'ownerId', 'address', 'city', 'state', 'country',
          'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt',
          [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgRating']
        ] 
      });

      // Capture spots in array indexes
      const userSpotsArray = userSpots.map(userSpots => ({
        id: userSpots.id,
          ownerId: userSpots.ownerId,
          address: userSpots.address,
          city: userSpots.city,
          state: userSpots.state,
          country: userSpots.country,
          lat: userSpots.lat,
          lng: userSpots.lng,
          name: userSpots.name,
          description: userSpots.description,
          price: userSpots.price,
          createdAt: userSpots.createdAt,
          updatedAt: userSpots.updatedAt,
          avgRating: parseFloat(userSpots.get('avgRating')).toFixed(1) || null,
          previewImage: userSpots.previewImage || null
      }));
      
      // Encapsulate spots in object
      return res.status(200).json({ Spots: userSpotsArray });
     } else {
       return res.status(401).json({ message: "Authentication required"});
     }
  } catch (error){                    // Pass query or response error for handdling 
    next(error); 
  }
});

/*** GET spot details on id */
router.get('/:spotId',
  async(req, res, next) => {

  // get spot id to parse
  const { spotId } = req.params;

  try {
    // Capture spot deatils including associated images and owner details
    const spot = await Spot.findOne({
      where: { id: spotId },
      include: [
        { 
          model: SpotImage,
          attributes: ['id', 'url', 'preview']
        },
        {
          model: User,
          as: 'Owner',
          attributes: ['id', 'firstName', 'lastName']
        }
      ]
    });

    // Return 404 if spot not found
    if(!spot){
      return res.status(404).json({
        message: "Spot couldn't be found"
      });
    }

    // Create aggregate columns on query 
    const aggregateStats = await Review.findOne({
      where: { spotId: spot.id },
      attributes: [
        [Sequelize.fn('COUNT', Sequelize.col('Review.id')), 'numReviews'],
        [Sequelize.fn('AVG', Sequelize.col('stars')), 'avgStarRating']
      ]
    });

    // Spot details derived from Spots, and spot associations
    // with SpotImages, Reviews, and Users.
    const detailedResponse = {
      id: spot.id,
      ownerId: spot.ownerId,
      address: spot.address,
      city: spot.city,
      state: spot.state,
      country: spot.country,
      lat: spot.lat,
      lng: spot.lng,
      name: spot.name,
      description: spot.description,
      price: spot.price,
      createdAt: spot.createdAt,
      updatedAt: spot.updatedAt,
      numReviews: parseInt(aggregateStats.numReviews) || 0,                    // aggregate
      avgStarRating: parseFloat(aggregateStats.avgStarRating).toFixed(1) || 0, // aggregate
      SpotImages: spot.SpotImages,                                             // array
      Owner: {                                                                 // alias assocation
        id: spot.Owner.id,
        firstName: spot.Owner.firstName,
        lastName: spot.Owner.lastName
      }
    };

    return res.status(200).json(detailedResponse);

  } catch (error) {
    next(error);
  }
  
});


module.exports = router;