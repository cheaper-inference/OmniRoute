# 🐳 Docker Guide — OmniRoute (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Πλήρης οδηγός αναφοράς για ανάπτυξη με Docker. Για γρήγορη εκκίνηση, ανατρέξτε στην [ενότητα Docker του README](../README.md#-docker).

## Πίνακας περιεχομένων

- [Γρήγορη εκτέλεση](#quick-run)
- [Με αρχείο περιβάλλοντος](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Διαθέσιμα προφίλ](#available-profiles)
- [Ρύθμιση εργαλείων CLI του host όταν το OmniRoute εκτελείται σε Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [Compose για περιβάλλον παραγωγής](#production-compose)
- [Στάδια Dockerfile](#dockerfile-stages)
- [Κρίσιμες μεταβλητές περιβάλλοντος](#critical-environment-variables)
- [Docker Compose με Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Γρήγορο Cloudflare Tunnel](#cloudflare-quick-tunnel)
- [Ετικέτες image](#image-tags)
- [Ενημερώσεις του dashboard στο Docker](#dashboard-updates-in-docker)
- [Διαθεσιμότητα: το προεπιλεγμένο SQLite υποστηρίζει ένα μόνο replica](#availability-default-sqlite-is-single-replica)
- [Τοπικά σφάλματα του Gemini μέσα στο Docker](#gemini-regional-errors-inside-docker)
- [Σημαντικές σημειώσεις](#important-notes)

---

## Γρήγορη εκτέλεση

> **Self-host σε μία εντολή;** Δείτε τον [Οδηγό Self-Host](../getting-started/SELF_HOST_GUIDE.md) — `docker compose -f docker-compose.selfhost.yml up -d` (δημοσιευμένη εικόνα + Redis, μόνο για επαναφορά, χωρίς επιλογή προφίλ). Η Γρήγορη εκτέλεση παρακάτω είναι η διαδρομή ενός κοντέινερ για χρήστες που εκτελούν ήδη Redis αλλού.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## Με Αρχείο Περιβάλλοντος

```bash
# Copy and edit .env first
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## Docker Compose

```bash
# Βασικό προφίλ (χωρίς εργαλεία CLI)
docker compose --profile base up -d

# Προφίλ CLI (ενσωματωμένα Claude Code, Codex και OpenClaw)
docker compose --profile cli up -d

# Προφίλ host (κυρίως για Linux· προσαρτά τα εκτελέσιμα CLI του host μόνο για ανάγνωση)
docker compose --profile host up -d

# Προφίλ web (Chromium/Playwright για παρόχους μέσω συνεδρίας web)
docker compose --profile web up -d

# Συνδυασμός CLI + CLIProxyAPI sidecar
docker compose --profile cli --profile cliproxyapi up -d
```

## Διαθέσιμα προφίλ

Το OmniRoute παρέχει προφίλ Compose για τις κύριες μορφές ανάπτυξης. Επιλέξτε αυτό που ταιριάζει στο περιβάλλον σας.

| Προφίλ              | Υπηρεσία         | Πότε να χρησιμοποιηθεί                                                                                                                                                   | Εντολή                                       |
| ------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `base` (προεπιλογή) | `omniroute-base` | Headless server / ελάχιστο περιβάλλον εκτέλεσης, χωρίς ενσωματωμένα CLI παρόχων                                                                                          | `docker compose --profile base up -d`        |
| `cli`               | `omniroute-cli`  | Ροές εργασίας με agents που καλούν `omniroute providers/setup/doctor` και ενσωματωμένα CLI (Codex, Claude Code, Droid, OpenClaw)                                         | `docker compose --profile cli up -d`         |
| `host`              | `omniroute-host` | Host Linux που χρειάζονται πρόσβαση τύπου `network_mode` στα CLI του host, προσαρτώντας τα `~/.local/bin`, `~/.codex`, `~/.claude` κ.λπ. μόνο για ανάγνωση               | `docker compose --profile host up -d`        |
| `cliproxyapi`       | `cliproxyapi`    | Εκτέλεση του [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) sidecar στη θύρα `8317` για upstream διαμεσολάβηση CLI                                          | `docker compose --profile cliproxyapi up -d` |
| `web`               | `omniroute-web`  | Πάροχοι μέσω συνεδρίας web που χρειάζονται πρόγραμμα περιήγησης: `gemini-web`, `claude-web`, `claude-turnstile` (δημιουργεί το `runner-web`, περιλαμβάνεται το Chromium) | `docker compose --profile web up -d`         |

> Μπορούν να συνδυαστούν πολλαπλά προφίλ: `docker compose --profile cli --profile cliproxyapi up -d`.

## Ρύθμιση εργαλείων CLI του κεντρικού συστήματος όταν το OmniRoute εκτελείται σε Docker

Οι εντολές `omniroute setup-codex`, `setup-claude`, `config set <tool>` και το κουμπί
**Αποθήκευση ρυθμίσεων** του πίνακα ελέγχου εγγράφουν αρχεία όπως `~/.codex/*.config.toml`. Αυτές οι διαδρομές
έχουν νόημα μόνο στο μηχάνημα όπου εκτελείται πραγματικά το CLI. Αν τις εκτελέσετε μέσα
στο container, η εγγραφή καταλήγει στον προσωπικό κατάλογο του ίδιου του container (`/home/node` —
η εικόνα εκτελείται με `USER node`), όπου κανένα CLI του κεντρικού συστήματος δεν θα τη διαβάσει ποτέ και από όπου
απορρίπτεται μόλις αναδημιουργηθεί το container.

Το OmniRoute το ανιχνεύει και αρνείται την εγγραφή παρέχοντας οδηγίες, αντί να
αναφέρει μια επιτυχία που δεν μπορείτε να αξιοποιήσετε: το CLI τερματίζει με κωδικό `2` και το API απαντά με `422`
και `containerEphemeralTarget: true`.

### Συνιστάται: εκτελέστε το CLI στο κεντρικό σύστημα και το OmniRoute σε Docker

Το container παρέχει το API· το CLI ρυθμίζει τα εργαλεία του κεντρικού σας συστήματος.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # κατευθύνετε το CLI προς το container
omniroute setup-codex                      # εγγράφει το πραγματικό ~/.codex στο κεντρικό σας σύστημα
```

Αυτή είναι η σωστή επιλογή όταν το Codex, το Claude Code, το Cursor ή παρόμοια εργαλεία εκτελούνται στον
φορητό υπολογιστή σας — που είναι και η συνήθης διαμόρφωση.

### Εναλλακτικά: προσαρτήστε με bind mount τους καταλόγους ρυθμίσεων του κεντρικού συστήματος (προφίλ `host`)

Αν θέλετε το ίδιο το container να εγγράφει τις ρυθμίσεις του κεντρικού σας συστήματος, προσαρτήστε τους
καταλόγους και ορίστε το `CLI_CONFIG_HOME` στη ρίζα της προσάρτησης. Το προφίλ `host`
το κάνει ήδη:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Η προσάρτηση bind είναι αυτή που καθιστά τη διαδρομή αξιόπιστη: το OmniRoute διαβάζει το
`/proc/self/mountinfo` και επιτρέπει εγγραφές σε προσαρτημένες διαδρομές (καθώς και σε καταλόγους
των οποίων οι θυγατρικοί κατάλογοι είναι σημεία προσάρτησης, κάτι που αντιστοιχεί ακριβώς στη δομή `/host-home` παραπάνω), ενώ
εξακολουθεί να αρνείται τις εγγραφές σε μη προσαρτημένες διαδρομές.

### Διέξοδος ανάγκης: ρυθμίστε τα CLI του ίδιου του container (χρησιμοποιήστε το με φειδώ)

Όταν τα CLI βρίσκονται πράγματι μέσα στο container (στο προφίλ `cli`), η εγγραφή
είναι σκόπιμη. Περάστε το `--allow-container-write` σε οποιαδήποτε εντολή `setup-*` ή ορίστε
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` για τον διακομιστή. Η εγγραφή εκτελείται
με μια προειδοποίηση ότι δεν θα διατηρηθεί μετά την κατάργηση του container.

> **Προειδοποίηση ασφαλείας — προφίλ `cli` + προσάρτηση `docker.sock`.**
> Το προφίλ `cli` προσαρτά με bind mount το `/var/run/docker.sock`, ώστε το πρόγραμμα
> αυτόματης ενημέρωσης εντός του container να μπορεί να αναδημιουργήσει τη στοίβα μέσω του δαίμονα του κεντρικού συστήματος
> (το `src/lib/system/autoUpdate.ts` ελέγχει την ύπαρξη αυτού του socket και παραλείπει τη
> διαδρομή Docker όταν αυτό απουσιάζει). Αυτό το socket αποτελεί **όριο εμπιστοσύνης με δικαιώματα root
> στο κεντρικό σύστημα**: οτιδήποτε μπορεί να αποκτήσει πρόσβαση σε αυτό ελέγχει τον δαίμονα Docker του κεντρικού συστήματος ως
> root — μπορεί να δημιουργήσει, να επιθεωρήσει, να διακόψει και να καταργήσει οποιοδήποτε container στο κεντρικό σύστημα.
> Συνέπειες:
>
> 1. **Μην εκθέτετε ποτέ τη θύρα του προφίλ `cli` στο δίκτυο.** Δημοσιεύστε
>    τη στο `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — ένα προφίλ `cli` προσβάσιμο από το LAN μετατρέπει οποιαδήποτε απομακρυσμένη εκτέλεση κώδικα σε επίπεδο πίνακα ελέγχου σε
>    πλήρη παραβίαση του κεντρικού συστήματος.
> 2. **Μην προσαρτάτε πρόσθετους καταλόγους του κεντρικού συστήματος στο προφίλ `cli`.**
>    Το Docker socket μαζί με οποιαδήποτε επιπλέον προσάρτηση παρέχει στο container πλήρη
>    πρόσβαση ανάγνωσης/εγγραφής στο σύστημα αρχείων και στις ρυθμίσεις του κεντρικού σας συστήματος. Αν χρειάζεστε ένα εργαλείο για να
>    βλέπει ένα έργο, εκτελέστε το τοπικά με το εκτελέσιμο αρχείο CLI — μην το προσαρτάτε
>    στο container `cli`.
>
> Αν δεν χρειάζεστε αυτόματη ενημέρωση μέσα από το container, αφήστε απενεργοποιημένο το προφίλ `cli`
> (`COMPOSE_PROFILES=core,redis` ή κάτι συντομότερο). Τα άλλα προφίλ δεν
> προσαρτούν το Docker socket.
>
> Ανατρέξτε στο `docs/security/MITM-TPROXY-DECRYPT.md` (git· δεν μεταγλωττίζεται στο `/docs`) για το σχετικό μοντέλο απειλών
> γύρω από το MITM και στο `docs/security/SUPPLY_CHAIN.md` για την
> αλυσίδα προέλευσης των εκτελέσιμων αρχείων `codex`/`claude-code`/`droid`/`openclaw`.

## Redis Sidecar

Το OmniRoute βασίζεται στο Redis για την υποστήριξη του κατανεμημένου περιοριστή ρυθμού και της κοινόχρηστης cache. Η υπηρεσία `redis` ορίζεται **πάντα** στο `docker-compose.yml` (δεν περιορίζεται από κάποιο profile) και εκκινείται μαζί με οποιοδήποτε άλλο profile.

| Λεπτομέρεια                     | Τιμή                                        |
| ------------------------------- | ------------------------------------------- |
| Image                           | `redis:7-alpine`                            |
| Όνομα container                 | `omniroute-redis`                           |
| Εσωτερική θύρα                  | `6379`                                      |
| Θύρα host (παράκαμψη)           | `REDIS_PORT` (προεπιλογή: `6379`)           |
| Διεύθυνση bind host (παράκαμψη) | `REDIS_BIND_HOST` (προεπιλογή: `127.0.0.1`) |
| Volume                          | `omniroute-redis-data` → `/data`            |
| Έλεγχος υγείας                  | `redis-cli ping` (διάστημα 10s)             |

Σχετικές μεταβλητές περιβάλλοντος:

- `REDIS_URL` — συμβολοσειρά σύνδεσης που εισάγεται στην εφαρμογή (`redis://redis:6379` από προεπιλογή).
- `REDIS_PORT` — αντιστοίχιση θύρας στην πλευρά του host για το Redis container.
- `REDIS_BIND_HOST` — διεπαφή του host στην οποία δημοσιεύεται η θύρα. Η προεπιλογή είναι `127.0.0.1`.

> **Γιατί χρησιμοποιείται το loopback από προεπιλογή:** το sidecar εκτελείται χωρίς `requirepass` και τα
> containers της εφαρμογής συνδέονται σε αυτό μέσω του δικτύου compose (`redis:6379`) — η δημοσιευμένη θύρα
> υπάρχει μόνο για εργαλεία στην πλευρά του host (`redis-cli`, ένα τοπικό `npm run dev`). Η δημοσίευση στο
> `0.0.0.0` θα εξέθετε ένα Redis χωρίς έλεγχο ταυτότητας σε κάθε host του LAN σας. Εάν ορίσετε
> `REDIS_BIND_HOST=0.0.0.0`, προσθέστε επίσης το `--requirepass` στο `command:` της υπηρεσίας.

Η **απενεργοποίηση του Redis** δεν συνιστάται (ο περιοριστής ρυθμού θα υποβαθμιστεί σε εναλλακτική λειτουργία στη μνήμη). Εάν είναι απαραίτητο, αφαιρέστε/σχολιάστε το block της υπηρεσίας `redis:` στο `docker-compose.yml` ή ορίστε την κλιμάκωσή της στο μηδέν:

```bash
docker compose up -d --scale redis=0
```

## Compose Παραγωγής

Για ένα απομονωμένο στιγμιότυπο παραγωγής που εκτελείται παράλληλα με το περιβάλλον ανάπτυξης, χρησιμοποιήστε το `docker-compose.prod.yml`.

| Λεπτομέρεια                       | Τιμή                                                                                               |
| --------------------------------- | -------------------------------------------------------------------------------------------------- |
| Αρχείο                            | `docker-compose.prod.yml`                                                                          |
| Προεπιλεγμένη θύρα πίνακα ελέγχου | `PROD_DASHBOARD_PORT=20130` (αντιστοιχίζεται στην εσωτερική `${DASHBOARD_PORT:-20128}`)            |
| Προεπιλεγμένη θύρα API            | `PROD_API_PORT=20131`                                                                              |
| Image                             | `omniroute:prod` (δημιουργείται από το target `runner-cli`)                                        |
| Redis container                   | `omniroute-redis-prod` (`redis:8.6.2`, αποκλειστικό volume `redis-prod-data`)                      |
| Volume δεδομένων                  | `omniroute-prod-data` (ονομαστικό, διατηρείται μεταξύ αναδημιουργιών)                              |
| Έλεγχοι υγείας                    | `node healthcheck.mjs` + `redis-cli ping`, με το `depends_on` να εξαρτάται από την υγεία του Redis |

Τρόπος χρήσης:

```bash
# Δημιουργία και εκκίνηση του stack παραγωγής
docker compose -f docker-compose.prod.yml up -d --build

# Συνεχής προβολή των logs
docker compose -f docker-compose.prod.yml logs -f

# Τερματισμός (διατήρηση των volumes)
docker compose -f docker-compose.prod.yml down
```

Το stack παραγωγής εκτελείται παράλληλα με το compose ανάπτυξης (διαφορετικά ονόματα containers, θύρες και volumes), ώστε να μπορείτε να συνεχίζετε τις τοπικές επαναλήψεις ανάπτυξης ενώ το περιβάλλον παραγωγής παραμένει σε λειτουργία.

## Στάδια Dockerfile

Το αποθετήριο αποστέλλει ένα Dockerfile πολλαπλών σταδίων (`Dockerfile`). Εκτίθενται τέσσερα στάδια. επιλέξτε το σωστό `target` για την περίπτωση χρήσης σας.

| Στάδιο        | Εικόνα βάσης          | Σκοπός                                                                                                                                                                                                                                                                                                                                           |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `builder`     | `node:26-trixie-slim` | Εγκαθιστά deps (`npm ci --legacy-peer-deps`) και εκτελεί `npm run build` (Turbopack από προεπιλογή — βλ. πόρους χρόνου δημιουργίας παρακάτω)                                                                                                                                                                                                     |
| `runner-base` | `node:26-trixie-slim` | Χρόνος εκτέλεσης παραγωγής με την αυτόνομη έξοδο Next.js.** Δεν υπάρχει πάροχος CLIs πακέτο.**                                                                                                                                                                                                                                                   |
| `runner-cli`  | `runner-base`         | Προσθέτει `git`, `docker.io`, `docker-compose` και παγκόσμιο CLIs: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`.** Επιλέξτε αυτό για πρακτικές ροές εργασίας.**                                                                                                                                                             |
| `runner-web`  | `runner-base`         | Προσθέτει Playwright + ένα πρόγραμμα περιήγησης Chromium (`--with-deps`) για παρόχους περιόδων σύνδεσης ιστού: `gemini-web`, `claude-web`, `claude-turnstile`.** Επιλέξτε αυτό όταν χρησιμοποιείτε αυτούς τους παρόχους** — η απλή εικόνα αποτυγχάνει την ώρα του αιτήματος χωρίς αυτήν (δείτε τη σημείωση `-web` στην ενότητα Κανάλια έκδοσης). |

Δημιουργήστε έναν συγκεκριμένο στόχο με μη αυτόματο τρόπο:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Πόροι χρόνου κατασκευής

Τρία args build ελέγχουν το κόστος της σκηνής `builder`. Είναι μόνο χρόνο κατασκευής — `OMNIROUTE_MEMORY_MB` (παρακάτω) είναι ένα ξεχωριστό κουμπί χρόνου εκτέλεσης.

| Κατασκευή αργ               | Αθέτηση | Αποτέλεσμα                                                                                              |
| --------------------------- | ------- | ------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`     | `0` δημιουργεί με το webpack: χαμηλότερη μνήμη αιχμής, πιο αργή. `1` επιλέγει το Turbopack.             |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`  | Οροφή σωρού V8 (`--max-old-space-size`) για την ωοτοκία `next build`.                                   |
| `OMNIROUTE_BUILD_WORKERS`   | `2`     | Τροφοδοτεί `CIRCLE_NODE_TOTAL`; Στη συνέχεια προκύπτει `workers = N - 1` για συλλογή δεδομένων σελίδας. |

`OMNIROUTE_BUILD_WORKERS` είναι αυτό που πρέπει να σηκωθεί σε έναν μεγάλο οικοδόμο και αυτό που υποψιάζεται όταν πεθαίνει μια περιορισμένη κατασκευή** μετά** `✓ Compiled successfully`. Κάθε εργάτης δεδομένων σελίδας είναι η δική του διαδικασία, όπως και το ίδιο το γονικό `next build`. μια ζωντανή αναπαραγωγή VPS (έκδοση #7518) μέτρησε την κορυφή RSS κάθε διεργασίας σε ~ 4,5 GB ανεξάρτητα από τη σημαία `NODE_OPTIONS` heap (Turbopack μεταγλωττίζεται στη μνήμη native/Rust έξω από το σωρό V8). Η προεπιλογή του `2` (→ 1 εργαζόμενος, 2 διεργασίες συνολικά) έχει μέγεθος για τους δρομείς 16 GB / 4 vCPU που φιλοξενούνται στο GitHub που χρησιμοποιεί η διοχέτευση δημοσίευσης. Στο `8` (→ 7 εργαζόμενοι) αυτός ο δρομέας τελείωσε από τη μνήμη και το buildkit απέτυχε στο βήμα με `ResourceExhausted: ... cannot allocate memory`. `3` (→ 2 εργαζόμενοι) εξακολουθούσε να μην ταιριάζει όταν το RSS ανά διαδικασία μετρήθηκε απευθείας αντί να συναχθεί. `tests/unit/docker-build-memory-budget.test.ts` κάνει την αριθμητική σε σχέση με το μετρούμενο σχήμα και αποτυγχάνει εάν κάποιο από τα πόμολα ξεπεράσει τον δρομέα.

Turbopack μεταγλωττίζει στην εγγενή μνήμη Rust που ζει** εκτός** το σωρό V8, οπότε `OMNIROUTE_BUILD_MEMORY_MB` δεν το δεσμεύει. Σε έναν κεντρικό υπολογιστή με ανώτατο όριο μνήμης, η κατασκευή γίνεται SIGKILLed από το OOM killer χωρίς καθόλου κείμενο σφάλματος — απλά σταματά στο mid-`Creating an optimized production build`, το οποίο διαβάζεται σαν hang και όχι σαν εκτός μνήμης. Αυτός είναι ο λόγος για τον οποίο το `Dockerfile` είναι από προεπιλογή webpack (`OMNIROUTE_USE_TURBOPACK=0`), σε αντίθεση με `npm run dev` / `npm run build`, όπου το Turbopack είναι ο προεπιλεγμένος κώδικας: ένα γυμνό `docker build .` χωρίς build args (αυτό που εκτελούν η Railway και άλλοι κεντρικοί υπολογιστές με ένα κλικ) δεν πρέπει να πεθαίνει σιωπηλά σε ένα πρόγραμμα δημιουργίας με περιορισμένη μνήμη. Οι δημοσιευμένες εικόνες περνούν ήδη `OMNIROUTE_USE_TURBOPACK=0` ρητά στο `docker-publish.yml`. Σε ένα builder με άφθονο RAM, επιλέξτε το Turbopack για πιο γρήγορη κατασκευή:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` είναι ενεργοποιημένο, επομένως `next build` εκτελεί έναν γονέα** και** μια εργατική διαδικασία και το καθένα τιμά `OMNIROUTE_BUILD_MEMORY_MB` ξεχωριστά. Μέγεθος της οροφής του δοχείου πάνω από το διπλάσιο περίπου αυτής της τιμής, όχι μία φορά.

Μετρήθηκε σε αυτό το δέντρο (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Οροφή κοντέινερ | Αποτέλεσμα                         |
| --------- | --------------- | ---------------------------------- |
| Turbopack | 8 GiB / 16 GiB  | OOM-σκοτώθηκε και στα δύο, σιωπηλά |
| webpack   | 8 GiB           | οικοδόμηση εργάτη SIGKILLed        |
| webpack   | 12 GiB          | πέτυχε, κορυφώθηκε στο 11,1 GiB    |

### Προεπιλογές χρόνου εκτέλεσης

Προεπιλογές που εξάγονται από `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Συμπεριφορά μνήμης στο Docker:

- Η εικόνα ορίζει `OMNIROUTE_MEMORY_MB=1024` και αντλεί `NODE_OPTIONS=--max-old-space-size=1024` από αυτήν.
- Η πραγματική διαδικασία διακομιστή ξεκινά από τον αυτόνομο εκκινητή, ο οποίος διαβάζει `OMNIROUTE_MEMORY_MB` και προσαρτά `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Ο κόμβος χρησιμοποιεί την τελευταία επαναλαμβανόμενη τιμή `--max-old-space-size`, επομένως η ρύθμιση `OMNIROUTE_MEMORY_MB` ελέγχει το ενεργό όριο σωρού Docker.
- Επειδή η εικόνα την ορίζει πάντα, η εναλλακτική βαθμονομημένη μνήμη RAM του εκτοξευτή δεν εφαρμόζεται ποτέ στο Docker. Αυξήστε το ρητά για τον φόρτο εργασίας (πίνακας παρακάτω). `2048` είναι ακόμα πολύ μικρό για τον παράγοντα κωδικοποίησης `/v1/responses`.

### Runtime RAM για πράκτορες κωδικοποίησης

Η προεπιλογή 1 GiB Docker είναι ένας όροφος dashboard/light-chat, όχι ένα μέγεθος παραγωγής. Τα μεγάλα σώματα `POST /v1/responses` (εκατοντάδες μηνύματα, δεκάδες εργαλεία) διατηρούν πολλαπλά γραφήματα στη μνήμη κατά τη συμπίεση. Δύο επικαλυπτόμενα αιτήματα ~ 3 MiB / ~ 750k-token έχουν ματαιώσει το V8 σε** 12 GiB** old-space (`FATAL ERROR: Reached heap limit`) και επίσης χτύπησε ένα cgroup 16 GiB OOM. Δείτε [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Μέγεθος** cgroup `--memory` πάνω από το σωρό** Τα εγγενή buffer —, SQLite και τα ενδιάμεσα συμπίεσης βρίσκονται έξω από το V8.

| Φόρτος εργασίας                                   | `OMNIROUTE_MEMORY_MB`        | Δοχείο / cgroup            | Σημειώσεις                                                                                                   |
| ------------------------------------------------- | ---------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Ταμπλό, μια ελαφριά συνομιλία                     | `1024` (προεπιλογή εικόνας)  | ≥2 GiB                     |                                                                                                              |
| Ένας παράγοντας κωδικοποίησης (Claude/Codex/Grok) | `8192`                       | ≥10 GiB                    | Τυπικό `/v1/responses` μιας συνεδρίας                                                                        |
| Δύο ταυτόχρονα μακρά `/v1/responses`              | `10240`–`12288`              | ≥12–16 GiB                 | Μετρήθηκε αποβολή V8 σε σωρό ~ 12 GiB                                                                        |
| Τρία + παράλληλα μακρά πλαίσια                    | μην κάνετε σε μία διαδικασία | σειριακή / περισσότερα RAM | Η προεπιλεγμένη είσοδος βαρέων βαρών είναι 1 κατά την πτήση. ανεβάζοντάς το χωρίς RAM επαναφέρει την αποβολή |

`omniroute serve` σε γυμνό μέταλλο βαθμονομεί ~ 35% του RAM (σφιγκωμένο `[512, 4096]`) όταν `OMNIROUTE_MEMORY_MB` είναι** απενεργοποίηση** . Docker ορίζει πάντα `1024`, έτσι ώστε η βαθμονόμηση να μην εκτελείται ποτέ στην επίσημη εικόνα.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
```

## Κρίσιμες μεταβλητές περιβάλλοντος

Πέρα από τις προεπιλογές που τεκμηριώνονται στο [ENVIRONMENT.md](../reference/ENVIRONMENT.md), οι ακόλουθες μεταβλητές είναι οι σημαντικότερες κατά την εκτέλεση μέσω Docker:

| Μεταβλητή                     | Σκοπός                                                                                                                                                                                                                                                                                                                                                | Προεπιλογή                             |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Κοινόχρηστο μυστικό για τη γέφυρα WebSocket. **Απαιτείται σε περιβάλλον παραγωγής** — ορίστε το σε μια ισχυρή τυχαία συμβολοσειρά.                                                                                                                                                                                                                    | δεν έχει οριστεί (πρέπει να παρέχεται) |
| `REDIS_URL`                   | Συμβολοσειρά σύνδεσης για το backend περιορισμού ρυθμού / κρυφής μνήμης                                                                                                                                                                                                                                                                               | `redis://redis:6379`                   |
| `REDIS_PORT`                  | Θύρα στην πλευρά του κεντρικού υπολογιστή για το ενσωματωμένο κοντέινερ Redis                                                                                                                                                                                                                                                                         | `6379`                                 |
| `REDIS_BIND_HOST`             | Διεπαφή του κεντρικού υπολογιστή στην οποία δημοσιεύεται η θύρα του ενσωματωμένου Redis (loopback, εκτός εάν προσθέσετε AUTH)                                                                                                                                                                                                                         | `127.0.0.1`                            |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Διαδρομή του κεντρικού υπολογιστή που προσαρτάται στο προφίλ `cli` στη θέση `/workspace/omniroute` για ροές εργασίας αυτόματης ενημέρωσης                                                                                                                                                                                                             | `.` (τρέχων κατάλογος)                 |
| `OMNIROUTE_MEMORY_MB`         | Ανώτατο όριο σωρού Node κατά τον χρόνο εκτέλεσης για τον αυτόνομο διακομιστή Docker· παρακάμπτει την παραπάνω προεπιλογή της εικόνας. Πράκτορες προγραμματισμού: `8192`+ (δείτε [RAM χρόνου εκτέλεσης](#runtime-ram-for-coding-agents)).                                                                                                              | `1024`                                 |
| `DASHBOARD_PORT` / `API_PORT` | Παρακάμπτει τις εκτεθειμένες θύρες για τον πίνακα ελέγχου (20128) και το API (20129)                                                                                                                                                                                                                                                                  | `20128` / `20129`                      |
| `APP_BIND_HOST`               | Διεπαφή του κεντρικού υπολογιστή στην οποία το docker-compose δημοσιεύει τις θύρες πίνακα ελέγχου/API/live-WS. Με `REQUIRE_API_KEY=false` (η προεπιλογή), η τιμή `0.0.0.0` εκθέτει τον ανώνυμο διακομιστή μεσολάβησης `/v1` στο LAN — διευρύνετε την πρόσβαση μόνο με `REQUIRE_API_KEY=true` ή με έναν αντίστροφο διακομιστή μεσολάβησης μπροστά του. | `127.0.0.1`                            |
| `CLIPROXY_BIND_HOST`          | Διεπαφή του κεντρικού υπολογιστή στην οποία το docker-compose δημοσιεύει το sidecar `cliproxyapi` — ο τόμος δεδομένων του περιέχει τα διαπιστευτήρια παρόχων.                                                                                                                                                                                         | `127.0.0.1`                            |
| `OMNIROUTE_PLUGINS_DIR`       | Κατάλογος από τον οποίο εκτελεί ανάγνωση ο σαρωτής προσθέτων κατά τον χρόνο εκτέλεσης και στον οποίο εγκαθιστά τα πρόσθετα. Ορίστε τον όταν τα πρόσθετα προσαρτώνται μέσω bind mount: η προεπιλογή ακολουθεί το `HOME`, το οποίο μια εικόνα ενδέχεται να μην εξάγει.                                                                                  | `~/.omniroute/plugins`                 |
| `OMNIROUTE_BASE_PATH`         | Υποδιαδρομή URL όταν η εφαρμογή δημοσιεύεται πίσω από έναν αντίστροφο διακομιστή μεσολάβησης (π.χ. `/omniroute`)                                                                                                                                                                                                                                      | _(κενό = ρίζα)_                        |
| `NEXT_PUBLIC_BASE_URL`        | Δημόσια προέλευση προγράμματος περιήγησης, συμπεριλαμβανομένης της υποδιαδρομής (π.χ. `https://host/omniroute`)                                                                                                                                                                                                                                       | δεν έχει οριστεί                       |
| `PROD_DASHBOARD_PORT`         | Θύρα πίνακα ελέγχου στην πλευρά του κεντρικού υπολογιστή για το `docker-compose.prod.yml`                                                                                                                                                                                                                                                             | `20130`                                |
| `CLIPROXYAPI_PORT`            | Θύρα στην πλευρά του κεντρικού υπολογιστή για το sidecar `cliproxyapi`                                                                                                                                                                                                                                                                                | `8317`                                 |

## Αντίστροφος διακομιστής μεσολάβησης σε υποδιαδρομή (Traefik / nginx)

Next.js `basePath` μεταγλωττίζεται στο αυτόνομο πακέτο. OmniRoute καταγράφει την ψημένη τιμή σε ένα αρχείο φρουρού στη ρίζα της εφαρμογής (γραμμένο κατά τη διάρκεια `npm run build`, ανάγνωση από `scripts/docker/ensure-docker-base-path.mjs`) και τη συγκρίνει με `OMNIROUTE_BASE_PATH` όταν ξεκινά το κοντέινερ. Όταν διαφέρουν και η εικόνα έχει δημιουργηθεί για τη ρίζα τομέα, το σημείο εισόδου ξαναγράφει τις αυτόνομες δηλώσεις, τα ενσωματωμένα κυριολεκτικά `basePath`/`assetPrefix` (Επόμενο 16 αποδίδει SSR στοιχείο URLs από `assetPrefix` μόνο — το πρόγραμμα patcher αντικατοπτρίζει την υποδιαδρομή σε αυτό), το ψητό `/_next/static` στοιχείο προκαθορισμένου στοιχείου URLs (σελίδα-πελάτης) πελάτη `process.env` shim πριν από την εκτέλεση `node dev/run-standalone.mjs`.

### Σύνθεση κατασκευής (συνιστάται)

Ορίστε και τις δύο μεταβλητές στο `.env` και, στη συνέχεια, δημιουργήστε ξανά έτσι ώστε η εικόνα και ο χρόνος εκτέλεσης να συμφωνούν:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` προωθεί `OMNIROUTE_BASE_PATH` ως Docker build-arg και ως μεταβλητή περιβάλλοντος χρόνου εκτέλεσης.

### Προκατασκευασμένη εικόνα root + υποδιαδρομή χρόνου εκτέλεσης

Οι δημοσιευμένες εικόνες `cheaperinference/omniroute:*` δημιουργούνται για τη ρίζα τομέα. Μπορείτε ακόμα να ρυθμίσετε `OMNIROUTE_BASE_PATH` στο χρόνο εκτέλεσης. το δοχείο επιδιορθώνει το πακέτο μία φορά κατά την εκκίνηση. Συνδυάστε το με την αντίστοιχη δημόσια προέλευση:

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Διαμορφώστε τον αντίστροφο διακομιστή μεσολάβησης για την προώθηση του** γεμάτος** εξωτερική διαδρομή (μην αφαιρείτε το πρόθεμα). Το Traefik θα πρέπει να δρομολογήσει `PathPrefix(`/omniroute `)` στο κοντέινερ χωρίς `StripPrefix`, επομένως Next.js λαμβάνει `/omniroute/...` και εξυπηρετεί στοιχεία από `/omniroute/_next/...`.

Ο έλεγχος υγείας Docker ανιχνεύει το ελαφρύ τελικό σημείο του κύκλου ζωής `/healthz` με πρόθεμα το ενεργό `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` παραμένει διαθέσιμο για διαγνωστικά human/dashboard. για να κατευθύνετε το κοντέινερ HEALTHCHECK πίσω σε αυτό (για παράδειγμα για επιβολή βαθιάς υγείας), ορίστε `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Αυτό το μονοπάτι είναι α** βαθύς** ελέγξτε (σύνοψη παρακολούθησης DB + ) — κατάλληλο για το σπάνιο `HEALTHCHECK` του Docker εάν επιλέξετε ξανά, αλλά** δεν** για διαστήματα `livenessProbe` Kubernetes.

Για ενορχηστρωτές (Kubernetes, Nomad, κ.λπ.):

| Καθετήρας          | Προτιμώ                                                                 | Αποφεύγω                                                       |
| ------------------ | ----------------------------------------------------------------------- | -------------------------------------------------------------- |
| Ζωντάνια           | HTTP `GET /livez` ή TCP στην κύρια θύρα (`PORT`, προεπιλεγμένη `20128`) | `/api/monitoring/health` ως ζωντάνια                           |
| Ετοιμότητα         | HTTP `GET /healthz`                                                     | Σφιχτά timeouts που αντιμετωπίζουν το event-loop busy ως νεκρό |
| Βαθύ / μαύρο κουτί | `/api/monitoring/health`                                                | —                                                              |

`/healthz` αναφέρει τον κύκλο ζωής της διαδικασίας (`ok` / `starting` / `stopping`). `/livez` είναι μόνο διεργασίας (200 όποτε μπορεί να τρέξει ο χειριστής, δεν περιμένει για ετοιμότητα). Και οι δύο εξακολουθούν να εκτελούνται στον ίδιο βρόχο συμβάντων κόμβου ως χειρισμός αιτημάτων, επομένως η εργασία καταλόγου ή συμπίεσης συνδεδεμένη με CPU μπορεί να καθυστερήσει — busy ≠ νεκρό. Προτιμήστε TCP liveness εάν HTTP ανιχνεύει το χρονικό όριο. Πλήρης καθοδήγηση ανιχνευτή: [Οδηγός παρακολούθησης — συστάσεις ανιχνευτή Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose with Caddy (HTTPS Auto-TLS)

OmniRoute μπορεί να εκτεθεί με ασφάλεια χρησιμοποιώντας την αυτόματη παροχή SSL της Caddy. Βεβαιωθείτε ότι η εγγραφή DNS A του τομέα σας οδηγεί στο IP του διακομιστή σας.

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    container_name: omniroute
    restart: unless-stopped
    volumes:
      - omniroute-data:/app/data
    environment:
      - PORT=20128
      # Browser-facing origin for OAuth callbacks, dashboard links, and generated public URLs.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Internal server-to-server URL for scheduled jobs / self-fetches.
      - BASE_URL=http://omniroute:20128
      - AUTH_COOKIE_SECURE=true

  caddy:
    image: caddy:latest
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    command: caddy reverse-proxy --from https://your-domain.com --to http://omniroute:20128

volumes:
  omniroute-data:
```

Ο Caddy ορίζει τις τυπικές κεφαλίδες προώθησης για το κοντέινερ ανάντη. OmniRoute χρησιμοποιεί `NEXT_PUBLIC_BASE_URL` ως την κανονική δημόσια προέλευση για τις επιστροφές κλήσης OAuth και τους δημόσιους συνδέσμους που δημιουργούνται. Έγγραφα ελέγχου ταυτότητας στον πίνακα εργαλείων χρησιμοποιούν αιτήματα ίδιας προέλευσης συν προστασία CSRF δεσμευμένη σε περίοδο λειτουργίας. Ενεργοποιήστε `OMNIROUTE_TRUST_PROXY` μόνο για προηγμένες αναπτύξεις όπου θέλετε σκόπιμα OmniRoute να αντλεί τη δημόσια προέλευση από αξιόπιστες προωθημένες κεφαλίδες αντί για ρητή διαμόρφωση.

## Cloudflare Quick Tunnel

Η υποστήριξη του πίνακα ελέγχου για αναπτύξεις Docker περιλαμβάνει ένα **Cloudflare Quick Tunnel** με ένα κλικ στη διαδρομή `Dashboard → Endpoints`. Η πρώτη ενεργοποίηση πραγματοποιεί λήψη του `cloudflared` μόνο όταν χρειάζεται, εκκινεί ένα προσωρινό tunnel προς το τρέχον endpoint `/v1` και εμφανίζει το URL `https://*.trycloudflare.com/v1` που δημιουργήθηκε ακριβώς κάτω από το κανονικό δημόσιο URL σας.

Τα πάνελ tunnel των endpoint (Cloudflare, Tailscale, ngrok) μπορούν να εμφανίζονται ή να αποκρύπτονται από τη διαδρομή `Settings → Appearance` χωρίς να αλλάζει η ενεργή κατάσταση του tunnel.

### Σημειώσεις για τα tunnel

- Τα URL του Quick Tunnel είναι προσωρινά και αλλάζουν μετά από κάθε επανεκκίνηση.
- Τα Quick Tunnel δεν επαναφέρονται αυτόματα μετά από επανεκκίνηση του OmniRoute ή του container. Ενεργοποιήστε τα ξανά από τον πίνακα ελέγχου όταν χρειάζεται.
- Η διαχειριζόμενη εγκατάσταση υποστηρίζει επί του παρόντος Linux, macOS και Windows σε `x64` / `arm64`.
- Τα διαχειριζόμενα Quick Tunnel χρησιμοποιούν από προεπιλογή μεταφορά HTTP/2 για να αποφεύγονται οι ενοχλητικές προειδοποιήσεις προσωρινής μνήμης QUIC UDP σε περιορισμένα περιβάλλοντα container. Ορίστε `CLOUDFLARED_PROTOCOL=quic` ή `auto` εάν θέλετε διαφορετική μεταφορά.
- Τα Docker image περιλαμβάνουν τα ριζικά πιστοποιητικά CA του συστήματος και τα διαβιβάζουν στο διαχειριζόμενο `cloudflared`, αποτρέποντας αποτυχίες αξιοπιστίας TLS όταν το tunnel εκκινείται μέσα στο container.
- Ορίστε `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` εάν θέλετε το OmniRoute να χρησιμοποιεί ένα υπάρχον εκτελέσιμο αρχείο αντί να πραγματοποιήσει λήψη ενός νέου.

## Ετικέτες εικόνας

| Εικών                        | Ετικέτα  | Μέγεθος | Περιγραφή                                                |
| ---------------------------- | -------- | ------- | -------------------------------------------------------- |
| `cheaperinference/omniroute` | `latest` | ~ 250MB | Υψιστος** δημοσιευμένο** σταθερό SemVer (όχι git `main`) |
| `cheaperinference/omniroute` | `3.8.54` | ~ 250MB | Καρφιτσώστε αυτήν την κατηγορία ετικέτας για GitOps      |

Οι ίδιες εικόνες δημοσιεύονται σε τρία αποθετήρια, με τις ίδιες αναλύσεις ανά αρχιτεκτονική: `cheaperinference/omniroute` (Docker Hub, ο οργανισμός Cheaper Inference, από 3.8.53 και μετά), `ghcr.io/cheaper-inference/omniroute` και το legacy `diegosouzapw/omniroute`, το οποίο διατηρεί το ιστορικό έλξης του και εξακολουθεί να λαμβάνει κάθε κυκλοφορία. Οι υπάρχουσες αναπτύξεις `diegosouzapw/omniroute` συνεχίζουν να ενημερώνονται. η εναλλαγή του ονόματος της εικόνας είναι προαιρετική. Το παρακάτω κανάλι προέκδοσης `:next` / `:next-web` δημοσιεύεται μόνο σε `diegosouzapw/omniroute` και GHCR.

Μανιφέστο πολλαπλών πλατφορμών: `linux/amd64` + `linux/arm64` native (Apple Silicon, AWS Graviton, Raspberry Pi). Docker επιλέγει αυτόματα την αντίστοιχη αρχιτεκτονική. περάστε `--platform linux/amd64` εάν χρειάζεται να επιβάλετε εξομοίωση AMD64 σε κεντρικούς υπολογιστές ARM.

### Κανάλια κυκλοφορίας

OmniRoute δημοσιεύει ξεχωριστά κανάλια Docker για σταθερές εκδόσεις, δοκιμές ενεργών κλάδων κυκλοφορίας και εκδόσεις ανάπτυξης.

| Κανάλι                          | Πηγή                                      | Ευμετάβλητο                   | Συνιστώμενη χρήση                                                                                                                                 |
| ------------------------------- | ----------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | απελευθέρωση Signed/versioned             | Αμετάβλητος                   | Αναπτύξεις παραγωγής που καρφιτσώνουν μια ακριβή έκδοση                                                                                           |
| `:latest` / `:latest-web`       | Υψιστος** δημοσιευμένο** σταθερό SemVer   | Μεταβλητός σταθερός δείκτης   | Ακολουθεί σταθερές εκδόσεις** μετά** μια δουλειά δημοσίευσης SemVer κάνει —** δεν** παρακολουθήστε `main` ή ακυκλοφόρητες δεσμεύσεις `release/v*` |
| `:next` / `:next-web`           | Τρέχων προεπιλεγμένος κλάδος `release/v*` | Μεταβλητός δείκτης προέκδοσης | Δοκιμές επιδιορθώσεων που έχουν προσγειωθεί στον κλάδο ενεργής έκδοσης, αλλά δεν είναι ακόμη σε σταθερή έκδοση                                    |
| `:main` / `:main-web`           | κλαδί `main`                              | Μεταβλητός δείκτης ανάπτυξης  | Μόνο δοκιμές ανάπτυξης και ενοποίησης                                                                                                             |

#### Πάροχοι περιόδων Ιστού: οι εικόνες `-web`

Κάθε κανάλι παραπάνω διπλασιάζεται ως ετικέτα `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), που έχει δημιουργηθεί από το στάδιο `runner-web` — την ίδια εικόνα συν Playwright και ένα πρόγραμμα περιήγησης Chromium. Η απλή εικόνα αποστέλλεται** χωρίς** Χρώμιο; `gemini-web`, `claude-web` και `claude-turnstile` το χρειάζονται.

Η αποτυχία αναβάλλεται, όχι ο χρόνος εκκίνησης: αυτοί οι πάροχοι παραθέτουν τα μοντέλα τους και εμφανίζονται ως συνδεδεμένοι στον πίνακα εργαλείων και μόνο το πρώτο αίτημα αποτυγχάνει με

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Εάν χρησιμοποιείτε αυτούς τους παρόχους, τραβήξτε την ετικέτα `-web` του καναλιού στο οποίο βρίσκεστε ήδη στο — τίποτα άλλο δεν αλλάζει. Σε μια εγκατάσταση npm/CLI (χωρίς εικόνα Docker ), το ισοδύναμο κομμάτι που λείπει είναι το δυαδικό πρόγραμμα περιήγησης: εκτελέστε `npx playwright install chromium` στον κεντρικό υπολογιστή.

#### Χρήση του καναλιού προέκδοσης

Το κανάλι `next` αναδημιουργείται σε κάθε ώθηση στον τρέχοντα προεπιλεγμένο κλάδο `release/v*` και δημοσιεύεται τόσο για AMD64 όσο και ARM64. Τα παλαιότερα υποκαταστήματα συντήρησης δεν μπορούν να το αντικαταστήσουν. Το κανάλι παρέχει μια τραβήσιμη εικόνα για διορθώσεις που έχουν συγχωνευθεί στον κλάδο ενεργής απελευθέρωσης πριν αποκοπεί η επόμενη σταθερή ετικέτα.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Για το Docker Compose, παρακάμψτε την ετικέτα εικόνας που χρησιμοποιείται από το επιλεγμένο προφίλ και, στη συνέχεια, τραβήξτε και δημιουργήστε ξανά την υπηρεσία:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Ασφάλεια και επαναφορά

`next` είναι ένα κυμαινόμενο κανάλι προέκδοσης. Μπορεί να αλλάξει σε οποιαδήποτε ώθηση στον κλάδο ενεργής απελευθέρωσης και είναι** δεν υποστηρίζεται για παραγωγική χρήση** . Καρφιτσώστε τη σύνοψη εικόνας κατά την αξιολόγηση μιας συγκεκριμένης κατασκευής:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Πριν από τη δοκιμή, δημιουργήστε αντίγραφα ασφαλείας του τόμου δεδομένων OmniRoute ή του καταλόγου δεδομένων που είναι προσαρτημένο σε bind. Για επαναφορά, επαναφέρετε τη σταθερή έκδοση που χρησιμοποιήσατε προηγουμένως ή χωνέψτε και δημιουργήστε ξανά το κοντέινερ:

```bash
docker pull cheaperinference/omniroute:<stable-version>
docker compose up -d
```

Μια έκδοση διακλάδωσης δεν μπορεί ποτέ να μετακινήσει `latest`. μόνο μια κατάλληλη σταθερή σημασιολογική έκδοση μπορεί να προωθήσει τον σταθερό δείκτη. Οι εικόνες `next` διατηρούν την επιθεώρηση εικόνας απελευθέρωσης και μπλοκάρουν την πύλη κρίσιμης ευπάθειας.

**`latest` δεν αποτελεί εγγύηση νομίσματος για το git.** Οι συγχωνευμένες επιδιορθώσεις στο `main` ή στον ενεργό κλάδο `release/v*` είναι** δεν** σε `:latest` έως ότου δημοσιευτεί μια σταθερή εικόνα SemVer και η εργασία δημοσίευσης προωθεί `:latest` (ίδια σύνοψη με αυτήν SemVer). Εάν `latest` φαίνεται παγωμένο ενώ GitHub δείχνει ήδη την επιδιόρθωση, τραβήξτε `:next` για να δοκιμάσετε τον κλάδο απελευθέρωσης ή περιμένετε για την ετικέτα SemVer.

| θέλεις                                                                                             | Χρήση                                  |
| -------------------------------------------------------------------------------------------------- | -------------------------------------- |
| GitOps / παραγωγή που δεν πρέπει να παρασύρεται                                                    | Καρφίτσωμα `:X.Y.Z` (ή σύνοψη εικόνας) |
| Ακολουθήστε τους δημοσιευμένους στάβλους και αποδεχτείτε μια εκ νέου δημιουργία σε κάθε κυκλοφορία | `:latest`                              |
| Δοκιμή ακυκλοφόρητων δεσμεύσεων `release/v*`                                                       | `:next` (όχι παραγωγή)                 |
| Δοκιμή `main`                                                                                      | `:main` (όχι παραγωγή)                 |

## Ενημερώσεις του dashboard στο Docker

Ένα container από δημοσιευμένο image δεν μπορεί να αντικαταστήσει τον εαυτό του. Όταν το OmniRoute ανιχνεύει ότι εκτελείται μέσα σε
container (χωρίς checkout `.git` και χωρίς εγκατάσταση npm), το banner ενημέρωσης στο αρχικό dashboard εμφανίζει την
εντολή που πρέπει να εκτελεστεί στον host αντί για τις οδηγίες npm/git, μαζί με ένα κουμπί αντιγραφής:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

Το όνομα της υπηρεσίας προέρχεται από το `AUTO_UPDATE_SERVICE` (προεπιλογή `omniroute`, η υπηρεσία στο
`docker-compose.selfhost.yml`). Το `pull` μετακινεί μόνο ένα κυλιόμενο tag (`latest`, `next`)· με ένα σταθερά καθορισμένο
tag `:X.Y.Z`, επεξεργαστείτε πρώτα το tag.

### Ενημερώσεις με ένα κλικ μέσω αρχείου ενεργοποίησης στον host

Για να συνεχίσει να λειτουργεί το **Ενημέρωση τώρα** χωρίς προσάρτηση του `/var/run/docker.sock` (η οποία δίνει στο container
δικαιώματα root στον host — δείτε την παραπάνω προειδοποίηση για το προφίλ `cli`), ορίστε το `DOCKER_UPDATE_TRIGGER_FILE` στην
υπηρεσία OmniRoute και εκτελέστε έναν watcher στον host:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

Η διαδρομή πρέπει να βρίσκεται μέσα στο `DATA_DIR` (οι σχετικές τιμές επιλύονται ως προς αυτό)· οτιδήποτε άλλο
απορρίπτεται. Στη συνέχεια, το **Ενημέρωση τώρα** γράφει `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` σε αυτό το
αρχείο, αποκρίνεται με `202` και το dashboard ελέγχει περιοδικά το `/api/system/version` μέχρι να ενεργοποιηθεί η νέα έκδοση
και να επαναφορτωθεί. Το OmniRoute δεν εκτελεί ποτέ εντολή shell ή Docker σε αυτήν τη λειτουργία. Όπως και κάθε ενέργεια
ενημέρωσης, το αίτημα γίνεται αποδεκτό μόνο από clients loopback/LAN.

Ένας κατάλογος δεδομένων προσαρτημένος μέσω bind mount παρέχει στον host μια σταθερή διαδρομή προς παρακολούθηση. Ενδεικτικά units `systemd`
(προσαρμόστε το `/srv/omniroute` στον κατάλογο που περιέχει το αρχείο compose και το `data/`):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=Παρακολούθηση για αιτήματα ενημέρωσης από το dashboard του OmniRoute

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=Λήψη και επαναδημιουργία του container OmniRoute

[Service]
Type=oneshot
WorkingDirectory=/srv/omniroute
ExecStartPre=/usr/bin/rm -f /srv/omniroute/data/update/docker-update.request
ExecStart=/bin/sh -c 'docker compose pull omniroute || (sleep 15 && docker compose pull omniroute)'
ExecStart=/usr/bin/docker compose up -d --force-recreate omniroute
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now omniroute-update.path
```

Η υπηρεσία αφαιρεί το αίτημα πριν από το pull, ώστε μια αποτυχημένη εκτέλεση να μην επαναλαμβάνεται επ' αόριστον. Χωρίς το
`DOCKER_UPDATE_TRIGGER_FILE`, το dashboard διατηρεί τη χειροκίνητη ροή εντολών.

## Διαθεσιμότητα: το προεπιλεγμένο SQLite είναι single-replica

Stock Docker / Kubernetes OmniRoute είναι** μία διαδικασία Node + μία SQLite writer** . Η υψηλή διαθεσιμότητα είναι** δεν υποστηρίζεται** σε αυτή την τοπολογία.

| Περιορισμός                           | Συνέπεια                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Μοναδικός συγγραφέας                  | Κάνω** δεν** εκτελέστε πολλαπλά αντίγραφα στο ίδιο αρχείο SQLite. Αυτό διαφθείρει το DB.                                                                                                                                                                                                                                                                                                                                                |
| Recreate / restart / HEALTHCHECK kill | **Πλήρης διακοπή λειτουργίας** του SSE κατά τη διάρκεια της πτήσης , των περιόδων λειτουργίας του πίνακα ελέγχου και της κατάστασης στη μνήμη. Κάθε συνδεδεμένος πελάτης πέφτει. Τα νέα αιτήματα κατά τη διάρκεια του παραθύρου κενού τελικού σημείου λαμβάνουν αντίστροφο διακομιστή μεσολάβησης**`502 Bad Gateway: Unknown error`** , όχι OmniRoute JSON — οι πελάτες δεν μπορούν να το ξεχωρίσουν από μια αποτυχία παρόχου (#11015). |
| Ίδιος βρόχος συμβάντων με `/healthz`  | Ένας απασχολημένος κατάλογος ή ένα τσιμπούρι συμπίεσης μπορεί να καθυστερήσει τους ανιχνευτές. ένα σύντομο χρονικό όριο στη συνέχεια επανεκκινεί το** μόνο** πανομοιότυπο.                                                                                                                                                                                                                                                              |

**Μήτρα ανιχνευτή** (δείτε επίσης [συστάσεις ανίχνευσης Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ):

| Καθετήρας        | Στόχος                                                     | Μην χρησιμοποιείτε                                             |
| ---------------- | ---------------------------------------------------------- | -------------------------------------------------------------- |
| Ζωντάνια         | TCP σε `PORT` (προεπιλογή `20128`), ή soft HTTP `/healthz` | `/api/monitoring/health`                                       |
| Ετοιμότητα       | HTTP `GET /healthz`                                        | Σφιχτά timeouts που αντιμετωπίζουν το event-loop busy ως νεκρό |
| Βαθιά / άνθρωποι | `/api/monitoring/health`                                   | Αυτοματοποιημένη ζωντάνια Kubelet                              |

**Αναβαθμίσεις:** περιμένετε να πέσει κάθε συνεδρία. Αποστραγγίστε πελάτες εάν μπορείτε. δεν υπάρχει κυλιόμενη ενημέρωση στο προεπιλεγμένο SQLite. Η σύνθεση `restart: unless-stopped` συν Docker `HEALTHCHECK` θα αντικαταστήσει επίσης τη μοναδική διαδικασία όταν το δοχείο είναι Ανθυγιεινό — ίδια ακτίνα έκρηξης.

Έτοιμες εκδηλώσεις και ένα γράφημα Helm ζωντανά σε `deploy/kubernetes/` και `deploy/helm/omniroute/` — δείτε τον [οδηγό ανάπτυξης Kubernetes](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

Απόσπασμα Kubernetes για α** ενιαίο αντίγραφο** (Απαιτείται η αναδημιουργία, μην ανεβάσετε `replicas` σε ένα αρχείο SQLite ):

```yaml
spec:
  replicas: 1
  strategy:
    type: Recreate
  template:
    spec:
      terminationGracePeriodSeconds: 90
      containers:
        - name: omniroute
          lifecycle:
            preStop:
              exec:
                command: ["/bin/sleep", "15"]
          readinessProbe:
            httpGet:
              path: /healthz
              port: 20128
            periodSeconds: 5
          livenessProbe:
            tcpSocket:
              port: 20128
            periodSeconds: 20
```

Ο ύπνος `preStop` επιτρέπει στο Kube να ρίχνει τα τελικά σημεία της υπηρεσίας πριν από SIGTERM** νέος** η κυκλοφορία σταματά να χτυπά τη διαδικασία θανάτου. `/v1/responses` SSE κατά την πτήση αποστραγγίζεται έως `SHUTDOWN_TIMEOUT_MS` (προεπιλογή 30 δευτ.) μέσω βαρέων βαρών μισθώσεων εισδοχής (#11015). Τα νέα αιτήματα που εξακολουθούν να φθάνουν στη διαδικασία λαμβάνουν `503` + `Retry-After: 5`. Η Επαναδημιουργία κενού τελικού σημείου έως ότου η αντικατάσταση είναι έτοιμη παραμένει μια δύσκολη διακοπή λειτουργίας — αυτή είναι η τοπολογία SQLite και όχι μια εσφαλμένη ρύθμιση παραμέτρων ανιχνευτή.

Το εξωτερικό Postgres / multi-writer HA είναι** δεν** μια τεκμηριωμένη διαδρομή αποθεμάτων. Εάν χρειάζεστε HA, κρατήστε ένα μόνο αντίγραφο ή εκτελέστε μια τοπολογία που το έργο έχει δοκιμάσει και τεκμηριώσει ξεχωριστά. Το έργο Postgres/MySQL ζει στο [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Μέχρι να αποσταλεί, ο μόνος υποστηριζόμενος τρόπος πολλαπλασιασμού** μεγάλο** Η χωρητικότητα `/v1/responses` είναι N ανεξάρτητες διεργασίες (επόμενη ενότητα), όχι `replicas > 1` σε έναν τόμο.

## Scale-out: N ανεξάρτητες διαδικασίες

### ιδιοκτησία εναλλαγής διακριτικού Codex

Τα αντίγραφα ενός λογαριασμού Codex δεν πρέπει να καταναλώνουν ανεξάρτητα το διακριτικό ανανέωσης μιας χρήσης. Σε περιπτώσεις που καταναλώνουν μόνο συγχρονισμένα διαπιστευτήρια, ορίστε `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (ψευδώνυμο `cx`). Αφήστε το χωρίς ρύθμιση στον κάτοχο μεμονωμένης εναλλαγής. Κάθε διαδικασία χρειάζεται ακόμα το δικό της `DATA_DIR`. αυτή η επιλογή δεν μοιράζεται SQLite ούτε παρέχει συγχρονισμό διακριτικών ή κατανεμημένη κλειδαριά.

Το παθητικό στιγμιότυπο ξαναδιαβάζει τη σύνδεση όταν χρειάζεται ανανέωση και υιοθετεί μόνο ένα διαφορετικό διακριτικό πρόσβασης που δεν έχει λήξει. Διαφορετικά, η ανανέωση απενεργοποιείται χωρίς να λήξει ή να απενεργοποιηθεί η σύνδεση ή να μετρηθεί η αποτυχία του διακόπτη ανανέωσης. Οι πραγματικές αποτυχίες ελέγχου ταυτότητας ανάντη εξακολουθούν να χρησιμοποιούν κανονική λογιστική αποτυχίας, εκθετική καθυστέρηση και το κανονικό σφάλμα πελάτη. Η απενεργοποίηση του λογαριασμού παραμένει μόνιμη. Συγχρονίστε τα περιστρεφόμενα διακριτικά του κατόχου προτού λήξουν τα διακριτικά πρόσβασης (το προεπιλεγμένο δυνητικό δικαίωμα προληπτικής ανανέωσης είναι πέντε λεπτά) ή εισαγάγετε ξανά το αρχείο εξουσιοδότησης Codex. Οι παθητικές εισαγωγές αποθηκεύουν τα παρεχόμενα διακριτικά χωρίς να τα επικυρώνουν στο τελικό σημείο του διακριτικού. Η μη αυτόματη ανανέωση dashboard/API επιστρέφει `409 refresh_disabled`; Οι νέες συνδέσεις OAuth παραμένουν αμετάβλητες. Δείτε [την αναφορά περιβάλλοντος](../reference/ENVIRONMENT.md#passive-codex-token-refresh).

Η διαδικασία ενός κόμβου είναι** ένας σωρός V8** . Δύο αλληλοκαλυπτόμενα ~ 3 MiB / ~ 750k-token κωδικοποιητικός παράγοντας `POST /v1/responses` (RTK + Caveman) ματαιώνουν αυτόν τον σωρό σε ~ 12 Gi (`FATAL ERROR: Reached heap limit`) και μπορούν OOM μια cgroup 16 Gi. Δείτε [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Αυτή η μέτρηση είναι α** μνήμη-προϋπολογισμός** προειδοποίηση, δεν είναι προϊόν hard-max δύο ταυτόχρονων μακρών `/v1/responses`. Η βαριά αποδοχή συνομιλίας περιορίζεται από έναν προϋπολογισμό byte απορρόφησης που προέρχεται αυτόματα (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) με μέγεθος από το ίδιο ανώτατο όριο V8/cgroup — παρακάμπτοντάς τον προς τα πάνω (ή ορίζοντας το όριο πλήθους αιτημάτων `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` παλαιού τύπου) σε μια διαδικασία ήδη μεγέθους επαναφέρει τη ματαίωση. Οι μικρές συνομιλίες, `/healthz`, `/v1/models` και MCP είναι** δεν** σε αυτό το καπάκι.

### Μία διαδικασία: περισσότερα από δύο μεγάλα `/v1/responses`

ΕΝΑ** υγιής** διεργασία (σωρός κάτω από `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, προεπιλογή `0.75`)** Μάιος** εκτέλεση περισσότερων από δύο ταυτόχρονων μεγάλων `POST /v1/responses` όταν ο προϋπολογισμός byte κατά τη διάρκεια της πτήσης (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) έχει ακόμα χώρο. Τα σώματα στο ή πάνω από `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (προεπιλογή 256 KiB) λαμβάνουν την ίδια μίσθωση βαρέων βαρών με τα βαριά αιτήματα δομής και χρησιμοποιούν το ίδιο [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` escape (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Δεκάδες ταυτόχρονες long SSE πελάτες (οι χειριστές χρειάζονται συχνά 40–50) είναι α** μνήμη-προϋπολογισμός** ερώτηση — μέγεθος σωρού + primary/headroom υποδοχές + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — όχι ένα σκληρό όριο προϊόντος «μέγιστο 2». Ένας σωρός υπό πίεση εξακολουθεί να χύνεται με `503` με δυνατότητα επανάληψης δοκιμής, οπότε το #7849 δεν επιστρέφει.

Να** πολλαπλασιάζω τους σωρούς** (ανεξάρτητοι V8 παλιοί χώροι)** σήμερα** :

| Κάνω                                                                                                                                                                                  | Μη                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Τρέξιμο** N containers/pods** , το καθένα με το δικό του** ίδιος** `DATA_DIR` / τόμος                                                                                                 | Ρυθμίστε `replicas > 1` σε ένα αρχείο SQLite                                          |
| Μέγεθος βαρύ + κατά τη διάρκεια της πτήσης με υγιεινό χώρο κεφαλής από προϋπολογισμό σωρού / byte κατά την πτήση. 1–2 είναι η συντηρητική προεπιλογή #7849, όχι μέγιστο σκληρό προϊόν | Δώστε σε μια διαδικασία 8 × RAM και ένα απεριόριστο όριο μέτρησης                     |
| Προαιρετικά: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` για** μετρητές κοινόχρηστων ποσοστώσεων**                                                                           | Αντιμετωπίστε Redis ως κοινόχρηστο SQLite — δεν είναι                                 |
| Αντιγράψτε τα μυστικά του παρόχου σε κάθε παρουσία (ή αποδεχτείτε διαμερισμένους πίνακες εργαλείων)                                                                                   | Αναμένετε έναν πίνακα ελέγχου / ένα αρχείο καταγραφής κλήσεων σε όλες τις περιπτώσεις |
| Μπροστά με οποιοδήποτε εξισορροπητή φορτίου. κολλώ με κλειδί API ή συνεδρία είναι αρκετό                                                                                              | Απαιτείται ένα ενδιάμεσο λογισμικό με επίγνωση μεγέθους συγκεκριμένου προμηθευτή      |

Η συνάφεια σύνδεσης με λογαριασμό μπορεί επίσης να κοινοποιηθεί μέσω Redis: ορίστε `OMNIROUTE_SESSION_AFFINITY_STORE=redis` και `REDIS_URL` σε κάθε διαδικασία, με την ίδια `REDIS_KEY_PREFIX` και μια θετική ρύθμιση `sessionAffinityTtlMs`. Οι καρφίτσες επιλύουν κατακερματισμένες ταυτότητες λογαριασμού χρήσης στην κατάλληλη τοπική σύνδεση κάθε διεργασίας, επομένως οι λογαριασμοί OAuth με μεταδεδομένα ταυτότητας που ταιριάζουν δεν χρειάζεται να έχουν αντίστοιχη σύνδεση IDs. Οι γνωστές ταυτότητες λογαριασμών υπερισχύουν έναντι των αντιφατικών τοπικών IDs στην ανάλυση καρφιτσών και στη φυλασσόμενη έξωση. τα αρχεία χωρίς ταυτότητα (ή οι καλούντες έξωσης χωρίς ταυτότητα) διατηρούν το κληροδοτημένο ID guard. Οι λογαριασμοί χωρίς σταθερή ταυτότητα χρήσης εξακολουθούν να απαιτούν αντιστοίχιση IDs. Τα σφάλματα Redis ή οι κλήσεις άνω των 100 ms επιστρέφουν στο τοπικό SQLite. Κάθε κατάστημα συνάφειας Redis περιορίζει τις εκκρεμείς λειτουργίες στο 8, παρακάμπτει Redis αμέσως όταν είναι γεμάτο και απελευθερώνει υποδοχές μόνο όταν η υποκείμενη εργασία διευθετηθεί, όχι στην προθεσμία του καλούντος. Κατά τη διάρκεια μιας διακοπής Redis δεν υπάρχει κοινή αλήθεια: κάθε παρουσία επιστρέφει στη δική της τοπική συνάφεια, οι περίοδοι σύνδεσης μπορεί να καρφιτσωθούν ξανά μία φορά ανά παρουσία και οι εμφανίσεις μπορεί να αποκλίνουν. Η κολλητικότητα συγκλίνει εκ νέου μέσω του Redis όταν ανακτήσει. Το χρονικό όριο περιορίζει την αναμονή, όχι ένα σταλμένο EVAL, το οποίο μπορεί να προσγειωθεί μετά από εναλλακτική. Οι εγγραφές δρομολόγησης συγκρίνουν την ακριβή τιμή που παρατηρείται από την απόφαση δρομολόγησης, όχι μια νέα ανάγνωση χρόνου μετάλλαξης. μια παρατηρούμενη παρατήρηση ή μια εναλλακτική παρατήρηση SQLite συγκρίνεται ως απόν κλειδί Redis. Οι απαρχαιωμένες ακίδες αντικαθίστανται σε ένα CAS, επομένως μια καθυστερημένη εντολή δεν μπορεί να αντικαταστήσει ή να διαγράψει μια νεότερη, διαφορετική καρφίτσα. Redis διαβάζει ατομικά επιστρέφει την τιμή και τον υπόλοιπο διακομιστή TTL. Το θετικό PTTL (ή χωρίς λήξη) καθορίζει τη ζωντάνια, όχι τη χρονική σήμανση JSON του συγγραφέα ή το ρολόι του αναγνώστη. Τα τοπικά στιγμιότυπα αντιστοιχίζουν το υπόλοιπο TTL σε μια τοπική προθεσμία. Τα υπάρχοντα κλειδιά JSON παραμένουν αναγνώσιμα και τα ακατέργαστα byte τους διατηρούνται για CAS. Redis είναι η μόνη πηγή αλήθειας ενώ απαντά. Τα επιβεβαιωμένα κοινόχρηστα upserts, τα αγγίγματα και οι διαγραφές αφαιρούν την τοπική καταχώριση, μην την εγκαθιστάτε ή ανανεώνετε ποτέ. Το SQLite στη διαδρομή Redis κρατά μόνο τις εναλλακτικές αποφάσεις αυτής της παρουσίας από σφάλματα Redis, χρονικά όρια ή κορεσμό αποδοχής, με όριο TTL όπως πριν. Μια τοπική καρφίτσα που λείπει σε μια μεταγενέστερη διακοπή κοστίζει μια νέα επιλογή (μία αστοχία προσωρινής μνήμης), όχι έναν λανθασμένο λογαριασμό ή έναν λογαριασμό που έχει αποβληθεί. Τα απορριφθέντα upserts επιστρέφουν ατομικά τον κοινόχρηστο νικητή και το υπόλοιπο TTL του: η κανονική επιλογή ελέγχει ξανά την αντιστοιχισμένη τοπική προθεσμία και χρησιμοποιεί έναν ακόμη ζωντανό κατάλληλο νικητή, αγγίζοντας τη χρήση και την καταγραφή για αυτόν τον λογαριασμό χωρίς άλλη κοινόχρηστη εγγραφή. Εάν δεν είναι διαθέσιμη, η επιλογή διατηρεί τον τοπικό υποψήφιο, αφήνει αμετάβλητη την κοινόχρηστη καρφίτσα και εκπέμπει ένα μήνυμα εντοπισμού σφαλμάτων. Το απορριφθέν CAS δεν γράφει SQLite. Τα σφάλματα Redis, τα χρονικά όρια ή ο κορεσμός αποδοχής εφαρμόζουν την υπάρχουσα τοπική λειτουργία. Εάν η απάντηση μιας απεσταλμένης μετάλλαξης φτάσει μετά τη λήξη του χρονικού ορίου (αποδοχή, απόρριψη ή σφάλμα), μια σύγχρονη σύγκριση και διαγραφή ακριβούς σειριακής τιμής καταργεί μόνο την εναλλακτική σειρά χρονικού ορίου λήξης ίδιας byte. Δεν υπάρχει καμία αναμονή μεταξύ αυτής της σύγκρισης και της διαγραφής. διατηρείται νεότερη γραφή διακοπής. Η φυλασσόμενη έξωση αφαιρεί την τοπική καρφίτσα του αποτυχημένου λογαριασμού, ακόμη και με Redis απενεργοποιημένο και τον καθαρίζει ξανά μετά από επιβεβαιωμένη κοινή εξαγωγή. Σε εκκρεμείς προηγούμενες κοινόχρηστες απαντήσεις δεν είναι δυνατή η επαναφορά ενός τοπικού pin που έχει αφαιρεθεί, επειδή οι κοινές επιτυχίες δεν γράφουν ποτέ SQLite. Μια εναλλακτική λύση αργότερα μπορεί να επαναφέρει έναν λογαριασμό. μια μετέπειτα αποδεκτή κοινόχρηστη εγγραφή υπάρχει μόνο στο Redis. Οι αστοχίες Redis δεν συμβουλεύονται την τοπική εναλλακτική κατάσταση. Με το πρόγραμμα οδήγησης απενεργοποιημένο, οι καρφίτσες που έχουν επιλεγεί πρόσφατα διατηρούν το παλιό σχήμα SQLite JSON τεσσάρων πεδίων. Μόνο η δρομολόγηση Redis προσθέτει την κατακερματισμένη ταυτότητα λογαριασμού. Οι προαναφερθείσες ακίδες ελέγχονται ξανά στο όριο λήξης τους. Η επιλογή μη μίσθωσης Redis ξαναδιαβάζει το κατάστημα, αλλά ο σύγχρονος σχεδιασμός μίσθωσης μπορεί να χρησιμοποιήσει μια καρφίτσα που αφαιρείται μεταξύ της προφόρτωσης και του προγραμματισμού (ένα αποδεκτό παράθυρο βέλτιστης προσπάθειας). Μια δέσμευση μίσθωσης δεν μπορεί να αλλάξει λογαριασμούς μετά από μια διαρκή αξίωση: σε περίπτωση που απορρίφθηκε, διατηρεί τον υποψήφιο που έχει διεκδικηθεί μόνο για αυτό το αίτημα και αφήνει ανέγγιχτο τον κοινόχρηστο νικητή, επομένως η συμφωνία μεταξύ των περιπτώσεων περιορίζεται σε αυτήν τη διαδρομή. Ο υπόλοιπος πίνακας εξακολουθεί να ισχύει: αυτό δεν μοιράζεται την κολλώδη συνεδρία συνδυασμού, τις εγγενείς πινέζες στροφής Codex, τους σηματοφόρους λογαριασμού, τα κλείδωμα, τα όρια δαπανών, τη διαμόρφωση ή τα αρχεία καταγραφής κλήσεων.

Υλικό: ανά περίπτωση το ταυτόχρονο μακρύ `/v1/responses` είναι α** μνήμη-προϋπολογισμός** ερώτηση (σωρό + inflight-byte / #10110). `N` ανεξάρτητο `DATA_DIR` s εξακολουθεί να πολλαπλασιάζει σωρούς: ο κεντρικός RAM πρέπει να καλύπτει `N × cgroup`, όχι "ένα 16 Gi pod με N = 8." Ποτέ μην `replicas > 1` σε ένα αρχείο SQLite.

Συνθέστε σκίτσο (δύο σωρούς, δύο τόμους — όχι `deploy.replicas: 2`):

```yaml
services:
  omniroute-a:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-a-data:/app/data]
    ports: ["20128:20128"]
  omniroute-b:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-b-data:/app/data]
    ports: ["20138:20128"]
volumes:
  omniroute-a-data:
  omniroute-b-data:
```

Η πυκνότητα κατά τη διαδικασία (συμπίεση από την απομόνωση HTTP ) είναι [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Ένα λογικό σύμπλεγμα σε κοινόχρηστη ανθεκτική κατάσταση είναι [το #8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Περιφερειακά σφάλματα του Gemini μέσα στο Docker

Το Google AI Studio / Gemini API μπορεί να επιστρέψει HTTP 400 με FAILED_PRECONDITION και
`User location is not supported for the API use.` Ένα επιτυχημένο αίτημα στον κεντρικό υπολογιστή
δεν αποδεικνύει ότι το container χρησιμοποιεί την ίδια εξερχόμενη διαδρομή. Η σειρά DNS,
η συνδεσιμότητα IPv4/IPv6, η δρομολόγηση VPN και οι διαμορφωμένοι διακομιστές proxy μπορεί να διαφέρουν. Ελέγξτε
τις [υποστηριζόμενες περιοχές της Google](https://ai.google.dev/gemini-api/docs/available-regions),
καθώς και την πραγματική διαδρομή σύνδεσης· αυτό το σφάλμα από μόνο του δεν υποδεικνύει εσφαλμένο API key.

### Προτιμήστε έναν proxy συγκεκριμένο για τη σύνδεση

Χρησιμοποιήστε τη [διαμόρφωση proxy ανά σύνδεση](../ops/PROXY_GUIDE.md#4-level-proxy-system) του OmniRoute
για την επηρεαζόμενη σύνδεση Gemini και, στη συνέχεια, επαναλάβετε το **Test Connection** και ένα μικρό αίτημα
με το ίδιο μοντέλο. Έτσι, η αλλαγή δρομολόγησης περιορίζεται στη συγκεκριμένη σύνδεση. Επαληθεύστε
ότι ο proxy είναι προσβάσιμος από το container και ότι η σύνδεση πράγματι τον επιλέγει.
Η αλλαγή της διαδρομής δεν εγγυάται ότι πληρούνται οι περιφερειακές προϋποθέσεις της υπηρεσίας upstream.

### Συγκρίνετε τη δικτύωση του κεντρικού υπολογιστή και του container

Διατηρήστε πανομοιότυπα το κλειδί, το μοντέλο και το αίτημα όταν συγκρίνετε αποτελέσματα με έλεγχο ταυτότητας· ποτέ
μην επικολλάτε διαπιστευτήρια, κωδικούς πρόσβασης proxy ή πλήρεις κεφαλίδες εξουσιοδότησης σε ένα issue.
Αρχικά, εξετάστε ποιες οικογένειες διευθύνσεων παρέχει ο resolver του λειτουργικού συστήματος, χρησιμοποιώντας την ίδια εντολή
στον κεντρικό υπολογιστή και μέσα στο container:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Αντικαταστήστε το `omniroute` με την υπηρεσία που εκτελείτε (για παράδειγμα, `omniroute-web`). Αυτές
οι εντολές εμφανίζουν οικογένειες διευθύνσεων χωρίς διαπιστευτήρια ή διευθύνσεις IP. Η επιστροφή της τιμής `6`
δείχνει μόνο ένα αποτέλεσμα DNS IPv6: **δεν** αποδεικνύει ότι υπάρχει λειτουργική διαδρομή IPv6 ή πρόσβαση στο API.
Όπου είναι εγκατεστημένο το `curl`, συγκρίνετε το `curl -4 -I https://generativelanguage.googleapis.com`
με το `curl -6 -I https://generativelanguage.googleapis.com` και στα δύο περιβάλλοντα.
Μια απόκριση HTTP αποδεικνύει συνδεσιμότητα για τη συγκεκριμένη δοκιμή, ακόμη και αν πρόκειται για σφάλμα χωρίς έλεγχο
ταυτότητας· μόνο το αίτημα μοντέλου με έλεγχο ταυτότητας ελέγχει την καταλληλότητα πρόσβασης στο Gemini.

### Εναλλακτική λύση σε επίπεδο κεντρικού υπολογιστή: λειτουργικό IPv6 και πολιτική resolver

Ο αναφέρων του [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) επανέφερε
την πρόσβαση στο περιβάλλον του ενεργοποιώντας το IPv6 για τα container και αλλάζοντας την επιλογή
διευθύνσεων του glibc. Αντιμετωπίστε αυτήν τη λύση ως εναλλακτική που εξαρτάται από το συγκεκριμένο περιβάλλον. Επιβεβαιώστε ότι λειτουργούν
το IPv6 του κεντρικού υπολογιστή, η εξερχόμενη κίνηση/δρομολόγηση του container και οι κανόνες του firewall πριν προσαρμόσετε τις προτιμήσεις του resolver.
Μια ιδιωτική διεύθυνση ULA από μόνη της δεν αποδεικνύει δημόσια συνδεσιμότητα IPv6.

Για υπηρεσίες που είναι ήδη συνδεδεμένες στο προεπιλεγμένο δίκτυο του Compose, αυτό το τμήμα ενεργοποιεί
το IPv6 σε εκείνο το δίκτυο· διατηρήστε τις υπόλοιπες ρυθμίσεις της υπηρεσίας, τις θύρες, τους τόμους και τη διαμόρφωσή σας:

```yaml
networks:
  default:
    enable_ipv6: true
```

Για ένα επώνυμο δίκτυο, ενεργοποιήστε το στο δίκτυο στο οποίο συνδέεται πραγματικά η υπηρεσία. Το Docker μπορεί
να εκχωρήσει ένα υποδίκτυο ULA· επιλέξτε ένα ρητό, μη επικαλυπτόμενο υποδίκτυο μόνο όταν το απαιτεί το δίκτυό σας.
Δείτε τις ενότητες [Δικτύωση IPv6 του Docker](https://docs.docker.com/engine/daemon/ipv6/)
και [Επιλογές δικτύου του Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

Σε ένα **image που βασίζεται στο glibc**, το `/etc/gai.conf` μπορεί να αλλάξει την επιλογή διευθύνσεων. Το τρέχον
Dockerfile του repository χρησιμοποιεί Debian· τα προσαρμοσμένα images που βασίζονται στο musl δεν χρησιμοποιούν αυτόν τον μηχανισμό.
Η αναφερθείσα προσαρμογή αλλάζει την ετικέτα ULA από `label fc00::/7 6` σε
`label fc00::/7 1`. Ξεκινήστε από τον πλήρη πίνακα πολιτικής του image και διατηρήστε τις υπόλοιπες
καταχωρίσεις του: η προσθήκη μιας καταχώρισης `label` ή `precedence` αντικαθιστά εκείνον τον προεπιλεγμένο πίνακα, επομένως ένα αρχείο
που περιέχει μόνο την τροποποιημένη γραμμή δεν επαρκεί. Η
[αναφορά διαμόρφωσης του glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
τεκμηριώνει αυτές τις σημασιολογίες. Κάντε bind-mount το ελεγμένο αρχείο μόνο για ανάγνωση στη θέση `/etc/gai.conf`
και δημιουργήστε ξανά την υπηρεσία για να εφαρμοστεί.

Αυτό αλλάζει την επιλογή διευθύνσεων του λειτουργικού συστήματος για **όλη την εξερχόμενη κίνηση σε εκείνο το container**.
Δεν υποχρεώνει κάθε εφαρμογή να επιλέξει IPv6: η σειρά DNS και η επιλογή
σύνδεσης του Node έχουν επίσης σημασία. Ειδικότερα, το `--dns-result-order=ipv4first` προτιμά το IPv4 και
δεν αποτελεί λύση για μια αποτυχία που οφείλεται σε αποκλειστική χρήση IPv4. Δείτε τη [σειρά DNS του Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Επαναλάβετε τις δοκιμές στο Gemini και στους άλλους παρόχους σας μετά από οποιαδήποτε αλλαγή σε επίπεδο κεντρικού υπολογιστή. Για επαναφορά,
αφαιρέστε το προσαρμοσμένο mount του `gai.conf`, επαναφέρετε την προηγούμενη διαμόρφωση δικτύου και
δημιουργήστε ξανά την επηρεαζόμενη υπηρεσία/το επηρεαζόμενο δίκτυο κατά τη διάρκεια ενός παραθύρου συντήρησης. Η εκ νέου δημιουργία ενός δικτύου
μπορεί να διακόψει άλλα container που είναι συνδεδεμένα σε αυτό· μην διαγράψετε τον τόμο μόνιμων δεδομένων.

## Σημαντικές σημειώσεις

- **Λειτουργία WAL του SQLite:** Θα πρέπει να επιτρέπεται στο `docker stop` να ολοκληρώνεται, ώστε το OmniRoute να μπορεί να εγγράφει τις πιο πρόσφατες αλλαγές πίσω στο `storage.sqlite` μέσω checkpoint. Τα παρεχόμενα αρχεία Compose ορίζουν ήδη περίοδο χάριτος 40s για τη διακοπή. Αν εκτελείτε απευθείας το image, διατηρήστε το `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Ορίστε το σε `true` εάν η διαχείριση των τακτικών αντιγράφων ασφαλείας/αντιγράφων πριν από εγγραφές γίνεται εξωτερικά. Οι μετεγκαταστάσεις υπαρχουσών βάσεων δεδομένων εξακολουθούν να απαιτούν δικό τους ανθεκτικό στιγμιότυπο ασφαλείας και μηχανισμό προστασίας για μαζικές μετεγκαταστάσεις.
- **Διατήρηση δεδομένων:** Προσαρτάτε πάντα έναν τόμο στο `/app/data`, ώστε η βάση δεδομένων, τα κλειδιά και οι διαμορφώσεις σας να διατηρούνται μεταξύ των επανεκκινήσεων του container.
- **Διαμόρφωση θύρας:** Παρακάμψτε τη μεταβλητή περιβάλλοντος `PORT` για να αλλάξετε την προεπιλεγμένη θύρα `20128`.

## Δείτε επίσης

- [Οδηγός ανάπτυξης σε VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Ρύθμιση VM + nginx + Cloudflare
- [Οδηγός ανάπτυξης στο Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Ανάπτυξη στο Fly.io
- [Διαμόρφωση περιβάλλοντος](../reference/ENVIRONMENT.md) — Πλήρης αναφορά του `.env`
