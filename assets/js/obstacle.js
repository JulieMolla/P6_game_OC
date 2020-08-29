export class Obstacle {
    setPosition(cell) { // on assigne la position de la cellule pour l'obstacle 
        this.position = cell;
    }

    draw() {
        window.vue.draw(this.position, { fill: "#3d0f13", image: "./assets/images/gavel.svg" }); // on dessine l'obstacle
    }
}