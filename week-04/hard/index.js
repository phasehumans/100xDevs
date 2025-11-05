const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./routes/user");
const todoRouter = require("./routes/todo")
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/healthy", (req, res)=> res.send("I am Healthy"));

//  start writing your routes here
app.use('/api/v1/user', userRouter)
app.use('/api/v1/todo', todoRouter)

app.listen(port, ()=> console.log(`server is running at http://localhost:${port}`));

