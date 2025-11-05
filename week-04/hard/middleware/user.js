const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

function userMiddleware(req, res, next) {
    // Implement user auth logic
    const token = req.headers.token

    const decodedData = jwt.verify(token, process.env.JWT_SECRET)

    if(decodedData){
        req.userid = decodedData.id
        next()
    }else{
        res.json({
          message : "you are not signed in"
        });
    }

    
}

module.exports = userMiddleware;