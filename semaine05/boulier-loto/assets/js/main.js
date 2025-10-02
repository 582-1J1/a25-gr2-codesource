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
    // On veut dessiner 5 boules aléatoires (parmi les 10) dans le 
    // canvas.

    // Essai 1 : "Tirage avec remise" (donc répétition possible --->>> ne simule 
    // pas correctement un tirage de loterie)
    /*
    for(let i=0; i<5; i++) {
        let nNombreAlea = Math.floor(Math.random()*10) + 1;
        oBoule.src = "assets/images/boule_" + nNombreAlea + ".png";
        oCtx.drawImage(oBoule, i*200, 100, 100, 100);
    }
    */
    // Essai 2 : "Tirage sans remise" (donc pas de répétition !!!)
    // Mémoire des numéros distincts qui ont été tirés
    let sNumerosTires = ""; // ça va ressembler à ça : "7/2/9/10/"
    let nNombreBoulesChoisies = 0; // initialement 1, puis augmente par 1 chaque fois qu'on retient une autre boule
    let nNombreRepetitions = 0; // Utile pour comprendre combien d'itération de la boucle on va faire...
    while (nNombreBoulesChoisies < 7) {
        // Les deux lignes suivantes sont utiles seulement pour déboguer
        nNombreRepetitions++;
        console.log("Répétion exécutée");
        
        // On choisi un nombre aléatoire.
        let nNombreAlea = Math.floor(Math.random()*10) + 1;

        // Si ce nombre n'a jamais été tiré alors : 
        //  i) On l'ajoute (concaténer) à sNumerosTires
        //  ii) On assigne l'image correspondante à l'objet oBoule
        //  iii) On dessine l'objet oBoule dans le canvas
        //  iv) On incrémente (on ajoute 1) nNombreBoulesChoisies        
        if(sNumerosTires.indexOf(nNombreAlea + "/")==-1) {
            // i) On ajoute à la chaine qui mémorise les numéros retenus
            sNumerosTires = sNumerosTires + nNombreAlea + "/";
            // Ou, de façon plus courte : 
            // sNumerosTires += nNombreAlea + "/";
            // ii) On charge l'url de l'image
            oBoule.src = "assets/images/boule_" + nNombreAlea + ".png";
            // iii) On dessine l'image dans le canvas
            oCtx.drawImage(oBoule, nNombreBoulesChoisies*100, 100, 100, 100);
            // iv) On incrémente le nombre de boules déjà choisies (retenues)
            // TRÈS IMPORTANT car c'est ce qui permettra à la boucle de se 
            // terminer !!!
            nNombreBoulesChoisies = nNombreBoulesChoisies + 1;
            // Ou de façon plus courte : 
            // nNombreBoulesChoisies++;
            // nNombreBoulesChoisies += 1;
        }
    }
    // Juste pour déboguer (affiche le nombre d'itérations de la boucle)
    console.log("Nombre de répétitions : " + nNombreRepetitions);
}

// On attend le chargement complet de la page avant d'appeler la fonction
// qui permet de dessiner les images dans le canvas.
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


