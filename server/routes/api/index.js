const router = require('express').Router();

const authRoutes = require('./auth');
const userRoutes = require('./user');
const jobRoutes = require('./job');
const applicationRoutes = require('./application');

// auth routes
router.use('/auth', authRoutes);

// user routes
router.use('/user', userRoutes);

// user routes
router.use('/job', jobRoutes);

// application routes
router.use('/application', applicationRoutes);



module.exports = router;
