# Resilience Guide (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute έχει τρεις διακριτούς αλλά σχετικούς μηχανισμούς ανθεκτικότητας. Το καθένα έχει διαφορετικό σκοπό και σκοπό. Διατηρήστε τα ξεχωριστά κατά τον εντοπισμό σφαλμάτων στη συμπεριφορά δρομολόγησης.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> Πηγή: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **Προτεραιότητα Env-vs-dashboard για εναλλαγές ανθεκτικότητας.** Η ελαστικότητα opt-in εναλλάσσεται από το περιβάλλον — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — παρέχει μόνο το _default_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`). Ένα boolean παρέμεινε στο `resilienceSettings` (ταμπλό →** Ρυθμίσεις → Resilience** / `PATCH /api/resilience`, αποθηκευμένο σε `key_value`) κερδίζει την τιμή env: η κανονικοποίηση (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) διατηρεί το αποθηκευμένο boolean όποτε υπάρχει. Η ρύθμιση ενός τέτοιου env var σε `true` σε μια ανάπτυξη όπου το ταμπλό έχει ήδη αποθηκεύσει `false` επομένως — αλλάζει τίποτα.** Ρυθμίσεις → Resilience** (ή εκκαθαρίστε το αποθηκευμένο πεδίο) αντί αυτού.

## 1. Διακόπτης Κυκλώματος Παρόχου (Circuit Breaker)

**Εύρος:** ολόκληρος ο πάροχος (π.χ., `glm`, `openai`, `anthropic`).

**Σκοπός:** διακοπή της αποστολής κίνησης προς έναν πάροχο που αποτυγχάνει επανειλημμένα σε επίπεδο upstream/υπηρεσίας.

**Υλοποίηση:**

- Βασική κλάση: `src/shared/utils/circuitBreaker.ts`
- Διασύνδεση: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API κατάστασης: `GET /api/monitoring/health`
- API επαναφοράς: `POST /api/resilience/reset`
- Περιτυλίγματα (wrappers): `open-sse/services/accountFallback.ts`
- Πίνακας ΒΔ: `domain_circuit_breakers`

**Καταστάσεις:**

- `CLOSED` — επιτρέπεται η κανονική κίνηση
- `DEGRADED` — η κίνηση εξακολουθεί να επιτρέπεται, αλλά καταγράφονται αυξημένες αποτυχίες του παρόχου· επιστρέφει σε `CLOSED` μετά από επαρκή αριθμό επιτυχιών, μετά από μια έγκυρη δοκιμή σύνδεσης, ή αφού παρέλθει η μεγαλύτερη διάρκεια παραμονής σε `OPEN` για το τελευταίο είδος αποτυχίας (η τιμή `cooldownByKind` του, αλλιώς το `resetTimeout`, × `maxBackoffMultiplier`, τουλάχιστον ένα cooldown) χωρίς νέα αποτυχία
- `OPEN` — ο πάροχος αποκλείεται προσωρινά· η δρομολόγηση combo τον παραλείπει
- `HALF_OPEN` — έχει παρέλθει ο χρόνος επαναφοράς· επιτρέπεται αίτημα διερεύνησης (probe)

**Διαμορφώσιμες προεπιλογές (`open-sse/config/constants.ts`, εκτίθενται στον Πίνακα Ελέγχου → Ρυθμίσεις → Ανθεκτικότητα):**

| Κλάση   | Υποβαθμίζεται στις | Ανοίγει στις | Χρόνος επαναφοράς |
| ------- | ------------------ | ------------ | ----------------- |
| OAuth   | 5 αποτυχίες        | 8 αποτυχίες  | 60s               |
| API-key | 7 αποτυχίες        | 12 αποτυχίες | 30s               |
| Local   | προκύπτει          | 2 αποτυχίες  | 15s               |

Το `degradationThreshold` ελέγχει πότε ένας πάροχος εισέρχεται σε `DEGRADED`· το `failureThreshold` ελέγχει πότε ανοίγει και παραλείπεται. Τα προφίλ τοπικών παρόχων δεν εκτίθενται ακόμη στη σελίδα ρυθμίσεων Ανθεκτικότητας.

**Κωδικοί ενεργοποίησης (trip):** μόνο καταστάσεις σε επίπεδο παρόχου `[408, 500, 502, 503, 504]`. ΔΕΝ ενεργοποιείται για σφάλματα σε επίπεδο λογαριασμού (τα περισσότερα 401/403/429 — αυτά ανήκουν στο cooldown ή στο lockout).

**Οκνηρή ανάκτηση (lazy recovery):** όταν λήξει το `OPEN`, οι `getStatus()`, `canExecute()`, `getRetryAfterMs()` ανανεώνουν την κατάσταση σε `HALF_OPEN`. Οι ίδιες αναγνώσεις (και η επόμενη αποτυχία) επαναφέρουν σταδιακά μια παρωχημένη `DEGRADED` σε `CLOSED`. Δεν απαιτείται χρονοδιακόπτης παρασκηνίου.

---

### Προαιρετική καθολική Παύση Παρόχου — Provider Cooldown (πύλη χρονικού παραθύρου)

Ένα τέταρτο, **προαιρετικό** επίπεδο (`PROVIDER_COOLDOWN_ENABLED`, προεπιλογή **απενεργοποιημένο**) διατηρεί μνήμη μεταξύ αιτημάτων για παρόχους που αποτυγχάνουν στο
`open-sse/services/providerCooldownTracker.ts`, το οποίο συμβουλεύεται η επίλυση στόχων combo, ώστε διαδοχικά αιτήματα combo να σταματούν να ξαναδιατρέχουν έναν πάροχο που μόλις απέτυχε. Οι εγγραφές σε επίπεδο παρόχου τηρούν την πύλη παραθύρου του `PROVIDER_PROFILES`:

| Προφίλ  | ενεργοποιείται μετά από (`providerFailureThreshold`) | εντός (`providerFailureWindowMs`) | παραμένει σε παύση για (`providerCooldownMs`) |
| ------- | ---------------------------------------------------: | --------------------------------: | --------------------------------------------: |
| OAuth   |                                                 `10` |                           `15min` |                                        `5min` |
| API key |                                                 `15` |                           `30min` |                                       `10min` |

Κάτω από το κατώφλι, ο πάροχος **δεν** θεωρείται ότι βρίσκεται σε παύση· μια επιτυχία καθαρίζει το παράθυρο. Οι εγγραφές σε επίπεδο σύνδεσης (`provider:connectionId`) διατηρούν αντί αυτού το εκθετικό backoff `minRetryCooldownMs → maxRetryCooldownMs`. Παρακάμψεις:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Έλεγχος παλινδρόμησης: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Αδράνεια σύνδεσης

**Εμβέλεια:** σύνδεση/λογαριασμός/κλειδί ενός παρόχου.

**Σκοπός:** παράλειψη ενός προβληματικού κλειδιού, ενώ οι υπόλοιπες συνδέσεις για τον ίδιο πάροχο συνεχίζουν να εξυπηρετούν.

**Υλοποίηση:**

- Σήμανση ως μη διαθέσιμης: `src/sse/services/auth.ts::markAccountUnavailable()`
- Επιλογή: `getProviderCredentials*` στο ίδιο αρχείο
- Υπολογισμός αδράνειας: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Ρυθμίσεις: `src/lib/resilience/settings.ts`

**Πεδία ανά σύνδεση:**

- `rateLimitedUntil` — χρονική σήμανση έως τη λήξη της αδράνειας
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — μετρητής εκθετικής καθυστέρησης

**Προεπιλεγμένες περίοδοι αδράνειας:**

- Βάση OAuth: 5s
- Βάση κλειδιού API: 3s
- Κλειδί API 429: προτιμά τα upstream `Retry-After`/reset headers/κείμενο reset που μπορεί να αναλυθεί
- Καθυστέρηση: `baseCooldownMs * 2 ** failureIndex`

**Καθυστέρηση επανάληψης ανά πάροχο.** Η σελίδα λεπτομερειών του παρόχου διαθέτει μια επιλογή
**Καθυστέρηση επανάληψης** (Αυτόματο, από 15s έως 1h). Αποθηκεύει το
`resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds`
(1–21600, μέσω του `PATCH /api/resilience`). Όταν ένα σφάλμα περιορισμού ρυθμού δεν περιέχει upstream
υπόδειξη επανάληψης, αυτή η τιμή αντικαθιστά την κλιμακούμενη καθυστέρηση για τον πάροχο και επαναφέρει το
`backoffLevel` στο 0 (`open-sse/services/rotationConfig.ts::overrideFor`). Προτεραιότητα για σφάλμα
περιορισμού ρυθμού, από την υψηλότερη προς τη χαμηλότερη: upstream υπόδειξη επανάληψης, έπειτα
`providerSpecificData.rotationOverrides.rateLimitResetSeconds` ανά σύνδεση, έπειτα η καθυστέρηση
επανάληψης ανά πάροχο, έπειτα το env `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`, και τέλος η
κλιμακούμενη καθυστέρηση. Η επιλογή Αυτόματο καταργεί το πεδίο. Επηρεάζει μόνο την αιτία περιορισμού
ρυθμού και ποτέ τις τερματικές καταστάσεις.

**Προστασία από ταυτόχρονες αιχμές:** αποτρέπει την υπερβολική επέκταση της αδράνειας ή τη διπλή αύξηση
του `backoffLevel` από ταυτόχρονες αποτυχίες.

**Τα 429 λόγω ορίου ταυτόχρονων αιτημάτων δεν ανεβαίνουν στη σκάλα καθυστέρησης.** Ένα `429` του οποίου
το σώμα αναφέρει όριο ταυτόχρονων αιτημάτων ("too many concurrent requests", "concurrency limit",
"parallel request limit", GLM `并发数过高`) σημαίνει ότι ο λογαριασμός είναι υγιής αλλά απασχολημένος.
Η `checkFallbackError()` επιστρέφει την αιτία `concurrency_limited`: γίνεται άμεση μετάβαση στην επόμενη
σύνδεση, η συγκεκριμένη σύνδεση τίθεται σε αδράνεια για σταθερό
`CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) ή για την upstream υπόδειξη επανάληψης, το
`backoffLevel` παραμένει αμετάβλητο και ορίζεται το `skipProviderBreaker`.
Ένα ρητό σώμα ποσόστωσης υπερισχύει, επομένως ένα σώμα που ταιριάζει επίσης σε μοτίβο ποσόστωσης
παραμένει απόφαση ποσόστωσης. Εντοπισμός: `looksLikeConcurrencyLimit()` στο
`src/shared/utils/classify429.ts`;
απόφαση: `open-sse/services/accountFallback/concurrencyLimit429.ts`. Η `classify429()` (το
`FailureKind` του breaker) παραμένει αμετάβλητη και εξακολουθεί να διαβάζει το `rate_limit` για αυτά τα σώματα.

**Οι διακοπές στη ροή περιεχομένου δεν θέτουν τον λογαριασμό σε αδράνεια.** Όταν ο watchdog διακοπής
περιεχομένου (`open-sse/utils/streamHandler.ts`) εγκαταλείπει μια ροή που δεν έστειλε έξοδο μοντέλου
εγκαίρως, η `markAccountUnavailable()` καταγράφει το σφάλμα στη σύνδεση, αλλά δεν ορίζει αδράνεια:
η διακοπή αφορά το συγκεκριμένο αίτημα, συχνότερα μια μακρά περίοδο συλλογισμού χωρίς έξοδο ακόμη.
Οι διαχειριστές μπορούν να το ενεργοποιήσουν προαιρετικά μέσω του
`resilienceSettings.streamStallCooldown.enabled` (προεπιλογή `false`).

**Προαιρετικό σήμα καθυστέρησης για την επιλογή λογαριασμού `p2c`.** Κάθε αποστελλόμενη προσπάθεια
καταγράφει τον χρόνο έως το πρώτο byte και την έκβασή της ανά σύνδεση (και ανά σύνδεση + μοντέλο) σε
ένα κυλιόμενο παράθυρο στη μνήμη: τα τελευταία 20 δείγματα εντός 15 λεπτών
(`open-sse/services/connectionLatencyTracker.ts`, η καταγραφή γίνεται από το `safeLogEvents()` στο
`src/sse/handlers/chatHelpers.ts`). Όταν το `resilienceSettings.p2cLatency.weight` είναι μεγαλύτερο
από `0` (εύρος 0-20, προεπιλογή `0` = απενεργοποιημένο), η `compareP2CConnections()` στο
`src/sse/services/auth.ts` προσθέτει έως και `weight` βαθμούς σε κάθε υποψήφιο του ζεύγους.
Οι μισοί από αυτούς προέρχονται από την καθυστέρηση ως αναλογία προς τον ταχύτερο υποψήφιο
(διπλάσια καθυστέρηση σημαίνει ολόκληρο το μισό) και οι άλλοι μισοί από το κυλιόμενο ποσοστό σφαλμάτων.
Ο όρος εφαρμόζεται μόνο όταν και οι δύο υποψήφιοι έχουν τουλάχιστον 3 δείγματα, ώστε να μην
τιμωρούνται οι νέοι λογαριασμοί, και το ανώτατο όριό του παραμένει χαμηλότερο από τις ποινές
αποκλεισμού και εξάντλησης ποσόστωσης. Δεν προσθέτει δικό του κύκλωμα: οι λογαριασμοί που αποτυγχάνουν
εξακολουθούν να διαχειρίζονται από τα επίπεδα αδράνειας, αποκλεισμού και breaker. Ορίστε το με
`PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**Τα πλαίσια συλλογισμού επανεκκινούν τον προϋπολογισμό διακοπής περιεχομένου.** Ένα μοντέλο
συλλογισμού μπορεί να σκέφτεται για λεπτά πριν από το πρώτο ορατό token: το Claude μεταδίδει πλαίσια
`thinking_delta` των οποίων το κείμενο συλλογισμού μπορεί να είναι κενό, ενώ το Responses API
μεταδίδει το ένα στοιχείο συλλογισμού μετά το άλλο. Η `isReasoningProgressFrame()`
(`open-sse/utils/streamReadiness.ts`) αναγνωρίζει αυτά τα πλαίσια και ο watchdog επανεκκινεί τον
προϋπολογισμό του σε καθένα από αυτά αντί να ακυρώνει τη σειρά. Δεν αποτελούν έξοδο μοντέλου,
επομένως μια σειρά που τελειώνει μόνο με συλλογισμό εξακολουθεί να αναφέρεται ως κενή, ενώ μια σειρά
που σταματά τον συλλογισμό και στέλνει μόνο heartbeats εξακολουθεί να ενεργοποιεί τον watchdog.

Τα δυαδικά πλαίσια `reasoningContentEvent` του Kiro με μη κενή υπογραφή διατηρούν αυτή τη δραστηριότητα
συλλογισμού μέσω του executor ως ένα κενό delta `reasoning_content`. Η υπογραφή δεν προωθείται.
Τα μεταδεδομένα, τα ελλιπή πλαίσια και οι κενές υπογραφές δεν επανεκκινούν τον προϋπολογισμό
περιεχομένου· το ανεξάρτητο χρονικό όριο ενεργής ροής και η ακύρωση από τον πελάτη εξακολουθούν να
ισχύουν (`open-sse/executors/kiro/reasoning.ts`).

**Τερματικές καταστάσεις (ΟΧΙ περίοδοι αδράνειας):**

- `banned` — ορίζεται από τον εντοπισμό απαγορευμένων λέξεων / αποκλεισμού λογαριασμού (δείτε το [BAN_DETECTION](../security/BAN_DETECTION.md)). Οι upstream αρνήσεις ανά αίτημα (`request_rejected`, π.χ. Anthropic OAuth 403 "Request not allowed") δεν το ορίζουν: καταμετρώνται ανά σύνδεση και μοντέλο και αφαιρούν το συγκεκριμένο μοντέλο από την εναλλαγή με αυξανόμενη αδράνεια που περιορίζεται από το `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h), ή θέτουν τη σύνδεση σε αδράνεια όταν δεν είναι γνωστό κανένα μοντέλο — `open-sse/services/requestRejectedStreak.ts`
- `expired` (μεταβαίνει σε τερματική κατάσταση μετά από περιορισμένες επαναλήψεις — `EXPIRED_RETRY_MAX = 3` με εκθετική καθυστέρηση — ώστε τα παροδικά σφάλματα OAuth να μπορούν να αποκατασταθούν αυτόματα πριν απενεργοποιηθεί ο λογαριασμός οριστικά)
- `credits_exhausted`

Αυτά παραμένουν μέχρι να αλλάξουν τα διαπιστευτήρια ή να τα επαναφέρει ένας χειριστής. Μην αντικαθιστάτε τις τερματικές καταστάσεις με προσωρινή κατάσταση cooldown.

**Lazy recovery:** όταν το `rateLimitedUntil` έχει παρέλθει, η σύνδεση γίνεται ξανά επιλέξιμη. Μετά από επιτυχή χρήση, η `clearAccountError()` διαγράφει όλα τα πεδία σφάλματος.

### Τείχος χρήσης Claude OAuth: λωρίδα χαμηλότερης προτεραιότητας + επαναφορά ορίου περιόδου σύνδεσης

**Εμβέλεια:** μία σύνδεση συνδρομής Claude (OAuth). Και οι δύο δυνατότητες είναι **προαιρετικές ανά σύνδεση** (Edit connection → ενότητα Claude → `lowPriorityMode` / `autoLimitReset` στο `providerSpecificData`, και οι δύο απενεργοποιημένες από προεπιλογή) και αντικατοπτρίζουν τις εντολές `/low-priority` και `/limit-reset` του Claude Code (το πρωτόκολλο wire καταγράφηκε από το Claude Code 2.1.263).

**Υλοποίηση:**

- Μηχανή καταστάσεων + ταξινόμηση αποκρίσεων: `open-sse/services/claudeLowPriority.ts`
- Πελάτης κατάστασης/claim επαναφοράς: `open-sse/services/claudeLimitReset.ts`
- Hook εκτελεστή (έγχυση κεφαλίδας + επανάληψη με τον ίδιο λογαριασμό): `open-sse/executors/base.ts::execute()`
- Αποθήκευση opt-in: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Ενεργοποίηση:** το τείχος χρήσης των 5 ωρών — ένα `429` του οποίου οι κεφαλίδες περιέχουν
`anthropic-ratelimit-unified-status: rejected` και, όταν ο λογαριασμός είναι επιλέξιμος,
`anthropic-ratelimit-unified-slow-offer: treatment`. Δεν αποστέλλεται τίποτα πριν από το πρώτο
τείχος `429`· ένα burst `429` χωρίς ενοποιημένες κεφαλίδες ακολουθεί τη συνήθη διαδρομή cooldown.

**Λωρίδα χαμηλότερης προτεραιότητας** (`lowPriorityMode`):

- Στο τείχος `429`, ο εκτελεστής αποδέχεται την προσφορά και επαναλαμβάνει αμέσως το **ίδιο**
  αίτημα με τον ίδιο λογαριασμό, με `anthropic-usage-limit: slow`· η λωρίδα παραμένει ενεργή μέχρι το ανακοινωμένο
  `anthropic-ratelimit-unified-reset` (+ περιθώριο 60 δευτερολέπτων) και κάθε αίτημα σε αυτό το διάστημα φέρει
  την κεφαλίδα. Το intercepted `429` δεν φτάνει ποτέ στο `handleChatCore`, επομένως η σύνδεση
  **δεν** τίθεται σε cooldown και δεν γίνεται εναλλαγή σε άλλη σύνδεση.
- Το `anthropic-ratelimit-unified-slow-status` σε μεταγενέστερες αποκρίσεις: οι τιμές `active` / `not_needed`
  διατηρούν τη λωρίδα· το `slot_busy` (`429`) ή ένα `529` περιμένουν το
  `anthropic-ratelimit-unified-slow-retry-after` του διακομιστή (προεπιλογή 20 δευτ., περιορισμός 5–600 δευτ., jitter ±30%)
  και επαναλαμβάνουν, με ανώτατο όριο το `anthropic-ratelimit-unified-slow-max-wait` (προεπιλογή 20 λεπτά, περιορισμός
  1 λεπτό–6 ώρες) — μετά από αυτό η λωρίδα τερματίζεται και ένα cool-off 10 λεπτών αποκλείει την εκ νέου αποδοχή. Η
  αναμονή περιορίζεται επιπλέον από τον χρόνο που απομένει για το δικό του timeout έναρξης upstream του αιτήματος
  (`resolveFetchStartTimeout`, 10 λεπτά από προεπιλογή), μείον περιθώριο 5 δευτερολέπτων: χωρίς αυτό το όριο, το
  προεπιλεγμένο max-wait των 20 λεπτών θα ξεπερνούσε τη διάρκεια ζωής του αιτήματος και ο ύπνος θα διακοπτόταν
  στη μέση της αναμονής, εμφανίζοντας ένα `TimeoutError` αντί για ομαλό τερματισμό `max_wait` + cool-off.
- Τα `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, η μετακύλιση του παραθύρου 5 ωρών ή το
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (που το τερματίζει ως
  `extra_usage` σε οποιαδήποτε κατάσταση, καθώς η επί πληρωμή υπέρβαση καλύπτει πλέον το τείχος) τερματίζουν τη λωρίδα·
  στη συνέχεια η απόκριση ακολουθεί τη συνήθη διαδρομή cooldown. Το `budget_exhausted` διατηρείται μέχρι την
  ανακοινωμένη επαναφορά του προϋπολογισμού (≤ 8 ημέρες).
- Ο έλεγχος του τείχους εκτελείται μετά τις εσωτερικές επαναλήψεις του εκτελεστή που προκαλούνται από `400`
  (επεξεργασία περιβάλλοντος, περιορισμοί thinking/effort, αυτόματη εκμάθηση παραμέτρων), επομένως ένα τείχος `429`
  που εμφανίζεται μόνο σε μία από αυτές τις επαναλήψεις εξακολουθεί να intercepted αντί να φτάσει στη διαδρομή cooldown.
- Η κατάσταση διατηρείται στη μνήμη ανά σύνδεση (μια επανεκκίνηση απαιτεί ένα επιπλέον τείχος `429` για εκ νέου αποδοχή).

**Επαναφορά ορίου περιόδου σύνδεσης** (`autoLimitReset`, δοκιμάζεται πριν από τη λωρίδα όταν είναι ενεργοποιημένες και οι δύο):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → μπλοκ
  `juniper_tide`· όταν `arm: "reset"` και `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` με
  `{ "program": "juniper_tide" }` (το UUID οργανισμού από το `providerSpecificData.organizationUUID`, με εφεδρική τιμή από το bootstrap).
- `result: reset|not_limited` → το αίτημα επαναλαμβάνεται με πλήρη ταχύτητα (χωρίς slow header).
  Τα `already_used` / `not_offered` απομνημονεύουν το `next_available_at` (προεπιλογή μία εβδομάδα)· κάθε
  αποτυχία επιβάλλει αναμονή 15 λεπτών. Η επαναφορά πραγματοποιείται μία φορά την εβδομάδα και εξακολουθεί να
  υπολογίζεται στο εβδομαδιαίο όριο.

Προστασίες παλινδρόμησης: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Συνάφεια περιόδου σύνδεσης (#7274)

**Εμβέλεια:** μία περίοδος σύνδεσης πελάτη (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` header)
καρφιτσώνεται σε μία σύνδεση, για **οποιονδήποτε** πάροχο.

**Σκοπός:** διατήρηση ενός agent πολλαπλών γύρων (Claude Code, aider, προσαρμοσμένοι agents) στον ίδιο λογαριασμό
μεταξύ αιτημάτων, μειώνοντας την απώλεια περιβάλλοντος μεταξύ λογαριασμών και τις επαναλαμβανόμενες 429 κατά την
ψυχρή εκκίνηση σε παρόχους με κατάσταση περιόδου σύνδεσης ανά λογαριασμό.

**Υλοποίηση:**

- Επίλυση TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Επιλογή/δημιουργία pin: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Εξαγωγή κεφαλίδας (γενική, οποιοσδήποτε πάροχος): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Πίνακας αποθηκευμένων pin: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Ρύθμιση: `sessionAffinityTtlMs` (καθολικό TTL σε ms, το `0` απενεργοποιεί τη λειτουργία) — `src/lib/db/settings.ts`. Μετονομάστηκε από το `codexSessionAffinityTtlMs`, που αφορούσε μόνο το Codex, μέσω της μετανάστευσης `124_generic_session_affinity_ttl.sql`, η οποία μεταφέρει οποιοδήποτε TTL Codex είχε ρυθμιστεί προηγουμένως ως τη νέα προεπιλογή.

Πριν από το #7274, η `resolveSessionAffinityTtlMs()` τερματιζόταν άμεσα με τιμή `0` για κάθε πάροχο εκτός του
`codex`, επομένως η ρύθμιση TTL (και οι κεφαλίδες περιόδου σύνδεσης) δεν είχε αποτέλεσμα πουθενά αλλού, παρότι ο
μηχανισμός pinning και η εξαγωγή κεφαλίδων ήταν ήδη ανεξάρτητα από τον πάροχο. Η διόρθωση αφαίρεσε αυτή την πρώιμη
επιστροφή· το TTL εφαρμόζεται πλέον ομοιόμορφα σε κάθε πάροχο, όταν οριστεί καθολικά σε τιμή μεγαλύτερη από `0`.

Οι τρεις κεφαλίδες συνάφειας περιόδου σύνδεσης δεν προωθούνται ποτέ upstream — οι εκτελεστές δημιουργούν τις δικές
τους κεφαλίδες upstream από την αρχή αντί να προωθούν τις κεφαλίδες του πελάτη, επομένως αυτό παραμένει μόνο ένα
εσωτερικό αναγνωριστικό συσχέτισης.

### Αποκλειστικές μισθώσεις συνδέσεων διαχειριζόμενων περιόδων σύνδεσης

**Εμβέλεια:** ένας ενεργός διαχειριζόμενος πελάτης HTTP/συνεδρία κατέχει μία επιλέξιμη σύνδεση OmniRoute.

**Σκοπός:** παροχή ανθεκτικής αποκλειστικής κατοχής σύνδεσης για πελάτες που χρειάζονται αυστηρό
φράγμα δρομολόγησης μεταξύ αιτημάτων. Αυτό διαφέρει από τη συγγένεια συνεδρίας, η οποία είναι μια
ήπια προτίμηση συνέχειας: μια αποκλειστική μίσθωση διατηρεί την κατάσταση του κύκλου ζωής στο SQLite,
επιβάλλει καθολική μοναδικότητα ενεργού κατόχου και ενεργής σύνδεσης και απορρίπτει μια παρωχημένη
γενιά πριν από τη διαβίβαση στον πάροχο.

Η δυνατότητα ενεργοποιείται προαιρετικά ανά κλειδί API. Ένα διαχειριζόμενο κλειδί πρέπει να διαθέτει
το πεδίο `lease:exclusive` και μια ρητή, μη κενή λίστα `allowedConnections`. Κάθε πελάτης HTTP μπορεί
να χρησιμοποιήσει το τελικό σημείο κύκλου ζωής· δεν απαιτούνται όνομα πελάτη, user-agent, πάροχος,
μέθοδος OAuth ή μοντέλο. Η μίσθωση κατέχει μια σύνδεση, όχι ένα μοντέλο, επομένως η αλλαγή μοντέλου
διατηρεί τη σύνδεση, όσο αυτή παραμένει κανονικά επιλέξιμη. Οι κανονικοί κανόνες μοντέλου, ορίου,
υγείας, περιόδου αναστολής και λίστας επιτρεπόμενων παραμένουν καθοριστικοί και μπορούν να
μετακινήσουν την ίδια γενιά σε άλλη ελεύθερη επιλέξιμη σύνδεση.

Ο κύκλος ζωής είναι `POST /api/v1/session-leases` με ενέργειες JSON `acquire`, `renew` και `release`.
Τα διαχειριζόμενα αιτήματα συμπερασμάτων παρέχουν την αδιαφανή τιμή
`X-OmniRoute-Lease-Owner` και την ακριβή `X-OmniRoute-Lease-Generation`. Ο κάτοχος χρησιμοποιεί το
`vlo_` ακολουθούμενο από 43 χαρακτήρες base64url· αποθηκεύεται μόνο ο κατακερματισμός SHA-256.
Κάθε φράγμα τελικής διαβίβασης συνδέει επίσης το αναγνωριστικό του πιστοποιημένου κλειδιού API και
το αναγνωριστικό της ενεργής σύνδεσης. Οι κεφαλίδες ελέγχου μίσθωσης αφαιρούνται από τα αρχεία
καταγραφής, τα διατηρούμενα στιγμιότυπα αιτημάτων και τις κεφαλίδες του εκτελεστή ανάντη.

Αν η κανονική δρομολόγηση έχει επιλέξιμους διαχειριζόμενους υποψηφίους, αλλά κάθε ελεύθερος
υποψήφιος καταλαμβάνεται από ξένη ενεργή μίσθωση, το OmniRoute επιστρέφει HTTP `429`, τον κωδικό
`lease-capacity-unavailable`, κατάσταση αναμονής για διαθεσιμότητα και περιορισμένο
`Retry-After`, που προκύπτει από την παλαιότερη σχετική λήξη. Η κανονική απουσία επιλέξιμων
υποψηφίων δεν αποτελεί ανταγωνισμό για μίσθωση και διατηρεί τη σημασιολογία των υφιστάμενων
σφαλμάτων δρομολόγησης.

Οι σχετικοί μηχανισμοί παραμένουν ξεχωριστοί:

- Η κατοχή συνεδρίας OAuth είναι κατανομή μικρής διάρκειας, τοπική στη διεργασία, για λογαριασμούς OAuth.
- Τα σημαφόρα λογαριασμού εκχωρούν άδειες ταυτόχρονων αιτημάτων και τερματίζονται όταν ολοκληρωθεί ένα αίτημα.
- Οι αποκλειστικές μισθώσεις διαχειριζόμενων συνεδριών είναι ανθεκτική κατοχή κύκλου ζωής με φράγμα γενιάς.

## 3. Κλείδωμα μοντέλου

**Εμβέλεια:** τριάδα provider + connection + model.

**Εμβέλεια κλειδιού ανά κατάσταση:** η κατάσταση που απέτυχε καθορίζει το κλειδί στο οποίο γράφεται ένα κλείδωμα
(`resolveLockoutScope()` στο `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — σήμα ποσόστωσης ή δικαιωμάτων — κλειδώνει την **οικογένεια ποσόστωσης**:
  για το codex ολόκληρη την εμβέλεια `codex` / `spark` (κάθε μοντέλο
  `gpt-5*` της σύνδεσης), ενώ για άλλους providers το
  `getQuotaScopedModelForProvider()`.
- Το `404` κλειδώνει το βασικό μοντέλο (`getModelLockKey()` περιορίζει το `not_found`).
- Οποιαδήποτε άλλη κατάσταση — αποτυχίες μεταφοράς/διακομιστή `5xx` και το
  συνθετικό `502` του OmniRoute από την επικύρωση ποιότητας — κλειδώνει μόνο την **ακριβή**
  πλειάδα provider/connection/model. Μια προβληματική ροή σε ένα μοντέλο δεν αποτελεί ένδειξη
  για την ποσόστωση του λογαριασμού· πριν από αυτόν τον κανόνα, μία κενή απόκριση στο
  `codex/gpt-5.6-luna` αφαιρούσε κάθε μοντέλο `gpt-5*` αυτής της σύνδεσης από
  τη δρομολόγηση για 2–30 λεπτά (με κλιμάκωση), ενώ η ποσόστωσή της παρέμενε ανέγγιχτη.
- Η ρητή επιλογή `scope` του caller υπερισχύει πάντα (το Antigravity περνά `"exact"`).

**Σκοπός:** αποφυγή απενεργοποίησης ολόκληρης σύνδεσης όταν μόνο ένα μοντέλο δεν είναι διαθέσιμο ή περιορίζεται από ποσόστωση.

**Παραδείγματα:**

- Providers ανά μοντέλο που επιστρέφουν 429
- Τοπικοί providers που επιστρέφουν 404 για ένα μοντέλο που λείπει
- Αποτυχίες δικαιωμάτων provider-specific mode/model (π.χ. modes του Grok)

**Υλοποίηση:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Πίνακας ελέγχου cooldown μοντέλων (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Παραθέτει τα ενεργά κλειδώματα με: provider, connection, model, reason, expiresAt. Οι χειριστές μπορούν να ενεργοποιήσουν ξανά χειροκίνητα ένα μοντέλο από την κάρτα.

**REST API:**

- `GET /api/resilience/model-cooldowns` — λίστα ενεργών κλειδωμάτων
- `DELETE /api/resilience/model-cooldowns` — χειροκίνητη επανενεργοποίηση. Body: `{provider, connection, model}`. Auth: management.

### Διαχειριστής cooldown

UI: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Μία σελίδα για κάθε connection που βρίσκεται εκτός δρομολόγησης για παροδικό λόγο, αντί
να ανοίγετε τη σελίδα κάθε provider ξεχωριστά. Παραθέτει cooldown συνδέσεων, κλειδώματα μοντέλων και
τελικές καταστάσεις, τα εκκαθαρίζει ανά connection, για μια επιλογή ή για όλες τις συνδέσεις ενός provider,
και επεξεργάζεται τους συχνότερα ρυθμιζόμενους κανόνες cooldown: `streamStallCooldown.enabled` και το βασικό cooldown
`connectionCooldown` και τα μέγιστα βήματα backoff για OAuth / API-key
(αποθηκεύονται μέσω `PATCH /api/resilience`). Οι τελικές καταστάσεις (`banned`, `expired`, `credits_exhausted`) παρατίθενται,
αλλά δεν εκκαθαρίζονται ποτέ εδώ.

Η κάρτα **Κανόνες cooldown σφαλμάτων** στην ίδια σελίδα επεξεργάζεται τους κανόνες σφαλμάτων χειριστή
(`settings.providerErrorRules`) και τις προεπιλογές catch-all ανά provider
(`settings.providerErrorDefaults`) μέσω `PATCH /api/settings` — δείτε την ενότητα «Κανόνες
που δηλώνονται από τον χειριστή» στην §7 για τον τρόπο αντιστοίχισής τους. Οι διάρκειες είναι Προεπιλογή (χωρίς ρητό cooldown), 30 λεπτά,
1 ώρα, 5 ώρες, 24 ώρες ή μια προσαρμοσμένη τιμή από 1 έως 43.200 λεπτά (30 ημέρες).

**REST API** (`src/lib/resilience/cooldownManager.ts`, auth: management):

- `GET /api/resilience/cooldowns[?provider=]` — connections με κατάσταση, εναπομείναν cooldown,
  επίπεδο backoff, τύπο τελευταίου σφάλματος και κλειδώματα μοντέλων (χωρίς διαπιστευτήρια)
- `POST /api/resilience/cooldowns` — body `{connectionIds: string[]}` ή
  `{all: true, provider?}`· επιστρέφει `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI ρυθμίσεων κλειδώματος μοντέλων + αποκατάσταση με μείωση μετά από επιτυχία (v3.8.23)

Το κλείδωμα μοντέλων μετατράπηκε από συμπεριφορά που ήταν πάντα ενεργή και hardcoded σε ένα πλήρως ρυθμιζόμενο,
προαιρετικό χαρακτηριστικό με τη δική του κάρτα ρυθμίσεων και μια διαδρομή αυτοθεραπευόμενης αποκατάστασης.

**Κάρτα ρυθμίσεων:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Αυτή είναι **διαφορετική** από την κάρτα μόνο για ανάγνωση `ModelCooldownsCard` παραπάνω (η οποία απλώς
_παραθέτει_ τα ενεργά κλειδώματα) — η νέα κάρτα _ρυθμίζει τις παραμέτρους_. Οι προεπιλογές βρίσκονται στο `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Ρύθμιση                 | Προεπιλογή                       | Σημασία                                                                            |
| ----------------------- | -------------------------------- | ---------------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Κύριος διακόπτης — το κλείδωμα μοντέλων είναι **απενεργοποιημένο από προεπιλογή**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Καταστάσεις upstream που υπολογίζονται ως αποτυχία στο επίπεδο μοντέλου.           |
| `baseCooldownMs`        | `120_000` (120 s)                | Αρχική διάρκεια κλειδώματος για την πρώτη αποτυχία.                                |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Ανώτατο όριο για το κλιμακωμένο cooldown.                                          |
| `maxBackoffSteps`       | `10`                             | Μέγιστος αριθμός βημάτων κλιμάκωσης εκθετικού backoff.                             |
| `useExponentialBackoff` | `true`                           | Αν οι επαναλαμβανόμενες αποτυχίες κλιμακώνουν εκθετικά το cooldown.                |

Οι ρυθμίσεις αποθηκεύονται μέσω του κανονικού store ρυθμίσεων και επικυρώνονται μέσω του σχήματος ρυθμίσεων
ανθεκτικότητας· η κάρτα περιορίζει τα `baseCooldownMs`/`maxCooldownMs`
(με `maxCooldownMs ≥ baseCooldownMs`) και το `maxBackoffSteps`.

**Αποκατάσταση με μείωση μετά από επιτυχία:** η αποκατάσταση **δεν** βασίζεται αποκλειστικά στη λήξη του χρονομέτρου. Μια υγιής
απόκριση μειώνει σταδιακά τον μετρητή αποτυχιών του μοντέλου, ώστε ένα μοντέλο που αποκαταστάθηκε
εντός του παραθύρου να σταματά την κλιμάκωση (και να ξεκλειδώνει) πριν από τη λήξη του χρονομέτρου. Σε έναν επιτυχημένο στόχο combo, το `open-sse/services/combo.ts` καλεί το `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), το οποίο **υποδιπλασιάζει** το αποθηκευμένο
`failureCount` (`Math.floor(failureCount / 2)`): όταν φτάσει το `0`, η καταχώριση κλειδώματος διαγράφεται πλήρως. Η αντίστοιχη
`recordModelLockoutFailure()` αυξάνει τον μετρητή (και κλιμακώνει το cooldown) σε αποτυχίες εντός του παραθύρου κλιμάκωσης. Αυτή η μείωση μετά από επιτυχία προστίθεται στην απλή λήξη του χρονομέτρου —
οποιαδήποτε από τις δύο διαδρομές μπορεί να ενεργοποιήσει ξανά ένα μοντέλο.

**Κατάσταση:** οι αποκλεισμοί διατηρούνται **στη μνήμη** ( `Map`s ανά διεργασία του `ModelLockoutEntry`, με κλειδιά
`provider:connectionId:model`, ενώ οι αποκλεισμοί ακριβούς εμβέλειας έχουν κλειδιά
`provider:connectionId:exact:model`), δεν αποθηκεύονται στη
βάση δεδομένων — χάνονται κατά την επανεκκίνηση. Οι _ρυθμίσεις_ αποθηκεύονται· η ενεργή _κατάσταση αποκλεισμού_ είναι εφήμερη.

---

## 4. Έλεγχος ταυτόχρονων αιτημάτων με κατανομή ποσόστωσης (v3.8.36)

Οι λογαριασμοί συνδρομών (GLM, MiniMax κ.λπ.) συχνά αποδέχονται μόνο ~1–3 ταυτόχρονα
αιτήματα· η υπέρβαση αυτού του ορίου ενεργοποιεί 429 και περιόδους cooldown. Αυτό είναι ιδιαίτερα
έντονο σε συνδυασμούς **quota-share** (`qtSd/…`), όπου πολλά API keys μοιράζονται έναν upstream
λογαριασμό. Τρία επίπεδα προστατεύουν έναν κοινόχρηστο λογαριασμό από υπερφόρτωση.

### Όριο ταυτόχρονων αιτημάτων ανά σύνδεση (`max_concurrent`)

Κάθε σύνδεση παρόχου μπορεί να δηλώσει ένα ανώτατο όριο `max_concurrent`
(`provider_connections.max_concurrent`, που ορίζεται στο παράθυρο σύνδεσης / API / DB).
Αφήστε το κενό για να μην υπάρχει όριο. Αυτή είναι η μοναδική ρύθμιση που ενεργοποιεί το επίπεδο
σειριοποίησης παρακάτω — ορίστε την στην πραγματική ταυτόχρονη χωρητικότητα του λογαριασμού
(π.χ. GLM ~1, MiniMax ~2).

### Όρια ταυτόχρονων αιτημάτων ανά μοντέλο (`modelConcurrency`)

Μια σύνδεση μπορεί επιπλέον να δηλώσει ακριβή όρια ταυτόχρονων αιτημάτων ανά μοντέλο
μέσα στον χάρτη `rateLimitOverrides`:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Ορίστε το στο παράθυρο σύνδεσης (**Rate limit overrides → Per-model
concurrency caps**, ένα `model=cap` ανά γραμμή) ή μέσω
`PATCH /api/providers/[id]` με την ίδια μορφή JSON. Σημασιολογία των κλειδιών:

- **Όριο για ολόκληρη τη σύνδεση έναντι ειδικού ορίου μοντέλου:** Το `maxConcurrent` παραμένει το κοινό
  όριο για ολόκληρη τη σύνδεση. Όταν ισχύουν και τα δύο, και οι δύο πύλες αποκτώνται ατομικά
  στην ίδια σύνθετη πύλη
  (`global → provider → account → model`)· η αποτελεσματική συμπεριφορά καθορίζεται από το
  αυστηρότερο ισχύον όριο.
- **Ακριβής αντιστοίχιση κλειδιού μοντέλου:** Το κλειδί είναι η συμβολοσειρά μοντέλου που
  περνά στον executor μετά την επίλυση της δρομολόγησης — συνήθως το γυμνό upstream model id
  (`glm-5`), όχι ένα ψευδώνυμο `provider/model` στην πλευρά του client (`zai/glm-5` δεν
  αντιστοιχεί στο `glm-5`). Οι τιμές είναι θετικά ακέραια όρια ταυτόχρονων αιτημάτων.
- **Τοπική τοποθέτηση σε ουρά, χωρίς ανακάλυψη:** Τα επιπλέον αιτήματα τοποθετούνται τοπικά σε ουρά
  με την υπάρχουσα σημασιολογία ουράς/χρονικού ορίου (τυποποιημένα σφάλματα εισαγωγής
  `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL`). Το OmniRoute δεν ανακαλύπτει ούτε
  συμπεραίνει την πολιτική του upstream — επιβάλλει τα ακριβή όρια που έχει ρυθμίσει ο
  διαχειριστής. Μια κορεσμένη πύλη μοντέλου δεν απενεργοποιεί ποτέ τον πάροχο και δεν
  δημιουργεί μόνιμο αποκλεισμό του μοντέλου· η συμπεριφορά 429/cooldown/fallback του upstream
  παραμένει η εφεδρική αντιμετώπιση σφαλμάτων.
- **Εμβέλεια ανά σύνδεση και ανά διεργασία:** Τα όρια ισχύουν ανά σύνδεση βάσης δεδομένων
  και διατηρούνται στη μνήμη, επομένως δύο συνδέσεις που επαναχρησιμοποιούν το ίδιο upstream API key
  δεν συγχρονίζονται μεταξύ τους.
- **Η μη ρύθμιση σημαίνει καμία αλλαγή:** Η παράλειψη του χάρτη (ή η παραμονή του
  πεδίου του πίνακα ελέγχου κενού) δεν προσθέτει πύλη μοντέλου. Παράδειγμα ρύθμισης χωρίς
  να επιβάλλεται καθολικό όριο παρόχου:

```text
glm-5=1
glm-4.7=3
```

### Σειριοποίηση αιτημάτων quota-share

Όταν μια αποστολή quota-share στοχεύει μια σύνδεση που δηλώνει θετικό
`max_concurrent`, τα ταυτόχρονα αιτήματα προς αυτόν τον **λογαριασμό** σειριοποιούνται μέσω ενός
semaphore ανά σύνδεση (κλειδί `qsconn:<connectionId>`): τα επιπλέον αιτήματα **περιμένουν
στην ουρά** αντί να υπερφορτώνουν τον λογαριασμό. Είναι **fail-open** — μια κορεσμένη
ουρά ή ένα χρονικό όριο συνεχίζει χωρίς θέση, αντί να απορρίψει ποτέ ένα αίτημα που μπορεί να
αποσταλεί. Ενεργοποιείται από το **Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, προεπιλογή
on). Χωρίς όριο `max_concurrent`, η συμπεριφορά παραμένει αμετάβλητη.

> Η πύλη δρομολόγησης quota-share (`selectQuotaShareTarget`, DRR + P2C) είναι από μόνη της
> fail-open και απλώς _υποβαθμίζει την προτεραιότητα_ μιας σύνδεσης που βρίσκεται στο όριο — με
> pool μίας σύνδεσης δεν μπορεί να επιβάλει σκληρό όριο, επομένως αυτό το semaphore είναι
> που στην πράξη περιορίζει την υπερφόρτωση.

### Επανάληψη με επίγνωση του cooldown combo

Για κάθε στρατηγική combo (όταν είναι ενεργοποιημένη), ένα αίτημα που θα προκαλούσε 429
για ένα ΣΥΝΤΟΜΟ παροδικό cooldown περιμένει να ολοκληρωθεί και αποστέλλεται ξανά αντί να
επιστρέψει το 429 — αυτό καλύπτει παράθυρα TPM/RPM κλάσης Gemini (~60s retry-after)
σε combo πολλών μοντέλων, π.χ. όταν και οι δύο στόχοι ενός combo 2 μοντέλων φτάσουν ένα
όριο ρυθμού ανά μοντέλο. Ελέγχεται από το `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) στο **Settings → Resilience**. Δεν περιμένει ποτέ για
`quota_exhausted` (κλειδωμένο μέχρι τα μεσάνυχτα) ή για λόγους auth/not-found.

Ένα combo μπορεί να εξαιρεθεί με `config.comboCooldownWaitEnabled: false`. Μόνο η κυριολεκτική
τιμή `false` απενεργοποιεί αυτές τις κοινόχρηστες αναμονές combo (cooldown μετά την αποστολή
και αναμονές circuit-open/model-lock πριν την αποστολή) και την επέκταση του ελάχιστου χρονικού
ορίου λόγω προϋπολογισμού αναμονής. Η απουσία ή η τιμή `true` διατηρεί την καθολική πολιτική·
η τιμή `true` δεν μπορεί να ενεργοποιήσει την αναμονή όταν είναι καθολικά απενεργοποιημένη.
Ένα ρητό `targetTimeoutMs` εξακολουθεί να υπερισχύει. Αυτή η εξαίρεση δεν αλλάζει την
ξεχωριστή εγγενή αναμονή pin του turn του Codex πριν από την αποστολή.

Η ίδια πύλη καλύπτει την περίπτωση πριν από την αποστολή (#16319): όταν κάθε στόχος ενός
combo παραλείπεται πριν γίνει οποιαδήποτε απόπειρα, επειδή το μοντέλο του βρίσκεται σε σύντομο
παροδικό αποκλεισμό, η διαδρομή μηδενικών αποπειρών περιμένει να λήξει ο αποκλεισμός με τα ίδια
όρια και αποστέλλει ξανά, αντί να επιστρέψει το `503 ALL_TARGETS_SKIPPED` χωρίς υπόδειξη.
Όταν δεν επιτρέπεται αναμονή (εξαντλήθηκε το όριο, ο αριθμός αποπειρών ή ο προϋπολογισμός,
ή η δυνατότητα είναι απενεργοποιημένη), η τελική απόκριση αναβαθμίζεται σε
`429 rate_limit_error`, μεταφέροντας τα `retry_after` / `reset_at` από την παλαιότερη
λήξη παροδικού αποκλεισμού· οι αποκλεισμοί quota, auth και not-found διατηρούν το 503 χωρίς
υπόδειξη.

```text
#16319 · comboCooldownWait · pre-dispatch (attempts = 0)
all targets skipped + transient model lockout:
  enabled ∧ 0 < waitMs ≤ maxWaitMs ∧ attempt < maxAttempts ∧ budgetLeftMs ≥ waitMs
    → wait → re-dispatch
  wait = false → HTTP 429 rate_limit_error
  retry_after / reset_at ← earliest transient lock expiry
quota_exhausted / auth_error / not_found / not_found_local:
  no transient hint → HTTP 503 ALL_TARGETS_SKIPPED
```

---

## 5. Έλεγχος Αποδοχής Ουράς Αιτημάτων (v3.8.49 · issue #6593)

**Εύρος**: η τοπική ουρά ορίου ρυθμού ανά πάροχο+σύνδεση (`open-sse/services/rateLimitManager.ts`,
με υποστήριξη από το Bottleneck), ένα επίπεδο κάτω από τους τρεις μηχανισμούς παραπάνω.

**Το `maxWaitMs` θέτει όριο στην αναμονή στην ουρά· το `executionMaxWaitMs` θέτει όριο στην εκτέλεση.**
Τα δύο είναι σκόπιμα ξεχωριστά και κανένα δεν τροφοδοτεί το άλλο.

Το `resilienceSettings.requestQueue.maxWaitMs` είναι ο **προϋπολογισμός αναμονής στην ουρά**: καλύπτει
την αναμονή για μια θέση παρόχου και στη συνέχεια την παραμονή σε κατάσταση QUEUED, και ο χρονομετρητής του
μηδενίζεται τη στιγμή που η εργασία εγκαταλείπει το QUEUED και αρχίζει να εκτελείται
(`rateLimitManager.ts`, `wrappedFn`). Ένα αίτημα που τον υπερβαίνει δεν φτάνει ποτέ
στο upstream. Προεπιλογή 30000ms, παρέχεται από το `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
στο `src/lib/resilience/settings.ts` και καρφιτσώνεται από το
`tests/unit/ratelimit-admission-control-6593.test.ts`, ώστε μια αλλαγή σε αυτό να κάνει
εκείνο το τεστ κόκκινο αντί να αφήνει αυτή την παράγραφο σιωπηλά απαρχαιωμένη.

Το `resilienceSettings.requestQueue.executionMaxWaitMs` είναι αυτό που λαμβάνει το Bottleneck
ως `expiration` της εργασίας, του οποίου ο χρονομετρητής ξεκινά μόνο μετά την αποστολή. Είναι
ένα δίχτυ ασφαλείας για εκτελεστές χωρίς δικό τους timeout στο upstream, και
αυξάνεται στο δικό του εκτελεστή timeout έναρξης fetch όταν αυτό είναι μεγαλύτερο, ώστε
να μην μπορεί να κόψει μια υγιή απόκριση εν ώρα πτήσης. Προεπιλογή 600000ms (10 λεπτά).

Η τροφοδοσία του προϋπολογισμού ουράς στο `expiration` είναι αυτό που παλιότερα σκότωνε τις μη
αυξητικές πύλες (non-incremental gateways) στο μέσο της πτήσης — αυτές εκτελούνται νόμιμα για λεπτά πριν από τα πρώτα bytes —
και είναι ο λόγος που ένα expiration εμφανίζεται ως `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) ενώ ο προϋπολογισμός ουράς φέρει τον
κωδικό queue-timeout. Παρακάμψτε οποιοδήποτε από τα δύο μέσω `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) ή του πίνακα ελέγχου
(**Settings → Resilience**). Και τα δύο περιορίζονται (clamp) σε 1ms–24h κατά την κανονικοποίηση.

**Προτεραιότητα, και για τα δύο:** η μεταβλητή περιβάλλοντος παρέχει μόνο την _προεπιλογή_. Μια τιμή
αποθηκευμένη στο `resilienceSettings.requestQueue` (πίνακας ελέγχου / API patch, αποθηκευμένη
στο `key_value`) υπερισχύει αυτής, και ένα ανά σύνδεση
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` υπερισχύει εκείνης. Ο ορισμός
της μεταβλητής περιβάλλοντος σε μια εγκατάσταση που έχει ήδη αποθηκευμένη τιμή επομένως
δεν αλλάζει τίποτα — αντ' αυτού καθαρίστε ή ενημερώστε την αποθηκευμένη ρύθμιση.

Η παραμονή στην ουρά περιορίζεται από το `maxWaitMs`· το `maxQueueDepth` παρακάτω περιορίζει πόσοι
καλούντες μπορούν να βρίσκονται σε ουρά ταυτόχρονα.

**Επαναλήψεις που δηλώνονται στο σώμα: ρύθμιση ρυθμού έναντι αποκλεισμού.** Ένα σώμα 429 μπορεί να ονομάσει τη δική του αναμονή
(Gemini `RetryInfo.retryDelay`, κείμενο "retry after Ns"), την οποία
διαβάζει το `updateFromResponseBody`. Μια αναμονή που χωρά στο `maxWaitMs`
της σύνδεσης είναι ρύθμιση ρυθμού (pacing): ο περιοριστής αδειάζει τη δεξαμενή του για τόσο χρόνο και οι κλήσεις σε ουρά
αποστέλλονται όταν αυτή ξαναγεμίσει. Μια αναμονή μεγαλύτερη από το `maxWaitMs` δεν είναι κάτι που η
ουρά μπορεί να περιμένει — το Gemini απαντά σε εξαντλημένη ημερήσια ποσόστωση με
`retryDelay: "86399s"`. Το αναμεταδιδόμενο `Retry-After` στο ανακατασκευασμένο 429 (#16528)
ήδη κάνει τη μηχανή fallback να κλειδώνει το μοντέλο για εκείνο το παράθυρο, αλλά η παύση
του περιοριστή γι' αυτό επίσης θα καθυστερούσε ακόμα οποιαδήποτε κλήση φτάσει νωρίς στο κλειδί
(μετά από μια επαναφορά resilience, για παράδειγμα) για ολόκληρο το `maxWaitMs`. Όταν μια τέτοια αναμονή προέρχεται από ένα τυποποιημένο πεδίο Google `RetryInfo`
(η προέλευση `google_rpc_retry_info`) και ο περιοριστής του κλειδιού είναι
ήδη προσαρμοσμένος στο μοντέλο (βλ. `getLimiterKey`), το 429 γίνεται αντ' αυτού
αποκλεισμός μοντέλου σε εκείνη τη σύνδεση (`lockModelForLongBodyRetry` στο
`open-sse/services/rateLimitManager/bodyRetryPause.ts`, με ανώτατο όριο 24h), και ο
περιοριστής παραμένει χωρίς παύση. Η επιλογή λογαριασμού παρακάμπτει βάσει αυτού του κλειδώματος μέσω
`isModelLocked()`, και το ίδιο κάνει η πύλη πριν την αποστολή του combo για στόχους καρφιτσωμένους
στη σύνδεση. Στο antigravity, του οποίου ο περιοριστής είναι ανά οικογένεια ποσόστωσης, το κλείδωμα είναι
στο ακριβές μοντέλο, όπως τα άλλα του κλειδώματα ποσόστωσης. Το όνομα που ζήτησε ο πελάτης
κλειδώνεται επίσης όταν ένα alias το ανέλυσε σε εκείνο το μοντέλο, επειδή εκείνοι οι έλεγχοι χρησιμοποιούν
το ζητούμενο όνομα· κλειδώνεται ακριβώς (`lockExactModel`), ώστε ένα alias που
διασχίζει μια οικογένεια ποσόστωσης antigravity ή ένα εύρος codex δεν κλειδώνει ποτέ το δικό του. Μια
υπόδειξη σε πεζό κείμενο, ένα μη τυποποιημένο `retryDelay`, ή ένας
περιοριστής κοινός για ολόκληρη τη σύνδεση διατηρεί την παύση. Όταν ο περιοριστής που
η διαδρομή 429 μόλις ανακατασκεύασε κάνει όντως παύση, ένας καλών του οποίου ο εναπομένων χρόνος ουράς τελειώνει
πριν τελειώσει η παύση απορρίπτεται αμέσως με τον κωδικό queue-timeout
(`checkLimiterPause`) αντί να περιμένει να λήξει εκείνος ο χρόνος· το καταγεγραμμένο τέλος είναι
αγκυροβολημένο πριν δημιουργηθεί ο περιοριστής, εκεί όπου το Bottleneck ξεκινά το ρολόι
ανανέωσής του, και οποιαδήποτε μεταγενέστερη αλλαγή στη δεξαμενή το ξεχνά. Καλύπτεται από
τα `tests/unit/rate-limit-long-body-retry-lockout.test.ts` και
`tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — προαιρετικό όριο αποδοχής (νέο).** Το `resilienceSettings.requestQueue.maxQueueDepth`
περιορίζει πόσα αιτήματα μπορούν να βρίσκονται σε ουρά (δεν έχουν ακόμη αποσταλεί) για έναν
πάροχο+σύνδεση ταυτόχρονα. Όταν η ουρά κρατά ήδη `maxQueueDepth`
αιτήματα, ένα νέο αίτημα απορρίπτεται ταχέως με έναν τυποποιημένο σφάλμα
`code: "RATE_LIMIT_QUEUE_FULL"` **πριν** φτάσει ποτέ στο `limiter.schedule()`
— έτσι η απόρριψη είναι φθηνή και συμβαίνει πριν από οποιαδήποτε downstream
εργασία συμπίεσης prompt / μετάφρασης για εκείνο το αίτημα. Προεπιλογή `0` =
απενεργοποιημένο, διατηρώντας την υπάρχουσα συμπεριφορά ουράς χωρίς όριο· περιορισμένο σε 0–100000.
Παράκαμψη μέσω `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) ή
`resilienceSettings.requestQueue.maxQueueDepth` (πίνακας ελέγχου/API patch).

Ο ίδιος ο έλεγχος αποδοχής είναι μια καθαρή συνάρτηση
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) ώστε
να είναι δυνατός ο έλεγχος μονάδας (unit test) χωρίς πραγματικό περιοριστή Bottleneck.

> Το RFC που άνοιξε το #6593 πρότεινε επίσης μια σημαία
> `bypassCompressionOnRateLimit`. Το pipeline
> `open-sse/services/compression/` αυτού του αποθετηρίου αφορά συμπίεση
> prompt/πλαισίου στο εξερχόμενο αίτημα LLM (`chatCore.ts`, γύρω από το
> μπλοκ `resolveCompressionSettings`/`selectCompressionStrategy`), όχι
> συμπίεση απόκρισης HTTP σε συνθετικά σώματα 429 — δεν υπάρχει αντίστοιχη
> διαδρομή κώδικα για μια κυριολεκτική σημαία παράκαμψης. Αυτό το βήμα
> συμπίεσης prompt εκτελείται επί του παρόντος _πριν_ από το
> `withRateLimit()` στο pipeline του αιτήματος, επομένως η αναδιάταξη ώστε
> να παραλείπεται σε απόρριψη λόγω γεμάτης ουράς είναι μια ξεχωριστή,
> μεγαλύτερη αλλαγή από το εύρος αυτού του issue· σκόπιμα **δεν**
> υλοποιήθηκε εδώ και αφήνεται ως follow-up, αν το κέρδος εξοικονόμησης CPU
> αξίζει τον κίνδυνο της αναδιάταξης.

### Δίχτυ Ασφαλείας Αυτόματης Ενεργοποίησης Rate-Limit & Προστασία Σύνδεσης (`rateLimitProtection`)

**Δίχτυ ασφαλείας αυτόματης ενεργοποίησης** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, προεπιλογή `true`):
Από προεπιλογή, το OmniRoute ενεργοποιεί αυτόματα την προστασία ουράς rate-limit για όλες τις ενεργές συνδέσεις παρόχων με κλειδί API (`getProviderCategory(provider) === "apikey"`). Αυτό διασφαλίζει ότι τα εισερχόμενα αιτήματα προς upstream κλειδιά API με ευαισθησία στον ρυθμό μπαίνουν σε ουρά και περιορίζονται μέσω Bottleneck, αντί να ξεσπούν σε upstream σφάλματα 429. Το δίχτυ ασφαλείας μπορεί να παρακαμφθεί μέσω της μεταβλητής περιβάλλοντος `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` το απενεργοποιεί, `true`/`1`/`on` το επιβάλλει), η οποία υπερισχύει της αποθηκευμένης ρύθμισης του πίνακα ελέγχου (**Ρυθμίσεις → Ανθεκτικότητα** / `PATCH /api/resilience`).

**Σημασιολογία του ανά-σύνδεση `rateLimitProtection`:**
Η ανά-σύνδεση προστασία rate-limit παρακολουθείται μέσω του δυαδικού πεδίου `rateLimitProtection` στις συνδέσεις παρόχων (αποθηκεύεται ως `rate_limit_protection` στην SQLite):

- **Ρητή ενεργοποίηση (`rateLimitProtection === true`)**: Η προστασία rate-limit ενεργοποιείται ρητά για αυτή τη σύνδεση, ανεξάρτητα από την κατηγορία του παρόχου ή από το αν το δίχτυ ασφαλείας αυτόματης ενεργοποίησης είναι ενεργό.
- **Ρητή απενεργοποίηση (`rateLimitProtection === false`)**: Απενεργοποιεί τη ρητή προστασία, αλλά **δεν** εξαιρεί μια ενεργή σύνδεση κλειδιού API από το καθολικό δίχτυ ασφαλείας αυτόματης ενεργοποίησης. Στην `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`), το `false` και το `undefined` είναι ισοδύναμα: μόνο το `rateLimitProtection === true` αντιμετωπίζεται ως ρητή παράκαμψη. Αν το `rateLimitProtection` είναι `false` (ή δεν έχει οριστεί), μια ενεργή σύνδεση κλειδιού API εξακολουθεί να ικανοποιεί τη συνθήκη αυτόματης ενεργοποίησης και παραμένει προστατευμένη από rate-limit.
- **Καμία εξαίρεση ανά σύνδεση**: Ένας χειριστής δεν μπορεί επί του παρόντος να εκφράσει «αυτή η μεμονωμένη ενεργή σύνδεση κλειδιού API πρέπει να λειτουργεί χωρίς προστασία ουράς rate-limit» διατηρώντας παράλληλα την αυτόματη ενεργοποίηση ενεργή για τις υπόλοιπες. Για να λειτουργήσουν οι συνδέσεις κλειδιών API εντελώς χωρίς ουρές rate-limit, το δίχτυ ασφαλείας πρέπει να απενεργοποιηθεί καθολικά (`RATE_LIMIT_AUTO_ENABLE=false` ή `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Υποστηριζόμενες διαδρομές εγγραφής:**

- **`POST /api/rate-limits`**: Η υποστηριζόμενη διαδρομή εγγραφής διαχείρισης για εναλλαγή του `rateLimitProtection` μιας σύνδεσης (`{ connectionId: string, enabled: boolean }`). Η κλήση με `enabled: true` ενεργοποιεί τη ρητή προστασία· η κλήση με `enabled: false` αφαιρεί τη ρητή προστασία (αν και οι ενεργές συνδέσεις κλειδιών API παραμένουν καλυμμένες από το καθολικό δίχτυ ασφαλείας, εφόσον η αυτόματη ενεργοποίηση είναι ενεργή).
- **`PUT /api/providers/[id]`**: Σκόπιμα **δεν** δέχεται ούτε αλλάζει το `rateLimitProtection` (#11278). Η ενημέρωση των μεταδεδομένων σύνδεσης παρόχου μέσω `PUT /api/providers/[id]` δεν θα αλλάξει ποτέ την αποθηκευμένη κατάσταση προστασίας rate-limit.

---

## 6. Επιτηρητής αργής ροής (#9709)

Ο προαιρετικός προφυλακτήρας `resilienceSettings.streamRecovery.throughputWatchdog` ανιχνεύει ένα ανοδικό ρεύμα που εξακολουθεί να στέλνει κομμάτια αλλά παράγει έξοδο βοηθού κάτω από τον ρυθμισμένο ρυθμό ωφέλιμης εξόδου. Διακρίνεται σκόπιμα από το χρονικό όριο αδράνειας: οι καρδιακοί παλμοί και τα μεταδεδομένα δεν επαναφέρουν κανένα χρονόμετρο και δεν υπολογίζονται ως πρόοδος. Διαφέρει επίσης από την προθεσμία σκληρής προσπάθειας (#9153), η οποία παραμένει ένα απόλυτο ανώτατο όριο ασφάλειας ανεξάρτητα από την ποιότητα παραγωγής.

Ο φύλακας απαιτεί μια περίοδο προθέρμανσης που ακολουθείται από ένα πλήρες κυλιόμενο παράθυρο για να μπορέσει να ματαιώσει. Μετρά τα δέλτα κειμένου από συμβάντα εξόδου API Ολοκληρώσεις και Αποκρίσεις (ένας συντηρητικός διακομιστής μεσολάβησης byte UTF-8 ), αγνοεί συμβάντα μόνο για χρήση και κενά και αναστέλλει την κρίση ενώ βρίσκονται σε εξέλιξη συμβάντα κλήσης εργαλείων ή συλλογισμού. Είναι απενεργοποιημένο από προεπιλογή και μπορεί να ενεργοποιηθεί με `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` (αυτή η τιμή env εμφανίζει μόνο το προεπιλεγμένο — κερδίζει ένα αποθηκευμένο `resilienceSettings.streamRecovery.throughputWatchdog.enabled` boolean. δείτε τη σημείωση προτεραιότητας env-vs-dashboard στην κορυφή αυτού του οδηγού). το παράθυρο, η προθέρμανση, ο ελάχιστος ρυθμός και η ελάχιστη μετρήσιμη έξοδος οριοθετούνται από το κανονικό επίπεδο κανονικοποίησης ρυθμίσεων ελαστικότητας.

Όταν είναι ενεργοποιημένη, η ματαίωση του φύλακα εφαρμόζεται μόνο στην ενεργή προσπάθεια ανάντη. Πριν από οποιαδήποτε byte ορατά από τον πελάτη, η υπάρχουσα διαδρομή πρόωρης ανάκτησης του ίδιου λογαριασμού μπορεί να ανοίξει ξανά την προσπάθεια. Μετά τη δέσμευση, η ροή δεν επαναλαμβάνεται ποτέ στα τυφλά. μόνο το υπάρχον ασφαλές συμβόλαιο συνέχισης στη μέση ροή μπορεί να συρράψει ένα επίθημα. Η οριστικοποίηση παραμένει απλή, επομένως η λογιστική χρήσης και η έκδοση σηματοφόρου δεν είναι διπλές.

---

## 7. Επαναδιατύπωση κατάστασης upstream (λανθασμένα σφάλματα quota)

**Εμβέλεια:** μία πύλη upstream που αναφέρει προσωρινή εξάντληση quota με λανθασμένη κατάσταση HTTP.

**Σκοπός:** διόρθωση μιας παραπλανητικής κατάστασης ΠΡΙΝ από την ταξινόμηση, ώστε οι downstream καταναλωτές (μηχανή fallback, συγκέντρωση combo, απόκριση προς τον client) να βλέπουν την πραγματική δυνατότητα επανάληψης του σφάλματος.

Ορισμένες πύλες σηματοδοτούν την ΠΡΟΣΩΡΙΝΗ εξάντληση quota με κατάσταση HTTP που
δεν επιτρέπει επανάληψη. Το `agentrouter.org` επιστρέφει `403` (μερικές φορές `400`)
με σώμα στα κινεζικά (`用户额度不足` / `额度不足`) αντί για το τυπικό `429`. Οι client
όπως το Claude Code αντιμετωπίζουν το `403` ως μόνιμο και ματαιώνουν τη συνεδρία, ενώ
χωρίς τη διόρθωση η μηχανή fallback θα το ταξινομούσε ως `AUTH_ERROR` αντί για
συμβάν quota.

**Υλοποίηση:**

- Registry + matcher: `open-sse/config/upstreamStatusRestatement.ts` — μια
  λίστα κανόνων ανά provider (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), οι οποίοι αντιστοιχίζονται μέσω της
  `applyStatusRestatement()`.
- Σημείο κλήσης: το block `providerFailure:` στο
  `open-sse/handlers/chatCore.ts` (περίπου στη γραμμή 3654), αμέσως μετά την
  ανάλυση μιας upstream απόκρισης με κατάσταση HTTP σφάλματος από την
  `parseUpstreamError()` (`!providerResponse.ok`) και πριν εκτελεστεί οποιαδήποτε
  ταξινόμηση, ώστε κάθε downstream καταναλωτής να βλέπει τη διορθωμένη
  κατάσταση. Τα σφάλματα που είναι ενσωματωμένα σε μια ροή SSE `200` ακολουθούν
  ξεχωριστή, μεταγενέστερη διαδρομή ανάλυσης της ροής και **δεν** καλύπτονται από
  αυτό το hook σήμερα — πρόκειται για γνωστό περιορισμό, ο οποίος δεν απαιτείται
  ακόμη για το misstatus του agentrouter (το οποίο εμφανίζεται ως κατάσταση HTTP
  σφάλματος).
- Επιλεξιμότητα επανάληψης: το `429` περιλαμβάνεται στο
  `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), επομένως ένα
  αναδιατυπωμένο σφάλμα μεταφέρει πραγματικό χρονικό παράθυρο επανάληψης αντί να
  εμφανίζεται ως ανενεργό `403`.
- Το συνθετικό `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  είναι μόνο αυτό που η αναδιατυπωμένη απόκριση γνωστοποιεί στον **client**· δεν
  αποτελεί το εσωτερικό διάστημα cooldown/lockout της σύνδεσης — αυτό καθορίζεται
  ξεχωριστά από τον μηχανισμό που πράγματι χειρίζεται το αναδιατυπωμένο σφάλμα
  (το κλιμακούμενο backoff του Connection Cooldown, §2, με βασική τιμή
  `3s` για providers API-key ή το Model Lockout, §3, για providers με quota ανά
  μοντέλο όπως το agentrouter). Ο router μπορεί να γίνει εσωτερικά επιλέξιμος για
  επανάληψη νωρίτερα από το παράθυρο των 60s που διαφημίζει στον client — σκόπιμο
  περιθώριο και όχι σφάλμα.

Τα μόνιμα σφάλματα (το `无权访问模型` του agentrouter — δεν υπάρχει πρόσβαση σε
αυτό το μοντέλο) **ΠΟΤΕ** δεν αναδιατυπώνονται: το `excludeMarkers` υπερισχύει του
κανόνα ακόμη και όταν ταιριάζει το `textMarkers`, επομένως το σφάλμα διατηρεί την
αρχική του κατάσταση και τίποτα δεν το επαναλαμβάνει επ’ αόριστον. Ο κανόνας
ταξινόμησης του provider που αντιστοιχεί σε αυτό
(`agentrouter-model-access-denied` στο `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, δηλωμένο βασικό cooldown `6h`) εξετάζεται
από το `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_πριν_ από την πρώιμη γενική επιστροφή της κατηγορίας apikey `FORBIDDEN`, με
προϋπόθεση το `honorsRuleLockScope(provider)` (#10334 — επί του παρόντος
αποκλειστικά για το agentrouter μέσω της allowlist
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` στο `providerErrorRules.ts`). Το δηλωμένο
cooldown 6h του κανόνα μεταφέρεται ως `fallbackResult.baseCooldownMs`, όμως
εξακολουθεί να τροφοδοτεί την προϋπάρχουσα διαδρομή lockout ανά μοντέλο για quota
(`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, η οποία δεν άλλαξε από το #10334 παρά μόνο ως προς
την πηγή του cooldown): περιορίζεται από την τιμή
`mlSettings.maxCooldownMs` του operator (προεπιλογή
`1_800_000ms` / 30min), όπως κάθε άλλο lockout μοντέλου, και ο _αποθηκευμένος
λόγος lockout_ παραμένει το προϋπάρχον hardcoded `"forbidden"`, όχι το
`"auth_error"` του κανόνα — μόνο η διάρκεια του cooldown εφαρμόζεται από άκρο σε
άκρο, όχι η συμβολοσειρά του λόγου. Η ίδια η σύνδεση παραμένει ενεργή· τα
αδελφά μοντέλα στην ίδια σύνδεση δεν επηρεάζονται.

Τα αναδιατυπωμένα σφάλματα quota (`额度不足`) φτάνουν σε κανόνα provider στην
παραγωγή (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, χωρίς δικό του δηλωμένο cooldown — εφαρμόζεται η προεπιλογή
κλιμακούμενου backoff του persistence layer). Από το #10334, το `scope` στο
`ProviderErrorRuleMatch` καταναλώνεται από άκρο σε άκρο, αλλά **μόνο** για
providers που περιλαμβάνονται στην allowlist
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` — σήμερα μόνο το
`"agentrouter"`, μέσω του `honorsRuleLockScope()`). Για κάθε άλλο provider το
`scope` παραμένει πληροφοριακό, ακριβώς όπως πριν από το #10334.
Το `checkFallbackError` εκθέτει το scope του κανόνα που αντιστοιχίστηκε ως
`fallbackResult.ruleScope`. Το
`isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) είναι ο κοινόχρηστος έλεγχος που επιβεβαιώνει ότι
ένα `ruleScope` είναι πράγματι ασφαλές να εφαρμοστεί ως σήμα σε επίπεδο σύνδεσης
με αυτόματη ανάκαμψη (scope `"connection"`, reason `quota_exhausted`, ποτέ
`permanent`, ποτέ `creditsExhausted` — άμυνα έναντι μελλοντικού συνδυασμού του
scope `"connection"` με μόνιμη κατάσταση λογαριασμού). Δύο καταναλωτές το καλούν:

- **Persistence** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  αντί να μεταπίπτει στον κλάδο αποκλεισμού **ανά μοντέλο** του passthrough-provider
  (το agentrouter έχει `passthroughModels: true` → η
  `hasPerModelQuota()` επιστρέφει `true`), εφαρμόζει μια **προσωρινή περίοδο
  cooldown σύνδεσης** — `testStatus: "unavailable"` + `rateLimitedUntil`, ποτέ
  μια τελική κατάσταση (`credits_exhausted`/`banned`/`expired`) — ώστε η σύνδεση
  να ανακάμπτει αυτόματα μόλις παρέλθει η περίοδος cooldown, χωρίς να
  απαιτείται χειροκίνητη επαναφορά διαπιστευτηρίων.
  Παραλείπεται για συνδέσεις με `disableCooling: true` (#2997): αυτή η
  εξαίρεση ακολουθεί αντίθετα τον αποκλεισμό ανά μοντέλο (ένας τεκμηριωμένος
  συμβιβασμός — δείτε το σχόλιο κώδικα πάνω από τον κλάδο).
- **Δρομολόγηση συνδυασμού στο ίδιο αίτημα** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): η ίδια προστασία σημειώνει τη
  σύνδεση στο in-memory σύνολο `exhaustedConnections`, με κλειδί
  `${provider}:${connectionId}`. Αυτό παραλείπει μόνο έναν εναπομείναντα στόχο
  του ΙΔΙΟΥ ΑΙΤΗΜΑΤΟΣ που _φέρει ήδη ο ίδιος αυτό το ακριβές `connectionId`_ στο
  δικό του αντικείμενο στόχου (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` πριν από την αναζήτηση στο `exhaustedConnections`) — ένας απλός
  συνδυασμός λίστας μοντέλων, όπου οι συγγενικοί στόχοι δεν φέρουν δικό τους
  δεσμευμένο `connectionId` και ένα μόνο επιλύεται ανά αποστολή από την κεφαλίδα
  `X-OmniRoute-Selected-Connection-Id` της απόκρισης, δεν βρίσκει ποτέ
  αντιστοίχιση με αυτό το κλειδί. Σε αυτήν τη συνήθη περίπτωση, η πραγματική
  προστασία από το να επαναχρησιμοποιήσει ένα εναπομείναν σκέλος τον μόλις
  εξαντλημένο λογαριασμό ΔΕΝ είναι αυτό το Set — είναι το επίπεδο persistence
  παραπάνω (το `rateLimitedUntil` της σύνδεσης βρίσκεται πλέον στο μέλλον),
  σε συνδυασμό με το ότι η ίδια προστασία καταστέλλει το
  `transientRateLimitedProviders` για την αποτυχία (δείτε τα "Σχεδιασμός δύο
  σταδίων" και το σχόλιο κώδικα στον κλάδο
  `isAgentrouterConnectionQuotaScope` στο `targetExhaustion.ts`): με αυτό το Set
  να παραμένει χωρίς σήμανση, η εξαναγκασμένη επιτρεπτή επιλογή
  `allowRateLimitedConnection` του `combo.ts`
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) ΔΕΝ ενεργοποιείται για
  τα εναπομείναντα σκέλη του provider, επομένως το φίλτρο
  `rateLimitedUntil` της επιλογής διαπιστευτηρίων
  (`src/sse/services/auth.ts:1238`) εφαρμόζεται κανονικά και ένα εναπομείναν
  σκέλος είτε επιλέγει διαφορετική, ακόμη επιλέξιμη σύνδεση agentrouter είτε
  αποτυγχάνει χωρίς διαθέσιμα διαπιστευτήρια — δεν επιστρέφει εξαναγκασμένα στη
  σύνδεση που αυτός ο κλάδος μόλις έθεσε σε cooldown.

### Σχεδιασμός δύο σταδίων: επαναδιατύπωση κατάστασης και, στη συνέχεια, ταξινόμηση

Η επαναδιατύπωση κατάστασης (`upstreamStatusRestatement.ts`) και οι κανόνες
ταξινόμησης provider (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) είναι ξεχωριστά μητρώα που χρησιμοποιούν ως κλειδιά
το αναγνωριστικό του provider και δείκτες κειμένου, αλλά εκτελούνται σε
διαφορετικά σημεία και εξυπηρετούν διαφορετικούς σκοπούς: η επαναδιατύπωση
ξαναγράφει έγκαιρα την κατάσταση HTTP στο `chatCore.ts`, ενώ οι κανόνες
ταξινόμησης επιλέγουν το εφεδρικό `reason` και κλειδώνουν το `scope`
(`model` / `provider` / `connection`) μέσα στη `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Οι κανόνες ταξινόμησης βλέπουν μόνο το πλήρες **κείμενο** σφάλματος
(απαραίτητο για την αντιστοίχιση δεικτών του σώματος, όπως το `额度不足`) για
τους provider που παρατίθενται στη λίστα επιτρεπόμενων
`FULL_TEXT_RULE_PROVIDERS` στο `providerErrorRules.ts` — επί του παρόντος μόνο
τον `"agentrouter"`. Για κάθε άλλον provider του **ενσωματωμένου καταλόγου**,
η `checkFallbackError` διαβιβάζει στη `getProviderErrorRuleMatch` μόνο το
δομημένο σφάλμα (`{code, type}`), το οποίο επαρκεί για κανόνες που βασίζονται
σε κεφαλίδες/κατάσταση/κωδικό, αλλά δεν έχει πρόσβαση σε δείκτες κειμένου του
σώματος. Η βοηθητική `resolveRuleMatchBody()` εκτελεί αυτήν την επιλογή:
πλήρες κείμενο σφάλματος για τους provider της λίστας επιτρεπόμενων, το
δομημένο σφάλμα για όλους τους υπόλοιπους. Η προσθήκη ενός **ενσωματωμένου**
provider στη `FULL_TEXT_RULE_PROVIDERS` είναι ρητή επιλογή ανά provider — η
λίστα υπάρχει ώστε η προεπιλεγμένη διαδρομή για κάθε provider που δεν
περιλαμβάνεται σε αυτήν να παραμένει byte-for-byte αμετάβλητη.

Το `scope` ενός κανόνα (`model` / `provider` / `connection`) είναι ξεχωριστή
επιλογή από τη `FULL_TEXT_RULE_PROVIDERS`: η `checkFallbackError` το εμφανίζει
μόνο ως `fallbackResult.ruleScope`, και οι καταναλωτές στα επόμενα στάδια το
λαμβάνουν υπόψη ως κάτι περισσότερο από ενημερωτική ετικέτα μόνο για provider
της λίστας επιτρεπόμενων `HONORS_RULE_LOCK_SCOPE_PROVIDERS` στο ίδιο αρχείο
(μέσω της `honorsRuleLockScope()` — σήμερα μόνο τον `"agentrouter"`). Δείτε
την ενότητα "Επαναδιατυπωμένα σφάλματα quota" παραπάνω για το τι κάνει
πραγματικά μια αντιστοίχιση `scope: "connection"` όταν ένας provider
περιλαμβάνεται σε αυτήν τη λίστα επιτρεπόμενων.

**#11104 — οι κανόνες που δηλώνονται από τον χειριστή παρακάμπτουν και τις δύο λίστες επιτρεπόμενων.** Ένας χειριστής μπορεί να δηλώσει έναν κανόνα
ανά provider κατά τον χρόνο εκτέλεσης μέσω του
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
χωρίς να επεξεργαστεί αυτό το αρχείο. Η υπαγωγή ενός κανόνα χειριστή στις
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — λίστες
επιτρεπόμενων που προορίζονται να προστατεύουν την **προεπιλεγμένη**
συμπεριφορά των κανόνων του ενσωματωμένου καταλόγου — θα καθιστούσε τον
μηχανισμό ρυθμίσεων ανενεργό για κάθε provider εκτός από όσους αναφέρονται
ήδη σε αυτές, καθώς η δήλωση του κανόνα αποτελεί ήδη ρητή επιλογή του
χειριστή. Οι `resolveRuleMatchBody()` και `honorsRuleLockScope()` ελέγχουν
πρώτα τη `hasOperatorRuleForProvider()`: ένας provider με κανόνα χειριστή
λαμβάνει το ακατέργαστο κείμενο σφάλματος και το δηλωμένο `scope` του
λαμβάνεται υπόψη, ανεξάρτητα από το αν εμφανίζεται επίσης σε οποιαδήποτε από
τις δύο λίστες επιτρεπόμενων.

**Κανόνες που δηλώνονται από τον χειριστή** (`OperatorProviderErrorRule`):
κάθε κανόνας διαθέτει ένα προαιρετικό `status` και ένα προαιρετικό `match`
(μια απλή υποσυμβολοσειρά του κειμένου σφάλματος χωρίς διάκριση πεζών-κεφαλαίων,
ποτέ RegExp, επομένως δεν μπορεί να προκαλέσει ReDoS), και πρέπει να ορίζει
τουλάχιστον ένα από τα δύο. Όταν ορίζονται και τα δύο, συνδυάζονται με AND·
ένα πεδίο που παραλείπεται αντιστοιχεί σε οτιδήποτε, επομένως το
`{match: "insufficient_quota"}` αντιστοιχεί σε οποιαδήποτε κατάσταση που
περιέχει αυτόν τον κωδικό. Κερδίζει ο πρώτος κανόνας που αντιστοιχεί.
Το `cooldownMs` δέχεται έως και 30 ημέρες· συνολικά επιτρέπονται το πολύ 50
κανόνες.

**Προεπιλογές catch-all** (`settings.providerErrorDefaults`, προαιρετική ενεργοποίηση, ορίζεται μέσω του
`setOperatorProviderErrorDefaults`): `{[provider]: {cooldownMs, scope?, reason?}}`
με `cooldownMs` από 1 λεπτό έως 30 ημέρες. Μια προεπιλογή εφαρμόζεται μόνο όταν δεν
έχει αντιστοιχιστεί κανένας κανόνας χειριστή και κανένας κανόνας του ενσωματωμένου καταλόγου, και μόνο σε σφάλματα 402, 403, 408,
429 και 5xx. Τα σφάλματα μορφής αιτήματος (400, 404, 409, 413, 422) και τα
γυμνά 401 διατηρούν τον δικό τους χειρισμό. Χωρίς ρητό `reason`, η αιτία προκύπτει από
το status, με τον ίδιο τρόπο που το κάνει η `classifyError`. Η δήλωση μιας προεπιλογής μετρά ως
κανόνας χειριστή για τη `hasOperatorRuleForProvider()`, επομένως το `scope` της (προεπιλεγμένη τιμή
`"connection"`) τηρείται. Το ενεργό cooldown μιας προεπιλογής είναι το μεγαλύτερο από το
`cooldownMs` της και την υπόδειξη επανάληψης του ίδιου του provider (`Retry-After`,
`x-ratelimit-reset` ή υπόδειξη reset στο σώμα, η ίδια υπόδειξη που λαμβάνει υπόψη η μηχανή όταν
είναι ενεργοποιημένη η ρύθμιση connection-cooldown «use upstream retry hints»),
οπότε μια προεπιλογή μπορεί να επιμηκύνει μια σύντομη υπόδειξη upstream, αλλά ποτέ να συντομεύσει ένα πραγματικό reset.
Ένας ρητός κανόνας χειριστή διατηρεί το ακριβές `cooldownMs` του. Ούτε ένας κανόνας ούτε μια προεπιλογή παρακάμπτει τους
φραγμούς connection-cooldown στο `markAccountUnavailable`: ένα ενεργό, μεγαλύτερο
cooldown δεν συντομεύεται ποτέ και ένα τερματικό status δεν αντικαθίσταται ποτέ. Οι
ενσωματωμένοι ανιχνευτές κειμένου που εκτελούνται νωρίτερα στο `checkFallbackError` (εξαντλημένες πιστώσεις,
ημερήσιο quota, απενεργοποιημένος λογαριασμός) εξακολουθούν να έχουν προτεραιότητα για τις δικές τους
φράσεις.

**Γνωστό κενό — το `providerRuleRegistry` δεν ελέγχεται ποτέ για HTTP 400.**
Ο κλάδος `BAD_REQUEST` του `checkFallbackError` ταξινομεί το status 400 αποκλειστικά μέσω
των δικών του πινάκων μοτίβων (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` κ.λπ. στο `accountFallback.ts`) και επιστρέφει πριν
φτάσει στον κλάδο `configuredRule`/`getProviderErrorRuleMatch` που βρίσκεται παραπάνω.
Ένας κανόνας του ενσωματωμένου καταλόγου (ή ένας κανόνας χειριστή) με
`status: 400` είναι συντακτικά έγκυρος, αλλά δεν θα ενεργοποιηθεί ποτέ. Κανένας υπάρχων κανόνας δεν στοχεύει σήμερα το 400,
επομένως τίποτα στην παραγωγή δεν επηρεάζεται — όμως ένας μελλοντικός κανόνας 400 χρειάζεται πρώτα αλλαγή σε αυτόν τον
κλάδο, κάτι που αποτελεί μεγαλύτερη αλλαγή από την προσθήκη ενός κανόνα (επαναταξινομεί το 400 για κάθε provider που
βασίζεται ήδη στη συμπεριφορά των πινάκων μοτίβων) και βρίσκεται εκτός πεδίου εφαρμογής για την προσθήκη κανόνα σε έναν provider.

### Προσθήκη νέου gateway που παρουσιάζει εσφαλμένα το quota

1. Καταχωρίστε έναν πίνακα κανόνων στο `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Διατηρήστε τα `textMarkers`
   ειδικά για τον provider· μην επαναχρησιμοποιείτε γενικές αγγλικές φράσεις που συγκρούονται με τα
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Προαιρετικά, καταχωρίστε κανόνες ταξινόμησης στο
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) για να επιλέξετε το σωστό
   πεδίο κλειδώματος (`connection` για quota σε επίπεδο λογαριασμού, `model` για σφάλματα ανά μοντέλο). Αυτό το βήμα
   τίθεται σε ισχύ στην παραγωγή μόνο για providers των οποίων οι κανόνες χρειάζονται το πλήρες κείμενο σφάλματος
   (δείκτες σώματος): προσθέστε το id του provider στο `FULL_TEXT_RULE_PROVIDERS` στο ίδιο αρχείο — διαφορετικά το
   `checkFallbackError` περνά στον κανόνα μόνο το δομημένο
   σφάλμα `{code, type}` και ένας κανόνας κειμένου σώματος δεν θα αντιστοιχιστεί ποτέ σε ζωντανή κίνηση.
   Κανόνες που αντιστοιχίζονται αποκλειστικά βάσει `status`/`headers` (όπως εκείνοι των Opencode ή
   Minimax) δεν χρειάζονται αυτή την προαιρετική ενεργοποίηση. Ξεχωριστά, αν ο κανόνας δηλώνει
   `scope: "connection"` και ο σκοπός είναι ένα πραγματικό cooldown σε επίπεδο σύνδεσης
   συν παράλειψη του ίδιου συνδυασμού αιτήματος (και όχι απλώς μια ενημερωτική ετικέτα), προσθέστε το id του provider στο
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` στο ίδιο αρχείο — αυτό ελέγχει την κατανάλωση τύπου
   `isAgentrouterConnectionQuotaScope()` στο `markAccountUnavailable()`
   (`src/sse/services/auth.ts`) και στο
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`)· χωρίς αυτό, το `scope`
   εξακολουθεί να περνά μέσω του `fallbackResult.ruleScope`, αλλά τίποτα δεν το χρησιμοποιεί.
3. Προσθέστε unit tests που να αντικατοπτρίζουν τα
   `tests/unit/upstream-status-restatement.test.ts`
   και `tests/unit/agentrouter-error-rules.test.ts` (συμπεριλαμβανομένων των
   ελέγχων not-permanent / not-creditsExhausted και — αν ο provider χρειάζεται
   τη λίστα επιτρεπόμενων — ενός test που επιβεβαιώνει ότι η
   `resolveRuleMatchBody()` επιστρέφει το πλήρες κείμενο μόνο για τον συγκεκριμένο provider).

Δεν χρειάζονται αλλαγές στα `chatCore.ts`, `classifyError` ή στο combo.

#### Κλείδωμα ανά bucket εξόδου (#10880)

Οι providers στο `EGRESS_BUCKETED_LOCK_PROVIDERS` (οικογένεια opencode) αντιμετωπίζονται
ως upstream με bucket βάσει IP (το δωρεάν επίπεδο opencode βασίζεται σε bucket IP και όχι
σε bucket λογαριασμού — δείτε το #9611): ένα status-429 που ταξινομήθηκε ως
`quota_exhausted`
**ή** `rate_limit_exceeded` θέτει σε cooldown κάθε σύνδεση της επιτρεπόμενης οικογένειας
της οποίας η τελευταία γνωστή IP εξόδου ταιριάζει με εκείνη της σύνδεσης που απέτυχε, πριν η
περιστροφή μπορέσει να τις δοκιμάσει
— αποφεύγοντας N-1 upstream κλήσεις που είναι βέβαιο ότι θα αποτύχουν (ίδιο σχήμα με τα #10460/#10525).
Το `rate_limit_exceeded` περιλαμβάνεται σκόπιμα: στη διαδρομή `markAccountUnavailable`
οι ειδικοί για opencode κανόνες δεν αντιστοιχίζονται ποτέ (δεν περνούν headers/σώμα στο
`checkFallbackError`, ενώ το opencode δεν βρίσκεται στο `FULL_TEXT_RULE_PROVIDERS`), επομένως ένα 429
του οποίου το σώμα περιέχει το κείμενο quota συνδρομής ("monthly usage limit
reached") ταξινομείται ως `quota_exhausted` από το fallback κειμένου quota
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; cooldown 1 ώρας) πριν γίνει ποτέ
ο έλεγχος του κανόνα `status_429` — ενώ ένα 429 χωρίς κείμενο quota (απλός περιορισμός ρυθμού)
ταξινομείται μέσω του κανόνα `status_429` ως `rate_limit_exceeded`
και εξακολουθεί να θέτει την οικογένεια IP σε cooldown. Για έναν provider που βρίσκεται στη λίστα επιτρεπόμενων, ένας περιορισμός ρυθμού βάσει IP είναι το ίδιο σήμα με ένα εξαντλημένο quota. Ειλικρινή όρια:

- **Καλύτερη δυνατή προσπάθεια**: το lock επιλύει το τελευταίο γνωστό `egress_ip`
  της σύνδεσης από τα `proxy_logs` (παράθυρο 24 ωρών, σύγχρονα, χωρίς cache). Κενή
  cache (το egress IP δεν ελέγχθηκε ποτέ) ή απουσία γραμμής → η αποτυγχάνουσα
  σύνδεση εξακολουθεί να τίθεται σε cooldown από τον κλάδο (καταγράφεται όπως
  σήμερα), απλώς δεν κλειδώνεται καμία ομότιμη σύνδεση.
- **Ποτέ τερματικό**: το cooldown είναι ένα ανανεούμενο παράθυρο quota
  (`testStatus: "unavailable"`). Μόνιμη κατάσταση δεν παράγεται ποτέ από σήμα
  επιπέδου IP. Οι συνδέσεις `disableCooling` παρακάμπτουν πλήρως τον κλάδο.
- **Η κοκκώδης διαχείριση του lock αλλάζει για την οικογένεια της allowlist**: πρόκειται για
  αλλαγή εμβέλειας και όχι μόνο για βελτιστοποίηση των ομότιμων συνδέσεων. Το opencode είναι
  πάροχος `passthroughModels`, επομένως πριν από αυτόν τον κλάδο ένα 429 παρήγαγε κλείδωμα
  ανά MODEL· τώρα παράγει cooldown σύνδεσης — ακόμη και για έναν operator που εκτελεί μία
  μόνο σύνδεση χωρίς καμία ομότιμη. Αυτή είναι η κοκκώδης διαχείριση που ο πίνακας κανόνων
  opencode δηλώνει ήδη ως σωστή (`scope: "connection"`,
  `providerErrorRules.ts`), αλλά δεν έχει εφαρμοστεί μέχρι τώρα επειδή το opencode δεν
  βρίσκεται στο `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Ο κλάδος γράφει ο ίδιος το cooldown +
  `backoffLevel` της αποτυγχάνουσας σύνδεσης, αντικατοπτρίζοντας τον κλάδο agentrouter με
  εμβέλεια σύνδεσης, και επιστρέφει — το μπλοκάρισμα ανά μοντέλο και η γενική διαδρομή
  παρακάτω δεν προσεγγίζονται ποτέ.
- **Περιλαμβάνεται ο συνδυασμός**: όπως στον κλάδο agentrouter, η εμβέλεια αγνοεί σκόπιμα την
  υποβάθμιση `persistUnavailableState`/`isCombo` που εφαρμόζει ένας caller συνδυασμού σε ένα 429. Ένα κλείδωμα ανά μοντέλο δεν είναι ασθενέστερη μορφή αυτής της εμβέλειας, αλλά η
  λάθος μονάδα: δεν λέει τίποτα για το εξαντλημένο IP, επομένως η περιστροφή συνδυασμού θα
  συνέχιζε να καταναλώνει μία εγγυημένα αποτυχημένη κλήση ανά ομότιμη σύνδεση.
- **Ασφάλεια ομότιμων συνδέσεων**: μια ομότιμη σύνδεση που είναι ήδη τερματική
  (banned/credits_exhausted) ή βρίσκεται ήδη σε μεγαλύτερο cooldown δεν αντικαθίσταται ποτέ.
- **Αποκλειστική allowlist**: η διεύρυνση του `EGRESS_BUCKETED_LOCK_PROVIDERS` είναι
  ρητή απόφαση του υπεύθυνου· δεν υπάρχει γενική διασύνδεση (μοτίβο #10334/#10419). Το
  ερώτημα των ομότιμων συνδέσεων δεσμεύει την ίδια allowlist αντί να την επαναλαμβάνει ως
  literal SQL, επομένως η διεύρυνσή της παραμένει αλλαγή μίας γραμμής.
- **Περιστροφή egress IP και προς τις δύο κατευθύνσεις**: το παράθυρο αναζήτησης (24 ώρες)
  είναι πολύ ευρύτερο από το TTL της cache egress IP (5 λεπτά), επομένως το «τελευταίο γνωστό
  IP» είναι ιστορικό και όχι τρέχουσα κατάσταση. Αν το proxy μιας σύνδεσης περιστράφηκε
  εντός του παραθύρου, το lock μπορεί να **μην εντοπίσει** ένα πραγματικά κοινόχρηστο IP
  (το καταγεγραμμένο IP είναι το νέο, μη εξαντλημένο) — και συμμετρικά μπορεί να θέσει σε
  **cooldown μια ομότιμη σύνδεση που έκτοτε έχει περιστραφεί μακριά** από το εξαντλημένο IP.
  Η δεύτερη περίπτωση κοστίζει σε εκείνη την ομότιμη σύνδεση ένα παράθυρο cooldown· και οι
  δύο περιπτώσεις γίνονται αποδεκτές ως περιορισμοί βέλτιστης δυνατής προσπάθειας μιας
  αναζήτησης που βασίζεται στο ιστορικό.
- **Κόστος**: δύο περιορισμένες σαρώσεις των `proxy_logs` (με φιλτράρισμα παραθύρου μέσω
  `idx_pl_timestamp`), μόνο με τη συχνότητα των 429. Δεν απαιτείται νέο index (migration 134
  YAGNI). Οι μετρήσεις έγιναν σε αντίγραφο DB με πραγματική κίνηση και μέτριο μέγεθος· μια
  περίπτωση υψηλής δια throughput διατηρεί αναλογικά περισσότερες γραμμές στο ίδιο παράθυρο.

## Άλλες Δυνατότητες Ανθεκτικότητας

- **20 στρατηγικές δρομολόγησης** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — δείτε το [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Δρομολόγηση με επίγνωση επαναφοράς** (v3.8.0) — δίνει προτεραιότητα στις συνδέσεις με βάση τον χρόνο επαναφοράς του quota.
- **Υποβάθμιση της λειτουργίας background** — το Responses API με `background: true` υποβαθμίζεται σε σύγχρονη εκτέλεση με προειδοποίηση.
- **Δυναμικός εντοπισμός ορίου εργαλείων** — εφαρμόζει backoff στους παρόχους όταν επιτυγχάνονται τα όρια στον αριθμό εργαλείων.
- **Emergency fallback** — ελέγχεται από το `OMNIROUTE_EMERGENCY_FALLBACK`· οι χειριστές μπορούν να το παρακάμψουν από τη σελίδα Feature Flags χωρίς επανεκκίνηση.

---

## Εντοπισμός σφαλμάτων

- Το σταθμισμένο combo απαντά με `503 all_targets_cooling_down` (το `Retry-After` έχει οριστεί, το `diagnostics.excluded` παραθέτει κάθε στόχο με `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → η δεξαμενή (pool) είναι ρυθμισμένη και συνδεδεμένη, απλώς κάθε στόχος αποκλείεται από έναν χρονομετρητή ανθεκτικότητας· η προειδοποίηση `[COMBO] Weighted selection: every target excluded before dispatch — …` κατονομάζει τους λόγους και τα εναπομείναντα δευτερόλεπτα. Ένα `404 no_executable_targets` από το ίδιο combo σημαίνει ότι δεν ενεπλάκη κανένας χρονομετρητής ανθεκτικότητας (τίποτα προς εκτέλεση, ή κάθε λογαριασμός απέτυχε στον έλεγχο διαθεσιμότητας). Υλοποιείται στο `open-sse/services/combo/pinRecovery.ts` από τους αποκλεισμούς που συλλέγονται στο `targetResolution.ts`.
- Όλα τα κλειδιά ενός παρόχου παραλείπονται → ελέγξτε τόσο την κατάσταση του circuit breaker ΟΣΟ ΚΑΙ το `rateLimitedUntil`/`testStatus` κάθε σύνδεσης.
- Ο πάροχος αποκλείεται μόνιμα μετά το παράθυρο επαναφοράς → κώδικας που διαβάζει το σκέτο `state` αντί για `getStatus()`/`canExecute()`.
- Ένα κλειδί αποτυγχάνει, τα υπόλοιπα θα έπρεπε να λειτουργούν → προτιμήστε το connection cooldown έναντι του circuit breaker.
- Μόνο ένα μοντέλο αποτυγχάνει → προτιμήστε το model lockout έναντι του connection cooldown.
- Η κατάσταση θα έπρεπε να αυτοανακάμπτει αλλά δεν το κάνει → ελέγξτε για μελλοντική χρονοσήμανση + διαδρομή ανάγνωσης που ανανεώνει τη ληγμένη κατάσταση. Οι μόνιμες καταστάσεις απαιτούν χειροκίνητες αλλαγές.

---

## Κατάσταση χρόνου εκτέλεσης — γρήγορη αναφορά για agent

> Μεταφέρθηκε αυτούσιο από το `AGENTS.md` → "Resilience Runtime State" (PR #12743), ώστε ο
> οδηγός του agent να παραμένει εντός του προϋπολογισμού context των 40k. Αποτελεί τη συμπυκνωμένη,
> στραμμένη προς τον agent όψη των παραπάνω ενοτήτων· οι αριθμημένες ενότητες παραμένουν η πλήρης αναφορά.

Το OmniRoute διαθέτει τρεις συσχετιζόμενους αλλά διακριτούς μηχανισμούς προσωρινής αστοχίας. Κρατήστε
το πεδίο εφαρμογής τους ξεχωριστό κατά τον εντοπισμό σφαλμάτων στη συμπεριφορά δρομολόγησης. Δείτε το
[διάγραμμα ανθεκτικότητας 3 επιπέδων](../diagrams/exported/resilience-3layers.svg)
(πηγή: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
για μια συνοπτική απεικόνιση.

### Circuit Breaker Παρόχου

**Πεδίο εφαρμογής**: ολόκληρος ο πάροχος, π.χ. `glm`, `openai`, `anthropic`.

**Σκοπός**: να σταματά η αποστολή κίνησης προς έναν πάροχο που αποτυγχάνει επανειλημμένα σε
επίπεδο upstream/υπηρεσίας, ώστε ένας μη υγιής πάροχος να μην επιβραδύνει κάθε αίτημα.

**Υλοποίηση**:

- Κύρια κλάση: `src/shared/utils/circuitBreaker.ts`
- Συνδεσμολογία gate/εκτέλεσης chat: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API κατάστασης χρόνου εκτέλεσης: `src/app/api/monitoring/health/route.ts`
- Κοινόχρηστα wrappers: `open-sse/services/accountFallback.ts`
- Πίνακας μόνιμης αποθήκευσης κατάστασης: `domain_circuit_breakers`

**Καταστάσεις** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: επιτρέπεται η κανονική κίνηση.
- `DEGRADED`: ζώνη έγκαιρης προειδοποίησης — οι αστοχίες ξεπέρασαν το κατώφλι υποβάθμισης αλλά όχι
  ακόμη το κατώφλι του διακόπτη· η κίνηση εξακολουθεί να ρέει, οι πίνακες ελέγχου εμφανίζουν την
  προειδοποίηση. Ένα έγκυρο τεστ σύνδεσης ή ένα ήσυχο παράθυρο χωρίς νέα αστοχία την επιστρέφει σε
  `CLOSED` (το παράθυρο βρίσκεται στο `docs/architecture/RESILIENCE_GUIDE.md`).
- `OPEN`: ο πάροχος αποκλείεται προσωρινά· οι καλούντες λαμβάνουν απόκριση provider-circuit-open
  ή η δρομολόγηση combo παραλείπει σε άλλο στόχο.
- `HALF_OPEN`: το χρονικό όριο επαναφοράς έχει παρέλθει· επιτρέπεται ένα αίτημα διερεύνησης (probe).
  Η επιτυχία κλείνει τον διακόπτη, η αποτυχία τον ανοίγει ξανά.

**Προεπιλογές** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, καταναλώνεται μέσω
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` στο `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` στο `src/sse/handlers/chatHelpers.ts`). Ο διακόπτης ολόκληρου
παρόχου λειτουργεί με βάση τα `circuitBreakerThreshold` / `circuitBreakerReset`:

| Προφίλ     | υποβαθμίζεται σε | ανοίγει σε (`circuitBreakerThreshold`) | επαναφορά (`circuitBreakerReset`) |
| ---------- | ---------------: | -------------------------------------: | --------------------------------: |
| OAuth      |              `5` |                                    `8` |                             `60s` |
| Κλειδί API |              `7` |                                   `12` |                             `30s` |
| Τοπικό     |      (παράγεται) |                                    `2` |                             `15s` |

Το `PROVIDER_PROFILES` ορίζει επίσης `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 λεπτά) και `providerCooldownMs` (5/10/1 λεπτά): αυτά τροφοδοτούν
την **πύλη παραθύρου του προαιρετικού καθολικού Provider Cooldown** (`PROVIDER_COOLDOWN_ENABLED`,
προεπιλογή απενεργοποιημένο) — μια καταχώριση επιπέδου παρόχου στο
`open-sse/services/providerCooldownTracker.ts` θεωρείται σε ψύξη μόνο μετά από
`providerFailureThreshold` αστοχίες εντός του `providerFailureWindowMs`, και στη συνέχεια ψύχεται για
`providerCooldownMs`. ΔΕΝ αποτελούν τα κατώφλια του ενεργού διακόπτη — μην τα ρυθμίζετε περιμένοντας
συμπεριφορά διακόπτη. Κάθε προεπιλογή μπορεί να παρακαμφθεί μέσω των μεταβλητών περιβάλλοντος
`OMNIROUTE_PROVIDER_BREAKER_*` και `OMNIROUTE_CIRCUIT_BREAKER_*`· ο ακριβής πίνακας αναφοράς για τον
χρόνο εκτέλεσης βρίσκεται στο `docs/architecture/RESILIENCE_GUIDE.md`.

Μόνο καταστάσεις αστοχίας επιπέδου παρόχου θα πρέπει να ενεργοποιούν τον διακόπτη παρόχου:

```ts
(408, 500, 502, 503, 504);
```

Μην ενεργοποιείτε τον διακόπτη ολόκληρου παρόχου για συνήθη σφάλματα λογαριασμού/κλειδιού/μοντέλου,
όπως οι περισσότερες περιπτώσεις `401`, `403` ή `429`. Αυτές συνήθως ανήκουν στο connection cooldown
ή στο model lockout. Ένα γενικό `403` παρόχου με κλειδί API θα πρέπει να είναι ανακτήσιμο, εκτός αν
ταξινομείται ως τερματικό σφάλμα παρόχου/λογαριασμού.

Ο breaker χρησιμοποιεί lazy recovery, όχι background timer. Όταν το `OPEN` λήξει, οι αναγνώσεις όπως
`getStatus()`, `canExecute()` και `getRetryAfterMs()` ανανεώνουν την κατάσταση σε
`HALF_OPEN`, ώστε τα dashboards και οι combo candidate builders να μην εξακολουθούν να αποκλείουν
έναν ληγμένο provider για πάντα.

### Connection Cooldown

**Scope**: μία σύνδεση/λογαριασμός/κλειδί provider.

**Σκοπός**: παράλειψη ενός προβληματικού κλειδιού/λογαριασμού προσωρινά, επιτρέποντας σε άλλες συνδέσεις
για τον ίδιο provider να συνεχίσουν να εξυπηρετούν αιτήματα.

**Υλοποίηση**:

- Διαδρομή εγγραφής/ενημέρωσης: `src/sse/services/auth.ts::markAccountUnavailable()`
- Επιλογή/φιλτράρισμα λογαριασμού: `src/sse/services/auth.ts::getProviderCredentials...`
- Υπολογισμός cooldown: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Ρυθμίσεις: `src/lib/resilience/settings.ts`

Σημαντικά πεδία στις συνδέσεις provider:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Κατά την επιλογή λογαριασμού, μια σύνδεση παραλείπεται όσο:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Τα cooldowns είναι επίσης lazy: όταν το `rateLimitedUntil` είναι στο παρελθόν, η σύνδεση γίνεται
ξανά elegible. Με επιτυχημένη χρήση, το `clearAccountError()` καθαρίζει τα `testStatus`,
`rateLimitedUntil`, τα πεδία σφάλματος και το `backoffLevel`.

Προεπιλεγμένη συμπεριφορά connection cooldown:

- Βασικό cooldown OAuth: `5s`.
- Βασικό cooldown API-key: `3s`.
- Το API-key `429` θα πρέπει να προτιμά υποδείξεις επανάληψης από το upstream (`Retry-After`, headers επαναφοράς ή
  αναλύσιμο κείμενο επαναφοράς) όταν είναι διαθέσιμες.
- Επαναλαμβανόμενες ανακτήσιμες αποτυχίες χρησιμοποιούν εκθετικό backoff:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Ο μηχανισμός anti-thundering-herd αποτρέπει τις ταυτόχρονες αποτυχίες στην ίδια σύνδεση από
το να επεκτείνουν επανειλημμένα το cooldown ή να αυξάνουν διπλά το `backoffLevel`.

Οι τερματικές καταστάσεις δεν είναι cooldowns. Τα `banned`, `expired` (το οποίο γίνεται τερματικό μόνο μετά από N φραγμένες επαναλήψεις μέσω `EXPIRED_RETRY_MAX`) και `credits_exhausted`
προορίζονται να παραμένουν μη διαθέσιμα έως ότου αλλάξουν τα credentials/ρυθμίσεις ή τα επαναφέρει
ένας διαχειριστής. Μην αντικαθιστάτε τερματικές καταστάσεις με μεταβατική κατάσταση cooldown.

### Model Lockout

**Scope**: provider + connection + model.

**Σκοπός**: αποφυγή απενεργοποίησης ολόκληρης της σύνδεσης όταν μόνο ένα model είναι μη διαθέσιμο ή
περιορισμένο ως προς το quota για αυτή τη σύνδεση.

Παραδείγματα:

- Providers με quota ανά model που επιστρέφουν `429`.
- Local providers που επιστρέφουν `404` για ένα model που λείπει.
- Αποτυχίες δικαιωμάτων mode/model ειδικές για τον provider, όπως επιλεγμένα modes του Grok.

Το model lockout βρίσκεται στο `open-sse/services/accountFallback.ts` και επιτρέπει στην ίδια
σύνδεση να συνεχίσει να εξυπηρετεί άλλα models.

### Οδηγίες αποσφαλμάτωσης

- Αν όλα τα κλειδιά για έναν provider παραλείπονται, ελέγξτε τόσο την κατάσταση του provider breaker όσο και το
  `rateLimitedUntil`/`testStatus` κάθε σύνδεσης.
- Αν ένας provider φαίνεται μόνιμα αποκλεισμένος μετά το παράθυρο επαναφοράς, ελέγξτε αν ο κώδικας
  διαβάζει το ακατέργαστο `state` αντί να χρησιμοποιεί το `getStatus()`/`canExecute()`.
- Αν ένα κλειδί provider αποτυγχάνει αλλά άλλα θα έπρεπε να λειτουργούν, προτιμήστε connection cooldown αντί για
  provider breaker.
- Αν μόνο ένα model αποτυγχάνει, προτιμήστε model lockout αντί για connection cooldown.
- Αν μια κατάσταση θα πρέπει να ανακάμψει αυτόματα, θα πρέπει να έχει μελλοντικό timestamp/reset timeout και μια
  διαδρομή ανάγνωσης που ανανεώνει τη ληγμένη κατάσταση. Οι μόνιμες καταστάσεις απαιτούν χειροκίνητες αλλαγές
  credentials ή config.

---

## Δακτυλικά αποτυπώματα TLS & Stealth

Το stealth ανά πάροχο (JA3/JA4, CCH, συσκότιση) τεκμηριώνεται ξεχωριστά — δείτε `docs/security/STEALTH_GUIDE.md` (git· δεν μεταγλωττίζεται στο `/docs`).

---

## Δοκιμές ανθεκτικότητας (Φάση 8 · Μπλοκ C)

Πέρα από τα unit tests για τη λογική ανθεκτικότητας, τρεις δοκιμές εξασκούν το runtime υπό
πραγματικές συνθήκες φόρτου/αποτυχίας (όλες integration/nightly — καμία δεν μπλοκάρει PRs):

| Δοκιμή      | Τι κάνει                                                                                                                                                                                          | Εκτέλεση                                 |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos       | Ο fake-upstream κόμβος εισάγει πραγματική καθυστέρηση/reset/timeout/503· επικυρώνει ότι ο circuit breaker ανοίγει/ανακτά και ότι το `checkFallbackError` ταξινομεί το 503 ως ανακτήσιμο fallback. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | ~500 ροές ανά `createSSEStream` με `--expose-gc`· αποτυγχάνει αν ο σωρός αυξηθεί πέρα από το όριο (προστασία OOM #3069).                                                                          | `npm run test:heap`                      |
| k6 soak     | Παρατεταμένο φορτίο εναντίον του `/api/monitoring/health`· όρια p95/σφαλμάτων.                                                                                                                    | `k6 run tests/load/k6-soak.js` (nightly) |

Οργανώνεται από το `.github/workflows/nightly-resilience.yml` (cron + dispatch). Στο
προεπιλεγμένο `test:integration`, τα chaos και heap αυτο-παραλείπονται (χωρίς `RUN_CHAOS_INT`/`--expose-gc`).

---

## Δείτε επίσης

- [Οδηγός αρχιτεκτονικής](./ARCHITECTURE.md) — Αρχιτεκτονική συστήματος και εσωτερική λειτουργία
- [Οδηγός χρήστη](../guides/USER_GUIDE.md) — Πάροχοι, combos, ενσωμάτωση CLI
- [Auto-Combo Engine](../routing/AUTO-COMBO.md) — Βαθμολόγηση 16 παραγόντων, πακέτα λειτουργιών
