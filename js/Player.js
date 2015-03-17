function Player() {
    this.y = 0;
    this.x = 0;
    this.speed = 10;
    this.width = 10;
    this.height = 100;
    this.score = 0;
}

Player.prototype = {
    moveUp: function () {
        if (this.y >= 0) {
            this.y -= this.speed;
        }
    },
    moveDown: function () {
        if ((this.y+this.height) <=  canvasHeight) {
            this.y += this.speed;
        }
    }
};