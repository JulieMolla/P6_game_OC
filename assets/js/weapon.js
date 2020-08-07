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
        const canvas = document.getElementById("map");
        const context = canvas.getContext("2d");

        const unit = 20;
        const x = this.position.x * unit;
        const y = this.position.y * unit;

        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + unit, y);
        context.lineTo(x + unit, y + unit);
        context.lineTo(x, y + unit)
        context.closePath();
        context.fillStyle = "yellow";
        context.fill(); // remplissage

    }

}