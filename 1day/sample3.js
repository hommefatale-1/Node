function sum(x, y, callback){
    var num = x + y;
    callback(num);   
}
//화살표 콜백 함수
sum(2, 2, (num) => {
    console.log("두 수의 합은 : " + num);  
});