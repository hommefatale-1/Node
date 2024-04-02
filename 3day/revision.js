function time(num) {
    return new Promise((resolve) => { setTimeout(() => { resolve(num) }, 1000) })
}


//callback
function timer() {
    setTimeout(() => {
        console.log(1);
        setTimeout(() => {
            console.log(2);
            setTimeout(() => { console.log(3) }, 1000)
        }, 1000)
    }, 1000)
} 
//Promise
time(1)
    .then((num) => { console.log(num); return time(2); })
    .then((num) => { console.log(num); return time(3); })
    .then((num) => { console.log(num); return; })
//async