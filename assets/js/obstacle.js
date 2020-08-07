export class Obstacle {
    setPosition(cell) { // on assigne la position de la cellule pour l'obstacle 
        this.position = cell;
    }

    draw() {
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
        context.fillStyle = "grey";
        context.fill();

    }
}