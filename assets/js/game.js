import { GameMap } from "./map.js"
import { Obstacle } from "./obstacle.js";
import { Weapon } from "./weapon.js";
import { Player } from "./player.js";
import { Actions } from "./actions.js";

export class Game {
    constructor() {
        this.map = new GameMap(10, 5);//création d'une Map de 10 par 5

        this.generateObstacles(8);// génération des obstacles
        this.generateWeapons();// génération des armes
        this.players = []; // initialisation pour l'ajout des joueurs
        this.i = 0; // le "i" c'est le numéro du tour qu'on initialise à 0.


        this.battleDiv = document.getElementById("battle"); // c'est l'élément qui contient les boutons de la bataille




    }

    enemykilled(enemy) { // c'est la méthode qui permet d'afficher le gagnant
        this.battleDiv.style.display = 'none'; // on masque les boutons
        this.players = this.players.filter(player => player != enemy) // on supprime le joueur tué de la liste des joueurs
        if (this.players.length == 1) { // s'il n'y a plus qu'un joueur
            const winner = this.players[0]; // c'est le gagnant
            console.log(`${winner.name} a gagné !`);
        }
        this.draw(); // on raffraichit l'affichage
    }

    findUserDirection(cell) { // retourne les cellules que le joueur va traverser jusqu'au clic de l'utilisateur
        const upIndex = this.actions["up"].indexOf(cell); // on récupère l'index de la cellule dans le tableau des mmouvements vers le haut
        if (upIndex != -1) { // si c'est moins 1, l'élément ne corresond pas à un mouvement possible vers le haut
            return this.actions["up"].slice(0, upIndex + 1); //enlève les cellules qui sont après le clic de l'utilisateur
        }
        const downIndex = this.actions["down"].indexOf(cell);
        if (downIndex != -1) {
            return this.actions["down"].slice(0, downIndex + 1);
        }
        const leftIndex = this.actions["left"].indexOf(cell);
        if (leftIndex != -1) {
            return this.actions["left"].slice(0, leftIndex + 1);
        }
        const rightIndex = this.actions["right"].indexOf(cell);
        if (rightIndex != -1) {
            return this.actions["right"].slice(0, rightIndex + 1);
        }
    }

    onUserMoveChoice(cells) { // déplace le joueur jusqu'à la cellule choisie
        this.actions = null; // l'utilisateur a fait son choix donc on efface les actions
        const enemy = this.player.move(cells) //on fait bouger le joeur en lui passant toutes les cases qu'il va traverser
        this.draw();// on rafraichit la page

        if (enemy) { // s'il y a un ennemie
            this.askAttackOrDefend(enemy); // on demande à l'utilisateur s'il attaque ou s'il se défend
        } else {
            this.play(this.i + 1) // nouveau tour de jeu
        }
    }

    generateObstacles(nb) {
        for (let i = 0; i < nb; i++) {
            this.map.setRandomPosition(new Obstacle()); // ajout des obstacles aléatoirement
        }
    }

    generateWeapons() {
        this.map.setRandomPosition(new Weapon("Code civil", "", 55));
        this.map.setRandomPosition(new Weapon("Balance de la justice", "", 25));
        this.map.setRandomPosition(new Weapon("Marteau", "", 40));
    }

    addPlayer(name) { // on ajoute des joueurs manuellement 
        const defaultWeapon = new Weapon("Stylo", "", 10); // avec une arme par défaut
        const player = new Player(name, defaultWeapon); // on instancie le joueur
        this.map.setRandomPosition(player); // on place le joueur aléatoirement sur la carte
        this.players.push(player); // on ajoute le joueur à la liste des joueurs
        this.map.draw()
    }

    askAttackOrDefend(enemy) {
        this.player.speak('Ennemie en vue !'); // fait parler le joueur 
        this.enemy = enemy; // définit l'ennemie pour le tour
        this.battleDiv.style.display = 'block'; // affiche les boutons 
        this.draw(); // on raffraichit l'affichage
    }

    play(i) { // c'est l'exécution d'un tour de jeu
        this.i = i; // on met à jour le numéro du tour
        this.player = this.players[this.i % this.players.length]; // définit le joueur actif pour le tour
        console.log(`A ${this.player.name} de jouer !`)
        const enemy = this.player.position.getAdjacentPlayer(); // vérifie s'il y a des ennemies autour du joueur
        if (enemy) {
            this.askAttackOrDefend(enemy); // s'il y en a, on demande à l'utilisateur ce qu'il veut faire
        }
        else { // s'il n'y a pas d'ennemi autour, le joueur peut se déplacer
            this.actions = this.getPlayerActions(this.player.position); // on récupère les actions que le joueur peut faire
            this.draw(); // on rafraichit l'affichage pour afficher les nouvelles actions possibles
        }
    }

    draw() {
        const canvas = document.getElementById("map");
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, context.canvas.width, context.canvas.height); // on efface le canvas 
        if (this.actions) {
            this.actions.draw(); // on affiche les actions dans le canvas 
        }
        this.map.draw(); // affichage de la map dans le canvas


    }

    getPlayerActions(position) { // c'est pour générer toutes les actions possibles pour le joueur
        const actions = new Actions(); // on instancie une nouvelle action
        this.checkDirection(actions, position, "up")
        this.checkDirection(actions, position, "down")
        this.checkDirection(actions, position, "right")
        this.checkDirection(actions, position, "left")
        return actions;
    }

    checkDirection(actions, position, direction) { //vérifie les cases possible pour un déplacement dans une direction
        for (let i = 1; i <= 3; i++) {
            let cell;
            if (direction == "up") {
                cell = this.map.getCell(position.x, position.y + i)
            }
            if (direction == "down") {
                cell = this.map.getCell(position.x, position.y - i)
            }
            if (direction == "right") {
                cell = this.map.getCell(position.x + i, position.y)
            }
            if (direction == "left") {
                cell = this.map.getCell(position.x - i, position.y)
            }

            if (!cell) {
                break;
            }


            if (cell.has("obstacle") || cell.has("player")) {
                break;
            }

            if (cell.isAvailable()) {
                actions[direction].push(cell)
            }
        }

    }
}