//Field class designed for this project
import {GraphicField as Field} from './lib/field/graphicField.js';
import {GraphicSnake as Snake} from './lib/snake/graphicSnake.js';
import {GraphicApple as Apple} from './lib/apple/graphicApple.js';
import { conf } from './snake.conf.js';

//import library for ws communication and create a connection
const ws = new WebSocket('ws://localhost:8080');

//objects
var field = new Field(document.getElementById("field"));
var snake = new Snake([0 , 0]);
    window.snake = snake;
var apple = new Apple(field);




//main loop is sync with the browser window refresh.
requestAnimationFrame(renderGameField);

//server update handler.
var receivedSnake = snake;
var lastUpdateTime;
ws.onmessage = (event) => {
    lastUpdateTime = performance.now();
    snake.copy(receivedSnake); //sync with the previous update.

    const receivedData = JSON.parse(event.data);
    receivedSnake = receivedData.snake;

    field.update(receivedData.matrix);
    apple.copy(receivedData.apple);
};

//keyboard input handler.
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

var progress;
function renderGameField(timestamp) {



    
    //////////////////////////////
    progress = Math.min((timestamp - lastUpdateTime) / conf.dTime, 1);
    snake.move(progress , receivedSnake);
    ////////////////////////////

    field.draw();
    snake.draw(field);
    apple.draw(field);

    requestAnimationFrame(renderGameField)
}
