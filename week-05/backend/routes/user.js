//  start writing your code from here
const {Router} = require('express')
const { UserModel, TodoModel } = require('../db')
const userRouter = Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const {authMiddleware} = require('../middleware/user')

dotenv.config()

userRouter.post('/signup', async(req, res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const password = req.body.password

    if(!firstName || !lastName || !email || !password){
        res.json({
            message : "all fields are required"
        })
        return
    }

    const hashPassword = await bcrypt.hash(password, 5)

    const user = await UserModel.create({
        firstName : firstName,
        lastName : lastName,
        email : email,
        password : hashPassword
    })

    if(user){
        res.json({
            message : "sign-up completed"
        })
    }else{
        res.json({
            message : "sign-up failed"
        })
    }
})

userRouter.post('/signin', async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    if(!email || !password){
        res.json({
            message : "all fields are required"
        })
        return
    }

    const user = UserModel.findOne({
        email : email
    })

    if(!user){
        res.json({
            message : "email does not exist"
        })
        return
    }

    const passwordMatch = await bcrypt.compare(password , user.password)

    if(passwordMatch){
        const token = jwt.sign({
            id : user.id
        }, process.env.JWT_SECRET)

        res.json({
            token : token
        })
    }else{
        res.json({
            message : "invalid email or password"
        })
    }
})

userRouter.get('/todos', authMiddleware, async(req, res) =>{
    const userId = req.userId

    const todos = await TodoModel.find({
        createdBy : userId
    })

    res.json({
        todos : todos
    })

})

module.exports = {
    userRouter : userRouter
}