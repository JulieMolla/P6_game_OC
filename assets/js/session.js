import { Game } from "./game.js";

export class Session {
    constructor(players) {
        this.score = {};
        this.players = players;
        for (let i = 0; i < players.length; i++) {
            this.score[players[i]] = 0;
        }
    }

    startGame() {
        const game = new Game(this); // initialisation du jeu (génération des obstacles et des armes)
        for (let i = 0; i < this.players.length; i++) {
            game.addPlayer(this.players[i]); // ajout d'un joueur
        }
        console.log("startGame", game);
        game.play(0); // exécution d'un tour de jeu
    }

    incrementScore(player) {
        this.score[player] += 1;
    }
}
