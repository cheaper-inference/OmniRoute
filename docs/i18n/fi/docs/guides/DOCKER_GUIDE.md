# 🐳 Docker Guide — OmniRoute (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Täydellinen Docker-käyttöönoton viiteopas. Pika-aloitusohjeet ovat [README-tiedoston Docker-osiossa](../README.md#-docker).

## Sisällysluettelo

- [Pikakäynnistys](#quick-run)
- [Ympäristötiedoston käyttäminen](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Käytettävissä olevat profiilit](#available-profiles)
- [Isäntäjärjestelmän CLI-työkalujen määrittäminen, kun OmniRoute toimii Dockerissa](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis-sivukontti](#redis-sidecar)
- [Tuotantokäytön Compose](#production-compose)
- [Dockerfile-vaiheet](#dockerfile-stages)
- [Kriittiset ympäristömuuttujat](#critical-environment-variables)
- [Docker Compose ja Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [Levykuvatunnisteet](#image-tags)
- [Hallintapaneelin päivitykset Dockerissa](#dashboard-updates-in-docker)
- [Saatavuus: oletusarvoinen SQLite tukee vain yhtä replikaa](#availability-default-sqlite-is-single-replica)
- [Geminin alueelliset virheet Dockerissa](#gemini-regional-errors-inside-docker)
- [Tärkeitä huomioita](#important-notes)

---

## Pikakäynnistys

> **Haluatko ottaa palvelun käyttöön omalla palvelimellasi yhdellä komennolla?** Katso
> [oman palvelimen käyttöönotto-opas](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (julkaistu levykuva +
> Redis, vain loopback-yhteydet, ei profiilin valintaa). Alla oleva Pikakäynnistys on
> yhden kontin vaihtoehto käyttäjille, joilla Redis on jo käynnissä muualla.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Ympäristötiedoston käyttäminen

```bash
# Kopioi .env ja muokkaa sitä ensin
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
# Perusprofiili (ei CLI-työkaluja)
docker compose --profile base up -d

# CLI-profiili (Claude Code, Codex ja OpenClaw sisäänrakennettuina)
docker compose --profile cli up -d

# Isäntäprofiili (ensisijaisesti Linuxille; liittää isäntäjärjestelmän CLI-binäärit vain luku -tilassa)
docker compose --profile host up -d

# Verkkoprofiili (Chromium/Playwright verkkoistuntoja käyttäville palveluntarjoajille)
docker compose --profile web up -d

# Yhdistä CLI ja CLIProxyAPI-sivukontti
docker compose --profile cli --profile cliproxyapi up -d
```

## Käytettävissä olevat profiilit

OmniRoute sisältää Compose-profiilit yleisimpiä käyttöönottotapoja varten. Valitse ympäristöösi sopiva profiili.

| Profiili        | Palvelu          | Käyttötilanne                                                                                                                                                                  | Komento                                      |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `base` (oletus) | `omniroute-base` | Graafisetta käyttöliittymää käyttämätön palvelin / minimaalinen ajoympäristö, ei sisällytettyjä palveluntarjoajien CLI-työkaluja                                               | `docker compose --profile base up -d`        |
| `cli`           | `omniroute-cli`  | Agenttipohjaiset työnkulut, jotka kutsuvat komentoja `omniroute providers/setup/doctor` ja sisällytettyjä CLI-työkaluja (Codex, Claude Code, Droid, OpenClaw)                  | `docker compose --profile cli up -d`         |
| `host`          | `omniroute-host` | Linux-isännät, jotka haluavat `network_mode`-tyyppisen pääsyn isännän CLI-työkaluihin liittämällä `~/.local/bin`-, `~/.codex`-, `~/.claude`-hakemistot jne. vain luku -tilassa | `docker compose --profile host up -d`        |
| `cliproxyapi`   | `cliproxyapi`    | Suorita [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)-sivukontti portissa `8317` ylätason CLI-välitystä varten                                                   | `docker compose --profile cliproxyapi up -d` |
| `web`           | `omniroute-web`  | Selainta tarvitsevat verkkoistuntopalveluntarjoajat: `gemini-web`, `claude-web`, `claude-turnstile` (koostaa `runner-web`-vaiheen, Chromium sisältyy)                          | `docker compose --profile web up -d`         |

> Useita profiileja voi yhdistää: `docker compose --profile cli --profile cliproxyapi up -d`.

## Isäntäkoneen CLI-työkalujen määrittäminen, kun OmniRoute toimii Dockerissa

`omniroute setup-codex`, `setup-claude`, `config set <tool>` ja hallintapaneelin
**Tallenna määritykset** -painike kirjoittavat tiedostoja, kuten `~/.codex/*.config.toml`. Näillä poluilla
on merkitystä vain koneessa, jossa CLI:tä käytetään. Jos komennot suoritetaan
säilön sisällä, tiedostot kirjoitetaan säilön omaan kotihakemistoon (`/home/node` —
levykuva käyttää määritystä `USER node`), josta yksikään isäntäkoneen CLI ei lue niitä ja jonka sisältö
hävitetään heti, kun säilö luodaan uudelleen.

OmniRoute tunnistaa tämän ja kieltäytyy kirjoittamasta antaen sen sijaan ohjeet,
eikä ilmoita onnistumisesta, jota et voisi hyödyntää: CLI palauttaa lopetuskoodin `2`, ja API vastaa koodilla `422`
sekä arvolla `containerEphemeralTarget: true`.

### Suositus: suorita CLI isäntäkoneessa ja OmniRoute Dockerissa

Säilö tarjoaa API:n; CLI määrittää isäntäkoneesi työkalut.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # ohjaa CLI käyttämään säilöä
omniroute setup-codex                      # kirjoittaa isäntäkoneesi oikeaan ~/.codex-hakemistoon
```

Tämä on oikea valinta, kun Codex, Claude Code, Cursor tai vastaava toimii
kannettavallasi — kuten tavallisesti.

### Vaihtoehto: liitä isäntäkoneen määrityshakemistot bind-liitoksina (`host`-profiili)

Jos haluat säilön kirjoittavan isäntäkoneesi määrityksiä, liitä
hakemistot säilöön ja aseta `CLI_CONFIG_HOME` osoittamaan liitoksen juurihakemistoon. `host`-profiili
tekee tämän valmiiksi:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Bind-liitos tekee polusta luotettavan: OmniRoute lukee tiedoston
`/proc/self/mountinfo` ja sallii kirjoittamisen liitettyihin polkuihin (sekä hakemistoihin,
joiden alihakemistot ovat liitoksia, kuten yllä oleva `/host-home`-rakenne), mutta
kieltäytyy edelleen kirjoittamasta liittämättömiin polkuihin.

### Poikkeusratkaisu: määritä säilön omat CLI:t (käytä harkiten)

Kun CLI:t todella sijaitsevat säilön sisällä (`cli`-profiili), kirjoittaminen
on tarkoituksellista. Anna valitsin `--allow-container-write` mille tahansa `setup-*`-komennolle tai aseta
palvelimelle `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true`. Kirjoitus suoritetaan
varoittaen, ettei se säily säilön uudelleenluonnin jälkeen.

> **Tietoturvavaroitus — `cli`-profiili + `docker.sock`-liitos.**
> `cli`-profiili liittää `/var/run/docker.sock`-tiedoston bind-liitoksena, jotta säilön sisäinen
> automaattinen päivitystoiminto voi luoda pinon uudelleen isäntäkoneen taustapalvelun kautta
> (`src/lib/system/autoUpdate.ts` tarkistaa kyseisen socketin ja ohittaa
> Docker-polun, kun sitä ei ole). Kyseinen socket on **isäntäkoneen root-tason luottamusraja**:
> mikä tahansa siihen yhteyden saava voi ohjata isäntäkoneen Docker-taustapalvelua
> root-oikeuksilla — se voi luoda, tarkastella, pysäyttää ja poistaa minkä tahansa isäntäkoneen säilön.
> Seuraukset:
>
> 1. **Älä koskaan avaa `cli`-profiilin porttia verkkoon.** Julkaise
>    se osoitteessa `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — lähiverkosta saavutettava `cli`-profiili muuttaa minkä tahansa hallintapaneelitason koodin etäsuoritushaavoittuvuuden
>    isäntäkoneen täydelliseksi vaarantumiseksi.
> 2. **Älä liitä ylimääräisiä isäntäkoneen hakemistoja `cli`-profiiliin.**
>    Docker-socket yhdessä minkä tahansa muun liitoksen kanssa antaa säilölle täydet
>    luku- ja kirjoitusoikeudet tiedostojärjestelmääsi ja isäntäkoneesi määrityksiin. Jos työkalun on
>    päästävä käsiksi projektiin, suorita se paikallisesti CLI-binäärillä — älä liitä projektia
>    `cli`-säilöön.
>
> Jos et tarvitse säilön sisäistä automaattista päivitystä, jätä `cli`-profiili pois käytöstä
> (`COMPOSE_PROFILES=core,redis` tai lyhyempi arvo). Muut profiilit eivät
> liitä Docker-socketia.
>
> Katso aiheeseen liittyvä MITM-uhkamalli tiedostosta `docs/security/MITM-TPROXY-DECRYPT.md` (gitissä; ei käännetä osaksi `/docs`-hakemistoa)
> sekä `codex`/`claude-code`/`droid`/`openclaw`-binäärien alkuperäketju
> tiedostosta `docs/security/SUPPLY_CHAIN.md`.

## Redis-sivuvaunu

OmniRoute käyttää Redisiä hajautetun nopeusrajoittimen ja jaetun välimuistin taustajärjestelmänä. `redis`-palvelu on **aina määritetty** tiedostossa `docker-compose.yml` (sillä ei ole profiilirajoitusta), ja se käynnistyy minkä tahansa muun profiilin rinnalla.

| Tieto                  | Arvo                                       |
| ---------------------- | ------------------------------------------ |
| Levykuva               | `redis:7-alpine`                           |
| Säilön nimi            | `omniroute-redis`                          |
| Sisäinen portti        | `6379`                                     |
| Isäntäportti (ohitus)  | `REDIS_PORT` (oletuksena `6379`)           |
| Isäntäsidonta (ohitus) | `REDIS_BIND_HOST` (oletuksena `127.0.0.1`) |
| Taltio                 | `omniroute-redis-data` → `/data`           |
| Terveystarkistus       | `redis-cli ping` (10 s:n välein)           |

Liittyvät ympäristömuuttujat:

- `REDIS_URL` — sovellukseen syötettävä yhteysmerkkijono (oletuksena `redis://redis:6379`).
- `REDIS_PORT` — Redis-säilön isäntäpuolen porttimääritys.
- `REDIS_BIND_HOST` — isäntäverkkoliitäntä, jossa portti julkaistaan. Oletuksena `127.0.0.1`.

> **Miksi oletuksena loopback:** sivuvaunu suoritetaan ilman `requirepass`-asetusta, ja sovellussäilöt
> käyttävät sitä compose-verkon kautta (`redis:6379`) — julkaistu portti on tarkoitettu
> vain isäntäpuolen työkaluille (`redis-cli`, paikallinen `npm run dev`). Julkaiseminen osoitteessa
> `0.0.0.0` altistaisi todentamattoman Redis-palvelimen kaikille lähiverkkosi laitteille. Jos asetat
> `REDIS_BIND_HOST=0.0.0.0`, lisää myös `--requirepass` palvelun `command:`-määritykseen.

**Redisin poistamista käytöstä** ei suositella (nopeusrajoitin siirtyy käyttämään heikompaa muistinsisäistä vararatkaisua). Jos se on välttämätöntä, poista `redis:`-palvelulohko tiedostosta `docker-compose.yml`, kommentoi se pois tai skaalaa palvelu nollaan:

```bash
docker compose up -d --scale redis=0
```

## Tuotannon Compose

Jos haluat käyttää erillistä tuotantovedosta kehitysympäristön rinnalla, käytä tiedostoa `docker-compose.prod.yml`.

| Tieto                         | Arvo                                                                                   |
| ----------------------------- | -------------------------------------------------------------------------------------- |
| Tiedosto                      | `docker-compose.prod.yml`                                                              |
| Hallintapaneelin oletusportti | `PROD_DASHBOARD_PORT=20130` (yhdistetty sisäiseen `${DASHBOARD_PORT:-20128}`-porttiin) |
| API:n oletusportti            | `PROD_API_PORT=20131`                                                                  |
| Levykuva                      | `omniroute:prod` (koostettu `runner-cli`-kohteesta)                                    |
| Redis-säilö                   | `omniroute-redis-prod` (`redis:8.6.2`, erillinen `redis-prod-data`-taltio)             |
| Datataltio                    | `omniroute-prod-data` (nimetty, säilyy uudelleenkoostamisten välillä)                  |
| Terveystarkistukset           | `node healthcheck.mjs` + `redis-cli ping`; `depends_on` odottaa Redisin olevan terve   |

Käyttö:

```bash
# Koosta ja käynnistä tuotantopino
docker compose -f docker-compose.prod.yml up -d --build

# Seuraa lokeja
docker compose -f docker-compose.prod.yml logs -f

# Pysäytä ja poista pino (säilytä taltiot)
docker compose -f docker-compose.prod.yml down
```

Tuotantopino toimii rinnakkain kehitysympäristön compose-pinon kanssa (eri säilöjen nimet, portit ja taltiot), joten voit jatkaa paikallista kehitystä tuotantoympäristön pysyessä käynnissä.

## Dockerfile-vaiheet

Tietovarasto sisältää monivaiheisen Dockerfile-tiedoston (`Dockerfile`). Käytettävissä on neljä vaihetta; valitse käyttötarkoitukseesi sopiva `target`.

| Vaihe         | Perusimage            | Tarkoitus                                                                                                                                                                                                                                                                                                                |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `builder`     | `node:26-trixie-slim` | Asentaa riippuvuudet (`npm ci --legacy-peer-deps`) ja suorittaa komennon `npm run build` (oletuksena Turbopack — katso alta Koontiaikaiset resurssit)                                                                                                                                                                    |
| `runner-base` | `node:26-trixie-slim` | Tuotantoajoympäristö, joka sisältää Next.js:n itsenäisen tulosteen. **Palveluntarjoajien CLI-työkaluja ei sisällytetä.**                                                                                                                                                                                                 |
| `runner-cli`  | `runner-base`         | Lisää paketit `git`, `docker.io`, `docker-compose` sekä globaalit CLI-työkalut: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Valitse tämä agenttipohjaisiin työnkulkuihin.**                                                                                                                     |
| `runner-web`  | `runner-base`         | Lisää Playwrightin ja Chromium-selaimen (`--with-deps`) verkkoistuntopalveluntarjoajia varten: `gemini-web`, `claude-web`, `claude-turnstile`. **Valitse tämä käyttäessäsi kyseisiä palveluntarjoajia** — tavallinen image epäonnistuu pyyntöä käsiteltäessä ilman sitä (katso Julkaisukanavat-kohdan `-web`-huomautus). |

Koosta tietty kohde manuaalisesti:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Koontiaikaiset resurssit

Kolme koontiargumenttia määrittää `builder`-vaiheen resurssikustannukset. Ne koskevat vain koontiaikaa —
`OMNIROUTE_MEMORY_MB` (alla) on erillinen ajonaikainen säätö.

| Koontiargumentti            | Oletus | Vaikutus                                                                                                     |
| --------------------------- | ------ | ------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_USE_TURBOPACK`   | `0`    | `0` koostaa webpackilla: pienempi muistin huippukäyttö, mutta hitaampi. `1` ottaa Turbopackin käyttöön.      |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144` | Käynnistetyn `next build` -prosessin V8-keon yläraja (`--max-old-space-size`).                               |
| `OMNIROUTE_BUILD_WORKERS`   | `2`    | Syöttää arvon muuttujalle `CIRCLE_NODE_TOTAL`; Next johtaa sivutietojen keräämiseen arvon `workers = N - 1`. |

`OMNIROUTE_BUILD_WORKERS` on asetus, jota kannattaa kasvattaa tehokkaassa koontiympäristössä ja
epäillä silloin, kun rajallisilla resursseilla tehtävä koonti keskeytyy **kohdan** `✓ Compiled successfully` **jälkeen**. Jokainen
sivutietojen käsittelijä on oma prosessinsa, samoin kuin ylätason `next build`;
VPS-ympäristössä tehty toisto (ongelma #7518) mittasi kunkin prosessin RSS-muistin huippukäytöksi
~4,5 Gt riippumatta `NODE_OPTIONS`-kekomääritteestä (Turbopack koostaa
V8-keon ulkopuolisessa natiivissa/Rust-muistissa). Oletusarvo `2` (→ 1 käsittelijä, yhteensä 2
prosessia) on mitoitettu julkaisuprosessin käyttämiä GitHubin ylläpitämiä
16 Gt:n / 4 vCPU:n suorittimia varten. Arvolla `8` (→ 7 käsittelijää) kyseisen suorittimen muisti loppui, ja
buildkit keskeytti vaiheen virheeseen `ResourceExhausted: ... cannot allocate memory`;
edes `3` (→ 2 käsittelijää) ei mahtunut muistiin, kun prosessikohtainen RSS mitattiin
suoraan päättelemisen sijaan. `tests/unit/docker-build-memory-budget.test.ts`
tekee laskelmat mitattua arvoa vasten ja epäonnistuu, jos jompikumpi säätö
ylittää suorittimen kapasiteetin.

Turbopack koostaa V8-keon **ulkopuolella** sijaitsevassa natiivissa Rust-muistissa, joten
`OMNIROUTE_BUILD_MEMORY_MB` ei rajoita sitä. Muistirajoitetulla isäntäkoneella
OOM-lopettaja keskeyttää koonnin tällöin SIGKILL-signaalilla ilman minkäänlaista virhetekstiä — se vain
pysähtyy kesken `Creating an optimized production build` -vaiheen, mikä vaikuttaa pikemminkin
jumittumiselta kuin muistin loppumiselta. Tämän vuoksi `Dockerfile` käyttää oletuksena webpackia
(`OMNIROUTE_USE_TURBOPACK=0`), toisin kuin `npm run dev` / `npm run build`, joissa
Turbopack on koodin oletusvalinta: pelkkä `docker build .` ilman koontiargumentteja (kuten
Railway ja muut yhden napsautuksen isännöintipalvelut suorittavat) ei saa keskeytyä hiljaisesti
muistirajoitetussa koontiympäristössä. Julkaistut imaget välittävät jo asetuksen `OMNIROUTE_USE_TURBOPACK=0`
eksplisiittisesti tiedostossa `docker-publish.yml`. Jos koontiympäristössä on runsaasti RAM-muistia, ota
Turbopack käyttöön nopeampaa koontia varten:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` on käytössä, joten `next build` suorittaa sekä ylätason prosessin **että** käsittelijäprosessin,
ja kumpikin noudattaa `OMNIROUTE_BUILD_MEMORY_MB`-arvoa erikseen. Mitoita säilön
raja suunnilleen kaksinkertaiseksi kyseiseen arvoon nähden, älä yksinkertaiseksi.

Tässä lähdekoodipuussa mitatut tulokset (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Niputtaja | Säilön raja    | Tulos                                 |
| --------- | -------------- | ------------------------------------- |
| Turbopack | 8 GiB / 16 GiB | OOM-lopetettu molemmilla, hiljaisesti |
| webpack   | 8 GiB          | koontikäsittelijä SIGKILL-lopetettiin |
| webpack   | 12 GiB         | onnistui, huippukäyttö 11,1 GiB       |

### Ajonaikaiset oletukset

`runner-base`-vaiheen viemät oletusarvot: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Muistin toiminta Dockerissa:

- Levykuva asettaa arvon `OMNIROUTE_MEMORY_MB=1024` ja johtaa siitä arvon `NODE_OPTIONS=--max-old-space-size=1024`.
- Varsinaisen palvelinprosessin käynnistää erillinen käynnistysohjelma, joka lukee muuttujan `OMNIROUTE_MEMORY_MB` ja lisää valitsimen `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node käyttää viimeistä toistettua `--max-old-space-size`-arvoa, joten `OMNIROUTE_MEMORY_MB` määrittää Dockerin tosiasiallisen kekomuistirajan.
- Koska levykuva asettaa sen aina, käynnistysohjelman oma RAM-muistin mukaan kalibroitu varajärjestely ei koskaan tule käyttöön Dockerissa. Suurenna arvoa nimenomaisesti työkuorman mukaan (katso alla oleva taulukko). `2048` on edelleen liian pieni koodausagenttien `/v1/responses`-pyynnöille.

### Koodausagenttien ajonaikainen RAM-muisti

Dockerin 1 GiB:n oletusarvo on hallintapaneelin ja kevyen keskustelun vähimmäistaso, ei tuotantokäyttöön sopiva koko. Pitkät `POST /v1/responses` -pyyntörungot (satoja viestejä, kymmeniä työkaluja) säilyttävät pakkauksen aikana muistissa useita graafeja. Kaksi päällekkäistä, kooltaan noin 3 MiB:n / 750 000 tokenin pyyntöä ovat keskeyttäneet V8:n **12 GiB:n** old space -kekomuistilla (`FATAL ERROR: Reached heap limit`) ja myös aiheuttaneet cgroupin OOM-tilanteen 16 GiB:n muistilla. Katso [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Mitoita **cgroupin `--memory` kekomuistia suuremmaksi** — natiivipuskurit, SQLite ja pakkauksen välitulokset sijaitsevat V8:n ulkopuolella.

| Työkuorma                                          | `OMNIROUTE_MEMORY_MB`       | Kontti / cgroup                 | Huomautukset                                                                                                                     |
| -------------------------------------------------- | --------------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Hallintapaneeli, yksi kevyt keskustelu             | `1024` (levykuvan oletus)   | ≥2 GiB                          |                                                                                                                                  |
| Yksi koodausagentti (Claude/Codex/Grok)            | `8192`                      | ≥10 GiB                         | Tyypillinen yhden istunnon `/v1/responses`                                                                                       |
| Kaksi samanaikaista pitkää `/v1/responses`-pyyntöä | `10240`–`12288`             | ≥12–16 GiB                      | Mitattu V8:n keskeytys noin 12 GiB:n kekomuistilla                                                                               |
| Vähintään kolme samanaikaista pitkää kontekstia    | älä aja yhdessä prosessissa | sarjallista / lisää RAM-muistia | Raskaiden pyyntöjen oletusrajoitus on yksi käsiteltävä pyyntö; sen nostaminen ilman lisämuistia aiheuttaa keskeytyksen uudelleen |

`omniroute serve` kalibroi ilman Dockeria käytettäessä arvoksi noin 35 % RAM-muistista (rajattuna välille `[512, 4096]`), kun `OMNIROUTE_MEMORY_MB` on **asettamatta**. Docker asettaa arvoksi aina `1024`, joten kalibrointia ei koskaan suoriteta virallisessa levykuvassa.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Kriittiset ympäristömuuttujat

Tiedostossa [ENVIRONMENT.md](../reference/ENVIRONMENT.md) dokumentoitujen oletusarvojen lisäksi seuraavat muuttujat ovat tärkeimpiä Docker-ympäristössä:

| Muuttuja                      | Tarkoitus                                                                                                                                                                                                                                                                                                             | Oletusarvo                 |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket-sillan jaettu salaisuus. **Pakollinen tuotannossa** — aseta arvoksi vahva satunnainen merkkijono.                                                                                                                                                                                                           | ei asetettu (on annettava) |
| `REDIS_URL`                   | Nopeusrajoittimen / välimuistin taustajärjestelmän yhteysmerkkijono                                                                                                                                                                                                                                                   | `redis://redis:6379`       |
| `REDIS_PORT`                  | Isäntäpuolen portti mukana toimitetulle Redis-säilölle                                                                                                                                                                                                                                                                | `6379`                     |
| `REDIS_BIND_HOST`             | Isäntärajapinta, jossa mukana toimitetun Redis-säilön portti julkaistaan (loopback, ellet lisää AUTH-todennusta)                                                                                                                                                                                                      | `127.0.0.1`                |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Isäntäpolku, joka liitetään `cli`-profiilissa polkuun `/workspace/omniroute` itsepäivityksen työnkulkuja varten                                                                                                                                                                                                       | `.` (nykyinen hakemisto)   |
| `OMNIROUTE_MEMORY_MB`         | Dockerin itsenäisen palvelimen Node-keon enimmäiskoko ajon aikana; ohittaa yllä olevan levykuvan oletusarvon. Koodausagentit: `8192`+ (katso [ajonaikainen RAM-muisti](#runtime-ram-for-coding-agents)).                                                                                                              | `1024`                     |
| `DASHBOARD_PORT` / `API_PORT` | Ohittaa hallintapaneelin (20128) ja API:n (20129) julkaistut portit                                                                                                                                                                                                                                                   | `20128` / `20129`          |
| `APP_BIND_HOST`               | Isäntärajapinta, jossa docker-compose julkaisee hallintapaneelin, API:n ja reaaliaikaisen WebSocketin portit. Kun `REQUIRE_API_KEY=false` (oletus), `0.0.0.0` altistaa anonyymin `/v1`-välityspalvelimen lähiverkolle — laajenna kuuntelua vain, kun `REQUIRE_API_KEY=true` tai edessä on käänteinen välityspalvelin. | `127.0.0.1`                |
| `CLIPROXY_BIND_HOST`          | Isäntärajapinta, jossa docker-compose julkaisee `cliproxyapi`-sivusäilön — sen datataltion sisältämät palveluntarjoajan tunnistetiedot.                                                                                                                                                                               | `127.0.0.1`                |
| `OMNIROUTE_PLUGINS_DIR`       | Hakemisto, jota ajonaikainen liitännäisskanneri lukee ja johon se asentaa liitännäiset. Aseta se, kun liitännäiset liitetään bind-mountilla: oletusarvo seuraa `HOME`-muuttujaa, jota levykuvan ei tarvitse viedä ympäristöön.                                                                                        | `~/.omniroute/plugins`     |
| `OMNIROUTE_BASE_PATH`         | URL-alipolku, kun sovellus julkaistaan käänteisen välityspalvelimen takana (esim. `/omniroute`)                                                                                                                                                                                                                       | _(tyhjä = juuri)_          |
| `NEXT_PUBLIC_BASE_URL`        | Julkinen selainlähtöosoite alipolkuineen (esim. `https://host/omniroute`)                                                                                                                                                                                                                                             | ei asetettu                |
| `PROD_DASHBOARD_PORT`         | Isäntäpuolen hallintapaneeliportti tiedostolle `docker-compose.prod.yml`                                                                                                                                                                                                                                              | `20130`                    |
| `CLIPROXYAPI_PORT`            | Isäntäpuolen portti `cliproxyapi`-sivusäilölle                                                                                                                                                                                                                                                                        | `8317`                     |

## Käänteinen välityspalvelin alipolussa (Traefik / nginx)

Next.jsin `basePath` käännetään osaksi standalone-pakettia. OmniRoute tallentaa
sisällytetyn arvon sovelluksen juuressa olevaan valvontatiedostoon (kirjoitetaan komennon
`npm run build` aikana; luetaan tiedostolla `scripts/docker/ensure-docker-base-path.mjs`)
ja vertaa sitä arvoon `OMNIROUTE_BASE_PATH`, kun säilö käynnistyy. Kun arvot eroavat
toisistaan ja näköistiedosto on koostettu toimialueen juuripolkua varten, käynnistyspiste
kirjoittaa uudelleen standalone-manifestit, upotetut `basePath`/`assetPrefix`-literaalit
(Next 16 muodostaa SSR-resurssien URL-osoitteet pelkästään `assetPrefix`-arvosta —
korjaustoiminto kopioi alipolun siihen), sisällytetyt `/_next/static`-resurssien
URL-osoitteet (asiakasviittausten manifestit, mediatiedostojen tuonnit, esirenderöidyt
virhesivut) sekä asiakkaan `process.env`-sovitteen ennen kuin
`node dev/run-standalone.mjs` suoritetaan.

### Koostaminen Composella (suositus)

Aseta molemmat muuttujat `.env`-tiedostossa ja koosta sitten uudelleen, jotta
näköistiedoston ja suoritusympäristön asetukset vastaavat toisiaan:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` välittää muuttujan `OMNIROUTE_BASE_PATH` Dockerin
koostamisargumenttina ja suoritusympäristön ympäristömuuttujana.

### Valmiiksi koostettu juurinäköistiedosto + suoritusympäristön alipolku

Julkaistut `diegosouzapw/omniroute:*`-näköistiedostot on koostettu toimialueen
juuripolkua varten. Voit silti asettaa muuttujan `OMNIROUTE_BASE_PATH`
suoritusympäristössä; säilö korjaa paketin kerran käynnistyksen yhteydessä. Käytä sen
kanssa vastaavaa julkista alkuperää:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Määritä käänteinen välityspalvelin välittämään **koko** ulkoinen polku (älä poista
etuliitettä). Traefikin tulee reitittää `PathPrefix(`/omniroute`)` säilöön ilman
`StripPrefix`-toimintoa, jotta Next.js vastaanottaa polun `/omniroute/...` ja tarjoaa
resurssit polusta `/omniroute/_next/...`.

Dockerin kuntotarkistus käyttää kevyttä `/healthz`-elinkaaripäätepistettä, jonka
etuliitteenä on aktiivinen `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` on edelleen
käytettävissä ihmisten ja koontinäyttöjen diagnostiikkaan. Jos haluat ohjata säilön
HEALTHCHECK-tarkistuksen takaisin siihen (esimerkiksi perusteellista kunnon valvontaa
varten), aseta `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Tämä polku suorittaa
**perusteellisen** tarkistuksen (tietokanta + valvonnan yhteenveto) — se sopii Dockerin
harvoin suoritettavaan `HEALTHCHECK`-tarkistukseen, jos päätät ottaa sen uudelleen
käyttöön, mutta **ei** Kubernetesin `livenessProbe`-tarkistusten aikaväleille.

Orkestrointijärjestelmille (Kubernetes, Nomad jne.):

| Tarkistus                 | Suosi                                                          | Vältä                                                                                |
| ------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Elossaolo                 | HTTP `GET /livez` tai TCP pääportissa (`PORT`, oletus `20128`) | `/api/monitoring/health` elossaolotarkistuksena                                      |
| Valmius                   | HTTP `GET /healthz`                                            | Tiukkoja aikakatkaisuja, jotka tulkitsevat tapahtumasilmukan kiireisyyden kuolemaksi |
| Perusteellinen / blackbox | `/api/monitoring/health`                                       | —                                                                                    |

`/healthz` ilmoittaa prosessin elinkaaren tilan (`ok` / `starting` / `stopping`).
`/livez` tarkistaa vain, että prosessi on elossa (200 aina, kun käsittelijä voidaan
suorittaa; se ei odota valmiutta). Molemmat suoritetaan silti samassa Noden
tapahtumasilmukassa kuin pyyntöjen käsittely, joten suoritinta kuormittava
luettelo- tai pakkaustyö voi viivästyttää niitä — kiireinen ≠ kuollut. Suosi
TCP-elossaolotarkistusta, jos HTTP-tarkistukset aikakatkaistaan. Täydelliset
tarkistusohjeet:
[Valvontaopas — Kubernetes-tarkistusten suositukset](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose ja Caddy (automaattinen HTTPS/TLS)

OmniRoute voidaan julkaista turvallisesti Caddyn automaattisen SSL-varmenteiden käyttöönoton avulla. Varmista, että verkkotunnuksesi DNS:n A-tietue osoittaa palvelimesi IP-osoitteeseen.

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
      # Selaimelle näkyvä alkuperä OAuth-paluuosoitteita, hallintapaneelin linkkejä ja luotuja julkisia URL-osoitteita varten.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Sisäinen palvelinten välinen URL-osoite ajastettuja töitä ja palvelun omia pyyntöjä varten.
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

Caddy asettaa vakiomuotoiset edelleenlähetysotsakkeet taustalla olevalle säilölle. OmniRoute käyttää
`NEXT_PUBLIC_BASE_URL`-arvoa ensisijaisena julkisena alkuperänä OAuth-paluuosoitteille ja luoduille julkisille
linkeille. Todennetut hallintapaneelin kirjoituspyynnöt käyttävät saman alkuperän pyyntöjä sekä istuntoon sidottua CSRF-
suojausta. Ota `OMNIROUTE_TRUST_PROXY` käyttöön vain edistyneissä käyttöönotoissa, joissa haluat tarkoituksella
OmniRouten päättelevän julkisen alkuperän luotetuista edelleenlähetysotsakkeista eksplisiittisen
määrityksen sijaan.

## Cloudflare Quick Tunnel

Docker-käyttöönottojen hallintapaneelituki sisältää yhdellä napsautuksella käyttöönotettavan **Cloudflare Quick Tunnel** -toiminnon kohdassa `Dashboard → Endpoints`. Ensimmäisellä käyttöönotolla `cloudflared` ladataan vain tarvittaessa, nykyiseen `/v1`-päätepisteeseesi käynnistetään väliaikainen tunneli ja luotu `https://*.trycloudflare.com/v1`-URL-osoite näytetään suoraan tavallisen julkisen URL-osoitteesi alapuolella.

Päätepisteiden tunnelipaneelit (Cloudflare, Tailscale, ngrok) voidaan näyttää tai piilottaa kohdasta `Settings → Appearance` muuttamatta aktiivisen tunnelin tilaa.

### Tunnelia koskevat huomautukset

- Quick Tunnel -URL-osoitteet ovat väliaikaisia ja vaihtuvat jokaisen uudelleenkäynnistyksen jälkeen.
- Quick Tunnel -tunneleita ei palauteta automaattisesti OmniRouten tai säilön uudelleenkäynnistyksen jälkeen. Ota ne tarvittaessa uudelleen käyttöön hallintapaneelista.
- Hallittu asennus tukee tällä hetkellä Linuxia, macOS:ää ja Windowsia `x64`- ja `arm64`-arkkitehtuureilla.
- Hallitut Quick Tunnel -tunnelit käyttävät oletusarvoisesti HTTP/2-siirtotapaa, jotta rajoitetuissa säilöympäristöissä vältetään meluisat QUICin UDP-puskurivaroitukset. Aseta `CLOUDFLARED_PROTOCOL=quic` tai `auto`, jos haluat käyttää muuta siirtotapaa.
- Docker-levykuvat sisältävät järjestelmän CA-juurivarmenteet ja välittävät ne hallitulle `cloudflared`-ohjelmalle, mikä estää TLS-luottamusvirheet tunnelin alustuksen aikana säilön sisällä.
- Aseta `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`, jos haluat OmniRouten käyttävän olemassa olevaa binääritiedostoa uuden lataamisen sijaan.

## Levykuvatunnisteet

| Levykuva                 | Tunniste | Koko   | Kuvaus                                             |
| ------------------------ | -------- | ------ | -------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | Uusin **julkaistu** vakaa SemVer (ei gitin `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | Kiinnitä tämän luokan tunniste GitOpsia varten     |

Monialustainen manifesti: natiivit `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker valitsee vastaavan arkkitehtuurin automaattisesti. Anna `--platform linux/amd64`, jos AMD64-emulointi on pakotettava ARM-isännillä.

### Julkaisukanavat

OmniRoute julkaisee erilliset Docker-kanavat vakaille julkaisuille, aktiivisen julkaisuhaaran testaukselle ja kehitysversioille.

| Kanava                          | Lähde                                      | Muuttuvuus                  | Suositeltu käyttö                                                                                                                |
| ------------------------------- | ------------------------------------------ | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Allekirjoitettu/versioitu julkaisu         | Muuttumaton                 | Tuotantokäyttöönotot, jotka on kiinnitetty tarkkaan julkaisuun                                                                   |
| `:latest` / `:latest-web`       | Uusin **julkaistu** vakaa SemVer           | Muuttuva vakaa osoitin      | Seuraa vakaita julkaisuja **SemVer-julkaisutyön jälkeen** — ei seuraa `main`-haaraa tai julkaisemattomia `release/v*`-committeja |
| `:next` / `:next-web`           | Nykyinen oletusarvoinen `release/v*`-haara | Muuttuva esijulkaisuosoitin | Aktiiviseen julkaisuhaaraan lisättyjen, mutta vielä vakaasta julkaisusta puuttuvien korjausten testaaminen                       |
| `:main` / `:main-web`           | `main`-haara                               | Muuttuva kehitysosoitin     | Vain kehitys- ja integraatiotestaukseen                                                                                          |

#### Verkkoistuntojen palveluntarjoajat: `-web`-levykuvat

Jokaisesta yllä olevasta kanavasta on myös `-web`-tunniste (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), joka rakennetaan `runner-web`-vaiheesta — kyseessä on sama levykuva, johon on lisätty Playwright ja Chromium-selain. Tavallinen levykuva toimitetaan **ilman** Chromiumia; `gemini-web`, `claude-web` ja `claude-turnstile` tarvitsevat sitä.

Virhe ilmenee viiveellä eikä käynnistyksen aikana: nämä palveluntarjoajat luettelevat mallinsa ja näkyvät hallintapaneelissa yhdistettyinä, ja vasta ensimmäinen pyyntö epäonnistuu seuraavalla virheellä:

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Jos käytät näitä palveluntarjoajia, lataa käyttämäsi kanavan `-web`-tunniste — mikään muu ei muutu. npm/CLI-asennuksessa (ei Docker-levykuvaa) vastaava puuttuva osa on selaimen binääritiedosto: suorita isännällä `npx playwright install chromium`.

#### Esijulkaisukanavan käyttäminen

`next`-kanava rakennetaan uudelleen jokaisen nykyiseen oletusarvoiseen `release/v*`-haaraan tehdyn pushin yhteydessä, ja se julkaistaan sekä AMD64- että ARM64-arkkitehtuurille. Vanhemmat ylläpitohaarat eivät voi korvata sitä. Kanava tarjoaa ladattavan imagen korjauksille, jotka on yhdistetty aktiiviseen julkaisuhaaraan ennen seuraavan vakaan tagin luomista.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Composessa korvaa valitun profiilin käyttämä image-tagi ja lataa sekä luo palvelu sitten uudelleen:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Turvallisuus ja palauttaminen

`next` on muuttuva esijulkaisukanava. Se voi muuttua jokaisella aktiiviseen julkaisuhaaraan tehdyllä pushilla, eikä sitä **tueta tuotantokäytössä**. Kiinnitä image-tiiviste arvioidessasi tiettyä koontiversiota:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Varmuuskopioi OmniRouten datataltion tai bind-mountatun datakansion sisältö ennen testaamista. Voit palauttaa aiemman version ottamalla aiemmin käytetyn vakaan version tai tiivisteen takaisin käyttöön ja luomalla säilön uudelleen:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Julkaisuhaaran koontiversio ei voi koskaan siirtää `latest`-osoitinta; vain kelvollinen vakaa semanttinen versio voi päivittää vakaan osoittimen. `next`-imageissa säilyvät julkaisuimagen tarkastus ja estävä CRITICAL-tason haavoittuvuustarkistus.

**`latest` ei takaa git-repositorion ajantasaisuutta.** `main`-haaraan tai aktiiviseen `release/v*`-haaraan yhdistetyt korjaukset **eivät** sisälly `:latest`-imageen, ennen kuin vakaa SemVer-image on julkaistu ja julkaisutyö päivittää `:latest`-osoittimen (sama tiiviste kuin kyseisellä SemVer-versiolla). Jos `latest` vaikuttaa pysyneen muuttumattomana, vaikka korjaus näkyy jo GitHubissa, testaa julkaisuhaaraa lataamalla `:next` tai odota SemVer-tagia.

| Tavoite                                                                                       | Käytä                                  |
| --------------------------------------------------------------------------------------------- | -------------------------------------- |
| GitOps/tuotanto, joka ei saa muuttua                                                          | Kiinnitä `:X.Y.Z` (tai image-tiiviste) |
| Seuraa julkaistuja vakaita versioita ja hyväksy uudelleenluonti jokaisen julkaisun yhteydessä | `:latest`                              |
| Testaa julkaisemattomia `release/v*`-committeja                                               | `:next` (ei tuotantoon)                |
| Testaa `main`-haaraa                                                                          | `:main` (ei tuotantoon)                |

## Hallintapaneelin päivitykset Dockerissa

Julkaistusta näköistiedostosta luotu kontti ei voi korvata itseään. Kun OmniRoute havaitsee toimivansa
kontissa (ei `.git`-työkopiota eikä npm-asennusta), etusivun hallintapaneelin päivitysbanneri näyttää
npm/git-ohjeiden sijaan isännässä suoritettavan komennon sekä kopiointipainikkeen:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

Palvelun nimi tulee `AUTO_UPDATE_SERVICE`-muuttujasta (oletus on `omniroute`, joka on
`docker-compose.selfhost.yml`-tiedoston palvelu). `pull` siirtää vain muuttuvaa tunnistetta (`latest`, `next`); jos käytössä on kiinnitetty
`:X.Y.Z`-tunniste, muokkaa tunnistetta ensin.

### Yhden napsautuksen päivitykset isännän laukaisutiedostolla

Jotta **Päivitä nyt** toimii ilman `/var/run/docker.sock`-liitosta (joka antaa kontille
root-oikeudet isäntään — katso yllä oleva `cli`-profiilin varoitus), aseta `DOCKER_UPDATE_TRIGGER_FILE`
OmniRoute-palvelulle ja suorita isännässä tarkkailija:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

Polun on sijaittava `DATA_DIR`-hakemiston sisällä (suhteelliset arvot ratkaistaan sen suhteen); kaikki muu
hylätään. **Päivitä nyt** kirjoittaa tämän jälkeen tiedostoon `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }`,
vastaa tilakoodilla `202`, ja hallintapaneeli kysyy `/api/system/version`-päätepistettä toistuvasti, kunnes uusi versio on käytössä,
ja lataa sitten sivun uudelleen. OmniRoute ei koskaan suorita tässä tilassa komentotulkkia tai Docker-komentoa. Kuten kaikki päivitystoiminnot,
pyyntö hyväksytään vain loopback-/LAN-asiakkailta.

Bind-liitetty datahakemisto tarjoaa isännälle vakaan tarkkailtavan polun. Esimerkkejä `systemd`-yksiköistä
(vaihda `/srv/omniroute` hakemistoksi, joka sisältää compose-tiedostosi ja `data/`-hakemiston):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=Tarkkaile OmniRoute-hallintapaneelin päivityspyyntöjä

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=Lataa OmniRoute-kontin näköistiedosto ja luo kontti uudelleen

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

Palvelu poistaa pyynnön ennen näköistiedoston lataamista, jotta epäonnistunut suoritus ei jää silmukkaan. Ilman
`DOCKER_UPDATE_TRIGGER_FILE`-muuttujaa hallintapaneeli säilyttää manuaalisen komentotyönkulun.

## Saatavuus: oletusarvoinen SQLite tukee yhtä replikointia

Dockerin tai Kubernetesin OmniRoute-vakiokokoonpano on **yksi Node-prosessi + yksi SQLite-kirjoittaja**. Korkeaa käytettävyyttä **ei tueta** tässä topologiassa.

| Rajoite                                                     | Seuraus                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Yksi kirjoittaja                                            | **Älä** suorita useita replikoita samaa SQLite-tiedostoa vasten. Se vioittaa tietokannan.                                                                                                                                                                                                                                                                                                                                |
| Uudelleenluonti / uudelleenkäynnistys / HEALTHCHECK-lopetus | Käynnissä oleville SSE-yhteyksille, hallintapaneeli-istunnoille ja muistissa olevalle tilalle aiheutuu **täydellinen käyttökatko**. Jokaisen yhdistetyn asiakkaan yhteys katkeaa. Uudet pyynnöt saavat tyhjän päätepisteen aikana käänteiseltä välityspalvelimelta vastauksen **`502 Bad Gateway: Unknown error`**, eivät OmniRoute-JSON-vastausta — asiakkaat eivät voi erottaa tätä palveluntarjoajan viasta (#11015). |
| Sama tapahtumasilmukka kuin `/healthz`                      | Kiireinen luettelo- tai pakkausjakso voi viivästyttää tarkistuksia; lyhyt aikakatkaisu käynnistää tällöin **ainoan** replikan uudelleen.                                                                                                                                                                                                                                                                                 |

**Tarkistusmatriisi** (katso myös [Kubernetes-tarkistusten suositukset](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Tarkistus        | Kohde                                                          | Älä käytä                                                                         |
| ---------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Elossaolo        | TCP portissa `PORT` (oletus `20128`) tai kevyt HTTP `/healthz` | `/api/monitoring/health`                                                          |
| Valmius          | HTTP `GET /healthz`                                            | Tiukkoja aikakatkaisuja, jotka tulkitsevat kiireisen tapahtumasilmukan kuolleeksi |
| Syvä / ihmisille | `/api/monitoring/health`                                       | Automatisoituna kubeletin elossaolotarkistuksena                                  |

**Päivitykset:** varaudu siihen, että jokainen istunto katkeaa. Ohjaa asiakkaat hallitusti pois, jos mahdollista; oletusarvoisella SQLite-kokoonpanolla ei voi tehdä vaiheittaista päivitystä. Composen `restart: unless-stopped` yhdessä Dockerin `HEALTHCHECK`-tarkistuksen kanssa korvaa myös ainoan prosessin, kun kontin tila on Unhealthy — vaikutusalue on sama.

Kubernetes-katkelma **yhdelle replikalle** (Recreate vaaditaan; älä kasvata `replicas`-arvoa yhtä SQLite-tiedostoa käytettäessä):

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

`preStop`-viive antaa kuben poistaa Service-päätepisteet ennen SIGTERM-signaalia, jotta **uusi** liikenne ei enää ohjaudu sammutettavaan prosessiin. Käynnissä olevien `/v1/responses`-SSE-yhteyksien annetaan päättyä enintään `SHUTDOWN_TIMEOUT_MS`-ajan (oletus 30 s) raskaiden pääsynhallintavarausten avulla (#11015). Prosessiin edelleen päätyvät uudet pyynnöt saavat vastauksen `503` + `Retry-After: 5`. Recreate-strategiassa syntyvä tyhjien päätepisteiden jakso korvaavan instanssin Ready-tilaan asti aiheuttaa edelleen täydellisen käyttökatkon — tämä johtuu SQLite-topologiasta, ei virheellisistä probe-asetuksista.

Ulkoinen Postgres / usean kirjoittajan HA **ei** ole dokumentoitu vakiokokoonpano. Jos tarvitset HA:n, käytä yhtä replikaa tai topologiaa, jonka projekti on testannut ja dokumentoinut erikseen. Postgres/MySQL-työtä seurataan kohdassa [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Siihen asti ainoa tuettu tapa kasvattaa **suurten** `/v1/responses`-pyyntöjen kapasiteettia on käyttää N:ää itsenäistä prosessia (seuraava osio), ei asetusta `replicas > 1` yhdellä taltiolla.

## Skaalaus ulospäin: N itsenäistä prosessia

Yksi Node-prosessi on **yksi V8-keko**. Kaksi päällekkäistä, noin 3 MiB:n / noin 750k tokenin koodausagentin `POST /v1/responses`-pyyntöä (RTK + Caveman) keskeyttää kyseisen keon noin 12 Gi:n kohdalla (`FATAL ERROR: Reached heap limit`) ja voi aiheuttaa OOM-tilanteen 16 Gi:n cgroupissa. Katso [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Tämä mittaustulos on **muistibudjettia** koskeva varoitus, ei tuotteen kiinteä kahden samanaikaisen pitkän `/v1/responses`-pyynnön enimmäisraja. Raskaiden keskustelupyyntöjen sisäänpääsyä rajoittaa automaattisesti johdettu saapuvien tavujen budjetti (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), joka mitoitetaan saman V8-/cgroup-rajan perusteella — sen kasvattaminen ohittamalla oletusarvo (tai vanhan pyyntömääriin perustuvan `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`-rajan asettaminen) jo valmiiksi mitoitetussa prosessissa aiheuttaa keskeytyksen uudelleen. Pienet keskustelut, `/healthz`, `/v1/models` ja MCP **eivät** kuulu tämän rajan piiriin.

### Yksi prosessi: enemmän kuin kaksi pitkää `/v1/responses`-pyyntöä

**Hyväkuntoinen** prosessi (keko alle `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`-arvon, oletus `0.75`) **voi** suorittaa samanaikaisesti enemmän kuin kaksi pitkää `POST /v1/responses`-pyyntöä, kun prosessinlaajuisessa käsiteltävien tavujen budjetissa (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) on vielä tilaa. Kooltaan vähintään `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (oletus 256 KiB) olevat pyynnön rungot ottavat saman raskaan varauksen kuin rakenteeltaan raskaat pyynnöt ja käyttävät samaa [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437)-muutoksen `tryAcquireHealthyHeadroom`-poikkeusreittiä (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Kymmenet samanaikaiset pitkät SSE-asiakkaat (operaattorit tarvitsevat usein 40–50) ovat **muistibudjettiin** liittyvä kysymys — mitoita keko + ensisijaiset/lisäkapasiteetin paikat + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — eivät tuotteen kiinteä ”enintään 2” -raja. Kuormittunut keko hylkää edelleen pyyntöjä uudelleen yritettävällä `503`-vastauksella, jotta #7849 ei palaa.

Voit **moninkertaistaa kekojen määrän** (itsenäiset V8:n old-space-muistialueet) **tällä hetkellä** seuraavasti:

| Tee                                                                                                                                                                                                    | Älä tee                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| Suorita **N konttia/podia**, joilla jokaisella on **oma** `DATA_DIR` / taltio                                                                                                                          | Aseta `replicas > 1` käyttämään yhtä SQLite-tiedostoa             |
| Mitoita raskaat käsiteltävät pyynnöt + hyväkuntoisen keon lisäkapasiteetti keon / käsiteltävien tavujen budjetin perusteella; 1–2 on #7849:n konservatiivinen oletus, ei tuotteen kiinteä enimmäisraja | Anna yhdelle prosessille 8× RAM-määrä ja rajoittamaton määräraja  |
| Valinnainen: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` **jaettuja kiintiölaskureita** varten                                                                                                | Käsittele Redisiä jaettuna SQLite-tietokantana — se ei ole sitä   |
| Kopioi palveluntarjoajien salaisuudet jokaiseen instanssiin (tai hyväksy erilliset koontinäytöt)                                                                                                       | Odota yhtä koontinäyttöä / yhtä kutsulokia kaikille instansseille |
| Aseta eteen mikä tahansa kuormantasaaja; API-avaimeen tai istuntoon perustuva pysyvyys riittää                                                                                                         | Edellytä toimittajakohtaista, kokotietoista väliohjelmistoa       |

Laitteisto: instanssikohtaisten samanaikaisten pitkien `/v1/responses`-pyyntöjen määrä on **muistibudjettiin** liittyvä kysymys (keko + käsiteltävien tavujen budjetti / #10110). `N` itsenäistä `DATA_DIR`-hakemistoa moninkertaistaa silti kekojen määrän: isäntäkoneen RAM-muistin on katettava `N × cgroup`, ei ”yksi 16 Gi:n podi, jossa N=8”. Älä koskaan käytä asetusta `replicas > 1` yhdelle SQLite-tiedostolle.

Compose-luonnos (kaksi kekoa, kaksi taltiota — ei `deploy.replicas: 2`):

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

Prosessinsisäinen tiheys (pakkaus pois HTTP-isolaatista) on [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Yksi looginen klusteri jaetun pysyvän tilan päällä on [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Geminin alueelliset virheet Dockerissa

Google AI Studio / Gemini API voi palauttaa HTTP 400 -virheen, jonka tunniste on FAILED_PRECONDITION ja viesti
`User location is not supported for the API use.` Isäntäkoneella onnistuva pyyntö
ei osoita, että säilö käyttää samaa ulospäin suuntautuvaa reittiä. DNS-järjestys,
IPv4/IPv6-yhteydet, VPN-reititys ja määritetyt välityspalvelimet voivat poiketa toisistaan. Tarkista
[Googlen tukemat alueet](https://ai.google.dev/gemini-api/docs/available-regions)
sekä todellinen yhteysreitti; tämä virhe ei yksinään tarkoita virheellistä API-avainta.

### Suosi yhteyskohtaista välityspalvelinta

Käytä OmniRouten [yhteyskohtaista välityspalvelinmääritystä](../ops/PROXY_GUIDE.md#4-level-proxy-system)
kyseiselle Gemini-yhteydelle ja suorita sitten uudelleen **Test Connection** sekä pieni pyyntö
samalla mallilla. Näin reititysmuutos rajataan kyseiseen yhteyteen. Varmista,
että välityspalvelin on tavoitettavissa säilöstä ja että yhteys todella käyttää
sitä. Reitin muuttaminen ei takaa, että vastapään alueelliset käyttöehdot täyttyvät.

### Vertaa isäntäkoneen ja säilön verkkoyhteyksiä

Pidä avain, malli ja pyyntö samoina, kun vertaat todennettuja tuloksia; älä koskaan
liitä tunnistetietoja, välityspalvelimen salasanoja tai täydellisiä valtuutusotsakkeita ongelmaraporttiin.
Tarkista ensin, mitä osoiteperheitä käyttöjärjestelmän nimenselvitys tarjoaa, käyttämällä samaa komentoa
isäntäkoneella ja säilössä:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Korvaa `omniroute` käyttämälläsi palvelulla (esimerkiksi `omniroute-web`). Nämä
komennot tulostavat osoiteperheet ilman tunnistetietoja tai IP-osoitteita. Palautettu `6`
osoittaa vain IPv6 DNS -tuloksen: se **ei** todista, että käytettävissä on toimiva IPv6-reitti tai API-yhteys.
Jos `curl` on asennettu, vertaa komentoa `curl -4 -I https://generativelanguage.googleapis.com`
komentoon `curl -6 -I https://generativelanguage.googleapis.com` kummassakin ympäristössä.
HTTP-vastaus osoittaa kyseisen testin yhteyden toimivan, vaikka kyseessä olisi todentamattoman
pyynnön virhe; vain todennettu mallipyyntö testaa Geminin käytettävyyden.

### Isäntätason vaihtoehto: toimiva IPv6 ja nimenselvityskäytäntö

Raportin [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) tekijä palautti
yhteyden omassa ympäristössään ottamalla IPv6:n käyttöön säilöissä ja muuttamalla glibc:n
osoitteenvalintaa. Käsittele tätä ympäristökohtaisena vaihtoehtona. Varmista isäntäkoneen
toimiva IPv6, säilön ulospäin suuntautuva yhteys ja reititys sekä palomuurisäännöt ennen nimenselvityksen asetusten muuttamista.
Yksityinen ULA-osoite ei yksinään osoita julkisen IPv6-yhteyden toimivuutta.

Palveluille, jotka on jo liitetty Composen oletusverkkoon, tämä katkelma ottaa
IPv6:n käyttöön kyseisessä verkossa; säilytä palvelusi muut asetukset, portit, taltiot ja määritykset:

```yaml
networks:
  default:
    enable_ipv6: true
```

Jos käytössä on nimetty verkko, ota IPv6 käyttöön siinä verkossa, johon palvelu tosiasiassa liittyy. Docker voi
varata ULA-aliverkon; valitse erikseen määritetty, muiden kanssa päällekkäisyydetön aliverkko vain, jos verkkosi
edellyttää sitä. Katso [Dockerin IPv6-verkkoyhteydet](https://docs.docker.com/engine/daemon/ipv6/)
ja [Composen verkkoasetukset](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

**glibc-pohjaisessa levykuvassa** `/etc/gai.conf` voi muuttaa osoitteenvalintaa. Nykyisen
tietovaraston Dockerfile käyttää Debiania; mukautetut musl-pohjaiset levykuvat eivät käytä samaa mekanismia.
Raportoitu muutos vaihtaa ULA-tunnisteen arvosta `label fc00::/7 6` arvoon
`label fc00::/7 1`. Käytä lähtökohtana levykuvan täydellistä käytäntötaulukkoa ja säilytä sen muut
merkinnät: `label`- tai `precedence`-merkinnän lisääminen korvaa kyseisen oletustaulukon, joten vain
muutetun rivin sisältävä tiedosto ei riitä.
[glibc:n määritysviite](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
dokumentoi tämän toiminnan. Liitä tarkistettu tiedosto vain luku -tilassa polkuun `/etc/gai.conf`
ja luo palvelu uudelleen, jotta muutos tulee voimaan.

Tämä muuttaa käyttöjärjestelmän osoitteenvalintaa **kaikelle kyseisestä säilöstä ulospäin suuntautuvalle liikenteelle**.
Se ei pakota jokaista sovellusta valitsemaan IPv6:ta: myös Noden DNS-järjestyksellä ja yhteyden
valinnalla on merkitystä. Erityisesti `--dns-result-order=ipv4first` suosii IPv4:ää eikä
ratkaise IPv4:ään rajoittuvaa ongelmaa. Katso [Noden DNS-järjestys](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Testaa Gemini ja muut palveluntarjoajasi uudelleen jokaisen isäntätason muutoksen jälkeen. Jos haluat palauttaa
aiemmat asetukset, poista mukautetun `gai.conf`-tiedoston liitos, palauta aiempi verkkomääritys ja
luo kyseinen palvelu tai verkko uudelleen huoltoikkunan aikana. Verkon luominen uudelleen
voi keskeyttää muiden siihen liitettyjen säilöjen toiminnan; älä poista pysyvän datan taltiota.

## Tärkeitä huomioita

- **SQLite WAL -tila:** Komennon `docker stop` suorittamisen on annettava päättyä, jotta OmniRoute voi tehdä tarkistuspisteen ja kirjoittaa uusimmat muutokset takaisin `storage.sqlite`-tiedostoon. Mukana toimitetuissa Compose-tiedostoissa pysäytyksen lisäajaksi on jo asetettu 40 s. Jos suoritat levykuvan suoraan, säilytä asetus `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Aseta arvoksi `true`, jos säännöllisiä tai kirjoitusta edeltäviä varmuuskopioita hallitaan ulkoisesti. Olemassa olevien tietokantojen migraatiot edellyttävät silti omaa pysyvää turvakopiota ja massamigraation suojausta.
- **Tietojen säilyvyys:** Liitä aina taltio polkuun `/app/data`, jotta tietokanta, avaimet ja määritykset säilyvät säiliön uudelleenkäynnistysten yhteydessä.
- **Portin määritys:** Muuta oletusporttia `20128` ohittamalla ympäristömuuttujan `PORT` arvo.

## Katso myös

- [Virtuaalikoneen käyttöönotto-opas](../ops/VM_DEPLOYMENT_GUIDE.md) — Virtuaalikoneen, nginxin ja Cloudflaren määritys
- [Fly.io-käyttöönotto-opas](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Käyttöönotto Fly.io-palvelussa
- [Ympäristömääritykset](../reference/ENVIRONMENT.md) — Täydellinen `.env`-viite
