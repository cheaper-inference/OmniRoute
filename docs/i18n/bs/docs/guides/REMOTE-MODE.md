# Remote Mode (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

# Udaljeni način rada

Pokrenite `omniroute` CLI na svom laptopu dok OmniRoute sam radi negdje drugdje
(VPS, kućni server, druga mašina na vašem Tailnet-u). Prijavite se jednom pomoću
`omniroute connect`, i od tada **svaka** CLI komanda cilja taj udaljeni
server — iste komande, isti izlaz, samo izvršene na udaljenom serveru.

Nema drugog alata za instalaciju: udaljeni način rada je običan `omniroute` CLI
plus **pristupni tokeni** sa opsegom.

```bash
npm install -g omniroute                 # standardni CLI
omniroute connect 192.168.0.15           # prijava (lozinka → token sa opsegom)
omniroute models list                    # ← sada izlistava modele UDALJENOG servera
omniroute configure codex                # ← zapisuje lokalni Codex profil iz udaljenog kataloga
```

---

## Kako to radi

```
vaš laptop                               udaljeni OmniRoute (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ omniroute CLI      │  POST /api/cli/connect  (lozinka → token)         │
│  kontekst: vps     │ ───────────────►  │ kreira pristupni token sa     │
│  baseUrl, token    │  Authorization: Bearer oma_live_…  opsegom        │
│                    │ ───────────────►  │ svaka upravljačka ruta,       │
│ zapisuje konfig.   │ ◄───────────────  │ provjerava se prema opsegu    │
│ LOKALNO            │                   │ tokena                        │
└────────────────────┘                   └───────────────────────────────┘
```

- **Konteksti** pohranjuju po jedan server (`~/.omniroute/config.json`, `chmod 600`).
  `omniroute contexts use <name>` prebacuje aktivni server; `default` je lokalni.
- **Pristupni tokeni** (`oma_live_…`) autorizuju upravljačke komande. Oni su
  različiti od API ključeva za zaključivanje (`sk-…`, koji se koriste za `/v1/chat/completions`).
- Samo se SHA-256 heš tokena pohranjuje na strani servera. Običan tekst se prikazuje
  **jednom**, prilikom kreiranja.

---

## Povezivanje

### Sa upravljačkom lozinkom (bootstrap)

```bash
omniroute connect 192.168.0.15
# Upravljačka lozinka za http://192.168.0.15:20128: ********
# ✔ Povezano na http://192.168.0.15:20128 — kontekst '192.168.0.15' (opseg: admin)
```

Proces lozinke kreira **admin** token po defaultu (vi držite lozinku, dakle
već imate potpunu kontrolu). Smanjite opseg sa `--scope`:

```bash
omniroute connect 192.168.0.15 --scope write
```

Opcije: `--port <p>` (kada host nema port), `--name <ctx>` (ime konteksta),
`--scope read|write|admin`. Puni URL se poštuje onakav kakav jeste:
`omniroute connect https://omni.example.com`.

### Sa prethodno generisanim tokenom

Generišite token sa opsegom na kontrolnoj tabli (ili pomoću `omniroute tokens create`) i
zalijepite ga — lozinka nije potrebna:

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

CLI ga validira putem `GET /api/cli/whoami` i sprema ga kao aktivni kontekst.

---

## Opsezi

Tri nivoa, hijerarhijski (`admin ⊃ write ⊃ read`):

| Opseg   | Šta može                                                                                     |
| ------- | -------------------------------------------------------------------------------------------- |
| `read`  | izlistavanje/inspekcija — `models list`, `providers status`, `logs`, `usage`, `cost`         |
| `write` | čitanje **+** konfigurisanje/primjena — `setup-codex`, `keys add`, `config set`, kombinacije |
| `admin` | pisanje **+** upravljanje — `tokens` CRUD, dodavanje provajdera, servisa, politika, oauth    |

Server zaključuje opseg koji svaka ruta zahtijeva iz HTTP metode
(`GET`→read, mutacije→write) plus admin dozvoljena lista za osjetljive površine
(`/api/cli/tokens`, `/api/providers` mutacije, `/api/oauth`, `/api/services`, …).
Token sa nedovoljnim opsegom dobija `403` sa jasnom porukom.

> Rute koje pokreću procese (`/api/services/*`, `/api/mcp/*`, …) ostaju
> **samo loopback** — udaljeni token im nikada ne može pristupiti, bez obzira na opseg.

## Povezivanje Antigravity na udaljenoj instalaciji

Antigravity koristi Googleov `firstparty/nativeapp` ekran za saglasnost. Google izdaje autorizacioni kod samo kada je **loopback preusmjeravanje** (`http://127.0.0.1:<port>/callback`) **dostupno iz pretraživača koji odobrava prijavu**. Na udaljenoj VPS instalaciji, ta povratna petlja (loopback) se nalazi na serveru, a ne na vašem računaru, tako da se ekran za saglasnost **zaledi zauvijek i nikada ne izda kod** — uobičajena rezervna opcija "zalijepi URL povratnog poziva" (paste the callback URL) nema šta da zalijepi. (Ovo je ograničenje na strani Googlea: isto zaleđivanje se dešava u bilo kojem proksiju koji koristi ugrađeni Antigravity desktop klijent, ne samo u OmniRoute-u.)

Kontrolna tabla ovo detektuje prije nego što se zaglavite: otvaranje **Providers → Antigravity → Connect** sa adrese koja nije localhost zamjenjuje generičko obavještenje "kopiraj URL povratnog poziva" sa dva rješenja ispod, od kojih svako već ima popunjen vaš host i port. (LAN adresa se računa — `192.168.x.x` nije localhost što se tiče ovog povratnog poziva.)

Postoje dva podržana načina za povezivanje Antigravity-ja na udaljeni OmniRoute.

### Opcija A — lokalni pomoćnik za prijavu (preporučeno)

Pokrenite OAuth na **svom računaru**, gdje je `127.0.0.1` dostupan. Pomoćnik direktno komunicira sa Googleom, tako da se saglasnost završava tamo gdje verzija na kontrolnoj tabli ne može.

**Ako ste već povezani** (`omniroute connect <host>`), nema šta da se kopira — pomoćnik isporučuje akreditive toj instalaciji umjesto vas:

```bash
# Na vašem LOKALNOM računaru (potreban Node.js + pretraživač):
omniroute connect 192.168.0.15        # jednom — kreira kontekst token sa administratorskim ovlaštenjima
npx omniroute login antigravity
#   ↳ otvara Google saglasnost, hvata povratni poziv na lokalnom loopback portu,
#     razmjenjuje ga i POST-uje akreditive aktivnom kontekstu:
#
#   Antigravity povezan na http://192.168.0.15:20128 (konekcija abc123).
#   Ništa za lijepljenje — možete zatvoriti ovaj terminal.
```

Push (slanje) se dešava automatski kad god aktivni kontekst pokazuje na drugu mašinu. Forsirajte ga na bilo koji način sa `--push` / `--no-push`, ili ciljajte određeni kontekst sa `--context <name>`.

Ako vaš računar ne može pristupiti VPS-u (firewall, nema SSH, izolovan radni sto), pomoćnik i dalje radi — njemu je samo _potreban_ Google. Koristite `--no-push`, ili jednostavno pustite da push ne uspije: on se vraća na ispisivanje blob-a umjesto da odbaci autorizaciju koju ste već završili.

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

Zatim, na **udaljenoj** kontrolnoj tabli: **Providers → Antigravity → Connect**, i zalijepite `omniroute-cred-v1.…` blob u polje **Step 2** (prihvata ili URL povratnog poziva ili blob akreditiva). OmniRoute ga dekodira, pokreće Cloud Code onboarding na strani servera i trajno čuva konekciju.

> Blob sadrži refresh token — tretirajte ga kao lozinku. Na putanji push-a, on se šalje jednom preko autentifikovane konekcije vašeg konteksta; na putanji lijepljenja, preko konekcije vaše kontrolne table. U svakom slučaju, on se čuva šifrovano u stanju mirovanja (at rest), a uspješan push ga nikada ne ispisuje u vašem terminalu.

Flagovi: `--no-browser` (ispisuje URL umjesto automatskog otvaranja), `--port <n>` (fiksira loopback port), `--timeout <ms>`, `--push` / `--no-push` (nadjačava automatsku isporuku), `--context <name>` (cilja određeni kontekst).

### Opcija B — SSH local-forward tunel

Ako imate SSH pristup VPS-u, proslijedite port kontrolne table tako da se loopback povratni poziv razriješi nazad na server kroz tunel:

```bash
# Na vašem LOKALNOM računaru:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# zatim otvorite http://localhost:20128 u vašem LOKALNOM pretraživaču i povežite Antigravity
# normalno — 127.0.0.1:20128/callback preusmjeravanje sada stiže do VPS-a putem SSH-a.
```

Budući da pristupate kontrolnoj tabli kao `localhost:20128`, Google saglasnost se završava i povratni poziv se isporučuje serveru kroz isti tunel — blob nije potreban. Držite tunel otvorenim dok se konekcija ne prikaže kao aktivna.

Za razliku od provajdera sa fiksnom povratnom petljom (fixed-loopback) ispod, **jedno prosljeđivanje je ovdje dovoljno**: Antigravity povratni poziv ide preko samog porta kontrolne table, tako da ne postoji drugi port specifičan za provajdera koji treba tunelirati.

> Potpuno headless alternativa (bez pomoćnika, bez tunela) je konfigurisanje **vlastitih** Google OAuth web akreditiva + javnog baznog URL-a; pogledajte environment varijable OAuth-a provajdera. Dvije opcije iznad ne zahtijevaju dodatno Google podešavanje.

---

## Povezivanje Codex / Grok na udaljenoj instalaciji (provajderi sa fiksiranim loopback-om)

Codex, xAI (`xai-oauth`) i Grok CLI (`grok-cli`) registruju **fiksirani** loopback `redirect_uri` kod svoje upstream OAuth aplikacije. OmniRoute to ne može promijeniti — provajder uvijek šalje pretraživač nazad na istu hardkodiranu adresu:

| Provajder   | Fiksirani callback na koji provajder preusmjerava |
| ----------- | ------------------------------------------------- |
| `codex`     | `http://localhost:1455/auth/callback`             |
| `xai-oauth` | `http://127.0.0.1:56121/callback`                 |
| `grok-cli`  | `http://127.0.0.1:56122/callback`                 |

`localhost` ovdje znači **mašinu na kojoj se pokreće pretraživač**, dok OmniRoute-ov PKCE callback server osluškuje na loopback-u **servera**. Otvorite kontrolnu tablu na LAN adresi kao što je `http://192.168.0.15:20128` i njih dvoje se nikada ne susretnu: autorizacioni kod se isporučuje na `localhost:1455` vašeg laptopa, gdje ništa ne osluškuje, a provajder ne uspijeva da izvrši prijavu bez prikazivanja greške.

Kontrolna tabla ovo detektuje prije otvaranja iskačućeg prozora i prikazuje komandu za tunel umjesto da dozvoli da prijava neuspješno prođe tiho (#8046).

### Rješenje — proslijedite **oba** porta

```bash
# Na mašini na kojoj se pokreće PRETRAŽIVAČ:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# zatim idite na http://localhost:20128 i povežite Codex odatle
```

Potrebna su dva prosljeđivanja, a prosljeđivanje samo jednog i dalje ne uspijeva:

- **`20128`** (port kontrolne table) čini porijeklo pravim localhost-om, što je ono što uopšte tjera OmniRoute da pokrene PKCE callback server — LAN porijeklo nikada ne stiže do te grane.
- **`1455`** (fiksirani callback port provajdera) je mjesto na koje se pretraživač vraća; on mora proći kroz tunel do loopback-a servera.

Zamijenite `1455` sa `56121`/`56122` kada povezujete xAI ili Grok CLI, a `20128` sa vašim stvarnim portom kontrolne table. Držite tunel otvorenim dok se veza ne prikaže kao aktivna.

> **Nemate SSH pristup?** Codex i Grok CLI takođe prihvataju zalijepljeni token — kartica **Paste API Key** / **Import auth.json** u dijalogu za povezivanje. Ta putanja nema loopback callback, tako da radi sa bilo kog porijekla. Codex dodatno prihvata običan pristupni token ili `~/.codex/auth.json` sesijski blob.

---

## Upravljanje tokenima

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ ispisuje tajnu SAMO JEDNOM — odmah je kopirajte
omniroute tokens list                 # maskirano: id, naziv, opseg, prefiks, status, istek
omniroute tokens revoke <id|prefix>   # trenutni opoziv
omniroute tokens scopes               # objašnjava tri opsega
```

Naredbe `tokens` zahtijevaju vjerodajnicu **admin**. Tokenima možete upravljati i na kontrolnoj tabli pod **Settings → Access Tokens** (kreiranje, opoziv, kopiranje jednom). Token se nikada ne može izdati s većim privilegijama od onih koje ima njegov kreator. Token `admin` može izdati samo operater — sesija kontrolne table, lokalni CLI na samom serveru ili `omniroute connect` s lozinkom. Mašinske vjerodajnice (pristupni token `admin` ili API ključ s opsegom `manage`/`admin`) mogu izdavati samo tokene `write` i `read`; traženje `--scope admin` od njih vraća `403`. Isključivanje prijave ne otvara izdavanje: pristupni token bilo kojeg opsega je vjerodajnica koju prihvataju rute koje uvijek zahtijevaju autentifikaciju, pa anonimni poziv dobija `401` pri bilo kojem opsegu.

---

## Konfigurisanje CLI-ja za kodiranje iz udaljenog kataloga

`omniroute configure` čita živi katalog modela **aktivnog servera** i zapisuje konfiguraciju na **vaš** računar.

```bash
omniroute configure codex
#   Provajderi: glm, kmc, ollamacloud, opencode-go, …
#   Provajder: glm
#   ID modela: glm/glm-5.2
#   ✔ Zapisano ~/.codex/glm52.config.toml
#   Upotreba:  codex --profile glm52

# neinteraktivno
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# zadržite često korišteni model na vrhu interaktivnog izbornika
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

Birač u lokalnoj datoteci `model-preferences.json` pohranjuje samo ID-jeve modela (nikada URL-ove ili vjerodajnice), unutar konteksta i cilja CLI-ja. Favoriti se prikazuju prije nedavnih izbora; pomoću `--unfavorite` uklonite odabrani model s liste tog konteksta/cilja.

Zapisani profil se na ključ za inferenciju poziva preko okolinske varijable (`OMNIROUTE_API_KEY`) — tajna se nikada ne zapisuje na disk. Za jednokratno osnovno podešavanje Codexa (blok `[model_providers.omniroute]`) pogledajte [CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md).

### Pokretanje CLI-ja protiv udaljenog servera (bez zapisivanja konfiguracije)

`omniroute run <target>` također poštuje aktivni kontekst: udaljeni bazni URL i vjerodajnica konteksta ubacuju se samo u pokrenuti proces.

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → udaljeno
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# Pregled tačno onoga što će se pokrenuti (samo NAZIVI env varijabli, nikada vrijednosti):
omniroute run codex --dry-run --json
```

Ciljevi: `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini` (jedinstveni izvor: `bin/cli/cli-manifest.mjs`). Qwen i Gemini rade u privremenom izolovanom kućnom direktoriju koji se uklanja pri izlasku, pa pokretanje nikada ne dira niti curi u vašu ličnu konfiguraciju alata.

### Naredbe za podešavanje pojedinog CLI-ja

Svaki podržani CLI ima naredbu za podešavanje koja je svjesna udaljenog servera (sve poštuju aktivni kontekst ili `--remote <url> --api-key <key>`):

| CLI         | Naredba                    | Šta zapisuje                                                                                                                                                                          |
| ----------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Codex       | `omniroute setup-codex`    | profili `~/.codex/<name>.config.toml` (po modelu)                                                                                                                                     |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (po modelu)                                                                                                                                 |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json` — provajder `omniroute` kompatibilan s openai sa svim modelima iz kataloga (pokrenite `opencode -m omniroute/<model>`)                             |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (CLI način) + ispisuje postavke proširenja VS Code za lijepljenje (kompatibilno s OpenAI, Base URL **bez** `/v1`)                          |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + postavke VS Code `kilocode.*` — kompatibilno s OpenAI, Base URL **sa** `/v1`                                                                  |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + CLI `cn`) — `provider: openai`, `apiBase` **sa** `/v1`, ključ preko `${{ secrets.OMNIROUTE_API_KEY }}`                                 |
| Cursor      | `omniroute setup-cursor`   | ispisuje korake u aplikaciji (Settings → Models → Override OpenAI Base URL **sa** `/v1` + ključ + model). Konfiguracija Cursora je neprozirna SQLite — samo panel za chat             |
| Roo Code    | `omniroute setup-roo`      | zapisuje uvozni JSON za Roo (`~/.omniroute/roo-settings.json`), postavlja `roo-cline.autoImportSettingsPath` i ispisuje korake u UI-ju (kompatibilno s OpenAI, Base URL **sa** `/v1`) |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — provajder `openai-compat`, `base_url` **sa** `/v1`, ključ preko `$OMNIROUTE_API_KEY`                                                                   |
| Zed         | `omniroute setup-zed`      | `~/.config/zed/settings.json` — `language_models.openai_compatible.omniroute`, `api_url` **sa** `/v1`, ključ Zed čita iz `$OMNIROUTE_API_KEY` (nikada se ne zapisuje)                 |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + `OPENAI_HOST` **bez** `/v1` + `GOOSE_MODEL`) + env recept                                                                    |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`openai-api-base` **bez** `/v1` + `model: openai/<id>`) + env recept (`aider --message --yes`)                                                                   |
| Qwen Code   | `omniroute setup-qwen`     | `~/.qwen/settings.json` V4 unos `modelProviders.openai` + `OMNIROUTE_API_KEY` u `~/.qwen/.env`                                                                                        |

```bash
# OpenCode (provajder kompatibilan s openai, svi modeli iz kataloga, udaljeni VPS)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # zadrži samo odgovarajuće modele
opencode -m omniroute/glm/glm-5.2 "..."          # prvo izvezite OMNIROUTE_API_KEY
```

> OpenCode ima i bogatiju integraciju u obliku **dodatka**: `omniroute setup opencode` (sada svjestan udaljenog servera putem `--remote`) instalira `@omniroute/opencode-plugin`.
> `setup-opencode` je lakša alternativa kompatibilna s openai. Ključ API se referencira putem `{env:OMNIROUTE_API_KEY}` — nikada se ne zapisuje na disk.
>
> Na OpenCode v2 umjesto toga koristite `@omniroute/opencode-plugin-v2`: isti katalog, drugačiji ugovor učitavača. Kada je integracija povezana, čita ključ iz vlastitog skladišta vjerodajnica OpenCodea, pa udaljenom pristupniku ključ u `opencode.json` uopće nije potreban.

---

## Upravljanje kontekstima (prebacivanje između servera)

**Kontekst** je sačuvani server (baseUrl + akreditiv + opseg). `omniroute connect`
kreira jedan i čini ga aktivnim; od tada svaka komanda cilja na njega. Upravljajte i
prebacujte se između njih pomoću `omniroute contexts`:

```bash
omniroute contexts list            # svi konteksti; aktivni je označen sa ●
omniroute contexts current         # aktivni server, status autentifikacije, opseg
```

```text
  | Name    | Base URL                  | Auth  | Scope | Description
● | vps     | http://100.67.86.91:20128 | token | admin | Remote OmniRoute (…)
  | default | http://localhost:20128    | ✗     |       |
```

**Prebacivanje servera** — svaka naredna komanda prati aktivni kontekst:

```bash
omniroute contexts use vps         # → sve komande sada pogađaju udaljeni VPS
omniroute tokens list              #   (pokreće se na VPS-u)

omniroute contexts use default     # → nazad na localhost
omniroute tokens list              #   (pokreće se na lokalnom serveru)
```

**Ručno dodavanje konteksta** (umjesto `connect`), pregled ili preimenovanje:

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "staging box"
omniroute contexts show staging    # potpuni detalji za jedan kontekst
omniroute contexts rename staging stg
```

**Uklanjanje konteksta** — traži potvrdu; proslijedite `--yes` da biste je preskočili
(potrebno za skripte / neinteraktivne shell-ove, koji bi inače sigurno odbili):

```bash
omniroute contexts remove stg --yes
```

> `default` (localhost) se ne može ukloniti. Uklanjanje aktivnog konteksta vraća
> na `default`. Savjet: uklanjanje konteksta samo briše **lokalno** sačuvani akreditiv —
> opozovite token na serveru pomoću `omniroute tokens revoke <id>` da biste zaista
> prekinuli pristup.

**Izvoz / uvoz** konteksta (npr. za premještanje između mašina). Izvozi izostavljaju
akreditive po defaultu, uključujući akreditive pohranjene putem rezervnog fajla. Koristite
`--include-secrets` eksplicitno kada je potrebna prenosiva sigurnosna kopija koja sadrži akreditive:

```bash
omniroute contexts export --out contexts.json     # redigovano; podrazumevana destinacija: stdout
omniroute contexts export --include-secrets --out private-contexts.json
omniroute contexts import contexts.json            # prepiši; --merge da zadrži postojeće
omniroute contexts migrate --yes                  # premesti stare plaintext tokene u keychain
```

`--include-secrets` rješava reference na keychain prije izvoza i ne uspijeva ako se
bilo koji referencirani akreditiv ne može pročitati. `--no-secrets` uvijek ima prioritet.
Izvozni fajlovi se pišu atomski sa modom `0600`. Tretirajte eksplicitni
izvoz koji sadrži tajne kao tajni materijal. Na sistemima bez glave bez upotrebljivog OS
keychaina, CLI se vraća na `config.json` sa modom `0600` i ispisuje
jednokratno upozorenje; podrazumevani izvoz ostaje redigovan u ovom modu.

---

## Brza provjera od kraja do kraja

Ciklus kopiraj-zalijepi za provjeru udaljenog podešavanja od nule — povežite se,
kreirajte token sa opsegom, usmjerite komandu, vratite se nazad i uklonite sve.
Zamijenite `192.168.0.15` sa hostom/IP adresom vašeg servera (Tailscale, LAN ili
javni `https://…` URL).

```bash
# 1. Povezivanje (lozinka → admin token, sačuvan kao kontekst koji postaje aktivan)
omniroute connect 192.168.0.15                 # ili: --key oma_live_xxxx  (bez lozinke)
omniroute contexts current                     # prikazuje udaljeni server + opseg

# 2. Korištenje — komande za upravljanje sada se izvršavaju na udaljenom serveru
omniroute tokens create --name laptop --scope read   # kreiraj uži token
omniroute tokens list                                 # maskirana lista, sa udaljenog servera

# 3. Prebacivanje nazad i naprijed
omniroute contexts use default                 # → lokalno
omniroute contexts use 192-168-0-15            # → ponovo udaljeno (naziv iz `contexts list`)

# 4. Uklanjanje. NAPOMENA: `contexts remove` samo briše LOKALNE akreditive —
#    NE opoziva token na serveru. Prvo opozovite na strani servera ako
#    želite zaista prekinuti pristup.
omniroute tokens revoke <id|prefix>            # prekida pristup na serveru
omniroute contexts remove 192-168-0-15 --yes   # ukloni lokalni kontekst (čak i ako je aktivan → vraća se na default), bez upita
```

> `--yes` čini `contexts remove` neinteraktivnim (potrebno u skriptama/CI; bez toga,
> neinteraktivna ljuska sigurno odbija umjesto da se zamrzne). Uklanjanje **aktivnog**
> konteksta automatski vraća na `default`.

---

## Sigurnosne napomene

- Token u čistom tekstu se prikazuje samo jednom; samo se SHA-256 hash trajno pohranjuje (isto kao i kod API ključeva).
- `omniroute connect` ponovo koristi mehanizam zaključavanja pri pokušaju brute-force napada na prijavu + revizijsko evidentiranje.
- Preferirajte HTTPS ili Tailnet za transport; goli host se po zadanom postavlja na `http://`
  radi praktičnosti LAN/Tailscale mreže — proslijedite puni `https://…` URL za TLS.
- Preferirana lokalna datoteka konteksta je `~/.omniroute/config.json` (`chmod 600`)
  koja sadrži samo `credentialRef`; sam token se pohranjuje u privjesak ključeva
  operativnog sistema (`keytar`) i nikada se ne ispisuje u zapisnicima. Headless
  instalacije bez funkcionalnog izvornog privjeska ključeva koriste istu `0600`
  datoteku kao eksplicitnu rezervnu opciju i jednom emituju upozorenje. Koristite
  `omniroute contexts migrate --yes` nakon instalacije pozadinskog sistema za
  privjesak ključeva.

---

## API krajnje tačke (referenca)

| Metoda | Ruta                  | Autorizacija        | Opseg                         |
| ------ | --------------------- | ------------------- | ----------------------------- |
| POST   | `/api/cli/connect`    | upravljačka lozinka | — (javno, zaštićeno lozinkom) |
| GET    | `/api/cli/whoami`     | pristupni token     | čitanje                       |
| GET    | `/api/cli/tokens`     | pristupni token     | admin                         |
| POST   | `/api/cli/tokens`     | pristupni token     | admin                         |
| DELETE | `/api/cli/tokens/:id` | pristupni token     | admin                         |

Pogledajte [openapi.yaml](../openapi.yaml) za potpune sheme.
