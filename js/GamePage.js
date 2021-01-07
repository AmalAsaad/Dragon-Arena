function runGame(){
    location.assign("gamePage.html");
}
$(".ready").toggle(1000);
$(".go").show(1000).slideUp(3000);
$("#pauseBtn").click();
$("pause").toggle(1000);


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


var sound = document.getElementById("audio");
var music = document.getElementById("audioMusic");
document.getElementById("playSound").addEventListener("click",playSound);
document.getElementById("playMusic").addEventListener("click",playMusic);

var off1 = document.getElementById("off1");
var off2 = document.getElementById("off2");
var offtxt1 = document.getElementById("offtxt1");
var offtxt2 = document.getElementById("offtxt2");


var count = 0;
function playSound(){
        if(count === 0){
           count = 1;
           sound.play();
           offtxt1.textContent = "ON";
        //    off1.setAttribute("src","../Img/on.png");
           
        }
        else{
            sound.pause();
            count = 0;
            offtxt1.textContent = "OFF";
            // off1.setAttribute("src","../Img/off.png");
        }
}


var countMusic = 0;
function playMusic(){
    if(countMusic === 0){
       countMusic = 1;
       music.play();
       offtxt2.textContent = "ON";
    }
    else{
        music.pause();
        countMusic = 0;
        offtxt2.textContent = "OFF";
    }
}
