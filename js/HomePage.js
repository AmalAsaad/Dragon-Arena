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