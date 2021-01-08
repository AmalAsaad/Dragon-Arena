///////////Directing to game page//////////
function runGame(){
    location.assign("gamePage.html");
}
////////Owner button////////////
var ownerbtn=document.getElementById("owner");
ownerbtn.addEventListener("click",fun1)
var list=document.getElementById("names")
function fun1(){ 
       list.style.display='block'
}
var exitbtn=document.getElementById("exit")
exitbtn.addEventListener("click",fun2)
function fun2(){
    list.style.display='none'
}
////////bouncing play button//////////
// $("#play").effect( "bounce", {times:3}, 300 );
//////////////Insruction button///////////////////
// document.getElementById("help").addEventListener("click",pop)
// document.getElementsByClassName("close")[0].addEventListener("click",pop)
// var c = 0;
// function pop(){
    
//     if(c===0){
//         document.getElementById("box").style.display="block";
//         c = 1;
//     }else{
//         document.getElementById("box").style.display="none";
//         c = 0;
//     }
// }
///////////////////////////////////////////////////