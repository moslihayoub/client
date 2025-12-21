# Configuration Google OAuth Provider

## Installation

Installez la dépendance `@react-oauth/google` :

```bash
npm install @react-oauth/google --legacy-peer-deps
```

## Configuration

### 1. Fichier `.env`

Assurez-vous que votre fichier `.env` contient :

```env
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

### 2. App.tsx

Le `GoogleOAuthProvider` a été ajouté dans `App.tsx` pour envelopper toute l'application.

### 3. Utilisation

Les pages `Login.tsx` et `Signup.tsx` utilisent maintenant :
- `useGoogleOneTapLogin` : Pour l'authentification automatique (One Tap)
- `useGoogleLogin` : Pour le bouton de connexion manuel

## Fonctionnalités

1. **One Tap Login** : S'affiche automatiquement si l'utilisateur a déjà une session Google
2. **Bouton de connexion** : Permet à l'utilisateur de se connecter manuellement avec Google

## Avantages

- Code simplifié et maintenu
- Gestion automatique des erreurs
- Support One Tap pour une meilleure UX
- Compatible avec le backend existant (utilise toujours l'ID token)

