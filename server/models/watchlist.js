const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Watchlist Schema
const WatchlistSchema = new Schema({
  job: {
    type: Schema.Types.ObjectId,
    ref: 'Job',
    default: null
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Candidate',
    default: null
  },
  isLiked: {
    type: Boolean,
    default: false
  },
  updated: {
    type: Date,
    default: Date.now
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('Watchlist', WatchlistSchema);
