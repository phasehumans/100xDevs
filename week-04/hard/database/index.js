const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const Schema = mongoose.Schema

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://chaitanya:CtGXOikbQ2T4ynux@cluster0.4fprs4w.mongodb.net/taskify"
);

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