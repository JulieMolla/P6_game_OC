import { getRandomNumber } from "./utils.js";
import { Obstacle } from "./obstacle.js";
import { Cell } from "./cell.js";

//Creation de la class Map
export class GameMap {
    constructor(width, height) { //initialisation de la largeur et de la hauteur de la carte 
        this.width = width;
        this.height = height;
        this.initMatrix(width, height);
    }

    setRandomPosition(element) { //permet de placer aléatoirement un élément
        let x = getRandomNumber(0, this.width); //getRandomNumber permet d'avoir un nombre aléatoire entre 0 et la largeur
        let y = getRandomNumber(0, this.height);//getRandomNumber permet d'avoir un nombre aléatoire entre 0 et la hauteur
        let cell = this.getCell(x, y);
        let cellUp = this.getCell(x, y + 1);
        let cellDown = this.getCell(x, y - 1);
        let cellRight = this.getCell(x + 1, y);
        let cellLeft = this.getCell(x - 1, y);
        let cellUpLeft = this.getCell(x - 1, y + 1);
        let cellUpRight = this.getCell(x + 1, y + 1);
        let cellDownLeft = this.getCell(x - 1, y - 1);
        let cellDownRight = this.getCell(x + 1, y - 1);
        if ( // on place l'élément seulement si la cellule est vide et qu'il n'y a pas de joeueur autour
            cell.isEmpty() &&
            (!cellUp || !cellUp.has("player")) &&
            (!cellDown || !cellDown.has("player")) &&
            (!cellRight || !cellRight.has("player")) &&
            (!cellLeft || !cellLeft.has("player")) &&
            (!cellUpLeft || !cellUpLeft.has("player")) &&
            (!cellUpRight || !cellUpRight.has("player")) &&
            (!cellDownLeft || !cellDownLeft.has("player")) &&
            (!cellDownRight || !cellDownRight.has("player"))
        ) {
            cell.add(element);//on référence l'élément dans la cellule 
            return;
        }

        this.setRandomPosition(element); // sinon on rappelle la méthode pour trouver une autre position aléatoire

    }

    getCell(x, y) { //getCell permet de récupérer la cellule avec les coordonnées aléatoires générées avant
        if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
            return;
        }
        const row = this.matrix[y];//récupère la ligne à l'index y 
        const cell = row[x];//récupère la cellule de la ligne à l'index x 
        return cell;

    }

    initMatrix(width, height) { //permet d'initialiser un tableau en 2D des dimensions données
        const rows = [];
        for (let y = 0; y < height; y++) { // boucle qui itère sur les lignes et qui ajoute les cellules à chaque ligne
            const cells = [];
            for (let x = 0; x < width; x++) { // boucle qui itère sur les cellules  et qui ajoute les cellules à chaque ligne
                cells.push(new Cell(x, y, this));
            }
            rows.push(cells);
        }
        this.matrix = rows;
    }

    print() {//création d'une méthode pour afficher le tableau en 2D
        let result = "";
        for (let y = 0; y < this.height; y++) { // on itère sur les lignes
            result = result + "|";
            for (let x = 0; x < this.width; x++) { // on itère sur les cellules
                const cell = this.getCell(x, y); // getCell permet de récupérer la cellule à cette position 
                //if permettent de remplir la cellule en fonction de ce qu'il y a dedans
                if (cell.isEmpty()) {
                    result = result + "_";

                }
                if (cell.has("obstacle")) {
                    result = result + "O";

                }
                result = result + "|"; // permet de délimiter les cellules
            }
            result = result + "\n"; // permet de délimiter les lignes
        }
        console.log(result); // on affiche 
    }

    draw() {//création d'une méthode pour afficher le tableau en 2D
        for (let y = 0; y < this.height; y++) { // on itère sur les lignes

            for (let x = 0; x < this.width; x++) { // on itère sur les cellules
                const cell = this.getCell(x, y); // getCell permet de récupérer la cellule à cette position 
                cell.draw(); // on dessine la cellule
            }
        }
    }
}


