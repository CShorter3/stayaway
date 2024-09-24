const router = require('express').Router();
const { restoreUser } = require('../../utils/auth.js');
const { Review, Spot, User, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const validateReviewEdit = [
  check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required'),
  check('stars')
    .exists()
    .isInt({ min: 1, max: 5 })
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors,
];

/**** GET reviews for current user ****/
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

/**** Edit a review by its ID ****/
router.put('/:reviewId', validateReviewEdit, async (req, res, next) => {
  const { user } = req;

  if (!user) {
    const err = new Error('Unauthorized');
    err.title = 'Unauthorized';
    err.errors = { message: 'You must be signed in to access this resource.' };
    return res.status(401).json(err);
  }

  const review = await Review.findByPk(req.params.reviewId);

  if (!review) {
    return res.status(404).json({ message: 'Review couldn\'t be found' });
  }

  if (user.id !== review.userId) {
    const err = new Error('Unauthorized');
    err.title = 'Unauthorized';
    err.errors = { message: 'You cannot edit a review that you didn\'t make.' };
    return res.status(401).json(err);
  }

  review.review = req.body.review;
  review.stars = req.body.stars;

  try {
    await review.save();
  } catch (e) {
    return next(e);
  }

  return res.status(200).json(review);
});

module.exports = router;
