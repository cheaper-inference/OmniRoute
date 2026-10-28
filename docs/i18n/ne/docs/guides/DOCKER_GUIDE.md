# 🐳 Docker Guide — OmniRoute (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Docker परिनियोजनको पूर्ण सन्दर्भ। छिटो सुरु गर्न, [README को Docker खण्ड](../README.md#-docker) हेर्नुहोस्।

## विषयसूची

- [द्रुत सञ्चालन](#quick-run)
- [Environment फाइलसहित](#with-environment-file)
- [Docker Compose](#docker-compose)
- [उपलब्ध प्रोफाइलहरू](#available-profiles)
- [OmniRoute Docker मा चल्दा होस्ट CLI उपकरणहरू कन्फिगर गर्ने](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [उत्पादन Compose](#production-compose)
- [Dockerfile चरणहरू](#dockerfile-stages)
- [महत्त्वपूर्ण Environment चरहरू](#critical-environment-variables)
- [Caddy (HTTPS) सहित Docker Compose](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [Image ट्यागहरू](#image-tags)
- [Docker मा Dashboard अद्यावधिकहरू](#dashboard-updates-in-docker)
- [उपलब्धता: पूर्वनिर्धारित SQLite एकल प्रतिकृति हो](#availability-default-sqlite-is-single-replica)
- [Docker भित्र Gemini का क्षेत्रीय त्रुटिहरू](#gemini-regional-errors-inside-docker)
- [महत्त्वपूर्ण टिप्पणीहरू](#important-notes)

---

## द्रुत सञ्चालन

> **एउटै कमाण्डमा self-host गर्ने?**  
> [Self-Host मार्गदर्शिका](../getting-started/SELF_HOST_GUIDE.md) हेर्नुहोस् —
> `docker compose -f docker-compose.selfhost.yml up -d` (प्रकाशित image +
> Redis, loopback मा मात्र, प्रोफाइल छनोट आवश्यक छैन)। तलको द्रुत सञ्चालन भनेको
> पहिले नै अन्यत्र Redis चलाइरहेका प्रयोगकर्ताहरूका लागि एकल-container विधि हो।

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Environment फाइलसहित

```bash
# पहिले .env प्रतिलिपि गरेर सम्पादन गर्नुहोस्
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
# आधारभूत प्रोफाइल (CLI उपकरणहरू छैनन्)
docker compose --profile base up -d

# CLI प्रोफाइल (Claude Code, Codex, OpenClaw बिल्ट-इन)
docker compose --profile cli up -d

# होस्ट प्रोफाइल (मुख्यतः Linux का लागि; होस्ट CLI binary हरू read-only रूपमा mount गर्छ)
docker compose --profile host up -d

# वेब प्रोफाइल (वेब-session provider हरूका लागि Chromium/Playwright)
docker compose --profile web up -d

# CLI + CLIProxyAPI sidecar संयोजन गर्नुहोस्
docker compose --profile cli --profile cliproxyapi up -d
```

## उपलब्ध प्रोफाइलहरू

OmniRoute मुख्य परिनियोजन संरचनाहरूका लागि Compose प्रोफाइलहरूसहित आउँछ। आफ्नो वातावरणसँग मेल खाने प्रोफाइल छान्नुहोस्।

| प्रोफाइल                | सेवा             | कहिले प्रयोग गर्ने                                                                                                                     | कमाण्ड                                       |
| ----------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (पूर्वनिर्धारित) | `omniroute-base` | Headless server / न्यूनतम runtime, कुनै provider CLI समावेश गरिएको छैन                                                                 | `docker compose --profile base up -d`        |
| `cli`                   | `omniroute-cli`  | `omniroute providers/setup/doctor` र समावेश गरिएका CLI हरू (Codex, Claude Code, Droid, OpenClaw) कल गर्ने agentic workflow हरू         | `docker compose --profile cli up -d`         |
| `host`                  | `omniroute-host` | `~/.local/bin`, `~/.codex`, `~/.claude`, आदि read-only रूपमा mount गरेर होस्ट CLI हरूमा `network_mode`-समान पहुँच चाहने Linux होस्टहरू | `docker compose --profile host up -d`        |
| `cliproxyapi`           | `cliproxyapi`    | upstream CLI proxying का लागि पोर्ट `8317` मा [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) sidecar चलाउनुहोस्           | `docker compose --profile cliproxyapi up -d` |
| `web`                   | `omniroute-web`  | ब्राउजर चाहिने वेब-session provider हरू: `gemini-web`, `claude-web`, `claude-turnstile` (`runner-web` build गर्छ, Chromium समावेश छ)   | `docker compose --profile web up -d`         |

> धेरै प्रोफाइलहरू संयोजन गर्न सकिन्छ: `docker compose --profile cli --profile cliproxyapi up -d`।

## OmniRoute Docker मा चल्दा होस्ट CLI उपकरणहरू कन्फिगर गर्ने

`omniroute setup-codex`, `setup-claude`, `config set <tool>` र ड्यासबोर्डको
**कन्फिग सुरक्षित गर्नुहोस्** बटनले `~/.codex/*.config.toml` जस्ता फाइलहरू लेख्छन्। ती पथहरू
CLI वास्तवमै चल्ने मेसिनमा मात्र अर्थपूर्ण हुन्छन्। तिनलाई कन्टेनरभित्र
चलाउँदा लेखाइ कन्टेनरकै होम (`/home/node` —
इमेज `USER node` का रूपमा चल्छ) मा पुग्छ, जहाँ कुनै पनि होस्ट CLI ले त्यसलाई कहिल्यै पढ्दैन र कन्टेनर
पुनः सिर्जना हुनेबित्तिकै त्यो हट्छ।

OmniRoute ले यो अवस्था पत्ता लगाउँछ र तपाईंले प्रयोग गर्न नसक्ने सफलता रिपोर्ट गर्नुको सट्टा
निर्देशनसहित लेख्न अस्वीकार गर्छ: CLI `2` कोडसहित बन्द हुन्छ, र API ले
`containerEphemeralTarget: true` सहित `422` जवाफ दिन्छ।

### सिफारिस गरिएको: CLI होस्टमा र OmniRoute Docker मा चलाउनुहोस्

कन्टेनरले API उपलब्ध गराउँछ; CLI ले तपाईंका होस्ट उपकरणहरू कन्फिगर गर्छ।

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI लाई कन्टेनरतर्फ निर्देशित गर्नुहोस्
omniroute setup-codex                      # तपाईंको होस्टमा वास्तविक ~/.codex लेख्छ
```

Codex, Claude Code, Cursor वा यस्तै उपकरणहरू तपाईंको
ल्यापटपमा चल्ने अवस्थामा यो सही विकल्प हो — र सामान्य सेटअप पनि यही हो।

### वैकल्पिक: होस्ट कन्फिग डाइरेक्टरीहरू bind-mount गर्नुहोस् (`host` प्रोफाइल)

यदि तपाईं कन्टेनरलाई नै आफ्नो होस्ट कन्फिग लेख्न दिन चाहनुहुन्छ भने,
डाइरेक्टरीहरू माउन्ट गर्नुहोस् र `CLI_CONFIG_HOME` लाई माउन्ट रुटतर्फ निर्देशित गर्नुहोस्। `host` प्रोफाइलले
पहिल्यै यसो गर्छ:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

bind mount ले नै पथलाई विश्वसनीय बनाउँछ: OmniRoute ले
`/proc/self/mountinfo` पढ्छ र माउन्ट गरिएका पथहरूमा (र माथि देखाइएको `/host-home` को संरचनाजस्तै,
जसका चाइल्ड डाइरेक्टरीहरू माउन्ट गरिएका हुन्छन्, त्यस्ता डाइरेक्टरीहरूमा पनि) लेख्न अनुमति दिन्छ,
तर माउन्ट नगरिएका पथहरूमा भने अझै लेख्न अस्वीकार गर्छ।

### वैकल्पिक निकास: कन्टेनरकै CLI हरू कन्फिगर गर्नुहोस् (संयमपूर्वक प्रयोग गर्नुहोस्)

CLI हरू वास्तवमै कन्टेनरभित्रै रहने अवस्थामा (`cli` प्रोफाइल), लेखाइ
जानाजानी गरिएको हुन्छ। कुनै पनि `setup-*` कमान्डमा `--allow-container-write` पास गर्नुहोस्, वा
सर्भरका लागि `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` सेट गर्नुहोस्। लेखाइ
कन्टेनरपछि कायम नरहने चेतावनीसहित अगाडि बढ्छ।

> **सुरक्षा चेतावनी — `cli` प्रोफाइल + `docker.sock` माउन्ट।**
> कन्टेनरभित्रको अटो-अपडेटरले होस्ट डेमनबाट स्ट्याक पुनः सिर्जना गर्न सकोस् भनेर
> `cli` प्रोफाइलले `/var/run/docker.sock` लाई bind-mount गर्छ
> (`src/lib/system/autoUpdate.ts` ले उक्त सकेट जाँच गर्छ र त्यो नभएमा
> Docker पथ छोड्छ)। त्यो सकेट **होस्ट-root विश्वास सीमा
> हो**: त्यसमा पहुँच पाउने कुनै पनि कुराले होस्ट Docker डेमनलाई
> root का रूपमा सञ्चालन गर्छ — त्यसले होस्टको कुनै पनि कन्टेनर सिर्जना गर्न, निरीक्षण गर्न, रोक्न र हटाउन सक्छ।
> यसका प्रभावहरू:
>
> 1. **`cli` प्रोफाइलको पोर्ट नेटवर्कमा कहिल्यै खुला नगर्नुहोस्।** यसलाई
>    `127.0.0.1` मा प्रकाशित गर्नुहोस् (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — LAN बाट पहुँचयोग्य `cli` प्रोफाइलले ड्यासबोर्ड-स्तरको कुनै पनि RCE लाई
>    पूर्ण होस्ट अधिग्रहणमा परिणत गर्छ।
> 2. **`cli` प्रोफाइलमा कुनै पनि अतिरिक्त होस्ट डाइरेक्टरी bind नगर्नुहोस्।**
>    Docker सकेटसँगै थपिएको कुनै पनि माउन्टले कन्टेनरलाई तपाईंको फाइलसिस्टम र होस्ट कन्फिगमा
>    पूर्ण पढ्ने/लेख्ने पहुँच दिन्छ। यदि कुनै उपकरणलाई प्रोजेक्ट हेर्न आवश्यक छ भने,
>    त्यसलाई CLI binary मार्फत स्थानीय रूपमा चलाउनुहोस् — त्यसलाई `cli` कन्टेनरमा
>    माउन्ट नगर्नुहोस्।
>
> यदि तपाईंलाई कन्टेनरभित्र अटो-अपडेट आवश्यक छैन भने, `cli` प्रोफाइल बन्द राख्नुहोस्
> (`COMPOSE_PROFILES=core,redis` वा छोटो रूप)। अन्य प्रोफाइलहरूले
> Docker सकेट माउन्ट गर्दैनन्।
>
> MITM सम्बन्धित खतरा मोडेलका लागि `docs/security/MITM-TPROXY-DECRYPT.md` (git; `/docs` मा कम्पाइल गरिएको छैन) हेर्नुहोस्,
> र `codex`/`claude-code`/`droid`/`openclaw` binary को उत्पत्ति शृङ्खलाका लागि
> `docs/security/SUPPLY_CHAIN.md` हेर्नुहोस्।

## Redis साइडकार

OmniRoute ले वितरित दर सीमक र साझा क्यासलाई समर्थन गर्न Redis मा निर्भर गर्छ। `redis` सेवा `docker-compose.yml` मा **सधैँ परिभाषित हुन्छ** (यसमा कुनै प्रोफाइल गेट छैन) र अन्य कुनै पनि प्रोफाइलसँगै सुरु हुन्छ।

| विवरण                  | मान                                            |
| ---------------------- | ---------------------------------------------- |
| इमेज                   | `redis:7-alpine`                               |
| कन्टेनरको नाम          | `omniroute-redis`                              |
| आन्तरिक पोर्ट          | `6379`                                         |
| होस्ट पोर्ट (ओभरराइड)  | `REDIS_PORT` (पूर्वनिर्धारित `6379`)           |
| होस्ट बाइन्ड (ओभरराइड) | `REDIS_BIND_HOST` (पूर्वनिर्धारित `127.0.0.1`) |
| भोल्युम                | `omniroute-redis-data` → `/data`               |
| स्वास्थ्य जाँच         | `redis-cli ping` (10s अन्तराल)                 |

सम्बन्धित वातावरण चरहरू:

- `REDIS_URL` — एपमा इन्जेक्ट गरिने जडान स्ट्रिङ (पूर्वनिर्धारित रूपमा `redis://redis:6379`)।
- `REDIS_PORT` — Redis कन्टेनरका लागि होस्ट-साइड पोर्ट म्यापिङ।
- `REDIS_BIND_HOST` — पोर्ट प्रकाशित गरिने होस्ट इन्टरफेस। पूर्वनिर्धारित मान `127.0.0.1` हो।

> **पूर्वनिर्धारित रूपमा लुपब्याक किन:** साइडकार `requirepass` बिना चल्छ, र एप
> कन्टेनरहरूले compose नेटवर्क (`redis:6379`) मार्फत यसमा पहुँच गर्छन् — प्रकाशित पोर्ट
> होस्ट-साइड उपकरणहरू (`redis-cli`, स्थानीय `npm run dev`) का लागि मात्र हो। `0.0.0.0`
> मा प्रकाशित गर्दा प्रमाणीकरण नभएको Redis तपाईंको LAN का प्रत्येक होस्टमा खुला हुनेछ। यदि तपाईंले
> `REDIS_BIND_HOST=0.0.0.0` सेट गर्नुभयो भने, सेवा `command:` मा `--requirepass` पनि थप्नुहोस्।

**Redis असक्षम पार्न** सिफारिस गरिँदैन (दर सीमक इन-मेमोरी फलब्याकमा अवनत हुनेछ)। यदि यो गर्नैपर्छ भने, `docker-compose.yml` मा रहेको `redis:` सेवा ब्लक हटाउनुहोस्/टिप्पणी बनाउनुहोस् वा यसलाई शून्यमा स्केल गर्नुहोस्:

```bash
docker compose up -d --scale redis=0
```

## उत्पादन Compose

डेभसँगै चल्ने पृथक उत्पादन स्न्यापसटका लागि `docker-compose.prod.yml` प्रयोग गर्नुहोस्।

| विवरण                           | मान                                                                                            |
| ------------------------------- | ---------------------------------------------------------------------------------------------- |
| फाइल                            | `docker-compose.prod.yml`                                                                      |
| पूर्वनिर्धारित ड्यासबोर्ड पोर्ट | `PROD_DASHBOARD_PORT=20130` (आन्तरिक `${DASHBOARD_PORT:-20128}` मा म्याप गरिएको)               |
| पूर्वनिर्धारित API पोर्ट        | `PROD_API_PORT=20131`                                                                          |
| इमेज                            | `omniroute:prod` (`runner-cli` लक्ष्यबाट निर्माण गरिएको)                                       |
| Redis कन्टेनर                   | `omniroute-redis-prod` (`redis:8.6.2`, समर्पित `redis-prod-data` भोल्युम)                      |
| डेटा भोल्युम                    | `omniroute-prod-data` (नाम दिइएको, पुनर्निर्माणहरूमा पनि कायम रहने)                            |
| स्वास्थ्य जाँचहरू               | `node healthcheck.mjs` + `redis-cli ping`, जहाँ `depends_on` Redis को स्वास्थ्यमा निर्भर हुन्छ |

प्रयोग गर्ने तरिका:

```bash
# उत्पादन स्ट्याक निर्माण गरी सुरु गर्नुहोस्
docker compose -f docker-compose.prod.yml up -d --build

# लगहरू निरन्तर हेर्नुहोस्
docker compose -f docker-compose.prod.yml logs -f

# बन्द गर्नुहोस् (भोल्युमहरू कायम राख्नुहोस्)
docker compose -f docker-compose.prod.yml down
```

उत्पादन स्ट्याक डेभ compose सँग समानान्तर रूपमा चल्छ (कन्टेनरका नाम, पोर्ट र भोल्युमहरू फरक छन्), त्यसैले उत्पादन चलिरहेकै बेला तपाईं स्थानीय रूपमा पुनरावृत्त सुधार जारी राख्न सक्नुहुन्छ।

## Dockerfile का चरणहरू

रिपोजिटरीसँग बहु-चरणीय Dockerfile (`Dockerfile`) आउँछ। चारवटा चरण उपलब्ध छन्; आफ्नो प्रयोगका लागि सही `target` छान्नुहोस्।

| चरण           | आधार इमेज             | उद्देश्य                                                                                                                                                                                                                                                                                 |
| ------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | निर्भरताहरू स्थापना गर्छ (`npm ci --legacy-peer-deps`) र `npm run build` चलाउँछ (पूर्वनिर्धारित रूपमा Turbopack — तलको निर्माण-समयका स्रोतहरू हेर्नुहोस्)                                                                                                                                |
| `runner-base` | `node:26-trixie-slim` | Next.js को स्ट्यान्डअलोन आउटपुटसहितको उत्पादन रनटाइम। **कुनै पनि प्रदायक CLI समावेश गरिएको छैन।**                                                                                                                                                                                        |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose` र ग्लोबल CLI हरू थप्छ: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`। **एजेन्टिक कार्यप्रवाहहरूका लागि यसलाई छान्नुहोस्।**                                                                                                      |
| `runner-web`  | `runner-base`         | वेब-सत्र प्रदायकहरूका लागि Playwright + Chromium ब्राउजर (`--with-deps`) थप्छ: `gemini-web`, `claude-web`, `claude-turnstile`। **ती प्रदायकहरू प्रयोग गर्दा यसलाई छान्नुहोस्** — यो नभएमा साधारण इमेज अनुरोधको समयमा असफल हुन्छ (Release Channels अन्तर्गतको `-web` टिप्पणी हेर्नुहोस्)। |

कुनै विशिष्ट लक्ष्य म्यानुअल रूपमा निर्माण गर्नुहोस्:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### निर्माण-समयका स्रोतहरू

तीनवटा build arg ले `builder` चरणको लागत नियन्त्रण गर्छन्। तिनीहरू निर्माण-समयका लागि मात्र हुन् —
`OMNIROUTE_MEMORY_MB` (तल) छुट्टै रनटाइम समायोजन हो।

| Build arg                   | पूर्वनिर्धारित | प्रभाव                                                                                       |
| --------------------------- | -------------- | -------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`            | `0` ले webpack मार्फत निर्माण गर्छ: न्यून अधिकतम मेमोरी, तर ढिलो। `1` ले Turbopack रोज्छ।    |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`         | सुरु गरिएको `next build` का लागि V8 heap सीमा (`--max-old-space-size`)।                      |
| `OMNIROUTE_BUILD_WORKERS`   | `2`            | `CIRCLE_NODE_TOTAL` मा मान दिन्छ; Next ले page-data सङ्कलनका लागि `workers = N - 1` निकाल्छ। |

ठूलो builder मा बढाउनुपर्ने र सीमित स्रोत भएको निर्माण
`✓ Compiled successfully` **पछि** बन्द हुँदा शङ्का गर्नुपर्ने समायोजन `OMNIROUTE_BUILD_WORKERS` हो। प्रत्येक
page-data worker आफ्नै प्रक्रिया हो, र मूल `next build` पनि छुट्टै प्रक्रिया हो;
प्रत्यक्ष VPS पुनरुत्पादन (issue #7518) मा `NODE_OPTIONS` heap flag बाट स्वतन्त्र रूपमा
प्रत्येक प्रक्रियाको अधिकतम RSS ~4.5 GB मापन भयो (Turbopack ले V8 heap बाहिरको
नेटिभ/Rust मेमोरीमा कम्पाइल गर्छ)। पूर्वनिर्धारित `2` (→ 1 worker, जम्मा 2
प्रक्रिया) प्रकाशन पाइपलाइनले प्रयोग गर्ने 16 GB / 4 vCPU GitHub-hosted runner का लागि
निर्धारण गरिएको हो। `8` (→ 7 workers) मा त्यो runner को मेमोरी सकियो र
buildkit ले `ResourceExhausted: ... cannot allocate memory` सहित उक्त चरण असफल बनायो;
प्रति-प्रक्रिया RSS अनुमान गर्नुको सट्टा प्रत्यक्ष रूपमा मापन गरेपछि
`3` (→ 2 workers) पनि पर्याप्त भएन। `tests/unit/docker-build-memory-budget.test.ts`
ले मापन गरिएको मानका आधारमा गणना गर्छ र यीमध्ये कुनै पनि समायोजन
runner को क्षमताभन्दा ठूलो भएमा असफल हुन्छ।

Turbopack ले V8 heap **बाहिर** रहने नेटिभ Rust मेमोरीमा कम्पाइल गर्छ, त्यसैले
`OMNIROUTE_BUILD_MEMORY_MB` ले त्यसलाई सीमित गर्दैन। मेमोरी सीमा भएको host मा
त्यसपछि OOM killer ले कुनै पनि त्रुटि पाठ नदिई निर्माणलाई SIGKILL गर्छ — यो
`Creating an optimized production build` को बीचमै रोकिन्छ, जुन मेमोरी सकिएको
अवस्थाभन्दा पनि अड्किएको जस्तो देखिन्छ। त्यसैले `npm run dev` / `npm run build` मा
Turbopack कोडको पूर्वनिर्धारित विकल्प भए पनि `Dockerfile` ले webpack
(`OMNIROUTE_USE_TURBOPACK=0`) लाई पूर्वनिर्धारित बनाउँछ: कुनै build arg नभएको सामान्य
`docker build .` (जुन Railway र अन्य एक-क्लिक host ले चलाउँछन्) मेमोरी-सीमित
builder मा मौन रूपमा बन्द हुनु हुँदैन। प्रकाशित इमेजहरूले `docker-publish.yml` मा
पहिल्यै स्पष्ट रूपमा `OMNIROUTE_USE_TURBOPACK=0` पठाउँछन्। प्रशस्त RAM भएको builder मा
छिटो निर्माणका लागि Turbopack रोज्नुहोस्:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` सक्षम छ, त्यसैले `next build` ले मूल **र** worker
प्रक्रिया चलाउँछ र प्रत्येकले `OMNIROUTE_BUILD_MEMORY_MB` लाई छुट्टाछुट्टै पालना गर्छ। कन्टेनरको
सीमा त्यस मानको एक गुणाभन्दा होइन, लगभग दुई गुणाभन्दा बढी राख्नुहोस्।

यस tree मा मापन गरिएको (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | कन्टेनर सीमा   | नतिजा                           |
| --------- | -------------- | ------------------------------- |
| Turbopack | 8 GiB / 16 GiB | दुवैमा मौन रूपमा OOM-killed     |
| webpack   | 8 GiB          | build worker SIGKILL भयो        |
| webpack   | 12 GiB         | सफल भयो, अधिकतम 11.1 GiB पुग्यो |

### रनटाइमका पूर्वनिर्धारित मानहरू

`runner-base` द्वारा export गरिएका पूर्वनिर्धारित मानहरू: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`।

Docker मा मेमोरीको व्यवहार:

- इमेजले `OMNIROUTE_MEMORY_MB=1024` सेट गर्छ र त्यसबाट `NODE_OPTIONS=--max-old-space-size=1024` व्युत्पन्न गर्छ।
- वास्तविक सर्भर प्रक्रिया standalone launcher द्वारा सुरु गरिन्छ, जसले `OMNIROUTE_MEMORY_MB` पढ्छ र `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` थप्छ।
- Node ले दोहोरिएको अन्तिम `--max-old-space-size` मान प्रयोग गर्छ, त्यसैले `OMNIROUTE_MEMORY_MB` सेट गर्दा प्रभावकारी Docker heap सीमा नियन्त्रण हुन्छ।
- इमेजले यसलाई सधैँ सेट गर्ने भएकाले, launcher को आफ्नै RAM-अनुसार समायोजित fallback Docker अन्तर्गत कहिल्यै लागू हुँदैन। workload का लागि यसलाई स्पष्ट रूपमा बढाउनुहोस् (तलको तालिका)। coding-agent `/v1/responses` का लागि `2048` अझै पनि अपर्याप्त छ।

### coding agent हरूका लागि runtime RAM

1 GiB को Docker पूर्वनिर्धारित मान dashboard/हल्का chat का लागि न्यूनतम सीमा हो, production आकार होइन। लामो `POST /v1/responses` body हरूले (सयौँ message, दर्जनौँ tool) compression का क्रममा धेरै in-memory graph हरू कायम राख्छन्। एकै समयमा चलिरहेका ~3 MiB / ~750k-token का दुई request ले **12 GiB** old-space मा V8 बन्द गराएका छन् (`FATAL ERROR: Reached heap limit`) र 16 GiB cgroup OOM पनि निम्त्याएका छन्। [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) हेर्नुहोस्।

**cgroup `--memory` लाई heap भन्दा बढी** आकार दिनुहोस् — native buffer, SQLite, र compression का मध्यवर्ती data V8 बाहिर रहन्छन्।

| Workload                              | `OMNIROUTE_MEMORY_MB`              | Container / cgroup               | टिप्पणी                                                                                             |
| ------------------------------------- | ---------------------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------- |
| Dashboard, एउटा हल्का chat            | `1024` (इमेजको पूर्वनिर्धारित मान) | ≥2 GiB                           |                                                                                                     |
| एउटा coding agent (Claude/Codex/Grok) | `8192`                             | ≥10 GiB                          | सामान्य single-session `/v1/responses`                                                              |
| एकै समयमा दुईवटा लामा `/v1/responses` | `10240`–`12288`                    | ≥12–16 GiB                       | ~12 GiB heap मा मापन गरिएको V8 abort                                                                |
| एकै समयमा तीन वा बढी लामा context     | एउटै process मा नगर्नुहोस्         | क्रमिक रूपमा चलाउनुहोस् / थप RAM | पूर्वनिर्धारित heavyweight admission मा 1 in-flight हुन्छ; RAM नबढाई यसलाई बढाउँदा abort फेरि हुन्छ |

bare metal मा `omniroute serve` ले `OMNIROUTE_MEMORY_MB` **सेट नगरिएको** अवस्थामा RAM को ~35% अनुसार समायोजन गर्छ (`[512, 4096]` भित्र सीमित)। Docker ले सधैँ `1024` सेट गर्ने भएकाले, आधिकारिक इमेजमा उक्त समायोजन कहिल्यै चल्दैन।

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## महत्त्वपूर्ण वातावरणीय चरहरू

[ENVIRONMENT.md](../reference/ENVIRONMENT.md) मा अभिलेखित पूर्वनिर्धारित मानहरूबाहेक, Docker अन्तर्गत चलाउँदा निम्न चरहरू सबैभन्दा महत्त्वपूर्ण हुन्छन्:

| चर                            | उद्देश्य                                                                                                                                                                                                                                                                                        | पूर्वनिर्धारित मान     |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket ब्रिजका लागि साझा गोप्य मान। **उत्पादन वातावरणमा आवश्यक** — यसलाई बलियो अनियमित स्ट्रिङमा सेट गर्नुहोस्।                                                                                                                                                                              | सेट नगरिएको (दिनैपर्छ) |
| `REDIS_URL`                   | दर सीमक / क्यास ब्याकइन्डका लागि जडान स्ट्रिङ                                                                                                                                                                                                                                                   | `redis://redis:6379`   |
| `REDIS_PORT`                  | समावेश गरिएको Redis कन्टेनरका लागि होस्ट-साइड पोर्ट                                                                                                                                                                                                                                             | `6379`                 |
| `REDIS_BIND_HOST`             | समावेश गरिएको Redis पोर्ट प्रकाशित हुने होस्ट इन्टरफेस (तपाईंले AUTH नथपेसम्म लुपब्याक)                                                                                                                                                                                                         | `127.0.0.1`            |
| `AUTO_UPDATE_HOST_REPO_DIR`   | स्व-अद्यावधिक कार्यप्रवाहहरूका लागि `cli` प्रोफाइलभित्र `/workspace/omniroute` मा माउन्ट गरिएको होस्ट पथ                                                                                                                                                                                        | `.` (हालको डाइरेक्टरी) |
| `OMNIROUTE_MEMORY_MB`         | Docker स्ट्यान्डअलोन सर्भरका लागि रनटाइम Node हिपको अधिकतम सीमा; यसले माथिको इमेज पूर्वनिर्धारित मानलाई ओभरराइड गर्छ। कोडिङ एजेन्टहरू: `8192`+ ([रनटाइम RAM](#runtime-ram-for-coding-agents) हेर्नुहोस्)।                                                                                       | `1024`                 |
| `DASHBOARD_PORT` / `API_PORT` | ड्यासबोर्ड (20128) र API (20129) का लागि एक्सपोज गरिएका पोर्टहरू ओभरराइड गर्छ                                                                                                                                                                                                                   | `20128` / `20129`      |
| `APP_BIND_HOST`               | docker-compose ले ड्यासबोर्ड/API/live-WS पोर्टहरू प्रकाशित गर्ने होस्ट इन्टरफेस। `REQUIRE_API_KEY=false` (पूर्वनिर्धारित) हुँदा, `0.0.0.0` ले अज्ञात पहुँचको `/v1` प्रोक्सीलाई LAN मा एक्सपोज गर्छ — `REQUIRE_API_KEY=true` हुँदा वा अगाडि रिभर्स प्रोक्सी राखेर मात्र पहुँच विस्तार गर्नुहोस्। | `127.0.0.1`            |
| `CLIPROXY_BIND_HOST`          | docker-compose ले `cliproxyapi` साइडकार प्रकाशित गर्ने होस्ट इन्टरफेस — यसको डेटा भोल्युममा प्रदायकका प्रमाणहरू राखिन्छन्।                                                                                                                                                                      | `127.0.0.1`            |
| `OMNIROUTE_PLUGINS_DIR`       | रनटाइम प्लगइन स्क्यानरले पढ्ने र प्लगइनहरू स्थापना गर्ने डाइरेक्टरी। प्लगइनहरू बाइन्ड-माउन्ट गरिएका बेला यसलाई सेट गर्नुहोस्: पूर्वनिर्धारित मानले `HOME` पछ्याउँछ, जुन इमेजले एक्सपोर्ट नगर्न सक्छ।                                                                                            | `~/.omniroute/plugins` |
| `OMNIROUTE_BASE_PATH`         | एप रिभर्स प्रोक्सी पछाडि प्रकाशित हुँदा प्रयोग हुने URL उपपथ (जस्तै `/omniroute`)                                                                                                                                                                                                               | _(खाली = रुट)_         |
| `NEXT_PUBLIC_BASE_URL`        | उपपथसहितको सार्वजनिक ब्राउजर मूल ठेगाना (जस्तै `https://host/omniroute`)                                                                                                                                                                                                                        | सेट नगरिएको            |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml` का लागि होस्ट-साइड ड्यासबोर्ड पोर्ट                                                                                                                                                                                                                                   | `20130`                |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` साइडकारका लागि होस्ट-साइड पोर्ट                                                                                                                                                                                                                                                   | `8317`                 |

## उपपथमा रिभर्स प्रोक्सी (Traefik / nginx)

Next.js `basePath` लाई स्ट्यान्डअलोन बन्डलमा कम्पाइल गरिन्छ। OmniRoute ले एपको मूलमा रहेको एउटा सेन्टिनल फाइलमा बिल्ड गरिएको मान अभिलेख गर्छ (`npm run build` का क्रममा लेखिन्छ; `scripts/docker/ensure-docker-base-path.mjs` द्वारा पढिन्छ) र कन्टेनर सुरु हुँदा त्यसलाई `OMNIROUTE_BASE_PATH` सँग तुलना गर्छ। तिनीहरू फरक हुँदा र इमेज डोमेनको मूलका लागि बिल्ड गरिएको हुँदा, `node dev/run-standalone.mjs` चल्नुअघि एन्ट्रीपोइन्टले स्ट्यान्डअलोन म्यानिफेस्टहरू, इम्बेड गरिएका `basePath`/`assetPrefix` लिटरलहरू (Next 16 ले SSR एसेट URL हरू `assetPrefix` बाट मात्र रेन्डर गर्छ — प्याचरले उपपथलाई यसमा पनि प्रतिबिम्बित गर्छ), बिल्ड गरिएका `/_next/static` एसेट URL हरू (क्लाइन्ट-रेफरेन्स म्यानिफेस्टहरू, मिडिया इम्पोर्टहरू, पहिले नै रेन्डर गरिएका त्रुटि पृष्ठहरू) र क्लाइन्ट `process.env` शिमलाई पुनर्लेखन गर्छ।

### Compose बिल्ड (सिफारिस गरिएको)

इमेज र रनटाइम एकरूप होऊन् भनेर `.env` मा दुवै भेरिएबल सेट गर्नुहोस्, त्यसपछि पुनः बिल्ड गर्नुहोस्:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` ले `OMNIROUTE_BASE_PATH` लाई Docker बिल्ड-आर्गका रूपमा र रनटाइम वातावरण भेरिएबलका रूपमा पठाउँछ।

### पहिले नै बिल्ड गरिएको रुट इमेज + रनटाइम उपपथ

प्रकाशित `diegosouzapw/omniroute:*` इमेजहरू डोमेनको मूलका लागि बिल्ड गरिएका हुन्छन्। तपाईं अझै पनि रनटाइममा `OMNIROUTE_BASE_PATH` सेट गर्न सक्नुहुन्छ; कन्टेनरले स्टार्टअपमा बन्डललाई एकपटक प्याच गर्छ। यसलाई मेल खाने सार्वजनिक ओरिजिनसँग जोडा मिलाउनुहोस्:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

**पूर्ण** बाह्य पथ फर्वार्ड गर्न रिभर्स प्रोक्सी कन्फिगर गर्नुहोस् (प्रिफिक्स नहटाउनुहोस्)। Traefik ले `StripPrefix` बिना `PathPrefix(`/omniroute`)` लाई कन्टेनरतर्फ रुट गर्नुपर्छ, जसले गर्दा Next.js ले `/omniroute/...` प्राप्त गर्छ र `/omniroute/_next/...` बाट एसेटहरू उपलब्ध गराउँछ।

Docker हेल्थचेकले सक्रिय `OMNIROUTE_BASE_PATH` प्रिफिक्स जोडिएको हल्का `/healthz` लाइफसाइकल एन्डपोइन्ट जाँच्छ। मानवीय/ड्यासबोर्ड निदानका लागि `/api/monitoring/health` उपलब्ध रहन्छ; कन्टेनरको HEALTHCHECK लाई पुनः त्यतैतर्फ निर्देशित गर्न (उदाहरणका लागि, गहन स्वास्थ्य जाँच लागू गर्न) `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` सेट गर्नुहोस्। त्यो पथ एउटा **गहन** जाँच हो (DB + मोनिटरिङ सारांश) — तपाईंले पुनः सक्षम गर्ने विकल्प रोज्नुभयो भने Docker को कम आवृत्तिमा चल्ने `HEALTHCHECK` का लागि उपयुक्त हुन्छ, तर Kubernetes `livenessProbe` अन्तरालहरूका लागि **होइन**।

अर्केस्ट्रेटरहरूका लागि (Kubernetes, Nomad, आदि):

| प्रोब             | प्राथमिकता दिनुहोस्                                                      | बेवास्ता गर्नुहोस्                                 |
| ----------------- | ------------------------------------------------------------------------ | -------------------------------------------------- |
| लाइभनेस           | HTTP `GET /livez`, वा मुख्य पोर्टमा TCP (`PORT`, पूर्वनिर्धारित `20128`) | लाइभनेसका रूपमा `/api/monitoring/health`           |
| रेडिनेस           | HTTP `GET /healthz`                                                      | इभेन्ट-लुप व्यस्त हुँदा मृत मान्ने छोटो टाइमआउटहरू |
| गहन / ब्ल्याकबक्स | `/api/monitoring/health`                                                 | —                                                  |

`/healthz` ले प्रोसेस लाइफसाइकल (`ok` / `starting` / `stopping`) रिपोर्ट गर्छ। `/livez` ले प्रोसेस जीवित छ कि छैन भन्ने मात्र जाँच्छ (ह्यान्डलर चल्न सक्ने अवस्थामा सधैँ 200; यसले रेडिनेसको प्रतीक्षा गर्दैन)। दुवै अझै पनि अनुरोध ह्यान्डलिङकै Node इभेन्ट लुपमा चल्छन्, त्यसैले CPU-बाउन्ड क्याटलग वा कम्प्रेसन कार्यले तिनलाई ढिलो गराउन सक्छ — व्यस्त ≠ मृत। HTTP प्रोबहरू टाइमआउट भएमा TCP लाइभनेसलाई प्राथमिकता दिनुहोस्। प्रोबसम्बन्धी पूर्ण मार्गदर्शन:
[मोनिटरिङ गाइड — Kubernetes प्रोब सिफारिसहरू](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)।

## Caddy सहित Docker Compose (HTTPS Auto-TLS)

Caddy को स्वचालित SSL प्रावधान प्रयोग गरेर OmniRoute लाई सुरक्षित रूपमा सार्वजनिक गर्न सकिन्छ। तपाईंको डोमेनको DNS A रेकर्डले तपाईंको सर्भरको IP तर्फ सङ्केत गरेको सुनिश्चित गर्नुहोस्।

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
      # OAuth कलब्याक, ड्यासबोर्ड लिङ्क र उत्पन्न गरिएका सार्वजनिक URL हरूका लागि ब्राउजरले देख्ने ओरिजिन।
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # निर्धारित कार्यहरू / सेल्फ-फेचहरूका लागि आन्तरिक सर्भर-देखि-सर्भर URL।
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

Caddy ले अपस्ट्रिम कन्टेनरका लागि मानक फर्वार्डिङ हेडरहरू सेट गर्छ। OmniRoute ले
OAuth कलब्याक र उत्पन्न गरिएका सार्वजनिक लिङ्कहरूका लागि `NEXT_PUBLIC_BASE_URL` लाई क्यानोनिकल सार्वजनिक ओरिजिनको रूपमा प्रयोग गर्छ;
प्रमाणीकरण गरिएका ड्यासबोर्ड राइटहरूले सेसनसँग आबद्ध CSRF सुरक्षासहित समान-ओरिजिन अनुरोधहरू प्रयोग गर्छन्।
तपाईंले स्पष्ट कन्फिगरेसनको सट्टा विश्वसनीय फर्वार्ड गरिएका हेडरहरूबाट सार्वजनिक ओरिजिन निर्धारण गर्न
OmniRoute लाई जानाजानी लगाउन चाहनुहुने उन्नत डिप्लोयमेन्टहरूका लागि मात्र `OMNIROUTE_TRUST_PROXY` सक्षम गर्नुहोस्।

## Cloudflare Quick Tunnel

Docker डिप्लोयमेन्टका लागि ड्यासबोर्ड समर्थनमा `Dashboard → Endpoints` मा एक-क्लिक **Cloudflare Quick Tunnel** समावेश छ। पहिलो पटक सक्षम गर्दा आवश्यक परेको बेला मात्र `cloudflared` डाउनलोड हुन्छ, तपाईंको हालको `/v1` एन्डपोइन्टमा अस्थायी टनेल सुरु हुन्छ, र उत्पन्न गरिएको `https://*.trycloudflare.com/v1` URL तपाईंको सामान्य सार्वजनिक URL को ठीक तल देखाइन्छ।

एन्डपोइन्ट टनेल प्यानलहरू (Cloudflare, Tailscale, ngrok) सक्रिय टनेलको अवस्था परिवर्तन नगरी `Settings → Appearance` बाट देखाउन वा लुकाउन सकिन्छ।

### टनेलसम्बन्धी टिप्पणीहरू

- Quick Tunnel URL हरू अस्थायी हुन्छन् र प्रत्येक पुनःसुरुआतपछि परिवर्तन हुन्छन्।
- OmniRoute वा कन्टेनर पुनःसुरुआत भएपछि Quick Tunnels स्वतः पुनर्स्थापित हुँदैनन्। आवश्यक पर्दा तिनलाई ड्यासबोर्डबाट पुनः सक्षम गर्नुहोस्।
- व्यवस्थित इन्स्टलले हाल `x64` / `arm64` मा Linux, macOS र Windows समर्थन गर्छ।
- सीमित कन्टेनर वातावरणहरूमा बढी आवाजयुक्त QUIC UDP बफर चेतावनीहरूबाट बच्न व्यवस्थित Quick Tunnels ले पूर्वनिर्धारित रूपमा HTTP/2 ट्रान्सपोर्ट प्रयोग गर्छन्। फरक ट्रान्सपोर्ट चाहनुहुन्छ भने `CLOUDFLARED_PROTOCOL=quic` वा `auto` सेट गर्नुहोस्।
- Docker इमेजहरूले प्रणालीका CA रुटहरू समावेश गर्छन् र तिनलाई व्यवस्थित `cloudflared` मा पठाउँछन्, जसले कन्टेनरभित्र टनेल बुटस्ट्र्याप हुँदा TLS विश्वास विफलताहरूबाट जोगाउँछ।
- OmniRoute ले डाउनलोड गर्नुको सट्टा पहिले नै रहेको बाइनरी प्रयोग गरोस् भन्ने चाहनुहुन्छ भने `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` सेट गर्नुहोस्।

## इमेज ट्यागहरू

| इमेज                     | ट्याग    | साइज   | विवरण                                              |
| ------------------------ | -------- | ------ | -------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | उच्चतम **प्रकाशित** स्थिर SemVer (git `main` होइन) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOps का लागि यस वर्गको ट्याग पिन गर्नुहोस्       |

बहु-प्लेटफर्म म्यानिफेस्ट: `linux/amd64` + `linux/arm64` नेटिभ (Apple Silicon, AWS Graviton, Raspberry Pi)। Docker ले मिल्दो आर्किटेक्चर स्वतः चयन गर्छ; ARM होस्टहरूमा AMD64 इमुलेसन बलपूर्वक प्रयोग गर्न आवश्यक भए `--platform linux/amd64` पास गर्नुहोस्।

### रिलिज च्यानलहरू

OmniRoute ले स्थिर रिलिजहरू, सक्रिय रिलिज-ब्रान्च परीक्षण र विकास बिल्डहरूका लागि छुट्टाछुट्टै Docker च्यानलहरू प्रकाशित गर्छ।

| च्यानल                          | स्रोत                                     | परिवर्तनशीलता                  | सिफारिस गरिएको प्रयोग                                                                                 |
| ------------------------------- | ----------------------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | हस्ताक्षर गरिएको/संस्करणयुक्त रिलिज       | अपरिवर्तनीय                    | ठ्याक्कै एउटा रिलिज पिन गर्ने उत्पादन डिप्लोयमेन्टहरू                                                 |
| `:latest` / `:latest-web`       | उच्चतम **प्रकाशित** स्थिर SemVer          | परिवर्तनशील स्थिर पोइन्टर      | SemVer प्रकाशन कार्यपछि स्थिर रिलिजहरू पछ्याउँछ — `main` वा अप्रकाशित `release/v*` कमिटहरू पछ्याउँदैन |
| `:next` / `:next-web`           | हालको पूर्वनिर्धारित `release/v*` ब्रान्च | परिवर्तनशील प्रि-रिलिज पोइन्टर | सक्रिय रिलिज ब्रान्चमा आइसकेका तर स्थिर रिलिजमा अझै समावेश नभएका सुधारहरूको परीक्षण                   |
| `:main` / `:main-web`           | `main` ब्रान्च                            | परिवर्तनशील विकास पोइन्टर      | विकास र एकीकरण परीक्षणका लागि मात्र                                                                   |

#### वेब-सेसन प्रदायकहरू: `-web` इमेजहरू

माथिको प्रत्येक च्यानल `-web` ट्याग (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`) का रूपमा पनि उपलब्ध हुन्छ, जुन `runner-web` स्टेजबाट बिल्ड गरिएको हुन्छ — उही इमेजमा Playwright र Chromium ब्राउजर थपिएको हुन्छ। साधारण इमेज Chromium **बिना** पठाइन्छ; `gemini-web`, `claude-web` र `claude-turnstile` लाई यो आवश्यक पर्छ।

विफलता स्टार्टअपको समयमा नभई पछि मात्र हुन्छ: ती प्रदायकहरूले आफ्ना मोडेलहरू सूचीबद्ध गर्छन् र ड्यासबोर्डमा कनेक्ट भएको देखिन्छन्, तर पहिलो अनुरोध मात्र निम्न त्रुटिसहित विफल हुन्छ

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

यदि तपाईं ती प्रदायकहरू प्रयोग गर्नुहुन्छ भने, तपाईं पहिल्यै प्रयोग गरिरहनुभएको च्यानलको `-web` ट्याग पुल गर्नुहोस् — अरू केही परिवर्तन हुँदैन। npm/CLI इन्स्टलमा (Docker इमेज बिना), यसको समकक्ष छुटेको अंश ब्राउजर बाइनरी हो: होस्टमा `npx playwright install chromium` चलाउनुहोस्।

#### प्रि-रिलिज च्यानल प्रयोग गर्ने तरिका

`next` च्यानल हालको पूर्वनिर्धारित `release/v*` शाखामा प्रत्येक push हुँदा पुनर्निर्माण गरिन्छ र AMD64 तथा ARM64 दुवैका लागि प्रकाशित गरिन्छ। पुराना मर्मतसम्भार शाखाहरूले यसलाई अधिलेखन गर्न सक्दैनन्। यो च्यानलले अर्को स्थिर tag तयार हुनुअघि सक्रिय release शाखामा merge गरिएका समाधानहरूका लागि pull गर्न मिल्ने image उपलब्ध गराउँछ।

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose का लागि, चयन गरिएको profile ले प्रयोग गर्ने image tag अधिलेखन गर्नुहोस्, त्यसपछि service pull गरी पुनः सिर्जना गर्नुहोस्:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### सुरक्षा र रोलब्याक

`next` परिवर्तनशील पूर्व-release च्यानल हो। सक्रिय release शाखामा कुनै पनि push हुँदा यो परिवर्तन हुन सक्छ र यो **production प्रयोगका लागि समर्थित छैन**। कुनै निश्चित build को मूल्याङ्कन गर्दा image digest pin गर्नुहोस्:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

परीक्षण गर्नुअघि OmniRoute data volume वा bind-mounted data directory को backup लिनुहोस्। रोलब्याक गर्न, पहिले प्रयोग गरिएको स्थिर version वा digest पुनर्स्थापना गर्नुहोस् र container पुनः सिर्जना गर्नुहोस्:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

release-branch build ले कहिल्यै `latest` सार्न सक्दैन; केवल योग्य स्थिर semantic version ले मात्र स्थिर pointer लाई प्रवर्द्धन गर्न सक्छ। `next` images मा release image inspection र CRITICAL-vulnerability रोकथाम gate कायम रहन्छ।

**`latest` ले git को नवीनताको प्रत्याभूति गर्दैन।** `main` वा सक्रिय `release/v*` शाखामा merge गरिएका समाधानहरू स्थिर SemVer image प्रकाशित नभएसम्म र publish job ले `:latest` लाई प्रवर्द्धन नगरेसम्म (त्यो SemVer कै समान digest सहित) `:latest` मा समावेश हुँदैनन्। GitHub मा समाधान पहिले नै देखिए पनि `latest` स्थिर देखिएमा, release शाखा परीक्षण गर्न `:next` pull गर्नुहोस् वा SemVer tag को प्रतीक्षा गर्नुहोस्।

| तपाईंको आवश्यकता                                                                  | प्रयोग गर्नुहोस्                         |
| --------------------------------------------------------------------------------- | ---------------------------------------- |
| परिवर्तन हुन नहुने GitOps / production                                            | `:X.Y.Z` (वा image digest) pin गर्नुहोस् |
| प्रकाशित स्थिर releases पछ्याउने र प्रत्येक release मा पुनः सिर्जना स्वीकार गर्ने | `:latest`                                |
| अप्रकाशित `release/v*` commits परीक्षण गर्ने                                      | `:next` (production का लागि होइन)        |
| `main` परीक्षण गर्ने                                                              | `:main` (production का लागि होइन)        |

## Docker मा ड्यासबोर्ड अद्यावधिकहरू

प्रकाशित इमेजको कन्टेनरले आफैँलाई प्रतिस्थापन गर्न सक्दैन। OmniRoute ले आफू कन्टेनरभित्र चलिरहेको पत्ता लगाउँदा (`.git` checkout नभएको र npm install नभएको अवस्थामा), गृह ड्यासबोर्डको अद्यावधिक ब्यानरले npm/git निर्देशनहरूको सट्टा चलाउनुपर्ने होस्ट कमाण्डलाई प्रतिलिपि बटनसहित देखाउँछ:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

सेवाको नाम `AUTO_UPDATE_SERVICE` बाट आउँछ (पूर्वनिर्धारित `omniroute`, जुन `docker-compose.selfhost.yml` मा रहेको सेवा हो)। `pull` ले अस्थिर ट्याग (`latest`, `next`) मात्र अगाडि सार्छ; स्थिर गरिएको `:X.Y.Z` ट्याग भएमा, पहिले ट्याग सम्पादन गर्नुहोस्।

### होस्ट ट्रिगर फाइलमार्फत एक-क्लिक अद्यावधिकहरू

`/var/run/docker.sock` माउन्ट नगरी **अहिले अद्यावधिक गर्नुहोस्** लाई काम गराइराख्न (यसले कन्टेनरलाई होस्टमा root पहुँच दिन्छ — माथिको `cli` प्रोफाइल चेतावनी हेर्नुहोस्), OmniRoute सेवामा `DOCKER_UPDATE_TRIGGER_FILE` सेट गर्नुहोस् र होस्टमा वाचर चलाउनुहोस्:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

पथ `DATA_DIR` भित्र हुनुपर्छ (सापेक्ष मानहरू त्यसैको आधारमा समाधान हुन्छन्); अन्य कुनै पनि पथ अस्वीकार गरिन्छ। त्यसपछि **अहिले अद्यावधिक गर्नुहोस्** ले उक्त फाइलमा `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` लेख्छ, `202` जवाफ दिन्छ, र नयाँ संस्करण लाइभ भएर पुनः लोड नभएसम्म ड्यासबोर्डले `/api/system/version` पोल गर्छ। यस मोडमा OmniRoute ले कहिल्यै shell वा Docker कमाण्ड चलाउँदैन। प्रत्येक अद्यावधिक कार्यजस्तै, अनुरोध loopback/LAN क्लाइन्टहरूबाट मात्र स्वीकार गरिन्छ।

bind-mounted डेटा डाइरेक्टरीले होस्टलाई निगरानी गर्न स्थिर पथ दिन्छ। नमुना `systemd` युनिटहरू (`/srv/omniroute` लाई तपाईंको compose फाइल र `data/` भएको डाइरेक्टरीअनुसार समायोजन गर्नुहोस्):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=OmniRoute ड्यासबोर्डका अद्यावधिक अनुरोधहरूको निगरानी गर्नुहोस्

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=OmniRoute कन्टेनर पुल गरेर पुनः सिर्जना गर्नुहोस्

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

असफल रन निरन्तर दोहोरिन नदिन सेवाले pull गर्नुअघि अनुरोध हटाउँछ। `DOCKER_UPDATE_TRIGGER_FILE` नभएमा ड्यासबोर्डले म्यानुअल कमाण्ड प्रवाह कायम राख्छ।

## उपलब्धता: पूर्वनिर्धारित SQLite एकल प्रतिकृति हो

स्टक Docker / Kubernetes OmniRoute हो** एक नोड प्रक्रिया + एक SQLite लेखक** । उच्च उपलब्धता छ** समर्थित छैन** त्यो टोपोलोजी मा।

| बाधा                                                                  | नतिजा                                                                                                                                                                                                                                                                                                           |
| --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| एकल लेखक                                                              | गर** होइन** एउटै SQLite फाइल विरुद्ध धेरै प्रतिकृतिहरू चलाउनुहोस्। यसले DB लाई भ्रष्ट बनाउँछ।                                                                                                                                                                                                                   |
| पुन: सिर्जना गर्नुहोस् / पुन: सुरु गर्नुहोस् / HEALTHCHECK मार्नुहोस् | **पूर्ण आउटेज** इन-फ्लाइट SSE, ड्यासबोर्ड सत्रहरू, र इन-मेमोरी अवस्थाको। प्रत्येक जडान ग्राहक ड्रप। खाली-अन्तबिन्दु सञ्झ्यालको समयमा नयाँ अनुरोधहरूले उल्टो-प्रोक्सी प्राप्त गर्दछ**`502 Bad Gateway: Unknown error`** , OmniRoute JSON होइन — ग्राहकहरूले यसलाई प्रदायक असफलता (#11015) बाट छुट्याउन सक्दैनन्। |
| `/healthz` जस्तै घटना लुप                                             | व्यस्त क्याटलग वा कम्प्रेसन टिकले प्रोबलाई ढिलाइ गर्न सक्छ; छोटो टाइमआउट त्यसपछि पुन: सुरु हुन्छ** मात्र** प्रतिकृति।                                                                                                                                                                                           |

**प्रोब म्याट्रिक्स** ( [कुबर्नेट्स प्रोब सिफारिसहरू](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) पनि हेर्नुहोस्):

| अनुसन्धान    | लक्ष्य                                                          | प्रयोग नगर्नुहोस्                                |
| ------------ | --------------------------------------------------------------- | ------------------------------------------------ |
| जीवन्तता     | TCP मा `PORT` (पूर्वनिर्धारित `20128`), वा सफ्ट HTTP `/healthz` | `/api/monitoring/health`                         |
| तयारी        | HTTP `GET /healthz`                                             | टाइट टाइमआउट जसले घटना-लूप व्यस्तलाई मृत मान्छन् |
| गहिरो / मानव | `/api/monitoring/health`                                        | स्वचालित कुबेलेट जीवन्तता                        |

**अपग्रेडहरू:** प्रत्येक सत्र घट्ने आशा गर्नुहोस्। यदि तपाईं सक्नुहुन्छ भने ग्राहकहरू निकाल्नुहोस्; पूर्वनिर्धारित SQLite मा कुनै रोलिङ अपडेट छैन। कम्पोज `restart: unless-stopped` plus Docker `HEALTHCHECK` कन्टेनर अस्वास्थ्यकर हुँदा मात्र प्रक्रियालाई प्रतिस्थापन गर्नेछ — उही ब्लास्ट रेडियस।

तयार मेनिफेस्टहरू र हेल्म चार्ट `deploy/kubernetes/` र `deploy/helm/omniroute/` मा लाइभ हुन्छन् — [Kubernetes डिप्लोयमेन्ट गाइड](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md) हेर्नुहोस्।

कुबर्नेट्स स्निपेट ए को लागी** एकल प्रतिकृति** (पुनः सिर्जना आवश्यक छ; एक SQLite फाइल विरुद्ध `replicas` नउठाउनुहोस्):

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

`preStop` sleep ले kube लाई SIGTERM अघि सेवा अन्त्य बिन्दुहरू छोड्न दिन्छ** नयाँ** ट्राफिकले मृत्यु प्रक्रियालाई हिट गर्न रोक्छ। इन-फ्लाइट `/v1/responses` SSE हेवीवेट भर्ना पट्टाहरू (#11015) मार्फत `SHUTDOWN_TIMEOUT_MS` (पूर्वनिर्धारित 30s) सम्म निकालिन्छ। नयाँ अनुरोधहरू जुन अझै प्रक्रियामा पुग्छन् `503` + `Retry-After: 5` पाउँछन्। प्रतिस्थापन तयार नभएसम्म खाली-अन्तबिन्दु अंतर पुन: सिर्जना गर्नुहोस् एक कठिन आउटेज रहन्छ - त्यो SQLite टोपोलोजी हो, एक प्रोब गलत कन्फिगरेसन होइन।

बाह्य Postgres / बहु-लेखक HA हो** होइन** एक दस्तावेज स्टक मार्ग। यदि तपाइँलाई HA चाहिन्छ भने, एकल प्रतिकृति राख्नुहोस् वा परियोजनाले परीक्षण गरेको र छुट्टै दस्तावेजीकरण गरेको टोपोलोजी चलाउनुहोस्। Postgres/MySQL कार्य [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) मा रहन्छ। त्यो जहाज सम्म, गुणन गर्न एक मात्र समर्थित तरिका** ठूलो** `/v1/responses` क्षमता N स्वतन्त्र प्रक्रियाहरू (अर्को खण्ड) हो, एक भोल्युममा `replicas > 1` होइन।

## स्केल-आउट: N स्वतन्त्र प्रक्रियाहरू

एउटा Node प्रक्रिया भनेको **एउटा V8 heap** हो। एक-अर्कासँग ओभरल्याप हुने ~3 MiB / ~750k-token का दुई coding-agent `POST /v1/responses` (RTK + Caveman) ले ~12 Gi मा उक्त heap लाई अवरुद्ध गर्छन् (`FATAL ERROR: Reached heap limit`) र 16 Gi cgroup लाई OOM गराउन सक्छन्। [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) हेर्नुहोस्। त्यो मापन **मेमोरी-बजेट** सम्बन्धी चेतावनी हो, एकैसाथ चल्ने लामा `/v1/responses` को सङ्ख्यामा उत्पादनले लगाएको दुईको कठोर अधिकतम सीमा होइन। भारी chat admission लाई स्वतः व्युत्पन्न गरिएको ingest byte budget (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) द्वारा नियन्त्रण गरिन्छ, जुन सोही V8/cgroup सीमाबाट आकार निर्धारण गरिएको हुन्छ — पहिले नै आकार निर्धारण गरिएको प्रक्रियामा यसलाई बढाएर override गर्दा (वा पुरानो `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` request-count cap सेट गर्दा) पुनः अवरोध निम्तिन्छ। साना chats, `/healthz`, `/v1/models`, र MCP उक्त cap मा **पर्दैनन्**।

### एउटा प्रक्रिया: दुईभन्दा बढी लामा `/v1/responses`

एउटा **स्वस्थ** प्रक्रिया (heap `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` भन्दा तल, पूर्वनिर्धारित `0.75`) ले प्रक्रिया-व्यापी inflight-byte budget (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) मा अझै ठाउँ हुँदा एकैसाथ दुईभन्दा बढी लामा `POST /v1/responses` चलाउन **सक्छ**। `OMNIROUTE_CHAT_LARGE_BODY_BYTES` बराबर वा त्यसभन्दा ठूला bodies (पूर्वनिर्धारित 256 KiB) ले संरचनात्मक रूपमा भारी requests सरह heavyweight lease लिन्छन् र उही [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` escape (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) प्रयोग गर्छन्। एकैसाथ चल्ने दर्जनौँ लामा SSE clients (सञ्चालकहरूलाई प्रायः 40–50 चाहिन्छ) **मेमोरी-बजेट** सम्बन्धी प्रश्न हो — heap + primary/headroom slots + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` को आकार निर्धारण गर्नुहोस् — यो उत्पादनको “अधिकतम 2” भन्ने कठोर सीमा होइन। दबाबमा परेको heap ले अझै पनि पुनः प्रयास गर्न मिल्ने `503` सहित load shed गर्छ, जसले गर्दा #7849 पुनः देखा पर्दैन।

**heaps को सङ्ख्या बढाउन** (स्वतन्त्र V8 old-spaces) **हाल**:

| गर्नुहोस्                                                                                                                                                                            | नगर्नुहोस्                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| **N containers/pods** चलाउनुहोस्, प्रत्येकको **आफ्नै** `DATA_DIR` / volume सहित                                                                                                      | एउटै SQLite file मा `replicas > 1` सेट नगर्नुहोस्                       |
| heap / inflight-byte budget का आधारमा heavy in-flight + healthy-headroom को आकार निर्धारण गर्नुहोस्; 1–2 भनेको रूढिवादी #7849 पूर्वनिर्धारित मान हो, उत्पादनको कठोर अधिकतम सीमा होइन | एउटा प्रक्रियालाई 8× RAM र असीमित count cap नदिनुहोस्                   |
| वैकल्पिक: **साझा quota counters** का लागि `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL`                                                                                       | Redis लाई साझा SQLite नठान्नुहोस् — त्यो त्यस्तो होइन                   |
| प्रत्येक instance मा provider secrets नक्कल गर्नुहोस् (वा विभाजित dashboards स्वीकार गर्नुहोस्)                                                                                      | सबै instances मा एउटै dashboard / एउटै call-log हुने अपेक्षा नगर्नुहोस् |
| कुनै पनि load balancer अगाडि राख्नुहोस्; API key वा session का आधारमा sticky routing पर्याप्त हुन्छ                                                                                  | vendor-specific size-aware middleware अनिवार्य नठान्नुहोस्              |

Hardware: प्रत्येक instance मा एकैसाथ चल्ने लामा `/v1/responses` को सङ्ख्या **मेमोरी-बजेट** सम्बन्धी प्रश्न हो (heap + inflight-byte / #10110)। `N` स्वतन्त्र `DATA_DIR`s ले अझै heaps को सङ्ख्या बढाउँछन्: host RAM ले `N × cgroup` धान्नुपर्छ, “N=8 भएको एउटै 16 Gi pod” होइन। एउटै SQLite file मा कहिल्यै पनि `replicas > 1` प्रयोग नगर्नुहोस्।

Compose को रूपरेखा (दुई heaps, दुई volumes — `deploy.replicas: 2` होइन):

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

In-process density (HTTP isolate बाहिर compression) [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023) हो। साझा durable state मा एउटा logical cluster [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) हो।

## Docker भित्र Gemini का क्षेत्रीय त्रुटिहरू

Google AI Studio / Gemini API ले HTTP 400 सहित FAILED_PRECONDITION र
`API प्रयोगका लागि प्रयोगकर्ताको स्थान समर्थित छैन।` फर्काउन सक्छ। होस्टमा सफल भएको अनुरोधले
कन्टेनरले पनि उही बहिर्गमन मार्ग प्रयोग गर्छ भन्ने प्रमाणित गर्दैन। DNS क्रम,
IPv4/IPv6 कनेक्टिभिटी, VPN राउटिङ र कन्फिगर गरिएका प्रोक्सीहरू फरक हुन सक्छन्।
[Google का समर्थित क्षेत्रहरू](https://ai.google.dev/gemini-api/docs/available-regions)
का साथै वास्तविक जडान मार्ग पनि जाँच गर्नुहोस्; यो त्रुटिले मात्र खराब API key भएको पहिचान गर्दैन।

### जडान-विशिष्ट प्रोक्सीलाई प्राथमिकता दिनुहोस्

प्रभावित Gemini जडानका लागि OmniRoute को [प्रति-जडान प्रोक्सी कन्फिगरेसन](../ops/PROXY_GUIDE.md#4-level-proxy-system)
प्रयोग गर्नुहोस्, त्यसपछि उही मोडेल प्रयोग गरेर **जडान परीक्षण गर्नुहोस्** र एउटा सानो अनुरोध
दोहोर्याउनुहोस्। यसले राउटिङ परिवर्तनलाई त्यही जडानमा सीमित राख्छ। प्रोक्सीमा
कन्टेनरबाट पहुँच पुग्छ र जडानले वास्तवमै त्यसैलाई चयन गर्छ भन्ने पुष्टि गर्नुहोस्।
मार्ग परिवर्तन गर्दैमा अपस्ट्रिम क्षेत्रीय योग्यता सुनिश्चित हुँदैन।

### होस्ट र कन्टेनर नेटवर्किङ तुलना गर्नुहोस्

प्रमाणीकृत परिणामहरू तुलना गर्दा key, मोडेल र अनुरोध उस्तै राख्नुहोस्; कुनै issue मा कहिल्यै
प्रमाणपत्रहरू, प्रोक्सी पासवर्डहरू वा पूर्ण authorization headers नटाँस्नुहोस्।
पहिले OS resolver ले कुन address families उपलब्ध गराउँछ भनी निरीक्षण गर्नुहोस्, होस्टमा
र कन्टेनरभित्र उही command प्रयोग गरेर:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

`omniroute` लाई तपाईंले चलाउने सेवाले प्रतिस्थापन गर्नुहोस् (उदाहरणका लागि, `omniroute-web`)। यी
commands ले प्रमाणपत्र वा IP addresses बिना address families प्रिन्ट गर्छन्। फर्काइएको `6`
ले IPv6 DNS परिणाम मात्र देखाउँछ: यसले प्रयोगयोग्य IPv6 मार्ग वा API पहुँच प्रमाणित
**गर्दैन**। जहाँ `curl` इन्स्टल गरिएको छ, दुवै वातावरणमा
`curl -4 -I https://generativelanguage.googleapis.com` लाई
`curl -6 -I https://generativelanguage.googleapis.com` सँग तुलना गर्नुहोस्।
प्रमाणीकरण नगरिएको त्रुटि भए पनि HTTP प्रतिक्रियाले उक्त परीक्षणका लागि कनेक्टिभिटी
प्रमाणित गर्छ; प्रमाणीकृत मोडेल अनुरोधले मात्र Gemini योग्यता परीक्षण गर्छ।

### होस्ट-स्तरीय विकल्प: कार्यरत IPv6 र resolver नीति

[#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) का रिपोर्टकर्ताले आफ्नो
वातावरणमा कन्टेनर IPv6 सक्षम गरेर र glibc address selection परिवर्तन गरेर पहुँच
पुनर्स्थापित गरे। यसलाई वातावरण-विशिष्ट विकल्पका रूपमा लिनुहोस्। resolver प्राथमिकताहरू
समायोजन गर्नुअघि कार्यरत होस्ट IPv6, कन्टेनर egress/routing र firewall नियमहरू पुष्टि
गर्नुहोस्। निजी ULA address ले मात्र सार्वजनिक IPv6 कनेक्टिभिटी स्थापित गर्दैन।

Compose को default network मा पहिल्यै जोडिएका सेवाहरूका लागि, यो खण्डले उक्त network मा
IPv6 सक्षम गर्छ; आफ्नो सेवाको बाँकी भाग, ports, volumes र कन्फिगरेसन जस्ताको तस्तै राख्नुहोस्:

```yaml
networks:
  default:
    enable_ipv6: true
```

नाम दिइएको network का लागि, सेवाले वास्तवमै प्रयोग गर्ने network मा यसलाई सक्षम गर्नुहोस्।
Docker ले ULA subnet विनियोजन गर्न सक्छ; तपाईंको network लाई आवश्यक पर्दा मात्र स्पष्ट,
नखप्टिने subnet चयन गर्नुहोस्। [Docker IPv6 networking](https://docs.docker.com/engine/daemon/ipv6/)
र [Compose network options](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6)
हेर्नुहोस्।

**glibc-आधारित image** मा, `/etc/gai.conf` ले address selection परिवर्तन गर्न सक्छ। हालको
repository Dockerfile ले Debian प्रयोग गर्छ; अनुकूलित musl-आधारित images ले यो संयन्त्र
साझा गर्दैनन्। रिपोर्ट गरिएको समायोजनले ULA label लाई `label fc00::/7 6` बाट
`label fc00::/7 1` मा परिवर्तन गर्छ। image को पूर्ण policy table बाट सुरु गर्नुहोस् र यसका
अन्य entries सुरक्षित राख्नुहोस्: `label` वा `precedence` entry थप्दा उक्त default table
प्रतिस्थापन हुन्छ, त्यसैले परिवर्तन गरिएको line मात्र समावेश भएको file अपर्याप्त हुन्छ।
[glibc configuration reference](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
ले ती semantics दस्तावेजीकरण गर्छ। समीक्षा गरिएको file लाई read-only रूपमा `/etc/gai.conf`
मा bind-mount गर्नुहोस् र लागू गर्न सेवा पुनः सिर्जना गर्नुहोस्।

यसले **त्यो कन्टेनरभित्रका सबै बहिर्गमन ट्राफिकका लागि** OS address selection परिवर्तन गर्छ।
यसले प्रत्येक application लाई IPv6 छनोट गर्न बाध्य पार्दैन: Node को DNS क्रम र जडान
selection पनि महत्त्वपूर्ण हुन्छ। विशेषगरी, `--dns-result-order=ipv4first` ले IPv4 लाई
प्राथमिकता दिन्छ र IPv4-मात्र विफलताका लागि समाधान होइन।
[Node DNS ordering](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder) हेर्नुहोस्।

कुनै पनि होस्ट-स्तरीय परिवर्तनपछि Gemini र आफ्ना अन्य providers लाई पुनः परीक्षण गर्नुहोस्।
पछाडि फर्काउन, अनुकूलित `gai.conf` mount हटाउनुहोस्, अघिल्लो network कन्फिगरेसन
पुनर्स्थापित गर्नुहोस् र maintenance window का बेला प्रभावित सेवा/network पुनः सिर्जना
गर्नुहोस्। network पुनः सिर्जना गर्दा त्यसमा जोडिएका अन्य कन्टेनरहरू अवरुद्ध हुन सक्छन्;
persistent data volume नमेटाउनुहोस्।

## महत्त्वपूर्ण टिप्पणीहरू

- **SQLite WAL मोड:** OmniRoute ले नवीनतम परिवर्तनहरूलाई `storage.sqlite` मा पुनः चेकपोइन्ट गर्न सकोस् भनेर `docker stop` लाई पूरा हुन दिनुपर्छ। समावेश गरिएका Compose फाइलहरूले पहिले नै 40s को स्टप ग्रेस अवधि सेट गरेका छन्। यदि तपाईंले इमेजलाई सिधै चलाउनुहुन्छ भने, `--stop-timeout 40` कायम राख्नुहोस्।
- **`DISABLE_SQLITE_AUTO_BACKUP`:** नियमित/लेखन-पूर्व ब्याकअपहरू बाह्य रूपमा व्यवस्थापन गरिएका छन् भने यसलाई `true` मा सेट गर्नुहोस्। अवस्थित-डेटाबेस माइग्रेसनहरूका लागि अझै पनि तिनको आफ्नै टिकाउ सुरक्षा स्न्यापसट र सामूहिक-माइग्रेसन सुरक्षा संयन्त्र आवश्यक हुन्छ।
- **डेटा स्थायित्व:** कन्टेनर पुनः सुरु हुँदा पनि तपाईंको डेटाबेस, कुञ्जीहरू र कन्फिगरेसनहरू कायम राख्न सधैँ `/app/data` मा भोल्युम माउन्ट गर्नुहोस्।
- **पोर्ट कन्फिगरेसन:** पूर्वनिर्धारित `20128` पोर्ट परिवर्तन गर्न `PORT` वातावरण चरलाई ओभरराइड गर्नुहोस्।

## यो पनि हेर्नुहोस्

- [VM डिप्लोयमेन्ट गाइड](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare सेटअप
- [Fly.io डिप्लोयमेन्ट गाइड](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.io मा डिप्लोय गर्नुहोस्
- [वातावरण कन्फिगरेसन](../reference/ENVIRONMENT.md) — पूर्ण `.env` सन्दर्भ
