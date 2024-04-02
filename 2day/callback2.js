// 콜백함수 쓸때 on  붙힌다
function login(id, pwd, onSuccess, onFail){
    if(id == 'test' && pwd == '1234'){
        onSuccess(id);
    }else{
        onFail();
    }
}

function print1(id){
    console.log(id + " 로그인 성공");
}

function print2(){
    console.log("로그인 실패");
}

login('test1', '1234', print1, print2);
