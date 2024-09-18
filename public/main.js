//Field class designed for this project
import {GraphicField} from './lib/field/graphicField.js';
import {GraphicSnake as Snake} from './lib/snake/graphicSnake.js';

//import library for ws communication and create a connection
const ws = new WebSocket('ws://localhost:8080');

//objects
var field = new GraphicField(document.getElementById("field") , 20 , 20 , 30);
var snake = new Snake([0 , 0] , field);

//when upadate comes from the server.
ws.onmessage = (event) => {
    const receivedData = JSON.parse(event.data);

    //update the field matrix accroding to the update
    field.update(receivedData.matrix);
    snake.copy(receivedData.snake);

    //redraw the battle field.
    field.draw();
    snake.draw();
};