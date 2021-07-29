const express = require("express");
const router = express.Router();
const { getPrivateRoute } = require("../controllers/private");
const { protect } = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

router.route("/").get(protect, getPrivateRoute);

router.route("/list").get(protect,async (req, res) => {
  token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  res.status(200).send(user.list);
});

router.route("/sendData").post(protect,async (req, res) => {
try{ 
  token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const newData = {
    text: req.body.value,
    isDone: false 
  }
  const query = { _id: decoded.id };
  const user = await User.findOneAndUpdate(query, { $push : { list : newData } })
  console.log(user)
  res.status(200).send(true);
}catch(err){
  console.log(err)
}
});

module.exports = router;
