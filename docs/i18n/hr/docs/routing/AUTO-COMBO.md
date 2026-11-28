# OmniRoute Auto-Combo Engine (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇪🇹 [am](../../../am/docs/routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇧🇦 [bs](../../../bs/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇪🇪 [et](../../../et/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ha](../../../ha/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇦🇲 [hy](../../../hy/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ig](../../../ig/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇬🇪 [ka](../../../ka/docs/routing/AUTO-COMBO.md) · 🇰🇭 [km](../../../km/docs/routing/AUTO-COMBO.md) · 🇮🇳 [kn](../../../kn/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ml](../../../ml/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇲🇲 [my](../../../my/docs/routing/AUTO-COMBO.md) · 🇳🇵 [ne](../../../ne/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇮🇳 [or](../../../or/docs/routing/AUTO-COMBO.md) · 🇮🇳 [pa](../../../pa/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇱🇰 [si](../../../si/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇺🇿 [uz](../../../uz/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇳🇬 [yo](../../../yo/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

> **Za korisnike**: Tražite brzi početak? Pogledajte [Korisnički vodič za Auto-Combo](../getting-started/AUTO-COMBO-GUIDE.md) za jednostavna objašnjenja i primjere.

> Samoupravljajući lanci modela s prilagodljivim bodovanjem + automatsko usmjeravanje bez konfiguracije

## Automatsko usmjeravanje bez konfiguracije (`auto/` prefiks)

Nije potrebno stvaranje kombinacije. Koristite `auto` ili `auto/` varijantu izravno u svom klijentu.

### Brzi primjeri

| Model ID            | Ponašanje                                                                                                                                                                |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auto`              | Modeli prihvatljivih pružatelja, LKGP strategija i uravnoteženi ponderi                                                                                                  |
| `auto/coding`       | Ponderi prve kvalitete za zadatke kodiranja                                                                                                                              |
| `auto/fast`         | Favorizira manju latenciju i zdrave pružatelje usluga                                                                                                                    |
| `auto/cheap`        | Težine za uštedu: favoriziraju niže kataloške cijene; zadržava LKGP ljepljivost, a ne striktno prvo najjeftinije                                                         |
| `auto/subscription` | Samo kvota uključena u plan, potvrđena uživo; prazan bazen vraća HTTP 503, nikad naplaćenu zamjenu                                                                       |
| `auto/thrifty`      | pretplata → bez ključa → besplatno → jeftino → premium, jedna prečka u isto vrijeme; može naplatiti                                                                      |
| `auto/offline`      | Favorizira dostupnost kvota i zdravlje pružatelja usluga (`offline-friendly` paket); nije izvanmrežno zaključivanje — zahtjevi i dalje idu udaljenim pružateljima usluga |
| `auto/smart`        | Težine na prvom mjestu kvalitete sa stopom istraživanja od 10%.                                                                                                          |
| `auto/lkgp`         | Eksplicitni LKGP, s istim težinama kao zadani `auto`                                                                                                                     |
| `auto/chaos`        | Paralelna ploča s jednim modelom po pružatelju usluga, do pet prema zadanim postavkama, uz vraćanje jednog odgovora                                                      |

Varijante težine zadržavaju LKGP postojanost, tako da `fast` i `cheap` izražavaju preferencije umjesto da jamče najnižu latenciju ili cijenu na svaki zahtjev. `auto/chaos` upućuje više uzvodnih poziva. `auto/thrifty` može koristiti plaćeni kapacitet; vraćanje na kvotu plana ovisi o obnovljenoj podobnosti i hlađenju veze, a ne samo o vremenu resetiranja. Pogledajte [Usmjeravanje prvo pretplatom](./SUBSCRIPTION_LADDER.md).

### Kategorija × Sastav razine (`auto/<category>:<tier>`)

Odvojeni sufiksi u stilu OpenRoutera** kakva ruta** (kategorija) od** kako ga optimizirati** (razina), tako da ih možete slobodno sastavljati (#4235 faza B, `open-sse/services/autoCombo/suffixComposition.ts`):

- **kategorije** : `coding` · `reasoning` · `vision` · `chat` · `multimodal`. `vision`/`multimodal` zadržati modele koji mogu vidjeti; `reasoning` čuva reasoning/thinking modele. `coding` i `chat` ne dodaju filter mogućnosti. Kategorije koje nisu u chatu odabiru pondere kvalitete prije bilo kakvog nadjačavanja razine.
- **Razine** (odaberite utege bodovanja / filtar skupa): `fast` (brzi brod) · `cheap` (alias `floor`, ušteda troškova) · `reliable` (zdravlje prekidača + stabilnost latencije) · `free` / `pro` (filtrirajte skup prema razini modela putem `classifyTier` — besplatne razine u odnosu na premium). `subscription` i `thrifty` primjenjuju [ljestvicu pretplate](./SUBSCRIPTION_LADDER.md) temeljenu na vezi.

| Primjer                | Odlučuje da                                                       |
| ---------------------- | ----------------------------------------------------------------- |
| `auto/coding:fast`     | prihvatljiv skup, težine niske latencije                          |
| `auto/coding:cheap`    | prihvatljiv skup, utezi za uštedu (alias `auto/coding:floor`)     |
| `auto/reasoning:pro`   | samo reasoning/thinking modeli, premium razina                    |
| `auto/vision`          | modeli sposobni za vid s utezima na prvom mjestu kvalitete        |
| `auto/multimodal:free` | modeli s mogućnošću multimodalnog korištenja, samo besplatni sloj |

Svaki važeći `auto/<category>[:<tier>]` rješava se na zahtjev; odabrani podskup se oglašava u `/v1/models` i nadzornoj ploči (`AUTO_SUFFIX_VARIANTS` u `open-sse/services/autoCombo/builtinCatalog.ts`). Category/tier filtriranje je** fail-closed prema zadanim postavkama** : ako se nijedan odgovarajući model ne podudara, virtualna kombinacija ima prazan skup i razrješivač chata vraća HTTP 503 (`src/sse/handlers/chatHelpers.ts`). Filtar je `narrowPoolByCategoryTier` u `open-sse/services/autoCombo/virtualFactory.ts`.

`OMNIROUTE_AUTO_FREE_FALLBACK_TO_FULL_POOL=true` vraća naslijeđeni category/tier backback u puni skup kada filtar ne odgovara ničemu; ovo može odbaciti traženi nivo ili ograničenje mogućnosti. Filtri obitelji modela nikad ne koriste tu zamjenu, a usmjeravanje samo uz pretplatu i dalje zahtijeva potvrđeni kapacitet uključen u plan.

> **Inteligencija modela uživo:** Auto-routing fitness je informiran uživo** Arena ELO** ljestvice +** modeli.dev** podaci razine kada je zastavica `ARENA_ELO_SYNC_ENABLED` uključena (inače se vraća na statičku mapu fitnessa).

**Kako koristiti:**

```bash
# Any IDE or CLI tool that supports OpenAI format
Base URL: http://localhost:20128/v1
API Key:  <your-endpoint-key>

# In your code/config, set model to:
model: "auto"                 # balanced default
model: "auto/coding"          # favor coding task fit
model: "auto/fast"            # favor lower latency
model: "auto/cheap"           # favor lower catalog cost
```

**Što se događa:**

1. OmniRoute otkriva `auto/` prefiks u `src/sse/handlers/chat.ts`
2. Pitanja za sve** aktivne veze pružatelja usluga** iz baze podataka
3. Primjenjuje filtre vjerodajnica, vidljivosti modela i prihvatljivosti
4. Gradi logičke provider/model kandidate od dostupnih modela, čuvajući popise dopuštenih računa koji ispunjavaju uvjete za slanje
5. Gradi a** virtualna kombinacija** u memoriji (nije pohranjeno u DB)
6. Rute pomoću strategije težine profila + LKGP odabrane varijante

**Ključna svojstva:**

- ✅** Uvijek uključeno:** Nema prebacivanja, nema stvaranja kombinacija, nije potrebna konfiguracija
- ✅** Dinamičan:** Automatski odražava trenutno povezane pružatelje
- ✅** Postojanost sesije:** LKGP osigurava da zadnji uspješni pružatelj ima prioritet
- ✅** Svjestan više računa:** Logični provider/model kandidati zadržavaju popise dopuštenih računa koji ispunjavaju uvjete
- ✅** Nije potrebna spremljena kombinacija:** Virtualna konfiguracija ostaje u memoriji; normalna metrika usmjeravanja i stanje vremena izvođenja mogu i dalje postojati

### Kontrola kandidata po ključu (#7819, razina 1 + 2)

`GET /v1/auto-combo/{channel}/candidates` (`{channel}` = sufiks nakon `auto/` ili doslovno `auto` za osnovni kanal) je** samo za čitanje** krajnja točka koja navodi trenutni skup kandidata `auto/*` kanala ukrašen dostupnošću uživo, ponovno koristeći postojeća očitavanja otpornosti (nikad raw breaker `state`):

- osigurač prekidač — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- hlađenje veze — `rateLimitedUntil` / `testStatus` na riješenom redu `provider_connections`
- model zaključavanje — `isModelLocked(provider, connectionId, model)`

Svaki kandidat također nosi `excluded` zastavu ovog API ključa. Izuzeci se pohranjuju po ključu API-ja (`auto_candidate_overrides` tablica, migracija `128`) — OmniRoute je jedan stanar bez `users` tablice, tako da je `apiKeyId` najbliži stvarni identitet po pozivatelju — i nametnut je na prigušnoj točki skupa kandidata u `open-sse/services/autoCombo/virtualFactory.ts` putem čistog, jedinično testiranog `filterExcludedCandidates()` (`open-sse/services/autoCombo/candidateOverrides.ts`). Filter je** fail-open** : nepostavljeni apiKeyId/channel ili neuspjeh traženja DB ostavljaju skup nefiltriranim, tako da operator bez konfiguriranih nadjačavanja vidi bajt usmjeravanja identičan onome prije ove značajke.

**Odgođeno za naknadni problem:** težine po kandidatu + eksplicitno sređivanje (Razina 3 — ulazi u postojeće putove weighted/priority strategije) i pričvršćivanje specifične `combo.ts` strategije po `auto/*` kanalu (Razina 4). Pogledajte #7819 plan za otvoreno pitanje trebaju li nadjačavanja ostati po ključu API-ja ili postati globalna s obzirom na model s jednim zakupcem.

**Iza kulisa:**

```txt
Request: { model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts detects prefix
   ↓
createVirtualAutoCombo('coding') → candidatePool from active connections
   ↓
handleComboChat (same engine as persisted combos)
   ↓
Auto-scoring selects best provider/model per request
```

**Implementacijske datoteke:**

| File                                                      | Svrha                                                 |
| --------------------------------------------------------- | ----------------------------------------------------- |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Parser prefiksa (`parseAutoPrefix`)                   |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Stvara virtualne `AutoComboConfig` objekte            |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Testna kuka za ismijavanje registra pružatelja usluga |
| `src/sse/handlers/chat.ts`                                | Integracija: automatski prefiks kratkog spoja         |
| `src/shared/constants/providers.ts`                       | `SYSTEM_PROVIDERS.auto` sustava                       |

## Postavke računa za spremljene automatske kombinacije

Inteligentni automatski uređivač nudi opciju** Postavke računa** odjeljak. Svaka veza može biti Preferirana, Normalna (zadano), Rezervirana ili Isključena. Višestruke veze mogu dijeliti razinu. Automatski odabire unutar prve prihvatljive razine, zadržavajući tamo svoje scoring/router ponašanje; neuspjeli pokušaji padaju na preostale konkretne račune, preferirani prije normalnog prije rezerve. Ova kombinacija nikada ne koristi izuzete veze.

Postavka je pohranjena kao `config.accountPreferences`, ključana vezom ID:

```json
{
  "accountPreferences": {
    "connection-a": "preferred",
    "connection-b": "preferred",
    "connection-c": "reserve",
    "connection-d": "excluded"
  }
}
```

Izostavljena ili prazna karta zadržava postojeću rutu. Postavke ne omogućuju onemogućene veze, ne odobravaju pristup API-ključu, ne vraćaju kandidate blokirane kvotom niti zaobilaze provjere proračuna. Svaki je pokušaj ograničen na svoju konkretnu vezu, tako da rezervni račun ne može preskočiti razine iza kombiniranog usmjerivača. Postojeći afinitet sesije može zadržati kvalificirani račun; isključujući račun vezan za nativni red zaustavlja taj red umjesto tihe promjene računa.

Konfigurirane postavke koriste automatski put koji je svjestan računa: nevezani predmemorija konteksta, pametni cjevovod, kaos i prečaci u sjeni se ne šalju. Špekulativna zaštita je onemogućena za ove zahtjeve tako da se rezervni računi ne mogu natjecati s preferiranim. Druge kombinirane strategije ne tumače ovu postavku. Promjena kombinacije s Automatski zadržava spremljene postavke za kasnije vraćanje.

## Kombinirana imena koja odgovaraju stvarnom ID-u modela

Kombinacija čiji je `name` identičan ID-u golog modela (npr. kombinacija pod nazivom `gpt-5.5`) je** namjerni, podržani obrazac** , a ne greška: to je mehanizam za vraćanje dobavljača po ID-u modela dokumentiran u [#6940](https://github.com/cheaper-inference/OmniRoute/issues/6940). Budući da se rezolucija kombinacije provjerava prije razlučivanja golog ID-a modela (`getComboForModel()` u `src/sse/services/model.ts`), zahtjev za goli ID `gpt-5.5` usmjerava se kroz ciljeve kombinacije (npr. `acme-responses/gpt-5.5`, `backup-responses/gpt-5.5`) umjesto ravno do jednog pružatelja — ovo ponovno koristi prednost kombinacije prije ponovnog pisanja izgrađenu za [#3227/#3233](https://github.com/cheaper-inference/OmniRoute/issues/3227) i regresijsko je testirano pomoću `tests/unit/responses-combo-resolution-3227.test.ts` i `tests/unit/combo-name-codex-responses-rewrite.test.ts`.

Stvaranje ili preimenovanje kombinacije u ime koje zasjenjuje pravi ID modela je** nikada odbijen** — bi to prekinulo ovaj dokumentirani tijek rada. Umjesto toga (#8530), `POST /api/combos` i `PUT /api/combos/[id]` pridružuju neblokirajuće polje `warning` odgovoru kada se (novo) ime sudari sa stvarnim ID-om modela:

```json
{ "warning": { "code": "COMBO_NAME_SHADOWS_MODEL", "modelId": "gpt-5.5", "providerId": "openai" } }
```

Pri pokretanju, `scanComboModelNameCollisionsAtBoot()` (`src/instrumentation-node.ts`) također bilježi jednolinijski `[STARTUP]` upozorenje nabrajajući svaku postojeću kombinaciju koja zasjenjuje ID modela, tako da operateri koji ovo pogode slučajno (umjesto namjerno, po #6940) imaju signal. Pomoćnik u otkrivanju živi u `src/lib/combos/modelNameCollision.ts`.

## Pozivanje prilagođene kombinacije od klijenta

Postojane kombinacije (Postavke → kombinacije) koriste se samo kada klijent pošalje kombinaciju** točan naziv** u `model` polju — nema nejasnog ili djelomičnog podudaranja kombiniranog naziva, niti je uključen `auto/` prefiks. Redoslijed razlučivanja (`getComboForModel()` u `src/sse/services/model.ts`):

1. točno podudaranje kombiniranog naziva (`model: "my-combo"`),
2. `combo/<name>` prefiks (`model: "combo/my-combo"`),
3. model → combo glob preslikavanja (`/api/model-combo-mappings`).

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

Dvije uobičajene zamke:

- **`auto` ne koristi vaše kombinacije.** `auto`/`auto/*` gradi vlastiti skup kandidata bez konfiguracije i samo konzultira postojane kombinacije ako je kombinacija doslovno nazvana `auto` (ne preporučuje se). Za usmjeravanje kroz kombinaciju, pošaljite točan naziv — a ne `auto`.
- **`openrouter/auto` je pravi plaćeni OpenRouter proizvod** ("Auto Best Available"), a ne OmniRoute alias. To je jedinstveni statički model unosa OpenRouter registra (`open-sse/config/providers/registry/openrouter/index.ts`) i naplaćuje se zasebno. Koristite Postavke → Usmjeravanje → Sakrij plaćene modele da biste ih isključili iz `auto` skupova.

Pogledajte [#7992](https://github.com/cheaper-inference/OmniRoute/issues/7992) i [#7111](https://github.com/cheaper-inference/OmniRoute/issues/7111) za izvornu zabunu u ovim dokumentima.

## Kako to radi (trajne automatske kombinacije)

Auto-Combo Engine dinamički ocjenjuje provider/model kandidate koji koriste** 16 deklariranih faktora** (definirano u `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`). Zadani zbroj težina je `1.0`; prilagođene težine renormalizira `normalizeScoringWeights()`. Tri faktora prema zadanim postavkama imaju nultu težinu: `cacheAffinity`, `resetWindowAffinity` i `reliability`. Mod paketi daju `reliability` težinu `0.03`, ili `0.04` u `reliability-first`; `quality` nosi `0.03` prema zadanim postavkama i u `quality-first`, a `0.02` u drugim paketima. `cacheAffinity` također zabranjuje deduplikaciju prompt-cachea izvan ponderiranog rezultata.

![Auto-Combo 16-factor scoring](../diagrams/exported/auto-combo-scoring.svg)

> Izvor: [diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd) (regeneriraj putem `npm run docs:render-diagrams`). Naziv datoteke je povijesni; izvorni i prikazani dijagram prikazuju svih 16 faktora deklariranih u `DEFAULT_WEIGHTS`.

| Faktor                | Zadana težina | Opis                                                                                                                                                                                                                       |
| :-------------------- | :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quota`               | 0.1429        | Preostala kvota/ograničenje brzine [0..1]                                                                                                                                                                                  |
| `health`              | 0.1605        | Ocjena zdravlja zbog prekidača (CLOSED= 1,0, HALF_OPEN= 0,5, OPEN= 0,0)                                                                                                                                                    |
| `costInv`             | 0.1429        | Inverzan** pomiješan** trošak (60% ulaz + 40% izlazna cijena tokena, normalizirano) — jeftinije = viši rezultat                                                                                                            |
| `latencyInv`          | 0.1143        | Inverzna p95 latencija normalizirana na skup — brži = viši rezultat                                                                                                                                                        |
| `taskFit`             | 0.0762        | Prilagođenost vrsti zadatka (kodiranje, pregled, planiranje, analiza, otklanjanje pogrešaka, dokumenti)                                                                                                                    |
| `stability`           | 0.0476        | Stabilnost temeljena na varijanci od standardne devijacije latencije — kandidat čije vrijeme odgovora varira ima niže rezultate                                                                                            |
| `tierPriority`        | 0.0476        | Prioritet razine računa — Ultra = 1.0, Pro = 0.67, standardni = 0.33, besplatni = 0.0                                                                                                                                      |
| `tierAffinity`        | 0.0476        | Srodnost između razine kandidata i razine preporučene u manifestu                                                                                                                                                          |
| `specificityMatch`    | 0.0476        | Podudaranje između specifičnosti zahtjeva (savjet manifesta) i razine modela                                                                                                                                               |
| `contextAffinity`     | 0.0476        | Srodnost između potrebe kontekstnog prozora zahtjeva i kontekstnog prozora modela                                                                                                                                          |
| `sessionAvailability` | 0.0476        | dostupnost OAuth sesije veze kandidata za ovu sesiju (`getOAuthSessionAvailability()`; ne-OAuth veze rezultat 1,0)                                                                                                         |
| `connectionDensity`   | 0.0476        | Raspodjela opterećenja na veze istog pružatelja usluga (protiv koncentracije)                                                                                                                                              |
| `cacheAffinity`       | 0.00          | Rendezvous-hash afinitet prema vezi koja najvjerojatnije već sadrži prompt-cache prefiks ovog zahtjeva (`open-sse/services/combo/promptCacheAffinity.ts`); onemogućeno prema zadanim postavkama (#8008)                    |
| `resetWindowAffinity` | 0.00          | Pristranost prema vezama čiji je prozor za resetiranje kvote povoljan (onemogućeno prema zadanim postavkama)                                                                                                               |
| `quality`             | 0.03          | Signal izlazne kvalitete vođen povratnim informacijama iz uređaja za praćenje kvalitete događaja usmjeravanja; kandidati bez zapažanja dobivaju neutralnih 0,5                                                             |
| `reliability`         | 0.00          | Promatrani udio uspjeha, `1 - failureRate`, iz 24 sata povijesti korištenja iza praga od deset uzoraka (inače metrika u stvarnom vremenu); kandidati bez zapažanja čitaju se kao 1.0. Onemogućeno prema zadanim postavkama |

Praćenje `quality` u memoriji (`open-sse/services/routing/quality.ts`) je prazno nakon hladnog ponovnog pokretanja, tako da svaki kandidat postiže neutralni `0.5` dok prva promatranja ne stignu.

> **Nečitljiva kvota (#15347).** Kada pružatelj ima dohvaćač kvote, ali ne vraća ništa čitljivo (neuspješno dohvaćanje, nedostajuće vjerodajnice, korištenje samo poruka ili neispravan snimak bez `windows` koji se može raščlaniti i bez konačnog `percentUsed`, uključujući `percentUsed: null`), kandidat postiže `0` na `quota` osi i njegov se konačni rezultat množi s `UNREADABLE_QUOTA_SOFT_DEPRIORITIZE_FACTOR` (0,5, `autoStrategy.ts`), istim uzorkom meke kazne kao kazna za status veze. Neuspjelo očitavanje upotrebe dokaz je o telemetriji, a ne o davatelju, tako da je rangirano striktno ispod bilo kojeg stvarnog očitanja, uključujući potvrđeno 100%-used, ali se nikada ne blokira ili izbacuje. Davatelj bez ograničenja javlja `unlimited: true` i ocjenjuje se kao puna kvota; pružatelj usluga bez registriranog dohvaćača kvota uopće nema izvor telemetrije i zadržava zadani `100`.

**Iznos:** `0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0` kako je deklarirano u `DEFAULT_WEIGHTS`; `normalizeScoringWeights()` prije bodovanja renormalizira utege koje konfigurira korisnik u distribuciju.

## Paketi načina rada

6 unaprijed definiranih profila težina u `open-sse/services/autoCombo/modePacks.ts`. Svaki paket u potpunosti zamjenjuje zadane težine kako bi usmjerio odabir prema jednom cilju. Zbroj svakog paketa već iznosi `1.0` (`0.9999` kada se ispiše na četiri decimale), stoga `normalizeScoringWeights()` nema što značajno ispraviti kada je paket aktivan — vrijednosti u nastavku, uz zaokruživanje, one su koje ocjenjivač primjenjuje.

| Faktor                | ship-fast  | cost-saver | quality-first | offline-friendly | reliability-first | chaos-mode |
| :-------------------- | :--------- | :--------- | :------------ | :--------------- | :---------------- | :--------- |
| `quota`               | 0.1133     | 0.1133     | 0.0752        | **0.3324**       | 0.1133            | 0.0376     |
| `health`              | 0.2667     | 0.1810     | 0.1714        | 0.2667           | **0.3524**        | **0.4000** |
| `costInv`             | 0.0276     | **0.3324** | 0.0276        | 0.0752           | 0.0181            | 0.0140     |
| `latencyInv`          | **0.3048** | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0186     |
| `taskFit`             | 0.0952     | 0.0952     | **0.3524**    | 0.0000           | 0.0952            | 0.1905     |
| `stability`           | 0.0000     | 0.0476     | 0.1429        | 0.0952           | 0.1905            | 0.1714     |
| `tierPriority`        | 0.0376     | 0.0376     | 0.0276        | 0.0376           | 0.0276            | 0.0040     |
| `tierAffinity`        | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `specificityMatch`    | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `contextAffinity`     | 0.0095     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0186     |
| `sessionAvailability` | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `resetWindowAffinity` | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `connectionDensity`   | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `quality`             | 0.02       | 0.02       | **0.03**      | 0.02             | 0.02              | 0.02       |
| `reliability`         | 0.03       | 0.03       | 0.03          | 0.03             | **0.04**          | 0.03       |

Napomene:

- **Paketi sadrže `quality` i `reliability`** (`quality 0.02`, `quality-first 0.03`; `reliability 0.03`, `reliability-first 0.04`) i u cijelosti zamjenjuju mapu težina (`weights = pack`, nije spajanje). `DEFAULT_WEIGHTS` sadrži `quality 0.03 / reliability 0`; odabir opcije `balanced`/`default` zadržava te zadane vrijednosti, dok se odabirom paketa upotrebljavaju gore navedene vrijednosti paketa. U hladnom skupu (još nema opažanja, pa je `quality 0.5`, a `reliability 1`) ova dva faktora dodaju `+0.04` u generičkom paketu (`0.03 + 0.01`), `+0.045` u paketu `quality-first` i `+0.05` u paketu `reliability-first`.
- `tierAffinity`, `specificityMatch` i `resetWindowAffinity` izričito su postavljeni na `0` u svakom paketu.
- Sažeti pregled naglaska svakog paketa:
  - **ship-fast** → latencyInv 0.3048 + health 0.2667 (zdrave veze s niskom latencijom)
  - **cost-saver** → costInv 0.3324 (pobjeđuju najjeftiniji tokeni)
  - **quality-first** → taskFit 0.3524 + stability 0.1429 + quality 0.03, najviše od svih paketa (najbolji model za zadatak, dosljedan)
  - **offline-friendly** → quota 0.3324 + health 0.2667 (najveća rezerva bez obzira na brzinu/trošak)
  - **reliability-first** → health 0.3524 + stability 0.1905 + reliability 0.04, najviše od svih paketa (najmanje iznenađenja)
  - **chaos-mode** → health 0.4000 + taskFit 0.1905 (paket težina koji `auto/chaos` dodjeljuje članovima svojeg panela; paralelno grananje ne čita te težine i ovo nije profil za ubacivanje pogrešaka, pogledajte [CHAOS-MODE.md](../guides/CHAOS-MODE.md#autochaos-parallel-fan-out))

### Kontrole po zahtjevu (zaglavlja) — #6023 / #6024 / #6025 / #3470

Kombinacijom `auto` može se upravljati **za svaki zahtjev zasebno** putem triju zaglavlja, bez mijenjanja
pohranjene konfiguracije kombinacije. Primjenjuju se samo na strategiju `auto` i samo na zahtjev
koji ih sadrži; spremljene vrijednosti `modePack`/`budgetCap`/`budgetFallback` kombinacije upotrebljavaju se
kada zaglavlje nije prisutno.

| Zaglavlje                     | Prihvaća                                                                                                                                                                                                      | Učinak                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| :---------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-OmniRoute-Mode`            | unaprijed definirani pseudonim (`fast`, `balanced`, `quality`, `cheap`, `reliable`, `offline`) ili izvorni naziv paketa (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`, `reliability-first`) | Nadjačava težine bodovanja za ovaj zahtjev. `balanced`/`default` nameću zadane težine (bez paketa). Nepoznate se vrijednosti zanemaruju (konfiguracija ostaje sačuvana).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `X-OmniRoute-Budget`          | pozitivan broj (maksimalni iznos u USD-u po zahtjevu)                                                                                                                                                         | Čvrsto ograničenje troška: kandidati čiji procijenjeni trošak premašuje ograničenje filtriraju se prije odabira. Što će se dogoditi kada ga premaši **svaki** kandidat određuje se zaglavljem `X-OmniRoute-Budget-Fallback` u nastavku.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `X-OmniRoute-Budget-Fallback` | `cheapest` (zadano, pseudonimi: `cheapest-viable`, `soft`) ili `strict` (pseudonimi: `block`, `hard`)                                                                                                         | `cheapest`: kao zamjenski odabir upotrebljava se globalno najjeftiniji kandidat, iako i dalje premašuje ograničenje (naslijeđeno ponašanje). `strict`: odbija izvršiti odabir — zahtjev odmah ne uspijeva uz `HTTP 402`, umjesto da neprimjetno prekorači proračun. Nepoznate se vrijednosti zanemaruju.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `X-OmniRoute-Effort`          | `auto` (ostale vrijednosti su rezervirane)                                                                                                                                                                    | Prilagodljivi proračun razmišljanja: kada zahtjev **ne** sadrži polje za rezoniranje ni u kojem obliku (`reasoning_effort`, `reasoning`, `thinking`), pristupnik određuje `auto` kao `low`/`medium`/`high` na temelju determinističkih signala oblika zahtjeva (duljina posljednje korisničke poruke, veličina konteksta do posljednje korisničke poruke, prethodni rezultati alata, dubina petlje alata). Signali su ograničeni na trenutačni potez — sve nakon posljednje korisničke poruke zanemaruje se — stoga se svaki zahtjev u petlji alata određuje na istoj razini (fiksiranje bez stanja po potezu, bez stanja sesije i bez eskalacije usred petlje koja bi narušila prefikse predmemorije upita na nadređenom sustavu). Eksplicitno klijentsko polje za rezoniranje uvijek ima prednost. Ograničeno je na zahtjeve čije se nadređeno usmjeravanje razrješava u oblik OpenAI Chat Completions (`targetFormat === FORMATS.OPENAI`) — `reasoning_effort` je polje oblika OpenAI, pa zaglavlje nema učinka na zahtjev usmjeren prema Claudeu ili Geminiju (pogledajte `open-sse/handlers/chatCore/adaptiveEffortWiring.ts`). |

```bash
# Nametni najbrži profil, ograniči ovaj zahtjev na 0,05 USD i strogo ga blokiraj umjesto prekoračenja potrošnje
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

Razrješavanje je čista funkcija (`open-sse/services/autoCombo/requestControls.ts`);
razriješene vrijednosti prosljeđuju se postojećim ulazima mehanizma `config.modePack` /
`config.budgetCap` / `config.budgetFallback`. Pohranjeni `config.budgetFallback`
kombinacije ("strict" | "cheapest") postavlja trajnu politiku; zaglavlje je nadjačava
za pojedinačni zahtjev.

## Sve strategije usmjeravanja

OmniRoute kombinirani motor podržava** 22 strategije usmjeravanja** (deklarisano u `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`). Auto Combo motor sam je izložen pod `auto` strategijom; ostali su dostupni za trajne kombinacije.

| Strategija          | Opis                                                                                                                                                                                                                                                                                                                                                                                              |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `priority`          | Uređeni popis prvog cilja s eksplicitnim prioritetom                                                                                                                                                                                                                                                                                                                                              |
| `weighted`          | Proporcionalno nasumično izvlačenje po zahtjevu prema ciljnoj težini; ostali ciljevi postaju rezervni (vidi dolje)                                                                                                                                                                                                                                                                                |
| `round-robin`       | Kruži kroz ciljeve redom, u ljepljivim serijama (3 uspjeha po meti prema zadanim postavkama; vidi dolje)                                                                                                                                                                                                                                                                                          |
| `context-relay`     | Redoslijed prioriteta plus sažetak primopredaje kada se razgovor premjesti na drugi račun                                                                                                                                                                                                                                                                                                         |
| `fill-first`        | Ispunite kvotu svakog cilja prije prelaska na sljedeći                                                                                                                                                                                                                                                                                                                                            |
| `p2c`               | Isprobajte dvije mete i preferirajte zdraviju i bržu                                                                                                                                                                                                                                                                                                                                              |
| `random`            | Svježi Fisher-Yates shuffle po zahtjevu; uzastopni zahtjevi mogu započeti na istom cilju                                                                                                                                                                                                                                                                                                          |
| `least-used`        | Odaberite cilj s najmanje zabilježenih zahtjeva u ovoj kombinaciji (po modelu + računa)                                                                                                                                                                                                                                                                                                           |
| `cost-optimized`    | Prvo pokušajte s najnižom kataloškom cijenom input tokena; nepoznate cijene idu na kraju (nije konačna cijena zahtjeva)                                                                                                                                                                                                                                                                           |
| `reset-aware` ⭐    | Ocijenite preostalu sesiju i tjednu kvotu plus poništite hitnost; near-ties rotirati                                                                                                                                                                                                                                                                                                              |
| `reset-window`      | Dajte prednost ciljevima čiji se prozor kvote što prije resetira                                                                                                                                                                                                                                                                                                                                  |
| `expiry-first`      | Potrošite račun čija bi kvota inače istekla neiskorišten prvi — najveći ostatak s najbližim rokom za ponovno postavljanje ide prvi                                                                                                                                                                                                                                                                |
| `headroom`          | Odaberite cilj s najviše preostale kvote                                                                                                                                                                                                                                                                                                                                                          |
| `quota-weighted`    | Distribuirati zahtjeve prema raspoloživosti kvota i opterećenju tijekom leta; sačuvaj afinitet sesije                                                                                                                                                                                                                                                                                             |
| `strict-random`     | Promiješani špil po kombinaciji: svaka se meta koristi jednom prije ponovnog miješanja; zadnji u jednom ciklusu nikada ne počinje sljedeći                                                                                                                                                                                                                                                        |
| `auto`              | Koristite Auto Combo bodovanje (16-faktor) —** preporučeno**                                                                                                                                                                                                                                                                                                                                      |
| `lkgp`              | Last-Known-Good Path (pričvršćuje se na posljednjeg uspješnog pružatelja usluga, zatim se vraća na pravila)                                                                                                                                                                                                                                                                                       |
| `context-optimized` | Prvo pokušajte s najvećim poznatim kontekstnim prozorom (riješena ograničenja mogućnosti modela)                                                                                                                                                                                                                                                                                                  |
| `cache-optimized`   | Dajte prednost prihvatljivoj vezi koja će vjerojatno držati prefiks upita u predmemorij (`open-sse/services/combo/promptCacheAffinity.ts`, #8008)                                                                                                                                                                                                                                                 |
| `fusion` 🧬         | Paralelno se proširite na panel modela, a zatim sintetizirajte jedan odgovor putem suca (pogledajte dolje)                                                                                                                                                                                                                                                                                        |
| `pipeline`          | Pokreni ciljeve uzastopno, spajajući izlaz svakog koraka u ulaz sljedećeg koraka; vraća se samo konačni odgovor (#6396)                                                                                                                                                                                                                                                                           |
| `jev`               | Lista preferencija rangiranih prema korisnicima; TypeSafe Jev priznaje koji se unosi pokreću za ovaj zahtjev. Prvo pobjednik, ostale primljene mete zadržavaju vaš poredak. Uključivanje i plaćanje: poziva se samo kada je `COMBO_JEV_STRATEGY_ENABLED` uključen (zadano isključeno); svaki poziv šalje ograničeni izvod na api.typesafe.ai. Vraća se vašoj narudžbi kada nije dostupan (#15276) |

⭐ = Novo u v3.8.0 · 🧬 = Novo u v3.8.36

Strategija `jev` čini plaćene TypeSafe pozive samo kada je `COMBO_JEV_STRATEGY_ENABLED` omogućen. Sam pohranjen TypeSafe ključ to ne omogućuje. S isključenom zastavicom, kombinacija zadržava nalog operatera bez upućivanja tog poziva (`open-sse/services/combo/jevAsk.ts`).

### `weighted` semantika

`weighted` je a** proporcionalno nasumično izvlačenje po zahtjevu** (`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`), a ne ekvilajzer:

- Svaki zahtjev izvlači** jedan** korak s vjerojatnošću `weight / totalWeight`; preostali koraci su poredani prema silaznoj težini kao rezervni lanac za taj zahtjev.
- Korak čija je težina `0` (ili nedostaje) jest** nikad nacrtana** dok bilo koji drugi korak ima težinu > 0 — može poslužiti samo kao rezerva nakon što nacrtani korak ne uspije. Tek kada** sve** ponderi su 0 postaje li odabir ujednačen.
- Koraci čiji su svi ciljevi nedostupni prekidač — dobavljača `OPEN`, hlađenje veze, zaključavanje modela — uklanjaju se iz izvlačenja prije nego što se to dogodi (`open-sse/services/combo/targetResolution.ts`), tako da jedan zdravi korak može privremeno pobijediti na svakom zahtjevu.
- `stickyWeightedLimit` (kombinirana konfiguracija, zadana `1` = isključena) pričvršćuje nacrtani korak za toliko uzastopnih uspjeha prije ponovnog crtanja.

Za strogu rotaciju koristite `round-robin`; jednake težine na `weighted` daju statističku — ne strogu — ravnotežu.

### Način agentskog cjevovoda

Kombinacija `pipeline` s najmanje dva modela može se odlučiti za planner/executor usmjeravanje sa `config.agenticOrchestration.enabled`. Prva meta posjeduje planiranje i konačne odgovore; drugi cilj emitira izvorne klijentske pozive alata. OmniRoute detektira nastavak rezultata alata iz protokola zahtjeva, pita planera je li potrebna još jedna runda alata i dinamički čini ili izvršitelja ili planera posljednjim korakom okrenutim klijentu.

Izborni `config.agenticOrchestration.contextCompaction` primjenjuje zasebni proračun korisnog opterećenja prije svakog slanja planera ili izvršitelja. Omogućite ga eksplicitno:

```json
{
  "enabled": true,
  "defaultMaxChars": 400000,
  "targetRatio": 0.72,
  "toolResultMaxChars": 24000,
  "modelMaxChars": { "provider/planner": 175000, "provider/executor": 300000 }
}
```

Ovo su serijalizirani proračuni JSON znakova koje je odabrao operater, a ne kontekstni prozori tokena ili zajamčena uzvodna ograničenja. Točan model IDs nadjačava zadani. Iznad praga, sažimanje uklanja identične definicije alata, skraćuje predimenzionirane dokaze alata sa sažetkom i uklanja stare kompletne grupe povijesti prema ciljanom omjeru. Zadržava system/developer upute, najnoviji korisnički zahtjev, posljednju rundu alata uključujući paralelni calls/results i Gemini vodeće upute za usmjeravanje. Upute najviše razine i postavke alata su sačuvane. Oznaka za izostavljanje bilježi uklonjenu povijest; ovo je determinističko skraćivanje, a ne semantički sažetak. Ako prikvačeni kontekst i dalje premašuje proračun, zahtjev vraća 413 prije kontaktiranja modela. S onemogućenim sažimanjem ili ispod praga, zahtjev prolazi nepromijenjen.

Kod nastavka rezultata alata, OmniRoute također zaustavlja izvršenje kada dvije uzastopne završene runde ponavljaju iste pozive alata s nepromijenjenim rezultatima ili kada svaki eksplicitno označen rezultat u dvije uzastopne runde nije uspio. Promijenjeni rezultati dopuštaju ponavljanje poziva (na primjer, prozivanje). Čuvar se resetira na novi zahtjev korisnika, grupira paralelne pozive u jedan krug i podržava Anthropic, dovršetke razgovora, odgovore i Gemini povijesti. Planer prima razlog i posjeduje konačni odgovor čak i ako zahtijeva još jedan krug alata.

Dodatni modeli nakon drugog cilja su naručene sigurnosne kopije izvršitelja. Neuspjeli HTTP odgovor ili iznimka prijenosa napreduje do sljedećeg izvršitelja, noseći istu odluku planera i izvorne alate, ali taj izvršitelj vlastiti korak koraka i razriješenu vezu. Prvi uspješni odgovor vraća se nepromijenjen, uključujući SSE streaming; kvarovi nakon uspješnog pokretanja toka ne mogu se ponovno pokušati ovdje. Ako svi izvršitelji ne uspiju, vraća se posljednji neuspjeh. Klijent prekida otpremu.

```json
{
  "strategy": "pipeline",
  "models": [{ "model": "provider/planner" }, { "model": "provider/executor" }],
  "config": {
    "agenticOrchestration": { "enabled": true, "maxToolRounds": 8 }
  }
}
```

Izvršitelj može poslati više neovisnih poziva u jednom odgovoru. Zavisni pozivi se obrađuju u kasnijim obradama rezultata alata klijenta, pri čemu planer pregledava svaki rezultat. `maxToolRounds` je zadana vrijednost `8` i prihvaća `1`–`32`; kada se postigne, planer mora dati najbolji dostupni konačni odgovor. Interne odluke planera spremaju se u međuspremnik, dok odabrani odgovor okrenut klijentu čuva izvornu preferenciju strujanja.

### `round-robin` sticky batch i proširenje računa

Round-robin je grupiran, a ne jedan zahtjev po koraku:

- `stickyRoundRobinLimit` (kombinirana konfiguracija, zatim `comboStickyRoundRobinLimit`, zatim `settings.stickyRoundRobinLimit`, zadano** 3** ) zadržava istu metu toliko uzastopnih uspjeha prije rotiranja. Postavite nadjačavanje kombinacije na `1` za rotaciju s jednim zahtjevom. Kombinirani uređivač prikazuje efektivnu vrijednost i sloj iz kojeg je došla.
- `connectionAwareExpansion` (kombinirana konfiguracija, zatim postavke, zadano** lažno** ) proširuje svaki korak na razini pružatelja u ciljeve po računu prije rotacije. Strategije skupine B (prioritetne, ponderirane, kružne, nasumične, p2c, najmanje korištene, troškovno optimizirane, lkgp, prvo popuni, striktno nasumične, kontekstno optimizirane, predmemorije optimizirane, kontekstno relejne, fusion, cjevovod, jev) zadržavaju prikaz na razini pružatelja dok ovo nije uključeno. Kombo uređivač izlaže nasljeđivanje / uključivanje / isključivanje; nasljeđivanje koristi globalnu zadanu vrijednost (isključeno).
- Prompt-cache locality routing (`promptCacheAffinityEnabled`, zadano** pravi** ) mijenja redoslijed prikvačenih veza tako da odgovarajući ključevi predmemorije ostaju na jednom računu. Ima prednost nad kružnom i ponderiranom rotacijom preko prikvačenih koraka po računu. Isključite ga pod zadanim postavkama → Combo ako vam je potrebna stroga rotacija. Ne postoji nadjačavanje po kombinacijama.

Za rotaciju više računa na jednom modelu, radije** jedan korak dinamičkog računa** (prazan `connectionId`, cijeli bazen) s ljepljivim ograničenjem `1`, a ne tri prikvačena `connectionId` s. Prikvačeni koraci i afinitet skupljaju se na isti račun čak i dok RR brojač napreduje.

## Strategija Fusion

`fusion` je jedina strategija koja **ne** odabire jedan ciljni model. Ona šalje prompt
**svim panel modelima paralelno**, a zatim konfigurabilan **model suca** sintetizira
jedan konačni odgovor iz svih odgovora panela. Preneseno iz upstream repozitorija `decolua/9router`
(OpenRouterov Fusion dizajn); implementacija u `open-sse/services/fusion.ts`.

Kako radi:

0. **Zaobilaženje za zahtjeve s alatima** — zahtjev koji sadrži neprazan niz `tools` s
   `tool_choice` koji nije eksplicitno `"none"` potpuno preskače panel: usmjerava se izravno na
   jedan model (konfigurirani sudac, ili `panel[0]`) s `tools`/`tool_choice`
   proslijeđenima bez izmjena. Članovi panela nemaju pristup alatima, a sudčeva
   direktiva sinteze ne potiče emisiju poziva alata, pa agentski/klijenti koji koriste alate
   dobivaju pravu odluku o pozivu alata umjesto sintetiziranog teksta (#6771).
1. **Fan-out** (samo za zahtjeve bez alata) — prompt se šalje svim panel
   modelima odjednom, prisilno nestreaming s uklonjenim alatima (sucu trebaju potpuni
   tekstovi za sintezu).
2. **Prikupljanje s kvorumskom grejs-periodom** — čim pristigne `minPanel` odgovora, pokreće se kratki tajmer
   grejs-perioda za zaostale modele, a zatim fusion nastavlja s onim što je prikupljeno.
   Time se ograničava kazna najsporijeg modela na ukupno vrijeme, uz tvrdi vremenski limit.
3. **Sudačka sinteza** — odgovori panela se anonimiziraju (`Source 1`, `Source 2`, … — kako
   bi sudac vagao sadržaj, a ne naziv modela) i predaju sucu, koji analizira
   konsenzus / kontradikcije / djelomičnu pokrivenost / jedinstvene uvide / slijepe točke, a zatim
   piše **jedan** autoritativan odgovor. Sudački poziv zadržava originalni
   `stream` flag klijenta + alate, tako da streaming i downstream korištenje alata još uvijek rade.
4. **Postupna degradacija** — 0 odgovora panela → `503`; točno 1 preživjeli → taj odgovor
   se vraća izravno (nema što fuzionirati); panel s jednim modelom odgovara izravno.

Član panela može biti i korak `combo-ref` (`{kind: "combo-ref", comboName: "..."}`) koji referencira
drugi combo — razrješava se kao **jedan black-box glas panela** (potpuni rekurzivni dispatch u
referencirani combo, a ne fan-out vlastitih ciljeva tog comba), s istom zaštitom od dubine/ciklusa
koju već koriste sve ostale strategije koje konzumiraju combo-ref (#6764).

### Konfiguracija

Konfigurira se na `config` blobu comba (bez migracije sheme — koristi postojeću
tablicu `combos`):

| Polje                                    | Tip      | Zadana vrijednost | Svrha                                                                                            |
| :--------------------------------------- | :------- | :---------------- | :----------------------------------------------------------------------------------------------- |
| `config.judgeModel`                      | `string` | prvi panel model  | Model koji sintetizira konačni odgovor                                                           |
| `config.fusionTuning.minPanel`           | `number` | `2`               | Uspješni odgovori potrebni prije pokretanja tajmera grejs-perioda (stisnuto na `[2, panelSize]`) |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`            | Koliko dugo čekati na zaostale modele nakon što se dostigne kvorum                               |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`           | Apsolutni limit kako jedan zapeli model ne bi blokirao zahtjev                                   |

Zadane vrijednosti nalaze se u `FUSION_DEFAULTS` (`open-sse/services/fusion.ts`).

### Primjer

```bash
curl -X POST http://localhost:20128/api/combos \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "fusion-panel",
    "strategy": "fusion",
    "targets": [
      { "model": "cc/claude-opus-4-7" },
      { "model": "cx/gpt-5.5" },
      { "model": "glm/glm-5.1" }
    ],
    "config": {
      "judgeModel": "cc/claude-opus-4-7",
      "fusionTuning": { "minPanel": 2, "stragglerGraceMs": 8000, "panelHardTimeoutMs": 90000 }
    }
  }'
```

Zatim ga pozovite kao bilo koji combo: `{"model":"fusion-panel","messages":[...]}`.

## Virtualna Tvornica Auto-Kombinacija

Engine za automatske kombinacije ne zahtijeva unaprijed definirane kombinacije. Umjesto toga, `open-sse/services/autoCombo/virtualFactory.ts` gradi kandidate u hodu:

1. Dohvaća `getProviderConnections({ isActive: true })` (sve aktivne veze)
2. Filtrira one s važećim vjerodajnicama (API ključ ili neistekli OAuth token putem `hasUsableOAuthToken()`)
3. Unakrsno provjerava s `getProviderRegistry()` za dostupnost modela i cijene
4. Za svaki skup `(provider, model, connection)`, gradi `VirtualAutoComboCandidate`
5. Odabire `connection.defaultModel` (ili prvi model iz registra) kao odredište slanja
6. Ocjenjuje svakog kandidata koristeći 16-faktorski `scorePool()` i paket težina varijante
7. Vraća rezultirajući `AutoComboConfig` u memoriji za `handleComboChat()` — nikada se ne pohranjuje u bazu podataka

To znači da **dodavanje novog pružatelja s omogućenim `auto/*` automatski proširuje skup kandidata** — nije potrebno ručno uređivanje kombinacija. Virtualna kombinacija se gradi iznova za svaki zahtjev, pa se novododane ili novozdrave veze odmah preuzimaju.

## Samo-oporavak

- **Privremeno isključenje**: Ocjena < 0.2 → isključeno na 5 min (progresivni backoff, maksimalno 30 min)
- **Svjesnost prekidača strujnog kruga**: OPEN → automatski isključen; HALF_OPEN → probe zahtjevi
- **Način incidenta**: >50% OPEN → onemogući istraživanje, maksimiziraj stabilnost
- **Oporavak nakon hlađenja**: Nakon isključenja, prvi zahtjev je "probe" sa smanjenim vremenskim ograničenjem

## Banditsko Istraživanje

5% zahtjeva (konfigurabilno) usmjerava se nasumičnim pružateljima radi istraživanja. Onemogućeno u načinu incidenta.

## API

Postoji** nema namjenske `POST /api/combos/auto` krajnje točke** — Auto-Combo se troši na dva načina:

1. **Zero-config (preporučeno):** Pošaljite bilo koji zahtjev za završetak razgovora sa `model: "auto"` ili `model: "auto/<variant>"`. Virtualna tvornica gradi kombinaciju po zahtjevu — bez upornosti, nisu potrebni API pozivi.

2. **Postojana kombinacija sa `strategy: "auto"`:** Stvorite običnu kombinaciju preko `POST /api/combos` i postavite `strategy: "auto"` plus `config.auto.weights` / `config.auto.candidatePool`. Koristi se isti sustav bodovanja; kombinacija je pohranjena u `combos` i ID je može ponovno koristiti.

Za otkrivanje, `GET /api/combos/auto` navodi svaku varijantu sa svojim riješenim skupom kandidata plus `context_length` / `max_output_tokens` — MAX preko prozora skupa kandidata. Klijenti (npr. dodatak za otvoreni kod) moraju oglašavati ove vrijednosti umjesto `0`: nulti kontekst u potpunosti onemogućuje automatsko sažimanje otvorenog koda, dopuštajući sesijama da rastu sve dok čišćenje povijesti pristupnika ne uništi kontekst. MAX je siguran za reklamiranje jer predfiltar konteksta automatske kombinacije usmjerava prevelike zahtjeve kandidatima s velikim prozorima.

```bash
# Zero-config usage (no combo creation)
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# Persisted auto combo via the regular combos endpoint
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Strategije automatskog rutera

Postojane `strategy: "auto"` kombinacije mogu postaviti `config.routerStrategy` (ili naslijeđeni `config.auto.routerStrategy`) na jedno od:

- `rules` — zadano ponderirano bodovanje
- `score` — odabire najviši konfigurirani ponderirani rezultat. Točne veze čuvaju konfigurirani redoslijed kandidata; postojeći `explorationRate` uzorci iz cijelog rangiranog skupa.
- `cost` / `eco` — najjeftiniji zdravi pružatelj
- `latency` / `fast` — najniža p95 latencija s kaznom pouzdanosti
- `sla-aware` / `sla` — preferiraju kandidate koji zadovoljavaju p95 latenciju, stopu pogreške i izbornu cijenu SLOs
- `lkgp` — prvi posljednji poznati dobar pružatelj
- `nadir` — pitaj [Nadirovu](https://getnadir.com) odluku API koji model u skupu je potreban brzom; opt-in, fail-open na `rules`
- `decision` — pitajte konfiguriranog odlučivača (TypeSafe System One, vaša vlastita odluka URL ili jedan od vlastitih modela kombinacije) koji model u skupu odgovara zahtjevu; iza default-off `COMBO_DECISION_ROUTER_ENABLED` oznake, fail-open na `rules`

### Detaljne strategije usmjerivača

Auto-combo motor izlaže 7 priključnih**RouterStrategy** implementacije koje možete zamijeniti putem `config.routerStrategy` (ili naslijeđenog `config.auto.routerStrategy`). Svaka strategija odabire jednog pružatelja iz grupe kandidata, s obzirom na `RoutingContext` (vrsta zadatka, tool/vision savjeti, procjena tokena, izborna SLA politika, izborni zadnji poznati dobar pružatelj).

#### 1. `rules` (zadano) — 16-faktorsko ponderirano bodovanje

Zaokružuje postojeći sustav bodovanja. Filtrira `OPEN` kandidate za prekidače, zatim pokreće `scorePool()` s trenutnom vrstom zadatka i `getTaskFitness()`, birajući pružatelja s najboljim rezultatom.

```ts
class RulesStrategyImpl implements RouterStrategy {
  readonly name = "rules";
  readonly description = "16-factor weighted scoring (see DEFAULT_WEIGHTS)";

  select(pool, context) {
    const eligible = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const ranked = scorePool(
      eligible.length > 0 ? eligible : pool,
      context.taskType,
      undefined,
      getTaskFitness
    );
    return { provider: ranked[0].provider /* ... */ };
  }
}
```

**Kada koristiti** : Zadano. Koristite kada želite uravnoteženi kompromis između svih signala.

**Alias** : `rules` (bez pseudonima)

---

#### 2. `cost` / `eco` — najjeftiniji zdravi pružatelj usluga

Razvrstava grupu kandidata prema `costPer1MTokens` (uzlazno) i odabire najjeftinije. Prvo filtrira `OPEN` kandidate.

```ts
class CostStrategyImpl implements RouterStrategy {
  readonly name = "cost";
  readonly description = "Always selects cheapest available provider";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort((a, b) => a.costPer1MTokens - b.costPer1MTokens);
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Kada koristiti** : radna opterećenja osjetljiva na troškove, skupna obrada ili pozadinski poslovi.

**Aliasi** : `cost`, `eco`

---

#### 3. `latency` / `fast` — najniža p95 latencija s kaznom pouzdanosti

Poredaj po `p95LatencyMs + (errorRate * 1000)`. Kazna za stopu pogreške osigurava da su nepouzdani pružatelji niže rangirani čak i ako je njihova nominalna latencija niska.

```ts
class LatencyStrategyImpl implements RouterStrategy {
  readonly name = "latency";
  readonly description = "Prioritizes lowest p95 latency with reliability weighting";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort(
      (a, b) => a.p95LatencyMs + a.errorRate * 1000 - (b.p95LatencyMs + b.errorRate * 1000)
    );
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Kada koristiti** : Radna opterećenja osjetljiva na kašnjenje kao što su chat u stvarnom vremenu, automatsko dovršavanje ili interaktivni pomoćnici kodiranja.

**Aliasi** : `latency`, `fast`

---

#### 4. `sla-aware` / `sla` — latency/error/cost SLO usklađenost

Ocjenjuje svakog kandidata prema tome koliko dobro zadovoljava konfiguriranu SLO politiku:

| Faktor               | Težina | Formula                                                |
| -------------------- | ------ | ------------------------------------------------------ |
| Rezultat latencije   | 35%    | `threshold / max(value, ε)`                            |
| Rezultat pogreške    | 35%    | `threshold / max(value, ε)`                            |
| Zdravstveni rezultat | 15%    | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN)      |
| Ocjena troškova      | 10%    | `threshold / max(value, ε)` ili inverzno normalizirano |
| Rezultat stabilnosti | 5%     | inverzna normalizirana latencija stddev                |

Kada je `hardConstraints: true`, kandidati su poredani prvenstveno prema** rezultat prekršaja** (koliko premašuju bilo koji SLO), zatim kompozitnim rezultatom. Inače je to samo kompozitni rezultat.

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Selects the provider most likely to satisfy latency, error-rate, and cost SLOs";

  select(pool, context) {
    // ... scores each candidate against policy: { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**SLA polja** (postavljeno na kombiniranoj konfiguraciji):

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

**Kada koristiti** : Radna opterećenja proizvodnje sa strogom latencijom, stopom pogrešaka ili proračunom troškova.

**Aliasi** : `sla-aware`, `sla`

---

#### 5. `lkgp` — prvi posljednji poznati dobar pružatelj

Pokušava** zadnji poznati dobar pružatelj usluga** (ako je postavljeno) prvo, zatim se vraća na `rules` strategiju. Korisno za stalnost sesije — isti pružatelj obrađuje zahtjeve za praćenjem u razgovoru.

```ts
class LKGPStrategyImpl implements RouterStrategy {
  readonly name = "lkgp";
  readonly description = "Tries last known good provider first, then falls back to rules";

  select(pool, context) {
    if (context.lkgpEnabled === false) {
      return getStrategy("rules").select(pool, context);
    }

    if (context.lastKnownGoodProvider) {
      const candidates = pool.filter(
        (c) => c.provider === context.lastKnownGoodProvider && c.circuitBreakerState !== "OPEN"
      );
      if (candidates.length > 0) {
        return { provider: candidates[0].provider /* ... */ };
      }
    }

    // Fallback to rules strategy
    return getStrategy("rules").select(pool, context);
  }
}
```

**Kada koristiti** : Višestruki razgovori u kojima želite da isti pružatelj obrađuje naknadne zahtjeve (npr. za predmemoriju, kontinuitet konteksta ili dosljednost cijena).

**Alias** : `lkgp` (bez pseudonima)

---

#### 6. `nadir` — odabir modela s obzirom na odzivnik putem Nadira

Svaka gornja strategija rangira kandidate prema vlastitoj telemetriji; nitko od njih ne čita zahtjev. `nadir` šalje posljednji korisnički red plus ID-ove modela skupa [Nadirovoj](https://getnadir.com) odluci API (`POST /v1/bucket`) i usmjerava na model koji Nadir odabire iz tog izbornika (`simple` → najjeftiniji model, `complex` → granični). Vezu koja poslužuje taj model i dalje odabire `rules`, tako da kvota, zdravlje i cijena nastavljaju odlučivati koji račun.

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "nadir",
    "nadir": {
      "apiKey": "ndr_...",
      "baseUrl": "https://api.getnadir.com",
      "timeoutMs": 2000
    }
  }
}
```

`OMNIROUTE_NADIR_API_KEY` i `OMNIROUTE_NADIR_BASE_URL` su env backbackovi za dva niza. `baseUrl` je potreban samo za Nadir s vlastitim hostom ( `/v1` na kraju se tolerira). Pozivi bez ključa slijeću na Nadirovu anonimnu razinu, koja je ograničena brzinom po IP. Pomoću ključa ( [kreiraj ga](https://app.getnadir.com/dashboard/api-keys) ), svaka se odluka bilježi na nadzornoj ploči Nadir. Potpuna postavka i provjera: [getnadir.com/docs/gateway-omniroute](https://getnadir.com/docs/gateway-omniroute/).

Ono što napušta kutiju: tekst zadnje korisničke poruke (prvih 16k znakova), ID-ovi modela kandidata i oznaka `source: "omniroute"` kanala. Nema odziva sustava, povijesti, alata ili zaglavlja.

Ponašanje kod greške je otvoreno: vrijeme čekanja (zadano 2000 ms), non-2xx, nedostupan host, neispravan odgovor ili odabir izvan skupa rješava se odlukom `rules`, a razlog ima prefiks `NadirStrategy: fallback (…)`. Nakon neuspjelog poziva, strategija preskače mrežu na 30 s, tako da prekid košta jedno vremensko ograničenje po 30 s, a ne jedno po zahtjevu. Događaji usmjeravanja javljaju `strategy: "nadir"` samo kada je Nadir stvarno napravio izbor.

**Kada koristiti** : promet mješovite težine na skupu koji obuhvaća razine modela (mali, srednji i granični model), gdje je uvijek granični trošak koji želite smanjiti.

**Alias** : `nadir` (bez pseudonima)

---

#### 7. `decision` — pluggable odlučujući odabir modela

`decision` pita a** odlučujući** koji model u skupu odgovara zahtjevu, zatim sužava skup na taj model i dopušta `rules` da izabere vezu (kvota, zdravlje i cijena i dalje biraju račun). Odlučivač je postavljen u bloku odluke kombinacije — `config.decision` kada se gumbi usmjerivača nalaze na vrhu `config` (ono što nadzorna ploča piše), ili `config.auto.decision` pored `config.auto.routerStrategy`:

| `decider`     | Tko odgovara                                                                                                                  | Potrebe                                        |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `systemone`   | TypeSafe System One (`POST https://api.typesafe.ai/v1/systemone`), zadani model `jev-latest`                                  | `typesafe` veza ili env ključ                  |
| `http`        | vaš vlastiti odlučujući na `baseUrl`: `wire: "systemone"` (`{baseUrl}/v1/systemone`) ili `"openai-chat"` (završeci razgovora) | `baseUrl` + `model`; ključ po izboru           |
| `combo-model` | jedan od vaših modela pružatelja usluga, pozvan u proces kao sudac fuzije                                                     | `model` kao `provider/model` (bez kombinacije) |

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "decision",
    "decision": {
      "decider": "http",
      "baseUrl": "https://decider.example.com",
      "wire": "openai-chat",
      "model": "qwen-small",
      "connectionId": "<stored connection id>",
      "timeoutMs": 2000,
      "minConfidence": 0.6,
      "descriptions": { "gpt-4o-mini": "Quick drafts and short answers" }
    }
  }
}
```

Polja (potvrđena strogom shemom pri spremanju i ponovno u trenutku zahtjeva):

- `decider` — `systemone`, `http` ili `combo-model`.
- `model` — TypeSafe model, model odluke na vašem URL ili `provider/model` poziva kombiniranog modela (do 200 znakova).
- `baseUrl` — samo `http` : `http(s)` URL do 500 znakova, bez vjerodajnica, upita ili fragmenta. URL koji pokazuje na ovaj OmniRoute (povratna petlja + `PORT`) je odbijen.
- `wire` — samo `http` : `systemone` (zadano) ili `openai-chat`.
- `connectionId` — pohranjena veza čiji se ključ koristi (samo unutar dopuštenih veza pozivajućeg ključa API ). Bez toga, `systemone` čita `typesafe` vezu i svaki mrežni odlučujući se vraća na `OMNIROUTE_DECISION_API_KEY`. Ne postoji `apiKey` polje: ključ se nikada ne pohranjuje u kombinaciji.
- `timeoutMs` — cijeli broj, 100–5000, zadano 2000.
- `minConfidence` — 0–1; odgovor s nižim pouzdanjem vraća se na `rules` (odlučivač koji prijavljuje da nema povjerenja računa se kao 0).
- `descriptions` — do 50 unosa (ključ do 300, tekst do 1000 znakova), ključano prema ID-u modela ili `provider/model`; nepostavljeni unosi dobivaju generirani opis ranga troškova.

**Zastava.** `COMBO_DECISION_ROUTER_ENABLED` (zadano `false`) zatvara svaki odlučujući. Dok je isključena, `decision` kombinacija ne čita vjerodajnice, ne upućuje pozive i usmjerava sa `rules`; zapisnik kaže `fallback (disabled)`. Sam pohranjeni ključ nikada ga ne uključuje. To uopće ne utječe na kombinacije bez bloka odluke.

**Što napušta kutiju.** Samo tekst zadnje korisničke poruke (do 8000 znakova; chat/Claude `messages` ili Odgovori `input`) i izbornik ID modela s njihovim opisima. Nikada upit sustava, odgovori `instructions`, alati, povijest, zaglavlja ili podaci o računu. Mrežni pozivi prolaze kroz izlaznu zaštitu pružatelja usluga bez ponovnih pokušaja, bez preusmjeravanja i ograničenjem odgovora od 64 KB. `combo-model` poziv je bez strujanja, bez alata, `temperature: 0`, s proračunom od 256 tokena; odluka započeta unutar poziva odluke se odbija.

**Ponašanje pri neuspjehu** je otvoren za kvar: svaki kvar se rješava odlukom `rules`, a razlog glasi `decision(<decider>): fallback (<reason>)`, sa `<reason>` jednim od `disabled`, `not_configured`, `missing_credential`, `timeout`, `http_error`, `invalid_response`, `out_of_menu`, `refused`, `cooldown`, `network_error`, `recursion`, `low_confidence`, `single_option` ili `no_user_text`. Nakon vremenskog ograničenja, HTTP pogreške ili mrežne pogreške krajnja se točka preskače 30 s. Uspješan izbor glasi `decision(<decider>): selected <model> from <n>; confidence <c> (<rules reason>)`. Nijedan URL, ključ, prompt ili uzvodno tijelo ne dolazi do dnevnika.

Combo builder prikazuje ova polja kada je strategija usmjerivača `decision`, s generiranim opisima kao rezerviranim mjestima i** Test odluka** gumb koji jednom poziva `POST /api/combos/decision-preview` s nespremljenim postavkama (ista oznaka).

**Kada koristiti** : promet s mješovitom težinom gdje želite da razinu izabere po zahtjevu klasifikator koji odaberete, a ne posebno Nadir.

**Alias** : `decision` (bez pseudonima)

---

### Prilagođene strategije usmjerivača

Možete registrirati vlastitu `RouterStrategy` implementaciju putem javnog API:

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "My custom routing strategy";

  select(pool, context) {
    // Your routing logic here
    return {
      provider: pool[0].provider,
      model: pool[0].model,
      strategy: this.name,
      reason: "MyCustomStrategy: ...",
      candidatesConsidered: pool.length,
      finalScore: 1.0,
    };
  }
}

registerStrategy("my-custom", new MyCustomStrategy());
```

Zatim ga upotrijebite:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### Vodič za odabir strategije usmjerivača

| Slučaj upotrebe                | Strategija  | Razlog                                    |
| ------------------------------ | ----------- | ----------------------------------------- |
| Uravnoteženo radno opterećenje | `rules`     | Zadana — uzima u obzir sve faktore        |
| Minimizirajte troškove         | `cost`      | Uvijek bira najjeftinije                  |
| Smanjite latenciju             | `latency`   | Bira najbržeg pouzdanog pružatelja usluga |
| Strogi SLOs                    | `sla-aware` | Filtrira prema p95/error/cost pragovima   |
| Višestruki chat                | `lkgp`      | Ljepljivost sesije                        |
| Mješovita težina               | `nadir`     | Odabire razinu modela po upitu            |
| Vlastiti klasifikator          | `decision`  | Osoba koja odlučuje odabire model         |

SLA-svjesna polja:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

## Prikladnost zadataka

30+ modela ocijenjeno u 6 vrsta zadataka (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`). Podržava uzorke s džokerima (npr. `*-coder` → visoka ocjena za kodiranje).

## Auto Variants Recap

`AutoVariant` u `autoPrefix.ts` izjavljuje** 7 vrijednosti** (`coding`, `fast`, `cheap`, `offline`, `smart`, `lkgp`, `chaos`). Together s golim `auto` (kojima `parseAutoPrefix()` upravlja kao `variant: undefined`) i dva ravna slojna sloja `auto/subscription` i `auto/thrifty` (`FLAT_TIER_OVERLAY_IDS` u `builtinCatalog.ts`), postoje** 10 ravni model IDs** :

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`, `auto/chaos`, `auto/subscription`, `auto/thrifty`

Osim toga, `auto/<category>[:<tier>]` sastavi, model-obitelj IDs (na primjer `auto/claude-opus`) i `auto/best-*` / `auto/pro-*` aliasi u `builtinCatalog.ts` također rješavaju.

## Kako se razine uklapaju u Auto-Combo

Funkcija bodovanja sa 16 faktora (`open-sse/services/autoCombo/scoring.ts`) tretira pripadnost razini kao dva signala: `tierPriority` (0.0476) i `tierAffinity` (0.0476). Pogledajte prethodno navedenu kanonsku [tablicu faktora bodovanja](#how-it-works-persisted-auto-combos) za cijeli skup `DEFAULT_WEIGHTS` — nadjačavanja po paketu (ship-fast/cost-saver/quality-first/offline-friendly) navedena su u tablici „Profili težina po paketu”.

Sama razina **ne** daje automatski prednost Razini 1 — ako je latencija Razine 1 loša ili je omjer troška i kvalitete neoptimalan, pobjeđuje Razina 2. Kako biste nametnuli redoslijed razina, upotrijebite strategiju kombinacije `priority` i rasporedite pružatelje usluga prema razini.

Kako biste dali veliku prednost Razini 1 (pretplata), povećajte težinu `tierPriority`:

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

Definicije razina i klasifikaciju pružatelja usluga potražite u dokumentu [`docs/guides/TIERS.md`](../guides/TIERS.md).

## Testiranje i pokrivenost

### Deterministička matrica odlučivanja o usmjeravanju (`npm run test:combo:matrix`)

`tests/integration/combo-matrix/*.test.ts` dokazuje usmjeravanje** odluka** javnih strategija koje pokriva od kraja do kraja kroz stvarni kombinirani cjevovod s ismijanim uzvodno. Pokrivenost uključuje:

- 18 od 22 javne `ROUTING_STRATEGY_VALUES` strategije (poređene, ponderirane, trošak, kontekst, fuzija, …); `quota-weighted`, `cache-optimized`, `pipeline` i `jev` nisu korišteni matricom i oslanjaju se na vlastite jedinične testove.
- `quota-share` (unutarnji) end-to-end: DRR pravednost + zasićenost deprioritizacija preko stvarnog `selectQuotaShareTarget` spoja (`registerQuotaFetcher` / `setLKGP` / `__setHeadroomSaturationFetcherForTests`).
- `context-relay` univerzalna pokrivenost primopredaje za svaki ciljni broj.

Ovaj paket radi u CI (`test:integration` posao) sa `--test-concurrency=1` i `--test-force-exit` tako da je deterministički i ne zahtijeva aktivne vjerodajnice.

### Gated live smoke (NOT u CI — pravi pružatelji)

| Naredba                                | Što radi                                                                        |
| :------------------------------------- | :------------------------------------------------------------------------------ |
| `npm run test:combo:live`              | Stvarno usmjeravanje u procesu sa `RUN_COMBO_LIVE=1`; snimke uživo OmniRoute DB |
| `npm run test:combo:live:vps`          | HTTP poziva protiv živog OmniRoute poslužitelja (postavi `COMBO_LIVE_BASE_URL`) |
| `npm run test:combo:live:vps:failover` | Isto, s namjernim scenarijima prelaska u grešku                                 |

Ovi dimni testovi provode pravi put žice (combo → provider → completion). Oni su namjerno isključeni iz CI jer zahtijevaju live vjerodajnice i VPS pristup.

---

## Datoteke

| File                                                      | Svrha                                                                                                                              |
| :-------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                  | 16-faktorska bodovna funkcija, `DEFAULT_WEIGHTS`, skupna norma                                                                     |
| `open-sse/services/autoCombo/taskFitness.ts`              | Pregled fitnessa zadatka modela ×                                                                                                  |
| `open-sse/services/autoCombo/engine.ts`                   | Logika odabira, bandit, limit proračuna                                                                                            |
| `open-sse/services/autoCombo/selfHealing.ts`              | Isključenje, sonde, način incidenta                                                                                                |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 profila težine (brza isporuka, ušteda troškova, kvaliteta na prvom mjestu, izvanmrežni, pouzdanost na prvom mjestu, način kaosa) |
| `open-sse/services/autoCombo/autoPrefix.ts`               | `auto/` prefiks parser + 6 varijanti                                                                                               |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Gradi `AutoComboConfig` u memoriji iz živih veza                                                                                   |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Testna kuka za ismijavanje registra pružatelja usluga                                                                              |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES` (22 strategije)                                                                                          |
| `src/sse/handlers/chat.ts`                                | Integracija: auto-prefiks kratki spoj                                                                                              |
