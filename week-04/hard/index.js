const express = require("express");
const dotenv = require("dotenv");
const router = require("./routes/user");
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/healthy", (req, res)=> res.send("I am Healthy"));

//  start writing your routes here
app.use('/api/v1/', router)

app.listen(port, ()=> console.log(`server is running at http://localhost:${port}`));

