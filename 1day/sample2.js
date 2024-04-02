function sum(x, y, callback){
    var num = x + y;
    callback(num);   
}
//익명함수 사용하여 콜백함수
sum(1, 2, function(num){
    console.log("두 수의 합은 : " + num);  
});