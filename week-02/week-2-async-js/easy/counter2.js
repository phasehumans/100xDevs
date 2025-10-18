// let n= 10

// let count= 0
// setTimeout(() => {
//     console.log(`1`)
//     count++
// }, 1000);


let count= 0

const counter = () => {
    console.log(count)
    count++

    // recursion w/ base condn
    if(count < 10){
        setTimeout(counter, 1000)
    }
}

counter()