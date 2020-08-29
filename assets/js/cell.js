import { Obstacle } from "./obstacle.js";
import { Player } from "./player.js";
import { Weapon } from "./weapon.js";

//Creation de la class Cell
export class Cell {
    constructor(x, y, map) { // initialisation des coordonnées de la cellule 
        this.x = x;
        this.y = y;
        this.elements = { //élément que contient la cellule
            player: null,
            weapon: null,
            obstacles: null,
        };
        this.map = map; // référence vers la map

    }



    add(element) {
        const type = this.getElementType(element);
        this.elements[type] = element;//on ajoute l'élément à la cellule
        element.setPosition(this);//référence la cellule dans l'élément
    }

    getElementType(element) { // récupère le type de l'élément en fonction de l'instance
        if (element instanceof Obstacle) {
            return "obstacle";
        }

        if (element instanceof Weapon) {
            return "weapon";
        }

        if (element instanceof Player) {
            return "player";
        }
    }

    remove(element) { // supprime un élément de la cellule
        const type = this.getElementType(element);
        this.elements[type] = null; // La méthode filter() crée et retourne un nouveau tableau contenant tous les éléments du tableau d'origine qui remplissent une condition déterminée par la fonction en paramètre.
        element.setPosition(null); // L'élément n'est plus sur la carte. Il n'a donc plus de position.
    }

    getType(type) { // permet de récupérer un élément de type donné
        return this.elements[type];
    }

    has(type) { //permet de vérifier si la cellule contient un type d'élément 
        return this.getType(type) != null;
    }

    draw() { // c'est pour gérer l'affichage d'une cellule 
        window.vue.draw(this, { stroke: "black" }); // on dessine la cellule

        // on affiche dans l'ordre l'obstacle, l'arme et le joueur s'il y en a dans la cellule 
        if (this.has("obstacle")) {
            this.getType("obstacle").draw();
        }
        if (this.has("weapon")) {
            this.getType("weapon").draw();
        }
        if (this.has("player")) {
            this.getType("player").draw();
        }
    }

    isEmpty() { // permet de vérifier s'il y a aucun élément dans la cellule 
        return !this.has("obstacle") && !this.has("weapon") && !this.has("player");
    }

    isAvailable() { // la cellule est disponible si elle n'a pas d'obstacle ni de joueur
        return !this.has("obstacle") && !this.has("player");
    }

    getAdjacentPlayer() { // retourne un joueur s'il y en a un autour de la cellule
        const up = this.map.getCell(this.x, this.y + 1); // on récupère la cellule du haut
        const down = this.map.getCell(this.x, this.y - 1);
        const left = this.map.getCell(this.x - 1, this.y);
        const right = this.map.getCell(this.x + 1, this.y);

        if (up) { // si la cellule existe
            const upPlayer = up.getType("player"); // on récupère l'élément de type "joueur"
            if (upPlayer) { // s'il y en a un 
                return upPlayer; // on retourne le joueur
            }
        }

        if (down) {
            const downPlayer = down.getType("player");
            if (downPlayer) {
                return downPlayer;
            }
        }

        if (left) {
            const leftPlayer = left.getType("player");
            if (leftPlayer) {
                return leftPlayer;
            }
        }

        if (right) {
            const rightPlayer = right.getType("player");
            if (rightPlayer) {
                return rightPlayer;
            }
        }
    }


}


