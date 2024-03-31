const mongoose = require("mongoose");

const keys = require('../config/keys');
const { database } = keys;

const connectDB = () => {
   mongoose
      .connect(database.url)
      .then(() => {
         console.log("Mongoose Connected");
      })
      .catch((error) => {
         console.log(error);
      });
};

module.exports = connectDB;
