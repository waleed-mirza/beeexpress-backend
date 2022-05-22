const router = require("express").Router();
let Category = require("../models/category.model");

router.route("/").get((req, res) => {
  Category.find()
    .then((category) => res.json(category))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/searchbyid").post((req, res) => {
  const managerid = req.body.managerid;
  Category.find({ managerid: managerid })
    .then((response) => {
      console.log(response, "cate");
      return res.json({ result: response });
    })
    .catch((err) => {
      res.json({ status: "somthing went wrong" });
    });
});

router.route("/add").post((req, res) => {
  const category = req.body.category;
  const managerid = req.body.managerid;

  const newCategory = new Category({ category, managerid });

  newCategory
    .save()
    .then(() => res.json("Category added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});
module.exports = router;
