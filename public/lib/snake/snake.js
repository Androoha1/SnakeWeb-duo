import { BodySegment } from "./bodySegment.js";
import { conf } from "../../snake.conf.js"
import { Vector } from "../core/vector.js"; 

export class Snake {
    constructor(coordinates) {
        this.head = new BodySegment(coordinates[0] , coordinates[1]);
        this.size = 3;
        this.body = [new BodySegment(0 , 1) , new BodySegment(-1 , 1)];
        this.velocity = new Vector(1 , 0);
        this.dirQueue = [];
    }

    reset() {
        this.head = new BodySegment(coordinates[0] , coordinates[1]);
        this.size = 3;
        this.body = [new BodySegment(0 , 1) , new BodySegment(-1 , 1)];
        this.velocity = new Vector(1 , 0);
        this.dirQueue = [];
    }

    copy(source) {
        this.head.x = source.head.x;
        this.head.y = source.head.y;
        this.size = source.size;
        this.body = [...source.body]; //deep copy of an array
        this.velocity.x= source.velocity.x;
        this.velocity.y = source.velocity.y;
    }

    output_body() { //debug function
        let output = '  ';
        for (let i = 0; i < this.size-1; ++i)
            output += this.body[i].x + ':' + this.body[i].y + ' , ';
        console.log(output);
    }

    move() {
        if (this.dirQueue.length) this.changeDirection();
        //movement: last segment - to the head position.
        if (this.size - 1) {
            this.body[this.size-2].moveTo(this.head);
            this.body.unshift(this.body[this.size-2]);
            this.body.splice(this.size-1 , 1);
        }
        this.head.x += this.velocity.x;
        this.head.y += this.velocity.y;

        //teleport if out of borders.
        if (this.head.x === conf.field.cols) this.head.x = 0;
        else if (this.head.x < 0) this.head.x = conf.field.cols-1
        else if (this.head.y === conf.field.rows) this.head.y = 0;
        else if (this.head.y < 0) this.head.y = conf.field.rows-1;
    }

    grow() {
        this.body.push(new BodySegment(this.body[this.size-2].x , this.body[this.size-2].y));
        ++this.size;
    }

    addDirToQueue(event) { //data recieved here is in JSON
        let data = JSON.parse(event.data);
        let dir = new Vector(data[0] , data[1]);

        if (this.dirQueue.length === 0) {
            if (!dir.isColinear(this.velocity)) this.dirQueue.push(dir);
        }
        else {
            let lastDir = this.dirQueue[this.dirQueue.length - 1];
            if (!dir.isColinear(lastDir)) this.dirQueue.push(dir);
        }
    }

    changeDirection() {
        this.velocity = this.dirQueue.shift();
    }

    drawInText() {
        console.log('Head: [' + this.head.x + ' , ' + this.head.y + ']');
    }
}
