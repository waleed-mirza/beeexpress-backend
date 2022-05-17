const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const marqueeSchema = new Schema(
  {
    name: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    services: {
      type: [String],
    },
    images: {
      type: [String],
    },
    category: {
      type: String,
      default: "",
    },
    managerid: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Marquee = mongoose.model("Marquee", marqueeSchema);

module.exports = Marquee;
