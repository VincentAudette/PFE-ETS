<div align="center">

<a href="https://pfeetsmtl.systems/"><img src="https://pfeetsmtl.systems/pfe-etsmtl-marque/fond-rouge-avec-description/logo-pfe-fond-rouge-avec-description.svg" width="192" height="192" alt="Logo"/></a>

# Plateforme de gestion des projets de fin d'études (PFE)

![Static Badge](https://img.shields.io/badge/Statut_du_projet-D%C3%A9veloppement-blue)

[Description](https://github.com/VincentAudette/PFE-ETS/blob/documentation/README.md#description) | [Fonctionnalités](https://github.com/VincentAudette/PFE-ETS/blob/documentation/README.md#fonctionnalit%C3%A9s) | [Utilisation](https://github.com/VincentAudette/PFE-ETS/blob/documentation/README.md#utilisation) | [Technologies utilisées](https://github.com/VincentAudette/PFE-ETS/blob/documentation/README.md#technologies-utilis%C3%A9es)

</div>

## Description

C'est une plateforme unifiée de gestion des projets de fin d'études (PFE) faits à l'École de Technologie Supérieure (ÉTS). Cette dernière permet de coordonner les acteurs qui interagissent dans le cadre d'un PFE ainsi que d'automatiser ces interactions.

Dans le cadre d'un PFE, différents acteurs doivent interagir entre eux :

- **Promoteur** : Entitée, souvent une compagnie ou un professeur, qui souhaite proposer un projet qui sera effectué par un groupe d'étudiants.
- **Étudiant** : Choisit et effectue un des projets proposés par un promoteur sous la supervision d'un professeur.
- **Professeur** : Surveille et évalue le travail effectué par le groupe d'étudiants sous sa charge.
- **Coordonnateur** : Rend disponible aux étudiants dans les différents projets de promoteurs et crée les équipes basées sur les choix des étudiants.

## Fonctionnalités

**Projets**

- Soumission de projet par un **promoteur**.
- Création automatique des descriptifs de projets. 
- Soumission de choix de projets par les **étudiants**.
- Gestion centralisée des soumissions de projets par un **coordonnateur**.*


**Équipes**

- Création des équipes automatiquement via un algorithme.
- Gestion centralisée des équipes par un **coordonnateur**.

**Gestion**

- Envoi de notifications par courriel à différentes étapes lorsqu'une attention est requise.*


<sub>* Fonctionnalité à compléter.</sub>

## Utilisation
```shell
# Installation des paquets nécessaires via pnmp
pnpm install

# Création des fichiers nécessaire à la BD
pnpm run db-generate

# Démarre l'exécution du projet
pnpm run dev
```

## Technologies utilisées
### pnpm  
[pnpm](https://pnpm.io/) est le gestionnaire de paquets utilisé pour ce projet. Il est plus rapide et plus efficient au niveau de l'espace disque que [npm](https://www.npmjs.com/). Il permet de pouvoir gérer les différents paquets à installation pour le projets via la commande `pnpm`. Les différents paquets nécessaires au projet sont disponibles dans le fichier [package.json](package.json) du projet. 

### Prisma  
[Prisma](https://www.prisma.io/) est la technologie utilisée afin de géré la base de données ainsi que les différentes tables du projet. Le schéma de la base de donnée est disponible dans le fichier [prisma.schema](packages/db/prisma/schema.prisma). Une fois le projet lancé, on peut visualiser les informations de la base de données avec Prisma via le port [5556](http://localhost:5556).

Authentification : [Clerk](https://clerk.com)  
Turbo  
tRPC  
Base de données : [PlanetScale](https://planetscale.com)  
Envoi de courriels: [SendGrid](https://sendgrid.com/)  
Hébergement de fichiers : [uploadthing](https://uploadthing.com/) 