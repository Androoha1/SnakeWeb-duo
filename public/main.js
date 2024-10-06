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

    if (snake.head.x - receivedSnake.head.x > 2) snake.head.x = -1;
    else if (snake.head.x - receivedSnake.head.x < -2) snake.head.x = conf.field.cols;
    else if (snake.head.y - receivedSnake.head.y > 2) snake.head.y = -1;
    else if (snake.head.y - receivedSnake.head.y < -2) snake.head.y = conf.field.rows;

    snake.head.x = (1 - progress) * snake.head.x + progress * receivedSnake.head.x;
    snake.head.y = (1 - progress) * snake.head.y + progress * receivedSnake.head.y;

    for (let i = 0; i < snake.size-1; ++i) {

        if (snake.body[i].x - receivedSnake.body[i].x > 2) snake.body[i].x = -1;
        else if (snake.body[i].x - receivedSnake.body[i].x < -2) snake.body[i].x = conf.field.cols;
        else if (snake.body[i].y - receivedSnake.body[i].y > 2) snake.body[i].y = -1;
        else if (snake.body[i].y - receivedSnake.body[i].y < -2) snake.body[i].y = conf.field.rows;

        snake.body[i].x = (1 - progress) * snake.body[i].x + progress * receivedSnake.body[i].x;
        snake.body[i].y = (1 - progress) * snake.body[i].y + progress * receivedSnake.body[i].y;
    }

    ////////////////////////////

    field.draw();
    snake.draw(field);
    apple.draw(field);

    requestAnimationFrame(renderGameField)
}
