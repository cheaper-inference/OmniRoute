# Log export (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Kontinuerlig, trinnvis eksport av OmniRoute-anropslogger til et eksternt analyselager.

Fanen Logger i kontrollpanelet lagrer forespørselshistorikken i SQLite (`call_logs`), som er begrenset av
rotasjon og oppbevaring. Loggeksport sender det samme postsettet ut etter en tidsplan, slik at det kan bevares
lenger enn den lokale databasen og kobles sammen med andre data. BigQuery er den første destinasjonen;
pipelinens register gjør det enkelt å legge til flere destinasjoner.

---

## 1. Slik fungerer det

```
server (dekrypter + valider konfigurasjon, avstem markør)
  → start IPC → isolert exportChild-OS-prosess
    → skrivebeskyttet storage.sqlite → delt spørring/tilordning for anropslogg
      → asynkron innlasting av artefakter → mål prepare()/send()
        → satsvis IPC → server lagrer markør → bekreftelses-IPC
          → neste sats; ferdig-IPC → server registrerer suksess
```

- **Tidsplan** — én `JobRegistry`-cronjobb, `log_export`, med `0 * * * *` som standard (hver time,
  UTC). Registrert i `src/lib/initCloudSync.ts`; kan overstyres med `OMNIROUTE_LOG_EXPORT_CRON`.
  Hver kjøring tømmer alle **aktiverte** mål, sekvensielt.
- **Markør** — SQLites implisitte `call_logs.rowid`, lagret per mål i
  `log_export_destinations.cursor_row_id`. `timestamp` brukes bevisst ikke som markør: kallere
  kan angi sin egen verdi, slik at en treg forespørsel kan bli skrevet etter en raskere forespørsel
  som startet senere, og en tidsstempelmarkør ville hoppet over den.
- **Satsvis behandling** — `batch_size` rader per forespørsel (standard 500), `max_rows_per_run`
  rader per kjøring (standard 10000), slik at et stort etterslep tømmes over flere kjøringer i
  stedet for å blokkere én.
- **Levering** — markøren flyttes fremover bare etter at `send()` er fullført. En mislykket sats
  lar markøren bli stående, slik at de samme radene forsøkes på nytt ved neste kjøring. Garantien
  er minst én gang pluss deduplisering på målsiden, ikke reell nøyaktig én gang: BigQuery bruker
  anropslogg-ID-en som nøkkel for hver rad, noe den overholder etter beste evne innenfor sitt eget
  dedupliseringsvindu.
- **Beskyttelse mot overlapp** — cron-kjøringen og `POST .../run` kan utløses samtidig. Et mål
  som allerede tømmes, hoppes over i stedet for å tømmes to ganger (`skipped: true` i
  kjøringsresultatet), slik at en samtidig kjøring ikke kan sende en sats på nytt eller skrive
  markøren bakover.
- **Gjenoppretting etter tømming** — hvis `cursor_row_id` ender over `MAX(rowid)` (hele tabellen
  ble tømt og rad-ID-ene startet på nytt), tilbakestiller kjøreren markøren til 0 i stedet for å
  bli permanent ute av stand til å oppdage nye rader.

### Isolert kjører og grenser

Hver målkjøring på Node starter en separat, kortlivet underprosess i operativsystemet
(`child_process` med IPC, ikke `worker_threads`). Lesing av innhold, JSON-parsing/-serialisering
av nyttelast, målets `prepare()` og målets nettverks-I/O kjøres der, ikke i serverens hendelsessløyfe.
Bare konfigurasjon og små fremdriftsmeldinger sendes over IPC; eksporterte oppføringer returneres
aldri til serveren. Cronjobben og Kjør nå-ruten beholder det samme offentlige resultatet og den
samme beskyttelsen mot overlapp.

Underprosessen åpner serverens løste `DATA_DIR/storage.sqlite` skrivebeskyttet med `node:sqlite`,
med `busy_timeout=5000` og `query_only=ON`. Den importerer ingen DB-singleton og utfører ingen
migreringer, sikkerhetskopier eller SQLite-oppdateringer. Bokføring av manglende/skadede artefakter
(inkludert UPDATE-operasjonen for skadede artefakter) finnes fortsatt bare i detaljvisningen i
dashbordet. Begge banene deler en ren detaljløser; eksport bruker asynkron lesing fra filsystemet
og samme rekkefølge for oppslag: artefakt → eldre innebygd → eldre disk → ingen. En kjøring tar et
øyeblikksbilde av høyeste innsettings-rowid når underprosessen åpner leseren; senere innsettinger
venter til neste kjøring. Dette er en innsettingsgrense, ikke en langvarig SQLite-transaksjon:
WAL-skrivere og kontrollpunkter forblir frie under nettverksventing. Oppdateringer/slettinger av
eksisterende rader fryses ikke av denne grensen.

Etter hver godtatte sats venter underprosessen på en bekreftelse. Serveren lagrer først markøren
med `advanceLogExportCursor` og sender deretter `ack`; ingen ny sats starter før dette.
En sendefeil, krasj eller tidsavbrudd registrerer en feil uten å flytte markøren fremover for
den aktuelle satsen. Tidligere bekreftede satser forblir lagret; maksimalt den ene ubekreftede
satsen kan sendes på nytt. Suksess registreres bare etter `done` og en ren avslutning av
underprosessen. Ved feil avsluttes underprosessen med SIGTERM, som eskaleres til SIGKILL etter
500 ms, og kjøreren venter til prosessen er lukket.

| Miljøvariabel                                 | Standard | Formål                             |
| --------------------------------------------- | -------- | ---------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000   | Tidsgrense per mål i veggklokketid |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024     | V8-grense for gammelt område i MB  |

Ugyldige, ikke-positive eller ikke-heltallige verdier bruker standardverdiene. Heap-innstillingen
er ikke en grense for samlet RSS; svært store satser kan fortsatt bruke opp underprosessens minne
og føre til at kjøringen feiler på en trygg måte. Standardverdien på 1024 MB gir rom for standardsatsen
på 500 rader med artefakter på 512 KiB og innhold aktivert, inkludert BigQuery sin byteinndelte
JSON-serialisering. Den gjør ikke en sats på 10000 rader med innhold trygg. Uttømming av V8-heapen
registrerer en feil med et tydelig tiltak: reduser satsstørrelsen eller øk
`OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; markøren blir stående ved den sist bekreftede satsen.
Historisk innebygd innhold eller innhold på disk omfattes ikke av den moderne artefaktgrensen.
Operatører må budsjettere RSS separat, spesielt i beholdere med minnebegrensning.

Underprosessen arver bare den løste `DATA_DIR`, `NODE_ENV`, eksplisitt `TZ` (lokal tidsoppløsning
for eldre filnavn), `ELECTRON_RUN_AS_NODE` når den finnes, og følgende inndata for utgående trafikk:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (og variantene med små bokstaver),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
En global Undici-dispatcher deler serverens rene miljøbaserte proxyoppløsning og regler for å
omgå proxyen for lokale verter, inkludert `NO_PROXY`; den importerer ikke `proxyFetch.ts` eller
tilhørende DB-/funksjonsflagg. Proxy-legitimasjon sladdes i videresendt utdata og registrerte feil.
Mållegitimasjon sendes bare i én startmelding over IPC, aldri i argv eller miljøet; videresending
av utdata/feil får prefiks og renses. Bare `ExperimentalWarning` deaktiveres i underprosessens
exec-argumenter for å unngå å gjenta Nodes SQLite-advarsel ved hver cron-kjøring; andre typer
advarsler forblir synlige.

Destinasjonsmoduler må kunne importeres uten avhengigheter til Next.js eller server-only. Den eksisterende
BigQuery-implementasjonen oppfyller allerede denne kontrakten. Tilgangstokenbufre varer bare under
den underordnede kjøringen, ikke på tvers av kjøringer. Node er den støttede kjøretiden (`package.json` engines), men READMEs
installasjonsdel for Bun og `Dockerfile.bun` annonserer også en kompatibilitetsbane for produksjon som bruker
`bun:sqlite` (`src/lib/db/core.ts` / adaptere). Under Bun beholder eksportene derfor den tidligere
prosesseringsbanen i samme prosess og sender et engangsvarsel: isolasjon av underprosessens heap/minne og tidsavbrudd er utilgjengelig. Bruk
Node for isolasjon av hendelsesløkken og OOM; Bun behandles ikke som kun for utvikling her.

Når `includeBodies` er aktivert, bør du foretrekke en frekvens på minuttnivå, for eksempel
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, fremfor å akkumulere et etterslep med nyttelaster over en hel time.
Grenser for både bunker og rader begrenser fortsatt hver kjøring. Prosessoppstart skjer per destinasjon per kjøring;
dette bytter en liten oppstartskostnad mot isolasjon av serverens hendelsesløkke, ikke redusert samlet CPU-bruk.

### Nyttelaster (ledetekster og fullføringer)

Som standard inneholder eksporten bare sammendragsfeltene som **listen** i Logger viser. Hvis du slår på
**Eksporter ledetekster og svar** (`includeBodies`), sendes i tillegg det som **detaljvisningen** i Logger
viser for hvert anrop:

| Felt                             | Hva det inneholder                                            |
| -------------------------------- | ------------------------------------------------------------- |
| `request_body` / `response_body` | Nyttelastene for anropet slik kontrollpanelet gjengir dem     |
| `pipeline_route_decision`        | Hvilket mål og hvilken modell ruteren valgte                  |
| `pipeline_client_request`        | Den rå forespørselen nøyaktig slik klienten sendte den        |
| `pipeline_openai_request`        | Etter oversettelse til den interne OpenAI-formen              |
| `pipeline_provider_request`      | Slik den faktisk ble sendt oppstrøms, i leverandørens dialekt |
| `pipeline_provider_response`     | Det rå svaret fra oppstrømskilden                             |
| `pipeline_client_response`       | Det som ble returnert til anroperen                           |
| `pipeline_error`                 | Feildetaljer på pipeline-nivå for et mislykket anrop          |
| `bodies_truncated`               | Sann når et av feltene ovenfor nådde `maxBodyBytes`           |

Dette er innhold fra ledetekster, så det er **av som standard** og er bevisst et valg per destinasjon.
Det som sendes, er det kontrollpanelet viser, fordi eksporten og `getCallLogById` deler
detaljoppløsning: nyttelastene er
allerede PII-sanitert og hemmeligheter er fjernet når de skrives, og et anrop utført med en
`noLog`-API-nøkkel lagrer ingen nyttelast i det hele tatt, så det finnes ingenting å eksportere.

Nyttelaster leses per rad fra filsystemartefakten, så hydrering kjøres bare for destinasjoner
som har bedt om det. Hvis en artefakt mangler eller er skadet, eksporteres sammendraget med nullverdier for nyttelastene,
fremfor at bunken mislykkes og markøren blir stående fast.

`maxBodyBytes` (standardverdi 262144) begrenser hvert felt. Lengre nyttelaster blir **avkortet fremfor
forkastet** — en avkortet ledetekst svarer fortsatt på «hva ble spurt om» — og raden merkes med
`bodies_truncated`. Strømmede deltaer stykke for stykke eksporteres ikke; det sammensatte svaret finnes
allerede i `pipeline_provider_response` og `pipeline_client_response`.

---

## 2. Filer

| Del                       | Plassering                                   |
| ------------------------- | -------------------------------------------- |
| Destinasjonskontrakt      | `src/lib/logExport/types.ts`                 |
| Register                  | `src/lib/logExport/registry.ts`              |
| Hemmelighetshåndtering    | `src/lib/logExport/secrets.ts`               |
| Kjører (overordnet IPC)   | `src/lib/logExport/runner.ts`                |
| Prosesslivssyklus         | `src/lib/logExport/childRunner.ts`           |
| Underordnet inngangspunkt | `src/lib/logExport/exportChild.ts`           |
| Skrivebeskyttet åpner     | `src/lib/db/logExportReadOnly.ts`            |
| Delt spørring/tilordning  | `src/lib/usage/callLogExportQueries.ts`      |
| Detaljoppløser            | `src/lib/usage/callLogDetailResolver.ts`     |
| API-projeksjon            | `src/lib/logExport/presenter.ts`             |
| BigQuery-destinasjon      | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA-autentisering   | `src/lib/logExport/googleServiceAccount.ts`  |
| Anropsloggkilde           | `src/lib/usage/callLogExportSource.ts`       |
| Persistens                | `src/lib/db/logExportDestinations.ts`        |
| Cron-jobb                 | `src/lib/jobs/logExportJob.ts`               |
| REST-lag                  | `src/app/api/log-export/`                    |
| Dashboardside             | `src/app/(dashboard)/dashboard/log-export/`  |

Skjema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST-API

Alle rutene er autentisert for administrasjon (`requireManagementAuth`). Hemmeligheter returneres aldri:
En lagret hemmelighet returneres som den bokstavelige verdien `__stored__`, og hvis denne verdien sendes tilbake i en oppdatering,
beholdes den lagrede legitimasjonen.

Opprettelse eller oppdatering av en destinasjon med en type som deklarerer en hemmelighet, **krever
`STORAGE_ENCRYPTION_KEY`**. Uten denne er `encrypt()` en stille passthrough, så skrivingen
avvises med 400 i stedet for å lagre legitimasjon i SQLite som klartekst (samme beskyttelse som
Telegram-webhooken bruker).

| Metode   | Bane                                     | Formål                                               |
| -------- | ---------------------------------------- | ---------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Destinasjonstyper + listen over konfigurasjonsfelter |
| `GET`    | `/api/log-export/destinations`           | Vis destinasjoner (hemmeligheter skjult)             |
| `POST`   | `/api/log-export/destinations`           | Opprett en destinasjon                               |
| `GET`    | `/api/log-export/destinations/{id}`      | Les én                                               |
| `PUT`    | `/api/log-export/destinations/{id}`      | Oppdater navn / aktivert / konfigurasjon / batching  |
| `DELETE` | `/api/log-export/destinations/{id}`      | Slett                                                |
| `POST`   | `/api/log-export/destinations/{id}/test` | Test legitimasjon uten å skrive noe                  |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Tøm nå, samme flyt som den planlagte kjøringen       |
| `GET`    | `/api/log-export/status`                 | Cron-status, nylige kjøringer, etterslep per mål     |

`GET /api/log-export/types` er det som gjør brukergrensesnittet generisk: kontrollpanelskjemaet gjengis fra
de returnerte feltbeskrivelsene, slik at en ny destinasjon ikke krever noen endring i brukergrensesnittet.

---

## 4. BigQuery-destinasjon

Konfigurasjonsnøkler (`type: "bigquery"`):

| Nøkkel               | Merknader                                                                |
| -------------------- | ------------------------------------------------------------------------ |
| `projectId`          | GCP-prosjektet som inneholder datasettet                                 |
| `datasetId`          | `[A-Za-z0-9_]+`                                                          |
| `tableId`            | `[A-Za-z0-9_]+`                                                          |
| `location`           | Brukes bare når datasettet må opprettes (standardverdi `EU`)             |
| `serviceAccountJson` | Tjenestekontonøkkel. Hemmelighet: kryptert ved lagring, returneres aldri |
| `autoCreate`         | Opprett datasettet og tabellen ved første eksport (standardverdi `true`) |

Tjenestekontoen trenger `bigquery.tables.updateData` på måltabellen, i tillegg til
`bigquery.datasets.create` / `bigquery.tables.create` når `autoCreate` er slått på.

En konfigurert batch er en **markørenhet**, ikke en HTTP-enhet: `send()` deler den opp i insertAll-kall
med maksimalt 500 rader, slik at en stor `batch_size` ikke kan utløse BigQuery-grensen på 10 MB per forespørsel.
Midlertidige statuser (408/429/500/502/503/504) forsøkes på nytt opptil tre ganger med eksponentiell
ventetid, med gjenbruk av de samme insertIds-verdiene. Autentiserings- og skjemafeil kaster ved første forsøk i stedet
for å sløse bort kjøringen.

En tabell som ble opprettet for bare noen øyeblikk siden, er ennå ikke synlig for strømmingsendepunktet, som svarer
med 404 i noen sekunder. Denne 404-feilen forsøkes på nytt, men **bare når denne kjøringen opprettet tabellen** —
en tabell som faktisk mangler, feiler fortsatt umiddelbart. Merk at hvis en tabell opprettes på nytt under et navn som
nylig ble slettet, vil BigQuery avvise strømmingsinnsettinger i flere minutter. Dette er en
egenskap ved slett-og-opprett-på-nytt, så bruk helst et nytt tabellnavn fremfor å slette og legge til den samme på nytt.

**En delvis feil returneres som HTTP 200 med en ikke-tom `insertErrors[]`.** Dette behandles som
en feil og kaster et unntak, slik at markøren ikke flyttes forbi rader som BigQuery aldri
godtok. `tests/unit/log-export-bigquery.test.ts` låser denne oppførselen.

Transporten bruker ren REST — en selvsignert RS256-påstand byttes mot et tilgangstoken på
`https://oauth2.googleapis.com/token`, og deretter sendes radene til `tabledata.insertAll`. Ingen Google-SDK
inkluderes. Tilgangstokener bufres i prosessen per (tjenestekonto, omfang).

Den opprettede tabellen har én kolonne per felt i Logger-fanen samt `exported_at`, og er strukturert etter
hvordan anropslogger faktisk blir spurt mot:

- **Dagspartisjonert på `timestamp`**, slik at en spørring avgrenset etter dato bare skanner disse dagene.
- **Klynget etter `api_key_name`, `provider`, `model`, `status`** (i den rekkefølgen), slik at filtrering etter
  hvem som kjørte den, hvor den ble sendt, eller om den feilet, utelater blokker i hver partisjon. BigQuery
  tillater maksimalt fire klyngekolonner, og rekkefølgen er viktig: Et filter bare på `api_key_name`
  utelater blokker, mens et filter bare på `status` ikke gjør det.
- **Valgfri oppbevaringstid for partisjoner** via `partitionExpirationDays` (0 beholder alt), brukt
  når tabellen opprettes.

Begge innstillingene gjelder på opprettelsestidspunktet. En eksisterende tabell beholder oppsettet den allerede har, så
pek destinasjonen mot en ny tabell-ID hvis du vil ta dem i bruk.

`tests/unit/log-export-bigquery.test.ts` kontrollerer at mapperen og tabellskjemaet forblir
synkronisert, slik at en ny kolonne i anropsloggen ikke kan utelates i det stille under eksporten.

Bunker deles opp etter **både** antall rader og serialiserte byte. Antall rader alene er ikke nok
når nyttelaster eksporteres: 500 rader med prompter kan utgjøre flere titalls megabyte, og insertAll
avviser en forespørsel på over 10 MB. Hver del avsluttes ved 500 rader eller 9 MB, avhengig av hva som inntreffer først.

---

## 5. OTLP/HTTP-destinasjon for spor

Konfigurasjonen bruker `type: "otlp-http"`. Dette er en planlagt eksport av lagrede
kalllogger med markørbasert fremdrift, ikke sanntidsmottakeren for rutingshendelser med
best mulig levering i `open-sse/services/routing/otel.ts`. Den leser eller endrer ikke mottakerens miljøvariabler,
tidtakere eller buffere. Hvis begge aktiveres, kan det produseres to uavhengige typer spenn;
bruk instrumenteringsomfanget `omniroute.log-export` for å skille ut disse kallloggspennene.

| Nøkkel                   | Standardverdi / formål                                                           |
| ------------------------ | -------------------------------------------------------------------------------- |
| `endpoint`               | Påkrevd fullstendig HTTP(S)-URL for spor; suffikset `/v1/traces` legges ikke til |
| `headers`                | Valgfrie `Name: value`-linjer eller JSON-objekt med strenger; kryptert           |
| `requestHeaderAllowlist` | Tom (av); klientheadernavn/-prefikser som skal registreres som spennattributter  |
| `serviceName`            | `omniroute`; ressursens `service.name`                                           |
| `langfuseMapping`        | `false`; legger til Langfuse-attributter for generering/økt/bruker               |
| `identity`               | `pseudonymous`, `keyName` eller `none`                                           |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                          |
| `timeoutMs`              | `30000` per HTTP-forsøk                                                          |
| `environment`            | Ikke angitt; valgfri `langfuse.environment`                                      |

Det generiske dashbordet viser disse feltene. `paths` godtar en API-matrise eller et tekstområde
med nøyaktige stier atskilt med linjeskift/kommaer. Embeddings, rerank og andre stier
hoppes over med mindre de er eksplisitt tillatt. Rader som hoppes over, flytter likevel markøren fremover; den eksisterende
kjørerens tellere `exported`/`exportedTotal` teller behandlede kilderader, inkludert filtrerte
rader, fremfor aksepterte spenn. Filtrering utføres i underprosessen uten å endre
IPC-/markørkontrakten.

URL-validering bruker den DB-frie hjelpefunksjonen `parseAndValidateNonMetadataUrl` fra
`src/shared/network/outboundUrlGuard.ts`: policyen `block-metadata`. Den har de samme
ubetingede kontrollene av metadata/protokoll/innebygd påloggingsinformasjon som webhook-validatoren med
private URL-er aktivert, men tillater bevisst localhost-/LAN-mål uten en global
overstyring via funksjonsflagg. Dette tillater selvdriftede Langfuse-, Phoenix-, Tempo- og Collector-endepunkter,
inkludert private HTTP-endepunkter. Verter for skymetadata blokkeres alltid.
Omdirigeringer følges ikke, så en collector kan ikke omdirigere påloggingsinformasjon til en annen vert.
I likhet med den eksisterende leksikalske URL-kontrollen låser dette ikke DNS-oppslaget; konfigurer bare
verter som operatøren kontrollerer. Foretrekk HTTPS når endepunktet ikke er på et betrodd nettverk.

### Nyttelast og levering

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) inneholder ett
CLIENT-spenn per tillatte rad, navngitt etter den nøyaktige forespørselsstien. Stibasert navngivning skiller
Chat Completions, Responses og Messages uten å bygge inn modell- eller identitetsdata i
spennnavnet. Ressursattributter inkluderer `service.name` og pakkens `service.version`.

Den vanlige loggeren for chatforsøk (`open-sse/handlers/chatCore/attemptLogging.ts`) skriver
`duration = Date.now() - startTime` ved fullføring og oppgir ikke noe tidsstempel;
`saveCallLogOperation` i `src/lib/usage/callLogs.ts` setter som standard tidsstempelet til skrive-
(fullførings)tidspunktet. Eksporten setter derfor slutt = radens tidsstempel og start = slutt − varighet
(millisekunder, konvertert til desimale nanosekunder). Historiske tidsstempler oppgitt av
den kallende parten bevares også som sluttidspunkt; det finnes ingen markør per rad som skiller start fra fullføring.
En nullverdi for varighet blir null. Ugyldige/manglende tidsstempler fører til at hele partiet feiler, i stedet for å opprette
ikke-deterministiske spenn. `ttftMs` kan være null og tilordnes `omniroute.ttft_ms`.

Attributtene inkluderer `gen_ai.operation.name="chat"`, leverandør, forespurt modell/responsmodell,
inndata-/utdatatokener, valgfrie tokener for hurtigbufferlesing/hurtigbufferoppretting/resonnering, HTTP-status,
combo, hurtigbufferkilde, øktetikett og korrelasjons-ID. OTLP-heltallsverdier og tidsstempler
er desimalstrenger; strenger, boolske verdier og desimaltall bruker sine opprinnelige OTLP-verdivarianter.
Feilspenn har ERROR-status og en renset statusmelding. Den kanoniske
oppføringen har ingen URL til oppstrømsverten, så `server.address` utelates i stedet for feilaktig
å identifisere collectoren som modellserveren. Kostnad eksporteres ikke.

Bare `includeBodies=true` laster inn innhold. Med `langfuseMapping=false`
inneholder `gen_ai.input.messages` / `gen_ai.output.messages` den rensede JSON-teksten fra forespørsels-/responskroppen
slik den er lagret av OmniRoute (kanonisert når den kan parses), ikke en omformet semconv-meldingsmatrise.
Avkortede kropper / kropper som ikke er JSON, forblir råtekst. Med `langfuseMapping=true`
sendes kropper bare som `langfuse.observation.input` / `langfuse.observation.output`;
attributtene `gen_ai.*.messages` utelates slik at hver kropp sendes én gang. Begge modusene
arver `maxBodyBytes` fra den eksisterende innlastingsflyten;
`omniroute.bodies_truncated=true` markerer avkorting.
Denne destinasjonen legger ikke til ekstra øyeblikksbilder av prosesseringskjeden eller lesing av urensede artefakter;
valgfri registrering av forespørselsheadere bruker det eksisterende innlastede klientøyeblikksbildet som beskrives nedenfor.
Bruk et intervall på minuttnivå, for eksempel `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, når du eksporterer
kropper, i stedet for å samle opp en times etterslep.

### Valgfrie headere fra klientforespørsler

Registrering av headere er **av som standard**. Angi `requestHeaderAllowlist` i destinasjonskonfigurasjonen
og aktiver **Eksporter ledetekster og svar** (`includeBodies: true` på destinasjonen).
Tillatelseslisten godtar en API-matrise eller et tekstområde med navn atskilt med linjeskift/kommaer:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Navn matches nøyaktig uten hensyn til store og små bokstaver, med mindre én avsluttende `*` velger et ikke-tomt
prefiks for headernavn. En frittstående `*`, innebygde jokertegn og ugyldige HTTP-headernavn avvises.
Det kan være høyst 64 selektorer, hver med et navn/prefiks på høyst 256 ASCII-byte.
Denne innstillingen er atskilt fra `headers`, som autentiserer eksportøren overfor innsamleren.

Innsamlingen leser bare `pipeline_client_request`, som fylles fra den lagrede detaljerte pipelinens
`clientRawRequest` (eller eldre `clientRequest`). Den faller aldri tilbake på leverandørens forespørselsheadere.
Detaljert pipelinelogging må ha vært aktivert da forespørselen ble registrert. Når
`includeBodies` er deaktivert, eller JSON for klientøyeblikksbildet mangler, er skadet eller avkortet, sendes ingen headerattributter
ut. Å øke `maxBodyBytes` kan forhindre avkorting av øyeblikksbildet ved eksport;
det kan ikke gjenopprette detaljer som aldri ble lagret. Et øyeblikksbilde på over 1 MiB eller med mer enn
256 headeroppføringer ignoreres. Den eksisterende eksporten av prompt/svar forblir aktivert sammen med
headerinnsamling; tillatelseslisten gir ingen hydreringsmodus for bare headere.

Valgte verdier blir OTLP-strengarrayer med navnet `http.request.header.<full lowercase header name>`,
selv for én enkelt streng. For eksempel blir `X-OmniRoute-Meta-Team: example-team` til
`http.request.header.x-omniroute-meta-team` med
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Hele prefikset bevares: Dette er vanlige headere, uten parsing av forretningsfelt eller
konvertering til `omniroute.metadata.*` / Langfuse-metadata. `langfuseMapping` endrer ikke headernes
semantikk. En valgt `User-Agent` med én enkelt verdi setter også den standardiserte skalarverdien
`user_agent.original`. Kommaer innenfor én verdi brukes ikke til oppdeling. Varianter med ulik bruk av store og små bokstaver slås sammen i lagret
oppføringsrekkefølge; enhver ugyldig variant fører til at hele headeren utelates. Attributter sorteres etter navn i små bokstaver.

Authorization, Proxy-Authorization, Cookie, Set-Cookie, API-nøkkelheadere, navn som inneholder
markørene auth/token/secret/password/credential, og intern påloggingsinformasjon for gatewayen blir alltid
utelatt, selv om de er valgt eller delvis maskert i lagringen. Kjente mønstre for påloggingsinformasjon gjenbruker
den delte detektoren for påloggingsinformasjon; sladdingsmarkører utelates og eksporteres ikke som trygge verdier.
Bare strenger og ikke-tomme strengarrayer godtas; tall og objekter konverteres ikke automatisk.
Ugyldige navn, prototypenøkler, kontrolltegn (unntatt horisontal tabulator) og ugyldig Unicode
ignoreres uten at kjøringen feiler eller innholdet gjengis i feilmeldinger.

Hvert spenn samler inn høyst 32 headere, 16 verdier per header, 4096 UTF-8-byte per verdi,
og totalt 16384 UTF-8-byte for innsamlede headernavn og verdier. For store eller ugyldige headere
utelates i sin helhet og avkortes ikke. Utvelgelsen er en personvernvurdering som operatøren må gjøre: Navn som ser trygge ut,
kan fortsatt inneholde personopplysninger, og disse grensene/detektorene er ikke et generelt verktøy for fjerning av personopplysninger.

### Leveringsgrenser

Forespørsler er begrenset til 500 spenn og 4 MiB UTF-8-JSON, inkludert konvolutten.
Størrelsen på hvert tillatte spenn kontrolleres før den første forespørselen i en markørpulje. Et enkelt
spenn som er større enn grensen, fører til at ingen del av puljen sendes, og feiler med veiledning om å redusere
`maxBodyBytes`; det blir ikke forkastet uten varsel. Forhåndskontrollen beholder bare postreferanser og
byteantall og forkaster hvert midlertidige spenn/JSON-objekt; spenn bygges opp på nytt for avgrensede deler
i stedet for å beholde en ekstra serialisert kopi av puljen. HTTP 408/429/5xx, nettverksfeil og tidsavbrudd får høyst
tre forsøk, med eksponentiell ventetid på 250/500 ms. `Retry-After` i sekunder eller som HTTP-dato
kan forlenge ventetiden til opptil 5 sekunder. Andre statuser feiler umiddelbart. Delvis avvisning med OTLP 2xx utløser også en feil i stedet for å
bekrefte et tapt spenn; tomme bekreftelser eller bekreftelser med gyldig JSON godtas, med en
grense på 64 KiB for lesing av svar.

Feilmeldinger inneholder bare eksportørens egne opplysninger: HTTP-status, kategori for nye forsøk, antall forsøk og antall sendte
spenn, eller faste formuleringer om bekreftelses-/nettverksfeil. Innsamlerens svarinnhold,
antall ved delvis suksess og svarheadere kopieres aldri til feilmeldinger, logger eller
dashbordet. En mislykket eller delvis godtatt pulje bekreftes ikke: Destinasjonen viser
Feiler med den aktuelle statusen, markøren blir stående ved den sist bekreftede puljen, og neste kjøring
sender de samme radene på nytt. Permanente statuser fortsetter å feile til innsamleren eller konfigurasjonen
er rettet. Bruk innsamlerens egne logger for svardetaljer. Feilsammendrag i anropsloggen beholder
sin separate sladding.
`prepare()` klargjør ingenting; Test sender nøyaktig `{"resourceSpans":[]}` og rapporterer
HTTP-status uten å skrive spenn i anropsloggen.

Spor-ID-er og spenn-ID-er er de første 32/16 heksadesimale sifrene i SHA-256 av
`"omniroute.trace\0" + callLogId` og `"omniroute.span\0" + callLogId`. Nye sendinger har
identiske ID-er. Dette er ingen garanti for deduplisering: Noen bakender, inkludert Langfuse
v4-inntak, dedupliserer ikke spenn med samme ID. Et krasj eller en feil i en del kan
føre til at høyst den ene ubekreftede markørpuljen sendes på nytt; hele denne puljen kan bli duplisert,
ikke bare den siste HTTP-delen. Velg størrelsen på markørpuljen med denne avveiningen i tankene.

### Langfuse-eksempel

Konfigurer disse feltene for en selvdriftet Langfuse-instans:

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

Bygg Authorization-verdien lokalt som Base64 av den bokstavelige strengen `public-key:secret-key`
(for eksempel med `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Ikke lim inn ekte påloggingsinformasjon i logger, skjermbilder eller saker. Tilordningen
setter automatisk `x-langfuse-ingestion-version: 4`; Authorization oppgis fortsatt i `headers`.
Både headere og det genererte identitetssaltet bruker den eksisterende krypterte mekanismen for hemmelige felt
og API-plassholdere; `STORAGE_ENCRYPTION_KEY` er påkrevd.

Tilordningen legger til genereringstype/modell, JSON-bruksdetaljer (inndata/utdata/totalt og tilgjengelige
hurtigbuffernøkler), JSON-øyeblikksbilder av inndata/utdata, ERROR/DEFAULT-nivå, renset statusmelding,
sporingsnavn, økt-ID, valgfritt miljø og filtrerbar
`langfuse.observation.metadata.<key>` for leverandør, forespurt modell, sti, kombinasjon, hurtigbufferkilde
og status. `langfuse.observation.completion_start_time` er ISO 8601 ved
start + TTFT bare når TTFT er kjent og innenfor varigheten. Ingen kostnadsattributter sendes.

Identitetsmoduser gjelder for `langfuse.user.id`:

- `pseudonymous` (standard): HMAC-SHA256 av API-nøkkelens interne ID med et tilfeldig
  salt på 32 byte per destinasjon. Saltet genereres ved opprettelse hvis det mangler, krypteres
  som `identitySalt`, returneres aldri og beholdes ved redigering. Rå nøkkel-ID-er legges aldri
  i span-attributter. Hvis saltet til en destinasjon opprettes på nytt eller roteres, endres identitetene.
- `keyName`: det konfigurerte API-nøkkelnavnet, som med hensikt eksponerer denne operatøretiketten.
- `none`: ingen bruker-ID. Øktetiketter eksporteres fortsatt når de finnes; disse modusene
  anonymiserer ikke vilkårlig promptinnhold eller operatørangitte økt-/korrelasjonsetiketter.

### Starte uten etterfylling

Bare ved opprettelse kan du aktivere **Start fra gjeldende posisjon (hopp over eksisterende logger)** eller sende
`startFromCurrentPosition: true` på toppnivået i nyttelasten til opprettelses-API-et. Dette initialiserer
`cursor_row_id` til den høyeste gjeldende rowid-verdien blant beholdte anropsloggrader ved hjelp av de eksisterende markørhjelpefunksjonene,
uten en migrering. Standardverdien er false (markør 0 og etterfylling av beholdt historikk).
Dette er ikke en innstilling for å tilbakestille markøren ved oppdatering.

Det felles tillegget `ttftMs` legger også til en nullbar `ttft_ms`-kolonne i BigQuery-tilordneren
og skjemaet for nye tabeller: skjematesten krever at hvert felt i den kanoniske posten har en
kolonne. Eksisterende tabeller fortsetter å eksportere uendret: `prepare()` leser tabellskjemaet og
utelater bare `ttft_ms` når den kolonnen mangler. Legg til den nullbare INT64-kolonnen for å få TTFT
ved neste kjøring, eller bruk en ny tabell. Ingen PATCH, automatisk skjemaendring eller ytterligere
tillatelser kreves; alle andre radfelt beholder streng skjemakontroll.

---

## 6. Legge til en destinasjon

1. Opprett `src/lib/logExport/destinations/<name>.ts` som eksporterer en `LogExportDestinationType`:
   et Zod-`configSchema`, en `fields`-deskriptormatrise for brukergrensesnittet, `secretFields` og en
   `createClient(config)` som returnerer `test()` / `prepare()` / `send(records)`.
2. Legg den til i `DESTINATIONS`-matrisen i `src/lib/logExport/registry.ts`.
3. Skriv tester under `tests/unit/`.

Det er hele endringen: persistens, cron-jobben, REST-laget, hemmelighetskrypteringen og
dashboardskjemaet leser alle registeret.

To regler for en ny destinasjon:

- `send()` **må utløse et unntak** ved delvis feil. En vellykket retur betyr «destinasjonen har disse radene»,
  og markøren flyttes permanent forbi dem.
- En destinasjon som tar imot en brukeroppgitt URL, må validere den gjennom
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) før forespørselen sendes,
  på samme måte som webhooks gjør. BigQuery trenger ikke dette: vertene er konstanter.

---

## 7. Bruk

- **Dashboard**: Integrasjoner → Loggeksport. Legg til en destinasjon, kjør **Test** for å kontrollere
  legitimasjonen uten å skrive rader, og aktiver den deretter.
- **Restanse**: hvert destinasjonskort viser ventende rader og markøren; `GET
/api/log-export/status` returnerer de samme tallene samt de siste 20 jobbkjøringene.
- **En destinasjon med feil påvirker ikke de andre** — kjøringssammendraget registrerer status
  per destinasjon i `last_status` / `last_error`, og jobbkjøringshistorikken beholder aggregatet.
- **Når en destinasjon slettes, slettes også markøren.** Hvis den legges til på nytt, starter den
  fra den eldste bevarte anropsloggen, noe som sender rader på nytt som destinasjonen kanskje allerede har.
  I BigQuery absorberer `insertId` per rad dette bare innenfor BigQuery sitt eget dedupliseringsvindu,
  så det er bedre å deaktivere en destinasjon enn å slette den.
