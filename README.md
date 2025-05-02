<div align="center">
  <img align="center" width="200" src="https://github.com/Souyyy/iTunesSeeker/blob/main/assets/icon.png" alt="iTunes Seeker"/>
</div>

<h3 align="center">iTunesSeeker</h3>
<p align="center">Application permettant de pouvoir rechercher des musiques/artistes sur l'API Itunes et de pouvoir intéragir avec.</p>

## Description

iTunesSeeker est une application mobile développée avec **React Native** et **Expo**. Elle permet à l'utilisateur de rechercher des musiques ou des artistes via l'API iTunes, de noter les morceaux sur 10, de les ajouter à ses favoris, et de retrouver les musiques qu'il a notées ou aimées.

Le projet repose sur une architecture propre utilisant **Redux** pour la gestion d’état global. 

## Fonctionnalités
- 🔍 Recherche de musiques / artistes (API iTunes)
 
- ⭐️ Ajout / suppression de favoris dans ça base

- 📝 Notation personnalisée (1 à 10)

- 📱 Détails artistes
  
- 🗂 Affichage des musiques notées

- 💾 Persistance des données

- 🌐 Navigation via onglets

## Prérequis
Avant de commencer, assurez-vous d'avoir une connexion haut débit et installé les outils suivants sur votre machine :

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Node.js** (version 14.0.0 ou supérieure recommandée) : [Lien du site de NodeJS](https://nodejs.org/en)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Git** : [Lien du site de Git](https://git-scm.com/downloads)

Vous pouvez vérifier leurs versions installées avec les commandes suivantes depuis votre terminal de commande :

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`node --version` -> Affiche votre version de Node.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`git --version` -> Affiche votre version de Git.


## Installation

### 1. Cloner le projet
   
Ouvrez votre terminal et exécutez la commande suivante pour cloner le dépôt :

```git clone https://github.com/Souyyy/iTunesSeeker/```

### 2. Accéder au répertoire
Naviguez dans le dossier du projet :

```cd iTunesSeeker```

### 3. Installer les dépendances
Installez toutes les dépendances nécessaires au projet :

```npm install```

Cette étape peut prendre quelques minutes selon votre connexion internet.

### 4. Lancer l'application

Démarrez le serveur de développement :

```npm run start```

### 5. Accéder à l'application

Ouvrez votre simulateur et lancé le projet.

## Technologies
Ce projet utilise plusieurs technologies modernes pour créer une expérience interactive:

<table align="center"> <tbody> <tr> <td align="center"> <img width="75" src="https://reactnative.dev/img/header_logo.svg" alt="React Native" /> <p>React Native</p> </td> <td align="center"> <img width="75" src="https://redux.js.org/img/redux.svg" alt="Redux" /> <p>Redux Toolkit</p> </td> </tr> </tbody> </table>

## APIs

L'application repose sur l'API iTunes Search pour récupérer les données musicales (titre, artiste, image, etc.).

<table align="center">
   <tr>
    <td>https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/</td>
 </tr>
</table>

## Amélioration possible
**Optimisation du code de "like" et de "notation" :**
  
Actuellement, le même code de gestion du "like" (favoris) et de la notation est utilisé dans HomeScreen et FavorisScreen. Une amélioration potentielle serait de le factoriser dans des composants réutilisables.

**Tri et filtre des favoris et notations :**

Ajouter la possibilité de trier ou filtrer les musiques par date d'ajout, note ou nom d'artiste pour une meilleure expérience utilisateur.

**Interface plus riche :**

Intégrer des animations et des feedbacks visuels lors de l'ajout d'un favori ou de la mise à jour d'une note.

## Licence
Ce programme est sous licence MIT.
