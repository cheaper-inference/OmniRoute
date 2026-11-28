# Log export (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Az OmniRoute hívásnaplóinak folyamatos, inkrementális exportálása külső analitikai adattárba.

Az irányítópult Naplók lapja SQLite-ban (`call_logs`) tárolja a kérések előzményeit, amelyeket a
rotáció és a megőrzési idő korlátoz. A naplóexportálás ütemezetten továbbítja ugyanezt a rekordhalmazt, így az
a helyi adatbázisnál tovább megőrizhető, és más adatokkal is összekapcsolható. Az első célrendszer a BigQuery; a
folyamat regiszteralapú, így további célrendszerekkel bővíthető.

---

## 1. Hogyan működik

```
server (decrypt + validate config, reconcile cursor)
  → start IPC → isolated exportChild OS process
    → read-only storage.sqlite → shared call-log query/mapping
      → async artifact hydration → destination prepare()/send()
        → batch IPC → server persists cursor → ack IPC
          → next batch; done IPC → server records success
```

- **Menetrend** — one `JobRegistry` cron job, `log_export`, alapértelmezés szerint `0 * * * *` (óránként, UTC). `src/lib/initCloudSync.ts`-ben regisztrálva; felülírható `OMNIROUTE_LOG_EXPORT_CRON`-vel. Minden kullancs kiürít minden** engedélyezve van** célállomás, szekvenciálisan.
- **Cursor** — SQLite implicit `call_logs.rowid`, célállomásonként megmaradt a `log_export_destinations.cursor_row_id` ben. `timestamp` szándékosan nem a kurzor: a hívók megadhatják saját értéküket, így egy lassú kérés írható egy később induló gyorsabb kérés után, és az időbélyegző kurzor kihagyná.
- **Adagolás** — `batch_size` sor kérésenként (alapértelmezett 500), `max_rows_per_run` sor futásonként (alapértelmezett 10 000), így a nagy lemaradás több jelölésen keresztül megy el, ahelyett, hogy blokkolna egyet.
- **Szállítás** — a kurzor csak `send()` feloldása után lép tovább. A sikertelen köteg ott hagyja a kurzort, ahol volt, így ugyanazokat a sorokat próbálja meg újra a következő futtatáskor. A garancia legalább egyszer plusz a céloldali duplikáció eltávolítása, nem igaz pontosan egyszer: BigQuery minden sort a hívásnapló azonosítójával kulcsol, amelyet a legjobb erőfeszítés alapján tiszteletben tart a saját dedup ablakában.
- **Átfedésvédő** — a cron tick és `POST .../run` együtt tud tüzelni. A már leürítés alatt álló célhelyet a rendszer kihagyja, nem pedig kétszer (a futás eredményében `skipped: true` ), így egy párhuzamos futás nem küldhet újra egy köteget, és nem írhatja vissza a kurzort.
- **Tisztítási helyreállítás** — ha `cursor_row_id` `MAX(rowid)` fölé kerül (az egész táblázatot törölték, és a sorokat újraindították), a futó visszateker 0-ra, ahelyett, hogy végleg megvakulna.

### Elszigetelt futó és határok

Minden Node-on futtatott cél egy különálló, rövid élettartamú OS gyermekfolyamatot indít el (`child_process` IPC-vel, nem `worker_threads`). A törzsolvasás, a hasznos teher JSON parsing/serialization, a cél `prepare()` és a célhálózat I/O mind ott futnak, nem a szerver eseményhurkán. Csak a konfigurációs és kis előrehaladási üzenetek keresztezik IPC; az exportált rekordok soha nem térnek vissza a szerverre. A cron feladat és a Futtatás most útvonal ugyanazt a nyilvános eredményt és átfedésvédelmet tartja meg.

A gyermek megnyitja a szerver feloldott `DATA_DIR/storage.sqlite` csak olvasható `node:sqlite`-t `busy_timeout=5000` és `query_only=ON` használatával. Nem importál DB singletont, és nem végez migrációt, biztonsági mentést vagy SQLite frissítést. Missing/corrupt műtermékek könyvelése (beleértve a UPDATE sérült műterméket is) csak az irányítópult részleteinek elérési útjában marad. Mindkét útvonal tisztán részletfeloldóval rendelkezik; az exportálás aszinkron fájlrendszer olvasását és ugyanazt a műterméket használja → legacy inline → legacy lemez → nincs felbontási sorrend. A futás pillanatképeket készít a maximális beszúrási sorból, amikor a gyermek megnyitja az olvasóját; a későbbi betétek megvárják a következő futtatást. Ez egy beillesztési határ, nem egy hosszú életű SQLite tranzakció: WAL írók és az ellenőrzőpontok szabadok maradnak a hálózati várakozás alatt. Updates/deletions létező sor nincs rögzítve ezen a határon.

Minden egyes elfogadott tétel után a gyermek nyugtázásra vár. A szerver először a kurzort `advanceLogExportCursor` tartja, majd elküldi `ack`; előtte nem indul el a következő adag. A küldési hiba, összeomlás vagy időtúllépés a köteg továbblépése nélkül rögzíti a hibát. A korábban elismert tételek lekötöttek maradnak; legfeljebb az egy nyugtázatlan köteget lehet újra elküldeni. A sikert csak `done` és a tiszta gyermek kilépése után rögzítik. A hibák leállítják a gyermeket SIGTERM-vel, amely 500 ms után SIGKILL re emelkedik, és a futó a folyamat lezárására vár.

| Környezeti változó                            | Alapértelmezett | Cél                             |
| --------------------------------------------- | --------------- | ------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000          | Célonkénti falióra-korlát       |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024            | Gyermek V8-as régi térkorlát MB |

Invalid/non-positive/non-integer értékek az alapértelmezett értékeket használják. A kupac beállítása nem egy teljes RSS korlát; A nagyon nagy tételek továbbra is kimeríthetik a gyermek memóriáját, és biztonságosan meghiúsulhatnak. Az alapértelmezett 1024 MB szabad mozgásteret hagy az alapértelmezett 500 soros köteg számára, amely 512 KiB műterméket tartalmaz, amelyekben a törzsek engedélyezettek, beleértve BigQuery bájt-darabolt JSON szerializálását is. Nem tesz biztonságossá egy 10000 soros karosszéria-tételt. A V8 kupac kimerülése meghozható hibát rögzít: csökkentse a kötegméretet vagy növelje `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; a kurzor az utolsó nyugtázott kötegnél marad. A történelmi inline/disk testeket nem fedi a modern műtárgysapka. Az üzemeltetőknek külön kell számolniuk RSS, különösen a korlátozott memóriájú tárolókban.

A gyermek csak a feloldott `DATA_DIR`, `NODE_ENV`, explicit `TZ` (örökölt fájlnév helyi idejű felbontás), `ELECTRON_RUN_AS_NODE`, ha van, és a következő kimenő bemeneteket örökli: `HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (és kisbetűs alakjaik), `OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`. Egy globális Undici diszpécser megosztja a kiszolgáló tiszta környezet-proxyfelbontását és a helyi gazdagép megkerülési szabályait, beleértve `NO_PROXY` is; nem importálja `proxyFetch.ts` vagy DB/feature jelzőit. A proxy hitelesítő adatai törlődnek a továbbított kimenetből és a rögzített hibákból. A cél hitelesítő adatai csak egy start IPC üzenetben utaznak, soha nem argv vagy környezetben; output/error továbbítás előtaggal van ellátva és megtisztítva. Csak `ExperimentalWarning` tiltott le a gyermek exec argumentumokban, hogy elkerülje a csomópont SQLite figyelmeztetésének megismétlését minden cron futtatáskor; a többi figyelmeztetési típus látható marad.

A célmoduloknak importálhatónak kell lenniük Next.js/server-only függőségek nélkül. A meglévő BigQuery megvalósítás már megfelel ennek a szerződésnek. A hozzáférési jogkivonat gyorsítótárai csak az alárendelt futásra érvényesek, a futások között nem. A csomópont a támogatott futási idő (`package.json` motorok). Létezik egy legjobb, nem támogatott Bun kompatibilitási útvonal (`bun:sqlite` `src/lib/db/core.ts` / adapterekben és `Dockerfile.bun`), ezért az exportálás nem szakadhat meg alatta. Bun alatt az exportálások megtartják a korábbi folyamat közbeni útvonalat, és egyszeri figyelmeztetést adnak ki: a gyermek heap/timeout elkülönítése nem érhető el. Használja a Node-ot eseményhurok és OOM elkülönítéshez.

Ha `includeBodies` engedélyezve van, előnyben részesítse a perc szintű ütemet, például `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` az óránkénti hasznos teherhátralék felhalmozása helyett. A köteg- és sorkorlátok továbbra is korlátozzák az egyes futtatásokat. A folyamat indítása célállomásonként és futtatásonként fizetendő; ez csekély indítási költséget jelent a szerver eseményhurok elkülönítésére, nem csökkenti a teljes CPU használatot.

### Hasznos terhek (kérések és kiegészítések)

Alapértelmezés szerint az exportálás csak a naplók összesítő mezőit tartalmazza** lista** mutatja. Bekapcsolás** Kérések és válaszok exportálása** (`includeBodies`) emellett szállítja, amit a naplók** részlet** ablakban minden hívásnál megjelenik:

| Mező                             | Mit tartogat                                                       |
| -------------------------------- | ------------------------------------------------------------------ |
| `request_body` / `response_body` | A hívások úgy töltődnek be, ahogy az irányítópult megjeleníti őket |
| `pipeline_route_decision`        | Melyik célt és modellt választotta az útválasztó                   |
| `pipeline_client_request`        | A nyers kérés pontosan úgy, ahogyan az ügyfél elküldte             |
| `pipeline_openai_request`        | A belső OpenAI alakba fordítás után                                |
| `pipeline_provider_request`      | Ahogy a ténylegesen felfelé küldték, a szolgáltató dialektusában   |
| `pipeline_provider_response`     | A nyers upstream válasz                                            |
| `pipeline_client_response`       | Amit visszaadtak a hívónak                                         |
| `pipeline_error`                 | Csővezeték-szintű hibarészlet egy sikertelen híváshoz              |
| `bodies_truncated`               | Igaz, ha bármelyik fenti mező eléri `maxBodyBytes` értéket         |

Ez gyors tartalom, így van** alapértelmezés szerint kikapcsolva** és szándékosan egy úti cél szerinti választás. A dashboard azt mutatja, hogy mit szállít, mert az export és `getCallLogById` megosztja a részleteket: a rakományokat már íráskor személyazonosításra alkalmas adatok fertőtlenítik és titkosan szerkesztik, a `noLog` API kulccsal indított hívás pedig egyáltalán nem tárol hasznos terhet, így nincs mit exportálni.

A hasznos terhelések soronként kerülnek beolvasásra a fájlrendszer melléktermékéből, így a hidratálás csak azon célhelyeken fut, amelyek kérték. A hiányzó vagy sérült műtermék az összefoglalóját null rakományokkal exportálja, ahelyett, hogy meghiúsítaná a köteget és a kurzort sodorná.

`maxBodyBytes` (alapértelmezett 262144) minden mezőt nagybetűvel lát el. Hosszabb rakomány van** inkább csonka, mint leejtett** — a kivágott prompt továbbra is azt válaszolja, hogy "mit kérdeztek" —, és a sor meg van jelölve `bodies_truncated`-vel. A streamelt, darabonkénti deltákat a rendszer nem exportálja; az összeállított válasz már `pipeline_provider_response` ben és `pipeline_client_response` ben van.

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

## 4. BigQuery-cél

Konfigurációs kulcsok (`type: "bigquery"`):

| Kulcs                | Megjegyzések                                                                                                                                    |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `projectId`          | Az adatkészletet tartalmazó GCP-projekt                                                                                                         |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                                                                 |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                                                                 |
| `location`           | Csak akkor használatos, ha létre kell hozni az adatkészletet (alapértelmezés: `EU`)                                                             |
| `serviceAccountJson` | Szolgáltatásfiók-kulcs. Titkos: nyugalmi állapotban titkosítva, soha nem kerül visszaadásra                                                     |
| `autoCreate`         | Hiányzó adatkészlet/tábla létrehozása; a null értéket engedélyező használati bizonyíték oszlopok feltételes hozzáadása (alapértelmezés: `true`) |

A szolgáltatásfióknak `bigquery.tables.updateData` jogosultságra van szüksége a célként megadott
táblán, továbbá `bigquery.datasets.create` / `bigquery.tables.create` jogosultságra, ha az
`autoCreate` engedélyezve van. Egy meglévő tábla frissítéséhez a két null értéket engedélyező
használati bizonyíték mező hozzáadásakor a `bigquery.tables.update` jogosultság is szükséges.
Hiányzó jogosultság esetén az export sikertelen lesz, és a kurzor nem lép tovább.

Egy konfigurált köteg egy **kurzoregység**, nem pedig egy HTTP-egység: a `send()` legfeljebb 500
sort tartalmazó insertAll-hívásokra bontja, így a nagy `batch_size` nem lépheti túl a BigQuery
10 MB-os kéréskorlátját. Az átmeneti állapotok (408/429/500/502/503/504) legfeljebb háromszor
újrapróbálkozhatók exponenciális visszalépéssel, ugyanazon insertIds használatával; a hitelesítési
és sémahibák már az első kísérletkor kivételt váltanak ki, a futtatás felesleges terhelése nélkül.

A néhány pillanattal korábban létrehozott tábla még nem látható a streaming végpont számára, amely
néhány másodpercig 404-es választ ad. Ezt a 404-et újrapróbálja a rendszer, de **csak akkor, ha
ez a futtatás hozta létre a táblát** — egy valóban hiányzó tábla esetén a művelet azonnal meghiúsul.
Ne feledd, hogy egy nemrég törölt tábla nevének újbóli létrehozásakor a BigQuery több percre
megtagadhatja a streaming beszúrásokat; ez a törlés, majd újbóli létrehozás sajátossága, ezért
előnyösebb új táblanevet használni a tábla törlése és újbóli hozzáadása helyett.

**A részleges hiba HTTP 200-as válaszként érkezik nem üres `insertErrors[]` értékkel.** Ezt a
rendszer hibaként kezeli és kivételt vált ki, így a kurzor nem lép túl azokon a sorokon, amelyeket
a BigQuery nem fogadott el; a `tests/unit/log-export-bigquery.test.ts` rögzíti ezt a viselkedést.

Az átvitel egyszerű REST — egy önaláírt RS256-assertion hozzáférési tokenre váltódik a
`https://oauth2.googleapis.com/token` címen, majd a sorok a `tabledata.insertAll` végpontra
kerülnek. Google SDK nem kerül behúzásra. A hozzáférési tokenek folyamaton belül,
szolgáltatásfiókonként és hatókörönként gyorsítótárazódnak.

A létrehozott tábla a Logs lap minden mezőjéhez egy oszlopot, valamint egy `exported_at` oszlopot
tartalmaz, és a tényleges lekérdezési módhoz igazított elrendezésű:

- **A `timestamp` alapján napokra particionált**, így a dátum szerint korlátozott lekérdezés csak
  az adott napokat olvassa be.
- **Az `api_key_name`, `provider`, `model`, `status` szerint fürtözött** (ebben a sorrendben), így
  a futtató személy, a célhely vagy a sikertelenség szerinti szűrés blokkokat hagy ki az egyes
  partíciókon belül. A BigQuery legfeljebb négy fürtözési oszlopot engedélyez, és a sorrend számít:
  az önmagában az `api_key_name` szerinti szűrés blokkokat hagy ki, az önmagában a `status`
  szerinti szűrés nem.
- **Opcionális partíciómegőrzés** a `partitionExpirationDays` használatával (a 0 mindent megőriz),
  amely a tábla létrehozásakor kerül alkalmazásra.

Mindkét beállítás a létrehozáskor érvényesül. Egy meglévő tábla megtartja a már meglévő
elrendezését, ezért ha alkalmazni szeretnéd ezeket, irányítsd a célt egy új táblaazonosítóra.

A `tests/unit/log-export-bigquery.test.ts` ellenőrzi, hogy a leképező és a tábla sémája
összhangban maradjon, így egy új hívásnapló-oszlop nem maradhat észrevétlenül ki az export során.

A kötegek felosztása **a sorok száma és a szerializált bájtok száma alapján egyaránt** történik.
A sorok száma önmagában nem elegendő, ha a hasznos terhelések is exportálásra kerülnek: a
promptokat tartalmazó 500 sor több tíz megabájtot is kitehet, az insertAll pedig elutasítja a
10 MB-nál nagyobb kéréseket. A darabok 500 sornál vagy 9 MB-nál záródnak le — attól függően,
melyik következik be előbb.

---

## 5. OTLP/HTTP-traces célállomás

A konfiguráció a `type: "otlp-http"` beállítást használja. Ez a megőrzött hívásnaplók ütemezett,
kurzorral támogatott exportálása, nem pedig a
`open-sse/services/routing/otel.ts` fájlban található, legjobb erőfeszítésen alapuló élő
útválasztási események nyelője. Nem olvassa és nem módosítja a nyelő környezeti
változóit, időzítőit vagy puffereit. Mindkettő engedélyezése két egymástól független
span-típust eredményezhet; a `omniroute.log-export` műszerezési hatókörrel különböztesse meg
ezeket a hívásnapló-spánokat.

| Kulcs                    | Alapértelmezett / cél                                                                |
| ------------------------ | ------------------------------------------------------------------------------------ |
| `endpoint`               | Kötelező teljes HTTP(S)-traces URL; a `/v1/traces` utótag nem kerül hozzáadásra      |
| `headers`                | Opcionális `Name: value` sorok vagy karakterláncokból álló JSON-objektum; titkosítva |
| `requestHeaderAllowlist` | Üres (kikapcsolva); rögzítendő kliensfejléc-nevek/-előtagok span-attribútumokként    |
| `serviceName`            | `omniroute`; a `service.name` erőforrásattribútuma                                   |
| `langfuseMapping`        | `false`; Langfuse generation/session/user attribútumokat ad hozzá                    |
| `identity`               | `pseudonymous`, `keyName` vagy `none`                                                |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                              |
| `timeoutMs`              | `30000` HTTP-kísérletenként                                                          |
| `environment`            | Nincs beállítva; opcionális `langfuse.environment`                                   |

Az általános irányítópult ezeket a mezőket jeleníti meg. A `paths` API-tömböt vagy
pontos útvonalakat tartalmazó, újsorokkal/vesszőkkel tagolt szövegmezőt fogad el. Az
embeddings-, rerank- és egyéb útvonalak kimaradnak, kivéve, ha kifejezetten engedélyezve
vannak. A kihagyott sorok továbbra is előreléptetik a kurzort; a meglévő futtató
`exported`/`exportedTotal` számlálói a feldolgozott forrássorokat számolják, beleértve a
szűrt sorokat is, nem pedig az elfogadott spaneket. A szűrés a gyermekfolyamatban történik,
az IPC-/kurzorszerződés módosítása nélkül.

Az URL-érvényesítés az adatbázis használata nélküli
`parseAndValidateNonMetadataUrl` segédet használja a
`src/shared/network/outboundUrlGuard.ts` fájlból: a `block-metadata` szabályzatot. Ugyanazokkal
a feltétel nélküli metaadat-/protokoll-/beágyazott hitelesítőadat-ellenőrzésekkel
rendelkezik, mint a webhook-érvényesítő, de a privát URL-ek engedélyezve vannak, és
szándékosan engedélyezi a localhost-/LAN-célpontokat globális funkciójelző-felülbírálás
nélkül. Ez lehetővé teszi az önállóan üzemeltetett Langfuse-, Phoenix-, Tempo- és Collector-
végpontok használatát, beleértve a privát HTTP-végpontokat is. A felügyelt metaadat-hosztok
mindig blokkolva vannak. Az átirányításokat a rendszer nem követi, ezért egy collector nem
irányíthatja át a hitelesítő adatokat másik hosztra. A meglévő lexikális URL-védelemhez
hasonlóan ez sem rögzíti a DNS-feloldást; csak az üzemeltető által felügyelt hosztokat
konfigurálja. Ha a végpont nem megbízható hálózaton található, részesítse előnyben a HTTPS-t.

### Hasznos teher és kézbesítés

Az OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) egy
CLIENT spant továbbít minden engedélyezett sorhoz, amelyet a pontos kérési útvonaláról
nevez el. Az útvonal alapú elnevezés megkülönbözteti a Chat Completions, Responses és
Messages műveleteket anélkül, hogy modell- vagy identitásadatokat ágyazna a span nevébe.
Az erőforrásattribútumok között szerepel a `service.name` és a csomag
`service.version` értéke.

A normál csevegési kísérletnaplózó (`open-sse/handlers/chatCore/attemptLogging.ts`) a
befejezéskor a `duration = Date.now() - startTime` értéket írja ki, és nem ad meg
időbélyeget; a `src/lib/usage/callLogs.ts` fájlban található `saveCallLogOperation` az
időbélyeget alapértelmezés szerint az írás (befejezés) idejére állítja. Az export ezért a
sor időbélyegét használja végpontként, a kezdőpont pedig a végpont mínusz az időtartam
(milliszekundumban, decimális nanoszekundumra átszámítva). A hívó által megadott korábbi
időbélyegek szintén végpontként maradnak meg; soronként nincs kezdés/befejezés szerinti
megkülönböztető jelző. A null értékű időtartam nullává válik. Az érvénytelen vagy hiányzó
időbélyegek meghiúsítják a köteget, ahelyett hogy nem determinisztikus spaneket hoznának
létre. A `ttftMs` nullable, és az `omniroute.ttft_ms` értékre képeződik le.

Az attribútumok tartalmazzák a `gen_ai.operation.name="chat"` értéket, a szolgáltatót, a
kért/válaszmodell nevét, a bemeneti/kimeneti tokeneket, az opcionális gyorsítótárból
olvasott/létrehozott és következtetési tokeneket, a HTTP-állapotot, a kombinációt, a
gyorsítótár forrását, a munkamenetcímkét és a korrelációs azonosítót. Az egész típusú OTLP-
értékek és időbélyegek decimális karakterláncok; a karakterláncok, logikai értékek és
törtértékek a natív OTLP-értékváltozataikat használják. A hibás spanek ERROR-állapotúak, és
megtisztított állapotüzenetet tartalmaznak. A kanonikus rekord nem tartalmaz upstream hoszt-
URL-t, ezért a `server.address` elmarad, ahelyett hogy helytelenül a collectort azonosítaná
modellhosztként. A költség nem kerül exportálásra.

Csak az `includeBodies=true` tölti be a tartalmat. A `langfuseMapping=false` esetén a
`gen_ai.input.messages` / `gen_ai.output.messages` attribútumok a
OmniRoute által tárolt, megtisztított kérés-/választörzs JSON-adatait tartalmazzák
(értelmezhető formátum esetén kanonikalizálva), nem pedig újraformázott semconv
üzenettömböt. A csonkolt/nem JSON-formátumú törzsek nyers szövegként maradnak meg. A
`langfuseMapping=true` esetén a törzsek csak `langfuse.observation.input` /
`langfuse.observation.output` attribútumként kerülnek kibocsátásra; a
`gen_ai.*.messages` attribútumok kimaradnak, így minden törzs csak egyszer kerül
elküldésre. Mindkét mód örökli a meglévő betöltési útvonal `maxBodyBytes` értékét;
az `omniroute.bodies_truncated=true` jelzi a csonkolást.
Ez a célállomás nem ad hozzá további folyamatpipeline-pillanatképeket vagy nem
megtisztított artefaktum-olvasásokat; az opcionális kérésfejléc-rögzítés az alább ismertetett
meglévő betöltött klienspillanatképet használja. Törzsek exportálásakor óránkénti
visszalék-felhalmozás helyett használjon perces gyakoriságot, például
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`.

### Opcionális klienskérés-fejlécek

A fejlécrögzítés **alapértelmezés szerint ki van kapcsolva**. Állítsa be a
`requestHeaderAllowlist` értékét a célállomás konfigurációjában, és engedélyezze a
**Kérések és válaszok exportálása** lehetőséget (`includeBodies: true` a célállomáson).
Az engedélyezési lista API-tömböt vagy újsorokkal/vesszőkkel elválasztott neveket tartalmazó
szövegmezőt fogad el:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

A nevek kis- és nagybetűkre nem érzékenyek, és pontos egyezést igényelnek, kivéve ha egyetlen záró `*` nem üres
headernév-előtagot választ ki. A puszta `*`, a beágyazott helyettesítő karakterek és az érvénytelen HTTP-headernevek
elutasításra kerülnek. Legfeljebb 64 választó adható meg, amelyek mindegyikének neve/előtagja legfeljebb 256 ASCII bájt.
Ez a beállítás különálló a `headers` beállítástól, amely az exportert hitelesíti a gyűjtőnél.

A rögzítés csak a `pipeline_client_request` értékét olvassa, amelyet a mentett részletes pipeline
`clientRawRequest` (vagy a régi `clientRequest`) mezője tölt ki. Soha nem tér vissza a szolgáltatói kérés fejléceihez.
A részletes pipeline-naplózást engedélyezni kellett a kérés rögzítésekor. Letiltott
`includeBodies` esetén, illetve hiányzó, sérült vagy csonkolt kliens-pillanatkép JSON esetén a rendszer nem bocsát ki
header-attribútumokat. A `maxBodyBytes` növelése elkerülheti az exportáláskor történő pillanatkép-csonkolást;
azt a részletességet azonban nem tudja helyreállítani, amelyet soha nem mentettek. Az 1 MiB-nál nagyobb vagy
256-nál több headerbejegyzést tartalmazó pillanatképeket a rendszer figyelmen kívül hagyja. A meglévő prompt-/válaszexport
a header-rögzítéssel párhuzamosan továbbra is engedélyezve marad; az engedélyezési lista nem biztosít csak fejléceket
betöltő módot.

A kiválasztott értékek `http.request.header.<full lowercase header name>` OTLP-stringtömbökké válnak,
egyetlen string esetén is. Például az `X-OmniRoute-Meta-Team: example-team` értékből
`http.request.header.x-omniroute-meta-team` lesz, a következővel:
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
A teljes előtag megmarad: ezek közönséges headerek, üzleti mezők feldolgozása, illetve
`omniroute.metadata.*` / Langfuse-metaadatokká alakítás nélkül. A `langfuseMapping` nem módosítja a headerek
szemantikáját. Egy kiválasztott, egyértékű `User-Agent` a szabványos `user_agent.original` skalárt is beállítja.
Az egyetlen értéken belüli vesszők nem kerülnek felbontásra. A kis- és nagybetűs változatok a mentett bejegyzések
sorrendjében egyesülnek; ha bármely változat érvénytelen, a teljes header kimarad. Az attribútumok kisbetűs név szerint
vannak rendezve.

Az Authorization, Proxy-Authorization, Cookie, Set-Cookie, API-kulcsot tartalmazó headerek, az auth/token/secret/password/credential
jelöléseket tartalmazó nevek, valamint a belső átjáró hitelesítő adatai mindig kizárásra kerülnek, még akkor is, ha
ki lettek választva vagy részben maszkolva vannak a tárolóban. Az ismert hitelesítőadat-minták az osztott hitelesítőadat-detektort
használják; a kitakarási jelölők kimaradnak, nem kerülnek exportálásra biztonságos értékként.
Csak stringek és nem üres stringtömbök fogadhatók el; a számok és objektumok nem kerülnek kényszerített átalakításra.
Az érvénytelen nevek, prototípus-kulcsok, vezérlőkarakterek (a horizontális tabulátor kivételével) és a hibás Unicode
figyelmen kívül maradnak anélkül, hogy a kötegelés meghiúsulna vagy tartalmuk megjelenne a hibákban.

Az egyes spanek legfeljebb 32 headert, headerenként 16 értéket, értékenként 4096 UTF-8 bájtot,
valamint a rögzített headernevek és -értékek összességére 16384 UTF-8 bájtot tartalmazhatnak. A túlméretes/érvénytelen
headerek teljes egészében kimaradnak, nem lesznek csonkolva. A kiválasztás üzemeltetői adatvédelmi döntés:
a biztonságosnak tűnő nevek is tartalmazhatnak személyes adatokat, és ezek a korlátok/detektorok nem általános
PII-tisztító eszközök.

### Kézbesítési korlátok

A kérések legfeljebb 500 spant és 4 MiB UTF-8-kódolású JSON-t tartalmazhatnak, a burkolóelemet is beleértve.
Minden engedélyezett span méretét ellenőrzi a rendszer a kurzorköteg első kérését megelőzően. A korlátnál nagyobb egyedi
span esetén a köteg egyetlen része sem kerül elküldésre, és a művelet a `maxBodyBytes` csökkentésére vonatkozó
útmutatással meghiúsul; a span nem kerül csendben eldobásra. Az előzetes ellenőrzés csak rekordhivatkozásokat és
bájtszámokat tart meg, minden ideiglenes spant/JSON-t eldob; a spanek korlátozott részekre lesznek újra felépítve,
így nem kell megtartani a köteg második szerializált másolatát. A HTTP 408/429/5xx válaszok, a hálózati hibák és az időtúllépések
legfeljebb három próbálkozást kapnak, 250/500 ms-os exponenciális visszalépéssel. A `Retry-After` által megadott másodpercek
vagy HTTP-dátumok legfeljebb 5 másodpercre növelhetik a késleltetést. Más állapotok azonnal hibát okoznak. A 2xx OTLP-részleges
elutasítás szintén kivételt vált ki ahelyett, hogy nyugtázná az elveszett spant; az üres vagy érvényes JSON-nyugtázásokat
a rendszer elfogadja, a válasz beolvasása pedig 64 KiB-ban korlátozott.

A hibák csak az exporter által kezelt tényeket tartalmazzák: HTTP-állapotot, újrapróbálkozási osztályt, próbálkozások számát
és az elküldött spanek számát, illetve rögzített nyugtázási/hálózati hibaszöveget. A gyűjtő válaszának törzsét,
a részleges siker darabszámait és a válasz fejléceit a rendszer soha nem másolja hibákba, naplókba vagy az irányítópultba.
A sikertelen vagy részben elfogadott köteg nem lesz nyugtázva: a célállomás az adott állapottal Failing állapotot mutat,
a kurzor az utolsó nyugtázott kötegnél marad, a következő futtatás pedig ugyanazokat a sorokat küldi újra.
A végleges állapotok mindaddig hibát jeleznek, amíg a gyűjtőt vagy a konfigurációt ki nem javítják.
A válasz részleteiért használja a gyűjtő saját naplóit. A hívásnapló hibáinak összefoglalói megtartják saját kitakarásukat.
A `prepare()` semmit nem hoz létre; a Test pontosan a `{"resourceSpans":[]}` törzset küldi el, és a hívásnapló-spanek írása
nélkül jelenti a HTTP-állapotot.

A trace-id-k és span-id-k az SHA-256 első 32/16 hexadecimális számjegyei, a következő bemenetek alapján:
`"omniroute.trace\\0" + callLogId` és `"omniroute.span\\0" + callLogId`. Az újraküldések azonos id-ket hordoznak.
Ez nem jelent deduplikációs garanciát: egyes háttérrendszerek, köztük a Langfuse v4 betöltése, nem deduplikálják az azonos id-val
rendelkező spaneket. Egy összeomlás vagy részleges részhhiba legfeljebb az egyetlen, nem nyugtázott kurzorköteget küldheti újra;
a teljes köteg duplikálódhat, nem csupán az utolsó HTTP-rész. A kurzorköteg méretét ennek a kompromisszumnak a figyelembevételével
válassza meg.

### Langfuse-példa

Önállóan üzemeltetett Langfuse-példányhoz konfigurálja ezeket a mezőket:

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

Az Authorization értékét helyben állítsa elő a szó szerinti `public-key:secret-key` string Base64-kódolásaként
(például a `Buffer.from(publicKey + ":" + secretKey).toString("base64")` használatával).
Ne illesszen be valódi hitelesítő adatokat naplókba, képernyőképekbe vagy issue-kba. A leképezés automatikusan beállítja a
`x-langfuse-ingestion-version: 4` értéket; az Authorization értékét továbbra is a `headers` mezőben kell megadni.
Mindkét header, valamint a létrehozott identitássó a meglévő titkosított titkosmező-mechanizmust és API-helyőrzőket használja;
a `STORAGE_ENCRYPTION_KEY` szükséges.

A leképezés hozzáadja a generálás típusát/modelljét, a JSON-használat részleteit (bemenet/kimenet/összesen és elérhető
cache-kulcsok), a JSON-bemenet/-kimenet pillanatképeit, az ERROR/DEFAULT szintet, a
megtisztított állapotüzenetet, a trace nevét, a munkamenet-azonosítót, valamint az opcionális környezetet és a szűrhető
`langfuse.observation.metadata.<key>` mezőket a szolgáltató, a kért modell, az útvonal, a kombináció, a cache
forrása és az állapot számára. A `langfuse.observation.completion_start_time` ISO 8601 formátumú az
indulás időpontjától + TTFT, de csak akkor, ha a TTFT ismert és az időtartamon belül van. Költségattribútumok nem kerülnek továbbításra.

Az identitási módok a `langfuse.user.id` értékre vonatkoznak:

- `pseudonymous` (alapértelmezett): az API-kulcs belső azonosítójának HMAC-SHA256 értéke, célhelyenként egy véletlenszerű,
  32 bájtos sóval. A só létrehozáskor jön létre, ha még nem létezik, `identitySalt` néven titkosítva tárolódik,
  soha nem kerül visszaadásra, és szerkesztéskor megmarad. A nyers kulcsazonosítók soha nem kerülnek span-attribútumokba.
  Egy célhely sójának újbóli létrehozása vagy rotációja megváltoztatja az identitásokat.
- `keyName`: a konfigurált API-kulcs neve, amely szándékosan felfedi az operátor által megadott címkét.
- `none`: nincs felhasználói azonosító. A munkamenetcímkék továbbra is exportálódnak, ha jelen vannak; ezek a módok nem
  anonimizálják a tetszőleges prompttartalmat, illetve az operátor által megadott munkamenet-/korrelációs címkéket.

### Visszatöltés nélküli indítás

Csak létrehozáskor engedélyezze a **Kezdés az aktuális pozíciótól (meglévő naplók kihagyása)** lehetőséget, vagy adja át a
`startFromCurrentPosition: true` értéket a létrehozási API-kérés törzsének legfelső szintjén. Ez inicializálja a
`cursor_row_id` értékét a megőrzött hívásnapló aktuális maximális rowid-értékére a meglévő kurzorsegéd-függvények használatával,
migráció nélkül. Az alapértelmezett érték false (0 értékű kurzor és a megőrzött előzmények visszatöltése).
Ez nem a kurzor frissítéskori visszaállítását beállító lehetőség.

A megosztott `ttftMs` hozzáadása egy null értéket engedélyező `ttft_ms` oszlopot is hozzáad a BigQuery-leképezőhöz
és az új táblák sémájához: a sémateszt megköveteli, hogy minden kanonikus rekordmezőhöz tartozzon oszlop. A meglévő táblák
változatlanul exportálnak: a `prepare()` beolvassa a tábla sémáját, és csak akkor hagyja el a `ttft_ms` mezőt, ha az oszlop
hiányzik. Adja hozzá a null értéket engedélyező INT64 oszlopot, hogy a következő futtatástól elérhető legyen a TTFT, vagy használjon
új táblát. Az opcionális TTFT-oszlop nem indít sémafrissítést. A használati bizonyítékot tartalmazó oszlopok az alábbi
feltételes, opt-in kompatibilitási folyamatot követik; a többi sormező továbbra is szigorú sémavizsgálat alá esik.

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

## 7. Működtetés

- **Irányítópult**: Integrációk → Naplóexportálás. Adjon hozzá egy célt, futtassa a **Teszt** műveletet a hitelesítő adatok ellenőrzéséhez
  sorok írása nélkül, majd engedélyezze.
- **Várólista**: minden cél kártyája megjeleníti a függőben lévő sorokat és a kurzort; a `GET
/api/log-export/status` ugyanazokat az értékeket adja vissza, valamint az utolsó 20 feladatfuttatást.
- **Egy hibás cél nem okozza a többi hibáját** — a futtatás összegzése célonként rögzíti
  az állapotot a `last_status` / `last_error` mezőkben, a feladatfuttatási előzmények pedig megőrzik az összesített állapotot.
- **Egy cél törlése törli annak kurzorát is.** Az újbóli hozzáadás a legrégebbi megőrzött
  hívásnaplónál kezdődik, így újraküldi azokat a sorokat, amelyeket a cél már tartalmazhat. A BigQuery esetében soronként az
  `insertId` ezt csak a BigQuery saját duplikációszűrési időablakán belül kezeli, ezért egy cél törlése helyett inkább tiltsa le azt.

### A használati bizonyítékok sémakompatibilitása

Az új BigQuery-táblák nullable `usage_evidence` (JSON-t tartalmazó STRING) és
`usage_estimated` (BOOL) mezőket tartalmaznak. Az `autoCreate` engedélyezése esetén egy
meglévő táblához csak ezek a hiányzó, nullable oszlopok adhatók hozzá. Az exportáló megőrzi a teljes meglévő
sémát, beleértve a mezők metaadatait is, és a visszaadott etag használatával feltételes PATCH-kérést
küld. Egy párhuzamos sémamódosítás az exportálás felülírás helyett hibával leáll; a következő futtatás újból beolvassa a táblát.

Az `autoCreate` letiltása esetén ezeket az oszlopokat saját magának kell hozzáadnia, mielőtt
használati bizonyítékokat tartalmazó rekordokat exportálna. A hiányzó séma- vagy etag-metaadatok, illetve egy sikertelen módosítás
szintén megakadályozza a bizonyítékokat tartalmazó beszúrásokat. Az exportálási kurzor ilyen hiba esetén nem lép tovább,
és a bizonyítékok soha nem vesznek el csendben. A helyi naplómegőrzés továbbra is érvényes, amíg az exportálás blokkolva van,
ezért oldja meg a hibát, mielőtt a megőrzött forrássorok lejárnának.
