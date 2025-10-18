let count= 0

setInterval(() => {
    console.log(`${count} sec`)
    if(count <= 10){
        count++;
    }else{
        return
        // stop after 10 sec?
    }
}, 1000);

// setInterval -> runs callback in specific interval;
// setTimeout -> runs callback after timer is over | timer guarentte that ishe toh pehle nahi run karenga callback

let i= 1
function counterrr (){
    console.log(i)
    i++
}

setInterval(counterrr, 2000);
// runs counterr fn after every 2 sec