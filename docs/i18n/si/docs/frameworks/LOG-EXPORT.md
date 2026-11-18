# Log export (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

OmniRoute ඇමතුම් ලොග බාහිර විශ්ලේෂණ දත්ත ගබඩාවකට අඛණ්ඩව, වර්ධක ලෙස අපනයනය කිරීම.

Logs උපකරණ පුවරු ටැබය ඉල්ලීම් ඉතිහාසය SQLite (`call_logs`) තුළ තබා ගන්නා අතර, එය
චක්‍රීය මාරු කිරීම සහ රඳවාගැනීම මගින් සීමා වේ. ලොග අපනයනය එම වාර්තා කට්ටලයම කාලසටහනකට අනුව පිටතට යවයි. එමගින් එය
දේශීය දත්ත සමුදායට වඩා දිගු කාලයක් පවත්වාගෙන ගොස් වෙනත් දත්ත සමඟ සම්බන්ධ කළ හැක. පළමු ගමනාන්තය BigQuery ය;
මෙම සැකසුම් දාමය රෙජිස්ට්‍රියක් බැවින් තවත් ගමනාන්ත එකතු කළ හැක.

---

## 1. එය ක්‍රියා කරන ආකාරය

```
server (decrypt + validate config, reconcile cursor)
  → start IPC → isolated exportChild OS process
    → read-only storage.sqlite → shared call-log query/mapping
      → async artifact hydration → destination prepare()/send()
        → batch IPC → server persists cursor → ack IPC
          → next batch; done IPC → server records success
```

- **කාලසටහන** — එක් `JobRegistry` cron කාර්යයක් වන `log_export`, පෙරනිමියෙන් `0 * * * *` (සෑම පැයකට වරක්,
  UTC) ලෙස ක්‍රියාත්මක වේ. එය `src/lib/initCloudSync.ts` තුළ ලියාපදිංචි කර ඇත; `OMNIROUTE_LOG_EXPORT_CRON` මගින් අභිබවා සැකසිය හැක.
  සෑම වාරයකදීම **සක්‍රීය** සියලු ගමනාන්තවල ඉතිරි වාර්තා අනුපිළිවෙළින් යවනු ලැබේ.
- **කර්සරය** — SQLite හි නිහිත `call_logs.rowid`, එක් එක් ගමනාන්තය සඳහා
  `log_export_destinations.cursor_row_id` තුළ ස්ථිරව ගබඩා කෙරේ. `timestamp` හිතාමතාම කර්සරය ලෙස භාවිත නොකෙරේ: ඇමතුම්කරුවන්ට
  තමන්ගේම අගයක් ලබා දිය හැකි බැවින්, පසුව ආරම්භ වූ වේගවත් ඉල්ලීමකට පසුව මන්දගාමී ඉල්ලීමක් ලියැවිය හැකි අතර,
  කාලමුද්‍රා කර්සරයක් එය මඟ හරිනු ඇත.
- **කණ්ඩායම් කිරීම** — එක් ඉල්ලීමකට `batch_size` පේළි (පෙරනිමිය 500), එක් ධාවනයකට `max_rows_per_run` පේළි
  (පෙරනිමිය 10000) භාවිත වේ. එමගින් විශාල පසුගොඩක් එක් වාරයක් අවහිර කරනවා වෙනුවට වාර කිහිපයක් පුරා යවනු ලැබේ.
- **බෙදාහැරීම** — කර්සරය ඉදිරියට යන්නේ `send()` සාර්ථකව අවසන් වූ පසුව පමණි. කණ්ඩායමක් අසාර්ථක වුවහොත්
  කර්සරය තිබූ තැනම පවතින බැවින්, ඊළඟ ධාවනයේදී එම පේළිම නැවත උත්සාහ කෙරේ. ලබා දෙන සහතිකය
  අවම වශයෙන් එක් වරක් බෙදාහැරීම සහ ගමනාන්තය පැත්තේ අනුපිටපත් ඉවත් කිරීම මිස සැබෑ ලෙසම හරියටම එක් වරක් බෙදාහැරීම නොවේ: BigQuery සෑම
  පේළියක්ම ඇමතුම්-ලොග හැඳුනුමෙන් යතුරුගත කරන අතර, තම අනුපිටපත් ඉවත් කිරීමේ කාල පරාසය තුළ එය හැකි උපරිමයෙන් පිළිපදියි.
- **සමපාත ධාවන ආරක්ෂාව** — cron වාරය සහ `POST .../run` එකවර ක්‍රියාත්මක විය හැක. දැනටමත්
  වාර්තා යවමින් පවතින ගමනාන්තයක් දෙවරක් යැවීම වෙනුවට මඟ හරිනු ලැබේ (ධාවන ප්‍රතිඵලයේ `skipped: true`),
  එබැවින් සමගාමී ධාවනයකට කණ්ඩායමක් නැවත යැවීමට හෝ කර්සරය පසුපසට ලිවීමට නොහැක.
- **සම්පූර්ණ මකාදැමීමකින් ප්‍රතිසාධනය** — `cursor_row_id`, `MAX(rowid)` ට වඩා ඉහළ අගයකට පත් වුවහොත් (මුළු වගුවම
  මකා දමා rowid නැවත ආරම්භ කර තිබේ නම්), ධාවකය ස්ථිරව දත්ත නොදැක සිටිනවා වෙනුවට 0 වෙත ආපසු යයි.

### හුදකලා ධාවකය සහ සීමා

Node මත සෑම ගමනාන්ත ධාවනයක්ම වෙනම, කෙටි කාලීන OS ළමා ක්‍රියාවලියක් ආරම්භ කරයි (`child_process`
සමඟ IPC භාවිතයෙන් මිස `worker_threads` නොවේ). අන්තර්ගත කියවීම්, payload JSON විග්‍රහ කිරීම/අනුක්‍රමීකරණය, ගමනාන්තයේ
`prepare()` සහ ගමනාන්ත ජාල I/O සියල්ල ක්‍රියාත්මක වන්නේ එහි මිස සේවාදායකයේ සිදුවීම් ලූපය මත නොවේ.
IPC හරහා යන්නේ වින්‍යාසය සහ කුඩා ප්‍රගති පණිවිඩ පමණි; අපනයනය කළ වාර්තා කිසිවිටෙක
සේවාදායකය වෙත ආපසු නොඑයි. cron කාර්යය සහ දැන් ධාවනය කරන්න මාර්ගය එකම පොදු ප්‍රතිඵලය සහ සමපාත ධාවන ආරක්ෂාව පවත්වා ගනී.

ළමා ක්‍රියාවලිය සේවාදායකය විසින් නිශ්චය කළ `DATA_DIR/storage.sqlite`, `node:sqlite` භාවිතයෙන් කියවීමට පමණක් විවෘත කරයි,
`busy_timeout=5000` සහ `query_only=ON` සමඟ. එය කිසිදු DB singleton එකක් ආයාත නොකරන අතර
සංක්‍රමණ, උපස්ථ හෝ SQLite යාවත්කාලීන කිරීම් සිදු නොකරයි. අස්ථානගත/දූෂිත ආටිෆැක්ට් පිළිබඳ ගිණුම් තැබීම (දූෂිත-ආටිෆැක්ට් UPDATE
ඇතුළුව) උපකරණ පුවරුවේ විස්තර මාර්ගය තුළ පමණක් පවතී. මාර්ග දෙකම අතුරු ආබාධ රහිත
විස්තර විසඳුම්කාරකයක් හවුලේ භාවිත කරයි; අපනයනය අසමමුහුර්ත ගොනු පද්ධති කියවීම් සහ එකම ආටිෆැක්ට් → පැරණි
පේළිගත → පැරණි තැටිගත → කිසිවක් නැත යන විසඳුම් අනුපිළිවෙළ භාවිත කරයි. ළමා ක්‍රියාවලිය තම කියවනය විවෘත කරන විට ධාවනයක් උපරිම ඇතුළත් කිරීමේ rowid හි ස්නැප්ෂොට් එකක්
ගනී; පසුව ඇතුළත් කිරීම් ඊළඟ ධාවනය තෙක් රැඳී සිටියි. මෙය ඇතුළත් කිරීමේ
සීමාවක් මිස දිගුකාලීන SQLite ගනුදෙනුවක් නොවේ: ජාලය සඳහා රැඳී සිටින අතරතුර WAL ලියන්නන් සහ මුරපොළ ක්‍රියාකාරකම් නිදහසේ පවතී.
දැනට පවතින පේළි යාවත්කාලීන කිරීම/මකාදැමීම මෙම සීමාවෙන් නවත්වනු නොලැබේ.

පිළිගත් සෑම කණ්ඩායමකටම පසුව ළමා ක්‍රියාවලිය තහවුරු කිරීමක් සඳහා රැඳී සිටියි. සේවාදායකය පළමුව
`advanceLogExportCursor` මගින් කර්සරය ස්ථිරව ගබඩා කර, පසුව `ack` යවයි; ඊට පෙර ඊළඟ කණ්ඩායම ආරම්භ නොවේ.
යැවීමේ අසාර්ථකත්වයක්, බිඳවැටීමක් හෝ කාලය ඉක්මවීමක් එම කණ්ඩායම ඉදිරියට නොගෙන අසාර්ථකත්වය සටහන් කරයි. පෙර
තහවුරු කළ කණ්ඩායම් ස්ථිරව පවතී; නැවත යැවිය හැක්කේ උපරිම වශයෙන් තහවුරු නොකළ එක් කණ්ඩායම පමණි.
සාර්ථකත්වය සටහන් කරන්නේ `done` සහ ළමා ක්‍රියාවලියේ දෝෂ රහිත පිටවීමකට පසුව පමණි. අසාර්ථක වීම් ළමා ක්‍රියාවලිය
SIGTERM මගින් අවසන් කරන අතර, 500 ms පසුව SIGKILL දක්වා උත්සන්න කරයි. ධාවකය ක්‍රියාවලිය වැසෙන තෙක් රැඳී සිටියි.

| පරිසර විචල්‍යය                                | පෙරනිමිය | අරමුණ                             |
| --------------------------------------------- | -------- | --------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000   | එක් ගමනාන්තයක සැබෑ ගතවන කාල සීමාව |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024     | ළමා V8 old-space සීමාව MB වලින්   |

වලංගු නොවන/ධන නොවන/පූර්ණ සංඛ්‍යා නොවන අගයන් වෙනුවට පෙරනිමි භාවිත වේ. heap සැකසුම සමස්ත
RSS සීමාවක් නොවේ; ඉතා විශාල කණ්ඩායම් තවමත් ළමා ක්‍රියාවලියේ මතකය අවසන් කර ධාවනය ආරක්ෂිතව අසාර්ථක කළ හැක.
1024 MB පෙරනිමිය, අන්තර්ගත සක්‍රීය කර ඇති 512 KiB ආටිෆැක්ට් සහිත පෙරනිමි පේළි 500 කණ්ඩායම සඳහා
BigQuery හි බයිට් අනුව කොටස් කළ JSON අනුක්‍රමීකරණයද ඇතුළුව අමතර ඉඩක් ඉතිරි කරයි. එය
පේළි 10000 ක අන්තර්ගත කණ්ඩායමක් ආරක්ෂිත කරන්නේ නැත. V8 heap අවසන් වීම, පියවර ගත හැකි අසාර්ථකත්වයක් සටහන් කරයි: කණ්ඩායම්
ප්‍රමාණය අඩු කරන්න හෝ `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` වැඩි කරන්න; කර්සරය අවසන් වරට
තහවුරු කළ කණ්ඩායමේම පවතී. පැරණි පේළිගත/තැටිගත අන්තර්ගත නවීන ආටිෆැක්ට් සීමාවට යටත් නොවේ.
විශේෂයෙන් මතක සීමා සහිත බහාලුම් තුළදී, ක්‍රියාකරුවන් RSS සඳහා වෙනම සම්පත් වෙන් කළ යුතුය.

ළමා ක්‍රියාවලියට උරුම වන්නේ විසඳාගත් `DATA_DIR`, `NODE_ENV`, පැහැදිලිව දක්වා ඇති `TZ` (පැරණි ගොනු නාමවල
දේශීය වේලාව නිරාකරණය කිරීම සඳහා), තිබේ නම් `ELECTRON_RUN_AS_NODE`, සහ පහත පිටතට යන සම්බන්ධතා ආදාන පමණි:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (සහ ඒවායේ කුඩා අකුරු ආකාර),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
ගෝලීය Undici dispatcher එකක්, `NO_PROXY` ඇතුළුව, සේවාදායකයේ පරිසරය මත පමණක් පදනම් වූ ප්‍රොක්සි නිරාකරණය සහ දේශීය ධාරක
මඟහැරීමේ නීති බෙදාගනී; එය `proxyFetch.ts` හෝ එහි DB/විශේෂාංග ධජ ආයාත නොකරයි.
ඉදිරියට යවන ප්‍රතිදානයෙන් සහ සටහන් කළ දෝෂවලින් ප්‍රොක්සි අක්තපත්‍ර වසන් කෙරේ. ගමනාන්ත අක්තපත්‍ර
යවන්නේ එක් ආරම්භක IPC පණිවිඩයක පමණි; කිසිවිටෙක argv හෝ පරිසරය හරහා නොවේ; ප්‍රතිදාන/දෝෂ ඉදිරියට යැවීමට
උපසර්ගයක් එක් කර සංවේදී තොරතුරු ඉවත් කෙරේ. සෑම cron ධාවනයකදීම Node හි SQLite අනතුරු ඇඟවීම
නැවත පෙන්වීම වැළැක්වීමට ළමා ක්‍රියාවලියේ exec විස්තාරක තුළ අක්‍රිය කරන්නේ `ExperimentalWarning` පමණි; අනෙකුත් අනතුරු ඇඟවීම් වර්ග දෘශ්‍යමානව පවතී.

ගමනාන්ත මොඩියුල Next.js/server-only පරායත්තතා නොමැතිව ආයාත කළ හැකි විය යුතුය. පවතින
BigQuery ක්‍රියාත්මක කිරීම දැනටමත් එම ගිවිසුම සපුරාලයි. ප්‍රවේශ ටෝකන හැඹිලි පවතින්නේ ළමා ක්‍රියාවලියේ
ධාවන කාලය තුළ පමණි, ධාවන අතර නොවේ. සහාය දක්වන ධාවන පරිසරය Node වේ (`package.json` engines), නමුත් README හි Bun
ස්ථාපන කොටස සහ `Dockerfile.bun` ද `bun:sqlite` (`src/lib/db/core.ts` / ඇඩැප්ටර) භාවිත කරන
නිෂ්පාදන අනුකූලතා මාර්ගයක් ප්‍රචාරය කරයි. එබැවින් Bun යටතේ අපනයන පෙර තිබූ
එකම ක්‍රියාවලිය තුළ ක්‍රියාත්මක වන මාර්ගය රඳවාගෙන එක් වරක් පමණක් අනතුරු ඇඟවීමක් නිකුත් කරයි: ළමා ක්‍රියාවලියේ heap/කල් ඉකුත්වීම් හුදකලා කිරීම ලබාගත නොහැක. සිදුවීම් ලූපය සහ OOM හුදකලා කිරීම සඳහා
Node භාවිත කරන්න; මෙහි Bun සංවර්ධනයට පමණක් සීමා වූවක් ලෙස නොසැලකේ.

`includeBodies` සක්‍රිය කර ඇති විට, පැයක දත්ත භාර පසුබැසීමක් රැස් කිරීමට වඩා
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` වැනි මිනිත්තු මට්ටමේ ධාවන වාර ගණනකට ප්‍රමුඛත්වය දෙන්න.
කණ්ඩායම් සහ පේළි සීමා තවමත් එක් එක් ධාවනය සීමා කරයි. එක් එක් ධාවනයේ එක් එක් ගමනාන්තය සඳහා ක්‍රියාවලි ආරම්භක පිරිවැය දැරීමට සිදුවේ;
මෙය කුඩා ආරම්භක පිරිවැයක් වෙනුවෙන් සේවාදායක සිදුවීම් ලූපය හුදකලා කරයි, සමස්ත CPU භාවිතය අඩු නොකරයි.

### දත්ත භාර (ප්‍රොම්ප්ට් සහ සම්පූර්ණ කිරීම්)

පෙරනිමියෙන් අපනයනයට ඇතුළත් වන්නේ ලොග් **ලැයිස්තුවේ** පෙන්වන සාරාංශ ක්ෂේත්‍ර පමණි.
**ප්‍රොම්ප්ට් සහ ප්‍රතිචාර අපනයනය කරන්න** (`includeBodies`) සක්‍රිය කිරීමෙන්, එක් එක් ඇමතුම සඳහා ලොග් **විස්තර**
කවුළුවේ පෙන්වන දෑ ද යවනු ලැබේ:

| ක්ෂේත්‍රය                        | එහි අඩංගු දේ                                                   |
| -------------------------------- | -------------------------------------------------------------- |
| `request_body` / `response_body` | උපකරණ පුවරුවේ දර්ශනය කරන ආකාරයට ඇමතුම් දත්ත භාර                |
| `pipeline_route_decision`        | රවුටරය තෝරාගත් ඉලක්කය සහ මාදිලිය                               |
| `pipeline_client_request`        | සේවාලාභියා යැවූ ආකාරයෙන්ම ඇති අමු ඉල්ලීම                       |
| `pipeline_openai_request`        | අභ්‍යන්තර OpenAI ආකෘතියට පරිවර්තනය කිරීමෙන් පසු                |
| `pipeline_provider_request`      | සැපයුම්කරුගේ ආකෘතියෙන් සැබැවින්ම ඉහළ සේවාවට යැවූ ආකාරය         |
| `pipeline_provider_response`     | ඉහළ සේවාවෙන් ලැබුණු අමු ප්‍රතිචාරය                             |
| `pipeline_client_response`       | ඇමතුම්කරුට ආපසු ලබාදුන් දේ                                     |
| `pipeline_error`                 | අසාර්ථක ඇමතුමක් සඳහා පයිප්ලයින් මට්ටමේ දෝෂ විස්තර              |
| `bodies_truncated`               | ඉහත ඕනෑම ක්ෂේත්‍රයක් `maxBodyBytes` සීමාවට ළඟා වූ විට සත්‍ය වේ |

මෙය ප්‍රොම්ප්ට් අන්තර්ගතය බැවින්, එය **පෙරනිමියෙන් අක්‍රියයි** සහ හිතාමතාම එක් එක් ගමනාන්තය සඳහා වෙන වෙනම තෝරාගත යුතුය.
යවනු ලබන්නේ උපකරණ පුවරුවේ පෙන්වන දේමය, මන්ද අපනයනය සහ `getCallLogById` එකම විස්තර
නිරාකරණය භාවිත කරන බැවිනි: දත්ත භාර
ලියන අවස්ථාවේදීම ඒවායින් පුද්ගලිකව හඳුනාගත හැකි තොරතුරු (PII) ඉවත් කර රහස් තොරතුරු වසන් කර ඇත, තවද
`noLog` API යතුරකින් කළ ඇමතුමක් කිසිදු දත්ත භාරයක් ගබඩා නොකරන බැවින්, අපනයනය කිරීමට කිසිවක් නැත.

දත්ත භාර ගොනු පද්ධති කෘතියෙන් එක් එක් පේළිය සඳහා කියවනු ලැබේ, එබැවින් දත්ත පිරවීම ක්‍රියාත්මක වන්නේ
එය ඉල්ලා සිටි ගමනාන්ත සඳහා පමණි. කෘතියක් අස්ථානගත වී හෝ දූෂිත වී ඇත්නම්, කණ්ඩායම අසාර්ථක කර කර්සරය අතරමං කිරීම වෙනුවට එහි සාරාංශය null දත්ත භාර සමඟ අපනයනය කෙරේ.

`maxBodyBytes` (පෙරනිමිය 262144) එක් එක් ක්ෂේත්‍රයට උපරිම සීමාවක් පනවයි. දිගු දත්ත භාර **ඉවත් කිරීම වෙනුවට
කප්පාදු කෙරේ** — කප්පාදු කළ ප්‍රොම්ප්ට් එකක් වුවද "විමසුවේ කුමක්ද" යන්නට පිළිතුරු සපයයි — සහ පේළිය
`bodies_truncated` මඟින් සලකුණු කෙරේ. ප්‍රවාහගත කොටස් අනුව ලැබෙන වෙනස්කම් අපනයනය නොකෙරේ; එකලස් කළ ප්‍රතිචාරය
දැනටමත් `pipeline_provider_response` සහ `pipeline_client_response` තුළ ඇත.

---

## 2. ගොනු

| කොටස                       | පිහිටීම                                      |
| -------------------------- | -------------------------------------------- |
| ගමනාන්ත ගිවිසුම            | `src/lib/logExport/types.ts`                 |
| ලේඛනය                      | `src/lib/logExport/registry.ts`              |
| රහස් හැසිරවීම              | `src/lib/logExport/secrets.ts`               |
| ධාවකය (මව් IPC)            | `src/lib/logExport/runner.ts`                |
| ක්‍රියාවලි ජීවන චක්‍රය     | `src/lib/logExport/childRunner.ts`           |
| උප ක්‍රියාවලියේ පිවිසුම    | `src/lib/logExport/exportChild.ts`           |
| කියවීමට පමණක් විවෘත කරන්නා | `src/lib/db/logExportReadOnly.ts`            |
| හවුල් විමසුම/සිතියම්කරණය   | `src/lib/usage/callLogExportQueries.ts`      |
| විස්තර නිරාකරණකය           | `src/lib/usage/callLogDetailResolver.ts`     |
| API ප්‍රක්ෂේපණය            | `src/lib/logExport/presenter.ts`             |
| BigQuery ගමනාන්තය          | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA සත්‍යාපනය        | `src/lib/logExport/googleServiceAccount.ts`  |
| ඇමතුම් ලොග් මූලාශ්‍රය      | `src/lib/usage/callLogExportSource.ts`       |
| ස්ථිර ගබඩාකරණය             | `src/lib/db/logExportDestinations.ts`        |
| Cron කාර්යය                | `src/lib/jobs/logExportJob.ts`               |
| REST ස්තරය                 | `src/app/api/log-export/`                    |
| උපකරණ පුවරු පිටුව          | `src/app/(dashboard)/dashboard/log-export/`  |

ක්‍රමාංකනය: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

සියලු මාර්ග සඳහා කළමනාකරණ සත්‍යාපනය අවශ්‍ය වේ (`requireManagementAuth`). රහස් කිසිවිටෙක ආපසු ලබා නොදේ:
ගබඩා කළ රහසක් ආපසු ලැබෙන්නේ `__stored__` යන නියත අගය ලෙස වන අතර, යාවත්කාලීන කිරීමකදී එම අගය නැවත යැවීමෙන්
ගබඩා කළ අක්තපත්‍රය නොවෙනස්ව තබා ගනී.

රහසක් ප්‍රකාශ කරන වර්ගයක ගමනාන්තයක් සෑදීමට හෝ යාවත්කාලීන කිරීමට **`STORAGE_ENCRYPTION_KEY`
අවශ්‍ය වේ**. එය නොමැතිව `encrypt()` කිසිදු දැනුම්දීමකින් තොරව දත්ත එලෙසම ලබා දෙන බැවින්, අක්තපත්‍රයක් SQLite තුළ සාමාන්‍ය පෙළ ලෙස තැබීම වෙනුවට
ලිවීම 400 සමඟ ප්‍රතික්ෂේප කරනු ලැබේ (Telegram webhook භාවිත කරන
ආරක්ෂක පරීක්ෂාවම මෙහිද යෙදේ).

| ක්‍රමය   | මාර්ගය                                   | අරමුණ                                                                |
| -------- | ---------------------------------------- | -------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | ගමනාන්ත වර්ග + ඒවායේ වින්‍යාස ක්ෂේත්‍ර ලැයිස්තුව                     |
| `GET`    | `/api/log-export/destinations`           | ගමනාන්ත ලැයිස්තුගත කිරීම (රහස් සඟවා ඇත)                              |
| `POST`   | `/api/log-export/destinations`           | ගමනාන්තයක් සෑදීම                                                     |
| `GET`    | `/api/log-export/destinations/{id}`      | එකක් කියවීම                                                          |
| `PUT`    | `/api/log-export/destinations/{id}`      | නම / සක්‍රිය තත්ත්වය / වින්‍යාසය / කාණ්ඩකරණය යාවත්කාලීන කිරීම        |
| `DELETE` | `/api/log-export/destinations/{id}`      | මකා දැමීම                                                            |
| `POST`   | `/api/log-export/destinations/{id}/test` | අක්තපත්‍ර පරීක්ෂා කිරීම, කිසිවක් නොලිවීම                             |
| `POST`   | `/api/log-export/destinations/{id}/run`  | නියමිත ධාවනයේ මාර්ගයම භාවිත කරමින්, දැන්ම පොරොත්තුව ඇති සියල්ල යැවීම |
| `GET`    | `/api/log-export/status`                 | Cron තත්ත්වය, මෑත ධාවන, එක් එක් ඉලක්කයේ පොරොත්තු වැඩ                 |

UI පොදු ආකාරයෙන් ක්‍රියා කිරීමට සලස්වන්නේ `GET /api/log-export/types` ය: උපකරණ පුවරුවේ පෝරමය ඉදිරිපත් කරන්නේ
ආපසු ලැබෙන ක්ෂේත්‍ර විස්තරක මත පදනම්ව වන බැවින්, නව ගමනාන්තයක් සඳහා UI වෙනසක් අවශ්‍ය නොවේ.

---

## 4. BigQuery ගමනාන්තය

වින්යාස යතුරු (`type: "bigquery"`):

| යතුර                 | සටහන්                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------- |
| `projectId`          | දත්ත කට්ටලය අඩංගු GCP ව්යාපෘතිය                                                                               |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                               |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                               |
| `location`           | දත්ත කට්ටලය නිර්මාණය කළ යුතු විට පමණක් භාවිත වේ (පෙරනිමිය `EU`)                                               |
| `serviceAccountJson` | සේවා ගිණුම් යතුර. රහසකි: ගබඩා කර ඇති විට සංකේතනය කර ඇත, කිසිවිටෙක ආපසු ලබා නොදේ                               |
| `autoCreate`         | නැති දත්ත කට්ටලය/වගුව නිර්මාණය කරන්න; nullable usage-evidence තීරු කොන්දේසි සහිතව එක් කරන්න (පෙරනිමිය `true`) |

සේවා ගිණුමට ඉලක්ක වගුව මත `bigquery.tables.updateData` අවසරය අවශ්ය වන අතර,
`autoCreate` සක්රිය විට `bigquery.datasets.create` / `bigquery.tables.create` අවසරද අවශ්ය වේ.
පවතින වගුවකට nullable usage-evidence ක්ෂේත්ර දෙක එක් කිරීමට
`bigquery.tables.update` අවසරයද අවශ්ය වේ. අවශ්ය අවසරයක් නොමැති නම්, එහි cursor එක ඉදිරියට
ගෙන නොයවා export එක අසාර්ථක වේ.

වින්යාස කළ batch එකක් HTTP එකක් නොව **cursor** ඒකකයකි: `send()` එය උපරිම පේළි 500ක් සහිත
insertAll ඇමතුම්වලට කොටස් කරයි. එබැවින් විශාල `batch_size` එකකට BigQuery හි 10 MB ඉල්ලීම්
සීමාව ඉක්මවිය නොහැක. තාවකාලික තත්ත්වයන් (408/429/500/502/503/504) exponential
backoff සමඟ උපරිම තුන් වරක් නැවත උත්සාහ කරයි; සෑම අවස්ථාවකම එකම insertIds නැවත භාවිත කරයි.
සත්යාපන සහ schema අසාර්ථකතා පළමු උත්සාහයේදීම දෝෂයක් ඇති කරයි; එමඟින් run එක අනවශ්ය ලෙස
වැය නොවේ.

මොහොතකට පෙර නිර්මාණය කළ වගුවක් streaming endpoint එකට තවමත් නොපෙනෙන බැවින්, එය
තත්පර කිහිපයක් සඳහා 404 ප්රතිචාරයක් ලබා දිය හැක. එම 404 නැවත උත්සාහ කරනු ලබන්නේ
**මෙම run එක වගුව නිර්මාණය කළ විට පමණි** — සැබවින්ම නැති වගුවක් ඉක්මනින්ම අසාර්ථක වේ.
මෑතකදී මකා දැමූ වගුවක් එම නාමය යටතේ නැවත නිර්මාණය කළ විට, BigQuery streaming inserts
මිනිත්තු කිහිපයක් ප්රතික්ෂේප කරන බව සලකන්න; මෙය delete-then-recreate ක්රියාවලියේ
ගුණාංගයකි. එබැවින් වගුවක් ඉවත් කර නැවත එක් කිරීම වෙනුවට නව වගු නාමයක් භාවිත කිරීම වඩාත් සුදුසුය.

**අර්ධ අසාර්ථකත්වයක් පැමිණෙන්නේ හිස් නොවන `insertErrors[]` සහිත HTTP 200 ලෙසය.** එය
අසාර්ථකත්වයක් ලෙස සලකා දෝෂයක් ඇති කරයි. එමඟින් BigQuery පිළි නොගත් පේළි පසුකර cursor එක
ඉදිරියට යාම නතර කරයි; `tests/unit/log-export-bigquery.test.ts` මෙම හැසිරීම තහවුරු කරයි.

ප්රවාහනය සාමාන්ය REST වේ — ස්වයං-අත්සන් කළ RS256 assertion එකක්
`https://oauth2.googleapis.com/token` වෙත යවා access token එකක් ලබා ගනී, ඉන්පසු පේළි
`tabledata.insertAll` වෙත යවයි. Google SDK එකක් ඇතුළත් නොවේ. Access token සේවා ගිණුම සහ
scope අනුව ක්රියාවලි මතකයේ cache කරනු ලබයි.

නිර්මාණය කළ වගුවේ Logs ටැබයේ එක් එක් ක්ෂේත්රයට එක් තීරුවක් සහ `exported_at` අඩංගු වන අතර,
ඇමතුම් ලොග් සැබෑවටම විමසන ආකාරයට එය සැකසී ඇත:

- **`timestamp` මත දින-කොටස්ගත කර ඇත**, එබැවින් දිනය අනුව සීමා කළ විමසුමක් එම දින පමණක් පරිලෝකනය කරයි.
- **`api_key_name`, `provider`, `model`, `status` අනුව cluster කර ඇත** (එම අනුපිළිවෙළින්),
  එබැවින් එය ක්රියාත්මක කළේ කවුරුන්ද, එය යොමු වූයේ කොතැනටද, නැතහොත් එය අසාර්ථක වූවාද
  යන්න අනුව පෙරහන් කිරීමෙන් එක් එක් partition එක තුළ ඇති blocks ඉවත් කළ හැක. BigQuery
  clustering තීරු උපරිම හතරකට ඉඩ දෙන අතර අනුපිළිවෙළ වැදගත් වේ:
  `api_key_name` පමණක් මත ඇති පෙරහනක් blocks ඉවත් කරයි, නමුත් `status` පමණක් මත ඇති
  පෙරහනක් එසේ නොකරයි.
- **`partitionExpirationDays` හරහා විකල්ප partition retention** (`0` මඟින් සියල්ල තබා ගනී),
  වගුව නිර්මාණය කරන විට යෙදේ.

සැකසුම් දෙකම නිර්මාණය කරන අවස්ථාවේදී යෙදේ. පවතින වගුවක් දැනටමත් ඇති layout එකම
තබා ගනී. එබැවින් ඒවා භාවිත කිරීමට අවශ්ය නම් ගමනාන්තය නව table id එකකට යොමු කරන්න.

`tests/unit/log-export-bigquery.test.ts` mapper එක සහ වගු schema එක එකිනෙකට අනුකූලව පවතින
බව තහවුරු කරයි. එබැවින් නව call-log තීරුවක් පිටතට යන අතරතුර නිහඬව ඉවත් විය නොහැක.

Batches **පේළි ගණන සහ serialised bytes යන දෙකම අනුව** කොටස් කරනු ලැබේ. payloads export කළ
පසු පේළි ගණන පමණක් ප්රමාණවත් නොවේ: prompts අඩංගු පේළි 500ක් දස දහස් MB ගණනක් විය
හැකි අතර, 10 MB ඉක්මවන ඉල්ලීමක් insertAll ප්රතික්ෂේප කරයි. කොටස් පේළි 500කදී හෝ 9 MBදී,
ඒ දෙකෙන් පළමුව පැමිණෙන අවස්ථාවේදී අවසන් වේ.

---

## 5. OTLP/HTTP traces ගමනාන්තය

Config uses `type: "otlp-http"`. මෙය
`open-sse/services/routing/otel.ts` හි ඇති best-effort live routing-event sink එක නොව, ස්ථිර කර ඇති
call logs සඳහා cursor-backed ලෙස නියමිත වේලාවට සිදු කරන export එකකි. එය එම sink හි environment
variables, timers හෝ buffers කියවන්නේවත් වෙනස් කරන්නේවත් නැත. දෙකම සක්රීය කිරීමෙන් ස්වාධීන span
වර්ග දෙකක් නිපදවිය හැක; මෙම call-log spans හඳුනා ගැනීමට `omniroute.log-export` instrumentation scope එක භාවිත කරන්න.

| Key                      | Default / purpose                                                            |
| ------------------------ | ---------------------------------------------------------------------------- |
| `endpoint`               | අවශ්ය සම්පූර්ණ HTTP(S) traces URL එක; `/v1/traces` suffix එකක් එකතු නොකෙරේ   |
| `headers`                | විකල්ප `Name: value` පේළි හෝ strings සහිත JSON object එකක්; සංකේතනය කර ඇත    |
| `requestHeaderAllowlist` | Empty (off); span attributes ලෙස capture කිරීමට client header names/prefixes |
| `serviceName`            | `omniroute`; resource `service.name`                                         |
| `langfuseMapping`        | `false`; Langfuse generation/session/user attributes එක් කරයි                |
| `identity`               | `pseudonymous`, `keyName`, හෝ `none`                                         |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                      |
| `timeoutMs`              | එක් HTTP උත්සාහයක් සඳහා `30000`                                              |
| `environment`            | සකසා නැත; විකල්ප `langfuse.environment`                                      |

සාමාන්ය dashboard එක මෙම fields render කරයි. `paths` සඳහා API array එකක් හෝ
newline/commas මඟින් වෙන් කළ exact paths සහිත textarea එකක් පිළිගනී. Embeddings, rerank සහ
වෙනත් paths, පැහැදිලිව අවසර දී නොමැති නම්, මඟ හරිනු ලැබේ. මඟ හරින ලද rows තවමත් cursor එක
ඉදිරියට ගෙන යයි; පවතින runner හි `exported`/`exportedTotal` counters පිළිගත් spans
වෙනුවට, filtered rows ඇතුළුව සැකසූ source rows ගණනය කරයි. Filtering සිදු කරන්නේ child තුළ වන
අතර එහි IPC/cursor contract එක වෙනස් නොකරයි.

URL validation සඳහා DB-free `parseAndValidateNonMetadataUrl` helper එක
`src/shared/network/outboundUrlGuard.ts` වෙතින් භාවිත කරයි: `block-metadata` policy එක.
private URLs සඳහා අවසර දී ඇති නමුත්, webhook validator එකේ ඇති unconditional
metadata/protocol/embedded-credential checks ම එහි ඇත; එහෙත් global feature-flag override එකක්
නොමැතිව localhost/LAN targets සඳහා හිතාමතාම අවසර දෙයි. එමඟින් private HTTP endpoints ඇතුළුව
self-hosted Langfuse, Phoenix, Tempo සහ Collector endpoints භාවිත කළ හැක. Cloud-metadata hosts
සෑම විටම අවහිර කරනු ලැබේ. Redirects අනුගමනය නොකරන බැවින්, collector එකකට credentials වෙනත්
host එකකට redirect කළ නොහැක. දැනට පවතින lexical URL guard එක මෙන්ම, මෙය DNS resolution pin
නොකරයි; operator විසින් පාලනය කරන hosts පමණක් configure කරන්න. Endpoint එක විශ්වාසදායක
network එකක නොමැති විට HTTPS භාවිත කිරීම වඩාත් සුදුසුය.

### Payload සහ delivery

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) මඟින් අවසර ලත්
සෑම row එකක් සඳහාම එක් CLIENT span එකක් යවයි; එය එහි exact request path අනුව නම් කරනු ලැබේ.
Path naming මඟින් span name තුළ model හෝ identity data ඇතුළත් නොකර Chat Completions,
Responses සහ Messages වෙන්කර හඳුනාගත හැක. Resource attributes වල `service.name` සහ package හි
`service.version` ඇතුළත් වේ.

සාමාන්ය chat attempt logger (`open-sse/handlers/chatCore/attemptLogging.ts`) completion අවස්ථාවේ
`duration = Date.now() - startTime` ලියන අතර timestamp එකක් සපයන්නේ නැත;
`src/lib/usage/callLogs.ts` හි `saveCallLogOperation` timestamp එක write
(completion) time වෙත default කරයි. එබැවින් export එක end = row timestamp ලෙසත් start = end − duration
(milliseconds, decimal nanoseconds බවට පරිවර්තනය කර) ලෙසත් සකසයි. Caller විසින් සපයන ලද
historical timestamps ද end time ලෙසම සුරැකේ; එක් එක් row සඳහා start/completion discriminator
නොමැත. Null duration එක zero බවට පත්වේ. Invalid/missing timestamps නිර්ණය කළ නොහැකි spans
නිර්මාණය කරනවා වෙනුවට batch එක අසාර්ථක කරයි. `ttftMs` nullable වන අතර
`omniroute.ttft_ms` වෙත map කරයි.

Attributes වල `gen_ai.operation.name="chat"`, provider, requested/response model,
input/output tokens, optional cache-read/cache-creation/reasoning tokens, HTTP status,
combo, cache source, session tag සහ correlation id ඇතුළත් වේ. Integer OTLP values සහ timestamps
decimal strings වේ; strings, booleans සහ fractional numbers ඒවායේ native OTLP value
variants භාවිත කරයි. Error spans හට ERROR status එකක් සහ sanitized status message එකක් ඇත.
Canonical record එකේ upstream host URL එකක් නොමැති බැවින්, collector එක model server ලෙස වැරදිව
හඳුනා නොගැනීමට `server.address` ඉවත් කර ඇත. Cost export නොකරයි.

`includeBodies=true` වූ විට පමණක් content hydrate කරයි. `langfuseMapping=false` සමඟ,
`gen_ai.input.messages` / `gen_ai.output.messages` මඟින් OmniRoute විසින් ගබඩා කළ sanitized
request/response body JSON (parse කළ හැකි විට canonicalized) රැගෙන යයි; එය නැවත හැඩගැස්වූ
semconv messages array එකක් නොවේ. Clipped/non-JSON bodies raw text ලෙස පවතී.
`langfuseMapping=true` සමඟ, bodies යවනු ලබන්නේ `langfuse.observation.input` /
`langfuse.observation.output` ලෙස පමණි; සෑම body එකක්ම එක් වරක් පමණක් යැවෙන පරිදි
`gen_ai.*.messages` attributes ඉවත් කරයි. Modes දෙකම පවතින hydration path එකෙන්
`maxBodyBytes` උරුම කරගනී;
`omniroute.bodies_truncated=true` මඟින් clipping සලකුණු කරයි.
මෙම destination මඟින් අමතර pipeline snapshots හෝ unsanitized artifact reads එකතු නොකරයි;
විකල්ප request-header capture එක පහත විස්තර කර ඇති පවතින hydrated client snapshot භාවිත කරයි.
Bodies export කරන විට hourly backlog එකක් එකතු කරගැනීම වෙනුවට
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` වැනි minute-level cadence එකක් භාවිත කරන්න.

### විකල්ප client request headers

Header capture **පෙරනිමියෙන් අක්රීයයි**. Destination config තුළ `requestHeaderAllowlist` සකසා,
**Export prompts and responses** සක්රීය කරන්න (destination එකේ `includeBodies: true`).
Allowlist එක API array එකක් හෝ newline/comma-separated names සහිත textarea එකක් පිළිගනී:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

නාම case-insensitive ලෙස සහ හරියටම ගැළපේ, අවසන් `*` එකක් nonempty
header-name prefix එකක් තෝරාගන්නේ නම් හැර. හිස් `*`, embedded wildcards සහ අවලංගු HTTP header නාම ප්රතික්ෂේප කෙරේ.
Selectors උපරිම 64ක් තිබිය හැකි අතර, එක් එක් selector එකේ නාමය/prefix එක ASCII bytes 256කට සීමා වේ.
මෙම setting එක `headers` වෙතින් වෙන්ව පවතින අතර, `headers` මඟින් exporter එක collector වෙත authenticate කරයි.

Capture කියවන්නේ සුරකින ලද detailed pipeline හි `clientRawRequest` (හෝ legacy `clientRequest`) වෙතින්
පුරවා ඇති `pipeline_client_request` පමණි. එය කිසිවිටෙක provider request headers වෙත fallback නොවේ.
Request එක record කරන අවස්ථාවේ detailed pipeline logging සක්රීය කර තිබිය යුතුය. `includeBodies` අක්රීය නම්,
හෝ client-snapshot JSON නොමැති, දූෂිත හෝ clipped නම්, header attributes කිසිවක් නිකුත් නොවේ. `maxBodyBytes` වැඩි කිරීමෙන්
export-time snapshot clipping වළක්වා ගත හැකි නමුත්, කිසිවිටෙක සුරකින ලද නොවන විස්තර නැවත ලබාගත නොහැක.
1 MiB ඉක්මවන හෝ header entries 256කට වඩා අඩංගු snapshot එකක් නොසලකා හරිනු ලැබේ. පවතින prompt/response export එක
header capture සමඟම සක්රීයව පවතී; allowlist එක headers-only hydration mode එකක් සපයන්නේ නැත.

තෝරාගත් values, තනි string එකක් සඳහා පවා, `http.request.header.<full lowercase header name>` OTLP string arrays බවට පත්වේ.
උදාහරණයක් ලෙස, `X-OmniRoute-Meta-Team: example-team` යන්න
`http.request.header.x-omniroute-meta-team` බවට පත්වන්නේ
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}` සමඟිනි.
සම්පූර්ණ prefix එක සංරක්ෂණය කෙරේ: මේවා සාමාන්ය headers වන අතර business-field parsing හෝ
`omniroute.metadata.*` / Langfuse metadata conversion සිදු නොවේ. `langfuseMapping` මඟින් header semantics වෙනස් නොවේ.
තෝරාගත් single-valued `User-Agent` එකක් standard scalar `user_agent.original` ද සකසයි. එක් value එකක් තුළ ඇති commas බෙදා වෙන් නොකෙරේ.
Case variants සුරකින ලද entry order එකේ merge කෙරේ; කිසියම් invalid variant එකක් තිබේ නම්, එම සම්පූර්ණ header එක ඉවත් කෙරේ.
Attributes lowercase name අනුව අනුපිළිවෙළට සකසනු ලැබේ.

Authorization, Proxy-Authorization, Cookie, Set-Cookie, API-key headers, auth/token/secret/password/credential markers
අඩංගු නාම සහ internal gateway credentials, තෝරාගෙන තිබුණද හෝ storage තුළ partially masked කර තිබුණද, සෑම විටම බැහැර කෙරේ.
දන්නා credential patterns සඳහා shared credential detector එක නැවත භාවිත කෙරේ; redaction markers ආරක්ෂිත values ලෙස export නොකර
ඉවත් කෙරේ. Strings සහ nonempty string arrays පමණක් පිළිගැනේ; numbers හෝ objects coerce නොකෙරේ.
Invalid names, prototype keys, control characters (horizontal tab හැර) සහ malformed Unicode, batch එක අසාර්ථක නොකර හෝ
ඒවායේ අන්තර්ගතය errors තුළ ප්රතිබිම්බනය නොකර නොසලකා හරිනු ලැබේ.

එක් span එකක් උපරිම headers 32ක්, එක් header එකකට values 16ක්, එක් value එකකට UTF-8 bytes 4096ක්,
සහ captured header names සහ values හරහා සම්පූර්ණ UTF-8 bytes 16384ක් ග්රහණය කරයි. සීමාව ඉක්මවන/අවලංගු headers
සම්පූර්ණයෙන්ම ඉවත් කෙරේ, clip නොකෙරේ. Selection යනු operator privacy decision එකකි: ආරක්ෂිත ලෙස පෙනෙන නාමවල පවා
personal data අඩංගු විය හැකි අතර, මෙම සීමා/detectors සාමාන්ය PII scrubber එකක් නොවේ.

### Delivery limits

Requests, envelope එක ඇතුළුව, spans 500කට සහ UTF-8 JSON 4 MiBකට සීමා වේ.
Cursor batch එකක පළමු request එකට පෙර සෑම allowed span එකක්ම size-check කෙරේ. තනි span එකක් සීමාව ඉක්මවන්නේ නම්,
එම batch එකේ කිසිදු කොටසක් යවා නොගෙන, `maxBodyBytes` අඩු කිරීමට උපදෙස් සමඟ fail වේ; එය නිහඬව ඉවත් නොකෙරේ.
Preflight මඟින් record references සහ byte counts පමණක් තබාගෙන, එක් එක් temporary span/JSON ඉවත දමයි; batch එකේ
දෙවන serialized copy එකක් තබා නොගෙන bounded chunks සඳහා spans නැවත ගොඩනඟනු ලැබේ. HTTP 408/429/5xx, network failures සහ timeouts සඳහා
උත්සාහයන් උපරිම තුනක් ලැබෙන අතර, 250/500 ms exponential backoff භාවිත කෙරේ. `Retry-After` seconds හෝ HTTP dates මඟින්
delay එක තත්පර 5ක් දක්වා දිගු කළ හැක. අනෙකුත් statuses වහාම fail වේ. OTLP 2xx partial rejection එකක්ද
lost span එකක් acknowledge කිරීම වෙනුවට throw කරයි; empty හෝ valid JSON acknowledgements පිළිගැනේ, response-read cap එක
64 KiB වේ.

Errors තුළ අඩංගු වන්නේ exporter-owned facts පමණි: HTTP status, retry class, attempts සහ sent span
counts, හෝ fixed acknowledgement/network failure wording ය. Collector response bodies,
partial-success counts සහ response headers කිසිවිටෙක errors, logs හෝ dashboard වෙත පිටපත් නොකෙරේ.
Failed හෝ partially accepted batch එකක් acknowledge නොකෙරේ: destination එක එම status එක සමඟ
Failing ලෙස පෙන්වන අතර, cursor එක අවසන් වරට acknowledged කළ batch එකේ නවතී, ඊළඟ run එක
එම rows නැවත යවයි. Permanent statuses, collector හෝ configuration එක නිවැරදි කරන තුරු, දිගටම failing ලෙස පවතී.
Response details සඳහා collector හිම logs භාවිත කරන්න. Call-log error summaries ඒවාට වෙනම redaction එක රඳවා ගනී.
`prepare()` කිසිවක් provision නොකරයි; Test මඟින් හරියටම `{"resourceSpans":[]}` POST කර
call-log spans ලිවීමකින් තොරව HTTP status වාර්තා කරයි.

Trace ids සහ span ids යනු
`"omniroute.trace\\0" + callLogId` සහ `"omniroute.span\\0" + callLogId` මත SHA-256 හි
පළමු 32/16 hex digits වේ. Re-sends එකම ids රැගෙන යයි. මෙය deduplication guarantee එකක් නොවේ:
Langfuse v4 ingestion ඇතුළු සමහර backends එකම-id spans deduplicate නොකරයි. Crash එකක් හෝ partial chunk failure එකක්
unacknowledged cursor batch එකක් පමණක් නැවත යැවීමට හේතු විය හැකි අතර; එම සම්පූර්ණ
batch එක duplicate විය හැක, එහි අවසන් HTTP chunk එක පමණක් නොවේ. මෙම tradeoff එක සලකා
cursor batch size එක තෝරන්න.

### Langfuse example

Self-hosted Langfuse instance එකක් සඳහා මෙම fields configure කරන්න:

```json
{
  "endpoint": "https://langfuse.example.com/api/public/otel/v1/traces",
  "headers": "Authorization: Basic <base64-of-public-key:secret-key>",
  "serviceName": "omniroute",
  "langfuseMapping": true,
  "identity": "pseudonymous",
  "environment": "production"
}
```

Authorization value එක locally, literal `public-key:secret-key`
string එකේ Base64 ලෙස සාදන්න (උදාහරණයක් ලෙස `Buffer.from(publicKey + ":" + secretKey).toString("base64")` සමඟ).
සැබෑ credentials logs, screenshots හෝ issues තුළ paste නොකරන්න. Mapping එක ස්වයංක්රීයව
`x-langfuse-ingestion-version: 4` සකසයි; Authorization තවමත් `headers` තුළ සැපයිය යුතුය.
Headers සහ generated identity salt දෙකම පවතින encrypted secret-field mechanism සහ API placeholders භාවිත කරන අතර;
`STORAGE_ENCRYPTION_KEY` අවශ්ය වේ.

සිතියම්කරණයට generation වර්ගය/මාදිලිය, JSON භාවිත විස්තර (ආදාන/ප්රතිදාන/මුළු සහ පවතින
cache යතුරු), JSON ආදාන/ප්රතිදාන snapshot, ERROR/DEFAULT මට්ටම, පිරිසිදු කළ තත්ත්ව පණිවිඩය,
trace නාමය, සැසි හැඳුනුම, විකල්ප පරිසරය සහ provider, ඉල්ලූ මාදිලිය, path, සංයෝජනය, cache
මූලාශ්රය සහ තත්ත්වය සඳහා පෙරහන් කළ හැකි `langfuse.observation.metadata.<key>` එක් කරයි.
`langfuse.observation.completion_start_time` යනු ආරම්භක වේලාව + TTFT වන ISO 8601 අගයකි; එය
යවන්නේ TTFT දන්නා විට සහ එය කාලපරාසය තුළ ඇති විට පමණි. පිරිවැය attributes කිසිවක් යවන්නේ නැත.

හැඳුනුම් මාදිලි `langfuse.user.id` සඳහා යෙදේ:

- `pseudonymous` (පෙරනිමිය): අහඹු ලෙස, destination එකකට වෙන් වූ 32-byte salt එකක් සමඟ API key හි අභ්යන්තර id හි HMAC-SHA256 අගය. salt එක නොමැති නම් නිර්මාණයේදී ජනනය කර, `identitySalt` ලෙස සංකේතනය කර, කිසිවිටෙක ආපසු ලබා නොදී, සංස්කරණ අතරතුර රඳවා ගනී. අමු key id span attributes තුළ කිසිවිටෙක නොතබයි. destination එකක salt එක නැවත නිර්මාණය කිරීම/මාරු කිරීම මඟින් identities වෙනස් වේ.
- `keyName`: වින්යාස කළ API key නාමය; එම operator label එක හිතාමතා හෙළි කරයි.
- `none`: user id එකක් නැත. පවතින විට session tags තවමත් export කෙරේ; මෙම මාදිලි අත්තනෝමතික prompt අන්තර්ගතය හෝ operator විසින් සපයන session/correlation labels නිර්නාමික නොකරයි.

### backfill එකක් නොමැතිව ආරම්භ කිරීම

නිර්මාණය කිරීමේදී පමණක්, **වත්මන් ස්ථානයෙන් ආරම්භ කරන්න (පවතින logs මඟ හරින්න)** සක්රීය කරන්න, නැතහොත් create API payload හි ඉහළ මට්ටමේ `startFromCurrentPosition: true` යවන්න. එය migration එකක් නොමැතිව, පවතින cursor helpers භාවිතයෙන් `cursor_row_id` වත්මන් උපරිම රඳවා ඇති call-log rowid වෙත ආරම්භ කරයි. පෙරනිමිය false වේ (cursor 0 සහ රඳවා ඇති ඉතිහාසයේ backfill එක). මෙය update-time cursor reset සැකසුමක් නොවේ.

හවුල් `ttftMs` එක් කිරීම BigQuery mapper එකට සහ නව-වගු schema එකට nullable `ttft_ms` තීරුවක් ද එක් කරයි: එහි schema පරීක්ෂණයට සෑම canonical record field එකකටම තීරුවක් තිබීම අවශ්ය වේ. පවතින වගු වෙනස් නොකර export කිරීම දිගටම සිදු කරයි: `prepare()` වගු schema එක කියවා, එම තීරුව නොමැති විට `ttft_ms` පමණක් ඉවත් කරයි. ඊළඟ ධාවනයේදී TTFT ලබා ගැනීමට nullable INT64 තීරුව එක් කරන්න, නැතහොත් නව වගුවක් භාවිත කරන්න. විකල්ප TTFT තීරුවක් schema update එකක් ක්රියාත්මක නොකරයි. Usage-evidence තීරු පහත conditional, opt-in compatibility ප්රවාහය අනුගමනය කරයි; අනෙකුත් පේළි ක්ෂේත්ර සඳහා දැඩි schema පරීක්ෂාව එලෙසම පවතී.

## 6. ගමනාන්තයක් එක් කිරීම

1. `LogExportDestinationType` එකක් අපනයනය කරන `src/lib/logExport/destinations/<name>.ts` සාදන්න:
   Zod `configSchema` එකක්, UI සඳහා `fields` විස්තරක අරාවක්, `secretFields`, සහ
   `test()` / `prepare()` / `send(records)` ආපසු ලබා දෙන `createClient(config)` එකක්.
2. එය `src/lib/logExport/registry.ts` හි `DESTINATIONS` අරාවට එක් කරන්න.
3. `tests/unit/` යටතේ පරීක්ෂණ ලියන්න.

සම්පූර්ණ වෙනස එපමණයි: ස්ථිර ගබඩාකරණය, cron කාර්යය, REST ස්තරය, රහස් සංකේතනය සහ
උපකරණ පුවරුවේ පෝරමය යන සියල්ල රෙජිස්ට්‍රිය කියවයි.

නව ගමනාන්තයක් සඳහා නීති දෙකක්:

- අර්ධ අසාර්ථකත්වයකදී `send()` **අනිවාර්යයෙන්ම ව්‍යතිරේකයක් නිකුත් කළ යුතුය**. සාර්ථකව අවසන් වීමෙන් අදහස් වන්නේ "ගමනාන්තය සතුව මෙම පේළි ඇත" යන්නයි,
  එවිට කර්සරය ස්ථිරවම ඒවා පසු කර ඉදිරියට යයි.
- පරිශීලකයා සපයන URL එකක් භාවිත කරන ගමනාන්තයක්, දත්ත ලබා ගැනීමට පෙර,
  webhooks කරන ආකාරයටම `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) හරහා එය වලංගු කළ යුතුය.
  BigQuery සඳහා මෙය අවශ්‍ය නොවේ: එහි සත්කාරක ස්ථාවර අගයන් වේ.

---

## 7. එය ක්රියාත්මක කිරීම

- **පාලක පුවරුව**: Integrations → Log export. ගමනාන්තයක් එක් කර, අක්තපත්ර පරීක්ෂා කිරීමට පේළි ලිවීමකින් තොරව **පරීක්ෂා කරන්න** ධාවනය කර,
  පසුව එය සක්රීය කරන්න.
- **පසුබැසීම**: සෑම ගමනාන්ත කාඩ්පතකම පොරොත්තු පේළි සහ කර්සරය පෙන්වන අතර; `GET
/api/log-export/status` මඟින් අවසන් රැකියා ධාවන 20 සමඟ එම සංඛ්යාම නැවත ලබා දෙයි.
- **අසාර්ථක වන ගමනාන්තයක් අනෙක් ගමනාන්ත අසාර්ථක නොකරයි** — ධාවන සාරාංශය එක් එක් ගමනාන්තයේ
  තත්ත්වය `last_status` / `last_error` තුළ සටහන් කරන අතර, රැකියා ධාවන ඉතිහාසය සමස්ත තත්ත්වය තබා ගනී.
- **ගමනාන්තයක් මකා දැමීමෙන් එහි කර්සරයද මැකෙයි.** එය නැවත එක් කළ විට පැරණිතම රඳවාගත්
  ඇමතුම් ලොගයෙන් ආරම්භ වන බැවින්, ගමනාන්තය සතුව දැනටමත් තිබිය හැකි පේළි නැවත යවනු ලැබේ. BigQuery තුළ, එක් පේළියකට ඇති
  `insertId` මඟින් එය BigQuery හිම අනුපිටපත් ඉවත් කිරීමේ කාල කවුළුව තුළ පමණක් අවශෝෂණය කරයි. එබැවින්
  ගමනාන්තයක් මකා දැමීමට වඩා එය අක්රීය කිරීම වඩාත් සුදුසුය.

### භාවිත සාක්ෂි ස්කීමා අනුකූලතාව

නව BigQuery වගු nullable `usage_evidence` (JSON අඩංගු STRING) සහ
`usage_estimated` (BOOL) ඇතුළත් කරයි. `autoCreate` සක්රීය කර ඇති විට, පවතින වගුවකට
මෙම අස්ථානගත nullable තීරු පමණක් එක් කළ හැක. Exporter මඟින් ක්ෂේත්ර මෙටාදත්ත ඇතුළුව
පවතින සම්පූර්ණ ස්කීමාව ආරක්ෂා කර, ආපසු ලැබුණු etag භාවිතයෙන් කොන්දේසි සහිත PATCH එකක් යවයි. සමගාමී
ස්කීමා වෙනස්කමක් සිදු වුවහොත් එය මත ලිවීම වෙනුවට export එක අසාර්ථක වන අතර; ඊළඟ ධාවනයේදී වගුව නැවත කියවනු ලැබේ.

`autoCreate` අක්රීය කර ඇති විට, භාවිත සාක්ෂි සහිත වාර්තා export කිරීමට පෙර මෙම තීරු ඔබම එක් කරන්න.
අස්ථානගත ස්කීමා/etag මෙටාදත්ත හෝ අසාර්ථක යාවත්කාලීන කිරීමක්ද සාක්ෂි සහිත insert වළක්වයි. එම අසාර්ථකත්වයේදී
export කර්සරය ඉදිරියට නොයන අතර, සාක්ෂි කිසිවිටෙක නිහඬව ඉවත් නොකෙරේ. Export එක අවහිරව තිබෙන අතරතුරද
දේශීය ලොග් රඳවාගැනීම අදාළ වන බැවින්, රඳවා ඇති මූලාශ්ර පේළි කල් ඉකුත්වීමට පෙර අසාර්ථකත්වය විසඳන්න.
