/**
 * Génère des nombres aléatoires avec ou sans remise.
 * @param {Number} nQuantite Nombre de nombres aléatoires demandés.
 * @param {Number} nValMin Valeur minimale.
 * @param {Number} nValMax Valeur maximale.
 * @param {Bolean} bDistincts (optionnel, par défaut false) True si tirage sans remise, false sinon.
 * @returns {String} Chaîne des choix de nombres concaténés avec le séparateur ;.
 */
function genererNombresAleatoires(nQuantite, nValMin, nValMax, bDistincts = false) {
    let sChoix = ";";
    // Validation de base
    if(nValMax < nValMin) {
        // On arrête la fonction et retourne un message d'erreur.
        return "La valeur maximale ne peut pas être plus petite que la valeur minimale.";
    }
    // Si nQuantite est plus grand que l'intervalle entre nValMin et nValMax et bDistincts est vrai.
    let nbAlea = 0;
    for(let i=0; i<nQuantite; i++) {
        nbAlea = Math.floor(Math.random()*(nValMax-nValMin+1)) + nValMin;
        if(bDistincts == true && sChoix.indexOf(`;${nbAlea};`) > -1) {
            i--;
        } else {
            sChoix += nbAlea + ";";
        }
    }
    // Valeur retournée par la fonction
    return sChoix;
}
