let cvs = document.getElementById('canvas');
let ctx = cvs.getContext('2d');

let bg = new Image();
let bird = new Image();
let fg = new Image();
let pipUp = new Image();
let pipDown = new Image();
let fly = new Audio();
let point = new Audio()

bg.src = "./img/flappy_bird_bg.png"
bird.src = "./img/flappy_bird_bird.png"
fg.src = "./img/flappy_bird_fg.png"
pipUp.src = "./img/flappy_bird_pipeUp.png"
fly.src = "./audio/fly.mp3"
point.src = "./audio/score.mp3"
pipDown.src = "./img/flappy_bird_pipeBottom.png"


//pos Bird
let xpos = 25;
let ypos = 200;
//polet
let grav = 2;
document.addEventListener('click', moveUp);

function moveUp(){
    ypos -= 43;
    fly.play()
}

//pips
let pip = [];
pip[0]={
    x:288,
    y:0
}
let gap = 90;


//count
let count = 0;

function draw(){
    ctx.drawImage(bg, 0, 0)
    ctx.drawImage(bird, xpos, ypos)
    ypos+=grav

    for (let i = 0; i<pip.length; i++){
        ctx.drawImage(pipUp, pip[i].x, pip[i].y)
        ctx.drawImage(pipDown, pip[i].x, pip[i].y +pipUp.height + gap)
        pip[i].x-=1;
        if (pip[i].x === 125){
            pip.push({
                x: 288,
                y: Math.floor(Math.random()*(pipUp.height)-pipUp.height)
            })
        }
        if (xpos + bird.width>=pip[i].x && xpos<=pip[i].x+pipUp.width && (ypos<= pip[i].y+pipUp.height
        || ypos + bird.height >= pip[i].y + pipUp.height+gap) || ypos+bird.height>cvs.height-fg.height){
          location.reload()
        }
        if (pip[i].x === 25){
            count++
            point.play()
        }
    }
    ctx.drawImage(fg, 0, cvs.height - fg.height)
    ctx.fillStyle = "#ffff";
    ctx.font = "35px Verdana";
    ctx.fillText(count, 130, cvs.height - cvs.height/1.2)

    requestAnimationFrame(draw)
}
pipDown.onload = draw;
