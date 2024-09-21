import { GraphicField } from '../field/graphicField.js';
import {Apple} from './apple.js';
import { conf } from '../../snake.conf.js';

export class GraphicApple extends Apple {
    constructor(field) {
        super();
    }

    draw(field) {
        let blockSize = conf.field.blockSize;
        field.drawRect(this.x * blockSize , this.y * blockSize, blockSize , blockSize , GraphicField.apple_color);
    }
}