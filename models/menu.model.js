const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const menuSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    menuitem: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    price: {
      type: Number,
      required: true,
    },
    managerid: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    itemimage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
