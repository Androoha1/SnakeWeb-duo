//Field class designed for this project
import {GraphicField as Field} from './lib/field/graphicField.js';
import {GraphicSnake as Snake} from './lib/snake/graphicSnake.js';
import {GraphicApple as Apple} from './lib/apple/graphicApple.js';

//import library for ws communication and create a connection
const ws = new WebSocket('ws://localhost:8080');

//objects
var field = new Field(document.getElementById("field"));
var snake = new Snake([0 , 0] , field);
var apple = new Apple(field);

document.addEventListener('keydown', function(event) {
    let key = event.key;
    if (key === 'w' || key === 'a' || key === 's' || key === 'd') {
        ws.send(JSON.stringify(key));
    }
})

//when upadate comes from the server.
ws.onmessage = (event) => {
    const receivedData = JSON.parse(event.data);

    //update the field matrix accroding to the update
    field.update(receivedData.matrix);
    snake.copy(receivedData.snake);
    apple.copy(receivedData.apple);

    //redraw the battle field.
    field.draw();
    snake.draw();
    apple.draw();
};