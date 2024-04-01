const express = require("express")
const router = express.Router()
const {createUser, loginUser, getAllUsers, getUser, removeUser} = require("../controller/userController")

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/users", getAllUsers);
router.get("/users/:id", getUser);
router.delete("/users/:id", removeUser)



module.exports = router;