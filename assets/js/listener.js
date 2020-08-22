export class Listener {
    constructor(game) {
        this.game = game;
        this.initMoveListener();
        this.initAttackListener();
        this.initDefendListener();
    }

    initMoveListener() {
        const canvas = document.getElementById("map");

        canvas.addEventListener("mousedown", (event) => { // on crée un évènement qui permet de récupérer les clicks sur le canvas 
            if (!this.game.actions) { // s'il n'y a pas d'action, on n'exécute pas les actions pour déplacer le joueur
                return;
            }

            const rect = canvas.getBoundingClientRect(); // récupère la position du canvas à l'écran
            const unit = 20;
            const x = Math.floor((event.clientX - rect.left) / unit); // récupère la position du click sur le canvas et on divise par l'unité de taille du canvas pour pouvoir récupérer l'index de la case en x
            const y = Math.floor((event.clientY - rect.top) / unit); // idem pour y
            const cell = this.game.map.getCell(x, y); // on récupère la cellule correspond au click

            const cells = this.game.findUserDirection(cell); // cela retourne les cellules que le joueur va traverser
            if (!cells) { // si le click n'est pas sur une cellule de déplacement possible
                this.game.player.speak("Négatif, je ne peux pas aller ici !");
                return; // on arrête la fonction et on permet à l'utilisateur de cliquer sur une autre cellule 
            }
            this.game.onUserMoveChoice(cells); // cela va déplacer le joueur
        })
    }

    initAttackListener() {
        const attackButton = document.getElementById("attack"); // c'est le bouton qui permet d'attaquer
        attackButton.addEventListener('click', () => { // c'est l'action qui est exécutée au clic de l'utilisateur (attaquer)
            const killed = this.game.player.attack(this.game.enemy); // on attaque le joueur
            if (killed) { // s'il est tué
                this.game.enemykilled(this.game.enemy); // on exécute la méthode pour afficher le gagnant
                return;
            }
            this.game.battleDiv.style.display = 'none'; // on masque les boutons
            this.game.play(this.game.i + 1) // nouveau tour de jeu
        })
    }

    initDefendListener() {
        const defendButton = document.getElementById("defend");// c'est le bouton qui permet de défendre
        defendButton.addEventListener('click', () => { // c'est l'action qui est exécutée au clic de l'utilisateur (défendre)
            this.game.player.defend(); // on met le joueur en position "défense"
            this.game.battleDiv.style.display = 'none'; // on masque les boutons
            this.game.play(this.game.i + 1) // nouveau tour de jeu
        })
    }
}