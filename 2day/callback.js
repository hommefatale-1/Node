// console.log("1");
// setTimeout(() =>{console.log("2");},2000);
// console.log("3");

function sum(num1, num2, callback){
    var num3 = num1 + num2;
    callback(num3);
}
// sum함수를 호출하면 '두 수의 합은 00입니다.'

// console.log("두수의 합은" + sum(1, 2, (num3)) + "입니다");

// sum(1, 2, function(sum3){
//     console.log("두스이 합은"+ num3 + "입니다");
// })

function print(num){
    console.log('두 수의 합은' + num + '입니다.');
}

sum(1, 2, print);