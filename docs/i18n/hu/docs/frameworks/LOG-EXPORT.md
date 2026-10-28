# Log export (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Az OmniRoute hívásnaplóinak folyamatos, inkrementális exportálása külső analitikai adattárba.

Az irányítópult Naplók lapja SQLite-ban (`call_logs`) tárolja a kérések előzményeit, amelyeket a
rotáció és a megőrzési idő korlátoz. A naplóexportálás ütemezetten továbbítja ugyanezt a rekordhalmazt, így az
a helyi adatbázisnál tovább megőrizhető, és más adatokkal is összekapcsolható. Az első célrendszer a BigQuery; a
folyamat regiszteralapú, így további célrendszerekkel bővíthető.

---

## 1. Működés

```
server (decrypt + validate config, reconcile cursor)
  → start IPC → isolated exportChild OS process
    → read-only storage.sqlite → shared call-log query/mapping
      → async artifact hydration → destination prepare()/send()
        → batch IPC → server persists cursor → ack IPC
          → next batch; done IPC → server records success
```

- **Ütemezés** — egyetlen `JobRegistry` cron-feladat, a `log_export`, alapértelmezés szerint `0 * * * *` ütemezéssel (óránként,
  UTC szerint). Regisztrálása a `src/lib/initCloudSync.ts` fájlban történik; az `OMNIROUTE_LOG_EXPORT_CRON` változóval felülírható.
  Minden ütemezett futás sorban feldolgozza az összes **engedélyezett** célrendszer várakozó rekordjait.
- **Kurzor** — az SQLite implicit `call_logs.rowid` értéke, amely célrendszerenként a
  `log_export_destinations.cursor_row_id` mezőben tárolódik. A kurzor szándékosan nem a `timestamp`: a hívók
  saját értéket is megadhatnak, ezért egy lassú kérés később kerülhet beírásra, mint egy később indult,
  gyorsabb kérés, és az időbélyeg-alapú kurzor kihagyná azt.
- **Kötegelés** — kérésenként `batch_size` sor (alapértelmezés szerint 500), futásonként `max_rows_per_run` sor
  (alapértelmezés szerint 10000), így egy nagyobb lemaradás több ütemezett futás alatt dolgozható fel, ahelyett, hogy egyetlen futást blokkolna.
- **Kézbesítés** — a kurzor csak a `send()` sikeres befejeződése után lép előre. Sikertelen köteg esetén a
  kurzor változatlan marad, így a következő futás ugyanazokkal a sorokkal próbálkozik újra. A garancia
  legalább egyszeri kézbesítés célrendszeroldali deduplikációval, nem pedig valódi, pontosan egyszeri kézbesítés: a BigQuery minden
  sor kulcsaként a hívásnapló-azonosítót használja, amelyet a saját deduplikációs időablakán belül, a lehetőségekhez mérten vesz figyelembe.
- **Átfedés elleni védelem** — az ütemezett cron-futás és a `POST .../run` egyszerre is elindulhat. A már
  feldolgozás alatt álló célrendszert a rendszer kihagyja ahelyett, hogy kétszer dolgozná fel (`skipped: true` a futás eredményében),
  így egy párhuzamos futás nem küldhet újra köteget, és nem írhatja vissza a kurzort egy korábbi értékre.
- **Helyreállítás teljes törlés után** — ha a `cursor_row_id` a `MAX(rowid)` fölé kerül (a teljes táblát
  kiürítették, és a sorazonosítók újraindultak), a futtató 0-ra áll vissza ahelyett, hogy végleg figyelmen kívül hagyná az új sorokat.

### Elkülönített futtató és korlátok

Node alatt minden célrendszerhez tartozó futás külön, rövid életű operációsrendszer-gyermekfolyamatot indít (`child_process`
IPC-vel, nem pedig `worker_threads`). A törzsek beolvasása, a hasznos adatok JSON-feldolgozása és -szerializálása, a célrendszer
`prepare()` művelete és a célrendszer hálózati I/O-ja mind ott fut, nem a kiszolgáló eseményciklusában.
Az IPC-n csak konfiguráció és kis méretű előrehaladási üzenetek haladnak át; az exportált rekordok soha nem kerülnek vissza
a kiszolgálóra. A cron-feladat és az azonnali futtatás útvonala megtartja ugyanazt a nyilvános eredményformátumot és átfedés elleni védelmet.

A gyermekfolyamat a kiszolgáló feloldott `DATA_DIR/storage.sqlite` fájlját csak olvasható módban nyitja meg a `node:sqlite` használatával,
`busy_timeout=5000` és `query_only=ON` beállításokkal. Nem importál adatbázis-singleton példányt, és nem végez
migrációt, biztonsági mentést vagy SQLite-frissítést. A hiányzó vagy sérült adatartefaktumok nyilvántartása (beleértve a
sérült adatartefaktumhoz tartozó UPDATE műveletet) továbbra is kizárólag az irányítópult részletes nézetének kódútvonalán marad. A két kódútvonal ugyanazt a
mellékhatásmentes részletfeloldót használja; az exportálás aszinkron fájlrendszer-olvasást és ugyanazt az adatartefaktum → régi
beágyazott adat → régi lemezadat → nincs adat feloldási sorrendet alkalmazza. A futás rögzíti a legnagyobb beszúrási sorazonosítót,
amikor a gyermekfolyamat megnyitja az olvasót; a későbbi beszúrások a következő futásig várnak. Ez beszúrási
határ, nem pedig hosszú életű SQLite-tranzakció: a WAL-írók és az ellenőrzőpont-képzés a hálózati
várakozások alatt is szabadon működhetnek. Ez a határ nem fagyasztja be a meglévő sorok frissítését és törlését.

Minden elfogadott köteg után a gyermekfolyamat nyugtázásra vár. A kiszolgáló először tartósan menti
a kurzort az `advanceLogExportCursor` segítségével, majd elküldi az `ack` üzenetet; addig nem indul el a következő köteg.
Küldési hiba, összeomlás vagy időtúllépés esetén a rendszer hibát rögzít, és nem lépteti előre a kurzort az adott köteghez. A korábban
nyugtázott kötegek véglegesítve maradnak; legfeljebb az egyetlen, még nem nyugtázott köteg küldhető újra.
Sikert csak a `done` üzenet és a gyermekfolyamat szabályos kilépése után rögzít a rendszer. Hiba esetén a gyermekfolyamatot
SIGTERM jellel állítja le, majd 500 ms elteltével szükség esetén SIGKILL jelet küld, a futtató pedig megvárja a folyamat lezárását.

| Környezeti változó                            | Alapérték | Rendeltetés                                    |
| --------------------------------------------- | --------- | ---------------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000    | Célrendszerenkénti valós idejű időkorlát       |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024      | A gyermekfolyamat V8 old-space korlátja MB-ban |

Érvénytelen, nem pozitív vagy nem egész értékek esetén az alapértékek érvényesek. A heap beállítása nem a teljes
RSS korlátja; a nagyon nagy kötegek továbbra is kimeríthetik a gyermekfolyamat memóriáját, és biztonságosan meghiúsíthatják a futást.
Az 1024 MB-os alapérték elegendő tartalékot hagy az alapértelmezett, 500 soros, 512 KiB méretű adatartefaktumokat tartalmazó köteghez,
engedélyezett törzsekkel, beleértve a BigQuery bájtméret szerint darabolt JSON-szerializálását is. Ettől azonban egy
10000 soros, törzseket is tartalmazó köteg még nem lesz biztonságos. A V8 heap kimerülésekor a rendszer konkrét teendőt jelző hibát rögzít: csökkentse a köteg
méretét, vagy növelje az `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` értékét; a kurzor az utolsó
nyugtázott kötegnél marad. A korábbi beágyazott vagy lemezen tárolt törzsekre nem vonatkozik a modern adatartefaktumok méretkorlátja.
Az üzemeltetőknek az RSS memóriaigényével külön kell számolniuk, különösen memóriakorlátos konténerekben.

A gyermekfolyamat csak a feloldott `DATA_DIR`, `NODE_ENV`, az explicit `TZ` (a régi fájlnevek
helyi idő szerinti feloldásához), az `ELECTRON_RUN_AS_NODE` változót, ha jelen van, valamint a következő kimenő kapcsolati bemeneteket örökli:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (és kisbetűs változataik),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
Egy globális Undici dispatcher a szerver kizárólag környezeti változókon alapuló proxyfeloldását és a helyi gépekre vonatkozó
proxymegkerülési szabályait használja, beleértve a `NO_PROXY` változót is; nem importálja a `proxyFetch.ts` fájlt vagy annak adatbázis-/funkciókapcsolóit.
A proxy hitelesítő adatai ki vannak takarva a továbbított kimenetből és a rögzített hibákból. A célhely hitelesítő adatai
csak egyetlen indítási IPC-üzenetben kerülnek átadásra, soha nem az argv-ban vagy a környezetben; a kimenetek és hibák továbbítása
előtaggal ellátva és megtisztítva történik. A gyermekfolyamat indítási argumentumai csak az `ExperimentalWarning` figyelmeztetést tiltják le, hogy
a Node SQLite-figyelmeztetése ne ismétlődjön minden cron-futáskor; a többi figyelmeztetéstípus látható marad.

A célhelymoduloknak Next.js-/kizárólag szerveroldali függőségek nélkül is importálhatónak kell lenniük. A meglévő
BigQuery-megvalósítás már teljesíti ezt a követelményt. A hozzáférési tokenek gyorsítótárai csak a gyermekfolyamat
futásának idejére érvényesek, futások között nem maradnak meg. A támogatott futtatókörnyezet a Node (a `package.json` engines mezője szerint), de a README Bun
telepítési szakasza és a `Dockerfile.bun` egy éles környezetben használható kompatibilitási lehetőséget is kínál a
`bun:sqlite` használatával (`src/lib/db/core.ts` / adapterek). Bun alatt ezért az exportálások megtartják a korábbi,
folyamaton belüli végrehajtási útvonalat, és egyszeri figyelmeztetést adnak: a gyermekfolyamat heap- és időkorlát-izolációja nem érhető el. Használjon
Node-ot az eseményhurok és a memóriaelfogyás (OOM) elleni izolációhoz; a Bun itt nem kizárólag fejlesztési célú környezetként van kezelve.

Ha az `includeBodies` engedélyezve van, részesítse előnyben a perces gyakoriságú ütemezést, például:
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, ahelyett, hogy óránkénti exportálásra váró üzenettörzsek halmozódnának fel.
A köteg- és sorkorlátok továbbra is behatárolják az egyes futásokat. A folyamatindítás költsége célhelyenként és futásonként jelentkezik;
ez egy kis indítási többletköltséget vállal a szerver eseményhurkának izolációjáért, nem pedig a teljes CPU-használat csökkentését célozza.

### Üzenettörzsek (promptok és generált válaszok)

Alapértelmezés szerint az export csak a Naplók **listájában** megjelenő összesítő mezőket tartalmazza. A
**Promptok és válaszok exportálása** (`includeBodies`) bekapcsolásával ezen felül az is átadásra kerül, ami a Naplók **részletező**
paneljén az egyes hívásoknál látható:

| Mező                             | Tartalom                                                                          |
| -------------------------------- | --------------------------------------------------------------------------------- |
| `request_body` / `response_body` | A hívás üzenettörzsei az irányítópulton megjelenített formában                    |
| `pipeline_route_decision`        | Az útválasztó által kiválasztott cél és modell                                    |
| `pipeline_client_request`        | A nyers kérés pontosan úgy, ahogyan a kliens elküldte                             |
| `pipeline_openai_request`        | A belső OpenAI-formátumra történő átalakítás után                                 |
| `pipeline_provider_request`      | A szolgáltatónak ténylegesen elküldött formában, a szolgáltató saját formátumában |
| `pipeline_provider_response`     | A szolgáltató nyers válasza                                                       |
| `pipeline_client_response`       | A hívónak visszaadott tartalom                                                    |
| `pipeline_error`                 | A feldolgozási lánc szintű hiba részletei sikertelen hívás esetén                 |
| `bodies_truncated`               | Igaz, ha a fenti mezők bármelyike elérte a `maxBodyBytes` korlátot                |

Ez prompttartalom, ezért **alapértelmezés szerint ki van kapcsolva**, és szándékosan célhelyenként választható.
Az kerül továbbításra, ami az irányítópulton látható, mivel az exportálás és a `getCallLogById` ugyanazt a részletfeloldást
használja: az üzenettörzsekből
már íráskor eltávolításra kerülnek a személyazonosításra alkalmas adatok, a titkos adatok pedig kitakarásra kerülnek, és a
`noLog` API-kulccsal végzett hívások egyáltalán nem tárolnak üzenettörzset, így nincs mit exportálni.

Az üzenettörzsek soronként, a fájlrendszerben tárolt állományból kerülnek beolvasásra, így a részletes adatok betöltése csak azoknál a célhelyeknél
történik meg, amelyek ezt kérték. Hiányzó vagy sérült állomány esetén az összesítés null értékű üzenettörzsekkel kerül exportálásra,
ahelyett, hogy a köteg hibával leállna, és a kurzor elakadna.

A `maxBodyBytes` (alapértelmezés: 262144) minden mező méretét korlátozza. A hosszabb üzenettörzsek **csonkolásra kerülnek,
nem pedig eldobásra** — egy levágott promptból még mindig kiderül, hogy „mi volt a kérdés” —, és a sor megkapja a
`bodies_truncated` jelölést. A streamelt, darabonkénti változások nem kerülnek exportálásra; az összeállított válasz
már megtalálható a `pipeline_provider_response` és a `pipeline_client_response` mezőben.

---

## 2. Fájlok

| Összetevő                            | Hely                                         |
| ------------------------------------ | -------------------------------------------- |
| Célhely szerződése                   | `src/lib/logExport/types.ts`                 |
| Nyilvántartás                        | `src/lib/logExport/registry.ts`              |
| Titkos adatok kezelése               | `src/lib/logExport/secrets.ts`               |
| Futtató (szülőfolyamat IPC-je)       | `src/lib/logExport/runner.ts`                |
| Folyamat életciklusa                 | `src/lib/logExport/childRunner.ts`           |
| Gyermekfolyamat belépési pontja      | `src/lib/logExport/exportChild.ts`           |
| Megnyitás csak olvasásra             | `src/lib/db/logExportReadOnly.ts`            |
| Közös lekérdezés/leképezés           | `src/lib/usage/callLogExportQueries.ts`      |
| Részletek feloldása                  | `src/lib/usage/callLogDetailResolver.ts`     |
| API-vetület                          | `src/lib/logExport/presenter.ts`             |
| BigQuery-célhely                     | `src/lib/logExport/destinations/bigquery.ts` |
| Google-szolgáltatásfiók hitelesítése | `src/lib/logExport/googleServiceAccount.ts`  |
| Hívásnapló forrása                   | `src/lib/usage/callLogExportSource.ts`       |
| Tartós tárolás                       | `src/lib/db/logExportDestinations.ts`        |
| Cron-feladat                         | `src/lib/jobs/logExportJob.ts`               |
| REST-réteg                           | `src/app/api/log-export/`                    |
| Vezérlőpult oldala                   | `src/app/(dashboard)/dashboard/log-export/`  |

Séma: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

Minden útvonal felügyeleti hitelesítést igényel (`requireManagementAuth`). A titkos adatok soha nem kerülnek visszaadásra:
a tárolt titkos adat helyett a literális `__stored__` érték érkezik vissza, és ha frissítéskor ezt az értéket küldjük vissza,
a tárolt hitelesítő adat változatlan marad.

Olyan célhely létrehozásához vagy frissítéséhez, amelynek típusa titkos adatot deklarál, **szükséges
a `STORAGE_ENCRYPTION_KEY`**. Enélkül az `encrypt()` észrevétlenül, változtatás nélkül továbbítja a bemenetet, ezért az írás
400-as hibával elutasításra kerül ahelyett, hogy a hitelesítő adat egyszerű szövegként kerülne az SQLite-ba (ugyanezt a védelmet
alkalmazza a Telegram webhook is).

| Metódus  | Útvonal                                  | Rendeltetés                                                               |
| -------- | ---------------------------------------- | ------------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Célhelytípusok és konfigurációs mezőik listája                            |
| `GET`    | `/api/log-export/destinations`           | Célhelyek listázása (titkos adatok kitakarva)                             |
| `POST`   | `/api/log-export/destinations`           | Célhely létrehozása                                                       |
| `GET`    | `/api/log-export/destinations/{id}`      | Egy célhely lekérése                                                      |
| `PUT`    | `/api/log-export/destinations/{id}`      | Név / engedélyezettség / konfiguráció / kötegelés frissítése              |
| `DELETE` | `/api/log-export/destinations/{id}`      | Törlés                                                                    |
| `POST`   | `/api/log-export/destinations/{id}/test` | Hitelesítő adatok ellenőrzése, írás nélkül                                |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Várakozó adatok azonnali feldolgozása, az ütemezett futással azonos módon |
| `GET`    | `/api/log-export/status`                 | Cron állapota, legutóbbi futások, feldolgozásra váró adatok célhelyenként |

A `GET /api/log-export/types` teszi általánossá a felhasználói felületet: a vezérlőpult űrlapja
a visszaadott mezőleírók alapján jelenik meg, így egy új célhelyhez nem szükséges módosítani a felhasználói felületet.

---

## 4. BigQuery-célhely

Konfigurációs kulcsok (`type: "bigquery"`):

| Kulcs                | Megjegyzések                                                                             |
| -------------------- | ---------------------------------------------------------------------------------------- |
| `projectId`          | Az adatkészletet tartalmazó GCP-projekt                                                  |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                          |
| `tableId`            | `[A-Za-z0-9_]+`                                                                          |
| `location`           | Csak az adatkészlet létrehozásakor használatos (alapértelmezés: `EU`)                    |
| `serviceAccountJson` | Szolgáltatásfiók-kulcs. Titkos adat: tároláskor titkosított, soha nem kerül visszaadásra |
| `autoCreate`         | Az adatkészlet és a tábla létrehozása az első exportáláskor (alapértelmezés: `true`)     |

A szolgáltatásfióknak `bigquery.tables.updateData` jogosultságra van szüksége a céltáblán, továbbá
`bigquery.datasets.create` / `bigquery.tables.create` jogosultságra, ha az `autoCreate` be van kapcsolva.

A konfigurált köteg **kurzoregység**, nem HTTP-egység: a `send()` legfeljebb 500 soros insertAll
hívásokra bontja, így egy nagy `batch_size` sem lépheti túl a BigQuery kérelmenkénti 10 MB-os korlátját.
Az átmeneti állapotkódok (408/429/500/502/503/504) esetén legfeljebb három újrapróbálkozás történik exponenciálisan
növekvő várakozási idővel, ugyanazokat az insertIds értékeket használva; a hitelesítési és sémahibák már az első kísérletnél kivételt váltanak ki,
ahelyett, hogy feleslegesen folytatódna a futás.

A néhány pillanattal korábban létrehozott tábla még nem látható a streamelési végpont számára, amely
néhány másodpercig 404-es választ ad. Ilyen 404-es válasz esetén történik újrapróbálkozás, de **csak akkor, ha a táblát ez a futás hozta létre** —
egy valóban hiányzó tábla továbbra is azonnali hibát okoz. Fontos, hogy ha egy táblát nemrég törölt néven
hoz létre újra, a BigQuery több percig elutasítja a streamelt beszúrásokat; ez a
törlés, majd újralétrehozás sajátossága, ezért egy tábla törlése és ismételt hozzáadása helyett inkább használjon új táblanevet.

**A részleges hiba HTTP 200 válaszként érkezik, nem üres `insertErrors[]` mezővel.** Ezt a rendszer
hibának tekinti, és kivételt vált ki, ami megakadályozza, hogy a kurzor túllépjen azokon a sorokon, amelyeket a BigQuery soha nem
fogadott el; ezt a viselkedést a `tests/unit/log-export-bigquery.test.ts` rögzíti.

Az adatátvitel egyszerű REST-en keresztül történik — egy saját aláírású RS256-állítás hozzáférési tokenre cserélődik a
`https://oauth2.googleapis.com/token` címen, majd a sorok a `tabledata.insertAll` végpontra kerülnek. Nem kerül be Google SDK
függőségként. A hozzáférési tokeneket a rendszer folyamaton belül, (szolgáltatásfiók, hatókör) páronként gyorsítótárazza.

A létrehozott tábla a Naplók lap minden mezőjéhez egy oszlopot tartalmaz, kiegészítve az `exported_at` oszloppal, és az elrendezése
a hívásnaplók tényleges lekérdezési módjához igazodik:

- **Napi particionálás a `timestamp` alapján**, így a dátummal korlátozott lekérdezés csak az érintett napokat vizsgálja.
- **Klaszterezés az `api_key_name`, `provider`, `model`, `status` alapján** (ebben a sorrendben), így az
  indítóra, a célra vagy a sikertelenségre történő szűrés kizárja a nem releváns blokkokat az egyes partíciókon belül. A BigQuery
  legfeljebb négy klaszterezési oszlopot engedélyez, és a sorrend számít: a kizárólag `api_key_name` szerinti szűrés
  kizár blokkokat, a kizárólag `status` szerinti szűrés nem.
- **Opcionális partíciómegőrzés** a `partitionExpirationDays` segítségével (a 0 mindent megőriz), amely
  a tábla létrehozásakor kerül alkalmazásra.

Mindkét beállítás a létrehozáskor lép érvénybe. Egy meglévő tábla megtartja a korábbi elrendezését, ezért
ha ezeket szeretné alkalmazni, a célhelyet egy új táblaazonosítóra irányítsa.

A `tests/unit/log-export-bigquery.test.ts` ellenőrzi, hogy a leképező és a táblaséma összhangban maradjon,
így egy új hívásnapló-oszlop nem veszhet el észrevétlenül az exportálás során.

A kötegek darabolása **mind** a sorok száma, mind a szerializált méret alapján történik. Önmagában a sorszám nem elegendő,
ha az export az adattartalmakat is tartalmazza: 500, promptokat tartalmazó sor több tíz megabájt is lehet, az insertAll pedig
elutasítja a 10 MB-nál nagyobb kérelmeket. A darabok 500 sornál vagy 9 MB-nál zárulnak le, attól függően, hogy melyik korlátot érik el előbb.

---

## 5. OTLP/HTTP nyomkövetési célhely

A konfiguráció a `type: "otlp-http"` értéket használja. Ez a tárolt hívásnaplók ütemezett,
kurzorral követett exportálása, nem pedig az
`open-sse/services/routing/otel.ts` fájlban található, élő útválasztási eseményeket legjobb igyekezet szerint fogadó célpont. Nem olvassa és nem módosítja annak környezeti
változóit, időzítőit vagy puffereit. Mindkettő engedélyezése két egymástól független spantípust eredményezhet;
e hívásnapló-spanek megkülönböztetéséhez használja az `omniroute.log-export` instrumentációs hatókört.

| Kulcs                    | Alapértelmezés / rendeltetés                                                              |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| `endpoint`               | Kötelező teljes HTTP(S) nyomkövetési URL; nem egészül ki `/v1/traces` utótaggal           |
| `headers`                | Opcionális `Name: value` sorok vagy karakterláncokat tartalmazó JSON-objektum; titkosítva |
| `requestHeaderAllowlist` | Üres (kikapcsolva); spanattribútumként rögzítendő kliensfejlécnevek/-előtagok             |
| `serviceName`            | `omniroute`; a `service.name` erőforrás-attribútum                                        |
| `langfuseMapping`        | `false`; Langfuse-generálási, -munkamenet- és -felhasználói attribútumokat ad hozzá       |
| `identity`               | `pseudonymous`, `keyName` vagy `none`                                                     |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                                   |
| `timeoutMs`              | `30000` HTTP-próbálkozásonként                                                            |
| `environment`            | Nincs beállítva; opcionális `langfuse.environment`                                        |

Az általános irányítópult megjeleníti ezeket a mezőket. A `paths` az API-n keresztül tömböt, illetve szövegterületen
újsorokkal/vesszőkkel elválasztott pontos útvonalakat fogad el. A beágyazásokhoz, újrarangsoroláshoz és más műveletekhez tartozó útvonalakat
kihagyja, kivéve, ha kifejezetten engedélyezve vannak. A kihagyott sorok is előreléptetik a kurzort; a meglévő
futtató `exported`/`exportedTotal` számlálói a feldolgozott forrássorokat számolják, a kiszűrt
sorokat is beleértve, nem pedig az elfogadott spaneket. A szűrés a gyermekfolyamatban történik, annak
IPC-/kurzorszerződésének módosítása nélkül.

Az URL-ellenőrzés az
`src/shared/network/outboundUrlGuard.ts` fájl adatbázis-független `parseAndValidateNonMetadataUrl` segédfüggvényét használja: a
`block-metadata` házirendet. Ugyanazokat a feltétel nélküli metaadat-/protokoll-/beágyazott-hitelesítőadat-ellenőrzéseket végzi el, mint a webhook-ellenőrző
engedélyezett privát URL-ek mellett, de szándékosan engedélyezi a localhost/LAN célokat globális
funkciókapcsolós felülbírálás nélkül. Ez lehetővé teszi a saját üzemeltetésű Langfuse-, Phoenix-, Tempo- és Collector-végpontok
használatát, beleértve a privát HTTP-végpontokat is. A felhőmetaadat-kiszolgálók mindig tiltva vannak.
Az átirányításokat nem követi, így a gyűjtő nem irányíthatja át a hitelesítő adatokat másik kiszolgálóra.
A meglévő lexikális URL-védelemhez hasonlóan ez sem rögzíti a DNS-feloldás eredményét; csak
az üzemeltető által ellenőrzött kiszolgálókat konfiguráljon. Részesítse előnyben a HTTPS-t, ha a végpont nem megbízható hálózaton található.

### Adattartalom és kézbesítés

Az OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) engedélyezett
soronként egy CLIENT spant továbbít, amelynek neve a kérés pontos útvonala. Az útvonalalapú elnevezés megkülönbözteti
a Chat Completions, Responses és Messages műveleteket anélkül, hogy modell- vagy azonosítóadatokat ágyazna a
span nevébe. Az erőforrás-attribútumok közé tartozik a `service.name` és a csomag `service.version` értéke.

A normál csevegési próbálkozásnaplózó (`open-sse/handlers/chatCore/attemptLogging.ts`) befejezéskor írja be
a `duration = Date.now() - startTime` értéket, és nem ad meg időbélyeget;
a `src/lib/usage/callLogs.ts` fájlban található `saveCallLogOperation` alapértelmezés szerint az írás
(befejezés) időpontját használja időbélyegként. Az exportálás ezért a befejezést a sor időbélyegére, a kezdetet pedig a befejezés mínusz időtartam
értékre állítja (ezredmásodpercben, decimális nanoszekundumra átszámítva). A hívó által megadott múltbeli időbélyegek
szintén befejezési időpontként maradnak meg; nincs soronkénti jelző a kezdés és a befejezés megkülönböztetésére.
A null időtartamból nulla lesz. Az érvénytelen/hiányzó időbélyegek nem determinisztikus spanek létrehozása helyett
a teljes köteg hibáját okozzák. A `ttftMs` lehet null, és az `omniroute.ttft_ms` attribútumra képeződik le.

Az attribútumok közé tartozik a `gen_ai.operation.name="chat"`, a szolgáltató, a kért/válaszmodell,
a bemeneti/kimeneti tokenek, az opcionális gyorsítótár-olvasási/-létrehozási/gondolkodási tokenek, a HTTP-állapot,
a kombináció, a gyorsítótár forrása, a munkamenetcímke és a korrelációs azonosító. Az egész számú OTLP-értékek és az időbélyegek
decimális karakterláncok; a karakterláncok, logikai értékek és törtszámok a natív OTLP-értékváltozataikat
használják. A hibás spanek ERROR állapotot és megtisztított állapotüzenetet kapnak. A kanonikus
rekord nem tartalmaz upstream kiszolgáló-URL-t, ezért a `server.address` kimarad, ahelyett, hogy tévesen
a gyűjtőt azonosítaná modellszerverként. A költséget nem exportálja.

Csak az `includeBodies=true` tölti be a tartalmat. A `langfuseMapping=false` beállítás mellett
a `gen_ai.input.messages` / `gen_ai.output.messages` az OmniRoute által tárolt, megtisztított kérés-/választörzs
JSON-t továbbítja (ha értelmezhető, kanonizálva), nem pedig átalakított, szemantikai konvenciók szerinti
üzenettömböt. A csonkolt/nem JSON-törzsek nyers szövegként maradnak meg. A `langfuseMapping=true` beállítás mellett
a törzsek csak `langfuse.observation.input` / `langfuse.observation.output` formájában kerülnek ki;
a `gen_ai.*.messages` attribútumok kimaradnak, így minden törzs csak egyszer kerül elküldésre. Mindkét mód
a meglévő tartalombetöltési folyamatból örökli a `maxBodyBytes` értékét;
az `omniroute.bodies_truncated=true` jelzi a csonkolást.
Ez a célhely nem ad hozzá további folyamatpillanatképeket vagy megtisztítás nélküli artefaktumolvasásokat;
az opcionális kérésfejléc-rögzítés az alább ismertetett, meglévő betöltött klienspillanatképet használja.
Törzsek exportálásakor használjon perces ütemezést, például `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`,
ahelyett, hogy óránkénti feldolgozásra váró hátralékot halmozna fel.

### Opcionális klienskérés-fejlécek

A fejléc-rögzítés **alapértelmezés szerint ki van kapcsolva**. Állítsa be a `requestHeaderAllowlist` értékét a célhely konfigurációjában,
és engedélyezze a **Promptok és válaszok exportálása** lehetőséget (`includeBodies: true` a célhelyen).
Az engedélyezési lista az API-n keresztül tömböt, illetve szövegterületen újsorral/vesszővel elválasztott neveket fogad el:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

A nevek egyezése pontos, de nem különbözteti meg a kis- és nagybetűket, kivéve, ha egyetlen záró `*` egy nem üres
fejlécnév-előtagot jelöl ki. Az önálló `*`, a beágyazott helyettesítő karakterek és az érvénytelen HTTP-fejlécnevek elutasításra kerülnek.
Legfeljebb 64 kiválasztó adható meg, mindegyik legfeljebb 256 ASCII bájtos névvel/előtaggal.
Ez a beállítás független a `headers` beállítástól, amely az exportálót hitelesíti a gyűjtő felé.

A rögzítés kizárólag a `pipeline_client_request` értékét olvassa, amelyet a mentett részletes feldolgozási lánc
`clientRawRequest` (vagy a korábbi `clientRequest`) mezője tölt ki. Soha nem használja helyette a szolgáltatónak küldött kérés fejléceit.
A részletes feldolgozásilánc-naplózásnak engedélyezve kellett lennie a kérés rögzítésekor. Ha az
`includeBodies` le van tiltva, vagy az ügyfélpillanatkép JSON-ja hiányzik, sérült vagy csonkolt, nem kerülnek kibocsátásra
fejlécattribútumok. A `maxBodyBytes` növelése megakadályozhatja a pillanatkép exportáláskori csonkolását;
a soha el nem mentett részleteket azonban nem állíthatja vissza. Az 1 MiB-nál nagyobb vagy több mint
256 fejlécbejegyzést tartalmazó pillanatképet a rendszer figyelmen kívül hagyja. A meglévő prompt-/válaszexport a
fejlécrögzítés mellett is engedélyezve marad; az engedélyezési lista nem biztosít kizárólag fejléceket betöltő módot.

A kiválasztott értékek `http.request.header.<full lowercase header name>` nevű OTLP-karakterlánctömbökké válnak,
még egyetlen karakterlánc esetén is. Például az `X-OmniRoute-Meta-Team: example-team` eredménye
`http.request.header.x-omniroute-meta-team`, az alábbi értékkel:
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
A teljes előtag megmarad: ezek hagyományos fejlécek, üzleti mezők értelmezése vagy
`omniroute.metadata.*` / Langfuse-metaadatokká alakítás nélkül. A `langfuseMapping` nem módosítja a fejlécek
szemantikáját. Egy kiválasztott, egyetlen értékű `User-Agent` a szabványos skalár
`user_agent.original` attribútumot is beállítja. Az egy értéken belüli vesszők nem bontják fel az értéket. A kis- és nagybetűs változatok a mentett
bejegyzések sorrendjében egyesülnek; bármely érvénytelen változat az adott fejléc teljes kihagyását eredményezi. Az attribútumok sorrendjét a kisbetűs név határozza meg.

Az Authorization, Proxy-Authorization, Cookie, Set-Cookie és API-kulcsot tartalmazó fejlécek, az
auth/token/secret/password/credential jelölőket tartalmazó nevek, valamint a belső átjáró hitelesítő adatai mindig
ki vannak zárva, még akkor is, ha ki vannak választva, vagy a tárolóban részlegesen maszkolva vannak. Az ismert hitelesítőadat-minták felismerése
a közös hitelesítőadat-felismerőt használja; a kitakarási jelölők kimaradnak, nem kerülnek biztonságos értékként exportálásra.
Csak karakterláncok és nem üres karakterlánctömbök fogadhatók el; számok vagy objektumok nem kerülnek típuskonverzióra.
Az érvénytelen neveket, prototípuskulcsokat, vezérlőkaraktereket (a vízszintes tabulátor kivételével) és hibás Unicode-ot
a rendszer figyelmen kívül hagyja anélkül, hogy a köteg meghiúsulna, vagy tartalmuk megjelenne a hibákban.

Minden span legfeljebb 32 fejlécet rögzít, fejlécenként 16 értékkel, értékenként 4096 UTF-8 bájttal,
és a rögzített fejlécnevekre és -értékekre összesen 16384 UTF-8 bájtos korláttal. A túlméretes/érvénytelen fejlécek
teljes egészükben kimaradnak, nem csonkolódnak. A kiválasztás az üzemeltető adatvédelmi döntése: a biztonságosnak tűnő nevek
is tartalmazhatnak személyes adatokat, és ezek a korlátok/felismerők nem alkotnak általános személyesadat-szűrőt.

### Kézbesítési korlátok

A kérések legfeljebb 500 spant és 4 MiB UTF-8 JSON-t tartalmazhatnak, a burkolóstruktúrával együtt.
A kurzorköteg első kérése előtt minden engedélyezett span mérete ellenőrzésre kerül. Ha egyetlen
span meghaladja a korlátot, a köteg egyetlen része sem kerül elküldésre, és a művelet a
`maxBodyBytes` csökkentésére vonatkozó útmutatással meghiúsul; a span nem marad ki csendben. Az előzetes ellenőrzés csak a rekordhivatkozásokat és
bájtszámokat őrzi meg, minden ideiglenes spant/JSON-t eldob; a spanek korlátozott méretű darabokhoz újra felépülnek
ahelyett, hogy a köteg második szerializált példánya is a memóriában maradna. HTTP 408/429/5xx, hálózati hibák és időtúllépések esetén legfeljebb
három kísérlet történik, 250/500 ms-os exponenciális várakozással. A `Retry-After` másodpercértékei vagy HTTP-dátumai
legfeljebb 5 másodpercre növelhetik a várakozást. Más állapotkódok azonnali hibát eredményeznek. Az OTLP 2xx részleges elutasítása szintén kivételt vált ki
az elveszett span nyugtázása helyett; az üres vagy érvényes JSON-nyugták elfogadhatók,
64 KiB-os válaszolvasási korláttal.

A hibák csak az exportáló saját tényeit tartalmazzák: HTTP-állapotkódot, újrapróbálkozási osztályt, kísérletszámot és az elküldött spanek
számát, illetve rögzített szöveget a nyugtázási/hálózati hibákról. A gyűjtő válaszának törzse,
a részleges siker darabszámai és a válaszfejlécek soha nem kerülnek be a hibákba, naplókba vagy az
irányítópultra. A sikertelen vagy részlegesen elfogadott köteg nem kerül nyugtázásra: a célhely
hibás állapotot jelez az adott állapotkóddal, a kurzor az utolsó nyugtázott kötegnél marad, a következő futás pedig
újraküldi ugyanazokat a sorokat. Az állandó hibát jelző állapotkódok mindaddig hibát okoznak, amíg a gyűjtőt vagy a konfigurációt
ki nem javítják. A válasz részleteihez használja a gyűjtő saját naplóit. A hívásnapló hibaösszefoglalóira továbbra is
külön kitakarás vonatkozik.
A `prepare()` semmit sem hoz létre; a teszt pontosan a `{"resourceSpans":[]}` tartalmat küldi el, és
jelenti a HTTP-állapotkódot anélkül, hogy hívásnapló-spaneket írna.

A nyomkövetési és spanazonosítók a
`"omniroute.trace\\0" + callLogId`, illetve `"omniroute.span\\0" + callLogId` SHA-256-kivonatának első 32/16 hexadecimális számjegyéből állnak. Az újraküldések
azonos azonosítókat tartalmaznak. Ez nem jelent deduplikációs garanciát: egyes háttérrendszerek, köztük a Langfuse
v4 adatfogadása, nem szűrik ki az azonos azonosítójú spanek ismétlődéseit. Egy összeomlás vagy egy darab részleges hibája
legfeljebb az egyetlen nem nyugtázott kurzorköteg újraküldését okozhatja; ez a teljes köteg megkettőződhet,
nem csak az utolsó HTTP-darabja. A kurzorköteg méretét ennek a kompromisszumnak a figyelembevételével válassza meg.

### Langfuse-példa

Saját üzemeltetésű Langfuse-példányhoz állítsa be ezeket a mezőket:

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

Az Authorization értékét helyben állítsa elő a szó szerinti `public-key:secret-key`
karakterlánc Base64-kódolásával (például a `Buffer.from(publicKey + ":" + secretKey).toString("base64")` használatával).
Ne illesszen valódi hitelesítő adatokat naplókba, képernyőképekbe vagy hibajegyekbe. A leképezés automatikusan
beállítja az `x-langfuse-ingestion-version: 4` fejlécet; az Authorization értékét továbbra is a `headers` mezőben kell megadni.
Mind a fejlécek, mind a generált identitássó a meglévő titkosított titkosmező-mechanizmust
és API-helyőrzőket használja; a `STORAGE_ENCRYPTION_KEY` kötelező.

A leképezés hozzáadja a generálás típusát/modelljét, a használat JSON-formátumú részleteit (bemenet/kimenet/összesen és az elérhető
gyorsítótárkulcsok), a bemenet/kimenet JSON-pillanatképeit, az ERROR/DEFAULT szintet, a megtisztított állapotüzenetet,
a nyomkövetés nevét, a munkamenet-azonosítót, az opcionális környezetet és a szűrhető
`langfuse.observation.metadata.<key>` attribútumot a szolgáltatóhoz, a kért modellhez, az útvonalhoz, a kombinációhoz, a gyorsítótár
forrásához és az állapothoz. A `langfuse.observation.completion_start_time` ISO 8601 formátumú értéke
a kezdési idő + TTFT, de csak akkor, ha a TTFT ismert, és az időtartamon belül van. Költségattribútumok nem kerülnek elküldésre.

Az identitásmódok a `langfuse.user.id` attribútumra vonatkoznak:

- `pseudonymous` (alapértelmezett): az API-kulcs belső azonosítójának HMAC-SHA256 lenyomata, véletlenszerű,
  célonkénti 32 bájtos sóval. A só létrehozáskor generálódik, ha nincs megadva, titkosítva tárolódik
  `identitySalt` néven, soha nem kerül visszaadásra, és szerkesztéskor megmarad. A nyers kulcsazonosítók soha
  nem kerülnek spanattribútumokba. A cél sójának újralétrehozása/rotálása megváltoztatja az identitásokat.
- `keyName`: a beállított API-kulcsnév, amely szándékosan felfedi ezt az üzemeltetői címkét.
- `none`: nincs felhasználóazonosító. A munkamenetcímkék továbbra is exportálódnak, ha vannak; ezek a módok nem
  anonimizálják a tetszőleges prompttartalmat vagy az üzemeltető által megadott munkamenet-/korrelációs címkéket.

### Indítás visszamenőleges betöltés nélkül

Kizárólag létrehozáskor engedélyezze az **Indítás az aktuális pozíciótól (meglévő naplók kihagyása)** beállítást, vagy adja meg
a `startFromCurrentPosition: true` értéket a létrehozási API-kérés törzsének legfelső szintjén. Ez a
`cursor_row_id` értékét a megőrzött hívásnapló aktuális legnagyobb rowid értékére inicializálja a meglévő kurzor-
segédfüggvényekkel, migráció nélkül. Az alapértelmezés hamis (0 értékű kurzor és a megőrzött előzmények visszamenőleges betöltése).
Ez nem a kurzor frissítéskori visszaállítására szolgáló beállítás.

A megosztott `ttftMs` bővítés egy nullázható `ttft_ms` oszlopot is hozzáad a BigQuery-leképezőhöz
és az új táblák sémájához: a sémateszt megköveteli, hogy minden kanonikus rekordmezőhöz tartozzon
oszlop. A meglévő táblák exportálása változatlanul folytatódik: a `prepare()` beolvassa a tábla sémáját, és
csak a `ttft_ms` mezőt hagyja ki, ha az oszlop hiányzik. Adja hozzá a nullázható INT64 oszlopot, hogy a következő futtatáskor megkapja
a TTFT értékét, vagy használjon új táblát. Nincs szükség PATCH-re, automatikus sémamódosításra vagy további
jogosultságokra; az összes többi sormező szigorú sémaellenőrzése megmarad.

---

## 6. Célhely hozzáadása

1. Hozd létre a `src/lib/logExport/destinations/<name>.ts` fájlt, amely egy `LogExportDestinationType` típust exportál:
   egy Zod `configSchema` sémát, egy `fields` leírótömböt a felhasználói felülethez, `secretFields` mezőket és egy
   `createClient(config)` függvényt, amely `test()` / `prepare()` / `send(records)` metódusokat ad vissza.
2. Add hozzá a `DESTINATIONS` tömbhöz a `src/lib/logExport/registry.ts` fájlban.
3. Írj teszteket a `tests/unit/` könyvtárba.

Ennyi a teljes módosítás: az adattárolás, a cron-feladat, a REST-réteg, a titkos adatok titkosítása és az
irányítópult űrlapja mind a regisztert olvassa.

Két szabály új célhelyekhez:

- A `send()` metódusnak részleges hiba esetén **kivételt kell dobnia**. A sikeres teljesülés azt jelenti, hogy „ezek a sorok már megvannak a célhelyen”,
  és a kurzor véglegesen túllép rajtuk.
- A felhasználó által megadott URL-t fogadó célhelynek a
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) segítségével kell ellenőriznie azt a lekérés előtt,
  ugyanúgy, mint a webhookoknak. A BigQuery esetében erre nincs szükség: a kiszolgálónevei állandók.

---

## 7. Üzemeltetés

- **Irányítópult**: Integrációk → Naplóexportálás. Adj hozzá egy célhelyet, futtasd a **Teszt** műveletet a hitelesítő adatok
  sorok írása nélküli ellenőrzéséhez, majd engedélyezd.
- **Feldolgozási hátralék**: minden célhelykártya megjeleníti a függőben lévő sorokat és a kurzort; a `GET
/api/log-export/status` ugyanezeket az adatokat adja vissza, kiegészítve az utolsó 20 feladatfuttatással.
- **Egy célhely hibája nem okozza a többi hibáját** — a futtatási összesítő célhelyenként rögzíti az
  állapotot a `last_status` / `last_error` mezőkben, a feladatfuttatási előzmények pedig az összesített adatokat tárolják.
- **A célhely törlése a kurzorát is törli.** Újbóli hozzáadásakor a feldolgozás a legrégebbi megőrzött
  hívásnapló-bejegyzéstől indul, így újraküldi azokat a sorokat is, amelyek már megvannak a célhelyen. A BigQuery esetében a soronkénti
  `insertId` ezt csak a BigQuery saját deduplikációs időablakán belül küszöböli ki, ezért a törlés
  helyett inkább tiltsd le a célhelyet.
