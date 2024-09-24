const router = require('express').Router();

const { restoreUser } = require('../../utils/auth.js');

const { Review, Spot, User, ReviewImage } = require('../../db/models');

router.get('/current', async (req, res) => {
  const { user } = req;

  if (user) {
    const reviews = await Review.findAll({
      where: { userId: user.id },
      include: [
        { model: User, attributes: ['id', 'firstName', 'lastName'] },
        Spot,
        { model: ReviewImage, attributes: ['id', 'url'] },
      ]
    });

    return res.status(200).json(reviews);
  }

  return res.status(200).json(null);
});

module.exports = router;
