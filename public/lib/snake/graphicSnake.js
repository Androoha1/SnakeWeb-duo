import {Snake} from './snake.js';
import { GraphicField } from '../field/graphicField.js';
import { conf } from '../../snake.conf.js';
import { Vector } from '../core/vector.js';

export class GraphicSnake extends Snake {
    constructor(coordinates) {
        super(coordinates);
    }
    
    draw(field) {
        for (let i = 0; i < this.size-1; ++i) {
            field.drawRect(this.body[i].x * conf.field.blockSize , this.body[i].y * conf.field.blockSize , conf.field.blockSize , conf.field.blockSize , GraphicField.colorSet1[0]);
            field.drawRect(this.body[i].x * conf.field.blockSize +2 , this.body[i].y * conf.field.blockSize +2 , conf.field.blockSize -4 , conf.field.blockSize -4 , GraphicField.colorSet1[1]);
        }
        field.drawRect(this.head.x * conf.field.blockSize , this.head.y * conf.field.blockSize , conf.field.blockSize, conf.field.blockSize, GraphicField.colorSet1[0]);
    }
}