const router = require('express').Router();

const authRoutes = require('./auth');
const userRoutes = require('./user');
const jobRoutes = require('./job');

// auth routes
router.use('/auth', authRoutes);

// user routes
router.use('/user', userRoutes);

// user routes
router.use('/job', jobRoutes);



module.exports = router;
