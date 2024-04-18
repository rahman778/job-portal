const router = require('express').Router();

const authRoutes = require('./auth');
const userRoutes = require('./user');
const jobRoutes = require('./job');
const applicationRoutes = require('./application');
const commentRoutes = require('./comment');

// auth routes
router.use('/auth', authRoutes);

// user routes
router.use('/user', userRoutes);

// user routes
router.use('/job', jobRoutes);

// application routes
router.use('/application', applicationRoutes);

// comment routes
router.use('/comment', commentRoutes);

module.exports = router;
