const express = require("express");
const router = express.Router();
const { getPrivateRoute } = require("../controllers/private");
const { protect } = require("../middleware/auth");

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
    text: "Vidhi",
    isDone: false,
  },
];

router.route("/").get(protect, getPrivateRoute);
router.route("/list").get(protect, (req, res) => {
  
  console.log(req.user);
  res.status(200).send(myList);
});
router.route("/sendData").post(protect, (req, res) => {
  console.log(req.body);
  const newData = {
    text: req.body.value,
    isDone: false 
  }
  myList.push(newData);
  console.log(myList);
  res.status(200).send("hi");
});

module.exports = router;
