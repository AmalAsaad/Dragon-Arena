const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = 1279;
canvas.height = 565;

////////Power up classes/////////
////star///
var timetodrawstar=0;
class Star{
    constructor(){
        this.x=Math.floor(Math.random() * 1000);
        this.y=Math.floor(Math.random() * 500);
    }
    draw(){
        ctx.drawImage(starphoto,this.x,this.y);
    }
}
var star=new Star();
function createStar(){
    if(timetodrawstar %500 === 0){
        star=new Star;
    }
    star.draw();
}
////////////////////////////////////
// main character Blue tank//
const keys = [];
const player = {
    x:200,
    y:200,
    width: 96,
    height: 96,
    framex:0,
    framey:0,
    speed:4,
}
//enemy character Red tank //
var red = 0;
const redEnemy = {
    x:400,
    y:300,
    width:96,
    height:96,
    framex:0,
    framey:3,
    speed:Math.random()*3 
};
//main character //
const playersprite = new Image();
playersprite.src = "leviathan.png"
//obstacle //
const obstacle = new Image();
obstacle.src = "Obstcle.png"
//enemy //
const enemy = new Image();
enemy.src = "leviathan.png";
//stars //
const starphoto=new Image()
starphoto.src="star.png";

//draw component of canvas //
function drawsprite(img,sx,sy,sw,sh,dx,dy,dw,dh){
    ctx.drawImage(img,sx,sy,sw,sh,dx,dy,dw,dh)
}


function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    requestAnimationFrame(animate); 
    //player
    drawsprite(playersprite,player.width*player.framex,player.height*player.framey,player.width,player.height,player.x,player.y,player.width,player.height)
    moveplayer();
    //obstacle
      //small rock
    drawsprite(obstacle,0,0,46,60,1000,400,46,60);
    drawsprite(obstacle,0,0,46,60,50,250,46,60);
    drawsprite(obstacle,0,0,46,60,1000,100,46,80);
       //big rock
    drawsprite(obstacle,92,0,46,60,591,451,85,106);
    drawsprite(obstacle,92,0,46,60,591,451,85,106);
       //trees
    drawsprite(obstacle,184,0,46,60,100,300,88,99);
    drawsprite(obstacle,184,0,46,60,1120,100,88,90);
    drawsprite(obstacle,46,0,46,60,500,378,70,70);
    drawsprite(obstacle,138,0,46,60,323,166,76,106);
    drawsprite(obstacle,230,0,46,60,810,450,81,105);
    
    
    //enemy
    drawsprite(enemy, redEnemy.width*redEnemy.framex , redEnemy.height*redEnemy.framey ,redEnemy.width, redEnemy.height, redEnemy.x,redEnemy.y,redEnemy.width,redEnemy.height);
    red++ ;
    moveEnemy();
    ///star power up///
    timetodrawstar++;
    createStar();
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

// cut image direction 
// 3 +y Up.
// 1 -x Left.
// 0 -y Down.
// 2 +x Right.

var direction = [0,1,2,3];

// var myVar = setInterval(moveEnemy, 1000);


function moveEnemy(){
    if(redEnemy.x < canvas.width - redEnemy.width && redEnemy.y < canvas.height - redEnemy.height){
        for(let i = 0 ; i < 4; i++ ){
            if(redEnemy.framey === 3){
                redEnemy.y -= redEnemy.speed; 
                if(red === 30){ 
                    redEnemy.framey = 2;
                }
                if(red === 50){
                    redEnemy.x -= redEnemy.speed;
                    red++;
                }
                
                
                // redEnemy.framey = 1;
                // redEnemy.y = redEnemy.speed; 
                // redEnemy.framey = 3;
                // redEnemy.y =redEnemy.speed;  
            }

        } 
    }
    
     
}