
//Creation de la class Player
export class Player {
    constructor(name, weapon, image) {
        this.name = name;
        this.health = 100;
        this.weapon = weapon;
        this.image = image;
    }

    setPosition(cell) { // on assigne la cellule en tant que position du joueur
        this.position = cell;
    }

    draw() { // voir explications dans la class cell
        window.vue.draw(this.position, { fill: "#aa393e", sprite: this.image }); // on dessine le joueur
    }

    move(cells) { // permet de déplacer le joeur grâce aux cellules qu'il va traverser
        this.speak("Let's move");
        for (let i = 0; i < cells.length; i++) { // pour chaque cellule on place le joueur sur la cellule 
            const cell = cells[i];
            this.position.remove(this);
            cell.add(this);
            if (cell.has("weapon")) { // s'il y a une arme, on la ramasse. 
                this.pickUpWeapon(cell);
            }
            const enemy = cell.getAdjacentPlayer();
            if (enemy) {
                return enemy;
            }
        }

    }

    speak(message) { // permet de faire parler le joueur dans la console
        console.log(`${this.name}: ${message}`);
    }

    defend() {
        this.speak("Objection !");
        this.protect = true;
    }

    attack(enemy) { //on renvoie true si l'ennemie est tué 
        this.protect = false; // on attaque donc on n'est plus en position de défense
        this.speak(`Attaque ${enemy.name} !`);
        return enemy.hurt(this.weapon); // on blesse l'ennemie avec l'arme
    }

    hurt(weapon) { // on est blessé par une arme 
        let damage = weapon.power;
        if (this.protect) { // si on est en position de défense, les dégâts sont réduits de moitié
            damage = weapon.power / 2;
        }
        this.health = Math.max(this.health - damage, 0);// on mets à jour les points de vie
        this.speak(`Oh ! Je suis blessé ! J'ai perdu ${damage} points de vie. Il me reste ${this.health} points de vie.`)
        if (this.health <= 0) { // si les points de vie sont inférieurs ou égal à 0
            this.speak(`Je suis mort !`);
            this.position.remove(this); // on enlève le joueur de la map 
            return true; // renvoie true pour indiquer que le joueur est ko
        }
        return false;
    }

    pickUpWeapon(cell) { // permet de récupérer une arme et de lâcher automatiquement celle qu'on a actuellement
        const weapon = cell.getType("weapon"); // c'est l'arme à récupérer
        this.speak(`pick ${weapon.name}, bye bye ${this.weapon.name}`);
        cell.remove(weapon); // on enlève l'arme de la cellule
        cell.add(this.weapon); // on place l'arme courante dans la cellule
        this.weapon = weapon; // on définit l'arme à ramasser commme arme courante
    }
};