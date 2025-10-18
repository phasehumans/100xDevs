const fs= require('fs')


fs.readFile("sample.txt", "utf-8", (err, data)=>{
    if(err){
        console.log("error", + err)
        return
    }

    console.log(data)
})

/* 
eradfile operation will start and async in bg and head over to expensive fn ; 
- expensive operation will prinnt and then file content

*/
const expensiveOperation = () => {
  let sum = 0;
  for (let i = 0; i < 1e8; i++) {
    sum += i;
  }
  console.log("Expensive operation done");
};

expensiveOperation()