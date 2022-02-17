// classe pour le plan et les variables du joueur
const mosquitoSprite = new Image();
mosquitoSprite.src = "./data/moumou.png";

const shield = new Image();
shield.src = "./data/noir.png";


class Mosquito {
    constructor(){
        // variables du joueur
        this.x = 150;
        this.y = 300;
        this.speedX = 0;
        this.speedY = 0; 
        this.width = 20;
        this.height = 20;
    }
    draw(){
        // Rendu du joueur
        // ctx.fillStyle = "white";

        // ctx.fillRect(this.x, this.y, this.width, this.height);
        // ctx.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
        ctx.fill();
        ctx.drawImage(mosquitoSprite, this.x - 7,this.y - 10, 40, 40);
    }
    update(){
        let fly = Math.sin(float);
        this.speedX = 0;
        this.speedY = 0; 
        playerSpeed = 3;
        
        // je définit les limites de déplacement du joueur

        if (this.y > canvas.height - (this.height * 2)){
            this.y = canvas.height - (this.height * 2);
        }
        if (this.y < 0){
            this.y = 0 
        }
        if (this.x > canvas.width - (this.width * 2)){
            this.x = canvas.width - (this.width * 2);
        }
        if (this.x < 0 + this.width){
            this.x = 0 + this.width
        }
        if (canvas.keys && canvas.keys[32]) {ctx.drawImage(shield, mosquito.x -60,mosquito.y -60 , 150, 150);}
        if (canvas.keys && canvas.keys[81]) {mosquito.speedX = -playerSpeed-1; }
        if (canvas.keys && canvas.keys[68]) {mosquito.speedX = playerSpeed; }
        if (canvas.keys && canvas.keys[90]) {mosquito.speedY = -playerSpeed; }
        if (canvas.keys && canvas.keys[83]) {mosquito.speedY = playerSpeed; }
        this.x += this.speedX;
        this.y += this.speedY + fly;
    }
    reset(){
        this.x = 150;
        this.y= 300;
    }
}

const mosquito = new Mosquito();