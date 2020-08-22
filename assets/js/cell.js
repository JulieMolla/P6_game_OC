import { Obstacle } from "./obstacle.js";
import { Player } from "./player.js";
import { Weapon } from "./weapon.js";

//Creation de la class Cell
export class Cell {
    constructor(x, y, map) { // initialisation des coordonnées de la cellule 
        this.x = x;
        this.y = y;
        // this.elements = {};
        this.elements = [];
        this.map = map;

    }



    add(element) {
        // this.elements[element.constructor.name] = element //on ajoute l'élément à la cellule
        this.elements.push(element);//on ajoute l'élément à la cellule
        element.setPosition(this);//référence la cellule dans l'élément
    }

    remove(element) { // supprime un élément de la cellule
        this.elements = this.elements.filter(elem => elem != element); // La méthode filter() crée et retourne un nouveau tableau contenant tous les éléments du tableau d'origine qui remplissent une condition déterminée par la fonction en paramètre.
        element.setPosition(null); // L'élément n'est plus sur la carte. Il n'a donc plus de position.
    }

    getType(type) { // permet de récupérer un élément de type donné
        return this.elements.find(element => { // La méthode find() renvoie la valeur du premier élément trouvé dans le tableau qui respecte la condition donnée par la fonction de test passée en argument. Sinon, la valeur undefined est renvoyée.
            switch (type) {
                case "obstacle":
                    return element instanceof Obstacle; // retourne "vrai" si c'est une instance de Obstacle
                case "weapon":
                    return element instanceof Weapon;
                case "player":
                    return element instanceof Player;
                default:
                    return false;
            }
        })
    }

    has(type) { //permet de vérifier si la cellule contient un type d'élément 
        switch (type) {
            case "obstacle":
                return this.elements.some(element => element instanceof Obstacle); // some vérifie qu'un des éléments du tableau est une instance de la classe Obstacle
            case "weapon":
                return this.elements.some(element => element instanceof Weapon);
            case "player":
                return this.elements.some(element => element instanceof Player);
        }
        // return this.getType(type) != undefined
    }

    draw() { // c'est pour gérer l'affichage d'une cellule 
        window.vue.draw(this, { stroke: "black" }); // on dessine la cellule
        for (let i = 0; i < this.elements.length; i++) { // pour chaque élément de la cellule 
            const element = this.elements[i];
            element.draw(); // on dessine l'élément 
        }
    }

    isEmpty() { // permet de vérifier s'il y a aucun élément dans la cellule 
        return this.elements.length == 0;
    }

    isAvailable() { // une case est disponible si elle est vide ou si elle n'a pas d'obstacle ou de joueur
        return this.isEmpty() || !this.has("obstacle") || !this.has("player");
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


