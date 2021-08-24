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
    const user = await User.findOneAndUpdate(query, { list : req.body.value })
    res.status(200).send(true);
  }catch(err){
    return next(new ErrorResponse("No user found with this id", 404));
  }
});

 //create a trip
router.route("/traveldetails")
  .post(protect, async (req, res) => {
    try{ 
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const Details = [{
        startDate: req.body.start_date,
        endDate: req.body.end_date,
        destination: req.body.destination,
        perDayDetails : []
      }]      
      const query = { _id: decoded.id };

      const user = await User.findOneAndUpdate(query, { $push : {details : Details }})

      const findUser = await User.findById(decoded.id);

      res.status(200).send(findUser.details[findUser.details.length-1]._id);
    }catch(err){
      console.log(err);
    }
  });

//get all trips
router.route("/trips").get(protect, async (req, res) => {
  try{ 
    token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    res.status(200).send(user.details)
  }catch(err){
    console.log(err);
  }
});

//get a trip
router.route("/mytrip/:id").get(protect, async (req, res) => {
  try{ 
    token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.find({'_id': decoded.id}, {details: {$elemMatch: {_id: req.params.id}}});
    res.status(200).send(user[0].details[0])
  }catch(err){
    console.log(err);
  }
});

router.route("/perdaydetails/:id/:index")
  .post(protect, async (req, res) => {
    try{
      const {id,index} = req.params
      const user = await User.findOneAndUpdate({'details._id': id},{ $push : {[`details.${index}.perDayDetails`] : req.body } })
      console.log(user)

      res.status(200).send(true)
    }catch(err){
      console.log(err);
    }
  });

  router.route("/modifyperdaydetails/:id/:index").post(protect, async (req, res) => {
    try{ ;
      const {id,index} = req.params

      const user = await User.findOneAndUpdate({'details._id': id}, { [`details.${index}.perDayDetails`] : req.body })
      res.status(200).send(true);
    }catch(err){
      console.log(err)
    }
  });

  router.route("/expensetracker")
  .get(protect, async (req, res) => {
    try{ 
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      // console.log(user)
      res.status(200).send(user.expense)
    }catch(err){
      console.log(err);
    }
  })
  .post(async (req, res) => {
    try{ 
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const newData = {
        text: req.body.text,
        amount: req.body.amount,
      }
      const query = { _id: decoded.id };
      const user = await User.findOneAndUpdate(query, { $push : { expense : newData } })
      res.status(200).send(true);
    }catch(err){
      return next(new ErrorResponse("No user found with this id", 404));
    }
  }); 

  router.route("/deleteexpense").post(protect, async (req, res) => {
    try{ 
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const query = { _id: decoded.id };
      const user = await User.findOneAndUpdate(query, { expense : req.body.value })
      res.status(200).send(true);
    }catch(err){
      return next(new ErrorResponse("No user found with this id", 404));
    }
  });

module.exports = router;
