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
// Ombre portée
oCtx.shadowColor = "yellow";
oCtx.shadowBlur = 30;
oCtx.beginPath();
oCtx.arc(0, 0, 90, 0, Math.PI);
oCtx.fill();


// Dessiner les rayons :
// Tracer un chemin en zigzag entre deux cercles et le remplir
// avec la même couleur que le soleil
oCtx.fillStyle = "yellow";
oCtx.beginPath();
oCtx.moveTo(90, 0);
oCtx.lineTo(110, 15);
oCtx.lineTo(85, 30);
oCtx.lineTo(105, 45);
oCtx.lineTo(70, 55);
oCtx.fill();


let sNom = "Test"; // prompt("Quel est votre nom ?");
oCtx.fillStyle = "black";
oCtx.font = "60px Courrier";
oCtx.fillText(sNom, nLargeur-200, 50);

// Ajouter une image (créer un objet image et lui associer le fichier 
// sauvegardé sur le disque)
let oSoleil = new Image(); // Constructeur (d'objets "images")
oSoleil.src = "assets/images/soleil-rayons.png";

// Dessiner l'image dans le canvas
oCtx.drawImage(0, 300);

