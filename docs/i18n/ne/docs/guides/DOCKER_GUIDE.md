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

## द्रुत दौड

> **एक आदेश मा स्व-होस्ट?** [सेल्फ-होस्ट गाइड](../getting-started/SELF_HOST_GUIDE.md) — `docker compose -f docker-compose.selfhost.yml up -d` (प्रकाशित छवि + Redis, लुपब्याक-मात्र, कुनै प्रोफाइल विकल्प छैन) हेर्नुहोस्। तलको द्रुत रन पहिले नै अन्यत्र Redis चलाउने प्रयोगकर्ताहरूको लागि एकल कन्टेनर मार्ग हो।

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## वातावरण फाइल संग

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

## डकरफाइल चरणहरू

भण्डारले बहु-चरण डकरफाइल (`Dockerfile`) पठाउँछ। चार चरणहरू खुला छन्; तपाईंको प्रयोग केसको लागि सही `target` छान्नुहोस्।

| स्टेज         | आधार छवि              | उद्देश्य                                                                                                                                                                                                                                                                              |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | deps (`npm ci --legacy-peer-deps`) स्थापना गर्दछ र `npm run build` चलाउँछ (Turbopack पूर्वनिर्धारित — तल निर्माण-समय स्रोतहरू हेर्नुहोस्)                                                                                                                                             |
| `runner-base` | `node:26-trixie-slim` | Next.js स्ट्यान्डअलोन आउटपुटको साथ उत्पादन रनटाइम।** कुनै पनि प्रदायक CLIs बन्डल गरिएको छैन।**                                                                                                                                                                                        |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose` र ग्लोबल CLIs थप्छ : `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`।** एजेन्टिक कार्यप्रवाहका लागि यसलाई छान्नुहोस्।**                                                                                                        |
| `runner-web`  | `runner-base`         | वेब-सत्र प्रदायकहरूको लागि Playwright + एक क्रोमियम ब्राउजर (`--with-deps`) थप्छ: `gemini-web`, `claude-web`, `claude-turnstile`।** तपाईंले ती प्रदायकहरू प्रयोग गर्दा यसलाई छान्नुहोस्** — सादा छवि बिना अनुरोधको समयमा असफल हुन्छ (रिलिज च्यानलहरू अन्तर्गत `-web` नोट हेर्नुहोस्)। |

म्यानुअल रूपमा एक विशिष्ट लक्ष्य बनाउनुहोस्:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### निर्माण-समय स्रोतहरू

`builder` स्टेजको लागत के हो भनेर तीन बिल्ड आर्गले नियन्त्रण गर्छ। तिनीहरू निर्माण-समय मात्र हुन् — `OMNIROUTE_MEMORY_MB` (तल) एक अलग, रनटाइम नब हो।

| अर्ग बनाउनुहोस्             | पूर्वनिर्धारित | प्रभाव                                                                                   |
| --------------------------- | -------------- | ---------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`            | `0` वेबप्याकको साथ बनाउँछ: तल्लो शिखर मेमोरी, ढिलो। `1` ले Turbopack लाई अप्ट गर्दछ।     |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`         | जन्मेको `next build` को लागि V8 हिप छत (`--max-old-space-size`)।                         |
| `OMNIROUTE_BUILD_WORKERS`   | `2`            | फिड `CIRCLE_NODE_TOTAL`; अर्को पृष्ठ-डेटा संग्रहको लागि `workers = N - 1` प्राप्त गर्दछ। |

`OMNIROUTE_BUILD_WORKERS` ठूला निर्माणकर्तालाई उठाउने र बाध्यकारी निर्माण मर्दा शंका गर्ने व्यक्ति हो।** पछि** `✓ Compiled successfully` प्रत्येक पृष्ठ-डेटा कार्यकर्ता यसको आफ्नै प्रक्रिया हो, र अभिभावक `next build` आफै पनि हो; प्रत्यक्ष VPS प्रजनन (इस्यू #7518) ले प्रत्येक प्रक्रियाको शिखर RSS मापन ~ 4.5 GB मा `NODE_OPTIONS` हिप झण्डाबाट स्वतन्त्र (Turbopack V8 हीप बाहिर native/Rust मेमोरीमा कम्पाइल गर्दछ)। `2` को पूर्वनिर्धारित (→ 1 कार्यकर्ता, 2 प्रक्रियाहरू जम्मा) 16 GB / 4 vCPU GitHub-होस्ट गरिएका धावकहरू प्रकाशन पाइपलाइनले प्रयोग गर्दछ। `8` मा (→ 7 कार्यकर्ताहरू) त्यो धावकको मेमोरी सकियो र बिल्डकिटले `ResourceExhausted: ... cannot allocate memory` को साथ चरण असफल भयो; `3` (→ 2 कार्यकर्ताहरू) अझै पनि फिट भएन एक पटक प्रति-प्रक्रिया RSS अनुमानित गर्नुको सट्टा सीधा मापन गरियो। `tests/unit/docker-build-memory-budget.test.ts` मापन गरिएको आंकडाको विरुद्ध अंकगणित गर्दछ र यदि कुनै नबले धावकलाई पछाडि पार्छ भने असफल हुन्छ।

Turbopack compiles in native Rust memory that lives **outside** the V8 heap, so `OMNIROUTE_BUILD_MEMORY_MB` does not bound it. On a host with a memory ceiling the build is then SIGKILLed by the OOM killer with no error text at all — it simply stops mid-`Creating an optimized production build`, which reads like a hang rather than an out-of-memory. That is why the `Dockerfile` defaults to webpack (`OMNIROUTE_USE_TURBOPACK=0`), unlike `npm run dev` / `npm run build`, where Turbopack is the code default: a bare `docker build .` with no build args (what Railway and other one-click hosts run) must not die silently on a memory-capped builder. The published images already pass `OMNIROUTE_USE_TURBOPACK=0` explicitly in `docker-publish.yml`. On a builder with plenty of RAM, opt into Turbopack for a faster build:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` सक्षम छ, त्यसैले `next build` अभिभावक चलाउँछ** र** एक कार्यकर्ता प्रक्रिया र प्रत्येक सम्मान `OMNIROUTE_BUILD_MEMORY_MB` अलग। कन्टेनर छतलाई त्यो मानको करिब दुई गुणा माथि आकार दिनुहोस्, एक पटक होइन।

यो रूख मा मापन (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| बन्डलर    | कन्टेनर छत     | नतिजा                                  |
| --------- | -------------- | -------------------------------------- |
| Turbopack | 8 GiB / 16 GiB | OOM- दुवै मा मारिए, चुपचाप             |
| वेबप्याक  | 8 GiB          | कार्यकर्ता SIGKILLed निर्माण गर्नुहोस् |
| वेबप्याक  | 12 GiB         | सफल, 11.1 GiB मा उचाई                  |

### रनटाइम पूर्वनिर्धारितहरू

`runner-base` द्वारा निर्यात गरिएको पूर्वनिर्धारित: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`।

Docker मा मेमोरी व्यवहार:

- छविले `OMNIROUTE_MEMORY_MB=1024` सेट गर्छ र यसबाट `NODE_OPTIONS=--max-old-space-size=1024` लिन्छ।
- वास्तविक सर्भर प्रक्रिया स्ट्यान्डअलोन लन्चरद्वारा सुरु हुन्छ, जसले `OMNIROUTE_MEMORY_MB` पढ्छ र `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` जोड्छ।
- नोडले पछिल्लो पटक दोहोरिएको `--max-old-space-size` मान प्रयोग गर्दछ, त्यसैले `OMNIROUTE_MEMORY_MB` सेटिङले प्रभावकारी Docker हिप सीमा नियन्त्रण गर्छ।
- किनभने छविले सधैं यसलाई सेट गर्छ, लन्चरको आफ्नै RAM-क्यालिब्रेट गरिएको फलब्याक Docker अन्तर्गत लागू हुँदैन। कार्यभारको लागि यसलाई स्पष्ट रूपमा बढाउनुहोस् (तलको तालिका)। कोडिङ-एजेन्ट `/v1/responses` को लागि `2048` अझै धेरै सानो छ।

### कोडिङ एजेन्टहरूको लागि रनटाइम RAM

1 GiB Docker पूर्वनिर्धारित एक dashboard/light-chat फ्लोर हो, उत्पादन आकार होइन। लामो `POST /v1/responses` बडीहरू (सयौं सन्देशहरू, दशौं उपकरणहरू) कम्प्रेसनको समयमा धेरै इन-मेमोरी ग्राफहरू राख्छन्। दुई ओभरल्यापिङ ~ 3 MiB / ~ 750k-टोकन अनुरोधहरूले V8 लाई a मा रद्द गरेको छ।** 12 GiB** पुरानो-स्पेस (`FATAL ERROR: Reached heap limit`) र 16 GiB cgroup OOM पनि हिट गर्नुहोस्। [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) हेर्नुहोस्।

साइज** cgroup `--memory` ढेर माथि** — नेटिभ बफरहरू, SQLite, र कम्प्रेसन मध्यवर्तीहरू V8 बाहिर बस्छन्।

| कार्यभार                            | `OMNIROUTE_MEMORY_MB`       | कन्टेनर / cgroup    | नोटहरू                                                                                             |
| ----------------------------------- | --------------------------- | ------------------- | -------------------------------------------------------------------------------------------------- |
| ड्यासबोर्ड, एक हल्का च्याट          | `1024` (छवि पूर्वनिर्धारित) | ≥2 GiB              |                                                                                                    |
| एक कोडिङ एजेन्ट (Claude/Codex/Grok) | `8192`                      | ≥10 GiB             | विशिष्ट एकल-सत्र `/v1/responses`                                                                   |
| दुई समवर्ती लामो `/v1/responses`    | `10240`–`12288`             | ≥12–16 GiB          | मापन गरिएको V8 ~ 12 GiB हिपमा रद्द गर्नुहोस्                                                       |
| तीन + समवर्ती लामो सन्दर्भ          | एक प्रक्रियामा नगर्नुहोस्   | क्रमबद्ध / अधिक RAM | पूर्वनिर्धारित हेवीवेट प्रवेश 1 इन-फ्लाइट हो; RAM बिना यसलाई उठाउनुले गर्भपातलाई पुन: परिचय गराउँछ |

बेयर मेटलमा`omniroute serve` RAM को 35% ~(क्लम्प्ड `[512, 4096]`) क्यालिब्रेट गर्दछ जब `OMNIROUTE_MEMORY_MB` हुन्छ** सेट नगरिएको** । Docker सधैं `1024` सेट गर्छ, ताकि क्यालिब्रेसन आधिकारिक छविमा कहिल्यै चल्दैन।

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
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

## सबपाथमा रिभर्स प्रोक्सी (Traefik / nginx)

Next.js `basePath` स्ट्यान्डअलोन बन्डलमा कम्पाइल गरिएको छ। OmniRoute एप रूटमा सेन्टिनेल फाइलमा बेक्ड मान रेकर्ड गर्दछ ( `npm run build` समयमा लेखिएको; `scripts/docker/ensure-docker-base-path.mjs` द्वारा पढिएको) र कन्टेनर सुरु हुँदा `OMNIROUTE_BASE_PATH` सँग तुलना गर्दछ। जब तिनीहरू फरक हुन्छन् र छवि डोमेन रूटको लागि बनाइएको थियो, एन्ट्रीपोइन्टले स्ट्यान्डअलोन प्रकट गर्दछ, इम्बेडेड `basePath`/`assetPrefix` लिटरलहरू पुन: लेख्छ (अर्को 16 ले `assetPrefix` एक्लो — बाट SSR सम्पत्ति URLs रेन्डर गर्दछ), प्याचरले यसमा सबपाथ मिरर URLs ( `/_next/static` को रूपमा) manifests, media imports, prerendered error pages) र `node dev/run-standalone.mjs` रन अघि क्लाइन्ट `process.env` shim।

### रचना रचना (सिफारिस गरिएको)

दुबै चरहरू `.env` मा सेट गर्नुहोस्, त्यसपछि छवि र रनटाइम सहमत हुने गरी पुन: निर्माण गर्नुहोस्:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` ले `OMNIROUTE_BASE_PATH` Docker बिल्ड-आर्ग र रनटाइम वातावरण चरको रूपमा फर्वार्ड गर्छ।

### पूर्व-निर्मित रूट छवि + रनटाइम सबपाथ

प्रकाशित `cheaperinference/omniroute:*` छविहरू डोमेन रूटको लागि बनाइएका छन्। तपाइँ अझै पनि रनटाइम मा `OMNIROUTE_BASE_PATH` सेट गर्न सक्नुहुन्छ; कन्टेनरले स्टार्टअपमा एक पटक बन्डललाई प्याच गर्दछ। मिल्दो सार्वजनिक उत्पत्तिसँग जोड्नुहोस्:

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

फर्वार्ड गर्न रिभर्स प्रोक्सी कन्फिगर गर्नुहोस्** पूर्ण** बाह्य मार्ग (उपसर्ग नछोड्नुहोस्)। Traefik ले `PathPrefix(`/omniroute `)` लाई `StripPrefix` बिना कन्टेनरमा रुट गर्नुपर्छ, त्यसैले Next.js `/omniroute/...` प्राप्त गर्छ र `/omniroute/_next/...` बाट सम्पत्तिहरू प्रदान गर्दछ।

Docker स्वास्थ्य जाँचले सक्रिय `OMNIROUTE_BASE_PATH` सँग उपसर्ग लगाइएको हल्का `/healthz` लाइफसायकल अन्तिम बिन्दुको जाँच गर्दछ। `/api/monitoring/health` human/dashboard निदानका लागि उपलब्ध रहन्छ; कन्टेनर HEALTHCHECK त्यसमा फर्काउन (उदाहरणका लागि गहिरो स्वास्थ्य प्रवर्तनको लागि), `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` सेट गर्नुहोस्। त्यो बाटो ए** गहिरो** जाँच गर्नुहोस् (DB + अनुगमन सारांश) — Docker को विरलै `HEALTHCHECK` को लागी उपयुक्त छ यदि तपाईले फिर्ता अप्ट इन गर्नुभयो भने, तर** होइन** Kubernetes `livenessProbe` अन्तरालहरूको लागि।

अर्केस्ट्रेटरहरूको लागि (कुबर्नेट्स, घुमन्ते, आदि):

| अनुसन्धान           | रुचाउनुहोस्                                                              | बच्नुहोस्                                        |
| ------------------- | ------------------------------------------------------------------------ | ------------------------------------------------ |
| जीवन्तता            | HTTP `GET /livez`, वा TCP मुख्य पोर्टमा (`PORT`, पूर्वनिर्धारित `20128`) | जीवन्तताको रूपमा`/api/monitoring/health`         |
| तयारी               | HTTP `GET /healthz`                                                      | टाइट टाइमआउट जसले घटना-लूप व्यस्तलाई मृत मान्छन् |
| गहिरो / ब्ल्याकबक्स | `/api/monitoring/health`                                                 | —                                                |

`/healthz` रिपोर्ट प्रक्रिया जीवनचक्र (`ok` / `starting` / `stopping`)। `/livez` मात्र प्रक्रिया-जीवित छ (200 जब ह्यान्डलर चलाउन सक्छ; यो तयारीको लागि पर्खदैन)। दुबै अझै पनि अनुरोध ह्यान्डलिंगको रूपमा समान नोड घटना लुपमा चल्छन्, त्यसैले CPU-बाउन्ड क्याटलग वा कम्प्रेसन कार्यले तिनीहरूलाई — व्यस्त ≠ मृत ढिलाइ गर्न सक्छ। HTTP ले टाइम आउट गरेमा TCP liveness लाई प्राथमिकता दिनुहोस्। पूर्ण जाँच निर्देशन: [निगरानी गाइड — Kubernetes अनुसन्धान सिफारिसहरू](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ।

## Docker कम्पोज विथ क्याडी (HTTPS Auto-TLS)

OmniRoute सुरक्षित रूपमा Caddy को स्वचालित SSL प्रावधान प्रयोग गरेर उजागर गर्न सकिन्छ। सुनिश्चित गर्नुहोस् कि तपाईको डोमेनको DNS A रेकर्डले तपाईको सर्भरको IP मा पोइन्ट गर्दछ।

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

क्याडीले अपस्ट्रिम कन्टेनरको लागि मानक फर्वार्डिङ हेडरहरू सेट गर्दछ। OmniRoute OAuth कलब्याकहरू र उत्पन्न सार्वजनिक लिङ्कहरूका लागि `NEXT_PUBLIC_BASE_URL` प्रामाणिक सार्वजनिक मूलको रूपमा प्रयोग गर्दछ; प्रमाणीकृत ड्यासबोर्डले समान-मूल अनुरोधहरू र सत्र-बाउन्ड CSRF सुरक्षा प्रयोग गर्दछ। केवल उन्नत परिनियोजनका लागि `OMNIROUTE_TRUST_PROXY` सक्षम गर्नुहोस् जहाँ तपाईं जानाजानी OmniRoute स्पष्ट कन्फिगरेसनको सट्टा विश्वसनीय फर्वार्ड गरिएका हेडरहरूबाट सार्वजनिक मूल प्राप्त गर्न चाहनुहुन्छ।

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

## छवि ट्यागहरू

| छवि                          | ट्याग    | साइज    | विवरण                                              |
| ---------------------------- | -------- | ------- | -------------------------------------------------- |
| `cheaperinference/omniroute` | `latest` | ~ 250MB | उच्चतम** प्रकाशित** स्थिर SemVer (git `main` होइन) |
| `cheaperinference/omniroute` | `3.8.54` | ~ 250MB | GitOps को लागि यो वर्गको ट्याग पिन गर्नुहोस्       |

एउटै छविहरू तीन भण्डारहरूमा प्रकाशित हुन्छन्, समान प्रति-आर्किटेक्चर डाइजेस्टको साथ: `cheaperinference/omniroute` (Docker हब, सस्तो अनुमान संगठन, 3.8.53 मा), `ghcr.io/cheaper-inference/omniroute` र लिगेसी `diegosouzapw/omniroute`, जसले यसको पुल इतिहास राख्छ र अझै पनि प्रत्येक रिलीज प्राप्त गर्दछ। अवस्थित `diegosouzapw/omniroute` परिनियोजनहरू अद्यावधिक गरिरहन्छन्; छवि नाम परिवर्तन वैकल्पिक छ। तलको `:next` / `:next-web` पूर्व-रिलीज च्यानल `diegosouzapw/omniroute` र GHCR मा मात्र प्रकाशित छ।

बहु-प्लेटफर्म म्यानिफेस्ट: `linux/amd64` + `linux/arm64` नेटिभ (Apple Silicon, AWS Graviton, Raspberry Pi)। Docker मिल्दो वास्तुकला स्वचालित रूपमा चयन गर्दछ; यदि तपाईलाई ARM होस्टहरूमा AMD64 इमुलेशन जबरजस्ती गर्न आवश्यक छ भने `--platform linux/amd64` पास गर्नुहोस्।

### च्यानलहरू रिलीज गर्नुहोस्

OmniRoute स्थिर रिलीजहरू, सक्रिय रिलीज-शाखा परीक्षण, र विकास निर्माणहरूका लागि छुट्टै Docker च्यानलहरू प्रकाशित गर्दछ।

| च्यानल                          | स्रोत                                  | परिवर्तनशीलता               | प्रयोग गर्न सिफारिस गरिएको                                                                                           |
| ------------------------------- | -------------------------------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Signed/versioned रिलीज                 | अपरिवर्तनीय                 | उत्पादन डिप्लोइमेन्टहरू जसले सटीक रिलीज पिन गर्दछ                                                                    |
| `:latest` / `:latest-web`       | उच्चतम** प्रकाशित** स्थिर SemVer       | परिवर्तनीय स्थिर सूचक       | स्थिर रिलीजहरू पछ्याउँछ** पछि** SemVer प्रकाशित काम — गर्छ** होइन** ट्र्याक `main` वा अप्रकाशित `release/v*` कमिटहरू |
| `:next` / `:next-web`           | हालको पूर्वनिर्धारित `release/v*` शाखा | परिवर्तनीय पूर्व-रिलीज सूचक | परीक्षण फिक्सहरू जुन सक्रिय रिलीज शाखामा ल्याइएका छन् तर अझै स्थिर रिलीजमा छैनन्                                     |
| `:main` / `:main-web`           | `main` शाखा                            | परिवर्तनीय विकास सूचक       | विकास र एकीकरण परीक्षण मात्र                                                                                         |

#### वेब-सत्र प्रदायकहरू: `-web` छविहरू

माथिको प्रत्येक च्यानल `-web` ट्याग (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`) को रूपमा दोब्बर हुन्छ, `runner-web` चरण — उही छवि प्लस Playwright र क्रोमियम ब्राउजरबाट निर्मित। सादा छवि जहाज** बिना** क्रोमियम; `gemini-web`, `claude-web` र `claude-turnstile` लाई चाहिन्छ।

विफलता स्थगित गरिएको छ, स्टार्टअप-समय होइन: ती प्रदायकहरूले आफ्नो मोडेलहरू सूचीबद्ध गर्छन् र ड्यासबोर्डमा जडान भएको रूपमा देखाउँछन्, र केवल पहिलो अनुरोध असफल हुन्छ।

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

यदि तपाइँ ती प्रदायकहरू प्रयोग गर्नुहुन्छ भने, च्यानलको `-web` ट्याग तान्नुहोस् जुन तपाइँ पहिले नै — मा हुनुहुन्छ अरू केहि परिवर्तन छैन। npm/CLI स्थापनामा (कोई Docker छवि छैन), बराबर हराएको टुक्रा ब्राउजर बाइनरी हो: होस्टमा `npx playwright install chromium` चलाउनुहोस्।

#### पूर्व-रिलीज च्यानल प्रयोग गर्दै

`next` च्यानल हालको पूर्वनिर्धारित `release/v*` शाखामा प्रत्येक धक्कामा पुन: निर्माण गरिन्छ र AMD64 र ARM64 दुवैका लागि प्रकाशित हुन्छ। पुरानो मर्मत शाखाहरूले यसलाई अधिलेखन गर्न सक्दैन। च्यानलले अर्को स्थिर ट्याग काट्नु अघि सक्रिय रिलीज शाखामा मर्ज भएका समाधानहरूको लागि तान्न मिल्ने छवि प्रदान गर्दछ।

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker रचनाको लागि, चयन गरिएको प्रोफाइलद्वारा प्रयोग गरिएको छवि ट्यागलाई ओभरराइड गर्नुहोस्, त्यसपछि सेवालाई तान्नुहोस् र पुन: सिर्जना गर्नुहोस्:

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

`next` एक फ्लोटिंग पूर्व-रिलीज च्यानल हो। यो सक्रिय रिलीज शाखामा कुनै पनि धक्का मा परिवर्तन हुन सक्छ र छ** उत्पादन प्रयोगको लागि समर्थित छैन** । विशिष्ट निर्माण मूल्याङ्कन गर्दा छवि डाइजेस्ट पिन गर्नुहोस्:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

परीक्षण गर्नु अघि, OmniRoute डाटा भोल्युम वा बाइन्ड-माउन्ट गरिएको डाटा डाइरेक्टरी ब्याकअप गर्नुहोस्। रोल ब्याक गर्न, पहिले प्रयोग गरिएको स्थिर संस्करण पुनर्स्थापना गर्नुहोस् वा डाइजेस्ट गर्नुहोस् र कन्टेनर पुन: सिर्जना गर्नुहोस्:

```bash
docker pull cheaperinference/omniroute:<stable-version>
docker compose up -d
```

रिलिज-शाखा निर्माणले `latest` कहिल्यै सार्न सक्दैन; केवल एक योग्य स्थिर सिमान्टिक संस्करणले स्थिर सूचकलाई बढावा दिन सक्छ। `next` छविहरूले रिलीज छवि निरीक्षण र CRITICAL-असुरक्षा गेट अवरुद्ध राख्छ।

**`latest` git को लागि मुद्रा ग्यारेन्टी होइन।** `main` वा सक्रिय `release/v*` शाखामा मर्ज गरिएका फिक्सहरू छन्** होइन** `:latest` मा एक स्थिर SemVer छवि प्रकाशित नभएसम्म र प्रकाशित कार्यले `:latest` बढावा दिन्छ (जुन SemVer जस्तै डाइजेस्ट)। यदि GitHub पहिले नै फिक्स देखाउँदा `latest` स्थिर देखिन्छ भने, रिलीज शाखा परीक्षण गर्न `:next` तान्नुहोस् वा SemVer ट्यागको लागि पर्खनुहोस्।

| तपाईं चाहनुहुन्छ                                                                  | प्रयोग गर्नुहोस्               |
| --------------------------------------------------------------------------------- | ------------------------------ |
| GitOps / उत्पादन जुन बहाउनु हुँदैन                                                | पिन `:X.Y.Z` (वा छवि डाइजेस्ट) |
| प्रकाशित अस्तबलहरू पछ्याउनुहोस् र प्रत्येक रिलीजमा पुन: सिर्जना स्वीकार गर्नुहोस् | `:latest`                      |
| जारी नगरिएको `release/v*` कमिटहरू परीक्षण गर्नुहोस्                               | `:next` (उत्पादन होइन)         |
| परीक्षण `main`                                                                    | `:main` (उत्पादन होइन)         |

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

### Codex टोकन रोटेशन स्वामित्व

एक Codex खाताको प्रतिलिपिहरूले स्वतन्त्र रूपमा यसको एकल-प्रयोग रिफ्रेस टोकन उपभोग गर्नु हुँदैन। केवल सिङ्क्रोनाइज गरिएको प्रमाणहरू उपभोग गर्ने उदाहरणहरूमा, `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (उर्फ `cx`) सेट गर्नुहोस्। यसलाई एकल रोटेशन मालिकमा सेट नगरी छोड्नुहोस्। प्रत्येक प्रक्रियालाई अझै पनि आफ्नै `DATA_DIR` चाहिन्छ; यो विकल्पले न त SQLite साझा गर्छ न त टोकन सिङ्क्रोनाइजेसन वा वितरित लक प्रदान गर्दछ।

निष्क्रिय उदाहरणले पुन:ताजा आवश्यक हुँदा जडान पुन: पढ्छ र केवल एक फरक, अप्रत्याशित पहुँच टोकन अपनाउछ। अन्यथा जडानको म्याद समाप्त वा निष्क्रिय नगरीकन वा रिफ्रेस-ब्रेकर असफलताको गणना नगरी रिफ्रेस असक्षम गरिएको छ। वास्तविक अपस्ट्रीम प्रमाणीकरण विफलताहरूले अझै पनि सामान्य विफलता लेखा, घातीय कूलडाउन र सामान्य ग्राहक त्रुटि प्रयोग गर्दछ; खाता निष्क्रियता स्थायी रहन्छ। पहुँच टोकनहरूको म्याद समाप्त हुनु अघि मालिकको घुमाइएको टोकनहरू सिंक्रोनाइज गर्नुहोस् (पूर्वनिर्धारित सक्रिय रिफ्रेस लिड पाँच मिनेट हो), वा Codex प्रमाणीकरण फाइल पुन: आयात गर्नुहोस्। निष्क्रिय आयातहरूले टोकन अन्तिम बिन्दुमा प्रमाणीकरण नगरी आपूर्ति टोकनहरू भण्डारण गर्दछ। म्यानुअल dashboard/API रिफ्रेसले `409 refresh_disabled` फर्काउँछ; नयाँ OAuth लगइनहरू अपरिवर्तित छन्। [वातावरण सन्दर्भ](../reference/ENVIRONMENT.md#passive-codex-token-refresh) हेर्नुहोस्।

एक नोड प्रक्रिया हो** एउटा V8 हिप** । दुई ओभरल्यापिङ ~ 3 MiB / ~ 750k-टोकन कोडिङ-एजेन्ट `POST /v1/responses` (RTK + Caveman) ले त्यो ढेर ~ 12 Gi (`FATAL ERROR: Reached heap limit`) मा रद्द गर्छ र 16 Gi cgroup OOM गर्न सक्छ। हेर्नुहोस् [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) । त्यो मापन ए** मेमोरी बजेट** चेतावनी, दुई समवर्ती लामो `/v1/responses` को उत्पादन हार्ड-अधिकतम होइन। हेवीवेट च्याट प्रवेशलाई पहिले नै आकारको प्रक्रियामा उही V8/cgroup छत — बाट ओभरराइड गर्दै (वा लिगेसी `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` अनुरोध-गणना क्याप सेट गर्ने) बाट आकारको स्वत: व्युत्पन्न इन्जेस्ट बाइट बजेट (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) द्वारा गेट गरिएको छ। सानो च्याटहरू, `/healthz`, `/v1/models`, र MCP हुन्** होइन** त्यो टोपी मा।

### एक-प्रक्रिया: दुई भन्दा बढी लामो `/v1/responses`

ए** स्वस्थ** प्रक्रिया ( `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` तलको ढेर, पूर्वनिर्धारित `0.75`)** हुन सक्छ** दुई भन्दा बढी समवर्ती लामो `POST /v1/responses` चलाउनुहोस् जब प्रक्रिया-वाइड इनफ्लाइट-बाइट बजेट (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) अझै कोठा छ। `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (पूर्वनिर्धारित 256 KiB) मा वा माथिका निकायहरूले संरचना-भारी अनुरोधहरूको रूपमा एउटै हेवीवेट लीज लिन्छन् र उही [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` एस्केप (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) प्रयोग गर्छन्। दशौं समवर्ती लामो SSE ग्राहकहरू (अपरेटरहरूलाई प्राय: 40-50 चाहिन्छ) a** मेमोरी बजेट** प्रश्न — साइज हिप + primary/headroom स्लटहरू + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — कडा "अधिकतम 2" उत्पादन सीमा होइन। एक दबाइको हिप अझै पनि पुन: प्रयास गर्न मिल्ने `503` को साथ शेड गर्दछ त्यसैले #7849 फिर्ता आउँदैन।

को** हिपहरू गुणा गर्नुहोस्** (स्वतन्त्र V8 पुराना-स्थानहरू)** आज** :

| गर                                                                                                                              | नगर्नुहोस्                                                   |
| ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| चलाउनुहोस्** N containers/pods** , प्रत्येक यसको साथ** आफ्नै** `DATA_DIR` / भोल्युम                                             | एक SQLite फाइल विरुद्ध `replicas > 1` सेट गर्नुहोस्          |
| साइज भारी इन-फ्लाइट + हेल्दी-हेडरूम हिप / इनफ्लाइट-बाइट बजेटबाट; 1-2 रूढ़िवादी #7849 पूर्वनिर्धारित हो, कडा उत्पादन अधिकतम होइन | एउटा प्रक्रिया 8 × RAM र एक असीमित गणना क्याप दिनुहोस्       |
| वैकल्पिक: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` को लागि** साझा कोटा काउन्टरहरू**                                 | Redis साझा SQLite — को रूपमा व्यवहार गर्नुहोस् यो होइन       |
| प्रत्येक उदाहरणमा डुप्लिकेट प्रदायक गोप्यहरू (वा विभाजन गरिएको ड्यासबोर्डहरू स्वीकार गर्नुहोस्)                                 | उदाहरणहरूमा एउटा ड्यासबोर्ड / एउटा कल-लगको अपेक्षा गर्नुहोस् |
| कुनै पनि लोड ब्यालेन्सरको साथ अगाडि; API कुञ्जी वा सत्र द्वारा चिपचिपा पर्याप्त छ                                               | विक्रेता-विशिष्ट आकार-सचेत मिडलवेयर आवश्यक छ                 |

सत्र-देखि-खाता सम्बन्ध पनि Redis मार्फत साझेदारी गर्न सकिन्छ: प्रत्येक प्रक्रियामा `OMNIROUTE_SESSION_AFFINITY_STORE=redis` र `REDIS_URL` सेट गर्नुहोस्, समान `REDIS_KEY_PREFIX` र सकारात्मक `sessionAffinityTtlMs` सेटिङको साथ। पिनहरूले प्रत्येक प्रक्रियाको योग्य स्थानीय जडानमा ह्यास गरिएको उपयोग-खाता पहिचानहरू समाधान गर्दछ, त्यसैले मिल्दो पहिचान मेटाडेटाका साथ OAuth खाताहरूसँग मिल्दो जडान IDs हुनु आवश्यक छैन। ज्ञात खाता पहिचानहरू पिन रिजोल्युसन र सुरक्षित निष्कासनमा विरोधाभासी स्थानीय IDs मा प्राथमिकता लिन्छन्; पहिचान बिना अभिलेख (वा पहिचान बिना निष्कासन कलरहरू) लेगेसी ID गार्ड राख्छन्। स्थिर उपयोग पहिचान नभएका खाताहरूलाई अझै पनि मिल्दो IDs चाहिन्छ। Redis त्रुटिहरू वा 100 ms भन्दा बढी कलहरू स्थानीय SQLite मा फर्किन्छन्। प्रत्येक Redis affinity स्टोरले 8 मा उत्कृष्ट कार्यहरू क्याप गर्छ, Redis भरिएको तुरुन्तै बाइपास गर्छ, र अन्तर्निहित कार्यहरू समाप्त भएपछि मात्र स्लटहरू जारी गर्दछ, कलरको म्यादमा होइन। Redis आउटेजको समयमा त्यहाँ कुनै साझा सत्य छैन: प्रत्येक उदाहरण आफ्नै स्थानीय सम्बन्धमा फर्कन्छ, सत्रहरू प्रति उदाहरण एक पटक पुन: पिन हुन सक्छ, र उदाहरणहरू भिन्न हुन सक्छन्। स्टिकनेस Redis मार्फत पुन: रूपान्तरण हुन्छ जब यो ठीक हुन्छ। टाइमआउटले पर्खने बाउन्ड गर्छ, पठाइएको EVAL होइन, जुन फलब्याक पछि अवतरण हुन सक्छ। राउटिङ लेखनले राउटिङ निर्णयले अवलोकन गरेको सही मान तुलना गर्छ, नयाँ उत्परिवर्तन-समय पढ्ने होइन; एक अवलोकन गरिएको मिस वा SQLite फलब्याक अवलोकन अनुपस्थित Redis कुञ्जीको रूपमा तुलना गर्दछ। अप्रचलित पिनहरू एक CAS मा प्रतिस्थापन गरिन्छ, त्यसैले ढिलो आदेशले नयाँ, फरक पिनलाई प्रतिस्थापन वा मेटाउन सक्दैन। Redis पढ्छ परमाणु रूपमा मान र बाँकी सर्भर TTL फर्काउँछ; सकारात्मक PTTL (वा म्याद समाप्त नहुने) ले जीवन्तता निर्धारण गर्छ, लेखकको JSON टाइमस्ट्याम्प वा पाठकको घडीले होइन। स्थानीय स्न्यापसट नक्शा जुन स्थानीय समयसीमामा TTL बाँकी छ; अवस्थित JSON कुञ्जीहरू पढ्न योग्य रहन्छन् र तिनीहरूको कच्चा बाइटहरू CAS का लागि राखिन्छन्। Redis सत्यको एकमात्र स्रोत हो जबकि यसले जवाफ दिन्छ। पुष्टि गरिएका साझा अप्सर्टहरू, टचहरू र डिलिटहरूले स्थानीय प्रविष्टि हटाउँछन्, यसलाई कहिल्यै स्थापना वा ताजा नगर्नुहोस्। Redis मार्गमा SQLite ले Redis त्रुटिहरू, टाइमआउट वा प्रवेश संतृप्ति, TTL-बाउन्ड गरिएको यस उदाहरणको आफ्नै फलब्याक निर्णयहरू मात्र राख्छ। पछिको आउटेजमा हराएको स्थानीय पिनको लागि एउटा ताजा पिक (एउटा प्रम्प्ट-क्यास मिस) खर्च हुन्छ, गलत वा निष्कासित खाता होइन। अस्वीकृत अप्सर्टहरूले साझा विजेता र यसको बाँकी TTL आणविक रूपमा फिर्ता गर्दछ: सामान्य चयनले म्याप गरिएको स्थानीय समयसीमा पुन: जाँच गर्दछ र अझै पनि जीवित योग्य विजेता प्रयोग गर्दछ, प्रयोगलाई छुन्छ र अर्को साझा लेख बिना त्यो खाताको लागि लगिङ गर्दछ। यदि यो उपलब्ध छैन भने, चयनले स्थानीय उम्मेद्वारलाई राख्छ, साझा पिनलाई अपरिवर्तित छोड्छ र एक डिबग सन्देश उत्सर्जन गर्दछ। अस्वीकार गरिएको CAS ले SQLite लेख्दैन; Redis त्रुटिहरू, टाइमआउटहरू वा प्रवेश संतृप्तिको सट्टा अवस्थित स्थानीय सञ्चालन लागू गर्नुहोस्। यदि पठाइएको उत्परिवर्तनको जवाफ टाइमआउट पछि आइपुग्छ (स्वीकार गरिएको, अस्वीकार गरिएको वा त्रुटि), एक सिंक्रोनस सटीक क्रमबद्ध-मान तुलना-र-मेट्नेले बाइट-समान टाइमआउट फलब्याक पङ्क्ति मात्र हटाउँछ। त्यो तुलना र मेटाउने बीच कुनै पर्खाइ छैन; नयाँ आउटेज लेखन सुरक्षित छ। गार्डेड इभिकसनले Redis डाउन भए पनि असफल खाताको आफ्नै स्थानीय पिन हटाउँछ, र साझा निष्कासन पुष्टि भएपछि यसलाई फेरि सफा गर्छ। अघिल्लो साझा जवाफहरू विचाराधीनहरूले बेदखल गरिएको स्थानीय पिनलाई पुनर्स्थापित गर्न सक्दैन किनभने साझा सफलताहरूले SQLite कहिल्यै लेख्दैनन्। पछिको आउटेज फलब्याकले खातालाई दोहोर्याउन सक्छ; पछि स्वीकृत साझा लेख Redis मा मात्र अवस्थित छ। Redis misses ले स्थानीय फलब्याक राज्यसँग परामर्श नगर्नुहोस्। चालक बन्द हुँदा, नयाँ चयन गरिएका पिनहरूले लिगेसी चार-फिल्ड SQLite JSON आकार कायम राख्छन्; केवल Redis राउटिङले ह्यास खाता पहिचान थप्छ। प्रिफेच गरिएका पिनहरू तिनीहरूको म्याद सकिने सीमामा पुन: जाँच गरिन्छ। Redis गैर-लीज चयनले स्टोरलाई पुन: पढ्छ, तर सिंक्रोनस लीज योजनाले अझै पनि प्रीफेच र योजना (एक स्वीकृत उत्तम प्रयास विन्डो) बीच बेदखल गरिएको पिन प्रयोग गर्न सक्छ। लीज कमिटले टिकाउ दावी पछि खाताहरू स्विच गर्न सक्दैन: अस्वीकृत अप्सर्टमा यसले दावी गरिएको उम्मेद्वारलाई त्यो अनुरोधको लागि मात्र राख्छ र साझा विजेतालाई अछुतो छोड्छ, त्यसैले उदाहरणहरूमा सम्झौता त्यो मार्गमा सीमित हुन्छ। बाँकी तालिका अझै पनि लागू हुन्छ: यसले कम्बो सत्र स्टिकिनेस, नेटिभ Codex टर्न पिन, खाता सेमाफोरहरू, लकआउटहरू, खर्च सीमा, कन्फिगरेसन वा कल लगहरू साझा गर्दैन।

हार्डवेयर: प्रति-उदाहरण समवर्ती लामो `/v1/responses` हो** मेमोरी बजेट** प्रश्न (heap + inflight-byte / #10110)। `N` independent `DATA_DIR` s अझै पनि multiply heaps: होस्ट RAM `N × cgroup` ढाक्नु पर्छ, "N = 8 सँग एक 16 Gi pod" होइन। एक SQLite फाइलमा कहिल्यै `replicas > 1` नगर्नुहोस्।

स्केच रचना गर्नुहोस् (दुई हिप, दुई खण्ड — `deploy.replicas: 2` होइन):

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

इन-प्रक्रिया घनत्व ( HTTP आइसोलेट बन्द कम्प्रेसन) [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023) हो। साझा टिकाऊ स्थितिमा एउटा तार्किक क्लस्टर [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) हो।

## Docker भित्र मिथुन क्षेत्रीय त्रुटिहरू

Google AI Studio / Gemini API FAILED_PRECONDITION र `User location is not supported for the API use.` सँग HTTP 400 फिर्ता गर्न सक्छ होस्टमा सफल अनुरोधले कन्टेनरले उही आउटबाउन्ड मार्ग प्रयोग गरेको प्रमाणित गर्दैन। DNS अर्डरिङ, IPv4/IPv6 जडान, VPN राउटिङ र कन्फिगर गरिएका प्रोक्सीहरू फरक हुन सक्छन्। [Google को समर्थित क्षेत्रहरू](https://ai.google.dev/gemini-api/docs/available-regions) साथै वास्तविक जडान मार्ग जाँच गर्नुहोस्; यो त्रुटिले मात्र खराब API कुञ्जी पहिचान गर्दैन।

### जडान-विशेष प्रोक्सीलाई प्राथमिकता दिनुहोस्

प्रभावित मिथुन जडानको लागि OmniRoute को [प्रति-जडान प्रोक्सी कन्फिगरेसन](../ops/PROXY_GUIDE.md#4-level-proxy-system) प्रयोग गर्नुहोस्, त्यसपछि दोहोर्याउनुहोस्** परीक्षण जडान** र एउटै मोडेलको साथ एउटा सानो अनुरोध। यसले रूटिङ परिवर्तनलाई त्यो जडानमा स्कोप राख्छ। प्रमाणित गर्नुहोस् कि प्रोक्सी कन्टेनरबाट पहुँचयोग्य छ, र जडानले वास्तवमै यसलाई चयन गर्दछ। मार्ग परिवर्तन गर्नाले अपस्ट्रीम क्षेत्रीय योग्यताको ग्यारेन्टी गर्दैन।

### होस्ट र कन्टेनर नेटवर्किङ तुलना गर्नुहोस्

प्रमाणिकरण परिणामहरू तुलना गर्दा कुञ्जी, मोडेल र अनुरोध समान राख्नुहोस्; कुनै मुद्दामा प्रमाणहरू, प्रोक्सी पासवर्डहरू वा पूर्ण प्राधिकरण हेडरहरू कहिल्यै टाँस्नुहोस्। पहिले होस्टमा र कन्टेनर भित्र उही आदेश प्रयोग गरेर OS रिजोल्भरले कुन ठेगाना परिवारहरू प्रस्ताव गर्दछ भनेर निरीक्षण गर्नुहोस्:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

`omniroute` तपाईंले चलाउनुभएको सेवासँग बदल्नुहोस् (उदाहरणका लागि, `omniroute-web`)। यी आदेशहरूले प्रमाणहरू वा IP ठेगानाहरू बिना ठेगाना परिवारहरू छाप्छन्। फर्काइएको `6` IPv6 DNS परिणाम मात्र देखाउँछ: यसले गर्छ** होइन** प्रयोगयोग्य IPv6 मार्ग वा API पहुँच प्रमाणित गर्नुहोस्। जहाँ `curl` स्थापना गरिएको छ, दुबै वातावरणमा `curl -6 -I https://generativelanguage.googleapis.com` सँग `curl -4 -I https://generativelanguage.googleapis.com` तुलना गर्नुहोस्। एक HTTP प्रतिक्रियाले त्यो जाँचको लागि जडान प्रमाणित गर्दछ, यो एक अप्रमाणित त्रुटि भए पनि; केवल प्रमाणिकरण गरिएको मोडेल अनुरोधले मिथुन योग्यता परीक्षण गर्दछ।

### होस्ट-स्तर वैकल्पिक: काम गर्ने IPv6 र समाधानकर्ता नीति

[#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) को रिपोर्टरले कन्टेनर IPv6 सक्षम गरेर र glibc ठेगाना चयन परिवर्तन गरेर उनीहरूको वातावरणमा पहुँच पुनर्स्थापित गर्यो। यसलाई वातावरण-विशिष्ट विकल्पको रूपमा व्यवहार गर्नुहोस्। रिजोल्भर प्राथमिकताहरू समायोजन गर्नु अघि काम गर्ने होस्ट IPv6, कन्टेनर egress/routing र फायरवाल नियमहरू पुष्टि गर्नुहोस्। एक निजी ULA ठेगाना आफैले सार्वजनिक IPv6 जडान स्थापित गर्दैन।

कम्पोजको पूर्वनिर्धारित नेटवर्कमा पहिले नै संलग्न गरिएका सेवाहरूको लागि, यो टुक्राले त्यो नेटवर्कमा IPv6 सक्षम गर्दछ; तपाईंको बाँकी सेवा, पोर्ट, भोल्युम र कन्फिगरेसन कायम राख्नुहोस्:

```yaml
networks:
  default:
    enable_ipv6: true
```

नामित नेटवर्कको लागि, सेवा वास्तवमा सामेल हुने नेटवर्कमा सक्षम गर्नुहोस्। Docker ULA सबनेट आवंटित गर्न सक्छ; तपाईंको नेटवर्कलाई आवश्यक पर्दा मात्र स्पष्ट, गैर-ओभरल्यापिङ सबनेट चयन गर्नुहोस्। [Docker IPv6 नेटवर्किङ](https://docs.docker.com/engine/daemon/ipv6/) र [रचना नेटवर्क विकल्पहरू](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6) हेर्नुहोस्।

मा ए** glibc आधारित छवि** , `/etc/gai.conf` ठेगाना चयन परिवर्तन गर्न सक्छ। हालको भण्डार डकरफाइलले डेबियन प्रयोग गर्दछ; अनुकूलन musl-आधारित छविहरूले यो संयन्त्र साझा गर्दैनन्। रिपोर्ट गरिएको समायोजनले ULA लेबललाई `label fc00::/7 6` बाट `label fc00::/7 1` मा परिवर्तन गर्छ। छविको पूर्ण नीति तालिकाबाट सुरु गर्नुहोस् र यसको अन्य प्रविष्टिहरू सुरक्षित गर्नुहोस्: `label` वा `precedence` प्रविष्टि थप्दा त्यो पूर्वनिर्धारित तालिकालाई प्रतिस्थापन गर्दछ, त्यसैले परिवर्तन गरिएको रेखा मात्र समावेश भएको फाइल अपर्याप्त छ। [glibc कन्फिगरेसन सन्दर्भले](https://github.com/bminor/glibc/blob/master/posix/gai.conf) ती शब्दार्थहरू कागजात गर्दछ। `/etc/gai.conf` मा रिड-ओनली समीक्षा गरिएको फाइललाई बाइन्ड-माउन्ट गर्नुहोस् र यसलाई लागू गर्न सेवा पुन: सिर्जना गर्नुहोस्।

यसले OS ठेगाना चयनलाई परिवर्तन गर्छ** त्यो कन्टेनरमा सबै आउटबाउन्ड ट्राफिक** । यसले प्रत्येक अनुप्रयोगलाई IPv6 छनौट गर्न बाध्य पार्दैन: नोडको DNS अर्डर र जडान चयन पनि महत्त्वपूर्ण छ। विशेष गरी, `--dns-result-order=ipv4first` IPv4 प्राथमिकता दिन्छ र IPv4-only असफलताको लागि एक उपाय होइन। [नोड DNS अर्डर](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder) हेर्नुहोस्।

कुनै पनि होस्ट-स्तर परिवर्तन पछि जेमिनी र तपाईंका अन्य प्रदायकहरूको पुन: परीक्षण गर्नुहोस्। रोल ब्याक गर्न, अनुकूलन `gai.conf` माउन्ट हटाउनुहोस्, अघिल्लो नेटवर्क कन्फिगरेसन पुनर्स्थापना गर्नुहोस् र मर्मत सञ्झ्यालको समयमा प्रभावित service/network पुन: सिर्जना गर्नुहोस्। नेटवर्क पुन: सिर्जना गर्दा यसमा संलग्न अन्य कन्टेनरहरू अवरोध गर्न सक्छ; निरन्तर डाटा भोल्युम नमेट्नुहोस्।

## महत्त्वपूर्ण टिप्पणीहरू

- **SQLite WAL मोड:** OmniRoute ले नवीनतम परिवर्तनहरूलाई `storage.sqlite` मा पुनः चेकपोइन्ट गर्न सकोस् भनेर `docker stop` लाई पूरा हुन दिनुपर्छ। समावेश गरिएका Compose फाइलहरूले पहिले नै 40s को स्टप ग्रेस अवधि सेट गरेका छन्। यदि तपाईंले इमेजलाई सिधै चलाउनुहुन्छ भने, `--stop-timeout 40` कायम राख्नुहोस्।
- **`DISABLE_SQLITE_AUTO_BACKUP`:** नियमित/लेखन-पूर्व ब्याकअपहरू बाह्य रूपमा व्यवस्थापन गरिएका छन् भने यसलाई `true` मा सेट गर्नुहोस्। अवस्थित-डेटाबेस माइग्रेसनहरूका लागि अझै पनि तिनको आफ्नै टिकाउ सुरक्षा स्न्यापसट र सामूहिक-माइग्रेसन सुरक्षा संयन्त्र आवश्यक हुन्छ।
- **डेटा स्थायित्व:** कन्टेनर पुनः सुरु हुँदा पनि तपाईंको डेटाबेस, कुञ्जीहरू र कन्फिगरेसनहरू कायम राख्न सधैँ `/app/data` मा भोल्युम माउन्ट गर्नुहोस्।
- **पोर्ट कन्फिगरेसन:** पूर्वनिर्धारित `20128` पोर्ट परिवर्तन गर्न `PORT` वातावरण चरलाई ओभरराइड गर्नुहोस्।

## यो पनि हेर्नुहोस्

- [VM डिप्लोयमेन्ट गाइड](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare सेटअप
- [Fly.io डिप्लोयमेन्ट गाइड](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.io मा डिप्लोय गर्नुहोस्
- [वातावरण कन्फिगरेसन](../reference/ENVIRONMENT.md) — पूर्ण `.env` सन्दर्भ
