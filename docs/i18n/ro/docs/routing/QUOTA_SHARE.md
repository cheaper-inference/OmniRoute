# Quota Sharing Engine (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇧🇦 [bs](../../../bs/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Referință documentație**: `docs/routing/QUOTA_SHARE.md`
> Parte din Grupul B (planurile 16 + 22).

---

## Prezentare generală

Motorul de partajare a cotelor distribuie echitabil cota bazată pe timp a unui furnizor (de ex., fereastra
de 5 ore Codex, Kimi 1500 cereri/h) între mai multe chei API care partajează
aceeași conexiune.

**Problema pe care o rezolvă:** OmniRoute intermediază multe chei API către același cont
al furnizorului din amonte. Fără o logică de partajare, un vârf de trafic de la cheia A poate epuiza
cota furnizorului pentru ora respectivă, lăsând cheile B și C blocate până la resetarea ferestrei.
Motorul previne acest lucru prin:

1. Urmărirea consumului continuu al fiecărei chei pentru fiecare dimensiune (%, cereri, tokenuri, $).
2. Aplicarea unui algoritm de partajare echitabilă cu utilizarea integrală a capacității: o cheie poate împrumuta din cotele
   neutilizate cât timp grupul global nu este saturat.
3. Aplicarea rezultatului pe calea critică (`chatCore.ts`) înainte ca solicitarea
   să ajungă la executorul din amonte.

---

## Algoritm: Echitabil-Partajare a muncii-Conservare

Implementat în `src/lib/quota/fairShare.ts`.

### Moduri

| Stare                                      | Modul       | Comportament                                                      |
| ------------------------------------------ | ----------- | ----------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Generos** | Cheia poate împrumuta până la limita globală minus consumat-total |
| `globalUsedPercent >= saturationThreshold` | **Strict**  | Aplicați strict cota echitabilă individuală                       |

`saturationThreshold = 0.5` implicit (env `QUOTA_SATURATION_THRESHOLD`).

Aceste două moduri descriu un pool în modul implicit de împrumut, `saturation`. Un pool în modul `consent` aplică întotdeauna regulile stricte, indiferent de saturație. Consultați [Împrumut cu consimțământ (opt-in per grup)](#consented-lending-per-pool-opt-in).

### Decizie pe dimensiune

Pentru fiecare dimensiune activă din pool, motorul calculează:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = current rolling value for this key (from QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Pentru dimensiunile `percent`, `consumed` provine în schimb din cartea de atribuire (consultați [Dimensiuni procentuale: atribuirea pe cheie](#percent-dimensions-per-key-attribution) ).

Apoi:

- **`policy = hard`** : dacă `consumed > fairShareAllowed` și modul este strict →** bloc** .
- **`policy = soft`** : dacă `consumed > fairShareAllowed` și modul este strict →** penaliza** (deprioritateze în combo; niciodată hard-block).
- **`policy = burst`** : permiteți cât timp există spațiu global, indiferent de cota echitabilă.

### Cap absoluto

`capValue` + `capUnit` pe o alocare este un plafon tare independent de mod sau politică. Orice dimensiune unde `consumed >= capValue` întotdeauna** blocuri** cererea. Pentru un capac `percent`, `consumed` este doar partea atribuită cheii.

### Verificare multidimensională

O cerere este blocată dacă** orice** dimensiunea din bazin ar bloca-o. Dimensiunile sunt independente — o epuizare de 5h% nu afectează dimensiunea% săptămânală.

### Împrumutarea

În modul generos, o cheie a cărei alocare este subconsumată poate folosi surplusul din cotele nealocate ale altor chei. Formula este:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

unde `consumedByOtherKeys = consumedTotal - consumedByThisKey`. Teto global (pool `limit` pentru acea dimensiune) este întotdeauna plafonul dur.

### Împrumut cu consimțământ (opt-in pentru fiecare grup)

Fiecare grup are un mod de împrumut. `saturation` este implicit și păstrează regulile de mai sus. În modul `consent` o cheie `hard` își trece cota numai în limita capacității pe care alte chei au fost de acord să o împrumute. Administratorul setează modul fiecărui pool. Fiecare deținător de chei își stabilește propriul consimțământ prin [Consimțământ de împrumut](#lending-consent).

Un consimțământ este un procent de la 0 la 100 și un termen limită opțional în milisecunde de epocă. Cheia împrumută acel procent din cota sa inactivă în timp ce termenul limită este în viitor.

Pentru o dimensiune, `L` este limita efectivă: limita planului înmulțită cu conturile din pool. Poarta calculează, pentru cheia solicitantă:

```
share_k         = w_k / 100 × L
idle_k          = max(0, share_k − consumed_k)
lent            = Σ over the other keys of lend_k / 100 × idle_k
taken           = Σ over the other keys of max(0, consumed_k − share_k)
borrowAvailable = max(0, lent − taken)
```

`w_k` este greutatea cheii sau `100 / n` pentru fiecare cheie când nicio greutate nu este mai mare de 0. `lend_k` este procentajul activ al cheii și 0 odată ce termenul limită a expirat. Consimțământul propriu al cheii solicitante nu contează niciodată. O cheie `hard` este refuzată odată ce consumul ei își atinge cota plus `borrowAvailable`.

Capacitatea pe care nicio alocare nu o pretinde (100 minus suma ponderilor) nu este împrumutată. Nicio cheie nu a fost de acord să o împrumute.

**Exemplu.** `L` este 1000.

| Cheie | Greutate | Distribuie | Consumat | Împrumută |
| ----- | -------- | ---------- | -------- | --------- |
| O     | 50       | 500        | 530      | 0%        |
| B     | 30       | 300        | 100      | 50%       |
| C     | 0        | 0          | 60       | 0%        |

- B împrumută 50% din 200 inactiv, adică 100. C a luat deja 60 peste cota sa. A poate împrumuta 40.
- A este servit la 530 și refuzat odată ce consumul său ajunge la 540.
- Înainte ca C să folosească ceva, cu A la nivelul sau sub cota sa, C putea împrumuta 100.
- Înainte ca C să folosească ceva, cu A la 530, C putea împrumuta 70.

**Greutate zero.** O cheie cu greutatea 0 are o pondere de 0. Este servită doar în timp ce consumul ei este sub ceea ce împrumută alții. Când nimeni nu împrumută, este refuzat de la prima cerere.

**Termenele limită.** Nicio sarcină de fundal nu expiră un consimțământ. Fiecare cerere compară termenul limită cu propriul său timp, iar un termen limită egal cu acel timp a trecut. Un termen stocat care nu este un număr finit sau care depășește cea mai mare dată pe care o poate păstra un `Date`, este considerat depășit.

**`soft` și `burst`.** Împrumutul nu le limitează. O cheie `soft` este deprioritizată odată ce depășește cota sa. O cheie `burst` trece în timp ce piscina are loc. Tavanul piscinei încă refuză fiecare cheie odată ce totalul piscinei atinge limita.

**Cost pe calea cererii.** O piscină `saturation` nu citește nimic mai mult decât înainte. Într-un grup `consent`, o dimensiune numărabilă citește celelalte chei numai pentru o cheie `hard` la sau peste cota sa, în timp ce o altă cheie împrumută. Apoi face o citire pe alta cheie, în paralel. O citire eșuată contează ca un consum de 0 pentru acea cheie. O dimensiune `percent` nu adaugă nicio citire, deoarece cartea de atribuire deține fiecare cheie.

**Editarea unui bazin.** O modificare păstrează consimțământul cheilor care rămân. Acest lucru este valabil pentru editările de alocare, înlocuirile la nivel de grup și apelurile `ensure`. O cheie eliminată își pierde consimțământul, iar o cheie adăugată înapoi începe la 0. Rutele de administrare returnează consimțământul fiecărei chei și nu îl scriu niciodată. Comutarea unui pool la `saturation` păstrează fiecare consimțământ stocat, care nu are efect în acel mod. Comutarea pool-ului la `consent` reactivează consimțământurile stocate al căror termen limită nu a depășit. Un deținător de cheie poate șterge un consimțământ stocat în oricare dintre modurile.

**Actualizare.** Dacă coloanele `lending_percent` și `lending_until` există deja, migrarea adaugă numai `borrow_mode`, iar procentele stocate rămân așa cum sunt. Fiecare piscină începe în modul `saturation`. Activați `consent` pentru fiecare piscină în vrăjitorul piscinei. Nu se deduce nimic din valorile stocate.

**Limitări.**

- Un creditor poate găsi piscina la plafonul său înainte de a-și folosi propria cotă. Capacitatea pe care alții au împrumutat-o contează pentru totalul fondului.
- Verificarea rulează înainte de cerere și nu rezervă nimic. Solicitările concurente citesc consumul înainte ca oricare să fie înregistrat, astfel încât capacitatea împrumutată poate fi cheltuită de mai multe ori, limitată de cererile în zbor. Verificarea de partajare a modului `saturation` are aceeași proprietate.

---

## Contor cu fereastră glisantă

Implementat în `src/lib/quota/sqliteQuotaStore.ts` și `redisQuotaStore.ts`.

Două segmente pentru fiecare `(apiKeyId, dimensionKey)`:

- `curr`: segmentul curent (`floor(nowMs / windowMs)`)
- `prev`: segmentul anterior (`curr - 1`)

Valoarea continuă efectivă:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Precizie**: acuratețe de aproximativ 99%. Eroarea este de cel mult 1% din dimensiunea ferestrei la
limita dintre segmente (inerentă aproximării cu 2 segmente).

### Concurență

Driver SQLite: un mutex în memorie pentru fiecare cheie `(apiKeyId | dimensionKey)` previne
condiția de cursă la citire-modificare-scriere. Modelul îl reflectă pe cel anti-thundering-herd din `src/sse/services/auth.ts`.

Driver Redis: script Lua EVAL pentru incrementare atomică — rulează ca o singură comandă Redis.

---

## Drivere

### SQLite (implicit, fără instalare)

- Tabel: `quota_consumption` (consultați migrarea `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Recomandat pentru implementările cu o singură instanță.
- Toate datele persistente sunt stocate în baza de date SQLite existentă a OmniRoute (`DATA_DIR/storage.sqlite`).

### Redis (opțional, pentru mai multe instanțe)

- Necesită pachetul npm `ioredis`.
- Contoarele sunt stocate în Redis; metadatele (pool-uri/alocări) rămân în SQLite.
- Recomandat pentru implementările cu mai multe replici, în care contoarele trebuie partajate.

### Comutarea driverelor

Prin interfața de setări (`/dashboard/settings` → Quota Store) sau prin variabile de mediu:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

Setarea din baza de date are prioritate față de variabila de mediu. Dacă `driver=redis`, dar URL-ul lipsește sau
`ioredis` nu este instalat, fabrica revine la SQLite și înregistrează un avertisment.

Ordinea de selectare a driverului:

1. Setarea din baza de date `quotaStore.driver`
2. Variabila de mediu `QUOTA_STORE_DRIVER`
3. Implicit: `sqlite`

---

## Multi-Dimensiune

O piscină poate avea mai multe dimensiuni. Fiecare dimensiune este independentă:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // global pool ceiling for this dimension
}
```

**Exemplu: planul Codex** (5h% + săptămânal%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

O cerere trebuie să îndeplinească toate dimensiunile pentru a fi permisă.

### Dimensiuni procentuale: atribuire pe cheie

Un plan procentual raportează o cifră de utilizare per cont și fereastră de plan. Furnizorul nu oferă contor pentru fiecare cheie API.

Pentru a împărți această cifră între chei, fiecare grup păstrează un registru de atribuire per cont și fereastră de plan. `src/lib/quota/percentLedger.ts` deține regulile cărții. `src/lib/quota/percentAttribution.ts` transformă cartea în numerele pe care le folosește. Rezultatul este o estimare construită din jetoanele pe care fiecare cheie le parcurge.

#### Lecturi care mișcă cartea

Cartea se deplasează numai pe propria figură a furnizorului pentru fereastra de plan solicitată. Aceste conexiuni raportează una:

| Furnizor                         | Planificați ferestrele |
| -------------------------------- | ---------------------- |
| Claude, printr-o conexiune OAuth | `5h`, `weekly`         |
| Codex                            | `5h`, `weekly`         |

Acestea nu contează ca o lectură:

- un răspuns pe care clientul furnizor îl marchează ca învechit
- o fereastră Claude al cărei procent nu l-a raportat furnizorul
- figura unei alte ferestre, sau cel mai rău caz peste ferestre
- de rezervă antet-limită de viteză
- o citire nereușită

Alți furnizori, inclusiv Claude cu o cheie API, nu au nicio carte. Fiecare cheie este taxată cu 0 pentru dimensiunile procentuale, ca înainte de această modificare.

O citire partajează memoria cache de 30 de secunde a semnalului de saturație. O citire Claude este datată de când cifra a fost observată în antetele răspunsului sau citită de la punctul final de utilizare, când se cunoaște momentul respectiv. Alte citiri sunt datate de când a fost construită intrarea în cache.

#### Ce păstrează cartea

Fiecare cerere înregistrată își adaugă jetoanele, o singură dată, la un contor per grup, cont și cheie. Un contor doar crește. Cartea păstrează trei lucruri:

- linia de bază: cifra când cartea s-a deschis sau fereastra sa întors ultima dată
- ultima cifră aplicată
- pe cheie, contorul său de jeton în același moment, numit marca sa

Cartea este actualizată atunci când aplicarea sau calea de utilizare calculează atribuirea. Scrierile sunt comparate și stabilite pe un număr de revizuire. Un scriitor care pierde reîncercări o dată la o lectură proaspătă.

#### Cum este calculată o parte a unei chei

Fiecare parte a tastei este calculată atunci când este citită cartea. Creșterea cifrei de la linia de bază este împărțită între chei proporțional cu jetoanele direcționate de la marca sa.

Together, acele jetoane explică cel mult un punct al cifrei pe jetoane `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` (implicit 1.000). Creșterea pe care nu o explică este externă. Linia de bază este de asemenea externă.

De exemplu, o carte se deschide la 0. Tasta A direcționează apoi 900.000 de jetoane și cheia B 100.000. La o cifră de 60, partea lui A este de 54 de puncte și partea lui B este 6.

Un numărător sub marcajul cheii a repornit și contează complet. O cheie fără semn, cum ar fi o cheie care se alătură piscinei în mijlocul unei ferestre, numără toate jetoanele sale. O cifră care este în decalaj față de jetoane provoacă o eroare care dispare la următoarea citire. Nu se acumulează.

`QUOTA_PERCENT_MIN_TOKENS_PER_POINT` se citește pe fiecare atribuție. O valoare care nu este un număr finit de cel puțin 1 scade la 1.000.

#### Cum o lectură schimbă cartea

Se aplică prima regulă de potrivire:

1. **Nicio carte încă:** lectura deschide cartea. Cifra sa este linia de bază și fiecare contor este marcat.
2. **Lectură mai veche:** o citire datată înainte de ultima aplicată este ignorată. La fel și o citire al cărei timp de resetare este cu mai mult de 30 de minute mai devreme decât cel stocat.
3. **Fereastră nouă pentru furnizor:** un timp de resetare cu mai mult de 30 de minute mai târziu decât cel stocat întoarce cartea. Cifra devine linia de bază și fiecare contor este marcat din nou. Cheile fără contor părăsesc cartea.
4. **Fereastra încheiată:** un timp de resetare stocat care nu este după ora datelor citirii înseamnă că acea fereastră s-a încheiat. Lectura transformă cartea, indiferent de figura ei.
5. **Cifra mai mare:** doar ultima cifră se mișcă. Linia de bază și semnele rămân.
6. **Aceeași cifră:** figura, linia de bază și semnele rămân. Este scris doar un timp de resetare care îi lipsește cărții.
7. **Cifra inferioară:** o cifră mai mică nu se aplică niciodată ca atare. Întoarce cartea doar când sunt valabile trei lucruri. Este cu cel puțin două minute mai nou decât ultima lectură aplicată. Nimic nu spune că fereastra este aceeași deschisă. Este cu mai mult de un punct mai jos.

Fereastra contează ca fiind aceeași deschisă atunci când țin trei lucruri. Ambele timpi de resetare sunt cunoscuți. Sunt la 30 de minute unul de celălalt. Cel stocat este încă înainte de citire. O cifră mai mică în interiorul acelei ferestre nu schimbă nimic.

Un timp de resetare este stocat numai în timp ce este înaintea timpului de date al citirii care îl poartă. O cifră mai mare stochează timpul de resetare a citirii sale atunci când acesta este utilizabil și îl păstrează pe cel stocat în caz contrar. O cifră egală înregistrează timpul de resetare a citirii sale numai atunci când cartea nu are niciuna. Nu schimbă nimic altceva. O cifră mai mică care nu întoarce cartea nu înregistrează nici un timp de resetare.

#### Când cartea este folosită

După o citire, cartea este utilizată, cu excepția cazului în care timpul de resetare stocat nu este după ora curentă. Acest caz apare atunci când o citire luată chiar înainte de resetare, cum ar fi una servită din cache, este observată imediat după aceasta.

Fără o citire utilizabilă, cartea stocată este utilizată numai în timp ce poate fi încă cartea ferestrei curente. Asta este valabil în două cazuri:

- timpul său de resetare este cunoscut și este încă înainte
- nu are timp de resetare, iar ultima citire care l-a schimbat este de cel mult 15 minute

Altfel nu se atribuie nimic, ca atunci când nu există carte. O carte al cărei timp de resetare stocat a trecut nu este niciodată taxată.

#### Executarea

Consumul unei chei pe o dimensiune procentuală este partea ei atribuită plus o cotă din partea externă. Partea externă utilizează mai întâi capacitatea fără revendicări (100 minus suma ponderilor). Doar excesul este împărțit între chei în funcție de greutate.

Acest consum este comparat cu cota echitabilă a cheii ca pentru orice altă dimensiune. Modul strict începe atunci când semnalul de saturație atinge `QUOTA_SATURATION_THRESHOLD` (implicit 0,5). Fiecare număr este scalat de limita efectivă: limita per cont înmulțită cu numărul de conturi din pool.

Un capac absolut cu `capUnit: "percent"` numără doar partea atribuită cheii, scalată în același mod. Luați o limită per cont de 100 și k conturi. O limită de N este apoi atinsă atunci când partea cheie din cifra contului de servire atinge N/k puncte. Fiecare cont este verificat cu propria carte. De exemplu, cu două conturi, se atinge un plafon de 10 la 5 puncte din cifra unui cont.

Când magazinul nu poate fi citit, nimic nu este atribuit și fiecare cheie este taxată cu 0 pe acea dimensiune. Când scrierea unei cărți eșuează, acea atribuire folosește cartea așa cum a fost citită. O scriere nereușită a simbolului lasă tokenurile acelei solicitări din carte. Niciuna dintre aceste erori nu blochează o solicitare.

Într-un grup `consent`, formula de creditare utilizează consumul fiecărei chei pe dimensiunea procentuală, așa cum este descris mai sus. Când o altă cheie împrumută, cartea este citită o dată și atribuită fiecărei chei. Fără o carte utilizabilă, fiecare cheie este taxată cu 0. O cheie cu o greutate apoi trece, iar o cheie cu greutatea 0 trece numai atunci când o altă cheie împrumută.

#### Ruta de utilizare

`GET /api/quota/pools/{id}/usage` raportează aceleași numere prin aceeași funcție. O dimensiune procentuală are o intrare pentru fiecare conexiune de grup în `accounts`. `consumedTotal` și `perKey` de nivel superior oglindesc prima intrare.

Traseul aplică și citirea curentă, astfel încât poate avansa cartea așa cum o face o solicitare. `internal + external` poate diferi de `consumedTotal` atunci când nu există o citire utilizabilă sau când nu se aplică o cifră mai mică.

#### Depozitare și reținere

Ambele magazine de cote țin evidența. Pe SQLite, curățarea automată a bazei de date, când este activată, elimină rândurile neactualizate timp de 60 de zile. Pe Redis, cărțile și contoarele unei conexiuni la pool au o singură cheie. Expiră la 60 de zile de la ultima scriere a simbolului sau schimbarea cărții. O carte care nu se schimbă nu este rescrisă, astfel încât limita este stabilită deasupra celei mai lungi ferestre de plan. Resetarea manuală a istoricului utilizării șterge, de asemenea, cărțile de pe SQLite (consultați Limitări).

#### Limitări

- Toată creșterea cifrei contului, din moment ce linia de bază este împărțită de simbolurile fiecare cheie direcționată de atunci. Când a avut loc această creștere, nu contează.
- Deci, utilizarea făcută în afara OmniRoute este taxată de chei până la ceea ce permit jetoanele lor. Aceasta include utilizarea făcută înainte de prima solicitare a unei chei a ferestrei, când cartea era deja deschisă.
- De exemplu, utilizarea în exterior crește contul cu 60 de puncte, fără rute cheie. O cheie direcționează apoi 30.000 de jetoane și cifra ajunge la 60,6.
- Dacă cartea a fost deschisă înainte de această utilizare, partea cheii este de 30 de puncte. De asemenea, are 7,65 de utilizare externă, cu patru chei cu greutatea de 25.
- Dacă cartea s-a deschis după acea utilizare, cele 60 de puncte sunt linia de bază. Partea cheii este de 0,6 puncte și are 15 de utilizare externă.
- O solicitare sau o vizită la traseul de utilizare deschide cartea. Deci, dacă o astfel de utilizare contează ca referință depinde de momentul în care s-a deschis cartea.
- Cu plafonul implicit, o cheie care direcționează 60.000 de jetoane în timp ce utilizarea în afara crește contul cu 60 de puncte, obține toate cele 60 ca parte proprie.
- Cu podeaua la 50.000, propria sa parte este de 1,2 puncte. Celelalte 58,8 sunt externe și încărcate în funcție de greutate, ca orice utilizare externă.
- Setați `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` aproape de ceea ce costă un punct în planul dvs. Utilizarea în exterior include traficul din același cont de la cheile din afara piscinei.
- În fiecare mod se aplică un plafon procentual. O cheie cu plafon poate fi refuzată în timp ce contul este mult sub pragul de saturație.
- Luați un plafon de 10 și 12 puncte de utilizare în exterior mai devreme în fereastră. O cheie care direcționează 20.000 de jetoane este apoi refuzată la o cifră de cont de 12,4%.
- Diviziunea este o estimare în funcție de volumul de simbol. O solicitare contează ca jetoane prompte plus jetoane de finalizare. Reducerile în cache și prețurile modelului nu modifică acest număr.
- O solicitare care nu se termină cu starea 200 nu înregistrează nici un simbol. Exemple sunt un flux pe care clientul îl deconectează și o eroare în amonte după ce utilizarea a fost consumată.
- Utilizarea cauzată de o astfel de solicitare este taxată de cheile care au înregistrat jetoane, până la ceea ce permit jetoanele lor. Restul este extern. Nu se mișcă înapoi. Un răspuns care raportează nicio utilizare a simbolurilor nu înregistrează nici un simbol.
- Utilizarea unei cereri în curs poate apărea în partea unei alte chei active pentru întreaga solicitare. Se mută înapoi numai când solicitarea se termină cu starea 200.
- Utilizarea deja în cont atunci când o carte se deschide este considerată externă. Aceasta acoperă o actualizare, un grup nou și un cont nou. Utilizarea într-o fereastră nouă înainte de prima citire contează și ca externă.
- Fiecare cheie începe cu cota sa de greutate a acelei utilizări, după ce capacitatea nu se solicită alocare. Cu un cont la 85% și cinci chei de greutate 20, fiecare începe cu 17 din cele 20 folosite.
- Într-un pool cu mai multe conturi, cifra contului de servire este aplicată bugetului însumat. Acest lucru este neschimbat de carte.
- O cifră mai mică în interiorul unei ferestre pe care furnizorul o raportează ca fiind deschisă nu este aplicată. Un timp de resetare care se deplasează înapoi cu mai mult de 30 de minute este tratat ca o citire veche.
- În ambele cazuri, cartea își păstrează starea până la trecerea timpului de resetare stocat. După aceea, cartea nu este încărcată până când o lectură o întoarce.
- Remediul este resetarea manuală a istoricului utilizării (`POST /api/settings/purge-usage-history`). Șterge cărțile de atribuire și contoarele lor de jetoane din baza de date SQLite.
- Perioada `all` șterge fiecare carte și contor. O perioadă mai scurtă șterge mai întâi cărțile care nu sunt scrise în ea. Apoi șterge contoarele care nu sunt scrise în el, ci numai pentru o conexiune la piscină care nu mai are nicio carte. O carte păstrată încă marchează fiecare cheie pe tejghea ei.
- O carte a cărei figură nu s-a mutat nu este rescrisă, așa că o perioadă mai scurtă poate șterge și cartea ferestrei curente. Următoarea lectură deschide apoi o carte nouă la cifra actuală.
- Resetarea nu atinge un magazin de cotă Redis. Acolo, o carte se termină cu fereastra sau expiră la 60 de zile după ultima sa scriere.
- Atunci când furnizorul nu trimite nici un timp de resetare, o fereastră care resetează și se umple deasupra cifrei vechi dintre două citiri arată ca o cifră mai mare. Cartea păstrează linia de bază și marcajele vechi.
- Citirile sunt datate după ceasul local. Când rulează înaintea furnizorului sau o sursă raportează un timp de resetare puțin mai devreme, cartea poate ajunge la această diferență mai devreme.
- Creșterea în acea perioadă scurtă este împărțită de jetoanele direcționate în el. Prima citire a ferestrei următoare o corectează. Când cartea întoarsă nu deține timp de resetare, acea corecție necesită o cifră mai mică cu cel puțin două minute mai nouă decât ultima citire aplicată.
- Instanțe care partajează citirile de date ale unui magazin Redis cu propriile ceasuri, așa că păstrați acele ceasuri sincronizate. Citirile unei instanțe al cărei ceas rulează în urmă par mai vechi și sunt ignorate.
- Când nu sosește nicio citire utilizabilă după timpul de resetare stocat, cotele procentuale pentru fiecare cheie și limitele procentuale nu sunt aplicate până când o citire revine. Fără un timp de resetare, acesta începe la 15 minute după ultima lectură care a schimbat cartea.
- În magazinul Redis, o carte inactivă timp de 60 de zile poate expira între cecul scrisului și scrierea acesteia. Este apoi re-creat la o revizuire peste 1, care este o stare validă.

---

## Resolverul de planuri

Implementat în `src/lib/quota/planResolver.ts`.

Ordinea de prioritate (de la cea mai mare la cea mai mică):

1. **Suprascriere manuală în baza de date** — tabelul `provider_plans`, per `connectionId`.
2. **Catalog cunoscut** — `src/lib/quota/planRegistry.ts` (doar date).
3. **Plan gol** — fără dimensiuni; este necesară configurarea manuală.

### Catalog cunoscut

| Furnizor              | Dimensiuni                                                    |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, necunoscut), `tokens/weekly`            |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Fără valori implicite — este necesară configurarea manuală    |

---

## Integrarea conductelor

### cârlig PRE (`open-sse/handlers/chatCore.ts`)

Se rulează înaintea executorului din amonte, după verificări de autentificare și politici:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() per dimension
      → fairShare.decideFairShare()
      → if block → return 429 (buildErrorBody, Hard Rule #12)
      → if allow + deprioritize → set quotaSoftPenalty=true on candidate
  → executor.execute()
```

**Nu se deschide** : dacă `enforceQuotaShare` aruncă, cererea este permisă printr-un jurnal `pino.warn`. Acest lucru împiedică o eroare a motorului de cote să blocheze tot traficul.

**Când capacitatea revine.** Un refuz la cota cheii sau la plafonul piscinei se termină cu una dintre cele două propoziții, în ambele moduri de împrumut:

- Fereastra `percent` : `. The <window> window resets at <time>.` Ora este resetarea raportată de furnizor.
- Unitate numărabilă: `. Enough <window> usage is expected to clear by <time>.` Timpul este o limită superioară din fereastra glisantă, dacă cheia nu trimite nimic altceva.

`<time>` este un instant ISO 8601 în UTC. Refuzul poartă atunci `Retry-After`: secundele întregi până în acel moment, plus unu. Un client care așteaptă atât de mult reîncercă cel mult o secundă după instant. Când momentul nu este cunoscut, refuzul nu poartă nici sentința, nici antetul. Un refuz absolut al plafonului nu implică niciunul. Codul public rămâne `quota_share_blocked`.

Un refuz de partajare nu atinge conexiunea partajată. Nu stabilește nicio perioadă de răcire, nicio blocare a modelului și nicio eroare a întreruptorului furnizorului, iar celelalte chei ale piscinei continuă să fie servite. Când fiecare țintă a unui combo refuză cheia pentru partea sa, combo-ul răspunde 429 fără să aștepte. Răspunsul său poartă indiciu ca `Retry-After`. Calea de încorporare își încheie refuzul cu aceeași propoziție și nu trimite `Retry-After`.

### cârlig POST (consum record)

După un răspuns de succes:

```
executor returns success
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() per dimension
      → fail-open: errors logged as pino.warn, never propagated to client
```

**Notă de deriva** : dacă `consume` eșuează după răspuns, contorul rulant este sub numărătoare. Semnalul de saturație de la furnizor (ex. `anthropic-ratelimit-unified-5h-utilization`) corectează estimarea globală la următoarea solicitare.

### Combo penalizare moale (`open-sse/services/combo.ts`)

Când `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // default 0.7
}
```

Penalizarea se aplică după toți ceilalți factori de scor. Reduce probabilitatea de combo automat de a selecta o cheie saturată fără a o bloca.

---

## UI Walkthrough

### `/dashboard/costs/quota-share` — Pagina principalelor piscine

Componente (toate în `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Componentă             | Scop                                                                                 |
| ---------------------- | ------------------------------------------------------------------------------------ |
| `QuotaConceptCard`     | Card introductiv care explică distribuirea cotelor pentru noii utilizatori           |
| `CreatePoolModal`      | Creați un nou grup de cote (conexiune + name + initial allocations)                  |
| `PoolCard`             | Rezumat per grup: nume, conexiune, număr de alocare                                  |
| `DimensionBar`         | Bară stivuită per dimensiune: cota fiecărei chei + utilizată la nivel global         |
| `AllocationTable`      | Tabel cu consumat, cotă echitabilă, deficit/surplus, steag de împrumut               |
| `BurnRateChart`        | diagramă cu linii cu rata de ardere EMA (Recharts leneși prin `dynamic()`)           |
| `EditAllocationsModal` | Editați ponderile, limitele și politicile de alocare pentru un grup                  |
| `BorrowModeField`      | Selectorul modului de împrumut (`saturation` sau `consent`) în expert                |
| `LendingBadge`         | Insigna numai pentru citire pe o cheie care se împrumută, numai în piscine `consent` |

Insigna de împrumut arată procentul și, atunci când este stabilit, termenul limită în UTC cu zona numită. Ea judecă termenul limită la momentul instantaneului de utilizare. Un termen expirat sau care nu poate fi citit este afișat ca `lending expired`.

Pagina agăță:

- `usePools` — preia `GET /api/quota/pools` la fiecare 30 de secunde.
- `usePoolUsage` — preia `GET /api/quota/pools/[id]/usage` la cerere.
- `useLocalStoragePoolMigration` — rulează o dată la montare pentru a migra datele LS vechi.

Pasul de chei al vrăjitorului piscinei are o cutie `Show usage by member to key holders`. Setează opțiunea `memberBreakdown` a pool-ului (consultați [Utilizarea membrilor](#member-usage) ). Sub ea, vrăjitorul avertizează că cineva care știe ce cheie a folosit poate potrivi o bară cu acea cheie. Cu caseta bifată, aceasta spune atunci când pasul listează mai puțin de trei sau mai mult de 20 de taste, deoarece barele rămân apoi ascunse. Numărează cheile în pas și nu poate spune care dintre ele poate face cereri.

### `/dashboard/costs/quota-share/plans` — Configurare plan furnizor

- `ProviderPlanConfigClient.tsx`: meniu derulant pentru a selecta un furnizor, pentru a vizualiza planul rezolvat (auto din catalog sau anulare manuală) și pentru a edita dimensiuni.
- Modificările scriu în `PUT /api/quota/plans/[connectionId]`.
- Ștergerea revine la catalog sau la planul gol.

---

## Cotă de autoservire API (înscriere)

`GET /api/v1/me/quota/{provider}` (servit și la `/v1/me/quota/{provider}`) permite unui deținător de cheie API să citească, cu propria sa cheie, cât de mult îi aparține un abonament partajat și ce îi blochează. Traseul este o coajă subțire peste `src/server/selfService/quotaHandler.ts`; vizualizarea este construită de `src/lib/quota/selfView.ts` și contractul său de răspuns este `src/shared/schemas/selfQuota.ts` (`SelfQuotaView` în `docs/openapi.yaml`).

### Activare și autentificare

- Caracteristică flag `QUOTA_SELF_PANEL`, implicit `false`. În timp ce este dezactivată, o solicitare care ajunge pe ruta devine 404. Cu `REQUIRE_API_KEY=true`, politica client API refuză o cheie lipsă sau nevalidă cu 401 înainte ca ruta să ruleze, indiferent de steag. O solicitare fără cheie, dar cu o sesiune de tablou de bord conectată trece acea politică și primește propriul răspuns al rutei. Indicatorul se rezolvă la fel ca orice alt semnal (dashboard sau REST override, apoi variabila de mediu cu același nume); vezi [`FEATURE_FLAGS.md`](../reference/FEATURE_FLAGS.md).
- Numele afișat al fiecărui grup și eticheta fiecărui program sunt returnate deținătorilor de chei ai piscinei exact așa cum le-a scris administratorul. Înainte de a porni steagul, verificați dacă acestea sunt apte pentru a fi citite de acești deținători de chei.
- Cheia este citită numai din anteturi: `Authorization: Bearer <key>` sau `x-api-key: <key>`. Când ambele sunt trimise, se folosește primul care validează. O cheie din șirul de interogare sau un cookie este ignorată. Cheia de mediu a serverului este refuzată (401).
- Cheia are nevoie de luneta `self:usage` (403 fără ea).
- Segmentul furnizorului este tăiat, cu litere mici și verificat cu `^[a-z0-9][a-z0-9._-]{0,63}$` (400 în caz contrar), apoi rezolvat prin registrul furnizorului, astfel încât un alias precum `cc` citește pool-urile `claude`. `claude` și `anthropic` citesc aceleași pool-uri.

### Ce arată fiecare vizibilitate

| Vizibilitate    | Necesită                                                                              | Câmpuri                                                                                                                                                                                                                                                                     |
| --------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cota proprie    | `self:usage`                                                                          | `pools[]` (ref, nume, furnizor, politică, greutate, limită), `dimensions[].yourShare`, `accounts[]` cu `yourShare` (pe o fereastră `percent` fără `attributed` și `external`), `blocks`, `availableModels`, `expiresAt`, `apiBaseUrl`                                       |
| Nivelul de cont | `self:usage` + `self:account-quota` și furnizorul din `sharedQuotaProviders` al cheii | adaugă `dimensions[].total`, `accounts[].dimensions[].account` și `accounts[].modelWindows`, `attributed` și `external` pe `yourShare` unei ferestre `percent` și `members` pe un pool cu utilizarea membrilor activată (consultați [Utilizarea membrilor](#member-usage) ) |

- `sharedQuotaProviders` este o setare per-cheie (`PUT /api/keys/[id]/self-service`): `null`, implicit, înseamnă fiecare furnizor la care ajunge cheia; `[]` înseamnă niciunul. `accountVisible` fiecărei piscine spune ce vizibilitate i s-a aplicat.
- Barele de cont și ferestrele de model sunt afișate numai pentru conturile a căror conexiune o poate folosi cheia. Când cheia are o listă de conexiuni permise, un cont din afara ei își păstrează intrarea `Account N` fără `account` sau `modelWindows`. O listă goală înseamnă nicio restricție, ca și pentru `/v1/me/status`. Totalul grupului (`dimensions[].total`) nu depinde de acea listă.
- Două cifre afișate numai cu `self:usage` provin din utilizarea altor taste. `exhausted` al unui buget de program reflectă consumul fiecărei chei din acel program. Într-un grup ale cărui greutăți sunt toate zero, `weight` cheii este `100 / number of members`. Ambele sunt ceea ce aplicarea se aplică cheii.
- Un pool este identificat doar prin `ref`, o valoare opac legată de cheia de apelare. Numele său afișat (`name`) este inclus așa cum l-a scris administratorul. Un `ref` este derivat din cheie și pool-ul cu secretul cheii API al serverului (`API_KEY_SECRET`). Clienții nu trebuie să-l persiste: se schimbă dacă acel secret este rotit.
- Conturile sunt listate ca `Account 1`, `Account 2`, … în ordinea grupului. Nu se returnează niciun ID de grup, ID de conexiune, adresa de e-mail a contului sau numele contului, iar răspunsul trece prin schema contractului, care elimină orice câmp din afara acestuia.
- Unitățile numărabile (`requests`, `tokens`, `usd`) sunt raportate ca găleată de grup pe care o impune poarta de cotă: `limit` = plan limit × accounts in pool, `fairShare` = weight / 100 × `limit` (diviziunea egală când fiecare greutate este 0), `consumed` = ' contorul propriu, `remaining` = `fairShare` − `consumed`, cu podea la 0.
- `blocks.schedules` listează ferestrele de programare ale cheii (`open`/`closed`, `blackout` sau `outside-window`, `retryAfterSeconds`, etaje de rezervă și dacă bugetul ferestrei este cheltuit); `blocks.modelCaps` își listează limitele orare pe model cu consum.
- O cheie din afara fiecărui pool al furnizorului primește 200 cu `pools: []`; `availableModels` (ID-urile `qtSd/` pe care cheia le vede în `/v1/models`), `expiresAt` și `apiBaseUrl` sunt încă completate.
- `apiBaseUrl` este `OMNIROUTE_PUBLIC_API_BASE_URL`, apoi `OMNIROUTE_PUBLIC_BASE_URL`, altfel `null`. Nu este niciodată originea proprie a cererii.

### `status` și `reason`

| `status`      | Sens                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ok`          | O lectură curentă.                                                                                                                                                                                                                                                                                                                                                                                        |
| `stale`       | Un cont memorat în cache este marcat ca neînvechit sau unul al cărui timp de resetare a trecut de când a fost citit. Se păstrează numerele. O fereastră de model al cărei timp de resetare a trecut marchează întregul grup `modelWindows` `stale`. Pentru partea proprie a cheii dintr-o fereastră `percent` : cartea a fost citită fără citirea contului în memoria cache a porții pentru a o confirma. |
| `unavailable` | Fără citire; numerele sunt `null`, niciodată `0`. `reason` spune de ce.                                                                                                                                                                                                                                                                                                                                   |

| `reason`                          | Când                                                                                                                                                           |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `store_unavailable`               | Magazinul de cote nu a putut fi citit sau nu poate citi cărțile de atribuire.                                                                                  |
| `percent_attribution_unavailable` | Cota proprie a cheii dintr-o fereastră `percent` : nu există încă nicio carte de atribuire pentru contul și fereastra respectivă sau cartea nu listează cheia. |
| `percent_window_ended`            | Partea proprie a cheii dintr-o fereastră `percent` : cartea aparține unei ferestre de plan care s-a încheiat.                                                  |
| `account_not_used_by_key`         | Cota proprie a cheii dintr-o fereastră `percent` : conexiunea contului se află în afara conexiunilor permise ale cheii. Cartea ei nu este citită.              |
| `window_not_reported`             | Cache-ul limitelor furnizorului nu are citire pentru fereastra respectivă a planului.                                                                          |
| `connection_lookup_failed`        | Conexiunea contului nu a putut fi citită.                                                                                                                      |
| `not_supported`                   | OmniRoute nu poate citi limitele de utilizare pentru furnizorul contului.                                                                                      |
| `fetch_failed`                    | Nicio citire în cache nu a fost utilizabilă și reîmprospătarea limitelor furnizorului nu a reușit.                                                             |
| `not_available`                   | Citirea nu are ferestre de utilizare sau contul nu are nicio citire.                                                                                           |

Când stocul de cote nu poate fi citit, câmpurile susținute de magazin ale `blocks` ( `exhausted` al unui buget de planificare, `consumed` și `reached` a unui plafon de model) sunt de asemenea `null`.

### Consimțământul de împrumut

`PATCH /api/v1/me/quota/{provider}` înregistrează propriul consimțământ al cheii de apelare pentru un grup. Folosește steag, anteturi și regulile furnizorului `GET`. Domeniul de aplicare `self:usage` autorizează această scriere, deși numele său se citește doar pentru citire.

```json
{
  "pool": "qpr_0123456789abcdef0123456789abcdef",
  "lendingPercent": 30,
  "lendingUntil": 1893456000000
}
```

- `pool` este `ref` pe care `GET` o returnează pentru acel pool.
- `lendingPercent` este un număr întreg de la 0 la 100. O valoare de 0 șterge consimțământul și termenul limită. Un corp cu `lendingPercent` 0 este acceptat în oricare dintre modurile.
- `lendingUntil` este opțional: milisecunde de epocă sau `null` pentru niciun termen limită. Trebuie să fie în viitor și cel mult 8640000000000000. O valoare sub 100000000000 se citește ca secunde și este refuzată.
- Orice alt câmp este refuzat. Un corp mai lung de 4096 de octeți este refuzat. Citirea se oprește la acea dimensiune, așa că un corp mai lung nu este niciodată ținut întreg.

Verificările rulează în ordinea acestui tabel. Fiecare refuz folosește corpul de eroare standard cu un mesaj fix. Un refuz al unuia dintre aceste verificări nu scrie nimic.

| Stare | Mesaj                                                                                              | Când                                                                   |
| ----- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| 404   | `Not found`                                                                                        | Steagul `QUOTA_SELF_PANEL` este stins.                                 |
| 401   | `Valid API key required`                                                                           | Cheia lipsește sau este invalidă sau este cheia de mediu a serverului. |
| 403   | `API key lacks the self:usage scope`                                                               | Cheia îi lipsește `self:usage`.                                        |
| 400   | `Invalid provider`                                                                                 | Segmentul de furnizor este nevalid.                                    |
| 429   | `Too many lending changes. Retry later.`                                                           | Cheia și-a depășit limita. Răspunsul poartă `Retry-After`.             |
| 400   | `Body must be { pool, lendingPercent, lendingUntil }. lendingPercent is an integer from 0 to 100.` | Corpul nu este JSON, este prea lung sau nu se potrivește cu schema.    |
| 400   | `lendingUntil must be a Unix time in milliseconds`                                                 | Termenul limită se citește în secunde.                                 |
| 400   | `lendingUntil must be in the future`                                                               | Termenul limită este la sau înainte de ora solicitării.                |
| 404   | `Pool not found`                                                                                   | `ref` nu numește niciun pool al acestei chei pentru acest furnizor.    |
| 403   | `Lending is not enabled for this pool`                                                             | Piscina este în modul `saturation` și `lendingPercent` este peste 0.   |
| 500   | `Failed to build quota view`                                                                       | Orice alt eșec. Cauza sa este înregistrată pe server.                  |

Limita este de 20 de solicitări pe 60 de secunde pentru fiecare cheie. Fiecare cerere care trece de verificarea furnizorului contează, chiar și una refuzată ulterior sau una care nu schimbă nimic. Are propriul contor, în afară de limita ratei de solicitare a cheii.

O solicitare care modifică consimțământul stocat scrie o înregistrare de audit `quota.pool.lending.updated`. Denumește cheia cu valorile vechi și noi. Același organism a trimis de două ori scrie o dată și auditează o dată. Răspunsul este 200 cu vizualizarea completă `GET`, construită după scriere.

Vederea `GET` raportează împrumuturile după cum urmează:

- Fiecare pool poartă `borrowMode` (`saturation` sau `consent`) și propriile `lendingPercent` și `lendingUntil` ale cheii.
- `lendingActive` este `true` doar într-un pool `consent`, cu un procent peste 0 și un termen limită neatins.
- Într-un grup `consent`, fiecare `dimensions[].yourShare` numărabil poartă `borrowAvailable`. Este ceea ce poate folosi cheia peste cota sa acum, împrumutată de celelalte chei.
- `borrowAvailable` folosește formula porții. Citește orice altă cheie, de asemenea, în timp ce cheia este sub partea sa. Pentru o cheie `hard` care este o citire suplimentară pe altă cheie și dimensiune numărabilă, în paralel.
- `borrowAvailable` este `null` pentru o cheie `soft` sau `burst` și `null` când o citire eșuează.
- `borrowAvailable` este o cifră pentru toate celelalte chei împreună. Într-un grup de două chei este figura proprie a celeilalte chei.
- `borrowAvailable` nu este raportat încă pentru `percent` windows sau în `accounts[]`.
- Într-un grup `saturation`, vizualizarea raportează consimțământul stocat cu `lendingActive: false` și fără `borrowAvailable`.

### Erori

Every response of this route, success or error, carries `Cache-Control: no-store`. A refusal that happens before the route runs does not carry it, for example the client API policy's 401 or the IP filter's 403. Errors of the route use the standard error body with a fixed message: 400 (invalid provider), 401 (missing or invalid key), 403 (missing `self:usage`), 404 (flag off) and 500 (`Failed to build quota view`). The 500 covers any failure once the request reaches the route, including the key lookup itself; its cause is logged on the server and never returned. The errors of the `PATCH` are listed in [Lending consent](#lending-consent).

### Limitări

- `remaining` este partea din cota echitabilă a cheii pe care nu a folosit-o. Nu este o garanție. O cheie poate fi în continuare servită dincolo de ea în timp ce piscina are loc. Odată ce totalul pool-ului ajunge `limit`, fiecare cheie a pool-ului este refuzată, indiferent de `remaining` propriu, iar o cheie fără `self:account-quota` nu poate vedea acel total.
- `remaining` nu ia în considerare `cap` absolut al alocării. Executarea refuză cheia odată ce consumul propriu într-o fereastră a unității capacului atinge valoarea plafonului.
- Bara la nivel de cont provine din memoria cache a limitelor furnizorului și poate întârzia decizia de executare cu câteva minute. O citire al cărei timp de resetare a trecut este raportată ca `stale`.
- Ferestrele per model (`modelWindows`) sunt raportate numai pentru furnizorii care au o mapare a ferestrei de plan: Claude și Codex astăzi. Pentru alți furnizori, `modelWindows` este încă prezent atunci când sunt afișate datele contului, cu o listă `windows` goală.
- Cota proprie a cheii dintr-o fereastră `percent` este o estimare. Acesta provine din cartea de atribuire și include toate limitările enumerate mai sus la „Dimensiuni procentuale: atribuire pe cheie”.
- `consumed` este numărul de aplicare în comparație cu cota echitabilă. Este `attributed` plus `external`, exact. `attributed` este partea pe care cartea o dă cheia pentru jetoanele pe care le-a trimis. `external` este partea cheii din utilizarea contului pe care cheile pool-ului nu iau în considerare.
- Ambele părți sunt trimise numai atunci când `accountVisible` pool-ului este adevărat: cheia are `self:account-quota` și furnizorul este în `sharedQuotaProviders`. O cheie fără ea devine `consumed` singură, cu aceleași `status` și `reason`.
- Cu ambele părți și cu greutatea proprie, un deținător poate stabili utilizarea făcută în afara piscinei care este încărcată la cheile piscinei. Un titular cu domeniul de aplicare a contului vede deja totalul contului.
- O cheie care nu a direcționat nimic în fereastră își poate citi încărcarea externă de la `consumed`, deoarece partea sa atribuită este atunci 0.
- De exemplu, o carte se deschide la 0, cu cheile A și B cu greutatea de 50 fiecare. Cheia A direcționează 900.000 de jetoane și cheia B 100.000. Contul ajunge apoi la 60% dintr-o limită de 100. Atunci `attributed` este 54 pentru cheia A și 6 pentru cheia B, iar `external` este 0 pentru ambele.
- Vederea citește cartea și nu scrie niciodată starea ei. Nu deschide o carte și nu cere niciodată furnizorului o lectură. Cu magazinul Redis, o citire elimină câmpurile de revizuire înlocuite din fundal, așa cum fac citirile porții.
- Cota este `ok` numai în timp ce memoria cache a porții conține o citire a contului. Fără unul, este `stale`, așa că într-o piscină fără nicio solicitare recentă se arată ca posibil depășit.
- Până când o solicitare trece prin pool, share-ul este indisponibil. Această solicitare deschide cartea, iar cifra contului în acel moment contează ca utilizare făcută în afara pool-ului.
- Într-un grup cu mai multe conturi, fiecare intrare de cont utilizează propria carte a contului respectiv și limita unui cont. Aplicarea mărește ambele părți în funcție de numărul de conturi, astfel încât proporția este aceeași.
- Ferestrele pentru fiecare model nu au nicio parte pentru cheie. Cartea nu păstrează date per model.
- Etajele de rezervă ale unui program nu sunt evaluate de vizualizare: un program poate apărea ca `open` în timp ce o solicitare este refuzată cu motivul `schedule-reserve`.
- Când două grupuri ale aceleiași chei partajează o conexiune, aplicarea aplică unul dintre ele, iar vizualizarea le afișează pe ambele.
- Nu există o limită pe adresă pentru încercările eșuate de cheie: în spatele unui proxy invers, apelanții pot partaja o singură adresă (depinde dacă adresele clientului redirecționate sunt de încredere), astfel încât o blocare ar putea interzice ruta către fiecare deținător de cheie. Cu `REQUIRE_API_KEY=true`, o cheie nevalidă este refuzată de politica client API înainte de rularea rutei, cu corpul 401 al politicii respective în loc de al acestei rute.

### Utilizarea membrilor

Un administrator poate permite deținătorilor de chei să vadă cum se împarte utilizarea unei ferestre între membrii grupului. Opțiunea este `memberBreakdown` al piscinei, dezactivată în mod implicit. Este setat în vrăjitorul piscinei sau cu `PATCH /api/quota/pools/{id}`. `GET /api/quota/pools` și `GET /api/quota/pools/{id}` îl raportează.

O dimensiune a vederii poartă `members` numai atunci când toate acestea sunt valabile:

- opțiunea piscinei este activată
- pool-ul are cel mult 20 de chei alocate, iar cel puțin trei dintre ele pot face cereri: active, nerevocate, nebandate și nu depășite expirarea acestora
- `accountVisible` pool-ului este adevărat: cheia are `self:account-quota` și furnizorul este în `sharedQuotaProviders` său
- într-o fereastră `percent`, conexiunea contului este una pe care o poate folosi cheia
- s-a citit propria cheie din acea fereastră: `status` său nu este `unavailable`

Altfel `members` este absent. Nu este niciodată o listă goală.

- Fiecare felie este `{ slot, consumed, isYou }`. Schema de răspuns respinge orice altă proprietate de pe o secțiune și o listă de mai mult de 20 de secțiuni. Feliile sunt listate în ordinea sloturilor.
- Există o felie pentru fiecare cheie alocată, inclusiv o cheie care nu mai poate face cereri. Un membru fără folos arată un zero real.
- Slot 1 este întotdeauna cheia întrebat, cu `isYou` adevărat. Celelalte numere de slot sunt rangurile unui hash cu cheie. Este cheia cu `API_KEY_SECRET` și acoperă piscina, cheia care solicită și membrul.
- Deci numerele nu se aliniază între titulari. Pentru un deținător, acestea rămân aceleași între vizite. Se pot schimba atunci când o cheie se alătură sau părăsește pool-ul sau când acel secret este rotit.
- Într-o fereastră numărabilă, o felie este contorul membrului din magazinul de cote, același contor ca și propriul `consumed`.
- Pe o fereastră `percent` o felie este partea `attributed` a membrului, din aceeași carte citită ca cota proprie a cheii. Utilizarea făcută în afara piscinei nu este niciodată împărțită în felii. Acea sarcină este împărțită în funcție de greutate, astfel încât feliile care o transportau ar arăta greutățile.
- Fiecare vizualizare citește o valoare pentru fiecare alt membru și fereastră numărabilă, în paralel. Pe o fereastră `percent` feliile nu costă nicio citire dincolo de propria carte citită. Când o valoare nu poate fi citită, acea fereastră nu are `members`, iar cota proprie a cheii rămâne.
- Opțiunea și numărul de chei utilizabile sunt citite o dată pe grup și numai pentru o cheie care poate vedea datele contului. O citire nereușită a opțiunii sau a numărului de chei utilizabile dezactivează barele pentru acel pool. Serverul înregistrează un avertisment, iar restul vizualizării este construit.

Barele nu poartă nume sau coduri. Încă îi spun unui deținător de cheie lucruri despre ceilalți membri:

- Deținătorii pot încă potrivi feliile după valorile lor.
- O numerotare stabilă permite unui deținător să urmărească un membru în timp.
- Numărul de felii arată câte chei sunt alocate în pool.
- Într-un grup de trei chei, cineva care știe ce cheie a folosit poate spune ce a folosit ultima cheie.
- Când o piscină scade sub trei chei utilizabile, barele dispar. Vizualizările luate mai devreme arată încă ce a folosit fiecare membru.
- Într-o fereastră numărabilă, totalul pool-ului minus feliile poate arăta utilizarea cheilor care nu mai sunt alocate.
- Un membru care arată zero într-un cont și folosește pe altul poate arăta care membru folosește acel cont.
- Într-un grup numărabil cu politica `hard`, o porție care nu mai crește la cota echitabilă a unui membru indică greutatea acelui membru.

### Seria de utilizare (`GET /api/v1/me/usage`)

`GET /api/v1/me/usage?range=<range>` (servit și la `/v1/me/usage`) returnează utilizarea și costul cererilor proprii ale tastei de apelare: totaluri, o intrare pe zi UTC, pe zi și model, pe model și pe furnizor. Împărtășește steagul, regulile de autentificare, domeniul de aplicare `self:usage`, `Cache-Control: no-store` și comportamentul de eroare al rutei cotei de mai sus. Cheia este verificată înainte de `range`. Erorile sunt 400 (`Invalid range`), 401, 403, 404 și 500 (`Failed to build usage`).

- `range` este unul dintre `1d`, `7d`, `30d` (prestabilit) sau `90d`. Orice altă valoare, o valoare goală sau un parametru repetat este un 400. Setul se oprește la `90d` pentru a limita costul unui apel. Vizualizarea citește numai istoricul brut de utilizare, niciodată rezumatele zilnice, care nu au nicio cheie.
- Rândurile sunt selectate după id-ul tastei de apelare. Coloana cu numele cheii nu se potrivește niciodată, iar rândurile înregistrate fără un ID de cheie nu sunt niciodată numărate.
- Construirea unei serii rulează cinci interogări grupate peste rândurile cheii din fereastră. Seria construită este reutilizată timp de 60 de secunde per tastă și interval, iar un apel reutilizat nu rulează niciunul. `generatedAt` său îi dă vârsta.
- Fereastra se termină când se construiește seria. Un rând ștampilat mai târziu, de exemplu prin înclinare a ceasului, nu este luat în considerare.
- `coverage.retentionDays` este setarea brută de păstrare a istoricului utilizării a operatorului (`retention.usageHistory` în setările bazei de date). `coverage.truncatedByRetention` este adevărat atunci când intervalul solicitat este mai lung decât acea setare. Compară cele două numere și nu verifică dacă lipsesc de fapt rânduri.
- Furnizorul este returnat așa cum a fost înregistrat pentru cererile proprii ale cheii. Modelul este numele înregistrat după ultimul său `/`, iar rândurile sunt grupate după acesta. O cerere combo a cărei fiecare țintă a fost refuzată este înregistrată cu eticheta de rutare ca furnizor (numele combo, `auto` sau `combo`) și șirul de model trimis de client. Alte solicitări refuzate, de exemplu de un întrerupător de circuit deschis, o răcire a modelului sau un salt parcat în cotă, păstrează furnizorul și modelul țintă.
- Pe lângă numărări și costuri, răspunsul are o latență medie, rate de succes și timpii primei și ultimei solicitări.
- `byModel` listează cele 50 de perechi furnizor și model cu cele mai multe solicitări. Cu mai multe perechi, intrările sale nu se adună la `summary`, iar `summary.uniqueModels` numără fiecare ortografie a modelului înregistrat. `byModelTruncated` este atunci adevărată, iar un model ale cărui perechi cad pe ambele părți ale tăieturii arată totaluri parțiale.
- Sunt raportate două costuri. `costUsd` este costul facturat, după cum arată analizele de utilizare. Furnizorii de abonament cu tarif fix, cum ar fi planul Claude Code, numără 0 USD acolo. `listPriceUsd` este același preț de utilizare la preț de listă, inclusiv abonamente. O solicitare al cărei model nu are un rând de preț își contorizează costul stocat: un cost pe care furnizorul l-a raportat sau unul calculat când solicitarea a fost înregistrată. Doar o cerere cu niciuna dintre ele contează 0, fără marcaj, deci un total poate fi parțial.
- Contractul de răspuns este `src/shared/schemas/selfUsage.ts` (`SelfUsageSeries` în `docs/openapi.yaml`).

### Pagina de autoservire

Cu `QUOTA_SELF_PANEL` activat, `/quota/{provider}` este o pagină publică. Un deținător de cheie scrie acolo o cheie API și vede pool-urile acelei chei pentru furnizor. Fiecare piscină arată câte un card pe fereastra de piscină, cu utilizarea piscinei pentru toată lumea și cota proprie a cheii. Fiecare cont al pool-ului are propriile carduri, cu utilizarea contului și cota cheii. Utilizarea contului apare numai atunci când cheia poate vedea datele contului. Pagina listează, de asemenea, limitele per model ale fiecărui cont și propria utilizare a cheii. O notificare apare atunci când un program blochează cheia chiar acum. Un card enumeră fiecare capac pentru fiecare model al cheii cu utilizarea sa și le marchează pe cele atinse. `{provider}` este un ID de furnizor sau aliasul acestuia (`/quota/claude`, `/quota/cc`). Un furnizor necunoscut și fiecare cale `/quota/*` în timp ce indicatorul este dezactivat, răspunde la 404. Pool-urile de pe un nod personalizat compatibil OpenAI sau Anthropic nu au nicio pagină. API încă răspunde pentru ei.

Pagina nu are sesiune. Cheia este trimisă numai în antetul `Authorization` al `GET /api/v1/me/quota/{provider}`, `PATCH /api/v1/me/quota/{provider}` și `GET /api/v1/me/usage`, niciodată într - un URL. O cheie pe care serverul o acceptă este păstrată în `sessionStorage` din filă. Cu „Amintiți-vă pe acest dispozitiv” este păstrat în `localStorage`, iar „Uitați cheia” o elimină din ambele. O cheie pe care serverul o respinge este scoasă din stocare.

Un grup în modul `consent` arată un card de împrumut. Acolo, deținătorul cheii stabilește un procent întreg de la 0 la 100 din cota inactivă a cheii pentru a împrumuta. Deținătorul alege, de asemenea, cât durează consimțământul: până la oprire, 1 oră, 8 ore, 24 ore, 7 zile sau 30 de zile. O durată contează din momentul salvării. Cât timp este în vigoare un termen, titularul îl poate păstra. Dacă termenul limită trece înainte de Salvare, cardul nu trimite nimic și solicită o altă alegere. Cu 0% nu se trimite niciun termen limită. Cardul arată termenul stocat cu fusul orar numit. Un consimțământ al cărui termen limită a trecut este afișat ca încheiat.

Pentru o cheie `hard` cardul afișează, de asemenea, pentru fiecare fereastră de piscină, ce alte chei împrumută cheii chiar acum. Fiecare rând este o cifră pentru toate celelalte chei împreună. Într-un grup de două chei este figura proprie a celeilalte chei. O cifră pe care vizualizarea nu o raportează se citește ca fiind indisponibilă, nu zero. Pentru o cheie `soft` sau `burst` cardul spune că nu se aplică nicio cifră.

Un pool în modul `saturation` a cărui cheie stochează un procent peste 0 arată doar o retragere. Se spune că procentul stocat nu are niciun efect acolo. Butonul său Retrage trimite 0 fără termen limită. Un grup în modul `saturation` cu un 0 stocat nu arată nicio carte de împrumut. După o salvare, un card de care vizualizarea returnată nu mai are nevoie rămâne cu mesajul său până când vizualizarea paginii se schimbă din nou.

Nimic nu este salvat până când titularul apasă pe Salvare sau Retragere. Fiecare apăsare trimite o solicitare `PATCH /api/v1/me/quota/{provider}`, iar oa doua apăsare nu trimite nimic în timp ce prima este în așteptare. Corpul poartă `ref` opac al piscinei din vedere, procent și termen. Răspunsul este vizualizarea cotei reconstruită, iar pagina o arată fără a doua citire. Când două salvări se suprapun, pagina citește cota o dată după ultimul răspuns. Pagina nu păstrează consimțământul în stocarea browserului.

O schimbare refuzată este explicată pe card printr-un text ales din statutul HTTP. Corpul erorii nu este citit. Un 401 spune că cheia nu a fost acceptată și reîncarcă cota. Un 403 spune că pool-ul nu primește modificări de împrumut, iar un 404 spune că pool-ul a dispărut. Ambele oferă un buton care reîncarcă cota. Un răspuns 400 sau un alt 4xx cere deținătorului să verifice procentul și termenul limită. A 429 îi cere titularului să aștepte, cu secundele de `Retry-After` când le oferă răspunsul. Un răspuns 5xx, un 408 sau o eroare de rețea spune că modificarea poate să nu fi fost salvată și păstrează valorile tastate. Un răspuns în afara contractului reîncarcă cota. O salvare eșuată nu scoate cheia de la sine. Când reîncărcarea după ce este refuzată, pagina elimină cheia ca în orice citire refuzată.

Odată ce o cheie este acceptată, pagina afișează și un card „Configurați-vă instrumentele” cu trei file. „Codul Claude ” oferă blocul `env` pentru `~/.claude/settings.json`. „Shell” oferă aceleași variabile ca și liniile `export`. „Claude Desktop” oferă valorile pentru fereastra sa de inferență terță parte. Modelele sunt modele de cotă-cotă pe care cheia le poate solicita furnizorului respectiv. Când nu vine o astfel de listă cu cheia, blocul activează în schimb descoperirea modelului de gateway. Adresa gateway-ului este originea publică API pe care o raportează serverul (`OMNIROUTE_PUBLIC_API_BASE_URL`, apoi `OMNIROUTE_PUBLIC_BASE_URL`). Când niciunul nu este setat, cardul arată un substituent și îi spune deținătorului să solicite administratorului. Cheia este afișată ca substituent. „Include cheia mea” pune întreaga cheie în textul de pe ecran și în ceea ce copiază un buton de copiere. Aceasta durează până când caseta este golită, cheia este uitată sau înlocuită sau pagina este părăsită. Cardul nu trimite nicio cerere și nu oferă descărcare de fișiere.

O citire a semnelor API `stale` este afișată ca posibil depășită. O citire pe care o marchează `unavailable` este afișată cu motivul său, niciodată ca zero.

În planurile procentuale, pagina atrage cota proprie a cheii atunci când API o raportează. Se spune că numărul este o estimare și își numește cele două părți. Limitele per model arată numai contul.

Când o fereastră poartă `members`, cardul său arată și o bară cu un segment per membru, în ordinea slotului. Segmentul tastei care solicită folosește culoarea de accent. Celelalte segmente parcurg culorile diagramei temei. O legendă text listează fiecare segment cu valoarea sa, astfel încât nimic nu depinde de culoare. Segmentele sunt etichetate `You` sau `Member N`, unde N este slotul.

### Port dedicat pentru pagină

`QUOTA_PANEL_PORT` deschide un al doilea ascultător care servește doar pagina de autoservire. Este dezactivat, cu excepția cazului în care variabila este setată. `QUOTA_PANEL_HOST` este adresa de legare și este implicit `127.0.0.1`.

Ascultătorul transmite aceste căi către portul principal și răspunde la 404 pentru fiecare altă cale:

| Cale                                                                     | Servește                                       |
| ------------------------------------------------------------------------ | ---------------------------------------------- |
| `/quota/{provider}`                                                      | Pagina                                         |
| `/api/v1/me/quota/{provider}`, `/v1/me/quota/{provider}`                 | Vizualizarea cotei pe care o citește pagina    |
| `/api/v1/me/usage`, `/v1/me/usage`                                       | Seria de utilizare pe care o citește pagina    |
| `/_next/static/`                                                         | Scripturi, stiluri și fonturi ale construcției |
| `/favicon.ico`, `/favicon.svg`, `/icon-512.png`, `/apple-touch-icon.png` | icoane                                         |

`GET` și `HEAD` sunt transmise fără corp. De asemenea, este transmisă o cerere cu un corp: un `PATCH` al căii de vizualizare a cotei, pe care pagina o trimite pentru a salva o alegere de împrumut. Orice altă metodă răspunde la 404, cu excepția unei cereri CONNECT, a cărei conexiune este închisă fără răspuns. Orice altă solicitare care declară un organism răspunde la 404 și legătura acestuia este închisă. Solicitările de upgrade sunt refuzate și conexiunea lor este închisă. O cale cu un segment de punct sau un marker de fragment este refuzată, ca pe portul API. La fel este și o țintă de solicitare cu un caracter în afara ASCII imprimabil. Un caracter de control brut din țintă primește un răspuns 400 de către analizatorul HTTP, înainte de verificarea propriei porturi. Antetele de solicitare pe care framework-ul le rezervă pentru uz propriu nu sunt transmise: nume care încep cu `x-middleware-`, `x-invoke-`, `x-nextjs-`, `x-now-` sau `x-next-`, iar numele `x-matched-path` și `next-resume`. Solicitarea este transmisă fără ele. Tabloul de bord, pagina de autentificare, managementul API și rutele de inferență nu pot fi accesate prin acest port.

`PATCH` trebuie să poarte `Content-Type: application/json`, fără niciun parametru sau numai cu `charset=utf-8`. Trebuie să aibă un `Content-Length` de la 1 la 4096, scris ca cifre simple, și nici `Transfer-Encoding`. Un `PATCH` care încalcă una dintre aceste reguli răspunde 404. Unele lungimi neformate, cum ar fi una semnată sau una repetată, primesc răspuns 400 de parserul HTTP înainte de verificarea propriei porturi. Portul citește octeții declarați înainte de a contacta portul principal și îi așteaptă cel mult 5 secunde. Un corp care nu este complet până atunci răspunde la 404 și conexiunea sa este închisă. Nimic nu ajunge la portul principal în acest caz sau când clientul pleacă primul. Portul transmite exact octeții declarați, cu același `Content-Length`. Octeții după ei sunt citiți ca următoarea solicitare a conexiunii. Un proxy invers TLS din față trebuie să redirecționeze `Content-Length` și nu trebuie să reparteze corpul cererii. Portul principal verifică cheia API din antetul `Authorization`, ca și pentru `GET`.

Caroseria 404 este `{"error":"not_found","message":"Not found."}`. Un releu eșuat răspunde la 502 (`api_bridge_unavailable`) sau 504 (`api_bridge_timeout`) fără câmp `detail`.

Ascultătorul nu citește `QUOTA_SELF_PANEL` și nu pornește pagina. În timp ce steagul este dezactivat, pagina și API ul ei răspund 404 pe portul principal, iar ascultătorul transmite acel răspuns.

Sub serverul de dezvoltare (`next dev`), pagina nu devine interactivă prin acest port. Socket-ul de reîncărcare la cald de dezvoltare este o solicitare de upgrade, iar portul o refuză. Utilizați portul principal în timpul dezvoltării.

Portul servește HTTP simplu, iar pagina trimite chei API. Păstrați adresa de legare implicită și puneți un proxy invers cu TLS în fața ei. O adresă de legătură, alta decât loopback, înregistrează această notificare:

```text
[Quota Panel] Bound to <host>. This port serves plain HTTP and the page sends API keys. Put a TLS reverse proxy in front of it.
```

Un peer loopback care nu trimite niciun antet de redirecționare contează ca local pe portul principal. Deci un proxy de pe aceeași gazdă trebuie să trimită `X-Forwarded-For`. Un proxy pe o adresă privată este de încredere pentru acel antet numai cu `OMNIROUTE_TRUST_PROXY=private` (sau `lan`). Orice alt peer este raportat de adresa conexiunii sale, iar anteturile de redirecționare trimise sunt eliminate.

Ascultătorul deține cel mult 256 de conexiuni simultan. Un client are 10 secunde pentru a trimite antetele cererii și 30 de secunde pentru a trimite întreaga cerere. O conexiune inactivă menținută în viață se închide după aproximativ 5 secunde. O conexiune fără activitate timp de 60 de secunde este închisă. Aceste valori sunt fixe. Setați limitele de conexiune și de rată și pe proxy-ul invers din față. Un proxy inversat din față ar trebui să-și păstreze conexiunile inactive din amonte pentru mai puțin de 5 secunde sau să nu le refolosească. Releul către portul principal utilizează timeout-urile din amonte ale portului API (`API_BRIDGE_*`).

Ascultătorul începe și când `API_PORT` nu este setat. `QUOTA_PANEL_PORT` trebuie să fie un port de la 1 la 65535, scris doar în cifre. Trebuie să difere de portul tabloului de bord și portul API. În timp ce serverul WebSocket live este activat, acesta trebuie să difere și de `LIVE_WS_PORT` (implicit 20132). Orice altă valoare nu deschide nimic și înregistrează un avertisment. Un avertisment despre o valoare refuzată denumește variabila și nu repetă valoarea. Un port care este deja în uz nu deschide nimic și înregistrează acest avertisment:

```text
[Quota Panel] Port <port> is already in use. The quota panel port stays off.
```

Cu `OMNIROUTE_BASE_PATH` setat, ascultătorul se așteaptă la fiecare cale de mai sus sub acel prefix. Utilizați același `OMNIROUTE_BASE_PATH` în timpul construirii și în timpul executării. Scrieți-l cu o oblică de început și fără bară oblică de final, de exemplu `/omniroute`. O altă formă, inclusiv `/` și `/omniroute/`, lasă portul oprit cu un avertisment, deși versiunea acceptă acele forme. La fel și o cale de bază al cărei prim segment denumește o rută de aplicație: `api`, `v1`, `v1beta`, `_next`, `quota`, `dashboard`, `docs`, `login`, `codex`, `responses`, `anthropic`, `openai`, `v0` sau `connect`,în orice caz.

Limitări:

- `/quota/{provider}/` cu o bară oblică finală răspunde 404 pe acest port.
- Lucrătorul de servicii și manifestul aplicației web nu sunt difuzate pe acest port.
- Un set de favicon personalizate în tabloul de bord nu este afișat pe acest port.
- Pictogramele nu sunt afișate atunci când aplicația rulează sub o cale de bază.
- Portul vorbește simplu HTTP/1.1.
- O legătură care eșuează nu este reîncercată până când procesul nu repornește.
- Ascultătorul nu are conexiune sau limită de rată pentru fiecare adresă de client.
- Configurațiile containerelor nu sunt acoperite de această secțiune.

---

## Variabile de mediu

| Variabilă                            | Implicit       | Descriere                                                                     |
| ------------------------------------ | -------------- | ----------------------------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`                 | `sqlite`       | Driver de utilizat: `sqlite` sau `redis`                                      |
| `QUOTA_STORE_REDIS_URL`              | _(gol)_        | Redis URL, de exemplu `redis://localhost:6379`                                |
| `QUOTA_SATURATION_THRESHOLD`         | `0.5`          | 0..1; `>= threshold` activează modul strict                                   |
| `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` | `1000`         | Jetoane care explică cel mult un punct dintr-o fereastră de plan procentual   |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`     | `0.7`          | 0..1; multiplicator pentru scorul combinat soft-policy                        |
| `QUOTA_CONSUMPTION_RETENTION_DAYS`   | `14`           | Cu zile înainte ca GC să elimine vechile găleți `quota_consumption`           |
| `QUOTA_PANEL_PORT`                   | _(dezactivat)_ | Port dedicat pentru pagina de autoservire. Dezactivat înseamnă că nu ascultă. |
| `QUOTA_PANEL_HOST`                   | `127.0.0.1`    | Adresă de legare pentru acel port                                             |

setările DB (`quotaStore.*`) suprascriu vars.

---

## Depanare

### Redis este configurat, dar nu se conectează

Verificați dacă `ioredis` este instalat (`npm ls ioredis`) și dacă `QUOTA_STORE_REDIS_URL`
este accesibil. Dacă conexiunea eșuează, fabrica revine la SQLite (eveniment înregistrat la nivelul
`warn`).

### `peek` returnează date învechite / fail-open

Dacă `peek` generează o excepție, `enforceQuotaShare` tratează rezultatul ca „permite” (fail-open).
Verificați jurnalele `pino` pentru intrările `quota:enforce` și `quota:factory` pentru a identifica
cauza principală.

### Deriva contorului de consum

Dacă utilizarea reală a furnizorului diferă de contoare, acest lucru este de așteptat — fereastra
glisantă cu 2 bucket-uri are o eroare de aproximativ 1% la limitele ferestrei, iar `consume` este
executat asincron, fără a se aștepta rezultatul, după răspuns. Semnalul de saturație (`saturationSignals.ts`)
citește utilizarea reală a furnizorului cu un TTL de 30 s și ajustează `globalUsedPercent`
în consecință.

### Pool-ul afișează „fără date” pentru rata de consum

`computeBurnRate` necesită cel puțin 2 eșantioane istorice. Pool-urile noi fără apeluri
`consume` anterioare vor afișa `tokensPerSecond: 0` și `timeToExhaustionMs: null`.

---

## Migrarea din localStorage

Când `/dashboard/costs/quota-share` se încarcă pentru prima dată, hook-ul `useLocalStoragePoolMigration`
verifică:

1. `localStorage.getItem("omniroute:quota-share:pools")` nu este gol.
2. `GET /api/quota/pools` returnează `[]` (baza de date este goală).

Dacă ambele condiții sunt adevărate, trimite fiecare pool vechi către `POST /api/quota/pools` în lot,
apoi elimină cheia din localStorage. Migrarea este idempotentă: condiția 2 împiedică
remigrarea.

---

## Clasificarea internă a strategiei

`quota-share` este o strategie de rutare **doar pentru uz intern** (`INTERNAL_ROUTING_STRATEGY_VALUES` în
`src/shared/constants/routingStrategies.ts`). Este utilizată exclusiv de combinațiile de pool-uri `qtSd/`
generate de sistem și este exclusă în mod deliberat din `ROUTING_STRATEGY_VALUES`, astfel încât să nu
apară niciodată ca opțiune selectabilă de utilizator în interfața cu utilizatorul sau în API.

---

## Acoperire de testare

Două straturi de acoperire automată sunt livrate cu motorul de cotă:

| Suită                 | Comanda                                                                | Ce acoperă                                                                                                                                                                                                |
| :-------------------- | :--------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unitate (29 de teste) | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | programator DRR, limitare de saturație, limite de concurență, matematică fairShare, așteptare în așteptare                                                                                                |
| Matricea de integrare | `npm run test:combo:matrix`                                            | Decizie de rutare end-to-end prin conducta combo reală; DRR echitate + saturație deprioritizare prin intermediul live seams (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

Matricea de integrare rulează în CI alături de toate cele 22 de strategii publice. Suita unității poate fi rulată independent.

---

## DB Rezumatul schemei

Trei tabele adăugate de migrațiile `078`, `079` și `085`:

- `quota_pools` + `quota_allocations` — definiții și alocări pe cheie.
- `quota_consumption` — contoare rulante cu 2 găleți per `(apiKeyId, dimensionKey)`.
- `provider_plans` — înlocuiește planul manual al furnizorului (dimensiuni JSON per connectionId).

Toate tabelele adăugate prin migrații idempotente `CREATE TABLE IF NOT EXISTS`.

Împrumutul consimțit adaugă trei coloane: `quota_allocations.lending_percent` (întreg, implicit 0), `quota_allocations.lending_until` (milisecunde de epocă sau `NULL` pentru niciun termen limită) și `quota_pools.borrow_mode` ( `saturation` implicit). Migrarea sa adaugă doar aceste coloane și nu scrie niciun rând existent.

Cartea de atribuire procentuală adaugă `quota_percent_ledger` (un rând pe grup, cont și fereastră de plan) și `quota_percent_ledger_tokens` (un numărător de simboluri per grup, cont și cheie API ). `src/lib/db/quotaPercentLedger.ts` le citește și le scrie.
