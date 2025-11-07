//  TODO: Can you create backend with standard folder structure like: week-4/hard ???
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
const app = express();

app.use(express.json());

const secret = process.env.JWT_SECRERT;  // This should be in an environment variable in a real application
const port = process.env.PORT;

// Define mongoose schemas
const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }

});

const adminSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true

    }
});

const courseSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    price : Number
});

// Define mongoose models
const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);

const authMiddleware = async (req, res, next) => {
    const token = req.headers.token

    const decodeData = jwt.verify(token, secret)

    if(decodeData){
        req.userid = decodeData.id
        next()
    }
};

// Connect to MongoDB
mongoose.connect('<YourMongoDbConnectionString>'); 


// Admin routes
app.post('/admin/signup', async(req, res) => {
    // logic to sign up admin
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const password = req.body.password

    if(!firstName || !lastName || !email || !password){
        res.json({
            message : "all fields are required"
        })
    }

    const hashPassword = await bcrypt.hash(password, 5)

    const user = await Admin.create({
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

});

app.post('/admin/login', async(req, res) => {
    // logic to log in admin
    const email = req.body.email
    const password = req.body.password

    if(!email || !password){
        res.json({
            message : "all fields are required"
        })
    }

    const admin = await Admin.find({
        email : email
    })

    if(admin){
        const token = jwt.sign(admin.id, secret);
        res.json({
            message : "logged in",
            token : token
        })
    }else{
        res.json({
            message : "email does't exist"
        })
    }

});

app.post('/admin/courses', authMiddleware, async(req, res) => {
    const userid = req.userid
    const {title, description, price} = req.body

    const course = await Course.create({
        title : title,
        description : description,
        price : price,
        createdBy : userid
    })

    if(course){
        res.json({
            message : "course created",
            courseId : course.id
        })
    }else{
        res.json({
            message : "course creation failed"
        })
    }
});

app.put('/admin/courses/:courseId', authMiddleware, async(req, res) => {
    const userId = req.userId
    const courseId = req.params.courseId

    const {title , description, price} = req.body 

    try {
        await Course.updateOne({
            _id : courseId,
            createdBy : userId
        }, {
            title : title,
            description : description,
            price : price
        })

        res.json({
            message : "course updated"
        })
    } catch (error) {
        res.json({
            message : "failed to update course"
        })
    }

});

app.get('/admin/courses', authMiddleware, async(req, res) => {
    const userId = req.userId

    const allcourses = await Course.find({createdBy : userId})

    res.json({
        message : "all courses",
        course : allcourses
    })
});

// User routes
app.post('/users/signup', async(req, res) => {
    const email = req.body.email
    const password = req.body.password
    const firstName =  req.body.firstName
    const lastName = req.body.lastName

    if(!firstName || !lastName || !email || !password){
        res.json({
            message : "all fields are required"
        })
        return
    }

    const hashPassword = await bcrypt.hash(password, 5)

    const user = await User.create({
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
});

app.post('/users/login', async(req, res) => {
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

    if(user){
        const token = jwt.sign(user.id, secret)
        res.json({
            message : "logged in",
            token : token
        })
    }else{
        res.json({
            message : "failed to logged in"
        })
    }
});

app.get('/users/courses', authMiddleware, async(req, res) => {
    
});

app.post('/users/courses/:courseId', authMiddleware, async(req, res) => {
    
});

app.get('/users/purchasedCourses', authMiddleware, async(req, res) => {
    
});

app.listen(port, () => {
    console.log('Server is listening on port 3000');
});