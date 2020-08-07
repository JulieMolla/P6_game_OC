import { Game } from "./game.js";

const game = new Game(); // initialisation du jeu (génération des obstacles et des armes)
game.addPlayer("Julie"); // ajout d'un joueur
game.addPlayer("Yassin"); // ajout d'un joueur
game.play(); // exécution d'un tour de jeu