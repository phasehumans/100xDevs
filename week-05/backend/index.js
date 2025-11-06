// start writing from here
const express = require('express')
const { todoRouter } = require('./routes/todo')
const { userRouter } = require('./routes/user')
const { default: mongoose } = require('mongoose')

const app = express()
app.use(express.json())

app.use('/api/v1/user', userRouter)
app.use('/api/v1/todo', todoRouter)


async function dbconnect(){
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(3000)
    console.log('listening on port 3000')
}

dbconnect()