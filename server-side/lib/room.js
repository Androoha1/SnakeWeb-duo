export class Room {
    constructor(id , game , creator) {
        this.id = id;
        this.players = [creator];
        this.game = game;
        this.creator = creator;
    }

    startGame(secondPlayer) {
        this.players[1] = secondPlayer;
        this.game.start();
    }
}