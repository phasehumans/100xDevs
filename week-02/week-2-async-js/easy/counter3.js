let count= 0;

const counter = () => {
    console.log(count)
    count++


    // recursion -> w/o base condn
    setInterval(counter, 1000)
}