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

## Način bez kompresije

Kompresija se ne primjenjuje. Sve poruke prolaze nepromijenjene.

### Lagani način (~15% uštede, <1 ms latencije)

Najsigurniji način — čišćenje oblikovanja. Skraćivanje rezultata alata gubi podatke, stoga zadana
putanja (bez `allow-lossy`, `engine:lite` ili eksplicitnog uključivanja imenovane kombinacije) pokreće
lagani način s postavkom `compressToolResults: false`: raniji rezultati alata stižu do pružatelja
nepromijenjeni.

| Tehnika                  | Opis                                                                                                                           |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `collapseWhitespace`     | Spajanje uzastopnih praznih redaka i završnih razmaka                                                                          |
| `dedupSystemPrompt`      | Uklanjanje dupliciranih sistemskih poruka                                                                                      |
| `compressToolResults`    | Skraćivanje ranijih rezultata alata na ograničenje laganog načina (gubitak podataka: samo uz izričito uključivanje u zahtjevu) |
| `removeRedundantContent` | Uklanjanje ponovljenih uputa                                                                                                   |
| `replaceImageUrls`       | Skraćivanje URI-jeva podataka slika kodiranih u base64                                                                         |

**Najbolje za:** Stalnu upotrebu i tijekove rada kritične za sigurnost.

### Standardni način (~30% uštede)

Nadahnuto projektom [Caveman](https://github.com/JuliusBrussee/caveman) — uklanja poštapalice i opširne formulacije uz očuvanje značenja:

- Uklanja poštapalice ("please", "I think", "basically", "actually")
- Sažima opširne izraze ("in order to" → "to", "as a result of" → "because")
- Uklanja ublažavanje iz uljudnosti ("Would you mind...", "If you could possibly...")
- Više od 30 regex-pravila prilagođenih programerskim upitima

**Najbolje za:** Svakodnevne programerske tijekove rada i timove kojima je važna optimizacija troškova.

### Agresivni način (~50% uštede)

Pametno upravljanje poviješću za duge sesije:

- **Starenje poruka** — starije se poruke postupno sažimaju
- **Kompresija rezultata alata** — dugi se rezultati skraćuju ili izostavljaju (prvi/zadnji redci,
  filtriranje prema recima s podudaranjem, sažimanje JSON ključeva)
- **Zaštite strukturnog integriteta** — osiguravaju dosljednost parova `tool_use` + `tool_result`
- **Svijest o prozoru konteksta** — poštuje ograničenja broja tokena pojedinog modela

**Najbolje za:** Dugotrajne sesije otklanjanja pogrešaka i velike baze koda.

### Ultra način (~75% uštede)

Maksimalna kompresija za scenarije u kojima su tokeni kritični:

- **Heurističko sažimanje** — sažimanje proze na temelju bodovanja tokena
- **Očuvanje strukture** — ograđeni blokovi koda, umetnuti kod, URL-ovi i identifikatori označavaju se
  i ponovno sastavljaju doslovno, bez ikakvog sažimanja
- **Neobavezna SLM razina** — mali lokalni model može doraditi sažimanje kada je konfiguriran
- Neovisno o agresivnom načinu: ne pokreće starenje poruka, kompresiju rezultata alata
  ni rezervni sažimač (samo neuspjeh SLM razine može preusmjeriti rezervnu obradu kroz
  agresivni način)

**Najbolje za:** Situacije u kojima se više puta dosežu ograničenja konteksta.

### RTK način (60–90% raspona prema uzvodnom izvoru)

RTK način optimiziran je za opširne rezultate alata koji se pojavljuju u sesijama s programerskim agentima:

- Prepoznaje klase naredbi/izlaza kao što su `git status`, `git diff`, `git log`, pokretači testova,
  TypeScript/Vite/Webpack izgradnje, ESLint/Biome/Prettier, npm audit/instalacije, Docker dnevnici, izlaz infrastrukture
  i generički izlaz ljuske
- Primjenjuje JSON pakete filtara iz `open-sse/services/compression/engines/rtk/filters/`
- Uvozi RTK TOML shemu v1 filtara iz projektnih ili globalnih datoteka `filters.toml`, uz provjeru
  ugrađenih testova i provjeru pouzdanosti projektnih datoteka
- Isporučuje 56 ugrađenih filtara s ugrađenim uzorcima za provjeru
- Uklanja ANSI upravljačke sekvence, trake napretka, ponovljene retke i nebitan šum
- Zadržava neuspjehe, pogreške, upozorenja, promijenjene datoteke, sažetke i završetak dugog izlaza
- Podržava projektne filtre zaštićene provjerom pouzdanosti, globalne filtre i neobavezni oporavak
  sirovog izlaza nakon uklanjanja osjetljivih podataka

**Najbolje za:** Sesije agenata s prijepisima ljuske, izgradnje, testiranja, gita, grepa i izlaza datoteka.

### Složeni način (78–95% raspona podobnog za kompresiju)

Složeni način pokreće više mehanizama kompresije određenim redoslijedom. Zadani cjevovod je:

```txt
RTK -> Caveman
```

Taj redoslijed najprije sažima izlaz terminala/alata, a zatim primjenjuje semantičko sažimanje Cavemana na
preostali upit na prirodnom jeziku. Složeni se cjevovodi mogu konfigurirati globalno ili putem kombinacija
kompresije dodijeljenih kombinacijama usmjeravanja.

**Najbolje za:** Miješani kontekst s velikim zapisima alata te ljudskim uputama ili sažetcima asistenta.

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

- **Caveman** — odabir načina rada, jezični paketi, pregled i globalne zadane vrijednosti
- **RTK** — pregled filtra naredbi, sigurnosne postavke RTK-a i katalog filtara
- **Kombinacije kompresije** — imenovani cjevovodi mehanizama dodijeljeni kombinacijama usmjeravanja
- **Prag automatskog pokretanja** — automatski aktivira kompresiju kada broj tokena premaši prag

### Nadjačavanje po kombinaciji

U `Dashboard → Context & Cache → Compression Combos` dodijelite kombinaciju kompresije
kombinaciji usmjeravanja:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

To vam omogućuje upotrebu složene kompresije s besplatnim pružateljima usluga i pružateljima za
kodiranje, uz zadržavanje lite načina rada na plaćenim pretplatama.

Ova dodjela **nadjačavanja po kombinaciji** drugačija je kontrola od nadjačavanja
**načina kompresije kombinacije usmjeravanja** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — shema polja također prihvaća `rtk`, `stacked` i `omniglyph`) — to nadjačavanje ne odabire imenovani cjevovod kombinacije kompresije; samo postavlja polje `compressionMode` koje koristi
`resolveCompressionPlan`. Može se postaviti na kartici kombinacije (`Dashboard → Combos`) ili, od
#6760, po kombinaciji usmjeravanja na popisu „Assign to routing“ u odjeljku
`Dashboard → Context & Cache → Compression Combos`, odmah pokraj potvrdnog okvira za dodjelu cjevovoda
opisanog iznad. Oba sučelja pohranjuju podatke putem iste krajnje točke
`PUT /api/combos/{id}`.

### Nadjačavanje po zahtjevu

Pošaljite zaglavlje zahtjeva `x-omniroute-compression` da biste nadjačali plan kompresije za jedan
zahtjev. Ono ima najviši prioritet — nadjačava nadjačavanje kombinacije usmjeravanja, aktivni profil,
automatsko pokretanje i zadanu vrijednost na ploči. Nepoznate se vrijednosti zanemaruju (zahtjev se
nikada ne odbija), a globalni glavni prekidač i dalje upravlja svime: kada je kompresija globalno
isključena, zaglavlje je ne može uključiti. Vrijednosti:

| Vrijednost    | Učinak                                                                                                                      |
| ------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `off`         | Nema kompresije za ovaj zahtjev.                                                                                            |
| `default`     | Zadani profil izveden iz ploče (zanemaruje aktivni profil). Mehanizmi s gubitkom ostaju isključeni.                         |
| `safe`        | Isto kao da je zaglavlje izostavljeno.                                                                                      |
| `allow-lossy` | Zadržava plan operatora za ovaj zahtjev, uključujući sažetke, filtre relevantnosti i preoblikovanja stila.                  |
| `engine:<id>` | Jedan mehanizam kada je omogućen, npr. `engine:rtk`. Ovo je eksplicitno uključivanje tog mehanizma za pojedinačni zahtjev.  |
| `<combo>`     | Imenovana kombinacija, koja se najprije podudara prema nazivu (bez razlikovanja velikih i malih slova), a zatim prema ID-u. |

Bez `allow-lossy`, `engine:<id>` ili imenovane kombinacije, mehanizmi s gubitkom ne primjenjuju se. Kada se zadana vrijednost s gubitkom, automatsko pokretanje ili nadjačavanje usmjeravanja
degradira, OmniRoute zadržava prepoznate korake bez gubitka iz konfiguriranog složenog cjevovoda,
redoslijedom kojim su konfigurirani. Vraća se na `session-dedup → lite` samo kada nijedan
konfigurirani korak bez gubitka ne preživi.

Pregled **Effective pipeline** na ploči Settings prikazuje uobičajeni plan u stanju mirovanja. Kada
se može pokrenuti automatsko pokretanje, isti pregled prikazuje i njegov uvjetni učinkoviti cjevovod,
kako bi ploča i razlučivanje tijekom izvođenja bez zaglavlja ostali usklađeni.

Primijenjeni plan vraća se u zaglavlju odgovora
`X-OmniRoute-Compression: <mode>; source=<source>`, gdje je `<source>` jedan od
`request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` ili `off`.

### API

```bash
# Dohvati postavke kompresije
curl http://localhost:20128/api/settings/compression

# Ažuriraj postavke kompresije
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Pregledaj određeni RTK/stacked sadržaj
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Prikaži RTK pakete filtara
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

Osim gore opisanih 7 načina (izvor također prihvaća načine `codex-responses` i `omniglyph`, koje ovaj vodič ne pokriva), odjeljci u nastavku pokrivaju značajke koje rade unutar ili uz te načine rada: kompresija rezultata alata i progresivno starenje su koraci 1 i 2 agresivnog motora (agresivni način rada i korak `aggressive` naslaganog cjevovoda), složeni cjevovod je način na koji radi složeni način rada, Cache-Aware Kompresija smanjuje `aggressive` i `ultra` na `standard` za pružatelje predmemoriranja dok je kompresija uključena, a Caveman Output Mode i Output Styles su opt-in upute sustava, isključene prema zadanim postavkama, koje oblikuju izlaz modela umjesto komprimiranja zahtjeva.

### Kompresija s obzirom na predmemoriju

Neki pružatelji (poput Anthropic s brzim predmemoriranjem) podržavaju** brzo predmemoriranje** , što im omogućuje predmemoriranje dijelova upita kako bi se smanjili troškovi i kašnjenje. Kada je predmemoriranje omogućeno, agresivna kompresija zapravo može** povrijediti** performanse jer mijenja predmemorirane tokene, poništavajući predmemoriju.

Modul `cachingAware.ts` to rješava tako što** otkrivanje konteksta predmemoriranja** i** prilagođavanje strategije kompresije** prema tome.

#### Kako radi

1. **Otkrij kontekst predmemoriranja** — Skenira tijelo zahtjeva u potrazi za `cache_control` markerima
2. **Identificirajte pružatelje predmemoriranja** — Provjerava podržava li ciljni pružatelj predmemoriju
3. **Prilagodite strategiju** — Vraća `aggressive`/`ultra` na `standard` za pružatelje predmemoriranja
4. **Preskoči upit sustava** — Upute sustava obično se spremaju u predmemoriju, stoga ih nemojte komprimirati

Pomoćnik strategije također vraća zastavu `deterministicOnly`, ali sastavljač plana koristi samo strategiju — ništa nizvodno ne čita oznaku danas.

#### Primjer koda

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

#### Kada koristiti

Kompresija svjesna predmemorije je** uvijek uključeno** — nije potrebna konfiguracija. Uključuje se kad god je kompresija uključena i ciljni pružatelj podržava brzo predmemoriranje (Anthropic, OpenAI, itd.); eksplicitni `cache_control` markeri nisu potrebni — sam pružatelj predmemoriranja pokreće vraćanje na nižu verziju, a sami markeri to nikada ne čine (otkrivanje markera prenosi telemetriju predmemorije, a ne odluku o strategiji).

OpenRouter se računa kao pružatelj predmemoriranja samo za `anthropic/*` modele: zahtjevi Claude koda zadržavaju svoje `cache_control` prijelomne točke (najviše 4), a stražar štiti prefiks, dok svaka druga OpenRouter obitelj (`openai/`, `google/`, `qwen/`, …) ostaje ogoljena i nezaštićena.

### Progresivno starenje

Dugi razgovori skupljaju mnoge obrate poruka, ali stariji obrate postaju manje relevantni. Modul `progressiveAging.ts`** degradira poruke udaljenošću zaokreta** (udaljenost mjerena od kraja razgovora). S isporučenim zadanim postavkama (`verbatim: 2, light: 2, moderate: 3`):

- **Zadnja 2 zavoja (udaljenost ≤ 2)** : Čuvano doslovno
- **Udaljenost 3** : Kompresija Caveman (uklanjanje punila)
- **Udaljenost 4 +** : sažete poruke pomoćnika; korisničke poruke svedene na prvi redak, ograničene na 120 znakova; ostale uloge netaknute. Upute sustava, stare poruke i najnovije korisničke poruke uvijek se čuvaju doslovno bez obzira na udaljenost. Ništa se odmah ne ispušta, a `light` pojas je nedostižan sa isporučenim zadanim postavkama (`light` jednako `verbatim`).

#### Primjer koda

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

#### Kada koristiti

Progresivno starenje je** uvijek uključeno** za `aggressive` mod — to je korak 2 od `compressAggressive()`. Ultra način ga ne pokreće. Posebno je učinkovit za:

- Dugotrajne sesije kodiranja
- Višednevni razgovori
- Agentski tijek rada s mnogo poziva alata

### Način izlaza Caveman

Caveman način izlaza dodaje** brze upute sustava** koje od samog modela traže sažeti izlaz — razina `lite` traži sažete odgovore koji sadrže pune rečenice, `full` traži da "odgovori sažeto poput pametnog pećinskog čovjeka", a `ultra` traži telegrafski izlaz; upute samo pitaju, ne mogu garantirati. Zahtjevi ih primaju putem `applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`): `open-sse/handlers/chatCore.ts` prvo rješava odabir s back-compat shimom (`resolveOutputStyleSelection()` u `open-sse/services/compression/outputStyles/backCompat.ts`), koji, dok je `outputStyles` prazan, mapira omogućeni `cavemanOutputMode` u `terse-prose` izlazni stil na `cavemanOutputMode.intensity` (pogledajte Back-compat dolje); neprazan odabir `outputStyles` koristi se takav kakav jest, a `cavemanOutputMode.enabled` i `intensity` tada nemaju učinka, dok se njegov `autoClarity` prekidač i dalje primjenjuje. `outputMode.ts` sadrži tekstove uputa (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), premosnicu sadržaja i pomoćnika za postavljanje koje koristi ubrizgavanje; vlastiti `applyCavemanOutputMode()` injektor nema proizvodnog pozivatelja.

#### Kako radi

Ovaj način rada ne sažima ulaz. Dodaje blok instrukcija u odzivnik sustava (pogledajte kako ubrizgavanje radi u nastavku), a bilo koji način kompresije unosa odabran za zahtjev i dalje se izvodi nakon toga, na tijelu koje sada nosi blok. Ispred klauzule o zajedničkim granicama s kojom završava svaka razina, engleska razina `full` glasi:

> "Odgovorite sažeto poput pametnog špiljskog čovjeka. Izbacite članke (a/an/the), dopunu (just/really/basically/actually/simply), ljubaznosti, zaštitu. Fragmente OK. Kratke sinonime (velike ne opširne, popravite ne implementirajte). Neka sva tehnička supstanca, kôd, pogreške, URLs, identifikatori budu točni."

Ovo posebno dobro funkcionira za:

- Generiranje koda (terser izlaz = manje tokena)
- Brza pitanja i odgovori (nema potrebe za detaljnim objašnjenjima)
- Skupna obrada (maksimalna propusnost)

#### Kada koristiti

Način izlaza Caveman je** uključiti se** . Uz uključenu kompresiju (`enabled: true`, glavni prekidač na stranici Postavke kompresije), uključite je pomoću `cavemanOutputMode.enabled`; `intensity` bira `lite`, `full` ili `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Kompresijske kombinacije** Izlazni način** toggle (`outputMode`, razina u `outputModeIntensity`) postavlja isti prekidač za zahtjeve na koje se primjenjuje kombinacija, a alat `omniroute_set_compression_engine` MCP to zapisuje kroz svoj boolean `outputMode` argument. Odabir `outputStyles` koji nije prazan ima prednost nad ovim prekidačem. Na nadzornoj ploči, omogućavanje** Lagana proza** izlazni stil ubacuje isti blok (pogledajte Stilovi izlaza u nastavku).

### Izlazni stilovi (katalog)

Način izlaza Caveman iznad je** legacy jednostilski put** . Faza 4 generalizirala ga je u katalog stilova izlaza koji se mogu sastaviti: `OUTPUT_STYLE_CATALOG` u `open-sse/services/compression/outputStyles/catalog.ts`. Svaki stil je sustavna instrukcija koja od samog modela traži jeftiniji izlaz; stilovi se mogu omogućiti zajedno i ubacuju se kataloškim redoslijedom.

| Stil                                            | `id`            | Što radi                                                                                                                                                                                                                                                | Jezici podučavanja                            |
| ----------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Lagana proza                                    | `terse-prose`   | Ispusti filler/articles/hedging; održavati tehničku supstancu točnom. Isti tekst kao u naslijeđenom modu ispisa spiljskog čovjeka (referencirano, bez ponovnog upisivanja).                                                                             | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Manje koda                                      | `less-code`     | YAGNI ljestve: najmanja radna promjena, nema nezahtijenih apstrakcija.                                                                                                                                                                                  | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Konjski rep (lijeni stariji razvojni programer) | `ponytail`      | "Najbolji kod je kod koji nikad nije napisan": ponovno korištenje > prepisivanja, glavni uzrok > simptom, najkraća radna razlika.                                                                                                                       | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Imam ADHD (action-first)                        | `i-have-adhd`   | Radnja prva (command/path/snippet prije proze), numerirani ograničeni koraci, ONE konkretan sljedeći korak, bez preamble/recap/closers. Prilagođeno iz [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT).                               | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| UI filter protiv mrlja                          | `antislop-ui`   | Svaka vizualna tehnika mora proći test namjene (hijerarhija, identitet, čitljivost); nema zadanog gradients/glass/glow, ograničena paleta, nema rasporeda predložaka. Oba antislop stila dodaju granicu bez mrtvih kontrola / bez izmišljenih zahtjeva. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Kopija protiv mrlja i ljudski filtar            | `antislop-copy` | Specifična kopija (bez em crtice, generičkog CTAs, modnih riječi, zatvarača chatbota, izmišljenih činjenica) plus pravila za ljude: WCAG AA kontrast, vidljivi fokus, domet tipkovnice, empty/loading/error stanja, mobilni reflow.                     | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Kratki CJK (文言)                               | `terse-cjk`     | `full`/`ultra` odgovor na klasičnom kineskom (文言); `lite` traži samo kratke odgovore bez službenih riječi, ljubaznosti ili uljepšavanja.                                                                                                              | zh (lokalno ograničeno, vidi dolje)           |

Svaki stil isporučuje tri razine intenziteta — `lite`, `full`, `ultra` — i svaka razina završava klauzulom o zajedničkim granicama (`SHARED_BOUNDARIES` u `outputMode.ts`), koja blokove koda, staze datoteka, naredbe, pogreške i URLs održava točnima. Tekstovi razine `terse-prose` i `terse-cjk` dodaju identifikatore na taj popis.

`terse-cjk` je lokalizirano povezan sa `zh` na dva mjesta. Stranica Postavke kompresije navodi svoj red samo kada je UI jezik nadzorne ploče kineski (`zh-CN` ili `zh-TW`), a `applyOutputStyles()` ga ubacuje samo kada je riješeni jezik zahtjeva (pogledajte Odabir jezika u nastavku) `zh`. Skrivanje retka ne briše spremljeni `terse-cjk` odabir: postavke API prihvaćaju bilo koji ID stila, a spremanje drugih stilova na stranici ga zadržava. U vrijeme zahtjeva, `applyOutputStyles()` provjera jezika je jedina lokalna vrata.

#### Kako djeluje injekcija

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) razrješava odabir u odnosu na katalog (nepoznati ID-ovi i stilovi koji se ne podudaraju s lokalizacijom se ispuštaju, nikada pogreška; odabir koji se razrješava na nijedan stil ne ostavlja tijelo nepromijenjenim, preskače se kao `no_styles`), spaja odabrane upute kataloškim redoslijedom, dodaje klauzulu o granicama** jednom** (plus sigurnosna klauzula, `SAFETY_BOUNDARIES` ili njezin prijevod, kada je odabrano `less-code` ili `ponytail` ), i pokreće blok s jednim markerom idempotencije (`[OmniRoute Output Styles]`), tako da je ponovna primjena bez operacije. Kada razriješeni jezik (pogledajte Odabir jezika u nastavku) ima prijevod, lokalizirana se uputa ubacuje umjesto engleskog.

Na tijelu s nepraznim nizom `messages`, provjera idempotencije pokreće se prije zaobilaženja sadržaja: kada je marker `[OmniRoute Output Styles]` već u `system` polju najviše razine (niz ili polje bloka sadržaja) ili u sistemskoj poruci sa sadržajem niza, tijelo ostaje nepromijenjeno kao `already_applied` i ne pokreće se provjera ključne riječi. U suprotnom, zaobilaženje sadržaja (`shouldBypassCavemanOutputMode()` u `open-sse/services/compression/outputMode.ts`) provjerava tekst zadnje tri poruke, bez obzira na njihovu ulogu, i preskače stilove za cijeli red kada se taj tekst podudara sa svojim ključnim riječima za sigurnost, nepovratnu akciju ili pojašnjenje ili nizom osjetljivim na redoslijed: `first`, `then`, `after that`, `before`, `rollback` ili `backup` nakon kojih unutar 240 znakova slijedi `delete`, `drop`, `migrate`, `deploy` ili `release`. Obilaznica radi dok je** Auto-Clarity Bypass** prekidač (`cavemanOutputMode.autoClarity`, uključen prema zadanim postavkama) je uključen; isključivanjem prekidača preskače se provjera ključne riječi.

Kada premosnica propušta skretanje, `placeSystemInstruction()` (ista datoteka), koja nikada ne stvara novi `messages[0]`, postavlja blok u prvu od ovih koju pronađe:

1. Vodeća sistemska poruka sa sadržajem niza: blok se dodaje nakon svog teksta.
2. Polje `system` najviše razine: blok se dodaje nakon teksta niza ili se dodaje kao novi blok teksta nizu blokova sadržaja.
3. Prva kasnija sistemska poruka sa sadržajem niza: blok se dodaje nakon svog teksta.
4. Ništa od navedenog: blok ide u novu sistemsku poruku na kraju `messages`.

Na tijelu bez `messages` polja (ili s praznim) ne pokreće se zaobilaženje sadržaja i ne traži se `system` polje najviše razine. Blok se dodaje nakon teksta polja niza `instructions`, osim ako to polje već sadrži oznaku `[OmniRoute Output Styles]`, u kojem slučaju tijelo ostaje nepromijenjeno kao `already_applied`. Kada tijelo nema string polje `instructions`, ali nosi `input` (string ili niz), blok postaje `instructions`, zamjenjujući bilo koju vrijednost koja nije string to polje sadrži. Tijelo bez polja niza `instructions` niti niza ili polja `input` ostaje nepromijenjeno i preskače se kao `no_messages`.

#### Kako omogućiti

Na nadzornoj ploči:** Kontekst kompresije → Postavke kompresije** (`/dashboard/context/settings`), odjeljak za stilove izlaza: jedan redak po stilu sa on/off prekidačem i biračem razine. Stilovi se ubacuju dok je sama kompresija uključena (glavni prekidač stranice, `enabled`). The** Auto-Clarity Bypass** prekidač je na** Pećinski čovjek** stranici (`/dashboard/context/caveman`), u svojoj** Izlazni način** kartica. Programski, konfiguracija kompresije održava odabir kao:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Back-compat: dok je `outputStyles` prazan, naslijeđena postavka `cavemanOutputMode.enabled` preslikava se na `terse-prose` na `cavemanOutputMode.intensity`. Blok tada počinje markerom `[OmniRoute Output Styles]`, gdje je naslijeđeni `applyCavemanOutputMode()` injektor napisao `[OmniRoute Caveman Output Mode]`. Ispod markera, tekst odgovara naslijeđenom ubacivanju u en, pt-BR, es, de, fr, it, ru, id i vi; u ja i zh nosi jedan dodatni razmak ispred granične odredbe. `terse-prose` se prevodi u pt-BR, es, de, fr, it, ru, zh, ja, id i vi, tako da zahtjev čiji je riješeni jezik `hu` dobiva engleski tekst gdje je naslijeđeni injektor koristio svoj mađarski.

Odabir jezika izlaznog stila (`resolveOutputStyleLanguage()` u `outputStyles/apply.ts`): s uključenim `languageConfig.enabled` -om, `autoDetect` uzorkuje najnoviju korisničku poruku u `messages` nizu zahtjeva koji ima tekst (sadržaj niza ili `text` njegovih dijelova sadržaja) i na njoj pokreće detektor motora Caveman (`detectCompressionLanguage()`). Detektor vraća `zh` za tekst s Han znakovima i bez kana; inače vraća ono što od `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` i `id` ima najviše podudaranja nagovještaja, a `en` kada ništa ne odgovara — tekstu koji ne može klasificirati dobiva engleski, nikad `defaultLanguage`, a `vi` se nikad ne otkriva iako stilovi šalju `vi` tekst. Tijelo odgovora API zadržava svoje redove u `input`, koji nije uzorkovan, pa dobiva `defaultLanguage`, a zatim engleski. Kada nijedna korisnička poruka u `messages` nema teksta ili ako je `autoDetect` isključen, primjenjuje se `defaultLanguage`, a zatim engleski. Kada je `languageConfig.enabled` isključen, jezik je engleski — osim ako se kombinacija kompresije ne primjenjuje na zahtjev (kombinacija dodijeljena kombinaciji usmjeravanja zahtjeva ili zadana kombinacija kompresije na koju se chatCore vraća za ugrađeni naslagani cjevovod): primjenom kombinacije uključuje se `languageConfig.enabled` za taj zahtjev i postavlja `defaultLanguage` iz jezičnih paketa kombinacije (spremljena vrijednost ako je jedan od paketi kombinacije, inače prvi paket kombinacije, koji je prema zadanim `en`), dok se spremljeni `autoDetect` (uključen prema zadanim postavkama) i dalje primjenjuje. Motor za unos Caveman različito bira svoj jezik paketa pravila — po dijelu teksta i, s isključenim automatskim otkrivanjem, uključuje `enabledPacks`.

Jezična matrica stila × prikvačena je `tests/unit/compression/output-styles-i18n-matrix.test.ts`: svaki stil kataloga treba unos u `BASELINE_LANGUAGES` testa; stil koji nije ograničen jezikom mora poslati pt-BR prijevod ( `terse-cjk` ograničen jezikom je izuzet od ovog pravila) osim ako nije naveden u `KNOWN_ENGLISH_ONLY`, koji može sadržavati samo stilove bez ikakvih prijevoda — navedeni stil koji ima bilo kakav prijevod pada na testu; a stil padne na testu kada izgubi jezik koji njegov `BASELINE_LANGUAGES` unos navodi. Za dodavanje stila pogledajte [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Sažimanje rezultata alata

`compressToolResult()` u `open-sse/services/compression/toolResultCompressor.ts` sažima tekst rezultata alata s** 5 strategija** . Pokušava ih ovim redoslijedom, a prva omogućena strategija čija provjera odgovara sadržaju odlučuje o rezultatu:

1. **`fileContent`** : sadržaj od 3 ili više redaka u kojima barem jedan redak, zanemarujući početnu uvlaku, počinje s `import `, `export `, `function `, `class `, `const `, `let `, `var ` ili `return ` (ključna riječ plus razmak), ili s `if`, `for` ili `while` nakon čega slijedi `(` ili ` (`, zadržava svojih prvih 20 i zadnjih 5 redaka, s izbrisanim sredina označena.
2. **`grepSearch`** : sadržaj s najmanje jednim retkom oblika `<path>:<digits>:`, gdje tekst prije prve dvotočke nema razmaka, zadržava samo te retke, najviše 30, nakon čega slijedi broj svih daljnjih podudaranja i popis podudarnih datoteka; svaka druga linija je ispuštena. Jedan takav redak dovoljan je za pokretanje strategije, tako da se redak dnevnika koji počinje s vremenskom oznakom kao što je `12:30:45` također računa.
3. **`shellOutput`** : izlaz koji sadrži sekvencu ANSI CSI (`ESC[` zatim znamenke ili točku sa zarezom pa slovo, kao u kodovima boja) ili `$` iza kojeg slijedi razmak bilo gdje u tekstu gubi te sekvence (druge izlazne linije, kao što je `ESC[?25l` ili OSC sekvenca naslova prozora, zadržavaju se) i zadržava svojih zadnjih 50 redaka, s uzastopnim ponovljenim redcima koji su sažeti. Budući da se ova provjera izvodi prije `json` i `errorMessage`, JSON ili izlaz pogreške koji sadrži takav `$` nikada ne dolazi do njih dok je `shellOutput` uključen.
4. **`json`** : JSON sadržaj od preko 2000 znakova koji počinje sa `{` ili `[` (nakon opcionalnog razmaka) i analizira se sažeto: niz od više od 7 stavki zadržava svojih prvih 5 i posljednje 2 stavke i svoj ukupni broj, a objekt zadržava svojih prvih 20 ključeva, sa svakom ugniježđenom objektom ili vrijednošću niza zamijenjenim `{…N keys}` rezerviranim mjestom (za niz, N je njegova duljina) i `_remaining_<N>_keys` marker koji broji ključeve ispuštene nakon prvih 20. Skalarne vrijednosti se kopiraju cijele, tako da se objekt od 20 ključeva ili manje bez ugniježđenih vrijednosti samo ponovno uvlači — umanjeni dobiva znakove i ostaje nepromijenjen.
5. **`errorMessage`** : izlaz koji sadrži, bilo gdje i u bilo kojem velikom slovu, `error:`, `error ` (riječ iza koje slijedi razmak, kao u `no error found`), `[error]`, `exception:`, `exception `, `[exception]` ili `traceback` zadržava svoj prvi redak, sljedećih 10 redaka i posljednja 3, s oznakom `… [N frames elided] …` umjesto redaka između njih. Oznaka se pojavljuje samo kada nakon prvog retka slijedi više od 13 redaka, tako da se izlaz pogreške od 14 redaka ili manje ne skraćuje (kod 12 ili 13 redaka zadnja 3 ponovljena retka već su zadržana).

Nakon što se strategija podudari, čak i ona koja ništa ne štedi, kasnije se strategije ne isprobavaju. Kada strategija podudaranja ne štedi procijenjene tokene (duljina ÷ 4, zaokruženo) — na primjer datoteka nalik kodu od 25 redaka ili manje, ili JSON niz od preko 2000 znakova sa 7 stavki ili manje — agresivni mehanizam zadržava izvorni rezultat alata: oba pozivatelja (`compressAggressive()` i `compressAnthropicToolResultBlock()`) zadržavaju original kada je `saved` 0 ili niže, dok sam `compressToolResult()` i dalje vraća izlaz te strategije. Korak rezultata alata nije posljednja riječ: rezervni sažimač motora i dalje može skratiti `tool` ili `function` poruku dužu od 8192 znaka (`maxTokensPerMessage`, 2048, puta 4).

#### Kada koristiti

Kompresija rezultata alata prvi je korak agresivnog mehanizma (`compressAggressive()` u `open-sse/services/compression/aggressive.ts`), tako da radi u agresivnom načinu rada i u `aggressive` koraku naslaganog cjevovoda. Komprimira `tool` i `function` poruke u obliku OpenAI-a i tekst unutar Anthropic `tool_result` blokova. Svaka strategija ima svoj prekidač pod `aggressive.toolStrategies`, sve uključeno prema zadanim postavkama. Na nadzornoj ploči prekidači su na stranici Caveman-a** Napredno** prikaz dok je kompresija uključena, a zadani način rada je Agresivan.

### Naslagani cjevovod

Pokreće se složeni način rada** više motora u nizu** — obično prvo RTK (60-90% uštede na izlazu alata), zatim Caveman na preostalom tekstu (~ 46% uštede na unosu). Sastavljeno, to je ono** 78-95% prihvatljiv raspon** (vidi gornju matematiku upstream štednje): `1 - (1 - 0.60..0.90) × (1 - 0.46)` u prosjeku iznosi ≈ 89%.

#### Kako radi

```
Input (1000 tokens)
  → RTK (command-aware filter) → 200 tokens
    → Caveman (filler removal) → 108 tokens
  → Output (108 tokens, ~89% savings)
```

#### Kada koristiti

Koristite složeni način rada za:

- Radni tijek s puno alata (agentsko kodiranje, istraživanje)
- Troškovno osjetljiva skupna obrada
- Kada trebate maksimalnu uštedu tokena

Složeni cjevovodi konfigurirani su kroz globalnu postavku kompresije `stackedPipeline` ili kroz imenovanu kombinaciju kompresije dodijeljenu kombinaciji usmjeravanja (pogledajte Nadjačavanje po kombinaciji gore) — ne putem automatske kombinacije `modePack` (to polje samo ponderira izbor modela automatske kombinacije, a `stacked` nije valjani naziv paketa).

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
