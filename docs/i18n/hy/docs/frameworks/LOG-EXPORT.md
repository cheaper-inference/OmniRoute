# Log export (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

OmniRoute-ի կանչերի մատյանների շարունակական, աստիճանական արտահանում արտաքին վերլուծական պահոց։

Կառավարման վահանակի «Մատյաններ» ներդիրը հարցումների պատմությունը պահում է SQLite-ում (`call_logs`), որի ծավալը սահմանափակվում է
ռոտացիայով և պահպանման ժամկետով։ Մատյանների արտահանումը նույն գրառումների հավաքածուն պարբերաբար ուղարկում է արտաքին պահոց, որպեսզի այն պահպանվի
տեղային տվյալների բազայից ավելի երկար և համադրվի այլ տվյալների հետ։ Առաջին նպատակակետը BigQuery-ն է․
խողովակաշարը կառուցված է ռեեստրի սկզբունքով, ուստի նոր նպատակակետեր կարելի է ավելացնել։

---

## 1. Ինչպես է այն աշխատում

```
server (decrypt + validate config, reconcile cursor)
  → start IPC → isolated exportChild OS process
    → read-only storage.sqlite → shared call-log query/mapping
      → async artifact hydration → destination prepare()/send()
        → batch IPC → server persists cursor → ack IPC
          → next batch; done IPC → server records success
```

- **Ժամանակացույց** — մեկ `JobRegistry` cron առաջադրանք՝ `log_export`, որի լռելյայն արժեքն է `0 * * * *` (ամեն ժամ,
  UTC)։ Գրանցված է `src/lib/initCloudSync.ts`-ում․ կարելի է վերասահմանել `OMNIROUTE_LOG_EXPORT_CRON`-ով։
  Յուրաքանչյուր գործարկման ժամանակ բոլոր **միացված** նպատակակետերի կուտակված գրառումները արտահանվում են հերթականությամբ։
- **Կուրսոր** — SQLite-ի անուղղակի `call_logs.rowid`-ը, որը յուրաքանչյուր նպատակակետի համար պահպանվում է
  `log_export_destinations.cursor_row_id`-ում։ `timestamp`-ը միտումնավոր չի օգտագործվում որպես կուրսոր․ կանչողները
  կարող են տրամադրել իրենց արժեքը, ուստի դանդաղ հարցումը կարող է գրվել ավելի ուշ մեկնարկած արագ հարցումից հետո,
  և ժամանակային նշման վրա հիմնված կուրսորը բաց կթողներ այն։
- **Փաթեթավորում** — յուրաքանչյուր հարցման համար՝ `batch_size` տող (լռելյայն՝ 500), յուրաքանչյուր գործարկման համար՝ `max_rows_per_run` տող
  (լռելյայն՝ 10000), որպեսզի մեծ կուտակումը արտահանվի մի քանի գործարկման ընթացքում՝ մեկ գործարկումն արգելափակելու փոխարեն։
- **Առաքում** — կուրսորն առաջ է շարժվում միայն `send()`-ի հաջող ավարտից հետո։ Եթե փաթեթի ուղարկումը ձախողվում է,
  կուրսորը մնում է նույն տեղում, ուստի հաջորդ գործարկման ժամանակ նույն տողերի ուղարկումը կրկնվում է։ Երաշխիքը
  առնվազն մեկ անգամ առաքումն է՝ նպատակակետի կողմից կրկնօրինակների հեռացմամբ, ոչ թե իսկական ճիշտ մեկ անգամ առաքումը․ BigQuery-ն յուրաքանչյուր
  տողի համար որպես բանալի օգտագործում է կանչի մատյանի նույնացուցիչը, որը հաշվի է առնում հնարավորության սահմաններում՝ կրկնօրինակների հեռացման իր ժամանակային պատուհանի ներսում։
- **Համընկնման պաշտպանություն** — cron-ի գործարկումը և `POST .../run`-ը կարող են տեղի ունենալ միաժամանակ։ Այն նպատակակետը,
  որի արտահանումն արդեն ընթացքի մեջ է, բաց է թողնվում՝ կրկնակի արտահանման փոխարեն (գործարկման արդյունքում՝ `skipped: true`),
  ուստի զուգահեռ գործարկումը չի կարող կրկին ուղարկել փաթեթը կամ կուրսորը հետ տեղափոխել։
- **Վերականգնում ամբողջական մաքրումից հետո** — եթե `cursor_row_id`-ը գերազանցում է `MAX(rowid)`-ը (ամբողջ աղյուսակը
  մաքրվել է, և տողերի նույնացուցիչները վերսկսվել են), գործարկիչը վերադառնում է 0-ի՝ նոր գրառումները մշտապես չտեսնելու փոխարեն։

### Մեկուսացված գործարկիչ և սահմանափակումներ

Node-ում յուրաքանչյուր նպատակակետի գործարկում սկսում է առանձին, կարճատև ՕՀ դուստր գործընթաց (`child_process`
IPC-ով, ոչ թե `worker_threads`)։ Մարմինների ընթերցումը, օգտակար բեռի JSON վերլուծումը/սերիականացումը, նպատակակետի
`prepare()`-ը և նպատակակետի ցանցային մուտք/ելքն ամբողջությամբ կատարվում են այնտեղ, ոչ թե սերվերի իրադարձությունների ցիկլում։
IPC-ով փոխանցվում են միայն կազմաձևումը և առաջընթացի փոքր հաղորդագրությունները․ արտահանվող գրառումները երբեք չեն վերադառնում
սերվեր։ Cron առաջադրանքը և «Գործարկել հիմա» երթուղին պահպանում են նույն հանրային արդյունքն ու համընկնման պաշտպանությունը։

Դուստր գործընթացը սերվերի որոշած `DATA_DIR/storage.sqlite`-ը բացում է միայն ընթերցման ռեժիմով՝ օգտագործելով `node:sqlite`,
`busy_timeout=5000` և `query_only=ON` պարամետրերով։ Այն չի ներմուծում տվյալների բազայի singleton օբյեկտ և չի կատարում
միգրացիաներ, պահուստավորումներ կամ SQLite-ի թարմացումներ։ Բացակայող/վնասված արտեֆակտների հաշվառումը (ներառյալ
վնասված արտեֆակտի UPDATE գործողությունը) մնում է միայն կառավարման վահանակի մանրամասների մշակման ուղում։ Երկու ուղիներն էլ օգտագործում են մանրամասների լուծման նույն մաքուր գործառույթը․
արտահանումն օգտագործում է ֆայլային համակարգի ասինխրոն ընթերցումներ և լուծման նույն հերթականությունը՝ արտեֆակտ → հին
ներկառուցված տվյալներ → հին սկավառակային տվյալներ → ոչինչ։ Երբ դուստր գործընթացը բացում է իր ընթերցիչը, գործարկումը ֆիքսում է
ներմուծման առավելագույն rowid-ը․ հետագա ներմուծումները սպասում են հաջորդ գործարկմանը։ Սա ներմուծման
սահման է, ոչ թե երկարատև SQLite տրանզակցիա․ ցանցային սպասումների ընթացքում WAL գրողներն ու ստուգակետերի ստեղծումը մնում են ազատ։
Այս սահմանը չի սառեցնում առկա տողերի թարմացումները/ջնջումները։

Յուրաքանչյուր ընդունված փաթեթից հետո դուստր գործընթացը սպասում է հաստատման։ Սերվերը նախ պահպանում է
կուրսորը՝ `advanceLogExportCursor`-ով, ապա ուղարկում է `ack`․ մինչ այդ հաջորդ փաթեթը չի սկսվում։
Ուղարկման ձախողումը, խափանումը կամ ժամանակի սպառումը գրանցում են ձախողում՝ առանց այդ փաթեթի համար կուրսորն առաջ շարժելու։ Նախկինում
հաստատված փաթեթները մնում են ամրագրված․ կրկին կարող է ուղարկվել առավելագույնը մեկ՝ չհաստատված փաթեթը։
Հաջողությունը գրանցվում է միայն `done`-ից և դուստր գործընթացի բնականոն ավարտից հետո։ Ձախողումների դեպքում դուստր գործընթացը դադարեցվում է
SIGTERM-ով, իսկ 500 մվ անց՝ անհրաժեշտության դեպքում SIGKILL-ով, և գործարկիչը սպասում է գործընթացի փակմանը։

| Միջավայրի փոփոխական                           | Լռելյայն | Նպատակ                                                        |
| --------------------------------------------- | -------- | ------------------------------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000   | Յուրաքանչյուր նպատակակետի իրական անցած ժամանակի սահմանաչափ    |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024     | Դուստր գործընթացի V8 old-space հիշողության սահմանաչափը՝ ՄԲ-ով |

Անվավեր/ոչ դրական/ոչ ամբողջ արժեքների դեպքում օգտագործվում են լռելյայն արժեքները։ Heap-ի կարգավորումը ընդհանուր
RSS սահմանաչափ չէ․ շատ մեծ փաթեթները դեռ կարող են սպառել դուստր գործընթացի հիշողությունը և անվտանգ կերպով ձախողել գործարկումը։
1024 ՄԲ լռելյայն արժեքը հիշողության պաշար է թողնում 512 KiB արտեֆակտներից կազմված լռելյայն 500 տողանոց փաթեթի համար՝
մարմինները միացված վիճակում, ներառյալ BigQuery-ի՝ բայթային հատվածներով JSON սերիականացումը։ Այն անվտանգ չի դարձնում
մարմիններ պարունակող 10000 տողանոց փաթեթը։ V8 heap-ի սպառումը գրանցում է գործողության հստակ ցուցումով ձախողում․ նվազեցրեք փաթեթի
չափը կամ մեծացրեք `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`-ը․ կուրսորը մնում է վերջին
հաստատված փաթեթի դիրքում։ Հին ներկառուցված/սկավառակային մարմինների վրա արտեֆակտների ժամանակակից սահմանաչափը չի տարածվում։
Օպերատորները պետք է առանձին պլանավորեն RSS-ի բյուջեն, հատկապես հիշողությամբ սահմանափակված կոնտեյներներում։

Դուստր գործընթացը ժառանգում է միայն որոշված `DATA_DIR`-ը, `NODE_ENV`-ը, բացահայտ սահմանված `TZ`-ը (հին ձևաչափի ֆայլանունների
տեղական ժամանակի որոշման համար), առկայության դեպքում՝ `ELECTRON_RUN_AS_NODE`-ը, և ելքային կապերի հետևյալ մուտքային պարամետրերը՝
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (և դրանց փոքրատառ տարբերակները),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`։
Գլոբալ Undici դիսպետչերն օգտագործում է սերվերի՝ բացառապես միջավայրի վրա հիմնված պրոքսիի որոշման և տեղական հոսթերի
շրջանցման նույն կանոնները, ներառյալ `NO_PROXY`-ը․ այն չի ներմուծում `proxyFetch.ts`-ը կամ դրա տվյալների բազայի/գործառույթների դրոշակները։
Պրոքսիի նույնականացման տվյալները քողարկվում են փոխանցվող ելքում և գրանցված սխալներում։ Նպատակակետի նույնականացման տվյալները
փոխանցվում են միայն մեկնարկային մեկ IPC հաղորդագրությամբ, երբեք՝ argv-ով կամ միջավայրով․ փոխանցվող ելքն ու սխալները
ստանում են նախածանց և մաքրվում են։ Դուստր գործընթացի գործարկման արգումենտներում անջատվում է միայն `ExperimentalWarning`-ը՝
յուրաքանչյուր cron գործարկման ժամանակ Node-ի SQLite նախազգուշացման կրկնությունից խուսափելու համար․ մյուս տեսակի նախազգուշացումները մնում են տեսանելի։

Նպատակակետի մոդուլները պետք է հնարավոր լինի ներմուծել առանց Next.js/միայն սերվերի համար նախատեսված կախվածությունների։ Առկա
BigQuery իրականացումն արդեն համապատասխանում է այդ պայմանագրին։ Մուտքի թոքենների քեշերը պահպանվում են միայն դուստր գործընթացի
գործարկման ընթացքում, ոչ թե գործարկումների միջև։ Աջակցվող կատարման միջավայրը Node-ն է (`package.json`-ի engines), սակայն README-ի՝ Bun-ի
տեղադրման բաժինը և `Dockerfile.bun`-ը նաև ներկայացնում են արտադրական համատեղելիության ուղի՝
`bun:sqlite`-ի օգտագործմամբ (`src/lib/db/core.ts` / ադապտերներ)։ Հետևաբար Bun-ի ներքո արտահանումները պահպանում են նախկին՝
նույն գործընթացում կատարվող ուղին և մեկ անգամ նախազգուշացում են ցուցադրում․ դուստր գործընթացի heap-ի/ժամանակային սահմանափակման մեկուսացումը հասանելի չէ։ Օգտագործեք
Node՝ իրադարձությունների ցիկլի և OOM-ի մեկուսացման համար․ այստեղ Bun-ը չի դիտարկվում որպես միայն մշակման համար նախատեսված տարբերակ։

Երբ `includeBodies`-ը միացված է, նախընտրեք րոպեների մակարդակով պարբերականություն, օրինակ՝
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, այլ ոչ թե մեկ ժամվա բովանդակության կուտակում։
Փաթեթի և տողերի սահմանաչափերը շարունակում են սահմանափակել յուրաքանչյուր գործարկումը։ Գործընթացի մեկնարկի ծախսը կատարվում է յուրաքանչյուր նպատակակետի համար՝ յուրաքանչյուր գործարկման ժամանակ․
այս մոտեցումը փոքր մեկնարկային ծախսը փոխանակում է սերվերի իրադարձությունների ցիկլի մեկուսացման հետ, այլ ոչ թե նվազեցնում CPU-ի ընդհանուր օգտագործումը։

### Բովանդակություն (հուշումներ և պատասխաններ)

Լռելյայն արտահանումը ներառում է միայն այն ամփոփ դաշտերը, որոնք ցուցադրվում են մատյանների **ցանկում**։ Միացնելով
**Արտահանել հուշումներն ու պատասխանները** (`includeBodies`)՝ լրացուցիչ փոխանցվում է այն, ինչ մատյանների **մանրամասների**
վահանակը ցուցադրում է յուրաքանչյուր կանչի համար՝

| Դաշտ                             | Ինչ է պարունակում                                                      |
| -------------------------------- | ---------------------------------------------------------------------- |
| `request_body` / `response_body` | Կանչի բովանդակությունը՝ ինչպես այն ցուցադրվում է կառավարման վահանակում |
| `pipeline_route_decision`        | Որ նպատակակետն ու մոդելն է ընտրել երթուղիչը                            |
| `pipeline_client_request`        | Հում հարցումը՝ ճիշտ այնպես, ինչպես այն ուղարկել է հաճախորդը            |
| `pipeline_openai_request`        | Ներքին OpenAI ձևաչափի փոխակերպումից հետո                               |
| `pipeline_provider_request`      | Ինչպես փաստացի ուղարկվել է վերին ծառայությանը՝ մատակարարի ձևաչափով     |
| `pipeline_provider_response`     | Վերին ծառայության հում պատասխանը                                       |
| `pipeline_client_response`       | Ինչն է վերադարձվել կանչողին                                            |
| `pipeline_error`                 | Ձախողված կանչի՝ մշակման շղթայի մակարդակի սխալի մանրամասները            |
| `bodies_truncated`               | True, երբ վերոնշյալ որևէ դաշտ հասել է `maxBodyBytes` սահմանաչափին      |

Սա հուշումների բովանդակություն է, ուստի այն **լռելյայն անջատված է** և միտումնավոր ընտրվում է յուրաքանչյուր նպատակակետի համար առանձին։
Փոխանցվում է այն, ինչ ցուցադրում է կառավարման վահանակը, քանի որ արտահանումը և `getCallLogById`-ը օգտագործում են մանրամասների
ստացման նույն մեխանիզմը․ բովանդակության
անձնական նույնականացնող տվյալներն արդեն մաքրված են, իսկ գաղտնիքները՝ քողարկված գրանցման պահին, և
`noLog` API բանալիով կատարված կանչն ընդհանրապես բովանդակություն չի պահպանում, ուստի արտահանելու ոչինչ չկա։

Բովանդակությունը ֆայլային համակարգի արտեֆակտից կարդացվում է տող առ տող, ուստի տվյալների լրացումն իրականացվում է միայն այն նպատակակետերի համար,
որոնք դա պահանջել են։ Բացակայող կամ վնասված արտեֆակտի դեպքում արտահանվում է դրա ամփոփումը՝ null բովանդակությամբ՝
ամբողջ փաթեթը ձախողելու և կուրսորը կանգնեցնելու փոխարեն։

`maxBodyBytes`-ը (լռելյայն՝ 262144) սահմանափակում է յուրաքանչյուր դաշտի չափը։ Ավելի երկար բովանդակությունը **կրճատվում է, այլ ոչ թե
հեռացվում**․ կրճատված հուշումը դեռ պատասխանում է «ինչ է հարցվել» հարցին, իսկ տողը նշվում է
`bodies_truncated`-ով։ Հոսքային՝ հատված առ հատված փոփոխությունները չեն արտահանվում․ հավաքված պատասխանն
արդեն առկա է `pipeline_provider_response`-ում և `pipeline_client_response`-ում։

---

## 2. Ֆայլեր

| Բաղադրիչ                                | Տեղադրություն                                |
| --------------------------------------- | -------------------------------------------- |
| Նպատակակետի պայմանագիր                  | `src/lib/logExport/types.ts`                 |
| Գրանցամատյան                            | `src/lib/logExport/registry.ts`              |
| Գաղտնի տվյալների մշակում                | `src/lib/logExport/secrets.ts`               |
| Գործարկիչ (ծնող գործընթացի IPC)         | `src/lib/logExport/runner.ts`                |
| Գործընթացի կենսացիկլ                    | `src/lib/logExport/childRunner.ts`           |
| Դուստր գործընթացի մուտքային կետ         | `src/lib/logExport/exportChild.ts`           |
| Միայն ընթերցման ռեժիմով բացիչ           | `src/lib/db/logExportReadOnly.ts`            |
| Ընդհանուր հարցում/արտապատկերում         | `src/lib/usage/callLogExportQueries.ts`      |
| Մանրամասների որոշիչ                     | `src/lib/usage/callLogDetailResolver.ts`     |
| API պրոյեկցիա                           | `src/lib/logExport/presenter.ts`             |
| BigQuery նպատակակետ                     | `src/lib/logExport/destinations/bigquery.ts` |
| Google ծառայության հաշվի նույնականացում | `src/lib/logExport/googleServiceAccount.ts`  |
| Կանչերի մատյանի աղբյուր                 | `src/lib/usage/callLogExportSource.ts`       |
| Մշտական պահպանում                       | `src/lib/db/logExportDestinations.ts`        |
| Cron առաջադրանք                         | `src/lib/jobs/logExportJob.ts`               |
| REST շերտ                               | `src/app/api/log-export/`                    |
| Կառավարման վահանակի էջ                  | `src/app/(dashboard)/dashboard/log-export/`  |

Սխեմա՝ `src/lib/db/migrations/170_log_export_destinations.sql`։

---

## 3. REST API

Բոլոր երթուղիները պահանջում են կառավարման նույնականացում (`requireManagementAuth`)։ Գաղտնի տվյալները երբեք չեն վերադարձվում.
պահված գաղտնի տվյալը վերադարձվում է որպես `__stored__` բառացի արժեք, իսկ թարմացման ժամանակ այդ արժեքը հետ ուղարկելը
պահպանում է պահված մուտքային տվյալները։

Գաղտնի տվյալ հայտարարող տեսակով նպատակակետի ստեղծումը կամ թարմացումը **պահանջում է
`STORAGE_ENCRYPTION_KEY`**։ Առանց դրա `encrypt()`-ը լուռ վերադարձնում է տվյալներն անփոփոխ, ուստի գրառումը
մերժվում է 400 կոդով՝ մուտքային տվյալները SQLite-ում բաց տեքստով պահելու փոխարեն (նույն պաշտպանությունը կիրառում է
Telegram-ի վեբհուկը)։

| Մեթոդ    | Ուղի                                     | Նպատակ                                                                     |
| -------- | ---------------------------------------- | -------------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Նպատակակետերի տեսակները և դրանց կազմաձևման դաշտերի ցանկը                   |
| `GET`    | `/api/log-export/destinations`           | Նպատակակետերի ցանկը (գաղտնի տվյալները՝ թաքցված)                            |
| `POST`   | `/api/log-export/destinations`           | Ստեղծել նպատակակետ                                                         |
| `GET`    | `/api/log-export/destinations/{id}`      | Կարդալ մեկ նպատակակետ                                                      |
| `PUT`    | `/api/log-export/destinations/{id}`      | Թարմացնել անունը / միացված լինելը / կազմաձևումը / խմբաքանակավորումը        |
| `DELETE` | `/api/log-export/destinations/{id}`      | Ջնջել                                                                      |
| `POST`   | `/api/log-export/destinations/{id}/test` | Ստուգել մուտքային տվյալները՝ ոչինչ չգրանցելով                              |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Անմիջապես մշակել կուտակվածը՝ պլանավորված գործարկման նույն ընթացքով         |
| `GET`    | `/api/log-export/status`                 | Cron-ի վիճակը, վերջին գործարկումները, կուտակված տվյալները՝ ըստ նպատակակետի |

`GET /api/log-export/types`-ն է օգտատիրոջ միջերեսը դարձնում ընդհանրական. կառավարման վահանակի ձևը կառուցվում է
վերադարձված դաշտերի նկարագրիչներից, ուստի նոր նպատակակետի համար միջերեսի փոփոխություն չի պահանջվում։

---

## 4. BigQuery-ի նպատակակետ

Կազմաձևման բանալիներ (`type: "bigquery"`):

| Key                  | Notes                                                                                                                       |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `projectId`          | GCP նախագիծը, որը պարունակում է dataset-ը                                                                                   |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                                             |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                                             |
| `location`           | Օգտագործվում է միայն այն դեպքում, երբ dataset-ը պետք է ստեղծվի (կանխադրվածը՝ `EU`)                                          |
| `serviceAccountJson` | Service Account-ի բանալի։ Գաղտնիք է՝ գաղտնագրված է պահպանման ժամանակ և երբեք չի վերադարձվում                                |
| `autoCreate`         | Ստեղծում է բացակայող dataset/table-ը, պայմանականորեն ավելացնում է nullable usage-evidence սյունակները (կանխադրվածը՝ `true`) |

Service account-ին անհրաժեշտ է `bigquery.tables.updateData` իրավասությունը թիրախային table-ի համար, ինչպես նաև
`bigquery.datasets.create` / `bigquery.tables.create` իրավասությունները, երբ `autoCreate`-ը միացված է։
Գոյություն ունեցող table-ը երկու nullable usage-evidence դաշտերն ավելացնելու համար թարմացնելը նույնպես պահանջում է
`bigquery.tables.update`։ Բացակայող իրավասության դեպքում export-ը ձախողվում է՝ առանց cursor-ն առաջ տանելու։

Կազմաձևված batch-ը **cursor**-ի միավոր է, ոչ թե HTTP-ի․ `send()`-ը այն բաժանում է առավելագույնը 500 տող պարունակող insertAll
կանչերի, այնպես որ մեծ `batch_size`-ը չի կարող առաջացնել BigQuery-ի 10 MB հարցման սահմանաչափի խախտում։
Ժամանակավոր կարգավիճակները (408/429/500/502/503/504) կրկին փորձարկվում են առավելագույնը երեք անգամ՝ էքսպոնենցիալ
backoff-ով և նույն insertIds-ի վերօգտագործմամբ․ auth-ի և schema-ի սխալները նետվում են առաջին փորձից՝
առանց run-ը սպառելու։

Նոր ստեղծված table-ը դեռ տեսանելի չէ streaming endpoint-ին, որը մի քանի վայրկյան շարունակ պատասխանում է 404-ով։
Այդ 404-ը կրկին փորձարկվում է, բայց **միայն այն դեպքում, երբ այս run-ը ստեղծել է table-ը**․
իսկապես բացակայող table-ը անմիջապես ձախողվում է։ Նկատի ունեցեք, որ վերջերս ջնջված table-ը նույն անունով
վերստեղծելը BigQuery-ին ստիպում է մի քանի րոպե մերժել streaming inserts-ը․ դա delete-then-recreate-ի հատկությունն է,
ուստի նախընտրելի է օգտագործել նոր table name՝ table-ը ջնջելու և կրկին ավելացնելու փոխարեն։

**Մասնակի ձախողումը գալիս է որպես HTTP 200՝ ոչ դատարկ `insertErrors[]`-ով։** Այն դիտարկվում է որպես
ձախողում և նետում է սխալ, ինչը կանխում է cursor-ի առաջխաղացումը այն տողերից հետո, որոնք BigQuery-ն չի ընդունել։
`tests/unit/log-export-bigquery.test.ts`-ը հաստատում է այս վարքագիծը։

Տրանսպորտը սովորական REST է․ ինքնաստորագրված RS256 assertion-ը փոխանակվում է access token-ի հետ՝
`https://oauth2.googleapis.com/token` հասցեում, այնուհետև տողերն ուղարկվում են `tabledata.insertAll`։
Google SDK չի ավելացվում։ Access token-ները գործընթացի ընթացքում պահվում են քեշում՝ ըստ (service account, scope) զույգի։

Ստեղծված table-ը պարունակում է մեկ սյունակ Logs ներդիրի յուրաքանչյուր դաշտի համար, ինչպես նաև `exported_at`,
և կառուցված է՝ հաշվի առնելով call logs-ի իրական հարցումների եղանակը։

- **Օրերով բաժանված է `timestamp`-ի հիման վրա**, այնպես որ միայն ամսաթվով սահմանափակված հարցումը սկանավորում է
  միայն այդ օրերը։
- **Կլաստերավորված է `api_key_name`, `provider`, `model`, `status`-ով** (այս հերթականությամբ), այնպես որ
  այն զտումը, թե ով է գործարկել հարցումը, ուր է այն ուղարկվել կամ արդյոք այն ձախողվել է, յուրաքանչյուր partition-ի
  ներսում կրճատում է սկանավորվող բլոկները։ BigQuery-ն թույլ է տալիս առավելագույնը չորս clustering սյունակ,
  և հերթականությունը կարևոր է․ միայն `api_key_name`-ով զտումը կրճատում է սկանավորումը, իսկ միայն `status`-ով զտումը՝ ոչ։
- **Partition-ի ընտրովի պահպանում**՝ `partitionExpirationDays`-ի միջոցով (0-ը պահպանում է ամեն ինչ), որը կիրառվում է
  table-ի ստեղծման ժամանակ։

Երկու կարգավորումներն էլ կիրառվում են ստեղծման պահին։ Գոյություն ունեցող table-ը պահպանում է իր արդեն ունեցած կառուցվածքը,
ուստի եթե ցանկանում եք կիրառել դրանք, destination-ը ուղղեք նոր table id-ի։

`tests/unit/log-export-bigquery.test.ts`-ը հաստատում է, որ mapper-ը և table-ի schema-ն մնում են համաժամեցված,
ուստի call-log-ի նոր սյունակը դուրս գալիս չի կարող լուռ կերպով բաց թողնվել։

Batch-երը բաժանվում են **և՛ տողերի քանակով, և՛ սերիալացված բայթերով**։ Միայն տողերի քանակը բավարար չէ,
երբ payload-ները export են արվում․ prompts պարունակող 500 տողը կարող է զբաղեցնել տասնյակ մեգաբայթ,
իսկ insertAll-ը մերժում է 10 MB-ից մեծ հարցումը։ Chunk-երը փակվում են 500 տողի կամ 9 MB-ի դեպքում՝
կախված նրանից, թե որն է առաջինը։

---

## 5. OTLP/HTTP traces destination

Կազմաձևումն օգտագործում է `type: "otlp-http"`։ Սա պահպանված կանչերի մատյանների պլանավորված, կուրսորով կառավարվող արտահանում է, ոչ թե
`open-sse/services/routing/otel.ts`-ում գտնվող best-effort կենդանի
երթուղավորման իրադարձությունների sink-ը։ Այն չի կարդում և չի փոխում այդ sink-ի միջավայրի
փոփոխականները, ժամանակաչափերը կամ բուֆերները։ Երկուսն էլ միացնելը կարող է առաջացնել span-ների երկու անկախ տեսակներ․
օգտագործեք `omniroute.log-export` instrumentation scope-ը՝ կանչերի մատյանների span-ները տարբերակելու համար։

| Key                      | Default / purpose                                                                          |
| ------------------------ | ------------------------------------------------------------------------------------------ |
| `endpoint`               | Պարտադիր ամբողջական HTTP(S) traces URL․ `/v1/traces` վերջածանց չի ավելացվում               |
| `headers`                | Ընտրովի `Name: value` տողեր կամ տողերի JSON օբյեկտ․ գաղտնագրվում է                         |
| `requestHeaderAllowlist` | Դատարկ (անջատված)․ span attributes-ներում ներառվող client header-ների անուններ/նախածանցներ |
| `serviceName`            | `omniroute`․ resource-ի `service.name`                                                     |
| `langfuseMapping`        | `false`․ ավելացնում է Langfuse generation/session/user attributes                          |
| `identity`               | `pseudonymous`, `keyName` կամ `none`                                                       |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                                    |
| `timeoutMs`              | `30000` յուրաքանչյուր HTTP փորձի համար                                                     |
| `environment`            | Չսահմանված․ ընտրովի `langfuse.environment`                                                 |

Ընդհանուր վահանակը ցուցադրում է այս դաշտերը։ `paths`-ն ընդունում է API զանգված կամ textarea,
որտեղ ճշգրիտ ուղիները բաժանված են նոր տողերով/ստորակետերով։ Embeddings, rerank և այլ ուղիներ
բաց են թողնվում, եթե հստակորեն թույլատրված չեն։ Բաց թողնված տողերը, այնուամենայնիվ, առաջ են տանում կուրսորը․ գործող
runner-ի `exported`/`exportedTotal` հաշվիչները հաշվում են մշակված սկզբնաղբյուրի տողերը, ներառյալ զտված
տողերը, այլ ոչ թե ընդունված span-ները։ Զտումը կատարվում է child-ում՝ առանց դրա
IPC/cursor պայմանագիրը փոխելու։

URL-ի վավերացումն օգտագործում է DB-ից անկախ `parseAndValidateNonMetadataUrl` helper-ը
`src/shared/network/outboundUrlGuard.ts`-ից՝ `block-metadata` քաղաքականությունը։ Այն ունի webhook validator-ի
նույն անվերապահ metadata/protocol/embedded-credential ստուգումները՝ private URL-ների
թույլատրմամբ, սակայն միտումնավոր թույլ է տալիս localhost/LAN թիրախներ՝ առանց գլոբալ
feature-flag override-ի։ Սա թույլ է տալիս self-hosted Langfuse, Phoenix, Tempo և Collector
endpoint-ներ, ներառյալ private HTTP endpoint-ները։ Cloud-metadata host-ները միշտ արգելափակվում են։
Redirect-ներին չեն հետևում, ուստի collector-ը չի կարող credentials-ը վերահղել այլ host-ի։
Ինչպես գոյություն ունեցող lexical URL guard-ը, սա չի ամրագոտում DNS resolution-ը․ կազմաձևեք միայն
օպերատորի կողմից վերահսկվող host-ներ։ Նախընտրեք HTTPS, երբ endpoint-ը վստահելի ցանցում չէ։

### Payload and delivery

OTLP/HTTP JSON-ը (`ExportTraceServiceRequest`, `Content-Type: application/json`) պարունակում է մեկ
CLIENT span յուրաքանչյուր թույլատրված տողի համար, որի անունը կազմված է request path-ից՝ անփոփոխ ձևով։ Path-ի
անվանումը տարբերակում է Chat Completions, Responses և Messages գործողությունները՝ span-ի անվան մեջ
model կամ identity տվյալներ չներառելով։ Resource attributes-ը ներառում է `service.name` և փաթեթի `service.version`-ը։

Սովորական chat attempt logger-ը (`open-sse/handlers/chatCore/attemptLogging.ts`) ավարտման պահին գրում է
`duration = Date.now() - startTime` և timestamp չի տրամադրում․
`src/lib/usage/callLogs.ts`-ում գտնվող `saveCallLogOperation`-ը timestamp-ի լռելյայն արժեք է սահմանում գրելու
(ավարտման) ժամանակը։ Հետևաբար արտահանումը end-ը սահմանում է որպես տողի timestamp, իսկ start-ը՝ end − duration
(միլիվայրկյանները վերածելով տասնորդական նանովայրկյանների)։ Caller-ի կողմից տրամադրված պատմական
timestamp-ները նույնպես պահպանվում են որպես end time․ յուրաքանչյուր տողի համար start/completion տարբերակիչ չկա։
Null duration-ը դառնում է զրո։ Անվավեր/բացակայող timestamp-ները ձախողում են batch-ը՝ ոչ թե ստեղծում
ոչ դետերմինիստիկ span-ներ։ `ttftMs`-ը nullable է և փոխանցվում է որպես `omniroute.ttft_ms`։

Attributes-ը ներառում է `gen_ai.operation.name="chat"`, provider, requested/response model,
input/output tokens, կամընտրական cache-read/cache-creation/reasoning tokens, HTTP status,
combo, cache source, session tag և correlation id։ Integer OTLP արժեքներն ու timestamp-ները
տասնորդական տողեր են․ strings, booleans և fractional numbers-ն օգտագործում են իրենց native OTLP value
տարբերակները։ Error span-ներն ունեն ERROR status և մաքրված status message։ Canonical record-ը
upstream host URL չի պարունակում, ուստի `server.address`-ը բաց է թողնվում՝ collector-ը որպես model server
սխալմամբ չնույնականացնելու համար։ Cost-ը չի արտահանվում։

Միայն `includeBodies=true`-ն է hydrate անում content-ը։ `langfuseMapping=false`-ի դեպքում
`gen_ai.input.messages` / `gen_ai.output.messages`-ը պարունակում են OmniRoute-ի կողմից պահված
մաքրված request/response body JSON-ը (parseable լինելու դեպքում՝ canonicalized), այլ ոչ թե վերակազմավորված
semconv messages array։ Կրճատված/non-JSON body-ները մնում են raw text։ `langfuseMapping=true`-ի դեպքում
body-ները արտադրվում են միայն որպես `langfuse.observation.input` / `langfuse.observation.output`․
`gen_ai.*.messages` attributes-ը բաց են թողնվում, որպեսզի յուրաքանչյուր body ուղարկվի մեկ անգամ։ Երկու ռեժիմներն էլ
ժառանգում են `maxBodyBytes`-ը գոյություն ունեցող hydration path-ից․
`omniroute.bodies_truncated=true`-ը նշում է կրճատումը։
Այս destination-ը չի ավելացնում pipeline-ի լրացուցիչ snapshot-ներ կամ unsanitized artifact reads․
request-header-ի կամընտրական capture-ն օգտագործում է ստորև նկարագրված գոյություն ունեցող hydrated client snapshot-ը։
Body-ներ արտահանելիս օգտագործեք րոպեական cadence, օրինակ՝
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, այլ ոչ թե ամենժամյա backlog կուտակեք։

### Optional client request headers

Header capture-ը **լռելյայն անջատված է**։ Destination config-ում սահմանեք `requestHeaderAllowlist`-ը
և միացրեք **Export prompts and responses**-ը (`includeBodies: true` destination-ում)։
Allowlist-ն ընդունում է API զանգված կամ textarea՝ նոր տողերով/ստորակետերով բաժանված անուններով․

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Անունները համեմատվում են առանց մեծատառերի/փոքրատառերի տարբերակման և ճշգրիտ, եթե միայն մեկ վերջնական `*` չի ընտրում header-ի անվան ոչ դատարկ նախածանց։ Առանձին `*`-ը, ներկառուցված wildcards-ները և HTTP header-ի անվավեր անունները մերժվում են։ Առավելագույնը թույլատրվում է 64 ընտրիչ, որոնցից յուրաքանչյուրի անունը/նախածանցը կարող է ունենալ առավելագույնը 256 ASCII բայթ։ Այս կարգավորումն առանձին է `headers`-ից, որը exporter-ին նույնականացնում է collector-ի մոտ։

Capture-ը կարդում է միայն `pipeline_client_request`-ը, որը լրացվում է պահպանված մանրամասն pipeline-ի `clientRawRequest`-ից (կամ legacy `clientRequest`-ից)։ Այն երբեք չի օգտագործում provider-ի request header-ները որպես փոխարինող։ Մանրամասն pipeline-ի logging-ը պետք է միացված լիներ request-ի գրանցման պահին։ `includeBodies`-ը անջատված լինելու, կամ client-snapshot JSON-ի բացակայության, վնասված կամ կրճատված լինելու դեպքում header-ի ատրիբուտներ չեն արտահանվում։ `maxBodyBytes`-ի ավելացումը կարող է կանխել export-ի պահին snapshot-ի կրճատումը, սակայն չի կարող վերականգնել այն մանրամասները, որոնք երբեք չեն պահպանվել։ 1 MiB-ից մեծ կամ 256-ից ավելի header entry պարունակող snapshot-ն անտեսվում է։ Prompt/response-ի առկա export-ը շարունակում է գործել header capture-ի հետ զուգահեռ․ allowlist-ը headers-only hydration mode չի տրամադրում։

Ընտրված արժեքները դառնում են `http.request.header.<full lowercase header name>` OTLP string array-ներ, նույնիսկ մեկ string-ի դեպքում։ Օրինակ՝ `X-OmniRoute-Meta-Team: example-team`-ը դառնում է `http.request.header.x-omniroute-meta-team`՝
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`։
Ամբողջ նախածանցը պահպանվում է․ դրանք սովորական header-ներ են՝ առանց business-field parsing-ի կամ `omniroute.metadata.*` / Langfuse metadata-ի փոխարկման։ `langfuseMapping`-ը չի փոխում header-ի իմաստաբանությունը։ Ընտրված մեկ արժեք ունեցող `User-Agent`-ը նաև սահմանում է ստանդարտ scalar `user_agent.original`-ը։ Մեկ արժեքի ներսում ստորակետերը չեն բաժանվում։ Մեծատառերի/փոքրատառերի տարբերակները միավորվում են պահպանված entry-ների հերթականությամբ․ ցանկացած անվավեր տարբերակ բաց է թողնում ամբողջ header-ը։ Ատրիբուտները դասավորվում են lowercase անունով։

Authorization, Proxy-Authorization, Cookie, Set-Cookie, API-key header-ները, auth/token/secret/password/credential նշաններ պարունակող անունները և ներքին gateway credential-ները միշտ բացառվում են, նույնիսկ եթե ընտրված են կամ storage-ում մասամբ maskավորված են։ Հայտնի credential pattern-ները կրկին օգտագործում են ընդհանուր credential detector-ը․ redaction marker-ները բաց են թողնվում և որպես անվտանգ արժեքներ չեն արտահանվում։ Ընդունվում են միայն string-ներ և ոչ դատարկ string array-ներ․ թվերը կամ object-ները չեն փոխակերպվում։ Անվավեր անունները, prototype key-երը, control character-ները (բացառությամբ horizontal tab-ի) և սխալ ձևավորված Unicode-ը անտեսվում են՝ առանց batch-ի ձախողման կամ դրանց պարունակությունն error-ներում արտացոլելու։

Յուրաքանչյուր span-ը կարող է պարունակել առավելագույնը 32 header, յուրաքանչյուր header-ի համար՝ 16 արժեք, յուրաքանչյուր արժեքի համար՝ 4096 UTF-8 բայթ, իսկ capture արված header անունների և արժեքների ընդհանուր չափը՝ 16384 UTF-8 բայթ։ Չափը գերազանցող/անվավեր header-ներն ամբողջությամբ բաց են թողնվում, ոչ թե կրճատվում։ Selection-ը օպերատորի privacy որոշում է․ անվտանգ թվացող անունները դեռ կարող են անձնական տվյալներ պարունակել, իսկ այս սահմաններն ու detector-ները ընդհանուր PII scrubber չեն։

### Առաքման սահմանափակումներ

Request-ները սահմանափակված են 500 span-ով և 4 MiB UTF-8 JSON-ով՝ ներառյալ envelope-ը։ Թույլատրված յուրաքանչյուր span-ի չափը ստուգվում է cursor batch-ի առաջին request-ից առաջ։ Սահմանաչափից մեծ առանձին span-ի դեպքում այդ batch-ի ոչ մի մասը չի ուղարկվում, և ձախողումը ուղեկցվում է `maxBodyBytes`-ը նվազեցնելու ցուցումով․ այն լուռ չի բաց թողնվում։ Preflight-ը պահպանում է միայն record reference-ները և բայթերի քանակները՝ հեռացնելով յուրաքանչյուր ժամանակավոր span/JSON-ը․ span-ները վերակառուցվում են սահմանափակ չափի chunk-երի համար՝ batch-ի երկրորդ serialized պատճենը հիշողության մեջ չպահելու նպատակով։ HTTP 408/429/5xx-ը, ցանցային ձախողումները և timeout-ները ստանում են առավելագույնը երեք փորձ՝ 250/500 ms exponential backoff-ով։ `Retry-After` վայրկյանները կամ HTTP ամսաթվերը կարող են երկարացնել delay-ը մինչև 5 վայրկյան։ Այլ status-ները ձախողվում են անմիջապես։ OTLP 2xx partial rejection-ը նույնպես exception է առաջացնում՝ կորցրած span-ը acknowledge անելու փոխարեն․ դատարկ կամ վավեր JSON acknowledgement-ները ընդունվում են՝ response-read-ի 64 KiB սահմանաչափով։

Error-ները պարունակում են միայն exporter-ին պատկանող փաստեր՝ HTTP status, retry class, փորձերի քանակ և ուղարկված span-ների count, կամ acknowledgement/network failure-ի հաստատագրված ձևակերպում։ Collector-ի response body-ները, partial-success count-երը և response header-ները երբեք չեն պատճենվում error-ների, log-երի կամ dashboard-ի մեջ։ Ձախողված կամ մասամբ ընդունված batch-ը չի acknowledge արվում․ destination-ը տվյալ status-ով ցուցադրվում է որպես Failing, cursor-ը մնում է վերջին acknowledge արված batch-ի վրա, իսկ հաջորդ գործարկումը նորից ուղարկում է նույն rows-երը։ Permanent status-ները շարունակում են ձախողվել, մինչև collector-ը կամ configuration-ը շտկվի։ Response-ի մանրամասների համար օգտագործեք collector-ի սեփական log-երը։ Call-log error summary-ները պահպանում են իրենց առանձին redaction-ը։
`prepare()`-ը ոչինչ չի provision անում․ Test-ը post է անում ճշգրիտ `{"resourceSpans":[]}` և հաղորդում է HTTP status-ը՝ առանց call-log span-ներ գրելու։

Trace id-ները և span id-ները SHA-256-ի առաջին 32/16 hex թվանշաններն են՝ `"omniroute.trace\\0" + callLogId` և `"omniroute.span\\0" + callLogId` արտահայտությունների վրա։ Կրկնակի ուղարկումները կրում են նույն id-ները։ Սա deduplication-ի երաշխիք չէ․ որոշ backend-ներ, ներառյալ Langfuse v4 ingestion-ը, չեն deduplicate անում նույն id-ով span-ները։ Crash-ը կամ partial chunk failure-ը կարող է կրկին ուղարկել առավելագույնը cursor-ի մեկ unacknowledged batch․ այդ ամբողջ batch-ը կարող է կրկնվել, ոչ միայն դրա վերջին HTTP chunk-ը։ Cursor batch-ի չափն ընտրելիս հաշվի առեք այս փոխզիջումը։

### Langfuse-ի օրինակ

Self-hosted Langfuse instance-ի համար կարգավորեք այս դաշտերը․

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

Authorization արժեքը տեղային ձևավորեք որպես literal `public-key:secret-key` string-ի Base64 (օրինակ՝ `Buffer.from(publicKey + ":" + secretKey).toString("base64")`-ի միջոցով)։ Իրական credential-ները մի տեղադրեք log-երում, screenshot-ներում կամ issue-ներում։ Mapping-ը ավտոմատ սահմանում է `x-langfuse-ingestion-version: 4`․ Authorization-ը դեռ տրամադրվում է `headers`-ում։ Ե՛վ header-ները, և՛ գեներացված identity salt-ը օգտագործում են գոյություն ունեցող encrypted secret-field mechanism-ը և API placeholder-ները․ `STORAGE_ENCRYPTION_KEY`-ը պարտադիր է։

Mapping-ը ավելացնում է generation type/model, JSON usage details (input/output/total և հասանելի
cache keys), JSON input/output snapshots, ERROR/DEFAULT level, sanitized status message,
trace name, session id, optional environment և ֆիլտրելի
`langfuse.observation.metadata.<key>`՝ provider-ի, requested model-ի, path-ի, combo-ի, cache
source-ի և status-ի համար։ `langfuse.observation.completion_start_time`-ը ISO 8601 ձևաչափով է
start + TTFT պահին միայն այն դեպքում, երբ TTFT-ը հայտնի է և գտնվում է տևողության սահմաններում։
Cost attributes չեն ուղարկվում։

Identity modes-ը կիրառվում է `langfuse.user.id`-ի նկատմամբ՝

- `pseudonymous` (լռելյայն)՝ API key-ի internal id-ի HMAC-SHA256-ը՝ պատահական
  destination-ին հատուկ 32-բայթանոց salt-ով։ Salt-ը ստեղծվում է ստեղծման ժամանակ, եթե բացակայում է,
  գաղտնագրվում է որպես `identitySalt`, երբեք չի վերադարձվում և պահպանվում է խմբագրումների ընթացքում։
  Raw key ids-ը երբեք չեն տեղադրվում span attributes-ում։ Destination-ի salt-ի վերաստեղծումը կամ
  պտտումը փոխում է identities-ը։
- `keyName`՝ կազմաձևված API key-ի անունը՝ միտումնավոր բացահայտելով այդ operator label-ը։
- `none`՝ user id չկա։ Session tags-ը, երբ առկա են, շարունակում են արտահանվել․ այս modes-ը
  չեն անանունացնում prompt-ի կամայական բովանդակությունը կամ operator-ի կողմից տրամադրված session/correlation labels-ը։

### Սկսում առանց backfill-ի

Միայն ստեղծման ժամանակ միացրեք **Սկսել ընթացիկ դիրքից (բաց թողնել առկա logs-ը)** կամ
create API payload-ի վերին մակարդակում փոխանցեք
`startFromCurrentPosition: true`։ Սա սկզբնավորում է
`cursor_row_id`-ը ներկայում պահպանվող call-log rowid-ի առավելագույն արժեքով՝ օգտագործելով
գոյություն ունեցող cursor helpers-ը, առանց migration-ի։ Լռելյայն արժեքը false է (cursor 0 և պահպանված
պատմության backfill)։ Սա update-time cursor reset setting չէ։

Ընդհանուր `ttftMs` հավելումը նաև ավելացնում է nullable `ttft_ms` սյունակ BigQuery mapper-ում
և new-table schema-ում․ դրա schema test-ը պահանջում է, որ canonical record-ի յուրաքանչյուր field
ունենա column։ Գոյություն ունեցող tables-ը շարունակում են արտահանվել առանց փոփոխության․
`prepare()`-ը կարդում է table schema-ն և բաց է թողնում միայն `ttft_ms`-ը, երբ այդ column-ը բացակայում է։
Ավելացրեք nullable INT64 column-ը՝ հաջորդ run-ի ժամանակ TTFT ստանալու համար, կամ օգտագործեք new table։
Optional TTFT column-ը schema update չի գործարկում։ Usage-evidence columns-ը
հետևում են ստորև ներկայացված conditional, opt-in compatibility flow-ին․ row-ի մյուս fields-ը
պահպանում են strict schema checking-ը։

---

## 6. Նպատակակետի ավելացում

1. Ստեղծեք `src/lib/logExport/destinations/<name>.ts`՝ արտահանելով `LogExportDestinationType`՝
   Zod-ի `configSchema`, միջերեսի համար `fields` նկարագրիչների զանգված, `secretFields` և
   `createClient(config)`, որը վերադարձնում է `test()` / `prepare()` / `send(records)`։
2. Ավելացրեք այն `DESTINATIONS` զանգվածում՝ `src/lib/logExport/registry.ts` ֆայլում։
3. Գրեք թեստեր `tests/unit/` պանակում։

Սա ամբողջ փոփոխությունն է. տվյալների պահպանումը, cron առաջադրանքը, REST շերտը, գաղտնի տվյալների գաղտնագրումը և
կառավարման վահանակի ձևը բոլորն օգտվում են գրանցամատյանից։

Նոր նպատակակետի համար երկու կանոն կա.

- `send()`-ը մասնակի ձախողման դեպքում **պետք է բացառություն նետի**։ Հաջող ավարտը նշանակում է՝ «նպատակակետն ունի այս տողերը»,
  և կուրսորը վերջնականապես անցնում է դրանցից առաջ։
- Օգտատիրոջ տրամադրած URL ընդունող նպատակակետը հարցում կատարելուց առաջ պետք է վավերացնի այն
  `parseAndValidateWebhookUrl`-ի միջոցով (`src/shared/network/outboundUrlGuardPolicy.ts`),
  ինչպես դա անում են webhook-երը։ BigQuery-ին սա անհրաժեշտ չէ. դրա հոսթերը հաստատուն են։

---

## 7. Գործարկում

- **Վահանակ**: Integrations → Log export։ Ավելացրեք նպատակակետ, գործարկեք **Test**՝ հավատարմագրերը ստուգելու համար
  առանց տողեր գրելու, այնուհետև միացրեք այն։
- **Չմշակված հերթ**: յուրաքանչյուր նպատակակետի քարտում ցուցադրվում են սպասվող տողերը և կուրսորը, իսկ `GET
/api/log-export/status`-ը վերադարձնում է նույն թվերը՝ գումարած վերջին 20 աշխատանքների գործարկումները։
- **Խափանված նպատակակետը չի խափանում մյուսներին** — գործարկման ամփոփագիրը գրանցում է յուրաքանչյուր նպատակակետի
  կարգավիճակը `last_status` / `last_error` դաշտերում, իսկ աշխատանքների գործարկումների պատմությունը պահպանում է
  ընդհանուր արդյունքը։
- **Նպատակակետի ջնջումը ջնջում է դրա կուրսորը։** Այն կրկին ավելացնելը սկսում է պահպանված ամենահին
  call log-ից, ինչի հետևանքով նորից ուղարկվում են այն տողերը, որոնք նպատակակետը կարող է արդեն ունենալ։ BigQuery-ում
  յուրաքանչյուր տողի `insertId`-ը դա կանխում է միայն BigQuery-ի սեփական կրկնօրինակների հեռացման պատուհանի ընթացքում,
  ուստի նախընտրելի է նպատակակետն անջատել, ոչ թե ջնջել։

### Օգտագործման ապացույցների սխեմայի համատեղելիություն

Նոր BigQuery աղյուսակները ներառում են nullable `usage_evidence` (STRING containing JSON) և
`usage_estimated` (BOOL) դաշտերը։ Միացված `autoCreate`-ի դեպքում գոյություն ունեցող աղյուսակը կարող է ստանալ
միայն այս բացակայող nullable սյունակները։ Արտահանողը պահպանում է ամբողջ գոյություն ունեցող
սխեման՝ ներառյալ դաշտերի մետատվյալները, և վերադարձված etag-ի միջոցով ուղարկում է պայմանական PATCH հարցում։
Սխեմայի համաժամանակյա փոփոխությունը հանգեցնում է արտահանման ձախողման՝ այն վերագրելու փոխարեն․ հաջորդ գործարկումը
կրկին կարդում է աղյուսակը։

Անջատված `autoCreate`-ի դեպքում այս սյունակները ավելացրեք ինքներդ՝ նախքան usage evidence-ով
գրառումներ արտահանելը։ Բացակայող սխեմայի/etag-ի մետատվյալները կամ ձախողված թարմացումը նույնպես կանխում են
ապացույց պարունակող ներդրումները։ Արտահանման կուրսորը չի առաջանում այդ ձախողման դեպքում, և
ապացույցը երբեք լուռ չի անտեսվում։ Տեղային գրանցամատյանների պահպանումը շարունակում է կիրառվել, քանի դեռ
արտահանումն արգելափակված է, ուստի լուծեք ձախողումը նախքան պահպանված սկզբնաղբյուրի տողերի ժամկետի լրանալը։
