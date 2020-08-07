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

    move(cells) {
        this.speak("Let's move");
        for (let i = 0; i < cells.length; i++) {
            const cell = cells[i];
            this.position.remove(this);
            cell.add(this);
            if (cell.has("weapon")) {
                this.pickUpWeapon(cell);
            }
        }

    }

    speak(message) {
        console.log(`${this.name}: ${message}`);
    }

    defend() { // à faire

    }

    attack() { // à faire

    }

    pickUpWeapon(cell) {
        const weapon = cell.getType("weapon");
        this.speak(`pick ${weapon.name}, bye bye ${this.weapon.name}`);
        cell.remove(weapon);
        cell.add(this.weapon);
        this.weapon = weapon;
    }
};