# SQLite Runtime Resolution (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute தொடக்கத்தின்போது தனது SQLite இயக்கியை 5-படி மாற்று வீழ்ச்சி சங்கிலி மூலம் தீர்மானிக்கிறது:

1. **தொகுப்புடன் இணைக்கப்பட்ட `better-sqlite3`** (`package.json`-இல் உள்ள `dependencies` மூலம்)
   — மிக வேகமானது, நேட்டிவ் பைனரி; உருவாக்கக் கருவிகள் இருக்கும்போது `npm install` மூலம் நிறுவப்படும்.

2. **இயக்கநேரத்தில் நிறுவப்பட்ட `better-sqlite3`** (`~/.omniroute/runtime/`-இல்)
   — முதல் இயக்கத்தின்போது தேவைக்கேற்ப **அல்லது** `scripts/build/postinstall.mjs → scripts/postinstall.mjs` மூலம் நிறுவப்படும்.
   சேதமடைந்த அல்லது தவறான இயங்குதளத்திற்கான பைனரிகளிலிருந்து பாதுகாக்க, ஏற்றுவதற்கு முன்
   நேட்டிவ் `.node` மேஜிக் பைட்டுகளை (ELF / Mach-O / PE) சரிபார்க்கிறது.

3. **`node:sqlite`** (Node ≥22.5 நிலையான நூலகம்) — நேட்டிவ் உருவாக்கம் தேவையில்லை;
   better-sqlite3-இன் இரு பாதைகளும் தோல்வியடையும்போது பயன்படுத்தப்படும். வரையறுக்கப்பட்ட அம்சத் தொகுப்பைக் கொண்டது.

4. **`sql.js`** (WASM) — இறுதி மாற்று வழி. எல்லா இடங்களிலும் செயல்படும், ஆனால் மெதுவானது;
   மேலும் தரவை ஒத்திசைவாக எழுதுவதற்குப் பதிலாக குறிப்பிட்ட இடைவெளிகளில் எழுதுகிறது.

## இந்தச் சிக்கலான அமைப்பு ஏன்?

- **Windows EBUSY**: முந்தைய பதிப்பின் `better_sqlite3.node`, இயங்கிக்கொண்டிருக்கும் ஒரு செயல்முறையால்
  பூட்டப்பட்டிருந்தால், `npm install -g omniroute@latest` தோல்வியடையலாம். `~/.omniroute/runtime/`-இல்
  செய்யப்படும் இயக்கநேர நிறுவல், உலகளாவிய npm தற்காலிக சேமிப்பைத் தவிர்க்கிறது.
- **உருவாக்கக் கருவிகள் இல்லை**: சில சூழல்களால் (VS Build Tools இல்லாத நிறுவன Windows,
  குறைந்தபட்ச Docker படிமங்கள்) `better-sqlite3`-ஐ தொகுக்க முடியாது. இயக்கநேர நிறுவி,
  npm பதிவகத்திலிருந்து முன்பே உருவாக்கப்பட்ட பைனரியைத் தீர்மானிக்கிறது; அதுவும் தோல்வியடைந்தால்,
  மாற்று இயக்கிகள் OmniRoute தொடர்ந்து தொடங்குவதை உறுதிசெய்கின்றன.
- **வெளிப்புற இணைப்பில்லாத அமைப்புகள்**: npm பதிவகத்தை அணுக முடியாவிட்டால், `node:sqlite`
  அல்லது `sql.js` அடிப்படைச் செயல்பாட்டிற்கு உத்தரவாதம் அளிக்கிறது.

## மேஜிக்-பைட் சரிபார்ப்பு

இயக்கநேரத்தில் நிறுவப்பட்ட `.node` கோப்பை ஏற்றுவதற்கு முன், OmniRoute அதன் முதல் 8
பைட்டுகளைப் படித்து, அறியப்பட்ட இயங்குதள மேஜிக்குகளுடன் பொருத்திப் பார்க்கிறது:

| இயங்குதளம்            | பைட்டுகள் (hex) | குறிச்சொல்  |
| --------------------- | --------------- | ----------- |
| Linux                 | `7F 45 4C 46`   | `elf`       |
| macOS 64-bit BE       | `FE ED FA CF`   | `macho`     |
| macOS 64-bit LE       | `CF FA ED FE`   | `macho-le`  |
| macOS fat (universal) | `CA FE BA BE`   | `macho-fat` |
| Windows               | `4D 5A` (MZ)    | `pe`        |

பொருந்தாத மேஜிக் → கோப்பு புறக்கணிக்கப்பட்டு, மாற்று வீழ்ச்சி அடுத்த படிக்குத் தொடரும்.

## செயலில் உள்ள இயக்கியைச் சரிபார்த்தல்

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## கைமுறைக் கட்டுப்பாடு

```bash
# வேகமான CI நிறுவல்களுக்காக postinstall முன்-தயாரிப்பைத் தவிர்க்கவும்
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# இயக்கநேர better-sqlite3-ஐ கட்டாயமாக மீண்டும் நிறுவவும்
rm -rf ~/.omniroute/runtime
omniroute  # அடுத்த தொடக்கத்தில் மீண்டும் நிறுவப்படும்

# எந்த இயக்கி செயலில் உள்ளது என்பதைச் சரிபார்க்கவும்
omniroute config db-info  # (CLI கட்டளை இருந்தால்)
```

## ஒத்திசைவுச் செயல்பாட்டு முடக்கங்களை ஆய்வுசெய்தல்

ஒத்திசைவு அடாப்டர் நேர அளவீட்டை விருப்பத்துடன் இயக்க, `better-sqlite3` உடன் தொடங்குவதற்கு முன்
`OMNIROUTE_SQLITE_SLOW_MS=200` என அமைக்கவும். இயல்பாக இது முடக்கப்பட்டிருக்கும். நிறைவடைந்த ஒரு
செயல்பாடு குறைந்தபட்சம் அவ்வளவு மில்லிவினாடிகள் எடுத்தால், ஒவ்வொரு அடாப்டருக்கும் பத்து
வினாடிகளுக்கு அதிகபட்சம் ஒருமுறை `[SQLITE-SLOW]` எச்சரிக்கை வெளியிடப்படும். அந்த எச்சரிக்கையில்
இயக்கி, செயல்பாட்டு வகை (`prepare`, `get`, `all`, `run`, `exec`, `pragma`, பரிவர்த்தனை அல்லது
பராமரிப்பு) மற்றும் கடந்த மில்லிவினாடிகள் மட்டுமே இடம்பெறும்: SQL, பிணைப்புகள், வரிசைகள்,
பாதைகள் அல்லது விதிவிலக்கு உரை எதுவும் இடம்பெறாது.

இது ஓர் ஆய்வுதவி மட்டுமே; காலக்கெடு அல்லது வினவல் மேம்படுத்தல் அல்ல. ஒருபோதும் திரும்பாத
செயல்பாட்டைப் புகாரளிக்கவோ, CPU பணியை வட்டு காத்திருப்பிலிருந்து வேறுபடுத்தவோ, துல்லியமான
SQL-ஐ அடையாளம் காணவோ அல்லது நேரடி இயக்கிக் கைப்பிடி மூலம் செய்யப்படும் செயல்பாடுகளைக்
கண்காணிக்கவோ இதனால் முடியாது. ஒத்திசைவற்ற காப்புப்பிரதி கால அளவு வேண்டுமென்றே
விலக்கப்பட்டுள்ளது; மற்ற SQLite இயக்கிகள் இந்த விருப்பத் தேர்வால் கருவிமயப்படுத்தப்படுவதில்லை.
இந்த மாறியை முடக்குவது, நேர அளவீட்டுச் சுற்றுப்பொதிகள் இல்லாத அசல் அடாப்டரை மீட்டமைக்கும்.
தரவுத்தளத் திட்டவடிவத்திலோ சேமிக்கப்பட்ட உள்ளமைவிலோ எந்த மாற்றமும் ஏற்படாது.

`/healthz` தாமத எச்சரிக்கை, மொத்த வாழ்நாள் சராசரியை அல்லாமல், முந்தைய மாதிரியிலிருந்து
நிகழ்வு-சுழற்சியின் உச்சத்தைப் புகாரளிக்கிறது. ஒரு முடக்கத்திற்கான காரணமாக SQLite அல்லது
வட்டுத் தோல்வியை நிர்ணயிப்பதற்கு முன், அதன் நேரமுத்திரைகளை மெதுவான செயல்பாட்டு எச்சரிக்கைகள்
மற்றும் ஹோஸ்ட்/சேமிப்பக அளவீடுகளுடன் தொடர்புபடுத்திப் பார்க்கவும்.

## மேற்கோள்

செயலாக்கம்:

- `bin/cli/runtime/magicBytes.mjs` — பைனரி மேஜிக்-பைட் சரிபார்ப்பு உதவிகள்
- `bin/cli/runtime/sqliteRuntime.mjs` — 5-படி இயக்கநேரத் தீர்மானிப்பான் + தேவைக்கேற்ப நிறுவி
- `bin/cli/runtime/index.mjs` — தொடக்க ஒருங்கிணைப்பான் (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — npm நிறுவலுக்குப் பிந்தைய கொக்கி (தோல்வி ஏற்படுத்தாத முன்-தயாரிப்பு)
- `src/lib/db/core.ts` — `ensureDbInitialized()` / `getDriverInfo()` ஏற்றுமதிகள்

## ஒற்றை-எழுத்தாளர் கட்டமைப்பு (HA ஆதரிக்கப்படவில்லை)

மேலே உள்ள இயக்கி மாற்று வீழ்ச்சி சங்கிலி இன்னும் **ஒரே செயல்முறையில்** இயங்குகிறது. இயல்புநிலை
SQLite OmniRoute என்பது **ஒற்றை எழுத்தாளர்** அமைப்பாகும்:

- ஒரே `storage.sqlite` கோப்புடன் இரண்டு OmniRoute பிரதிகளை இணைக்க வேண்டாம்.
- கண்டெய்னர் மறுதொடக்கம், Recreate வரிசைப்படுத்தல், OOM kill அல்லது HEALTHCHECK மறுதொடக்கம்
  ஆகியவை செயல்பாட்டிலுள்ள ஒவ்வொரு SSE அமர்வையும் துண்டிக்கும். வழக்கமான பாதையில் அமர்வுகளை
  முறையாக வடிப்பதற்கான வசதி இல்லை.
- மெதுவான `/healthz`-ஐ செயலிழந்ததாகக் கருதும் ஒருங்கிணைப்பான் liveness, ஒரே பிரதியைக்
  கொன்றுவிடும். TCP liveness + HTTP `/healthz` readiness-ஐப் பயன்படுத்துவது சிறந்தது. மேலும்
  [Docker வழிகாட்டி — கிடைப்புத்தன்மை](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  மற்றும் [Kubernetes probe பரிந்துரைகள்](./MONITORING_GUIDE.md#kubernetes-probe-recommendations) ஆகியவற்றைப் பார்க்கவும்.
