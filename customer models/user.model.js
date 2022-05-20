const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const signupSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    mobilenumber: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    city: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    CNIC: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    userrole: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", signupSchema);

module.exports = User;
