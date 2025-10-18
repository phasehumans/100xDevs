let count= 0;

const counter = () => {
    console.log(count)
    count++


    // recursion
    setInterval(counter, 1000)
}