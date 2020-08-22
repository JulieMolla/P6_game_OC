export class Obstacle {
    setPosition(cell) { // on assigne la position de la cellule pour l'obstacle 
        this.position = cell;
    }

    draw() {
        window.vue.draw(this.position, { fill: "grey" }); // on dessine l'obstacle
    }
}