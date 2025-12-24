### 🤖 STRATÉGIE IA & LLM - NexaVoice
**Documenté par :** Archimède
**Version :** 1.0

---

## 1. Stack Technique
| Composant | Technologie | Rôle |
|:---:|:---:|:---|
| **Transcription (STT)** | **Google Gemini 2.0 Flash (Multimodal Live)** | Traitement temps réel audio -> texte. Capture l'intonation et le contexte immédiat. |
| **Cerveau (LLM)** | **Google Gemini 2.0 Flash** | Compréhension, décision et génération de réponse. Optimisé pour la latence (<500ms). |
| **Synthèse (TTS)** | **Google Gemini 2.0 Flash (Native)** | Voix naturelle générée directement par le modèle. |
| **Client Frontend** | **WebSocket API** | Communication bidirectionnelle streaming (Audio In / Audio Out). |

---

## 2. Architecture des Prompts (System Instructions)
Le succès de NexaVoice repose sur un "System Prompt" robuste injecté au démarrage de la session WebSocket.

### 🎭 Persona : "Nexa"
*   **Identité** : Assistante locale ("Bent l'blad"), experte mais chaleureuse.
*   **Langue** : Darija Marocain (Code-switching léger avec le Français pour les termes techniques).
*   **Ton** : Professionnel, empathique, concis.

### 📜 Règles de Langage (Exemple)
```
1. Pas d'arabe classique. Utilise le dialecte de Casa/Rabat.
2. Utilise "ghadi" pour le futur.
3. Sois bref. C'est une conversation orale.
```

---

## 3. Workflow de Données (RAG)
Pour que Nexa connaisse les appartements, nous utilisons le **Function Calling**.
1.  **Utilisateur** : "Je cherche une villa à Marrakech."
2.  **Gemini** : Détecte l'intention `search_property`.
3.  **Gemini -> Client** : Appelle la fonction `search({ location: 'Marrakech', type: 'villa' })`.
4.  **Client** : Interroge l'API Backend / Mock Data.
5.  **Client -> Gemini** : Renvoie les résultats (JSON).
6.  **Gemini** : "J'ai trouvé 3 villas magnifiques à la Palmeraie..."

---

## 4. Sécurité & Coûts
*   **Clé API** : Stockée server-side (ou proxy) pour la prod. En proto : `.env`.
*   **Rate Limits** : Gemini Flash est très permissif, mais attention aux sessions longues.
*   **Confidentialité** : Les flux audio ne sont pas stockés (traitement éphémère).
