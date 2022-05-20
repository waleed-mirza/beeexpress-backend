const router = require("express").Router();
let Restaurant = require("../models/restaurant.model");

router.route("/getall").get((req, res) => {
  Restaurant.find()
    .then((restaurant) => res.json(restaurant))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/searchbyid").post(async (req, res) => {
  try {
    const { managerid } = req.body;
    let query = {};
    if (managerid) query.managerid = managerid;
    const result = await Restaurant.find(query);
    res
      .status(200)
      .json({
        status: "ok",
        message: "Document action succeed",
        result: result,
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.route("/add").post((req, res) => {
  const restaurant = req.body.restaurant;
  const managerid = req.body.managerid;
  const address = req.body.address;

  const newRestaurant = new Restaurant({ restaurant, address, managerid });

  newRestaurant
    .save()
    .then(() => res.json("Restaurant added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});
module.exports = router;
