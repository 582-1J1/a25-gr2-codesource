# Exercice de pratique pour l'examen final

Ces quelques questions ne sont que des exemples que de types de questions qui seront posées à l'examen. Le nombre et le sujet des questions seront bien différents, mais le niveau de difficulté similaire.

> Utilisez le dépot de code du jeu de blackjack distribué ici pour répondre aux questions.

### Je ferais la solution en classe avec vous aujourd'hui dans 45 minutes.

## Question 1 - Ajoutez des sons de `gain`ou de `perte` lorsque le joueur gagne ou perd sa mise dans une partie
-   Les fichiers de sons sont fournis
-   Il faut créer et *charger* les sons avant de les utiliser
-   Faites jouer les sons aux emplacements adéquats

## Question 2 - Ajoutez les éléments d'interface adéquats pour permettre au joueur d'acheter des *jetons* avant de démarrer le jeu
-   Offrez trois choix cliquables dans l'écran d'intro : 50, 100, ou 200 jetons
-   Lorsque l'utilisateur clique un des boutons, affectez la valeur adéquate à la variable appropriée du code (`nJetonsJoueur` ;-))
-   Gérez le clic dans la section appropriée du code avec la condition correspondant l'écran d'intro
-   Remarquez que si l'utilisateur ne clique aucun bouton de jetons, la variable a déjà une valeur par défaut dans le code (100)

## Question 3 - Modifiez la fonction `reinitialiserMains` pour la rendre plus flexible avec un paramètre *optionnel*
-   Ajoutez un paramètre booléen nommé `retourIntro` qui a la valeur par défaut `false` (donc ce paramètre sera optionnel, puisque si aucune valeur n'est fournie au moment de l'appel de la fonction, il assumera la valeur par défaut)
-   Si la fonction est appelée avec l'argument `true`pour valeur de ce paramètre, alors la fonction devrait réinitialiser toutes les variables du jeu, incluant le nombre de jetons (quelle variable ? réfléchissez !) et l'état du jeu à leurs valeurs initiales
-   Si la fonction est appelée sans argument, elle fait uniquement le code qui est déjà fourni

## Question 4 - Gérez la fin des `jetons` du joueur
-   Question plus difficile où vous devez réfléchir aux étapes requises pour la solution
-   Si le joueur n'a plus de jetons, réinitialisez le jeu à l'état initial (`retoutIntro` --> `true`)

> **Remarquez que Vous n'avez pas la permission d'utiliser l'intelligence artificielle pour l'examen final. Tout soupçon d'utilisation de l'IA entraînera la note 0 sur l'examen.**