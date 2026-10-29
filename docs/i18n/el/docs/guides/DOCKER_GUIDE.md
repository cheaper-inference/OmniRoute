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

> **Αυτοφιλοξενία με μία εντολή;** Ανατρέξτε στον
> [Οδηγό αυτοφιλοξενίας](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (δημοσιευμένο image +
> Redis, μόνο μέσω loopback, χωρίς επιλογή προφίλ). Η παρακάτω Γρήγορη εκτέλεση
> αφορά τη χρήση ενός μόνο container για χρήστες που εκτελούν ήδη το Redis αλλού.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Με αρχείο περιβάλλοντος

```bash
# Αντιγράψτε και επεξεργαστείτε πρώτα το .env
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
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

Το αποθετήριο περιλαμβάνει ένα Dockerfile πολλαπλών σταδίων (`Dockerfile`). Διατίθενται τέσσερα στάδια· επιλέξτε το κατάλληλο `target` για την περίπτωση χρήσης σας.

| Στάδιο        | Βασική εικόνα         | Σκοπός                                                                                                                                                                                                                                                                                                                                              |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Εγκαθιστά τις εξαρτήσεις (`npm ci --legacy-peer-deps`) και εκτελεί το `npm run build` (Turbopack από προεπιλογή — δείτε τους Πόρους κατά τη μεταγλώττιση παρακάτω)                                                                                                                                                                                  |
| `runner-base` | `node:26-trixie-slim` | Περιβάλλον εκτέλεσης παραγωγής με την αυτόνομη έξοδο του Next.js. **Δεν περιλαμβάνονται CLI παρόχων.**                                                                                                                                                                                                                                              |
| `runner-cli`  | `runner-base`         | Προσθέτει `git`, `docker.io`, `docker-compose` και καθολικά CLI: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Επιλέξτε το για ροές εργασίας με πράκτορες.**                                                                                                                                                                 |
| `runner-web`  | `runner-base`         | Προσθέτει Playwright και ένα πρόγραμμα περιήγησης Chromium (`--with-deps`) για παρόχους διαδικτυακών συνεδριών: `gemini-web`, `claude-web`, `claude-turnstile`. **Επιλέξτε το όταν χρησιμοποιείτε αυτούς τους παρόχους** — η απλή εικόνα αποτυγχάνει κατά την υποβολή αιτήματος χωρίς αυτό (δείτε τη σημείωση `-web` στην ενότητα Κανάλια έκδοσης). |

Δημιουργήστε χειροκίνητα ένα συγκεκριμένο target:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Πόροι κατά τη μεταγλώττιση

Τρία ορίσματα μεταγλώττισης ελέγχουν το κόστος του σταδίου `builder`. Ισχύουν μόνο κατά τη μεταγλώττιση —
το `OMNIROUTE_MEMORY_MB` (παρακάτω) είναι μια ξεχωριστή ρύθμιση χρόνου εκτέλεσης.

| Όρισμα μεταγλώττισης        | Προεπιλογή | Επίδραση                                                                                                                 |
| --------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_USE_TURBOPACK`   | `0`        | Το `0` εκτελεί μεταγλώττιση με webpack: χαμηλότερη μέγιστη χρήση μνήμης, αλλά πιο αργά. Το `1` ενεργοποιεί το Turbopack. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`     | Ανώτατο όριο σωρού V8 (`--max-old-space-size`) για τη διεργασία `next build` που εκκινείται.                             |
| `OMNIROUTE_BUILD_WORKERS`   | `2`        | Τροφοδοτεί το `CIRCLE_NODE_TOTAL`· το Next υπολογίζει `workers = N - 1` για τη συλλογή δεδομένων σελίδων.                |

Το `OMNIROUTE_BUILD_WORKERS` είναι αυτό που πρέπει να αυξήσετε σε ένα ισχυρό σύστημα μεταγλώττισης και αυτό που πρέπει να
υποπτευθείτε όταν μια μεταγλώττιση με περιορισμένους πόρους τερματίζεται **μετά** το `✓ Compiled successfully`. Κάθε
διεργασία συλλογής δεδομένων σελίδων είναι ξεχωριστή διεργασία, όπως και η ίδια η γονική διεργασία `next build`·
μια αναπαραγωγή σε ενεργό VPS (ζήτημα #7518) μέτρησε τη μέγιστη RSS κάθε διεργασίας στα
~4.5 GB, ανεξάρτητα από τη σημαία σωρού `NODE_OPTIONS` (το Turbopack μεταγλωττίζει σε
εγγενή μνήμη/Rust εκτός του σωρού V8). Η προεπιλογή `2` (→ 1 worker, 2
διεργασίες συνολικά) έχει επιλεγεί για τους εκτελεστές 16 GB / 4 vCPU που φιλοξενούνται στο GitHub και
χρησιμοποιούνται από τη ροή δημοσίευσης. Με `8` (→ 7 workers), αυτός ο εκτελεστής εξάντλησε τη μνήμη και
το buildkit απέτυχε στο βήμα με `ResourceExhausted: ... cannot allocate memory`·
το `3` (→ 2 workers) εξακολουθούσε να μην επαρκεί όταν η RSS ανά διεργασία μετρήθηκε
απευθείας αντί να συναχθεί. Το `tests/unit/docker-build-memory-budget.test.ts`
εκτελεί τους υπολογισμούς με βάση τη μετρημένη τιμή και αποτυγχάνει αν οποιαδήποτε από τις δύο ρυθμίσεις
υπερβεί τις δυνατότητες του εκτελεστή.

Το Turbopack μεταγλωττίζει σε εγγενή μνήμη Rust που βρίσκεται **εκτός** του σωρού V8, επομένως
το `OMNIROUTE_BUILD_MEMORY_MB` δεν τη δεσμεύει. Σε έναν host με ανώτατο όριο μνήμης, η
μεταγλώττιση τερματίζεται τότε με SIGKILL από τον μηχανισμό OOM χωρίς κανένα κείμενο σφάλματος — απλώς
σταματά στη μέση του `Creating an optimized production build`, κάτι που μοιάζει περισσότερο με κόλλημα
παρά με εξάντληση μνήμης. Γι' αυτό το `Dockerfile` χρησιμοποιεί από προεπιλογή το webpack
(`OMNIROUTE_USE_TURBOPACK=0`), σε αντίθεση με τα `npm run dev` / `npm run build`, όπου
το Turbopack είναι η προεπιλογή του κώδικα: ένα απλό `docker build .` χωρίς ορίσματα μεταγλώττισης (όπως
εκτελείται από το Railway και άλλους host εγκατάστασης με ένα κλικ) δεν πρέπει να τερματίζεται αθόρυβα σε ένα σύστημα
με περιορισμένη μνήμη. Οι δημοσιευμένες εικόνες ήδη μεταβιβάζουν ρητά το `OMNIROUTE_USE_TURBOPACK=0`
στο `docker-publish.yml`. Σε ένα σύστημα μεταγλώττισης με άφθονη RAM, ενεργοποιήστε
το Turbopack για ταχύτερη μεταγλώττιση:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

Το `webpackBuildWorker` είναι ενεργοποιημένο, επομένως το `next build` εκτελεί μια γονική διεργασία **και** μία διεργασία worker
και καθεμία τηρεί ξεχωριστά το `OMNIROUTE_BUILD_MEMORY_MB`. Ορίστε το όριο μνήμης του container
σε περίπου διπλάσια τιμή, όχι στην ίδια.

Μετρήσεις σε αυτό το δέντρο (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Όριο container | Αποτέλεσμα                                 |
| --------- | -------------- | ------------------------------------------ |
| Turbopack | 8 GiB / 16 GiB | Τερματισμός λόγω OOM και στα δύο, αθόρυβα  |
| webpack   | 8 GiB          | Η διεργασία worker τερματίστηκε με SIGKILL |
| webpack   | 12 GiB         | Επιτυχία, με μέγιστη χρήση 11.1 GiB        |

### Προεπιλογές χρόνου εκτέλεσης

Προεπιλογές που εξάγονται από το `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Συμπεριφορά μνήμης στο Docker:

- Η εικόνα ορίζει `OMNIROUTE_MEMORY_MB=1024` και παράγει από αυτήν το `NODE_OPTIONS=--max-old-space-size=1024`.
- Η πραγματική διεργασία του διακομιστή εκκινείται από τον αυτόνομο εκκινητή, ο οποίος διαβάζει το `OMNIROUTE_MEMORY_MB` και προσθέτει το `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Το Node χρησιμοποιεί την τελευταία επαναλαμβανόμενη τιμή `--max-old-space-size`, επομένως ο ορισμός του `OMNIROUTE_MEMORY_MB` ελέγχει το πραγματικό όριο σωρού στο Docker.
- Επειδή η εικόνα το ορίζει πάντα, η εφεδρική ρύθμιση του εκκινητή βάσει της διαθέσιμης RAM δεν εφαρμόζεται ποτέ στο Docker. Αυξήστε την τιμή ρητά ανάλογα με τον φόρτο εργασίας (βλ. παρακάτω πίνακα). Τα `2048` εξακολουθούν να είναι ανεπαρκή για το `/v1/responses` ενός πράκτορα προγραμματισμού.

### RAM χρόνου εκτέλεσης για πράκτορες προγραμματισμού

Η προεπιλεγμένη τιμή του Docker, 1 GiB, αποτελεί το ελάχιστο για τον πίνακα ελέγχου και ελαφριές συνομιλίες, όχι μέγεθος για χρήση σε περιβάλλον παραγωγής. Τα μεγάλα σώματα αιτημάτων `POST /v1/responses` (εκατοντάδες μηνύματα, δεκάδες εργαλεία) διατηρούν πολλαπλά γραφήματα στη μνήμη κατά τη συμπίεση. Δύο επικαλυπτόμενα αιτήματα μεγέθους ~3 MiB / ~750k token προκάλεσαν τερματισμό του V8 με χώρο παλιάς γενιάς **12 GiB** (`FATAL ERROR: Reached heap limit`), ενώ ενεργοποίησαν επίσης το OOM ενός cgroup 16 GiB. Ανατρέξτε στο [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Ορίστε το μέγεθος του **cgroup `--memory` υψηλότερα από τον σωρό** — τα εγγενή buffer, το SQLite και τα ενδιάμεσα δεδομένα συμπίεσης βρίσκονται εκτός του V8.

| Φόρτος εργασίας                                    | `OMNIROUTE_MEMORY_MB`       | Container / cgroup             | Σημειώσεις                                                                                                                    |
| -------------------------------------------------- | --------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| Πίνακας ελέγχου, μία ελαφριά συνομιλία             | `1024` (προεπιλογή εικόνας) | ≥2 GiB                         |                                                                                                                               |
| Ένας πράκτορας προγραμματισμού (Claude/Codex/Grok) | `8192`                      | ≥10 GiB                        | Τυπική συνεδρία ενός χρήστη στο `/v1/responses`                                                                               |
| Δύο ταυτόχρονα μεγάλα `/v1/responses`              | `10240`–`12288`             | ≥12–16 GiB                     | Μετρήθηκε τερματισμός του V8 με σωρό ~12 GiB                                                                                  |
| Τρία ή περισσότερα ταυτόχρονα μεγάλα context       | όχι σε μία διεργασία        | σειριοποίηση / περισσότερη RAM | Η προεπιλεγμένη αποδοχή απαιτητικών αιτημάτων είναι 1 υπό εκτέλεση· η αύξησή της χωρίς επιπλέον RAM επαναφέρει τον τερματισμό |

Το `omniroute serve` σε φυσικό μηχάνημα ρυθμίζει περίπου το 35% της RAM (με περιορισμό στο `[512, 4096]`) όταν το `OMNIROUTE_MEMORY_MB` **δεν έχει οριστεί**. Το Docker ορίζει πάντα την τιμή `1024`, επομένως αυτή η προσαρμογή δεν εκτελείται ποτέ στην επίσημη εικόνα.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
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

Το `basePath` του Next.js μεταγλωττίζεται μέσα στο αυτόνομο πακέτο. Το OmniRoute καταγράφει την ενσωματωμένη
τιμή σε ένα αρχείο-δείκτη στη ρίζα της εφαρμογής (εγγράφεται κατά την εκτέλεση του `npm run build` και διαβάζεται από το
`scripts/docker/ensure-docker-base-path.mjs`) και τη συγκρίνει με το
`OMNIROUTE_BASE_PATH` κατά την εκκίνηση του κοντέινερ. Όταν διαφέρουν και το image έχει
δημιουργηθεί για τη ρίζα του domain, το entrypoint επανεγγράφει τα αυτόνομα manifests, τις
ενσωματωμένες σταθερές `basePath`/`assetPrefix` (το Next 16 αποδίδει τα URL των SSR assets αποκλειστικά από το
`assetPrefix` — ο patcher αντιγράφει την υποδιαδρομή και σε αυτό), τα ενσωματωμένα
URL των assets `/_next/static` (manifests αναφορών πελάτη, εισαγωγές πολυμέσων, προαποδομένες
σελίδες σφαλμάτων) και το shim `process.env` του πελάτη πριν εκτελεστεί το
`node dev/run-standalone.mjs`.

### Δημιουργία με Compose (συνιστάται)

Ορίστε και τις δύο μεταβλητές στο `.env` και, στη συνέχεια, δημιουργήστε ξανά το image, ώστε το image και το περιβάλλον εκτέλεσης να συμφωνούν:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

Το `docker-compose.yml` προωθεί το `OMNIROUTE_BASE_PATH` ως όρισμα δημιουργίας Docker και ως
μεταβλητή περιβάλλοντος κατά την εκτέλεση.

### Προκατασκευασμένο image ρίζας + υποδιαδρομή κατά την εκτέλεση

Τα δημοσιευμένα images `diegosouzapw/omniroute:*` έχουν δημιουργηθεί για τη ρίζα του domain. Μπορείτε, ωστόσο, να
ορίσετε το `OMNIROUTE_BASE_PATH` κατά την εκτέλεση· το κοντέινερ τροποποιεί το πακέτο μία φορά κατά την εκκίνηση.
Συνδυάστε το με την αντίστοιχη δημόσια προέλευση:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Ρυθμίστε τον αντίστροφο διακομιστή μεσολάβησης ώστε να προωθεί την **πλήρη** εξωτερική διαδρομή (μην αφαιρείτε το
πρόθεμα). Το Traefik θα πρέπει να δρομολογεί το `PathPrefix(`/omniroute`)` προς το κοντέινερ χωρίς
`StripPrefix`, ώστε το Next.js να λαμβάνει `/omniroute/...` και να παρέχει assets από το
`/omniroute/_next/...`.

Ο έλεγχος εύρυθμης λειτουργίας του Docker ελέγχει το ελαφρύ endpoint κύκλου ζωής `/healthz`, έχοντας ως πρόθεμα
το ενεργό `OMNIROUTE_BASE_PATH`. Το `/api/monitoring/health` παραμένει διαθέσιμο για
διαγνωστικούς ελέγχους από ανθρώπους ή πίνακες ελέγχου· για να επαναφέρετε το HEALTHCHECK του κοντέινερ σε αυτό (για παράδειγμα,
για επιβολή εις βάθος ελέγχου εύρυθμης λειτουργίας), ορίστε `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Αυτή η διαδρομή εκτελεί **εις βάθος** έλεγχο (βάση δεδομένων + σύνοψη παρακολούθησης) — είναι κατάλληλη για το
αραιό `HEALTHCHECK` του Docker, εάν επιλέξετε να την ενεργοποιήσετε ξανά, αλλά **όχι** για τα διαστήματα του
`livenessProbe` στο Kubernetes.

Για συστήματα ενορχήστρωσης (Kubernetes, Nomad κ.λπ.):

| Έλεγχος              | Προτιμήστε                                                           | Αποφύγετε                                                                   |
| -------------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Ζωτικότητα           | HTTP `GET /livez` ή TCP στην κύρια θύρα (`PORT`, προεπιλογή `20128`) | Το `/api/monitoring/health` ως έλεγχο ζωτικότητας                           |
| Ετοιμότητα           | HTTP `GET /healthz`                                                  | Αυστηρά χρονικά όρια που θεωρούν έναν απασχολημένο βρόχο συμβάντων ως νεκρό |
| Εις βάθος / blackbox | `/api/monitoring/health`                                             | —                                                                           |

Το `/healthz` αναφέρει τον κύκλο ζωής της διεργασίας (`ok` / `starting` / `stopping`). Το `/livez` ελέγχει
μόνο εάν η διεργασία είναι ενεργή (200 όποτε μπορεί να εκτελεστεί ο handler· δεν περιμένει την
ετοιμότητα). Και τα δύο εξακολουθούν να εκτελούνται στον ίδιο βρόχο συμβάντων του Node με την επεξεργασία αιτημάτων, επομένως
οι εργασίες καταλόγου ή συμπίεσης που επιβαρύνουν τη CPU μπορούν να τα καθυστερήσουν — απασχολημένο ≠ νεκρό. Προτιμήστε
έλεγχο ζωτικότητας μέσω TCP εάν λήγει το χρονικό όριο των ελέγχων HTTP. Πλήρεις οδηγίες για τους ελέγχους:
[Οδηγός παρακολούθησης — συστάσεις για ελέγχους Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose με Caddy (αυτόματο TLS για HTTPS)

Το OmniRoute μπορεί να εκτεθεί με ασφάλεια χρησιμοποιώντας την αυτόματη παροχή πιστοποιητικών SSL του Caddy. Βεβαιωθείτε ότι η εγγραφή DNS τύπου A του domain σας δείχνει στη διεύθυνση IP του διακομιστή σας.

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    container_name: omniroute
    restart: unless-stopped
    volumes:
      - omniroute-data:/app/data
    environment:
      - PORT=20128
      # Προέλευση που είναι ορατή στο πρόγραμμα περιήγησης για επιστροφές κλήσεων OAuth, συνδέσμους του πίνακα ελέγχου και δημόσια URL που δημιουργούνται.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Εσωτερικό URL μεταξύ διακομιστών για προγραμματισμένες εργασίες / αιτήματα προς την ίδια την υπηρεσία.
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

Το Caddy ορίζει τις τυπικές κεφαλίδες προώθησης για το upstream container. Το OmniRoute χρησιμοποιεί το
`NEXT_PUBLIC_BASE_URL` ως την κανονική δημόσια προέλευση για τις επιστροφές κλήσεων OAuth και τους δημόσιους
συνδέσμους που δημιουργούνται· οι πιστοποιημένες εγγραφές του πίνακα ελέγχου χρησιμοποιούν αιτήματα ίδιας προέλευσης μαζί με προστασία CSRF
συνδεδεμένη με τη συνεδρία. Ενεργοποιήστε το `OMNIROUTE_TRUST_PROXY` μόνο για προηγμένες αναπτύξεις στις οποίες θέλετε σκόπιμα
το OmniRoute να προσδιορίζει τη δημόσια προέλευση από αξιόπιστες προωθημένες κεφαλίδες αντί από ρητή
διαμόρφωση.

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

## Tag των image

| Image                    | Tag      | Μέγεθος | Περιγραφή                                                            |
| ------------------------ | -------- | ------- | -------------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB  | Υψηλότερη **δημοσιευμένη** σταθερή έκδοση SemVer (όχι το git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB  | Καρφιτσώστε αυτήν την κατηγορία tag για GitOps                       |

Manifest πολλαπλών πλατφορμών: εγγενή `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Το Docker επιλέγει αυτόματα την αντίστοιχη αρχιτεκτονική· χρησιμοποιήστε `--platform linux/amd64` εάν χρειάζεται να επιβάλετε εξομοίωση AMD64 σε host ARM.

### Κανάλια εκδόσεων

Το OmniRoute δημοσιεύει ξεχωριστά κανάλια Docker για σταθερές εκδόσεις, δοκιμές του ενεργού κλάδου έκδοσης και build ανάπτυξης.

| Κανάλι                          | Πηγή                                      | Δυνατότητα μεταβολής                | Προτεινόμενη χρήση                                                                                                                                     |
| ------------------------------- | ----------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `:<version>` / `:<version>-web` | Υπογεγραμμένη/αριθμημένη έκδοση           | Αμετάβλητο                          | Αναπτύξεις παραγωγής που καρφιτσώνουν μια συγκεκριμένη έκδοση                                                                                          |
| `:latest` / `:latest-web`       | Υψηλότερη **δημοσιευμένη** σταθερή SemVer | Μεταβλητός δείκτης σταθερής έκδοσης | Ακολουθεί τις σταθερές εκδόσεις **μετά** από μια εργασία δημοσίευσης SemVer — **δεν** παρακολουθεί το `main` ή μη δημοσιευμένα commit του `release/v*` |
| `:next` / `:next-web`           | Τρέχων προεπιλεγμένος κλάδος `release/v*` | Μεταβλητός δείκτης προέκδοσης       | Δοκιμή διορθώσεων που έχουν ενσωματωθεί στον ενεργό κλάδο έκδοσης, αλλά δεν περιλαμβάνονται ακόμη σε σταθερή έκδοση                                    |
| `:main` / `:main-web`           | Κλάδος `main`                             | Μεταβλητός δείκτης ανάπτυξης        | Μόνο για ανάπτυξη και δοκιμές ενσωμάτωσης                                                                                                              |

#### Πάροχοι διαδικτυακών συνεδριών: τα image `-web`

Κάθε παραπάνω κανάλι διατίθεται επίσης ως tag `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), δημιουργημένο από το στάδιο `runner-web` — το ίδιο image μαζί με το Playwright και ένα πρόγραμμα περιήγησης Chromium. Το απλό image διατίθεται **χωρίς** Chromium· τα `gemini-web`, `claude-web` και `claude-turnstile` το απαιτούν.

Η αποτυχία αναβάλλεται και δεν συμβαίνει κατά την εκκίνηση: αυτοί οι πάροχοι εμφανίζουν τα μοντέλα τους και παρουσιάζονται ως συνδεδεμένοι στον πίνακα ελέγχου, ενώ αποτυγχάνει μόνο το πρώτο αίτημα με το μήνυμα

```
[500]: Αποτυχία φόρτωσης εξωτερικής λειτουργικής μονάδας playwright: Σφάλμα: Δεν είναι δυνατή η εύρεση της λειτουργικής μονάδας
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Εάν χρησιμοποιείτε αυτούς τους παρόχους, κάντε pull το tag `-web` του καναλιού στο οποίο βρίσκεστε ήδη — τίποτε άλλο δεν αλλάζει. Σε εγκατάσταση npm/CLI (χωρίς Docker image), το αντίστοιχο στοιχείο που λείπει είναι το εκτελέσιμο αρχείο του προγράμματος περιήγησης: εκτελέστε `npx playwright install chromium` στον host.

#### Χρήση του καναλιού προέκδοσης

Το κανάλι `next` ανακατασκευάζεται σε κάθε push στον τρέχοντα προεπιλεγμένο κλάδο `release/v*` και δημοσιεύεται τόσο για AMD64 όσο και για ARM64. Οι παλαιότεροι κλάδοι συντήρησης δεν μπορούν να το αντικαταστήσουν. Το κανάλι παρέχει μια εικόνα που μπορεί να ληφθεί για διορθώσεις οι οποίες έχουν συγχωνευτεί στον ενεργό κλάδο έκδοσης πριν δημιουργηθεί το επόμενο σταθερό tag.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Για το Docker Compose, παρακάμψτε το tag εικόνας που χρησιμοποιείται από το επιλεγμένο προφίλ και, στη συνέχεια, εκτελέστε λήψη και αναδημιουργία της υπηρεσίας:

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

Το `next` είναι ένα μεταβαλλόμενο κανάλι προέκδοσης. Μπορεί να αλλάξει με οποιοδήποτε push στον ενεργό κλάδο έκδοσης και **δεν υποστηρίζεται για χρήση σε παραγωγή**. Καρφιτσώστε το digest της εικόνας κατά την αξιολόγηση μιας συγκεκριμένης έκδοσης:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Πριν από τη δοκιμή, δημιουργήστε αντίγραφο ασφαλείας του τόμου δεδομένων του OmniRoute ή του καταλόγου δεδομένων που έχει προσαρτηθεί μέσω bind mount. Για επαναφορά, χρησιμοποιήστε ξανά την προηγούμενη σταθερή έκδοση ή το προηγούμενο digest και αναδημιουργήστε το κοντέινερ:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Μια κατασκευή από κλάδο έκδοσης δεν μπορεί ποτέ να μετακινήσει το `latest`· μόνο μια επιλέξιμη σταθερή σημασιολογική έκδοση μπορεί να προωθήσει τον δείκτη σταθερής έκδοσης. Οι εικόνες `next` διατηρούν τον έλεγχο της εικόνας έκδοσης και την πύλη αποκλεισμού για ευπάθειες επιπέδου CRITICAL.

**Το `latest` δεν αποτελεί εγγύηση επικαιρότητας σε σχέση με το git.** Οι συγχωνευμένες διορθώσεις στο `main` ή στον ενεργό κλάδο `release/v*` **δεν** περιλαμβάνονται στο `:latest` έως ότου δημοσιευτεί μια σταθερή εικόνα SemVer και η εργασία δημοσίευσης προωθήσει το `:latest` (με το ίδιο digest με εκείνο το SemVer). Αν το `latest` φαίνεται παγωμένο ενώ το GitHub εμφανίζει ήδη τη διόρθωση, κάντε pull το `:next` για να δοκιμάσετε τον κλάδο έκδοσης ή περιμένετε το tag SemVer.

| Αυτό που θέλετε                                                                        | Χρησιμοποιήστε                                    |
| -------------------------------------------------------------------------------------- | ------------------------------------------------- |
| GitOps / παραγωγή που δεν πρέπει να αποκλίνει                                          | Καρφιτσώστε το `:X.Y.Z` (ή το digest της εικόνας) |
| Παρακολούθηση δημοσιευμένων σταθερών εκδόσεων με αποδοχή αναδημιουργίας σε κάθε έκδοση | `:latest`                                         |
| Δοκιμή μη δημοσιευμένων commit του `release/v*`                                        | `:next` (όχι για παραγωγή)                        |
| Δοκιμή του `main`                                                                      | `:main` (όχι για παραγωγή)                        |

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

## Οριζόντια κλιμάκωση: N ανεξάρτητες διεργασίες

Μία διεργασία Node αντιστοιχεί σε **έναν σωρό V8**. Δύο επικαλυπτόμενα αιτήματα προγραμματιστικών πρακτόρων `POST /v1/responses` μεγέθους ~3 MiB / ~750k-token (RTK + Caveman) προκαλούν τερματισμό αυτού του σωρού στα ~12 Gi (`FATAL ERROR: Reached heap limit`) και μπορούν να προκαλέσουν OOM σε ένα cgroup 16 Gi. Δείτε το [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Αυτή η μέτρηση αποτελεί προειδοποίηση για τον **προϋπολογισμό μνήμης** και όχι ένα απόλυτο όριο του προϊόντος στα δύο ταυτόχρονα μακρά `/v1/responses`. Η αποδοχή απαιτητικών συνομιλιών ελέγχεται από έναν αυτόματα υπολογιζόμενο προϋπολογισμό byte εισόδου (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), διαστασιολογημένο βάσει του ίδιου ορίου V8/cgroup — η προς τα πάνω παράκαμψή του (ή ο ορισμός του παλαιού ορίου πλήθους αιτημάτων `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) σε μια ήδη διαστασιολογημένη διεργασία επαναφέρει τον τερματισμό. Οι μικρές συνομιλίες, τα `/healthz`, `/v1/models` και το MCP **δεν** περιλαμβάνονται σε αυτό το όριο.

### Μία διεργασία: περισσότερα από δύο μακρά `/v1/responses`

Μια **υγιής** διεργασία (με σωρό κάτω από το `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, προεπιλογή `0.75`) **μπορεί** να εκτελεί περισσότερα από δύο ταυτόχρονα μακρά `POST /v1/responses`, όταν υπάρχει ακόμη διαθέσιμος χώρος στον προϋπολογισμό byte υπό επεξεργασία για ολόκληρη τη διεργασία (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110). Τα σώματα αιτημάτων μεγέθους ίσου ή μεγαλύτερου από `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (προεπιλογή 256 KiB) λαμβάνουν την ίδια μίσθωση βαρέος φόρτου με τα αιτήματα υψηλής δομικής πολυπλοκότητας και χρησιμοποιούν την ίδια διέξοδο `tryAcquireHealthyHeadroom` του [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Οι δεκάδες ταυτόχρονοι πελάτες μακρόχρονων SSE συνδέσεων (οι διαχειριστές συχνά χρειάζονται 40–50) αποτελούν ζήτημα **προϋπολογισμού μνήμης** — διαστασιολογήστε τον σωρό + τις κύριες/εφεδρικές θέσεις + το `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — και όχι ένα απόλυτο όριο προϊόντος «μέγιστο 2». Ένας σωρός υπό πίεση εξακολουθεί να απορρίπτει φορτίο με επαναλήψιμο `503`, ώστε να μην επανεμφανιστεί το #7849.

Για να **πολλαπλασιάσετε τους σωρούς** (ανεξάρτητοι παλιοί χώροι V8) **σήμερα**:

| Κάντε                                                                                                                                                                                                                                      | Μην κάνετε                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| Εκτελέστε **N containers/pods**, το καθένα με το **δικό του** `DATA_DIR` / volume                                                                                                                                                          | Ορίσετε `replicas > 1` για ένα κοινό αρχείο SQLite                                               |
| Διαστασιολογήστε ταυτόχρονα αιτήματα βαρέος φόρτου + εφεδρική χωρητικότητα υγιούς κατάστασης βάσει του σωρού / προϋπολογισμού byte υπό επεξεργασία· το 1–2 είναι η συντηρητική προεπιλογή του #7849 και όχι ένα απόλυτο όριο του προϊόντος | Παραχωρήσετε σε μία διεργασία 8× RAM και απεριόριστο όριο πλήθους                                |
| Προαιρετικά: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` για **κοινόχρηστους μετρητές ποσοστώσεων**                                                                                                                               | Αντιμετωπίσετε το Redis ως κοινόχρηστο SQLite — δεν είναι                                        |
| Αντιγράψτε τα μυστικά των παρόχων σε κάθε instance (ή αποδεχτείτε κατακερματισμένους πίνακες ελέγχου)                                                                                                                                      | Αναμένετε έναν ενιαίο πίνακα ελέγχου / ένα ενιαίο αρχείο καταγραφής κλήσεων μεταξύ των instances |
| Τοποθετήστε μπροστά οποιονδήποτε εξισορροπητή φορτίου· η διατήρηση συνεδρίας βάσει κλειδιού API ή session επαρκεί                                                                                                                          | Απαιτήσετε middleware συγκεκριμένου προμηθευτή που λαμβάνει υπόψη το μέγεθος                     |

Υλικό: τα ταυτόχρονα μακρά `/v1/responses` ανά instance αποτελούν ζήτημα **προϋπολογισμού μνήμης** (σωρός + byte υπό επεξεργασία / #10110). Τα `N` ανεξάρτητα `DATA_DIR` εξακολουθούν να πολλαπλασιάζουν τους σωρούς: η RAM του host πρέπει να καλύπτει `N × cgroup`, όχι «ένα pod 16 Gi με N=8». Ποτέ μην ορίζετε `replicas > 1` για ένα κοινό αρχείο SQLite.

Προσχέδιο Compose (δύο σωροί, δύο volumes — όχι `deploy.replicas: 2`):

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

Η πυκνότητα εντός της διεργασίας (με τη συμπίεση εκτός του HTTP isolate) παρακολουθείται στο [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Ένα λογικό cluster σε κοινόχρηστη ανθεκτική κατάσταση παρακολουθείται στο [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

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
