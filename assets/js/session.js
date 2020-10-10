import { Game } from "./game.js";

export class Session {
    constructor() {
        this.score = {};
    }

    setPlayers(players) {
        this.players = players;
        for (let i = 0; i < players.length; i++) { // Initialisation des scores
            this.score[players[i]] = 0;
        }
    }

    startGame() {
        console.log("L'audience est ouverte !")
        this.game = new Game(this); // initialisation du jeu (génération des obstacles et des armes)
        for (let i = 0; i < this.players.length; i++) {
            this.game.addPlayer(this.players[i]); // ajout d'un joueur
        }
        this.game.play(0); // exécution d'un tour de jeu
    }

    winner(player) {
        console.log(`${player.name} a gagné !`);

        this.score[player.name] += 1; // On met à jour le score du gagnant

        for (let i = 0; i < this.players.length; i++) {
            // Affiche les scores des joueurs
            const player = this.players[i];
            $(`#session_p${i+1}_name`).text(player)
            $(`#session_p${i+1}_score`).text(this.score[player])
        }

        $("#winnerModal").modal("show"); // On affiche le gagnant à l'écran dans une modal
        $("#winner").text(player.name);
    }

    endGame() {
        if (this.game) { // S'il y a un jeu en cours
            this.game.listener.destroy(); // On arrête les listeners
        }
    }
}
