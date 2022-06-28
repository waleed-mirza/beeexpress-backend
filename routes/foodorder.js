const router = require("express").Router();
const REQ_URL = require("../customer routes/CONSTANTS.js");
const FoodOrder = require("../models/foodOrder.model");
router.post("/create", async (req, res) => {
  try {
    const {
      customerid,
      itemsorders,
      managerid,
      paymentmethod,
      isacceptedfordinein,
      noofpersons,
    } = req.body;

    let query = {};
    query.managerid = managerid;
    query.customerid = customerid;
    query.itemsorder = itemsorders;
    query.paymentmethod = paymentmethod;
    if (isacceptedfordinein) {
      query.isacceptedfordelivery = "cancel";
    } else {
      query.isacceptedfordinein = "cancel";
    }
    if (noofpersons) query.noofpersons = noofpersons;
    FoodOrder.create(query, function (err, result) {
      if (err) return handleError(err);
      console.log(result);
      res.status(200).json({
        status: "ok",
        message: "Document action succeed",
        result: result,
      });
    });
  } catch (err) {
    res.status(200).json(err);
  }
});
router.get("/get", async (req, res) => {
  try {
    const { customerid, managerid, orderid } = req.query;
    let query = {};
    if (customerid) query.customerid = customerid;
    if (managerid) query.managerid = managerid;
    if (orderid) query._id = orderid;
    const result = await FoodOrder.find(query);
    res.status(200).json({
      status: "ok",
      message: "Document action succeed",
      result: result,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/update", async (req, res) => {
  try {
    const {
      orderid,
      isacceptedfordelivery,
      deliveryboyid,
      isacceptedfordinein,
      isCompleted,
      review,
      paymentmethod,
    } = req.body;
    const query = {};
    if (isacceptedfordelivery)
      query.isacceptedfordelivery = isacceptedfordelivery;
    if (deliveryboyid) query.deliveryboyid = deliveryboyid;
    if (isacceptedfordinein) query.isacceptedfordinein = isacceptedfordinein;
    if (isCompleted) query.isCompleted = isCompleted;
    if (review) query.review = review;
    if (paymentmethod) query.paymentmethod = paymentmethod;

    console.log(query);
    const result = await FoodOrder.findOneAndUpdate({ _id: orderid }, query, {
      new: true,
    });
    console.log(result, "result");
    query.res.status(200).json({
      status: "ok",
      message: "Document action succeed",
      result: result,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/delete", async (req, res) => {
  try {
    const result = await FoodOrder.deleteOne({ _id: req.query.orderid });
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
