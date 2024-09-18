import { BodySegment } from "./body-segment.js";

export class Snake {
    constructor(coordinates , field) {
        this.field = field;
        this.head = new BodySegment(coordinates[0] , coordinates[1]);
        this.size = 3;
        this.body = [new BodySegment(0 , 1) , new BodySegment(-1 , 1)];
        this.velocityX = 1;
        this.velocityY = 0;
    }

    move() {
        //movement: last segment - to the head position.
        if (this.size - 1) {
            this.body[this.size-2].moveTo(this.head);
            this.body[this.size-2].swap(this.body[0]);
        }
        this.head.x += this.velocityX;
        this.head.y += this.velocityY;

        //teleport if out of borders.
        if (this.head.x === this.field.cols) this.head.x = 0;
        else if (this.head.x < 0) this.head.x = this.field.cols-1
        else if (this.head.y === this.field.rows) this.head.y = 0;
        else if (this.head.y < 0) this.head.y = this.field.rows-1;
    }

    grow() { ++this.length;
        this.body.push(new BodySegment(this.head.x , this.head.y));
    }

    changeDirection(dir) {
        if (this.velocityX+dir[0] && this.velocityY+dir[1]) {
            this.velocityX = dir[0];
            this.velocityY = dir[1];
        }
    }

    drawInText() {
        console.log('Head: [' + this.head.x + ' , ' + this.head.y + ']');
    }
}
