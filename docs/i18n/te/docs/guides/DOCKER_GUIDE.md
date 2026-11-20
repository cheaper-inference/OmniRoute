# 🐳 Docker Guide — OmniRoute (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> సంపూర్ణ Docker డిప్లాయ్మెంట్ సూచన. త్వరగా ప్రారంభించడానికి, [READMEలోని Docker విభాగాన్ని](../README.md#-docker) చూడండి.

## విషయ సూచిక

- [త్వరిత అమలు](#quick-run)
- [ఎన్విరాన్మెంట్ ఫైల్తో](#with-environment-file)
- [Docker Compose](#docker-compose)
- [అందుబాటులో ఉన్న ప్రొఫైల్లు](#available-profiles)
- [OmniRoute Dockerలో నడుస్తున్నప్పుడు హోస్ట్ CLI సాధనాలను కాన్ఫిగర్ చేయడం](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis సైడ్కార్](#redis-sidecar)
- [ప్రొడక్షన్ Compose](#production-compose)
- [Dockerfile దశలు](#dockerfile-stages)
- [కీలక ఎన్విరాన్మెంట్ వేరియబుల్స్](#critical-environment-variables)
- [Caddy (HTTPS)తో Docker Compose](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare త్వరిత టన్నెల్](#cloudflare-quick-tunnel)
- [ఇమేజ్ ట్యాగ్లు](#image-tags)
- [Dockerలో డ్యాష్బోర్డ్ అప్డేట్లు](#dashboard-updates-in-docker)
- [లభ్యత: డిఫాల్ట్ SQLite ఒకే రెప్లికాకు పరిమితం](#availability-default-sqlite-is-single-replica)
- [Dockerలో Gemini ప్రాంతీయ లోపాలు](#gemini-regional-errors-inside-docker)
- [ముఖ్యమైన గమనికలు](#important-notes)

---

## త్వరిత పరుగు

> **ఒక కమాండ్లో స్వీయ-హోస్ట్ చేయాలా?** [స్వీయ-హోస్ట్ గైడ్](../getting-started/SELF_HOST_GUIDE.md) — `docker compose -f docker-compose.selfhost.yml up -d` (ప్రచురించబడిన చిత్రం + Redis, లూప్బ్యాక్-మాత్రమే, ప్రొఫైల్ ఎంపిక లేదు) చూడండి. దిగువన ఉన్న క్విక్ రన్ అనేది ఇప్పటికే ఇతర చోట్ల Redis అమలు చేస్తున్న వినియోగదారుల కోసం సింగిల్-కంటైనర్ మార్గం.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## పర్యావరణ ఫైల్తో

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
# బేస్ ప్రొఫైల్ (CLI సాధనాలు లేవు)
docker compose --profile base up -d

# CLI ప్రొఫైల్ (Claude Code, Codex, OpenClaw అంతర్నిర్మితంగా ఉంటాయి)
docker compose --profile cli up -d

# హోస్ట్ ప్రొఫైల్ (ప్రధానంగా Linux కోసం; హోస్ట్ CLI బైనరీలను చదవడానికి మాత్రమే మౌంట్ చేస్తుంది)
docker compose --profile host up -d

# వెబ్ ప్రొఫైల్ (వెబ్-సెషన్ ప్రొవైడర్ల కోసం Chromium/Playwright)
docker compose --profile web up -d

# CLI + CLIProxyAPI సైడ్కార్ను కలిపి ఉపయోగించండి
docker compose --profile cli --profile cliproxyapi up -d
```

## అందుబాటులో ఉన్న ప్రొఫైల్లు

ప్రధాన డిప్లాయ్మెంట్ విధానాల కోసం OmniRouteలో Compose ప్రొఫైల్లు ఉంటాయి. మీ ఎన్విరాన్మెంట్కు సరిపోయేదాన్ని ఎంచుకోండి.

| ప్రొఫైల్          | సర్వీస్          | ఎప్పుడు ఉపయోగించాలి                                                                                                                                          | కమాండ్                                       |
| ----------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `base` (డిఫాల్ట్) | `omniroute-base` | హెడ్లెస్ సర్వర్ / కనిష్ఠ రన్టైమ్, ప్రొవైడర్ CLIలు బండిల్ చేయబడవు                                                                                             | `docker compose --profile base up -d`        |
| `cli`             | `omniroute-cli`  | `omniroute providers/setup/doctor` మరియు బండిల్ చేసిన CLIలను (Codex, Claude Code, Droid, OpenClaw) ఉపయోగించే ఏజెంటిక్ వర్క్ఫ్లోలు                            | `docker compose --profile cli up -d`         |
| `host`            | `omniroute-host` | `~/.local/bin`, `~/.codex`, `~/.claude` మొదలైనవాటిని చదవడానికి మాత్రమే మౌంట్ చేయడం ద్వారా హోస్ట్ CLIలకు `network_mode` తరహా యాక్సెస్ కోరుకునే Linux హోస్ట్లు | `docker compose --profile host up -d`        |
| `cliproxyapi`     | `cliproxyapi`    | అప్స్ట్రీమ్ CLI ప్రాక్సీయింగ్ కోసం [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) సైడ్కార్ను `8317` పోర్ట్లో అమలు చేయండి                        | `docker compose --profile cliproxyapi up -d` |
| `web`             | `omniroute-web`  | బ్రౌజర్ అవసరమయ్యే వెబ్-సెషన్ ప్రొవైడర్లు: `gemini-web`, `claude-web`, `claude-turnstile` (`runner-web`ను బిల్డ్ చేస్తుంది, Chromium చేర్చబడింది)             | `docker compose --profile web up -d`         |

> అనేక ప్రొఫైల్లను కలిపి ఉపయోగించవచ్చు: `docker compose --profile cli --profile cliproxyapi up -d`.

## OmniRoute Dockerలో నడుస్తున్నప్పుడు హోస్ట్ CLI సాధనాలను కాన్ఫిగర్ చేయడం

`omniroute setup-codex`, `setup-claude`, `config set <tool>` మరియు డ్యాష్బోర్డ్లోని
**కాన్ఫిగ్ను సేవ్ చేయండి** బటన్ అన్నీ `~/.codex/*.config.toml` వంటి ఫైళ్లను వ్రాస్తాయి. ఆ పాత్లకు
CLI వాస్తవంగా నడిచే మెషీన్లో మాత్రమే అర్థం ఉంటుంది. వాటిని కంటైనర్లో
అమలు చేస్తే, రైట్ కంటైనర్ సొంత హోమ్లో (`/home/node` —
ఇమేజ్ `USER node`గా నడుస్తుంది) జరుగుతుంది. దాన్ని ఏ హోస్ట్ CLI కూడా ఎప్పటికీ చదవదు,
కంటైనర్ను మళ్లీ సృష్టించిన వెంటనే అది తొలగిపోతుంది.

OmniRoute దీన్ని గుర్తించి, మీరు ఉపయోగించలేని విజయాన్ని నివేదించడానికి బదులుగా
సూచనలతో రైట్ను తిరస్కరిస్తుంది: CLI `2`తో నిష్క్రమిస్తుంది, API `422`తో
`containerEphemeralTarget: true` అని సమాధానమిస్తుంది.

### సిఫార్సు: CLIని హోస్ట్పై, OmniRouteని Dockerలో అమలు చేయండి

కంటైనర్ APIని అందిస్తుంది; CLI మీ హోస్ట్ సాధనాలను కాన్ఫిగర్ చేస్తుంది.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLIని కంటైనర్కు అనుసంధానించండి
omniroute setup-codex                      # మీ హోస్ట్లోని అసలు ~/.codexకు వ్రాస్తుంది
```

Codex, Claude Code, Cursor లేదా ఇలాంటి సాధనాలు మీ
ల్యాప్టాప్లో నడుస్తున్నప్పుడు ఇదే సరైన ఎంపిక — సాధారణంగా ఉపయోగించే సెటప్ ఇదే.

### ప్రత్యామ్నాయం: హోస్ట్ కాన్ఫిగ్ డైరెక్టరీలను బైండ్-మౌంట్ చేయండి (`host` ప్రొఫైల్)

కంటైనర్ స్వయంగా మీ హోస్ట్ కాన్ఫిగ్ను వ్రాయాలని మీరు కోరుకుంటే,
డైరెక్టరీలను మౌంట్ చేసి, `CLI_CONFIG_HOME`ను మౌంట్ రూట్కు సూచించేలా చేయండి. `host` ప్రొఫైల్
ఇప్పటికే ఇలా చేస్తుంది:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

బైండ్ మౌంట్ వల్లే పాత్ను విశ్వసించవచ్చు: OmniRoute
`/proc/self/mountinfo`ను చదివి, మౌంట్ చేసిన పాత్లకు (అలాగే వాటి చైల్డ్ డైరెక్టరీలు
మౌంట్లుగా ఉన్న డైరెక్టరీలకు — పైన ఉన్న `/host-home` నిర్మాణం సరిగ్గా ఇదే) రైట్లను అనుమతిస్తుంది;
అదే సమయంలో మౌంట్ చేయని పాత్లను మాత్రం తిరస్కరిస్తూనే ఉంటుంది.

### ప్రత్యామ్నాయ మార్గం: కంటైనర్ సొంత CLIలను కాన్ఫిగర్ చేయండి (అత్యవసరమైతే మాత్రమే)

CLIలు నిజంగానే కంటైనర్లో ఉన్నప్పుడు (`cli` ప్రొఫైల్), రైట్
ఉద్దేశపూర్వకమైనదే. ఏదైనా `setup-*` కమాండ్కు `--allow-container-write`ను పంపండి లేదా
సర్వర్ కోసం `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true`ను సెట్ చేయండి. కంటైనర్
తొలగిపోయిన తర్వాత రైట్ నిలిచి ఉండదనే హెచ్చరికతో అది కొనసాగుతుంది.

> **భద్రతా హెచ్చరిక — `cli` ప్రొఫైల్ + `docker.sock` మౌంట్.**
> కంటైనర్లోని ఆటో-అప్డేటర్ హోస్ట్ డీమన్ నుంచి స్టాక్ను మళ్లీ సృష్టించగలిగేలా
> `cli` ప్రొఫైల్ `/var/run/docker.sock`ను బైండ్-మౌంట్ చేస్తుంది
> (`src/lib/system/autoUpdate.ts` ఆ సాకెట్ కోసం తనిఖీ చేసి, అది లేనప్పుడు
> Docker పాత్ను దాటవేస్తుంది). ఆ సాకెట్ **హోస్ట్-root విశ్వాస
> సరిహద్దు**: దాన్ని యాక్సెస్ చేయగల ఏదైనా, హోస్ట్ Docker డీమన్ను
> rootగా నియంత్రించగలదు — అది హోస్ట్లోని ఏ కంటైనర్నైనా సృష్టించగలదు, పరిశీలించగలదు,
> ఆపగలదు మరియు తొలగించగలదు. దీని ప్రభావాలు:
>
> 1. **`cli` ప్రొఫైల్ పోర్ట్ను నెట్వర్క్కు ఎప్పుడూ బహిర్గతం చేయవద్దు.**
>    దాన్ని `127.0.0.1`పై ప్రచురించండి (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — LAN నుంచి యాక్సెస్ చేయగల `cli` ప్రొఫైల్, డ్యాష్బోర్డ్-స్థాయి RCE ఏదైనా
>    పూర్తి హోస్ట్ రాజీగా మారేలా చేస్తుంది.
> 2. **`cli` ప్రొఫైల్లోకి అదనపు హోస్ట్ డైరెక్టరీలను బైండ్ చేయవద్దు.**
>    Docker సాకెట్తో పాటు మరేదైనా అదనపు మౌంట్ ఉంటే, అది కంటైనర్కు మీ
>    ఫైల్సిస్టమ్ మరియు హోస్ట్ కాన్ఫిగ్పై పూర్తి రీడ్/రైట్ యాక్సెస్ ఇస్తుంది. ఒక సాధనం
>    ప్రాజెక్ట్ను చూడాల్సి ఉంటే, దాన్ని CLI బైనరీతో లోకల్గా అమలు చేయండి — దాన్ని
>    `cli` కంటైనర్లోకి మౌంట్ చేయవద్దు.
>
> కంటైనర్లో ఆటో-అప్డేట్ అవసరం లేకపోతే, `cli` ప్రొఫైల్ను ఆఫ్లోనే ఉంచండి
> (`COMPOSE_PROFILES=core,redis` లేదా అంతకంటే సంక్షిప్తంగా). ఇతర ప్రొఫైల్లు
> Docker సాకెట్ను మౌంట్ చేయవు.
>
> MITMకు సంబంధించిన ముప్పు నమూనా కోసం `docs/security/MITM-TPROXY-DECRYPT.md`ను
> (gitలో ఉంది; `/docs`లోకి కంపైల్ చేయబడలేదు), అలాగే
> `codex`/`claude-code`/`droid`/`openclaw` బైనరీ మూలాధార గొలుసు కోసం
> `docs/security/SUPPLY_CHAIN.md`ను చూడండి.

## Redis సైడ్కార్

పంపిణీ చేయబడిన రేట్ లిమిటర్ మరియు షేర్డ్ క్యాష్కు మద్దతుగా OmniRoute, Redisపై ఆధారపడుతుంది. `docker-compose.yml`లో `redis` సర్వీస్ **ఎల్లప్పుడూ నిర్వచించబడి ఉంటుంది** (దీనికి ప్రొఫైల్ గేట్ లేదు), అలాగే ఇది ఏ ఇతర ప్రొఫైల్తోనైనా ప్రారంభమవుతుంది.

| వివరాలు                  | విలువ                                      |
| ------------------------ | ------------------------------------------ |
| ఇమేజ్                    | `redis:7-alpine`                           |
| కంటైనర్ పేరు             | `omniroute-redis`                          |
| అంతర్గత పోర్ట్           | `6379`                                     |
| హోస్ట్ పోర్ట్ (ఓవర్రైడ్) | `REDIS_PORT` (డిఫాల్ట్గా `6379`)           |
| హోస్ట్ బైండ్ (ఓవర్రైడ్)  | `REDIS_BIND_HOST` (డిఫాల్ట్గా `127.0.0.1`) |
| వాల్యూమ్                 | `omniroute-redis-data` → `/data`           |
| హెల్త్చెక్               | `redis-cli ping` (10s విరామం)              |

సంబంధిత ఎన్విరాన్మెంట్ వేరియబుల్స్:

- `REDIS_URL` — యాప్లోకి ఇంజెక్ట్ చేయబడే కనెక్షన్ స్ట్రింగ్ (డిఫాల్ట్గా `redis://redis:6379`).
- `REDIS_PORT` — Redis కంటైనర్ కోసం హోస్ట్-వైపు పోర్ట్ మ్యాపింగ్.
- `REDIS_BIND_HOST` — పోర్ట్ ప్రచురించబడే హోస్ట్ ఇంటర్ఫేస్. డిఫాల్ట్గా `127.0.0.1`.

> **డిఫాల్ట్గా లూప్బ్యాక్ ఎందుకు:** సైడ్కార్ `requirepass` లేకుండా నడుస్తుంది, అలాగే యాప్
> కంటైనర్లు కంపోజ్ నెట్వర్క్ (`redis:6379`) ద్వారా దాన్ని చేరుకుంటాయి — ప్రచురించిన పోర్ట్
> హోస్ట్-వైపు టూలింగ్ (`redis-cli`, స్థానిక `npm run dev`) కోసం మాత్రమే ఉంటుంది. `0.0.0.0`పై
> ప్రచురించడం వల్ల ప్రామాణీకరణ లేని Redis మీ LANలోని ప్రతి హోస్ట్కు బహిర్గతమవుతుంది. మీరు
> `REDIS_BIND_HOST=0.0.0.0`ను సెట్ చేస్తే, సర్వీస్ `command:`కు `--requirepass`ను కూడా జోడించండి.

**Redisను నిలిపివేయడం** సిఫార్సు చేయబడదు (రేట్ లిమిటర్ ఇన్-మెమరీ ఫాల్బ్యాక్కు దిగజారుతుంది). తప్పనిసరి అయితే, `docker-compose.yml`లోని `redis:` సర్వీస్ బ్లాక్ను తొలగించండి/కామెంట్ చేయండి లేదా దాన్ని సున్నాకు స్కేల్ చేయండి:

```bash
docker compose up -d --scale redis=0
```

## ప్రొడక్షన్ కంపోజ్

డెవ్తో పాటు నడిచే ఐసోలేటెడ్ ప్రొడక్షన్ స్నాప్షాట్ కోసం, `docker-compose.prod.yml`ను ఉపయోగించండి.

| వివరాలు                      | విలువ                                                                                        |
| ---------------------------- | -------------------------------------------------------------------------------------------- |
| ఫైల్                         | `docker-compose.prod.yml`                                                                    |
| డిఫాల్ట్ డ్యాష్బోర్డ్ పోర్ట్ | `PROD_DASHBOARD_PORT=20130` (అంతర్గత `${DASHBOARD_PORT:-20128}`కు మ్యాప్ చేయబడుతుంది)        |
| డిఫాల్ట్ API పోర్ట్          | `PROD_API_PORT=20131`                                                                        |
| ఇమేజ్                        | `omniroute:prod` (`runner-cli` టార్గెట్ నుండి బిల్డ్ చేయబడింది)                              |
| Redis కంటైనర్                | `omniroute-redis-prod` (`redis:8.6.2`, ప్రత్యేక `redis-prod-data` వాల్యూమ్)                  |
| డేటా వాల్యూమ్                | `omniroute-prod-data` (పేరుతో నిర్వచించబడింది, రీబిల్డ్ల మధ్య నిల్వ చేయబడుతుంది)             |
| హెల్త్చెక్లు                 | `node healthcheck.mjs` + `redis-cli ping`, Redis ఆరోగ్య స్థితిపై గేట్ చేయబడిన `depends_on`తో |

ఉపయోగించే విధానం:

```bash
# ప్రొడక్షన్ స్టాక్ను బిల్డ్ చేసి ప్రారంభించండి
docker compose -f docker-compose.prod.yml up -d --build

# లాగ్లను స్ట్రీమ్ చేయండి
docker compose -f docker-compose.prod.yml logs -f

# నిలిపివేయండి (వాల్యూమ్లను ఉంచండి)
docker compose -f docker-compose.prod.yml down
```

ప్రొడ్ స్టాక్ డెవ్ కంపోజ్కు సమాంతరంగా నడుస్తుంది (వేర్వేరు కంటైనర్ పేర్లు, పోర్ట్లు మరియు వాల్యూమ్లతో), కాబట్టి ప్రొడక్షన్ నడుస్తూనే ఉండగా మీరు స్థానికంగా మార్పులు చేస్తూ కొనసాగవచ్చు.

## డాకర్ఫైల్ దశలు

రిపోజిటరీ బహుళ-దశల డాకర్ఫైల్ (`Dockerfile`)ను రవాణా చేస్తుంది. నాలుగు దశలు బహిర్గతమవుతాయి; మీ వినియోగ కేసు కోసం సరైన `target` ఎంచుకోండి.

| వేదిక         | బేస్ చిత్రం           | ప్రయోజనం                                                                                                                                                                                                                                                                                                      |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | deps (`npm ci --legacy-peer-deps`)ని ఇన్స్టాల్ చేస్తుంది మరియు `npm run build` (Turbopack డిఫాల్ట్గా — ని అమలు చేస్తుంది, దిగువ బిల్డ్-టైమ్ వనరులను చూడండి)                                                                                                                                                   |
| `runner-base` | `node:26-trixie-slim` | Next.js స్వతంత్ర అవుట్పుట్తో ఉత్పత్తి రన్టైమ్.** ప్రొవైడర్ CLIs బండిల్ చేయబడలేదు.**                                                                                                                                                                                                                           |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose` మరియు గ్లోబల్ CLIs జోడిస్తుంది: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`.** ఏజెంట్ వర్క్ఫ్లోల కోసం దీన్ని ఎంచుకోండి.**                                                                                                                          |
| `runner-web`  | `runner-base`         | వెబ్ సెషన్ ప్రొవైడర్ల కోసం Playwright + ఒక Chromium బ్రౌజర్ (`--with-deps`) జోడిస్తుంది: `gemini-web`, `claude-web`, `claude-turnstile`.** మీరు ఆ ప్రొవైడర్లను ఉపయోగించినప్పుడు దీన్ని ఎంచుకోండి** — సాదా చిత్రం అది లేకుండా అభ్యర్థన సమయంలో విఫలమవుతుంది (విడుదల ఛానెల్ల క్రింద ఉన్న `-web` గమనికను చూడండి). |

మాన్యువల్గా నిర్దిష్ట లక్ష్యాన్ని రూపొందించండి:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### బిల్డ్-టైమ్ వనరులు

మూడు బిల్డ్ ఆర్గ్లు `builder` స్టేజ్ ధరలను నియంత్రిస్తాయి. అవి బిల్డ్-టైమ్ మాత్రమే — `OMNIROUTE_MEMORY_MB` (క్రింద) అనేది ప్రత్యేక, రన్టైమ్ నాబ్.

| బిల్డ్ ఆర్గ్                | డిఫాల్ట్ | ప్రభావం                                                                                              |
| --------------------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`      | `0` వెబ్ప్యాక్తో నిర్మిస్తుంది: తక్కువ పీక్ మెమరీ, నెమ్మదిగా ఉంటుంది. `1` Turbopack ని ఎంచుకుంటుంది. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`   | పుట్టుకొచ్చిన `next build` కోసం V8 హీప్ సీలింగ్ (`--max-old-space-size`).                            |
| `OMNIROUTE_BUILD_WORKERS`   | `2`      | ఫీడ్స్ `CIRCLE_NODE_TOTAL`; తదుపరిది పేజీ-డేటా సేకరణ కోసం `workers = N - 1` పొందింది.                |

`OMNIROUTE_BUILD_WORKERS` అనేది ఒక పెద్ద బిల్డర్పై పెంచడానికి మరియు నిర్బంధిత నిర్మాణం చనిపోయినప్పుడు అనుమానించాల్సిన వ్యక్తి** తర్వాత** `✓ Compiled successfully`. ప్రతి పేజీ-డేటా వర్కర్ దాని స్వంత ప్రక్రియ, అలాగే పేరెంట్ `next build` కూడా; ప్రత్యక్ష VPS పునరుత్పత్తి (ఇష్యూ #7518) `NODE_OPTIONS` హీప్ ఫ్లాగ్తో సంబంధం లేకుండా ~ 4.5 GB వద్ద ప్రతి ప్రక్రియ యొక్క గరిష్ట RSS కొలుస్తుంది (Turbopack V8 హీప్ వెలుపల native/Rust మెమరీలో కంపైల్ చేస్తుంది). పబ్లిష్ పైప్లైన్ ఉపయోగించే 16 GB / 4 vCPU GitHub-హోస్ట్ రన్నర్ల కోసం `2` డిఫాల్ట్ (→ 1 వర్కర్, మొత్తం 2 ప్రక్రియలు) పరిమాణంలో ఉంటుంది. `8` (→ 7 కార్మికులు) వద్ద ఆ రన్నర్ మెమరీ అయిపోయింది మరియు బిల్డ్కిట్ `ResourceExhausted: ... cannot allocate memory` తో స్టెప్లో విఫలమైంది; `3` (→ 2 వర్కర్లు) ప్రతి-ప్రాసెస్ RSS ని ఊహించిన బదులు నేరుగా కొలిచిన తర్వాత ఇప్పటికీ సరిపోలేదు. `tests/unit/docker-build-memory-budget.test.ts` కొలిచిన ఫిగర్కు వ్యతిరేకంగా అంకగణితాన్ని చేస్తుంది మరియు నాబ్ రన్నర్ను మించిపోయినట్లయితే విఫలమవుతుంది.

Turbopack నివసించే స్థానిక రస్ట్ మెమరీలో కంపైల్ చేస్తుంది** బయట** V8 హీప్, కాబట్టి `OMNIROUTE_BUILD_MEMORY_MB` దానిని బంధించదు. మెమరీ సీలింగ్తో హోస్ట్పై OOM కిల్లర్ ద్వారా బిల్డ్ SIGKILLed చేయబడుతుంది, — ఎటువంటి ఎర్రర్ టెక్స్ట్ లేకుండా అది కేవలం మిడ్-`Creating an optimized production build` ఆపివేస్తుంది, ఇది మెమరీలో కాకుండా హ్యాంగ్ లాగా ఉంటుంది. అందుకే `Dockerfile` డిఫాల్ట్గా వెబ్ప్యాక్ (`OMNIROUTE_USE_TURBOPACK=0`), `npm run dev` / `npm run build` వలె కాకుండా, Turbopack కోడ్ డిఫాల్ట్గా ఉంటుంది: బిల్డ్ ఆర్గ్లు లేని బేర్ `docker build .` (రైల్వే మరియు ఇతర ఒక-క్లిక్ హోస్ట్లు రన్ చేసేవి) మెమరీ-క్యాప్డ్ బిల్డర్పై నిశ్శబ్దంగా చనిపోకూడదు. ప్రచురించబడిన చిత్రాలు ఇప్పటికే `docker-publish.yml` లో స్పష్టంగా `OMNIROUTE_USE_TURBOPACK=0` దాటిపోయాయి. RAM పుష్కలంగా ఉన్న బిల్డర్లో, వేగవంతమైన బిల్డ్ కోసం Turbopack ని ఎంచుకోండి:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` ప్రారంభించబడింది, కాబట్టి `next build` పేరెంట్ని నడుపుతుంది** మరియు** ఒక కార్మిక ప్రక్రియ మరియు ప్రతి ఒక్కటి `OMNIROUTE_BUILD_MEMORY_MB` విడివిడిగా గౌరవిస్తుంది. కంటెయినర్ సీలింగ్ పరిమాణం దాని విలువ కంటే దాదాపు రెండు రెట్లు ఎక్కువ, ఒకసారి కాదు.

ఈ చెట్టుపై కొలుస్తారు (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| బండ్లర్    | కంటైనర్ సీలింగ్ | ఫలితం                                                 |
| ---------- | --------------- | ----------------------------------------------------- |
| Turbopack  | 8 GiB / 16 GiB  | OOM-నిశ్శబ్దంగా ఇద్దరి వద్ద చంపబడ్డాడు                |
| వెబ్ప్యాక్ | 8 GiB           | బిల్డ్ వర్కర్ SIGKILLed                               |
| వెబ్ప్యాక్ | 12 GiB          | విజయవంతమైంది, 11.1 GiB వద్ద గరిష్ట స్థాయికి చేరుకుంది |

### రన్టైమ్ డిఫాల్ట్లు

`runner-base` ద్వారా ఎగుమతి చేయబడిన డిఫాల్ట్లు: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Docker లో మెమరీ ప్రవర్తన:

- చిత్రం `OMNIROUTE_MEMORY_MB=1024` సెట్ చేస్తుంది మరియు దాని నుండి `NODE_OPTIONS=--max-old-space-size=1024` పొందింది.
- అసలైన సర్వర్ ప్రక్రియ స్వతంత్ర లాంచర్ ద్వారా ప్రారంభించబడింది, ఇది `OMNIROUTE_MEMORY_MB` చదివి `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` జతచేస్తుంది.
- నోడ్ చివరిగా పునరావృతమయ్యే `--max-old-space-size` విలువను ఉపయోగిస్తుంది, కాబట్టి `OMNIROUTE_MEMORY_MB` సెట్ చేయడం ప్రభావవంతమైన Docker హీప్ పరిమితిని నియంత్రిస్తుంది.
- చిత్రం ఎల్లప్పుడూ దీన్ని సెట్ చేస్తుంది కాబట్టి, లాంచర్ యొక్క స్వంత RAM-కాలిబ్రేటెడ్ ఫాల్బ్యాక్ ఎప్పుడూ Docker కింద వర్తించదు. పనిభారం (క్రింద పట్టిక) కోసం దీన్ని స్పష్టంగా పెంచండి. కోడింగ్-ఏజెంట్ `/v1/responses` కోసం `2048` ఇప్పటికీ చాలా చిన్నది.

### కోడింగ్ ఏజెంట్ల కోసం రన్టైమ్ RAM

1 GiB Docker డిఫాల్ట్ అనేది dashboard/light-chat ఫ్లోర్, ఉత్పత్తి పరిమాణం కాదు. పొడవాటి `POST /v1/responses` వస్తువులు (వందలాది సందేశాలు, పదుల సంఖ్యలో సాధనాలు) కుదింపు సమయంలో బహుళ ఇన్-మెమరీ గ్రాఫ్లను కలిగి ఉంటాయి. రెండు అతివ్యాప్తి చెందుతున్న ~ 3 MiB / ~ 750k-టోకెన్ అభ్యర్థనలు ఒక సమయంలో V8ని రద్దు చేశాయి** 12 GiB** పాత-స్పేస్ (`FATAL ERROR: Reached heap limit`) మరియు 16 GiB cgroup OOM ని కూడా కొట్టండి. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) చూడండి.

పరిమాణం** కుప్ప పైన cgroup `--memory`** — స్థానిక బఫర్లు, SQLite మరియు కంప్రెషన్ ఇంటర్మీడియట్లు V8 వెలుపల కూర్చుంటాయి.

| పనిభారం                               | `OMNIROUTE_MEMORY_MB`    | కంటైనర్ / cgroup      | గమనికలు                                                                                             |
| ------------------------------------- | ------------------------ | --------------------- | --------------------------------------------------------------------------------------------------- |
| డ్యాష్బోర్డ్, ఒక తేలికపాటి చాట్       | `1024` (చిత్రం డిఫాల్ట్) | ≥2 GiB                |                                                                                                     |
| ఒక కోడింగ్ ఏజెంట్ (Claude/Codex/Grok) | `8192`                   | ≥10 GiB               | సాధారణ సింగిల్-సెషన్ `/v1/responses`                                                                |
| రెండు ఏకకాల పొడవైన `/v1/responses`    | `10240`–`12288`          | ≥12–16 GiB            | ~ 12 GiB హీప్లో V8 అబార్ట్ను కొలిచారు                                                               |
| మూడు+ ఏకకాల పొడవైన సందర్భాలు          | ఒక ప్రక్రియలో చేయవద్దు   | సీరియలైజ్ / మరింత RAM | డిఫాల్ట్ హెవీవెయిట్ అడ్మిషన్ 1 ఇన్-ఫ్లైట్; RAM లేకుండా పెంచడం వల్ల అబార్ట్ను మళ్లీ పరిచయం చేస్తుంది |

బేర్ మెటల్పై`omniroute serve` `OMNIROUTE_MEMORY_MB` ఉన్నప్పుడు ~ 35% RAM (బిగించబడిన `[512, 4096]`)ని క్రమాంకనం చేస్తుంది** సెట్ చేయబడలేదు** . Docker ఎల్లప్పుడూ `1024` సెట్ చేస్తుంది, తద్వారా క్రమాంకనం అధికారిక ఇమేజ్లో ఎప్పుడూ అమలు చేయబడదు.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
```

## కీలకమైన ఎన్విరాన్మెంట్ వేరియబుల్స్

[ENVIRONMENT.md](../reference/ENVIRONMENT.md)లో డాక్యుమెంట్ చేసిన డిఫాల్ట్లకు అదనంగా, Docker కింద అమలు చేస్తున్నప్పుడు కింది వేరియబుల్స్ అత్యంత ముఖ్యమైనవి:

| వేరియబుల్                     | ప్రయోజనం                                                                                                                                                                                                                                                                      | డిఫాల్ట్                   |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket బ్రిడ్జ్ కోసం భాగస్వామ్య రహస్యం. **ప్రొడక్షన్లో తప్పనిసరి** — దీన్ని బలమైన యాదృచ్ఛిక స్ట్రింగ్గా సెట్ చేయండి.                                                                                                                                                       | సెట్ చేయబడలేదు (అందించాలి) |
| `REDIS_URL`                   | రేట్ లిమిటర్ / క్యాష్ బ్యాకెండ్ కోసం కనెక్షన్ స్ట్రింగ్                                                                                                                                                                                                                       | `redis://redis:6379`       |
| `REDIS_PORT`                  | చేర్చబడిన Redis కంటైనర్ కోసం హోస్ట్-వైపు పోర్ట్                                                                                                                                                                                                                               | `6379`                     |
| `REDIS_BIND_HOST`             | చేర్చబడిన Redis పోర్ట్ ప్రచురించబడే హోస్ట్ ఇంటర్ఫేస్ (మీరు AUTH జోడించకపోతే లూప్బ్యాక్)                                                                                                                                                                                       | `127.0.0.1`                |
| `AUTO_UPDATE_HOST_REPO_DIR`   | స్వీయ-అప్డేట్ వర్క్ఫ్లోల కోసం `/workspace/omniroute` వద్ద `cli` ప్రొఫైల్లో మౌంట్ చేయబడే హోస్ట్ పాత్                                                                                                                                                                           | `.` (ప్రస్తుత డైరెక్టరీ)   |
| `OMNIROUTE_MEMORY_MB`         | Docker స్వతంత్ర సర్వర్ కోసం రన్టైమ్ Node హీప్ గరిష్ఠ పరిమితి; పైన పేర్కొన్న ఇమేజ్ డిఫాల్ట్ను భర్తీ చేస్తుంది. కోడింగ్ ఏజెంట్లు: `8192`+ ([రన్టైమ్ RAM](#runtime-ram-for-coding-agents) చూడండి).                                                                               | `1024`                     |
| `DASHBOARD_PORT` / `API_PORT` | డాష్బోర్డ్ (20128) మరియు API (20129) కోసం బహిర్గతం చేసిన పోర్ట్లను భర్తీ చేస్తుంది                                                                                                                                                                                            | `20128` / `20129`          |
| `APP_BIND_HOST`               | docker-compose డాష్బోర్డ్/API/live-WS పోర్ట్లను ప్రచురించే హోస్ట్ ఇంటర్ఫేస్. `REQUIRE_API_KEY=false` (డిఫాల్ట్)తో, `0.0.0.0` అనామక `/v1` ప్రాక్సీని LANకు బహిర్గతం చేస్తుంది — `REQUIRE_API_KEY=true` ఉన్నప్పుడు లేదా ముందు రివర్స్ ప్రాక్సీ ఉన్నప్పుడు మాత్రమే విస్తరించండి. | `127.0.0.1`                |
| `CLIPROXY_BIND_HOST`          | docker-compose `cliproxyapi` సైడ్కార్ను ప్రచురించే హోస్ట్ ఇంటర్ఫేస్ — దాని డేటా వాల్యూమ్ ప్రొవైడర్ క్రెడెన్షియల్స్ను కలిగి ఉంటుంది.                                                                                                                                           | `127.0.0.1`                |
| `OMNIROUTE_PLUGINS_DIR`       | రన్టైమ్ ప్లగిన్ స్కానర్ చదివే మరియు ఇన్స్టాల్ చేసే డైరెక్టరీ. ప్లగిన్లు బైండ్-మౌంట్ చేయబడినప్పుడు దీన్ని సెట్ చేయండి: డిఫాల్ట్ `HOME`ను అనుసరిస్తుంది, అయితే ఇమేజ్ దాన్ని ఎక్స్పోర్ట్ చేయాల్సిన అవసరం లేదు.                                                                   | `~/.omniroute/plugins`     |
| `OMNIROUTE_BASE_PATH`         | యాప్ రివర్స్ ప్రాక్సీ వెనుక ప్రచురించబడినప్పుడు ఉపయోగించే URL సబ్పాత్ (ఉదా. `/omniroute`)                                                                                                                                                                                     | _(ఖాళీ = రూట్)_            |
| `NEXT_PUBLIC_BASE_URL`        | సబ్పాత్తో సహా పబ్లిక్ బ్రౌజర్ ఆరిజిన్ (ఉదా. `https://host/omniroute`)                                                                                                                                                                                                         | సెట్ చేయబడలేదు             |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml` కోసం హోస్ట్-వైపు డాష్బోర్డ్ పోర్ట్                                                                                                                                                                                                                  | `20130`                    |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` సైడ్కార్ కోసం హోస్ట్-వైపు పోర్ట్                                                                                                                                                                                                                                | `8317`                     |

## సబ్పాత్లో రివర్స్ ప్రాక్సీ (Traefik / nginx)

Next.js `basePath` స్వతంత్ర బండిల్లో కంపైల్ చేయబడింది. OmniRoute బేక్ చేసిన విలువను యాప్ రూట్ వద్ద సెంటినెల్ ఫైల్లో రికార్డ్ చేస్తుంది ( `npm run build` సమయంలో వ్రాయబడింది; `scripts/docker/ensure-docker-base-path.mjs` ద్వారా చదవబడుతుంది) మరియు కంటైనర్ ప్రారంభమైనప్పుడు దానిని `OMNIROUTE_BASE_PATH` తో పోలుస్తుంది. అవి విభిన్నంగా ఉన్నప్పుడు మరియు డొమైన్ రూట్ కోసం ఇమేజ్ నిర్మించబడినప్పుడు, ఎంట్రీ పాయింట్ స్వతంత్ర మానిఫెస్ట్లను, పొందుపరిచిన `basePath`/`assetPrefix` అక్షరాలను తిరిగి వ్రాస్తుంది (తదుపరి 16 `assetPrefix` నుండి SSR ఆస్తి URLs మాత్రమే — పాచర్ దానిలోని సబ్పాత్ను ప్రతిబింబిస్తుంది URLs, bakled- `/_next/static` దిగుమతులు, ముందుగా రెండర్ చేసిన ఎర్రర్ పేజీలు) మరియు `node dev/run-standalone.mjs` రన్కు ముందు క్లయింట్ `process.env` షిమ్.

### కంపోజ్ బిల్డ్ (సిఫార్సు చేయబడింది)

రెండు వేరియబుల్స్ను `.env` లో సెట్ చేయండి, ఆపై ఇమేజ్ మరియు రన్టైమ్ అంగీకరించేలా పునర్నిర్మించండి:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` `OMNIROUTE_BASE_PATH` Docker బిల్డ్-ఆర్గ్గా మరియు రన్టైమ్ ఎన్విరాన్మెంట్ వేరియబుల్గా ఫార్వార్డ్ చేస్తుంది.

### ముందుగా నిర్మించిన రూట్ ఇమేజ్ + రన్టైమ్ సబ్పాత్

ప్రచురించబడిన `cheaperinference/omniroute:*` చిత్రాలు డొమైన్ రూట్ కోసం నిర్మించబడ్డాయి. మీరు ఇప్పటికీ రన్టైమ్లో `OMNIROUTE_BASE_PATH` సెట్ చేయవచ్చు; కంటైనర్ స్టార్టప్లో ఒకసారి బండిల్ను ప్యాచ్ చేస్తుంది. సరిపోలే పబ్లిక్ మూలంతో దీన్ని జత చేయండి:

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

ఫార్వార్డ్ చేయడానికి రివర్స్ ప్రాక్సీని కాన్ఫిగర్ చేయండి** పూర్తి** బాహ్య మార్గం (ఉపసర్గను తీసివేయవద్దు). Traefik `PathPrefix(`/ omniroute `)` `StripPrefix` లేకుండా కంటైనర్కి మార్చాలి, కాబట్టి Next.js `/omniroute/...` అందుకుంటుంది మరియు `/omniroute/_next/...` నుండి ఆస్తులను అందిస్తుంది.

Docker హెల్త్చెక్ యాక్టివ్ `OMNIROUTE_BASE_PATH` తో ప్రిఫిక్స్ చేయబడిన తేలికపాటి `/healthz` లైఫ్సైకిల్ ఎండ్పాయింట్ను ప్రోబ్ చేస్తుంది. human/dashboard డయాగ్నస్టిక్స్ కోసం `/api/monitoring/health` అందుబాటులో ఉంది; కంటైనర్ HEALTHCHECK తిరిగి దాని వైపుకు సూచించడానికి (ఉదాహరణకు లోతైన ఆరోగ్య అమలు కోసం), `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` సెట్ చేయండి. ఆ మార్గం ఎ** లోతైన** తనిఖీ (DB + పర్యవేక్షణ సారాంశం) — Docker యొక్క అరుదైన `HEALTHCHECK` కి తగినది, మీరు తిరిగి ఎంపిక చేసుకుంటే, కానీ** కాదు** కుబెర్నెటెస్ `livenessProbe` విరామాలకు.

ఆర్కెస్ట్రేటర్ల కోసం (కుబెర్నెట్స్, నోమాడ్, మొదలైనవి):

| ప్రోబ్               | ప్రాధాన్యత ఇవ్వండి                                                     | నివారించండి                                                   |
| -------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------- |
| సజీవత                | HTTP `GET /livez`, లేదా TCP ప్రధాన పోర్ట్లో (`PORT`, డిఫాల్ట్ `20128`) | `/api/monitoring/health` సజీవంగా                              |
| సంసిద్ధత             | HTTP `GET /healthz`                                                    | ఈవెంట్-లూప్ బిజీని చనిపోయినట్లుగా పరిగణించే టైట్ టైమ్ అవుట్లు |
| లోతైన / బ్లాక్బాక్స్ | `/api/monitoring/health`                                               | —                                                             |

`/healthz` నివేదికలు ప్రాసెస్ జీవితచక్రం (`ok` / `starting` / `stopping`). `/livez` మాత్రమే ప్రాసెస్-సజీవంగా ఉంటుంది (200 హ్యాండ్లర్ రన్ చేయగలిగినప్పుడల్లా; ఇది సంసిద్ధత కోసం వేచి ఉండదు). రెండూ ఇప్పటికీ అభ్యర్థన నిర్వహణ వలె ఒకే నోడ్ ఈవెంట్ లూప్లో నడుస్తాయి, కాబట్టి CPU-బౌండ్ కేటలాగ్ లేదా కంప్రెషన్ వర్క్ వాటిని — బిజీ ≠ డెడ్లో ఆలస్యం చేస్తుంది. HTTP ప్రోబ్స్ సమయం ముగిసినట్లయితే TCP లైవ్నెస్కు ప్రాధాన్యత ఇవ్వండి. పూర్తి ప్రోబ్ మార్గదర్శకత్వం: [మానిటరింగ్ గైడ్ — కుబెర్నెట్స్ ప్రోబ్ సిఫార్సులు](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker కేడీతో కంపోజ్ చేయండి (HTTPS ఆటో-TLS)

కేడీ యొక్క ఆటోమేటిక్ SSL ప్రొవిజనింగ్ ఉపయోగించిOmniRoute సురక్షితంగా బహిర్గతం చేయబడుతుంది. మీ డొమైన్ యొక్క DNS A రికార్డ్ మీ సర్వర్ యొక్క IP కి పాయింట్లను కలిగి ఉందని నిర్ధారించుకోండి.

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

అప్స్ట్రీమ్ కంటైనర్ కోసం క్యాడీ ప్రామాణిక ఫార్వార్డింగ్ హెడర్లను సెట్ చేస్తుంది. OmniRoute `NEXT_PUBLIC_BASE_URL` OAuth కాల్బ్యాక్లు మరియు జనరేట్ చేయబడిన పబ్లిక్ లింక్ల కోసం కానానికల్ పబ్లిక్ మూలంగా ఉపయోగిస్తుంది; ప్రామాణీకరించబడిన డ్యాష్బోర్డ్ అదే మూలం అభ్యర్థనలతో పాటు సెషన్-బౌండ్ CSRF రక్షణను ఉపయోగిస్తుంది. స్పష్టమైన కాన్ఫిగరేషన్కు బదులుగా విశ్వసనీయ ఫార్వార్డ్ హెడర్ల నుండి పబ్లిక్ మూలాన్ని OmniRoute పొందాలని మీరు ఉద్దేశపూర్వకంగా కోరుకునే అధునాతన విస్తరణల కోసం మాత్రమే `OMNIROUTE_TRUST_PROXY` ప్రారంభించండి.

## Cloudflare Quick Tunnel

Docker డిప్లాయ్మెంట్లకు సంబంధించిన డ్యాష్బోర్డ్ మద్దతులో `Dashboard → Endpoints` వద్ద ఒకే క్లిక్తో ఉపయోగించగల **Cloudflare Quick Tunnel** ఉంటుంది. మొదటిసారి ప్రారంభించినప్పుడు, అవసరమైతే మాత్రమే `cloudflared`ను డౌన్లోడ్ చేసి, మీ ప్రస్తుత `/v1` ఎండ్పాయింట్కు తాత్కాలిక టన్నెల్ను ప్రారంభించి, రూపొందించిన `https://*.trycloudflare.com/v1` URLను మీ సాధారణ పబ్లిక్ URLకు నేరుగా దిగువన చూపిస్తుంది.

సక్రియ టన్నెల్ స్థితిని మార్చకుండానే `Settings → Appearance` నుంచి ఎండ్పాయింట్ టన్నెల్ ప్యానెల్లను (Cloudflare, Tailscale, ngrok) చూపించవచ్చు లేదా దాచవచ్చు.

### టన్నెల్ గమనికలు

- Quick Tunnel URLలు తాత్కాలికమైనవి మరియు ప్రతి పునఃప్రారంభం తర్వాత మారుతాయి.
- OmniRoute లేదా కంటైనర్ పునఃప్రారంభం తర్వాత Quick Tunnelలు స్వయంచాలకంగా పునరుద్ధరించబడవు. అవసరమైనప్పుడు వాటిని డ్యాష్బోర్డ్ నుంచి మళ్లీ ప్రారంభించండి.
- నిర్వహిత ఇన్స్టాలేషన్ ప్రస్తుతం `x64` / `arm64`పై Linux, macOS మరియు Windowsకు మద్దతు ఇస్తుంది.
- పరిమిత వనరులున్న కంటైనర్ పరిసరాలలో శబ్దభరితమైన QUIC UDP బఫర్ హెచ్చరికలను నివారించడానికి నిర్వహిత Quick Tunnelలు డిఫాల్ట్గా HTTP/2 ట్రాన్స్పోర్ట్ను ఉపయోగిస్తాయి. మీకు వేరే ట్రాన్స్పోర్ట్ కావాలంటే `CLOUDFLARED_PROTOCOL=quic` లేదా `auto` సెట్ చేయండి.
- Docker ఇమేజ్లు సిస్టమ్ CA రూట్లను బండిల్ చేసి, వాటిని నిర్వహిత `cloudflared`కు పంపుతాయి; దీనివల్ల కంటైనర్లో టన్నెల్ బూట్స్ట్రాప్ అయినప్పుడు TLS ట్రస్ట్ వైఫల్యాలు నివారించబడతాయి.
- OmniRoute డౌన్లోడ్ చేయడానికి బదులుగా ఇప్పటికే ఉన్న బైనరీని ఉపయోగించాలని మీరు కోరుకుంటే `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` సెట్ చేయండి.

## చిత్రం ట్యాగ్లు

| చిత్రం                       | ట్యాగ్ చేయండి | పరిమాణం | వివరణ                                                          |
| ---------------------------- | ------------- | ------- | -------------------------------------------------------------- |
| `cheaperinference/omniroute` | `latest`      | ~ 250MB | అత్యధికం** ప్రచురించబడింది** స్థిరమైన SemVer (git `main` కాదు) |
| `cheaperinference/omniroute` | `3.8.54`      | ~ 250MB | GitOps కోసం ఈ తరగతి ట్యాగ్ని పిన్ చేయండి                       |

అదే చిత్రాలు మూడు రిపోజిటరీలకు ప్రచురించబడతాయి, అదే ప్రతి-ఆర్కిటెక్చర్ డైజెస్ట్లతో: `cheaperinference/omniroute` (Docker హబ్, చౌకైన అనుమితి సంస్థ, 3.8.53 నుండి), `ghcr.io/cheaper-inference/omniroute` మరియు లెగసీ `diegosouzapw/omniroute`, ఇది పుల్ హిస్టరీని ఉంచుతుంది మరియు ఇప్పటికీ ప్రతి విడుదలను అందుకుంటుంది. ఇప్పటికే ఉన్న `diegosouzapw/omniroute` విస్తరణలు అప్డేట్ అవుతూ ఉంటాయి; చిత్రం పేరు మార్చడం ఐచ్ఛికం. దిగువన ఉన్న `:next` / `:next-web` ప్రీ-రిలీజ్ ఛానెల్ `diegosouzapw/omniroute` మరియు GHCR కి మాత్రమే ప్రచురించబడింది.

బహుళ-ప్లాట్ఫారమ్ మానిఫెస్ట్: `linux/amd64` + `linux/arm64` స్థానికం (యాపిల్ సిలికాన్, AWS గ్రావిటన్, రాస్ప్బెర్రీ పై). Docker స్వయంచాలకంగా సరిపోలే నిర్మాణాన్ని ఎంచుకుంటుంది; మీరు ARM హోస్ట్లపై AMD64 ఎమ్యులేషన్ను బలవంతంగా చేయవలసి వస్తే `--platform linux/amd64` పాస్ చేయండి.

### ఛానెల్లను విడుదల చేయండి

OmniRoute స్థిరమైన విడుదలలు, యాక్టివ్ రిలీజ్-బ్రాంచ్ టెస్టింగ్ మరియు డెవలప్మెంట్ బిల్డ్ల కోసం ప్రత్యేక Docker ఛానెల్లను ప్రచురిస్తుంది.

| ఛానెల్                          | మూలం                                         | మ్యుటబిలిటీ                  | సిఫార్సు ఉపయోగం                                                                                                                                      |
| ------------------------------- | -------------------------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Signed/versioned విడుదల                      | మార్పులేని                   | ఖచ్చితమైన విడుదలను పిన్ చేసే ఉత్పత్తి విస్తరణలు                                                                                                      |
| `:latest` / `:latest-web`       | అత్యధికం** ప్రచురించబడింది** స్థిరమైన SemVer | మార్చగల స్థిరమైన పాయింటర్    | స్థిరమైన విడుదలలను అనుసరిస్తుంది** తర్వాత** ఒక SemVer పబ్లిష్ జాబ్ — చేస్తుంది** కాదు** `main` లేదా విడుదల చేయని `release/v*` కమిట్లను ట్రాక్ చేయండి |
| `:next` / `:next-web`           | ప్రస్తుత డిఫాల్ట్ `release/v*` బ్రాంచ్       | మార్చగల ప్రీ-రిలీజ్ పాయింటర్ | యాక్టివ్ రిలీజ్ బ్రాంచ్లో ల్యాండ్ అయిన టెస్టింగ్ ఫిక్స్లు ఇంకా స్థిరమైన విడుదలలో లేవు                                                                |
| `:main` / `:main-web`           | `main` శాఖ                                   | మార్చగల అభివృద్ధి పాయింటర్   | అభివృద్ధి మరియు ఏకీకరణ పరీక్ష మాత్రమే                                                                                                                |

#### వెబ్ సెషన్ ప్రొవైడర్లు: `-web` చిత్రాలు

ఎగువన ఉన్న ప్రతి ఛానెల్ `-web` ట్యాగ్గా (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`) రెట్టింపు అవుతుంది, `runner-web` స్టేజ్ — అదే ఇమేజ్తో పాటు Playwright మరియు Chromium బ్రౌజర్తో నిర్మించబడింది. సాదా చిత్రం ఓడలు** లేకుండా** క్రోమియం; `gemini-web`, `claude-web` మరియు `claude-turnstile` ఇది అవసరం.

వైఫల్యం వాయిదా వేయబడింది, ప్రారంభ సమయం కాదు: ఆ ప్రొవైడర్లు తమ మోడల్లను జాబితా చేసి, డ్యాష్బోర్డ్లో కనెక్ట్ చేసినట్లు చూపుతారు మరియు మొదటి అభ్యర్థన మాత్రమే విఫలమైంది

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

మీరు ఆ ప్రొవైడర్లను ఉపయోగిస్తే, మీరు ఇప్పటికే — లో ఉన్న ఛానెల్ యొక్క `-web` ట్యాగ్ని లాగండి, మరేమీ మారదు. npm/CLI ఇన్స్టాల్లో ( Docker ఇమేజ్ లేదు), సమానమైన మిస్సింగ్ పీస్ బ్రౌజర్ బైనరీ: హోస్ట్లో `npx playwright install chromium` ని రన్ చేయండి.

#### ప్రీ-రిలీజ్ ఛానెల్ని ఉపయోగించడం

`next` ఛానెల్ ప్రస్తుత డిఫాల్ట్ `release/v*` బ్రాంచ్కి ప్రతి పుష్పై పునర్నిర్మించబడింది మరియు AMD64 మరియు ARM64 రెండింటికీ ప్రచురించబడుతుంది. పాత నిర్వహణ శాఖలు దీన్ని ఓవర్రైట్ చేయలేవు. తదుపరి స్థిరమైన ట్యాగ్ను కత్తిరించే ముందు క్రియాశీల విడుదల శాఖలో విలీనం చేసిన పరిష్కారాల కోసం ఛానెల్ లాగగలిగే చిత్రాన్ని అందిస్తుంది.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker కంపోజ్ కోసం, ఎంచుకున్న ప్రొఫైల్ ఉపయోగించిన ఇమేజ్ ట్యాగ్ని ఓవర్రైడ్ చేసి, ఆపై సేవను లాగి, మళ్లీ సృష్టించండి:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### భద్రత మరియు రోల్బ్యాక్

`next` అనేది ఫ్లోటింగ్ ప్రీ-రిలీజ్ ఛానెల్. యాక్టివ్ రిలీజ్ బ్రాంచ్కి ఏదైనా పుష్పై ఇది మారవచ్చు మరియు ఇది** ఉత్పత్తి వినియోగానికి మద్దతు లేదు** . నిర్దిష్ట బిల్డ్ను మూల్యాంకనం చేస్తున్నప్పుడు ఇమేజ్ డైజెస్ట్ను పిన్ చేయండి:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

పరీక్షించే ముందు, OmniRoute డేటా వాల్యూమ్ లేదా బైండ్-మౌంటెడ్ డేటా డైరెక్టరీని బ్యాకప్ చేయండి. వెనక్కి వెళ్లడానికి, గతంలో ఉపయోగించిన స్థిరమైన వెర్షన్ను పునరుద్ధరించండి లేదా కంటైనర్ను డైజెస్ట్ చేసి మళ్లీ సృష్టించండి:

```bash
docker pull cheaperinference/omniroute:<stable-version>
docker compose up -d
```

విడుదల-శాఖ బిల్డ్ ఎప్పుడూ `latest` తరలించదు; అర్హత కలిగిన స్థిరమైన అర్థ సంస్కరణ మాత్రమే స్థిరమైన పాయింటర్ను ప్రమోట్ చేయవచ్చు. `next` ఇమేజ్లు రిలీజ్ ఇమేజ్ ఇన్స్పెక్షన్ని కలిగి ఉంటాయి మరియు క్రిటికల్-వల్నరబిలిటీ గేట్ను బ్లాక్ చేస్తాయి.

**`latest` అనేది git కోసం కరెన్సీ హామీ కాదు.** `main` లేదా యాక్టివ్ `release/v*` బ్రాంచ్లో విలీన పరిష్కారాలు** కాదు** `:latest` లో స్థిరమైన SemVer చిత్రం ప్రచురించబడే వరకు మరియు పబ్లిష్ జాబ్ `:latest` ప్రమోట్ చేసే వరకు (ఆ SemVer అదే డైజెస్ట్ ). GitHub ఇప్పటికే పరిష్కారాన్ని చూపుతున్నప్పుడు `latest` స్తంభింపజేసినట్లు కనిపిస్తే, విడుదల శాఖను పరీక్షించడానికి `:next` లాగండి లేదా SemVer ట్యాగ్ కోసం వేచి ఉండండి.

| మీకు కావాలి                                                                          | ఉపయోగించండి                         |
| ------------------------------------------------------------------------------------ | ----------------------------------- |
| GitOps / ఉత్పత్తి డ్రిఫ్ట్ చేయకూడదు                                                  | పిన్ `:X.Y.Z` (లేదా ఇమేజ్ డైజెస్ట్) |
| ప్రచురించబడిన స్టేబుల్లను అనుసరించండి మరియు ప్రతి విడుదలలో పునఃసృష్టిని అంగీకరించండి | `:latest`                           |
| విడుదల చేయని `release/v*` కమిట్లను పరీక్షించండి                                      | `:next` (ఉత్పత్తి కాదు)             |
| పరీక్ష `main`                                                                        | `:main` (ఉత్పత్తి కాదు)             |

## Dockerలో డాష్బోర్డ్ నవీకరణలు

ప్రచురించిన ఇమేజ్ కంటైనర్ తనను తాను భర్తీ చేసుకోలేదు. OmniRoute తాను కంటైనర్లో
రన్ అవుతున్నట్లు గుర్తించినప్పుడు (`.git` checkout లేకుండా, npm install కాకుండా), హోమ్ డాష్బోర్డ్లోని నవీకరణ బ్యానర్ npm/git సూచనలకు బదులుగా రన్ చేయాల్సిన
హోస్ట్ కమాండ్ను, కాపీ బటన్తో సహా చూపిస్తుంది:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

సర్వీస్ పేరు `AUTO_UPDATE_SERVICE` నుండి వస్తుంది (డిఫాల్ట్ `omniroute`, ఇది
`docker-compose.selfhost.yml`లోని సర్వీస్). `pull` ఫ్లోటింగ్ ట్యాగ్ను (`latest`, `next`) మాత్రమే ముందుకు కదిలిస్తుంది; పిన్ చేసిన
`:X.Y.Z` ట్యాగ్తో, ముందుగా ట్యాగ్ను సవరించండి.

### హోస్ట్ ట్రిగ్గర్ ఫైల్తో ఒకే క్లిక్ నవీకరణలు

`/var/run/docker.sock`ను మౌంట్ చేయకుండా **Update Now** పనిచేస్తూనే ఉండేలా చేయడానికి (ఇది కంటైనర్కు
హోస్ట్పై root అధికారాన్ని ఇస్తుంది — పైన ఉన్న `cli` ప్రొఫైల్ హెచ్చరికను చూడండి), OmniRoute
సర్వీస్పై `DOCKER_UPDATE_TRIGGER_FILE`ను సెట్ చేసి, హోస్ట్పై ఒక watcherను రన్ చేయండి:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

పాత్ తప్పనిసరిగా `DATA_DIR` లోపల ఉండాలి (సాపేక్ష విలువలు దానికి అనుగుణంగా పరిష్కరించబడతాయి); మరేదైనా
తిరస్కరించబడుతుంది. ఆ తర్వాత **Update Now** `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }`ను ఆ
ఫైల్కు వ్రాసి, `202`తో ప్రతిస్పందిస్తుంది, అలాగే కొత్త వెర్షన్ లైవ్ అయ్యే వరకు డాష్బోర్డ్ `/api/system/version`ను పోల్ చేసి
రీలోడ్ అవుతుంది. ఈ మోడ్లో OmniRoute ఎప్పుడూ shell లేదా Docker కమాండ్ను రన్ చేయదు. ప్రతి నవీకరణ
చర్య మాదిరిగానే, అభ్యర్థన loopback/LAN క్లయింట్ల నుండి వచ్చినప్పుడు మాత్రమే ఆమోదించబడుతుంది.

బైండ్-మౌంట్ చేసిన డేటా డైరెక్టరీ, గమనించడానికి హోస్ట్కు స్థిరమైన పాత్ను అందిస్తుంది. నమూనా `systemd` యూనిట్లు
(`/srv/omniroute`ను మీ compose ఫైల్ మరియు `data/` ఉన్న డైరెక్టరీకి అనుగుణంగా మార్చండి):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=OmniRoute డాష్బోర్డ్ నవీకరణ అభ్యర్థనల కోసం గమనించండి

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=OmniRoute కంటైనర్ను పుల్ చేసి మళ్లీ సృష్టించండి

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

విఫలమైన రన్ లూప్ కాకుండా ఉండటానికి, సర్వీస్ పుల్ చేయడానికి ముందు అభ్యర్థనను తొలగిస్తుంది.
`DOCKER_UPDATE_TRIGGER_FILE` లేకుండా డాష్బోర్డ్ మాన్యువల్ కమాండ్ విధానాన్ని కొనసాగిస్తుంది.

## లభ్యత: డిఫాల్ట్ SQLite సింగిల్-రెప్లికా

స్టాక్ Docker / Kubernetes OmniRoute** ఒక నోడ్ ప్రక్రియ + ఒక SQLite రైటర్** . అధిక లభ్యత ఉంది** మద్దతు లేదు** ఆ టోపోలాజీపై.

| నిర్బంధం                                        | పర్యవసానం                                                                                                                                                                                                                                                                                                                   |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ఒకే రచయిత                                       | చేయండి** కాదు** ఒకే SQLite ఫైల్కి వ్యతిరేకంగా బహుళ ప్రతిరూపాలను అమలు చేయండి. అది DB ని పాడు చేస్తుంది.                                                                                                                                                                                                                      |
| పునఃసృష్టి / పునఃప్రారంభించు / HEALTHCHECK కిల్ | **పూర్తి అంతరాయం** విమానంలో SSE, డాష్బోర్డ్ సెషన్లు మరియు ఇన్-మెమరీ స్థితి. కనెక్ట్ చేయబడిన ప్రతి క్లయింట్ పడిపోతుంది. ఖాళీ-ఎండ్ పాయింట్ విండోలో కొత్త అభ్యర్థనలు రివర్స్-ప్రాక్సీని పొందుతాయి**`502 Bad Gateway: Unknown error`** , OmniRoute JSON కాదు — క్లయింట్లు దీన్ని ప్రొవైడర్ వైఫల్యం (#11015) నుండి వేరు చేయలేరు. |
| `/healthz` వలె అదే ఈవెంట్ లూప్                  | బిజీ కేటలాగ్ లేదా కంప్రెషన్ టిక్ ప్రోబ్స్ను ఆలస్యం చేస్తుంది; ఒక చిన్న సమయం ముగిసిన తర్వాత పునఃప్రారంభించబడుతుంది** మాత్రమే** ప్రతిరూపం.                                                                                                                                                                                    |

**ప్రోబ్ మ్యాట్రిక్స్** ( [కుబెర్నెట్స్ ప్రోబ్ సిఫార్సులు](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) కూడా చూడండి):

| ప్రోబ్          | లక్ష్యం                                                       | ఉపయోగించవద్దు                                                 |
| --------------- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| సజీవత           | TCP పై `PORT` (డిఫాల్ట్ `20128`), లేదా సాఫ్ట్ HTTP `/healthz` | `/api/monitoring/health`                                      |
| సంసిద్ధత        | HTTP `GET /healthz`                                           | ఈవెంట్-లూప్ బిజీని చనిపోయినట్లుగా పరిగణించే టైట్ టైమ్ అవుట్లు |
| లోతైన / మానవులు | `/api/monitoring/health`                                      | స్వయంచాలక కుబేలెట్ లైవ్నెస్                                   |

**అప్గ్రేడ్లు:** ప్రతి సెషన్ తగ్గుతుందని ఆశించండి. మీకు వీలైతే డ్రెయిన్ క్లయింట్లు; డిఫాల్ట్ SQLite లో రోలింగ్ అప్డేట్ లేదు. కంపోజ్ `restart: unless-stopped` ప్లస్ Docker `HEALTHCHECK` కూడా కంటైనర్ అనారోగ్యకరమైనది అయినప్పుడు మాత్రమే ప్రక్రియను భర్తీ చేస్తుంది — అదే బ్లాస్ట్ వ్యాసార్థం.

రెడీమేడ్ మానిఫెస్ట్లు మరియు హెల్మ్ చార్ట్ `deploy/kubernetes/` మరియు `deploy/helm/omniroute/` లో ప్రత్యక్షంగా ఉన్నాయి — [కుబెర్నెట్స్ డిప్లాయ్మెంట్ గైడ్](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md) చూడండి.

ఒక కోసం కుబెర్నెటెస్ స్నిప్పెట్** ఒకే ప్రతిరూపం** (పునఃసృష్టి అవసరం; ఒక SQLite ఫైల్కు వ్యతిరేకంగా `replicas` పెంచవద్దు):

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

`preStop` స్లీప్ SIGTERM కంటే ముందు kube డ్రాప్ సర్వీస్ ఎండ్ పాయింట్లను అనుమతిస్తుంది** కొత్త** మరణిస్తున్న ప్రక్రియలో ట్రాఫిక్ నిలిచిపోతుంది. విమానంలో `/v1/responses` SSE హెవీవెయిట్ అడ్మిషన్ లీజుల (#11015) ద్వారా `SHUTDOWN_TIMEOUT_MS` (డిఫాల్ట్ 30సె) వరకు ఖాళీ చేయబడుతుంది. ఇప్పటికీ ప్రక్రియను చేరుకునే కొత్త అభ్యర్థనలు `503` + `Retry-After: 5` పొందుతాయి. రీప్లేస్మెంట్ సిద్ధమయ్యే వరకు ఖాళీ-ఎండ్పాయింట్ గ్యాప్ను రీక్రియేట్ చేయడం చాలా కష్టంగా మిగిలిపోయింది - అది SQLite టోపోలాజీ, ప్రోబ్ మిస్కాన్ఫిగర్ కాదు.

బాహ్య Postgres / బహుళ రచయిత HA** కాదు** డాక్యుమెంట్ చేయబడిన స్టాక్ మార్గం. మీకు HA అవసరమైతే, ఒకే ప్రతిరూపాన్ని ఉంచండి లేదా ప్రాజెక్ట్ పరీక్షించి, ప్రత్యేకంగా డాక్యుమెంట్ చేసిన టోపోలాజీని అమలు చేయండి. Postgres/MySQL పని [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) లో నివసిస్తుంది. అది షిప్పింగ్ వరకు, గుణించడం మాత్రమే మద్దతు మార్గం** పెద్ద** `/v1/responses` సామర్థ్యం N స్వతంత్ర ప్రక్రియలు (తదుపరి విభాగం), ఒక వాల్యూమ్లో `replicas > 1` కాదు.

## స్కేల్-అవుట్: N స్వతంత్ర ప్రక్రియలు

### Codex టోకెన్ భ్రమణ యాజమాన్యం

ఒక Codex ఖాతా కాపీలు దాని సింగిల్ యూజ్ రిఫ్రెష్ టోకెన్ను స్వతంత్రంగా వినియోగించకూడదు. సమకాలీకరించబడిన ఆధారాలను మాత్రమే వినియోగించే సందర్భాల్లో, `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (అలియాస్ `cx`) సెట్ చేయండి. సింగిల్ రొటేషన్ యజమానిపై సెట్ చేయకుండా వదిలేయండి. ప్రతి ప్రక్రియకు ఇప్పటికీ దాని స్వంత `DATA_DIR` అవసరం; ఈ ఐచ్ఛికం SQLite షేర్ చేయదు లేదా టోకెన్ సమకాలీకరణ లేదా పంపిణీ చేయబడిన లాక్ని సరఫరా చేయదు.

నిష్క్రియ ఉదాహరణ రిఫ్రెష్ అవసరమైనప్పుడు కనెక్షన్ని మళ్లీ రీడ్ చేస్తుంది మరియు వేరే, గడువు లేని యాక్సెస్ టోకెన్ను మాత్రమే స్వీకరిస్తుంది. లేదంటే కనెక్షన్ గడువు ముగియకుండా లేదా నిష్క్రియం చేయకుండా లేదా రిఫ్రెష్ బ్రేకర్ వైఫల్యాన్ని లెక్కించకుండా రిఫ్రెష్ నిలిపివేయబడుతుంది. నిజమైన అప్స్ట్రీమ్ ప్రమాణీకరణ వైఫల్యాలు ఇప్పటికీ సాధారణ వైఫల్య అకౌంటింగ్, ఎక్స్పోనెన్షియల్ కూల్డౌన్ మరియు సాధారణ క్లయింట్ ఎర్రర్ను ఉపయోగిస్తాయి; ఖాతా డీయాక్టివేషన్ శాశ్వతంగా ఉంటుంది. యాక్సెస్ టోకెన్ల గడువు ముగిసేలోపు యజమాని యొక్క తిప్పబడిన టోకెన్లను సమకాలీకరించండి (డిఫాల్ట్ ప్రోయాక్టివ్ రిఫ్రెష్ లీడ్ ఐదు నిమిషాలు), లేదా Codex auth ఫైల్ని మళ్లీ దిగుమతి చేయండి. నిష్క్రియ దిగుమతులు సరఫరా చేయబడిన టోకెన్లను టోకెన్ ఎండ్పాయింట్లో ధృవీకరించకుండా నిల్వ చేస్తాయి. మాన్యువల్ dashboard/API రిఫ్రెష్ రిటర్న్స్ `409 refresh_disabled`; కొత్త OAuth లాగిన్లు మారవు. [పర్యావరణ సూచనను](../reference/ENVIRONMENT.md#passive-codex-token-refresh) చూడండి.

ఒక నోడ్ ప్రక్రియ** ఒక V8 కుప్ప** . రెండు అతివ్యాప్తి చెందుతున్న ~ 3 MiB / ~ 750k-టోకెన్ కోడింగ్-ఏజెంట్ `POST /v1/responses` (RTK + కేవ్మ్యాన్) ~ 12 Gi (`FATAL ERROR: Reached heap limit`) వద్ద ఆ కుప్పను నిలిపివేస్తుంది మరియు 16 Gi cgroupని OOM చేయవచ్చు. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) చూడండి. ఆ కొలత a** మెమరీ-బడ్జెట్** హెచ్చరిక, రెండు ఏకకాలిక పొడవైన `/v1/responses` యొక్క హార్డ్-గరిష్ట ఉత్పత్తి కాదు. హెవీవెయిట్ చాట్ అడ్మిషన్ స్వయంచాలకంగా ఉత్పన్నమైన ఇంజెస్ట్ బైట్ బడ్జెట్ (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) ద్వారా అదే V8/cgroup సీలింగ్ — నుండి పరిమాణాన్ని కలిగి ఉంటుంది, ఇది ఇప్పటికే-పరిమాణ ప్రక్రియలో దానిని పైకి (లేదా లెగసీ `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` అభ్యర్థన-కౌంట్ క్యాప్ను సెట్ చేయడం) భర్తీ చేయడం ద్వారా రద్దు చేయబడుతుంది. చిన్న చాట్లు, `/healthz`, `/v1/models`, మరియు MCP** కాదు** ఆ టోపీలో.

### ఒక-ప్రక్రియ: రెండు కంటే ఎక్కువ పొడవైన `/v1/responses`

ఎ** ఆరోగ్యకరమైన** ప్రక్రియ ( `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` క్రింద కుప్ప , డిఫాల్ట్ `0.75`)** మే** ప్రాసెస్-వైడ్ ఇన్ఫ్లైట్-బైట్ బడ్జెట్ (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) ఇప్పటికీ గదిని కలిగి ఉన్నప్పుడు రెండు కంటే ఎక్కువ ఏకకాల పొడవైన `POST /v1/responses` అమలు చేయండి. `OMNIROUTE_CHAT_LARGE_BODY_BYTES` వద్ద లేదా అంతకంటే ఎక్కువ ఉన్న బాడీలు (డిఫాల్ట్ 256 KiB) స్ట్రక్చర్-హెవీ రిక్వెస్ట్ల మాదిరిగానే హెవీవెయిట్ లీజును తీసుకుంటాయి మరియు అదే [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` ఎస్కేప్ (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`)ని ఉపయోగిస్తాయి. పదుల ఏకకాల పొడవైన SSE క్లయింట్లు (ఆపరేటర్లకు తరచుగా 40–50 అవసరం) a** మెమరీ-బడ్జెట్** ప్రశ్న — పరిమాణం కుప్ప + primary/headroom స్లాట్లు + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — కఠినమైన “గరిష్టంగా 2” ఉత్పత్తి పరిమితి కాదు. ఒత్తిడికి గురైన కుప్ప ఇప్పటికీ మళ్లీ ప్రయత్నించదగిన `503` తో షెడ్ అవుతుంది కాబట్టి #7849 తిరిగి రాదు.

కు** కుప్పలను గుణించండి** (స్వతంత్ర V8 పాత-స్పేసెస్)** నేడు** :

| చేయండి                                                                                                                                     | చేయవద్దు                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------- |
| పరుగు** N containers/pods** , ప్రతి దానితో** స్వంతం** `DATA_DIR` / వాల్యూమ్                                                                | ఒక SQLite ఫైల్కు వ్యతిరేకంగా `replicas > 1` సెట్ చేయండి  |
| హెవీ / ఇన్ఫ్లైట్-బైట్ బడ్జెట్ నుండి హెవీ ఇన్-ఫ్లైట్ + హెల్తీ-హెడ్రూమ్; 1–2 అనేది సాంప్రదాయిక #7849 డిఫాల్ట్, కఠినమైన ఉత్పత్తి గరిష్టం కాదు | ఒక ప్రక్రియకు 8 × RAM మరియు అపరిమిత కౌంట్ క్యాప్ ఇవ్వండి |
| ఐచ్ఛికం: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` కోసం** షేర్డ్ కోటా కౌంటర్లు**                                                | Redis భాగస్వామ్య SQLite — గా పరిగణించండి                 |
| ప్రతి సందర్భంలోనూ నకిలీ ప్రొవైడర్ రహస్యాలు (లేదా విభజించబడిన డాష్బోర్డ్లను అంగీకరించండి)                                                   | ఒక డాష్బోర్డ్ / ఒక కాల్-లాగ్ ఇన్స్టాన్స్లలో ఆశించండి     |
| ఏదైనా లోడ్ బాలన్సర్తో ముందు; API కీ లేదా సెషన్ ద్వారా sticky అయితే సరిపోతుంది                                                              | విక్రేత-నిర్దిష్ట పరిమాణం-అవగాహన మిడిల్వేర్ అవసరం        |

సెషన్-టు-ఖాతా అనుబంధాన్ని Redis ద్వారా కూడా భాగస్వామ్యం చేయవచ్చు: ప్రతి ప్రక్రియపై `OMNIROUTE_SESSION_AFFINITY_STORE=redis` మరియు `REDIS_URL` సెట్ చేయండి, అదే `REDIS_KEY_PREFIX` మరియు సానుకూల `sessionAffinityTtlMs` సెట్టింగ్తో. ప్రతి ప్రాసెస్ యొక్క అర్హత కలిగిన స్థానిక కనెక్షన్కు పిన్లు హ్యాష్ చేసిన వినియోగ-ఖాతా గుర్తింపులను పరిష్కరిస్తాయి, కాబట్టి సరిపోలే గుర్తింపు మెటాడేటాతో OAuth ఖాతాలకు సరిపోలే కనెక్షన్ IDs అవసరం లేదు. పిన్ రిజల్యూషన్ మరియు గార్డ్ ఎవిక్షన్లో విరుద్ధమైన స్థానిక IDs కంటే తెలిసిన ఖాతా గుర్తింపులు ప్రాధాన్యతనిస్తాయి; గుర్తింపు లేని రికార్డులు (లేదా గుర్తింపు లేని ఎవిక్షన్ కాలర్లు) లెగసీ ID గార్డ్ను కలిగి ఉంటాయి. స్థిరమైన వినియోగ గుర్తింపు లేని ఖాతాలకు ఇప్పటికీ IDs సరిపోలడం అవసరం. Redis లోపాలు లేదా 100 ms కంటే ఎక్కువ కాల్లు స్థానిక SQLite కి తిరిగి వస్తాయి. ప్రతి Redis అఫినిటీ స్టోర్ అత్యుత్తమ కార్యకలాపాలను 8కి పరిమితం చేస్తుంది, Redis నిండిన వెంటనే బైపాస్ చేస్తుంది మరియు అంతర్లీన పని సెటిల్ అయినప్పుడు మాత్రమే స్లాట్లను విడుదల చేస్తుంది, కాలర్ గడువులో కాదు. Redis అంతరాయం సమయంలో భాగస్వామ్య సత్యం ఉండదు: ప్రతి సందర్భం దాని స్వంత స్థానిక అనుబంధానికి తిరిగి వస్తుంది, సెషన్లు ఒక్కో ఉదాహరణకి ఒకసారి రీ-పిన్ చేయవచ్చు మరియు సందర్భాలు వేరుగా ఉండవచ్చు. స్టికినెస్ కోలుకున్నప్పుడు Redis ద్వారా మళ్లీ కలుస్తుంది. గడువు ముగిసిన తర్వాత వేచి ఉంది, పంపిన EVAL కాదు, ఇది ఫాల్బ్యాక్ తర్వాత ల్యాండ్ కావచ్చు. రూటింగ్ వ్రాతలు రౌటింగ్ నిర్ణయం ద్వారా గమనించిన ఖచ్చితమైన విలువను సరిపోల్చుతాయి, తాజా మ్యుటేషన్-టైమ్ రీడ్ కాదు; గమనించిన మిస్ లేదా SQLite ఫాల్బ్యాక్ పరిశీలన ఆబ్సెంట్ Redis కీతో పోల్చబడుతుంది. వాడుకలో లేని పిన్లు ఒక CAS లో భర్తీ చేయబడతాయి, కాబట్టి లేట్ కమాండ్ కొత్త, విభిన్న పిన్ను భర్తీ చేయదు లేదా తొలగించదు. Redis అటామిక్గా విలువను మరియు మిగిలిన సర్వర్ TTL రీడ్ చేస్తుంది; పాజిటివ్ PTTL (లేదా గడువు ముగియదు) అనేది రచయిత యొక్క JSON టైమ్స్టాంప్ లేదా రీడర్ యొక్క గడియారాన్ని కాదు, జీవితకాలాన్ని నిర్ణయిస్తుంది. స్థానిక స్నాప్షాట్లు స్థానిక గడువుకు TTL మిగిలి ఉన్న మ్యాప్; ఇప్పటికే ఉన్న JSON కీలు చదవగలిగేలా ఉంటాయి మరియు వాటి ముడి బైట్లు CAS కోసం అలాగే ఉంచబడతాయి. Redis మాత్రమే సత్యానికి సమాధానమిచ్చేటప్పుడు మాత్రమే. ధృవీకరించబడిన భాగస్వామ్య అప్సర్ట్లు, టచ్లు మరియు తొలగింపులు స్థానిక ఎంట్రీని తీసివేస్తాయి, దాన్ని ఇన్స్టాల్ చేయవద్దు లేదా రిఫ్రెష్ చేయవద్దు. Redis పాత్లోని SQLite Redis లోపాలు, గడువు ముగియడం లేదా అడ్మిషన్ సంతృప్తత నుండి ఈ సందర్భం యొక్క స్వంత ఫాల్బ్యాక్ నిర్ణయాలను మాత్రమే కలిగి ఉంది, ఇది మునుపటిలా TTL-బౌండ్ చేయబడింది. తర్వాత అంతరాయం ఏర్పడినప్పుడు తప్పిపోయిన లోకల్ పిన్కు ఒక తాజా ఎంపిక (ఒక ప్రాంప్ట్-కాష్ మిస్) ఖర్చవుతుంది, తప్పు లేదా తొలగించబడిన ఖాతా కాదు. తిరస్కరించబడిన అప్సర్ట్లు భాగస్వామ్య విజేతను మరియు దాని మిగిలిన TTL పరమాణుపరంగా తిరిగి అందిస్తాయి: సాధారణ ఎంపిక మ్యాప్ చేయబడిన స్థానిక గడువును మళ్లీ తనిఖీ చేస్తుంది మరియు స్టిల్-లైవ్ అర్హత ఉన్న విజేతను ఉపయోగిస్తుంది, వినియోగాన్ని తాకడం మరియు మరొక షేర్డ్ రైట్ లేకుండా ఆ ఖాతా కోసం లాగిన్ చేయడం. అది అందుబాటులో లేకుంటే, ఎంపిక స్థానిక అభ్యర్థిని ఉంచుతుంది, షేర్ చేసిన పిన్ను మార్చకుండా ఉంచుతుంది మరియు ఒక డీబగ్ సందేశాన్ని విడుదల చేస్తుంది. తిరస్కరించబడిన CAS SQLite వ్రాయదు; Redis లోపాలు, గడువు ముగిసింది లేదా అడ్మిషన్ సంతృప్తత బదులుగా ఇప్పటికే ఉన్న స్థానిక ఆపరేషన్ను వర్తింపజేస్తుంది. పంపిన మ్యుటేషన్ ప్రత్యుత్తరం గడువు ముగిసిన తర్వాత వచ్చినట్లయితే (అంగీకరించబడింది, తిరస్కరించబడింది లేదా లోపం), ఒక సమకాలిక ఖచ్చితమైన సీరియలైజ్డ్-విలువ సరిపోల్చడం-మరియు-తొలగించడం అనేది బైట్-సమానమైన టైమ్అవుట్ ఫాల్బ్యాక్ అడ్డు వరుసను మాత్రమే తొలగిస్తుంది. ఆ పోలిక మరియు తొలగింపు మధ్య ఎటువంటి నిరీక్షణ లేదు; ఒక కొత్త ఔటేజ్ రైట్ భద్రపరచబడింది. గార్డ్ ఎవిక్షన్ అనేది Redis డౌన్తో కూడా విఫలమైన ఖాతా యొక్క స్వంత స్థానిక పిన్ను తీసివేస్తుంది మరియు భాగస్వామ్య తొలగింపును నిర్ధారించిన తర్వాత దాన్ని మళ్లీ శుభ్రపరుస్తుంది. భాగస్వామ్య ప్రత్యుత్తరాలు పెండింగ్లో ఉన్నందున తొలగించబడిన స్థానిక పిన్ను పునరుద్ధరించలేము ఎందుకంటే భాగస్వామ్య విజయాలు ఎప్పుడూ SQLite వ్రాయవు. తర్వాత అంతరాయం ఫాల్బ్యాక్ ఖాతాని మళ్లీ పిన్ చేయవచ్చు; తర్వాత ఆమోదించబడిన షేర్డ్ రైట్ Redis లో మాత్రమే ఉంది. Redis మిస్లు స్థానిక ఫాల్బ్యాక్ స్థితిని సంప్రదించవు. డ్రైవర్ ఆఫ్తో, కొత్తగా ఎంచుకున్న పిన్లు లెగసీ ఫోర్-ఫీల్డ్ SQLite JSON ఆకారాన్ని కలిగి ఉంటాయి; Redis రూటింగ్ మాత్రమే హ్యాష్ చేసిన ఖాతా గుర్తింపును జోడిస్తుంది. ముందుగా పొందిన పిన్లు వాటి గడువు ముగింపు సరిహద్దు వద్ద మళ్లీ తనిఖీ చేయబడతాయి. Redis నాన్-లీజ్ ఎంపిక స్టోర్ను మళ్లీ రీడ్ చేస్తుంది, అయితే సింక్రోనస్ లీజు ప్లానింగ్ ఇప్పటికీ ప్రిఫెచ్ మరియు ప్లానింగ్ మధ్య తొలగించబడిన పిన్ను ఉపయోగించవచ్చు (అంగీకరించబడిన బెస్ట్-ఎఫర్ట్ విండో). మన్నికైన దావా తర్వాత లీజు కమిట్ ఖాతాలను మార్చదు: తిరస్కరించబడిన అప్సర్ట్లో అది ఆ అభ్యర్థన కోసం క్లెయిమ్ చేసిన అభ్యర్థిని మాత్రమే ఉంచుతుంది మరియు భాగస్వామ్య విజేతను తాకకుండా వదిలివేస్తుంది, కాబట్టి సందర్భాలలో ఒప్పందం ఆ మార్గంలో కట్టుబడి ఉంటుంది. మిగిలిన పట్టిక ఇప్పటికీ వర్తిస్తుంది: ఇది కాంబో సెషన్ స్టిక్కీనెస్, స్థానిక Codex టర్న్ పిన్లు, ఖాతా సెమాఫోర్స్, లాకౌట్లు, ఖర్చు పరిమితులు, కాన్ఫిగరేషన్ లేదా కాల్ లాగ్లను భాగస్వామ్యం చేయదు.

హార్డ్వేర్: ప్రతి-ఉదాహరణకు ఏకకాలిక దీర్ఘ `/v1/responses` a** మెమరీ-బడ్జెట్** ప్రశ్న (హీప్ + ఇన్ఫ్లైట్-బైట్ / #10110). `N` స్వతంత్ర `DATA_DIR` s ఇప్పటికీ కుప్పలను గుణించాలి: హోస్ట్ RAM తప్పనిసరిగా `N × cgroup` కవర్ చేయాలి, “N = 8తో ఒక 16 Gi పాడ్” కాదు. ఒక SQLite ఫైల్పై ఎప్పుడూ `replicas > 1`.

స్కెచ్ కంపోజ్ చేయండి (రెండు కుప్పలు, రెండు వాల్యూమ్లు — కాదు `deploy.replicas: 2`):

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

ప్రక్రియలో సాంద్రత ( HTTP ఐసోలేట్ నుండి కుదింపు) [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). షేర్డ్ డ్యూరబుల్ స్టేట్లో ఒక లాజికల్ క్లస్టర్ [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Docker లో Gemini ప్రాంతీయ లోపాలు

Google AI Studio / Gemini API, FAILED_PRECONDITION తో పాటు HTTP 400ను మరియు
`User location is not supported for the API use.` సందేశాన్ని తిరిగి ఇవ్వవచ్చు. హోస్ట్లో అభ్యర్థన విజయవంతం కావడం,
కంటైనర్ కూడా అదే అవుట్బౌండ్ మార్గాన్ని ఉపయోగిస్తుందని నిరూపించదు. DNS క్రమం,
IPv4/IPv6 కనెక్టివిటీ, VPN రూటింగ్ మరియు కాన్ఫిగర్ చేసిన ప్రాక్సీలు వేర్వేరుగా ఉండవచ్చు.
[Google మద్దతిచ్చే ప్రాంతాలు](https://ai.google.dev/gemini-api/docs/available-regions)
అలాగే వాస్తవ కనెక్షన్ మార్గాన్ని తనిఖీ చేయండి; ఈ లోపం మాత్రమే API కీ తప్పుగా ఉందని నిర్ధారించదు.

### కనెక్షన్-నిర్దిష్ట ప్రాక్సీకి ప్రాధాన్యం ఇవ్వండి

ప్రభావితమైన Gemini కనెక్షన్ కోసం OmniRoute యొక్క [ఒక్కో కనెక్షన్కు ప్రాక్సీ కాన్ఫిగరేషన్](../ops/PROXY_GUIDE.md#4-level-proxy-system)ను
ఉపయోగించి, ఆపై అదే మోడల్తో **Test Connection**ను మరియు ఒక చిన్న అభ్యర్థనను
మళ్లీ అమలు చేయండి. దీనివల్ల రూటింగ్ మార్పు ఆ కనెక్షన్కే పరిమితమవుతుంది. కంటైనర్
నుంచి ప్రాక్సీని చేరుకోగలరని, అలాగే కనెక్షన్ నిజంగానే దానిని ఎంచుకుంటుందని నిర్ధారించండి.
మార్గాన్ని మార్చడం వల్ల అప్స్ట్రీమ్ ప్రాంతీయ అర్హత లభిస్తుందని హామీ లేదు.

### హోస్ట్ మరియు కంటైనర్ నెట్వర్కింగ్ను పోల్చండి

ప్రామాణీకరించిన ఫలితాలను పోల్చేటప్పుడు కీ, మోడల్ మరియు అభ్యర్థనను ఒకేలా ఉంచండి; క్రెడెన్షియల్స్,
ప్రాక్సీ పాస్వర్డ్లు లేదా పూర్తి ఆథరైజేషన్ హెడర్లను ఎప్పుడూ ఇష్యూలో అతికించవద్దు.
మొదట OS రిజాల్వర్ ఏ అడ్రస్ ఫ్యామిలీలను అందిస్తుందో పరిశీలించండి; హోస్ట్లోనూ,
కంటైనర్లోనూ ఒకే కమాండ్ను ఉపయోగించండి:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

`omniroute` స్థానంలో మీరు అమలు చేసే సర్వీస్ను ఉంచండి (ఉదాహరణకు, `omniroute-web`). ఈ
కమాండ్లు క్రెడెన్షియల్స్ లేదా IP చిరునామాలు లేకుండా అడ్రస్ ఫ్యామిలీలను ముద్రిస్తాయి. తిరిగి వచ్చిన `6`
అనేది IPv6 DNS ఫలితాన్ని మాత్రమే సూచిస్తుంది: ఉపయోగించగల IPv6 మార్గం లేదా API యాక్సెస్ ఉందని అది
నిరూపించదు. `curl` ఇన్స్టాల్ చేసి ఉన్న చోట, రెండు ఎన్విరాన్మెంట్లలోనూ
`curl -4 -I https://generativelanguage.googleapis.com`ను
`curl -6 -I https://generativelanguage.googleapis.com`తో పోల్చండి.
ప్రామాణీకరణ చేయని లోపం వచ్చినప్పటికీ, HTTP ప్రతిస్పందన ఆ ప్రోబ్కు కనెక్టివిటీ ఉందని నిరూపిస్తుంది;
ప్రామాణీకరించిన మోడల్ అభ్యర్థన మాత్రమే Gemini అర్హతను పరీక్షిస్తుంది.

### హోస్ట్-స్థాయి ప్రత్యామ్నాయం: పనిచేసే IPv6 మరియు రిజాల్వర్ విధానం

[#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762)ను నివేదించిన వ్యక్తి,
కంటైనర్ IPv6ను ప్రారంభించి, glibc అడ్రస్ ఎంపికను మార్చడం ద్వారా వారి ఎన్విరాన్మెంట్లో
యాక్సెస్ను పునరుద్ధరించారు. దీన్ని ఎన్విరాన్మెంట్కు నిర్దిష్టమైన ప్రత్యామ్నాయంగా పరిగణించండి.
రిజాల్వర్ ప్రాధాన్యతలను సర్దుబాటు చేసే ముందు, హోస్ట్ IPv6 పనిచేస్తోందని, కంటైనర్
ఈగ్రెస్/రూటింగ్ మరియు ఫైర్వాల్ నియమాలు సరిగ్గా ఉన్నాయని నిర్ధారించండి. ఒక ప్రైవేట్ ULA చిరునామా
ఉండటం మాత్రమే పబ్లిక్ IPv6 కనెక్టివిటీని నిర్ధారించదు.

Compose యొక్క డిఫాల్ట్ నెట్వర్క్కు ఇప్పటికే అనుసంధానించిన సర్వీస్ల కోసం, ఈ ఫ్రాగ్మెంట్
ఆ నెట్వర్క్లో IPv6ను ప్రారంభిస్తుంది; మీ సర్వీస్, పోర్ట్లు, వాల్యూమ్లు మరియు కాన్ఫిగరేషన్లోని
మిగతా భాగాన్ని అలాగే ఉంచండి:

```yaml
networks:
  default:
    enable_ipv6: true
```

పేరు గల నెట్వర్క్ కోసం, సర్వీస్ వాస్తవంగా చేరే నెట్వర్క్లో దాన్ని ప్రారంభించండి. Docker ఒక
ULA సబ్నెట్ను కేటాయించగలదు; మీ నెట్వర్క్కు అవసరమైనప్పుడు మాత్రమే, ఇతర వాటితో ఓవర్ల్యాప్ కాని
స్పష్టమైన సబ్నెట్ను ఎంచుకోండి. [Docker IPv6 నెట్వర్కింగ్](https://docs.docker.com/engine/daemon/ipv6/)
మరియు [Compose నెట్వర్క్ ఎంపికలు](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6) చూడండి.

**glibc-ఆధారిత ఇమేజ్**లో, `/etc/gai.conf` అడ్రస్ ఎంపికను మార్చగలదు. ప్రస్తుత
రిపాజిటరీ Dockerfile Debianను ఉపయోగిస్తుంది; కస్టమ్ musl-ఆధారిత ఇమేజ్లు ఈ మెకానిజాన్ని
పంచుకోవు. నివేదించిన సర్దుబాటు ULA లేబుల్ను `label fc00::/7 6` నుండి
`label fc00::/7 1`కు మారుస్తుంది. ఇమేజ్లోని పూర్తి పాలసీ పట్టికతో ప్రారంభించి, దానిలోని ఇతర
ఎంట్రీలను అలాగే ఉంచండి: ఒక `label` లేదా `precedence` ఎంట్రీని జోడించడం ఆ డిఫాల్ట్ పట్టికను
భర్తీ చేస్తుంది, కాబట్టి మార్చిన పంక్తి మాత్రమే ఉన్న ఫైల్ సరిపోదు.
[glibc కాన్ఫిగరేషన్ రిఫరెన్స్](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
ఆ సెమాంటిక్స్ను డాక్యుమెంట్ చేస్తుంది. సమీక్షించిన ఫైల్ను `/etc/gai.conf` వద్ద రీడ్-ఓన్లీగా
బైండ్-మౌంట్ చేసి, దాన్ని వర్తింపజేయడానికి సర్వీస్ను మళ్లీ సృష్టించండి.

ఇది **ఆ కంటైనర్లోని మొత్తం అవుట్బౌండ్ ట్రాఫిక్** కోసం OS అడ్రస్ ఎంపికను మారుస్తుంది.
ప్రతి అప్లికేషన్ను IPv6 ఎంచుకునేలా ఇది బలవంతం చేయదు: Node యొక్క DNS క్రమం మరియు కనెక్షన్
ఎంపిక కూడా ప్రభావం చూపుతాయి. ముఖ్యంగా, `--dns-result-order=ipv4first` IPv4కు ప్రాధాన్యం
ఇస్తుంది మరియు IPv4-మాత్రమే సంభవించే వైఫల్యానికి ఇది పరిష్కారం కాదు.
[Node DNS క్రమం](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder) చూడండి.

హోస్ట్-స్థాయి మార్పు ఏదైనా చేసిన తర్వాత Geminiని మరియు మీ ఇతర ప్రొవైడర్లను మళ్లీ పరీక్షించండి.
మునుపటి స్థితికి తిరిగి వెళ్లడానికి, కస్టమ్ `gai.conf` మౌంట్ను తొలగించి, మునుపటి నెట్వర్క్
కాన్ఫిగరేషన్ను పునరుద్ధరించి, నిర్వహణ సమయ పరిధిలో ప్రభావితమైన సర్వీస్/నెట్వర్క్ను మళ్లీ
సృష్టించండి. నెట్వర్క్ను మళ్లీ సృష్టించడం వల్ల దానికి అనుసంధానించిన ఇతర కంటైనర్లకు అంతరాయం
కలగవచ్చు; శాశ్వత డేటా వాల్యూమ్ను తొలగించవద్దు.

## ముఖ్యమైన గమనికలు

- **SQLite WAL మోడ్:** OmniRoute తాజా మార్పులను తిరిగి `storage.sqlite`లో checkpoint చేయగలిగేలా `docker stop` పూర్తవడానికి అనుమతించాలి. అందించబడిన Compose ఫైళ్లు ఇప్పటికే 40s stop grace periodను సెట్ చేశాయి. మీరు imageను నేరుగా రన్ చేస్తే, `--stop-timeout 40`ను అలాగే ఉంచండి.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** సాధారణ/pre-write బ్యాకప్లు బాహ్యంగా నిర్వహించబడితే దీనిని `true`గా సెట్ చేయండి. ఇప్పటికే ఉన్న database migrationలకు ఇప్పటికీ వాటి స్వంత durable safety snapshot మరియు mass-migration guard అవసరం.
- **డేటా నిలకడ:** container restartల మధ్య మీ database, keyలు మరియు configurationలను నిల్వ ఉంచడానికి ఎల్లప్పుడూ `/app/data`కు volumeను mount చేయండి.
- **పోర్ట్ కాన్ఫిగరేషన్:** డిఫాల్ట్ `20128` పోర్ట్ను మార్చడానికి `PORT` environment variableను override చేయండి.

## ఇవి కూడా చూడండి

- [VM డిప్లాయ్మెంట్ గైడ్](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare సెటప్
- [Fly.io డిప్లాయ్మెంట్ గైడ్](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.ioకు డిప్లాయ్ చేయండి
- [ఎన్విరాన్మెంట్ కాన్ఫిగరేషన్](../reference/ENVIRONMENT.md) — పూర్తి `.env` రిఫరెన్స్
