import {Field} from './field.js';
import {conf} from '../../snake.conf.js';

export class GraphicField extends Field {
    static field_colors = ['#113510' , '#164715'];
    static colorSet1 = ['#AE6503', '#F2A947'];
    static colorSet2 = ['#52A414', '#6DDE19'];
    static apple_color = 'red';

    constructor(htmlElement) {
        super();
        this.field = htmlElement;
        this.field.height = conf.field.rows * conf.field.blockSize;
        this.field.width = conf.field.cols * conf.field.blockSize;
        this.context = field.getContext("2d");
    }

    update(data) {
        this.matrix = data;
    }

    drawRect(x , y , width , height , colour) {
        this.context.fillStyle = colour;
        this.context.fillRect(x , y , width , height);
    }

    draw() {
        for (let i = 0; i < conf.field.rows; ++i) {
            for (let j = 0; j < conf.field.cols; ++j) {
                let colour = '';
                switch ((i+j)%2) {
                    case 0: colour = GraphicField.field_colors[0]; break;
                    case 1: colour = GraphicField.field_colors[1]; break;
                }
                this.drawRect(j * conf.field.blockSize , i * conf.field.blockSize , conf.field.blockSize , conf.field.blockSize , colour);
            }
        }
    }
}