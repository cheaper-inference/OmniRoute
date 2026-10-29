# 🐳 Docker Guide — OmniRoute (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Docker کی تنصیب کا مکمل حوالہ۔ فوری آغاز کے لیے [README کا Docker سیکشن](../README.md#-docker) دیکھیں۔

## فہرستِ مضامین

- [فوری اجرا](#quick-run)
- [انوائرمنٹ فائل کے ساتھ](#with-environment-file)
- [Docker Compose](#docker-compose)
- [دستیاب پروفائلز](#available-profiles)
- [جب OmniRoute Docker میں چل رہا ہو تو ہوسٹ CLI ٹولز کی تشکیل](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis سائڈکار](#redis-sidecar)
- [پروڈکشن Compose](#production-compose)
- [Dockerfile کے مراحل](#dockerfile-stages)
- [اہم انوائرمنٹ ویری ایبلز](#critical-environment-variables)
- [Caddy (HTTPS) کے ساتھ Docker Compose](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare کوئیک ٹنل](#cloudflare-quick-tunnel)
- [امیج ٹیگز](#image-tags)
- [Docker میں ڈیش بورڈ اپ ڈیٹس](#dashboard-updates-in-docker)
- [دستیابی: ڈیفالٹ SQLite صرف ایک ریپلیکا کی معاونت کرتا ہے](#availability-default-sqlite-is-single-replica)
- [Docker کے اندر Gemini کی علاقائی خرابیاں](#gemini-regional-errors-inside-docker)
- [اہم نوٹس](#important-notes)

---

## فوری اجرا

> **ایک کمانڈ سے خود ہوسٹ کرنا چاہتے ہیں؟**
> [سیلف ہوسٹ گائیڈ](../getting-started/SELF_HOST_GUIDE.md) دیکھیں —
> `docker compose -f docker-compose.selfhost.yml up -d` (شائع شدہ امیج +
> Redis، صرف لوپ بیک، پروفائل منتخب کرنے کی ضرورت نہیں)۔ ذیل میں دیا گیا فوری اجرا
> ان صارفین کے لیے سنگل کنٹینر طریقہ ہے جو Redis پہلے ہی کہیں اور چلا رہے ہیں۔

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## انوائرمنٹ فائل کے ساتھ

```bash
# پہلے .env کو کاپی اور ترمیم کریں
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
# بنیادی پروفائل (کوئی CLI ٹولز نہیں)
docker compose --profile base up -d

# CLI پروفائل (Claude Code، Codex، OpenClaw پہلے سے شامل ہیں)
docker compose --profile cli up -d

# ہوسٹ پروفائل (بنیادی طور پر Linux کے لیے؛ ہوسٹ CLI بائنریز کو صرف پڑھنے کی اجازت کے ساتھ ماؤنٹ کرتا ہے)
docker compose --profile host up -d

# ویب پروفائل (ویب سیشن فراہم کنندگان کے لیے Chromium/Playwright)
docker compose --profile web up -d

# CLI + CLIProxyAPI سائڈکار یکجا کریں
docker compose --profile cli --profile cliproxyapi up -d
```

## دستیاب پروفائلز

OmniRoute تنصیب کی بنیادی اقسام کے لیے Compose پروفائلز فراہم کرتا ہے۔ اپنے ماحول سے مطابقت رکھنے والا پروفائل منتخب کریں۔

| پروفائل         | سروس             | کب استعمال کریں                                                                                                                                              | کمانڈ                                        |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `base` (ڈیفالٹ) | `omniroute-base` | ہیڈ لیس سرور / کم سے کم رن ٹائم، فراہم کنندہ کے کوئی CLIs شامل نہیں                                                                                          | `docker compose --profile base up -d`        |
| `cli`           | `omniroute-cli`  | ایجنٹ پر مبنی ورک فلو جو `omniroute providers/setup/doctor` اور شامل شدہ CLIs (Codex، Claude Code، Droid، OpenClaw) کو کال کرتے ہیں                          | `docker compose --profile cli up -d`         |
| `host`          | `omniroute-host` | ایسے Linux ہوسٹس جو `~/.local/bin`، `~/.codex`، `~/.claude` وغیرہ کو صرف پڑھنے کی اجازت کے ساتھ ماؤنٹ کر کے ہوسٹ CLIs تک `network_mode` جیسی رسائی چاہتے ہیں | `docker compose --profile host up -d`        |
| `cliproxyapi`   | `cliproxyapi`    | اپ اسٹریم CLI پراکسی کے لیے پورٹ `8317` پر [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) سائڈکار چلائیں                                        | `docker compose --profile cliproxyapi up -d` |
| `web`           | `omniroute-web`  | ایسے ویب سیشن فراہم کنندگان جنہیں براؤزر درکار ہے: `gemini-web`، `claude-web`، `claude-turnstile` (`runner-web` بناتا ہے، Chromium شامل ہے)                  | `docker compose --profile web up -d`         |

> متعدد پروفائلز یکجا کیے جا سکتے ہیں: `docker compose --profile cli --profile cliproxyapi up -d`۔

## جب OmniRoute Docker میں چل رہا ہو تو میزبان CLI ٹولز کی تشکیل

`omniroute setup-codex`، `setup-claude`، `config set <tool>` اور ڈیش بورڈ کا
**کنفیگ محفوظ کریں** بٹن، سبھی `~/.codex/*.config.toml` جیسی فائلیں لکھتے ہیں۔ ان راستوں کا
مطلب صرف اسی مشین پر ہوتا ہے جہاں CLI حقیقتاً چلتا ہے۔ انہیں کنٹینر کے اندر
چلانے سے تحریر کنٹینر کی اپنی ہوم ڈائریکٹری (`/home/node` —
امیج `USER node` کے طور پر چلتی ہے) میں محفوظ ہوتی ہے، جہاں کوئی میزبان CLI اسے کبھی نہیں پڑھے گا اور جہاں کنٹینر
دوبارہ بنائے جانے کے ساتھ ہی یہ ضائع ہو جاتی ہے۔

OmniRoute اس صورتِ حال کا پتہ لگاتا ہے اور ناقابلِ استعمال کامیابی کی اطلاع دینے کے بجائے
ہدایات کے ساتھ تحریر سے انکار کرتا ہے: CLI کوڈ `2` کے ساتھ بند ہوتا ہے، اور API
`containerEphemeralTarget: true` کے ساتھ `422` جواب دیتا ہے۔

### تجویز کردہ: CLI کو میزبان پر اور OmniRoute کو Docker میں چلائیں

کنٹینر API فراہم کرتا ہے؛ CLI آپ کے میزبان ٹولز کی تشکیل کرتا ہے۔

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI کو کنٹینر کی طرف متوجہ کریں
omniroute setup-codex                      # آپ کے میزبان پر اصل ~/.codex لکھتا ہے
```

جب Codex، Claude Code، Cursor یا اسی نوعیت کے ٹولز آپ کے
لیپ ٹاپ پر چلتے ہوں تو یہ درست انتخاب ہے — اور یہی معمول کی ترتیب ہے۔

### متبادل: میزبان کی کنفیگ ڈائریکٹریوں کو bind-mount کریں (`host` پروفائل)

اگر آپ چاہتے ہیں کہ کنٹینر خود آپ کی میزبان کنفیگ لکھے، تو
ڈائریکٹریوں کو ماؤنٹ کریں اور `CLI_CONFIG_HOME` کو ماؤنٹ روٹ کی طرف متوجہ کریں۔ `host` پروفائل
پہلے ہی ایسا کرتا ہے:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

bind mount ہی راستے کو قابلِ اعتماد بناتا ہے: OmniRoute
`/proc/self/mountinfo` پڑھتا ہے اور ماؤنٹ شدہ راستوں پر تحریر کی اجازت دیتا ہے (اور ایسی ڈائریکٹریوں میں بھی
جن کی ذیلی ڈائریکٹریاں ماؤنٹس ہوں، جو بالکل اوپر دی گئی `/host-home` ساخت ہے)، جبکہ
غیر ماؤنٹ شدہ راستوں پر تحریر سے اب بھی انکار کرتا ہے۔

### ہنگامی راستہ: کنٹینر کے اپنے CLIs کی تشکیل کریں (بہت احتیاط سے استعمال کریں)

جب CLIs واقعی کنٹینر کے اندر موجود ہوں (`cli` پروفائل)، تو تحریر
دانستہ ہوتی ہے۔ کسی بھی `setup-*` کمانڈ کو `--allow-container-write` دیں، یا سرور کے لیے
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` مقرر کریں۔ تحریر اس تنبیہ کے ساتھ جاری رہتی ہے
کہ یہ کنٹینر کے ختم ہونے کے بعد باقی نہیں رہے گی۔

> **سیکیورٹی تنبیہ — `cli` پروفائل + `docker.sock` ماؤنٹ۔**
> `cli` پروفائل `/var/run/docker.sock` کو bind-mount کرتا ہے تاکہ کنٹینر کے اندر موجود
> خودکار اپڈیٹر میزبان daemon کے ذریعے اسٹیک دوبارہ بنا سکے
> (`src/lib/system/autoUpdate.ts` اس socket کی جانچ کرتا ہے اور اس کی
> غیر موجودگی میں Docker راستہ چھوڑ دیتا ہے)۔ یہ socket **میزبان کے root اعتماد کی
> حد** ہے: جو کچھ بھی اس تک رسائی حاصل کر سکتا ہے، وہ میزبان Docker daemon کو
> root کے طور پر چلاتا ہے — وہ میزبان پر موجود کسی بھی کنٹینر کو بنا، معائنہ کر، روک اور حذف کر سکتا ہے۔
> مضمرات:
>
> 1. **`cli` پروفائل کی پورٹ کبھی بھی نیٹ ورک پر ظاہر نہ کریں۔** اسے
>    `127.0.0.1` پر شائع کریں (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — LAN سے قابلِ رسائی `cli` پروفائل، ڈیش بورڈ کی سطح کے کسی بھی RCE کو
>    میزبان پر مکمل قبضے میں بدل دیتا ہے۔
> 2. **`cli` پروفائل میں میزبان کی کوئی اضافی ڈائریکٹری bind نہ کریں۔**
>    Docker socket کے ساتھ کوئی بھی اضافی ماؤنٹ کنٹینر کو آپ کے فائل سسٹم
>    اور میزبان کنفیگ پر مکمل پڑھنے/لکھنے کی رسائی دے دیتا ہے۔ اگر کسی ٹول کو
>    پروجیکٹ دیکھنے کی ضرورت ہو، تو اسے CLI binary کے ساتھ مقامی طور پر چلائیں — اسے
>    `cli` کنٹینر میں ماؤنٹ نہ کریں۔
>
> اگر آپ کو کنٹینر کے اندر خودکار اپڈیٹ کی ضرورت نہیں، تو `cli` پروفائل بند رکھیں
> (`COMPOSE_PROFILES=core,redis` یا اس سے مختصر)۔ دیگر پروفائلز
> Docker socket کو ماؤنٹ نہیں کرتے۔
>
> MITM سے متعلق threat model کے لیے `docs/security/MITM-TPROXY-DECRYPT.md` (git؛ `/docs` میں مرتب نہیں کیا گیا) دیکھیں،
> اور `codex`/`claude-code`/`droid`/`openclaw` binary کے ماخذ کے سلسلے کے لیے
> `docs/security/SUPPLY_CHAIN.md` دیکھیں۔

## Redis سائیڈکار

OmniRoute تقسیم شدہ ریٹ لمیٹر اور مشترکہ کیش کے لیے Redis پر انحصار کرتا ہے۔ `redis` سروس `docker-compose.yml` میں **ہمیشہ متعین ہوتی ہے** (اس پر کوئی پروفائل پابندی نہیں) اور کسی بھی دوسرے پروفائل کے ساتھ شروع ہو جاتی ہے۔

| تفصیل                   | قدر                                    |
| ----------------------- | -------------------------------------- |
| امیج                    | `redis:7-alpine`                       |
| کنٹینر کا نام           | `omniroute-redis`                      |
| اندرونی پورٹ            | `6379`                                 |
| ہوسٹ پورٹ (اوور رائیڈ)  | `REDIS_PORT` (ڈیفالٹ `6379`)           |
| ہوسٹ بائنڈ (اوور رائیڈ) | `REDIS_BIND_HOST` (ڈیفالٹ `127.0.0.1`) |
| والیوم                  | `omniroute-redis-data` → `/data`       |
| صحت کی جانچ             | `redis-cli ping` (10s وقفہ)            |

متعلقہ ماحولیاتی متغیرات:

- `REDIS_URL` — ایپ میں داخل کی جانے والی کنکشن اسٹرنگ (ڈیفالٹ `redis://redis:6379`)۔
- `REDIS_PORT` — Redis کنٹینر کے لیے ہوسٹ سائیڈ پورٹ میپنگ۔
- `REDIS_BIND_HOST` — وہ ہوسٹ انٹرفیس جس پر پورٹ شائع کیا جاتا ہے۔ ڈیفالٹ `127.0.0.1` ہے۔

> **ڈیفالٹ طور پر لوپ بیک کیوں:** سائیڈکار `requirepass` کے بغیر چلتا ہے، اور ایپ
> کنٹینرز کمپوز نیٹ ورک (`redis:6379`) کے ذریعے اس تک پہنچتے ہیں — شائع شدہ پورٹ
> صرف ہوسٹ سائیڈ ٹولنگ (`redis-cli`، مقامی `npm run dev`) کے لیے موجود ہے۔ اسے
> `0.0.0.0` پر شائع کرنے سے بغیر تصدیق والا Redis آپ کے LAN کے ہر ہوسٹ کے سامنے ظاہر ہو جائے گا۔ اگر آپ
> `REDIS_BIND_HOST=0.0.0.0` مقرر کریں، تو سروس کے `command:` میں `--requirepass` بھی شامل کریں۔

**Redis کو غیر فعال کرنے** کی سفارش نہیں کی جاتی (ریٹ لمیٹر اِن میموری فال بیک پر منتقل ہو کر محدود کارکردگی دکھائے گا)۔ اگر ایسا کرنا ضروری ہو، تو `docker-compose.yml` میں موجود `redis:` سروس بلاک کو ہٹا دیں/کمنٹ کر دیں یا اسے صفر تک اسکیل کر دیں:

```bash
docker compose up -d --scale redis=0
```

## پروڈکشن کمپوز

ڈیولپمنٹ کے ساتھ چلنے والے ایک الگ تھلگ پروڈکشن اسنیپ شاٹ کے لیے `docker-compose.prod.yml` استعمال کریں۔

| تفصیل                | قدر                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| فائل                 | `docker-compose.prod.yml`                                                                        |
| ڈیفالٹ ڈیش بورڈ پورٹ | `PROD_DASHBOARD_PORT=20130` (اندرونی `${DASHBOARD_PORT:-20128}` سے میپ شدہ)                      |
| ڈیفالٹ API پورٹ      | `PROD_API_PORT=20131`                                                                            |
| امیج                 | `omniroute:prod` (`runner-cli` ٹارگٹ سے تیار کردہ)                                               |
| Redis کنٹینر         | `omniroute-redis-prod` (`redis:8.6.2`، مختص `redis-prod-data` والیوم)                            |
| ڈیٹا والیوم          | `omniroute-prod-data` (نام زدہ، دوبارہ تعمیر کے دوران برقرار رہنے والا)                          |
| صحت کی جانچیں        | `node healthcheck.mjs` + `redis-cli ping`، جبکہ `depends_on` کو Redis کی صحت سے مشروط کیا گیا ہے |

استعمال کا طریقہ:

```bash
# پروڈکشن اسٹیک بنائیں اور شروع کریں
docker compose -f docker-compose.prod.yml up -d --build

# لاگز کو براہِ راست اسٹریم کریں
docker compose -f docker-compose.prod.yml logs -f

# بند کریں (والیوم برقرار رکھیں)
docker compose -f docker-compose.prod.yml down
```

پروڈکشن اسٹیک ڈیولپمنٹ کمپوز کے متوازی چلتا ہے (کنٹینر کے نام، پورٹس اور والیوم مختلف ہیں)، اس لیے پروڈکشن کو فعال رکھتے ہوئے آپ مقامی طور پر کام جاری رکھ سکتے ہیں۔

## Dockerfile کے مراحل

ریپوزٹری ایک کثیر مرحلہ Dockerfile (`Dockerfile`) فراہم کرتی ہے۔ چار مراحل دستیاب ہیں؛ اپنے استعمال کے مطابق درست `target` منتخب کریں۔

| مرحلہ         | بنیادی امیج           | مقصد                                                                                                                                                                                                                                                                                                |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | dependencies انسٹال کرتا ہے (`npm ci --legacy-peer-deps`) اور `npm run build` چلاتا ہے (بطور ڈیفالٹ Turbopack — ذیل میں تعمیر کے وقت کے وسائل دیکھیں)                                                                                                                                               |
| `runner-base` | `node:26-trixie-slim` | Next.js کے standalone آؤٹ پٹ کے ساتھ پروڈکشن رن ٹائم۔ **کوئی provider CLI شامل نہیں ہے۔**                                                                                                                                                                                                           |
| `runner-cli`  | `runner-base`         | `git`، `docker.io`، `docker-compose` اور عالمی CLIs شامل کرتا ہے: `@openai/codex`، `@anthropic-ai/claude-code`، `droid`، `openclaw`۔ **agentic workflows کے لیے اسے منتخب کریں۔**                                                                                                                   |
| `runner-web`  | `runner-base`         | ویب سیشن providers کے لیے Playwright + ایک Chromium براؤزر (`--with-deps`) شامل کرتا ہے: `gemini-web`، `claude-web`، `claude-turnstile`۔ **ان providers کو استعمال کرتے وقت اسے منتخب کریں** — اس کے بغیر سادہ امیج درخواست کے وقت ناکام ہو جاتی ہے (Release Channels کے تحت `-web` کا نوٹ دیکھیں)۔ |

کسی مخصوص target کو دستی طور پر تعمیر کریں:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### تعمیر کے وقت کے وسائل

تین build args یہ کنٹرول کرتے ہیں کہ `builder` مرحلہ کتنے وسائل استعمال کرتا ہے۔ یہ صرف تعمیر کے وقت کے لیے ہیں —
`OMNIROUTE_MEMORY_MB` (ذیل میں) ایک الگ رن ٹائم کنٹرول ہے۔

| Build arg                   | ڈیفالٹ | اثر                                                                                                                   |
| --------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`    | `0` webpack کے ساتھ تعمیر کرتا ہے: زیادہ سے زیادہ میموری کا استعمال کم، مگر رفتار سست۔ `1` Turbopack کو فعال کرتا ہے۔ |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144` | شروع کیے گئے `next build` کے لیے V8 heap کی حد (`--max-old-space-size`)۔                                              |
| `OMNIROUTE_BUILD_WORKERS`   | `2`    | `CIRCLE_NODE_TOTAL` کو قدر فراہم کرتا ہے؛ Next صفحاتی ڈیٹا جمع کرنے کے لیے `workers = N - 1` اخذ کرتا ہے۔             |

`OMNIROUTE_BUILD_WORKERS` وہ قدر ہے جسے کسی بڑے builder پر بڑھانا چاہیے، اور جب محدود وسائل والی build، `✓ Compiled successfully` کے **بعد** ناکام ہو تو سب سے پہلے اسی پر شبہ کرنا چاہیے۔ ہر
page-data worker ایک علیحدہ process ہے، اور بنیادی `next build` بھی الگ process ہے؛
ایک فعال VPS پر مسئلے کی بازتخلیق (issue #7518) میں ہر process کا زیادہ سے زیادہ RSS
~4.5 GB ناپا گیا، جو `NODE_OPTIONS` heap flag سے آزاد تھا (Turbopack، V8 heap سے
باہر native/Rust memory میں compile کرتا ہے)۔ `2` کی ڈیفالٹ قدر (→ 1 worker، کل 2
processes) ان 16 GB / 4 vCPU GitHub-hosted runners کے مطابق رکھی گئی ہے جنہیں
publish pipeline استعمال کرتی ہے۔ `8` پر (→ 7 workers) اس runner کی میموری ختم ہو گئی اور
buildkit نے `ResourceExhausted: ... cannot allocate memory` کے ساتھ مرحلہ ناکام کر دیا؛
`3` (→ 2 workers) بھی اس وقت دستیاب میموری میں سما نہ سکا جب ہر process کا RSS قیاس کرنے
کے بجائے براہ راست ناپا گیا۔ `tests/unit/docker-build-memory-budget.test.ts`
ناپی گئی قدر کے مقابل حساب کرتا ہے اور اگر کوئی بھی knob
runner کی گنجائش سے بڑھ جائے تو ناکام ہو جاتا ہے۔

Turbopack ایسی native Rust memory میں compile کرتا ہے جو V8 heap کے **باہر** ہوتی ہے، اس لیے
`OMNIROUTE_BUILD_MEMORY_MB` اسے محدود نہیں کرتا۔ میموری کی حد رکھنے والے host پر
build کو OOM killer کسی بھی error text کے بغیر SIGKILL کر دیتا ہے — یہ بس
`Creating an optimized production build` کے درمیان رک جاتی ہے، جو out-of-memory کے بجائے
hang معلوم ہوتا ہے۔ اسی لیے `Dockerfile` بطور ڈیفالٹ webpack استعمال کرتا ہے
(`OMNIROUTE_USE_TURBOPACK=0`)، برخلاف `npm run dev` / `npm run build` کے، جہاں
Turbopack کوڈ کا ڈیفالٹ ہے: کسی build arg کے بغیر سادہ `docker build .` (جسے
Railway اور دوسرے one-click hosts چلاتے ہیں) میموری کی حد والے
builder پر خاموشی سے ناکام نہیں ہونا چاہیے۔ شائع شدہ امیجز پہلے ہی `docker-publish.yml` میں
`OMNIROUTE_USE_TURBOPACK=0` واضح طور پر فراہم کرتی ہیں۔ کافی RAM والے builder پر،
تیز تر build کے لیے Turbopack کو فعال کریں:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` فعال ہے، اس لیے `next build` ایک parent **اور** ایک worker
process چلاتا ہے اور ہر ایک علیحدہ طور پر `OMNIROUTE_BUILD_MEMORY_MB` کی پابندی کرتا ہے۔ container
کی حد کو اس قدر کے تقریباً دو گنا سے زیادہ رکھیں، صرف ایک گنا نہیں۔

اس tree پر پیمائش (`--target runner-base`، `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Container کی حد | نتیجہ                                       |
| --------- | --------------- | ------------------------------------------- |
| Turbopack | 8 GiB / 16 GiB  | دونوں پر خاموشی سے OOM-killed               |
| webpack   | 8 GiB           | build worker کو SIGKILL کر دیا گیا          |
| webpack   | 12 GiB          | کامیاب، زیادہ سے زیادہ استعمال 11.1 GiB رہا |

### رن ٹائم ڈیفالٹس

`runner-base` کی جانب سے export کیے گئے ڈیفالٹس: `PORT=20128`، `HOSTNAME=0.0.0.0`، `OMNIROUTE_MEMORY_MB=1024`، `NODE_OPTIONS=--max-old-space-size=1024`، `DATA_DIR=/app/data`، `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`۔

Docker میں میموری کا طرزِ عمل:

- امیج `OMNIROUTE_MEMORY_MB=1024` مقرر کرتی ہے اور اس سے `NODE_OPTIONS=--max-old-space-size=1024` اخذ کرتی ہے۔
- اصل سرور پراسیس standalone لانچر کے ذریعے شروع ہوتا ہے، جو `OMNIROUTE_MEMORY_MB` پڑھتا ہے اور `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` شامل کرتا ہے۔
- Node بار بار آنے والی `--max-old-space-size` کی آخری قدر استعمال کرتا ہے، لہٰذا `OMNIROUTE_MEMORY_MB` مقرر کرنے سے مؤثر Docker heap حد کنٹرول ہوتی ہے۔
- چونکہ امیج اسے ہمیشہ مقرر کرتی ہے، اس لیے لانچر کا اپنا RAM کے مطابق کیلیبریٹ کیا گیا fallback، Docker کے تحت کبھی لاگو نہیں ہوتا۔ کام کے بوجھ کے لیے اسے واضح طور پر بڑھائیں (ذیل میں جدول دیکھیں)۔ coding-agent کی `/v1/responses` کے لیے `2048` اب بھی بہت کم ہے۔

### کوڈنگ ایجنٹس کے لیے رن ٹائم RAM

1 GiB کا Docker ڈیفالٹ، dashboard/ہلکی chat کے لیے کم از کم حد ہے، production کے لیے مناسب سائز نہیں۔ طویل `POST /v1/responses` باڈیز (سینکڑوں پیغامات، درجنوں ٹولز) compression کے دوران متعدد in-memory graphs برقرار رکھتی ہیں۔ بیک وقت چلنے والی تقریباً 3 MiB / تقریباً 750k-token کی دو درخواستوں نے **12 GiB** old-space پر V8 کو abort کر دیا ہے (`FATAL ERROR: Reached heap limit`) اور 16 GiB cgroup OOM سے بھی ٹکرا چکی ہیں۔ [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) دیکھیں۔

**cgroup `--memory` کو heap سے زیادہ رکھیں** — native buffers، SQLite، اور compression intermediates، V8 سے باہر موجود ہوتے ہیں۔

| کام کا بوجھ                          | `OMNIROUTE_MEMORY_MB`   | کنٹینر / cgroup       | نوٹس                                                                                                       |
| ------------------------------------ | ----------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------- |
| Dashboard، ایک ہلکی chat             | `1024` (امیج ڈیفالٹ)    | ≥2 GiB                |                                                                                                            |
| ایک coding agent (Claude/Codex/Grok) | `8192`                  | ≥10 GiB               | عام single-session `/v1/responses`                                                                         |
| بیک وقت دو طویل `/v1/responses`      | `10240`–`12288`         | ≥12–16 GiB            | تقریباً 12 GiB heap پر V8 abort کی پیمائش ہوئی                                                             |
| بیک وقت تین یا زیادہ طویل contexts   | ایک پراسیس پر نہ چلائیں | سلسلہ وار / زیادہ RAM | ڈیفالٹ heavyweight admission میں 1 in-flight کی اجازت ہے؛ RAM کے بغیر اسے بڑھانے سے abort دوبارہ واقع ہوگا |

bare metal پر `omniroute serve`، `OMNIROUTE_MEMORY_MB` کے **unset** ہونے پر RAM کے تقریباً 35% کے مطابق کیلیبریٹ کرتا ہے (جسے `[512, 4096]` کی حدود میں رکھا جاتا ہے)۔ Docker ہمیشہ `1024` مقرر کرتا ہے، اس لیے official امیج میں یہ calibration کبھی نہیں چلتی۔

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## اہم Environment Variables

[ENVIRONMENT.md](../reference/ENVIRONMENT.md) میں دستاویزی defaults کے علاوہ، Docker کے تحت چلاتے وقت درج ذیل variables سب سے زیادہ اہم ہیں:

| Variable                      | مقصد                                                                                                                                                                                                                                                                                            | Default                        |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket bridge کے لیے مشترکہ secret۔ **production میں درکار ہے** — اسے ایک مضبوط random string پر سیٹ کریں۔                                                                                                                                                                                   | سیٹ نہیں (فراہم کرنا ضروری ہے) |
| `REDIS_URL`                   | rate limiter / cache backend کے لیے connection string                                                                                                                                                                                                                                           | `redis://redis:6379`           |
| `REDIS_PORT`                  | شامل شدہ Redis container کے لیے host-side port                                                                                                                                                                                                                                                  | `6379`                         |
| `REDIS_BIND_HOST`             | وہ host interface جس پر شامل شدہ Redis port شائع کیا جاتا ہے (جب تک آپ AUTH شامل نہ کریں، loopback)                                                                                                                                                                                             | `127.0.0.1`                    |
| `AUTO_UPDATE_HOST_REPO_DIR`   | self-update workflows کے لیے `/workspace/omniroute` پر `cli` profile میں mount کیا جانے والا host path                                                                                                                                                                                          | `.` (موجودہ directory)         |
| `OMNIROUTE_MEMORY_MB`         | Docker standalone server کے لیے runtime Node heap کی بالائی حد؛ اوپر دی گئی image default کو override کرتی ہے۔ Coding agents: `8192`+ ([runtime RAM](#runtime-ram-for-coding-agents) دیکھیں)۔                                                                                                   | `1024`                         |
| `DASHBOARD_PORT` / `API_PORT` | dashboard (20128) اور API (20129) کے exposed ports کو override کریں                                                                                                                                                                                                                             | `20128` / `20129`              |
| `APP_BIND_HOST`               | وہ host interface جس پر docker-compose، dashboard/API/live-WS ports شائع کرتا ہے۔ `REQUIRE_API_KEY=false` (default) کے ساتھ، `0.0.0.0` گمنام `/v1` proxy کو LAN کے لیے قابلِ رسائی بناتا ہے — رسائی صرف `REQUIRE_API_KEY=true` کے ساتھ یا سامنے reverse proxy موجود ہونے کی صورت میں وسیع کریں۔ | `127.0.0.1`                    |
| `CLIPROXY_BIND_HOST`          | وہ host interface جس پر docker-compose، `cliproxyapi` sidecar شائع کرتا ہے — اس کے data volume میں provider credentials محفوظ ہوتے ہیں۔                                                                                                                                                         | `127.0.0.1`                    |
| `OMNIROUTE_PLUGINS_DIR`       | وہ directory جسے runtime plugin scanner پڑھتا ہے اور جس میں plugins install کرتا ہے۔ جب plugins کو bind-mount کیا گیا ہو تو اسے سیٹ کریں: default، `HOME` کی پیروی کرتا ہے، جسے کسی image کے لیے export کرنا ضروری نہیں۔                                                                        | `~/.omniroute/plugins`         |
| `OMNIROUTE_BASE_PATH`         | جب app کو reverse proxy کے پیچھے publish کیا جائے تو URL subpath (مثلاً `/omniroute`)                                                                                                                                                                                                           | _(خالی = root)_                |
| `NEXT_PUBLIC_BASE_URL`        | subpath سمیت public browser origin (مثلاً `https://host/omniroute`)                                                                                                                                                                                                                             | سیٹ نہیں                       |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml` کے لیے host-side dashboard port                                                                                                                                                                                                                                       | `20130`                        |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` sidecar کے لیے host-side port                                                                                                                                                                                                                                                     | `8317`                         |

## ذیلی راستے پر ریورس پراکسی (Traefik / nginx)

Next.js کا `basePath` اسٹینڈ الون بنڈل میں کمپائل کیا جاتا ہے۔ OmniRoute ایپ کی روٹ پر موجود ایک سینٹینل فائل میں شامل شدہ قدر ریکارڈ کرتا ہے (`npm run build` کے دوران لکھی جاتی ہے؛
`scripts/docker/ensure-docker-base-path.mjs` کے ذریعے پڑھی جاتی ہے) اور کنٹینر شروع ہونے پر اس کا
`OMNIROUTE_BASE_PATH` سے موازنہ کرتا ہے۔ جب یہ مختلف ہوں اور امیج ڈومین روٹ کے لیے
بنائی گئی ہو، تو انٹری پوائنٹ `node dev/run-standalone.mjs` چلنے سے پہلے اسٹینڈ الون مینی فیسٹس،
ایمبیڈ شدہ `basePath`/`assetPrefix` لٹرلز (Next 16، SSR اثاثوں کے URLs صرف
`assetPrefix` سے رینڈر کرتا ہے — پیچر ذیلی راستہ اس میں بھی شامل کر دیتا ہے)، شامل شدہ
`/_next/static` اثاثہ URLs (کلائنٹ-ریفرنس مینی فیسٹس، میڈیا امپورٹس، پہلے سے رینڈر شدہ
خرابی کے صفحات) اور کلائنٹ `process.env` شِم کو دوبارہ لکھتا ہے۔

### Compose بلڈ (تجویز کردہ)

دونوں متغیرات `.env` میں سیٹ کریں، پھر دوبارہ بلڈ کریں تاکہ امیج اور رن ٹائم میں مطابقت ہو:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml`، `OMNIROUTE_BASE_PATH` کو Docker بلڈ آرگ اور رن ٹائم
ماحولیاتی متغیر، دونوں کے طور پر فارورڈ کرتا ہے۔

### پہلے سے بلڈ شدہ روٹ امیج + رن ٹائم ذیلی راستہ

شائع شدہ `diegosouzapw/omniroute:*` امیجز ڈومین روٹ کے لیے بنائی جاتی ہیں۔ آپ پھر بھی
رن ٹائم پر `OMNIROUTE_BASE_PATH` سیٹ کر سکتے ہیں؛ کنٹینر آغاز کے وقت ایک مرتبہ بنڈل کو پیچ کرتا ہے۔
اسے مماثل عوامی اوریجن کے ساتھ استعمال کریں:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

ریورس پراکسی کو **مکمل** بیرونی راستہ فارورڈ کرنے کے لیے ترتیب دیں (پریفکس نہ ہٹائیں)۔
Traefik کو `PathPrefix(`/omniroute`)`، `StripPrefix` کے بغیر کنٹینر کی طرف روٹ کرنا چاہیے،
تاکہ Next.js کو `/omniroute/...` موصول ہو اور وہ اثاثے
`/omniroute/_next/...` سے فراہم کرے۔

Docker ہیلتھ چیک، فعال `OMNIROUTE_BASE_PATH` کے پریفکس کے ساتھ ہلکے پھلکے
`/healthz` لائف سائیکل اینڈ پوائنٹ کی جانچ کرتا ہے۔ انسانی/ڈیش بورڈ تشخیص کے لیے
`/api/monitoring/health` بدستور دستیاب رہتا ہے؛ کنٹینر HEALTHCHECK کو دوبارہ اس کی طرف
کرنے کے لیے (مثلاً گہری صحت کی جانچ نافذ کرنے کے لیے)،
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` سیٹ کریں۔
یہ راستہ ایک **گہری** جانچ ہے (DB + مانیٹرنگ خلاصہ) — اگر آپ دوبارہ اسے فعال کرنے کا انتخاب کریں تو
Docker کے کم وقفوں سے چلنے والے `HEALTHCHECK` کے لیے موزوں ہے، لیکن Kubernetes کے
`livenessProbe` وقفوں کے لیے **نہیں**۔

آرکیسٹریٹرز (Kubernetes، Nomad وغیرہ) کے لیے:

| پروب             | ترجیح دیں                                                        | اجتناب کریں                                            |
| ---------------- | ---------------------------------------------------------------- | ------------------------------------------------------ |
| لائیونیس         | HTTP `GET /livez`، یا مرکزی پورٹ (`PORT`، ڈیفالٹ `20128`) پر TCP | لائیونیس کے طور پر `/api/monitoring/health`            |
| ریڈینیس          | HTTP `GET /healthz`                                              | ایسے مختصر ٹائم آؤٹس جو مصروف ایونٹ لوپ کو مردہ سمجھیں |
| گہری / بلیک باکس | `/api/monitoring/health`                                         | —                                                      |

`/healthz` پراسیس لائف سائیکل (`ok` / `starting` / `stopping`) کی اطلاع دیتا ہے۔ `/livez`
صرف پراسیس کے فعال ہونے کی جانچ کرتا ہے (جب بھی ہینڈلر چل سکے، 200؛ یہ
ریڈینیس کا انتظار نہیں کرتا)۔ دونوں اب بھی درخواستیں سنبھالنے والے اسی Node ایونٹ لوپ پر چلتے ہیں، اس لیے
CPU پر منحصر کیٹلاگ یا کمپریشن کا کام ان میں تاخیر کر سکتا ہے — مصروف ≠ مردہ۔ اگر HTTP
پروبز ٹائم آؤٹ ہوں تو TCP لائیونیس کو ترجیح دیں۔ پروبز کے لیے مکمل رہنمائی:
[مانیٹرنگ گائیڈ — Kubernetes پروب کی سفارشات](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)۔

## Caddy کے ساتھ Docker Compose (HTTPS Auto-TLS)

OmniRoute کو Caddy کی خودکار SSL فراہمی کے ذریعے محفوظ انداز میں قابلِ رسائی بنایا جا سکتا ہے۔ یقینی بنائیں کہ آپ کے ڈومین کا DNS A ریکارڈ آپ کے سرور کے IP کی طرف اشارہ کرتا ہو۔

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
      # OAuth کال بیکس، ڈیش بورڈ لنکس، اور تیار کردہ عوامی URLs کے لیے براؤزر کو دکھائی دینے والا ماخذ۔
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # شیڈول شدہ جابز / خودکار فیچز کے لیے اندرونی سرور-ٹو-سرور URL۔
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

Caddy اپ اسٹریم کنٹینر کے لیے معیاری فارورڈنگ ہیڈرز مقرر کرتا ہے۔ OmniRoute، OAuth کال بیکس اور تیار کردہ عوامی
لنکس کے لیے `NEXT_PUBLIC_BASE_URL` کو مستند عوامی ماخذ کے طور پر استعمال کرتا ہے؛ توثیق شدہ ڈیش بورڈ رائٹس ایک ہی ماخذ کی درخواستوں کے ساتھ سیشن سے منسلک CSRF
تحفظ استعمال کرتی ہیں۔ `OMNIROUTE_TRUST_PROXY` صرف ان جدید تعیناتیوں کے لیے فعال کریں جہاں آپ دانستہ طور پر چاہتے ہیں
کہ OmniRoute واضح کنفیگریشن کے بجائے قابلِ اعتماد فارورڈ شدہ ہیڈرز سے عوامی ماخذ اخذ کرے۔

## Cloudflare فوری ٹنل

Docker تعیناتیوں کے لیے ڈیش بورڈ سپورٹ میں `Dashboard → Endpoints` پر ایک کلک والا **Cloudflare فوری ٹنل** شامل ہے۔ پہلی مرتبہ فعال کرنے پر `cloudflared` صرف ضرورت کے وقت ڈاؤن لوڈ ہوتا ہے، آپ کے موجودہ `/v1` اینڈ پوائنٹ کے لیے ایک عارضی ٹنل شروع کرتا ہے، اور تیار کردہ `https://*.trycloudflare.com/v1` URL آپ کے عام عوامی URL کے عین نیچے دکھاتا ہے۔

اینڈ پوائنٹ ٹنل پینلز (Cloudflare، Tailscale، ngrok) کو فعال ٹنل کی حالت تبدیل کیے بغیر `Settings → Appearance` سے دکھایا یا چھپایا جا سکتا ہے۔

### ٹنل کے نوٹس

- فوری ٹنل URLs عارضی ہوتے ہیں اور ہر ری اسٹارٹ کے بعد تبدیل ہو جاتے ہیں۔
- OmniRoute یا کنٹینر کے ری اسٹارٹ کے بعد فوری ٹنلز خودکار طور پر بحال نہیں ہوتے۔ ضرورت پڑنے پر انہیں ڈیش بورڈ سے دوبارہ فعال کریں۔
- منظم انسٹال فی الحال Linux، macOS، اور Windows پر `x64` / `arm64` کو سپورٹ کرتا ہے۔
- محدود کنٹینر ماحول میں شور پیدا کرنے والی QUIC UDP بفر وارننگز سے بچنے کے لیے منظم فوری ٹنلز بطور ڈیفالٹ HTTP/2 ٹرانسپورٹ استعمال کرتے ہیں۔ اگر آپ کوئی مختلف ٹرانسپورٹ چاہتے ہیں تو `CLOUDFLARED_PROTOCOL=quic` یا `auto` مقرر کریں۔
- Docker امیجز سسٹم CA روٹس کو بنڈل کرتی ہیں اور انہیں منظم `cloudflared` تک پہنچاتی ہیں، جس سے کنٹینر کے اندر ٹنل بوٹ اسٹریپ ہونے کے دوران TLS اعتماد کی ناکامیوں سے بچا جا سکتا ہے۔
- اگر آپ چاہتے ہیں کہ OmniRoute کسی بائنری کو ڈاؤن لوڈ کرنے کے بجائے پہلے سے موجود بائنری استعمال کرے تو `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` مقرر کریں۔

## امیج ٹیگز

| امیج                     | ٹیگ      | سائز   | تفصیل                                                          |
| ------------------------ | -------- | ------ | -------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | سب سے زیادہ ورژن والا **شائع شدہ** مستحکم SemVer (`main` نہیں) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOps کے لیے اس نوعیت کے ٹیگ کو پِن کریں                      |

ملٹی پلیٹ فارم مینی فیسٹ: `linux/amd64` + `linux/arm64` نیٹو (Apple Silicon، AWS Graviton، Raspberry Pi)۔ Docker خودکار طور پر مماثل آرکیٹیکچر منتخب کرتا ہے؛ اگر آپ کو ARM ہوسٹس پر AMD64 ایمولیشن لازماً استعمال کرنی ہو تو `--platform linux/amd64` دیں۔

### ریلیز چینلز

OmniRoute مستحکم ریلیزز، فعال ریلیز برانچ کی ٹیسٹنگ، اور ڈیولپمنٹ بلڈز کے لیے الگ الگ Docker چینلز شائع کرتا ہے۔

| چینل                            | ماخذ                                             | تبدیلی کی اہلیت                | تجویز کردہ استعمال                                                                                                           |
| ------------------------------- | ------------------------------------------------ | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | دستخط شدہ/ورژن شدہ ریلیز                         | ناقابلِ تبدیلی                 | وہ پروڈکشن تعیناتیاں جو کسی مخصوص ریلیز کو پِن کرتی ہیں                                                                      |
| `:latest` / `:latest-web`       | سب سے زیادہ ورژن والا **شائع شدہ** مستحکم SemVer | قابلِ تبدیلی مستحکم پوائنٹر    | SemVer پبلش جاب کے **بعد** مستحکم ریلیزز کی پیروی کرتا ہے — `main` یا غیر ریلیز شدہ `release/v*` کمیٹس کو ٹریک **نہیں** کرتا |
| `:next` / `:next-web`           | موجودہ ڈیفالٹ `release/v*` برانچ                 | قابلِ تبدیلی پری ریلیز پوائنٹر | ان اصلاحات کی جانچ جو فعال ریلیز برانچ میں شامل ہو چکی ہیں لیکن ابھی مستحکم ریلیز میں شامل نہیں                              |
| `:main` / `:main-web`           | `main` برانچ                                     | قابلِ تبدیلی ڈیولپمنٹ پوائنٹر  | صرف ڈیولپمنٹ اور انٹیگریشن ٹیسٹنگ کے لیے                                                                                     |

#### ویب سیشن فراہم کنندگان: `-web` امیجز

اوپر دیا گیا ہر چینل `-web` ٹیگ (`:latest-web`، `:<version>-web`، `:next-web`، `:main-web`) کے طور پر بھی دستیاب ہے، جو `runner-web` مرحلے سے بنایا گیا ہے — یعنی وہی امیج، مگر Playwright اور Chromium براؤزر کے ساتھ۔ عام امیج Chromium کے **بغیر** فراہم کی جاتی ہے؛ `gemini-web`، `claude-web` اور `claude-turnstile` کو اس کی ضرورت ہوتی ہے۔

ناکامی اسٹارٹ اپ کے وقت نہیں ہوتی بلکہ مؤخر ہو جاتی ہے: یہ فراہم کنندگان اپنے ماڈلز درج کرتے ہیں اور ڈیش بورڈ میں منسلک دکھائی دیتے ہیں، اور صرف پہلی درخواست اس خرابی کے ساتھ ناکام ہوتی ہے

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

اگر آپ یہ فراہم کنندگان استعمال کرتے ہیں تو اپنے موجودہ چینل کا `-web` ٹیگ پل کریں — اس کے علاوہ کچھ تبدیل نہیں ہوتا۔ npm/CLI انسٹالیشن (بغیر Docker امیج) میں اس کے مساوی غائب جز براؤزر بائنری ہے: ہوسٹ پر `npx playwright install chromium` چلائیں۔

#### پری ریلیز چینل کا استعمال

`next` چینل موجودہ ڈیفالٹ `release/v*` برانچ پر ہر push کے ساتھ دوبارہ بنایا جاتا ہے اور AMD64 اور ARM64 دونوں کے لیے شائع کیا جاتا ہے۔ پرانی maintenance برانچیں اسے overwrite نہیں کر سکتیں۔ یہ چینل ان اصلاحات کے لیے pull کی جا سکنے والی image فراہم کرتا ہے جو اگلا stable tag بنائے جانے سے پہلے فعال release برانچ میں merge ہو چکی ہوں۔

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose کے لیے، منتخب کردہ profile کے زیرِ استعمال image tag کو override کریں، پھر service کو pull کرکے دوبارہ بنائیں:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### حفاظت اور واپسی

`next` ایک متغیر pre-release چینل ہے۔ یہ فعال release برانچ پر کسی بھی push کے ساتھ تبدیل ہو سکتا ہے اور **production میں استعمال کے لیے معاونت یافتہ نہیں ہے**۔ کسی مخصوص build کا جائزہ لیتے وقت image digest کو pin کریں:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

جانچ سے پہلے OmniRoute data volume یا bind-mounted data directory کا backup بنائیں۔ واپس جانے کے لیے، پہلے استعمال شدہ stable version یا digest بحال کریں اور container کو دوبارہ بنائیں:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

release-branch build کبھی بھی `latest` کو منتقل نہیں کر سکتی؛ صرف ایک اہل stable semantic version ہی stable pointer کو promote کر سکتا ہے۔ `next` images میں release image inspection اور CRITICAL vulnerability کو روکنے والا gate برقرار رہتا ہے۔

**`latest`، git کے لیے تازہ ترین ہونے کی ضمانت نہیں ہے۔** `main` یا فعال `release/v*` برانچ میں merge ہونے والی اصلاحات اس وقت تک `:latest` میں شامل **نہیں** ہوتیں جب تک stable SemVer image شائع نہ ہو اور publish job، `:latest` کو promote نہ کر دے (اس SemVer کے مساوی digest کے ساتھ)۔ اگر GitHub پر اصلاح پہلے ہی نظر آ رہی ہو مگر `latest` منجمد دکھائی دے، تو release برانچ کی جانچ کے لیے `:next` کو pull کریں یا SemVer tag کا انتظار کریں۔

| آپ کیا چاہتے ہیں                                                           | استعمال کریں                           |
| -------------------------------------------------------------------------- | -------------------------------------- |
| ایسا GitOps / production جس میں غیر ارادی تبدیلی نہیں ہونی چاہیے           | `:X.Y.Z` (یا image digest) کو pin کریں |
| شائع شدہ stable releases کی پیروی اور ہر release پر دوبارہ بنانا قبول کرنا | `:latest`                              |
| غیر شائع شدہ `release/v*` commits کی جانچ                                  | `:next` (production کے لیے نہیں)       |
| `main` کی جانچ                                                             | `:main` (production کے لیے نہیں)       |

## Docker میں ڈیش بورڈ کی اپ ڈیٹس

شائع شدہ امیج کا کنٹینر خود کو تبدیل نہیں کر سکتا۔ جب OmniRoute یہ شناخت کرتا ہے کہ وہ کسی
کنٹینر کے اندر چل رہا ہے (کوئی `.git` چیک آؤٹ نہیں، npm انسٹال نہیں)، تو ہوم ڈیش بورڈ کا اپ ڈیٹ بینر
npm/git ہدایات کے بجائے چلانے کے لیے ہوسٹ کمانڈ دکھاتا ہے، نیز کاپی بٹن بھی فراہم کرتا ہے:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

سروس کا نام `AUTO_UPDATE_SERVICE` سے آتا ہے (ڈیفالٹ `omniroute`، یعنی
`docker-compose.selfhost.yml` میں موجود سروس)۔ `pull` صرف ایک فلوٹنگ ٹیگ (`latest`، `next`) کو آگے بڑھاتا ہے؛
مقررہ `:X.Y.Z` ٹیگ کی صورت میں پہلے ٹیگ میں ترمیم کریں۔

### ہوسٹ ٹرگر فائل کے ساتھ ایک کلک اپ ڈیٹس

`/var/run/docker.sock` کو ماؤنٹ کیے بغیر **Update Now** کو فعال رکھنے کے لیے (جو کنٹینر کو
ہوسٹ پر روٹ رسائی دیتا ہے — اوپر `cli` پروفائل کا انتباہ دیکھیں)، OmniRoute سروس پر
`DOCKER_UPDATE_TRIGGER_FILE` سیٹ کریں اور ہوسٹ پر ایک واچر چلائیں:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

پاتھ کا `DATA_DIR` کے اندر ہونا ضروری ہے (نسبتی قدریں اسی کے لحاظ سے حل ہوتی ہیں)؛ اس کے علاوہ ہر چیز
مسترد کر دی جاتی ہے۔ اس کے بعد **Update Now** اس فائل میں `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }`
لکھتا ہے، `202` کے ساتھ جواب دیتا ہے، اور ڈیش بورڈ `/api/system/version` کو اس وقت تک پول کرتا ہے جب تک نیا ورژن
فعال نہ ہو جائے، پھر دوبارہ لوڈ ہوتا ہے۔ اس موڈ میں OmniRoute کبھی کوئی شیل یا Docker کمانڈ نہیں چلاتا۔
ہر اپ ڈیٹ کارروائی کی طرح، درخواست صرف لوپ بیک/LAN کلائنٹس سے قبول کی جاتی ہے۔

بائنڈ ماؤنٹ شدہ ڈیٹا ڈائریکٹری ہوسٹ کو نگرانی کے لیے ایک مستقل پاتھ فراہم کرتی ہے۔ نمونہ `systemd` یونٹس
(`/srv/omniroute` کو اس ڈائریکٹری کے مطابق تبدیل کریں جس میں آپ کی compose فائل اور `data/` موجود ہیں):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=OmniRoute ڈیش بورڈ کی اپ ڈیٹ درخواستوں کی نگرانی کریں

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=OmniRoute کنٹینر کو پل کرکے دوبارہ بنائیں

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

سروس پل کرنے سے پہلے درخواست کو ہٹا دیتی ہے تاکہ ناکام رن مسلسل لوپ نہ کرے۔
`DOCKER_UPDATE_TRIGGER_FILE` کے بغیر ڈیش بورڈ دستی کمانڈ کا طریقۂ کار برقرار رکھتا ہے۔

## دستیابی: پہلے سے طے شدہ SQLite سنگل ریپلیکا ہے۔

اسٹاک Docker / Kubernetes OmniRoute ہے** ایک نوڈ عمل + ایک SQLite مصنف** . اعلی دستیابی ہے** حمایت نہیں کی** اس ٹوپولوجی پر

| پابندی                                                 | نتیجہ                                                                                                                                                                                                                                                                                              |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| اکیلا لکھاری                                           | کرو** نہیں** ایک ہی SQLite فائل کے خلاف متعدد نقلیں چلائیں۔ یہ DB خراب کرتا ہے۔                                                                                                                                                                                                                    |
| دوبارہ بنانا / دوبارہ شروع کرنا / HEALTHCHECK قتل کرنا | **مکمل بندش** ان فلائٹ SSE، ڈیش بورڈ سیشنز، اور ان میموری حالت کا۔ ہر منسلک کلائنٹ گر جاتا ہے۔ خالی اختتامی نقطہ ونڈو کے دوران نئی درخواستوں کو ریورس پراکسی ملتی ہے۔**`502 Bad Gateway: Unknown error`** ، OmniRoute JSON نہیں — کلائنٹ اسے فراہم کنندہ کی ناکامی (#11015) سے ممتاز نہیں کر سکتے۔ |
| `/healthz` جیسا ہی ایونٹ لوپ                           | ایک مصروف کیٹلاگ یا کمپریشن ٹک تحقیقات میں تاخیر کر سکتا ہے۔ ایک مختصر ٹائم آؤٹ پھر دوبارہ شروع ہوتا ہے۔** صرف** نقل                                                                                                                                                                               |

**پروب میٹرکس** ( [کوبرنیٹس کی تحقیقات کی سفارشات](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) بھی دیکھیں):

| تحقیقات      | ہدف                                                            | استعمال نہ کریں۔                                    |
| ------------ | -------------------------------------------------------------- | --------------------------------------------------- |
| زندہ دلی     | TCP پر `PORT` (پہلے سے طے شدہ `20128`)، یا نرم HTTP `/healthz` | `/api/monitoring/health`                            |
| تیاری        | HTTP `GET /healthz`                                            | سخت ٹائم آؤٹ جو ایونٹ لوپ مصروف کو مردہ سمجھتے ہیں۔ |
| گہری / انسان | `/api/monitoring/health`                                       | خودکار کبلیٹ زندہ دلی                               |

**اپ گریڈ:** ہر سیشن میں کمی کی توقع ہے. اگر آپ کر سکتے ہیں تو گاہکوں کو نکالیں؛ ڈیفالٹ SQLite پر کوئی رولنگ اپ ڈیٹ نہیں ہے۔ کمپوز `restart: unless-stopped` پلس Docker `HEALTHCHECK` بھی صرف اس عمل کی جگہ لے گا جب کنٹینر غیر صحت بخش ہو — وہی دھماکے کا رداس۔

ریڈی میڈ مینی فیسٹ اور ہیلم چارٹ `deploy/kubernetes/` اور `deploy/helm/omniroute/` میں رہتے ہیں — دیکھیں [Kubernetes کی تعیناتی گائیڈ](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md) ۔

ایک کے لیے Kubernetes کا ٹکڑا** واحد نقل** (دوبارہ تخلیق کی ضرورت ہے؛ ایک SQLite فائل کے خلاف `replicas` نہ اٹھائیں):

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

`preStop` سلیپ کیوب کو SIGTERM سے پہلے سروس اینڈ پوائنٹس چھوڑنے دیتا ہے۔** نیا** ٹریفک موت کے عمل کو مارنا بند کر دیتی ہے۔ پرواز میں `/v1/responses` SSE ہیوی ویٹ داخلہ لیز (#11015) کے ذریعے `SHUTDOWN_TIMEOUT_MS` (پہلے سے طے شدہ 30s) تک نکالا جاتا ہے۔ نئی درخواستیں جو ابھی تک عمل تک پہنچتی ہیں `503` + `Retry-After: 5` حاصل کرتی ہیں۔ ریکریٹ ایمپٹی اینڈ پوائنٹ گیپ اس وقت تک جب تک کہ متبادل تیار نہ ہو ایک مشکل بندش رہتا ہے - یہ SQLite ٹوپولوجی ہے، تحقیقات کی غلط تشکیل نہیں۔

خارجی Postgres / کثیر مصنف HA ہے** نہیں** ایک دستاویزی اسٹاک کا راستہ۔ اگر آپ کو HA کی ضرورت ہے تو، ایک ہی نقل رکھیں یا ایک ٹوپولوجی چلائیں جس نے پروجیکٹ کا تجربہ کیا ہے اور الگ سے دستاویز کیا ہے۔ Postgres/MySQL کام [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) میں رہتا ہے۔ جب تک کہ بحری جہاز، ضرب کرنے کا واحد سہارا راستہ** بڑا** `/v1/responses` صلاحیت N آزاد عمل (اگلا حصہ) ہے، ایک حجم پر `replicas > 1` نہیں ہے۔

## اسکیل آؤٹ: N آزاد پراسیسز

ایک Node پراسیس **ایک V8 heap** ہے۔ دو ایک دوسرے سے متجاوز ~3 MiB / ~750k-token کوڈنگ ایجنٹ `POST /v1/responses` (RTK + Caveman) اس heap کو ~12 Gi پر بند کر دیتے ہیں (`FATAL ERROR: Reached heap limit`) اور 16 Gi cgroup میں OOM پیدا کر سکتے ہیں۔ [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) دیکھیں۔ یہ پیمائش **میموری بجٹ** کی تنبیہ ہے، بیک وقت دو طویل `/v1/responses` کی پروڈکٹ سطح کی سخت زیادہ سے زیادہ حد نہیں۔ بھاری چیٹ کی قبولیت خودکار طور پر اخذ کردہ ingest byte بجٹ (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) کے ذریعے محدود ہوتی ہے، جس کا حجم اسی V8/cgroup حد کی بنیاد پر متعین کیا جاتا ہے — پہلے سے مناسب حجم والے پراسیس میں اسے بڑھا کر override کرنا (یا پرانی `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` درخواست-تعداد حد مقرر کرنا) دوبارہ پراسیس بند ہونے کا سبب بنتا ہے۔ چھوٹی چیٹس، `/healthz`، `/v1/models`، اور MCP اس حد میں **شامل نہیں** ہیں۔

### ایک پراسیس: دو سے زیادہ طویل `/v1/responses`

ایک **صحت مند** پراسیس (heap، `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` سے کم؛ ڈیفالٹ `0.75`) بیک وقت دو سے زیادہ طویل `POST /v1/responses` **چلا سکتا ہے**، بشرطیکہ پراسیس کی مجموعی inflight-byte گنجائش (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) میں ابھی جگہ موجود ہو۔ `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (ڈیفالٹ 256 KiB) کے برابر یا اس سے بڑی bodies، ساختی طور پر بھاری درخواستوں جیسی heavyweight lease حاصل کرتی ہیں اور وہی [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` راستہ (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) استعمال کرتی ہیں۔ بیک وقت درجنوں طویل SSE کلائنٹس (آپریٹرز کو اکثر 40–50 درکار ہوتے ہیں) ایک **میموری بجٹ** کا سوال ہے — heap + primary/headroom slots + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` کا مناسب حجم مقرر کریں — یہ پروڈکٹ کی سخت “زیادہ سے زیادہ 2” حد نہیں۔ دباؤ کا شکار heap پھر بھی قابلِ تکرار `503` کے ساتھ بوجھ کم کرتا ہے تاکہ #7849 دوبارہ پیش نہ آئے۔

**heaps کی تعداد بڑھانے** (آزاد V8 old-spaces) کے لیے **آج**:

| یہ کریں                                                                                                                                                     | یہ نہ کریں                                                      |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| **N containers/pods** چلائیں، ہر ایک کا **اپنا** `DATA_DIR` / volume ہو                                                                                     | ایک SQLite فائل کے لیے `replicas > 1` مقرر کریں                 |
| heap / inflight-byte بجٹ کے مطابق heavy in-flight + healthy-headroom کا حجم مقرر کریں؛ 1–2 قدامت پسند #7849 ڈیفالٹ ہے، پروڈکٹ کی سخت زیادہ سے زیادہ حد نہیں | ایک پراسیس کو 8× RAM اور غیر محدود count cap دیں                |
| اختیاری: **مشترکہ quota counters** کے لیے `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL`                                                              | Redis کو مشترکہ SQLite سمجھیں — یہ ایسا نہیں ہے                 |
| provider secrets کو ہر instance میں نقل کریں (یا منقسم dashboards قبول کریں)                                                                                | تمام instances کے لیے ایک dashboard / ایک call-log کی توقع کریں |
| سامنے کوئی بھی load balancer لگائیں؛ API key یا session کے لحاظ سے sticky ہونا کافی ہے                                                                      | کسی vendor-specific size-aware middleware کو لازمی سمجھیں       |

ہارڈویئر: ہر instance میں بیک وقت طویل `/v1/responses` کی تعداد ایک **میموری بجٹ** کا سوال ہے (heap + inflight-byte / #10110)۔ `N` آزاد `DATA_DIR`s پھر بھی heaps کی تعداد بڑھاتے ہیں: host RAM کو `N × cgroup` پورا کرنا ہوگا، نہ کہ “N=8 کے ساتھ ایک 16 Gi pod۔” ایک SQLite فائل پر کبھی بھی `replicas > 1` نہ چلائیں۔

Compose کا خاکہ (دو heaps، دو volumes — `deploy.replicas: 2` نہیں):

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

پراسیس کے اندر کثافت (HTTP isolate سے compression کو باہر منتقل کرنا) [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023) ہے۔ مشترکہ durable state پر ایک منطقی cluster [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) ہے۔

## Docker کے اندر Gemini کی علاقائی خرابیاں

Google AI Studio / Gemini API، FAILED_PRECONDITION کے ساتھ HTTP 400 اور
`User location is not supported for the API use.` واپس کر سکتی ہے۔ ہوسٹ پر کامیاب درخواست
یہ ثابت نہیں کرتی کہ کنٹینر بھی وہی آؤٹ باؤنڈ روٹ استعمال کرتا ہے۔ DNS کی ترتیب،
IPv4/IPv6 کنیکٹیویٹی، VPN روٹنگ اور ترتیب دی گئی پراکسیز مختلف ہو سکتی ہیں۔
[Google کے معاونت یافتہ خطے](https://ai.google.dev/gemini-api/docs/available-regions)
اور اصل کنکشن روٹ دونوں چیک کریں؛ صرف یہ خرابی کسی خراب API کلید کی نشاندہی نہیں کرتی۔

### کنکشن کے لیے مخصوص پراکسی کو ترجیح دیں

متاثرہ Gemini کنکشن کے لیے OmniRoute کی [فی کنکشن پراکسی کنفیگریشن](../ops/PROXY_GUIDE.md#4-level-proxy-system)
استعمال کریں، پھر اسی ماڈل کے ساتھ **کنکشن کی جانچ کریں** اور ایک چھوٹی درخواست
دوبارہ چلائیں۔ اس طرح روٹنگ کی تبدیلی صرف اسی کنکشن تک محدود رہتی ہے۔ تصدیق کریں
کہ کنٹینر سے پراکسی قابل رسائی ہے، اور کنکشن واقعی اسے منتخب کرتا ہے۔
روٹ تبدیل کرنا اپ اسٹریم علاقائی اہلیت کی ضمانت نہیں دیتا۔

### ہوسٹ اور کنٹینر نیٹ ورکنگ کا موازنہ کریں

تصدیق شدہ نتائج کا موازنہ کرتے وقت کلید، ماڈل اور درخواست ایک جیسے رکھیں؛ اسناد،
پراکسی پاس ورڈز یا مکمل آتھرائزیشن ہیڈرز کبھی بھی کسی مسئلے میں پیسٹ نہ کریں۔
پہلے یہ دیکھیں کہ OS ریزولوَر کون سے ایڈریس فیملیز فراہم کرتا ہے، اور ہوسٹ اور
کنٹینر کے اندر ایک ہی کمانڈ استعمال کریں:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

`omniroute` کو اس سروس سے تبدیل کریں جو آپ چلاتے ہیں (مثلاً، `omniroute-web`)۔ یہ
کمانڈز اسناد یا IP ایڈریسز کے بغیر ایڈریس فیملیز پرنٹ کرتی ہیں۔ واپس آنے والا `6`
صرف IPv6 DNS نتیجہ دکھاتا ہے: یہ قابل استعمال IPv6 روٹ یا API رسائی ثابت **نہیں**
کرتا۔ جہاں `curl` انسٹال ہو، دونوں ماحول میں
`curl -4 -I https://generativelanguage.googleapis.com` کا
`curl -6 -I https://generativelanguage.googleapis.com` سے موازنہ کریں۔
HTTP جواب اس پروب کے لیے کنیکٹیویٹی ثابت کرتا ہے، چاہے وہ غیر تصدیق شدہ خرابی ہی
کیوں نہ ہو؛ صرف تصدیق شدہ ماڈل درخواست ہی Gemini کی اہلیت کی جانچ کرتی ہے۔

### ہوسٹ کی سطح کا متبادل: فعال IPv6 اور ریزولوَر پالیسی

[#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) کے رپورٹ کنندہ نے
اپنے ماحول میں کنٹینر IPv6 فعال کر کے اور glibc ایڈریس انتخاب تبدیل کر کے رسائی بحال
کی۔ اسے ماحول کے لیے مخصوص متبادل سمجھیں۔ ریزولوَر کی ترجیحات تبدیل کرنے سے پہلے
فعال ہوسٹ IPv6، کنٹینر ایگریس/روٹنگ اور فائر وال قواعد کی تصدیق کریں۔ صرف ایک نجی
ULA ایڈریس عوامی IPv6 کنیکٹیویٹی قائم نہیں کرتا۔

Compose کے ڈیفالٹ نیٹ ورک سے پہلے ہی منسلک سروسز کے لیے، یہ جزو اس نیٹ ورک پر
IPv6 فعال کرتا ہے؛ اپنی باقی سروس، پورٹس، والیومز اور کنفیگریشن برقرار رکھیں:

```yaml
networks:
  default:
    enable_ipv6: true
```

نام والے نیٹ ورک کے لیے اسے اسی نیٹ ورک پر فعال کریں جس میں سروس حقیقتاً شامل ہوتی
ہے۔ Docker ایک ULA سب نیٹ مختص کر سکتا ہے؛ واضح اور غیر متجاوز سب نیٹ صرف اس وقت
منتخب کریں جب آپ کے نیٹ ورک کو اس کی ضرورت ہو۔ [Docker IPv6 نیٹ ورکنگ](https://docs.docker.com/engine/daemon/ipv6/)
اور [Compose نیٹ ورک کے اختیارات](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6) دیکھیں۔

**glibc پر مبنی امیج** میں، `/etc/gai.conf` ایڈریس انتخاب تبدیل کر سکتی ہے۔ موجودہ
ریپوزٹری Dockerfile، Debian استعمال کرتی ہے؛ حسب ضرورت musl پر مبنی امیجز میں یہ
طریقۂ کار مشترک نہیں ہے۔ رپورٹ کردہ تبدیلی ULA لیبل کو `label fc00::/7 6` سے
`label fc00::/7 1` میں تبدیل کرتی ہے۔ امیج کی مکمل پالیسی ٹیبل سے آغاز کریں اور اس
کی دیگر اندراجات برقرار رکھیں: `label` یا `precedence` اندراج شامل کرنے سے وہ
ڈیفالٹ ٹیبل تبدیل ہو جاتی ہے، اس لیے صرف تبدیل شدہ لائن پر مشتمل فائل ناکافی ہے۔
[glibc کنفیگریشن حوالہ](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
ان معنوی اصولوں کی دستاویز فراہم کرتا ہے۔ نظرثانی شدہ فائل کو صرف پڑھنے کے موڈ میں
`/etc/gai.conf` پر بائنڈ ماؤنٹ کریں اور اسے لاگو کرنے کے لیے سروس دوبارہ تخلیق کریں۔

یہ اس کنٹینر میں **تمام آؤٹ باؤنڈ ٹریفک** کے لیے OS ایڈریس انتخاب تبدیل کرتا ہے۔
یہ ہر ایپلیکیشن کو IPv6 منتخب کرنے پر مجبور نہیں کرتا: Node کی DNS ترتیب اور کنکشن
انتخاب بھی اہم ہیں۔ بالخصوص، `--dns-result-order=ipv4first`، IPv4 کو ترجیح دیتا ہے
اور صرف IPv4 کی ناکامی کا حل نہیں ہے۔ [Node DNS ترتیب](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder) دیکھیں۔

ہوسٹ کی سطح پر کسی بھی تبدیلی کے بعد Gemini اور اپنے دیگر فراہم کنندگان کی دوبارہ
جانچ کریں۔ سابقہ حالت بحال کرنے کے لیے، حسب ضرورت `gai.conf` ماؤنٹ ہٹا دیں، پچھلی
نیٹ ورک کنفیگریشن بحال کریں اور مینٹیننس ونڈو کے دوران متاثرہ سروس/نیٹ ورک دوبارہ
تخلیق کریں۔ نیٹ ورک دوبارہ تخلیق کرنے سے اس سے منسلک دیگر کنٹینرز میں خلل پڑ سکتا
ہے؛ مستقل ڈیٹا والیوم حذف نہ کریں۔

## اہم نوٹس

- **SQLite WAL موڈ:** `docker stop` کو مکمل ہونے دیا جانا چاہیے تاکہ OmniRoute تازہ ترین تبدیلیوں کو واپس `storage.sqlite` میں چیک پوائنٹ کر سکے۔ شامل کردہ Compose فائلیں پہلے ہی 40s کا اسٹاپ گریس پیریڈ مقرر کرتی ہیں۔ اگر آپ امیج کو براہِ راست چلاتے ہیں تو `--stop-timeout 40` برقرار رکھیں۔
- **`DISABLE_SQLITE_AUTO_BACKUP`:** اگر معمول کے/لکھنے سے پہلے کے بیک اپس کا انتظام بیرونی طور پر کیا جاتا ہے تو اسے `true` پر سیٹ کریں۔ موجودہ ڈیٹابیس کی مائیگریشنز کے لیے اب بھی ان کا اپنا پائیدار حفاظتی اسنیپ شاٹ اور بڑے پیمانے کی مائیگریشن کا حفاظتی کنٹرول درکار ہے۔
- **ڈیٹا کا برقرار رہنا:** کنٹینر کے دوبارہ شروع ہونے کے بعد بھی اپنے ڈیٹابیس، کلیدوں اور کنفیگریشنز کو برقرار رکھنے کے لیے ہمیشہ `/app/data` پر ایک والیوم ماؤنٹ کریں۔
- **پورٹ کی کنفیگریشن:** ڈیفالٹ `20128` پورٹ کو تبدیل کرنے کے لیے `PORT` انوائرمنٹ ویری ایبل کو اوور رائیڈ کریں۔

## مزید دیکھیں

- [VM تعیناتی گائیڈ](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare سیٹ اپ
- [Fly.io تعیناتی گائیڈ](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.io پر تعینات کریں
- [انوائرمنٹ کنفیگریشن](../reference/ENVIRONMENT.md) — `.env` کا مکمل حوالہ
