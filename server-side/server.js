//imports
import express from 'express';
import http from 'http';
import {WebSocketServer} from 'ws';
import {TestingGame} from './lib/game/testingGame.js';

//create a web server with http and ws capabilities (with express lib)
const app = express();
app.use(express.static('public'));
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Start the HTTP and WebSocket server on port 8080
server.listen(8080, () => {
    console.log('Server is listening on port 8080');
});

// WebSocket connection event on the server
const clients = new Set();
wss.on('connection', (ws) => {
    var game = new TestingGame(ws);
    game.start();
});
