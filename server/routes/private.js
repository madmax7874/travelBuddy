const express = require("express");
const router = express.Router();
const { getPrivateRoute } = require("../controllers/private");
const { protect } = require("../middleware/auth");

router.route("/").get(protect, getPrivateRoute);
router.route("/list").get(protect, (req, res) => {
  const myList = [
    {
      text: "Tickets",
      isDone: false,
    },
    {
      text: "Bags",
      isDone: true,
    },
    {
      text: "Mobile",
      isDone: true,
    },
    {
      text: "Madmax",
      isDone: false,
    },
  ];
  console.log(req.user);
  res.status(200).send(myList);
});
router.route("/sendData").post(protect, (req, res) => {
  console.log(req.body);
  res.status(200).send("hi");
});

module.exports = router;
