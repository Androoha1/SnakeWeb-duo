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
        this.matrix[snake.head.y][snake.head.x] = '1';
        for (let i = 0; i < snake.size-1; ++i) {
            this.matrix[snake.body[i].y][snake.body[i].x] = '0';
        }
    }

    addApple(apple) {
        this.matrix[apple.y][apple.x] = 'a';
    }

    removeApple(apple) {
        this.matrix[apple.y][apple.x] = '.';
    }

    outputMatrix() {
        for (let i = 0; i < conf.field.rows; ++i) {
            let output = '';
            for (let j = 0; j < conf.field.cols; ++j)
                output += this.matrix[i][j] + ' ';
            console.log(output);
        }
    }
}