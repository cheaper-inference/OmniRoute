# Log export (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

OmniRoute કૉલ લૉગ્સનું બાહ્ય એનાલિટિક્સ સ્ટોરમાં સતત, ઇન્ક્રિમેન્ટલ નિકાસ.

Logs ડૅશબોર્ડ ટૅબ વિનંતી ઇતિહાસને SQLite (`call_logs`)માં રાખે છે, જે રોટેશન અને રિટેન્શન દ્વારા
મર્યાદિત હોય છે. લૉગ નિકાસ એ જ રેકોર્ડ સેટને નિર્ધારિત સમયપત્રક મુજબ બહાર મોકલે છે, જેથી તે
સ્થાનિક ડેટાબેઝ કરતાં વધુ સમય સુધી જળવાઈ શકે અને અન્ય ડેટા સાથે જોડી શકાય. BigQuery પ્રથમ ગંતવ્ય છે;
પાઇપલાઇન એક રજિસ્ટ્રી છે, તેથી વધુ ગંતવ્યો ઉમેરવા સરળ છે.

---

## 1. તે કેવી રીતે કાર્ય કરે છે

```
સર્વર (કૉન્ફિગ ડિક્રિપ્ટ + માન્ય કરો, કર્સરનું સમાધાન કરો)
  → IPC શરૂ કરો → અલગ કરેલી exportChild OS પ્રોસેસ
    → માત્ર-વાંચન storage.sqlite → શેર કરેલી કૉલ-લૉગ ક્વેરી/મેપિંગ
      → અસિંક્રોનસ આર્ટિફેક્ટ હાઇડ્રેશન → ડેસ્ટિનેશન prepare()/send()
        → બૅચ IPC → સર્વર કર્સર સાચવે છે → ack IPC
          → આગલી બૅચ; done IPC → સર્વર સફળતા નોંધે છે
```

- **શેડ્યૂલ** — એક `JobRegistry` cron જૉબ, `log_export`, જેનું ડિફૉલ્ટ `0 * * * *` (દર કલાકે,
  UTC) છે. `src/lib/initCloudSync.ts`માં નોંધાયેલું; `OMNIROUTE_LOG_EXPORT_CRON` વડે ઓવરરાઇડ
  કરી શકાય છે. દરેક ટિક બધા **સક્ષમ** ડેસ્ટિનેશનને ક્રમિક રીતે સંપૂર્ણપણે પ્રોસેસ કરે છે.
- **કર્સર** — SQLiteનું અંતર્નિહિત `call_logs.rowid`, જે દરેક ડેસ્ટિનેશન માટે
  `log_export_destinations.cursor_row_id`માં સાચવવામાં આવે છે. `timestamp`ને જાણીજોઈને કર્સર
  બનાવવામાં આવ્યું નથી: કૉલર પોતાનું મૂલ્ય આપી શકે છે, તેથી ધીમી રિક્વેસ્ટ તેના કરતાં પછી શરૂ
  થયેલી ઝડપી રિક્વેસ્ટ બાદ લખાઈ શકે છે અને timestamp કર્સર તેને છોડી દેશે.
- **બૅચિંગ** — દરેક રિક્વેસ્ટ દીઠ `batch_size` પંક્તિઓ (ડિફૉલ્ટ 500), દરેક રન દીઠ
  `max_rows_per_run` પંક્તિઓ (ડિફૉલ્ટ 10000), જેથી મોટો બૅકલૉગ એક રનને અવરોધવાને બદલે
  અનેક ટિકમાં પ્રોસેસ થાય.
- **ડિલિવરી** — `send()` પૂર્ણ થાય ત્યાર બાદ જ કર્સર આગળ વધે છે. નિષ્ફળ બૅચ કર્સરને તેની
  હાલની જગ્યાએ જ રાખે છે, તેથી આગલા રનમાં એ જ પંક્તિઓનો ફરી પ્રયાસ થાય છે. ગેરંટી વાસ્તવિક
  exactly-once નહીં, પરંતુ at-least-once સાથે ડેસ્ટિનેશન-તરફી ડિ-ડુપ્લિકેશનની છે: BigQuery દરેક
  પંક્તિને કૉલ-લૉગ id દ્વારા કી કરે છે, જેને તે પોતાની ડિડુપ વિન્ડોમાં best-effort ધોરણે માન આપે છે.
- **ઓવરલૅપ ગાર્ડ** — cron ટિક અને `POST .../run` એકસાથે ટ્રિગર થઈ શકે છે. પહેલેથી પ્રોસેસ
  થઈ રહેલા ડેસ્ટિનેશનને બીજી વાર પ્રોસેસ કરવાને બદલે છોડી દેવામાં આવે છે (રન પરિણામમાં
  `skipped: true`), જેથી સમકાલીન રન કોઈ બૅચ ફરી મોકલી ન શકે અથવા કર્સરને પાછળ ન લખી શકે.
- **પર્જ રિકવરી** — જો `cursor_row_id`, `MAX(rowid)` કરતાં ઉપર પહોંચી જાય (આખું ટેબલ પર્જ
  થયું હોય અને rowid ફરી શરૂ થયા હોય), તો રનર કાયમ માટે ડેટા જોવાનું ચૂકી જવાને બદલે 0 પર
  પાછું ફરે છે.

### અલગ કરેલો રનર અને મર્યાદાઓ

Node પર દરેક ડેસ્ટિનેશન રન એક અલગ, ટૂંકા સમય માટે ચાલતી OS ચાઇલ્ડ પ્રોસેસ (`child_process`
સાથે IPC, `worker_threads` નહીં) શરૂ કરે છે. બૉડી વાંચન, પેલોડ JSON પાર્સિંગ/સિરિયલાઇઝેશન,
ડેસ્ટિનેશન `prepare()` અને ડેસ્ટિનેશન નેટવર્ક I/O—આ બધું ત્યાં ચાલે છે, સર્વરના ઇવેન્ટ લૂપ પર નહીં.
IPC મારફતે માત્ર કૉન્ફિગ્યુરેશન અને નાના પ્રગતિ સંદેશાઓ પસાર થાય છે; એક્સપોર્ટ કરાયેલા રેકોર્ડ
ક્યારેય સર્વર પર પાછા આવતા નથી. cron જૉબ અને Run now રૂટ એ જ જાહેર પરિણામ અને ઓવરલૅપ
ગાર્ડ જાળવે છે.

ચાઇલ્ડ, સર્વર દ્વારા રિઝૉલ્વ કરાયેલા `DATA_DIR/storage.sqlite`ને `node:sqlite` વડે માત્ર-વાંચન
મોડમાં ખોલે છે, જેમાં `busy_timeout=5000` અને `query_only=ON` હોય છે. તે કોઈ DB singleton
ઇમ્પોર્ટ કરતું નથી અને કોઈ માઇગ્રેશન, બૅકઅપ અથવા SQLite અપડેટ કરતું નથી. ગુમ/દૂષિત
આર્ટિફેક્ટનું બુકકીપિંગ (દૂષિત-આર્ટિફેક્ટ UPDATE સહિત) માત્ર ડૅશબોર્ડ ડિટેલ પાથમાં જ રહે છે.
બંને પાથ એક શુદ્ધ ડિટેલ રિઝૉલ્વર શેર કરે છે; એક્સપોર્ટ અસિંક્રોનસ ફાઇલસિસ્ટમ વાંચન અને સમાન
આર્ટિફેક્ટ → લેગસી ઇનલાઇન → લેગસી ડિસ્ક → કંઈ નહીં રિઝૉલ્યુશન ક્રમનો ઉપયોગ કરે છે. ચાઇલ્ડ
પોતાનું રીડર ખોલે ત્યારે રન મહત્તમ ઇન્સર્શન rowidનો સ્નૅપશૉટ લે છે; પછીના ઇન્સર્ટ આગલા રનની
રાહ જુએ છે. આ ઇન્સર્શન બાઉન્ડરી છે, લાંબા સમયની SQLite ટ્રાન્ઝૅક્શન નહીં: નેટવર્કની રાહ
દરમિયાન WAL રાઇટર અને ચેકપૉઇન્ટ મુક્ત રહે છે. હાલની પંક્તિઓના અપડેટ/ડિલીટ આ બાઉન્ડરી દ્વારા
સ્થિર કરવામાં આવતા નથી.

દરેક સ્વીકારેલી બૅચ પછી ચાઇલ્ડ સ્વીકૃતિની રાહ જુએ છે. સર્વર પહેલાં
`advanceLogExportCursor` વડે કર્સર સાચવે છે, ત્યાર બાદ `ack` મોકલે છે; તે પહેલાં આગલી બૅચ
શરૂ થતી નથી. મોકલવામાં નિષ્ફળતા, ક્રૅશ અથવા ટાઇમઆઉટ એ બૅચનો કર્સર આગળ વધાર્યા વિના
નિષ્ફળતા નોંધે છે. અગાઉ સ્વીકારાયેલી બૅચ કમિટ થયેલી રહે છે; વધુમાં વધુ એક અસ્વીકૃત બૅચ ફરી
મોકલાઈ શકે છે. `done` અને ચાઇલ્ડના સ્વચ્છ એક્ઝિટ પછી જ સફળતા નોંધાય છે. નિષ્ફળતા વખતે
ચાઇલ્ડને SIGTERM વડે સમાપ્ત કરવામાં આવે છે, 500 ms પછી SIGKILL સુધી વધારવામાં આવે છે,
અને રનર પ્રોસેસ બંધ થવાની રાહ જુએ છે.

| પર્યાવરણ વેરિએબલ                              | ડિફૉલ્ટ | હેતુ                                    |
| --------------------------------------------- | ------- | --------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000  | દરેક ડેસ્ટિનેશન માટે wall-clock મર્યાદા |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024    | ચાઇલ્ડ V8 old-space મર્યાદા, MBમાં      |

અમાન્ય/શૂન્ય કે નકારાત્મક/અપૂર્ણાંક મૂલ્યો માટે ડિફૉલ્ટનો ઉપયોગ થાય છે. heap સેટિંગ કુલ
RSS મર્યાદા નથી; બહુ મોટી બૅચ હજુ પણ ચાઇલ્ડની મેમરી ખતમ કરી શકે છે અને રનને સુરક્ષિત રીતે
નિષ્ફળ કરી શકે છે. 1024 MBનું ડિફૉલ્ટ, બૉડી સક્ષમ હોય ત્યારે 512 KiB આર્ટિફેક્ટની ડિફૉલ્ટ
500-પંક્તિ બૅચ માટે પૂરતી વધારાની જગ્યા રાખે છે, જેમાં BigQueryનું byte-chunked JSON
સિરિયલાઇઝેશન પણ સામેલ છે. તે 10000-પંક્તિની બૉડી બૅચને સુરક્ષિત બનાવતું નથી. V8 heap
ખતમ થવા પર પગલું લઈ શકાય તેવી નિષ્ફળતા નોંધાય છે: બૅચનું કદ ઘટાડો અથવા
`OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` વધારો; કર્સર છેલ્લી સ્વીકારેલી બૅચ પર
જ રહે છે. ઐતિહાસિક ઇનલાઇન/ડિસ્ક બૉડી આધુનિક આર્ટિફેક્ટ મર્યાદામાં આવતી નથી. ઑપરેટરોએ
RSS માટે અલગથી ક્ષમતા ફાળવવી આવશ્યક છે, ખાસ કરીને મેમરી-મર્યાદિત કન્ટેનરમાં.

ચાઇલ્ડને માત્ર રિઝૉલ્વ કરેલું `DATA_DIR`, `NODE_ENV`, સ્પષ્ટ `TZ` (લેગસી ફાઇલનામના સ્થાનિક-સમય
રિઝૉલ્યુશન માટે), હાજર હોય ત્યારે `ELECTRON_RUN_AS_NODE`, અને નીચેના આઉટબાઉન્ડ ઇનપુટ
વારસામાં મળે છે:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (અને તેમના lowercase સ્વરૂપો),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
ગ્લોબલ Undici dispatcher સર્વરના શુદ્ધ environment-proxy રિઝૉલ્યુશન અને local-host બાયપાસ
નિયમો શેર કરે છે, જેમાં `NO_PROXY`નો સમાવેશ થાય છે; તે `proxyFetch.ts` અથવા તેના DB/feature
flags ઇમ્પોર્ટ કરતું નથી. ફૉર્વર્ડ કરેલા આઉટપુટ અને નોંધાયેલી ભૂલોમાંથી પ્રૉક્સી ક્રેડેન્શિયલ
રિડૅક્ટ કરવામાં આવે છે. ડેસ્ટિનેશન ક્રેડેન્શિયલ માત્ર એક start IPC સંદેશામાં જ જાય છે, argv અથવા
environmentમાં ક્યારેય નહીં; આઉટપુટ/એરર ફૉર્વર્ડિંગમાં પ્રિફિક્સ ઉમેરાય છે અને તેને સૅનિટાઇઝ
કરવામાં આવે છે. દરેક cron રનમાં Nodeની SQLite ચેતવણીનું પુનરાવર્તન ટાળવા માટે ચાઇલ્ડના exec
આર્ગ્યુમેન્ટમાં માત્ર `ExperimentalWarning` અક્ષમ કરવામાં આવે છે; અન્ય પ્રકારની ચેતવણીઓ દેખાતી
રહે છે.

ગંતવ્ય મૉડ્યુલો Next.js/server-only નિર્ભરતાઓ વિના આયાત કરી શકાય તેવાં હોવા જોઈએ. હાલનું
BigQuery અમલીકરણ પહેલેથી જ આ કરારનું પાલન કરે છે. Access-token કૅશ ફક્ત child
run સુધી જ રહે છે, અલગ-અલગ runs વચ્ચે નહીં. Node સમર્થિત runtime છે (`package.json` engines), પરંતુ READMEનો Bun
ઇન્સ્ટોલેશન વિભાગ અને `Dockerfile.bun` પણ `bun:sqlite` (`src/lib/db/core.ts` / adapters) નો ઉપયોગ કરતો
પ્રોડક્શન સુસંગતતા માર્ગ દર્શાવે છે. તેથી Bun હેઠળ, exports અગાઉનો
in-process માર્ગ જાળવી રાખે છે અને એક વખત ચેતવણી આપે છે: child heap/timeout isolation ઉપલબ્ધ નથી. Event-loop
અને OOM isolation માટે Nodeનો ઉપયોગ કરો; અહીં Bunને માત્ર dev માટેનું માનવામાં આવતું નથી.

જ્યારે `includeBodies` સક્ષમ હોય, ત્યારે કલાકદીઠ payload backlog એકઠો કરવાને બદલે
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` જેવી મિનિટ-સ્તરની આવર્તન ગતિને પ્રાધાન્ય આપો.
Batch અને row મર્યાદાઓ હજુ પણ દરેક runને મર્યાદિત રાખે છે. Process startupનો ખર્ચ દરેક runમાં દરેક ગંતવ્ય માટે થાય છે;
આ થોડા startup ખર્ચના બદલામાં server event-loop isolation આપે છે, કુલ CPU ઉપયોગ ઘટાડતું નથી.

### Payloads (prompts અને completions)

મૂળભૂત રીતે exportમાં ફક્ત Logsની **સૂચિ**માં દેખાતાં summary fields હોય છે. **Prompts અને responses export કરો**
(`includeBodies`) ચાલુ કરવાથી દરેક call માટે Logsની **વિગત**
paneમાં દેખાતી માહિતી પણ મોકલવામાં આવે છે:

| Field                            | તેમાં શું હોય છે                                        |
| -------------------------------- | ------------------------------------------------------- |
| `request_body` / `response_body` | Dashboard જે રીતે દર્શાવે છે તે call payloads           |
| `pipeline_route_decision`        | Routerએ કયું target અને model પસંદ કર્યું               |
| `pipeline_client_request`        | Clientએ મોકલેલી બરાબર એ જ raw request                   |
| `pipeline_openai_request`        | આંતરિક OpenAI shapeમાં રૂપાંતર કર્યા પછીની request      |
| `pipeline_provider_request`      | Provider dialectમાં upstreamને ખરેખર મોકલેલી request    |
| `pipeline_provider_response`     | Raw upstream response                                   |
| `pipeline_client_response`       | Callerને પરત આપવામાં આવેલ response                      |
| `pipeline_error`                 | નિષ્ફળ call માટે pipeline-સ્તરની error વિગત             |
| `bodies_truncated`               | ઉપરનું કોઈ field `maxBodyBytes` સુધી પહોંચે ત્યારે True |

આ prompt content છે, તેથી તે **મૂળભૂત રીતે બંધ** હોય છે અને ઇરાદાપૂર્વક દરેક ગંતવ્ય માટે અલગ પસંદગી છે.
જે મોકલાય છે તે dashboardમાં દેખાતું હોય છે, કારણ કે export અને `getCallLogById` એકસરખી detail
resolution પ્રક્રિયા વાપરે છે: payloads લખવામાં આવે ત્યારે જ
PII-sanitised અને secret-redacted હોય છે, અને `noLog` API key વડે કરાયેલ call કોઈ payload સંગ્રહતું જ નથી,
તેથી export કરવા માટે કંઈ હોતું નથી.

Payloads filesystem artifactમાંથી દરેક row દીઠ વાંચવામાં આવે છે, તેથી hydration ફક્ત તેની વિનંતી કરનારાં ગંતવ્યો
માટે જ ચાલે છે. ગુમ થયેલું અથવા દૂષિત artifact batchને નિષ્ફળ બનાવી cursorને અટકાવવાને બદલે
null payloads સાથે તેનો summary export કરે છે.

`maxBodyBytes` (મૂળભૂત મૂલ્ય 262144) દરેક fieldને મર્યાદિત કરે છે. લાંબા payloadsને **દૂર કરવાને બદલે
ટૂંકાવવામાં આવે છે** — કાપેલો prompt હજી પણ "શું પૂછવામાં આવ્યું હતું" તેનો જવાબ આપે છે — અને rowને
`bodies_truncated` વડે ચિહ્નિત કરવામાં આવે છે. Stream કરાયેલા chunk-by-chunk deltas export થતા નથી; સંયોજિત response
પહેલેથી જ `pipeline_provider_response` અને `pipeline_client_response`માં હોય છે.

---

## 2. ફાઇલો

| ભાગ                     | સ્થાન                                        |
| ----------------------- | -------------------------------------------- |
| ગંતવ્ય કોન્ટ્રાક્ટ      | `src/lib/logExport/types.ts`                 |
| રજિસ્ટ્રી               | `src/lib/logExport/registry.ts`              |
| સિક્રેટ હેન્ડલિંગ       | `src/lib/logExport/secrets.ts`               |
| રનર (પેરેન્ટ IPC)       | `src/lib/logExport/runner.ts`                |
| પ્રોસેસ લાઇફસાઇકલ       | `src/lib/logExport/childRunner.ts`           |
| ચાઇલ્ડ એન્ટ્રી          | `src/lib/logExport/exportChild.ts`           |
| રીડ-ઓનલી ઓપનર           | `src/lib/db/logExportReadOnly.ts`            |
| શેર કરેલી ક્વેરી/મેપિંગ | `src/lib/usage/callLogExportQueries.ts`      |
| વિગત રિઝોલ્વર           | `src/lib/usage/callLogDetailResolver.ts`     |
| API પ્રોજેક્શન          | `src/lib/logExport/presenter.ts`             |
| BigQuery ગંતવ્ય         | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA પ્રમાણીકરણ    | `src/lib/logExport/googleServiceAccount.ts`  |
| કૉલ-લૉગ સ્રોત           | `src/lib/usage/callLogExportSource.ts`       |
| પર્સિસ્ટન્સ             | `src/lib/db/logExportDestinations.ts`        |
| Cron જૉબ                | `src/lib/jobs/logExportJob.ts`               |
| REST સ્તર               | `src/app/api/log-export/`                    |
| ડૅશબોર્ડ પેજ            | `src/app/(dashboard)/dashboard/log-export/`  |

સ્કીમા: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

બધા રૂટ્સ મેનેજમેન્ટ-ઑથેન્ટિકેટેડ (`requireManagementAuth`) છે. સિક્રેટ્સ ક્યારેય પરત કરવામાં આવતાં નથી:
સંગ્રહિત સિક્રેટ શાબ્દિક મૂલ્ય `__stored__` તરીકે પરત આવે છે, અને અપડેટ વખતે એ મૂલ્ય પાછું મોકલવાથી
સંગ્રહિત ક્રેડેન્શિયલ જળવાઈ રહે છે.

જે ડેસ્ટિનેશનના પ્રકારમાં સિક્રેટ જાહેર કરવામાં આવ્યું હોય તેને બનાવવા અથવા અપડેટ કરવા માટે
**`STORAGE_ENCRYPTION_KEY` આવશ્યક છે**. તેના વિના `encrypt()` કોઈ સૂચના આપ્યા વગર પાસથ્રૂ કરે છે,
તેથી SQLiteમાં ક્રેડેન્શિયલને પ્લેઇનટેક્સ્ટમાં મૂકવાને બદલે રાઇટને 400 સાથે નકારવામાં આવે છે (Telegram
વેબહૂક પણ આ જ સુરક્ષા લાગુ કરે છે).

| પદ્ધતિ   | પાથ                                      | હેતુ                                              |
| -------- | ---------------------------------------- | ------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | ડેસ્ટિનેશનના પ્રકારો + તેમની કૉન્ફિગ ફીલ્ડની સૂચિ |
| `GET`    | `/api/log-export/destinations`           | ડેસ્ટિનેશન્સની સૂચિ (સિક્રેટ્સ ઢાંકેલા)           |
| `POST`   | `/api/log-export/destinations`           | ડેસ્ટિનેશન બનાવવું                                |
| `GET`    | `/api/log-export/destinations/{id}`      | એક ડેસ્ટિનેશન વાંચવું                             |
| `PUT`    | `/api/log-export/destinations/{id}`      | નામ / સક્ષમ સ્થિતિ / કૉન્ફિગ / બૅચિંગ અપડેટ કરવું |
| `DELETE` | `/api/log-export/destinations/{id}`      | કાઢી નાખવું                                       |
| `POST`   | `/api/log-export/destinations/{id}/test` | ક્રેડેન્શિયલ્સ ચકાસવાં, કશું લખવું નહીં           |
| `POST`   | `/api/log-export/destinations/{id}/run`  | હમણાં ડ્રેઇન કરવું, શેડ્યૂલ્ડ રન જેવો જ પાથ       |
| `GET`    | `/api/log-export/status`                 | Cron સ્થિતિ, તાજેતરના રન્સ, દરેક ટાર્ગેટનો બૅકલૉગ |

`GET /api/log-export/types` UIને સામાન્ય બનાવે છે: ડૅશબોર્ડ ફોર્મ પરત મળેલા
ફીલ્ડ ડિસ્ક્રિપ્ટર્સ પરથી રેન્ડર થાય છે, તેથી નવા ડેસ્ટિનેશન માટે UIમાં કોઈ ફેરફાર જરૂરી નથી.

---

## 4. BigQuery ડેસ્ટિનેશન

કૉન્ફિગ કીઝ (`type: "bigquery"`):

| કી                   | નોંધો                                                                   |
| -------------------- | ----------------------------------------------------------------------- |
| `projectId`          | ડેટાસેટ ધરાવતો GCP પ્રોજેક્ટ                                            |
| `datasetId`          | `[A-Za-z0-9_]+`                                                         |
| `tableId`            | `[A-Za-z0-9_]+`                                                         |
| `location`           | ડેટાસેટ બનાવવો પડે ત્યારે જ વપરાય છે (ડિફૉલ્ટ `EU`)                     |
| `serviceAccountJson` | સર્વિસ-એકાઉન્ટ કી. સિક્રેટ: સંગ્રહ વખતે એન્ક્રિપ્ટેડ, ક્યારેય પરત ન થાય |
| `autoCreate`         | પ્રથમ એક્સપોર્ટ વખતે ડેટાસેટ અને ટેબલ બનાવવાં (ડિફૉલ્ટ `true`)          |

સર્વિસ એકાઉન્ટને ટાર્ગેટ ટેબલ પર `bigquery.tables.updateData`ની જરૂર છે, તેમજ
`autoCreate` ચાલુ હોય ત્યારે `bigquery.datasets.create` / `bigquery.tables.create`ની જરૂર છે.

કૉન્ફિગર કરેલ બૅચ એ **કર્સર** યુનિટ છે, HTTP યુનિટ નહીં: `send()` તેને વધુમાં વધુ 500 રોની
insertAll કૉલ્સમાં વહેંચે છે, તેથી મોટું `batch_size` BigQueryની 10 MB રિક્વેસ્ટ મર્યાદાને વટાવી શકતું
નથી. અસ્થાયી સ્ટેટસ (408/429/500/502/503/504) માટે, એ જ insertIds ફરી વાપરીને એક્સ્પોનેન્શિયલ
બૅકઑફ સાથે વધુમાં વધુ ત્રણ વખત ફરી પ્રયાસ કરવામાં આવે છે; ઑથ અને સ્કીમાની નિષ્ફળતાઓ પ્રથમ પ્રયાસે
જ થ્રો થાય છે, જેથી રન બિનજરૂરી રીતે વેડફાતો નથી.

થોડી ક્ષણો પહેલાં બનાવેલું ટેબલ હજી સ્ટ્રીમિંગ એન્ડપોઇન્ટને દેખાતું નથી, જે થોડી સેકન્ડ માટે
404નો જવાબ આપે છે. તે 404 માટે ફરી પ્રયાસ થાય છે, પરંતુ **ફક્ત જ્યારે આ રનમાં ટેબલ બનાવવામાં આવ્યું હોય** —
ખરેખર ગેરહાજર ટેબલ માટે તરત નિષ્ફળતા થાય છે. નોંધો કે તાજેતરમાં કાઢી નાખેલા નામ હેઠળ ટેબલ ફરી
બનાવવાથી BigQuery કેટલાંક મિનિટ સુધી સ્ટ્રીમિંગ ઇન્સર્ટ્સ નકારે છે; આ delete-then-recreateની
લાક્ષણિકતા છે, તેથી ટેબલને કાઢીને ફરી ઉમેરવાને બદલે નવું ટેબલ નામ વાપરવાનું પસંદ કરો.

**આંશિક નિષ્ફળતા HTTP 200 તરીકે, ખાલી ન હોય તેવા `insertErrors[]` સાથે આવે છે.** તેને નિષ્ફળતા
ગણીને થ્રો કરવામાં આવે છે, જેના કારણે BigQueryએ ક્યારેય સ્વીકારી ન હોય તેવી રોઝથી આગળ કર્સર વધતો
અટકે છે; `tests/unit/log-export-bigquery.test.ts` આ વર્તનને નિશ્ચિત કરે છે.

ટ્રાન્સપોર્ટ સાદો REST છે — સ્વ-હસ્તાક્ષરિત RS256 અસર્શનને
`https://oauth2.googleapis.com/token` પર ઍક્સેસ ટોકન માટે એક્સચેન્જ કરવામાં આવે છે, ત્યારબાદ રોઝ
`tabledata.insertAll` પર જાય છે. કોઈ Google SDK સામેલ કરવામાં આવ્યું નથી. ઍક્સેસ ટોકન્સ દરેક
(સર્વિસ એકાઉન્ટ, સ્કોપ) માટે ઇન-પ્રોસેસ કૅશ થાય છે.

બનાવેલા ટેબલમાં Logs-ટૅબના દરેક ફીલ્ડ માટે એક કૉલમ ઉપરાંત `exported_at` હોય છે, અને કૉલ લૉગ્સ
વાસ્તવમાં કેવી રીતે ક્વેરી કરવામાં આવે છે તેના માટે તેને આ પ્રમાણે ગોઠવવામાં આવે છે:

- **`timestamp` પર દિવસ મુજબ પાર્ટિશન કરેલું**, જેથી તારીખની મર્યાદામાં બંધાયેલી ક્વેરી માત્ર તે દિવસો જ સ્કૅન કરે.
- **`api_key_name`, `provider`, `model`, `status` દ્વારા ક્લસ્ટર કરેલું** (આ ક્રમમાં), જેથી કોણે તેને
  ચલાવ્યું, તે ક્યાં ગયું, અથવા તે નિષ્ફળ થયું કે નહીં તેના આધારે ફિલ્ટર કરવાથી દરેક પાર્ટિશનની અંદરના
  બ્લૉક્સ પ્રૂન થાય. BigQuery વધુમાં વધુ ચાર ક્લસ્ટરિંગ કૉલમ્સની મંજૂરી આપે છે અને ક્રમ મહત્વનો છે:
  ફક્ત `api_key_name` પરનું ફિલ્ટર પ્રૂન કરે છે, જ્યારે ફક્ત `status` પરનું ફિલ્ટર કરતું નથી.
- **વૈકલ્પિક પાર્ટિશન રિટેન્શન** `partitionExpirationDays` દ્વારા (`0` બધું જાળવી રાખે છે), જે
  ટેબલ બનાવતી વખતે લાગુ થાય છે.

બંને સેટિંગ્સ બનાવવાના સમયે લાગુ થાય છે. હાલનું ટેબલ તેની પાસે પહેલેથી જે લેઆઉટ છે તે જાળવી રાખે છે, તેથી
જો તમે તેમને અપનાવવા માંગતા હો, તો ગંતવ્યને નવા ટેબલ id તરફ નિર્દેશ કરો.

`tests/unit/log-export-bigquery.test.ts` ખાતરી કરે છે કે મેપર અને ટેબલ સ્કીમા સુસંગત રહે,
જેથી નવો કૉલ-લૉગ કૉલમ બહાર મોકલતી વખતે ચૂપચાપ છૂટી ન જાય.

બેચને પંક્તિઓની સંખ્યા અને સિરિયલાઇઝ કરેલા બાઇટ્સ **બંને** મુજબ ભાગોમાં વહેંચવામાં આવે છે. પેલોડ્સ એક્સપોર્ટ કરવામાં આવે ત્યારે
માત્ર પંક્તિઓની સંખ્યા પૂરતી નથી: પ્રોમ્પ્ટ્સ ધરાવતી 500 પંક્તિઓ દસેક મેગાબાઇટ્સની હોઈ શકે છે, અને insertAll
10 MBથી મોટી રિક્વેસ્ટને નકારે છે. 500 પંક્તિઓ અથવા 9 MBમાંથી જે મર્યાદા પહેલાં આવે ત્યારે ચંક બંધ થાય છે.

---

## 5. ગંતવ્ય ઉમેરવું

1. `LogExportDestinationType` export કરતી `src/lib/logExport/destinations/<name>.ts` બનાવો:
   UI માટે Zod `configSchema`, `fields` descriptor array, `secretFields`, અને
   `test()` / `prepare()` / `send(records)` પરત કરતું `createClient(config)`.
2. તેને `src/lib/logExport/registry.ts` માંની `DESTINATIONS` array માં ઉમેરો.
3. `tests/unit/` હેઠળ tests લખો.

આટલો જ સમગ્ર ફેરફાર છે: persistence, cron job, REST layer, secret encryption અને
dashboard form—આ બધાં registry વાંચે છે.

નવા ગંતવ્ય માટેના બે નિયમો:

- આંશિક નિષ્ફળતા પર `send()` એ **અવશ્ય throw કરવું જોઈએ**. Resolve થવાનો અર્થ છે કે "ગંતવ્ય પાસે આ rows છે",
  અને cursor કાયમ માટે તેમની આગળ વધી જાય છે.
- User-supplied URL લેતું ગંતવ્ય fetching પહેલાં તેને
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) દ્વારા validate કરવું જ જોઈએ,
  જેમ webhooks કરે છે એ જ રીતે. BigQuery માટે આ જરૂરી નથી: તેના hosts constants છે.

---

## 6. તેનું સંચાલન

- **Dashboard**: Integrations → Log export. ગંતવ્ય ઉમેરો, rows લખ્યા વિના credentials
  ચકાસવા માટે **Test** ચલાવો અને પછી તેને enable કરો.
- **Backlog**: દરેક destination card pending rows અને cursor દર્શાવે છે; `GET
/api/log-export/status` એ જ આંકડાઓ સાથે છેલ્લાં 20 job runs પણ પરત કરે છે.
- **નિષ્ફળ થતું ગંતવ્ય અન્ય ગંતવ્યોને નિષ્ફળ કરતું નથી** — run summary દરેક ગંતવ્યની
  status ને `last_status` / `last_error` માં નોંધે છે, અને job run history aggregate જાળવી રાખે છે.
- **ગંતવ્ય delete કરવાથી તેનો cursor પણ delete થાય છે.** તેને ફરી ઉમેરવાથી સૌથી જૂના જાળવી રાખેલા
  call log થી શરૂઆત થાય છે, જેના કારણે ગંતવ્ય પાસે પહેલેથી હોઈ શકે તે rows ફરી મોકલાય છે. BigQuery માં દરેક row માટેનું
  `insertId` માત્ર BigQuery ની પોતાની de-duplication window ની અંદર જ તેને સંભાળે છે, તેથી ગંતવ્યને delete કરવાને બદલે
  disable કરવાનું વધુ યોગ્ય છે.
