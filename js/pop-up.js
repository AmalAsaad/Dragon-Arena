


document.getElementsByClassName("btn")[0].addEventListener("click",pop)
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