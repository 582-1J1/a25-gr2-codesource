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

// État/Boucle du jeu
let sEtat = "";
let nIdMinuterieBoucleJeu;

// Écran "Intro"
let nPosXTexte = -300;
let aAnglesCartes = [0, 0, 0, 0];
// Autres variables pour les angles de rotation de chaque cartes dans l'intro;

// Écran "Partie du jeu"
// Drapeau pour indiquer si le tirage initial a eu lieu ou pas
let bTirageInitial = false;
// Drapeau pour déterminer quel action le joueur veut faire (il veut piocher ou rester)
let sActionJoueur = "";


// Objet complexe dans lequel on conserve toutes les propriétés des cartes des
// deux rôles (croupier et joueur).
let oCartesTirees = {
    joueur: {
        placement: {x: 250, y: 350},
        position: [],
        main: []
    },
    croupier: {
        placement: {x: 50, y: 50},
        position: [],
        main: []
    }
};

// Test : 
console.log("Placement en Y des cartes du croupier : ", 
    oCartesTirees.croupier
);

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

    // Tester l'état du jeu (intro, partie, ou fin ?)
    if(sEtat == "partie") {
        // Détecter le clic sur le bouton "Piocher"
        if(x>400 && x<550 && y>540 && y<580) {
            console.log("Bouton 'piocher' cliqué");
            sActionJoueur = "piocher";
            
        }
        else if(x>600 && x<750 && y>540 && y<580) {
            console.log("Bouton 'rester' cliqué");
        }
    }
});

/******************************************************************************/
/************************* FONCTIONS ******************************************/
/******************************************************************************/
function demarrer() {
    sEtat = "intro";
    nIdMinuterieBoucleJeu = setInterval(boucleJeu, 1000 / 60);
    console.log("Identifiant de la minuterie : ", nIdMinuterieBoucleJeu);
}

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

// Écran 1 : intro animée
function introJeu() {
    console.log("Dans introJeu...");

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
        oCtx.fillText("Appuyer sur une touche pour commencer le jeu.", oDimCanvas.centre, oDimCanvas.milieu + 50);

        // Arrêter la minuterie
        // clearInterval(nIdMinuterieBoucleJeu);

        animerRotationCarte(0, aImages[13], 25);
        animerRotationCarte(1, oImgCarteDos, -40, oDimCanvas.centre + 10, oDimCanvas.milieu + 50);
        animerRotationCarte(2, oImgCarteDos, -30, -250, 300);
        animerRotationCarte(3, aImages[9], 15, 900, 250);

        // Touches clavier
        // Gérer l'événement appuyer sur une touche
        // document.addEventListener("keypress", () => sEtat = "partie");
        // document.addEventListener("keypress", function() {
        //     sEtat = "partie"
        // });
        document.addEventListener("keypress", function (evt) {
            if (sEtat == "intro" && evt.code == "Space") {
                sEtat = "partie";
            }
        });
    }
}

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

// Écran 2 : partie de jeu.
function partieJeu() {
    console.log("Dans partieJeu...");
    // Image de fond (table du BlackJack)
    oCtx.drawImage(oImgTable, 0, 0, oDimCanvas.largeur, oDimCanvas.hauteur);

    // Les boutons "piocher" et "rester"
    dessinerBouton(400, 540, 150, 40, "#024802ff", "Piocher");
    dessinerBouton(600, 540, 150, 40, "#8f1803ff", "Rester");

    // Tirage initiale : une seule fois !!!!
    // 2 cartes pour le joueur et 2 cartes pour le croupier
    if(bTirageInitial==false) {
        tirerCarte("joueur", 0);
        tirerCarte("joueur", 1);
        tirerCarte("croupier", 0);
        tirerCarte("croupier", 1);
        bTirageInitial = true;
    }

    // Tirage successif : SI le joueur a fait une action ("piocher" ou "rester")
    if(sActionJoueur == "piocher") {
        sActionJoueur = "";
        // Tirer une nouvelle carte pour le joueur
        tirerCarte("joueur", 2)

    }

    // Déplacer les cartes (par animation)
    // Boucler sur les tableaux des "mains" des deux roles du jeu
    // Le joueur : 
    for(let i=0; i<oCartesTirees.joueur.main.length; i++) {
        deplacerCarte("joueur", i);
    }
    // Le croupier : 
    for(let i=0; i<oCartesTirees.croupier.main.length; i++) {
        deplacerCarte("croupier", i);
    }
    
}

function tirerCarte(sRole, nNumCarte) {
    // Choisir un nombre aléqtoire entre 1 et 13
    const nCarte = Math.floor(Math.random()*13) + 1;
    // Ajouter ce nombre dans la main du rôle indiqué dans sRole 
    // à la position nNumCarte
    oCartesTirees[sRole].main[nNumCarte] = nCarte;
    // Assigner des positions initiales pour l'animation de cette carte
    oCartesTirees[sRole].position[nNumCarte] = {x: 0, y: 0};
}

function deplacerCarte(sRole, nNumCarte) {
    let nCarte = oCartesTirees[sRole].main[nNumCarte];
    let oPosition = oCartesTirees[sRole].position[nNumCarte];
    let oPlacement = oCartesTirees[sRole].placement;

    // Dessiner l'image de la carte, mais attention : si c'est la deuxième
    // carte du croupier, alors dessiner une image de dos de carte.
    if(sRole=="croupier" && nNumCarte==1) {
        oCtx.drawImage(oImgCarteDos, oPosition.x, oPosition.y, 67, 100);
    }
    else {
        oCtx.drawImage(aImages[nCarte], oPosition.x, oPosition.y, 67, 100);
    }
    
    // Incrémenter les positions x et y pour l'animation par 5 
    // jusqu'à atteindre le placement final souhaité
    if(oPosition.x < oPlacement.x + 45*nNumCarte) {
        oPosition.x += 5;
    }
    if(oPosition.y < oPlacement.y) {
        oPosition.y += 5;
    }
}

// Écran 3 (et final) : affichage des résultats.
function finJeu() {
    console.log("Dans finJeu...");
    clearInterval(nIdMinuterieBoucleJeu);
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
function dessinerBouton(nPosX, nPosY, nLargeur = 100, nHauteur = 50, sFond = 'darkgrey', sTexte = 'Bouton') {
    oCtx.fillStyle = sFond;
    oCtx.fillRect(nPosX, nPosY, nLargeur, nHauteur, 10);
    oCtx.fillStyle = "#ffffff";
    oCtx.font = "20px Arial";
    oCtx.textBaseline = "middle";
    oCtx.textAlign = "center";
    oCtx.fillText(sTexte, nPosX + nLargeur / 2, nPosY + nHauteur / 2);
}