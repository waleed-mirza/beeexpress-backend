const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userlocationSchema = new Schema(
  {
    userid: {
      type: String,
      required: true,
    },
    lat: {
      type: Number,
      default: 0,
    },
    long: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const UserLocation = mongoose.model("UserLocation", userlocationSchema);

module.exports = UserLocation;
