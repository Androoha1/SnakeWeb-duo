import {Snake} from './snake.js';
import { GraphicField } from '../field/graphicField.js';
import { conf } from '../../snake.conf.js';

export class GraphicSnake extends Snake {
    constructor(coordinates) {
        super(coordinates);
    }
    
    draw(field) {
        field.drawRect(this.head.x * conf.field.blockSize , this.head.y * conf.field.blockSize , conf.field.blockSize, conf.field.blockSize, GraphicField.colorSet1[0]);
        for (let i = 0; i < this.size-1; ++i)
            field.drawRect(this.body[i].x * conf.field.blockSize , this.body[i].y * conf.field.blockSize , conf.field.blockSize , conf.field.blockSize , GraphicField.colorSet1[1]);
    }
}