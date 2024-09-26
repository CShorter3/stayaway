const router = require('express').Router();
const { Review, Spot, User, ReviewImage, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Sequelize } = require('sequelize');

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
        {
          model: Spot,
          include: [
            {
              model: SpotImage,
              attributes: [],
              where: {
                preview: true,
              },
            },
          ],
          attributes: [
            [Sequelize.literal('"Spot->SpotImages"."url"'), 'previewImage'],
          ]
        },
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

/**** DELETE a review by its ID ****/
router.delete('/:reviewId', async (req, res, next) => {
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
    err.errors = { message: 'You cannot delete a review that you didn\'t make.' };
    return res.status(401).json(err);
  }

  try {
    await review.destroy();

    return res.status(200).json({ message: 'Successfully deleted' });
  } catch (e) {
    return next(e);
  }
});

/**** POST an image to a review based on the review's ID ****/
router.post('/:reviewId/images', async (req, res, next) => {
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
    return res.status(401).json('You cannot add images to a review that you didn\'t make.');
  }

  const images = await ReviewImage.findAll({ where: { reviewId: req.params.reviewId } });
  console.log(images);

  if (images.length >= 10) {
    return res.status(403).json({
      message: 'Maximum number of images for this resource was reached'
    });
  }

  try {
    const image = await review.createReviewImage({
      url: req.body.url,
    });

    return res.status(201).json(image);
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
