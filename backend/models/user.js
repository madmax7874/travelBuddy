const jwt = require('jsonwebtoken');
const mongoose =require("mongoose");

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
    tokens:[
        {
            token:{
                type : String,
                required : true
            }
        }
    ]
})

userDetails.methods.generateToken = async function(){
    try {
        let token = jwt.sign({_id: this._id},'somekey')
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
}

const User = mongoose.model('User', userDetails);

module.exports = User;