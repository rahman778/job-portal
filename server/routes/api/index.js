const router = require("express").Router();

const authRoutes = require("./auth");
const userRoutes = require("./user");
const jobRoutes = require("./job");
const applicationRoutes = require("./application");
const commentRoutes = require("./comment");
const watchlistRoutes = require("./watchlist");
const categoryRoutes = require("./category");
const skillRoutes = require("./skill");
const recommendationRoutes = require("./recommendation");

// auth routes
router.use("/auth", authRoutes);

// user routes
router.use("/user", userRoutes);

// user routes
router.use("/job", jobRoutes);

// application routes
router.use("/application", applicationRoutes);

// comment routes
router.use("/comment", commentRoutes);

// watchlist routes
router.use("/watchlist", watchlistRoutes);

// category routes
router.use("/category", categoryRoutes);

// skill routes
router.use("/skill", skillRoutes);

// recommendation routes
router.use("/recommendation", recommendationRoutes);

module.exports = router;
