const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const Schema = mongoose.Schema
const dotenv = require('dotenv')

dotenv.config()

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL);

// Define schemas

const UserSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    email :{
        type: String,
        unique: true
    },
    password : String
});

const TodoSchema = new mongoose.Schema({
    // Schema definition here
    title : String,
    description : String,
    done: Boolean,
    createdby: ObjectId
});

const User = mongoose.model('User', UserSchema);
const Todo = mongoose.model('Todo', TodoSchema);

module.exports = {
    User,
    Todo
}