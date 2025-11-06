//  start writing from here
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId


const User = new Schema({
    firstName : String,
    lastName : String,
    email : {
        type : String,
        unique : true
    },
    password : String
})

const Todo = new Schema({
    title : String,
    description : String,
    done : Boolean,
    createdBy : ObjectId
})

const UserModel = mongoose.model('user', User)
const TodoModel = mongoose.model('todo', Todo)

module.exports = {
    UserModel : UserModel,
    TodoModel : TodoModel
}