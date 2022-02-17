// Faire un clone de flappy bird avec un moustique.
// Il doit entrer par les fenêtres pour piquer et continuer son chemin




// Récupération et configuration du canvas
const canvas = document.getElementById('canvas');// Recupération de la surface et du contexte
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;


// Variables globales
let buildingFrame = 100;
let float = 0;
let frame = 0;
let score = 100;
let bestScore = 0;
let gamespeed = 4;
let playerSpeed = 3;
let playerSpeedBoost = 5;
let minGap = 35;
let maxGap = 100;
let minHeight = 100;
let maxHeight = 600;
let scoreColor = "darkred";
let scoreFont = '30px Consolas';
let inRoom = false;
let bestScoreElement = document.getElementById('best-score-label');
const restartButtonElement = document.getElementById("restartbutton");
const menuElement = document.querySelector('.game-container-aside');
const music = new Audio('./data/game_music_gurvan.mp3');


const background = new Image();
background.src = "./data/background_som.png";

const BG = {
    x1:0,
    x2: canvas.width*1.5,
    y: -600,
    width: canvas.width*1.5,
    height: 2000,
}
function handleBackground(){
    if (BG.x1 <= -BG.width + gamespeed) BG.x1 = BG.width;
    else BG.x1 -= gamespeed - 2;
    if (BG.x2 <= -BG.width + gamespeed) BG.x2 = BG.width;
    else (BG.x2 -= gamespeed -2);
    ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
    ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}

clear = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};
stop = function() {
    clearInterval(canvas.interval);
    buildingFrame = 100;
    float = 0;
    frame = 0;
    score = 100;
    gamespeed = 4;
    playerSpeed = 3;
    playerSpeedBoost = 5;
    minGap = 35;
    maxGap = 100;
    minHeight = 100;
    maxHeight = 600;
    scoreColor = "darkred";
    scoreFont = '30px Consolas';
    inRoom = false;
    bestScoreElement = document.getElementById('best-score-label');
};

function startGame() {
    menuElement.style.display = "none";
    // restartButtonElement.style.display = "none"
    stop();
    clear();
    mosquito.reset();
    buildingsArray = [];
    score = 100;
    animate();
}

const crash = new Image();
crash.src = "./data/encoreunboum.png";

function crashWith() {
    for(let i = 0; i < buildingsArray.length; i++){
        if(mosquito.x < buildingsArray[i].x + buildingsArray[i].width && 
           mosquito.x + mosquito.width > buildingsArray[i].x && 
           ((mosquito.y< 0 + buildingsArray[i].top - buildingsArray[i].gap && mosquito.y + mosquito.height > 0) ||
           (mosquito.y + mosquito.height > buildingsArray[i].top && 
            mosquito.y + mosquito.height < canvas.height))){
                    if(canvas.keys && canvas.keys[32]){
                        return
                    }else{
                        ctx.drawImage(crash, mosquito.x-mosquito.height,mosquito.y-mosquito.width, 80, 80);
                        ctx.font = "23px system-ui";
                        ctx.fillStyle = '#b1bdc6';
                        ctx.fillText("Game over ", 345, 100);
                        return true;
                    }
            }
    }
    if(score <= 0){
        ctx.drawImage(crash, mosquito.x-mosquito.height,mosquito.y-mosquito.width, 80, 80);
                        ctx.font = "23px system-ui";
                        ctx.fillStyle = '#b1bdc6';
                        ctx.fillText("No more blood ...", 320, 100);
                        return true;
    }

    // let collision = false;
    // for(let i = 0; i < buildingsArray.length; i++){
    //     if ((mosquito.x + (mosquito.width) < buildingsArray[i].x) || (mosquito.x > buildingsArray[i].x + (buildingsArray[i].width)) || (mosquito.y > canvas.height - buildingsArray[i].height) || (mosquito.y + mosquito.height < buildingsArray[i].bottom)) {
    //         collision = false;
            
    //     }else if(mosquito.y < buildingsArray[i].height+buildingsArray[i].gap-buildingsArray[i].top){
    //         collision = false;
    //     }
        
    //     else{
    //     ctx.drawImage(crash, mosquito.x,mosquito.y, 50, 50);
    //     return collision = true; 
    //     }
    // }
    
}

function countAndDisplayScore() {

    for(let i = 0; i < buildingsArray.length; i++){
        if(canvas.keys && canvas.keys[32]){
            score -=4;
            return
        }
        else if(mosquito.x > buildingsArray[i].x && (mosquito.x + mosquito.width) < (buildingsArray[i].x + buildingsArray[i].width) && buildingsArray[i].light < 3 && canvas.keys && !canvas.keys[32]){
            scoreColor = "rgb(255, 200, 0)";
            scoreFont = '40px Consolas';
            score += 2;
            
        }
        else if(mosquito.x > buildingsArray[i].x && (mosquito.x + mosquito.width) < (buildingsArray[i].x + buildingsArray[i].width) && buildingsArray[i].light > 3 && canvas.keys && !canvas.keys[32]){
            scoreColor = "red";
            scoreFont = '32px Consolas';
            score++;
            
        }

        
    }

}


// Fonction d'animation
function animate() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    
    gamespeed = 4;
    /* ctx.fillRect(10, 10, 50, 50); */
    handleBackground();
    
    scoreColor = "darkred"
    scoreFont = '30px system-ui';
    countAndDisplayScore();
    mosquito.update();
    mosquito.draw();
    handleBuildings();
    ctx.fillStyle = scoreColor;
    ctx.font = scoreFont;
    ctx.strokeText(score, (canvas.width/2)-27, 40);
    ctx.fillText(score, (canvas.width/2)-27, 40);
    crashWith();
    if(crashWith()){
        if(bestScore<score){;
            bestScore = score
            bestScoreElement.innerHTML = `Best score : ${bestScore.toString()}`;
            menuElement.style.display = "block";
            restartButtonElement.style.display = "block";
            return
        }else{
            menuElement.style.display = "block";
            restartButtonElement.style.display = "block";
            return;
        }
    } 
    requestAnimationFrame(animate)
    float +=0.45;
    frame++;
}


document.addEventListener('DOMContentLoaded', () =>{
    // startGame();
    music.play();
});



// listener des touches du clavier
window.addEventListener('keydown', function (e) {
    canvas.keys = (canvas.keys || []);
    canvas.keys[e.keyCode] = (e.type == "keydown");
})
window.addEventListener('keyup', function (e) {
    canvas.keys[e.keyCode] = (e.type == "keydown");            
})



