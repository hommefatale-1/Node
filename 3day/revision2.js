//callback
// function async1(param, callback) {
//     console.log("첫 번째");
//     setTimeout(function () { callback(param + 1); }, 1000);
// }

// function async2(param, callback) {
//     console.log("두 번째");
//     setTimeout(function () { callback(param + 2); }, 1000);
// }

// function async3(param, callback) {
//     console.log("세 번째");
//     setTimeout(function () { callback(param + 3); }, 1000);
// }

// async1(1, function (result1) {
//     async2(result1, function (result2) {
//         async3(result2, function (result3) {
//             console.log("최종 결과:", result3);
//         });
//     });
// });

//Promise
function test(num) {
    return new Promise((resolve) => { setTimeout(() => { resolve(num) }, 1000) })
}
test(1)
    .then((num) => { console.log("첫번째"); return test(num + 1); })
    .then((num) => { console.log("두번째"); return test(num + 2); })
    .then((num) => { console.log("세번째"); return test(num + 3); })
    .then((num) => { console.log("촤종결과: ",num ); return;});