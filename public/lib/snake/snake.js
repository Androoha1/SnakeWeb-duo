import { BodySegment } from "./body-segment.js";
import { conf } from "../../snake.conf.js"

export class Snake {
    constructor(coordinates) {
        this.head = new BodySegment(coordinates[0] , coordinates[1]);
        this.size = 3;
        this.body = [new BodySegment(0 , 1) , new BodySegment(-1 , 1)];
        this.velocityX = 1;
        this.velocityY = 0;
    }

    copy(source) {
        this.head = source.head;
        this.size = source.size;
        this.body = [...source.body]; //deep copy of an array
        this.velocityX = source.velocityX;
        this.velocityY = source.velocityY;
    }

    output_body() {
        let output = '  ';
        for (let i = 0; i < this.size-1; ++i)
            output += this.body[i].x + ':' + this.body[i].y + ' , ';
        console.log(output);
    }

    move() { console.log("size: " + this.size); this.output_body();
        //movement: last segment - to the head position.
        if (this.size - 1) {
            this.body[this.size-2].moveTo(this.head);
            this.body.unshift(this.body[this.size-2]);
            this.body.splice(this.size-1 , 1);
        }
        this.head.x += this.velocityX;
        this.head.y += this.velocityY;

        //teleport if out of borders.
        if (this.head.x === conf.field.cols) this.head.x = 0;
        else if (this.head.x < 0) this.head.x = conf.field.cols-1
        else if (this.head.y === conf.field.rows) this.head.y = 0;
        else if (this.head.y < 0) this.head.y = conf.field.rows-1;
    }

    grow() { ++this.size;
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
