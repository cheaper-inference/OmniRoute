# 🗜️ Prompt Compression Guide — OmniRoute (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Automatski uštedite 15–95% na prihvatljivom kontekstu. Za brzi pregled pogledajte [odjeljak README-a o kompresiji](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Pregled

OmniRoute implementira modularni sistem za kompresiju upita koji se pokreće **proaktivno** prije nego što zahtjevi stignu do nadređenih pružalaca usluga. To znači da se tokeni štede transparentno — nisu potrebne nikakve promjene u vašem radnom procesu.

```
Zahtjev klijenta
  → Selektor strategije kompresije
    → Postoji li zamjena za kombinaciju? → Koristi postavku kombinacije
    → Prag za automatsko pokretanje? → Koristi automatski način
    → Zadani način? → Koristi globalnu postavku
    → Isključeno? → Preskoči kompresiju
  → Odabrani način kompresije
    → Isključeno: Bez kompresije
    → Lagano: Sigurno čišćenje razmaka/formatiranja (~15%)
    → Standardno: Uklanjanje suvišnih riječi u Caveman stilu (~30%)
    → Agresivno: Sažimanje starijih dijelova historije + rezimiranje (~50%)
    → Ultra: Heurističko skraćivanje + prorjeđivanje blokova koda (~75%)
    → RTK: Filtriranje izlaza terminala/alata uz prepoznavanje naredbi (raspon od 60–90% prema nadređenom pružaocu)
    → Složeno: Uređeni sistem s više mehanizama, obično RTK pa Caveman (78–95% prihvatljivog raspona)
  → Komprimirani zahtjev → Pružalac usluge
```

---

## Režimi kompresije

### Isključeno

Kompresija se ne primjenjuje. Sve poruke prolaze neizmijenjene.

### Lagani režim (~15% uštede, <1 ms kašnjenja)

Najsigurniji režim — čišćenje formatiranja. Skraćivanje rezultata alata dovodi do gubitka podataka, pa zadana
putanja (bez `allow-lossy`, `engine:lite` ili eksplicitne prijave imenovane kombinacije) pokreće lagani režim s
`compressToolResults: false`: raniji rezultati alata stižu do pružaoca usluge neizmijenjeni.

| Tehnika                  | Opis                                                                                                        |
| ------------------------ | ----------------------------------------------------------------------------------------------------------- |
| `collapseWhitespace`     | Spajanje uzastopnih praznih redova i završnih razmaka                                                       |
| `dedupSystemPrompt`      | Uklanjanje duplikata sistemskih poruka                                                                      |
| `compressToolResults`    | Skraćivanje ranijih rezultata alata na ograničenje laganog režima (s gubitkom: samo uz eksplicitni zahtjev) |
| `removeRedundantContent` | Uklanjanje ponovljenih uputa                                                                                |
| `replaceImageUrls`       | Skraćivanje base64 URI-jeva podataka slika                                                                  |

**Najbolje za:** Stalnu upotrebu, sigurnosno kritične radne tokove.

### Standardni režim (~30% uštede)

Inspirisan projektom [Caveman](https://github.com/JuliusBrussee/caveman) — uklanja popunjivačke riječi i opširne formulacije uz očuvanje značenja:

- Uklanja popunjivačke riječi („please“, „I think“, „basically“, „actually“)
- Sažima opširne izraze („in order to“ → „to“, „as a result of“ → „because“)
- Uklanja učtivo ublažavanje („Would you mind...“, „If you could possibly...“)
- Više od 30 regex pravila prilagođenih programerskim upitima

**Najbolje za:** Svakodnevne programerske radne tokove i timove kojima je važna optimizacija troškova.

### Agresivni režim (~50% uštede)

Pametno upravljanje historijom za duge sesije:

- **Starenje poruka** — starije poruke se progresivno sažimaju
- **Kompresija rezultata alata** — dugi izlazi alata se skraćuju ili izostavljaju (prvi/zadnji redovi,
  filtriranje po linijama s podudaranjem, sažimanje JSON ključeva)
- **Zaštite strukturnog integriteta** — osiguravaju da parovi `tool_use` + `tool_result` ostanu konzistentni
- **Svjesnost o kontekstnom prozoru** — poštuje ograničenja broja tokena po modelu

**Najbolje za:** Produžene sesije otklanjanja grešaka i velike baze koda.

### Ultra režim (~75% uštede)

Maksimalna kompresija za scenarije kritične po pitanju broja tokena:

- **Heurističko proređivanje** — proređivanje tokena proze na osnovu bodovanja
- **Očuvanje strukture** — ograđeni blokovi koda, umetnuti kod, URL-ovi i identifikatori se označavaju i ponovo
  sastavljaju doslovno, nikada se ne proređuju
- **Opcionalni SLM nivo** — mali lokalni model može doraditi proređivanje kada je konfigurisan
- Nezavisan od agresivnog režima: ne pokreće starenje poruka, kompresiju rezultata alata
  niti rezervni sažimač (samo neuspjeh SLM nivoa može usmjeriti rezervni prolaz kroz agresivni režim)

**Najbolje za:** Situacije kada više puta nailazite na ograničenja konteksta.

### RTK režim (60–90% uzvodnog raspona)

RTK režim je optimizovan za opširne izlaze alata koji se pojavljuju u sesijama s programerskim agentima:

- Otkriva klase komandi/izlaza kao što su `git status`, `git diff`, `git log`, pokretači testova,
  TypeScript/Vite/Webpack izgradnje, ESLint/Biome/Prettier, npm audit/instalacije, Docker dnevnici, infrastrukturni
  izlaz i generički izlaz ljuske
- Primjenjuje JSON pakete filtera iz `open-sse/services/compression/engines/rtk/filters/`
- Uvozi RTK TOML šemu v1 filtera iz projektnih ili globalnih datoteka `filters.toml`, uz validaciju ugrađenih testova
  i kontrolu povjerenja za projektne datoteke
- Isporučuje 56 ugrađenih filtera s ugrađenim uzorcima za provjeru
- Uklanja ANSI kontrolne sekvence, trake napretka, ponovljene redove i nevažnu buku
- Čuva neuspjehe, greške, upozorenja, izmijenjene datoteke, sažetke i kraj dugog izlaza
- Podržava projektne filtere s kontrolom povjerenja, globalne filtere i opcionalni oporavak redigovanog sirovog izlaza

**Najbolje za:** Sesije agenata s transkriptima ljuske, izgradnje, testiranja, git-a, grep-a i izlaza datoteka.

### Naslagani režim (78–95% prihvatljivog raspona)

Naslagani režim pokreće više mehanizama za kompresiju determinističkim redoslijedom. Zadani cjevovod je:

```txt
RTK -> Caveman
```

Tim redoslijedom izlaz terminala/alata prvo postaje sažet, a zatim se na preostali upit na prirodnom jeziku primjenjuje
semantičko sažimanje projekta Caveman. Naslagani cjevovodi mogu se globalno konfigurisati ili dodijeliti kombinacijama
usmjeravanja putem kombinacija kompresije.

**Najbolje za:** Miješani kontekst s velikim dnevnicima alata i ljudskim uputama ili sažecima asistenta.

## Izračun uštede u odnosu na izvorne projekte

OmniRoute dokumentuje uštede ostvarene kompresijom iz dva izvora: testova performansi izvornih projekata i
vlastite kombinacije OmniRoute mehanizama.

| Izvor   | Broj iz izvornog README-a korišten ovdje                                                                                           |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` manje izlaznih tokena, prosječna izlazna ušteda od `65%` na testovima, raspon `22-87%` i alat za kompresiju ulaza od `~46%` |
| RTK     | Ušteda od `60-90%` na izlazu naredbi; primjer sesije s `~118,000 -> ~23,900` tokena, odnosno ušteda od `79.7%` (`~80%`)            |

Za preklapajuće sadržaje alata/konteksta, zadana OmniRoute kombinacija slaže mehanizme:

```txt
RTK -> Caveman
```

Kombinovane uštede su multiplikativne, a ne aditivne:

```txt
kombinovano = 1 - (1 - RTK ušteda) * (1 - Caveman ušteda na ulazu)
prosjek     = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
raspon      = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Taj broj od `78-95%` primjenjuje se kada i RTK i Caveman mogu smanjiti isti ulazni/kontekstualni sadržaj.
Caveman način izlaza odgovora je odvojen: kada je omogućen, koristite Caveman vlastite uštede na izlazu (`65%`
u prosjeku, istaknuto `~75%`, raspon `22-87%`). Ukupne uštede na naplati zavise od omjera upita i izlaza.

### Šta "prihvatljivo" zapravo znači

Istaknuti raspon od 15-95% je stvaran, ali primjenjuje se samo na **redundantan ili preopširan** sadržaj — ponovljene
redove grešaka, zapisnik izgradnje koji neprestano ispisuje isto upozorenje, prevelik `grep`/ispis čitanja datoteke. To
**ne** znači da se na svakom zahtjevu ostvaruje tolika ušteda.

Empirijski potvrđeno (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): pokretanje
načina `stacked` (RTK + Caveman) nad blokom `tool_result` u Anthropic formatu, koji sadrži 300 identičnih
redova greške, proizvelo je **95.93% uštede tokena / 96.26% uštede znakova** — tačno unutar oglašenog
raspona. Međutim, isti cjevovod pokrenut nad normalnim, neredundantnim izlazom alata (čista lista rezultata `grep`,
kratko čitanje datoteke, običan razgovorni tekst) ispravno daje **uštede blizu nule**, jer
nema ničeg ponavljajućeg što bi se moglo ukloniti, a `validateCompression()` (`validation.ts`) odbija isporučiti
prepravku koja bi uklonila ili izmijenila blokove koda, URL-ove, naslove, verzije ili identifikatore konstanti napisane VELIKIM SLOVIMA.

Ovo je očekivano i sigurno ponašanje, a ne greška: sesija programiranja koja uglavnom čita/pretražuje čiste datoteke pomoću `grep`
imat će skromne ukupne uštede čak i kada je kompresija potpuno omogućena, dok će sesija koja naiđe na petlju s greškom
ili preopširan linter ostvariti puni raspon od 78-95% na tom saobraćaju. Nemojte koristiti nizak procenat
ukupne uštede jedne sesije kao dokaz da je kompresija pogrešno konfigurisana — prvo provjerite je li
izvorni izlaz alata zaista bio redundantan.

---

## Vizualizacija uštede tokena

```
Bez kompresije:        47K tokena poslano LLM-u
Uz Lite:               40K tokena poslano          (15% uštede — sigurno, uvijek uključeno)
Uz Standard:           33K tokena poslano          (30% uštede — pravila caveman-speak)
Uz Aggressive:         24K tokena poslano          (50% uštede — zastarijevanje + sažimanje)
Uz Ultra:              12K tokena poslano          (75% uštede — heurističko skraćivanje)
Uz RTK:                19K-5K tokena poslano       (60-90% uštede na izlazu naredbi/alata)
Uz Stacked:            10K-2.5K tokena poslano     (78-95% prihvatljivog RTK+Caveman raspona)
```

---

## Konfiguracija

### Kontrolna tabla

Idite na `Dashboard → Context & Cache`:

- **Caveman** — izbor režima, jezički paketi, pregled i globalne zadane vrijednosti
- **RTK** — pregled filtera naredbi, RTK sigurnosne postavke i katalog filtera
- **Kombinacije kompresije** — imenovani cjevovodi mehanizama dodijeljeni kombinacijama za usmjeravanje
- **Prag automatskog pokretanja** — automatski uključuje kompresiju kada broj tokena premaši prag

### Nadjačavanje po kombinaciji

U `Dashboard → Context & Cache → Compression Combos` dodijelite kombinaciju kompresije kombinaciji za usmjeravanje:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Ovo vam omogućava korištenje naslagane kompresije kod besplatnih pružalaca usluga i pružalaca za kodiranje, uz zadržavanje lite režima na plaćenim pretplatama.

Ova dodjela „Nadjačavanje po kombinaciji“ drugačija je kontrola od nadjačavanja **režima kompresije kombinacije za usmjeravanje** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — shema polja također prihvata `rtk`, `stacked` i `omniglyph`) — to nadjačavanje ne bira imenovani cjevovod kombinacije kompresije; ono samo postavlja polje `compressionMode` koje koristi `resolveCompressionPlan`. Može se postaviti na kartici kombinacije (`Dashboard → Combos`) ili, od #6760, po kombinaciji za usmjeravanje na listi „Assign to routing“ u `Dashboard → Context & Cache → Compression Combos`, odmah pored potvrdnog okvira za dodjelu cjevovoda opisanog iznad. Obje lokacije čuvaju podatke putem iste krajnje tačke `PUT /api/combos/{id}`.

### Nadjačavanje po zahtjevu

Pošaljite zaglavlje zahtjeva `x-omniroute-compression` kako biste nadjačali plan kompresije za jedan zahtjev. Ono ima najviši prioritet — ima prednost nad nadjačavanjem kombinacije za usmjeravanje, aktivnim profilom, automatskim pokretanjem i zadanom vrijednošću panela. Nepoznate vrijednosti se zanemaruju (zahtjev se nikada ne odbija), a globalni glavni prekidač i dalje upravlja svime: kada je kompresija globalno isključena, zaglavlje je ne može uključiti. Vrijednosti:

| Value         | Effect                                                                                                          |
| ------------- | --------------------------------------------------------------------------------------------------------------- |
| `off`         | Bez kompresije za ovaj zahtjev.                                                                                 |
| `default`     | Zadani profil izveden iz panela (zanemaruje aktivni profil). Mehanizmi s gubicima ostaju isključeni.            |
| `safe`        | Isto kao kada se zaglavlje izostavi.                                                                            |
| `allow-lossy` | Zadržava operaterski plan ovog zahtjeva, uključujući sažetke, filtere relevantnosti i prepisivanja stila.       |
| `engine:<id>` | Jedan mehanizam kada je omogućen, npr. `engine:rtk`. Ovo je eksplicitno uključivanje tog mehanizma po zahtjevu. |
| `<combo>`     | Imenovana kombinacija, koja se prvo podudara po nazivu (bez obzira na velika i mala slova), a zatim po ID-u.    |

Bez `allow-lossy`, `engine:<id>` ili imenovane kombinacije, mehanizmi s gubicima se ne primjenjuju. Kada se zadani profil s gubicima, automatsko pokretanje ili nadjačavanje usmjeravanja degradira, OmniRoute zadržava prepoznate korake bez gubitaka iz konfigurisanog naslaganog cjevovoda, prema konfigurisanom redoslijedu. Vraća se na `session-dedup → lite` samo kada nijedan konfigurisan korak bez gubitaka ne preživi.

Pregled **Efektivni cjevovod** na panelu Postavke prikazuje uobičajeni plan u stanju mirovanja. Kada se može pokrenuti automatsko pokretanje, isti pregled prikazuje i njegov uslovni efektivni cjevovod, tako da rezolucija tokom rada panela i rezolucija tokom rada bez zaglavlja ostanu usklađene.

Primijenjeni plan vraća se u zaglavlju odgovora `X-OmniRoute-Compression: <mode>; source=<source>`, gdje je `<source>` jedna od vrijednosti `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` ili `off`.

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

# Navedi RTK pakete filtera
curl http://localhost:20128/api/context/rtk/filters

# Direktno testiraj RTK sa opcionalnim metapodacima naredbe
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Šta se štiti

Mehanizam za kompresiju **uvijek čuva:**

- ✅ Blokove koda (ograđene i unutar reda)
- ✅ URL-ove i putanje datoteka
- ✅ JSON strukture i strukturirane podatke
- ✅ Identifikatore i zaštićene tehničke tokene
- ✅ Matematičke izraze
- ✅ Definicije poziva alata/funkcija
- ✅ Sistemske upite (u laganom režimu)

RTK oporavak sirovog izlaza rediguje uobičajene API ključeve, bearer tokene, Slack tokene, AWS pristupne ključeve,
lozinke, tokene i tajne prije nego što se bilo šta trajno pohrani.

---

## Statistika kompresije

Svaki kompresovani zahtjev uključuje statistiku u zapisnicima servera:

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

| Faza    | Režimi                                                                                                                                                                              | Status        |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Faza 1  | Isključeno, lagano                                                                                                                                                                  | ✅ Isporučeno |
| Faza 2  | Standardno, agresivno, ultra                                                                                                                                                        | ✅ Isporučeno |
| Faza 3  | RTK, složeno, kombinacije kompresije                                                                                                                                                | ✅ Isporučeno |
| Faza 4  | Stilovi izlaza, ultra na SLM nivou, okvir za evaluaciju                                                                                                                             | ✅ Isporučeno |
| Faza 4C | Prilagodljivi budžet konteksta („regulator”) — mehanizam za izračunavanje + API (`contextBudget` na `PUT /api/settings/compression`) + kontrole režima/politike na kontrolnoj ploči | ✅ Isporučeno |

---

## Zahvale

Pravila kompresije standardnog režima inspirisana su projektom **[Caveman](https://github.com/JuliusBrussee/caveman)** autora **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — viralnim projektom „zašto koristiti mnogo tokena kada malo tokena radi posao”. Caveman navodi `~75%` manje izlaznih tokena, prosječnu uštedu izlaza od `65%` na referentnim testovima, raspon izlazne uštede od `22-87%` i alat za kompresiju ulaza od `~46%`.

RTK režim inspirisan je projektom **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** organizacije **[RTK AI](https://github.com/rtk-ai)** — projektom visokih performansi za kompresiju izlaza naredbi za terminal, izgradnju, testiranje, git i filtriranje izlaza alata. RTK navodi uštede od `60-90%`, dok ogledna sesija u njegovom README-u pokazuje uštedu od `~80%`.

---

## Napredni sistemi kompresije

Osim 7 gore opisanih načina rada (izvor također prihvaća `codex-responses` i `omniglyph` modove, koje ovaj vodič ne pokriva), odjeljci ispod pokrivaju funkcije koje rade unutar ili uz te modove: Kompresija rezultata alata i progresivno starenje su koraci 1 i 2 agresivnog mehanizma (agresivni način rada i `aggressive` korak složene kompresije), način rada Stacked Compression Pipe-a je način na koji je Stacked Compression. smanjuje `aggressive` i `ultra` na `standard` za provajdere za keširanje dok je kompresija uključena, a Caveman izlazni režim i stilovi izlaza su instrukcije sistemskog prompta koji su podrazumevano isključeni, koji oblikuju izlaz modela umesto kompresije zahteva.

### Cache-Aware Compression

Neki provajderi (poput Anthropic sa brzim keširanjem) podržavaju** brzo keširanje** , što im omogućava da keširaju dijelove prompta kako bi smanjili troškove i kašnjenje. Kada je keširanje omogućeno, agresivna kompresija zapravo može** povrijediti** performanse jer mijenja keširane tokene, poništavajući predmemoriju.

Modul `cachingAware.ts` to rješava tako što** otkrivanje konteksta keširanja** i** prilagođavanje strategije kompresije** shodno tome.

#### Kako to radi

1. **Otkrivanje konteksta keširanja** — Skenira tijelo zahtjeva za `cache_control` markere
2. **Identifikujte dobavljače keširanja** — Provjerava da li ciljni dobavljač podržava keširanje
3. **Prilagodite strategiju** — Vraća `aggressive`/`ultra` na `standard` za dobavljače keširanja
4. **Preskoči sistemski prompt** — sistemski prompti se obično keširaju, pa ih nemojte komprimirati

Pomoćnik strategije također vraća `deterministicOnly` zastavicu, ali graditelj plana koristi samo strategiju — ništa nizvodno ne čita zastavu danas.

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

Kompresija svjesna keša je** uvijek uključen** — nije potrebna konfiguracija. Pokreće se kad god je kompresija uključena i ciljni provajder podržava brzo keširanje (Anthropic, OpenAI, itd.); eksplicitni `cache_control` markeri nisu potrebni — samo provajder keširanja pokreće sniženje, a sami markeri to nikada ne rade (otkrivanje markera dovodi do telemetrije keša, a ne odluke o strategiji).

OpenRouter se računa kao dobavljač keširanja samo za `anthropic/*` modele: zahtjevi za Claude kodom zadržavaju svoje `cache_control` tačke prekida (najviše 4) i čuvar štiti prefiks, dok svaka druga OpenRouter porodica (`openai/`, `google/`, `qwen/`, …) ostaje ogoljena i nečuvana.

### Progresivno starenje

Dugi razgovori akumuliraju mnogo okretaja poruka, ali starija skretanja postaju manje relevantna. `progressiveAging.ts` modul** degradira poruke rastojanjem skretanja** (udaljenost mjerena od kraja razgovora). Uz isporučene zadane postavke (`verbatim: 2, light: 2, moderate: 3`):

- **Zadnja 2 skretanja (udaljenost ≤ 2)** : Sačuvano doslovno
- **Udaljenost 3** : Caveman kompresija (uklanjanje punila)
- **Udaljenost 4 +** : Poruke pomoćnika sumirane; korisničke poruke svedene na njihov prvi red, ograničene na 120 karaktera; ostale uloge netaknute. Sistemske upute, već stare poruke i najnovija korisnička poruka uvijek se čuvaju doslovno bez obzira na udaljenost. Ništa se ne ispušta potpuno, a `light` opseg je nedostupan sa isporučenim zadanim vrijednostima (`light` jednako `verbatim`).

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

Progresivno starenje je** uvijek uključen** za `aggressive` mod — to je korak 2 od `compressAggressive()`. Ultra način rada ga ne pokreće. Posebno je efikasan za:

- Dugotrajne sesije kodiranja
- Višednevni razgovori
- Agentski radni tok s mnogo poziva alata

### Caveman Output Mode

Caveman izlazni način dodaje** sistemska uputstva** koji od samog modela traže sažeti izlaz — nivo `lite` traži sažete odgovore koji zadržavaju pune rečenice, `full` traži od njega da "reaguje sažeto kao pametni pećinski čovjek", a `ultra` traži telegrafski izlaz; upute samo traže, ne mogu to garantirati. Zahtjevi ih primaju preko `applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`): `open-sse/handlers/chatCore.ts` prvo rješava selekciju podloškom za back-compat (`resolveOutputStyleSelection()` u `open-sse/services/compression/outputStyles/backCompat.ts`), koji, dok je `outputStyles` prazan, mapira omogućeni `cavemanOutputMode` u `terse-prose` izlazni stil na `cavemanOutputMode.intensity` (pogledajte Back-compat ispod); neprazan izbor `outputStyles` se koristi kakav jeste, a `cavemanOutputMode.enabled` i `intensity` tada nemaju efekta, dok se njegov `autoClarity` prekidač i dalje primjenjuje. `outputMode.ts` sadrži tekstove instrukcija (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), zaobilaznicu sadržaja i pomoćnik za postavljanje koji koristi injekcija; njegov vlastiti `applyCavemanOutputMode()` injektor nema proizvodnog pozivatelja.

#### Kako to radi

Ovaj način rada ne komprimira ulaz. On dodaje blok instrukcija u sistemski prompt (pogledajte kako ubrizgavanje radi u nastavku), a bilo koji način kompresije ulaza odabran za zahtjev i dalje se izvodi nakon toga, na tijelu koje sada nosi blok. Ispred klauzule o zajedničkim granicama kojom se završava svaki nivo, engleski `full` nivo glasi:

> "Odgovarajte kratko kao pametni pećinski čovjek. Odbacite članke (a/an/the), punilo (just/really/basically/actually/simply), ljubaznost, hedžing. Fragmenti OK. Kratki sinonimi (veliki, ne opsežni, popravite ne implementirajte). Zadržite svu tehničku supstancu, kod, greške, URLs, identifikatore tačnim."

Ovo posebno dobro funkcionira za:

- Generiranje koda (terser izlaz = manje tokena)
- Brza pitanja i odgovori (nema potrebe za detaljnim objašnjenjima)
- Batch obrada (maksimiziranje protoka)

#### Kada koristiti

Režim izlaza Caveman je** opt-in** . Kada je kompresija uključena (`enabled: true`, glavni prekidač na stranici Postavke kompresije), uključite ga pomoću `cavemanOutputMode.enabled`; `intensity` bira `lite`, `full` ili `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Kombinacija kompresije** Output Mode** toggle (`outputMode`, nivo u `outputModeIntensity`) postavlja isti prekidač za zahtjeve na koje se kombinira kombinacija, a `omniroute_set_compression_engine` MCP alat ga upisuje kroz svoj logički argument `outputMode`. Neprazan izbor `outputStyles` ima prednost nad ovim prekidačem. Na kontrolnoj tabli, omogućavanje** Kratka proza** izlazni stil ubacuje isti blok (pogledajte Izlazni stilovi ispod).

### Izlazni stilovi (katalog)

Caveman izlazni način iznad je** naslijeđeni put u jednom stilu** . Faza 4 je generalizirala u katalog sastavljajućih izlaznih stilova: `OUTPUT_STYLE_CATALOG` u `open-sse/services/compression/outputStyles/catalog.ts`. Svaki stil je sistemska instrukcija koja traži od samog modela jeftiniji izlaz; stilovi se mogu omogućiti zajedno i ubrizgavaju se po kataloškom redoslijedu.

| Stil                             | `id`            | Šta radi                                                                                                                                                                                                                                               | Nastavni jezici                               |
| -------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| Kratka proza                     | `terse-prose`   | Drop filler/articles/hedging; održavati tačnost tehničke supstance. Isti tekst kao i naslijeđeni način izlaza pećinskog čovjeka (referenciran, ne ponovno otkucan).                                                                                    | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Manje koda                       | `less-code`     | YAGNI ljestvice: najmanja radna promjena, bez nezatraženih apstrakcija.                                                                                                                                                                                | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| konjski rep (lijeni stariji dev) | `ponytail`      | "Najbolji kod je onaj koji nikad nije napisan": ponovno korištenje > rewrite, osnovni uzrok > simptom, najkraća radna razlika.                                                                                                                         | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Imam ADHD (prva akcija)          | `i-have-adhd`   | Prva radnja (command/path/snippet prije proze), numerirani ograničeni koraci, ONE konkretni sljedeći korak, ne preamble/recap/closers. Prilagođeno iz [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT).                               | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop UI filter               | `antislop-ui`   | Svaka vizuelna tehnika mora proći test svrhe (hijerarhija, identitet, čitljivost); nema zadanog gradients/glass/glow, zatvorene palete, nema rasporeda šablona. Oba antislop stila dodaju granicu bez mrtvih kontrola / bez fabrikovanih potraživanja. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop kopija i ljudski filter | `antislop-copy` | Specifična kopija (bez em crtice, generički CTAs, buzzwords, chatbot zatvarači, izmišljene činjenice) plus pravila ljudi: WCAG AA kontrast, vidljivi fokus, doseg tipkovnice, empty/loading/error stanja, mobilno reflow.                              | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Terse CJK (文言)                 | `terse-cjk`     | `full`/`ultra` odgovor na klasičnom kineskom (文言); `lite` traži samo kratke odgovore bez funkcionalnih riječi, ljubaznosti ili uljepšavanja.                                                                                                         | zh (lokalno ograničen, vidi dolje)            |

Svaki stil isporučuje tri nivoa intenziteta — `lite`, `full`, `ultra` — i svaki nivo završava klauzulom o zajedničkim granicama (`SHARED_BOUNDARIES` in `outputMode.ts`), koja čuva blokove koda, putanje datoteka, komande, greške i URLs egzaktnim. Tekstovi nivoa `terse-prose` i `terse-cjk` dodaju identifikatore na tu listu.

`terse-cjk` je lokalizirana za `zh` na dva mjesta. Stranica Postavke kompresije navodi svoj red samo kada je jezik UI kontrolne table kineski (`zh-CN` ili `zh-TW`), a `applyOutputStyles()` ga ubacuje samo kada je riješeni jezik zahtjeva (pogledajte Izbor jezika ispod) `zh`. Sakrivanje reda ne briše sačuvani `terse-cjk` izbor: postavke API prihvataju bilo koji ID stila, a čuvanje drugih stilova na stranici ga zadržava. U vrijeme zahtjeva, `applyOutputStyles()` provjera jezika je jedina kapija lokalizacije.

#### Kako djeluje injekcija

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) rješava selekciju u odnosu na katalog (nepoznati ID-ovi i stilovi neusklađeni s lokalizacijom se ispuštaju, nikada nije greška; odabir koji se rješava bez stila ostavlja tijelo nepromijenjenim, preskače kao `no_styles`), spaja odabrane instrukcije u kataloškom redoslijedu, dodaje klauzulu o granicama** jednom** (plus sigurnosna klauzula, `SAFETY_BOUNDARIES` ili njen prijevod, kada je odabrano `less-code` ili `ponytail` ), i započinje blok sa jednim markerom idempotencije (`[OmniRoute Output Styles]`), tako da je ponovna primjena neophodna. Kada riješeni jezik (pogledajte Odabir jezika ispod) ima prijevod, lokalizirana instrukcija se ubacuje umjesto engleskog.

Na tijelu s nepraznim `messages` nizom, provjera idempotencije se pokreće prije zaobilaženja sadržaja: kada je `[OmniRoute Output Styles]` marker već u `system` polju najvišeg nivoa (niz ili niz sadržaja blokova) ili u sistemskoj poruci sa sadržajem niza, tijelo ostaje nepromijenjeno kao `already_applied` i ne pokreće se provjera ključne riječi. U suprotnom, zaobilaženje sadržaja (`shouldBypassCavemanOutputMode()` u `open-sse/services/compression/outputMode.ts`) provjerava tekst posljednje tri poruke, bez obzira na njihovu ulogu, i preskače stilove za cijeli niz kada se taj tekst podudara sa sigurnošću, nepovratnom radnjom ili ključnim riječima za pojašnjenje, ili sekvencom osjetljivom na redoslijed: `first`, `then`, `after that`, `before` ili `rollback` `backup` znakom nakon zq4 `delete`, `drop`, `migrate`, `deploy` ili `release`. Zaobilaznica radi dok je** Auto-Clarity Bypass** prekidač (`cavemanOutputMode.autoClarity`, podrazumevano uključen) je uključen; isključivanjem prekidača preskače se provjera ključne riječi.

Kada obilaznica pusti skretanje, `placeSystemInstruction()` (ista datoteka), koja nikada ne kreira novi `messages[0]`, postavlja blok u prvi od njih koji pronađe:

1. Vodeća sistemska poruka sa sadržajem niza: blok se dodaje iza njegovog teksta.
2. Polje `system` najviše razine: blok se dodaje iza teksta niza ili se dodaje kao novi tekstualni blok nizu blokova sadržaja.
3. Prva kasnija sistemska poruka sa sadržajem niza: blok se dodaje iza njegovog teksta.
4. Ništa od gore navedenog: blok ide u novu sistemsku poruku na kraju `messages`.

Na tijelu bez `messages` niza (ili sa praznim), nema zaobilaženja sadržaja i `system` polje najvišeg nivoa se ne konsultuje. Blok se dodaje iza teksta niza `instructions` polja, osim ako to polje već sadrži `[OmniRoute Output Styles]` marker, u kom slučaju tijelo ostaje nepromijenjeno kao `already_applied`. Kada tijelo nema polje niza `instructions`, ali nosi `input` (niz ili niz), blok postaje `instructions`, zamjenjujući bilo koju vrijednost koja nije nizova u tom polju. Tijelo koje nema ni polje `instructions` niskog niza ni niza ili niza `input` ostaje nepromijenjeno i preskače se kao `no_messages`.

#### Kako omogućiti

Na kontrolnoj tabli:** Kontekst kompresije → Postavke kompresije** (`/dashboard/context/settings`), odjeljak za stilove izlaza: jedan red po stilu sa on/off prekidačem i selektorom nivoa. Stilovi se ubacuju dok je sama kompresija uključena (glavni prekidač stranice, `enabled`). The** Auto-Clarity Bypass** prekidač je na** Caveman** stranica (`/dashboard/context/caveman`), u svojoj** Output Mode** kartica. Programski, konfiguracija kompresije nastavlja odabir kao:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Back-compat: dok je `outputStyles` prazan, naslijeđena `cavemanOutputMode.enabled` postavka preslikava se na `terse-prose` na `cavemanOutputMode.intensity`. Blok tada počinje sa `[OmniRoute Output Styles]` markerom, gdje je naslijeđeni `applyCavemanOutputMode()` injektor napisao `[OmniRoute Caveman Output Mode]`. Ispod markera, tekst se podudara sa zastarjelom injekcijom u en, pt-BR, es, de, fr, it, ru, id i vi; u ja i zh nosi jedan dodatni razmak ispred klauzule o granicama. `terse-prose` se prevodi u pt-BR, es, de, fr, it, ru, zh, ja, id i vi, tako da zahtjev čiji je riješeni jezik `hu` dobija engleski tekst gdje je legacy injektor koristio svoj mađarski.

Output-style language selection (`resolveOutputStyleLanguage()` in `outputStyles/apply.ts`): with `languageConfig.enabled` on, `autoDetect` samples the latest user message in the request's `messages` array that has text (string content, or the `text` of its content parts) and runs the Caveman engine's detector (`detectCompressionLanguage()`) on it. The detector returns `zh` for text with Han characters and no kana; otherwise it returns whichever of `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` and `id` has the most hint matches, and `en` when none match — text it cannot classify gets English, never `defaultLanguage`, and `vi` is never detected although the styles ship `vi` text. A Responses API body keeps its turns in `input`, which is not sampled, so it gets `defaultLanguage`, then English. When no user message in `messages` has text, or with `autoDetect` off, `defaultLanguage` applies, then English. With `languageConfig.enabled` off, the language is English — unless a compression combo applies to the request (a combo assigned to the request's routing combo, or the default compression combo chatCore falls back to for the built-in stacked pipeline): applying a combo turns `languageConfig.enabled` on for that request and sets `defaultLanguage` from the combo's language packs (the saved value if it is one of the combo's packs, otherwise the combo's first pack, which defaults to `en`), while the saved `autoDetect` (on by default) still applies. The Caveman input engine picks its rule-pack language differently — per text part and, with auto-detect off, gated on `enabledPacks`.

Jezička matrica stilova × je pričvršćena pomoću `tests/unit/compression/output-styles-i18n-matrix.test.ts`: svaki stil kataloga treba unos u `BASELINE_LANGUAGES` testa; stil koji nije ograničen na lokalizaciju mora isporučiti pt-BR prijevod ( `terse-cjk` s ograničenom lokacijom je izuzet od ovog pravila) osim ako nije naveden u `KNOWN_ENGLISH_ONLY`, koji može sadržavati samo stilove bez prijevoda uopće — navedeni stil koji ima bilo kakav prijevod ne prolazi test; a stil padne na testu kada izgubi jezik koji navodi njegov `BASELINE_LANGUAGES` unos. Za dodavanje stila pogledajte [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Kompresija rezultata alata

`compressToolResult()` u `open-sse/services/compression/toolResultCompressor.ts` komprimuje tekst rezultata alata sa** 5 strategija** . Pokušava ih ovim redoslijedom, a prva omogućena strategija čija provjera odgovara sadržaju odlučuje o rezultatu:

1. **`fileContent`** : sadržaj od 3 ili više redaka u kojima barem jedan red, zanemarujući početnu uvlaku, počinje sa `import `, `export `, `function `, `class `, `const `, `let `, `var ` ili `return ` (ključna riječ plus razmak), ili sa `if`, `for` ili `while` iza koje slijedi `(` ili ` (`, a zadnji red sa prvim redom 2 elidirano srednje označeno.
2. **`grepSearch`** : sadržaj s najmanje jednom linijom oblika `<path>:<digits>:`, gdje tekst prije prvog dvotočka nema razmaka, zadržava samo te redove, najviše 30, nakon čega slijedi broj svih daljnjih podudaranja i lista podudarnih datoteka; svaki drugi red se ispušta. Jedna takva linija je dovoljna da pokrene strategiju, tako da se računa i linija dnevnika koja počinje s vremenskom oznakom kao što je `12:30:45`.
3. **`shellOutput`** : izlaz koji sadrži ANSI CSI sekvencu (`ESC[` zatim cifre ili tačke i zareze pa slovo, kao u kodovima boja) ili `$` praćen razmakom bilo gdje u tekstu gube te sekvence (drugi izlaz, kao što je `ESC[?25l` ili OSC sekvenca naslova prozora, se čuvaju) i zadržava zadnjih 50 redova, sa konsekventnim redovima koji se ponavljaju. Budući da se ova provjera izvodi prije `json` i `errorMessage`, JSON ili izlaz greške koji sadrži takav `$` nikada ih ne dosegne dok je `shellOutput` uključen.
4. **`json`** : JSON korisni teret preko 2.000 znakova koji počinje sa `{` ili `[` (nakon opcionog razmaka) i raščlanjuje se sažeto: niz od više od 7 stavki zadržava svojih prvih 5 i posljednje 2 stavke i svoj ukupan broj, a objekt zadržava svojih prvih 20 ključeva, pri čemu je svaki ugniježđeni objekt ili niz vrijednost zamijenjena dužinom N za mjesto držača `{…N keys}` i `_remaining_<N>_keys` marker koji broji ključeve koji su pali iza prvih 20. Skalarne vrijednosti se kopiraju cijele, tako da se objekt od 20 ključeva ili manje bez ugniježđenih vrijednosti samo ponovo uvlači —, a minimizirani dobiva znakove i ostaje nepromijenjen.
5. **`errorMessage`** : izlaz koji sadrži, bilo gdje i bilo kojim velikim slovom, `error:`, `error ` (riječ iza koje slijedi razmak, kao u `no error found`), `[error]`, `exception:`, `exception `, `[exception]` ili `traceback` zadržava svoj prvi red, sljedećih 10 reda i posljednja 3, s oznakom `… [N frames elided] …` umjesto redova između njih. Marker se pojavljuje samo kada više od 13 redova prati prvi red, tako da se izlaz greške od 14 redova ili manje ne skraćuje (na 12 ili 13 redova zadnja 3 ponovljena reda se već čuvaju).

After a strategy matches, even one that saves nothing, the later strategies are not tried. When the matching strategy saves no estimated tokens (length ÷ 4, rounded up) — for example a code-like file of 25 lines or fewer, or a JSON array over 2,000 characters with 7 items or fewer — the aggressive engine keeps the original tool result: both callers (`compressAggressive()` and `compressAnthropicToolResultBlock()`) keep the original when `saved` is 0 or below, while `compressToolResult()` itself still returns that strategy's output. The tool-result step is not the last word: the engine's fallback summarizer can still shorten a `tool` or `function` message longer than 8,192 characters (`maxTokensPerMessage`, 2,048, times 4).

#### Kada koristiti

Kompresija rezultata alata je korak 1 agresivnog motora (`compressAggressive()` u `open-sse/services/compression/aggressive.ts`), tako da radi u agresivnom modu i u `aggressive` koraku naslaganog cjevovoda. On kompresuje `tool` i `function` poruke u obliku OpenAI i tekst unutar Anthropic `tool_result` blokova. Svaka strategija ima svoj vlastiti prekidač pod `aggressive.toolStrategies`, sve uključeno po defaultu. Na kontrolnoj tabli, prekidači su na stranici Caveman** Napredno** prikaz dok je kompresija uključena i podrazumevani režim je Agresivan.

### Stacked Pipeline

Pokreće se naslagani način rada** više motora u nizu** — obično prvo RTK (60-90% uštede na izlazu alata), zatim Caveman na preostalom tekstu (~ 46% uštede na unosu). Sastavljen, to je ono** 78-95% prihvatljivog raspona** (pogledajte Upstream Savings Math gore): `1 - (1 - 0.60..0.90) × (1 - 0.46)` u prosjeku ≈ 89%.

#### Kako to radi

```
Input (1000 tokens)
  → RTK (command-aware filter) → 200 tokens
    → Caveman (filler removal) → 108 tokens
  → Output (108 tokens, ~89% savings)
```

#### Kada koristiti

Koristite naslagani način za:

- Tokovi posla koji zahtijevaju velike alate (agentsko kodiranje, istraživanje)
- Skupna obrada osjetljiva na troškove
- Kada vam je potrebna maksimalna ušteda tokena

Naslagani cjevovodi se konfiguriraju kroz globalnu `stackedPipeline` postavku kompresije, ili kroz imenovanu kombinaciju kompresije koja je dodijeljena kombinaciji usmjeravanja (pogledajte gore za poništavanje po kombinaciji) — a ne kroz auto-kombo `modePack` (to polje samo ponovno teži odabiru automatskog kombo modela, a `stacked` nije važeće ime paketa).

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

Ovo je korisno za:

- **Kombinacije za programiranje**: Koristite način `aggressive` za duge sesije
- **Kombinacije za brza pitanja i odgovore**: Koristite način `lite` za brze odgovore
- **Kombinacije s intenzivnom upotrebom alata**: Koristite način `stacked` za maksimalne uštede
- **Produkcijske kombinacije**: ostavite nadjačavanje isključeno za pružaoce usluga keširanja — uvijek uključeno
  prilagođavanje svjesno keša automatski spušta `aggressive`/`ultra` na `standard`
  (ne postoji način `cache-aware` koji se može odabrati)

---

## Pogledajte također

- [Konfiguracija okruženja](../reference/ENVIRONMENT.md) — Varijable okruženja za kompresiju
- [Vodič kroz arhitekturu](../architecture/ARCHITECTURE.md) — Unutrašnji mehanizmi toka kompresije
- [Korisnički vodič](../guides/USER_GUIDE.md) — Početak rada s kompresijom
- [RTK kompresija](./RTK_COMPRESSION.md) — RTK filteri, model povjerenja, kontrola provjere i oporavak sirovog izlaza
- [Mehanizmi kompresije](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, API-ji, MCP i kontrolna ploča
- [Format pravila kompresije](./COMPRESSION_RULES_FORMAT.md) — Format JSON paketa pravila
- [Jezički paketi za kompresiju](./COMPRESSION_LANGUAGE_PACKS.md) — Caveman pravila specifična za jezik
