/**
 * Jeu de dés
 * @author Camille Semaan
 *
 */

// On ajoute un "typehint" pour obtenir l'aide contextuelle de VSCode
/** @type {HTMLCanvasElement} */
let oCanvas = document.querySelector("#jeudedes");
let oCtx = oCanvas.getContext("2d");

// a) On créé une image vide pour la face de dé 1
// b) On lui assigne la propriété "src" appropriée
let oImgDe1 = new Image();
oImgDe1.src = "assets/images/face-de1.png";
let oImgDe2 = new Image();
oImgDe2.src = "assets/images/face-de2.png";
let oImgDe3 = new Image();
oImgDe3.src = "assets/images/face-de3.png";
let oImgDe4 = new Image();
oImgDe4.src = "assets/images/face-de4.png";
let oImgDe5 = new Image();
oImgDe5.src = "assets/images/face-de5.png";
let oImgDe6 = new Image();
oImgDe6.src = "assets/images/face-de6.png";

// Image qui va recevoir les 6 faces de dés dans une boucle
let oImgDe = new Image(); // Constructeur d'image

// On dessine l'image dans le canvas.
// A) On doit s'assurer que le browser a fini de charger tous les fichiers
window.addEventListener("load", init);

// Fonction d'initialisation (après chargement complet de la page)
function init() {
    for(let i=0; i<6; i++) {
        oImgDe.src = "assets/images/face-de" + (i+1) + ".png";
        oCtx.drawImage(oImgDe, i*60, i*60, 100, 100);
    }
}

// Instruction de répétition (boucle)
// Plusieurs types en JS : for, while, for...of
let sNombreMax = prompt("Choisir un nombre");
console.log("Le nombre : ", sNombreMax);

// Type 1 : instruction de boucle FOR (POUR)
for(let i = 0; i < Number(sNombreMax); i++) {
    console.log("On est entré dans la boucle : ", i);
}

// Type 2 : instruction de boucle WHILE (TANT QUE)
let nombreRepetition = 0;
while (nombreRepetition>=0) {
    nombreRepetition = Number(prompt("Combien de nombres alétoires voulez-vous ?"));
    console.log("Le nombre est : ", nombreRepetition);
}


// Nombres aléatoires.
let sNombreAlea = Math.ceil(Math.random() * 6);
console.log("Nombre aléatoire généré : ", sNombreAlea);
