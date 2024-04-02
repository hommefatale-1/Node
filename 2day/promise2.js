//클래스 생성
class Login {
  //클래스 메서드생성
  checkUser(id, pwd) {
      return new Promise((resolve, reject) => {
          if (
              (id == 'test123' && pwd == '123')
              ||
              (id == 'admin' && pwd == 'admin')
          ) {
              resolve(id);
          } else {
              reject(new Error("에러발생"));
          }
      })
  }
  getStatus(id) {
      return new Promise((resolve, reject) => {
          if (id == 'admin') {
              resolve("관리자");
          } else {
              if (id == undefined) {
                  reject(new Error("에러발생!"));
              } else {
                  resolve("일반유저");
              }
          }
      })  
  }
}


//클래스의 인스턴스 생성
var login = new Login();
login
  .checkUser('admin', 'admin')
  .then(id => {
                console.log(id + "ㅎㅇ")
                return login.getStatus(id);
              })
  .then(status => {console.log(status + " 입니다")})
  .catch(error => {console.log(error)});
