//클래스 생성
class Login{
    //클래스 메서드생성
    checkUser(id, pwd, onSuccess, onFail){
        if(
            (id == 'test' && pwd == '1234')
            ||
            (id == 'admin' && pwd == 'admin')
            ){
            onSuccess(id);
        }else{
            onFail();
        }   
    }
    //클래스 메서드생성
    getStatus(id, onSuccess, onFail){
        //아이디가 어드민인 경우 관리자 입니다.
        //아이디가 어드민 아닌 사람이 로그인 할 경우 님은 일반 유저입니다
        if(id == 'admin'){
            onSuccess("관리자");
        }else{
            if(id == undefined){
                onFail(new Error("에러발생!"));
            }else{
                onSuccess("일반유저");
            }
        } 
        
    }
}

//클래스의 인스턴스 생성
var login = new Login();
login.checkUser('admin',
                'admin',
                (id) => {console.log(id + "님 환영합니다");
                        login.getStatus(id, (status) => {console.log(status + "입니다.");}, (error) => console.log(error))
                        },
                (error) => {console.log("error")}
                );
