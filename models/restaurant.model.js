const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const restaurantSchema = new Schema(
  {
    restaurant: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      minlength: 3,
    },
    address: {
      type: String,
      required: true,
    },
    managerid: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
  },
  {
    timestamps: true,
  }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
