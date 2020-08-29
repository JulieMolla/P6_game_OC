// Creation de la class Weapon
export class Weapon {
    constructor(name, picture, power) {
        this.name = name
        this.picture = picture
        this.power = power
    }

    setPosition(cell) { // on assigne la cellule comme position de l'arme 
        this.position = cell;
    }

    draw() { // voir explications dans la classe cell
        window.vue.draw(this.position, { fill: "#b17669", image: this.picture }); // on dessine l'arme
    }

}