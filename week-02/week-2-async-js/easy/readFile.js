// import fs from "fs"
const fs= require("fs")

function read(filename, cb){
    // readfile takes 3 args- filepath, unicode and cb
    fs.readFile(filename, "utf-8", (err, data) =>{
        console.log("inside callback fn");
        cb(data)
    })
}

read("sample.txt", (data)=>{
    console.log(data)
})

// error was filepath


// const fs = require("fs");

// function read(filename, cb) {
//   fs.readFile(filename, "utf-8", (err, data) => {
//     console.log("inside");
//     if (err) {
//       console.error("Error reading file:", err);
//       cb(undefined);
//       return;
//     }
//     cb(data);
//   });
// }

// read("sample.txt", (data) => {
//   console.log("File content:", data);
// });

