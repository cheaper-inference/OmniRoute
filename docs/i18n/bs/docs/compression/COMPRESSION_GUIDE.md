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

## Načini kompresije

### Isključeno

Kompresija nije primijenjena. Sve poruke prolaze nepromijenjene.

### Lite način (~15% uštede, <1ms latencije)

Najsigurniji način — nula semantičkih promjena, samo čišćenje formatiranja:

| Tehnika                  | Opis                                                    |
| ------------------------ | ------------------------------------------------------- |
| `collapseWhitespace`     | Spaja uzastopne prazne linije i razmake na kraju redova |
| `dedupSystemPrompt`      | Uklanja duplirane sistemske poruke                      |
| `compressToolResults`    | Kompresuje opširne izlaze alata/funkcija                |
| `removeRedundantContent` | Uklanja ponovljene instrukcije                          |
| `replaceImageUrls`       | Skraćuje base64 data URI-je slika                       |

**Najbolje za:** stalnu upotrebu, sigurnosno kritične radne tokove.

### Standardni način (~30% uštede)

Inspirisan projektom [Caveman](https://github.com/JuliusBrussee/caveman) — uklanja popunjavajuće riječi i opširno izražavanje uz očuvanje značenja:

- Uklanja popunjavajuće riječi ("please", "I think", "basically", "actually")
- Skraćuje opširne fraze ("in order to" → "to", "as a result of" → "because")
- Uklanja uljudna ustezanja ("Would you mind...", "If you could possibly...")
- 30+ regex pravila podešenih za promptove kodiranja

**Najbolje za:** svakodnevne radne tokove kodiranja, timove koji vode računa o troškovima.

### Agresivni način (~50% uštede)

Pametno upravljanje historijom za duge sesije:

- **Starenje poruka** — starije poruke se progresivno kompresuju
- **Kompresija rezultata alata** — dugi izlazi alata se skraćuju ili izostavljaju (prve/posljednje linije,
  filtriranje linija koje odgovaraju, zbijanje JSON ključeva)
- **Zaštite strukturnog integriteta** — osiguravaju da parovi `tool_use` + `tool_result` ostanu konzistentni
- **Svjesnost kontekstnog prozora** — poštuje ograničenja tokena po modelu

**Najbolje za:** produžene sesije otklanjanja grešaka, velike baze koda.

### Ultra način (~75% uštede)

Maksimalna kompresija za scenarije kritične po broju tokena:

- **Heurističko podrezivanje** — podrezivanje tokena proze na osnovu bodovanja
- **Očuvanje strukture** — ograđeni blokovi koda, inline kod, URL-ovi i identifikatori se
  obilježavaju tombstone oznakama i ponovno sastavljaju doslovno, nikada se ne podrezuju
- **Opcionalni SLM nivo** — mali lokalni model može dotjerati podrezivanje kada je konfigurisan
- Nezavisan od Agresivnog načina: ne pokreće starenje poruka, kompresiju rezultata alata
  ni rezervni sumarizator (samo kvar SLM nivoa može usmjeriti rezervni prolaz kroz
  agresivni način)

**Najbolje za:** kada stalno dolazite do ograničenja konteksta.

### RTK način (60-90% uzvodni opseg)

RTK način je optimizovan za opširne izlaze alata koji se pojavljuju u sesijama agenata za kodiranje:

- Detektuje klase naredbi/izlaza kao što su `git status`, `git diff`, `git log`, test runneri,
  TypeScript/Vite/Webpack buildovi, ESLint/Biome/Prettier, npm audit/instalacije, Docker logovi,
  infrastrukturni izlaz i generički shell izlaz
- Primjenjuje JSON pakete filtera iz `open-sse/services/compression/engines/rtk/filters/`
- Uvozi RTK TOML schema v1 filtere iz projektnih ili globalnih `filters.toml` datoteka, s validacijom
  inline testova i trust-gatingom za projektne datoteke
- Dolazi sa 56 ugrađenih filtera s inline uzorcima za verifikaciju
- Uklanja ANSI kontrolne sekvence, trake napretka, ponovljene linije i neupotrebljiv šum
- Čuva neuspjehe, greške, upozorenja, izmijenjene datoteke, sažetke i kraj dugog izlaza
- Podržava projektne filtere s trust-gatingom, globalne filtere i opcionalni oporavak redaktovanog sirovog izlaza

**Najbolje za:** sesije agenata s transkriptima shella, buildova, testova, git, grep i izlaza datoteka.

### Stacked način (78-95% primjenjivi opseg)

Stacked način pokreće više motora kompresije determinističkim redoslijedom. Zadani pipeline je:

```txt
RTK -> Caveman
```

Taj redoslijed prvo održava izlaz terminala/alata kompaktnim, a zatim primjenjuje Caveman semantičku
kondenzaciju na preostali prompt na prirodnom jeziku. Stacked pipelineovi se mogu konfigurisati globalno
ili putem kombinacija kompresije dodijeljenih kombinacijama rutiranja.

**Najbolje za:** miješani kontekst s velikim logovima alata uz ljudske instrukcije ili sažetke asistenta.

---

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

### Kontrolna ploča

Idite na `Dashboard → Context & Cache`:

- **Caveman** — odabir načina rada, jezički paketi, pregled i globalne zadane postavke
- **RTK** — pregled filtera naredbi, sigurnosne postavke RTK-a i katalog filtera
- **Kombinacije kompresije** — imenovani cjevovodi mehanizama dodijeljeni kombinacijama usmjeravanja
- **Prag automatskog pokretanja** — automatski aktivira kompresiju kada broj tokena premaši prag

### Nadjačavanje po kombinaciji

U `Dashboard → Context & Cache → Compression Combos` dodijelite kombinaciju kompresije kombinaciji
usmjeravanja:

```txt
Kombinacija: "free-tier-fallback"
  Kombinacija kompresije: "coding-agent-stack"
  Cjevovod: RTK -> Caveman
  Odredišta:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Ovo vam omogućava korištenje složene kompresije kod besplatnih/pružalaca za programiranje, dok za
plaćene pretplate zadržavate jednostavni način rada.

Ova dodjela „Nadjačavanje po kombinaciji” predstavlja drugačiju kontrolu od nadjačavanja **načina
kompresije kombinacije usmjeravanja** (Zadano/Isključeno/Jednostavno/Standardno/Agresivno/Ultra/Codex Responses — shema polja
također prihvata `rtk`, `stacked` i `omniglyph`) — to nadjačavanje ne odabire imenovani
cjevovod kombinacije kompresije; ono samo postavlja polje `compressionMode` koje provjerava
`resolveCompressionPlan`. Može se postaviti na kartici kombinacije (`Dashboard → Combos`) ili, od
#6760, za svaku kombinaciju usmjeravanja na listi „Dodijeli usmjeravanju” u
`Dashboard → Context & Cache → Compression Combos`, odmah pored potvrdnog okvira za dodjelu cjevovoda
dokumentovanog iznad. Oba sučelja spremaju podatke putem iste krajnje tačke `PUT /api/combos/{id}`.

### Nadjačavanje po zahtjevu

Pošaljite zaglavlje zahtjeva `x-omniroute-compression` kako biste nadjačali plan kompresije za jedan
zahtjev. Ono ima najviši prioritet — nadjačava postavku kombinacije usmjeravanja, aktivni profil,
automatsko pokretanje i zadanu postavku panela. Nepoznate vrijednosti se zanemaruju (zahtjev se nikada
ne odbija), a globalni glavni prekidač i dalje upravlja svime: kada je kompresija globalno isključena,
zaglavlje je ne može uključiti. Vrijednosti:

| Vrijednost    | Efekat                                                                                                       |
| ------------- | ------------------------------------------------------------------------------------------------------------ |
| `off`         | Nema kompresije za ovaj zahtjev.                                                                             |
| `default`     | Zadani profil izveden iz panela (zanemaruje aktivni profil). Mehanizmi s gubicima ostaju isključeni.         |
| `safe`        | Isto kao izostavljanje zaglavlja: samo deduplikacija i sažimanje razmaka.                                    |
| `allow-lossy` | Zadržava operaterski plan ovog zahtjeva, uključujući sažetke, filtere relevantnosti i izmjene stila.         |
| `engine:<id>` | Jedan mehanizam kada je omogućen, npr. `engine:rtk`. Ovo je uključivanje tog mehanizma po zahtjevu.          |
| `<combo>`     | Imenovana kombinacija, prvo uparena prema nazivu (bez razlikovanja velikih i malih slova), zatim prema ID-u. |

Bez `allow-lossy`, `engine:<id>` ili imenovane kombinacije, mehanizmi s gubicima se ne primjenjuju.
Zahtjev i dalje dobija deduplikaciju sesije i sažimanje razmaka kada je kompresija uključena.

Primijenjeni plan vraća se u zaglavlju odgovora `X-OmniRoute-Compression: <mode>; source=<source>`,
gdje je `<source>` jedna od vrijednosti `request-header`, `routing-override`, `active-profile`,
`auto-trigger`, `default` ili `off`.

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

# Izlistaj pakete RTK filtera
curl http://localhost:20128/api/context/rtk/filters

# Direktno testiraj RTK s opcionalnim metapodacima naredbe
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

Pored 7 gore opisanih režima (izvor također prihvata režime `codex-responses` i
`omniglyph`, koje ovaj vodič ne obrađuje), odjeljci u nastavku obrađuju funkcije
koje rade unutar tih režima ili zajedno s njima: Kompresija rezultata alata i Progresivno starenje
predstavljaju korake 1 i 2 agresivnog mehanizma (Agresivni režim i korak `aggressive`
složenog cjevovoda), Složeni cjevovod određuje kako radi Složeni režim, Kompresija svjesna
keša snižava `aggressive` i `ultra` na `standard` za pružaoce usluga s keširanjem dok je kompresija
uključena, a Režim pećinskog izlaza i Stilovi izlaza predstavljaju opcionalne instrukcije sistemskog odzivnika,
podrazumijevano isključene, koje oblikuju izlaz modela umjesto kompresije zahtjeva.

### Kompresija svjesna keša

Neki pružaoci usluga (poput Anthropica s keširanjem odzivnika) podržavaju **keširanje odzivnika**,
što im omogućava da keširaju dijelove odzivnika radi smanjenja troškova i kašnjenja. Kada
je keširanje omogućeno, agresivna kompresija zapravo može **pogoršati** performanse
jer mijenja keširane tokene i time poništava keš.

Modul `cachingAware.ts` ovo rješava **otkrivanjem konteksta keširanja** i
**prilagođavanjem strategije kompresije** u skladu s tim.

#### Kako radi

1. **Otkrivanje konteksta keširanja** — Pretražuje tijelo zahtjeva radi oznaka `cache_control`
2. **Prepoznavanje pružalaca usluga s keširanjem** — Provjerava podržava li ciljni pružalac usluga keširanje
3. **Prilagođavanje strategije** — Snižava `aggressive`/`ultra` na `standard` za pružaoce usluga s keširanjem
4. **Preskakanje sistemskog odzivnika** — Sistemski odzivnici se obično keširaju, pa ih ne treba kompresovati

Pomoćna funkcija za strategiju također vraća oznaku `deterministicOnly`, ali alat za izgradnju plana koristi
samo strategiju — trenutno ništa u daljnjoj obradi ne čita tu oznaku.

#### Primjer koda

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Oznaka keša
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Kada koristiti

Kompresija svjesna keša je **uvijek uključena** — nije potrebna nikakva konfiguracija. Aktivira se kad god
je kompresija uključena, a ciljni pružalac usluga podržava keširanje odzivnika (Anthropic, OpenAI
itd.); eksplicitne oznake `cache_control` nisu obavezne — sam pružalac usluga s keširanjem
pokreće snižavanje, dok same oznake to nikad ne čine (otkrivanje oznaka služi za telemetriju
keša, a ne za odluku o strategiji).

### Progresivno starenje

Dugi razgovori akumuliraju mnogo razmjena poruka, ali starije razmjene postaju manje
relevantne. Modul `progressiveAging.ts` **degradira poruke prema udaljenosti razmjene**
(udaljenost se mjeri od kraja razgovora). Uz isporučene zadane vrijednosti
(`verbatim: 2, light: 2, moderate: 3`):

- **Posljednje 2 razmjene (udaljenost ≤ 2)**: Zadržavaju se doslovno
- **Udaljenost 3**: Pećinska kompresija (uklanjanje suvišnih riječi)
- **Udaljenost 4+**: Poruke asistenta se sažimaju; korisničke poruke svode se na njihov prvi
  red, ograničen na 120 znakova; ostale uloge ostaju neizmijenjene. Sistemski odzivnici, već ostarjele
  poruke i najnovija korisnička poruka uvijek se zadržavaju doslovno bez obzira na udaljenost.
  Ništa se ne odbacuje u potpunosti, a pojas `light`
  nije dostupan s isporučenim zadanim vrijednostima (`light` je jednak `verbatim`).

#### Primjer koda

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... još 50 razmjena ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // posljednje 3 razmjene: doslovno
  light: 8, // udaljenost <= 8: lagana kompresija
  moderate: 20, // udaljenost <= 20: pećinska kompresija
  fullSummary: 5, // zahtijeva ga tip, ali ga kod za raspoređivanje u pojaseve ne čita
  // udaljenost > 20: sažeto (asistent) / zadržan prvi red (korisnik)
});

// saved = broj sačuvanih tokena
```

#### Kada koristiti

Progresivno starenje je **uvijek uključeno** za režim `aggressive` — to je korak 2 funkcije
`compressAggressive()`. Režim Ultra ga ne izvršava. Posebno je učinkovito za:

- Dugotrajne sesije programiranja
- Višednevne razgovore
- Agentske tokove rada s mnogo poziva alata

### Režim pećinskog izlaza

Režim pećinskog izlaza dodaje **instrukcije sistemskog odzivnika** koje od samog modela traže
sažet izlaz — nivo `lite` traži sažete odgovore koji zadržavaju potpune rečenice, `full`
traži da „odgovara sažeto poput pametnog pećinskog čovjeka“, a `ultra` traži telegrafski izlaz;
instrukcije samo postavljaju zahtjev i ne mogu garantovati njegovo ispunjenje. Zahtjevi ih primaju putem
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`):
`open-sse/handlers/chatCore.ts` prvo razrješava odabir pomoću sloja za kompatibilnost unazad
(`resolveOutputStyleSelection()` u
`open-sse/services/compression/outputStyles/backCompat.ts`), koji, dok je `outputStyles`
prazan, mapira omogućeni `cavemanOutputMode` na stil izlaza `terse-prose` pri intenzitetu
`cavemanOutputMode.intensity` (pogledajte Kompatibilnost unazad u nastavku); odabir `outputStyles`
koji nije prazan koristi se bez izmjena, a `cavemanOutputMode.enabled` i `intensity` tada nemaju
učinka, dok se njegov prekidač `autoClarity` i dalje primjenjuje. `outputMode.ts` sadrži
tekstove instrukcija (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), zaobilaženje sadržaja i
pomoćnu funkciju za pozicioniranje koju koristi ubacivanje; njegov vlastiti ubacivač `applyCavemanOutputMode()` nema
pozivaoca u produkciji.

#### Kako radi

Ovaj način rada ne kompresuje ulaz. Dodaje blok uputa sistemskom promptu
(pogledajte Kako umetanje funkcioniše u nastavku), a svaki način kompresije ulaza odabran za zahtjev
i dalje se izvršava nakon toga, nad tijelom koje sada sadrži taj blok. Prije zajedničke
klauzule o granicama kojom se završava svaki nivo, engleski nivo `full` glasi:

> "Odgovaraj sažeto kao pametan pećinski čovjek. Izostavi članove (a/an/the), suvišne riječi (just/really/basically/actually/simply), učtivosti, ograđivanje. Fragmenti su u redu. Kratki sinonimi (big, ne extensive; fix, ne implement). Zadrži sav tehnički sadržaj, kôd, greške, URL-ove i identifikatore neizmijenjenima."

Ovo posebno dobro funkcioniše za:

- Generisanje koda (sažetiji izlaz = manje tokena)
- Brza pitanja i odgovore (nema potrebe za detaljnim objašnjenjima)
- Grupnu obradu (maksimalna propusnost)

#### Kada koristiti

Caveman izlazni način rada je **opcionalan**. Kada je kompresija uključena (`enabled: true`, glavni prekidač
na stranici Postavke kompresije), uključite ga pomoću `cavemanOutputMode.enabled`; `intensity`
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

Prekidač **Izlazni način rada** kombinacije kompresije (`outputMode`, s nivoom u `outputModeIntensity`)
postavlja isti prekidač za zahtjeve na koje se ta kombinacija primjenjuje, a MCP alat
`omniroute_set_compression_engine` zapisuje ga putem svog Booleovog argumenta `outputMode`.
Odabir `outputStyles` koji nije prazan ima prednost nad ovim prekidačem. Na
kontrolnoj ploči omogućavanje izlaznog stila **Sažeta proza** umeće isti blok (pogledajte Izlazni
stilovi u nastavku).

### Izlazni stilovi (katalog)

Gore navedeni Caveman izlazni način rada predstavlja **naslijeđenu putanju jednog stila**. Faza 4 ga je generalizovala
u katalog izlaznih stilova koji se mogu kombinovati: `OUTPUT_STYLE_CATALOG` u
`open-sse/services/compression/outputStyles/catalog.ts`. Svaki stil je uputa sistemskog prompta
koja od samog modela traži ekonomičniji izlaz; stilovi se mogu omogućiti
zajedno i umeću se redoslijedom iz kataloga.

| Stil                                  | `id`            | Šta radi                                                                                                                                                                                                                                                                               | Jezici uputa                                    |
| ------------------------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| Sažeta proza                          | `terse-prose`   | Izostavlja suvišne riječi/članove/ograđivanje; čuva tačan tehnički sadržaj. Isti tekst kao u naslijeđenom Caveman izlaznom načinu rada (referenciran, ne prepisan).                                                                                                                    | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi   |
| Manje koda                            | `less-code`     | YAGNI ljestvica: najmanja funkcionalna izmjena, bez netraženih apstrakcija.                                                                                                                                                                                                            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi   |
| Konjski rep (lijeni senior programer) | `ponytail`      | "Najbolji kôd je kôd koji nikad nije napisan": ponovna upotreba > ponovno pisanje, osnovni uzrok > simptom, najkraća funkcionalna razlika.                                                                                                                                             | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi   |
| Imam ADHD (radnja na prvom mjestu)    | `i-have-adhd`   | Prvo radnja (naredba/putanja/isječak prije proze), numerisani ograničeni koraci, JEDAN konkretan sljedeći korak, bez uvoda/sažetka/završnih fraza. Prilagođeno iz [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT).                                                   | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi   |
| Antislop UI filter                    | `antislop-ui`   | Svaka vizuelna tehnika mora proći test svrhe (hijerarhija, identitet, čitljivost); bez zadanih gradijenata/stakla/sjaja, ograničena paleta, bez šablonskih rasporeda. Oba antislop stila dodaju granicu bez nefunkcionalnih kontrola / izmišljenih tvrdnji.                            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi   |
| Antislop filter teksta i ljudskosti   | `antislop-copy` | Konkretan tekst (bez duge crtice, generičkih poziva na radnju, pomodnih izraza, završnih fraza chatbota i izmišljenih činjenica), uz pravila za ljude: WCAG AA kontrast, vidljiv fokus, pristup tastaturom, prazna stanja/stanja učitavanja/greške, prilagođavanje mobilnim uređajima. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi   |
| Sažeti CJK (文言)                     | `terse-cjk`     | Odgovor na `full`/`ultra` nivou na klasičnom kineskom (文言); `lite` traži samo kratke odgovore bez funkcionalnih riječi, učtivosti ili ukrasa.                                                                                                                                        | zh (ograničeno lokalizacijom, pogledajte ispod) |

Svaki stil dolazi s tri nivoa intenziteta — `lite`, `full`, `ultra` — a svaki nivo
završava zajedničkom klauzulom o granicama (`SHARED_BOUNDARIES` u `outputMode.ts`), koja
čuva blokove koda, putanje datoteka, naredbe, greške i URL-ove neizmijenjenima. Tekstovi nivoa
`terse-prose` i `terse-cjk` toj listi dodaju identifikatore.

`terse-cjk` je ograničen na lokalizaciju `zh` na dva mjesta. Stranica Postavke kompresije prikazuje
njegov red samo kada je jezik korisničkog interfejsa kontrolne ploče kineski (`zh-CN` ili `zh-TW`), a
`applyOutputStyles()` ga umeće samo kada je razriješeni jezik zahtjeva (pogledajte Odabir jezika
u nastavku) `zh`. Skrivanje reda ne briše sačuvani odabir `terse-cjk`:
API postavki prihvata bilo koji ID stila, a čuvanje drugih stilova na stranici ga zadržava. U
vrijeme obrade zahtjeva, provjera jezika u `applyOutputStyles()` jedino je lokalizacijsko ograničenje.

#### Kako umetanje funkcioniše

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) razrješava
odabir prema katalogu (nepoznati ID-jevi i stilovi koji ne odgovaraju lokalizaciji
odbacuju se, bez greške; odabir koji se ne razriješi ni u jedan stil ostavlja tijelo
nepromijenjenim, preskočeno kao `no_styles`), spaja odabrane upute redoslijedom iz
kataloga, dodaje klauzulu o granicama **jednom** (zajedno sa sigurnosnom klauzulom,
`SAFETY_BOUNDARIES` ili njenim prijevodom, kada je odabran `less-code` ili `ponytail`) i
započinje blok jednim markerom idempotentnosti (`[OmniRoute Output Styles]`), tako da
ponovna primjena ne radi ništa. Kada razriješeni jezik (pogledajte Odabir jezika ispod)
ima prijevod, umjesto engleske upute umeće se lokalizirana uputa.

Na tijelu s nepraznim nizom `messages`, provjera idempotentnosti izvršava se prije
zaobilaženja sadržaja: kada se marker `[OmniRoute Output Styles]` već nalazi u polju
`system` najvišeg nivoa (niz znakova ili niz blokova sadržaja) ili u sistemskoj poruci sa
sadržajem u obliku niza znakova, tijelo ostaje nepromijenjeno kao `already_applied` i
provjera ključnih riječi se ne izvršava. U suprotnom, zaobilaženje sadržaja
(`shouldBypassCavemanOutputMode()` u
`open-sse/services/compression/outputMode.ts`) provjerava tekst posljednje tri poruke,
bez obzira na njihovu ulogu, i preskače stilove za cijeli potez kada taj tekst odgovara
ključnim riječima za sigurnost, nepovratnu radnju ili pojašnjenje, odnosno redoslijedu
osjetljivom na poredak: `first`, `then`, `after that`, `before`, `rollback` ili
`backup`, nakon čega unutar 240 znakova slijedi `delete`, `drop`, `migrate`, `deploy` ili
`release`. Zaobilaženje se izvršava dok je uključen prekidač **Auto-Clarity Bypass**
(`cavemanOutputMode.autoClarity`, podrazumijevano uključen); isključivanjem prekidača
preskače se provjera ključnih riječi.

Kada zaobilaženje propusti potez, `placeSystemInstruction()` (ista datoteka), koji
nikada ne kreira novi `messages[0]`, smješta blok na prvo od sljedećih mjesta koje
pronađe:

1. Početna sistemska poruka sa sadržajem u obliku niza znakova: blok se dodaje nakon
   njenog teksta.
2. Polje `system` najvišeg nivoa: blok se dodaje nakon teksta niza znakova ili kao novi
   tekstualni blok u niz blokova sadržaja.
3. Prva kasnija sistemska poruka sa sadržajem u obliku niza znakova: blok se dodaje nakon
   njenog teksta.
4. Ništa od navedenog: blok se smješta u novu sistemsku poruku na kraju niza `messages`.

Na tijelu bez niza `messages` (ili s praznim nizom) ne izvršava se zaobilaženje sadržaja
i polje `system` najvišeg nivoa se ne provjerava. Blok se dodaje nakon teksta polja
`instructions` u obliku niza znakova, osim ako to polje već sadrži marker
`[OmniRoute Output Styles]`, u kojem slučaju tijelo ostaje nepromijenjeno kao
`already_applied`. Kada tijelo nema polje `instructions` u obliku niza znakova, ali
sadrži `input` (niz znakova ili niz), blok postaje `instructions`, zamjenjujući svaku
vrijednost tog polja koja nije niz znakova. Tijelo koje nema ni polje `instructions` u
obliku niza znakova ni `input` u obliku niza znakova ili niza ostaje nepromijenjeno i
preskače se kao `no_messages`.

#### Kako omogućiti

Na kontrolnoj ploči: **Kontekst kompresije → Postavke kompresije**
(`/dashboard/context/settings`), odjeljak Stilovi izlaza: po jedan red za svaki stil, s
prekidačem za uključivanje/isključivanje i biračem nivoa. Stilovi se umeću dok je sama
kompresija uključena (glavni prekidač stranice, `enabled`). Prekidač **Auto-Clarity
Bypass** nalazi se na stranici **Caveman** (`/dashboard/context/caveman`), na njenoj
kartici **Izlazni način rada**. Programska konfiguracija kompresije čuva odabir kao:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Kompatibilnost unazad: dok je `outputStyles` prazan, zastarjela postavka
`cavemanOutputMode.enabled` mapira se na `terse-prose` pri
`cavemanOutputMode.intensity`. Blok tada počinje markerom
`[OmniRoute Output Styles]`, dok je zastarjeli injektor `applyCavemanOutputMode()`
umetao `[OmniRoute Caveman Output Mode]`. Ispod markera tekst odgovara zastarjelom
umetanju na jezicima en, pt-BR, es, de, fr, it, ru, id i vi; na jezicima ja i zh sadrži
jedan dodatni razmak prije klauzule o granicama. `terse-prose` se prevodi na pt-BR, es,
de, fr, it, ru, zh, ja, id i vi, pa zahtjev čiji je razriješeni jezik `hu` dobija
engleski tekst tamo gdje je zastarjeli injektor koristio mađarski tekst.

Odabir jezika izlaznog stila (`resolveOutputStyleLanguage()` u
`outputStyles/apply.ts`): kada je `languageConfig.enabled` uključen, `autoDetect` uzima
uzorak iz najnovije korisničke poruke u nizu `messages` zahtjeva koja sadrži tekst
(sadržaj u obliku niza znakova ili `text` njenih dijelova sadržaja) i nad njim pokreće
detektor Caveman mehanizma (`detectCompressionLanguage()`). Detektor vraća `zh` za tekst
s Han znakovima bez kane; u suprotnom vraća onaj od jezika `it`, `pt-BR`, `es`, `de`,
`fr`, `ru`, `ja`, `hu` i `id` koji ima najviše podudaranja s naznakama, odnosno `en`
kada nema podudaranja — tekst koji ne može klasificirati dobija engleski, nikada
`defaultLanguage`, a `vi` se nikada ne detektuje iako stilovi isporučuju tekst na jeziku
`vi`. Tijelo Responses API-ja čuva svoje poteze u `input`, iz kojeg se ne uzima uzorak,
pa dobija `defaultLanguage`, a zatim engleski. Kada nijedna korisnička poruka u
`messages` ne sadrži tekst ili kada je `autoDetect` isključen, primjenjuje se
`defaultLanguage`, a zatim engleski. Kada je `languageConfig.enabled` isključen, jezik
je engleski — osim ako se na zahtjev primjenjuje kombinacija kompresije (kombinacija
dodijeljena kombinaciji usmjeravanja zahtjeva ili podrazumijevana kombinacija kompresije
na koju se chatCore vraća za ugrađeni naslagani cjevovod): primjena kombinacije uključuje
`languageConfig.enabled` za taj zahtjev i postavlja `defaultLanguage` iz jezičkih paketa
kombinacije (sačuvana vrijednost ako pripada paketima kombinacije, u suprotnom prvi
paket kombinacije, koji podrazumijevano ima vrijednost `en`), dok se sačuvani
`autoDetect` (podrazumijevano uključen) i dalje primjenjuje. Caveman mehanizam za ulaz
drugačije bira jezik paketa pravila — za svaki tekstualni dio zasebno i, kada je
automatsko otkrivanje isključeno, uslovljeno postavkom `enabledPacks`.

Matrica stilova × jezika fiksirana je testom
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: svaki stil kataloga mora imati
unos u testnom skupu `BASELINE_LANGUAGES`; stil koji nije ograničen lokalizacijom mora
imati pt-BR prijevod (stil `terse-cjk`, koji je ograničen lokalizacijom, izuzet je od
ovog pravila), osim ako je naveden u `KNOWN_ENGLISH_ONLY`, koji smije sadržavati samo
stilove bez ikakvih prijevoda — navedeni stil koji ima bilo koji prijevod ne prolazi
test; stil također ne prolazi test ako izgubi jezik naveden u njegovom unosu u
`BASELINE_LANGUAGES`. Za dodavanje stila pogledajte
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Kompresija rezultata alata

`compressToolResult()` u `open-sse/services/compression/toolResultCompressor.ts`
komprimira tekst rezultata alata pomoću **5 strategija**. Isprobava ih ovim redoslijedom,
a prva omogućena strategija čija provjera odgovara sadržaju određuje rezultat:

1. **`fileContent`**: sadržaj od 3 ili više redova u kojem barem jedan red, zanemarujući
   početno uvlačenje, počinje sa `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` ili `return ` (ključna riječ praćena razmakom), ili sa `if`,
   `for` ili `while` nakon čega slijedi `(` ili ` (`, zadržava prvih 20 i posljednjih 5
   redova, uz oznaku izostavljene sredine.
2. **`grepSearch`**: sadržaj s barem jednim redom oblika `<path>:<digits>:`,
   gdje tekst prije prve dvotačke nema razmake, zadržava samo takve redove, najviše 30,
   nakon čega slijede broj svih dodatnih podudaranja i spisak datoteka s podudaranjima;
   svaki drugi red se odbacuje. Jedan takav red dovoljan je za aktiviranje strategije,
   pa se i red dnevnika koji počinje vremenskom oznakom poput `12:30:45` računa.
3. **`shellOutput`**: izlaz koji sadrži ANSI CSI sekvencu (`ESC[` nakon čega slijede
   cifre ili tačke-zarezi, a zatim slovo, kao u kodovima boja) ili znak `$` nakon kojeg
   bilo gdje u tekstu slijedi razmak, gubi te sekvence (druge izlazne sekvence, poput
   `ESC[?25l` ili OSC sekvence naslova prozora, zadržavaju se) i zadržava posljednjih 50
   redova, uz sažimanje uzastopnih ponovljenih redova. Budući da se ova provjera izvršava
   prije `json` i `errorMessage`, JSON ili izlaz greške koji sadrži takav `$` nikada ne
   stiže do njih dok je `shellOutput` uključen.
4. **`json`**: JSON sadržaj duži od 2.000 znakova koji počinje sa `{` ili `[` (nakon
   opcionalnih razmaka) i koji se može raščlaniti sažima se: niz s više od 7 stavki
   zadržava prvih 5 i posljednje 2 stavke te ukupan broj, a objekt zadržava prvih 20
   ključeva, pri čemu se vrijednost svakog ugniježđenog objekta ili niza zamjenjuje
   oznakom `{…N keys}` (za niz je N njegova dužina) i oznakom `_remaining_<N>_keys`
   koja broji ključeve odbačene nakon prvih 20. Skalarne vrijednosti kopiraju se u
   cijelosti, pa se objekt s 20 ili manje ključeva bez ugniježđenih vrijednosti samo
   ponovo uvlači — minificirani objekt dobija dodatne znakove i ostaje nepromijenjen.
5. **`errorMessage`**: izlaz koji bilo gdje i bez obzira na velika i mala slova sadrži
   `error:`, `error ` (riječ nakon koje slijedi razmak, kao u `no error found`),
   `[error]`, `exception:`, `exception `, `[exception]` ili `traceback` zadržava prvi
   red, sljedećih 10 redova i posljednja 3, uz oznaku `… [N frames elided] …` umjesto
   redova između njih. Oznaka se pojavljuje samo kada nakon prvog reda slijedi više od
   13 redova, pa se izlaz greške od 14 ili manje redova ne skraćuje (kod 12 ili 13
   redova posljednja 3 ponavljaju već zadržane redove).

Nakon što strategija pronađe podudaranje, čak i ako ništa ne uštedi, kasnije strategije
se ne isprobavaju. Kada odgovarajuća strategija ne uštedi nijedan procijenjeni token
(dužina ÷ 4, zaokruženo naviše) — na primjer, datoteka nalik kodu s 25 ili manje redova
ili JSON niz duži od 2.000 znakova sa 7 ili manje stavki — agresivni mehanizam zadržava
izvorni rezultat alata: oba pozivaoca (`compressAggressive()` i
`compressAnthropicToolResultBlock()`) zadržavaju izvornik kada je `saved` 0 ili manje,
dok sam `compressToolResult()` i dalje vraća izlaz te strategije. Korak obrade rezultata
alata nije posljednja instanca: rezervni sažimač mehanizma i dalje može skratiti poruku
tipa `tool` ili `function` dužu od 8.192 znaka (`maxTokensPerMessage`, 2.048, pomnoženo
sa 4).

#### Kada koristiti

Kompresija rezultata alata prvi je korak agresivnog mehanizma (`compressAggressive()` u
`open-sse/services/compression/aggressive.ts`), pa se izvršava u agresivnom režimu i u
koraku `aggressive` složenog cjevovoda. Komprimira poruke tipa `tool` i `function` u
OpenAI formatu te tekst unutar Anthropic blokova `tool_result`. Svaka strategija ima
vlastiti prekidač pod `aggressive.toolStrategies`, a svi su podrazumijevano uključeni.
Na kontrolnoj ploči prekidači se nalaze u prikazu **Advanced** na stranici Caveman dok
je kompresija uključena i podrazumijevani režim postavljen na Aggressive.

### Složeni cjevovod

Složeni režim pokreće **više mehanizama uzastopno** — obično prvo RTK
(60-90% uštede na izlazu alata), a zatim Caveman na preostalom tekstu (~46% uštede
ulaza). U kombinaciji, to daje **prihvatljivi raspon od 78-95%** (pogledajte prethodni
odjeljak o matematici uštede uzvodno): `1 - (1 - 0.60..0.90) × (1 - 0.46)` u prosjeku
iznosi ≈89%.

#### Kako funkcionira

```
Ulaz (1000 tokena)
  → RTK (filter svjestan naredbi) → 200 tokena
    → Caveman (uklanjanje suvišnog sadržaja) → 108 tokena
  → Izlaz (108 tokena, ~89% uštede)
```

#### Kada koristiti

Koristite složeni režim za:

- Radne tokove s intenzivnom upotrebom alata (agentsko programiranje, istraživanje)
- Grupnu obradu osjetljivu na troškove
- Situacije kada vam je potrebna maksimalna ušteda tokena

Složeni cjevovodi konfiguriraju se putem globalne postavke kompresije
`stackedPipeline` ili putem imenovane kombinacije kompresije dodijeljene kombinaciji
usmjeravanja (pogledajte prethodni odjeljak o zamjeni postavki po kombinaciji) — ne
putem `modePack` automatske kombinacije (to polje samo ponovo ponderira odabir modela
automatske kombinacije, a `stacked` nije važeći naziv paketa).

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
