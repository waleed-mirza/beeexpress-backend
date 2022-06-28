const router = require("express").Router();
const REQ_URL = require("../customer routes/CONSTANTS.js");
const UserLocation = require("../models/userlocation.model");

router.post("/insert", async (req, res) => {
  try {
    const { lat, long, userid } = req.body;
    const query = {
      lat: lat,
      long: long,
    };
    const result = await UserLocation.findOneAndUpdate(
      { userid: userid },
      query,
      { upsert: true, new: true }
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
router.get("/get", async (req, res) => {
  try {
    const result = await UserLocation.findOne({ userid: req.query.userid });
    res.status(200).json({
      status: "ok",
      message: "Document action succeed",
      result: result,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/locationall", async (req, res) => {
  try {
    const result = await UserLocation.find();
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
