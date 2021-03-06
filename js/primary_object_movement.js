var canvas = document.getElementById("canvas1");
var ctx = canvas.getContext('2d');

//events on arrows for player movement//
window.addEventListener("keydown", function (e) {
    keys[e.which] = true;
    player1.moving = true;
})
window.addEventListener("keyup", function (e) {
    delete keys[e.which];
    player1.moving = false;
})
window.onload = function () {
    swal("ready to play?", "press ENTER key to start with MUSIC or click 'LETS START' with SILENCE", {
        button: "LETS START"
    })
        .then((value) => {
            $(".ready").show().toggle(1500);
            $(".go").show(1000).slideUp(1000);
            requestAnimationFrame(animate);
        });
}

//game sound effects
var fxPowerup = new Audio("sound/powerup.m4a");
var fxBullt = new Audio("sound/fxbullt.wav");
var fxLife = new Audio("sound/life.wav");
var fxObstacle = new Audio("sound/obstcale.wav");
var play = new Audio("sound/music.mp3");
var fxWin = new Audio("sound/win.wav");
var fxlose = new Audio("sound/gameOver.mp3");
var fxBexp = new Audio("sound/bullet-exp.wav");
var fxhitEnemy = new Audio("sound/hitEnemy.mp3");
var nextLevel = new Audio("sound/nextlevel.wav");

//game variables
var paused = false;
var lifeScore = 5;
var starScore = 0;
var timetodrawstar = 0;
var timetodrawlife = 0;
var enemycounter = 3;
var setUpEnemy = true;
var totalEnemies = 3;
var bulletscounter;
var gameframe = 0;
var level1 = true;
var level2 = true;
var indicate1 = false;
var indicate2 = false;

//get random value in range of 2 values
var minH = Math.floor(this.y);
var maxH = Math.floor(canvas.height);
var rangeH = Math.floor(Math.random() * (maxH - minH) + minH);
var minW = Math.ceil(this.x);
var maxW = Math.floor(canvas.width);
var rangeW = Math.floor(Math.random() * (maxW - minW) + minW);

// game array
const obsx = [300, 400, 800, 975, 55, 1150, 1100, 200];
const obsy = [100, 350, 250, 400, 77, 450, 200, 460];
const keys = [];
const circlearray = [];
const obstaclearray = [];
const enemies = [];
const heart = [];
const starr = [];

/// game images ///
const playersprite = new Image();
playersprite.src = "Img/leviathan.png"
const obst = new Image();
obst.src = "Img/Obstcle.png"
const enemy = new Image();
enemy.src = "Img/bahamut.png";
const starphoto = new Image()
starphoto.src = "Img/star.png";
const lifephoto = new Image()
lifephoto.src = "Img/heart.png";
const explosion = new Image();
explosion.src = "Img/exp2_0.png"

//game Class
//Power up 
class PowerUp {
    constructor() {
        this.x = Math.floor(Math.random() * 1000);
        this.y = Math.floor(Math.random() * 500);
        this.distance;
        this.w = 30;
        this.h = 30;
    }
    static draw() {
    }
}
////star 
class Star extends PowerUp {
    constructor() {
        super();
    }
    draw() {
        ctx.drawImage(starphoto, this.x, this.y);
    }
}
//Life 
class Life extends PowerUp {
    constructor() {
        super();
    }
    draw() {
        ctx.drawImage(lifephoto, this.x, this.y, this.w, this.h);
    }
}
//main character 
class player {
    constructor() {
        this.x = 500
        this.y = 300
        this.width = 96
        this.height = 96
        this.framex = 0
        this.framey = 0
        this.speed = 5
        this.radius = 40;
        this.moving = false;
    }
}
//enemy 
class redEnemy {
    constructor(x, y, h, w, xspeed, yspeed, framex, framey, angle) {
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
        this.framex = framex;
        this.framey = framey;
        this.xspeed = xspeed;
        this.yspeed = yspeed;
        this.angle = angle;
    }
    draw() {
        ctx.drawImage(enemy, this.w * this.framex, this.h * this.framey, this.w, this.h, this.x, this.y, this.w, this.h);
    }

    handleenemyframe() {
        if (gameframe % 5 === 0) {
            if (this.framex < 3) {
                this.framex++;
            }
            else {
                this.framex = 0;
            }
        }
    }

    enemyhit() {
        let distance_x = (this.x + this.w / 2) - (player1.x + player1.width / 2);
        let distance_y = (this.y + this.h / 2) - (player1.y + player1.height / 2);
        let radii_sum = 80;
        if (distance_x * distance_x + distance_y * distance_y <= radii_sum * radii_sum) {
            return true;

        }
    }
    updateSpeed() {
        // 0 +y Down.
        if (this.framey === 0) {
            if (this.yspeed < 0) {
                this.yspeed *= -1;
            }
        }
        // 2 +x Right.
        else if (this.framey === 2) {
            if (this.xspeed < 0) {
                this.xspeed *= -1;
            }
        }
        // 1 -x Left.
        else if (this.framey == 1) {
            if (this.xspeed > 0) {
                this.xspeed *= -1;
            }

        }

        // 3 -y Up.
        else if (this.framey === 3) {
            if (this.yspeed > 0) {
                this.yspeed *= -1;
            }
        }
    }
    move() {
        // 0 +y Down.
        if (this.framey === 0) {
            this.y += this.yspeed;
            if (this.y >= canvas.height - this.h - 100) {
                // 2 +x Right.
                this.framey = 2;
                if (this.xspeed < 0) {
                    this.xspeed *= -1;
                }
            }
        }
        // 2 +x Right.
        else if (this.framey === 2) {
            this.x += this.xspeed;
            if (this.x >= canvas.width - this.w - 350) {
                // 3 -y Up.
                this.framey = 3;
                if (this.yspeed > 0) {
                    this.yspeed *= -1;
                }
            }
        }
        // 1 -x Left.
        else if (this.framey == 1) {
            this.x += this.xspeed;
            if (this.x <= 0) {
                // 0 +y Down.
                this.framey = 0;
                if (this.yspeed < 0) {
                    this.yspeed *= -1;
                }

            }
            // this.x += this.xspeed;
        }
        // 3 -y Up.
        else if (this.framey === 3) {
            this.y += this.yspeed;
            if (this.y <= 16) {
                // 1 -x left.
                this.framey = 1;
                if (this.xspeed > 0) {
                    this.xspeed *= -1;
                }
            }
        }
    }
}
//obstacle 
class obstacle {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.sx = Math.floor(Math.random() * 6);
    }
}
///Bullet
class Bullet {
    constructor(bx, by, br, bc, bs) {
        this.x = bx;
        this.y = by;
        this.radius = br;
        this.color = bc;
        this.speed = bs;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        this.draw();
        this.x += this.speed.x;
        this.y += this.speed.y;
    }
    killenemy() {
        for (let i = 0; i < enemies.length; i++) {
            let distance_x = this.x - (enemies[i].x + enemies[i].w / 2);
            let distance_y = this.y - (enemies[i].y + enemies[i].h / 2);
            let radii_sum = 40 + this.radius;
            if (distance_x * distance_x + distance_y * distance_y <= radii_sum * radii_sum) {
                if (countMusic === 1) {
                    fxBexp.play();
                }
                for (let k = 0; k < 4; k++) {
                    for (let j = 0; j < 4; j++) {
                        ctx.drawImage(explosion, k, j, 64, 64, enemies[i].x, enemies[i].y, 100, 100)
                    }
                }
                bulletscounter = bullets.length - 1;
                bullets.splice(bulletscounter, 1)
                enemies.splice(i, 1)
            }
        }
    }

    bullet_hit_obstacle() {
        for (let i = 0; i < obstaclearray.length; i++) {
            let distance_x = this.x - (obstaclearray[i].x + 50);
            let distance_y = this.y - (obstaclearray[i].y + 50);
            let radii_sum = 56 + this.radius;
            if (distance_x * distance_x + distance_y * distance_y <= radii_sum * radii_sum) {
                // fxBexp.play();
                bulletscounter = bullets.length - 1;
                bullets.splice(bulletscounter, 1)
                for (let k = 0; k < 4; k++) {
                    for (let j = 0; j < 4; j++) {
                        ctx.drawImage(explosion, k, j, 64, 64, obstaclearray[i].x, obstaclearray[i].y, 100, 100)
                    }
                }
            }
        }
    }
}
//somehidden circle to calculate distance between our main object and the other obstacles
class hiddencircle {
    constructor() {
        this.radius = 30;
        this.x = 0;
        this.y = 0;
        this.distance;
    }
    draw() {
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    }

    collision() {
        let distance_x = player1.x - this.x;
        let distance_y = player1.y - this.y;
        let radii_sum = player1.radius + this.radius;
        if (distance_x * distance_x + distance_y * distance_y <= radii_sum * radii_sum) {
            let length = Math.sqrt(distance_x * distance_x + distance_y * distance_y) || 1;
            let unit_x = distance_x / length;
            let unit_y = distance_y / length;
            player1.x = this.x + (radii_sum + 1) * unit_x;
            player1.y = (this.y + (radii_sum + 1) * unit_y);
            starDecrese();


        }
        for (let i = 0; i < enemies.length; i++) {
            let distance_x = enemies[i].x - this.x;
            let distance_y = enemies[i].y - this.y;
            let radii_sum = 40 + this.radius;
            if (distance_x * distance_x + distance_y * distance_y <= radii_sum * radii_sum) {
                let length = Math.sqrt(distance_x * distance_x + distance_y * distance_y) || 1;
                let unit_x = distance_x / length;
                let unit_y = distance_y / length;
                enemies[i].x = this.x + (radii_sum + 1) * unit_x;
                enemies[i].y = (this.y + (radii_sum + 1) * unit_y);
            }
        }
    }
}
// game Functions
//create Life
heart.push(new Life);
function createLife() {
    if (timetodrawlife % 1000 === 0) {
        if (heart.length === 1) {
            heart.splice(0, 1);
        }
        heart.push(new Life());
    }
    if (heart.length > 0) {
        let distance_x = (player1.x + 25) - heart[0].x;
        let distance_y = (player1.y + 25) - heart[0].y;
        let radii_sum = (player1.radius) + 11;
        if (distance_x * distance_x + distance_y * distance_y <= radii_sum * radii_sum) {
            heart.splice(0, 1);
            lifeScoreIncrease();
        }
    }
    if (heart.length > 0) {
        heart[0].draw();
    }
}
//create star
starr.push(new Star);
function createStar() {
    if (timetodrawstar % 300 === 0) {
        if (starr.length === 1) {
            starr.splice(0, 1);
        }
        starr.push(new Star());
    }
    if (starr.length > 0) {
        let distance_x = (player1.x + 25) - starr[0].x;
        let distance_y = (player1.y + 25) - starr[0].y;
        let radii_sum = (player1.radius) + 20;
        if (distance_x * distance_x + distance_y * distance_y <= radii_sum * radii_sum) {
            starr.splice(0, 1);
            starScoreIncrease();
        }
    }
    if (starr.length > 0) {
        starr[0].draw();
    }
}
//create enemies 
function makeEnemies(enemycounter) {
    var enemyangle = 90;
    const gap = Math.floor(Math.random() * 100) + 10;
    var enemyW = 96;
    var enemyH = 96;
    var enemyXpos = enemycounter + enemyW + gap * enemycounter;
    var enemyYpos = enemycounter + enemyH + gap * enemycounter;
    var enemyFramex = 0;
    var enemyFramey = Math.floor(Math.random() * 4);
    var enemyXspeed = Math.floor(Math.random() * 10) + 4;
    var enemyYspeed = Math.floor(Math.random() * 10) + 4;
    var enemy = new redEnemy(enemyXpos, enemyYpos, enemyH, enemyW, enemyXspeed, enemyYspeed, enemyFramex, enemyFramey, enemyangle);
    enemycounter++;
    enemies.push(enemy);
}
//create obstacle //
function obsnum() {
    for (let i = 0; i < 8; i++) {
        obstaclearray.push(new obstacle())
        circlearray.push(new hiddencircle())
        circlearray[i].x = obsx[i];
        circlearray[i].y = obsy[i];
        obstaclearray[i].x = obsx[i] + 15;
        obstaclearray[i].y = obsy[i] - 25;
    }
}
//create character Animate
const player1 = new player();
function handleplayerframe() {
    if (gameframe % 5 === 0) {
        if (player1.framex < 3) {
            player1.framex++;
        }
        else {
            player1.framex = 0;
        }
    }
    gameframe++;
}
//create bullet
const circle1 = new hiddencircle();
var bullet = new Bullet(player1.x + player1.width / 2, player1.y + player1.height / 2, 5, 'blueviolet', { x: 0, y: 10 });
var bullets = [bullet];
document.body.onkeyup = function (e) {
    if (e.keyCode == 32) {
        if (countMusic === 1) {
            fxBullt.play();
        }
        if (player1.framey === 0) {
            bullets.push(new Bullet(player1.x + player1.width / 2, player1.y + player1.height / 2, 11, 'blueviolet', { x: 0, y: 10 }));
        }
        else if (player1.framey === 2) {
            bullets.push(new Bullet(player1.x + player1.width, player1.y + player1.height / 2, 11, 'blueviolet', { x: 10, y: 0 }));
        }
        else if (player1.framey === 3) {
            bullets.push(new Bullet(player1.x + player1.width / 2, player1.y + player1.height / 2, 11, 'blueviolet', { x: 0, y: -10 }));
        }
        else if (player1.framey === 1) {
            bullets.push(new Bullet(player1.x, player1.y + player1.height / 2, 11, 'blueviolet', { x: -10, y: 0 }))
        }
    }
}
function moveplayer() {
    if (keys[38] && player1.y > -16) {
        player1.y -= player1.speed;
        player1.framey = 3;
    }

    if (keys[37] && player1.x > 0) {
        player1.x -= player1.speed;
        player1.framey = 1;
    }

    if (keys[40] && player1.y < canvas.height - player1.height) {
        player1.y += player1.speed;
        player1.framey = 0;
    }

    if (keys[39] && player1.x < canvas.width - player1.width) {
        player1.x += player1.speed;
        player1.framey = 2;
    }
}
function starScoreIncrease() {
    if (countMusic === 1) {
        fxPowerup.play();
    }
    starScore += 5;
    $("#starScore").text(+starScore);
    $("#starScore").css("text-shadow", "1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue");
    $("#star").css({
        "animation-name": "bounce", "animation-play-state": " running", "animation-duration": "1s",
        "animation-iteration-count": "2"
    });
    Win();
}
function lifeScoreIncrease() {
    if (countMusic === 1) {
        fxLife.play();
    }
    lifeScore += 1;
    $("#lifeScore").text(+lifeScore);
    $("#lifeScore").css("text-shadow", "1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue");
    $("#life").css({
        "animation-name": "bounce", "animation-play-state": " running", "animation-duration": "0.75s",
        "animation-iteration-count": "2"
    });
    Win();
}
function Win() {
    if (enemies.length < 3) {
        totalEnemies = 1;
        for (let i = 0; i < totalEnemies; i++) {
            makeEnemies(4);
        }
    }
    if (starScore >= 35 && level1) {
        nextLevel.play();
        nextLevel1();
        level1 = false;
    }
    else if (starScore >= 70 && level2) {
        nextLevel.play();
        nextLevel2();
        level2 = false;
    }
    else if (starScore >= 120) {
        End();
    }

}
function gameOver() {
    if (lifeScore < 1) {
        fxlose.play();
        paused = true;
        swal("GAME OVER", "YOU LOOSE", "error", {
            button: "TRY AGAIN",
        })
            .then((value) => {
                document.location.reload();
                clearInterval(interval);
            });
    }
}
function starDecrese() {
    if (countMusic === 1) {
        fxObstacle.play();
    }
    if (starScore > 0) {
        starScore--;
        $("#starScore").text(+starScore);
        $("#star").css({
            "animation-name": "rotate", "animation-play-state": " running", "animation-duration": "0.75s"
        });
    }
}
function lifeDecrese() {
    if (lifeScore > 0) {
        lifeScore -= 1;
        $("#lifeScore").text(+lifeScore);
        $("#lifeScore").css("text-shadow", "1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue");
        $("#life").css({
            "animation-name": "rotate", "animation-play-state": " running", "animation-duration": "0.75s",
        });
        gameOver();

    }
}

function nextLevel1() {
    swal("GOOD JOb..!", " Now you Become faster And there is more ENEMYIES Now", "success", {
        button: "To LEVEL 2!",
    })
        .then((value) => {
            window.setTimeout(function () {
                player1.speed = 7;
                totalEnemies = 2;
                for (var i = 0; i < totalEnemies; i++) {
                    makeEnemies(7);
                }

            }, 2000);
        });
        indicate1 = true;
}
function nextLevel2() {
    swal("GOOD JOb..!", " Now you Become faster And there is more ENEMYIES Now", "success", {
        button: "To LEVEL 3!",
    })
        .then((value) => {
            window.setTimeout(function () {
                player1.speed = 10;
                totalEnemies = 3;
                for (var i = 0; i < totalEnemies; i++) {
                    makeEnemies(10);
                }

            }, 2000);
        });
        indicate2 = true;
}
function End() {
    fxWin.play();
    paused = true;
    $("#win").slideDown(1000);
    $("#goal").toggle(2000);
    window.setTimeout(function () {
        swal("CONGRATULATIONS..!", {
            button: "Exit"
        })
            .then((value) => {
                location.replace("intro.html");
            });

    }, 2000);
}
function fixedEnemylevel1(){
    if(indicate1){
        if (enemies.length < 5) {
            totalEnemies = 1;
            for (let i = 0; i < totalEnemies; i++) {
                makeEnemies(4);
            }
        }
    }

}
function fixedEnemylevel2(){
    if(indicate2){
        if (enemies.length < 7) {
            totalEnemies = 1;
            for (let i = 0; i < totalEnemies; i++) {
                makeEnemies(9);
            }
        }
    }

}


//draw component of canvas 
function drawsprite(img, sx, sy, sw, sh, dx, dy, dw, dh) {
    ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
}
//start the animation loop       
function animate() {
    if (paused) {
        return;
    }
    Win();
    fixedEnemylevel1();
    fixedEnemylevel2();

    //animate anything
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ///bullet
    bullets.forEach(bullet => {
        bullet.killenemy();
        bullet.bullet_hit_obstacle();
        bullet.update();
    })
    //player
    drawsprite(playersprite, player1.width * player1.framex, player1.height * player1.framey, player1.width, player1.height, player1.x, player1.y, player1.width, player1.height)
    moveplayer();
    handleplayerframe();
    //enemy
    if (setUpEnemy) {
        for (var i = 0; i < totalEnemies; i++) {
            makeEnemies(1);
        }
        setUpEnemy = false;
    }
    if (enemies.length > 0) {
        enemies.forEach(function (enemy, i) {
            enemy.updateSpeed();
            enemy.handleenemyframe();
            enemy.draw();
            enemy.move();
            if (enemy.enemyhit()) {
                enemies.splice(i, 1);
                if (countMusic === 1) {
                    fxhitEnemy.play();
                }

                for (let k = 0; k < 4; k++) {
                    for (let j = 0; j < 4; j++) {
                        ctx.drawImage(explosion, k, j, 64, 64, enemy.x, enemy.y, 100, 100)
                    }
                }
                lifeDecrese();
            };
        });
    }
    ///star power up///
    timetodrawstar++;
    createStar();
    ///life power up///
    timetodrawlife++;
    createLife();
    //obstacles
    for (let i = 0; i < obstaclearray.length; i++) {
        ctx.drawImage(obst, obstaclearray[i].sx * 46, 0, 46, 60, obstaclearray[i].x, obstaclearray[i].y, 75, 132)
        circlearray[i].collision();
    }
    // request another animation loop
    requestAnimationFrame(animate);
}
obsnum();
