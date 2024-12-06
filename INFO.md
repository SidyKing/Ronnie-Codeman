
# Ronnie-Codeman
[Visiter l'application](https://voituresuperrapide.pythonanywhere.com/)

## Description
Ronnie-Codeman est une application web conçue pour sécuriser les systèmes en détectant, surveillant et bannissant les comportements malveillants. Elle offre un tableau de bord interactif pour visualiser les activités suspectes et gérer les utilisateurs bannis, avec des fonctionnalités avancées comme la détection d'attaques et le bannissement manuel.

---

## Fonctionnalités Principales
### 1. Gestion des utilisateurs
- **Enregistrement** : Les utilisateurs peuvent créer un compte sécurisé avec un mot de passe haché (SHA-256).
- **Connexion** : Les utilisateurs enregistrés peuvent se connecter avec des jetons CSRF pour sécuriser leurs sessions.

### 2. Détection et prévention des attaques
- **Force brute** : Détecte et bannit les IP après plusieurs tentatives de connexion infructueuses.
- **Énumération des utilisateurs** : Bloque les tentatives d'exploration des comptes.
- **DoS (Déni de Service)** : Détecte les requêtes excessives provenant de la même source.
- **Injection SQL** : Vérifie les entrées pour bloquer les tentatives d'injection SQL.

### 3. Tableau de bord des utilisateurs bannis
- Visualisation des IP bannies et des journaux associés.
- Graphiques interactifs :
  - Distribution des types de bannissement.
  - Classement des IP les plus bannies.
- Possibilité de bannir manuellement une IP en un clic.

### 4. Bannissement manuel
- Les administrateurs peuvent bannir une IP suspecte directement depuis le tableau de bord.

### 5. Journalisation
- Tous les événements sont enregistrés dans des fichiers CSV pour une analyse ultérieure :
  - `log.csv` : Détails de toutes les requêtes.
  - `blacklist.csv` : Liste des IP bannies et raisons associées.
  - `register.csv` : Détails des utilisateurs enregistrés.

---

## Structure du Projet

### Dossiers et fichiers principaux
- **app.py** : Contient les routes Flask et la logique de l'application.
- **templates/** : Fichiers HTML pour les pages de l'application :
  - `banned_dashboard.html` : Tableau de bord interactif.
  - `honeypot.html` : Page affichée aux utilisateurs bannis.
  - `404.html` : Page d'erreur personnalisée.
- **static/** : Fichiers CSS et JavaScript pour améliorer l'interface utilisateur.
- **log.csv** : Journal des requêtes.
- **blacklist.csv** : Liste des IP bannies.
- **register.csv** : Utilisateurs enregistrés.

---

## Installation

### Prérequis
1. **Python 3.8+**
2. Les modules Python suivants :
   - Flask
   - Flask-CORS
   - pandas

### Étapes d'installation
1. Clonez le dépôt :
   \`\`\`bash
   git clone https://github.com/voituresuperrapide/ronnie-codeman.git
   cd ronnie-codeman
   \`\`\`

2. Installez les dépendances Python :
   \`\`\`bash
   pip install -r requirements.txt
   \`\`\`

3. Lancez le serveur :
   \`\`\`bash
   python app.py
   \`\`\`

4. Accédez à l'application à [http://127.0.0.1:5000](http://127.0.0.1:5000).

---

## Utilisation

### 1. Enregistrement et connexion
- Rendez-vous sur `/register` pour créer un compte.
- Connectez-vous via `/login` pour accéder à vos données.

### 2. Tableau de bord des bannissements
- Connectez-vous en tant qu'administrateur pour accéder au tableau de bord `/banned_dashboard`.
- Visualisez les IP bannies et leurs journaux.
- Cliquez sur "Ban" pour bannir manuellement une IP.

### 3. Fonctionnalités de détection d'attaques
- Les attaques détectées incluent : force brute, énumération, DoS et injections SQL.
- Les IP identifiées comme malveillantes sont automatiquement bannies et ajoutées à `blacklist.csv`.

---

## Routes Principales

### 1. **Middleware Global**
- Journalise toutes les requêtes entrantes dans `log.csv`.
- Vérifie les IP bannies.
- Détecte les attaques (force brute, énumération, DoS).

### 2. **Enregistrement d'utilisateur** (`/register`)
- **Méthode :** `POST`
- **Entrées :**
  - `username`
  - `password`
- **Sortie :** Jeton CSRF et confirmation d'inscription.

### 3. **Connexion utilisateur** (`/login`)
- **Méthode :** `POST`
- **Entrées :**
  - `username`
  - `password`
- **Sortie :** Jeton CSRF et confirmation de connexion.

### 4. **Tableau de bord des IP bannies** (`/banned_dashboard`)
- **Méthodes :** `GET`, `POST`
- **Fonctionnalités :**
  - Visualisation des IP bannies.
  - Recherche par IP spécifique.
  - Bannissement manuel via un bouton "Ban".

### 5. **Bannissement manuel** (`/ban_user`)
- **Méthode :** `POST`
- **Entrées :**
  - `ip` : IP à bannir.
  - `ban_type` : Raison du bannissement (facultatif).
  - `user_agent` : User-Agent associé (facultatif).
- **Sortie :** Confirmation que l'IP a été bannie.

---

## Sécurité

### 1. Prévention des attaques
- **Force brute :** Détecte et bannit les tentatives répétées de connexion.
- **DoS :** Surveille les requêtes massives pour détecter les comportements suspects.
- **Injection SQL :** Filtre les entrées malveillantes.

### 2. Hachage des mots de passe
- Utilisation de l'algorithme SHA-256 pour sécuriser les mots de passe.

### 3. Jetons CSRF
- Générés pour chaque session pour protéger contre les attaques CSRF.

---

## Graphiques et Statistiques
Le tableau de bord `/banned_dashboard` inclut :
1. **Blacklist Reasons (Camembert)** : Distribution des types de bannissements.
2. **Blacklist by IP (Barres)** : Classement des IP les plus bannies.

Ces graphiques sont générés avec [Chart.js](https://www.chartjs.org/).

---

## Exemples d'API

### **Enregistrement d'utilisateur**
\`\`\`bash
curl -X POST http://127.0.0.1:5000/register \
-H "Content-Type: application/json" \
-d '{"username": "user123", "password": "securepass"}'
\`\`\`

### **Connexion utilisateur**
\`\`\`bash
curl -X POST http://127.0.0.1:5000/login \
-H "Content-Type: application/json" \
-d '{"username": "user123", "password": "securepass"}'
\`\`\`

### **Bannissement manuel**
\`\`\`bash
curl -X POST http://127.0.0.1:5000/ban_user \
-H "Content-Type: application/json" \
-d '{"ip": "192.168.1.1", "ban_type": "Manual Ban"}'
\`\`\`

---
## Compte Administrateur
- **Nom d'utilisateur :** agf
- **Mot de passe :** agfagf

## IP utilisable pour recherche

- 194.167.154.35

## Contribution
Les contributions sont les bienvenues ! Créez une issue ou une pull request pour proposer des améliorations.

---

## Licence
Ce projet est sous licence MIT. Consultez le fichier `LICENSE` pour plus de détails.


