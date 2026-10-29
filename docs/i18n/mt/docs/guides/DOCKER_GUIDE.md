# 🐳 Docker Guide — OmniRoute (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Referenza kompluta għall-iskjerament b’Docker. Għal bidu rapidu, ara t-[taqsima dwar Docker fir-README](../README.md#-docker).

## Werrej

- [Tħaddim Rapidu](#quick-run)
- [B’Fajl tal-Varjabbli tal-Ambjent](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Profili Disponibbli](#available-profiles)
- [Konfigurazzjoni tal-għodod CLI tal-host meta OmniRoute jitħaddem f’Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Sidecar ta’ Redis](#redis-sidecar)
- [Compose għall-Produzzjoni](#production-compose)
- [Stadji tad-Dockerfile](#dockerfile-stages)
- [Varjabbli Kritiċi tal-Ambjent](#critical-environment-variables)
- [Docker Compose b’Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Mina Rapida ta’ Cloudflare](#cloudflare-quick-tunnel)
- [Tags tal-Immaġnijiet](#image-tags)
- [Aġġornamenti tad-dashboard f’Docker](#dashboard-updates-in-docker)
- [Disponibbiltà: SQLite predefinit jappoġġja replika waħda](#availability-default-sqlite-is-single-replica)
- [Żbalji reġjonali ta’ Gemini ġewwa Docker](#gemini-regional-errors-inside-docker)
- [Noti Importanti](#important-notes)

---

## Tħaddim Rapidu

> **Trid tospita s-servizz int stess bi kmand wieħed?** Ara l-
> [Gwida għall-Awtoospitar](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (immaġni ppubblikata +
> Redis, aċċessibbli biss mil-loopback, mingħajr għażla ta’ profil). It-Tħaddim Rapidu hawn taħt huwa
> l-metodu b’kontenitur wieħed għal utenti li diġà jħaddmu Redis x’imkien ieħor.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## B’Fajl tal-Varjabbli tal-Ambjent

```bash
# L-ewwel ikkopja u editja .env
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
# Profil bażi (mingħajr għodod CLI)
docker compose --profile base up -d

# Profil CLI (Claude Code, Codex u OpenClaw integrati)
docker compose --profile cli up -d

# Profil tal-host (primarjament għal Linux; jimmonta l-binarji CLI tal-host bħala għall-qari biss)
docker compose --profile host up -d

# Profil tal-web (Chromium/Playwright għall-fornituri ta’ sessjonijiet tal-web)
docker compose --profile web up -d

# Għaqqad CLI + sidecar CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Profili Disponibbli

OmniRoute jinkludi profili Compose għall-konfigurazzjonijiet ewlenin tal-iskjerament. Agħżel dak li jaqbel mal-ambjent tiegħek.

| Profil              | Servizz          | Meta tużah                                                                                                                                                     | Kmand                                        |
| ------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (predefinit) | `omniroute-base` | Server mingħajr interfaċċa grafika / ambjent ta’ tħaddim minimu, mingħajr CLIs tal-fornituri inklużi                                                           | `docker compose --profile base up -d`        |
| `cli`               | `omniroute-cli`  | Flussi tax-xogħol b’aġenti li jsejħu `omniroute providers/setup/doctor` u CLIs inklużi (Codex, Claude Code, Droid, OpenClaw)                                   | `docker compose --profile cli up -d`         |
| `host`              | `omniroute-host` | Hosts Linux li jridu aċċess simili għal `network_mode` għall-CLIs tal-host billi jimmontaw `~/.local/bin`, `~/.codex`, `~/.claude`, eċċ. bħala għall-qari biss | `docker compose --profile host up -d`        |
| `cliproxyapi`       | `cliproxyapi`    | Ħaddem is-sidecar [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) fuq il-port `8317` għall-proxying tal-CLI upstream                               | `docker compose --profile cliproxyapi up -d` |
| `web`               | `omniroute-web`  | Fornituri ta’ sessjonijiet tal-web li jeħtieġu browser: `gemini-web`, `claude-web`, `claude-turnstile` (jibni `runner-web`, bi Chromium inkluż)                | `docker compose --profile web up -d`         |

> Jistgħu jingħaqdu diversi profili: `docker compose --profile cli --profile cliproxyapi up -d`.

## Konfigurazzjoni tal-għodod CLI tal-host meta OmniRoute jaħdem f'Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` u l-buttuna
**Issejvja l-konfigurazzjoni** tad-dashboard kollha jiktbu fajls bħal `~/.codex/*.config.toml`. Dawk il-mogħdijiet
għandhom tifsira biss fuq il-magna fejn fil-fatt jaħdem is-CLI. Jekk tħaddimhom ġewwa
l-container, il-kitba tispiċċa fid-direttorju home tal-container stess (`/home/node` —
l-image taħdem b'`USER node`), fejn l-ebda CLI tal-host qatt mhu se jaqraha u fejn
titħassar mal-ewwel rikreazzjoni tal-container.

OmniRoute jinduna b'dan u jirrifjuta l-kitba filwaqt li jipprovdi struzzjonijiet minflok
jirrapporta suċċess li ma tistax tuża: is-CLI joħroġ b'`2`, u l-API twieġeb b'`422`
bi `containerEphemeralTarget: true`.

### Rakkomandat: ħaddem is-CLI fuq il-host, u OmniRoute f'Docker

Il-container jipprovdi l-API; is-CLI jikkonfigura l-għodod tal-host tiegħek.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # ipponta s-CLI lejn il-container
omniroute setup-codex                      # jikteb il-~/.codex reali fuq il-host tiegħek
```

Din hija l-għażla t-tajba meta Codex, Claude Code, Cursor jew għodod simili jaħdmu fuq
il-laptop tiegħek — li hija l-konfigurazzjoni tas-soltu.

### Alternattiva: immonta d-direttorji tal-konfigurazzjoni tal-host b'bind mount (profil `host`)

Jekk trid li l-container innifsu jikteb il-konfigurazzjoni tal-host tiegħek, immonta
d-direttorji fih u pponta `CLI_CONFIG_HOME` lejn l-għerq tal-mount. Il-profil `host`
diġà jagħmel dan:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Bind mount huwa dak li jagħmel il-mogħdija affidabbli: OmniRoute jaqra
`/proc/self/mountinfo` u jippermetti kitbiet f'mogħdijiet immuntati (u f'direttorji
li t-tfal tagħhom huma mounts, li hija eżattament l-istruttura ta' `/host-home` hawn fuq) filwaqt li
xorta jirrifjuta dawk mhux immuntati.

### Soluzzjoni ta' emerġenza: ikkonfigura s-CLIs tal-container stess (uża b'kawtela)

Meta s-CLIs ikunu ġenwinament jinsabu ġewwa l-container (il-profil `cli`), il-kitba
tkun intenzjonata. Għaddi `--allow-container-write` lil kwalunkwe kmand `setup-*`, jew issettja
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` għas-server. Il-kitba titwettaq
bi twissija li mhix se tibqa' teżisti wara l-container.

> **Twissija ta' sigurtà — profil `cli` + mount ta' `docker.sock`.**
> Il-profil `cli` jagħmel bind mount ta' `/var/run/docker.sock` sabiex l-aġġornatur
> awtomatiku fil-container ikun jista' jirrikrea l-istack mid-daemon tal-host
> (`src/lib/system/autoUpdate.ts` jiċċekkja jekk dak is-socket jeżistix u jaqbeż il-mogħdija
> ta' Docker meta ma jkunx preżenti). Dak is-socket huwa **konfini ta' fiduċja b'livell root
> fuq il-host**: kull ħaġa li tista' taċċessah tikkontrolla d-daemon ta' Docker tal-host bħala
> root — tista' toħloq, tispezzjona, twaqqaf u tneħħi kwalunkwe container fuq il-host.
> Implikazzjonijiet:
>
> 1. **Qatt tesponi l-port tal-profil `cli` għan-network.** Ippubblikah
>    fuq `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — profil `cli` aċċessibbli mil-LAN ibiddel kwalunkwe RCE fil-livell tad-dashboard fi
>    kompromess sħiħ tal-host.
> 2. **Tagħmilx bind mount ta' direttorji addizzjonali tal-host fil-profil `cli`.**
>    Is-socket ta' Docker flimkien ma' kwalunkwe mount ieħor jagħti lill-container aċċess sħiħ
>    ta' qari/kitba għas-sistema tal-fajls u l-konfigurazzjoni tal-host tiegħek. Jekk teħtieġ li għodda
>    tara proġett, ħaddimha lokalment bil-binarju tas-CLI — timmontahiex
>    fil-container `cli`.
>
> Jekk m'għandekx bżonn aġġornament awtomatiku fil-container, tixgħelx il-profil `cli`
> (`COMPOSE_PROFILES=core,redis` jew iqsar). Il-profili l-oħra ma
> jimmontawx is-socket ta' Docker.
>
> Ara `docs/security/MITM-TPROXY-DECRYPT.md` (git; mhux ikkompilat f'`/docs`) għall-mudell relatat tat-theddid
> madwar MITM, u `docs/security/SUPPLY_CHAIN.md` għall-katina tal-provenjenza tal-binarji
> `codex`/`claude-code`/`droid`/`openclaw`.

## Sidecar ta’ Redis

OmniRoute jiddependi fuq Redis biex jappoġġja l-limitatur distribwit tar-rata u l-cache kondiviża. Is-servizz `redis` huwa **dejjem definit** f’`docker-compose.yml` (m’għandu ebda restrizzjoni ta’ profil) u jibda flimkien ma’ kwalunkwe profil ieħor.

| Dettall                  | Valur                                                    |
| ------------------------ | -------------------------------------------------------- |
| Immaġni                  | `redis:7-alpine`                                         |
| Isem tal-container       | `omniroute-redis`                                        |
| Port intern              | `6379`                                                   |
| Port tal-host (override) | `REDIS_PORT` (il-valur predefinit huwa `6379`)           |
| Bind tal-host (override) | `REDIS_BIND_HOST` (il-valur predefinit huwa `127.0.0.1`) |
| Volum                    | `omniroute-redis-data` → `/data`                         |
| Kontroll tas-saħħa       | `redis-cli ping` (intervall ta’ 10s)                     |

Varjabbli tal-ambjent relatati:

- `REDIS_URL` — string tal-konnessjoni injettata fl-app (`redis://redis:6379` b’mod predefinit).
- `REDIS_PORT` — mapping tal-port fuq in-naħa tal-host għall-container ta’ Redis.
- `REDIS_BIND_HOST` — interfaċċa tal-host li fuqha jiġi ppubblikat il-port. Il-valur predefinit huwa `127.0.0.1`.

> **Għaliex loopback b’mod predefinit:** is-sidecar jaħdem mingħajr `requirepass`, u l-containers
> tal-app jaċċessawh permezz tan-network ta’ compose (`redis:6379`) — il-port ippubblikat qiegħed
> hemm biss għall-għodod fuq in-naħa tal-host (`redis-cli`, `npm run dev` lokali). Il-pubblikazzjoni fuq
> `0.0.0.0` tesponi Redis mingħajr awtentikazzjoni għal kull host fuq il-LAN tiegħek. Jekk tissettja
> `REDIS_BIND_HOST=0.0.0.0`, żid ukoll `--requirepass` mal-`command:` tas-servizz.

**Id-diżattivazzjoni ta’ Redis** mhijiex rakkomandata (il-limitatur tar-rata se jaqleb għal fallback fil-memorja bi prestazzjoni inferjuri). Jekk trid tagħmel dan bilfors, jew neħħi/ikkummenta l-blokka tas-servizz `redis:` f’`docker-compose.yml`, jew iskalah għal żero:

```bash
docker compose up -d --scale redis=0
```

## Compose għall-Produzzjoni

Għal snapshot iżolat tal-produzzjoni li jaħdem flimkien mal-ambjent tal-iżvilupp, uża `docker-compose.prod.yml`.

| Dettall                       | Valur                                                                                      |
| ----------------------------- | ------------------------------------------------------------------------------------------ |
| Fajl                          | `docker-compose.prod.yml`                                                                  |
| Port predefinit tad-dashboard | `PROD_DASHBOARD_PORT=20130` (immappjat għall-port intern `${DASHBOARD_PORT:-20128}`)       |
| Port predefinit tal-API       | `PROD_API_PORT=20131`                                                                      |
| Immaġni                       | `omniroute:prod` (mibnija mit-target `runner-cli`)                                         |
| Container ta’ Redis           | `omniroute-redis-prod` (`redis:8.6.2`, volum dedikat `redis-prod-data`)                    |
| Volum tad-data                | `omniroute-prod-data` (b’isem, ippersistit bejn rebuilds)                                  |
| Kontrolli tas-saħħa           | `node healthcheck.mjs` + `redis-cli ping`, b’`depends_on` ikkontrollat mis-saħħa ta’ Redis |

Kif tużah:

```bash
# Ibni u niedi l-istack tal-produzzjoni
docker compose -f docker-compose.prod.yml up -d --build

# Uri l-logs kontinwament
docker compose -f docker-compose.prod.yml logs -f

# Waqqaf kollox (żomm il-volumi)
docker compose -f docker-compose.prod.yml down
```

L-istack tal-produzzjoni jaħdem b’mod parallel mal-compose tal-iżvilupp (b’ismijiet tal-containers, ports u volumi differenti), għalhekk tista’ tkompli taħdem lokalment filwaqt li l-produzzjoni tibqa’ taħdem.

## Stadji tad-Dockerfile

Ir-repożitorju jinkludi Dockerfile b’diversi stadji (`Dockerfile`). Erba’ stadji huma esposti; agħżel it-`target` adattat għall-każ tal-użu tiegħek.

| Stadju        | Immaġni bażi          | Għan                                                                                                                                                                                                                                                                                        |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Jinstalla d-dipendenzi (`npm ci --legacy-peer-deps`) u jħaddem `npm run build` (Turbopack b’mod awtomatiku — ara r-Riżorsi waqt il-build hawn taħt)                                                                                                                                         |
| `runner-base` | `node:26-trixie-slim` | Ambjent ta’ eżekuzzjoni għall-produzzjoni bl-output standalone ta’ Next.js. **L-ebda CLI tal-fornituri mhi inkluża.**                                                                                                                                                                       |
| `runner-cli`  | `runner-base`         | Iżid `git`, `docker.io`, `docker-compose` u l-CLIs globali: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Agħżel dan għal flussi tax-xogħol aġentiċi.**                                                                                                              |
| `runner-web`  | `runner-base`         | Iżid Playwright + browser Chromium (`--with-deps`) għall-fornituri ta’ sessjonijiet web: `gemini-web`, `claude-web`, `claude-turnstile`. **Agħżel dan meta tuża dawk il-fornituri** — l-immaġni sempliċi tfalli waqt it-talba mingħajru (ara n-nota dwar `-web` taħt il-Kanali tar-Rilaxx). |

Ibni `target` speċifiku manwalment:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Riżorsi waqt il-build

Tliet argumenti tal-build jikkontrollaw kemm jiswa l-istadju `builder`. Dawn japplikaw biss waqt il-build —
`OMNIROUTE_MEMORY_MB` (hawn taħt) huwa kontroll separat waqt l-eżekuzzjoni.

| Argument tal-build          | Valur awtomatiku | Effett                                                                                          |
| --------------------------- | ---------------- | ----------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`              | `0` jibni b’webpack: inqas memorja massima, iżda aktar bil-mod. `1` jagħżel Turbopack.          |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`           | Limitu tal-heap ta’ V8 (`--max-old-space-size`) għall-`next build` li jinbeda.                  |
| `OMNIROUTE_BUILD_WORKERS`   | `2`              | Jipprovdi `CIRCLE_NODE_TOTAL`; Next jikkalkula `workers = N - 1` għall-ġbir tad-data tal-paġni. |

`OMNIROUTE_BUILD_WORKERS` huwa dak li għandek iżżid fuq builder b’saħħtu u dak li
għandek tissuspetta meta build b’riżorsi limitati jmut **wara** `✓ Compiled successfully`. Kull
worker tad-data tal-paġni huwa proċess għalih, bħalma huwa wkoll il-proċess prinċipali `next build`;
riproduzzjoni diretta fuq VPS (kwistjoni #7518) kejlet l-ogħla RSS ta’ kull proċess għal
~4.5 GB indipendentement mill-flag tal-heap `NODE_OPTIONS` (Turbopack jikkompila f’memorja
nattiva/Rust barra mill-heap ta’ V8). Il-valur awtomatiku ta’ `2` (→ worker wieħed, total ta’ 2
proċessi) huwa adattat għar-runners ospitati minn GitHub b’16 GB / 4 vCPU li tuża
l-pipeline tal-pubblikazzjoni. B’`8` (→ 7 workers), dak ir-runner spiċċalu l-memorja u
buildkit falla l-pass b’`ResourceExhausted: ... cannot allocate memory`;
`3` (→ 2 workers) xorta ma kienx biżżejjed ladarba l-RSS għal kull proċess tkejjel
direttament minflok ġie dedott. `tests/unit/docker-build-memory-budget.test.ts`
jagħmel il-kalkoli skont iċ-ċifra mkejla u jfalli jekk xi wieħed miż-żewġ kontrolli
jaqbeż il-kapaċità tar-runner.

Turbopack jikkompila f’memorja nattiva ta’ Rust li tinsab **barra** mill-heap ta’ V8, għalhekk
`OMNIROUTE_BUILD_MEMORY_MB` ma jillimitahiex. Fuq host b’limitu tal-memorja,
il-build imbagħad jinqatel b’SIGKILL mill-OOM killer mingħajr ebda test ta’ żball — sempliċement
jieqaf f’nofs `Creating an optimized production build`, u dan jidher qisu weħel aktar
milli qisu spiċċatlu l-memorja. Għalhekk id-`Dockerfile` juża webpack b’mod awtomatiku
(`OMNIROUTE_USE_TURBOPACK=0`), għall-kuntrarju ta’ `npm run dev` / `npm run build`, fejn
Turbopack huwa l-valur awtomatiku fil-kodiċi: `docker build .` sempliċi mingħajr argumenti tal-build (dak li
jħaddmu Railway u hosts oħra ta’ klikk waħda) ma jridx imut fis-skiet fuq builder
b’limitu tal-memorja. L-immaġnijiet ippubblikati diġà jgħaddu `OMNIROUTE_USE_TURBOPACK=0`
b’mod espliċitu f’`docker-publish.yml`. Fuq builder b’ħafna RAM, agħżel
Turbopack għal build aktar veloċi:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` huwa attivat, għalhekk `next build` iħaddem proċess prinċipali **u** proċess
worker, u kull wieħed jirrispetta `OMNIROUTE_BUILD_MEMORY_MB` separatament. Issettja l-limitu
tal-container għal bejn wieħed u ieħor aktar mid-doppju ta’ dak il-valur, mhux darba biss.

Imkejjel fuq din is-siġra (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Limitu tal-container | Riżultat                              |
| --------- | -------------------- | ------------------------------------- |
| Turbopack | 8 GiB / 16 GiB       | Inqatel mill-OOM fit-tnejn, fis-skiet |
| webpack   | 8 GiB                | Il-build worker inqatel b’SIGKILL     |
| webpack   | 12 GiB               | Irnexxa, u laħaq massimu ta’ 11.1 GiB |

### Valuri awtomatiċi waqt l-eżekuzzjoni

Valuri awtomatiċi esportati minn `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

L-imġiba tal-memorja f’Docker:

- L-immaġni tissettja `OMNIROUTE_MEMORY_MB=1024` u minnha tidderiva `NODE_OPTIONS=--max-old-space-size=1024`.
- Il-proċess attwali tas-server jinbeda mil-launcher awtonomu, li jaqra `OMNIROUTE_MEMORY_MB` u jżid `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node juża l-aħħar valur ripetut ta’ `--max-old-space-size`, għalhekk l-issettjar ta’ `OMNIROUTE_MEMORY_MB` jikkontrolla l-limitu effettiv tal-heap f’Docker.
- Minħabba li l-immaġni dejjem tissettjah, il-valur alternattiv tal-launcher stess, ikkalibrat skont ir-RAM, qatt ma japplika taħt Docker. Żidu b’mod espliċitu skont il-piż tax-xogħol (it-tabella hawn taħt). `2048` xorta għadu żgħir wisq għal `/v1/responses` ta’ aġent tal-kodifikazzjoni.

### RAM waqt it-tħaddim għall-aġenti tal-kodifikazzjoni

Il-valur predefinit ta’ 1 GiB f’Docker huwa l-minimu għal dashboard/chat ħafif, mhux daqs għall-produzzjoni. Bodies twal ta’ `POST /v1/responses` (mijiet ta’ messaġġi, għexieren ta’ għodod) iżommu diversi graffs fil-memorja waqt il-kompressjoni. Żewġ talbiet li jikkoinċidu ta’ madwar 3 MiB / 750k token waqqfu V8 b’old-space ta’ **12 GiB** (`FATAL ERROR: Reached heap limit`) u laħqu wkoll OOM ta’ cgroup ta’ 16 GiB. Ara [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Issettja d-daqs ta’ **cgroup `--memory` ogħla mill-heap** — buffers nattivi, SQLite, u riżultati intermedji tal-kompressjoni jinsabu barra minn V8.

| Piż tax-xogħol                                      | `OMNIROUTE_MEMORY_MB`          | Container / cgroup       | Noti                                                                                                                       |
| --------------------------------------------------- | ------------------------------ | ------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| Dashboard, chat ħafif wieħed                        | `1024` (predefinit fl-immaġni) | ≥2 GiB                   |                                                                                                                            |
| Aġent tal-kodifikazzjoni wieħed (Claude/Codex/Grok) | `8192`                         | ≥10 GiB                  | Sessjoni waħda tipika ta’ `/v1/responses`                                                                                  |
| Żewġ `/v1/responses` twal konkorrenti               | `10240`–`12288`                | ≥12–16 GiB               | Twaqqif ta’ V8 imkejjel b’heap ta’ madwar 12 GiB                                                                           |
| Tliet kuntesti twal konkorrenti jew aktar           | tagħmilx dan fi proċess wieħed | isserjalizza / aktar RAM | L-ammissjoni predefinita għal xogħol tqil hija talba waħda għaddejja; jekk iżżidha mingħajr RAM, terġa’ ddaħħal il-waqfien |

`omniroute serve` fuq bare metal jikkalibra madwar 35% tar-RAM (limitat għal `[512, 4096]`) meta `OMNIROUTE_MEMORY_MB` **ma jkunx issettjat**. Docker dejjem jissettja `1024`, għalhekk dik il-kalibrazzjoni qatt ma titħaddem fl-immaġni uffiċjali.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Varjabbli Kritiċi tal-Ambjent

Lil hinn mill-valuri awtomatiċi ddokumentati f’[ENVIRONMENT.md](../reference/ENVIRONMENT.md), il-varjabbli li ġejjin huma l-aktar importanti meta tħaddem taħt Docker:

| Varjabbli                     | Għan                                                                                                                                                                                                                                                                       | Valur awtomatiku                    |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Sigriet kondiviż għall-bridge WebSocket. **Meħtieġ fil-produzzjoni** — issettjah għal string każwali b’saħħitha.                                                                                                                                                           | mhux issettjat (irid jiġi pprovdut) |
| `REDIS_URL`                   | String tal-konnessjoni għall-backend tal-limitatur tar-rata / cache                                                                                                                                                                                                        | `redis://redis:6379`                |
| `REDIS_PORT`                  | Port fuq in-naħa tal-host għall-container Redis inkluż                                                                                                                                                                                                                     | `6379`                              |
| `REDIS_BIND_HOST`             | Interfaċċa tal-host li fuqha jiġi ppubblikat il-port Redis inkluż (loopback sakemm ma żżidx AUTH)                                                                                                                                                                          | `127.0.0.1`                         |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Path tal-host immuntat fil-profil `cli` f’`/workspace/omniroute` għall-flussi tax-xogħol ta’ awtoaġġornament                                                                                                                                                               | `.` (direttorju attwali)            |
| `OMNIROUTE_MEMORY_MB`         | Limitu massimu tal-heap ta’ Node waqt it-tħaddim għas-server awtonomu ta’ Docker; jissostitwixxi l-valur awtomatiku tal-image msemmi hawn fuq. Aġenti tal-kodifikazzjoni: `8192`+ (ara [RAM waqt it-tħaddim](#runtime-ram-for-coding-agents)).                             | `1024`                              |
| `DASHBOARD_PORT` / `API_PORT` | Jissostitwixxu l-ports esposti għad-dashboard (20128) u għall-API (20129)                                                                                                                                                                                                  | `20128` / `20129`                   |
| `APP_BIND_HOST`               | Interfaċċa tal-host li fuqha docker-compose jippubblika l-ports tad-dashboard/API/live-WS. B’`REQUIRE_API_KEY=false` (il-valur awtomatiku), `0.0.0.0` jesponi l-proxy anonimu `/v1` għal-LAN — wessa’ l-aċċess biss b’`REQUIRE_API_KEY=true` jew b’reverse proxy quddiemu. | `127.0.0.1`                         |
| `CLIPROXY_BIND_HOST`          | Interfaċċa tal-host li fuqha docker-compose jippubblika s-sidecar `cliproxyapi` — il-volum tad-data tiegħu jżomm il-kredenzjali tal-fornitur.                                                                                                                              | `127.0.0.1`                         |
| `OMNIROUTE_PLUGINS_DIR`       | Direttorju li l-iskaner tal-plugins waqt it-tħaddim jaqra minnu u jinstalla fih. Issettjah meta l-plugins ikunu bind-mounted: il-valur awtomatiku jsegwi `HOME`, li image mhux bilfors tesporta.                                                                           | `~/.omniroute/plugins`              |
| `OMNIROUTE_BASE_PATH`         | Subpath tal-URL meta l-app tiġi ppubblikata wara reverse proxy (eż. `/omniroute`)                                                                                                                                                                                          | _(vojt = root)_                     |
| `NEXT_PUBLIC_BASE_URL`        | Oriġini pubblika tal-browser inkluż is-subpath (eż. `https://host/omniroute`)                                                                                                                                                                                              | mhux issettjat                      |
| `PROD_DASHBOARD_PORT`         | Port tad-dashboard fuq in-naħa tal-host għal `docker-compose.prod.yml`                                                                                                                                                                                                     | `20130`                             |
| `CLIPROXYAPI_PORT`            | Port fuq in-naħa tal-host għas-sidecar `cliproxyapi`                                                                                                                                                                                                                       | `8317`                              |

## Reverse Proxy fuq Subpath (Traefik / nginx)

Il-`basePath` ta’ Next.js jiġi kkompilat fil-bundle standalone. OmniRoute jirreġistra l-valur integrat
f’fajl sentinel fl-għerq tal-app (miktub waqt `npm run build`; jinqara minn
`scripts/docker/ensure-docker-base-path.mjs`) u jqabblu ma’
`OMNIROUTE_BASE_PATH` meta jibda l-container. Meta jkunu differenti u l-image tkun
inbniet għall-għerq tad-domain, l-entrypoint jerġa’ jikteb il-manifests standalone,
il-litterali integrati ta’ `basePath`/`assetPrefix` (Next 16 jirrendi l-URLs tal-assets SSR
minn `assetPrefix` biss — il-patcher jirrifletti s-subpath fih), l-URLs integrati
tal-assets `/_next/static` (manifests tar-referenzi tal-client, imports tal-media, paġni
tal-iżbalji prerendered) u x-shim `process.env` tal-client qabel ma jitħaddem
`node dev/run-standalone.mjs`.

### Build b’Compose (rakkomandat)

Issettja ż-żewġ varjabbli f’`.env`, imbagħad erġa’ agħmel build sabiex l-image u r-runtime jaqblu:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` jgħaddi `OMNIROUTE_BASE_PATH` bħala Docker build-arg u bħala
varjabbli tal-ambjent tar-runtime.

### Image tal-għerq mibnija minn qabel + subpath waqt ir-runtime

L-images ippubblikati `diegosouzapw/omniroute:*` huma mibnija għall-għerq tad-domain. Xorta tista’
tissettja `OMNIROUTE_BASE_PATH` waqt ir-runtime; il-container japplika patch lill-bundle darba waħda meta jibda.
Użah flimkien mal-origin pubbliku korrispondenti:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Ikkonfigura r-reverse proxy biex jgħaddi l-path estern **sħiħ** (tneħħix il-
prefix). Traefik għandu jirrotta `PathPrefix(`/omniroute`)` lejn il-container mingħajr
`StripPrefix`, sabiex Next.js jirċievi `/omniroute/...` u jservi l-assets minn
`/omniroute/_next/...`.

Il-healthcheck ta’ Docker jittestja l-endpoint ħafif taċ-ċiklu tal-ħajja `/healthz`, b’prefix
tal-`OMNIROUTE_BASE_PATH` attiv. `/api/monitoring/health` jibqa’ disponibbli għal
dijanjostika minn persuni/dashboards; biex terġa’ tidderieġi l-HEALTHCHECK tal-container lejh (pereżempju
għal infurzar profond tal-istat tas-saħħa), issettja `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Dak il-path huwa kontroll **profond** (DB + sommarju tal-monitoraġġ) — xieraq għall-
`HEALTHCHECK` mhux frekwenti ta’ Docker jekk tagħżel li terġa’ tattivah, iżda **mhux** għal intervalli ta’
`livenessProbe` ta’ Kubernetes.

Għall-orkestraturi (Kubernetes, Nomad, eċċ.):

| Probe              | Ippreferi                                                                   | Evita                                                     |
| ------------------ | --------------------------------------------------------------------------- | --------------------------------------------------------- |
| Liveness           | HTTP `GET /livez`, jew TCP fuq il-port prinċipali (`PORT`, default `20128`) | `/api/monitoring/health` bħala liveness                   |
| Readiness          | HTTP `GET /healthz`                                                         | Timeouts stretti li jqisu event loop okkupat bħala mejjet |
| Profond / blackbox | `/api/monitoring/health`                                                    | —                                                         |

`/healthz` jirrapporta ċ-ċiklu tal-ħajja tal-proċess (`ok` / `starting` / `stopping`). `/livez` huwa
biss kontroll li l-proċess għadu ħaj (200 kull meta l-handler ikun jista’ jitħaddem; ma jistenniex
ir-readiness). It-tnejn xorta jitħaddmu fuq l-istess event loop ta’ Node bħall-ipproċessar tat-talbiet, għalhekk
xogħol marbut mas-CPU fuq il-katalgu jew il-kompressjoni jista’ jdewwimhom — okkupat ≠ mejjet. Ippreferi
liveness permezz ta’ TCP jekk il-probes HTTP jilħqu t-timeout. Gwida sħiħa dwar il-probes:
[Gwida tal-monitoraġġ — rakkomandazzjonijiet għall-probes ta’ Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose ma’ Caddy (HTTPS Auto-TLS)

OmniRoute jista’ jiġi espost b’mod sigur permezz tal-forniment awtomatiku tal-SSL ta’ Caddy. Kun żgur li r-rekord DNS A tad-dominju tiegħek jipponta lejn l-IP tas-server tiegħek.

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
      # Oriġini li tidher mill-browser għall-callbacks tal-OAuth, links tad-dashboard, u URLs pubbliċi ġġenerati.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # URL intern bejn server u ieħor għal kompiti skedati / self-fetches.
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

Caddy jistabbilixxi l-headers standard tat-trażmissjoni għall-container upstream. OmniRoute juża
`NEXT_PUBLIC_BASE_URL` bħala l-oriġini pubblika kanonika għall-callbacks tal-OAuth u l-links pubbliċi
ġġenerati; l-operazzjonijiet ta’ kitba awtentikati tad-dashboard jużaw talbiet mill-istess oriġini flimkien ma’
protezzjoni CSRF marbuta mas-sessjoni. Ippermetti `OMNIROUTE_TRUST_PROXY` biss għal deployments avvanzati fejn intenzjonalment
trid li OmniRoute jidderiva l-oriġini pubblika minn headers trażmessi fdati minflok minn konfigurazzjoni
espliċita.

## Cloudflare Quick Tunnel

L-appoġġ tad-dashboard għal deployments b’Docker jinkludi **Cloudflare Quick Tunnel** b’klikk waħda fuq `Dashboard → Endpoints`. L-ewwel darba li jiġi attivat, iniżżel `cloudflared` biss meta jkun meħtieġ, jibda tunnel temporanju lejn l-endpoint `/v1` attwali tiegħek, u juri l-URL `https://*.trycloudflare.com/v1` iġġenerat direttament taħt il-URL pubbliku normali tiegħek.

Il-pannelli tat-tunnels tal-endpoints (Cloudflare, Tailscale, ngrok) jistgħu jintwerew jew jinħbew minn `Settings → Appearance` mingħajr ma jinbidel l-istat tat-tunnel attiv.

### Noti dwar it-Tunnel

- L-URLs tal-Quick Tunnel huma temporanji u jinbidlu wara kull ristartjar.
- Il-Quick Tunnels ma jiġux irrestawrati awtomatikament wara ristartjar ta’ OmniRoute jew tal-container. Erġa’ attivahom mid-dashboard meta jkun meħtieġ.
- L-installazzjoni ġestita bħalissa tappoġġja Linux, macOS, u Windows fuq `x64` / `arm64`.
- Il-Quick Tunnels ġestiti jużaw it-trasport HTTP/2 b’mod awtomatiku biex jevitaw twissijiet storbjużi dwar il-buffer UDP ta’ QUIC f’ambjenti ta’ containers b’riżorsi limitati. Issettja `CLOUDFLARED_PROTOCOL=quic` jew `auto` jekk trid trasport differenti.
- L-images ta’ Docker jinkludu l-għeruq CA tas-sistema u jgħadduhom lil `cloudflared` ġestit, u b’hekk jiġu evitati fallimenti ta’ fiduċja TLS meta t-tunnel jinbeda minn ġewwa l-container.
- Issettja `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` jekk trid li OmniRoute juża binarju eżistenti minflok iniżżel wieħed.

## Tags tal-Images

| Image                    | Tag      | Daqs   | Deskrizzjoni                                            |
| ------------------------ | -------- | ------ | ------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | L-ogħla SemVer stabbli **ppubblikat** (mhux git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | Iffissa din il-klassi ta’ tag għal GitOps               |

Manifest għal diversi pjattaformi: `linux/amd64` + `linux/arm64` nattivi (Apple Silicon, AWS Graviton, Raspberry Pi). Docker jagħżel l-arkitettura korrispondenti awtomatikament; għaddi `--platform linux/amd64` jekk ikollok bżonn tisforza l-emulazzjoni AMD64 fuq hosts ARM.

### Kanali tar-Rilaxxi

OmniRoute jippubblika kanali Docker separati għal rilaxxi stabbli, ittestjar tal-fergħa attiva tar-rilaxx, u builds tal-iżvilupp.

| Kanal                           | Sors                                       | Mutabbiltà                            | Użu rakkomandat                                                                                                                       |
| ------------------------------- | ------------------------------------------ | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Rilaxx iffirmat/b’verżjoni                 | Immutabbli                            | Deployments ta’ produzzjoni li jiffissaw rilaxx eżatt                                                                                 |
| `:latest` / `:latest-web`       | L-ogħla SemVer stabbli **ppubblikat**      | Puntatur stabbli mutabbli             | Isegwi rilaxxi stabbli **wara** kompitu ta’ pubblikazzjoni SemVer — **ma** jsegwix `main` jew commits ta’ `release/v*` mhux rilaxxati |
| `:next` / `:next-web`           | Il-fergħa `release/v*` predefinita attwali | Puntatur mutabbli ta’ qabel ir-rilaxx | Ittestjar ta’ soluzzjonijiet li ddaħħlu fil-fergħa attiva tar-rilaxx iżda għadhom mhumiex f’rilaxx stabbli                            |
| `:main` / `:main-web`           | Il-fergħa `main`                           | Puntatur mutabbli tal-iżvilupp        | Għall-iżvilupp u l-ittestjar tal-integrazzjoni biss                                                                                   |

#### Fornituri ta’ sessjonijiet web: l-images `-web`

Kull kanal ta’ hawn fuq huwa disponibbli wkoll bħala tag `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), mibni mill-istadju `runner-web` — l-istess image flimkien ma’ Playwright u browser Chromium. L-image sempliċi tiġi **mingħajr** Chromium; `gemini-web`, `claude-web` u `claude-turnstile` jeħtiġuh.

Il-falliment jiġi pospost, u ma jseħħx waqt l-istartjar: dawk il-fornituri jelenkaw il-mudelli tagħhom u jidhru bħala konnessi fid-dashboard, u l-ewwel talba biss tfalli b’dan il-messaġġ

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Jekk tuża dawk il-fornituri, niżżel it-tag `-web` tal-kanal li diġà qed tuża — ma jinbidel xejn aktar. Fuq installazzjoni npm/CLI (mingħajr image ta’ Docker), il-parti nieqsa ekwivalenti hija l-binarju tal-browser: ħaddem `npx playwright install chromium` fuq il-host.

#### Kif tuża l-kanal ta’ qabel ir-rilaxx

Il-kanal `next` jerġa’ jinbena ma’ kull push lejn il-fergħa predefinita attwali `release/v*` u jiġi ppubblikat kemm għal AMD64 kif ukoll għal ARM64. Fergħat ta’ manutenzjoni eqdem ma jistgħux jissostitwuh. Il-kanal jipprovdi immaġni li tista’ tinġibed għal soluzzjonijiet li jkunu ġew integrati fil-fergħa tar-rilaxx attiva qabel ma tinħoloq it-tikketta stabbli li jmiss.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Għal Docker Compose, issostitwixxi t-tikketta tal-immaġni użata mill-profil magħżul, imbagħad iġbed u erġa’ oħloq is-servizz:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Sikurezza u treġġigħ lura

`next` huwa kanal varjabbli ta’ qabel ir-rilaxx. Jista’ jinbidel ma’ kwalunkwe push lejn il-fergħa tar-rilaxx attiva u **mhuwiex appoġġjat għall-użu fil-produzzjoni**. Waħħal id-diġest tal-immaġni waqt li tkun qed tevalwa build speċifika:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Qabel l-ittestjar, agħmel backup tal-volum tad-data ta’ OmniRoute jew tad-direttorju tad-data mmuntat permezz ta’ bind mount. Biex treġġa’ lura, irrestawra l-verżjoni stabbli jew id-diġest użat qabel u erġa’ oħloq il-container:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Build minn fergħa tar-rilaxx qatt ma tista’ tmexxi `latest`; verżjoni semantika stabbli eliġibbli biss tista’ tippromwovi l-indikatur stabbli. L-immaġnijiet `next` iżommu l-ispezzjoni tal-immaġni tar-rilaxx u l-kontroll imblokkanti għall-vulnerabbiltajiet CRITICAL.

**`latest` mhuwiex garanzija ta’ aġġornament għal git.** Soluzzjonijiet integrati f’`main` jew fil-fergħa attiva `release/v*` **ma jkunux** f’`:latest` sakemm tiġi ppubblikata immaġni SemVer stabbli u l-proċess tal-pubblikazzjoni jippromwovi `:latest` (bl-istess diġest bħal dak is-SemVer). Jekk `latest` jidher wieqaf waqt li GitHub diġà juri s-soluzzjoni, iġbed `:next` biex tittestja l-fergħa tar-rilaxx jew stenna t-tikketta SemVer.

| Dak li trid                                                                       | Uża                                         |
| --------------------------------------------------------------------------------- | ------------------------------------------- |
| GitOps / produzzjoni li ma tridx tiddevja                                         | Waħħal `:X.Y.Z` (jew id-diġest tal-immaġni) |
| Segwi r-rilaxxi stabbli ppubblikati u aċċetta li jerġgħu jinħolqu ma’ kull rilaxx | `:latest`                                   |
| Ittestja commits mhux rilaxxati ta’ `release/v*`                                  | `:next` (mhux għall-produzzjoni)            |
| Ittestja `main`                                                                   | `:main` (mhux għall-produzzjoni)            |

## Aġġornamenti tad-dashboard f'Docker

Container minn image ppubblikata ma jistax jissostitwixxi lilu nnifsu. Meta OmniRoute jinduna li qed jaħdem ġewwa
container (mingħajr checkout ta' `.git`, u mhux installazzjoni npm), il-banner tal-aġġornament fid-dashboard prinċipali juri
l-kmand tal-host li għandu jitħaddem minflok l-istruzzjonijiet npm/git, flimkien ma' buttuna biex tikkopjah:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

L-isem tas-servizz jiġi minn `AUTO_UPDATE_SERVICE` (il-valur predefinit huwa `omniroute`, is-servizz f'
`docker-compose.selfhost.yml`). `pull` imexxi biss tag varjabbli (`latest`, `next`); b'tag fiss
`:X.Y.Z`, l-ewwel editja t-tag.

### Aġġornamenti bi klikk waħda permezz ta' fajl trigger fuq il-host

Biex **Aġġorna Issa** jibqa' jaħdem mingħajr ma timmonta `/var/run/docker.sock` (li jagħti lill-container
aċċess root fuq il-host — ara t-twissija dwar il-profil `cli` aktar 'il fuq), issettja `DOCKER_UPDATE_TRIGGER_FILE` fuq is-servizz
OmniRoute u ħaddem watcher fuq il-host:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

Il-path irid ikun ġewwa `DATA_DIR` (il-valuri relattivi jiġu riżolti fir-rigward tiegħu); kull ħaġa oħra tiġi
miċħuda. Imbagħad **Aġġorna Issa** jikteb `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` f'dak
il-fajl, iwieġeb b'`202`, u d-dashboard jiċċekkja ripetutament `/api/system/version` sakemm il-verżjoni l-ġdida tkun attiva
u jerġa' jitgħabba. OmniRoute qatt ma jħaddem shell jew kmand Docker f'dan il-modalità. Bħal kull azzjoni ta'
aġġornament, it-talba tiġi aċċettata biss minn klijenti loopback/LAN.

Direttorju tad-data mmuntat b'bind jagħti lill-host path stabbli biex jimmonitorja. Unitajiet `systemd` ta' eżempju
(aġġusta `/srv/omniroute` għad-direttorju li fih jinsabu l-fajl compose tiegħek u `data/`):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=Watch for OmniRoute dashboard update requests

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=Pull and recreate the OmniRoute container

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

Is-servizz ineħħi t-talba qabel ma jagħmel pull sabiex eżekuzzjoni falluta ma tidħolx f'loop. Mingħajr
`DOCKER_UPDATE_TRIGGER_FILE`, id-dashboard iżomm il-fluss tal-kmand manwali.

## Disponibbiltà: SQLite default huwa replika waħda

Stock Docker / Kubernetes OmniRoute is** wieħed Node proċess + wieħed SQLite kittieb** . Disponibbiltà għolja hija** mhux appoġġjat** fuq dik it-topoloġija.

| Restrizzjoni                          | Konsegwenza                                                                                                                                                                                                                                                                                                                        |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Kittieb waħdieni                      | Do** le** mexxi repliki multipli kontra l-istess fajl SQLite. Li jikkorrompi liz DB.                                                                                                                                                                                                                                               |
| Recreate / restart / HEALTHCHECK kill | **Outage sħiħ** ta' matul it-titjira SSE, sessjonijiet dashboard, u stat fil-memorja. Kull klijent konness jinżel. Talbiet ġodda matul it-tieqa tal-endpoint vojta jiksbu reverse-proxy**`502 Bad Gateway: Unknown error`** , mhux OmniRoute JSON — il-klijenti ma jistgħux jiddistingwu dan minn falliment tal-fornitur (#11015). |
| L-istess event loop bħal `/healthz`   | Katalgu impenjattiv jew qurdien tal-kompressjoni jista 'jdewwem is-sondi; timeout qasir imbagħad jerġa' jibda l-** biss** replika.                                                                                                                                                                                                 |

**Matriċi tas-sonda** (ara wkoll [ir-rakkomandazzjonijiet tas-sonda Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ):

| Sonda          | Mira                                                        | Tużax                                                      |
| -------------- | ----------------------------------------------------------- | ---------------------------------------------------------- |
| Ħajja          | TCP fuq `PORT` (default `20128`), jew artab HTTP `/healthz` | `/api/monitoring/health`                                   |
| Prontezza      | HTTP `GET /healthz`                                         | Timeouts stretti li jittrattaw event-loop busy bħala mejta |
| Fond / bnedmin | `/api/monitoring/health`                                    | Ħajja kubelet awtomatizzata                                |

**Titjib:** jistennew li kull sessjoni tinżel. Ixxotta l-klijenti jekk tista’; m'hemm l-ebda aġġornament kontinwu dwar SQLite default. Compose `restart: unless-stopped` plus Docker `HEALTHCHECK` se jissostitwixxi wkoll l-uniku proċess meta l-kontenitur ma jkunx tajjeb għas-saħħa — l-istess raġġ tal-blast.

Manifesti lesti u tabella Helm ħajjin `deploy/kubernetes/` u `deploy/helm/omniroute/` — ara l- [gwida għall-iskjerament ta' Kubernetes](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

Kubernetes snippet għal a** replika waħda** (Ricreate hija meħtieġa; tgħollix `replicas` kontra fajl SQLite wieħed):

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

`preStop` sleep tikri kube qatra l-endpoints tas-Servizz qabel SIGTERM hekk** ġdid** it-traffiku jieqaf jolqot il-proċess tal-mewt. Matul it-titjira `/v1/responses` SSE jitbattal sa `SHUTDOWN_TIMEOUT_MS` (default 30s) permezz ta 'kirjiet ta' ammissjoni heavyweight (#11015). Talbiet ġodda li għadhom jilħqu l-proċess jiksbu `503` + `Retry-After: 5`. Id-distakk tar-Recreate vojt-endpoint sakemm is-sostituzzjoni tkun Lesta tibqa' qtugħ iebes - jiġifieri t-topoloġija SQLite, mhux sonda ħażina.

Esterni Postgres / multi-writer HA is** le** mogħdija tal-istokk dokumentata. Jekk għandek bżonn HA, żomm replika waħda jew mexxi topoloġija li l-proġett ikun ittestja u ddokumenta separatament. Ix-xogħol Postgres/MySQL jgħix [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Sakemm il-vapuri, l-uniku mod appoġġjat biex timmultiplika** kbar** Il-kapaċità `/v1/responses` hija N proċessi indipendenti (sezzjoni li jmiss), mhux `replicas > 1` fuq volum wieħed.

## Skalar orizzontali: N proċessi indipendenti

Proċess wieħed ta’ Node huwa **heap wieħed ta’ V8**. Żewġ `POST /v1/responses` sovrapposti ta’ ~3 MiB / ~750k token minn aġenti tal-kodifikazzjoni (RTK + Caveman) iwaqqfu dak il-heap f’~12 Gi (`FATAL ERROR: Reached heap limit`) u jistgħu jikkawżaw OOM f’cgroup ta’ 16 Gi. Ara [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Dak il-kejl huwa twissija dwar il-**baġit tal-memorja**, mhux massimu assolut tal-prodott ta’ żewġ `/v1/responses` twal konkorrenti. L-ammissjoni ta’ chats tqal hija kkontrollata minn baġit ta’ bytes tad-dħul derivat awtomatikament (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) ikkalkulat mill-istess limitu ta’ V8/cgroup — jekk jiġi ssuperat manwalment ’il fuq (jew jiġi stabbilit il-limitu l-antik ibbażat fuq l-għadd ta’ talbiet `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) fuq proċess li diġà ġie d-dimensjonat, l-abort jerġa’ jseħħ. Chats żgħar, `/healthz`, `/v1/models`, u MCP **mhumiex** inklużi f’dak il-limitu.

### Proċess wieħed: aktar minn żewġ `/v1/responses` twal

Proċess **b’saħħtu** (heap taħt `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, b’valur predefinit ta’ `0.75`) **jista’** jħaddem aktar minn żewġ `POST /v1/responses` twal konkorrenti meta l-baġit ta’ bytes inflight għall-proċess kollu (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) ikun għad għandu spazju. Bodies ta’ `OMNIROUTE_CHAT_LARGE_BODY_BYTES` jew akbar (b’valur predefinit ta’ 256 KiB) jieħdu l-istess lease tqil bħal talbiet b’struttura tqila u jużaw l-istess rotta ta’ ħruġ `tryAcquireHealthyHeadroom` ta’ [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Għexieren ta’ klijenti SSE twal konkorrenti (l-operaturi spiss ikollhom bżonn 40–50) huma kwistjoni ta’ **baġit tal-memorja** — iddimensjona l-heap + is-slots primarji/headroom + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — mhux limitu assolut tal-prodott ta’ “massimu 2”. Heap taħt pressjoni xorta jirrifjuta t-tagħbija b’`503` li jista’ jerġa’ jiġi ppruvat sabiex #7849 ma jerġax iseħħ.

Biex **timmultiplika l-heaps** (old-spaces indipendenti ta’ V8) **illum**:

| Agħmel                                                                                                                                                                      | Tagħmilx                                                                        |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Ħaddem **N containers/pods**, kull wieħed bid-`DATA_DIR` / volume **tiegħu stess**                                                                                          | Tissettjax `replicas > 1` għal fajl SQLite wieħed                               |
| Iddimensjona l-heavy in-flight + healthy-headroom mill-baġit tal-heap / inflight-byte; 1–2 huwa l-valur predefinit konservattiv ta’ #7849, mhux massimu assolut tal-prodott | Tagħtix lil proċess wieħed RAM 8× akbar u limitu tal-għadd bla restrizzjonijiet |
| Fakultattiv: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` għal **counters tal-kwota kondiviżi**                                                                     | Tittrattax Redis bħala SQLite kondiviż — mhuwiex hekk                           |
| Idduplika s-sigrieti tal-fornituri f’kull istanza (jew aċċetta dashboards separati)                                                                                         | Tistenniex dashboard wieħed / call-log wieħed għall-istanzi kollha              |
| Poġġi kwalunkwe load balancer quddiemhom; stickiness skont API key jew sessjoni hija biżżejjed                                                                              | Tirrikjedix middleware speċifiku għal fornitur li jqis id-daqs                  |

Hardware: l-għadd ta’ `/v1/responses` twal konkorrenti għal kull istanza huwa kwistjoni ta’ **baġit tal-memorja** (heap + inflight-byte / #10110). `N` `DATA_DIR`s indipendenti xorta jimmultiplikaw il-heaps: ir-RAM tal-host trid tkopri `N × cgroup`, mhux “pod wieħed ta’ 16 Gi b’N=8.” Qatt tissettja `replicas > 1` għal fajl SQLite wieħed.

Abbozz ta’ Compose (żewġ heaps, żewġ volumes — mhux `deploy.replicas: 2`):

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

Id-densità fil-proċess (kompressjoni barra mill-HTTP isolate) tinsab f’[#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Cluster loġiku wieħed fuq stat persistenti kondiviż jinsab f’[#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Żbalji reġjonali ta' Gemini ġewwa Docker

Google AI Studio / Gemini API jista' jirritorna HTTP 400 b'FAILED_PRECONDITION u
`User location is not supported for the API use.` Talba li tirnexxi fuq il-host
ma tippruvax li l-container juża l-istess rotta tal-ħruġ. L-ordni tad-DNS,
il-konnettività IPv4/IPv6, ir-routing tal-VPN u l-proxies ikkonfigurati jistgħu jkunu differenti. Iċċekkja
[r-reġjuni appoġġjati minn Google](https://ai.google.dev/gemini-api/docs/available-regions)
kif ukoll ir-rotta effettiva tal-konnessjoni; dan l-iżball waħdu ma jindikax API key ħażina.

### Ippreferi proxy speċifiku għall-konnessjoni

Uża l-[konfigurazzjoni tal-proxy għal kull konnessjoni](../ops/PROXY_GUIDE.md#4-level-proxy-system)
ta' OmniRoute għall-konnessjoni Gemini affettwata, imbagħad erġa' wettaq **Test Connection** u talba żgħira
bl-istess mudell. Dan iżomm il-bidla fir-routing limitata għal dik il-konnessjoni. Ivverifika
li l-proxy jista' jintlaħaq mill-container, u li l-konnessjoni tassew tagħżlu.
Il-bidla tar-rotta ma tiggarantix l-eliġibbiltà reġjonali tas-servizz upstream.

### Qabbel in-networking tal-host u tal-container

Żomm il-key, il-mudell u t-talba identiċi meta tqabbel ir-riżultati awtentikati; qatt
twaħħal kredenzjali, passwords tal-proxy jew headers tal-awtorizzazzjoni sħaħ f'issue.
L-ewwel spezzjona liema familji ta' indirizzi joffri r-resolver tal-OS, billi tuża l-istess kmand
fuq il-host u ġewwa l-container:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Ibdel `omniroute` bis-servizz li tħaddem (pereżempju, `omniroute-web`). Dawn
il-kmandi jistampaw il-familji tal-indirizzi mingħajr kredenzjali jew indirizzi IP. `6`
irritornat juri biss riżultat DNS IPv6: **ma** jippruvax li hemm rotta IPv6 li tista' tintuża jew aċċess għall-API.
Fejn ikun installat `curl`, qabbel `curl -4 -I https://generativelanguage.googleapis.com`
ma' `curl -6 -I https://generativelanguage.googleapis.com` fiż-żewġ ambjenti.
Risposta HTTP tipprova l-konnettività għal dak it-test, anki jekk tkun żball mhux awtentikat;
it-talba awtentikata tal-mudell biss tittestja l-eliġibbiltà għal Gemini.

### Alternattiva fil-livell tal-host: IPv6 li jaħdem u politika tar-resolver

Min irrapporta [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) irrestawra
l-aċċess fl-ambjent tiegħu billi attiva IPv6 għall-container u biddel l-għażla tal-indirizzi
ta' glibc. Ittratta dan bħala alternattiva speċifika għall-ambjent. Ikkonferma IPv6 li jaħdem fuq il-host,
il-ħruġ/routing tal-container u r-regoli tal-firewall qabel taġġusta l-preferenzi tar-resolver.
Indirizz ULA privat waħdu ma jistabbilixxix konnettività IPv6 pubblika.

Għal servizzi diġà konnessi man-network default ta' Compose, din il-parti tattiva
IPv6 fuq dak in-network; żomm il-bqija tas-servizz, il-ports, il-volumes u l-konfigurazzjoni tiegħek:

```yaml
networks:
  default:
    enable_ipv6: true
```

Għal network b'isem, attivah fuq in-network li miegħu jingħaqad effettivament is-servizz. Docker jista'
jalloka subnet ULA; agħżel subnet espliċita li ma tirkibx fuq oħra biss meta n-network tiegħek
ikun jeħtieġha. Ara [in-networking IPv6 ta' Docker](https://docs.docker.com/engine/daemon/ipv6/)
u [l-għażliet tan-network ta' Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

Fuq **image ibbażata fuq glibc**, `/etc/gai.conf` jista' jibdel l-għażla tal-indirizzi. Id-Dockerfile
attwali tar-repożitorju juża Debian; images personalizzati bbażati fuq musl ma jużawx dan il-mekkaniżmu.
L-aġġustament irrappurtat jibdel it-tikketta ULA minn `label fc00::/7 6` għal
`label fc00::/7 1`. Ibda mit-tabella sħiħa tal-politika tal-image u ppreserva l-entrati l-oħra
tagħha: iż-żieda ta' entrata `label` jew `precedence` tissostitwixxi dik it-tabella default, għalhekk file
li jkun fih biss il-linja mibdula mhuwiex biżżejjed. Ir-
[referenza tal-konfigurazzjoni ta' glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
tiddokumenta dik l-imġiba. Agħmel bind-mount tal-file rieżaminat bħala read-only f'`/etc/gai.conf`
u erġa' oħloq is-servizz biex tapplikah.

Dan jibdel l-għażla tal-indirizzi tal-OS għat-**traffiku kollu ħiereġ minn dak il-container**.
Ma jġiegħelx lil kull applikazzjoni tagħżel IPv6: l-ordni tad-DNS ta' Node u l-għażla
tal-konnessjoni huma importanti wkoll. B'mod partikolari, `--dns-result-order=ipv4first` jippreferi IPv4 u
mhuwiex rimedju għal falliment limitat għal IPv4. Ara [l-ordni tad-DNS ta' Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Erġa' ttestja Gemini u l-fornituri l-oħra tiegħek wara kwalunkwe bidla fil-livell tal-host. Biex treġġa' lura,
neħħi l-mount personalizzat ta' `gai.conf`, irrestawra l-konfigurazzjoni preċedenti tan-network u
erġa' oħloq is-servizz/network affettwat waqt perjodu ta' manutenzjoni. Il-ħolqien mill-ġdid ta' network
jista' jinterrompi containers oħra konnessi miegħu; tħassarx il-volume tad-data persistenti.

## Noti Importanti

- **Modalità WAL ta’ SQLite:** `docker stop` għandu jitħalla jitlesta sabiex OmniRoute jkun jista’ jwettaq checkpoint tal-aħħar bidliet lura f’`storage.sqlite`. Il-fajls Compose inklużi diġà jistabbilixxu perjodu ta’ grazzja ta’ 40s għall-waqfien. Jekk tħaddem l-image direttament, żomm `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Issettjah għal `true` jekk il-backups ta’ rutina/qabel il-kitba jkunu ġestiti esternament. Il-migrazzjonijiet ta’ databases eżistenti xorta jeħtieġu snapshot tas-sikurezza durabbli tagħhom stess u protezzjoni kontra migrazzjonijiet tal-massa.
- **Persistenza tad-Data:** Dejjem immonta volum ma’ `/app/data` biex tippreserva d-database, iċ-ċwievet u l-konfigurazzjonijiet tiegħek bejn ir-restarts tal-container.
- **Konfigurazzjoni tal-Port:** Ibdel il-varjabbli tal-ambjent `PORT` biex tibdel il-port predefinit `20128`.

## Ara Wkoll

- [Gwida għall-Użu fuq VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Konfigurazzjoni ta’ VM + nginx + Cloudflare
- [Gwida għall-Użu fuq Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Uża fuq Fly.io
- [Konfigurazzjoni tal-Ambjent](../reference/ENVIRONMENT.md) — Referenza kompluta għal `.env`
