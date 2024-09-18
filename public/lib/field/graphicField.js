import {Field} from './field.js';

export class GraphicField extends Field {
    static field_color = '#113510';
    static colorSet1 = ['#AE6503', '#F2A947'];
    static colorSet2 = ['#52A414', '#6DDE19'];
    static apple_color = 'red';

    constructor(htmlElement , rows , cols , blockSize) {
        super(rows , cols);
        this.blockSize = blockSize;
        this.field = htmlElement;
        this.field.height = rows * blockSize;
        this.field.width = cols * blockSize;
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
        this.drawRect(0 , 0 , this.field.width , this.field.height , GraphicField.field_color);
    }
}