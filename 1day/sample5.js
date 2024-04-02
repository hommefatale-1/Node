function sample1(callback){
    setTimeout(() => {callback();}, 3000);
    console.log("1");
}
function sample2(){
    console.log("2");
}
function sample3(){ 
    console.log("3");
}

sample1(sample2);