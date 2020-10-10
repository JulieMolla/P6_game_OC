import { Session } from "./session.js";

export class App {
    constructor() {
        this.initInterface();

        $("#start").click(this.startSession.bind(this)); // initialisation du listener sur le bouton start
        $("#replay").click(this.restart.bind(this)); // initialisation du listener sur le bouton replay
        $(".leave").click(this.endSession.bind(this)); // initialisation du listener sur les boutons quitter
    }

    initInterface() { // initialisation de l'interface
        $('main').hide(); // Masquer l'élément qui contient le canvas et les informations des joueurs
        $('.form-error').hide(); // On masque le message d'erreur du formulaire
        $('#session-form').show(); // Affiche le formulaire pour la saisie des joueurs
        $('#rulesModalClose').hide(); // On masque la croix pour empécher la fermeture de la modal
        $("#rulesModal").modal("show"); // Affiche la modal avec les règles et le formulaire
    }

    startSession() {
        // Récupère les noms des joueurs depuis le formulaire
        const player1 = $('#player1').val().trim(); // Utilise .trim() pour enlever les espaces au début et à la fin
        const player2 = $('#player2').val().trim();

        // Si un des joueurs n'a pas rempli son nom
        if (player1 === '' || player2 === '') {
            $('.form-error').show(); // on affiche le message d'erreur
            return;
        }

        this.session = new Session(); // On créé une nouvelle session
        this.session.setPlayers([player1, player2]); // On défini les joueurs
        this.session.startGame(); // On démarre une parti

        this.initPlayModeInterface(); // On passe l'interface en mode jeu
    }

    initPlayModeInterface() {
        $('#rulesModal').modal('hide'); // On ferme la modal
        $('#session-form').hide(); // On masque le formulaire dans la modal des règles
        $('#rulesModalClose').show(); // On affiche la crois pour pouvoir fermer la modal des règles
        $('main').show(); // On affiche le canvas et les informations de la partie
    }

    restart() {
        this.session.endGame(); // On arrête le jeu en cours
        this.session.startGame() // On démarre une nouvelle partie
    }
    
    endSession() {
        this.session.endGame(); // On arrête le jeu en cours
        this.initInterface();
    }
}