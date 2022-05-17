const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventorderschema = new Schema(
  {
    placeid: {
      type: String,
      required: true,
    },
    managerid: {
      type: String,
      required: true,
    },
    customerid: {
      type: String,
      required: true,
    },
    placetype: {
      type: String,
      required: true,
    },
    eventtype: {
      type: String,
      default: "",
    },
    noofpersons: {
      type: Number,
      default: 0,
    },
    eventdate: {
      type: String,
      default: "",
    },
    eventlocation: {
      type: String,
      default: "",
    },
    orderstatus: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const EventOrder = mongoose.model("EventOrder", eventorderschema);

module.exports = EventOrder;
