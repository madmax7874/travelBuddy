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
  // get all list from db 
  .get(protect, async (req, res) => { 
    token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    try{
      const user = await User.findById(decoded.id);
      res.status(200).send(user.list);
    }catch(err){
      console.log(err)
      res.status(500).send(false);
    }
  })
  // add list to db
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
      console.log(err)
      res.status(500).send(false);
    }
  });

router.route("/modifylist")
  // edit and delete list
  .post(protect, async (req, res) => {
    try{ 
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const query = { _id: decoded.id };
      const user = await User.findOneAndUpdate(query, { list : req.body.value })
      res.status(200).send(true);
    }catch(err){
      console.log(err)
      res.status(500).send(false);
    }
  });

router.route("/traveldetails")
  //create a trip
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
      console.log(err)
      res.status(500).send(false);
    }
  }); 

router.route("/trips")
  //get all trips 
  .get(protect, async (req, res) => {
    try{ 
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      res.status(200).send(user.details)
    }catch(err){
      console.log(err)
      res.status(500).send(false);
    }
  });

router.route("/mytrip/:id")
  //get my trip details
  .get(protect, async (req, res) => {
    try{ 
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.find({'_id': decoded.id}, {details: {$elemMatch: {_id: req.params.id}}});
      res.status(200).send(user[0].details[0])
    }catch(err){
      console.log(err)
      res.status(500).send(false);
    }
  });

router.route("/perdaydetails/:id/:index")
  //add per day details to db
  .post(protect, async (req, res) => {
    try{
      const {id,index} = req.params
      const user = await User.findOneAndUpdate({'details._id': id},{ $push : {[`details.${index}.perDayDetails`] : req.body } })
      res.status(200).send(true)
    }catch(err){
      console.log(err)
      res.status(500).send(false);
    }
  });

router.route("/deleteperdaydetails/:id/:index")
  //delete per day details
  .post(protect, async (req, res) => {
    try{ ;
      const {id,index} = req.params

      const user = await User.findOneAndUpdate({'details._id': id}, { [`details.${index}.perDayDetails`] : req.body })
      res.status(200).send(true);
    }catch(err){
      console.log(err)
      res.status(500).send(false);
    }
  });

router.route("/expensetracker")
  // get expense from db
  .get(protect, async (req, res) => {
    try{ 
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      res.status(200).send(user.expense)
    }catch(err){
      console.log(err)
      res.status(500).send(false);
    }
  })
  //add expense to db
  .post(protect, async (req, res) => {
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
      console.log(err)
      res.status(500).send(false);
    }
  }); 

router.route("/deleteexpense")
  // delete an expense
  .post(protect, async (req, res) => {
    try{ 
      console.log("hi")
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const query = { _id: decoded.id };
      const user = await User.findOneAndUpdate(query, { expense : req.body})

      res.status(200).send(true);
    }catch(err){
      console.log(err)
      res.status(500).send(false);
    }
  });

module.exports = router;
