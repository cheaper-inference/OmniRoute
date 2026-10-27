# Authorization Guide (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Πηγή αλήθειας:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Τελευταία ενημέρωση:** 2026-09-22 — οι χώροι ονομάτων εμβέλειας παραπέμπουν στο MCP-SERVER.md

Το OmniRoute διαθέτει μια διοχέτευση εξουσιοδότησης με επίγνωση διαδρομών, η οποία ελέγχει κάθε αίτημα API. Η ταξινόμηση είναι **ντετερμινιστική** και **fail-closed** — οτιδήποτε δεν μπορεί να ταξινομηθεί καταλήγει ως `MANAGEMENT` και απαιτεί συνεδρία ή διακριτικό επιπέδου διαχείρισης. Αυτή η σελίδα εξηγεί το μοντέλο για μηχανικούς που συντηρούν διαδρομές ή σχεδιάζουν νέα τελικά σημεία.

![Διοχέτευση AuthZ (3 κλάσεις διαδρομών + αξιολόγηση πολιτικής)](../diagrams/exported/authz-pipeline.svg)

> Πηγή: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Δύο τρόποι ελέγχου ταυτότητας

### 1. Κλειδί API (Bearer)

Χρησιμοποιείται για τα API πελάτη που είναι συμβατά με OpenAI/Anthropic/Gemini και για ορισμένες διαδρομές διαχείρισης, όταν το κλειδί διαθέτει το πεδίο εφαρμογής `manage`.

```
Authorization: Bearer <api-key>
```

Επικυρώνεται από τις `isValidApiKey()` / `extractApiKey()` στο `src/sse/services/auth.ts` και επανεξάγεται μέσω του `src/shared/utils/apiAuth.ts`. Το εργαλείο επικύρωσης αποδέχεται επίσης τις μεταβλητές περιβάλλοντος `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` ως μόνιμα κλειδιά passthrough (ζήτημα #1350).

### 2. Συνεδρία πίνακα ελέγχου (cookie auth_token)

Για τις σελίδες του πίνακα ελέγχου και τις λειτουργίες διαχείρισης.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Ένα cookie αποτελεί συνεδρία μόνο όταν το JWT επαληθεύεται **και** περιέχει `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Κάθε
καταναλωτής του cookie (φρουρός διαδρομών του πίνακα ελέγχου (`isDashboardSessionAuthenticated()`), ανανέωση του pipeline εξουσιοδότησης, χειραψία WebSocket, διακομιστής
ζωντανής λειτουργίας, `/api/settings/require-login`, `/api/auth/status`) χρησιμοποιεί αυτό το βοηθητικό εργαλείο.
Υπάρχουν και άλλα JWT υπογεγραμμένα με `JWT_SECRET` — το passthrough του Cursor CLI εκδίδει
διακριτικά `iss "omniroute" / aud "cursor-cli"` για κατόχους κλειδιών — και αυτά δεν αποτελούν ποτέ συνεδρίες
(#13298).

Επαληθεύεται από την `isDashboardSessionAuthenticated()` στο `src/shared/utils/apiAuth.ts`. Το pipeline ανανεώνει αυτόματα το JWT όταν απομένουν λιγότερες από 7 ημέρες από τη διάρκεια ζωής του, η οποία είναι 30 ημέρες.

Μια συνεδρία μπορεί επίσης να τερματιστεί πριν συμπληρωθούν οι 30 ημέρες, επειδή κάθε εκδότης χρησιμοποιεί τη `mintDashboardSessionToken` (χρόνος έκδοσης `iat` και αναγνωριστικό `jti`) και το εργαλείο επαλήθευσης ελέγχει δύο ρυθμίσεις: τη `sessionsValidAfter`, η οποία ορίζεται μετά από αλλαγή κωδικού πρόσβασης, ώστε να παύει να επαληθεύεται κάθε συνεδρία που εκδόθηκε προηγουμένως (το πρόγραμμα περιήγησης από το οποίο έγινε η αλλαγή κωδικού πρόσβασης λαμβάνει νέο cookie), και τη `revokedDashboardSessions`, στην οποία το `POST /api/auth/logout` προσθέτει το `jti` της συνεδρίας από την οποία έγινε αποσύνδεση. Οι συνεδρίες που εκδόθηκαν από παλαιότερη έκδοση δεν περιέχουν καμία από αυτές τις αξιώσεις και παραμένουν έγκυρες μέχρι την πρώτη αλλαγή κωδικού πρόσβασης. Εάν δεν είναι δυνατή η ανάγνωση των ρυθμίσεων, η συνεδρία δεν θεωρείται αξιόπιστη.

Ορισμένες διαδρομές διαχείρισης αποδέχονται **οποιονδήποτε** από τους δύο τρόπους: cookie Ή `Bearer <key>` όταν το κλειδί API διαθέτει το πεδίο εφαρμογής `manage` (ή `admin`). Αυτό επιτρέπει τη ροή εργασίας «δυνατότητα διαμόρφωσης μέσω κλήσεων API» που προστέθηκε στην v3.8.

#### Προαιρετική πύλη σύνδεσης OIDC (#6973)

Η σύνδεση διαχειριστή στον πίνακα ελέγχου υποστηρίζει επίσης μια **προαιρετική** ροή OIDC (OpenID Connect)
παράλληλα με την προεπιλεγμένη σύνδεση μέσω κωδικού πρόσβασης — η σύνδεση μέσω κωδικού πρόσβασης δεν καταργείται ποτέ, απλώς
συμπληρώνεται:

- Είναι απενεργοποιημένο, εκτός εάν `settings.oidcEnabled === true` **και** τα `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` έχουν διαμορφωθεί όλα (Ρυθμίσεις → Έλεγχος ταυτότητας).
  Διαφορετικά, το `GET /api/auth/oidc/login` επιστρέφει `400`.
- Το `GET /api/auth/oidc/login` εντοπίζει το `authorization_endpoint` από το
  `/.well-known/openid-configuration` του εκδότη (με εναλλακτική το
  `<issuer>/authorize`), δημιουργεί το URI ανακατεύθυνσης από το εισερχόμενο αίτημα
  (λαμβάνοντας υπόψη το `x-forwarded-proto`) και ανακατευθύνει στον IdP με μια τυχαία τιμή `state`
  αποθηκευμένη σε ένα cookie `oidc_state` τύπου `httpOnly`.
- Το `GET /api/auth/oidc/callback` επικυρώνει το `state`, ανταλλάσσει τον κωδικό
  εξουσιοδότησης και επαληθεύει την υπογραφή του ID token μέσω του JWKS του εκδότη
  (`createRemoteJWKSet` του `jose`, με προσωρινή αποθήκευση ανά URI του JWKS), με ελέγχους
  `issuer`/`audience`. Η πρόσβαση στον πίνακα ελέγχου απαιτεί μια μη κενή λίστα
  `oidcAllowedSubjects`, μια πολιτική `oidcAdmissionClaim` ή και τα δύο. Η λίστα υποκειμένων
  αντιστοιχίζει το `sub` ή το `email` μόνο όταν `email_verified === true`. Η προαιρετική
  πολιτική αξίωσης δέχεται μια διαδρομή αξίωσης ID token διαχωρισμένη με τελείες (για παράδειγμα,
  `realm_access.roles`) και έναν πίνακα αποδεκτών τιμών· η αξίωση που επιλύεται πρέπει να είναι
  ένας πίνακας συμβολοσειρών που περιέχει τουλάχιστον μία αποδεκτή τιμή. Εάν έχουν διαμορφωθεί
  και οι δύο πολιτικές, πρέπει να πληρούνται και οι δύο. Ελλιπείς ή λανθασμένα μορφοποιημένες
  αξιώσεις απορρίπτονται, ενώ χωρίς καμία από τις δύο πολιτικές η επανάκληση αρνείται τη σύνδεση
  (`not_configured`). Οι υπάρχουσες διαμορφώσεις που βασίζονται μόνο στο υποκείμενο συνεχίζουν
  να λειτουργούν χωρίς αλλαγές.
- Το Keycloak συνήθως αντιστοιχίζει τους ρόλους realm σε access tokens και όχι απαραίτητα σε ID
  tokens. Για να απαιτήσετε τον ρόλο realm `admin`, διαμορφώστε έναν αντιστοιχιστή πρωτοκόλλου
  για αυτόν τον πελάτη, ο οποίος θα περιλαμβάνει το `realm_access.roles` στο **ID token** του, και
  κατόπιν ορίστε το `oidcAdmissionClaim` σε `{ "path": "realm_access.roles", "values": ["admin"] }`.
  Ελέγξτε την πραγματική αξίωση του ID token για αυτόν τον πελάτη πριν ενεργοποιήσετε την πρόσβαση
  αποκλειστικά βάσει ρόλου· η εφαρμογή δεν διαβάζει ρόλους από access tokens. Η άρνηση έκδοσης
  token από την πλευρά του IdP μπορεί να συμπληρώνει, αλλά δεν αντικαθιστά, αυτόν τον έλεγχο
  από την πλευρά της εφαρμογής.
- Σε περίπτωση επιτυχίας, εκδίδει το **ακριβώς ίδιο** JWT `auth_token` διάρκειας 30 ημερών που
  εκδίδει η σύνδεση με κωδικό πρόσβασης (`src/app/api/auth/login/route.ts`), επομένως η υπόλοιπη
  ροή συνεδρίας του πίνακα ελέγχου (αυτόματη ανανέωση, σημαίες cookie) παραμένει αμετάβλητη —
  το OIDC αντικαθιστά μόνο τον τρόπο έκδοσης του cookie και όχι τα δικαιώματα που αυτό παρέχει.
  Οι αλλαγές στους ρόλους/στις ομάδες του IdP δεν ακυρώνουν τις υπάρχουσες συνεδρίες του
  OmniRoute· η αποσύνδεση, η αλλαγή κωδικού πρόσβασης ή η λήξη της συνεδρίας εξακολουθούν να
  καθορίζουν τη διάρκειά τους.
- Κάθε ρύθμιση `oidc*` (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) περιλαμβάνεται στο `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`): το `PATCH /api/settings`
  αποκρίνεται με `400 PASSWORD_REQUIRED`, εκτός εάν το σώμα περιέχει τον κωδικό πρόσβασης
  διαχείρισης ως `currentPassword` (`401 PASSWORD_MISMATCH` όταν είναι λανθασμένος).
  Το `oidcDisablePasswordLogin` απορρίπτει τη _σύνδεση_ με κωδικό πρόσβασης (`POST /api/auth/login`),
  αλλά διατηρεί το αποθηκευμένο hash του κωδικού πρόσβασης, ενώ η εκ νέου επαλήθευση ταυτότητας
  εξακολουθεί να ελέγχει το `currentPassword` σε σύγκριση με αυτό.
- Τα `corsOrigins` και `bruteForceProtection` περιλαμβάνονται επίσης στο `SECURITY_IMPACTING_SETTINGS_KEYS`:
  η χαλάρωση οποιουδήποτε από τα δύο αποδυναμώνει τις άμυνες σύνδεσης, επομένως απαιτούν την ίδια
  εκ νέου επαλήθευση ταυτότητας μέσω `currentPassword` (η καρτέλα Ασφάλεια το ζητά) και η εισαγωγή
  JSON τα αφαιρεί.
- Κάθε κλειδί πολιτικής ασφαλείας — οι καταχωρίσεις του `SECURITY_IMPACTING_SETTINGS_KEYS`,
  κάθε κλειδί `oidc*` και η κατάσταση συνεδρίας του πίνακα ελέγχου — είναι **αποκλειστικά για τον
  χειριστή** στο `PATCH /api/settings`: ένα κλειδί API με εμβέλεια `manage` ή ένα access token
  `oma_` απορρίπτεται με `403`, ακόμη και όταν αποστέλλει το σωστό `currentPassword`, και η
  απόρριψη καταγράφεται στο αρχείο ελέγχου ως `settings.update_failed` με `reason: OPERATOR_REQUIRED`
  (`requireOperatorCredential()` στο `src/lib/api/operatorCredential.ts`).
  Οι συνήθεις ρυθμίσεις (θέμα, προτιμήσεις εμφάνισης) παραμένουν εγγράψιμες από ένα κλειδί `manage`
  ή ένα access token `admin`. Κάθε τροποποίηση του ίδιου του `/api/settings` (και του
  `/api/settings/require-login`) απαιτεί επίσης την εμβέλεια access token `admin`
  (`ADMIN_MUTATION_EXACT_PATHS` στο `src/server/authz/accessScopes.ts`, ακριβής αντιστοίχιση
  διαδρομής)· το `GET` παραμένει `read`, ενώ οι άλλες υποδιαδρομές `/api/settings/*` (διακομιστές
  μεσολάβησης, προεπιλογές συνδυασμών, ψευδώνυμα μοντέλων, συμπίεση, εκκαθαρίσεις…) διατηρούν την
  εμβέλεια `write` που συνάγεται από τη μέθοδο.
- Το `POST /api/settings/import-json` παρακάμπτει αυτήν την εκ νέου επαλήθευση ταυτότητας, οπότε
  αφαιρεί κάθε κλειδί στο `IMPORT_STRIPPED_SETTINGS_KEYS` (στο ίδιο αρχείο) πριν από την εγγραφή:
  τον κωδικό πρόσβασης και το `currentPassword`, κάθε καταχώριση του `SECURITY_IMPACTING_SETTINGS_KEYS`
  και την κατάσταση συνεδρίας του πίνακα ελέγχου (`sessionsValidAfter`, `revokedDashboardSessions`).
  Συνεπώς, η εισαγωγή ενός παλαιότερου αντιγράφου ασφαλείας δεν μπορεί να επαναφέρει μια συνεδρία
  που είχε ήδη τερματιστεί από αλλαγή κωδικού πρόσβασης ή αποσύνδεση.

## Κλάσεις διαδρομών

Το `src/server/authz/types.ts` ορίζει τρεις κλάσεις· κάθε διαδρομή που δεν μπορεί να ταξινομηθεί με βεβαιότητα επιστρέφει στην `MANAGEMENT`.

| Κλάση        | Περιγραφή                                                                                                                                                              | Απαιτούμενη αυθεντικοποίηση                                            |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `PUBLIC`     | Ρητά ασφαλείς διαδρομές — σύνδεση, αποσύνδεση, κατάσταση, αρχικοποίηση, υγεία, bootstrap του onboarding.                                                               | Καμία                                                                  |
| `CLIENT_API` | Endpoints εξυπηρέτησης μοντέλων — `/api/v1/*`, `/api/v1beta/*`, καθώς και τα ψευδώνυμα `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Κλειδί Bearer όταν είναι ενεργή η σημαία λειτουργίας `REQUIRE_API_KEY` |
| `MANAGEMENT` | Σελίδες πίνακα ελέγχου, ρυθμίσεις, providers, κλειδιά, endpoints διαχειριστή και διαγνωστικών.                                                                         | Συνεδρία πίνακα ελέγχου Ή Bearer με scope `manage`                     |

Ορισμένες ενέργειες της `MANAGEMENT` είναι **μόνο για τον διαχειριστή**: ένα κλειδί `manage` δεν αρκεί. Η εξαγωγή αποθηκευμένων διαπιστευτηρίων (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), η επαναφορά αντιγράφου πάνω στα ζωντανά δεδομένα (`POST /api/db-backups/import`, συμπεριλαμβανομένου του `dryRun=true`, `POST /api/db-backups` επαναφορά με βάση το id, `POST /api/settings/import-json`), η καταστροφή σημείων επαναφοράς (`DELETE /api/db-backups` για καθαρισμό και `PATCH /api/db-backups`, επειδή η διατήρηση που αποθηκεύει οδηγεί την αυτόματη διαγραφή μετά από κάθε αντίγραφο) απαιτούν συνεδρία πίνακα ελέγχου, το τοπικό υποκείμενο CLI ή απενεργοποιημένη σύνδεση. Η έκδοση ενός token συγχρονισμού (`POST /api/sync/tokens`) και η δημιουργία token πρόσβασης CLI με `admin` (`POST /api/cli/tokens`) απαιτούν συνεδρία πίνακα ελέγχου ή το τοπικό υποκείμενο CLI σε κάθε λειτουργία σύνδεσης. Τα κλειδιά API όλων των scopes και τα tokens πρόσβασης `oma_` δεν είναι διαπιστευτήρια διαχειριστή: λαμβάνουν `403` όποτε απαιτείται ένα τέτοιο. Ο έλεγχος βρίσκεται στο `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). Η αλλαγή των ρυθμίσεων σύνδεσης είναι επίσης μόνο για τον διαχειριστή: το `POST /api/settings/require-login` (ορισμός του κωδικού διαχείρισης / εναλλαγή του `requireLogin`) δέχεται μόνο αυτά τα διαπιστευτήρια αφού υπάρξει κωδικός — το παράθυρο της αρχικής ρύθμισης (όταν δεν υπάρχει ακόμη κωδικός) παραμένει ως έχει — και μια συνεδρία πίνακα ελέγχου πρέπει να στείλει `currentPassword` για να αντικαταστήσει τον κωδικό (`403` όταν λείπει ή είναι λάθος, με καταγραφή ως `settings.update_failed`). Το τοπικό CLI και μια εγκατάσταση με απενεργοποιημένη σύνδεση διατηρούν τη διαδρομή ανάκτησης και μπορούν να ορίσουν κωδικό χωρίς αυτόν, αφού και τα δύο είναι δεσμευμένα στον υπολογιστή που κατέχει τον κατάλογο δεδομένων.

## Ροή επεξεργασίας

```
Εισερχόμενο αίτημα → src/proxy.ts
  → runAuthzPipeline() στο src/server/authz/pipeline.ts
    1. Αφαίρεση αξιόπιστων εσωτερικών κεφαλίδων (x-omniroute-auth-*, x-omniroute-route-class)
    2. Δημιουργία αναγνωριστικού αιτήματος, ταξινόμηση διαδρομής μέσω classifyRoute()
    3. Αν pathname == "/" → ανακατεύθυνση στο /dashboard
    4. Αν βρίσκεται σε διαδικασία τερματισμού (ομαλός τερματισμός) και /api/* → 503
    5. Αν δεν είναι GET και είναι /api/* → έλεγχος προστασίας checkBodySize()
    6. Αν είναι OPTIONS → προκαταρκτικό αίτημα CORS 204
    7. Αν options.enforce == false → διέλευση με κεφαλίδες κλάσης διαδρομής
    8. Διαφορετικά: POLICIES[routeClass].evaluate(ctx)
       - αποδοχή  → προσθήκη x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - απόρριψη → σφάλμα JSON με correlation_id (σελίδες πίνακα ελέγχου → 302 /login)
```

Οι αξιόπιστες εσωτερικές κεφαλίδες (που ορίζονται στο `src/server/authz/headers.ts`) **αφαιρούνται από τα εισερχόμενα αιτήματα** πριν από την ταξινόμηση — οι πελάτες δεν μπορούν να προσυμπληρώσουν το `x-omniroute-auth-*` για να πλαστοπροσωπήσουν ένα υποκείμενο.

### Συμβάσεις πολιτικών

Κάθε κλάση διαδρομής έχει μια πολιτική στο `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — επιστρέφει πάντα `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — εξάγει το Bearer και το επικυρώνει μέσω `validateApiKey()`. Μεταπίπτει σε ανώνυμη πρόσβαση μόνο όταν η ισχύουσα σημαία λειτουργίας `REQUIRE_API_KEY` είναι απενεργοποιημένη. Η ισχύουσα σημαία επιλύεται μέσω `isRequireApiKeyEnabled()` (`παράκαμψη σημαίας λειτουργίας DB > process.env.REQUIRE_API_KEY > προεπιλογή`), ώστε οι Σημαίες Λειτουργιών του Πίνακα Ελέγχου και οι μεταβλητές περιβάλλοντος να διέπουν με συνέπεια τα `/api/v1/*`, `/api/v1beta/*` και τα ψευδώνυμα· οι αποτυχίες του επιλυτή οδηγούν σε ασφαλή απόρριψη. Επιτρέπει αιτήματα με συνεδρία πίνακα ελέγχου στις διαδρομές API πελάτη (συμπεριλαμβανομένης της `/api/v1/models`, η οποία χρησιμοποιείται από τον κατάλογο μοντέλων του πίνακα ελέγχου).
- **`managementPolicy`** (`policies/management.ts`) — αποδέχεται συνεδρία πίνακα ελέγχου, εσωτερικά αιτήματα συγχρονισμού μοντέλων (αντιστοιχισμένα με το `/api/providers/[name]/(sync-models|models)`) ή παρακάμπτεται πλήρως αν το `isAuthRequired()` επιστρέψει false. Επιστρέφει 403 (`AUTH_001`) όταν υπάρχει διακριτικό Bearer αλλά είναι μη έγκυρο, διαφορετικά 401. Επιβάλλει επίσης τις βαθμίδες προστασίας διαδρομών (LOCAL_ONLY / ALWAYS_PROTECTED) πριν από οποιονδήποτε κλάδο ελέγχου ταυτότητας — ανατρέξτε στο [Βαθμίδες Προστασίας Διαδρομών](../security/ROUTE_GUARD_TIERS.md). Οι διαδρομές LOCAL_ONLY στο `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (σήμερα: `/api/mcp/`) μπορούν να προσπελαστούν εκτός loopback όταν το κλειδί Bearer διαθέτει την εμβέλεια `manage`· όλες οι άλλες διαδρομές LOCAL_ONLY παραμένουν αυστηρά προσβάσιμες μόνο μέσω loopback, ανεξαρτήτως εμβέλειας.

Μια επιτυχημένη πολιτική επιστρέφει `AuthSubject` με `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Οι μεταγενέστεροι χειριστές μπορούν να το διαβάσουν μέσω `assertAuth(request, "CLIENT_API")` στο `src/server/authz/assertAuth.ts`, αντί να εκτελέσουν ξανά τη λογική ελέγχου ταυτότητας.

## Λίστα δημόσιων διαδρομών

Το `src/shared/constants/publicApiRoutes.ts` είναι η ρητή λίστα επιτρεπόμενων διαδρομών:

Η λίστα διαχωρίζεται βάσει **μορφής** και αυτός ο διαχωρισμός είναι κρίσιμος (GHSA-74g9-q8f6-793h): ένα πρόθεμα αντιστοιχίζεται με `startsWith()`, επομένως αντιστοιχίζεται επίσης σε κάθε γειτονική διαδρομή που έχει τους ίδιους αρχικούς χαρακτήρες.
Το `/api/usage/om-usage` ως πρόθεμα χαρακτήριζε το `/api/usage/om-usage<anything>` ως PUBLIC, και το Next το αντιστοιχίζει στο `/api/usage/[connectionId]` — έναν χειριστή χωρίς δικό του έλεγχο ταυτοποίησης.

```ts
// Πραγματικά υποδέντρα. Κάθε καταχώριση ΠΡΕΠΕΙ να τελειώνει σε "/" (επιβεβαιώνεται από μια δοκιμή μονάδας).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // αντιμετωπίζεται ως CLIENT_API στο classify, όχι ως δημόσια διαδρομή "χωρίς ταυτοποίηση"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Μεμονωμένες διαδρομές, που αντιστοιχίζονται ΑΚΡΙΒΩΣ (με ή χωρίς τελική κάθετο).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// Μεμονωμένες διαδρομές μόνο για ανάγνωση, στις οποίες εφαρμόζεται επίσης η χαλάρωση προέλευσης CORS.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Μεμονωμένη διαδρομή μόνο για ανάγνωση ΧΩΡΙΣ τη χαλάρωση CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Οι διαδρομές μόνο για ανάγνωση είναι δημόσιες **μόνο** για ασφαλείς μεθόδους. Σημείωση: η `classifyRoute()` εξαιρεί τα `/api/v1/*` και `/api/v1beta/*` από την εναλλακτική κατάταξη PUBLIC — αυτά είναι πάντα `CLIENT_API`, ώστε να εξακολουθεί να εφαρμόζεται η πολιτική κλειδιού Bearer.

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

Η διοχέτευση επισημαίνει πάντα τις αποκρίσεις με:

```
x-request-id:               <αναγνωριστικό συσχέτισης, επαναλαμβάνεται στα σώματα σφαλμάτων>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Για πιστοποιημένα αιτήματα, οι κεφαλίδες αιτήματος προς το ανάντη σύστημα (στην πλευρά του χειριστή) περιλαμβάνουν επίσης:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<τελευταία-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (προαιρετικό)
x-omniroute-auth-scopes:    λίστα διαχωρισμένη με κόμματα
```

Χρησιμοποιήστε το `assertAuth(req, expectedClass)` μέσα στους χειριστές — προκαλεί `AuthzAssertionError` με κωδικό `AUTHZ_NOT_INITIALIZED` εάν το ενδιάμεσο λογισμικό παρακάμφθηκε (χρήσιμο για τον εντοπισμό παλινδρομήσεων διαμόρφωσης στις δοκιμές).

## Δείτε επίσης

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ένδειξη ελέγχου ταυτότητας ανά τελικό σημείο
- [COMPLIANCE.md](../security/COMPLIANCE.md) — αρχείο καταγραφής ελέγχου για συμβάντα ελέγχου ταυτότητας
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — τρεις χώροι ονομάτων εμβέλειας και κατάλογος εμβελειών εργαλείων MCP
- Πηγαίος κώδικας: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
