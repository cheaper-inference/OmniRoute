# Remote Mode (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

Palaidiet `omniroute` CLI savā klēpjdatorā, kamēr pats OmniRoute darbojas citur
(VPS, mājas serverī vai citā ierīcē jūsu Tailnet tīklā). Vienreiz piesakieties ar
`omniroute connect`, un turpmāk **katra** CLI komanda tiks izpildīta attālajā
serverī — tās pašas komandas, tā pati izvade, tikai izpilde notiek attāli.

Nav jāinstalē otrs rīks: attālais režīms izmanto parasto `omniroute` CLI
kopā ar tvēruma **piekļuves pilnvarām**.

```bash
npm install -g omniroute                 # parastais CLI
omniroute connect 192.168.0.15           # pieteikšanās (parole → tvēruma pilnvara)
omniroute models list                    # ← tagad uzskaita ATTĀLĀ servera modeļus
omniroute configure codex                # ← izveido lokālu Codex profilu no attālā kataloga
```

---

## Kā tas darbojas

```
jūsu klēpjdators                         attālais OmniRoute (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ omniroute CLI      │  POST /api/cli/connect  (parole → pilnvara)        │
│  konteksts: vps    │ ───────────────►  │ izveido tvēruma piekļuves      │
│  baseUrl, pilnvara │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ pilnvaru; katrs pārvaldības     │
│ raksta konfigurāciju│ ◄───────────────  │ maršruts pārbauda tās tvērumu  │
│ LOKĀLI             │                   └───────────────────────────────┘
└────────────────────┘
```

- **Konteksti** glabā pa vienam serverim (`~/.omniroute/config.json`, `chmod 600`).
  `omniroute contexts use <name>` pārslēdz aktīvo serveri; `default` ir lokālais.
- **Piekļuves pilnvaras** (`oma_live_…`) autorizē pārvaldības komandas. Tās
  atšķiras no inferenču API atslēgām (`sk-…`, ko izmanto `/v1/chat/completions`).
- Servera pusē tiek glabāts tikai pilnvaras SHA-256 jaucējkods. Pilnvara atklātā
  tekstā tiek parādīta **vienreiz** — izveides brīdī.

---

## Savienojuma izveide

### Ar pārvaldības paroli (sākotnējā iestatīšana)

```bash
omniroute connect 192.168.0.15
# Pārvaldības parole serverim http://192.168.0.15:20128: ********
# ✔ Savienots ar http://192.168.0.15:20128 — konteksts '192.168.0.15' (tvērums: admin)
```

Paroles plūsma pēc noklusējuma izveido **admin** pilnvaru (jums ir parole, tātad
jums jau ir pilna kontrole). Samaziniet tvērumu ar `--scope`:

```bash
omniroute connect 192.168.0.15 --scope write
```

Opcijas: `--port <p>` (ja resursdatoram nav norādīts ports), `--name <ctx>` (konteksta nosaukums),
`--scope read|write|admin`. Pilns URL tiek izmantots tieši tā, kā norādīts:
`omniroute connect https://omni.example.com`.

### Ar iepriekš ģenerētu pilnvaru

Ģenerējiet tvēruma pilnvaru informācijas panelī (vai ar `omniroute tokens create`) un
ielīmējiet to — parole nav nepieciešama:

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

CLI to pārbauda, izmantojot `GET /api/cli/whoami`, un saglabā kā aktīvo kontekstu.

---

## Tvērumi

Trīs hierarhiski līmeņi (`admin ⊃ write ⊃ read`):

| Tvērums | Atļautās darbības                                                                                |
| ------- | ------------------------------------------------------------------------------------------------ |
| `read`  | uzskaitīt/pārbaudīt — `models list`, `providers status`, `logs`, `usage`, `cost`                 |
| `write` | lasīt **+** konfigurēt/lieto — `setup-codex`, `keys add`, `config set`, kombinācijas             |
| `admin` | rakstīt **+** pārvaldīt — `tokens` CRUD, pievienot nodrošinātājus, pakalpojumus, politiku, oauth |

Serveris nosaka katram maršrutam nepieciešamo tvērumu pēc HTTP metodes
(`GET`→read, izmaiņas→write), kā arī izmanto admin atļauto sarakstu sensitīvajām
saskarnēm (`/api/cli/tokens`, `/api/providers` izmaiņas, `/api/oauth`, `/api/services`, …).
Pilnvara ar nepietiekamu tvērumu saņem `403` ar skaidru ziņojumu.

> Maršruti, kas palaiž procesus (`/api/services/*`, `/api/mcp/*`, …), paliek
> pieejami **tikai lokālajā cilpā** — attāla pilnvara tiem nekad nevar piekļūt
> neatkarīgi no tvēruma.

---

## Antigravity savienošana attālā instalācijā

Antigravity izmanto Google pirmās puses/vietējās lietotnes piekrišanas ekrānu. Google
izsniedz autorizācijas kodu tikai tad, ja **atgriezeniskās cilpas novirzīšana**
(`http://127.0.0.1:<port>/callback`) ir **sasniedzama no pārlūkprogrammas, kurā
tiek apstiprināta pierakstīšanās**. Attālā VPS instalācijā šī atgriezeniskā cilpa
atrodas serverī, nevis jūsu datorā, tāpēc piekrišanas ekrāns **uzkaras uz visiem
laikiem un nekad neizsniedz kodu** — parastajā rezerves variantā „ielīmējiet
atzvanīšanas URL” nav nekā, ko ielīmēt. (Tas ir Google puses ierobežojums: tāda
pati uzkāršanās notiek jebkurā starpniekserverī, kas izmanto komplektācijā iekļauto
Antigravity darbvirsmas klientu, ne tikai OmniRoute.)

Informācijas panelis to nosaka, pirms nonākat strupceļā: atverot **Pakalpojumu sniedzēji → Antigravity →
Savienot** no adreses, kas nav localhost, vispārīgais paziņojums „kopējiet atzvanīšanas URL”
tiek aizstāts ar abiem tālāk norādītajiem risinājumiem, kuros jūsu resursdators un ports
jau ir aizpildīti. (Arī LAN adrese tiek ņemta vērā — attiecībā uz šo atzvanīšanu
`192.168.x.x` nav localhost.)

Ir divi atbalstīti veidi, kā savienot Antigravity ar attālu OmniRoute.

### A variants — lokālais pieteikšanās palīgrīks (ieteicams)

Palaidiet OAuth **savā datorā**, kur `127.0.0.1` ir sasniedzama. Palīgrīks
sazinās ar Google tieši, tāpēc piekrišanas process tiek pabeigts tur, kur informācijas
paneļa versija to nevar paveikt.

**Ja savienojums jau ir izveidots** (`omniroute connect <host>`), nekas nav
jākopē — palīgrīks jūsu vietā nogādā akreditācijas datus attiecīgajai instalācijai:

```bash
# Jūsu LOKĀLAJĀ datorā (nepieciešams Node.js un pārlūkprogramma):
omniroute connect 192.168.0.15        # vienreiz — izveido administratora tvēruma konteksta pilnvaru
npx omniroute login antigravity
#   ↳ atver Google piekrišanas ekrānu, uztver atzvanīšanu lokālā atgriezeniskās cilpas portā,
#     apmaina to un ar POST nosūta akreditācijas datus aktīvajam kontekstam:
#
#   Antigravity savienots vietnē http://192.168.0.15:20128 (savienojums abc123).
#   Nekas nav jāielīmē — varat aizvērt šo termināli.
```

Nosūtīšana notiek automātiski, kad aktīvais konteksts norāda uz citu
datoru. Piespiediet to jebkurā virzienā ar `--push` / `--no-push` vai norādiet konkrētu
kontekstu ar `--context <name>`.

**Ja jūsu dators nevar sasniegt VPS** (ugunsmūra dēļ, nav SSH vai darbstacija ir izolēta),
palīgrīks tik un tā darbojas — tam _nepieciešams_ tikai Google. Izmantojiet `--no-push`
vai vienkārši ļaujiet nosūtīšanai neizdoties: autorizācija, ko jau pabeidzāt, netiks
atmesta, bet tā vietā palīgrīks izdrukās datu bloku.

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

Pēc tam **attālajā** informācijas panelī atveriet **Pakalpojumu sniedzēji → Antigravity → Savienot** un ielīmējiet
`omniroute-cred-v1.…` datu bloku **2. darbības** laukā (tas pieņem gan
atzvanīšanas URL, gan akreditācijas datu bloku). OmniRoute to atkodē, servera pusē
izpilda Cloud Code sākotnējo iestatīšanu un saglabā savienojumu.

> Datu blokā ir atsvaidzināšanas pilnvara — izturieties pret to kā pret paroli. Izmantojot nosūtīšanu, tas
> tiek vienreiz nosūtīts, izmantojot jūsu konteksta autentificēto savienojumu; izmantojot
> ielīmēšanu — jūsu informācijas paneļa savienojumu. Abos gadījumos tas miera stāvoklī tiek glabāts
> šifrētā veidā, un veiksmīgas nosūtīšanas gadījumā tas nekad netiek izdrukāts terminālī.

Karodziņi: `--no-browser` (izdrukāt URL, nevis automātiski to atvērt), `--port <n>`
(fiksēt atgriezeniskās cilpas portu), `--timeout <ms>`, `--push` / `--no-push` (ignorēt
automātiskās piegādes iestatījumu), `--context <name>` (norādīt konkrētu kontekstu).

### B variants — SSH lokālās pārsūtīšanas tunelis

Ja jums ir SSH piekļuve VPS, pārsūtiet informācijas paneļa portu, lai
atgriezeniskās cilpas atzvanīšana caur tuneli atkal nonāktu serverī:

```bash
# Jūsu LOKĀLAJĀ datorā:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# pēc tam LOKĀLAJĀ pārlūkprogrammā atveriet http://localhost:20128 un savienojiet Antigravity
# kā parasti — 127.0.0.1:20128/callback novirzīšana tagad sasniedz VPS, izmantojot SSH.
```

Tā kā informācijas panelim piekļūstat kā `localhost:20128`, Google piekrišanas
process tiek pabeigts un atzvanīšana tiek nogādāta serverī caur to pašu tuneli —
datu bloks nav nepieciešams. Turiet tuneli atvērtu, līdz savienojums tiek parādīts kā aktīvs.

Atšķirībā no tālāk minētajiem pakalpojumu sniedzējiem ar fiksētu atgriezenisko cilpu, šeit pietiek ar **vienu pārsūtīšanu**:
Antigravity atzvanīšana izmanto pašu informācijas paneļa portu, tāpēc nav nepieciešams
tunelēt otru, konkrētajam pakalpojumu sniedzējam paredzētu portu.

> Pilnībā bezgalvas alternatīva (bez palīgrīka un tuneļa) ir konfigurēt **savus**
> Google OAuth tīmekļa akreditācijas datus un publisku bāzes URL; skatiet pakalpojumu sniedzēja OAuth
> vides mainīgos. Abiem iepriekš minētajiem variantiem nav nepieciešama papildu Google konfigurācija.

---

## Codex / Grok savienošana attālā instalācijā (pakalpojumu sniedzēji ar fiksētu atgriezeniskās cilpas adresi)

Codex, xAI (`xai-oauth`) un Grok CLI (`grok-cli`) savā augšupējā OAuth lietotnē reģistrē
**fiksētu** atgriezeniskās cilpas `redirect_uri`. OmniRoute to nevar mainīt — pakalpojumu
sniedzējs vienmēr novirza pārlūkprogrammu atpakaļ uz to pašu iepriekš definēto adresi:

| Pakalpojumu sniedzējs | Fiksētais atzvanīšanas URL, uz kuru novirza pakalpojumu sniedzējs |
| --------------------- | ----------------------------------------------------------------- |
| `codex`               | `http://localhost:1455/auth/callback`                             |
| `xai-oauth`           | `http://127.0.0.1:56121/callback`                                 |
| `grok-cli`            | `http://127.0.0.1:56122/callback`                                 |

`localhost` šeit nozīmē **datoru, kurā darbojas pārlūkprogramma**, savukārt OmniRoute PKCE
atzvanīšanas serveris klausās **servera** atgriezeniskās cilpas interfeisā. Atverot informācijas paneli
LAN adresē, piemēram, `http://192.168.0.15:20128`, tie nekad nesavienojas: autorizācijas
kods tiek piegādāts jūsu klēpjdatora adresei `localhost:1455`, kur nekas neklausās,
un pakalpojumu sniedzējs nevar pabeigt pierakstīšanos, neparādot kļūdu.

Informācijas panelis to nosaka pirms uznirstošā loga atvēršanas un parāda tuneļa komandu,
nevis ļauj pieteikšanās procesam nemanāmi izgāzties (#8046).

### Risinājums — pārsūtiet **abas** pieslēgvietas

```bash
# Datorā, kurā darbojas PĀRLŪKPROGRAMMA:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# pēc tam atveriet http://localhost:20128 un no turienes savienojiet Codex
```

Ir nepieciešamas divas pārsūtīšanas; arī tikai vienas pieslēgvietas pārsūtīšana nedarbosies:

- **`20128`** (informācijas paneļa pieslēgvieta) padara izcelsmi par īstu lokālo `localhost`, kas
  vispār ļauj OmniRoute palaist PKCE atzvanīšanas serveri — LAN izcelsme nekad
  nesasniedz šo atzaru.
- **`1455`** (pakalpojumu sniedzēja fiksētā atzvanīšanas pieslēgvieta) ir vieta, uz kuru pārlūkprogramma tiek novirzīta
  atpakaļ; tai pa tuneli jāsasniedz servera atgriezeniskās cilpas interfeiss.

Savienojot xAI vai Grok CLI, aizstājiet `1455` ar `56121`/`56122`, bet `20128` — ar
savu faktisko informācijas paneļa pieslēgvietu. Turiet tuneli atvērtu, līdz savienojums tiek parādīts kā
aktīvs.

> **Nav SSH piekļuves?** Codex un Grok CLI pieņem arī ielīmētu pilnvaru — savienošanas dialoglodziņa cilnē **Ielīmēt API
> atslēgu** / **Importēt auth.json**. Šajā ceļā netiek izmantota atgriezeniskās cilpas
> atzvanīšana, tāpēc tas darbojas no jebkuras izcelsmes. Codex papildus pieņem vienkāršu piekļuves
> pilnvaru vai `~/.codex/auth.json` sesijas bloku.

---

## Žetonu pārvaldība

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ parāda noslēpumu VIENREIZ — nokopējiet to tūlīt
omniroute tokens list                 # maskēti: id, nosaukums, scope, prefikss, statuss, derīguma beigas
omniroute tokens revoke <id|prefix>   # nekavējoties atsaukt
omniroute tokens scopes               # paskaidro trīs scope līmeņus
```

`tokens` komandām nepieciešama **admin** pilnvara. Žetonus var pārvaldīt arī infopanelī sadaļā **Iestatījumi → Piekļuves žetoni** (izveidot, atsaukt, nokopēt vienreiz).

Žetonu nekad nevar izdot ar lielākām privilēģijām, nekā ir tā izveidotājam. `admin` žetonu var izveidot tikai operators: infopaneļa sesija, vietējais CLI uz pašā serverī vai `omniroute connect` ar paroli. Mašīnu pilnvaras (`admin` piekļuves žetons vai API atslēga ar `manage`/`admin` darbības jomu) var izdot tikai `write` un `read` žetonus. Ja tās pieprasa `--scope admin`, atgriež `403`. Pieteikšanās atspējošana neatver žetonu izdošanu: jebkuras darbības jomas piekļuves žetons ir pilnvara, ko vienmēr autentificētie maršruti pieņem, tāpēc anonīms izsaukums jebkurā darbības jomā saņem `401`.

---

## Kodēšanas CLI konfigurēšana no attālā kataloga

`omniroute configure` nolasa **aktīvā servera** tiešraides modeļu katalogu un ieraksta konfigurāciju **jūsu** mašīnā.

```bash
omniroute configure codex
#   Pakalpojumu sniedzēji: glm, kmc, ollamacloud, opencode-go, …
#   Pakalpojumu sniedzējs: glm
#   Modeļa id: glm/glm-5.2
#   ✔ Ierakstīts ~/.codex/glm52.config.toml
#   Izmantošana:  codex --profile glm52

# neinteraktīvi
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# turiet bieži lietotu modeli interaktīvās izvēles augšdaļā
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

Izvēles rīks lokālajā failā `model-preferences.json` glabā tikai modeļu ID (nekad URL vai pilnvaras), ierobežotas pēc konteksta un CLI mērķa. Izlase tiek rādīta pirms nesenajām izvēlēm. Izmantojiet `--unfavorite`, lai noņemtu izvēlēto modeli no šī konteksta/mērķa saraksta.

Ierakstītais profils atsaucas uz inferences atslēgu caur vides mainīgo `OMNIROUTE_API_KEY`. Noslēpums uz disku nekad netiek ierakstīts. Vienreizējai pamata Codex iestatīšanai (`[model_providers.omniroute]` bloks) skat. [CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md).

### CLI palaišana pret attālu serveri (konfigurācija netiek ierakstīta)

`omniroute run <target>` arī ņem vērā aktīvo kontekstu: attālā servera bāzes URL un konteksta pilnvara tiek ievadītas tikai palaistajā procesā.

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → attālais serveris
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# Precīzi priekšskatiet, kas tiktu palaists (tikai vides mainīgo nosaukumi, nekad vērtības):
omniroute run codex --dry-run --json
```

Mērķi: `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini` (vienīgais avots: `bin/cli/cli-manifest.mjs`). Qwen un Gemini darbojas pagaidu izolētā mājas direktorijā, kas tiek noņemta pēc izejas, tāpēc palaišana nekad neskar jūsu personisko rīku konfigurāciju un nenonāk tajā.

### Iestatīšanas komandas katram CLI

Katram atbalstītajam CLI ir attālumam pielāgota iestatīšanas komanda (visas ņem vērā aktīvo kontekstu vai `--remote <url> --api-key <key>`):

| CLI         | Komanda                    | Ko tā ieraksta                                                                                                                                                                                              |
| ----------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Codex       | `omniroute setup-codex`    | `~/.codex/<name>.config.toml` profili (pa modeli)                                                                                                                                                           |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (pa modeli)                                                                                                                                                       |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json`: pakalpojumu sniedzējs `omniroute` ar openai saderīgu API un visiem kataloga modeļiem (palaidiet `opencode -m omniroute/<model>`)                                        |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (CLI režīms) + izdrukā VS Code paplašinājuma iestatījumus ielīmēšanai (OpenAI saderīgs, Base URL **bez** `/v1`)                                                  |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + VS Code `kilocode.*` iestatījumi: OpenAI saderīgs, Base URL **ar** `/v1`                                                                                            |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + `cn` CLI): `provider: openai`, `apiBase` **ar** `/v1`, atslēga caur `${{ secrets.OMNIROUTE_API_KEY }}`                                                       |
| Cursor      | `omniroute setup-cursor`   | izdrukā soļus lietotnē (Settings → Models → Override OpenAI Base URL **ar** `/v1` + atslēga + modelis). Cursor konfigurācija ir necaurspīdīga SQLite datubāze, tāpēc tā attiecas tikai uz tērzēšanas paneli |
| Roo Code    | `omniroute setup-roo`      | ieraksta Roo importa failu JSON formātā (`~/.omniroute/roo-settings.json`) + iestata `roo-cline.autoImportSettingsPath` + izdrukā UI soļus (OpenAI saderīgs, Base URL **ar** `/v1`)                         |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json`: pakalpojumu sniedzējs `openai-compat`, `base_url` **ar** `/v1`, atslēga caur `$OMNIROUTE_API_KEY`                                                                             |
| Zed         | `omniroute setup-zed`      | `~/.config/zed/settings.json`: `language_models.openai_compatible.omniroute`, `api_url` **ar** `/v1`, atslēgu Zed nolasa no `$OMNIROUTE_API_KEY` (nekad netiek ierakstīta)                                  |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + `OPENAI_HOST` **bez** `/v1` + `GOOSE_MODEL`) + env recepte                                                                                         |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`openai-api-base` **bez** `/v1` + `model: openai/<id>`) + env recepte (`aider --message --yes`)                                                                                        |
| Qwen Code   | `omniroute setup-qwen`     | `~/.qwen/settings.json`, V4 ieraksts `modelProviders.openai` + `OMNIROUTE_API_KEY` failā `~/.qwen/.env`                                                                                                     |

```bash
# OpenCode (openai saderīgs pakalpojumu sniedzējs, visi kataloga modeļi, attālais VPS)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # paturēt tikai atbilstošos modeļus
opencode -m omniroute/glm/glm-5.2 "..."          # vispirms eksportējiet OMNIROUTE_API_KEY
```

> OpenCode ir arī bagātāka **plugin** integrācija: `omniroute setup opencode`
> (tagad attālumam pielāgota, izmantojot `--remote`) instalē `@omniroute/opencode-plugin`.
> `setup-opencode` ir vieglāka openai saderīga alternatīva. API atslēga tiek atsaukta
> caur `{env:OMNIROUTE_API_KEY}` un nekad netiek ierakstīta uz diska.
>
> OpenCode v2 izmantojiet `@omniroute/opencode-plugin-v2`: tas pats katalogs,
> bet cits ielādētāja līgums. Kad integrācija ir savienota, tas nolasa atslēgu no paša OpenCode
> pilnvaru krātuves, tāpēc attālajam vārtejam `opencode.json` atslēga vispār nav vajadzīga.

---

## Kontekstu pārvaldība (pārslēgšanās starp serveriem)

**Konteksts** ir saglabāts serveris (baseUrl + akreditācijas dati + tvērums). `omniroute connect` izveido vienu un padara to aktīvu; no tā brīža katra komanda to mērķē. Pārvaldiet un pārslēdzieties starp tiem ar `omniroute contexts`:

```bash
omniroute contexts list            # visi konteksti; aktīvais ir atzīmēts ar ●
omniroute contexts current         # aktīvais serveris, autentifikācijas statuss, tvērums
```

```text
  | Name    | Base URL                  | Auth  | Scope | Description
● | vps     | http://100.67.86.91:20128 | token | admin | Remote OmniRoute (…)
  | default | http://localhost:20128    | ✗     |       |
```

**Pārslēgt serverus** — katra nākamā komanda seko aktīvajam kontekstam:

```bash
omniroute contexts use vps         # → visas komandas tagad mērķē attālo VPS
omniroute tokens list              #   (darbojas pret VPS)

omniroute contexts use default     # → atpakaļ uz localhost
omniroute tokens list              #   (darbojas pret lokālo serveri)
```

**Pievienot kontekstu manuāli** (`connect` vietā), pārbaudīt vai pārdēvēt:

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "staging box"
omniroute contexts show staging    # pilna informācija par vienu kontekstu
omniroute contexts rename staging stg
```

**Noņemt kontekstu** — prasa apstiprinājumu; nododiet `--yes`, lai to izlaistu (nepieciešams skriptiem / neinteraktīvām čaulām, kas citādi droši atteiksies):

```bash
omniroute contexts remove stg --yes
```

> `default` (localhost) nevar noņemt. Aktīvā konteksta noņemšana atgriežas pie `default`. Padoms: konteksta noņemšana tikai atceļ **lokāli** saglabātos akreditācijas datus — atsaukiet marķieri serverī ar `omniroute tokens revoke <id>`, lai faktiski pārtrauktu piekļuvi.

**Eksportēt / importēt** kontekstus (piemēram, lai tos pārvietotu starp mašīnām). Eksporti pēc noklusējuma izlaiž akreditācijas datus, ieskaitot akreditācijas datus, kas saglabāti ar failu atgriezenisko saiti. Izmantojiet `--include-secrets` skaidri, ja nepieciešama pārnēsājama dublējumkopija ar akreditācijas datiem:

```bash
omniroute contexts export --out contexts.json     # rediģēts; noklusējuma galamērķis: stdout
omniroute contexts export --include-secrets --out private-contexts.json
omniroute contexts import contexts.json            # pārrakstīt; --merge, lai saglabātu esošos
omniroute contexts migrate --yes                  # pārvietot vecos vienkāršā teksta marķierus uz atslēgu piekariņu
```

`--include-secrets` atrisina atslēgu piekariņa atsauces pirms eksportēšanas un neizdodas, ja kādu atsauci nevar nolasīt. `--no-secrets` vienmēr ir prioritāte. Eksporta faili tiek rakstīti atomiski ar režīmu `0600`. Uzskatiet skaidru eksportu ar slepeniem datiem par slepenu materiālu. Sistēmās bez galvas (headless systems) bez lietojama OS atslēgu piekariņa CLI atgriežas pie `config.json` ar režīmu `0600` un izdrukā vienreizēju brīdinājumu; noklusējuma eksports šajā režīmā paliek rediģēts.

---

## Ātra pilna procesa pārbaude

Kopēšanai un ielīmēšanai gatavs darbību cikls, lai attālo iestatījumu pārbaudītu no nulles —
izveidojiet savienojumu, izveidojiet pilnvaru ar noteiktu tvērumu, novirziet komandu, pārslēdzieties
atpakaļ un visu noņemiet. Aizstājiet `192.168.0.15` ar sava servera resursdatora nosaukumu/IP
(Tailscale, LAN vai publisku `https://…` URL).

```bash
# 1. Izveidojiet savienojumu (parole → administratora pilnvara, saglabāta kā konteksts, kas kļūst aktīvs)
omniroute connect 192.168.0.15                 # vai: --key oma_live_xxxx  (bez paroles)
omniroute contexts current                     # parāda attālo serveri un tvērumu

# 2. Izmantojiet to — pārvaldības komandas tagad tiek izpildītas attālajā serverī
omniroute tokens create --name laptop --scope read   # izveidojiet pilnvaru ar šaurāku tvērumu
omniroute tokens list                                 # maskēts saraksts no attālā servera

# 3. Pārslēdzieties turp un atpakaļ
omniroute contexts use default                 # → lokāli
omniroute contexts use 192-168-0-15            # → atkal attāli (nosaukums no `contexts list`)

# 4. Noņemiet visu. PIEZĪME: `contexts remove` dzēš tikai LOKĀLOS akreditācijas datus —
#    tā NEATSAUC pilnvaru serverī. Ja vēlaties faktiski liegt piekļuvi,
#    vispirms atsauciet pilnvaru serverī.
omniroute tokens revoke <id|prefix>            # liedz piekļuvi serverī
omniroute contexts remove 192-168-0-15 --yes   # noņem lokālo kontekstu (pat ja tas ir aktīvs → pāriet uz default), bez uzvednes
```

> `--yes` padara `contexts remove` neinteraktīvu (nepieciešams skriptos/CI; bez tā
> neinteraktīva čaula drošības nolūkos noraida darbību, nevis iestrēgst). Noņemot
> **aktīvo** kontekstu, automātiski tiek izmantots `default`.

---

## Drošības piezīmes

- Tokena atklātais teksts tiek parādīts vienu reizi; tiek saglabāts tikai SHA-256 jaucējkods (tāpat kā API atslēgām).
- `omniroute connect` atkārtoti izmanto pieteikšanās brutālā spēka uzbrukumu bloķēšanu un audita žurnalēšanu.
- Transportam dodiet priekšroku HTTPS vai Tailnet; nenorādot protokolu, resursdatoram pēc noklusējuma tiek izmantots `http://`
  ērtākai lietošanai LAN/Tailscale tīklā — TLS izmantošanai norādiet pilnu `https://…` URL.
- Ieteicamais lokālais konteksta fails ir `~/.omniroute/config.json` (`chmod 600`),
  un tajā ir tikai `credentialRef`; pats tokens tiek glabāts operētājsistēmas
  akreditācijas datu krātuvē (`keytar`) un nekad netiek izvadīts žurnālos. Bezinterfeisa instalācijas bez
  funkcionējošas vietējās akreditācijas datu krātuves izmanto to pašu `0600` failu kā nepārprotami norādītu rezerves risinājumu un
  vienreiz parāda brīdinājumu. Pēc akreditācijas datu krātuves aizmugursistēmas instalēšanas izmantojiet
  `omniroute contexts migrate --yes`.

---

## API galapunkti (uzziņai)

| Metode | Maršruts              | Autentifikācija    | Tvērums                            |
| ------ | --------------------- | ------------------ | ---------------------------------- |
| POST   | `/api/cli/connect`    | pārvaldības parole | — (publisks, aizsargāts ar paroli) |
| GET    | `/api/cli/whoami`     | piekļuves tokens   | lasīšana                           |
| GET    | `/api/cli/tokens`     | piekļuves tokens   | administrēšana                     |
| POST   | `/api/cli/tokens`     | piekļuves tokens   | administrēšana                     |
| DELETE | `/api/cli/tokens/:id` | piekļuves tokens   | administrēšana                     |

Pilnas shēmas skatiet failā [openapi.yaml](../openapi.yaml).
