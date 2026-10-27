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

## త్వరిత అమలు

> **ఒకే కమాండ్తో స్వయంగా హోస్ట్ చేయాలా?**
> [సెల్ఫ్-హోస్ట్ గైడ్](../getting-started/SELF_HOST_GUIDE.md) చూడండి —
> `docker compose -f docker-compose.selfhost.yml up -d` (ప్రచురించిన ఇమేజ్ +
> Redis, లూప్బ్యాక్కు మాత్రమే పరిమితం, ప్రొఫైల్ ఎంపిక లేదు). ఇప్పటికే Redisను వేరే చోట
> నడుపుతున్న వినియోగదారుల కోసం దిగువనున్న త్వరిత అమలు ఒకే కంటైనర్ మార్గం.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## ఎన్విరాన్మెంట్ ఫైల్తో

```bash
# ముందుగా .envను కాపీ చేసి సవరించండి
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

## Dockerfile దశలు

ఈ రిపోజిటరీ బహుళ-దశల Dockerfile (`Dockerfile`)ను అందిస్తుంది. నాలుగు దశలు అందుబాటులో ఉన్నాయి; మీ వినియోగ సందర్భానికి సరైన `target`ను ఎంచుకోండి.

| దశ            | బేస్ ఇమేజ్            | ఉద్దేశ్యం                                                                                                                                                                                                                                                                                                      |
| ------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | డిపెండెన్సీలను ఇన్స్టాల్ చేస్తుంది (`npm ci --legacy-peer-deps`) మరియు `npm run build`ను అమలు చేస్తుంది (డిఫాల్ట్గా Turbopack — దిగువన ఉన్న బిల్డ్-సమయ వనరులను చూడండి)                                                                                                                                         |
| `runner-base` | `node:26-trixie-slim` | Next.js స్వతంత్ర అవుట్పుట్తో ప్రొడక్షన్ రన్టైమ్. **ప్రొవైడర్ CLIలు ఏవీ బండిల్ చేయబడవు.**                                                                                                                                                                                                                       |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose` మరియు గ్లోబల్ CLIలను జోడిస్తుంది: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **ఏజెంటిక్ వర్క్ఫ్లోల కోసం దీన్ని ఎంచుకోండి.**                                                                                                                       |
| `runner-web`  | `runner-base`         | వెబ్-సెషన్ ప్రొవైడర్ల కోసం Playwright + Chromium బ్రౌజర్ను (`--with-deps`) జోడిస్తుంది: `gemini-web`, `claude-web`, `claude-turnstile`. **మీరు ఆ ప్రొవైడర్లను ఉపయోగిస్తున్నప్పుడు దీన్ని ఎంచుకోండి** — ఇది లేకుండా సాధారణ ఇమేజ్ అభ్యర్థన సమయంలో విఫలమవుతుంది (విడుదల ఛానెల్ల కింద ఉన్న `-web` గమనికను చూడండి). |

నిర్దిష్ట `target`ను మాన్యువల్గా బిల్డ్ చేయండి:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### బిల్డ్-సమయ వనరులు

`builder` దశ వినియోగించే వనరులను మూడు బిల్డ్ ఆర్గ్యుమెంట్లు నియంత్రిస్తాయి. అవి బిల్డ్ సమయంలో మాత్రమే వర్తిస్తాయి —
`OMNIROUTE_MEMORY_MB` (దిగువన) అనేది వేరైన రన్టైమ్ నియంత్రణ.

| బిల్డ్ ఆర్గ్యుమెంట్         | డిఫాల్ట్ | ప్రభావం                                                                                                      |
| --------------------------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_USE_TURBOPACK`   | `0`      | `0` webpackతో బిల్డ్ చేస్తుంది: గరిష్ఠ మెమరీ తక్కువ, కానీ నెమ్మదిగా ఉంటుంది. `1` Turbopackను ఉపయోగిస్తుంది.  |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`   | ప్రారంభించబడిన `next build` కోసం V8 హీప్ గరిష్ఠ పరిమితి (`--max-old-space-size`).                            |
| `OMNIROUTE_BUILD_WORKERS`   | `2`      | `CIRCLE_NODE_TOTAL`కు విలువను అందిస్తుంది; పేజీ-డేటా సేకరణ కోసం Next `workers = N - 1`ను ఉత్పన్నం చేస్తుంది. |

పెద్ద బిల్డర్పై పెంచాల్సినది `OMNIROUTE_BUILD_WORKERS`; పరిమిత వనరులున్న బిల్డ్
`✓ Compiled successfully` **తర్వాత** ఆగిపోతే అనుమానించాల్సినది కూడా ఇదే. ప్రతి
పేజీ-డేటా వర్కర్ దాని స్వంత ప్రాసెస్గా ఉంటుంది, అలాగే పేరెంట్ `next build` కూడా;
ప్రత్యక్ష VPS పునరుత్పత్తిలో (issue #7518), `NODE_OPTIONS` హీప్ ఫ్లాగ్తో సంబంధం
లేకుండా ప్రతి ప్రాసెస్ గరిష్ఠ RSS ~4.5 GBగా కొలవబడింది (Turbopack, V8 హీప్కు
వెలుపల ఉన్న నేటివ్/Rust మెమరీలో కంపైల్ చేస్తుంది). డిఫాల్ట్ `2` (→ 1 వర్కర్, మొత్తం
2 ప్రాసెస్లు) ప్రచురణ పైప్లైన్ ఉపయోగించే 16 GB / 4 vCPU GitHub-హోస్టెడ్ రన్నర్లకు
సరిపోయేలా నిర్ణయించబడింది. `8` వద్ద (→ 7 వర్కర్లు) ఆ రన్నర్లో మెమరీ అయిపోయి,
buildkit `ResourceExhausted: ... cannot allocate memory`తో ఆ దశను విఫలం చేసింది;
ప్రతి ప్రాసెస్ RSSను ఊహించడం బదులు నేరుగా కొలిచినప్పుడు `3` (→ 2 వర్కర్లు) కూడా
సరిపోలేదు. `tests/unit/docker-build-memory-budget.test.ts` కొలిచిన విలువ ఆధారంగా
లెక్కలు వేస్తుంది మరియు ఏ నియంత్రణ అయినా రన్నర్ సామర్థ్యాన్ని మించితే విఫలమవుతుంది.

Turbopack, V8 హీప్కు **వెలుపల** ఉండే నేటివ్ Rust మెమరీలో కంపైల్ చేస్తుంది, కాబట్టి
`OMNIROUTE_BUILD_MEMORY_MB` దాన్ని పరిమితం చేయదు. మెమరీ పరిమితి ఉన్న హోస్ట్లో
బిల్డ్ ఎలాంటి లోప సందేశం లేకుండానే OOM కిల్లర్ ద్వారా SIGKILL చేయబడుతుంది — అది
`Creating an optimized production build` మధ్యలోనే ఆగిపోతుంది; అందువల్ల ఇది
మెమరీ అయిపోవడంలా కాకుండా నిలిచిపోయినట్లుగా కనిపిస్తుంది. అందుకే `npm run dev` /
`npm run build`లో Turbopack కోడ్ డిఫాల్ట్గా ఉన్నప్పటికీ, `Dockerfile` మాత్రం
webpackను (`OMNIROUTE_USE_TURBOPACK=0`) డిఫాల్ట్గా ఉపయోగిస్తుంది: బిల్డ్
ఆర్గ్యుమెంట్లు లేని సాధారణ `docker build .` (Railway మరియు ఇతర ఒక-క్లిక్ హోస్ట్లు
అమలు చేసేది) మెమరీ పరిమితి ఉన్న బిల్డర్పై నిశ్శబ్దంగా విఫలం కాకూడదు.
ప్రచురించబడిన ఇమేజ్లు ఇప్పటికే `docker-publish.yml`లో
`OMNIROUTE_USE_TURBOPACK=0`ను స్పష్టంగా పాస్ చేస్తాయి. పుష్కలంగా RAM ఉన్న
బిల్డర్పై వేగవంతమైన బిల్డ్ కోసం Turbopackను ఉపయోగించండి:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` ప్రారంభించబడింది, కాబట్టి `next build` ఒక పేరెంట్ **మరియు**
ఒక వర్కర్ ప్రాసెస్ను అమలు చేస్తుంది; ప్రతి ఒక్కటీ `OMNIROUTE_BUILD_MEMORY_MB`ను
విడివిడిగా పాటిస్తుంది. కంటైనర్ పరిమితిని ఆ విలువకు ఒక రెట్టు కాకుండా సుమారు రెండు
రెట్లకు పైగా నిర్ణయించండి.

ఈ ట్రీపై కొలిచినవి (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| బండ్లర్   | కంటైనర్ పరిమితి | ఫలితం                                      |
| --------- | --------------- | ------------------------------------------ |
| Turbopack | 8 GiB / 16 GiB  | రెండింటి వద్ద నిశ్శబ్దంగా OOM-killed       |
| webpack   | 8 GiB           | బిల్డ్ వర్కర్ SIGKILLed                    |
| webpack   | 12 GiB          | విజయవంతమైంది, గరిష్ఠంగా 11.1 GiBకు చేరింది |

### రన్టైమ్ డిఫాల్ట్లు

`runner-base` ద్వారా ఎగుమతి చేయబడే డిఫాల్ట్లు: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Dockerలో మెమరీ ప్రవర్తన:

- ఇమేజ్ `OMNIROUTE_MEMORY_MB=1024`ను సెట్ చేసి, దాని నుండి `NODE_OPTIONS=--max-old-space-size=1024`ను ఉత్పన్నం చేస్తుంది.
- వాస్తవ సర్వర్ ప్రాసెస్ను standalone launcher ప్రారంభిస్తుంది; ఇది `OMNIROUTE_MEMORY_MB`ను చదివి, `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`ను జోడిస్తుంది.
- పునరావృతమైన `--max-old-space-size` విలువలలో చివరిదాన్ని Node ఉపయోగిస్తుంది, కాబట్టి `OMNIROUTE_MEMORY_MB`ను సెట్ చేయడం ద్వారా ప్రభావవంతమైన Docker heap పరిమితి నియంత్రించబడుతుంది.
- ఇమేజ్ దీన్ని ఎల్లప్పుడూ సెట్ చేస్తుంది కాబట్టి, launcherకు చెందిన RAM-ఆధారిత fallback Dockerలో ఎప్పుడూ వర్తించదు. workloadకు అనుగుణంగా దీన్ని స్పష్టంగా పెంచండి (దిగువ పట్టిక చూడండి). coding-agent `/v1/responses` కోసం `2048` కూడా చాలా తక్కువే.

### coding agents కోసం runtime RAM

1 GiB Docker డిఫాల్ట్ అనేది dashboard/తేలికపాటి-chatకు కనీస స్థాయి మాత్రమే, production పరిమాణం కాదు. పొడవైన `POST /v1/responses` bodyలు (వందలాది messages, పదుల సంఖ్యలో tools) compression సమయంలో అనేక in-memory graphలను నిలుపుకుంటాయి. ఒకేసారి అమలైన రెండు ~3 MiB / ~750k-token requestలు **12 GiB** old-space వద్ద V8ను abort చేశాయి (`FATAL ERROR: Reached heap limit`), అలాగే 16 GiB cgroup OOMకు కూడా కారణమయ్యాయి. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) చూడండి.

**cgroup `--memory`ను heap కంటే ఎక్కువగా** పరిమాణీకరించండి — native bufferలు, SQLite, compression intermediateలు V8 వెలుపల ఉంటాయి.

| Workload                             | `OMNIROUTE_MEMORY_MB`   | Container / cgroup    | గమనికలు                                                                                                             |
| ------------------------------------ | ----------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Dashboard, ఒక తేలికపాటి chat         | `1024` (ఇమేజ్ డిఫాల్ట్) | ≥2 GiB                |                                                                                                                     |
| ఒక coding agent (Claude/Codex/Grok)  | `8192`                  | ≥10 GiB               | సాధారణ single-session `/v1/responses`                                                                               |
| ఒకేసారి రెండు పొడవైన `/v1/responses` | `10240`–`12288`         | ≥12–16 GiB            | ~12 GiB heap వద్ద V8 abort కొలవబడింది                                                                               |
| ఒకేసారి మూడు+ పొడవైన contextలు       | ఒకే processలో చేయవద్దు  | serialize / మరింత RAM | డిఫాల్ట్ heavyweight admissionలో 1 in-flight మాత్రమే ఉంటుంది; RAM పెంచకుండా దీన్ని పెంచితే abort మళ్లీ సంభవిస్తుంది |

`OMNIROUTE_MEMORY_MB` **సెట్ చేయబడనప్పుడు**, bare metalపై `omniroute serve` RAMలో ~35%కు calibrate అవుతుంది (`[512, 4096]` పరిధికి పరిమితం చేయబడుతుంది). Docker ఎల్లప్పుడూ `1024`ను సెట్ చేస్తుంది, కాబట్టి అధికారిక ఇమేజ్లో ఆ calibration ఎప్పుడూ అమలు కాదు.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
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

## ఉపమార్గంలో రివర్స్ ప్రాక్సీ (Traefik / nginx)

Next.js `basePath` standalone బండిల్లో కంపైల్ చేయబడుతుంది. OmniRoute యాప్ రూట్లోని ఒక సెంటినెల్ ఫైల్లో బేక్ చేసిన విలువను నమోదు చేస్తుంది (`npm run build` సమయంలో వ్రాయబడుతుంది; `scripts/docker/ensure-docker-base-path.mjs` ద్వారా చదవబడుతుంది) మరియు కంటైనర్ ప్రారంభమైనప్పుడు దానిని `OMNIROUTE_BASE_PATH`తో పోలుస్తుంది. అవి వేర్వేరుగా ఉండి, ఇమేజ్ డొమైన్ రూట్ కోసం బిల్డ్ చేయబడి ఉంటే, `node dev/run-standalone.mjs` రన్ కావడానికి ముందు ఎంట్రీపాయింట్ standalone మానిఫెస్ట్లను, ఎంబెడ్ చేసిన `basePath`/`assetPrefix` లిటరల్లను (Next 16 SSR అసెట్ URLలను కేవలం `assetPrefix` నుంచే రెండర్ చేస్తుంది — ప్యాచర్ ఉపమార్గాన్ని దానిలోనూ ప్రతిబింబిస్తుంది), బేక్ చేసిన `/_next/static` అసెట్ URLలను (క్లయింట్-రిఫరెన్స్ మానిఫెస్ట్లు, మీడియా ఇంపోర్ట్లు, ముందుగా రెండర్ చేసిన ఎర్రర్ పేజీలు) మరియు క్లయింట్ `process.env` షిమ్ను తిరిగి వ్రాస్తుంది.

### Compose బిల్డ్ (సిఫార్సు చేయబడింది)

ఇమేజ్ మరియు రన్టైమ్ ఒకేలా ఉండేలా `.env`లో రెండు వేరియబుల్లను సెట్ చేసి, ఆపై మళ్లీ బిల్డ్ చేయండి:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml`, `OMNIROUTE_BASE_PATH`ను Docker బిల్డ్ ఆర్గ్యుమెంట్గా మరియు రన్టైమ్ ఎన్విరాన్మెంట్ వేరియబుల్గా ఫార్వర్డ్ చేస్తుంది.

### ముందుగా బిల్డ్ చేసిన రూట్ ఇమేజ్ + రన్టైమ్ ఉపమార్గం

ప్రచురించబడిన `diegosouzapw/omniroute:*` ఇమేజ్లు డొమైన్ రూట్ కోసం బిల్డ్ చేయబడ్డాయి. అయినప్పటికీ, మీరు రన్టైమ్లో `OMNIROUTE_BASE_PATH`ను సెట్ చేయవచ్చు; ప్రారంభ సమయంలో కంటైనర్ బండిల్ను ఒకసారి ప్యాచ్ చేస్తుంది. దానికి సరిపోలే పబ్లిక్ ఆరిజిన్ను జత చేయండి:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

రివర్స్ ప్రాక్సీని **పూర్తి** బాహ్య మార్గాన్ని ఫార్వర్డ్ చేసేలా కాన్ఫిగర్ చేయండి (ప్రిఫిక్స్ను తొలగించవద్దు). Traefik, `StripPrefix` లేకుండా `PathPrefix(`/omniroute`)`ను కంటైనర్కు రూట్ చేయాలి, తద్వారా Next.jsకు `/omniroute/...` అందుతుంది మరియు అది `/omniroute/_next/...` నుంచి అసెట్లను అందిస్తుంది.

Docker హెల్త్చెక్, సక్రియ `OMNIROUTE_BASE_PATH` ప్రిఫిక్స్తో కూడిన తేలికపాటి `/healthz` లైఫ్సైకిల్ ఎండ్పాయింట్ను ప్రోబ్ చేస్తుంది. మానవ/డ్యాష్బోర్డ్ డయాగ్నస్టిక్స్ కోసం `/api/monitoring/health` అందుబాటులోనే ఉంటుంది; కంటైనర్ HEALTHCHECKను మళ్లీ దానివైపు మళ్లించడానికి (ఉదాహరణకు, లోతైన ఆరోగ్య తనిఖీని అమలు చేయడానికి), `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`ను సెట్ చేయండి. ఆ మార్గం ఒక **లోతైన** తనిఖీ (DB + మానిటరింగ్ సారాంశం) — మీరు మళ్లీ ఎంపిక చేసుకుంటే, Docker అరుదుగా చేసే `HEALTHCHECK`కు ఇది సముచితం, కానీ Kubernetes `livenessProbe` విరామాలకు **కాదు**.

ఆర్కెస్ట్రేటర్ల కోసం (Kubernetes, Nomad మొదలైనవి):

| ప్రోబ్               | ప్రాధాన్యం ఇవ్వాల్సినది                                                | నివారించాల్సినది                                                  |
| -------------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------- |
| లైవ్నెస్             | HTTP `GET /livez`, లేదా ప్రధాన పోర్ట్లో TCP (`PORT`, డిఫాల్ట్ `20128`) | లైవ్నెస్గా `/api/monitoring/health`                               |
| రెడీనెస్             | HTTP `GET /healthz`                                                    | ఈవెంట్-లూప్ బిజీగా ఉండటాన్ని డెడ్గా పరిగణించే కఠినమైన టైమ్అవుట్లు |
| లోతైన / బ్లాక్బాక్స్ | `/api/monitoring/health`                                               | —                                                                 |

`/healthz` ప్రాసెస్ లైఫ్సైకిల్ను (`ok` / `starting` / `stopping`) నివేదిస్తుంది. `/livez` కేవలం ప్రాసెస్ సజీవంగా ఉందో లేదో మాత్రమే సూచిస్తుంది (హ్యాండ్లర్ రన్ చేయగలిగినప్పుడల్లా 200; ఇది రెడీనెస్ కోసం వేచి ఉండదు). రెండూ ఇప్పటికీ రిక్వెస్ట్ హ్యాండ్లింగ్కు ఉపయోగించే అదే Node ఈవెంట్ లూప్లో రన్ అవుతాయి, కాబట్టి CPU-బౌండ్ కేటలాగ్ లేదా కంప్రెషన్ పని వాటిని ఆలస్యం చేయవచ్చు — బిజీ ≠ డెడ్. HTTP ప్రోబ్లు టైమ్ అవుట్ అయితే TCP లైవ్నెస్కు ప్రాధాన్యం ఇవ్వండి. పూర్తి ప్రోబ్ మార్గదర్శకత్వం:
[మానిటరింగ్ గైడ్ — Kubernetes ప్రోబ్ సిఫార్సులు](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Caddyతో Docker Compose (HTTPS Auto-TLS)

Caddy యొక్క ఆటోమేటిక్ SSL ప్రొవిజనింగ్ను ఉపయోగించి OmniRouteను సురక్షితంగా అందుబాటులో ఉంచవచ్చు. మీ డొమైన్ DNS A రికార్డ్ మీ సర్వర్ IPని సూచిస్తోందని నిర్ధారించుకోండి.

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
      # OAuth కాల్బ్యాక్లు, డ్యాష్బోర్డ్ లింక్లు మరియు రూపొందించిన పబ్లిక్ URLల కోసం బ్రౌజర్కు కనిపించే మూలం.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # షెడ్యూల్ చేసిన జాబ్లు / స్వీయ-ఫెచ్ల కోసం అంతర్గత సర్వర్-టు-సర్వర్ URL.
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

అప్స్ట్రీమ్ కంటైనర్ కోసం Caddy ప్రామాణిక ఫార్వార్డింగ్ హెడర్లను సెట్ చేస్తుంది. OAuth కాల్బ్యాక్లు మరియు రూపొందించిన పబ్లిక్
లింక్లకు కానానికల్ పబ్లిక్ మూలంగా OmniRoute `NEXT_PUBLIC_BASE_URL`ను ఉపయోగిస్తుంది; ప్రమాణీకరించిన డ్యాష్బోర్డ్ రైట్లు అదే-మూలం అభ్యర్థనలతో పాటు సెషన్కు అనుసంధానించిన CSRF
రక్షణను ఉపయోగిస్తాయి. స్పష్టమైన కాన్ఫిగరేషన్కు బదులుగా విశ్వసనీయంగా ఫార్వార్డ్ చేసిన హెడర్ల నుంచి OmniRoute పబ్లిక్ మూలాన్ని ఉద్దేశపూర్వకంగా
నిర్ధారించాలని మీరు కోరుకునే అధునాతన డిప్లాయ్మెంట్ల కోసం మాత్రమే `OMNIROUTE_TRUST_PROXY`ను ప్రారంభించండి.

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

## ఇమేజ్ ట్యాగ్లు

| ఇమేజ్                    | ట్యాగ్   | పరిమాణం | వివరణ                                               |
| ------------------------ | -------- | ------- | --------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB  | అత్యధిక **ప్రచురిత** స్థిర SemVer (git `main` కాదు) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB  | GitOps కోసం ఈ తరహా ట్యాగ్ను పిన్ చేయండి             |

బహుళ-ప్లాట్ఫారమ్ మానిఫెస్ట్: `linux/amd64` + `linux/arm64` నేటివ్ (Apple Silicon, AWS Graviton, Raspberry Pi). సరిపోలే ఆర్కిటెక్చర్ను Docker స్వయంచాలకంగా ఎంచుకుంటుంది; ARM హోస్ట్లపై AMD64 ఎమ్యులేషన్ను బలవంతంగా ఉపయోగించాల్సి వస్తే `--platform linux/amd64`ను పాస్ చేయండి.

### విడుదల ఛానెల్లు

స్థిర విడుదలలు, సక్రియ విడుదల-బ్రాంచ్ టెస్టింగ్ మరియు డెవలప్మెంట్ బిల్డ్ల కోసం OmniRoute వేర్వేరు Docker ఛానెల్లను ప్రచురిస్తుంది.

| ఛానెల్                          | మూలం                                   | మార్పు సామర్థ్యం             | సిఫార్సు చేసిన వినియోగం                                                                                                    |
| ------------------------------- | -------------------------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | సంతకం చేసిన/వెర్షన్ చేసిన విడుదల       | మార్పులేనిది                 | ఖచ్చితమైన విడుదలను పిన్ చేసే ప్రొడక్షన్ డిప్లాయ్మెంట్లు                                                                    |
| `:latest` / `:latest-web`       | అత్యధిక **ప్రచురిత** స్థిర SemVer      | మార్చగల స్థిర పాయింటర్       | SemVer ప్రచురణ జాబ్ **తర్వాత** స్థిర విడుదలలను అనుసరిస్తుంది — `main`ను లేదా విడుదల చేయని `release/v*` కమిట్లను అనుసరించదు |
| `:next` / `:next-web`           | ప్రస్తుత డిఫాల్ట్ `release/v*` బ్రాంచ్ | మార్చగల ప్రీ-రిలీజ్ పాయింటర్ | సక్రియ విడుదల బ్రాంచ్లో చేర్చబడినప్పటికీ ఇంకా స్థిర విడుదలలో లేని పరిష్కారాలను పరీక్షించడం                                 |
| `:main` / `:main-web`           | `main` బ్రాంచ్                         | మార్చగల డెవలప్మెంట్ పాయింటర్ | డెవలప్మెంట్ మరియు ఇంటిగ్రేషన్ టెస్టింగ్ కోసం మాత్రమే                                                                       |

#### వెబ్-సెషన్ ప్రొవైడర్లు: `-web` ఇమేజ్లు

పైన ఉన్న ప్రతి ఛానెల్కు `-web` ట్యాగ్ (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`) కూడా ఉంటుంది; ఇది `runner-web` స్టేజ్ నుంచి బిల్డ్ చేయబడుతుంది — అదే ఇమేజ్తో పాటు Playwright మరియు Chromium బ్రౌజర్ ఉంటాయి. సాధారణ ఇమేజ్ Chromium **లేకుండా** అందించబడుతుంది; `gemini-web`, `claude-web` మరియు `claude-turnstile`లకు అది అవసరం.

వైఫల్యం స్టార్టప్ సమయంలో కాకుండా వాయిదా వేయబడుతుంది: ఆ ప్రొవైడర్లు తమ మోడల్లను జాబితా చేసి, డ్యాష్బోర్డ్లో కనెక్ట్ అయినట్లు కనిపిస్తాయి; మొదటి అభ్యర్థన మాత్రమే కింది లోపంతో విఫలమవుతుంది

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

మీరు ఆ ప్రొవైడర్లను ఉపయోగిస్తే, మీరు ఇప్పటికే ఉపయోగిస్తున్న ఛానెల్కు చెందిన `-web` ట్యాగ్ను పుల్ చేయండి — మరేదీ మారదు. npm/CLI ఇన్స్టాలేషన్లో (Docker ఇమేజ్ లేకుండా), దీనికి సమానంగా లేని భాగం బ్రౌజర్ బైనరీ: హోస్ట్పై `npx playwright install chromium` అమలు చేయండి.

#### ప్రీ-రిలీజ్ ఛానెల్ను ఉపయోగించడం

`next` ఛానల్ ప్రస్తుత డిఫాల్ట్ `release/v*` బ్రాంచ్కు చేసే ప్రతి push సమయంలో మళ్లీ నిర్మించబడుతుంది మరియు AMD64, ARM64 రెండింటికీ ప్రచురించబడుతుంది. పాత నిర్వహణ బ్రాంచ్లు దాన్ని ఓవర్రైట్ చేయలేవు. తదుపరి స్థిరమైన ట్యాగ్ రూపొందించబడటానికి ముందు, సక్రియ విడుదల బ్రాంచ్లో విలీనం చేయబడిన పరిష్కారాల కోసం ఈ ఛానల్ పుల్ చేయగల ఇమేజ్ను అందిస్తుంది.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose కోసం, ఎంచుకున్న ప్రొఫైల్ ఉపయోగించే ఇమేజ్ ట్యాగ్ను ఓవర్రైడ్ చేసి, ఆపై సర్వీస్ను పుల్ చేసి మళ్లీ సృష్టించండి:

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

`next` అనేది మారుతూ ఉండే ప్రీ-రిలీజ్ ఛానల్. సక్రియ విడుదల బ్రాంచ్కు చేసే ఏ push సమయంలోనైనా ఇది మారవచ్చు మరియు ఇది **ప్రొడక్షన్ వినియోగానికి మద్దతు ఇవ్వదు**. నిర్దిష్ట బిల్డ్ను మూల్యాంకనం చేస్తున్నప్పుడు ఇమేజ్ డైజెస్ట్ను పిన్ చేయండి:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

పరీక్షించే ముందు, OmniRoute డేటా వాల్యూమ్ లేదా bind-mounted డేటా డైరెక్టరీని బ్యాకప్ చేయండి. రోల్బ్యాక్ చేయడానికి, గతంలో ఉపయోగించిన స్థిరమైన వెర్షన్ లేదా డైజెస్ట్ను పునరుద్ధరించి, కంటైనర్ను మళ్లీ సృష్టించండి:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

విడుదల-బ్రాంచ్ బిల్డ్ ఎన్నటికీ `latest`ను మార్చలేదు; అర్హతగల స్థిరమైన సిమాంటిక్ వెర్షన్ మాత్రమే స్థిరమైన పాయింటర్ను ప్రమోట్ చేయగలదు. `next` ఇమేజ్లు విడుదల ఇమేజ్ తనిఖీని మరియు CRITICAL దుర్బలతలను నిరోధించే గేట్ను కొనసాగిస్తాయి.

**`latest` అనేది git తాజాదనానికి హామీ కాదు.** `main`లో లేదా సక్రియ `release/v*` బ్రాంచ్లో విలీనం చేసిన పరిష్కారాలు, స్థిరమైన SemVer ఇమేజ్ ప్రచురించబడి, ప్రచురణ జాబ్ `:latest`ను ప్రమోట్ చేసే వరకు **`:latest`లో ఉండవు** (ఆ SemVerతో అదే డైజెస్ట్). GitHubలో పరిష్కారం ఇప్పటికే కనిపిస్తున్నప్పటికీ `latest` నిలిచిపోయినట్లు కనిపిస్తే, విడుదల బ్రాంచ్ను పరీక్షించడానికి `:next`ను పుల్ చేయండి లేదా SemVer ట్యాగ్ కోసం వేచి ఉండండి.

| మీకు కావలసింది                                                                            | ఉపయోగించాల్సింది                               |
| ----------------------------------------------------------------------------------------- | ---------------------------------------------- |
| మార్పులకు లోనుకాకూడని GitOps / ప్రొడక్షన్                                                 | `:X.Y.Z`ను పిన్ చేయండి (లేదా ఇమేజ్ డైజెస్ట్ను) |
| ప్రచురించిన స్థిరమైన విడుదలలను అనుసరించి, ప్రతి విడుదలపై మళ్లీ సృష్టించడాన్ని అంగీకరించడం | `:latest`                                      |
| విడుదల చేయని `release/v*` కమిట్లను పరీక్షించడం                                            | `:next` (ప్రొడక్షన్ కోసం కాదు)                 |
| `main`ను పరీక్షించడం                                                                      | `:main` (ప్రొడక్షన్ కోసం కాదు)                 |

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

## లభ్యత: డిఫాల్ట్ SQLite ఒకే రెప్లికాకు పరిమితం

ప్రామాణిక Docker / Kubernetes OmniRoute అనేది **ఒక Node ప్రాసెస్ + ఒక SQLite writer**. ఈ టోపాలజీలో అధిక లభ్యతకు **మద్దతు లేదు**.

| పరిమితి                                                | పరిణామం                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ఒకే writer                                             | ఒకే SQLite ఫైల్పై బహుళ రెప్లికాలను **రన్ చేయవద్దు**. అలా చేస్తే DB దెబ్బతింటుంది.                                                                                                                                                                                                                                                                       |
| మళ్లీ సృష్టించడం / పునఃప్రారంభించడం / HEALTHCHECK kill | ప్రాసెస్లో ఉన్న SSE, డాష్బోర్డ్ సెషన్లు మరియు ఇన్-మెమరీ స్థితికి **పూర్తి అంతరాయం**. కనెక్ట్ అయిన ప్రతి క్లయింట్ డిస్కనెక్ట్ అవుతుంది. ఎండ్పాయింట్ ఖాళీగా ఉండే సమయంలో వచ్చే కొత్త అభ్యర్థనలకు OmniRoute JSON కాకుండా, రివర్స్-ప్రాక్సీ **`502 Bad Gateway: Unknown error`** వస్తుంది — క్లయింట్లు దీన్ని ప్రొవైడర్ వైఫల్యం నుండి వేరు చేయలేరు (#11015). |
| `/healthz`తో ఒకే event loop                            | బిజీగా ఉన్న catalog లేదా compression tick ప్రోబ్లను ఆలస్యం చేయగలదు; అప్పుడు తక్కువ timeout **ఏకైక** రెప్లికాను పునఃప్రారంభిస్తుంది.                                                                                                                                                                                                                     |

**ప్రోబ్ మ్యాట్రిక్స్** ([Kubernetes ప్రోబ్ సిఫార్సులు](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) కూడా చూడండి):

| ప్రోబ్         | లక్ష్యం                                                      | ఉపయోగించవద్దు                                                        |
| -------------- | ------------------------------------------------------------ | -------------------------------------------------------------------- |
| Liveness       | `PORT`పై TCP (డిఫాల్ట్ `20128`), లేదా సాఫ్ట్ HTTP `/healthz` | `/api/monitoring/health`                                             |
| Readiness      | HTTP `GET /healthz`                                          | event-loop బిజీగా ఉండటాన్ని పనిచేయడం లేదని భావించే కఠినమైన timeoutలు |
| Deep / మానవులు | `/api/monitoring/health`                                     | ఆటోమేటెడ్ kubelet liveness                                           |

**అప్గ్రేడ్లు:** ప్రతి సెషన్ డిస్కనెక్ట్ అవుతుందని ఊహించండి. సాధ్యమైతే క్లయింట్లను drain చేయండి; డిఫాల్ట్ SQLiteపై rolling update లేదు. Compose `restart: unless-stopped`తో పాటు Docker `HEALTHCHECK` కూడా కంటైనర్ Unhealthyగా మారినప్పుడు ఏకైక ప్రాసెస్ను భర్తీ చేస్తుంది — ప్రభావ పరిధి అదే.

**ఒకే రెప్లికా** కోసం Kubernetes స్నిపెట్ (Recreate అవసరం; ఒక SQLite ఫైల్పై `replicas`ను పెంచవద్దు):

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

`preStop` sleep వల్ల SIGTERMకు ముందు kube Service endpointsను తొలగించగలదు, తద్వారా **కొత్త** ట్రాఫిక్ ఆగిపోతున్న ప్రాసెస్ను చేరడం ఆగుతుంది. ప్రాసెస్లో కొనసాగుతున్న `/v1/responses` SSE, heavyweight admission leases (#11015) ద్వారా `SHUTDOWN_TIMEOUT_MS` (డిఫాల్ట్గా 30s) వరకు పూర్తయ్యేందుకు సమయం ఇవ్వబడుతుంది. అయినప్పటికీ ప్రాసెస్ను చేరే కొత్త అభ్యర్థనలకు `503` + `Retry-After: 5` లభిస్తాయి. ప్రత్యామ్నాయ ప్రాసెస్ Ready అయ్యే వరకు ఉండే Recreate empty-endpoint అంతరం పూర్తి సేవా అంతరాయంగానే ఉంటుంది — అది SQLite topology స్వభావం, probe తప్పు కాన్ఫిగరేషన్ కాదు.

External Postgres / multi-writer HA అనేది డాక్యుమెంట్ చేయబడిన ప్రామాణిక మార్గం **కాదు**. మీకు HA అవసరమైతే, ఒకే replicaను ఉంచండి లేదా ప్రాజెక్ట్ విడిగా పరీక్షించి డాక్యుమెంట్ చేసిన topologyని అమలు చేయండి. Postgres/MySQL పని [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)లో కొనసాగుతోంది. అది విడుదలయ్యే వరకు, **పెద్ద** `/v1/responses` సామర్థ్యాన్ని పెంచడానికి మద్దతు ఉన్న ఏకైక మార్గం N స్వతంత్ర ప్రాసెస్లను ఉపయోగించడం (తదుపరి విభాగం); ఒకే volumeపై `replicas > 1`ను ఉపయోగించడం కాదు.

## స్కేల్-అవుట్: N స్వతంత్ర ప్రాసెస్లు

ఒక Node ప్రాసెస్ అంటే **ఒక V8 హీప్**. ఒకదానితో మరొకటి ఓవర్ల్యాప్ అయ్యే ~3 MiB / ~750k-token కోడింగ్-ఏజెంట్ `POST /v1/responses` అభ్యర్థనలు రెండు (RTK + Caveman), ~12 Gi వద్ద ఆ హీప్ను అబోర్ట్ చేస్తాయి (`FATAL ERROR: Reached heap limit`) మరియు 16 Gi cgroupలో OOMకు కారణం కావచ్చు. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) చూడండి. ఆ కొలత ఒక **మెమరీ-బడ్జెట్** హెచ్చరిక మాత్రమే, ఏకకాలంలో నడిచే దీర్ఘకాలిక `/v1/responses` అభ్యర్థనలకు ఉత్పత్తి నిర్దేశించిన గరిష్ఠ పరిమితి రెండు అని కాదు. హెవీవెయిట్ చాట్ ప్రవేశం, అదే V8/cgroup పరిమితి ఆధారంగా పరిమాణం స్వయంచాలకంగా నిర్ణయించబడే ఇన్జెస్ట్ బైట్ బడ్జెట్ (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) ద్వారా నియంత్రించబడుతుంది — ఇప్పటికే తగిన పరిమాణానికి కాన్ఫిగర్ చేసిన ప్రాసెస్లో దాన్ని పెంచి ఓవర్రైడ్ చేయడం (లేదా పాత `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` అభ్యర్థన-సంఖ్య పరిమితిని సెట్ చేయడం) అబోర్ట్ను మళ్లీ కలిగిస్తుంది. చిన్న చాట్లు, `/healthz`, `/v1/models`, మరియు MCP ఆ పరిమితిలో **ఉండవు**.

### ఒక ప్రాసెస్: రెండు కంటే ఎక్కువ దీర్ఘకాలిక `/v1/responses`

ఒక **ఆరోగ్యకరమైన** ప్రాసెస్ (హీప్ `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` కంటే తక్కువగా ఉంటే, డిఫాల్ట్ `0.75`), ప్రాసెస్-వ్యాప్త ఇన్ఫ్లైట్-బైట్ బడ్జెట్లో (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) ఇంకా స్థలం ఉన్నప్పుడు, ఏకకాలంలో రెండు కంటే ఎక్కువ దీర్ఘకాలిక `POST /v1/responses` అభ్యర్థనలను అమలు **చేయవచ్చు**. `OMNIROUTE_CHAT_LARGE_BODY_BYTES`కు సమానంగా లేదా అంతకంటే ఎక్కువగా ఉన్న బాడీలు (డిఫాల్ట్ 256 KiB), నిర్మాణపరంగా భారీగా ఉండే అభ్యర్థనల మాదిరిగానే అదే హెవీవెయిట్ లీజ్ను తీసుకుంటాయి మరియు అదే [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` ఎస్కేప్ను (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) ఉపయోగిస్తాయి. ఏకకాలంలో పదుల సంఖ్యలో దీర్ఘకాలిక SSE క్లయింట్లు (ఆపరేటర్లకు తరచుగా 40–50 అవసరమవుతాయి) ఉండటం ఒక **మెమరీ-బడ్జెట్** ప్రశ్న — హీప్ + ప్రైమరీ/హెడ్రూమ్ స్లాట్లు + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` పరిమాణాలను సరిగ్గా నిర్ణయించాలి — అంతేకానీ అది ఉత్పత్తిలోని కఠినమైన “గరిష్ఠం 2” పరిమితి కాదు. ఒత్తిడిలో ఉన్న హీప్ ఇప్పటికీ మళ్లీ ప్రయత్నించగల `503`తో లోడ్ను తొలగిస్తుంది, కాబట్టి #7849 మళ్లీ సంభవించదు.

**హీప్లను గుణించడానికి** (స్వతంత్ర V8 old-spaces) **ప్రస్తుతం**:

| చేయవలసినవి                                                                                                                                                                       | చేయకూడనివి                                                            |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| **N containers/pods** అమలు చేయండి, ప్రతి దానికి దాని **స్వంత** `DATA_DIR` / volume ఉండాలి                                                                                        | ఒకే SQLite ఫైల్పై `replicas > 1` సెట్ చేయడం                           |
| హీప్ / ఇన్ఫ్లైట్-బైట్ బడ్జెట్ ఆధారంగా హెవీ ఇన్-ఫ్లైట్ + హెల్తీ-హెడ్రూమ్ను పరిమాణీకరించండి; 1–2 అనేది సురక్షితమైన #7849 డిఫాల్ట్ మాత్రమే, ఉత్పత్తి యొక్క కఠిన గరిష్ఠ పరిమితి కాదు | ఒక ప్రాసెస్కు 8× RAM మరియు అపరిమిత సంఖ్యా పరిమితిని ఇవ్వడం            |
| ఐచ్ఛికం: **భాగస్వామ్య కోటా కౌంటర్ల** కోసం `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL`                                                                                   | Redisను భాగస్వామ్య SQLiteగా పరిగణించడం — అది అలాంటిది కాదు            |
| ప్రతి ఇన్స్టాన్స్లో ప్రొవైడర్ సీక్రెట్లను నకలు చేయండి (లేదా విభజించబడిన డాష్బోర్డ్లను అంగీకరించండి)                                                                              | ఇన్స్టాన్స్లన్నింటికీ ఒకే డాష్బోర్డ్ / ఒకే కాల్-లాగ్ ఉంటుందని ఆశించడం |
| ఏదైనా లోడ్ బ్యాలెన్సర్ను ముందు ఉంచండి; API కీ లేదా సెషన్ ఆధారంగా స్టికీ చేయడం సరిపోతుంది                                                                                         | వెండర్కు ప్రత్యేకమైన పరిమాణ-అవగాహన గల మిడిల్వేర్ను తప్పనిసరిగా కోరడం  |

హార్డ్వేర్: ఒక్కో ఇన్స్టాన్స్లో ఏకకాలిక దీర్ఘకాలిక `/v1/responses` సంఖ్య ఒక **మెమరీ-బడ్జెట్** ప్రశ్న (హీప్ + ఇన్ఫ్లైట్-బైట్ / #10110). `N` స్వతంత్ర `DATA_DIR`లు ఇప్పటికీ హీప్లను గుణిస్తాయి: హోస్ట్ RAM `N × cgroup`కు సరిపోవాలి, “N=8 ఉన్న ఒక 16 Gi pod”కు కాదు. ఒకే SQLite ఫైల్పై ఎప్పుడూ `replicas > 1` ఉపయోగించవద్దు.

Compose నమూనా (రెండు హీప్లు, రెండు వాల్యూమ్లు — `deploy.replicas: 2` కాదు):

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

ఇన్-ప్రాసెస్ డెన్సిటీ (HTTP isolate వెలుపల కంప్రెషన్) వివరాలు [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023)లో ఉన్నాయి. భాగస్వామ్య స్థిరమైన స్టేట్పై ఒక లాజికల్ క్లస్టర్ వివరాలు [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)లో ఉన్నాయి.

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
