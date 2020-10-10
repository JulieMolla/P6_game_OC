import { obstacleImg } from "./images.js";

export class Obstacle {
    setPosition(cell) { // on assigne la position de la cellule pour l'obstacle 
        this.position = cell;
    }

    draw() {
        window.vue.draw(this.position, { fill: "#3d0f13", image: obstacleImg }); // on dessine l'obstacle
    }
}