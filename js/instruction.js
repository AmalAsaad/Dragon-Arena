document.getElementById("toggle").addEventListener("click",showmenu)
document.getElementById("toggle").addEventListener("click",hideb)
document.getElementById("close").addEventListener("click",hideb)

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

function showb(){
    
        if(bullets===0){
            document.getElementById("controlmenu").style.display="block"
            bullets=1;
        }   
}

function hideb(){
    if(bullets===1){
        document.getElementById("controlmenu").style.display="none"
        document.getElementById("menu").style.transform="scale(0)"
        bullets=0;
        show=0;
    } 
}