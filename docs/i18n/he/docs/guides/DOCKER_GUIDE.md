# 🐳 Docker Guide — OmniRoute (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> מדריך עזר מלא לפריסה באמצעות Docker. להתחלה מהירה, ראו את [סעיף Docker ב-README](../README.md#-docker).

## תוכן עניינים

- [הפעלה מהירה](#quick-run)
- [עם קובץ סביבה](#with-environment-file)
- [Docker Compose](#docker-compose)
- [פרופילים זמינים](#available-profiles)
- [הגדרת כלי CLI במארח כאשר OmniRoute פועל ב-Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [Compose לסביבת ייצור](#production-compose)
- [שלבי Dockerfile](#dockerfile-stages)
- [משתני סביבה קריטיים](#critical-environment-variables)
- [Docker Compose עם Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [מנהרה מהירה של Cloudflare](#cloudflare-quick-tunnel)
- [תגיות Image](#image-tags)
- [עדכוני לוח הבקרה ב-Docker](#dashboard-updates-in-docker)
- [זמינות: SQLite המוגדר כברירת מחדל תומך ברפליקה יחידה](#availability-default-sqlite-is-single-replica)
- [שגיאות אזוריות של Gemini בתוך Docker](#gemini-regional-errors-inside-docker)
- [הערות חשובות](#important-notes)

---

## ריצה מהירה

> **אירוח עצמי בפקודה אחת?** עיין [במדריך לארח עצמי](../getting-started/SELF_HOST_GUIDE.md) — `docker compose -f docker-compose.selfhost.yml up -d` (תמונה שפורסמה + Redis, לולאה-בחור בלבד, ללא בחירה בפרופיל). ההפעלה המהירה למטה היא הנתיב עם מיכל יחיד עבור משתמשים שכבר מריצים Redis במקום אחר.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## עם קובץ סביבה

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
# פרופיל בסיס (ללא כלי CLI)
docker compose --profile base up -d

# פרופיל CLI (כולל Claude Code, Codex ו-OpenClaw)
docker compose --profile cli up -d

# פרופיל מארח (מותאם בעיקר ל-Linux; מעגן את קובצי ההרצה של כלי ה-CLI מהמארח לקריאה בלבד)
docker compose --profile host up -d

# פרופיל Web (Chromium/Playwright עבור ספקים המבוססים על הפעלת Web)
docker compose --profile web up -d

# שילוב CLI עם Sidecar של CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## פרופילים זמינים

OmniRoute מספק פרופילי Compose עבור תצורות הפריסה העיקריות. בחרו את הפרופיל המתאים לסביבה שלכם.

| פרופיל              | שירות            | מתי להשתמש                                                                                                                           | פקודה                                        |
| ------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `base` (ברירת מחדל) | `omniroute-base` | שרת ללא ממשק גרפי / סביבת הרצה מינימלית, ללא כלי CLI של ספקים בחבילה                                                                 | `docker compose --profile base up -d`        |
| `cli`               | `omniroute-cli`  | תהליכי עבודה סוכניתיים שקוראים ל-`omniroute providers/setup/doctor` ולכלי CLI כלולים (Codex, Claude Code, Droid, OpenClaw)           | `docker compose --profile cli up -d`         |
| `host`              | `omniroute-host` | מארחי Linux שרוצים גישה דמוית `network_mode` לכלי CLI במארח באמצעות עיגון `~/.local/bin`,‏ `~/.codex`,‏ `~/.claude` וכו' לקריאה בלבד | `docker compose --profile host up -d`        |
| `cliproxyapi`       | `cliproxyapi`    | הפעלת ה-Sidecar של [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) ביציאה `8317` לצורך תיווך CLI במעלה הזרם              | `docker compose --profile cliproxyapi up -d` |
| `web`               | `omniroute-web`  | ספקים מבוססי הפעלת Web שזקוקים לדפדפן: `gemini-web`,‏ `claude-web`,‏ `claude-turnstile` (בונה את `runner-web`, כולל Chromium)        | `docker compose --profile web up -d`         |

> ניתן לשלב מספר פרופילים: `docker compose --profile cli --profile cliproxyapi up -d`.

## הגדרת כלי CLI במארח כאשר OmniRoute פועל ב-Docker

`omniroute setup-codex`,‏ `setup-claude`,‏ `config set <tool>` והכפתור
**שמירת תצורה** בלוח הבקרה כותבים קבצים כגון `~/.codex/*.config.toml`. לנתיבים האלה
יש משמעות רק במכונה שבה ה-CLI פועל בפועל. אם מריצים אותם בתוך
הקונטיינר, הכתיבה מתבצעת בספריית הבית של הקונטיינר עצמו (`/home/node` —
ה-image פועל עם `USER node`), שממנה אף CLI במארח לעולם לא יקרא, ושתוכנה
נמחק ברגע שיוצרים מחדש את הקונטיינר.

OmniRoute מזהה זאת ומסרב לבצע את הכתיבה תוך הצגת הוראות, במקום
לדווח על הצלחה שאי אפשר להשתמש בה: ה-CLI יוצא עם קוד `2`, וה-API מחזיר `422`
עם `containerEphemeralTarget: true`.

### מומלץ: הפעילו את ה-CLI במארח ואת OmniRoute ב-Docker

הקונטיינר מספק את ה-API; ה-CLI מגדיר את כלי המארח שלכם.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # הפניית ה-CLI אל הקונטיינר
omniroute setup-codex                      # כתיבה אל ~/.codex האמיתי במארח שלכם
```

זו הבחירה הנכונה כאשר Codex,‏ Claude Code,‏ Cursor או כלים דומים פועלים על
המחשב הנייד שלכם — וזוהי התצורה הנפוצה.

### חלופה: עיגון ספריות התצורה של המארח באמצעות bind mount (פרופיל `host`)

אם אתם רוצים שהקונטיינר עצמו יכתוב את תצורת המארח שלכם, עגנו בתוכו את
הספריות והפנו את `CLI_CONFIG_HOME` אל שורש העיגון. פרופיל `host`
כבר עושה זאת:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

עיגון bind הוא שהופך את הנתיב למהימן: OmniRoute קורא את
`/proc/self/mountinfo` ומתיר כתיבה לנתיבים מעוגנים (וכן לספריות
שהילדים שלהן הם נקודות עיגון, בדיוק כמו המבנה של `/host-home` לעיל), ובו בזמן
ממשיך לסרב לכתיבה לנתיבים שאינם מעוגנים.

### נתיב מילוט: הגדרת כלי ה-CLI של הקונטיינר עצמו (יש להשתמש במשורה)

כאשר כלי ה-CLI אכן נמצאים בתוך הקונטיינר (פרופיל `cli`), הכתיבה
מכוונת. העבירו את `--allow-container-write` לכל פקודת `setup-*`, או הגדירו
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` עבור השרת. הכתיבה תתבצע
עם אזהרה שהיא לא תשרוד את הקונטיינר.

> **אזהרת אבטחה — פרופיל `cli` יחד עם עיגון `docker.sock`.**
> פרופיל `cli` מעגן באמצעות bind את `/var/run/docker.sock`, כדי שמנגנון
> העדכון האוטומטי שבתוך הקונטיינר יוכל ליצור מחדש את המחסנית דרך ה-daemon של המארח
> (`src/lib/system/autoUpdate.ts` בודק אם ה-socket הזה קיים ומדלג על
> נתיב Docker כאשר הוא אינו קיים). ה-socket הזה הוא **גבול אמון ברמת root
> של המארח**: כל דבר שיכול לגשת אליו שולט ב-Docker daemon של המארח בתור
> root — הוא יכול ליצור, לבדוק, לעצור ולהסיר כל קונטיינר במארח.
> המשמעויות:
>
> 1. **לעולם אל תחשפו לרשת את הפורט של פרופיל `cli`.** פרסמו
>    אותו ב-`127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — פרופיל `cli` שנגיש דרך ה-LAN הופך כל RCE ברמת לוח הבקרה
>    להשתלטות מלאה על המארח.
> 2. **אל תעגנו ספריות מארח נוספות בתוך פרופיל `cli`.**
>    ה-Docker socket יחד עם כל עיגון נוסף מעניקים לקונטיינר גישת
>    קריאה/כתיבה מלאה למערכת הקבצים ולתצורת המארח שלכם. אם כלי צריך
>    לגשת לפרויקט, הפעילו אותו מקומית באמצעות קובץ ה-CLI הבינארי — אל תעגנו אותו
>    בתוך קונטיינר `cli`.
>
> אם אינכם זקוקים לעדכון אוטומטי מתוך הקונטיינר, השאירו את פרופיל `cli` כבוי
> (`COMPOSE_PROFILES=core,redis` או גרסה קצרה יותר). הפרופילים האחרים אינם
> מעגנים את ה-Docker socket.
>
> ראו `docs/security/MITM-TPROXY-DECRYPT.md` (ב-git; אינו מהודר לתוך `/docs`) למודל האיומים הקשור
> ל-MITM, ואת `docs/security/SUPPLY_CHAIN.md` לשרשרת המקור של קובצי ה-binary
> ‏`codex`/`claude-code`/`droid`/`openclaw`.

## שירות Redis נלווה

OmniRoute מסתמך על Redis עבור מגביל הקצב המבוזר והמטמון המשותף. השירות `redis` מוגדר **תמיד** ב-`docker-compose.yml` (אין לו שער פרופיל), והוא מופעל לצד כל פרופיל אחר.

| פרט                 | ערך                                             |
| ------------------- | ----------------------------------------------- |
| תמונה               | `redis:7-alpine`                                |
| שם הקונטיינר        | `omniroute-redis`                               |
| פורט פנימי          | `6379`                                          |
| פורט המארח (דריסה)  | `REDIS_PORT` (ברירת המחדל היא `6379`)           |
| כתובת המארח (דריסה) | `REDIS_BIND_HOST` (ברירת המחדל היא `127.0.0.1`) |
| אמצעי אחסון         | `omniroute-redis-data` → `/data`                |
| בדיקת תקינות        | `redis-cli ping` (מרווח של 10 שניות)            |

משתני סביבה קשורים:

- `REDIS_URL` — מחרוזת החיבור המוזרקת ליישום (`redis://redis:6379` כברירת מחדל).
- `REDIS_PORT` — מיפוי הפורט בצד המארח עבור קונטיינר Redis.
- `REDIS_BIND_HOST` — ממשק המארח שבו הפורט מתפרסם. ברירת המחדל היא `127.0.0.1`.

> **מדוע ברירת המחדל היא ממשק הלולאה החוזרת:** השירות הנלווה פועל ללא `requirepass`, וקונטיינרי
> היישום ניגשים אליו דרך רשת Compose (`redis:6379`) — הפורט המתפרסם קיים רק עבור כלי עבודה
> בצד המארח (`redis-cli`, או `npm run dev` מקומי). פרסום ב-`0.0.0.0` יחשוף Redis ללא אימות
> לכל מארח ברשת המקומית שלכם. אם תגדירו `REDIS_BIND_HOST=0.0.0.0`, הוסיפו גם
> `--requirepass` אל `command:` של השירות.

**לא מומלץ להשבית את Redis** (מגביל הקצב יעבור למנגנון גיבוי בזיכרון בלבד). אם אתם חייבים לעשות זאת, הסירו את בלוק השירות `redis:` מ-`docker-compose.yml` או הפכו אותו להערה, לחלופין הגדירו את מספר המופעים שלו לאפס:

```bash
docker compose up -d --scale redis=0
```

## Compose לסביבת ייצור

כדי להפעיל תמונת מצב מבודדת של סביבת הייצור לצד סביבת הפיתוח, השתמשו ב-`docker-compose.prod.yml`.

| פרט                           | ערך                                                                              |
| ----------------------------- | -------------------------------------------------------------------------------- |
| קובץ                          | `docker-compose.prod.yml`                                                        |
| פורט ברירת המחדל של לוח הבקרה | `PROD_DASHBOARD_PORT=20130` (ממופה אל `${DASHBOARD_PORT:-20128}` הפנימי)         |
| פורט ברירת המחדל של ה-API     | `PROD_API_PORT=20131`                                                            |
| תמונה                         | `omniroute:prod` (נבנית מהיעד `runner-cli`)                                      |
| קונטיינר Redis                | `omniroute-redis-prod` (`redis:8.6.2`, אמצעי אחסון ייעודי `redis-prod-data`)     |
| אמצעי אחסון לנתונים           | `omniroute-prod-data` (בעל שם, נשמר בין בניות מחדש)                              |
| בדיקות תקינות                 | `node healthcheck.mjs` + `redis-cli ping`, כאשר `depends_on` מותנה בתקינות Redis |

אופן השימוש:

```bash
# בנייה והפעלה של מערך הייצור
docker compose -f docker-compose.prod.yml up -d --build

# הזרמת יומנים
docker compose -f docker-compose.prod.yml logs -f

# פירוק המערך (תוך שמירת אמצעי האחסון)
docker compose -f docker-compose.prod.yml down
```

מערך הייצור פועל במקביל ל-Compose של סביבת הפיתוח (עם שמות קונטיינרים, פורטים ואמצעי אחסון שונים), כך שתוכלו להמשיך לעבוד מקומית בזמן שסביבת הייצור נשארת פעילה.

## Dockerfile Stages

המאגר שולח Dockerfile רב-שלבי (`Dockerfile`). נחשפים ארבעה שלבים; בחר את `target` המתאים למקרה השימוש שלך.

| שָׁלָב        | תמונת בסיס            | מַטָרָה                                                                                                                                                                                                                                            |
| ------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | מתקין deps (`npm ci --legacy-peer-deps`) ומפעיל `npm run build` (Turbopack כברירת מחדל — ראה משאבים בזמן בנייה למטה)                                                                                                                               |
| `runner-base` | `node:26-trixie-slim` | זמן ייצור עם פלט Next.js העצמאי.** אין ספק CLIs ארוז.**                                                                                                                                                                                            |
| `runner-cli`  | `runner-base`         | מוסיף `git`, `docker.io`, `docker-compose` ו- CLIs גלובלי: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`.** בחר את זה עבור זרימות עבודה סוכניות.**                                                                             |
| `runner-web`  | `runner-base`         | מוסיף Playwright + דפדפן Chromium (`--with-deps`) עבור ספקי הפעלה באינטרנט: `gemini-web`, `claude-web`, `claude-turnstile`.** בחר באפשרות זו כאשר אתה משתמש בספקים אלה** — התמונה הפשוטה נכשלת בזמן בקשה בלעדיה (ראה הערת `-web` תחת ערוצי שחרור). |

בנה יעד ספציפי באופן ידני:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### משאבים בזמן בנייה

שלושה ארג'ים לבנות שולטות בעלות שלב `builder`. הם בזמן בנייה רק — `OMNIROUTE_MEMORY_MB` (להלן) הוא כפתור נפרד, זמן ריצה.

| בנה ארג                     | בְּרִירַת מֶחדָל | אֵפֶקְט                                                                       |
| --------------------------- | ---------------- | ----------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`              | `0` בונה עם webpack: זיכרון שיא נמוך יותר, איטי יותר. `1` מצטרף ל- Turbopack. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`           | תקרת ערימה V8 (`--max-old-space-size`) עבור `next build` שהולידה.             |
| `OMNIROUTE_BUILD_WORKERS`   | `2`              | מאכיל `CIRCLE_NODE_TOTAL`; Next מפיקה `workers = N - 1` לאיסוף נתוני עמוד.    |

`OMNIROUTE_BUILD_WORKERS` הוא זה שיעלה על בנאי גדול וזה שחושד כשמבנה מוגבל מת** לְאַחַר** `✓ Compiled successfully`. כל עובד דפי נתונים הוא תהליך משלו, וכך גם האב `next build` עצמו; רפרודוקציה חיה VPS (בעיה #7518) מדדה את שיא RSS של כל תהליך ב- ~ 4.5 GB ללא תלות בדגל `NODE_OPTIONS` heap (Turbopack קומפילציה בזיכרון native/Rust מחוץ ל-V8 heap). ברירת המחדל של `2` (→ 1 עובד, 2 תהליכים בסך הכל) היא בגודל של 16 GB / 4 vCPU GitHub המתארחים בהם צינור הפרסום משתמש. ב- `8` (→ 7 עובדים) לאותו ראנר נגמר הזיכרון וה-buildkit נכשל בשלב עם `ResourceExhausted: ... cannot allocate memory`; `3` (→ 2 עובדים) עדיין לא התאימו ברגע שה- RSS לכל תהליך נמדד ישירות במקום להסיק. `tests/unit/docker-build-memory-budget.test.ts` עושה את החשבון מול הנתון הנמדד ונכשל אם אחד הכפתורים גדל מהרץ.

Turbopack מלקט בזיכרון חלודה מקורי שחי** בָּחוּץ** ערימת ה-V8, אז `OMNIROUTE_BUILD_MEMORY_MB` לא כובל אותה. במארח עם תקרת זיכרון ה-build אז הוא SIGKILLed על ידי ה- OOM killer ללא טקסט שגיאה בכלל — הוא פשוט מפסיק באמצע `Creating an optimized production build`, שנקרא כמו תלייה ולא מחוץ לזיכרון. זו הסיבה שה- `Dockerfile` הוא ברירת המחדל ל-webpack (`OMNIROUTE_USE_TURBOPACK=0`), שלא כמו `npm run dev` / `npm run build`, שבו Turbopack הוא ברירת המחדל של הקוד: `docker build .` חשוף ללא args build (מה ש-Railway ומארחים אחרים בלחיצה אחת מריצים) אסור למות בשקט על בונה עם מכסת זיכרון. התמונות שפורסמו כבר עוברות `OMNIROUTE_USE_TURBOPACK=0` במפורש ב- `docker-publish.yml`. בבונה עם הרבה RAM, הצטרף ל- Turbopack לבנייה מהירה יותר:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` מופעל, אז `next build` מפעיל הורה** ו** תהליך עובד וכל אחד מכבד את `OMNIROUTE_BUILD_MEMORY_MB` בנפרד. גודל תקרת המיכל מעל בערך פי שניים מהערך הזה, לא פעם אחת.

נמדד על העץ הזה (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| באנדלר        | תקרת מיכל      | תוֹצָאָה                     |
| ------------- | -------------- | ---------------------------- |
| Turbopack     | 8 GiB / 16 GiB | OOM-הרוג בשניהם, בשקט        |
| חבילת אינטרנט | 8 GiB          | לבנות עובד SIGKILLed         |
| חבילת אינטרנט | 12 GiB         | הצליח, הגיע לשיא של 11.1 GiB |

### ברירת מחדל של זמן ריצה

ברירות מחדל מיוצאות על ידי `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

התנהגות זיכרון ב- Docker:

- התמונה מגדירה `OMNIROUTE_MEMORY_MB=1024` ומפיקה ממנה `NODE_OPTIONS=--max-old-space-size=1024`.
- תהליך השרת בפועל מופעל על ידי המשגר העצמאי, שקורא `OMNIROUTE_MEMORY_MB` ומוסיף `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- הצומת משתמש בערך `--max-old-space-size` החוזר האחרון, כך שהגדרת `OMNIROUTE_MEMORY_MB` שולטת במגבלת ה- Docker heap האפקטיבית.
- מכיוון שהתמונה תמיד מגדירה את זה, ה-fallback מכויל RAM משלו של המשגר לעולם לא חל תחת Docker. הרם אותו במפורש עבור עומס העבודה (טבלה למטה). `2048` עדיין קטן מדי עבור סוכן הקידוד `/v1/responses`.

### זמן ריצה RAM עבור סוכני קידוד

ברירת המחדל של 1 GiB Docker היא רצפת dashboard/light-chat, לא גודל ייצור. גופי `POST /v1/responses` ארוכים (מאות הודעות, עשרות כלים) שומרים על גרפים מרובים בזיכרון במהלך הדחיסה. שתי בקשות חופפות ~ 3 MiB / ~ 750k-token ביטלו את V8 בשעה** 12 GiB** old-space (`FATAL ERROR: Reached heap limit`) וגם פגע ב-16 GiB cgroup OOM. ראה [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

גוֹדֶל** cgroup `--memory` מעל הערימה** חוצצים מקוריים של —, SQLite וחומרי ביניים דחיסה יושבים מחוץ ל-V8.

| עומס עבודה                         | `OMNIROUTE_MEMORY_MB`        | מיכל / cgroup   | הערות                                                                         |
| ---------------------------------- | ---------------------------- | --------------- | ----------------------------------------------------------------------------- |
| לוח מחוונים, צ'אט קל אחד           | `1024` (ברירת מחדל של תמונה) | ≥2 GiB          |                                                                               |
| סוכן קידוד אחד (Claude/Codex/Grok) | `8192`                       | ≥10 GiB         | `/v1/responses` אופייני למפגש בודד                                            |
| שני `/v1/responses` ארוכים במקביל  | `10240`–`12288`              | ≥12–16 GiB      | נמדד V8 לבטל בערימת ~ 12 GiB                                                  |
| שלושה + ארוכים במקביל              | לא על תהליך אחד              | סדרה / יותר RAM | ברירת המחדל של קבלה במשקל כבד היא 1 בטיסה; העלאתו ללא RAM מציגה מחדש את ההפלה |

`omniroute serve` על מתכת חשופה מכייל ~ 35% מ- RAM (clamped `[512, 4096]`) כאשר `OMNIROUTE_MEMORY_MB` הוא** לא מוגדר** . Docker תמיד מגדיר `1024`, כך שהכיול לעולם אינו פועל בתמונה הרשמית.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
```

## משתני סביבה קריטיים

מעבר לברירות המחדל המתועדות ב-[ENVIRONMENT.md](../reference/ENVIRONMENT.md), המשתנים הבאים הם החשובים ביותר בעת הפעלה תחת Docker:

| משתנה                         | מטרה                                                                                                                                                                                                                                                               | ברירת מחדל             |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | סוד משותף עבור גשר ה-WebSocket. **נדרש בסביבת ייצור** — יש להגדיר מחרוזת אקראית חזקה.                                                                                                                                                                              | לא מוגדר (יש לספק ערך) |
| `REDIS_URL`                   | מחרוזת חיבור עבור מגביל הקצב / מנגנון המטמון                                                                                                                                                                                                                       | `redis://redis:6379`   |
| `REDIS_PORT`                  | הפורט בצד המארח עבור קונטיינר Redis המצורף                                                                                                                                                                                                                         | `6379`                 |
| `REDIS_BIND_HOST`             | ממשק המארח שבו מתפרסם הפורט של Redis המצורף (ממשק לולאה חוזרת, אלא אם מוסיפים AUTH)                                                                                                                                                                                | `127.0.0.1`            |
| `AUTO_UPDATE_HOST_REPO_DIR`   | נתיב במארח שממופה אל פרופיל `cli` ב-`/workspace/omniroute` עבור תהליכי עדכון עצמי                                                                                                                                                                                  | `.` (התיקייה הנוכחית)  |
| `OMNIROUTE_MEMORY_MB`         | תקרת ערימת Node בזמן ריצה עבור שרת Docker העצמאי; עוקף את ברירת המחדל של קובץ האימג' שמופיעה לעיל. עבור סוכני קידוד: `8192` ומעלה (ראו [זיכרון RAM בזמן ריצה](#runtime-ram-for-coding-agents)).                                                                    | `1024`                 |
| `DASHBOARD_PORT` / `API_PORT` | עוקף את הפורטים החשופים עבור לוח המחוונים (20128) וה-API ‏(20129)                                                                                                                                                                                                  | `20128` / `20129`      |
| `APP_BIND_HOST`               | ממשק המארח שבו docker-compose מפרסם את הפורטים של לוח המחוונים, ה-API וה-WS בזמן אמת. כאשר `REQUIRE_API_KEY=false` (ברירת המחדל), `0.0.0.0` חושף את פרוקסי `/v1` האנונימי לרשת המקומית — יש להרחיב את החשיפה רק עם `REQUIRE_API_KEY=true` או עם פרוקסי הפוך בחזית. | `127.0.0.1`            |
| `CLIPROXY_BIND_HOST`          | ממשק המארח שבו docker-compose מפרסם את ה-sidecar מסוג `cliproxyapi` — אמצעי האחסון שלו מכיל את פרטי ההזדהות של הספק.                                                                                                                                               | `127.0.0.1`            |
| `OMNIROUTE_PLUGINS_DIR`       | התיקייה שסורק התוספים בזמן ריצה קורא ממנה ומתקין אליה. יש להגדיר אותה כאשר תוספים ממופים באמצעות bind mount: ברירת המחדל נגזרת מ-`HOME`, שאימג' אינו מחויב לייצא.                                                                                                  | `~/.omniroute/plugins` |
| `OMNIROUTE_BASE_PATH`         | תת-נתיב URL כאשר היישום מפורסם מאחורי פרוקסי הפוך (למשל `/omniroute`)                                                                                                                                                                                              | _(ריק = שורש)_         |
| `NEXT_PUBLIC_BASE_URL`        | מקור ציבורי עבור הדפדפן, כולל תת-הנתיב (למשל `https://host/omniroute`)                                                                                                                                                                                             | לא מוגדר               |
| `PROD_DASHBOARD_PORT`         | הפורט בצד המארח עבור לוח המחוונים של `docker-compose.prod.yml`                                                                                                                                                                                                     | `20130`                |
| `CLIPROXYAPI_PORT`            | הפורט בצד המארח עבור ה-sidecar מסוג `cliproxyapi`                                                                                                                                                                                                                  | `8317`                 |

## פרוקסי הפוך על נתיב משנה (Traefik / nginx)

Next.js `basePath` מורכב לתוך החבילה העצמאית. OmniRoute מתעד את הערך האפוי בקובץ זקיף בשורש האפליקציה (נכתב במהלך `npm run build`; נקרא על ידי `scripts/docker/ensure-docker-base-path.mjs`) ומשווה אותו ל- `OMNIROUTE_BASE_PATH` כאשר המיכל מתחיל. כאשר הם שונים והתמונה נבנתה עבור שורש הדומיין, נקודת הכניסה משכתבת את המניפסטים העצמאיים, את ה- `basePath`/`assetPrefix` המשובצים (הבא 16 מעבד SSR asset URLs מ- `assetPrefix` בלבד — התיקון משקף את תת-הנתיב לתוכו), את ה- `/_next/static` asset אפוי URLs, rendered media preference (cl, rendered media; client `process.env` shim לפני `node dev/run-standalone.mjs` פועל.

### מבנה חיבור (מומלץ)

הגדר את שני המשתנים ב- `.env` ולאחר מכן בנה מחדש כך שהתמונה וזמן הריצה יסכימו:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` מעביר `OMNIROUTE_BASE_PATH` כ- Docker build-arg וכמשתנה סביבת זמן ריצה.

### תת נתיב זמן ריצה + תמונת שורש בנויה מראש

תמונות `cheaperinference/omniroute:*` שפורסמו בנויות עבור שורש הדומיין. אתה עדיין יכול להגדיר `OMNIROUTE_BASE_PATH` בזמן ריצה; המיכל מתקן את החבילה פעם אחת בעת ההפעלה. הצמד אותו למקור הציבורי התואם:

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

הגדר את ה-proxy ההפוך כדי להעביר את** מָלֵא** נתיב חיצוני (אל תסיר את הקידומת). Traefik צריך לנתב את `PathPrefix(`/omniroute `)` לקונטיינר ללא `StripPrefix`, אז Next.js מקבל `/omniroute/...` ומשרת נכסים מ- `/omniroute/_next/...`.

בדיקת הבריאות Docker בודקת את נקודת הקצה הקלת משקל של מחזור החיים `/healthz` עם קידומת `OMNIROUTE_BASE_PATH` הפעיל. `/api/monitoring/health` נשאר זמין עבור אבחון human/dashboard ; כדי להפנות אליו את המכולה HEALTHCHECK (לדוגמה לאכיפת בריאות עמוקה), הגדר את `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. השביל הזה הוא א** עָמוֹק** בדוק ( תקציר ניטור DB + ) — מתאים ל- `HEALTHCHECK` נדיר של Docker אם תצטרף שוב, אבל** לֹא** עבור מרווחי Kubernetes `livenessProbe`.

עבור מתזמרים (Kubernetes, Nomad וכו'):

| בְּדִיקָה       | לְהַעֲדִיף                                                           | לְהִמָנַע                                       |
| --------------- | -------------------------------------------------------------------- | ----------------------------------------------- |
| חיים            | HTTP `GET /livez`, או TCP ביציאה הראשית (`PORT`, ברירת מחדל `20128`) | `/api/monitoring/health` כחיות                  |
| נְכוֹנוּת       | HTTP `GET /healthz`                                                  | פסקי זמן צמודים שמתייחסים לאירוע לולאה תפוס כמת |
| Deep / Blackbox | `/api/monitoring/health`                                             | —                                               |

`/healthz` מדווח על מחזור החיים של תהליך (`ok` / `starting` / `stopping`). `/livez` הוא תהליך חי בלבד (200 בכל פעם שהמטפל יכול לרוץ; הוא לא ממתין למוכנות). שניהם עדיין פועלים על אותה לולאת אירועי Node כטיפול בבקשות, כך שעבודת קטלוג או דחיסה קשורה ל-CPU יכולה לעכב את מותם — busy ≠. העדיפו חיוניות TCP אם פסק זמן של בדיקות HTTP. הנחיית בדיקה מלאה: [מדריך ניטור — Kubernetes המלצות בדיקה](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose with Caddy (HTTPS Auto-TLS)

ניתן לחשוף OmniRoute בצורה מאובטחת באמצעות הקצאת SSL האוטומטית של Caddy. ודא שרשומה DNS A של הדומיין שלך מפנה ל- IP של השרת שלך.

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

Caddy מגדיר את כותרות ההעברה הסטנדרטיות עבור המכולה במעלה הזרם. OmniRoute משתמש ב- `NEXT_PUBLIC_BASE_URL` כמקור הציבורי הקנוני להתקשרות חוזרת OAuth וקישורים ציבוריים שנוצרו; כתיבת לוח מחוונים מאומתת משתמשת בבקשות מאותו מקור בתוספת הגנת CSRF הקשורה להפעלה. אפשר `OMNIROUTE_TRUST_PROXY` רק עבור פריסות מתקדמות שבהן אתה רוצה בכוונה OmniRoute יגזור את המקור הציבורי מכותרות מועברות מהימנות במקום תצורה מפורשת.

## מנהרה מהירה של Cloudflare

התמיכה בלוח הבקרה עבור פריסות Docker כוללת **מנהרה מהירה של Cloudflare** בלחיצה אחת תחת `Dashboard → Endpoints`. בהפעלה הראשונה, `cloudflared` יורד רק בעת הצורך, מופעלת מנהרה זמנית לנקודת הקצה הנוכחית שלכם ב-`/v1`, וכתובת ה-URL שנוצרה בתבנית `https://*.trycloudflare.com/v1` מוצגת ישירות מתחת לכתובת ה-URL הציבורית הרגילה שלכם.

ניתן להציג או להסתיר את חלוניות המנהרות של נקודות הקצה (Cloudflare, Tailscale, ngrok) דרך `Settings → Appearance` מבלי לשנות את מצב המנהרה הפעילה.

### הערות על מנהרות

- כתובות URL של מנהרות מהירות הן זמניות ומשתנות לאחר כל הפעלה מחדש.
- מנהרות מהירות אינן משוחזרות אוטומטית לאחר הפעלה מחדש של OmniRoute או של הקונטיינר. הפעילו אותן מחדש מלוח הבקרה בעת הצורך.
- ההתקנה המנוהלת תומכת כעת ב-Linux, ב-macOS וב-Windows בארכיטקטורות `x64` / `arm64`.
- מנהרות מהירות מנוהלות משתמשות כברירת מחדל בתעבורת HTTP/2 כדי להימנע מאזהרות רועשות בנוגע למאגר UDP של QUIC בסביבות קונטיינרים מוגבלות. הגדירו `CLOUDFLARED_PROTOCOL=quic` או `auto` אם אתם מעוניינים בתעבורה אחרת.
- תמונות Docker כוללות אישורי CA בסיסיים של המערכת ומעבירות אותם ל-`cloudflared` המנוהל, וכך נמנעים כשלים באמון TLS כאשר המנהרה מאותחלת בתוך הקונטיינר.
- הגדירו `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` אם ברצונכם ש-OmniRoute ישתמש בקובץ בינארי קיים במקום להוריד קובץ חדש.

## תגיות תמונה

| תְמוּנָה                     | תָג      | גוֹדֶל  | תֵאוּר                                              |
| ---------------------------- | -------- | ------- | --------------------------------------------------- |
| `cheaperinference/omniroute` | `latest` | ~ 250MB | הֲכִי גָבוֹהַ** פורסם** SemVer יציב (לא git `main`) |
| `cheaperinference/omniroute` | `3.8.54` | ~ 250MB | הצמד מחלקה זו של תג עבור GitOps                     |

אותן תמונות מתפרסמות בשלושה מאגרים, עם אותם תקצירים לכל ארכיטקטורה: `cheaperinference/omniroute` (Docker Hub, ארגון Cheaper Inference, מ-3.8.53 ואילך), `ghcr.io/cheaper-inference/omniroute` וה- `diegosouzapw/omniroute` מדור קודם, ששומר על היסטוריית המשיכה שלו ועדיין מקבל כל מהדורה. פריסות `diegosouzapw/omniroute` קיימות ממשיכות להתעדכן; החלפת שם התמונה היא אופציונלית. ערוץ `:next` / `:next-web` לפני ההפצה למטה מפורסם ל- `diegosouzapw/omniroute` ו- GHCR בלבד.

מניפסט ריבוי פלטפורמות: `linux/amd64` + `linux/arm64` native (Apple Silicon, AWS Graviton, Raspberry Pi). Docker בוחר את הארכיטקטורה המתאימה באופן אוטומטי; העבר `--platform linux/amd64` אם אתה צריך לכפות אמולציית AMD64 על מארחי ARM.

### שחרור ערוצים

OmniRoute מפרסמת ערוצי Docker נפרדים עבור מהדורות יציבות, בדיקות סניף מהדורות אקטיביות ובניית פיתוחים.

| עָרוּץ                          | מָקוֹר                                | השתנות                       | שימוש מומלץ                                                                                                              |
| ------------------------------- | ------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `:<version>` / `:<version>-web` | שחרור Signed/versioned                | בלתי ניתן לשינוי             | פריסות ייצור שמצמידות גרסה מדויקת                                                                                        |
| `:latest` / `:latest-web`       | הֲכִי גָבוֹהַ** פורסם** SemVer יציב   | מצביע יציב משתנה             | עוקב אחר מהדורות יציבות** לְאַחַר** עבודה SemVer לפרסם — עושה** לֹא** עקוב אחר `main` או commits `release/v*` שלא פורסמו |
| `:next` / `:next-web`           | ברירת המחדל הנוכחית סניף `release/v*` | מצביע טרום שחרור ניתן לשינוי | תיקוני בדיקה שנחתו על ענף השחרור הפעיל אך עדיין אינם במהדורה יציבה                                                       |
| `:main` / `:main-web`           | סניף `main`                           | מצביע פיתוח ניתן לשינוי      | בדיקות פיתוח ואינטגרציה בלבד                                                                                             |

#### ספקי הפעלות אינטרנט: תמונות `-web`

כל ערוץ למעלה משמש כתג `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), בנוי משלב `runner-web` — אותה תמונה בתוספת Playwright ודפדפן Chromium. התמונה הפשוטה נשלחת** לְלֹא** כְּרוֹם; `gemini-web`, `claude-web` ו- `claude-turnstile` צריכים את זה.

הכשל נדחה, לא זמן ההפעלה: אותם ספקים מפרטים את הדגמים שלהם ומציגים כמחוברים בלוח המחוונים, ורק הבקשה הראשונה נכשלת עם

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

אם אתה משתמש בספקים האלה, משוך את תג `-web` של הערוץ שבו אתה כבר נמצא ב- — שום דבר אחר לא משתנה. בהתקנת npm/CLI (ללא תמונת Docker ), החלק החסר המקביל הוא הדפדפן הבינארי: הרץ `npx playwright install chromium` על המארח.

#### שימוש בערוץ טרום-הפצה

ערוץ `next` נבנה מחדש בכל דחיפה לסניף ברירת המחדל הנוכחי `release/v*` ומתפרסם הן עבור AMD64 והן ARM64. ענפי תחזוקה ישנים יותר אינם יכולים לדרוס אותו. הערוץ מספק תמונה ניתנת למשיכה עבור תיקונים שהתמזגו בענף השחרור הפעיל לפני חיתוך התג היציב הבא.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

עבור Docker Compose, עוקף את תג התמונה המשמש את הפרופיל הנבחר, ולאחר מכן משוך וצור מחדש את השירות:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### בטיחות והחזרה לאחור

`next` הוא ערוץ טרום שחרור צף. זה עשוי להשתנות בכל דחיפה לסניף השחרור הפעיל והוא** לא נתמך לשימוש בייצור** . הצמד את תקציר התמונה בעת הערכת מבנה ספציפי:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

לפני הבדיקה, גבה את נפח הנתונים OmniRoute או ספריית הנתונים המותאמים ל-bind. כדי לחזור אחורה, שחזר את הגרסה היציבה בעבר או עכל וצור מחדש את המיכל:

```bash
docker pull cheaperinference/omniroute:<stable-version>
docker compose up -d
```

מבנה ענף שחרור לעולם לא יכול להזיז `latest`; רק גרסה סמנטית יציבה מתאימה עשויה לקדם את המצביע היציב. תמונות `next` שומרות על בדיקת תמונת השחרור וחוסמות שער CRITICAL-vulnerability.

**`latest` אינה ערובה למטבע עבור git.** תיקונים ממוזגים ב- `main` או בענף `release/v*` הפעיל הם** לֹא** ב- `:latest` עד שתתפרסם תמונת SemVer יציבה ועבודת הפרסום תקדם `:latest` (אותו תקציר כמו ה- SemVer הזה). אם `latest` נראה קפוא בזמן ש- GitHub כבר מציג את התיקון, משוך `:next` כדי לבדוק את ענף השחרור או המתן לתג SemVer.

| אתה רוצה                                      | לְהִשְׁתַמֵשׁ                  |
| --------------------------------------------- | ------------------------------ |
| GitOps / הפקה שאסור להיסחף                    | Pin `:X.Y.Z` (או תקציר התמונה) |
| עקוב אחר אורוות שפורסמו וקבל שחזור בכל מהדורה | `:latest`                      |
| בדוק מתחייב `release/v*` שלא פורסם            | `:next` (לא ייצור)             |
| בדוק `main`                                   | `:main` (לא ייצור)             |

## עדכוני לוח הבקרה ב-Docker

קונטיינר שנוצר מתמונה שפורסמה אינו יכול להחליף את עצמו. כאשר OmniRoute מזהה שהוא פועל בתוך
קונטיינר (ללא עותק עבודה של `.git` ושלא כהתקנת npm), כרזת העדכון בלוח הבקרה הראשי מציגה את
פקודת המארח שיש להריץ במקום הוראות npm/git, יחד עם לחצן העתקה:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

שם השירות מגיע מ-`AUTO_UPDATE_SERVICE` (ברירת המחדל היא `omniroute`, השירות שבקובץ
`docker-compose.selfhost.yml`). הפקודה `pull` מקדמת רק תג צף (`latest`, `next`); בעת שימוש בתג
מקובע מסוג `:X.Y.Z`, יש לערוך תחילה את התג.

### עדכונים בלחיצה אחת באמצעות קובץ טריגר במארח

כדי לאפשר ל-**עדכון עכשיו** להמשיך לפעול בלי לעגן את `/var/run/docker.sock` (פעולה שמעניקה לקונטיינר
הרשאות root במארח — ראו את האזהרה לגבי פרופיל `cli` לעיל), הגדירו את `DOCKER_UPDATE_TRIGGER_FILE` בשירות
OmniRoute והפעילו תוכנת מעקב במארח:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

הנתיב חייב להיות בתוך `DATA_DIR` (ערכים יחסיים מחושבים ביחס אליו); כל נתיב אחר
נדחה. לאחר מכן, **עדכון עכשיו** כותב `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` לקובץ
הזה, מחזיר `202`, ולוח הבקרה מתשאל את `/api/system/version` עד שהגרסה החדשה פעילה
ואז נטען מחדש. במצב זה OmniRoute לעולם אינו מריץ מעטפת או פקודת Docker. כמו בכל פעולת
עדכון, הבקשה מתקבלת רק מלקוחות loopback/LAN.

ספריית נתונים המעוגנת באמצעות bind mount מספקת למארח נתיב יציב למעקב. יחידות `systemd` לדוגמה
(התאימו את `/srv/omniroute` לספרייה שמכילה את קובץ ה-compose ואת `data/`):

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

השירות מסיר את הבקשה לפני משיכת התמונה, כך שהרצה שנכשלה לא תיכנס ללולאה. ללא
`DOCKER_UPDATE_TRIGGER_FILE`, לוח הבקרה ממשיך להשתמש בתהליך הפקודות הידני.

## זמינות: ברירת המחדל SQLite היא עותק בודד

מלאי Docker / Kubernetes OmniRoute הוא** תהליך צומת אחד + כותב SQLite אחד** . זמינות גבוהה היא** לא נתמך** על הטופולוגיה ההיא.

| כְּפִיָה                                | תוֹצָאָה                                                                                                                                                                                                                                                            |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| סופר יחיד                               | לַעֲשׂוֹת** לֹא** הפעל מספר העתקים כנגד אותו קובץ SQLite. זה משחית את ה- DB.                                                                                                                                                                                        |
| צור מחדש / הפעל מחדש / HEALTHCHECK kill | **הפסקה מלאה** של SSE בטיסה, הפעלות של לוח המחוונים ומצב בזיכרון. כל לקוח מחובר נופל. בקשות חדשות במהלך חלון נקודת הקצה הריקה מקבלים פרוקסי הפוך**`502 Bad Gateway: Unknown error`** , לא OmniRoute JSON — לקוחות אינם יכולים להבחין בין זה לבין כשל בספק (#11015). |
| אותה לולאת אירוע כמו `/healthz`         | קטלוג עמוס או תקתק דחיסה עלולים לעכב בדיקות; פסק זמן קצר ואז מפעיל מחדש את** רַק** הֶעתֵק מְדוּיָק.                                                                                                                                                                 |

**מטריצת בדיקה** (ראה גם [המלצות בדיקה של Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ):

| בְּדִיקָה      | יַעַד                                                     | אין להשתמש                                      |
| -------------- | --------------------------------------------------------- | ----------------------------------------------- |
| חיים           | TCP על `PORT` (ברירת מחדל `20128`), או HTTP `/healthz` רך | `/api/monitoring/health`                        |
| נְכוֹנוּת      | HTTP `GET /healthz`                                       | פסקי זמן צמודים שמתייחסים לאירוע לולאה תפוס כמת |
| עמוק / בני אדם | `/api/monitoring/health`                                  | חיוניות קובלת אוטומטית                          |

**שדרוגים:** מצפים שכל פגישה תרד. לרוקן לקוחות אם אתה יכול; אין עדכון מתגלגל על ברירת המחדל SQLite. Compose `restart: unless-stopped` plus Docker `HEALTHCHECK` יחליף גם את התהליך היחיד כאשר המיכל אינו בריא - אותו רדיוס פיצוץ.

מניפסטים מוכנים ותרשים Helm חיים ב- `deploy/kubernetes/` ו- `deploy/helm/omniroute/` - עיין [במדריך הפריסה של Kubernetes](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

קטע Kubernetes עבור א** העתק בודד** (צריך ליצור מחדש; אין להעלות `replicas` כנגד קובץ SQLite אחד):

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

`preStop` sleep מאפשר ל-kube להוריד את נקודות הקצה של השירות לפני SIGTERM** חָדָשׁ** התנועה מפסיקה לפגוע בתהליך הגוסס. `/v1/responses` SSE בטיסה מתנקז עד ל- `SHUTDOWN_TIMEOUT_MS` (ברירת מחדל של 30s) באמצעות חוזי קבלה במשקל כבד (#11015). בקשות חדשות שעדיין מגיעות לתהליך מקבלות `503` + `Retry-After: 5`. הפער מחדש של נקודת הקצה הריקה עד שההחלפה תהיה מוכנה נותרה הפסקה קשה - כלומר טופולוגיית SQLite, לא תצורת בדיקה שגויה.

Postgres חיצוני / multi-writer HA הוא** לֹא** נתיב מלאי מתועד. אם אתה צריך HA, שמור העתק בודד או הפעל טופולוגיה שהפרויקט נבדק ותיעד בנפרד. עבודת Postgres/MySQL גרה ב- [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). עד שזה יישלח, הדרך הנתמכת היחידה להתרבות** גָדוֹל** קיבולת `/v1/responses` היא N תהליכים עצמאיים (הסעיף הבא), לא `replicas > 1` על כרך אחד.

## קנה מידה: N תהליכים עצמאיים

### בעלות על סיבוב אסימון Codex

עותקים של חשבון Codex אחד אינם חייבים לצרוך באופן עצמאי את אסימון הרענון החד פעמי שלו. במופעים שצורכים רק אישורים מסונכרנים, הגדר `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (כינוי `cx`). השאר אותו לא מוגדר על הבעלים של הסיבוב היחיד. כל תהליך עדיין צריך `DATA_DIR` משלו; אפשרות זו אינה חולקת SQLite ואינה מספקת סנכרון אסימונים או נעילה מבוזרת.

המופע הפסיבי קורא מחדש את החיבור כאשר יש צורך ברענון ומאמץ רק אסימון גישה אחר שלא פג. אחרת, הרענון מושבת מבלי לפוג או לבטל את החיבור או לספור כשל מפסק הרענון. כשלי אימות אמיתיים במעלה הזרם עדיין משתמשים בחשבונאות כשלים רגילה, צינון אקספוננציאלי ובשגיאת הלקוח הרגילה; השבתת החשבון נשארת לצמיתות. סנכרן את האסימונים המסובבים של הבעלים לפני שפג תוקפם של אסימוני הגישה (ברירת המחדל של הפקת הרענון הפרואקטיבית היא חמש דקות), או ייבא מחדש את קובץ Codex Auth. יבוא פסיבי מאחסן את האסימונים שסופקו מבלי לאמת אותם בנקודת הקצה של האסימון. רענון dashboard/API ידני מחזיר את `409 refresh_disabled`; כניסות OAuth חדשות לא השתנו. ראה [התייחסות לסביבה](../reference/ENVIRONMENT.md#passive-codex-token-refresh).

תהליך צומת אחד הוא** ערימת V8 אחת** . שניים חופפים ~ 3 MiB / ~ 750k-token-coding agent `POST /v1/responses` (RTK + Caveman) מבטלים את הערימה הזו ב- ~ 12 Gi (`FATAL ERROR: Reached heap limit`) ויכולים OOM ל-16 Gi cgroup. ראה [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). המדידה הזו היא א** זיכרון-תקציב** אזהרה, לא מוצר hard-max של שניים בו-זמניים ארוך `/v1/responses`. כניסת צ'אט במשקל כבד מסודרת על ידי תקציב בייט אינטגרציה הנגזר אוטומטית (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) בגודל מאותה תקרת V8/cgroup — עוקף אותו כלפי מעלה (או הגדרת מכסת ספירת הבקשות `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` מדור קודם) בתהליך בגודל כבר מפעיל מחדש את ההפסקה. צ'אטים קטנים, `/healthz`, `/v1/models` ו- MCP הם** לֹא** בכובע הזה.

### תהליך אחד: יותר משני `/v1/responses` ארוכים

א** בָּרִיא** תהליך (ערימה מתחת ל- `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, ברירת המחדל `0.75`)** מַאִי** להפעיל יותר משני `POST /v1/responses` ארוכים בו-זמנית כאשר עדיין יש מקום לתקציב בתים בטיסה (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) הכולל את התהליך. גופים ב- `OMNIROUTE_CHAT_LARGE_BODY_BYTES` או מעליו (ברירת מחדל 256 KiB) לוקחים את אותה חוזה שכירות כבד כמו בקשות כבדות מבנה ומשתמשים באותו [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` escape (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). עשרות לקוחות SSE ארוכים במקביל (המפעילים צריכים לעתים קרובות 40–50) הוא א** זיכרון-תקציב** שאלה — size heap + primary/headroom חריצים + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — לא מגבלת מוצר "מקסימום 2" קשה. ערימה בלחץ עדיין נשירה עם `503` שניתן לנסות שוב כך ש-#7849 לא חוזר.

אֶל** להרבות ערימות** (חללי V8 עצמאיים)** הַיוֹם** :

| לַעֲשׂוֹת                                                                                                 | אל תעשה                                             |
| --------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| לָרוּץ** נ containers/pods** , כל אחד עם שלו** שֶׁלוֹ** `DATA_DIR` / נפח                                  | הגדר `replicas > 1` כנגד קובץ SQLite אחד            |
| גודל כבד + בריא-מרווח ראש מתקציב ערימה/בייט בטיסה; 1–2 הוא ברירת המחדל השמרנית #7849, לא מקסימום מוצר קשה | תן לתהליך אחד 8 × RAM ומכסת ספירה בלתי מוגבלת       |
| אופציונלי: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` עבור** מוני מכסות משותפים**               | התייחס Redis כאל SQLite — משותף, זה לא              |
| שכפל סודות ספק לכל מופע (או קבל לוחות מחוונים מחולקים)                                                    | צפו ללוח מחוונים אחד / יומן שיחות אחד על פני מופעים |
| חזית עם כל מאזן עומסים; דביק על ידי מקש API או סשן זה מספיק                                               | דרוש תוכנת ביניים המודעת לגודל ספציפי לספק          |

ניתן לשתף זיקה בין הפעלה לחשבון גם באמצעות Redis: הגדר `OMNIROUTE_SESSION_AFFINITY_STORE=redis` ו- `REDIS_URL` בכל תהליך, עם אותו `REDIS_KEY_PREFIX` והגדרת `sessionAffinityTtlMs` חיובית. סיכות פותרות זהויות של חשבון שימוש גיבוב לחיבור המקומי הכשיר של כל תהליך, כך שחשבונות OAuth עם מטא-נתונים של זהות תואמים אינם צריכים להיות בעלי חיבור תואם IDs. זהויות חשבון ידועות עדיפות על פני IDs מקומי סותר ברזולוציית סיכות ובפינוי מוגן; רשומות ללא זהות (או מתקשרים לפינוי ללא זהות) שומרים על משמר ID מדור קודם. חשבונות ללא זהות שימוש יציבה עדיין דורשים התאמת IDs. שגיאות Redis או שיחות העולות על 100 ms נופלות בחזרה ל- SQLite המקומי. כל חנות זיקה של Redis מגדירה פעולות יוצאות דופן ב-8, עוקפת Redis מיד כשהיא מלאה, ומשחררת משבצות רק כשהעבודה הבסיסית מסתיימת, לא במועד האחרון של המתקשר. במהלך הפסקת Redis אין אמת משותפת: כל מופע חוזר לזיקה המקומית שלו, הפעלות עשויות להצמיד מחדש פעם אחת בכל מופע, ומופעים עשויים להתפצל. הדביקות מתכנסת מחדש דרך Redis כאשר היא מתאוששת. גבולות הזמן הקצוב ממתינים, לא שלח EVAL, שעלול לנחות לאחר החזרה. כתיבת ניתוב משווה את הערך המדויק שנצפה על ידי החלטת הניתוב, לא קריאה חדשה בזמן המוטציה; החמצה נצפתה או תצפית ניתנת להשוואה של SQLite כמפתח Redis נעדר. סיכות מיושנות מוחלפות ב- CAS אחד, כך שפקודה מאוחרת לא יכולה להחליף או למחוק סיכה חדשה יותר ושונה. Redis קורא באופן אטומי מחזיר את הערך ואת השרת הנותר TTL; PTTL חיובי (או ללא תפוגה) קובע את רמת החיים, לא את חותמת ה- JSON של הכותב או את השעון של הקורא. צילומי מצב מקומיים ממפים את TTL שנותר לתאריך יעד מקומי; מפתחות JSON קיימים נשארים קריאים והבתים הגולמיים שלהם נשמרים עבור CAS. Redis הוא מקור האמת היחיד בזמן שהוא עונה. העלאות, נגיעות ומחיקות משותפות שאושרו מסירות את הערך המקומי, לעולם אל תתקין או תרענן אותו. SQLite בנתיב Redis מחזיק רק את החלטות הנפילה של מופע זה משלו משגיאות Redis, פסקי זמן או רווית קבלה, מוגבלת TTL כמו קודם. סיכה מקומית חסרה בהפסקה מאוחרת יותר עולה בחירה חדשה אחת (החמצה אחת של פקודה-מטמון), לא חשבון שגוי או פונה. העליות שנדחו מחזירות את הזוכה המשותף ואת TTL הנותר שלו מבחינה אטומית: בחירה רגילה בודקת מחדש את המועד האחרון המקומי הממופת ומשתמשת בזוכה זכאי עדיין חי, נוגעת בשימוש וברישום עבור חשבון זה ללא כתיבה משותפת נוספת. אם הוא לא זמין, הבחירה שומרת על המועמד המקומי, משאירה את הסיכה המשותפת ללא שינוי ופולטת הודעת ניפוי באגים אחת. דחוי CAS לא כותב SQLite; שגיאות Redis, פסקי זמן או רוויה בכניסה להחיל את הפעולה המקומית הקיימת במקום זאת. אם תשובת מוטציה שנשלחה מגיעה לאחר פסק זמן (התקבלה, נדחתה או שגיאה), השווה-ומחיקה של ערך סידורי מדויק מסיר רק את שורת פסק-זמן זהה ל-bytes. אין לחכות בין ההשוואה הזו לבין המחיקה; כתיבת הפסקה חדשה יותר נשמרת. פינוי שמור מסיר את הסיכה המקומית של החשבון הכושל אפילו עם Redis למטה, ומנקה אותו שוב לאחר פינוי משותף שאושר. ממתינים לתשובות משותפות קודמות לא ניתן לשחזר סיכה מקומית שסולקה מכיוון שהצלחות משותפות לעולם לא כותבות SQLite. הפסקה מאוחרת יותר יכולה להצמיד חשבון מחדש; כתיבה משותפת שהתקבלה מאוחר יותר קיימת רק ב- Redis. מתפסים Redis אין להתייעץ עם מדינת החזרה המקומית. כשהנהג כבוי, פינים שנבחרו לאחרונה שומרים על צורת SQLite JSON של ארבעה שדות; רק ניתוב Redis מוסיף את זהות החשבון המגובב. סיכות שנשלפו מראש נבדקות מחדש בגבול התפוגה שלהן. בחירה ללא חכירה Redis קוראת מחדש את החנות, אך תכנון שכירות סינכרוני עדיין יכול להשתמש בסיכה שפונה בין אחזור מראש לתכנון (חלון מקובל של מאמץ מיטבי). התחייבות לחכירה אינה יכולה להחליף חשבונות לאחר תביעה מתמשכת: בהעלאה שנדחתה היא שומרת על המועמד הנטען עבור בקשה זו בלבד ומשאירה את הזוכה המשותף ללא נגיעה, כך שהסכמה בין המקרים מוגבלת לנתיב זה. שאר הטבלה עדיין חלה: זה לא חולק דביקות של הפעלה משולבת, סיכות סיבוב Codex מקוריות, סמפורות חשבון, נעילות, מגבלות הוצאות, תצורה או יומני שיחות.

חומרה: לכל מופע בו זמנית `/v1/responses` ארוך הוא a** זיכרון-תקציב** שאלה (heap + inflight-byte / #10110). `N` עצמאיים `DATA_DIR` עדיין מכפילים ערימות: המארח RAM חייב לכסות `N × cgroup`, לא "תרמיל אחד של 16 Gi עם N = 8." לעולם `replicas > 1` על קובץ SQLite אחד.

חיבור סקיצה (שתי ערמות, שני כרכים — לא `deploy.replicas: 2`):

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

צפיפות בתהליך (דחיסה מחוץ ל- HTTP isolate) היא [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). אשכול לוגי אחד במצב עמיד משותף הוא [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## שגיאות אזוריות של Gemini בתוך Docker

Google AI Studio / Gemini API עשוי להחזיר HTTP 400 עם FAILED_PRECONDITION ועם
`User location is not supported for the API use.` בקשה שהצליחה במארח
אינה מוכיחה שהקונטיינר משתמש באותו נתיב יציאה. סדר ה-DNS,
קישוריות IPv4/IPv6, ניתוב VPN ושרתי proxy מוגדרים עשויים להיות שונים. בדקו את
[האזורים הנתמכים של Google](https://ai.google.dev/gemini-api/docs/available-regions)
וכן את נתיב החיבור בפועל; שגיאה זו לבדה אינה מצביעה על מפתח API שגוי.

### העדיפו proxy ייעודי לחיבור

השתמשו ב[תצורת proxy לכל חיבור](../ops/PROXY_GUIDE.md#4-level-proxy-system) של OmniRoute
עבור חיבור Gemini המושפע, ולאחר מכן הפעילו שוב את **בדיקת החיבור** ובקשה קטנה
עם אותו מודל. כך שינוי הניתוב נשאר מוגבל לאותו חיבור. ודאו
שה-proxy נגיש מתוך הקונטיינר ושהחיבור אכן בוחר
בו. שינוי הנתיב אינו מבטיח זכאות אזורית אצל ספק השירות.

### השוו בין רשת המארח לרשת הקונטיינר

בעת השוואת תוצאות מאומתות, השאירו את המפתח, המודל והבקשה זהים; לעולם אל
תדביקו בפרסום בעיה פרטי גישה, סיסמאות proxy או כותרות הרשאה מלאות.
תחילה בדקו אילו משפחות כתובות מציע פותר השמות של מערכת ההפעלה, באמצעות אותה פקודה
במארח ובתוך הקונטיינר:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

החליפו את `omniroute` בשירות שאתם מפעילים (לדוגמה, `omniroute-web`). פקודות אלה
מדפיסות משפחות כתובות ללא פרטי גישה או כתובות IP. הערך `6` שמוחזר
מציין רק תוצאת DNS מסוג IPv6: הוא **אינו** מוכיח שקיים נתיב IPv6 שמיש או שיש גישה ל-API.
כאשר `curl` מותקן, השוו את `curl -4 -I https://generativelanguage.googleapis.com`
עם `curl -6 -I https://generativelanguage.googleapis.com` בשתי הסביבות.
תגובת HTTP מוכיחה קישוריות עבור בדיקה זו, גם אם מדובר בשגיאה
ללא אימות; רק בקשת מודל מאומתת בודקת זכאות לשימוש ב-Gemini.

### חלופה ברמת המארח: IPv6 פעיל ומדיניות פותר השמות

המדווח על [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) החזיר
את הגישה בסביבה שלו באמצעות הפעלת IPv6 בקונטיינר ושינוי
בחירת הכתובות של glibc. התייחסו לכך כאל חלופה התלויה בסביבה. ודאו ש-IPv6
פועל במארח, ושניתוב היציאה של הקונטיינר וכללי חומת האש תקינים, לפני שינוי העדפות פותר השמות.
כתובת ULA פרטית בפני עצמה אינה מעידה על קישוריות IPv6 ציבורית.

עבור שירותים שכבר מחוברים לרשת ברירת המחדל של Compose, מקטע זה מפעיל
IPv6 ברשת זו; השאירו ללא שינוי את יתר הגדרות השירות, היציאות, אמצעי האחסון והתצורה:

```yaml
networks:
  default:
    enable_ipv6: true
```

עבור רשת בעלת שם, הפעילו זאת ברשת שאליה השירות מחובר בפועל. Docker יכול
להקצות רשת משנה מסוג ULA; בחרו רשת משנה מפורשת שאינה חופפת רק כאשר הרשת שלכם
דורשת זאת. ראו [רשתות IPv6 ב-Docker](https://docs.docker.com/engine/daemon/ipv6/)
ו[אפשרויות רשת של Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

ב-**image המבוסס על glibc**, הקובץ `/etc/gai.conf` יכול לשנות את בחירת הכתובות. קובץ
ה-Dockerfile הנוכחי של המאגר משתמש ב-Debian; מנגנון זה אינו קיים ב-images מותאמים המבוססים על musl.
השינוי שדווח משנה את תווית ה-ULA מ-`label fc00::/7 6` ל-
`label fc00::/7 1`. התחילו מטבלת המדיניות המלאה של ה-image ושמרו על שאר
הרשומות שלה: הוספת רשומת `label` או `precedence` מחליפה את טבלת ברירת המחדל הזו, ולכן קובץ
שמכיל רק את השורה שהשתנתה אינו מספיק. ה-
[מפרט התצורה של glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
מתעד את הסמנטיקה הזו. בצעו bind mount לקובץ שנבדק במצב קריאה בלבד ב-`/etc/gai.conf`
וצרו מחדש את השירות כדי להחיל אותו.

שינוי זה משפיע על בחירת הכתובות של מערכת ההפעלה עבור **כל תעבורת היציאה בקונטיינר הזה**.
הוא אינו מאלץ כל יישום לבחור ב-IPv6: גם סדר ה-DNS ובחירת החיבור
של Node משפיעים. בפרט, `--dns-result-order=ipv4first` נותן עדיפות ל-IPv4
ואינו פתרון לכשל שמתרחש ב-IPv4 בלבד. ראו [סדר DNS ב-Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

בדקו מחדש את Gemini ואת הספקים האחרים שלכם לאחר כל שינוי ברמת המארח. כדי לחזור לאחור,
הסירו את ה-mount המותאם של `gai.conf`, שחזרו את תצורת הרשת הקודמת
וצרו מחדש את השירות/הרשת המושפעים במהלך חלון תחזוקה. יצירה מחדש של רשת
עלולה לשבש קונטיינרים אחרים שמחוברים אליה; אל תמחקו את אמצעי האחסון של הנתונים המתמשכים.

## הערות חשובות

- **מצב WAL של SQLite:** יש לאפשר ל-`docker stop` להסתיים, כדי ש-OmniRoute יוכל לבצע checkpoint של השינויים האחרונים בחזרה אל `storage.sqlite`. קובצי ה-Compose המצורפים כבר מגדירים תקופת חסד של 40 שניות לעצירה. אם אתם מריצים את ה-image ישירות, השאירו את `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** הגדירו ל-`true` אם גיבויים שגרתיים/לפני כתיבה מנוהלים חיצונית. מיגרציות של מסדי נתונים קיימים עדיין דורשות תמונת מצב עמידה משלהן לצורכי בטיחות ואמצעי הגנה למיגרציה המונית.
- **שמירת נתונים:** תמיד חברו volume אל `/app/data` כדי לשמר את מסד הנתונים, המפתחות והתצורות שלכם בין הפעלות מחדש של הקונטיינר.
- **תצורת פורט:** דרסו את משתנה הסביבה `PORT` כדי לשנות את פורט ברירת המחדל `20128`.

## ראו גם

- [מדריך פריסה ב-VM](../ops/VM_DEPLOYMENT_GUIDE.md) — הגדרת VM + nginx + Cloudflare
- [מדריך פריסה ב-Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — פריסה אל Fly.io
- [תצורת סביבה](../reference/ENVIRONMENT.md) — תיעוד מלא של `.env`
