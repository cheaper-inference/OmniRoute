# 🐳 Docker Guide — OmniRoute (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Išsami „Docker“ diegimo dokumentacija. Norėdami greitai pradėti, žr. [README „Docker“ skyrių](../README.md#-docker).

## Turinys

- [Greitas paleidimas](#quick-run)
- [Su aplinkos failu](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Galimi profiliai](#available-profiles)
- [Pagrindinio kompiuterio CLI įrankių konfigūravimas, kai „OmniRoute“ veikia „Docker“ aplinkoje](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [„Redis“ pagalbinis konteineris](#redis-sidecar)
- [Gamybinės aplinkos „Compose“](#production-compose)
- [Dockerfile etapai](#dockerfile-stages)
- [Kritiniai aplinkos kintamieji](#critical-environment-variables)
- [Docker Compose su „Caddy“ (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [„Cloudflare“ spartusis tunelis](#cloudflare-quick-tunnel)
- [Atvaizdų žymos](#image-tags)
- [Valdymo skydelio naujinimai „Docker“ aplinkoje](#dashboard-updates-in-docker)
- [Pasiekiamumas: numatytoji „SQLite“ konfigūracija palaiko vieną repliką](#availability-default-sqlite-is-single-replica)
- [„Gemini“ regioninės klaidos „Docker“ aplinkoje](#gemini-regional-errors-inside-docker)
- [Svarbios pastabos](#important-notes)

---

## Greitas paleidimas

> **Savarankiškas diegimas viena komanda?** Žr.
> [Savarankiško diegimo vadovą](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (publikuotas atvaizdas +
> „Redis“, pasiekiama tik per „loopback“, nereikia rinktis profilio). Toliau aprašytas greitasis paleidimas yra
> vieno konteinerio būdas naudotojams, kurie jau naudoja „Redis“ kitur.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Su aplinkos failu

```bash
# Pirmiausia nukopijuokite ir redaguokite .env
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
# Bazinis profilis (be CLI įrankių)
docker compose --profile base up -d

# CLI profilis (integruoti Claude Code, Codex, OpenClaw)
docker compose --profile cli up -d

# Pagrindinio kompiuterio profilis (pirmiausia skirtas Linux; pagrindinio kompiuterio CLI vykdomieji failai prijungiami tik skaitymo režimu)
docker compose --profile host up -d

# Žiniatinklio profilis (Chromium/Playwright žiniatinklio seansų teikėjams)
docker compose --profile web up -d

# CLI ir CLIProxyAPI pagalbinio konteinerio derinys
docker compose --profile cli --profile cliproxyapi up -d
```

## Galimi profiliai

„OmniRoute“ pateikia „Compose“ profilius pagrindiniams diegimo variantams. Pasirinkite jūsų aplinką atitinkantį profilį.

| Profilis             | Paslauga         | Kada naudoti                                                                                                                                                                                          | Komanda                                      |
| -------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (numatytasis) | `omniroute-base` | Serveris be grafinės sąsajos / minimali vykdymo aplinka, be įtrauktų teikėjų CLI                                                                                                                      | `docker compose --profile base up -d`        |
| `cli`                | `omniroute-cli`  | Agentinės darbo eigos, iškviečiančios `omniroute providers/setup/doctor`, ir įtraukti CLI (Codex, Claude Code, Droid, OpenClaw)                                                                       | `docker compose --profile cli up -d`         |
| `host`               | `omniroute-host` | „Linux“ pagrindiniai kompiuteriai, kuriems reikia į `network_mode` panašios prieigos prie pagrindinio kompiuterio CLI, prijungiant `~/.local/bin`, `~/.codex`, `~/.claude` ir kt. tik skaitymo režimu | `docker compose --profile host up -d`        |
| `cliproxyapi`        | `cliproxyapi`    | Paleiskite [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) pagalbinį konteinerį per prievadą `8317`, skirtą tarpiniam CLI ryšiui su aukštesnio lygio paslaugomis                          | `docker compose --profile cliproxyapi up -d` |
| `web`                | `omniroute-web`  | Žiniatinklio seansų teikėjai, kuriems reikia naršyklės: `gemini-web`, `claude-web`, `claude-turnstile` (sukuriamas `runner-web`, įtrauktas Chromium)                                                  | `docker compose --profile web up -d`         |

> Galima derinti kelis profilius: `docker compose --profile cli --profile cliproxyapi up -d`.

## Pagrindinio kompiuterio CLI įrankių konfigūravimas, kai OmniRoute veikia Docker aplinkoje

`omniroute setup-codex`, `setup-claude`, `config set <tool>` ir valdymo skydelio
mygtukas **Išsaugoti konfigūraciją** įrašo tokius failus kaip `~/.codex/*.config.toml`. Šie keliai
turi prasmę tik tame kompiuteryje, kuriame iš tikrųjų veikia CLI. Paleidus šias komandas
konteinerio viduje, failai įrašomi į paties konteinerio namų katalogą (`/home/node` —
atvaizdas veikia kaip `USER node`), iš kurio pagrindinio kompiuterio CLI jų niekada neperskaitys ir
kur jie bus pašalinti vos tik konteineris bus sukurtas iš naujo.

OmniRoute tai aptinka ir, užuot pranešusi apie sėkmę, kuria negalėsite pasinaudoti,
atsisako rašyti bei pateikia instrukcijas: CLI baigia darbą su kodu `2`, o API atsako `422`
su `containerEphemeralTarget: true`.

### Rekomenduojama: paleiskite CLI pagrindiniame kompiuteryje, o OmniRoute – Docker aplinkoje

Konteineris teikia API, o CLI konfigūruoja jūsų pagrindinio kompiuterio įrankius.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # nukreipkite CLI į konteinerį
omniroute setup-codex                      # įrašo tikrąjį ~/.codex jūsų pagrindiniame kompiuteryje
```

Tai tinkamas pasirinkimas, kai Codex, Claude Code, Cursor ar panašūs įrankiai veikia jūsų
nešiojamajame kompiuteryje — tai įprasta sąranka.

### Alternatyva: prijunkite pagrindinio kompiuterio konfigūracijos katalogus kaip susietuosius tomus (`host` profilis)

Jei norite, kad pats konteineris rašytų į jūsų pagrindinio kompiuterio konfigūraciją, prijunkite
katalogus ir nustatykite `CLI_CONFIG_HOME` į prijungimo šakninį katalogą. `host` profilis
jau tai atlieka:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Susietasis prijungimas suteikia keliui patikimumo: OmniRoute skaito
`/proc/self/mountinfo` ir leidžia rašyti į prijungtus kelius (taip pat į katalogus,
kurių antriniai katalogai yra prijungimo taškai — būtent tokia yra pirmiau pateikto `/host-home` struktūra), tačiau
vis tiek atsisako rašyti į neprijungtus kelius.

### Avarinė išimtis: sukonfigūruokite paties konteinerio CLI (naudokite saikingai)

Kai CLI iš tiesų yra konteinerio viduje (`cli` profilis), toks įrašymas
yra sąmoningas. Bet kuriai `setup-*` komandai perduokite `--allow-container-write` arba serveriui nustatykite
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true`. Įrašymas bus atliktas
kartu pateikiant įspėjimą, kad duomenys neišliks pašalinus konteinerį.

> **Saugumo įspėjimas — `cli` profilis ir `docker.sock` prijungimas.**
> `cli` profilis kaip susietąjį tomą prijungia `/var/run/docker.sock`, kad konteineryje
> veikianti automatinio naujinimo priemonė galėtų iš naujo sukurti programų rinkinį per pagrindinio kompiuterio demoną
> (`src/lib/system/autoUpdate.ts` tikrina, ar yra šis lizdas, ir praleidžia
> Docker kelią, kai jo nėra). Šis lizdas yra **pagrindinio kompiuterio root lygmens pasitikėjimo
> riba**: bet kas, kas gali jį pasiekti, valdo pagrindinio kompiuterio Docker demoną kaip
> root — gali kurti, tikrinti, sustabdyti ir pašalinti bet kurį pagrindinio kompiuterio konteinerį.
> Pasekmės:
>
> 1. **Niekada neatverkite `cli` profilio prievado tinklui.** Publikuokite
>    jį adresu `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — vietiniame tinkle pasiekiamas `cli` profilis bet kokį valdymo skydelio lygmens RCE paverčia
>    visišku pagrindinio kompiuterio kompromitavimu.
> 2. **Neprijunkite jokių papildomų pagrindinio kompiuterio katalogų prie `cli` profilio.**
>    Docker lizdas kartu su bet kokiu papildomu prijungimu suteikia konteineriui visišką
>    skaitymo ir rašymo prieigą prie jūsų failų sistemos bei pagrindinio kompiuterio konfigūracijos. Jei įrankiui reikia
>    matyti projektą, paleiskite jį lokaliai naudodami CLI dvejetainį failą — neprijunkite jo
>    prie `cli` konteinerio.
>
> Jei automatinio naujinimo konteinerio viduje nereikia, neįjunkite `cli` profilio
> (`COMPOSE_PROFILES=core,redis` arba trumpesnio varianto). Kiti profiliai
> neprijungia Docker lizdo.
>
> Susijęs grėsmių modelis, apimantis MITM, pateiktas faile `docs/security/MITM-TPROXY-DECRYPT.md` (git; nekompiliuojamas į `/docs`),
> o `codex`/`claude-code`/`droid`/`openclaw` dvejetainių failų kilmės grandinė aprašyta faile
> `docs/security/SUPPLY_CHAIN.md`.

## Redis pagalbinis konteineris

„OmniRoute“ naudoja Redis paskirstytojo užklausų dažnio ribotuvo ir bendrinamos talpyklos veikimui užtikrinti. `redis` paslauga yra **visada apibrėžta** faile `docker-compose.yml` (jai netaikomas joks profilis) ir paleidžiama kartu su bet kuriuo kitu profiliu.

| Išsami informacija                             | Reikšmė                                              |
| ---------------------------------------------- | ---------------------------------------------------- |
| Atvaizdas                                      | `redis:7-alpine`                                     |
| Konteinerio pavadinimas                        | `omniroute-redis`                                    |
| Vidinis prievadas                              | `6379`                                               |
| Pagrindinio kompiuterio prievadas (keičiamas)  | `REDIS_PORT` (numatytoji reikšmė – `6379`)           |
| Pagrindinio kompiuterio susiejimas (keičiamas) | `REDIS_BIND_HOST` (numatytoji reikšmė – `127.0.0.1`) |
| Tomas                                          | `omniroute-redis-data` → `/data`                     |
| Veikimo patikra                                | `redis-cli ping` (10 sek. intervalas)                |

Susiję aplinkos kintamieji:

- `REDIS_URL` — į programą perduodama prisijungimo eilutė (numatytoji reikšmė – `redis://redis:6379`).
- `REDIS_PORT` — pagrindinio kompiuterio prievadas, susiejamas su Redis konteineriu.
- `REDIS_BIND_HOST` — pagrindinio kompiuterio sąsaja, kurioje paskelbiamas prievadas. Numatytoji reikšmė – `127.0.0.1`.

> **Kodėl pagal numatytuosius nustatymus naudojama grįžtamojo ryšio sąsaja:** pagalbinis konteineris veikia be `requirepass`, o programos
> konteineriai jį pasiekia per compose tinklą (`redis:6379`) — paskelbtas prievadas
> skirtas tik pagrindinio kompiuterio įrankiams (`redis-cli`, vietiniam `npm run dev`). Paskelbus jį
> sąsajoje `0.0.0.0`, autentifikavimo nereikalaujantis Redis būtų pasiekiamas visiems jūsų LAN pagrindiniams kompiuteriams. Jei nustatote
> `REDIS_BIND_HOST=0.0.0.0`, prie paslaugos `command:` taip pat pridėkite `--requirepass`.

**Išjungti Redis** nerekomenduojama (užklausų dažnio ribotuvas persijungs į mažiau funkcionalų atmintyje veikiantį atsarginį mechanizmą). Jei tai būtina, pašalinkite arba užkomentuokite `redis:` paslaugos bloką faile `docker-compose.yml`, arba sumažinkite jos egzempliorių skaičių iki nulio:

```bash
docker compose up -d --scale redis=0
```

## Gamybinė Compose konfigūracija

Norėdami kartu su kūrimo aplinka paleisti izoliuotą gamybinę momentinę kopiją, naudokite `docker-compose.prod.yml`.

| Išsami informacija                     | Reikšmė                                                                               |
| -------------------------------------- | ------------------------------------------------------------------------------------- |
| Failas                                 | `docker-compose.prod.yml`                                                             |
| Numatytasis valdymo skydelio prievadas | `PROD_DASHBOARD_PORT=20130` (susietas su vidiniu `${DASHBOARD_PORT:-20128}`)          |
| Numatytasis API prievadas              | `PROD_API_PORT=20131`                                                                 |
| Atvaizdas                              | `omniroute:prod` (sukurtas iš `runner-cli` tikslo)                                    |
| Redis konteineris                      | `omniroute-redis-prod` (`redis:8.6.2`, atskiras `redis-prod-data` tomas)              |
| Duomenų tomas                          | `omniroute-prod-data` (vardinis, išsaugomas tarp pakartotinių komponavimų)            |
| Veikimo patikros                       | `node healthcheck.mjs` + `redis-cli ping`, o `depends_on` priklauso nuo Redis būsenos |

Naudojimas:

```bash
# Sukurti ir paleisti gamybinį rinkinį
docker compose -f docker-compose.prod.yml up -d --build

# Tiesiogiai stebėti žurnalus
docker compose -f docker-compose.prod.yml logs -f

# Sustabdyti ir pašalinti (išsaugant tomus)
docker compose -f docker-compose.prod.yml down
```

Gamybinis rinkinys veikia lygiagrečiai su kūrimo compose konfigūracija (naudojami skirtingi konteinerių pavadinimai, prievadai ir tomai), todėl galite toliau vykdyti vietinį kūrimą, kol gamybinė aplinka lieka paleista.

## Dockerfile etapai

Saugykloje pateikiamas kelių etapų Dockerfile (`Dockerfile`). Galimi keturi etapai; pasirinkite jūsų naudojimo atvejui tinkamą `target`.

| Etapas        | Bazinis atvaizdas     | Paskirtis                                                                                                                                                                                                                                                                                                     |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Įdiegia priklausomybes (`npm ci --legacy-peer-deps`) ir paleidžia `npm run build` (pagal numatytąsias nuostatas naudojamas Turbopack — žr. toliau pateiktą skyrių „Kompiliavimo ištekliai“)                                                                                                                   |
| `runner-base` | `node:26-trixie-slim` | Gamybinė vykdymo aplinka su autonomine Next.js išvestimi. **Teikėjų CLI neįtrauktos.**                                                                                                                                                                                                                        |
| `runner-cli`  | `runner-base`         | Prideda `git`, `docker.io`, `docker-compose` ir visuotines CLI: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Rinkitės šį etapą agentinėms darbo eigoms.**                                                                                                                             |
| `runner-web`  | `runner-base`         | Prideda Playwright ir Chromium naršyklę (`--with-deps`), skirtą žiniatinklio seansų teikėjams: `gemini-web`, `claude-web`, `claude-turnstile`. **Rinkitės šį etapą, kai naudojate šiuos teikėjus** — be jo paprastasis atvaizdas užklausos metu neveiks (žr. pastabą apie `-web` skyriuje „Leidimų kanalai“). |

Norėdami rankiniu būdu sukurti konkretų tikslinį etapą:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Kompiliavimo ištekliai

Trys kompiliavimo argumentai valdo `builder` etapo išteklių sąnaudas. Jie taikomi tik kompiliavimo metu —
`OMNIROUTE_MEMORY_MB` (toliau) yra atskiras vykdymo aplinkos parametras.

| Kompiliavimo argumentas     | Numatytoji reikšmė | Poveikis                                                                                                    |
| --------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`                | `0` kompiliuoja naudojant webpack: mažesnė didžiausia atminties apkrova, bet lėčiau. `1` įjungia Turbopack. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`             | V8 krūvos riba (`--max-old-space-size`) paleidžiamam `next build`.                                          |
| `OMNIROUTE_BUILD_WORKERS`   | `2`                | Nustato `CIRCLE_NODE_TOTAL`; Next apskaičiuoja `workers = N - 1` puslapių duomenims rinkti.                 |

`OMNIROUTE_BUILD_WORKERS` yra parametras, kurį reikia didinti galingame kompiliavimo serveryje, ir pirmasis
įtariamasis, kai ribotų išteklių aplinkoje kompiliavimas nutrūksta **po** `✓ Compiled successfully`. Kiekvienas
puslapių duomenų darbinis procesas yra atskiras procesas, kaip ir pats pirminis `next build`;
realiame VPS atliktas atkūrimas (problema #7518) parodė, kad kiekvieno proceso didžiausia RSS siekė
~4.5 GB nepriklausomai nuo `NODE_OPTIONS` krūvos parametro (Turbopack kompiliuoja
savąją / Rust atmintį už V8 krūvos ribų). Numatytoji reikšmė `2` (→ 1 darbinis procesas, iš viso 2
procesai) pritaikyta 16 GB / 4 vCPU GitHub valdomiems vykdymo serveriams, kuriuos
naudoja publikavimo konvejeris. Nustačius `8` (→ 7 darbiniai procesai), tame serveryje pritrūko atminties ir
buildkit užbaigė veiksmą su klaida `ResourceExhausted: ... cannot allocate memory`;
`3` (→ 2 darbiniai procesai) vis tiek netilpo, kai kiekvieno proceso RSS buvo išmatuota
tiesiogiai, o ne nustatyta netiesiogiai. `tests/unit/docker-build-memory-budget.test.ts`
atlieka skaičiavimus pagal išmatuotą reikšmę ir nepavyksta, jei kuris nors parametras
viršija serverio galimybes.

Turbopack kompiliuoja savojoje Rust atmintyje, esančioje **už** V8 krūvos ribų, todėl
`OMNIROUTE_BUILD_MEMORY_MB` jos neriboja. Serveryje su atminties apribojimu
kompiliavimo procesą OOM išjungiklis tuomet nutraukia SIGKILL signalu visiškai be klaidos teksto — jis tiesiog
sustoja vykdant `Creating an optimized production build`, todėl tai atrodo kaip pakibimas, o
ne atminties trūkumas. Dėl šios priežasties `Dockerfile` pagal numatytąsias nuostatas naudoja webpack
(`OMNIROUTE_USE_TURBOPACK=0`), kitaip nei `npm run dev` / `npm run build`, kuriuose
Turbopack yra numatytoji kodo nuostata: paprastas `docker build .` be kompiliavimo argumentų (kurį
vykdo Railway ir kitos vieno spustelėjimo prieglobos paslaugos) negali tyliai nutrūkti
ribotos atminties kompiliavimo serveryje. Publikuojami atvaizdai jau aiškiai perduoda
`OMNIROUTE_USE_TURBOPACK=0` faile `docker-publish.yml`. Kompiliavimo serveryje, turinčiame daug RAM,
įjunkite Turbopack, kad kompiliavimas būtų greitesnis:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` yra įjungtas, todėl `next build` paleidžia pirminį **ir** darbinį
procesą, o kiekvienas jų atskirai laikosi `OMNIROUTE_BUILD_MEMORY_MB`. Nustatykite konteinerio
ribą, maždaug daugiau nei du kartus viršijančią šią reikšmę, o ne vieną kartą.

Išmatuota šiame kode (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Pakavimo įrankis | Konteinerio riba | Rezultatas                                                |
| ---------------- | ---------------- | --------------------------------------------------------- |
| Turbopack        | 8 GiB / 16 GiB   | abiem atvejais tyliai nutraukta dėl OOM                   |
| webpack          | 8 GiB            | darbinis kompiliavimo procesas nutrauktas SIGKILL signalu |
| webpack          | 12 GiB           | pavyko, didžiausias naudojimas siekė 11.1 GiB             |

### Vykdymo aplinkos numatytosios nuostatos

`runner-base` eksportuojamos numatytosios reikšmės: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Atminties veikimas Docker aplinkoje:

- Atvaizdas nustato `OMNIROUTE_MEMORY_MB=1024` ir pagal jį išveda `NODE_OPTIONS=--max-old-space-size=1024`.
- Faktinį serverio procesą paleidžia autonominė paleidyklė, kuri nuskaito `OMNIROUTE_MEMORY_MB` ir prideda `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node naudoja paskutinę pasikartojančią `--max-old-space-size` reikšmę, todėl `OMNIROUTE_MEMORY_MB` nustato faktinį Docker kaupo limitą.
- Kadangi atvaizdas visada ją nustato, paleidyklės atsarginė reikšmė, apskaičiuojama pagal RAM kiekį, naudojant Docker niekada netaikoma. Aiškiai padidinkite ją pagal darbo krūvį (žr. lentelę toliau). `2048` vis tiek yra per mažai programavimo agentų `/v1/responses` užklausoms.

### Vykdymo aplinkos RAM programavimo agentams

Numatytoji Docker 1 GiB reikšmė yra apatinė riba valdymo skydui ir lengviems pokalbiams, o ne gamybinės aplinkos dydis. Ilgi `POST /v1/responses` turiniai (šimtai pranešimų, dešimtys įrankių) glaudinimo metu atmintyje išlaiko kelis grafus. Dvi persidengiančios ~3 MiB / ~750 tūkst. žetonų užklausos nutraukė V8 veikimą esant **12 GiB** senosios kartos sričiai (`FATAL ERROR: Reached heap limit`) ir taip pat pasiekė 16 GiB cgroup OOM ribą. Žr. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Nustatykite **cgroup `--memory` reikšmę didesnę už kaupą** — savieji buferiai, SQLite ir tarpiniai glaudinimo duomenys yra už V8 ribų.

| Darbo krūvis                                     | `OMNIROUTE_MEMORY_MB`                | Konteineris / cgroup                        | Pastabos                                                                                                                                      |
| ------------------------------------------------ | ------------------------------------ | ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Valdymo skydas, vienas lengvas pokalbis          | `1024` (numatytoji atvaizdo reikšmė) | ≥2 GiB                                      |                                                                                                                                               |
| Vienas programavimo agentas (Claude/Codex/Grok)  | `8192`                               | ≥10 GiB                                     | Įprasta vienos sesijos `/v1/responses` užklausa                                                                                               |
| Dvi lygiagrečios ilgos `/v1/responses` užklausos | `10240`–`12288`                      | ≥12–16 GiB                                  | Išmatuotas V8 veikimo nutraukimas esant ~12 GiB kaupui                                                                                        |
| Trys ar daugiau lygiagrečių ilgų kontekstų       | nenaudokite viename procese          | vykdykite nuosekliai / skirkite daugiau RAM | Pagal numatytuosius nustatymus leidžiama 1 vykdoma didelio svorio užklausa; padidinus šią ribą be papildomos RAM, veikimas vėl bus nutrauktas |

`omniroute serve`, vykdomas tiesiogiai sistemoje, sukalibruoja ~35 % RAM (apribojant iki `[512, 4096]`), kai `OMNIROUTE_MEMORY_MB` yra **nenustatytas**. Docker visada nustato `1024`, todėl oficialiame atvaizde šis kalibravimas niekada nevykdomas.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Kritiniai aplinkos kintamieji

Be numatytųjų reikšmių, aprašytų faile [ENVIRONMENT.md](../reference/ENVIRONMENT.md), paleidžiant su Docker svarbiausi yra šie kintamieji:

| Kintamasis                    | Paskirtis                                                                                                                                                                                                                                                                                                                                    | Numatytoji reikšmė            |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Bendra WebSocket tilto slapta reikšmė. **Būtina gamybinėje aplinkoje** — nustatykite stiprią atsitiktinę eilutę.                                                                                                                                                                                                                             | nenustatyta (būtina pateikti) |
| `REDIS_URL`                   | Ryšio eilutė, skirta užklausų dažnio ribotuvo / podėlio vidinei sistemai                                                                                                                                                                                                                                                                     | `redis://redis:6379`          |
| `REDIS_PORT`                  | Pagrindinio kompiuterio prievadas, skirtas įtrauktam Redis konteineriui                                                                                                                                                                                                                                                                      | `6379`                        |
| `REDIS_BIND_HOST`             | Pagrindinio kompiuterio sąsaja, kurioje skelbiamas įtraukto Redis konteinerio prievadas (grįžtamojo ryšio sąsaja, nebent pridėsite AUTH)                                                                                                                                                                                                     | `127.0.0.1`                   |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Pagrindinio kompiuterio kelias, prijungiamas prie `cli` profilio kaip `/workspace/omniroute` ir naudojamas savaiminio atnaujinimo procesams                                                                                                                                                                                                  | `.` (dabartinis katalogas)    |
| `OMNIROUTE_MEMORY_MB`         | Node vykdymo aplinkos kaupo riba, skirta autonominiam Docker serveriui; pakeičia pirmiau nurodytą numatytąją atvaizdo reikšmę. Programavimo agentams: `8192`+ (žr. [vykdymo aplinkos RAM](#runtime-ram-for-coding-agents)).                                                                                                                  | `1024`                        |
| `DASHBOARD_PORT` / `API_PORT` | Pakeičia atvertus prievadus, skirtus valdymo skydeliui (20128) ir API (20129)                                                                                                                                                                                                                                                                | `20128` / `20129`             |
| `APP_BIND_HOST`               | Pagrindinio kompiuterio sąsaja, kurioje docker-compose skelbia valdymo skydelio / API / tiesioginio WS prievadus. Kai `REQUIRE_API_KEY=false` (numatytoji reikšmė), `0.0.0.0` atveria anoniminį `/v1` tarpinį serverį LAN tinkle — išplėskite prieigą tik naudodami `REQUIRE_API_KEY=true` arba priešais esantį atvirkštinį tarpinį serverį. | `127.0.0.1`                   |
| `CLIPROXY_BIND_HOST`          | Pagrindinio kompiuterio sąsaja, kurioje docker-compose skelbia `cliproxyapi` pagalbinį konteinerį — jo duomenų tome saugomi teikėjo prisijungimo duomenys.                                                                                                                                                                                   | `127.0.0.1`                   |
| `OMNIROUTE_PLUGINS_DIR`       | Katalogas, kurį vykdymo aplinkos papildinių skaitytuvas tikrina ir į kurį diegia papildinius. Nustatykite jį, kai papildiniai prijungiami naudojant susietąjį prijungimą: numatytoji reikšmė priklauso nuo `HOME`, kurio atvaizdas nebūtinai eksportuoja.                                                                                    | `~/.omniroute/plugins`        |
| `OMNIROUTE_BASE_PATH`         | URL pokelis, kai programa publikuojama už atvirkštinio tarpinio serverio (pvz., `/omniroute`)                                                                                                                                                                                                                                                | _(tuščia = šaknis)_           |
| `NEXT_PUBLIC_BASE_URL`        | Viešoji naršyklės kilmė, įskaitant pokelį (pvz., `https://host/omniroute`)                                                                                                                                                                                                                                                                   | nenustatyta                   |
| `PROD_DASHBOARD_PORT`         | Pagrindinio kompiuterio valdymo skydelio prievadas, skirtas `docker-compose.prod.yml`                                                                                                                                                                                                                                                        | `20130`                       |
| `CLIPROXYAPI_PORT`            | Pagrindinio kompiuterio prievadas, skirtas `cliproxyapi` pagalbiniam konteineriui                                                                                                                                                                                                                                                            | `8317`                        |

## Atvirkštinis tarpinis serveris pakelyje (Traefik / nginx)

Next.js `basePath` sukompiliuojamas į autonominį paketą. OmniRoute įrašo įkompiliuotą
reikšmę kontroliniame faile programos šakniniame kataloge (įrašoma vykdant `npm run build`;
nuskaitoma naudojant `scripts/docker/ensure-docker-base-path.mjs`) ir paleidžiant konteinerį
palygina ją su `OMNIROUTE_BASE_PATH`. Kai jos skiriasi, o atvaizdas buvo sukurtas domeno
šakniniam keliui, pradinis scenarijus perrašo autonominius manifestus, įterptinius
`basePath`/`assetPrefix` literalus (Next 16 generuoja SSR išteklių URL naudodamas tik
`assetPrefix` — taisymo priemonė į jį taip pat įrašo pakelį), įkompiliuotus
`/_next/static` išteklių URL (kliento nuorodų manifestus, medijos importus, iš anksto
sugeneruotus klaidų puslapius) ir kliento `process.env` pakaitalą prieš paleidžiant
`node dev/run-standalone.mjs`.

### Kūrimas naudojant Compose (rekomenduojama)

Nustatykite abu kintamuosius faile `.env`, tada sukurkite iš naujo, kad atvaizdo ir
vykdymo aplinkos reikšmės sutaptų:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` perduoda `OMNIROUTE_BASE_PATH` kaip Docker kūrimo argumentą ir kaip
vykdymo aplinkos kintamąjį.

### Iš anksto sukurtas šakninio kelio atvaizdas + vykdymo metu nustatomas pakelis

Publikuojami `diegosouzapw/omniroute:*` atvaizdai sukurti domeno šakniniam keliui. Vis tiek
galite nustatyti `OMNIROUTE_BASE_PATH` vykdymo metu; paleidžiamas konteineris vieną kartą
pataisys paketą. Kartu nurodykite atitinkamą viešąjį šaltinį:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Sukonfigūruokite atvirkštinį tarpinį serverį taip, kad jis persiųstų **visą** išorinį
kelią (nepašalinkite prefikso). Traefik turėtų nukreipti `PathPrefix(`/omniroute`)` į
konteinerį be `StripPrefix`, kad Next.js gautų `/omniroute/...` ir pateiktų išteklius iš
`/omniroute/_next/...`.

Docker būsenos patikra tikrina supaprastintą gyvavimo ciklo galinį tašką `/healthz`,
prieš jį pridėdama aktyvų `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` išlieka
pasiekiamas žmonėms ir diagnostikos skydams; norėdami konteinerio HEALTHCHECK vėl
nukreipti į jį (pavyzdžiui, išsamiai būsenos kontrolei), nustatykite
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Šis kelias atlieka **išsamią**
patikrą (DB + stebėsenos suvestinė) — ji tinkama retai vykdomai Docker `HEALTHCHECK`,
jei nuspręsite ją vėl įjungti, tačiau **netinka** Kubernetes `livenessProbe`
intervalams.

Orkestravimo sistemoms (Kubernetes, Nomad ir kt.):

| Patikra          | Rekomenduojama                                                                  | Venkite                                                                |
| ---------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Gyvybingumo      | HTTP `GET /livez` arba TCP pagrindiniame prievade (`PORT`, numatytasis `20128`) | `/api/monitoring/health` naudoti gyvybingumui tikrinti                 |
| Parengties       | HTTP `GET /healthz`                                                             | Trumpų skirtųjų laikų, kai užimtas įvykių ciklas laikomas neveikiančiu |
| Išsami / išorinė | `/api/monitoring/health`                                                        | —                                                                      |

`/healthz` praneša proceso gyvavimo ciklo būseną (`ok` / `starting` / `stopping`).
`/livez` tik patvirtina, kad procesas veikia (grąžinama 200, kai tik apdorojimo funkcija
gali veikti; parengties nelaukiama). Abu galiniai taškai vis tiek veikia tame pačiame
Node įvykių cikle kaip ir užklausų apdorojimas, todėl procesorių intensyviai naudojančios
katalogo arba glaudinimo operacijos gali juos uždelsti — užimtas ≠ neveikiantis. Jei
HTTP patikrų skirtasis laikas baigiasi, gyvybingumą geriau tikrinti per TCP. Išsamios
patikrų gairės:
[Stebėsenos vadovas — Kubernetes patikrų rekomendacijos](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose su Caddy (automatinis HTTPS TLS)

OmniRoute galima saugiai viešai pasiekti naudojant automatinį Caddy SSL sertifikatų parengimą. Įsitikinkite, kad jūsų domeno DNS A įrašas nurodo jūsų serverio IP adresą.

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
      # Naršyklei skirta kilmė, naudojama OAuth atgaliniams iškvietimams, valdymo skydelio nuorodoms ir sugeneruotiems viešiesiems URL.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Vidinis URL ryšiui tarp serverių, naudojamas suplanuotoms užduotims ir užklausoms į save.
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

Caddy nustato standartines persiuntimo antraštes aukštesniojo lygmens konteineriui. OmniRoute naudoja
`NEXT_PUBLIC_BASE_URL` kaip kanoninę viešąją kilmę OAuth atgaliniams iškvietimams ir sugeneruotoms viešosioms
nuorodoms; autentifikuoti valdymo skydelio rašymo veiksmai naudoja tos pačios kilmės užklausas ir su seansu susietą CSRF
apsaugą. Įjunkite `OMNIROUTE_TRUST_PROXY` tik išplėstiniuose diegimuose, kuriuose sąmoningai
norite, kad OmniRoute nustatytų viešąją kilmę pagal patikimas persiųstas antraštes, o ne aiškią
konfigūraciją.

## Cloudflare Quick Tunnel

Docker diegimų valdymo skydelyje, adresu `Dashboard → Endpoints`, galima vienu spustelėjimu įjungti **Cloudflare Quick Tunnel**. Pirmą kartą įjungus `cloudflared` atsisiunčiamas tik prireikus, paleidžiamas laikinas tunelis į dabartinį jūsų `/v1` galinį tašką, o sugeneruotas `https://*.trycloudflare.com/v1` URL rodomas tiesiai po įprastu viešuoju URL.

Galinių taškų tunelių skydelius (Cloudflare, Tailscale, ngrok) galima rodyti arba slėpti per `Settings → Appearance`, nekeičiant aktyvaus tunelio būsenos.

### Pastabos apie tunelius

- Quick Tunnel URL yra laikini ir pasikeičia po kiekvieno paleidimo iš naujo.
- Quick Tunnel nėra automatiškai atkuriami iš naujo paleidus OmniRoute arba konteinerį. Prireikus juos vėl įjunkite valdymo skydelyje.
- Valdomas diegimas šiuo metu palaiko Linux, macOS ir Windows `x64` / `arm64` platformose.
- Valdomi Quick Tunnel pagal numatytuosius nustatymus naudoja HTTP/2 perdavimo protokolą, kad ribotose konteinerių aplinkose būtų išvengta triukšmingų QUIC UDP buferio įspėjimų. Jei norite naudoti kitą perdavimo protokolą, nustatykite `CLOUDFLARED_PROTOCOL=quic` arba `auto`.
- Docker atvaizduose įtraukti sistemos šakniniai CA sertifikatai, kurie perduodami valdomam `cloudflared`, todėl išvengiama TLS pasitikėjimo klaidų, kai tunelis inicijuojamas konteineryje.
- Jei norite, kad OmniRoute naudotų esamą vykdomąjį failą, užuot jį atsisiuntęs, nustatykite `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`.

## Atvaizdų žymos

| Atvaizdas                | Žyma     | Dydis  | Aprašymas                                                |
| ------------------------ | -------- | ------ | -------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | Aukščiausia **paskelbta** stabili SemVer (ne git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOps sistemose fiksuokite šios klasės žymą             |

Kelių platformų manifestas: vietinis `linux/amd64` ir `linux/arm64` palaikymas (Apple Silicon, AWS Graviton, Raspberry Pi). Docker automatiškai pasirenka tinkamą architektūrą; jei ARM pagrindiniuose kompiuteriuose reikia priverstinai naudoti AMD64 emuliaciją, nurodykite `--platform linux/amd64`.

### Leidimų kanalai

OmniRoute publikuoja atskirus Docker kanalus stabiliems leidimams, aktyvios leidimo šakos testavimui ir kūrimo versijoms.

| Kanalas                         | Šaltinis                                 | Kintamumas                          | Rekomenduojamas naudojimas                                                                                            |
| ------------------------------- | ---------------------------------------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Pasirašytas / versijuotas leidimas       | Nekintamas                          | Produkciniai diegimai, kuriuose fiksuotas konkretus leidimas                                                          |
| `:latest` / `:latest-web`       | Aukščiausia **paskelbta** stabili SemVer | Kintama stabilios versijos rodyklė  | Sekami stabilūs leidimai **po** SemVer publikavimo užduoties — `main` ar neišleistų `release/v*` pakeitimų **neseka** |
| `:next` / `:next-web`           | Dabartinė numatytoji `release/v*` šaka   | Kintama išankstinio leidimo rodyklė | Tikrinami pataisymai, jau įtraukti į aktyvią leidimo šaką, bet dar nepatekę į stabilų leidimą                         |
| `:main` / `:main-web`           | `main` šaka                              | Kintama kūrimo versijos rodyklė     | Tik kūrimo ir integraciniam testavimui                                                                                |

#### Žiniatinklio seansų teikėjai: `-web` atvaizdai

Kiekvienas pirmiau nurodytas kanalas taip pat turi `-web` žymą (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), sukurtą iš `runner-web` etapo — tai tas pats atvaizdas, papildytas Playwright ir Chromium naršykle. Įprastas atvaizdas pateikiamas **be** Chromium; jos reikia `gemini-web`, `claude-web` ir `claude-turnstile`.

Klaida atidedama ir neįvyksta paleidimo metu: šie teikėjai pateikia savo modelių sąrašą ir valdymo skydelyje rodomi kaip prisijungę, o tik pirmoji užklausa baigiasi klaida

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Jei naudojate šiuos teikėjus, atsisiųskite jau naudojamo kanalo `-web` žymą — daugiau niekas nesikeičia. Diegiant per npm / CLI (nenaudojant Docker atvaizdo), atitinkama trūkstama dalis yra naršyklės vykdomasis failas: pagrindiniame kompiuteryje paleiskite `npx playwright install chromium`.

#### Išankstinio leidimo kanalo naudojimas

`next` kanalas iš naujo sukuriamas po kiekvieno pakeitimų išsiuntimo į dabartinę numatytąją `release/v*` šaką ir publikuojamas tiek AMD64, tiek ARM64 architektūroms. Senesnės priežiūros šakos negali jo perrašyti. Šis kanalas pateikia atsisiunčiamą atvaizdą su pataisymais, kurie buvo sujungti į aktyvią leidimo šaką prieš sukuriant kitą stabilią žymą.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Naudodami „Docker Compose“, pakeiskite pasirinkto profilio naudojamą atvaizdo žymą, tada atsisiųskite atvaizdą ir iš naujo sukurkite paslaugą:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Saugumas ir ankstesnės versijos atkūrimas

`next` yra kintantis išankstinio leidimo kanalas. Jis gali pasikeisti po bet kokio pakeitimų išsiuntimo į aktyvią leidimo šaką ir **nėra palaikomas naudoti gamybinėje aplinkoje**. Vertindami konkretų kūrinį, prisekite atvaizdo maišos reikšmę:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Prieš testuodami sukurkite atsarginę „OmniRoute“ duomenų tomo arba prijungto duomenų katalogo kopiją. Norėdami grįžti prie ankstesnės versijos, atkurkite anksčiau naudotą stabilią versiją ar maišos reikšmę ir iš naujo sukurkite konteinerį:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Leidimo šakos kūrinys niekada negali pakeisti `latest`; stabilų žymeklį gali atnaujinti tik reikalavimus atitinkanti stabili semantinė versija. `next` atvaizdams ir toliau taikoma leidimo atvaizdo patikra bei blokavimo užkarda, neleidžianti publikuoti aptikus CRITICAL lygio pažeidžiamumų.

**`latest` negarantuoja „git“ aktualumo.** Į `main` arba aktyvią `release/v*` šaką sujungtų pataisymų **nėra** `:latest` atvaizde, kol nepublikuojamas stabilus SemVer atvaizdas ir publikavimo užduotis neatnaujina `:latest` (ta pati maišos reikšmė kaip ir to SemVer atvaizdo). Jei atrodo, kad `latest` neatnaujinamas, nors „GitHub“ jau rodo pataisymą, atsisiųskite `:next`, kad išbandytumėte leidimo šaką, arba palaukite SemVer žymos.

| Ko norite                                                                                          | Ką naudoti                               |
| -------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| „GitOps“ / gamybinė aplinka, kuri neturi nevaldomai keistis                                        | Prisekite `:X.Y.Z` (arba atvaizdo maišą) |
| Sekti publikuojamas stabilias versijas ir sutikti iš naujo sukurti konteinerį po kiekvieno leidimo | `:latest`                                |
| Testuoti dar neišleistus `release/v*` pakeitimus                                                   | `:next` (ne gamybinei aplinkai)          |
| Testuoti `main`                                                                                    | `:main` (ne gamybinei aplinkai)          |

## Valdymo skydelio naujinimai Docker aplinkoje

Iš publikuoto atvaizdo paleistas konteineris negali pakeisti pats savęs. Kai OmniRoute aptinka, kad veikia
konteineryje (nėra `.git` darbinės kopijos ir tai nėra npm diegimas), pagrindinio valdymo skydelio naujinimo juostoje vietoje npm/git instrukcijų rodomas
pagrindiniame kompiuteryje vykdytinas nurodymas su kopijavimo mygtuku:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

Paslaugos pavadinimas gaunamas iš `AUTO_UPDATE_SERVICE` (numatytoji reikšmė – `omniroute`, t. y. paslauga faile
`docker-compose.selfhost.yml`). `pull` atnaujina tik slankiąją žymą (`latest`, `next`); jei naudojama fiksuota
`:X.Y.Z` žyma, pirmiausia ją pakeiskite.

### Naujinimai vienu spustelėjimu naudojant pagrindinio kompiuterio aktyviklio failą

Kad funkcija **Naujinti dabar** veiktų neprijungus `/var/run/docker.sock` (tai konteineriui suteikia
root prieigą pagrindiniame kompiuteryje – žr. anksčiau pateiktą `cli` profilio įspėjimą), OmniRoute paslaugai nustatykite `DOCKER_UPDATE_TRIGGER_FILE`, o
pagrindiniame kompiuteryje paleiskite stebėjimo procesą:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

Kelias turi būti `DATA_DIR` viduje (santykinės reikšmės interpretuojamos jo atžvilgiu); visi kiti keliai
atmetami. Tuomet funkcija **Naujinti dabar** į tą failą įrašo `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }`,
grąžina `202`, o valdymo skydelis periodiškai tikrina `/api/system/version`, kol paleidžiama nauja versija,
ir persikrauna. Šiuo režimu OmniRoute niekada nevykdo apvalkalo ar Docker komandų. Kaip ir atliekant bet kurį naujinimo
veiksmą, užklausa priimama tik iš loopback/LAN klientų.

Naudojant susietai prijungtą duomenų katalogą, pagrindiniame kompiuteryje gaunamas stabilus stebėtinas kelias. Pavyzdiniai `systemd` moduliai
(pakeiskite `/srv/omniroute` į katalogą, kuriame yra jūsų compose failas ir `data/`):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=Stebėti OmniRoute valdymo skydelio naujinimo užklausas

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=Atsisiųsti ir iš naujo sukurti OmniRoute konteinerį

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

Prieš atsisiųsdama paslauga pašalina užklausą, kad nesėkmingas vykdymas nesikartotų cikliškai. Jei
`DOCKER_UPDATE_TRIGGER_FILE` nenustatytas, valdymo skydelyje išlieka rankinių komandų eiga.

## Prieinamumas: numatytasis SQLite yra vienos replikos

Akcijų Docker / Kubernetes OmniRoute yra** vienas mazgas apdoroja + vieną SQLite rašytoją** . Didelis prieinamumas yra** nepalaikoma** toje topologijoje.

| Apribojimas                                    | Pasekmė                                                                                                                                                                                                                                                                                                                                    |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Vienišas rašytojas                             | Daryk** ne** paleiskite kelias kopijas tame pačiame SQLite faile. Tai sugadina DB.                                                                                                                                                                                                                                                         |
| Atkurti / paleisti iš naujo / HEALTHCHECK kill | **Visiškas išjungimas** SSE skrydžio metu, prietaisų skydelio seansų ir atminties būsenos. Kiekvienas prijungtas klientas nukrenta. Naujos užklausos tuščiame galutinio taško lange gauna atvirkštinį tarpinį serverį**`502 Bad Gateway: Unknown error`** , o ne OmniRoute JSON – klientai negali to atskirti nuo teikėjo gedimo (#11015). |
| Tas pats įvykio ciklas kaip `/healthz`         | Užimtas katalogas arba suspaudimo žymė gali atidėti zondus; trumpas skirtasis laikas, tada paleidžiamas iš naujo** tik** replika.                                                                                                                                                                                                          |

**Zondo matrica** (taip pat žr. [Kubernetes zondo rekomendacijas](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ):

| Zondas          | Tikslas                                                            | Nenaudoti                                                            |
| --------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------- |
| Gyvumas         | TCP ant `PORT` (numatytasis `20128`) arba minkštas HTTP `/healthz` | `/api/monitoring/health`                                             |
| Pasirengimas    | HTTP `GET /healthz`                                                | Trumpas skirtasis laikas, dėl kurio įvykių ciklas užimtas kaip miręs |
| Giliai / žmonės | `/api/monitoring/health`                                           | Automatizuotas kubeleto gyvumas                                      |

**Atnaujinimai:** tikisi, kad kiekviena sesija sumažės. Jei galite, nusausinkite klientus; nėra atnaujinamo numatytojo SQLite atnaujinimo. Sukurti `restart: unless-stopped` plus Docker `HEALTHCHECK` taip pat pakeis vienintelį procesą, kai konteineris yra nesveikas – toks pat sprogimo spindulys.

Paruošti aprašai ir vairo diagrama veikia `deploy/kubernetes/` ir `deploy/helm/omniroute/` – žr. [Kubernetes diegimo vadovą](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

„Kubernetes“ fragmentas, skirtas a** viena kopija** (Reikia sukurti iš naujo; nekelkite `replicas` prieš vieną SQLite failą):

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

`preStop` sleep“ leidžia „kube“ atsisakyti paslaugų galinių taškų prieš SIGTERM.** naujas** eismas nustoja smogti mirštančiam procesui. Skrydžio metu `/v1/responses` SSE išleidžiamas iki `SHUTDOWN_TIMEOUT_MS` (numatytasis 30 s) pagal sunkiasvorių įleidimo nuomos sutartis (#11015). Naujos užklausos, kurios vis dar pasiekia procesą, gauna `503` + `Retry-After: 5`. Atkurti tuščią galinio taško spragą, kol pakeitimas bus paruoštas, išlieka rimtu gedimu – tai yra SQLite topologija, o ne zondo klaidinga konfigūracija.

Išorinis Postgres / multi-writer HA yra** ne** dokumentais patvirtintas atsargų kelias. Jei jums reikia HA, pasilikite vieną kopiją arba paleiskite topologiją, kurią projektas išbandė ir dokumentavo atskirai. Postgres/MySQL darbas gyvena [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Kol bus išsiųstas, vienintelis palaikomas būdas daugintis** didelis** `/v1/responses` talpa yra N nepriklausomų procesų (kitas skyrius), o ne `replicas > 1` viename tome.

## Horizontalusis mastelio didinimas: N nepriklausomų procesų

Vienas Node procesas yra **viena V8 krūva**. Dvi persidengiančios ~3 MiB / ~750 tūkst. žetonų programavimo agento `POST /v1/responses` užklausos (RTK + Caveman) nutraukia tos krūvos darbą ties ~12 Gi (`FATAL ERROR: Reached heap limit`) ir gali sukelti atminties trūkumą 16 Gi cgroup grupėje. Žr. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Šis matavimas yra įspėjimas apie **atminties biudžetą**, o ne griežta produkto riba, leidžianti daugiausia dvi lygiagrečias ilgas `/v1/responses` užklausas. Didelių pokalbių priėmimą riboja automatiškai apskaičiuojamas gaunamų baitų biudžetas (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), nustatytas pagal tą pačią V8 / cgroup ribą — padidinus šią reikšmę (arba nustačius senąją `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` užklausų skaičiaus ribą) jau sukonfigūruotame procese, vėl atsiranda avarinio nutraukimo rizika. Mažiems pokalbiams, `/healthz`, `/v1/models` ir MCP ši riba **netaikoma**.

### Vienas procesas: daugiau nei dvi ilgos `/v1/responses` užklausos

**Tvarkingai veikiantis** procesas (krūva nesiekia `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, numatytoji reikšmė `0.75`) **gali** vykdyti daugiau nei dvi lygiagrečias ilgas `POST /v1/responses` užklausas, kai viso proceso vykdomų užklausų baitų biudžete (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) dar yra vietos. Kūnai, kurių dydis siekia arba viršija `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (numatytoji reikšmė 256 KiB), gauna tą pačią didelės apkrovos leidimo nuomą kaip ir sudėtingos struktūros užklausos bei naudoja tą patį [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` išimties mechanizmą (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Dešimtys lygiagrečių ilgų SSE klientų (operatoriams dažnai reikia 40–50) yra **atminties biudžeto** klausimas — reikia tinkamai parinkti krūvos dydį, pagrindinių / rezervinių vietų skaičių ir `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — o ne griežta produkto riba „daugiausia 2“. Esant krūvos spaudimui, užklausos vis tiek atmetamos su pakartotinai bandyti leidžiančiu `503`, kad #7849 problema nepasikartotų.

Norėdami **padauginti krūvas** (nepriklausomas V8 senosios kartos atminties sritis) **šiandien**:

| Darykite                                                                                                                                                                                       | Nedarykite                                                                                  |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Paleiskite **N konteinerių / podų**, kiekvieną su **atskiru** `DATA_DIR` / tomu                                                                                                                | Nenustatykite `replicas > 1` vienam SQLite failui                                           |
| Didelių vykdomų užklausų ir sveikos būsenos rezervo dydį nustatykite pagal krūvos / vykdomų užklausų baitų biudžetą; 1–2 yra konservatyvi #7849 numatytoji reikšmė, o ne griežta produkto riba | Nesuteikite vienam procesui 8× RAM ir neriboto skaičiaus ribos                              |
| Pasirinktinai: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL`, kad būtų naudojami **bendri kvotų skaitikliai**                                                                           | Nelaikykite Redis bendrinama SQLite saugykla — taip nėra                                    |
| Nukopijuokite teikėjų paslaptis į kiekvieną egzempliorių (arba susitaikykite su atskiromis suvestinėmis)                                                                                       | Nesitikėkite vienos suvestinės / vieno iškvietimų žurnalo visuose egzemplioriuose           |
| Priekyje naudokite bet kokį apkrovos balansavimo įrenginį; pakanka susiejimo pagal API raktą arba sesiją                                                                                       | Nereikalaukite konkrečiam tiekėjui skirtos, dydį įvertinančios tarpinės programinės įrangos |

Aparatinė įranga: vieno egzemplioriaus lygiagrečių ilgų `/v1/responses` užklausų skaičius yra **atminties biudžeto** klausimas (krūva + vykdomų užklausų baitai / #10110). `N` nepriklausomų `DATA_DIR` vis tiek padaugina krūvas: pagrindinio kompiuterio RAM turi pakakti `N × cgroup`, o ne „vienam 16 Gi podui su N=8“. Niekada nenaudokite `replicas > 1` vienam SQLite failui.

Compose pavyzdys (dvi krūvos, du tomai — ne `deploy.replicas: 2`):

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

Tankesnis vykdymas viename procese (suspaudimą perkeliant iš HTTP izoliato) aprašytas [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Vienas loginis klasteris, naudojantis bendrą patvarią būseną, aprašytas [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## „Gemini“ regioninės klaidos „Docker“ aplinkoje

„Google AI Studio“ / „Gemini API“ gali grąžinti HTTP 400 klaidą su FAILED_PRECONDITION ir
`User location is not supported for the API use.` Sėkminga užklausa pagrindinėje sistemoje
neįrodo, kad konteineris naudoja tą patį išeinantį maršrutą. DNS eiliškumas,
IPv4/IPv6 ryšys, VPN maršrutizavimas ir sukonfigūruoti tarpiniai serveriai gali skirtis. Patikrinkite
[„Google“ palaikomus regionus](https://ai.google.dev/gemini-api/docs/available-regions)
ir faktinį ryšio maršrutą; vien ši klaida nereiškia, kad API raktas yra netinkamas.

### Pirmenybę teikite konkretaus ryšio tarpiniam serveriui

Paveiktam „Gemini“ ryšiui naudokite „OmniRoute“
[konkretaus ryšio tarpinio serverio konfigūraciją](../ops/PROXY_GUIDE.md#4-level-proxy-system),
tada pakartokite **Ryšio patikrą** ir mažą užklausą
su tuo pačiu modeliu. Taip maršruto pakeitimas taikomas tik tam ryšiui. Patikrinkite,
ar tarpinis serveris pasiekiamas iš konteinerio ir ar ryšys iš tiesų jį pasirenka.
Maršruto pakeitimas negarantuoja, kad aukštesnio lygmens paslauga bus prieinama tame regione.

### Palyginkite pagrindinės sistemos ir konteinerio tinklą

Lygindami autentifikuotų užklausų rezultatus naudokite tą patį raktą, modelį ir užklausą; niekada
į problemos aprašą neįklijuokite prisijungimo duomenų, tarpinio serverio slaptažodžių ar visų autorizavimo antraščių.
Pirmiausia patikrinkite, kurias adresų šeimas pateikia OS vardų išsprendimo priemonė, naudodami tą pačią komandą
pagrindinėje sistemoje ir konteineryje:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Pakeiskite `omniroute` jūsų naudojama paslauga (pavyzdžiui, `omniroute-web`). Šios
komandos išveda adresų šeimas be prisijungimo duomenų ar IP adresų. Grąžinta reikšmė `6`
rodo tik IPv6 DNS rezultatą: ji **neįrodo**, kad IPv6 maršrutas yra tinkamas naudoti ar kad yra prieiga prie API.
Jei įdiegta `curl`, abiejose aplinkose palyginkite
`curl -4 -I https://generativelanguage.googleapis.com`
su `curl -6 -I https://generativelanguage.googleapis.com`.
HTTP atsakymas patvirtina šio patikrinimo ryšį, net jei tai yra neautentifikuotos užklausos
klaida; „Gemini“ tinkamumą naudoti patikrina tik autentifikuota modelio užklausa.

### Pagrindinės sistemos lygmens alternatyva: veikiantis IPv6 ir vardų išsprendimo politika

Pranešimo [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) autorius savo
aplinkoje atkūrė prieigą įjungęs konteinerio IPv6 ir pakeitęs glibc adresų
pasirinkimą. Laikykite tai konkrečiai aplinkai skirta alternatyva. Prieš keisdami vardų išsprendimo nuostatas
įsitikinkite, kad pagrindinės sistemos IPv6, konteinerio išeinantis ryšys / maršrutizavimas ir užkardos taisyklės veikia.
Vien privatus ULA adresas nepatvirtina viešojo IPv6 ryšio.

Paslaugoms, kurios jau prijungtos prie numatytojo „Compose“ tinklo, šis fragmentas įjungia
IPv6 tame tinkle; išsaugokite likusią paslaugos, prievadų, tomų ir konfigūracijos dalį:

```yaml
networks:
  default:
    enable_ipv6: true
```

Jei naudojamas vardinis tinklas, įjunkite IPv6 tame tinkle, prie kurio paslauga iš tikrųjų prisijungia. „Docker“ gali
skirti ULA potinklį; aiškiai nurodytą, su kitais nepersidengiantį potinklį rinkitės tik tada, kai to reikia jūsų tinklui.
Žr. [„Docker“ IPv6 tinklo dokumentaciją](https://docs.docker.com/engine/daemon/ipv6/)
ir [„Compose“ tinklo parinktis](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

**glibc pagrįstame atvaizde** `/etc/gai.conf` gali pakeisti adresų pasirinkimą. Dabartinio
saugyklos Dockerfile pagrindas yra „Debian“; pasirinktiniai musl pagrįsti atvaizdai šio mechanizmo nenaudoja.
Aprašytas pakeitimas pakeičia ULA žymą iš `label fc00::/7 6` į
`label fc00::/7 1`. Pradėkite nuo visos atvaizdo politikos lentelės ir išsaugokite kitus jos
įrašus: pridėjus `label` arba `precedence` įrašą pakeičiama numatytoji lentelė, todėl failo,
kuriame yra tik pakeista eilutė, nepakanka.
[glibc konfigūracijos žinyne](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
aprašyta ši elgsena. Prijunkite peržiūrėtą failą tik skaitymo režimu prie `/etc/gai.conf`
ir iš naujo sukurkite paslaugą, kad pakeitimai būtų pritaikyti.

Tai pakeičia OS adresų pasirinkimą **visam išeinančiam srautui tame konteineryje**.
Tai nepriverčia kiekvienos programos pasirinkti IPv6: „Node“ DNS eiliškumas ir ryšio
pasirinkimas taip pat yra svarbūs. Visų pirma `--dns-result-order=ipv4first` pirmenybę teikia IPv4 ir
nėra sprendimas, kai problema kyla naudojant tik IPv4. Žr. [„Node“ DNS eiliškumą](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Po bet kokio pagrindinės sistemos lygmens pakeitimo iš naujo patikrinkite „Gemini“ ir kitus savo paslaugų teikėjus. Norėdami atšaukti pakeitimus,
pašalinkite pasirinktinio `gai.conf` prijungimą, atkurkite ankstesnę tinklo konfigūraciją ir
techninės priežiūros laikotarpiu iš naujo sukurkite paveiktą paslaugą / tinklą. Pakartotinis tinklo sukūrimas
gali sutrikdyti kitų prie jo prijungtų konteinerių veikimą; neištrinkite nuolatinių duomenų tomo.

## Svarbios pastabos

- **SQLite WAL režimas:** reikia leisti `docker stop` komandai užbaigti darbą, kad OmniRoute galėtų įrašyti naujausius pakeitimus atgal į `storage.sqlite` per kontrolinio taško operaciją. Pridėtuose Compose failuose jau nustatytas 40 s sustabdymo atidėjimo laikotarpis. Jei paleidžiate atvaizdą tiesiogiai, išlaikykite `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** nustatykite į `true`, jei įprastos / prieš rašymą atliekamos atsarginės kopijos tvarkomos išoriškai. Esamos duomenų bazės perkėlimams vis tiek reikia atskiros patvarios saugos momentinės kopijos ir masinio perkėlimo apsaugos.
- **Duomenų išlaikymas:** visada prijunkite tomą prie `/app/data`, kad duomenų bazė, raktai ir konfigūracijos išliktų konteinerį paleidus iš naujo.
- **Prievado konfigūracija:** perrašykite aplinkos kintamąjį `PORT`, kad pakeistumėte numatytąjį `20128` prievadą.

## Taip pat žr.

- [VM diegimo vadovas](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare sąranka
- [Fly.io diegimo vadovas](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — diegimas į Fly.io
- [Aplinkos konfigūracija](../reference/ENVIRONMENT.md) — išsami `.env` nuoroda
