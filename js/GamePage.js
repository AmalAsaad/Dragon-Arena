function runGame(){
    if(countMusic === 1){
        music.play();
    }
    location.assign("gamePage.html");
}

// =====================================================//



//Ready go show up//
$(".ready").toggle(1000);
$(".go").show(1000).slideUp(3000);
$("#pauseBtn").click();
$("pause").toggle(1000);

// puase menue //
document.getElementById("pauseBtn").addEventListener("click",popUp);
var containerElement = document.getElementById("canvas1");
document.getElementById("close").addEventListener("click",popUp);
var click = 0;
function popUp(){
    
    if(countMusic === 1){
        music.play();
    }
    if(click === 0){
        document.getElementById("container4").style.display="block";
        containerElement.setAttribute('class', 'blur');
        document.getElementById("3").setAttribute('class', 'blur');

        paused = true;
        click = 1;
    }else{
        document.getElementById("container4").style.display="none";
        containerElement.setAttribute('class', null);
        document.getElementById("3").setAttribute('class', null);
        paused = false;
        click = 0;
        requestAnimationFrame(animate);

    }  
}
document.getElementById("cont").addEventListener("click",contPlay);
function contPlay(){
    
    if(countMusic === 1){
        music.play();
    }
    paused=false;
    document.getElementById("container4").style.display="none"; 
    requestAnimationFrame(animate);
    
}

document.getElementById("homePage").addEventListener("click",backHome);
function backHome(){
    if(countMusic === 1){
        music.play();
    }
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
           $("#playSound").animate({left :'85px'},200, function(){
                off1.src = "Img/on.png";
                offtxt1.textContent = "ON";
                $("#offtxt1").css("left","55px");                
           });
        }
        else{
            sound.pause();
            count = 0;
            $("#playSound").animate({left :'30px'},200, function(){
                off1.src = "Img/off.png";
                $("#offtxt1").css("left","90px");
                offtxt1.textContent = "OFF";    
           });
                      
        }
}
var countMusic = 0;
function playMusic(){
    if(countMusic === 0){
       countMusic = 1;
       music.play();
       $("#playMusic").animate({left :'85px'},200, function(){
        off2.src = "Img/on.png";
        offtxt2.textContent = "ON";
        $("#offtxt2").css("left","55px");                
   });
    }
    else{
        music.pause();
        countMusic = 0;
        $("#playMusic").animate({left :'30px'},200, function(){
            off2.src = "Img/off.png";
            $("#offtxt2").css("left","90px");
            offtxt2.textContent = "OFF";    
       });
    }
}
