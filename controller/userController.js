const asyncHandler = require('express-async-handler');
const User = require('../model/user');



const createUser = asyncHandler(
    async (req, res) =>{
        const email = req.body.email;
        const findUser = await User.findOne({email: email});
        if(!findUser){
            // create new User
            const newUser = await User.create(req.body)
            res.json(newUser)
        }else{
            // User already exists
            throw new Error("User already exists");
        }
    }
);

module.exports = {createUser}