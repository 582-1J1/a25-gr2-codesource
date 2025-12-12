/**
 * Jeu du BlackJack (simplifié)
 * @version 0.1.1
 */

/** @type {HTMLCanvasElement} */
const oCanvas = document.querySelector("#scene");
const oCtx = oCanvas.getContext("2d");
/******************************************************************************/
/************************* VARIABLES GLOBALES *********************************/
/******************************************************************************/
// Info générale
const oDimCanvas = {
    largeur: oCanvas.width,
    hauteur: oCanvas.height,
    centre: oCanvas.width / 2,
    milieu: oCanvas.height / 2
};

// i18n et L12n
// Exercice 3 : stockage des textes pour les différentes langues.
// Compléter l'objet avec les textes de tous les écrans du jeu et dans les 3 langues.
const oTextes = {
    fr: {
        titre: "B L A C K J A C K",
        intro: "Appuyer sur une touche pour commencer le jeu.",
        btnPiocher: "Piocher",
        btnRester: "Rester",
        msgCrevé: "Vous avez crevé. Désolé ;-(",
        msgBlackjack: "BlackJack. Bravo !",
        msgGagné: "Vous avez gagné. Bravo !",
        msgEgal: "Partie égale. C'est kif-kif",
        msgPerdu: "Vous avez perdu. Désolé ;-(",
        msgCroupierCrevé: "Le croupier a crevé. Vous gagnez...",
        btnRejouer: "Rejouer"
    },
    en: {
        titre: "B L A C K J A C K",
        intro: "Press a key to start the game.",
        btnPiocher: "Hit",
        btnRester: "Stand",
        msgCrevé: "You busted. Sorry ;-(",
        msgBlackjack: "BlackJack. Great!",
        msgGagné: "You won. Great!",
        msgEgal: "Tie. It's a draw.",
        msgPerdu: "You lost. Sorry ;-(",
        msgCroupierCrevé: "Dealer busted. You win...",
        btnRejouer: "Play Again"
    },
    es: {
        titre: "B L A C K J A C K",
        intro: "Presione una tecla para comenzar el juego.",
        btnPiocher: "Pedir",
        btnRester: "Quedarse",
        msgCrevé: "Te pasaste. Lo siento ;-(",
        msgBlackjack: "BlackJack. ¡Bravo!",
        msgGagné: "Ganaste. ¡Bravo!",
        msgEgal: "Empate. Es un empate.",
        msgPerdu: "Perdiste. Lo siento ;-(",
        msgCroupierCrevé: "Crupier se pasó. ¡Ganas!...",
        btnRejouer: "Jugar de Nuevo"
    }
}

// La langue à utiliser par défaut (la langue active par défaut)
// Utiliser seulement les codes de langue standard à deux lettres : "fr", "en", etc.
// Voir : https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
let langue = "fr";


// Images
// Les cartes
let aImages = [];
for (let i = 1; i <= 13; i++) {
    aImages[i] = new Image();
    aImages[i].src = `assets/images/${i}.png`; // interpoler
    // aImages[i].src = 'assets/images/' + i + '.png'; // concaténer
}
// Dos d'une carte
const oImgCarteDos = new Image();
oImgCarteDos.src = "assets/images/dos.png";
// La table du jeu
const oImgTable = new Image();
oImgTable.src = "assets/images/table-bg.jpg";

// Sons
// Son ambiant à utiliser durant le déroulement du jeu
const oSonFoule = new Audio();
oSonFoule.src = "assets/sons/foule.mp3";
oSonFoule.volume = 0.3;
oSonFoule.loop = true;
// Son pour le tirage d'une carte
const oSonCarte = new Audio("assets/sons/carte.mp3");
oSonCarte.volume = 0.8;

// État/Boucle du jeu
let sEtat = "intro";
let nIdMinuterieBoucleJeu = null;
let nIdMinuterieResultat = null;

// Écran "Intro"
let nPosXTexte = -300;
let aAnglesCartes = [0, 0, 0, 0];
// Autres variables pour les angles de rotation de chaque cartes dans l'intro;

// Jetons du joueur
// On va supposer ici que c'est fixé à 100 mais dans un jeu réaliste vous pouvez 
// déterminer cette valeur dynamiquement.
let nJetonsJoueur = 100;
// Valeur de la mise pour chaque partie : on la fixe ici à 10 de la même façon
// pour simplifier notre prototype, mais dans un jeu réaliste, le joueur peut
// décider la valeur de la mise pour chaque partie selon les jetons disponibles.
let nMiseFixe = 10;

// Écran "Partie du jeu"
// Drapeau pour déterminer si joueur a gagné, perdu, ou égalisé
let bEtatResultat = null; 
// Drapeau pour indiquer si le tirage initial a eu lieu ou pas
let bTirageInitial = false;
// Drapeau pour déterminer quel action le joueur veut faire (il veut piocher ou rester)
let sActionJoueur = "";
// Drapeau pour indiquer si la carte est en déplacement ou pas
let bCarteEnDeplacement = false;


// Objet complexe dans lequel on conserve toutes les propriétés des cartes des
// deux rôles (croupier et joueur).
let oCartesTirees = {
    joueur: {
        placement: { x: 250, y: 350 },
        position: [],
        main: []
    },
    croupier: {
        placement: { x: 50, y: 50 },
        position: [],
        main: []
    }
};
// Numéros des cartes additionnelles tirées par le joueur et le croupier
let nNumCarteAdditionnelleJoueur = 0;
let nNumCarteAdditionnelleCroupier = 0;

// Valeurs des mains
let nTotalJoueur = 0;
let nTotalCroupier = 0;

/******************************************************************************/
/******************** GESTION DES ÉVENEMENTS **********************************/
/******************************************************************************/
// Chargement de la page.
window.addEventListener("load", demarrer);
// Clics dans le canvas
oCanvas.addEventListener("click", function (evt) {
    // Position du clic relative au canvas
    const x = evt.offsetX;
    const y = evt.offsetY;

    // Son de foule
    if (sEtat === "intro") {
        // On joue le son de foule
        oSonFoule.play();

        // Exercice 3 : Changement de langue
        // 1) Vérifier la position du clic pour chaque bouton de langue ici...
        for(let $langueCode in oTextes) {
            let nPosX = 50 + (Object.keys(oTextes).indexOf($langueCode) * 60);
            let nPosY = oDimCanvas.hauteur - 70;
            if (x > nPosX && x < nPosX + 40 && y > nPosY && y < nPosY + 40) {
                langue = $langueCode;
            }
        }        
    }

    // Tester l'état du jeu (intro, partie, ou fin ?)
    if (sEtat === "partie") {
        // Détecter le clic sur le bouton "Piocher"
        if (x > 400 && x < 550 && y > 540 && y < 580 && sActionJoueur != "rester") {
            sActionJoueur = "piocher";
        }
        else if (x > 600 && x < 750 && y > 540 && y < 580) { 
            sActionJoueur = "rester";
        }
    }

    if (sEtat === "fin") {
        if (x > 350 && x < 550 && y > 250 && y < 300) {
            // Rejouer
            // Donc : démarrer le jeu de nouveau.
            // Plusieurs solutions possibles (pas toutes équivalentes)
            // Solution 1 (la moins 'intelligente') : raffraîchir la page
            // Ce n'est pas la bonne solution ici, car veux garder en mémoire 
            // les gains/pertes du joueur. Et aussi, je ne veux pas retourner 
            // à l'écran d'intro...
            // window.location.reload();
            // Solution 2 (meilleure) : réinitialiser toutes les variables
            // globales à leurs valeurs initiales.
            reinitialiserMains();
            // ... puis redémarrer la boucle du jeu
            demarrer();
        }
    }
});

/******************************************************************************/
/************************* FONCTIONS ******************************************/
/******************************************************************************/

/**
 * Réinitialise les variables globales pour une nouvelle partie.
 * @return {void}
 */
function reinitialiserMains() {
    sEtat = "partie";
   
    bEtatResultat = null;
    bTirageInitial = false;
    sActionJoueur = "";
    bCarteEnDeplacement = false;
    oCartesTirees = {
        joueur: {
            placement: { x: 250, y: 350 },
            position: [],
            main: []
        },
        croupier: {
            placement: { x: 50, y: 50 },
            position: [],
            main: []
        }
    };
    nNumCarteAdditionnelleJoueur = 0;
    nNumCarteAdditionnelleCroupier = 0;

    nTotalJoueur = 0;
    nTotalCroupier = 0;
}

/**
 * Démarre la boucle principale du jeu.
 * @returns void;
 */
function demarrer() {
    nIdMinuterieBoucleJeu = setInterval(boucleJeu, 1000 / 60);
    
}

/**
 * Boucle principale du jeu.
 * @returns void;
 */
function boucleJeu() {
    oCtx.clearRect(0, 0, oDimCanvas.largeur, oDimCanvas.hauteur);
    if (sEtat == "intro") {
        introJeu();
    }
    else if (sEtat == "partie") {
        partieJeu();
    }
    else if (sEtat == "fin") {
        finJeu();
    }
}

/**
 * Écran 1 : intro du jeu.
 * @returns void;
 */
function introJeu() {
    oCtx.fillStyle = "black";
    oCtx.font = "60px Arial";
    oCtx.textAlign = "center";
    oCtx.textBaseline = "middle";
    oCtx.fillText("B L A C K J A C K", nPosXTexte, oDimCanvas.milieu);
    // Condition pour arrêter de modifier la position en X
    // Ajouter le pas jusqu'à atteindre la position souhaitée
    if (nPosXTexte < oDimCanvas.centre) {
        nPosXTexte += 5;
    }
    else {
        oCtx.font = "24px Arial";
        oCtx.fillText(oTextes[langue].intro,
            oDimCanvas.centre, oDimCanvas.milieu + 50);

        // Arrêter la minuterie
        // clearInterval(nIdMinuterieBoucleJeu);

        animerRotationCarte(0, aImages[13], 25);
        animerRotationCarte(1, oImgCarteDos, -40, oDimCanvas.centre + 10,
            oDimCanvas.milieu + 50);
        animerRotationCarte(2, oImgCarteDos, -30, -250, 300);
        animerRotationCarte(3, aImages[9], 15, 900, 250);

        // Touches clavier
        // Gérer l'événement appuyer sur une touche
        
        // Premier exemple : fonction fléchée et n'importe quelle touche.
        // document.addEventListener("keyup", () => sEtat = "partie");
        
        // Deuxième exemple : fonction anonyme et n'importe quelle touche.
        // document.addEventListener("keyup", function() {
        //     sEtat = "partie"
        // });

        // Troisième exemple : fonction anonyme et touche spécifique (espace).
        document.addEventListener("keyup", function (evt) {
            if (sEtat == "intro" && evt.code == "Space") {
                sEtat = "partie";
            }
        });

        afficherMenuLangues();
    }
}

/**
 * Affiche le menu de sélection des langues.
 * @returns void;
 */
function afficherMenuLangues() {
    // Exercice 3 : Dessiner les boutons de changement de langue
    // Il faut une autre fonction plus adaptée pour dessiner ces boutons
    // car ils vont avoir des couleurs de fond et de texte spécifiques à leurs
    // états (actif ou pas).
    // Pour l'instant, on utilise la fonction existante "dessinerBouton"
    // mais ce n'est pas optimal, donc si vous savez faire mieux, n'hésitez pas !
    for(let $langueCode in oTextes) {
        let nPosX = 50 + (Object.keys(oTextes).indexOf($langueCode) * 60);
        let nPosY = oDimCanvas.hauteur - 70;
        let sFond = ($langueCode === langue) ? "darkgreen" : "grey";
        let sTexte = $langueCode.toUpperCase();
        dessinerBouton(nPosX, nPosY, 40, 40, sFond, sTexte);
    }
}

/**
 * Animation de la rotation d'une carte.
 * @param {Number} nItem Numéro de la carte
 * @param {Number} nCarte Valeur de la carte
 * @param {Number} angleFinal Angle final de la rotation
 * @param {Number} nPosX Position en X de la carte
 * @param {Number} nPosY Position en Y de la carte
 */
function animerRotationCarte(nItem, nCarte, angleFinal, nPosX = 0, nPosY = 0) {
    oCtx.save();
    oCtx.rotate(aAnglesCartes[nItem] * Math.PI / 180);
    if (angleFinal > 0 && aAnglesCartes[nItem] < angleFinal) {
        aAnglesCartes[nItem] += 2;
    }
    else if (angleFinal < 0 && aAnglesCartes[nItem] > angleFinal) {
        aAnglesCartes[nItem] -= 2;
    }
    oCtx.drawImage(nCarte, nPosX, nPosY, 100, 150);
    oCtx.restore()
}

/**
 * Écran 2 : partie du jeu.
 * @returns void;
 */
function partieJeu() {
    
    // Image de fond (table du BlackJack)
    oCtx.drawImage(oImgTable, 0, 0, oDimCanvas.largeur, oDimCanvas.hauteur);

    // Dessiner les jetons disponibles du joueur
    oCtx.fillText(nJetonsJoueur, oDimCanvas.largeur-50, oDimCanvas.hauteur-40);

    // Les boutons "piocher" et "rester"
    dessinerBouton(400, 540, 150, 40, "#024802ff", oTextes[langue].btnPiocher);
    dessinerBouton(600, 540, 150, 40, "#8f1803ff", oTextes[langue].btnRester);

    // Tirage initiale : une seule fois !!!!
    // 2 cartes pour le joueur et 2 cartes pour le croupier
    if (bTirageInitial == false) {
        tirerCarte("joueur", 0);
        tirerCarte("joueur", 1);
        tirerCarte("croupier", 0);
        tirerCarte("croupier", 1);
        bTirageInitial = true;
    }

    // Tirage successif : SI le joueur a fait une action ("piocher" ou "rester")
    if (sActionJoueur == "piocher") {
        sActionJoueur = "";
        // Tirer une nouvelle carte pour le joueur
        // Déterminer son numéro (c'est le "length" du tableau "main")
        nNumCarteAdditionnelleJoueur = oCartesTirees.joueur.main.length;
        tirerCarte("joueur", nNumCarteAdditionnelleJoueur);
    }
    else if (sActionJoueur == "rester" && !bCarteEnDeplacement) {
        gererTourCroupier();
    }

    // Déplacer les cartes (par animation)
    // Boucler sur les tableaux des "mains" des deux roles du jeu
    // Le joueur : 
    for (let i = 0; i < oCartesTirees.joueur.main.length; i++) {
        deplacerCarte("joueur", i);
    }
    // Le croupier : 
    for (let i = 0; i < oCartesTirees.croupier.main.length; i++) {
        deplacerCarte("croupier", i);
    }
}

/**
 * Tirer une carte pour un rôle donné (joueur ou croupier)
 * @param {String} sRole Joueur ou Croupier
 * @param {Number} nNumCarte Numéro de la carte
 */
function tirerCarte(sRole, nNumCarte) {
    // Son pour le tirage de carte
    oSonCarte.play();

    // Choisir un nombre aléqtoire entre 1 et 13
    const nCarte = Math.floor(Math.random() * 13) + 1;
    // Ajouter ce nombre dans la main du rôle indiqué dans sRole 
    // à la position nNumCarte
    oCartesTirees[sRole].main[nNumCarte] = nCarte;
    // Assigner des positions initiales pour l'animation de cette carte
    oCartesTirees[sRole].position[nNumCarte] = { x: 0, y: 0 };

    // Mettre à jour la valeur des mains
    nTotalCroupier = calculerValeurMain(oCartesTirees.croupier.main);
    nTotalJoueur = calculerValeurMain(oCartesTirees.joueur.main);

    // Si le total du joueur est égal à 21 il doit "rester"
    if (nTotalJoueur == 21 && !bCarteEnDeplacement) {
        sActionJoueur = "rester";
    }
    else if (nTotalJoueur > 21 && !bCarteEnDeplacement) {
        sActionJoueur = "rester";
        sEtat = "fin";
    }
}

/**
 * Gère le tour du croupier.
 * @returns void;
 */
function gererTourCroupier() {
    // Le croupier tire des cartes tant que sa main vaut moins que 17
    if (nTotalCroupier < 17) {
        nNumCarteAdditionnelleCroupier = oCartesTirees.croupier.main.length;
        tirerCarte("croupier", nNumCarteAdditionnelleCroupier);
    }
    else {
        sEtat = "fin";
    }
}

/**
 * Calculer la valeur totale d'une main (somme des valeurs des cartes).
 * @param {Array} aTabCartes Tableau des cartes dans une main
 * @returns Number La somme des valeurs des cartes
 */
function calculerValeurMain(aTabCartes) {
    // Faire la somme des valeurs qui se trouvent dans le tableau aTabCartes
    let somme = 0;
    // On va utiliser 3 méthodes pour parcourir les valeurs dans le tableau
    // Méthode 1 : boucle traditionnel "for"
    // for(let i=0; i < aTabCartes.length; i++) {
    //     somme += calculerValeurCarte(aTabCartes[i]);
    // }

    // Méthode 2 : boucle "for...of" (code plus "expressif", et moins "impératif")
    // C'est la méthode choisie ici et que je préfère pour des débuts en JS.
    for (const carte of aTabCartes) {
        somme += calculerValeurCarte(carte);
    }

    // Méthode 3 : Méthode reduce() des tableaux JS (Array)
    // Bonus : chercher par vous même pour mieux comprendre ce code ;-)
    // somme = aTabCartes.reduce((prev, curr) => prev + calculerValeurCarte(curr), 0);

    return somme;
}

/**
 * Déplacer une carte pour un rôle donné (joueur ou croupier)
 * @param {String} sRole Joueur ou Croupier
 * @param {Number} nNumCarte Numéro de la carte
 */
function deplacerCarte(sRole, nNumCarte) {
    // On change la valeur du drapeau pour indiquer que la carte est en déplacement
    bCarteEnDeplacement = true;

    let nCarte = oCartesTirees[sRole].main[nNumCarte];
    let oPosition = oCartesTirees[sRole].position[nNumCarte];
    let oPlacement = oCartesTirees[sRole].placement;

    // Dessiner l'image de la carte, mais attention : si c'est la deuxième
    // carte du croupier, alors dessiner une image de dos de carte.
    if (sRole == "croupier" && nNumCarte == 1 && sActionJoueur != "rester") {
        oCtx.drawImage(oImgCarteDos, oPosition.x, oPosition.y, 67, 100);
    }
    else {
        oCtx.drawImage(aImages[nCarte], oPosition.x, oPosition.y, 67, 100);
    }

    // Incrémenter les positions x et y pour l'animation par 5 
    // jusqu'à atteindre le placement final souhaité
    if (oPosition.x < oPlacement.x + 45 * nNumCarte) {
        oPosition.x += 5;
    }
    if (oPosition.y < oPlacement.y) {
        oPosition.y += 5;
    }
    // Tester si le déplacement est complété
    if (oPosition.x >= oPlacement.x + 45 * nNumCarte
        && oPosition.y >= oPlacement.y) {
        bCarteEnDeplacement = false;
    }
}

/** Écran 3 : fin du jeu.
 * @returns void;
 */
function finJeu() {
    partieJeu();
    // Afficher résultat après un certain laps de temps
    if(!nIdMinuterieResultat) {
        nIdMinuterieResultat = setTimeout(afficherResultat, 1000);
    }
}

/** Afficher le résultat de la partie.
 * @returns void;
 */
function afficherResultat() {
    clearInterval(nIdMinuterieBoucleJeu);
    clearTimeout(nIdMinuterieResultat);
    nIdMinuterieResultat = null;
    // Afficher les totaux
    oCtx.fillStyle = "white";
    oCtx.font = "72px Arial";
    oCtx.fillText(nTotalCroupier, oDimCanvas.largeur - 100, 100);
    oCtx.fillText(nTotalJoueur, 100, oDimCanvas.hauteur - 200);

    // Afficher la détermination du gagnant
    oCtx.fillRect(175, 175, 550, 150);

    oCtx.font = "24px Stack Sans Notch";
    oCtx.fillStyle = "black";
    let sMessage = "";

    if (nTotalJoueur > 21) {
        sMessage = oTextes[langue].msgCrevé;
        if(bEtatResultat !== "fait") {
            bEtatResultat = false;
        }
        
    }
    else if (nTotalJoueur == 21) {
        sMessage = oTextes[langue].msgBlackjack;
        if(bEtatResultat !== "fait") {
            bEtatResultat = true;
        }
    }
    else if (nTotalJoueur > nTotalCroupier) {
        sMessage = oTextes[langue].msgGagné;
        if(bEtatResultat !== "fait") {
            bEtatResultat = true;
        }
    }
    else if (nTotalJoueur == nTotalCroupier) {
        sMessage = oTextes[langue].msgEgal;
        if(bEtatResultat !== "fait") {
            bEtatResultat = null;
        }
    }
    else if (nTotalCroupier <= 21 && nTotalJoueur < nTotalCroupier) {
        sMessage = oTextes[langue].msgPerdu;
        if(bEtatResultat !== "fait") {
            bEtatResultat = false;
        }
    }
    else {
        sMessage = oTextes[langue].msgCroupierCrevé;
        if(bEtatResultat !== "fait") {
            bEtatResultat = true;
        }
    }

    // Maintenant ajuster nJetonsJoueur selon la valeur de bEtatResultat
    if(bEtatResultat === true) {
        nJetonsJoueur += nMiseFixe;
        bEtatResultat = "fait";
    }
    else if(bEtatResultat === false) {
        nJetonsJoueur -= nMiseFixe;
        bEtatResultat = "fait";
    }
    else if(bEtatResultat === null) {
        bEtatResultat = "fait";
    }

    oCtx.textAlign = "center";
    oCtx.textBaseline = "middle";
    oCtx.fillText(sMessage, oDimCanvas.centre, 225);

    // Afficher le bouton "Rejouer"
    dessinerBouton(350, 250, 200, 50, "orange", oTextes[langue].btnRejouer);
}


/**
 * Calcule la valeur d'une carte (Maximum 10).
 * @param {Number} nCarte Carte dont on veut la valeur (1 à 13).
 * @returns {Number} Valeur de la carte (1 à 10).
 */
function calculerValeurCarte(nCarte) {
    return Math.min(nCarte, 10);
}

/**
 * Dessine un bouton d'action dans le canvas.
 * @param {Number} nPosX Position horizontal du début du bouton.
 * @param {Number} nPosY Position vertical du début du bouton.
 * @param {Number} nLargeur Largeur du bouton.
 * @param {Number} nHauteur Hauteur du bouton.
 * @param {String} sFond Couleur (nom, hex, etc.) du fond du bouton.
 * @param {String} sTexte Texte sur le bouton.
 * @returns void;
 */
function dessinerBouton(nPosX, nPosY, nLargeur = 100, nHauteur = 50,
    sFond = 'darkgrey', sTexte = 'Bouton') {
    oCtx.fillStyle = sFond;
    oCtx.fillRect(nPosX, nPosY, nLargeur, nHauteur, 10);
    oCtx.fillStyle = "#ffffff";
    oCtx.font = "20px Arial";
    oCtx.textBaseline = "middle";
    oCtx.textAlign = "center";
    oCtx.fillText(sTexte, nPosX + nLargeur / 2, nPosY + nHauteur / 2);
}