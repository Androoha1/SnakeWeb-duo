//Field class designed for this project
import {GraphicField as Field} from './lib/field/graphicField.js';
import {GraphicSnake as Snake} from './lib/snake/graphicSnake.js';
import {GraphicApple as Apple} from './lib/apple/graphicApple.js';

//import library for ws communication and create a connection
const ws = new WebSocket('ws://localhost:8080');

//objects
var field = new Field(document.getElementById("field"));
var snake = new Snake([0 , 0]);
var apple = new Apple(field);

//when upadate comes from the server.
ws.onmessage = (event) => {
    const receivedData = JSON.parse(event.data);

    field.update(receivedData.matrix);
    snake.copy(receivedData.snake);
    apple.copy(receivedData.apple);

    requestAnimationFrame(draw);

};

document.addEventListener('keydown', function(event) {
    function sendKey(key) {
        ws.send(JSON.stringify(key));
    }

    let key = event.key;
    switch(key) {
        case 'w': sendKey([0 , -1]); break;
        case 's': sendKey([0 , 1]); break;
        case 'a': sendKey([-1 , 0]); break;
        case 'd': sendKey([1 , 0]); break;
    }
})

function draw() {
    field.draw();
    snake.draw(field);
    apple.draw(field);
}