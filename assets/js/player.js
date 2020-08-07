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

    move(cells) { // permet de déplacer le joeur grâce aux cellules qu'il va traverser
        this.speak("Let's move");
        for (let i = 0; i < cells.length; i++) { // pour chaque cellule on place le joeueur sur la cellule 
            const cell = cells[i];
            this.position.remove(this);
            cell.add(this);
            if (cell.has("weapon")) { // s'il y a une arme, on la ramasse. 
                this.pickUpWeapon(cell);
            }
        }

    }

    speak(message) { // permet de faire parler le joeueu dans la console
        console.log(`${this.name}: ${message}`);
    }

    defend() { // à faire

    }

    attack() { // à faire

    }

    pickUpWeapon(cell) { // permet de récupérer une arme et de lâcher automatiquement celle qu'on a actuellement
        const weapon = cell.getType("weapon"); // c'est l'arme à récupérer
        this.speak(`pick ${weapon.name}, bye bye ${this.weapon.name}`);
        cell.remove(weapon); // on enlève l'arme de la cellule
        cell.add(this.weapon); // on place l'arme courante dans la cellule
        this.weapon = weapon; // on définit l'arme à ramasser commme arme courante
    }
};