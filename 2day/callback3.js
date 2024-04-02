// 콜백함수 쓸때 on  붙힌다
function login(id, pwd, onSuccess, onFail){
    //id: test , pwd: 1234
    //id:pwd 같을 경우 onSuccesss실행
    //id:pwd 다를 경우 onFail 실행
    if(id == 'test' && pwd == '1234'){
        onSuccess(id);
    }else{
        onFail();
    }
    
}
// function println1(id){
//     console.log(id + "님 환영합니다!");
// }
// function println2(){
//     console.log("로그인 실패");
// }
// 콜백함수
// login('test', '1234', println1, println2);

//익명 콜백함수
//login('test', '1234', function(id){console.log(id + "님 환영합니다!")}, function(){console.log("로그인 실패")});

//화살표 콜백함수
login('test', '1234',(id) =>{console.log(id + "님 환영합니다!")},() => console.log("로그인 실패"));