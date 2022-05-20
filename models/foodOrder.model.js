const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const foodOrderSchema = new Schema(
  {
    managerid: {
      type: String,
    },
    customerid: {
      type: String,
    },
    itemsorder: {
      type: [String],
      default: [],
    },
    paymentmethod: {
      type: String,
      default: "",
    },
    isacceptedfordinein: {
      type: String,
      default: "pending",
    },
    noofpersons: {
      type: String,
      default: "",
    },
    isacceptedfordelivery: {
      type: String,
      default: "pending",
    },

    deliveryboyid: {
      type: String,
      default: "",
    },
    restaurantid: {
      type: String,
      default: "",
    },

    isCompleted: {
      type: String,
      default: "pending",
    },
    review: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const FoodOrder = mongoose.model("FoodOrder", foodOrderSchema);

module.exports = FoodOrder;
