# OmniRoute Auto-Combo Engine (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇪🇹 [am](../../../am/docs/routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇧🇦 [bs](../../../bs/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇪🇪 [et](../../../et/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ha](../../../ha/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇦🇲 [hy](../../../hy/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ig](../../../ig/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇬🇪 [ka](../../../ka/docs/routing/AUTO-COMBO.md) · 🇰🇭 [km](../../../km/docs/routing/AUTO-COMBO.md) · 🇮🇳 [kn](../../../kn/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ml](../../../ml/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇲🇲 [my](../../../my/docs/routing/AUTO-COMBO.md) · 🇳🇵 [ne](../../../ne/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇮🇳 [or](../../../or/docs/routing/AUTO-COMBO.md) · 🇮🇳 [pa](../../../pa/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇱🇰 [si](../../../si/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇺🇿 [uz](../../../uz/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇳🇬 [yo](../../../yo/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

> **Pentru utilizatori**: Căutați un ghid de pornire rapidă? Consultați [Ghidul utilizatorului Auto-Combo](../getting-started/AUTO-COMBO-GUIDE.md) pentru explicații simple și exemple.

> Lanțuri de modele care se autogestionează, cu evaluare adaptivă + rutare automată fără configurare

## Rutare automată fără configurare (prefixul `auto/`)

> **NOU:** Nu este necesară crearea unei combinații. Folosiți prefixul `auto/` direct în orice client.

### Exemple rapide

| ID model       | Variantă  | Comportament                                                                               |
| -------------- | --------- | ------------------------------------------------------------------------------------------ |
| `auto`         | implicită | Toți furnizorii conectați, strategia LKGP, ponderi echilibrate                             |
| `auto/coding`  | coding    | Ponderi axate pe calitate, adecvate pentru generarea de cod                                |
| `auto/fast`    | fast      | Selecție ponderată cu latență redusă                                                       |
| `auto/cheap`   | cheap     | Rutare optimizată pentru cost (mai întâi costul cel mai mic)                               |
| `auto/offline` | offline   | Favorizează furnizorii cu cea mai mare disponibilitate a cotei                             |
| `auto/smart`   | smart     | Axat pe calitate + rată de explorare mai mare (10%) pentru descoperirea modelelor mai bune |
| `auto/lkgp`    | lkgp      | LKGP explicit (la fel ca valoarea implicită `auto`)                                        |
| `auto/chaos`   | chaos     | Distribuire paralelă, câte un model per furnizor (nu injectare de erori)                   |

### Compoziția categorie × nivel (`auto/<category>:<tier>`)

Sufixele în stil OpenRouter separă **tipul rutei** (categoria) de **modul de optimizare** (nivelul), astfel încât să le puteți combina liber (#4235 Faza B, `open-sse/services/autoCombo/suffixComposition.ts`):

- **Categorii** (filtrează grupul de candidați după capabilități): `coding` · `reasoning` · `vision` · `chat` · `multimodal`. `vision`/`multimodal` păstrează modelele cu capabilități vizuale; `reasoning` păstrează modelele de raționament/gândire.
- **Niveluri** (selectează ponderile de evaluare/filtrul grupului): `fast` (livrare rapidă) · `cheap` (alias `floor`, economie de costuri) · `reliable` (starea disjunctorului + stabilitatea latenței) · `free` / `pro` (filtrează grupul după nivelul modelului prin `classifyTier` — nivel gratuit sau premium).

| Exemplu                | Se rezolvă la                                                         |
| ---------------------- | --------------------------------------------------------------------- |
| `auto/coding:fast`     | grup de programare, ponderi pentru latență redusă                     |
| `auto/coding:cheap`    | grup de programare, optimizat pentru cost (alias `auto/coding:floor`) |
| `auto/reasoning:pro`   | numai modele de raționament/gândire, nivel premium                    |
| `auto/vision`          | modele cu capabilități vizuale (fără nivel → ponderi echilibrate)     |
| `auto/multimodal:free` | modele cu capabilități multimodale, numai nivelul gratuit             |

Orice valoare validă `auto/<category>[:<tier>]` este rezolvată la cerere; un subset selectat este prezentat în `/v1/models` și în panoul de control (`AUTO_SUFFIX_VARIANTS` din `open-sse/services/autoCombo/builtinCatalog.ts`). Filtrarea este de tip **fail-open** — dacă nicio conexiune nu corespunde unei constrângeri, se utilizează întregul grup, astfel încât rutarea să nu eșueze niciodată. Evaluatorul principal (`combo.ts`) rămâne neschimbat; filtrul de categorie/nivel este aplicat în `buildAutoCandidates`.

> **Informații actualizate în timp real despre modele:** adecvarea rutării automate este determinată de clasamentele **Arena ELO** în timp real + datele despre niveluri din **models.dev** atunci când indicatorul `ARENA_ELO_SYNC_ENABLED` este activat (în caz contrar, se revine la harta statică de adecvare).

**Mod de utilizare:**

```bash
# Orice IDE sau instrument CLI care acceptă formatul OpenAI
Base URL: http://localhost:20128/v1
API Key:  <cheia-punctului-final>

# În codul/configurația dvs., setați modelul la:
model: "auto"                 # valoarea implicită echilibrată
model: "auto/coding"          # cel mai bun pentru sarcini de programare
model: "auto/fast"            # cel mai rapid disponibil
model: "auto/cheap"           # cel mai ieftin per token
```

**Ce se întâmplă:**

1. OmniRoute detectează prefixul `auto/` în `src/sse/handlers/chat.ts`
2. Interoghează toate **conexiunile active ale furnizorilor** din baza de date
3. Filtrează conexiunile care au acreditări valide (cheie API sau token OAuth)
4. Determină modelul pentru fiecare conexiune (`connection.defaultModel` sau primul model al furnizorului)
5. Construiește în memorie o **combinație virtuală** (care nu este stocată în baza de date)
6. Efectuează rutarea folosind profilul de ponderare al variantei selectate + strategia LKGP

**Proprietăți principale:**

- ✅ **Întotdeauna activ:** Nu sunt necesare comutatoare, crearea unei combinații sau configurarea
- ✅ **Dinamic:** Reflectă automat furnizorii conectați în prezent
- ✅ **Persistența sesiunii:** LKGP asigură prioritizarea ultimului furnizor utilizat cu succes
- ✅ **Compatibil cu mai multe conturi:** Fiecare conexiune a furnizorului devine un candidat separat
- ✅ **Fără scrieri în baza de date:** Combinația virtuală există numai pe durata cererii, fără cost suplimentar de persistență

### Controlul candidaților per cheie (#7819, Nivelul 1+2)

`GET /v1/auto-combo/{channel}/candidates` (`{channel}` = sufixul de după `auto/` sau
valoarea literală `auto` pentru canalul de bază) este un punct final **doar pentru citire** care listează
grupul curent de candidați al unui canal `auto/*`, completat cu accesibilitatea în timp real, reutilizând
citirile existente pentru reziliență (niciodată valoarea brută `state` a disjunctorului):

- disjunctorul furnizorului — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- perioada de așteptare a conexiunii — `rateLimitedUntil` / `testStatus` pe înregistrarea
  `provider_connections` rezolvată
- blocarea modelului — `isModelLocked(provider, connectionId, model)`

Fiecare candidat include și indicatorul `excluded` al acestei chei API. Excluderile sunt stocate
per cheie API (tabelul `auto_candidate_overrides`, migrarea `128`) — OmniRoute este
cu un singur locatar și nu are un tabel `users`, astfel încât `apiKeyId` este cea mai apropiată
identitate reală per apelant — și sunt aplicate în punctul central de control al grupului de candidați din
`open-sse/services/autoCombo/virtualFactory.ts` prin funcția pură, testată unitar,
`filterExcludedCandidates()` (`open-sse/services/autoCombo/candidateOverrides.ts`).
Filtrul este de tip **fail-open**: absența valorii apiKeyId/canalului sau eșecul unei interogări a bazei de date
lasă grupul nefiltrat, astfel încât un operator fără suprascrieri configurate beneficiază de o rutare
identică la nivel de octet cu cea de dinaintea acestei funcționalități.

**Amânat pentru un tichet ulterior:** ponderi per candidat + ordonare explicită (Nivelul 3
— se integrează în căile existente ale strategiilor ponderate/prioritare) și fixarea unei strategii
`combo.ts` specifice pentru fiecare canal `auto/*` (Nivelul 4). Consultați planul #7819 pentru întrebarea
deschisă dacă suprascrierile ar trebui să rămână per cheie API sau să devină globale, având în vedere
modelul cu un singur tenant.

**În culise:**

```txt
Cerere: { model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts detectează prefixul
   ↓
createVirtualAutoCombo('coding') → candidatePool din conexiunile active
   ↓
handleComboChat (același motor ca pentru combinațiile persistente)
   ↓
Evaluarea automată selectează cel mai bun furnizor/model pentru fiecare cerere
```

**Fișiere de implementare:**

| Fișier                                                    | Scop                                                                 |
| --------------------------------------------------------- | -------------------------------------------------------------------- |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Parser de prefix (`parseAutoPrefix`)                                 |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Creează obiecte virtuale `AutoComboConfig`                           |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Punct de extensie pentru simularea registrului de furnizori în teste |
| `src/sse/handlers/chat.ts`                                | Integrare: scurtcircuitarea prefixului auto                          |
| `src/shared/constants/providers.ts`                       | Intrarea de sistem `SYSTEM_PROVIDERS.auto`                           |

## Preferințele contului pentru combinațiile automate salvate

Editorul automat inteligent oferă opțional** Preferințele contului** secțiune. Fiecare conexiune poate fi Preferată, Normală (implicit), Rezervată sau Exclusă. Conexiunile multiple pot partaja un nivel. Selectează automat în primul nivel eligibil, păstrându-și comportamentul scoring/router acolo; încercările eșuate revin la conturile concrete rămase, de preferat înaintea normalului înainte de rezervă. Conexiunile excluse nu sunt niciodată folosite de acest combo.

Setarea este stocată ca `config.accountPreferences`, tastată de conexiunea ID:

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

O hartă omise sau goală păstrează ruta existentă. Preferințele nu permit conexiunile dezactivate, nu acordă acces la cheia API, nu restabilește candidații blocați de cote sau nu ocolesc verificările bugetare. Fiecare încercare este limitată la conexiunea sa concretă, astfel încât back-ul de rezervă a contului nu poate sări trepte în spatele routerului combo. Afinitatea de sesiune existentă poate păstra un cont eligibil; excluderea contului legat de un turn nativ se oprește care se rotesc în loc să schimbe în tăcere conturile.

Preferințele configurate folosesc calea automată conștientă de cont: comenzile rapide nelegate de context-cache, smart-pipeline, haos și umbră nu sunt trimise. Acoperirea speculativă este dezactivată pentru aceste solicitări, astfel încât conturile de rezervă nu pot concura cu cele preferate. Alte strategii combinate nu interpretează această setare. Schimbarea unei combinații de la Auto păstrează preferințele salvate pentru o comutare ulterioară înapoi.

## Nume de combo-uri care corespund unui ID real de model

Un combo al cărui `name` este identic cu un ID simplu de model (de exemplu, un combo numit
`gpt-5.5`) este un **tipar intenționat și acceptat**, nu o eroare: acesta este
mecanismul pentru fallback-ul furnizorilor per ID de model, documentat în
[#6940](https://github.com/diegosouzapw/OmniRoute/issues/6940). Deoarece rezoluția
combo-urilor este verificată înaintea rezoluției ID-ului simplu de model
(`getComboForModel()` în `src/sse/services/model.ts`), o cerere pentru ID-ul simplu
`gpt-5.5` este direcționată prin țintele combo-ului (de exemplu,
`acme-responses/gpt-5.5`, `backup-responses/gpt-5.5`), în loc să ajungă direct la
un singur furnizor — astfel este reutilizată precedența combo-înainte-de-rescriere construită pentru
[#3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227), iar
comportamentul este testat împotriva regresiilor prin `tests/unit/responses-combo-resolution-3227.test.ts` și
`tests/unit/combo-name-codex-responses-rewrite.test.ts`.

Crearea sau redenumirea unui combo cu un nume care maschează un ID real de model
**nu este niciodată respinsă** — acest lucru ar afecta acest flux de lucru documentat. În schimb
(#8530), `POST /api/combos` și `PUT /api/combos/[id]` atașează răspunsului un câmp
`warning` neblocant atunci când numele (nou) intră în conflict cu un ID real de
model:

```json
{
  "warning": {
    "code": "COMBO_NAME_SHADOWS_MODEL",
    "modelId": "gpt-5.5",
    "providerId": "openai"
  }
}
```

La pornire, `scanComboModelNameCollisionsAtBoot()`
(`src/instrumentation-node.ts`) înregistrează, de asemenea, un avertisment `[STARTUP]` pe o singură linie,
enumerând fiecare combo existent care maschează un ID de model, astfel încât operatorii care
ajung accidental în această situație (și nu intenționat, conform #6940) să primească un semnal.
Funcția auxiliară de detectare se află în `src/lib/combos/modelNameCollision.ts`.

## Apelarea unui combo personalizat dintr-un client

Combo-urile persistente (Setări → Combo-uri) sunt utilizate numai atunci când clientul trimite **numele exact** al combo-ului în câmpul `model` — nu există potrivire aproximativă sau parțială a numelui combo-ului și nu este implicat niciun prefix `auto/`. Ordinea rezoluției (`getComboForModel()` în `src/sse/services/model.ts`):

1. potrivire exactă a numelui combo-ului (`model: "my-combo"`),
2. prefixul `combo/<name>` (`model: "combo/my-combo"`),
3. mapări glob model→combo (`/api/model-combo-mappings`).

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

Două capcane frecvente:

- **`auto` nu utilizează combo-urile dvs.** `auto`/`auto/*` își construiește propriul grup de candidați fără configurare și consultă combo-urile persistente numai dacă un combo este numit literalmente `auto` (nerecomandat). Pentru a direcționa printr-un combo, trimiteți numele exact al acestuia — nu `auto`.
- **`openrouter/auto` este un produs OpenRouter real și contra cost** („Auto Best Available”), nu un alias OmniRoute. Este singura intrare statică de model din registrul OpenRouter (`open-sse/config/providers/registry/openrouter/index.ts`) și este facturată separat. Utilizați Setări → Rutare → Ascunde modelele contra cost pentru a-l exclude din grupurile `auto`.

Consultați [#7992](https://github.com/diegosouzapw/OmniRoute/issues/7992) și [#7111](https://github.com/diegosouzapw/OmniRoute/issues/7111) pentru confuzia inițială documentată aici.

## Cum funcționează (combo-uri automate persistente)

Motorul Auto-Combo selectează dinamic cel mai bun provider/model pentru fiecare solicitare folosind a** Funcția de punctare cu 16 factori** (definit în `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`). Suma ponderilor implicite este `1.0`; Greutățile personalizate sunt renormalizate prin `normalizeScoringWeights()`. Două dintre cele șaisprezece — `cacheAffinity` și `resetWindowAffinity` — poartă o pondere implicită de `0`; `reliability` poartă `0` în `DEFAULT_WEIGHTS`, dar `0.03` în pachete generice și `0.04` în `reliability-first`, iar `quality` poartă `0.02` în pachete (`0.03` în `quality-first`): acestea sunt încă calculate pentru fiecare candidat, iar `cacheAffinity` porți deduplicarea prompt-cache în afara scorului, astfel încât pachetele pur și simplu nu votează implicit.

![Auto-Combo 16-factor scoring](../diagrams/exported/auto-combo-scoring.svg)

> Sursa: [diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd) (regenerare prin `npm run docs:render-diagrams`). Numele fișierului este istoric; sursa și diagrama redată arată toți cei 16 factori declarați în `DEFAULT_WEIGHTS`.

| Factor                | Greutate implicită | Descriere                                                                                                                                                                                                                       |
| :-------------------- | :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `quota`               | 0.1429             | Cotă rămasă/limită de rate [0..1]                                                                                                                                                                                               |
| `health`              | 0.1605             | Scorul de sănătate de la întrerupător (CLOSED= 1,0, HALF_OPEN= 0,5, OPEN= 0,0)                                                                                                                                                  |
| `costInv`             | 0.1429             | Invers** amestecate** cost (60% intrare + 40% preț jeton de ieșire, normalizat) — mai ieftin = scor mai mare                                                                                                                    |
| `latencyInv`          | 0.1143             | Latența inversă p95 s-a normalizat pentru a pune în comun — mai rapid = scor mai mare                                                                                                                                           |
| `taskFit`             | 0.0762             | Fitness-tip de sarcină (codificare, revizuire, planificare, analiză, depanare, documente)                                                                                                                                       |
| `stability`           | 0.0476             | Stabilitate bazată pe varianță de la abaterea standard a latenței — un candidat al cărui timp de răspuns variază scoruri mai mici                                                                                               |
| `tierPriority`        | 0.0476             | Prioritate la nivelul contului — Ultra = 1.0, Pro = 0.67, Standard = 0.33, Free = 0.0                                                                                                                                           |
| `tierAffinity`        | 0.0476             | Afinitate între nivelul candidatului și nivelul recomandat de manifest                                                                                                                                                          |
| `specificityMatch`    | 0.0476             | Potrivire între specificul cererii (hint manifest) și nivelul modelului                                                                                                                                                         |
| `contextAffinity`     | 0.0476             | Afinitate între nevoia de fereastră de context a cererii și fereastra de context a modelului                                                                                                                                    |
| `sessionAvailability` | 0.0476             | Disponibilitatea sesiunii OAuth a conexiunii candidate pentru această sesiune (`getOAuthSessionAvailability()`; conexiunile non-OAuth scor 1,0)                                                                                 |
| `connectionDensity`   | 0.0476             | Împrăștie sarcina între conexiunile aceluiași furnizor (anti-concentrare)                                                                                                                                                       |
| `cacheAffinity`       | 0.00               | Afinitatea hash de întâlnire față de conexiunea este cel mai probabil să dețină deja prefixul prompt-cache al acestei solicitări (`open-sse/services/combo/promptCacheAffinity.ts`); dezactivat implicit (#8008)                |
| `resetWindowAffinity` | 0.00               | Prejudecăți față de conexiunile a căror fereastră de resetare a cotei este favorabilă (dezactivată implicit)                                                                                                                    |
| `quality`             | 0.03               | Semnal de calitate de ieșire bazat pe feedback de la instrumentul de urmărire a calității evenimentului de rutare; candidații fără observații primesc un 0,5 neutru                                                             |
| `reliability`         | 0.00               | Cota de succes observată, `1 - failureRate`, din 24 de ore de istoric de utilizare în spatele unui nivel de zece eșantioane (valori în timp real în caz contrar); candidații fără observații citesc ca 1.0. Dezactivat implicit |

Instrumentul de urmărire `quality` din memorie (`open-sse/services/routing/quality.ts`) este gol după o repornire la rece, astfel încât fiecare candidat obține un `0.5` neutru până când primele observații aterizează.

> **Cotă imposibil de citit (#15347).** Când un furnizor are o cotă de preluare, dar nu returnează nimic care poate fi citit (preluare eșuată, acreditări lipsă, utilizare numai pentru mesaje sau un instantaneu incorect, fără `windows` analizabil și fără `percentUsed` finit, inclusiv `percentUsed: null`), candidatul obține scoruri `0` pe `autoStrategy.ts` `quota` și scorul final este înmulțit cu `UNREADABLE_QUOTA_SOFT_DEPRIORITIZE_FACTOR` model soft-penalty ca penalizare pentru starea conexiunii. O citire de utilizare eșuată este o dovadă despre telemetrie, nu despre furnizor, așa că se clasează strict sub orice citire reală, inclusiv una confirmată 100%-used, dar nu este niciodată blocată sau evacuată. Un furnizor fără plafon raportează `unlimited: true` și punctează ca cotă completă; un furnizor fără cotă de preluare înregistrată nu are deloc sursă de telemetrie și păstrează valoarea implicită a `100`.

**Sumă:** `0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0` așa cum este declarat în `DEFAULT_WEIGHTS`; Greutățile configurate de utilizator sunt renormalizate într-o distribuție prin `normalizeScoringWeights()` înainte de scor.

## Pachete de moduri

6 profiluri de ponderi predefinite în `open-sse/services/autoCombo/modePacks.ts`. Fiecare pachet înlocuiește complet ponderile implicite pentru a orienta selecția către un singur obiectiv. Fiecare pachet are deja suma `1.0` (`0.9999` când este afișată cu patru zecimale), astfel încât `normalizeScoringWeights()` nu are nimic semnificativ de corectat când un pachet este activ — valorile de mai jos sunt, în limitele rotunjirii, cele aplicate de sistemul de punctare.

| Factor                | ship-fast  | cost-saver | quality-first | offline-friendly | reliability-first | chaos-mode |
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

Note:

- **Pachetele includ `quality` și `reliability`** (`quality 0.02`, `quality-first 0.03`; `reliability 0.03`, `reliability-first 0.04`) și înlocuiesc integral harta ponderilor (`weights = pack`, nu o îmbinare). `DEFAULT_WEIGHTS` include `quality 0.03 / reliability 0`; selectarea `balanced`/`default` păstrează aceste valori implicite, iar selectarea unui pachet utilizează valorile pachetului de mai sus. Într-un pool rece (încă nu există observații, deci `quality 0.5` și `reliability 1`), acești doi factori adaugă `+0.04` în cazul unui pachet generic (`0.03 + 0.01`), `+0.045` în cazul `quality-first` și `+0.05` în cazul `reliability-first`.
- `tierAffinity`, `specificityMatch` și `resetWindowAffinity` sunt explicit `0` în fiecare pachet.
- Pe scurt, accentul fiecărui pachet:
  - **ship-fast** → latencyInv 0.3048 + health 0.2667 (conexiuni sănătoase, cu latență redusă)
  - **cost-saver** → costInv 0.3324 (câștigă tokenurile cele mai ieftine)
  - **quality-first** → taskFit 0.3524 + stability 0.1429 + quality 0.03, cea mai mare valoare dintre toate pachetele (cel mai bun model pentru sarcină, consecvent)
  - **offline-friendly** → quota 0.3324 + health 0.2667 (marjă disponibilă maximă, indiferent de viteză/cost)
  - **reliability-first** → health 0.3524 + stability 0.1905 + reliability 0.04, cea mai mare valoare dintre toate pachetele (cele mai puține surprize)
  - **chaos-mode** → health 0.4000 + taskFit 0.1905 (pachetul de ponderi pe care `auto/chaos` îl atribuie membrilor panoului său; distribuirea paralelă nu citește aceste ponderi, iar acesta nu este un profil de injectare a defecțiunilor, consultați [CHAOS-MODE.md](../guides/CHAOS-MODE.md#autochaos-parallel-fan-out))

### Controale per solicitare (anteturi) — #6023 / #6024 / #6025 / #3470

O combinație `auto` poate fi dirijată **pentru fiecare solicitare** prin intermediul a trei anteturi, fără a modifica configurația stocată a combinației. Acestea se aplică numai strategiei `auto` și numai solicitării care le conține; valorile `modePack`/`budgetCap`/`budgetFallback` salvate ale combinației sunt utilizate când antetul lipsește.

| Antet                         | Acceptă                                                                                                                                                                                                | Efect                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| :---------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-OmniRoute-Mode`            | un alias de presetare (`fast`, `balanced`, `quality`, `cheap`, `reliable`, `offline`) sau un nume brut de pachet (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`, `reliability-first`) | Suprascrie ponderile de punctare pentru această solicitare. `balanced`/`default` impun ponderile implicite (fără pachet). Valorile necunoscute sunt ignorate (configurația este păstrată).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `X-OmniRoute-Budget`          | un număr pozitiv (valoarea maximă în USD per solicitare)                                                                                                                                               | Plafon strict de cost: candidații al căror cost estimat îl depășește sunt filtrați înainte de selecție. Comportamentul atunci când **toți** candidații îl depășesc este controlat de `X-OmniRoute-Budget-Fallback` de mai jos.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `X-OmniRoute-Budget-Fallback` | `cheapest` (implicit, aliasuri: `cheapest-viable`, `soft`) sau `strict` (aliasuri: `block`, `hard`)                                                                                                    | `cheapest`: revine la candidatul cu cel mai mic cost la nivel global, chiar dacă acesta depășește în continuare plafonul (comportament moștenit). `strict`: refuză selecția — solicitarea eșuează imediat cu `HTTP 402`, în loc să depășească neobservat bugetul. Valorile necunoscute sunt ignorate.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `X-OmniRoute-Effort`          | `auto` (alte valori sunt rezervate)                                                                                                                                                                    | Buget de gândire adaptiv: când solicitarea **nu** conține niciun câmp de raționament, indiferent de formă (`reasoning_effort`, `reasoning`, `thinking`), gateway-ul rezolvă valoarea `auto` la `low`/`medium`/`high` pe baza unor semnale deterministe privind structura solicitării (lungimea ultimului mesaj al utilizatorului, dimensiunea contextului până la ultimul mesaj al utilizatorului, rezultatele anterioare ale instrumentelor, adâncimea buclei de instrumente). Semnalele sunt limitate la runda curentă — tot ce urmează după ultimul mesaj al utilizatorului este ignorat — astfel încât fiecare solicitare dintr-o buclă de instrumente este rezolvată la același nivel (fixare fără stare pentru fiecare rundă, fără stare de sesiune, fără escaladare în mijlocul buclei care ar invalida prefixele cache-ului de prompturi din amonte). Un câmp de raționament explicit furnizat de client are întotdeauna prioritate. Se aplică solicitărilor a căror rutare în amonte este rezolvată la structura OpenAI Chat Completions (`targetFormat === FORMATS.OPENAI`) — `reasoning_effort` este un câmp specific structurii OpenAI, astfel încât antetul nu are niciun efect asupra unei solicitări direcționate către Claude sau Gemini (consultați `open-sse/handlers/chatCore/adaptiveEffortWiring.ts`). |

```bash
# Forțează profilul cel mai rapid, limitează această solicitare la 0,05 USD și blochează strict în loc să depășească bugetul
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

Rezolvarea este o funcție pură (`open-sse/services/autoCombo/requestControls.ts`); valorile
rezolvate alimentează intrările existente `config.modePack` / `config.budgetCap` /
`config.budgetFallback` ale motorului. Valoarea `config.budgetFallback` stocată a unei combinații ("strict" |
"cheapest") stabilește politica persistentă; antetul o suprascrie pentru o singură solicitare.

## Toate strategiile de rutare

Suportă motorul combo al lui OmniRoute** 22 de strategii de rutare** (declarat în `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`). Motorul Auto Combo în sine este expus în cadrul strategiei `auto` ; celelalte sunt disponibile pentru combo-uri persistente.

| Strategie           | Descriere                                                                                                                                                                                                           |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `priority`          | Lista ordonată pentru prima țintă cu prioritate explicită                                                                                                                                                           |
| `weighted`          | Ponderată aleatoriu în funcție de greutatea țintă                                                                                                                                                                   |
| `round-robin`       | Parcurgeți ținte în ordine (grupate; vezi mai jos)                                                                                                                                                                  |
| `context-relay`     | Transmite contextul între ținte (conversații lungi)                                                                                                                                                                 |
| `fill-first`        | Completați cota fiecărei ținte înainte de a trece la următoarea                                                                                                                                                     |
| `p2c`               | Power-of-2-choices echilibrare aleatorie a sarcinii                                                                                                                                                                 |
| `random`            | Selecție aleatorie uniformă                                                                                                                                                                                         |
| `least-used`        | Alegeți ținta cu cea mai mică sarcină curentă                                                                                                                                                                       |
| `cost-optimized`    | Reduceți la minimum $ per cerere, dat fiind prețul de catalog                                                                                                                                                       |
| `reset-aware` ⭐    | Prioritizează în funcție de timpul de resetare al cotei — ferestrele scurte de resetare au clasat mai sus                                                                                                           |
| `reset-window`      | Preferați ținte a căror fereastră de cotă se resetează cel mai curând                                                                                                                                               |
| `expiry-first`      | Cheltuiește contul a cărui cotă ar expira altfel neutilizată mai întâi — cea mai mare rămasă cu termenul limită de resetare cel mai apropiat este primul                                                            |
| `headroom`          | Alegeți ținta cu cel mai mare spațiu de cotă rămas                                                                                                                                                                  |
| `quota-weighted`    | Omiteți conturile epuizate, apoi alegeți dintre celelalte proporțional cu cota rămasă împărțită la încărcarea în zbor; conversațiile existente rămân fixate                                                         |
| `strict-random`     | Aleatoriu fără deduplicarea repetărilor                                                                                                                                                                             |
| `auto`              | Utilizați scorul Combo automat (16 factori) —** recomandat**                                                                                                                                                        |
| `lkgp`              | Ultima cale cunoscută (fixează ultimul furnizor de succes, apoi revine la reguli)                                                                                                                                   |
| `context-optimized` | Alegeți ținta care se potrivește cel mai bine pentru dimensiunea contextului actual                                                                                                                                 |
| `cache-optimized`   | Reordonați țintele după afinitatea prompt-cache — este încercată mai întâi conexiunea cel mai probabil să dețină prefixul din cache al acestei solicitări (`open-sse/services/combo/promptCacheAffinity.ts`, #8008) |
| `fusion` 🧬         | Distribuiți pe un grup de modele în paralel, apoi sintetizați un răspuns prin intermediul unui judecător (vezi mai jos)                                                                                             |
| `pipeline`          | Rulați ținte secvențial, conectând rezultatul fiecărui pas în intrarea pasului următor; este returnat doar răspunsul final (#6396)                                                                                  |
| `jev`               | Lista de preferințe clasate de utilizator; TypeSafe Jev admits which entries run for this request. Winner first, other admitted targets keep user order. Falls open to user order when Jev is unavailable (#15276)  |

⭐ = Nou în v3.8.0 · 🧬 = Nou în v3.8.36

### semantica `weighted`

`weighted` este a** extragere aleatorie proporțională per cerere** (`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`), nu un egalizator:

- Fiecare cerere retrage** unul** pas cu probabilitate `weight / totalWeight`; pașii rămași sunt ordonați în funcție de greutatea descendentă ca lanț de rezervă pentru cererea respectivă.
- Un pas a cărui greutate este `0` (sau lipsește) este** niciodată desenat** în timp ce orice alt pas are o pondere > 0 — acesta poate servi doar ca alternativă după ce pasul desenat eșuează. Doar când** toate** ponderile sunt 0, selecția devine uniformă.
- Pașii ale căror ținte sunt toate indisponibile — provider circuit breaker `OPEN`, cooldown connection, model lockout — sunt eliminați din extragere înainte de a se întâmpla (`open-sse/services/combo/targetResolution.ts`), astfel încât un singur pas sănătos poate câștiga temporar fiecare cerere.
- `stickyWeightedLimit` (configurație combo, `1` = implicit dezactivat) fixează pasul desenat pentru atâtea succese consecutive înainte de re-desenare.

Pentru rotație strictă utilizați `round-robin`; ponderi egale pe `weighted` dau — statistic nu echilibru — strict.

### Mod pipeline agentic

Un combo `pipeline` cu cel puțin două modele poate opta pentru rutarea planner/executor cu `config.agenticOrchestration.enabled`. Prima țintă deține planificarea și răspunsurile finale; a doua țintă emite apeluri de instrumente native client. OmniRoute detectează continuarea rezultatelor sculei din protocolul de solicitare, întreabă planificatorul dacă este nevoie de o altă rundă de scule și face ca executantul sau planificatorul să fie în mod dinamic pasul final orientat spre client.

Opțional, `config.agenticOrchestration.contextCompaction` aplică un buget de sarcină utilă separat înainte de fiecare expediere a planificatorului sau executorului. Activați-l în mod explicit:

```json
{
  "enabled": true,
  "defaultMaxChars": 400000,
  "targetRatio": 0.72,
  "toolResultMaxChars": 24000,
  "modelMaxChars": { "provider/planner": 175000, "provider/executor": 300000 }
}
```

Acestea sunt bugete de caractere JSON serializate selectate de operator, nu ferestre de context simbol sau limite garantate în amonte. Modelul exact IDs înlocuiește valoarea implicită. Deasupra pragului, compactarea elimină definițiile identice ale sculelor, decupează dovezile de scule supradimensionate cu un rezumat și elimină grupurile vechi de istoric complet către raportul țintă. Acesta păstrează instrucțiunile system/developer, cea mai recentă solicitare a utilizatorului, ultima rundă de instrumente, inclusiv calls/results paralel și instrucțiunea de rutare principală a lui Gemini. Instrucțiunile de nivel superior și setările instrumentului sunt păstrate. Un marcator de omisiune înregistrează istoricul eliminat; aceasta este o tăiere deterministă, nu un rezumat semantic. Dacă contextul fixat depășește în continuare bugetul, cererea returnează 413 înainte de a contacta modelul. Cu compactarea dezactivată sau sub prag, cererea trece neschimbată.

În continuarea rezultatelor instrumentului, OmniRoute oprește și execuția atunci când două runde finalizate consecutive repetă aceleași apeluri de instrumente cu rezultate neschimbate sau când fiecare rezultat marcat în mod explicit din două runde consecutive a eșuat. Rezultatele modificate permit apeluri repetate (de exemplu, sondaje). Paza se resetează la o nouă solicitare a utilizatorului, grupează apelurile paralele într-o singură rundă și acceptă Anthropic, Terminări de chat, Răspunsuri și istoricul Gemini. Planificatorul primește motivul și deține răspunsul final chiar dacă solicită o altă rundă de instrumente.

Modelele suplimentare după a doua țintă sunt comandate de copii de siguranță ale executorului. Un răspuns HTTP eșuat sau o excepție de transport înaintează către următorul executant, purtând aceeași decizie a planificatorului și instrumente native, dar propriul pas al executorului prompt și conexiunea rezolvată. Primul răspuns de succes este returnat neschimbat, inclusiv SSE streaming; eșecurile după începerea cu succes a unui flux nu pot fi reîncercate aici. Dacă toți executanții eșuează, ultimul eșec este returnat. Clientul anulează oprirea expedierii.

```json
{
  "strategy": "pipeline",
  "models": [{ "model": "provider/planner" }, { "model": "provider/executor" }],
  "config": {
    "agenticOrchestration": { "enabled": true, "maxToolRounds": 8 }
  }
}
```

Executorul poate emite mai multe apeluri independente într-un singur răspuns. Apelurile dependente sunt gestionate în rândurile ulterioare ale instrumentului clientului, planificatorul revizuind fiecare rezultat. `maxToolRounds` este implicit `8` și acceptă `1`–`32`; odată ajuns, planificatorul trebuie să producă cel mai bun răspuns final disponibil. Deciziile planificatorului intern sunt tamponate, în timp ce răspunsul selectat orientat către client păstrează preferința de streaming inițială.

### `round-robin` sticky lot și extinderea contului

Round-robin este grupat, nu o singură cerere pe pas:

- `stickyRoundRobinLimit` (configurație combo, apoi `comboStickyRoundRobinLimit`, apoi `settings.stickyRoundRobinLimit`, implicit** 3** ) păstrează aceeași țintă pentru atâtea succese consecutive înainte de rotație. Setați suprascrierea combo la `1` pentru rotația cu o singură cerere. Editorul combo arată valoarea efectivă și din ce strat provine.
- `connectionAwareExpansion` (configurație combinată, apoi setări, implicit** fals** ) extinde fiecare pas la nivel de furnizor în obiective pentru fiecare cont înainte de rotație. Strategiile de grup B (prioritate, ponderate, round-robin, aleatoriu, p2c, cele mai puțin utilizate, optimizate în funcție de cost, lkgp, complet-first, strict aleatoriu, optimizate pentru context, optimizate pentru cache, context-releu, fuziune, pipeline, jev) păstrează o vizualizare la nivel de furnizor până când aceasta este activată. Editorul combo expune moștenire / activare / dezactivare; moștenire utilizează valoarea implicită globală (dezactivată).
- Rutarea localității prompt-cache (`promptCacheAffinityEnabled`, implicit** adevărat** ) reordonează conexiunile fixate, astfel încât cheile cache corespunzătoare rămân într-un singur cont. Are prioritate față de rotația round-robin și ponderată între pași fixați pentru fiecare cont. Dezactivați-l din Setări → Combo implicite dacă aveți nevoie de rotație strictă. Nu există o modificare per combo.

Pentru rotația cu mai multe conturi pe un singur model, preferați** un singur pas de cont dinamic** ( `connectionId` gol, bazin întreg) cu limită lipicioasă `1`, nu trei `connectionId` fixate. Pașii fixați plus afinitatea se prăbușesc în același cont chiar și în timp ce contorul RR avansează.

## Strategia Fusion

`fusion` este singura strategie care **nu** selectează o singură țintă. Aceasta distribuie promptul
către **fiecare model din panel, în paralel**, după care un **model evaluator** configurabil sintetizează
un singur răspuns final din toate răspunsurile panelului. Portată din proiectul upstream `decolua/9router`
(designul Fusion al OpenRouter); implementarea se află în `open-sse/services/fusion.ts`.

Cum funcționează:

0. **Ocolire pentru cererile cu instrumente** — o cerere care conține un array `tools` nevid, cu
   `tool_choice` nesetat explicit la `"none"`, omite complet panelul: este direcționată direct către
   un singur model (evaluatorul configurat sau `panel[0]`), iar `tools`/`tool_choice`
   sunt transmise nemodificate. Membrii panelului nu au acces la instrumente, iar directiva de
   sinteză a evaluatorului descurajează emiterea apelurilor de instrumente, astfel încât clienții
   agentici/care apelează instrumente primesc o decizie reală de apelare a unui instrument, în locul
   unei descrieri sintetizate (#6771).
1. **Distribuire în evantai** (doar pentru cererile fără instrumente) — promptul este trimis simultan
   către fiecare model din panel, cu modul non-streaming impus și instrumentele eliminate (evaluatorul
   are nevoie de textul complet pentru a realiza sinteza).
2. **Colectare cu cvorum și perioadă de grație** — imediat ce sosesc `minPanel` răspunsuri, pornește
   un scurt temporizator de grație pentru modelele întârziate, după care fuziunea continuă cu toate
   răspunsurile colectate. Astfel, impactul celui mai lent model asupra timpului total este limitat,
   în cadrul unei expirări stricte.
3. **Sinteza evaluatorului** — răspunsurile panelului sunt anonimizate (`Source 1`, `Source 2`, … —
   astfel încât evaluatorul să analizeze conținutul, nu marca modelului) și transmise evaluatorului,
   care analizează consensul / contradicțiile / acoperirea parțială / perspectivele unice / punctele
   oarbe, apoi redactează **un singur** răspuns cu autoritate. Apelul evaluatorului păstrează valoarea
   originală `stream` a clientului și instrumentele acestuia, astfel încât streamingul și utilizarea
   ulterioară a instrumentelor să funcționeze în continuare.
4. **Degradare controlată** — 0 răspunsuri din panel → `503`; exact 1 răspuns supraviețuitor → acel
   răspuns este returnat direct (nu există nimic de combinat); un panel cu un singur model răspunde direct.

Un membru al panelului poate fi și un pas `combo-ref` (`{kind: "combo-ref", comboName: "..."}`) care face
referire la un alt combo — acesta este rezolvat ca **o singură voce opacă în panel** (o rutare recursivă
completă către combo-ul referit, nu o distribuire către țintele acelui combo), cu aceeași protecție
împotriva adâncimii excesive și a ciclurilor pe care o folosesc deja toate celelalte strategii care
consumă `combo-ref` (#6764).

### Configurare

Se configurează în obiectul `config` al combo-ului (fără migrare de schemă — reutilizează tabela
existentă `combos`):

| Câmp                                     | Tip      | Valoare implicită      | Scop                                                                                                     |
| :--------------------------------------- | :------- | :--------------------- | :------------------------------------------------------------------------------------------------------- |
| `config.judgeModel`                      | `string` | primul model din panel | Modelul care sintetizează răspunsul final                                                                |
| `config.fusionTuning.minPanel`           | `number` | `2`                    | Răspunsuri reușite necesare înainte de pornirea temporizatorului de grație (limitat la `[2, panelSize]`) |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`                 | Cât timp sunt așteptate modelele întârziate după atingerea cvorumului                                    |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`                | Limită absolută, astfel încât un model blocat să nu poată întârzia cererea                               |

Valorile implicite se află în `FUSION_DEFAULTS` (`open-sse/services/fusion.ts`).

### Exemplu

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

Apoi apelați-l ca pe orice alt combo: `{"model":"fusion-panel","messages":[...]}`.

## Fabrica virtuală Auto-Combo

Motorul Auto Combo nu necesită combinații predefinite. În schimb, `open-sse/services/autoCombo/virtualFactory.ts` construiește candidații dinamic:

1. Preia `getProviderConnections({ isActive: true })` (toate conexiunile activate)
2. Filtrează conexiunile care au credențiale valide (cheie API sau token OAuth neexpirat, prin `hasUsableOAuthToken()`)
3. Face o referință încrucișată cu `getProviderRegistry()` pentru disponibilitatea modelelor și prețuri
4. Pentru fiecare tuplu `(provider, model, connection)`, construiește un `VirtualAutoComboCandidate`
5. Alege `connection.defaultModel` (sau primul model din registru) drept țintă pentru trimitere
6. Evaluează fiecare candidat folosind `scorePool()` cu 16 factori și pachetul de ponderi al variantei
7. Returnează configurația `AutoComboConfig` rezultată în memorie către `handleComboChat()` — aceasta nu este salvată niciodată în baza de date

Aceasta înseamnă că **adăugarea unui furnizor nou cu `auto/*` activat extinde automat grupul de candidați** — nu este necesară editarea manuală a combinației. Combinația virtuală este reconstruită pentru fiecare solicitare, astfel încât conexiunile adăugate recent sau redevenite funcționale sunt utilizate imediat.

## Auto-remediere

- **Excludere temporară**: Scor < 0.2 → excludere timp de 5 min (backoff progresiv, maximum 30 min)
- **Detectarea stării întrerupătorului de circuit**: OPEN → excludere automată; HALF_OPEN → solicitări de testare
- **Mod incident**: >50% OPEN → dezactivează explorarea, maximizează stabilitatea
- **Recuperare după perioada de așteptare**: După excludere, prima solicitare este una de „testare”, cu un timeout redus

## Explorare de tip bandit

5% dintre solicitări (procent configurabil) sunt direcționate către furnizori aleatori în scop de explorare. Aceasta este dezactivată în modul incident.

## API

**Nu există un endpoint dedicat `POST /api/combos/auto`** — Auto-Combo este utilizat în două moduri:

1. **Fără configurare (recomandat):** Trimiteți orice cerere de finalizare a conversației cu `model: "auto"` sau `model: "auto/<variant>"`. Fabrica virtuală construiește combinația pentru fiecare cerere — nu sunt necesare persistență sau apeluri API.

2. **Combinație persistentă cu `strategy: "auto"`:** Creați o combinație obișnuită prin `POST /api/combos` și setați `strategy: "auto"`, împreună cu `config.auto.weights` / `config.auto.candidatePool`. Este utilizat același motor de evaluare; combinația este stocată în `combos` și poate fi reutilizată după ID.

Pentru descoperire, `GET /api/combos/auto` listează fiecare variantă împreună cu grupul său de candidați rezolvat și cu `context_length` / `max_output_tokens` — valoarea MAXIMĂ dintre ferestrele grupului de candidați. Clienții (de exemplu, pluginul opencode) trebuie să publice aceste valori în loc de `0`: un context zero dezactivează complet compactarea automată din opencode, permițând sesiunilor să crească până când eliminarea istoricului de către gateway distruge contextul. Este sigur să fie publicată valoarea MAXIMĂ, deoarece prefiltrul de context al combinației automate direcționează cererile supradimensionate către candidați cu ferestre mari.

```bash
# Utilizare fără configurare (fără crearea unei combinații)
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# Combinație automată persistentă prin endpointul obișnuit pentru combinații
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Strategii ale routerului automat

Combinațiile persistente cu `strategy: "auto"` pot seta `config.routerStrategy` (sau opțiunea veche
`config.auto.routerStrategy`) la una dintre următoarele valori:

- `rules` — evaluare ponderată implicită
- `score` — selectează cel mai mare scor ponderat configurat. Egalitățile exacte păstrează ordinea configurată
  a candidaților; parametrul existent `explorationRate` eșantionează din întregul grup clasificat.
- `cost` / `eco` — cel mai ieftin furnizor funcțional
- `latency` / `fast` — cea mai mică latență p95, cu penalizare pentru fiabilitate
- `sla-aware` / `sla` — preferă candidații care îndeplinesc SLO-urile privind latența p95, rata de eroare și, opțional,
  costul
- `lkgp` — mai întâi, ultimul furnizor cunoscut ca fiind funcțional
- `nadir` — solicită API-ului de decizie [Nadir](https://getnadir.com) să stabilească modelul din grup de care are
  nevoie promptul; necesită activare explicită și revine la `rules` în caz de eroare

### Strategiile routerului în detaliu

Motorul de combinații automate oferă 7 implementări **RouterStrategy** interschimbabile prin
`config.routerStrategy` (sau opțiunea veche `config.auto.routerStrategy`).
Fiecare strategie selectează un furnizor din grupul de candidați, pe baza unui `RoutingContext`
(tipul sarcinii, indicii privind instrumentele/viziunea, estimarea tokenurilor, politica SLA opțională, ultimul
furnizor cunoscut ca fiind funcțional, opțional).

#### 1. `rules` (implicit) — evaluare ponderată cu 16 factori

Încapsulează motorul de evaluare existent. Filtrează candidații cu disjunctorul în starea `OPEN`,
apoi execută `scorePool()` cu tipul curent al sarcinii și `getTaskFitness()`,
selectând furnizorul cu cel mai mare scor.

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

**Când se utilizează**: Implicit. Utilizați-o atunci când doriți un compromis echilibrat între toate semnalele.

**Alias**: `rules` (fără alias)

---

#### 2. `cost` / `eco` — cel mai ieftin furnizor funcțional

Sortează grupul de candidați după `costPer1MTokens` (crescător) și îl selectează pe cel mai ieftin.
Filtrează mai întâi candidații cu starea `OPEN`.

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

**Când se utilizează**: Sarcini sensibile la costuri, procesare în loturi sau activități în fundal.

**Aliasuri**: `cost`, `eco`

---

#### 3. `latency` / `fast` — cea mai mică latență p95, cu penalizare pentru fiabilitate

Sortează după `p95LatencyMs + (errorRate * 1000)`. Penalizarea ratei de eroare asigură
clasarea mai slabă a furnizorilor nefiabili, chiar dacă latența lor nominală este redusă.

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

**Când se utilizează**: Sarcini sensibile la latență, precum conversațiile în timp real, completarea automată sau
asistenții interactivi pentru programare.

**Aliasuri**: `latency`, `fast`

---

#### 4. `sla-aware` / `sla` — conformitate cu SLO-urile privind latența/erorile/costurile

Evaluează fiecare candidat în funcție de cât de bine respectă politica SLO configurată:

| Factor              | Pondere | Formulă                                           |
| ------------------- | ------- | ------------------------------------------------- |
| Scor de latență     | 35%     | `threshold / max(value, ε)`                       |
| Scor de eroare      | 35%     | `threshold / max(value, ε)`                       |
| Scor de sănătate    | 15%     | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN) |
| Scor de cost        | 10%     | `threshold / max(value, ε)` sau invers normalizat |
| Scor de stabilitate | 5%      | abaterea standard normalizată invers a latenței   |

Când `hardConstraints: true`, candidații sunt sortați în principal după **scorul de încălcare**
(cu cât depășesc orice SLO), apoi după scorul compozit. În caz contrar, se folosește doar
scorul compozit.

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Selects the provider most likely to satisfy latency, error-rate, and cost SLOs";

  select(pool, context) {
    // ... punctează fiecare candidat în raport cu politica: { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**Câmpuri SLA** (setate în configurația combinației):

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

**Când se utilizează**: Sarcini de lucru de producție cu bugete stricte pentru latență, rată de eroare sau costuri.

**Aliasuri**: `sla-aware`, `sla`

---

#### 5. `lkgp` — ultimul furnizor cunoscut ca fiind funcțional este încercat primul

Încearcă mai întâi **ultimul furnizor cunoscut ca fiind funcțional** (dacă este setat), apoi revine la
strategia `rules`. Este utilă pentru afinitatea sesiunii — același furnizor gestionează
solicitările ulterioare dintr-o conversație.

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

    // Revenire la strategia rules
    return getStrategy("rules").select(pool, context);
  }
}
```

**Când se utilizează**: Conversații cu mai multe schimburi în care doriți ca același furnizor să gestioneze
solicitările ulterioare (de exemplu, pentru memorare în cache, continuitatea contextului sau consecvența tarifării).

**Alias**: `lkgp` (fără alias)

---

#### 6. `nadir` — alegerea modelului în funcție de prompt prin Nadir

Fiecare strategie de mai sus clasifică candidații pe baza propriei telemetrii; niciuna dintre ele nu citește
solicitarea. `nadir` trimite ultimul mesaj al utilizatorului, împreună cu ID-urile modelelor din grup, către
API-ul decizional al [Nadir](https://getnadir.com) (`POST /v1/bucket`) și direcționează solicitarea către modelul
pe care Nadir îl selectează din acel meniu (`simple` → cel mai ieftin model capabil, `complex` → modelul
de frontieră). Conexiunea care deservește modelul respectiv este în continuare aleasă de `rules`, astfel încât cota,
starea de sănătate și costul continuă să determine contul utilizat.

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

`OMNIROUTE_NADIR_API_KEY` și `OMNIROUTE_NADIR_BASE_URL` sunt valorile de rezervă din mediul de execuție pentru cele două
șiruri. `baseUrl` este necesar doar pentru o instanță Nadir găzduită local (un `/v1` final este acceptat).
Apelurile fără cheie ajung la nivelul anonim Nadir, care are o limită de rată per IP. Cu o cheie
([creați una](https://app.getnadir.com/dashboard/api-keys)), fiecare decizie este
înregistrată în panoul dvs. Nadir. Configurare și verificare complete:
[getnadir.com/docs/gateway-omniroute](https://getnadir.com/docs/gateway-omniroute/).

Ce părăsește sistemul: textul ultimului mesaj al utilizatorului (primele 16.000 de caractere), ID-urile
modelelor candidate și o etichetă de canal `source: "omniroute"`. Nu sunt trimise promptul de sistem, istoricul, instrumentele sau
antetele.

Comportamentul în caz de eroare este de tip fail-open: un timeout (implicit 2000 ms), un răspuns non-2xx, o gazdă
inaccesibilă, un răspuns incorect format sau o selecție din afara grupului determină utilizarea deciziei `rules`,
iar motivul primește prefixul `NadirStrategy: fallback (…)`. După un apel eșuat,
strategia omite rețeaua timp de 30 s, astfel încât o întrerupere generează un singur timeout la fiecare 30 s, în loc de
unul pentru fiecare solicitare. Evenimentele de rutare raportează `strategy: "nadir"` numai când Nadir a făcut efectiv
alegerea.

**Când se utilizează**: trafic cu niveluri mixte de dificultate într-un grup care acoperă mai multe niveluri de modele (un model mic, unul
mediu și unul de frontieră), când doriți să reduceți costul utilizării permanente a modelului de frontieră.

**Alias**: `nadir` (fără alias)

---

### Strategii personalizate de rutare

Puteți înregistra propria implementare `RouterStrategy` prin intermediul API-ului public:

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "My custom routing strategy";

  select(pool, context) {
    // Logica dvs. de rutare aici
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

Apoi utilizați-o:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### Ghid pentru selectarea strategiei de rutare

| Caz de utilizare            | Strategie   | Motiv                                         |
| --------------------------- | ----------- | --------------------------------------------- |
| Volum de lucru echilibrat   | `rules`     | Implicită — ia în considerare toți factorii   |
| Minimizarea costurilor      | `cost`      | Alege întotdeauna cea mai ieftină opțiune     |
| Minimizarea latenței        | `latency`   | Alege cel mai rapid furnizor fiabil           |
| SLO-uri stricte             | `sla-aware` | Filtrează după pragurile p95/eroare/cost      |
| Chat cu mai multe schimburi | `lkgp`      | Persistența sesiunii                          |
| Dificultate variabilă       | `nadir`     | Alege nivelul modelului pentru fiecare prompt |

Câmpuri pentru strategia compatibilă cu SLA:

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

## Adecvarea pentru sarcini

Peste 30 de modele evaluate pentru 6 tipuri de sarcini (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`). Acceptă modele wildcard (de exemplu, `*-coder` → scor ridicat pentru programare).

## Recapitularea variantelor Auto

Incluzând varianta simplă `auto` (implicită), plus cele 6 valori `AutoVariant` declarate în `autoPrefix.ts`, există **7 ID-uri de model care pot fi invocate**:

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`

(`AutoVariant` enumeră în sine 6 valori; a 7-a opțiune este „fără variantă” — varianta simplă `auto` — gestionată de `parseAutoPrefix()` ca `variant: undefined`.)

## Cum se integrează nivelurile în Auto-Combo

Funcția de evaluare cu 16 factori (`open-sse/services/autoCombo/scoring.ts`) tratează apartenența
la un nivel drept două semnale: `tierPriority` (0.0476) și `tierAffinity` (0.0476). Consultați
[tabelul canonic al factorilor de evaluare](#how-it-works-persisted-auto-combos) de mai sus pentru setul
complet `DEFAULT_WEIGHTS` — suprascrierile pentru fiecare pachet (ship-fast/cost-saver/quality-first/
offline-friendly) sunt enumerate în tabelul „Profiluri de ponderi pentru fiecare pachet”.

Nivelul singur **nu** impune ca Nivelul 1 să fie primul — dacă latența Nivelului 1 este mare sau
raportul cost-calitate este suboptim, câștigă Nivelul 2. Pentru a impune ordonarea după nivel, utilizați
strategia de combinație `priority` și organizați furnizorii în funcție de nivel.

Pentru a favoriza puternic Nivelul 1 (abonament), măriți ponderea `tierPriority`:

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

Consultați [`docs/guides/TIERS.md`](../guides/TIERS.md) pentru definițiile nivelurilor și clasificarea furnizorilor.

## Testare și acoperire

### Matrice de decizie de rutare deterministă (`npm run test:combo:matrix`)

`tests/integration/combo-matrix/*.test.ts` demonstrează rutarea** decizie** dintre toate cele 21 de strategii publice end-to-end prin conducta combo reală cu o batjocură în amonte. Acoperirea include:

- Toate cele 21 de strategii `ROUTING_STRATEGY_VALUES` (ordonate, ponderate, cost, context, fuziune, …).
- `quota-share` (intern) end-to-end: DRR fairness + saturație deprioritizare prin cusătura `selectQuotaShareTarget` reală (`registerQuotaFetcher` / `setLKGP` / `__setHeadroomSaturationFetcherForTests`).
- Acoperire universală `context-relay` pentru fiecare număr țintă.

Această suită rulează în CI (`test:integration` job) cu `--test-concurrency=1` și `--test-force-exit`, deci este deterministă și nu necesită acreditări live.

### Fum viu închis (NOT în CI — furnizori reali)

| Comanda                                | Ce face                                                                           |
| :------------------------------------- | :-------------------------------------------------------------------------------- |
| `npm run test:combo:live`              | Rutare reală în proces cu `RUN_COMBO_LIVE=1`; instantanee un OmniRoute DB         |
| `npm run test:combo:live:vps`          | apeluri HTTP împotriva unui server OmniRoute live (setează `COMBO_LIVE_BASE_URL`) |
| `npm run test:combo:live:vps:failover` | La fel, cu scenariile de failover intenționate                                    |

Aceste teste de fum exercită calea reală a firului (combo → provider → finalisation). Sunt excluși în mod intenționat din CI, deoarece necesită acreditări live și acces VPS.

---

## Fișiere

| Fişier                                                    | Scop                                                                                                                                        |
| :-------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `open-sse/services/autoCombo/scoring.ts`                  | Funcția de notare cu 16 factori, `DEFAULT_WEIGHTS`, normă de grup                                                                           |
| `open-sse/services/autoCombo/taskFitness.ts`              | Căutare de fitness model × task                                                                                                             |
| `open-sse/services/autoCombo/engine.ts`                   | Logica de selecție, bandit, plafon bugetar                                                                                                  |
| `open-sse/services/autoCombo/selfHealing.ts`              | Excluderea, sondele, modul incident                                                                                                         |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 profiluri de greutate (navigare rapidă, economisire a costurilor, calitate mai întâi, prietenos offline, fiabilitate mai întâi, mod haos) |
| `open-sse/services/autoCombo/autoPrefix.ts`               | `auto/` prefix parser + 6 variante                                                                                                          |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Construiește `AutoComboConfig` în memorie din conexiuni live                                                                                |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Cârlig de testare pentru batjocorirea registrului furnizorului                                                                              |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES` (22 de strategii)                                                                                                 |
| `src/sse/handlers/chat.ts`                                | Integrare: scurtcircuit auto-prefix                                                                                                         |
