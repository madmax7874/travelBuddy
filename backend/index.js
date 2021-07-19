const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const server = mongoose.connect("mongodb://localhost:27017/userDetails",{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db connected')
});

const userDetails= new mongoose.Schema({
    firstName:{
        type : String,
        required : true
    },
    lastName:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
    password:{
        type : String,
        required : true
    },
})
const User = mongoose.model('User', userDetails);

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/api',(req,res)=>{
    res.json("vidholi");
})

app.post('/postreq',(req,res)=>{
    console.log(req.body)
    res.send(req.body)
})

app.post('/details',async (req,res)=>{
        const {firstName, lastName, email, password} = req.body;
        // console.log(firstName,lastName,email,password)
        const user =await User.create({firstName: firstName,lastName: lastName,email: email,password: password});
        await User.findOne({email:email}).then((data) => {
            console.log(data);
            res.send(data)
        });
}) 

const PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
    console.log(`Server has started on port ${PORT}`);
});