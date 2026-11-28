# 🗜️ Prompt Compression Guide — OmniRoute (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Аутоматски уштедите 15–95% на садржају који испуњава услове. За кратак преглед погледајте [одељак README датотеке о компресији](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Преглед

OmniRoute примењује модуларни ток компресије упита који се покреће **проактивно**, пре него што захтеви стигну до спољних добављача. То значи да се токени штеде неприметно — нису потребне никакве промене у вашем току рада.

```
Захтев клијента
  → Бирач стратегије компресије
    → Замена подешавањем комбинације? → Користи подешавање комбинације
    → Праг аутоматског покретања? → Користи аутоматски режим
    → Подразумевани режим? → Користи глобално подешавање
    → Искључено? → Прескочи компресију
  → Изабрани режим компресије
    → Искључено: Без компресије
    → Лагани: Безбедно чишћење размака/форматирања (~15%)
    → Стандардни: Уклањање сувишних речи у стилу пећинског говора (~30%)
    → Агресивни: Старење историје + сажимање (~50%)
    → Ултра: Хеуристичко скраћивање + проређивање блокова кода (~75%)
    → RTK: Филтрирање терминалског излаза/излаза алата које узима у обзир команде (опсег од 60–90% пре слања)
    → Наслагани: Уређени ток са више механизама, обично RTK па Caveman (опсег од 78–95% садржаја који испуњава услове)
  → Компримовани захтев → Добављач
```

---

## Režimi kompresije

### Isključeno

Kompresija se ne primenjuje. Sve poruke prolaze neizmenjene.

### Lagani režim (~15% uštede, <1 ms kašnjenja)

Najbezbedniji režim — čišćenje formatiranja. Skraćivanje rezultata alata je uz gubitak podataka, pa podrazumevana
putanja (bez `allow-lossy`, `engine:lite` ili eksplicitnog uključivanja imenovane kombinacije) pokreće lagani režim sa
`compressToolResults: false`: prethodni rezultati alata stižu do provajdera neizmenjeni.

| Tehnika                  | Opis                                                                                                           |
| ------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `collapseWhitespace`     | Spajanje uzastopnih praznih redova i završnih razmaka                                                          |
| `dedupSystemPrompt`      | Uklanjanje dupliranih sistemskih poruka                                                                        |
| `compressToolResults`    | Skraćivanje prethodnih rezultata alata na ograničenje laganog režima (sa gubitkom: samo uz eksplicitni zahtev) |
| `removeRedundantContent` | Uklanjanje ponovljenih instrukcija                                                                             |
| `replaceImageUrls`       | Skraćivanje URI-jeva podataka slika kodiranih u base64                                                         |

**Najbolje za:** Stalnu upotrebu i radne tokove kritične po bezbednost.

### Standardni režim (~30% uštede)

Inspirisan projektom [Caveman](https://github.com/JuliusBrussee/caveman) — uklanja poštapalice i opširne formulacije uz očuvanje značenja:

- Uklanja poštapalice („please“, „I think“, „basically“, „actually“)
- Sažima opširne fraze („in order to“ → „to“, „as a result of“ → „because“)
- Uklanja učtivo ublažavanje („Would you mind...“, „If you could possibly...“)
- Više od 30 regex pravila prilagođenih programerskim promptovima

**Najbolje za:** Svakodnevne programerske radne tokove i timove kojima je važna kontrola troškova.

### Agresivni režim (~50% uštede)

Pametno upravljanje istorijom za duge sesije:

- **Starenje poruka** — starije poruke se postepeno kompresuju
- **Kompresija rezultata alata** — dugi izlazi alata se skraćuju ili izostavljaju (prvi/poslednji redovi,
  filtriranje redova sa podudaranjima, sažimanje JSON ključeva)
- **Zaštite strukturnog integriteta** — obezbeđuju doslednost parova `tool_use` + `tool_result`
- **Svest o kontekstnom prozoru** — poštuje ograničenja broja tokena za svaki model

**Najbolje za:** Produžene sesije otklanjanja grešaka i velike baze koda.

### Ultra režim (~75% uštede)

Maksimalna kompresija za scenarije kritične po broj tokena:

- **Heurističko proređivanje** — proređivanje tokena proze na osnovu ocene
- **Očuvanje strukture** — ograđeni blokovi koda, umetnuti kod, URL-ovi i identifikatori se privremeno sklanjaju i
  ponovo umeću doslovno, nikada se ne proređuju
- **Opcioni SLM nivo** — mali lokalni model može da doradi proređivanje kada je konfigurisan
- Nezavisan od agresivnog režima: ne izvršava starenje poruka, kompresiju rezultata alata
  niti rezervni sažimač (samo neuspeh SLM nivoa može preusmeriti rezervni prolaz kroz agresivni režim)

**Najbolje za:** Situacije kada stalno nailazite na ograničenja konteksta.

### RTK režim (60–90% ulaznog raspona)

RTK režim je optimizovan za opširne izlaze alata koji se pojavljuju u sesijama sa programerskim agentima:

- Prepoznaje klase komandi/izlaza kao što su `git status`, `git diff`, `git log`, pokretači testova,
  TypeScript/Vite/Webpack izgradnje, ESLint/Biome/Prettier, npm audit/instalacije, Docker dnevnici, infrastrukturni
  izlaz i generički izlaz ljuske
- Primenjuje JSON pakete filtera iz `open-sse/services/compression/engines/rtk/filters/`
- Uvozi RTK TOML šemu v1 filtera iz projektnih ili globalnih datoteka `filters.toml`, uz validaciju ugrađenih testova
  i proveru poverenja za projektne datoteke
- Isporučuje 56 ugrađenih filtera sa ugrađenim uzorcima za proveru
- Uklanja ANSI kontrolne sekvence, trake napretka, ponovljene redove i neaktivnu buku
- Očuvava neuspehe, greške, upozorenja, izmenjene datoteke, sažetke i kraj dugog izlaza
- Podržava projektne filtere za koje je potrebno poverenje, globalne filtere i opcioni oporavak sirovog izlaza sa uklonjenim osetljivim podacima

**Najbolje za:** Sesije agenata sa transkriptima ljuske, izgradnje, testova, git-a, grep-a i izlaza datoteka.

### Složeni režim (78–95% opsega podobnog za kompresiju)

Složeni režim pokreće više mašina za kompresiju determinističkim redosledom. Podrazumevani cevovod je:

```txt
RTK -> Caveman
```

Ovaj redosled prvo sažima izlaz terminala/alata, a zatim primenjuje semantičko sažimanje pomoću Caveman-a na
preostali prompt na prirodnom jeziku. Složeni cevovodi mogu se globalno konfigurisati ili putem kombinacija kompresije
dodeljenih kombinacijama rutiranja.

**Najbolje za:** Mešoviti kontekst sa velikim dnevnicima alata, uz ljudske instrukcije ili sažetke asistenta.

## Математика уштеде из изворних пројеката

OmniRoute документује уштеде остварене компресијом на основу два извора: референтних тестова изворних пројеката и
сопствене комбинације механизама у оквиру OmniRoute-а.

| Извор   | Број из README-а изворног пројекта који се овде користи                                                                                        |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` мање излазних токена, просечна уштеда излаза на референтним тестовима од `65%`, распон од `22-87%` и алат за компресију улаза од `~46%` |
| RTK     | Уштеда од `60-90%` за излаз команди; пример сесије: `~118,000 -> ~23,900` токена, односно уштеда од `79.7%` (`~80%`)                           |

За преклапајуће садржаје алата/контекста, подразумевана OmniRoute комбинација редом примењује механизме:

```txt
RTK -> Caveman
```

Комбиноване уштеде се множе, а не сабирају:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Тај број од `78-95%` важи када и RTK и Caveman могу да смање исти улазни/контекстуални садржај.
Caveman режим излаза одговора је засебан: када је омогућен, користе се сопствене уштеде излаза за Caveman (`65%`
у просеку, истакнутих `~75%`, распон од `22-87%`). Укупна уштеда на наплати зависи од односа упита и излаза.

### Шта „подобно“ заправо значи

Истакнути распон од 15-95% је стваран, али важи само за **редундантан или преопширан** садржај — поновљене
редове грешака, евиденцију изградње која непрестано исписује исто упозорење, превелики `grep`/испis прочитане датотеке. То
**не** значи да сваки захтев остварује толику уштеду.

Емпиријски је потврђено (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): покретање режима
`stacked` (RTK + Caveman) над блоком `tool_result` у Anthropic формату, који садржи 300 идентичних
редова грешке, произвело је **уштеду од 95.93% токена / 96.26% знакова** — тачно у оглашеном
распону. Међутим, исти ток обраде примењен на нормалан, нередундантан излаз алата (чисту листу подударања из `grep`,
кратак испис датотеке, обичан текст разговора) исправно производи **уштеду близу нуле**, јер
нема ничег поновљеног што би се могло уклонити, а `validateCompression()` (`validation.ts`) одбија да пошаље
прерађени садржај који би изоставио или изменио блокове кода, URL-ове, наслове, верзије или идентификаторе константи ПИСАНЕ ВЕЛИКИМ СЛОВИМА.

Ово је очекивано и безбедно понашање, а не грешка: сесија програмирања која углавном чита/претражује чисте датотеке
имаће скромну укупну уштеду чак и када је компресија у потпуности омогућена, док ће сесија која наиђе на неуспешну
петљу или преопширан линтер остварити пуни распон од 78-95% на том саобраћају. Немојте користити низак збирни
проценат уштеде једне сесије као доказ да је компресија погрешно конфигурисана — прво проверите да ли је
основни излаз алата заиста био редундантан.

---

## Визуелизација уштеде токена

```
Без компресије:       47K токена послато LLM-у
Уз Lite:               40K токена послато          (15% уштеде — безбедно, увек активно)
Уз Standard:           33K токена послато          (30% уштеде — правила Caveman говора)
Уз Aggressive:         24K токена послато          (50% уштеде — старење + сажимање)
Уз Ultra:              12K токена послато          (75% уштеде — хеуристичко уклањање)
Уз RTK:                19K-5K токена послато       (60-90% уштеде на излазу команди/алата)
Уз Stacked:            10K-2.5K токена послато     (подобни RTK+Caveman распон од 78-95%)
```

---

## Конфигурација

### Контролна табла

Идите на `Dashboard → Context & Cache`:

- **Caveman** — избор режима, језички пакети, преглед и глобалне подразумеване вредности
- **RTK** — преглед филтрирања команди, RTK безбедносна подешавања и каталог филтера
- **Compression Combos** — именовани ланци машина додељени комбинацијама за рутирање
- **Auto-Trigger Threshold** — аутоматски активира компресију када број токена премаши праг

### Замена по комбинацији

У `Dashboard → Context & Cache → Compression Combos`, доделите комбинацију компресије комбинацији
за рутирање:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Ово вам омогућава да користите наслагану компресију код бесплатних провајдера и провајдера за
кодирање, уз задржавање lite режима на плаћеним претплатама.

Ова додела „Per-Combo Override“ је другачија контрола од замене **режима компресије комбинације
за рутирање** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — шема поља такође
прихвата `rtk`, `stacked` и `omniglyph`) — та замена не бира именовани ланац комбинације
компресије; она само поставља поље `compressionMode` које користи
`resolveCompressionPlan`. Може се поставити на картици комбинације (`Dashboard → Combos`) или,
почевши од #6760, по комбинацији за рутирање на листи „Assign to routing“ у одељку
`Dashboard → Context & Cache → Compression Combos`, одмах поред поља за потврду доделе ланца
описаног изнад. Обе површине чувају податке преко исте крајње тачке
`PUT /api/combos/{id}`.

### Замена по захтеву

Пошаљите заглавље захтева `x-omniroute-compression` да бисте заменили план компресије за
појединачни захтев. Оно има највећи приоритет — надјачава замену комбинације за рутирање,
активни профил, аутоматско активирање и подразумевану вредност панела. Непознате вредности се
занемарују (захтев се никада не одбија), а глобални главни прекидач и даље управља свиме: када
је компресија глобално искључена, заглавље не може да је укључи. Вредности:

| Вредност      | Ефекат                                                                                                      |
| ------------- | ----------------------------------------------------------------------------------------------------------- |
| `off`         | Нема компресије за овај захтев.                                                                             |
| `default`     | Подразумевани профил изведен из панела (занемарује активни профил). Машине са губицима остају искључене.    |
| `safe`        | Исто као када се заглавље изостави.                                                                         |
| `allow-lossy` | Задржава операторски план овог захтева, укључујући сажетке, филтере релевантности и преписивања стила.      |
| `engine:<id>` | Једна машина када је омогућена, нпр. `engine:rtk`. Ово је експлицитно укључивање те машине за један захтев. |
| `<combo>`     | Именована комбинација, најпре упоређена по имену (без разлике у великим и малим словима), а затим по ID-ју. |

Без `allow-lossy`, `engine:<id>` или именоване комбинације, машине са губицима се не примењују.
Када се подразумевана вредност са губицима, аутоматско активирање или замена при рутирању
смањи, OmniRoute задржава препознате кораке без губитака из конфигурисаног наслаганог ланца,
тим редоследом. Враћа се на `session-dedup → lite` само када ниједан конфигурисани корак без
губитака не преостане.

Преглед **Effective pipeline** на панелу Settings приказује уобичајени план у стању мировања.
Када аутоматско активирање може да се изврши, исти преглед приказује и његов условни ефективни
ланац, тако да резолуција током рада у панелу и без заглавља остане усклађена.

Примењени план се враћа у заглављу одговора
`X-OmniRoute-Compression: <mode>; source=<source>`, где је `<source>` једна од вредности
`request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` или `off`.

### API

```bash
# Преузми подешавања компресије
curl http://localhost:20128/api/settings/compression

# Ажурирај подешавања компресије
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Прикажи преглед одређеног RTK/stacked садржаја
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Наведи RTK пакете филтера
curl http://localhost:20128/api/context/rtk/filters

# Тестирај RTK директно са опционим метаподацима команде
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Шта се штити

Механизам за компресију **увек чува:**

- ✅ Блокове кода (ограђене и унутар реда)
- ✅ URL адресе и путање до датотека
- ✅ JSON структуре и структуриране податке
- ✅ Идентификаторе и заштићене техничке токене
- ✅ Математичке изразе
- ✅ Дефиниције позива алата/функција
- ✅ Системске упите (у лаком режиму)

RTK опоравак сировог излаза редигује уобичајене API кључеве, токене носиоца, Slack токене, AWS приступне кључеве,
лозинке, токене и тајне пре него што се било шта трајно сачува.

---

## Статистика компресије

Сваки компресовани захтев садржи статистику у серверским евиденцијама:

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

## План фаза

| Фаза    | Режими                                                                                                                                                                           | Статус       |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| Фаза 1  | Искључено, Лаки                                                                                                                                                                  | ✅ Објављено |
| Фаза 2  | Стандардни, Агресивни, Ултра                                                                                                                                                     | ✅ Објављено |
| Фаза 3  | RTK, Наслагани, Комбинације компресије                                                                                                                                           | ✅ Објављено |
| Фаза 4  | Стилови излаза, Ултра SLM нивоа, оквир за евалуацију                                                                                                                             | ✅ Објављено |
| Фаза 4C | Прилагодљиви буџет контекста („регулатор“) — механизам за израчунавање + API (`contextBudget` на `PUT /api/settings/compression`) + контроле режима/смерница на контролној табли | ✅ Објављено |

---

## Захвалнице

Правила компресије стандардног режима инспирисана су пројектом **[Caveman](https://github.com/JuliusBrussee/caveman)** аутора **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — виралним пројектом „зашто користити много токена кад мало токена ради посао“. Caveman наводи `~75%` мање излазних токена, просечну уштеду излаза од `65%` на референтним тестовима, распон излазне уштеде од `22-87%` и алат за компресију улаза од `~46%`.

RTK режим инспирисан је пројектом **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** организације **[RTK AI](https://github.com/rtk-ai)** — пројектом високих перформанси за компресију излаза команди намењеним филтрирању излаза терминала, изградње, тестова, git-а и алата. RTK наводи уштеду од `60-90%`, док пример сесије у његовој README датотеци приказује уштеду од `~80%`.

---

## Напредни системи компресије

Осим 7 горе описаних режима (извор такође прихвата `codex-responses` и `omniglyph` режиме, које овај водич не покрива), одељци испод покривају функције које функционишу унутар или поред тих режима: Компресија резултата алата и прогресивно старење су кораци 1 и 2 агресивног механизма (агресивни режим и `aggressive` корак наслаганог цевовода за компресију), начин на који се изводи стек компресиони цевовод, начин на који се изводи компримовани цевовод је начин на који снижава `aggressive` и `ultra` на `standard` за добављаче кеширања док је компресија укључена, а Цавеман излазни режим и стилови излаза су инструкције системског одзива које се подразумевано искључују, које обликују излаз модела уместо да компримују захтев.

### Цацхе-Аваре Цомпрессион

Неки провајдери (као што је Anthropic са брзим кеширањем) подржавају** брзо кеширање** , што им омогућава да кеширају делове упита како би смањили трошкове и кашњење. Када је кеширање омогућено, агресивна компресија заправо може** повредити** перформансе јер мења кеширане токене, поништавајући кеш.

Модул `cachingAware.ts` то решава тако што** откривање контекста кеширања** и** прилагођавање стратегије компресије** сходно томе.

#### Како то ради

1. **Откривање контекста кеширања** — Скенира тело захтева за `cache_control` маркере
2. **Идентификујте добављаче кеширања** — Проверава да ли циљни провајдер подржава кеширање
3. **Прилагодите стратегију** — Враћа `aggressive`/`ultra` на `standard` за провајдере за кеширање
4. **Прескочи системски упит** — системски упити се обично кеширају, тако да их немојте компримирати

Помоћник стратегије такође враћа `deterministicOnly` заставицу, али креатор плана користи само стратегију — ништа низводно не чита заставу данас.

#### Пример кода

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

#### Када користити

Компресија свјесна кеша је** увек укључен** — није потребна конфигурација. Покреће се кад год је компресија укључена и циљни провајдер подржава брзо кеширање (Anthropic, OpenAI, итд.); експлицитни `cache_control` маркери нису потребни — само провајдер кеширања покреће снижење, а сами маркери то никада не раде (откривање маркера доводи до телеметрије кеша, а не доношења одлуке о стратегији).

OpenRouter се рачуна као добављач кеширања само за `anthropic/*` моделе: захтеви Claude кода задржавају своје `cache_control` тачке прекида (највише 4) и чувар штити префикс, док свака друга OpenRouter породица (`openai/`, `google/`, `qwen/`, …) остаје огољена и нечувана.

### Прогресивно старење

Дуги разговори акумулирају много преокрета порука, али старија скретања постају мање релевантна. Модул `progressiveAging.ts`** деградира поруке растојањем скретања** (растојање мерено од краја разговора). Са испорученим подразумеваним вредностима (`verbatim: 2, light: 2, moderate: 3`):

- **Последња 2 скретања (раздаљина ≤ 2)** : Сачувано дословно
- **Удаљеност 3** : Цавеман компресија (уклањање пунила)
- **Удаљеност 4 +** : Поруке помоћника сумиране; корисничке поруке сведене на њихов први ред, ограничене на 120 карактера; остале улоге нетакнуте. Системска упутства, већ старе поруке и најновија корисничка порука се увек чувају дословно без обзира на удаљеност. Ништа се не испушта потпуно, а `light` опсег је недоступан са испорученим подразумеваним вредностима (`light` једнако `verbatim`).

#### Пример кода

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

#### Када користити

Прогресивно старење је** увек укључен** за `aggressive` режим — то је корак 2 од `compressAggressive()`. Ултра режим га не покреће. Посебно је ефикасан за:

- Дуготрајне сесије кодирања
- Вишедневни разговори
- Агентски токови посла са много позива алата

### Цавеман Оутпут Моде

Цавеман излазни режим додаје** системска упутства** који од самог модела траже сажети излаз — ниво `lite` тражи сажете одговоре који садрже пуне реченице, `full` тражи од њега да "реагује сажето као паметни пећински човек", а `ultra` тражи телеграфски излаз; упутства само траже, не могу то гарантовати. Захтеви их примају преко `applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`): `open-sse/handlers/chatCore.ts` прво решава избор са подлошком за бацк-цомпат (`resolveOutputStyleSelection()` у `open-sse/services/compression/outputStyles/backCompat.ts`), који, док је `outputStyles` празан, мапира омогућени `cavemanOutputMode` у `terse-prose` излазни стил на `cavemanOutputMode.intensity` (погледајте Бацк-цомпат испод); непразан избор `outputStyles` се користи какав јесте, а `cavemanOutputMode.enabled` и `intensity` тада немају ефекта, док се његов `autoClarity` прекидач и даље примењује. `outputMode.ts` садржи текстове инструкција (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), заобилажење садржаја и помоћник за постављање који користи ињекција; његов сопствени `applyCavemanOutputMode()` ињектор нема производног позиваоца.

#### Како то ради

Овај режим не компримује улаз. Он додаје блок инструкција у системски промпт (погледајте како убризгавање функционише испод), а било који режим компресије улаза изабран за захтев и даље се покреће после, на телу које сада носи блок. Испред клаузуле о заједничким границама којом се завршава сваки ниво, енглески `full` ниво гласи:

> „Одговарајте кратко као паметни пећински човек. Одбаците чланке (a/an/the), пунило (just/really/basically/actually/simply), пријатности, хеџинг. Фрагменти OK. Кратки синоними (велики, не опсежни, поправите не имплементирајте). Задржите сву техничку супстанцу, код, грешке, URLs, идентификаторе тачним.“

Ово посебно добро функционише за:

- Генерисање кода (терсер излаз = мање токена)
- Брза питања и одговори (нема потребе за детаљним објашњењима)
- Групна обрада (максимизирање протока)

#### Када користити

Режим излаза Цавеман је** опт-ин** . Када је компресија укључена (`enabled: true`, главни прекидач на страници Подешавања компресије), укључите га помоћу `cavemanOutputMode.enabled`; `intensity` бира `lite`, `full` или `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Комбинација компресије** Оутпут Моде** тоггле (`outputMode`, ниво у `outputModeIntensity`) поставља исти прекидач за захтеве на које се примењује комбинација, а `omniroute_set_compression_engine` MCP алат га уписује кроз свој логички аргумент `outputMode`. Непразан избор `outputStyles` има предност над овим прекидачем. На контролној табли, омогућавање** Кратка проза** излазни стил убацује исти блок (погледајте Излазни стилови испод).

### Излазни стилови (каталог)

Режим излаза Цавеман изнад је** завештање једностилног пута** . Фаза 4 је генерализовала у каталог састављајућих излазних стилова: `OUTPUT_STYLE_CATALOG` у `open-sse/services/compression/outputStyles/catalog.ts`. Сваки стил је системска инструкција која тражи од самог модела јефтинији излаз; стилови се могу омогућити заједно и убризгавају се по каталошком редоследу.

| Стиле                               | `id`            | Шта ради                                                                                                                                                                                                                                                    | Наставни језици                               |
| ----------------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Кратка проза                        | `terse-prose`   | Дроп filler/articles/hedging; одржавати тачност техничке супстанце. Исти текст као и застарели режим излаза пећинског човека (референциран, није поново откуцан).                                                                                           | ен, пт-БР, ес, де, фр, ит, ру, зх, ја, ид, ви |
| Мање кода                           | `less-code`     | YAGNI мердевине: најмања радна промена, без незатражених апстракција.                                                                                                                                                                                       | ен, пт-БР, ес, де, фр, ит, ру, зх, ја, ид, ви |
| коњски реп (лењи старији програмер) | `ponytail`      | „Најбољи код је код који никада није написан“: поново користите > реврите, основни узрок > симптом, најкраћа радна разлика.                                                                                                                                 | ен, пт-БР, ес, де, фр, ит, ру, зх, ја, ид, ви |
| Имам ADHD (прва акција)             | `i-have-adhd`   | Прва радња (command/path/snippet пре прозе), нумерисани ограничени кораци, ONE конкретан следећи корак, не preamble/recap/closers. Прилагођено из [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT).                                        | ен, пт-БР, ес, де, фр, ит, ру, зх, ја, ид, ви |
| Антислоп UI филтер                  | `antislop-ui`   | Свака визуелна техника мора проћи тест сврхе (хијерархија, идентитет, читљивост); нема подразумеваног gradients/glass/glow, затворене палете, нема распореда шаблона. Оба антислоп стила додају границу без мртвих контрола / без фабрикованих потраживања. | ен, пт-БР, ес, де, фр, ит, ру, зх, ја, ид, ви |
| Антислоп копија и људски филтер     | `antislop-copy` | Специфична копија (без ем цртице, генерички CTAs, буззвордс, цхатбот затварачи, измишљене чињенице) плус правила за људе: WCAG AA контраст, видљиви фокус, досег тастатуре, empty/loading/error стања, мобилно рефлов.                                      | ен, пт-БР, ес, де, фр, ит, ру, зх, ја, ид, ви |
| Терсе CJK (文言)                    | `terse-cjk`     | `full`/`ultra` одговор на класичном кинеском (文言); `lite` тражи само кратке одговоре без функционалних речи, пријатности или улепшавања.                                                                                                                  | зх (локално ограничен, види доле)             |

Сваки стил испоручује три нивоа интензитета — `lite`, `full`, `ultra` — и сваки ниво се завршава клаузулом о заједничким границама (`SHARED_BOUNDARIES` ин `outputMode.ts`), која чува блокове кода, путање датотека, команде, грешке и URLs тачан. Текстови нивоа `terse-prose` и `terse-cjk` додају идентификаторе на ту листу.

`terse-cjk` је ограничен на `zh` на два места. Страница Подешавања компресије наводи свој ред само када је језик UI контролне табле кинески (`zh-CN` или `zh-TW`), а `applyOutputStyles()` га убацује само када је разрешени језик захтева (погледајте избор језика испод) `zh`. Сакривање реда не брише сачувани `terse-cjk` избор: подешавања API прихватају било који ИД стила, а чување других стилова на страници га задржава. У време захтева, `applyOutputStyles()` провера језика је једина капија за локализацију.

#### Како делује ињекција

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) решава селекцију у односу на каталог (непознати ИД-ови и стилови који се не подударају са локализацијом се одбацују, никада грешка; избор који се решава без стила оставља тело непромењеним, прескаче као `no_styles`), спаја изабране инструкције у редоследу каталога, додаје клаузулу о границама** једном** (плус безбедносна клаузула, `SAFETY_BOUNDARIES` или њен превод, када је изабрано `less-code` или `ponytail` ), и почиње блок са једним маркером идемпотенције (`[OmniRoute Output Styles]`), тако да је поновна примена неопходна. Када решени језик (погледајте избор језика испод) има превод, локализована инструкција се убацује уместо енглеског.

На телу са непразним `messages` низом, провера идемпотенције се покреће пре заобилажења садржаја: када је `[OmniRoute Output Styles]` маркер већ у `system` пољу највишег нивоа (стринг или низ садржаја блокова) или у системској поруци са садржајем низа, тело остаје непромењено као `already_applied` и не покреће се провера кључне речи. У супротном, заобилажење садржаја (`shouldBypassCavemanOutputMode()` у `open-sse/services/compression/outputMode.ts`) проверава текст последње три поруке, без обзира на њихову улогу, и прескаче стилове за цео ред када се тај текст подудара са кључним речима за безбедност, неповратну акцију или појашњење, или секвенцу осетљиву на редослед: `first`, `then`, `after that`, `before` или `rollback` з знаком након `delete`, `drop`, `migrate`, `deploy` `release` `backup` Обилазница ради док се** Ауто-Цларити Бипасс** прекидач (`cavemanOutputMode.autoClarity`, подразумевано укључен) је укључен; искључивањем прекидача прескаче се провера кључних речи.

Када обилазница пусти скретање, `placeSystemInstruction()` (иста датотека), која никада не креира нови `messages[0]`, поставља блок у први од ових које пронађе:

1. Водећа системска порука са садржајем низа: блок се додаје иза његовог текста.
2. Поље `system` највишег нивоа: блок се додаје иза текста стринга или се додаје као нови текстуални блок низу блокова садржаја.
3. Прва каснија системска порука са садржајем низа: блок се додаје иза његовог текста.
4. Ништа од горе наведеног: блок иде у нову системску поруку на крају `messages`.

На телу без `messages` низа (или са празним), нема заобилажења садржаја и `system` поље највишег нивоа се не консултује. Блок се додаје иза текста низа `instructions` поља, осим ако то поље већ садржи `[OmniRoute Output Styles]` маркер, у ком случају тело остаје непромењено као `already_applied`. Када тело нема стринг `instructions` поље, али носи `input` (стринг или низ), блок постаје `instructions`, замењујући било коју вредност која није ниска у том пољу. Тело које нема ни поље `instructions` ни стринг ни низ `input` остаје непромењено и прескаче се као `no_messages`.

#### Како омогућити

На контролној табли:** Контекст компресије → Подешавања компресије** (`/dashboard/context/settings`), Одељак за стилове излаза: један ред по стилу са on/off прекидачем и бирачем нивоа. Стилови се убацују док је сама компресија укључена (главни прекидач странице, `enabled`). Тхе** Ауто-Цларити Бипасс** прекидач је на** Цавеман** страница (`/dashboard/context/caveman`), у свом** Оутпут Моде** картица. Програмски, конфигурација компресије наставља избор као:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Бацк-цомпат: док је `outputStyles` празан, застарела `cavemanOutputMode.enabled` поставка се пресликава на `terse-prose` на `cavemanOutputMode.intensity`. Блок тада почиње са `[OmniRoute Output Styles]` маркером, где је застарели `applyCavemanOutputMode()` ињектор написао `[OmniRoute Caveman Output Mode]`. Испод маркера, текст се подудара са застарелом ињекцијом у ен, пт-БР, ес, де, фр, ит, ру, ид и ви; у ја и зх носи један додатни размак испред клаузуле о границама. `terse-prose` се преводи у пт-БР, ес, де, фр, ит, ру, зх, ја, ид и ви, тако да захтев чији је решени језик `hu` добија енглески текст где је легаци ињектор користио свој мађарски.

Избор језика у стилу излаза (`resolveOutputStyleLanguage()` у `outputStyles/apply.ts`): са укљученим `languageConfig.enabled`, `autoDetect` узоркује најновију корисничку поруку у `messages` низу захтева која има текст (садржај низа или `text` његових делова садржаја) и покреће детектор Цавеман мотора (`detectCompressionLanguage()`) на њему. Детектор враћа `zh` за текст са Хан знаковима и без кана; иначе враћа оно што од `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` и `id` има највише подударања наговештаја, а `en` када се ниједан не подудара са — текстом који не може да класификује добија енглески, никада `defaultLanguage` и `vi` се никада не откривају `vi` стилови. Тело одговора API задржава своје редове у `input`, које није узорковано, тако да добија `defaultLanguage`, а затим енглески. Када ниједна корисничка порука у `messages` нема текст, или када је `autoDetect` искључена, примењује се `defaultLanguage`, а затим енглески. Када `languageConfig.enabled` искључен, језик је енглески — осим ако се комбо компресије не примењује на захтев (комбо додељен комбинацији рутирања захтева, или се подразумевана комбинација компресије chatCore враћа на уграђени наслагани цевовод): примена комбинације укључује `languageConfig.enabled` за тај захтев и поставља `defaultLanguage` ако је пацксцом зкбг једна вредност са пацксцом са' комбиновани пакети, иначе први пакет комбинације, који је подразумевано подешен на `en`), док сачувани `autoDetect` (подразумевано укључен) и даље важи. Цавеман машина за унос бира свој језик пакета правила различито — по делу текста и, са искљученим аутоматским откривањем, гатед на `enabledPacks`.

Матрица језика × је причвршћена помоћу `tests/unit/compression/output-styles-i18n-matrix.test.ts`: сваки стил каталога треба унос у `BASELINE_LANGUAGES` теста; стил који није ограничен на локализацију мора да испоручи пт-БР превод ( `terse-cjk` са ограничењем на локализацију је изузет из овог правила) осим ако није наведен у `KNOWN_ENGLISH_ONLY`, који може да садржи само стилове без превода уопште — наведени стил који има било какав превод не пролази тест; а стил пада на тесту када изгуби језик који наводи његов `BASELINE_LANGUAGES` унос. Да бисте додали стил, погледајте [EXTENDING_COMPRESSION.мд](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Компресија резултата алата

`compressToolResult()` у `open-sse/services/compression/toolResultCompressor.ts` компримује текст резултата алата помоћу** 5 стратегија** . Покушава их овим редоследом, а прва омогућена стратегија чија провера одговара садржају одлучује о резултату:

1. **`fileContent`** : садржај од 3 или више реда у којима најмање један ред, занемарујући почетно увлачење, почиње са `import `, `export `, `function `, `class `, `const `, `let `, `var ` или `return ` (кључна реч плус размак), или са `if`, `for` или `while` које следи `(` или ` (`, а последњи ред са првим 5 . елидед средњи означен.
2. **`grepSearch`** : садржај са најмање једном линијом облика `<path>:<digits>:`, где текст пре првог двотачка нема размака, задржава само те редове, највише 30, након чега следи број свих даљих подударања и листа подударних датотека; сваки други ред се испушта. Једна таква линија је довољна да покрене стратегију, тако да се рачуна и линија дневника која почиње са временском ознаком као што је `12:30:45`.
3. **`shellOutput`** : излаз који садржи ANSI CSI секвенцу (`ESC[` затим цифре или тачке и зарезе па слово, као у кодовима боја) или `$` праћен размаком било где у тексту губе те секвенце (други излаз, као што су `ESC[?25l` или OSC секвенца наслова прозора, се чувају) и задржава последњих 50 редова који се понављају. Зато што се ова провера покреће пре него што `json` и `errorMessage`, JSON или излаз грешке који садржи такав `$` никада не дође до њих док је `shellOutput` укључен.
4. **`json`** : JSON корисни терет преко 2.000 карактера који почиње са `{` или `[` (након опционог размака) и рашчлањује се сумира: низ од више од 7 ставки задржава својих првих 5 и последње 2 ставке и укупан број, а објекат задржава својих првих 20 кључева, са сваким угнежђеним објектом или низом замењено место за дужину Н ( `{…N keys}` вредност) и `_remaining_<N>_keys` маркер који броји кључеве који су пали преко првих 20. Скаларне вредности се копирају целе, тако да се објекат од 20 кључева или мање без угнежђених вредности само поново увлачи — а минимизирани добија знакове и остаје непромењен.
5. **`errorMessage`** : излаз који садржи, било где и у било ком слову, `error:`, `error ` (реч иза које следи размак, као у `no error found`), `[error]`, `exception:`, `exception `, `[exception]` или `traceback` задржава свој први ред, следећих 10 реда и последња 3, са `… [N frames elided] …` маркером уместо редова између њих. Маркер се појављује само када више од 13 редова прати први ред, тако да се излаз грешке од 14 редова или мање не скраћује (на 12 или 13 редова последња 3 поновљена реда се већ чувају).

Након поклапања стратегије, чак и оне која ништа не штеди, касније стратегије се не покушавају. Када стратегија подударања не сачува процењене токене (дужина ÷ 4, заокружено) — на пример, датотека налик коду од 25 редова или мање, или JSON низ преко 2.000 карактера са 7 ставки или мање — агресивни механизам задржава оригинални резултат алатке: оба позиваоца (`compressAggressive()` ) док су `compressAnthropicToolResultBlock()` или зке испод, док је `saved` испод и `compressToolResult()` и даље враћа излаз те стратегије. Корак алата за резултат није последња реч: резервни сумаризер машине и даље може да скрати `tool` или `function` поруку дужу од 8,192 карактера (`maxTokensPerMessage`, 2,048, пута 4).

#### Када користити

Компресија резултата алата је корак 1 агресивног механизма (`compressAggressive()` у `open-sse/services/compression/aggressive.ts`), тако да ради у агресивном режиму и у `aggressive` кораку наслаганог цевовода. Он компримује `tool` и `function` поруке у облику ОпенАИ и текст унутар Anthropic `tool_result` блокова. Свака стратегија има сопствени прекидач под `aggressive.toolStrategies`, све је подразумевано укључено. На контролној табли, прекидачи су на страници Цавеман-а** Напредно** приказ док је компресија укључена и подразумевани режим је Агресиван.

### Стацкед Пипелине

Покреће се наслагани режим** више мотора у низу** — обично прво RTK (60-90% уштеде на излазу алата), затим Цавеман на преосталом тексту (~ 46% уштеде на уносу). Састављено, то је** 78-95% прихватљивог опсега** (погледајте Упстреам Савингс Матх изнад): `1 - (1 - 0.60..0.90) × (1 - 0.46)` у просеку износи ≈ 89%.

#### Како то ради

```
Input (1000 tokens)
  → RTK (command-aware filter) → 200 tokens
    → Caveman (filler removal) → 108 tokens
  → Output (108 tokens, ~89% savings)
```

#### Када користити

Користите наслагани режим за:

- Токови посла са тешким алатима (агентско кодирање, истраживање)
- Скупна обрада осетљива на трошкове
- Када вам је потребна максимална уштеда токена

Наслагани цевоводи се конфигуришу преко подешавања глобалне `stackedPipeline` компресије или преко именоване комбинације компресије која је додељена комбинацији рутирања (погледајте Преограничење по комбо изнад) — а не преко аутоматске комбинације `modePack` (то поље само мења тежину избора аутоматског комбинованог модела, а `stacked` није важеће име пакета).

---

## Zamene kompresije za kombinacije

Možete zameniti globalni režim kompresije **za svaku kombinaciju pojedinačno** kako biste precizno prilagodili ponašanje
različitim slučajevima upotrebe:

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

Ovo je korisno za:

- **Kombinacije za programiranje**: Koristite režim `aggressive` za duge sesije
- **Kombinacije za brza pitanja i odgovore**: Koristite režim `lite` za brze odgovore
- **Kombinacije sa intenzivnom upotrebom alata**: Koristite režim `stacked` za maksimalne uštede
- **Produkcione kombinacije**: ostavite zamenu isključenu za dobavljače sa keširanjem — uvek aktivno
  prilagođavanje svesno keša automatski spušta `aggressive`/`ultra` na `standard`
  (režim `cache-aware` se ne može izabrati)

---

## Pogledajte i

- [Konfiguracija okruženja](../reference/ENVIRONMENT.md) — Promenljive okruženja za kompresiju
- [Vodič kroz arhitekturu](../architecture/ARCHITECTURE.md) — Unutrašnji detalji cevovoda kompresije
- [Korisnički vodič](../guides/USER_GUIDE.md) — Početak rada sa kompresijom
- [RTK kompresija](./RTK_COMPRESSION.md) — RTK filteri, model poverenja, kapija za verifikaciju, oporavak sirovog izlaza
- [Mehanizmi kompresije](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, API-ji, MCP, kontrolna tabla
- [Format pravila kompresije](./COMPRESSION_RULES_FORMAT.md) — Format JSON paketa pravila
- [Jezički paketi za kompresiju](./COMPRESSION_LANGUAGE_PACKS.md) — Caveman pravila specifična za jezik
