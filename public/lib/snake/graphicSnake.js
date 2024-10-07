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

    move(progress , target) {
        try{
        if (this.head.x - target.head.x > 2) this.head.x = -1;
        else if (this.head.x - target.head.x < -2) this.head.x = conf.field.cols;
        else if (this.head.y - target.head.y > 2) this.head.y = -1;
        else if (this.head.y - target.head.y < -2) this.head.y = conf.field.rows;

        this.head.x = (1 - progress) * this.head.x + progress * target.head.x;
        this.head.y = (1 - progress) * this.head.y + progress * target.head.y;

        for (let i = 0; i < this.size-1; ++i) {
            if (this.body[i].x - target.body[i].x > 2) this.body[i].x = -1;
            else if (this.body[i].x - target.body[i].x < -2) this.body[i].x = conf.field.cols;
            else if (this.body[i].y - target.body[i].y > 2) this.body[i].y = -1;
            else if (this.body[i].y - target.body[i].y < -2) this.body[i].y = conf.field.rows;

            this.body[i].x = (1 - progress) * this.body[i].x + progress * target.body[i].x;
            this.body[i].y = (1 - progress) * this.body[i].y + progress * target.body[i].y;
        }
        } catch{}
    }
}