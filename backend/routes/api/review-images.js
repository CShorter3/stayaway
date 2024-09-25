const router = require('express').Router();
const { ReviewImage, Review } = require('../../db/models');

/**** DELETE a ReviewImage ****/
router.delete('/:imageId', async (req, res, next) => {
  const { user } = req;
  
  if (!user) {
    return res.status(401).json({ message: 'You must be signed in to access this resource.' });
  }

  const image = await ReviewImage.findByPk(req.params.imageId);

  if (!image) {
    return res.status(404).json({ message: 'Review Image couldn\'t be found' });
  }

  const review = await Review.findByPk(image.reviewId);

  if (user.id !== review.userId) {
    return res.status(401).json({
      message: 'You cannot delete a review image that isn\'t yours.'
    });
  }

  try {
    await image.destroy()
    
    return res.status(200).json({ message: 'Successfully deleted' });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
