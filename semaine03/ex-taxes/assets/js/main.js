// Demander à l'utilisateur quelle est sa province (Québec ou Ontario)
let sProvince = prompt("Quelle est votre province ? (QC: Québec, ou ON: Ontario)");

// Variable qui contient la réponse de l'utilisateur TOUT EN MAJUSCULE
let sCodeProvince = sProvince.toUpperCase();

// Stocker les taux de taxes de vente de chaque province (Québec et Ontario)
const nTauxTaxeQc = 0.09975;
const nTauxTaxeOn = 0.08;

// Variable qui contiendra le taux de taxes provinciale à appliquer
let nTauxTaxe;

// Vérifier quelle province et affecter la bonne valeur du taux de taxe
if (sCodeProvince == "QC") {
    nTauxTaxe = nTauxTaxeQc;
}
if (sCodeProvince == "ON") {
    nTauxTaxe = nTauxTaxeOn;
}

let nMontantAvantTaxes = 100;
let nMontantTPS = nMontantAvantTaxes * 0.05;
// let nMontantAvecTPS = nMontantAvantTaxes + nMontantTPS;
let nMontantTVP = nMontantAvantTaxes * nTauxTaxe;
let nTotal = nMontantAvantTaxes + nMontantTPS + nMontantTVP;

// Méthode 1 : avec toFixed()
// let sTotalArrondi = nTotal.toFixed(2);
// let nTotalArrondi = Number(sTotalArrondi);

// Méthode 2 : avec Math.round()
let nTotalArrondi = Math.round(nTotal * 100) / 100;
let nFraisLivraison = 20;

// Affichage
console.log("Montant original : ", nMontantAvantTaxes);
console.log("Montant TPS : ", nMontantTPS);
console.log("Montant TVQ : ", nMontantTVP);
console.log("Montant total (pas arrondi) : ", nTotal);
console.log("Montant total arrondi : ", nTotalArrondi);
console.log("Montant total arrondi plus les frais de livraison : ", nTotalArrondi + nFraisLivraison);
