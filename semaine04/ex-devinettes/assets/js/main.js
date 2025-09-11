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
let sQuestion2 = "Quel est l'animal le plus lent ? A. Girafe, B. Requin, C. Escargot";
let sQuestion3 = "Quel est l'animal qui peut vivre le plus longtemps ? A. Tortue, B. Chimpanzé, C. Chat";
let sQuestion4 = "Quel est l'animal le plus lourd ? A. Baleine bleue, B. Éléphant, C. Girafe";

// Réponses correctes
let sBonneReponse1 = "A";
let sBonneReponse2 = "C";
let sBonneReponse3 = "A";
let sBonneReponse4 = "A";

// Demander le nom du joueur
sNomJoueur = prompt("Allo, quel est ton nom ?");

/******* DÉBUT QUESTION 1 ***********/
let sReponse1 = prompt(sQuestion1);
// sReponse1 = sReponse1.toUpperCase();
// Si la réponse est bonne...
if (sReponse1 == "a" || sReponse1 == "A") {
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

/******* DÉBUT QUESTION 2 ***********/
let sReponse2 = prompt(sQuestion2);
// sReponse2 = sReponse2.toUpperCase();
// Si la réponse est bonne...
if (sReponse2 == "c" || sReponse2 == "C") {
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
/******* FIN QUESTION 2 ***********/

/******* DÉBUT QUESTION 3 ***********/
let sReponse3 = prompt(sQuestion3);
// sReponse3 = sReponse3.toUpperCase();
// Si la réponse est bonne...
if (sReponse3 == "a" || sReponse3 == "A") {
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
/******* FIN QUESTION 4 ***********/

/******* DÉBUT QUESTION 4 ***********/
let sReponse4 = prompt(sQuestion4);
// sReponse4 = sReponse4.toUpperCase();
// Si la réponse est bonne...
if (sReponse4 == "a" || sReponse4 == "A") {
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
/******* FIN QUESTION 4 ***********/

// Avertir le joueur que c'est terminé et lui indiquer son score.
alert("OK " + sNomJoueur + ", le jeu est terminé. Tu as " + nPoints + " point(s)");