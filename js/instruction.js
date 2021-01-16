document.getElementById("toggle").addEventListener("click",showmenu)
// document.getElementById("toggle").addEventListener("click",hideb)
document.getElementById("close1").addEventListener("click",hideb1)
document.getElementById("close2").addEventListener("click",hideb2)
document.getElementById("close3").addEventListener("click",hideb3)
var show = 0;
var bullets=0;
function showmenu(){
    if(show === 0){
        document.getElementById("menu").style.transform="scale(3)"
        show=1;
    }else{
        document.getElementById("menu").style.transform="scale(0)"
        show=0;
    }
}
function showb1(){
        if(bullets===0){
            document.getElementById("controlmenu").style.display="block"
            bullets=1;
        }   
}
function showb2(){
    if(bullets===0){
        document.getElementById("PowerUpmenu").style.display="block"
        bullets=1;
    }   
}
function showb3(){
    if(bullets===0){
        document.getElementById("Goalmenu").style.display="block"
        bullets=1;
    }   
}
function hideb1(){
    if(bullets===1){
        document.getElementById("controlmenu").style.display="none"
        document.getElementById("menu").style.transform="scale(0)"
        bullets=0;
        show=0;
    } 
}
function hideb2(){
    if(bullets===1){
        document.getElementById("PowerUpmenu").style.display="none"
        document.getElementById("menu").style.transform="scale(0)"
        bullets=0;
        show=0;
    } 
}
function hideb3(){
    if(bullets===1){
        document.getElementById("Goalmenu").style.display="none"
        document.getElementById("menu").style.transform="scale(0)"
        bullets=0;
        show=0;
    } 
}