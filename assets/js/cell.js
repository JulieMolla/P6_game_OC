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

    remove(element) {
        this.elements = this.elements.filter(elem => elem != element);
        element.setPosition(null);
    }

    getType(type) {
        return this.elements.find(element => {
            switch (type) {
                case "obstacle":
                    return element instanceof Obstacle; // some vérifie qu'un des éléments du tableau est une instance de la classe Obstacle
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

    isAvailable() {
        return this.isEmpty() || this.has("weapon");
    }


}


