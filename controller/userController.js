const asyncHandler = require('express-async-handler');
const User = require('../model/user');
const {generateToken} = require("../config/jwtToken");



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


/**
 * loginUser is an asynchronous function that handles the login process for a user.
 * It takes the user's email and password from the request body and attempts to find a matching user in the database.
 * If a matching user is found and the password is correct, it responds with the user's details and a generated token.
 * If the credentials are invalid, it throws an error.
 * 
 * @param {Object} req - The request object containing the user's login credentials.
 * @param {Object} res - The response object used to send back the user's details and token or an error message.
 */

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const findUser = await User.findOne({email}).select('+password');
    if(!findUser){
        throw new Error("User not found");
    }
    const isPasswordMatched = await findUser.isPasswordMatched(password);
    if(!isPasswordMatched){
        throw new Error("Invalid Credential");
    }

    const {_id, firstname, lastname, mobile} = findUser;
    res.json({
        _id,
        firstName: firstname,
        lastName: lastname,
        email,
        mobile,
        token: generateToken(_id),
    });
});

/*
Changes made:
- Removed optional chaining as `findUser` is already checked for existence.
- Used `.select('+password')` to explicitly select the password field as it may be excluded in the User model.
- Separated the password match check into its own `if` statement for clarity.
- Destructured the `findUser` object to only extract necessary fields for the response.
*/
/*

Get Users

*/

const getAllUsers = asyncHandler(async(req, res) => {
   try {
    const allUsers = await User.find();
    res.json(allUsers)
   } catch (error) {
        throw new Error(error);
   }
    
})

const getUser = asyncHandler(async(req, res) => {

    const {id} = req.params;
    try {
        const user = await User.findById(id)
        res.json({user})
    } catch (error) {
        throw new Error(error)
    }

    console.log(id);
})


const removeUser = asyncHandler(async(req, res) => {

    const {id} = req.params;
    try {
        const removedUser = await User.findByIdAndDelete(id)
        res.json({removedUser})
    } catch (error) {
        throw new Error(error)
    }

    console.log(id);
})

module.exports = {createUser, loginUser, getAllUsers, getUser, removeUser}