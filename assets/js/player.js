//Creation de la class Player
export class Player {
    constructor(name, weapon) {
        this.name = name;
        this.health = 100;
        this.weapon = weapon;
    }

    setPosition(cell) { // on assigne la cellule en tant que position du joueur
        this.position = cell;
    }

    draw() { // voir explications dans la class cell
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
        context.fillStyle = "green";
        context.fill(); // remplissage

    }

    move(cell) {
        this.position.remove(this);
        cell.add(this);
        this.speak("Let's move");
    }

    speak(message) {
        console.log(`${this.name}: ${message}`);
    }

    defend() { // à faire

    }

    attack() { // à faire

    }

    pickUpWeapon() { // à faire

    }
};