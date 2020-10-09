export class Vue {
    constructor(mapWidth, mapHeight) {
        const canvasContainer = document.getElementById("game"); // on récupère l'élément qui va contenir le canvas
        const pageWidth = canvasContainer.offsetWidth; // on récupère sa largeur
        const pageHeight = canvasContainer.offsetHeight; // on récupère sa hauteur

        this.unit = Math.floor(Math.min(pageWidth / mapWidth, pageHeight / mapHeight)); // on calcule l'unité de dimension en fonction de la taille du container et la taille de la map pour que le canvas prenne toute la page et soit entièrement visible

        this.canvas = document.getElementById("map"); // on récupère l'élément canvas
        this.canvas.width = this.unit * mapWidth; // on définit sa largeur
        this.canvas.height = this.unit * mapHeight; // on définit sa hauteur
        this.context = this.canvas.getContext("2d"); // on récupère son contexte

        window.vue = this; // on assigne la classe dans une variable globale pour qu'elle soit accessible dans tout le code
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); // on efface le canvas
    }

    setBattleMode() {
        document.getElementById('players').classList.add('battle') // on ajoute la classe battle à l'élément d'Id player

    }

    removeBattleMode() {
        document.getElementById('players').classList.remove('battle') // on l'enlève

    }

    displayWinner(id) {
        this.getPlayerDiv(id).classList.add('winner') // on ajoute la classe winner à l'élément correspondant au joueur
    }

    getPlayerDiv(id) {
        return document.getElementById(`p${id}`); // on récupère la div "player" dans le html correspondant au joueur actif
    }

    displayPlayers(players, tour) {
        for (let i = 0; i < players.length; i++) { // pour chaque joueur
            const player = players[i]; // on récupère l'instance 

            const playerDiv = this.getPlayerDiv(i); // on récupère la div correspondant à ce joueur
            if (i === tour % players.length) { // s'il est actif
                playerDiv.classList.add("active") // on ajoute la classe "active"
            } else { //sinon
                playerDiv.classList.remove("active") // on enlève la classe "active"
            }

            const nameEl = document.getElementById(`p${i}_name`) // élément qui va contenir le nom
            const healthEl = document.getElementById(`p${i}_health`) // élément qui va contenir les points de vie
            const weaponEl = document.getElementById(`p${i}_weapon`) // éléménet qui va contenir l'arme détenue par le joueur
            const powerEl = document.getElementById(`p${i}_power`) // élément qui va contenir la puissance de l'arme détenue

            nameEl.innerText = player.name; // on affiche le nom du joueur dans l'élément
            healthEl.style.width = `${player.health}%`; // on définit la taille de la barre de vie
            healthEl.innerText = player.health; // on écrit les points de vie du joueur
            weaponEl.innerText = player.weapon.name; // on affiche l'arme du joueur
            powerEl.innerText = player.weapon.power; // on affiche la puissance de l'arme du joueur
        }
    }


    draw(position, options) { // c'est pour gérer l'affichage d'une cellule

        const x = position.x * this.unit; // c'est la position de la cellule en pixels
        const y = position.y * this.unit; // idem

        this.context.beginPath(); // on dit à canvas qu'on démarre un tracé
        this.context.moveTo(x, y); // on se place à la position de la cellule
        this.context.lineTo(x + this.unit, y); // on trace un trait d'une unité vers la droite
        this.context.lineTo(x + this.unit, y + this.unit); // on trace un trait d'une unité vers le bas
        this.context.lineTo(x, y + this.unit) // on trace un trait d'une unité vers la gauche
        this.context.closePath(); // on ferme le tracé

        if (options.stroke) {
            this.context.strokeStyle = options.stroke; // couleur de la bordure
            this.context.stroke(); // on dessine la bordure
        }

        if (options.fill) {
            this.context.fillStyle = options.fill;
            this.context.fill(); // remplissage
        }

        if (options.image) {
            const img = new Image(); // création d'un objet Image 
            img.onload = () => { // action réalisée quand l'image est chargée
                this.context.drawImage(img, x, y, this.unit, this.unit); //affichage de l'image dans le canvas
            }
            img.src = options.image; // définition de l'url de l'image
        }

        if (options.sprite) {
            const img = new Image(); // création d'un objet Image
            img.onload = () => { // action réalisée quand l'image est chargée
                this.context.drawImage(img, options.sprite.x, options.sprite.y, options.sprite.width, options.sprite.height, x, y, this.unit, this.unit); // affichage du sprite dans le canvas
            }
            img.src = options.sprite.url;
        }
    }

    drawLegend(position, text) {
        const x = position.x * this.unit; // c'est la position de la cellule en pixels
        const y = position.y * this.unit; // idem
        this.context.font = "20px serif";
        this.context.fillText(text, x, y);
    }
}

