# Quality Gates Reference (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Το παρόν έγγραφο αποτελεί την επίσημη αναφορά για όλες τις πύλες ποιότητας CI στο OmniRoute.
Περιγράφει κάθε πύλη, τι επικυρώνει, σε ποια εργασία CI εκτελείται, αν χρησιμοποιεί
γραμμή βάσης ratchet ή πολιτική επιτυχίας/αποτυχίας, καθώς και αν εμποδίζει το build ή είναι συμβουλευτική.

Για μια σύντομη σύνοψη και την πολιτική της λίστας επιτρεπόμενων, ανατρέξτε στην ενότητα "Πύλες ποιότητας και ratchets"
στο `AGENTS.md`. Για την κριτική αξιολόγηση, την ταξινόμηση ωριμότητας και το ανεξάρτητο από εργαλεία
σχέδιο αναπαραγωγής του ίδιου συστήματος, ανατρέξτε στο
[Εγχειρίδιο Πυλών Ποιότητας](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Απογραφή gate και προφίλ εκτέλεσης

### Αποδοχή υποψηφίων

Τα workflows CI και Quality Gates εκπέμπουν το καθένα μια σταθερή κρίση: `Gate / CI` και
`Gate / Quality`. Η πολιτική αποδοχής τους υπό έλεγχο εκδόσεων απαριθμεί κάθε upstream job
ως απαιτούμενο ή συμβουλευτικό. Ένα εφαρμοστέο απαιτούμενο job πρέπει να είναι επιτυχές:
τα αποτελέσματα missing, cancelled, skipped, pending και unknown δεν μπορούν να καθιερώσουν
PASS. Μια έγκυρη ταξινόμηση docs-only ή catalog-only μπορεί να καταστήσει μια λωρίδα κώδικα
μη εφαρμοστέα· ένα draft PR δεν είναι αποδεκτός υποψήφιος. Μια ετικέτα `hotfix` δεν παραιτείται
από την τεκμηρίωση.

Και τα δύο workflows καλύπτουν PR προς κλάδους main/release, pushes στο `main`, χειροκίνητο
dispatch και συμβάντα merge-group. Τα push, dispatch και merge-group εκτελούν την πλήρη επιλογή.
Τα pushes στο `release/**` δεν τα εκκινούν (2026-10-18): κάθε αλλαγή έχει ήδη εκτελέσει το matrix
στο δικό της PR και ο συγχωνευμένος συνδυασμός αποτελεί δουλειά του Release-Green
(`docs/ops/RUNNER_BOX.md` → Hosted lane). Τα forks και τα merge groups χρησιμοποιούν hosted
runners για jobs που διαφορετικά επιλέγουν self-hosted runners· πρέπει να επαληθευτεί επαρκής
hosted χωρητικότητα πριν από το rollout.

Κάθε απόδειξη JSON προσδιορίζει το SHA που έγινε checkout, το workflow run και την προσπάθεια.
Το CLI απορρίπτει αναντιστοιχία SHA checkout/event. Τα tests του workflow συνδέουν τη συμμετοχή
στην πολιτική με τη λίστα `needs` του job κρίσης, ώστε μια νέα ή αφαιρεθείσα λωρίδα να μη μπορεί
να εξαφανιστεί σιωπηλά. Οι αποδείξεις καλύπτουν το δικό τους workflow, όχι τη δημοσίευση, την
ανάπτυξη ή τα εσωτερικά ενός υπάρχοντος συμβουλευτικού scanner. Η ενεργοποίηση και των δύο
ονομάτων ελέγχων στους κανόνες κλάδων είναι ξεχωριστή διαχειριστική αλλαγή· η προσθήκη αυτών
των jobs δεν προστατεύει από μόνη της κάποιον κλάδο.

### Απογραφή στατικής σάρωσης

Η απογραφή npm-alias υπό έλεγχο εκδόσεων και η συμμετοχή στη στατική σάρωση βρίσκονται στο
`config/quality/gate-manifest.json`. Εκτελέστε `npm run check:gate-manifest` για να επικυρώσετε
τα ονόματα script και τις ακριβείς εντολές έναντι του `package.json`· προσθήκες, αφαιρέσεις και
απόκλιση εντολών προκαλούν αποτυχία τόσο στο τοπικό hook όσο και στα jobs ταξινόμησης αλλαγών
στο CI. Ένα alias δεν είναι job workflow, στιγμιότυπο matrix ή περίπτωση δοκιμής: αυτά τα πλήθη
δεν πρέπει να παρουσιάζονται ως εναλλάξιμα.

Χρησιμοποιήστε `npm run quality:scan -- --list` ή `npm run quality:scan:fast -- --list`
για να επιθεωρήσετε τα επιλεγμένα alias χωρίς να τα εκτελέσετε. Ο runner καλεί το entrypoint
του npm, οπότε το runtime του (συμπεριλαμβανομένου του Bun όπου είναι ρυθμισμένο) διατηρείται.
Το manifest καταγράφει τα alias εκτός αυτών των προφίλ ως κληθέντα ξεχωριστά, και οι εντολές
συντήρησης απαγορεύονται σε προφίλ σάρωσης μόνο για ανάγνωση.

Αυτά τα προφίλ καλύπτουν μόνο τη στατική σάρωση. Δεν πιστοποιούν δοκιμές προϊόντος, κάλυψη,
συσκευασία, εξωτερικούς ελέγχους ή την πλήρη αποδοχή έκδοσης ενός υποψηφίου. Η αποδοχή του
workflow χρησιμοποιεί τα συνδεδεμένα `config/quality/admission-policy.json` και
`scripts/quality/admission-verdict.mjs`. Τα προφίλ release-observer παραμένουν ξεχωριστά·
επιθεωρήστε ανεξάρτητα τους ισχύοντες ελέγχους και τις αποδείξεις τους. Η πεζή απογραφή
παρακάτω αποτελεί αναφορά, όχι απόδειξη ότι ένα gate όντως εκτελέστηκε.

Τα scripts βρίσκονται κάτω από τα `scripts/check/` (gates πολιτικής) και `scripts/quality/`
(μηχανή ratchet). Η πηγή αλήθειας του CI είναι το `.github/workflows/ci.yml`.

### Fast-path PR έκδοσης (`quality.yml`)

Το `.github/workflows/quality.yml` συμπληρώνει το CI σε PR main/release, pushes στο `main`,
dispatch και merge groups. Τα PR χρησιμοποιούν γρήγορους ελέγχους με φίλτρο διαδρομών. Το
μόνιμα απενεργοποιημένο διπλότυπο build αφαιρέθηκε· οι πραγματικοί έλεγχοι build/package/boot
παραμένουν στο CI.

| Job                                              | Εύρος                                                                                                                                                                                                                       | Αποκλειστικό                   |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `Docs Gates (fast-path)`                         | PR τεκμηρίωσης/κώδικα· αναφορές API docs και docs-all                                                                                                                                                                       | Ναι                            |
| `Fast Quality Gates`                             | PR κώδικα· στατικοί έλεγχοι, typecheck, typecheck dashboard, επηρεαζόμενα unit tests                                                                                                                                        | Ναι                            |
| `Forgotten sibling tests`                        | PR κώδικα· τα τροποποιημένα modules ανιχνεύονται σε στατικούς καταναλωτές και υποψήφια sibling tests· οι διαδρομές barrel και dynamic-import αναφέρονται ως συμβουλευτικά διαγνωστικά, με αναφερόμενες εξαιρέσεις allowlist | **Συμβουλευτικό**              |
| `Vitest (fast-path)`                             | PR κώδικα· γρήγορη σουίτα vitest                                                                                                                                                                                            | Ναι                            |
| `Unit Tests fast-path`                           | PR κώδικα· σουίτα unit σε 4 shards                                                                                                                                                                                          | Ναι                            |
| `No new ESLint warnings`                         | PR κώδικα· φρουρός lint με επίγνωση suppressions                                                                                                                                                                            | Ναι, συμπεριλαμβανομένων forks |
| `Merge integrity (changelog + generated skills)` | PR εκτός draft· συγχρονισμός changelog και παραγόμενων skills                                                                                                                                                               | Ναι, συμπεριλαμβανομένων forks |

#### Αναφορά Forgotten sibling tests

Το `npm run check:forgotten-sibling-tests` επαναχρησιμοποιεί τον επιλυτή εισαγωγών που βρίσκεται πίσω από τον χάρτη επιπτώσεων δοκιμών.
Για κάθε τροποποιημένο module παραγωγής, αναφέρει ντετερμινιστικές αλυσίδες
`changed module/symbol -> static consumer -> candidate sibling test` όταν η υποψήφια
δοκιμή απουσιάζει από το diff του pull request. Η σύνοψη Markdown και το αποτέλεσμα JSON διατηρούνται ως
το artifact ροής εργασίας `forgotten-sibling-tests` για βαθμονόμηση πριν από οποιαδήποτε ανασταλτική κυκλοφορία.

Οι επανεξαγωγές barrel και οι δυναμικές εισαγωγές αποτελούν μόνο διαγνωστικά επίλυσης· δεν δημιουργούν ποτέ
ανασταλτικό εύρημα. Οι ελεγμένες εξαιρέσεις βρίσκονται στο
`config/quality/forgotten-sibling-allowlist.json`. Κάθε καταχώρηση πρέπει να αναφέρει τον καταναλωτή και την υποψήφια
δοκιμή, να δίνει συγκεκριμένη αιτιολόγηση και να παραπέμπει σε ένα GitHub issue ή pull request. Οι εσφαλμένες καταχωρήσεις αποτυγχάνουν
με fail closed. Οι εξαιρέσεις δεν μπορούν να αποκρύψουν μια διαγραμμένη υποψήφια δοκιμή ή ένα diff που προσθέτει `.skip`/`.todo`·
η αποδυνάμωση ισχυρισμών και λοιπές μορφές απόκρυψης παραμένουν στην ευθύνη της ανεξάρτητα ανασταλτικής
πύλης `check:test-masking`.

### Εργασία: `lint`

Εκτελείται σε κάθε PR προς το `main`. Αποκλείει τη συγχώνευση σε περίπτωση αποτυχίας.

| Σενάριο (`npm run ...`)           | Επικυρώνει                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Μπλοκάρισμα                                   |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| `check:node-runtime`              | Η έκδοση του Node.js βρίσκεται εντός του υποστηριζόμενου εύρους                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ναι                                           |
| `check:cycles`                    | Κυκλικές εισαγωγές σε ολόκληρα τα `src/` + `open-sse/` (με βάση AST, με επίλυση των `paths` του tsconfig). Η απλή εκτέλεση τερματίζει με κωδικό 1 όποτε υπάρχει οποιοσδήποτε κύκλος (fail-closed από το #15281) και παραθέτει τους SCCs. Το `check:cycles:ratchet` (αυτό που εκτελεί το CI) μπλοκάρει όταν ο αριθμός υπερβαίνει το όριο `metrics.cycles` στο `quality-baseline.json` — επί του παρόντος 14, `direction: down`, επομένως μπορεί μόνο να μειωθεί (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ναι (ratchet)                                 |
| `check:boundary`                  | Σύζευξη `open-sse → src`: μοναδικές εισαγωγές αρχείου-προς-αρχείο από τη μηχανή στην εφαρμογή (`scripts/quality/measure-boundary.mjs`· η λίστα ακμών αποτελεί το εκκρεμές πρόγραμμα εργασιών αποκατάστασης του v4 core/module-split). Απλή = συμβουλευτική αναφορά (ίδια με το `quality:boundary`). Το `check:boundary:ratchet` (αυτό που εκτελεί το CI, επίσης και στον βρόχο ratchet των fast-gates του `quality.yml`) μπλοκάρει όταν ο αριθμός υπερβαίνει το όριο `metrics.boundaryOpenSseToSrc` στο `quality-baseline.json` — αρχικοποιημένο στη μετρημένη τιμή 771, `direction: down`· το `--update` μόνο τη μειώνει· σχετικό με τη βάση στα PR (`--base-ref`, δείτε παρακάτω)                                                                                                                                                                                                                                                                                                              | Ναι (ratchet)                                 |
| `check:route-validation:t06`      | Παρουσία σχημάτων Zod σε όλες τις διαδρομές (πολιτική Επιπέδου 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ναι                                           |
| `check:any-budget:t11`            | Ο αριθμός των `@ts-expect-error // any` δεν υπερβαίνει τον προϋπολογισμό (ratchet Επιπέδου 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ναι                                           |
| `check:provider-consistency`      | Κάθε πάροχος στο `providers.ts` έχει αντίστοιχη καταχώριση στο `providerRegistry.ts` (και αντίστροφα, εντός της allowlist)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ναι                                           |
| `check:model-lifecycle`           | Οι τρεις χειροκίνητα συντηρούμενοι πίνακες δρομολόγησης παραμένουν συνεπείς με το checked-in στιγμιότυπο κύκλου ζωής (#11503): ο `FITNESS_TABLE` (`taskFitness.ts`) δεν βαθμολογεί κανένα αποσυρμένο id που μπορεί να δρομολογήσει το `REGISTRY`· κάθε στόχος των `BUILT_IN_ALIASES` υπάρχει στο `REGISTRY` και απουσιάζει από το στιγμιότυπο αποσυρμένων id· κάθε αποσυρμένο id που παραμένει στο `REGISTRY` προωθείται ή αναφέρεται στο `allowedRetiredInCatalog`· και καμία πηγή ή στόχος του `DEFAULT_DEGRADATION_MAP` δεν εμφανίζεται ως αποσυρμένη σε αυτό το στιγμιότυπο. Αυτό δεν αποδεικνύει ότι ένα μοντέλο εξυπηρετείται αυτή τη στιγμή από ένα ζωντανό upstream. Εκτός σύνδεσης — συγκρίνεται με το `config/quality/model-lifecycle.json`, το οποίο ανανεώνεται χειροκίνητα με `npm run quality:refresh-model-lifecycle` (δίκτυο· δεν είναι ενσωματωμένο στο CI). Το `allowedRetiredInCatalog` είναι ένας μηχανισμός burn-down ratchet: προσθέστε καταχώριση μόνο με tracking issue. | Ναι                                           |
| `check:fetch-targets`             | Κάθε `fetch("/api/...")` στο client-side `src/` αντιστοιχεί σε ένα πραγματικό `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ναι                                           |
| `check:deps`                      | Όλες οι εξαρτήσεις που μπορούν να εγκατασταθούν με `npm install` σε κάθε `package.json` του αποθετηρίου βρίσκονται στο `dependency-allowlist.json`· επισημαίνονται νέα μη καρφιτσωμένα (unpinned) ή slopsquatted πακέτα                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ναι                                           |
| `audit:deps`                      | `npm audit` (root + electron) — καμία ειδοποίηση υψηλής/κρίσιμης σοβαρότητας (επικαλύπτεται με το osv `check:vuln-ratchet`· βλ. Rationalization Backlog)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ναι                                           |
| `check:lockfile`                  | Ακεραιότητα του `package-lock.json` — μητρώο https, hashes ακεραιότητας, χωρίς παρακάμψεις host                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ναι                                           |
| `check:licenses`                  | Λίστα επιτρεπόμενων αδειών SPDX για τις εξαρτήσεις παραγωγής                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ναι                                           |
| `check:tracked-artifacts`         | Χωρίς build artifacts / committed symlinks `node_modules` (εκτελείται επίσης στο husky pre-commit· το pre-push είναι σκόπιμα ελαφρύ — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ναι                                           |
| `check:ai-attribution`            | Χωρίς trailer `Co-Authored-By` από AI/bot ή υποσέλιδο δημιουργίας μέσω AI στα commits, τον τίτλο ή το σώμα του PR — Σκληρός Κανόνας #16 (στον βρόχο fast-gates του `quality.yml` για PR→`release/**` — διαβάζει το event payload, no-op εκτός PRs — και ως βήμα μόνο για PR στο lint του `ci.yml` για PR→`main`· επίσης το husky hook `commit-msg`· επιτρέπονται ανθρώπινοι συν-συγγραφείς· #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `check:vitest-exclusions`         | Κάθε εξαίρεση Vitest αναφέρει ένα tracking issue και εμφανίζεται στο `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ναι                                           |
| `check:file-size`                 | Τα αρχεία πηγαίου κώδικα (`.ts`/`.tsx` σε `src/`, `open-sse/`, `electron/`, `bin/`) παραμένουν εντός του `cap` και τα αρχεία δοκιμών (`*.test.ts(x)`) εντός του `testCap`· τα παγωμένα αρχεία στο `file-size-baseline.json` (`frozen` / `testFrozen`) δεν πρέπει να ξεπερνούν το καταγεγραμμένο τους μέγεθος                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ναι                                           |
| `check:error-helper`              | Οι απαντήσεις σφαλμάτων σε executors/handlers χρησιμοποιούν `buildErrorBody()` / `sanitizeErrorMessage()` (Αυστηρός Κανόνας #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ναι                                           |
| `check:migration-numbering`       | Τα αρχεία SQL μετεγκατάστασης αριθμούνται διαδοχικά, χωρίς κενά ή διπλότυπα                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ναι                                           |
| `check:public-creds`              | Κανένα κυριολεκτικό OAuth `client_id`/`client_secret` ή κλειδιά Firebase Web εκτός του `publicCreds.ts` (Αυστηρός Κανόνας #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ναι                                           |
| `check:db-rules`                  | Καμία ακατέργαστη SQL εκτός των modules `src/lib/db/`· κανένα barrel-import από το `localDb.ts` (Αυστηροί Κανόνες #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ναι                                           |
| `check:known-symbols`             | Οι executors παρόχων, οι στρατηγικές δρομολόγησης και οι μεταφραστές που είναι καταχωρημένοι στους πίνακες dispatch τους ταιριάζουν με τα αρχεία στον δίσκο — κανένα ορφανό ή μη δηλωμένο σύμβολο                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ναι                                           |
| `check:route-guard-membership`    | Κάθε διαδρομή που δημιουργεί θυγατρική διεργασία ταξινομείται από το `isLocalOnlyPath()` (Αυστηροί Κανόνες #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ναι                                           |
| `check:test-discovery`            | Κάθε αρχείο `*.test.ts` / `*.spec.ts` στο αποθετήριο συλλέγεται από τουλάχιστον έναν εκτελεστή δοκιμών (ratchet: η λίστα ορφανών στο `test-discovery-baseline.json` μπορεί μόνο να μικραίνει)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ναι                                           |
| `check:agent-skills-sync`         | Τα παραγόμενα artifacts του agent-skills ταιριάζουν με τον κατάλογο πηγής τους (χωρίς αποκλίσεις)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `check:provider-asset-provenance` | Τα λογότυπα/assets των παρόχων φέρουν καταγεγραμμένη εγγραφή προέλευσης                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `lint:json`                       | Τα αρχεία ρυθμίσεων JSON αναλύονται συντακτικά και ικανοποιούν τους κανόνες lint του αποθετηρίου                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `typecheck:core`                  | Μεταγλώττιση TypeScript χωρίς σφάλματα (μόνο συμβουλευτικές προειδοποιήσεις)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ναι                                           |
| `typecheck:noimplicit:core`       | Αυστηρό `noImplicitAny` — με προσανατολισμό προς το μέλλον· πολλά προϋπάρχοντα σημεία κλήσης χρειάζονται ακόμη επισημάνσεις τύπων                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | **Συμβουλευτικό** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` με εμβέλεια στο `src/app/(dashboard)/**` (#7033) — η επιμελημένη λίστα επιτρεπόμενων 27 αρχείων του `typecheck:core` δεν περιλαμβάνει κανένα TSX του dashboard, και το `next build` επίσης δεν ελέγχει ποτέ τους τύπους του (το `next.config.mjs` ορίζει `ignoreBuildErrors: true`), οπότε οι παλινδρομήσεις ορφανών αναγνωριστικών εκεί (#6625/#6909) ήταν αόρατες στο CI. Έλεγχος διαφορών έναντι μιας παγωμένης βασικής γραμμής μετρήσεων ανά αρχείο/ανά κωδικό TS (`config/quality/dashboard-typecheck-baseline.json`, ίδιο μοτίβο επιβολής stale με το `check:known-symbols`) — μόνο ΝΕΑ σφάλματα πέρα από την καταγεγραμμένη βασική μέτρηση προκαλούν αποτυχία της πύλης· μειώστε την τιμή με `--update` όταν διορθώνεται ένα προϋπάρχον σφάλμα.                                                                                                                                                                                                                                     | Ναι                                           |

### Εργασία: `quality-gate`

Εκτελείται μετά το `test-coverage`. Αποκλείει τη συγχώνευση σε περίπτωση αποτυχίας.

| Script                       | Επαληθεύει                                                                                                                                                                                         | Αποκλεισμός              |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `quality:collect`            | Εκπέμπει το `quality-metrics.json` (πλήθος προειδοποιήσεων ESLint, κάλυψη από τη συγχωνευμένη αναφορά shard)                                                                                       | Ναι (ανάντη του ratchet) |
| `quality:ratchet`            | Κάθε μέτρηση στο `quality-baseline.json` δεν έχει υποβαθμιστεί (προειδοποιήσεις ESLint ≤ βασική γραμμή· κάλυψη ≥ βασική γραμμή)                                                                    | Ναι                      |
| `check:duplication`          | Η επανάληψη κώδικα (jscpd@4) δεν υπερβαίνει τη βασική γραμμή στο `quality-baseline.json`                                                                                                           | Ναι                      |
| `check:complexity`           | Η κυκλωματική πολυπλοκότητα σε επίπεδο αρχείου δεν υπερβαίνει το ανώτατο όριο (βασικό ESLint `complexity` + `max-lines-per-function`)                                                              | Ναι                      |
| `check:cognitive-complexity` | Ratchet γνωστικής πολυπλοκότητας (`eslint-plugin-sonarjs`) — ξεχωριστό πέρασμα ESLint· το CI εκτελεί και τα δύο συγχωνευμένα ως το ενιαίο βήμα `check:complexity-ratchets`                         | Ναι                      |
| `check:dead-code`            | Το ratchet αχρησιμοποίητων εξαγωγών / αρχείων (knip) δεν υποβαθμίζεται σε σχέση με τη βασική γραμμή                                                                                                | Ναι                      |
| `check:compression-budget`   | Προϋπολογισμός benchmark συμπίεσης — τα κατώτατα όρια εξοικονόμησης token ανά μηχανή δεν πρέπει να υποβαθμίζονται                                                                                  | Ναι                      |
| `check:type-coverage`        | Το ratchet ποσοστού τυποποίησης (`type-coverage`) δεν υποβαθμίζεται· καλύπτει σε μεγάλο βαθμό το `typecheck:noimplicit:core`                                                                       | Ναι                      |
| `check:codeql-ratchet`       | Ο αριθμός ανοιχτών ειδοποιήσεων CodeQL δεν υποβαθμίζεται (ανάγνωση μέσω `gh api`· ομαλή παράλειψη χωρίς token) — συχνότητα ανανέωσης και χειροκίνητη ενεργοποίηση: δείτε «CodeQL ratchet» παρακάτω | Ναι                      |

### Εργασία: `quality-extended`

Ολόκληρη η εργασία είναι συμβουλευτική (`continue-on-error: true`). Τα ratchets που βασίζονται σε npm εκτελούνται κανονικά· οι εξωτερικοί σαρωτές εγκαθίστανται μέσω `gh release download` και αυτο-παραλείπονται (exit 0) όταν ένα δυαδικό αρχείο εξακολουθεί να απουσιάζει.

| Script                   | Επαληθεύει                                                                                                                                                                                                                                        | Αποκλεισμός                                                 |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `check:circular-deps`    | Καμία κυκλική εξάρτηση (dpdm)                                                                                                                                                                                                                     | **Συμβουλευτικό**                                           |
| `check:bundle-size`      | Το μέγεθος του bundle δεν υπερβαίνει το ανώτατο όριο                                                                                                                                                                                              | **Συμβουλευτικό**                                           |
| `check:secrets`          | Σάρωση μυστικών (gitleaks) — παραλείπεται αν το δυαδικό αρχείο απουσιάζει                                                                                                                                                                         | **Συμβουλευτικό**                                           |
| `check:vuln-ratchet`     | Οι ευπάθειες εξαρτήσεων (osv-scanner) δεν υποβαθμίζονται — παραλείπεται αν το δυαδικό αρχείο απουσιάζει                                                                                                                                           | **Συμβουλευτικό**                                           |
| `check:workflows`        | Lint ροών εργασίας (actionlint + zizmor)· σαρωτές που λείπουν/παρουσιάζουν βλάβη, μη έγκυρες αναφορές ή έλλειψη βασικής γραμμής ratchet αποτυγχάνουν ως INCOMPLETE. Τα έγκυρα ευρήματα ακολουθούν την επιλεγμένη πολιτική strict/advisory/ratchet | Απαιτείται εκτέλεση· το ratchet του zizmor αποκλείει στο CI |
| `check:openapi-breaking` | Καταστροφικές αλλαγές στο δημόσιο συμβόλαιο API (`openapi.yaml`) σε σχέση με το βασικό branch (oasdiff) — εκπέμπει `openapiBreaking=N`· παραλείπεται αν το oasdiff απουσιάζει ή η βασική προδιαγραφή δεν μπορεί να επιλυθεί                       | **Συμβουλευτικό**                                           |

### Εργασία: `docs-sync-strict`

Εκτελείται σε κάθε PR προς το `main`. Αποκλείει τη συγχώνευση σε περίπτωση αποτυχίας.

| Script                         | Επικυρώνει                                                                                                                                                                                                       | Αποκλεισμός                  |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `check:docs-all`               | Μετα-πύλη που εκτελεί διαδοχικά τις 6 υπο-πύλες παρακάτω                                                                                                                                                         | Ναι                          |
| ↳ `check:docs-sync`            | Συνέπεια εκδόσεων CHANGELOG / OpenAPI / llm.txt                                                                                                                                                                  | Ναι                          |
| ↳ `check:docs-counts`          | Οι μετρήσεις στο κείμενο (πλήθος παρόχων, πλήθος migrations κ.λπ.) βρίσκονται εντός του παραθύρου ratchet των πραγματικών μετρήσεων                                                                              | Ναι                          |
| ↳ `check:env-doc-sync`         | Κάθε μεταβλητή περιβάλλοντος στο `.env.example` τεκμηριώνεται σε πίνακα της τεκμηρίωσης, και αντίστροφα                                                                                                          | Ναι                          |
| ↳ `check:deprecated-versions`  | Καμία απαρχαιωμένη συμβολοσειρά έκδοσης στην τεκμηρίωση                                                                                                                                                          | Ναι                          |
| ↳ `check:doc-links`            | Οι εσωτερικοί σύνδεσμοι markdown στην τεκμηρίωση οδηγούν σε πραγματικά αρχεία (μορφή `[text]`/`(path)`)                                                                                                          | Ναι                          |
| ↳ `check:fabricated-docs`      | Τα routes, οι μεταβλητές περιβάλλοντος, οι εντολές CLI, τα ονόματα hooks και οι διαδρομές αρχείων που αναφέρονται στην τεκμηρίωση υπάρχουν στον κώδικα. Αυστηρή πύλη μέσω `--strict`· soft-fail χωρίς τη σημαία. | Ναι (μέσω `--strict` στο CI) |
| `check:cli-i18n`               | Οι συμβολοσειρές εντολών CLI υπάρχουν σε όλα τα αρχεία locale i18n                                                                                                                                               | Ναι                          |
| `check:openapi-coverage`       | Η προδιαγραφή OpenAPI καλύπτει τουλάχιστον ένα κατώφλι ratchet πραγματικών routes                                                                                                                                | Ναι                          |
| `check:openapi-security-tiers` | Οι σημειώσεις επιπέδων ασφαλείας στο `openapi.yaml` είναι συνεπείς με τις ταξινομήσεις του `routeGuard.ts`                                                                                                       | **Συμβουλευτικό**            |
| `check:openapi-routes`         | Κάθε διαδρομή στο `openapi.yaml` αντιστοιχεί σε πραγματικό `route.ts` (προστασία από παραισθήσεις)                                                                                                               | Ναι                          |
| `check:docs-symbols`           | Κάθε αναφορά `/api/...` στα `docs/**/*.md` αντιστοιχεί σε πραγματικό `route.ts` (προστασία από παραισθήσεις)                                                                                                     | Ναι                          |
| `i18n translation drift`       | Μη μεταφρασμένα κλειδιά στα αρχεία locale i18n — μόνο προειδοποίηση                                                                                                                                              | **Συμβουλευτικό**            |

### Εργασία: `i18n-ui-coverage`

| Script                                  | Επικυρώνει                                                                                                                                                                                                                 | Αποκλεισμός       |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `check-ui-keys-coverage` (ενσωματωμένο) | Η κάλυψη κλειδιών i18n του UI είναι ≥ 65%                                                                                                                                                                                  | Ναι               |
| `check-ui-value-drift` (ενσωματωμένο)   | Μια ξαναγραμμένη αγγλική **τιμή** δεν αφήνει πίσω απαρχαιωμένη μετάφραση                                                                                                                                                   | Ναι               |
| `check-new-key-coverage` (ενσωματωμένο) | Ένα **νέο** αγγλικό κλειδί μεταφράζεται σε κάθε locale — ένας δείκτης `__MISSING__:` απορρίπτεται                                                                                                                          | Ναι               |
| `check-translation-ratio`               | Η αναλογία πραγματικών μεταφράσεων ανά locale (φύλλα πανομοιότυπα με τα αγγλικά / placeholder / ελλιπή, εκτός της allowlist) δεν πρέπει να υπερβαίνει το `config/quality/i18n-translation-baseline.json` + περιθώριο slack | **Συμβουλευτικό** |

Απαιτεί `fetch-depth: 0` — η πύλη value-drift συγκρίνει (diff) το `en.json` έναντι του merge base.

#### `check-ui-value-drift` — πύλη απαρχαιωμένων μεταφράσεων

Εντοπίζει τη μία παλινδρόμηση i18n που οι υπόλοιπες πύλες δομικά δεν μπορούν να δουν: μια αγγλική
τιμή ξαναγράφεται και οι μεταφράσεις που προήλθαν από τα _προηγούμενα_ αγγλικά μένουν πίσω, ώστε
οι μη αγγλόφωνοι χρήστες συνεχίζουν να διαβάζουν κείμενο διατυπωμένο με σιγουριά αλλά πλέον λανθασμένο.

Αυτό όντως έφτασε σε παραγωγή. Το `oauthModal.googleOAuthWarning` ξαναγράφηκε όταν ενσωματώθηκε ο
βοηθός σύνδεσης Antigravity (#5203)· **39 από 43 locales** κράτησαν κείμενο που έλεγε στους χειριστές
να «αντιγράψουν το πλήρες URL και να το επικολλήσουν παρακάτω» — μια ροή που δεν μπορεί να
ολοκληρωθεί για αυτόν τον πάροχο. Πέρασε απαρατήρητο μέχρι το #8463 επειδή:

- το `sync-ui-keys` συμπληρώνει μόνο κλειδιά που **απουσιάζουν**, ποτέ κλειδιά που είναι **απαρχαιωμένα**·
- το `check-ui-keys-coverage` μετρά την _παρουσία_ κλειδιών, οπότε μια απαρχαιωμένη μετάφραση βαθμολογείται ως καλυμμένη·
- το `check-translation-drift` παρακολουθεί τους καθρέφτες τεκμηρίωσης `docs/i18n/<locale>/**.md` —
  δεν διαβάζει ποτέ τα `src/i18n/messages/*.json`. Αποκλειστικό στην εργασία `docs-sync-strict` από τον
  επανασυγχρονισμό του 2026-09: επεξεργασία ενός βασικού εγγράφου → `npm run i18n:run -- --files=<doc>` (σε επίπεδο ενότητας, οικονομικό).

**Με επίγνωση διαφορών, όχι βασισμένο σε βασική γραμμή.** Συγκρίνει το `en.json` στο merge base με το working tree· για κάθε κλειδί του οποίου η αγγλική τιμή άλλαξε, οποιαδήποτε locale εξακολουθεί να κρατά μια ανέγγιχτη μετάφραση είναι παρωχημένη. Αυτό σκόπιμα **παγώνει το προϋπάρχον χρέος** — μια διαφορά (diff) δεν μπορεί να αποκαλύψει από ποια παλιά αγγλικά προήλθε μια μακροχρόνια μετάφραση, οπότε η πύλη κρίνει μόνο ό,τι αγγίζει η τρέχουσα αλλαγή. Η εναλλακτική (μια βασική γραμμή hash ανά κλειδί) θα κόστιζε ένα παραγόμενο αρχείο ~600 KB, 3× το μέγεθος της μεγαλύτερης υπάρχουσας βασικής γραμμής, με συνεχείς αλλαγές σε κάθε PR i18n.

Δύο τρόποι για να την ικανοποιήσετε:

1. ενημερώστε τις επηρεαζόμενες μεταφράσεις, ή
2. ορίστε τις σε `__MISSING__:<new english>` — το runtime τότε σερβίρει τα διορθωμένα αγγλικά
   (`src/i18n/request.ts::deepMergeFallback`, #7258) και το κλειδί μπαίνει σε ουρά για μετάφραση.

Αν το **νόημα** της συμβολοσειράς άλλαξε, προτιμήστε **τη μετονομασία του κλειδιού**: ένα νέο κλειδί δεν μπορεί να κληρονομήσει μια παρωχημένη μετάφραση. Αυτό είναι το μοτίβο που χρησιμοποίησε το #8463.

```bash
npm run i18n:check-value-drift          # αυστηρό (αυτό που εκτελεί το CI)
npm run i18n:check-value-drift:warn     # μόνο αναφορά
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Τερματίζει με 0 εμφανίζοντας `SKIP reason=base-unresolved` όταν ο βασικός κατάλογος δεν μπορεί να διαβαστεί (shallow clone χωρίς το base ref), αντικατοπτρίζοντας το `check-openapi-breaking`.

### Εργασία: `i18n`

Πλήρης πίνακας επικύρωσης i18n (μία εργασία ανά locale). Ολόκληρη η εργασία είναι συμβουλευτική.

| Script                          | Επικυρώνει                      | Αποκλεισμός                                                           |
| ------------------------------- | ------------------------------- | --------------------------------------------------------------------- |
| `validate_translation.py quick` | Πληρότητα μετάφρασης ανά locale | **Συμβουλευτικό** (`continue-on-error: true` σε ολόκληρη την εργασία) |

### Εργασία: `pr-test-policy`

Εκτελείται μόνο σε pull requests.

| Script                 | Επικυρώνει                                                                                                                                                               | Αποκλεισμός |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `check:pr-test-policy` | PRs που αλλάζουν κώδικα παραγωγής στα `src/`, `open-sse/`, `electron/`, ή `bin/` πρέπει να περιλαμβάνουν ή να ενημερώνουν δοκιμές (Αυστηρός Κανόνας #8)                  | Ναι         |
| `check:test-masking`   | Τα αλλαγμένα αρχεία δοκιμών δεν μειώνουν τον καθαρό αριθμό assert ούτε προσθέτουν ταυτολογίες `assert.ok(true)`                                                          | Ναι         |
| `check:pr-evidence`    | Το σώμα του PR παραθέτει αποδεικτικά στοιχεία δοκιμών/VPS για την αλλαγή (μηχανοποιεί τον Αυστηρό Κανόνα #18 κάνοντας grep στην πρόζα του PR — εύθραυστο, δείτε Backlog) | Ναι         |

### Εργασία: `test-vitest`

Εκτελείται μετά το `build`. Μπλοκάρει τη συγχώνευση σε αποτυχία.

| Σουίτα           | Επικυρώνει                                                  | Αποκλεισμός                                                                                                                          |
| ---------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | MCP server (110 εργαλεία), autoCombo, cache — vitest runner | Ναι                                                                                                                                  |
| `test:vitest:ui` | Δοκιμές στοιχείων UI — vitest runner                        | **Αποκλειστικό** — οι προϋπάρχουσες αποτυχίες εξαιρούνται ρητά στο `vitest.config.ts`· νέες αποτυχίες κάνουν την εργασία να αποτύχει |

### Νυχτερινά workflows (προγραμματισμένα, συμβουλευτικά)

Αυτά εκτελούνται με χρονοπρόγραμμα cron (και `workflow_dispatch`), ποτέ σε PRs. Όλα είναι συμβουλευτικά.

| Workflow               | Επικυρώνει                                                                                                                                                                               | Αποκλεισμός       |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `nightly-property`     | Δοκιμές ιδιοτήτων fast-check με τυχαίο seed + μεγάλο αριθμό εκτελέσεων                                                                                                                   | **Συμβουλευτικό** |
| `nightly-resilience`   | Πύλη αύξησης heap, chaos fault-injection, φορτίο/soak με k6                                                                                                                              | **Συμβουλευτικό** |
| `nightly-llm-security` | Φράγμα injection promptfoo (λειτουργία block) + probes garak (παραλείπονται χωρίς secret παρόχου)                                                                                        | **Συμβουλευτικό** |
| `nightly-schemathesis` | Fuzzing συμβάσεων OpenAPI (schemathesis) εναντίον ενός live OmniRoute χρησιμοποιώντας το `docs/openapi.yaml` — αναδεικνύει παραβιάσεις προδιαγραφής / μη διαχειριζόμενα 500 (Fase 8 B.4) | **Συμβουλευτικό** |
| `nightly-mutation`     | Σκορ mutation-testing Stryker στη γρήγορη λωρίδα unit tests — οι επιζώντες μεταλλάκτες αναδεικνύουν αδύναμα asserts                                                                      | **Συμβουλευτικό** |
| `nightly-compat`       | Πίνακας συμβατότητας εκδόσεων Node στα υποστηριζόμενα εύρη `engines.node`                                                                                                                | **Συμβουλευτικό** |

Οι βασικές γραμμές απόδοσης (heap, TTFB, χρόνος build) καταγράφονται, δεν αποτελούν πύλη: δείτε [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Φάση ταχύτητας (2026-08-30 → v4.0 LTS): κάθε γραμμή βάσης χαλάρωσε κατά 20%

Απόφαση ιδιοκτήτη (2026-08-30): μέχρι την αρθρωτοποίηση της v4.0, η ταχύτητα παράδοσης έχει μεγαλύτερη
σημασία από τη συγκράτηση του τεχνικού χρέους. Κάθε **αριθμητική** γραμμή βάσης του μηχανισμού σταδιακής αυστηροποίησης χαλάρωσε κατά 20% σε ένα
ελέγξιμο πέρασμα και η φάση δηλώνεται στο `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Τι άλλαξε                                                                                                                                                                                                                                              | Πού                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — μετρήσεις όπου το χαμηλότερο είναι καλύτερο ×1.2, ποσοστά όπου το υψηλότερο είναι καλύτερο ÷1.2 (το ελάχιστο όριο κάλυψης παρέμεινε 60, το `eslintErrors` παραμένει 0, `eslintWarnings` 0 → 20% του παγιωμένου αριθμού καταστολών) | `quality-baseline.json` (η σημείωση `_relax_velocity_2026_08_30` παραθέτει κάθε τιμή πριν → μετά)      |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                                       | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, κάθε όριο γραμμών `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                                                                                                 | `file-size-baseline.json`                                                                              |
| μετρήσεις ανά αρχείο / ανά κώδικα TS ×1.2                                                                                                                                                                                                              | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                                    | `scripts/check/check-openapi-coverage.mjs`                                                             |
| το `--require-tighten` γίνεται συμβουλευτικό όσο το `_policy.requireTighten === false`                                                                                                                                                                 | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| το νυχτερινό `bank-ratchet-shrinks` διακόπτεται προσωρινά (θα αποθήκευε τη μετρημένη μείωση και θα αναιρούσε το περιθώριο)                                                                                                                             | `.github/workflows/nightly-release-green.yml`                                                          |

Οι λίστες επιτρεπόμενων στοιχείων (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **δεν** αποτελούν προϋπολογισμούς και δεν τροποποιήθηκαν. Οι πύλες πολιτικής επιτυχίας/αποτυχίας (μυστικά, κανόνες SQL,
σύμβαση τεκμηρίωσης/περιβάλλοντος, ισοτιμία i18n, δοκιμές μονάδας) παραμένουν αμετάβλητες — μια αποτυχημένη δοκιμή εξακολουθεί να είναι αποτυχημένη δοκιμή.

**Εργαλεία**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — η
  εφάπαξ χαλάρωση (`scripts/quality/relax-baselines.mjs`)· αρνείται να εκτελεστεί δύο φορές με την
  ίδια σημείωση.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  μετρά κάθε αριθμητική πύλη με τον ίδιο τρόπο όπως το CI και εμφανίζει το εναπομένον περιθώριο ανά πύλη
  (`scripts/quality/baseline-headroom.mjs`). Η νυχτερινή εργασία `baseline-headroom` δημοσιεύει
  τον πίνακα στη σύνοψη εκτέλεσης της ροής εργασίας και μεταφορτώνει την αναφορά JSON/Markdown ως
  `baseline-headroom-<run_id>`, η οποία διατηρείται για 90 ημέρες. Οι γραμμές προειδοποίησης και κρίσιμης κατάστασης προσδιορίζουν πύλες
  που βρίσκονται εντός του 10% του ανώτατου ορίου τους ή το έχουν ήδη υπερβεί. Εξετάζετε αυτές τις αναφορές ως έγκαιρη προειδοποίηση για
  την εξάντληση των προϋπολογισμών· ελέγχετε τις σημειώσεις `_rebaseline_*` της προβληματικής πύλης. Η εργασία δεν
  δημιουργεί ούτε ενημερώνει πλέον μόνιμο ζήτημα· το #12149 διατηρεί το παλαιότερο ιστορικό αναφορών.

**Λειτουργία νέου κώδικα (Clean-as-You-Code) — από 2026-08-30, μόνο για τη γρήγορη διαδρομή PR**

Στα συμβάντα `pull_request`, το `quality.yml` μεταβιβάζει το `--base-ref <PR base SHA>` στα `check:file-size`,
`check:complexity-ratchets` και `check:dead-code`. Για τα `check:complexity-ratchets` και
`check:dead-code`, η πύλη συγκρίνει το HEAD με τη βάση συγχώνευσης **περιορισμένη στα αρχεία που
τροποποίησε το PR** (`scripts/check/newCodeMode.mjs`: η βάση συγχώνευσης υλοποιείται σε ένα προσωρινό
`git worktree`, τα ESLint/knip εκτελούνται εκεί και στο HEAD και υπολογίζονται οι διαφορές των μετρήσεων ανά αρχείο):

- **αποκλεισμός** — το PR πρόσθεσε παραβιάσεις κυκλωματικής/γνωστικής πολυπλοκότητας ή νεκρά exports στα αρχεία που άλλαξε
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` στο αρχείο καταγραφής)·
- **συμβουλευτικό** — το συνολικό καθολικό μέγεθος έναντι της παγιωμένης γραμμής βάσης. Η κληρονομημένη απόκλιση δεν προκαλεί ποτέ αποτυχία σε ένα
  αθώο PR· η απόκλιση παγιώνεται εκ νέου κατά τη συμφιλίωση έκδοσης και παρακολουθείται από την εργασία περιθωρίου.

Το `check:file-size` χρησιμοποιεί την αναφορά βάσης με τους δικούς του όρους (`scripts/check/check-file-size.mjs`, #8522):
ελέγχει κάθε αρχείο πηγαίου κώδικα και δοκιμών στο δέντρο, διαβάζει τον αριθμό γραμμών καθενός στη βάση του PR
με το `git show` και αποτυγχάνει για ένα αρχείο μόνο όταν αυτό μεγαλώσει πέρα από τη μεγαλύτερη τιμή μεταξύ του ανώτατου ορίου της γραμμής βάσης του
(`frozen` / `testFrozen`, ή `cap` / `testCap` για αρχείο εκτός της γραμμής βάσης) και του μεγέθους βάσης του.
Επομένως, ένα αρχείο που είχε ήδη αποκλίνει στη βάση δεν προκαλεί ποτέ αποτυχία σε ένα αθώο PR.

Το `check:boundary:ratchet` εφαρμόζει τον ίδιο κανόνα στον μοναδικό αριθμό του
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): στα συμβάντα PR, τόσο τα
fast-gates του `quality.yml` όσο και η εργασία lint του `ci.yml` μεταβιβάζουν το SHA βάσης του PR, το commit βάσης
μετριέται από μια εξαγωγή `git archive` και το PR αποτυγχάνει μόνο όταν το πλήθος ακμών
`open-sse → src` υπερβαίνει τη μεγαλύτερη τιμή μεταξύ του `metrics.boundaryOpenSseToSrc` και του πλήθους στη βάση. Η απόκλιση της βάσης
πάνω από το ανώτατο όριο αναφέρεται (`κληρονομημένη απόκλιση βάσης`), αλλά ποτέ δεν προκαλεί αποτυχία σε ένα αθώο PR· το push → main
διατηρεί το απόλυτο ανώτατο όριο, ενώ ένα SHA βάσης που δεν μπορεί να επιλυθεί επιστρέφει σε αυτό με μια προειδοποίηση.

Οι εκτελέσεις `workflow_dispatch`, η σάρωση release-green και η νυχτερινή εργασία περιθωρίου δεν έχουν βάση PR
και διατηρούν την απόλυτη (καθολική) σύγκριση. Η κάλυψη, η επανάληψη κώδικα και η κάλυψη τύπων παραμένουν καθολικές
προς το παρόν (τα εργαλεία τους δεν παράγουν οικονομικά μια διαφορά ανά αρχείο) — είναι υποψήφιες για την ίδια αντιμετώπιση.

**Κλείσιμο της φάσης στην v4.0 (LTS = αυστηρότερο από πριν, όχι «επιστροφή στο κανονικό»)**

1. Στο καθαρό tip του `release/v4.0.0`: `npm run quality:headroom --json` για καταγραφή και, στη συνέχεια,
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, το
   `--update` κάθε πύλης typecheck — κάθε γραμμή βάσης μειώνεται στη μετρημένη τιμή.
2. Διαγράψτε το `_policy` από το `quality-baseline.json` (επανενεργοποιεί το `--require-tighten` και τη νυχτερινή
   αποθήκευση περιθωρίου), επαναφέρετε το `THRESHOLD = 36` (ή υψηλότερο) στο `check-openapi-coverage.mjs`.
3. Αυστηροποιήστε τα όρια πέρα από τις μετρημένες τιμές όπου η αρθρωτή αναδιοργάνωση απέδωσε: επαναφέρετε το `cap` μεγέθους αρχείου στο 1000
   (ή 800), αυξήστε τα ελάχιστα όρια κάλυψης κατά 5, ορίστε τα νεκρά exports σε 0 για τα αρθρωτά πακέτα.

## Βασική γραμμή καστάνιας (`quality-baseline.json`)

Ο μηχανισμός καστάνιας (`scripts/quality/check-quality-ratchet.mjs`) διαβάζει το `quality-baseline.json`
και το συγκρίνει με το `quality-metrics.json` που μόλις συλλέχθηκε. Οποιαδήποτε μετρική υποχωρεί
πέρα από το έψιλόν της προκαλεί αποτυχία της μεταγλώττισης.

Τρέχουσες μετρικές που παρακολουθούνται:

| Μετρική               | Κατεύθυνση | Σημασία                                                  |
| --------------------- | ---------- | -------------------------------------------------------- |
| `eslintWarnings`      | `down`     | Ο αριθμός προειδοποιήσεων ESLint δεν πρέπει να αυξάνεται |
| `coverage.statements` | `up`       | Η κάλυψη εντολών δεν πρέπει να μειώνεται                 |
| `coverage.lines`      | `up`       | Η κάλυψη γραμμών δεν πρέπει να μειώνεται                 |
| `coverage.functions`  | `up`       | Η κάλυψη συναρτήσεων δεν πρέπει να μειώνεται             |
| `coverage.branches`   | `up`       | Η κάλυψη διακλαδώσεων δεν πρέπει να μειώνεται            |

Για να ενημερώσετε τη βασική γραμμή μετά από μια πραγματική βελτίωση:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Η σημαία `--update` γράφει τις τρέχουσες μετρημένες τιμές στο `quality-baseline.json`.
Κάντε commit αυτό το αρχείο μαζί με την αλλαγή που βελτίωσε τη μετρική. Ένα PR που βελτιώνει μια
μετρική χωρίς να ενημερώνει τη βασική γραμμή θα εντοπιστεί από το `--require-tighten` (Φάση 6A.5,
σε αναμονή υλοποίησης).

### Καστάνια CodeQL: συχνότητα ανανέωσης και χειροκίνητη ενεργοποίηση

Το `check:codeql-ratchet` διαβάζει **την κατάσταση του αποθετηρίου, η οποία ανανεώνεται βάσει χρονοδιαγράμματος — όχι ανά PR.**
Το `gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` αναφέρει
`state: configured`, `schedule: weekly`: πρόκειται για τη σάρωση προεπιλεγμένης διαμόρφωσης του GitHub και όχι για
ανάλυση ανά push. Συνέπεια: αφού συγχωνευτεί ένα PR που ΔΙΟΡΘΩΝΕΙ ειδοποιήσεις, η καστάνια συνεχίζει να διαβάζει
τον παλιό, υψηλότερο αριθμό μέχρι να εκτελεστεί η επόμενη προγραμματισμένη σάρωση — επομένως αναφέρει υποχώρηση
σε κάθε ανοιχτό PR, συμπεριλαμβανομένων των επακόλουθων PR του ίδιου του διορθωτικού PR, μέχρι να ενημερωθεί η σάρωση.

**Χειροκίνητη ανανέωση**: το `gh workflow run codeql.yml --ref release/vX.Y.Z` εκτελεί ξανά την
ανάλυση και αναδημοσιεύει τις ειδοποιήσεις μέσα σε λίγα λεπτά. Διαβάστε πρώτα το `.github/workflows/codeql.yml`
— η κεφαλίδα του εξηγεί ότι χρησιμοποιεί μόνο `workflow_dispatch` **επειδή συγκρούεται με
την «προεπιλεγμένη διαμόρφωση» του GitHub** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Η επαναφορά των εναυσμάτων `push`/`pull_request`/
`schedule` απαιτεί πρώτα μια **ενέργεια από τον κάτοχο**: Settings → Code security →
CodeQL: Default → Advanced. Μην προσθέσετε ένα έναυσμα `schedule:` χωρίς αυτήν την αλλαγή — θα
παράγει μόνο αποτυχημένες εκτελέσεις.

**Περιορίστε τη βασική γραμμή αφού μειωθεί ο αριθμός** — το `node scripts/check/check-codeql-ratchet.mjs
--update` γράφει τον νέο μετρημένο αριθμό στο `quality-baseline.json` →
`metrics.codeqlAlerts.value`, ώστε η καστάνια να μην επιτρέπει σιωπηρά μια υποχώρηση προς
το παλιό ανώτατο όριο. Παράδειγμα εφαρμογής (2026-09-02/03): το PR #12502 διόρθωσε 7 πραγματικές ειδοποιήσεις
(13 → 6 μετρημένες ανοιχτές ειδοποιήσεις)· το PR #12530 περιόρισε την παγιωμένη βασική γραμμή από 11 → 6 ώστε να αντιστοιχεί· οι
υπόλοιπες 6 απορρίφθηκαν έπειτα με αιτιολόγηση ανά ειδοποίηση, μειώνοντας τις ανοιχτές ειδοποιήσεις σε 0.

**Οι απορρίψεις αποτελούν απόφαση του χειριστή (Αυστηρός Κανόνας #14)** — μην απορρίπτετε ποτέ μια ειδοποίηση CodeQL
χωρίς να καταγράψετε την τεχνική αιτιολόγηση στο σχόλιο απόρριψης: `won't fix` για
απαίτηση πρωτοκόλλου εξωτερικής εξάρτησης, `used in tests` για ένα fixture δοκιμών, `false positive`
για έναν μηχανισμό εξυγίανσης που το CodeQL δεν μπορεί να εντοπίσει (προηγούμενο: `docs/security/ERROR_SANITIZATION.md`).

---

## Πολιτική επανάληψης δοκιμών (WS5.4, v3.8.49)

Η επανάληψη ορίζεται ανά runner, ποτέ ως καθολική γενική ρύθμιση — μια καθολική επανάληψη μετατρέπει πραγματικές παλινδρομήσεις
σε αόρατες αστάθειες:

| Runner           | Πολιτική                                                                                                                        | Γιατί                                                                                                                                           |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` μόνο στο CI, με `trace: on-first-retry`                                                                            | Ο χρονισμός του browser/δικτύου είναι πραγματικά μη ντετερμινιστικός· μία επανάληψη με trace μετατρέπει μια αστάθεια σε διαγνωστικό τεχνούργημα |
| Vitest           | ΚΑΜΙΑ καθολική επανάληψη. Μια αποδεδειγμένα ασταθής δοκιμή λαμβάνει ρητή επανάληψη ανά δοκιμή (ορατή στο diff, ελεγμένη στο PR) | Διατηρεί τη λίστα καραντίνας μέσα στο repo, ποτέ αδιαφανή                                                                                       |
| node:test (unit) | ΚΑΜΙΑ επανάληψη, ποτέ                                                                                                           | Μια ασταθής δοκιμή μονάδας αποτελεί σφάλμα στη δοκιμή — διορθώστε τη, μην την επανεκτελείτε ελπίζοντας σε διαφορετικό αποτέλεσμα                |

SLO-στόχοι μόλις ενεργοποιηθεί η τηλεμετρία ασταθειών (WS5.2/5.3): ποσοστό αστάθειας <1% ανά δοκιμή
(όριο «άμεσης διόρθωσης»), ποσοστό επιτυχίας ≥95% ανά pipeline. Τιμές αναφοράς του κλάδου —
επαναβαθμονομήστε τις βάσει των δικών μας μετρήσεων.

## Απόκλιση του ratchet σε επίπεδο release (WS5.5, v3.8.49)

Όταν ένα ratchet (μέγεθος αρχείου, πολυπλοκότητα, προειδοποιήσεις eslint) παρουσιάζει παλινδρόμηση στο ΚΑΘΑΡΟ tip του release
— δηλαδή ο ΣΥΝΔΥΑΣΜΟΣ των merges προκάλεσε την παλινδρόμηση και κανένα μεμονωμένο PR δεν την αναπαράγει
στο δικό του branch — η διόρθωση ανήκει στον **release captain, μία φορά, στο
release branch**: προτιμήστε εξαγωγή/refactor· επανακαθορίστε το baseline μόνο με την τεκμηριωμένη
καταχώριση αιτιολόγησης. Μην επιρρίπτετε ποτέ την απόκλιση του συνδυασμού σε PR κάποιου contributor και μην
επανακαθορίζετε ποτέ το baseline ανά PR (αυτό αποκρύπτει πραγματικές παλινδρομήσεις). Πρώτα κάντε τη διάκριση: αναπαραγάγετε
την αποτυχία στο καθαρό tip μέσα σε ένα probe worktree, προτού υποθέσετε ότι την προκάλεσε το PR σας.

## Αποθήκευση των μειώσεων του ratchet — η καθοδική κατεύθυνση (#8584)

Το ratchet είναι αυτοματοποιημένο μόνο κατά το ήμισυ, και μάλιστα στο λάθος μισό. Η **αύξηση** ενός ορίου είναι μια
χειροκίνητη επεξεργασία JSON που διαρκεί δέκα δευτερόλεπτα και αποτελεί τον ταχύτερο τρόπο για να ξεμπλοκάρει ένα αποτυχημένο PR.
Η **μείωση** ενός ορίου απαιτεί από κάποιον να εκτελέσει το `--update` και να κάνει commit το αποτέλεσμα — και μέχρι
να προστεθεί το job `bank-ratchet-shrinks`, κανένα workflow δεν το εκτελούσε. Η μετρημένη συνέπεια
(2026-07-25): 18 παγωμένα αρχεία βρίσκονται ήδη στο όριο των 800 γραμμών για νέα αρχεία ή κάτω από αυτό, με τη χειρότερη
περίπτωση στο 132× (`src/shared/validation/schemas.ts`, 19 γραμμές με όριο 2,523)· το
ανώτατο όριο πολυπλοκότητας μετακινήθηκε από `1794 → 2169` μέσα από ~37 σημειώσεις επανακαθορισμού baseline, με ακριβώς μία
μείωση (−1)· και η φράση «σύσφιξη μέσω `--update` στον επόμενο κύκλο» γράφτηκε 31 φορές και
τηρήθηκε μία φορά. Ένα όριο που επιβιώνει περισσότερο από τον κώδικα που το δικαιολόγησε μετατρέπει σιωπηρά κάθε ολοκληρωμένη
αποσύνθεση σε περιθώριο ανάπτυξης για όποιον επεξεργαστεί το αρχείο στη συνέχεια.

Το `nightly-release-green.yml` → job **`bank-ratchet-shrinks`** κλείνει αυτόν τον κύκλο:

|               |                                                                                                                     |
| ------------- | ------------------------------------------------------------------------------------------------------------------- |
| Εκτελείται σε | `schedule` (3×/ημέρα) + `workflow_dispatch` — σκόπιμα **όχι** σε `push`                                             |
| Μετρά         | το υψηλότερο `release/vX.Y.Z`, με την ίδια επίλυση + προστασία από injection όπως το `release-green`                |
| Γράφει        | `check:file-size --update` και `check:complexity-ratchets --update` (και τα δύο μόνο προς μείωση εκ κατασκευής)     |
| Επαληθεύει    | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                            |
| Παραδίδει     | ένα μοναδικό, πάντα ενημερωμένο PR προς το release branch — ενημερώνεται αναγκαστικά, χωρίς ποτέ να δημιουργεί spam |

Η αποθήκευση γίνεται σε παρτίδες αντί ανά push, επειδή δεν έχει απαίτηση χαμηλού latency (μια μείωση που
αποθηκεύεται εντός 8 ωρών είναι αποδεκτή), ενώ μια εκτέλεση ανά merge θα ανακατασκεύαζε επανειλημμένα το PR branch
κατά τη διάρκεια εκστρατειών συγχωνεύσεων και θα επιβάρυνε κάθε φορά το κόστος μιας πλήρους σάρωσης ESLint. Η ανίχνευση παραμένει στο
push (`release-green`)· μόνο η αποθήκευση γίνεται σε παρτίδες.

### Ο επαληθευτής ασφάλειας

Το job γράφει στα baselines χωρίς επίβλεψη, επομένως το `verify-ratchet-bank.mjs` είναι αυτό που καθιστά
αποδεκτή αυτή τη διαδικασία. Συγκρίνει μέσω diff το δέντρο μετά το `--update` με το `HEAD` και **διακόπτει το job
προτού υπάρξει οποιοδήποτε commit** — χωρίς να ανοίξει PR — εκτός εάν κάθε αλλαγή είναι μία από τις εξής:

- μια αριθμητική καταχώριση `frozen` / `testFrozen` που **μειώθηκε** ή **αφαιρέθηκε**
- `complexity-baseline.json` → `count` που **μειώθηκε**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` που **μειώθηκε**

Οτιδήποτε άλλο αποτυγχάνει: αύξηση ενός αριθμού, προσθήκη καταχώρισης, αλλαγή των `cap`/`testCap` ή
διαγραφή/επανεγγραφή μιας σημείωσης `_rebaseline_*` (αυτές οι σημειώσεις αποτελούν το ίχνος ελέγχου που εξηγεί γιατί υπάρχει κάθε
ανώτατο όριο και αποθηκεύονται μέσα στο ίδιο αντικείμενο `frozen` με τις καταχωρίσεις αρχείων).
Ένα bot που θα μπορούσε να αυξήσει ένα όριο θα ήταν σαφώς χειρότερο από την υφιστάμενη κατάσταση. Προστασία από
παλινδρόμηση: `tests/unit/verify-ratchet-bank.test.ts`.

Το job δεν κάνει ποτέ push στο `release/*` — ένας άνθρωπος συγχωνεύει το PR, ώστε μια λανθασμένη μέτρηση
να μην μπορεί να ενσωματωθεί χωρίς έλεγχο.

## Πολιτική λίστας επιτρεπόμενων

Κάθε έλεγχος που δεν μπορεί να αποτύχει λόγω προϋπαρχουσών παραβάσεων χρησιμοποιεί μια παγιωμένη λίστα επιτρεπόμενων
(π.χ. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Η πολιτική είναι:

**Διορθώστε τη βασική αιτία· χρησιμοποιήστε τη λίστα επιτρεπόμενων μόνο όταν η παράβαση προϋπάρχει και
δεν μπορεί να διορθωθεί στο ίδιο PR.**

Όταν προσθέτετε μια καταχώριση σε λίστα επιτρεπόμενων:

1. Συμπεριλάβετε ένα σχόλιο με την αιτιολόγηση.
2. Αναφέρετε το σχετικό issue παρακολούθησης (π.χ. `// #3498 — Δυνατότητα Φάσης 2, δεν έχει υλοποιηθεί ακόμη`).
3. Αφαιρέστε την καταχώριση στο ίδιο PR που διορθώνει την παράβαση — μια παρωχημένη καταχώριση που δεν
   καταστέλλει πλέον μια ενεργή παράβαση αποτελεί και η ίδια ελάττωμα (ο έλεγχος παρωχημένης επιβολής 6A.3 θα
   προκαλεί αποτυχία του ελέγχου για ορφανή καταχώριση λίστας επιτρεπόμενων μόλις υλοποιηθεί).

**Μην** προσθέτετε καταχωρίσεις στη λίστα επιτρεπόμενων για να περνούν οι δοκιμές γρηγορότερα. Ένας επιτυχής έλεγχος με μια διαρκώς αυξανόμενη
λίστα επιτρεπόμενων δημιουργεί μια ψευδή αίσθηση ποιότητας.

### Όταν ένας έλεγχος αποτυγχάνει στο PR σας

1. **Διαβάστε προσεκτικά την έξοδο του ελέγχου** — σας υποδεικνύει ακριβώς ποιο αρχείο ή σύμβολο παραβίασε
   τον κανόνα.
2. **Διορθώστε την παράβαση** — οι περισσότεροι έλεγχοι είναι ντετερμινιστικοί έλεγχοι του συστήματος αρχείων που περνούν μόλις
   ο κώδικας γίνει σωστός.
3. **Αν η παράβαση προϋπάρχει** (δηλαδή δεν την εισαγάγατε εσείς, αλλά πλέον καλύπτεται
   από τον έλεγχο): προσθέστε μια καταχώριση στη λίστα επιτρεπόμενων με σχόλιο αιτιολόγησης και ένα issue παρακολούθησης.
4. **Αν ο έλεγχος είναι τύπου ratchet** (κάλυψη, προειδοποιήσεις ESLint, διπλότυπος κώδικας, πολυπλοκότητα):
   η αλλαγή σας επιδείνωσε τη μετρική. Διορθώστε το υποκείμενο ζήτημα ή (σπάνια) εκτελέστε
   `npm run quality:ratchet -- --update` αν η αλλαγή είναι σκόπιμη και η υποβάθμιση της μετρικής
   είναι αποδεκτή — αλλά τεκμηριώστε τον λόγο στην περιγραφή του PR.
5. **Συμβουλευτικοί έλεγχοι** (`continue-on-error: true`) παρέχουν πληροφορίες — δεν εμποδίζουν
   τη συγχώνευση, αλλά εμφανίζονται στη σύνοψη του CI. Διορθώστε τους ούτως ή άλλως.

---

## Προσθήκη νέου ελέγχου

1. Δημιουργήστε το `scripts/check/check-<name>.mjs` (ή `.ts`). Οι έλεγχοι πολιτικής τερματίζονται με 0/1.
   Οι έλεγχοι τύπου ratchet εκπέμπουν μια μετρική στο `quality-metrics.json` μέσω του `collect-metrics.mjs`.
2. Προσθέστε το `"check:<name>": "node scripts/check/check-<name>.mjs"` στο `package.json`.
3. Συνδέστε το στο `.github/workflows/ci.yml` κάτω από την κατάλληλη εργασία
   (πολιτική → `lint` ή `docs-sync-strict`· ratchet → `quality-gate`).
4. Αν διαθέτει λίστα επιτρεπόμενων, εφαρμόστε το `reportStaleEntries()` από το
   `scripts/check/lib/allowlist.mjs`, ώστε οι παρωχημένες καταχωρίσεις να εντοπίζονται αυτόματα.
5. Γράψτε μια δοκιμή στο `tests/unit/build/` που να καλύπτει τη λογική εντοπισμού του ελέγχου.
6. Ενημερώστε αυτό το έγγραφο (προσθέστε μια γραμμή στον σχετικό πίνακα εργασιών).

---

## Εργαλεία agent: LSP-in-the-loop (προαιρετικό)

Πέρα από τους ελέγχους CI, το OmniRoute παρέχει μια **προαιρετική** υποδομή `agent-lsp`
(ένα `.mcp.json` σε επίπεδο έργου, Φάση 7 Εργασία 15). Δημιουργήστε το `.mcp.json`
για να εκθέσετε έναν διακομιστή γλώσσας TypeScript σε agents προγραμματισμού, ώστε να επιλύουν σύμβολα /
διαγνωστικά **πριν** γράψουν κώδικα — ένα συμπλήρωμα του `typecheck:core` που εφαρμόζει μεταγλώττιση πριν από κάθε ισχυρισμό
και περιορίζει τα σφάλματα «επινοημένων συμβόλων» στην πηγή τους. Σκόπιμα δεν φορτώνεται
αυτόματα (εσείς επιλέγετε και επαληθεύετε τη γέφυρα MCP↔LSP)· μια εσφαλμένη καταχώριση απλώς καταγράφει ένα
σφάλμα σύνδεσης και δεν διακόπτει ποτέ τις συνεδρίες.

---

## Εκκρεμότητες εξορθολογισμού (αξιολόγηση ROI — Φάση 9 Κύμα 3)

Αυτή η απογραφή αντιπαραβλήθηκε με το `ci.yml` στις 2026-06-17 (η προηγούμενη έκδοση παρέλειπε τα
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Μια αξιολόγηση ROI του αντιπαραβλημένου συνόλου
εντόπισε τους ακόλουθους υποψηφίους για εξορθολογισμό. **Οι συγχωνεύσεις είναι μηχανικές αλλαγές
CI· οι αλλαγές κατάστασης/καταργήσεις είναι αποφάσεις πολιτικής που προορίζονται για τον διαχειριστή.** Τίποτα από τα παρακάτω
δεν έχει εφαρμοστεί ακόμη.

**Επίσης δεν τεκμηριώθηκαν παραπάνω** (συμβουλευτικά, χαμηλό σήμα): η εργασία `docs-lint`
(markdownlint + Vale, ολόκληρη η εργασία με `continue-on-error`) και οι αυτόνομες ροές εργασίας σάρωσης
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. Το `semgrepFindings: 0` βρίσκεται στο
`quality-baseline.json`, αλλά δεν είναι συνδεδεμένο με ανασταλτικό μηχανισμό καστάνιας στο `ci.yml` — η μετρική είναι
προς το παρόν ορφανή.

### Συγχώνευση / αποδιπλοποίηση (μηχανική, χαμηλότερου κινδύνου)

Κάθε υποψήφιο στοιχείο επικυρώθηκε έναντι της ενεργής κατάστασης των πυλών στις 2026-06-17 (εμπιστοσύνη με επαλήθευση)·
αρκετές «προφανείς» συγχωνεύσεις αποδείχθηκε ότι έκρυβαν τεχνικό χρέος και **δεν** αποτελούν καθαρές άμεσες αντικαταστάσεις.

- **Το `check:docs-sync` εκτελείται δύο φορές** — αυτόνομα στην εργασία `lint` και ξανά μέσα στο `check:docs-all` (`docs-sync-strict`) και στο hook pre-commit του husky. ✅ **ΟΛΟΚΛΗΡΩΘΗΚΕ** — η αυτόνομη κλήση στο `lint` αφαιρέθηκε.
- **Σάρωση CVE** — ❌ **ΔΕΝ αποτελεί καθαρή συγχώνευση.** Το `audit:deps` αποτυγχάνει υποχρεωτικά για οποιοδήποτε CVE υψηλής/κρίσιμης σοβαρότητας· το `check:vuln-ratchet` (osv) αποτυγχάνει μόνο σε περίπτωση _επιδείνωσης_ έναντι της γραμμής βάσης (επί του παρόντος 1 MODERATE). Διαφορετική σημασιολογία — η κατάργηση του `audit:deps` θα αφαιρούσε την απόλυτη πύλη υψηλής/κρίσιμης σοβαρότητας. Διατηρήστε και τα δύο.
- **Εντοπισμός κύκλων** — ✅ **ΟΛΟΚΛΗΡΩΘΗΚΕ** (#15159 G-01/G-02). Το παλιό κείμενο εδώ χαρακτήριζε το `check:cycles` ως «την πράσινη, επιμελημένη» πύλη και δικαιολογούσε τη διατήρησή της ως ανασταλτικής, επειδή το `check:circular-deps` (dpdm) ανέφερε 91 κύκλους. Αυτή η πράσινη ένδειξη ήταν **ψευδώς θετική**: το `check:cycles` σάρωνε 5 υποκαταλόγους (450 αρχεία), αντιστοίχιζε μόνο στατικό `import|export … from` και απέρριπτε κάθε προσδιοριστή `@/` και `@omniroute/open-sse/`, συνεπώς δεν μπορούσε να εντοπίσει τους κύκλους δυναμικών εισαγωγών και ψευδωνύμων που κυριαρχούσαν στο αποθετήριο. Διορθώθηκε: η πύλη πλέον διατρέχει τα `src` + `open-sse` (5023 αρχεία), συλλέγει προσδιοριστές από το AST της TypeScript (ώστε το `import("…")` να προσμετράται, ενώ το `typeof import("…")` σε θέση τύπου να μην προσμετράται) και επιλύει τα `paths` του tsconfig. Εντοπίζει **14** κύκλους, όχι 0. Επειδή 14 προϋπάρχοντες κύκλοι δεν μπορούν να διορθωθούν σε ένα PR πύλης, το `check:cycles` είναι πλέον ένας **μηχανισμός καστάνιας** (`--ratchet`, ανώτατο όριο `metrics.cycles.value = 14` στο `quality-baseline.json`, `direction: down`) — αποκλείει κάθε _επιδείνωση_ και το πλήθος μπορεί μόνο να μειώνεται. Το CI εκτελεί `npm run check:cycles:ratchet`. Η σταδιακή εξάλειψη προχωρά μαζί με το **A-01**. Το `check:circular-deps` (dpdm) παραμένει συμβουλευτικό ως ευρύτερη δεύτερη γνώμη.
- **Πολυπλοκότητα** — ✅ **ΟΛΟΚΛΗΡΩΘΗΚΕ** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): μία διέλευση ESLint, καταμέτρηση ανά ruleId, ώστε οι γραμμές βάσης κυκλωματικής πολυπλοκότητας+μέγιστων γραμμών και γνωστικής πολυπλοκότητας να παραμένουν ανεξάρτητες· τα επιμέρους `check:complexity` / `check:cognitive-complexity` παραμένουν για τοπική χρήση με `--update`.
- **Αποτροπή παραισθήσεων για το `/api`** — ✅ **ΟΛΟΚΛΗΡΩΘΗΚΕ** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): μία απογραφή FS του `src/app/api`, ενώ τα openapi-routes + docs-symbols εξακολουθούν να αναφέρουν αποτελέσματα ανεξάρτητα· τα επιμέρους εργαλεία παραμένουν για τοπικές εκτελέσεις.
- **Το `check:node-runtime` εκτελείται σε 11 εργασίες** — ⚠️ **χαμηλό ROI.** Καθεμία χρησιμοποιεί ξεχωριστό runner και ο έλεγχος διαρκεί <1s· συνολική εξοικονόμηση ~10s, με τίμημα την απώλεια μιας οικονομικής δικλίδας ασφαλείας ανά εργασία. Δεν αξίζει την αναστάτωση.
- **Το `typecheck:noimplicit:core` στο lint του CI** — ✅ **αφαιρέθηκε από την εργασία lint** (ήταν συμβουλευτικό με `continue-on-error`)· η ανασταλτική επιφάνεια τύπων είναι `typecheck:core` + `check:type-coverage`. Το τοπικό script διατηρήθηκε.

### Αλλαγή κατάστασης / απόφαση (πολιτική διαχειριστή)

- `check:openapi-security-tiers` (συμβουλευτικό) — ❌ **ΔΕΝ μπορεί να μετατραπεί καθαρά.** Τερματίζει με 0, αλλά προειδοποιεί ότι αρκετές διαδρομές `traffic-inspector` κάτω από το `LOCAL_ONLY_API_PREFIXES` δεν διαθέτουν τη σημείωση `x-loopback-only: true`. Η επιβολή του απαιτεί πρώτα την προσθήκη αυτών των σημειώσεων στο `openapi.yaml`.
- `typecheck:noimplicit:core` (συμβουλευτικό) — καλύπτεται σε μεγάλο βαθμό από τον ανασταλτικό μηχανισμό καστάνιας `check:type-coverage`. Μετατρέψτε το σε μηχανισμό καστάνιας ή καταργήστε το πλεονάζον δεύτερο πέρασμα `tsc`.
- `test:vitest:ui` (πλέον **ανασταλτικό**) — οι προϋπάρχουσες αποτυχίες εξαιρούνται ρητά στο `vitest.config.ts` με σχόλια παρακολούθησης `// #8618`· νέες αποτυχίες προκαλούν αποτυχία της εργασίας.
- `check:secrets` (gitleaks, ανασταλτικός μηχανισμός καστάνιας παγωμένος σε 3 τεκμηριωμένα ψευδώς θετικά) — προσθέστε τα 3 στη λίστα επιτρεπόμενων ώστε να φτάσουν στο 0 ή υποβαθμίστε τον έλεγχο σε συμβουλευτικό. Επικαλύπτεται με την εγγενή σάρωση μυστικών του GitHub + `check:public-creds`.
- `check:pr-evidence` (ανασταλτικό, εκτελεί grep στο πεζό κείμενο του σώματος του PR) — υψηλός κίνδυνος ψευδώς θετικών· η κατάργησή του αποδυναμώνει την επιβολή του Αυστηρού Κανόνα #18, επομένως πρόκειται για ουσιαστική απόφαση πολιτικής.
- `semgrep` (αυτόνομο συμβουλευτικό) — επικαλύπτεται με το CodeQL για τις οικογένειες OWASP· συνδέστε τη γραμμή βάσης του με έναν μηχανισμό καστάνιας ή καταργήστε το.

---

## Σχετική τεκμηρίωση

- Εφοδιαστική αλυσίδα (προέλευση, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — πύλη ισοτιμίας συνόλου κλειδιών

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, εργασία `i18n-ui-coverage`).
Συγκρίνει το σύνολο των τερματικών κλειδιών κάθε `src/i18n/messages/<locale>.json` με το `en.json` και αποτυγχάνει
για κάθε απόν ή επιπλέον τερματικό κλειδί, ανεξάρτητα από το πότε προστέθηκε το κλειδί. Τα σύμβολα κράτησης θέσης
`__MISSING__:` υπολογίζονται ως παρόντα (το περιεχόμενό τους αφορά την πύλη αναλογίας). Είναι το απόλυτο συμπλήρωμα
των δύο πυλών που βασίζονται σε diff/ποσοστό: το `check-ui-keys-coverage` επιβάλλει κατώτατο όριο 80 % ανά
locale (43 απόντα κλειδιά σε σύνολο ~13.000 εξακολουθούν να δίνουν 99,7 %) και το `check-new-key-coverage` αξιολογεί
μόνο τα κλειδιά που ένα PR προσθέτει στο `en.json`. Μια παρτίδα locale δημιουργείται από το `en.json` της ημέρας
κατά την οποία δημιουργείται ο κλάδος της και μεταφράζεται επί ημέρες, ενώ η βάση συνεχίζει να προσθέτει κλειδιά· το PR
της παρτίδας δεν προσθέτει το ίδιο κανένα κλειδί, οπότε και οι δύο συγγενικές πύλες παρέμειναν σιωπηλές όταν η παρτίδα 1
(#13044) ενσωματώθηκε με έλλειψη 43 κλειδιών σε εννέα locale και η παρτίδα 2 (#13660) με έλλειψη 10 κλειδιών σε οκτώ
(2026-09-15). Διορθώστε μια αποτυχία με
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`· ένα επιπλέον (`extra`) τερματικό κλειδί
σημαίνει ότι η πηγή το αφαίρεσε — διαγράψτε το από το locale. Το `--warn` αναφέρει το πρόβλημα χωρίς να προκαλεί αποτυχία.
Το `--catalog=cli` εκτελεί την ίδια σύγκριση στο `bin/cli/locales` (`npm run i18n:check-keys:cli`)·
και τα δύο βήματα βρίσκονται στην εργασία `i18n-ui-coverage`.

#### `check-new-key-coverage` — πύλη i18n νέων κλειδιών

Συγγενική πύλη του `check-ui-value-drift`. Εκείνη εντοπίζει μια αγγλική τιμή που **ξαναγράφηκε**
ενώ οι μεταφράσεις της έμειναν πίσω· αυτή εντοπίζει ένα αγγλικό κλειδί που **προστέθηκε**
ενώ ορισμένα locale δεν το έλαβαν ποτέ.

Το `check-ui-keys-coverage` δεν μπορεί να εντοπίσει αυτήν την κατηγορία: επιβάλλει ένα ποσοστιαίο κατώτατο όριο ανά locale και
έντεκα απόντα κλειδιά σε σύνολο ~13.000 αφήνουν την κάλυψη στο 99,9%. Ένα ποσοστό ανά γλώσσα δεν μπορεί
να εκφράσει ότι «αυτή η λειτουργία κυκλοφόρησε αμετάφραστη» — μια ολόκληρη λειτουργία μπορεί να προστεθεί σε ένα νέο locale χωρίς
καθόλου κείμενο και ο αριθμός να μη μετακινηθεί ποτέ.

Το περιστατικό που κωδικοποιεί: η Φάση 3 του Orchestration Canvas μετέφρασε τα έντεκα κλειδιά της στα
42 locale που υπήρχαν τότε. Ώρες αργότερα, η παρτίδα γλωσσών της ΕΕ (#13044) αύξησε τα locale του αποθετηρίου
σε 51 και τα εννέα νέα (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) δεν
τα έλαβαν ποτέ. Το `deepMergeFallback` αντικαθιστά ένα απόν κλειδί με τα αγγλικά, επομένως η μορφή της αστοχίας ήταν
ένα αμετάφραστο περιβάλλον εργασίας χρήστη αντί για ένα κενό περιβάλλον εργασίας χρήστη — πραγματική και εκ σχεδιασμού σιωπηλή.

Όπως και η συγγενική της πύλη, λαμβάνει υπόψη το **diff**, συγκρίνοντας τα αγγλικά στη βάση συγχώνευσης με το λειτουργικό
δέντρο, ώστε τα προϋπάρχοντα κενά να παραμένουν παγωμένα και να μην απαιτείται μετάπτωση για την ενεργοποίηση της πύλης.

**Ένας δείκτης `__MISSING__:<english>` δεν την ικανοποιεί (από 2026-09-17).** Προηγουμένως αποτελούσε την
τεκμηριωμένη αναβολή — κατά την εκτέλεση χρησιμοποιούνται εφεδρικά τα σωστά αγγλικά — έως ότου οκτώ PR λειτουργιών στις
2026-09-16 πρόσθεσαν 61 κλειδιά και έβαλαν τον δείκτη και στα 65 locale αντί να τα μεταφράσουν: αυτή
η πύλη τα αποδέχθηκε όλα, τίποτα δεν εμπόδισε τα PR και η πύλη αναλογίας πραγματικών μεταφράσεων που προκαλεί αποκλεισμό
απέτυχε κατόπιν στην κορυφή της έκδοσης για όλους (pt-BR 3,2 % > 2,5 % + 0,5). Ένας δείκτης πλέον αξιολογείται
ως απούσα μετάφραση. Διορθώστε μια αποτυχία με
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` ή
όλα τα locale παράλληλα με `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
ασφαλές σε αποσυνδεδεμένη εκτέλεση, αρνείται να ξεκινήσει χωρίς τις μεταβλητές περιβάλλοντος `OMNIROUTE_TRANSLATION_*`). Ένα κλειδί που πρέπει να παραμείνει
στα αγγλικά (ένα δεσμευμένο όνομα προϊόντος/μηχανής/σημαίας) ανήκει στο `scripts/i18n/untranslatable-keys.json`,
ποτέ πίσω από έναν δείκτη. Το `vi` απαγορεύει πλήρως τους δείκτες (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — πύλη σταθμευμένων δοκιμών

Ένα αρχείο στη λίστα `exclude` του `vitest.config.ts` είναι μια δοκιμή που δεν εκτελείται, αλλά μοιάζει
με κάλυψη σε όποιον διαβάζει το δέντρο. Εξήντα δύο αρχεία συσσωρεύτηκαν πίσω από το σχόλιο
`// #8618 — pre-existing failure; remove this exclusion when fixed`. Το ζήτημα #8618 έκλεισε στις
2026-08-11, ενώ η λίστα που παρακολουθούσε αυξήθηκε από 45 καταχωρίσεις σε 62, με καθεμία από τις νέες να κληρονομεί ένα σχόλιο
που παρέπεμπε σε ένα ανενεργό ζήτημα. Όταν η λίστα τελικά μετρήθηκε αρχείο προς αρχείο (#13204), **51 από τα 62
περνούσαν στο τρέχον δέντρο χωρίς καμία αλλαγή στον πηγαίο κώδικα**.

Η πύλη απαιτεί κάθε εξαίρεση που αντιστοιχεί σε πραγματικό αρχείο (α) να κατονομάζει ένα ζήτημα παρακολούθησης και
(β) να εμφανίζεται στο `config/quality/vitest-exclusions.json` με τη μετρημένη κατάστασή της, ώστε η προσθήκη μιας εξαίρεσης να αποτελεί
ένα diff που μπορεί να αναθεωρηθεί σε ειδικό αρχείο, αντί για μία ακόμη γραμμή σε έναν πίνακα 60 καταχωρίσεων. Σκόπιμα
δεν επανεκτελεί τις εξαιρούμενες δοκιμές — αυτό κοστίζει ~10 λεπτά και ανήκει σε μια περιοδική εργασία· η
καταγραφή αποθηκεύει το πότε μετρήθηκε τελευταία φορά καθεμία.
