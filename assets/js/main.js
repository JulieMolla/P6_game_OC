import { Session } from "./session.js";

const session = new Session([
    "Julie",
    "Yassin",
]);

session.startGame();


// function app() {
//     const game = new Game(); // initialisation du jeu (génération des obstacles et des armes)
//     game.addPlayer("Julie"); // ajout d'un joueur
//     game.addPlayer("Yassin"); // ajout d'un joueur
//     game.play(0); // exécution d'un tour de jeu
// }

$("#rulesModal").modal("show");
$("#replay").click(() => { session.startGame() });

//app();