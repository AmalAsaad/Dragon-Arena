const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = 1279;
canvas.height = 565;

const keys = [];

const player = {
    x:200,
    y:200,
    width: 96,
    height: 96,
    framex:0,
    framey:0,
    speed:4,
    moving:false
}

const playersprite = new Image();
playersprite.src = "leviathan.png"
// const background = new Image();
// background.src = "background.png"

function drawsprite(img,sx,sy,sw,sh,dx,dy,dw,dh){
    ctx.drawImage(img,sx,sy,sw,sh,dx,dy,dw,dh)
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    //ctx.drawImage(background,0,0,canvas.width,canvas.height)
    drawsprite(playersprite,player.width*player.framex,player.height*player.framey,player.width,player.height,player.x,player.y,player.width,player.height)
    moveplayer();
    requestAnimationFrame(animate)
}
animate();

window.addEventListener("keydown",function(e){
    keys[e.which] = true;
    console.log(keys);
})
window.addEventListener("keyup",function(e){
    delete keys[e.which];
})


function moveplayer(){
    if (keys[38] && player.y>-16){
        player.y -= player.speed;
        player.framey = 3;
    }

    if (keys[37] && player.x>0){
        player.x -= player.speed;
        player.framey = 1;
    }

    if (keys[40] &&  player.y<canvas.height - player.height){
        player.y += player.speed;
        player.framey = 0;
    }

    if (keys[39] && player.x<canvas.width - player.width){
        player.x += player.speed;
        player.framey = 2;
    }
}