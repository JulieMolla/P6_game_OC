import { Obstacle } from "./obstacle.js";
import { Player } from "./player.js";
import { Weapon } from "./weapon.js";

//Creation de la class Cell
export class Cell {
    constructor(x, y) { // initialisation des coordonnées de la cellule 
        this.x = x;
        this.y = y;
        // this.elements = {};
        this.elements = [];

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
        const canvas = document.getElementById("map"); // on récupère l'élément canvas
        const context = canvas.getContext("2d"); // on récupère le contexte

        const unit = 20; // c'est l'échelle d'affichage d'une cellule en pixels
        const x = this.x * unit; // c'est la position de la cellule en pixels 
        const y = this.y * unit; // idem

        context.beginPath(); // on dit à canvas qu'on démarre un tracé 
        context.moveTo(x, y); // on se place à la position de la cellule
        context.lineTo(x + unit, y); // on trace un trait d'une unité vers la droite
        context.lineTo(x + unit, y + unit); // on trace un trait d'une unité vers le bas
        context.lineTo(x, y + unit) // on trace un trait d'une unité vers la gauche
        context.closePath(); // on ferme le tracé 
        context.strokeStyle = "black"; // couleur de la bordure
        context.stroke(); // on dessine la bordure 

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


}


