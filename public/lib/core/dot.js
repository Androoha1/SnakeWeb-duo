export class Dot {
    constructor(x , y) {
        this.x = x;
        this.y = y;
    }

    isCollision(otherDot) {
        return this.x === otherDot.x && this.y === otherDot.y;
    }
}