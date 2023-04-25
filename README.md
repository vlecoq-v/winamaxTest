# winamaxTest

Merci pour le test technique je l'ai trouvé clair et très intéressant !

## Lancement du projet

### Lancement du projet backend

Le projet dispose pour ses composantes backend d'un Makefile. La liste des commandes est accessible avec la commande `make`.

Par exemple on peut lancer le projet avec `make docker.build docker.logs`

#### Scaling des workers et script_launch

Le scaling des worker dépend de la variable d'environnement instances.

le script `scripts/script_launch.js` lancé depuis la racine permet donc de lancer x instances du worker:

`
cd scripts
npm install
cd ..
node scripts/script_launch.js --instances 5
`

### lancement du projet front end

le front end se lance séparemment en téléchargeant et les dépendances et en lancant le projet:

```
cd client
npm install
npm start
```

## difficultés rencontrées:

J'ai globalement rencontré des difficultés à respecter la consigne des 4 heures et ai passé entre 6 et 7 heures sur le projet.
C'est notamment la prise en main de React que je n'avais pas touché depuis longtems et la mise en place des différents services et de socketIo qui m'ont retardé.  

1. socket dans le front - RESOLVED: 
comment initialisé une seule fois le listener et éviter de recevoir multiple fois les events 

2. variable count dans le front - UNRESOLVED:
la variable count du front devrait faire partie du state react mais je n'ai pas réussi à calibrer les use Effect pour éviter qu'elle ne trigger des re-render
accessoirement l'affichage d'un message plus claire avec le state React avant qu'une commande ne soit lancée et lorsque la commande précédente et traitée m'a posé problème.

3. validation de données - UNRESOLVED:
uniformisation de la validation des données via express validator entre les endpoints socket et http

4. script stress test - NO TIME:
je n'ai pas eu le temps de rendre un stress test, les validations ont été faites en utilisant le client pour valider les données du back

5. dockerisation du front - NO TIME:
sachang qu'un front end est rarement dockerisé en local je n'ai pas priorisé la dockerisation du client

6. la dockerisation vs workers - RESOLVED:
j'ai beaucoup hésité à dockeriser les différentes parties du backend et notamment les workers car je pensais que des process généré par un meme script js pourraient 
accomplir le meme travail.
J'ai opté pour la dockerisation pour une plus grande lisibilité et pour rendre un projet plus simple d'utilisation et hypothétiquement déployable.

7. stress test cache optimisation de la performance - NO TIME:

8. réflexion sur la scabilité de redis - NO TIME:
le projet à l'heure actuelle ne permet pas de scaler horizontalement redis

9. unt test - NO TIME: