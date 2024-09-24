const router = require('express').Router();
const { Booking, Spot } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateBookingEdit = [
  check('startDate')
    .isDate({ format: 'ISO' })
    .withMessage('Start date must be a date in ISO 8601 format'),
  check('endDate')
    .isDate({ format: 'ISO' })
    .custom((val, { req }) => {
      new Date(req.body.startDate).getTime()
        < new Date(req.body.endDate).getTime();
    })
    .withMessage('End date must be a date in ISO 8601 format which is after start date'),
  handleValidationErrors,
];

/**** GET all bookings for the current user ****/
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

/**** Edit a booking by its ID ****/
router.put('/:bookingId', validateBookingEdit, async (req, res, next) => {
  const { user } = req;
  const [startTimestamp, endTimestamp] = [
    new Date(req.body.startDate).getTime(),
    new Date(req.body.endDate).getTime(),
  ];

  if (!user) {
    const err = new Error('Unauthorized');
    err.title = 'Unauthorized';
    err.errors = { message: 'You must be signed in to access this resource.' };
    return res.status(401).json(err);
  }

  const booking = Booking.findByPk(req.params.bookingId);

  if (!booking) {
    return res.status(404).json({ message: 'Booking couldn\'t be found' });
  }

  if (user.id !== bookingId) {
    const err = new Error('Unauthorized');
    err.title = 'Unauthorized';
    err.errors = { message: 'You cannot edit a booking that you didn\'t make.' };
    return res.status(401).json(err);
  }

  const bookingConflicts = await Booking.findAll({
    where: {
      spotId: booking.spotId,
      date: { [Op.between]: [startTimestamp, endTimestamp] },
    },
  });

  if (bookingConflicts.length) {
    const errors = {};

    for (const conflict of bookingConflicts) {
      const conflictStartTimestamp = new Date(conflict.startDate).getTime();
      const conflictEndTimestamp = new Date(conflict.endDate).getTime();

      if (conflictStartTimestamp < startTimestamp
          && startTimestamp < conflictEndTimestamp) {
        errors.startDate = 'Start date conflicts with an existing booking';
      }

      if (conflictStartTimestamp < endTimestamp
          && endTimestamp < conflictEndTimestamp) {
        errors.endDate = 'End date conflicts with an existing booking';
      }
    }

    return res.status(403).json({
      message: 'Sorry, this spot is already booked for the specified dates',
      errors,
    });
  }

  booking.startDate = req.startDate;
  booking.endDate = req.endDate;

  try {
    await booking.save();
  } catch (e) {
    return next(e);
  }

  return res.status(200).json(booking);
});

/**** DELETE a booking by its ID ****/
router.delete('/:bookingId', async (req, res, next) => {
  const { user } = req;

  if (!user) {
    const err = new Error('Unauthorized');
    err.title = 'Unauthorized';
    err.errors = { message: 'You must be signed in to access this resource.' };
    return res.status(401).json(err);
  }

  const booking = await Booking.findByPk(req.params.bookingId);

  if (!booking) {
    return res.status(404).json({ message: 'Booking couldn\'t be found' });
  }

  if (user.id !== booking.userId) {
    const err = new Error('Unauthorized');
    err.title = 'Unauthorized';
    err.errors = { message: 'You cannot delete a booking that you didn\'t make.' };
    return res.status(401).json(err);
  }

  if (new Date(booking.startDate).getTime() < new Date().getTime()) {
    return res.status(400).json({ message: 'You cannot delete a booking after it has started' });
  }

  try {
    await booking.destroy();

    return res.status(200).json({ message: 'Successfully deleted' });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
