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

## הפעלה מהירה

> **אירוח עצמי בפקודה אחת?** ראו את
> [המדריך לאירוח עצמי](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (Image שפורסם +
> Redis, גישה מ-loopback בלבד, ללא בחירת פרופיל). ההפעלה המהירה שלהלן היא
> מסלול המבוסס על קונטיינר יחיד עבור משתמשים שכבר מפעילים Redis במקום אחר.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## עם קובץ סביבה

```bash
# תחילה העתיקו וערכו את .env
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

## שלבי Dockerfile

המאגר כולל Dockerfile רב-שלבי (`Dockerfile`). ארבעה שלבים חשופים; בחרו את ה-`target` המתאים לתרחיש השימוש שלכם.

| שלב           | תמונת בסיס            | מטרה                                                                                                                                                                                                                                             |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `builder`     | `node:26-trixie-slim` | מתקין תלויות (`npm ci --legacy-peer-deps`) ומריץ `npm run build` (כברירת מחדל עם Turbopack — ראו משאבים בזמן הבנייה להלן)                                                                                                                        |
| `runner-base` | `node:26-trixie-slim` | סביבת הרצה לייצור עם הפלט העצמאי של Next.js. **אינה כוללת ממשקי CLI של ספקים.**                                                                                                                                                                  |
| `runner-cli`  | `runner-base`         | מוסיף את `git`,‏ `docker.io`,‏ `docker-compose` וממשקי CLI גלובליים: `@openai/codex`,‏ `@anthropic-ai/claude-code`,‏ `droid`,‏ `openclaw`. **בחרו בזה עבור תהליכי עבודה מבוססי סוכנים.**                                                         |
| `runner-web`  | `runner-base`         | מוסיף Playwright ודפדפן Chromium (`--with-deps`) עבור ספקי סשנים באינטרנט: `gemini-web`,‏ `claude-web`,‏ `claude-turnstile`. **בחרו בזה בעת שימוש בספקים האלה** — התמונה הרגילה נכשלת בזמן הבקשה בלעדיו (ראו את ההערה על `-web` תחת ערוצי הפצה). |

בנו יעד מסוים באופן ידני:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### משאבים בזמן הבנייה

שלושה ארגומנטים של בנייה שולטים בעלות המשאבים של שלב ה-`builder`. הם חלים בזמן הבנייה בלבד —
`OMNIROUTE_MEMORY_MB` (להלן) הוא פרמטר נפרד לזמן הריצה.

| ארגומנט בנייה               | ברירת מחדל | השפעה                                                                                          |
| --------------------------- | ---------- | ---------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`        | `0` בונה באמצעות webpack: צריכת זיכרון מרבית נמוכה יותר, אך איטי יותר. `1` מפעיל את Turbopack. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`     | תקרת ערימת V8 (`--max-old-space-size`) עבור תהליך `next build` שנוצר.                          |
| `OMNIROUTE_BUILD_WORKERS`   | `2`        | מזין את `CIRCLE_NODE_TOTAL`;‏ Next גוזר `workers = N - 1` לאיסוף נתוני דפים.                   |

`OMNIROUTE_BUILD_WORKERS` הוא הפרמטר שיש להגדיל בסביבת בנייה חזקה, והפרמטר
שיש לחשוד בו כאשר בנייה בסביבה מוגבלת נכשלת **לאחר** `✓ Compiled successfully`. כל
תהליך עיבוד של נתוני דפים הוא תהליך נפרד, וכך גם תהליך האב `next build` עצמו;
שחזור בסביבת VPS פעילה (בעיה #7518) מדד שיא RSS של
~4.5 GB לכל תהליך, ללא תלות בדגל הערימה `NODE_OPTIONS` (‏Turbopack מבצע הידור
בזיכרון מקורי/Rust מחוץ לערימת V8). ברירת המחדל `2` (← תהליך עיבוד אחד, 2
תהליכים בסך הכול) מותאמת לסביבות הריצה המתארחות ב-GitHub עם 16 GB / 4 vCPU שבהן
משתמש תהליך הפרסום. בערך `8` (← 7 תהליכי עיבוד) אזל הזיכרון בסביבת הריצה ו-
buildkit הכשיל את השלב עם `ResourceExhausted: ... cannot allocate memory`;
גם `3` (← 2 תהליכי עיבוד) לא התאים לאחר שה-RSS לכל תהליך נמדד
ישירות במקום להיות מוסק. הקובץ `tests/unit/docker-build-memory-budget.test.ts`
מבצע את החישוב מול הנתון שנמדד ונכשל אם אחד מהפרמטרים
חורג מקיבולת סביבת הריצה.

Turbopack מבצע הידור בזיכרון Rust מקורי שנמצא **מחוץ** לערימת V8, ולכן
`OMNIROUTE_BUILD_MEMORY_MB` אינו מגביל אותו. במארח עם תקרת זיכרון,
תהליך הבנייה מומת ב-SIGKILL על ידי מנגנון ה-OOM ללא טקסט שגיאה כלל — הוא פשוט
נעצר באמצע `Creating an optimized production build`, דבר שנראה כמו תקיעה ולא
כמחסור בזיכרון. זו הסיבה שברירת המחדל של `Dockerfile` היא webpack
(`OMNIROUTE_USE_TURBOPACK=0`), בשונה מ-`npm run dev` / `npm run build`, שבהם
Turbopack הוא ברירת המחדל בקוד: הפעלה פשוטה של `docker build .` ללא ארגומנטים לבנייה (כפי
ש-Railway ושירותי אירוח אחרים בלחיצה אחת מריצים) אינה יכולה להיכשל בשקט בסביבת בנייה
עם מגבלת זיכרון. התמונות שפורסמו כבר מעבירות במפורש את
`OMNIROUTE_USE_TURBOPACK=0` בתוך `docker-publish.yml`. בסביבת בנייה עם כמות גדולה של RAM, הפעילו את
Turbopack לקבלת בנייה מהירה יותר:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` מופעל, ולכן `next build` מריץ תהליך אב **וגם** תהליך עיבוד,
וכל אחד מהם מכבד בנפרד את `OMNIROUTE_BUILD_MEMORY_MB`. הגדירו את תקרת הקונטיינר
ליותר מכפליים מערך זה בקירוב, ולא לערך יחיד.

נמדד בעץ זה (`--target runner-base`,‏ `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| מאגד      | תקרת הקונטיינר | תוצאה                               |
| --------- | -------------- | ----------------------------------- |
| Turbopack | 8 GiB / 16 GiB | הומת עקב OOM בשני המקרים, ללא הודעה |
| webpack   | 8 GiB          | תהליך הבנייה הומת ב-SIGKILL         |
| webpack   | 12 GiB         | הצליח, עם שיא של 11.1 GiB           |

### ברירות מחדל בזמן הריצה

ברירות המחדל שמיוצאות על ידי `runner-base`:‏ `PORT=20128`,‏ `HOSTNAME=0.0.0.0`,‏ `OMNIROUTE_MEMORY_MB=1024`,‏ `NODE_OPTIONS=--max-old-space-size=1024`,‏ `DATA_DIR=/app/data`,‏ `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

התנהגות הזיכרון ב-Docker:

- התמונה מגדירה `OMNIROUTE_MEMORY_MB=1024` וגוזרת ממנה את `NODE_OPTIONS=--max-old-space-size=1024`.
- תהליך השרת בפועל מופעל על ידי המשגר העצמאי, שקורא את `OMNIROUTE_MEMORY_MB` ומוסיף `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node משתמש בערך האחרון של `--max-old-space-size` כאשר הדגל מופיע מספר פעמים, ולכן הגדרת `OMNIROUTE_MEMORY_MB` שולטת במגבלת ערימת הזיכרון האפקטיבית ב-Docker.
- מכיוון שהתמונה תמיד מגדירה אותו, ברירת המחדל של המשגר עצמו, המכוילת לפי זיכרון ה-RAM, לעולם אינה חלה תחת Docker. הגדילו אותו במפורש בהתאם לעומס העבודה (בטבלה שלהלן). גם `2048` קטן מדי עבור `/v1/responses` של סוכני תכנות.

### זיכרון RAM בזמן ריצה עבור סוכני תכנות

ברירת המחדל של 1 GiB ב-Docker היא רף מינימלי ללוח מחוונים/צ'אט קל, ולא גודל המתאים לסביבת ייצור. גופי בקשה ארוכים של `POST /v1/responses` (מאות הודעות, עשרות כלים) שומרים מספר גרפים בזיכרון במהלך הדחיסה. שתי בקשות חופפות בגודל של כ-3 MiB / כ-750k טוקנים גרמו ל-V8 להפסיק לפעול עם מרחב אובייקטים ישנים של **12 GiB** (`FATAL ERROR: Reached heap limit`), וגם הגיעו למצב OOM של cgroup בנפח 16 GiB. ראו [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

הגדירו את **`--memory` של cgroup לערך גבוה מגודל הערימה** — מאגרים מקומיים, SQLite ותוצרי ביניים של דחיסה נמצאים מחוץ ל-V8.

| עומס עבודה                              | `OMNIROUTE_MEMORY_MB`       | קונטיינר / cgroup      | הערות                                                                                           |
| --------------------------------------- | --------------------------- | ---------------------- | ----------------------------------------------------------------------------------------------- |
| לוח מחוונים, צ'אט קל אחד                | `1024` (ברירת המחדל בתמונה) | ≥2 GiB                 |                                                                                                 |
| סוכן תכנות אחד (Claude/Codex/Grok)      | `8192`                      | ≥10 GiB                | הפעלה טיפוסית של `/v1/responses` בסשן יחיד                                                      |
| שתי בקשות `/v1/responses` ארוכות במקביל | `10240`–`12288`             | ≥12–16 GiB             | נמדדה הפסקת פעולה של V8 בערימת זיכרון של כ-12 GiB                                               |
| שלושה הקשרים ארוכים או יותר במקביל      | אין להריץ בתהליך יחיד       | עיבוד סדרתי / יותר RAM | ברירת המחדל לקבלת עומסים כבדים היא בקשה אחת בביצוע; הגדלתה ללא RAM נוסף תגרום שוב להפסקת הפעולה |

`omniroute serve` על חומרה פיזית מכייל כ-35% מזיכרון ה-RAM (מוגבל לטווח `[512, 4096]`) כאשר `OMNIROUTE_MEMORY_MB` **אינו מוגדר**. Docker תמיד מגדיר אותו כ-`1024`, ולכן הכיול הזה לעולם אינו מופעל בתמונה הרשמית.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
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

## פרוקסי הפוך בתת-נתיב (Traefik / nginx)

הערך `basePath` של Next.js עובר הידור לתוך החבילה העצמאית. OmniRoute מתעד את הערך
המוטמע בקובץ sentinel בשורש היישום (נכתב במהלך `npm run build`; נקרא על ידי
`scripts/docker/ensure-docker-base-path.mjs`) ומשווה אותו מול
`OMNIROUTE_BASE_PATH` כאשר הקונטיינר מופעל. כאשר הערכים שונים והתמונה נבנתה עבור
שורש הדומיין, נקודת הכניסה משכתבת את המניפסטים העצמאיים, את הליטרלים המוטמעים של
`basePath`/`assetPrefix` (Next 16 מרנדר כתובות URL של נכסי SSR מתוך
`assetPrefix` בלבד — כלי התיקון משקף לתוכו את תת-הנתיב), את כתובות ה-URL המוטמעות
של נכסי `/_next/static` (מניפסטים של הפניות לקוח, ייבואי מדיה, דפי שגיאה שעברו
רינדור מראש) ואת ה-shim של `process.env` בצד הלקוח, לפני הרצת
`node dev/run-standalone.mjs`.

### בנייה באמצעות Compose (מומלץ)

הגדירו את שני המשתנים בקובץ `.env`, ולאחר מכן בנו מחדש כדי שהתמונה וסביבת הריצה
יהיו תואמות:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` מעביר את `OMNIROUTE_BASE_PATH` כארגומנט בנייה של Docker
וכמשתנה סביבת ריצה.

### תמונת שורש שנבנתה מראש + תת-נתיב בזמן ריצה

התמונות המפורסמות `diegosouzapw/omniroute:*` נבנות עבור שורש הדומיין. עדיין ניתן
להגדיר את `OMNIROUTE_BASE_PATH` בזמן ריצה; הקונטיינר מתקן את החבילה פעם אחת בעת
ההפעלה. השתמשו בו יחד עם המקור הציבורי התואם:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

הגדירו את הפרוקסי ההפוך כך שיעביר את הנתיב החיצוני **במלואו** (אין להסיר את
הקידומת). על Traefik לנתב את `PathPrefix(`/omniroute`)` אל הקונטיינר ללא
`StripPrefix`, כדי ש-Next.js יקבל את `/omniroute/...` ויגיש נכסים מתוך
`/omniroute/_next/...`.

בדיקת התקינות של Docker בודקת את נקודת הקצה הקלה של מחזור החיים `/healthz`,
בתוספת `OMNIROUTE_BASE_PATH` הפעיל כקידומת. הנתיב `/api/monitoring/health` נותר
זמין לאבחון ידני או באמצעות לוח מחוונים; כדי להפנות אליו מחדש את ה-HEALTHCHECK
של הקונטיינר (לדוגמה, לצורך אכיפת תקינות מעמיקה), הגדירו
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. נתיב זה מבצע בדיקה
**מעמיקה** (מסד נתונים + סיכום ניטור) — מתאימה ל-`HEALTHCHECK` הלא-תכוף של Docker
אם תבחרו להפעיל אותה מחדש, אך **לא** למרווחי `livenessProbe` של Kubernetes.

עבור מערכות תזמור (Kubernetes, Nomad וכדומה):

| בדיקה                | העדפה                                                                | הימנעות                                                      |
| -------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------ |
| חיות                 | HTTP `GET /livez`, או TCP ביציאה הראשית (`PORT`, ברירת מחדל `20128`) | `/api/monitoring/health` כבדיקת חיות                         |
| מוכנות               | HTTP `GET /healthz`                                                  | מרווחי זמן קצרים שמתייחסים ללולאת אירועים עמוסה כאל תהליך מת |
| מעמיקה / קופסה שחורה | `/api/monitoring/health`                                             | —                                                            |

`/healthz` מדווח על מחזור החיים של התהליך (`ok` / `starting` / `stopping`).
`/livez` בודק רק שהתהליך חי (200 בכל פעם שהמטפל יכול לפעול; הוא אינו ממתין
למוכנות). שניהם עדיין פועלים על אותה לולאת אירועים של Node המשמשת לטיפול בבקשות,
ולכן עבודת קטלוג או דחיסה עתירת CPU עלולה לעכב אותם — עמוס ≠ מת. העדיפו בדיקת
חיות באמצעות TCP אם הזמן המוקצב לבדיקות HTTP מסתיים. הנחיות מלאות לבדיקות:
[מדריך ניטור — המלצות לבדיקות Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose עם Caddy ‏(HTTPS Auto-TLS)

ניתן לחשוף את OmniRoute באופן מאובטח באמצעות הקצאה אוטומטית של אישורי SSL על ידי Caddy. ודאו שרשומת ה-A ב-DNS של הדומיין שלכם מפנה לכתובת ה-IP של השרת.

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
      # מקור הפונה לדפדפן עבור קריאות חוזרות של OAuth, קישורי לוח הבקרה וכתובות URL ציבוריות שנוצרו.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # כתובת URL פנימית לתקשורת בין שרתים עבור משימות מתוזמנות / בקשות עצמיות.
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

Caddy מגדיר את כותרות ההעברה הסטנדרטיות עבור הקונטיינר שבמעלה הזרם. OmniRoute משתמש
ב-`NEXT_PUBLIC_BASE_URL` כמקור הציבורי הקנוני עבור קריאות חוזרות של OAuth וקישורים ציבוריים
שנוצרו; פעולות כתיבה מאומתות בלוח הבקרה משתמשות בבקשות מאותו מקור יחד עם הגנת CSRF
הקשורה להפעלה. הפעילו את `OMNIROUTE_TRUST_PROXY` רק בפריסות מתקדמות שבהן ברצונכם
ש-OmniRoute יגזור את המקור הציבורי מכותרות העברה מהימנות במקום מתצורה מפורשת.

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

| תמונה                    | תגית     | גודל   | תיאור                                                       |
| ------------------------ | -------- | ------ | ----------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | גרסת SemVer היציבה **שפורסמה** הגבוהה ביותר (לא git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | קבעו תגית מסוג זה עבור GitOps                               |

מניפסט מרובה פלטפורמות: `linux/amd64` + `linux/arm64` באופן מקורי (Apple Silicon, AWS Graviton, Raspberry Pi). ‏Docker בוחר אוטומטית את הארכיטקטורה המתאימה; העבירו `--platform linux/amd64` אם עליכם לכפות אמולציית AMD64 במארחי ARM.

### ערוצי הפצה

OmniRoute מפרסם ערוצי Docker נפרדים עבור גרסאות יציבות, בדיקות פעילות של ענף ההפצה וגרסאות פיתוח.

| ערוץ                            | מקור                                        | יכולת שינוי                 | שימוש מומלץ                                                                                                             |
| ------------------------------- | ------------------------------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | הפצה חתומה/בעלת גרסה                        | בלתי ניתן לשינוי            | פריסות ייצור המקבעות גרסה מדויקת                                                                                        |
| `:latest` / `:latest-web`       | גרסת SemVer היציבה **שפורסמה** הגבוהה ביותר | מצביע יציב הניתן לשינוי     | עוקב אחר גרסאות יציבות **לאחר** משימת פרסום SemVer — **אינו** עוקב אחר `main` או אחר קומיטים שטרם פורסמו ב-`release/v*` |
| `:next` / `:next-web`           | ענף `release/v*` הנוכחי המוגדר כברירת מחדל  | מצביע קדם-הפצה הניתן לשינוי | בדיקת תיקונים שהוטמעו בענף ההפצה הפעיל אך עדיין אינם חלק מגרסה יציבה                                                    |
| `:main` / `:main-web`           | ענף `main`                                  | מצביע פיתוח הניתן לשינוי    | לפיתוח ולבדיקות אינטגרציה בלבד                                                                                          |

#### ספקי הפעלות אינטרנט: תמונות `-web`

כל אחד מהערוצים לעיל זמין גם כתגית `-web`‏ (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), הנבנית מהשלב `runner-web` — אותה תמונה בתוספת Playwright ודפדפן Chromium. התמונה הרגילה מסופקת **ללא** Chromium; הספקים `gemini-web`, `claude-web` ו-`claude-turnstile` זקוקים לו.

הכשל נדחה ואינו מתרחש בזמן האתחול: ספקים אלה מציגים את המודלים שלהם ומופיעים כמחוברים בלוח הבקרה, ורק הבקשה הראשונה נכשלת עם

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

אם אתם משתמשים בספקים אלה, משכו את תגית `-web` של הערוץ שבו אתם כבר נמצאים — דבר אחר אינו משתנה. בהתקנת npm/CLI (ללא תמונת Docker), הרכיב החסר המקביל הוא הקובץ הבינארי של הדפדפן: הריצו `npx playwright install chromium` במארח.

#### שימוש בערוץ הקדם-הפצה

הערוץ `next` נבנה מחדש בכל דחיפה לענף ברירת המחדל הנוכחי `release/v*`, ומתפרסם הן עבור AMD64 והן עבור ARM64. ענפי תחזוקה ישנים יותר אינם יכולים לדרוס אותו. הערוץ מספק image שניתן למשוך, הכולל תיקונים שמוזגו לענף הגרסה הפעיל לפני יצירת תג הגרסה היציבה הבא.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

עבור Docker Compose, החליפו את תג ה-image המשמש את הפרופיל שנבחר, ולאחר מכן משכו וצרו מחדש את השירות:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### בטיחות וחזרה לגרסה קודמת

`next` הוא ערוץ קדם-גרסה צף. הוא עשוי להשתנות בכל דחיפה לענף הגרסה הפעיל, ו**אינו נתמך לשימוש בסביבת ייצור**. קבעו את תקציר ה-image בזמן הערכת build מסוים:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

לפני הבדיקה, גבו את אמצעי האחסון של נתוני OmniRoute או את ספריית הנתונים המחוברת באמצעות bind mount. כדי לחזור לגרסה קודמת, שחזרו את הגרסה היציבה או את התקציר שבהם השתמשתם קודם, וצרו מחדש את הקונטיינר:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

build מענף גרסה לעולם אינו יכול להזיז את `latest`; רק גרסה סמנטית יציבה העומדת בתנאים יכולה לקדם את המצביע היציב. ה-images של `next` ממשיכים לכלול את בדיקת ה-image של הגרסה ואת שער החסימה עבור פגיעויות ברמת CRITICAL.

**`latest` אינו מבטיח עדכניות ביחס ל-git.** תיקונים שמוזגו אל `main` או אל הענף הפעיל `release/v*` **אינם** כלולים ב-`:latest` עד לפרסום image יציב בגרסת SemVer ועד שמשימת הפרסום מקדמת את `:latest` (עם אותו תקציר כמו אותה גרסת SemVer). אם נראה ש-`latest` תקוע בזמן שהתיקון כבר מופיע ב-GitHub, משכו את `:next` כדי לבדוק את ענף הגרסה, או המתינו לתג ה-SemVer.

| מה ברצונכם לעשות                                           | במה להשתמש                          |
| ---------------------------------------------------------- | ----------------------------------- |
| GitOps / סביבת ייצור שאסור שתסטה                           | קבעו `:X.Y.Z` (או את תקציר ה-image) |
| לעקוב אחר גרסאות יציבות שפורסמו ולאפשר יצירה מחדש בכל גרסה | `:latest`                           |
| לבדוק commits של `release/v*` שטרם פורסמו                  | `:next` (לא לייצור)                 |
| לבדוק את `main`                                            | `:main` (לא לייצור)                 |

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

## הרחבה אופקית: N תהליכים עצמאיים

תהליך Node אחד הוא **ערימת V8 אחת**. שתי בקשות חופפות של סוכני קוד, בגודל ~3 MiB / ~750k טוקנים, אל `POST /v1/responses` ‏(RTK + Caveman), גורמות להפסקת הערימה בסביבות ~12 Gi (`FATAL ERROR: Reached heap limit`) ועלולות לגרום ל-OOM ב-cgroup של 16 Gi. ראו [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). המדידה הזו היא אזהרת **תקציב זיכרון**, ולא מגבלה מרבית קשיחה של המוצר לשתי בקשות `/v1/responses` ארוכות ובו-זמניות. קבלת צ'אטים כבדים מוגבלת באמצעות תקציב בתים לקליטה, הנגזר אוטומטית (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) ומחושב לפי אותה תקרת V8/cgroup — הגדלתו באמצעות דריסה (או הגדרת מגבלת מספר הבקשות הישנה `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) בתהליך שכבר הוגדר לגודל מתאים תחזיר את הכשל. צ'אטים קטנים, `/healthz`,‏ `/v1/models` ו-MCP **אינם** נכללים במגבלה הזו.

### תהליך יחיד: יותר משתי בקשות `/v1/responses` ארוכות

תהליך **תקין** (ערימה מתחת ל-`OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, ברירת המחדל `0.75`) **עשוי** להריץ יותר משתי בקשות `POST /v1/responses` ארוכות ובו-זמניות, כאשר עדיין נותר מקום בתקציב הבתים של בקשות בתהליך (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110). גופי בקשות בגודל `OMNIROUTE_CHAT_LARGE_BODY_BYTES` ומעלה (ברירת המחדל 256 KiB) מקבלים את אותה הקצאה כבדה כמו בקשות בעלות מבנה כבד, ומשתמשים באותו נתיב מילוט `tryAcquireHealthyHeadroom` של [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) ‏(`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). עשרות לקוחות SSE ארוכי-חיים ובו-זמניים (מפעילים זקוקים לעיתים קרובות ל-40–50) הם שאלה של **תקציב זיכרון** — יש להתאים את גודל הערימה, את המשבצות הראשיות/העודפות ואת `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — ולא מגבלת מוצר קשיחה של „מקסימום 2”. ערימה הנתונה ללחץ עדיין משילה עומס באמצעות `503` שניתן לניסיון חוזר, כדי ש-#7849 לא יחזור.

כדי **להכפיל ערימות** (מרחבי old-space עצמאיים של V8) **כיום**:

| יש לעשות                                                                                                                                                                  | אין לעשות                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| להריץ **N קונטיינרים/pods**, שלכל אחד מהם `DATA_DIR` / אמצעי אחסון **משלו**                                                                                               | להגדיר `replicas > 1` מול קובץ SQLite יחיד                |
| להתאים את מספר הבקשות הכבדות הפעילות + הקיבולת העודפת התקינה בהתאם לתקציב הערימה / הבתים של הבקשות הפעילות; 1–2 הם ברירת המחדל השמרנית בעקבות #7849, ולא מגבלת מוצר קשיחה | להעניק לתהליך אחד פי 8 זיכרון RAM ומגבלת מספר בלתי מוגבלת |
| אופציונלי: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` עבור **מוני מכסה משותפים**                                                                                | להתייחס ל-Redis כאל SQLite משותף — הוא אינו כזה           |
| לשכפל את סודות הספקים בכל מופע (או לקבל לוחות מחוונים מפוצלים)                                                                                                            | לצפות ללוח מחוונים אחד / יומן קריאות אחד בכל המופעים      |
| להציב מלפנים כל מאזן עומסים; הצמדה לפי מפתח API או session מספיקה                                                                                                         | לדרוש middleware ייעודי לספק ומודע לגודל                  |

חומרה: מספר בקשות `/v1/responses` ארוכות ובו-זמניות לכל מופע הוא שאלה של **תקציב זיכרון** (ערימה + תקציב בתים של בקשות פעילות / #10110). גם `N` ערכי `DATA_DIR` עצמאיים מכפילים את הערימות: זיכרון ה-RAM של המארח חייב להספיק ל-`N × cgroup`, ולא ל„pod יחיד של 16 Gi עם N=8”. לעולם אין להשתמש ב-`replicas > 1` עבור קובץ SQLite יחיד.

דוגמת Compose (שתי ערימות, שני אמצעי אחסון — לא `deploy.replicas: 2`):

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

צפיפות בתוך התהליך (העברת הדחיסה אל מחוץ ל-isolate של HTTP) מתוארת ב-[#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). אשכול לוגי אחד על גבי מצב עמיד משותף מתואר ב-[#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

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
