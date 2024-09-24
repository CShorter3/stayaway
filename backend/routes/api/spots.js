const router = require('express').Router();  // import server and route handling functionality
const { Spot, Review, SpotImage, User, Sequelize } = require('../../db/models'); // import user model

// restoreUser verifies token on request
// requireAuth directs an (un)authorized request
const { restoreUser, requireAuth } = require('../../utils/auth'); 

/**** Get all spots ****/
router.get('/',
    async (req, res) => {
    const allSpots = await Spot.findAll();
      return res.json({allSpots});
    });

/**** Get all spots of current user ****/
router.get('/current', 
  restoreUser, requireAuth,
  async(req, res, next) => {
  
  try {
    const {user} = req;
    if(user){
      const userId = user.id;
      const userSpots = await Spot.findAll({
        where: { userId }
      });
      return res.json({userSpots});
    }
  } catch (error){
    // if query or response error, pass to error handdling 
    next(error); 
  }
});

/*** Get spot details on id */

router.get('/:spotId',
  async(req, res, next) => {
  
  const { spotId } = req.params;

  try {
    // Capture spot deatils including associated images and owner details. 
    const spot = await Spot.findOne({
      where: { id: spotId },
    });

    if(!spot){
      return res.status(404).json({
        message: "Spot couldn't be found"
      });
    }

    const detailedResponse = {
      id: spot.id,
      ownerId: spot.address,
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
    };

    return res.status(200).json(detailedResponse);

  } catch (error) {
      next(error);
  }

});

module.exports = router;