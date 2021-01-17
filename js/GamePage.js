
function runGame() {    
    location.replace("gamePage.html");
}

// game variables//
var countMusic = 1;
var click = 0;
var count = 1;
$("#win").hide();
$("#goal").hide();

//Ready go show up//

$("#pauseBtn").click();
$("pause").toggle(1000);
$(".go").hide();
$(".ready").hide();

// listener events//
document.getElementById("pauseBtn").addEventListener("click", popUp);
document.getElementById("close").addEventListener("click", popDown);
document.getElementById("cont").addEventListener("click", contPlay);
document.getElementById("homePage").addEventListener("click", backHome);
document.getElementById("reset").addEventListener("click", runGame);
document.getElementById("playSound").addEventListener("click", playSound);
document.getElementById("playMusic").addEventListener("click", playMusic);
document.addEventListener("keypress",autoPlaySound);


$("#pauseBtn").hover(function(){
    $(this).css("height", "90px");    
},function(){
    $(this).css("height", "70px");
})


//select elements//
var containerElement = document.getElementById("canvas1");
var sound = document.getElementById("audio");
var music = document.getElementById("audioMusic");
var off1 = document.getElementById("off1");
var off2 = document.getElementById("off2");
var offtxt1 = document.getElementById("offtxt1");
var offtxt2 = document.getElementById("offtxt2");


//game functions //

function popUp() {
    if (click === 0) {
        if (countMusic === 1 && paused === false) {
            music.play();
        }
        document.getElementById("container4").style.display = "block";
        containerElement.setAttribute('class', 'blur');
        document.getElementById("3").setAttribute('class', 'blur');
        document.getElementById("2").setAttribute('class', 'blur');
        paused = true;        
    } 
}

function popDown() {

    if (countMusic === 1) {
        music.play();
    }
    document.getElementById("container4").style.display = "none";
    containerElement.setAttribute('class', null);
    document.getElementById("3").setAttribute('class', null);
    document.getElementById("2").setAttribute('class', null);
    paused = false;
    click = 0;
    requestAnimationFrame(animate);
}
function contPlay() {

    if (countMusic === 1) {
        music.play();
    }
    paused = false;
    document.getElementById("container4").style.display = "none";
    containerElement.setAttribute('class', null);
    document.getElementById("3").setAttribute('class', null);
    document.getElementById("2").setAttribute('class', null);
    requestAnimationFrame(animate);

}

function backHome() {
    if (countMusic === 1) {
        music.play();
    }
    swal({
        title: "Are you sure?",
        text: "Once back, you will not be able to recover your Score!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                location.assign("index.html");

            } else {
                swal("Your game level is safe!");
            }
        });
}

function playSound() {
    if (count === 0) {
        count = 1;
        sound.play();
        $("#playSound").animate({ left: '85px' }, 200, function () {
            off1.src = "Img/on.png";
            offtxt1.textContent = "ON";
            $("#offtxt1").css("left", "55px");
        });
    }
    else {
        sound.pause();
        count = 0;
        $("#playSound").animate({ left: '30px' }, 200, function () {
            off1.src = "Img/off.png";
            $("#offtxt1").css("left", "90px");
            offtxt1.textContent = "OFF";
        });

    }
}

if (countMusic === 1) {
    autoPlayMusic();
}


function playMusic() {
    if (countMusic === 0) {
        countMusic = 1;
        music.play();
        $("#playMusic").animate({ left: '85px' }, 200, function () {
            off2.src = "Img/on.png";
            offtxt2.textContent = "ON";
            $("#offtxt2").css("left", "55px");
        });
    }
    else {
        music.pause();
        countMusic = 0;
        $("#playMusic").animate({ left: '30px' }, 200, function () {
            off2.src = "Img/off.png";
            $("#offtxt2").css("left", "90px");
            offtxt2.textContent = "OFF";
        });
    }
}
function autoPlayMusic() {
    $("#playMusic").animate({ left: '85px' }, 200, function () {
        off2.src = "Img/on.png";
        offtxt2.textContent = "ON";
        $("#offtxt2").css("left", "55px");
    });
}

function autoPlaySound() {
    if (count === 1){
        sound.play();
        $("#playSound").animate({ left: '85px' }, 200, function () {
            off1.src = "Img/on.png";
            offtxt1.textContent = "ON";
            $("#offtxt1").css("left", "55px");
        });

    }
   
}


