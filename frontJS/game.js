
// var player;
// var bonus = [];

// function startGame() {
//     myGameArea.start();
//     player = new component(30, 30, "red", 10, 120);
// }

// var myGameArea = {
//     canvas : document.getElementById("canvas"),
//     start : function() {
//         this.canvas.width = 800;
//         this.canvas.height = 600;
//         this.context = this.canvas.getContext("2d");
//         document.body.insertBefore(this.canvas, document.body.childNodes[0]);
//         this.interval = setInterval(updateGameArea, 20);
//         window.addEventListener('keydown', function (e) {
//             myGameArea.keys = (myGameArea.keys || []);
//             myGameArea.keys[e.keyCode] = (e.type == "keydown");
//         })
//         window.addEventListener('keyup', function (e) {
//             myGameArea.keys[e.keyCode] = (e.type == "keydown");            
//         })
//     }, 
//     clear : function(){
//         this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
//     }
// }

// function component(width, height, color, x, y) {
//     this.gamearea = myGameArea;
//     this.width = width;
//     this.height = height;
//     this.speedX = 0;
//     this.speedY = 0;    
//     this.x = x;
//     this.y = y;    
//     this.update = function() {
//         ctx = myGameArea.context;
//         ctx.fillStyle = color;
//         ctx.fillRect(this.x, this.y, this.width, this.height);
//     }
//     this.newPos = function() {
//         this.x += this.speedX;
//         this.y += this.speedY;        
//     }
//     }    
//     this.crashWith = function(otherobj) {
//         var myleft = this.x;
//         var myright = this.x + (this.width);
//         var mytop = this.y;
//         var mybottom = this.y + (this.height);
//         var otherleft = otherobj.x;
//         var otherright = otherobj.x + (otherobj.width);
//         var othertop = otherobj.y;
//         var otherbottom = otherobj.y + (otherobj.height);
//         var crash = true;
//         if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
//             crash = false;
//         }
//         return crash;
//     } 


// function updateGameArea() {
//     var x, height, gap, minHeight, maxHeight, minGap, maxGap;
//     for (i = 0; i < bonus.length; i += 1) {
//         if (player.crashWith(bonus[i])) {
//             myGameArea.stop();
//             return;
//         } 
//     }
//     player.speedX = 0;
//     player.speedY = 0;    
//     if (myGameArea.keys && myGameArea.keys[81]) {player.speedX = -4; }
//     if (myGameArea.keys && myGameArea.keys[68]) {player.speedX = 4; }
//     if (myGameArea.keys && myGameArea.keys[90]) {player.speedY = -4; }
//     if (myGameArea.keys && myGameArea.keys[83]) {player.speedY = 4; }
//     myGameArea.clear();
//     myGameArea.frameNo += 1;
//     if (myGameArea.frameNo == 1 || everyinterval(150)) {
//         x = myGameArea.canvas.width;
//         minHeight = 20;
//         maxHeight = 200;
//         height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
//         minGap = 50;
//         maxGap = 200;
//         gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
//         bonus.push(new component(10, height, "green", x, 30));
//         bonus.push(new component(10, x - height - gap, "green", x, height + gap));
//     }
//     for (i = 0; i < bonus.length; i += 1) {
//         bonus[i].x += -1;
//         bonus[i].update();
//     }
//     player.newPos();    
//     player.update();
// }

// function everyinterval(n) {
//     if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
//     return false;
// }



// const particlesArray = []; Maybe later
const birdSprite = new Image();
birdSprite.src = './data/kisspng-flappy-bird-sprite-2d-computer-graphics-clip-art-5b025ff8ed3ba2.2311924115268822969717.png';
let player;
let obstacles = [];
let windows =[];
let myScore;
let scoreList = "0";
let lives = 5;
let currentScore = document.getElementById('best-score-label');

function restartGame() {
    // document.getElementById("myfilter").style.display = "none";
    // document.getElementById("myrestartbutton").style.display = "none";
    gameArea.stop();
    gameArea.clear();
    gameArea = {};
    windows =[];
    player = {};
    obstacles = [];
    myscore = {};
    // document.getElementById("canvascontainer").innerHTML = "";
    startGame()
}


function startGame() {
    player = new component(30, 30, "#B2CEE9", 10, 250);
    myScore = new component("30px", "Consolas", "rgb(255, 200, 0)", gameArea.canvas.width, 40, "text");
    
    gameArea.start();
}

let gameArea = {
    canvas : document.getElementById("canvas"),
    start : function() {
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
                        gameArea.keys = (gameArea.keys || []);
                        gameArea.keys[e.keyCode] = (e.type == "keydown");
                    })
                    window.addEventListener('keyup', function (e) {
                        gameArea.keys[e.keyCode] = (e.type == "keydown");            
                    })
                    
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.score = 0;
    this.width = width;
    this.reduceWidth = width/1;
    this.height = height;
    this.reduceHeight = height/1;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = gameArea.context;
        if (this.type === "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(birdSprite, 2, 3, this.reduceWidth , this.reduceHeight, this.x, this.y, this.width, this.height);
    }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }    
    this.crashWith = function(otherobj) {
        let myleft = this.x;
        let myright = this.x + (this.width);
        let mytop = this.y;
        let mybottom = this.y + (this.height);
        let otherleft = otherobj.x;
        let otherright = otherobj.x + (otherobj.width);
        let othertop = otherobj.y;
        let otherbottom = otherobj.y + (otherobj.height);
        let crash = true;
        
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
            
        }
        return crash;
    }
}

function crashAndRestart(){
    if(lives > 0){
            gameArea.stop();
            gameArea.clear();
            obstacles = [];
            windows = [];
            if(gameArea.frameNo>scoreList){
                scoreList = gameArea.frameNo.toString();
            }
            currentScore.innerHTML = `Best score : ${scoreList.toString()}`;
            startGame();
    }else {
        if(gameArea.frameNo>scoreList){
            scoreList = gameArea.frameNo
        }
        currentScore.innerHTML = `Best score : ${scoreList.toString()}`
        gameArea.stop();
        return
    }
}

function updateGameArea() {
    let x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < obstacles.length; i += 1) {
        if (player.crashWith(obstacles[i])) {
            lives --;
            crashAndRestart();
        } 
    }
    gameArea.clear();
    gameArea.frameNo += 1;
    if (gameArea.frameNo == 1 || everyinterval(60)) {
        x = gameArea.canvas.width;
        minHeight = 100;
        maxHeight = 400;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 40;
        maxGap = 170;
        gap = Math.floor(Math.random()*(maxGap-minGap+2)+minGap);
                    function component(width, height, color, x, y, type)
        obstacles.push(new component(width, height, "#0B0317", x, 0));
        obstacles.push(new component(gap, height, "#0B0317", x, 0));
        windows.push(new component(gap, gap, "rgba(10, 10, 10, 0.2)", x, height));
        obstacles.push(new component(gap, x - height - gap, "#0B0317", x, height + gap));
        
    }
    for (i = 0; i < obstacles.length; i += 1) {
        obstacles[i].x += -4;
        obstacles[i].update();
    }
    for (i = 0; i < windows.length; i += 1) {
        windows[i].x += -4;
        windows[i].update();
    }
    player.speedX = 0;
    player.speedY = 0;    
    if (gameArea.keys && gameArea.keys[81]) {player.speedX = -4; }
    if (gameArea.keys && gameArea.keys[68]) {player.speedX = 4; }
    if (gameArea.keys && gameArea.keys[90]) {player.speedY = -4; }
    if (gameArea.keys && gameArea.keys[83]) {player.speedY = 4; }
    myScore.text=`SCORE: ${gameArea.frameNo.toString()}`;
    player.newPos();    
    player.update();
    
    myScore.update();
}

function everyinterval(n) {
    if ((gameArea.frameNo / n) % 1 == 0) {return true;}
    return false;}

    