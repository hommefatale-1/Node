// function timer() {
//     setTimeout(() => { 
//         console.log(1);
//         setTimeout(() => {
//              console.log(2);
//              setTimeout(() => { 
//                 console.log(3);
//              }, 1000)
//         }, 1000)
//     }, 1000)
// }
// timer();

function timer(num){
 return new Promise((resolve) => {
    setTimeout(() => {resolve(num)}, 1000);
 });
}

timer(0)
    .then(num => {console.log(num); return timer(1);})
    .then(num => {console.log(num); return timer(2);})
    .then(num => {console.log(num); return timer(3);})