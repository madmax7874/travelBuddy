const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

router.route("/").get(protect , async(req,res) => {
  res.status(200).send(true);
});

router.route("/list")
  .get(protect, async (req, res) => { 
    token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    try{
      const user = await User.findById(decoded.id);
      res.status(200).send(user.list);
    }catch(err){
      return next(new ErrorResponse("No user found with this id", 404));
    }
  })
  .post(protect, async (req, res) => {
    try{ 
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const newData = {
        text: req.body.value,
        isDone: false  
      }
      const query = { _id: decoded.id };
      const user = await User.findOneAndUpdate(query, { $push : { list : newData } })
      res.status(200).send(true);
    }catch(err){
      return next(new ErrorResponse("No user found with this id", 404));
    }
  });

router.route("/modifylist").post(protect, async (req, res) => {
  try{ 
    token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const query = { _id: decoded.id };
    const user = await User.findOneAndUpdate(query, {  list : req.body.value })
    res.status(200).send(true);
  }catch(err){
    return next(new ErrorResponse("No user found with this id", 404));
  }
});

router.route("/traveldetails")
  .post(protect, async (req, res) => {
    try{ 
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const query = { _id: decoded.id };
      // const user = await User.findOneAndUpdate(query, { $push : { "details.perDayDetails" : req.body } })
      // console.log(user);
      console.log(req.body);
      res.status(200).send(true);
    }catch(err){
      // return next(new ErrorResponse("No user found with this id", 404));
      console.log(err);
    }
  });

module.exports = router;
