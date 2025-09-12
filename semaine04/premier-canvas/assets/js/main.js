// Étape 1 : "Attraper" (saisir, obtenir une référence : à étudier plus tard en session 2 : DOM (Document Object Model)) le canvas
/** @type {HTMLCanvasElement} */
let oMonCanvas = document.querySelector("#mon-canvas");

// Étape 2 : spécifier et obtenir une référence au contexte de travail dans ce canvas (2D, WebGL, etc.)
let oContexte = oMonCanvas.getContext("2d");

// Étape 3 : on dessine des formes ou du texte, ou on affiche des images, etc.

// Exemple 1 : Dessiner une forme rectangulaire
oContexte.fillStyle = "rgba(0, 0, 190, 0.1)";
oContexte.strokeStyle = "#00FF00";
oContexte.lineWidth = 25;

oContexte.fillRect(50, 100, 200, 200);
oContexte.strokeRect(50, 100, 200, 200);

// Exemple 2 : Dessiner une forme circulaire
// On doit utiliser un "path" (chemin)
oContexte.beginPath();
oContexte.arc(50, 100, 30, 0, 2*Math.PI);
// On modifie l'épaisseur et couleur du trait
oContexte.strokeStyle = "#0000FF";
oContexte.lineWidth = 5;
oContexte.fillStyle = "#AB3500";
oContexte.stroke();
oContexte.fill();

// Un autre arc de cercle
oContexte.beginPath();
oContexte.arc(250, 300, 60, -Math.PI/2, Math.PI);
oContexte.strokeStyle="orange";
oContexte.fillStyle="magenta";
oContexte.stroke();
oContexte.fill();

// Exemple 3 : dessiner du texte.
oContexte.font = "italic 36px Arial";
oContexte.fillText("Allo Canvas", 50, 500);

