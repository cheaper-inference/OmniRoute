# 🗜️ Prompt Compression Guide — OmniRoute (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Economisiți automat 15-95% din contextul eligibil. Pentru o prezentare rapidă, consultați [secțiunea despre compresie din README](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Prezentare generală

OmniRoute implementează un flux modular de compresie a prompturilor, care rulează **proactiv** înainte ca solicitările să ajungă la furnizorii din amonte. Astfel, economisirea tokenurilor are loc în mod transparent — nu sunt necesare modificări ale fluxului dvs. de lucru.

```
Solicitarea clientului
  → Selectorul strategiei de compresie
    → Suprascriere prin combinație? → Se utilizează setarea combinației
    → Prag de declanșare automată? → Se utilizează modul automat
    → Mod implicit? → Se utilizează setarea globală
    → Dezactivat? → Se omite compresia
  → Modul de compresie selectat
    → Dezactivat: Fără compresie
    → Lite: Curățare sigură a spațiilor și formatării (~15%)
    → Standard: Eliminarea cuvintelor de umplutură în stil telegrafic (~30%)
    → Aggressive: Învechirea istoricului + rezumare (~50%)
    → Ultra: Eliminare euristică + reducerea blocurilor de cod (~75%)
    → RTK: Filtrarea rezultatelor terminalului/instrumentelor în funcție de comandă (interval de 60-90% în amonte)
    → Stacked: Flux ordonat cu mai multe motoare, de obicei RTK urmat de Caveman (interval eligibil de 78-95%)
  → Solicitare comprimată → Furnizor
```

---

## Moduri de comprimare

### Dezactivat

Nu se aplică nicio comprimare. Toate mesajele sunt transmise nemodificate.

### Modul Lite (~15% economii, latență <1 ms)

Cel mai sigur mod — curățarea formatării. Trunchierea rezultatelor instrumentelor implică pierderi, astfel încât ruta implicită (fără optarea `allow-lossy`, `engine:lite` sau a unei combinații denumite) rulează lite cu
`compressToolResults: false`: rezultatele anterioare ale instrumentelor ajung la furnizor nemodificate.

| Tehnică                  | Descriere                                                                                                                  |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `collapseWhitespace`     | Combină liniile goale consecutive și spațiile de la sfârșitul liniilor                                                     |
| `dedupSystemPrompt`      | Elimină mesajele de sistem duplicate                                                                                       |
| `compressToolResults`    | Trunchiază rezultatele anterioare ale instrumentelor la limita lite (cu pierderi: doar cu optarea explicită a solicitării) |
| `removeRedundantContent` | Elimină instrucțiunile repetate                                                                                            |
| `replaceImageUrls`       | Scurtează URI-urile de date ale imaginilor codificate în base64                                                            |

**Recomandat pentru:** Utilizare permanentă, fluxuri de lucru critice pentru siguranță.

### Modul Standard (~30% economii)

Inspirat de [Caveman](https://github.com/JuliusBrussee/caveman) — elimină cuvintele de umplutură și formulările verbose, păstrând sensul:

- Elimină cuvintele de umplutură („please”, „I think”, „basically”, „actually”)
- Condensează formulările verbose („in order to” → „to”, „as a result of” → „because”)
- Elimină exprimările politicoase ezitante („Would you mind...”, „If you could possibly...”)
- Peste 30 de reguli regex optimizate pentru solicitări de programare

**Recomandat pentru:** Fluxuri zilnice de dezvoltare, echipe atente la costuri.

### Modul Aggressive (~50% economii)

Gestionare inteligentă a istoricului pentru sesiuni lungi:

- **Îmbătrânirea mesajelor** — mesajele mai vechi sunt comprimate progresiv
- **Comprimarea rezultatelor instrumentelor** — rezultatele lungi sunt trunchiate sau elidate (primele/ultimele linii,
  filtrarea liniilor potrivite, compactarea cheilor JSON)
- **Gărzi pentru integritatea structurală** — asigură păstrarea consecvenței perechilor `tool_use` + `tool_result`
- **Conștientizarea ferestrei de context** — respectă limitele de tokeni pentru fiecare model

**Recomandat pentru:** Sesiuni extinse de depanare, baze de cod voluminoase.

### Modul Ultra (~75% economii)

Comprimare maximă pentru scenarii critice din punct de vedere al numărului de tokeni:

- **Eliminare euristică** — eliminarea tokenilor din proză pe baza unui scor
- **Păstrarea structurii** — blocurile de cod delimitate, codul inline, URL-urile și identificatorii sunt marcate și reasamblate textual, fără a fi vreodată eliminate
- **Nivel SLM opțional** — un model local mic poate rafina eliminarea atunci când este configurat
- Independent de modul Aggressive: nu execută îmbătrânirea mesajelor, comprimarea rezultatelor instrumentelor sau sumarizatorul de rezervă (doar o eroare la nivelul SLM poate direcționa o trecere de rezervă prin aggressive)

**Recomandat pentru:** Situațiile în care limitele de context sunt atinse în mod repetat.

### Modul RTK (interval upstream de 60–90%)

Modul RTK este optimizat pentru rezultatele verbose ale instrumentelor care apar în sesiunile agenților de programare:

- Detectează clase de comenzi/rezultate precum `git status`, `git diff`, `git log`, executori de teste,
  compilări TypeScript/Vite/Webpack, ESLint/Biome/Prettier, audituri/instalări npm, jurnale Docker, rezultate de infrastructură
  și rezultate generice de shell
- Aplică pachete de filtre JSON din `open-sse/services/compression/engines/rtk/filters/`
- Importă filtre de schemă TOML RTK v1 din fișierele `filters.toml` ale proiectului sau globale, cu validare prin teste inline și controlul încrederii pentru fișierele proiectului
- Include 56 de filtre integrate cu mostre de verificare inline
- Elimină secvențele de control ANSI, barele de progres, liniile repetate și zgomotul care nu necesită acțiune
- Păstrează eșecurile, erorile, avertismentele, fișierele modificate, rezumatele și partea finală a rezultatelor lungi
- Acceptă filtre de proiect controlate prin încredere, filtre globale și recuperarea opțională a rezultatelor brute redactate

**Recomandat pentru:** Sesiuni de agenți cu transcrieri de shell, compilări, teste, git, grep și rezultate de fișiere.

### Modul Stacked (interval eligibil de 78–95%)

Modul Stacked rulează mai multe motoare de comprimare într-o ordine deterministă. Conducta implicită este:

```txt
RTK -> Caveman
```

Această ordine păstrează mai întâi rezultatele terminalului/instrumentelor într-o formă compactă, apoi aplică condensarea semantică Caveman promptului în limbaj natural rămas. Conductele Stacked pot fi configurate global sau prin combinații de comprimare atribuite combinațiilor de rutare.

**Recomandat pentru:** Contexte mixte cu jurnale voluminoase ale instrumentelor și instrucțiuni umane sau rezumate ale asistentului.

## Calculul economiilor din sursele din amonte

OmniRoute documentează economiile obținute prin compresie din două surse: benchmarkurile proiectelor din amonte și
compoziția propriilor motoare OmniRoute.

| Sursă   | Valoarea din README-ul proiectului din amonte utilizată aici                                                                                                   |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | cu `~75%` mai puțini tokeni de ieșire, economii medii de `65%` la ieșire în benchmarkuri, interval de `22-87%` și instrument de compresie a intrării de `~46%` |
| RTK     | economii de `60-90%` pentru ieșirea comenzilor; sesiune exemplu de `~118,000 -> ~23,900` tokeni sau economii de `79.7%` (`~80%`)                               |

Pentru sarcinile utile suprapuse ale instrumentelor/contextului, combinația implicită OmniRoute înlănțuie motoarele:

```txt
RTK -> Caveman
```

Economiile combinate sunt multiplicative, nu aditive:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Valoarea de `78-95%` se aplică atunci când atât RTK, cât și Caveman pot reduce aceeași sarcină utilă de intrare/context.
Modul de ieșire pentru răspunsuri Caveman este separat: când este activat, utilizați economiile proprii ale Caveman pentru ieșire (`65%`
în medie, valoare principală de `~75%`, interval de `22-87%`). Economiile totale la facturare depind de combinația dintre prompturi și ieșiri.

### Ce înseamnă de fapt „eligibil”

Intervalul principal de 15-95% este real, dar se aplică numai conținutului **redundant sau prolix** — linii de
eroare repetate, un jurnal de compilare care repetă excesiv același avertisment, un rezultat supradimensionat de la `grep`/citirea unui fișier. Acest lucru
**nu** înseamnă că fiecare solicitare economisește atât de mult.

Verificat empiric (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): o
rulare `stacked` (RTK + Caveman) asupra unui bloc `tool_result` în format Anthropic, care conținea 300 de linii
de eroare identice, a produs **economii de tokeni de 95.93% / economii de caractere de 96.26%** — exact în intervalul
promovat. Însă aceeași conductă, rulată asupra unei ieșiri normale și non-redundante a instrumentului (o listă curată de rezultate `grep`,
citirea unui fișier scurt, text conversațional obișnuit), produce în mod corect **economii aproape nule**, deoarece
nu există nimic repetitiv de eliminat, iar `validateCompression()` (`validation.ts`) refuză să livreze o
rescriere care ar elimina sau modifica blocuri de cod, URL-uri, titluri, versiuni sau identificatori de constante scriși INTEGRAL CU MAJUSCULE.

Acesta este un comportament sigur și previzibil, nu o eroare: o sesiune de programare care în principal citește/caută cu grep în fișiere curate va
înregistra economii totale modeste chiar și cu compresia activată complet, în timp ce o sesiune care întâlnește o buclă cu erori
sau un linter foarte prolix va beneficia de întregul interval de 78-95% pentru traficul respectiv. Nu folosiți procentul
redus al economiilor agregate dintr-o singură sesiune drept dovadă că funcția de compresie este configurată greșit — verificați mai întâi dacă
ieșirea instrumentului de bază era într-adevăr redundantă.

---

## Vizualizarea economiilor de tokeni

```
Fără compresie:      47K tokeni trimiși către LLM
Cu Lite:             40K tokeni trimiși         (15% economisiți — sigur, activ permanent)
Cu Standard:         33K tokeni trimiși         (30% economisiți — reguli caveman-speak)
Cu Aggressive:       24K tokeni trimiși         (50% economisiți — învechire + rezumare)
Cu Ultra:            12K tokeni trimiși         (75% economisiți — eliminare euristică)
Cu RTK:              19K-5K tokeni trimiși      (60-90% economisiți pentru ieșirea comenzilor/instrumentelor)
Cu Stacked:          10K-2.5K tokeni trimiși    (interval eligibil RTK+Caveman de 78-95%)
```

---

## Configurare

### Tablou de bord

Navigați la `Dashboard → Context & Cache`:

- **Caveman** — selectarea modului, pachete de limbă, previzualizare și valori implicite globale
- **RTK** — previzualizarea filtrării comenzilor, setările de siguranță RTK și catalogul de filtre
- **Compression Combos** — pipeline-uri de motor denumite, atribuite combinațiilor de rutare
- **Auto-Trigger Threshold** — activează automat comprimarea când numărul de tokenuri depășește pragul

### Suprascriere per combinație

În `Dashboard → Context & Cache → Compression Combos`, atribuiți o combinație de comprimare unei
combinații de rutare:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Astfel puteți utiliza comprimarea în stivă pentru furnizorii gratuiți/de programare, păstrând în
același timp modul lite pentru abonamentele plătite.

Această atribuire de tip „Suprascriere per combinație” este un control diferit de suprascrierea
**modului de comprimare al combinației de rutare** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses —
schema câmpului acceptă, de asemenea, `rtk`, `stacked` și `omniglyph`) — această suprascriere nu
selectează un pipeline de comprimare denumit; setează doar câmpul `compressionMode`, consultat de
`resolveCompressionPlan`. Poate fi setată fie pe cardul combinației (`Dashboard → Combos`), fie,
începând cu #6760, per combinație de rutare în lista „Atribuire rutării” din
`Dashboard → Context & Cache → Compression Combos`, chiar lângă caseta de selectare pentru
atribuirea pipeline-ului documentată mai sus. Ambele interfețe persistă prin același endpoint
`PUT /api/combos/{id}`.

### Suprascriere per solicitare

Trimiteți antetul de solicitare `x-omniroute-compression` pentru a suprascrie planul de comprimare
pentru o singură solicitare. Acesta are cea mai mare prioritate — prevalează asupra suprascrierii
combinației de rutare, profilului activ, declanșării automate și valorii implicite din panou.
Valorile necunoscute sunt ignorate (solicitarea nu este niciodată respinsă), iar comutatorul
principal global are în continuare prioritate: când comprimarea este dezactivată global, antetul
nu o poate activa. Valori:

| Valoare       | Efect                                                                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `off`         | Fără comprimare pentru această solicitare.                                                                                            |
| `default`     | Profilul Default derivat din panou (ignoră profilul activ). Motoarele cu pierderi rămân dezactivate.                                  |
| `safe`        | La fel ca atunci când antetul este omis.                                                                                              |
| `allow-lossy` | Păstrează planul de operator al acestei solicitări, inclusiv rezumatele, filtrele de relevanță și rescrierile de stil.                |
| `engine:<id>` | Un singur motor când este activat, de exemplu `engine:rtk`. Aceasta este activarea explicită per solicitare pentru motorul respectiv. |
| `<combo>`     | O combinație denumită, identificată mai întâi după nume (fără diferențiere între litere mari și mici), apoi după id.                  |

Fără `allow-lossy`, `engine:<id>` sau o combinație denumită, motoarele cu pierderi nu sunt aplicate.
Când o valoare Default, o declanșare automată sau o suprascriere de rutare cu pierderi este
retrogradată, OmniRoute păstrează pașii fără pierderi recunoscuți din pipeline-ul în stivă
configurat, în ordinea configurată. Revine la `session-dedup → lite` numai atunci când niciun pas
fără pierderi configurat nu rămâne disponibil.

Previzualizarea **Effective pipeline** din panoul Settings afișează planul obișnuit în starea
implicită. Când poate rula o declanșare automată, aceeași previzualizare afișează și pipeline-ul
efectiv condiționat, astfel încât panoul și rezoluția runtime fără antet să rămână sincronizate.

Planul aplicat este returnat în antetul de răspuns
`X-OmniRoute-Compression: <mode>; source=<source>`, unde `<source>` este una dintre valorile
`request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` sau `off`.

### API

```bash
# Obține setările de comprimare
curl http://localhost:20128/api/settings/compression

# Actualizează setările de comprimare
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Previzualizează un payload RTK/stacked specific
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Listează pachetele de filtre RTK
curl http://localhost:20128/api/context/rtk/filters

# Testează direct RTK cu metadate opționale despre comandă
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Ce este protejat

Motorul de compresie **păstrează întotdeauna:**

- ✅ Blocurile de cod (delimitate și inline)
- ✅ URL-urile și căile fișierelor
- ✅ Structurile JSON și datele structurate
- ✅ Identificatorii și tokenurile tehnice protejate
- ✅ Expresiile matematice
- ✅ Definițiile apelurilor de instrumente/funcții
- ✅ Prompturile de sistem (în modul lite)

Recuperarea ieșirii brute RTK maschează cheile API uzuale, tokenurile bearer, tokenurile Slack, cheile de acces AWS,
parolele, tokenurile și secretele înainte ca orice date să fie stocate.

---

## Statistici de compresie

Fiecare cerere comprimată include statistici în jurnalele serverului:

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## Foaia de parcurs a etapelor

| Etapă    | Moduri                                                                                                                                                              | Stare     |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| Etapa 1  | Off, Lite                                                                                                                                                           | ✅ Livrat |
| Etapa 2  | Standard, Aggressive, Ultra                                                                                                                                         | ✅ Livrat |
| Etapa 3  | RTK, Stacked, Combinații de compresie                                                                                                                               | ✅ Livrat |
| Etapa 4  | Stiluri de ieșire, Ultra de nivel SLM, infrastructură de evaluare                                                                                                   | ✅ Livrat |
| Etapa 4C | Buget adaptiv de context („selector”) — motor de calcul + API (`contextBudget` pe `PUT /api/settings/compression`) + comenzi pentru mod/politică în tabloul de bord | ✅ Livrat |

---

## Mulțumiri

Regulile de compresie ale modului Standard sunt inspirate de **[Caveman](https://github.com/JuliusBrussee/caveman)**, creat de **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ peste 51K) — proiectul viral „de ce folosi multe tokenuri când puține tokenuri rezolvă treaba”. Caveman raportează cu `~75%` mai puține tokenuri de ieșire, o economie medie de `65%` a ieșirii în benchmarkuri, un interval de `22-87%` pentru ieșire și un instrument de compresie a intrării de `~46%`.

Modul RTK este inspirat de **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)**, creat de **[RTK AI](https://github.com/rtk-ai)** — proiectul de înaltă performanță pentru comprimarea ieșirilor comenzilor, destinat filtrării ieșirilor din terminal, builduri, teste, git și instrumente. RTK raportează economii de `60-90%`, iar sesiunea exemplificată în README arată o economie de `~80%`.

---

## Sisteme avansate de compresie

Dincolo de cele 7 moduri descrise mai sus (sursa acceptă și modurile `codex-responses` și `omniglyph`, pe care acest ghid nu le acoperă), secțiunile de mai jos acoperă caracteristici care funcționează în interiorul sau alături de acele moduri: Comprimarea rezultatului instrumentului și îmbătrânirea progresivă sunt pașii 1 și 2 ai motorului agresiv (modul agresiv și un pas `aggressive` al unui pipeline stacked modeline), cum funcționează stacked pipeline, Compression-ul stacked, este modul de rulare a stacked Pipeline. downgrade `aggressive` și `ultra` la `standard` pentru furnizorii de stocare în cache în timp ce compresia este activată, iar modul de ieșire Caveman și stilurile de ieșire sunt instrucțiuni opt-in de prompt de sistem, dezactivate în mod implicit, care modelează ieșirea modelului în loc să comprima cererea.

### Compresie cache-aware

Unii furnizori (cum ar fi Anthropic cu cache prompt) acceptă** stocarea în cache promptă** , care le permite să memoreze în cache părți ale promptului pentru a reduce costurile și latența. Când stocarea în cache este activată, compresia agresivă poate de fapt** rănit** performanță deoarece modifică jetoanele stocate în cache, invalidând memoria cache.

Modulul `cachingAware.ts` rezolvă acest lucru prin** detectarea contextului de cache** şi** ajustarea strategiei de compresie** în consecinţă.

#### Cum funcționează

1. **Detectează contextul de cache** — Scanează corpul cererii pentru markeri `cache_control`
2. **Identificați furnizorii de cache** — Verifică dacă furnizorul țintă acceptă stocarea în cache
3. **Ajustați strategia** — Degradează `aggressive`/`ultra` la `standard` pentru furnizorii de cache
4. **Omite promptul de sistem** Solicitările de sistem — sunt de obicei stocate în cache, așa că nu le comprimați

Asistentul de strategie returnează și un steag `deterministicOnly`, dar generatorul de plan consumă doar strategia — nimic în aval nu citește steagul astăzi.

#### Exemplu de cod

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Cache marker
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Când să utilizați

Compresia cache-aware este** mereu aprins** — nu este nevoie de configurare. Se activează ori de câte ori compresia este activată și furnizorul țintă acceptă memorarea în cache promptă (Anthropic, OpenAI, etc.); markerii `cache_control` expliciți nu sunt necesari — doar un furnizor de cache declanșează downgrade-ul, iar markerii singuri nu o fac niciodată (detecția markerului alimentează telemetria cache, nu decizia strategiei).

OpenRouter contează ca furnizor de stocare în cache numai pentru modelele `anthropic/*` : solicitările de cod Claude își păstrează punctele de întrerupere `cache_control` (cel mult 4) și garda protejează prefixul, în timp ce orice altă familie OpenRouter (`openai/`, `google/`, `qwen/`, …) rămâne nepăzită.

### Îmbătrânire progresivă

Conversațiile lungi acumulează multe rânduri de mesaje, dar rândurile mai vechi devin mai puțin relevante. Modulul `progressiveAging.ts`** degradează mesajele prin distanța de viraj** (distanța măsurată de la sfârșitul conversației). Cu valorile implicite livrate (`verbatim: 2, light: 2, moderate: 3`):

- **Ultimele 2 viraje (distanta ≤ 2)** : Păstrat textual
- **Distanța 3** : compresie Caveman (înlăturarea umpluturii)
- **Distanța 4 +** : Mesajele asistentului rezumate; mesajele utilizatorului reduse la prima linie, limitată la 120 de caractere; alte roluri neatinse. Solicitările de sistem, mesajele deja vechi și cel mai recent mesaj de utilizator sunt păstrate întotdeauna textual, indiferent de distanță. Nimic nu este abandonat definitiv, iar banda `light` este inaccesibilă cu valorile implicite livrate (`light` este egal cu `verbatim`).

#### Exemplu de cod

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 more turns ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // last 3 turns: verbatim
  light: 8, // distance <= 8: lite compression
  moderate: 20, // distance <= 20: caveman compression
  fullSummary: 5, // required by the type, not read by the banding code
  // distance > 20: summarized (assistant) / first line kept (user)
});

// saved = number of tokens saved
```

#### Când să utilizați

Îmbătrânirea progresivă este** mereu aprins** pentru modul `aggressive` — este pasul 2 din `compressAggressive()`. Modul Ultra nu îl rulează. Este deosebit de eficient pentru:

- Sesiuni de codare de lungă durată
- Conversații de mai multe zile
- Fluxuri de lucru agentice cu multe apeluri de instrumente

### Modul de ieșire Caveman

Se adaugă modul de ieșire Caveman** instrucțiuni prompte de sistem** care solicită modelului însuși pentru ieșire concisă — nivelul `lite` solicită răspunsuri concise care păstrează propozițiile complete, `full` îi cere să „răspundă concis ca un om inteligent al peșterilor”, iar `ultra` cere ieșire telegrafică; instrucțiunile cer doar, nu pot garanta. Solicitările le primesc prin `applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`): `open-sse/handlers/chatCore.ts` rezolvă mai întâi selecția cu shim-ul back-compat (`resolveOutputStyleSelection()` în `open-sse/services/compression/outputStyles/backCompat.ts`), care, în timp ce `outputStyles` este gol, mapează un `cavemanOutputMode` activat la stilul de ieșire `terse-prose` la `cavemanOutputMode.intensity` (vezi Back-compat mai jos); o selecție `outputStyles` nevide este utilizată așa cum este, iar `cavemanOutputMode.enabled` și `intensity` nu au nici un efect, în timp ce comutatorul său `autoClarity` încă se aplică. `outputMode.ts` deține textele de instrucțiuni (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), bypass-ul de conținut și asistentul de plasare pe care îl folosește injecția; propriul injector `applyCavemanOutputMode()` nu are apelant de producție.

#### Cum funcționează

Acest mod nu comprimă intrarea. Acesta adaugă un bloc de instrucțiuni la promptul de sistem (consultați Cum funcționează injecția de mai jos), iar orice mod de compresie de intrare selectat pentru cerere încă rulează ulterior, pe corpul care transportă acum blocul. Înaintea clauzei privind limitele partajate cu care se termină fiecare nivel, nivelul `full` în limba engleză spune:

> "Răspunde concis ca un om inteligent al cavernelor. Aruncă articole (a/an/the), filler (just/really/basically/actually/simply), plăcere, acoperire. Fragmente OK. Sinonime scurte (mare, nu extins, corectare, nu implementare). Păstrează toată substanța tehnică, codul, erorile, URLs, identificatorii exacte."

Acest lucru funcționează deosebit de bine pentru:

- Generarea codului (ieșire terser = mai puține jetoane)
- Întrebări și răspunsuri rapide (nu este nevoie de explicații elaborate)
- Procesare în loturi (maximizarea debitului)

#### Când să utilizați

Modul de ieșire Caveman este** înscriere** . Cu compresia activată (`enabled: true`, comutatorul principal de pe pagina Setări de compresie), porniți-o cu `cavemanOutputMode.enabled`; `intensity` alege `lite`, `full` sau `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Un combo de compresie** Mod de ieșire** toggle (`outputMode`, nivel în `outputModeIntensity`) setează același comutator pentru cererile cărora li se aplică combo, iar instrumentul `omniroute_set_compression_engine` MCP îl scrie prin argumentul său boolean `outputMode`. O selecție `outputStyles` care nu este goală are prioritate față de acest comutator. În tabloul de bord, activarea** proză concisă** stilul de ieșire injectează același bloc (vezi Stiluri de ieșire mai jos).

### Stiluri de ieșire (catalog)

Modul de ieșire Caveman de mai sus este** moștenire un singur stil cale** . Faza 4 a generalizat-o într-un catalog de stiluri de ieșire componabile: `OUTPUT_STYLE_CATALOG` în `open-sse/services/compression/outputStyles/catalog.ts`. Fiecare stil este o instrucțiune de tip prompt de sistem care solicită modelului însuși rezultate mai ieftine; stilurile pot fi activate împreună și sunt injectate în ordinea catalogului.

| Stil                                    | `id`            | Ce face                                                                                                                                                                                                                                                                        | Limbi de instruire                            |
| --------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| proză concisă                           | `terse-prose`   | Drop filler/articles/hedging; păstrați exact substanța tehnică. Același text ca și modul de ieșire caveman vechi (referit, nu reintrodus).                                                                                                                                     | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Mai puțin cod                           | `less-code`     | scara YAGNI : cea mai mică schimbare de lucru, fără abstracții nesolicitate.                                                                                                                                                                                                   | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Coada de cal (dezvoltator senior leneș) | `ponytail`      | „Cel mai bun cod este codul niciodată scris”: reutilizați rescrierea >, simptomul > cauza principală, cel mai scurt difer de lucru.                                                                                                                                            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Am ADHD (în primul rând acțiunea)       | `i-have-adhd`   | Prima acțiune (command/path/snippet înainte de proză), pași mărginiți numerotați, ONE concret pasul următor, fără preamble/recap/closers. Adaptat din [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT).                                                       | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Filtru antislop UI                      | `antislop-ui`   | Fiecare tehnică vizuală trebuie să treacă un test de scop (ierarhie, identitate, lizibilitate); fără gradients/glass/glow implicit, paletă limitată, fără machete de șablon. Ambele stiluri anti-slop adaugă o limită fără controale fără moarte / fără revendicări fabricate. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Copie antislop și filtru uman           | `antislop-copy` | Copie specifică (fără liniuță em, CTAs generic, cuvinte la modă, închideri chatbot, fapte inventate) plus reguli pentru oameni: contrast WCAG AA, focalizare vizibilă, acoperire tastatură, stări empty/loading/error, reflow mobil.                                           | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Terse CJK (文言)                        | `terse-cjk`     | răspuns `full`/`ultra` în chineză clasică (文言); `lite` cere doar răspunsuri scurte, fără cuvinte funcționale, plăcere sau înfrumusețare.                                                                                                                                     | zh (locale-gated, vezi mai jos)               |

Fiecare stil include trei niveluri de intensitate — `lite`, `full`, `ultra` — și fiecare nivel se termină cu clauza de limite partajate (`SHARED_BOUNDARIES` în `outputMode.ts`), care păstrează blocurile de cod, căile fișierelor, comenzile, erorile și URLs exact. Textele de nivel `terse-prose` și `terse-cjk` adaugă identificatori la acea listă.

`terse-cjk` este legat de local la `zh` în două locuri. Pagina Setări de compresie listează rândul său numai atunci când limba UI din tabloul de bord este chineză (`zh-CN` sau `zh-TW`), iar `applyOutputStyles()` o injectează numai atunci când limba rezolvată a cererii (consultați Selectarea limbii de mai jos) este `zh`. Ascunderea rândului nu șterge o selecție `terse-cjk` salvată: setările API acceptă orice ID de stil, iar salvarea altor stiluri pe pagină îl păstrează. La momentul solicitării, verificarea limbii `applyOutputStyles()` este singura poartă locală.

#### Cum funcționează injecția

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) rezolvă selecția în comparație cu catalogul (ID-urile necunoscute și stilurile nepotrivite în funcție de localitate sunt eliminate, niciodată o eroare; o selecție care se rezolvă la niciun stil lasă corpul neschimbat, omis ca `no_styles`), concatenează instrucțiunile selectate în ordinea catalogului, adaugă clauza limitelor** dată** (plus clauza de siguranță, `SAFETY_BOUNDARIES` sau traducerea acesteia, când este selectat `less-code` sau `ponytail` ) și începe blocul cu un singur marker de idempotitate (`[OmniRoute Output Styles]`), deci re-aplicarea este o opțiune fără opțiune. Când limba rezolvată (consultați Selectarea limbii de mai jos) are o traducere, instrucțiunea localizată este injectată în loc de engleză.

On a body with a non-empty `messages` array, the idempotency check runs before the content bypass: when the `[OmniRoute Output Styles]` marker is already in the top-level `system` field (a string or a content-block array) or in a system message with string content, the body is left unchanged as `already_applied` and no keyword check runs. Otherwise a content bypass (`shouldBypassCavemanOutputMode()` in `open-sse/services/compression/outputMode.ts`) checks the text of the last three messages, whatever their role, and skips the styles for the whole turn when that text matches its security, irreversible-action or clarification keywords, or an order-sensitive sequence: `first`, `then`, `after that`, `before`, `rollback` or `backup` followed within 240 characters by `delete`, `drop`, `migrate`, `deploy` or `release`. The bypass runs while the **Auto-Clarity Bypass** toggle (`cavemanOutputMode.autoClarity`, on by default) is on; turning the toggle off skips the keyword check.

Când bypass-ul permite trecerea, `placeSystemInstruction()` (același fișier), care nu creează niciodată un nou `messages[0]`, plasează blocul în primul dintre acestea pe care îl găsește:

1. Un mesaj de sistem principal cu conținut șir: blocul este atașat după text.
2. Câmpul `system` de nivel superior: blocul este adăugat după textul unui șir sau adăugat ca un bloc de text nou la o matrice de blocuri de conținut.
3. Primul mesaj de sistem ulterior cu conținut șir: blocul este adăugat după textul său.
4. Nimic din cele de mai sus: blocul intră într-un nou mesaj de sistem la sfârșitul `messages`.

Pe un corp fără o matrice `messages` (sau cu una goală), nu se execută ocolire a conținutului și nu este consultat un câmp `system` de nivel superior. Blocul este atașat după textul unui câmp `instructions` șir, cu excepția cazului în care acel câmp conține deja markerul `[OmniRoute Output Styles]`, caz în care corpul rămâne neschimbat ca `already_applied`. Când corpul nu are un câmp `instructions` șir, dar poartă `input` (un șir sau o matrice), blocul devine `instructions`, înlocuind orice valoare non-șir deținută de câmpul respectiv. Un corp fără un câmp `instructions` șir și nici un șir sau o matrice `input` este lăsat neschimbat și omis ca `no_messages`.

#### Cum se activează

În tabloul de bord:** Context de compresie → Setări de compresie** (`/dashboard/context/settings`), Secțiunea stiluri de ieșire: un rând pe stil cu o comutare on/off și un selector de nivel. Stilurile se injectează în timp ce compresia în sine este activată (comutatorul principal al paginii, `enabled`). The** Bypass auto-claritate** comutatorul este pe** Omul cavernelor** pagina (`/dashboard/context/caveman`), în sa** Mod de ieșire** card. Programatic, configurația de compresie persistă selecția ca:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Back-compat: în timp ce `outputStyles` este gol, setarea `cavemanOutputMode.enabled` moștenită se mapează la `terse-prose` la `cavemanOutputMode.intensity`. Blocul începe apoi cu markerul `[OmniRoute Output Styles]`, unde injectorul `applyCavemanOutputMode()` moștenit a scris `[OmniRoute Caveman Output Mode]`. Sub marcator, textul se potrivește cu injecția moștenire în en, pt-BR, es, de, fr, it, ru, id și vi; în ja și zh are un spațiu suplimentar înaintea clauzei limite. `terse-prose` se traduce în pt-BR, es, de, fr, it, ru, zh, ja, id și vi, deci o solicitare a cărei limbă rezolvată este `hu` primește textul în limba engleză în care injectorul moștenit îl folosea pe cel maghiar.

Selectarea limbii în stilul de ieșire (`resolveOutputStyleLanguage()` în `outputStyles/apply.ts`): cu `languageConfig.enabled` activat, `autoDetect` eșantionează cel mai recent mesaj utilizator din matricea `messages` a cererii care are text (conținutul șirului sau `text` -ul părților sale de conținut) și rulează detectorul motorului Caveman (`detectCompressionLanguage()`) pe acesta. Detectorul returnează `zh` pentru text cu caractere Han și fără kana; în caz contrar, returnează oricare dintre `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` și `id` are cele mai multe potriviri de indicii, iar `en` când niciunul nu se potrivește cu textul — pe care nu îl poate clasifica devine engleză, deși stilul `defaultLanguage` nu este niciodată detectat și `vi` `vi`. Un corp Responses API își păstrează turele în `input`, care nu este eșantionat, deci devine `defaultLanguage`, apoi engleză. Când niciun mesaj utilizator din `messages` nu are text sau cu `autoDetect` dezactivat, se aplică `defaultLanguage`, apoi engleză. Cu `languageConfig.enabled` dezactivat, limba este engleza — cu excepția cazului în care se aplică un combo de compresie pentru cerere (un combo atribuit combo-ului de rutare al cererii sau combo-ul implicit de compresie chatCore revine pentru pipeline-ul stivuit încorporat): aplicarea unui combo activează `languageConfig.enabled` pentru acea cerere și setează `defaultLanguage` valoarea din pachetul de limbă salvată (dacă este cea a combo-ului). pachete, în caz contrar primul pachet al combo-ului, care este implicit `en`), în timp ce `autoDetect` salvat (activat în mod implicit) încă se aplică. Motorul de intrare Caveman își alege limba pachetului de reguli în mod diferit — per parte de text și, cu detectarea automată dezactivată, este activată `enabledPacks`.

Matricea limbajului stil × este fixată de `tests/unit/compression/output-styles-i18n-matrix.test.ts`: fiecare stil de catalog are nevoie de o intrare în `BASELINE_LANGUAGES` testului; un stil care nu este limitat în funcție de localitate trebuie să livreze o traducere pt-BR ( `terse-cjk` în funcție de localitate este exceptat de la această regulă), cu excepția cazului în care este listat în `KNOWN_ENGLISH_ONLY`, care poate conține doar stiluri fără traduceri deloc — un stil listat care are orice traducere eșuează testul; iar un stil eșuează testul atunci când pierde o limbă pe care o listează intrarea `BASELINE_LANGUAGES`. Pentru a adăuga un stil, consultați [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Comprimarea rezultatului instrumentului

`compressToolResult()` în `open-sse/services/compression/toolResultCompressor.ts` comprimă textul rezultat al instrumentului cu** 5 strategii** . Le încearcă în această ordine, iar prima strategie activată a cărei verificare se potrivește cu conținutul decide rezultatul:

1. **`fileContent`** : conținut de 3 sau mai multe rânduri în care cel puțin o linie, ignorând indentația de început, începe cu `import `, `export `, `function `, `class `, `const `, `let `, `var ` sau `return ` (cuvântul cheie plus un spațiu), sau cu `if`, `for` sau `while`, urmat de `(`, urmat de 2 sau ultimul ` (` 2. 5 linii, cu mijlocul elidat marcat.
2. **`grepSearch`** : conținutul cu cel puțin o linie de forma `<path>:<digits>:`, unde textul dinaintea primelor două puncte nu are spații albe, păstrează doar acele linii, cel mult 30, urmate de un număr de potriviri ulterioare și de lista fișierelor potrivite; orice altă linie este abandonată. O astfel de linie este suficientă pentru a declanșa strategia, așa că contează și o linie de jurnal care începe cu un marcaj de timp, cum ar fi `12:30:45`.
3. **`shellOutput`** : ieșirea care conține o secvență ANSI CSI (`ESC[` apoi cifre sau punct și virgulă apoi o literă, ca în codurile de culoare) sau un `$` urmat de spații albe oriunde în text pierde acele secvențe (alte escape, cum ar fi `ESC[?25l` sau o secvență de titlu de fereastră OSC, sunt păstrate) și își păstrează liniile repetate, cu ultimele 50 linii consecutive. Deoarece această verificare rulează înainte de `json` și `errorMessage`, JSON sau ieșirea de eroare care conține un astfel de `$` nu le ajunge niciodată când `shellOutput` este activat.
4. **`json`** : o sarcină utilă JSON de peste 2.000 de caractere care începe cu `{` sau `[` (după spații albe opționale) și analize este rezumată: o matrice de mai mult de 7 elemente își păstrează primele 5 și ultimele 2 elemente și numărul total, iar un obiect își păstrează primele 20 de chei, cu fiecare obiect imbricat sau valoarea matricei înlocuită cu o lungime a `{…N keys}` sau un numere de matrice N (pentru valoarea matricei) un marker `_remaining_<N>_keys` care numără cheile a scăzut peste primele 20. Valorile scalare sunt copiate întregi, astfel încât un obiect de 20 de chei sau mai puține fără valori imbricate este doar reindentat — un micificat câștigă caractere și rămâne neschimbat.
5. **`errorMessage`** : ieșire care conține, oriunde și în orice literă, `error:`, `error ` (cuvântul urmat de un spațiu, ca în `no error found`), `[error]`, `exception:`, `exception `, `[exception]` sau `traceback` își păstrează prima linie, următoarele 10 linii și ultimele 3, cu un marcator `… [N frames elided] …` în locul lui. Marcatorul apare numai atunci când mai mult de 13 linii urmează prima linie, astfel încât rezultatul de eroare de 14 linii sau mai puțin nu este scurtat (la 12 sau 13 linii, ultimele 3 linii repetate deja păstrate).

După ce o strategie se potrivește, chiar și una care nu salvează nimic, strategiile ulterioare nu sunt încercate. Atunci când strategia de potrivire nu salvează nici un simbol estimat (lungime ÷ 4, rotunjită în sus) — de exemplu, un fișier asemănător codului de 25 de linii sau mai puțin, sau o matrice JSON de peste 2.000 de caractere cu 7 elemente sau mai puține — motorul agresiv păstrează rezultatul instrumentului original: ambii apelanți sunt `saved` `compressAggressive()` sau `compressAnthropicToolResultBlock()`. mai jos, în timp ce `compressToolResult()` însuși încă returnează rezultatul strategiei respective. Pasul instrument-rezultat nu este ultimul cuvânt: sumarul de rezervă al motorului poate scurta în continuare un mesaj `tool` sau `function` mai lung de 8.192 de caractere (`maxTokensPerMessage`, 2.048, ori 4).

#### Când să utilizați

Comprimarea rezultatului sculei este pasul 1 al motorului agresiv (`compressAggressive()` în `open-sse/services/compression/aggressive.ts`), deci rulează în modul agresiv și într-un pas `aggressive` al unei conducte stivuite. Comprimă mesajele `tool` și `function` în formă OpenAI și textul din blocurile Anthropic `tool_result`. Fiecare strategie are propriul său comutator sub `aggressive.toolStrategies`, totul activat în mod implicit. În tabloul de bord, comutatoarele sunt în pagina Caveman** Avansat** vizualizați în timp ce compresia este activată și modul implicit este Agresiv.

### Conductă stivuită

Modul stivuit rulează** mai multe motoare în succesiune** — de obicei, RTK mai întâi (60-90% economii la ieșirea instrumentului), apoi Caveman pe textul rămas (~ 46% economii de intrare). Compus, acesta este** 78-95% interval eligibil** (vezi matematica economii în amonte mai sus): `1 - (1 - 0.60..0.90) × (1 - 0.46)` este în medie ≈ 89%.

#### Cum funcționează

```
Input (1000 tokens)
  → RTK (command-aware filter) → 200 tokens
    → Caveman (filler removal) → 108 tokens
  → Output (108 tokens, ~89% savings)
```

#### Când să utilizați

Utilizați modul stivuit pentru:

- Fluxuri de lucru grele de instrumente (codare agentică, cercetare)
- Procesare în loturi sensibilă la costuri
- Când aveți nevoie de economii maxime de simboluri

Conductele stivuite sunt configurate prin setarea globală de compresie `stackedPipeline` sau printr-un combo de compresie numit atribuit unui combo de rutare (consultați Suprascrierea per combo de mai sus) — nu printr-un `modePack` auto-combo (câmpul respectiv reponderează doar selecția modelului auto-combo, iar `stacked` nu este un nume de pachet valid).

---

## Suprascrieri ale compresiei pentru combinații

Puteți suprascrie modul global de compresie **pentru fiecare combinație** pentru a ajusta comportamentul
în funcție de diferitele cazuri de utilizare:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "weights": { "taskFit": 0.5 },
    "modePack": "quality-first"
  },
  "compressionOverride": "aggressive"
}
```

Acest lucru este util pentru:

- **Combinații pentru programare**: Utilizați modul `aggressive` pentru sesiuni lungi
- **Combinații pentru întrebări și răspunsuri rapide**: Utilizați modul `lite` pentru răspunsuri rapide
- **Combinații care utilizează intensiv instrumente**: Utilizați modul `stacked` pentru economii maxime
- **Combinații pentru producție**: lăsați suprascrierea dezactivată pentru furnizorii care utilizează memorarea în cache — ajustarea permanentă
  care ține cont de cache retrogradează automat `aggressive`/`ultra` la `standard`
  (nu există un mod `cache-aware` selectabil)

---

## Consultați și

- [Configurarea mediului](../reference/ENVIRONMENT.md) — Variabile de mediu pentru compresie
- [Ghid de arhitectură](../architecture/ARCHITECTURE.md) — Detalii interne ale fluxului de compresie
- [Ghidul utilizatorului](../guides/USER_GUIDE.md) — Introducere în utilizarea compresiei
- [Compresie RTK](./RTK_COMPRESSION.md) — Filtre RTK, model de încredere, poartă de verificare, recuperarea ieșirii brute
- [Motoare de compresie](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, API-uri, MCP, panou de control
- [Formatul regulilor de compresie](./COMPRESSION_RULES_FORMAT.md) — Format JSON pentru pachetele de reguli
- [Pachete lingvistice pentru compresie](./COMPRESSION_LANGUAGE_PACKS.md) — Reguli Caveman specifice fiecărei limbi
