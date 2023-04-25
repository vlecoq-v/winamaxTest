# winamaxTest

## Lancement du projet backend

Le projet dispose pour ses composantes backend d'un Makefile. La liste des commandes est accessible avec la commande `make`.

Par exemple on peut lancer le projet avec `make docker.build docker.logs`

### Scaling des workers et script_launch

Le scaling des worker dépend de la variable d'environnement instances.

le script `scripts/script_launch.js` lancé depuis la racine permet donc de lancer x instances du worker:

`
cd scripts
npm install
cd ..
node scripts/script_launch.js --instances 5
`

## lancement du projet front end

le front end se lance séparemment en téléchargeant et les dépendances et en lancant le projet:

```
cd client
npm install
npm start
```

difficultés rencontrées:
  - gestion des sockets dans le front, race condition avec le state qui vérifie le total de count
  - pool de socket dans l'api ?
  - validation de données uniformisées entre les endpoint http et les endpoints socket