function runGame(){
    location.assign("gamePage.html");
}
$(".ready").toggle(1000);
$(".go").show(1000).slideUp(3000);
$("#pauseBtn").click();
$("pause").toggle(1000);
$(".playSound").

document.getElementById("pauseBtn").addEventListener("click",popUp);
document.getElementById("close").addEventListener("click",popUp);
var click = 0;
function popUp(){
    if(click === 0){
        document.getElementById("container4").style.display="block";
        click = 1;
    }else{
        document.getElementById("container4").style.display="none";
        click = 0;
    }
}
document.getElementById("cont").addEventListener("click",contPlay);
function contPlay(){
    document.getElementById("container4").style.display="none";
}

document.getElementById("homePage").addEventListener("click",backHome);
function backHome(){
    location.assign("index.html");
}
document.getElementById("reset").addEventListener("click",runGame);



