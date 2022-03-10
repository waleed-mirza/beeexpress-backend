const router = require("express").Router();
let Menu = require("../models/menu.model");

router.route("/").get((req, res) => {
  Menu.find()
    .then((menu) => res.json(menu))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const category = req.body.category;
  const menuitem = req.body.menuitem;
  const managerid = req.body.managerid;
  const price = Number(req.body.price);

  const newMenu = new Menu({ category, menuitem, price, managerid });

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
