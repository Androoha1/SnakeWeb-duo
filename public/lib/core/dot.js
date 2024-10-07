import { conf } from '../../snake.conf.js';

export class Dot {
    constructor(x , y) {
        this.x = x;
        this.y = y;
    }

    isCollision(otherDot) {
        return this.x === otherDot.x && this.y === otherDot.y;
    }

    next(vector) {
        let nextSector = new Dot(this.x + vector.x , this.y + vector.y);
        if (nextSector.x === conf.field.cols) nextSector.x = 0;
        else if (nextSector.x < 0) nextSector.x = conf.field.cols-1;
        else if (nextSector.y === conf.field.rows) nextSector.y = 0;
        else if (nextSector.y < 0) nextSector.y = conf.field.rows-1;

        return nextSector; 
    }
}