# OmniRoute MCP Server Documentation (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Διακομιστής πρωτοκόλλου περιβάλλοντος μοντέλου με 110 εργαλεία σε λειτουργίες δρομολόγησης, κρυφής μνήμης, συμπίεσης, μνήμης, δεξιοτήτων, διακομιστή μεσολάβησης, πισίνας, ραντάρ και προέλευσης περιβάλλοντος.
>
> Source of truth: `open-sse/mcp-server/server.ts` computes **110 unique tools** with `countUniqueMcpTools()`: 45 canonical definitions (including the six CCR lifecycle tools, the agent-skills trio, `omniroute_radar_catalog`, and `omniroute_x_search`), plus memory (3), skills (4), GitHub skills (3), pool (6), gamification (8), plugins (8), Notion (6), Obsidian (22), local corpus (3), and two RTK-only compression tools.

## Εγκατάσταση

OmniRoute MCP είναι ενσωματωμένο. Ξεκινήστε το με:

```bash
omniroute --mcp
```

Ή μέσω της ανοιχτής μεταφοράς:

```bash
# Streamable HTTP transport (default port 20128, in-process on the dashboard server)
# Client endpoint: http://localhost:20128/api/mcp/stream
# stdio: omniroute --mcp
```

Οι μεταφορές HTTP (`sse` / `streamable-http`, εξυπηρετούνται κατά τη διαδικασία από τον διακομιστή του πίνακα εργαλείων) είναι απενεργοποιημένες από προεπιλογή και προηγουμένως μπορούσαν να εναλλάσσονται μόνο από τη σελίδα `/dashboard/mcp`. Από την έκδοση 3.8.51 το CLI έχει ισοτιμία:

```bash
omniroute mcp status                                  # enabled/online, transport, tool count
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # resets active sse/streamable-http sessions
```

`mcp enable`/`mcp disable` PATCH το ίδιο `mcpEnabled` (και προαιρετικά `mcpTransport`) που ρυθμίζει το ταμπλό εναλλάσσεται μέσω `/api/settings`. `mcp restart` καλεί `POST /api/mcp/restart`: καταργεί τις ενεργές περιόδους λειτουργίας `sse`/`streamable-http` έτσι ώστε το επόμενο αίτημα να επανεκκινείται καθαρά, να επιστρέφει `409` εάν MCP είναι απενεργοποιημένο και `501` για τη μεταφορά `stdio` (οι πελάτες του stdio έχουν τη δική τους υποδιεργασία — δεν υπάρχει χειρισμός στη διαδικασία για επανεκκίνηση).

## Μεταφορές

Ο διακομιστής MCP εκθέτει τρεις μεταφορές, όλες που υποστηρίζονται από το ίδιο εργοστάσιο `createMcpServer()` :

| Μεταφορά          | Οπου                                         | Πότε να χρησιμοποιείται                                               |
| :---------------- | :------------------------------------------- | :-------------------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`              | Ενσωματώσεις IDE (Claude Desktop, Cursor, κ.λπ.)                      |
| `sse`             | `POST/GET /api/mcp/sse` μέσω `httpTransport` | πελάτες Browser/agent που χρειάζονται μια ροή συμβάντων               |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`            | Πελάτες HTTP πολλαπλών περιόδων σύνδεσης (κεφαλίδα `mcp-session-id` ) |

Η ενεργή μεταφορά HTTP (`sse` ή `streamable-http`) επιλέγεται από τη ρύθμιση `mcpTransport`. Η εναλλαγή μεταφορών κλείνει τις υπάρχουσες συνεδρίες στο άλλο μέσο μεταφοράς.

### Απομακρυσμένη πρόσβαση (διαχείριση παράκαμψης εύρους)

`/api/mcp/*` βρίσκεται στη βαθμίδα LOCAL_ONLY (`src/server/authz/routeGuard.ts`) — από προεπιλογή μόνο οι κεντρικοί υπολογιστές loopback (`localhost`, `127.0.0.1`, `::1`) μπορούν να το προσεγγίσουν. Από την έκδοση 3.8.2, οι υπολογιστές-πελάτες που δεν είναι επαναληπτικοί μπορούν να συνδεθούν εάν παρουσιάζουν ένα `Authorization: Bearer <api-key>` του οποίου το κλειδί φέρει το εύρος `manage`. Αυτός είναι ο μόνος τρόπος για να φτάσετε στον απομακρυσμένο διακομιστή MCP μέσω ενός τούνελ, ενός αντίστροφου διακομιστή μεσολάβησης ή ενός δημόσιου ονόματος κεντρικού υπολογιστή.

```bash
# Grant manage scope: open the dashboard API Keys page and toggle
# "Management Access" on the key, or POST scopes:["manage"] when creating.

# Then connect from a remote MCP client:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

Ένα κλειδί μη διαχείρισης (ή χωρίς Φορέα) επιστρέφει `403 LOCAL_ONLY`. Το αδερφικό πρόθεμα `/api/cli-tools/runtime/*` είναι σκόπιμα NOT παράκαμψη — βλέπε [Route Guard Tiers — Manage-scope carve-out](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

### Επικύρωση προέλευσης

Μετά τον έλεγχο ταυτότητας, κάθε αίτημα για `/api/mcp/*` — τις μεταφορές και τις διαδρομές διαχείρισης, όπως `status`, `tools`, `audit` και `restart` — επικυρώνεται η κεφαλίδα `Origin`, ανεξάρτητα από τον καλούντα (κλειδί API, διακριτικό CLI, περίοδος λειτουργίας πίνακα ελέγχου ή ανώνυμη επαναφορά επαναφοράς με απενεργοποιημένη σύνδεση). Αυτή είναι η προστασία επανασύνδεσης DNS που απαιτεί η προδιαγραφή MCP Streamable HTTP.

- **Χωρίς κεφαλίδα `Origin`** → επιτρέπεται. Οι πελάτες OmniRoute CLI, SDK και IDE δεν στέλνουν ένα.
- **Επιτρεπόμενο `Origin`** → `localhost`, `127.0.0.1` ή `[::1]` σε οποιαδήποτε θύρα ή τη δημόσια προέλευση του OmniRoute: `OMNIROUTE_PUBLIC_BASE_URL` / `NEXT_PUBLIC_BASE_URL` / `NEXT_PUBLIC_APP_URL`, προωθημένη προέλευση αξιόπιστου ανάστροφου διακομιστή μεσολάβησης (`OMNIROUTE_TRUST_PROXY`, μόνο όταν δεν έχει οριστεί βάση URL ) ή άμεσος κεντρικός υπολογιστής loopback/LAN IP. Η κεφαλίδα `Host` από μόνη της δεν κάνει ποτέ μια προέλευση αξιόπιστη.
- **Οποιοδήποτε άλλο `Origin`, συμπεριλαμβανομένου `null`** → `403` με σώμα σφάλματος JSON-RPC: `id: null`, `error.code: -32000`, `error.data.code: "INVALID_ORIGIN"`. Μια περίοδος λειτουργίας πίνακα εργαλείων που παρουσιάζει ένα έγκυρο διακριτικό CSRF εξακολουθεί να είναι αποδεκτή, όπως και για άλλες εγγραφές πίνακα εργαλείων.

Ένας πελάτης MCP του προγράμματος περιήγησης που εξυπηρετείται πίσω από έναν αντίστροφο διακομιστή μεσολάβησης χρειάζεται `OMNIROUTE_PUBLIC_BASE_URL`. δεν υπάρχει λίστα επιτρεπόμενων για άλλες προελεύσεις. CORS preflight (`OPTIONS`) δεν ελέγχεται από την προέλευση. το αίτημα που ακολουθεί είναι.

## Διαμόρφωση IDE

Ανατρέξτε στη [Διαμόρφωση προγράμματος-πελάτη MCP](../guides/SETUP_GUIDE.md#mcp-client-configuration) για Claude Desktop, Cursor, Cline και συμβατές ρυθμίσεις πελάτη MCP.

---

## Βασικά εργαλεία (14) — Φάση 1

| Εργαλείο                        | Πεδίο εφαρμογής       | Περιγραφή                                                                                                                               |
| :------------------------------ | :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Χρόνος λειτουργίας, μνήμη, διακόπτες κυκλώματος, όρια ρυθμού, στατιστικά προσωρινής μνήμης                                              |
| `omniroute_list_combos`         | `read:combos`         | Όλοι οι διαμορφωμένοι συνδυασμοί με στρατηγικές (προαιρετικές μετρήσεις)                                                                |
| `omniroute_get_combo_metrics`   | `read:combos`         | Μετρήσεις απόδοσης για έναν συγκεκριμένο συνδυασμό                                                                                      |
| `omniroute_switch_combo`        | `write:combos`        | Ενεργοποίηση ή απενεργοποίηση ενός συνδυασμού                                                                                           |
| `omniroute_create_combo`        | `write:combos`        | Δημιουργήστε ένα επικυρωμένο combo μέσω του υπάρχοντος combo API                                                                        |
| `omniroute_check_quota`         | `read:quota`          | Ποσόστωση used/total, τοις εκατό που απομένει, χρόνος επαναφοράς, υγεία διακριτικού                                                     |
| `omniroute_route_request`       | `execute:completions` | Στείλτε μια ολοκλήρωση συνομιλίας μέσω της δρομολόγησης OmniRoute                                                                       |
| `omniroute_cost_report`         | `read:usage`          | Αναφορά κόστους ανά περίοδο (session/day/week/month)                                                                                    |
| `omniroute_list_models_catalog` | `read:models`         | Πλήρης κατάλογος μοντέλων με δυνατότητες, κατάσταση, τιμολόγηση                                                                         |
| `omniroute_radar_catalog`       | `read:radar`          | Τοπικός υπογεγραμμένος κατάλογος ραντάρ. προαιρετικά φίλτρα provider/family                                                             |
| `omniroute_tool_search`         | `read:tools`          | Ανακαλύψτε εργαλεία από τον καταχωρημένο κατάλογο MCP                                                                                   |
| `omniroute_web_search`          | `execute:search`      | Αναζήτηση στο Web μέσω των διαμορφωμένων παρόχων αναζήτησης. Όχι X/Twitter.                                                             |
| `omniroute_x_search`            | `execute:search`      | Αναζητήστε X μέσω xAI/SuperGrok ή επιλέξτε `xquik-search` για αποτελέσματα Xquik API. Απαιτεί διαπιστευτήρια για το επιλεγμένο backend. |
| `omniroute_web_fetch`           | `execute:search`      | Λήψη περιεχομένου ιστού μέσω των διαμορφωμένων παρόχων ανάκτησης                                                                        |

## Προηγμένα εργαλεία (11) — Φάση 2

| Εργαλείο                           | Πεδίο εφαρμογής                      | Περιγραφή                                                                                                                     |
| :--------------------------------- | :----------------------------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Προσομοίωση δρομολόγησης ξηρής λειτουργίας με εφεδρικό δέντρο                                                                 |
| `omniroute_set_budget_guard`       | `write:budget`                       | Προϋπολογισμός συνεδρίας με δράση degrade/block/alert                                                                         |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Ενημέρωση στρατηγικής συνδυασμού κατά το χρόνο εκτέλεσης (priority/weighted/auto/etc.)                                        |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Εφαρμόστε προεπιλογή ελαστικότητας `aggressive` / `balanced` / `conservative`                                                 |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Ζωντανή δοκιμή κάθε παρόχου σε συνδυασμό χρησιμοποιώντας μια πραγματική κλήση ανάντη                                          |
| `omniroute_get_provider_metrics`   | `read:health`                        | Μετρήσεις ανά πάροχο με καθυστέρηση p50/p95/p99 και κατάσταση διακόπτη κυκλώματος                                             |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Προτείνετε συνδυασμούς ανά τύπο εργασίας με περιορισμούς budget/latency                                                       |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Εξηγήστε γιατί ένα αίτημα δρομολογήθηκε σε έναν πάροχο (εναλλακτικά στοιχεία βαθμολογίας + )                                  |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Πλήρες στιγμιότυπο περιόδου σύνδεσης: κόστος, μάρκες, κορυφαία models/providers, σφάλματα, προφύλαξη προϋπολογισμού           |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Διάγνωση (και προαιρετικά αυτόματη επιδιόρθωση) μετατόπισης βάσης δεδομένων όπως σπασμένες σύνθετες αναφορές / ορφανές σειρές |
| `omniroute_sync_pricing`           | `pricing:write`                      | Συγχρονισμός δεδομένων τιμολόγησης από εξωτερικές πηγές (LiteLLM). υποστηρίζει `dryRun`                                       |

## Εργαλεία προσωρινής μνήμης (2)

| Εργαλείο                | Πεδίο εφαρμογής | Περιγραφή                                                                              |
| :---------------------- | :-------------- | :------------------------------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`    | Σημασιολογική κρυφή μνήμη, προσωρινή μνήμη προτροπής και στατιστικά στοιχεία αδυναμίας |
| `omniroute_cache_flush` | `write:cache`   | Ξεπλύνετε την προσωρινή μνήμη καθολικά ή μέσω signature/model                          |

## Εργαλεία συμπίεσης (13)

| Εργαλείο                            | Πεδίο εφαρμογής     | Περιγραφή                                                                                                                                                     |
| :---------------------------------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute_compression_status`      | `read:compression`  | Ρυθμίσεις συμπίεσης, σύνοψη αναλυτικών στοιχείων και στατιστικά στοιχεία προσωρινής μνήμης (περιλαμβάνει μεταδεδομένα `analytics.mcpDescriptionCompression` ) |
| `omniroute_compression_configure`   | `write:compression` | Διαμόρφωση λειτουργίας συμπίεσης, κατώφλι, αναλογία στόχου, διατήρηση προτροπής συστήματος, εναλλαγή συμπίεσης περιγραφής MCP                                 |
| `omniroute_set_compression_engine`  | `write:compression` | Επιλέξτε τον ενεργό κινητήρα (off/caveman/rtk/stacked) και την ένταση Caveman/RTK                                                                             |
| `omniroute_list_compression_combos` | `read:compression`  | Κατάλογος ονομασμένων συνδυασμών συμπίεσης και οι σωληνώσεις κινητήρα τους                                                                                    |
| `omniroute_compression_combo_stats` | `read:compression`  | Τα Analytics ομαδοποιούνται ανά συνδυασμό συμπίεσης και κινητήρα                                                                                              |
| `omniroute_ccr_store`               | `write:compression` | Αποθηκεύστε περιεχόμενο απομονωμένου καλούντος στο χώρο αποθήκευσης CCR με περιορισμένη μνήμη και επιστρέψτε έναν δείκτη συν αναφορά `ccr://`                 |
| `omniroute_ccr_retrieve`            | `read:compression`  | Ανάκτηση περιεχομένου CCR πλήρως ή με λειτουργίες head, tail, lines, grep και stats                                                                           |
| `omniroute_ccr_inspect`             | `read:compression`  | Επιθεωρήστε τα μεταδεδομένα CCR που ανήκουν στον καλούντα χωρίς να επιστρέψετε περιεχόμενο                                                                    |
| `omniroute_ccr_list`                | `read:compression`  | Καταχωρίστε σελιδοποιημένα μεταδεδομένα για μπλοκ CCR που ανήκουν στον καλούντα                                                                               |
| `omniroute_ccr_delete`              | `write:compression` | Διαγράψτε ένα μπλοκ CCR που ανήκει στον καλούντα                                                                                                              |
| `omniroute_ccr_stats`               | `read:compression`  | Αναφέρετε τη χρήση της μνήμης του καλούντος, τους μετρητές κύκλου ζωής και τα όρια αποθήκευσης                                                                |
| `omniroute_rtk_discover`            | `read:compression`  | Ανακαλύψτε επαναλαμβανόμενο θόρυβο σε δείγματα εξόδου RTK με δυνατότητα επιλογής                                                                              |
| `omniroute_rtk_learn`               | `read:compression`  | Δημιουργήστε ένα προσχέδιο φίλτρου RTK με δυνατότητα αναθεώρησης από δείγματα συμμετοχής                                                                      |

Οι εγγραφές CCR χρησιμοποιούν χώρο αποθήκευσης δύο επιπέδων: ένα ζεστό επίπεδο μνήμης που υποστηρίζεται, σε τοπικούς χρόνους εκτέλεσης χωρίς σύννεφο, από ένα ανθεκτικό επίπεδο SQLite (`ccr_blocks`, ενεργοποιημένο από προεπιλογή), έτσι ώστε ένα μπλοκ να επιβιώνει από την έξωση ή από την επανεκκίνηση έως ότου εξαντληθεί TTL του — εκτός από μπλοκ πάνω από 512 KB και χρόνους εκτέλεσης cloud, που παραμένουν στη μνήμη. Κάθε μπλοκ περιορίζεται σε 2 MiB, κάθε κύριος σε 16 MiB και το παγκόσμιο κατάστημα σε 64 MiB. Οι καταχωρήσεις είναι προεπιλεγμένες σε 24ωρο TTL (μέγιστο επτά ημέρες). Η πλήρης ανάκτηση MCP περιορίζεται σε 256 KiB. Τα μεγαλύτερα μπλοκ παραμένουν διαθέσιμα μέσω των λειτουργιών ranged και grep. Η αποθήκευση, η ανάκτηση, η καταχώριση, η επιθεώρηση, η διαγραφή και τα στατιστικά στοιχεία απομονώνονται από την αρχή ελέγχου ταυτότητας κλειδιού API. Τα αρχεία ελέγχου περιέχουν κατακερματισμούς και μεταδεδομένα μεγέθους, ποτέ περιεχόμενο. Λεπτομέρειες που αντιμετωπίζουν τον χειριστή (οι δύο δείκτες, προϋποθέσεις πελάτη, `codemode:false`, πεδία ανά εργαλείο, σελιδοποίηση και διαγνωστικός πίνακας) ζωντανά στο [Compression Engines → Προαπαιτούμενα / οδηγός χειριστή](../compression/COMPRESSION_ENGINES.md#prerequisites--operator-guide-ccr--session-dedup).

`omniroute_compression_status` αναφέρει τη συμπίεση περιγραφής MCP χωριστά κάτω από `analytics.mcpDescriptionCompression`. Αυτές οι τιμές είναι εκτιμήσεις μεγέθους μεταδεδομένων για περιγραφές με δυνατότητα λίστας MCP (`tools`, `prompts`, `resources` και `resourceTemplates`). δεν είναι αποδείξεις χρήσης παρόχου και επισημαίνονται με `source: "mcp_metadata_estimate"`.

### Δέντρο φίλτρο προσβασιμότητας MCP (v3.8.0)

Ξεχωριστά από τα παραπάνω εργαλεία συμπίεσης, OmniRoute περιλαμβάνει ένα φίλτρο μετά την εκτέλεση που συμπιέζει το** αποτελέσματα εργαλείου** των εργαλείων MCP browser/accessibility πριν επιστραφούν στον πράκτορα. Αυτό το φίλτρο δεν είναι από μόνο του εργαλείο — εκτελείται με διαφάνεια σε οποιοδήποτε αποτέλεσμα εργαλείου που περιέχει αναλυτικό κείμενο δέντρου προσβασιμότητας ή στιγμιότυπου προγράμματος περιήγησης (≥ 2000 χαρακτήρες).

Βασικές συμπεριφορές:

- Συμπτύσσεται ≥ 30 διαδοχικές επαναλαμβανόμενες γραμμές αδελφών σε σύνοψη head + tail
- Διατηρεί τις άγκυρες `[ref=eXX]` που απαιτούνται από Playwright/computer-use
- Περικόπτει το κείμενο μεγάλου μεγέθους (> 50.000 χαρακτήρες) με μια υπόδειξη πλοήγησης
- Αναμενόμενη εξοικονόμηση:** 60–80%** σε ωφέλιμα φορτία στιγμιότυπου προγράμματος περιήγησης

Διαμόρφωση: `compression.mcpAccessibility` σε καθολικές ρυθμίσεις (migration 056). Υλοποίηση: `open-sse/services/compression/engines/mcpAccessibility/`. Πλήρη έγγραφα: [Μηχανές συμπίεσης — MCP Δέντρο φίλτρο προσβασιμότητας](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Δείτε [το Compression Engines](../compression/COMPRESSION_ENGINES.md) και [RTK Compression](../compression/RTK_COMPRESSION.md) για το μοντέλο συμπίεσης χρόνου εκτέλεσης πίσω από αυτά τα εργαλεία.

## 1 Εργαλεία διακομιστή μεσολάβησης (3)

| Εργαλείο                    | Πεδίο εφαρμογής | Περιγραφή                                                                                                |
| :-------------------------- | :-------------- | :------------------------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies`  | Λήψη δωρεάν διακομιστή μεσολάβησης από την αγορά 1proxy (φίλτρα protocol/country/quality/limit )         |
| `omniroute_oneproxy_rotate` | `read:proxies`  | Λάβετε τον επόμενο διαθέσιμο διακομιστή μεσολάβησης ανά στρατηγική (`random` / `quality` / `sequential`) |
| `omniroute_oneproxy_stats`  | `read:proxies`  | Στατιστικά ομάδας, κατάσταση συγχρονισμού, διανομή ανά πρωτόκολλο και χώρα                               |

## Εργαλεία μνήμης (3)

Ορίζεται σε `open-sse/mcp-server/tools/memoryTools.ts`. Auth/scope επιβάλλεται μέσω της τυπικής διοχέτευσης εμβέλειας MCP.

| Εργαλείο                  | Πεδίο εφαρμογής | Περιγραφή                                                                                                   |
| :------------------------ | :-------------- | :---------------------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`   | Αναζήτηση αναμνήσεων κατά ερώτημα / τύπο / κλειδί API με επιβολή προϋπολογισμού διακριτικών                 |
| `omniroute_memory_add`    | `write:memory`  | Προσθήκη νέας καταχώρισης μνήμης (`factual` / `episodic` / `procedural` / `semantic`)                       |
| `omniroute_memory_clear`  | `write:memory`  | Διαγράψτε τις μνήμες για ένα κλειδί API, προαιρετικά φιλτραρισμένες κατά τύπο ή χρονική σήμανση `olderThan` |

## Εργαλεία δεξιοτήτων (4)

Ορίζεται σε `open-sse/mcp-server/tools/skillTools.ts`. Υποστηρίζεται από `src/lib/skills/registry` + `src/lib/skills/executor`.

| Εργαλείο                      | Πεδίο εφαρμογής  | Περιγραφή                                                                                                        |
| :---------------------------- | :--------------- | :--------------------------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | Καταχωρίστε καταχωρημένες δεξιότητες με προαιρετικό φιλτράρισμα κατά κλειδί API, όνομα ή κατάσταση ενεργοποίησης |
| `omniroute_skills_enable`     | `write:skills`   | Ενεργοποιήστε ή απενεργοποιήστε μια συγκεκριμένη ικανότητα από ID                                                |
| `omniroute_skills_execute`    | `execute:skills` | Εκτελέστε μια ικανότητα με την παρεχόμενη είσοδο και επιστρέψτε την εγγραφή εκτέλεσης                            |
| `omniroute_skills_executions` | `read:skills`    | Καταγράψτε το πρόσφατο ιστορικό εκτέλεσης δεξιοτήτων                                                             |

## Notion Πηγή περιβάλλοντος (6)

Ορίζεται σε `open-sse/mcp-server/tools/notionTools.ts`. Token αποθηκεύεται στον πίνακα `key_value` μέσω `src/lib/db/notion.ts`. πελάτης REST στο `src/lib/notion/api.ts`. Ρυθμίσεις API σε `src/app/api/settings/notion/route.ts`. Ταμπλό UI σε `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Διαμορφώστε το διακριτικό ενσωμάτωσης Notion από το** Πηγές περιβάλλοντος** καρτέλα στον πίνακα εργαλείων Endpoint ή μέσω του REST API:

```bash
# Set token
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Check status
curl http://localhost:20128/api/settings/notion

# Disconnect
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Εργαλείο                     | Πεδίο εφαρμογής | Περιγραφή                                                               |
| :--------------------------- | :-------------- | :---------------------------------------------------------------------- |
| `notion_search`              | `read:notion`   | Αναζήτηση πλήρους κειμένου σε όλες τις σελίδες και τις βάσεις δεδομένων |
| `notion_get_page`            | `read:notion`   | Αποκτήστε μια σελίδα από ID με τις ιδιότητές της                        |
| `notion_list_block_children` | `read:notion`   | Καταχωρίστε τα θυγατρικά μπλοκ μιας σελίδας ή μπλοκ                     |
| `notion_query_database`      | `read:notion`   | Ζητήστε μια βάση δεδομένων με φίλτρα, ταξινομήσεις και σελιδοποίηση     |
| `notion_get_database`        | `read:notion`   | Λήψη σχήματος βάσης δεδομένων από ID                                    |
| `notion_append_blocks`       | `write:notion`  | Προσθήκη παιδικών μπλοκ σε γονικό μπλοκ (μέγιστο 100 ανά αίτημα)        |

## Agent Skill Catalog Tools (3)

Ορίζεται σε `open-sse/mcp-server/tools/agentSkillTools.ts`. Υποστηρίζεται από `src/lib/agentSkills/catalog`. Αυτά τα εργαλεία εκθέτουν τον κατάλογο τεκμηρίωσης Agent Skills με 45 καταχωρήσεις σε πελάτες MCP και εξωτερικούς πράκτορες. Πεδίο εφαρμογής: `read:catalog`.

| Εργαλείο                          | Πεδίο εφαρμογής | Περιγραφή                                                                                                                                             |
| :-------------------------------- | :-------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog`  | Καταγράψτε και τις 45 δεξιότητες πράκτορα με προαιρετικά φίλτρα `category` (api\| cli) και `area`. επιστρέφει κάλυψη μεταδεδομένων +                  |
| `omniroute_agent_skills_get`      | `read:catalog`  | Λάβετε πλήρες περιεχόμενο μεταδεδομένων + SKILL.md για μία μόνο δεξιότητα από το κανονικό `id`                                                        |
| `omniroute_agent_skills_coverage` | `read:catalog`  | Στατιστικά κάλυψης: πόσες από τις 23 δεξιότητες API, 21 CLI και 1 config έχουν αρχεία SKILL.md στα σύνολα του συστήματος αρχείων έναντι του καταλόγου |

Δείτε [AGENT-SKILLS.md](./AGENT-SKILLS.md) για τον πλήρη κατάλογο και πώς τον καταναλώνουν οι εξωτερικοί παράγοντες.

## Σχετικά πλαίσια (v3.8.0)

Το απόθεμα εργαλείων MCP παραπάνω (110 μοναδικά εργαλεία, που υπολογίζονται από `countUniqueMcpTools()`) καλύπτεται σκόπιμα σε λειτουργίες routing/cache/compression/memory/skills/proxy/context-source χρόνου εκτέλεσης. Δύο γειτονικά πλαίσια αποστέλλονται παράλληλα με τον διακομιστή MCP στην έκδοση 3.8.0 και τεκμηριώνονται χωριστά:

### Cloud Agents

Οι πράκτορες Cloud είναι πράκτορες κωδικοποίησης AI εκτός διαδικασίας (codex-cloud, cursor-cloud, devin, jules) ενσύρματα στο OmniRoute μέσω του ίδιου μοντέλου σύνδεσης που χρησιμοποιείται για τους παρόχους LLM. Εκτίθενται μέσω της δικής τους επιφάνειας REST (`/api/v1/agents/*`) και είναι** δεν** μέρος του καταλόγου εργαλείων MCP — που καλεί έναν πράκτορα Cloud δεν καταναλώνει ένα εύρος MCP.

- Υλοποίηση: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Κύκλος ζωής: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Τεκμηρίωση: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Προστατευτικά κιγκλιδώματα

Τα προστατευτικά κιγκλιδώματα είναι φίλτρα pre/post-execution (vision-bridge, pii-masker, prompt-injection) που εφαρμόζονται εντός του αγωγού συνομιλίας. Εκτελούνται πριν επιτευχθεί το επίπεδο MCP tool/route και εκπέμπουν δομημένες παραβιάσεις στον αγωγό ελέγχου. δεν επικαλούνται ως εργαλεία MCP.

- Υλοποίηση: `src/lib/guardrails/`.
- Τεκμηρίωση: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Κατά τον εντοπισμό σφαλμάτων μιας κλήσης MCP που εμφανίζεται αποκλεισμένη, ελέγξτε τόσο το αρχείο καταγραφής ελέγχου MCP ( καταχωρήσεις `scope_denied:*` ) όσο και το ίχνος ελέγχου προστατευτικών κιγκλιδωμάτων — ένα αίτημα μπορεί να απορριφθεί από ένα προστατευτικό κιγκλίδωμα** προτού** φτάνει ποτέ στο επίπεδο επιβολής πεδίου MCP.

---

## REST API Τέλος σημεία

| Τελικό σημείο          | Μέθοδος               | Περιγραφή                                                                                                               | Auth                       |
| :--------------------- | :-------------------- | :---------------------------------------------------------------------------------------------------------------------- | :------------------------- |
| `/api/mcp/status`      | `GET`                 | Κατάσταση διακομιστή: καρδιακός παλμός, κατάσταση μεταφοράς HTTP, περίληψη δραστηριότητας ελέγχου                       | Διαχείριση (session/admin) |
| `/api/mcp/tools`       | `GET`                 | Κατάλογος εργαλείων (όνομα, περιγραφή, εμβέλεια, φάση, τελικά σημεία πηγής)                                             | Διαχείριση                 |
| `/api/mcp/sse`         | `GET` / `POST`        | τελικό σημείο μεταφοράς SSE (περιορίζεται από `mcpEnabled` + `mcpTransport === "sse"`)                                  | API κλειδί + πεδία         |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Μεταφορά HTTP με δυνατότητα ροής (χρησιμοποιεί την κεφαλίδα `mcp-session-id`, `DELETE` τερματίζει τη συνεδρία)          | API κλειδί + πεδία         |
| `/api/mcp/audit`       | `GET`                 | Έλεγχος καταχωρίσεων αρχείου καταγραφής από `mcp_tool_audit` (φίλτρα: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | Διαχείριση                 |
| `/api/mcp/audit/stats` | `GET`                 | Συγκεντρωτικά στατιστικά ελέγχου (`totalCalls`, `successRate`, `avgDurationMs`, κορυφαία εργαλεία)                      | Διαχείριση                 |

Αρχεία πηγής: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Τόσο οι μεταφορές SSE όσο και οι μεταφορές με δυνατότητα ροής HTTP αποκλείονται μέχρι να ενεργοποιηθεί ο διακομιστής MCP στις Ρυθμίσεις (`mcpEnabled`) και να επιλεγεί το κατάλληλο `mcpTransport`. Εάν έχει διαμορφωθεί λάθος μεταφορά, η διαδρομή επιστρέφει HTTP 400 με μια υπόδειξη για αλλαγή ρυθμίσεων.

---

## Έλεγχος ταυτότητας και εμβέλεια

Οι κλήσεις εργαλείου MCP διαβάζουν συμβολοσειρές εμβέλειας από τον καλούντα. Αυτός ο έλεγχος είναι ένας από τους τρεις ανεξάρτητους χώρους ονομάτων. Ένα πέρασμα από ένα πούλι δεν είναι πάσα από τα άλλα. Οι κανόνες είναι [Τρεις χώροι ονομάτων εμβέλειας](#three-scope-namespaces). Ο κατάλογος εργαλείων είναι [MCP tool scopes](#mcp-tool-scopes).

### Τρεις χώροι ονομάτων εμβέλειας

`manage` σε ένα κλειδί API, `read:compression` σε ένα εργαλείο MCP και `read` σε ένα διακριτικό πρόσβασης `oma_live_…` είναι τρεις διαφορετικές επιχορηγήσεις. Οι καλούντες που στέλνουν ένα διακριτικό πρόσβασης `read` σε μια μεταλλαγμένη διαδρομή διαχείρισης λαμβάνουν HTTP 403 `Access token scope 'read' is insufficient; 'write' required.` Αυτή η κατάταξη είναι `scopeSatisfies`. Δεν συμβουλεύεται τον πίνακα MCP και ο αντιστοιχιστής MCP δεν τον συμβουλεύεται.

| Χώρος ονομάτων          | Πιστοποιητικό                                                                      | Ντάμα                            | Ένα πέρασμα επιτρέπει                                                                  |
| :---------------------- | :--------------------------------------------------------------------------------- | :------------------------------- | :------------------------------------------------------------------------------------- |
| Διαχείριση κλειδιού API | `api_keys.scopes`                                                                  | `hasManageScope`                 | Διαχείριση REST για αυτό το κλειδί φορέα                                               |
| Πρόσθετο κλειδιού API   | ίδιος πίνακας, μια ακριβής συμβολοσειρά                                            | ο βοηθός που αναφέρεται παρακάτω | Μόνο αυτή η ικανότητα                                                                  |
| πεδία εργαλείων MCP     | ίδια συστοιχία, αλλιώς MCP `_meta` (μόνο HTTP/SSE ), αλλιώς `OMNIROUTE_MCP_SCOPES` | `scopeMatches`                   | Αυτό το εργαλείο, μόλις ενεργοποιηθεί η επιβολή                                        |
| Διακριτικό πρόσβασης    | `oma_live_…`                                                                       | `scopeSatisfies`                 | Η διαδρομή διαχείρισης της οποίας η μέθοδος και η διαδρομή απαιτούν αυτήν την κατάταξη |

Η κοπή κάθε διαπιστευτηρίου καλύπτεται από τον [έλεγχο ταυτότητας διαχείρισης](../guides/MANAGEMENT-AUTH.md).

#### Πεδίο εφαρμογής κλειδιού API

Ένας πίνακας `api_keys.scopes` τροφοδοτεί δύο εργασίες. Χρησιμοποιούν διαφορετικές λειτουργίες.

**Διαχείριση REST.** `manage` και `admin` είναι τα μέλη του `MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`). `hasManageScope` είναι αυτό που εξουσιοδοτεί τις διαδρομές διαχείρισης για αυτό το κλειδί. `admin` έχει δυνατότητα διαχείρισης σε αυτές τις διαδρομές. Η λέξη `admin` εδώ δεν είναι η κατάταξη του διακριτικού πρόσβασης και δεν επεκτείνεται σε πεδία εργαλείων MCP.

**Συμπληρωματικές χορδές.** Κάθε ένα είναι ένα ακριβές τεστ ιδιότητας μέλους και το καθένα μένει εκτός `MANAGEMENT_API_KEY_SCOPES`.

| Εκταση                         | Ένα πέρασμα επιτρέπει                                                                                                                                                              |
| :----------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mcp:connect`                  | Το μη-loopback `/api/mcp/` LOCAL_ONLY μόνο σκάλισμα (`hasMcpConnectOrManageScope`). Ένα κλειδί με `manage` ή `admin` εξακολουθεί να περνάει αυτό το σκάλισμα.                      |
| `self:usage`                   | `GET /api/v1/me/status` για αυτό το κλειδί (`src/app/api/v1/me/status/route.ts`). `POST /api/keys` προσθέτει αυτό το εύρος στη δημιουργία (`normalizeSelfServiceScopesForCreate`). |
| `self:account-quota`           | Ποσότητες λογαριασμού ανάντη εντός αυτού του ωφέλιμου φορτίου κατάστασης (`src/lib/usage/apiKeySelfService.ts`). Η διαδρομή κατάστασης εξακολουθεί να απαιτεί `self:usage`.        |
| `policy:bypass-provider-quota` | Οι κλήσεις συμπερασμάτων αυτού του κλειδιού παρακάμπτουν την πολιτική ορίου παροχέα (`hasProviderQuotaBypassScope` σε `src/sse/handlers/chat.ts`).                                 |

#### Ταίριασμα

Ο κατάλογος είναι ο πίνακας κάτω από [τα πεδία εργαλείων MCP](#mcp-tool-scopes). Μην αντιμετωπίζετε `MCP_SCOPE_LIST` στο `src/shared/constants/mcpScopes.ts` ως αυτόν τον κατάλογο: είναι το αρχικό πληκτρολόγιο υποσύνολο. Αργότερα εργαλεία δηλώνουν περαιτέρω πεδία δίπλα του (`read:notion`, `read:skills`, `read:local-corpus` και ο υπόλοιπος πίνακας).

`evaluateToolScopes` στο `open-sse/mcp-server/scopeEnforcement.ts` επιτρέπει μια κλήση όταν κάθε απαιτούμενο εύρος ταιριάζει με κάποιο παραχωρημένο εύρος:

- `*` ταιριάζει με κάθε απαιτούμενο εύρος.
- Ένα παραχωρημένο εύρος που τελειώνει σε `*` ταιριάζει με ένα απαιτούμενο εύρος που ξεκινά με το πρόθεμα πριν από το αστέρι. `read:*` ταιριάζει με `read:compression`.
- Κάθε άλλο παραχωρημένο εύρος ταιριάζει μόνο με την ίδια απαιτούμενη συμβολοσειρά.

Ένα κλειδί του οποίου τα πεδία είναι `["manage"]` αποτυγχάνει `scopeMatches` για `read:compression`. Η ίδια κλήση αποτυγχάνει για `admin`, `mcp:connect`, `read` και `write` όταν αυτές είναι οι μόνες χορηγούμενες συμβολοσειρές. Δεν υπάρχει ιεραρχία μεταξύ των πεδίων εργαλείων MCP πέρα από το τελικό `*`.

Η επιβολή είναι απενεργοποιημένη εκτός εάν `OMNIROUTE_MCP_ENFORCE_SCOPES=true` (προεπιλογή `false`). Ενώ είναι απενεργοποιημένο, `evaluateToolScopes` επιτρέπει την κλήση και παραλείπει τον κατάλογο. Ενώ είναι ενεργοποιημένο, HTTP χρησιμοποιεί το `api_keys.scopes` του κλειδιού φορέα ως `authInfo` (δείτε [δέσμευση εύρους HTTP ανά κλειδί](#per-key-http-scope-binding-7895) ). Όταν δεν επιλύονται κανένα εύρος κλειδιού, το σύνολο που έχει χορηγηθεί πέφτει στο MCP `_meta` (τιμάται μόνο για καλούντες HTTP/SSE, μέσα σε ένα περιβάλλον εξουσιοδότησης HTTP · το `_meta` ενός καλούντος stdio αγνοείται επειδή το ελέγχει ο πελάτης και δεν φέρει ταυτότητα ανά καλούντα), στη συνέχεια `OMNIROUTE_MCP_SCOPES`.

#### Πεδία με διακριτικό πρόσβασης

Τα διακριτικά `oma_live_…` (`src/lib/accessTokens/scopes.ts`) φέρουν `read`, `write` ή `admin`. `scopeSatisfies` είναι μια κατάταξη: `admin` καλύπτει `write` και `read`, και `write` καλύπτει `read`. Τα άγνωστα πεδία δεν καλύπτουν τίποτα.

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) συγκρίνει αυτήν την κατάταξη με `inferRequiredScope` (`src/server/authz/accessScopes.ts`):

- `GET`, `HEAD` και `OPTIONS` απαιτούν `read`.
- Κάθε άλλη μέθοδος απαιτεί `write`.
- Οι διαδρομές στο `ADMIN_SCOPE_PREFIXES` απαιτούν `admin` για κάθε μέθοδο. `/api/mcp` βρίσκεται σε αυτήν τη λίστα, επομένως ένα διακριτικό πρόσβασης `write` εξακολουθεί να μην μπορεί να καλέσει την επιφάνεια MCP HTTP.
- Τα μονοπάτια στο `ADMIN_MUTATION_PREFIXES` απαιτούν `admin` μόνο για μεταλλάξεις.
- Οι διαδρομές στο `ADMIN_MUTATION_EXACT_PATHS` (`/api/settings`, `/api/settings/require-login`) απαιτούν `admin` μόνο για μεταλλάξεις και μόνο σε αυτήν ακριβώς τη διαδρομή — άλλες δευτερεύουσες διαδρομές `/api/settings/*` διατηρούν `write`.

`PATCH /api/keys/{id}` είναι μια μετάλλαξη και δεν βρίσκεται σε αυτές τις λίστες διαχειριστή, επομένως ένα διακριτικό `read` λαμβάνει 403 `Access token scope 'read' is insufficient; 'write' required.` Ένα διακριτικό πρόσβασης `write` ή `admin` ικανοποιεί αυτήν τη διαδρομή. Ένας πίνακας ταμπλό JWT, το loopback CLI machine-id token και ένα κλειδί API με `manage` ή `admin` παίρνουν άλλους κλάδους και δεν περιορίζονται από αυτήν την κατάταξη.

Ένα διακριτικό πρόσβασης που περνάει `scopeSatisfies` για `/api/mcp` έχει καθαρίσει μόνο την πύλη διαχείρισης. Οι κλήσεις εργαλείων εξακολουθούν να εκτελούνται `scopeMatches` σε πεδία κλειδιού API. Η κατάταξη του διακριτικού πρόσβασης δεν αποτελεί είσοδο στο `scopeMatches`.

### πεδία εργαλείων MCP

Η επιβολή του πεδίου εφαρμογής είναι συγκεντρωμένη στο `open-sse/mcp-server/scopeEnforcement.ts`. Κάθε εργαλείο απαιτεί συγκεκριμένα πεδία:

| Εκταση                | Εργαλεία                                                                                                                                                                             |
| :-------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                                    |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                            |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                               |
| `read:quota`          | `check_quota`                                                                                                                                                                        |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                               |
| `read:models`         | `list_models_catalog`                                                                                                                                                                |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                        |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                                |
| `write:budget`        | `set_budget_guard`                                                                                                                                                                   |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                          |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                       |
| `read:cache`          | `cache_stats`                                                                                                                                                                        |
| `write:cache`         | `cache_flush`                                                                                                                                                                        |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                           |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                                    |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                                |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                                     |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                               |
| `read:memory`         | `memory_search`                                                                                                                                                                      |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                         |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                                   |
| `write:skills`        | `skills_enable`                                                                                                                                                                      |
| `execute:skills`      | `skills_execute`                                                                                                                                                                     |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                                     |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                              |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                            |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                                     |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                       |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                                   |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                                      |
| `read:obsidian`       | 13 εργαλεία ανάγνωσης — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 εργαλεία εγγραφής — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …                 |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                                    |

Υποστηρίζονται πεδία μπαλαντέρ: `read:*` παραχωρεί όλα τα πεδία ανάγνωσης, `*` παρέχει πλήρη πρόσβαση.

### Δυνατότητα στενής διαδρομής `mcp:connect` — (#7895)

Για να φτάσετε στη μεταφορά HTTP/SSE MCP (`/api/mcp/*`) από non-loopback απαιτεί το `/api/mcp/` LOCAL_ONLY carve-out (βλ. `docs/security/ROUTE_GUARD_TIERS.md`). Ιστορικά αυτό το carve-out δεχόταν μόνο ένα πλήρες `manage`/`admin` -scope API κλειδί — πολύ ευρύ για έναν καλούντα που χρειάζεται μόνο να μιλήσει MCP. `src/shared/constants/managementScopes.ts` εξάγει τώρα `MCP_CONNECT_SCOPE = "mcp:connect"`: ένα πρόσθετο, στενό πεδίο εφαρμογής (ίδιο προηγούμενο με `SELF_USAGE_SCOPE`) που εξουσιοδοτεί το ONLY την παράκαμψη `/api/mcp/` στο `src/server/authz/policies/management.ts` — δεν παρέχει πρόσβαση σε άλλη διαδρομή διαχείρισης και διατηρείται σκόπιμα OUT του `MANAGEMENT_API_KEY_SCOPES`. Ένα κλειδί που κρατά `manage`/`admin` εξακολουθεί να περνά το σκαλισμένο αμετάβλητο. `mcp:connect` είναι μια εναλλακτική λύση χαμηλότερου προνομίου για απομακρυσμένους καλούντες μόνο με MCP, που ελέγχεται μέσω `hasMcpConnectOrManageScope()`.

### Σύνδεση εύρους HTTP ανά κλειδί (#7895)

Πάνω από HTTP/SSE, `open-sse/mcp-server/httpTransport.ts` επιλύει τώρα το πραγματικό `api_keys.scopes` του καλούντος μέσω `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`) και το μεταβιβάζει στο `transport.handleRequest(req, { authInfo })` του MCP SDK, έτσι ώστε `extra.authInfo.scopes` να φτάσει σε κάθε κλήση εργαλείου αντικατοπτρίζει τα πεδία του ίδιου του κλειδιού φορέα. `resolveCallerScopeContext()` του `scopeEnforcement.ts` έδινε ήδη προτεραιότητα `authInfo` έναντι του `_meta` και `OMNIROUTE_MCP_SCOPES` env εναλλακτική — συμπληρώνει μόνο εκείνη την πρώτη πηγή υψηλότερης προτεραιότητας, η οποία προηγουμένως δεν τροφοδοτήθηκε έναντι HTTP. Όταν κανένα κλειδί API δεν επιλύεται (χωρίς κεφαλίδα, μη έγκυρο κλειδί), `authInfo` παραμένει `undefined` και η ανάλυση πέφτει αμετάβλητη στην υπάρχουσα αλυσίδα `meta`/env. Το stdio δεν έχει ταυτότητα ανά καλούντα (βλ. `mcpCallerIdentity.ts`) και δεν επηρεάζεται από τη δέσμευση ανά κλειδί — παραλείπει το βήμα `_meta` (`_meta` τιμάται μόνο μέσα σε ένα περιβάλλον εξουσιοδότησης HTTP, #15159) και επιλύεται μόνο από το κλειδί env `OMNIROUTE_MCP_SCOPES`.

**Η επιβολή επιβάλλεται για καλούντες HTTP/SSE στενού εύρους ανεξάρτητα από το `OMNIROUTE_MCP_ENFORCE_SCOPES`.** Η προεπιλογή του `OMNIROUTE_MCP_ENFORCE_SCOPES` σε `false` είναι ασφαλής μόνο για τη ροή ενός χειριστή local/stdio, όπου δεν υπάρχει ταυτότητα ανά καλούντα για να αντιμετωπιστεί. `open-sse/mcp-server/server.ts::withScopeEnforcement()` ενεργοποιεί άνευ όρων την επιβολή εύρους ανά εργαλείο (`shouldForceScopeEnforcement()` σε `scopeEnforcement.ts`) όποτε `resolveCallerScopeContext()` επιλύει `source === "authInfo"` (δηλαδή μια πραγματική κεφαλίδα εξουσιοδότησης ανά κλειδί HTTP, HTTP/SSE-only) AND αυτό το κλειδί δεν διατηρεί το πλήρες εύρος `manage`/`admin`. Αυτό κλείνει το κενό όπου ένα κλειδί που κρατά ONLY το στενό εύρος παράκαμψης `mcp:connect` — που τεκμηριώνεται παραπάνω ότι δεν εξουσιοδοτεί τίποτα εκτός από το `/api/mcp/` LOCAL_ONLY carve-out — θα μπορούσε διαφορετικά να καλέσει κάθε εργαλείο MCP μόλις ο χειριστής ενεργοποιούσε την πρόσβαση remote/non-loopback MCP, απλώς επειδή `OMNIROUTE_MCP_ENFORCE_SCOPES` αποστέλλει `false` από προεπιλογή. Ένα πλήρες κλειδί `manage`/`admin` πάνω από HTTP, και κάθε καλών stdio/local, διατηρεί την υπάρχουσα συμπεριφορά `OMNIROUTE_MCP_ENFORCE_SCOPES` -gated αμετάβλητη.

---

## Μεταβλητές Περιβάλλοντος

| Μεταβλητός                              | Αθέτηση                                | Σκοπός                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :-------------------------------------- | :------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`               | Βάση URL που χρησιμοποιεί ο διακομιστής MCP όταν καλεί OmniRoute εσωτερικό APIs                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `OMNIROUTE_API_KEY`                     | (αδειάζω)                              | Το κλειδί API προωθείται ως `Authorization: Bearer` σε εσωτερικές κλήσεις API                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (μόνο `"true"` το ενεργοποιεί) | Όταν είναι ενεργοποιημένα, τα πεδία που λείπουν απορρίπτουν τις κλήσεις εργαλείων και καταγράφουν `scope_denied:<reason>` στο αρχείο καταγραφής ελέγχου. Η επιβολή επιβάλλεται ALSO ανεξάρτητα από αυτήν τη σημαία για οποιονδήποτε καλούντα HTTP/SSE που επιλύεται από μια κεφαλίδα εξουσιοδότησης ανά κλειδί (`source === "authInfo"`) που δεν έχει πλήρες εύρος `manage`/`admin` — π.χ. ένα κλειδί που κρατά μόνο το στενό εύρος παράκαμψης `mcp:connect` — επομένως αυτή η προεπιλογή είναι ασφαλής μόνο για τη ροή local/stdio μεμονωμένου τελεστή re-backmote, ποτέ |
| `OMNIROUTE_MCP_SCOPES`                  | (αδειάζω)                              | Λίστα επιτρεπόμενων πεδίων διαχωρισμένων με κόμματα που θεωρούνται "διαθέσιμα" από προεπιλογή (χρησιμοποιείται όταν ο καλών δεν παρέχει τα δικά του πεδία)                                                                                                                                                                                                                                                                                                                                                                                                                |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (απενεργοποίηση = ενεργό)              | Όταν ορίζεται σε `0/false/off/no`, απενεργοποιεί τη συμπίεση περιγραφής MCP κατά την εγγραφή                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (απενεργοποίηση = ενεργό)              | Εναλλακτικό ψευδώνυμο για την ίδια εναλλαγή όπως παραπάνω                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                                | Ακύρωση προϋπολογισμού για αναγνώσεις εσωτερικής διαχείρισης (υγεία, ανθεκτικότητα, συνδυασμοί, ποσόστωση, χρήση)                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                                | Ακύρωση προϋπολογισμού για λυκίσκους που περιμένουν έναν πάροχο (`route_request`, `web_search`, `web_fetch`)                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `MCP_TOOL_DENY`                         | (κατάργηση ρύθμισης = χωρίς φίλτρο)    | Ονόματα εργαλείων διαχωρισμένα με κόμματα για απόσυρση από `tools/list` (μείωση εργαλείων-καρδιναλότητας — βλέπε παρακάτω)                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `MCP_TOOL_ALLOW`                        | (κατάργηση ρύθμισης = χωρίς φίλτρο)    | Ονόματα εργαλείων διαχωρισμένα με κόμματα για αποκλειστική διατήρηση (λειτουργία λίστας επιτρεπόμενων — δείτε παρακάτω)                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `DATA_DIR`                              | `~/.omniroute`                         | Το αρχείο Heartbeat είναι γραμμένο στο `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

---

## Περιγραφή Συμπίεση

Τα μητρώα του εργαλείου, των μηνυμάτων προτροπής και των πόρων MCP μπορούν να συμπιέσουν περιγραφές σε χρόνο registration/list για να μειώσουν το αποτύπωμα μεταδεδομένων που εκτίθεται στους πελάτες (και επομένως το κόστος του άμεσου περιβάλλοντος). Η υλοποίηση ζει σε `open-sse/mcp-server/descriptionCompressor.ts` και είναι ενσύρματη στον διακομιστή MCP μέσω `compressMcpRegistryMetadata` μέσα `createMcpServer()`.

- Η συμπίεση εκτελείται πάνω από το κείμενο της περιγραφής χρησιμοποιώντας το σύνολο κανόνων Caveman (`getRulesForContext("all", "full")`) με εξαγωγή διατηρημένων μπλοκ (περιοχές κώδικα, περιφραγμένα μπλοκ, κ.λπ.), έτσι ώστε το δομικό περιεχόμενο να μην αλλοιώνεται.
- Εναλλαγή ανά ανάπτυξη μέσω της τιμής `compression.mcpDescriptionCompressionEnabled` στον πίνακα ρυθμίσεων `key_value` (προεπιλογή: ενεργοποιημένο) — εκτίθεται στο UI ως** Analytics → MCP συμπίεση περιγραφής** .
- Εναλλαγή σε όλη τη διαδικασία μέσω `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` ή `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- Τα στατιστικά στοιχεία σε πραγματικό χρόνο εμφανίζονται μέσω `omniroute_compression_status` κάτω από `analytics.mcpDescriptionCompression` και επισημαίνονται `source: "mcp_metadata_estimate"` για να αποσαφηνιστούν από τις αποδείξεις χρήσης πραγματικών παρόχων.

---

## Μείωση καρδιναικότητας εργαλείου (F4.3)

Η συμπίεση περιγραφής συρρικνώνει τα μεταδεδομένα κάθε εργαλείου.** μείωση της καρδιναλικότητας του εργαλείου** πηγαίνει ένα βήμα παραπέρα μειώνοντας τα _πόσα_ εργαλεία που ανακοινώνονται καθόλου. Η διαφήμιση λιγότερων εργαλείων στο μανιφέστο `tools/list` μειώνει το κόστος διακριτικού ανά αίτημα που πληρώνει το μοντέλο του πελάτη για τον κατάλογο εργαλείων (συμπίεση "επίπεδο 5"). Η υλοποίηση είναι ένα καθαρό, χωρίς κατάσταση φίλτρου σε `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), ενσύρματο στον βρόχο εγγραφής στο `createMcpServer()` (`open-sse/mcp-server/server.ts`).

**Συμμετοχή, απενεργοποίηση από προεπιλογή.** Το φίλτρο εκτελείται μόνο όταν έχει οριστεί τουλάχιστον μία από τις δύο μεταβλητές περιβάλλοντος. χωρίς κανένα σετ, και τα 110 εργαλεία ανακοινώνονται αμετάβλητα.

| Μεταβλητός       | Τρόπος                                                                                                |
| :--------------- | :---------------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Μαύρη λίστα των ονομάτων εργαλείων — διαχωρισμένα με κόμματα που απορρίπτονται πάντα από `tools/list` |
| `MCP_TOOL_ALLOW` | Allow-list — ονόματα εργαλείων διαχωρισμένα με κόμματα. μόνο αυτά επιβιώνουν, όλα τα άλλα πέφτουν     |

`deny` έχει προτεραιότητα έναντι `allow`. Τα ονόματα διαχωρίζονται με κόμμα, περικόπτονται και οι κενές καταχωρήσεις αγνοούνται. Παραδείγματα:

```bash
# Drop two tools from the catalog
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Announce only the routing + quota tools (allow-list mode)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Πώς αφαιρούνται τα φιλτραρισμένα εργαλεία:** Η εγγραφή πετυχαίνει πάντα. ένα εργαλείο που απορρίπτει το προφίλ είναι στη συνέχεια `.disable()` d στη λαβή MCP SDK, επομένως δεν εμφανίζεται ποτέ στο `tools/list` αλλά η καλωδίωση παραμένει ανέπαφη (καθαρή enable/disable, χωρίς επανεγγραφή). Ο αναλυτής προφίλ είναι `readMcpToolProfileFromEnv(process.env)`, ο οποίος επιστρέφει `null` (χωρίς φιλτράρισμα) όταν και τα δύο var είναι άδεια.

Το πιο πλούσιο σχήμα `ToolProfile` πίσω από `reduceToolManifest` υποστηρίζει επίσης φιλτράρισμα τομής εμβέλειας (`allowScopes`, με αντιστοίχιση μπαλαντέρ `read:*` -style ) και ένα ντετερμινιστικό κάλυμμα `maxTools`, αλλά αυτά τα δύο κουμπιά χρειάζονται το πλήρες μανιφέστο κατά την εγγραφή και είναι** δεν** εκτίθενται μέσω των μεταβλητών περιβάλλοντος σήμερα (ένα άγκιστρο `tools/list` -level είναι μια παρακολούθηση παρακολούθησης). `estimateManifestTokens()` είναι διαθέσιμο για να συγκρίνει το κόστος του διακριτικού δήλωσης πριν και μετά τη μείωση.

---

## Χτύπος καρδιάς χρόνου εκτέλεσης

Η μεταφορά stdio παραμένει ζωντανή σε `${DATA_DIR}/runtime/mcp-heartbeat.json` κάθε 5 δευτερόλεπτα. Ο πίνακας εργαλείων (`/api/mcp/status`) διαβάζει αυτό το αρχείο συν PID liveness για την εξαγωγή `online`. HTTP μεταφέρει την κατάσταση αναφοράς από `getMcpHttpStatus()` σε διαδικασία επεξεργασίας (χωρίς εγγραφή αρχείου).

Το στιγμιότυπο του καρδιακού παλμού περιέχει:

```json
{
  "pid": 12345,
  "startedAt": "2026-05-13T12:34:56.000Z",
  "lastHeartbeatAt": "2026-05-13T12:35:01.000Z",
  "version": "1.8.1",
  "transport": "stdio",
  "scopesEnforced": false,
  "allowedScopes": [],
  "toolCount": 110
}
```

---

## Καταγραφή ελέγχου

Κάθε κλήση εργαλείου καταγράφεται στον πίνακα SQLite `mcp_tool_audit` από το `open-sse/mcp-server/audit.ts`:

- Όνομα εργαλείου, ορίσματα (hashed/truncated ως ανά εργαλείο `auditLevel`), αποτέλεσμα
- Διάρκεια σε ms, σημαία success/failure, μήνυμα σφάλματος (κατά περίπτωση)
- API key hash, χρονική σήμανση
- Οι αρνήσεις εμβέλειας καταγράφονται ως `scope_denied:<reason>` με τη λίστα εύρους που λείπει

Χρησιμοποιήστε τον πίνακα εργαλείων ή τα τελικά σημεία `/api/mcp/audit` και `/api/mcp/audit/stats` REST για να επιθεωρήσετε πρόσφατες κλήσεις.

---

## Αρχεία

| Αρχείο                                                                   | Σκοπός                                                                        |
| :----------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | εργοστάσιο διακομιστή MCP, σημείο εισόδου stdio, εγγραφές εργαλείων εμβέλειας |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Streamable HTTP transport (διαχείριση συνεδρίας)                        |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Αξιολόγηση εμβέλειας εργαλείου και ανάλυση καλούντος                          |
| `open-sse/mcp-server/audit.ts`                                           | Καταγραφή ελέγχου κλήσεων εργαλείου (`mcp_tool_audit`)                        |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio heartbeat writer (`mcp-heartbeat.json`)                                 |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Συμπίεση περιγραφής για μητρώα εργαλείου / προτροπής / πόρων                  |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod schemas Μητρώο εργαλείων + (`MCP_TOOLS`, 45 καταχωρήσεις)                 |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Φάση 2 + cache + 1 χειριστές εργαλείων μεσολάβησης                            |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Χειριστές εργαλείων συμπίεσης                                                 |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Ορισμοί εργαλείου μνήμης (3 εργαλεία)                                         |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Ορισμοί εργαλείων δεξιοτήτων (4 εργαλεία)                                     |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Ορισμοί εργαλείου πηγής περιβάλλοντος Notion (6 εργαλεία)                     |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Ορισμοί εργαλείων gamification (8 εργαλεία)                                   |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Εργαλεία εγγραφής και διαχείρισης προσθηκών (8 εργαλεία)                      |
| `src/app/api/mcp/status/route.ts`                                        | τελικό σημείο `/api/mcp/status`                                               |
| `src/app/api/mcp/tools/route.ts`                                         | τελικό σημείο `/api/mcp/tools`                                                |
| `src/app/api/mcp/sse/route.ts`                                           | Διαδρομή μεταφοράς `/api/mcp/sse` SSE                                         |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` Streamable HTTP διαδρομή μεταφοράς                          |
| `src/app/api/mcp/audit/route.ts`                                         | Ερώτημα αρχείου καταγραφής ελέγχου `/api/mcp/audit`                           |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats` συγκεντρωτικές μετρήσεις ελέγχου                       |
| `src/lib/notion/api.ts`                                                  | πελάτης Notion REST API (επανάληψη, χρονικό όριο λήξης, ταξινόμηση σφαλμάτων) |
| `src/lib/db/notion.ts`                                                   | Notion token persistence (πίνακας `key_value` )                               |
| `src/app/api/settings/notion/route.ts`                                   | ρυθμίσεις Notion API (GET/POST/DELETE)                                        |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Notion token διαχείριση UI                                                    |
| `tests/unit/notion-api.test.ts`                                          | Δοκιμές πελάτη Notion API (7)                                                 |
| `tests/unit/notion-tools.test.ts`                                        | Δοκιμές επιβολής του πεδίου εφαρμογής των εργαλείων Notion (10)               |
| `tests/unit/db/notion.test.mjs`                                          | Δοκιμές ενότητας Notion DB (3)                                                |
