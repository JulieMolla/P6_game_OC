

export class Actions { // on crée la classe Actions
    constructor() {
        // Liste des cases possibles pour se déplacer dans chaque direction
        this.up = [];
        this.down = [];
        this.left = [];
        this.right = [];
    }

    draw() {
        // affichage des cellules dans chaque direction

        this.drawDirection("up");
        this.drawDirection("down");
        this.drawDirection("left");
        this.drawDirection("right");
    }

    drawDirection(direction) {
        for (let i = 0; i < this[direction].length; i++) { // on affiche chaque cellulle de déplacement d'une couleur différente 
            const move = this[direction][i];
            window.vue.draw(move, { fill: "rgba(100,200,100, 0.5)" });
        }
    }
}