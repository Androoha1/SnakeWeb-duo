import { GraphicField } from '../field/graphicField.js';
import {Apple} from './apple.js';
import { conf } from '../../snake.conf.js';

export class GraphicApple extends Apple {
    constructor(field) {
        super();

        if (!field) console.log("no");

        this.field = field;
    }

    draw() {
        let blockSize = conf.field.blockSize;
        this.field.drawRect(this.x * conf.field.blockSize , this.y * this.field.blockSize, this.field.blockSize , this.field.blockSize , GraphicField.apple_color);
    }
}