const router = require("express").Router();
var multer = require("multer");
const REQ_URL = require("../customer_routes/CONSTANTS.js");
let Menu = require("../models/menu.model");
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

router.route("/").get((req, res) => {
  Menu.find()
    .then((menu) => res.json(menu))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post(upload.single("itemimage"), async (req, res) => {
  const itemimage = `${REQ_URL}files/${req.file.filename}`;

  const category = req.body.category;
  const menuitem = req.body.menuitem;
  const managerid = req.body.managerid;
  const price = Number(req.body.price);

  const newMenu = new Menu({ category, menuitem, price, managerid, itemimage });

  newMenu
    .save()
    .then(() => res.json("Menu added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/searchbyid").post((req, res) => {
  const managerid = req.body.managerid;
  Menu.find({ managerid: managerid })
    .then((response) => {
      return res.json({ result: response });
    })
    .catch((err) => {
      res.json({ status: "somthing went wrong" });
    });
});

router.route("/:id").get((req, res) => {
  Menu.findById(req.params.id)
    .then((menu) => res.json(menu))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Menu.findByIdAndDelete(req.params.id)
    .then(() => res.json("Menu deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Menu.findById(req.params.id)
    .then((menu) => {
      menu.category = req.body.category;
      menu.menuitem = req.body.menuitem;
      menu.price = Number(req.body.price);

      menu
        .save()
        .then(() => res.json("Menu updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
