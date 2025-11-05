const { Router, json } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User} = require('../database/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv =require('dotenv')
const {Todo} = require('../database/index')

dotenv.config()

// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const password = req.body.password

    if(!firstName || !lastName || !email || !password){
        res.json({
            message: "all fields are required"
        })
        return
    }

    try {
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({
            firstName : firstName,
            lastName : lastName,
            email : email,
            password : hashPassword
        })
    } catch (error) {
        res.json({
            message : "sign-up failed",
            error : error
        })
        return
    }

    res.json({
        message : "sign-up completed"
    })


});

router.post('/login', async(req, res) => {
     // Implement user login logic
     const email = req.body.email
     const password = req.body.password

     if(!email || !password){
        res.json({
            message : "all fields are required"
        })
        return
     }

     const user = await User.find({
        email : email
     })

     if(!user){
        res.json({
            message : "User doesnot exist"
        })
        return
     }

     const userMatch = bcrypt.compare(password, user.password)

     if(userMatch){
        const token = jwt.sign({
            id : user.id
        }, process.env.JWT_SECRET)

        res.json({
            token : token
        })
        return
     }

     res.json({
        message : "invalid email or password"
     })


});

router.get('/todos', userMiddleware, async(req, res) => {
    // Implement logic for getting todos for a user
    const userId = req.userId
    const todos = await Todo.findOne({
        createdby : userId
    })

    res.json({
        todos : todos
    })

});

router.post('/logout', userMiddleware, (req, res) => {
    // Implement logout logic
    
    // remove from localStorage
    res.json({
        message : "logged out successfully"
    })
});

module.exports = router