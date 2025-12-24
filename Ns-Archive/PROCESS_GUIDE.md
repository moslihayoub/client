# NexaStay Process Guide: Finishing a User Journey

To ensure a "solid process" as requested, every User Journey (feature or workflow) must meet the following criteria before being considered "Done".

## 1. Development Checklist (The "Build" Phase)
- [ ] **Code Implementation**: feature is fully coded according to requirements.
- [ ] **Type Safety**: No TypeScript errors (`npm run build` passes).
- [ ] **Linting**: No ESLint warnings or errors.
- **Clean Code**:
    - No `console.log` debugging statements.
    - No commented-out "dead code".
    - Imports are organized.

## 2. Testing & Validation (The "Quality" Phase)
- [ ] **Happy Path**: The main success scenario works perfectly (e.g., User can sign up).
- [ ] **Edge Cases**:
    - What if the API fails? (Error states/toasts shown?)
    - What if the input is invalid? (Form validation?)
    - What if the internet is slow? (Loading skeletons/spinners?)
- [ ] **Responsive Design**: Tested on:
    - [ ] Desktop (1920px)
    - [ ] Laptop (1366px)
    - [ ] Mobile (iPhone SE/12/14 Pro sizes)
- [ ] **Cross-Browser**: Chrome (focus), Safari (critical for iOS).

## 3. Deployment & Review (The "Release" Phase)
1. **Commit**: `git commit -m "feat(user-journey): description"`
2. **Push to Staging**: Push to `develop` branch.
3. **Verify on Staging**: Open the Vercel Preview/Staging URL.
    - Test the feature in the "Live" environment (HTTPS).
    - **NexaVoice Check**: If audio is involved, verify microphone permissions work on the HTTPS staging link.
4. **Client/Product Review**: Share Staging URL with stakeholders/client.
5. **Merge to Production**: Create PR `develop` -> `main` -> Merge.

---
**"Solid Process" Mantra:**
> "If it isn't tested on Staging, it doesn't exist."
