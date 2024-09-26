const router = require('express').Router();
const { Spot } = require('../../db/models');
//const spot = require('../../db/models/spot');

router.get('/',
    async (req, res) => {
    const allSpots = await Spot.findAll();
      return res.json(allSpots);
    });
  
module.exports = router;