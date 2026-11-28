# Compliance & Audit (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇧🇦 [bs](../../../bs/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Πηγή αλήθειας:** `src/lib/compliance/`, `src/app/api/compliance/`

OmniRoute καταγράφει διαχειριστικές ενέργειες, συμβάντα ελέγχου ταυτότητας, αλλαγές κύκλου ζωής διαπιστευτηρίων παρόχου και κλήσεις εργαλείου MCP σε πίνακες ελέγχου που υποστηρίζονται από SQLite. Αυτή η σελίδα καλύπτει τι καταγράφεται, πού ζει, πόσο καιρό διατηρείται, πώς μπορούν να εξαιρεθούν τα κλειδιά API και πώς να υποβάλετε ερωτήματα στα δεδομένα.

Η υλοποίηση βρίσκεται σε `src/lib/compliance/index.ts` (T-43 — "Έλεγχοι συμμόρφωσης") και `src/lib/compliance/providerAudit.ts`. Οι εγγραφές ελέγχου δεν ρίχνουν ποτέ: σε οποιαδήποτε αποτυχία η κλήση καταπίνεται σιωπηλά, επομένως η καταγραφή ελέγχου δεν μπορεί να διακόψει τη ροή κύριας αιτήματος.

## Τι καταγράφεται

### Συμβάντα διαχειριστικού ελέγχου (`audit_log`)

Κάθε κλήση της `logAuditEvent({ action, actor, target, details, ... })` παράγει
μία γραμμή. Οι συμβολοσειρές ενεργειών ακολουθούν ένα μοτίβο
`domain.verb` (ή `domain.verb.outcome`). Οι επιβεβαιωμένοι τύποι ενεργειών
στο δέντρο του κώδικα περιλαμβάνουν:

| Ενέργεια                             | Πηγή                                     |
| ------------------------------------ | ---------------------------------------- |
| `auth.login.success`                 | `src/app/api/auth/login/route.ts`        |
| `auth.login.failed`                  | `src/app/api/auth/login/route.ts`        |
| `auth.login.locked`                  | `src/app/api/auth/login/route.ts`        |
| `auth.login.error`                   | `src/app/api/auth/login/route.ts`        |
| `auth.login.misconfigured`           | `src/app/api/auth/login/route.ts`        |
| `auth.login.setup_required`          | `src/app/api/auth/login/route.ts`        |
| `auth.logout.success`                | `src/app/api/auth/logout/route.ts`       |
| `provider.credentials.created`       | `src/app/api/providers/route.ts`         |
| `provider.credentials.updated`       | `src/app/api/providers/[id]/route.ts`    |
| `provider.credentials.revoked`       | `src/app/api/providers/[id]/route.ts`    |
| `provider.credentials.batch_revoked` | `src/app/api/providers/route.ts`         |
| `sync.token.created`                 | `src/app/api/sync/tokens/route.ts`       |
| `sync.token.revoked`                 | `src/app/api/sync/tokens/[id]/route.ts`  |
| `compliance.cleanup`                 | `src/lib/compliance/index.ts`            |
| `api_key.auth.touch`                 | `src/server/authz/policies/clientApi.ts` |

Κάθε καταχώριση αποθηκεύει τα `action`, `actor` (η προεπιλεγμένη τιμή είναι
`"system"`), `target`, `details`/`metadata` (JSON), `ip_address`, `resource_type`,
`status`, `request_id` και `timestamp`. Τα ευαίσθητα κλειδιά (`apiKey`, `accessToken`,
`refreshToken`, `password`, οτιδήποτε αντιστοιχεί στα `*token`/`*secret`/`*apikey`,
κ.λπ.) αποκρύπτονται αναδρομικά ως `"[redacted]"` πριν εγγραφεί η γραμμή.

Οι γραμμές `api_key.auth.touch` καταγράφουν επιτυχείς αναγνώσεις μεταδεδομένων
κλειδιών API και αναγνώσεις εντοπισμού (GET/HEAD) που δεν φτάνουν ποτέ στο αρχείο
καταγραφής αιτημάτων: ποιο κλειδί χρησιμοποιήθηκε, πότε και την κανονικοποιημένη
διαδρομή, με συγχώνευση και ανώτατο όριο 1.000 γραμμών. Παραλείπονται τα κλειδιά
με `noLog` και το κλειδί περιβάλλοντος. Η διεύθυνση IP και ο user-agent του
καλούντος προστίθενται μόνο όταν είναι ενεργοποιημένη η σημαία δυνατοτήτων
`API_KEY_AUDIT_CLIENT_DETAILS_ENABLED` (απενεργοποιημένη από προεπιλογή).

### Κλήσεις εργαλείων MCP (`mcp_tool_audit`)

Κάθε κλήση εργαλείου MCP εγγράφει μία γραμμή μέσω του
`open-sse/mcp-server/audit.ts`. Σχήμα (από το
`src/lib/db/migrations/002_mcp_a2a_tables.sql`):

| Στήλη            | Σημειώσεις                                       |
| ---------------- | ------------------------------------------------ |
| `id`             | αυτόματη αύξηση                                  |
| `tool_name`      | αναγνωριστικό εργαλείου MCP                      |
| `input_hash`     | sha256 της εισόδου (δεν αποθηκεύεται φορτίο)     |
| `output_summary` | σύντομη, περικομμένη σύνοψη                      |
| `duration_ms`    | χρόνος τοίχου                                    |
| `api_key_id`     | καλών (με δυνατότητα null)                       |
| `success`        | `1` / `0`                                        |
| `error_code`     | τελικός κωδικός σφάλματος σε περίπτωση αποτυχίας |
| `created_at`     | χρονική σήμανση ISO                              |

### Αρχεία καταγραφής αιτημάτων / χρήσης

Αυτά είναι λειτουργικά δεδομένα τηλεμετρίας (όχι αυστηρά διαχειριστικός έλεγχος),
αλλά χρησιμοποιούν την ίδια διοχέτευση διατήρησης:

- `usage_history` — συγκεντρωτικά δεδομένα χρήσης ανά αίτημα
- `call_logs` — πλήρες αρχείο καταγραφής ανά αίτημα (υπόκειται σε όριο γραμμών, βλ. παρακάτω)
- `proxy_logs` — αρχείο καταγραφής κίνησης διακομιστή μεσολάβησης (υπόκειται σε όριο γραμμών)
- `request_detail_logs` — παλαιό λεπτομερές αρχείο καταγραφής αιτημάτων (εκκαθαρίζεται επίσης, αν υπάρχει)

## Σχήμα αποθήκευσης

Ο πίνακας `audit_log` δημιουργείται με αναβλημένο τρόπο από τη `ensureAuditLogSchema()` κατά την πρώτη χρήση:

```sql
CREATE TABLE IF NOT EXISTS audit_log (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp     TEXT NOT NULL DEFAULT (datetime('now')),
  action        TEXT NOT NULL,
  actor         TEXT NOT NULL DEFAULT 'system',
  target        TEXT,
  details       TEXT,
  ip_address    TEXT,
  resource_type TEXT,
  status        TEXT,
  request_id    TEXT,
  metadata      TEXT
);
```

Δημιουργούνται ευρετήρια στα `timestamp`, `action`, `actor`, `resource_type`,
`status` και `request_id`. Οι στήλες που λείπουν από παλαιότερες βάσεις δεδομένων προστίθενται μέσω
`ALTER TABLE` κατ’ απαίτηση.

## Διατήρηση & Εκκαθάριση

Τηρούνται δύο ξεχωριστά χρονικά παράθυρα διατήρησης:

| Μεταβλητή περιβάλλοντος     | Προεπιλογή | Ισχύει για                                                        |
| --------------------------- | ---------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`        | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`        | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000`   | Περικοπή βάσει ορίου γραμμών για το `call_logs`                   |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000`   | Περικοπή βάσει ορίου γραμμών για το `proxy_logs`                  |

Η `cleanupExpiredLogs()` εκτελεί τη διαδικασία διατήρησης. Καλείται κατά την εκκίνηση του διακομιστή
από το `src/instrumentation-node.ts`. Κάθε εκτέλεση καταγράφει ένα συμβάν ελέγχου
`compliance.cleanup` με τον αριθμό διαγραφών ανά πίνακα. Η περικοπή των αρχείων καταγραφής proxy/κλήσεων
εκτελείται σε παρτίδες (`BATCH_SIZE = 5000`) για την αποφυγή παρατεταμένων κλειδωμάτων εγγραφής.

Η μη αυτόματη εκκαθάριση του ιστορικού αιτημάτων είναι ξεχωριστή από τη διατήρηση. Η σελίδα Αρχείων Καταγραφής Αιτημάτων
καλεί το `POST /api/settings/purge-request-history`, το οποίο διαγράφει τα `call_logs`,
τα παλαιού τύπου `request_detail_logs` και τα τοπικά τεχνουργήματα αιτημάτων στον κατάλογο
`${DATA_DIR}/call_logs/`.

Οι προεπιλογές ορίζονται στο `src/lib/logEnv.ts`
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## `noLog` Opt-Out (ανά κλειδί API )

Τα κλειδιά API μπορούν να επισημανθούν, έτσι ώστε η κίνηση κατάντη κλήσης να μην καταγράφεται. Η σημαία βρίσκεται στον πίνακα `api_keys` (`no_log INTEGER DEFAULT 0`) και αντικατοπτρίζεται σε ένα σύνολο μνήμης για αναζητήσεις hot-path.

```bash
# Create a no-log key (management auth required)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Βοηθοί (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — εναλλάσσει την καταχώρηση στη μνήμη
- `isNoLog(apiKeyId)` — ελεγμένο στη διαδρομή αιτήματος. επιστρέφει σε 30 δευτερόλεπτα αποθηκευμένη στην κρυφή ανάγνωση από `api_keys.no_log`
- `NO_LOG_API_KEY_IDS` (env, διαχωρισμένα με κόμμα) — προφορτωμένο στο σετ μνήμης κατά την εκκίνηση. χρήσιμο όταν δεν μπορείτε να αλλάξετε απευθείας τη στήλη

Τα συμβάντα διοικητικού ελέγχου (σύνδεση, αλλαγές παρόχου, κλήσεις εργαλείου MCP κ.λπ.) είναι** δεν** επηρεάζεται από `noLog` — μόνο η καταγραφή επισκεψιμότητας ανά αίτημα εξαιρείται.

### Εξαίρεση ανά αίτημα (`x-omniroute-no-log`)

Ένας πελάτης μπορεί να επιλέξει ένα μεμονωμένο αίτημα συμπερασμάτων από τη διατήρηση ωφέλιμου φορτίου χωρίς να δημιουργήσει ένα αποκλειστικό κλειδί. Στείλτε `x-omniroute-no-log: true` κατόπιν αιτήματος (`1` και `yes` γίνονται επίσης αποδεκτά, χωρίς διάκριση πεζών-κεφαλαίων). Ισχύει για κάθε διαδρομή συνομιλίας-οικογένειας που εκτελείται μέσω του προγράμματος χειρισμού συνομιλίας: Ολοκληρώσεις συνομιλίας, Απαντήσεις, Μηνύματα, Ολοκληρώσεις και τη διαδρομή συμβατή με Gemini. Η σειρά καταγραφής κλήσεων εξακολουθεί να γράφεται με τη χρονική σήμανση, το μοντέλο, τον πάροχο, την κατάσταση, τη διάρκεια και τις μετρήσεις διακριτικών, αλλά `request_body`, `response_body`, οι περιλήψεις αιτημάτων και τα τεχνουργήματα διοχέτευσης παραλείπονται.

Η κεφαλίδα είναι ORed με τη σημαία κλειδιού: ένα κλειδί no-log παραμένει no-log ανεξάρτητα από την κεφαλίδα και η κεφαλίδα δεν μπορεί να ενεργοποιήσει ξανά την καταγραφή για ένα κλειδί no-log. Η κεφαλίδα αφαιρείται πριν προωθηθεί το αίτημα ανάντη.

Αυτή η κεφαλίδα κάνει** δεν** απενεργοποιήστε την εξαγωγή μνήμης ή τη σημασιολογική κρυφή μνήμη. Στείλτε `x-omniroute-no-memory: true` και `x-omniroute-no-cache: true` μαζί του όταν το αίτημα δεν πρέπει να παραμένει περιεχόμενο σε αυτά τα υποσυστήματα.

## REST API

| Endpoint                    | Μέθοδος | Περιγραφή                                              | Έλεγχος ταυτότητας |
| --------------------------- | ------- | ------------------------------------------------------ | ------------------ |
| `/api/compliance/audit-log` | `GET`   | Σελιδοποιημένες εγγραφές ελέγχου διαχειριστή με φίλτρα | management         |
| `/api/mcp/audit`            | `GET`   | Σελιδοποιημένες εγγραφές ελέγχου εργαλείων MCP         | (open-sse)         |
| `/api/mcp/audit/stats`      | `GET`   | Συγκεντρωτικά στατιστικά ελέγχου MCP                   | (open-sse)         |

Προς το παρόν δεν παρέχεται endpoint εξαγωγής CSV — πραγματοποιήστε εξαγωγή από τον πίνακα ελέγχου ή υποβάλετε απευθείας ερώτημα
στη βάση δεδομένων SQLite.

### Υποβολή ερωτημάτων στο `/api/compliance/audit-log`

Υποστηριζόμενες παράμετροι ερωτήματος (όλες προαιρετικές, όλες χρησιμοποιούν αντιστοίχιση `LIKE %value%` για
φίλτρα κειμένου):

- `action`, `actor`, `target`, `resourceType` (ή `resource_type`),
  `status`, `requestId` (ή `request_id`)
- `from` / `since`, `to` / `until` — χρονικές σημάνσεις ISO
- `limit` (προεπιλογή `50`, ελάχιστο `1`, μέγιστο `500`)
- `offset` (προεπιλογή `0`, μέγιστο `10_000`)

Η απόκριση είναι ένας πίνακας JSON. Τα μεταδεδομένα σελιδοποίησης επιστρέφονται στις κεφαλίδες:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Πίνακας ελέγχου

Ο πίνακας ελέγχου εμφανίζει τα δεδομένα ελέγχου στη διεύθυνση **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`). Η σελίδα διαθέτει δύο καρτέλες:

- **Συμμόρφωση** (`ComplianceTab.tsx`) — συμβάντα ελέγχου διαχειριστή από το
  `/api/compliance/audit-log`. Φιλτράρισμα κατά τύπο συμβάντος, σοβαρότητα (ενημερωτικό / προειδοποίηση
  / κρίσιμο, που προκύπτει από την ενέργεια + κατάσταση) και εύρος ημερομηνιών. Η σοβαρότητα
  υπολογίζεται στην πλευρά του προγράμματος-πελάτη από τις συμβολοσειρές ενέργειας/κατάστασης.
- **MCP** (`McpAuditTab.tsx`) — έλεγχος εργαλείων MCP από το `/api/mcp/audit`, με
  φίλτρα κατά όνομα εργαλείου και επιτυχία/αποτυχία.

Και οι δύο καρτέλες χρησιμοποιούν σελιδοποίηση με μεγέθη σελίδας `50` (συμμόρφωση) και `25` (MCP).

## Βοηθητικές συναρτήσεις διαπιστευτηρίων παρόχου

Το `src/lib/compliance/providerAudit.ts` παρέχει βοηθητικές συναρτήσεις διαμόρφωσης που χρησιμοποιούνται από τις
διαδρομές διαχείρισης παρόχων όταν εκπέμπουν συμβάντα διαπιστευτηρίων:

- `summarizeProviderConnectionForAudit(connection)` — αφαιρεί τα `apiKey`,
  `accessToken`, `refreshToken`, `idToken` και
  `providerSpecificData.consoleApiKey` πριν εγγραφεί το στιγμιότυπο της σύνδεσης στο
  `details`.
- `getProviderAuditTarget(connection)` — συνθέτει μια σταθερή συμβολοσειρά
  `"<provider>:<name|id>"` για το πεδίο `target`.
- `extractProviderWarnings(...payloads)` — σαρώνει τις αποκρίσεις παρόχων για
  προειδοποιήσεις πολιτικής/ασφάλειας (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) και
  εμφανίζει έως 5 αποτελέσματα, καθένα περικομμένο στους 400 χαρακτήρες.

## Βέλτιστες πρακτικές

- Επισημάνετε τα κλειδιά API που διαχειρίζονται προσωπικά αναγνωρίσιμα στοιχεία (νομικά, ιατρικά κ.λπ.) με `noLog: true`.
- Προσαρμόστε τα `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` ώστε να ανταποκρίνονται στην
  πολιτική διατήρησής σας. Οι προεπιλεγμένες 7 ημέρες αποτελούν συντηρητική επιλογή.
- Εξαγάγετε τον πίνακα ελέγχου εκτός πλατφόρμας (`sqlite3 dump`) με όποια συχνότητα
  απαιτεί το πρόγραμμα συμμόρφωσής σας — δεν υπάρχει ενσωματωμένη αρχειοθέτηση.
- Παρακολουθείτε τις μετρήσεις `auth.login.failed` και `auth.login.locked` για τον
  εντοπισμό επιθέσεων εξαντλητικής αναζήτησης.
- Κατά την προσθήκη νέων endpoint διαχειριστή, καλέστε το `logAuditEvent({ ... })` με μια σταθερή
  συμβολοσειρά ενέργειας `domain.verb.outcome` και μεταβιβάστε το περιβάλλον του αιτήματος μέσω του
  `getAuditRequestContext(request)`, ώστε η διεύθυνση IP και το `requestId` να καταγράφονται
  αυτόματα.

## Δείτε επίσης

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — απόκρυψη PII, έγχυση προτροπών
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — κατάλογος εργαλείων MCP και πεδία εφαρμογής
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — πλήρης αναφορά μεταβλητών περιβάλλοντος
- Πηγαίος κώδικας: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
