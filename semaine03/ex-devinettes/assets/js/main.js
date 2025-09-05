// Commentaire de type JSDoc
/**
 * Jeu des devinettes
 * 
 * @author Camille Semaan
 * @version 0.1
 * @date 2025-09-05
 */

// Déclarer les variables du jeu
let nPoints = 0;
let sNomJoueur = "";

// Questions devinettes
let sQuestion1 = "Quel est l'animal le plus rapide ? A. Guépard, B. Éléphant, C. Fourmi";
let sQuestion2 = "Quel est l'animal le plus lent ? A. Tortue, B. Requin, C. Escargot";
let sQuestion3 = "Quel est l'animal qui peut vivre le plus longtemps ? A. Tortue, B. Chimpanzé, C. Chat";
let sQuestion4 = "Quel est l'animal le plus lourd ? A. Baleine bleue, B. Éléphant, C. Girafe";

// Demander le nom du joueur
sNomJoueur = prompt("Allo, quel est ton nom ?");

/******* DÉBUT QUESTION 1 ***********/
let sReponse1 = prompt(sQuestion1);
sReponse1 = sReponse1.toUpperCase();
// Si la réponse est bonne...
if (sReponse1 == "A") {
    // Bravo c'est la bonne réponse !
    // On incrémente les points par 1
    nPoints = nPoints + 1;

    // Concaténation avec l'opérateur +
    // alert("Bravo " + sNomJoueur + ", bonne réponse ! Tu as maintenant " + nPoints + " point(s).");

    // Interpolation avec les littéraux de gabarits (Template Literals)
    alert(`Bravo ${sNomJoueur}, bonne réponse 😀 Tu as maintenant ${nPoints} point(s) accumulé(s) !!!`);
}
// Si la réponse n'est pas la bonne
else {
    alert(`Désolé ${sNomJoueur}, mauvaise réponse 😔 Tu as ${nPoints} point(s).`);
}
/******* FIN QUESTION 1 ***********/