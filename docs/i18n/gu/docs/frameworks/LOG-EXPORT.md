# Log export (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

OmniRoute કૉલ લૉગ્સનું બાહ્ય એનાલિટિક્સ સ્ટોરમાં સતત, વૃદ્ધિશીલ નિકાસ.

લૉગ્સ ડૅશબોર્ડ ટૅબ વિનંતીઓનો ઇતિહાસ SQLite (`call_logs`)માં રાખે છે, જે
રોટેશન અને રિટેન્શન દ્વારા મર્યાદિત હોય છે. લૉગ નિકાસ એ જ રેકોર્ડ સમૂહને નિર્ધારિત સમયે બહાર મોકલે છે, જેથી તે
સ્થાનિક ડેટાબેઝ કરતાં વધુ સમય સુધી જળવાઈ શકે અને અન્ય ડેટા સાથે જોડાઈ શકે. BigQuery પ્રથમ ગંતવ્ય છે;
પાઇપલાઇન એક રજિસ્ટ્રી છે, તેથી વધુ ગંતવ્યો ઉમેરવા પૂરક ફેરફાર છે.

---

## 1. તે કેવી રીતે કાર્ય કરે છે

```
server (decrypt + validate config, reconcile cursor)
  → start IPC → isolated exportChild OS process
    → read-only storage.sqlite → shared call-log query/mapping
      → async artifact hydration → destination prepare()/send()
        → batch IPC → server persists cursor → ack IPC
          → next batch; done IPC → server records success
```

- **સમયપત્રક** — એક `JobRegistry` cron જૉબ, `log_export`, જેનું ડિફૉલ્ટ `0 * * * *` (દર કલાકે,
  UTC) છે. તે `src/lib/initCloudSync.ts`માં નોંધાયેલું છે; `OMNIROUTE_LOG_EXPORT_CRON`થી તેને બદલી શકાય છે.
  દરેક ટિક પર દરેક **સક્રિય** ગંતવ્યનો બાકી ડેટા ક્રમશઃ નિકાસ થાય છે.
- **કર્સર** — SQLiteનું ગર્ભિત `call_logs.rowid`, જે દરેક ગંતવ્ય માટે
  `log_export_destinations.cursor_row_id`માં સંગ્રહિત થાય છે. `timestamp`ને જાણીજોઈને કર્સર બનાવવામાં આવ્યું નથી: કૉલ કરનારાઓ
  પોતાનું મૂલ્ય આપી શકે છે, તેથી ધીમી વિનંતી તેના કરતાં પછી શરૂ થયેલી ઝડપી વિનંતી બાદ લખાઈ શકે છે,
  અને ટાઇમસ્ટૅમ્પ કર્સર તેને છોડી દેશે.
- **બૅચિંગ** — દરેક વિનંતીમાં `batch_size` પંક્તિઓ (ડિફૉલ્ટ 500), દરેક રનમાં `max_rows_per_run` પંક્તિઓ
  (ડિફૉલ્ટ 10000), જેથી મોટો બૅકલૉગ એક ટિકને અવરોધવાને બદલે ઘણી ટિકમાં નિકાસ થાય.
- **વિતરણ** — `send()` પૂર્ણ થાય ત્યાર પછી જ કર્સર આગળ વધે છે. નિષ્ફળ બૅચ કર્સરને
  તેની મૂળ જગ્યાએ જ રાખે છે, તેથી આગામી રનમાં એ જ પંક્તિઓ માટે ફરી પ્રયાસ થાય છે. ખાતરી
  ઓછામાં ઓછું એકવાર વિતરણ અને ગંતવ્ય-પક્ષે ડુપ્લિકેટ દૂર કરવાની છે, સાચા અર્થમાં ચોક્કસ એકવાર વિતરણની નહીં: BigQuery દરેક
  પંક્તિ માટે કૉલ-લૉગ idને કી તરીકે વાપરે છે, જેને તે પોતાની ડુપ્લિકેટ દૂર કરવાની સમયમર્યાદામાં શ્રેષ્ઠ પ્રયાસના ધોરણે માન્ય રાખે છે.
- **ઓવરલૅપ સુરક્ષા** — cron ટિક અને `POST .../run` એકસાથે શરૂ થઈ શકે છે. જે ગંતવ્યમાંથી
  નિકાસ પહેલેથી ચાલી રહી હોય તેને બે વાર નિકાસ કરવાને બદલે છોડી દેવામાં આવે છે (રનના પરિણામમાં `skipped: true`),
  જેથી સમવર્તી રન બૅચને ફરી મોકલી કે કર્સરને પાછળ લખી ન શકે.
- **પર્જ પછી પુનઃપ્રાપ્તિ** — જો `cursor_row_id`, `MAX(rowid)` કરતાં વધી જાય (આખું ટેબલ
  પર્જ થયું હોય અને rowid ફરીથી શરૂ થયા હોય), તો રનર કાયમ માટે નવા રેકોર્ડ જોવાનું ચૂકી જવાને બદલે 0 પર પાછો ફરે છે.

### અલગ પાડેલો રનર અને મર્યાદાઓ

Node પર દરેક ગંતવ્ય રન એક અલગ, અલ્પજીવી OS ચાઇલ્ડ પ્રોસેસ શરૂ કરે છે (IPC સાથે `child_process`,
`worker_threads` નહીં). બૉડી વાંચન, પેલોડ JSON પાર્સિંગ/સીરિયલાઇઝેશન, ગંતવ્યનું
`prepare()` અને ગંતવ્ય નેટવર્ક I/O બધું ત્યાં ચાલે છે, સર્વરના ઇવેન્ટ લૂપ પર નહીં.
માત્ર કન્ફિગરેશન અને નાના પ્રગતિ સંદેશાઓ IPC મારફતે પસાર થાય છે; નિકાસ કરેલા રેકોર્ડ ક્યારેય
સર્વર પર પાછા આવતા નથી. cron જૉબ અને તાત્કાલિક ચલાવવાનો રૂટ સમાન જાહેર પરિણામ અને ઓવરલૅપ સુરક્ષા જાળવી રાખે છે.

ચાઇલ્ડ, `node:sqlite` વાપરીને સર્વરના નિર્ધારિત `DATA_DIR/storage.sqlite`ને ફક્ત વાંચવા માટે ખોલે છે,
અને તેમાં `busy_timeout=5000` તથા `query_only=ON` હોય છે. તે કોઈ DB સિંગલટન ઇમ્પોર્ટ કરતું નથી અને કોઈ
માઇગ્રેશન, બૅકઅપ કે SQLite અપડેટ કરતું નથી. ગુમ/દૂષિત આર્ટિફેક્ટનું હિસાબ-સંચાલન (દૂષિત-આર્ટિફેક્ટ
UPDATE સહિત) માત્ર ડૅશબોર્ડની વિગત દર્શાવતી પ્રક્રિયામાં જ રહે છે. બંને પ્રક્રિયાઓ એક શુદ્ધ
વિગત રિઝૉલ્વર વાપરે છે; નિકાસ અસિંક્રોનસ ફાઇલસિસ્ટમ વાંચન અને સમાન આર્ટિફેક્ટ → લેગસી
ઇનલાઇન → લેગસી ડિસ્ક → કશું નહીં એવા નિરાકરણ ક્રમનો ઉપયોગ કરે છે. ચાઇલ્ડ પોતાનું રીડર ખોલે ત્યારે રન મહત્તમ ઇન્સર્શન rowidનો સ્નૅપશૉટ લે છે;
તેના પછીના ઇન્સર્ટ આગામી રન સુધી રાહ જુએ છે. આ ઇન્સર્શનની
સીમા છે, લાંબા સમય સુધી ચાલતું SQLite ટ્રાન્ઝૅક્શન નહીં: નેટવર્કની રાહ જોતી વખતે WAL રાઇટર્સ અને ચેકપૉઇન્ટ્સ મુક્ત રહે છે.
આ સીમા હાલની પંક્તિઓના અપડેટ/ડિલીટને સ્થગિત કરતી નથી.

દરેક સ્વીકારેલી બૅચ પછી ચાઇલ્ડ સ્વીકૃતિની રાહ જુએ છે. સર્વર પહેલાં
`advanceLogExportCursor` વડે કર્સર સંગ્રહિત કરે છે, પછી `ack` મોકલે છે; તે પહેલાં કોઈ આગામી બૅચ શરૂ થતી નથી.
મોકલવામાં નિષ્ફળતા, ક્રૅશ અથવા ટાઇમઆઉટ થાય તો તે બૅચને આગળ વધાર્યા વિના નિષ્ફળતા નોંધાય છે. અગાઉ
સ્વીકૃત થયેલી બૅચ કમિટ થયેલી રહે છે; વધુમાં વધુ એક સ્વીકૃતિ ન મળેલી બૅચ ફરી મોકલાઈ શકે છે.
`done` અને ચાઇલ્ડના સ્વચ્છ એક્ઝિટ પછી જ સફળતા નોંધાય છે. નિષ્ફળતા આવે ત્યારે ચાઇલ્ડને
SIGTERM વડે બંધ કરવામાં આવે છે, 500 ms પછી SIGKILL સુધી કાર્યવાહી વધારવામાં આવે છે, અને રનર પ્રોસેસ બંધ થવાની રાહ જુએ છે.

| એન્વાયર્નમેન્ટ વેરિએબલ                        | ડિફૉલ્ટ | હેતુ                                           |
| --------------------------------------------- | ------- | ---------------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000  | દરેક ગંતવ્ય માટે વાસ્તવિક વીતેલા સમયની મર્યાદા |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024    | ચાઇલ્ડની V8 old-space મર્યાદા MBમાં            |

અમાન્ય/બિન-ધન/બિન-પૂર્ણાંક મૂલ્યો માટે ડિફૉલ્ટ વપરાય છે. હીપ સેટિંગ કુલ
RSS મર્યાદા નથી; ખૂબ મોટી બૅચ હજી પણ ચાઇલ્ડની મેમરી પૂરી કરી શકે છે અને રનને સુરક્ષિત રીતે નિષ્ફળ બનાવી શકે છે.
1024 MBનું ડિફૉલ્ટ, બૉડી સક્રિય હોય ત્યારે 512 KiB આર્ટિફેક્ટની ડિફૉલ્ટ 500-પંક્તિ બૅચ માટે
વધારાની જગ્યા રાખે છે, જેમાં BigQueryનું બાઇટ-ચંક્સમાં થતું JSON સીરિયલાઇઝેશન પણ સામેલ છે. તે
બૉડી ધરાવતી 10000-પંક્તિ બૅચને સુરક્ષિત બનાવતું નથી. V8 હીપ ખૂટી જવાથી પગલાં લઈ શકાય તેવી નિષ્ફળતા નોંધાય છે: બૅચનું
કદ ઘટાડો અથવા `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` વધારો; કર્સર છેલ્લી
સ્વીકૃત બૅચ પર જ રહે છે. ઐતિહાસિક ઇનલાઇન/ડિસ્ક બૉડી આધુનિક આર્ટિફેક્ટ મર્યાદા હેઠળ આવતી નથી.
સંચાલકોએ RSS માટે અલગથી સંસાધનો ફાળવવા જોઈએ, ખાસ કરીને મર્યાદિત મેમરી ધરાવતા કન્ટેનરમાં.

ચાઇલ્ડને ફક્ત રિઝોલ્વ કરાયેલ `DATA_DIR`, `NODE_ENV`, સ્પષ્ટ રીતે આપેલ `TZ` (લેગસી ફાઇલનામના
સ્થાનિક-સમય રિઝોલ્યુશન માટે), હાજર હોય ત્યારે `ELECTRON_RUN_AS_NODE`, અને નીચેના આઉટબાઉન્ડ ઇનપુટ્સ વારસામાં મળે છે:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (અને તેમનાં લોઅરકેસ સ્વરૂપો),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
વૈશ્વિક Undici ડિસ્પેચર સર્વરના ફક્ત એન્વાયર્નમેન્ટ પર આધારિત પ્રોક્સી રિઝોલ્યુશન અને સ્થાનિક-હોસ્ટ
બાયપાસ નિયમોનો ઉપયોગ કરે છે, જેમાં `NO_PROXY` પણ સામેલ છે; તે `proxyFetch.ts` કે તેના DB/ફીચર ફ્લેગ્સ ઇમ્પોર્ટ કરતું નથી.
ફોરવર્ડ કરાયેલા આઉટપુટ અને નોંધાયેલી ભૂલોમાંથી પ્રોક્સી ઓળખપત્રો છુપાવવામાં આવે છે. ગંતવ્યનાં ઓળખપત્રો
ફક્ત એક પ્રારંભિક IPC સંદેશમાં જ મોકલાય છે, argv કે એન્વાયર્નમેન્ટમાં ક્યારેય નહીં; આઉટપુટ/ભૂલ ફોરવર્ડ કરતી વખતે
પ્રીફિક્સ ઉમેરાય છે અને સંવેદનશીલ માહિતી દૂર કરાય છે. દરેક cron રનમાં Node ની SQLite ચેતવણીનું
પુનરાવર્તન ટાળવા ચાઇલ્ડના exec આર્ગ્યુમેન્ટ્સમાં ફક્ત `ExperimentalWarning` અક્ષમ કરાય છે; અન્ય પ્રકારની ચેતવણીઓ દેખાતી રહે છે.

ગંતવ્ય મોડ્યુલો Next.js/server-only ડિપેન્ડન્સીઓ વિના ઇમ્પોર્ટ કરી શકાય તેવા હોવા જોઈએ. હાલનું
BigQuery અમલીકરણ આ શરત પહેલેથી જ પૂરી કરે છે. ઍક્સેસ-ટોકન કૅશ ફક્ત ચાઇલ્ડના
રન પૂરતા જ રહે છે, અલગ-અલગ રન વચ્ચે નહીં. Node એ સમર્થિત રનટાઇમ છે (`package.json` engines), પરંતુ README નો Bun
ઇન્સ્ટોલેશન વિભાગ અને `Dockerfile.bun` પણ `bun:sqlite` (`src/lib/db/core.ts` / એડેપ્ટર્સ) નો ઉપયોગ કરતો
પ્રોડક્શન સુસંગતતા માર્ગ દર્શાવે છે. તેથી Bun હેઠળ, એક્સપોર્ટ અગાઉનો
ઇન-પ્રોસેસ માર્ગ જાળવી રાખે છે અને એક વખત ચેતવણી આપે છે: ચાઇલ્ડ હીપ/ટાઇમઆઉટ આઇસોલેશન ઉપલબ્ધ નથી.
ઇવેન્ટ-લૂપ અને OOM આઇસોલેશન માટે Node નો ઉપયોગ કરો; અહીં Bun ને ફક્ત ડેવલપમેન્ટ માટેનું માનવામાં આવતું નથી.

`includeBodies` સક્ષમ હોય ત્યારે, કલાકભરનો પેલોડ બૅકલૉગ એકઠો કરવા કરતાં
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` જેવી મિનિટ-સ્તરની આવર્તન-વ્યવસ્થા પસંદ કરો.
બૅચ અને પંક્તિ મર્યાદાઓ હજી પણ દરેક રનને મર્યાદિત રાખે છે. દરેક રનમાં દરેક ગંતવ્ય માટે
પ્રોસેસ શરૂ કરવાનો ખર્ચ થાય છે; આ કુલ CPU વપરાશ ઘટાડવાને બદલે, થોડા સ્ટાર્ટઅપ ખર્ચના બદલામાં સર્વર ઇવેન્ટ-લૂપ આઇસોલેશન આપે છે.

### પેલોડ્સ (પ્રોમ્પ્ટ્સ અને કમ્પ્લીશન્સ)

ડિફૉલ્ટ રૂપે એક્સપોર્ટમાં ફક્ત Logs ની **યાદી**માં દેખાતાં સારાંશ ફીલ્ડ્સ જ સામેલ હોય છે.
**પ્રોમ્પ્ટ્સ અને પ્રતિભાવો એક્સપોર્ટ કરો** (`includeBodies`) ચાલુ કરવાથી દરેક કૉલ માટે Logs ની **વિગતો**
પેનમાં દેખાતી માહિતી પણ મોકલાય છે:

| ફીલ્ડ                            | તેમાં શું હોય છે                                                |
| -------------------------------- | --------------------------------------------------------------- |
| `request_body` / `response_body` | ડૅશબોર્ડ જે રીતે દર્શાવે છે તે રીતે કૉલના પેલોડ્સ               |
| `pipeline_route_decision`        | રાઉટરે કયું લક્ષ્ય અને મોડેલ પસંદ કર્યું                        |
| `pipeline_client_request`        | ક્લાયન્ટે જે રીતે મોકલી હતી તે જ રીતે કાચી વિનંતી               |
| `pipeline_openai_request`        | આંતરિક OpenAI સ્વરૂપમાં રૂપાંતર કર્યા પછીની વિનંતી              |
| `pipeline_provider_request`      | પ્રદાતાના સ્વરૂપમાં, અપસ્ટ્રીમને વાસ્તવમાં મોકલાયેલી વિનંતી     |
| `pipeline_provider_response`     | કાચો અપસ્ટ્રીમ પ્રતિભાવ                                         |
| `pipeline_client_response`       | કૉલ કરનારને પાછું શું અપાયું                                    |
| `pipeline_error`                 | નિષ્ફળ કૉલ માટે પાઇપલાઇન-સ્તરની ભૂલની વિગતો                     |
| `bodies_truncated`               | ઉપરના કોઈપણ ફીલ્ડે `maxBodyBytes` મર્યાદા વટાવી હોય ત્યારે True |

આ પ્રોમ્પ્ટની સામગ્રી છે, તેથી તે **ડિફૉલ્ટ રૂપે બંધ** હોય છે અને ઇરાદાપૂર્વક દરેક ગંતવ્ય માટે અલગ પસંદગી છે.
ડૅશબોર્ડમાં જે દેખાય છે તે જ મોકલાય છે, કારણ કે એક્સપોર્ટ અને `getCallLogById` એક જ વિગત
રિઝોલ્યુશનનો ઉપયોગ કરે છે: પેલોડ્સ લખાય ત્યારે જ તેમાંથી
PII દૂર કરવામાં આવે છે અને ગુપ્ત માહિતી છુપાવવામાં આવે છે, અને
`noLog` API કી વડે કરાયેલ કૉલ કોઈ પેલોડ સંગ્રહિત કરતો નથી, તેથી એક્સપોર્ટ કરવા માટે કંઈ હોતું નથી.

પેલોડ્સ દરેક પંક્તિ માટે ફાઇલસિસ્ટમ આર્ટિફૅક્ટમાંથી વાંચવામાં આવે છે, તેથી હાઇડ્રેશન ફક્ત તે માંગનારાં
ગંતવ્યો માટે જ ચાલે છે. આર્ટિફૅક્ટ ગુમ હોય કે બગડેલું હોય તો, બૅચને નિષ્ફળ બનાવી કર્સરને અટકાવી દેવાને
બદલે તેનો સારાંશ null પેલોડ્સ સાથે એક્સપોર્ટ થાય છે.

`maxBodyBytes` (ડિફૉલ્ટ 262144) દરેક ફીલ્ડને મર્યાદિત કરે છે. લાંબા પેલોડ્સને **કાઢી નાખવાને બદલે
ટૂંકાવવામાં આવે છે** — ટૂંકાવેલો પ્રોમ્પ્ટ પણ "શું પૂછવામાં આવ્યું હતું" તેનો જવાબ આપે છે — અને પંક્તિને
`bodies_truncated` વડે ચિહ્નિત કરાય છે. સ્ટ્રીમ કરાયેલા ચંક-દર-ચંક ડેલ્ટા એક્સપોર્ટ થતા નથી; સંકલિત પ્રતિભાવ
પહેલેથી જ `pipeline_provider_response` અને `pipeline_client_response` માં હોય છે.

---

## 2. ફાઇલો

| ઘટક                     | સ્થાન                                        |
| ----------------------- | -------------------------------------------- |
| ગંતવ્ય કરાર             | `src/lib/logExport/types.ts`                 |
| રજિસ્ટ્રી               | `src/lib/logExport/registry.ts`              |
| ગુપ્ત માહિતીનું સંચાલન  | `src/lib/logExport/secrets.ts`               |
| રનર (પેરેન્ટ IPC)       | `src/lib/logExport/runner.ts`                |
| પ્રક્રિયાનું જીવનચક્ર   | `src/lib/logExport/childRunner.ts`           |
| ચાઇલ્ડ પ્રવેશબિંદુ      | `src/lib/logExport/exportChild.ts`           |
| ફક્ત વાંચવા માટે ખોલનાર | `src/lib/db/logExportReadOnly.ts`            |
| સહિયારી ક્વેરી/મેપિંગ   | `src/lib/usage/callLogExportQueries.ts`      |
| વિગત ઉકેલનાર            | `src/lib/usage/callLogDetailResolver.ts`     |
| API પ્રોજેક્શન          | `src/lib/logExport/presenter.ts`             |
| BigQuery ગંતવ્ય         | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA પ્રમાણીકરણ    | `src/lib/logExport/googleServiceAccount.ts`  |
| કૉલ-લૉગ સ્રોત           | `src/lib/usage/callLogExportSource.ts`       |
| કાયમી સંગ્રહ            | `src/lib/db/logExportDestinations.ts`        |
| Cron જોબ                | `src/lib/jobs/logExportJob.ts`               |
| REST સ્તર               | `src/app/api/log-export/`                    |
| ડેશબોર્ડ પૃષ્ઠ          | `src/app/(dashboard)/dashboard/log-export/`  |

સ્કીમા: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

બધા રૂટ માટે મેનેજમેન્ટ પ્રમાણીકરણ જરૂરી છે (`requireManagementAuth`). ગુપ્ત માહિતી ક્યારેય પરત આપવામાં આવતી નથી:
સંગ્રહિત ગુપ્ત માહિતી શાબ્દિક મૂલ્ય `__stored__` તરીકે પરત આવે છે, અને અપડેટ કરતી વખતે તે મૂલ્ય પાછું મોકલવાથી
સંગ્રહિત ઓળખપત્ર જળવાઈ રહે છે.

જેનો પ્રકાર ગુપ્ત માહિતી જાહેર કરે છે તેવું ગંતવ્ય બનાવવા કે અપડેટ કરવા માટે **`STORAGE_ENCRYPTION_KEY`
જરૂરી છે**. તેના વિના `encrypt()` કોઈ સૂચના વિના ઇનપુટને યથાવત્ પસાર કરે છે, તેથી ઓળખપત્રને
SQLite માં સાદા લખાણ તરીકે મૂકવાને બદલે લખવાની વિનંતી 400 સાથે નકારવામાં આવે છે (Telegram webhook
પણ આ જ સુરક્ષા તપાસ લાગુ કરે છે).

| પદ્ધતિ   | પાથ                                      | હેતુ                                                 |
| -------- | ---------------------------------------- | ---------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | ગંતવ્યના પ્રકારો + તેમના ગોઠવણી ફીલ્ડની યાદી         |
| `GET`    | `/api/log-export/destinations`           | ગંતવ્યોની યાદી (ગુપ્ત માહિતી છુપાવેલી)               |
| `POST`   | `/api/log-export/destinations`           | ગંતવ્ય બનાવવું                                       |
| `GET`    | `/api/log-export/destinations/{id}`      | એક ગંતવ્ય વાંચવું                                    |
| `PUT`    | `/api/log-export/destinations/{id}`      | નામ / સક્ષમ સ્થિતિ / ગોઠવણી / બેચિંગ અપડેટ કરવું     |
| `DELETE` | `/api/log-export/destinations/{id}`      | કાઢી નાખવું                                          |
| `POST`   | `/api/log-export/destinations/{id}/test` | ઓળખપત્રો તપાસવાં, કંઈ લખવું નહીં                     |
| `POST`   | `/api/log-export/destinations/{id}/run`  | હમણાં બાકી નિકાસ પૂર્ણ કરવી, નિર્ધારિત રન જેવો જ પાથ |
| `GET`    | `/api/log-export/status`                 | Cron સ્થિતિ, તાજેતરના રન, દરેક લક્ષ્ય માટે બાકી કામ  |

`GET /api/log-export/types` UI ને સામાન્ય ઉપયોગ માટે યોગ્ય બનાવે છે: ડેશબોર્ડ ફોર્મ
પરત મળેલા ફીલ્ડ વર્ણનકારોના આધારે રેન્ડર થાય છે, તેથી નવા ગંતવ્ય માટે UI માં ફેરફાર કરવાની જરૂર પડતી નથી.

---

## 4. BigQuery ગંતવ્ય

કૉન્ફિગ કી (`type: "bigquery"`):

| કી                   | નોંધ                                                                                   |
| -------------------- | -------------------------------------------------------------------------------------- |
| `projectId`          | ડેટાસેટ ધરાવતો GCP પ્રોજેક્ટ                                                           |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                        |
| `tableId`            | `[A-Za-z0-9_]+`                                                                        |
| `location`           | ડેટાસેટ બનાવવાનો હોય ત્યારે જ વપરાય છે (ડિફૉલ્ટ `EU`)                                  |
| `serviceAccountJson` | સર્વિસ-અકાઉન્ટ કી. ગુપ્ત: સ્ટોરેજ દરમિયાન એન્ક્રિપ્ટેડ, ક્યારેય પરત મોકલાતી નથી        |
| `autoCreate`         | ગાયબ ડેટાસેટ/ટેબલ બનાવો; જરૂર મુજબ nullable usage-evidence કૉલમ ઉમેરો (ડિફૉલ્ટ `true`) |

સર્વિસ અકાઉન્ટને લક્ષ્ય ટેબલ પર `bigquery.tables.updateData`ની પરવાનગી જોઈએ, તેમજ
`autoCreate` ચાલુ હોય ત્યારે `bigquery.datasets.create` / `bigquery.tables.create`ની પરવાનગી
જોઈએ. અસ્તિત્વમાં રહેલા ટેબલમાં બે nullable usage-evidence ક્ષેત્રો ઉમેરવા માટે
`bigquery.tables.update` પણ જરૂરી છે. કોઈ પરવાનગી ગાયબ હોય તો કર્સર આગળ વધાર્યા વિના
એક્સપોર્ટ નિષ્ફળ જાય છે.

કૉન્ફિગર કરાયેલ બૅચ HTTP એકમ નહીં પરંતુ **કર્સર** એકમ છે: `send()` તેને વધુમાં વધુ 500
પંક્તિઓ ધરાવતા insertAll કૉલ્સમાં વિભાજિત કરે છે, તેથી મોટું `batch_size` BigQueryની 10 MB
વિનંતી મર્યાદાને પાર કરી શકતું નથી. ક્ષણિક સ્થિતિઓ (408/429/500/502/503/504)માં સમાન
insertIdsનો પુનઃઉપયોગ કરીને exponential backoff સાથે વધુમાં વધુ ત્રણ વખત ફરી પ્રયાસ થાય છે;
ઑથેન્ટિકેશન અને સ્કીમા નિષ્ફળતાઓ પ્રથમ પ્રયાસમાં જ throw થાય છે, જેથી રનનો સમય વ્યર્થ ન જાય.

હમણાં જ બનાવેલું ટેબલ streaming endpointને તરત દેખાતું નથી અને થોડા સેકન્ડ માટે 404 આપે છે.
આ 404 પર ફરી પ્રયાસ થાય છે, પરંતુ **માત્ર ત્યારે જ્યારે આ રને ટેબલ બનાવ્યું હોય** — ખરેખર ગાયબ
ટેબલ હોય તો તરત નિષ્ફળતા મળે છે. નોંધો કે તાજેતરમાં ડિલીટ કરાયેલા ટેબલના નામે ફરી ટેબલ
બનાવવાથી BigQuery કેટલાંક મિનિટો સુધી streaming inserts નકારી શકે છે; આ delete-then-recreateની
વિશેષતા છે, તેથી ટેબલ ડ્રૉપ કરીને ફરી ઉમેરવા કરતાં નવું ટેબલ નામ પસંદ કરો.

**આંશિક નિષ્ફળતા HTTP 200 સાથે બિન-ખાલી `insertErrors[]` તરીકે આવે છે.** તેને નિષ્ફળતા
ગણવામાં આવે છે અને throw થાય છે, જેથી BigQueryએ સ્વીકારેલી ન હોય તેવી પંક્તિઓથી આગળ કર્સર
ન વધે; `tests/unit/log-export-bigquery.test.ts` આ વર્તણૂક નિશ્ચિત કરે છે.

ટ્રાન્સપોર્ટ સાદું REST છે — self-signed RS256 assertionને
`https://oauth2.googleapis.com/token` પર access token માટે વિનિમય કરવામાં આવે છે, ત્યારબાદ
પંક્તિઓ `tabledata.insertAll` પર મોકલાય છે. કોઈ Google SDK ઉમેરવામાં આવતું નથી. Access tokens
ને (service account, scope) મુજબ પ્રક્રિયા દરમિયાન કૅશ કરવામાં આવે છે.

બનાવાયેલ ટેબલમાં Logs ટૅબના દરેક ક્ષેત્ર માટે એક કૉલમ ઉપરાંત `exported_at` હશે, અને તેને
વાસ્તવિક રીતે call logs કેવી રીતે ક્વેરી થાય છે તે મુજબ ગોઠવવામાં આવે છે:

- **`timestamp` પર દિવસ-આધારિત પાર્ટિશન**, જેથી તારીખથી મર્યાદિત ક્વેરી માત્ર તે દિવસોને જ સ્કૅન કરે.
- **`api_key_name`, `provider`, `model`, `status` દ્વારા ક્લસ્ટર કરાયેલ** (આ ક્રમમાં), જેથી
  કોણે ચલાવ્યું, ક્યાં મોકલાયું અથવા તે નિષ્ફળ ગયું કે નહીં તે મુજબનું ફિલ્ટર દરેક પાર્ટિશનની
  અંદરના બ્લૉક્સને પ્રૂન કરે. BigQuery વધુમાં વધુ ચાર ક્લસ્ટરિંગ કૉલમની મંજૂરી આપે છે અને
  ક્રમ મહત્વનો છે: માત્ર `api_key_name` પરનું ફિલ્ટર પ્રૂન કરે છે, જ્યારે માત્ર `status` પરનું
  ફિલ્ટર કરતું નથી.
- `partitionExpirationDays` દ્વારા **વૈકલ્પિક પાર્ટિશન રિટેન્શન** (0 બધું જાળવી રાખે છે), જે
  ટેબલ બનાવવામાં આવે ત્યારે લાગુ થાય છે.

બંને સેટિંગ્સ બનાવતી વખતે જ લાગુ પડે છે. અસ્તિત્વમાં રહેલું ટેબલ તેની પહેલેથી રહેલી ગોઠવણી
જાળવી રાખે છે, તેથી જો તમે આ સેટિંગ્સ અપનાવવા માંગતા હો તો ગંતવ્યને નવા ટેબલ id પર નિર્દેશિત કરો.

`tests/unit/log-export-bigquery.test.ts` ખાતરી કરે છે કે mapper અને ટેબલ સ્કીમા પરસ્પર
સુસંગત રહે, જેથી નવું call-log કૉલમ બહાર મોકલતી વખતે ચૂપચાપ છૂટી ન જાય.

બૅચને **પંક્તિઓની સંખ્યા અને સીરીયલાઇઝ કરેલા બાઇટ્સ બંને** આધારે વિભાજિત કરવામાં આવે છે.
પેલોડ્સ એક્સપોર્ટ થાય ત્યારે માત્ર પંક્તિઓની સંખ્યા પૂરતી નથી: prompts ધરાવતી 500 પંક્તિઓ
દસેક મેગાબાઇટ થઈ શકે છે અને insertAll 10 MBથી મોટી વિનંતી નકારી દે છે. જે પહેલાં થાય તે
મુજબ, 500 પંક્તિઓ અથવા 9 MB પર ચંક્સ બંધ થાય છે.

---

## 5. OTLP/HTTP ટ્રેસિસ ડેસ્ટિનેશન

કૉન્ફિગ `type: "otlp-http"` નો ઉપયોગ કરે છે. આ સંગ્રહિત કૉલ લૉગ્સનું શેડ્યૂલ કરાયેલ, કર્સર-આધારિત એક્સપોર્ટ છે; તે
`open-sse/services/routing/otel.ts` માં રહેલા શ્રેષ્ઠ-પ્રયાસવાળા લાઇવ રૂટિંગ-ઇવેન્ટ સિંક જેટલું નથી. તે સિંકના એન્વાયર્નમેન્ટ
વેરિયેબલ્સ, ટાઇમર્સ અથવા બફર્સને વાંચતું કે બદલતું નથી. બંને સક્રિય કરવાથી સ્પૅન્સના બે સ્વતંત્ર પ્રકારો બની શકે છે;
આ કૉલ-લૉગ સ્પૅન્સને અલગ પાડવા માટે `omniroute.log-export` ઇન્સ્ટ્રુમેન્ટેશન સ્કોપનો ઉપયોગ કરો.

| કી                       | ડિફૉલ્ટ / હેતુ                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------ |
| `endpoint`               | જરૂરી પૂર્ણ HTTP(S) ટ્રેસિસ URL; `/v1/traces` સક્સેસ ઉમેરવામાં આવતો નથી              |
| `headers`                | વૈકલ્પિક `Name: value` લાઇનો અથવા સ્ટ્રિંગ્સનો JSON ઑબ્જેક્ટ; એન્ક્રિપ્ટેડ           |
| `requestHeaderAllowlist` | ખાલી (બંધ); સ્પૅન એટ્રિબ્યુટ્સ તરીકે કૅપ્ચર કરવા માટેના ક્લાયન્ટ હેડર નામો/પ્રિફિક્સ |
| `serviceName`            | `omniroute`; રિસોર્સ `service.name`                                                  |
| `langfuseMapping`        | `false`; Langfuse generation/session/user એટ્રિબ્યુટ્સ ઉમેરે છે                      |
| `identity`               | `pseudonymous`, `keyName`, અથવા `none`                                               |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                              |
| `timeoutMs`              | દરેક HTTP પ્રયાસ માટે `30000`                                                        |
| `environment`            | સેટ નથી; વૈકલ્પિક `langfuse.environment`                                             |

સામાન્ય ડૅશબોર્ડ આ ફીલ્ડ્સ રેન્ડર કરે છે. `paths` API ઍરે અથવા નવી લાઇન/કૉમા વડે અલગ કરેલા ચોક્કસ પાથ ધરાવતા
ટેક્સ્ટએરિયાને સ્વીકારે છે. Embeddings, rerank અને અન્ય પાથ્સને સ્પષ્ટપણે મંજૂરી ન મળે ત્યાં સુધી છોડવામાં આવે છે.
છોડાયેલી પંક્તિઓ પણ કર્સરને આગળ વધારે છે; હાલના રનરના `exported`/`exportedTotal` કાઉન્ટર્સ સ્વીકારાયેલા સ્પૅન્સને
બદલે પ્રોસેસ કરાયેલી સ્રોત પંક્તિઓ ગણે છે, જેમાં ફિલ્ટર કરાયેલી પંક્તિઓ પણ સામેલ છે. ફિલ્ટરિંગ ચાઇલ્ડમાં કરવામાં આવે છે,
તેના IPC/કર્સર કૉન્ટ્રેક્ટમાં ફેરફાર કર્યા વિના.

URL વૅલિડેશન `src/shared/network/outboundUrlGuard.ts` માં રહેલા DB-મુક્ત `parseAndValidateNonMetadataUrl` હેલ્પરનો
ઉપયોગ કરે છે: `block-metadata` નીતિ. તેમાં વેબહૂક વૅલિડેટર જેવી જ અનકન્ડિશનલ મેટાડેટા/પ્રોટોકૉલ/એમ્બેડેડ-ક્રેડેન્શિયલ
તપાસો છે, જેમાં પ્રાઇવેટ URLs ને મંજૂરી આપવામાં આવે છે; પરંતુ તે ઇરાદાપૂર્વક વૈશ્વિક ફીચર-ફ્લૅગ ઓવરરાઇડ વિના
localhost/LAN ટાર્ગેટ્સને મંજૂરી આપે છે. આથી self-hosted Langfuse, Phoenix, Tempo અને Collector એન્ડપૉઇન્ટ્સ,
પ્રાઇવેટ HTTP એન્ડપૉઇન્ટ્સ સહિત, ઉપયોગ કરી શકાય છે. Cloud-metadata હોસ્ટ્સ હંમેશાં બ્લૉક કરવામાં આવે છે.
રિડાયરેક્ટ્સને અનુસરવામાં આવતા નથી, તેથી કોઈ કલેક્ટર ક્રેડેન્શિયલ્સને અલગ હોસ્ટ પર રિડાયરેક્ટ કરી શકતું નથી.
હાલના lexical URL guardની જેમ, આ DNS રિઝોલ્યુશનને પિન કરતું નથી; તેથી માત્ર ઑપરેટર-નિયંત્રિત હોસ્ટ્સ કૉન્ફિગર કરો.
જ્યારે એન્ડપૉઇન્ટ વિશ્વસનીય નેટવર્ક પર ન હોય ત્યારે HTTPS ને પ્રાધાન્ય આપો.

### પેલોડ અને ડિલિવરી

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) દરેક મંજૂર પંક્તિ માટે એક CLIENT સ્પૅન
મોકલે છે, જેનું નામ તેના ચોક્કસ રિક્વેસ્ટ પાથ પરથી રાખવામાં આવે છે. પાથનું નામ સ્પૅન નામમાં મૉડલ અથવા ઓળખ-ડેટા
સમાવેશ્યા વિના Chat Completions, Responses અને Messages વચ્ચે તફાવત કરે છે. રિસોર્સ એટ્રિબ્યુટ્સમાં `service.name`
અને પૅકેજનું `service.version` સામેલ છે.

સામાન્ય ચૅટ પ્રયાસ લૉગર (`open-sse/handlers/chatCore/attemptLogging.ts`) પૂર્ણતા સમયે
`duration = Date.now() - startTime` લખે છે અને ટાઇમસ્ટૅમ્પ પૂરું પાડતું નથી;
`src/lib/usage/callLogs.ts` માંનું `saveCallLogOperation` ટાઇમસ્ટૅમ્પને લખાણના
(પૂર્ણતાના) સમય પર ડિફૉલ્ટ કરે છે. તેથી એક્સપોર્ટ end = પંક્તિનો ટાઇમસ્ટૅમ્પ અને start = end − duration
(મિલિસેકન્ડ્સ, જેને દશાંશ નૅનોસેકન્ડ્સમાં રૂપાંતરિત કરવામાં આવે છે) સેટ કરે છે. કૉલર દ્વારા આપવામાં આવેલા ઐતિહાસિક
ટાઇમસ્ટૅમ્પ્સને પણ end સમય તરીકે જાળવવામાં આવે છે; દરેક પંક્તિ માટે start/completion ભેદક ઉપલબ્ધ નથી.
Null duration શૂન્ય બની જાય છે. અમાન્ય/ગુમ થયેલા ટાઇમસ્ટૅમ્પ્સ બિન-નિર્ધારિત સ્પૅન્સ બનાવવાને બદલે બૅચ નિષ્ફળ બનાવે છે.
`ttftMs` nullable છે અને `omniroute.ttft_ms` સાથે મેપ થાય છે.

એટ્રિબ્યુટ્સમાં `gen_ai.operation.name="chat"`, provider, requested/response model, input/output tokens,
વૈકલ્પિક cache-read/cache-creation/reasoning tokens, HTTP status, combo, cache source, session tag અને correlation id
સામેલ છે. પૂર્ણાંક OTLP મૂલ્યો અને ટાઇમસ્ટૅમ્પ્સ દશાંશ સ્ટ્રિંગ્સ હોય છે; સ્ટ્રિંગ્સ, બૂલિયન્સ અને અપૂર્ણાંક સંખ્યાઓ
તેમના મૂળ OTLP value variants નો ઉપયોગ કરે છે. Error spans માં ERROR સ્ટેટસ અને સૅનિટાઇઝ કરાયેલ status message હોય છે.
કૅનોનિકલ રેકોર્ડમાં upstream host URL નથી, તેથી `server.address` ને collector ને model server તરીકે ખોટી રીતે
ઓળખાવવાને બદલે છોડી દેવામાં આવે છે. Cost એક્સપોર્ટ કરવામાં આવતો નથી.

માત્ર `includeBodies=true` કન્ટેન્ટ હાઇડ્રેટ કરે છે. `langfuseMapping=false` સાથે,
`gen_ai.input.messages` / `gen_ai.output.messages` OmniRoute દ્વારા સંગ્રહિત સૅનિટાઇઝ કરાયેલ
request/response body JSON ધરાવે છે (પાર્સ કરી શકાય ત્યારે કૅનોનિકલાઇઝ્ડ), તેને ફરીથી આકાર આપેલા semconv
messages array તરીકે નહીં. Clipped/non-JSON bodies કાચા ટેક્સ્ટ તરીકે જ રહે છે. `langfuseMapping=true` સાથે,
બોડીઝ માત્ર `langfuse.observation.input` / `langfuse.observation.output` તરીકે મોકલવામાં આવે છે;
`gen_ai.*.messages` એટ્રિબ્યુટ્સ કાઢી નાખવામાં આવે છે જેથી દરેક બોડી એક જ વાર મોકલાય. બંને મોડ્સ હાલના hydration path
માંથી `maxBodyBytes` વારસામાં મેળવે છે; ક્લિપિંગ દર્શાવવા માટે `omniroute.bodies_truncated=true` સેટ થાય છે.
આ ડેસ્ટિનેશન દ્વારા કોઈ વધારાના pipeline snapshots અથવા unsanitized artifact reads ઉમેરવામાં આવતા નથી;
વૈકલ્પિક request-header capture નીચે વર્ણવેલા હાલના hydrated client snapshot નો ઉપયોગ કરે છે.
બોડીઝ એક્સપોર્ટ કરતી વખતે કલાકદીઠ backlog એકઠો કરવાને બદલે મિનિટ-સ્તરની cadence, જેમ કે
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` નો ઉપયોગ કરો.

### વૈકલ્પિક ક્લાયન્ટ રિક્વેસ્ટ હેડર્સ

હેડર કૅપ્ચર **ડિફૉલ્ટ રૂપે બંધ છે**. ડેસ્ટિનેશન કૉન્ફિગમાં `requestHeaderAllowlist` સેટ કરો
અને **Export prompts and responses** સક્રિય કરો (`includeBodies: true` on the destination).
Allowlist API ઍરે અથવા newline/comma-separated નામો ધરાવતા ટેક્સ્ટએરિયાને સ્વીકારે છે:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

નામો કેસને અવગણીને અને ચોક્કસ રીતે મેળ ખાતા હોવા જોઈએ, સિવાય કે એકમાત્ર અંતિમ `*` ખાલી ન હોય તેવા
header-name prefixને પસંદ કરે. ખાલી `*`, embedded wildcards અને અમાન્ય HTTP header નામો નકારવામાં આવે છે.
વધુમાં વધુ 64 selectors હોઈ શકે છે, અને દરેકનું નામ/prefix વધુમાં વધુ 256 ASCII bytesનું હોઈ શકે છે.
આ સેટિંગ `headers`થી અલગ છે, જે exporterને collector સમક્ષ પ્રમાણિત કરે છે.

Capture માત્ર `pipeline_client_request` વાંચે છે, જે સાચવેલી detailed pipelineના
`clientRawRequest` (અથવા legacy `clientRequest`)માંથી ભરાય છે. તે ક્યારેય provider request headers પર fallback કરતું નથી.
Request રેકોર્ડ થયું ત્યારે detailed pipeline logging સક્ષમ હોવું આવશ્યક હતું. `includeBodies` અક્ષમ હોય, અથવા
client-snapshot JSON ગુમ, ભ્રષ્ટ કે clipped હોય, તો કોઈ header attributes ઉત્પન્ન થતા નથી. `maxBodyBytes` વધારવાથી export-time snapshot clipping ટાળી શકાય છે;
પરંતુ ક્યારેય સાચવવામાં ન આવેલી detail પુનઃસ્થાપિત કરી શકાતી નથી. 1 MiBથી મોટું અથવા
256થી વધુ header entries ધરાવતું snapshot અવગણવામાં આવે છે. હાલનું prompt/response export header captureની સાથે સક્ષમ રહે છે;
allowlist headers-only hydration mode પ્રદાન કરતી નથી.

પસંદ કરેલી કિંમતો `http.request.header.<full lowercase header name>` OTLP string arrays બને છે,
એક જ string માટે પણ. ઉદાહરણ તરીકે, `X-OmniRoute-Meta-Team: example-team` બને છે
`http.request.header.x-omniroute-meta-team` અને
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
સંપૂર્ણ prefix જાળવવામાં આવે છે: આ સામાન્ય headers છે, જેમાં કોઈ business-field parsing અથવા
`omniroute.metadata.*` / Langfuse metadata conversion થતું નથી. `langfuseMapping` header semantics બદલતું નથી. પસંદ કરેલું single-valued
`User-Agent` પ્રમાણભૂત scalar `user_agent.original` પણ સેટ કરે છે. એક જ valueની અંદરના commas split થતા નથી.
Case variants સાચવેલી entry orderમાં merge થાય છે; કોઈપણ અમાન્ય variant હોય તો તે સંપૂર્ણ header છોડી દેવામાં આવે છે.
Attributes lowercase નામ પ્રમાણે ગોઠવાય છે.

Authorization, Proxy-Authorization, Cookie, Set-Cookie, API-key headers, auth/token/secret/password/credential markers ધરાવતા
નામો અને આંતરિક gateway credentials હંમેશાં બાકાત રાખવામાં આવે છે, ભલે તે પસંદ કરેલા હોય અથવા storageમાં આંશિક રીતે masked હોય.
જાણીતી credential patterns shared credential detectorનો પુનઃઉપયોગ કરે છે; redaction markersને અવગણવામાં આવે છે, safe values તરીકે export કરવામાં આવતા નથી.
માત્ર strings અને ખાલી ન હોય તેવી string arrays સ્વીકારવામાં આવે છે; numbers અથવા objectsને coerce કરવામાં આવતા નથી.
અમાન્ય નામો, prototype keys, control characters (horizontal tab સિવાય) અને malformed Unicodeને batch નિષ્ફળ કર્યા વિના
અવગણવામાં આવે છે અને તેમનું content errorsમાં પ્રતિબિંબિત થતું નથી.

દરેક span વધુમાં વધુ 32 headers, દરેક header દીઠ 16 values, દરેક value દીઠ 4096 UTF-8 bytes,
અને capture કરાયેલા header names અને values માટે કુલ 16384 UTF-8 bytes capture કરે છે. કદમાં મોટા/અમાન્ય headersને આખા અવગણવામાં આવે છે, clip કરવામાં આવતા નથી.
Selection એ operator privacy decision છે: સુરક્ષિત દેખાતા નામોમાં પણ વ્યક્તિગત માહિતી હોઈ શકે છે, અને આ મર્યાદાઓ/detectors સામાન્ય PII scrubber નથી.

### Delivery limits

Requests વધુમાં વધુ 500 spans અને 4 MiB UTF-8 JSON સુધી મર્યાદિત છે, જેમાં envelopeનો પણ સમાવેશ થાય છે.
cursor batchની પ્રથમ request પહેલાં દરેક allowed spanનું size-check કરવામાં આવે છે. મર્યાદા કરતાં મોટો individual
span તે batchનો કોઈ ભાગ મોકલતો નથી અને `maxBodyBytes` ઘટાડવા માટેની guidance સાથે નિષ્ફળ જાય છે; તેને શાંતિથી drop કરવામાં આવતો નથી.
Preflight માત્ર record references અને byte counts જાળવે છે અને દરેક temporary span/JSONને discard કરે છે; batchની બીજી serialized copy
ધરાવવાને બદલે bounded chunks માટે spans ફરીથી બનાવવામાં આવે છે. HTTP 408/429/5xx, network failures અને timeoutsને વધુમાં વધુ
ત્રણ attempts મળે છે, જેમાં 250/500 ms exponential backoff હોય છે. `Retry-After` seconds અથવા HTTP dates delayને
5 seconds સુધી લંબાવી શકે છે. અન્ય statuses તરત નિષ્ફળ જાય છે. OTLP 2xx partial rejection પણ lost spanને acknowledge કરવાને બદલે
throw કરે છે; empty અથવા valid JSON acknowledgements સ્વીકારવામાં આવે છે, અને response-read cap
64 KiB છે.

Errorsમાં માત્ર exporter-owned facts હોય છે: HTTP status, retry class, attempts અને sent span
counts, અથવા fixed acknowledgement/network failure wording. Collector response bodies,
partial-success counts અને response headers ક્યારેય errors, logs અથવા dashboardમાં copy કરવામાં આવતા નથી.
નિષ્ફળ અથવા આંશિક રીતે સ્વીકારાયેલ batch acknowledge થતો નથી: destination તે status સાથે
Failing દર્શાવે છે, cursor છેલ્લી acknowledged batch પર જ રહે છે, અને આગળનું run
એ જ rows ફરીથી મોકલે છે. Permanent statuses collector અથવા configuration ઠીક થાય ત્યાં સુધી failing રહે છે.
Response details માટે collectorના પોતાના logsનો ઉપયોગ કરો. Call-log error summariesમાં તેમનું અલગ redaction જળવાય છે.
`prepare()` કંઈ provision કરતું નથી; Test ચોક્કસ `{"resourceSpans":[]}` post કરે છે અને call-log spans લખ્યા વિના
HTTP status report કરે છે.

Trace ids અને span ids SHA-256ના પ્રથમ 32/16 hex digits છે, જે
`"omniroute.trace\\0" + callLogId` અને `"omniroute.span\\0" + callLogId` પર ગણવામાં આવે છે. Re-sendsમાં
સમાન ids રહે છે. આ deduplicationની guarantee નથી: Langfuse
v4 ingestion સહિત કેટલાક backends સમાન-id spansને deduplicate કરતા નથી. Crash અથવા partial chunk failure વધુમાં વધુ એક unacknowledged cursor batchને ફરીથી
મોકલી શકે છે; માત્ર તેનો છેલ્લો HTTP chunk નહીં, પરંતુ તે સંપૂર્ણ batch duplicate થઈ શકે છે. આ tradeoff ધ્યાનમાં રાખીને
cursor batch size પસંદ કરો.

### Langfuse example

Self-hosted Langfuse instance માટે આ fields configure કરો:

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

Authorization value સ્થાનિક રીતે literal `public-key:secret-key`
stringના Base64 તરીકે બનાવો (ઉદાહરણ તરીકે `Buffer.from(publicKey + ":" + secretKey).toString("base64")`થી).
વાસ્તવિક credentialsને logs, screenshots અથવા issuesમાં paste કરશો નહીં. Mapping આપમેળે
`x-langfuse-ingestion-version: 4` સેટ કરે છે; Authorization હજુ પણ `headers`માં આપવું પડે છે.
બંને headers અને ઉત્પન્ન થયેલું identity salt હાલની encrypted secret-field mechanism અને API placeholdersનો ઉપયોગ કરે છે;
`STORAGE_ENCRYPTION_KEY` જરૂરી છે.

મેપિંગ જનરેશન પ્રકાર/મોડેલ, JSON વપરાશ વિગતો (ઇનપુટ/આઉટપુટ/કુલ અને ઉપલબ્ધ
કૅશ કીઓ), JSON ઇનપુટ/આઉટપુટ સ્નૅપશૉટ્સ, ERROR/DEFAULT સ્તર, સેનિટાઇઝ્ડ સ્થિતિ સંદેશ,
ટ્રેસ નામ, સેશન ID, વૈકલ્પિક પર્યાવરણ અને પ્રોવાઇડર, વિનંતી કરાયેલ મોડેલ, પાથ, કોમ્બો, કૅશ
સ્રોત અને સ્થિતિ માટે ફિલ્ટર કરી શકાય તેવું `langfuse.observation.metadata.<key>` ઉમેરે છે.
`langfuse.observation.completion_start_time` ISO 8601 સ્વરૂપમાં શરૂઆતના સમય + TTFT તરીકે
માત્ર ત્યારે હોય છે જ્યારે TTFT જાણીતું હોય અને અવધિની અંદર હોય. કોઈ ખર્ચ એટ્રિબ્યુટ મોકલવામાં
આવતા નથી.

ઓળખ મોડ્સ `langfuse.user.id` પર લાગુ પડે છે:

- `pseudonymous` (ડિફૉલ્ટ): રૅન્ડમ પ્રતિ-ડેસ્ટિનેશન 32-બાઇટ સૉલ્ટ સાથે API કીની આંતરિક IDનું HMAC-SHA256. સૉલ્ટ બનાવતી વખતે ગેરહાજર હોય તો બનાવવામાં આવે છે, `identitySalt` તરીકે એન્ક્રિપ્ટ કરવામાં આવે છે, ક્યારેય પરત કરવામાં આવતું નથી અને સંપાદનો દરમિયાન જાળવવામાં આવે છે. કાચી કી IDs ક્યારેય span એટ્રિબ્યુટ્સમાં મૂકવામાં આવતી નથી. ડેસ્ટિનેશનનો સૉલ્ટ ફરી બનાવવાથી/ફેરવવાથી ઓળખો બદલાય છે.
- `keyName`: ગોઠવેલ API કીનું નામ, જે ઑપરેટર લેબલને ઇરાદાપૂર્વક જાહેર કરે છે.
- `none`: કોઈ વપરાશકર્તા ID નહીં. હાજર હોય ત્યારે સેશન ટૅગ્સ હજી પણ નિકાસ કરવામાં આવે છે; આ મોડ્સ મનસ્વી પ્રોમ્પ્ટ સામગ્રી અથવા ઑપરેટર દ્વારા પૂરા પાડવામાં આવેલા સેશન/કૉરિલેશન લેબલ્સને અનામી બનાવતા નથી.

### બૅકફિલ વિના શરૂઆત

માત્ર બનાવતી વખતે, **Start from current position (skip existing logs)** સક્ષમ કરો અથવા create API પેલોડના ટોચના સ્તરે
`startFromCurrentPosition: true` પાસ કરો. આ હાલના જાળવાયેલા કૉલ-લૉગ rowidના મહત્તમ મૂલ્ય પર
હાલના cursor helpersનો ઉપયોગ કરીને `cursor_row_id` આરંભિત કરે છે, અને તેના માટે માઇગ્રેશન જરૂરી નથી.
ડિફૉલ્ટ false છે (cursor 0 અને જાળવાયેલા ઇતિહાસનું બૅકફિલ).
આ અપડેટ-સમયની cursor રીસેટ સેટિંગ નથી.

સાંઝા `ttftMs` ઉમેરામાં BigQuery મૅપર અને નવી-ટેબલ સ્કીમામાં nullable `ttft_ms` કૉલમ પણ ઉમેરવામાં આવે
છે: તેની સ્કીમા ટેસ્ટ માટે દરેક કૅનોનિકલ રેકોર્ડ ફીલ્ડ માટે એક કૉલમ હોવી જરૂરી છે. હાલના ટેબલો
અપરિવર્તિત રીતે નિકાસ કરવાનું ચાલુ રાખે છે: `prepare()` ટેબલની સ્કીમા વાંચે છે અને માત્ર ત્યારે જ
`ttft_ms` દૂર કરે છે જ્યારે તે કૉલમ ગેરહાજર હોય. આગામી રનથી TTFT મેળવવા માટે nullable INT64 કૉલમ ઉમેરો,
અથવા નવું ટેબલ વાપરો. વૈકલ્પિક TTFT કૉલમ સ્કીમા અપડેટને ટ્રિગર કરતી નથી. વપરાશ-પુરાવા કૉલમ્સ
નીચે આપેલા શરતી, opt-in સુસંગતતા પ્રવાહને અનુસરે છે; અન્ય પંક્તિ ફીલ્ડ્સ કડક સ્કીમા ચકાસણી જાળવી
રાખે છે.

---

## 6. ડેસ્ટિનેશન ઉમેરવું

1. `LogExportDestinationType` એક્સપોર્ટ કરતી `src/lib/logExport/destinations/<name>.ts` બનાવો:
   Zod `configSchema`, UI માટે `fields` ડિસ્ક્રિપ્ટર એરે, `secretFields`, અને
   `test()` / `prepare()` / `send(records)` પરત આપતું `createClient(config)`.
2. તેને `src/lib/logExport/registry.ts` માંના `DESTINATIONS` એરેમાં ઉમેરો.
3. `tests/unit/` હેઠળ ટેસ્ટ લખો.

આટલો જ ફેરફાર કરવાનો છે: પર્સિસ્ટન્સ, cron જોબ, REST લેયર, સિક્રેટ એન્ક્રિપ્શન અને
ડેશબોર્ડ ફોર્મ બધાં રજિસ્ટ્રી વાંચે છે.

નવા ડેસ્ટિનેશન માટે બે નિયમો:

- આંશિક નિષ્ફળતા પર `send()` **એક્સેપ્શન થ્રો કરવું જ જોઈએ**. સફળતાપૂર્વક પૂર્ણ થવાનો અર્થ છે "ડેસ્ટિનેશન પાસે આ પંક્તિઓ છે",
  અને કર્સર કાયમી ધોરણે તેમની આગળ વધી જાય છે.
- વપરાશકર્તાએ આપેલો URL સ્વીકારતું ડેસ્ટિનેશન ફેચ કરતાં પહેલાં
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) દ્વારા તેની માન્યતા ચકાસે તે જરૂરી છે,
  જેમ વેબહૂક કરે છે. BigQuery ને આની જરૂર નથી: તેના હોસ્ટ સ્થિર છે.

---

## 7. તેનું સંચાલન

- **ડેશબોર્ડ**: Integrations → Log export. ગંતવ્ય ઉમેરો, ઓળખપત્રો ચકાસવા માટે **Test** ચલાવો
  અને પંક્તિઓ લખ્યા વિના તેને સક્ષમ કરો.
- **બેકલૉગ**: દરેક ગંતવ્ય કાર્ડમાં બાકી રહેલી પંક્તિઓ અને કર્સર દેખાય છે; `GET
/api/log-export/status` એ જ આંકડા ઉપરાંત છેલ્લી 20 જોબ રન પરત કરે છે.
- **એક ગંતવ્ય નિષ્ફળ જાય તો અન્ય ગંતવ્યો નિષ્ફળ જતા નથી** — રન સારાંશમાં `last_status` /
  `last_error`માં ગંતવ્ય-દીઠ સ્થિતિ નોંધાય છે, અને જોબ રન ઇતિહાસમાં એકંદર સ્થિતિ જળવાય છે.
- **ગંતવ્ય કાઢી નાખવાથી તેનું કર્સર કાઢી નાખવામાં આવે છે.** તેને ફરી ઉમેરવાથી સૌથી જૂના જાળવેલા
  કૉલ લૉગથી શરૂઆત થાય છે, જેથી ગંતવ્ય પાસે પહેલેથી રહેલી પંક્તિઓ ફરી મોકલાય છે. BigQueryમાં
  દરેક પંક્તિનું `insertId` આને માત્ર BigQueryની પોતાની ડી-ડુપ્લિકેશન વિન્ડોમાં જ શોષી શકે છે,
  તેથી ગંતવ્ય કાઢી નાખવા કરતાં તેને અક્ષમ કરવાનું પસંદ કરો.

### ઉપયોગ-પુરાવા સ્કીમા સુસંગતતા

નવા BigQuery કોષ્ટકોમાં nullable `usage_evidence` (JSON ધરાવતું STRING) અને
`usage_estimated` (BOOL) સામેલ હોય છે. `autoCreate` સક્ષમ હોય ત્યારે, અસ્તિત્વમાં રહેલા કોષ્ટકમાં
માત્ર આ ખૂટતા nullable કૉલમ્સ ઉમેરાઈ શકે છે. એક્સપોર્ટર ક્ષેત્ર મેટાડેટા સહિતની સંપૂર્ણ અસ્તિત્વમાં રહેલી
સ્કીમા જાળવે છે અને પરત મળેલા etagનો ઉપયોગ કરીને શરતી PATCH મોકલે છે. એકસાથે થયેલો સ્કીમા
ફેરફાર એક્સપોર્ટને નિષ્ફળ બનાવે છે, તેને ઓવરરાઇટ કરતો નથી; આગલી રન દરમિયાન કોષ્ટક ફરી વાંચવામાં આવે છે.

`autoCreate` અક્ષમ હોય ત્યારે, usage evidence ધરાવતા રેકોર્ડ્સ એક્સપોર્ટ કરતાં પહેલાં આ કૉલમ્સ
તમારે જાતે ઉમેરવા પડશે. ખૂટતું સ્કીમા/etag મેટાડેટા અથવા નિષ્ફળ અપડેટ પણ પુરાવા ધરાવતા
ઇન્સર્ટ્સને અટકાવે છે. આ નિષ્ફળતા પર એક્સપોર્ટ કર્સર આગળ વધતો નથી અને પુરાવો ક્યારેય
ચૂપચાપ છોડવામાં આવતો નથી. એક્સપોર્ટ અટકેલું હોય ત્યારે પણ સ્થાનિક લૉગ જાળવણી લાગુ રહે છે,
તેથી જાળવેલી સ્રોત પંક્તિઓની અવધિ પૂરી થાય તે પહેલાં નિષ્ફળતા ઉકેલો.
