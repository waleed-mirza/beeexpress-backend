const router = require("express").Router();
const User = require("../customer models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation");
const verify = require("./verifyToken");

const express = require("express");
const app = express();
const cors = require("cors");

const Category = require("../models/category.model");
const EventOrder = require("../models/eventorder.model");
const FoodOrder = require("../models/foodOrder.model");
const UserLocation = require("../models/userlocation.model");
const Marquee = require("../models/marquee.model");
const Menu = require("../models/menu.model");
const Restaurant = require("../models/restaurant.model");

const ADMIN_CREDENTIAL = {
  email: "admin@admin.com",
  password: "admin@admin",
};
//REGISTER

router.post("/register", async (req, res) => {
  //Validating data
  const { error } = registerValidation(req.body);
  if (error)
    return res.send({ status: "not ok", message: error.details[0].message });

  //Checking if the user is already registered
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.send({ status: "not ok", message: "Email Already Registered" });

  //Hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Creating new user
  const user = new User({
    email: req.body.email,
    password: hashedPassword,
    name: req.body.name,
    mobilenumber: req.body.mobilenumber,
    city: req.body.city,
    CNIC: req.body.CNIC,
    userrole: req.body.userrole,
  });
  try {
    const savedUser = await user.save();
    res.send({
      user: user._id,
      status: "ok",
      message: "Succesfully registered",
    });
  } catch (err) {
    res
      .status(200)
      .send({ status: "not ok", message: "Something Went Wrong! Try again" });
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  //Validating data
  const { error } = loginValidation(req.body);
  if (error) return res.status(200).send(error.details[0].message);

  //Checking if the email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.json({ auth: false, message: "No email found" });
  // if (!user) return res.status(400).send("Email not found");

  //Checking if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.json({ auth: false, message: "Password is wrong" });
  }
  //Create and assign a token
  const id = user._id,
    email = user.email;
  const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET);
  const result = user;
  req.session.user = result;

  res.json({ auth: true, token: token, result: result, email: email });
  // res.send(user);
});

router.get("/login", async (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});
router.get("/checklogin", verify, async (req, res) => {
  let profileData = await User.findOne({ _id: req.userID });
  let validPass = false;
  if (profileData.email === ADMIN_CREDENTIAL.email) {
    validPass = await bcrypt.compare(
      ADMIN_CREDENTIAL.password,
      profileData.password
    );
  }
  res.send({ loggedIn: true, id: req.userID, adminCheck: validPass });
});

router.get("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    res.json({ loggedIn: false });
  });
});

router.post("/updatestatus", async (req, res) => {
  try {
    const { userid, status } = req.body;
    const result = await User.findOneAndUpdate(
      { _id: userid },
      { status: status },
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
router.post("/getprofile", async (req, res) => {
  try {
    const { userId, userrole, filter } = req.body;
    const query = {};
    if (userId) query._id = userId;
    if (userrole) query.userrole = userrole;
    if (filter) query.status = filter;
    const profileData = await User.find(query, { password: 0 });
    if (!profileData)
      return res
        .status(200)
        .json({ status: "not ok", message: "Profile does not exist" });
    res.status(200).json({
      status: "ok",
      message: "Document action succeed",
      result: profileData,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/updateprofile", async (req, res) => {
  try {
    const { email, ...rest } = req.body;

    //Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(rest.password, salt);
    rest.password = hashedPassword;
    let result = await User.findOneAndUpdate({ email: email }, rest, {
      new: true,
    });
    res
      .status(200)
      .json({ status: "ok", message: "Updated Succesfully", result: result });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/deleteprofile", async (req, res) => {
  try {
    const userid = req.body.userId;

    let result = await User.deleteOne({ _id: userid });
    await Category.deleteMany({ managerid: userid });
    await EventOrder.deleteMany({ managerid: userid });
    await EventOrder.deleteMany({ customerid: userid });
    await FoodOrder.deleteMany({ customerid: userid });
    await FoodOrder.deleteMany({ managerid: userid });
    await Marquee.deleteMany({ managerid: userid });
    await Menu.deleteMany({ managerid: userid });
    await Restaurant.deleteMany({ managerid: userid });
    await UserLocation.deleteMany({ userid: userid });

    await res
      .status(200)
      .json({ status: "ok", message: "Deleted Succesfully", result: result });
  } catch (err) {
    res.status(500).json(err);
  }
});

// admin check
module.exports = router;
