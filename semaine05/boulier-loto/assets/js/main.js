/**Boulier de loterie
 * @author Camille Semaan
 */

/** @type {HTMLCanvasElement} */
let oCanvas = document.querySelector("#scene");
let oCtx = oCanvas.getContext("2d");

// Chargement des images
// A) On crée un objet JS "image"
// B) On lui assigne l'URL relative du fichier image correspondant
let oBoule1 = new Image(); 
oBoule1.src = "assets/images/boule_1.png"; 
let oBoule2 = new Image(); 
oBoule2.src = "assets/images/boule_2.png"; 
let oBoule3 = new Image(); 
oBoule3.src = "assets/images/boule_3.png"; 
let oBoule4 = new Image(); 
oBoule4.src = "assets/images/boule_4.png"; 
let oBoule5 = new Image(); 
oBoule5.src = "assets/images/boule_5.png"; 
let oBoule6 = new Image(); 
oBoule6.src = "assets/images/boule_6.png"; 
let oBoule7 = new Image(); 
oBoule7.src = "assets/images/boule_7.png"; 
let oBoule8 = new Image(); 
oBoule8.src = "assets/images/boule_8.png"; 
let oBoule9 = new Image(); 
oBoule9.src = "assets/images/boule_9.png"; 
let oBoule10 = new Image(); 
oBoule10.src = "assets/images/boule_10.png";

let oBoule = new Image();

function init() {
    // Maintenant, on va dessiner 3 boules aléatoires (parmi les 10) dans le canvas
    for(let i=0; i<3; i++) {
        let nNombreAlea = Math.floor(Math.random()*10) + 1;
        oBoule.src = "assets/images/boule_" + nNombreAlea + ".png";
        oCtx.drawImage(oBoule, 0, i*100, 100, 100);
    }
}

window.addEventListener("load", init);


// let nNbBoules = Number(prompt("Combien de boules aléatoires ?"));
// for(let i = 0; i < 6; i++) {
//     let nBouleAlea = Math.floor(Math.random()*49) + 1;
//     console.log("Boule #" + (i+1) + " : ", nBouleAlea);
    
// }


// Test choisir des boules aléatoires
// let nNombreAlea = Math.random()*49;
// console.log("Nombre aléatoire : ", nNombreAlea);
// console.log("Nombre entier aléatoire : ", Math.floor(nNombreAlea));
// console.log("Nombre entier aléatoire entre 1 et 49 : ", Math.floor(nNombreAlea) + 1);


