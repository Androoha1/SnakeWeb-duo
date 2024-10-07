import { Dot } from '../core/dot.js';
import { Vector } from '../core/vector.js';

export class BodySegment extends Dot{
    constructor(x , y) {
        super(x , y);
    }

    moveToCor(x , y) {
        this.x = x;
        this.y = y;
    }

    moveTo(otherSegment) {
        this.x = otherSegment.x;
        this.y = otherSegment.y;
    }

    transition(dx , dy) {
        this.x += dx;
        this.y += dy;
    }

    swap(otherSegment) {
        let temp_x = this.x;
        let temp_y = this.y;
        this.x = otherSegment.x;
        this.y = otherSegment.y;
        otherSegment.x = temp_x;
        otherSegment.y = temp_y;
    }

    diffVector(otherSegment) {
        if (this.x < otherSegment.x) return new Vector(1 , 0);
        if (this.x > otherSegment.x) return new Vector(-1 , 0);
        if (this.y < otherSegment.y) return new Vector(0 , 1);
        if (this.y > otherSegment.y) return new Vector(0 , -1);
    }
}