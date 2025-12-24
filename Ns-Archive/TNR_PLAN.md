# Plan de Test Non-Régression (TNR) - NexaStay AI
**Objectif** : Valider que le passage de CRA à Vite et la restructuration n'ont pas introduit de régressions sur les parcours critiques.

## 1. Parcours de Navigation Critique
- [ ] **Home Page** : Chargement correct, images visibles, navbar fonctionnelle.
- [ ] **Moteur de Recherche** : Saisie d'une destination, bouton recherche.
- [ ] **Liste de Résultats** : Affichage des "Smart Cards", filtres.
- [ ] **Page Détails** : Navigation vers un hôtel spécifique.

## 2. Intégrations Techniques (Vite Verification)
- [ ] **Cartographie (Leaflet)** :
    - [ ] La carte s'affiche dans la page détails.
    - [ ] Les marqueurs sont visibles.
    - [ ] Zoom/Déplacement fonctionnels.
- [ ] **Expérience 3D (Three.js)** :
    - [ ] Chargement du Visualiseur 3D (NexaVoice).
    - [ ] Animation des particules fluide (60 FPS approx).
    - [ ] Interaction microphone (demande de perm).
- [ ] **Animations Lottie** :
    - [ ] Feedback visuel "NexaVoice" dans le Design System.
    - [ ] Icônes animées fonctionnelles.

## 3. Performance & SEO
- [ ] **Temps de chargement** : < 2s pour le premier rendu.
- [ ] **Sémantique HTML** : H1 présent, balise lang="fr".

---
*Date du test : 23/12/2025*
*Testé par : Antigravity IA*
