/**
 * Titre du jeu
 * @author Prénom Nom
 */

/** @type {HTMLCanvasElement} */
let oCanvas = document.querySelector("#scene");
let oCtx = oCanvas.getContext("2d");

// Valeurs simples
let nom = "Martin Rhéaume";
let age = 32;
let inscritTempsPlein = false;
let listeCours = null;

// Valeurs complexes
// Type 1 : Tableau (à utiliser pour stocker des valeurs similaires, c'est à 
// dire de même nature)
// Les valeurs sont "positionnées" !!!
let aNomsGroupe2 = ["Louis", "Jeanne", "Edgard", "Martin"];
// "Lecture" d'un élément du tableau
console.log("Dernier étudiant du tableau : ", aNomsGroupe2[3]);
console.log("Longueur du tableau des noms du groupe 2 : ", aNomsGroupe2.length);


let aBoulier = [
    1, 
    2, 
    3, 
    4, 
    5, 
    6, 
    7, 
    8, 
    9, 
    10, 
    11
];
// "Écriture" d'un élément de tableau
// Ajouter à la fin
aBoulier[11] = "Agatha";
aBoulier[1000] = ["un", "deux"];

console.log("Le boulier : ", aBoulier);
console.log("Longueur du boulier : ", aBoulier.length);
console.log("La valeur 'deux' dans le petit tableau : ", aBoulier[1000][1]);


let aJeuCarte = [];
// Remplir avec les cartes 1 à 13

/*
aJeuCarte[aJeuCarte.length] = 1; // length = 0
aJeuCarte[aJeuCarte.length] = 2; // length = 1
aJeuCarte[aJeuCarte.length] = 3; // length = 2
*/
for(let i = 0; i < 13; i++) {
    aJeuCarte[i] = i+1;
}
console.log("Le tableau aJeuCarte : ", aJeuCarte);

let aJeuCarte2 = [];
// Le remplir avec une boucle while (c'est à dire sans compteur !!)
while(aJeuCarte2.length < 13) {
    aJeuCarte2[aJeuCarte2.length] 
        = aJeuCarte2.length + 1;
}

console.log("aJeuCartes2 : ", aJeuCarte2);

/********************* OBJETS *********************/
// Type 2 : Objet (à utiliser pour stocker des valeurs de nature différentes)
// Les valeurs sont "étiquetées" !!!
let oUneEtudiante = {
    nom: "Émilie Lapointe",
    age: 19,
    listeCours: ["1j1", "1w1", "1m1"],
    ddn: new Date(2006, 2, 25),
    moyenne: 79.65
}
// Objet uneEtudiante
console.log("Objet représentant une étudiante : ", oUneEtudiante);


// Accéder en "lecture" aux valeurs dans l'objet
console.log("Age d'Émilie : ", oUneEtudiante.age);
console.log("Date de naissance : ", oUneEtudiante.ddn);

// Accéder aux objets avec la syntaxe de "tableau associatif"
console.log("Nom de l'étudiante (propriété) : ", oUneEtudiante.nom);
console.log("Nom de l'étudiante (étiquette) : ", oUneEtudiante["nom"]);

/********** Boucler sur les valeurs des tableaux *********/
for(let i= 0; i < aNomsGroupe2.length; i++) {
    oCtx.font = "36px Arial";
    oCtx.fillStyle = "black";
    oCtx.fillText(aNomsGroupe2[i], 100, 100*i+50);
}