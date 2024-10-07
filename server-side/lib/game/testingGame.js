import { Field } from '../../../public/lib/field/field.js';
import {Snake} from '../../../public/lib/snake/snake.js';
import {Apple} from '../../../public/lib/apple/apple.js';
import {conf} from '../../../public/snake.conf.js';

export class TestingGame {
    constructor(ws) {
        this.ws = ws;
    }

    start() {
        //main objects initialization
        var field = new Field(20 , 20);
        var snake = new Snake([1,1] , field);
        var apple = new Apple(field);
        //fill the matrix
        field.matrix[apple.x][apple.y] = 'a';
        field.addSnake(snake);

        // The data, packed into a json ot send to the client.
        var dataToSend = {
            matrix: field.matrix,
            snake: snake,
            apple: apple
        };
        this.ws.send(JSON.stringify(dataToSend)); //initial pack

        //start the gaeme loop
        const interval = setInterval(() => {
            snake.move();
            field.clear();
            field.addSnake(snake);
            field.addApple(apple);

            if (snake.head.x === apple.x && snake.head.y === apple.y) {
                snake.grow();
                apple.relocate(field);
            }

            field.matrix[apple.x][apple.y] = 'a';
        
            this.ws.send(JSON.stringify(dataToSend));

        } , conf.dTime);

        // If client pressed a key.
        this.ws.onmessage = (event) => {
            snake.addDirToQueue(event);
        }

        // Handle WebSocket close event and terminate the game loop
        this.ws.on('close', () => {
            console.log('Client disconnected');

            // Clear the interval to stop the game loop
            clearInterval(interval);
        });
    }

    stop() {
    }
}