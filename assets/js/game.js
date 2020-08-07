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

        const canvas = document.getElementById("map");
        canvas.addEventListener("mousedown", (event) => { // on crée un évènement qui permet de récupérer les clicks sur le canvas 
            const player = this.players[this.i % this.players.length] // on récupère le joeur actif pour le tour

            const rect = canvas.getBoundingClientRect(); // récupère la position du canvas à l'écran
            const x = Math.floor((event.clientX - rect.left) / 20); // récupère la position du click sur le canvas et on divise par l'unité de taille du canvas pour pouvoir récupérer l'index de la case en x
            const y = Math.floor((event.clientY - rect.top) / 20); // idem pour y
            const cell = this.map.getCell(x, y); // on récupère la cellule correspond au click

            const upIndex = this.actions["up"].indexOf(cell); // on récupère l'index de la cellule dans le tableau des mmouvements vers le haut
            if (upIndex != -1) { //si c'est moins 1, l'élément ne corresond pas à un mouvement possible vers le haut
                player.move(this.actions["up"].slice(0, upIndex + 1)) //on fait bouger le joeur en lui passant toutes les cases qu'il va traverser
                this.i++ // on incrémente le numéro du tour 
                this.play() // nouveau tour de jeu
            }

            const downIndex = this.actions["down"].indexOf(cell); // idem => il faudra en faire une autre méthode
            if (downIndex != -1) {
                player.move(this.actions["down"].slice(0, downIndex + 1))
                this.i++
                this.play()
            }

            const leftIndex = this.actions["left"].indexOf(cell);// idem => il faudra en faire une autre méthode
            if (leftIndex != -1) {
                player.move(this.actions["left"].slice(0, leftIndex + 1))
                this.i++
                this.play()
            }

            const rightIndex = this.actions["right"].indexOf(cell);// idem => il faudra en faire une autre méthode
            if (rightIndex != -1) {
                player.move(this.actions["right"].slice(0, rightIndex + 1))
                this.i++
                this.play()
            }

        })
    }


    generateObstacles(nb) {
        for (let i = 0; i < nb; i++) {
            this.map.setRandomPosition(new Obstacle()); // ajout des obstacles aléatoirement
        }
    }

    generateWeapons() {
        this.map.setRandomPosition(new Weapon("Famas", "", 55));
        this.map.setRandomPosition(new Weapon("Arc", "", 25));
        this.map.setRandomPosition(new Weapon("Pistolet", "", 40));
    }

    addPlayer(name) { // on ajoute des joueurs manuellement 
        const defaultWeapon = new Weapon("Couteau", "", 10); // avec une arme par défaut
        const player = new Player(name, defaultWeapon); // on instancie le joueur
        this.map.setRandomPosition(player); // on place le joueur aléatoirement sur la carte
        this.players.push(player); // on ajoute le joueur à la liste des joueurs
        this.map.draw()
    }

    play() { // c'est l'exécution d'un tour de jeu
        const player = this.players[this.i % this.players.length]; // à faire: récupérer le joueur actif pour le tour
        console.log(`A ${player.name} de jouer !`)
        this.actions = this.getPlayerActions(player.position); // on récupère les actions que le joueur peut faire
        this.draw(); //  

        // à faire: récupérer l'action choisie par le joueur et l'exécuter
    }

    draw() {
        const canvas = document.getElementById("map");
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, context.canvas.width, context.canvas.height); // on efface le canvas 
        this.actions.draw(); // on affiche les actions dans le canvas 
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