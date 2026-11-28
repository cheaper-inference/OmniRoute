# Quota Sharing Engine (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇧🇦 [bs](../../../bs/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Odkaz na dokumentáciu**: `docs/routing/QUOTA_SHARE.md`
> Súčasť skupiny B (plány 16 + 22).

---

## Prehľad

Mechanizmus zdieľania kvót spravodlivo rozdeľuje časovo obmedzenú kvótu poskytovateľa (napr. 5-hodinové okno Codex, Kimi 1500 požiadaviek/h) medzi viacero API kľúčov, ktoré zdieľajú rovnaké pripojenie.

**Problém, ktorý rieši:** OmniRoute sprostredkúva požiadavky mnohých API kľúčov voči rovnakému účtu upstream poskytovateľa. Bez logiky zdieľania môže nárazový nárast požiadaviek z kľúča A vyčerpať kvótu poskytovateľa na danú hodinu, čím zablokuje kľúče B a C až do obnovenia okna. Mechanizmus tomu zabraňuje nasledujúcimi spôsobmi:

1. Sleduje priebežnú spotrebu každého kľúča pre jednotlivé dimenzie (%, požiadavky, tokeny, $).
2. Používa spravodlivý algoritmus so zachovaním využitia kapacity: kľúč si môže požičať z nevyužitých podielov, pokiaľ globálny fond nie je saturovaný.
3. Vynucuje výsledok v kritickej časti spracovania (`chatCore.ts`) ešte predtým, ako sa požiadavka dostane k upstream vykonávacej vrstve.

---

## Algoritmus: Fair-Share Work-Conserving

Implementované v `src/lib/quota/fairShare.ts`.

### Režimy

| Podmienka                                  | Režim         | Správanie                                                                |
| ------------------------------------------ | ------------- | ------------------------------------------------------------------------ |
| `globalUsedPercent < saturationThreshold`  | **Veľkorysý** | Kľúč si možno požičať do výšky globálneho limitu mínus spotrebovaná suma |
| `globalUsedPercent >= saturationThreshold` | **Prísne**    | Prísne presadzujte individuálne spravodlivé zdieľanie                    |

Predvolené `saturationThreshold = 0.5` (env `QUOTA_SATURATION_THRESHOLD`).

Tieto dva režimy popisujú skupinu v predvolenom režime výpožičiek, `saturation`. Bazén v režime `consent` vždy uplatňuje prísne pravidlá, bez ohľadu na saturáciu. Pozrite si [požičiavanie so súhlasom (prihlásenie na skupinu)](#consented-lending-per-pool-opt-in).

### Rozhodnutie podľa dimenzie

Pre každú aktívnu dimenziu v bazéne motor vypočíta:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = current rolling value for this key (from QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Pre dimenzie `percent` pochádza `consumed` namiesto toho z knihy atribúcie (pozrite si [časť Percentuálne dimenzie: atribúcia na kľúč](#percent-dimensions-per-key-attribution) ).

potom:

- **`policy = hard`** : ak je `consumed > fairShareAllowed` a režim prísne →** blokovať** .
- **`policy = soft`** : ak je `consumed > fairShareAllowed` a režim prísne →** penalizovať** (deprioritizovať v kombinácii; nikdy neblokovať pevne).
- **`policy = burst`** : povoliť, kým existuje globálna rezerva bez ohľadu na spravodlivý podiel.

### Čiapka absoluto

`capValue` + `capUnit` na alokáciu je pevný strop nezávislý od režimu alebo politiky. Akákoľvek dimenzia, kde vždy `consumed >= capValue`** bloky** žiadosť. V prípade uzáveru `percent` je `consumed` iba časť priradená kľúču.

### Viacrozmerná kontrola

Žiadosť je zablokovaná, ak** akékoľvek** rozmer v bazéne by ho zablokoval. Rozmery sú nezávislé — a 5h% vyčerpanie nemá vplyv na týždenný% rozmer.

### Požičiavanie

Vo veľkorysom režime môže kľúč, ktorého alokácia je nedostatočne spotrebovaná, využiť prebytok z nepridelených akcií iných kľúčov. Vzorec je:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

kde `consumedByOtherKeys = consumedTotal - consumedByThisKey`. Teto global (pool `limit` pre túto dimenziu) je vždy pevný strop.

### Požičiavanie so súhlasom (prihlásenie na skupinu)

Každý bazén má režim zapožičania. `saturation` je predvolená a zachováva vyššie uvedené pravidlá. V režime `consent` kľúč `hard` odovzdáva svoj podiel iba v rámci kapacity, ktorú ostatné kľúče odsúhlasili prepožičanie. Správca nastavuje režim každého fondu. Každý držiteľ kľúča si nastavuje svoj vlastný súhlas prostredníctvom [zapožičania súhlasu](#lending-consent).

Súhlas je percento od 0 do 100 a voliteľný termín v milisekundách epochy. Kľúč požičiava toto percento zo svojho nečinného podielu, kým je termín v budúcnosti.

Pre jednu dimenziu je `L` efektívny limit: limit plánu krát účty v skupine. Brána vypočíta pre požadovaný kľúč:

```
share_k         = w_k / 100 × L
idle_k          = max(0, share_k − consumed_k)
lent            = Σ over the other keys of lend_k / 100 × idle_k
taken           = Σ over the other keys of max(0, consumed_k − share_k)
borrowAvailable = max(0, lent − taken)
```

`w_k` je váha kľúča alebo `100 / n` pre každý kľúč, ak žiadna váha nie je väčšia ako 0. `lend_k` je aktívne percento kľúča a 0 po uplynutí termínu. Vlastný súhlas žiadajúceho kľúča sa nikdy nepočíta. Kľúč `hard` je odmietnutý, keď jeho spotreba dosiahne svoj podiel plus `borrowAvailable`.

Kapacita, ktorú si nenárokuje žiadna alokácia (100 mínus súčet váh), nie je požičiateľná. Žiadny kľúč nesúhlasil s jeho požičaním.

**Príklad.** `L` je 1000.

| kľúč | Hmotnosť | zdieľať | Spotrebované | Požičiava |
| ---- | -------- | ------- | ------------ | --------- |
| A    | 50       | 500     | 530          | 0%        |
| B    | 30       | 300     | 100          | 50%       |
| C    | 0        | 0       | 60           | 0%        |

- B požičiava 50 % zo svojich nečinných 200, čo je 100. C už prevzal 60 nad svoj podiel. A môže si požičať 40.
- A sa podáva za 530 a odmietne, keď jeho spotreba dosiahne 540.
- Predtým, ako C čokoľvek použil, s podielom A alebo pod jeho podielom, C si mohol požičať 100.
- Predtým, ako C čokoľvek použil, s A na 530 si C mohol požičať 70.

**Nulová hmotnosť.** Kľúč s hmotnosťou 0 má podiel 0. Podáva sa len vtedy, keď je jeho spotreba nižšia ako požičiavajú ostatní. Keď nikto nepožičia, odmietne sa od prvej žiadosti.

**Termíny.** Žiadna úloha na pozadí nevyprší platnosť súhlasu. Každá žiadosť porovnáva konečný termín s vlastným časom a už uplynula lehota rovnajúca sa tomuto času. Uložená uzávierka, ktorá nie je konečným číslom alebo je po najväčšom dátume, ktorý môže `Date` držať, sa počíta ako prejdená.

**`soft` a `burst`.** Požičiavanie ich neobmedzuje. Kľúč `soft` sa stratí z priority, keď prekročí svoj podiel. Kým má bazén miesto, prejde kľúč `burst`. Strop bazéna stále odmieta každý kľúč, keď celková suma bazéna dosiahne svoj limit.

**Náklady na cestu žiadosti.** Bazén `saturation` nečíta nič viac ako predtým. V oblasti `consent` čítateľná dimenzia číta ostatné kľúče iba pre kľúč `hard` na úrovni alebo nad jeho podielom, zatiaľ čo iný kľúč požičiava. Potom vykoná jedno čítanie na ďalší kľúč paralelne. Neúspešné čítanie sa počíta ako spotreba 0 pre daný kľúč. Dimenzia `percent` nepridáva žiadne čítanie, pretože kniha pripisovania obsahuje každý kľúč.

**Úprava bazéna.** Úprava zachováva súhlas kľúčov, ktoré zostávajú. To platí pre úpravy pridelenia, nahradenie v rámci celej skupiny a volania `ensure`. Odstránený kľúč stratí svoj súhlas a kľúč pridaný späť začína na 0. Správcovské cesty vrátia súhlas každého kľúča a nikdy ho nezapíšu. Prepnutím fondu späť na `saturation` sa zachová každý uložený súhlas, ktorý v tomto režime nemá žiadny vplyv. Opätovným prepnutím fondu na `consent` sa znova aktivujú uložené súhlasy, ktorých termín neuplynul. Držiteľ kľúča môže vymazať uložený súhlas v oboch režimoch.

**Inovácia.** Ak už stĺpce `lending_percent` a `lending_until` existujú, migrácia pridá iba `borrow_mode` a uložené percentá zostanú tak, ako sú. Každý bazén začína v režime `saturation`. Zapnite `consent` na bazén v sprievodcovi bazénom. Z uložených hodnôt sa nič neodvodzuje.

**Obmedzenia.**

- Veriteľ môže nájsť bazén pri jeho strope skôr, ako použije svoj vlastný podiel. Kapacita, ktorú si iní požičali, sa započítava do celkového počtu.
- Kontrola prebieha pred požiadavkou a nič si nevyhradí. Súbežné požiadavky načítajú spotrebu skôr, ako sa zaznamenajú akékoľvek, takže prepožičanú kapacitu možno minúť viackrát, v závislosti od požiadaviek počas letu. Rovnakú vlastnosť má aj kontrola zdieľania režimu `saturation`.

---

## Počítadlo s posuvným oknom

Implementované v `src/lib/quota/sqliteQuotaStore.ts` a `redisQuotaStore.ts`.

Dve skupiny pre každú dvojicu `(apiKeyId, dimensionKey)`:

- `curr`: aktuálna skupina (`floor(nowMs / windowMs)`)
- `prev`: predchádzajúca skupina (`curr - 1`)

Efektívna priebežná hodnota:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Presnosť**: približne 99 %. Chyba dosahuje najviac 1 % veľkosti okna na hranici medzi skupinami (je inherentnou vlastnosťou aproximácie pomocou dvoch skupín).

### Súbežnosť

Ovládač SQLite: mutex v pamäti pre každý kľúč `(apiKeyId | dimensionKey)` zabraňuje súbehu pri čítaní, úprave a zápise. Vzor zodpovedá ochrane proti nárazovému preťaženiu v `src/sse/services/auth.ts`.

Ovládač Redis: skript Lua EVAL na atómové zvýšenie hodnoty — spúšťa sa ako jediný príkaz Redis.

---

## Ovládače

### SQLite (predvolený, bez inštalácie)

- Tabuľka: `quota_consumption` (pozrite migráciu `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Najvhodnejší pre nasadenia s jednou inštanciou.
- Všetky perzistentné údaje sa nachádzajú v existujúcej databáze SQLite systému OmniRoute (`DATA_DIR/storage.sqlite`).

### Redis (voliteľný, pre viacero inštancií)

- Vyžaduje npm balík `ioredis`.
- Počítadlá sú uložené v Redis; metadáta (fondy/pridelenia) zostávajú v SQLite.
- Najvhodnejší pre nasadenia s viacerými replikami, v ktorých musia byť počítadlá zdieľané.

### Prepínanie ovládačov

Prostredníctvom používateľského rozhrania nastavení (`/dashboard/settings` → Úložisko kvót) alebo prostredníctvom premenných prostredia:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

Nastavenie databázy má prednosť pred premennou prostredia. Ak je `driver=redis`, ale URL chýba alebo balík `ioredis` nie je nainštalovaný, továreň použije ako záložné riešenie SQLite a zaznamená upozornenie.

Poradie výberu ovládača:

1. Nastavenie databázy `quotaStore.driver`
2. Premenná prostredia `QUOTA_STORE_DRIVER`
3. Predvolené nastavenie: `sqlite`

---

## Multi-Dimension

Bazén môže mať viacero rozmerov. Každá dimenzia je nezávislá:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // global pool ceiling for this dimension
}
```

**Príklad: plán Codex** (5 h % + týždenne %):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Aby bola žiadosť povolená, musí spĺňať všetky rozmery.

### Percentuálne dimenzie: priradenie podľa kľúča

Percentuálny plán uvádza jeden údaj o využití na účet a okno plánu. Poskytovateľ neposkytuje žiadne počítadlo na kľúč API.

Na rozdelenie tohto čísla medzi kľúče si každý fond vedie knihu pripisovania podľa účtu a okna plánu. `src/lib/quota/percentLedger.ts` dodržiava pravidlá knihy. `src/lib/quota/percentAttribution.ts` premení knihu na čísla, ktoré používa presadzovanie. Výsledkom je odhad zostavený z tokenov každej kľúčovej cesty.

#### Čítania, ktoré posúvajú knihu

Kniha sa pohybuje iba podľa vlastného čísla poskytovateľa pre požadované okno plánu. Tieto spojenia hlásia jednu:

| Poskytovateľ                            | Plánovať okná  |
| --------------------------------------- | -------------- |
| Claude prostredníctvom pripojenia OAuth | `5h`, `weekly` |
| Codex                                   | `5h`, `weekly` |

Tieto sa nepočítajú ako čítanie:

- odpoveď, ktorú klient poskytovateľa označí ako zastaranú
- okno Claude, ktorého percento poskytovateľ nenahlásil
- obrázok iného okna alebo v najhoršom prípade cez okná
- záložná hlavička limitu sadzby
- neúspešné čítanie

Iní poskytovatelia vrátane Claude s kľúčom API nemajú žiadnu knihu. Za každý kľúč sa účtuje 0 podľa ich percentuálnych rozmerov, ako pred touto zmenou.

Čítanie zdieľa 30-sekundovú vyrovnávaciu pamäť saturačného signálu. Čítanie Claude je datované tým, keď bol údaj pozorovaný v hlavičkách odpovede alebo načítaný z koncového bodu používania, keď je tento čas známy. Ostatné údaje sú datované podľa toho, kedy bol daný záznam z vyrovnávacej pamäte vytvorený.

#### Čo kniha uchováva

Každá zaznamenaná požiadavka pridá svoje tokeny raz na počítadlo pre skupinu, účet a kľúč. Počítadlo len rastie. Kniha obsahuje tri veci:

- základná čiara: údaj, kedy sa kniha otvorila alebo sa okno naposledy otočilo
- posledný použitý údaj
- na kľúč, jeho počítadlo tokenov v tom istom momente nazvalo jeho značku

Kniha sa aktualizuje, keď presadzovanie alebo spôsob použitia vypočíta priradenie. Zápisy sa porovnávajú a nastavujú na číslo revízie. Spisovateľ, ktorý pri novom čítaní raz prehrá pokusy.

#### Ako sa vypočíta časť kľúča

Každá časť kľúča sa vypočíta pri čítaní knihy. Rast čísla od základnej čiary je rozdelený medzi kľúče v pomere k tokenom, ktoré každý z nich smeruje od svojej značky.

Together, tieto tokeny vysvetľujú najviac jeden bod čísla na tokeny `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` (predvolene 1 000). Rast, ktorý nevysvetľujú, je vonkajší. Základná línia je tiež externá.

Napríklad kniha sa otvorí na 0. Kľúč A potom nasmeruje 900 000 tokenov a kľúč B nasmeruje 100 000. Pri čísle 60 je časť A 54 bodov a časť B je 6.

Počítadlo pod značkou kľúča sa reštartovalo a počíta v plnej miere. Kľúč bez značky, ako napríklad kľúč, ktorý sa pripája do skupiny uprostred okna, počíta všetky svoje žetóny. Číslo, ktoré zaostáva za tokenmi, spôsobí chybu, ktorá zmizne pri ďalšom čítaní. Nehromadí sa.

`QUOTA_PERCENT_MIN_TOKENS_PER_POINT` sa číta pri každom priradení. Hodnota, ktorá nie je konečným číslom aspoň 1, spadne späť na 1 000.

#### Ako čítanie zmení knihu

Platí prvé pravidlo zhody:

1. **Zatiaľ bez knihy:** čítanie otvorí knihu. Jeho číslo je základnou čiarou a každé počítadlo je označené.
2. **Staršie čítanie:** čítanie datované pred posledným použitým sa ignoruje. Rovnako je tomu aj pri čítaní, ktorého čas resetovania je o viac ako 30 minút skorší ako uložený.
3. **Nové okno poskytovateľa:** čas resetovania o viac ako 30 minút neskôr, ako uložený čas otočí knihu. Figúrka sa stane základnou čiarou a každé počítadlo sa znova označí. Kľúče bez pultu opúšťajú knihu.
4. **Ukončené okno:** uložený čas resetovania, ktorý nie je po čase údajov odčítania, znamená, že okno sa skončilo. Čítanie obráti knihu bez ohľadu na jej postavu.
5. **Vyššie číslo:** pohybuje sa len posledná figúrka. Základná čiara a značky zostávajú.
6. **Rovnaká postava:** postava, základná línia a značky zostávajú. Je napísaný iba resetovací čas, ktorý knihe chýba.
7. **Nižšie číslo:** nižšie číslo sa ako také nikdy neuplatňuje. Otočí knihu, len keď tri veci platia. Je aspoň o dve minúty novšia ako posledná použitá hodnota. Nič nehovorí, že okno je rovnaké otvorené. Je o viac ako jeden bod nižšia.

Okno sa počíta ako to isté otvorené, keď držia tri veci. Oba časy resetovania sú známe. Sú od seba do 30 minút. Uložená je stále pred čítaním. Nižšia číslica v tomto okne nič nezmení.

Čas resetovania je uložený iba vtedy, keď je pred časom údajov čítania, ktoré ho prenáša. Vyššia hodnota ukladá čas resetovania čítania, keď je tento údaj použiteľný, a inak uchováva uložený údaj. Rovnaký údaj zaznamenáva čas resetovania čítania iba vtedy, keď kniha žiadny nemá. Nič iné to nemení. Nižšia hodnota, ktorá neotáča knihu, nezaznamenáva žiadny čas resetovania.

#### Keď sa kniha používa

Po prečítaní sa kniha použije, pokiaľ jej uložený resetovací čas nie je po aktuálnom čase. Tento prípad nastáva, keď sa čítanie vykonané tesne pred resetom, ako napríklad to, ktoré sa podáva z vyrovnávacej pamäte, pozoruje tesne po ňom.

Bez použiteľného čítania sa uložená kniha používa iba dovtedy, kým môže byť aktuálnou knihou okna. To platí v dvoch prípadoch:

- jeho čas resetovania je známy a stále pred nami
- nemá čas resetovania a posledný údaj, ktorý ho zmenil, je starý maximálne 15 minút

Inak sa nič nepripisuje, ako keď nie je kniha. Kniha, ktorej uložený čas resetovania uplynul, sa nikdy neúčtuje.

#### Presadzovanie

Spotreba kľúča v percentách je jeho priradená časť plus podiel externej časti. Externá časť najskôr využíva kapacitu bez nárokov na pridelenie (100 mínus súčet váh). Iba prebytok sa rozdelí medzi kľúče podľa hmotnosti.

Táto spotreba sa porovnáva s spravodlivým podielom kľúča ako pri akejkoľvek inej dimenzii. Striktný režim sa stále spustí, keď saturačný signál dosiahne `QUOTA_SATURATION_THRESHOLD` (predvolená hodnota 0,5). Každé číslo je škálované podľa efektívneho limitu: limit na účet vynásobený počtom účtov v skupine.

Absolútna horná hranica so `capUnit: "percent"` počíta iba časť priradenú kľúču, ktorá je škálovaná rovnakým spôsobom. Vezmite limit na jeden účet na 100 a k účtov. Limit N sa potom dosiahne, keď kľúčová časť čísla obsluhujúceho účtu dosiahne N/k bodov. Každý účet je porovnaný so svojou vlastnou knihou. Napríklad pri dvoch účtoch sa limit 10 dosiahne pri 5 bodoch z hodnoty jedného účtu.

Keď sa obchod nedá prečítať, nič sa nepripisuje a za každý kľúč sa v danej dimenzii účtuje 0. Keď zápis do knihy zlyhá, toto priradenie použije knihu tak, ako bola prečítaná. Neúspešný zápis tokenu opustí tokeny tejto požiadavky z knihy. Žiadne z týchto zlyhaní neblokuje požiadavku.

V skupine `consent` vzorec požičiavania používa spotrebu každého kľúča v percentuálnej dimenzii, ako je opísané vyššie. Keď sa požičia ďalší kľúč, kniha sa raz prečíta a pripíše sa ku každému kľúču. Bez použiteľnej knihy je každý kľúč spoplatnený 0. Kľúč s hmotnosťou potom prejde a kľúč s hmotnosťou 0 prejde iba vtedy, keď požičia iný kľúč.

#### Cesta použitia

`GET /api/quota/pools/{id}/usage` hlási rovnaké čísla prostredníctvom rovnakej funkcie. Percentuálna dimenzia má jednu položku na pripojenie fondu v `accounts`. Jeho `consumedTotal` a `perKey` najvyššej úrovne odzrkadľujú prvý záznam.

Trasa tiež aplikuje aktuálne čítanie, takže môže posúvať knihu tak, ako to robí žiadosť. `internal + external` sa môže líšiť od `consumedTotal`, keď neexistuje použiteľné čítanie, alebo keď sa nepoužije nižšia hodnota.

#### Skladovanie a uchovávanie

Oba kvótové obchody vedú knihu. Na SQLite, ak je povolené automatické čistenie databázy, odstráni riadky, ktoré neboli aktualizované 60 dní. Na Redis majú knihy a počítadlá spoločného pripojenia jeden kľúč. Jeho platnosť vyprší 60 dní po poslednom zápise tokenu alebo zmene knihy. Kniha, ktorá sa nemení, sa neprepisuje, preto je hranica nastavená nad najdlhším oknom plánu. Manuálny reset histórie používania tiež vymaže knihy na SQLite (pozrite si časť Obmedzenia).

#### Obmedzenia

- Celý rast účtu od základnej línie je rozdelený podľa tokenov, ktoré sú odvtedy smerované každým kľúčom. Nezáleží na tom, kedy k tomuto rastu došlo.
- Takže použitie mimo OmniRoute sa účtuje kľúčom do výšky, ktorú umožňujú ich tokeny. To zahŕňa použitie pred prvou požiadavkou kľúča na okno, keď už bola kniha otvorená.
- Napríklad vonkajšie použitie zvyšuje účet o 60 bodov, zatiaľ čo žiadne kľúčové cesty. Kľúč potom nasmeruje 30 000 tokenov a číslo dosiahne 60,6.
- Ak bola kniha otvorená pred týmto použitím, časť kľúča je 30 bodov. Má tiež 7,65 externého použitia so štyrmi kľúčmi s hmotnosťou 25.
- Ak sa kniha otvorila po tomto použití, 60 bodov je základ. Časť kľúča má 0,6 bodu a nesie 15 externého použitia.
- Požiadavka alebo návšteva trasy použitia otvorí knihu. Či sa teda takéto použitie počíta ako základ, závisí od toho, kedy bola kniha otvorená.
- S predvolenou minimálnou hodnotou kľúč, ktorý smeruje 60 000 tokenov pri použití zvonku, zvýši účet o 60 bodov, pričom všetkých 60 získa ako svoju vlastnú časť.
- Pri najnižšej hodnote 50 000 má vlastný podiel 1,2 bodu. Ďalších 58,8 je externých a účtovaných podľa hmotnosti, ako pri akomkoľvek externom použití.
- Nastavte `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` blízko k tomu, čo stojí jeden bod vo vašom pláne. Vonkajšie použitie zahŕňa prevádzku na rovnakom účte z kľúčov mimo fondu.
- Percentuálny strop platí v každom režime. Limitovaný kľúč je možné odmietnuť, keď je účet hlboko pod prahom nasýtenia.
- Zoberte si uzáver s 10 a 12 bodmi vonkajšieho použitia skôr v okne. Kľúč, ktorý smeruje 20 000 tokenov, je potom odmietnutý pri počte 12,4 %.
- Rozdelenie je odhadom podľa objemu tokenov. Požiadavka sa počíta ako jej žetóny výzvy plus žetóny dokončenia. Zľavy vo vyrovnávacej pamäti a ceny modelov tento počet nemenia.
- Žiadosť, ktorá nekončí stavom 200, nezaznamenáva žiadne tokeny. Príkladmi sú stream, ktorý klient odpojí, a chyba upstream po použití.
- Použitie, ktoré takáto požiadavka spôsobila, sa účtuje kľúčom, ktoré zaznamenali tokeny, až do výšky, ktorú ich tokeny umožňujú. Zvyšok je externý. Nehýbe sa späť. Odpoveď, ktorá nehlási žiadne použitie tokenov, nezaznamenáva ani žiadne tokeny.
- Využitie prebiehajúcej požiadavky sa môže zobraziť v inej aktívnej časti kľúča pre celú požiadavku. Presunie sa späť len vtedy, keď požiadavka skončí so stavom 200.
- Využitie už na účte pri otvorení knihy sa počíta ako externé. Týka sa to inovácie, nového fondu a nového účtu. Ako externé sa počíta aj použitie v novom okne pred jeho prvým prečítaním.
- Každý kľúč začína svojim váhovým podielom daného využitia, po kapacite nie sú žiadne nároky na pridelenie. S jedným účtom na 85 % a piatimi kľúčmi s hmotnosťou 20 začína každý so 17 zo svojich 20 použitých.
- V skupine s niekoľkými účtami sa na súhrnný rozpočet použije údaj účtu obsluhy. Toto je podľa knihy nezmenené.
- Nižšia číslica v okne, ktoré poskytovateľ hlási ako otvorené, sa nepoužije. Čas resetovania, ktorý sa posunie späť o viac ako 30 minút, sa považuje za starý údaj.
- V oboch prípadoch si kniha zachová svoj stav, kým neuplynie uložený čas resetovania. Potom sa kniha nenabije, kým ju čítanie neotočí.
- Nápravou je ručné vynulovanie histórie používania (`POST /api/settings/purge-usage-history`). Vymaže knihy pripisovania a ich počítadlá tokenov v databáze SQLite.
- Obdobie `all` vymaže každú knihu a počítadlo. Kratšie obdobie najskôr vymaže knihy, ktoré v ňom nie sú napísané. Potom vymaže počítadlá, ktoré nie sú v ňom zapísané, ale iba pre pripojenie bazéna, v ktorom nezostala žiadna kniha. Vedená kniha stále označuje každý kľúč proti svojmu počítadlu.
- Kniha, ktorej postava sa nepohla, sa neprepíše, takže kratšie obdobie môže tiež vyčistiť knihu aktuálneho okna. Ďalšie čítanie potom otvorí novú knihu na aktuálnom obrázku.
- Reset sa nedotkne úložiska kvót Redis. Tam kniha končí svojím oknom alebo vyprší 60 dní po jej poslednom zápise.
- Keď poskytovateľ nepošle žiadny čas resetovania, okno, ktoré sa resetuje a znovu naplní nad starým údajom medzi dvoma odčítaniami, vyzerá ako vyššie číslo. Kniha zachováva starý základ a známky.
- Údaje sú datované miestnymi hodinami. Keď to predbehne poskytovateľa alebo zdroj hlási čas resetovania o niečo skôr, kniha môže tento rozdiel dosiahnuť skôr.
- Rast v tomto krátkom období je rozdelený tokenmi, ktoré sú v ňom smerované. Prvé čítanie v nasledujúcom okne to opraví. Keď otočená kniha neobsahuje čas resetovania, táto oprava potrebuje nižšiu hodnotu, aspoň o dve minúty novšiu ako naposledy použitá hodnota.
- Inštancie, ktoré zdieľajú údaje o dátume uloženia Redis s vlastnými hodinami, preto majte tieto hodiny synchronizované. Hodnoty inštancie, ktorej hodiny bežia pozadu, vyzerajú staršie a ignorujú sa.
- Keď po čase uloženia resetovania nepríde žiadna použiteľná hodnota, percentuálne podiely na kľúč a percentuálne limity sa nevynútia, kým sa hodnota nevráti. Bez času resetovania sa to začne 15 minút po poslednom prečítaní, ktoré zmenilo knihu.
- V obchode Redis môže kniha nečinná 60 dní uplynúť medzi šekom pisateľa a jej zápisom. Potom sa znova vytvorí pri revízii nad 1, čo je platný stav.

---

## Prekladač plánu

Implementovaný v `src/lib/quota/planResolver.ts`.

Poradie priorít (od najvyššej po najnižšiu):

1. **Manuálne prepísanie v databáze** — tabuľka `provider_plans`, pre každé `connectionId`.
2. **Známy katalóg** — `src/lib/quota/planRegistry.ts` (iba údaje).
3. **Prázdny plán** — žiadne dimenzie, vyžaduje sa manuálna konfigurácia.

### Známy katalóg

| Poskytovateľ          | Dimenzie                                                        |
| --------------------- | --------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                          |
| `glm`                 | `tokens/5h` (limit=0, neznámy), `tokens/weekly`                 |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                    |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100`   |
| `kimi`                | `requests/hourly/1500`                                          |
| `alibaba`             | `requests/monthly/90000`                                        |
| `openai`, `anthropic` | Bez predvoleného nastavenia — vyžaduje sa manuálna konfigurácia |

---

## Integrácia potrubia

### PRE hák (`open-sse/handlers/chatCore.ts`)

Spustí sa pred nadradeným spúšťačom, po overení a kontrole politiky:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() per dimension
      → fairShare.decideFairShare()
      → if block → return 429 (buildErrorBody, Hard Rule #12)
      → if allow + deprioritize → set quotaSoftPenalty=true on candidate
  → executor.execute()
```

**Fail-open** : ak `enforceQuotaShare` vyhodí, požiadavka je povolená cez protokol `pino.warn`. To bráni tomu, aby chyba motora kvót zablokovala všetku komunikáciu.

**Keď sa kapacita vráti.** Odmietnutie pri kľúčovej akcii alebo pri strope bazéna sa končí jednou z dvoch viet v oboch režimoch výpožičky:

- `percent` window: `. The <window> window resets at <time>.` Čas je reset, ktorý poskytovateľ hlási.
- Počítateľná jednotka: `. Enough <window> usage is expected to clear by <time>.` Čas je horná hranica z posuvného okna, ak kľúč neposiela nič iné.

`<time>` je ISO 8601 instant v UTC. Odmietnutie potom nesie `Retry-After`: celé sekundy do tohto okamihu plus jedna. Klient, ktorý tak dlho čaká, to zopakuje maximálne jednu sekundu po okamihu. Ak okamih nie je známy, odmietnutie neobsahuje ani vetu, ani hlavičku. Absolútne odmietnutie stropu neprináša ani jedno ani druhé. Verejný kód zostáva `quota_share_blocked`.

Odmietnutie zdieľania sa nedotkne zdieľaného pripojenia. Nenastaví žiadne cooldown, žiadne uzamknutie modelu a žiadne zlyhanie ističa poskytovateľa a ostatné kľúče bazéna sa stále obsluhujú. Keď každý cieľ komba odmietne kľúč pre svoj podiel, kombo bez čakania odpovie 429. Jeho odpoveď nesie náznak ako `Retry-After`. Cesta vkladania končí svoje odmietnutie rovnakou vetou a neposiela žiadne `Retry-After`.

### POST hook (rekordná spotreba)

Po úspešnej odpovedi:

```
executor returns success
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() per dimension
      → fail-open: errors logged as pino.warn, never propagated to client
```

**Poznámka driftu** : ak `consume` po odozve zlyhá, rolovacie počítadlo podhodnotí. Signál saturácie od poskytovateľa (napr. `anthropic-ratelimit-unified-5h-utilization`) opraví globálny odhad pri ďalšej požiadavke.

### Kombinovaný jemný trest (`open-sse/services/combo.ts`)

Keď `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // default 0.7
}
```

Trest sa uplatňuje po všetkých ostatných bodovacích faktoroch. Znižuje pravdepodobnosť automatického kombinovania výberu nasýteného kľúča bez jeho tvrdého blokovania.

---

## UI Návod

### `/dashboard/costs/quota-share` — Hlavná stránka bazénov

Komponenty (všetky v `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Komponent              | Účel                                                                       |
| ---------------------- | -------------------------------------------------------------------------- |
| `QuotaConceptCard`     | Úvodná karta vysvetľujúca zdieľanie kvót pre nových používateľov           |
| `CreatePoolModal`      | Vytvorte novú oblasť kvót (počiatočné pridelenia názvu + + )               |
| `PoolCard`             | Súhrn podľa fondu: názov, pripojenie, počet pridelení                      |
| `DimensionBar`         | Skladaný pruh podľa dimenzií: podiel každého kľúča + globálne využitie     |
| `AllocationTable`      | Tabuľka so spotrebovaným, spravodlivým podielom, deficit/surplus, pôžičkou |
| `BurnRateChart`        | Čiarový graf rýchlosti napaľovania EMA (lenivé grafy cez `dynamic()`)      |
| `EditAllocationsModal` | Upravte alokačné váhy, limity a politiky pre fond                          |
| `BorrowModeField`      | Prepínač režimu vypožičania (`saturation` alebo `consent`) v sprievodcovi  |
| `LendingBadge`         | Odznak iba na čítanie na kľúči, ktorý požičiava, len v `consent` pooloch   |

Odznak požičiavania zobrazuje percento a ak je nastavený, konečný termín v UTC s názvom zóny. Posudzuje konečný termín v čase snímky používania. Uplynutý alebo nečitateľný termín sa zobrazuje ako `lending expired`.

Stránka upúta:

- `usePools` — načítava `GET /api/quota/pools` každých 30 s.
- `usePoolUsage` — načítava `GET /api/quota/pools/[id]/usage` na požiadanie.
- `useLocalStoragePoolMigration` — sa spustí raz pri pripojení na migráciu starších údajov LS.

Kľúčový krok sprievodcu bazénom má box `Show usage by member to key holders`. Nastavuje možnosť `memberBreakdown` fondu (pozri [Používanie člena](#member-usage) ). Sprievodca pod ním varuje, že niekto, kto vie, aký kláves použil, môže k tomuto klávesu priradiť pruh. Keď je políčko začiarknuté, znamená to, že krok obsahuje menej ako tri alebo viac ako 20 klávesov, pretože pruhy potom zostanú skryté. Počíta kľúče v kroku a nedokáže povedať, ktorý z nich môže zadávať požiadavky.

### `/dashboard/costs/quota-share/plans` — Konfigurácia plánu poskytovateľa

- `ProviderPlanConfigClient.tsx`: rozbaľovacia ponuka na výber poskytovateľa, zobrazenie vyriešeného plánu (automaticky z katalógu alebo manuálne prepísanie) a úpravu rozmerov.
- Zmeny zapíšte do `PUT /api/quota/plans/[connectionId]`.
- Odstránenie sa vráti do katalógu alebo prázdneho plánu.

---

## Samoobslužná kvóta API (prihlásenie)

`GET /api/v1/me/quota/{provider}` (tiež slúži na `/v1/me/quota/{provider}`) umožňuje držiteľovi kľúča API čítať pomocou vlastného kľúča, aká veľká časť zdieľaného predplatného je jeho a čo ho blokuje. Trasa je tenká škrupina cez `src/server/selfService/quotaHandler.ts`; pohľad je zostavený `src/lib/quota/selfView.ts` a jeho kontrakt odozvy je `src/shared/schemas/selfQuota.ts` (`SelfQuotaView` v `docs/openapi.yaml`).

### Povolenie a overenie

- Príznak funkcie `QUOTA_SELF_PANEL`, predvolené `false`. Kým je vypnutá, požiadavka, ktorá dosiahne trasu, dostane 404. Pri `REQUIRE_API_KEY=true` politika klienta API odmietne chýbajúci alebo neplatný kľúč s 401 pred spustením trasy, bez ohľadu na príznak. Požiadavka bez kľúča, ale s prihlásenou reláciou dashboardu prejde touto politikou a dostane vlastnú odpoveď na trase. Príznak sa vyhodnotí ako každý iný príznak (dashboard alebo prepísanie REST, potom premenná prostredia s rovnakým názvom); pozri [`FEATURE_FLAGS.md`](../reference/FEATURE_FLAGS.md).
- Zobrazovaný názov každej oblasti a označenie každého plánu sa vrátia držiteľom kľúčov oblasti presne tak, ako ich správca napísal. Pred zapnutím vlajky skontrolujte, či sú vhodné na čítanie týmito držiakmi kľúčov.
- Kľúč sa číta iba z hlavičiek: `Authorization: Bearer <key>` alebo `x-api-key: <key>`. Po odoslaní oboch sa použije prvý, ktorý sa overí. Kľúč v reťazci dopytu alebo súbor cookie sa ignoruje. Kľúč prostredia servera je odmietnutý (401).
- Kľúč potrebuje rozsah `self:usage` (403 bez neho).
- Segment poskytovateľa je orezaný, napísané malými písmenami a skontrolovaný oproti `^[a-z0-9][a-z0-9._-]{0,63}$` (v opačnom prípade 400), potom vyriešený prostredníctvom registra poskytovateľa, takže alias ako `cc` číta fondy `claude`. `claude` a `anthropic` čítajú rovnaké fondy.

### Čo ukazuje každá viditeľnosť

| Viditeľnosť    | Vyžaduje                                                                           | Polia                                                                                                                                                                                                                                             |
| -------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Vlastný podiel | `self:usage`                                                                       | `pools[]` (ref, názov, poskytovateľ, politika, hmotnosť, strop), `dimensions[].yourShare`, `accounts[]` so `yourShare` (v okne `percent` bez `attributed` a `external`), `blocks`, `availableModels`, `expiresAt`, `apiBaseUrl`                   |
| Úroveň účtu    | `self:usage` + `self:account-quota` a poskytovateľa v kľúči `sharedQuotaProviders` | pridá `dimensions[].total`, `accounts[].dimensions[].account` a `accounts[].modelWindows`, `attributed` a `external` do `yourShare` okna `percent` a `members` do fondu so zapnutým používaním členmi (pozri [Používanie členom](#member-usage) ) |

- `sharedQuotaProviders` je nastavenie pre každý kľúč (`PUT /api/keys/[id]/self-service`): `null`, predvolené nastavenie, znamená každého poskytovateľa, ktorého kľúč dosiahne; `[]` znamená žiadne. `accountVisible` každej skupiny hovorí, ktorá viditeľnosť sa na ňu vzťahuje.
- Účtové lišty a modelové okná sa zobrazujú len pre účty, ktorých spojenie môže kľúč použiť. Keď má kľúč zoznam povolených pripojení, účet mimo neho si ponechá svoj záznam `Account N` bez `account` alebo `modelWindows`. Prázdny zoznam znamená žiadne obmedzenie, ako v prípade `/v1/me/status`. Celková suma (`dimensions[].total`) nezávisí od tohto zoznamu.
- Dve postavy zobrazené len so `self:usage` pochádzajú z používania iných kľúčov. `exhausted` rozpočtu plánu odráža spotrebu každého kľúča v rámci tohto plánu. V skupine, ktorej váhy sú nula, je `weight` kľúča `100 / number of members`. Oboje platí pre kľúč.
- Oblasť je identifikovaná iba `ref`, nepriehľadnou hodnotou viazanou na volací kľúč. Jeho zobrazovaný názov (`name`) je zahrnutý tak, ako ho administrátor napísal. `ref` je odvodené z kľúča a oblasti s tajným kľúčom API servera (`API_KEY_SECRET`). Klienti ho nesmú uchovávať: zmení sa, ak sa toto tajomstvo zmení.
- Účty sú uvedené ako `Account 1`, `Account 2`, … v poradí skupiny. Nevráti sa žiadne ID fondu, ID pripojenia, e-mail účtu ani názov účtu a odpoveď prechádza schémou zmluvy, ktorá vynechá akékoľvek pole mimo nej.
- Počitateľné jednotky (`requests`, `tokens`, `usd`) sa vykazujú ako skupina skupiny, ktorú brána kvóty uplatňuje: `limit` = limit plánu × účty v skupine, `fairShare` = váha / 100 × `limit` (rovnaké rozdelenie `consumed` keď je každá váha 0), `consumed` = vlastný počítadlo kľúča v sklade kvóty `remaining`, = `fairShare` − 0.
- `blocks.schedules` uvádza zoznam okien plánu kľúča (`open`/`closed`, `blackout` alebo `outside-window`, `retryAfterSeconds`, rezervné poschodia a či sa minul rozpočet okna); `blocks.modelCaps` uvádza svoje hodinové limity pre každý model so spotrebou.
- Kľúč mimo každého fondu poskytovateľa dostane 200 so `pools: []`; `availableModels` (identifikátor `qtSd/`, ktorý kľúč vidí v `/v1/models`), `expiresAt` a `apiBaseUrl` sú stále vyplnené.
- `apiBaseUrl` je `OMNIROUTE_PUBLIC_API_BASE_URL`, potom `OMNIROUTE_PUBLIC_BASE_URL`, inak `null`. Nikdy nejde o vlastný pôvod žiadosti.

### `status` a `reason`

| `status`      | Význam                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ok`          | Aktuálne čítanie.                                                                                                                                                                                                                                                                                                                                                                      |
| `stale`       | Čítanie účtu uloženého vo vyrovnávacej pamäti označené ako neaktuálne alebo také, ktorého čas obnovenia od prečítania uplynul. Čísla sú zachované. Jedno modelové okno, ktorého čas resetovania uplynul, označuje celú skupinu `modelWindows` `stale`. Pre vlastný podiel kľúča v okne `percent` : kniha bola prečítaná bez načítania účtu vo vyrovnávacej pamäti brány na potvrdenie. |
| `unavailable` | Žiadne čítanie; čísla sú `null`, nikdy nie `0`. `reason` hovorí prečo.                                                                                                                                                                                                                                                                                                                 |

| `reason`                          | Kedy                                                                                                                                 |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `store_unavailable`               | Úložisko kvót nebolo možné čítať alebo nemôže čítať knihy s uvedením zdroja.                                                         |
| `percent_attribution_unavailable` | Vlastný podiel kľúča v okne `percent` : pre tento účet a okno zatiaľ neexistuje žiadna kniha pripisovania alebo kniha neuvádza kľúč. |
| `percent_window_ended`            | Vlastný podiel kľúča v okne `percent` : kniha patrí do okna plánu, ktoré sa skončilo.                                                |
| `account_not_used_by_key`         | Vlastný podiel kľúča v okne `percent` : pripojenie účtu je mimo povolených pripojení kľúča. Jeho kniha sa nečíta.                    |
| `window_not_reported`             | Vyrovnávacia pamäť limitov poskytovateľa nemá pre toto okno plánu žiadne údaje.                                                      |
| `connection_lookup_failed`        | Pripojenie účtu sa nepodarilo prečítať.                                                                                              |
| `not_supported`                   | OmniRoute nemôže prečítať limity používania pre poskytovateľa účtu.                                                                  |
| `fetch_failed`                    | Nebolo možné použiť žiadne čítanie z vyrovnávacej pamäte a obnovenie limitov poskytovateľa zlyhalo.                                  |
| `not_available`                   | Čítanie nenesie žiadne okná používania alebo účet nemá žiadne čítanie.                                                               |

Keď sa úložisko kvót nedá prečítať, polia `blocks` podporované úložiskom ( `exhausted` rozvrhového rozpočtu, `consumed` a `reached` modelového stropu) sú tiež `null`.

### Súhlas s pôžičkou

`PATCH /api/v1/me/quota/{provider}` zaznamenáva vlastný súhlas volacieho kľúča pre jeden fond. Používa príznak, hlavičky a pravidlá poskytovateľa `GET`. Rozsah `self:usage` oprávňuje tento zápis, hoci jeho názov je len na čítanie.

```json
{
  "pool": "qpr_0123456789abcdef0123456789abcdef",
  "lendingPercent": 30,
  "lendingUntil": 1893456000000
}
```

- `pool` je `ref`, ktoré `GET` vráti pre daný fond.
- `lendingPercent` je celé číslo od 0 do 100. Hodnota 0 vymaže súhlas a jeho termín. Telo s `lendingPercent` 0 je akceptované v oboch režimoch.
- `lendingUntil` je voliteľné: epocha milisekúnd alebo `null` bez termínu. Musí to byť v budúcnosti a najviac 8640000000000000. Hodnota pod 100000000000 sa číta ako sekundy a odmietne sa.
- Akékoľvek iné pole je odmietnuté. Telo dlhšie ako 4096 bajtov je odmietnuté. Čítanie sa pri tejto veľkosti zastaví, takže dlhšie telo sa nikdy neudrží celé.

Kontroly prebiehajú v poradí podľa tejto tabuľky. Každé odmietnutie používa štandardné chybové telo s pevnou správou. Odmietnutie jednou z týchto kontrol nič nenapíše.

| Stav | Správa                                                                                             | Kedy                                                                  |
| ---- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| 404  | `Not found`                                                                                        | Vlajka `QUOTA_SELF_PANEL` je vypnutá.                                 |
| 401  | `Valid API key required`                                                                           | Kľúč chýba alebo je neplatný, prípadne ide o kľúč prostredia servera. |
| 403  | `API key lacks the self:usage scope`                                                               | V kľúči chýba `self:usage`.                                           |
| 400  | `Invalid provider`                                                                                 | Segment poskytovateľa je neplatný.                                    |
| 429  | `Too many lending changes. Retry later.`                                                           | Kľúč prekročil svoj limit. Odpoveď nesie `Retry-After`.               |
| 400  | `Body must be { pool, lendingPercent, lendingUntil }. lendingPercent is an integer from 0 to 100.` | Telo nie je JSON, je príliš dlhé alebo nezodpovedá schéme.            |
| 400  | `lendingUntil must be a Unix time in milliseconds`                                                 | Termín sa číta ako sekundy.                                           |
| 400  | `lendingUntil must be in the future`                                                               | Termín je v čase žiadosti alebo pred ním.                             |
| 404  | `Pool not found`                                                                                   | `ref` nepomenúva žiadnu oblasť tohto kľúča pre tohto poskytovateľa.   |
| 403  | `Lending is not enabled for this pool`                                                             | Skupina je v režime `saturation` a `lendingPercent` je nad 0.         |
| 500  | `Failed to build quota view`                                                                       | Akékoľvek iné zlyhanie. Jeho príčina je zaznamenaná na serveri.       |

Limit je 20 žiadostí za 60 sekúnd pre každý kľúč. Každá požiadavka, ktorá prejde kontrolou poskytovateľa, sa počíta, dokonca aj tá, ktorá bola neskôr odmietnutá alebo ktorá nič nezmení. Má svoje vlastné počítadlo, okrem limitu rýchlosti požiadavky kľúča.

Žiadosť, ktorá zmení uložený súhlas, zapíše jeden záznam auditu `quota.pool.lending.updated`. Pomenúva kľúč starými a novými hodnotami. Ten istý orgán odoslaný dvakrát, raz zapíše a raz audituje. Odpoveď je 200 s úplným zobrazením `GET`, vytvoreným po zápise.

Pohľad `GET` uvádza pôžičky takto:

- Každý fond nesie `borrowMode` (`saturation` alebo `consent`) a vlastný kľúč `lendingPercent` a `lendingUntil`.
- `lendingActive` je `true` iba v skupine `consent`, s percentom nad 0 a nedosiahnutým termínom.
- V `consent` poole nesie každý počítateľný `dimensions[].yourShare` `borrowAvailable`. To je to, čo teraz môže kľúč používať nad svojim podielom, ktorý požičajú ostatné kľúče.
- `borrowAvailable` používa vzorec brány. Číta každý druhý kľúč, aj keď je kľúč pod jeho podielom. Pre kľúč `hard`, ktorý je o jedno ďalšie čítanie na ďalší kľúč a spočítateľný rozmer, paralelne.
- `borrowAvailable` je `null` pre kľúč `soft` alebo `burst` a `null`, keď čítanie zlyhá.
- `borrowAvailable` je jedna číslica pre všetky ostatné kľúče spolu. V skupine dvoch kľúčov je to vlastná figúrka druhého kľúča.
- `borrowAvailable` ešte nie je nahlásená pre okná `percent` ani v `accounts[]`.
- Vo fonde `saturation` zobrazenie hlási uložený súhlas so `lendingActive: false` a bez `borrowAvailable`.

### Chyby

Every response of this route, success or error, carries `Cache-Control: no-store`. A refusal that happens before the route runs does not carry it, for example the client API policy's 401 or the IP filter's 403. Errors of the route use the standard error body with a fixed message: 400 (invalid provider), 401 (missing or invalid key), 403 (missing `self:usage`), 404 (flag off) and 500 (`Failed to build quota view`). The 500 covers any failure once the request reaches the route, including the key lookup itself; its cause is logged on the server and never returned. The errors of the `PATCH` are listed in [Lending consent](#lending-consent).

### Obmedzenia

- `remaining` je časť spravodlivého podielu kľúča, ktorý nepoužil. Nie je to záruka. Kľúč môže byť doručený aj mimo neho, kým má bazén miesto. Keď súčet fondu dosiahne `limit`, každý kľúč fondu sa zamietne bez ohľadu na jeho vlastné `remaining` a kľúč bez `self:account-quota` tento súčet neuvidí.
- `remaining` nezohľadňuje absolútne `cap` pridelenia. Presadzovanie odmietne kľúč, keď jeho vlastná spotreba v okne jednotky uzáveru dosiahne hodnotu uzáveru.
- Panel na úrovni účtu pochádza z vyrovnávacej pamäte limitov poskytovateľa a môže oneskoriť rozhodnutie o presadzovaní o niekoľko minút. Načítanie, ktorého čas resetovania uplynul, sa hlási ako `stale`.
- Okná podľa modelu (`modelWindows`) sú hlásené len pre poskytovateľov, ktorí majú mapovanie plánových okien: Claude a Codex dnes. Pre ostatných poskytovateľov je `modelWindows` stále prítomný, keď sa zobrazujú údaje účtu, s prázdnym zoznamom `windows`.
- Vlastný podiel kľúča v okne `percent` je odhad. Pochádza z knihy pripisovania a má všetky obmedzenia uvedené vyššie v časti „Percentuálne dimenzie: priradenie podľa kľúča“.
- `consumed` je počet porovnateľný so spravodlivým podielom. Je to `attributed` plus `external`. `attributed` je časť, ktorej kniha dáva kľúč k tokenom, ktoré smerovala. `external` je kľúčová časť používania účtu, ktorú kľúče fondu nezohľadňujú.
- Obe časti sa odošlú len vtedy, keď je `accountVisible` fondu pravdivá: kľúč má `self:account-quota` a poskytovateľ je vo svojom `sharedQuotaProviders`. Kľúč bez neho dostane `consumed` samostatne, s rovnakými `status` a `reason`.
- S oboma časťami a vlastnou váhou môže držiak vyriešiť použitie mimo bazéna, ktoré sa účtuje na kľúče bazéna. Držiteľ s rozsahom účtu už vidí súčet účtu.
- Kľúč, ktorý v okne nič nesmeroval, môže stále čítať svoj externý náboj z `consumed`, pretože jeho priradená časť je potom 0.
- Napríklad kniha sa otvára pri 0, pričom kľúče A a B majú váhu 50 každý. Kľúč A smeruje 900 000 tokenov a kľúč B 100 000. Účet potom dosiahne 60 % z limitu 100. Potom je `attributed` 54 pre kľúč A a 6 pre kľúč B a `external` je 0 pre oba.
- Pohľad číta knihu a nikdy nenapíše jej stav. Neotvára knihu a nikdy nepožiada poskytovateľa o čítanie. S úložiskom Redis čítanie odstraňuje nahradené polia revízie na pozadí, ako to robia čítania brány.
- Podiel je `ok` iba vtedy, keď vyrovnávacia pamäť brány uchováva čítanie účtu. Bez neho je `stale`, takže v bazéne bez nedávnej žiadosti sa javí ako možno zastaraný.
- Kým žiadosť neprejde cez fond, zdieľanie nie je k dispozícii. Touto požiadavkou sa otvorí kniha a suma účtu sa v danom momente počíta ako použitie mimo fondu.
- V skupine s niekoľkými účtami používa každý záznam účtu vlastnú knihu a limit jedného účtu. Presadzovanie upravuje obe strany podľa počtu účtov, takže pomer je rovnaký.
- Okná jednotlivých modelov nenesú žiadnu časť kľúča. Kniha neuchováva žiadne údaje o jednotlivých modeloch.
- Minimálne rezervy plánu nie sú hodnotené zobrazením: plán sa môže zobraziť ako `open` zatiaľ čo požiadavka je odmietnutá s dôvodom `schedule-reserve`.
- Keď dve oblasti rovnakého kľúča zdieľajú pripojenie, presadzovanie aplikuje jednu z nich a zobrazenie uvádza obe.
- Neexistuje žiadny limit na adresu na neúspešné pokusy o kľúč: volajúci za reverzným proxy môžu zdieľať jednu adresu (závisí to od toho, či sú preposlané adresy klientov dôveryhodné), takže blokovanie môže zakázať cestu ku každému držiteľovi kľúča. Pri `REQUIRE_API_KEY=true` je neplatný kľúč odmietnutý klientskou politikou API pred spustením trasy s telom tejto politiky 401 namiesto tela tejto trasy.

### Použitie člena

Správca môže nechať držiteľov kľúčov vidieť, ako sa používanie okna rozdeľuje medzi členov fondu. Táto možnosť je `memberBreakdown` fondu, predvolene vypnutá. Nastavuje sa v sprievodcovi bazénom alebo pomocou `PATCH /api/quota/pools/{id}`. `GET /api/quota/pools` a `GET /api/quota/pools/{id}` to oznámia.

Dimenzia zobrazenia nesie `members` iba vtedy, keď všetky tieto podmienky platia:

- možnosť bazéna je zapnutá
- fond má najviac 20 pridelených kľúčov a aspoň tri z nich môžu podávať požiadavky: aktívne, nezrušené, nezabanované a bez uplynutia platnosti
- `accountVisible` fondu je pravdivé: kľúč má `self:account-quota` a poskytovateľ je v jeho `sharedQuotaProviders`
- v okne `percent` je pripojenie účtu jedným z kľúčov, ktoré môže použiť
- bol prečítaný vlastný podiel kľúča tohto okna: jeho `status` nie je `unavailable`

Inak `members` chýba. Nikdy to nie je prázdny zoznam.

- Každý plátok je `{ slot, consumed, isYou }`. Schéma odozvy odmieta akúkoľvek inú vlastnosť na reze a zoznam viac ako 20 rezov. Plátky sú uvedené v poradí slotov.
- Existuje jeden segment na pridelený kľúč vrátane kľúča, ktorý už nemôže zadávať požiadavky. Člen bez využitia ukazuje skutočnú nulu.
- Slot 1 je vždy požadovaný kľúč, pričom `isYou` true. Ostatné čísla slotov sú hodnosti kľúčového hashu. Je kľúčovaný `API_KEY_SECRET` a pokrýva bazén, žiadací kľúč a člena.
- Čísla sa teda medzi držiakmi nezhodujú. Pre jedného držiteľa zostávajú medzi návštevami rovnaké. Môžu sa zmeniť, keď sa kľúč pripojí alebo opustí bazén, alebo keď sa toto tajomstvo otočí.
- V počítateľnom okne je výrez počítadlom člena v sklade kvót, rovnakým počítadlom ako jeho vlastný `consumed`.
- V okne `percent` je výrez časťou `attributed` člena z tej istej knihy, ktorá sa číta ako vlastný podiel kľúča. Použitie mimo bazéna sa nikdy nerozdeľuje na plátky. Tento náboj je rozdelený podľa hmotnosti, takže plátky, ktoré ho niesli, by ukazovali hmotnosti.
- Každý pohľad číta jednu hodnotu na ďalší člen a počítateľné okno paralelne. V okne `percent` nestoja plátky žiadne prečítanie okrem prečítania vlastnej knihy. Keď sa nedá prečítať jedna hodnota, toto okno nemá `members` a vlastný podiel kľúča zostáva.
- Možnosť a počet použiteľných kľúčov sa čítajú raz za skupinu a iba pre kľúč, ktorý môže vidieť údaje účtu. Neúspešné načítanie možnosti alebo počtu použiteľných kľúčov vypne stĺpce pre daný fond. Server zaprotokoluje varovanie a zostaví sa zvyšok zobrazenia.

Bary nenesú žiadne mená ani ID. Stále hovoria držiteľovi kľúča veci o ostatných členoch:

- Držitelia môžu stále porovnávať plátky podľa ich hodnôt.
- Stabilné číslovanie umožňuje držiteľovi sledovať jedného člena v priebehu času.
- Počet rezov ukazuje, koľko kľúčov je alokovaných v oblasti.
- V skupine troch kľúčov môže niekto, kto vie, aký kľúč bol použitý, povedať, aký kľúč použil posledný.
- Keď bazén klesne pod tri použiteľné kľúče, pruhy zmiznú. Zobrazenia urobené skôr stále ukazujú, čo každý člen používal.
- V počítateľnom okne môže súčet fondu mínus rezy ukázať použitie kľúčov, ktoré už nie sú pridelené.
- Člen, ktorý zobrazuje nulu na jednom účte a použitie na inom, môže ukázať, ktorý člen používa ktorý účet.
- V počítateľnom poole s politikou `hard`, plátok, ktorý prestane rásť pri spravodlivom podiele člena, naznačuje váhu tohto člena.

### Séria použitia (`GET /api/v1/me/usage`)

`GET /api/v1/me/usage?range=<range>` (tiež poskytované na `/v1/me/usage`) vracia využitie a cenu vlastných požiadaviek volacieho kľúča: súčty, jeden záznam za deň UTC, deň a model, model a poskytovateľa. Zdieľa príznak, pravidlá autentifikácie, rozsah `self:usage`, `Cache-Control: no-store` a chybové správanie vyššie uvedenej trasy kvóty. Kľúč je skontrolovaný pred `range`. Chyby sú 400 (`Invalid range`), 401, 403, 404 a 500 (`Failed to build usage`).

- `range` je jedno z `1d`, `7d`, `30d` (predvolené) alebo `90d`. Akákoľvek iná hodnota, prázdna hodnota alebo opakovaný parameter je 400. Sada sa zastaví na `90d`, aby sa určila cena hovoru. Zobrazenie číta iba surovú históriu používania, nikdy nie denné súhrny, ktoré nenesú žiadny kľúč.
- Riadky sa vyberajú podľa ID volacieho kľúča. Stĺpec s názvom kľúča sa nikdy nezhoduje a riadky zaznamenané bez ID kľúča sa nikdy nezapočítavajú.
- Vytvorenie série spustí päť zoskupených dopytov nad riadkami kľúča v okne. Zostavená séria sa znova použije na 60 sekúnd na kľúč a rozsah a opakovane použitý hovor sa nespustí. Jeho `generatedAt` udáva jeho vek.
- Okno končí, keď je séria zostavená. Riadok označený neskôr, napríklad zošikmením hodín, sa nepočíta.
- `coverage.retentionDays` je nespracované nastavenie uchovávania histórie používania operátora (`retention.usageHistory` v nastaveniach databázy). `coverage.truncatedByRetention` je pravda, keď je požadovaný rozsah dlhší ako toto nastavenie. Porovnáva tieto dve čísla a nekontroluje, či riadky skutočne chýbajú.
- Poskytovateľ sa vráti tak, ako je zaznamenaný pre vlastné požiadavky kľúča. Model je zaznamenaný názov po jeho poslednom `/` a riadky sú podľa neho zoskupené. Kombinovaná požiadavka, ktorej každý cieľ bol odmietnutý, sa zaznamená so smerovacím štítkom ako poskytovateľ (názov komba, `auto` alebo `combo`) a modelovým reťazcom, ktorý klient poslal. Iné odmietnuté požiadavky, napríklad otvoreným ističom, modelovým cooldownom alebo kvótnym zaparkovaným preskokom, si ponechávajú cieľového poskytovateľa a model.
- Okrem počtov a nákladov má odpoveď aj priemernú latenciu, mieru úspešnosti a časy prvej a poslednej požiadavky.
- `byModel` uvádza 50 párov poskytovateľa a modelu s najväčším počtom žiadostí. Pri väčšom počte párov sa jeho položky nezvýšia do `summary` a `summary.uniqueModels` počíta každý zaznamenaný pravopis modelu. `byModelTruncated` je potom pravdivé a model, ktorého páry padajú na obe strany rezu, ukazuje čiastočné súčty.
- Vykazujú sa dva náklady. `costUsd` sú fakturované náklady, ako to ukazujú analýzy používania. Poskytovatelia paušálneho predplatného, ako napríklad kódový plán Claude, tam počítajú 0 USD. `listPriceUsd` je cena za rovnaké použitie podľa katalógovej ceny vrátane predplatného. Požiadavka, ktorej model nemá riadok s cenou, počíta svoje uložené náklady: náklady, ktoré poskytovateľ nahlásil, alebo náklady vypočítané pri zaznamenaní požiadavky. Iba žiadosť, v ktorej ani jedno nemá hodnotu 0, bez označenia, takže súčet môže byť čiastočný.
- Kontrakt odpovede je `src/shared/schemas/selfUsage.ts` (`SelfUsageSeries` v `docs/openapi.yaml`).

### Samoobslužná stránka

Pri zapnutom `QUOTA_SELF_PANEL` je `/quota/{provider}` verejná stránka. Držiteľ kľúča tam zadá kľúč API a vidí fondy tohto kľúča pre poskytovateľa. Každá skupina zobrazuje jednu kartu na okno skupiny, pričom skupina môže byť použitá pre každého a vlastný podiel kľúča. Každý účet fondu má svoje vlastné karty s použitím účtu a podielom kľúča. Použitie účtu sa zobrazí iba vtedy, keď kľúč vidí údaje účtu. Na stránke sú tiež uvedené limity pre jednotlivé modely každého účtu a vlastné použitie kľúča. Keď plán práve teraz blokuje kľúč, zobrazí sa upozornenie. Karta obsahuje zoznam každého viečka kľúča podľa modelu s jeho použitím a označuje dosiahnuté. `{provider}` je ID poskytovateľa alebo jeho alias (`/quota/claude`, `/quota/cc`). Neznámy poskytovateľ a každá cesta `/quota/*`, keď je príznak vypnutý, odpovedzte 404. Pool na vlastnom uzle kompatibilnom s OpenAI alebo Anthropic nemá žiadnu stránku. API za nich stále odpovedá.

Stránka nemá žiadnu reláciu. Kľúč sa odosiela iba v hlavičke `Authorization` `GET /api/v1/me/quota/{provider}`, `PATCH /api/v1/me/quota/{provider}` a `GET /api/v1/me/usage`, nikdy nie v URL. Kľúč, ktorý server akceptuje, je uložený v `sessionStorage` karty. Pomocou možnosti „Zapamätať si na tomto zariadení“ sa namiesto toho uchováva v `localStorage` a možnosť „Zabudnúť kľúč“ ho z oboch odstráni. Kľúč, ktorý server odmietne, sa odstráni z úložiska.

Skupina v režime `consent` zobrazuje požičiavaciu kartu. Držiteľ kľúča tam nastaví celé percento od 0 do 100 nevyužitého podielu kľúča na požičanie. Držiteľ si tiež vyberie, ako dlho bude súhlas trvať: do vypnutia, 1 hodina, 8 hodín, 24 hodín, 7 dní alebo 30 dní. Trvanie sa počíta od okamihu uloženia. Kým je v platnosti lehota, držiteľ si ju môže namiesto toho ponechať. Ak tento termín uplynie pred uložením, karta nepošle nič a požiada o inú voľbu. Pri 0 % sa neodošle žiadny termín. Karta zobrazuje uložený termín s názvom časového pásma. Súhlas, ktorého lehota uplynula, sa zobrazuje ako ukončený.

V prípade kľúča `hard` karta tiež uvádza, pre každé okno fondu, aké ďalšie kľúče momentálne ku kľúču požičiavajú. Každý riadok je jedna číslica pre všetky ostatné kľúče spolu. V skupine dvoch kľúčov je to vlastná figúrka druhého kľúča. Údaj, ktorý zobrazenie nehlási, sa zobrazuje ako nedostupné, nie ako nulové. Pre kľúč `soft` alebo `burst` karta hovorí, že neplatí žiadny údaj.

Fond v režime `saturation`, ktorého kľúč obsahuje percento nad 0, ukazuje iba výber. Píše, že tam uložené percentá nemajú žiadny vplyv. Jeho tlačidlo Vybrať pošle 0 bez termínu. Skupina v režime `saturation` s uloženou 0 nezobrazuje žiadnu výpožičnú kartu. Po uložení zostane karta, ktorú vrátené zobrazenie už nepotrebuje, so svojou správou, kým sa zobrazenie stránky znova nezmení.

Nič sa neuloží, kým držiteľ nestlačí tlačidlo Uložiť alebo Vybrať. Každé stlačenie odošle jednu požiadavku `PATCH /api/v1/me/quota/{provider}` a druhé stlačenie nepošle nič, kým prvé čaká. Telo nesie nepriehľadné `ref` bazéna z pohľadu, percenta a termínu. Odpoveďou je prebudované zobrazenie kvóty a stránka ho zobrazuje bez druhého čítania. Keď sa dve uloženia prekrývajú, stránka prečíta kvótu raz po poslednej odpovedi. Stránka neuchováva súhlas v úložisku prehliadača.

Odmietnutá zmena je na karte vysvetlená textom vybraným zo stavu HTTP. Telo chyby sa neprečíta. 401 hovorí, že kľúč nebol prijatý, a znova načíta kvótu. Číslo 403 hovorí, že fond neprijíma zmeny v pôžičkách a číslo 404 hovorí, že fond je preč. Obe ponúkajú tlačidlo, ktoré obnoví kvótu. Odpoveď 400 alebo iná odpoveď 4xx žiada držiteľa, aby skontroloval percento a termín. A 429 žiada držiteľa, aby počkal, a keď mu odpoveď poskytne, sekundy `Retry-After`. Odpoveď 5xx, 408 alebo zlyhanie siete hovorí, že zmena možno nebola uložená, a zadané hodnoty sa zachovajú. Odpoveď mimo zmluvy obnoví kvótu. Neúspešné uloženie neodstráni samotný kľúč. Keď je opätovné načítanie po odmietnutí, stránka odstráni kľúč ako pri každom odmietnutom čítaní.

Po prijatí kľúča sa na stránke zobrazí aj karta „Nastavte si nástroje“ s tromi kartami. „Kód Claude “ udáva blok `env` pre `~/.claude/settings.json`. "Shell" poskytuje rovnaké premenné ako riadky `export`. „Claude Desktop“ udáva hodnoty pre svoje inferenčné okno tretej strany. Modely sú modely zdieľania kvót, ktoré môže kľúč vyžadovať pre daného poskytovateľa. Keď sa s kľúčom nedodá žiadny takýto zoznam, blok namiesto toho zapne zisťovanie modelu brány. Adresa brány je verejný pôvod API ktorý server hlási (`OMNIROUTE_PUBLIC_API_BASE_URL`, potom `OMNIROUTE_PUBLIC_BASE_URL`). Keď nie je nastavený ani jeden, na karte sa zobrazí zástupný symbol a držiteľovi sa povie, aby sa spýtal správcu. Kľúč sa zobrazuje ako zástupný symbol. "Zahrnúť môj kľúč" vloží celý kľúč do textu na obrazovke a do toho, čo kopíruje tlačidlo kopírovania. To trvá, kým sa políčko nevyčistí, kľúč sa nezabudne alebo vymení, alebo kým sa neopustí stránka. Karta neposiela žiadnu požiadavku a neponúka sťahovanie súborov.

Čítanie značiek API `stale` sa zobrazuje ako možno zastarané. Čítanie, ktoré označuje `unavailable` sa zobrazuje s odôvodnením, nikdy nie ako nula.

Na percentuálnych plánoch stránka nakreslí vlastný podiel kľúča, keď to API nahlási. Hovorí, že číslo je odhad a pomenúva jeho dve časti. Limity na model zobrazujú iba účet.

Keď okno nesie `members`, jeho karta tiež zobrazuje pruh s jedným segmentom na člena v poradí slotov. Segment žiadajúceho tlačidla používa farbu zvýraznenia. Ostatné segmenty cyklicky prechádzajú farbami grafu témy. Textová legenda uvádza každý segment s jeho hodnotou, takže nič nezávisí od farby. Segmenty sú označené `You` alebo `Member N`, kde N je slot.

### Vyhradený port pre stránku

`QUOTA_PANEL_PORT` otvorí druhý poslucháč, ktorý slúži iba na samoobslužnú stránku. Je vypnutá, pokiaľ nie je nastavená premenná. `QUOTA_PANEL_HOST` je adresa väzby a predvolená je `127.0.0.1`.

Poslucháč odovzdá tieto cesty hlavnému portu a odpovie 404 pre každú ďalšiu cestu:

| Cesta                                                                    | Slúži                                |
| ------------------------------------------------------------------------ | ------------------------------------ |
| `/quota/{provider}`                                                      | Stránka                              |
| `/api/v1/me/quota/{provider}`, `/v1/me/quota/{provider}`                 | Zobrazenie kvóty, ktorú stránka číta |
| `/api/v1/me/usage`, `/v1/me/usage`                                       | Séria používania, ktorú stránka číta |
| `/_next/static/`                                                         | Skripty, štýly a fonty zostavy       |
| `/favicon.ico`, `/favicon.svg`, `/icon-512.png`, `/apple-touch-icon.png` | ikony                                |

`GET` a `HEAD` sú prenášané bez tela. Odošle sa aj jedna požiadavka s telom: `PATCH` cesty zobrazenia kvóty, ktorú stránka odošle na uloženie voľby požičiavania. Akákoľvek iná metóda odpovedá 404, okrem požiadavky CONNECT, ktorej spojenie je uzavreté bez odpovede. Akákoľvek iná požiadavka, ktorá deklaruje telo, odpovie 404 a jej spojenie sa uzavrie. Žiadosti o inováciu sa odmietnu a ich spojenie sa uzavrie. Cesta s bodovým segmentom alebo značkou fragmentu je odmietnutá, ako na porte API. Rovnako aj cieľ požiadavky so znakom mimo tlačiteľného ASCII. Na nespracovaný riadiaci znak v cieli analyzátor HTTP odpovie 400 pred vlastnou kontrolou tohto portu. Hlavičky požiadaviek, ktoré si framework vyhradzuje pre svoje vlastné použitie, sa neprenášajú: názvy začínajúce na `x-middleware-`, `x-invoke-`, `x-nextjs-`, `x-now-` alebo `x-next-` a názvy `x-matched-path` a `next-resume`. Žiadosť sa odošle bez nich. Dashboard, prihlasovacia stránka, manažment API a inferenčné cesty nie sú dostupné cez tento port.

`PATCH` musí niesť `Content-Type: application/json`, bez parametra alebo iba so `charset=utf-8`. Musí obsahovať jedno `Content-Length` od 1 do 4096, napísané ako obyčajné číslice a žiadne `Transfer-Encoding`. `PATCH`, ktorý poruší jedno z týchto pravidiel, odpovie 404. Niektoré chybne tvarované dĺžky, ako napríklad podpísané alebo opakované, analyzátor HTTP odpovie 400 pred vlastnou kontrolou tohto portu. Port načíta deklarované bajty predtým, ako sa spojí s hlavným portom, a čaká na ne maximálne 5 sekúnd. Telo, ktoré dovtedy nie je kompletné, odpovie 404 a jeho spojenie sa uzavrie. V takom prípade sa nič nedostane do hlavného prístavu alebo keď klient odíde ako prvý. Port prenáša presne deklarované bajty s rovnakým `Content-Length`. Bajty za nimi sa čítajú ako ďalšia požiadavka na pripojenie. Reverzný proxy TLS vpredu musí preposlať `Content-Length` a nesmie znovu rozdeliť telo požiadavky. Hlavný port kontroluje kľúč API v hlavičke `Authorization`, rovnako ako `GET`.

Telo 404 je `{"error":"not_found","message":"Not found."}`. Zlyhané relé odpovie 502 (`api_bridge_unavailable`) alebo 504 (`api_bridge_timeout`) bez poľa `detail`.

Poslucháč nečíta `QUOTA_SELF_PANEL` a nezapne stránku. Keď je príznak vypnutý, stránka a jej API odpovedia 404 na hlavnom porte a poslucháč odošle túto odpoveď.

Pod vývojovým serverom (`next dev`) sa stránka nestane interaktívnou prostredníctvom tohto portu. Vývojový hot-reload socket je požiadavka na aktualizáciu a port ju odmietne. Pri vývoji použite hlavný port.

Port slúži obyčajnému HTTP a stránka posiela kľúče API. Ponechajte predvolenú adresu väzby a vložte pred ňu reverzný proxy so TLS. Adresa väzby iná ako spätná slučka zaznamená toto oznámenie:

```text
[Quota Panel] Bound to <host>. This port serves plain HTTP and the page sends API keys. Put a TLS reverse proxy in front of it.
```

Peer so spätnou slučkou, ktorý neposiela žiadnu smerovaciu hlavičku, sa na hlavnom porte počíta ako lokálny. Takže proxy na rovnakom hostiteľovi musí poslať `X-Forwarded-For`. Proxy na súkromnej adrese je dôveryhodný pre túto hlavičku iba so `OMNIROUTE_TRUST_PROXY=private` (alebo `lan`). Akýkoľvek iný partner je hlásený adresou svojho pripojenia a hlavičky preposielania, ktoré odoslal, sa vypustia.

Poslucháč má súčasne maximálne 256 spojení. Klient má 10 sekúnd na odoslanie hlavičky požiadavky a 30 sekúnd na odoslanie celej požiadavky. Nečinné udržiavané pripojenie sa uzavrie po približne 5 sekundách. Spojenie bez aktivity po dobu 60 sekúnd sa uzavrie. Tieto hodnoty sú pevné. Nastavte limity pripojenia a rýchlosti aj na reverznom proxy vpredu. Reverzný proxy server vpredu by mal udržiavať nečinné upstream pripojenia menej ako 5 sekúnd alebo ich znova nepoužívať. Relé na hlavný port používa upstream timeouty portu API (`API_BRIDGE_*`).

Poslucháč sa spustí aj vtedy, keď nie je nastavené `API_PORT`. `QUOTA_PANEL_PORT` musí byť port od 1 do 65535, zapísaný iba číslicami. Musí sa líšiť od portu palubnej dosky a portu API. Kým je aktívny server WebSocket zapnutý, musí sa líšiť aj od `LIVE_WS_PORT` (predvolené 20132). Akákoľvek iná hodnota neotvorí nič a zaznamená varovanie. Upozornenie na odmietnutú hodnotu pomenúva premennú a hodnotu neopakuje. Port, ktorý sa už používa, neotvorí nič a zaznamená toto upozornenie:

```text
[Quota Panel] Port <port> is already in use. The quota panel port stays off.
```

S nastavenou `OMNIROUTE_BASE_PATH` poslucháč očakáva každú cestu vyššie pod touto predponou. Použite rovnaký `OMNIROUTE_BASE_PATH` v čase zostavenia a v čase spustenia. Napíšte ho s úvodnou lomkou a bez koncovej lomky, napríklad `/omniroute`. Iný tvar vrátane `/` a `/omniroute/` necháva port vypnutý s varovaním, hoci zostava tieto formy akceptuje. Rovnako aj základná cesta, ktorej prvý segment pomenúva aplikačnú trasu: v každom prípade `api`, `v1`, `v1beta`, `_next`, `quota`, `dashboard`, `docs`, `login`, `codex`, `responses`, `anthropic`, `openai`, `v0` alebo `connect`.

Obmedzenia:

- `/quota/{provider}/` s koncovou lomkou odpovedá 404 na tomto porte.
- Servisný pracovník a manifest webovej aplikácie sa na tomto porte nezobrazujú.
- Na tomto porte sa nezobrazuje vlastná ikona favicon na ovládacom paneli.
- Ikony sa nezobrazujú, keď aplikácia beží pod základnou cestou.
- V prístave sa hovorí jednoducho HTTP/1.1.
- Väzba, ktorá zlyhá, sa nezopakuje, kým sa proces nereštartuje.
- Poslucháč nemá žiadne pripojenie ani obmedzenie rýchlosti na adresu klienta.
- Na nastavenia kontajnerov sa táto časť nevzťahuje.

---

## Premenné prostredia

| Variabilné                           | Predvolené      | Popis                                                                          |
| ------------------------------------ | --------------- | ------------------------------------------------------------------------------ |
| `QUOTA_STORE_DRIVER`                 | `sqlite`        | Použitý ovládač: `sqlite` alebo `redis`                                        |
| `QUOTA_STORE_REDIS_URL`              | _(prázdne)_     | Redis URL, napr `redis://localhost:6379`                                       |
| `QUOTA_SATURATION_THRESHOLD`         | `0.5`           | 0..1; `>= threshold` aktivuje prísny režim                                     |
| `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` | `1000`          | Tokeny, ktoré vysvetľujú najviac jeden bod okna percenta plánu                 |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`     | `0.7`           | 0..1; multiplikátor pre kombinované skóre mäkkej politiky                      |
| `QUOTA_CONSUMPTION_RETENTION_DAYS`   | `14`            | Dni predtým, ako GC odstráni staré vedrá `quota_consumption`                   |
| `QUOTA_PANEL_PORT`                   | _(nenastavené)_ | Vyhradený port pre samoobslužnú stránku. Nenastavené znamená žiadny poslucháč. |
| `QUOTA_PANEL_HOST`                   | `127.0.0.1`     | Viazajte adresu pre tento port                                                 |

nastavenia DB (`quotaStore.*`) prepíšu env vars.

---

## Riešenie problémov

### Redis je nakonfigurovaný, ale nepripája sa

Skontrolujte, či je nainštalovaný balík `ioredis` (`npm ls ioredis`) a či je adresa `QUOTA_STORE_REDIS_URL`
dostupná. Pri zlyhaní pripojenia sa továreň prepne späť na SQLite (zaznamenané na úrovni
`warn`).

### `peek` vracia neaktuálne údaje / zlyhá otvorene

Ak `peek` vyvolá výnimku, `enforceQuotaShare` považuje výsledok za „povoliť“ (zlyhanie otvoreným spôsobom).
Skontrolujte záznamy `pino` s položkami `quota:enforce` a `quota:factory`, aby ste identifikovali
hlavnú príčinu.

### Odchýlka počítadla spotreby

Ak sa skutočné využitie poskytovateľa líši od počítadiel, je to očakávané — posuvné
okno s 2 segmentmi má na hraniciach okna chybu približne 1 % a `consume` sa vykonáva
po odoslaní odpovede bez čakania na výsledok. Signál saturácie (`saturationSignals.ts`)
číta skutočné využitie poskytovateľa s TTL 30 s a podľa toho upravuje `globalUsedPercent`.

### Fond zobrazuje „žiadne údaje“ pre rýchlosť spotreby

`computeBurnRate` vyžaduje aspoň 2 historické vzorky. Nové fondy bez predchádzajúcich
volaní `consume` zobrazia `tokensPerSecond: 0` a `timeToExhaustionMs: null`.

---

## Migrácia z localStorage

Pri prvom načítaní `/dashboard/costs/quota-share` hook `useLocalStoragePoolMigration`
skontroluje:

1. `localStorage.getItem("omniroute:quota-share:pools")` nie je prázdne.
2. `GET /api/quota/pools` vráti `[]` (DB je prázdna).

Ak platia obe podmienky, odošle každý starší pool dávkovo na `POST /api/quota/pools`
a následne odstráni kľúč z localStorage. Migrácia je idempotentná: podmienka 2 zabraňuje
opätovnej migrácii.

---

## Interná klasifikácia stratégie

`quota-share` je stratégia smerovania **určená iba na interné použitie** (`INTERNAL_ROUTING_STRATEGY_VALUES` v
`src/shared/constants/routingStrategies.ts`). Používajú ju výhradne systémom vytvorené
kombinácie poolov `qtSd/` a zámerne nie je zahrnutá v `ROUTING_STRATEGY_VALUES`, takže sa nikdy
nezobrazí v používateľskom rozhraní ani API ako možnosť, ktorú si môže vybrať používateľ.

---

## Testovacie pokrytie

S nástrojom na zdieľanie kvót sa dodávajú dve vrstvy automatického pokrytia:

| Suita                | Príkaz                                                                 | Čo pokrýva                                                                                                                                                                                                                                    |
| :------------------- | :--------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Jednotka (29 testov) | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | DRR plánovač, saturačné hradlovanie, súbežné obmedzenia, fairShare matematika, nevybavené fronty                                                                                                                                              |
| Integračná matica    | `npm run test:combo:matrix`                                            | End-to-end rozhodnutie o smerovaní prostredníctvom skutočného kombinovaného potrubia; DRR spravodlivosť + saturácia deprioritizácia prostredníctvom živých švov (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

Integračná matica beží v CI spolu so všetkými 22 verejnými stratégiami. Jednotku je možné prevádzkovať samostatne.

---

## Zhrnutie schémy DB

Tri tabuľky pridané migráciou `078`, `079` a `085`:

- `quota_pools` + `quota_allocations` — definície oblasti a pridelenie na kľúč.
- `quota_consumption` — rolovacie 2-vedrové počítadlá na `(apiKeyId, dimensionKey)`.
- `provider_plans` — manuálne prepísanie plánu poskytovateľa (rozmery JSON na connectionId).

Všetky tabuľky boli pridané prostredníctvom idempotentných migrácií `CREATE TABLE IF NOT EXISTS`.

Požičiavanie so súhlasom pridáva tri stĺpce: `quota_allocations.lending_percent` (celé číslo, predvolená hodnota 0), `quota_allocations.lending_until` (milisekundy epochy alebo `NULL` bez termínu) a `quota_pools.borrow_mode` (predvolené `saturation`). Jeho migrácia iba pridá tieto stĺpce a nezapíše žiadny existujúci riadok.

Kniha pripisovania percent pridáva `quota_percent_ledger` (jeden riadok na skupinu, účet a okno plánu) a `quota_percent_ledger_tokens` (jedno počítadlo tokenov na skupinu, účet a kľúč API ). `src/lib/db/quotaPercentLedger.ts` ich číta a zapisuje.
