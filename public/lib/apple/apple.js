import { conf } from '../../snake.conf.js';

export class Apple {
    constructor() {
        this.x = Math.floor(Math.random() * conf.field.cols);
        this.y = Math.floor(Math.random() * conf.field.rows);
    }

    copy(otherApple) {
        this.x = otherApple.x;
        this.y = otherApple.y;
    }

    relocate() {
        this.x = Math.floor(Math.random() * conf.field.cols);
        this.y = Math.floor(Math.random() * conf.field.rows);
    }
}