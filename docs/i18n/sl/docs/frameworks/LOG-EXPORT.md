# Log export (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Neprekinjen, inkrementalen izvoz dnevnikov klicev OmniRoute v zunanjo analitično shrambo.

Zavihek Dnevniki na nadzorni plošči hrani zgodovino zahtev v SQLite (`call_logs`), kjer je omejena z
rotacijo in obdobjem hrambe. Izvoz dnevnikov po urniku pošilja isti nabor zapisov v zunanjo shrambo, da se lahko ohrani
dlje kot lokalna zbirka podatkov in združuje z drugimi podatki. BigQuery je prvi cilj;
cevovod temelji na registru, zato je mogoče dodatne cilje preprosto dodajati.

---

## 1. Kako deluje

```
server (decrypt + validate config, reconcile cursor)
  → start IPC → isolated exportChild OS process
    → read-only storage.sqlite → shared call-log query/mapping
      → async artifact hydration → destination prepare()/send()
        → batch IPC → server persists cursor → ack IPC
          → next batch; done IPC → server records success
```

- **Urnik** — eno opravilo cron v `JobRegistry`, `log_export`, s privzeto vrednostjo `0 * * * *` (vsako uro,
  UTC). Registrirano je v `src/lib/initCloudSync.ts`; preglasite ga lahko z `OMNIROUTE_LOG_EXPORT_CRON`.
  Vsaka sprožitev zaporedno obdela vse **omogočene** cilje.
- **Kazalec** — implicitni `call_logs.rowid` v SQLite, shranjen za vsak cilj v
  `log_export_destinations.cursor_row_id`. `timestamp` namenoma ni kazalec: klicatelji
  lahko navedejo lastno vrednost, zato se lahko počasna zahteva zapiše za hitrejšo, ki se je začela
  pozneje, kazalec na podlagi časovnega žiga pa bi jo preskočil.
- **Paketna obdelava** — `batch_size` vrstic na zahtevo (privzeto 500), `max_rows_per_run` vrstic na zagon
  (privzeto 10000), tako da se velik zaostanek obdela v več sprožitvah, namesto da bi blokiral eno.
- **Dostava** — kazalec se premakne naprej šele, ko se `send()` uspešno zaključi. Pri neuspelem paketu ostane
  kazalec na istem mestu, zato se iste vrstice znova poskusijo poslati ob naslednjem zagonu. Zagotovljena je
  dostava vsaj enkrat z odstranjevanjem dvojnikov na cilju, ne pa prava dostava natanko enkrat: BigQuery za ključ vsake
  vrstice uporablja ID dnevnika klica, ki ga po najboljših močeh upošteva znotraj lastnega časovnega okna za odstranjevanje dvojnikov.
- **Zaščita pred prekrivanjem** — sprožitev cron in `POST .../run` se lahko izvedeta hkrati. Cilj,
  ki se že obdeluje, se preskoči, namesto da bi se obdelal dvakrat (`skipped: true` v rezultatu zagona),
  zato sočasen zagon ne more znova poslati paketa ali premakniti kazalca nazaj.
- **Obnovitev po izpraznitvi** — če je `cursor_row_id` višji od `MAX(rowid)` (celotna tabela je bila
  izpraznjena in so se vrednosti rowid začele znova), izvajalnik kazalec ponastavi na 0, namesto da bi trajno izgubil pregled nad novimi zapisi.

### Izoliran izvajalnik in omejitve

Vsak zagon cilja v okolju Node ustvari ločen, kratkoživ podrejeni proces operacijskega sistema (`child_process`
z IPC, ne `worker_threads`). Branje teles, razčlenjevanje/serializacija podatkov JSON, ciljni
`prepare()` in omrežni V/I cilja se izvajajo tam, ne v dogodkovni zanki strežnika.
Prek IPC se prenašajo le konfiguracija in majhna sporočila o napredku; izvoženi zapisi se nikoli ne vrnejo
v strežnik. Opravilo cron in pot Zaženi zdaj ohranjata enak javni rezultat in zaščito pred prekrivanjem.

Podrejeni proces odpre strežnikovo razrešeno pot `DATA_DIR/storage.sqlite` samo za branje z uporabo `node:sqlite`,
z nastavitvama `busy_timeout=5000` in `query_only=ON`. Ne uvozi nobenega enojčka zbirke podatkov in ne izvaja
migracij, varnostnih kopiranj ali posodobitev SQLite. Evidentiranje manjkajočih/poškodovanih artefaktov (vključno z
operacijo UPDATE za poškodovane artefakte) ostaja izključno v poti za podrobnosti na nadzorni plošči. Obe poti si delita čisti
razreševalnik podrobnosti; izvoz uporablja asinhrono branje datotečnega sistema in enak vrstni red razreševanja: artefakt → starejši
vdelani podatki → starejši podatki na disku → nič. Zagon zajame največji rowid vstavljanja,
ko podrejeni proces odpre svoj bralnik; poznejši vnosi počakajo na naslednji zagon. To je meja
vstavljanja, ne dolgotrajna transakcija SQLite: zapisovalniki WAL in kontrolne točke med
čakanjem na omrežje ostajajo neovirani. Ta meja ne zamrzne posodobitev/brisanj obstoječih vrstic.

Po vsakem sprejetem paketu podrejeni proces počaka na potrditev. Strežnik najprej trajno shrani
kazalec z `advanceLogExportCursor`, nato pošlje `ack`; naslednji paket se ne začne pred tem.
Neuspešno pošiljanje, sesutje ali prekoračitev časovne omejitve zabeleži napako, ne da bi premaknilo kazalec za ta paket. Predhodno
potrjeni paketi ostanejo potrjeni; znova se lahko pošlje največ en nepotrjen paket.
Uspeh se zabeleži šele po `done` in pravilnem zaključku podrejenega procesa. Ob napakah se podrejeni proces ustavi
s SIGTERM, po 500 ms pa se po potrebi uporabi SIGKILL; izvajalnik počaka na zaprtje procesa.

| Okoljska spremenljivka                        | Privzeto | Namen                                                   |
| --------------------------------------------- | -------- | ------------------------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000   | Časovna omejitev dejanskega trajanja za posamezni cilj  |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024     | Omejitev prostora old-space V8 podrejenega procesa v MB |

Neveljavne/nepozitivne/neceloštevilske vrednosti uporabijo privzete nastavitve. Nastavitev kopice ni omejitev skupnega
RSS; zelo veliki paketi lahko še vedno izčrpajo pomnilnik podrejenega procesa in varno povzročijo neuspeh zagona.
Privzeta vrednost 1024 MB zagotavlja rezervo za privzeti paket 500 vrstic z artefakti velikosti 512 KiB in
omogočenimi telesi, vključno s serializacijo JSON v bajtnih kosih za BigQuery. Ne zagotavlja pa varnosti
paketa 10000 vrstic s telesi. Izčrpanje kopice V8 zabeleži napako z navodili za ukrepanje: zmanjšajte velikost
paketa ali povečajte `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; kazalec ostane pri zadnjem
potrjenem paketu. Omejitev sodobnih artefaktov ne zajema zgodovinskih vdelanih teles/teles na disku.
Upravljavci morajo porabo RSS načrtovati ločeno, zlasti v vsebnikih z omejenim pomnilnikom.

Podrejeni proces podeduje samo razrešeni `DATA_DIR`, `NODE_ENV`, izrecno nastavljeni `TZ` (starejše razreševanje
lokalnega časa v imenih datotek), `ELECTRON_RUN_AS_NODE`, kadar je prisoten, in naslednje vhodne nastavitve za odhodne povezave:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (in njihove oblike z malimi črkami),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
Globalni razpošiljevalnik Undici uporablja enako razreševanje posredniškega strežnika izključno iz okolja in enaka pravila
za izogibanje posredniku pri lokalnih gostiteljih kot strežnik, vključno z `NO_PROXY`; ne uvaža `proxyFetch.ts` ali njegovih zastavic za podatkovno zbirko/funkcionalnosti.
Poverilnice posredniškega strežnika so zakrite v posredovanem izhodu in zabeleženih napakah. Poverilnice cilja
se prenesejo samo v enem začetnem sporočilu IPC, nikoli prek argv ali okolja; posredovani izhod in napake
dobijo predpono in so očiščeni. V argumentih za zagon podrejenega procesa je onemogočen samo `ExperimentalWarning`, da se
opozorilo okolja Node za SQLite ne ponavlja ob vsakem zagonu cron; druge vrste opozoril ostanejo vidne.

Module ciljev mora biti mogoče uvoziti brez odvisnosti od Next.js ali modulov, namenjenih samo strežniku. Obstoječa
implementacija BigQuery že izpolnjuje to zahtevo. Predpomnilniki dostopnih žetonov veljajo samo za posamezen
zagon podrejenega procesa, ne pa med zagoni. Podprto izvajalno okolje je Node (engines v `package.json`), vendar razdelek README o namestitvi
z Bun in `Dockerfile.bun` navajata tudi možnost združljivosti za produkcijo z uporabo
`bun:sqlite` (`src/lib/db/core.ts` / adapterji). V okolju Bun izvozi zato ohranijo prejšnji
način izvajanja znotraj procesa in izpišejo enkratno opozorilo: izolacija kopice/časovne omejitve podrejenega procesa ni na voljo. Za
izolacijo dogodkovne zanke in pomanjkanja pomnilnika (OOM) uporabite Node; Bun tu ni obravnavan kot okolje samo za razvoj.

Ko je omogočen `includeBodies`, dajte prednost minutnemu intervalu, kot je
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, namesto kopičenju urnega zaostanka vsebin.
Omejitve paketov in vrstic še vedno omejujejo vsak zagon. Strošek zagona procesa nastane za vsak cilj pri vsakem zagonu;
majhen strošek zagona se s tem zamenja za izolacijo dogodkovne zanke strežnika, ne za manjšo skupno porabo procesorja.

### Vsebine (pozivi in odgovori)

Izvoz privzeto vsebuje samo polja s povzetki, ki jih prikazuje **seznam** dnevnikov. Vklop možnosti
**Izvozi pozive in odgovore** (`includeBodies`) dodatno prenese tisto, kar podokno s **podrobnostmi**
dnevnikov prikazuje za vsak klic:

| Polje                            | Kaj vsebuje                                                  |
| -------------------------------- | ------------------------------------------------------------ |
| `request_body` / `response_body` | Vsebine klica, kot jih prikaže nadzorna plošča               |
| `pipeline_route_decision`        | Kateri cilj in model je izbral usmerjevalnik                 |
| `pipeline_client_request`        | Neobdelana zahteva, natanko taka, kot jo je poslal odjemalec |
| `pipeline_openai_request`        | Po pretvorbi v notranjo obliko OpenAI                        |
| `pipeline_provider_request`      | Kot je bila dejansko poslana ponudniku, v njegovi obliki     |
| `pipeline_provider_response`     | Neobdelan odgovor ponudnika                                  |
| `pipeline_client_response`       | Kar je bilo vrnjeno klicatelju                               |
| `pipeline_error`                 | Podrobnosti napake na ravni cevovoda pri neuspelem klicu     |
| `bodies_truncated`               | True, ko katero od zgornjih polj doseže `maxBodyBytes`       |

To je vsebina pozivov, zato je možnost **privzeto izklopljena** in se namenoma izbira za vsak cilj posebej.
Prenese se tisto, kar prikazuje nadzorna plošča, saj izvoz in `getCallLogById` uporabljata enako
razreševanje podrobnosti: vsebine so
že ob zapisovanju očiščene osebnih podatkov in imajo zakrite skrivnosti, klic s
ključem API `noLog` pa sploh ne shrani vsebine, zato ni ničesar za izvoz.

Vsebine se za vsako vrstico preberejo iz artefakta v datotečnem sistemu, zato se dopolnjevanje podatkov izvede samo za cilje,
ki so to zahtevali. Pri manjkajočem ali poškodovanem artefaktu se izvozi njegov povzetek z vsebinami null, namesto
da bi paket spodletel in bi kazalec obstal.

`maxBodyBytes` (privzeto 262144) omejuje vsako polje. Daljše vsebine se **skrajšajo, namesto da bi bile
izpuščene** — odrezan poziv še vedno pove, »kaj je bilo vprašano« — vrstica pa je označena z
`bodies_truncated`. Pretočne spremembe po posameznih kosih se ne izvažajo; sestavljeni odgovor je
že v `pipeline_provider_response` in `pipeline_client_response`.

---

## 2. Datoteke

| Del                                      | Lokacija                                     |
| ---------------------------------------- | -------------------------------------------- |
| Pogodba cilja                            | `src/lib/logExport/types.ts`                 |
| Register                                 | `src/lib/logExport/registry.ts`              |
| Obravnava skrivnosti                     | `src/lib/logExport/secrets.ts`               |
| Izvajalnik (IPC nadrejenega procesa)     | `src/lib/logExport/runner.ts`                |
| Življenjski cikel procesa                | `src/lib/logExport/childRunner.ts`           |
| Vstopna točka podrejenega procesa        | `src/lib/logExport/exportChild.ts`           |
| Odpiranje samo za branje                 | `src/lib/db/logExportReadOnly.ts`            |
| Skupne poizvedbe/preslikave              | `src/lib/usage/callLogExportQueries.ts`      |
| Razreševalnik podrobnosti                | `src/lib/usage/callLogDetailResolver.ts`     |
| Projekcija API-ja                        | `src/lib/logExport/presenter.ts`             |
| Cilj BigQuery                            | `src/lib/logExport/destinations/bigquery.ts` |
| Avtentikacija storitvenega računa Google | `src/lib/logExport/googleServiceAccount.ts`  |
| Vir dnevnika klicev                      | `src/lib/usage/callLogExportSource.ts`       |
| Trajno shranjevanje                      | `src/lib/db/logExportDestinations.ts`        |
| Opravilo cron                            | `src/lib/jobs/logExportJob.ts`               |
| Plast REST                               | `src/app/api/log-export/`                    |
| Stran nadzorne plošče                    | `src/app/(dashboard)/dashboard/log-export/`  |

Shema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

Vse poti zahtevajo upravljavsko avtentikacijo (`requireManagementAuth`). Skrivnosti se nikoli ne vračajo:
shranjena skrivnost se vrne kot dobesedna vrednost `__stored__`, pošiljanje te vrednosti ob posodobitvi pa
ohrani shranjeno poverilnico.

Ustvarjanje ali posodabljanje cilja, katerega tip deklarira skrivnost, **zahteva
`STORAGE_ENCRYPTION_KEY`**. Brez tega `encrypt()` tiho prepusti podatke nespremenjene, zato se zapis
zavrne s kodo 400, namesto da bi se poverilnica shranila v SQLite kot golo besedilo (enako varovalo uporablja
tudi spletni kavelj Telegram).

| Metoda   | Pot                                      | Namen                                                                        |
| -------- | ---------------------------------------- | ---------------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Tipi ciljev in seznam njihovih konfiguracijskih polj                         |
| `GET`    | `/api/log-export/destinations`           | Seznam ciljev (skrivnosti so prikrite)                                       |
| `POST`   | `/api/log-export/destinations`           | Ustvarjanje cilja                                                            |
| `GET`    | `/api/log-export/destinations/{id}`      | Branje posameznega cilja                                                     |
| `PUT`    | `/api/log-export/destinations/{id}`      | Posodobitev imena / omogočenosti / konfiguracije / paketne obdelave          |
| `DELETE` | `/api/log-export/destinations/{id}`      | Brisanje                                                                     |
| `POST`   | `/api/log-export/destinations/{id}/test` | Preverjanje poverilnic brez zapisovanja                                      |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Takojšnja obdelava čakajočih zapisov po isti poti kot pri načrtovanem zagonu |
| `GET`    | `/api/log-export/status`                 | Stanje opravila cron, nedavni zagoni, zaostanek po ciljih                    |

`GET /api/log-export/types` omogoča generičen uporabniški vmesnik: obrazec na nadzorni plošči se izriše iz
vrnjenih opisov polj, zato nov cilj ne zahteva sprememb uporabniškega vmesnika.

---

## 4. Cilj BigQuery

Konfiguracijski ključi (`type: "bigquery"`):

| Ključ                | Opombe                                                                                                                        |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `projectId`          | Projekt GCP, v katerem je nabor podatkov                                                                                      |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                                               |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                                               |
| `location`           | Uporablja se samo, ko je treba ustvariti nabor podatkov (privzeto `EU`)                                                       |
| `serviceAccountJson` | Ključ servisnega računa. Skrivnost: šifriran med mirovanjem, nikoli vrnjen                                                    |
| `autoCreate`         | Ustvari manjkajoči nabor podatkov/tabelo; pogojno doda stolpce z ničelnimi vrednostmi za dokazila o uporabi (privzeto `true`) |

Servisni račun potrebuje `bigquery.tables.updateData` za ciljno tabelo ter
`bigquery.datasets.create` / `bigquery.tables.create`, ko je `autoCreate` vklopljen.
Posodobitev obstoječe tabele z dodajanjem dveh stolpcev z ničelnimi vrednostmi za dokazila o uporabi zahteva tudi
`bigquery.tables.update`. Če dovoljenje manjka, izvoz spodleti, ne da bi se njegov kazalec pomaknil naprej.

Konfigurirana serija je enota **kazalca**, ne HTTP-enota: `send()` jo razdeli na klice insertAll
z največ 500 vrsticami, zato velik `batch_size` ne more preseči omejitve 10 MB za zahtevo BigQuery.
Prehodna stanja (408/429/500/502/503/504) se z eksponentnim umikom ponovijo največ trikrat,
pri čemer se znova uporabijo isti insertIds; napake pri preverjanju pristnosti in shemi se sprožijo že ob prvem
poskusu, namesto da bi po nepotrebnem porabile izvajanje.

Tabela, ustvarjena pred nekaj trenutki, še ni vidna pretočni končni točki, ki nekaj sekund odgovarja
s 404. Ta 404 se ponovi, vendar **samo, ko je tabela ustvarjena v tem izvajanju** —
resnično manjkajoča tabela še vedno takoj povzroči napako. Upoštevajte, da BigQuery pri
ponovnem ustvarjanju tabele z imenom, ki je bilo nedavno izbrisano, več minut zavrača pretočne vstavljanja;
to je lastnost zaporedja brisanja in ponovnega ustvarjanja, zato je bolje uporabiti novo ime tabele kot pa
tabelo izbrisati in znova dodati.

**Delna napaka prispe kot HTTP 200 z nepraznim `insertErrors[]`.** Obravnava se kot
napaka in sproži izjemo, s čimer se kazalec ne pomakne čez vrstice, ki jih BigQuery ni sprejel;
`tests/unit/log-export-bigquery.test.ts` določa to vedenje.

Prenos poteka prek običajnega REST — samopodpisana trditev RS256 se zamenja za žeton dostopa na
`https://oauth2.googleapis.com/token`, nato pa se vrstice pošljejo v `tabledata.insertAll`. Noben Google SDK
se ne vključi. Žetoni dostopa se v procesu predpomnijo za vsak par (servisni račun, obseg).

Ustvarjena tabela vsebuje po en stolpec za vsako polje zavihka Logs ter `exported_at` in je zasnovana
za način, na katerega se dnevniki klicev dejansko poizvedujejo:

- **Razdeljena je po dnevih na podlagi `timestamp`**, zato poizvedba, omejena samo z datumom, prebere le te dni.
- **Gruppirana je po `api_key_name`, `provider`, `model`, `status`** (v tem vrstnem redu), zato filtriranje po
  tem, kdo jo je izvedel, kam je bila poslana ali ali je spodletela, izloči bloke znotraj vsake particije. BigQuery
  dovoljuje največ štiri stolpce za grupiranje, vrstni red pa je pomemben: filter samo po `api_key_name`
  izloči bloke, filter samo po `status` pa ne.
- **Izbirno ohranjanje particij** prek `partitionExpirationDays` (0 ohrani vse), uporabljeno
  ob ustvarjanju tabele.

Obe nastavitvi se uporabita ob ustvarjanju. Obstoječa tabela ohrani svojo trenutno razporeditev, zato
cilj usmerite na nov ID tabele, če ju želite uveljaviti.

`tests/unit/log-export-bigquery.test.ts` preverja, da preslikovalnik in shema tabele ostajata
usklajena, zato novega stolpca dnevnika klicev na poti navzven ni mogoče tiho izpustiti.

Serije se razdelijo glede na **število vrstic in serializirane bajte**. Samo število vrstic ni dovolj,
ko se izvažajo vsebine: 500 vrstic s pozivi je lahko velikih več deset megabajtov, insertAll
pa zavrne zahtevo, večjo od 10 MB. Deli se zaključijo pri 500 vrsticah ali 9 MB, kar nastopi prej.

---

## 5. Cilj sledenj OTLP/HTTP

Konfiguracija uporablja `type: "otlp-http"`. To je načrtovan izvoz trajno shranjenih dnevnikov
klicev, podprt s kazalcem, in ne ponajboljši usmerjevalnik dogodkov v živo v
`open-sse/services/routing/otel.ts`. Ne bere in ne spreminja okoljskih spremenljivk,
časovnikov ali medpomnilnikov tega ponora. Če omogočite oba, lahko nastaneta dve neodvisni vrsti razponov;
uporabite instrumentacijski obseg `omniroute.log-export`, da ločite te razpone dnevnikov klicev.

| Ključ                    | Privzeto / namen                                                                            |
| ------------------------ | ------------------------------------------------------------------------------------------- |
| `endpoint`               | Zahtevan celoten URL sledenj HTTP(S); pripona `/v1/traces` ni dodana                        |
| `headers`                | Izbirne vrstice `Name: value` ali objekt JSON z nizi; šifrirano                             |
| `requestHeaderAllowlist` | Prazno (izklopljeno); imena/glave ali predpone glav odjemalca za zajem kot atributi razpona |
| `serviceName`            | `omniroute`; vir `service.name`                                                             |
| `langfuseMapping`        | `false`; doda atribute generiranja/seje/uporabnika Langfuse                                 |
| `identity`               | `pseudonymous`, `keyName` ali `none`                                                        |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                                     |
| `timeoutMs`              | `30000` na poskus HTTP                                                                      |
| `environment`            | Ni nastavljeno; izbirni `langfuse.environment`                                              |

Splošna nadzorna plošča izriše ta polja. `paths` sprejema polje API ali besedilno polje
z natančnimi potmi, ločenimi z novimi vrsticami/vejicami. Vdelave, prerangiranje in druge poti
so preskočene, razen če so izrecno dovoljene. Preskočene vrstice še vedno premaknejo kazalec naprej;
obstoječa števca `exported`/`exportedTotal` v izvajalniku štejeta obdelane izvorne vrstice,
vključno s filtriranimi vrsticami, ne pa sprejetih razponov. Filtriranje se izvede v podrejenem procesu,
ne da bi se spremenila pogodba IPC/kazalca.

Preverjanje URL-ja uporablja pomočnik `parseAndValidateNonMetadataUrl`, neodvisen od zbirke podatkov,
iz `src/shared/network/outboundUrlGuard.ts`: pravilnik `block-metadata`. Ima enaka
brezpogojna preverjanja metapodatkov/protokola/vdelanih poverilnic kot preverjevalnik spletnih kavljev,
pri čemer so zasebni URL-ji dovoljeni, vendar namerno dovoljuje cilje localhost/LAN brez globalne
preglasitve zastavice funkcije. To omogoča končne točke samostojno gostujočih storitev Langfuse,
Phoenix, Tempo in Collector, vključno z zasebnimi končnimi točkami HTTP. Gostitelji metapodatkov
v oblaku so vedno blokirani. Preusmeritve se ne upoštevajo, zato zbiralnik ne more preusmeriti
poverilnic na drugega gostitelja. Tako kot obstoječa leksikalna zaščita URL-jev tudi ta ne zaklene
razreševanja DNS; konfigurirajte samo gostitelje, ki jih nadzoruje upravljavec. Kadar končna točka
ni v zaupanja vrednem omrežju, raje uporabite HTTPS.

### Koristni tovor in dostava

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) vsebuje en
razpon CLIENT za vsako dovoljeno vrstico, poimenovan z njeno natančno potjo zahteve. Poimenovanje
poti razlikuje Chat Completions, Responses in Messages, ne da bi v ime razpona vključevalo podatke
o modelu ali identiteti. Atributi vira vključujejo `service.name` in `service.version` paketa.

Običajni zapisovalnik poskusov klepeta (`open-sse/handlers/chatCore/attemptLogging.ts`) ob zaključku zapiše
`duration = Date.now() - startTime` in ne posreduje časovnega žiga;
`saveCallLogOperation` v `src/lib/usage/callLogs.ts` privzeto nastavi časovni žig na čas pisanja
(zaključka). Izvoz zato nastavi konec na časovni žig vrstice, začetek pa na konec − trajanje
(milisekunde, pretvorjene v decimalne nanosekunde). Časovni žigi iz preteklosti, ki jih posreduje klicatelj,
se prav tako ohranijo kot čas konca; razlikovanje začetka/zaključka na ravni posamezne vrstice ne obstaja.
Vrednost null za trajanje se pretvori v nič. Neveljavni ali manjkajoči časovni žigi povzročijo napako
paketa, namesto da bi ustvarili nedeterministične razpone. `ttftMs` lahko vsebuje null in se preslika
v `omniroute.ttft_ms`.

Atributi vključujejo `gen_ai.operation.name="chat"`, ponudnika, zahtevani/odzivni model,
vhodne/izhodne žetone, izbirne žetone za branje predpomnilnika/ustvarjanje predpomnilnika/razmišljanje,
stanje HTTP, kombinacijo, vir predpomnilnika, oznako seje in ID korelacije. Celoštevilske vrednosti
OTLP in časovni žigi so decimalni nizi; nizi, logične vrednosti in ulomljena števila uporabljajo
svoje izvorne različice vrednosti OTLP. Razponi z napakami imajo stanje ERROR in očiščeno sporočilo
stanja. Kanonični zapis nima URL-ja gostitelja navzgor, zato je `server.address` izpuščen, namesto
da bi napačno identificiral zbiralnik kot strežnik modela. Strošek se ne izvaža.

Samo `includeBodies=true` naloži vsebino. Ko je `langfuseMapping=false`,
`gen_ai.input.messages` / `gen_ai.output.messages` vsebujejo očiščeno JSON-vsebino zahteve/odgovora,
kot jo je shranil OmniRoute (kanonizirano, če jo je mogoče razčleniti), ne pa preoblikovanega polja
sporočil semconv. Obrezane/ne-JSON-vsebine ostanejo neobdelano besedilo. Ko je
`langfuseMapping=true`, se telesa oddajo samo kot `langfuse.observation.input` /
`langfuse.observation.output`; atributi `gen_ai.*.messages` so izpuščeni, zato je vsako telo
poslano enkrat. Oba načina podedujeta `maxBodyBytes` iz obstoječe poti nalaganja;
`omniroute.bodies_truncated=true` označuje obrezovanje.
Ta cilj ne dodaja dodatnih posnetkov cevovoda ali branj nenasaniranih artefaktov;
izbirni zajem glav zahtev uporablja obstoječi posnetek odjemalca, opisan spodaj.
Pri izvozu teles uporabljajte minutno pogostost, na primer `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`,
namesto kopičenja urnega zaostanka.

### Izbirne glave zahtev odjemalca

Zajem glav je **privzeto izklopljen**. V konfiguraciji cilja nastavite `requestHeaderAllowlist`
in omogočite **Izvozi pozive in odgovore** (`includeBodies: true` na cilju).
Dovoljeni seznam sprejema polje API ali besedilno polje z imeni, ločenimi z novimi vrsticami/vejicami:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Imena se ujemajo ne glede na velikost črk in natančno, razen če ena sama končna `*` izbere neprazen predponi imena glave. Samostojni `*`, vdelane nadomestne znake in neveljavna imena glav HTTP zavrnemo.
Na voljo je največ 64 izbirnikov, pri čemer ima lahko vsak ime/predpono, dolgo največ 256 bajtov ASCII.
Ta nastavitev je ločena od nastavitve `headers`, ki izvoznika overi pri zbiralniku.

Zajem bere samo iz `pipeline_client_request`, ki se napolni iz shranjenega podrobnega cevovoda
`clientRawRequest` (ali starejšega `clientRequest`). Nikoli ne uporabi rezervnega vira v obliki glav zahtevka ponudnika.
Podrobno beleženje cevovoda mora biti omogočeno v času beleženja zahtevka. Če je
`includeBodies` onemogočen ali če JSON posnetka odjemalca manjka, je poškodovan ali okrnjen, se atributi glav ne oddajo. Povečanje `maxBodyBytes` lahko prepreči krajšanje posnetka med izvozom;
ne more pa obnoviti podrobnosti, ki niso bile nikoli shranjene. Posnetek, večji od 1 MiB ali vsebuje več kot
256 vnosov glav, se prezre. Obstoječi izvoz pozivov/odgovorov ostane omogočen skupaj z zajemom glav; seznam dovoljenih ne zagotavlja načina hidracije samo za glave.

Izbrane vrednosti postanejo polja nizov OTLP `http.request.header.<full lowercase header name>`,
tudi če gre za eno samo nizovno vrednost. Na primer, `X-OmniRoute-Meta-Team: example-team` postane
`http.request.header.x-omniroute-meta-team` z
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Celotna predpona se ohrani: to so običajne glave, brez razčlenjevanja poslovnih polj ali pretvorbe v
`omniroute.metadata.*` / metapodatke Langfuse. `langfuseMapping` ne spremeni semantike glav. Izbrana glava `User-Agent` z eno vrednostjo nastavi tudi standardno skalarno polje
`user_agent.original`. Vejice znotraj ene vrednosti se ne razdelijo. Različice velikosti črk se združijo v vrstnem redu shranjenih vnosov; če je katera koli različica neveljavna, se celotna glava izpusti. Atributi so razvrščeni po imenih v malih črkah.

Glave Authorization, Proxy-Authorization, Cookie, Set-Cookie in glave API-ključev, imena, ki vsebujejo označevalce
auth/token/secret/password/credential, ter notranje poverilnice prehoda so vedno izključene, tudi če so izbrane ali delno maskirane v shrambi. Znani vzorci poverilnic ponovno uporabijo skupni detektor poverilnic; oznake za redigiranje se izpustijo in se ne izvozijo kot varne vrednosti. Sprejmejo se samo nizi in neprazna polja nizov; številke ali predmeti se ne pretvorijo. Neveljavna imena, ključi prototipov, kontrolni znaki (razen vodoravnega tabulatorja) in nepravilno oblikovan Unicode se prezrejo, ne da bi paket spodletel ali da bi se njihova vsebina odražala v napakah.

Vsak razpon zajame največ 32 glav, 16 vrednosti na glavo, 4096 bajtov UTF-8 na vrednost in 16384 skupnih bajtov UTF-8 za imena in vrednosti zajetih glav. Prevelike/neveljavne glave se izpustijo v celoti, ne skrajšajo. Izbira je odločitev upravljavca glede zasebnosti: tudi na videz varna imena lahko vsebujejo osebne podatke, te omejitve in detektorji pa niso splošni čistilnik PII.

### Omejitve dostave

Zahtevki so omejeni na 500 razponov in 4 MiB JSON-a UTF-8, vključno z ovojnico.
Vsak dovoljen razpon se preveri glede velikosti pred prvim zahtevkom paketa kazalca. Posamezen
razpon, večji od omejitve, ne pošlje nobenega dela tega paketa in spodleti z navodilom za znižanje
`maxBodyBytes`; ne zavrže se tiho. Predhodno preverjanje ohrani samo sklice na zapise in števila bajtov ter zavrže vsak začasni razpon/JSON; razponi se znova sestavijo za omejene delčke, namesto da bi hranili drugo serializirano kopijo paketa. HTTP 408/429/5xx, omrežne napake in časovne omejitve dobijo največ
tri poskuse z eksponentnim umikom 250/500 ms. `Retry-After` v sekundah ali datumi HTTP
lahko podaljšajo zakasnitev do 5 sekund. Druga stanja povzročijo takojšnjo napako. Delna zavrnitev OTLP 2xx prav tako povzroči napako, namesto da bi potrdila izgubljeni razpon; prazne ali veljavne potrditve JSON se sprejmejo, omejitev branja odgovora pa je
64 KiB.

Napake vsebujejo samo dejstva, ki jih določa izvoznik: stanje HTTP, razred ponovnega poskusa, število poskusov in število poslanih razponov ali nespremenljivo besedilo za napako potrditve/omrežja. Telesa odgovorov zbiralnika,
števila delnih uspehov in glave odgovorov se nikoli ne kopirajo v napake, dnevnike ali nadzorno ploščo. Paket, ki ni uspel ali je bil delno sprejet, ni potrjen: cilj prikaže stanje
Failing s tem stanjem, kazalec ostane pri zadnjem potrjenem paketu, naslednji zagon pa
znova pošlje iste vrstice. Trajna stanja še naprej povzročajo napake, dokler zbiralnik ali konfiguracija
ni popravljena. Za podrobnosti o odgovorih uporabite lastne dnevnike zbiralnika. Ločeni povzetki napak dnevnika klicev ohranijo svoje redigiranje.
`prepare()` ne pripravi ničesar; Test objavi natanko `{"resourceSpans":[]}` in poroča
stanje HTTP, ne da bi zapisal razpone dnevnika klicev.

ID-ji sledi in ID-ji razponov so prvih 32 oziroma 16 šestnajstiških števk SHA-256 nad
`"omniroute.trace\\0" + callLogId` in `"omniroute.span\\0" + callLogId`. Ponovna pošiljanja imajo
enake ID-je. To ni zagotovilo za preprečevanje podvajanja: nekatera zaledja, vključno z vnosom Langfuse
v4, ne odstranjujejo podvojenih razponov z istim ID-jem. Zrušitev ali napaka delnega delčka lahko
znova pošlje največ en nepotrjen paket kazalca; celoten ta paket se lahko podvoji,
ne le njegov zadnji del HTTP. Velikost paketa kazalca izberite ob upoštevanju tega kompromisa.

### Primer Langfuse

Za samostojno gostujoči primerek Langfuse konfigurirajte ta polja:

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

Vrednost Authorization lokalno sestavite kot Base64 dobesednega niza `public-key:secret-key`
(na primer z `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Pravih poverilnic ne prilepite v dnevnike, posnetke zaslona ali poročila o težavah. Preslikava samodejno
nastavi `x-langfuse-ingestion-version: 4`; Authorization je še vedno naveden v `headers`.
Glave in ustvarjena sol identitete uporabljajo obstoječi mehanizem šifriranih polj skrivnosti ter nadomestne oznake API; zahtevan je `STORAGE_ENCRYPTION_KEY`.

Preslikava doda vrsto generiranja/model, podrobnosti o uporabi JSON-a (vhod/izhod/skupaj in razpoložljivi
ključi predpomnilnika), posnetke vhodnih/izhodnih podatkov JSON, raven ERROR/DEFAULT, očiščeno
statusno sporočilo, ime sledi, ID seje, izbirno okolje in filtrirni
`langfuse.observation.metadata.<key>` za ponudnika, zahtevani model, pot, kombinacijo, vir predpomnilnika
in stanje. `langfuse.observation.completion_start_time` je v zapisu ISO 8601 ob
začetku + TTFT samo, kadar je TTFT znan in znotraj trajanja. Atributi stroškov se ne pošiljajo.

Načini identitete veljajo za `langfuse.user.id`:

- `pseudonymous` (privzeto): HMAC-SHA256 notranjega ID-ja ključa API z naključno
  32-bajtno soljo za posamezni cilj. Sol se ob ustvarjanju ustvari, če manjka, šifrira
  kot `identitySalt`, se nikoli ne vrne in se ohrani pri urejanju. Surovi ID-ji ključev se
  nikoli ne zapišejo v atribute razponov. Ponovno ustvarjanje/zamenjava soli cilja spremeni identitete.
- `keyName`: konfigurirano ime ključa API, kar namerno razkrije to oznako upravljavca.
- `none`: brez ID-ja uporabnika. Oznake sej se še vedno izvozijo, kadar so prisotne; ti načini
  ne anonimizirajo poljubne vsebine pozivov ali oznak sej/komunikacije, ki jih vnese upravljavec.

### Začetek brez dopolnitve

Samo ob ustvarjanju omogočite **Začni s trenutnim položajem (preskoči obstoječe dnevnike)** ali na najvišji ravni
tovora API-ja za ustvarjanje posredujte `startFromCurrentPosition: true`. To inicializira
`cursor_row_id` na trenutno največjo ohranjeno vrednost rowid dnevnika klicev z uporabo obstoječih
pomožnih funkcij kazalca, brez migracije. Privzeta vrednost je false (kazalec 0 in dopolnitev ohranjene zgodovine).
To ni nastavitev za ponastavitev kazalca ob posodobitvi.

Skupna razširitev `ttftMs` doda tudi stolpec nullable `ttft_ms` v preslikovalnik BigQuery
in shemo nove tabele: njen preizkus sheme zahteva, da ima vsako polje kanoničnega zapisa svoj
stolpec. Obstoječe tabele še naprej izvažajo nespremenjeno: `prepare()` prebere shemo tabele
in izpusti samo `ttft_ms`, kadar ta stolpec manjka. Dodajte stolpec nullable INT64, da dobite TTFT
pri naslednjem zagonu, ali uporabite novo tabelo. Izbirni stolpec TTFT ne sproži posodobitve sheme. Stolpci z dokazi o uporabi
sledijo spodnjemu pogojnemu združljivostnemu postopku z izrecno vključitvijo; druga polja vrstic ohranjajo strogo
preverjanje sheme.

---

## 6. Dodajanje cilja

1. Ustvarite `src/lib/logExport/destinations/<name>.ts`, ki izvaža `LogExportDestinationType`:
   Zodov `configSchema`, polje opisnikov `fields` za uporabniški vmesnik, `secretFields` in
   `createClient(config)`, ki vrne `test()` / `prepare()` / `send(records)`.
2. Dodajte ga v polje `DESTINATIONS` v `src/lib/logExport/registry.ts`.
3. Napišite teste v `tests/unit/`.

To je celotna sprememba: trajno shranjevanje, opravilo cron, plast REST, šifriranje skrivnosti in
obrazec na nadzorni plošči vsi berejo register.

Dve pravili za nov cilj:

- `send()` **mora sprožiti izjemo** ob delnem neuspehu. Uspešen zaključek pomeni »cilj ima te vrstice«,
  kazalec pa se trajno premakne mimo njih.
- Cilj, ki sprejema URL, ki ga vnese uporabnik, ga mora pred pridobivanjem podatkov preveriti z
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`),
  enako kot webhooki. BigQuery tega ne potrebuje: njegovi gostitelji so konstante.

---

## 7. Uporaba

- **Nadzorna plošča**: Integrations → Log export. Dodajte cilj, za preverjanje poverilnic zaženite
  **Preizkusi**, ne da bi zapisovali vrstice, nato pa ga omogočite.
- **Zaostanek**: kartica vsakega cilja prikazuje čakajoče vrstice in kazalec; `GET
/api/log-export/status` vrne enake podatke ter zadnjih 20 zagonov opravil.
- **Napaka enega cilja ne povzroči napake pri drugih** — povzetek zagona zabeleži stanje za posamezen cilj
  v `last_status` / `last_error`, zgodovina zagonov opravil pa ohrani skupni rezultat.
- **Brisanje cilja izbriše njegov kazalec.** Če ga znova dodate, se začne pri najstarejšem ohranjenem
  dnevniku klicev, zato se znova pošljejo vrstice, ki jih cilj morda že vsebuje. V BigQueryju `insertId`
  to prepreči le v okviru lastnega okna za odstranjevanje dvojnikov v BigQueryju, zato je bolje cilj
  onemogočiti, kot ga izbrisati.

### Združljivost sheme dokazov o uporabi

Nove tabele BigQuery vključujejo nullable `usage_evidence` (STRING, ki vsebuje JSON) in
`usage_estimated` (BOOL). Ko je omogočen `autoCreate`, lahko obstoječa tabela prejme
samo te manjkajoče nullable stolpce. Izvoznik ohrani celotno obstoječo shemo, vključno z metapodatki polj,
in pošlje pogojni PATCH z uporabo vrnjenega etag. Sočasna sprememba sheme povzroči neuspeh izvoza,
namesto da bi jo prepisala; pri naslednjem zagonu se tabela znova prebere.

Ko je `autoCreate` onemogočen, morate te stolpce dodati sami, preden izvozite zapise z dokazi o uporabi.
Manjkajoči metapodatki sheme/etag ali neuspešna posodobitev prav tako preprečijo vstavljanja z dokazi.
Kazalec izvoza se ob takšni napaki ne premakne naprej in dokazi niso nikoli tiho zavrženi.
Lokalno ohranjanje dnevnikov še vedno velja, ko je izvoz blokiran, zato napako odpravite, preden poteče
rok hrambe izvornih vrstic.
