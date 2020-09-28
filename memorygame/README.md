# 420-W12-SU - Programmation Web 2

## Installation

Créer le repository vide (pas de README.md a la racine) **programmation-web-2** sur [bitbucket](https://bitbucket.org/) en utilisant le courriel de l'école.

Ajouter les droits en lecture pour votre professeur: martin.vachon@isi-mtl.com

Cloner votre repo dans le répertoire /vsc-workspace de facon a obtenir la structure suivante:

```
/vsc-workspace
    programmation-web/                  --> 420-D08-SU HTML / CSS
    programmation-web-1/                --> 420-W10-SU HTML5 / CSS3
    programmation-web-2/                --> 420-W11-SU JavaScript
    programmation-web-3/                --> 420-W12-SU PHP
    structure-logicielle/               --> 420-W13-SU JavaScript / NodeJs / React
```

***Ajouter la référence au cours:***

`git remote add upstream https://VOTRE NOM D'USAGER BITBUCKET@bitbucket.org/isiteachers/programmation-web-2_e20.git`

- Note 1: Votre nom d'usager bitbucket est visible en consultant votre profile (icone au bas gauche de l'écran)
- Note 2: Si la commande continent des erreurs, la prochaine opération (Importer le cours dans votre repository) ne fonctionnera pas. Pour corriger la situation: utiliser la commande: `git remote rm upstream` et re-exécuter la commande précédente sans erreur.

***Importer le cours dans votre repository:***

`git pull upstream master --allow-unrelated-histories`

## Installer les dépendances

Ouvrir un shell dans le répertoire /code

La première fois seulement vous devez installer les dépendances:

`npm install`

## Configuration pour Git

`git config --global user.name "FirstName LastName"`

`git config --global user.email "XXXXX@isi-mtl.com"`

## Ouvrir la documentation

Ouvrir un shell dans le répertoire /doc

La première fois seulement vous devez installer les dépendances:

`npm install`

Lancer le serveur et ouvrir la page de documentation:

`npm start`

Éteindre le serveur:

`ctrl-c`

## Utiliser le upstream (repository du professeur)

Importer les mises à jour du cours ou les nouveaux exercices:

`git pull upstream master`

