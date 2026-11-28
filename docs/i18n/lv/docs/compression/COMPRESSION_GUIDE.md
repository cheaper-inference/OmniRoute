# 🗜️ Prompt Compression Guide — OmniRoute (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Automātiski ietaupiet 15–95% atbilstošā konteksta. Īsu pārskatu skatiet [README saspiešanas sadaļā](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Pārskats

OmniRoute ievieš modulāru uzvedņu saspiešanas konveijeru, kas tiek **proaktīvi** izpildīts, pirms pieprasījumi sasniedz augšupstraumes pakalpojumu sniedzējus. Tas nozīmē, ka marķieru ietaupījums notiek nemanāmi — darbplūsmā nav jāveic nekādas izmaiņas.

```
Klienta pieprasījums
  → Saspiešanas stratēģijas atlasītājs
    → Kombinācijas ignorēšanas iestatījums? → Izmantot kombinācijas iestatījumu
    → Automātiskās aktivizēšanas slieksnis? → Izmantot automātisko režīmu
    → Noklusējuma režīms? → Izmantot globālo iestatījumu
    → Izslēgts? → Izlaist saspiešanu
  → Atlasītais saspiešanas režīms
    → Izslēgts: bez saspiešanas
    → Vienkāršs: droša atstarpju/formatējuma tīrīšana (~15%)
    → Standarta: liekvārdības noņemšana telegrāfiskā stilā (~30%)
    → Agresīvs: vēstures novecināšana + apkopošana (~50%)
    → Ultra: heiristiska atsijāšana + koda bloku retināšana (~75%)
    → RTK: komandas ņemoša vērā termināļa/rīku izvades filtrēšana (60–90% augšupstraumes diapazons)
    → Slāņots: secīgs vairāku dzinēju konveijers, parasti RTK un pēc tam Caveman (78–95% atbilstošā satura diapazons)
  → Saspiestais pieprasījums → Pakalpojumu sniedzējs
```

---

## Saspiešanas režīmi

### Izslēgts

Saspiešana netiek lietota. Visi ziņojumi tiek nodoti tālāk bez izmaiņām.

### Vieglā režīma (~15% ietaupījums, <1 ms aizkave)

Drošākais režīms — formatējuma tīrīšana. Tā rīka rezultātu saīsināšana ir ar datu zudumu, tāpēc noklusējuma ceļš (bez
`allow-lossy`, `engine:lite` vai nosaukta kombinētā režīma izvēles) palaiž vieglo režīmu ar
`compressToolResults: false`: iepriekšējie rīku rezultāti sasniedz nodrošinātāju nemainīti.

| Paņēmiens                | Apraksts                                                                                                                    |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| `collapseWhitespace`     | Apvieno secīgas tukšās rindas un beigu atstarpes                                                                            |
| `dedupSystemPrompt`      | Noņem dublētus sistēmas ziņojumus                                                                                           |
| `compressToolResults`    | Saīsina iepriekšējo rīku rezultātus līdz vieglā režīma ierobežojumam (ar datu zudumu: tikai ar skaidru pieprasījuma izvēli) |
| `removeRedundantContent` | Noņem atkārtotas instrukcijas                                                                                               |
| `replaceImageUrls`       | Saīsina base64 attēlu datu URI                                                                                              |

**Vislabāk piemērots:** vienmēr ieslēgtai lietošanai, drošībai kritiskām darbplūsmām.

### Standarta režīms (~30% ietaupījums)

Iedvesmots no [Caveman](https://github.com/JuliusBrussee/caveman) — noņem aizpildvārdus un izteikti izvērstu formulējumu, saglabājot nozīmi:

- Noņem aizpildvārdus ("please", "I think", "basically", "actually")
- Saīsina izvērstas frāzes ("in order to" → "to", "as a result of" → "because")
- Noņem pieklājīgu izvairīgu formulējumu ("Would you mind...", "If you could possibly...")
- Vairāk nekā 30 regulārās izteiksmes, kas pielāgotas kodēšanas uzvednēm

**Vislabāk piemērots:** ikdienas kodēšanas darbplūsmām, komandām, kas rūpējas par izmaksām.

### Agresīvais režīms (~50% ietaupījums)

Viedā vēstures pārvaldība ilgām sesijām:

- **Ziņojumu novecošana** — vecāki ziņojumi tiek pakāpeniski saspiesti
- **Rīku rezultātu saspiešana** — gari rīku izvadi tiek saīsināti vai izlaisti (pirmās/pēdējās rindas,
  atbilstīgo rindu filtrēšana, JSON atslēgu sablīvēšana)
- **Struktūras integritātes aizsargi** — nodrošina, ka `tool_use` + `tool_result` pāri paliek konsekventi
- **Konteksta loga apzināšanās** — ievēro katra modeļa tokenu ierobežojumus

**Vislabāk piemērots:** ilgstošām atkļūdošanas sesijām, lielām kodu bāzēm.

### Īpaši intensīvais režīms (~75% ietaupījums)

Maksimāla saspiešana scenārijiem, kuros tokenu skaits ir kritisks:

- **Heiristiskā apgriešana** — uz vērtējumu balstīta prozas tokenu apgriešana
- **Struktūras saglabāšana** — atdalīti koda bloki, iekļautais kods, URL un identifikatori tiek
  aizsargāti un no jauna ievietoti burtiski, nekad netiek apgriezti
- **Neobligāts SLM līmenis** — mazs lokālais modelis var precizēt apgriešanu, ja tas ir konfigurēts
- Neatkarīgs no agresīvā režīma: tas neveic ziņojumu novecošanu, rīku rezultātu saspiešanu
  vai rezerves kopsavilkuma veidošanu (tikai SLM līmeņa kļūme var novirzīt rezerves caurlaidi uz
  agresīvo režīmu)

**Vislabāk piemērots:** kad atkārtoti tiek sasniegti konteksta ierobežojumi.

### RTK režīms (60–90% augšupplūsmas diapazons)

RTK režīms ir optimizēts izvērstiem rīku izvadiem, kas parādās kodēšanas aģentu sesijās:

- Nosaka komandu/izvades klases, piemēram, `git status`, `git diff`, `git log`, testu palaidējus,
  TypeScript/Vite/Webpack būvējumus, ESLint/Biome/Prettier, npm auditus/instalācijas, Docker žurnālus, infrastruktūras
  izvadi un vispārīgu čaulas izvadi
- Lieto JSON filtru pakotnes no `open-sse/services/compression/engines/rtk/filters/`
- Importē RTK TOML shēmas v1 filtrus no projekta vai globālajiem `filters.toml` failiem, ar iekļautu testu
  validāciju un uzticamības pārbaudi projekta failiem
- Ietver 56 iebūvētus filtrus ar iekļautiem pārbaudes paraugiem
- Noņem ANSI vadības sekvences, norises joslas, atkārtotas rindas un troksni, kas nav saistīts ar darbībām
- Saglabā kļūmes, kļūdas, brīdinājumus, mainītos failus, kopsavilkumus un gara izvades satura beigas
- Atbalsta uzticamības pārbaudei pakļautus projekta filtrus, globālos filtrus un neobligātu neapstrādātās izvades atkopšanu ar rediģēšanu

**Vislabāk piemērots:** aģentu sesijām ar čaulas, būvēšanas, testēšanas, git, grep un failu izvades transkriptiem.

### Sakrautais režīms (78–95% piemērojamais diapazons)

Sakrautais režīms palaiž vairākus saspiešanas dzinējus determinētā secībā. Noklusējuma konveijers ir:

```txt
RTK -> Caveman
```

Šī secība vispirms padara termināļa/rīku izvadi kompaktu, pēc tam piemēro Caveman semantisko kondensēšanu
atlikušajai dabiskās valodas uzvednei. Sakrautos konveijerus var konfigurēt globāli vai ar maršrutēšanas kombinācijām
piešķirtām saspiešanas kombinācijām.

**Vislabāk piemērots:** jauktam kontekstam ar lieliem rīku žurnāliem, kā arī cilvēku instrukcijām vai asistenta kopsavilkumiem.

## Augšupējo projektu ietaupījumu aprēķins

OmniRoute dokumentē saspiešanas ietaupījumus no diviem avotiem: augšupējo projektu etalonmērījumiem un
paša OmniRoute dzinēju kombinācijas.

| Avots   | Šeit izmantotais skaitlis no augšupējā projekta README                                                                                     |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Caveman | par `~75%` mazāk izvades tokenu, `65%` vidējais izvades ietaupījums etalonmērījumos, `22-87%` diapazons un `~46%` ievades saspiešanas rīks |
| RTK     | `60-90%` komandu izvades ietaupījums; parauga sesijā `~118,000 -> ~23,900` tokenu jeb ietaupīti `79.7%` (`~80%`)                           |

Ja rīku/konteksta lietderīgās slodzes pārklājas, noklusējuma OmniRoute kombinācija dzinējus lieto secīgi:

```txt
RTK -> Caveman
```

Kopējais ietaupījums ir multiplikatīvs, nevis aditīvs:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Šis `78-95%` rādītājs ir attiecināms uz gadījumiem, kad gan RTK, gan Caveman var samazināt vienu un to pašu ievades/konteksta lietderīgo slodzi.
Caveman atbilžu izvades režīms ir atsevišķs: kad tas ir iespējots, izmantojiet paša Caveman izvades ietaupījumus (`65%`
vidēji, `~75%` galvenais rādītājs, `22-87%` diapazons). Kopējais norēķinu ietaupījums ir atkarīgs no jūsu uzvedņu un izvades proporcijas.

### Ko patiesībā nozīmē „piemērots”

Galvenē norādītais 15-95% diapazons ir reāls, taču tas attiecas tikai uz **dublētu vai daudzvārdīgu** saturu — atkārtotām
kļūdu rindām, būvējuma žurnālu, kas pārpludināts ar vienu un to pašu brīdinājumu, pārmērīgi lielu `grep`/faila lasīšanas izvadi. Tas
**nenozīmē**, ka katrs pieprasījums ietaupa tik daudz.

Empīriski pārbaudīts (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): izpildot
`stacked` (RTK + Caveman) apstrādi Anthropic formas `tool_result` blokam, kurā bija 300 identiskas
kļūdu rindas, tika iegūts **95.93% tokenu ietaupījums / 96.26% rakstzīmju ietaupījums** — pilnībā atbilstoši reklamētajam
diapazonam. Taču, apstrādājot ar to pašu konveijeru normālu, nedublētu rīka izvadi (tīru `grep` atbilstību sarakstu,
īsu faila lasījumu, parastu sarunas tekstu), pamatoti tiek iegūts **gandrīz nulles ietaupījums**, jo
nav nekā atkārtota, ko noņemt, un `validateCompression()` (`validation.ts`) atsakās nosūtīt
pārrakstītu saturu, kurā tiktu atmesti vai mainīti koda bloki, URL, virsraksti, versijas vai konstantu identifikatori ar VISIEM LIELAJIEM BURTIEM.

Tā ir paredzēta un droša darbība, nevis kļūda: kodēšanas sesijā, kurā galvenokārt tiek lasīti tīri faili vai veikta meklēšana tajos,
kopējais ietaupījums būs neliels pat ar pilnībā iespējotu saspiešanu, savukārt sesijā, kas saskaras ar kļūmju
ciklu vai pļāpīgu linteri, šai datplūsmai tiks sasniegts pilnais 78-95% diapazons. Neuzskatiet vienas sesijas
zemo kopējā ietaupījuma procentuālo vērtību par pierādījumu, ka saspiešana ir nepareizi konfigurēta — vispirms pārbaudiet, vai
pamatā esošā rīka izvade patiešām bija dublēta.

---

## Tokenu ietaupījuma vizualizācija

```
Bez saspiešanas:  LLM nosūtīti 47K tokenu
Ar Lite:          nosūtīti 40K tokenu          (ietaupīti 15% — drošs, vienmēr ieslēgts)
Ar Standard:      nosūtīti 33K tokenu          (ietaupīti 30% — caveman-speak noteikumi)
Ar Aggressive:    nosūtīti 24K tokenu          (ietaupīti 50% — novecošana + apkopošana)
Ar Ultra:         nosūtīti 12K tokenu          (ietaupīti 75% — heiristiska atzarošana)
Ar RTK:           nosūtīti 19K-5K tokenu       (komandu/rīku izvadē ietaupīti 60-90%)
Ar Stacked:       nosūtīti 10K-2.5K tokenu     (piemērotās RTK+Caveman slodzes diapazons 78-95%)
```

---

## Konfigurācija

### Informācijas panelis

Pārejiet uz `Dashboard → Context & Cache`:

- **Caveman** — režīma atlase, valodu pakotnes, priekšskatījums un globālie noklusējuma iestatījumi
- **RTK** — komandu filtra priekšskatījums, RTK drošības iestatījumi un filtru katalogs
- **Compression Combos** — nosauktas dzinēju konveijera konfigurācijas, kas piešķirtas maršrutēšanas kombinācijām
- **Auto-Trigger Threshold** — automātiski aktivizē saspiešanu, kad marķieru skaits pārsniedz slieksni

### Kombinācijas līmeņa ignorēšana

Sadaļā `Dashboard → Context & Cache → Compression Combos` piešķiriet saspiešanas kombināciju maršrutēšanas
kombinācijai:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Tas ļauj izmantot kombinētu saspiešanu bezmaksas/kodēšanas pakalpojumu sniedzējiem, vienlaikus saglabājot
vieglā režīma izmantošanu maksas abonementiem.

Šis **Per-Combo Override** piešķīrums ir atšķirīga vadīkla no **routing-combo compression
mode** ignorēšanas (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — lauka shēma pieņem arī
`rtk`, `stacked` un `omniglyph`) — šī ignorēšana neizvēlas nosauktu saspiešanas kombinācijas konveijera
konfigurāciju; tā tikai iestata `compressionMode` lauku, ko izmanto
`resolveCompressionPlan`. To var iestatīt kombinācijas kartītē (`Dashboard → Combos`) vai, sākot ar
#6760, katrai maršrutēšanas kombinācijai sarakstā "Assign to routing"
sadaļā `Dashboard → Context & Cache → Compression Combos`, tieši blakus iepriekš dokumentētajai
konveijera piešķiršanas izvēles rūtiņai. Abas saskarnes saglabā datus, izmantojot to pašu
`PUT /api/combos/{id}` galapunktu.

### Pieprasījuma līmeņa ignorēšana

Nosūtiet `x-omniroute-compression` pieprasījuma galveni, lai ignorētu saspiešanas plānu vienam
pieprasījumam. Tai ir visaugstākā prioritāte — tā ir svarīgāka par maršrutēšanas kombinācijas ignorēšanu, aktīvo profilu,
automātisko aktivizēšanu un paneļa noklusējuma iestatījumu. Nezināmas vērtības tiek ignorētas (pieprasījums nekad netiek noraidīts), un
globālais galvenais slēdzis joprojām kontrolē visu: ja saspiešana ir globāli izslēgta, galvene to nevar
ieslēgt. Vērtības:

| Vērtība       | Ietekme                                                                                                          |
| ------------- | ---------------------------------------------------------------------------------------------------------------- |
| `off`         | Šim pieprasījumam saspiešana netiek izmantota.                                                                   |
| `default`     | Paneļa atvasinātais Default profils (aktīvais profils tiek ignorēts). Dzinēji ar zudumiem paliek izslēgti.       |
| `safe`        | Tas pats, kas galvenes nenorādīšana.                                                                             |
| `allow-lossy` | Saglabā šī pieprasījuma operatora plānu, tostarp kopsavilkumus, atbilstības filtrus un stila pārrakstīšanu.      |
| `engine:<id>` | Viens iespējots dzinējs, piemēram, `engine:rtk`. Šī ir pieprasījuma līmeņa izvēles iespēja konkrētajam dzinējam. |
| `<combo>`     | Nosaukta kombinācija, kas vispirms tiek meklēta pēc nosaukuma (neatkarīgi no reģistra), pēc tam pēc ID.          |

Ja nav norādīts `allow-lossy`, `engine:<id>` vai nosaukta kombinācija, dzinēji ar zudumiem netiek lietoti. Ja
Default, automātiskās aktivizēšanas vai maršrutēšanas ignorēšanas iestatījums ar zudumiem tiek pazemināts,
OmniRoute saglabā atpazītos bezzudumu soļus no konfigurētā kombinētā konveijera konfigurācijas konfigurētajā secībā.
Tas izmanto `session-dedup → lite` tikai tad, ja neviens konfigurētais bezzudumu solis nepaliek.

Iestatījumu paneļa priekšskatījumā **Effective pipeline** tiek rādīts parastais plāns miera stāvoklī. Ja
var tikt izpildīta automātiskā aktivizēšana, tajā pašā priekšskatījumā tiek rādīts arī nosacītais efektīvais konveijers,
lai paneļa un izpildlaika izšķiršana bez galvenes paliktu saskaņota.

Piemērotais plāns tiek atgriezts `X-OmniRoute-Compression: <mode>; source=<source>` atbildes
galvenē, kur `<source>` ir viena no vērtībām `request-header`, `routing-override`, `active-profile`,
`auto-trigger`, `default` vai `off`.

### API

```bash
# Iegūt saspiešanas iestatījumus
curl http://localhost:20128/api/settings/compression

# Atjaunināt saspiešanas iestatījumus
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Priekšskatīt konkrētu RTK/stacked lietderīgo slodzi
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Uzskaitīt RTK filtru pakotnes
curl http://localhost:20128/api/context/rtk/filters

# Tieši testēt RTK ar neobligātiem komandas metadatiem
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Kas tiek aizsargāts

Saspiešanas dzinis **vienmēr saglabā:**

- ✅ Koda blokus (norobežotus un iekļautus tekstā)
- ✅ URL un failu ceļus
- ✅ JSON struktūras un strukturētus datus
- ✅ Identifikatorus un aizsargātus tehniskos marķierus
- ✅ Matemātiskās izteiksmes
- ✅ Rīku/funkciju izsaukumu definīcijas
- ✅ Sistēmas uzvednes (lite režīmā)

RTK neapstrādātās izvades atkopšana pirms jebkādas saglabāšanas aizklāj izplatītas API atslēgas, nesējtalonus, Slack talonus, AWS piekļuves atslēgas, paroles, talonus un noslēpumus.

---

## Saspiešanas statistika

Katram saspiestajam pieprasījumam servera žurnālos tiek iekļauta statistika:

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

## Posmu ceļvedis

| Posms    | Režīmi                                                                                                                                                                        | Statuss     |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| 1. posms | Off, Lite                                                                                                                                                                     | ✅ Izlaists |
| 2. posms | Standard, Aggressive, Ultra                                                                                                                                                   | ✅ Izlaists |
| 3. posms | RTK, Stacked, saspiešanas kombinācijas                                                                                                                                        | ✅ Izlaists |
| 4. posms | Izvades stili, SLM līmeņa Ultra, izvērtēšanas ietvars                                                                                                                         | ✅ Izlaists |
| 4C posms | Adaptīvs konteksta budžets („regulators”) — aprēķinu dzinis + API (`contextBudget` parametrā `PUT /api/settings/compression`) + informācijas paneļa režīma/politikas vadīklas | ✅ Izlaists |

---

## Pateicības

Standard režīma saspiešanas noteikumus iedvesmojis **[Caveman](https://github.com/JuliusBrussee/caveman)**, ko izveidojis **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — plašu popularitāti guvušais projekts „kāpēc izmantot daudz talonu, ja pietiek ar dažiem”. Caveman ziņo par `~75%` mazāku izvades talonu skaitu, vidēji `65%` izvades ietaupījumu etalontestos, `22-87%` izvades diapazonu un `~46%` ievades saspiešanas rīku.

RTK režīmu iedvesmojis **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)**, ko izveidojis **[RTK AI](https://github.com/rtk-ai)** — augstas veiktspējas komandu izvades saspiešanas projekts termināļa, būvēšanas, testēšanas, git un rīku izvades filtrēšanai. RTK ziņo par `60-90%` ietaupījumu, un tā README sesijas piemērā parādīts `~80%` ietaupījums.

---

## Uzlabotas saspiešanas sistēmas

Papildus iepriekš aprakstītajiem 7 režīmiem (avots pieņem arī `codex-responses` un `omniglyph` režīmus, uz kuriem šī rokasgrāmata neattiecas), tālāk esošajās sadaļās ir apskatītas funkcijas, kas darbojas šajos režīmos vai tiem līdzās: Rīka rezultātu saspiešana un Progresīvā novecošana ir agresīvā dzinēja 1. un 2. darbība (agresīvais režīms un `aggressive` solis ir stacked konveijera). Kešatmiņas saspiešana samazina `aggressive` un `ultra` uz `standard` kešatmiņas nodrošinātājiem, kamēr saspiešana ir ieslēgta, un Caveman izvades režīms un izvades stili ir izvēles sistēmas uzvednes instrukcijas, kas pēc noklusējuma ir izslēgtas un kas veido modeļa izvadi, nevis saspiež pieprasījumu.

### Kešatmiņas saspiešana

Daži pakalpojumu sniedzēji (piemēram, Anthropic ar ātru kešatmiņu) atbalsta** ātra kešatmiņa** , kas ļauj kešatmiņā saglabāt uzvednes daļas, lai samazinātu izmaksas un latentumu. Ja ir iespējota kešatmiņa, faktiski var tikt veikta agresīva saspiešana** ievainots** veiktspēju, jo tas maina kešatmiņas marķierus, padarot kešatmiņu nederīgu.

`cachingAware.ts` modulis to atrisina ar** kešatmiņas konteksta noteikšana** un** saspiešanas stratēģijas pielāgošana** attiecīgi.

#### Kā tas darbojas

1. **Noteikt kešatmiņas kontekstu** — Skenē pieprasījuma pamattekstu `cache_control` marķieriem
2. **Identificējiet kešatmiņas nodrošinātājus** — Pārbauda, vai mērķa nodrošinātājs atbalsta kešatmiņu
3. **Pielāgojiet stratēģiju** — samazina `aggressive`/`ultra` uz `standard` kešatmiņas nodrošinātājiem
4. **Izlaist sistēmas uzvedni** — Sistēmas uzvednes parasti tiek saglabātas kešatmiņā, tāpēc nesaspiediet tās

Stratēģijas palīgs arī atgriež `deterministicOnly` karogu, bet plāna veidotājs patērē tikai stratēģiju — šodien nekas lejup pa straumi nelasa karogu.

#### Koda piemērs

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

#### Kad lietot

Kešatmiņas saspiešana ir** vienmēr ieslēgts** — nav nepieciešama konfigurācija. Tas tiek aktivizēts ikreiz, kad ir ieslēgta saspiešana, un mērķa nodrošinātājs atbalsta tūlītēju kešatmiņu (Anthropic, OpenAI utt.); skaidri `cache_control` marķieri nav nepieciešami. — tikai kešatmiņas nodrošinātājs aktivizē pazemināšanu, un tikai marķieri to nekad nedara (marķieru noteikšana nodrošina kešatmiņas telemetrijas plūsmu, nevis stratēģijas lēmumu).

OpenRouter tiek uzskatīts par kešatmiņas nodrošinātāju tikai `anthropic/*` modeļiem: Claude koda pieprasījumos tiek saglabāti `cache_control` pārtraukuma punkti (ne vairāk kā 4), un aizsargs aizsargā prefiksu, savukārt katra pārējā OpenRouter saime (`openai/`, `google/`, `qwen/`, …) paliek noņemta un neapsargāta.

### Progresīvā novecošana

Garās sarunās uzkrājas daudzi ziņojumu pagriezieni, bet vecāki pagriezieni kļūst mazāk aktuāli. `progressiveAging.ts` modulis** degradē ziņojumus pēc pagrieziena attāluma** (attālums mērīts no sarunas beigām). Ar piegādātajiem noklusējuma iestatījumiem (`verbatim: 2, light: 2, moderate: 3`):

- **Pēdējie 2 pagriezieni (attālums ≤ 2)** : Saglabāts burtiski
- **3. attālums** : alu cilvēka saspiešana (pildvielas noņemšana)
- **Attālums 4 +** : apkopoti palīga ziņojumi; lietotāju ziņojumi ir samazināti līdz pirmajai rindiņai, nepārsniedzot 120 rakstzīmes; citas lomas neskartas. Sistēmas uzvednes, jau novecojuši ziņojumi un jaunākie lietotāja ziņojumi vienmēr tiek saglabāti burtiski neatkarīgi no attāluma. Nekas netiek uzreiz pamests, un `light` josla nav sasniedzama ar piegādātajiem noklusējuma iestatījumiem (`light` ir vienāds `verbatim`).

#### Koda piemērs

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

#### Kad lietot

Progresējoša novecošana ir** vienmēr ieslēgts** `aggressive` režīmam — tas ir `compressAggressive()` 2. darbība. Ultra režīms to nedarbina. Tas ir īpaši efektīvs:

- Ilgstošas kodēšanas sesijas
- Vairāku dienu sarunas
- Aģentu darbplūsmas ar daudziem rīku izsaukumiem

### Caveman izvades režīms

Tiek pievienots alu cilvēka izvades režīms** sistēmas uzvednes instrukcijas** kas prasa pašam modelim īsu izvadi — `lite` līmenis prasa īsas atbildes, kurās ir pilni teikumi, `full` prasa "atbildēt īsi kā viedais alu cilvēks", un `ultra` prasa telegrāfa izvadi; instrukcijas tikai prasa, viņi to nevar garantēt. Pieprasījumi tos saņem, izmantojot `applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`): `open-sse/handlers/chatCore.ts` vispirms atrisina atlasi ar back-compat starpliku (`resolveOutputStyleSelection()` in `open-sse/services/compression/outputStyles/backCompat.ts`), kas, lai gan `outputStyles` ir tukšs, iezīmē iespējotu `cavemanOutputMode` ar `terse-prose` izvades stilu pie `cavemanOutputMode.intensity` (skatiet tālāk sadaļu Back-compat); `outputStyles` atlase, kas nav tukša, tiek izmantota tāda, kāda tā ir, un `cavemanOutputMode.enabled` un `intensity` tad nav nekādas ietekmes, kamēr tās `autoClarity` pārslēgs joprojām ir spēkā. `outputMode.ts` satur instrukciju tekstus (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), satura apiešanu un izvietošanas palīgu, ko izmanto injekcija; savam `applyCavemanOutputMode()` inžektoram nav ražošanas zvanītāja.

#### Kā tas darbojas

Šis režīms nesaspiež ievadi. Sistēmas uzvednei tiek pievienots instrukciju bloks (skatiet tālāk sadaļu Kā injekcija darbojas), un jebkurš pieprasījumam atlasītais ievades saspiešanas režīms joprojām darbojas pēc tam korpusā, kurā tagad ir šis bloks. Pirms kopīgu robežu klauzulas, ar kuru katrs līmenis beidzas, angļu valodas `full` līmenis skan:

> "Atbildiet īsi kā viedais alu cilvēks. Nometiet rakstus (a/an/the), pildījumu (just/really/basically/actually/simply), patīkamus priekšmetus, riska ierobežošanu. Fragmenti OK. Īsi sinonīmi (lieli, nevis plaši, labojiet, neieviesiet). Saglabājiet precīzu visu tehnisko saturu, kodu, kļūdas, URLs, identifikatorus."

Tas īpaši labi darbojas:

- Koda ģenerēšana (terser izvade = mazāk marķieru)
- Ātri jautājumi un atbildes (nav nepieciešami izvērsti paskaidrojumi)
- Pakešu apstrāde (maksimizēta caurlaidspēja)

#### Kad lietot

Caveman izvades režīms ir** pieteikšanās** . Kad saspiešana ir ieslēgta (`enabled: true`, galvenais pārslēgs kompresijas iestatījumu lapā), ieslēdziet to ar `cavemanOutputMode.enabled`; `intensity` izvēlas `lite`, `full` vai `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Kompresijas kombinācija** Izvades režīms** pārslēgt (`outputMode`, līmenis `outputModeIntensity`) iestata to pašu slēdzi pieprasījumiem, uz kuriem attiecas kombinācija, un `omniroute_set_compression_engine` MCP rīks to ieraksta, izmantojot Būla `outputMode` argumentu. Netukšai `outputStyles` atlasei ir prioritāte pār šo slēdzi. Informācijas panelī iespējojot** Īsā proza** izvades stils ievada to pašu bloku (skatiet tālāk izvades stilus).

### Izvades stili (katalogs)

Iepriekš redzamais Caveman izvades režīms ir** mantotais viena stila ceļš** . 4. fāze to vispārināja saliekamo izvades stilu katalogā: `OUTPUT_STYLE_CATALOG` in `open-sse/services/compression/outputStyles/catalog.ts`. Katrs stils ir sistēmas uzvedne, kas prasa pašam modelim lētāku izvadi; stilus var iespējot kopā, un tie tiek ievadīti kataloga secībā.

| Stils                                   | `id`            | Ko tas dara                                                                                                                                                                                                                                                                  | Mācību valodas                                |
| --------------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Īsā proza                               | `terse-prose`   | Nometiet filler/articles/hedging; ievērot precīzu tehnisko vielu. Tas pats teksts kā mantotajā alu cilvēka izvades režīmā (norādīts, nav atkārtoti ievadīts).                                                                                                                | lv, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Mazāk kodu                              | `less-code`     | YAGNI kāpnes: mazākās darba izmaiņas, nav nepieprasītu abstrakciju.                                                                                                                                                                                                          | lv, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Zirgaste (slinks vecākais izstrādātājs) | `ponytail`      | "Labākais kods ir kods, kas nekad nav rakstīts": atkārtoti izmantojiet > pārrakstīšanu, galvenais iemesls > simptoms, īsākā darba atšķirība.                                                                                                                                 | lv, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Man ir ADHD (vispirms darbība)          | `i-have-adhd`   | Vispirms darbība (command/path/snippet pirms prozas), numurēti ierobežoti soļi, ONE konkrēts nākamais solis, bez preamble/recap/closers. Pielāgots no [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT).                                                     | lv, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Pretslīdes UI filtrs                    | `antislop-ui`   | Katrai vizuālajai tehnikai ir jāiztur mērķa pārbaude (hierarhija, identitāte, lasāmība); nav noklusējuma gradients/glass/glow, ierobežotas paletes, nav veidņu izkārtojumu. Abiem pretslīdes stiliem tiek pievienota robeža bez atslābuma kontroles/no-fabricated-pretended. | lv, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop kopija un cilvēka filtrs       | `antislop-copy` | Konkrēta kopija (bez em domuzīmes, vispārīgs CTAs, modes vārdi, tērzēšanas robotu aizvērēji, izdomāti fakti), kā arī cilvēku noteikumi: WCAG AA kontrasts, redzamais fokuss, tastatūras sasniedzamība, empty/loading/error stāvokļi, mobilā plūsma.                          | lv, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Terse CJK (文言)                        | `terse-cjk`     | `full`/`ultra` atbilde klasiskajā ķīniešu valodā (文言); `lite` prasa tikai īsas atbildes bez funkcijas vārdiem, patīkamiem vārdiem vai izrotājumiem.                                                                                                                        | zh (ar lokalizāciju, skatiet tālāk)           |

Katrs stils nodrošina trīs intensitātes līmeņus — `lite`, `full`, `ultra` —, un katrs līmenis beidzas ar koplietojamo robežu klauzulu (`SHARED_BOUNDARIES` in `outputMode.ts`), kas precīzi saglabā kodu blokus, failu ceļus, komandas, kļūdas un URLs. `terse-prose` un `terse-cjk` līmeņa teksti pievieno šim sarakstam identifikatorus.

`terse-cjk` ir lokalizēts ar `zh` divās vietās. Lapā Saspiešanas iestatījumi ir norādīta rinda tikai tad, ja informācijas paneļa UI valoda ir ķīniešu (`zh-CN` vai `zh-TW`), un `applyOutputStyles()` to ievada tikai tad, ja pieprasījuma atrisinātā valoda (skatiet tālāk sadaļu Valodas atlase) ir `zh`. Paslēpjot rindu, saglabātā `terse-cjk` atlase netiek notīrīta: iestatījumi API pieņem jebkuru stila ID, un, saglabājot citus stilus lapā, tas tiek saglabāts. Pēc pieprasījuma `applyOutputStyles()` valodas pārbaude ir vienīgā lokalizācijas vārti.

#### Kā darbojas injekcija

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) atrisina atlasi pēc kataloga (nezināmi ID un lokāli neatbilstoši stili tiek atmesti, nekad nav kļūda; atlase, kas atrisina bez stila, atstāj pamattekstu nemainītu, izlaiž kā `no_styles`), savieno atlasītās instrukcijas kataloga secībā, pievieno robežu klauzulu.** vienreiz** (kā arī drošības klauzula, `SAFETY_BOUNDARIES` vai tā tulkojums, ja ir atlasīts `less-code` vai `ponytail` ), un sāk bloku ar vienu idempotences marķieri (`[OmniRoute Output Styles]`), tāpēc atkārtota pieteikšanās ir no-op. Ja atrisinātajai valodai (skatiet tālāk norādīto valodu atlasi) ir tulkojums, angļu valodas vietā tiek ievadīta lokalizēta instrukcija.

Pamattekstam ar `messages` masīvu, kas nav tukšs, idempotences pārbaude tiek izpildīta pirms satura apiešanas: kad `[OmniRoute Output Styles]` marķieris jau atrodas augstākā līmeņa `system` laukā (virkne vai satura bloka masīvs) vai sistēmas ziņojumā ar virknes saturu, pamatteksts tiek atstāts nemainīgs kā `already_applied` un atslēgvārdu pārbaude netiek izpildīta. Pretējā gadījumā satura apiešana (`shouldBypassCavemanOutputMode()` in `open-sse/services/compression/outputMode.ts`) pārbauda pēdējo trīs ziņojumu tekstu neatkarīgi no to lomas un izlaiž stilus visam gājienam `before` ja teksts atbilst tā drošības, neatgriezeniskas darbības vai precizēšanas atslēgvārdiem vai secības jutīgai secībai: `first`, `then`, `after that`, `rollback`, kam seko rakstzīme 2 vai `backup` `delete`, `drop`, `migrate`, `deploy` vai `release`. Apvedceļš darbojas, kamēr** Automātiskā skaidrības apiešana** pārslēgt (`cavemanOutputMode.autoClarity`, ieslēgts pēc noklusējuma) ir ieslēgts; izslēdzot slēdzi, tiek izlaista atslēgvārdu pārbaude.

Kad apvedceļš ļauj apgriezties, `placeSystemInstruction()` (tas pats fails), kas nekad nerada jaunu `messages[0]`, ievieto bloku pirmajā no tiem, ko tas atrod:

1. Vadošais sistēmas ziņojums ar virknes saturu: bloks tiek pievienots aiz tā teksta.
2. Augšējā līmeņa `system` lauks: bloks tiek pievienots pēc virknes teksta vai pievienots satura bloka masīvam kā jauns teksta bloks.
3. Pirmais vēlākais sistēmas ziņojums ar virknes saturu: bloks tiek pievienots aiz tā teksta.
4. Nekas no iepriekš minētā: bloks tiek ievadīts jaunā sistēmas ziņojumā `messages` beigās.

Pamattekstā bez `messages` masīva (vai ar tukšu) satura apvedceļš nedarbojas un netiek izmantots augstākā līmeņa `system` lauks. Bloks tiek pievienots aiz virknes `instructions` lauka teksta, ja vien šajā laukā jau nav ietverts `[OmniRoute Output Styles]` marķieris, un tādā gadījumā pamatteksts tiek atstāts nemainīgs kā `already_applied`. Ja pamattekstā nav virknes `instructions` lauka, bet tajā ir `input` (virkne vai masīvs), bloks kļūst par `instructions`, aizstājot jebkuru šajā laukā esošo vērtību, kas nav virkne. Pamattekstu, kurā nav ne virknes `instructions` lauka, ne virknes vai masīva `input` atstāj nemainīgu un izlaiž kā `no_messages`.

#### Kā iespējot

Informācijas panelī:** Saspiešanas konteksts → Saspiešanas iestatījumi** (`/dashboard/context/settings`), Izvades stilu sadaļa: viena rinda katram stilam ar on/off pārslēgu un līmeņa atlasītāju. Stili tiek ievadīti, kamēr ir ieslēgta pati saspiešana (lapas galvenā pārslēgšana, `enabled`). The** Automātiskā skaidrības apiešana** pārslēgs atrodas uz** Alu cilvēks** lapa (`/dashboard/context/caveman`), tajā** Izvades režīms** karti. Programmatiski saspiešanas konfigurācija saglabā atlasi šādi:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Back-compat: kamēr `outputStyles` ir tukšs, mantotais `cavemanOutputMode.enabled` iestatījums tiek kartēts uz `terse-prose` pie `cavemanOutputMode.intensity`. Pēc tam bloks sākas ar `[OmniRoute Output Styles]` marķieri, kur mantotais `applyCavemanOutputMode()` inžektors ierakstīja `[OmniRoute Caveman Output Mode]`. Zem marķiera teksts atbilst mantotajai injekcijai en, pt-BR, es, de, fr, it, ru, id un vi; ja un zh ir viena papildu atstarpe pirms robežu klauzulas. `terse-prose` tulko pt-BR, es, de, fr, it, ru, zh, ja, id un vi, tāpēc pieprasījums, kura atrisinātā valoda ir `hu` saņem tekstu angļu valodā, kur mantotais inžektors izmantoja savu ungāru valodu.

Output-style language selection (`resolveOutputStyleLanguage()` in `outputStyles/apply.ts`): with `languageConfig.enabled` on, `autoDetect` samples the latest user message in the request's `messages` array that has text (string content, or the `text` of its content parts) and runs the Caveman engine's detector (`detectCompressionLanguage()`) on it. The detector returns `zh` for text with Han characters and no kana; otherwise it returns whichever of `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` and `id` has the most hint matches, and `en` when none match — text it cannot classify gets English, never `defaultLanguage`, and `vi` is never detected although the styles ship `vi` text. A Responses API body keeps its turns in `input`, which is not sampled, so it gets `defaultLanguage`, then English. When no user message in `messages` has text, or with `autoDetect` off, `defaultLanguage` applies, then English. With `languageConfig.enabled` off, the language is English — unless a compression combo applies to the request (a combo assigned to the request's routing combo, or the default compression combo chatCore falls back to for the built-in stacked pipeline): applying a combo turns `languageConfig.enabled` on for that request and sets `defaultLanguage` from the combo's language packs (the saved value if it is one of the combo's packs, otherwise the combo's first pack, which defaults to `en`), while the saved `autoDetect` (on by default) still applies. The Caveman input engine picks its rule-pack language differently — per text part and, with auto-detect off, gated on `enabledPacks`.

Stila × valodas matricu piesprauž `tests/unit/compression/output-styles-i18n-matrix.test.ts`: katram kataloga stilam ir nepieciešams ieraksts testa `BASELINE_LANGUAGES`; stilam, kas nav ierobežots ar lokalizāciju, ir jānosūta pt-BR tulkojums (uz lokalizācijas noteikto `terse-cjk` neattiecas šis noteikums), ja vien tas nav norādīts `KNOWN_ENGLISH_ONLY`, kurā var būt tikai stili bez tulkojuma — un stils neiztur testu, kad tas zaudē valodu, kas norādīta tā `BASELINE_LANGUAGES` ierakstā. Lai pievienotu stilu, skatiet [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Rīka rezultātu saspiešana

`compressToolResult()` `open-sse/services/compression/toolResultCompressor.ts` saspiež rīka rezultāta tekstu ar** 5 stratēģijas** . Tas izmēģina tos šādā secībā, un pirmā iespējotā stratēģija, kuras pārbaude atbilst saturam, nosaka rezultātu:

1. **`fileContent`** : 3 vai vairāku rindu saturs, kurā vismaz viena rindiņa, ignorējot sākuma atkāpi, sākas ar `import `, `export `, `function `, `class `, `const `, `let `, `var ` vai `return ` (atslēgvārds plus atstarpe), vai ar `if`, `for` vai zq2 vai `while`, kam seko `(` vai ` (`. pēdējās 5 rindiņas ar iezīmētu vidusdaļu.
2. **`grepSearch`** : saturs ar vismaz vienu rindiņu formā `<path>:<digits>:`, kur tekstā pirms pirmā kola nav atstarpes, tiek saglabātas tikai tās rindas, ne vairāk kā 30, kam seko visu turpmāko atbilstību skaits un atbilstošo failu saraksts; katra otrā rindiņa tiek atmesta. Ar vienu šādu rindiņu pietiek, lai aktivizētu stratēģiju, tāpēc tiek ņemta vērā arī žurnāla rinda, kas sākas ar laikspiedolu, piemēram, `12:30:45`.
3. **`shellOutput`** : izvade, kas satur ANSI CSI secību (`ESC[` pēc tam cipari vai semikoli, pēc tam burts, kā krāsu kodos) vai `$` kam seko atstarpe jebkurā tekstā, šīs secības tiek zaudētas (tiek saglabātas citas atslēgšanās vietas, piemēram, `ESC[?25l` vai OSC loga virsrakstu secība) un tiek saglabātas pēdējās secīgās 50 secīgās rindas. Tā kā šī pārbaude tiek izpildīta pirms `json` un `errorMessage`, JSON vai kļūdas izvade, kas satur šādu `$` nekad tos nesasniedz, kamēr `shellOutput` ir ieslēgts.
4. **`json`** : JSON lietderīgā slodze, kas pārsniedz 2000 rakstzīmes, kas sākas ar `{` vai `[` (pēc izvēles atstarpes) un parsē, tiek apkopota: masīvs, kurā ir vairāk nekā 7 vienumi, saglabā savus pirmos 5 un pēdējos 2 vienumus un kopējo skaitu, un objekts saglabā savas pirmās 20 atslēgas, katra masīva vērtība tiek aizstāta ar ligzdotu objektu vai masīva vērtību. un `{…N keys}` marķieris `_remaining_<N>_keys` kas skaita atslēgas, kas ir nomestas pāri pirmajām 20. Skalārās vērtības tiek kopētas veselas, tāpēc objekts ar 20 vai mazāk atslēgām bez ligzdotām vērtībām tiek tikai atkārtoti ievilkts. — samazināts viens iegūst rakstzīmes un paliek nemainīgs.
5. **`errorMessage`** : izvade, kas satur `error:`, `error ` (vārds, kam seko atstarpe, tāpat kā `no error found`), `[error]`, `exception:`, `exception `, `[exception]` vai `traceback` saglabā savu pirmo rindiņu, nākamās 10 rindas un pēdējās 3, starp kurām ir `… [N frames elided] …` marķieris. Marķieris parādās tikai tad, ja pirmajai rindai seko vairāk nekā 13 rindiņas, tāpēc kļūdas izvade līdz 14 rindiņām vai mazāk netiek saīsināta (pie 12 vai 13 rindām pēdējās 3 atkārtotās rindas jau ir saglabātas).

Pēc stratēģijas atbilstības, pat tādas, kas neko neglābj, vēlākās stratēģijas netiek izmēģinātas. Ja atbilstības stratēģija nesaglabā aptuvenos marķierus (garums ÷ 4, noapaļots uz augšu) — piemēram, kodam līdzīgs fails ar 25 rindiņām vai mazāk, vai JSON masīvs, kas pārsniedz 2000 rakstzīmes ar 7 vai mazāk vienumiem — agresīvā programma saglabā sākotnējo rīka rezultātu: gan zvanītāji `compressAggressive()` gan `compressAnthropicToolResultBlock()`, kad `saved` zemāk, bet pats `compressToolResult()` joprojām atgriež šīs stratēģijas rezultātu. Rīka-rezultāta darbība nav pēdējais vārds: dzinēja atkāpšanās apkopotājs joprojām var saīsināt `tool` vai `function` ziņojumu, kas ir garāks par 8192 rakstzīmēm (`maxTokensPerMessage`, 2048, 4 reizes).

#### Kad lietot

Rīka rezultāta saspiešana ir agresīvā dzinēja 1. darbība (`compressAggressive()` in `open-sse/services/compression/aggressive.ts`), tāpēc tā darbojas Agresīvā režīmā un `aggressive` solī stacked konveijerā. Tas saspiež OpenAI formas `tool` un `function` ziņojumus un tekstu Anthropic `tool_result` blokos. Katrai stratēģijai zem `aggressive.toolStrategies` ir savs slēdzis, kas pēc noklusējuma ir ieslēgts. Informācijas panelī slēdži atrodas Caveman lapā** Papildu** skats, kamēr ir ieslēgta saspiešana un noklusējuma režīms ir Agresīvs.

### Stacked Pipeline

Darbojas stacked režīms** vairākus dzinējus pēc kārtas** — parasti RTK vispirms (60–90% ietaupījums no instrumenta izvades), pēc tam Caveman uz atlikušo tekstu (~ 46% ievades ietaupījums). Sastāvā, tas ir** 78–95% piemērotais diapazons** (skatiet iepriekš sadaļu Upstream Savings Math): `1 - (1 - 0.60..0.90) × (1 - 0.46)` vidējie ≈ 89%.

#### Kā tas darbojas

```
Input (1000 tokens)
  → RTK (command-aware filter) → 200 tokens
    → Caveman (filler removal) → 108 tokens
  → Output (108 tokens, ~89% savings)
```

#### Kad lietot

Izmantojiet salikto režīmu:

- Darbplūsmas, kas prasa daudz rīku (aģentiskā kodēšana, izpēte)
- Izmaksu ziņā jutīga pakešu apstrāde
- Kad jums ir nepieciešams maksimālais marķiera ietaupījums

Salikti cauruļvadi tiek konfigurēti, izmantojot globālo `stackedPipeline` saspiešanas iestatījumu vai nosauktu saspiešanas kombināciju, kas piešķirta maršrutēšanas kombinācijai (skatiet iepriekš sadaļu Per-Combo Override) `stacked` nevis izmantojot automātisko kombināciju `modePack` (šajā laukā tiek atkārtoti izsvērta automātiskās kombinācijas modeļa atlase, un — nav derīgs pakotnes nosaukums).

---

## Kompresijas kombināciju pārrakstīšana

Varat pārrakstīt globālo kompresijas režīmu **katrai kombinācijai atsevišķi**, lai precīzi pielāgotu darbību
dažādiem lietošanas gadījumiem:

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

Tas ir noderīgi šādos gadījumos:

- **Programmēšanas kombinācijas**: izmantojiet režīmu `aggressive` ilgām sesijām
- **Ātro jautājumu un atbilžu kombinācijas**: izmantojiet režīmu `lite` ātrām atbildēm
- **Kombinācijas ar intensīvu rīku izmantošanu**: izmantojiet režīmu `stacked` maksimālam ietaupījumam
- **Produkcijas kombinācijas**: kešatmiņas nodrošinātājiem atstājiet pārrakstīšanu izslēgtu — vienmēr aktīvā,
  kešatmiņu ņemošā vērā pielāgošana automātiski pazemina `aggressive`/`ultra` uz `standard`
  (nav pieejama atlasāma `cache-aware` režīma)

---

## Skatiet arī

- [Vides konfigurācija](../reference/ENVIRONMENT.md) — kompresijas vides mainīgie
- [Arhitektūras rokasgrāmata](../architecture/ARCHITECTURE.md) — kompresijas konveijera iekšējā darbība
- [Lietotāja rokasgrāmata](../guides/USER_GUIDE.md) — darba sākšana ar kompresiju
- [RTK kompresija](./RTK_COMPRESSION.md) — RTK filtri, uzticamības modelis, verifikācijas vārteja, neapstrādātās izvades atkopšana
- [Kompresijas dzinēji](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, API, MCP, informācijas panelis
- [Kompresijas kārtulu formāts](./COMPRESSION_RULES_FORMAT.md) — JSON kārtulu pakotnes formāts
- [Kompresijas valodu pakotnes](./COMPRESSION_LANGUAGE_PACKS.md) — valodai specifiskas Caveman kārtulas
