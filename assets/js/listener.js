import { throttle } from "./utils.js";

export class Listener {
    constructor(game) {
        this.game = game; // on garde une référence vers le jeu
        this.initMoveListener(); // on initialise un listener pour les déplacements
        this.initHoverListener(); // on initialise un listener pour le survol de la souris
        this.initAttackListener(); // on initialise un listener pour les attaques
        this.initDefendListener(); // on initialise un listener pour les défenses
        this.initResizeListener(); // on initialise un listener sur le redimissionnement de la fenetre
    }

    destroy() {
        $(window.vue.canvas).off(); // Arrêt du listener sur le canvas
        $('.attack').off(); // Arrêt du listener sur le bouton attaque
        $('.defend').off(); // Arrêt du listener sur le bouton défendre
        $(window).off('resize'); // Arrêt du listener sur le resize de la fenêtre
    }

    initMoveListener() {
        $(window.vue.canvas).mousedown((event) => { // on crée un évènement qui permet de récupérer les clicks sur le canvas 
            if (!this.game.actions) { // s'il n'y a pas d'action, on n'exécute pas les actions pour déplacer le joueur
                return;
            }

            const rect = window.vue.canvas.getBoundingClientRect(); // récupère la position du canvas à l'écran
            const unit = window.vue.unit;
            const x = Math.floor((event.clientX - rect.left) / unit); // récupère la position du click sur le canvas et on divise par l'unité de taille du canvas pour pouvoir récupérer l'index de la case en x
            const y = Math.floor((event.clientY - rect.top) / unit); // idem pour y
            const cell = this.game.map.getCell(x, y); // on récupère la cellule correspond au click

            const cells = this.game.findUserDirection(cell); // cela retourne les cellules que le joueur va traverser
            if (!cells) { // si le clic n'est pas sur une cellule de déplacement possible
                this.game.player.speak("Négatif, je ne peux pas aller ici !");
                return; // on arrête la fonction et on permet à l'utilisateur de cliquer sur une autre cellule 
            }
            this.game.onUserMoveChoice(cells); // cela va déplacer le joueur
        })
    }

    initHoverListener() {
        $(window.vue.canvas).mousemove(throttle((event) => { // on crée un évènement qui permet de récupérer les clicks sur le canvas 

            const rect = window.vue.canvas.getBoundingClientRect(); // récupère la position du canvas à l'écran
            const unit = window.vue.unit;
            const x = Math.floor((event.clientX - rect.left) / unit); // récupère la position du click sur le canvas et on divise par l'unité de taille du canvas pour pouvoir récupérer l'index de la case en x
            const y = Math.floor((event.clientY - rect.top) / unit); // idem pour y
            const cell = this.game.map.getCell(x, y); // on récupère la cellule correspond au click
            if (cell == this.hoverCell) {
                return;
            }
            this.hoverCell = cell;
            cell.drawLegend();
        }, 100))
    }

    initAttackListener() {
        $('.attack').click(() => { // on créé un listener au clic
            const killed = this.game.player.attack(this.game.enemy); // on attaque l'ennemi 
            if (killed) { // s'il est tué
                this.game.enemykilled(this.game.enemy); // le jeu renverra le nom du gagnant
                return;
            }
            window.vue.removeBattleMode(); // on enlève le mode bataille de l'affichage
            this.game.play(this.game.tour + 1) // nouveau tour de jeu
        })

    }

    initDefendListener() {
        $('.defend').click(() => { // on créé un listener au clic
                this.game.player.defend(); // on se défend
                window.vue.removeBattleMode(); // on enlève le mode bataille
                this.game.play(this.game.tour + 1) // nouveau tour de jeu
        })
    }

    initResizeListener() { // permet de redimensionner le canvas quand on redimensionne la fenêtre
        $(window).resize(throttle(() => { // utilisation de throttle pour ne pas effectuer le redimensionnement trop rapidement
            this.game.vue.calculateUnit(this.game.map.width, this.game.map.height); // on recalcule l'unité de dimension
            this.game.draw(); // on rafraichit l'affichage
        }, 100))
    }
}