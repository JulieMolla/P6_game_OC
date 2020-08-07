

export class Actions { // on crée la classe Actions
    constructor() {
        this.pick = []; // liste des cellules contenant une arme que le joueur peut rammasser 
        this.move = []; // liste des cellules sur lesquelles le joueur peut se déplacer
        this.attack = []; // liste des cellulles dans lesquelles le joueur peut attaquer 
    }

    draw() {
        const canvas = document.getElementById("map");
        const context = canvas.getContext("2d");

        const unit = 20;
        for (let i = 0; i < this.move.length; i++) { // on affiche chaque cellulle de déplacement d'une couleur différente 
            const move = this.move[i];
            const x = move.x * unit;
            const y = move.y * unit;

            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(x + unit, y);
            context.lineTo(x + unit, y + unit);
            context.lineTo(x, y + unit)
            context.closePath();
            context.fillStyle = "blue";
            context.fill();
        }

        // à faire: affichage pour les cellules pick 
        // à faire: affichage pour les cellules attack
    }
}