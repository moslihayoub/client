# Guide de résolution - Erreur "The given origin is not allowed"

## Étape 1 : Identifier l'origine exacte

1. Ouvrez votre application dans le navigateur
2. Ouvrez la console du navigateur (F12)
3. Cliquez sur le bouton "Continuer avec Google"
4. Regardez dans la console, vous verrez :
   ```
   === Google OAuth Debug Info ===
   Current origin: http://localhost:XXXX
   ```
5. **Copiez cette origine exacte** (ex: `http://localhost:3000`)

## Étape 2 : Vérifier le Client ID

1. Dans la console du navigateur, vérifiez le Client ID affiché
2. Vérifiez que ce Client ID correspond à celui dans votre fichier `.env` :
   ```
   REACT_APP_GOOGLE_CLIENT_ID=253471697079-g2kp5gqnfgf47d15q7ml1lsr4fda2gkt.apps.googleusercontent.com
   ```
3. Si les Client IDs ne correspondent pas, mettez à jour votre `.env` avec le bon Client ID

## Étape 3 : Ajouter l'origine dans Google Cloud Console

1. Allez sur : https://console.cloud.google.com/apis/credentials
2. **Sélectionnez le bon projet** (celui qui contient votre Client ID)
3. Cliquez sur votre **OAuth 2.0 Client ID** (celui qui correspond au Client ID dans votre `.env`)
4. Cliquez sur l'icône **✏️ (modifier)** en haut
5. Dans **Authorized JavaScript origins**, ajoutez l'origine exacte que vous avez copiée à l'étape 1
   - Exemple : `http://localhost:3000`
   - **IMPORTANT** : Pas de slash à la fin, pas d'espaces
6. Dans **Authorized redirect URIs**, ajoutez la même origine
7. Cliquez sur **SAVE** (Enregistrer)

## Étape 4 : Vérifier les APIs activées

1. Allez sur : https://console.cloud.google.com/apis/library
2. Recherchez **Google+ API** ou **Identity Toolkit API**
3. Si ce n'est pas activé, cliquez dessus et activez-le
4. Attendez 2-3 minutes

## Étape 5 : Vérifier l'écran de consentement

1. Allez sur : https://console.cloud.google.com/apis/credentials/consent
2. Vérifiez que l'écran de consentement est configuré
3. Si en mode "Testing", ajoutez votre email dans "Test users"
4. Si nécessaire, publiez l'écran de consentement

## Étape 6 : Attendre et tester

1. **Attendez 2-3 minutes** après avoir sauvegardé les modifications
2. **Rafraîchissez complètement** la page de votre application (Ctrl+F5 ou Cmd+Shift+R)
3. **Réessayez** de cliquer sur "Continuer avec Google"

## Checklist finale

- [ ] L'origine exacte (visible dans la console) est dans "Authorized JavaScript origins"
- [ ] Le Client ID dans `.env` correspond exactement à celui dans Google Cloud Console
- [ ] Google+ API ou Identity Toolkit API est activée
- [ ] L'écran de consentement OAuth est configuré
- [ ] Vous avez attendu 2-3 minutes après les modifications
- [ ] Vous avez rafraîchi la page (Ctrl+F5)
- [ ] Vous avez redémarré le serveur React après avoir modifié `.env`

## Erreurs courantes

### "The given origin is not allowed"
→ L'origine dans la console n'est pas dans "Authorized JavaScript origins"
→ Solution : Ajoutez l'origine exacte (copiez-collez depuis la console)

### "403 Forbidden"
→ Les APIs ne sont pas activées ou l'écran de consentement n'est pas configuré
→ Solution : Activez les APIs et configurez l'écran de consentement

### Le Client ID ne correspond pas
→ Le Client ID dans `.env` est différent de celui dans Google Cloud Console
→ Solution : Utilisez le même Client ID partout

## Support

Si le problème persiste après avoir suivi toutes ces étapes :
1. Vérifiez que vous utilisez le bon projet Google Cloud
2. Vérifiez que le Client ID est bien celui d'une "Web application" (pas Android/iOS)
3. Vérifiez qu'il n'y a pas d'espaces ou de caractères invisibles dans votre `.env`

