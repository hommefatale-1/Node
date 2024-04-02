function timer(num) {
    return new Promise((resolve) => {
        setTimeout(() => { resolve(num) }, 1000)
    });
}
//비동기 함수 1초에 하나씩 콘솔 출력
async function test() {
    let num = await timer(1);
    console.log(num);
    num = await timer(2);
    console.log(num);
    num = await timer(3);
    console.log(num);
}
//test();
console.log("시작!");
test()
    .then(() => {console.log("끝!")});

async function test1() {
    console.log("시작!");
    for (let i = 1; i <= 5; i++) {
        let num = await timer(i);
        console.log(num);
    }
    console.log("끝으라!");
}
//test1();
async function test2() {
    console.log("시작!");
    await test();
    console.log("끝으라!");
}
//test2();



