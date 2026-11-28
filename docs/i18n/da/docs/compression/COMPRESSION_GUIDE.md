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

Ingen komprimering anvendt. Alle meddelelser sendes videre uændret.

### Lite-tilstand (~15 % besparelse, <1 ms latenstid)

Den sikreste tilstand — oprydning af formatering. Dens afkortning af værktøjsresultater medfører tab af data, så standardstien
(ingen opt-in med `allow-lossy`, `engine:lite` eller navngiven kombination) kører lite med
`compressToolResults: false`: tidligere værktøjsresultater når frem til provideren uændret.

| Teknik                   | Beskrivelse                                                                                |
| ------------------------ | ------------------------------------------------------------------------------------------ |
| `collapseWhitespace`     | Fletter efterfølgende tomme linjer og afsluttende mellemrum                                |
| `dedupSystemPrompt`      | Fjerner duplikerede systemmeddelelser                                                      |
| `compressToolResults`    | Afkorter tidligere værktøjsresultater til lite-grænsen (med tab: kun med eksplicit opt-in) |
| `removeRedundantContent` | Fjerner gentagne instruktioner                                                             |
| `replaceImageUrls`       | Forkorter base64-billeddata-URI'er                                                         |

**Bedst til:** Altid aktiv brug, sikkerhedskritiske arbejdsgange.

### Standardtilstand (~30 % besparelse)

Inspireret af [Caveman](https://github.com/JuliusBrussee/caveman) — fjerner fyldord og omstændelige formuleringer, samtidig med at betydningen bevares:

- Fjerner fyldord ("please", "I think", "basically", "actually")
- Forkorter omstændelige formuleringer ("in order to" → "to", "as a result of" → "because")
- Fjerner høflige forbehold ("Would you mind...", "If you could possibly...")
- 30+ regex-regler optimeret til kodeprompter

**Bedst til:** Daglige kodningsarbejdsgange, omkostningsbevidste teams.

### Aggressiv tilstand (~50 % besparelse)

Smart historikstyring til lange sessioner:

- **Meddelelsesældning** — ældre meddelelser komprimeres gradvist
- **Komprimering af værktøjsresultater** — lange værktøjsuddata afkortes eller udelades (første/sidste linjer,
  filtrering efter matchende linjer, komprimering af JSON-nøgler)
- **Vagter for strukturel integritet** — sikrer, at par af `tool_use` + `tool_result` forbliver konsistente
- **Bevidsthed om kontekstvindue** — respekterer token-grænser pr. model

**Bedst til:** Udvidede fejlfindingssessioner, store kodebaser.

### Ultra-tilstand (~75 % besparelse)

Maksimal komprimering til tokenskritiske scenarier:

- **Heuristisk beskæring** — scorebaseret tokenbeskæring af prosa
- **Bevarelse af struktur** — indhegnede kodeblokke, inline-kode, URL'er og identifikatorer tombstones og samles igen ordret; de beskæres aldrig
- **Valgfrit SLM-niveau** — en lille lokal model kan finjustere beskæringen, når den er konfigureret
- Uafhængig af Aggressiv tilstand: den udfører ikke meddelelsesældning, komprimering af værktøjsresultater eller fallback-resuméet (kun en fejl på SLM-niveau kan sende en fallback-gennemgang gennem aggressiv tilstand)

**Bedst til:** Når du gentagne gange rammer kontekstgrænserne.

### RTK-tilstand (60–90 % inden for upstream-området)

RTK-tilstand er optimeret til omfangsrige værktøjsuddata, der forekommer i sessioner med kodningsagenter:

- Registrerer kommando-/outputklasser som `git status`, `git diff`, `git log`, testrunnere,
  TypeScript/Vite/Webpack-builds, ESLint/Biome/Prettier, npm-audit/-installationer, Docker-logfiler, infrastrukturuddata og generisk shell-output
- Anvender JSON-filterpakker fra `open-sse/services/compression/engines/rtk/filters/`
- Importerer RTK TOML-skema v1-filtre fra projektets eller globale `filters.toml`-filer med validering af inline-tests og tillidskontrol af projektfiler
- Leveres med 56 indbyggede filtre med inline-verifikationsprøver
- Fjerner ANSI-kontrolsekvenser, statusbjælker, gentagne linjer og støj uden handlingsværdi
- Bevarer fejl, errors, advarsler, ændrede filer, resuméer og slutningen af lange uddata
- Understøtter tillidskontrollerede projektfiltre, globale filtre og valgfri gendannelse af redigerede råuddata

**Bedst til:** Agentsessioner med shell-, build-, test-, git-, grep- og filudskriftstransskripter.

### Stablet tilstand (78–95 % relevant område)

Stablet tilstand kører flere komprimeringsmotorer i en deterministisk rækkefølge. Standardpipelinen er:

```txt
RTK -> Caveman
```

Denne rækkefølge gør først terminal-/værktøjsuddata kompakte og anvender derefter Cavemans semantiske kondensering på
den resterende naturlige sprogprompt. Stablede pipelines kan konfigureres globalt eller via komprimeringskombinationer, der er tildelt routingkombinationer.

**Bedst til:** Blandet kontekst med store værktøjslogfiler samt menneskelige instruktioner eller assistentresuméer.

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

### Instrumentpanel

Gå til `Dashboard → Context & Cache`:

- **Caveman** — valg af tilstand, sprogpakker, forhåndsvisning og globale standardindstillinger
- **RTK** — forhåndsvisning af kommando-filtre, RTK-sikkerhedsindstillinger og filterkatalog
- **Compression Combos** — navngivne engine-pipelines, der er tildelt routing-kombinationer
- **Auto-Trigger Threshold** — aktivér automatisk komprimering, når token-antallet overskrider tærsklen

### Override pr. kombination

I `Dashboard → Context & Cache → Compression Combos` skal du tildele en komprimeringskombination til en routing-kombination:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Dette giver dig mulighed for at bruge stablet komprimering med gratis-/kodeudbydere, mens lite-tilstand bevares for betalte abonnementer.

Denne tildeling af en "Override pr. kombination" er en anden kontrol end override af **routing-kombinationens komprimeringstilstand** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — feltets schema accepterer også `rtk`, `stacked` og `omniglyph`) — dette override vælger ikke en navngiven pipeline for komprimeringskombinationen; det angiver blot feltet `compressionMode`, som konsulteres af `resolveCompressionPlan`. Det kan angives enten på kombinationskortet (`Dashboard → Combos`) eller, siden #6760, pr. routing-kombination på listen "Assign to routing" under `Dashboard → Context & Cache → Compression Combos`, lige ved siden af afkrydsningsfeltet til pipeline-tildeling, der er dokumenteret ovenfor. Begge visninger gemmer via det samme `PUT /api/combos/{id}`-endpoint.

### Override pr. anmodning

Send request-headeren `x-omniroute-compression` for at tilsidesætte komprimeringsplanen for en enkelt anmodning. Den har den højeste prioritet — den tilsidesætter routing-kombinationens override, den aktive profil, automatisk udløsning og panelets Default. Ukendte værdier ignoreres (anmodningen afvises aldrig), og den globale hovedkontakt har stadig kontrol over alt: når komprimering er globalt deaktiveret, kan headeren ikke aktivere den. Værdier:

| Værdi         | Effekt                                                                                                                 |
| ------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `off`         | Ingen komprimering for denne anmodning.                                                                                |
| `default`     | Den panelafledte Default-profil (ignorerer den aktive profil). Lossy-engines forbliver deaktiveret.                    |
| `safe`        | Det samme som at udelade headeren.                                                                                     |
| `allow-lossy` | Bevar denne anmodnings operatorplan, inklusive opsummeringer, relevansfiltre og stilomskrivninger.                     |
| `engine:<id>` | Én enkelt engine, når den er aktiveret, f.eks. `engine:rtk`. Dette er tilvalg pr. anmodning for den pågældende engine. |
| `<combo>`     | En navngiven kombination, der først matches efter navn (uden forskel på store og små bogstaver) og derefter efter id.  |

Uden `allow-lossy`, `engine:<id>` eller en navngiven kombination anvendes lossy-engines ikke. Når en lossy Default, automatisk udløsning eller routing-override nedgraderes, bevarer OmniRoute de genkendte lossless-trin fra den konfigurerede stablede pipeline i den konfigurerede rækkefølge. Den falder kun tilbage til `session-dedup → lite`, når intet konfigureret lossless-trin overlever.

Indstillingspanelets forhåndsvisning af **Effective pipeline** viser den almindelige plan i hviletilstand. Når en automatisk udløsning kan køre, viser den samme forhåndsvisning også dens betingede effektive pipeline, så panelet og runtime-opløsningen uden header forbliver synkroniserede.

Den anvendte plan returneres i response-headeren `X-OmniRoute-Compression: <mode>; source=<source>`, hvor `<source>` er en af `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` eller `off`.

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

# Test RTK direkte med valgfri kommandometadata
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

## Avancerede kompressionssystemer

Ud over de 7 tilstande beskrevet ovenfor (kilden accepterer også `codex-responses` og `omniglyph` tilstande, som denne vejledning ikke dækker), dækker afsnittene nedenfor funktioner, der fungerer inde i eller ved siden af disse tilstande: Værktøjsresultatkompression og progressiv aldring er trin 1 og 2 af den aggressive motor (Aggressiv tilstand og et `aggressive` trin i en stablet rørledning), hvor Cachegraded Pipeware kører. `aggressive` og `ultra` til `standard` for cache-udbydere, mens komprimering er slået til, og Caveman Output Mode og Output Styles er opt-in system-prompt-instruktioner, deaktiveret som standard, der former modellens output i stedet for at komprimere anmodningen.

### Cache-bevidst komprimering

Nogle udbydere (som Anthropic med hurtig caching) understøtter** hurtig cachelagring** , som lader dem cache dele af prompten for at reducere omkostninger og ventetid. Når caching er aktiveret, kan aggressiv komprimering faktisk** skade** ydeevne, fordi den ændrer de cachelagrede tokens, hvilket gør cachen ugyldig.

`cachingAware.ts` modulet løser dette ved** detektering af caching-kontekst** og** justering af kompressionsstrategien** derfor.

#### Hvordan det virker

1. **Registrer caching kontekst** — Scanner anmodningsteksten for `cache_control` markører
2. **Identificer caching-udbydere** — Kontrollerer, om måludbyderen understøtter caching
3. **Juster strategi** — Nedgraderer `aggressive`/`ultra` til `standard` for cache-udbydere
4. **Spring systemprompt over** — System-prompter er normalt cachelagret, så komprimer dem ikke

Strategihjælperen returnerer også et `deterministicOnly` flag, men planbyggeren bruger kun strategien — intet nedstrøms læser flaget i dag.

#### Kode eksempel

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

#### Hvornår skal bruges

Cache-bevidst komprimering er** altid tændt** — ingen konfiguration nødvendig. Den starter, når komprimering er aktiveret, og måludbyderen understøtter hurtig caching (Anthropic, OpenAI, osv.); Eksplicitte `cache_control` markører er ikke påkrævet — en caching-udbyder alene udløser nedgraderingen, og markører alene gør det aldrig (markørdetektion feeds cache-telemetri, ikke strategibeslutningen).

OpenRouter tæller kun som en caching-udbyder for `anthropic/*` modeller: Claude kodeanmodninger beholder deres `cache_control` brudpunkter (højst 4), og vagten beskytter præfikset, mens hver anden OpenRouter familie (`openai/`, `google/`, `qwen/`, …) forbliver strippet og ubevogtet.

### Progressiv aldring

Lange samtaler akkumulerer mange beskedvendinger, men ældre omgange bliver mindre relevante. `progressiveAging.ts` modulet** forringer beskeder efter svingafstand** (afstand målt fra slutningen af samtalen). Med de afsendte standardindstillinger (`verbatim: 2, light: 2, moderate: 3`):

- **Sidste 2 omgange (afstand ≤ 2)** : Holdes ordret
- **Afstand 3** : Caveman kompression (fjernelse af fyldstof)
- **Afstand 4 +** : Assistent-meddelelser opsummeret; brugerbeskeder reduceret til deres første linje, begrænset til 120 tegn; andre roller uberørte. Systemprompter, allerede gamle beskeder og den seneste brugermeddelelse opbevares altid ordret uanset afstand. Intet droppes direkte, og `light` båndet er ikke tilgængeligt med de afsendte standardindstillinger (`light` er lig med `verbatim`).

#### Kode eksempel

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

#### Hvornår skal bruges

Progressiv aldring er** altid tændt** for `aggressive` tilstand — er det trin 2 af `compressAggressive()`. Ultra-tilstand kører det ikke. Det er særligt effektivt til:

- Langvarige kodningssessioner
- Flerdages samtaler
- Agentiske arbejdsgange med mange værktøjskald

### Caveman Output Mode

Caveman output-tilstand tilføjer** systemprompt instruktioner** der beder selve modellen om kortfattet output — `lite` niveauet beder om kortfattede svar, der holder hele sætninger, `full` beder den om at "reagere kortfattet som en smart hulemand", og `ultra` beder om telegrafisk output; instruktioner spørger kun, de kan ikke garantere det. Anmodninger modtager dem gennem `applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`): `open-sse/handlers/chatCore.ts` løser først valget med back-compat shim (`resolveOutputStyleSelection()` in `open-sse/services/compression/outputStyles/backCompat.ts`), som, mens `outputStyles` er tom, tilknytter en aktiveret `cavemanOutputMode` til `terse-prose` output-stilen ved `cavemanOutputMode.intensity` (se Back-compat nedenfor); et ikke-tomt `outputStyles` valg bruges som det er, og `cavemanOutputMode.enabled` og `intensity` har så ingen effekt, mens dets `autoClarity` skift stadig gælder. `outputMode.ts` indeholder instruktionsteksterne (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), indholdsomgåelsen og den placeringshjælper, som injektionen bruger; dens egen `applyCavemanOutputMode()` injektor har ingen produktionskalder.

#### Hvordan det virker

Denne tilstand komprimerer ikke inputtet. Den tilføjer en instruktionsblok til systemprompten (se Sådan virker injektion nedenfor), og enhver inputkomprimeringstilstand, der er valgt til anmodningen, kører stadig bagefter på den krop, der nu bærer blokken. Forud for delte grænser-klausulen, som hvert niveau slutter med, lyder det engelske `full` niveau:

> "Svar kortfattet som en smart hulemand. Drop artikler (a/an/the), fyldstof (just/really/basically/actually/simply), hygge, afdækning. Fragmenter OK. Korte synonymer (store ikke omfattende, rettelse ikke implementeret). Hold alt teknisk stof, kode, fejl, URLs, identifikatorer nøjagtige."

Dette fungerer særligt godt til:

- Kodegenerering (terser output = færre tokens)
- Hurtig Q&A (intet behov for uddybende forklaringer)
- Batchbehandling (maksimer gennemløb)

#### Hvornår skal bruges

Caveman output mode er** opt-in** . Med komprimering slået til (`enabled: true`, master-knappen på siden Kompressionsindstillinger), tænd den med `cavemanOutputMode.enabled`; `intensity` vælger `lite`, `full` eller `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

En kompressionskombination** Udgangstilstand** toggle (`outputMode`, niveau i `outputModeIntensity`) indstiller den samme switch for de anmodninger, som combo gælder for, og `omniroute_set_compression_engine` MCP værktøjet skriver det gennem sit booleske `outputMode` argument. Et ikke-tomt `outputStyles` valg har forrang over denne switch. I dashboardet aktiveres** Terse prosa** output-stil injicerer den samme blok (se Output-stile nedenfor).

### Outputstile (katalog)

Caveman output mode ovenfor er** arv i enkeltstil** . Fase 4 generaliserede det til et katalog over komponerbare outputstile: `OUTPUT_STYLE_CATALOG` i `open-sse/services/compression/outputStyles/catalog.ts`. Hver stil er en system-prompt instruktion, der beder selve modellen om billigere output; stilarter kan aktiveres sammen og injiceres i katalogrækkefølge.

| Stil                                 | `id`            | Hvad den gør                                                                                                                                                                                                                                             | Instruktionssprog                             |
| ------------------------------------ | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Terse prosa                          | `terse-prose`   | Drop filler/articles/hedging; holde det tekniske stof nøjagtigt. Samme tekst som den gamle hulemand-outputtilstand (refereret, ikke genskrevet).                                                                                                         | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Mindre kode                          | `less-code`     | YAGNI ladder: mindste arbejdsændring, ingen uønskede abstraktioner.                                                                                                                                                                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Hestehale (doven seniorudvikler)     | `ponytail`      | "Den bedste kode er den kode, der aldrig er skrevet": genbrug > omskrivning, årsag til > symptom, korteste arbejdsdiff.                                                                                                                                  | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Jeg har ADHD (action-first)          | `i-have-adhd`   | Handling først (command/path/snippet før prosa), nummererede afgrænsede trin, ONE konkret næste trin, ingen preamble/recap/closers. Tilpasset fra [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT).                                     | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop UI filter                   | `antislop-ui`   | Enhver visuel teknik skal bestå en formålstest (hierarki, identitet, læsbarhed); ingen standard gradients/glass/glow, udjævnet palette, ingen skabelonlayouts. Begge antislop-stilarter tilføjer en grænse uden-døde-kontroller / ikke-fabrikerede krav. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop kopi og menneskeligt filter | `antislop-copy` | Specifik kopi (ingen em bindestreg, generisk CTAs, buzzwords, chatbot closers, opfundne fakta) plus personregler: WCAG AA kontrast, synligt fokus, tastaturrækkevidde, empty/loading/error tilstande, mobil reflow.                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Terse CJK (文言)                     | `terse-cjk`     | `full`/`ultra` svar på klassisk kinesisk (文言); `lite` beder kun om korte svar uden funktionsord, hygge eller pynt.                                                                                                                                     | zh (lokale lukket, se nedenfor)               |

Hver stil sender tre intensitetsniveauer — `lite`, `full`, `ultra` — og hvert niveau slutter med delte grænser klausulen (`SHARED_BOUNDARIES` i `outputMode.ts`), som holder kodeblokke, filstier, kommandoer, fejl og URLs nøjagtige. `terse-prose` og `terse-cjk` niveauteksterne tilføjer identifikatorer til denne liste.

`terse-cjk` er lokaliseret til `zh` to steder. Siden Kompressionsindstillinger viser kun dens række, når UI sproget på dashboardet er kinesisk (`zh-CN` eller `zh-TW`), og `applyOutputStyles()` injicerer det kun, når anmodningens løste sprog (se sprogvalg nedenfor) er `zh`. At skjule rækken rydder ikke et gemt `terse-cjk` valg: Indstillingerne API accepterer enhver typografi-id, og lagring af andre typografier på siden beholder den. På anmodningstidspunktet er `applyOutputStyles()` -sprogkontrollen den eneste locale-gate.

#### Hvordan injektion virker

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) løser markeringen i forhold til kataloget (ukendte id'er og lokalitetstilpassede typografier slettes, aldrig en fejl; en markering, der løser til ingen typografi, efterlader brødteksten uændret, springes over som `no_styles`), sammenkæder de valgte instruktioner i katalogrækkefølge, tilføjer grænsesætningen** engang** (plus sikkerhedssætningen `SAFETY_BOUNDARIES` eller dens oversættelse, når `less-code` eller `ponytail` er valgt), og starter blokken med en enkelt idempotensmarkør (`[OmniRoute Output Styles]`), så genanvendelse er en no-op. Når det løste sprog (se sprogvalg nedenfor) har en oversættelse, injiceres den lokaliserede instruktion i stedet for engelsk.

On a body with a non-empty `messages` array, the idempotency check runs before the content bypass: when the `[OmniRoute Output Styles]` marker is already in the top-level `system` field (a string or a content-block array) or in a system message with string content, the body is left unchanged as `already_applied` and no keyword check runs. Otherwise a content bypass (`shouldBypassCavemanOutputMode()` in `open-sse/services/compression/outputMode.ts`) checks the text of the last three messages, whatever their role, and skips the styles for the whole turn when that text matches its security, irreversible-action or clarification keywords, or an order-sensitive sequence: `first`, `then`, `after that`, `before`, `rollback` or `backup` followed within 240 characters by `delete`, `drop`, `migrate`, `deploy` or `release`. The bypass runs while the **Auto-Clarity Bypass** toggle (`cavemanOutputMode.autoClarity`, on by default) is on; turning the toggle off skips the keyword check.

Når bypasset lader svinget komme igennem, placerer `placeSystemInstruction()` (samme fil), som aldrig opretter en ny `messages[0]`, blokken i den første af disse, den finder:

1. En ledende systemmeddelelse med strengindhold: blokken tilføjes efter sin tekst.
2. `system` -feltet på øverste niveau: blokken tilføjes efter teksten i en streng eller tilføjes som en ny tekstblok til et indholdsblok-array.
3. Den første senere systemmeddelelse med strengindhold: blokken tilføjes efter dens tekst.
4. Ingen af ovenstående: blokken går ind i en ny systemmeddelelse i slutningen af `messages`.

På en krop uden en `messages` array (eller med en tom) kører der ingen indholdsbypass, og et `system` -felt på øverste niveau konsulteres ikke. Blokken tilføjes efter teksten i et streng `instructions` felt, medmindre dette felt allerede indeholder `[OmniRoute Output Styles]` markøren, i hvilket tilfælde kroppen efterlades uændret som `already_applied`. Når kroppen ikke har noget streng `instructions` felt, men bærer `input` (en streng eller en matrix), bliver blokken `instructions`, og erstatter enhver ikke-strengværdi, som feltet indeholdt. En krop med hverken et streng `instructions` felt eller en streng eller matrix `input` efterlades uændret og springes over som `no_messages`.

#### Sådan aktiveres

I dashboardet:** Kompressionskontekst → Kompressionsindstillinger** (`/dashboard/context/settings`), sektion for outputstile: en række pr. stil med en on/off -skift og en niveauvælger. Styles injicerer, mens selve komprimeringen er aktiveret (sidens master-skift, `enabled`). De** Auto-Clarity Bypass** skifte er på** Hulemand** side (`/dashboard/context/caveman`), i sin** Udgangstilstand** kort. Programmatisk bevarer komprimeringskonfigurationen valget som:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Back-compat: mens `outputStyles` er tom, kortlægges den gamle `cavemanOutputMode.enabled` -indstilling til `terse-prose` ved `cavemanOutputMode.intensity`. Blokken starter derefter med `[OmniRoute Output Styles]` -markøren, hvor den gamle `applyCavemanOutputMode()` injektor skrev `[OmniRoute Caveman Output Mode]`. Under markøren matcher teksten legacy-injektionen i en, pt-BR, es, de, fr, it, ru, id og vi; i ja og zh har den et ekstra mellemrum før grænsesætningen. `terse-prose` oversættes til pt-BR, es, de, fr, it, ru, zh, ja, id og vi, så en anmodning, hvis løste sprog er `hu` får den engelske tekst, hvor den gamle injektor brugte sin ungarske.

Valg af sprog i outputstil (`resolveOutputStyleLanguage()` i `outputStyles/apply.ts`): med `languageConfig.enabled` tændt, sampler `autoDetect` den seneste brugermeddelelse i anmodningens `messages` array, der har tekst (strengindhold eller `text` af dens indholdsdele) og kører Caveman-motorens detektor (`detectCompressionLanguage()`) på den. Detektoren returnerer `zh` for tekst med Han-tegn og ingen kana; ellers returnerer den den af `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` og `id` der har flest tip-matches, og `en` når ingen matcher — -teksten den ikke kan klassificere får engelsk, aldrig `defaultLanguage`, og `vi` detekteres aldrig selvom teksterne sendes `vi`. En Responses API body beholder sine ture i `input`, som ikke er samplet, så den får `defaultLanguage`, derefter engelsk. Når ingen brugerbesked i `messages` har tekst, eller med `autoDetect` slukket, gælder `defaultLanguage`, derefter engelsk. Når `languageConfig.enabled` er slået fra, er sproget engelsk —, medmindre en kompressionskombination gælder for anmodningen (en kombination, der er tildelt anmodningens routing-kombination, eller standardkompressionskombinationen chatCore falder tilbage til for den indbyggede stablede pipeline): anvendelse af en kombination slår `languageConfig.enabled` til for den pågældende anmodning og indstiller værdien `defaultLanguage` hvis den er gemt, af comboens pakker, ellers comboens første pakke, som som standard er `en`), mens den gemte `autoDetect` (on som standard) stadig gælder. Caveman-inputmotoren vælger sit regelpakkesprog forskelligt — pr. tekstdel og, med auto-detect off, gated på `enabledPacks`.

Stilen × -sprogmatricen er fastgjort af `tests/unit/compression/output-styles-i18n-matrix.test.ts`: hver katalogstil skal have en indgang i testens `BASELINE_LANGUAGES`; en stil, der ikke er lokaliseret, skal sende en pt-BR-oversættelse (den lokalitets-gated `terse-cjk` er undtaget fra denne regel), medmindre den er opført i `KNOWN_ENGLISH_ONLY`, som kun kan indeholde stilarter uden oversættelser overhovedet — en listet stil, der har nogen oversættelse, ikke består testen og en stil fejler testen, når den mister et sprog, som dens `BASELINE_LANGUAGES` indgang viser. For at tilføje en stil, se [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Værktøjsresultatkomprimering

`compressToolResult()` i `open-sse/services/compression/toolResultCompressor.ts` komprimerer værktøjsresultattekst med** 5 strategier** . Den prøver dem i denne rækkefølge, og den først aktiverede strategi, hvis kontrol matcher indholdet, afgør resultatet:

1. **`fileContent`** : Indhold af 3 eller flere linjer, hvor mindst én linje, ignorerer foranstående indrykning, starter med `import `, `export `, `function `, `class `, `const `, `let `, `var ` eller `return ` (nøgleordet plus ` (` mellemrum), eller med `if`, `for` eller `while` efterfulgt af `(` eller dens sidste 5e 20, behold låget med 5 linjer midt markeret.
2. **`grepSearch`** : indhold med mindst én linje af formen `<path>:<digits>:`, hvor teksten før det første kolon ikke har mellemrum, beholder kun disse linjer, højst 30, efterfulgt af en optælling af eventuelle yderligere matchninger og listen over matchede filer; hver anden linje er droppet. En sådan linje er nok til at udløse strategien, så en loglinje, der starter med et tidsstempel såsom `12:30:45` tæller også.
3. **`shellOutput`** : output, der indeholder en ANSI CSI sekvens (`ESC[` derefter cifre eller semikolon, derefter et bogstav, som i farvekoder) eller en `$` efterfulgt af mellemrum hvor som helst i teksten, mister disse sekvenser (andre escapes, såsom `ESC[?25l` eller en OSC -vindue-titelsekvens, beholdes) og beholder sine sidste 50 collapsive linjer gentaget, med consecutive linjer. Fordi denne kontrol kører før `json` og `errorMessage`, JSON eller fejloutput, der indeholder sådan en `$` dem aldrig, mens `shellOutput` er tændt.
4. **`json`** : en JSON nyttelast på over 2.000 tegn, der starter med `{` eller `[` (efter valgfri mellemrum) og parses er opsummeret: en matrix med mere end 7 elementer beholder sine første 5 og sidste 2 elementer og dets samlede antal, og et objekt beholder sine første 20 nøgler, med hvert indlejret objekt eller en matrixværdi erstattet af en `{…N keys}` pladsholder og (for en zq-værdi-pladsholder) `_remaining_<N>_keys` -markør, der tæller de nøgler, der er faldet forbi de første 20. Skalære værdier kopieres hele, så et objekt på 20 nøgler eller færre uden indlejrede værdier bliver kun indrykket igen — en minificeret får tegn og forbliver uændret.
5. **`errorMessage`** : output, der indeholder, hvor som helst og uanset store og små bogstaver, `error:`, `error ` (ordet efterfulgt af et mellemrum, som i `no error found`), `[error]`, `exception:`, `exception `, `[exception]` eller `traceback` beholder sin første linje, de næste 10 linjer og de sidste 3, med en `… [N frames elided] …` -markør i stedet for linjerne mellem dem. Markøren vises kun, når mere end 13 linjer følger den første linje, så fejloutput på 14 linjer eller færre forkortes ikke (ved 12 eller 13 linjer er de sidste 3 gentagelseslinjer allerede gemt).

After a strategy matches, even one that saves nothing, the later strategies are not tried. When the matching strategy saves no estimated tokens (length ÷ 4, rounded up) — for example a code-like file of 25 lines or fewer, or a JSON array over 2,000 characters with 7 items or fewer — the aggressive engine keeps the original tool result: both callers (`compressAggressive()` and `compressAnthropicToolResultBlock()`) keep the original when `saved` is 0 or below, while `compressToolResult()` itself still returns that strategy's output. The tool-result step is not the last word: the engine's fallback summarizer can still shorten a `tool` or `function` message longer than 8,192 characters (`maxTokensPerMessage`, 2,048, times 4).

#### Hvornår skal bruges

Værktøjsresultatkompression er trin 1 i den aggressive motor (`compressAggressive()` i `open-sse/services/compression/aggressive.ts`), så den kører i aggressiv tilstand og i et `aggressive` trin i en stablet rørledning. Den komprimerer OpenAI-formede `tool` og `function` meddelelser og teksten inde i Anthropic `tool_result` blokke. Hver strategi har sin egen switch under `aggressive.toolStrategies`, alt slået til som standard. I dashboardet er kontakterne på Caveman-siden** Fremskreden** se, mens komprimering er aktiveret, og standardtilstanden er Aggressiv.

### Stablet rørledning

Den stablede tilstand kører** flere motorer i rækkefølge** — normalt RTK først (60-90 % besparelse på værktøjsoutput), derefter Caveman på den resterende tekst (~ 46 % inputbesparelse). Sammensat, det er** 78-95 % berettiget interval** (se Upstream Savings Math ovenfor): `1 - (1 - 0.60..0.90) × (1 - 0.46)` er i gennemsnit ≈ 89%.

#### Hvordan det virker

```
Input (1000 tokens)
  → RTK (command-aware filter) → 200 tokens
    → Caveman (filler removal) → 108 tokens
  → Output (108 tokens, ~89% savings)
```

#### Hvornår skal bruges

Brug stablet tilstand til:

- Værktøjstunge arbejdsgange (agent kodning, forskning)
- Omkostningsfølsom batchbehandling
- Når du har brug for maksimale token-besparelser

Stablede pipelines konfigureres gennem den globale `stackedPipeline` -komprimeringsindstilling eller gennem en navngivet kompressionskombination, der er tildelt en routing-kombination (se Per-Combo Override ovenfor) — ikke gennem en auto-combo `modePack` (det felt genvejer kun auto-combo modelvalg, og `stacked` er ikke et gyldigt pakkenavn).

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
