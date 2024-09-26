const router = require('express').Router();
const { Review, Spot, User, ReviewImage, Booking, Sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

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

/**** GET current user's spots ****/
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

/*** EDIT a spot on id ****/
router.put('/:spotId', 
  restoreUser, requireAuth, validateSpotEdit, 
  async (req, res, next) => {
  const { user } = req;
  const userId = user.id;

  if (!user) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {  
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  if (userId !== spot.ownerId) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const { address, city, state, country, lat, lng, name, description, price } = req.body;

  // update or reassign initial values on update if falsy
  spot.address = address || spot.address;
  spot.city = city || spot.city;
  spot.state = state || spot.state;
  spot.country = country || spot.country;
  spot.lat = lat !== undefined ? lat : spot.lat;        // left of ternary checks for undefined, if so, leaves value unchanged
  spot.lng = lng !== undefined ? lng : spot.lng;        // right of ternary assigns new value if truthy, otherwise reassigns old value
  spot.name = name || spot.name;
  spot.description = description || spot.description;
  spot.price = price !== undefined ? price : spot.price;

  try {
    await spot.save();
  } catch (error) {
    return next(error);
  }

  return res.status(200).json(spot);
});

/**** DELETE a review by its ID ****/
router.delete('/:spotId',
  restoreUser, requireAuth,
  async (req, res, next) => {
  const { user } = req;
  
  if (!user) {
    return res.status(401).json({ message: "You must be signed in to access this resource." });
  }
  
  const userId = user.id;
  const dropSpot = await Spot.findByPk(req.params.spotId);

  if (!dropSpot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  if (userId !== dropSpot.ownerId) {
    return res.status(403).json({ message: "Forbidden"});
  }

  try {
    await dropSpot.destroy();
    return res.status(200).json({ message: "Successfully deleted" });
  } catch (e) {
    return next(e);
  }
});


/**** validate spot image ****/
const validateSpotImage = [
  check('url')
    .exists({ checkFalsy: true })
    .withMessage('Image url is required'),  
  check('preview')
    .exists()
    .isBoolean()
    .withMessage('Preview must be a boolean value'),
  handleValidationErrors
]

/**** ADD image to spot on id ****/
router.post('/:postId/images',
  restoreUser, requireAuth, validateSpotImage,
  async(req, res, next) => {
    
  const { spotId } = req.params;     // spotId to add image at
  const { user } = req;              // current user adding image
  const { url, preview } = req.body; // image data to add
  const userId = user.id;

  try {
    const spot = await Spot.findByPk(spotId);

    if(!spot){
      return res.status(401).json({
        message: "Authentication required"
      })
    }

    if(spot.ownerId !== userId){
      const err = new Error('Forbidden');
      err.status = 403;
      return next(err);
    }

    const newImage = await SpotImage.create({
      spotId: spot.id, url, preview
    });

    return res.status(201).json({
      id: newImage.id, url: newImage.url, preview: newImage.preview
    });

  } catch (error){
    next(error)
  }

});

/**** GET reviews by spot's id */
router.get('/:spotId/reviews',
  async (req, res) => {

    const { spot } = req.params;
    const spotId = Spot.findByPk(req.params.spotId); // get spot id
    
  if(!spot){
    return res.status(404).json({
      message: "Spot couldn't be found"
    });
  }

  const spotReviews = await Review.findAll({
    where: { spotId: spotId },  // thisTable[foreignKey] === otherTable[uniqueId]
    include: [
      { 
        model: User,
        attributes: ['id', 'user', 'preview']
      },
      {
        model: ReviewImage,
        attributes: ['id', 'url']
      }
    ]
  });
  
  // Capture spots in review-object array
  const spotReviewsArray = spotReviews.map(review => ({
      id: review.id,
      userId: review.userId,
      spotId: review.spotId,
      review: review.review,
      stars: review.stars,
      User: { 
        id: review.User.id, 
        firstName: review.User.firstName, 
        lastName: review.User.lastName 
      },
      ReviewImages: review.ReviewImages.map(image => ({
        id: image.id, 
        url: image.url 
      }))

  }));

  return res.status(200).json({ Reviews: spotReviewsArray })
  }
)

/**** GET bookings by spot's id ****/
router.get('/:spotId/bookings',
  restoreUser,
  async (req, res) => {
    const { spotId } = req.params;
    const currentUserId = req.user.id;
    const spot = spot.findByPk(spotId); // get spot id
    
  if(!spot){
    return res.status(404).json({
      message: "Spot couldn't be found"
    });
  }

  const spotBookings = await Booking.findAll({
    where: { spotId: spotId },  // Review.[foreignKey] matches Spot.[uniqueId]
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      }
    ]
  });
  
  if (spot.ownerId !== currentUserId) {
    const nonOwnerBookings = spotBookings.map(booking => ({
      spotId: booking.spotId,
      startDate: booking.startDate,
      endDate: booking.endDate
    }));
    return res.status(200).json({ Bookings: nonOwnerBookings });
  }

  // Capture spots, if owner, in booking-object array
  const ownerBookings = spotReviews.map(booking => ({
    User: {
      id: booking.User.id,
      firstName: booking.User.firstName,
      lastName: booking.User.lastName
    },
    id: booking.id, 
    spotId: booking.spotId, 
    userId: booking.User.id, 
    startDate: booking.startDate,
    endDate: booking.endDate
  }));

  return res.status(200).json({ Bookings: ownerBookings })}
)


module.exports = router;