const router = require("express").Router();
const User = require("../customer models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation");
const verify = require("./verifyToken");

const express = require("express");
const app = express();
const cors = require("cors");

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
  res.send({ loggedIn: true, id: req.userID });
});

router.get("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    res.json({ loggedIn: false });
  });
});

module.exports = router;
