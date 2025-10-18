// let n= 10


// setInterval(() =>{
//     for(let i= 0; i < n; i++){
//         console.log(`${i} sec`)
//     }
// }, 1000)

let count= 0

setInterval(() => {
    console.log(`${count} sec`)
    if(count <= 10){
        count++;
    }else{
        exit()
        // stop after 10 sec?
    }
}, 1000);