const router = require("express").Router();
let Restaurant = require("../models/restaurant.model");

router.route("/getall").get((req, res) => {
  Restaurant.find()
    .then((restaurant) => res.json(restaurant))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/searchbyid").post((req, res) => {
  const managerid = req.body.managerid;
  Restaurant.findOne({ managerid: managerid })
    .then((response) => {
      return res.json({ result: response.restaurant });
    })
    .catch((err) => {
      res.json({ status: "somthing went wrong" });
    });
});

router.route("/add").post((req, res) => {
  const restaurant = req.body.restaurant;
  const managerid = req.body.managerid;

  const newRestaurant = new Restaurant({ restaurant, managerid });

  newRestaurant
    .save()
    .then(() => res.json("Restaurant added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});
module.exports = router;
