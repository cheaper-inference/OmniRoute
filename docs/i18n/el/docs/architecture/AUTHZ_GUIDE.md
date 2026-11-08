# Authorization Guide (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Πηγή αλήθειας:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Τελευταία ενημέρωση:** 2026-09-22 — οι χώροι ονομάτων εμβέλειας παραπέμπουν στο MCP-SERVER.md

Το OmniRoute διαθέτει μια διοχέτευση εξουσιοδότησης με επίγνωση διαδρομών, η οποία ελέγχει κάθε αίτημα API. Η ταξινόμηση είναι **ντετερμινιστική** και **fail-closed** — οτιδήποτε δεν μπορεί να ταξινομηθεί καταλήγει ως `MANAGEMENT` και απαιτεί συνεδρία ή διακριτικό επιπέδου διαχείρισης. Αυτή η σελίδα εξηγεί το μοντέλο για μηχανικούς που συντηρούν διαδρομές ή σχεδιάζουν νέα τελικά σημεία.

![Διοχέτευση AuthZ (3 κλάσεις διαδρομών + αξιολόγηση πολιτικής)](../diagrams/exported/authz-pipeline.svg)

> Πηγή: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Δύο λειτουργίες ελέγχου ταυτότητας

### 1. Κλειδί API (Bearer)

Χρησιμοποιείται για τα συμβατά με OpenAI/Anthropic/Gemini API client και για ορισμένες διαδρομές διαχείρισης, όταν το κλειδί διαθέτει το scope `manage`.

```
Authorization: Bearer <api-key>
```

Επικυρώνεται από τις `isValidApiKey()` / `extractApiKey()` στο `src/sse/services/auth.ts` και γίνεται re-export μέσω του `src/shared/utils/apiAuth.ts`. Ο validator δέχεται επίσης τις μεταβλητές περιβάλλοντος `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` ως μόνιμα passthrough κλειδιά (issue #1350).

### 2. Session πίνακα ελέγχου (cookie auth_token)

Για σελίδες του πίνακα ελέγχου και λειτουργίες διαχειριστή.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Ένα cookie αποτελεί session μόνο όταν το JWT επαληθεύεται **και** περιέχει `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Κάθε
consumer του cookie (guard διαδρομών του πίνακα ελέγχου (`isDashboardSessionAuthenticated()`), ανανέωση του authz pipeline, handshake WebSocket, live
server, `/api/settings/require-login`, `/api/auth/status`) περνά από αυτό το helper.
Υπάρχουν και άλλα JWT υπογεγραμμένα με `JWT_SECRET` — το passthrough του Cursor CLI εκδίδει
tokens με `iss "omniroute" / aud "cursor-cli"` για κατόχους κλειδιών — και δεν είναι ποτέ sessions
(#13298).

Επαληθεύεται από το `isDashboardSessionAuthenticated()` στο `src/shared/utils/apiAuth.ts`. Το pipeline ανανεώνει αυτόματα το JWT όταν απομένουν λιγότερες από 7 ημέρες από τη διάρκεια ζωής των 30 ημερών.

Ένα session μπορεί επίσης να τερματιστεί πριν συμπληρώσει τις 30 ημέρες, επειδή κάθε issuer περνά από το `mintDashboardSessionToken` (με χρόνο έκδοσης `iat` και αναγνωριστικό `jti`) και ο verifier ελέγχει δύο ρυθμίσεις: `sessionsValidAfter`, η οποία ορίζεται από την αλλαγή κωδικού πρόσβασης, ώστε κάθε session που εκδόθηκε πριν από αυτήν να παύει να επαληθεύεται (το πρόγραμμα περιήγησης που άλλαξε τον κωδικό πρόσβασης λαμβάνει νέο cookie), και `revokedDashboardSessions`, στην οποία το `POST /api/auth/logout` προσθέτει το `jti` του session από το οποίο έγινε αποσύνδεση. Τα sessions που εκδόθηκαν από παλαιότερη έκδοση δεν περιέχουν κανένα από τα δύο claims και παραμένουν έγκυρα μέχρι την πρώτη αλλαγή κωδικού πρόσβασης. Αν δεν είναι δυνατή η ανάγνωση των ρυθμίσεων, το session δεν θεωρείται αξιόπιστο.

Ορισμένες διαδρομές διαχείρισης δέχονται **οποιαδήποτε** από τις δύο λειτουργίες: cookie Ή `Bearer <key>` όταν το κλειδί API διαθέτει το scope `manage` (ή `admin`). Αυτό επιτρέπει τη ροή εργασίας «διαμόρφωση μέσω κλήσεων API» που προστέθηκε στην v3.8.

#### Προαιρετική πύλη σύνδεσης OIDC (#6973)

Η σύνδεση διαχειριστή στον πίνακα ελέγχου υποστηρίζει επίσης μια **προαιρετική** ροή OIDC (OpenID Connect)
παράλληλα με την προεπιλεγμένη σύνδεση με κωδικό πρόσβασης — η σύνδεση με κωδικό πρόσβασης δεν καταργείται ποτέ, απλώς
συμπληρώνεται:

- Απενεργοποιημένο εκτός εάν `settings.oidcEnabled === true` **και** τα
  `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` έχουν ρυθμιστεί όλα (Ρυθμίσεις → Έλεγχος ταυτότητας).
  Το `GET /api/auth/oidc/login` επιστρέφει `400` διαφορετικά.
- Το `GET /api/auth/oidc/login` εντοπίζει το `authorization_endpoint` από το
  `/.well-known/openid-configuration` του issuer (επιστρέφει ως εναλλακτική στο
  `<issuer>/authorize`), δημιουργεί το URI ανακατεύθυνσης από το εισερχόμενο αίτημα
  (με υποστήριξη για `x-forwarded-proto`) και ανακατευθύνει στον IdP με ένα τυχαίο
  `state`, αποθηκευμένο σε cookie `oidc_state` με `httpOnly`.
- Το `GET /api/auth/oidc/callback` επικυρώνει το `state`, ανταλλάσσει τον κωδικό
  εξουσιοδότησης και επαληθεύει την υπογραφή του ID token μέσω του JWKS του issuer
  (του `jose` `createRemoteJWKSet`, αποθηκευμένου σε cache ανά URI JWKS), με ελέγχους
  `issuer`/`audience`. Η πρόσβαση στον πίνακα ελέγχου απαιτεί μη κενή λίστα
  `oidcAllowedSubjects`, πολιτική `oidcAdmissionClaim` ή και τα δύο. Η λίστα subject
  αντιστοιχίζει τα `sub` ή `email` μόνο όταν το `email_verified === true`. Η
  προαιρετική πολιτική claim δέχεται μια διαδρομή claim του ID token με διαχωρισμό
  τελειών (για παράδειγμα, `realm_access.roles`) και έναν πίνακα αποδεκτών τιμών·
  το επιλυμένο claim πρέπει να είναι πίνακας συμβολοσειρών που περιέχει τουλάχιστον
  μία αποδεκτή τιμή. Αν έχουν ρυθμιστεί και οι δύο πολιτικές, πρέπει να περάσουν
  και οι δύο. Τα ελλείποντα ή κακοσχηματισμένα claims αποτυγχάνουν με ασφαλή
  προεπιλογή και, χωρίς καμία από τις δύο πολιτικές, το callback αρνείται τη σύνδεση
  (`not_configured`). Οι υπάρχουσες ρυθμίσεις που βασίζονται μόνο στο subject
  συνεχίζουν χωρίς αλλαγές.
- Το Keycloak αντιστοιχίζει κανονικά τους ρόλους realm στα access tokens και όχι
  απαραίτητα στα ID tokens. Για να απαιτείται ο ρόλος realm `admin`, ρυθμίστε έναν
  protocol mapper για αυτόν τον client, ώστε να συμπεριλαμβάνει το
  `realm_access.roles` στο **ID token** του, και στη συνέχεια ορίστε το
  `oidcAdmissionClaim` σε `{ "path": "realm_access.roles", "values": ["admin"] }`.
  Ελέγξτε το πραγματικό claim του ID token για αυτόν τον client πριν ενεργοποιήσετε
  την πρόσβαση μόνο βάσει ρόλου· η εφαρμογή δεν διαβάζει ρόλους από access token.
  Η άρνηση token από την πλευρά του IdP μπορεί να λειτουργήσει συμπληρωματικά,
  αλλά δεν αντικαθιστά αυτόν τον έλεγχο από την πλευρά της εφαρμογής.
- Σε περίπτωση επιτυχίας, εκδίδει **ακριβώς το ίδιο** JWT `auth_token` διάρκειας
  30 ημερών που εκδίδει η σύνδεση με κωδικό πρόσβασης
  (`src/app/api/auth/login/route.ts`), επομένως το υπόλοιπο pipeline συνεδρίας του
  πίνακα ελέγχου (αυτόματη ανανέωση, σημαίες cookie) παραμένει αμετάβλητο —
  το OIDC αντικαθιστά μόνο τον τρόπο έκδοσης του cookie, όχι τα δικαιώματα που
  παρέχει. Οι αλλαγές στους ρόλους/ομάδες του IdP δεν ακυρώνουν τις υπάρχουσες
  συνεδρίες OmniRoute· η αποσύνδεση, η αλλαγή κωδικού πρόσβασης ή η λήξη της
  συνεδρίας εξακολουθούν να καθορίζουν τη διάρκειά τους.
- Κάθε ρύθμιση `oidc*` (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) βρίσκεται στο
  `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`): το
  `PATCH /api/settings` απαντά με `400 PASSWORD_REQUIRED` εκτός εάν το σώμα
  περιέχει τον κωδικό πρόσβασης διαχείρισης ως `currentPassword`
  (`401 PASSWORD_MISMATCH` όταν είναι λανθασμένος). Το
  `oidcDisablePasswordLogin` αρνείται τη σύνδεση με κωδικό πρόσβασης
  (`POST /api/auth/login`), αλλά διατηρεί το αποθηκευμένο hash κωδικού πρόσβασης,
  και η επανεξουσιοδότηση εξακολουθεί να ελέγχει το `currentPassword` έναντι
  αυτού.
- Τα `corsOrigins` και `bruteForceProtection` βρίσκονται επίσης στο
  `SECURITY_IMPACTING_SETTINGS_KEYS`: η χαλάρωση οποιουδήποτε από τα δύο
  αποδυναμώνει τις άμυνες σύνδεσης, επομένως απαιτούν την ίδια
  επανεξουσιοδότηση με `currentPassword` (η καρτέλα Security το ζητά) και η
  εισαγωγή JSON τα απορρίπτει.
- Κάθε κλειδί πολιτικής ασφαλείας — οι καταχωρίσεις του
  `SECURITY_IMPACTING_SETTINGS_KEYS`, κάθε κλειδί `oidc*` και η κατάσταση
  συνεδρίας του πίνακα ελέγχου — είναι **μόνο για τον operator** στο
  `PATCH /api/settings`: ένα API key με scope manage ή ένα access token `oma_`
  απορρίπτεται με `403`, ακόμη και όταν αποστέλλει το σωστό `currentPassword`, και
  η απόρριψη καταγράφεται ως `settings.update_failed` με
  `reason: OPERATOR_REQUIRED`
  (`requireOperatorCredential()` στο `src/lib/api/operatorCredential.ts`).
  Οι συνηθισμένες ρυθμίσεις (θέμα, προτιμήσεις εμφάνισης) παραμένουν εγγράψιμες
  από ένα κλειδί `manage` ή ένα access token `admin`. Κάθε μετάλλαξη του ίδιου του
  `/api/settings` (και του `/api/settings/require-login`) απαιτεί επίσης το scope
  access token `admin` (`ADMIN_MUTATION_EXACT_PATHS` στο
  `src/server/authz/accessScopes.ts`, με αντιστοίχιση ακριβούς διαδρομής)· το
  `GET` παραμένει `read`, ενώ οι άλλες υποδιαδρομές `/api/settings/*`
  (proxies, προεπιλογές combo, ψευδώνυμα μοντέλων, συμπίεση, εκκαθαρίσεις…)
  διατηρούν το scope `write`, το οποίο προκύπτει από τη μέθοδο.
- Το `POST /api/settings/import-json` παρακάμπτει αυτή την επανεξουσιοδότηση,
  επομένως απορρίπτει κάθε κλειδί στο `IMPORT_STRIPPED_SETTINGS_KEYS` (στο ίδιο
  αρχείο) πριν από την εγγραφή: τον κωδικό πρόσβασης και το `currentPassword`,
  κάθε καταχώριση του `SECURITY_IMPACTING_SETTINGS_KEYS` και την κατάσταση
  συνεδρίας του πίνακα ελέγχου (`sessionsValidAfter`,
  `revokedDashboardSessions`). Επομένως, η εισαγωγή ενός παλαιότερου αντιγράφου
  ασφαλείας δεν μπορεί να επαναφέρει μια συνεδρία που έχει ήδη τερματιστεί από
  αλλαγή κωδικού πρόσβασης ή αποσύνδεση.

#### Προαιρετική σύνδεση με έλεγχο ταυτότητας δύο παραγόντων TOTP (#16619)

Η εγγραφή γίνεται από τις Ρυθμίσεις → Ασφάλεια· παραμένει απενεργοποιημένη
μέχρι να την ενεργοποιήσει ο operator
(`src/server/auth/dashboardMfa.ts`).

- **Τι καλύπτει:** σύνδεση με κωδικό πρόσβασης (`POST /api/auth/login`, η οποία στη
  συνέχεια χρειάζεται `POST /api/auth/mfa/verify`) και `omniroute connect` (`POST /api/cli/connect`,
  το οποίο απορρίπτει ανταλλαγή μόνο με κωδικό πρόσβασης και λαμβάνει τον κωδικό ως
  `totp`).
- **Τι δεν καλύπτει:** η σύνδεση OIDC / SSO (`/api/auth/oidc/callback`) δεν
  ζητά το TOTP του OmniRoute. Βασίζεται στον δικό του δεύτερο παράγοντα του
  παρόχου ταυτότητας, επομένως επιβάλετε MFA στον IdP αν είναι ενεργοποιημένο το OIDC.
- **Ανάκτηση** (απώλεια συσκευής, δεν έχουν απομείνει κωδικοί ανάκτησης ή ένας παράγοντας δεν μπορεί πλέον
  να επαληθευτεί, για παράδειγμα μετά την αλλαγή του `STORAGE_ENCRYPTION_KEY`):
  1. Επανεκκινήστε τον διακομιστή με `OMNIROUTE_DISABLE_MFA=true`.
  2. Στον ίδιο τον κεντρικό υπολογιστή (ομότιμος loopback και `Host` loopback, όπως
     `http://localhost:20128`), συνδεθείτε με τον κωδικό πρόσβασης. Ο δεύτερος παράγοντας παραλείπεται
     μόνο για αυτή την προέλευση· κάθε άλλη προέλευση εξακολουθεί να χρειάζεται τον κωδικό.
  3. Στις Ρυθμίσεις → Ασφάλεια → Απενεργοποίηση, εισαγάγετε τον κωδικό πρόσβασης και αφήστε τον κωδικό
     κενό. Το `POST /api/auth/mfa/disable` αποδέχεται σώμα χωρίς `code` μόνο όσο η μεταβλητή
     είναι ορισμένη και το αίτημα προέρχεται από τον κεντρικό υπολογιστή· εξακολουθεί να απαιτεί
     τη συνεδρία του dashboard και τον τρέχοντα κωδικό πρόσβασης και καταγράφεται ως
     `auth.mfa.disabled` με `secondFactor: "recovery_switch"`.
  4. Αφαιρέστε τη ρύθμιση `OMNIROUTE_DISABLE_MFA`, επανεκκινήστε και εγγράψτε ξανά τον παράγοντα αν χρειάζεται.

## Κλάσεις διαδρομών

Το `src/server/authz/types.ts` ορίζει τρεις κλάσεις· κάθε διαδρομή που δεν μπορεί να ταξινομηθεί με βεβαιότητα επιστρέφει στην `MANAGEMENT`.

| Κλάση        | Περιγραφή                                                                                                                                                              | Απαιτούμενη αυθεντικοποίηση                                            |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `PUBLIC`     | Ρητά ασφαλείς διαδρομές — σύνδεση, αποσύνδεση, κατάσταση, αρχικοποίηση, υγεία, bootstrap του onboarding.                                                               | Καμία                                                                  |
| `CLIENT_API` | Endpoints εξυπηρέτησης μοντέλων — `/api/v1/*`, `/api/v1beta/*`, καθώς και τα ψευδώνυμα `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Κλειδί Bearer όταν είναι ενεργή η σημαία λειτουργίας `REQUIRE_API_KEY` |
| `MANAGEMENT` | Σελίδες πίνακα ελέγχου, ρυθμίσεις, providers, κλειδιά, endpoints διαχειριστή και διαγνωστικών.                                                                         | Συνεδρία πίνακα ελέγχου Ή Bearer με scope `manage`                     |

Ορισμένες ενέργειες της `MANAGEMENT` είναι **μόνο για τον διαχειριστή**: ένα κλειδί `manage` δεν αρκεί. Η εξαγωγή αποθηκευμένων διαπιστευτηρίων (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), η επαναφορά αντιγράφου πάνω στα ζωντανά δεδομένα (`POST /api/db-backups/import`, συμπεριλαμβανομένου του `dryRun=true`, `POST /api/db-backups` επαναφορά με βάση το id, `POST /api/settings/import-json`), η καταστροφή σημείων επαναφοράς (`DELETE /api/db-backups` για καθαρισμό και `PATCH /api/db-backups`, επειδή η διατήρηση που αποθηκεύει οδηγεί την αυτόματη διαγραφή μετά από κάθε αντίγραφο) απαιτούν συνεδρία πίνακα ελέγχου, το τοπικό υποκείμενο CLI ή απενεργοποιημένη σύνδεση. Η έκδοση ενός token συγχρονισμού (`POST /api/sync/tokens`) και η δημιουργία token πρόσβασης CLI με `admin` (`POST /api/cli/tokens`) απαιτούν συνεδρία πίνακα ελέγχου ή το τοπικό υποκείμενο CLI σε κάθε λειτουργία σύνδεσης. Τα κλειδιά API όλων των scopes και τα tokens πρόσβασης `oma_` δεν είναι διαπιστευτήρια διαχειριστή: λαμβάνουν `403` όποτε απαιτείται ένα τέτοιο. Ο έλεγχος βρίσκεται στο `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). Η αλλαγή των ρυθμίσεων σύνδεσης είναι επίσης μόνο για τον διαχειριστή: το `POST /api/settings/require-login` (ορισμός του κωδικού διαχείρισης / εναλλαγή του `requireLogin`) δέχεται μόνο αυτά τα διαπιστευτήρια αφού υπάρξει κωδικός — το παράθυρο της αρχικής ρύθμισης (όταν δεν υπάρχει ακόμη κωδικός) παραμένει ως έχει — και μια συνεδρία πίνακα ελέγχου πρέπει να στείλει `currentPassword` για να αντικαταστήσει τον κωδικό (`403` όταν λείπει ή είναι λάθος, με καταγραφή ως `settings.update_failed`). Το τοπικό CLI και μια εγκατάσταση με απενεργοποιημένη σύνδεση διατηρούν τη διαδρομή ανάκτησης και μπορούν να ορίσουν κωδικό χωρίς αυτόν, αφού και τα δύο είναι δεσμευμένα στον υπολογιστή που κατέχει τον κατάλογο δεδομένων.

## Γραμμή σωλήνων

```
Incoming request → src/proxy.ts
  → runAuthzPipeline() in src/server/authz/pipeline.ts
    1. Strip trusted internal headers (x-omniroute-auth-*, x-omniroute-route-class)
    2. Generate request id, classify route via classifyRoute()
    3. If pathname == "/" → redirect /dashboard
    4. If draining (graceful shutdown) and /api/* → 503
    5. If non-GET /api/* → checkBodySize() guard
    6. If OPTIONS → CORS preflight 204
    7. If options.enforce == false → pass-through with route-class headers
    8. Otherwise: POLICIES[routeClass].evaluate(ctx)
       - allow  → stamp x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - reject → JSON error w/ correlation_id (dashboard pages → 302 /login)
```

Οι αξιόπιστες εσωτερικές κεφαλίδες (που ορίζονται στο `src/server/authz/headers.ts`) είναι** απογυμνωθεί από εισερχόμενα αιτήματα** πριν από την ταξινόμηση, οι πελάτες — δεν μπορούν να συμπληρώσουν εκ των προτέρων `x-omniroute-auth-*` για να μιμηθούν ένα θέμα.

### Συμβάσεις πολιτικής

Κάθε κατηγορία διαδρομής έχει μια πολιτική στο `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — επιστρέφει πάντα `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — αποσπάσματα Bearer, επικυρώνει μέσω `validateApiKey()`. Πέφτει σε ανώνυμη μόνο όταν η ενεργή σημαία χαρακτηριστικών `REQUIRE_API_KEY` είναι απενεργοποιημένη. Η αποτελεσματική επισήμανση επιλύεται μέσω `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`), επομένως οι σημαίες χαρακτηριστικών του πίνακα ελέγχου και οι μεταβλητές περιβάλλοντος διέπουν με συνέπεια `/api/v1/*`, `/api/v1beta/*` και ψευδώνυμα. οι αποτυχίες του επιλύτη αποτυγχάνουν να κλείσουν. Επιτρέπει αιτήματα συνεδρίας πίνακα εργαλείων σε διαδρομές πελάτη API (συμπεριλαμβανομένου του `/api/v1/models`, που χρησιμοποιείται από τον κατάλογο μοντέλων του πίνακα εργαλείων). Όταν το Entra ID SSO είναι ενεργοποιημένο, ένας φορέας που είναι δομικά ένα διακριτικό Entra (τρία τμήματα base64url, `RS*` alg, `kid`) αντιμετωπίζεται από τον κλάδο SSO** προτού** `validateApiKey()` και η ετυμηγορία του είναι οριστική — δεν περνά ποτέ στη διαδρομή κλειδιού API ή στον κλάδο υποβάθμισης σε ανώνυμο, επομένως μια διακοπή παροχής ταυτότητας δεν μπορεί να γίνει ανοιχτή πρόσβαση. Τα στατικά κλειδιά API δεν επηρεάζονται. Δείτε [Entra ID SSO](../security/ENTRA_SSO.md).
- **`managementPolicy`** (`policies/management.ts`) — αποδέχεται περίοδο λειτουργίας πίνακα εργαλείων, εσωτερικά αιτήματα συγχρονισμού μοντέλου (αντιστοιχίζονται σε `/api/providers/[name]/(sync-models|models)`) ή παρακάμπτει εντελώς εάν `isAuthRequired()` επιστρέψει false. Επιστρέφει 403 (`AUTH_001`) όταν υπάρχει ένα διακριτικό φορέα αλλά δεν είναι έγκυρο, 401 διαφορετικά. Επίσης, επιβάλλει τις βαθμίδες προστασίας διαδρομής (LOCAL_ONLY / ALWAYS_PROTECTED) πριν από οποιοδήποτε κλάδο εξουσιοδότησης — ανατρέξτε στο [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md). Τα μονοπάτια LOCAL_ONLY στο `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (σήμερα: `/api/mcp/`) μπορούν να προσπελαστούν από non-loopback όταν το κλειδί Bearer φέρει το εύρος `manage`. όλα τα άλλα μονοπάτια LOCAL_ONLY παραμένουν αυστηρά-loopback ανεξάρτητα από το εύρος.

Μια επιτυχημένη πολιτική επιστρέφει `AuthSubject` με `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }`. Οι μεταγενέστεροι χειριστές μπορούν να το διαβάσουν μέσω `assertAuth(request, "CLIENT_API")` σε `src/server/authz/assertAuth.ts` αντί να εκτελούν ξανά τη λογική εξουσιοδότησης.

## Λίστα δημόσιων διαδρομών

Το `src/shared/constants/publicApiRoutes.ts` είναι η ρητή λίστα επιτρεπόμενων:

Η λίστα χωρίζεται βάσει **σχήματος**, και ο διαχωρισμός είναι κρίσιμος για τη λειτουργία (GHSA-74g9-q8f6-793h): ένα πρόθεμα
αντιστοιχίζεται με `startsWith()`, επομένως αντιστοιχίζεται επίσης με κάθε γειτονική διαδρομή που μοιράζεται τους αρχικούς της χαρακτήρες.
Το `/api/usage/om-usage` ως πρόθεμα σηματοδοτεί `/api/usage/om-usage<anything>` ως PUBLIC, και το Next το επιλύει
σε `/api/usage/[connectionId]` — έναν χειριστή χωρίς δικό του έλεγχο ταυτοποίησης.

```ts
// Γνήσια υποδέντρα. Κάθε καταχώριση ΠΡΕΠΕΙ να τελειώνει σε "/" (επιβεβαιώνεται από ένα unit test).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // αντιμετωπίζεται ως CLIENT_API στο classify, όχι ως "no-auth public"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Μεμονωμένες διαδρομές, με αντιστοίχιση ΑΚΡΙΒΩΣ (με ή χωρίς τελική κάθετο).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/auth/mfa/verify", // βήμα 2 της σύνδεσης για προαιρετικό TOTP· χρειάζεται το cookie MFA-pending
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// Μεμονωμένες διαδρομές μόνο για ανάγνωση που λαμβάνουν επίσης την εξαίρεση προέλευσης CORS.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Μεμονωμένη διαδρομή μόνο για ανάγνωση ΧΩΡΙΣ την εξαίρεση CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Οι διαδρομές μόνο για ανάγνωση είναι δημόσιες **μόνο** για ασφαλείς μεθόδους. Σημείωση: η `classifyRoute()` εξαιρεί τα `/api/v1/*` και `/api/v1beta/*` από το PUBLIC fall-through — αυτά είναι πάντα `CLIENT_API`, επομένως εξακολουθεί να εφαρμόζεται η πολιτική κλειδιού Bearer.

## Προσθήκη νέας διαδρομής

### Μοτίβο 1 — Δημόσιο τελικό σημείο API πελάτη (ταυτοποίηση Bearer)

Οι διαδρομές κάτω από τα `/api/v1/` και `/api/v1beta/` ταξινομούνται αυτόματα ως `CLIENT_API`. Το middleware επιβάλλει τον έλεγχο Bearer· οι χειριστές διαδρομών δεν χρειάζεται να τον επαναλάβουν, αλλά μπορούν να διαβάσουν το υποκείμενο εάν αυτό είναι χρήσιμο.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... λογική χειριστή
}
```

### Μοτίβο 2 — Τελικό σημείο διαχείρισης (συνεδρία ή Bearer + manage)

Χρησιμοποιήστε τη `requireManagementAuth()` από το `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... λογική χειριστή
}
```

Η `requireManagementAuth()` επιστρέφει `null` σε περίπτωση επιτυχίας ή ένα σφάλμα JSON τύπου `Response`:

- 401 `AUTH_001` "Απαιτείται ταυτοποίηση" — δεν υπάρχουν καθόλου διαπιστευτήρια
- 403 — μη έγκυρο Bearer **ή** υπάρχει Bearer, αλλά το κλειδί δεν διαθέτει το πεδίο εφαρμογής `manage` / `admin`

Η `hasManageScope(scopes)` επιστρέφει true για `"manage"` ή `"admin"`.

### Μοτίβο 3 — Προσθήκη στη δημόσια λίστα επιτρεπόμενων διαδρομών

Επιλέξτε το σύνολο βάσει μορφής και όχι βάσει ευκολίας. Μία διαδρομή τοποθετείται στο `PUBLIC_API_ROUTES_EXACT` (ή στο `PUBLIC_READONLY_CORS_API_ROUTES` αν είναι μόνο για GET)· μόνο ένα πραγματικό υποδέντρο τοποθετείται στο `PUBLIC_API_ROUTE_PREFIXES` και **πρέπει να τελειώνει σε `/`**. Η τοποθέτηση μιας μεμονωμένης διαδρομής στη λίστα προθεμάτων δημοσιοποιεί επίσης κάθε γειτονική διαδρομή που έχει τους ίδιους αρχικούς χαρακτήρες — συμπεριλαμβανομένων συγγενικών διαδρομών με δυναμικά τμήματα που θα προστεθούν αργότερα (GHSA-74g9-q8f6-793h). Ενημερώστε τις δοκιμές μονάδας στα `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` και `tests/unit/authz/classify.test.ts`.

## Εμβέλειες

Τρεις χώροι ονομάτων. Κάθε ελεγκτής διαβάζει μόνο τις δικές του συμβολοσειρές. Η παράθεση,
συμπεριλαμβανομένου του γιατί το `manage` αποτυγχάνει στο `scopeMatches` για το `read:compression` και γιατί ένα
διακριτικό πρόσβασης `read` δεν μπορεί να εκτελέσει `PATCH /api/keys/{id}`, βρίσκεται στην ενότητα
[Τρεις χώροι ονομάτων εμβέλειας](../frameworks/MCP-SERVER.md#three-scope-namespaces).

Τα κλειδιά API περιλαμβάνουν έναν πίνακα `scopes` (αποθηκευμένο ως JSON στο `api_keys.scopes`, βλ. `src/lib/db/apiKeys.ts`).

### Εμβέλεια διαχείρισης

- `manage` / `admin` — `hasManageScope`. Πρόσβαση Bearer στις διαδρομές API διαχείρισης.
- Τα `mcp:connect`, `self:usage`, `self:account-quota` και
  `policy:bypass-provider-quota` είναι προσθετικές εμβέλειες ακριβούς αντιστοίχισης. Βρίσκονται
  εκτός του `MANAGEMENT_API_KEY_SCOPES`. Το `mcp:connect` ανοίγει μόνο την
  εξαίρεση μη loopback για το `/api/mcp/`.

### Εμβέλειες εργαλείων MCP

Κατάλογος και κανόνες αντιστοίχισης (πανομοιότυπη συμβολοσειρά ή μια εκχωρημένη εμβέλεια που λήγει σε `*`):
[Εμβέλειες εργαλείων MCP](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
Το `MCP_SCOPE_LIST` στο `src/shared/constants/mcpScopes.ts` είναι το αρχικό υποσύνολο με τύπους,
όχι ο πλήρης κατάλογος. Η επιβολή εκτελείται στο
`open-sse/mcp-server/scopeEnforcement.ts` αφού το `resolveCallerScopeContext()`
επιλύσει τις εμβέλειες από τις πληροφορίες ελέγχου ταυτότητας MCP, τα μεταδεδομένα αιτήματος ή το `OMNIROUTE_MCP_SCOPES`.
Παραμένει απενεργοποιημένη εκτός εάν έχει οριστεί `OMNIROUTE_MCP_ENFORCE_SCOPES=true`.

### Εμβέλειες διακριτικών πρόσβασης

`read` / `write` / `admin` σε διακριτικά `oma_live_…`, ταξινομημένα βάσει του `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`). Αυτή η κατάταξη εφαρμόζεται μόνο στο διαπιστευτήριο διακριτικού πρόσβασης.
Βλ. [Έλεγχος ταυτότητας διαχείρισης](../guides/MANAGEMENT-AUTH.md).

## Εναλλαγή απαίτησης αυθεντικοποίησης

Η `isAuthRequired()` στο `src/shared/utils/apiAuth.ts` αποφασίζει αν επιβάλλεται **οποιαδήποτε** αυθεντικοποίηση σε ένα αίτημα:

- `settings.requireLogin === false` → η αυθεντικοποίηση είναι καθολικά απενεργοποιημένη, εκτός από το πάντα προστατευμένο επίπεδο (βλ. [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md)) και τις κλήσεις που χορηγούν ένα διαπιστευτήριο που αυτή αποδέχεται. Αυτές απαιτούν το ίδιο διαπιστευτήριο όπως με ενεργή σύνδεση: έκδοση tokens συγχρονισμού, δημιουργία tokens πρόσβασης CLI σε οποιοδήποτε scope, και δημιουργία κλειδιού API με scope `manage`/`admin`, χορήγηση αυτού του scope σε κλειδί, ή αναδημιουργία ή αποκάλυψη τέτοιου κλειδιού (`requireCredentialForManagementScopedKey()` στο `src/lib/api/requireManagementAuth.ts`). Τα κλειδιά μόνο για inference παραμένουν ανοιχτά.
- Δεν υπάρχει ρυθμισμένος κωδικός **και** δεν υπάρχει μεταβλητή περιβάλλοντος `INITIAL_PASSWORD` → η λειτουργία bootstrap επιτρέπει τον οδηγό onboarding και τα αιτήματα από το loopback, ενώ τα εκτεθειμένα αιτήματα δικτύου εξακολουθούν να χρειάζονται διαπιστευτήρια.
- Κάθε σφάλμα βάσης δεδομένων → αποτυγχάνει κλειστά (secure-by-default).

Η επιβολή του κλειδιού API πελάτη χρησιμοποιεί την `isRequireApiKeyEnabled()` στο `src/shared/utils/featureFlags.ts`, και όχι ανάγνωση απευθείας του `process.env.REQUIRE_API_KEY`. Αυτό έχει σημασία για τις αναπτύξεις: η αλλαγή του `REQUIRE_API_KEY` στο Dashboard → Feature Flags αποθηκεύει παράκαμψη στη βάση δεδομένων και επηρεάζει αμέσως τα `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` και άλλους ελέγχους αυθεντικοποίησης του client API που μοιράζονται αυτή τη βοηθητική συνάρτηση. Αν το κατάστημα των feature flags δεν μπορεί να διαβαστεί, η αυθεντικοποίηση του client API αποτυγχάνει κλειστά και απαιτεί κλειδί.

## Μη συμβατή αλλαγή — v3.8.0

Τα τελικά σημεία `/api/v1/agents/tasks/*` και `/api/resilience/model-cooldowns` **απαιτούν πλέον έλεγχο ταυτότητας διαχείρισης** (commit `588a0333`). Οι πελάτες που προηγουμένως έστελναν ένα κανονικό κλειδί API χωρίς το πεδίο εφαρμογής `manage` λαμβάνουν `403`. Μετεγκατάσταση: είτε εκχωρήστε στο κλειδί το πεδίο εφαρμογής `manage` από τον πίνακα ελέγχου API Keys είτε χρησιμοποιήστε μια συνδεδεμένη περίοδο λειτουργίας του πίνακα ελέγχου.

## Αλλαγή συμπεριφοράς — v3.8.2

Το `/api/mcp/*` (ο απομακρυσμένος διακομιστής MCP) εξακολουθεί να είναι LOCAL_ONLY από προεπιλογή, αλλά πλέον αποδέχεται αιτήματα εκτός loopback όταν η κεφαλίδα `Authorization: Bearer <api-key>` περιλαμβάνει το πεδίο εφαρμογής `manage`. Η εξαίρεση ελέγχεται ρητά ανά διαδρομή μέσω του `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` στο `src/server/authz/routeGuard.ts`· η συγγενική πρόθεση LOCAL_ONLY `/api/cli-tools/runtime/*` σκόπιμα ΔΕΝ μπορεί να παρακαμφθεί, επειδή μπορεί να εκκινήσει αυθαίρετες υποδιεργασίες. Τα ανώνυμα αιτήματα προς το `/api/mcp/*` εκτός loopback εξακολουθούν να επιστρέφουν `403 LOCAL_ONLY` — η προεπιλογή για κάθε νέα διαδρομή LOCAL_ONLY παραμένει αυστηρά loopback. Βλ. [Επίπεδα προστασίας διαδρομών](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Δοκιμές

- Δοκιμές μονάδας: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Δημόσια λίστα επιτρεπόμενων: `tests/unit/public-api-routes.test.ts`.
- Εκτέλεση εστιασμένης δοκιμής: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Εντοπισμός σφαλμάτων

Ο αγωγός σφραγίζει πάντα τις απαντήσεις με:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Για επικυρωμένα αιτήματα, οι κεφαλίδες αιτημάτων ανάντη (από την πλευρά του χειριστή) περιλαμβάνουν επίσης:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

Χρησιμοποιήστε `assertAuth(req, expectedClass)` μέσα στους χειριστές — ρίχνει `AuthzAssertionError` με κωδικό `AUTHZ_NOT_INITIALIZED` εάν παρακαμφθεί το ενδιάμεσο λογισμικό (χρήσιμο για την καταγραφή παλινδρομήσεων διαμόρφωσης σε δοκιμές).

## Δείτε επίσης

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ένδειξη ελέγχου ταυτότητας ανά τελικό σημείο
- [COMPLIANCE.md](../security/COMPLIANCE.md) — αρχείο καταγραφής ελέγχου για συμβάντα ελέγχου ταυτότητας
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — τρεις χώροι ονομάτων εμβέλειας και κατάλογος εμβελειών εργαλείων MCP
- Πηγαίος κώδικας: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
