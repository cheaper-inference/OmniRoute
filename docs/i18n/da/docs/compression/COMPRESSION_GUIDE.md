# 🗜️ Prompt Compression Guide — OmniRoute (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Spar automatisk 15-95 % på kvalificeret kontekst. For et hurtigt overblik, se [README-afsnittet om komprimering](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Overblik

OmniRoute implementerer en modulær pipeline til promptkomprimering, der kører **proaktivt**, før anmodninger når upstream-udbydere. Det betyder, at dine tokenbesparelser sker transparent — uden behov for ændringer i din arbejdsgang.

```
Klientanmodning
  → Valg af komprimeringsstrategi
    → Combo-tilsidesættelse? → Brug combo-indstilling
    → Tærskel for automatisk aktivering? → Brug automatisk tilstand
    → Standardtilstand? → Brug global indstilling
    → Fra? → Spring komprimering over
  → Valgt komprimeringstilstand
    → Fra: Ingen komprimering
    → Lite: Sikker oprydning af blanktegn/formatering (~15 %)
    → Standard: Fjernelse af fyldord i telegramstil (~30 %)
    → Aggressive: Aldring af historik + opsummering (~50 %)
    → Ultra: Heuristisk beskæring + udtynding af kodeblokke (~75 %)
    → RTK: Kommandobevidst filtrering af terminal-/værktøjsoutput (60-90 % upstream-interval)
    → Stacked: Ordnet pipeline med flere motorer, normalt RTK efterfulgt af Caveman (78-95 % kvalificeret interval)
  → Komprimeret anmodning → Udbyder
```

---

## Komprimeringstilstande

### Fra

Ingen komprimering anvendes. Alle beskeder passerer uændret igennem.

### Lite-tilstand (~15 % besparelse, <1 ms latenstid)

Den sikreste tilstand — nul semantisk ændring, kun oprydning i formatering:

| Teknik                   | Beskrivelse                                                       |
| ------------------------ | ----------------------------------------------------------------- |
| `collapseWhitespace`     | Flet på hinanden følgende tomme linjer og efterstillede mellemrum |
| `dedupSystemPrompt`      | Fjern duplikerede systembeskeder                                  |
| `compressToolResults`    | Komprimér udførlige værktøjs-/funktionsoutput                     |
| `removeRedundantContent` | Fjern gentagne instruktioner                                      |
| `replaceImageUrls`       | Forkort base64-billeddata-URI'er                                  |

**Bedst til:** Altid-aktiveret brug, sikkerhedskritiske arbejdsgange.

### Standardtilstand (~30 % besparelse)

Inspireret af [Caveman](https://github.com/JuliusBrussee/caveman) — fjerner fyldord og udførlige formuleringer, mens betydningen bevares:

- Fjerner fyldord ("please", "I think", "basically", "actually")
- Fortætter udførlige fraser ("in order to" → "to", "as a result of" → "because")
- Fjerner høflige forbehold ("Would you mind...", "If you could possibly...")
- 30+ regex-regler tilpasset kodningsprompter

**Bedst til:** Daglige kodningsarbejdsgange, omkostningsbevidste teams.

### Aggressiv tilstand (~50 % besparelse)

Smart historikstyring til lange sessioner:

- **Beskedældning** — ældre beskeder komprimeres gradvist
- **Komprimering af værktøjsresultater** — lange værktøjsoutput afkortes eller udelades (første/sidste linjer,
  matchlinjefiltrering, JSON-nøglefortætning)
- **Strukturelle integritetsvagter** — sikrer, at `tool_use` + `tool_result`-par forbliver konsistente
- **Kontekstvinduesbevidsthed** — respekterer token-grænser pr. model

**Bedst til:** Længerevarende fejlfindingssessioner, store kodebaser.

### Ultra-tilstand (~75 % besparelse)

Maksimal komprimering til token-kritiske scenarier:

- **Heuristisk beskæring** — scorebaseret tokenbeskæring af prosa
- **Strukturbevarelse** — afgrensede kodeblokke, inline-kode, URL'er og identifikatorer
  tombstones og samles igen ordret, beskæres aldrig
- **Valgfrit SLM-niveau** — en lille lokal model kan forfine beskæringen, når den er konfigureret
- Uafhængig af Aggressiv tilstand: den kører ikke beskedældning, komprimering af
  værktøjsresultater eller fallback-opsummeringen (kun en fejl i SLM-niveauet kan dirigere
  en fallback-gennemgang gennem aggressiv)

**Bedst til:** Når du gentagne gange rammer kontekstgrænserne.

### RTK-tilstand (60–90 % opstrømsinterval)

RTK-tilstand er optimeret til udførlige værktøjsoutput, der optræder i kodningsagentsessioner:

- Registrerer kommando-/outputklasser som `git status`, `git diff`, `git log`, testkørere,
  TypeScript/Vite/Webpack-builds, ESLint/Biome/Prettier, npm audit/installationer, Docker-logge,
  infrastrukturoutput og generelt shell-output
- Anvender JSON-filterpakker fra `open-sse/services/compression/engines/rtk/filters/`
- Importerer RTK TOML-skema v1-filtre fra projekt- eller globale `filters.toml`-filer, med
  inline-testvalidering og trust-gating for projektfiler
- Leveres med 56 indbyggede filtre med inline-verificeringseksempler
- Fjerner ANSI-kontrolsekvenser, statuslinjer, gentagne linjer og ikke-handlingsbart støj
- Bevarer fejl, fejlmeddelelser, advarsler, ændrede filer, opsummeringer og slutningen af langt output
- Understøtter trust-gatede projektfiltre, globale filtre og valgfri gendannelse af redigeret råoutput

**Bedst til:** Agentsessioner med shell-, build-, test-, git-, grep- og filoutputtransskriptioner.

### Stakket tilstand (78–95 % berettiget interval)

Stakket tilstand kører flere komprimeringsmotorer i en deterministisk rækkefølge. Standardpipelinen er:

```txt
RTK -> Caveman
```

Denne rækkefølge holder terminal-/værktøjsoutput kompakt først og anvender derefter Cavemans semantiske
fortætning på den resterende naturligsproglige prompt. Stakkede pipelines kan konfigureres globalt eller
gennem komprimeringskombinationer tildelt routingkombinationer.

**Bedst til:** Blandet kontekst med store værktøjslogge plus menneskelige instruktioner eller assistentopsummeringer.

---

## Beregning af upstream-besparelser

OmniRoute dokumenterer komprimeringsbesparelser fra to kilder: benchmarks fra upstream-projekter og
OmniRoutes egen kombination af motorer.

| Kilde   | Tal fra upstream-README, der anvendes her                                                                                                  |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Caveman | `~75%` færre outputtokens, `65%` gennemsnitlig outputbesparelse i benchmarks, interval på `22-87%` og værktøj til `~46%` inputkomprimering |
| RTK     | `60-90%` besparelse på kommandooutput; eksempelsession med `~118,000 -> ~23,900` tokens eller `79.7%` sparet (`~80%`)                      |

For overlappende værktøjs-/kontekstpayloads stakker OmniRoutes standardkombination motorerne:

```txt
RTK -> Caveman
```

De kombinerede besparelser er multiplikative, ikke additive:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Tallet `78-95%` gælder, når både RTK og Caveman kan reducere den samme input-/kontekstpayload.
Cavemans tilstand for responsoutput er separat: Når den er aktiveret, skal Cavemans egne outputbesparelser bruges (`65%`
i gennemsnit, `~75%` som hovedtal, interval på `22-87%`). De samlede faktureringsbesparelser afhænger af din fordeling mellem prompts og output.

### Hvad "kvalificeret" faktisk betyder

Det angivne interval på 15-95% er reelt, men det gælder kun for **redundant eller omstændeligt** indhold — gentagne
fejllinjer, en build-log, der spammer den samme advarsel, eller et overdimensioneret `grep`-/fillæsningsdump. Det
betyder **ikke**, at hver anmodning sparer så meget.

Empirisk verificeret (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): En
`stacked`-kørsel (RTK + Caveman) mod en Anthropic-formet `tool_result`-blok med 300 identiske
fejllinjer gav **95.93% tokenbesparelse / 96.26% tegnbesparelse** — helt inden for det annoncerede
interval. Men når den samme pipeline køres mod normalt, ikke-redundant værktøjsoutput (en ren liste over `grep`-resultater,
en kort fillæsning eller almindelig samtaletekst), giver den korrekt **næsten ingen besparelse**, fordi
der ikke er noget gentaget at fjerne, og `validateCompression()` (`validation.ts`) nægter at levere en
omskrivning, som ville fjerne eller ændre kodeblokke, URL'er, overskrifter, versioner eller konstant-id'er, der udelukkende består af STORE BOGSTAVER.

Dette er forventet og sikker adfærd, ikke en fejl: En kodningssession, der primært læser eller søger i rene filer,
vil opleve beskedne samlede besparelser, selv når komprimering er fuldt aktiveret, mens en session, der rammer en fejlende
løkke eller en snakkesalig linter, vil opnå hele intervallet på 78-95% for den trafik. Brug ikke en enkelt sessions
lave samlede besparelsesprocent som bevis på, at komprimeringen er fejlkonfigureret — kontrollér først, om det
underliggende værktøjsoutput faktisk var redundant.

---

## Visualisering af tokenbesparelser

```
Uden komprimering: 47K tokens sendt til LLM
Med Lite:          40K tokens sendt          (15% sparet — sikker, altid aktiveret)
Med Standard:      33K tokens sendt          (30% sparet — regler for hulemandssprog)
Med Aggressive:    24K tokens sendt          (50% sparet — aldring + opsummering)
Med Ultra:         12K tokens sendt          (75% sparet — heuristisk beskæring)
Med RTK:           19K-5K tokens sendt       (60-90% sparet på kommando-/værktøjsoutput)
Med Stacked:       10K-2.5K tokens sendt     (78-95% kvalificeret interval for RTK+Caveman)
```

---

## Konfiguration

### Dashboard

Naviger til `Dashboard → Context & Cache`:

- **Caveman** — valg af tilstand, sprogpakker, forhåndsvisning og globale standardindstillinger
- **RTK** — forhåndsvisning af kommandofilter, RTK-sikkerhedsindstillinger og filterkatalog
- **Komprimeringskombinationer** — navngivne engine-pipelines, der er tildelt routingkombinationer
- **Tærskel for automatisk aktivering** — aktivér automatisk komprimering, når antallet af tokens overstiger tærsklen

### Tilsidesættelse pr. kombination

I `Dashboard → Context & Cache → Compression Combos` skal du tildele en komprimeringskombination til en routingkombination:

```txt
Kombination: "free-tier-fallback"
  Komprimeringskombination: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Mål:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Dette giver dig mulighed for at bruge stakket komprimering hos gratis/kodningsudbydere, mens lite-tilstand bevares for betalte abonnementer.

Denne tildeling af "Tilsidesættelse pr. kombination" er en anden indstilling end tilsidesættelsen af **routingkombinationens komprimeringstilstand** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — feltets skema accepterer også `rtk`, `stacked` og `omniglyph`) — denne tilsidesættelse vælger ikke en navngiven pipeline for en komprimeringskombination; den indstiller blot feltet `compressionMode`, som bruges af `resolveCompressionPlan`. Den kan indstilles enten på kombinationskortet (`Dashboard → Combos`) eller, siden #6760, pr. routingkombination på listen "Assign to routing" under `Dashboard → Context & Cache → Compression Combos`, lige ved siden af afkrydsningsfeltet til pipeline-tildeling, der er dokumenteret ovenfor. Begge brugerflader gemmer via det samme `PUT /api/combos/{id}`-endpoint.

### Tilsidesættelse pr. anmodning

Send request-headeren `x-omniroute-compression` for at tilsidesætte komprimeringsplanen for en enkelt anmodning. Den har højeste prioritet — den tilsidesætter routingkombinationens tilsidesættelse, den aktive profil, automatisk aktivering og panelets standardindstilling. Ukendte værdier ignoreres (anmodningen afvises aldrig), og den globale hovedkontakt styrer fortsat alt: Når komprimering er slået fra globalt, kan headeren ikke slå den til. Værdier:

| Værdi         | Effekt                                                                                                                   |
| ------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `off`         | Ingen komprimering for denne anmodning.                                                                                  |
| `default`     | Den panelafledte standardprofil (ignorerer den aktive profil). Tabsbehæftede engines forbliver deaktiveret.              |
| `safe`        | Samme som at udelade headeren: kun deduplikering og sammenfoldning af blanktegn.                                         |
| `allow-lossy` | Behold denne anmodnings operatørplan, herunder resuméer, relevansfiltre og stilomskrivninger.                            |
| `engine:<id>` | En enkelt engine, når den er aktiveret, f.eks. `engine:rtk`. Dette er tilvalget pr. anmodning for den pågældende engine. |
| `<combo>`     | En navngiven kombination, der først matches efter navn (uden forskel på store og små bogstaver) og derefter efter id.    |

Uden `allow-lossy`, `engine:<id>` eller en navngiven kombination anvendes tabsbehæftede engines ikke. Anmodningen får stadig sessionsdeduplikering og sammenfoldning af blanktegn, når komprimering er slået til.

Den anvendte plan returneres i response-headeren `X-OmniRoute-Compression: <mode>; source=<source>`, hvor `<source>` er én af `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` eller `off`.

### API

```bash
# Hent komprimeringsindstillinger
curl http://localhost:20128/api/settings/compression

# Opdater komprimeringsindstillinger
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Forhåndsvis en specifik RTK/stacked-payload
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Vis RTK-filterpakker
curl http://localhost:20128/api/context/rtk/filters

# Test RTK direkte med valgfri kommando-metadata
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Hvad der beskyttes

Komprimeringsmotoren **bevarer altid:**

- ✅ Kodeblokke (indhegnede og integrerede)
- ✅ URL'er og filstier
- ✅ JSON-strukturer og strukturerede data
- ✅ Identifikatorer og beskyttede tekniske tokens
- ✅ Matematiske udtryk
- ✅ Definitioner af værktøjs-/funktionskald
- ✅ Systemprompter (i lite-tilstand)

RTK-gendannelse af råt output maskerer almindelige API-nøgler, bearer-tokens, Slack-tokens, AWS-adgangsnøgler,
adgangskoder, tokens og hemmeligheder, før noget gemmes.

---

## Komprimeringsstatistik

Hver komprimeret anmodning inkluderer statistik i serverlogfilerne:

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

## Køreplan for faser

| Fase    | Tilstande                                                                                                                                                       | Status     |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Fase 1  | Off, Lite                                                                                                                                                       | ✅ Udgivet |
| Fase 2  | Standard, Aggressive, Ultra                                                                                                                                     | ✅ Udgivet |
| Fase 3  | RTK, Stacked, Compression Combos                                                                                                                                | ✅ Udgivet |
| Fase 4  | Output Styles, SLM-tier Ultra, eval harness                                                                                                                     | ✅ Udgivet |
| Fase 4C | Adaptivt kontekstbudget ("drejeknap") — beregningsmotor + API (`contextBudget` på `PUT /api/settings/compression`) + tilstands-/politikkontroller i dashboardet | ✅ Udgivet |

---

## Anerkendelser

Komprimeringsreglerne i Standard-tilstand er inspireret af **[Caveman](https://github.com/JuliusBrussee/caveman)** af **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — det virale projekt "why use many token when few token do trick". Caveman rapporterer `~75%` færre outputtokens, en gennemsnitlig outputbesparelse på `65%` i benchmarks, et outputinterval på `22-87%` og et værktøj til inputkomprimering på `~46%`.

RTK-tilstand er inspireret af **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** af **[RTK AI](https://github.com/rtk-ai)** — højtydende projektet til komprimering af kommandooutput til filtrering af terminal-, build-, test-, git- og værktøjsoutput. RTK rapporterer besparelser på `60-90%`, og eksempelsessionen i projektets README viser en besparelse på `~80%`.

---

## Avancerede komprimeringssystemer

Ud over de 7 tilstande, der er beskrevet ovenfor (kilden accepterer også tilstandene `codex-responses` og
`omniglyph`, som denne vejledning ikke dækker), omhandler afsnittene nedenfor funktioner,
der fungerer i eller sammen med disse tilstande: Tool Result Compression og Progressive Aging
er trin 1 og 2 i den aggressive motor (Aggressive-tilstand og et `aggressive`-trin i en
stablet pipeline), Stacked Pipeline er den måde, Stacked-tilstand kører på, Cache-Aware Compression
nedgraderer `aggressive` og `ultra` til `standard` for cachingudbydere, mens komprimering
er slået til, og Caveman Output Mode og Output Styles er valgfrie systempromptinstruktioner,
som som standard er slået fra, og som former modellens output i stedet for at komprimere anmodningen.

### Cachebevidst komprimering

Nogle udbydere (som Anthropic med promptcaching) understøtter **promptcaching**,
hvilket giver dem mulighed for at cache dele af prompten for at reducere omkostninger og latenstid. Når
caching er aktiveret, kan aggressiv komprimering faktisk **forringe** ydeevnen,
fordi den ændrer de cachede tokens og dermed ugyldiggør cachen.

Modulet `cachingAware.ts` løser dette ved at **registrere cachingkonteksten** og
**justere komprimeringsstrategien** i overensstemmelse hermed.

#### Sådan fungerer det

1. **Registrér cachingkonteksten** — Scanner anmodningens body for `cache_control`-markører
2. **Identificér cachingudbydere** — Kontrollerer, om måludbyderen understøtter caching
3. **Justér strategien** — Nedgraderer `aggressive`/`ultra` til `standard` for cachingudbydere
4. **Spring systemprompten over** — Systemprompter caches normalt, så de skal ikke komprimeres

Strategihjælperen returnerer også et `deterministicOnly`-flag, men plankonstruktøren bruger
kun strategien — i dag læser intet efterfølgende flaget.

#### Kodeeksempel

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Cachemarkør
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Hvornår det skal bruges

Cachebevidst komprimering er **altid slået til** — ingen konfiguration er nødvendig. Den træder i kraft, når
komprimering er slået til, og måludbyderen understøtter promptcaching (Anthropic, OpenAI
osv.); eksplicitte `cache_control`-markører er ikke påkrævet — en cachingudbyder alene
udløser nedgraderingen, mens markører alene aldrig gør det (registrering af markører leverer data til
cachetelemetri, ikke til strategibeslutningen).

### Progressiv ældning

Lange samtaler akkumulerer mange beskedrunder, men ældre runder bliver mindre
relevante. Modulet `progressiveAging.ts` **forringer beskeder efter afstand i antal runder**
(afstanden måles fra samtalens slutning). Med de medfølgende standardindstillinger
(`verbatim: 2, light: 2, moderate: 3`):

- **De seneste 2 runder (afstand ≤ 2)**: Bevares ordret
- **Afstand 3**: Caveman-komprimering (fjernelse af fyldord)
- **Afstand 4+**: Assistentbeskeder opsummeres; brugerbeskeder reduceres til deres første
  linje, begrænset til 120 tegn; andre roller forbliver uændrede. Systemprompter, allerede ældede
  beskeder og den seneste brugerbesked bevares altid ordret uanset afstand.
  Intet fjernes helt, og `light`-intervallet
  kan ikke nås med de medfølgende standardindstillinger (`light` er lig med `verbatim`).

#### Kodeeksempel

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 runder mere ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // de seneste 3 runder: ordret
  light: 8, // afstand <= 8: let komprimering
  moderate: 20, // afstand <= 20: caveman-komprimering
  fullSummary: 5, // kræves af typen, men læses ikke af intervalkoden
  // afstand > 20: opsummeres (assistent) / første linje bevares (bruger)
});

// saved = antal sparede tokens
```

#### Hvornår det skal bruges

Progressiv ældning er **altid slået til** i `aggressive`-tilstand — det er trin 2 i
`compressAggressive()`. Ultra-tilstand kører den ikke. Den er
særligt effektiv til:

- Langvarige kodningssessioner
- Samtaler, der strækker sig over flere dage
- Agentbaserede arbejdsgange med mange værktøjskald

### Caveman-outputtilstand

Caveman-outputtilstand tilføjer **systempromptinstruktioner**, der beder selve modellen om
kortfattet output — niveauet `lite` beder om præcise svar, der bevarer hele sætninger, `full`
beder den om at "svare kortfattet som en klog hulemand", og `ultra` beder om telegrafisk output;
instruktioner kan kun anmode om dette, de kan ikke garantere det. Anmodninger modtager dem gennem
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`):
`open-sse/handlers/chatCore.ts` fastlægger først valget med bagudkompatibilitetslaget
(`resolveOutputStyleSelection()` i
`open-sse/services/compression/outputStyles/backCompat.ts`), som, når `outputStyles`
er tom, knytter en aktiveret `cavemanOutputMode` til outputstilen `terse-prose` med
`cavemanOutputMode.intensity` (se Bagudkompatibilitet nedenfor); et ikke-tomt `outputStyles`-valg
bruges, som det er, og `cavemanOutputMode.enabled` og `intensity` har derefter ingen
effekt, mens dets `autoClarity`-indstilling stadig gælder. `outputMode.ts` indeholder
instruktionsteksterne (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), omgåelsen baseret på indhold og
placeringshjælperen, som injektionen bruger; dets egen `applyCavemanOutputMode()`-injektor har ingen
produktionskalder.

#### Sådan fungerer det

Denne tilstand komprimerer ikke inputtet. Den føjer en instruktionsblok til systemprompten
(se Sådan fungerer injektion nedenfor), og enhver inputkomprimeringstilstand, der er valgt for anmodningen,
kører stadig bagefter på brødteksten, som nu indeholder blokken. Før den fælles
grænseklausul, som hvert niveau slutter med, lyder det engelske `full`-niveau:

> "Svar kortfattet som smart hulemand. Udelad artikler (a/an/the), fyldord (just/really/basically/actually/simply), høflighedsfraser og forbehold. Fragmenter er OK. Korte synonymer (big, ikke extensive; fix, ikke implement). Bevar alt teknisk indhold, kode, fejl, URL'er og identifikatorer nøjagtigt."

Dette fungerer særligt godt til:

- Kodegenerering (kortere output = færre tokens)
- Hurtige spørgsmål og svar (intet behov for udførlige forklaringer)
- Batchbehandling (maksimer gennemløb)

#### Hvornår det skal bruges

Caveman-outputtilstand er **tilvalg**. Når komprimering er aktiveret (`enabled: true`, hovedkontakten
på siden Compression Settings), slås den til med `cavemanOutputMode.enabled`; `intensity`
vælger `lite`, `full` eller `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

En komprimeringskombinations **Output Mode**-kontakt (`outputMode`, niveau i `outputModeIntensity`)
indstiller den samme kontakt for de anmodninger, som kombinationen gælder for, og MCP-værktøjet
`omniroute_set_compression_engine` skriver den via sit booleske `outputMode`-argument.
Et ikke-tomt `outputStyles`-valg har forrang for denne kontakt. Når outputstilen
**Terse prose** aktiveres i dashboardet, injiceres den samme blok (se Output Styles
nedenfor).

### Output Styles (katalog)

Caveman-outputtilstanden ovenfor er den **ældre vej med én enkelt stil**. Fase 4 generaliserede den
til et katalog med kombinerbare outputstile: `OUTPUT_STYLE_CATALOG` i
`open-sse/services/compression/outputStyles/catalog.ts`. Hver stil er en systempromptinstruktion,
der beder modellen selv om at generere billigere output. Flere stile kan aktiveres
samtidigt og injiceres i katalogrækkefølge.

| Stil                              | `id`            | Hvad den gør                                                                                                                                                                                                                                            | Instruktionssprog                             |
| --------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Kortfattet prosa                  | `terse-prose`   | Udelad fyldord/artikler/forbehold; bevar teknisk indhold nøjagtigt. Samme tekst som den ældre caveman-outputtilstand (refereret, ikke skrevet igen).                                                                                                    | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Mindre kode                       | `less-code`     | YAGNI-trin: mindste fungerende ændring, ingen abstraktioner, der ikke er anmodet om.                                                                                                                                                                    | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Hestehale (doven seniorudvikler)  | `ponytail`      | "Den bedste kode er den kode, der aldrig bliver skrevet": genbrug > omskrivning, grundårsag > symptom, korteste fungerende diff.                                                                                                                        | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Jeg har ADHD (handling først)     | `i-have-adhd`   | Handling først (kommando/sti/kodestykke før prosa), nummererede afgrænsede trin, ÉT konkret næste trin, ingen indledning/opsummering/afslutning. Tilpasset fra [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT).                       | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop-UI-filter                | `antislop-ui`   | Hver visuel teknik skal bestå en formålstest (hierarki, identitet, læsbarhed); ingen standardgradienter/glas/glød, begrænset palet, ingen skabelonlayouts. Begge antislop-stile tilføjer en grænse mod inaktive kontrolelementer og opdigtede påstande. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop-tekst- og menneskefilter | `antislop-copy` | Specifik tekst (ingen tankestreg, generiske CTA'er, buzzwords, chatbotafslutninger eller opdigtede fakta) plus regler for mennesker: WCAG AA-kontrast, synligt fokus, tastaturadgang, tomme/indlæsnings-/fejltilstande og mobil ombrydning.             | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Kortfattet CJK (文言)             | `terse-cjk`     | `full`/`ultra` svarer på klassisk kinesisk (文言); `lite` beder kun om korte svar uden funktionsord, høflighedsfraser eller udsmykning.                                                                                                                 | zh (lokalitetsbegrænset, se nedenfor)         |

Hver stil leveres med tre intensitetsniveauer — `lite`, `full`, `ultra` — og hvert niveau
slutter med den fælles grænseklausul (`SHARED_BOUNDARIES` i `outputMode.ts`), som
bevarer kodeblokke, filstier, kommandoer, fejl og URL'er nøjagtigt. Niveau-teksterne for
`terse-prose` og `terse-cjk` føjer identifikatorer til denne liste.

`terse-cjk` er begrænset til lokaliteten `zh` to steder. Siden Compression Settings viser
kun dens række, når dashboardsproget er kinesisk (`zh-CN` eller `zh-TW`), og
`applyOutputStyles()` injicerer den kun, når anmodningens fastlagte sprog (se Sprogvalg
nedenfor) er `zh`. Når rækken skjules, ryddes et gemt `terse-cjk`-valg ikke:
Indstillings-API'et accepterer ethvert stil-id, og når andre stile gemmes på siden, bevares det.
På anmodningstidspunktet er sprogkontrollen i `applyOutputStyles()` den eneste lokalitetsbegrænsning.

#### Sådan fungerer injektion

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) sammenholder
valget med kataloget (ukendte id'er og typografier, der ikke matcher lokaliteten,
udelades og medfører aldrig en fejl; et valg, der ikke resulterer i nogen typografi,
efterlader body'en uændret og springes over som `no_styles`), sammenkæder de valgte
instruktioner i katalogets rækkefølge, tilføjer afgrænsningsklausulen **én gang** (samt
sikkerhedsklausulen, `SAFETY_BOUNDARIES` eller dens oversættelse, når `less-code` eller
`ponytail` er valgt) og indleder blokken med en enkelt idempotensmarkør
(`[OmniRoute Output Styles]`), så gentagen anvendelse ikke har nogen effekt. Når det
fastlagte sprog (se Sprogvalg nedenfor) har en oversættelse, indsættes den lokaliserede
instruktion i stedet for den engelske.

For en body med et ikke-tomt `messages`-array udføres idempotenskontrollen før
indholdsforbigåelsen: Når markøren `[OmniRoute Output Styles]` allerede findes i feltet
`system` på øverste niveau (en streng eller et array af indholdsblokke) eller i en
systemmeddelelse med strengindhold, efterlades body'en uændret som `already_applied`,
og der udføres ingen nøgleordskontrol. Ellers kontrollerer en indholdsforbigåelse
(`shouldBypassCavemanOutputMode()` i
`open-sse/services/compression/outputMode.ts`) teksten i de seneste tre meddelelser,
uanset deres rolle, og springer typografierne over for hele turen, når teksten matcher
dens nøgleord for sikkerhed, irreversible handlinger eller afklaringer, eller en
rækkefølgefølsom sekvens: `first`, `then`, `after that`, `before`, `rollback` eller
`backup` efterfulgt inden for 240 tegn af `delete`, `drop`, `migrate`, `deploy` eller
`release`. Forbigåelsen udføres, mens til/fra-indstillingen **Auto-Clarity Bypass**
(`cavemanOutputMode.autoClarity`, som standard slået til) er slået til. Hvis indstillingen
slås fra, springes nøgleordskontrollen over.

Når forbigåelsen lader turen fortsætte, placerer `placeSystemInstruction()` (samme fil),
som aldrig opretter en ny `messages[0]`, blokken på det første af følgende steder, den
finder:

1. En indledende systemmeddelelse med strengindhold: Blokken tilføjes efter dens tekst.
2. Feltet `system` på øverste niveau: Blokken tilføjes efter teksten i en streng eller
   tilføjes som en ny tekstblok i et array af indholdsblokke.
3. Den første senere systemmeddelelse med strengindhold: Blokken tilføjes efter dens
   tekst.
4. Intet af ovenstående: Blokken placeres i en ny systemmeddelelse i slutningen af
   `messages`.

For en body uden et `messages`-array (eller med et tomt array) udføres ingen
indholdsforbigåelse, og et `system`-felt på øverste niveau tages ikke i betragtning.
Blokken tilføjes efter teksten i et `instructions`-felt af typen streng, medmindre
feltet allerede indeholder markøren `[OmniRoute Output Styles]`; i så fald efterlades
body'en uændret som `already_applied`. Når body'en ikke har et `instructions`-felt af
typen streng, men indeholder `input` (en streng eller et array), bliver blokken til
`instructions` og erstatter enhver værdi, der ikke er en streng, som feltet måtte
indeholde. En body uden hverken et `instructions`-felt af typen streng eller et `input`,
der er en streng eller et array, efterlades uændret og springes over som `no_messages`.

#### Sådan aktiveres det

I dashboardet: **Komprimeringskontekst → Komprimeringsindstillinger**
(`/dashboard/context/settings`), sektionen Outputtypografier: én række pr. typografi med
en til/fra-indstilling og en niveauvælger. Typografier indsættes, mens selve
komprimeringen er slået til (sidens hovedindstilling, `enabled`). Til/fra-indstillingen
**Auto-Clarity Bypass** findes på siden **Caveman**
(`/dashboard/context/caveman`) i kortet **Outputtilstand**. Programmatisk gemmer
komprimeringskonfigurationen valget som:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Bagudkompatibilitet: Mens `outputStyles` er tom, knyttes den ældre indstilling
`cavemanOutputMode.enabled` til `terse-prose` på
`cavemanOutputMode.intensity`. Blokken starter derefter med markøren
`[OmniRoute Output Styles]`, hvor den ældre `applyCavemanOutputMode()`-injektor skrev
`[OmniRoute Caveman Output Mode]`. Under markøren matcher teksten den ældre indsættelse
på en, pt-BR, es, de, fr, it, ru, id og vi; på ja og zh indeholder den ét ekstra
mellemrum før afgrænsningsklausulen. `terse-prose` oversættes til pt-BR, es, de, fr, it,
ru, zh, ja, id og vi, så en anmodning, hvis fastlagte sprog er `hu`, får den engelske
tekst, hvor den ældre injektor brugte sin ungarske tekst.

Sprogvalg for outputtypografier (`resolveOutputStyleLanguage()` i
`outputStyles/apply.ts`): Når `languageConfig.enabled` er slået til, udtager
`autoDetect` den seneste brugermeddelelse i anmodningens `messages`-array, som indeholder
tekst (strengindhold eller `text` fra dens indholdsdele), og kører Caveman-motorens
detektor (`detectCompressionLanguage()`) på den. Detektoren returnerer `zh` for tekst
med Han-tegn og uden kana; ellers returnerer den det af `it`, `pt-BR`, `es`, `de`, `fr`,
`ru`, `ja`, `hu` og `id`, der har flest matchende indikatorer, og `en`, når ingen
matcher — tekst, som den ikke kan klassificere, får engelsk, aldrig `defaultLanguage`,
og `vi` registreres aldrig, selvom typografierne leveres med `vi`-tekst. En body til
Responses API opbevarer sine ture i `input`, som der ikke udtages tekst fra, så den får
`defaultLanguage` og derefter engelsk. Når ingen brugermeddelelse i `messages`
indeholder tekst, eller når `autoDetect` er slået fra, anvendes `defaultLanguage` og
derefter engelsk. Når `languageConfig.enabled` er slået fra, er sproget engelsk —
medmindre en komprimeringskombination anvendes på anmodningen (en kombination, der er
tildelt anmodningens routingkombination, eller den standardkomprimeringskombination, som
chatCore falder tilbage på for den indbyggede stablede pipeline): Anvendelse af en
kombination slår `languageConfig.enabled` til for den pågældende anmodning og indstiller
`defaultLanguage` ud fra kombinationens sprogpakker (den gemte værdi, hvis den er en af
kombinationens pakker, ellers kombinationens første pakke, som som standard er `en`),
mens den gemte `autoDetect` (som standard slået til) stadig anvendes.
Caveman-inputmotoren vælger sproget for sin regelpakke på en anden måde — for hver
tekstdel og, når automatisk registrering er slået fra, betinget af `enabledPacks`.

Stil × sprog-matricen fastholdes af
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: hver katalogstil skal have en
post i testens `BASELINE_LANGUAGES`; en stil, der ikke er begrænset efter landestandard, skal leveres med en
pt-BR-oversættelse (den landestandardbegrænsede `terse-cjk` er undtaget fra denne regel), medmindre den er
angivet i `KNOWN_ENGLISH_ONLY`, som kun må indeholde stilarter helt uden oversættelser —
en angivet stil, der har en hvilken som helst oversættelse, får testen til at mislykkes; og en stil får testen til at mislykkes, når
den mister et sprog, som dens post i `BASELINE_LANGUAGES` angiver. For at tilføje en stil, se
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Komprimering af værktøjsresultater

`compressToolResult()` i `open-sse/services/compression/toolResultCompressor.ts`
komprimerer tekst fra værktøjsresultater med **5 strategier**. Den afprøver dem i denne rækkefølge, og den
første aktiverede strategi, hvis kontrol matcher indholdet, afgør resultatet:

1. **`fileContent`**: indhold på 3 eller flere linjer, hvor mindst én linje, når
   indledende indrykning ignoreres, begynder med `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` eller `return ` (nøgleordet plus et mellemrum), eller med `if`,
   `for` eller `while` efterfulgt af `(` eller ` (`, beholder de første 20 og sidste 5 linjer, og
   den udeladte midte markeres.
2. **`grepSearch`**: indhold med mindst én linje på formen `<path>:<digits>:`,
   hvor teksten før det første kolon ikke indeholder blanktegn, beholder kun disse linjer, højst
   30, efterfulgt af antallet af eventuelle yderligere matches og listen over matchede filer;
   alle andre linjer fjernes. En enkelt sådan linje er nok til at udløse strategien, så en
   loglinje, der begynder med et tidsstempel såsom `12:30:45`, tæller også.
3. **`shellOutput`**: output, der indeholder en ANSI CSI-sekvens (`ESC[` efterfulgt af cifre eller
   semikoloner og derefter et bogstav, som i farvekoder) eller et `$` efterfulgt af blanktegn
   hvor som helst i teksten, får fjernet disse sekvenser (andre escape-sekvenser, såsom `ESC[?25l` eller en
   OSC-vinduestitelsekvens, bevares) og beholder de sidste 50 linjer, hvor sammenhængende
   gentagne linjer slås sammen. Da denne kontrol køres før `json` og `errorMessage`,
   når JSON- eller fejloutput, der indeholder et sådant `$`, aldrig frem til dem, mens
   `shellOutput` er aktiveret.
4. **`json`**: en JSON-payload på over 2.000 tegn, der begynder med `{` eller `[` (efter
   eventuelle blanktegn) og kan parses, opsummeres: et array med mere end 7 elementer beholder
   sine første 5 og sidste 2 elementer samt det samlede antal, og et objekt beholder sine første 20
   nøgler, hvor hver værdi, der er et indlejret objekt eller array, erstattes af en `{…N keys}`-pladsholder
   (for et array er N dets længde) og en `_remaining_<N>_keys`-markør, som angiver antallet af nøgler,
   der blev fjernet efter de første 20. Skalarværdier kopieres i deres helhed, så et objekt med 20 nøgler
   eller færre uden indlejrede værdier kun får ny indrykning — et minificeret objekt får flere tegn
   og forbliver uændret.
5. **`errorMessage`**: output, der hvor som helst og uanset store og små bogstaver indeholder `error:`,
   `error ` (ordet efterfulgt af et mellemrum, som i `no error found`), `[error]`,
   `exception:`, `exception `, `[exception]` eller `traceback`, beholder sin første linje, de
   næste 10 linjer og de sidste 3, med en `… [N frames elided] …`-markør i stedet for
   linjerne mellem dem. Markøren vises kun, når der følger mere end 13 linjer efter den første
   linje, så fejloutput på 14 linjer eller færre ikke forkortes (ved 12 eller 13 linjer
   gentager de sidste 3 linjer, der allerede er beholdt).

Når en strategi matcher, afprøves de senere strategier ikke, heller ikke hvis strategien
ikke sparer noget. Når den matchende strategi ikke sparer nogen estimerede tokens (længde ÷ 4, rundet op) —
for eksempel en kodelignende fil på 25 linjer eller færre eller et JSON-array på over 2.000
tegn med 7 elementer eller færre — beholder den aggressive motor det oprindelige
værktøjsresultat: begge kaldere (`compressAggressive()` og `compressAnthropicToolResultBlock()`)
beholder originalen, når `saved` er 0 eller derunder, mens `compressToolResult()` selv stadig
returnerer strategiens output. Værktøjsresultattrinnet har ikke det sidste ord:
motorens fallback-opsummering kan stadig forkorte en `tool`- eller `function`-meddelelse, der er længere
end 8.192 tegn (`maxTokensPerMessage`, 2.048, gange 4).

#### Hvornår det skal bruges

Komprimering af værktøjsresultater er trin 1 i den aggressive motor (`compressAggressive()` i
`open-sse/services/compression/aggressive.ts`), så den kører i Aggressive-tilstand og i et
`aggressive`-trin i en stablet pipeline. Den komprimerer `tool`- og `function`-meddelelser
i OpenAI-format samt teksten i Anthropic-`tool_result`-blokke. Hver strategi har sin egen
kontakt under `aggressive.toolStrategies`, og alle er som standard slået til. I dashboardet findes
kontakterne i visningen **Advanced** på Caveman-siden, mens komprimering er slået til, og
standardtilstanden er Aggressive.

### Stablet pipeline

Den stablede tilstand kører **flere motorer i rækkefølge** — normalt RTK først
(60-90 % besparelse på værktøjsoutput) og derefter Caveman på den resterende tekst (~46 % besparelse
på input). Sammenlagt giver det det **kvalificerede interval på 78-95 %** (se beregningen af upstream-besparelser
ovenfor): `1 - (1 - 0.60..0.90) × (1 - 0.46)` giver et gennemsnit på ≈89 %.

#### Sådan fungerer det

```
Input (1000 tokens)
  → RTK (kommandobevidst filter) → 200 tokens
    → Caveman (fjernelse af fyldtekst) → 108 tokens
  → Output (108 tokens, ~89 % besparelse)
```

#### Hvornår det skal bruges

Brug stablet tilstand til:

- Arbejdsgange med omfattende brug af værktøjer (agentbaseret kodning, research)
- Omkostningsfølsom batchbehandling
- Når du har brug for maksimale tokenbesparelser

Stablede pipelines konfigureres via den globale komprimeringsindstilling `stackedPipeline`
eller via en navngivet komprimeringskombination, der er tildelt en routingkombination (se
tilsidesættelse pr. kombination ovenfor) — ikke via en autokombinations `modePack` (dette felt
omvægter kun autokombinationens modelvalg, og `stacked` er ikke et gyldigt pakkenavn).

---

## Tilsidesættelser af komprimeringskombinationer

Du kan tilsidesætte den globale komprimeringstilstand **pr. kombination** for at finjustere adfærden
til forskellige brugsscenarier:

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

Dette er nyttigt til:

- **Kodningskombinationer**: Brug tilstanden `aggressive` til lange sessioner
- **Korte spørgsmål og svar-kombinationer**: Brug tilstanden `lite` til hurtige svar
- **Værktøjstunge kombinationer**: Brug tilstanden `stacked` for maksimale besparelser
- **Produktionskombinationer**: Lad tilsidesættelsen være slået fra for cachingudbydere — den altid aktive
  cachebevidste justering nedgraderer automatisk `aggressive`/`ultra` til `standard`
  (der findes ingen valgbar `cache-aware`-tilstand)

---

## Se også

- [Miljøkonfiguration](../reference/ENVIRONMENT.md) — Miljøvariabler for komprimering
- [Arkitekturvejledning](../architecture/ARCHITECTURE.md) — Interne detaljer om komprimeringspipelinen
- [Brugervejledning](../guides/USER_GUIDE.md) — Kom godt i gang med komprimering
- [RTK-komprimering](./RTK_COMPRESSION.md) — RTK-filtre, tillidsmodel, verifikationskontrol, gendannelse af rå output
- [Komprimeringsmotorer](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, API'er, MCP, kontrolpanel
- [Format for komprimeringsregler](./COMPRESSION_RULES_FORMAT.md) — JSON-format til regelpakker
- [Sprogpakker til komprimering](./COMPRESSION_LANGUAGE_PACKS.md) — Sprogspecifikke Caveman-regler
