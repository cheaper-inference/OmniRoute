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

## Pikajuoksu

> **Itseisäntä yhdessä komennossa?** Katso [Self-Host Guide](../getting-started/SELF_HOST_GUIDE.md) — `docker compose -f docker-compose.selfhost.yml up -d` (julkaistu kuva + Redis, vain silmukka, ei profiilivalintaa). Alla oleva Quick Run on yhden säilön polku käyttäjille, jotka jo suorittavat Redis muualla.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## Ympäristötiedoston kanssa

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

Arkisto toimittaa monivaiheisen Docker-tiedoston (`Dockerfile`). Neljä vaihetta on esillä; pick the right `target` for your use case.

| Vaihe         | Peruskuva             | Tarkoitus                                                                                                                                                                                                                                                                           |
| ------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Asentaa deps:n (`npm ci --legacy-peer-deps`) ja suorittaa `npm run build` (Turbopack oletuksena — katso rakennusaikaresurssit alla)                                                                                                                                                 |
| `runner-base` | `node:26-trixie-slim` | Tuotannon suoritusaika erillisellä Next.js lähdöllä.** Ei palveluntarjoajan CLIs pakettia.**                                                                                                                                                                                        |
| `runner-cli`  | `runner-base`         | Lisää `git`, `docker.io`, `docker-compose` ja globaalin CLIs: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`.** Pick this for agentic workflows.**                                                                                                               |
| `runner-web`  | `runner-base`         | Lisää Playwright + Chromium-selaimen (`--with-deps`) verkkoistuntojen tarjoajille: `gemini-web`, `claude-web`, `claude-turnstile`.** Pick this when you use those providers** — tavallinen kuva epäonnistuu pyynnöstä ilman sitä (katso `-web` huomautus kohdassa Julkaisukanavat). |

Build a specific target manually:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Rakennusaikaresurssit

Kolme rakennusargumenttia hallitsee `builder` lavan hintaa. Ne ovat vain rakennusaikaisia. — `OMNIROUTE_MEMORY_MB` (alla) on erillinen ajonaikainen nuppi.

| Rakenna arg                 | Oletus | Vaikutus                                                                                      |
| --------------------------- | ------ | --------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`    | `0` rakentaa verkkopaketin avulla: pienempi huippumuisti, hitaampi. `1` valitsee Turbopack:n. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144` | V8 heap ceiling (`--max-old-space-size`) for the spawned `next build`.                        |
| `OMNIROUTE_BUILD_WORKERS`   | `2`    | Syötteet `CIRCLE_NODE_TOTAL`; Next derives `workers = N - 1` for page-data collection.        |

`OMNIROUTE_BUILD_WORKERS` on se, joka kasvattaa suuren rakentajan varassa ja joka epäilee, kun rajoitettu rakenne kuolee** jälkeen** `✓ Compiled successfully`. Jokainen sivutietotyöntekijä on oma prosessinsa, samoin kuin emo- `next build` itse; elävä VPS -toisto (ongelma #7518) mittasi kunkin prosessin huipun RSS arvolla ~ 4,5 GB riippumatta `NODE_OPTIONS` -keon lipusta (Turbopack kääntää native/Rust muistiin V8-keon ulkopuolella). Oletusarvo `2` (→ 1 työntekijä, yhteensä 2 prosessia) on mitoitettu julkaisuputken käyttämille 16 GB / 4 vCPU GitHub-isännöidylle juoksijalle. Kohdassa `8` (→ 7 työntekijää) tuon juoksijan muisti loppui ja buildkit epäonnistui vaiheessa `ResourceExhausted: ... cannot allocate memory`; `3` (→ 2 työntekijää) ei vieläkään sopinut, kun prosessikohtainen RSS mitattiin suoraan päätelmien sijaan. `tests/unit/docker-build-memory-budget.test.ts` suorittaa aritmeettisen laskennan mitattua lukua vastaan ja epäonnistuu, jos jompikumpi nuppi kasvaa juoksijan ulkopuolelle.

Turbopack kokoaa alkuperäiseen ruosteen muistiin, joka elää** ulkopuolella** V8-kasa, joten `OMNIROUTE_BUILD_MEMORY_MB` ei sido sitä. Isännässä, jossa on muistikatto OOM killer SIGKILLed kooppaa ilman virhetekstiä. — se yksinkertaisesti pysähtyy `Creating an optimized production build` puoliväliin, mikä on pikemminkin jumittua kuin muistin loppumista. Tästä syystä `Dockerfile` on oletuksena webpack (`OMNIROUTE_USE_TURBOPACK=0`), toisin kuin `npm run dev` / `npm run build`, jossa Turbopack on oletuskoodi: paljas `docker build .`, jossa ei ole koontiargeja (mitä Railway ja muut yhden napsautuksen isännät suorittavat) ei saa kuolla hiljaa muistirajoitteisessa rakentajassa. Julkaistut kuvat ohittavat jo `OMNIROUTE_USE_TURBOPACK=0` nimenomaisesti `docker-publish.yml` ssä. Rakennustyökalussa, jossa on runsaasti RAM, valitse Turbopack nopeampaa rakentamista varten:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` on käytössä, joten `next build` suorittaa ylätason** ja** työntekijäprosessi ja jokainen kunnioittaa `OMNIROUTE_BUILD_MEMORY_MB` erikseen. Kokoa säiliön katto noin kaksinkertaiseksi, ei kerran.

Tästä puusta mitattuna (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler       | Kontin katto   | Tulos                         |
| ------------- | -------------- | ----------------------------- |
| Turbopack     | 8 GiB / 16 GiB | OOM tappoi molemmissa, hiljaa |
| verkkopaketti | 8 GiB          | rakentaa työntekijä SIGKILLed |
| verkkopaketti | 12 GiB         | onnistui, huippu oli 11,1 GiB |

### Ajonaikaiset oletusasetukset

`runner-base`:n viemät oletukset: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Muistin käyttäytyminen Docker:

- Kuva asettaa `OMNIROUTE_MEMORY_MB=1024` ja johtaa `NODE_OPTIONS=--max-old-space-size=1024` siitä.
- Varsinaisen palvelinprosessin käynnistää erillinen käynnistysohjelma, joka lukee `OMNIROUTE_MEMORY_MB` ja liittää `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Solmu käyttää viimeistä toistettua `--max-old-space-size` arvoa, joten `OMNIROUTE_MEMORY_MB` -asetus ohjaa tehollista Docker -keon rajaa.
- Koska kuva määrittää sen aina, kantoraketin oma RAM-kalibroitu varatoiminto ei ole koskaan voimassa Docker-kohdassa. Nosta sitä nimenomaisesti työmäärää varten (taulukko alla). `2048` on edelleen liian pieni koodausagentille `/v1/responses`.

### Ajonaikainen RAM koodausagenteille

Oletusarvo 1 GiB Docker on dashboard/light-chat lattia, ei tuotantokoko. Pitkät `POST /v1/responses` kappaleet (satoja viestejä, kymmeniä työkaluja) säilyttävät useita muistissa olevia kuvaajia pakkauksen aikana. Kaksi päällekkäistä ~ 3 MiB / ~ 750k-token -pyyntöä on keskeyttänyt V8:n** 12 GiB** old-space (`FATAL ERROR: Reached heap limit`) ja osui myös 16 GiB cgroup OOM. Katso [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Koko** cgroup `--memory` kasan yläpuolella** — alkuperäiset puskurit, SQLite ja pakkausvälituotteet ovat V8:n ulkopuolella.

| Työmäärä                                | `OMNIROUTE_MEMORY_MB`     | Säiliö / cryhmä       | Huomautuksia                                                                                             |
| --------------------------------------- | ------------------------- | --------------------- | -------------------------------------------------------------------------------------------------------- |
| Kojelauta, yksi kevyt keskustelu        | `1024` (kuvan oletusarvo) | ≥2 GiB                |                                                                                                          |
| Yksi koodausagentti (Claude/Codex/Grok) | `8192`                    | ≥10 GiB               | Tyypillinen yhden istunnon `/v1/responses`                                                               |
| Kaksi yhtä aikaa pitkää `/v1/responses` | `10240`–`12288`           | ≥12–16 GiB            | Mitattu V8-katkos ~ 12 GiB -kasalla                                                                      |
| Kolme + yhtä aikaa pitkää kontekstia    | älä käytä yhtä prosessia  | serialize / lisää RAM | Raskaan sarjan oletuspääsy on 1 lennon aikana; sen nostaminen ilman RAM ottaa abortin uudelleen käyttöön |

`omniroute serve` paljaalla metallilla kalibroi ~ 35 % RAM (puristettu `[512, 4096]`), kun `OMNIROUTE_MEMORY_MB` on** pois päältä** . Docker asettaa aina `1024`, joten kalibrointi ei koskaan suorita virallisessa kuvassa.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
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

## Käänteinen välityspalvelin alipolulla (Traefik / nginx)

Next.js `basePath` on käännetty erilliseksi nipuksi. OmniRoute tallentaa baked-arvon sentinel-tiedostoon sovelluksen juuressa (kirjoitetaan `npm run build` aikana; lukee `scripts/docker/ensure-docker-base-path.mjs`) ja vertaa sitä `OMNIROUTE_BASE_PATH` ään, kun säiliö käynnistyy. Kun ne eroavat toisistaan ja kuva on rakennettu verkkotunnuksen juurelle, aloituspiste kirjoittaa uudelleen itsenäiset manifestit, upotetut `basePath`/`assetPrefix` -literaalit (seuraavat 16 renderöi SSR -resurssin URLs pelkästä `assetPrefix` :sta — korjaustiedosto peilaa alipolun siihen), URLs `/_next/static` -resurssit prefererede,rende-media sivut) ja asiakas `process.env` shim ennen `node dev/run-standalone.mjs` suorittamista.

### Luo rakenne (suositus)

Aseta molemmat muuttujat `.env` ssa ja rakenna sitten uudelleen niin, että kuva ja suoritusaika sopivat:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` välittää `OMNIROUTE_BASE_PATH` n Docker build-arg:na ja ajonaikaisena ympäristömuuttujana.

### Valmiiksi rakennettu juurikuva + ajonaikainen alipolku

Julkaistut `cheaperinference/omniroute:*` -kuvat on rakennettu verkkotunnuksen juurelle. Voit silti asettaa `OMNIROUTE_BASE_PATH` n ajon aikana; kontti korjaa nipun kerran käynnistyksen yhteydessä. Yhdistä se vastaavaan julkiseen alkuperään:

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Määritä käänteinen välityspalvelin välittämään** koko** ulkoinen polku (älä poista etuliitettä). Traefikin tulisi reitittää `PathPrefix(`/omniroute `)` säiliöön ilman `StripPrefix`, joten Next.js vastaanottaa `/omniroute/...` ja palvelee resursseja `/omniroute/_next/...` ltä.

Docker terveystarkastus tutkii kevyen `/healthz` elinkaaren päätepisteen, jonka etuliitteenä on aktiivinen `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` on edelleen käytettävissä human/dashboard -diagnostiikassa; osoittaaksesi säiliön HEALTHCHECK takaisin siihen (esimerkiksi syvällistä terveydenhuollon valvontaa varten), aseta `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Se polku on a** syvä** tarkista (DB + seurantayhteenveto) — sopii Docker: n harvoin `HEALTHCHECK` jos otat takaisin käyttöön , mutta** ei** Kubernetes `livenessProbe` -väleille.

Orkestereille (Kubernetes, Nomad jne.):

| Koetin          | mieluummin                                                     | Välttää                                                                  |
| --------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Elävyyttä       | HTTP `GET /livez` tai TCP pääportissa (`PORT`, oletus `20128`) | `/api/monitoring/health` eloisuutena                                     |
| Valmius         | HTTP `GET /healthz`                                            | Tiukat aikakatkaisut, jotka pitävät tapahtumasilmukan kiirettä kuolleina |
| Deep / blackbox | `/api/monitoring/health`                                       | —                                                                        |

`/healthz` raportoi prosessin elinkaaren (`ok` / `starting` / `stopping`). `/livez` on vain prosessi-alive (200 aina kun käsittelijä voi suorittaa; se ei odota valmiutta). Molemmat toimivat edelleen samassa Node-tapahtumasilmukassa kuin pyyntöjen käsittely, joten CPU-sidottu luettelo tai pakkaustyö voi viivyttää niitä — kiireisen ≠ dead. Valitse TCP eloisuus, jos HTTP anturit aikakatkaisivat. Täydellinen anturin opastus: [Valvontaopas — Kubernetes anturisuositukset](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose with Caddy (HTTPS Auto-TLS)

OmniRoute voidaan paljastaa turvallisesti Caddyn automaattisen SSL provision avulla. Varmista, että verkkotunnuksesi DNS A -tietue osoittaa palvelimesi IP.

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

Caddy asettaa normaalit edelleenlähetysotsikot ylävirran säilöön. OmniRoute käyttää `NEXT_PUBLIC_BASE_URL` OAuth takaisinkutsujen ja luotujen julkisten linkkien kanonisena julkisena alkuperänä; todennettu kojelautakirjoitus käyttää samaa alkuperää olevia pyyntöjä sekä istuntoon sidottua CSRF suojausta. Ota `OMNIROUTE_TRUST_PROXY` käyttöön vain kehittyneissä käyttöönotoissa, joissa haluat tarkoituksella OmniRoute johtavan julkisen alkuperän luotetuista edelleenlähetetyistä otsikoista nimenomaisen määrityksen sijaan.

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

## Kuvatunnisteet

| Kuva                         | Tag      | Koko    | Kuvaus                                             |
| ---------------------------- | -------- | ------- | -------------------------------------------------- |
| `cheaperinference/omniroute` | `latest` | ~ 250MB | Korkein** julkaistu** vakaa SemVer (ei git `main`) |
| `cheaperinference/omniroute` | `3.8.54` | ~ 250MB | Kiinnitä tämän luokan tunniste GitOps              |

Samat kuvat julkaistaan kolmeen arkistoon samoilla arkkitehtuurikohtaisilla tiivisteillä: `cheaperinference/omniroute` (Docker Hub, Cheaper Inference -organisaatio 3.8.53 alkaen), `ghcr.io/cheaper-inference/omniroute` ja vanha `diegosouzapw/omniroute`, joka säilyttää vetohistoriansa ja vastaanottaa silti jokaisen julkaisun. Nykyiset `diegosouzapw/omniroute` asennukset päivittyvät jatkuvasti; kuvan nimen vaihtaminen on valinnaista. Alla oleva `:next` / `:next-web` esijulkaisukanava julkaistaan vain `diegosouzapw/omniroute` lle ja GHCR.

Monen alustan manifesti: `linux/amd64` + `linux/arm64` natiivi (Apple Silicon, AWS Graviton, Raspberry Pi). Docker valitsee sopivan arkkitehtuurin automaattisesti; ohita `--platform linux/amd64` jos sinun täytyy pakottaa AMD64 -emulointi ARM isäntään.

### Julkaisukanavat

OmniRoute julkaisee erilliset Docker kanavat vakaille julkaisuille, aktiiviselle julkaisuhaaratestaukselle ja kehitysversioille.

| kanava                          | Lähde                                      | Muuttuvuus                            | Suositeltu käyttö                                                                                                                   |
| ------------------------------- | ------------------------------------------ | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Signed/versioned julkaisu                  | Muuttumaton                           | Tuotantoasennukset, jotka kiinnittävät tarkan julkaisun                                                                             |
| `:latest` / `:latest-web`       | Korkein** julkaistu** vakaa SemVer         | Vaihteleva vakaa osoitin              | Seuraa vakaita julkaisuja** jälkeen** SemVer -julkaisutyö, jonka — tekee** ei** seurata `main` tai julkaisematonta `release/v*` :tä |
| `:next` / `:next-web`           | Nykyinen oletusarvoinen `release/v*` haara | Vaihteleva julkaisua edeltävä osoitin | Testataan korjauksia, jotka ovat päätyneet aktiivisen julkaisun haaraan, mutta eivät vielä ole vakaassa julkaisussa                 |
| `:main` / `:main-web`           | `main` haara                               | Muuttuva kehitysosoitin               | Vain kehitys- ja integrointitestaus                                                                                                 |

#### Web-istunnon tarjoajat: `-web` kuvat

Jokainen yllä oleva kanava toimii `-web` -tunnisteena (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), joka on rakennettu `runner-web` -vaiheesta — samasta kuvasta plus Playwright ja Chromium-selain. Tavallinen kuva toimitetaan** ilman** Kromi; `gemini-web`, `claude-web` ja `claude-turnstile` tarvitsevat sitä.

Vika viivästyy, ei käynnistysaikaa: nämä palveluntarjoajat luetteloivat mallinsa ja näyttävät yhdistettyinä kojelautaan, ja vain ensimmäinen pyyntö epäonnistuu

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Jos käytät näitä palveluntarjoajia, vedä sen kanavan `-web` tunniste, jossa olet jo — mikään muu ei muutu. npm/CLI asennuksessa (ei Docker -kuvaa) vastaava puuttuva osa on selaimen binaari: suorita `npx playwright install chromium` isännässä.

#### Ennakkojulkaisukanavan käyttö

`next` kanava rakennetaan uudelleen jokaisella painalluksella nykyiseen `release/v*` oletushaaraan ja julkaistaan sekä AMD64 että ARM64 lle. Vanhemmat ylläpitohaarat eivät voi korvata sitä. Kanava tarjoaa vedettävän kuvan korjauksille, jotka ovat sulautuneet aktiiviseen julkaisuhaaran ennen seuraavan vakaan tagin leikkaamista.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Jos käytät Docker Composea, ohita valitun profiilin käyttämä kuvatunniste, vedä ja luo palvelu uudelleen:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Turvallisuus ja palautus

`next` on kelluva esijulkaisukanava. Se voi muuttua millä tahansa painalluksella aktiiviselle vapautushaaralle ja on** ei tueta tuotantokäyttöä** . Kiinnitä kuvakooste arvioidessasi tiettyä rakennetta:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Varmuuskopioi OmniRoute datavolyymi tai sidottuun tietohakemistoon ennen testausta. Peruuta palauttamalla aiemmin käytetty vakaa versio tai tiivistä ja luo säilö uudelleen:

```bash
docker pull cheaperinference/omniroute:<stable-version>
docker compose up -d
```

Release-haara rakennus ei voi koskaan siirtää `latest`; vain kelvollinen vakaa semanttinen versio voi edistää vakaata osoitinta. `next` -kuvat säilyttävät julkaisukuvan tarkastuksen ja estävät KRIITTINEN haavoittuvuusportin.

**`latest` ei ole valuuttatakuu gitille.** Yhdistetyt korjaukset `main` ssä tai aktiivisessa `release/v*` haarassa ovat** ei** `:latest` ssä, kunnes vakaa SemVer kuva julkaistaan ja julkaisutyö edistää `:latest` (sama tiivistelmä kuin SemVer). Jos `latest` näyttää jäätyneeltä, kun GitHub näyttää jo korjauksen, testaa vapautushaara vetämällä `:next` tai odota SemVer tunnistetta.

| Haluat                                                                      | Käyttää                                   |
| --------------------------------------------------------------------------- | ----------------------------------------- |
| GitOps / tuotanto, joka ei saa ajautua                                      | Kiinnitä `:X.Y.Z` (tai kuvan tiivistelmä) |
| Seuraa julkaistuja tallia ja hyväksy uudelleenluonti jokaisessa julkaisussa | `:latest`                                 |
| Testaa julkaisemattomia `release/v*` -sitoumuksia                           | `:next` (ei tuotanto)                     |
| Testaa `main`                                                               | `:main` (ei tuotanto)                     |

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

## Saatavuus: oletus SQLite on yksikopio

Varasto Docker / Kubernetes OmniRoute on** yksi solmuprosessi + yksi SQLite -kirjoitin** . Korkea saatavuus on** ei tueta** tuossa topologiassa.

| Rajoitus                                               | Seuraus                                                                                                                                                                                                                                                                                                                  |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Yksinäinen kirjoittaja                                 | Tehdä** ei** suorittaa useita replikoita samaa SQLite tiedostoa vastaan. Se turmelee DB.                                                                                                                                                                                                                                 |
| Luo uudelleen / käynnistä uudelleen / HEALTHCHECK kill | **Täysi katkos** lennon SSE, kojelautaistunnot ja muistitila. Jokainen yhdistetty asiakas putoaa. Uudet pyynnöt tyhjän päätepisteen ikkunan aikana saavat käänteisen välityspalvelimen**`502 Bad Gateway: Unknown error`** , ei OmniRoute JSON — -asiakkaat eivät voi erottaa tätä palveluntarjoajan virheestä (#11015). |
| Sama tapahtumasilmukka kuin `/healthz`                 | Kiireinen luettelo tai pakkausrasti voi viivyttää koettimia; lyhyen aikakatkaisun ja käynnistää sitten uudelleen** vain** kopio.                                                                                                                                                                                         |

**Anturin matriisi** (katso myös [Kubernetes-luotaimen suositukset](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ):

| Koetin         | Kohde                                                    | Älä käytä                                                                |
| -------------- | -------------------------------------------------------- | ------------------------------------------------------------------------ |
| Elävyyttä      | TCP on `PORT` (default `20128`), or soft HTTP `/healthz` | `/api/monitoring/health`                                                 |
| Valmius        | HTTP `GET /healthz`                                      | Tiukat aikakatkaisut, jotka pitävät tapahtumasilmukan kiirettä kuolleina |
| Syvä / ihmiset | `/api/monitoring/health`                                 | Automatisoitu kubelet-eloisuus                                           |

**Päivitykset:** odottaa jokaisen istunnon putoavan. Tyhjennä asiakkaat, jos voit; oletus- SQLite ssa ei ole jatkuvaa päivitystä. Kirjoita `restart: unless-stopped` plus Docker `HEALTHCHECK` korvaa myös ainoan prosessin, kun säiliö on Epäterveellinen — sama räjähdyssäde.

Valmiit luettelot ja Helm-kaavio reaaliaikaisesti `deploy/kubernetes/` ja `deploy/helm/omniroute/` — ssä katso [Kubernetes-käyttöopas](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

Kubernetes-katkelma a** yksi kopio** (Uudelleenluo vaaditaan; älä nosta `replicas` yhtä SQLite tiedostoa vastaan):

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

`preStop` sleep antaa kuben pudottaa palvelun päätepisteet ennen SIGTERM tä niin** uusi** liikenne lakkaa koskettamasta kuolettavaa prosessia. Lennon aikana `/v1/responses` SSE tyhjennetään `SHUTDOWN_TIMEOUT_MS` asti (oletus 30s) raskaan sarjan sisäänpääsyvuokrasopimuksilla (#11015). Uudet pyynnöt, jotka edelleen saavuttavat prosessin, saavat `503` + `Retry-After: 5`. Luo tyhjän päätepisteen väli uudelleen, kunnes korvaaminen on Valmis, pysyy kovana katkos —, joka on SQLite -topologia, ei mittausvirhe.

Ulkoinen Postgres / monikirjoitin HA on** ei** dokumentoitu osakepolku. Jos tarvitset HA, säilytä yksi replika tai suorita topologia, jonka projekti on testannut ja dokumentoinut erikseen. Postgres/MySQL -teos asuu [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Kunnes se toimitetaan, ainoa tuettu tapa kertoa** suuri** `/v1/responses` kapasiteetti on N itsenäistä prosessia (seuraava osa), ei `replicas > 1` yhdellä taltiolla.

## Scale-out: N itsenäistä prosessia

### Codex token rotation omistus

Yhden Codex tilin kopiot eivät saa kuluttaa itsenäisesti sen kertakäyttöistä päivitystunnusta. Tapauksissa, jotka kuluttavat vain synkronoituja tunnistetietoja, aseta `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (alias `cx`). Jätä se määrittämättä yhden kierron omistajalle. Jokainen prosessi tarvitsee edelleen oman `DATA_DIR`:n; tämä vaihtoehto ei jaa SQLite eikä tarjoa tunnuksen synkronointia tai hajautettua lukitusta.

Passiivinen ilmentymä lukee yhteyden uudelleen, kun päivitystä tarvitaan, ja ottaa käyttöön vain erilaisen, vanhentumattoman käyttöoikeustunnuksen. Muussa tapauksessa päivitys poistetaan käytöstä ilman, että yhteys vanhenee tai deaktivoidaan tai lasketaan päivityksen katkaisijan vika. Todellisissa alkupään todennusvirheissä käytetään edelleen normaalia vikalaskentaa, eksponentiaalista jäähdytystä ja normaalia asiakasvirhettä; tilin deaktivointi pysyy pysyvänä. Synkronoi omistajan kierretyt tunnukset ennen kuin käyttöoikeudet vanhenevat (oletusarvoinen ennakoiva päivitysjohto on viisi minuuttia) tai tuo Codex auth-tiedosto uudelleen. Passiivinen tuonti tallentaa toimitetut tunnukset vahvistamatta niitä tunnuksen päätepisteessä. Manuaalinen dashboard/API refresh palauttaa `409 refresh_disabled`; uudet OAuth -kirjautumiset ovat ennallaan. Katso [ympäristöviite](../reference/ENVIRONMENT.md#passive-codex-token-refresh).

One Node -prosessi on** yksi V8-kasa** . Kaksi päällekkäistä ~ 3 MiB / ~ 750k-tokenin koodausagenttia `POST /v1/responses` (RTK + Caveman) katkaisee keon ~ 12 Gi:ssä (`FATAL ERROR: Reached heap limit`) ja voi OOM 16 Gi:n c-ryhmän. Katso [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Tuo mitta on a** muisti-budjetti** varoitus, ei tuote hard-max kahdesta samanaikaisesta pitkästä `/v1/responses`. Raskaan keskustelun sisäänpääsy on aidattu automaattisesti johdetulla sisäänottotavubudjetilla (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), joka on mitattu samasta V8/cgroup katosta. — ohittaa sen ylöspäin (tai vanhan `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` -pyyntömäärärajan asettaminen) jo kokoiselle prosessille palauttaa keskeytyksen. Pienet chatit, `/healthz`, `/v1/models` ja MCP ovat** ei** tuossa korkissa.

### Yksi prosessi: yli kaksi pitkää `/v1/responses`

A** terveitä** prosessi (kaso `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`:n alapuolella, oletus `0.75`)** voi** ajaa enemmän kuin kaksi yhtäaikaista pitkää `POST /v1/responses`, kun prosessin laajuisessa inflight-tavubudjetissa (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) on vielä tilaa. `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (oletusarvo 256 KiB) tai sen yläpuolella olevat rungot ottavat saman raskaan sarjan vuokrasopimuksen kuin rakenteen vaativat pyynnöt ja käyttävät samaa [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` escape -poikkeamaa (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Kymmeniä samanaikaisia pitkiä SSE asiakkaita (operaattorit tarvitsevat usein 40–50) on a** muisti-budjetti** kysymys — koko kasa + primary/headroom paikat + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — ei kova "max 2" tuoteraja. Painettu kasa irtoaa edelleen uudelleenyritettävästä `503`, joten #7849 ei palaa.

Vastaanottaja** moninkertaistaa kasoja** (itsenäiset V8 vanhat tilat)** tänään** :

| Tehdä                                                                                                                                | Älä                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| Juokse** N containers/pods** , jokaisella sen kanssa** oma** `DATA_DIR` / tilavuus                                                   | Aseta `replicas > 1` yhtä SQLite tiedostoa vastaan                 |
| Koko raskas lennon aikana + terve päätila keon / lennon tavu budjetista; 1–2 on konservatiivinen #7849 oletusarvo, ei kova tuote max | Anna yhdelle prosessille 8 × RAM ja rajoittamaton määräraja        |
| Valinnainen: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` for** jaetut kiintiötaskurit**                                     | Käsittele Redis jaettuna SQLite — se ei ole sitä                   |
| Kopioi palveluntarjoajan salaisuudet jokaiseen esiintymään (tai hyväksy osioidut kojelautat)                                         | Odotettavissa on yksi kojelauta / yksi puheluloki eri esiintymissä |
| Edessä millä tahansa kuormantasauslaitteella; sticky by API -näppäin tai istunto riittää                                             | Vaadi toimittajakohtaista kokotietoista väliohjelmistoa            |

Istunnon ja tilin välinen affiniteetti voidaan jakaa myös Redis kautta: aseta `OMNIROUTE_SESSION_AFFINITY_STORE=redis` ja `REDIS_URL` jokaiselle prosessille samalla `REDIS_KEY_PREFIX` llä ja positiivisella `sessionAffinityTtlMs` asetuksella. Pin-koodit ratkaisevat tiivistetyt käyttötili-identiteetit kunkin prosessin kelvolliseen paikalliseen yhteyteen, joten OAuth -tileillä, joilla on vastaavat identiteetin metatiedot, ei tarvitse olla vastaavaa yhteyttä IDs. Tunnetut tili-identiteetit ovat etusijalla ristiriitaisiin paikallisiin IDs nähden nastan resoluutiossa ja vartioidussa häätössä; tietueet ilman henkilöllisyyttä (tai häätöpuhelut ilman henkilöllisyyttä) säilyttävät vanhan ID suojan. Tilit, joilla ei ole vakaata käyttöidentiteettiä, vaativat edelleen vastaavan IDs. Redis virheet tai 100 ms ylittävät puhelut palautuvat paikalliseen SQLite. Jokainen Redis -affiniteettikauppa rajoittaa erinomaiset toiminnot arvoon 8, ohittaa Redis heti, kun se on täynnä, ja vapauttaa paikat vain, kun taustalla oleva työ selviää, ei soittajan määräajan kuluessa. Redis -katkoksen aikana ei ole jaettua totuutta: jokainen ilmentymä palautuu omaan paikalliseen sukulaisuuteensa, istunnot voivat kiinnittyä uudelleen kerran ilmentymää kohti ja esiintymät voivat poiketa toisistaan. Tahmeus konvergoi uudelleen Redis kautta, kun se palautuu. Aikakatkaisu rajoittaa odottamista, ei lähetetty EVAL, joka voi laskeutua varauksen jälkeen. Reitityskirjoitukset vertaavat reitityspäätöksen havaitsemaa tarkkaa arvoa, eivät tuoretta mutaatioajan lukua; havaittu ohitus tai SQLite varahavainto verrataan puuttuvaksi Redis avaimeksi. Vanhentuneet nastat korvataan yhdessä CAS ssä, joten myöhäinen komento ei voi korvata tai poistaa uudempaa, erilaista nastaa. Redis lukee atomisesti palauttaa arvon ja jäljellä olevan palvelimen TTL; positiivinen PTTL (tai ei vanhenemista) määrittää elävyyden, ei kirjoittajan JSON aikaleima tai lukijan kello. Paikalliset tilannekuvat kartoittavat jäljellä olevan TTL paikalliseen määräaikaan; olemassa olevat JSON -avaimet pysyvät luettavissa ja niiden raakatavut säilytetään CAS lle. Redis on ainoa totuuden lähde, kun se vastaa. Vahvistetut jaetut virheet, kosketukset ja poistot poistavat paikallisen merkinnän, älä koskaan asenna tai päivitä sitä. SQLite Redis -polulla sisältää vain tämän ilmentymän omat varapäätökset Redis virheistä, aikakatkaisuista tai sisäänpääsyn kyllästymisestä, TTL-rajoitettuna kuten ennenkin. Puuttuva paikallinen PIN-koodi myöhemmän katkoksen yhteydessä maksaa yhden uuden valinnan (yksi välimuistin puuttuminen), ei väärästä tai häädystä tilistä. Hylätyt upserts palauttaa jaetun voittajan ja sen jäljellä olevan TTL atomimaisesti: tavallinen valinta tarkistaa uudelleen kartoitetun paikallisen määräajan ja käyttää edelleen elävää kelvollista voittajaa koskettaen kyseisen tilin käyttöä ja kirjaamista ilman toista jaettua kirjoitusta. Jos se ei ole käytettävissä, valinta säilyttää paikallisen ehdokkaan, jättää jaetun PIN-koodin ennalleen ja lähettää yhden virheenkorjausviestin. Hylätty CAS ei kirjoita SQLite; Redis virheet, aikakatkaisut tai pääsykylläisyys käyttävät sen sijaan olemassa olevaa paikallista toimintaa. Jos lähetetyn mutaation vastaus saapuu aikakatkaisun jälkeen (hyväksytty, hylätty tai virheellinen), synkroninen täsmällinen sarjoitetun arvon vertailu-ja-poisto poistaa vain tavuidenttisen aikakatkaisun vararivin. Tämän vertailun ja poistamisen välillä ei ole odottelua; uudempi katkoskirjoitus säilyy. Vartioitu häätö poistaa epäonnistuneen tilin oman paikallisen PIN-koodin, vaikka Redis on alhaalla, ja puhdistaa sen uudelleen vahvistetun jaetun häätön jälkeen. Odottavat aiemmat jaetut vastaukset eivät voi palauttaa häädettyä paikallista merkkiä, koska jaetut onnistumiset eivät koskaan kirjoita SQLite. Myöhempi käyttökatkos voi palauttaa tilin; myöhemmin hyväksytty jaettu kirjoitus on olemassa vain Redis ssä . Redis miss ei ota yhteyttä paikalliseen varatilaan. Kun ohjain on pois päältä, äskettäin valitut nastat säilyttävät vanhan nelikentän SQLite JSON -muodon; vain Redis reititys lisää tiivistetyn tilin identiteetin. Valmiiksi haetut nastat tarkistetaan uudelleen niiden vanhentumisrajalla. Redis ei-vuokrausvalinta lukee myymälän uudelleen, mutta synkronisessa vuokrasopimuksessa voidaan silti käyttää nastaa, joka on häädetty esihaun ja suunnittelun välillä (hyväksytty parhaan mahdollisen ikkuna). Vuokrasitoumus ei voi vaihtaa tiliä kestävän vaatimuksen jälkeen: hylätyssä lisäsitoumuksessa se säilyttää vain kyseisen pyynnön vaatiman ehdokkaan ja jättää jaetun voittajan koskemattomaksi, joten tapausten välinen sopimus on rajoitettu tälle polulle. Taulukon loput pätevät edelleen: tämä ei jaa yhdistelmäistunnon tarttuvuutta, alkuperäisiä Codex -käännösnastioita, tilin semaforeja, lukituksia, kulutusrajoja, konfiguraatioita tai puhelulokeja.

Laitteisto: esiintymää kohden samanaikainen pitkä `/v1/responses` on a** muisti-budjetti** kysymys (kasa + inflight-byte / #10110). `N` riippumattomat `DATA_DIR`:t kertovat edelleen kasoista: isäntä RAM on katettava `N × cgroup`, ei "yksi 16 Gi pod, jossa on N = 8". Älä koskaan `replicas > 1` yhdessä SQLite tiedostossa.

Luo luonnos (kaksi kasaa, kaksi osaa — ei `deploy.replicas: 2`):

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

Prosessinaikainen tiheys (puristus pois HTTP isolaatista) on [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Yksi looginen klusteri jaetussa kestävässä tilassa on [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

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
