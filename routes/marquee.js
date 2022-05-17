const router = require("express").Router();
const REQ_URL = require("../customer routes/CONSTANTS.JS");
const Marquee = require("../models/marquee.model");
var multer = require("multer");
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

// image storage ---start

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({
  storage: storage,
});
// image storage ---end

router.route("/add").post(async (req, res) => {
  try {
    const { name, address, managerid, category } = req.body;
    const preData = await Marquee.find({
      managerid: managerid,
      name: name,
      address: address,
    });
    if (preData.length)
      return res.status(200).json({
        status: "ok",
        message: "Document already exists",
        result: preData[0],
      });
    const marqueeData = new Marquee({
      managerid: managerid,
      name: name,
      address: address,
      category: category,
    });
    const result = await marqueeData.save();
    res.status(200).json({
      status: "ok",
      message: "Document action succeed",
      result: result,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// add name and address
router.route("/update").post(async (req, res) => {
  try {
    const { name, address, managerid, marqueeid } = req.body;
    const response = await Marquee.findOneAndUpdate(
      { managerid: managerid, _id: marqueeid },
      { name: name, address: address },
      { upsert: true }
    );
    res.status(200).json({ status: "ok", message: "Document action succeed" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get onc
router.route("/getbyid").get(async (req, res) => {
  try {
    const managerid = req.query.managerid;
    const marqueeid = req.query.marqueeid;

    const query = {};
    query._id = marqueeid;
    if (managerid) query.managerid = managerid;
    const marqueeData = await Marquee.find(query);
    res.status(200).json({
      status: "ok",
      result: marqueeData,
      message: "Document action succeed",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all
router.route("/getall").get(async (req, res) => {
  try {
    const marqueeData = await Marquee.find({});
    res.status(200).json({
      status: "ok",
      result: marqueeData,
      message: "Document action succeed",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// add or update services
router.route("/updateservices").post(async (req, res) => {
  try {
    const { services, marqueeid, managerid } = req.body;
    const response = await Marquee.findOneAndUpdate(
      { managerid: managerid, _id: marqueeid },
      { services: services }
    );
    res.status(200).json({ status: "ok", message: "Document action succeed" });
  } catch (err) {
    res.status(500).json(err);
  }
});
// add or update images
router.route("/updateimages").post(upload.single("file"), async (req, res) => {
  try {
    const item = `${REQ_URL}files/${req.file.filename}`;
    const { marqueeid, managerid } = req.body;
    let images = JSON.parse(req.body.images);
    images.push(item);
    const response = await Marquee.findOneAndUpdate(
      { managerid: managerid, _id: marqueeid },
      { images: images },
      { new: true }
    );
    res.status(200).json({
      status: "ok",
      message: "Document action succeed",
      result: response,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.route("/deleteimage").post(async (req, res) => {
  try {
    const { marqueeid, managerid } = req.body;
    let images = JSON.parse(req.body.images);

    const response = await Marquee.findOneAndUpdate(
      { managerid: managerid, _id: marqueeid },
      { images: images },
      { new: true }
    );

    // file deletion from file system ---start
    const imageUrl = req.body.imageurl;
    let filePath = path.join(
      __dirname,
      "upload/images/",
      imageUrl.split("/files/")[1]
    );
    fs.unlink(filePath, (err) => {
      if (err) return;
      console.log("deleted successfully");
    });
    // file deletion from file system ---end

    res.status(200).json({
      status: "ok",
      message: "Document action succeed",
      result: response,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a marquee
router.route("/delete").get(async (req, res) => {
  try {
    const managerid = req.query.managerid;
    const marqueeid = req.query.marqueeid;

    await Marquee.deleteOne({ managerid: managerid, _id: marqueeid });
    res.status(200).json({ status: "ok", message: "Document action succeed" });
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
