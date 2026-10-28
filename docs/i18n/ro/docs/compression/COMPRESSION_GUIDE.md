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

## Moduri de compresie

### Off

Nicio compresie aplicată. Toate mesajele trec neschimbate.

### Modul Lite (~15% economii, latență <1 ms)

Cel mai sigur mod — zero modificări semantice, doar curățarea formatării:

| Tehnică                  | Descriere                                                           |
| ------------------------ | ------------------------------------------------------------------- |
| `collapseWhitespace`     | Îmbină liniile goale consecutive și spațiile de la finalul liniilor |
| `dedupSystemPrompt`      | Elimină mesajele de sistem duplicate                                |
| `compressToolResults`    | Comprimă ieșirile prolixe ale uneltelor/funcțiilor                  |
| `removeRedundantContent` | Elimină instrucțiunile repetate                                     |
| `replaceImageUrls`       | Scurtează URI-urile de date base64 ale imaginilor                   |

**Ideal pentru:** Utilizare permanentă, fluxuri de lucru în care siguranța este critică.

### Modul Standard (~30% economii)

Inspirat de [Caveman](https://github.com/JuliusBrussee/caveman) — elimină cuvintele de umplutură și formulările prolixe, păstrând sensul:

- Elimină cuvintele de umplutură ("please", "I think", "basically", "actually")
- Condensează expresiile prolixe ("in order to" → "to", "as a result of" → "because")
- Elimină ocolirile politicoase ("Would you mind...", "If you could possibly...")
- Peste 30 de reguli regex ajustate pentru prompturi de programare

**Ideal pentru:** Fluxuri de lucru zilnice de programare, echipe atente la costuri.

### Modul Aggressive (~50% economii)

Gestionare inteligentă a istoricului pentru sesiuni lungi:

- **Îmbătrânirea mesajelor** — mesajele mai vechi sunt comprimate progresiv
- **Comprimarea rezultatelor uneltelor** — ieșirile lungi ale uneltelor sunt trunchiate sau elidate (primele/ultimele linii, filtrarea liniilor care se potrivesc, compactarea cheilor JSON)
- **Protecții de integritate structurală** — asigură că perechile `tool_use` + `tool_result` rămân coerente
- **Conștientizarea ferestrei de context** — respectă limitele de tokeni ale fiecărui model

**Ideal pentru:** Sesiuni extinse de depanare, baze de cod mari.

### Modul Ultra (~75% economii)

Compresie maximă pentru scenarii în care tokenii sunt critici:

- **Eliminare euristică** — eliminarea tokenilor din proză pe baza unui scor
- **Păstrarea structurii** — blocurile de cod delimitate, codul inline, URL-urile și identificatorii sunt marcate cu tombstone-uri și reasamblate verbatim, niciodată eliminate
- **Nivel SLM opțional** — un model local mic poate rafina eliminarea atunci când este configurat
- Independent de modul Aggressive: nu execută îmbătrânirea mesajelor, compresia rezultatelor uneltelor sau rezumarea de rezervă (doar un eșec al nivelului SLM poate direcționa o trecere de rezervă prin aggressive)

**Ideal pentru:** Când atingi în mod repetat limitele de context.

### Modul RTK (interval upstream de 60-90%)

Modul RTK este optimizat pentru ieșirile prolixe ale uneltelor care apar în sesiunile agenților de programare:

- Detectează clase de comenzi/ieșiri precum `git status`, `git diff`, `git log`, rulatoare de teste, build-uri TypeScript/Vite/Webpack, ESLint/Biome/Prettier, npm audit/instalări, jurnale Docker, ieșiri de infrastructură și ieșiri generice de shell
- Aplică pachete de filtre JSON din `open-sse/services/compression/engines/rtk/filters/`
- Importă filtre din schema RTK TOML v1 din fișiere `filters.toml` de proiect sau globale, cu validare prin teste inline și control de încredere (trust-gating) pentru fișierele de proiect
- Se livrează cu 56 de filtre încorporate, cu mostre de verificare inline
- Elimină secvențele de control ANSI, barele de progres, liniile repetate și zgomotul neacționabil
- Păstrează eșecurile, erorile, avertismentele, fișierele modificate, rezumatele și finalul ieșirilor lungi
- Acceptă filtre de proiect cu control de încredere, filtre globale și recuperarea opțională a ieșirilor brute mascate

**Ideal pentru:** Sesiuni de agent cu transcrieri de shell, build, teste, git, grep și ieșiri de fișiere.

### Modul Stacked (interval eligibil de 78-95%)

Modul Stacked rulează mai multe motoare de compresie într-o ordine deterministă. Pipeline-ul implicit este:

```txt
RTK -> Caveman
```

Această ordine menține mai întâi compactă ieșirea terminalului/uneltelor, apoi aplică condensarea semantică Caveman asupra promptului rămas în limbaj natural. Pipeline-urile Stacked pot fi configurate global sau prin combo-uri de compresie atribuite combo-urilor de rutare.

**Ideal pentru:** Context mixt cu jurnale mari de unelte, plus instrucțiuni umane sau rezumate ale asistentului.

---

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

Navigați la `Tablou de bord → Context și cache`:

- **Caveman** — selectarea modului, pachete lingvistice, previzualizare și valori implicite globale
- **RTK** — previzualizarea filtrului de comenzi, setările de siguranță RTK și catalogul de filtre
- **Combinații de compresie** — fluxuri de motoare denumite, atribuite combinațiilor de rutare
- **Prag de declanșare automată** — activează automat compresia atunci când numărul de tokenuri depășește pragul

### Suprascriere pentru fiecare combinație

În `Tablou de bord → Context și cache → Combinații de compresie`, atribuiți o combinație de compresie unei combinații de rutare:

```txt
Combinație: "free-tier-fallback"
  Combinație de compresie: "coding-agent-stack"
  Flux: RTK -> Caveman
  Ținte:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Aceasta vă permite să utilizați compresia stivuită pentru furnizorii gratuiți/de programare, păstrând în același timp modul lite pentru abonamentele cu plată.

Această atribuire „Suprascriere pentru fiecare combinație” este un control diferit de suprascrierea **modului de compresie al combinației de rutare** (Implicit/Dezactivat/Lite/Standard/Agresiv/Ultra/Răspunsuri Codex — schema câmpului acceptă, de asemenea, `rtk`, `stacked` și `omniglyph`) — această suprascriere nu selectează un flux denumit de combinație de compresie; doar setează câmpul `compressionMode` consultat de `resolveCompressionPlan`. Acesta poate fi setat fie pe cardul combinației (`Tablou de bord → Combinații`), fie, începând cu #6760, pentru fiecare combinație de rutare din lista „Atribuire rutării” de la `Tablou de bord → Context și cache → Combinații de compresie`, chiar lângă caseta de selectare pentru atribuirea fluxului documentată mai sus. Ambele interfețe persistă datele prin același endpoint `PUT /api/combos/{id}`.

### Suprascriere pentru fiecare solicitare

Trimiteți antetul de solicitare `x-omniroute-compression` pentru a suprascrie planul de compresie pentru o singură solicitare. Acesta are cea mai mare prioritate — prevalează asupra suprascrierii combinației de rutare, profilului activ, declanșării automate și valorii Implicit din panou. Valorile necunoscute sunt ignorate (solicitarea nu este respinsă niciodată), iar comutatorul principal global continuă să controleze totul: când compresia este dezactivată global, antetul nu o poate activa. Valori:

| Valoare       | Efect                                                                                                                                    |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `off`         | Fără compresie pentru această solicitare.                                                                                                |
| `default`     | Profilul Implicit derivat din panou (ignoră profilul activ). Motoarele cu pierderi rămân dezactivate.                                    |
| `safe`        | La fel ca omiterea antetului: doar deduplicare și compactarea spațiilor albe.                                                            |
| `allow-lossy` | Păstrează planul operatorului pentru această solicitare, inclusiv rezumatele, filtrele de relevanță și rescrierile de stil.              |
| `engine:<id>` | Un singur motor, când este activat, de exemplu `engine:rtk`. Aceasta este activarea explicită a motorului pentru solicitarea respectivă. |
| `<combo>`     | O combinație denumită, identificată mai întâi după nume (fără a ține cont de majuscule și minuscule), apoi după id.                      |

Fără `allow-lossy`, `engine:<id>` sau o combinație denumită, motoarele cu pierderi nu sunt aplicate. Solicitarea beneficiază în continuare de deduplicarea sesiunii și de compactarea spațiilor albe atunci când compresia este activată.

Planul aplicat este returnat în antetul de răspuns `X-OmniRoute-Compression: <mode>; source=<source>`, unde `<source>` este una dintre valorile `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` sau `off`.

### API

```bash
# Obțineți setările de compresie
curl http://localhost:20128/api/settings/compression

# Actualizați setările de compresie
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Previzualizați o sarcină utilă RTK/stacked specifică
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Listați pachetele de filtre RTK
curl http://localhost:20128/api/context/rtk/filters

# Testați RTK direct, cu metadate opționale despre comandă
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

Pe lângă cele 7 moduri descrise mai sus (sursa acceptă și modurile `codex-responses` și
`omniglyph`, care nu sunt tratate în acest ghid), secțiunile de mai jos prezintă funcționalități
care operează în cadrul acelor moduri sau împreună cu ele: Compresia rezultatelor instrumentelor și Îmbătrânirea progresivă
sunt pașii 1 și 2 ai motorului agresiv (modul Aggressive și un pas `aggressive` dintr-un
pipeline stivuit), Pipeline-ul stivuit reprezintă modul în care rulează modul Stacked, Compresia adaptată la cache
retrogradează `aggressive` și `ultra` la `standard` pentru furnizorii care folosesc caching, cât timp compresia
este activată, iar Modul de ieșire Caveman și Stilurile de ieșire sunt instrucțiuni opționale pentru promptul de sistem,
dezactivate implicit, care modelează ieșirea modelului în loc să comprime cererea.

### Compresie adaptată la cache

Unii furnizori (precum Anthropic, cu caching pentru prompturi) acceptă **caching pentru prompturi**,
ceea ce le permite să stocheze în cache părți ale promptului pentru a reduce costurile și latența. Când
cachingul este activat, compresia agresivă poate chiar să **afecteze negativ** performanța,
deoarece modifică tokenurile stocate în cache, invalidând cache-ul.

Modulul `cachingAware.ts` rezolvă această problemă prin **detectarea contextului de caching** și
**ajustarea strategiei de compresie** în consecință.

#### Cum funcționează

1. **Detectarea contextului de caching** — Scanează corpul cererii pentru marcatori `cache_control`
2. **Identificarea furnizorilor cu caching** — Verifică dacă furnizorul țintă acceptă caching
3. **Ajustarea strategiei** — Retrogradează `aggressive`/`ultra` la `standard` pentru furnizorii cu caching
4. **Omiterea promptului de sistem** — Prompturile de sistem sunt, de obicei, stocate în cache, așadar nu sunt comprimate

Funcția auxiliară pentru strategie returnează și un indicator `deterministicOnly`, însă constructorul planului utilizează
doar strategia — momentan, nicio componentă din aval nu citește acest indicator.

#### Exemplu de cod

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Marcator de cache
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Când se utilizează

Compresia adaptată la cache este **întotdeauna activă** — nu este necesară nicio configurare. Aceasta intervine ori de câte ori
compresia este activată, iar furnizorul țintă acceptă cachingul prompturilor (Anthropic, OpenAI
etc.); marcatorii `cache_control` expliciți nu sunt necesari — un furnizor cu caching este suficient
pentru a declanșa retrogradarea, iar marcatorii singuri nu fac niciodată acest lucru (detectarea marcatorilor alimentează telemetria
cache-ului, nu decizia privind strategia).

### Îmbătrânire progresivă

Conversațiile lungi acumulează multe schimburi de mesaje, însă schimburile mai vechi devin mai puțin
relevante. Modulul `progressiveAging.ts` **degradează mesajele în funcție de distanța dintre schimburi**
(distanța fiind măsurată de la sfârșitul conversației). Cu valorile implicite livrate
(`verbatim: 2, light: 2, moderate: 3`):

- **Ultimele 2 schimburi (distanță ≤ 2)**: Sunt păstrate textual
- **Distanța 3**: Compresie Caveman (eliminarea cuvintelor de umplutură)
- **Distanța 4+**: Mesajele asistentului sunt rezumate; mesajele utilizatorului sunt reduse la prima
  lor linie, limitată la 120 de caractere; celelalte roluri rămân nemodificate. Prompturile de sistem, mesajele
  deja îmbătrânite și cel mai recent mesaj al utilizatorului sunt întotdeauna păstrate textual, indiferent de distanță.
  Nimic nu este eliminat complet, iar intervalul `light`
  nu poate fi atins cu valorile implicite livrate (`light` este egal cu `verbatim`).

#### Exemplu de cod

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... încă 50 de schimburi ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // ultimele 3 schimburi: textual
  light: 8, // distanță <= 8: compresie ușoară
  moderate: 20, // distanță <= 20: compresie caveman
  fullSummary: 5, // obligatoriu conform tipului, dar necitit de codul pentru intervale
  // distanță > 20: rezumat (asistent) / prima linie păstrată (utilizator)
});

// saved = numărul de tokenuri economisite
```

#### Când se utilizează

Îmbătrânirea progresivă este **întotdeauna activă** pentru modul `aggressive` — este pasul 2 din
`compressAggressive()`. Modul Ultra nu o execută. Este
deosebit de eficientă pentru:

- Sesiuni de programare de lungă durată
- Conversații desfășurate pe parcursul mai multor zile
- Fluxuri de lucru agentice cu numeroase apeluri de instrumente

### Modul de ieșire Caveman

Modul de ieșire Caveman adaugă **instrucțiuni în promptul de sistem** care îi cer modelului însuși să genereze
un răspuns concis — nivelul `lite` solicită răspunsuri concise care păstrează propozițiile complete, `full`
îi cere să „răspundă concis ca un om al peșterilor inteligent”, iar `ultra` solicită un răspuns telegrafic;
instrucțiunile doar solicită acest comportament, fără a-l putea garanta. Cererile primesc aceste instrucțiuni prin
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`):
`open-sse/handlers/chatCore.ts` rezolvă mai întâi selecția folosind stratul de compatibilitate retroactivă
(`resolveOutputStyleSelection()` din
`open-sse/services/compression/outputStyles/backCompat.ts`), care, atunci când `outputStyles`
este gol, mapează un `cavemanOutputMode` activat la stilul de ieșire `terse-prose`, cu intensitatea
`cavemanOutputMode.intensity` (consultați secțiunea Compatibilitate retroactivă de mai jos); o selecție `outputStyles`
care nu este goală este utilizată ca atare, iar `cavemanOutputMode.enabled` și `intensity` nu mai au
niciun efect, în timp ce opțiunea sa `autoClarity` continuă să se aplice. `outputMode.ts` conține
textele instrucțiunilor (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), ocolirea bazată pe conținut și funcția auxiliară
de poziționare utilizată de injectare; propriul său injector `applyCavemanOutputMode()` nu are niciun
apelant în producție.

#### Cum funcționează

Acest mod nu comprimă intrarea. El adaugă un bloc de instrucțiuni la promptul de sistem
(consultați Cum funcționează injectarea mai jos), iar orice mod de comprimare a intrării selectat pentru cerere
rulează în continuare ulterior, pe corpul care conține acum blocul. Înaintea clauzei comune privind
limitele, cu care se încheie fiecare nivel, nivelul `full` în limba engleză este:

> „Răspunde concis, ca un om al peșterii inteligent. Elimină articolele (a/an/the), cuvintele de umplutură (just/really/basically/actually/simply), formulele de politețe și ezitările. Fragmentele sunt în regulă. Sinonime scurte (big, nu extensive; fix, nu implement). Păstrează exact toate detaliile tehnice, codul, erorile, URL-urile și identificatorii.”

Acest mod funcționează deosebit de bine pentru:

- Generarea de cod (rezultat mai concis = mai puține tokenuri)
- Întrebări și răspunsuri rapide (nu sunt necesare explicații elaborate)
- Procesarea în loturi (maximizează debitul)

#### Când se utilizează

Modul de ieșire „om al peșterii” este **opțional**. Cu compresia activată (`enabled: true`, comutatorul principal
de pe pagina Setări de compresie), activați-l cu `cavemanOutputMode.enabled`; `intensity`
selectează `lite`, `full` sau `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Comutatorul **Mod de ieșire** al unei combinații de compresie (`outputMode`, cu nivelul în `outputModeIntensity`)
configurează același comutator pentru cererile cărora li se aplică acea combinație, iar instrumentul MCP
`omniroute_set_compression_engine` îl setează prin argumentul său boolean `outputMode`.
O selecție `outputStyles` care nu este goală are prioritate față de acest comutator. În
panoul de control, activarea stilului de ieșire **Proză concisă** injectează același bloc (consultați Stiluri de
ieșire mai jos).

### Stiluri de ieșire (catalog)

Modul de ieșire „om al peșterii” de mai sus este **calea veche cu un singur stil**. Faza 4 l-a generalizat
într-un catalog de stiluri de ieșire compozabile: `OUTPUT_STYLE_CATALOG` din
`open-sse/services/compression/outputStyles/catalog.ts`. Fiecare stil este o instrucțiune pentru promptul de sistem
care îi cere modelului să genereze un răspuns mai economic; stilurile pot fi activate
împreună și sunt injectate în ordinea din catalog.

| Stil                                    | `id`            | Ce face                                                                                                                                                                                                                                                                                            | Limbile instrucțiunilor                                          |
| --------------------------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Proză concisă                           | `terse-prose`   | Elimină cuvintele de umplutură/articolele/ezitările; păstrează exacte detaliile tehnice. Același text ca în modul vechi de ieșire „om al peșterii” (referențiat, nu rescris).                                                                                                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                    |
| Mai puțin cod                           | `less-code`     | Scară YAGNI: cea mai mică modificare funcțională, fără abstracții nesolicitate.                                                                                                                                                                                                                    | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                    |
| Coadă de cal (dezvoltator senior comod) | `ponytail`      | „Cel mai bun cod este codul care nu a fost scris niciodată”: reutilizare > rescriere, cauză principală > simptom, cel mai scurt diff funcțional.                                                                                                                                                   | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                    |
| Am ADHD (acțiunea mai întâi)            | `i-have-adhd`   | Acțiunea mai întâi (comandă/cale/fragment înaintea prozei), pași numerotați și limitați, UN singur pas următor concret, fără preambul/recapitulare/formule de încheiere. Adaptat din [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT).                                            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                    |
| Filtru UI antislop                      | `antislop-ui`   | Fiecare tehnică vizuală trebuie să treacă un test de utilitate (ierarhie, identitate, lizibilitate); fără degradeuri/sticlă/strălucire implicite, paletă limitată, fără machete-șablon. Ambele stiluri antislop adaugă o limită care interzice controalele nefuncționale și afirmațiile inventate. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                    |
| Filtru antislop pentru text și oameni   | `antislop-copy` | Text specific (fără linie de pauză, îndemnuri generice la acțiune, jargon corporatist, încheieri de chatbot sau fapte inventate), plus reguli pentru oameni: contrast WCAG AA, focalizare vizibilă, acces prin tastatură, stări goale/de încărcare/de eroare, rearanjare pe mobil.                 | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                    |
| CJK concis (文言)                       | `terse-cjk`     | Răspuns `full`/`ultra` în chineza clasică (文言); `lite` solicită doar răspunsuri scurte, fără cuvinte funcționale, formule de politețe sau ornamente.                                                                                                                                             | zh (limitat în funcție de setarea regională, consultați mai jos) |

Fiecare stil include trei niveluri de intensitate — `lite`, `full`, `ultra` — și fiecare nivel
se încheie cu clauza comună privind limitele (`SHARED_BOUNDARIES` din `outputMode.ts`), care
păstrează exacte blocurile de cod, căile fișierelor, comenzile, erorile și URL-urile. Textele nivelurilor
`terse-prose` și `terse-cjk` adaugă identificatorii la această listă.

`terse-cjk` este limitat la setarea regională `zh` în două locuri. Pagina Setări de compresie afișează
rândul său numai când limba interfeței panoului de control este chineza (`zh-CN` sau `zh-TW`), iar
`applyOutputStyles()` îl injectează numai când limba determinată a cererii (consultați Selectarea limbii
mai jos) este `zh`. Ascunderea rândului nu elimină o selecție `terse-cjk` salvată:
API-ul de setări acceptă orice id de stil, iar salvarea altor stiluri pe pagină îl păstrează. În
momentul cererii, verificarea limbii din `applyOutputStyles()` este singura limitare bazată pe setarea regională.

#### Cum funcționează injectarea

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) compară
selecția cu catalogul (ID-urile necunoscute și stilurile care nu corespund setării regionale
sunt eliminate, fără a genera vreodată o eroare; o selecție care nu se rezolvă la niciun stil
lasă corpul nemodificat, fiind omisă ca `no_styles`), concatenează instrucțiunile selectate în
ordinea din catalog,
adaugă clauza privind limitele **o singură dată** (plus clauza de siguranță, `SAFETY_BOUNDARIES`
sau traducerea acesteia, când este selectat `less-code` sau `ponytail`) și începe blocul cu un
singur marcator de idempotență (`[OmniRoute Output Styles]`), astfel încât reaplicarea nu are
niciun efect. Când limba rezolvată (consultați mai jos secțiunea Selectarea limbii) are o
traducere, este inserată instrucțiunea localizată în locul celei în limba engleză.

Pentru un corp cu o matrice `messages` nevidă, verificarea idempotenței rulează înaintea
ocolirii bazate pe conținut: când marcatorul `[OmniRoute Output Styles]` există deja în câmpul
`system` de nivel superior (un șir sau o matrice de blocuri de conținut) ori într-un mesaj de
sistem cu un conținut de tip șir, corpul este lăsat nemodificat ca `already_applied` și nu se
efectuează nicio verificare a cuvintelor-cheie. În caz contrar, o ocolire bazată pe conținut
(`shouldBypassCavemanOutputMode()` din `open-sse/services/compression/outputMode.ts`) verifică
textul ultimelor trei mesaje, indiferent de rolul lor, și omite stilurile pentru întreaga tură
atunci când textul respectiv corespunde cuvintelor-cheie privind securitatea, acțiunile
ireversibile sau solicitările de clarificare ori unei secvențe sensibile la ordine: `first`,
`then`, `after that`, `before`, `rollback` sau `backup`, urmat în maximum 240 de caractere de
`delete`, `drop`, `migrate`, `deploy` sau `release`. Ocolirea rulează atât timp cât comutatorul
**Ocolire automată pentru claritate** (`cavemanOutputMode.autoClarity`, activat implicit) este
activat; dezactivarea comutatorului omite verificarea cuvintelor-cheie.

Când ocolirea permite procesarea turei, `placeSystemInstruction()` (din același fișier), care
nu creează niciodată un nou `messages[0]`, plasează blocul în primul dintre următoarele locuri
pe care le găsește:

1. Un mesaj de sistem inițial cu conținut de tip șir: blocul este adăugat după textul acestuia.
2. Câmpul `system` de nivel superior: blocul este adăugat după textul unui șir sau
   este adăugat ca bloc de text nou într-o matrice de blocuri de conținut.
3. Primul mesaj de sistem ulterior cu conținut de tip șir: blocul este adăugat după textul
   acestuia.
4. Niciunul dintre cele de mai sus: blocul este introdus într-un mesaj de sistem nou la
   sfârșitul `messages`.

Pentru un corp fără o matrice `messages` (sau cu una goală), nu rulează nicio ocolire bazată pe
conținut, iar câmpul `system` de nivel superior nu este consultat. Blocul este adăugat după
textul unui câmp `instructions` de tip șir, cu excepția cazului în care câmpul respectiv
conține deja marcatorul `[OmniRoute Output Styles]`; în acest caz, corpul este lăsat
nemodificat ca `already_applied`. Când corpul nu are un câmp `instructions` de tip șir, dar
conține `input` (un șir sau o matrice), blocul devine `instructions`, înlocuind orice valoare
care nu este de tip șir pe care o conținea câmpul. Un corp care nu are nici un câmp
`instructions` de tip șir, nici un `input` de tip șir sau matrice este lăsat nemodificat și
omis ca `no_messages`.

#### Cum se activează

În panoul de control: **Context de compresie → Setări de compresie**
(`/dashboard/context/settings`), secțiunea Stiluri de ieșire: câte un rând pentru fiecare stil,
cu un comutator de activare/dezactivare și un selector de nivel. Stilurile sunt inserate cât
timp compresia însăși este activată (comutatorul principal al paginii, `enabled`). Comutatorul
**Ocolire automată pentru claritate** se află pe pagina **Caveman**
(`/dashboard/context/caveman`), în cardul **Mod de ieșire**. Programatic, configurația de
compresie persistă selecția astfel:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Compatibilitate cu versiunile anterioare: cât timp `outputStyles` este gol, setarea veche
`cavemanOutputMode.enabled` se mapează la `terse-prose` la intensitatea
`cavemanOutputMode.intensity`. Blocul începe apoi cu marcatorul
`[OmniRoute Output Styles]`, în timp ce injectorul vechi `applyCavemanOutputMode()` scria
`[OmniRoute Caveman Output Mode]`. Sub marcator, textul corespunde inserării vechi în en,
pt-BR, es, de, fr, it, ru, id și vi; în ja și zh, acesta conține un spațiu suplimentar înaintea
clauzei privind limitele. `terse-prose` este tradus în pt-BR, es, de, fr, it, ru, zh, ja, id
și vi, astfel încât o solicitare a cărei limbă rezolvată este `hu` primește textul în limba
engleză, în timp ce injectorul vechi folosea textul său în limba maghiară.

Selectarea limbii pentru stilurile de ieșire (`resolveOutputStyleLanguage()` din
`outputStyles/apply.ts`): cu `languageConfig.enabled` activat, `autoDetect` prelevează cel mai
recent mesaj al utilizatorului din matricea `messages` a solicitării care conține text
(conținut de tip șir sau câmpul `text` al părților sale de conținut) și rulează asupra acestuia
detectorul motorului Caveman (`detectCompressionLanguage()`). Detectorul returnează `zh`
pentru textul care conține caractere Han și niciun caracter kana; în caz contrar, returnează
limba cu cele mai multe potriviri de indicii dintre `it`, `pt-BR`, `es`, `de`, `fr`, `ru`,
`ja`, `hu` și `id`, respectiv `en` când nu există nicio potrivire — textul pe care nu îl poate
clasifica primește limba engleză, niciodată `defaultLanguage`, iar `vi` nu este detectat
niciodată, deși stilurile includ text în `vi`. Corpul unui API Responses își păstrează turele
în `input`, care nu este prelevat, astfel că primește `defaultLanguage`, apoi limba engleză.
Când niciun mesaj al utilizatorului din `messages` nu conține text sau când `autoDetect` este
dezactivat, se aplică `defaultLanguage`, apoi limba engleză. Cu `languageConfig.enabled`
dezactivat, limba este engleza — cu excepția cazului în care solicitării i se aplică o
combinație de compresie (o combinație atribuită combinației de rutare a solicitării sau
combinația de compresie implicită la care revine chatCore pentru conducta stivuită
încorporată): aplicarea unei combinații activează `languageConfig.enabled` pentru solicitarea
respectivă și setează `defaultLanguage` din pachetele lingvistice ale combinației (valoarea
salvată, dacă este unul dintre pachetele combinației; în caz contrar, primul pachet al
combinației, care este implicit `en`), în timp ce valoarea salvată pentru `autoDetect`
(activată implicit) continuă să se aplice. Motorul de intrare Caveman își alege diferit limba
pachetului de reguli — pentru fiecare parte de text și, când detectarea automată este
dezactivată, condiționat de `enabledPacks`.

Matricea stil × limbă este fixată de
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: fiecare stil din catalog necesită o
intrare în `BASELINE_LANGUAGES` din test; un stil care nu este restricționat în funcție de localizare trebuie să includă o
traducere pt-BR (`terse-cjk`, restricționat în funcție de localizare, este exceptat de la această regulă), cu excepția cazului în care este
inclus în `KNOWN_ENGLISH_ONLY`, care poate conține numai stiluri fără nicio traducere —
un stil inclus care are orice traducere face ca testul să eșueze; de asemenea, un stil face ca testul să eșueze atunci când
pierde o limbă enumerată în intrarea sa din `BASELINE_LANGUAGES`. Pentru a adăuga un stil, consultați
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Comprimarea rezultatelor instrumentelor

`compressToolResult()` din `open-sse/services/compression/toolResultCompressor.ts`
comprimă textul rezultatului unui instrument folosind **5 strategii**. Acestea sunt încercate în ordinea următoare, iar
prima strategie activată a cărei verificare corespunde conținutului determină rezultatul:

1. **`fileContent`**: conținut format din 3 sau mai multe linii, în care cel puțin o linie, ignorând
   indentarea de la început, începe cu `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` sau `return ` (cuvântul-cheie urmat de un spațiu), ori cu `if`,
   `for` sau `while` urmat de `(` sau ` (`, păstrează primele 20 și ultimele 5 linii, cu
   secțiunea intermediară omisă marcată.
2. **`grepSearch`**: conținut cu cel puțin o linie de forma `<path>:<digits>:`,
   unde textul dinaintea primului caracter două puncte nu conține spații albe, păstrează numai acele linii, cel
   mult 30, urmate de numărul eventualelor potriviri suplimentare și de lista fișierelor cu potriviri;
   toate celelalte linii sunt eliminate. O singură astfel de linie este suficientă pentru a declanșa strategia, astfel încât o
   linie de jurnal care începe cu un marcaj temporal precum `12:30:45` este, de asemenea, luată în calcul.
3. **`shellOutput`**: rezultatul care conține o secvență ANSI CSI (`ESC[` urmat de cifre sau
   punct și virgulă, apoi de o literă, ca în codurile de culoare) ori un `$` urmat de un caracter de spațiere
   oriunde în text pierde acele secvențe (alte secvențe escape, precum `ESC[?25l` sau o
   secvență OSC pentru titlul ferestrei, sunt păstrate) și își păstrează ultimele 50 de linii, liniile
   consecutive repetate fiind restrânse. Deoarece această verificare rulează înainte de `json` și `errorMessage`,
   rezultatele JSON sau de eroare care conțin un astfel de `$` nu ajung niciodată la acestea cât timp
   `shellOutput` este activat.
4. **`json`**: o încărcătură JSON de peste 2.000 de caractere care începe cu `{` sau `[` (după
   eventuale spații albe) și poate fi analizată este rezumată: un tablou cu mai mult de 7 elemente își păstrează
   primele 5 și ultimele 2 elemente, precum și numărul total, iar un obiect își păstrează primele 20 de
   chei, fiecare valoare de tip obiect sau tablou imbricat fiind înlocuită cu un substituent `{…N keys}`
   (pentru un tablou, N este lungimea sa) și cu un marcaj `_remaining_<N>_keys` care numără cheile
   eliminate după primele 20. Valorile scalare sunt copiate integral, astfel încât un obiect cu cel mult 20 de chei
   și fără valori imbricate este doar reindentat — unul minificat câștigă caractere
   și rămâne neschimbat.
5. **`errorMessage`**: rezultatul care conține, oriunde și indiferent de combinația de majuscule și minuscule, `error:`,
   `error ` (cuvântul urmat de un spațiu, ca în `no error found`), `[error]`,
   `exception:`, `exception `, `[exception]` sau `traceback` își păstrează prima linie,
   următoarele 10 linii și ultimele 3, cu un marcaj `… [N frames elided] …` în locul
   liniilor dintre acestea. Marcajul apare numai atunci când după prima linie urmează mai mult de 13 linii,
   astfel încât un rezultat de eroare cu cel mult 14 linii nu este scurtat (la 12 sau 13 linii,
   ultimele 3 repetă linii deja păstrate).

După ce o strategie corespunde, chiar dacă nu economisește nimic, strategiile ulterioare nu mai sunt
încercate. Atunci când strategia corespunzătoare nu economisește niciun token estimat (lungimea ÷ 4, rotunjită în sus) —
de exemplu, un fișier asemănător codului cu cel mult 25 de linii sau un tablou JSON de peste 2.000 de
caractere cu cel mult 7 elemente — motorul agresiv păstrează rezultatul original al instrumentului:
ambii apelanți (`compressAggressive()` și `compressAnthropicToolResultBlock()`)
păstrează originalul atunci când `saved` este 0 sau mai mic, în timp ce `compressToolResult()` însuși
returnează în continuare rezultatul strategiei respective. Pasul pentru rezultatul instrumentului nu este ultimul cuvânt:
mecanismul de rezumare de rezervă al motorului poate scurta în continuare un mesaj `tool` sau `function` mai lung
de 8.192 de caractere (`maxTokensPerMessage`, 2.048, înmulțit cu 4).

#### Când se utilizează

Comprimarea rezultatelor instrumentelor este pasul 1 al motorului agresiv (`compressAggressive()` din
`open-sse/services/compression/aggressive.ts`), astfel încât rulează în modul Aggressive și într-un
pas `aggressive` al unei conducte stivuite. Comprimă mesajele `tool` și `function`
în format OpenAI și textul din blocurile Anthropic `tool_result`. Fiecare strategie are propriul
comutator sub `aggressive.toolStrategies`, toate fiind activate implicit. În panoul de control,
comutatoarele se află în vizualizarea **Advanced** a paginii Caveman atunci când comprimarea este activată, iar
modul implicit este Aggressive.

### Conducta stivuită

Modul stivuit rulează **mai multe motoare în succesiune** — de obicei mai întâi RTK
(economii de 60-90% pentru rezultatele instrumentelor), apoi Caveman pentru textul rămas (economii de intrare
de ~46%). Combinate, acestea oferă **intervalul eligibil de 78-95%** (consultați mai sus Calculul economiilor din amonte):
`1 - (1 - 0.60..0.90) × (1 - 0.46)` are o medie de ≈89%.

#### Cum funcționează

```
Intrare (1000 de tokenuri)
  → RTK (filtru adaptat comenzilor) → 200 de tokenuri
    → Caveman (eliminarea elementelor de umplere) → 108 tokenuri
  → Ieșire (108 tokenuri, economii de ~89%)
```

#### Când se utilizează

Utilizați modul stivuit pentru:

- Fluxuri de lucru care folosesc intensiv instrumente (programare agentică, cercetare)
- Procesare în loturi sensibilă la costuri
- Situațiile în care aveți nevoie de economii maxime de tokenuri

Conductele stivuite sunt configurate prin setarea globală de comprimare `stackedPipeline`
sau printr-o combinație de comprimare denumită, atribuită unei combinații de rutare (consultați
Suprareglarea per combinație de mai sus) — nu printr-un `modePack` al unei combinații automate (acel câmp doar
reajustează ponderile selecției modelelor pentru combinația automată, iar `stacked` nu este un nume valid de pachet).

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
