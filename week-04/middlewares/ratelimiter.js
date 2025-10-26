const express= require('express')

const app= express()

let numberOfReqUser= {}

app.use((req, res, next)=>{

    const userid= req.headers('user-id')

    if(!userid){
        return res.status(400).json({
            error: "user-id is required"
        })
    }

    // returns sec from 1970
    const currenTime= Math.floor(Date.now()/1000)

    if(!numberOfReqUser[userid]){
        numberOfReqUser[userid]= {
            count: 0,
            lastreq: currenTime
        }
    }

    const user= numberOfReqUser[userid]

    if(currenTime === user.lastreq){
        user.count = user.count + 1
    }
    else{
        user.count= 1
        user.lastreq= currenTime
    }

    if(user.count > 5){
        return res.status(404).json({
            msg : "kya kar raha hai bhai"
        })
    }

    next()

})



setInterval(()=>{
    numberOfReqUser= {}
}, 1000)

app.get('/greet', (req, res) =>{
    res.send({
        msg: "hello"
    })
})

app.listen(3000)