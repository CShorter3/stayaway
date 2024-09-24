const router = require('express').Router();

const { Booking, Spot } = require('../../db/models');

router.get('/current', async (req, res) => {
  const { user } = req;

  if (user) {
    const bookings = await Booking.findAll({
      where: { userId: user.id },
      include: [ Spot ],
    });

    return res.status(200).json(bookings);
  }

  const err = new Error('Unauthorized');
  err.title = 'Unauthorized';
  err.errors = { message: 'You must be signed in to access this resource.' };
  return res.status(401).json(err);
});

module.exports = router;
