// cut image direction 
// 3 +y Up.
// 1 -x Left.
// 0 -y Down.
// 2 +x Right.
const keys = [];
const circlearray = [];
const obstaclearray =[];
const enemies = [];
const heart = [];
const starr = [];
var timetodrawstar=0;
var timetodrawlife=0;
var enemycounter =0 ;
var setUpEnemy = true;
var totalEnemies = Math.floor(Math.random()*10)+5;
const obsx = [300,400,800,975];
const obsy = [100,350,250,400];

//events on arrows for player movement//
window.addEventListener("keydown",function(e){
    keys[e.which] = true;   
})
window.addEventListener("keyup",function(e){
    delete keys[e.which];
})
// update canvas
window.onload = function(){
    canvas = document.getElementById("canvas1"); 
    ctx = canvas.getContext('2d');
    setInterval(loop,1000/50);
}
/// images ///
//player //
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


//Power up classes//
//////General Class of Power Ups//
//////general class to inherit from it//
class PowerUp{
    constructor(){
        this.x=Math.floor(Math.random() * 1000);
        this.y=Math.floor(Math.random() * 500);
        this.distance;
    }
    static draw(){
        // ctx.drawImage(starphoto,this.x,this.y);
    }
}
////star///



class Star extends PowerUp{
    constructor(){
        super();
    }
    draw(){
        ctx.drawImage(starphoto,this.x,this.y);
    }
}
//var star=new Star();
starr.push(new Star);
function createStar(){
    if(timetodrawstar %300 === 0){
             //star=new Star;
                    if(starr.length===1){
                        starr.splice(0,1);
                    }
                    starr.push(new Star());
    }
    if (starr.length>0){
        let distance_x = (player1.x+25)      - starr[0].x;
        let distance_y = (player1.y+25)     - starr[0].y;
        let radii_sum  = (player1.radius) + 20;
                    if (distance_x * distance_x + distance_y * distance_y <= radii_sum * radii_sum){
                            starr.splice(0,1);
                    }
    }

    if (starr.length>0){
        starr[0].draw();
    }
        
    }
    

////Life///


class Life extends PowerUp{
    constructor(){
        super();
    }
    draw(){
        ctx.drawImage(lifephoto,this.x,this.y);
    }
}
//var life=new Life();
heart.push(new Life);
function createLife(){

    if(timetodrawlife %200 === 0){
        //life=new Life;
                    if(heart.length===1){
                        heart.splice(0,1);
                    }
                    heart.push(new Life());
    }

    if (heart.length>0){
        let distance_x = (player1.x+25)      - heart[0].x;
        let distance_y = (player1.y+25)     - heart[0].y;
        let radii_sum  = (player1.radius) + 11;
                    if (distance_x * distance_x + distance_y * distance_y <= radii_sum * radii_sum){
                            heart.splice(0,1);
                    }
    }
        
    if (heart.length>0){
        heart[0].draw();
    }
    
}

// main character Blue tank class//
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
//enemy class //
class redEnemy{
    constructor(x,y,h,w,xspeed,yspeed,framex,framey,angle){
        this.x=x;
        this.y=y;
        this.h=h;
        this.w=w;
        this.framex=framex;
        this.framey=framey;
        this.xspeed=xspeed;
        this.yspeed=yspeed;
        this.angle =angle;
    }
    draw(){
        ctx.drawImage(enemy, this.w*this.framex ,this.h*this.framey ,this.w, this.h, this.x,this.y,this.w,this.h);
    }
    move(){
        if(this.framey===0){
            this.y += this.yspeed;
            if(this.y>=canvas.height - this.h){
                this.framey = Math.floor(Math.random() * 4);
                this.x += this.xspeed;
                this.x -= this.xspeed;
                this.y += this.xspeed;
                this.y -= this.xspeed;
            }
        }
        if(this.framey === 1){
            this.x -= this.xspeed;
            if(this.x<=0 || this.x + this.w >= canvas.width ){
                this.framey = Math.floor(Math.random() * 4);
                this.x += this.xspeed;
                this.x -= this.xspeed;
                this.y += this.xspeed;
                this.y -= this.xspeed;
            }
        }
        if(this.framey === 2){
            this.x += this.xspeed;
            if(this.x>=canvas.width - this.w){
                this.framey =Math.floor(Math.random() * 4);
                this.x += this.xspeed;
                this.x -= this.xspeed;
                this.y += this.xspeed;
                this.y -= this.xspeed;
            }
        }
        if(this.framey === 3){
            this.y -= this.xspeed;
            if(this.y <= -16){
                this.framey = Math.floor(Math.random() * 4);
                this.x += this.xspeed;
                this.x -= this.xspeed;
                this.y += this.xspeed;
                this.y -= this.xspeed;
                
            }
        }
        // if(this.x + this.w >= canvas.width || this.x <= 0){
        //     // this.x = 0 - this.w;
        //     this.xspeed *= -1;
        //     // this.xspeed = Math.floor(Math.random()*10+5);
        // }
        // if(this.y >canvas.height){
        //     this.y = 0 - this.h;
        //     this.yspeed = Math.floor(Math.random()*10+5);
        // }
    }
}

//obstacle class
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
        let distance_x = player1.x - this.x;
        let distance_y = player1.y  - this.y;
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

//obstacle sum//
function obsnum(){
    for (let i = 0 ; i< 4 ; i++){
        obstaclearray.push(new obstacle())
        circlearray.push(new hiddencircle())
        circlearray[i].x = obsx[i];
        circlearray[i].y = obsy[i];
        obstaclearray[i].x = obsx[i]+15;
        obstaclearray[i].y = obsy[i]-25;
    }
}

const player1 = new player();
const circle1 = new hiddencircle();


function playercircle(){
    circle1.x = player1.x;
    circle1.y= player1.y;
    circle1.radius=33;
    //circle1.draw();
}



//draw component of canvas //
function drawsprite(img,sx,sy,sw,sh,dx,dy,dw,dh){
    ctx.drawImage(img,sx,sy,sw,sh,dx,dy,dw,dh);
}
function loop(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    //player
    drawsprite(playersprite,player1.width*player1.framex,player1.height*player1.framey,player1.width,player1.height,player1.x,player1.y,player1.width,player1.height)
    moveplayer();    

    //enemy
    if(setUpEnemy){
        for(var i =0 ; i<totalEnemies ; i++ ){
            makeEnemies();
        }
        setUpEnemy = false;
    }
    if(enemies.length>0){
        enemies.forEach(function(enemy,i){
            enemy.draw();
            enemy.move();
        });
    }
    ///star power up///
    timetodrawstar++;
    createStar();
    ///life power up///
    timetodrawlife++;
    createLife();

    //obstacles
    for (let i =0 ; i<obstaclearray.length ; i++){
        ctx.drawImage(obst,obstaclearray[i].sx*46,0,46,60,obstaclearray[i].x,obstaclearray[i].y,75,132)
        //circlearray[i].draw();
        circlearray[i].collision();
        // if (circlearray[i].distance < circlearray[i].radius + player1.radius){
        //     player1.speed = 0;            
        // }
    }
    playercircle();
}
obsnum()



//player move
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
//create enemies 
function makeEnemies(){
    var enemyangle = 90;
    const gap = Math.floor(Math.random() * 100)+3;
    var enemyW = 96;
    var enemyH = 96;
    var enemyXpos = enemycounter + enemyW + gap*enemycounter;
    var enemyYpos= enemycounter + enemyH + gap*enemycounter;
    var enemyFramex = 0;
    var enemyFramey = Math.floor(Math.random() * 4);
    var enemyXspeed = Math.floor(Math.random()*10)+4;
    var enemyYspeed = Math.floor(Math.random()*10)+4;
    var enemy = new redEnemy(enemyXpos,enemyYpos,enemyH,enemyW,enemyXspeed,enemyYspeed,enemyFramex,enemyFramey,enemyangle);
    enemycounter++;
    enemies.push(enemy);
}

