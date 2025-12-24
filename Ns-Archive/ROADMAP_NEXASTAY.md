# 🗺️ Roadmap Stratégique : NexaStay AI "Super App"
**Établie par la Squad Architecture (ex-Autocash)**
**Tech Lead / Staff Engineer :** Archimède
**Date :** 09 Décembre 2025

---

## 🎯 Vision Globale
Transformer le prototype actuel en une **Super App** scalable, intégrant Marketplace, Réseau Social, et Assistant IA Vocal, tout en garantissant une performance "Premium" et une stabilité industrielle.

---

## 🗓️ Phase 1 : Rénovation & Fondations (Sprint 1-2)
*Objectif : Assainir la base de code et migrer vers une stack moderne pour stopper la dette technique.*

### 🛠 A. Migration Technique (Tech Lead)
- [x] **Migration vers Vite** : Remplacement de Create-React-App pour des builds instantanés.
- [x] **Architecture Dossiers** : Adoption du "Feature-First Architecture" (ex: `features/Social`, `features/Booking`).
- [ ] **Nettoyage Code** : Suppression des logs, typage strict TypeScript (no `any`), standardisation CSS (Tailwind).

### 🎨 B. UI/UX & Design System (Frontend Lead)
- [x] **Audit Design** : Remplacer les valeurs arbitraires (pixels) par les tokens du Design System Tailwind.
- [ ] **Composants UI** : Création d'une librairie interne `src/ui` (Boutons, Cards, Inputs standardisés).
- [ ] **SEO Fix** : Correction des balises `<h1>`, `lang`, et métadonnées pour le référencement naturel.

---

## ⚡ Phase 2 : Performance & Expérience (Sprint 3-4)
*Objectif : Fluidité absolue (60 FPS) et gestion intelligente des données.*

### 🚀 A. Core Performance
- [x] **TanStack Query** : Mise en place du cache serveur global (Initialisé dans Phase 1).
- [ ] **Optimisation Assets** : Conversion automatique des images en WebP/AVIF.
- [ ] **Code Splitting** : Implémentation du Lazy Loading sur les routes lourdes (Admin, Social).

### 📱 B. Mobile Experience
- [ ] **Virtualisation** : Intégration de `react-window` pour le Social Feed infini.
- [ ] **Animations GPU** : Optimisation des transitions pour ne pas bloquer le processeur mobile.

---

## 🤖 Phase 3 : IA & Social "Super App" (Sprint 5-6)
*Objectif : Intégration profonde de l'IA et des fonctionnalités communautaires.*

### 🧠 A. Intelligence Artificielle
- [ ] **VAD Local** : Détection de voix en local pour économiser la bande passante.
- [ ] **Contexte Social** : Connecter l'IA à la base de données des posts (RAG) pour des recommandations sociales.

### 👥 B. Modules Sociaux
- [ ] **Feed Social** : Posts, Likes, Commentaires avec "Optimistic Updates" (réaction instantanée).
- [ ] **Profils & Stories** : Gestion avancée des utilisateurs (inspiré d'Instagram/Airbnb).

---

## 🏢 Phase 4 : Écosystème B2B & Scale (Long Terme)
*Objectif : Ouvrir la plateforme aux Agences et préparer la montée en charge.*

### 💼 A. Marketplace Agences
- [ ] **Dashboard Agence** : Module séparé avec lazy-loading (Graphiques, Gestion Stocks).
- [ ] **RBAC (Rôles)** : Système de permissions strict (Admin, Agence, Voyageur).

### ☁️ B. Infrastructure & DevOps
- [ ] **Microservices** : Séparation progressive API Node.js (Core) et Python (IA).
- [ ] **CI/CD** : Pipelines de tests automatiques (comme fait sur Autocash).
