# Log export (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

OmniRoute കോൾ ലോഗുകൾ ഒരു ബാഹ്യ അനലിറ്റിക്സ് സ്റ്റോറിലേക്ക് തുടർച്ചയായി, ഇൻക്രിമെന്റലായി എക്സ്പോർട്ട് ചെയ്യൽ.

ലോഗുകൾ ഡാഷ്ബോർഡ് ടാബ് അഭ്യർത്ഥനാ ചരിത്രം SQLite-ൽ (`call_logs`) സൂക്ഷിക്കുന്നു; റൊട്ടേഷനും
റിറ്റൻഷനും അതിന്റെ പരിധി നിർണയിക്കുന്നു. ലോഗ് എക്സ്പോർട്ട് അതേ റെക്കോർഡ് സെറ്റ് ഒരു ഷെഡ്യൂൾ പ്രകാരം പുറത്തേക്ക് അയയ്ക്കുന്നു. അതുവഴി അതിന്
ലോക്കൽ ഡാറ്റാബേസിനപ്പുറം നിലനിൽക്കാനും മറ്റ് ഡാറ്റയുമായി ജോയിൻ ചെയ്യപ്പെടാനും കഴിയും. BigQuery ആണ് ആദ്യ ലക്ഷ്യസ്ഥാനം;
പൈപ്പ്‌ലൈൻ ഒരു രജിസ്ട്രിയാണ്, അതിനാൽ കൂടുതൽ ലക്ഷ്യസ്ഥാനങ്ങൾ കൂട്ടിച്ചേർക്കാനാകും.

---

## 1. ഇത് എങ്ങനെ പ്രവർത്തിക്കുന്നു

```
server (decrypt + validate config, reconcile cursor)
  → start IPC → isolated exportChild OS process
    → read-only storage.sqlite → shared call-log query/mapping
      → async artifact hydration → destination prepare()/send()
        → batch IPC → server persists cursor → ack IPC
          → next batch; done IPC → server records success
```

- **ഷെഡ്യൂൾ** — ഒരു `JobRegistry` ക്രോൺ ജോബ്, `log_export`, ഡിഫോൾട്ടായി `0 * * * *` (മണിക്കൂറിൽ ഒരിക്കൽ,
  UTC). `src/lib/initCloudSync.ts`-ൽ രജിസ്റ്റർ ചെയ്തിരിക്കുന്നു; `OMNIROUTE_LOG_EXPORT_CRON` ഉപയോഗിച്ച് മാറ്റാം.
  ഓരോ ടിക്കിലും **പ്രവർത്തനക്ഷമമാക്കിയ** എല്ലാ ലക്ഷ്യസ്ഥാനങ്ങളിലേക്കുമുള്ള ശേഷിക്കുന്ന ഡാറ്റ ക്രമാനുസൃതമായി അയയ്ക്കുന്നു.
- **കർസർ** — SQLite-ന്റെ ഇംപ്ലിസിറ്റ് `call_logs.rowid`, ഓരോ ലക്ഷ്യസ്ഥാനത്തിനുമായി
  `log_export_destinations.cursor_row_id`-ൽ സൂക്ഷിക്കുന്നു. `timestamp` മനഃപൂർവം കർസറായി ഉപയോഗിക്കുന്നില്ല: കോളർമാർക്ക്
  സ്വന്തം മൂല്യം നൽകാനാകും. അതിനാൽ, വൈകി ആരംഭിച്ച വേഗമേറിയ അഭ്യർത്ഥനയ്ക്ക് ശേഷം മന്ദഗതിയിലുള്ള ഒരു അഭ്യർത്ഥന
  എഴുതപ്പെടാം; ടൈംസ്റ്റാമ്പ് കർസർ അതിനെ ഒഴിവാക്കും.
- **ബാച്ചിംഗ്** — ഓരോ അഭ്യർത്ഥനയിലും `batch_size` വരികൾ (ഡിഫോൾട്ട് 500), ഓരോ റണ്ണിലും `max_rows_per_run` വരികൾ
  (ഡിഫോൾട്ട് 10000). ഇതുവഴി വലിയ ബാക്ക്‌ലോഗ് ഒരു ടിക്കിനെ തടയുന്നതിനു പകരം നിരവധി ടിക്കുകളിലായി അയയ്ക്കപ്പെടുന്നു.
- **ഡെലിവറി** — `send()` വിജയകരമായി പൂർത്തിയായതിനുശേഷം മാത്രമേ കർസർ മുന്നോട്ട് നീങ്ങൂ. ഒരു ബാച്ച് പരാജയപ്പെട്ടാൽ
  കർസർ പഴയ സ്ഥാനത്തുതന്നെ തുടരും; അതിനാൽ അടുത്ത റണ്ണിൽ അതേ വരികൾ വീണ്ടും ശ്രമിക്കും. ഉറപ്പ്
  കുറഞ്ഞത് ഒരിക്കലെങ്കിലും ഡെലിവറിയും ലക്ഷ്യസ്ഥാനത്തെ ഡ്യൂപ്ലിക്കേറ്റ് നീക്കലുമാണ്, യഥാർത്ഥത്തിൽ കൃത്യം ഒരിക്കൽ മാത്രമുള്ള ഡെലിവറിയല്ല: BigQuery ഓരോ
  വരിക്കും കോൾ-ലോഗ് ഐഡി കീ ആയി ഉപയോഗിക്കുന്നു; സ്വന്തം ഡ്യൂപ്ലിക്കേറ്റ് നീക്കൽ സമയപരിധിക്കുള്ളിൽ സാധ്യമായത്ര മികച്ച രീതിയിൽ അത് മാനിക്കുന്നു.
- **ഓവർലാപ്പ് ഗാർഡ്** — ക്രോൺ ടിക്കും `POST .../run`-ഉം ഒരുമിച്ച് പ്രവർത്തിച്ചേക്കാം. ഇതിനകം
  ഡാറ്റ അയച്ചുകൊണ്ടിരിക്കുന്ന ലക്ഷ്യസ്ഥാനം രണ്ടാമതും അയയ്ക്കുന്നതിനു പകരം ഒഴിവാക്കുന്നു (റൺ ഫലത്തിൽ `skipped: true`),
  അതിനാൽ ഒരേസമയം നടക്കുന്ന റണ്ണിന് ഒരു ബാച്ച് വീണ്ടും അയയ്ക്കാനോ കർസർ പിന്നോട്ട് എഴുതാനോ കഴിയില്ല.
- **പർജിന് ശേഷമുള്ള വീണ്ടെടുക്കൽ** — `cursor_row_id`, `MAX(rowid)`-നെക്കാൾ ഉയർന്നതായാൽ (മുഴുവൻ ടേബിളും
  പർജ് ചെയ്യപ്പെടുകയും rowid-കൾ വീണ്ടും ആരംഭിക്കുകയും ചെയ്താൽ), റണ്ണർ സ്ഥിരമായി ഡാറ്റ കാണാതിരിക്കുന്നതിനു പകരം 0-ലേക്ക് മടങ്ങുന്നു.

### ഒറ്റപ്പെട്ട റണ്ണറും പരിധികളും

Node-ൽ ഓരോ ലക്ഷ്യസ്ഥാന റണ്ണും വേറിട്ട, ഹ്രസ്വകാല OS ചൈൽഡ് പ്രോസസ് ആരംഭിക്കുന്നു (IPC സഹിതമുള്ള `child_process`,
`worker_threads` അല്ല). ബോഡി വായനകൾ, പേലോഡ് JSON പാർസിംഗ്/സീരിയലൈസേഷൻ, ലക്ഷ്യസ്ഥാനത്തിന്റെ
`prepare()`, ലക്ഷ്യസ്ഥാന നെറ്റ്‌വർക്ക് I/O എന്നിവയെല്ലാം അവിടെയാണ് പ്രവർത്തിക്കുന്നത്; സെർവറിന്റെ ഇവന്റ് ലൂപ്പിലല്ല.
കോൺഫിഗറേഷനും ചെറിയ പുരോഗതി സന്ദേശങ്ങളും മാത്രമേ IPC വഴി കടന്നുപോകൂ; എക്സ്പോർട്ട് ചെയ്ത റെക്കോർഡുകൾ ഒരിക്കലും
സെർവറിലേക്ക് മടങ്ങുന്നില്ല. ക്രോൺ ജോബും ഇപ്പോൾ പ്രവർത്തിപ്പിക്കുക റൂട്ടും അതേ പബ്ലിക് ഫലവും ഓവർലാപ്പ് ഗാർഡും നിലനിർത്തുന്നു.

ചൈൽഡ്, സെർവർ നിർണയിച്ച `DATA_DIR/storage.sqlite`, `node:sqlite` ഉപയോഗിച്ച് റീഡ്-ഒൺലി ആയി തുറക്കുന്നു,
`busy_timeout=5000`, `query_only=ON` എന്നിവയോടെ. അത് DB സിംഗിൾട്ടൺ ഇംപോർട്ട് ചെയ്യുന്നില്ല;
മൈഗ്രേഷനുകളോ ബാക്കപ്പുകളോ SQLite അപ്‌ഡേറ്റുകളോ നടത്തുന്നുമില്ല. കാണാതായ/കേടായ ആർട്ടിഫാക്റ്റുകളുടെ ബുക്ക്‌കീപ്പിംഗ് (കേടായ
ആർട്ടിഫാക്റ്റിനുള്ള UPDATE ഉൾപ്പെടെ) ഡാഷ്ബോർഡ് വിശദാംശ പാതയിൽ മാത്രം തുടരുന്നു. രണ്ട് പാതകളും ഒരു പ്യൂർ
ഡീറ്റെയിൽ റിസോൾവർ പങ്കിടുന്നു; എക്സ്പോർട്ട് അസിങ്ക്രണസ് ഫയൽസിസ്റ്റം വായനകളും അതേ ആർട്ടിഫാക്റ്റ് → ലെഗസി
ഇൻലൈൻ → ലെഗസി ഡിസ്ക് → ഒന്നുമില്ല എന്ന റിസല്യൂഷൻ ക്രമവും ഉപയോഗിക്കുന്നു. ചൈൽഡ് റീഡർ തുറക്കുമ്പോൾ ഒരു റൺ പരമാവധി ഇൻസർഷൻ rowid-ന്റെ
സ്നാപ്ഷോട്ട് എടുക്കുന്നു; പിന്നീടുള്ള ഇൻസേർട്ടുകൾ അടുത്ത റൺ വരെ കാത്തിരിക്കും. ഇത് ഒരു ഇൻസർഷൻ
അതിർത്തിയാണ്, ദീർഘകാല SQLite ട്രാൻസാക്ഷനല്ല: നെറ്റ്‌വർക്ക് കാത്തിരിപ്പുകൾക്കിടയിൽ WAL റൈറ്ററുകൾക്കും ചെക്ക്‌പോയിന്റുകൾക്കും തടസ്സമില്ല.
നിലവിലുള്ള വരികളുടെ അപ്‌ഡേറ്റുകൾ/ഇല്ലാതാക്കലുകൾ ഈ അതിർത്തി തടഞ്ഞുനിർത്തുന്നില്ല.

സ്വീകരിച്ച ഓരോ ബാച്ചിനുശേഷവും ചൈൽഡ് ഒരു സ്ഥിരീകരണത്തിനായി കാത്തിരിക്കുന്നു. സെർവർ ആദ്യം
`advanceLogExportCursor` ഉപയോഗിച്ച് കർസർ സൂക്ഷിച്ചശേഷം `ack` അയയ്ക്കുന്നു; അതിനു മുമ്പ് അടുത്ത ബാച്ച് ആരംഭിക്കില്ല.
അയയ്ക്കൽ പരാജയമോ ക്രാഷോ ടൈംഔട്ടോ ഉണ്ടായാൽ ആ ബാച്ചിന്റെ കർസർ മുന്നോട്ട് നീക്കാതെ പരാജയം രേഖപ്പെടുത്തുന്നു. നേരത്തെ
സ്ഥിരീകരിച്ച ബാച്ചുകൾ കമ്മിറ്റ് ചെയ്ത നിലയിൽ തുടരും; സ്ഥിരീകരിക്കാത്ത ആ ഒരു ബാച്ച് മാത്രമേ പരമാവധി വീണ്ടും അയയ്ക്കപ്പെടാനാകൂ.
`done` ലഭിക്കുകയും ചൈൽഡ് വൃത്തിയായി എക്സിറ്റ് ചെയ്യുകയും ചെയ്തതിനുശേഷം മാത്രമേ വിജയം രേഖപ്പെടുത്തൂ. പരാജയങ്ങൾ ചൈൽഡിനെ
SIGTERM ഉപയോഗിച്ച് അവസാനിപ്പിക്കുന്നു; 500 ms-നുശേഷം SIGKILL-ലേക്ക് ഉയർത്തുന്നു. പ്രോസസ് അടയുന്നതുവരെ റണ്ണർ കാത്തിരിക്കുന്നു.

| എൻവയോൺമെന്റ് വേരിയബിൾ                         | ഡിഫോൾട്ട് | ഉദ്ദേശ്യം                                   |
| --------------------------------------------- | --------- | ------------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000    | ഓരോ ലക്ഷ്യസ്ഥാനത്തിനുമുള്ള യഥാർത്ഥ സമയപരിധി |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024      | ചൈൽഡ് V8 old-space പരിധി MB-യിൽ             |

അസാധുവായ/പോസിറ്റീവ് അല്ലാത്ത/പൂർണസംഖ്യയല്ലാത്ത മൂല്യങ്ങൾക്ക് ഡിഫോൾട്ടുകൾ ഉപയോഗിക്കുന്നു. ഹീപ്പ് ക്രമീകരണം മൊത്തം
RSS പരിധിയല്ല; വളരെ വലിയ ബാച്ചുകൾക്ക് ഇപ്പോഴും ചൈൽഡ് മെമ്മറി തീർക്കാനും റൺ സുരക്ഷിതമായി പരാജയപ്പെടുത്താനും കഴിയും.
ബോഡികൾ പ്രവർത്തനക്ഷമമാക്കിയ 512 KiB ആർട്ടിഫാക്റ്റുകളുടെ ഡിഫോൾട്ട് 500-വരി ബാച്ചിന് 1024 MB ഡിഫോൾട്ട് അധിക ഇടം നൽകുന്നു;
BigQuery-യുടെ ബൈറ്റ്-ചങ്ക് ചെയ്ത JSON സീരിയലൈസേഷനും ഇതിൽ ഉൾപ്പെടുന്നു. ഇത്
10000-വരി ബോഡി ബാച്ചിനെ സുരക്ഷിതമാക്കുന്നില്ല. V8 ഹീപ്പ് തീരുന്നത് പരിഹാരനടപടി സ്വീകരിക്കാവുന്ന ഒരു പരാജയം രേഖപ്പെടുത്തുന്നു: ബാച്ച്
വലുപ്പം കുറയ്ക്കുക അല്ലെങ്കിൽ `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` വർധിപ്പിക്കുക; കർസർ അവസാനം
സ്ഥിരീകരിച്ച ബാച്ചിൽ തുടരും. പഴയ ഇൻലൈൻ/ഡിസ്ക് ബോഡികൾ ആധുനിക ആർട്ടിഫാക്റ്റ് പരിധിയിൽ ഉൾപ്പെടുന്നില്ല.
ഓപ്പറേറ്റർമാർ RSS-നായി പ്രത്യേകം ബജറ്റ് നിശ്ചയിക്കണം, പ്രത്യേകിച്ച് മെമ്മറി പരിമിതപ്പെടുത്തിയ കണ്ടെയ്‌നറുകളിൽ.

ചൈൽഡിന് പരിഹരിച്ച `DATA_DIR`, `NODE_ENV`, വ്യക്തമായി നൽകിയ `TZ` (ലെഗസി ഫയൽനാമത്തിന്റെ
പ്രാദേശിക-സമയ നിർണയം), ലഭ്യമാണെങ്കിൽ `ELECTRON_RUN_AS_NODE`, കൂടാതെ ഇനിപ്പറയുന്ന ഔട്ട്ബൗണ്ട് ഇൻപുട്ടുകൾ എന്നിവ മാത്രമേ പാരമ്പര്യമായി ലഭിക്കൂ:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (അവയുടെ ചെറിയക്ഷര രൂപങ്ങളും),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
ഒരു ആഗോള Undici ഡിസ്പാച്ചർ, `NO_PROXY` ഉൾപ്പെടെ, സെർവറിന്റെ പരിസ്ഥിതി-പ്രോക്സി നിർണയവും ലോക്കൽ-ഹോസ്റ്റ്
ബൈപാസ് നിയമങ്ങളും അതേപടി പങ്കിടുന്നു; അത് `proxyFetch.ts` അല്ലെങ്കിൽ അതിന്റെ DB/ഫീച്ചർ ഫ്ലാഗുകൾ ഇംപോർട്ട് ചെയ്യുന്നില്ല.
ഫോർവേഡ് ചെയ്യുന്ന ഔട്ട്പുട്ടിൽനിന്നും രേഖപ്പെടുത്തുന്ന പിശകുകളിൽനിന്നും പ്രോക്സി ക്രെഡൻഷ്യലുകൾ മറയ്ക്കുന്നു. ഡെസ്റ്റിനേഷൻ ക്രെഡൻഷ്യലുകൾ
ഒരു ആരംഭ IPC സന്ദേശത്തിലൂടെ മാത്രമേ കൈമാറൂ; argv വഴിയോ എൻവയോൺമെന്റ് വഴിയോ ഒരിക്കലും കൈമാറില്ല; ഔട്ട്പുട്ട്/പിശക് ഫോർവേഡിംഗിൽ
പ്രിഫിക്സ് ചേർക്കുകയും ശുദ്ധീകരിക്കുകയും ചെയ്യുന്നു. ഓരോ cron റണ്ണിലും Node-ന്റെ SQLite മുന്നറിയിപ്പ്
ആവർത്തിക്കാതിരിക്കാൻ ചൈൽഡ് exec ആർഗ്യുമെന്റുകളിൽ `ExperimentalWarning` മാത്രം പ്രവർത്തനരഹിതമാക്കുന്നു; മറ്റ് മുന്നറിയിപ്പ് തരങ്ങൾ ദൃശ്യമായി തുടരും.

Next.js/server-only ഡിപെൻഡൻസികളില്ലാതെ ഡെസ്റ്റിനേഷൻ മൊഡ്യൂളുകൾ ഇംപോർട്ട് ചെയ്യാൻ കഴിയണം. നിലവിലുള്ള
BigQuery ഇംപ്ലിമെന്റേഷൻ ഇതിനകം ആ വ്യവസ്ഥ പാലിക്കുന്നു. ആക്സസ്-ടോക്കൺ കാഷുകൾ ചൈൽഡ്
റണ്ണിന്റെ കാലയളവിൽ മാത്രമേ നിലനിൽക്കൂ; റണ്ണുകൾക്കിടയിൽ നിലനിൽക്കില്ല. പിന്തുണയ്ക്കുന്ന റൺടൈം Node ആണ് (`package.json` engines), എന്നാൽ README-യിലെ Bun
ഇൻസ്റ്റലേഷൻ വിഭാഗവും `Dockerfile.bun`-ഉം `bun:sqlite` (`src/lib/db/core.ts` / അഡാപ്റ്ററുകൾ) ഉപയോഗിച്ചുള്ള
ഒരു പ്രൊഡക്ഷൻ അനുയോജ്യതാ മാർഗവും അവതരിപ്പിക്കുന്നു. അതിനാൽ Bun-ൽ, എക്സ്പോർട്ടുകൾ മുമ്പത്തെ
ഇൻ-പ്രോസസ് മാർഗം നിലനിർത്തുകയും ഒറ്റത്തവണ മുന്നറിയിപ്പ് പുറപ്പെടുവിക്കുകയും ചെയ്യുന്നു: ചൈൽഡ് ഹീപ്പ്/ടൈംഔട്ട് ഐസൊലേഷൻ ലഭ്യമല്ല. ഇവന്റ്-ലൂപ്പ്, OOM ഐസൊലേഷനായി
Node ഉപയോഗിക്കുക; ഇവിടെ Bun-നെ ഡെവലപ്മെന്റിന് മാത്രമുള്ളതായി കണക്കാക്കുന്നില്ല.

`includeBodies` പ്രവർത്തനക്ഷമമാക്കിയിരിക്കുമ്പോൾ, മണിക്കൂറിലൊരിക്കലുള്ള പേലോഡ് ബാക്ക്‌ലോഗ് കൂട്ടിവയ്ക്കുന്നതിനുപകരം
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` പോലുള്ള മിനിറ്റ്-തല ആവർത്തനക്രമം തിരഞ്ഞെടുക്കുക.
ബാച്ച്, വരി പരിധികൾ ഓരോ റണ്ണിനെയും തുടർന്നും നിയന്ത്രിക്കുന്നു. ഓരോ റണ്ണിലും ഓരോ ഡെസ്റ്റിനേഷനും
പ്രോസസ് ആരംഭിക്കുന്നതിനുള്ള ചെലവുണ്ട്; ചെറിയൊരു സ്റ്റാർട്ടപ്പ് ചെലവിന് പകരമായി സെർവർ ഇവന്റ്-ലൂപ്പ് ഐസൊലേഷനാണ്
ഇതിലൂടെ ലഭിക്കുന്നത്, മൊത്തം CPU ഉപയോഗത്തിലെ കുറവല്ല.

### പേലോഡുകൾ (പ്രോംപ്റ്റുകളും പൂർത്തീകരണങ്ങളും)

ഡിഫോൾട്ടായി, ലോഗുകളുടെ **പട്ടിക** കാണിക്കുന്ന സംഗ്രഹ ഫീൽഡുകൾ മാത്രമേ എക്സ്പോർട്ടിൽ ഉൾപ്പെടൂ.
**പ്രോംപ്റ്റുകളും പ്രതികരണങ്ങളും എക്സ്പോർട്ട് ചെയ്യുക** (`includeBodies`) പ്രവർത്തനക്ഷമമാക്കിയാൽ, ഓരോ കോളിനും ലോഗുകളുടെ **വിശദാംശ**
പാനൽ കാണിക്കുന്നവയും അധികമായി അയയ്ക്കുന്നു:

| ഫീൽഡ്                            | അതിൽ അടങ്ങിയിരിക്കുന്നത്                                         |
| -------------------------------- | ---------------------------------------------------------------- |
| `request_body` / `response_body` | ഡാഷ്ബോർഡ് പ്രദർശിപ്പിക്കുന്ന രൂപത്തിലുള്ള കോൾ പേലോഡുകൾ           |
| `pipeline_route_decision`        | റൂട്ടർ തിരഞ്ഞെടുത്ത ടാർഗെറ്റും മോഡലും                            |
| `pipeline_client_request`        | ക്ലയന്റ് അയച്ച അതേ രൂപത്തിലുള്ള അസംസ്കൃത അഭ്യർത്ഥന               |
| `pipeline_openai_request`        | ആന്തരിക OpenAI രൂപത്തിലേക്ക് പരിഭാഷപ്പെടുത്തിയതിനുശേഷമുള്ളത്     |
| `pipeline_provider_request`      | പ്രൊവൈഡറുടെ രൂപത്തിൽ യഥാർത്ഥത്തിൽ അപ്സ്ട്രീമിലേക്ക് അയച്ചത്      |
| `pipeline_provider_response`     | അസംസ്കൃത അപ്സ്ട്രീം പ്രതികരണം                                    |
| `pipeline_client_response`       | കോളറിന് തിരികെ നൽകിയതെന്തോ അത്                                   |
| `pipeline_error`                 | പരാജയപ്പെട്ട കോളിന്റെ പൈപ്പ്‌ലൈൻ-തല പിശക് വിശദാംശങ്ങൾ            |
| `bodies_truncated`               | മുകളിലുള്ള ഏതെങ്കിലും ഫീൽഡ് `maxBodyBytes` പരിധിയിലെത്തിയാൽ True |

ഇത് പ്രോംപ്റ്റ് ഉള്ളടക്കമായതിനാൽ, **ഡിഫോൾട്ടായി ഓഫാണ്**, കൂടാതെ മനഃപൂർവം ഓരോ ഡെസ്റ്റിനേഷനും പ്രത്യേകം തിരഞ്ഞെടുക്കേണ്ടതുമാണ്.
ഡാഷ്ബോർഡ് കാണിക്കുന്നതാണ് അയയ്ക്കുന്നത്, കാരണം എക്സ്പോർട്ടും `getCallLogById`-ഉം ഒരേ വിശദാംശ
നിർണയം പങ്കിടുന്നു: പേലോഡുകൾ
എഴുതുമ്പോൾ തന്നെ PII ശുദ്ധീകരിക്കുകയും രഹസ്യങ്ങൾ മറയ്ക്കുകയും ചെയ്തിരിക്കും; കൂടാതെ
`noLog` API കീ ഉപയോഗിച്ച് നടത്തുന്ന കോൾ പേലോഡൊന്നും സംഭരിക്കില്ല, അതിനാൽ എക്സ്പോർട്ട് ചെയ്യാൻ ഒന്നുമുണ്ടാകില്ല.

ഫയൽസിസ്റ്റം ആർട്ടിഫാക്റ്റിൽനിന്ന് ഓരോ വരിയുടെയും പേലോഡുകൾ വായിക്കുന്നു, അതിനാൽ ഹൈഡ്രേഷൻ ആവശ്യപ്പെട്ട
ഡെസ്റ്റിനേഷനുകൾക്കായി മാത്രമേ അത് പ്രവർത്തിക്കൂ. ആർട്ടിഫാക്റ്റ് നഷ്ടപ്പെട്ടതോ കേടായതോ ആണെങ്കിൽ, ബാച്ച് പരാജയപ്പെടുത്തുകയും
കർസറിനെ കുടുക്കുകയും ചെയ്യുന്നതിനുപകരം, null പേലോഡുകളോടെ അതിന്റെ സംഗ്രഹം എക്സ്പോർട്ട് ചെയ്യുന്നു.

`maxBodyBytes` (ഡിഫോൾട്ട് 262144) ഓരോ ഫീൽഡിനും പരിധി നിശ്ചയിക്കുന്നു. നീളമേറിയ പേലോഡുകൾ **ഒഴിവാക്കുന്നതിനുപകരം
വെട്ടിച്ചുരുക്കുന്നു** — വെട്ടിച്ചുരുക്കിയ പ്രോംപ്റ്റ് പോലും "എന്താണ് ചോദിച്ചത്" എന്നതിന് ഉത്തരം നൽകും — കൂടാതെ ആ വരിക്ക്
`bodies_truncated` ഫ്ലാഗ് നൽകുന്നു. സ്ട്രീം ചെയ്യുന്ന ചങ്ക്-ബൈ-ചങ്ക് ഡെൽറ്റകൾ എക്സ്പോർട്ട് ചെയ്യുന്നില്ല; സംയോജിപ്പിച്ച പ്രതികരണം
ഇതിനകം `pipeline_provider_response`, `pipeline_client_response` എന്നിവയിലുണ്ട്.

---

## 2. ഫയലുകൾ

| ഘടകം                                | സ്ഥാനം                                       |
| ----------------------------------- | -------------------------------------------- |
| ലക്ഷ്യസ്ഥാന കരാർ                    | `src/lib/logExport/types.ts`                 |
| രജിസ്ട്രി                           | `src/lib/logExport/registry.ts`              |
| രഹസ്യങ്ങൾ കൈകാര്യം ചെയ്യൽ           | `src/lib/logExport/secrets.ts`               |
| റണ്ണർ (പാരന്റ് IPC)                 | `src/lib/logExport/runner.ts`                |
| പ്രോസസ് ജീവിതചക്രം                  | `src/lib/logExport/childRunner.ts`           |
| ചൈൽഡ് പ്രവേശനബിന്ദു                 | `src/lib/logExport/exportChild.ts`           |
| വായനയ്ക്കായി മാത്രം തുറക്കുന്ന ഘടകം | `src/lib/db/logExportReadOnly.ts`            |
| പങ്കിട്ട ക്വറി/മാപ്പിംഗ്            | `src/lib/usage/callLogExportQueries.ts`      |
| വിശദാംശ റിസോൾവർ                     | `src/lib/usage/callLogDetailResolver.ts`     |
| API പ്രൊജക്ഷൻ                       | `src/lib/logExport/presenter.ts`             |
| BigQuery ലക്ഷ്യസ്ഥാനം               | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA പ്രാമാണീകരണം              | `src/lib/logExport/googleServiceAccount.ts`  |
| കോൾ-ലോഗ് ഉറവിടം                     | `src/lib/usage/callLogExportSource.ts`       |
| സ്ഥിരസംഭരണം                         | `src/lib/db/logExportDestinations.ts`        |
| ക്രോൺ ജോബ്                          | `src/lib/jobs/logExportJob.ts`               |
| REST പാളി                           | `src/app/api/log-export/`                    |
| ഡാഷ്ബോർഡ് പേജ്                      | `src/app/(dashboard)/dashboard/log-export/`  |

സ്കീമ: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

എല്ലാ റൂട്ടുകൾക്കും മാനേജ്മെന്റ് പ്രാമാണീകരണം ആവശ്യമാണ് (`requireManagementAuth`). രഹസ്യങ്ങൾ ഒരിക്കലും തിരികെ നൽകില്ല:
സംഭരിച്ച രഹസ്യത്തിന് പകരം `__stored__` എന്ന ലിറ്ററൽ തിരികെ ലഭിക്കും; അപ്ഡേറ്റിൽ ആ മൂല്യം തിരികെ അയച്ചാൽ
സംഭരിച്ച ക്രെഡൻഷ്യൽ നിലനിർത്തും.

രഹസ്യം പ്രഖ്യാപിക്കുന്ന തരത്തിലുള്ള ലക്ഷ്യസ്ഥാനം സൃഷ്ടിക്കാനോ അപ്ഡേറ്റ് ചെയ്യാനോ **`STORAGE_ENCRYPTION_KEY`
ആവശ്യമാണ്**. അതില്ലെങ്കിൽ `encrypt()` ഒന്നും ചെയ്യാതെ ഡാറ്റ അതേപടി കടത്തിവിടും. അതിനാൽ SQLite-ൽ ക്രെഡൻഷ്യൽ
പ്ലെയിൻടെക്സ്റ്റായി സംഭരിക്കുന്നതിനുപകരം 400 നൽകി എഴുത്ത് നിരസിക്കും (Telegram webhook-ലും
ഇതേ സുരക്ഷാ പരിശോധനയാണ് പ്രയോഗിക്കുന്നത്).

| രീതി     | പാത                                      | ഉദ്ദേശ്യം                                                                       |
| -------- | ---------------------------------------- | ------------------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | ലക്ഷ്യസ്ഥാന തരങ്ങളും അവയുടെ കോൺഫിഗറേഷൻ ഫീൽഡ് പട്ടികയും                          |
| `GET`    | `/api/log-export/destinations`           | ലക്ഷ്യസ്ഥാനങ്ങൾ പട്ടികപ്പെടുത്തുക (രഹസ്യങ്ങൾ മറച്ചിരിക്കും)                     |
| `POST`   | `/api/log-export/destinations`           | ഒരു ലക്ഷ്യസ്ഥാനം സൃഷ്ടിക്കുക                                                    |
| `GET`    | `/api/log-export/destinations/{id}`      | ഒരെണ്ണം വായിക്കുക                                                               |
| `PUT`    | `/api/log-export/destinations/{id}`      | പേര് / പ്രവർത്തനക്ഷമത / കോൺഫിഗറേഷൻ / ബാച്ചിംഗ് അപ്ഡേറ്റ് ചെയ്യുക                |
| `DELETE` | `/api/log-export/destinations/{id}`      | ഇല്ലാതാക്കുക                                                                    |
| `POST`   | `/api/log-export/destinations/{id}/test` | ക്രെഡൻഷ്യലുകൾ പരിശോധിക്കുക, ഒന്നും എഴുതരുത്                                     |
| `POST`   | `/api/log-export/destinations/{id}/run`  | ശേഷിക്കുന്നവ ഇപ്പോൾ എക്സ്പോർട്ട് ചെയ്യുക, ഷെഡ്യൂൾ ചെയ്ത റണ്ണിന്റെ അതേ പാതയിലൂടെ |
| `GET`    | `/api/log-export/status`                 | ക്രോൺ നില, സമീപകാല റണ്ണുകൾ, ഓരോ ലക്ഷ്യത്തിലുമുള്ള ശേഷിക്കുന്ന ജോലികൾ            |

`GET /api/log-export/types` ആണ് UI-യെ പൊതുവായി ഉപയോഗിക്കാവുന്നതാക്കുന്നത്: തിരികെ ലഭിക്കുന്ന ഫീൽഡ് വിവരണങ്ങളിൽനിന്നാണ്
ഡാഷ്ബോർഡ് ഫോം റെൻഡർ ചെയ്യുന്നത്; അതിനാൽ പുതിയ ലക്ഷ്യസ്ഥാനത്തിനായി UI മാറ്റേണ്ടതില്ല.

---

## 4. BigQuery ലക്ഷ്യസ്ഥാനം

കോൺഫിഗറേഷൻ കീകൾ (`type: "bigquery"`):

| Key                  | Notes                                                                                                                  |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `projectId`          | ഡാറ്റാസെറ്റ് അടങ്ങിയിരിക്കുന്ന GCP പ്രോജക്റ്റ്                                                                         |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                                        |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                                        |
| `location`           | ഡാറ്റാസെറ്റ് സൃഷ്ടിക്കേണ്ടപ്പോൾ മാത്രം ഉപയോഗിക്കുന്നു (സ്ഥിരസ്ഥിതി `EU`)                                               |
| `serviceAccountJson` | Service-account കീ. രഹസ്യം: വിശ്രമാവസ്ഥയിൽ എൻക്രിപ്റ്റ് ചെയ്തിരിക്കുന്നു, ഒരിക്കലും തിരികെ നൽകില്ല                     |
| `autoCreate`         | ഇല്ലാത്ത ഡാറ്റാസെറ്റ്/ടേബിൾ സൃഷ്ടിക്കുക; nullable usage-evidence കോളങ്ങൾ നിബന്ധനാപൂർവ്വം ചേർക്കുക (സ്ഥിരസ്ഥിതി `true`) |

ലക്ഷ്യ ടേബിളിൽ service account-ന് `bigquery.tables.updateData` ആവശ്യമാണ്; കൂടാതെ
`autoCreate` ഓണായിരിക്കുമ്പോൾ `bigquery.datasets.create` / `bigquery.tables.create` ആവശ്യമാണ്.
നിലവിലുള്ള ടേബിളിലേക്ക് രണ്ട് nullable usage-evidence ഫീൽഡുകൾ ചേർക്കുന്നതിനും
`bigquery.tables.update` ആവശ്യമാണ്. ആവശ്യമായ അനുമതി ഇല്ലെങ്കിൽ export പരാജയപ്പെടുകയും അതിന്റെ
cursor മുന്നോട്ട് നീങ്ങാതിരിക്കുകയും ചെയ്യും.

കോൺഫിഗർ ചെയ്ത ഒരു batch ഒരു **cursor** unit ആണ്, HTTP unit അല്ല: `send()` അതിനെ പരമാവധി 500
വരികളുള്ള insertAll കോളുകളായി വിഭജിക്കുന്നു, അതിനാൽ വലിയ `batch_size`-ന് BigQuery-യുടെ 10 MB
request പരിധി ലംഘിക്കാനാകില്ല. താൽക്കാലിക status-ുകൾ (408/429/500/502/503/504) exponential
backoff ഉപയോഗിച്ച് പരമാവധി മൂന്ന് തവണ retry ചെയ്യുന്നു; ഓരോ തവണയും അതേ insertIds വീണ്ടും
ഉപയോഗിക്കുന്നു. auth, schema പരാജയങ്ങൾ ആദ്യ ശ്രമത്തിൽ തന്നെ throw ചെയ്യുന്നു, അതുവഴി run
വ്യർത്ഥമാകുന്നത് ഒഴിവാക്കുന്നു.

ഇപ്പോഴേ സൃഷ്ടിച്ച ഒരു ടേബിൾ streaming endpoint-ന് ഉടൻ ദൃശ്യമാകണമെന്നില്ല; കുറച്ച് സെക്കൻഡുകൾക്ക്
404 മറുപടി ലഭിക്കാം. ആ 404 വീണ്ടും ശ്രമിക്കും, എന്നാൽ **ഈ run തന്നെയാണ് ടേബിൾ സൃഷ്ടിച്ചതെങ്കിൽ
മാത്രം** — യഥാർത്ഥത്തിൽ ഇല്ലാത്ത ടേബിൾ ഉടൻ തന്നെ പരാജയപ്പെടും. അടുത്തിടെ deleted ചെയ്ത ടേബിളിന്റെ
അതേ പേരിൽ വീണ്ടും ടേബിൾ സൃഷ്ടിക്കുമ്പോൾ BigQuery streaming inserts-നെ കുറച്ച് മിനിറ്റുകൾ
നിരസിച്ചേക്കുമെന്നത് ശ്രദ്ധിക്കുക; ഇത് delete-then-recreate-ന്റെ സ്വഭാവമാണ്. അതിനാൽ ഒരു ടേബിൾ
drop ചെയ്ത് വീണ്ടും ചേർക്കുന്നതിനേക്കാൾ പുതിയ ടേബിൾ പേര് ഉപയോഗിക്കുന്നതാണ് ഉചിതം.

**ഭാഗിക പരാജയം, ശൂന്യമല്ലാത്ത `insertErrors[]` സഹിതമുള്ള HTTP 200 ആയി എത്തുന്നു.** ഇത്
പരാജയമായി കണക്കാക്കി throw ചെയ്യുന്നു. BigQuery സ്വീകരിക്കാത്ത വരികൾ കടന്ന് cursor മുന്നേറുന്നത്
ഇതാണ് തടയുന്നത്; `tests/unit/log-export-bigquery.test.ts` ഈ പെരുമാറ്റം ഉറപ്പാക്കുന്നു.

Transport സാധാരണ REST ആണ് — self-signed RS256 assertion കൈമാറി
`https://oauth2.googleapis.com/token`-ൽ നിന്ന് access token നേടുന്നു, തുടർന്ന് വരികൾ
`tabledata.insertAll`-ലേക്ക് അയയ്ക്കുന്നു. Google SDK ഒന്നും ഉൾപ്പെടുത്തുന്നില്ല. Access token-ുകൾ
(service account, scope) ജോഡിക്കനുസരിച്ച് process-ിനുള്ളിൽ cache ചെയ്യുന്നു.

സൃഷ്ടിക്കുന്ന ടേബിളിൽ Logs-tab-ലെ ഓരോ ഫീൽഡിനും ഒരു column കൂടാതെ `exported_at`-ഉം ഉണ്ടായിരിക്കും,
കൂടാതെ call logs യഥാർത്ഥത്തിൽ എങ്ങനെ query ചെയ്യപ്പെടുന്നു എന്നതിനനുസരിച്ചാണ് അതിന്റെ രൂപകൽപ്പന:

- **`timestamp` അടിസ്ഥാനമാക്കി day-partitioned**, അതിനാൽ തീയതി പരിധിയുള്ള query ആ ദിവസങ്ങൾ
  മാത്രം scan ചെയ്യും.
- **`api_key_name`, `provider`, `model`, `status` ഉപയോഗിച്ച് clustered** (ഈ ക്രമത്തിൽ), അതിനാൽ
  ആരാണ് ഇത് പ്രവർത്തിപ്പിച്ചതെന്നോ എവിടേക്കാണ് അയച്ചതെന്നോ പരാജയപ്പെട്ടോ എന്നതനുസരിച്ചുള്ള
  filtering ഓരോ partition-ലുമുള്ള blocks prune ചെയ്യും. BigQuery പരമാവധി നാല് clustering
  columns അനുവദിക്കുന്നു, ക്രമം പ്രധാനമാണ്: `api_key_name` മാത്രം ഉപയോഗിച്ചുള്ള filter prune
  ചെയ്യും, `status` മാത്രം ഉപയോഗിച്ചുള്ള filter ചെയ്യില്ല.
- **`partitionExpirationDays` ഉപയോഗിച്ചുള്ള optional partition retention** (0 ആണെങ്കിൽ എല്ലാം
  നിലനിർത്തും), ടേബിൾ സൃഷ്ടിക്കുമ്പോൾ പ്രയോഗിക്കുന്നു.

രണ്ട് ക്രമീകരണങ്ങളും സൃഷ്ടിക്കുന്ന സമയത്താണ് പ്രയോഗിക്കുന്നത്. നിലവിലുള്ള ടേബിൾ അതിനകം ഉള്ള layout
തന്നെ നിലനിർത്തും; അതിനാൽ ഇവ സ്വീകരിക്കണമെങ്കിൽ destination-നെ പുതിയ table id-യിലേക്ക് ചൂണ്ടുക.

`tests/unit/log-export-bigquery.test.ts` mapper-വും table schema-യും പരസ്പരം
lockstep-ൽ തന്നെയാണെന്ന് ഉറപ്പാക്കുന്നു; അതിനാൽ പുതിയ call-log column പുറത്തേക്ക് പോകുന്ന വഴിയിൽ
നിശ്ശബ്ദമായി ഉപേക്ഷിക്കപ്പെടില്ല.

Batches **row count-നും serialised bytes-നും** അനുസരിച്ച് ഒരേസമയം chunk ചെയ്യുന്നു. Payload-ുകൾ
export ചെയ്യുമ്പോൾ row count മാത്രം മതിയാകില്ല: prompts വഹിക്കുന്ന 500 വരികൾക്ക് പതിനായിരക്കണക്കിന്
മെഗാബൈറ്റുകൾ വരാം, കൂടാതെ 10 MB-ൽ കൂടുതലുള്ള request-ുകൾ insertAll നിരസിക്കും. 500 വരികളോ
9 MB-യോ, ഏതാണ് ആദ്യം എത്തുന്നത് അതിൽ chunks അവസാനിക്കും.

---

## 5. OTLP/HTTP ട്രേസുകളുടെ ലക്ഷ്യസ്ഥാനം

കോൺഫിഗറേഷൻ `type: "otlp-http"` ഉപയോഗിക്കുന്നു. ഇത് സ്ഥിരപ്പെടുത്തിയ കോൾ ലോഗുകളുടെ ഷെഡ്യൂൾ ചെയ്ത, കർസർ-പിന്തുണയുള്ള എക്സ്പോർട്ടാണ്; `open-sse/services/routing/otel.ts`-ലുള്ള മികച്ച ശ്രമം മാത്രം നടത്തുന്ന ലൈവ് റൂട്ടിംഗ്-ഇവന്റ് സിങ്ക് അല്ല. ഇത് ആ സിങ്കിന്റെ പരിസ്ഥിതി വേരിയബിളുകളോ ടൈമറുകളോ ബഫറുകളോ വായിക്കുകയോ മാറ്റുകയോ ചെയ്യുന്നില്ല. രണ്ടും പ്രവർത്തനക്ഷമമാക്കിയാൽ സ്വതന്ത്രമായ രണ്ട് തരത്തിലുള്ള സ്പാനുകൾ സൃഷ്ടിക്കപ്പെടാം; ഈ കോൾ-ലോഗ് സ്പാനുകളെ വേർതിരിച്ചറിയാൻ `omniroute.log-export` ഇൻസ്ട്രുമെന്റേഷൻ സ്കോപ്പ് ഉപയോഗിക്കുക.

| Key                      | Default / purpose                                                                             |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| `endpoint`               | ആവശ്യമായ പൂർണ്ണ HTTP(S) ട്രേസസ് URL; `/v1/traces` സഫിക്സ് ചേർക്കില്ല                          |
| `headers`                | ഐച്ഛികമായ `Name: value` വരികൾ അല്ലെങ്കിൽ സ്ട്രിംഗുകളുടെ JSON ഒബ്ജക്റ്റ്; എൻക്രിപ്റ്റ് ചെയ്തത് |
| `requestHeaderAllowlist` | ശൂന്യം (ഓഫ്); സ്പാൻ ആട്രിബ്യൂട്ടുകളായി ക്യാപ്ചർ ചെയ്യേണ്ട ക്ലയന്റ് ഹെഡർ പേരുകൾ/പ്രിഫിക്സുകൾ   |
| `serviceName`            | `omniroute`; റിസോഴ്സ് `service.name`                                                          |
| `langfuseMapping`        | `false`; Langfuse generation/session/user ആട്രിബ്യൂട്ടുകൾ ചേർക്കുന്നു                         |
| `identity`               | `pseudonymous`, `keyName`, അല്ലെങ്കിൽ `none`                                                  |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                                       |
| `timeoutMs`              | ഓരോ HTTP ശ്രമത്തിനും `30000`                                                                  |
| `environment`            | സജ്ജീകരിച്ചിട്ടില്ല; ഐച്ഛികമായ `langfuse.environment`                                         |

ജനറിക് ഡാഷ്ബോർഡ് ഈ ഫീൽഡുകൾ റെൻഡർ ചെയ്യുന്നു. `paths` ഒരു API അറേയോ, കൃത്യമായ പാതകൾ ന്യൂലൈൻ/കോമ ഉപയോഗിച്ച് വേർതിരിച്ചുള്ള ടെക്സ്റ്റ് ഏരിയയോ സ്വീകരിക്കുന്നു. Embeddings, rerank, മറ്റ് പാതകൾ എന്നിവ വ്യക്തമായി അനുവദിച്ചിട്ടില്ലെങ്കിൽ ഒഴിവാക്കപ്പെടും. ഒഴിവാക്കിയ വരികളും കർസറിനെ മുന്നോട്ടു നീക്കും; നിലവിലുള്ള റണ്ണറിലെ `exported`/`exportedTotal` കൗണ്ടറുകൾ സ്വീകരിച്ച സ്പാനുകളല്ല, ഫിൽട്ടർ ചെയ്ത വരികൾ ഉൾപ്പെടെയുള്ള പ്രോസസ്സ് ചെയ്ത സോഴ്സ് വരികളെയാണ് എണ്ണുന്നത്. ഫിൽട്ടറിംഗ് ചൈൽഡിലാണ് നടക്കുന്നത്; അതിന്റെ IPC/കർസർ കോൺട്രാക്ടിൽ മാറ്റമില്ല.

URL സാധൂകരണം DB-രഹിതമായ `src/shared/network/outboundUrlGuard.ts`-ലുള്ള `parseAndValidateNonMetadataUrl` ഹെൽപ്പർ ഉപയോഗിക്കുന്നു: `block-metadata` പോളിസി. വെബ്ഹുക്ക് വാലിഡേറ്ററിലേതുപോലെ മെറ്റാഡാറ്റ/പ്രോട്ടോക്കോൾ/എംബെഡഡ്-ക്രെഡൻഷ്യൽ പരിശോധനകൾ നിബന്ധനയില്ലാതെ നടത്തുന്നു; സ്വകാര്യ URL-കൾ അനുവദിച്ചിരിക്കുന്നുവെങ്കിലും, ഗ്ലോബൽ ഫീച്ചർ-ഫ്ലാഗ് ഓവർറൈഡ് ഇല്ലാതെ localhost/LAN ലക്ഷ്യസ്ഥാനങ്ങൾ അനുവദിക്കുന്നു. ഇതുവഴി സ്വകാര്യ HTTP എൻഡ്പോയിന്റുകൾ ഉൾപ്പെടെ self-hosted Langfuse, Phoenix, Tempo, Collector എൻഡ്പോയിന്റുകൾ ഉപയോഗിക്കാം. ക്ലൗഡ്-മെറ്റാഡാറ്റ ഹോസ്റ്റുകൾ എല്ലായ്പ്പോഴും ബ്ലോക്ക് ചെയ്യപ്പെടും. റീഡയറക്ടുകൾ പിന്തുടരുന്നില്ല; അതിനാൽ ഒരു കളക്ടറിന് ക്രെഡൻഷ്യലുകൾ മറ്റൊരു ഹോസ്റ്റിലേക്ക് റീഡയറക്ട് ചെയ്യാനാകില്ല. നിലവിലുള്ള ലെക്സിക്കൽ URL ഗാർഡിനെപ്പോലെ, ഇത് DNS റെസല്യൂഷൻ പിൻ ചെയ്യുന്നില്ല; ഓപ്പറേറ്റർ നിയന്ത്രിക്കുന്ന ഹോസ്റ്റുകൾ മാത്രം കോൺഫിഗർ ചെയ്യുക. എൻഡ്പോയിന്റ് വിശ്വസനീയമായ നെറ്റ്വർക്കിലല്ലെങ്കിൽ HTTPS-ന് മുൻഗണന നൽകുക.

### പേലോഡും ഡെലിവറിയും

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) അനുവദിച്ച ഓരോ വരിക്കും ഒരു CLIENT സ്പാൻ വഹിക്കുന്നു; അതിന്റെ പേര് കൃത്യമായ അഭ്യർത്ഥനാ പാതയെ അടിസ്ഥാനമാക്കിയതാണ്. പാതയുടെ പേരിടൽ Chat Completions, Responses, Messages എന്നിവയെ വേർതിരിക്കുന്നു; സ്പാൻ പേരിൽ മോഡലോ ഐഡന്റിറ്റി ഡാറ്റയോ ഉൾപ്പെടുത്തുന്നില്ല. റിസോഴ്സ് ആട്രിബ്യൂട്ടുകളിൽ `service.name`-ഉം പാക്കേജിന്റെ `service.version`-ഉം ഉൾപ്പെടുന്നു.

സാധാരണ chat attempt logger (`open-sse/handlers/chatCore/attemptLogging.ts`) പൂർത്തിയാകുമ്പോൾ `duration = Date.now() - startTime` എഴുതുന്നു; ടൈംസ്റ്റാമ്പ് നൽകുന്നില്ല. `src/lib/usage/callLogs.ts`-ലെ `saveCallLogOperation` ടൈംസ്റ്റാമ്പ് ഡിഫോൾട്ടായി റൈറ്റിംഗ് സമയത്തേക്ക് (പൂർത്തീകരണ സമയം) സജ്ജീകരിക്കുന്നു. അതിനാൽ എക്സ്പോർട്ട് end = row timestamp, start = end − duration എന്ന രീതിയിൽ സജ്ജീകരിക്കുന്നു; ഇവിടെ duration മില്ലിസെക്കൻഡിൽ നിന്ന് ദശാംശ നാനോസെക്കൻഡുകളിലേക്ക് പരിവർത്തനം ചെയ്യുന്നു. കോളർ നൽകിയ ചരിത്ര ടൈംസ്റ്റാമ്പുകളും end time ആയി സംരക്ഷിക്കുന്നു; ഓരോ വരിയിലും start/completion വേർതിരിക്കുന്ന സൂചകം ഇല്ല. null duration പൂജ്യമായി മാറും. അസാധുവായതോ കാണാതായതോ ആയ ടൈംസ്റ്റാമ്പുകൾ ബാച്ച് പരാജയപ്പെടുത്തും; നിർണ്ണയിക്കാനാകാത്ത സ്പാനുകൾ സൃഷ്ടിക്കില്ല. `ttftMs` nullable ആണ്, കൂടാതെ `omniroute.ttft_ms`-ലേക്ക് മാപ്പ് ചെയ്യപ്പെടുന്നു.

ആട്രിബ്യൂട്ടുകളിൽ `gen_ai.operation.name="chat"`, provider, requested/response model, input/output tokens, ഐച്ഛിക cache-read/cache-creation/reasoning tokens, HTTP status, combo, cache source, session tag, correlation id എന്നിവ ഉൾപ്പെടുന്നു. Integer OTLP മൂല്യങ്ങളും ടൈംസ്റ്റാമ്പുകളും ദശാംശ സ്ട്രിംഗുകളാണ്; സ്ട്രിംഗുകൾ, ബൂളിയനുകൾ, fractional numbers എന്നിവ അവയുടെ നേറ്റീവ് OTLP value variants ഉപയോഗിക്കുന്നു. പിശക് സ്പാനുകൾക്ക് ERROR സ്റ്റാറ്റസും ശുദ്ധീകരിച്ച status message-ഉം ഉണ്ടായിരിക്കും. കാനോണിക്കൽ റെക്കോർഡിൽ upstream host URL ഇല്ലാത്തതിനാൽ, `server.address` ഒഴിവാക്കുന്നു; അല്ലാത്തപക്ഷം കളക്ടറിനെ മോഡൽ സെർവറായി തെറ്റായി തിരിച്ചറിയും. Cost എക്സ്പോർട്ട് ചെയ്യുന്നില്ല.

`includeBodies=true` ആയാൽ മാത്രമേ ഉള്ളടക്കം hydrate ചെയ്യൂ. `langfuseMapping=false` ആയിരിക്കുമ്പോൾ, OmniRoute സംഭരിച്ചിരിക്കുന്ന sanitized request/response body JSON ആണ് `gen_ai.input.messages` / `gen_ai.output.messages` വഹിക്കുന്നത് (parse ചെയ്യാനാകുമ്പോൾ canonicalize ചെയ്ത രൂപത്തിൽ); പുനർരൂപകൽപ്പന ചെയ്ത semconv messages array അല്ല. Clipped/non-JSON bodies raw text ആയി തുടരും. `langfuseMapping=true` ആയിരിക്കുമ്പോൾ, bodies `langfuse.observation.input` / `langfuse.observation.output` എന്ന നിലയിൽ മാത്രം പുറപ്പെടുവിക്കും; ഓരോ bodyയും ഒരിക്കൽ മാത്രം അയയ്ക്കുന്നതിനായി `gen_ai.*.messages` ആട്രിബ്യൂട്ടുകൾ ഒഴിവാക്കും. രണ്ട് മോഡുകളും നിലവിലുള്ള hydration path-ൽ നിന്നുള്ള `maxBodyBytes` പാരമ്പര്യമായി സ്വീകരിക്കുന്നു; clipping സൂചിപ്പിക്കാൻ `omniroute.bodies_truncated=true` ഉപയോഗിക്കുന്നു. ഈ ലക്ഷ്യസ്ഥാനം അധിക pipeline snapshots-ുകളോ unsanitized artifact reads-ുകളോ ചേർക്കുന്നില്ല; ഐച്ഛിക request-header capture താഴെ വിവരിച്ചിരിക്കുന്ന നിലവിലുള്ള hydrated client snapshot ഉപയോഗിക്കുന്നു. bodies എക്സ്പോർട്ട് ചെയ്യുമ്പോൾ മണിക്കൂറുകൾ നീളുന്ന backlog ശേഖരിക്കുന്നതിന് പകരം `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` പോലുള്ള minute-level cadence ഉപയോഗിക്കുക.

### ഐച്ഛിക ക്ലയന്റ് അഭ്യർത്ഥനാ ഹെഡറുകൾ

Header capture **ഡിഫോൾട്ടായി ഓഫാണ്**. destination config-ൽ `requestHeaderAllowlist` സജ്ജീകരിക്കുകയും **Export prompts and responses** പ്രവർത്തനക്ഷമമാക്കുകയും ചെയ്യുക (destination-ൽ `includeBodies: true`).

അനുവദനപ്പട്ടിക ഒരു API അറേയോ, ന്യൂലൈൻ/കോമ ഉപയോഗിച്ച് വേർതിരിച്ച പേരുകളുള്ള ടെക്സ്റ്റ് ഏരിയയോ സ്വീകരിക്കുന്നു:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

പേരുകൾ കേസ് പരിഗണിക്കാതെയും കൃത്യമായും പൊരുത്തപ്പെടുന്നു; എന്നാൽ അവസാനത്തുള്ള ഒറ്റ `*` ഒരു ശൂന്യമല്ലാത്ത
header-name പ്രിഫിക്സ് തിരഞ്ഞെടുക്കുന്നുവെങ്കിൽ അതിന് വ്യത്യാസമുണ്ട്. ഒറ്റപ്പെട്ട `*`, ഉൾച്ചേർത്ത
വൈൽഡ്കാർഡുകൾ, അസാധുവായ HTTP header പേരുകൾ എന്നിവ നിരസിക്കപ്പെടും.
പരമാവധി 64 സെലക്ടറുകൾ മാത്രമേ ഉണ്ടായിരിക്കൂ; ഓരോന്നിന്റെയും പേരിനോ പ്രിഫിക്സിനോ പരമാവധി
256 ASCII ബൈറ്റുകൾ ആയിരിക്കും. ഈ ക്രമീകരണം `headers`-ൽ നിന്ന് വേറിട്ടതാണ്; `headers` exporter-നെ collector-ലേക്ക്
ആധികാരികമാക്കുന്നതിനുള്ളതാണ്.

Capture വായിക്കുന്നത് `pipeline_client_request`-ൽ നിന്നുമാത്രമാണ്; ഇത് സംരക്ഷിച്ച വിശദമായ pipeline-യിലെ
`clientRawRequest` (അല്ലെങ്കിൽ legacy `clientRequest`) ഉപയോഗിച്ച് പൂരിപ്പിക്കപ്പെടുന്നു. ഇത് provider request headers-ലേക്ക്
ഒരിക്കലും fallback ചെയ്യില്ല. Request രേഖപ്പെടുത്തിയ സമയത്ത് detailed pipeline logging പ്രവർത്തനക്ഷമമായിരിക്കണം.
`includeBodies` പ്രവർത്തനരഹിതമായിരിക്കുകയോ, client-snapshot JSON കാണാതിരിക്കുകയോ, കേടായിരിക്കുകയോ, clipped ആയിരിക്കുകയോ ചെയ്താൽ
header attributes ഒന്നും പുറപ്പെടുവിക്കില്ല. `maxBodyBytes` വർധിപ്പിക്കുന്നത് export സമയത്തെ snapshot clipping ഒഴിവാക്കാൻ സഹായിക്കും;
ഒരിക്കലും സംരക്ഷിക്കപ്പെടാത്ത വിശദാംശങ്ങൾ ഇത് പുനഃസ്ഥാപിക്കില്ല. 1 MiB-ൽ കൂടുതലുള്ളതോ 256-ൽ കൂടുതൽ header entries ഉള്ളതോ ആയ
snapshot അവഗണിക്കപ്പെടും. നിലവിലുള്ള prompt/response export header capture-നൊപ്പം തുടർന്നും പ്രവർത്തിക്കും; allowlist headers-only hydration mode നൽകുന്നില്ല.

തിരഞ്ഞെടുത്ത മൂല്യങ്ങൾ `http.request.header.<full lowercase header name>` OTLP string arrays ആയി മാറും;
ഒറ്റ string ആയാലും അതേ രീതിയിൽ. ഉദാഹരണത്തിന്, `X-OmniRoute-Meta-Team: example-team` എന്നത്
`http.request.header.x-omniroute-meta-team` ആയി മാറുകയും
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}` ലഭിക്കുകയും ചെയ്യും.
പൂർണ്ണ പ്രിഫിക്സ് സംരക്ഷിക്കപ്പെടുന്നു: ഇവ സാധാരണ headers ആണ്; business-field parsing അല്ലെങ്കിൽ
`omniroute.metadata.*` / Langfuse metadata conversion ഒന്നും ഉണ്ടാകില്ല. `langfuseMapping` header semantics മാറ്റില്ല.
തിരഞ്ഞെടുത്ത single-valued `User-Agent` സാധാരണ scalar ആയ `user_agent.original`-വും സജ്ജമാക്കും. ഒരു മൂല്യത്തിനുള്ളിലെ commas വിഭജിക്കില്ല.
Case variants സംരക്ഷിച്ച entry order-ൽ merge ചെയ്യും; ഏതെങ്കിലും invalid variant ഉണ്ടായാൽ ആ മുഴുവൻ header ഒഴിവാക്കപ്പെടും.
Attributes lowercase name അനുസരിച്ച് ക്രമീകരിക്കപ്പെടും.

Authorization, Proxy-Authorization, Cookie, Set-Cookie, API-key headers, auth/token/secret/password/credential markers
ഉൾക്കൊള്ളുന്ന പേരുകൾ, internal gateway credentials എന്നിവ തിരഞ്ഞെടുക്കപ്പെട്ടതായാലും storage-ൽ ഭാഗികമായി mask ചെയ്തതായാലും
എപ്പോഴും ഒഴിവാക്കപ്പെടും. അറിയപ്പെടുന്ന credential patterns shared credential detector വീണ്ടും ഉപയോഗിക്കും; redaction markers സുരക്ഷിതമായ
മൂല്യങ്ങളായി export ചെയ്യാതെ ഒഴിവാക്കപ്പെടും. Strings-യും ശൂന്യമല്ലാത്ത string arrays-യും മാത്രമേ സ്വീകരിക്കൂ; numbers അല്ലെങ്കിൽ objects
coerce ചെയ്യില്ല. Invalid names, prototype keys, control characters (horizontal tab ഒഴികെ), malformed Unicode എന്നിവ batch പരാജയപ്പെടുത്താതെയും
അവയുടെ ഉള്ളടക്കം errors-ൽ പ്രതിഫലിപ്പിക്കാതെയും അവഗണിക്കപ്പെടും.

ഓരോ span-വും പരമാവധി 32 headers, ഓരോ header-നും 16 values, ഓരോ value-ക്കും 4096 UTF-8 bytes,
capture ചെയ്ത header പേരുകളിലും values-ലുമായി ആകെ 16384 UTF-8 bytes എന്നിവ മാത്രമേ ഉൾക്കൊള്ളൂ. വലുപ്പം കൂടിയതോ അസാധുവായതോ ആയ headers
മുഴുവനായും ഒഴിവാക്കപ്പെടും; clipped ചെയ്യില്ല. Selection ഒരു operator privacy തീരുമാനമാണ്: സുരക്ഷിതമായി തോന്നുന്ന പേരുകളിലും വ്യക്തിഗത ഡാറ്റ
ഉണ്ടാകാം; ഈ പരിധികളും detectors-ഉം പൊതുവായ PII scrubber അല്ല.

### Delivery limits

Requests 500 spans-ലേക്കും envelope ഉൾപ്പെടെ 4 MiB UTF-8 JSON-ലേക്കും പരിമിതപ്പെടുത്തിയിരിക്കുന്നു.
ഒരു cursor batch-ന്റെ ആദ്യ request-ന് മുമ്പ് അനുവദിച്ച ഓരോ span-ന്റെയും വലുപ്പം പരിശോധിക്കും. പരിധിയേക്കാൾ വലുതായ ഒരു
individual span batch-ന്റെ ഏതെങ്കിലും ഭാഗവും അയയ്ക്കാതെ, `maxBodyBytes` കുറയ്ക്കാനുള്ള നിർദ്ദേശത്തോടെ പരാജയപ്പെടും;
അത് നിശ്ശബ്ദമായി ഒഴിവാക്കില്ല. Preflight record references-ഉം byte counts-ഉം മാത്രം നിലനിർത്തി ഓരോ താൽക്കാലിക span/JSON-ഉം
discard ചെയ്യും; batch-ന്റെ രണ്ടാമത്തെ serialized copy കൈവശം വയ്ക്കുന്നതിനുപകരം bounded chunks-നായി spans പുനർനിർമിക്കും.
HTTP 408/429/5xx, network failures, timeouts എന്നിവയ്ക്ക് പരമാവധി
മൂന്ന് attempts ലഭിക്കും; 250/500 ms exponential backoff ഉപയോഗിക്കും. `Retry-After` seconds അല്ലെങ്കിൽ HTTP dates
delay പരമാവധി 5 seconds വരെ നീട്ടാം. മറ്റ് statuses ഉടൻ പരാജയപ്പെടും. OTLP 2xx partial rejection-വും നഷ്ടപ്പെട്ട span-നെ
acknowledge ചെയ്യുന്നതിനുപകരം throw ചെയ്യും; ശൂന്യമായതോ സാധുവായ JSON acknowledgements-ഓ സ്വീകരിക്കും, എന്നാൽ
response-read cap 64 KiB ആയിരിക്കും.

Errors-ൽ exporter സ്വന്തമായ facts മാത്രമേ ഉണ്ടാകൂ: HTTP status, retry class, attempts, sent span
counts, അല്ലെങ്കിൽ fixed acknowledgement/network failure wording. Collector response bodies,
partial-success counts, response headers എന്നിവ errors, logs, dashboard എന്നിവയിലേക്ക് ഒരിക്കലും പകർത്തില്ല.
പരാജയപ്പെട്ടതോ ഭാഗികമായി സ്വീകരിക്കപ്പെട്ടതോ ആയ batch acknowledge ചെയ്യില്ല: destination ആ status-ോടെ Failing എന്ന് കാണിക്കും,
cursor അവസാനമായി acknowledged ചെയ്ത batch-ൽ തന്നെ തുടരും, അടുത്ത run അതേ rows വീണ്ടും അയയ്ക്കും. Permanent statuses collector അല്ലെങ്കിൽ
configuration പരിഹരിക്കുന്നതുവരെ failing ആയി തുടരും. Response details-നായി collector-ന്റെ സ്വന്തം logs ഉപയോഗിക്കുക.
Call-log error summaries-ന് അവയുടെ പ്രത്യേക redaction തുടരും.
`prepare()` ഒന്നും provision ചെയ്യില്ല; Test കൃത്യമായി `{"resourceSpans":[]}` post ചെയ്യുകയും call-log spans എഴുതാതെ
HTTP status റിപ്പോർട്ട് ചെയ്യുകയും ചെയ്യും.

Trace ids, span ids എന്നിവ SHA-256-ന്റെ ആദ്യ 32/16 hex digits ആണ്; യഥാക്രമം
`"omniroute.trace\\0" + callLogId`, `"omniroute.span\\0" + callLogId` എന്നിവയ്ക്ക് മുകളിൽ hash ചെയ്തതാണ്.
Re-sends ഒരേ ids വഹിക്കും. ഇത് deduplication guarantee അല്ല: Langfuse v4 ingestion ഉൾപ്പെടെയുള്ള ചില backends ഒരേ-id spans deduplicate ചെയ്യില്ല.
ഒരു crash അല്ലെങ്കിൽ partial chunk failure പരമാവധി acknowledge ചെയ്യാത്ത ഒറ്റ cursor batch വീണ്ടും അയയ്ക്കാൻ ഇടയാക്കും;
അവസാന HTTP chunk മാത്രം അല്ല, ആ മുഴുവൻ batch-വും duplicate ആകാം. ഈ tradeoff പരിഗണിച്ച് cursor batch size തിരഞ്ഞെടുക്കുക.

### Langfuse example

Self-hosted Langfuse instance-നായി ഈ fields ക്രമീകരിക്കുക:

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

Authorization value പ്രാദേശികമായി literal `public-key:secret-key` string-ന്റെ Base64 ആയി നിർമ്മിക്കുക
(ഉദാഹരണത്തിന് `Buffer.from(publicKey + ":" + secretKey).toString("base64")` ഉപയോഗിച്ച്).
യഥാർത്ഥ credentials logs, screenshots അല്ലെങ്കിൽ issues-ൽ paste ചെയ്യരുത്. Mapping സ്വയമേവ
`x-langfuse-ingestion-version: 4` സജ്ജമാക്കും; Authorization ഇപ്പോഴും `headers`-ൽ നൽകണം.
Headers-ഉം generated identity salt-ഉം നിലവിലുള്ള encrypted secret-field mechanism-ഉം API placeholders-ഉം ഉപയോഗിക്കുന്നു;
`STORAGE_ENCRYPTION_KEY` ആവശ്യമാണ്.

മാപ്പിംഗ് generation type/model, JSON usage വിശദാംശങ്ങൾ (input/output/total, ലഭ്യമായ
cache keys), JSON input/output snapshots, ERROR/DEFAULT level, sanitized status message,
trace name, session id, ഐച്ഛികമായ environment, കൂടാതെ provider, requested model, path, combo, cache
source, status എന്നിവയ്ക്കായി filter ചെയ്യാവുന്ന
`langfuse.observation.metadata.<key>` എന്നിവ ചേർക്കുന്നു. `langfuse.observation.completion_start_time` ആരംഭസമയത്തിലെ ISO 8601 മൂല്യവും
TTFT അറിയാവുന്നതും duration-നുള്ളിലുമാണെങ്കിൽ മാത്രം TTFT-യും ഉൾക്കൊള്ളുന്നു. Cost attributes അയയ്ക്കുന്നില്ല.

Identity modes `langfuse.user.id`-നാണ് ബാധകം:

- `pseudonymous` (default): API key-യുടെ internal id-ന്റെ HMAC-SHA256, ഓരോ destination-നും random ആയി
  സൃഷ്ടിക്കുന്ന 32-byte salt ഉപയോഗിച്ച്. Salt ഇല്ലെങ്കിൽ creation സമയത്ത് സൃഷ്ടിക്കുകയും,
  `identitySalt` ആയി encrypt ചെയ്യുകയും, ഒരിക്കലും തിരികെ നൽകാതിരിക്കുകയും, edits സമയത്ത് നിലനിർത്തുകയും ചെയ്യുന്നു.
  Raw key ids span attributes-ലേക്ക് ഒരിക്കലും ചേർക്കുന്നില്ല. ഒരു destination-ന്റെ salt വീണ്ടും സൃഷ്ടിക്കുകയോ
  rotate ചെയ്യുകയോ ചെയ്താൽ identities മാറും.
- `keyName`: configured API key name, ആ operator label ഉദ്ദേശപൂർവ്വം വെളിപ്പെടുത്തുന്നു.
- `none`: user id ഇല്ല. ലഭ്യമായിരിക്കുമ്പോൾ session tags ഇപ്പോഴും export ചെയ്യും; ഈ modes
  arbitrary prompt content-നെയോ operator നൽകിയ session/correlation labels-നെയോ anonymize ചെയ്യുന്നില്ല.

### Backfill ഇല്ലാതെ ആരംഭിക്കൽ

Creation സമയത്ത് മാത്രം **നിലവിലെ സ്ഥാനത്തുനിന്ന് ആരംഭിക്കുക (നിലവിലുള്ള logs ഒഴിവാക്കുക)** enable ചെയ്യുക, അല്ലെങ്കിൽ
create API payload-ന്റെ top level-ൽ `startFromCurrentPosition: true` നൽകുക. നിലവിലുള്ള cursor
helpers ഉപയോഗിച്ച്, migration ഇല്ലാതെ, നിലവിൽ retained ആയിരിക്കുന്ന call-log rowid-യുടെ പരമാവധി മൂല്യത്തിലേക്ക്
`cursor_row_id` initialize ചെയ്യുന്നു. Default false ആണ് (cursor 0, retained-history backfill).
ഇത് update സമയത്തെ cursor reset setting അല്ല.

Shared `ttftMs` addition BigQuery mapper-ലേക്കും new-table schema-യിലേക്കും nullable ആയ
`ttft_ms` column ചേർക്കുന്നു: ഓരോ canonical record field-നും ഒരു column ഉണ്ടായിരിക്കണമെന്ന് അതിന്റെ
schema test ആവശ്യപ്പെടുന്നു. Existing tables മാറ്റമില്ലാതെ export ചെയ്യുന്നത് തുടരും: `prepare()` table schema
വായിച്ച് ആ column ഇല്ലെങ്കിൽ `ttft_ms` മാത്രം ഒഴിവാക്കുന്നു. അടുത്ത run-ൽ TTFT ലഭിക്കാൻ nullable INT64 column
ചേർക്കുക, അല്ലെങ്കിൽ new table ഉപയോഗിക്കുക. Optional TTFT column schema update trigger ചെയ്യില്ല. Usage-evidence columns
താഴെപ്പറയുന്ന conditional, opt-in compatibility flow പിന്തുടരുന്നു; മറ്റ് row fields strict
schema checking നിലനിർത്തുന്നു.

---

## 6. ഒരു ഡെസ്റ്റിനേഷൻ ചേർക്കൽ

1. ഒരു `LogExportDestinationType` എക്സ്പോർട്ട് ചെയ്യുന്ന `src/lib/logExport/destinations/<name>.ts` സൃഷ്ടിക്കുക:
   ഒരു Zod `configSchema`, UI-ക്കായുള്ള ഒരു `fields` ഡിസ്ക്രിപ്റ്റർ അറേ, `secretFields`, കൂടാതെ
   `test()` / `prepare()` / `send(records)` തിരികെ നൽകുന്ന ഒരു `createClient(config)`.
2. അത് `src/lib/logExport/registry.ts`-ലെ `DESTINATIONS` അറേയിലേക്ക് ചേർക്കുക.
3. `tests/unit/`-ൽ ടെസ്റ്റുകൾ എഴുതുക.

ഇത്രയും മാത്രമാണ് മാറ്റം: പെർസിസ്റ്റൻസ്, cron ജോബ്, REST ലെയർ, രഹസ്യവിവരങ്ങളുടെ എൻക്രിപ്ഷൻ,
ഡാഷ്ബോർഡ് ഫോം എന്നിവയെല്ലാം രജിസ്ട്രിയിൽ നിന്നാണ് വായിക്കുന്നത്.

പുതിയ ഡെസ്റ്റിനേഷനുള്ള രണ്ട് നിയമങ്ങൾ:

- ഭാഗിക പരാജയമുണ്ടാകുമ്പോൾ `send()` **നിർബന്ധമായും എക്സെപ്ഷൻ ത്രോ ചെയ്യണം**. വിജയകരമായി പൂർത്തിയാകുന്നത് "ഡെസ്റ്റിനേഷനിൽ ഈ വരികൾ ഉണ്ട്" എന്നാണ് അർത്ഥമാക്കുന്നത്,
  തുടർന്ന് കർസർ അവയെ ശാശ്വതമായി കടന്നുപോകുന്നു.
- ഉപയോക്താവ് നൽകുന്ന URL സ്വീകരിക്കുന്ന ഡെസ്റ്റിനേഷൻ, ഫെച്ച് ചെയ്യുന്നതിനു മുമ്പ്
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) വഴി അത് സാധൂകരിക്കണം,
  വെബ്ഹുക്കുകൾ ചെയ്യുന്നതുപോലെതന്നെ. BigQuery-ക്ക് ഇത് ആവശ്യമില്ല: അതിന്റെ ഹോസ്റ്റുകൾ സ്ഥിരാങ്കങ്ങളാണ്.

---

## 7. ഇത് പ്രവർത്തിപ്പിക്കൽ

- **ഡാഷ്ബോർഡ്**: Integrations → Log export. ഒരു ലക്ഷ്യസ്ഥാനം ചേർക്കുക, ക്രെഡൻഷ്യലുകൾ പരിശോധിക്കാൻ **Test** പ്രവർത്തിപ്പിക്കുക
  വരികൾ എഴുതാതെ, തുടർന്ന് അത് പ്രവർത്തനക്ഷമമാക്കുക.
- **ബാക്ക്ലോഗ്**: ഓരോ ലക്ഷ്യസ്ഥാന കാർഡിലും കാത്തിരിക്കുന്ന വരികളും കർസറും കാണിക്കും; `GET
/api/log-export/status` ഇതേ കണക്കുകൾക്കൊപ്പം അവസാനത്തെ 20 ജോബ് റണ്ണുകളും നൽകുന്നു.
- **പരാജയപ്പെടുന്ന ഒരു ലക്ഷ്യസ്ഥാനം മറ്റുള്ളവയെ പരാജയപ്പെടുത്തില്ല** — റൺ സംഗ്രഹം ഓരോ ലക്ഷ്യസ്ഥാനത്തിന്റെയും
  നില `last_status` / `last_error` എന്നതിൽ രേഖപ്പെടുത്തുന്നു, കൂടാതെ ജോബ് റൺ ചരിത്രം ആകെ നില നിലനിർത്തുന്നു.
- **ഒരു ലക്ഷ്യസ്ഥാനം ഇല്ലാതാക്കുന്നത് അതിന്റെ കർസറും ഇല്ലാതാക്കുന്നു.** അത് വീണ്ടും ചേർക്കുമ്പോൾ നിലനിർത്തിയിരിക്കുന്നതിൽ ഏറ്റവും പഴയ
  കോൾ ലോഗിൽ നിന്ന് ആരംഭിക്കും; അതിനാൽ ലക്ഷ്യസ്ഥാനത്ത് ഇതിനകം ഉണ്ടായിരിക്കാവുന്ന വരികൾ വീണ്ടും അയയ്ക്കപ്പെടും. BigQuery-യിൽ ഓരോ വരിയുടെയും
  `insertId` അത് BigQuery-യുടെ സ്വന്തം ഡ്യൂപ്ലിക്കേറ്റ്-നിരോധന കാലയളവിനുള്ളിൽ മാത്രമേ കൈകാര്യം ചെയ്യൂ, അതിനാൽ
  ഒരു ലക്ഷ്യസ്ഥാനം ഇല്ലാതാക്കുന്നതിനെക്കാൾ പ്രവർത്തനരഹിതമാക്കുന്നതാണ് ഉചിതം.

### ഉപയോഗ-തെളിവ് സ്കീമ അനുയോജ്യത

പുതിയ BigQuery പട്ടികകളിൽ nullable `usage_evidence` (JSON അടങ്ങിയ STRING), കൂടാതെ
`usage_estimated` (BOOL) ഉൾപ്പെടുന്നു. `autoCreate` പ്രവർത്തനക്ഷമമാക്കിയിരിക്കുമ്പോൾ, നിലവിലുള്ള ഒരു പട്ടികയ്ക്ക്
ഇവയിൽ ഇല്ലാത്ത nullable കോളങ്ങൾ മാത്രം ലഭിക്കാം. എക്സ്പോർട്ടർ ഫീൽഡ് മെറ്റാഡാറ്റ ഉൾപ്പെടെ നിലവിലുള്ള
പൂർണ്ണ സ്കീമ സംരക്ഷിക്കുകയും, ലഭിച്ച etag ഉപയോഗിച്ച് നിബന്ധനാപരമായ PATCH സമർപ്പിക്കുകയും ചെയ്യുന്നു. ഒരേസമയം
നടക്കുന്ന സ്കീമ മാറ്റം അത് ഓവർറൈറ്റ് ചെയ്യുന്നതിനുപകരം എക്സ്പോർട്ട് പരാജയപ്പെടുത്തും; അടുത്ത റൺ പട്ടിക വീണ്ടും വായിക്കും.

`autoCreate` പ്രവർത്തനരഹിതമാക്കിയിരിക്കുമ്പോൾ, ഉപയോഗ-തെളിവുള്ള റെക്കോർഡുകൾ എക്സ്പോർട്ട് ചെയ്യുന്നതിന് മുമ്പ്
ഈ കോളങ്ങൾ നിങ്ങൾ തന്നെ ചേർക്കുക. സ്കീമ/etag മെറ്റാഡാറ്റ ഇല്ലാതിരിക്കുകയോ അപ്ഡേറ്റ് പരാജയപ്പെടുകയോ ചെയ്താൽ
തെളിവ് അടങ്ങിയ ഇൻസേർട്ടുകളും തടയപ്പെടും. ആ പരാജയത്തിൽ എക്സ്പോർട്ട് കർസർ മുന്നോട്ട് നീങ്ങില്ല, കൂടാതെ
തെളിവ് ഒരിക്കലും നിശ്ശബ്ദമായി ഒഴിവാക്കപ്പെടുകയുമില്ല. ഒരു എക്സ്പോർട്ട് തടസ്സപ്പെട്ടിരിക്കുമ്പോഴും പ്രാദേശിക ലോഗ്
നിലനിർത്തൽ ബാധകമാണ്, അതിനാൽ നിലനിർത്തിയിരിക്കുന്ന ഉറവിട വരികൾ കാലഹരണപ്പെടുന്നതിന് മുമ്പ് പരാജയം പരിഹരിക്കുക.
