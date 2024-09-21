//imports
import { Field } from '../public/lib/field/field.js';
import {Snake} from '../public/lib/snake/snake.js';
import {Apple} from '../public/lib/apple/apple.js'
import express from 'express';
import http from 'http';
import {WebSocketServer} from 'ws';

//create a web server with http and ws capabilities (with express lib)
const app = express();
app.use(express.static('public'));
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Start the HTTP and WebSocket server on port 8080
server.listen(8080, () => {
    console.log('Server is listening on port 8080');
});

//main objects initialization
var field = new Field(20 , 20);
var snake = new Snake([1,1] , field);
var apple = new Apple(field);

//fill the matrix
field.matrix[apple.x][apple.y] = 'a';
field.addSnake(snake);

// WebSocket connection event on the server
const clients = new Set();
wss.on('connection', (ws) => {
    console.log('Client connected');
    // Check if the client is already connected
    if (clients.has(ws)) {
        console.log('Client already connected, closing existing connection');
        ws.close();
        return;
    }
    // Add the client to the set of connected clients
    clients.add(ws);

    ws.onmessage = (event) => {
        let receivedData = JSON.parse(event.data);
        let dir;
        switch (receivedData) {
            case 'w': dir = [0 , -1]; break;
            case 'a': dir = [-1 , 0]; break;
            case 's': dir = [0 , 1]; break;
            case 'd': dir = [1 , 0];
        }
        snake.changeDirection(dir);
    }

    // The data, packed into a json ot send to the client.
    var dataToSend = {
        matrix: field.matrix,
        snake: snake,
        apple: apple
    };

    // Send the initial data to the client in JSON format
    ws.send(JSON.stringify(dataToSend));

    //start the gaeme loop
    const interval = setInterval(() => {
        snake.move();
        field.clear();
        field.addSnake(snake);
        field.addApple(apple);

        if (snake.x === apple.x && snake.y === apple.y) {
            snake.grow();
            apple.relocate();
        }

        field.matrix[apple.x][apple.y] = 'a';
        
        ws.send(JSON.stringify(dataToSend));

    } , 300);




    

    // Handle WebSocket close event and terminate the game loop
    ws.on('close', () => {
        console.log('Client disconnected');

        // Remove the client from the set of connected clients
        clients.delete(ws);

        // Clear the interval to stop the game loop
        clearInterval(interval);
    });
});
