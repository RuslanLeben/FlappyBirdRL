var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new image();
var bg = new image();
var fg = new image();
var pipeUp = new image();
var pipeBottom = new image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

//Audio Files
var fly = new Audio();
var score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

var gap = 90;

//push the button
document.addEventListener("keydown", moveUp);

function moveUp() {
    yPos -= 25;
    fly.play();

}
//create blocks
var pipe = [];

pipe[0] = {
    x: cvs.width,
    y: 0
}

var score = 0;

//bird possition
var xPos = 10;
var yPos = 150;
var grav = 1.5;


function draw() {
    ctx.drawImage(background, 0, 0);

    for (var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBotton, pipe[i].x, pipe[i].y + pipeUp.heigh + gap);

        pipe[i].x--;

        if (pipe[i].x == 125) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.heigh) - pipeUp.height
            });
        }
        if (xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
                || yPos + bird.height >= pipe[i].y + pipeUp.heigh + gap) || yPos + bird.height >= cvs.heigh - fg.heigh) {
            location.reload(); //restart page
        }

        if (pipe[i].x == 5) {
            score++;
            score_audio.play();
        }

    }
    ctx.drawImage(fg, 0, cvs.heigh - fg.heigh);

    ctx.drawImage(bird, xPos, yPos);

    yPos += grav;

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score" + score, 10, cvs.height - 20);

    requestAnimationFrame(draw);


}

pipeBottom.onload = draw;
