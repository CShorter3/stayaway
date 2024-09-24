const router = require('express').Router();  // import server and route handling functionality
const { Spot, /*User*/ } = require('../../db/models'); // import user model

// restoreUser verifies token on request
// requireAuth directs an (un)authorized request
const { restoreUser, requireAuth } = require('../utils'); 

/**** 1. Get all spots ****/
router.get('/',
    async (req, res) => {
    const allSpots = await Spot.findAll();
      return res.json(allSpots);
    });

/**** 2. Get all spots of current user ****/
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
  
module.exports = router;