const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please provide first name"],
  },
  lastname: {
    type: String,
    required: [true, "Please provide last name"],
  },
  email: {
    type: String,
    required: [true, "Please provide email address"],
    unique: true,
    match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    "Please provide a valid email",],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false,
  },
  list:[{
    text: {
      type : String,
      required: true,
    },
    isDone : {
      type : Boolean,
      required: true,
    },
  }],
  details:[{
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    perDayDetails:[{
      morningPlace:{
        type: String,
        required: true,
      },
      morningFood:{
        type: String,
        required: true, 
      },
      nightPlace:{
        type: String,
        required: true,
      },
      nightFood:{
        type: String,
        required: true,
      }
    }]
  }],
  expense:[{
    text: {
      type : String,
      required: true,
    },
    amount : {
      type : Number,
      required: true,
    },
  }],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
