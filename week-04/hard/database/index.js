const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId

// Connect to MongoDB
mongoose.connect('');

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
    createdby: ObjectId
});

const User = mongoose.model('User', UserSchema);
const Todo = mongoose.model('Todo', TodoSchema);

module.exports = {
    User,
    Todo
}