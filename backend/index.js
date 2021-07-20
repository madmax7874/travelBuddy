const path = require('path')
const express = require('express')
const app = express()
const User = require('./models/user.js')
const server = require('./config/db.js')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post('/signup', async (req,res)=>{
    const {firstName, lastName, email, password} = req.body;
        console.log(firstName,lastName,email,password)
        const user =await User.create({firstName: firstName,lastName: lastName,email: email,password: password});
        await User.findOne({email:email}).then((data) => {
            console.log(data);
            res.json(data)
        });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
    console.log(`Server has started on port ${PORT}`);
});