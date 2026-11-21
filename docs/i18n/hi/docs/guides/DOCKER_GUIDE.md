# 🐳 Docker Guide — OmniRoute (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> संपूर्ण Docker परिनियोजन संदर्भ। तुरंत शुरुआत करने के लिए, [README का Docker अनुभाग](../README.md#-docker) देखें।

## विषय-सूची

- [त्वरित संचालन](#quick-run)
- [परिवेश फ़ाइल के साथ](#with-environment-file)
- [Docker Compose](#docker-compose)
- [उपलब्ध प्रोफ़ाइल](#available-profiles)
- [जब OmniRoute Docker में चल रहा हो, तब होस्ट CLI टूल कॉन्फ़िगर करना](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis साइडकार](#redis-sidecar)
- [प्रोडक्शन Compose](#production-compose)
- [Dockerfile चरण](#dockerfile-stages)
- [महत्वपूर्ण परिवेश वेरिएबल](#critical-environment-variables)
- [Caddy (HTTPS) के साथ Docker Compose](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare क्विक टनल](#cloudflare-quick-tunnel)
- [इमेज टैग](#image-tags)
- [Docker में डैशबोर्ड अपडेट](#dashboard-updates-in-docker)
- [उपलब्धता: डिफ़ॉल्ट SQLite केवल एक रेप्लिका का समर्थन करता है](#availability-default-sqlite-is-single-replica)
- [Docker के भीतर Gemini की क्षेत्रीय त्रुटियाँ](#gemini-regional-errors-inside-docker)
- [महत्वपूर्ण टिप्पणियाँ](#important-notes)

---

## तेज़ भागना

> **एक आदेश में स्व-मेज़बान?** [सेल्फ-होस्ट गाइड](../getting-started/SELF_HOST_GUIDE.md) — `docker compose -f docker-compose.selfhost.yml up -d` देखें (प्रकाशित छवि + Redis, केवल लूपबैक, कोई प्रोफ़ाइल विकल्प नहीं)। नीचे दिया गया क्विक रन उन उपयोगकर्ताओं के लिए एकल-कंटेनर पथ है जो पहले से ही कहीं और Redis चला रहे हैं।

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## पर्यावरण फ़ाइल के साथ

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
# आधार प्रोफ़ाइल (कोई CLI टूल नहीं)
docker compose --profile base up -d

# CLI प्रोफ़ाइल (Claude Code, Codex, OpenClaw अंतर्निहित)
docker compose --profile cli up -d

# होस्ट प्रोफ़ाइल (मुख्यतः Linux के लिए; होस्ट CLI बाइनरी को केवल-पढ़ने योग्य रूप में माउंट करता है)
docker compose --profile host up -d

# वेब प्रोफ़ाइल (वेब-सत्र प्रदाताओं के लिए Chromium/Playwright)
docker compose --profile web up -d

# CLI + CLIProxyAPI साइडकार को संयोजित करें
docker compose --profile cli --profile cliproxyapi up -d
```

## उपलब्ध प्रोफ़ाइल

OmniRoute मुख्य परिनियोजन संरचनाओं के लिए Compose प्रोफ़ाइल के साथ आता है। अपने परिवेश से मेल खाने वाली प्रोफ़ाइल चुनें।

| प्रोफ़ाइल         | सेवा             | कब उपयोग करें                                                                                                                                          | कमांड                                        |
| ----------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `base` (डिफ़ॉल्ट) | `omniroute-base` | हेडलेस सर्वर / न्यूनतम रनटाइम, कोई प्रदाता CLI बंडल नहीं है                                                                                            | `docker compose --profile base up -d`        |
| `cli`             | `omniroute-cli`  | `omniroute providers/setup/doctor` और बंडल किए गए CLI (Codex, Claude Code, Droid, OpenClaw) को कॉल करने वाले एजेंटिक कार्यप्रवाह                       | `docker compose --profile cli up -d`         |
| `host`            | `omniroute-host` | वे Linux होस्ट जो `~/.local/bin`, `~/.codex`, `~/.claude` आदि को केवल-पढ़ने योग्य रूप में माउंट करके होस्ट CLI तक `network_mode` जैसा एक्सेस चाहते हैं | `docker compose --profile host up -d`        |
| `cliproxyapi`     | `cliproxyapi`    | अपस्ट्रीम CLI प्रॉक्सीइंग के लिए पोर्ट `8317` पर [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) साइडकार चलाएँ                             | `docker compose --profile cliproxyapi up -d` |
| `web`             | `omniroute-web`  | वेब-सत्र प्रदाता जिन्हें ब्राउज़र की आवश्यकता होती है: `gemini-web`, `claude-web`, `claude-turnstile` (`runner-web` बनाता है, Chromium शामिल है)       | `docker compose --profile web up -d`         |

> एकाधिक प्रोफ़ाइल संयोजित की जा सकती हैं: `docker compose --profile cli --profile cliproxyapi up -d`।

## Docker में OmniRoute चलने पर होस्ट CLI टूल्स को कॉन्फ़िगर करना

`omniroute setup-codex`, `setup-claude`, `config set <tool>` और डैशबोर्ड का
**कॉन्फ़िगरेशन सहेजें** बटन, सभी `~/.codex/*.config.toml` जैसी फ़ाइलों में लिखते हैं। इन पाथ का
अर्थ केवल उस मशीन पर होता है जहाँ CLI वास्तव में चलता है। इन्हें कंटेनर के अंदर
चलाने पर लेखन कंटेनर के अपने होम (`/home/node` —
इमेज `USER node` के रूप में चलती है) में होता है, जहाँ कोई होस्ट CLI इसे कभी नहीं पढ़ेगा और कंटेनर
दोबारा बनते ही यह हटा दिया जाता है।

OmniRoute इसका पता लगाता है और ऐसी सफलता रिपोर्ट करने के बजाय, जिसका आप उपयोग नहीं कर सकते,
निर्देशों के साथ लेखन से इनकार करता है: CLI `2` के साथ बाहर निकलता है और API `422`
के साथ `containerEphemeralTarget: true` लौटाता है।

### अनुशंसित: CLI को होस्ट पर और OmniRoute को Docker में चलाएँ

कंटेनर API उपलब्ध कराता है; CLI आपके होस्ट टूल्स को कॉन्फ़िगर करता है।

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI को कंटेनर की ओर इंगित करें
omniroute setup-codex                      # आपके होस्ट पर वास्तविक ~/.codex में लिखता है
```

जब Codex, Claude Code, Cursor या इसी तरह के टूल आपके
लैपटॉप पर चलते हैं, तो यह सही विकल्प है — और यही सामान्य सेटअप है।

### विकल्प: होस्ट कॉन्फ़िगरेशन डायरेक्टरियों को bind-mount करें (`host` प्रोफ़ाइल)

यदि आप चाहते हैं कि कंटेनर स्वयं आपके होस्ट कॉन्फ़िगरेशन में लिखे, तो
डायरेक्टरियों को माउंट करें और `CLI_CONFIG_HOME` को माउंट रूट पर इंगित करें। `host` प्रोफ़ाइल
यह पहले से करती है:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

bind mount ही पाथ को विश्वसनीय बनाता है: OmniRoute
`/proc/self/mountinfo` पढ़ता है और माउंट किए गए पाथ में (और उन डायरेक्टरियों में
जिनके चाइल्ड माउंट हैं, जो ऊपर दिए गए `/host-home` स्वरूप के बिल्कुल अनुरूप है) लिखने की अनुमति देता है, जबकि
अनमाउंट किए गए पाथ के लिए अभी भी इनकार करता है।

### वैकल्पिक उपाय: कंटेनर के अपने CLI कॉन्फ़िगर करें (संयम से उपयोग करें)

जब CLI वास्तव में कंटेनर के अंदर मौजूद हों (`cli` प्रोफ़ाइल), तो लेखन
जानबूझकर किया जाता है। किसी भी `setup-*` कमांड को `--allow-container-write` दें, या सर्वर के लिए
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` सेट करें। लेखन इस चेतावनी के साथ आगे बढ़ता है
कि यह कंटेनर के बाद बना नहीं रहेगा।

> **सुरक्षा चेतावनी — `cli` प्रोफ़ाइल + `docker.sock` माउंट।**
> `cli` प्रोफ़ाइल `/var/run/docker.sock` को bind-mount करती है, ताकि कंटेनर के अंदर का
> ऑटो-अपडेटर होस्ट डेमन से स्टैक को दोबारा बना सके
> (`src/lib/system/autoUpdate.ts` उस सॉकेट की जाँच करता है और उसके
> अनुपस्थित होने पर Docker पाथ को छोड़ देता है)। वह सॉकेट **होस्ट-root विश्वास
> सीमा** है: उस तक पहुँच सकने वाली कोई भी चीज़ होस्ट Docker डेमन को
> root के रूप में नियंत्रित करती है — वह होस्ट पर किसी भी कंटेनर को बना सकती है, उसका निरीक्षण कर सकती है, रोक सकती है और हटा सकती है।
> इसके निहितार्थ:
>
> 1. **`cli` प्रोफ़ाइल का पोर्ट कभी भी नेटवर्क पर एक्सपोज़ न करें।** इसे
>    `127.0.0.1` पर प्रकाशित करें (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — LAN से पहुँच योग्य `cli` प्रोफ़ाइल किसी भी डैशबोर्ड-स्तरीय RCE को
>    संपूर्ण होस्ट नियंत्रण में बदल देती है।
> 2. **`cli` प्रोफ़ाइल में कोई अतिरिक्त होस्ट डायरेक्टरी bind न करें।**
>    Docker सॉकेट के साथ कोई भी अतिरिक्त माउंट कंटेनर को आपके फ़ाइल सिस्टम और होस्ट कॉन्फ़िगरेशन पर पूर्ण
>    पढ़ने/लिखने की पहुँच देता है। यदि किसी टूल को कोई प्रोजेक्ट
>    देखना आवश्यक हो, तो उसे CLI बाइनरी के साथ स्थानीय रूप से चलाएँ — उसे
>    `cli` कंटेनर में माउंट न करें।
>
> यदि आपको कंटेनर के अंदर ऑटो-अपडेट की आवश्यकता नहीं है, तो `cli` प्रोफ़ाइल को बंद रखें
> (`COMPOSE_PROFILES=core,redis` या इससे छोटा)। अन्य प्रोफ़ाइल
> Docker सॉकेट को माउंट नहीं करती हैं।
>
> MITM से संबंधित खतरा मॉडल देखने के लिए `docs/security/MITM-TPROXY-DECRYPT.md` (git; `/docs` में संकलित नहीं) देखें,
> और `codex`/`claude-code`/`droid`/`openclaw` बाइनरी की उत्पत्ति शृंखला के लिए
> `docs/security/SUPPLY_CHAIN.md` देखें।

## Redis साइडकार

OmniRoute वितरित रेट लिमिटर और साझा कैश के लिए Redis पर निर्भर करता है। `redis` सेवा `docker-compose.yml` में **हमेशा परिभाषित** होती है (इस पर कोई प्रोफ़ाइल गेट नहीं है) और किसी भी अन्य प्रोफ़ाइल के साथ शुरू होती है।

| विवरण                 | मान                                      |
| --------------------- | ---------------------------------------- |
| इमेज                  | `redis:7-alpine`                         |
| कंटेनर का नाम         | `omniroute-redis`                        |
| आंतरिक पोर्ट          | `6379`                                   |
| होस्ट पोर्ट (ओवरराइड) | `REDIS_PORT` (डिफ़ॉल्ट `6379`)           |
| होस्ट बाइंड (ओवरराइड) | `REDIS_BIND_HOST` (डिफ़ॉल्ट `127.0.0.1`) |
| वॉल्यूम               | `omniroute-redis-data` → `/data`         |
| हेल्थचेक              | `redis-cli ping` (10s अंतराल)            |

संबंधित एनवायरनमेंट वेरिएबल:

- `REDIS_URL` — ऐप में इंजेक्ट की गई कनेक्शन स्ट्रिंग (डिफ़ॉल्ट रूप से `redis://redis:6379`)।
- `REDIS_PORT` — Redis कंटेनर के लिए होस्ट-साइड पोर्ट मैपिंग।
- `REDIS_BIND_HOST` — वह होस्ट इंटरफ़ेस जिस पर पोर्ट प्रकाशित किया जाता है। डिफ़ॉल्ट `127.0.0.1` है।

> **डिफ़ॉल्ट रूप से लूपबैक क्यों:** साइडकार `requirepass` के बिना चलता है, और ऐप
> कंटेनर कंपोज़ नेटवर्क (`redis:6379`) के माध्यम से उस तक पहुँचते हैं — प्रकाशित पोर्ट
> केवल होस्ट-साइड टूलिंग (`redis-cli`, एक स्थानीय `npm run dev`) के लिए है। इसे
> `0.0.0.0` पर प्रकाशित करने से बिना प्रमाणीकरण वाला Redis आपके LAN के प्रत्येक होस्ट के लिए उपलब्ध हो जाएगा। यदि आप
> `REDIS_BIND_HOST=0.0.0.0` सेट करते हैं, तो सेवा के `command:` में `--requirepass` भी जोड़ें।

**Redis को अक्षम करना** अनुशंसित नहीं है (रेट लिमिटर इन-मेमोरी फ़ॉलबैक का उपयोग करने लगेगा)। यदि ऐसा करना आवश्यक हो, तो `docker-compose.yml` में `redis:` सेवा ब्लॉक को हटाएँ/कमेंट करें या इसे शून्य तक स्केल करें:

```bash
docker compose up -d --scale redis=0
```

## प्रोडक्शन कंपोज़

डेवलपमेंट के साथ चलने वाले एक पृथक प्रोडक्शन स्नैपशॉट के लिए `docker-compose.prod.yml` का उपयोग करें।

| विवरण                   | मान                                                                                        |
| ----------------------- | ------------------------------------------------------------------------------------------ |
| फ़ाइल                   | `docker-compose.prod.yml`                                                                  |
| डिफ़ॉल्ट डैशबोर्ड पोर्ट | `PROD_DASHBOARD_PORT=20130` (आंतरिक `${DASHBOARD_PORT:-20128}` पर मैप किया गया)            |
| डिफ़ॉल्ट API पोर्ट      | `PROD_API_PORT=20131`                                                                      |
| इमेज                    | `omniroute:prod` (`runner-cli` टार्गेट से निर्मित)                                         |
| Redis कंटेनर            | `omniroute-redis-prod` (`redis:8.6.2`, समर्पित `redis-prod-data` वॉल्यूम)                  |
| डेटा वॉल्यूम            | `omniroute-prod-data` (नामित, रीबिल्ड के दौरान बना रहता है)                                |
| हेल्थचेक                | `node healthcheck.mjs` + `redis-cli ping`, जिसमें `depends_on` Redis की हेल्थ पर निर्भर है |

उपयोग करने का तरीका:

```bash
# प्रोडक्शन स्टैक बिल्ड और शुरू करें
docker compose -f docker-compose.prod.yml up -d --build

# लॉग स्ट्रीम करें
docker compose -f docker-compose.prod.yml logs -f

# बंद करें (वॉल्यूम बनाए रखें)
docker compose -f docker-compose.prod.yml down
```

प्रोडक्शन स्टैक डेवलपमेंट कंपोज़ के समानांतर चलता है (अलग कंटेनर नाम, पोर्ट और वॉल्यूम), इसलिए प्रोडक्शन को चालू रखते हुए आप स्थानीय रूप से बदलाव करना जारी रख सकते हैं।

## डॉकरफ़ाइल चरण

रिपॉजिटरी एक मल्टी-स्टेज डॉकरफाइल (`Dockerfile`) शिप करती है। चार चरण उजागर हैं; अपने उपयोग के मामले के लिए सही `target` चुनें।

| अवस्था        | आधार छवि              | उद्देश्य                                                                                                                                                                                                                                                                               |
| ------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | डिप्स (`npm ci --legacy-peer-deps`) स्थापित करता है और `npm run build` चलाता है (डिफ़ॉल्ट रूप सेTurbopack — नीचे बिल्ड-टाइम संसाधन देखें)                                                                                                                                              |
| `runner-base` | `node:26-trixie-slim` | Next.js स्टैंडअलोन आउटपुट के साथ उत्पादन रनटाइम।** कोई प्रदाता CLIs बंडल नहीं है।**                                                                                                                                                                                                    |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose` और वैश्विक CLIs जोड़ता है: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`।** एजेंटिक वर्कफ़्लोज़ के लिए इसे चुनें.**                                                                                                           |
| `runner-web`  | `runner-base`         | वेब-सत्र प्रदाताओं के लिए Playwright + एक क्रोमियम ब्राउज़र (`--with-deps`) जोड़ता है: `gemini-web`, `claude-web`, `claude-turnstile`।** जब आप उन प्रदाताओं का उपयोग करें तो इसे चुनें** — सादा छवि इसके बिना अनुरोध समय पर विफल हो जाती है (रिलीज़ चैनल के अंतर्गत `-web` नोट देखें)। |

मैन्युअल रूप से एक विशिष्ट लक्ष्य बनाएं:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### निर्माण-समय संसाधन

तीन बिल्ड आर्ग्स नियंत्रित करते हैं कि `builder` चरण की लागत क्या है। वे केवल बिल्ड-टाइम हैं — `OMNIROUTE_MEMORY_MB` (नीचे) एक अलग, रनटाइम नॉब है।

| तर्क बनाएँ                  | गलती करना | प्रभाव                                                                                   |
| --------------------------- | --------- | ---------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`       | `0` वेबपैक के साथ बनाता है: निचली चरम मेमोरी, धीमी। `1` Turbopack में शामिल हो जाता है।  |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`    | उत्पन्न `next build` के लिए V8 ढेर छत (`--max-old-space-size`)।                          |
| `OMNIROUTE_BUILD_WORKERS`   | `2`       | फ़ीड `CIRCLE_NODE_TOTAL`; अगला पेज-डेटा संग्रह के लिए `workers = N - 1` प्राप्त करता है। |

`OMNIROUTE_BUILD_WORKERS` एक बड़े बिल्डर पर सवाल उठाने वाला और एक विवश निर्माण के ख़त्म होने पर संदेह करने वाला व्यक्ति है** बाद** `✓ Compiled successfully`. प्रत्येक पृष्ठ-डेटा कार्यकर्ता की अपनी प्रक्रिया है, और मूल `next build` भी अपनी स्वयं की प्रक्रिया है; एक लाइव VPS पुनरुत्पादन (इश्यू #7518) ने प्रत्येक प्रक्रिया के शिखर RSS ~ 4.5 GB पर `NODE_OPTIONS` हीप ध्वज से स्वतंत्र मापा (Turbopack V8 हीप के बाहर native/Rust मेमोरी में संकलित होता है)। `2` का डिफ़ॉल्ट (→ 1 कार्यकर्ता, कुल 2 प्रक्रियाएं) 16 GB / 4 vCPU GitHub-होस्ट किए गए धावकों के लिए आकार में है जो प्रकाशन पाइपलाइन का उपयोग करता है। `8` (→ 7 वर्कर्स) पर उस रनर की मेमोरी खत्म हो गई और बिल्डकिट `ResourceExhausted: ... cannot allocate memory` के साथ चरण को विफल कर दिया; `3` (→ 2 कर्मचारी) प्रति-प्रक्रिया RSS अनुमानित करने के बजाय सीधे मापा जाने के बाद भी फिट नहीं हुआ। `tests/unit/docker-build-memory-budget.test.ts` मापे गए आंकड़े के विरुद्ध अंकगणित करता है और यदि कोई भी घुंडी धावक से आगे निकल जाती है तो विफल हो जाता है।

Turbopack मूल रस्ट मेमोरी में संकलित होता है जो जीवित रहती है** बाहर** V8 ढेर, इसलिए `OMNIROUTE_BUILD_MEMORY_MB` इसे बाध्य नहीं करता है। मेमोरी सीलिंग वाले होस्ट पर बिल्ड को OOM किलर द्वारा SIGKILLed है, जिसमें कोई त्रुटि टेक्स्ट नहीं होता है — यह बस `Creating an optimized production build` के बीच में रुक जाता है, जो आउट-ऑफ-मेमोरी के बजाय हैंग की तरह पढ़ता है। यही कारण है कि `Dockerfile` डिफ़ॉल्ट रूप से वेबपैक (`OMNIROUTE_USE_TURBOPACK=0`) पर आ जाता है, `npm run dev` / `npm run build` के विपरीत, जहां Turbopack कोड डिफ़ॉल्ट है: बिना किसी बिल्ड आर्ग्स (जो रेलवे और अन्य एक-क्लिक होस्ट चलाते हैं) के साथ एक नंगे `docker build .` मेमोरी-कैप्ड बिल्डर पर चुपचाप नहीं मरना चाहिए। प्रकाशित छवियां पहले से ही `docker-publish.yml` में स्पष्ट रूप से `OMNIROUTE_USE_TURBOPACK=0` पास करती हैं। बहुत सारे RAM वाले बिल्डर पर, तेज़ निर्माण के लिए Turbopack चुनें:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` सक्षम है, इसलिए `next build` एक पैरेंट चलाता है** और** एक कार्यकर्ता प्रक्रिया और प्रत्येक व्यक्ति `OMNIROUTE_BUILD_MEMORY_MB` को अलग से सम्मान देता है। ऊपर कंटेनर की छत का आकार उस मान से लगभग दोगुना करें, एक बार नहीं।

इस पेड़ पर मापा गया (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| बंडलर     | कंटेनर छत      | परिणाम                         |
| --------- | -------------- | ------------------------------ |
| Turbopack | 8 GiB / 16 GiB | ओओएम- दोनों को चुपचाप मार डाला |
| वेबपैक    | 8 GiB          | निर्माण कार्यकर्ता SIGKILLed   |
| वेबपैक    | 12 GiB         | सफल हुआ, 11.1 GiB पर पहुंच गया |

### रनटाइम डिफ़ॉल्ट

`runner-base` द्वारा निर्यात किए गए डिफ़ॉल्ट: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`।

Docker में मेमोरी व्यवहार:

- छवि `OMNIROUTE_MEMORY_MB=1024` सेट करती है और उससे `NODE_OPTIONS=--max-old-space-size=1024` प्राप्त करती है।
- वास्तविक सर्वर प्रक्रिया स्टैंडअलोन लॉन्चर द्वारा शुरू की जाती है, जो `OMNIROUTE_MEMORY_MB` पढ़ता है और `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` जोड़ता है।
- नोड अंतिम दोहराए गए `--max-old-space-size` मान का उपयोग करता है, इसलिए `OMNIROUTE_MEMORY_MB` सेटिंग प्रभावी Docker ढेर सीमा को नियंत्रित करती है।
- क्योंकि छवि हमेशा इसे सेट करती है, लॉन्चर का अपना रैम-कैलिब्रेटेड फ़ॉलबैक कभी भी Docker के अंतर्गत लागू नहीं होता है। कार्यभार के लिए इसे स्पष्ट रूप से बढ़ाएं (नीचे दी गई तालिका)। कोडिंग-एजेंट `/v1/responses` के लिए `2048` अभी भी बहुत छोटा है।

### कोडिंग एजेंटों के लिए रनटाइम RAM

1 GiB Docker डिफ़ॉल्ट एक dashboard/light-chat फ़्लोर है, उत्पादन आकार नहीं। लंबे `POST /v1/responses` निकाय (सैकड़ों संदेश, दसियों उपकरण) संपीड़न के दौरान कई इन-मेमोरी ग्राफ़ बनाए रखते हैं। दो ओवरलैपिंग ~ 3 MiB / ~ 750k-टोकन अनुरोधों ने V8 को निरस्त कर दिया है** 12 GiB** ओल्ड-स्पेस (`FATAL ERROR: Reached heap limit`) और 16 GiB cgroup OOM भी हिट किया। [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) देखें।

आकार** ढेर के ऊपर cgroup `--memory`** — देशी बफ़र्स, SQLite और संपीड़न मध्यवर्ती V8 के बाहर बैठते हैं।

| कार्यभार                            | `OMNIROUTE_MEMORY_MB`  | कंटेनर/सीग्रुप      | टिप्पणियाँ                                                                                    |
| ----------------------------------- | ---------------------- | ------------------- | --------------------------------------------------------------------------------------------- |
| डैशबोर्ड, एक हल्की बातचीत           | `1024` (छवि डिफ़ॉल्ट)  | ≥2 GiB              |                                                                                               |
| एक कोडिंग एजेंट (Claude/Codex/Grok) | `8192`                 | ≥10 GiB             | विशिष्ट एकल-सत्र `/v1/responses`                                                              |
| दो समवर्ती लंबे `/v1/responses`     | `10240`–`12288`        | ≥12–16 GiB          | ~ 12 GiB ढेर पर मापा गया V8 निरस्त                                                            |
| तीन + समवर्ती लंबे संदर्भ           | एक प्रक्रिया पर मत करो | क्रमबद्ध / अधिक RAM | डिफ़ॉल्ट हैवीवेट प्रवेश उड़ान में 1 है; RAM बिना इसे बढ़ाने से गर्भपात फिर से शुरू हो जाता है |

जब `OMNIROUTE_MEMORY_MB` होता है तो नंगे धातु पर `omniroute serve` ~RAM का 35% (क्लैम्प्ड `[512, 4096]`) कैलिब्रेट करता है** अनसेट** . Docker हमेशा `1024` सेट करता है, ताकि अंशांकन कभी भी आधिकारिक छवि में न चले।

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
```

## महत्वपूर्ण एनवायरनमेंट वेरिएबल

[ENVIRONMENT.md](../reference/ENVIRONMENT.md) में प्रलेखित डिफ़ॉल्ट के अतिरिक्त, Docker के अंतर्गत चलाते समय निम्नलिखित वेरिएबल सबसे महत्वपूर्ण हैं:

| वेरिएबल                       | उद्देश्य                                                                                                                                                                                                                                                                              | डिफ़ॉल्ट                      |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket ब्रिज के लिए साझा सीक्रेट। **प्रोडक्शन में आवश्यक** — इसे एक मज़बूत रैंडम स्ट्रिंग पर सेट करें।                                                                                                                                                                             | सेट नहीं (प्रदान करना आवश्यक) |
| `REDIS_URL`                   | रेट लिमिटर / कैश बैकएंड के लिए कनेक्शन स्ट्रिंग                                                                                                                                                                                                                                       | `redis://redis:6379`          |
| `REDIS_PORT`                  | बंडल किए गए Redis कंटेनर के लिए होस्ट-साइड पोर्ट                                                                                                                                                                                                                                      | `6379`                        |
| `REDIS_BIND_HOST`             | वह होस्ट इंटरफ़ेस जिस पर बंडल किया गया Redis पोर्ट प्रकाशित होता है (जब तक आप AUTH नहीं जोड़ते, लूपबैक)                                                                                                                                                                               | `127.0.0.1`                   |
| `AUTO_UPDATE_HOST_REPO_DIR`   | स्वयं-अपडेट वर्कफ़्लो के लिए `/workspace/omniroute` पर `cli` प्रोफ़ाइल में माउंट किया गया होस्ट पाथ                                                                                                                                                                                   | `.` (वर्तमान डायरेक्टरी)      |
| `OMNIROUTE_MEMORY_MB`         | Docker स्टैंडअलोन सर्वर के लिए रनटाइम Node हीप की अधिकतम सीमा; ऊपर दिए गए इमेज डिफ़ॉल्ट को ओवरराइड करती है। कोडिंग एजेंट: `8192`+ ([रनटाइम RAM](#runtime-ram-for-coding-agents) देखें)।                                                                                               | `1024`                        |
| `DASHBOARD_PORT` / `API_PORT` | डैशबोर्ड (20128) और API (20129) के लिए एक्सपोज़ किए गए पोर्ट को ओवरराइड करें                                                                                                                                                                                                          | `20128` / `20129`             |
| `APP_BIND_HOST`               | वह होस्ट इंटरफ़ेस जिस पर docker-compose डैशबोर्ड/API/live-WS पोर्ट प्रकाशित करता है। `REQUIRE_API_KEY=false` (डिफ़ॉल्ट) होने पर, `0.0.0.0` अनाम `/v1` प्रॉक्सी को LAN पर एक्सपोज़ करता है — इसका दायरा केवल `REQUIRE_API_KEY=true` के साथ या सामने रिवर्स प्रॉक्सी होने पर ही बढ़ाएँ। | `127.0.0.1`                   |
| `CLIPROXY_BIND_HOST`          | वह होस्ट इंटरफ़ेस जिस पर docker-compose `cliproxyapi` साइडकार प्रकाशित करता है — इसके डेटा वॉल्यूम में प्रोवाइडर क्रेडेंशियल संग्रहीत होते हैं।                                                                                                                                       | `127.0.0.1`                   |
| `OMNIROUTE_PLUGINS_DIR`       | वह डायरेक्टरी जिसे रनटाइम प्लगइन स्कैनर पढ़ता है और जिसमें इंस्टॉल करता है। प्लगइन बाइंड-माउंट होने पर इसे सेट करें: डिफ़ॉल्ट `HOME` का अनुसरण करता है, जिसे इमेज का एक्सपोर्ट करना आवश्यक नहीं है।                                                                                   | `~/.omniroute/plugins`        |
| `OMNIROUTE_BASE_PATH`         | ऐप को रिवर्स प्रॉक्सी के पीछे प्रकाशित करने पर URL सबपाथ (उदा. `/omniroute`)                                                                                                                                                                                                          | _(खाली = रूट)_                |
| `NEXT_PUBLIC_BASE_URL`        | सबपाथ सहित सार्वजनिक ब्राउज़र ओरिजिन (उदा. `https://host/omniroute`)                                                                                                                                                                                                                  | सेट नहीं                      |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml` के लिए होस्ट-साइड डैशबोर्ड पोर्ट                                                                                                                                                                                                                            | `20130`                       |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` साइडकार के लिए होस्ट-साइड पोर्ट                                                                                                                                                                                                                                         | `8317`                        |

## उपपथ पर रिवर्स प्रॉक्सी (ट्रैफ़िक / nginx)

Next.js `basePath` स्टैंडअलोन बंडल में संकलित किया गया है। OmniRoute ऐप रूट पर एक सेंटिनल फ़ाइल में बेक किए गए मान को रिकॉर्ड करता है ( `npm run build` के दौरान लिखा जाता है; `scripts/docker/ensure-docker-base-path.mjs` द्वारा पढ़ा जाता है) और कंटेनर शुरू होने पर इसकी तुलना `OMNIROUTE_BASE_PATH` से करता है। जब वे भिन्न होते हैं और छवि डोमेन रूट के लिए बनाई गई थी, तो एंट्रीपॉइंट स्टैंडअलोन मैनिफ़ेस्ट, एम्बेडेड `basePath`/`assetPrefix` शाब्दिक (अगले 16 अकेले `assetPrefix` से SSR संपत्ति URLs प्रस्तुत करता है, पैचर इसमें उपपथ को प्रतिबिंबित करता — ), बेक्ड `/_next/static` संपत्ति URLs (क्लाइंट-रेफरेंस मैनिफ़ेस्ट, मीडिया आयात, पूर्व-रेंडर त्रुटि पृष्ठ) और क्लाइंट `node dev/run-standalone.mjs` चलने से पहले `process.env` शिम।

### रचना लिखें (अनुशंसित)

दोनों वेरिएबल्स को `.env` में सेट करें, फिर पुनर्निर्माण करें ताकि छवि और रनटाइम सहमत हों:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` `OMNIROUTE_BASE_PATH` Docker बिल्ड-आर्ग और रनटाइम पर्यावरण चर के रूप में अग्रेषित करता है।

### पूर्व-निर्मित रूट छवि + रनटाइम उपपथ

प्रकाशित `cheaperinference/omniroute:*` छवियाँ डोमेन रूट के लिए बनाई गई हैं। आप अभी भी रनटाइम पर `OMNIROUTE_BASE_PATH` सेट कर सकते हैं; कंटेनर स्टार्टअप पर एक बार बंडल को पैच करता है। इसे मेल खाते सार्वजनिक मूल के साथ जोड़ें:

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

अग्रेषित करने के लिए रिवर्स प्रॉक्सी को कॉन्फ़िगर करें** भरा हुआ** बाहरी पथ (उपसर्ग को न हटाएँ). ट्रैफ़िक को `PathPrefix(`/omniroute `)` `StripPrefix` बिना कंटेनर में रूट करना चाहिए, ताकि Next.js `/omniroute/...` प्राप्त करे और `/omniroute/_next/...` से संपत्ति प्रदान करे।

Docker हेल्थचेक सक्रिय `OMNIROUTE_BASE_PATH` के साथ पहले से जुड़े हल्के वजन वाले `/healthz` जीवनचक्र समापन बिंदु की जांच करता है। `/api/monitoring/health` human/dashboard डायग्नोस्टिक्स के लिए उपलब्ध रहता है; कंटेनर HEALTHCHECK वापस इंगित करने के लिए (उदाहरण के लिए गहन स्वास्थ्य प्रवर्तन के लिए), `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` सेट करें। वह रास्ता एक है** गहरा** जाँचें (DB + मॉनिटरिंग सारांश) — Docker के दुर्लभ `HEALTHCHECK` के लिए उपयुक्त है यदि आप वापस चुनते हैं, लेकिन** नहीं** कुबेरनेट्स `livenessProbe` अंतराल के लिए।

ऑर्केस्ट्रेटर्स के लिए (कुबेरनेट्स, नोमैड, आदि):

| जांच           | पसंद करना                                                           | टालना                                            |
| -------------- | ------------------------------------------------------------------- | ------------------------------------------------ |
| जीवंतता        | मुख्य पोर्ट पर HTTP `GET /livez`, या TCP (`PORT`, डिफ़ॉल्ट `20128`) | `/api/monitoring/health` सजीवता के रूप में       |
| तत्परता        | HTTP `GET /healthz`                                                 | तंग टाइमआउट जो इवेंट-लूप व्यस्त को मृत मानते हैं |
| डीप/ब्लैकबॉक्स | `/api/monitoring/health`                                            | —                                                |

`/healthz` रिपोर्ट प्रक्रिया जीवनचक्र (`ok` / `starting` / `stopping`)। `/livez` केवल प्रक्रिया-जीवित है (200 जब भी हैंडलर चल सकता है; यह तत्परता की प्रतीक्षा नहीं करता है)। दोनों अभी भी अनुरोध प्रबंधन के रूप में एक ही नोड इवेंट लूप पर चलते हैं, इसलिए सीपीयू-बाउंड कैटलॉग या संपीड़न कार्य उन्हें — व्यस्त ≠ मृत में देरी कर सकता है। यदि HTTP जांच का समय समाप्त हो जाए तो TCP जीवंतता को प्राथमिकता दें। पूर्ण जांच मार्गदर्शन: [निगरानी गाइड — Kubernetes जांच अनुशंसाएँ](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ।

## Docker कैडी के साथ लिखें (HTTPS ऑटो-टीएलएस)

कैडी के स्वचालित SSL प्रावधान का उपयोग करकेOmniRoute सुरक्षित रूप से उजागर किया जा सकता है। सुनिश्चित करें कि आपके डोमेन का DNS A रिकॉर्ड आपके सर्वर के IP को इंगित करता है।

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

कैडी अपस्ट्रीम कंटेनर के लिए मानक अग्रेषण हेडर सेट करता है। OmniRoute OAuth कॉलबैक और जेनरेट किए गए सार्वजनिक लिंक के लिए विहित सार्वजनिक मूल के रूप में `NEXT_PUBLIC_BASE_URL` उपयोग करता है; प्रमाणित डैशबोर्ड लेखन समान-मूल अनुरोधों के साथ-साथ सत्र-बाध्य CSRF सुरक्षा का उपयोग करता है। केवल उन्नत परिनियोजन के लिए `OMNIROUTE_TRUST_PROXY` सक्षम करें जहां आप जानबूझकर चाहते हैं कि OmniRoute स्पष्ट कॉन्फ़िगरेशन के बजाय विश्वसनीय अग्रेषित हेडर से सार्वजनिक उत्पत्ति प्राप्त करे।

## Cloudflare Quick Tunnel

Docker डिप्लॉयमेंट के लिए डैशबोर्ड समर्थन में `Dashboard → Endpoints` पर एक-क्लिक वाला **Cloudflare Quick Tunnel** शामिल है। पहली बार सक्षम करने पर यह केवल आवश्यकता पड़ने पर `cloudflared` डाउनलोड करता है, आपके मौजूदा `/v1` एंडपॉइंट के लिए एक अस्थायी टनल शुरू करता है और जनरेट किया गया `https://*.trycloudflare.com/v1` URL आपके सामान्य सार्वजनिक URL के ठीक नीचे दिखाता है।

सक्रिय टनल की स्थिति बदले बिना एंडपॉइंट टनल पैनल (Cloudflare, Tailscale, ngrok) को `Settings → Appearance` से दिखाया या छिपाया जा सकता है।

### टनल संबंधी टिप्पणियाँ

- Quick Tunnel URL अस्थायी होते हैं और प्रत्येक रीस्टार्ट के बाद बदल जाते हैं।
- OmniRoute या कंटेनर रीस्टार्ट होने के बाद Quick Tunnel स्वचालित रूप से पुनर्स्थापित नहीं होते। आवश्यकता होने पर उन्हें डैशबोर्ड से फिर से सक्षम करें।
- प्रबंधित इंस्टॉलेशन वर्तमान में `x64` / `arm64` पर Linux, macOS और Windows का समर्थन करता है।
- सीमित कंटेनर परिवेशों में शोरपूर्ण QUIC UDP बफ़र चेतावनियों से बचने के लिए प्रबंधित Quick Tunnel डिफ़ॉल्ट रूप से HTTP/2 ट्रांसपोर्ट का उपयोग करते हैं। यदि आप कोई अन्य ट्रांसपोर्ट चाहते हैं, तो `CLOUDFLARED_PROTOCOL=quic` या `auto` सेट करें।
- Docker इमेज में सिस्टम CA रूट शामिल होते हैं और उन्हें प्रबंधित `cloudflared` को दिया जाता है, जिससे कंटेनर के अंदर टनल बूटस्ट्रैप होने पर TLS विश्वास विफलताओं से बचा जाता है।
- यदि आप चाहते हैं कि OmniRoute किसी फ़ाइल को डाउनलोड करने के बजाय मौजूदा बाइनरी का उपयोग करे, तो `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` सेट करें।

## छवि टैग

| छवि                          | टैग      | आकार      | विवरण                                              |
| ---------------------------- | -------- | --------- | -------------------------------------------------- |
| `cheaperinference/omniroute` | `latest` | ~ 250एमबी | उच्चतम** प्रकाशित** स्थिर SemVer (git `main` नहीं) |
| `cheaperinference/omniroute` | `3.8.54` | ~ 250एमबी | GitOps के लिए टैग के इस वर्ग को पिन करें           |

समान छवियों को समान प्रति-आर्किटेक्चर डाइजेस्ट के साथ तीन रिपॉजिटरी में प्रकाशित किया जाता है: `cheaperinference/omniroute` (Docker हब, सस्ता अनुमान संगठन, 3.8.53 से), `ghcr.io/cheaper-inference/omniroute` और विरासत `diegosouzapw/omniroute`, जो अपना पुल इतिहास रखता है और अभी भी हर रिलीज प्राप्त करता है। मौजूदा `diegosouzapw/omniroute` परिनियोजन अद्यतन होते रहते हैं; छवि का नाम बदलना वैकल्पिक है. नीचे दिया गया `:next` / `:next-web` प्री-रिलीज़ चैनल केवल `diegosouzapw/omniroute` और GHCR पर प्रकाशित किया गया है।

मल्टी-प्लेटफ़ॉर्म मेनिफेस्ट: `linux/amd64` + `linux/arm64` नेटिव (Apple सिलिकॉन, AWS Graviton, Raspberry Pi)। Docker स्वचालित रूप से मेल खाने वाले आर्किटेक्चर का चयन करता है; यदि आपको ARM होस्ट पर AMD64 अनुकरण को बाध्य करने की आवश्यकता है तो `--platform linux/amd64` पास करें।

### चैनल जारी करें

OmniRoute स्थिर रिलीज़, सक्रिय रिलीज़-ब्रांच परीक्षण और विकास बिल्ड के लिए अलग Docker चैनल प्रकाशित करता है।

| चैनल                            | स्रोत                              | अस्थिरता                      | अनुशंसित उपयोग                                                                                                                |
| ------------------------------- | ---------------------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Signed/versioned रिलीज़            | अडिग                          | उत्पादन परिनियोजन जो सटीक रिलीज़ को पिन करते हैं                                                                              |
| `:latest` / `:latest-web`       | उच्चतम** प्रकाशित** स्थिर SemVer   | परिवर्तनशील स्थिर सूचक        | स्थिर रिलीज़ का अनुसरण करता है** बाद** एक SemVer प्रकाशन कार्य — करता है** नहीं** ट्रैक `main` या अप्रकाशित `release/v*` कमिट |
| `:next` / `:next-web`           | वर्तमान डिफ़ॉल्ट `release/v*` शाखा | परिवर्तनशील पूर्व-रिलीज़ सूचक | परीक्षण सुधार जो सक्रिय रिलीज़ शाखा पर आ गए हैं लेकिन अभी तक स्थिर रिलीज़ में नहीं हैं                                        |
| `:main` / `:main-web`           | `main` शाखा                        | परिवर्तनशील विकास सूचक        | केवल विकास और एकीकरण परीक्षण                                                                                                  |

#### वेब-सत्र प्रदाता: `-web` छवियाँ

उपरोक्त प्रत्येक चैनल एक `-web` टैग (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`) के रूप में दोगुना हो जाता है, जो `runner-web` चरण — से समान छवि प्लस Playwright और एक क्रोमियम ब्राउज़र से निर्मित होता है। सादा छवि जहाज** बिना** क्रोमियम; `gemini-web`, `claude-web` और `claude-turnstile` इसकी आवश्यकता है।

विफलता को स्थगित किया जाता है, स्टार्टअप-समय को नहीं: वे प्रदाता अपने मॉडलों को सूचीबद्ध करते हैं और डैशबोर्ड में कनेक्टेड के रूप में दिखाते हैं, और केवल पहला अनुरोध विफल होता है

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

यदि आप उन प्रदाताओं का उपयोग करते हैं, तो उस चैनल का `-web` टैग हटा दें जो आप पहले से ही — पर हैं, अन्यथा कुछ भी नहीं बदलता है। एक npm/CLI इंस्टॉल (कोई Docker छवि नहीं) पर, समतुल्य गायब टुकड़ा ब्राउज़र बाइनरी है: होस्ट पर `npx playwright install chromium` चलाएं।

#### प्री-रिलीज़ चैनल का उपयोग करना

`next` चैनल को वर्तमान डिफ़ॉल्ट `release/v*` शाखा में प्रत्येक पुश पर फिर से बनाया जाता है और AMD64 और ARM64 दोनों के लिए प्रकाशित किया जाता है। पुरानी रखरखाव शाखाएँ इसे अधिलेखित नहीं कर सकतीं। चैनल उन सुधारों के लिए एक खींचने योग्य छवि प्रदान करता है जो अगले स्थिर टैग के कटने से पहले सक्रिय रिलीज़ शाखा में विलय हो गए हैं।

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker कंपोज़ के लिए, चयनित प्रोफ़ाइल द्वारा उपयोग किए गए छवि टैग को ओवरराइड करें, फिर सेवा को खींचें और पुनः बनाएं:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### सुरक्षा और रोलबैक

`next` एक फ्लोटिंग प्री-रिलीज़ चैनल है। यह सक्रिय रिलीज शाखा पर किसी भी धक्का पर बदल सकता है और है** उत्पादन उपयोग के लिए समर्थित नहीं है** . किसी विशिष्ट बिल्ड का मूल्यांकन करते समय इमेज डाइजेस्ट को पिन करें:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

परीक्षण से पहले, OmniRoute डेटा वॉल्यूम या बाइंड-माउंटेड डेटा निर्देशिका का बैकअप लें। वापस रोल करने के लिए, पहले उपयोग किए गए स्थिर संस्करण को पुनर्स्थापित करें या कंटेनर को डाइजेस्ट और पुनः बनाएं:

```bash
docker pull cheaperinference/omniroute:<stable-version>
docker compose up -d
```

एक रिलीज़-ब्रांच बिल्ड कभी भी `latest` स्थानांतरित नहीं कर सकता; केवल एक योग्य स्थिर सिमेंटिक संस्करण ही स्थिर सूचक को बढ़ावा दे सकता है। `next` छवियां रिलीज़ छवि निरीक्षण को बनाए रखती हैं और क्रिटिकल-भेद्यता गेट को अवरुद्ध करती हैं।

**`latest` git के लिए मुद्रा गारंटी नहीं है।** `main` या सक्रिय `release/v*` शाखा पर मर्ज किए गए फ़िक्सेस हैं** नहीं** `:latest` में जब तक एक स्थिर SemVer छवि प्रकाशित नहीं हो जाती और प्रकाशन कार्य `:latest` को बढ़ावा नहीं देता (उस SemVer के समान डाइजेस्ट)। यदि `latest` जमे हुए दिखता है जबकि GitHub पहले से ही फिक्स दिखाता है, तो रिलीज शाखा का परीक्षण करने के लिए `:next` खींचें या SemVer टैग की प्रतीक्षा करें।

| आप चाहते हैं                                                                        | उपयोग                          |
| ----------------------------------------------------------------------------------- | ------------------------------ |
| GitOps / उत्पादन जो बहाव नहीं होना चाहिए                                            | पिन `:X.Y.Z` (या छवि डाइजेस्ट) |
| प्रकाशित अस्तबलों का अनुसरण करें और प्रत्येक रिलीज़ पर एक पुनः निर्माण स्वीकार करें | `:latest`                      |
| परीक्षण अप्रकाशित `release/v*` प्रतिबद्ध है                                         | `:next` (उत्पादन नहीं)         |
| परीक्षण `main`                                                                      | `:main` (उत्पादन नहीं)         |

## Docker में डैशबोर्ड अपडेट

प्रकाशित इमेज वाला कंटेनर स्वयं को प्रतिस्थापित नहीं कर सकता। जब OmniRoute यह पता लगाता है कि वह किसी कंटेनर के भीतर चल रहा है (`.git` चेकआउट नहीं है और npm इंस्टॉल नहीं है), तो होम डैशबोर्ड का अपडेट बैनर npm/git निर्देशों के बजाय चलाने हेतु होस्ट कमांड दिखाता है, साथ ही एक कॉपी बटन भी देता है:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

सेवा का नाम `AUTO_UPDATE_SERVICE` से आता है (डिफ़ॉल्ट `omniroute`, जो `docker-compose.selfhost.yml` में सेवा है)। `pull` केवल फ़्लोटिंग टैग (`latest`, `next`) को आगे बढ़ाता है; पिन किए गए `:X.Y.Z` टैग के लिए पहले टैग संपादित करें।

### होस्ट ट्रिगर फ़ाइल के साथ एक-क्लिक अपडेट

`/var/run/docker.sock` माउंट किए बिना **अभी अपडेट करें** को काम करते रहने देने के लिए (जो कंटेनर को होस्ट पर रूट एक्सेस देता है—ऊपर दी गई `cli` प्रोफ़ाइल चेतावनी देखें), OmniRoute सेवा पर `DOCKER_UPDATE_TRIGGER_FILE` सेट करें और होस्ट पर एक वॉचर चलाएँ:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

पथ `DATA_DIR` के भीतर होना चाहिए (सापेक्ष मान उसके सापेक्ष रिज़ॉल्व होते हैं); अन्य सभी पथ अस्वीकार कर दिए जाते हैं। इसके बाद **अभी अपडेट करें** उस फ़ाइल में `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` लिखता है, `202` से उत्तर देता है, और डैशबोर्ड नई रिलीज़ के लाइव होने तक `/api/system/version` को पोल करता है तथा फिर रीलोड होता है। इस मोड में OmniRoute कभी कोई शेल या Docker कमांड नहीं चलाता। प्रत्येक अपडेट कार्रवाई की तरह, अनुरोध केवल लूपबैक/LAN क्लाइंट से ही स्वीकार किया जाता है।

बाइंड-माउंट की गई डेटा डायरेक्टरी होस्ट को निगरानी के लिए एक स्थिर पथ देती है। नमूना `systemd` यूनिट (अपने compose फ़ाइल और `data/` वाली डायरेक्टरी के अनुसार `/srv/omniroute` समायोजित करें):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=OmniRoute डैशबोर्ड अपडेट अनुरोधों की निगरानी करें

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=OmniRoute कंटेनर को पुल करें और पुनः बनाएँ

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

सेवा पुल करने से पहले अनुरोध हटा देती है, ताकि विफल रन लूप न करे। `DOCKER_UPDATE_TRIGGER_FILE` के बिना डैशबोर्ड मैन्युअल कमांड प्रवाह बनाए रखता है।

## उपलब्धता: डिफ़ॉल्ट SQLite एकल-प्रतिकृति है

स्टॉक Docker / Kubernetes OmniRoute है** एक नोड प्रक्रिया + एक SQLite लेखक** . उच्च उपलब्धता है** समर्थित नहीं** उस टोपोलॉजी पर.

| बाधा                                            | परिणाम                                                                                                                                                                                                                                                                                                  |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| एकल लेखक                                        | करना** नहीं** एक ही SQLite फ़ाइल के विरुद्ध एकाधिक प्रतिकृतियाँ चलाएँ। वह DB को भ्रष्ट कर देता है।                                                                                                                                                                                                      |
| पुनः बनाएँ / पुनः आरंभ करें / HEALTHCHECK मारें | **पूर्ण आउटेज** इन-फ़्लाइट SSE, डैशबोर्ड सत्र और इन-मेमोरी स्थिति। प्रत्येक कनेक्टेड क्लाइंट ड्रॉप हो जाता है। खाली-एंडपॉइंट विंडो के दौरान नए अनुरोधों को रिवर्स-प्रॉक्सी मिलती है**`502 Bad Gateway: Unknown error`** , OmniRoute JSON नहीं - ग्राहक इसे प्रदाता विफलता (#11015) से अलग नहीं कर सकते। |
| `/healthz` के समान ही इवेंट लूप                 | एक व्यस्त कैटलॉग या कम्प्रेशन टिक जांच में देरी कर सकता है; एक छोटा टाइमआउट फिर पुनः प्रारंभ होता है** केवल** प्रतिकृति                                                                                                                                                                                 |

**जांच मैट्रिक्स** ( [कुबेरनेट्स जांच अनुशंसाएँ](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) भी देखें):

| जांच      | लक्ष्य                                                   | उपयोग नहीं करो                                   |
| --------- | -------------------------------------------------------- | ------------------------------------------------ |
| जीवंतता   | TCP `PORT` पर (डिफ़ॉल्ट `20128`), या नरम HTTP `/healthz` | `/api/monitoring/health`                         |
| तत्परता   | HTTP `GET /healthz`                                      | तंग टाइमआउट जो इवेंट-लूप व्यस्त को मृत मानते हैं |
| गहरा/मानव | `/api/monitoring/health`                                 | स्वचालित क्यूबलेट जीवंतता                        |

**उन्नयन:** उम्मीद है कि हर सत्र में गिरावट आएगी। यदि आप कर सकते हैं तो ग्राहकों को हटा दें; डिफ़ॉल्ट SQLite पर कोई रोलिंग अपडेट नहीं है। कंपोज़ `restart: unless-stopped` प्लस Docker `HEALTHCHECK` कंटेनर के अस्वस्थ होने पर एकमात्र प्रक्रिया को भी बदल देगा - समान ब्लास्ट त्रिज्या।

तैयार मैनिफ़ेस्ट और एक हेल्म चार्ट `deploy/kubernetes/` और `deploy/helm/omniroute/` में रहते हैं - [कुबेरनेट्स परिनियोजन मार्गदर्शिका](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md) देखें।

ए के लिए कुबेरनेट्स स्निपेट** एकल प्रतिकृति** (पुनः बनाना आवश्यक है; एक SQLite फ़ाइल के विरुद्ध `replicas` न बढ़ाएं):

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

`preStop` स्लीप क्यूब को सेवा समापनबिंदु को SIGTERM से पहले छोड़ने देता है** नया** मरने की प्रक्रिया को प्रभावित करने वाला यातायात रुक जाता है। इन-फ़्लाइट `/v1/responses` SSE हेवीवेट प्रवेश पट्टों (#11015) के माध्यम से `SHUTDOWN_TIMEOUT_MS` (डिफ़ॉल्ट 30s) तक सूखा दिया जाता है। नए अनुरोध जो अभी भी प्रक्रिया तक पहुंचते हैं उन्हें `503` + `Retry-After: 5` मिलता है। जब तक प्रतिस्थापन तैयार नहीं हो जाता, तब तक रीक्रिएट खाली-एंडपॉइंट गैप एक कठिन आउटेज बना रहता है - यह SQLite टोपोलॉजी है, जांच मिसकॉन्फिग नहीं।

बाहरी Postgres /बहु-लेखक HA है** नहीं** एक प्रलेखित स्टॉक पथ. यदि आपको HA की आवश्यकता है, तो एक एकल प्रतिकृति रखें या एक टोपोलॉजी चलाएं जिसे परियोजना ने अलग से परीक्षण और दस्तावेजित किया है। Postgres/MySQL कार्य [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) में रहता है। जब तक कि जहाज, गुणा करने का एकमात्र समर्थित तरीका नहीं है** बड़ा** `/v1/responses` क्षमता N स्वतंत्र प्रक्रियाएँ (अगला भाग) है, एक वॉल्यूम पर `replicas > 1` नहीं।

## स्केल-आउट: एन स्वतंत्र प्रक्रियाएं

### Codex टोकन रोटेशन स्वामित्व

एक Codex खाते की प्रतियों को स्वतंत्र रूप से इसके एकल-उपयोग ताज़ा टोकन का उपभोग नहीं करना चाहिए। ऐसे उदाहरणों पर जो केवल सिंक्रनाइज़ क्रेडेंशियल्स का उपभोग करते हैं, `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (उर्फ `cx`) सेट करें। इसे एकल रोटेशन स्वामी पर अनसेट छोड़ दें। प्रत्येक प्रक्रिया को अभी भी अपने स्वयं के `DATA_DIR` की आवश्यकता है; यह विकल्प न तो SQLite साझा करता है और न ही टोकन सिंक्रनाइज़ेशन या वितरित लॉक की आपूर्ति करता है।

जब रिफ्रेश की आवश्यकता होती है तो निष्क्रिय उदाहरण कनेक्शन को दोबारा पढ़ता है और केवल एक अलग, असमाप्त एक्सेस टोकन को अपनाता है। अन्यथा कनेक्शन समाप्त होने या निष्क्रिय किए बिना या रिफ्रेश-ब्रेकर विफलता की गणना किए बिना रिफ्रेश अक्षम कर दिया जाता है। वास्तविक अपस्ट्रीम प्रमाणीकरण विफलताएँ अभी भी सामान्य विफलता लेखांकन, घातीय कूलडाउन और सामान्य क्लाइंट त्रुटि का उपयोग करती हैं; खाता निष्क्रियकरण स्थायी रहता है. एक्सेस टोकन समाप्त होने से पहले मालिक के घुमाए गए टोकन को सिंक्रोनाइज़ करें (डिफ़ॉल्ट प्रोएक्टिव रिफ्रेश लीड पांच मिनट है), या Codex ऑथ फ़ाइल को फिर से आयात करें। निष्क्रिय आयात आपूर्ति किए गए टोकन को टोकन समापन बिंदु पर सत्यापित किए बिना संग्रहीत करते हैं। मैनुअल dashboard/API ताज़ा रिटर्न `409 refresh_disabled`; नए OAuth लॉगिन अपरिवर्तित हैं। [पर्यावरण संदर्भ](../reference/ENVIRONMENT.md#passive-codex-token-refresh) देखें.

One Node process is **one V8 heap**. Two overlapping ~3 MiB / ~750k-token coding-agent `POST /v1/responses` (RTK + Caveman) abort that heap at ~12 Gi (`FATAL ERROR: Reached heap limit`) and can OOM a 16 Gi cgroup. See [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). That measurement is a **memory-budget** warning, not a product hard-max of two concurrent long `/v1/responses`. Heavyweight chat admission is gated by an auto-derived ingest byte budget (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) sized from that same V8/cgroup ceiling — overriding it upward (or setting the legacy `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` request-count cap) on an already-sized process reintroduces the abort. Small chats, `/healthz`, `/v1/models`, and MCP are **not** in that cap.

### एक-प्रक्रिया: दो से अधिक लंबी `/v1/responses`

ए** स्वस्थ** प्रक्रिया ( `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` के नीचे ढेर, डिफ़ॉल्ट `0.75`)** मई** जब प्रक्रिया-व्यापी इनफ़्लाइट-बाइट बजट (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) में अभी भी जगह हो तो दो से अधिक समवर्ती लंबे `POST /v1/responses` चलाएँ। `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (डिफ़ॉल्ट 256 KiB) पर या उससे ऊपर के निकाय संरचना-भारी अनुरोधों के समान हेवीवेट लीज़ लेते हैं और उसी [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` एस्केप (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) का उपयोग करते हैं। दसियों समवर्ती लंबे SSE क्लाइंट (ऑपरेटरों को अक्सर 40-50 की आवश्यकता होती है) एक है** स्मृति-बजट** प्रश्न — आकार ढेर + primary/headroom स्लॉट + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — कोई कठिन "अधिकतम 2" उत्पाद सीमा नहीं है। एक दबावयुक्त ढेर अभी भी पुनः प्रयास योग्य `503` के साथ बहाया जाता है इसलिए #7849 वापस नहीं आता है।

को** ढेरों को गुणा करो** (स्वतंत्र V8 पुराने-स्थान)** आज** :

| करना                                                                                                                           | ऐसा न करें                                              |
| ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------- |
| दौड़ना** एन containers/pods** , प्रत्येक इसके साथ** अपना** `DATA_DIR` / वॉल्यूम                                                | एक SQLite फ़ाइल के विरुद्ध `replicas > 1` सेट करें      |
| आकार भारी इन-फ़्लाइट + स्वस्थ-हेडरूम ढेर से / इनफ़्लाइट-बाइट बजट; 1-2 रूढ़िवादी #7849 डिफ़ॉल्ट है, कोई कठोर उत्पाद अधिकतम नहीं | एक प्रक्रिया 8 × RAM और एक अनबाउंड काउंट कैप दें        |
| वैकल्पिक: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` के लिए** साझा कोटा काउंटर**                                     | Redis साझा SQLite — के रूप में मानें, यह नहीं है        |
| प्रत्येक उदाहरण में डुप्लिकेट प्रदाता रहस्य (या विभाजित डैशबोर्ड स्वीकार करें)                                                 | सभी उदाहरणों में एक डैशबोर्ड/एक कॉल-लॉग की अपेक्षा करें |
| किसी भी लोड बैलेंसर के साथ सामने; API कुंजी या सत्र द्वारा चिपचिपा पर्याप्त है                                                 | विक्रेता-विशिष्ट आकार-जागरूक मिडलवेयर की आवश्यकता है    |

सत्र-से-खाता संबंध को Redis के माध्यम से भी साझा किया जा सकता है: प्रत्येक प्रक्रिया पर `OMNIROUTE_SESSION_AFFINITY_STORE=redis` और `REDIS_URL` सेट करें, समान `REDIS_KEY_PREFIX` और एक सकारात्मक `sessionAffinityTtlMs` सेटिंग के साथ। पिन प्रत्येक प्रक्रिया के योग्य स्थानीय कनेक्शन के लिए हैश किए गए उपयोग-खाता पहचान को हल करते हैं, इसलिए मिलान पहचान मेटाडेटा वाले OAuth खातों में मिलान कनेक्शन IDs की आवश्यकता नहीं होती है। पिन रिज़ॉल्यूशन और संरक्षित निष्कासन में विरोधाभासी स्थानीय IDs पर ज्ञात खाता पहचान को प्राथमिकता दी जाती है; बिना पहचान के रिकॉर्ड (या बिना पहचान के बेदखल करने वाले) विरासत ID गार्ड को बनाए रखते हैं। स्थिर उपयोग पहचान के बिना खातों को अभी भी IDs मिलान की आवश्यकता है। Redis त्रुटियाँ या 100 एमएस से अधिक कॉल वापस स्थानीय SQLite पर आ जाती हैं। प्रत्येक Redis एफ़िनिटी स्टोर बकाया संचालन को 8 पर सीमित करता है, पूर्ण होने पर तुरंत Redis बायपास करता है, और स्लॉट केवल तभी जारी करता है जब अंतर्निहित कार्य व्यवस्थित हो जाता है, कॉलर की समय सीमा पर नहीं। Redis आउटेज के दौरान कोई साझा सच्चाई नहीं होती है: प्रत्येक उदाहरण अपनी स्थानीय संबद्धता पर वापस आ जाता है, सत्र प्रति उदाहरण एक बार फिर से पिन हो सकता है, और उदाहरण अलग हो सकते हैं। चिपचिपापन ठीक होने पर Redis के माध्यम से पुनः एकत्रित हो जाता है। टाइमआउट सीमा प्रतीक्षा कर रही है, भेजा गया EVAL नहीं, जो फ़ॉलबैक के बाद लैंड हो सकता है। रूटिंग लेखन रूटिंग निर्णय द्वारा देखे गए सटीक मूल्य की तुलना करता है, न कि ताज़ा उत्परिवर्तन-समय पर पढ़े गए मूल्य की तुलना करता है; एक देखी गई चूक या एक SQLite फ़ॉलबैक अवलोकन की तुलना एक अनुपस्थित Redis कुंजी के रूप में की जाती है। अप्रचलित पिनों को एक CAS में बदल दिया जाता है, इसलिए देर से आने वाला कमांड किसी नए, भिन्न पिन को प्रतिस्थापित या हटा नहीं सकता है। Redis पढ़ता है परमाणु रूप से मूल्य लौटाता है और शेष सर्वर TTL; सकारात्मक PTTL (या कोई समाप्ति नहीं) सजीवता निर्धारित करता है, लेखक का JSON टाइमस्टैम्प या पाठक की घड़ी नहीं। स्थानीय स्नैपशॉट उस शेष TTL को स्थानीय समय सीमा तक मैप करते हैं; मौजूदा JSON कुंजियाँ पढ़ने योग्य रहती हैं और उनके कच्चे बाइट्स CAS के लिए बनाए रखे जाते हैं। Redis सत्य का एकमात्र स्रोत है जबकि यह उत्तर देता है। पुष्टि किए गए साझा अप्सर्ट, टच और डिलीट स्थानीय प्रविष्टि को हटा देते हैं, इसे कभी भी इंस्टॉल या रीफ्रेश नहीं करते हैं। Redis पथ पर SQLite, Redis त्रुटियों, टाइमआउट या प्रवेश संतृप्ति से केवल इस उदाहरण के स्वयं के फ़ॉलबैक निर्णयों को रखता है, पहले की तरह TTL-बाउंडेड। बाद में आउटेज पर एक गुम स्थानीय पिन की कीमत एक ताजा पिक (एक प्रॉम्प्ट-कैश मिस) होती है, न कि किसी गलत या बेदखल खाते की। अस्वीकृत अप्सर्ट साझा विजेता और उसके शेष TTL परमाणु रूप से लौटाते हैं: सामान्य चयन मैप की गई स्थानीय समय सीमा को दोबारा जांचता है और एक अभी भी जीवित पात्र विजेता का उपयोग करता है, किसी अन्य साझा लेखन के बिना उस खाते के लिए उपयोग और लॉगिंग को छूता है। यदि यह अनुपलब्ध है, तो चयन स्थानीय उम्मीदवार को रखता है, साझा पिन को अपरिवर्तित छोड़ देता है और एक डिबग संदेश उत्सर्जित करता है। अस्वीकृत CAS SQLite नहीं लिखता है; Redis त्रुटियाँ, टाइमआउट या प्रवेश संतृप्ति इसके बजाय मौजूदा स्थानीय ऑपरेशन को लागू करते हैं। यदि भेजे गए उत्परिवर्तन का उत्तर टाइमआउट (स्वीकृत, अस्वीकृत या त्रुटि) के बाद आता है, तो एक तुल्यकालिक सटीक क्रमबद्ध-मूल्य तुलना-और-हटाएं केवल बाइट-समान टाइमआउट फ़ॉलबैक पंक्ति को हटा देता है। उस तुलना और विलोपन के बीच कोई प्रतीक्षा नहीं है; एक नया आउटेज राइट संरक्षित है। संरक्षित निष्कासन विफल खाते के स्वयं के स्थानीय पिन को Redis डाउन के साथ भी हटा देता है, और पुष्टि किए गए साझा निष्कासन के बाद इसे फिर से साफ कर देता है। पहले से साझा किए गए उत्तर लंबित होने से निकाले गए स्थानीय पिन को पुनर्स्थापित नहीं किया जा सकता क्योंकि साझा सफलताएं कभी भी SQLite नहीं लिखती हैं। बाद में आउटेज फ़ॉलबैक किसी खाते को दोबारा पिन कर सकता है; बाद में स्वीकृत साझा लेखन केवल Redis में मौजूद है। Redis चूकें स्थानीय फ़ॉलबैक स्थिति से परामर्श नहीं करतीं। ड्राइवर के बंद होने पर, नए चयनित पिन पुराने चार-फ़ील्ड SQLite JSON आकार को बनाए रखते हैं; केवल Redis रूटिंग हैशेड खाता पहचान जोड़ता है। प्रीफ़ेच किए गए पिनों को उनकी समाप्ति सीमा पर दोबारा जांचा जाता है। Redis गैर-लीज चयन स्टोर को फिर से पढ़ता है, लेकिन सिंक्रोनस लीज प्लानिंग अभी भी प्रीफ़ेच और प्लानिंग (एक स्वीकृत सर्वोत्तम-प्रयास विंडो) के बीच निकाले गए पिन का उपयोग कर सकती है। एक पट्टा प्रतिबद्धता एक टिकाऊ दावे के बाद खातों को स्विच नहीं कर सकती है: अस्वीकृत अप्सर्ट पर यह केवल उस अनुरोध के लिए दावा किए गए उम्मीदवार को रखता है और साझा विजेता को अछूता छोड़ देता है, इसलिए सभी उदाहरणों में समझौता उस पथ पर सीमित है। तालिका का शेष भाग अभी भी लागू होता है: यह कॉम्बो सत्र चिपचिपाहट, मूल Codex टर्न पिन, खाता सेमाफोर, लॉकआउट, खर्च सीमा, कॉन्फ़िगरेशन या कॉल लॉग साझा नहीं करता है।

हार्डवेयर: प्रति-उदाहरण समवर्ती लंबा `/v1/responses` एक है** स्मृति-बजट** प्रश्न (हीप + इनफ्लाइट-बाइट / #10110)। `N` स्वतंत्र `DATA_DIR` s अभी भी ढेर बढ़ाता है: होस्ट RAM `N × cgroup` कवर करना होगा, न कि "N = 8 के साथ एक 16 Gi पॉड।" कभी भी एक SQLite फ़ाइल पर `replicas > 1` ।

स्केच लिखें (दो ढेर, दो खंड — नहीं `deploy.replicas: 2`):

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

इन-प्रोसेस घनत्व ( HTTP आइसोलेट से संपीड़न) [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023) है। साझा टिकाऊ स्थिति पर एक तार्किक क्लस्टर [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) है।

## Docker के अंदर Gemini की क्षेत्रीय त्रुटियाँ

Google AI Studio / Gemini API, FAILED_PRECONDITION के साथ HTTP 400 और
`User location is not supported for the API use.` लौटा सकता है। होस्ट पर सफल अनुरोध
यह सिद्ध नहीं करता कि कंटेनर उसी आउटबाउंड रूट का उपयोग करता है। DNS क्रम,
IPv4/IPv6 कनेक्टिविटी, VPN रूटिंग और कॉन्फ़िगर किए गए प्रॉक्सी अलग हो सकते हैं।
[Google के समर्थित क्षेत्र](https://ai.google.dev/gemini-api/docs/available-regions)
और वास्तविक कनेक्शन रूट—दोनों की जाँच करें; केवल यह त्रुटि किसी खराब API कुंजी की पहचान नहीं करती।

### कनेक्शन-विशिष्ट प्रॉक्सी को प्राथमिकता दें

प्रभावित Gemini कनेक्शन के लिए OmniRoute के
[प्रति-कनेक्शन प्रॉक्सी कॉन्फ़िगरेशन](../ops/PROXY_GUIDE.md#4-level-proxy-system)
का उपयोग करें, फिर उसी मॉडल के साथ **Test Connection** और एक छोटे अनुरोध को दोहराएँ।
इससे रूटिंग परिवर्तन केवल उसी कनेक्शन तक सीमित रहता है। सत्यापित करें कि प्रॉक्सी
कंटेनर से पहुँच योग्य है और कनेक्शन वास्तव में उसी का चयन करता है। रूट बदलने से
अपस्ट्रीम क्षेत्रीय पात्रता की गारंटी नहीं मिलती।

### होस्ट और कंटेनर नेटवर्किंग की तुलना करें

प्रमाणीकृत परिणामों की तुलना करते समय कुंजी, मॉडल और अनुरोध एक-समान रखें; किसी
इश्यू में क्रेडेंशियल, प्रॉक्सी पासवर्ड या पूर्ण ऑथराइज़ेशन हेडर कभी पेस्ट न करें।
सबसे पहले जाँचें कि OS रिज़ॉल्वर किन एड्रेस फ़ैमिली की पेशकश करता है। इसके लिए होस्ट
और कंटेनर के अंदर समान कमांड का उपयोग करें:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

`omniroute` को आपके द्वारा चलाए जाने वाले सर्विस से बदलें (उदाहरण के लिए,
`omniroute-web`)। ये कमांड क्रेडेंशियल या IP एड्रेस के बिना एड्रेस फ़ैमिली प्रिंट
करते हैं। लौटाया गया `6` केवल IPv6 DNS परिणाम दिखाता है: यह उपयोग योग्य IPv6 रूट
या API एक्सेस को **सिद्ध नहीं** करता। जहाँ `curl` इंस्टॉल है, वहाँ दोनों परिवेशों में
`curl -4 -I https://generativelanguage.googleapis.com` की तुलना
`curl -6 -I https://generativelanguage.googleapis.com` से करें। HTTP प्रतिक्रिया उस
प्रोब के लिए कनेक्टिविटी सिद्ध करती है, भले ही वह कोई अप्रमाणीकृत त्रुटि हो; केवल
प्रमाणीकृत मॉडल अनुरोध ही Gemini पात्रता की जाँच करता है।

### होस्ट-स्तरीय विकल्प: कार्यरत IPv6 और रिज़ॉल्वर नीति

[#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) के रिपोर्टर ने अपने
परिवेश में कंटेनर IPv6 सक्षम करके और glibc एड्रेस चयन बदलकर एक्सेस पुनर्स्थापित किया।
इसे परिवेश-विशिष्ट विकल्प मानें। रिज़ॉल्वर प्राथमिकताएँ समायोजित करने से पहले कार्यरत
होस्ट IPv6, कंटेनर इग्रेस/रूटिंग और फ़ायरवॉल नियमों की पुष्टि करें। केवल एक निजी ULA
एड्रेस सार्वजनिक IPv6 कनेक्टिविटी स्थापित नहीं करता।

Compose के डिफ़ॉल्ट नेटवर्क से पहले से जुड़े सर्विस के लिए, यह फ़्रैगमेंट उस नेटवर्क
पर IPv6 सक्षम करता है; अपने सर्विस, पोर्ट, वॉल्यूम और कॉन्फ़िगरेशन के शेष भाग को बनाए रखें:

```yaml
networks:
  default:
    enable_ipv6: true
```

नामित नेटवर्क के लिए, इसे उसी नेटवर्क पर सक्षम करें जिससे सर्विस वास्तव में जुड़ता है।
Docker एक ULA सबनेट आवंटित कर सकता है; स्पष्ट, गैर-अतिव्यापी सबनेट केवल तभी चुनें जब
आपके नेटवर्क को इसकी आवश्यकता हो। [Docker IPv6 नेटवर्किंग](https://docs.docker.com/engine/daemon/ipv6/)
और [Compose नेटवर्क विकल्प](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6)
देखें।

**glibc-आधारित इमेज** पर, `/etc/gai.conf` एड्रेस चयन बदल सकता है। वर्तमान
रिपॉज़िटरी Dockerfile Debian का उपयोग करता है; कस्टम musl-आधारित इमेज इस तंत्र का
उपयोग नहीं करते। रिपोर्ट किया गया समायोजन ULA लेबल को `label fc00::/7 6` से
`label fc00::/7 1` में बदलता है। इमेज की पूर्ण नीति तालिका से शुरुआत करें और उसकी
अन्य प्रविष्टियों को बनाए रखें: कोई `label` या `precedence` प्रविष्टि जोड़ने पर वह
डिफ़ॉल्ट तालिका बदल जाती है, इसलिए केवल बदली हुई पंक्ति वाली फ़ाइल पर्याप्त नहीं है।
[glibc कॉन्फ़िगरेशन संदर्भ](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
इन अर्थ-विधियों का दस्तावेज़ीकरण करता है। समीक्षा की गई फ़ाइल को केवल-पढ़ने योग्य
रूप में `/etc/gai.conf` पर बाइंड-माउंट करें और इसे लागू करने के लिए सर्विस को पुनः बनाएँ।

यह **उस कंटेनर के सभी आउटबाउंड ट्रैफ़िक** के लिए OS एड्रेस चयन बदलता है।
यह प्रत्येक एप्लिकेशन को IPv6 चुनने के लिए बाध्य नहीं करता: Node का DNS क्रम और
कनेक्शन चयन भी मायने रखते हैं। विशेष रूप से, `--dns-result-order=ipv4first` IPv4 को
प्राथमिकता देता है और केवल-IPv4 विफलता का समाधान नहीं है।
[Node DNS क्रम](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder) देखें।

किसी भी होस्ट-स्तरीय परिवर्तन के बाद Gemini और अपने अन्य प्रोवाइडर की दोबारा जाँच
करें। रोल बैक करने के लिए, कस्टम `gai.conf` माउंट हटाएँ, पिछला नेटवर्क कॉन्फ़िगरेशन
पुनर्स्थापित करें और रखरखाव अवधि के दौरान प्रभावित सर्विस/नेटवर्क को पुनः बनाएँ।
नेटवर्क को पुनः बनाने से उससे जुड़े अन्य कंटेनर बाधित हो सकते हैं; स्थायी डेटा वॉल्यूम
को न हटाएँ।

## महत्वपूर्ण नोट्स

- **SQLite WAL मोड:** `docker stop` को पूरा होने देना चाहिए, ताकि OmniRoute नवीनतम परिवर्तनों को वापस `storage.sqlite` में चेकपॉइंट कर सके। शामिल की गई Compose फ़ाइलों में पहले से ही 40s की स्टॉप ग्रेस अवधि सेट है। यदि आप इमेज को सीधे चलाते हैं, तो `--stop-timeout 40` बनाए रखें।
- **`DISABLE_SQLITE_AUTO_BACKUP`:** यदि नियमित/लिखने-से-पहले के बैकअप बाहरी रूप से प्रबंधित किए जाते हैं, तो इसे `true` पर सेट करें। मौजूदा डेटाबेस के माइग्रेशन के लिए अब भी उनका अपना टिकाऊ सुरक्षा स्नैपशॉट और सामूहिक माइग्रेशन सुरक्षा आवश्यक है।
- **डेटा स्थायित्व:** कंटेनर रीस्टार्ट के दौरान अपने डेटाबेस, कुंजियों और कॉन्फ़िगरेशन को बनाए रखने के लिए हमेशा `/app/data` पर एक वॉल्यूम माउंट करें।
- **पोर्ट कॉन्फ़िगरेशन:** डिफ़ॉल्ट `20128` पोर्ट बदलने के लिए `PORT` एनवायरनमेंट वेरिएबल को ओवरराइड करें।

## यह भी देखें

- [VM डिप्लॉयमेंट गाइड](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare सेटअप
- [Fly.io डिप्लॉयमेंट गाइड](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.io पर डिप्लॉय करें
- [एनवायरनमेंट कॉन्फ़िगरेशन](../reference/ENVIRONMENT.md) — संपूर्ण `.env` संदर्भ
