function Ball() {
    this.x = 10;
    this.y = 10;
    this.velX = 5;
    this.velY = 4;
    this.radius = 10;
    this.update = function () {
        this.x += this.velX;
        this.y += this.velY;
        if (this.y < 0) {
            this.velY = -this.velY;
        }
        if (this.y > canvasHeight) {
            this.velY = -this.velY;
        }
    }

}
