# OmniRoute A2A Server Documentation (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Πρωτόκολλο Agent-to-Agent v0.3 — το OmniRoute ως ευφυής πράκτορας δρομολόγησης

Η επιφάνεια A2A έχει δύο όψεις:

- **JSON-RPC 2.0** στο `POST /a2a` (κανονικό σημείο εισόδου, ορισμένο στο `src/app/a2a/route.ts`).
- **REST** κάτω από το `/api/a2a/*` για πίνακες ελέγχου και εργαλεία (κατάσταση, λίστα εργασιών, ακύρωση).

Οι εργασίες παρακολουθούνται από το `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, προεπιλεγμένο TTL 5 λεπτών). Οι δεξιότητες αποστέλλονται μέσω του `A2A_SKILL_HANDLERS` στο `src/lib/a2a/taskExecution.ts`.

## Ανακάλυψη Agent

```bash
curl http://localhost:20128/.well-known/agent.json
```

Επιστρέφει το Agent Card που περιγράφει τις δυνατότητες, τις δεξιότητες και τις απαιτήσεις αυθεντικοποίησης του OmniRoute.

Το πεδίο `version` του Agent Card αντλείται από το `process.env.npm_package_version` (βλ. `src/app/.well-known/agent.json/route.ts:13`), οπότε παραμένει αυτόματα συγχρονισμένο με το `package.json` σε κάθε έκδοση.

---

## Αυθεντικοποίηση

Όλες οι αιτήσεις στο `/a2a` απαιτούν κλειδί API μέσω της κεφαλίδας `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Εάν δεν έχει διαμορφωθεί κλειδί API στον διακομιστή, η αυθεντικοποίηση παρακάμπτεται.

## Ενεργοποίηση

Το A2A ελέγχεται από τον διακόπτη **Endpoints → A2A** και είναι απενεργοποιημένο από προεπιλογή. Όταν είναι απενεργοποιημένο,
το `GET /api/a2a/status` αναφέρει `status: "disabled"` και `online: false`· οι κλήσεις JSON-RPC στο
`POST /a2a` επιστρέφουν HTTP 503 με κωδικό σφάλματος JSON-RPC `-32000`.

---

## Μέθοδοι JSON-RPC 2.0

### `message/send` — Σύγχρονη εκτέλεση

Στέλνει ένα μήνυμα σε μια δεξιότητα και περιμένει την πλήρη απόκριση.

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/send",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Write a hello world in Python"}],
      "metadata": {"model": "auto", "combo": "fast-coding"}
    }
  }'
```

Για το `smart-routing`, το `metadata.combo` αποτελεί ρητή παράκαμψη του
`metadata.model` για το αίτημα προς την πύλη· αποστέλλεται ως το πραγματικό `model`
και όχι ως ένα αγνοούμενο πεδίο JSON `x-combo`. Εξακολουθούν να ισχύουν το κανονικό κλειδί API της πύλης και
η εξουσιοδότηση ανά προορισμό. Ένα μη έγκυρο ή κενό combo απορρίπτεται.

Το αποτέλεσμα εκθέτει τα `requested_combo` (πρόθεση καλούντος), `dispatched_model`
(το πραγματικό αίτημα προς την πύλη), `response_model` (απόκριση πύλης) και
`confirmed_combo`. Το τελευταίο πεδίο είναι `null`, εκτός εάν η πύλη
προσδιορίσει ρητά ένα combo. Τα αρχεία καταγραφής αποφάσεων A2A αποδίδουν την εκτέλεση μόνο σε ένα
επιβεβαιωμένο combo, διατηρώντας ένα μη επιβεβαιωμένο αίτημα ως `requestedCombo`.

**Απόκριση:**

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "result": {
    "task": { "id": "uuid", "state": "completed" },
    "artifacts": [{ "type": "text", "content": "..." }],
    "metadata": {
      "routing_explanation": "Selected claude-sonnet via provider \"anthropic\" (latency: 1200ms, cost: $0.003)",
      "requested_combo": "fast-coding",
      "confirmed_combo": null,
      "dispatched_model": "fast-coding",
      "response_model": "claude-sonnet",
      "cost_envelope": { "estimated": 0.005, "actual": 0.003, "currency": "USD" },
      "resilience_trace": [
        { "event": "primary_selected", "provider": "anthropic", "timestamp": "..." }
      ],
      "policy_verdict": { "allowed": true, "reason": "within budget and quota limits" }
    }
  }
}
```

### `message/stream` — Ροή SSE

Όπως το `message/send`, αλλά επιστρέφει Server-Sent Events για ροή σε πραγματικό χρόνο.

```bash
curl -N -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/stream",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Explain quantum computing"}]
    }
  }'
```

**Συμβάντα SSE:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Έλεγχος κατάστασης εργασίας

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Ακύρωση εργασίας

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Διαθέσιμες Δεξιότητες

OmniRoute εκθέτει 6 δεξιότητες A2A ενσωματωμένες στο `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Κάθε ενότητα δεξιοτήτων ζει στο `src/lib/a2a/skills/`.

| Επιδεξιότητα           | ID                   | Περιγραφή                                                                                                                                                          | Ετικέτες                         | Παραδείγματα                                                  |
| :--------------------- | :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------- | :------------------------------------------------------------ |
| Έξυπνη δρομολόγηση     | `smart-routing`      | Δρομολογεί μια προτροπή μέσω του βέλτιστου provider/combo χρησιμοποιώντας τη βαθμολόγηση + του σύνθετου κινητήρα του OmniRoute                                     | δρομολόγηση, πάροχοι             | "Δρομολογήστε αυτήν την προτροπή μέσω του καλύτερου μοντέλου" |
| Διαχείριση ποσοστώσεων | `quota-management`   | Αναφέρει την κατάσταση ορίου ανά πάροχο, βοηθά τους καλούντες να αποφασίσουν πότε θα κάνουν throttle/switch                                                        | ποσόστωση, πάροχοι               | "Έλεγχος ποσόστωσης για ανθρωπόμορφο"                         |
| Ανακάλυψη παρόχου      | `provider-discovery` | Εμφανίζει τους εγκατεστημένους παρόχους με δυνατότητες, σημαίες ελεύθερης βαθμίδας, κατάσταση OAuth                                                                | πάροχοι, ανακάλυψη               | "Ποιοι πάροχοι είναι διαθέσιμοι;"                             |
| Ανάλυση Κόστους        | `cost-analysis`      | Εκτιμά το κόστος ενός request/conversation με βάση τον κατάλογο + πρόσφατη χρήση                                                                                   | κόστος, χρήση                    | "Εκτιμώ κόστος για αυτήν τη συνομιλία"                        |
| Έκθεση Υγείας          | `health-report`      | Διακόπτης κυκλώματος αδρανών, ψύξη, κατάσταση κλειδώματος ανά πάροχο                                                                                               | υγεία, ανθεκτικότητα             | "Εμφάνιση κατάστασης υγείας όλων των παρόχων"                 |
| Δυνατότητες λίστας     | `list-capabilities`  | Επιστρέφει τον πλήρη κατάλογο Agent Skills με 45 καταχωρήσεις (23 API + 21 CLI + 1 config) ως πίνακα σήμανσης με ακατέργαστο SKILL.md URLs για ένεση περιβάλλοντος | κατάλογος, ανακάλυψη, δεξιότητες | "Κατάλογος όλων των δυνατοτήτων OmniRoute "                   |

> Η Κάρτα Αντιπροσώπου θα πρέπει να διατηρείται ευθυγραμμισμένη με τον ζωντανό κατάλογο παρόχων 394. Οι μετρήσεις παρόχων και τα μεταδεδομένα free/no-auth προέρχονται από το μητρώο χρόνου εκτέλεσης.

### Λεπτομέρεια δεξιοτήτων `list-capabilities`

Η δεξιότητα `list-capabilities` είναι ιδιαίτερα χρήσιμη για εξωτερικούς πράκτορες που πρέπει να ανακαλύψουν τι εκθέτει OmniRoute πριν στείλουν κλήσεις API. Επιστρέφει ένα τεχνούργημα δομημένου πίνακα σήμανσης:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Κάθε σειρά περιλαμβάνει τη στήλη `rawUrl`, ώστε οι πράκτορες να μπορούν να ανακτήσουν αμέσως το πλήρες SKILL.md. Το πεδίο `metadata.totalSkills` αντικατοπτρίζει το μέγεθος του καταλόγου (45 σήμερα). Υλοποίηση: `src/lib/a2a/skills/listCapabilities.ts`. Δείτε επίσης [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (βοηθητικό)

Το τελικό σημείο JSON-RPC `/a2a` είναι το κανονικό σημείο εισόδου A2A. Τα παρακάτω σημεία REST παρέχουν βοηθητική πρόσβαση για πίνακες εργαλείων και εξωτερικά εργαλεία:

| Τελικό σημείο                | Μέθοδος | Περιγραφή                                                              | Auth                                                                                                            |
| :--------------------------- | :------ | :--------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------- |
| `/api/a2a/status`            | GET     | Κατάσταση διακομιστή, εγγεγραμμένες δεξιότητες                         | (κοινό)                                                                                                         |
| `/api/a2a/tasks`             | GET     | Λίστα εργασιών με φίλτρα                                               | διαχείριση ή κλειδί API (δείτε παρακάτω)                                                                        |
| `/api/a2a/tasks/[id]`        | GET     | Λάβετε καθήκοντα από ID                                                | διαχείριση ή κλειδί API (δείτε παρακάτω)                                                                        |
| `/api/a2a/tasks/[id]/cancel` | POST    | Ακύρωση εκτελούμενης εργασίας                                          | διαχείριση ή κλειδί API (δείτε παρακάτω)                                                                        |
| `/.well-known/agent.json`    | GET     | Κάρτα πράκτορα (ανακάλυψη A2A )                                        | (δημόσιο, αποθηκευμένο στην κρυφή μνήμη 3600s)                                                                  |
| `/api/a2a/tasks`             | POST    | Εισερχόμενη αντιπροσωπεία στον στόλο OmniConductor (Conductor PRD RF5) | το ίδιο με `GET`, συν `OMNIROUTE_API_KEY` αν οριστεί ενώ `REQUIRE_API_KEY` είναι απενεργοποιημένο. `a2aEnabled` |

Το ποιος θα περάσει στις διαδρομές `/api/a2a/tasks*` εξαρτάται από τη σύνδεση και τις ρυθμίσεις κλειδιού API:

- `requireLogin=true` (προεπιλογή): το ενδιάμεσο λογισμικό δέχεται μόνο διαπιστευτήρια διαχείρισης (συνεδρία πίνακα εργαλείων, κλειδί `manage` -scope API, διακριτικό πρόσβασης `oma_` ) και `OMNIROUTE_API_KEY`. Ένα απλό κλειδί συμπερασμάτων παίρνει `403`. Στην κεφαλίδα `Authorization` το ενδιάμεσο λογισμικό παίρνει μόνο `OMNIROUTE_API_KEY` ως `Bearer <key>`. ένα γυμνό κλειδί ή μια καρτέλα μετά `Bearer` παίρνει `401`.
- `requireLogin=false`, ή το παράθυρο επαναφοράς πριν από την επιβίβαση: με `REQUIRE_API_KEY=true` γίνεται αποδεκτό οποιοδήποτε έγκυρο κλειδί OmniRoute API ή διαπιστευτήριο διαχείρισης και οι ανώνυμοι καλούντες λαμβάνουν `401`. με `REQUIRE_API_KEY` εκτός τα δρομολόγια είναι ανοιχτά.
- `POST /api/a2a/tasks` απαιτεί επιπλέον `OMNIROUTE_API_KEY` στην κεφαλίδα `Authorization` όταν αυτή η μεταβλητή έχει οριστεί και `REQUIRE_API_KEY` είναι απενεργοποιημένο. Άλλες κεφαλίδες, όπως `x-api-key`, δεν υπολογίζονται εκεί. Όταν η σύνδεση είναι απενεργοποιημένη ή πριν από την επιβίβαση, το κλειδί περνά με ή χωρίς πρόθεμα `Bearer`. με ενεργοποιημένη τη σύνδεση, μόνο `Bearer <key>` ξεπερνά το ενδιάμεσο λογισμικό.

Όπου απαιτείται διαπιστευτήριο, ένα διακριτικό `read` -scope `oma_` λειτουργεί μόνο για `GET`.

**Αντιπροσωπεία εισερχόμενου μαέστρου (`POST /api/a2a/tasks`):** Εξωτερικοί πράκτορες A2A αναθέτουν την εργασία κωδικοποίησης στον στόλο OmniConductor μέσω OmniRoute. Σώμα: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — μόνο Οι δεξιότητες στόλου μαέστρου (αυτές που ανακοινώνονται στην Κάρτα Αντιπροσώπου) είναι μεταβιβάσιμες. Απαιτείται `metadata.conductor.repo.url` (ο στόλος λειτουργεί σε git repos). Η διαδρομή μεταφράζεται σε `POST /v1/tasks` του διανομέα χρησιμοποιώντας το `CONDUCTOR_ORCHESTRATOR_TOKEN` από την πλευρά του διακομιστή (εναλλακτικό `CONDUCTOR_HUB_TOKEN`) και επιστρέφει `201 { conductor_task_id, state: "submitted" }`. Οι καταστάσεις εργασιών ρέουν πίσω μέσω του SSE→A2A mirror (RF1) και είναι ορατές μέσω `GET /api/a2a/tasks?skill=conductor`.

---

## Προσθήκη νέας ικανότητας

1. **Δημιουργία αρχείου δεξιοτήτων:** `src/lib/a2a/skills/<your-skill>.ts`

   Εξαγωγή μιας ασύγχρονης συνάρτησης `(task: A2ATask, caller?: A2ACallerContext) => Promise<{ artifacts, metadata }>`. Ακολουθήστε το σχήμα των υπαρχουσών δεξιοτήτων όπως `smartRouting.ts`. Εάν η δεξιότητα καλεί ξανά σε OmniRoute πάνω από HTTP, δημιουργήστε τις κεφαλίδες με `buildSelfLoopHeaders(caller)` από `src/lib/a2a/selfLoopAuth.ts`, ώστε η κλήση να εκτελείται με το κλειδί καλούντος A2A και όχι με `OMNIROUTE_API_KEY` και περάστε `redirect: "error"` στο `fetch` ώστε μια ανακατεύθυνση να μην λάβει ποτέ το κλειδί. Ο βοηθός δημιουργεί μόνο κεφαλίδες. Κάθε δεξιότητα ορίζει την ίδια την πολιτική ανακατεύθυνσης. Ρίχνει `UnsafeSelfLoopTargetError` αντί να επισυνάψει ένα κλειδί όταν η επιλυμένη βάση URL είναι απλή http εκτός του ιδιωτικού δικτύου (loopback, ένα όνομα κοντέινερ ή υπηρεσίας και οι ιδιωτικές διευθύνσεις είναι εντάξει) ή διατηρεί διαπιστευτήρια, επομένως μια ικανότητα που καταπίνει τις απορριφθείσες κλήσεις πρέπει να επαναφέρει αυτό το σφάλμα.

2. **Διαχειριστής εγγραφής:** στο `src/lib/a2a/taskExecution.ts`, προσθέστε μια καταχώρηση στο `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...existing skills
     "your-skill": async (task, caller) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task, caller);
     },
   };
   ```

3. **Έκθεση στην κάρτα αντιπροσώπου:** σε `src/lib/a2a/agentCardMetadata.ts` (κοινόχρηστο από `/.well-known/agent.json` και `/.well-known/agent-card.json`), προσαρτήστε στον πίνακα `skills` :

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **Γράψτε τεστ:** `tests/unit/a2a-<your-skill>.test.ts`. Διαδρομή σφάλματος κάλυψης happy path +.

5. **Εγγραφο** η νέα ικανότητα στον πίνακα `Available Skills` αυτού του αρχείου.

---

## TTL Εργασίας

Οι εργασίες λήγουν μετά από `ttlMinutes` (προεπιλογή 5 λεπτά) — ρυθμίζεται στον κατασκευαστή `A2ATaskManager` στο `src/lib/a2a/taskManager.ts:82`. Για προσαρμογή, δημιουργήστε fork της παρουσίας `A2ATaskManager` και περάστε διαφορετική τιμή (π.χ., `new A2ATaskManager(15)` για TTL 15 λεπτών). Ένα εκτελούμενο στο παρασκήνιο χρονικό διάστημα σαρώνει τις ληγμένες εργασίες κάθε 60 δευτερόλεπτα.

---

## Κύκλος Ζωής Εργασίας

```
submitted → working → completed
                    → failed
                    → cancelled
```

- Οι εργασίες λήγουν μετά από 5 λεπτά από προεπιλογή (βλ. [TTL Εργασίας](#task-ttl))
- Τερματικές καταστάσεις: `completed`, `failed`, `cancelled`
- Το αρχείο καταγραφής συμβάντων παρακολουθεί κάθε μετάβαση κατάστασης

---

## Κωδικοί Σφάλματος

| Κωδικός | Σημασία                                     |
| :------ | :------------------------------------------ |
| -32700  | Σφάλμα ανάλυσης (μη έγκυρο JSON)            |
| -32600  | Μη έγκυρο αίτημα / Μη εξουσιοδοτημένο       |
| -32601  | Η μέθοδος ή η δεξιότητα δεν βρέθηκε         |
| -32602  | Μη έγκυρες παράμετροι                       |
| -32603  | Εσωτερικό σφάλμα                            |
| -32000  | Το τελικό σημείο A2A είναι απενεργοποιημένο |

---

## Παραδείγματα ολοκλήρωσης

### Python (αιτήματα)

```python
import requests

resp = requests.post("http://localhost:20128/a2a", json={
    "jsonrpc": "2.0", "id": "1",
    "method": "message/send",
    "params": {
        "skill": "smart-routing",
        "messages": [{"role": "user", "content": "Hello"}]
    }
}, headers={"Authorization": "Bearer YOUR_KEY"})

result = resp.json()["result"]
print(result["artifacts"][0]["content"])
print(result["metadata"]["routing_explanation"])
```

### TypeScript (φέρω)

```typescript
const resp = await fetch("http://localhost:20128/a2a", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_KEY",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: "1",
    method: "message/send",
    params: {
      skill: "smart-routing",
      messages: [{ role: "user", content: "Hello" }],
    },
  }),
});
const { result } = await resp.json();
console.log(result.metadata.routing_explanation);
```
