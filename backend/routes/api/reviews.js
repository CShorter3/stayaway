const router = require('express').Router();

const { restoreUser } = require('../../utils/auth.js');

const { Review, Spot, User, ReviewImage } = require('../../db/models');

router.get('/current', async (req, res, next) => {
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

  const err = new Error('Unauthorized');
  err.title = 'Unauthorized';
  err.errors = { message: 'You must be signed in to access this resource.' };
  return res.status(401).json(err);
});

module.exports = router;
