//imports
import { Field } from '../public/lib/field/field.js';
import {Snake} from '../public/lib/snake/snake.js';
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

//feild represantation
var field = new Field(20 , 20);

var startPosition = [1 , 1];
var apple = [9 , 9];
field.matrix[startPosition[0]][startPosition[1]] = '1';
field.matrix[apple[0]][apple[1]] = 'a';

//snake represantation
var snake = new Snake(startPosition , field);
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

    // The data, packed into a json ot send to the client.
    var dataToSend = {
        matrix: field.matrix,
        snake: snake
    };

    // Send the initial data to the client in JSON format
    ws.send(JSON.stringify(dataToSend));

    const interval = setInterval(() => {
        snake.move();
        field.clear();
        field.addSnake(snake);
        
        ws.send(JSON.stringify(dataToSend));

    } , 300);




    

    // Handle WebSocket close event
    ws.on('close', () => {
        console.log('Client disconnected');

        // Remove the client from the set of connected clients
        clients.delete(ws);

        // Clear the interval to stop the game loop
        clearInterval(interval);
    });
});
