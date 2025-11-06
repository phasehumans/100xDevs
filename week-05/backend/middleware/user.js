//  start writing from here
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

function authMiddleware(req, res, next){
    const token = req.headers.token 
    const user = jwt.verify(token, process.env.JWT_SECRET)

    if(user){
        res.userid = user.id
        next()
    }else{
        res.json({
            message : "you are not signed in"
        })
    }
}


module.exports = {
    authMiddleware : authMiddleware
}