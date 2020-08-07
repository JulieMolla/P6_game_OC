

export class Actions { // on crée la classe Actions
    constructor() {
        this.up = []; // liste des cellules contenant une arme que le joueur peut rammasser 
        this.down = []; // liste des cellules sur lesquelles le joueur peut se déplacer
        this.left = []; // liste des cellulles dans lesquelles le joueur peut attaquer 
        this.right = [];
    }

    draw() {


        this.drawDirection("up");
        this.drawDirection("down");
        this.drawDirection("left");
        this.drawDirection("right");

        // à faire: affichage pour les cellules pick 
        // à faire: affichage pour les cellules attack
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
            context.fillStyle = "blue";
            context.fill();
        }
    }
}