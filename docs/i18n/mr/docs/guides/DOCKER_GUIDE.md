# 🐳 Docker Guide — OmniRoute (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Docker उपयोजनाचा संपूर्ण संदर्भ. जलद प्रारंभासाठी, [README मधील Docker विभाग](../README.md#-docker) पहा.

## अनुक्रमणिका

- [त्वरित चालवा](#quick-run)
- [पर्यावरण फाइलसह](#with-environment-file)
- [Docker Compose](#docker-compose)
- [उपलब्ध प्रोफाइल्स](#available-profiles)
- [OmniRoute Docker मध्ये चालत असताना होस्ट CLI साधने कॉन्फिगर करणे](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis साइडकार](#redis-sidecar)
- [उत्पादनासाठी Compose](#production-compose)
- [Dockerfile टप्पे](#dockerfile-stages)
- [महत्त्वाचे पर्यावरण चल](#critical-environment-variables)
- [Caddy (HTTPS) सह Docker Compose](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [इमेज टॅग्स](#image-tags)
- [Docker मधील डॅशबोर्ड अद्यतने](#dashboard-updates-in-docker)
- [उपलब्धता: डीफॉल्ट SQLite एकल-प्रतिकृती आहे](#availability-default-sqlite-is-single-replica)
- [Docker मधील Gemini प्रादेशिक त्रुटी](#gemini-regional-errors-inside-docker)
- [महत्त्वाच्या नोंदी](#important-notes)

---

## त्वरित चालवा

> **एका कमांडद्वारे स्वयं-होस्ट करायचे आहे?**
> [स्वयं-होस्ट मार्गदर्शक](../getting-started/SELF_HOST_GUIDE.md) पहा —
> `docker compose -f docker-compose.selfhost.yml up -d` (प्रकाशित इमेज +
> Redis, केवळ लूपबॅक, प्रोफाइल निवड नाही). खालील त्वरित चालवण्याची पद्धत ही
> आधीपासून Redis इतरत्र चालवत असलेल्या वापरकर्त्यांसाठी एकल-कंटेनर मार्ग आहे.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## पर्यावरण फाइलसह

```bash
# प्रथम .env कॉपी करून संपादित करा
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
# मूलभूत प्रोफाइल (CLI साधने नाहीत)
docker compose --profile base up -d

# CLI प्रोफाइल (Claude Code, Codex, OpenClaw अंगभूत)
docker compose --profile cli up -d

# होस्ट प्रोफाइल (प्रामुख्याने Linux साठी; होस्ट CLI बायनरी केवळ-वाचनीय स्वरूपात माउंट करते)
docker compose --profile host up -d

# वेब प्रोफाइल (वेब-सत्र प्रदात्यांसाठी Chromium/Playwright)
docker compose --profile web up -d

# CLI + CLIProxyAPI साइडकार एकत्र करा
docker compose --profile cli --profile cliproxyapi up -d
```

## उपलब्ध प्रोफाइल्स

OmniRoute मध्ये प्रमुख उपयोजन प्रकारांसाठी Compose प्रोफाइल्स समाविष्ट आहेत. तुमच्या पर्यावरणाशी जुळणारे प्रोफाइल निवडा.

| प्रोफाइल         | सेवा             | कधी वापरावे                                                                                                                                       | कमांड                                        |
| ---------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (डीफॉल्ट) | `omniroute-base` | हेडलेस सर्व्हर / किमान रनटाइम, कोणतेही प्रदाता CLI सोबत समाविष्ट नाहीत                                                                            | `docker compose --profile base up -d`        |
| `cli`            | `omniroute-cli`  | `omniroute providers/setup/doctor` आणि सोबत समाविष्ट CLI (Codex, Claude Code, Droid, OpenClaw) वापरणारे एजंटिक कार्यप्रवाह                        | `docker compose --profile cli up -d`         |
| `host`           | `omniroute-host` | `~/.local/bin`, `~/.codex`, `~/.claude` इत्यादी केवळ-वाचनीय स्वरूपात माउंट करून होस्ट CLI मध्ये `network_mode`-सदृश प्रवेश हवा असलेले Linux होस्ट | `docker compose --profile host up -d`        |
| `cliproxyapi`    | `cliproxyapi`    | अपस्ट्रीम CLI प्रॉक्सीकरणासाठी पोर्ट `8317` वर [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) साइडकार चालवा                          | `docker compose --profile cliproxyapi up -d` |
| `web`            | `omniroute-web`  | ब्राउझर आवश्यक असलेले वेब-सत्र प्रदाते: `gemini-web`, `claude-web`, `claude-turnstile` (`runner-web` बिल्ड करते, Chromium समाविष्ट)               | `docker compose --profile web up -d`         |

> एकाधिक प्रोफाइल्स एकत्र वापरता येतात: `docker compose --profile cli --profile cliproxyapi up -d`.

## OmniRoute Docker मध्ये चालत असताना होस्ट CLI साधने कॉन्फिगर करणे

`omniroute setup-codex`, `setup-claude`, `config set <tool>` आणि डॅशबोर्डचे
**कॉन्फिग जतन करा** बटण हे सर्व `~/.codex/*.config.toml` सारख्या फाइल्स लिहितात. त्या पाथना
फक्त CLI प्रत्यक्षात ज्या मशीनवर चालते तिथेच अर्थ असतो. त्या कंटेनरच्या आत
चालवल्यास, लेखन कंटेनरच्या स्वतःच्या होममध्ये (`/home/node` —
इमेज `USER node` म्हणून चालते) होते, जिथून कोणताही होस्ट CLI ते कधीही वाचणार नाही आणि कंटेनर
पुन्हा तयार केल्याच्या क्षणी ते हटवले जाते.

OmniRoute हे ओळखते आणि तुम्हाला वापरता न येणारे यश नोंदवण्याऐवजी
सूचनांसह लेखनास नकार देते: CLI `2` सह बंद होते आणि API
`containerEphemeralTarget: true` सह `422` प्रतिसाद देते.

### शिफारस केलेली पद्धत: CLI होस्टवर आणि OmniRoute Docker मध्ये चालवा

कंटेनर API उपलब्ध करून देतो; CLI तुमची होस्ट साधने कॉन्फिगर करतो.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI ला कंटेनरकडे निर्देशित करा
omniroute setup-codex                      # तुमच्या होस्टवरील वास्तविक ~/.codex मध्ये लिहिते
```

Codex, Claude Code, Cursor किंवा तत्सम साधने तुमच्या
लॅपटॉपवर चालत असतील तेव्हा हा योग्य पर्याय आहे — आणि हीच नेहमीची मांडणी असते.

### पर्याय: होस्ट कॉन्फिग डिरेक्टरी bind-mount करा (`host` प्रोफाइल)

कंटेनरनेच तुमचे होस्ट कॉन्फिग लिहावे असे तुम्हाला वाटत असल्यास,
डिरेक्टरी माउंट करा आणि `CLI_CONFIG_HOME` ला माउंट रूटकडे निर्देशित करा. `host` प्रोफाइल
हे आधीच करते:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

bind mount मुळेच पाथ विश्वासार्ह बनतो: OmniRoute
`/proc/self/mountinfo` वाचते आणि माउंट केलेल्या पाथवर (तसेच ज्यांच्या
चाइल्ड डिरेक्टरी माउंट आहेत अशा डिरेक्टरींवर, जी वरील `/host-home` ची नेमकी रचना आहे) लेखनास अनुमती देते, तसेच
माउंट न केलेल्या पाथना नकार देणे सुरू ठेवते.

### पर्यायी मार्ग: कंटेनरचे स्वतःचे CLI कॉन्फिगर करा (मर्यादितपणे वापरा)

CLI खरोखरच कंटेनरमध्ये असतील (`cli` प्रोफाइल), तर लेखन
हेतुपुरस्सर असते. कोणत्याही `setup-*` कमांडला `--allow-container-write` द्या किंवा
सर्व्हरसाठी `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` सेट करा. कंटेनर हटवल्यानंतर
लेखन टिकणार नाही, अशा इशाऱ्यासह ते पुढे सुरू राहते.

> **सुरक्षा इशारा — `cli` प्रोफाइल + `docker.sock` माउंट.**
> कंटेनरमधील auto-updater ला होस्ट daemon वरून stack पुन्हा तयार करता यावा म्हणून
> `cli` प्रोफाइल `/var/run/docker.sock` bind-mount करते
> (`src/lib/system/autoUpdate.ts` त्या socket चा शोध घेते आणि तो
> अनुपस्थित असल्यास Docker पाथ वगळते). तो socket ही **host-root विश्वासाची
> सीमा** आहे: त्यापर्यंत पोहोचू शकणारी कोणतीही गोष्ट root म्हणून होस्ट Docker daemon
> नियंत्रित करते — ती होस्टवरील कोणताही कंटेनर तयार करू, तपासू, थांबवू आणि काढून टाकू शकते.
> याचे परिणाम:
>
> 1. **`cli` प्रोफाइलचा पोर्ट नेटवर्कवर कधीही उघडा करू नका.** तो
>    `127.0.0.1` वर प्रकाशित करा (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — LAN वरून उपलब्ध असलेले `cli` प्रोफाइल कोणत्याही dashboard-स्तरीय RCE चे
>    संपूर्ण होस्ट ताब्यात घेण्यात रूपांतर करते.
> 2. **`cli` प्रोफाइलमध्ये कोणत्याही अतिरिक्त होस्ट डिरेक्टरी bind करू नका.**
>    Docker socket सोबत आणखी कोणतेही माउंट असल्यास कंटेनरला तुमच्या
>    फाइलसिस्टम आणि होस्ट कॉन्फिगवर पूर्ण read/write प्रवेश मिळतो. एखाद्या साधनाला
>    प्रकल्प पाहण्याची आवश्यकता असल्यास, ते CLI binary सह स्थानिकरीत्या चालवा — ते
>    `cli` कंटेनरमध्ये माउंट करू नका.
>
> तुम्हाला कंटेनरमधील auto-update ची आवश्यकता नसल्यास, `cli` प्रोफाइल बंदच ठेवा
> (`COMPOSE_PROFILES=core,redis` किंवा त्यापेक्षा लहान). इतर प्रोफाइल
> Docker socket माउंट करत नाहीत.
>
> MITM संबंधित धोका मॉडेलसाठी `docs/security/MITM-TPROXY-DECRYPT.md` (git; `/docs` मध्ये संकलित केलेले नाही) पहा
> आणि `codex`/`claude-code`/`droid`/`openclaw` binary उगम-साखळीसाठी
> `docs/security/SUPPLY_CHAIN.md` पहा.

## Redis साइडकार

OmniRoute वितरित दर-मर्यादक आणि सामायिक कॅशेसाठी Redis वर अवलंबून आहे. `redis` सेवा `docker-compose.yml` मध्ये **नेहमी परिभाषित केलेली असते** (तिच्यावर कोणतेही प्रोफाइल गेट नाही) आणि ती इतर कोणत्याही प्रोफाइलसोबत सुरू होते.

| तपशील                   | मूल्य                                   |
| ----------------------- | --------------------------------------- |
| इमेज                    | `redis:7-alpine`                        |
| कंटेनरचे नाव            | `omniroute-redis`                       |
| अंतर्गत पोर्ट           | `6379`                                  |
| होस्ट पोर्ट (ओव्हरराइड) | `REDIS_PORT` (डीफॉल्ट `6379`)           |
| होस्ट बाइंड (ओव्हरराइड) | `REDIS_BIND_HOST` (डीफॉल्ट `127.0.0.1`) |
| व्हॉल्यूम               | `omniroute-redis-data` → `/data`        |
| आरोग्य तपासणी           | `redis-cli ping` (10s अंतराने)          |

संबंधित पर्यावरणीय चल:

- `REDIS_URL` — अॅपमध्ये अंतःक्षेपित केलेली कनेक्शन स्ट्रिंग (डीफॉल्टनुसार `redis://redis:6379`).
- `REDIS_PORT` — Redis कंटेनरसाठी होस्ट-बाजूचे पोर्ट मॅपिंग.
- `REDIS_BIND_HOST` — पोर्ट ज्या होस्ट इंटरफेसवर प्रकाशित केला जातो तो इंटरफेस. डीफॉल्ट `127.0.0.1`.

> **डीफॉल्टनुसार लूपबॅक का वापरला जातो:** साइडकार `requirepass` शिवाय चालतो आणि अॅप
> कंटेनर कंपोज नेटवर्कवरून (`redis:6379`) त्याच्याशी जोडले जातात — प्रकाशित पोर्ट
> केवळ होस्ट-बाजूच्या साधनांसाठी (`redis-cli`, स्थानिक `npm run dev`) उपलब्ध आहे.
> `0.0.0.0` वर प्रकाशित केल्यास प्रमाणीकरण नसलेला Redis तुमच्या LAN वरील प्रत्येक
> होस्टसमोर उघड होईल. तुम्ही `REDIS_BIND_HOST=0.0.0.0` सेट केल्यास, सेवा `command:`
> मध्ये `--requirepass` देखील जोडा.

**Redis अक्षम करण्याची** शिफारस केली जात नाही (दर-मर्यादक इन-मेमरी फॉलबॅकवर अवनत होईल). ते करणे आवश्यक असल्यास, `docker-compose.yml` मधील `redis:` सेवा ब्लॉक काढून टाका/कॉमेंट करा किंवा ती शून्यापर्यंत स्केल करा:

```bash
docker compose up -d --scale redis=0
```

## प्रॉडक्शन कंपोज

डेव्हलपमेंटसोबत चालणाऱ्या विलग प्रॉडक्शन स्नॅपशॉटसाठी `docker-compose.prod.yml` वापरा.

| तपशील                  | मूल्य                                                                                   |
| ---------------------- | --------------------------------------------------------------------------------------- |
| फाइल                   | `docker-compose.prod.yml`                                                               |
| डीफॉल्ट डॅशबोर्ड पोर्ट | `PROD_DASHBOARD_PORT=20130` (अंतर्गत `${DASHBOARD_PORT:-20128}` शी मॅप केलेला)          |
| डीफॉल्ट API पोर्ट      | `PROD_API_PORT=20131`                                                                   |
| इमेज                   | `omniroute:prod` (`runner-cli` लक्ष्यापासून बिल्ड केलेली)                               |
| Redis कंटेनर           | `omniroute-redis-prod` (`redis:8.6.2`, समर्पित `redis-prod-data` व्हॉल्यूम)             |
| डेटा व्हॉल्यूम         | `omniroute-prod-data` (नामांकित, रीबिल्डदरम्यान टिकवून ठेवलेला)                         |
| आरोग्य तपासण्या        | `node healthcheck.mjs` + `redis-cli ping`, `depends_on` हे Redis च्या आरोग्यावर अवलंबून |

वापरण्याची पद्धत:

```bash
# प्रॉडक्शन स्टॅक बिल्ड करून सुरू करा
docker compose -f docker-compose.prod.yml up -d --build

# लॉग्जचा थेट प्रवाह पाहा
docker compose -f docker-compose.prod.yml logs -f

# बंद करा (व्हॉल्यूम ठेवा)
docker compose -f docker-compose.prod.yml down
```

प्रॉडक्शन स्टॅक डेव्हलपमेंट कंपोजच्या समांतर चालतो (कंटेनरची नावे, पोर्ट आणि व्हॉल्यूम वेगळे असतात), त्यामुळे प्रॉडक्शन सुरू ठेवून तुम्ही स्थानिक पातळीवर पुनरावृत्ती करत राहू शकता.

## Dockerfile टप्पे

रेपॉझिटरीमध्ये बहु-टप्पीय Dockerfile (`Dockerfile`) दिली जाते. चार टप्पे उपलब्ध आहेत; तुमच्या वापराच्या प्रकरणासाठी योग्य `target` निवडा.

| टप्पा         | बेस इमेज              | उद्देश                                                                                                                                                                                                                                                                        |
| ------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | अवलंबने स्थापित करतो (`npm ci --legacy-peer-deps`) आणि `npm run build` चालवतो (डीफॉल्टनुसार Turbopack — खालील बिल्ड-वेळ संसाधने पाहा)                                                                                                                                         |
| `runner-base` | `node:26-trixie-slim` | Next.js च्या स्वतंत्र आउटपुटसह उत्पादन रनटाइम. **कोणतेही प्रदाता CLI समाविष्ट नाहीत.**                                                                                                                                                                                        |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose` आणि जागतिक CLI जोडतो: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **एजंटिक कार्यप्रवाहांसाठी हे निवडा.**                                                                                                          |
| `runner-web`  | `runner-base`         | वेब-सत्र प्रदात्यांसाठी Playwright + Chromium ब्राउझर (`--with-deps`) जोडतो: `gemini-web`, `claude-web`, `claude-turnstile`. **तुम्ही हे प्रदाते वापरत असाल तर हे निवडा** — याशिवाय साधी इमेज विनंतीच्या वेळी अयशस्वी होते (Release Channels अंतर्गत असलेली `-web` टीप पाहा). |

विशिष्ट लक्ष्य स्वहस्ते बिल्ड करा:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### बिल्ड-वेळ संसाधने

तीन बिल्ड आर्ग्युमेंट `builder` टप्प्याचा खर्च नियंत्रित करतात. ती केवळ बिल्ड-वेळेसाठी आहेत —
`OMNIROUTE_MEMORY_MB` (खाली) हे स्वतंत्र रनटाइम नियंत्रण आहे.

| बिल्ड आर्ग्युमेंट           | डीफॉल्ट | परिणाम                                                                                            |
| --------------------------- | ------- | ------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`     | `0` webpack सह बिल्ड करतो: कमी कमाल मेमरी, परंतु संथ. `1` Turbopack वापरण्याचा पर्याय निवडतो.     |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`  | सुरू केलेल्या `next build` साठी V8 हीप मर्यादा (`--max-old-space-size`).                          |
| `OMNIROUTE_BUILD_WORKERS`   | `2`     | `CIRCLE_NODE_TOTAL` ला मूल्य पुरवतो; पृष्ठ-डेटा संकलनासाठी Next `workers = N - 1` निर्धारित करतो. |

मोठ्या बिल्डरवर `OMNIROUTE_BUILD_WORKERS` वाढवावे आणि मर्यादित संसाधनांचा बिल्ड
`✓ Compiled successfully` **नंतर** बंद पडल्यास प्रथम याच्यावर संशय घ्यावा.
प्रत्येक पृष्ठ-डेटा वर्कर ही स्वतंत्र प्रक्रिया असते आणि मूळ `next build` स्वतःही
स्वतंत्र प्रक्रिया असते; प्रत्यक्ष VPS पुनरुत्पादनात (issue #7518) प्रत्येक प्रक्रियेचा
कमाल RSS `NODE_OPTIONS` हीप फ्लॅगपासून स्वतंत्रपणे ~4.5 GB असल्याचे मोजले गेले
(Turbopack हे V8 हीपबाहेरील नेटिव्ह/Rust मेमरीमध्ये कंपाइल करते). `2` हे डीफॉल्ट
(→ 1 वर्कर, एकूण 2 प्रक्रिया) प्रकाशन पाइपलाइनद्वारे वापरल्या जाणाऱ्या 16 GB / 4 vCPU
GitHub-होस्टेड रनरसाठी ठरवले आहे. `8` वर (→ 7 वर्कर) त्या रनरची मेमरी संपली आणि
buildkit ने `ResourceExhausted: ... cannot allocate memory` सह तो टप्पा अयशस्वी केला;
प्रत्येक प्रक्रियेचा RSS अंदाजाने ठरवण्याऐवजी थेट मोजल्यानंतर `3` (→ 2 वर्कर) देखील
बसले नाही. `tests/unit/docker-build-memory-budget.test.ts` मोजलेल्या आकड्याच्या
आधारे गणना करते आणि दोन्हीपैकी कोणतेही नियंत्रण रनरच्या क्षमतेपेक्षा मोठे झाल्यास
अयशस्वी होते.

Turbopack हे V8 हीपच्या **बाहेर** असलेल्या नेटिव्ह Rust मेमरीमध्ये कंपाइल करते,
त्यामुळे `OMNIROUTE_BUILD_MEMORY_MB` तिच्यावर मर्यादा घालत नाही. मेमरी मर्यादा
असलेल्या होस्टवर OOM किलर बिल्डला कोणत्याही त्रुटी मजकुराशिवाय SIGKILL करतो —
तो `Creating an optimized production build` च्या मध्यातच थांबतो, त्यामुळे मेमरी
संपल्यासारखे न वाटता तो अडकला आहे असे वाटते. म्हणूनच `Dockerfile` मध्ये डीफॉल्टनुसार
webpack (`OMNIROUTE_USE_TURBOPACK=0`) वापरले जाते; `npm run dev` / `npm run build`
मध्ये मात्र Turbopack हा कोड डीफॉल्ट आहे: कोणत्याही बिल्ड आर्ग्युमेंटशिवाय असलेला
साधा `docker build .` (जो Railway आणि इतर वन-क्लिक होस्ट चालवतात) मेमरी-मर्यादित
बिल्डरवर कोणतीही सूचना न देता बंद पडू नये. प्रकाशित इमेज आधीपासूनच
`docker-publish.yml` मध्ये `OMNIROUTE_USE_TURBOPACK=0` स्पष्टपणे पुरवतात. भरपूर RAM
असलेल्या बिल्डरवर जलद बिल्डसाठी Turbopack निवडा:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` सक्षम आहे, त्यामुळे `next build` एक मूळ **आणि** एक वर्कर
प्रक्रिया चालवतो आणि प्रत्येक प्रक्रिया स्वतंत्रपणे `OMNIROUTE_BUILD_MEMORY_MB`
चे पालन करते. कंटेनरची मर्यादा त्या मूल्याच्या सुमारे दुपटीपेक्षा जास्त ठेवा,
एकपट नव्हे.

या ट्रीवर मोजलेले (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| बंडलर     | कंटेनर मर्यादा | परिणाम                                     |
| --------- | -------------- | ------------------------------------------ |
| Turbopack | 8 GiB / 16 GiB | दोन्हीवर कोणतीही सूचना न देता OOM-किल झाले |
| webpack   | 8 GiB          | बिल्ड वर्करला SIGKILL केले गेले            |
| webpack   | 12 GiB         | यशस्वी, कमाल वापर 11.1 GiB                 |

### रनटाइम डीफॉल्ट

`runner-base` द्वारे निर्यात केलेली डीफॉल्ट मूल्ये: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Docker मधील मेमरीचे वर्तन:

- इमेज `OMNIROUTE_MEMORY_MB=1024` सेट करते आणि त्यावरून `NODE_OPTIONS=--max-old-space-size=1024` निर्धारित करते.
- प्रत्यक्ष सर्व्हर प्रक्रिया स्टँडअलोन लाँचरद्वारे सुरू केली जाते, जो `OMNIROUTE_MEMORY_MB` वाचतो आणि `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` जोडतो.
- Node वारंवार दिलेल्या `--max-old-space-size` पर्यायातील शेवटचे मूल्य वापरतो, त्यामुळे `OMNIROUTE_MEMORY_MB` सेट केल्याने प्रभावी Docker हीप मर्यादा नियंत्रित होते.
- इमेज हे नेहमी सेट करत असल्यामुळे, लाँचरचा स्वतःचा RAM-कॅलिब्रेटेड फॉलबॅक Docker अंतर्गत कधीही लागू होत नाही. वर्कलोडसाठी ते स्पष्टपणे वाढवा (खालील तक्ता). कोडिंग-एजंटच्या `/v1/responses` साठी `2048` अजूनही खूप कमी आहे.

### कोडिंग एजंटसाठी रनटाइम RAM

1 GiB ची Docker डीफॉल्ट मर्यादा ही डॅशबोर्ड/हलके चॅट यांच्यासाठी किमान पातळी आहे, उत्पादनासाठी योग्य आकार नाही. मोठ्या `POST /v1/responses` बॉडीज (शेकडो संदेश, अनेक टूल्स) कॉम्प्रेशनदरम्यान अनेक इन-मेमरी ग्राफ्स राखून ठेवतात. एकाच वेळी चालणाऱ्या सुमारे 3 MiB / सुमारे 750k-टोकनच्या दोन विनंत्यांमुळे **12 GiB** ओल्ड-स्पेसवर V8 बंद पडले आहे (`FATAL ERROR: Reached heap limit`) आणि 16 GiB cgroup OOM देखील झाला आहे. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) पहा.

**cgroup `--memory` चा आकार हीपपेक्षा जास्त ठेवा** — नेटिव्ह बफर्स, SQLite आणि कॉम्प्रेशनची मध्यवर्ती डेटा-संरचना V8 च्या बाहेर असतात.

| वर्कलोड                            | `OMNIROUTE_MEMORY_MB`  | कंटेनर / cgroup       | नोंदी                                                                                                             |
| ---------------------------------- | ---------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------- |
| डॅशबोर्ड, एक हलके चॅट              | `1024` (इमेज डीफॉल्ट)  | ≥2 GiB                |                                                                                                                   |
| एक कोडिंग एजंट (Claude/Codex/Grok) | `8192`                 | ≥10 GiB               | सामान्य एकल-सत्र `/v1/responses`                                                                                  |
| दोन समवर्ती मोठ्या `/v1/responses` | `10240`–`12288`        | ≥12–16 GiB            | सुमारे 12 GiB हीपवर V8 बंद पडल्याचे मोजले गेले                                                                    |
| तीन किंवा अधिक समवर्ती मोठे संदर्भ | एका प्रक्रियेत करू नका | क्रमिक करा / अधिक RAM | डीफॉल्ट हेवीवेट अॅडमिशनमध्ये 1 इन-फ्लाइट विनंती असते; RAM न वाढवता ती मर्यादा वाढवल्यास पुन्हा प्रक्रिया बंद पडते |

बेअर मेटलवर `omniroute serve`, `OMNIROUTE_MEMORY_MB` **सेट नसताना**, RAM च्या सुमारे 35% वर कॅलिब्रेट होते (`[512, 4096]` या मर्यादेत). Docker नेहमी `1024` सेट करते, त्यामुळे अधिकृत इमेजमध्ये हे कॅलिब्रेशन कधीही होत नाही.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## महत्त्वाचे पर्यावरण चल

[ENVIRONMENT.md](../reference/ENVIRONMENT.md) मध्ये दस्तऐवजीकरण केलेल्या डीफॉल्ट्सव्यतिरिक्त, Docker अंतर्गत चालवताना खालील चल सर्वाधिक महत्त्वाचे आहेत:

| चल                            | उद्देश                                                                                                                                                                                                                                                                            | डीफॉल्ट                        |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket ब्रिजसाठी सामायिक गुप्त मूल्य. **उत्पादन वातावरणात आवश्यक** — एक मजबूत यादृच्छिक स्ट्रिंग सेट करा.                                                                                                                                                                      | सेट केलेले नाही (द्यावे लागेल) |
| `REDIS_URL`                   | दर मर्यादक / कॅश बॅकएंडसाठी कनेक्शन स्ट्रिंग                                                                                                                                                                                                                                      | `redis://redis:6379`           |
| `REDIS_PORT`                  | समाविष्ट Redis कंटेनरसाठी होस्ट-साइड पोर्ट                                                                                                                                                                                                                                        | `6379`                         |
| `REDIS_BIND_HOST`             | समाविष्ट Redis पोर्ट ज्या होस्ट इंटरफेसवर प्रकाशित केला जातो तो इंटरफेस (तुम्ही AUTH जोडत नाही तोपर्यंत लूपबॅक)                                                                                                                                                                   | `127.0.0.1`                    |
| `AUTO_UPDATE_HOST_REPO_DIR`   | स्वयं-अद्यतन कार्यप्रवाहांसाठी `cli` प्रोफाइलमध्ये `/workspace/omniroute` येथे माउंट केलेला होस्ट पथ                                                                                                                                                                              | `.` (सध्याची निर्देशिका)       |
| `OMNIROUTE_MEMORY_MB`         | Docker स्वतंत्र सर्व्हरसाठी रनटाइम Node हीपची कमाल मर्यादा; वरील इमेज डीफॉल्ट अधिलिखित करते. कोडिंग एजंट्स: `8192`+ ([रनटाइम RAM](#runtime-ram-for-coding-agents) पहा).                                                                                                           | `1024`                         |
| `DASHBOARD_PORT` / `API_PORT` | डॅशबोर्ड (20128) आणि API (20129) साठी उघडे केलेले पोर्ट अधिलिखित करते                                                                                                                                                                                                             | `20128` / `20129`              |
| `APP_BIND_HOST`               | docker-compose डॅशबोर्ड/API/live-WS पोर्ट ज्या होस्ट इंटरफेसवर प्रकाशित करते तो इंटरफेस. `REQUIRE_API_KEY=false` (डीफॉल्ट) असल्यास, `0.0.0.0` अनामिक `/v1` प्रॉक्सी LAN समोर उघड करते — केवळ `REQUIRE_API_KEY=true` असल्यास किंवा पुढे रिव्हर्स प्रॉक्सी असल्यासच व्याप्ती वाढवा. | `127.0.0.1`                    |
| `CLIPROXY_BIND_HOST`          | docker-compose ज्या होस्ट इंटरफेसवर `cliproxyapi` साइडकार प्रकाशित करते तो इंटरफेस — त्याच्या डेटा व्हॉल्यूममध्ये प्रदाता क्रेडेन्शियल्स साठवली जातात.                                                                                                                            | `127.0.0.1`                    |
| `OMNIROUTE_PLUGINS_DIR`       | रनटाइम प्लगइन स्कॅनर ज्या निर्देशिकेतून वाचतो आणि ज्यामध्ये स्थापित करतो ती निर्देशिका. प्लगइन्स bind-mounted केलेले असताना ती सेट करा: डीफॉल्ट `HOME` चे अनुसरण करते, जे इमेजने एक्सपोर्ट केलेले असेलच असे नाही.                                                                 | `~/.omniroute/plugins`         |
| `OMNIROUTE_BASE_PATH`         | ॲप रिव्हर्स प्रॉक्सीच्या मागे प्रकाशित केलेले असताना वापरला जाणारा URL उपपथ (उदा. `/omniroute`)                                                                                                                                                                                   | _(रिक्त = रूट)_                |
| `NEXT_PUBLIC_BASE_URL`        | उपपथासह सार्वजनिक ब्राउझर ओरिजिन (उदा. `https://host/omniroute`)                                                                                                                                                                                                                  | सेट केलेले नाही                |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml` साठी होस्ट-साइड डॅशबोर्ड पोर्ट                                                                                                                                                                                                                          | `20130`                        |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` साइडकारसाठी होस्ट-साइड पोर्ट                                                                                                                                                                                                                                        | `8317`                         |

## उपपथावरील रिव्हर्स प्रॉक्सी (Traefik / nginx)

Next.js `basePath` हे स्वतंत्र बंडलमध्ये संकलित केले जाते. OmniRoute अॅपच्या रूटवरील एका सेंटिनेल फाइलमध्ये तयार केलेले मूल्य नोंदवते (`npm run build` दरम्यान लिहिले जाते; `scripts/docker/ensure-docker-base-path.mjs` द्वारे वाचले जाते) आणि कंटेनर सुरू होताना त्याची `OMNIROUTE_BASE_PATH` सोबत तुलना करते. ही मूल्ये भिन्न असतील आणि इमेज डोमेन रूटसाठी बिल्ड केली असेल, तर `node dev/run-standalone.mjs` चालण्यापूर्वी एंट्रीपॉइंट स्वतंत्र मॅनिफेस्ट, अंतर्भूत `basePath`/`assetPrefix` लिटरल्स (Next 16 केवळ `assetPrefix` मधून SSR अॅसेट URL रेंडर करते — पॅचर उपपथ त्यातही प्रतिबिंबित करतो), बिल्डमध्ये समाविष्ट केलेले `/_next/static` अॅसेट URL (क्लायंट-रेफरन्स मॅनिफेस्ट, मीडिया इम्पोर्ट, पूर्व-रेंडर केलेली त्रुटी पृष्ठे) आणि क्लायंट `process.env` शिम पुन्हा लिहितो.

### Compose बिल्ड (शिफारस केलेले)

इमेज आणि रनटाइम सुसंगत राहावेत यासाठी `.env` मध्ये दोन्ही व्हेरिएबल्स सेट करा आणि नंतर पुन्हा बिल्ड करा:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` हे `OMNIROUTE_BASE_PATH` Docker build-arg म्हणून आणि रनटाइम एन्व्हायर्नमेंट व्हेरिएबल म्हणून पुढे पाठवते.

### पूर्व-बिल्ड केलेली रूट इमेज + रनटाइम उपपथ

प्रकाशित `diegosouzapw/omniroute:*` इमेजेस डोमेन रूटसाठी बिल्ड केलेल्या आहेत. तरीही तुम्ही रनटाइमच्या वेळी `OMNIROUTE_BASE_PATH` सेट करू शकता; कंटेनर सुरू होताना एकदा बंडल पॅच करतो. त्यास संबंधित सार्वजनिक ओरिजिनसोबत वापरा:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

रिव्हर्स प्रॉक्सीला **संपूर्ण** बाह्य पथ पुढे पाठवण्यासाठी कॉन्फिगर करा (प्रिफिक्स काढू नका). Traefik ने `StripPrefix` शिवाय `PathPrefix(`/omniroute`)` कंटेनरकडे रूट केले पाहिजे, जेणेकरून Next.js ला `/omniroute/...` मिळेल आणि ते `/omniroute/_next/...` मधून अॅसेट्स सर्व्ह करेल.

Docker हेल्थचेक सक्रिय `OMNIROUTE_BASE_PATH` प्रिफिक्स असलेल्या हलक्या `/healthz` लाइफसायकल एंडपॉइंटची तपासणी करतो. मानवी/डॅशबोर्ड निदानासाठी `/api/monitoring/health` उपलब्ध राहते; कंटेनरचा HEALTHCHECK पुन्हा त्याकडे निर्देशित करण्यासाठी (उदाहरणार्थ, सखोल आरोग्य तपासणी लागू करण्यासाठी), `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` सेट करा. हा पथ एक **सखोल** तपास आहे (DB + मॉनिटरिंग सारांश) — तुम्ही पुन्हा तो पर्याय निवडल्यास Docker च्या क्वचित होणाऱ्या `HEALTHCHECK` साठी योग्य, परंतु Kubernetes `livenessProbe` मध्यांतरांसाठी **नाही**.

ऑर्केस्ट्रेटर्ससाठी (Kubernetes, Nomad इ.):

| तपासणी            | प्राधान्य द्या                                                         | टाळा                                                     |
| ----------------- | ---------------------------------------------------------------------- | -------------------------------------------------------- |
| लाइव्हनेस         | HTTP `GET /livez`, किंवा मुख्य पोर्टवरील TCP (`PORT`, डीफॉल्ट `20128`) | लाइव्हनेस म्हणून `/api/monitoring/health`                |
| रेडीनेस           | HTTP `GET /healthz`                                                    | इव्हेंट लूप व्यस्त असण्याला बंद पडणे मानणारे कमी टाइमआउट |
| सखोल / ब्लॅकबॉक्स | `/api/monitoring/health`                                               | —                                                        |

`/healthz` प्रक्रिया लाइफसायकल (`ok` / `starting` / `stopping`) नोंदवते. `/livez` हे केवळ प्रक्रिया सुरू असल्याचे तपासते (हँडलर चालू शकत असेल तेव्हा नेहमी 200; ते रेडीनेसची प्रतीक्षा करत नाही). दोन्हीही विनंती हाताळणीप्रमाणे त्याच Node इव्हेंट लूपवर चालतात, त्यामुळे CPU-केंद्रित कॅटलॉग किंवा कॉम्प्रेशनचे काम त्यांना विलंबित करू शकते — व्यस्त ≠ बंद. HTTP तपासण्यांचा टाइमआउट होत असल्यास TCP लाइव्हनेसला प्राधान्य द्या. तपासण्यांसाठी संपूर्ण मार्गदर्शन:
[मॉनिटरिंग मार्गदर्शिका — Kubernetes तपासणी शिफारसी](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Caddy सह Docker Compose (HTTPS Auto-TLS)

Caddy च्या स्वयंचलित SSL प्रोव्हिजनिंगचा वापर करून OmniRoute सुरक्षितपणे उपलब्ध करता येते. आपल्या डोमेनचा DNS A रेकॉर्ड आपल्या सर्व्हरच्या IP कडे निर्देशित असल्याची खात्री करा.

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
      # OAuth कॉलबॅक, डॅशबोर्ड लिंक आणि व्युत्पन्न सार्वजनिक URL साठी ब्राउझरला दिसणारे ओरिजिन.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # शेड्यूल केलेल्या जॉब्स / सेल्फ-फेचसाठी अंतर्गत सर्व्हर-टू-सर्व्हर URL.
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

Caddy अपस्ट्रीम कंटेनरसाठी मानक फॉरवर्डिंग हेडर्स सेट करते. OmniRoute हे
OAuth कॉलबॅक आणि व्युत्पन्न सार्वजनिक लिंकसाठी `NEXT_PUBLIC_BASE_URL` चा अधिकृत सार्वजनिक ओरिजिन म्हणून वापर करते;
प्रमाणीकृत डॅशबोर्ड लेखन समान-ओरिजिन विनंत्यांसह सत्राशी बांधलेले CSRF
संरक्षण वापरते. स्पष्ट कॉन्फिगरेशनऐवजी विश्वसनीय फॉरवर्ड केलेल्या हेडर्समधून OmniRoute ने सार्वजनिक ओरिजिन
निश्चित करावे अशी तुमची हेतुपुरस्सर इच्छा असलेल्या प्रगत डिप्लॉयमेंटसाठीच `OMNIROUTE_TRUST_PROXY` सक्षम करा.

## Cloudflare Quick Tunnel

Docker डिप्लॉयमेंटसाठीच्या डॅशबोर्ड समर्थनामध्ये `Dashboard → Endpoints` वर एका क्लिकने वापरता येणारा **Cloudflare Quick Tunnel** समाविष्ट आहे. प्रथमच सक्षम केल्यावर, गरज असेल तेव्हाच `cloudflared` डाउनलोड केले जाते, तुमच्या सध्याच्या `/v1` एंडपॉइंटसाठी तात्पुरता टनेल सुरू केला जातो आणि व्युत्पन्न केलेला `https://*.trycloudflare.com/v1` URL तुमच्या नेहमीच्या सार्वजनिक URL च्या थेट खाली दाखवला जातो.

सक्रिय टनेलची स्थिती न बदलता एंडपॉइंट टनेल पॅनेल्स (Cloudflare, Tailscale, ngrok) `Settings → Appearance` मधून दाखवता किंवा लपवता येतात.

### टनेलविषयी नोंदी

- Quick Tunnel URL तात्पुरते असतात आणि प्रत्येक रीस्टार्टनंतर बदलतात.
- OmniRoute किंवा कंटेनर रीस्टार्ट झाल्यानंतर Quick Tunnels आपोआप पुनर्स्थापित होत नाहीत. गरज असेल तेव्हा डॅशबोर्डमधून ते पुन्हा सक्षम करा.
- व्यवस्थापित इन्स्टॉल सध्या `x64` / `arm64` वरील Linux, macOS आणि Windows ला समर्थन देते.
- मर्यादित कंटेनर वातावरणात आवाज करणारे QUIC UDP बफर इशारे टाळण्यासाठी व्यवस्थापित Quick Tunnels डीफॉल्टनुसार HTTP/2 ट्रान्सपोर्ट वापरतात. वेगळा ट्रान्सपोर्ट हवा असल्यास `CLOUDFLARED_PROTOCOL=quic` किंवा `auto` सेट करा.
- Docker इमेजेसमध्ये सिस्टीम CA रूट्स समाविष्ट असतात आणि त्या व्यवस्थापित `cloudflared` कडे पाठवल्या जातात, ज्यामुळे कंटेनरमध्ये टनेल बूटस्ट्रॅप होताना TLS विश्वासासंबंधी अपयश टळते.
- OmniRoute ने डाउनलोड करण्याऐवजी आधीपासून अस्तित्वात असलेली बायनरी वापरावी असे वाटत असल्यास `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` सेट करा.

## इमेज टॅग्स

| इमेज                     | टॅग      | आकार   | वर्णन                                                 |
| ------------------------ | -------- | ------ | ----------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | सर्वोच्च **प्रकाशित** स्थिर SemVer (git `main` नव्हे) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOps साठी या प्रकारचा टॅग पिन करा                   |

मल्टी-प्लॅटफॉर्म मॅनिफेस्ट: `linux/amd64` + `linux/arm64` नेटिव्ह (Apple Silicon, AWS Graviton, Raspberry Pi). Docker आपोआप जुळणारे आर्किटेक्चर निवडते; ARM होस्टवर AMD64 इम्युलेशन सक्तीने वापरायचे असल्यास `--platform linux/amd64` द्या.

### रिलीज चॅनेल्स

OmniRoute स्थिर रिलीज, सक्रिय रिलीज-ब्रँच चाचणी आणि डेव्हलपमेंट बिल्ड्ससाठी स्वतंत्र Docker चॅनेल्स प्रकाशित करते.

| चॅनेल                           | स्रोत                              | परिवर्तनशीलता                  | शिफारस केलेला वापर                                                                                                  |
| ------------------------------- | ---------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | स्वाक्षरी केलेले/आवृत्तीबद्ध रिलीज | अपरिवर्तनीय                    | अचूक रिलीज पिन करणारी प्रॉडक्शन डिप्लॉयमेंट्स                                                                       |
| `:latest` / `:latest-web`       | सर्वोच्च **प्रकाशित** स्थिर SemVer | परिवर्तनशील स्थिर पॉइंटर       | SemVer प्रकाशन जॉबनंतर स्थिर रिलीजचे अनुसरण करते — `main` किंवा अप्रकाशित `release/v*` कमिट्सचा मागोवा घेत **नाही** |
| `:next` / `:next-web`           | सध्याची डीफॉल्ट `release/v*` ब्रँच | परिवर्तनशील प्री-रिलीज पॉइंटर  | सक्रिय रिलीज ब्रँचवर आलेल्या, पण अद्याप स्थिर रिलीजमध्ये नसलेल्या सुधारणांची चाचणी                                  |
| `:main` / `:main-web`           | `main` ब्रँच                       | परिवर्तनशील डेव्हलपमेंट पॉइंटर | केवळ डेव्हलपमेंट आणि इंटिग्रेशन चाचणीसाठी                                                                           |

#### वेब-सत्र प्रोव्हायडर्स: `-web` इमेजेस

वरील प्रत्येक चॅनेलचा `-web` टॅगही उपलब्ध आहे (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), जो `runner-web` स्टेजमधून बिल्ड केला जातो — Playwright आणि Chromium ब्राउझरसह तीच इमेज. साधी इमेज Chromium **शिवाय** दिली जाते; `gemini-web`, `claude-web` आणि `claude-turnstile` यांना त्याची आवश्यकता असते.

अपयश स्टार्टअपच्या वेळी न होता पुढे ढकलले जाते: हे प्रोव्हायडर्स त्यांच्या मॉडेल्सची सूची दाखवतात आणि डॅशबोर्डमध्ये कनेक्टेड म्हणून दिसतात, परंतु केवळ पहिली विनंती खालील त्रुटीसह अयशस्वी होते

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

तुम्ही हे प्रोव्हायडर्स वापरत असल्यास, तुम्ही आधीपासून वापरत असलेल्या चॅनेलचा `-web` टॅग पुल करा — इतर काहीही बदलत नाही. npm/CLI इन्स्टॉलमध्ये (Docker इमेजशिवाय), यास समतुल्य नसलेला घटक म्हणजे ब्राउझर बायनरी: होस्टवर `npx playwright install chromium` चालवा.

#### प्री-रिलीज चॅनेल वापरणे

`next` चॅनेल वर्तमान डीफॉल्ट `release/v*` शाखेवर प्रत्येक push वेळी पुन्हा तयार केले जाते आणि AMD64 तसेच ARM64 या दोन्हींसाठी प्रकाशित केले जाते. जुन्या देखभाल शाखा ते अधिलिखित करू शकत नाहीत. पुढील स्थिर tag तयार होण्यापूर्वी सक्रिय release शाखेत विलीन झालेल्या सुधारणांसाठी हे चॅनेल pull करता येणारी image उपलब्ध करून देते.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose साठी, निवडलेल्या profile द्वारे वापरला जाणारा image tag अधिलिखित करा, त्यानंतर service pull करून पुन्हा तयार करा:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### सुरक्षितता आणि rollback

`next` हे बदलते pre-release चॅनेल आहे. सक्रिय release शाखेवरील कोणत्याही push मुळे ते बदलू शकते आणि **उत्पादनातील वापरासाठी समर्थित नाही**. विशिष्ट build चे मूल्यमापन करताना image digest निश्चित करा:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

चाचणीपूर्वी, OmniRoute data volume किंवा bind-mounted data directory चा backup घ्या. rollback करण्यासाठी, यापूर्वी वापरलेली स्थिर version किंवा digest पुनर्स्थापित करा आणि container पुन्हा तयार करा:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

release-branch build कधीही `latest` बदलू शकत नाही; केवळ पात्र स्थिर semantic version स्थिर pointer ला पुढे नेऊ शकते. `next` images मध्ये release image तपासणी आणि CRITICAL असुरक्षितता आढळल्यास रोखणारा gate कायम ठेवला जातो.

**`latest` हे git साठी अद्ययावतपणाची हमी नाही.** `main` किंवा सक्रिय `release/v*` शाखेवर विलीन झालेल्या सुधारणा, स्थिर SemVer image प्रकाशित होऊन publish job ने `:latest` पुढे नेईपर्यंत **`:latest` मध्ये उपलब्ध नसतात** (त्या SemVer प्रमाणेच digest). GitHub वर सुधारणा आधीच दिसत असूनही `latest` बदललेले दिसत नसल्यास, release शाखेची चाचणी करण्यासाठी `:next` pull करा किंवा SemVer tag ची प्रतीक्षा करा.

| तुम्हाला हवे आहे                                                                 | वापरा                                     |
| -------------------------------------------------------------------------------- | ----------------------------------------- |
| बदलता कामा नये असे GitOps / उत्पादन                                              | `:X.Y.Z` (किंवा image digest) निश्चित करा |
| प्रकाशित स्थिर versions वापरणे आणि प्रत्येक release वेळी पुनर्निर्मिती स्वीकारणे | `:latest`                                 |
| अप्रकाशित `release/v*` commits ची चाचणी करणे                                     | `:next` (उत्पादनासाठी नाही)               |
| `main` ची चाचणी करणे                                                             | `:main` (उत्पादनासाठी नाही)               |

## Docker मधील डॅशबोर्ड अद्यतने

प्रकाशित इमेजचा कंटेनर स्वतःला बदलू शकत नाही. OmniRoute ला तो कंटेनरमध्ये चालत असल्याचे आढळल्यास (`.git` checkout नाही आणि npm install नाही), मुख्य डॅशबोर्डवरील अद्यतन बॅनर npm/git सूचनांऐवजी होस्टवर चालवायची कमांड कॉपी बटणासह दाखवतो:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

सेवेचे नाव `AUTO_UPDATE_SERVICE` मधून येते (डीफॉल्ट `omniroute`, म्हणजे `docker-compose.selfhost.yml` मधील सेवा). `pull` फक्त बदलणारा टॅग (`latest`, `next`) पुढे नेतो; निश्चित केलेला `:X.Y.Z` टॅग असल्यास, आधी टॅग संपादित करा.

### होस्ट ट्रिगर फाइलसह एका क्लिकमध्ये अद्यतने

`/var/run/docker.sock` माउंट न करता **आता अद्यतनित करा** कार्यरत ठेवण्यासाठी (ते कंटेनरला होस्टवर root प्रवेश देते — वरील `cli` प्रोफाइलची चेतावणी पहा), OmniRoute सेवेवर `DOCKER_UPDATE_TRIGGER_FILE` सेट करा आणि होस्टवर वॉचर चालवा:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

पथ `DATA_DIR` च्या आत असणे आवश्यक आहे (सापेक्ष मूल्ये त्याच्या संदर्भात सोडवली जातात); इतर कोणताही पथ नाकारला जातो. त्यानंतर **आता अद्यतनित करा** त्या फाइलमध्ये `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` लिहिते, `202` प्रतिसाद देते आणि नवीन आवृत्ती कार्यरत होऊन पृष्ठ रीलोड होईपर्यंत डॅशबोर्ड `/api/system/version` चे पोलिंग करतो. या मोडमध्ये OmniRoute कधीही shell किंवा Docker कमांड चालवत नाही. प्रत्येक अद्यतन क्रियेप्रमाणे, विनंती केवळ loopback/LAN क्लायंटकडूनच स्वीकारली जाते.

bind-mounted डेटा निर्देशिकेमुळे होस्टला निरीक्षण करण्यासाठी स्थिर पथ मिळतो. नमुना `systemd` युनिट्स (`/srv/omniroute` ऐवजी तुमची compose फाइल आणि `data/` असलेली निर्देशिका वापरा):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=OmniRoute डॅशबोर्ड अद्यतन विनंत्यांवर लक्ष ठेवा

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=OmniRoute कंटेनर पुल करून पुन्हा तयार करा

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

अयशस्वी रनची पुनरावृत्ती होऊ नये म्हणून सेवा पुल करण्यापूर्वी विनंती काढून टाकते. `DOCKER_UPDATE_TRIGGER_FILE` नसल्यास डॅशबोर्ड मॅन्युअल कमांड प्रवाह कायम ठेवतो.

## उपलब्धता: डीफॉल्ट SQLite एकल-प्रतिकृती आहे

स्टॉक Docker / Kubernetes OmniRoute आहे** एक नोड प्रक्रिया + एक SQLite लेखक** . उच्च उपलब्धता आहे** समर्थित नाही** त्या टोपोलॉजी वर.

| बंधन                                                | परिणाम                                                                                                                                                                                                                                                                                                       |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| एकच लेखक                                            | करा** नाही** एकाच SQLite फाइलवर अनेक प्रतिकृती चालवा. ते DB भ्रष्ट करते.                                                                                                                                                                                                                                     |
| पुन्हा तयार करा / पुन्हा सुरू करा / HEALTHCHECK किल | **पूर्ण आउटेज** इन-फ्लाइट SSE, डॅशबोर्ड सत्रे आणि इन-मेमरी स्थिती. प्रत्येक कनेक्ट केलेला क्लायंट ड्रॉप होतो. रिक्त-अंतिमबिंदू विंडो दरम्यान नवीन विनंत्या रिव्हर्स-प्रॉक्सी मिळवतात**`502 Bad Gateway: Unknown error`** , OmniRoute JSON नाही — क्लायंट हे प्रदाता अपयश (#11015) पासून वेगळे करू शकत नाहीत. |
| `/healthz` प्रमाणेच इव्हेंट लूप                     | व्यस्त कॅटलॉग किंवा कॉम्प्रेशन टिक प्रोबला विलंब करू शकते; एक लहान कालबाह्य नंतर रीस्टार्ट होते** फक्त** प्रतिकृती                                                                                                                                                                                           |

**प्रोब मॅट्रिक्स** ( [कुबर्नेट्स प्रोब शिफारशी](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) देखील पहा):

| चौकशी      | लक्ष्य                                                       | वापरू नका                                         |
| ---------- | ------------------------------------------------------------ | ------------------------------------------------- |
| जिवंतपणा   | TCP वर `PORT` (डिफॉल्ट `20128`), किंवा सॉफ्ट HTTP `/healthz` | `/api/monitoring/health`                          |
| तत्परता    | HTTP `GET /healthz`                                          | टाइट टाइमआउट जे इव्हेंट-लूप व्यस्तांना मृत मानतात |
| खोल / मानव | `/api/monitoring/health`                                     | स्वयंचलित कुबेलेट जिवंतपणा                        |

**अपग्रेड:** प्रत्येक सत्र कमी होण्याची अपेक्षा करा. शक्य असल्यास ग्राहकांना काढून टाका; डीफॉल्ट SQLite वर रोलिंग अपडेट नाही. कंपोझ `restart: unless-stopped` plus Docker `HEALTHCHECK` देखील जेव्हा कंटेनर अस्वास्थ्यकर असेल — त्याच ब्लास्ट त्रिज्याला बदलेल.

रेडीमेड मॅनिफेस्ट आणि हेल्म चार्ट `deploy/kubernetes/` आणि `deploy/helm/omniroute/` मध्ये राहतात — [Kubernetes उपयोजन मार्गदर्शक](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md) पहा.

कुबर्नेट्स स्निपेट साठी a** एकल प्रतिकृती** (पुन्हा तयार करणे आवश्यक आहे; एका SQLite फाइलवर `replicas` वाढवू नका):

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

`preStop` स्लीप क्यूबला SIGTERM च्या आधी सर्व्हिस एंडपॉइंट्स टाकू देते** नवीन** वाहतूक थांबते मृत्यू प्रक्रियेला मारणे. इन-फ्लाइट `/v1/responses` SSE हेवीवेट प्रवेश लीज (#11015) द्वारे `SHUTDOWN_TIMEOUT_MS` (डिफॉल्ट 30s) पर्यंत काढून टाकले जाते. नवीन विनंत्या ज्या अद्याप प्रक्रियेपर्यंत पोहोचतात त्यांना `503` + `Retry-After: 5` मिळते. रिक्रिएट रिक्रिएट एम्प्टी-एंडपॉईंट गॅप रिप्लेसमेंट रेडी होईपर्यंत एक कठीण आउटेज राहते — ते SQLite टोपोलॉजी आहे, प्रोब चुकीचे कॉन्फिगरेशन नाही.

बाह्य Postgres / बहु-लेखक HA आहे** नाही** एक दस्तऐवजीकरण स्टॉक मार्ग. तुम्हाला HA आवश्यकता असल्यास, एकच प्रतिकृती ठेवा किंवा प्रकल्पाने चाचणी केलेली आणि स्वतंत्रपणे दस्तऐवजीकरण केलेली टोपोलॉजी चालवा. Postgres/MySQL कार्य [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) मध्ये राहतात. ते जहाजे पर्यंत, गुणाकार करण्यासाठी एकमेव समर्थित मार्ग** मोठे** `/v1/responses` क्षमता N स्वतंत्र प्रक्रिया आहे (पुढील विभाग), एका खंडावर `replicas > 1` नाही.

## स्केल-आउट: एन स्वतंत्र प्रक्रिया

### Codex टोकन रोटेशन मालकी

एका Codex खात्याच्या प्रती स्वतंत्रपणे त्याचे एकल-वापर रिफ्रेश टोकन वापरू नयेत. केवळ सिंक्रोनाइझ केलेल्या क्रेडेंशियल्सचा वापर करणाऱ्या उदाहरणांवर, `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (उर्फ `cx`) सेट करा. एकल रोटेशन मालकावर ते सेट न करता सोडा. प्रत्येक प्रक्रियेला अजूनही स्वतःचे `DATA_DIR` आवश्यक आहे; हा पर्याय SQLite शेअर करत नाही किंवा टोकन सिंक्रोनाइझेशन किंवा वितरित लॉक पुरवत नाही.

जेव्हा रीफ्रेश आवश्यक असेल तेव्हा निष्क्रिय उदाहरण कनेक्शन पुन्हा वाचते आणि फक्त भिन्न, कालबाह्य प्रवेश टोकन स्वीकारते. अन्यथा कनेक्शन कालबाह्य किंवा निष्क्रिय न करता किंवा रिफ्रेश-ब्रेकर अयशस्वी झाल्याशिवाय रिफ्रेश अक्षम केले जाते. वास्तविक अपस्ट्रीम ऑथेंटिकेशन अयशस्वी अजूनही सामान्य अपयश लेखांकन, घातांकीय कूलडाउन आणि सामान्य क्लायंट त्रुटी वापरतात; खाते निष्क्रिय करणे कायम आहे. प्रवेश टोकन कालबाह्य होण्यापूर्वी मालकाचे फिरवलेले टोकन सिंक्रोनाइझ करा (डीफॉल्ट प्रोएक्टिव्ह रिफ्रेश लीड पाच मिनिटे आहे), किंवा Codex प्रमाणीकरण फाइल पुन्हा आयात करा. निष्क्रिय आयात टोकन एंडपॉइंटवर प्रमाणित न करता पुरवठा केलेले टोकन संग्रहित करतात. मॅन्युअल dashboard/API रिफ्रेश `409 refresh_disabled` परत करते; नवीन OAuth लॉगिन अपरिवर्तित आहेत. [पर्यावरण संदर्भ](../reference/ENVIRONMENT.md#passive-codex-token-refresh) पहा.

One Node process is **one V8 heap**. Two overlapping ~3 MiB / ~750k-token coding-agent `POST /v1/responses` (RTK + Caveman) abort that heap at ~12 Gi (`FATAL ERROR: Reached heap limit`) and can OOM a 16 Gi cgroup. See [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). That measurement is a **memory-budget** warning, not a product hard-max of two concurrent long `/v1/responses`. Heavyweight chat admission is gated by an auto-derived ingest byte budget (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) sized from that same V8/cgroup ceiling — overriding it upward (or setting the legacy `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` request-count cap) on an already-sized process reintroduces the abort. Small chats, `/healthz`, `/v1/models`, and MCP are **not** in that cap.

### एक-प्रक्रिया: दोनपेक्षा जास्त लांब `/v1/responses`

ए** निरोगी** प्रक्रिया ( `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` खाली ढीग, डीफॉल्ट `0.75`)** मे** प्रक्रिया-व्यापी इनफ्लाइट-बाइट बजेट (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) मध्ये अजूनही जागा असताना दोन समवर्ती लांब `POST /v1/responses` चालवा. `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (डिफॉल्ट 256 KiB) वर किंवा त्यावरील संस्था स्ट्रक्चर-हेवी विनंत्यांप्रमाणेच हेवीवेट लीज घेतात आणि तेच [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` एस्केप (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) वापरतात. दहापट समवर्ती लांब SSE क्लायंट (ऑपरेटरला अनेकदा 40-50 आवश्यक असतात) a** मेमरी-बजेट** प्रश्न — आकार ढीग + primary/headroom स्लॉट + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — कठोर "कमाल 2" उत्पादन मर्यादा नाही. पुन्हा प्रयत्न करण्यायोग्य `503` सह दाबलेला ढीग अजूनही शेड होतो त्यामुळे #7849 परत येत नाही.

ला** ढीग गुणाकार करा** (स्वतंत्र V8 जुन्या-जागा)** आज** :

| करा                                                                                                                        | करू नका                                                   |
| -------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| धावा** एन containers/pods** , प्रत्येक त्याच्यासह** स्वतःचे** `DATA_DIR` / खंड                                             | एका SQLite फाइलवर `replicas > 1` सेट करा                  |
| ढीग / इनफ्लाइट-बाइट बजेटमधून हेवी इन-फ्लाइट + हेल्दी-हेडरूम; 1–2 हे पुराणमतवादी #7849 डीफॉल्ट आहे, हार्ड उत्पादन कमाल नाही | एक प्रक्रिया 8 × RAM आणि एक अमर्याद गणना कॅप द्या         |
| पर्यायी: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL`** सामायिक कोटा काउंटर**                                      | Redis सामायिक SQLite — प्रमाणे वागवा ते नाही              |
| प्रत्येक घटनामध्ये डुप्लिकेट प्रदाता गुपिते (किंवा विभाजित डॅशबोर्ड स्वीकारा)                                              | एक डॅशबोर्ड / एक कॉल-लॉग प्रत्येक घटनांमध्ये अपेक्षित आहे |
| कोणत्याही लोड बॅलन्सरसह समोर; API की किंवा सत्राद्वारे चिकटविणे पुरेसे आहे                                                 | विक्रेता-विशिष्ट आकार-जागरूक मिडलवेअर आवश्यक आहे          |

सेशन-टू-अकाउंट ॲफिनिटी Redis द्वारे देखील शेअर केली जाऊ शकते : प्रत्येक प्रक्रियेवर समान `REDIS_KEY_PREFIX` आणि सकारात्मक `sessionAffinityTtlMs` सेटिंगसह `OMNIROUTE_SESSION_AFFINITY_STORE=redis` आणि `REDIS_URL` सेट करा. पिन प्रत्येक प्रक्रियेच्या पात्र स्थानिक कनेक्शनसाठी हॅश केलेल्या वापर-खाते ओळखींचे निराकरण करतात, म्हणून जुळणारे ओळख मेटाडेटा असलेल्या OAuth खात्यांमध्ये जुळणारे कनेक्शन IDs असणे आवश्यक नाही. पिन रिझोल्यूशन आणि संरक्षित निष्कासन मध्ये परस्परविरोधी स्थानिक IDs वर ज्ञात खाते ओळखींना प्राधान्य दिले जाते; ओळख नसलेल्या नोंदी (किंवा ओळख नसताना बेदखल कॉल करणारे) वारसा ID गार्ड राखून ठेवतात. स्थिर वापर ओळख नसलेल्या खात्यांना अजूनही जुळणारे IDs आवश्यक आहे. Redis त्रुटी किंवा 100 ms पेक्षा जास्त कॉल स्थानिक SQLite वर परत येतात. प्रत्येक Redis ॲफिनिटी स्टोअर थकबाकी असलेल्या ऑपरेशन्स 8 वाजता कॅप करतो, Redis पूर्ण भरल्यावर लगेचच बायपास करतो आणि कॉलरच्या अंतिम मुदतीवर नव्हे तर अंतर्निहित काम पूर्ण झाल्यावरच स्लॉट सोडतो. Redis आउटेज दरम्यान कोणतेही सामायिक सत्य नाही: प्रत्येक घटना त्याच्या स्वतःच्या स्थानिक आत्मीयतेवर परत येते, प्रत्येक उदाहरणात सत्रे पुन्हा पिन होऊ शकतात आणि उदाहरणे वेगळे होऊ शकतात. चिकटपणा Redis द्वारे पुन्हा एकत्रित होतो जेव्हा तो पुनर्प्राप्त होतो. कालबाह्यता प्रतीक्षा करते, पाठवलेले EVAL नाही, जे फॉलबॅक नंतर येऊ शकते. राउटिंग राइट्स राउटिंग निर्णयाद्वारे निरीक्षण केलेल्या अचूक मूल्याची तुलना करतात, नवीन उत्परिवर्तन-वेळ वाचत नाहीत; निरीक्षण केलेले चुकणे किंवा SQLite फॉलबॅक निरीक्षणाची तुलना अनुपस्थित Redis की म्हणून केली जाते. अप्रचलित पिन एका CAS मध्ये बदलल्या जातात, त्यामुळे लेट कमांड नवीन, भिन्न पिन बदलू किंवा हटवू शकत नाही. Redis रीड्स अणुरीत्या मूल्य आणि उर्वरित सर्व्हर TTL परत करते; सकारात्मक PTTL (किंवा कालबाह्यता नाही) जिवंतपणा निर्धारित करते, लेखकाचा JSON टाइमस्टॅम्प किंवा वाचकाचे घड्याळ नाही. स्थानिक स्नॅपशॉट नकाशा जे स्थानिक अंतिम मुदतीपर्यंत TTL शिल्लक आहे; विद्यमान JSON की वाचनीय राहतात आणि त्यांचे कच्चे बाइट्स CAS साठी राखून ठेवले जातात. Redis हे उत्तर देत असताना सत्याचा एकमेव स्त्रोत आहे. पुष्टी केलेले शेअर केलेले अप्सर्ट, टच आणि डिलीट स्थानिक एंट्री काढून टाकतात, ती कधीही स्थापित किंवा रीफ्रेश करू नका. Redis मार्गावरील SQLite मध्ये Redis त्रुटी, कालबाह्यता किंवा प्रवेश संपृक्तता, पूर्वीप्रमाणेच TTL-बाउंडेड या उदाहरणाचे स्वतःचे फॉलबॅक निर्णय आहेत. नंतरच्या आउटेजमध्ये हरवलेल्या लोकल पिनसाठी एक नवीन पिक (एक प्रॉम्प्ट-कॅशे मिस) खर्च येतो, चुकीचे किंवा निष्कासित खाते नाही. नाकारलेले अप्सर्ट सामायिक विजेते आणि त्याचे उर्वरित TTL आण्विकरित्या परत करतात: सामान्य निवड मॅप केलेल्या स्थानिक अंतिम मुदतीची पुनर्तपासणी करते आणि स्थिर-लाइव्ह पात्र विजेत्याचा वापर करते, वापरास स्पर्श करते आणि दुसऱ्या सामायिक लेखनाशिवाय त्या खात्यासाठी लॉगिंग करते. ते अनुपलब्ध असल्यास, निवड स्थानिक उमेदवार ठेवते, शेअर केलेला पिन अपरिवर्तित ठेवते आणि एक डीबग संदेश उत्सर्जित करते. नाकारलेले CAS SQLite लिहित नाही; Redis त्रुटी, कालबाह्यता किंवा प्रवेश संपृक्तता त्याऐवजी विद्यमान स्थानिक ऑपरेशन लागू करतात. पाठवलेल्या उत्परिवर्तनाचे उत्तर कालबाह्य झाल्यानंतर (स्वीकारलेले, नाकारलेले किंवा त्रुटी) आल्यास, सिंक्रोनस अचूक अनुक्रमित-मूल्य तुलना-आणि-हटवणे केवळ बाइट-समान टाइमआउट फॉलबॅक पंक्ती काढून टाकते. ती तुलना आणि हटवणे यात काही वाट नाही; नवीन आउटेज लेखन जतन केले आहे. संरक्षित निष्कासन अयशस्वी खात्याचा स्वतःचा स्थानिक पिन Redis डाउन करून देखील काढून टाकते आणि सामायिक निष्कासन पुष्टी केल्यानंतर ते पुन्हा साफ करते. पूर्वीची शेअर केलेली प्रलंबित प्रत्युत्तरे बेदखल केलेली स्थानिक पिन पुनर्संचयित करू शकत नाहीत कारण सामायिक यश कधीही SQLite लिहित नाही. नंतरचे आउटेज फॉलबॅक खाते पुन्हा चालू करू शकते; नंतर स्वीकारलेले सामायिक लेखन फक्त Redis मध्ये अस्तित्वात आहे. Redis misses स्थानिक फॉलबॅक राज्याचा सल्ला घेऊ नका. ड्रायव्हर बंद असताना, नव्याने निवडलेल्या पिन लेगेसी फोर-फील्ड SQLite JSON आकार राखून ठेवतात; फक्त Redis राउटिंग हॅश केलेले खाते ओळख जोडते. प्रीफेच केलेले पिन त्यांच्या एक्सपायरी सीमेवर पुन्हा तपासले जातात. Redis नॉन-लीज सिलेक्शन स्टोअर पुन्हा वाचते, परंतु सिंक्रोनस लीज प्लॅनिंग अद्याप प्रीफेच आणि प्लॅनिंग (एक स्वीकारलेली सर्वोत्तम-प्रयत्न विंडो) दरम्यान बाहेर काढलेला पिन वापरू शकते. लीज कमिट टिकाऊ दाव्यानंतर खाती बदलू शकत नाही: नाकारलेल्या अप्सर्टवर ते दावा केलेल्या उमेदवाराला फक्त त्या विनंतीसाठी ठेवते आणि सामायिक विजेत्याला अस्पर्श ठेवते, त्यामुळे सर्व उदाहरणे त्या मार्गावर करारबद्ध असतात. उर्वरित सारणी अजूनही लागू आहे: हे कॉम्बो सत्र चिकटपणा, मूळ Codex टर्न पिन, खाते सेमाफोर्स, लॉकआउट्स, खर्च मर्यादा, कॉन्फिगरेशन किंवा कॉल लॉग शेअर करत नाही.

हार्डवेअर: प्रति-इंस्टन्स समवर्ती लाँग `/v1/responses` आहे a** मेमरी-बजेट** प्रश्न (heap + inflight-byte / #10110). `N` स्वतंत्र `DATA_DIR` s अजूनही गुणाकार ढीग: होस्ट RAM `N × cgroup` कव्हर केले पाहिजे, "N = 8 सह एक 16 Gi पॉड नाही." एका SQLite फाईलवर कधीही `replicas > 1` नका.

स्केच तयार करा (दोन ढीग, दोन खंड — `deploy.replicas: 2` नाही):

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

इन-प्रोसेस घनता ( HTTP पृथक्करणावरील कॉम्प्रेशन) [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023) आहे. शेअर्ड ड्युरेबल स्टेटवरील एक लॉजिकल क्लस्टर [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) आहे.

## Docker मधील Gemini प्रादेशिक त्रुटी

Google AI Studio / Gemini API कडून HTTP 400 सोबत FAILED_PRECONDITION आणि
`User location is not supported for the API use.` असा प्रतिसाद मिळू शकतो. होस्टवर विनंती यशस्वी झाली
तरी कंटेनर समान आउटबाउंड मार्ग वापरतो हे सिद्ध होत नाही. DNS क्रम,
IPv4/IPv6 कनेक्टिव्हिटी, VPN राउटिंग आणि कॉन्फिगर केलेले प्रॉक्सी वेगवेगळे असू शकतात.
[Google चे समर्थित प्रदेश](https://ai.google.dev/gemini-api/docs/available-regions)
तसेच प्रत्यक्ष कनेक्शन मार्ग तपासा; केवळ ही त्रुटी API key चुकीची असल्याचे दर्शवत नाही.

### कनेक्शन-विशिष्ट प्रॉक्सीला प्राधान्य द्या

प्रभावित Gemini कनेक्शनसाठी OmniRoute चे [प्रति-कनेक्शन प्रॉक्सी कॉन्फिगरेशन](../ops/PROXY_GUIDE.md#4-level-proxy-system)
वापरा, त्यानंतर त्याच मॉडेलसह **कनेक्शनची चाचणी घ्या** आणि एक छोटी विनंती पुन्हा करा.
यामुळे राउटिंगमधील बदल त्या कनेक्शनपुरता मर्यादित राहतो. कंटेनरमधून प्रॉक्सीपर्यंत
पोहोचता येते आणि कनेक्शन प्रत्यक्षात तोच प्रॉक्सी निवडते याची खात्री करा.
मार्ग बदलल्याने अपस्ट्रीम प्रादेशिक पात्रतेची हमी मिळत नाही.

### होस्ट आणि कंटेनर नेटवर्किंगची तुलना करा

प्रमाणित परिणामांची तुलना करताना key, मॉडेल आणि विनंती समान ठेवा; क्रेडेन्शियल्स,
प्रॉक्सी पासवर्ड किंवा संपूर्ण authorization headers कधीही एखाद्या issue मध्ये पेस्ट करू नका.
प्रथम, होस्टवर आणि कंटेनरमध्ये समान कमांड वापरून OS resolver कोणते address families
उपलब्ध करून देतो ते तपासा:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

`omniroute` च्या जागी तुम्ही चालवत असलेली service वापरा (उदाहरणार्थ, `omniroute-web`).
या कमांड्स क्रेडेन्शियल्स किंवा IP addresses शिवाय address families दाखवतात. परत मिळालेला `6`
फक्त IPv6 DNS परिणाम दर्शवतो: तो वापरण्यायोग्य IPv6 मार्ग किंवा API access सिद्ध
करत **नाही**. जिथे `curl` इन्स्टॉल केलेले आहे, तिथे दोन्ही वातावरणांत
`curl -4 -I https://generativelanguage.googleapis.com` आणि
`curl -6 -I https://generativelanguage.googleapis.com` यांची तुलना करा.
HTTP प्रतिसाद हा त्या तपासणीसाठी कनेक्टिव्हिटी सिद्ध करतो, मग तो प्रमाणीकरण न झाल्यामुळे आलेला
त्रुटी प्रतिसाद असला तरीही; केवळ प्रमाणित मॉडेल विनंती Gemini पात्रतेची चाचणी करते.

### होस्ट-स्तरीय पर्याय: कार्यरत IPv6 आणि resolver धोरण

[#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) च्या रिपोर्टरने
त्यांच्या वातावरणात container IPv6 सक्षम करून आणि glibc address selection बदलून
प्रवेश पूर्ववत केला. हा वातावरण-विशिष्ट पर्याय समजा. Resolver प्राधान्ये बदलण्यापूर्वी
होस्टवरील IPv6 प्रत्यक्षात कार्यरत आहे, कंटेनरचे egress/routing योग्य आहे आणि firewall
नियम परवानगी देतात याची खात्री करा. केवळ खाजगी ULA address असणे सार्वजनिक IPv6
कनेक्टिव्हिटी सिद्ध करत नाही.

Compose च्या default network शी आधीच जोडलेल्या services साठी, हा fragment त्या
network वर IPv6 सक्षम करतो; तुमच्या service, ports, volumes आणि configuration चा
उर्वरित भाग तसाच ठेवा:

```yaml
networks:
  default:
    enable_ipv6: true
```

नामांकित network साठी, service प्रत्यक्षात ज्या network मध्ये सहभागी होते त्यावर ते सक्षम करा.
Docker ULA subnet वाटप करू शकतो; तुमच्या network ला आवश्यकता असेल तेव्हाच स्पष्टपणे
नमूद केलेला, इतरांशी overlap न होणारा subnet निवडा. [Docker IPv6 networking](https://docs.docker.com/engine/daemon/ipv6/)
आणि [Compose network options](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6) पहा.

**glibc-आधारित image** वर `/etc/gai.conf` address selection बदलू शकते. सध्याच्या
repository मधील Dockerfile Debian वापरते; सानुकूल musl-आधारित images ही यंत्रणा
वापरत नाहीत. रिपोर्ट केलेला बदल ULA label `label fc00::/7 6` वरून
`label fc00::/7 1` असा बदलतो. Image च्या संपूर्ण policy table पासून सुरुवात करा आणि
त्यातील इतर entries जतन करा: एखादी `label` किंवा `precedence` entry जोडल्यास ते default
table बदलले जाते, त्यामुळे फक्त बदललेली ओळ असलेली file पुरेशी नाही.
[glibc configuration reference](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
मध्ये हे semantics दस्तऐवजीकृत आहेत. पुनरावलोकन केलेली file `/etc/gai.conf` येथे read-only
पद्धतीने bind-mount करा आणि ती लागू करण्यासाठी service पुन्हा तयार करा.

यामुळे **त्या कंटेनरमधील सर्व outbound traffic** साठी OS address selection बदलते.
यामुळे प्रत्येक application ला IPv6 निवडण्याची सक्ती होत नाही: Node चा DNS क्रम आणि
connection selection सुद्धा महत्त्वाचे आहेत. विशेषतः, `--dns-result-order=ipv4first`
IPv4 ला प्राधान्य देतो आणि IPv4-only अपयशासाठी तो उपाय नाही.
[Node DNS ordering](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder) पहा.

कोणताही होस्ट-स्तरीय बदल केल्यानंतर Gemini आणि तुमच्या इतर providers ची पुन्हा चाचणी करा.
बदल मागे घेण्यासाठी, सानुकूल `gai.conf` mount काढून टाका, आधीचे network configuration
पुनर्स्थापित करा आणि maintenance window दरम्यान प्रभावित service/network पुन्हा तयार करा.
Network पुन्हा तयार केल्याने त्याच्याशी जोडलेल्या इतर containers मध्ये व्यत्यय येऊ शकतो;
persistent data volume हटवू नका.

## महत्त्वाच्या नोंदी

- **SQLite WAL मोड:** OmniRoute ला नवीनतम बदल `storage.sqlite` मध्ये चेकपॉइंट करता यावेत यासाठी `docker stop` पूर्ण होऊ द्यावे. समाविष्ट केलेल्या Compose फाइल्समध्ये आधीच 40s चा स्टॉप ग्रेस पीरियड सेट केलेला आहे. तुम्ही इमेज थेट चालवत असल्यास, `--stop-timeout 40` कायम ठेवा.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** नियमित/लेखनापूर्वीचे बॅकअप बाह्यरीत्या व्यवस्थापित केले जात असल्यास हे `true` वर सेट करा. विद्यमान डेटाबेसच्या माइग्रेशनसाठी तरीही स्वतंत्र टिकाऊ सुरक्षा स्नॅपशॉट आणि मोठ्या प्रमाणावरील माइग्रेशनसाठी संरक्षक उपाय आवश्यक आहेत.
- **डेटा सातत्य:** कंटेनर रीस्टार्टदरम्यान तुमचा डेटाबेस, की आणि कॉन्फिगरेशन टिकवून ठेवण्यासाठी नेहमी `/app/data` वर व्हॉल्यूम माउंट करा.
- **पोर्ट कॉन्फिगरेशन:** डीफॉल्ट `20128` पोर्ट बदलण्यासाठी `PORT` एन्व्हायर्नमेंट व्हेरिएबल ओव्हरराइड करा.

## हे देखील पहा

- [VM डिप्लॉयमेंट मार्गदर्शक](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare सेटअप
- [Fly.io डिप्लॉयमेंट मार्गदर्शक](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.io वर डिप्लॉय करा
- [एन्व्हायर्नमेंट कॉन्फिगरेशन](../reference/ENVIRONMENT.md) — संपूर्ण `.env` संदर्भ
