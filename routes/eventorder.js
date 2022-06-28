const router = require("express").Router();
const REQ_URL = require("../customer routes/CONSTANTS.js");
const Marquee = require("../models/marquee.model");
const EventOrder = require("../models/eventorder.model");

router.post("/create", async (req, res) => {
  console.log(req.body);
  try {
    EventOrder.create(req.body, function (err, result) {
      if (err) return res.status(500).json(err);
      res.status(200).json({
        status: "ok",
        message: "Document action succeed",
        result: result,
      });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/update", async (req, res) => {
  try {
    const { noofpersons, eventtype, eventdate } = req.body;
    const result = await EventOrder.findOneAndUpdate(
      { _id: req.body.orderid },
      { noofpersons: noofpersons, eventtype: eventtype, eventdate: eventdate },
      {
        new: true,
      }
    );
    res.status(200).json({
      status: "ok",
      message: "Document action succeed",
      result: result,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/getorders", async (req, res) => {
  try {
    const { userid, filter, orderid, managerid } = req.body;

    let findQuery = {};
    if (userid) findQuery.customerid = userid;
    if (filter) findQuery.orderstatus = filter;
    if (orderid) findQuery._id = orderid;
    if (managerid) findQuery.managerid = managerid;

    const result = await EventOrder.find(findQuery);
    res.status(200).json({
      status: "ok",
      message: "Document action succeed",
      result: result,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/change-status", async (req, res) => {
  try {
    const { orderid, orderstatus } = req.body;
    const result = await EventOrder.findOneAndUpdate(
      { _id: orderid },
      { orderstatus: orderstatus },
      { new: true }
    );
    res.status(200).json({
      status: "ok",
      message: "Document action succeed",
      result: result,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/delete", async (req, res) => {
  try {
    const orderid = req.body.orderid;
    const result = await EventOrder.deleteOne({ _id: orderid });
    res.status(200).json({
      status: "ok",
      message: "Document action succeed",
      result: result,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/updatefilters", async (req, res) => {
  try {
    const { _id, isCompleted, review } = req.body;
    let query = {};
    if (isCompleted) query.isCompleted = isCompleted;
    if (review) query.review = review;
    const result = await EventOrder.findOneAndUpdate({ _id: _id }, query, {
      new: true,
    });
    res.status(200).json({
      status: "ok",
      message: "Document action succeed",
      result: result,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
