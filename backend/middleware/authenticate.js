// const jwt = require("jsonwebtoken");
// const User = require("../models/user.js");

// const Authenticate = async (req,res,next) =>{
//     try {
//         const token = req.cookies.nToken;
//         const verifyToken = jwt.verify(token,'somekey');

//         const rootUser = await User.findOne({_id:verifyToken._id,"tokens.token":token});

//         if(!rootUser){
//             throw new Error("User not found")
//         }
//         req.token = token;
//         req.rootUser = rootUser;
//         req.userID = rootUser._id;

//         next();
        
//     } catch (err) {
//         res.status(401).send("Unauthorized user.No token provided");
//         console.log(err);
//     }
// }

// module.exports = Authenticate;