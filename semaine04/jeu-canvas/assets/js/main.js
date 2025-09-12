/** @type {HTMLCanvasElement} */
let oCanvas = document.querySelector("#maison");
let oCtx = oCanvas.getContext("2d");

// Chercher la largeur et hauteur du canvas en JS
let nLargeur = oCanvas.width;
let nHauteur = oCanvas.height;

// Dessiner le ciel
oCtx.fillStyle = "lightblue";
oCtx.fillRect(0, 0, nLargeur, nHauteur/2);

// Dessiner le sol
oCtx.fillStyle = "green";
oCtx.fillRect(0, nHauteur/2, nLargeur, nHauteur/2);

// Dessiner le soleil
oCtx.fillStyle = "yellow";
oCtx.beginPath();
oCtx.arc(0, 0, 90, 0, Math.PI);
oCtx.fill();

let sNom = prompt("Quel est votre nom ?");
oCtx.fillStyle = "black";
oCtx.font = "60px Courrier";
oCtx.fillText(sNom, nLargeur-200, 50);