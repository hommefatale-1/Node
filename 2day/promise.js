var obj = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("The bed is my stage");
    reject(new Error("에러"));
  }, 2000);  
});

obj
    //성공시
    .then(value => {console.log(value);})
    //오류시
    .catch(error => {console.error(error)})
    //무조건 실행
    .finally(() => {console.log("무조건 실행");});
