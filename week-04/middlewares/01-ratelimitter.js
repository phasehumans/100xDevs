// You have to create a middleware for rate limiting a users request based on their username passed in the header

const express = require('express');
const app = express();

// Your task is to create a global middleware (app.use) which will
// rate limit the requests from a user to only 5 request per second
// If a user sends more than 5 requests in a single second, the server
// should block them with a 404.
// User will be sending in their user id in the header as 'user-id'
// You have been given a numberOfRequestsForUser object to start off with which
// clears every one second

let numberOfRequestsForUser = {};

app.use((req, res, next) => {
  const userid = req.header('user-id')

  if(!userid){
    // return
    return res.status(400).json({
      error: "user-id is required"
    })
  }

  const currentTime= Math.floor(Date.now() / 1000)

  if(!numberOfRequestsForUser[userid]){
    numberOfRequestsForUser[userid] = {
      count : 0,
      lastTime: currentTime
    }
  }

  const user= numberOfRequestsForUser[userid]

  if(currentTime === user.lastTime){
    user.count = user.count + 1
  }else{
    user.count= 1
    user.lastTime= currentTime
  }

  if(user.count > 5){
    return res.status(404).json({
      error: "request per second exceed"
    })
  }

  next()
});



setInterval(() => {
    numberOfRequestsForUser = {};
}, 1000)


app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' });
});

app.post('/user', function(req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});

module.exports = app;