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

## Προφίλ απογραφής και εκτέλεσης πύλης

### Είσοδος υποψηφίου

Οι ροές εργασίας CI και Quality Gates εκπέμπουν η καθεμία μια σταθερή ετυμηγορία: `Gate / CI` και `Gate / Quality`. Η τροποποιημένη πολιτική εισδοχής τους απαριθμεί κάθε εργασία ανάντη ως απαιτούμενη ή συμβουλευτική. Μια απαιτούμενη εργασία που ισχύει πρέπει να είναι επιτυχής: λείπει, ακυρώθηκε, παραλείφθηκε, εκκρεμεί και άγνωστα αποτελέσματα δεν μπορούν να δημιουργήσουν PASS. Μια έγκυρη ταξινόμηση μόνο για έγγραφα ή μόνο για κατάλογο μπορεί να καταστήσει μη εφαρμόσιμη μια λωρίδα κωδικών. ένα σχέδιο PR δεν είναι αποδεκτός υποψήφιος. Μια ετικέτα `hotfix` δεν παραιτείται από στοιχεία.

Και οι δύο ροές εργασίας καλύπτουν PRs σε κλάδους main/release, ωθήσεις σε `main`, μη αυτόματη αποστολή και συγχώνευση συμβάντων. Push, αποστολή και συγχώνευση-ομαδοποίηση εκτελέστε την πλήρη επιλογή. Οι ωθήσεις στο `release/**` δεν τις ξεκινούν (2026-10-18): κάθε αλλαγή εκτελούσε ήδη τον πίνακα στο PR του και ο συγχωνευμένος συνδυασμός είναι δουλειά του Release-Green (`docs/ops/RUNNER_BOX.md` → Hosted lane). Τα forks και οι ομάδες συγχώνευσης χρησιμοποιούν φιλοξενούμενους δρομείς για εργασίες που διαφορετικά επιλέγουν αυτο-φιλοξενούμενους δρομείς. Πρέπει να επαληθευτεί επαρκής χωρητικότητα φιλοξενίας πριν από την κυκλοφορία.

Ένα συνηθισμένο PR εκτελεί τη γρήγορη επιλογή. Οι λωρίδες `full-code` και `full-code-e2e` της πολιτικής εισδοχής (E2E, ενσωμάτωση, τεχνούργημα πακέτου, Electron smoke, Bun SQLite, πελάτες οικοσυστήματος και πρωτοκόλλου) εκτελούνται μόνο σε πρόχειρο ουράς Mergify ή σε πλήρη εκτέλεση: `gh workflow run ci.yml --ref <branch>`.

### Ουρά συγχώνευσης

Η ετικέτα `queue` στέλνει ένα PR στην ουρά Mergify (`.mergify.yml`). Το Mergify ανοίγει ένα πρόχειρο PR σε έναν κλάδο `mergify/merge-queue/`, CI εκτελεί την πλήρη επιλογή εκεί και το αρχικό PR συγχωνεύεται όταν περάσουν `Gate / CI`, `Gate / Quality` και `Merge integrity (changelog + generated skills)`.

Το Mergify γράφει τη σύνοψη της ουράς του στην περιγραφή του προχείρου και άλλες εφαρμογές μπορούν επίσης να το επεξεργαστούν. Ένα συμβάν `pull_request` `edited` σε ένα τέτοιο προσχέδιο παίρνει τη δική του ομάδα συγχρονισμού (`-queue-edit-<run_id>`), επομένως δεν μπορεί να ακυρώσει την πραγματική εκτέλεση του σχεδίου και παρακάμπτει την πύλη και τη μήτρα. Μόνο `Merge integrity` τρέχει ακόμα. Η εργασία παράλειψης πύλης φέρει διαφορετικό όνομα ελέγχου, επειδή το Mergify διαβάζει ένα παραλειφθέν `Gate / CI` ως αποτυχημένο έλεγχο και αφαιρεί το PR.

Μετά από dequeue, μια ώθηση δεν επαναφέρει πάντα το PR. Σχολιάστε `@mergifyio queue`.

Κάθε απόδειξη JSON προσδιορίζει το SHA που ολοκληρώθηκε, τη ροή εργασίας και την προσπάθεια. Το CLI απορρίπτει μια αναντιστοιχία checkout/event SHA. Οι δοκιμές ροής εργασιών συνδέουν τη συνδρομή πολιτικής στη λίστα `needs` της εργασίας ετυμηγορίας, έτσι ώστε μια νέα ή καταργημένη λωρίδα να μην μπορεί να εξαφανιστεί σιωπηλά. Οι αποδείξεις καλύπτουν τη δική τους ροή εργασίας, όχι τη δημοσίευση, την ανάπτυξη ή τα εσωτερικά στοιχεία ενός υπάρχοντος συμβουλευτικού σαρωτή. Η ενεργοποίηση και των δύο ονομάτων ελέγχου στους κανόνες του κλάδου είναι μια ξεχωριστή διοικητική αλλαγή. Η προσθήκη αυτών των εργασιών δεν προστατεύει από μόνη της έναν κλάδο.

### Απόθεμα στατικής σάρωσης

Το εκδομένο απόθεμα npm-alias και η συνδρομή στατικής σάρωσης ζωντανά στο `config/quality/gate-manifest.json`. Εκτελέστε `npm run check:gate-manifest` για να επικυρώσετε ονόματα σεναρίων και ακριβείς εντολές έναντι `package.json`. οι προσθήκες, οι αφαιρέσεις και η μετατόπιση εντολών αποτυγχάνουν τόσο στο τοπικό άγκιστρο όσο και στις εργασίες αλλαγής-ταξινόμησης στο CI. Ένα ψευδώνυμο δεν είναι εργασία ροής εργασίας, παράδειγμα μήτρας ή δοκιμαστική περίπτωση: αυτές οι μετρήσεις δεν πρέπει να παρουσιάζονται ως εναλλάξιμες.

Χρησιμοποιήστε `npm run quality:scan -- --list` ή `npm run quality:scan:fast -- --list` για να επιθεωρήσετε τα επιλεγμένα ψευδώνυμα χωρίς να τα εκτελέσετε. Ο δρομέας καλεί το σημείο εισόδου npm, επομένως ο χρόνος εκτέλεσης του (συμπεριλαμβανομένου Bun όπου έχει ρυθμιστεί) διατηρείται. Το μανιφέστο καταγράφει ψευδώνυμα εκτός αυτών των προφίλ όπως καλούνται χωριστά και οι εντολές συντήρησης απαγορεύονται σε προφίλ σάρωσης μόνο για ανάγνωση.

Αυτά τα προφίλ καλύπτουν μόνο τη στατική σάρωση. Δεν πιστοποιούν τις δοκιμές προϊόντων, την κάλυψη, τη συσκευασία, τους εξωτερικούς ελέγχους ή την πλήρη αποδοχή του υποψηφίου. Η εισαγωγή ροής εργασίας χρησιμοποιεί τα συνδεδεμένα `config/quality/admission-policy.json` και `scripts/quality/admission-verdict.mjs`. Τα προφίλ παρατηρητών απελευθέρωσης παραμένουν ξεχωριστά. επιθεωρούν ανεξάρτητα τις ισχύουσες επιταγές και αποδείξεις τους. Το απόθεμα πεζογραφίας παρακάτω αποτελεί αναφορά, όχι απόδειξη ότι όντως έτρεξε μια πύλη.

Τα σενάρια ζουν κάτω από `scripts/check/` (πύλες πολιτικής) και `scripts/quality/` (καστάνια). Η CI πηγή της αλήθειας είναι `.github/workflows/ci.yml`.

### Απελευθερώστε PR fast-path (`quality.yml`)

`.github/workflows/quality.yml` συμπληρώνει CI στο main/release PRs, ωθεί σε `main`, αποστέλλει και συγχωνεύει ομάδες. PRs χρησιμοποιεί γρήγορους ελέγχους με φιλτράρισμα διαδρομής. Η μόνιμα απενεργοποιημένη διπλότυπη έκδοση καταργήθηκε. οι πραγματικοί έλεγχοι build/package/boot παραμένουν σε CI. Η σουίτα μονάδας και το vitest τρέχουν μόνο σε CI (`Unit Tests (N/8)` και `Vitest`).

| Δουλειά                                          | Εκταση                                                                                                                                               | Μπλοκάρισμα                            |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs και docs-all                                                                                                            | Ναί                                    |
| `Fast Quality Gates`                             | Κωδικός PRs; στατικοί έλεγχοι, έλεγχος πληκτρολογίου, έλεγχος τύπου ταμπλό, δοκιμές επηρεασμένης μονάδας, δοκιμές ξεχασμένων αδελφών (συμβουλευτική) |
| `No new ESLint warnings`                         | Κωδικός PRs; προστατευτικό χνούδι με επίγνωση καταστολής                                                                                             | Ναι, συμπεριλαμβανομένων των πιρουνιών |
| `Merge integrity (changelog + generated skills)` | Μη πρόχειρο PRs; Changelog και συγχρονισμός δεξιοτήτων που δημιουργείται                                                                             | Ναι, συμπεριλαμβανομένων των πιρουνιών |

#### Αναφορά δοκιμών ξεχασμένων αδελφών

`npm run check:forgotten-sibling-tests` εκτελείται ως συμβουλευτικό βήμα του `Fast Quality Gates` και επαναχρησιμοποιεί τον επιλύτη εισαγωγής πίσω από τον χάρτη δοκιμής-επίδρασης. Για κάθε αλλαγμένη μονάδα παραγωγής, αναφέρει ντετερμινιστικές αλυσίδες `changed module/symbol -> static consumer -> candidate sibling test` όταν η υποψήφια δοκιμή απουσιάζει από τη διαφορά αιτήματος έλξης. Η σύνοψη Markdown και το αποτέλεσμα JSON διατηρούνται ως το τεχνούργημα ροής εργασίας `forgotten-sibling-tests` για βαθμονόμηση πριν από οποιαδήποτε κυκλοφορία αποκλεισμού.

Οι επανεξαγωγές βαρελιού και οι δυναμικές εισαγωγές αποτελούν μόνο διαγνωστικά ανάλυσης. δεν δημιουργούν ποτέ ένα αποκλειστικό εύρημα. Εξαιρέσεις που εξετάστηκαν ζωντανά στο `config/quality/forgotten-sibling-allowlist.json`. Κάθε καταχώριση πρέπει να ονομάζει το τεστ καταναλωτή και υποψηφίου, να δίνει μια συγκεκριμένη αιτιολογία και να συνδέει ένα ζήτημα GitHub ή αίτημα έλξης. Οι καταχωρήσεις με κακή μορφή αποτυγχάνουν να κλείσουν. Οι εξαιρέσεις δεν μπορούν να καταστείλουν μια διαγραμμένη δοκιμασία υποψηφίου ή μια διαφορά που προσθέτει `.skip`/`.todo`. Η αποδυνάμωση του ισχυρισμού και άλλες καλύψεις παραμένουν στην ιδιοκτησία της πύλης `check:test-masking` που μπλοκάρει ανεξάρτητα.

### Δουλειά: `lint`

Εκτελείται σε κάθε PR σε `main`. Τα μπλοκ συγχωνεύονται σε περίπτωση αποτυχίας.

| Σενάριο (`npm run ...`)           | Επικυρώνει                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Μπλοκάρισμα                                    |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------- |
| `check:node-runtime`              | Η έκδοση Node.js βρίσκεται εντός του υποστηριζόμενου εύρους                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ναί                                            |
| `check:cycles`                    | Κυκλικές εισαγωγές σε όλο το `src/` + `open-sse/` (βασισμένο σε AST, επιλύθηκε το tsconfig `paths` ). Το Bare βγαίνει από το 1 όποτε υπάρχει οποιοσδήποτε κύκλος (αποτυχία-κλειστός από #15281) και παραθέτει το SCCs. `check:cycles:ratchet` (τι τρέχει CI ) μπλοκάρει όταν το πλήθος υπερβαίνει το ανώτατο όριο `metrics.cycles` σε `quality-baseline.json` — επί του παρόντος 14, `direction: down`, επομένως μπορεί να πέσει μόνο (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ναι (καστάνια)                                 |
| `check:boundary`                  | Ζεύξη `open-sse → src` : μοναδικές εισαγωγές αρχείου σε αρχείο από τη μηχανή στην εφαρμογή (`scripts/quality/measure-boundary.mjs`, η λίστα άκρων είναι το ανεκτέλεστο αρχείο αποκατάστασης v4 core/module-split ). Συμβουλευτική έκθεση Bare = (ίδια με `quality:boundary`). `check:boundary:ratchet` (ό,τι τρέχει CI, επίσης στον βρόχο καστάνιας `quality.yml` fast-gates) μπλοκάρει όταν το πλήθος υπερβαίνει το ανώτατο όριο `metrics.boundaryOpenSseToSrc` σε `quality-baseline.json` — σπαρμένο στο μετρημένο 771, `direction: down`; `--update` το χαμηλώνει μόνο? βάση-σχετικός στο PRs (`--base-ref`, βλέπε παρακάτω)                                                                                                                                                                                                                                                                                                                                                                                                                        | Ναι (καστάνια)                                 |
| `check:route-validation:t06`      | Σχήματα Zod που υπάρχουν σε όλες τις διαδρομές (πολιτική επιπέδου 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ναί                                            |
| `check:any-budget:t11`            | Ο αριθμός `@ts-expect-error // any` δεν υπερβαίνει τον προϋπολογισμό (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ναί                                            |
| `check:provider-consistency`      | Κάθε πάροχος στο `providers.ts` έχει μια αντίστοιχη καταχώριση στο `providerRegistry.ts` (και αντίστροφα, στη λίστα επιτρεπόμενων)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ναί                                            |
| `check:model-lifecycle`           | Οι τρεις πίνακες δρομολόγησης που διατηρούνται στο χέρι παραμένουν συνεπείς με το στιγμιότυπο του κύκλου ζωής με check-in (#11503): `FITNESS_TABLE` (`taskFitness.ts`) δεν βαθμολογεί κανένα αναγνωριστικό απόσυρσης που μπορεί να δρομολογήσει `REGISTRY`. κάθε στόχος `BUILT_IN_ALIASES` υπάρχει στο `REGISTRY` και απουσιάζει από το στιγμιότυπο του retired-id. Κάθε αναγνωριστικό που έχει αποσυρθεί ακόμα σε `REGISTRY` προωθείται ή παρατίθεται σε `allowedRetiredInCatalog`. και καμία πηγή ή στόχος `DEFAULT_DEGRADATION_MAP` δεν εμφανίζεται σε αυτό το στιγμιότυπο. Αυτό δεν αποδεικνύει ότι ένα μοντέλο εξυπηρετείται αυτήν τη στιγμή από ζωντανό upstream. Το offline — συγκρίνει με `config/quality/model-lifecycle.json`, ανανεώνεται χειροκίνητα με `npm run quality:refresh-model-lifecycle` (δίκτυο, μη ενσύρματο σε CI). `allowedRetiredInCatalog` είναι μια καστάνια καύσης: προσθέστε μια καταχώριση μόνο με πρόβλημα παρακολούθησης.                                                                                             | Ναί                                            |
| `check:fetch-targets`             | Κάθε `fetch("/api/...")` στο `src/` από την πλευρά του πελάτη καταλήγει σε πραγματικό `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ναί                                            |
| `check:deps`                      | Όλα `npm install` -able deps σε κάθε `package.json` στο repo είναι σε `dependency-allowlist.json`. νέα αποκαρφιτσωμένα ή slopsquatted πακέτα επισημασμένα                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ναί                                            |
| `audit:deps`                      | `npm audit` (ηλεκτρόνιο + ρίζας) — χωρίς συμβουλές high/critical (επικαλύπτει το osv `check:vuln-ratchet`; βλέπε Συλλογή εξορθολογισμού)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ναί                                            |
| `check:lockfile`                  | ακεραιότητα `package-lock.json` μητρώο — https, κατακερματισμοί ακεραιότητας, χωρίς παρακάμψεις κεντρικού υπολογιστή                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ναί                                            |
| `check:licenses`                  | Λίστα επιτρεπόμενων αδειών SPDX για εξαρτήσεις παραγωγής                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ναί                                            |
| `check:tracked-artifacts`         | Χωρίς τεχνουργήματα κατασκευής / δεσμευμένους συμβολικούς συνδέσμους `node_modules` (εκτελείται επίσης στο husky pre-commit, το pre-push είναι σκόπιμα ελαφρύ — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ναί                                            |
| `check:ai-attribution`            | Κανένα τρέιλερ AI/bot `Co-Authored-By` ή υποσέλιδο γενιάς AI σε δεσμεύσεις PR, τίτλος ή σώμα — Σκληρός κανόνας #16 (στο βρόχο γρήγορων πυλών `quality.yml` για PR→ `release/**` — διαβάζει το ωφέλιμο φορτίο `commit-msg` συμβάντος, no-op off PRs — και ένα βήμα μόνο για PR στο `ci.yml` → επίσης για PR `main`; επιτρέπονται οι συγγραφείς #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `check:vitest-exclusions`         | Κάθε εξαίρεση Vitest ονομάζει ένα πρόβλημα παρακολούθησης και εμφανίζεται στο `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ναί                                            |
| `check:file-size`                 | Τα αρχεία πηγής (`.ts`/`.tsx` σε `src/`, `open-sse/`, `electron/`, `bin/`) παραμένουν εντός `cap` και τα αρχεία ελέγχου (`*.test.ts(x)`) εντός `testCap`. Τα αρχεία που έχουν παγώσει σε `file-size-baseline.json` (`frozen` / `testFrozen`) δεν πρέπει να υπερβαίνουν το εγγεγραμμένο μέγεθός τους                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ναί                                            |
| `check:error-helper`              | Οι απαντήσεις σφαλμάτων στο executors/handlers χρησιμοποιούν `buildErrorBody()` / `sanitizeErrorMessage()` (Σκληρός κανόνας #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ναί                                            |
| `check:migration-numbering`       | Τα αρχεία SQL μετεγκατάστασης αριθμούνται διαδοχικά, χωρίς κενά ή διπλότυπα                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ναί                                            |
| `check:public-creds`              | Χωρίς κυριολεκτικά OAuth `client_id`/`client_secret` ή κλειδιά Web Firebase εκτός `publicCreds.ts` (Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ναί                                            |
| `check:db-rules`                  | Δεν υπάρχει ακατέργαστο SQL εκτός των μονάδων `src/lib/db/`. χωρίς εισαγωγές βαρελιού από `localDb.ts` (Hard Rules #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ναί                                            |
| `check:known-symbols`             | Οι εκτελεστές παρόχων, οι στρατηγικές δρομολόγησης και οι μεταφραστές που είναι εγγεγραμμένοι στους πίνακες αποστολής ταιριάζουν με τα αρχεία στο δίσκο — χωρίς ορφανά ή μη δηλωμένα σύμβολα                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ναί                                            |
| `check:route-guard-membership`    | Κάθε διαδρομή που δημιουργεί μια θυγατρική διαδικασία ταξινομείται κατά `isLocalOnlyPath()` (Hard Rules #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ναί                                            |
| `check:test-discovery`            | Κάθε αρχείο `*.test.ts` / `*.spec.ts` στο repo συλλέγεται από τουλάχιστον έναν δοκιμαστικό δρομέα (καστάνια: ορφανή λίστα στο `test-discovery-baseline.json` μπορεί μόνο να συρρικνωθεί)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ναί                                            |
| `check:test-tla-order`            | Κανένα αρχείο `node:test` κάτω από `tests/unit` δεν καταγράφει μια δοκιμή, χτυπά ένα `await` ανώτατου επιπέδου και, στη συνέχεια, καταχωρεί περισσότερα (#18045; καστάνια: `test-tla-order-allowlist.json` μπορεί μόνο να συρρικνωθεί)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ναί                                            |
| `check:agent-skills-sync`         | Τα τεχνουργήματα δεξιοτήτων που δημιουργούνται αντιστοιχούν στον κατάλογο πηγής τους (χωρίς μετατόπιση)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `check:provider-asset-provenance` | Ο πάροχος logos/assets φέρει μια καταγεγραμμένη καταχώριση προέλευσης                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `lint:json`                       | Τα αρχεία ρυθμίσεων JSON αναλύουν και ικανοποιούν τους κανόνες του repo lint                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `typecheck:core`                  | Σύνταξη TypeScript χωρίς σφάλματα (μόνο συμβουλευτικές προειδοποιήσεις)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ναί                                            |
| `typecheck:noimplicit:core`       | Αυστηρή `noImplicitAny` — προοπτική? Πολλοί προϋπάρχοντες ιστότοποι κλήσεων εξακολουθούν να χρειάζονται σχολιασμούς                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | **Συμβουλευτικός** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` με εμβέλεια `src/app/(dashboard)/**` (#7033) — Η επιμελημένη λίστα επιτρεπόμενων αρχείων 27 του `typecheck:core` δεν περιλαμβάνει κανέναν πίνακα εργαλείων TSX και `next build` δεν το ελέγχει ποτέ ούτε πληκτρολογεί (`next.config.mjs` θέτει `ignoreBuildErrors: true`), επομένως οι παλινδρομήσεις ορφανού αναγνωριστικού εκεί (#6625/#6909) ήταν αόρατες στο CI. Διαφορές έναντι μιας παγωμένης γραμμής βάσης μέτρησης per-file/per-TS-code (`config/quality/dashboard-typecheck-baseline.json`, ίδιο μοτίβο επιβολής μπαγιάτικου με `check:known-symbols`) — μόνο σφάλματα NEW πέρα από τη βασική μέτρηση αποτυγχάνουν στην πύλη. κατεβάστε με `--update` όταν διορθωθεί ένα προϋπάρχον σφάλμα.                                                                                                                                                                                                                                                                                                                                             | Ναί                                            |
| `check:build-typecheck`           | Έλεγχος τύπου παραγωγής ολόκληρης εφαρμογής στο `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), η επιφανειακή λίστα επιτρεπόμενων αρχείων 27 αρχείων του `typecheck:core` και η πύλη του ταμπλό δεν καλύπτουν. Διαφορές εναντίον `config/quality/build-typecheck-baseline.json`; ένας νέος ή αυξημένος αριθμός ανά-(αρχείο, κωδικός) αποτυγχάνει, ένας χαμηλότερος αριθμός σας ζητά να κάνετε καστάνια. `--update` απορρίπτει ενώ η εκτέλεση περιέχει ένα νέο ή αυξημένο ζεύγος, εκτός εάν περάσει `--force-regressions` και αρνείται ένα νέο αρχείο σε σίγαση, εκτός εάν περάσει `--force-nocheck`, επομένως η διεύρυνση της γραμμής βάσης για να γίνει πράσινο και η παραχώρηση μόνιμης σίγασης είναι δύο ξεχωριστές σκόπιμες ενέργειες. Ένα γυμνό `--force` απορρίπτεται. Επίσης σαρώνει το εύρος κατασκευής για `@ts-nocheck` έναντι `config/quality/ts-nocheck-baseline.json`, επειδή ένα αρχείο που το χρησιμοποιεί δεν αναφέρει καθόλου διαγνωστικά και διαφορετικά θα ήταν αόρατο σε κάθε πύλη. | Ναί                                            |

#### Δύο προγράμματα ελέγχου τύπου απαντούν διαφορετικά

`typecheck:core` και `check:build-typecheck` μεταγλωττίζουν διαφορετικά προγράμματα κάτω από διαφορετικές επιλογές και το ίδιο αρχείο μπορεί να είναι καθαρό στο ένα και γεμάτο λάθη στο άλλο.

`tsconfig.build.json` θέτει `"strict": false`, άρα `noImplicitAny` είναι απενεργοποιημένο. Η βασική διαμόρφωση συντάσσει μια επιμελημένη λίστα επιτρεπόμενων αρχείων 27 με αυστηρότερες επιλογές και ακολουθεί το γράφημα εισαγωγής κάθε καταχώρισης, έτσι ώστε τα αρχεία που δεν εμφανίζονται ποτέ στο πρόγραμμα δημιουργίας εξακολουθούν να ελέγχονται εκεί.

Η συνέπεια είναι σημαντική όταν κρίνουμε εάν ένα αρχείο πληκτρολογείται:** μηδενικά διαγνωστικά κάτω από `check:build-typecheck` δεν σημαίνει μηδέν** . Η απογύμνωση `@ts-nocheck` από 26 αρχεία έδειξε ότι 23 από αυτά ήταν καθαρά στο πρόγραμμα κατασκευής. Δεκαέξι από αυτά εμφανίστηκαν περίπου 120 σιωπηρά - τυχόν σφάλματα στο αυστηρό. Ελέγξτε και τα δύο πριν καλέσετε ένα αρχείο καθαρό.

### Δουλειά: `quality-gate`

Τρέχει μετά `test-coverage`. Τα μπλοκ συγχωνεύονται σε περίπτωση αποτυχίας.

| Γραφή                        | Επικυρώνει                                                                                                                                                                                         | Μπλοκάρισμα                 |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `quality:collect`            | Εκπέμπει `quality-metrics.json` (πλήθος προειδοποιήσεων ESLint, κάλυψη από αναφορά συγχωνευμένων θραυσμάτων)                                                                                       | Ναι (πάνω από την καστάνια) |
| `quality:ratchet`            | Κάθε μέτρηση στο `quality-baseline.json` δεν έχει υποχωρήσει (ESLint προειδοποιήσεις ≤ βασικής γραμμής, κάλυψη ≥ βάσης)                                                                            | Ναί                         |
| `check:duplication`          | Η αντιγραφή κώδικα (jscpd@4) δεν υπερβαίνει τη γραμμή βάσης στο `quality-baseline.json`                                                                                                            | Ναί                         |
| `check:complexity`           | Η κυκλωμική πολυπλοκότητα σε επίπεδο αρχείου δεν υπερβαίνει το όριο (πυρήνας ESLint `complexity` + `max-lines-per-function`)                                                                       | Ναί                         |
| `check:cognitive-complexity` | Καστάνια γνωστικής πολυπλοκότητας (`eslint-plugin-sonarjs`) — ξεχωριστό ESLint pass; CI εκτελείται και τα δύο συγχωνευμένα ως το μεμονωμένο βήμα `check:complexity-ratchets`                       | Ναί                         |
| `check:dead-code`            | Η αχρησιμοποίητη καστάνια εξαγωγής / αρχείων (knip) δεν υποχωρεί έναντι της γραμμής βάσης                                                                                                          | Ναί                         |
| `check:compression-budget`   | Ο προϋπολογισμός αναφοράς συμπίεσης — ανά κινητήρα δεν πρέπει να υποχωρεί                                                                                                                          | Ναί                         |
| `check:type-coverage`        | Η καστάνια (`type-coverage`) με πληκτρολόγηση ποσοστού δεν υποχωρεί. συνυπολογίζει σε μεγάλο βαθμό `typecheck:noimplicit:core`                                                                     | Ναί                         |
| `check:codeql-ratchet`       | Ανοιχτό πλήθος ειδοποιήσεων CodeQL δεν υποχωρεί (διαβάζεται μέσω `gh api`, χαριτωμένη παράβλεψη χωρίς διακριτικό) Ρυθμός ανανέωσης — και μη αυτόματη ενεργοποίηση: βλέπε "CodeQL ratchet" παρακάτω | Ναί                         |

### Δουλειά: `quality-extended`

Ολόκληρη η δουλειά είναι συμβουλευτική (`continue-on-error: true`). Οι καστάνια που βασίζονται σε npm τρέχουν πραγματικά. οι εξωτερικοί σαρωτές εγκαθίστανται μέσω `gh release download` και κάνουν αυτόματη παράκαμψη (έξοδος 0) όταν ένα δυαδικό αρχείο εξακολουθεί να απουσιάζει.

| Γραφή                    | Επικυρώνει                                                                                                                                                                                                                              | Μπλοκάρισμα                                              |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `check:circular-deps`    | Χωρίς κυκλικές εξαρτήσεις (dpdm)                                                                                                                                                                                                        | **Συμβουλευτικός**                                       |
| `check:bundle-size`      | Το μέγεθος της δέσμης δεν υπερβαίνει το καπάκι                                                                                                                                                                                          | **Συμβουλευτικός**                                       |
| `check:secrets`          | Η μυστική σάρωση (gitleaks) — παραλείπεται εάν απουσιάζει το δυαδικό                                                                                                                                                                    | **Συμβουλευτικός**                                       |
| `check:vuln-ratchet`     | Τα τρωτά σημεία εξάρτησης (osv-scanner) δεν επαναφέρουν τις παραλείψεις — εάν απουσιάζει το δυαδικό                                                                                                                                     | **Συμβουλευτικός**                                       |
| `check:workflows`        | Lint ροής εργασίας (actionlint + zizmor); Οι σαρωτές missing/broken, οι μη έγκυρες αναφορές ή η χαμένη γραμμή βάσης καστάνιας αποτυγχάνουν ως INCOMPLETE. Τα έγκυρα ευρήματα ακολουθούν την επιλεγμένη πολιτική strict/advisory/ratchet | Απαιτείται εκτέλεση. μπλοκάρισμα καστάνιας zizmor στο CI |
| `check:openapi-breaking` | Διακοπή αλλαγών στο δημόσιο συμβόλαιο API (`openapi.yaml`) έναντι του βασικού κλάδου (oasdiff) — εκπέμπει `openapiBreaking=N`. παρακάμπτεται εάν ο oasdiff απουσιάζει ή η βασική προδιαγραφή δεν μπορεί να επιλυθεί                     | **Συμβουλευτικός**                                       |

### Δουλειά: `docs-sync-strict`

Εκτελείται σε κάθε PR σε `main`. Τα μπλοκ συγχωνεύονται σε περίπτωση αποτυχίας.

| Γραφή                          | Επικυρώνει                                                                                                                                                                           | Μπλοκάρισμα                  |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------- |
| `check:docs-all`               | Μετα-πύλη που τρέχει τις 6 υποπύλες παρακάτω διαδοχικά                                                                                                                               | Ναί                          |
| ↳ `check:docs-sync`            | Συνοχή έκδοσης CHANGELOG / OpenAPI / llm.txt                                                                                                                                         | Ναί                          |
| ↳ `check:docs-counts`          | Οι μετρήσεις στην πεζογραφία (πλήθος παρόχων, αριθμός μετανάστευσης, κ.λπ.) βρίσκονται εντός του παραθύρου καστάνιας των πραγματικών μετρήσεων                                       | Ναί                          |
| ↳ `check:env-doc-sync`         | Κάθε env var στο `.env.example` τεκμηριώνεται σε έναν πίνακα εγγράφων και αντίστροφα                                                                                                 | Ναί                          |
| ↳ `check:deprecated-versions`  | Δεν υπάρχουν συμβολοσειρές καταργημένης έκδοσης στα έγγραφα                                                                                                                          | Ναί                          |
| ↳ `check:doc-links`            | Οι εσωτερικοί σύνδεσμοι σήμανσης στα έγγραφα επιλύονται σε πραγματικά αρχεία (μορφή `[text]`/`(path)` )                                                                              | Ναί                          |
| ↳ `check:fabricated-docs`      | Διαδρομές, env vars, εντολές CLI, ονόματα αγκίστρων και διαδρομές αρχείων που αναφέρονται στα έγγραφα υπάρχουν στη βάση κώδικα. Σκληρή πύλη μέσω `--strict`; soft-fail χωρίς σημαία. | Ναι (μέσω `--strict` στο CI) |
| `check:cli-i18n`               | Οι συμβολοσειρές εντολών CLI υπάρχουν σε όλα τα αρχεία τοπικής ρύθμισης i18n                                                                                                         | Ναί                          |
| `check:openapi-coverage`       | Η προδιαγραφή OpenAPI καλύπτει τουλάχιστον ένα ορόσημο πραγματικών διαδρομών                                                                                                         | Ναί                          |
| `check:openapi-security-tiers` | Οι σχολιασμοί βαθμίδων ασφαλείας στο `openapi.yaml` είναι συνεπείς με τις ταξινομήσεις `routeGuard.ts`                                                                               | **Συμβουλευτικός**           |
| `check:openapi-routes`         | Κάθε μονοπάτι στο `openapi.yaml` καταλήγει σε ένα πραγματικό `route.ts` (κατά της ψευδαίσθησης)                                                                                      | Ναί                          |
| `check:docs-symbols`           | Κάθε αναφορά `/api/...` στο `docs/**/*.md` καταλήγει σε ένα πραγματικό `route.ts` (κατά των ψευδαισθήσεων)                                                                           | Ναί                          |
| `i18n translation drift`       | Τα αμετάφραστα κλειδιά σε αρχεία τοπικής ρύθμισης i18n προειδοποιούν μόνο —                                                                                                          | **Συμβουλευτικός**           |

Τα δώδεκα README SVGs κάτω από `docs/diagrams/` δημιουργούνται (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` αναγεννά όλα αυτά). Καθένα έχει μια δοκιμή μονάδας σύγκρισης byte (`tests/unit/docs/readme-*-svg.test.ts`, εργασία `test-unit`) που αποτυγχάνει όταν το δεσμευμένο αρχείο είναι μπαγιάτικο και `check:docs-counts` διαβάζει κανονικούς αριθμούς από τους κόμβους `<text>` — γι' αυτό το βήμα περιγράμματος διατηρεί κάθε περιγραμμένη συμβολοσειρά στο αρχείο ως αόρατο `<text>`. Ο έλεγχος κανονικών αριθμών SVG διαβάζει τα αρχεία που παρατίθενται σε `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, συν `public/images/tier-flow-dark.svg` και `tier-flow-light.svg`; οι αξιώσεις δωρεάν για πάντα, καταχώριση καταλόγου, επαναλαμβανόμενη ομάδα και συντελεστές βαθμολογίας διαβάζουν επίσης `promise-pillars.svg`, `free-tier-budget.svg` και `strategies-grid.svg`. `free-tier-budget.svg` αντλεί τα στοιχεία του από το πρόγραμμα φόρτωσης ζωντανού καταλόγου, επομένως μια αλλαγή σε `FREE_MODEL_BUDGETS` ή σε εμφανιζόμενο όνομα παρόχου γίνεται κόκκινο CI μέχρι να αναδημιουργηθεί αυτό το αρχείο.

### Δουλειά: `i18n-ui-coverage`

| Γραφή                                   | Επικυρώνει                                                                                                                                                                                                                                  | Μπλοκάρισμα        |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `check-ui-keys-coverage` (ενσωματωμένο) | Η κάλυψη κλειδιού UI i18n είναι ≥ 65%                                                                                                                                                                                                       | Ναί                |
| `check-ui-value-drift` (ενσωματωμένο)   | Ένα ξαναγραμμένο αγγλικό** αξία** δεν αφήνει πίσω της μπαγιάτικη μετάφραση                                                                                                                                                                  | Ναί                |
| `check-new-key-coverage` (ενσωματωμένο) | ΕΝΑ** νέος** Το αγγλικό κλειδί μεταφράζεται σε κάθε τοπική γλώσσα — απορρίπτεται ο δείκτης `__MISSING__:`                                                                                                                                   | Ναί                |
| `check-translation-ratio`               | Η αναλογία πραγματικής μετάφρασης ανά τοπική γλώσσα (πανομοιότυπη με την αγγλική / σύμβολο κράτησης θέσης / λείπουν φύλλα εκτός της λίστας επιτρεπόμενων) δεν πρέπει να υπερβαίνει `config/quality/i18n-translation-baseline.json` + χαλαρό | **Συμβουλευτικός** |

Χρειάζεται `fetch-depth: 0` — η πύλη μετατόπισης αξίας διαφέρει `en.json` από τη βάση συγχώνευσης.

#### `check-ui-value-drift` — μπαγιάτικο-μετάφραση πύλη

Πιάνει τη μία παλινδρόμηση i18n που οι άλλες πύλες δομικά δεν μπορούν να δουν: μια αγγλική τιμή ξαναγράφεται και οι μεταφράσεις που προέρχονται από τα _προηγούμενα_ αγγλικά παραμένουν πίσω, έτσι οι μη Άγγλοι χρήστες συνεχίζουν να διαβάζουν αντίγραφο με σιγουριά, τώρα λάθος.

Αυτό στάλθηκε πραγματικά. `oauthModal.googleOAuthWarning` ξαναγράφτηκε όταν προσγειώθηκε το βοηθητικό πρόγραμμα σύνδεσης Antigravity (#5203);** 39 από 43 τοποθεσίες** διατήρησε κείμενο που έλεγε στους χειριστές να "αντιγράψουν το πλήρες URL και να το επικολλήσουν παρακάτω" — μια ροή που δεν μπορεί να ολοκληρωθεί για αυτόν τον πάροχο. Πέρασε απαρατήρητο μέχρι #8463 γιατί:

- `sync-ui-keys` συμπληρώνει μόνο τα κλειδιά που είναι** απών** , ποτέ αυτά που είναι** μπαγιάτικος** ;
- `check-ui-keys-coverage` μετράει το κλειδί _παρουσία_, οπότε μια μπαγιάτικη μετάφραση βαθμολογείται ως καλυμμένη.
- `check-translation-drift` παρακολουθεί την τεκμηρίωση `docs/i18n/<locale>/**.md` αντικατοπτρίζει — ποτέ δεν διαβάζει `src/i18n/messages/*.json`. Αποκλεισμός στην εργασία `docs-sync-strict` από τον επανασυγχρονισμό 2026-09: επεξεργαστείτε ένα βασικό έγγραφο → `npm run i18n:run -- --files=<doc>` (επίπεδο ενότητας, φθηνό).

**Με επίγνωση των διαφορών, όχι με βάση τη γραμμή βάσης.** Συγκρίνει `en.json` στη βάση συγχώνευσης με το δέντρο εργασίας. Για κάθε κλειδί του οποίου η αγγλική τιμή έχει αλλάξει, οποιαδήποτε τοπική γλώσσα εξακολουθεί να διατηρεί μια ανέγγιχτη μετάφραση είναι μπαγιάτικη. Αυτό σκόπιμα** παγώνει το προϋπάρχον χρέος** — μια διαφορά δεν μπορεί να αποκαλύψει από ποια παλιά αγγλικά προήλθε μια μακροχρόνια μετάφραση, επομένως η πύλη κρίνει μόνο τι αγγίζει η τρέχουσα αλλαγή. Η εναλλακτική λύση (μια βασική γραμμή κατακερματισμού ανά κλειδί) θα κόστιζε ένα αρχείο που δημιουργείται ~ 600 KB, 3 × η μεγαλύτερη υπάρχουσα γραμμή βάσης, που αναδεύεται σε κάθε i18n PR.

Δύο τρόποι για να το ικανοποιήσεις:

1. ενημερώστε τις επηρεαζόμενες μεταφράσεις ή
2. ρυθμίστε τα σε `__MISSING__:<new english>` — το χρόνο εκτέλεσης και, στη συνέχεια, εξυπηρετεί τα διορθωμένα αγγλικά (`src/i18n/request.ts::deepMergeFallback`, #7258) και τις βασικές ουρές για μετάφραση.

Αν η χορδή είναι** έννοια** άλλαξε, προτιμώ** μετονομασία του κλειδιού** : ένα νέο κλειδί δεν μπορεί να κληρονομήσει μια παλιά μετάφραση. Αυτό είναι το μοτίβο #8463 που χρησιμοποιείται.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Έξοδος 0 με `SKIP reason=base-unresolved` όταν δεν είναι δυνατή η ανάγνωση του βασικού καταλόγου (ρηχός κλώνος χωρίς το βασικό ref), αντικατοπτρίζοντας `check-openapi-breaking`.

### Δουλειά: `i18n`

Πλήρης μήτρα επικύρωσης i18n (μία εργασία ανά τοπική ρύθμιση). Ολόκληρη η δουλειά είναι συμβουλευτική.

| Γραφή                           | Επικυρώνει                              | Μπλοκάρισμα                                                      |
| ------------------------------- | --------------------------------------- | ---------------------------------------------------------------- |
| `validate_translation.py quick` | Πληρότητα μετάφρασης ανά τοπική ρύθμιση | **Συμβουλευτικός** (`continue-on-error: true` σε όλη τη δουλειά) |

### Δουλειά: `pr-test-policy`

Εκτελείται μόνο με αιτήματα έλξης.

| Γραφή                  | Επικυρώνει                                                                                                                                         | Μπλοκάρισμα |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check:pr-test-policy` | PRs που αλλάζουν τον κωδικό παραγωγής σε `src/`, `open-sse/`, `electron/` ή `bin/` πρέπει να περιλαμβάνουν ή να ενημερώνουν δοκιμές (Hard Rule #8) | Ναί         |
| `check:test-masking`   | Τα τροποποιημένα αρχεία δοκιμής δεν μειώνουν τον καθαρό αριθμό ισχυρισμών ούτε προσθέτουν ταυτολογίες `assert.ok(true)`                            | Ναί         |
| `check:pr-evidence`    | Το σώμα PR παραθέτει στοιχεία test/VPS για την αλλαγή (μηχανοποιεί τον σκληρό κανόνα #18 με το grepping PR prose — fragile, βλ.                    | Ναί         |

### Δουλειά: `test-vitest`

Τρέχει μετά `build`. Τα μπλοκ συγχωνεύονται σε περίπτωση αποτυχίας.

| Σουίτα           | Επικυρώνει                                                                 | Μπλοκάρισμα                                                                                                                 |
| ---------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | διακομιστής MCP (110 εργαλεία), autoCombo, προσωρινή μνήμη — vitest runner | Ναί                                                                                                                         |
| `test:vitest:ui` | δοκιμές συστατικού UI — vitest runner                                      | **Μπλοκάρισμα** Οι προϋπάρχουσες αστοχίες — εξαιρούνται ρητά στο `vitest.config.ts`. νέες αποτυχίες αποτυγχάνουν τη δουλειά |

### Νυχτερινές ροές εργασιών (προγραμματισμένες, συμβουλευτικές)

Αυτά λειτουργούν με πρόγραμμα cron (και `workflow_dispatch`), ποτέ σε PRs. Όλα είναι συμβουλευτικά.

| Ροή εργασιών           | Επικυρώνει                                                                                                                                                          | Μπλοκάρισμα        |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `nightly-property`     | γρήγορος έλεγχος δοκιμών ιδιοτήτων με τυχαίο πλήθος τυχαίων σπόρων +                                                                                                | **Συμβουλευτικός** |
| `nightly-resilience`   | πύλη ανάπτυξης σωρών, σφάλμα χάους-ένεση, k6 load/soak                                                                                                              | **Συμβουλευτικός** |
| `nightly-llm-security` | Promptfoo injection guard (block mode) probes + garak (παραβλήθηκε χωρίς μυστικό παρόχου)                                                                           | **Συμβουλευτικός** |
| `nightly-schemathesis` | Σύμπτυξη συμβάσεων OpenAPI (σχήμα) έναντι ζωντανού OmniRoute με χρήση παραβιάσεων προδιαγραφών επιφανειών `docs/openapi.yaml` — / μη χειριζόμενες 500s (Φάση 8 B.4) | **Συμβουλευτικός** |
| `nightly-mutation`     | Βαθμολογία δοκιμής μετάλλαξης Stryker στη γρήγορη μονάδα λωρίδας — επιζώντες μεταλλάκτες επιφάνεια αδύναμοι ισχυρισμοί                                              | **Συμβουλευτικός** |
| `nightly-compat`       | Πίνακας συμβατότητας κινητήρα κόμβου σε όλες τις υποστηριζόμενες περιοχές `engines.node`                                                                            | **Συμβουλευτικός** |

Οι γραμμές βάσης απόδοσης (σωρός, TTFB, χρόνος κατασκευής) καταγράφονται, δεν περιορίζονται: βλέπε [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
