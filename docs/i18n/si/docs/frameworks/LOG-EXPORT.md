# Log export (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

OmniRoute ඇමතුම් ලොග් බාහිර විශ්ලේෂණ ගබඩාවකට අඛණ්ඩව, වර්ධක ලෙස අපනයනය කිරීම.

Logs උපකරණ පුවරු ටැබය ඉල්ලීම් ඉතිහාසය SQLite (`call_logs`) තුළ තබා ගනී; එය භ්රමණය සහ රඳවාගැනීම මඟින් සීමා වේ.
ලොග් අපනයනය එම වාර්තා කට්ටලයම කාලසටහනකට අනුව පිටතට යවන බැවින්, එයට දේශීය දත්ත සමුදායට වඩා දිගු කලක් පැවතිය හැකි අතර වෙනත් දත්ත සමඟ සම්බන්ධ කළ හැක. BigQuery පළමු ගමනාන්තය වේ; මෙම
නලමාර්ගය රෙජිස්ට්රියක් බැවින් තවත් ගමනාන්ත එකතු කළ හැක.

---

## 1. එය ක්රියා කරන ආකාරය

```
සේවාදායකය (වින්යාසය විකේතනය + වලංගු කිරීම, කර්සරය සමථයකට පත් කිරීම)
  → IPC ආරම්භ කිරීම → හුදකලා exportChild OS ක්රියාවලිය
    → කියවීමට පමණක් ඇති storage.sqlite → හවුල් call-log විමසුම/සිතියම්ගත කිරීම
      → අසමමුහුර්ත කලාකෘති පූරණය → ගමනාන්තයේ prepare()/send()
        → කාණ්ඩ IPC → සේවාදායකය කර්සරය සුරකියි → පිළිගැනීමේ IPC
          → ඊළඟ කාණ්ඩය; අවසන් IPC → සේවාදායකය සාර්ථකත්වය සටහන් කරයි
```

- **කාලසටහන** — එක් `JobRegistry` cron කාර්යයක් වන `log_export`, පෙරනිමියෙන් `0 * * * *` (පැයකට වරක්,
  UTC). `src/lib/initCloudSync.ts` තුළ ලියාපදිංචි කර ඇත; `OMNIROUTE_LOG_EXPORT_CRON` මඟින් අභිබවා සැකසිය හැක.
  සෑම ක්රියාත්මක වීමකදීම **සක්රිය කර ඇති** සෑම ගමනාන්තයක්ම අනුක්රමිකව හිස් කරයි.
- **කර්සරය** — SQLite හි ව්යංග `call_logs.rowid`, එක් එක් ගමනාන්තය සඳහා
  `log_export_destinations.cursor_row_id` තුළ සුරකියි. `timestamp` කර්සරය ලෙස භාවිත නොකරන්නේ හිතාමතාය: කැඳවුම්කරුවන්ට
  තමන්ගේම අගයක් සැපයිය හැකි බැවින්, ප්රමාද ඉල්ලීමක් පසුව ආරම්භ වූ වේගවත් ඉල්ලීමකට පසුව ලිවිය හැකි අතර,
  timestamp කර්සරයක් එය මඟහරිනු ඇත.
- **කාණ්ඩගත කිරීම** — එක් ඉල්ලීමකට `batch_size` පේළි (පෙරනිමිය 500), එක් ධාවනයකට
  `max_rows_per_run` පේළි (පෙරනිමිය 10000); එමඟින් විශාල පසුබැසීමක් එක් ධාවනයක් අවහිර කිරීම වෙනුවට
  ක්රියාත්මක වීම් කිහිපයක් පුරා හිස් වේ.
- **බෙදාහැරීම** — කර්සරය ඉදිරියට යන්නේ `send()` විසඳුණු පසුව පමණි. අසාර්ථක කාණ්ඩයක්
  කර්සරය තිබූ තැනම තබන බැවින්, ඊළඟ ධාවනයේදී එම පේළිම නැවත උත්සාහ කෙරේ. සහතිකය වන්නේ
  සත්ය exactly-once ක්රියාකාරිත්වයක් නොව, අවම වශයෙන් එක් වරක් බෙදාහැරීම සහ ගමනාන්ත පාර්ශ්වයේ අනුපිටපත් ඉවත් කිරීමයි: BigQuery විසින් සෑම
  පේළියක්ම call-log id අනුව යතුරුගත කරන අතර, තමන්ගේම අනුපිටපත් ඉවත් කිරීමේ කාල කවුළුව තුළ එය හැකි උපරිමයෙන් පිළිපදියි.
- **අතිච්ඡාදන ආරක්ෂකය** — cron ක්රියාත්මක වීම සහ `POST .../run` එකවර සිදුවිය හැක. දැනටමත්
  හිස් කරමින් පවතින ගමනාන්තයක් දෙවරක් හිස් කිරීම වෙනුවට මඟහරිනු ලැබේ (ධාවන ප්රතිඵලයේ `skipped: true`),
  එම නිසා සමකාලීන ධාවනයකට කාණ්ඩයක් නැවත යැවීමට හෝ කර්සරය පසුපසට ලිවීමට නොහැක.
- **පිරිසිදු කිරීමෙන් ප්රතිසාධනය** — `cursor_row_id` අගය `MAX(rowid)` ට ඉහළින් අවසන් වුවහොත් (මුළු වගුවම
  පිරිසිදු කර rowids නැවත ආරම්භ කර ඇත්නම්), runner ස්ථිරවම දත්ත නොදකින තත්ත්වයකට පත්වීම වෙනුවට 0 වෙත ආපසු යයි.

### හුදකලා runner සහ සීමා

Node මත සෑම ගමනාන්ත ධාවනයක්ම වෙනම, කෙටි කාලීන OS child process එකක් (`worker_threads` නොව, IPC සහිත `child_process`)
ආරම්භ කරයි. Body කියවීම්, payload JSON විග්රහ කිරීම/අනුක්රමිකකරණය, ගමනාන්ත
`prepare()` සහ ගමනාන්ත ජාල I/O යන සියල්ල සේවාදායකයේ event loop එක මත නොව එහි ක්රියාත්මක වේ.
IPC හරහා ගමන් කරන්නේ වින්යාසය සහ කුඩා ප්රගති පණිවිඩ පමණි; අපනයනය කළ වාර්තා කිසිවිටෙක සේවාදායකයට ආපසු නොඑයි.
cron කාර්යය සහ Run now route එක එකම පොදු ප්රතිඵලය සහ අතිච්ඡාදන ආරක්ෂකය පවත්වා ගනී.

child එක සේවාදායකය විසඳාගත් `DATA_DIR/storage.sqlite`, `node:sqlite` භාවිතයෙන් කියවීමට පමණක් විවෘත කරයි,
`busy_timeout=5000` සහ `query_only=ON` සමඟ. එය කිසිදු DB singleton එකක් import නොකරන අතර
migrations, backups හෝ SQLite updates කිසිවක් සිදු නොකරයි. නැති/දූෂිත කලාකෘති පොත් තැබීම (`corrupt-artifact UPDATE` ද ඇතුළුව)
dashboard විස්තර මාර්ගය තුළ පමණක් පවතී. මාර්ග දෙකම අතුරු ආබාධ රහිත
විස්තර resolver එකක් හවුලේ භාවිත කරයි; export අසමමුහුර්ත filesystem කියවීම් සහ එකම artifact → legacy
inline → legacy disk → none විසඳුම් අනුපිළිවෙළ භාවිත කරයි. child එක තම reader විවෘත කරන විට ධාවනයක් උපරිම ඇතුළත් කිරීමේ rowid එකේ
snapshot එකක් ගනී; පසුව සිදු වන ඇතුළත් කිරීම් ඊළඟ ධාවනය තෙක් බලා සිටියි. මෙය දිගුකාලීන SQLite transaction එකක් නොව,
ඇතුළත් කිරීමේ සීමාවකි: ජාලය සඳහා රැඳී සිටින අතරතුර WAL writers සහ checkpoints නිදහසේ ක්රියා කළ හැක.
මෙම සීමාව මඟින් පවතින පේළිවල යාවත්කාලීන කිරීම්/මකා දැමීම් ස්ථිර නොකෙරේ.

පිළිගත් සෑම කාණ්ඩයකටම පසුව, child එක පිළිගැනීමක් සඳහා රැඳී සිටියි. සේවාදායකය පළමුව
`advanceLogExportCursor` මඟින් කර්සරය සුරකින අතර, පසුව `ack` යවයි; ඊට පෙර ඊළඟ කාණ්ඩය ආරම්භ නොවේ.
යැවීමේ අසාර්ථකත්වයක්, බිඳවැටීමක් හෝ කාලය ඉක්මවීමක් එම කාණ්ඩය ඉදිරියට ගෙන නොයා අසාර්ථකත්වය සටහන් කරයි. පෙර
පිළිගත් කාණ්ඩ commit වී පවතී; නැවත යැවිය හැක්කේ පිළිගැනීමක් නොලැබුණු එක් කාණ්ඩය උපරිම වශයෙනි.
සාර්ථකත්වය සටහන් කරන්නේ `done` ලැබීමෙන් සහ child එක පිරිසිදුව exit වීමෙන් පසුව පමණි. අසාර්ථකත්වයකදී child එක
SIGTERM මඟින් අවසන් කරන අතර, 500 ms පසුව SIGKILL දක්වා උත්සන්න කර, runner ක්රියාවලිය වැසෙන තෙක් රැඳී සිටියි.

| පරිසර විචල්යය                                 | පෙරනිමිය | අරමුණ                             |
| --------------------------------------------- | -------- | --------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000   | එක් ගමනාන්තයකට wall-clock සීමාව   |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024     | child V8 old-space සීමාව MB වලින් |

වලංගු නොවන/ධන නොවන/පූර්ණ සංඛ්යා නොවන අගයන් සඳහා පෙරනිමි භාවිත වේ. Heap සැකසුම සමස්ත
RSS සීමාවක් නොවේ; ඉතා විශාල කාණ්ඩවලට තවමත් child මතකය අවසන් කර ධාවනය ආරක්ෂිතව අසාර්ථක කළ හැක.
1024 MB පෙරනිමිය, bodies සක්රිය කර ඇති 512 KiB කලාකෘති 500ක පෙරනිමි කාණ්ඩය සඳහා,
BigQuery හි byte-chunked JSON අනුක්රමිකකරණයද ඇතුළුව, අමතර ඉඩක් තබයි. එය
පේළි 10000ක bodies කාණ්ඩයක් ආරක්ෂිත නොකරයි. V8 heap අවසන් වීම ක්රියාමාර්ග ගත හැකි අසාර්ථකත්වයක් ලෙස සටහන් වේ: කාණ්ඩ
ප්රමාණය අඩු කරන්න හෝ `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` වැඩි කරන්න; කර්සරය අවසන් වරට
පිළිගත් කාණ්ඩයේම පවතී. ඓතිහාසික inline/disk bodies නවීන artifact cap එකෙන් ආවරණය නොවේ.
විශේෂයෙන්ම මතකය සීමා කළ containers තුළ, ක්රියාකරුවන් RSS සඳහා වෙනම සැලසුම් කළ යුතුය.

child එකට ලැබෙන්නේ විසඳාගත් `DATA_DIR`, `NODE_ENV`, පැහැදිලි `TZ` (legacy filename
දේශීය වේලා විසඳුම), පවතින විට `ELECTRON_RUN_AS_NODE`, සහ පහත පිටතට යන inputs පමණි:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (සහ ඒවායේ lowercase ආකාර),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
ගෝලීය Undici dispatcher එකක් සේවාදායකයේ අතුරු ආබාධ රහිත environment-proxy විසඳුම සහ `NO_PROXY` ඇතුළු local-host
bypass නීති හවුලේ භාවිත කරයි; එය `proxyFetch.ts` හෝ එහි DB/feature flags import නොකරයි.
ඉදිරියට යවන output සහ සටහන් කළ errors වලින් proxy credentials සඟවනු ලැබේ. ගමනාන්ත credentials
ගමන් කරන්නේ එක් start IPC පණිවිඩයක් තුළ පමණක් වන අතර, කිසිවිටෙක argv හෝ environment තුළ නොවේ; output/error forwarding සඳහා
prefix යොදා පිරිසිදු කෙරේ. සෑම cron ධාවනයකදීම Node හි SQLite warning එක නැවත පෙන්වීම වැළැක්වීමට child exec arguments තුළ
අක්රිය කරන්නේ `ExperimentalWarning` පමණි; අනෙකුත් warning වර්ග දෘශ්යමානව පවතී.

ගමනාන්ත මොඩියුල Next.js/server-only පරායත්තතා නොමැතිව import කළ හැකි විය යුතුය. පවතින
BigQuery ක්රියාත්මක කිරීම දැනටමත් එම ගිවිසුම සපුරාලයි. ප්රවේශ-ටෝකන හැඹිලි පවතින්නේ child
ධාවනය සඳහා පමණක් වන අතර, ධාවන අතර නොපවතී. Node යනු සහාය දක්වන runtime එකයි (`package.json` engines), නමුත් README හි Bun
ස්ථාපන කොටස සහ `Dockerfile.bun` ද `bun:sqlite` (`src/lib/db/core.ts` / adapters) භාවිත කරන නිෂ්පාදන
අනුකූලතා මාර්ගයක් ප්රචාරය කරයි. එබැවින් Bun යටතේ, export ක්රියාවලි පෙර පැවති
ක්රියාවලිය-තුළ මාර්ගය රඳවාගෙන එක් වරක් පමණක් අනතුරු ඇඟවීමක් නිකුත් කරයි: child heap/timeout හුදකලා කිරීම ලබා ගත නොහැක. Event-loop
සහ OOM හුදකලා කිරීම සඳහා Node භාවිත කරන්න; මෙහිදී Bun සංවර්ධනයට පමණක් සීමා වූවක් ලෙස නොසලකයි.

`includeBodies` සබල කර ඇති විට, පැයක payload පසුබැසීමක් රැස් කිරීම වෙනුවට
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` වැනි මිනිත්තු මට්ටමේ කාලසටහනක් භාවිත කිරීමට ප්රමුඛත්වය දෙන්න.
Batch සහ row සීමා තවමත් එක් එක් ධාවනය සීමා කරයි. එක් ධාවනයකට එක් ගමනාන්තයක් සඳහා process startup පිරිවැය දැරිය යුතුය;
මෙය සම්පූර්ණ CPU භාවිතය අඩු කිරීමක් නොව, server event-loop හුදකලා කිරීම වෙනුවෙන් කුඩා startup පිරිවැයක් හුවමාරු කරයි.

### Payload (ප්රේරක සහ සම්පූර්ණ කිරීම්)

පෙරනිමියෙන් export එක ගෙන යන්නේ Logs **ලැයිස්තුව** පෙන්වන සාරාංශ ක්ෂේත්ර පමණි. **ප්රේරක සහ ප්රතිචාර export කරන්න** (`includeBodies`)
සක්රිය කිරීමෙන්, එක් එක් ඇමතුම සඳහා Logs **විස්තර**
කවුළුව පෙන්වන දෑ අමතරව යවයි:

| ක්ෂේත්රය                         | එහි අඩංගු දේ                                                      |
| -------------------------------- | ----------------------------------------------------------------- |
| `request_body` / `response_body` | Dashboard එක ඒවා දක්වන ආකාරයේ ඇමතුම් payload                      |
| `pipeline_route_decision`        | Router එක තෝරාගත් target එක සහ model එක                           |
| `pipeline_client_request`        | Client එක එවූ ආකාරයටම ඇති අමු request එක                          |
| `pipeline_openai_request`        | අභ්යන්තර OpenAI ආකෘතියට පරිවර්තනය කිරීමෙන් පසු                    |
| `pipeline_provider_request`      | Provider උපභාෂාවෙන් upstream වෙත සැබැවින්ම යැවූ ආකාරය             |
| `pipeline_provider_response`     | අමු upstream response එක                                          |
| `pipeline_client_response`       | Caller වෙත ආපසු ලබා දුන් දේ                                       |
| `pipeline_error`                 | අසාර්ථක ඇමතුමක් සඳහා pipeline-මට්ටමේ දෝෂ විස්තරය                  |
| `bodies_truncated`               | ඉහත ක්ෂේත්රවලින් එකක් හෝ `maxBodyBytes` සීමාවට ළඟා වූ විට සත්ය වේ |

මෙය ප්රේරක අන්තර්ගතයක් බැවින්, එය **පෙරනිමියෙන් අක්රියයි** සහ හිතාමතාම එක් එක් ගමනාන්තය අනුව තෝරාගත හැක.
යවනු ලබන්නේ dashboard එක පෙන්වන දේමයි, මන්ද export සහ `getCallLogById` එකම විස්තර
විසඳීම බෙදාගන්නා බැවිනි: payload ලියන විටම ඒවායේ
PII පිරිසිදු කර රහස් සංස්කරණය කර ඇති අතර, `noLog` API යතුරක් සමඟ සිදු කළ ඇමතුමක් කිසිදු payload එකක්
ගබඩා නොකරන බැවින් export කිරීමට කිසිවක් නොමැත.

Payload එක් එක් row එක සඳහා filesystem artifact වෙතින් කියවනු ලබන බැවින්, දත්ත පිරවීම ක්රියාත්මක වන්නේ එය ඉල්ලා සිටි
ගමනාන්ත සඳහා පමණි. අස්ථානගත හෝ දූෂිත artifact එකක්, batch එක අසාර්ථක කර cursor එක සිර කර තැබීම වෙනුවට,
එහි සාරාංශය null payload සමඟ export කරයි.

`maxBodyBytes` (පෙරනිමිය 262144) එක් එක් ක්ෂේත්රය සීමා කරයි. දිගු payload **ඉවත් කිරීම වෙනුවට
කප්පාදු කරයි** — කප්පාදු කළ ප්රේරකයක් තවමත් "අසන ලද්දේ කුමක්ද" යන්නට පිළිතුරු දෙයි — සහ row එක
`bodies_truncated` ලෙස සලකුණු කරයි. Stream කරන ලද chunk-by-chunk delta export නොකරයි; එකලස් කළ response එක
දැනටමත් `pipeline_provider_response` සහ `pipeline_client_response` තුළ ඇත.

---

## 2. ගොනු

| කොටස                    | පිහිටීම                                      |
| ----------------------- | -------------------------------------------- |
| ගමනාන්ත contract එක     | `src/lib/logExport/types.ts`                 |
| Registry එක             | `src/lib/logExport/registry.ts`              |
| රහස් හැසිරවීම           | `src/lib/logExport/secrets.ts`               |
| Runner එක (මව් IPC)     | `src/lib/logExport/runner.ts`                |
| Process ජීවන චක්රය      | `src/lib/logExport/childRunner.ts`           |
| Child පිවිසුම           | `src/lib/logExport/exportChild.ts`           |
| කියවීමට පමණක් opener එක | `src/lib/db/logExportReadOnly.ts`            |
| හවුල් query/mapping     | `src/lib/usage/callLogExportQueries.ts`      |
| විස්තර resolver එක      | `src/lib/usage/callLogDetailResolver.ts`     |
| API projection එක       | `src/lib/logExport/presenter.ts`             |
| BigQuery ගමනාන්තය       | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA සත්යාපනය      | `src/lib/logExport/googleServiceAccount.ts`  |
| Call-log මූලාශ්රය       | `src/lib/usage/callLogExportSource.ts`       |
| දත්ත ස්ථායිකරණය         | `src/lib/db/logExportDestinations.ts`        |
| Cron කාර්යය             | `src/lib/jobs/logExportJob.ts`               |
| REST ස්තරය              | `src/app/api/log-export/`                    |
| Dashboard පිටුව         | `src/app/(dashboard)/dashboard/log-export/`  |

Schema එක: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

සියලුම මාර්ග කළමනාකරණ-සත්යාපිතයි (`requireManagementAuth`). රහස් කිසි විටෙක ආපසු ලබා නොදේ:
ගබඩා කළ රහසක් `__stored__` යන වචනාර්ථ අගය ලෙස ආපසු ලැබෙන අතර, යාවත්කාලීන කිරීමකදී එම අගයම නැවත යැවීමෙන්
ගබඩා කළ අක්තපත්රය එලෙසම තබා ගනී.

රහසක් ප්රකාශ කරන වර්ගයක ගමනාන්තයක් සෑදීම හෝ යාවත්කාලීන කිරීම සඳහා **`STORAGE_ENCRYPTION_KEY`
අවශ්ය වේ**. එය නොමැතිව `encrypt()` නිහඬව වෙනසක් නොකර අගය හරහා යවන බැවින්, අක්තපත්රයක්
සරල පෙළ ලෙස SQLite තුළ තැබීම වෙනුවට ලිවීම 400 සමඟ ප්රතික්ෂේප කෙරේ (Telegram webhook එක යොදන ආරක්ෂණයමයි).

| ක්රමය    | මාර්ගය                                   | අරමුණ                                                         |
| -------- | ---------------------------------------- | ------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | ගමනාන්ත වර්ග + ඒවායේ වින්යාස ක්ෂේත්ර ලැයිස්තුව                |
| `GET`    | `/api/log-export/destinations`           | ගමනාන්ත ලැයිස්තුගත කිරීම (රහස් සඟවා ඇත)                       |
| `POST`   | `/api/log-export/destinations`           | ගමනාන්තයක් සෑදීම                                              |
| `GET`    | `/api/log-export/destinations/{id}`      | එකක් කියවීම                                                   |
| `PUT`    | `/api/log-export/destinations/{id}`      | නම / සක්රීය තත්ත්වය / වින්යාසය / කාණ්ඩකරණය යාවත්කාලීන කිරීම   |
| `DELETE` | `/api/log-export/destinations/{id}`      | මකා දැමීම                                                     |
| `POST`   | `/api/log-export/destinations/{id}/test` | අක්තපත්ර පරීක්ෂා කිරීම, කිසිවක් නොලියයි                       |
| `POST`   | `/api/log-export/destinations/{id}/run`  | දැන් හිස් කිරීම, කාලසටහන්ගත ධාවනයේ මාර්ගයම භාවිත කරයි         |
| `GET`    | `/api/log-export/status`                 | Cron තත්ත්වය, මෑත ධාවන, එක් එක් ඉලක්කයේ පසුබැසුණු වැඩ ප්රමාණය |

UI එක සාමාන්යකරණය කරන්නේ `GET /api/log-export/types` ය: උපකරණ පුවරුවේ පෝරමය
ආපසු ලැබෙන ක්ෂේත්ර විස්තරකවලින් නිර්මාණය වන බැවින්, නව ගමනාන්තයක් සඳහා UI වෙනසක් අවශ්ය නොවේ.

---

## 4. BigQuery ගමනාන්තය

වින්යාස යතුරු (`type: "bigquery"`):

| යතුර                 | සටහන්                                                                         |
| -------------------- | ----------------------------------------------------------------------------- |
| `projectId`          | දත්ත කට්ටලය අඩංගු GCP ව්යාපෘතිය                                               |
| `datasetId`          | `[A-Za-z0-9_]+`                                                               |
| `tableId`            | `[A-Za-z0-9_]+`                                                               |
| `location`           | දත්ත කට්ටලය සෑදිය යුතු විට පමණක් භාවිත වේ (පෙරනිමිය `EU`)                     |
| `serviceAccountJson` | සේවා-ගිණුම් යතුර. රහසකි: ගබඩා කිරීමේදී සංකේතනය කරයි, කිසි විටෙක ආපසු ලබා නොදේ |
| `autoCreate`         | පළමු අපනයනයේදී දත්ත කට්ටලය සහ වගුව සාදන්න (පෙරනිමිය `true`)                   |

සේවා ගිණුමට ඉලක්ක වගුව මත `bigquery.tables.updateData` අවශ්ය වන අතර,
`autoCreate` සක්රීය විට `bigquery.datasets.create` / `bigquery.tables.create` ද අවශ්ය වේ.

වින්යාස කළ කාණ්ඩයක් HTTP ඒකකයක් නොව **කර්සර** ඒකකයකි: `send()` එය උපරිම පේළි 500 බැගින් වූ
insertAll ඇමතුම්වලට බෙදන බැවින්, විශාල `batch_size` අගයකට BigQuery හි 10 MB ඉල්ලීම් සීමාව ඉක්මවා යා නොහැක.
තාවකාලික තත්ත්ව (408/429/500/502/503/504) ඝාතීය ප්රමාදයක් සමඟ උපරිම වාර තුනක් නැවත උත්සාහ කරයි,
එම insertIds ම නැවත භාවිත කරමින්; සත්යාපන සහ යෝජනා ක්රම දෝෂ ධාවනය නාස්ති කිරීම වෙනුවට පළමු උත්සාහයේදීම
ව්යතිරේකයක් නිකුත් කරයි.

මොහොතකට පෙර සෑදූ වගුවක් තවමත් ප්රවාහ අන්ත ලක්ෂ්යයට දෘශ්ය නොවන බැවින්, එය තත්පර කිහිපයක්
404 ප්රතිචාර දෙයි. එම 404 සඳහා නැවත උත්සාහ කරයි, නමුත් **මෙම ධාවනය වගුව සෑදූ විට පමණි** —
සැබවින්ම නොමැති වගුවක් තවමත් වහාම අසාර්ථක වේ. මෑතකදී මකා දැමූ නමක් යටතේ වගුවක් නැවත සෑදීමෙන්
BigQuery මිනිත්තු කිහිපයක් ප්රවාහ ඇතුළත් කිරීම් ප්රතික්ෂේප කරන බව සලකන්න; එය මකා-ඉන්පසු-නැවත-සෑදීමේ
ලක්ෂණයක් වන බැවින්, එකක් ඉවත් කර නැවත එක් කිරීම වෙනුවට නව වගු නමක් භාවිත කිරීමට ප්රමුඛත්වය දෙන්න.

**අර්ධ අසාර්ථකත්වයක් හිස් නොවන `insertErrors[]` එකක් සහිත HTTP 200 ලෙස ලැබේ.** එය අසාර්ථකත්වයක් ලෙස
සලකා ව්යතිරේකයක් නිකුත් කරයි; එමඟින් BigQuery කිසිදා පිළි නොගත් පේළි පසුකර කර්සරය ඉදිරියට යාම නවතී;
`tests/unit/log-export-bigquery.test.ts` මෙම හැසිරීම ස්ථිර කරයි.

ප්රවාහනය සරල REST වේ — ස්වයං-අත්සන් කළ RS256 ප්රකාශයක්
`https://oauth2.googleapis.com/token` හි ප්රවේශ ටෝකනයක් සඳහා හුවමාරු කර, ඉන්පසු පේළි `tabledata.insertAll` වෙත යවයි. කිසිදු Google SDK එකක්
ඇතුළත් කර නොගනී. ප්රවේශ ටෝකන එක් එක් (සේවා ගිණුම, විෂය පථය) සඳහා ක්රියාවලිය තුළ හැඹිලිගත කරයි.

සාදන ලද වගුවේ Logs පටිත්තේ එක් එක් ක්ෂේත්රයට තීරුවක් සහ `exported_at` ඇතුළත් වන අතර,
ඇමතුම් ලොග් සැබවින්ම විමසන ආකාරයට එය සකසා ඇත:

- **`timestamp` මත දින අනුව කොටස් කර ඇත**, එබැවින් දිනයෙන් සීමා කළ විමසුමක් පරිලෝකනය කරන්නේ එම දින පමණි.
- **`api_key_name`, `provider`, `model`, `status` අනුව සමූහගත කර ඇත** (එම අනුපිළිවෙළට), එබැවින්
  එය ධාවනය කළේ කවුද, එය ගියේ කොතැනටද, හෝ එය අසාර්ථක වූයේද යන්න අනුව පෙරීමෙන් එක් එක් කොටස තුළ ඇති කොටස් ඉවත් කරයි. BigQuery
  උපරිම සමූහකරණ තීරු හතරක් පමණක් ඉඩ දෙන අතර අනුපිළිවෙළ වැදගත් වේ: `api_key_name` මත පමණක් පෙරහනක්
  කොටස් ඉවත් කරයි, `status` මත පමණක් පෙරහනක් එසේ නොකරයි.
- **විකල්ප කොටස් රඳවාගැනීම** `partitionExpirationDays` හරහා (0 සියල්ල තබා ගනී), වගුව
  සාදන විට යොදනු ලැබේ.

සැකසුම් දෙකම නිර්මාණය කරන අවස්ථාවේදී අදාළ වේ. පවතින වගුවක් එයට දැනටමත් ඇති පිරිසැලසුම එලෙසම තබා ගනී, එබැවින්
ඒවා භාවිතයට ගැනීමට අවශ්ය නම් ගමනාන්තය නව වගු id එකකට යොමු කරන්න.

`tests/unit/log-export-bigquery.test.ts` මඟින් mapper එක සහ වගු schema එක එකිනෙකට සමපාතව පවතින බව තහවුරු කරන බැවින්, නව call-log තීරුවක් පිටතට යන අතරතුර නිහඬව ඉවත් විය නොහැක.

කණ්ඩායම් **පේළි ගණන** සහ අනුක්රමිකකරණය කළ බයිට් යන දෙකම අනුව කොටස්වලට බෙදේ. payload අපනයනය කරන විට පේළි ගණන පමණක් ප්රමාණවත් නොවේ: prompts රැගෙන යන පේළි 500ක් මෙගාබයිට් දස ගණනක් විය හැකි අතර, 10 MB ඉක්මවන ඉල්ලීමක් insertAll මඟින් ප්රතික්ෂේප කරයි. පේළි 500ක් හෝ 9 MB සීමාවට ළඟා වූ විට—පළමුව සිදුවන අවස්ථාවේදී—කොටස් අවසන් කෙරේ.

---

## 5. ගමනාන්තයක් එක් කිරීම

1. `LogExportDestinationType` එකක් export කරන `src/lib/logExport/destinations/<name>.ts` සාදන්න:
   Zod `configSchema` එකක්, UI සඳහා `fields` විස්තරකාරක array එකක්, `secretFields`, සහ
   `test()` / `prepare()` / `send(records)` ආපසු ලබා දෙන `createClient(config)` එකක්.
2. එය `src/lib/logExport/registry.ts` හි `DESTINATIONS` array එකට එක් කරන්න.
3. `tests/unit/` යටතේ පරීක්ෂණ ලියන්න.

සම්පූර්ණ වෙනස එපමණයි: දත්ත ස්ථීරව ගබඩා කිරීම, cron job එක, REST ස්තරය, රහස් සංකේතනය සහ
dashboard පෝරමය යන සියල්ල registry එක කියවයි.

නව ගමනාන්තයක් සඳහා නීති දෙකක්:

- අර්ධ අසාර්ථකත්වයකදී `send()` **අනිවාර්යයෙන්ම throw කළ යුතුය**. එය සාර්ථකව resolve වීම යනු "ගමනාන්තය සතුව මෙම පේළි ඇත" යන්නයි,
  එවිට cursor එක ඒවා පසුකර ස්ථිරවම ඉදිරියට යයි.
- පරිශීලකයා සපයන URL එකක් භාවිත කරන ගමනාන්තයක්, fetch කිරීමට පෙර,
  webhooks කරන ආකාරයටම `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) හරහා එය වලංගු කළ යුතුය.
  BigQuery සඳහා මෙය අවශ්ය නොවේ: එහි hosts නියත අගයන් වේ.

---

## 6. එය ක්රියාත්මක කිරීම

- **Dashboard**: Integrations → Log export. ගමනාන්තයක් එක් කර, පේළි නොලියා credentials පරීක්ෂා කිරීමට **Test** ක්රියාත්මක කර,
  ඉන්පසු එය සක්රිය කරන්න.
- **Backlog**: සෑම ගමනාන්ත card එකකම pending පේළි සහ cursor එක පෙන්වයි; `GET
/api/log-export/status` මඟින් එම සංඛ්යා සහ අවසන් job runs 20 ද ලබා දෙයි.
- **එක් ගමනාන්තයක් අසාර්ථක වීමෙන් අනෙක් ඒවා අසාර්ථක නොවේ** — run summary එක `last_status` / `last_error` තුළ එක් එක් ගමනාන්තයේ
  status එක සටහන් කරන අතර, job run history එක සමස්ත ප්රතිඵලය තබා ගනී.
- **ගමනාන්තයක් මකා දැමීමෙන් එහි cursor එකද මැකේ.** එය නැවත එක් කළ විට, රඳවා තබා ඇති පැරණිතම
  call log එකෙන් ආරම්භ වන අතර, ගමනාන්තය සතුව දැනටමත් තිබිය හැකි පේළි නැවත යවයි. BigQuery තුළ එක් එක් පේළියේ
  `insertId` මඟින් එය අවශෝෂණය කරන්නේ BigQuery හිම de-duplication කාල කවුළුව තුළ පමණක් බැවින්, ගමනාන්තයක් මකා දැමීමට වඩා
  එය අක්රිය කිරීම වඩාත් සුදුසුය.
