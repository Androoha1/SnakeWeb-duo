import { Dot } from '../core/dot.js';
import { conf } from '../../snake.conf.js';

export class Apple extends Dot{
    constructor(x , y) {
        super(Math.floor(conf.field.cols / 2) , Math.floor(conf.field.rows / 2));
    }

    copy(otherApple) {
        this.x = otherApple.x;
        this.y = otherApple.y;
    }

    relocate(field) {
        do {
            this.x = Math.floor(Math.random() * conf.field.cols);
            this.y = Math.floor(Math.random() * conf.field.rows);
        } while(field.matrix[this.y][this.x] != '.');
        field.addApple(this);
    }
}