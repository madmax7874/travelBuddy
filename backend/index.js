const path = require('path')
const express = require('express')
const app = express()
const User = require('./models/user.js')
const server = require('./config/db.js')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const generateToken = require('./utils/generateToken.js');

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post('/signup', async (req,res)=>{
    try{
        const {firstName, lastName, email, password} = req.body;
        const passwordHash =await bcrypt.hash(password,10);
        const user = await User.create({firstName: firstName,lastName: lastName,email: email,password: passwordHash});
        await User.findOne({email:email}).then((data) => {
            console.log(data);
            const token = generateToken(data._id)
            console.log(token);
            res.cookie('nToken',token,{maxAge:36000000,httpOnly:true});
            res.send(token)
        }); 
    } catch (e) {
        const error = "Email already in use. Try entering another one!";
        res.render('error',{error});
    }
});

app.post('/login',async(req,res)=>{
    try {
        const {email, password} = req.body;
        User.findOne({email:email}).then(async (data) => {
            const comparePassword =await bcrypt.compare(password,data.password);
            if(comparePassword){
                const token = generateToken(data._id)
                res.cookie('nToken',token,{maxAge:36000000,httpOnly:true})
            }
            else{
                const error = "Password incorrect";
                res.render('error',{error});
            }
        })
    }catch (e) {
        const error = "Invalid email";
        res.render('error',{error});
    }  
})


const PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
    console.log(`Server has started on port ${PORT}`);
});