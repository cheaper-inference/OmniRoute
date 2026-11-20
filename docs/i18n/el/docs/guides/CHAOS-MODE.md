# Chaos Mode (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Πίνακας ελέγχου:** **Chaos Mode** (πλευρική γραμμή) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (συνεδρία πίνακα ελέγχου) · `POST /api/skills/collect/chaos` (κλειδί API)  
> **Πηγαίος κώδικας:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Το Chaos Mode στέλνει **μία εργασία σε πολλούς παρόχους ταυτόχρονα** — κάθε συμμετέχων πάροχος
συνεισφέρει ένα στιγμιότυπο μοντέλου και λαμβάνετε όλες τις απαντήσεις τη μία δίπλα στην άλλη (ή σε ακολουθία). Πρόκειται για μια
επιφάνεια εκτέλεσης πολλαπλών μοντέλων και όχι για στρατηγική δρομολόγησης: η κανονική κίνηση προς το `/v1/chat/completions`
δεν επηρεάζεται ποτέ από αυτήν.

**Διευκρίνιση — διατίθενται τρία διαφορετικά πράγματα που περιέχουν το "chaos" στην ονομασία τους:**

| Στοιχείο                    | Τι είναι                                                                                                                                                                                                  | Πού τεκμηριώνεται                            |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**              | Η σελίδα του πίνακα ελέγχου + το API που περιγράφονται εδώ: διανομή μίας εργασίας σε πολλούς παρόχους (παράλληλα ή συνεργατικά).                                                                          | Αυτός ο οδηγός                               |
| `auto/chaos`                | Αναγνωριστικό μοντέλου Auto-Combo: παράλληλη διανομή, ένα μοντέλο ανά πάροχο, μία κλήση προς το upstream για το καθένα. Δεν πρόκειται για έγχυση σφαλμάτων ([λεπτομέρειες](#autochaos-parallel-fan-out)). | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Διαμόρφωση συνδυασμού Chaos | Ένας αποθηκευμένος συνδυασμός με `config.chaos.enabled` πραγματοποιεί διανομή με τον ίδιο τρόπο (μόνο μέσω API)· το `judgeModel` επιλέγει μόνο την τελική απάντηση, χωρίς κλήση σύνθεσης.                 | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: παράλληλη διανομή

Το `auto/chaos` **δεν** είναι ρύθμιση έγχυσης σφαλμάτων ή δοκιμών ανθεκτικότητας. Ένα αίτημα με
`model: "auto/chaos"` προς το `/v1/chat/completions`:

1. Δημιουργεί ένα πάνελ με **ένα μοντέλο ανά πάροχο**: τον πρώτο υποψήφιο κάθε
   συνδεδεμένου παρόχου, με τη σειρά της δεξαμενής υποψηφίων, έως 5 μέλη
   (`OMNIROUTE_CHAOS_MAX_PANEL`, με ανώτατο όριο το 10)
   (`open-sse/services/autoCombo/virtualFactory.ts`). Το πακέτο βαρών `chaos-mode`
   ορίζει μόνο το `weight` κάθε μέλους· η διανομή δεν το χρησιμοποιεί.
2. Στέλνει το ίδιο αίτημα σε κάθε μέλος του πάνελ **παράλληλα**, επομένως ένα αίτημα
   κοστίζει μία κλήση προς το upstream ανά μέλος του πάνελ
   (`open-sse/services/autoCombo/chaosEngine.ts`, με αποστολή από το
   `open-sse/services/combo.ts`).
3. Μεταδίδει μία γραμμή κατάστασης ανά μέλος του πάνελ καθώς καταφθάνει: ένα σχόλιο SSE
   (`: chaos <index> ok|fail <model>`) από προεπιλογή, καθώς και ένα συμβάν `omni-chaos-part`
   (`model`, `index`, `ok`, `error`) όταν το αίτημα ορίζει
   `stream_options.include_chaos_parts: true`. Αυτά δεν περιέχουν κείμενο απάντησης.
4. Στέλνει **μία** απάντηση του πάνελ ως το τελικό τμήμα μορφής OpenAI: εκείνη του πρώτου
   μέλους του πάνελ (το `auto/chaos` το ορίζει ως `judgeModel`) όταν αυτό επιτύχει, διαφορετικά
   εκείνη του τελευταίου επιτυχημένου μέλους. Οι υπόλοιπες απαντήσεις του πάνελ δεν επιστρέφονται, επομένως
   πληρώνετε για N κλήσεις και λαμβάνετε μία ολοκλήρωση.

## Ρύθμιση

1. Ανοιχτό** Ταμπλό → Chaos Mode** (`/dashboard/chaos`).
2. Γυρίστε το** επί** πλοία — Chaos Mode** απενεργοποιημένο από προεπιλογή** (`enabled: false` σε `src/lib/chaos/chaosConfig.ts`). Ενώ είναι απενεργοποιημένο, `POST /api/chaos/run` απαντά `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Επιλέξτε τους συμμετέχοντες και τις προεπιλογές (διατηρούνται ανά περίπτωση μέσω του χώρου αποθήκευσης ρυθμίσεων):

   | Πεδίο               | Εννοια                                                                | Προεπιλογή / όρια                       |
   | ------------------- | --------------------------------------------------------------------- | --------------------------------------- |
   | `enabled`           | Κύριος διακόπτης                                                      | `false`                                 |
   | `defaultMode`       | `parallel` ή `collaborative` (δείτε παρακάτω)                         | `parallel`                              |
   | `providerOverrides` | Συμμετοχή ανά πάροχο (`providerId`, προαιρετικό `modelId`, `enabled`) | άδειο = κάθε ενεργό πάροχο, μέγιστο 200 |
   | `systemPrompt`      | Παράκαμψη για το ενσωματωμένο μήνυμα συστήματος Chaos                 | προαιρετικό, μέγιστο 10 000 χαρακτήρες  |
   | `timeoutMs`         | Μέγιστος χρόνος ανά κλήση μοντέλου                                    | `120000` (5 000–600 000)                |
   | `maxTokens`         | `max_tokens` ανά κλήση μοντέλου                                       | `4096` (256–128 000)                    |

4. Δώστε σε κάθε συμμετέχοντα πάροχο α** μοντέλο** . Το μοντέλο ενός παρόχου είναι το `modelId` της ενεργοποιημένης παράκαμψής του στη σελίδα Chaos Mode (κερδίζει), διαφορετικά το** προεπιλεγμένο μοντέλο** της σύνδεσής του. Ένα αναγνωριστικό παρόχου δεν χρησιμοποιείται ποτέ ως όνομα μοντέλου. Ένας πάροχος με κανένα από τα δύο δεν είναι** δεν καλείται** : εμφανίζεται στα αποτελέσματα ως `status: "error"` με το μήνυμα _"Δεν έχει οριστεί μοντέλο για αυτόν τον πάροχο. Ορίστε ένα μοντέλο για αυτό στη σελίδα Chaos Mode ή ένα προεπιλεγμένο μοντέλο στη σύνδεση."_ και ένα κενό `modelId`, ενώ οι άλλοι πάροχοι λειτουργούν κανονικά. Εάν κανένας επιλεγμένος πάροχος δεν έχει μοντέλο, η εκτέλεση αποτυγχάνει πριν από οποιοδήποτε αίτημα ανοδικής ροής με _"Κανένας πάροχος δεν έχει σύνολο μοντέλου. …"_ (HTTP 500 και στα δύο τελικά σημεία).
5. Τρέξτε α** δοκιμή από την ίδια τη σελίδα** — ο πίνακας αποτελεσμάτων δείχνει την απάντηση, την κατάσταση και τη διάρκεια κάθε παρόχου.

## Τρόποι εκτέλεσης

- **`parallel`** — κάθε μοντέλο λαμβάνει ταυτόχρονα την ίδια εργασία· λαμβάνετε όλες τις απαντήσεις
  ανεξάρτητα.
- **`collaborative`** — τα μοντέλα εκτελούνται **σε αλυσίδα**: κάθε μοντέλο βλέπει την έξοδο του προηγούμενου και
  καλείται να τη βελτιώσει, να την επεκτείνει, να την αξιολογήσει κριτικά ή να προσφέρει μια εναλλακτική. Το πεδίο `summary` της απόκρισης
  συνενώνει τις επιτυχείς εξόδους με τη σειρά της αλυσίδας (οι παράλληλες εκτελέσεις δεν έχουν `summary`).

## API

### Συνεδρία πίνακα ελέγχου `POST /api/chaos/run` —

Έλεγχος ταυτότητας cookie (η περίοδος διαχείρισης — βλ. [MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md) ) . χρησιμοποιείται από τη σελίδα του πίνακα ελέγχου.

```jsonc
// body
{
  "task": "Compare approaches to X", // required
  "providers": ["glm", "kimi"], // optional filter
  "mode": "parallel", // optional — overrides defaultMode
  "systemPrompt": "…", // optional override
  "maxTokens": 4096, // optional override
}
```

### κλειδί `POST /api/skills/collect/chaos` — API

Παραλλαγή με διακριτικό φορέα για εξωτερικούς καλούντες. Το κλειδί πρέπει να φέρει το** Άδεια λειτουργίας Chaos** (`chaosModeEnabled`), που είναι** απενεργοποιημένο από προεπιλογή** — ενεργοποιήστε το ανά κλειδί** Ταμπλό → API Manager → επεξεργασία κλειδιού → δικαιώματα → Λειτουργία χάους** . Το ίδιο σώμα με το παραπάνω.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Και τα δύο τελικά σημεία επιστρέφουν το ίδιο σχήμα:

```jsonc
{
  "task": "…",
  "mode": "parallel",
  "startedAt": "2026-09-01T00:00:00.000Z",
  "totalProviders": 3,
  "totalResults": 3,
  "models": [
    {
      "providerId": "glm",
      "providerName": "GLM",
      "modelId": "glm-4.7",
      "status": "success",
      "content": "…",
      "durationMs": 3210,
    },
  ],
  "summary": "…", // collaborative mode only
}
```

## Αντιμετώπιση προβλημάτων

- **`400 Chaos Mode is not enabled`** — βήμα 2 παραπάνω: ο γενικός διακόπτης είναι απενεργοποιημένος.
- **Το κλειδί API απορρίπτεται στο `/api/skills/collect/chaos`** — το κλειδί δεν έχει το δικαίωμα `chaosModeEnabled` ανά κλειδί (απενεργοποιημένο από προεπιλογή, αυτή είναι ρύθμιση και όχι σφάλμα).
- **Ένας πάροχος δείχνει `No model set for this provider`** — όρισε το μοντέλο του στη σελίδα Chaos Mode ή ένα προεπιλεγμένο μοντέλο στη σύνδεσή του (βλ. Ρύθμιση, βήμα 4).
- **Ένας πάροχος που περιμένατε λείπει από τα αποτελέσματα** — ελέγξτε `providerOverrides` στη σελίδα Chaos Mode (μια απενεργοποιημένη παράκαμψη το εξαιρεί) και εάν η σύνδεση του παρόχου είναι ενεργή.
