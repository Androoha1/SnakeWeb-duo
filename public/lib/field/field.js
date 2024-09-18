export class Field {
    constructor(rows , cols) {
        this.rows = rows;
        this.cols = cols;
        this.matrix = Array.from({ length: this.rows }, () => Array.from({ length: this.cols }, () => '.'));
    }

    clear() {
        for (let i = 0; i < this.rows; ++i)
            for (let j = 0; j < this.cols; ++j)
                this.matrix[i][j] = '.';
    }

    addSnake(snake) {
        this.matrix[snake.head.x][snake.head.y] = '1';
    }

    drawInText() {
        for (let i = 0; i < this.rows; ++i) {
            let output = '';
            for (let j = 0; j < this.cols; ++j)
                output += this.matrix[i][j] + ' ';
            console.log(output);
        }
    }
}