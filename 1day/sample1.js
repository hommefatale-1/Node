function sample1(name, callback){
    console.log("침대의제왕은 " + name + " 님입니다.");
    callback("서울시");
    
}


function sample2(address){
    console.log("주소는 " + address + " 입니다.");
}

sample1("김승인", sample2);