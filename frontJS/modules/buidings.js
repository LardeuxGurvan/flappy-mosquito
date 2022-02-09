let buildingsArray = [];

class Building {
    constructor(){
        this.gap = Math.floor(Math.random()*(maxGap-minGap+2)+minGap)
        this.height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        this.top = canvas.height-this.height+this.gap;
        this.bottom = canvas.height-this.height;
        this.x = canvas.width;
        this.width = Math.floor(Math.random() * (300 - 150)) + 150;;
        this.color = "#0B0317";
        this.light = Math.random()*(10-1)+1;
        this.windowLight = "rgba(255, 255, 135, 0.3)"
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, 0, this.width, this.bottom);
        ctx.fillRect(this.x, this.top, this.width, this.gap+ this.height);
        
        if (this.light < 3){
            ctx.fillStyle = "rgba(255, 255, 135, 0.3)";
            this.windowLight = "rgba(255, 255, 135, 0.3)";
        }else{
            ctx.fillStyle = "rgba(10, 10, 10, 0.8)";
            this.windowLight = "rgba(10, 10, 10, 0.8)";
        }
        ctx.fillRect(this.x+4,this.bottom,this.width-8, this.gap);
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x+(this.width/2)-this.width/15, 0, this.width/15, canvas.height)
    }
    update(){
        this.x -= gamespeed;
        this.draw();
    }
}

function handleBuildings(){
    if (frame%buildingFrame === 0){
        buildingsArray.unshift(new Building);
    }
    for(let i = 0; i<buildingsArray.length; i++){
        buildingsArray[i].update();
    }
    if (buildingsArray.length > 20){
        buildingsArray.pop(buildingsArray[0]);
    }
}