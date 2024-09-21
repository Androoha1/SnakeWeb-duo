import { conf } from '../../snake.conf.js';

export class Field {
    constructor() {
        this.matrix = Array.from({ length: conf.field.rows }, () => Array.from({ length: conf.field.cols }, () => '.'));
    }

    clear() {
        for (let i = 0; i < conf.field.rows; ++i)
            for (let j = 0; j < conf.field.cols; ++j)
                this.matrix[i][j] = '.';
    }

    addSnake(snake) {
        this.matrix[snake.head.x][snake.head.y] = '1';
    }

    addApple(apple) {
        this.matrix[apple.x][apple.y] = 'a';
    }

    drawInText() {
        for (let i = 0; i < conf.field.rows; ++i) {
            let output = '';
            for (let j = 0; j < conf.field.cols; ++j)
                output += this.matrix[i][j] + ' ';
            console.log(output);
        }
    }
}