# 🗜️ Prompt Compression Guide — OmniRoute (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Automatski uštedite 15–95% na prihvatljivom kontekstu. Za brzi pregled pogledajte [odjeljak README-ja o kompresiji](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Pregled

OmniRoute implementira modularni kanal za kompresiju upita koji se **proaktivno** pokreće prije nego što zahtjevi stignu do nadređenih pružatelja usluga. To znači da se ušteda tokena ostvaruje transparentno — nisu potrebne nikakve promjene u vašem tijeku rada.

```
Zahtjev klijenta
  → Selektor strategije kompresije
    → Postoji li nadjačavanje kombinacijom? → Upotrijebi postavku kombinacije
    → Prag automatskog pokretanja? → Upotrijebi automatski način
    → Zadani način? → Upotrijebi globalnu postavku
    → Isključeno? → Preskoči kompresiju
  → Odabrani način kompresije
    → Isključeno: Bez kompresije
    → Lite: Sigurno čišćenje razmaka/formatiranja (~15%)
    → Standard: Uklanjanje suvišnih riječi u „špiljskom” stilu (~30%)
    → Aggressive: Starenje povijesti + sažimanje (~50%)
    → Ultra: Heurističko obrezivanje + stanjivanje blokova koda (~75%)
    → RTK: Filtriranje izlaza terminala/alata svjesno naredbi (raspon od 60–90% prema nadređenom sustavu)
    → Stacked: Uređeni kanal s više mehanizama, obično RTK pa Caveman (raspon od 78–95% prihvatljivog sadržaja)
  → Komprimirani zahtjev → Pružatelj
```

---

## Načini kompresije

### Isključeno

Kompresija nije primijenjena. Sve poruke prolaze nepromijenjene.

### Lite način (~15% uštede, <1ms latencije)

Najsigurniji način — nikakve semantičke promjene, samo čišćenje formatiranja:

| Tehnika                  | Opis                                                   |
| ------------------------ | ------------------------------------------------------ |
| `collapseWhitespace`     | Spaja uzastopne prazne retke i razmake na kraju redaka |
| `dedupSystemPrompt`      | Uklanja duple sistemske poruke                         |
| `compressToolResults`    | Komprimira opširne izlaze alata/funkcija               |
| `removeRedundantContent` | Uklanja ponovljene upute                               |
| `replaceImageUrls`       | Skraćuje base64 data URI-je slika                      |

**Najbolje za:** stalno uključenu upotrebu, sigurnosno kritične radne tokove.

### Standardni način (~30% uštede)

Nadahnut projektom [Caveman](https://github.com/JuliusBrussee/caveman) — uklanja popunjavajuće riječi i opširne formulacije uz očuvanje značenja:

- Uklanja popunjavajuće riječi ("please", "I think", "basically", "actually")
- Sažima opširne fraze ("in order to" → "to", "as a result of" → "because")
- Uklanja uljudna ustezanja ("Would you mind...", "If you could possibly...")
- 30+ regex pravila prilagođenih promptovima za kodiranje

**Najbolje za:** svakodnevne radne tokove kodiranja, timove koji paze na troškove.

### Agresivni način (~50% uštede)

Pametno upravljanje poviješću za duge sesije:

- **Starenje poruka** — starije poruke se progresivno komprimiraju
- **Kompresija rezultata alata** — dugi izlazi alata skraćuju se ili izostavljaju (prvi/zadnji
  retci, filtriranje redaka s podudarnošću, zbijanje JSON ključeva)
- **Zaštite strukturnog integriteta** — osiguravaju da parovi `tool_use` + `tool_result` ostanu konzistentni
- **Svjesnost kontekstnog prozora** — poštuje ograničenja tokena po modelu

**Najbolje za:** produžene sesije otklanjanja grešaka, velike baze koda.

### Ultra način (~75% uštede)

Maksimalna kompresija za scenarije kritične po broju tokena:

- **Heurističko rezanje** — rezanje tokena proze na temelju bodovanja
- **Očuvanje strukture** — ograđeni blokovi koda, inline kod, URL-ovi i identifikatori
  označavaju se privremenim markerima i ponovno sastavljaju doslovno, nikad se ne režu
- **Opcionalni SLM sloj** — mali lokalni model može profiniti rezanje kada je konfiguriran
- Neovisan o agresivnom načinu: ne pokreće starenje poruka, kompresiju rezultata alata
  niti rezervni sažimator (samo neuspjeh SLM sloja može usmjeriti rezervni prolaz kroz
  agresivni način)

**Najbolje za:** kada višekratno udarete u ograničenja konteksta.

### RTK način (izvorni raspon 60-90%)

RTK način optimiziran je za opširne izlaze alata koji se pojavljuju u sesijama agenata za kodiranje:

- Detektira klase naredbi/izlaza poput `git status`, `git diff`, `git log`, test runnera,
  TypeScript/Vite/Webpack buildova, ESLint/Biome/Prettier, npm audit/instalacija, Docker logova,
  infrastrukturnog izlaza i generičkog shell izlaza
- Primjenjuje JSON pakete filtera iz `open-sse/services/compression/engines/rtk/filters/`
- Uvozi filtere RTK TOML sheme v1 iz projektnih ili globalnih `filters.toml` datoteka, s
  validacijom ugrađenih testova i kontrolom pouzdanosti za projektne datoteke
- Isporučuje se sa 56 ugrađenih filtera s ugrađenim primjerima za provjeru
- Uklanja ANSI kontrolne sekvence, trake napretka, ponovljene retke i šum koji ne zahtijeva akciju
- Čuva neuspjehe, greške, upozorenja, promijenjene datoteke, sažetke i kraj dugih izlaza
- Podržava projektne filtere s kontrolom pouzdanosti, globalne filtere i opcionalni oporavak
  sirovog izlaza uz uklanjanje osjetljivih podataka

**Najbolje za:** sesije agenata s transkriptima shella, buildova, testova, gita, grepa i izlaza datoteka.

### Složeni način (primjenjivi raspon 78-95%)

Složeni način pokreće više kompresijskih mehanizama determinističkim redoslijedom. Zadani cjevovod je:

```txt
RTK -> Caveman
```

Taj redoslijed prvo održava kompaktnim izlaz terminala/alata, a zatim primjenjuje Cavemanovu
semantičku kondenzaciju na preostali prompt na prirodnom jeziku. Složeni cjevovodi mogu se
konfigurirati globalno ili putem kombinacija kompresije dodijeljenih kombinacijama usmjeravanja.

**Najbolje za:** miješani kontekst s velikim zapisima alata uz ljudske upute ili sažetke asistenta.

---

## Izračun uštede uz upstream projekte

OmniRoute dokumentira uštede ostvarene kompresijom iz dvaju izvora: referentnih mjerenja upstream projekata i
vlastite kombinacije mehanizama sustava OmniRoute.

| Izvor   | Broj iz upstream README datoteke koji se ovdje koristi                                                                                     |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Caveman | `~75%` manje izlaznih tokena, `65%` prosječne uštede izlaza u referentnim mjerenjima, raspon `22-87%` i alat za kompresiju ulaza od `~46%` |
| RTK     | `60-90%` uštede na izlazu naredbi; ogledna sesija od `~118,000 -> ~23,900` tokena, odnosno ušteda od `79.7%` (`~80%`)                      |

Za preklapajuće podatke alata/konteksta zadana kombinacija sustava OmniRoute slaže mehanizme ovim redoslijedom:

```txt
RTK -> Caveman
```

Kombinirane uštede su multiplikativne, a ne aditivne:

```txt
kombinirano = 1 - (1 - RTK ušteda) * (1 - Caveman ušteda ulaza)
prosjek     = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
raspon      = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Taj broj od `78-95%` primjenjuje se kada i RTK i Caveman mogu smanjiti isti ulazni/kontekstni sadržaj.
Caveman način rada za izlaz odgovora zaseban je: kada je omogućen, koristite Cavemanove vlastite uštede izlaza (`65%`
u prosjeku, istaknuta vrijednost od `~75%`, raspon `22-87%`). Ukupne uštede na naplati ovise o omjeru upita i izlaza.

### Što "prihvatljivo" zapravo znači

Istaknuti raspon od 15-95% stvaran je, ali primjenjuje se samo na **redundantan ili preopširan** sadržaj — ponovljene
retke pogrešaka, zapisnik izgradnje koji neprestano ispisuje isto upozorenje ili prevelik ispis naredbe `grep`/čitanja datoteke. To
**ne** znači da svaki zahtjev ostvaruje toliku uštedu.

Empirijski je potvrđeno (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): izvođenje
načina `stacked` (RTK + Caveman) nad blokom `tool_result` u Anthropicovu formatu koji sadrži 300 identičnih
redaka pogrešaka ostvarilo je **95.93% uštede tokena / 96.26% uštede znakova** — točno unutar oglašenog
raspona. Međutim, isti proces primijenjen na uobičajen, neredundantan izlaz alata (čist popis rezultata naredbe `grep`,
kratko čitanje datoteke, običan razgovorni tekst) ispravno ostvaruje **gotovo nikakvu uštedu** jer
nema ničega što se ponavlja i `validateCompression()` (`validation.ts`) odbija poslati
preoblikovani sadržaj koji bi uklonio ili izmijenio blokove koda, URL-ove, naslove, verzije ili identifikatore konstanti pisane VELIKIM SLOVIMA.

To je očekivano i sigurno ponašanje, a ne pogreška: sesija programiranja koja se uglavnom sastoji od čitanja/pretraživanja čistih datoteka ostvarit će
skromne ukupne uštede čak i kada je kompresija potpuno omogućena, dok će sesija koja naiđe na neuspjelu
petlju ili preopširan linter ostvariti puni raspon od 78-95% za taj promet. Nemojte nizak
ukupni postotak uštede jedne sesije smatrati dokazom da je kompresija pogrešno konfigurirana — najprije provjerite je li
temeljni izlaz alata doista bio redundantan.

---

## Vizualizacija uštede tokena

```
Bez kompresije:       47K tokena poslano LLM-u
Uz Lite:              40K tokena poslano          (15% uštede — sigurno, uvijek uključeno)
Uz Standard:          33K tokena poslano          (30% uštede — pravila caveman-speak)
Uz Aggressive:        24K tokena poslano          (50% uštede — zastarijevanje + sažimanje)
Uz Ultra:             12K tokena poslano          (75% uštede — heurističko uklanjanje)
Uz RTK:               19K-5K tokena poslano       (60-90% uštede na izlazu naredbi/alata)
Uz Stacked:           10K-2.5K tokena poslano     (78-95% prihvatljivog raspona RTK+Caveman)
```

---

## Konfiguracija

### Nadzorna ploča

Idite na `Dashboard → Context & Cache`:

- **Caveman** — odabir načina rada, jezični paketi, pretpregled i globalne zadane postavke
- **RTK** — pretpregled filtra naredbi, sigurnosne postavke RTK-a i katalog filtara
- **Kombinacije kompresije** — imenovani cjevovodi mehanizama dodijeljeni kombinacijama usmjeravanja
- **Prag automatskog aktiviranja** — automatski aktivira kompresiju kada broj tokena premaši prag

### Nadjačavanje po kombinaciji

U odjeljku `Dashboard → Context & Cache → Compression Combos` dodijelite kombinaciju kompresije kombinaciji
usmjeravanja:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

To vam omogućuje upotrebu složene kompresije kod besplatnih pružatelja i pružatelja za programiranje, uz zadržavanje laganog načina rada na plaćenim
pretplatama.

Ova dodjela „Nadjačavanje po kombinaciji” zasebna je kontrola od nadjačavanja **načina kompresije kombinacije
usmjeravanja** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — shema tog polja
također prihvaća `rtk`, `stacked` i `omniglyph`) — to nadjačavanje ne odabire imenovani
cjevovod kombinacije kompresije; ono samo postavlja polje `compressionMode` koje provjerava
`resolveCompressionPlan`. Može se postaviti na kartici kombinacije (`Dashboard → Combos`) ili, od izdanja
#6760, za pojedinu kombinaciju usmjeravanja na popisu „Assign to routing” u odjeljku
`Dashboard → Context & Cache → Compression Combos`, odmah pokraj potvrdnog okvira za dodjelu cjevovoda
opisanog iznad. Oba sučelja spremaju promjene putem iste krajnje točke `PUT /api/combos/{id}`.

### Nadjačavanje po zahtjevu

Pošaljite zaglavlje zahtjeva `x-omniroute-compression` kako biste nadjačali plan kompresije za pojedinačni
zahtjev. Ono ima najviši prioritet — nadjačava postavku kombinacije usmjeravanja, aktivni profil,
automatsko aktiviranje i zadanu postavku ploče. Nepoznate se vrijednosti zanemaruju (zahtjev se nikada ne odbija), a
globalni glavni prekidač i dalje upravlja svime: kada je kompresija globalno isključena, zaglavlje je ne može
uključiti. Vrijednosti:

| Vrijednost    | Učinak                                                                                                                      |
| ------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `off`         | Nema kompresije za ovaj zahtjev.                                                                                            |
| `default`     | Zadani profil izveden iz postavki ploče (zanemaruje aktivni profil). Mehanizmi s gubitkom ostaju isključeni.                |
| `safe`        | Jednako kao izostavljanje zaglavlja: samo deduplikacija i sažimanje razmaka.                                                |
| `allow-lossy` | Zadržava operaterov plan za ovaj zahtjev, uključujući sažetke, filtre relevantnosti i preoblikovanje stila.                 |
| `engine:<id>` | Pojedinačni mehanizam kada je omogućen, npr. `engine:rtk`. Time se taj mehanizam uključuje za pojedinačni zahtjev.          |
| `<combo>`     | Imenovana kombinacija, koja se najprije podudara prema nazivu (bez razlikovanja velikih i malih slova), a zatim prema ID-u. |

Bez `allow-lossy`, `engine:<id>` ili imenovane kombinacije, mehanizmi s gubitkom ne primjenjuju se. Za
zahtjev se i dalje primjenjuju deduplikacija sesije i sažimanje razmaka kada je kompresija uključena.

Primijenjeni plan vraća se u zaglavlju odgovora `X-OmniRoute-Compression: <mode>; source=<source>`,
pri čemu je `<source>` jedna od vrijednosti `request-header`, `routing-override`, `active-profile`,
`auto-trigger`, `default` ili `off`.

### API

```bash
# Dohvati postavke kompresije
curl http://localhost:20128/api/settings/compression

# Ažuriraj postavke kompresije
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Pretpregled određenog RTK/složenog sadržaja
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Prikaži pakete RTK filtara
curl http://localhost:20128/api/context/rtk/filters

# Izravno testiraj RTK s neobaveznim metapodacima naredbe
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Što se štiti

Mehanizam za kompresiju **uvijek čuva:**

- ✅ Blokove koda (ograđene i umetnute)
- ✅ URL-ove i putanje datoteka
- ✅ JSON strukture i strukturirane podatke
- ✅ Identifikatore i zaštićene tehničke tokene
- ✅ Matematičke izraze
- ✅ Definicije poziva alata/funkcija
- ✅ Sistemske upute (u načinu rada Lite)

Oporavak neobrađenog RTK izlaza redigira uobičajene API ključeve, tokene nositelja, Slack tokene, AWS pristupne ključeve,
lozinke, tokene i tajne prije nego što se bilo što trajno pohrani.

---

## Statistika kompresije

Svaki komprimirani zahtjev uključuje statistiku u zapisnicima poslužitelja:

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

## Plan faza

| Faza    | Načini rada                                                                                                                                                                          | Status        |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| Faza 1  | Off, Lite                                                                                                                                                                            | ✅ Isporučeno |
| Faza 2  | Standard, Aggressive, Ultra                                                                                                                                                          | ✅ Isporučeno |
| Faza 3  | RTK, Stacked, kombinacije kompresije                                                                                                                                                 | ✅ Isporučeno |
| Faza 4  | Stilovi izlaza, Ultra razine SLM, okvir za evaluaciju                                                                                                                                | ✅ Isporučeno |
| Faza 4C | Prilagodljivi proračun konteksta („regulator”) — računalni mehanizam + API (`contextBudget` na `PUT /api/settings/compression`) + kontrole načina rada/pravilnika na nadzornoj ploči | ✅ Isporučeno |

---

## Zahvale

Pravila kompresije načina rada Standard nadahnuta su projektom **[Caveman](https://github.com/JuliusBrussee/caveman)** autora **[Juliusa Brusseea](https://github.com/JuliusBrussee)** (⭐ 51K+) — viralnim projektom „zašto koristiti mnogo tokena kada malo tokena obavi posao”. Caveman navodi `~75%` manje izlaznih tokena, prosječnu uštedu izlaza od `65%` na referentnim testovima, raspon uštede izlaza od `22-87%` te alat za kompresiju ulaza od `~46%`.

Način rada RTK nadahnut je projektom **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** organizacije **[RTK AI](https://github.com/rtk-ai)** — visokoučinkovitim projektom za kompresiju izlaza naredbi namijenjenim filtriranju izlaza terminala, izgradnje, testiranja, gita i alata. RTK navodi uštede od `60-90%`, a ogledna sesija iz njegova README-a prikazuje uštedu od `~80%`.

---

## Napredni sustavi kompresije

Osim 7 prethodno opisanih načina rada (izvor također prihvaća načine rada `codex-responses` i
`omniglyph`, koje ovaj vodič ne obuhvaća), odjeljci u nastavku opisuju značajke
koje rade unutar tih načina rada ili uz njih: kompresija rezultata alata i progresivno starenje
koraci su 1 i 2 agresivnog mehanizma (načina rada Aggressive i koraka `aggressive` u
složenom cjevovodu), složeni cjevovod način je na koji radi način rada Stacked, kompresija
prilagođena predmemoriji snižava `aggressive` i `ultra` na `standard` za pružatelje usluga
s predmemoriranjem dok je kompresija uključena, a način Caveman izlaza i stilovi izlaza
neobavezne su upute sistemskog odzivnika, prema zadanim postavkama isključene,
koje oblikuju izlaz modela umjesto komprimiranja zahtjeva.

### Kompresija prilagođena predmemoriji

Neki pružatelji usluga (poput Anthropic uz predmemoriranje odzivnika) podržavaju
**predmemoriranje odzivnika**, što im omogućuje predmemoriranje dijelova odzivnika radi
smanjenja troškova i latencije. Kada je predmemoriranje omogućeno, agresivna kompresija
zapravo može **narušiti** performanse jer mijenja predmemorirane tokene, čime poništava
valjanost predmemorije.

Modul `cachingAware.ts` to rješava **otkrivanjem konteksta predmemoriranja** i
**prilagođavanjem strategije kompresije** u skladu s njim.

#### Kako radi

1. **Otkrivanje konteksta predmemoriranja** — Pretražuje tijelo zahtjeva radi oznaka `cache_control`
2. **Prepoznavanje pružatelja s predmemoriranjem** — Provjerava podržava li ciljni pružatelj predmemoriranje
3. **Prilagodba strategije** — Snižava `aggressive`/`ultra` na `standard` za pružatelje s predmemoriranjem
4. **Preskakanje sistemskog odzivnika** — Sistemski odzivnici obično su predmemorirani, pa ih ne treba komprimirati

Pomoćna funkcija strategije također vraća zastavicu `deterministicOnly`, ali alat za izgradnju plana
upotrebljava samo strategiju — trenutačno nijedan daljnji korak ne čita tu zastavicu.

#### Primjer koda

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Oznaka predmemorije
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Kada upotrebljavati

Kompresija prilagođena predmemoriji **uvijek je uključena** — konfiguracija nije potrebna. Aktivira se kad god
je kompresija uključena i ciljni pružatelj podržava predmemoriranje odzivnika (Anthropic, OpenAI
itd.); izričite oznake `cache_control` nisu potrebne — već sam pružatelj s predmemoriranjem
pokreće snižavanje, a same oznake to nikada ne čine (otkrivanje oznaka služi telemetriji
predmemorije, a ne odlučivanju o strategiji).

### Progresivno starenje

Dugi razgovori nakupljaju mnogo izmjena poruka, ali starije izmjene postaju manje
relevantne. Modul `progressiveAging.ts` **degradira poruke prema udaljenosti izmjene**
(udaljenost se mjeri od kraja razgovora). Uz isporučene zadane postavke
(`verbatim: 2, light: 2, moderate: 3`):

- **Posljednje 2 izmjene (udaljenost ≤ 2)**: Zadržavaju se doslovno
- **Udaljenost 3**: Caveman kompresija (uklanjanje suvišnih riječi)
- **Udaljenost 4+**: Poruke asistenta sažimaju se; korisničke poruke svode se na prvi
  redak, ograničen na 120 znakova; ostale uloge ostaju neizmijenjene. Sistemski odzivnici, već ostarjele
  poruke i najnovija korisnička poruka uvijek se zadržavaju doslovno bez obzira na udaljenost.
  Ništa se ne odbacuje u potpunosti, a raspon `light`
  nedostižan je uz isporučene zadane postavke (`light` je jednak `verbatim`).

#### Primjer koda

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... još 50 izmjena ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // posljednje 3 izmjene: doslovno
  light: 8, // udaljenost <= 8: lagana kompresija
  moderate: 20, // udaljenost <= 20: caveman kompresija
  fullSummary: 5, // zahtijeva je tip, ali je kod za određivanje raspona ne čita
  // udaljenost > 20: sažeto (asistent) / zadržan prvi redak (korisnik)
});

// saved = broj ušteđenih tokena
```

#### Kada upotrebljavati

Progresivno starenje **uvijek je uključeno** za način rada `aggressive` — ono je 2. korak
funkcije `compressAggressive()`. Način rada Ultra ne izvršava ga. Osobito je učinkovito za:

- Dugotrajne sesije programiranja
- Višednevne razgovore
- Agentske tijekove rada s mnogo poziva alata

### Način Caveman izlaza

Način Caveman izlaza dodaje **upute sistemskom odzivniku** kojima se od samog modela traži
sažet izlaz — razina `lite` traži sažete odgovore koji zadržavaju potpune rečenice, `full`
traži da „odgovara sažeto poput pametnog pećinskog čovjeka”, a `ultra` traži telegrafski izlaz;
upute to samo traže, ne mogu to zajamčiti. Zahtjevi ih primaju putem
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`):
`open-sse/handlers/chatCore.ts` najprije određuje odabir pomoću sloja za kompatibilnost unatrag
(`resolveOutputStyleSelection()` u
`open-sse/services/compression/outputStyles/backCompat.ts`), koji, dok je `outputStyles`
prazan, preslikava omogućeni `cavemanOutputMode` na stil izlaza `terse-prose` uz
`cavemanOutputMode.intensity` (pogledajte odjeljak Kompatibilnost unatrag u nastavku); neprazan odabir
`outputStyles` upotrebljava se bez promjena, a `cavemanOutputMode.enabled` i `intensity` tada nemaju
učinka, dok se njegova postavka `autoClarity` i dalje primjenjuje. `outputMode.ts` sadrži
tekstove uputa (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), zaobilaženje sadržaja i
pomoćnu funkciju za smještaj koju umetanje upotrebljava; njegov vlastiti umetač `applyCavemanOutputMode()` nema
pozivatelja u produkciji.

#### Kako radi

Ovaj način ne sažima ulaz. Dodaje blok uputa sistemskom promptu
(pogledajte Kako umetanje funkcionira u nastavku), a svaki način sažimanja ulaza odabran za zahtjev
ipak se izvršava nakon toga, nad tijelom koje sada sadrži taj blok. Prije zajedničke
klauzule o granicama kojom završava svaka razina, engleska razina `full` glasi:

> "Odgovaraj sažeto poput pametnog pećinskog čovjeka. Izostavi članove (a/an/the), poštapalice (just/really/basically/actually/simply), učtivosti i ublažavanje tvrdnji. Fragmenti su u redu. Koristi kratke sinonime (big, ne extensive; fix, ne implement). Zadrži sav tehnički sadržaj, kod, pogreške, URL-ove i identifikatore neizmijenjenima."

Ovo osobito dobro funkcionira za:

- Generiranje koda (sažetiji izlaz = manje tokena)
- Brza pitanja i odgovore (nema potrebe za opširnim objašnjenjima)
- Skupnu obradu (maksimalna propusnost)

#### Kada upotrebljavati

Pećinski način izlaza **nije zadan**. Kada je sažimanje uključeno (`enabled: true`, glavni prekidač
na stranici Compression Settings), uključite ga s `cavemanOutputMode.enabled`; `intensity`
odabire `lite`, `full` ili `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Prekidač **Output Mode** kombinacije sažimanja (`outputMode`, razina u `outputModeIntensity`)
postavlja isti prekidač za zahtjeve na koje se ta kombinacija primjenjuje, a MCP alat
`omniroute_set_compression_engine` zapisuje ga putem svojeg Booleova argumenta `outputMode`.
Odabir `outputStyles` koji nije prazan ima prednost pred tim prekidačem. Na nadzornoj ploči
uključivanje izlaznog stila **Terse prose** umeće isti blok (pogledajte Output Styles
u nastavku).

### Izlazni stilovi (katalog)

Gornji pećinski način izlaza **naslijeđeni je put s jednim stilom**. Faza 4 proširila ga je
u katalog izlaznih stilova koji se mogu kombinirati: `OUTPUT_STYLE_CATALOG` u
`open-sse/services/compression/outputStyles/catalog.ts`. Svaki stil predstavlja uputu sistemskog prompta
koja od samog modela traži jeftiniji izlaz; stilovi se mogu uključiti
zajedno i umeću se redoslijedom iz kataloga.

| Stil                                | `id`            | Što radi                                                                                                                                                                                                                                                               | Jezici uputa                                       |
| ----------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| Sažeta proza                        | `terse-prose`   | Izostavlja poštapalice/članove/ublažavanje tvrdnji; tehnički sadržaj ostaje neizmijenjen. Isti tekst kao u naslijeđenom pećinskom načinu izlaza (referenciran, ne ponovljen).                                                                                          | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi      |
| Manje koda                          | `less-code`     | YAGNI ljestvica: najmanja funkcionalna promjena, bez netraženih apstrakcija.                                                                                                                                                                                           | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi      |
| Konjski rep (lijeni senior dev)     | `ponytail`      | "Najbolji je kod onaj koji nikada nije napisan": ponovna uporaba > ponovno pisanje, temeljni uzrok > simptom, najkraći funkcionalni diff.                                                                                                                              | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi      |
| Imam ADHD (prvo radnja)             | `i-have-adhd`   | Prvo radnja (naredba/putanja/isječak prije proze), numerirani ograničeni koraci, JEDAN konkretan sljedeći korak, bez uvoda/sažetka/završnih napomena. Prilagođeno iz [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT).                                | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi      |
| Antislop UI filtar                  | `antislop-ui`   | Svaka vizualna tehnika mora proći provjeru svrhe (hijerarhija, identitet, čitljivost); bez zadanih gradijenata/stakla/sjaja, ograničena paleta, bez predložaka rasporeda. Oba antislop stila dodaju granicu zabrane neaktivnih kontrola / izmišljenih tvrdnji.         | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi      |
| Antislop filtar teksta i ljudskosti | `antislop-copy` | Konkretan tekst (bez duge crtice, generičkih CTA-ova, pomodnih izraza, chatbot završetaka i izmišljenih činjenica) uz pravila za ljude: WCAG AA kontrast, vidljiv fokus, pristup tipkovnicom, prazna stanja/stanja učitavanja/pogreške, prilagodba mobilnim uređajima. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi      |
| Sažeti CJK (文言)                   | `terse-cjk`     | Odgovor razine `full`/`ultra` na klasičnom kineskom (文言); `lite` traži samo kratke odgovore bez funkcijskih riječi, učtivosti ili ukrasa.                                                                                                                            | zh (ograničeno lokalitetom, pogledajte u nastavku) |

Svaki stil dolazi s trima razinama intenziteta — `lite`, `full`, `ultra` — i svaka razina
završava zajedničkom klauzulom o granicama (`SHARED_BOUNDARIES` u `outputMode.ts`), koja
čuva blokove koda, putanje datoteka, naredbe, pogreške i URL-ove neizmijenjenima. Tekstovi razina
`terse-prose` i `terse-cjk` tom popisu dodaju identifikatore.

`terse-cjk` je na dva mjesta ograničen na lokalitet `zh`. Stranica Compression Settings prikazuje
njegov redak samo kada je jezik sučelja nadzorne ploče kineski (`zh-CN` ili `zh-TW`), a
`applyOutputStyles()` umeće ga samo kada je razriješeni jezik zahtjeva (pogledajte Odabir jezika
u nastavku) `zh`. Skrivanje retka ne briše spremljeni odabir `terse-cjk`:
API postavki prihvaća svaki ID stila, a spremanje drugih stilova na stranici zadržava ga. Tijekom
obrade zahtjeva provjera jezika u `applyOutputStyles()` jedino je ograničenje lokaliteta.

#### Kako umetanje funkcionira

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) uspoređuje
odabir s katalogom (nepoznati ID-ovi i stilovi koji ne odgovaraju lokalizaciji
odbacuju se i nikada ne uzrokuju pogrešku; ako se odabir ne razriješi ni u jedan stil,
tijelo ostaje nepromijenjeno i preskače se kao `no_styles`), spaja odabrane upute
redoslijedom iz kataloga,
dodaje klauzulu o granicama **jednom** (uz sigurnosnu klauzulu, `SAFETY_BOUNDARIES` ili
njezin prijevod, kada je odabran `less-code` ili `ponytail`) i započinje blok jednom
oznakom idempotentnosti (`[OmniRoute Output Styles]`), pa ponovna primjena ne čini ništa.
Kada razriješeni jezik (pogledajte Odabir jezika u nastavku) ima prijevod, umeće se
lokalizirana uputa umjesto engleske.

Na tijelu s nepraznim poljem `messages`, provjera idempotentnosti izvodi se prije
zaobilaženja na temelju sadržaja: kada se oznaka `[OmniRoute Output Styles]` već nalazi
u polju najviše razine `system` (niz znakova ili polje blokova sadržaja) ili u sistemskoj
poruci sa sadržajem u obliku niza znakova, tijelo ostaje nepromijenjeno kao
`already_applied` i ne provodi se provjera ključnih riječi. U suprotnom, zaobilaženje na
temelju sadržaja (`shouldBypassCavemanOutputMode()` u
`open-sse/services/compression/outputMode.ts`) provjerava tekst posljednje tri poruke,
bez obzira na njihovu ulogu, i preskače stilove za cijeli potez kada taj tekst odgovara
ključnim riječima za sigurnost, nepovratne radnje ili pojašnjenja, ili slijedu osjetljivom
na redoslijed: `first`, `then`, `after that`, `before`, `rollback` ili `backup`, nakon
čega unutar 240 znakova slijedi `delete`, `drop`, `migrate`, `deploy` ili `release`.
Zaobilaženje se izvodi dok je uključen prekidač **Auto-Clarity Bypass**
(`cavemanOutputMode.autoClarity`, uključen prema zadanim postavkama); isključivanjem
prekidača preskače se provjera ključnih riječi.

Kada zaobilaženje propusti potez, `placeSystemInstruction()` (u istoj datoteci), koji
nikada ne stvara novi `messages[0]`, smješta blok na prvo od sljedećih pronađenih mjesta:

1. Početna sistemska poruka sa sadržajem u obliku niza znakova: blok se dodaje nakon
   njezina teksta.
2. Polje najviše razine `system`: blok se dodaje nakon teksta niza znakova ili kao novi
   tekstni blok u polje blokova sadržaja.
3. Prva kasnija sistemska poruka sa sadržajem u obliku niza znakova: blok se dodaje nakon
   njezina teksta.
4. Ništa od navedenog: blok se smješta u novu sistemsku poruku na kraju polja `messages`.

Na tijelu bez polja `messages` (ili s praznim poljem) ne izvodi se zaobilaženje na
temelju sadržaja i ne provjerava se polje najviše razine `system`. Blok se dodaje nakon
teksta polja `instructions` u obliku niza znakova, osim ako to polje već sadržava oznaku
`[OmniRoute Output Styles]`; u tom slučaju tijelo ostaje nepromijenjeno kao
`already_applied`. Kada tijelo nema polje `instructions` u obliku niza znakova, ali
sadržava `input` (niz znakova ili polje), blok postaje `instructions` i zamjenjuje svaku
vrijednost koja nije niz znakova, a koju je to polje prethodno sadržavalo. Tijelo koje
nema ni polje `instructions` u obliku niza znakova ni `input` u obliku niza znakova ili
polja ostaje nepromijenjeno i preskače se kao `no_messages`.

#### Kako omogućiti

Na nadzornoj ploči: **Kontekst kompresije → Postavke kompresije**
(`/dashboard/context/settings`), odjeljak Izlazni stilovi: jedan redak po stilu s
prekidačem za uključivanje/isključivanje i biračem razine. Stilovi se umeću dok je sama
kompresija uključena (glavni prekidač stranice, `enabled`). Prekidač
**Auto-Clarity Bypass** nalazi se na stranici **Caveman**
(`/dashboard/context/caveman`), na njezinoj kartici **Output Mode**. Programsko
konfiguriranje kompresije sprema odabir kao:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Kompatibilnost s prethodnim verzijama: dok je `outputStyles` prazan, naslijeđena
postavka `cavemanOutputMode.enabled` preslikava se u `terse-prose` na razini
`cavemanOutputMode.intensity`. Blok tada počinje oznakom
`[OmniRoute Output Styles]`, dok je naslijeđeni mehanizam za umetanje
`applyCavemanOutputMode()` zapisivao `[OmniRoute Caveman Output Mode]`. Ispod oznake
tekst odgovara naslijeđenom umetanju za en, pt-BR, es, de, fr, it, ru, id i vi; za ja i
zh sadržava jedan dodatni razmak prije klauzule o granicama. `terse-prose` prevodi se na
pt-BR, es, de, fr, it, ru, zh, ja, id i vi, pa zahtjev čiji je razriješeni jezik `hu`
dobiva engleski tekst tamo gdje je naslijeđeni mehanizam za umetanje upotrebljavao
mađarski.

Odabir jezika izlaznog stila (`resolveOutputStyleLanguage()` u
`outputStyles/apply.ts`): kada je `languageConfig.enabled` uključen, `autoDetect`
uzima uzorak iz najnovije korisničke poruke u polju `messages` zahtjeva koja sadržava
tekst (sadržaj u obliku niza znakova ili `text` njezinih dijelova sadržaja) i na njemu
pokreće detektor Caveman mehanizma (`detectCompressionLanguage()`). Detektor vraća `zh`
za tekst sa znakovima Han koji ne sadržava kanu; u suprotnom vraća onaj od jezika `it`,
`pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` i `id` koji ima najviše podudaranja
naznaka, odnosno `en` kada nema podudaranja — tekst koji ne može klasificirati dobiva
engleski, nikada `defaultLanguage`, a `vi` se nikada ne otkriva iako stilovi isporučuju
tekst za `vi`. Tijelo Responses API-ja čuva svoje poteze u `input`, iz kojeg se ne uzima
uzorak, pa dobiva `defaultLanguage`, a zatim engleski. Kada nijedna korisnička poruka u
`messages` nema tekst ili kada je `autoDetect` isključen, primjenjuje se
`defaultLanguage`, a zatim engleski. Kada je `languageConfig.enabled` isključen, jezik
je engleski — osim ako se na zahtjev primjenjuje kombinacija kompresije (kombinacija
dodijeljena kombinaciji usmjeravanja zahtjeva ili zadana kombinacija kompresije koju
chatCore upotrebljava kao rezervu za ugrađeni složeni cjevovod): primjena kombinacije
uključuje `languageConfig.enabled` za taj zahtjev i postavlja `defaultLanguage` iz
jezičnih paketa kombinacije (spremljenu vrijednost ako je ona jedan od paketa
kombinacije, inače prvi paket kombinacije, čija je zadana vrijednost `en`), dok se i
dalje primjenjuje spremljeni `autoDetect` (uključen prema zadanim postavkama). Caveman
mehanizam za unos drukčije odabire jezik paketa pravila — zasebno za svaki dio teksta i,
kada je automatsko otkrivanje isključeno, uvjetovano postavkom `enabledPacks`.

Matrica stilova × jezika definirana je testom
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: svaki stil kataloga mora imati
unos u testnom `BASELINE_LANGUAGES`; stil koji nije ograničen lokalitetom mora sadržavati
prijevod za pt-BR (`terse-cjk`, koji je ograničen lokalitetom, izuzet je od ovog pravila), osim ako je
naveden u `KNOWN_ENGLISH_ONLY`, koji smije sadržavati samo stilove bez ikakvih prijevoda —
navedeni stil koji ima bilo koji prijevod uzrokuje neuspjeh testa; stil također uzrokuje neuspjeh testa kada
izgubi jezik naveden u njegovom unosu `BASELINE_LANGUAGES`. Za dodavanje stila pogledajte
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Kompresija rezultata alata

`compressToolResult()` u `open-sse/services/compression/toolResultCompressor.ts`
komprimira tekst rezultata alata pomoću **5 strategija**. Isprobava ih ovim redoslijedom, a
prva omogućena strategija čija provjera odgovara sadržaju određuje rezultat:

1. **`fileContent`**: sadržaj od 3 ili više redaka u kojem barem jedan redak, zanemarujući
   početne uvlake, počinje s `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` ili `return ` (ključna riječ i razmak), ili s `if`,
   `for` ili `while` nakon kojeg slijedi `(` ili ` (`, zadržava prvih 20 i posljednjih 5 redaka, uz
   oznaku izostavljene sredine.
2. **`grepSearch`**: sadržaj s barem jednim retkom oblika `<path>:<digits>:`,
   gdje tekst prije prve dvotočke nema razmake, zadržava samo te retke, najviše
   30, nakon čega slijede broj svih dodatnih podudaranja i popis datoteka s podudaranjima;
   svaki drugi redak se odbacuje. Jedan takav redak dovoljan je za aktiviranje strategije, pa se
   računa i redak zapisnika koji počinje vremenskom oznakom poput `12:30:45`.
3. **`shellOutput`**: izlaz koji sadrži ANSI CSI sekvencu (`ESC[` pa znamenke ili
   točke sa zarezom, a zatim slovo, kao u kodovima boja) ili `$` nakon kojeg slijedi razmak
   bilo gdje u tekstu gubi te sekvence (drugi izlazni kodovi, poput `ESC[?25l` ili
   OSC sekvence naslova prozora, zadržavaju se) i zadržava posljednjih 50 redaka, pri čemu se uzastopni
   ponovljeni retci sažimaju. Budući da se ova provjera izvršava prije `json` i `errorMessage`,
   JSON ili izlaz pogreške koji sadrži takav `$` nikada ne dolazi do njih dok je
   `shellOutput` uključen.
4. **`json`**: JSON sadržaj dulji od 2.000 znakova koji počinje s `{` ili `[` (nakon
   opcionalnih razmaka) i uspješno se parsira sažima se: polje s više od 7 elemenata zadržava
   prvih 5 i posljednja 2 elementa te ukupan broj, dok objekt zadržava svojih prvih 20
   ključeva, pri čemu se svaka vrijednost ugniježđenog objekta ili polja zamjenjuje rezerviranim tekstom `{…N keys}`
   (za polje je N njegova duljina) i oznakom `_remaining_<N>_keys` koja broji ključeve
   odbačene nakon prvih 20. Skalarne vrijednosti kopiraju se u cijelosti, pa se objekt s 20 ključeva
   ili manje bez ugniježđenih vrijednosti samo ponovno uvlači — minificirani objekt dobiva dodatne znakove
   i ostaje nepromijenjen.
5. **`errorMessage`**: izlaz koji bilo gdje i bez obzira na velika i mala slova sadrži `error:`,
   `error ` (riječ nakon koje slijedi razmak, kao u `no error found`), `[error]`,
   `exception:`, `exception `, `[exception]` ili `traceback` zadržava prvi redak,
   sljedećih 10 redaka i posljednja 3, uz oznaku `… [N frames elided] …` umjesto
   redaka između njih. Oznaka se pojavljuje samo kada nakon prvog retka slijedi više od 13 redaka,
   pa se izlaz pogreške od 14 redaka ili manje ne skraćuje (kod 12 ili 13 redaka
   posljednja 3 ponavljaju već zadržane retke).

Nakon što se strategija podudari, čak i ako ništa ne uštedi, kasnije se strategije ne
isprobavaju. Kada odgovarajuća strategija ne uštedi nijedan procijenjeni token (duljina ÷ 4, zaokruženo naviše) —
primjerice datoteka nalik kodu s 25 redaka ili manje ili JSON polje dulje od 2.000
znakova sa 7 elemenata ili manje — agresivni mehanizam zadržava izvorni rezultat
alata: oba pozivatelja (`compressAggressive()` i `compressAnthropicToolResultBlock()`)
zadržavaju izvornik kada je `saved` 0 ili manje, dok sam `compressToolResult()` i dalje
vraća izlaz te strategije. Korak s rezultatom alata nije konačan: rezervni sažimatelj
mehanizma i dalje može skratiti poruku `tool` ili `function` dulju
od 8.192 znaka (`maxTokensPerMessage`, 2.048, pomnoženo s 4).

#### Kada upotrebljavati

Kompresija rezultata alata prvi je korak agresivnog mehanizma (`compressAggressive()` u
`open-sse/services/compression/aggressive.ts`), pa se izvršava u agresivnom načinu rada i u
koraku `aggressive` složenog obradnog lanca. Komprimira poruke `tool` i `function`
u OpenAI formatu te tekst unutar Anthropic blokova `tool_result`. Svaka strategija ima vlastiti
prekidač pod `aggressive.toolStrategies`, a svi su prema zadanim postavkama uključeni. Na nadzornoj ploči
prekidači se nalaze u prikazu **Advanced** stranice Caveman dok je kompresija uključena, a
zadani način rada postavljen na Aggressive.

### Složeni obradni lanac

Složeni način rada pokreće **više mehanizama uzastopno** — obično najprije RTK
(60–90 % uštede na izlazu alata), a zatim Caveman na preostalom tekstu (~46 % uštede
ulaza). Kombinirano, to daje **prihvatljivi raspon od 78–95 %** (pogledajte gornji odjeljak Upstream Savings Math):
`1 - (1 - 0.60..0.90) × (1 - 0.46)` u prosjeku iznosi ≈89 %.

#### Kako funkcionira

```
Ulaz (1000 tokena)
  → RTK (filtar svjestan naredbi) → 200 tokena
    → Caveman (uklanjanje suvišnog sadržaja) → 108 tokena
  → Izlaz (108 tokena, ~89 % uštede)
```

#### Kada upotrebljavati

Upotrebljavajte složeni način rada za:

- Tijekove rada s intenzivnom uporabom alata (agentsko programiranje, istraživanje)
- Skupnu obradu osjetljivu na troškove
- Situacije u kojima trebate maksimalnu uštedu tokena

Složeni obradni lanci konfiguriraju se putem globalne postavke kompresije `stackedPipeline`
ili putem imenovane kombinacije kompresije dodijeljene kombinaciji usmjeravanja (pogledajte
gornji odjeljak Per-Combo Override) — ne putem `modePack` automatske kombinacije (to polje samo
ponovno ponderira odabir modela automatske kombinacije, a `stacked` nije valjan naziv paketa).

---

## Nadjačavanja kombinacija kompresije

Možete nadjačati globalni način kompresije **za svaku kombinaciju zasebno** kako biste precizno prilagodili ponašanje
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

To je korisno za:

- **Kombinacije za programiranje**: Koristite način `aggressive` za duge sesije
- **Kombinacije za brza pitanja i odgovore**: Koristite način `lite` za brze odgovore
- **Kombinacije s intenzivnom upotrebom alata**: Koristite način `stacked` za maksimalne uštede
- **Produkcijske kombinacije**: ostavite nadjačavanje isključenim za pružatelje usluga s predmemoriranjem — uvijek uključena
  prilagodba koja uzima u obzir predmemoriju automatski spušta `aggressive`/`ultra` na `standard`
  (način `cache-aware` nije moguće odabrati)

---

## Pogledajte i

- [Konfiguracija okruženja](../reference/ENVIRONMENT.md) — Varijable okruženja za kompresiju
- [Vodič kroz arhitekturu](../architecture/ARCHITECTURE.md) — Unutarnji mehanizmi procesa kompresije
- [Korisnički vodič](../guides/USER_GUIDE.md) — Početak rada s kompresijom
- [RTK kompresija](./RTK_COMPRESSION.md) — RTK filtri, model pouzdanosti, kontrola provjere, oporavak neobrađenog izlaza
- [Mehanizmi kompresije](./COMPRESSION_ENGINES.md) — Caveman, RTK, složeni način, API-ji, MCP, nadzorna ploča
- [Format pravila kompresije](./COMPRESSION_RULES_FORMAT.md) — Format JSON paketa pravila
- [Jezični paketi za kompresiju](./COMPRESSION_LANGUAGE_PACKS.md) — Caveman pravila specifična za pojedine jezike
