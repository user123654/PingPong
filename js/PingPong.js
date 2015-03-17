var canvasWidth = window.innerWidth - 50;
var canvasHeight = window.innerHeight - 50;
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = canvasWidth;
canvas.height = canvasHeight;
document.body.appendChild(canvas);

CanvasRenderingContext2D.prototype.fillOval = function (cx, cy, rx) {
    ctx.beginPath();
    ctx.fillStyle = "#000000";
    ctx.arc(cx, cy, rx, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

var game = new Game();
game.run();
