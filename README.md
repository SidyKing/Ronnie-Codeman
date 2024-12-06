# Ronnie-Codeman
https://voituresuperrapide.pythonanywhere.com/

## **Dépendances**

### **Modules Python Utilisés**
1. **Flask** : Framework pour construire des applications web.
2. **Flask-CORS** : Gestion du partage des ressources entre origines (CORS).
3. **hashlib** : Fonctions de hachage pour la sécurité.
4. **datetime** : Génération et gestion des horodatages.
5. **pandas** : Manipulation des données pour les journaux et les tableaux de bord.

---

## **Structure des Fichiers**
### **Fichiers Principaux de l'Application**
- **app.py** : Fichier principal contenant le code de l'application Flask.
- **log.csv** : Journalise toutes les requêtes entrantes.
- **blacklist.csv** : Contient les IP bannies.
- **register.csv** : Stocke les données des utilisateurs enregistrés.
- **sql.txt** : Fichier utilisé pour détecter les tentatives d'injection SQL.
- **logged_in.csv** : Suivi des utilisateurs connectés.

### **Fichiers Frontend**
- **banned_dashboard.html** : Modèle pour afficher les informations des IP bannies.
- **meteo.html** : Modèle pour une page météo (exemple statique).
- **404.html** : Modèle pour la page d'erreur 404.

---

## **Routes de l'Application**

### **1. Middleware Global**
#### **Fonction : `log_and_check()`**
- **Description** : 
  Cette fonction est exécutée avant chaque requête pour :
  - Journaliser les détails de la requête (IP, User-Agent, timestamp, méthode, etc.).
  - Détecter des attaques spécifiques (force brute, énumération, DoS).
  - Ajouter une IP à la liste noire si nécessaire.

- **Détails** :
  - Journalisation dans `log.csv`.
  - Détection des attaques via les fonctions suivantes :
    - **`bruteforce_detection(ip)`** : Détecte les tentatives de force brute.
    - **`enumeration_detection(ip)`** : Détecte l’énumération des utilisateurs.
    - **`dos(csrf)`** : Détecte les attaques de type DoS via le CSRF.

---

### **2. Enregistrement d’Utilisateur**
#### **Route : `/register`**
- **Méthode HTTP** : `POST`
- **Description** : Permet aux utilisateurs de s’enregistrer.
- **Entrées attendues** (JSON) :
  - `username` : Nom d’utilisateur.
  - `password` : Mot de passe.
- **Processus** :
  1. Vérifie si des champs sont manquants ou si l’utilisateur existe déjà.
  2. Hache le mot de passe avec SHA-256.
  3. Génère un jeton CSRF.
  4. Stocke les informations dans `register.csv`.
  5. Retourne une réponse avec le jeton CSRF.
- **Code de retour** :
  - `200 OK` : Enregistrement réussi.
  - `400 Bad Request` : Champs manquants.
  - `409 Conflict` : L’utilisateur existe déjà.

---

### **3. Connexion d’Utilisateur**
#### **Route : `/login`**
- **Méthode HTTP** : `POST`
- **Description** : Permet aux utilisateurs de se connecter.
- **Entrées attendues** (JSON) :
  - `username` : Nom d’utilisateur.
  - `password` : Mot de passe.
- **Processus** :
  1. Vérifie les champs manquants.
  2. Vérifie si les informations sont valides dans `register.csv`.
  3. Génère un jeton CSRF en cas de connexion réussie.
  4. Retourne une réponse avec un indicateur d’administrateur si applicable.
- **Code de retour** :
  - `200 OK` : Connexion réussie.
  - `403 Forbidden` : Informations d’identification invalides ou utilisateur banni.
  - `400 Bad Request` : Champs manquants.

---

### **4. Tableau de Bord des IP Bannies**
#### **Route : `/banned_dashboard`**
- **Méthodes HTTP** : `GET`
- **Description** :
  Fournit un tableau de bord des IP blacklist avec :
  - Possiblité de bannissement sur l'utilisateur
  - Journaux associés à une IP spécifique.
- **Paramètres** :
  - `csrf` (obligatoire) : Jeton CSRF pour autoriser l’accès.
  - `searched_ip` (optionnel) : Filtrer les résultats pour une IP spécifique.
- **Processus** :
  1. Vérifie la validité du jeton CSRF.
  2. Lit les fichiers `blacklist.csv` et `log.csv`.
  3. Prépare les données pour l’affichage :
     - Distribution des types de bannissements.
     - Nombre de bannissements par IP.
     - Détails des journaux pour une IP recherchée.
  4. Retourne les données sous forme de tableau de bord HTML.
- **Code de retour** :
  - `200 OK` : Tableau de bord affiché.
  - `403 Forbidden` : Jeton CSRF invalide ou utilisateur banni.
  - `500 Internal Server Error` : Erreur de traitement des fichiers.

---

### **5. Page Météo**
#### **Route : `/meteo`**
- **Méthode HTTP** : `GET`
- **Description** : Retourne une page météo statique.

---

### **6. Gestion des Erreurs**
#### **Route : `@app.errorhandler(404)`**
- **Description** : Affiche une page HTML personnalisée pour les erreurs 404.

---

## **Fonctions Utilitaires**

### **1. Génération de Jeton CSRF**
- **Fonction : `hashcsrf(ip, useragent, timestamp)`**
- **Description** : Génère un jeton CSRF sécurisé à partir de l’IP, du User-Agent et du timestamp.

### **2. Hachage de Mot de Passe**
- **Fonction : `hash_password(password)`**
- **Description** : Hache les mots de passe avec SHA-256 pour un stockage sécurisé.

### **3. Lecture des Journaux**
- **Fonction : `read_logs()`**
- **Description** : Lit les entrées du fichier `log.csv`.

### **4. Détection des Attaques**
- **Fonctions :**
  - `bruteforce_detection(ip)` : Force brute.
  - `enumeration_detection(ip)` : Énumération.
  - `dos(csrf)` : DoS.
  - `detect_attack(timestamps, limit, timeframe)` : Détection générique basée sur un seuil et une période de temps.

### **5. Liste Noire**
- **Fonctions :**
  - `blacklist(ip, ban_type, date, useragent)` : Ajoute une IP à la liste noire.
  - `check_ban(ip)` : Vérifie si une IP est bannie.

---

## **Fichiers Importants**

### **1. `log.csv`**
- Contenu :
  - `IP`, `User Agent`, `Timestamp`, `Method`, `Path`, `CSRF Token`.

### **2. `blacklist.csv`**
- Contenu :
  - `IP`, `Ban Type`, `Timestamp`, `User Agent`.

### **3. `register.csv`**
- Contenu :
  - `Username`, `Hashed Password`, `CSRF Token`, `IP`, `User Agent`.

---

## **Sécurité**

1. **Protection contre les attaques** :
   - Détection et bannissement des attaques de force brute, énumération et DoS.
   - Filtrage des mots-clés pour détecter les injections SQL.
2. **Hachage des mots de passe** :
   - SHA-256 est utilisé pour sécuriser les mots de passe.
3. **Jetons CSRF** :
   - Générés pour chaque session et intégrés dans les journaux.

---
