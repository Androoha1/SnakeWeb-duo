import { Field } from '../../../public/lib/field/field.js';
import {Snake} from '../../../public/lib/snake/snake.js';
import {Apple} from '../../../public/lib/apple/apple.js';
import { Dot } from '../../../public/lib/core/dot.js';
import {conf} from '../../../public/snake.conf.js';

export class TestingGame {
    constructor(ws) {
        this.ws = ws;
        //main objects initialization
        this.field = new Field(20 , 20);
        this.snake = new Snake([1,1] , this.field);
        this.apple = new Apple(this.field);
    }

    start() {
        //fill the matrix
        this.field.addApple(this.apple);
        this.field.addSnake(this.snake);

        // The data, packed into a json ot send to the client.
        var dataToSend = {
            matrix: this.field.matrix,
            snake: this.snake,
            apple: this.apple
        };
        this.ws.send(JSON.stringify(dataToSend)); //initial pack

        //start the gaeme loop
        const interval = setInterval(() => {
            if (this.ifBump()) {this.snake.reset([1,1]);}
            this.snake.move();
            this.field.clear();
            this.field.addSnake(this.snake);
            this.field.addApple(this.apple);

            if (this.snake.head.isCollision(this.apple)) {
                this.snake.grow();
                this.field.removeApple(this.apple);
                this.apple.relocate(this.field);
            }
        
            this.ws.send(JSON.stringify(dataToSend));

            console.clear();
            this.field.outputMatrix();
            console.log("Snake head: [", this.snake.head.x, ' , ', this.snake.head.y, ']');
            console.log("Apple cord: [", this.apple.x, ' , ', this.apple.y, ']');

        } , conf.dTime);

        // If client pressed a key.
        this.ws.onmessage = (event) => {
            this.snake.addDirToQueue(event);
        }

        // Handle WebSocket close event and terminate the game loop
        this.ws.on('close', () => {
            console.log('Client disconnected');

            // Clear the interval to stop the game loop
            clearInterval(interval);
        });
    }

    ifBump() {
        let x = this.snake.head.next(this.snake.velocity);
        if (this.field.getSectorContent(x) === '0') {
            console.log("Debug: head:", this.snake.head.x, ',', this.snake.head.y, "  ", x.x, ',', x.y);
            return true;
        }
    }

    stop() {
    }
}