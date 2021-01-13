const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = 1279;
canvas.height = 565;

////////Power up classes//////////
//////General Class of Power Ups//
//////general class to inherit from it//
class PowerUp{
    constructor(){
        this.x=Math.floor(Math.random() * 1000);
        this.y=Math.floor(Math.random() * 500);
    }
    static draw(){
        // ctx.drawImage(starphoto,this.x,this.y);
    }
}
////star///
var timetodrawstar=0;
class Star extends PowerUp{
    constructor(){
        super();
    }
    draw(){
        ctx.drawImage(starphoto,this.x,this.y);
    }
}
var star=new Star();
function createStar(){
    if(timetodrawstar %200 === 0){
        star=new Star;
    }
    star.draw();
}
////Life///
var timetodrawlife=0;
class Life extends PowerUp{
    constructor(){
        super();
    }
    draw(){
        ctx.drawImage(lifephoto,this.x,this.y);
    }
}
var life=new Life();
function createLife(){
    if(timetodrawlife %300 === 0){
        life=new Life;
    }
    life.draw();
}
////////////////////////////////////
// main character Blue tank//
const keys = [];
// const player = {
//     x:200,
//     y:200,
//     width: 96,
//     height: 96,
//     framex:0,
//     framey:0,
//     speed:4,
// }
class player{
    constructor(){
    this.x=200;
    this.y=200
    this.width=96
    this.height=96
    this.framex=0
    this.framey=0
    this.speed=4
    this.radius = 40;
    }
}

//obstacle
class obstacle{
    constructor(){
        this.x = 0 ;
        this.y = 0 ;
        this.sx = Math.floor(Math.random()*6);
        this.sy = 0;
    }
}
//somehidden circle to calculate distance between our main object
//and the other obstacles
class hiddencircle{
    constructor(){
        this.radius = 30;
        this.x = 0;
        this.y = 0;
        this.distance;
    }

    draw(){
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2)
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    }

    collision(){
        let distance_x = player1.x      - this.x;
        let distance_y = player1.y     - this.y;
        let radii_sum  = player1.radius + this.radius;
        if (distance_x * distance_x + distance_y * distance_y <= radii_sum * radii_sum){
            let length = Math.sqrt(distance_x * distance_x + distance_y * distance_y) || 1;
            let unit_x = distance_x / length;
            let unit_y = distance_y / length;
            player1.x = this.x + (radii_sum + 1) * unit_x ;
            player1.y = (this.y + (radii_sum + 1) * unit_y) ;
        }
    }
}

const circlearray = [];
const obstaclearray =[];
const obsx = [300,400,800,975];
const obsy = [100,350,250,400]
function obsnum(){
    for (let i = 0 ; i< 4 ; i++){
        obstaclearray.push(new obstacle())
        circlearray.push(new hiddencircle())
        circlearray[i].x = obsx[i];
        circlearray[i].y = obsy[i];
        obstaclearray[i].x = obsx[i];
        obstaclearray[i].y = obsy[i];
    }
}

const player1 = new player();
const circle1 = new hiddencircle();
function playercircle(){
    circle1.x = player1.x;
    circle1.y= player1.y;
    circle1.radius=66;
    //circle1.draw();
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
const obst = new Image();
obst.src = "Obstcle.png"
//enemy //
const enemy = new Image();
enemy.src = "leviathan.png";
//stars //
const starphoto=new Image()
starphoto.src="star.png";
//Life //
const lifephoto=new Image()
lifephoto.src="heart.png";

//draw component of canvas //
function drawsprite(img,sx,sy,sw,sh,dx,dy,dw,dh){
    ctx.drawImage(img,sx,sy,sw,sh,dx,dy,dw,dh)
}


function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    
    //player
    drawsprite(playersprite,player1.width*player1.framex,player1.height*player1.framey,player1.width,player1.height,player1.x,player1.y,player1.width,player1.height)
    moveplayer();
    
    //obstacle
      //small rock
    // drawsprite(obstacle,0,0,46,60,1000,400,46,60);
    // drawsprite(obstacle,0,0,46,60,50,250,46,60);
    // drawsprite(obstacle,0,0,46,60,1000,100,46,80);
    //    //big rock
    // drawsprite(obstacle,92,0,46,60,591,451,85,106);
    // drawsprite(obstacle,92,0,46,60,591,451,85,106);
    //    //trees
    // drawsprite(obstacle,184,0,46,60,100,300,88,99);
    // drawsprite(obstacle,184,0,46,60,1120,100,88,90);
    // drawsprite(obstacle,46,0,46,60,500,378,70,70);
    // drawsprite(obstacle,138,0,46,60,323,166,76,106);
    // drawsprite(obstacle,230,0,46,60,810,450,81,105);
    
    
    //enemy
    drawsprite(enemy, redEnemy.width*redEnemy.framex , redEnemy.height*redEnemy.framey ,redEnemy.width, redEnemy.height, redEnemy.x,redEnemy.y,redEnemy.width,redEnemy.height);
    red++ ;
    moveEnemy();
    ///star power up///
    timetodrawstar++;
    createStar();
    ///life power up///
    timetodrawlife++;
    createLife();
    for (let i =0 ; i<obstaclearray.length ; i++){
        
        
        ctx.drawImage(obst,obstaclearray[i].sx*46,0,46,60,obstaclearray[i].x,obstaclearray[i].y,92,132)
        //circlearray[i].draw();
        circlearray[i].collision();
        // if (circlearray[i].distance < circlearray[i].radius + player1.radius){
        //     player1.speed = 0;
            
            
        // }
    }
    playercircle();
    requestAnimationFrame(animate); 
}
obsnum()
animate();

window.addEventListener("keydown",function(e){
    keys[e.which] = true;
    
})
window.addEventListener("keyup",function(e){
    delete keys[e.which];
})


function moveplayer(){
    if (keys[38] && player1.y>-16){
        player1.y -= player1.speed;
        player1.framey = 3;
    }

    if (keys[37] && player1.x>0){
        player1.x -= player1.speed;
        player1.framey = 1;
    }

    if (keys[40] &&  player1.y<canvas.height - player1.height){
        player1.y += player1.speed;
        player1.framey = 0;
    }

    if (keys[39] && player1.x<canvas.width - player1.width){
        player1.x += player1.speed;
        player1.framey = 2;
    }
}

// cut image direction 
// 3 +y Up.
// 1 -x Left.
// 0 -y Down.
// 2 +x Right.

var direction = [0,1,2,3];

// var myVar = setInterval(moveEnemy, 1000);

//move enemy//
function moveEnemy(){
    if(redEnemy.x < canvas.width - redEnemy.width && redEnemy.y < canvas.height - redEnemy.height){
        for(let i = 0 ; i < 4; i++ ){
            if(redEnemy.framey === 3){
                redEnemy.y -= redEnemy.speed; 
                if(red === 20){ 
                    redEnemy.framey = 2;
                    red++;
                }
                if(red === 40 && redEnemy.framey === 2){
                    redEnemy.x -= redEnemy.speed;
                    red++;
                    redEnemy.framey = 0;
                }
                if(red === 70 && redEnemy.framey === 0){
                    redEnemy.y += redEnemy.speed;
                    red++;
                    redEnemy.framey = 1;
                }
                if(red === 90 && redEnemy.framey === 1){
                    redEnemy.x += redEnemy.speed;
                } 
            }
        } 
    }
    
     
}