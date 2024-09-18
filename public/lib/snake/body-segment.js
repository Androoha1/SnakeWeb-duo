export class BodySegment {
    constructor(x , y) {
        this.x = x;
        this.y = y;
    }

    moveTo(x , y) {
        this.x = x;
        this.y = y;
    }

    moveTo(otherSegment) {
        this.x = otherSegment.x;
        this.y = otherSegment.y;
    }

    swap(otherSegment) {
        let temp_x = this.x;
        let temp_y = this.y;
        this.x = otherSegment.x;
        this.y = otherSegment.y;
        otherSegment.x = temp_x;
        otherSegment.y = temp_y;
    }
}