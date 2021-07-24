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
const authenticate = require('./middleware/authenticate.js')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// app.get('/loggedIn',(req,res)=> {
//     try{
//         const token = req.cookies.token;
//         if(!token) return res.json(false);
//         jwt.verify(token,'somekey');
//         res.send(true);
//     }catch(err){
//         res.json(false);
//     }
// });

app.post('/signup', async (req,res)=>{
    try{
        const {firstName, lastName, email, password} = req.body;
        const passwordHash =await bcrypt.hash(password,10);
        const user = await User.create({firstName: firstName,lastName: lastName,email: email,password: passwordHash});
        await User.findOne({email:email}).then((data) => {
            console.log(data);
            const token = data.generateToken();
            res.cookie('nToken',token,{maxAge:36000000,httpOnly:true});
            res.send(token)
            console.log(token)
        }); 
    } catch (e) {
        res.send(false);
    }
});

app.post('/login',async(req,res)=>{
    try {
        const {email, password} = req.body;
        User.findOne({email:email}).then(async (data) => {
            const comparePassword =await bcrypt.compare(password,data.password);
            if(comparePassword){
                const token = data.generateToken();
                console.log(token)
                res.cookie('nToken',token,{maxAge:36000000,httpOnly:true})
                res.json(true)
            }
            else{
                res.json(false)
            }
        })
    }catch (e) {
        res.send(false);
    }  
});

app.get('/logout', (req, res) => {
    res.clearCookie('nToken',{path:'/'});
    res.status(200).send("User logged out")
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
    console.log(`Server has started on port ${PORT}`);
});