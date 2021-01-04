var btn1=document.getElementById("owner");
btn1.addEventListener("click",fun1)
var list=document.getElementById("names")
function fun1(){ 
       list.style.display='block'
}
var btn2=document.getElementById("exit")
btn2.addEventListener("click",fun2)
function fun2(){
    list.style.display='none'
}
// var btn3=document.getElementById("play")
// btn3.addEventListener("click",fun3)
//////////////Insruction button///////////////////
document.getElementById("help").addEventListener("click",pop)
document.getElementsByClassName("close")[0].addEventListener("click",pop)
var c = 0;
function pop(){
    if(c===0){
        document.getElementById("box").style.display="block";
        c = 1;
    }else{
        document.getElementById("box").style.display="none";
        c = 0;
    }
}
///////////////////////////////////////////////////