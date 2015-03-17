function Game() {

    var ball = new Ball();
    ball.radius = 20;
    ball.velX = 10;

    var speler1 = new Player();
    speler1.y = canvasHeight / 2;
    speler1.x = 5;

    var speler2 = new Player();
    speler2.y = canvasHeight / 2;
    speler2.x = canvasWidth - 25;

    var paused = false;

    var keysDown = {};
    window.addEventListener("keydown", function (e) {
        if (e.keyCode == 80) {
            paused = !paused;
        }
        else {
            keysDown[e.keyCode] = true;
        }
    }, false);

    window.addEventListener("keyup", function (e) {
        delete keysDown[e.keyCode];
    }, false);
    
    var nextBall = function (lastScored) {
        if (lastScored === 1) {
            ball.x = canvasWidth - 100;
            ball.y = Math.floor(canvasHeight * 0.1);
            ball.velX = -5;
            ball.velY = 5;
        }
        else if (lastScored === 2) {
            ball.x = 100;
            ball.y = Math.floor(canvasHeight * 0.1);
            ball.velX = 5;
            ball.velY = 5;
        }
    }
    var update = function () {
        ball.update();

        if (ball.x < 0) {
            speler2.score++;
            nextBall(2);
        }
        if (ball.x > canvasWidth) {
            speler1.score++;
            nextBall(1);
        }
        if (38 in keysDown) {
            speler2.moveUp();
        }
        if (40 in keysDown) {
            speler2.moveDown();
        }
        if (81 in keysDown) {
            speler1.moveUp();
        }
        if (87 in keysDown) {
            speler1.moveDown();
        }
        if (intersects(ball, speler1)) {
            ball.velX = -ball.velX;
        }
        if (intersects(ball, speler2)) {
            ball.velX = -ball.velX;
        }
    }

    var intersects = function (circle, rect) {
        var rectWidth = 1;
        var distX = Math.abs(circle.x - rect.x - rectWidth / 2);
        var distY = Math.abs(circle.y - rect.y - rect.height / 2);

        if (distX > (rectWidth / 2 + circle.radius)) {
            return false;
        }
        if (distY > (rect.height / 2 + circle.radius)) {
            return false;
        }
        if (distX <= (rectWidth / 2)) {
            return true;
        }
        if (distY <= (rect.height / 2)) {
            return true;
        }
        var dx = distX - rectWidth / 2;
        var dy = distY - rect.height / 2;
        return (dx * dx + dy * dy <= (circle.radius * circle.radius));
    }

    var render = function () {
        if (paused) {
            ctx.fillStyle = "#FFFFFF";
            ctx.font = "36px Helvetica";
            ctx.fillText("paused", (canvasWidth / 2 - 50), canvasHeight / 2);
        } else {
            ctx.fillStyle = "#8ED6FF";
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
            ctx.font = "24px Helvetica";
            ctx.fillStyle = "#FFFFFF";
            ctx.fillText("score: " + speler1.score + "-" + speler2.score, (canvasWidth / 2 - 80), 20);
            ctx.fillOval(ball.x, ball.y, ball.radius);
            ctx.fillRect(speler1.x, speler1.y, speler1.width, speler1.height);
            ctx.fillRect(speler2.x, speler2.y, speler2.width, speler2.height);
        }
    };

    Game.prototype.run = function () {
        var requestAnimationFrame = window.requestAnimationFrame
        || window.webkitRequestAnimationFrame
        || window.msRequestAnimationFrame
        || window.mozRequestAnimationFrame;
        var gameLoop = function () {
            if (!paused) {
                update();
            }
            render();
            requestAnimationFrame(gameLoop);
        };
        gameLoop();
    }
}


