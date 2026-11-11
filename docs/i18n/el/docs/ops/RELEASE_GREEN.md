# Release-Green: candidate validation and evidence (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Το Release-Green παρατηρεί μια συγκεκριμένη δέσμευση και αναφέρει τα αποτελέσματα επικύρωσής της. Η [αναφορά Quality Gates](../architecture/QUALITY_GATES.md) καθορίζει τα τρέχοντα προφίλ CI, τους απαιτούμενους ελέγχους και την πολιτική αποδοχής. Η τροποποιημένη [πολιτική εισδοχής](../../config/quality/admission-policy.json) είναι η εκτελέσιμη σύμβαση για `Gate / CI` και `Gate / Quality`.

## CI και πεδίο εφαρμογής παρατηρητή

Τα καλύμματα `ci.yml` και `quality.yml` τραβούν αιτήματα έλξης σε κύρια και αποδεσμευτικά υποκαταστήματα. Το επιλεγμένο προφίλ καθορίζει ποιες εργασίες ισχύουν. Το Full CI περιλαμβάνει επίσης λωρίδες που ένα συνηθισμένο αίτημα έλξης δεν εκτελεί. Ένα γρήγορο αποτέλεσμα παρατηρητή δεν μπορεί να αντικαταστήσει αυτές τις εργασίες και ένα ολοκληρωμένο περιτύλιγμα ροής εργασίας δεν μπορεί να αντικαταστήσει τις αποδείξεις του.

Η κατασκευή ανήκει στην CI. Δεν υπάρχει διπλό συμβουλευτικό build στο `quality.yml`. Τα τεχνουργήματα που λείπουν, οι ακυρωμένες εργασίες και οι ελλιπείς μετρήσεις δεν συνιστούν επιτυχή απαιτούμενο έλεγχο. Επιβεβαιώστε την τρέχουσα βάση, επικεφαλής και συνδυασμένο υποψήφιο πριν αποδεχτείτε τα αποτελέσματα.

## Τοπική επικύρωση

Εκτελέστε τον παρατηρητή σε ένα ιδιόκτητο δέντρο εργασίας αφού προετοιμάσετε τις εξαρτήσεις του. Χρησιμοποιήστε το [δέντρο εργασίας και το πρωτόκολλο πόρων](WORKTREE_ISOLATION.md) πριν από την βαριά επικύρωση.

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

Το γρήγορο προφίλ είναι μερικό. Το πλήρες προφίλ ελέγχει τις μοντελοποιημένες απαιτήσεις του και διατηρεί τις αποδείξεις εντολών. δεν πιστοποιεί την ανάπτυξη ούτε υποκαθιστά τους ισχύοντες φιλοξενούμενους ελέγχους. Η αναφορά διακρίνει την αποτυχία εκτέλεσης από τη μετατόπιση μετρήσεων. Οι απαιτούμενες καστάνια παραμένουν μπλοκαρισμένες σύμφωνα με την επιλεγμένη πολιτική. Μην αυξάνετε μια γραμμή βάσης απλώς για να λάβετε ένα θετικό αποτέλεσμα.

## Νυχτερινές και χειροκίνητες σκούπες

Οι αναλυτές νυχτερινής έκδοσης και συμβατότητας επιλέγουν έναν κλάδο κανονικής έκδοσης. Αυτή η επιλογή πρέπει να ταιριάζει με τον κλάδο που ενεργοποίησε τη ροή εργασίας και οι σουίτες χρησιμοποιούν το αμετάβλητο SHA του συμβάντος . Για χειροκίνητη εκτέλεση, επιλέξτε την προβλεπόμενη έκδοση στο `release_branch` και στείλτε στην ίδια αναφορά:

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

Η αποστολή μεταξύ διακλαδώσεων απορρίπτεται πριν από την εκτέλεση του επιλεγμένου κωδικού. Οι φιλοξενούμενες κύριες σουίτες ελέγξτε `main` και επαληθεύστε ότι SHA του εξακολουθεί να ταιριάζει με τον επιλυμένο στόχο πριν από την εγκατάσταση. Εάν η κύρια κίνηση κινείται κατά τη διάρκεια της ανάλυσης, εκτελέστε ξανά την ημιτελή σάρωση στη νέα δέσμευση. Μην συνδυάζετε αποδείξεις σουίτας από διαφορετικούς υποψηφίους.

## Διαλογή αποτυχίας και αποκατάσταση

Χρησιμοποιήστε το περιστατικό ως διαγνωστικό ευρετήριο και, στη συνέχεια, επιθεωρήστε την ακριβή εκτέλεση, την προσπάθεια, το βήμα αποτυχίας και το τεχνούργημα. Συγκρίνετε ισοδύναμα αποδεικτικά στοιχεία βάσης και υποψηφίου προτού αποδώσετε μια αποτυχία σε έναν συνεισφέροντα. Τα σφάλματα υποδομής, τα κληρονομικά ελαττώματα, οι υποψήφιες παλινδρομήσεις και οι εκκρεμείς εγκρίσεις απαιτούν διαφορετικές λύσεις.

Οι δεξιότητες `/green-prs`, `/sweep-reds`, `/validate-release-green` και `/babysit` συλλέγουν στοιχεία και προετοιμάζουν επιδιορθώσεις στο τεκμηριωμένο πεδίο εφαρμογής τους. Διατηρήστε την πίστωση συνεργάτη, χρησιμοποιήστε μεμονωμένα υποκαταστήματα επισκευής και επαληθεύστε όλους τους απαιτούμενους ελέγχους πριν από μια εξουσιοδοτημένη συγχώνευση. Καμία αυτόματη γραμμή επαναφοράς ή κλείσιμο περιστατικού δεν υποκαθιστά έναν περαστικό τρέχοντα υποψήφιο.
