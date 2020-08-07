

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
        const unit = 20;
        const canvas = document.getElementById("map");
        const context = canvas.getContext("2d");
        for (let i = 0; i < this[direction].length; i++) { // on affiche chaque cellulle de déplacement d'une couleur différente 
            const move = this[direction][i];
            const x = move.x * unit;
            const y = move.y * unit;

            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(x + unit, y);
            context.lineTo(x + unit, y + unit);
            context.lineTo(x, y + unit);
            context.closePath();
            context.fillStyle = "rgba(100,200,100, 0.5)";
            context.fill();
        }
    }
}