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

## Mexxi malajr

> **Self-host fi kmand wieħed?** Ara l- [Gwida ta' Self-Host](../getting-started/SELF_HOST_GUIDE.md) — `docker compose -f docker-compose.selfhost.yml up -d` (immaġni ppubblikata + Redis, loopback-only, l-ebda għażla ta' profil). Il-Quick Run hawn taħt hija l-mogħdija ta 'kontenitur wieħed għall-utenti li diġà jmexxu Redis x'imkien ieħor.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## Bil-Fajl tal-Ambjent

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

## Stadji Dockerfile

Ir-repożitorju jibgħat Dockerfile f'diversi stadji (`Dockerfile`). Erba 'stadji huma esposti; agħżel il- `target` it-tajjeb għall-każ tal-użu tiegħek.

| Stadju        | Immaġini bażi         | Għan                                                                                                                                                                                                                                                                                        |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Jinstalla deps (`npm ci --legacy-peer-deps`) u jmexxi `npm run build` (Turbopack b'mod awtomatiku — ara riżorsi tal-ħin tal-bini hawn taħt)                                                                                                                                                 |
| `runner-base` | `node:26-trixie-slim` | Runtime tal-produzzjoni bl-output standalone Next.js.** L-ebda fornitur CLIs magħqud.**                                                                                                                                                                                                     |
| `runner-cli`  | `runner-base`         | Żid `git`, `docker.io`, `docker-compose` u CLIs globali : `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`.** Agħżel dan għal flussi tax-xogħol aġenti.**                                                                                                                  |
| `runner-web`  | `runner-base`         | Iżid Playwright + browser Chromium (`--with-deps`) għal fornituri ta' sessjonijiet tal-web: `gemini-web`, `claude-web`, `claude-turnstile`.** Agħżel dan meta tuża dawk il-fornituri** — l-immaġini sempliċi tfalli fil-ħin tat-talba mingħajrha (ara n-nota `-web` taħt Release Channels). |

Ibni mira speċifika manwalment:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Riżorsi fil-ħin tal-bini

Tliet build args jikkontrollaw x tiswa l-istadju `builder`. Huma build-time biss — `OMNIROUTE_MEMORY_MB` (hawn taħt) huwa pum separat, runtime.

| Ibni arg                    | Default | Effett                                                                                              |
| --------------------------- | ------- | --------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`     | `0` jibni bil-webpack: memorja tal-quċċata aktar baxxa, aktar bil-mod. `1` jagħżel Turbopack.       |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`  | V8 heap ceiling (`--max-old-space-size`) għall - spawned `next build`.                              |
| `OMNIROUTE_BUILD_WORKERS`   | `2`     | Feeds `CIRCLE_NODE_TOTAL`; Sussegwentement joħroġ `workers = N - 1` għall-ġbir tad-dejta tal-paġna. |

`OMNIROUTE_BUILD_WORKERS` huwa dak li jqajjem fuq bennej kbir u dak li jissuspetta meta build kostrett imut** wara** `✓ Compiled successfully`. Kull ħaddiem tad-data tal-paġna huwa l-proċess tiegħu stess, u għalhekk huwa l-ġenitur `next build` innifsu; riproduzzjoni VPS ħaj (ħarġa #7518) imkejla l-ogħla RSS ta' kull proċess ~ 4.5 GB indipendenti mill-bandiera `NODE_OPTIONS` heap (Turbopack jikkompila fil-memorja native/Rust barra l-heap V8). Id-default ta ' `2` (→ 1 ħaddiem, 2 proċessi totali) huwa daqs is-16 GB / 4 vCPU runners ospitati minn GitHub li juża l-pipeline tal-pubblikazzjoni. `8` (→ 7 ħaddiema) dak ir-runner spiċċa bla memorja u buildkit falla l-pass bi `ResourceExhausted: ... cannot allocate memory`; `3` (→ 2 ħaddiema) xorta ma jaqbilx ladarba l- RSS għal kull proċess tkejjel direttament minflok dedott. `tests/unit/docker-build-memory-budget.test.ts` jagħmel l-aritmetika kontra l-figura mkejla u jonqos jekk xi pum jegħleb ir-runner.

Turbopack tiġbor fil-memorja Rust nattiva li tgħix** barra** il-borġ V8, għalhekk `OMNIROUTE_BUILD_MEMORY_MB` ma jorbotx. Fuq host b'limitu ta 'memorja l-bini huwa mbagħad SIGKILLed mill-qattiel OOM mingħajr l-ebda test ta' żball — sempliċement tieqaf f'nofs `Creating an optimized production build`, li jaqra bħal hang aktar milli barra mill-memorja. Huwa għalhekk li l- `Dockerfile` defaults għall-webpack (`OMNIROUTE_USE_TURBOPACK=0`), b'differenza `npm run dev` / `npm run build`, fejn Turbopack huwa l-inadempjenza tal-kodiċi: `docker build .` vojt mingħajr l-ebda build args (dak li jmexxu Railway u hosts oħra b'klikk waħda) m'għandux imut siekta fuq bennej b'limitu ta 'memorja. L-immaġini ppubblikati diġà jgħaddu `OMNIROUTE_USE_TURBOPACK=0` b'mod espliċitu `docker-publish.yml`. Fuq bennej b'ħafna RAM, agħżel Turbopack għal bini aktar mgħaġġel:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` huwa attivat, għalhekk `next build` imexxi ġenitur** u** proċess ħaddiem u kull jonora `OMNIROUTE_BUILD_MEMORY_MB` separatament. Daqs il-limitu tal-kontenitur 'il fuq bejn wieħed u ieħor darbtejn dak il-valur, mhux darba.

Imkejjel fuq din is-siġra (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Limitu tal-kontenitur | Riżultat                                  |
| --------- | --------------------- | ----------------------------------------- |
| Turbopack | 8 GiB / 16 GiB        | OOM-maqtula fit-tnejn, skiet              |
| webpack   | 8 GiB                 | build worker SIGKILLed                    |
| webpack   | 12 GiB                | irnexxielu, laħaq il-quċċata fil-11.1 GiB |

### Runtime defaults

Defaults esportati minn `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Imġieba tal-memorja Docker:

- L-immaġni tissettja `OMNIROUTE_MEMORY_MB=1024` u toħroġ `NODE_OPTIONS=--max-old-space-size=1024` minnha.
- Il-proċess tas-server attwali jinbeda mill-lanċjar waħdu, li jaqra `OMNIROUTE_MEMORY_MB` u jehmeż `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node juża l-aħħar valur `--max-old-space-size` ripetut, għalhekk l-issettjar `OMNIROUTE_MEMORY_MB` jikkontrolla l-limitu effettiv tal-borġ Docker.
- Minħabba li l-immaġini dejjem tissettjaha, il-backup kalibrat bir-RAM tal-lanċjar stess qatt ma japplika taħt Docker. Għolliha b'mod espliċitu għall-ammont ta' xogħol (tabella hawn taħt). `2048` għadu żgħir wisq għall-coding-agent `/v1/responses`.

### Runtime RAM għall-coding agents

Id-default 1 GiB Docker huwa art dashboard/light-chat, mhux daqs tal-produzzjoni. Korpi `POST /v1/responses` twal (mijiet ta 'messaġġi, għexieren ta' għodod) iżommu graffs multipli fil-memorja waqt il-kompressjoni. Żewġ talbiet ~ 3 MiB / ~ 750k-token li jikkoinċidu abortjaw V8 fi żmien** 12 GiB** old-space (`FATAL ERROR: Reached heap limit`) u tolqot ukoll 16 GiB cgroup OOM. Ara [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Daqs** cgroup `--memory` fuq il-borz** — buffers indiġeni, SQLite, u intermedji tal-kompressjoni joqogħdu barra V8.

| L-ammont ta' xogħol                                 | `OMNIROUTE_MEMORY_MB`     | Kontenitur / cgroup   | Noti                                                                                           |
| --------------------------------------------------- | ------------------------- | --------------------- | ---------------------------------------------------------------------------------------------- |
| Dashboard, chat dawl wieħed                         | `1024` (immaġini default) | ≥2 GiB                |                                                                                                |
| Aġent ta' kodifikazzjoni wieħed (Claude/Codex/Grok) | `8192`                    | ≥10 GiB               | `/v1/responses` tipiku ta' sessjoni wahda                                                      |
| Żewġ `/v1/responses` twal konkorrenti               | `10240`–`12288`           | ≥12–16 GiB            | Measured V8 abort at ~ 12 GiB heap                                                             |
| Tliet + kuntesti twal konkorrenti                   | ma fuq proċess wieħed     | serialize / aktar RAM | Ammissjoni default heavyweight hija 1 matul it-titjira; li jghollih bla RAM jintroduci l-abort |

`omniroute serve` fuq bare metal tikkalibra ~ 35% ta RAM (clamped `[512, 4096]`) meta `OMNIROUTE_MEMORY_MB` huwa** mitfija** . Docker dejjem jistabbilixxi `1024`, sabiex il-kalibrazzjoni qatt ma tmur fl-immaġni uffiċjali.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
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

Next.js `basePath` is compiled into the standalone bundle. OmniRoute records the baked value in a sentinel file at the app root (written during `npm run build`; read by `scripts/docker/ensure-docker-base-path.mjs`) and compares it with `OMNIROUTE_BASE_PATH` when the container starts. When they differ and the image was built for the domain root, the entrypoint rewrites the standalone manifests, the embedded `basePath`/`assetPrefix` literals (Next 16 renders SSR asset URLs from `assetPrefix` alone — the patcher mirrors the subpath into it), the baked `/_next/static` asset URLs (client-reference manifests, media imports, prerendered error pages) and the client `process.env` shim before `node dev/run-standalone.mjs` runs.

### Ikteb bini (rakkomandat)

Issettja ż-żewġ varjabbli `.env`, imbagħad ibni mill-ġdid sabiex l-immaġni u l-ħin tar-runtime jaqblu:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` jgħaddi `OMNIROUTE_BASE_PATH` bħala Docker build-arg u bħala varjabbli tal-ambjent runtime.

### Immaġini għerq mibnija minn qabel + runtime subpath

Immaġini `cheaperinference/omniroute:*` ppubblikati huma mibnija għall-għerq tad-dominju. Xorta tista' tissettja `OMNIROUTE_BASE_PATH` waqt ir-runtime; il-kontenitur irqajja l-qatta darba mal-istartjar. Għaqqadha mal-oriġini pubblika li tqabbel:

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Ikkonfigura r-reverse proxy biex tgħaddi l-** sħiħa** mogħdija esterna (tqaxxarx il-prefiss). Traefik għandu jgħaddi `PathPrefix(`/omniroute `)` lejn il-kontenitur mingħajr `StripPrefix`, għalhekk Next.js jirċievi `/omniroute/...` u jservi assi minn `/omniroute/_next/...`.

Il-kontroll tas-saħħa Docker jistħarreġ l-endpoint ħafif taċ-ċiklu tal-ħajja `/healthz` ipprefissat bl- `OMNIROUTE_BASE_PATH` attiv. `/api/monitoring/health` jibqa' disponibbli għad-dijanjostika human/dashboard ; biex tipponta l-kontenitur HEALTHCHECK lura lejh (pereżempju għal infurzar profond tas-saħħa), issettja `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Dik it-triq hija a** fond** iċċekkja ( sommarju tal-monitoraġġ DB + ) — xieraq għal `HEALTHCHECK` mhux frekwenti ta' Docker jekk tagħżel lura, iżda** le** għall-intervalli `livenessProbe` Kubernetes.

Għall-orkestraturi (Kubernetes, Nomad, eċċ.):

| Sonda           | Jippreferi                                                                    | Evita                                                      |
| --------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Ħajja           | HTTP `GET /livez`, jew TCP fuq il - port prinċipali (`PORT`, default `20128`) | `/api/monitoring/health` bhal hajja                        |
| Prontezza       | HTTP `GET /healthz`                                                           | Timeouts stretti li jittrattaw event-loop busy bħala mejta |
| Deep / blackbox | `/api/monitoring/health`                                                      | —                                                          |

`/healthz` jirrapporta ċiklu tal-ħajja tal-proċess (`ok` / `starting` / `stopping`). `/livez` huwa proċess-alive biss (200 kull meta l-handler jista 'jidħol; ma jistenna li jkun lest). It-tnejn għadhom jimxu fuq l-istess linja ta 'avvenimenti Node bħall-immaniġġjar tat-talbiet, għalhekk il-katalgu marbut mas-CPU jew ix-xogħol ta' kompressjoni jista 'jdewwemhom — busy ≠ dead. Ippreferi TCP liveness jekk HTTP sondi time out. Gwida sħiħa tas-sonda: [Gwida tal-monitoraġġ — Rakkomandazzjonijiet tas-sonda Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Ikkomponi ma' Caddy (HTTPS Auto-TLS)

OmniRoute jista 'jiġi espost b'mod sigur bl-użu ta' forniment awtomatiku ta ' SSL ta' Caddy. Kun żgur li r-rekord DNS A tad-dominju tiegħek jindika IP tas-server tiegħek.

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

Caddy jistabbilixxi l-headers standard tal-kunsinna għall-kontenitur upstream. OmniRoute juża `NEXT_PUBLIC_BASE_URL` bħala l-oriġini pubblika kanonika għal callbacks OAuth u links pubbliċi ġġenerati; kitbiet ta' dashboard awtentikati jużaw talbiet tal-istess oriġini flimkien ma' protezzjoni CSRF marbuta mas-sessjoni. Ippermetti `OMNIROUTE_TRUST_PROXY` biss għal skjeramenti avvanzati fejn intenzjonalment trid li OmniRoute joħroġ l-oriġini pubblika minn headers mgħoddija ta' fiduċja minflok konfigurazzjoni espliċita.

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

## Tikketti tal-Immaġni

| Immaġni                      | Tag      | Daqs    | Deskrizzjoni                                             |
| ---------------------------- | -------- | ------- | -------------------------------------------------------- |
| `cheaperinference/omniroute` | `latest` | ~ 250MB | L-ogħla** ippubblikat** SemVer stabbli (mhux git `main`) |
| `cheaperinference/omniroute` | `3.8.54` | ~ 250MB | Pin din il-klassi ta tag gall- GitOps                    |

L-istess immaġini huma ppubblikati fi tliet repożitorji, bl-istess diġesti għal kull arkitettura: `cheaperinference/omniroute` (Docker Hub, l-organizzazzjoni tal-Inferenza Cheaper, minn 3.8.53 'il quddiem), `ghcr.io/cheaper-inference/omniroute` u l-legacy `diegosouzapw/omniroute`, li żżomm l-istorja tal-ġibda tagħha u għadha tirċievi kull rilaxx. L-iskjeramenti eżistenti `diegosouzapw/omniroute` jibqgħu jaġġornaw; il-bidla tal-isem tal-immaġni hija fakultattiva. Il-kanal ta' qabel ir-rilaxx `:next` / `:next-web` hawn taħt huwa ppubblikat għal `diegosouzapw/omniroute` u GHCR biss.

Manifest multi-pjattaforma: `linux/amd64` + `linux/arm64` indiġeni (Apple Silicon, AWS Graviton, Raspberry Pi). Docker jagħżel l-arkitettura li tqabbel awtomatikament; jgħaddi `--platform linux/amd64` jekk għandek bżonn sfurza l-emulazzjoni AMD64 fuq hosts ARM.

### Rilaxx Kanali

OmniRoute tippubblika kanali Docker separati għal rilaxxi stabbli, ittestjar attiv tal-fergħa ta 'rilaxx, u bini ta' żvilupp.

| Kanal                           | Sors                                   | Mutabbiltà                           | Użu rakkomandat                                                                                                                      |
| ------------------------------- | -------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| `:<version>` / `:<version>-web` | Signed/versioned rilaxx                | Immutabbli                           | Skjeramenti tal-produzzjoni li pin rilaxx eżatt                                                                                      |
| `:latest` / `:latest-web`       | L-ogħla** ippubblikat** SemVer stabbli | Pointer stabbli mutevoli             | Isegwi rilaxxi stabbli** wara** a SemVer jippubblika xoghol — jaghmel** le** track `main` jew `release/v*` mhux rilaxxat jikkommetti |
| `:next` / `:next-web`           | Fergħa `release/v*` default kurrenti   | Pointer ta' qabel ir-rilaxx mutevoli | Ittestjar ta 'soluzzjonijiet li niżlu fuq il-fergħa ta' rilaxx attiv iżda għadhom mhumiex f'rilaxx stabbli                           |
| `:main` / `:main-web`           | fergħa `main`                          | Pointer ta 'żvilupp mutevoli         | Ittestjar ta' żvilupp u integrazzjoni biss                                                                                           |

#### Fornituri tas-sessjoni tal-web: l-immaġini `-web`

Kull kanal hawn fuq jirdoppja bħala tikketta `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), mibnija mill-istadju `runner-web` — l-istess immaġni flimkien ma Playwright u browser Chromium. L-immaġni sempliċi vapuri** mingħajr** Kromju; `gemini-web`, `claude-web` u `claude-turnstile` jeħtieġuha.

Il-falliment huwa differit, mhux ħin tal-istartjar: dawk il-fornituri jelenkaw il-mudelli tagħhom u juru bħala konnessi fid-dashboard, u l-ewwel talba biss tfalli.

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Jekk tuża dawk il-fornituri, iġbed it-tikketta `-web` tal-kanal li diġà qiegħed fuq — xejn aktar ma jinbidel. Fuq installazzjoni npm/CLI (l-ebda immaġni Docker ), il-biċċa ekwivalenti nieqsa hija l-binarju tal-browser: mexxi `npx playwright install chromium` fuq il-host.

#### Bl-użu tal-kanal ta 'qabel ir-rilaxx

Il-kanal `next` jinbena mill-ġdid fuq kull spinta lejn il-fergħa `release/v*` default attwali u huwa ppubblikat kemm għal AMD64 kif ukoll ARM64. Fergħat ta 'manutenzjoni anzjani ma jistgħux jissostitwixxuh. Il-kanal jipprovdi immaġni li tista 'tinġibed għal soluzzjonijiet li ngħaqdu fil-fergħa tar-rilaxx attiva qabel ma tinqata' t-tikketta stabbli li jmiss.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Għal Docker Compose, ibdel it-tikketta tal-immaġini użata mill-profil magħżul, imbagħad iġbed u oħloq mill-ġdid is-servizz:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Sigurtà u rollback

`next` huwa kanal floating qabel ir-rilaxx. Jista 'jinbidel fuq kwalunkwe push għall-fergħa ta' rilaxx attiv u huwa** mhux appoġġjat għall-użu fil-produzzjoni** . Pin id-diġest tal-immaġni waqt li tevalwa bini speċifiku:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Qabel l-ittestjar, agħmel backup tal-volum tad-dejta OmniRoute jew tad-direttorju tad-dejta immuntat fuq il-bind. Biex terġa 'lura, restawra l-verżjoni stabbli użata qabel jew iddiġerixxi u ħolqu mill-ġdid il-kontenitur:

```bash
docker pull cheaperinference/omniroute:<stable-version>
docker compose up -d
```

A release-branch build qatt ma tista tiċċaqlaq `latest`; verżjoni semantika stabbli eliġibbli biss tista' tippromwovi l-pointer stabbli. L-immaġini `next` iżommu l-ispezzjoni tal-immaġni tar-rilaxx u l-imblukkar tal-bieb tal-vulnerabbiltà KRITIKA.

**`latest` mhix garanzija tal-munita għal git.** Fixs magħquda fuq `main` jew fuq il-fergħa attiva `release/v*` huma** le** fi `:latest` sakemm tiġi ppubblikata immaġni SemVer stabbli u l-impjieg tal-pubblikazzjoni jippromwovi `:latest` (l-istess diġest bħal dak SemVer). Jekk `latest` jidher iffriżat waqt li GitHub diġà juri l-iffissar, iġbed `:next` biex tittestja l-fergħa tar-rilaxx jew stenna t-tikketta SemVer.

| Trid                                                                | Użu                                      |
| ------------------------------------------------------------------- | ---------------------------------------- |
| GitOps / produzzjoni li ma tridx drift                              | Pin `:X.Y.Z` (jew id-diġest tal-immaġni) |
| Segwi l-istalel ippubblikati u aċċetta rikreazzjoni fuq kull rilaxx | `:latest`                                |
| Test unreleased `release/v*` kommits                                | `:next` (mhux produzzjoni)               |
| Test `main`                                                         | `:main` (mhux produzzjoni)               |

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

## Skala-out: N proċessi indipendenti

### Codex token rotazzjoni sjieda

Kopji ta' kont Codex wieħed m'għandhomx jikkunsmaw b'mod indipendenti t-token ta' aġġornament ta' użu wieħed tiegħu. F'każijiet li jikkunsmaw biss kredenzjali sinkronizzati, issettja `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (alias `cx`). Ħalliha mhux issettjata fuq is-sid tar-rotazzjoni waħda. Kull proċess għadu jeħtieġ `DATA_DIR` tiegħu stess; din l-għażla la taqsam SQLite u lanqas tipprovdi sinkronizzazzjoni tat-tokens jew lock distribwit.

L-istanza passiva terġa’ taqra l-konnessjoni meta jkun hemm bżonn ta’ aġġornament u tadotta biss token ta’ aċċess differenti u mhux skadut. Inkella, l-aġġornament jiġi diżattivat mingħajr ma tiskadi jew tiġi diżattivata l-konnessjoni jew jingħaddu falliment ta' refresh-breaker. Fallimenti reali ta 'awtentikazzjoni upstream għadhom jużaw kontabilità ta' falliment normali, cooldown esponenzjali u l-iżball normali tal-klijent; id-diżattivazzjoni tal-kont tibqa' permanenti. Issinkronizza t-tokens imdawra tas-sid qabel ma jiskadu t-tokens tal-aċċess (il-ċomb ta' aġġornar proattiv default huwa ħames minuti), jew erġa' jimporta l-fajl ta' awtentikazzjoni Codex. L-importazzjonijiet passivi jaħżnu t-tokens forniti mingħajr ma jivvalidawhom fil-punt tat-tmiem tat-token. Manwal dashboard/API refresh jirritorna `409 refresh_disabled`; logins ġodda OAuth mhumiex mibdula. Ara [referenza dwar l-ambjent](../reference/ENVIRONMENT.md#passive-codex-token-refresh).

Wieħed proċess Node huwa** borġ wieħed V8** . Żewġ li jikkoinċidu ~ 3 MiB / ~ 750k-token coding-agent `POST /v1/responses` (RTK + Caveman ) abort dak il-borġ ~ 12 Gi (`FATAL ERROR: Reached heap limit`) u jistgħu OOM a 16 Gi cgroup. Ara [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Dak il-kejl huwa a** memorja-baġit** twissija, mhux prodott hard-max ta 'żewġ `/v1/responses` twal konkorrenti . Ammissjoni ta 'chat ta' piż tqil hija mgħaġġla minn baġit ta 'byte ta' inġest awto-derivat (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) imqassam minn dak l-istess limitu ta V8/cgroup — li jegħlebha 'l fuq (jew li jistabbilixxi l-limitu tal-għadd ta' rikjesti `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` tal-legat) fuq proċess li diġà d-daqs jerġa' jintroduċi l-abort. Chats żgħar, `/healthz`, `/v1/models`, u MCP huma** le** f'dak il-kap.

### Proċess wieħed: aktar minn żewġ `/v1/responses` twal

A** b'saħħithom** proċess (heap taħt `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, default `0.75`)** jista** mexxi aktar minn żewġ `POST /v1/responses` twal konkorrenti meta l-baġit tal-inflight-byte mal-proċess kollu (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) għad ikollu spazju. Korpi `OMNIROUTE_CHAT_LARGE_BODY_BYTES` jew 'il fuq (default 256 KiB) jieħdu l-istess kirja heavyweight bħat-talbiet ta' strutturi tqal u jużaw l-istess [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` escape (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Għexieren ta 'klijenti SSE twal konkorrenti (l-operaturi ħafna drabi jeħtieġu 40-50) huwa a** memorja-baġit** mistoqsija — daqs borġ + primary/headroom slots + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — mhux limitu iebes tal-prodott "max 2". Borġ taħt pressjoni għadu jitfa' `503` li jista' jerġa' jipprova sabiex #7849 ma jerġax lura.

Biex** immoltiplika munzelli** (spazji antiki V8 indipendenti)** illum** :

| Do                                                                                                                                                   | M'għandekx                                                     |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Mexxi** N containers/pods** , kull wieħed ma tiegħu** stess** `DATA_DIR` / volum                                                                     | Issettja `replicas > 1` kontra fajl SQLite wieħed              |
| Daqs tqil waqt it-titjira + healthy-headroom mill-budget tal-heap / inflight-byte; 1–2 huwa d-default konservattiv #7849, mhux prodott iebes massimu | Agħti proċess wieħed 8 × RAM u limitu tal-għadd bla limitu     |
| Fakultattiv: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` for** counters tal-kwota maqsuma**                                                 | Ittratta Redis bhala shared SQLite — mhux                      |
| Idduplika sigrieti tal-fornitur f'kull istanza (jew aċċetta dashboards maqsuma)                                                                      | Jistennew dashboard wieħed / call-log wieħed f'każijiet kollha |
| Quddiem bi kwalunkwe load balancer; sticky by API key jew sessjoni hija biżżejjed                                                                    | Jeħtieġu middleware speċifiku għall-bejjiegħ konxju tad-daqs   |

L-affinità bejn is-sessjoni u l-kont tista’ wkoll tiġi kondiviża permezz ta Redis: issettja `OMNIROUTE_SESSION_AFFINITY_STORE=redis` u `REDIS_URL` fuq kull proċess, bl-istess `REDIS_KEY_PREFIX` u setting `sessionAffinityTtlMs` pożittiv. Il-pinnijiet isolvu l-identitajiet tal-kont tal-użu bil-hashing għall-konnessjoni lokali eliġibbli ta' kull proċess, għalhekk il-kontijiet OAuth b'metadejta tal-identità li taqbel m'għandhomx għalfejn ikollhom konnessjoni li tqabbel IDs. L-identitajiet tal-kontijiet magħrufa jieħdu preċedenza fuq IDs lokali kontradittorji fir-riżoluzzjoni tal-pin u l-iżgumbrament mgħasses; rekords mingħajr identità (jew min iċempel iżgumbrament mingħajr identità) iżommu l-gwardja ID legata. Il-kontijiet mingħajr identità ta' użu stabbli għadhom jeħtieġu t-tqabbil ta IDs. Redis żbalji jew sejħiet li jaqbżu l-100 ms jaqgħu lura għal SQLite lokali. Kull maħżen ta 'affinità Redis jillimita operazzjonijiet pendenti fi 8, jevita Redis immedjatament meta jkun mimli, u jirrilaxxa slots biss meta x-xogħol sottostanti jissetilja, mhux fl-iskadenza ta' min iċempel. Waqt qtugħ ta' Redis m'hemm l-ebda verità kondiviża: kull istanza taqa' lura għall-affinità lokali tagħha stess, is-sessjonijiet jistgħu jerġgħu jimponu darba għal kull istanza, u l-istanzi jistgħu jvarjaw. It-twaħħil jerġa 'jikkonverġi permezz ta' Redis meta jirkupra. Il-timeout jillimita l-istennija, mhux EVAL mibgħut , li jista' jinżel wara fallback. Il-kitbiet tar-rotot iqabblu l-valur eżatt osservat mid-deċiżjoni tar-rotta, mhux qari frisk tal-ħin tal-mutazzjoni; miss osservat jew osservazzjoni fallback SQLite tqabbel bħala ċavetta Redis assenti. Labar skaduti huma sostitwiti CAS wieħed, għalhekk kmand tard ma jistax jissostitwixxi jew iħassar pin aktar ġdid u differenti. Redis jaqra atomikament jirritorna l-valur u server li jifdal TTL; PTTL pożittiv (jew l-ebda skadenza) jiddetermina l-ħajja, mhux it-timbru taż-żmien JSON tal-kittieb jew l-arloġġ tal-qarrej. Snapshots lokali mappa li fadal TTL għal skadenza lokali; iċ-ċwievet JSON eżistenti jibqgħu jinqraw u l-bytes mhux maħduma tagħhom jinżammu għal CAS. Redis huwa l-uniku sors ta 'verità filwaqt li jwieġeb. It-taqlib kondiviż ikkonfermat, tmiss u tħassar ineħħu l-entrata lokali, qatt ma tinstallaha jew aġġornaha. SQLite fuq il-mogħdija Redis iżomm biss id-deċiżjonijiet fallback ta 'din l-istanza stess minn żbalji Redis, timeouts jew saturazzjoni ta' ammissjoni, TTL-bounded bħal qabel. Pin lokali nieqes fuq qtugħ aktar tard jiswa għażla waħda ġdida (miss wieħed fil-pront-cache), mhux kont ħażin jew żgumbrat. Upserts miċħuda jirritornaw ir-rebbieħ kondiviż u TTL li jifdal tiegħu atomikament: għażla ordinarja tiċċekkja mill-ġdid l-iskadenza lokali mmappjata u tuża rebbieħ eliġibbli li għadu ħaj, li jmiss l-użu u l-illoggjar għal dak il-kont mingħajr kitba oħra kondiviża. Jekk ma tkunx disponibbli, l-għażla żżomm il-kandidat lokali, tħalli l-pin kondiviż mhux mibdula u temetti messaġġ wieħed ta' debug. Rejected CAS ma jiktebx SQLite; Żbalji Redis, timeouts jew saturazzjoni tad-dħul japplikaw l-operazzjoni lokali eżistenti minflok. Jekk it-tweġiba ta' mutazzjoni mibgħuta tasal wara timeout (aċċettata, miċħuda jew żball), paragun-u-delete ta' valur serializzat eżatt sinkroniku tneħħi biss ir-ringiela ta' riżerva ta' timeout identika għall-byte. M'hemm l-ebda stennija bejn dak il-paragun u t-tħassir; kitba ta' qtugħ aktar ġdid hija ppreservata. Żgumbrament mgħasses tneħħi l-pin lokali stess tal-kont fallut anke Redis l isfel, u jerġa' jnaddaf wara żgumbrament kondiviż ikkonfermat. Pendenti tweġibiet kondiviżi preċedenti ma jistgħux jirrestawraw pin lokali żgumbrat għaliex is-suċċessi kondiviżi qatt ma jiktbu SQLite. Fallback ta 'waqfien aktar tard jista' repin kont; kitba kondiviża aċċettata aktar tard teżisti biss Redis. Redis miss ma tikkonsultax l-istat lokali ta' riżerva. Bix-xufier mitfi, il-brilli li għadhom kif ġew magħżula jżommu l-forma SQLite JSON ta 'erba' kampijiet tal-legat; Redis routing biss iżid l-identità tal-kont hashed. Labar prefetched huma verifikati mill-ġdid fil-konfini ta 'skadenza tagħhom. Redis għażla mhux tal-kirja terġa’ taqra l-maħżen, iżda l-ippjanar tal-kera sinkroniku xorta jista’ juża pin żgumbrat bejn prefetch u ppjanar (tieqa tal-aħjar sforz aċċettata). Impenn ta' kiri ma jistax jaqleb il-kontijiet wara talba dejjiema: fuq upsert miċħud iżomm lill-kandidat mitlub għal dik it-talba biss u jħalli r-rebbieħ kondiviż mhux mimsus, għalhekk il-ftehim bejn l-istanzi huwa marbut fuq dik it-triq. Il-bqija tat-tabella għadha tapplika: dan ma jaqsamx it-twaħħil tas-sessjoni combo, pinnijiet nattivi Codex dawran, semafori tal-kontijiet, lockouts, limiti tal-infiq, konfigurazzjoni jew logs tas-sejħiet.

Ħardwer: `/v1/responses` twil konkorrenti għal kull istanza huwa a** memorja-baġit** mistoqsija (heap + inflight-byte / #10110). `N` indipendenti `DATA_DIR` s għadhom jimmultiplikaw munzelli: host RAM għandu jkopri `N × cgroup`, mhux "wieħed 16 Gi pod b'N = 8." Qatt `replicas > 1` fuq fajl SQLite wieħed.

Ikkomponi skeċċ (żewġ munzelli, żewġ volumi — mhux `deploy.replicas: 2`):

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

Id-densità fil-proċess (kompressjoni barra mill-iżolat HTTP ) hija [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Raggruppament loġiku wieħed fuq stat durabbli kondiviż huwa [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

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
