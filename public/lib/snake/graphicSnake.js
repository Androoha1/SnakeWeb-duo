import {Snake} from './snake.js';
import { GraphicField } from '../field/graphicField.js';

export class GraphicSnake extends Snake {
    constructor(coordinates , field) {
        super(coordinates);
        this.field = field;
    }

    copy(source) {
        this.head.x = source.head.x;
        this.head.y = source.head.y;
        this.size = source.size;
        this.body = [...source.body]; //deep copy of an array
        this.velocityX = source.velocityX;
        this.velocityY = source.velocityY;
    }
    
    draw() {
        this.field.drawRect(this.head.x * this.field.blockSize , this.head.y * this.field.blockSize , this.field.blockSize, this.field.blockSize, GraphicField.colorSet1[0]);
        for (let i = 0; i < this.size-1; ++i)
            this.field.drawRect(this.body[i].x * this.field.blockSize , this.body[i].y * this.field.blockSize , this.field.blockSize , this.field.blockSize , GraphicField.colorSet1[1]);
    }
}