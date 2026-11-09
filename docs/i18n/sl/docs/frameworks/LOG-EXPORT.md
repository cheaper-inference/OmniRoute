# Log export (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Neprekinjen, inkrementalen izvoz dnevnikov klicev OmniRoute v zunanjo analitično shrambo.

Zavihek nadzorne plošče Dnevniki hrani zgodovino zahtev v SQLite (`call_logs`), njena velikost pa je omejena z
rotacijo in obdobjem hrambe. Izvoz dnevnikov po urniku pošilja isti nabor zapisov drugam, da se lahko ohranijo
dlje od lokalne podatkovne zbirke in združujejo z drugimi podatki. BigQuery je prvi cilj; cevovod
uporablja register, zato je mogoče dodajati nove cilje.

---

## 1. Kako deluje

```
strežnik (dešifriranje + preverjanje konfiguracije, uskladitev kazalca)
  → zagon IPC → izolirani proces OS exportChild
    → samo za branje storage.sqlite → skupno poizvedovanje/preslikava dnevnika klicev
      → asinhrono nalaganje artefaktov → prepare()/send() cilja
        → paket prek IPC → strežnik shrani kazalec → potrditev prek IPC
          → naslednji paket; done prek IPC → strežnik zabeleži uspeh
```

- **Razpored** — eno opravilo cron v `JobRegistry`, `log_export`, s privzeto vrednostjo `0 * * * *` (vsako uro,
  UTC). Registrirano je v `src/lib/initCloudSync.ts`; preglasiti ga je mogoče z `OMNIROUTE_LOG_EXPORT_CRON`.
  Vsak cikel zaporedno obdela vse **omogočene** cilje.
- **Kazalec** — implicitni `call_logs.rowid` zbirke SQLite, shranjen za vsak cilj v
  `log_export_destinations.cursor_row_id`. `timestamp` namenoma ni kazalec: klicatelji
  lahko posredujejo lastno vrednost, zato je lahko počasna zahteva zapisana za hitrejšo, ki se je začela
  pozneje, kazalec na podlagi časovnega žiga pa bi jo preskočil.
- **Paketna obdelava** — `batch_size` vrstic na zahtevo (privzeto 500), `max_rows_per_run` vrstic na izvajanje
  (privzeto 10000), da se velika količina zaostankov obdela v več ciklih, namesto da bi enega blokirala.
- **Dostava** — kazalec se premakne šele, ko se `send()` uspešno zaključi. Ob neuspelem paketu ostane
  kazalec na istem mestu, zato se iste vrstice znova poskusijo poslati pri naslednjem izvajanju. Zagotovilo je
  dostava vsaj enkrat skupaj z odstranjevanjem podvojenih zapisov na strani cilja, ne pa resnična dostava natanko enkrat: BigQuery vsako
  vrstico označi z ID-jem dnevniškega zapisa klica, ki ga znotraj lastnega časovnega okna za odstranjevanje dvojnikov upošteva
  po najboljših močeh.
- **Zaščita pred prekrivanjem** — cikel cron in `POST .../run` se lahko sprožita hkrati. Cilj,
  ki se že obdeluje, je preskočen, namesto da bi bil obdelan dvakrat (`skipped: true` v rezultatu izvajanja),
  zato sočasno izvajanje ne more znova poslati paketa ali premakniti kazalca nazaj.
- **Obnovitev po čiščenju** — če `cursor_row_id` pristane nad `MAX(rowid)` (celotna tabela je bila
  počiščena in oštevilčenje rowid se je začelo znova), izvajalnik kazalec vrne na 0, namesto da bi trajno izgubil pregled.

### Izolirani izvajalnik in omejitve

Vsako izvajanje cilja v okolju Node zažene ločen, kratkoživ proces OS (`child_process`
z IPC, ne `worker_threads`). Branje teles, razčlenjevanje/serializacija podatkov JSON, ciljni
`prepare()` in omrežni V/I cilja se izvajajo v njem, ne v dogodkovni zanki strežnika.
Prek IPC se prenašajo samo konfiguracija in majhna sporočila o napredku; izvoženi zapisi se nikoli ne vrnejo v
strežnik. Opravilo cron in pot Zaženi zdaj ohranita enak javni rezultat ter zaščito pred prekrivanjem.

Podrejeni proces odpre strežnikov razrešeni `DATA_DIR/storage.sqlite` samo za branje z uporabo `node:sqlite`,
z `busy_timeout=5000` in `query_only=ON`. Ne uvaža nobenega skupnega primerka podatkovne zbirke in ne izvaja
selitev, varnostnih kopij ali posodobitev SQLite. Evidentiranje manjkajočih/poškodovanih artefaktov (vključno z
UPDATE za poškodovan artefakt) ostane samo v poti podrobnosti nadzorne plošče. Obe poti uporabljata skupen čisti
razreševalnik podrobnosti; izvoz uporablja asinhrono branje datotečnega sistema in enak vrstni red razreševanja
artefakt → starejši vdelani podatki → starejši podatki na disku → brez podatkov. Izvajanje zajame največji rowid vstavljanja
ob odprtju bralnika v podrejenem procesu; poznejši vnosi počakajo do naslednjega izvajanja. To je meja
vstavljanja, ne dolgotrajna transakcija SQLite: zapisovalci WAL in kontrolne točke lahko med
čakanjem na omrežje nemoteno delujejo. Posodobitve/izbrisi obstoječih vrstic s to mejo niso zamrznjeni.

Po vsakem sprejetem paketu podrejeni proces počaka na potrditev. Strežnik najprej shrani
kazalec z `advanceLogExportCursor`, nato pošlje `ack`; pred tem se ne začne noben naslednji paket.
Napaka pri pošiljanju, zrušitev ali časovna omejitev zabeleži neuspeh brez premika kazalca za ta paket. Predhodno
potrjeni paketi ostanejo trajno zapisani; znova je lahko poslan največ en nepotrjen paket.
Uspeh se zabeleži šele po `done` in pravilnem zaključku podrejenega procesa. Ob neuspehu je podrejeni proces
končan s SIGTERM, ki se po 500 ms stopnjuje v SIGKILL, izvajalnik pa počaka, da se proces zapre.

| Okoljska spremenljivka                        | Privzeto | Namen                                          |
| --------------------------------------------- | -------- | ---------------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000   | Časovna omejitev cilja po stenski uri          |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024     | Omejitev old-space V8 podrejenega procesa v MB |

Pri neveljavnih/nepozitivnih/necelih vrednostih se uporabijo privzete vrednosti. Nastavitev kopice ni omejitev celotnega
RSS; zelo veliki paketi lahko še vedno izčrpajo pomnilnik podrejenega procesa in varno povzročijo neuspeh izvajanja.
Privzeta vrednost 1024 MB pušča dovolj rezerve za privzeti paket 500 artefaktov po 512 KiB z omogočenimi
telesi, vključno z BigQueryjevo serializacijo JSON v kosih po bajtih. Zaradi tega paket
10000 vrstic s telesi ni varen. Izčrpanje kopice V8 zabeleži napako z navodilom za ukrepanje: zmanjšajte velikost
paketa ali povečajte `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; kazalec ostane pri zadnjem
potrjenem paketu. Za starejša vdelana telesa/telesa na disku sodobna omejitev artefaktov ne velja.
Upravljavci morajo RSS načrtovati ločeno, zlasti v vsebnikih z omejenim pomnilnikom.

Podrejeni proces podeduje samo razrešeni `DATA_DIR`, `NODE_ENV`, izrecni `TZ` (razreševanje lokalnega časa
za starejša imena datotek), `ELECTRON_RUN_AS_NODE`, kadar je prisoten, in naslednje vhodne nastavitve za odhodne povezave:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (ter njihove različice z malimi črkami),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
Globalni razpošiljevalnik Undici uporablja strežnikovo čisto razreševanje posredniškega strežnika iz okolja in pravila za
obhod pri lokalnih gostiteljih, vključno z `NO_PROXY`; ne uvaža `proxyFetch.ts` ali njegovih zastavic podatkovne zbirke/funkcionalnosti.
Poverilnice posredniškega strežnika so odstranjene iz posredovanega izhoda in zabeleženih napak. Poverilnice cilja
se prenesejo samo v enem začetnem sporočilu IPC, nikoli prek argv ali okolja; posredovani izhod/napake imajo
predpono in so prečiščeni. V argumentih za zagon podrejenega procesa je onemogočen samo `ExperimentalWarning`, da se
ob vsakem izvajanju cron ne ponavlja opozorilo Node za SQLite; druge vrste opozoril ostanejo vidne.

Ciljne module mora biti mogoče uvoziti brez odvisnosti od Next.js oziroma odvisnosti, namenjenih samo strežniku. Obstoječa
implementacija BigQuery že izpolnjuje to zahtevo. Predpomnilniki dostopnih žetonov se ohranijo samo med podrejenim
izvajanjem, ne pa med posameznimi izvajanji. Node je podprto izvajalno okolje (`package.json` engines), vendar razdelek
README za namestitev okolja Bun in `Dockerfile.bun` oglašujeta tudi združljivostno pot za produkcijo z uporabo
`bun:sqlite` (`src/lib/db/core.ts` / prilagojevalniki). V okolju Bun izvozi zato ohranijo prejšnjo
pot znotraj procesa in prikažejo enkratno opozorilo: izolacija kopice in časovne omejitve podrejenega procesa ni na voljo. Uporabite
Node za izolacijo dogodkovne zanke in napak zaradi pomanjkanja pomnilnika; Bun tukaj ni obravnavan kot okolje, namenjeno samo razvoju.

Ko je omogočen `includeBodies`, uporabite pogostost na ravni minut, na primer
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, namesto da kopičite enourni zaostanek koristnih vsebin.
Omejitve paketov in vrstic še vedno omejujejo vsako izvajanje. Zagon procesa se izvede za vsak cilj pri vsakem izvajanju;
to majhen strošek zagona zamenja za izolacijo strežniške dogodkovne zanke, ne pa za manjšo skupno porabo CPE.

### Koristne vsebine (pozivi in dokončanja)

Izvoz privzeto vsebuje samo polja povzetka, ki jih prikazuje **seznam** dnevnikov. Če vklopite
**Izvozi pozive in odgovore** (`includeBodies`), se dodatno pošlje vse, kar podokno s **podrobnostmi**
dnevnikov prikazuje za vsak klic:

| Polje                            | Kaj vsebuje                                                          |
| -------------------------------- | -------------------------------------------------------------------- |
| `request_body` / `response_body` | Koristne vsebine klica, kot jih prikaže nadzorna plošča              |
| `pipeline_route_decision`        | Cilj in model, ki ju je izbral usmerjevalnik                         |
| `pipeline_client_request`        | Neobdelana zahteva v natanko taki obliki, kot jo je poslal odjemalec |
| `pipeline_openai_request`        | Po pretvorbi v interno obliko OpenAI                                 |
| `pipeline_provider_request`      | Kot je bila dejansko poslana navzgor, v narečju ponudnika            |
| `pipeline_provider_response`     | Neobdelani odgovor nadrejenega ponudnika                             |
| `pipeline_client_response`       | Kar je bilo vrnjeno klicatelju                                       |
| `pipeline_error`                 | Podrobnosti napake na ravni cevovoda za neuspešen klic               |
| `bodies_truncated`               | True, ko je katero koli zgornje polje doseglo `maxBodyBytes`         |

To je vsebina pozivov, zato je možnost **privzeto izklopljena** in namerno nastavljiva za vsak cilj posebej.
Pošlje se to, kar prikazuje nadzorna plošča, ker izvoz in `getCallLogById` uporabljata skupno razreševanje
podrobnosti: iz koristnih vsebin so
osebni podatki že odstranjeni, skrivnosti pa zakrite, ko se vsebine zapišejo; klic, izveden z API-ključem
`noLog`, pa sploh ne shrani koristne vsebine, zato ni ničesar za izvoz.

Koristne vsebine se za vsako vrstico preberejo iz artefakta datotečnega sistema, zato se hidracija izvede samo za cilje,
ki so jo zahtevali. Če artefakt manjka ali je poškodovan, se izvozi njegov povzetek z ničelnimi koristnimi vsebinami,
namesto da bi paket spodletel in kazalec obtičal.

`maxBodyBytes` (privzeto 262144) omejuje vsako polje. Daljše koristne vsebine so **skrajšane, ne
zavržene** — odrezani poziv še vedno odgovori na vprašanje »kaj je bilo vprašano« — vrstica pa je označena z
`bodies_truncated`. Pretočne spremembe, poslane kos za kosom, se ne izvozijo; sestavljeni odgovor je
že v `pipeline_provider_response` in `pipeline_client_response`.

---

## 2. Datoteke

| Del                               | Lokacija                                     |
| --------------------------------- | -------------------------------------------- |
| Pogodba cilja                     | `src/lib/logExport/types.ts`                 |
| Register                          | `src/lib/logExport/registry.ts`              |
| Obravnava skrivnosti              | `src/lib/logExport/secrets.ts`               |
| Izvajalnik (nadrejeni IPC)        | `src/lib/logExport/runner.ts`                |
| Življenjski cikel procesa         | `src/lib/logExport/childRunner.ts`           |
| Vstopna točka podrejenega procesa | `src/lib/logExport/exportChild.ts`           |
| Odpiralnik samo za branje         | `src/lib/db/logExportReadOnly.ts`            |
| Skupna poizvedba/preslikava       | `src/lib/usage/callLogExportQueries.ts`      |
| Razreševalnik podrobnosti         | `src/lib/usage/callLogDetailResolver.ts`     |
| Projekcija API-ja                 | `src/lib/logExport/presenter.ts`             |
| Cilj BigQuery                     | `src/lib/logExport/destinations/bigquery.ts` |
| Preverjanje pristnosti Google SA  | `src/lib/logExport/googleServiceAccount.ts`  |
| Vir dnevnika klicev               | `src/lib/usage/callLogExportSource.ts`       |
| Trajna hramba                     | `src/lib/db/logExportDestinations.ts`        |
| Opravilo cron                     | `src/lib/jobs/logExportJob.ts`               |
| Plast REST                        | `src/app/api/log-export/`                    |
| Stran nadzorne plošče             | `src/app/(dashboard)/dashboard/log-export/`  |

Shema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. API REST

Vse poti zahtevajo upravljavsko preverjanje pristnosti (`requireManagementAuth`). Skrivnosti se nikoli ne vrnejo:
shranjena skrivnost se vrne kot dobesedna vrednost `__stored__`, pošiljanje te vrednosti nazaj pri posodobitvi
pa ohrani shranjeno poverilnico.

Ustvarjanje ali posodabljanje cilja, katerega vrsta deklarira skrivnost, **zahteva
`STORAGE_ENCRYPTION_KEY`**. Brez njega je `encrypt()` tih prepust, zato je zapis
zavrnjen z napako 400, namesto da bi bila poverilnica v SQLite shranjena kot navadno besedilo (enako varovalo
uporablja spletni kavelj Telegram).

| Metoda   | Pot                                      | Namen                                                         |
| -------- | ---------------------------------------- | ------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Vrste ciljev in seznam njihovih polj konfiguracije            |
| `GET`    | `/api/log-export/destinations`           | Seznam ciljev (skrivnosti so zakrite)                         |
| `POST`   | `/api/log-export/destinations`           | Ustvari cilj                                                  |
| `GET`    | `/api/log-export/destinations/{id}`      | Prebere en cilj                                               |
| `PUT`    | `/api/log-export/destinations/{id}`      | Posodobi ime / omogočenost / konfiguracijo / paketno obdelavo |
| `DELETE` | `/api/log-export/destinations/{id}`      | Izbriše cilj                                                  |
| `POST`   | `/api/log-export/destinations/{id}/test` | Preveri poverilnice brez zapisovanja                          |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Izprazni zdaj, po isti poti kot načrtovani zagon              |
| `GET`    | `/api/log-export/status`                 | Stanje opravila cron, nedavni zagoni, zaostanek po ciljih     |

`GET /api/log-export/types` omogoča generičnost uporabniškega vmesnika: obrazec na nadzorni plošči se izriše iz
vrnjenih opisnikov polj, zato nov cilj ne zahteva spremembe uporabniškega vmesnika.

---

## 4. Cilj BigQuery

Ključi konfiguracije (`type: "bigquery"`):

| Ključ                | Opombe                                                                      |
| -------------------- | --------------------------------------------------------------------------- |
| `projectId`          | Projekt GCP, ki vsebuje nabor podatkov                                      |
| `datasetId`          | `[A-Za-z0-9_]+`                                                             |
| `tableId`            | `[A-Za-z0-9_]+`                                                             |
| `location`           | Uporabi se le, ko je treba ustvariti nabor podatkov (privzeto `EU`)         |
| `serviceAccountJson` | Ključ storitvenega računa. Skrivnost: šifrirana v mirovanju, nikoli vrnjena |
| `autoCreate`         | Ob prvem izvozu ustvari nabor podatkov in tabelo (privzeto `true`)          |

Storitveni račun potrebuje dovoljenje `bigquery.tables.updateData` za ciljno tabelo ter
`bigquery.datasets.create` / `bigquery.tables.create`, ko je možnost `autoCreate` omogočena.

Konfigurirani paket je enota **kazalca**, ne enota HTTP: `send()` ga razdeli na klice insertAll
z največ 500 vrsticami, zato velik `batch_size` ne more preseči omejitve BigQuery za zahtevo velikosti 10 MB.
Pri prehodnih stanjih (408/429/500/502/503/504) se poskus ponovi do trikrat z eksponentnim
podaljševanjem premora in ponovno uporabo istih insertIds; napake preverjanja pristnosti in sheme sprožijo izjemo že ob prvem poskusu,
namesto da bi po nepotrebnem porabile zagon.

Tabela, ustvarjena pred nekaj trenutki, še ni vidna pretočni končni točki, ki
nekaj sekund vrača 404. Ta odgovor 404 se poskusi znova, vendar **le, ko je tabela ustvarjena v tem zagonu** —
dejansko manjkajoča tabela še vedno takoj povzroči napako. Upoštevajte, da BigQuery ob ponovnem ustvarjanju tabele z imenom,
pod katerim je bila tabela nedavno izbrisana, več minut zavrača pretočno vstavljanje; to je
lastnost postopka brisanja in ponovnega ustvarjanja, zato namesto brisanja in ponovnega dodajanja raje uporabite novo ime tabele.

**Delna napaka prispe kot HTTP 200 z nepraznim `insertErrors[]`.** Obravnava se kot
napaka in sproži izjemo, kar prepreči, da bi kazalec napredoval prek vrstic, ki jih BigQuery ni
sprejel; `tests/unit/log-export-bigquery.test.ts` zagotavlja to vedenje.

Prenos uporablja navaden REST — samopodpisana trditev RS256 se zamenja za žeton za dostop na
`https://oauth2.googleapis.com/token`, nato pa se vrstice pošljejo v `tabledata.insertAll`. Noben Google SDK
ni vključen. Žetoni za dostop se predpomnijo znotraj procesa za vsak par (storitveni račun, obseg).

Ustvarjena tabela vsebuje po en stolpec za vsako polje zavihka Dnevniki in še `exported_at`, razporejena pa je glede na
dejanski način poizvedovanja po dnevnikih klicev:

- **Dnevno particionirana po `timestamp`**, zato poizvedba, omejena z datumom, pregleda samo te dni.
- **Gručenje po `api_key_name`, `provider`, `model`, `status`** (v tem vrstnem redu), zato filtriranje glede na
  izvajalca, cilj ali uspešnost obreže bloke znotraj vsake particije. BigQuery
  dovoljuje največ štiri stolpce za gručenje, pri čemer je vrstni red pomemben: filter samo po `api_key_name`
  obrezuje, filter samo po `status` pa ne.
- **Izbirna hramba particij** prek `partitionExpirationDays` (0 ohrani vse), ki se uporabi
  ob ustvarjanju tabele.

Obe nastavitvi se uporabita ob ustvarjanju. Obstoječa tabela ohrani svojo trenutno postavitev, zato
cilj usmerite na nov ID tabele, če ju želite uporabiti.

`tests/unit/log-export-bigquery.test.ts` preverja, da preslikovalnik in shema tabele ostajata
usklajena, zato novega stolpca dnevnika klicev pri izvozu ni mogoče neopazno izpustiti.

Paketi se razdelijo glede na **oboje**: število vrstic in število bajtov serializiranih podatkov. Zgolj število vrstic ni dovolj,
ko se izvažajo koristne vsebine: 500 vrstic s pozivi lahko zavzame več deset megabajtov, insertAll
pa zavrne zahtevo, večjo od 10 MB. Paketi se zaključijo pri 500 vrsticah ali 9 MB, odvisno od tega, katera meja je dosežena prej.

---

## 5. Cilj za sledi OTLP/HTTP

Konfiguracija uporablja `type: "otlp-http"`. To je načrtovan izvoz shranjenih
dnevnikov klicev s kazalcem, ne pa ponor dogodkov usmerjanja v živo po načelu najboljšega truda v
`open-sse/services/routing/otel.ts`. Ne bere ali spreminja okolijskih
spremenljivk, časovnikov ali medpomnilnikov tega ponora. Če omogočite oboje, lahko nastaneta dve neodvisni vrsti razponov;
za razlikovanje teh razponov dnevnikov klicev uporabite obseg instrumentacije `omniroute.log-export`.

| Ključ                    | Privzeta vrednost / namen                                                         |
| ------------------------ | --------------------------------------------------------------------------------- |
| `endpoint`               | Obvezen celoten URL HTTP(S) za sledi; pripona `/v1/traces` se ne doda             |
| `headers`                | Izbirne vrstice `Name: value` ali objekt JSON z nizi; šifrirano                   |
| `requestHeaderAllowlist` | Prazno (izklopljeno); imena/predpone glav odjemalca za zajem kot atributi razpona |
| `serviceName`            | `omniroute`; atribut vira `service.name`                                          |
| `langfuseMapping`        | `false`; doda atribute Langfuse za generiranje/sejo/uporabnika                    |
| `identity`               | `pseudonymous`, `keyName` ali `none`                                              |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                           |
| `timeoutMs`              | `30000` na poskus HTTP                                                            |
| `environment`            | Ni nastavljeno; izbirni `langfuse.environment`                                    |

Splošna nadzorna plošča prikazuje ta polja. `paths` sprejme polje prek API-ja ali besedilno območje
z natančnimi potmi, ločenimi z novimi vrsticami/vejicami. Poti za vektorske vložitve, ponovno razvrščanje in druge poti se
preskočijo, razen če so izrecno dovoljene. Tudi preskočene vrstice premaknejo kazalec; števca
`exported`/`exportedTotal` obstoječega izvajalnika štejeta obdelane izvorne vrstice, vključno s filtriranimi
vrsticami, ne pa sprejetih razponov. Filtriranje poteka v podrejenem procesu, ne da bi se spremenil njegov
dogovor glede IPC/kazalca.

Preverjanje URL-jev uporablja pomožno funkcijo `parseAndValidateNonMetadataUrl` iz
`src/shared/network/outboundUrlGuard.ts`, ki ne potrebuje podatkovne zbirke: pravilnik `block-metadata`. Izvaja enaka
brezpogojna preverjanja metapodatkov/protokola/vdelanih poverilnic kot validator spletnih kavljev z
omogočenimi zasebnimi URL-ji, vendar namenoma dovoljuje cilje localhost/LAN brez globalnega
preglasa z zastavico funkcionalnosti. To omogoča samostojno gostovane končne točke Langfuse, Phoenix, Tempo in Collector,
vključno z zasebnimi končnimi točkami HTTP. Gostitelji metapodatkov v oblaku so vedno blokirani.
Preusmeritvam se ne sledi, zato zbiralnik ne more preusmeriti poverilnic na drugega gostitelja.
Tako kot obstoječa leksikalna zaščita URL-jev tudi ta ne fiksira razreševanja DNS; konfigurirajte le
gostitelje pod nadzorom upravljavca. Kadar končna točka ni v zaupanja vrednem omrežju, dajte prednost HTTPS.

### Vsebina in dostava

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) prenaša en
razpon CLIENT na dovoljeno vrstico, poimenovan z njeno natančno potjo zahteve. Poimenovanje po poti razlikuje
Chat Completions, Responses in Messages, ne da bi v ime
razpona vključevalo podatke o modelu ali identiteti. Atributi vira vključujejo `service.name` in `service.version` paketa.

Običajni zapisovalnik poskusov klepeta (`open-sse/handlers/chatCore/attemptLogging.ts`) ob zaključku zapiše
`duration = Date.now() - startTime` in ne poda časovnega žiga;
`saveCallLogOperation` v `src/lib/usage/callLogs.ts` privzeto nastavi časovni žig na čas zapisa
(zaključka). Izvoz zato nastavi konec = časovni žig vrstice in začetek = konec − trajanje
(milisekunde, pretvorjene v decimalne nanosekunde). Tudi zgodovinski časovni žigi,
ki jih poda klicatelj, se ohranijo kot končni čas; na ravni vrstice ni ločevanja med začetkom in zaključkom.
Trajanje z vrednostjo null postane nič. Neveljavni/manjkajoči časovni žigi povzročijo neuspeh paketa, namesto da bi ustvarili
nedeterministične razpone. `ttftMs` lahko vsebuje null in se preslika v `omniroute.ttft_ms`.

Atributi vključujejo `gen_ai.operation.name="chat"`, ponudnika, zahtevani/odzivni model,
vhodne/izhodne žetone, izbirne žetone za branje iz predpomnilnika/ustvarjanje predpomnilnika/sklepanje, stanje HTTP,
kombinacijo, vir predpomnilnika, oznako seje in korelacijski ID. Celoštevilske vrednosti OTLP in časovni žigi
so decimalni nizi; nizi, logične vrednosti in necela števila uporabljajo svoje izvorne različice vrednosti OTLP.
Razponi napak imajo stanje ERROR in prečiščeno sporočilo o stanju. Kanonični
zapis nima URL-ja nadrejenega gostitelja, zato je `server.address` izpuščen, namesto da bi
zbiralnik napačno označeval kot strežnik modela. Strošek se ne izvozi.

Vsebino naloži samo `includeBodies=true`. Pri `langfuseMapping=false`
`gen_ai.input.messages` / `gen_ai.output.messages` vsebujeta prečiščeni telesi zahteve/odziva
v obliki JSON, kot ju shrani OmniRoute (kanonizirani, kadar ju je mogoče razčleniti), ne pa preoblikovanega polja
sporočil po semantičnih konvencijah. Odrezana telesa in telesa, ki niso JSON, ostanejo surovo besedilo. Pri `langfuseMapping=true`
se telesi oddajata samo kot `langfuse.observation.input` / `langfuse.observation.output`;
atributi `gen_ai.*.messages` so izpuščeni, tako da je vsako telo poslano enkrat. Oba načina
podedujeta `maxBodyBytes` iz obstoječega postopka nalaganja;
`omniroute.bodies_truncated=true` označuje odrezovanje.
Ta cilj ne dodaja dodatnih posnetkov cevovoda ali branja neprečiščenih artefaktov;
izbirni zajem glav zahtev uporablja obstoječi naloženi posnetek odjemalca, opisan spodaj.
Pri izvozu teles uporabite razpored na ravni minut, na primer `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`,
namesto da bi se neobdelani podatki kopičili eno uro.

### Izbirne glave zahtev odjemalca

Zajem glav je **privzeto izklopljen**. V konfiguraciji cilja nastavite `requestHeaderAllowlist`
in omogočite **Izvoz pozivov in odzivov** (`includeBodies: true` pri cilju).
Seznam dovoljenih glav sprejme polje prek API-ja ali besedilno območje z imeni, ločenimi z novimi vrsticami/vejicami:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Imena se ujemajo natančno in ne glede na velikost črk, razen če en sam končni `*` izbere neprazno
predpono imena glave. Samostojni `*`, vdelani nadomestni znaki in neveljavna imena glav HTTP so zavrnjeni.
Izbirnikov je lahko največ 64, vsak pa ima ime/predpono z največ 256 bajti ASCII.
Ta nastavitev je ločena od `headers`, ki izvoznika overi pri zbiralniku.

Zajem bere samo `pipeline_client_request`, napolnjen iz `clientRawRequest` shranjenega podrobnega cevovoda
(ali starejšega `clientRequest`). Nikoli ne uporabi glav zahteve ponudnika kot nadomestnega vira.
Podrobno beleženje cevovoda je moralo biti omogočeno ob beleženju zahteve. Če je
`includeBodies` onemogočen ali če JSON posnetka odjemalca manjka, je poškodovan ali odrezan, se atributi
glav ne oddajo. Povečanje `maxBodyBytes` lahko prepreči rezanje posnetka med izvozom;
ne more pa obnoviti podrobnosti, ki nikoli niso bile shranjene. Posnetek, večji od 1 MiB ali z več kot
256 vnosi glav, se prezre. Obstoječi izvoz pozivov/odgovorov ostane omogočen poleg
zajema glav; seznam dovoljenih ne zagotavlja načina nalaganja samo glav.

Izbrane vrednosti postanejo polja nizov OTLP `http.request.header.<full lowercase header name>`,
tudi če gre za en sam niz. Na primer, `X-OmniRoute-Meta-Team: example-team` postane
`http.request.header.x-omniroute-meta-team` z
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Celotna predpona se ohrani: to so navadne glave, brez razčlenjevanja poslovnih polj ali
pretvorbe v metapodatke `omniroute.metadata.*` / Langfuse. `langfuseMapping` ne spreminja semantike
glav. Izbrani `User-Agent` z eno vrednostjo nastavi tudi standardni skalarni atribut
`user_agent.original`. Vejice znotraj ene vrednosti se ne uporabljajo za razdeljevanje. Različice z različno velikostjo črk se združijo v vrstnem
redu shranjenih vnosov; katera koli neveljavna različica povzroči izpustitev celotne glave. Atributi so razvrščeni po imenih z malimi črkami.

Authorization, Proxy-Authorization, Cookie, Set-Cookie, glave s ključi API, imena, ki vsebujejo
oznake auth/token/secret/password/credential, in interne poverilnice prehoda so vedno
izključeni, tudi če so izbrani ali delno zakriti v shrambi. Znani vzorci poverilnic uporabljajo
skupni detektor poverilnic; oznake zakritja se izpustijo in se ne izvozijo kot varne vrednosti.
Sprejeti so samo nizi in neprazna polja nizov; števila ali objekti se ne pretvarjajo.
Neveljavna imena, ključi prototipov, krmilni znaki (razen vodoravnega tabulatorja) in nepravilno oblikovan Unicode
se prezrejo, ne da bi paket spodletel ali da bi bila njihova vsebina vključena v napake.

Vsak razpon zajame največ 32 glav, 16 vrednosti na glavo, 4096 bajtov UTF-8 na vrednost
in skupno 16384 bajtov UTF-8 za imena in vrednosti zajetih glav. Prevelike/neveljavne glave
se izpustijo v celoti in se ne režejo. Izbira je odločitev upravljavca glede zasebnosti: tudi navidezno varna imena
lahko vsebujejo osebne podatke, te omejitve/detektorji pa niso splošno orodje za odstranjevanje osebnih podatkov.

### Omejitve dostave

Zahteve so omejene na 500 razponov in 4 MiB JSON v kodiranju UTF-8, vključno z ovojnico.
Velikost vsakega dovoljenega razpona se preveri pred prvo zahtevo paketa kazalca. Če je posamezen
razpon večji od omejitve, se ne pošlje noben del tega paketa, postopek pa spodleti z navodilom za zmanjšanje
`maxBodyBytes`; razpon se ne zavrže tiho. Predhodno preverjanje hrani samo sklice na zapise in
število bajtov ter zavrže vsak začasni razpon/JSON; razponi se znova sestavijo za velikostno omejene dele,
namesto da bi se hranila druga serializirana kopija paketa. Pri HTTP 408/429/5xx, omrežnih napakah in časovnih prekoračitvah se izvedejo največ
trije poskusi z eksponentnim zamikom 250/500 ms. Sekunde ali datumi HTTP v `Retry-After`
lahko podaljšajo zamik do 5 sekund. Drugi statusi povzročijo takojšen neuspeh. Tudi delna zavrnitev OTLP 2xx sproži izjemo, namesto da bi
potrdila izgubljeni razpon; sprejete so prazne potrditve ali potrditve z veljavnim JSON, z
omejitvijo branja odgovora na 64 KiB.

Napake vsebujejo samo podatke, ki jih določa izvoznik: status HTTP, razred ponovnega poskusa, število poskusov in poslanih
razponov ali vnaprej določeno besedilo o neuspešni potrditvi/omrežni napaki. Telesa odgovorov zbiralnika,
števila delno uspešnih obdelav in glave odgovorov se nikoli ne kopirajo v napake, dnevnike ali
nadzorno ploščo. Neuspešen ali delno sprejet paket se ne potrdi: cilj prikaže
stanje neuspeha s tem statusom, kazalec ostane pri zadnjem potrjenem paketu, naslednji zagon pa
znova pošlje iste vrstice. Trajni statusi še naprej povzročajo neuspeh, dokler zbiralnik ali konfiguracija
nista popravljena. Za podrobnosti odgovorov uporabite dnevnike zbiralnika. Povzetki napak v dnevniku klicev ohranijo
svoje ločeno zakrivanje.
`prepare()` ne pripravi nobenih virov; preizkus pošlje natanko `{"resourceSpans":[]}` in sporoči
status HTTP, ne da bi zapisal razpone dnevnika klicev.

Identifikatorji sledi in identifikatorji razponov so prvih 32/16 šestnajstiških števk zgoščene vrednosti SHA-256 za
`"omniroute.trace\0" + callLogId` in `"omniroute.span\0" + callLogId`. Ponovna pošiljanja imajo
enake identifikatorje. To ne zagotavlja odstranjevanja dvojnikov: nekateri zaledni sistemi, vključno z zajemom Langfuse
v4, ne odstranjujejo podvojenih razponov z enakim identifikatorjem. Sesutje ali delna napaka pri pošiljanju dela paketa lahko
povzroči ponovno pošiljanje največ enega nepotrjenega paketa kazalca; podvoji se lahko celoten paket,
ne le njegov zadnji del HTTP. Pri izbiri velikosti paketa kazalca upoštevajte ta kompromis.

### Primer za Langfuse

Za samostojno gostovani primerek Langfuse konfigurirajte ta polja:

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

Vrednost Authorization sestavite lokalno kot kodiranje Base64 dobesednega niza `public-key:secret-key`
(na primer z `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Pravih poverilnic ne lepite v dnevnike, posnetke zaslona ali prijave težav. Preslikava samodejno
nastavi `x-langfuse-ingestion-version: 4`; Authorization se še vedno poda v `headers`.
Tako glave kot ustvarjena sol za identiteto uporabljajo obstoječi mehanizem šifriranih skrivnih polj
in nadomestne oznake API; `STORAGE_ENCRYPTION_KEY` je obvezen.

Preslikava doda vrsto/model generiranja, podrobnosti o uporabi v obliki JSON (vhod/izhod/skupaj in razpoložljive
ključe predpomnilnika), posnetke vhoda/izhoda v obliki JSON, raven ERROR/DEFAULT, očiščeno sporočilo o stanju,
ime sledi, ID seje, izbirno okolje in atribut
`langfuse.observation.metadata.<key>`, po katerem je mogoče filtrirati, za ponudnika, zahtevani model, pot, kombinacijo, vir
predpomnilnika in stanje. `langfuse.observation.completion_start_time` je čas v obliki ISO 8601,
izračunan kot začetek + TTFT, vendar le, če je TTFT znan in znotraj trajanja. Atributi stroškov se ne pošiljajo.

Načini identitete veljajo za `langfuse.user.id`:

- `pseudonymous` (privzeto): HMAC-SHA256 notranjega ID-ja ključa API z naključno
  32-bajtno soljo za vsak cilj posebej. Če sol ni podana, se ustvari ob ustvarjanju, šifrira
  kot `identitySalt`, nikoli ne vrne in ohrani med urejanjem. Neobdelani ID-ji ključev se nikoli ne
  vključijo v atribute razponov. Ponovno ustvarjanje ali zamenjava soli cilja spremeni identitete.
- `keyName`: nastavljeno ime ključa API, ki namerno razkrije to oznako, določeno s strani upravljavca.
- `none`: brez ID-ja uporabnika. Oznake sej se še vedno izvažajo, kadar so prisotne; ti načini ne
  anonimizirajo poljubne vsebine pozivov ali oznak sej/korelacije, ki jih določi upravljavec.

### Začetek brez naknadnega uvoza zgodovine

Samo ob ustvarjanju omogočite **Začni s trenutnega položaja (preskoči obstoječe dnevnike)** ali podajte
`startFromCurrentPosition: true` na najvišji ravni podatkov zahteve API za ustvarjanje. S tem se
`cursor_row_id` z obstoječimi pomožnimi funkcijami za kazalec inicializira na trenutni največji ohranjeni rowid dnevnika klicev,
brez migracije. Privzeta vrednost je false (kazalec 0 in naknadni uvoz ohranjene zgodovine).
To ni nastavitev za ponastavitev kazalca ob posodobitvi.

Skupna dopolnitev `ttftMs` doda tudi stolpec `ttft_ms`, ki dopušča vrednost null, v preslikovalnik BigQuery
in shemo novih tabel: njen preizkus sheme zahteva, da ima vsako polje kanoničnega zapisa ustrezen
stolpec. Izvoz v obstoječe tabele ostane nespremenjen: `prepare()` prebere shemo tabele in
izpusti samo `ttft_ms`, kadar ta stolpec manjka. Dodajte stolpec INT64, ki dopušča vrednost null, da boste ob naslednjem zagonu
prejeli TTFT, ali uporabite novo tabelo. PATCH, samodejna sprememba sheme ali dodatna
dovoljenja niso potrebni; za vsa druga polja vrstic še naprej velja strogo preverjanje sheme.

---

## 6. Dodajanje cilja

1. Ustvarite `src/lib/logExport/destinations/<name>.ts`, ki izvaža `LogExportDestinationType`:
   Zodovo `configSchema`, tabelo opisnikov `fields` za uporabniški vmesnik, `secretFields` in
   `createClient(config)`, ki vrne `test()` / `prepare()` / `send(records)`.
2. Dodajte ga v tabelo `DESTINATIONS` v `src/lib/logExport/registry.ts`.
3. Napišite teste v `tests/unit/`.

To je celotna sprememba: trajna hramba, opravilo cron, plast REST, šifriranje skrivnosti in
obrazec nadzorne plošče vsi uporabljajo register.

Za nov cilj veljata dve pravili:

- `send()` **mora sprožiti izjemo** ob delnem neuspehu. Uspešen zaključek pomeni »cilj ima te vrstice«,
  kazalec pa se trajno premakne prek njih.
- Cilj, ki sprejema URL, ki ga vnese uporabnik, ga mora pred pridobivanjem preveriti s
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`),
  enako kot spletni kavlji. BigQuery tega ne potrebuje, saj so njegovi gostitelji nespremenljive vrednosti.

---

## 7. Upravljanje

- **Nadzorna plošča**: Integracije → Izvoz dnevnikov. Dodajte cilj, za preverjanje poverilnic
  brez zapisovanja vrstic zaženite **Preizkus**, nato pa ga omogočite.
- **Zaostanek**: vsaka kartica cilja prikazuje čakajoče vrstice in kazalec; `GET
/api/log-export/status` vrne iste podatke ter zadnjih 20 izvajanj opravila.
- **Nedelujoč cilj ne povzroči neuspeha drugih** — povzetek izvajanja beleži stanje posameznega cilja
  v `last_status` / `last_error`, zgodovina izvajanj opravila pa hrani skupni rezultat.
- **Z izbrisom cilja se izbriše tudi njegov kazalec.** Če ga znova dodate, začne pri najstarejšem
  ohranjenem dnevniku klicev, zato znova pošlje vrstice, ki jih cilj morda že vsebuje. V BigQueryju
  `insertId` posamezne vrstice to odpravi le znotraj BigQueryjevega lastnega časovnega okna za
  odstranjevanje dvojnikov, zato cilj raje onemogočite, kot da ga izbrišete.
