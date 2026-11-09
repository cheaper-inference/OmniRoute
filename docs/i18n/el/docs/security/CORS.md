# CORS Configuration & Security (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute ελέγχει το οποίο **προέλευση του προγράμματος περιήγησης** μπορεί να διαβάσει απαντήσεις πολλαπλής προέλευσης από μια ενιαία, κεντρική λίστα επιτρεπόμενων. Το μοντέλο είναι **fail-κλειστό από προεπιλογή** : Δεν επιτρέπεται καμία προέλευση έως ότου επιλέξετε να εισέλθετε. Αυτή η σελίδα τεκμηριώνει πώς επιλύει η λίστα επιτρεπόμενων, τι εκθέτει στην πραγματικότητα `CORS_ALLOW_ALL=true` (και, κυρίως, τι κάνει **δεν** ), πώς να ρυθμίσετε με ασφάλεια τον προγραμματισμό έναντι της παραγωγής και η προειδοποίηση χρόνου εκτέλεσης στον πίνακα εργαλείων εμφανίζεται όταν ένας χαρακτήρας μπαλαντέρ είναι ζωντανός.

**Πηγή αλήθειας:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). Η λίστα επιτρεπόμενων εφαρμόζεται μία φορά, στο ενδιάμεσο λογισμικό (`src/server/authz/pipeline.ts`) Οι χειριστές — ανά διαδρομή δεν ορίζουν οι ίδιοι `Access-Control-Allow-Origin`.

## Πώς λύνεται μια προέλευση

Για κάθε αίτημα το ενδιάμεσο λογισμικό υπολογίζει την τιμή `Access-Control-Allow-Origin` με αυτή τη σειρά:

1. **`CORS_ALLOW_ALL=true`** (ή το `CORS_ORIGIN=*` παλαιού τύπου ) → επαναλαμβάνει το `Origin` του καλούντος πίσω (ή `*` όταν δεν υπάρχει κεφαλίδα `Origin` ), με `Vary: Origin` ώστε οι κρυφές μνήμες να παραμένουν σωστές. Το ίδιο σημείο τσοκ `applyCorsHeaders()` προσαρτά επίσης `Vary: Accept-Encoding` σε κάθε απόκριση 2xx-με σώμα στην επιφάνεια `/v1*`/`/v1beta*` με έλεγχο ταυτότητας (`relaxForTokenAuth`, RFC 9110 §12.5.5, έκδοση #6737), έτσι οι κρυφές μνήμες downstream/shared μπορούν να διακρίνουν σωστά τις συμπιεσμένες από τις ασυμπίεστες παραλλαγές.
2. Διαφορετικά, το αίτημα `Origin` κανονικοποιείται (με πεζά γράμματα, απογυμνωμένη κάθετο στο τέλος) και ταιριάζει με το **συγχωνευμένη λίστα επιτρεπόμενων** :
   - env **`CORS_ALLOWED_ORIGINS`** — λίστα διαχωρισμένη με κόμμα και
   - ο χρόνος εκτέλεσης **`corsOrigins`** ρύθμιση (Dashboard → Security → _CORS Allowed Origins_), με ένεση μέσω `setRuntimeAllowedOrigins()` από `src/lib/config/runtimeSettings.ts`.
3. Χωρίς αγώνα →**δεν εκπέμπεται κεφαλίδα `Access-Control-Allow-Origin`** . Το πρόγραμμα περιήγησης αποκλείει την ανάγνωση διασταυρούμενης προέλευσης. Αυτή είναι η προεπιλεγμένη προεπιλογή κλειστής αποτυχίας.

| Env var                | Εννοια                                                                                                      |
| ---------------------- | ----------------------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV ακριβούς προέλευσης που επιτρέπεται (συνιστάται).                                                       |
| `CORS_ALLOW_ALL`       | `true`/`1` → αντηχεί οποιαδήποτε προέλευση (μπαλαντέρ). Μόνο προγραμματιστές.                               |
| `CORS_ORIGIN`          | Κληροδότημα. `*` συμπεριφέρεται όπως `CORS_ALLOW_ALL`. μια ενιαία τιμή προστίθεται στη λίστα επιτρεπόμενων. |

## Απειλήστε το μοντέλο — αυτό που πραγματικά εκθέτει `CORS_ALLOW_ALL=true`

Η γενική προειδοποίηση OWASP ("μπαλαντέρ CORS = any site can call your API") αξίζει να ληφθεί σοβαρά υπόψη, αλλά η έκθεση της OmniRoute είναι **πιο στενή από τη γενική περίπτωση** , λόγω ενός συγκεκριμένου γεγονότος υλοποίησης:

> **Το κεντρικό `applyCorsHeaders()` δεν εκπέμπει ποτέ `Access-Control-Allow-Credentials`.** Ένα πρόγραμμα περιήγησης δεν θα εκθέσει μια απάντηση _credentialed_ (που φέρει cookie) cross-origin απόκριση εκτός εάν ο διακομιστής στείλει `Access-Control-Allow-Credentials: true`. Η κοινή διαδρομή CORS του OmniRoute δεν συμβαίνει ποτέ.

Τι σημαίνει αυτό ανά επιφάνεια, ακόμη και με `CORS_ALLOW_ALL=true`:

| Επιφάνεια                                   | Μηχανισμός εξουσιοδότησης     | Επίδραση μπαλαντέρ CORS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Ταμπλό / MANAGEMENT `/api/*`                | Συνεδρία cookie               | Η καταγωγή επαναλαμβάνεται, αλλά **χωρίς `Allow-Credentials`** το πρόγραμμα περιήγησης **μπλοκ** η διαπιστευμένη ανάγνωση. Ένας κακόβουλος ιστότοπος πολλαπλής προέλευσης **δεν μπορεί να διαβάσει** τις απαντήσεις του πίνακα ελέγχου ταυτότητας και το cookie περιόδου λειτουργίας δεν εκτίθεται.                                                                                                                                                                                                                                                                                                                            |
| Πελάτης API `/v1/*`, `/v1beta/*`            | Κεφαλίδα Bearer / `x-api-key` | Ήδη ανεκτική **από σχέδιο** (`relaxForTokenAuth`): τα προγράμματα περιήγησης δεν επισυνάπτουν ποτέ αυτόματα `Authorization`/`x-api-key`, επομένως η σελίδα ενός εισβολέα δεν μπορεί να παρέχει το κλειδί σας. Η χαλαρή ηχώ απαιτεί ένα πιστοποιημένο θέμα (ένα επικυρωμένο κλειδί API ή περίοδο λειτουργίας πίνακα εργαλείων), όχι απλώς μια κεφαλίδα διαπιστευτηρίων και δεν περιλαμβάνει ποτέ `Access-Control-Allow-Credentials`. Οι ανώνυμες απαντήσεις (`REQUIRE_API_KEY=false`) χρησιμοποιούν τη διαμορφωμένη λίστα επιτρεπόμενων παραμέτρων προέλευσης, συμπεριλαμβανομένης μιας ρητής συμμετοχής `CORS_ALLOW_ALL=true`. |
| Μόνο για δημόσια ανάγνωση (`/api/health`,…) | Κανένας                       | Μη ευαίσθητο; Ο μπαλαντέρ είναι ακίνδυνος.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

Έτσι το **υπόλοιπο** η έκθεση του `CORS_ALLOW_ALL=true` περιορίζεται σε: (α) μη διαπιστευμένη διασταυρούμενη καταγωγή **διαβάζει** δεδομένων που δεν έχουν ήδη επικυρωθεί και (β) η άδεια CORS**πάσο πριν από την πτήση** σε διαδρομές διαχείρισης — που εξακολουθούν να απαιτούν πιστοποίηση που δεν μπορεί να παρέχει μια σελίδα διασταυρούμενης προέλευσης. Είναι **δεν** ένα διάνυσμα παραβίασης συνεδρίας ή κλοπής διαπιστευτηρίων στην κοινόχρηστη διαδρομή CORS.

### Μια πραγματική εξαίρεση — `/api/v1/agents/`

Οι διαδρομές Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) καθορίζουν το δικό τους **ίδιος** Επικεφαλίδες CORS (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) και **κάνω** εκπέμπουν `Access-Control-Allow-Origin: <origin>|*` μαζί με `Access-Control-Allow-Credentials: true`. Αυτή είναι η ενιαία επιφάνεια όπου συνυπάρχουν η προέλευση-ηχώ και τα διαπιστευτήρια, και είναι **ανεξάρτητα από `CORS_ALLOW_ALL`** . Αυτές οι διαδρομές είναι πιστοποιημένες από τη διαχείριση (`requireManagementAuth`). Οι χειριστές που εκθέτουν τον πίνακα εργαλείων εκτός κεντρικού υπολογιστή πρέπει να γνωρίζουν ότι αυτό είναι το μόνο μέρος όπου επιτρέπεται η ανάγνωση διαπιστευτηρίων διασταυρούμενης προέλευσης από τις κεφαλίδες απόκρισης. Η σύσφιξή της σε μια ρητή λίστα επιτρεπόμενων παρακολουθείται χωριστά από αυτήν την καθοδήγηση CORS.

## Λίστα ελέγχου παραγωγής

- **Ποτέ μην βάλετε `CORS_ALLOW_ALL=true` στην παραγωγή.** Αφήστε το χωρίς ρύθμιση.
- Ορίστε ένα **σαφής** λίστα προέλευσης — είτε το env var είτε το πεδίο της καρτέλας Security:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Εάν OmniRoute τρέχει πίσω από έναν αντίστροφο διακομιστή μεσολάβησης / τούνελ (nginx, Caddy, Cloudflare Tunnel, Tailscale), CORS είναι **δεν** ο μοναδικός σας έλεγχος — το loopback route guard εξακολουθεί να προστατεύει διαδρομές με δυνατότητα αναπαραγωγής (βλ. [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ). Μην σφυρηλατήσετε `X-Forwarded-For: 127.0.0.1` για να "διορθώσετε" ένα 403. που ανοίγει ξανά την κλάση RCE το route guard κλείνει.
- Επιβεβαιώστε την κατάσταση χρόνου εκτέλεσης: ο πίνακας εργαλείων δείχνει α **επίμονο πορτοκαλί πανό** κάτω από τον πίνακα εργαλείων → Security Απόθεμα εξουσιοδότησης → όποτε `CORS_ALLOW_ALL=true` είναι ζωντανό και `/api/settings/authz-inventory` επιστρέφει φάκελο παρακολούθησης `cors: { allowAll, allowedOrigins }` που μπορούν να δημοσκοπηθούν.

## Ευκολία ανάπτυξης — επιτρέπει συγκεκριμένες τοπικές προελεύσεις

Σπάνια χρειάζεστε τον μπαλαντέρ ακόμα και στο dev. Επιτρέψτε μόνο τους διακομιστές προγραμματιστών που χρησιμοποιείτε:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Τα στοιχεία προέλευσης αντιστοιχίζονται χωρίς διάκριση πεζών-κεφαλαίων με την τελική κάθετο να αγνοείται, επομένως `http://localhost:3000` και `http://localhost:3000/` είναι ισοδύναμα. Το ίδιο CSV μπορεί να ρυθμιστεί στο χρόνο εκτέλεσης **Ταμπλό → Security → CORS Allowed Origins** χωρίς επανεκκίνηση.

## Κλειδιά API έναντι συνεδριών cookie

- **Φορέας / `x-api-key` (ο `/v1/*` επιφάνεια συμπερασμάτων):** τα προγράμματα περιήγησης δεν τα επισυνάπτουν ποτέ αυτόματα. CORS δεν είναι ένα σημαντικό εμπόδιο εδώ — ο API κλειδί είναι το εμπόδιο — αυτός είναι ο λόγος για τον οποίο αυτή η επιφάνεια είναι σκόπιμα επιτρεπτή, ώστε ο περιηγητής και Electron οι πελάτες μπορούν να διαβάσουν τις απαντήσεις που δικαιούνται ήδη. Η χαλαρή ηχώ απαιτεί ένα πιστοποιημένο θέμα (α επικυρωμένο API κλειδί ή συνεδρία πίνακα εργαλείων), όχι μόνο μια κεφαλίδα διαπιστευτηρίων και δεν περιλαμβάνει ποτέ `Access-Control-Allow-Credentials`. Ανώνυμες απαντήσεις (`REQUIRE_API_KEY=false`) χρησιμοποιήστε τη διαμορφωμένη λίστα επιτρεπόμενων παραμέτρων προέλευσης, συμπεριλαμβανομένης μιας ρητής `CORS_ALLOW_ALL=true` συμμετοχή. Οι απορρίψεις ταυτότητας (401) παραμένουν αναγνώσιμες, ώστε οι πελάτες να μπορούν να εμφανίσουν ένα κλειδί που έχει ανακληθεί ή πληκτρολογηθεί λάθος (#5242): το 401 του αγωγού διατηρεί την ηχώ και μια διαδρομή που αρνείται το ίδιο το κλειδί αφού ο αγωγός το εξυπηρέτησε ως ανώνυμο (`/v1/models` και `/v1beta/models` με ρυθμισμένη εξουσιοδότηση διαχείρισης, με εμβέλεια κατόχου `/v1/files`, `/v1/batches`, `/v1/media`, `/v1/session-leases` και υποψήφιες διαδρομές auto-combo) προσθέτει την ηχώ σε αυτό το 401 via `credentialRejectionHeaders()`. Η ηχώ πληκτρολογείται στο αίτημα που φέρει μια κεφαλίδα διαπιστευτηρίων (`Authorization`, `x-api-key`, `x-goog-api-key` ή το `auth_token` cookie), όχι σε ποια από αυτές έλεγξε η διαδρομή και δεν γίνεται ποτέ σύζευξη `Access-Control-Allow-Credentials`; το σώμα είναι ένα σταθερό φάκελο σφάλματος. Διαδρομές διαχείρισης υπό `/api/v1/` φυλάσσεται από `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) μην χρησιμοποιείτε αυτήν την εξαίρεση απόρριψης διαπιστευτηρίων: με `REQUIRE_API_KEY=false`, τους 401/403 οι απαντήσεις ακολουθούν τις διαμορφωμένες CORS πολιτική καταγωγής.
- **Συνεδρία cookie (ο πίνακας εργαλείων):** προστατεύεται από την προεπιλογή κλειστού τύπου **και** από την απουσία `Access-Control-Allow-Credentials` στο κοινό μονοπάτι. Διατηρήστε τις προελεύσεις management/dashboard μακριά από οποιαδήποτε επιτρεπτή διαμόρφωση. πρέπει να μείνουν ακριβώς κλειστά.

## Χειραψίες WebSocket (`/v1/responses`, `/v1/ws`)

Τα προγράμματα περιήγησης δεν εφαρμόζουν CORS στο WebSocket, επομένως οι μεταφορές WebSocket που επιστρέφουν την έξοδο συμπερασμάτων ελέγχουν τη χειραψία `Origin` (`src/server/origin/wsOrigin.ts`): τις Απαντήσεις WebSocket (`/v1/responses`) και, όταν OmniRoute διέρχεται μέσω `npm start` / `npm run dev`, τη γέφυρα `/v1/ws` και `/api/v1/ws`, η οποία μεταδίδει `/v1/responses` `/v1/chat/completions`, `/v1/messages` ως καρέ. Η γέφυρα ζητά από `/api/v1/ws?handshake=1` την ετυμηγορία και αρνείται να αναβαθμίσει, εκτός εάν η διαδρομή διενεργούσε τον έλεγχο. Οι απαιτήσεις ελέγχου ταυτότητας εξακολουθούν να ισχύουν χωριστά. Ο έλεγχος προέλευσης περνά όταν:

- δεν έχει κεφαλίδα `Origin` (Codex CLI, SDKs και άλλοι πελάτες που δεν είναι προγράμματα περιήγησης).
- το `Origin` γίνεται δεκτό από την παραπάνω λίστα επιτρεπόμενων (`CORS_ALLOWED_ORIGINS`, η ρύθμιση `corsOrigins`, `CORS_ORIGIN`, `CORS_ALLOW_ALL`).
- το `Origin` είναι μία από τις δημόσιες προελεύσεις του ίδιου του OmniRoute(η διαμορφωμένη δημόσια βάση URL, η προωθημένη προέλευση ενός αξιόπιστου διακομιστή μεσολάβησης ή ένας άμεσος κεντρικός υπολογιστής loopback/LAN που δίνεται ως κυριολεκτικός IP ή `localhost` — οι ίδιοι υποψήφιοι που χρησιμοποιεί ο έλεγχος μετάλλαξης του πίνακα εργαλείων). ή
- φέρει ένα έγκυρο κλειδί API, όπως στην επιφάνεια HTTP `/v1/*`.

Οτιδήποτε άλλο παίρνει `403 ws_origin_forbidden`. Ένα cookie περιόδου λειτουργίας πίνακα εργαλείων δεν εξαιρεί ένα ξένο `Origin`, επειδή το πρόγραμμα περιήγησης το προσαρτά στην υποδοχή οποιασδήποτε σελίδας. `localhost` σε άλλη θύρα δεν αντιμετωπίζεται ως ίδιας προέλευσης. προσθέστε τέτοιες προελεύσεις dev στο `CORS_ALLOWED_ORIGINS`.

## Παράδειγμα: αντίστροφος διακομιστής μεσολάβησης μπροστά από OmniRoute

CORS επιβάλλεται από το ίδιο OmniRoute, επομένως ο διακομιστής μεσολάβησης θα έπρεπε γενικά **δεν** προσθέστε ή ξαναγράψτε κεφαλίδες `Access-Control-*` (οι διπλές κεφαλίδες διακόπτουν τα προγράμματα περιήγησης). Τερματίστε TLS και προωθήστε — αφήστε OmniRoute να απαντήσει πριν από την πτήση:

```nginx
# nginx — forward to OmniRoute; do NOT inject Access-Control-* here
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    # Keep the forwarding headers: a proxy on the same host connects from loopback, and they are
    # what tells OmniRoute the caller is not the local operator. A proxy that adds none of them
    # makes every remote caller look local. Never set X-Forwarded-For to 127.0.0.1 either.
}
```

Ορίστε τις επιτρεπόμενες προελεύσεις του προγράμματος περιήγησης στο OmniRoute (`CORS_ALLOWED_ORIGINS` ή στην καρτέλα Ασφάλεια), όχι στον διακομιστή μεσολάβησης.

## Αρχεία πηγής

| Ανησυχία                                            | Αρχείο                                                               |
| --------------------------------------------------- | -------------------------------------------------------------------- |
| Ανάλυση επιτρεπόμενης λίστας + `getCorsStatus()`    | `src/server/cors/origins.ts`                                         |
| Εφαρμογή Middleware (μοναδική πηγή αλήθειας)        | `src/server/authz/pipeline.ts`                                       |
| Ρυθμίσεις Έγχυση προέλευσης χρόνου εκτέλεσης →      | `src/lib/config/runtimeSettings.ts`                                  |
| Κατάσταση χρόνου εκτέλεσης για τον πίνακα εργαλείων | `src/app/api/settings/authz-inventory/route.ts`                      |
| Προειδοποιητικό πανό του ταμπλό                     | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Πεδίο επιτρεπόμενων προελεύσεων CORS                | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent ανά διαδρομή CORS (η εξαίρεση)          | `src/lib/cloudAgent/api.ts`                                          |
| Χειραψία WebSocket Έλεγχος `Origin`                 | `src/server/origin/wsOrigin.ts`                                      |

## Δείτε επίσης

- [Route Guard Tiers](./ROUTE_GUARD_TIERS.md) — loopback για διαδρομές με δυνατότητα αναπαραγωγής (ένας ξεχωριστός, συμπληρωματικός έλεγχος).
- [Οδηγός εξουσιοδότησης](../architecture/AUTHZ_GUIDE.md) — ο πλήρης αγωγός εξουσιοδότησης.
