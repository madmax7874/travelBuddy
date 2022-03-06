const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

router.route("/").get(protect , async(req,res) => {
  res.status(200).send(true);
});

//DONT FORGET ME
router.route("/list/:_id")
  // get items
  .get(protect, async (req, res, next) => { 
    token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    try{
      const user = await User.findById(decoded.id);
      res.status(200).send(user.list);
    }catch(err){
      next(err)
    }
  })
  // add item
  .post( async (req, res, next) => {
    try{ 
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const newData = {
        text: req.body.value,
        isDone: false  
      }
      const query = { _id: decoded.id };
      const user = await User.findOneAndUpdate(query, { $push : { list : newData }}, {new:true})
      res.status(200).send({success:true,item : user.list[user.list.length-1]});
    }catch(err){
      next(err)
    }
  })
  // edit item
  .put( async (req, res, next) => { 
    try{
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const query = { _id: decoded.id };
      const user = await User.updateOne(
        query,
        { "$set": { 
          "list.$[outer].isDone": req.body.isDone
        } },
        { "arrayFilters": [
          { "outer._id": req.body._id },
        ] }
      )
      res.status(200).send({success:true});
    }catch(err){
      next(err)
    }
  })
  //delete item
  .delete( async (req, res, next) => {
      try{ 
        token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const query = { _id: decoded.id };
        if (req.params._id == "clearingAll"){
          const user = await User.updateOne(query, { $set : {'list': [] }})
        }else{
          const user = await User.updateOne(query, { "$pull": { "list": {_id : req.params._id}}})
        }
        res.status(200).send({success:true});
      }catch(err){
        next(err)
      }
  });

//ALL TRIPS
router.route("/trips/:id")
  //get trips 
  .get(protect, async (req, res, next) => {
    try{ 
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      res.status(200).send(user.details)
    }catch(err){
      next(err)
    }
  })
  //add trip
  .post( async (req, res, next) => {
    try{ 
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const Details = {
        travelDates: req.body.travelDates,
        destination: req.body.destination,
        perDayDetails : []
      }     
      const query = { _id: decoded.id };
      const user = await User.findOneAndUpdate(query, { $push : {details : Details }}, {new:true})
      res.status(200).send(user.details[user.details.length-1]._id);
    }catch(err){
      next(err)
    }
  })
  //delete trip
  .delete( async (req, res, next) => {
    try{
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const query = { _id: decoded.id };
      const user = await User.updateOne(query, { "$pull": { "details": {_id : req.params.id}}})
      res.status(200).send({success:true});
    }catch(err){
      next(err)
    }
  });

//MY TRIP
router.route("/mytrip/:id")
  //get trip details
  .get(protect, async (req, res, next) => {
    try{ 
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.find({'_id': decoded.id}, {details: {$elemMatch: {_id: req.params.id}}});
      res.status(200).send(user[0].details[0])
    }catch(err){
      next(err)
    }
  })
  //add perDayDetails
  .post( async (req, res, next) => {
    try{
      const user = await User.findOneAndUpdate(
        {'details._id': req.params.id},
        { $push : {"details.0.perDayDetails": req.body}},
        {new:true}
      )
      res.status(200).send({success:true, perDayDetails : user.details[0].perDayDetails[user.details[0].perDayDetails.length-1]})
    }catch(err){
      next(err)
    }
  })
  //delete perDayDetails
  .delete( async (req, res, next) => {
    try{
      const user = await User.updateOne({'details.0.perDayDetails._id': req.params.id}, { "$pull": {"details.0.perDayDetails": {_id : req.params.id}}})
      res.status(200).send({success:true});
    }catch(err){
      next(err)
    }
  });

//EXPENSE TRACKER
router.route("/expensetracker/:id")
  //get expenses
  .get(protect, async (req, res, next) => {
    try{ 
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      res.status(200).send(user.expense)
    }catch(err){
      next(err)
    }
  })
  //add an expense
  .post( async (req, res, next) => {
    try{ 
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const newData = {
        category: req.body.category,
        text: req.body.text,
        amount: req.body.amount,
      }
      const query = { _id: decoded.id };
      const user = await User.findOneAndUpdate(query, { $push : { expense : newData }},{new:true})
      res.status(200).send({success:true,expense : user.expense[user.expense.length-1]});
    }catch(err){
      next(err)
    }
  })
  //delete an expense
  .delete( async (req, res, next) => {
    try{ 
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const query = { _id: decoded.id };
      if (req.params.id == "clearingAll"){
        const user = await User.updateOne(query, { $set : {'expense': [] }})
      }else{
        const user = await User.updateOne(query, { "$pull": { "expense": {_id : req.params.id}}})
      }
      res.status(200).send({success:true});
    }catch(err){
      next(err)
    }
  })

module.exports = router;
