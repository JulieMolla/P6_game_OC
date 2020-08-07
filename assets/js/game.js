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
        this.i = 0;

        const canvas = document.getElementById("map");
        canvas.addEventListener("mousedown", (event) => {
            const player = this.players[this.i % this.players.length]

            const rect = canvas.getBoundingClientRect();
            const x = Math.floor((event.clientX - rect.left) / 20);
            const y = Math.floor((event.clientY - rect.top) / 20);
            const cell = this.map.getCell(x, y);
            const upIndex = this.actions["up"].indexOf(cell);
            if (upIndex != -1) {
                player.move(this.actions["up"].slice(0, upIndex + 1))
                this.i++
                this.play()
            }

            const downIndex = this.actions["down"].indexOf(cell);
            if (downIndex != -1) {
                player.move(this.actions["down"].slice(0, downIndex + 1))
                this.i++
                this.play()
            }

            const leftIndex = this.actions["left"].indexOf(cell);
            if (leftIndex != -1) {
                player.move(this.actions["left"].slice(0, leftIndex + 1))
                this.i++
                this.play()
            }

            const rightIndex = this.actions["right"].indexOf(cell);
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
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
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

    checkDirection(actions, position, direction) {
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