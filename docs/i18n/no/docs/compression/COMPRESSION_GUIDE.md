# 🗜️ Prompt Compression Guide — OmniRoute (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Spar automatisk 15–95 % på kvalifisert kontekst. For en rask oversikt, se [README-delen om komprimering](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Oversikt

OmniRoute implementerer en modulær pipeline for promptkomprimering som kjører **proaktivt** før forespørsler når oppstrømsleverandører. Dette betyr at tokenbesparelsene skjer transparent – uten at du trenger å endre arbeidsflyten.

```
Klientforespørsel
  → Valg av komprimeringsstrategi
    → Overstyring via kombinasjon? → Bruk kombinasjonsinnstillingen
    → Terskel for automatisk aktivering? → Bruk automatisk modus
    → Standardmodus? → Bruk global innstilling
    → Av? → Hopp over komprimering
  → Valgt komprimeringsmodus
    → Av: Ingen komprimering
    → Lett: Sikker opprydding av mellomrom/formatering (~15 %)
    → Standard: Fjerning av fyllord i Caveman-stil (~30 %)
    → Aggressiv: Aldring av historikk + oppsummering (~50 %)
    → Ultra: Heuristisk beskjæring + uttynning av kodeblokker (~75 %)
    → RTK: Kommandobevisst filtrering av terminal-/verktøyutdata (60–90 % oppstrømsintervall)
    → Stablet: Ordnet pipeline med flere motorer, vanligvis RTK og deretter Caveman (78–95 % kvalifisert intervall)
  → Komprimert forespørsel → Leverandør
```

---

## Komprimeringsmoduser

### Av

Ingen komprimering brukes. Alle meldinger sendes gjennom uendret.

### Lett modus (~15 % besparelse, <1 ms ventetid)

Den sikreste modusen – ingen semantiske endringer, bare opprydding av formatering:

| Teknikk                  | Beskrivelse                                                 |
| ------------------------ | ----------------------------------------------------------- |
| `collapseWhitespace`     | Slå sammen påfølgende tomme linjer og avsluttende mellomrom |
| `dedupSystemPrompt`      | Fjern dupliserte systemmeldinger                            |
| `compressToolResults`    | Komprimer ordrike verktøy-/funksjonsutdata                  |
| `removeRedundantContent` | Fjern gjentatte instruksjoner                               |
| `replaceImageUrls`       | Forkort base64-bildedata-URI-er                             |

**Best for:** Kontinuerlig bruk og sikkerhetskritiske arbeidsflyter.

### Standardmodus (~30 % besparelse)

Inspirert av [Caveman](https://github.com/JuliusBrussee/caveman) – fjerner fyllord og ordrike formuleringer samtidig som betydningen bevares:

- Fjerner fyllord («please», «I think», «basically», «actually»)
- Korter ned ordrike uttrykk («in order to» → «to», «as a result of» → «because»)
- Fjerner høflige forbehold («Would you mind...», «If you could possibly...»)
- Over 30 regex-regler tilpasset programmeringsprompter

**Best for:** Daglige programmeringsarbeidsflyter og kostnadsbevisste team.

### Aggressiv modus (~50 % besparelse)

Smart historikkhåndtering for lange økter:

- **Meldingsaldring** – eldre meldinger komprimeres gradvis
- **Komprimering av verktøyresultater** – lange verktøyutdata avkortes eller utelates (første/siste linjer,
  filtrering av samsvarende linjer, komprimering av JSON-nøkler)
- **Vern av strukturell integritet** – sikrer at par med `tool_use` + `tool_result` forblir konsistente
- **Bevissthet om kontekstvinduet** – respekterer tokengrensene for hver modell

**Best for:** Langvarige feilsøkingsøkter og store kodebaser.

### Ultra-modus (~75 % besparelse)

Maksimal komprimering for scenarier med kritiske tokenbegrensninger:

- **Heuristisk beskjæring** – poengbasert tokenbeskjæring av prosa
- **Bevaring av struktur** – inngjerdede kodeblokker, innebygd kode, URL-er og identifikatorer
  erstattes midlertidig og settes inn igjen ordrett, og beskjæres aldri
- **Valgfritt SLM-nivå** – en liten lokal modell kan finjustere beskjæringen når den er konfigurert
- Uavhengig av Aggressiv modus: Den kjører ikke meldingsaldring, komprimering av verktøyresultater
  eller reserveoppsummereren (bare en feil på SLM-nivået kan sende en reservepassering gjennom
  Aggressiv)

**Best for:** Når du gjentatte ganger når kontekstgrensene.

### RTK-modus (60–90 % oppstrømsintervall)

RTK-modus er optimalisert for ordrike verktøyutdata som forekommer i økter med programmeringsagenter:

- Oppdager kommando-/utdataklasser som `git status`, `git diff`, `git log`, testkjørere,
  TypeScript/Vite/Webpack-bygg, ESLint/Biome/Prettier, npm-revisjoner/installasjoner, Docker-logger, infrastrukturutdata
  og generelle shell-utdata
- Bruker JSON-filterpakker fra `open-sse/services/compression/engines/rtk/filters/`
- Importerer RTK TOML schema v1-filtre fra prosjektets eller globale `filters.toml`-filer, med validering
  av innebygde tester og tillitskontroll for prosjektfiler
- Leveres med 55 innebygde filtre med innebygde verifiseringseksempler
- Fjerner ANSI-kontrollsekvenser, fremdriftsindikatorer, gjentatte linjer og støy som ikke kan handles på
- Bevarer feil, advarsler, endrede filer, sammendrag og slutten av lange utdata
- Støtter tillitskontrollerte prosjektfiltre, globale filtre og valgfri gjenoppretting av sladdede råutdata

**Best for:** Agentøkter med shell-, bygg-, test-, git-, grep- og filutdatatranskripsjoner.

### Stablet modus (78–95 % kvalifisert intervall)

Stablet modus kjører flere komprimeringsmotorer i en deterministisk rekkefølge. Standardpipelinen er:

```txt
RTK -> Caveman
```

Denne rekkefølgen komprimerer først terminal-/verktøyutdata og bruker deretter Caveman-semantisk kondensering på
den gjenværende naturlige språkprompten. Stablede pipelines kan konfigureres globalt eller gjennom
komprimeringskombinasjoner som tilordnes rutekombinasjoner.

**Best for:** Blandet kontekst med store verktøylogger samt menneskelige instruksjoner eller assistentsammendrag.

---

## Utregning av oppstrømsbesparelser

OmniRoute dokumenterer komprimeringsbesparelser fra to kilder: referansemålinger fra oppstrømsprosjekter og
OmniRoutes egen kombinasjon av motorer.

| Kilde   | Tall fra oppstrøms-README som brukes her                                                                                                                              |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` færre utdatatokener, `65%` gjennomsnittlig besparelse på utdata i referansemålinger, et intervall på `22-87%` og et verktøy for `~46%` komprimering av inndata |
| RTK     | `60-90%` besparelse på kommandoutdata; eksempeløkt med `~118,000 -> ~23,900` tokener, eller `79.7%` spart (`~80%`)                                                    |

For overlappende verktøy-/kontekstnyttelaster stabler OmniRoutes standardkombinasjon motorene:

```txt
RTK -> Caveman
```

De kombinerte besparelsene er multiplikative, ikke additive:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Tallet `78-95%` gjelder når både RTK og Caveman kan redusere den samme inndata-/kontekstnyttelasten.
Cavemans modus for responsutdata er separat: Når den er aktivert, brukes Cavemans egne besparelser på utdata (`65%`
i gjennomsnitt, `~75%` som hovedtall, et intervall på `22-87%`). De totale faktureringsbesparelsene avhenger av blandingen av ledetekster og utdata.

### Hva «kvalifisert» faktisk betyr

Det oppgitte intervallet på 15–95 % er reelt, men det gjelder bare **redundant eller ordrikt** innhold – gjentatte
feillinjer, en byggelogg som spyr ut den samme advarselen, en overdimensjonert `grep`-/fillesingsdump. Det betyr
**ikke** at hver forespørsel sparer så mye.

Empirisk verifisert (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): En
`stacked`-kjøring (RTK + Caveman) mot en `tool_result`-blokk i Anthropic-format som inneholdt 300 identiske
feillinjer, ga **95.93% tokenbesparelse / 96.26% tegnbesparelse** – klart innenfor det annonserte
intervallet. Men når den samme behandlingskjeden kjøres mot normale, ikke-redundante verktøyutdata (en ren liste over `grep`-treff,
en kort fillesing, vanlig samtaletekst), gir den med rette **nær null besparelse**, fordi
det ikke finnes noe repetitivt å fjerne, og `validateCompression()` (`validation.ts`) nekter å sende en
omskriving som ville fjernet eller endret kodeblokker, URL-er, overskrifter, versjoner eller konstantidentifikatorer med STORE BOKSTAVER.

Dette er forventet og trygg oppførsel, ikke en feil: En kodeøkt som hovedsakelig leser/søker med grep i ryddige filer, vil
få beskjedne totale besparelser selv når komprimering er fullt aktivert, mens en økt som treffer en feilet
løkke eller en pratsom linter, vil oppnå hele intervallet på 78–95 % for denne trafikken. Ikke bruk en enkelt økts
lave samlede besparelsesprosent som bevis på at komprimeringen er feilkonfigurert – kontroller først om de
underliggende verktøyutdataene faktisk var redundante.

---

## Visualisering av tokenbesparelser

```
Uten komprimering: 47K tokener sendt til LLM
Med Lite:          40K tokener sendt          (15% spart — trygt, alltid aktivert)
Med Standard:      33K tokener sendt          (30% spart — regler for huleboerspråk)
Med Aggressive:    24K tokener sendt          (50% spart — aldring + oppsummering)
Med Ultra:         12K tokener sendt          (75% spart — heuristisk beskjæring)
Med RTK:           19K-5K tokener sendt       (60-90% spart på kommando-/verktøyutdata)
Med Stacked:       10K-2.5K tokener sendt     (78-95% kvalifisert RTK+Caveman-intervall)
```

---

## Konfigurasjon

### Kontrollpanel

Gå til `Dashboard → Context & Cache`:

- **Caveman** — valg av modus, språkpakker, forhåndsvisning og globale standardinnstillinger
- **RTK** — forhåndsvisning av kommandofilter, sikkerhetsinnstillinger for RTK og filterkatalog
- **Compression Combos** — navngitte motorpipelines tilordnet rutingskombinasjoner
- **Auto-Trigger Threshold** — aktiver komprimering automatisk når antallet tokener overstiger terskelen

### Overstyring per kombinasjon

I `Dashboard → Context & Cache → Compression Combos` tilordner du en komprimeringskombinasjon til en rutingskombinasjon:

```txt
Kombinasjon: "free-tier-fallback"
  Komprimeringskombinasjon: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Mål:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Dette gjør at du kan bruke stablet komprimering hos kostnadsfrie leverandører og kodeleverandører, samtidig som du beholder lettmodus for betalte abonnementer.

Denne tilordningen med «Overstyring per kombinasjon» er en annen kontroll enn overstyringen av **komprimeringsmodus for rutingskombinasjonen** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — feltets skjema godtar også `rtk`, `stacked` og `omniglyph`) — denne overstyringen velger ikke en navngitt pipeline for en komprimeringskombinasjon. Den angir bare feltet `compressionMode`, som brukes av `resolveCompressionPlan`. Den kan angis enten på kombinasjonskortet (`Dashboard → Combos`) eller, siden #6760, per rutingskombinasjon i listen «Assign to routing» under `Dashboard → Context & Cache → Compression Combos`, rett ved siden av avmerkingsboksen for pipelinetilordning som er dokumentert ovenfor. Begge grensesnittene lagrer via det samme `PUT /api/combos/{id}`-endepunktet.

### Overstyring per forespørsel

Send forespørselshodet `x-omniroute-compression` for å overstyre komprimeringsplanen for én enkelt forespørsel. Det har høyest prioritet — det overstyrer rutingskombinasjonens overstyring, den aktive profilen, automatisk aktivering og panelets standardinnstilling. Ukjente verdier ignoreres (forespørselen avvises aldri), og den globale hovedbryteren styrer fortsatt alt: Når komprimering er slått av globalt, kan ikke hodet slå den på. Verdier:

| Verdi         | Effekt                                                                                                           |
| ------------- | ---------------------------------------------------------------------------------------------------------------- |
| `off`         | Ingen komprimering for denne forespørselen.                                                                      |
| `default`     | Standardprofilen avledet fra panelet (ignorerer den aktive profilen). Tapsbaserte motorer forblir avslått.       |
| `safe`        | Samme som å utelate hodet: bare deduplisering og sammenslåing av mellomrom.                                      |
| `allow-lossy` | Behold operatørplanen for denne forespørselen, inkludert sammendrag, relevansfiltre og stilomskrivinger.         |
| `engine:<id>` | Én enkelt motor når den er aktivert, f.eks. `engine:rtk`. Dette er aktivering per forespørsel for denne motoren. |
| `<combo>`     | En navngitt kombinasjon, først matchet etter navn (uten hensyn til store og små bokstaver), deretter etter id.   |

Uten `allow-lossy`, `engine:<id>` eller en navngitt kombinasjon brukes ikke tapsbaserte motorer. Forespørselen får fortsatt øktdeduplisering og sammenslåing av mellomrom når komprimering er slått på.

Den anvendte planen returneres i svarhodet `X-OmniRoute-Compression: <mode>; source=<source>`, der `<source>` er én av `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` eller `off`.

### API

```bash
# Hent komprimeringsinnstillinger
curl http://localhost:20128/api/settings/compression

# Oppdater komprimeringsinnstillinger
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Forhåndsvis en bestemt RTK-/stacked-nyttelast
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# List opp RTK-filterpakker
curl http://localhost:20128/api/context/rtk/filters

# Test RTK direkte med valgfrie kommandometadata
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Hva som beskyttes

Komprimeringsmotoren **bevarer alltid:**

- ✅ Kodeblokker (inngjerdede og integrerte)
- ✅ URL-er og filbaner
- ✅ JSON-strukturer og strukturerte data
- ✅ Identifikatorer og beskyttede tekniske symboler
- ✅ Matematiske uttrykk
- ✅ Definisjoner av verktøy-/funksjonskall
- ✅ Systeminstruksjoner (i Lite-modus)

Gjenoppretting av RTK-rådata maskerer vanlige API-nøkler, bearer-tokener, Slack-tokener, AWS-tilgangsnøkler,
passord, tokener og hemmeligheter før noe lagres.

---

## Komprimeringsstatistikk

Hver komprimerte forespørsel inkluderer statistikk i serverloggene:

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

## Faseplan

| Fase    | Moduser                                                                                                                                                     | Status     |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Fase 1  | Off, Lite                                                                                                                                                   | ✅ Lansert |
| Fase 2  | Standard, Aggressive, Ultra                                                                                                                                 | ✅ Lansert |
| Fase 3  | RTK, Stacked, Compression Combos                                                                                                                            | ✅ Lansert |
| Fase 4  | Output Styles, SLM-tier Ultra, eval harness                                                                                                                 | ✅ Lansert |
| Fase 4C | Adaptivt kontekstbudsjett ("dial") — beregningsmotor + API (`contextBudget` på `PUT /api/settings/compression`) + modus-/policykontroller i kontrollpanelet | ✅ Lansert |

---

## Anerkjennelser

Komprimeringsreglene for Standard-modus er inspirert av **[Caveman](https://github.com/JuliusBrussee/caveman)** av **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — det virale «why use many token when few token do trick»-prosjektet. Caveman rapporterer `~75%` færre utdatatokener, en gjennomsnittlig besparelse på `65%` for referansetestens utdata, et utdataområde på `22-87%` og et verktøy for inndatakomprimering på `~46%`.

RTK-modus er inspirert av **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** av **[RTK AI](https://github.com/rtk-ai)** — prosjektet for høyytelseskomprimering av kommandoutdata for filtrering av terminal-, bygge-, test-, git- og verktøyutdata. RTK rapporterer besparelser på `60-90%`, og eksempeløkten i prosjektets README viser en besparelse på `~80%`.

---

## Avanserte komprimeringssystemer

I tillegg til de 7 modusene som er beskrevet ovenfor (kilden godtar også modusene `codex-responses` og
`omniglyph`, som denne veiledningen ikke dekker), beskriver avsnittene nedenfor funksjoner
som fungerer i eller sammen med disse modusene: Komprimering av verktøyresultater og progressiv aldring
er trinn 1 og 2 i den aggressive motoren (Aggressiv-modus og et `aggressive`-trinn i en
stablet pipeline), Stablet pipeline er måten Stablet-modus kjøres på, hurtigbufferbevisst komprimering
nedgraderer `aggressive` og `ultra` til `standard` for leverandører med hurtigbufring når komprimering
er aktivert, og Caveman-utdatamodus og utdatastiler er valgfrie systempromptinstruksjoner,
deaktivert som standard, som former modellens utdata i stedet for å komprimere forespørselen.

### Hurtigbufferbevisst komprimering

Enkelte leverandører (som Anthropic med promptbufring) støtter **promptbufring**,
som gjør at de kan hurtigbufre deler av prompten for å redusere kostnader og ventetid. Når
hurtigbufring er aktivert, kan aggressiv komprimering faktisk **svekke** ytelsen
fordi den endrer de hurtigbufrede tokenene og dermed ugyldiggjør hurtigbufferen.

Modulen `cachingAware.ts` løser dette ved å **oppdage hurtigbufringskonteksten** og
**justere komprimeringsstrategien** tilsvarende.

#### Slik fungerer det

1. **Oppdag hurtigbufringskonteksten** — Søker gjennom forespørselskroppen etter `cache_control`-markører
2. **Identifiser leverandører med hurtigbufring** — Kontrollerer om målleverandøren støtter hurtigbufring
3. **Juster strategien** — Nedgraderer `aggressive`/`ultra` til `standard` for leverandører med hurtigbufring
4. **Hopp over systemprompten** — Systemprompter blir vanligvis hurtigbufret, så ikke komprimer dem

Strategihjelperen returnerer også et `deterministicOnly`-flagg, men planbyggeren bruker
bare strategien — ingenting nedstrøms leser flagget i dag.

#### Kodeeksempel

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Hurtigbuffermarkør
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Når det bør brukes

Hurtigbufferbevisst komprimering er **alltid aktivert** — ingen konfigurasjon er nødvendig. Den trer i kraft når
komprimering er aktivert og målleverandøren støtter promptbufring (Anthropic, OpenAI,
osv.); eksplisitte `cache_control`-markører er ikke påkrevd — en leverandør med hurtigbufring alene
utløser nedgraderingen, mens markører alene aldri gjør det (markørdeteksjon leverer data til
hurtigbuffertelemetri, ikke strategibeslutningen).

### Progressiv aldring

Lange samtaler samler opp mange meldingsrunder, men eldre runder blir mindre
relevante. Modulen `progressiveAging.ts` **forenkler meldinger basert på avstanden i antall runder**
(avstanden måles fra slutten av samtalen). Med standardinnstillingene som leveres
(`verbatim: 2, light: 2, moderate: 3`):

- **De siste 2 rundene (avstand ≤ 2)**: Beholdes ordrett
- **Avstand 3**: Caveman-komprimering (fjerning av fyllord)
- **Avstand 4+**: Assistentmeldinger oppsummeres; brukermeldinger reduseres til sin første
  linje, begrenset til 120 tegn; andre roller forblir urørt. Systemprompter, allerede aldrede
  meldinger og den nyeste brukermeldingen beholdes alltid ordrett uansett avstand.
  Ingenting fjernes fullstendig, og `light`-intervallet
  kan ikke nås med standardinnstillingene som leveres (`light` er lik `verbatim`).

#### Kodeeksempel

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 runder til ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // siste 3 runder: ordrett
  light: 8, // avstand <= 8: lett komprimering
  moderate: 20, // avstand <= 20: caveman-komprimering
  fullSummary: 5, // påkrevd av typen, leses ikke av inndelingskoden
  // avstand > 20: oppsummert (assistent) / første linje beholdes (bruker)
});

// saved = antall token som er spart
```

#### Når det bør brukes

Progressiv aldring er **alltid aktivert** for `aggressive`-modus — det er trinn 2 i
`compressAggressive()`. Ultra-modus kjører det ikke. Det er
spesielt effektivt for:

- Langvarige kodeøkter
- Samtaler som varer i flere dager
- Agentbaserte arbeidsflyter med mange verktøykall

### Caveman-utdatamodus

Caveman-utdatamodus legger til **systempromptinstruksjoner** som ber modellen selv om
kortfattede utdata — nivået `lite` ber om konsise svar som beholder fullstendige setninger, `full`
ber den om å «svare kortfattet som en smart huleboer», og `ultra` ber om telegrafiske utdata;
instruksjonene kan bare be om dette, de kan ikke garantere det. Forespørsler mottar dem gjennom
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`):
`open-sse/handlers/chatCore.ts` løser først valget med bakoverkompatibilitetsmellomlaget
(`resolveOutputStyleSelection()` i
`open-sse/services/compression/outputStyles/backCompat.ts`), som, når `outputStyles`
er tom, tilordner en aktivert `cavemanOutputMode` til utdatastilen `terse-prose` med
`cavemanOutputMode.intensity` (se Bakoverkompatibilitet nedenfor); et ikke-tomt `outputStyles`-valg
brukes som det er, og `cavemanOutputMode.enabled` og `intensity` har da ingen
effekt, mens `autoClarity`-bryteren fortsatt gjelder. `outputMode.ts` inneholder
instruksjonstekstene (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), innholdsomgåelsen og
plasseringshjelperen som innsettingen bruker; dens egen `applyCavemanOutputMode()`-innsettingsfunksjon har ingen
kaller i produksjon.

#### Slik fungerer det

Denne modusen komprimerer ikke inndataene. Den legger til en instruksjonsblokk i systemprompten
(se Hvordan injisering fungerer nedenfor), og eventuell inndatakomprimeringsmodus som er valgt for forespørselen,
kjøres fortsatt etterpå på innholdet som nå inneholder blokken. Før den delte
begrensningsklausulen som hvert nivå avsluttes med, lyder det engelske `full`-nivået:

> "Svar kortfattet som smart huleboer. Dropp artikler (a/an/the), fyllord (just/really/basically/actually/simply), høflighetsfraser, forbehold. Fragmenter OK. Korte synonymer (big, ikke extensive; fix, ikke implement). Behold alt teknisk innhold, kode, feil, URL-er og identifikatorer nøyaktig."

Dette fungerer spesielt godt for:

- Kodegenerering (kortere utdata = færre tokener)
- Raske spørsmål og svar (ikke behov for utførlige forklaringer)
- Batchbehandling (maksimer gjennomstrømning)

#### Når den bør brukes

Huleboermodus for utdata er **valgfri**. Når komprimering er på (`enabled: true`, hovedbryteren
på siden Compression Settings), slår du den på med `cavemanOutputMode.enabled`; `intensity`
velger `lite`, `full` eller `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

En komprimeringskombinasjons **Output Mode**-bryter (`outputMode`, med nivå i `outputModeIntensity`)
angir den samme innstillingen for forespørslene kombinasjonen gjelder for, og MCP-verktøyet
`omniroute_set_compression_engine` skriver den via sitt boolske `outputMode`-argument.
Et ikke-tomt `outputStyles`-valg har forrang over denne bryteren. I kontrollpanelet injiserer
aktivering av utdatastilen **Terse prose** den samme blokken (se Output Styles nedenfor).

### Utdatastiler (katalog)

Huleboermodusen for utdata ovenfor er den **eldre enkeltstilbanen**. Fase 4 generaliserte den
til en katalog med kombinerbare utdatastiler: `OUTPUT_STYLE_CATALOG` i
`open-sse/services/compression/outputStyles/catalog.ts`. Hver stil er en systempromptinstruksjon
som ber modellen selv om mer kostnadseffektive utdata. Stiler kan aktiveres
sammen og injiseres i katalogrekkefølge.

| Stil                                   | `id`            | Hva den gjør                                                                                                                                                                                                                                             | Instruksjonsspråk                             |
| -------------------------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Kortfattet prosa                       | `terse-prose`   | Dropp fyllord/artikler/forbehold; behold teknisk innhold nøyaktig. Samme tekst som den eldre huleboermodusen for utdata (referert til, ikke skrevet på nytt).                                                                                            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Mindre kode                            | `less-code`     | YAGNI-stige: minste fungerende endring, ingen abstraksjoner som ikke er etterspurt.                                                                                                                                                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Hestehale (lat seniorutvikler)         | `ponytail`      | «Den beste koden er koden som aldri ble skrevet»: gjenbruk > omskriving, rotårsak > symptom, kortest fungerende diff.                                                                                                                                    | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Jeg har ADHD (handling først)          | `i-have-adhd`   | Handling først (kommando/bane/kodebit før prosa), nummererte og avgrensede trinn, ETT konkret neste trinn, ingen innledning/oppsummering/avslutningsfraser. Tilpasset fra [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT).             | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop-filter for brukergrensesnitt  | `antislop-ui`   | Hver visuell teknikk må bestå en formålstest (hierarki, identitet, lesbarhet); ingen standardgraderinger/glass/glød, begrenset palett, ingen malbaserte oppsett. Begge antislop-stilene legger til en grense mot døde kontroller / oppdiktede påstander. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop-filter for tekst og mennesker | `antislop-copy` | Konkret tekst (ingen tankestrek, generiske handlingsoppfordringer, moteord, chatbot-avslutninger eller oppdiktede fakta), pluss regler for mennesker: WCAG AA-kontrast, synlig fokus, tastaturtilgang, tom-/laste-/feiltilstander, mobil omflytning.     | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Kortfattet CJK (文言)                  | `terse-cjk`     | `full`/`ultra` svarer på klassisk kinesisk (文言); `lite` ber bare om korte svar uten funksjonsord, høflighetsfraser eller utsmykning.                                                                                                                   | zh (språkområdebegrenset, se nedenfor)        |

Hver stil leveres med tre intensitetsnivåer — `lite`, `full`, `ultra` — og hvert nivå
avsluttes med den delte begrensningsklausulen (`SHARED_BOUNDARIES` i `outputMode.ts`), som
beholder kodeblokker, filbaner, kommandoer, feil og URL-er nøyaktig. Nivåtekstene for `terse-prose` og
`terse-cjk` legger til identifikatorer i denne listen.

`terse-cjk` er begrenset til språkområdet `zh` på to steder. Siden Compression Settings viser
raden bare når språket i kontrollpanelets brukergrensesnitt er kinesisk (`zh-CN` eller `zh-TW`), og
`applyOutputStyles()` injiserer den bare når forespørselens fastsatte språk (se Språkvalg
nedenfor) er `zh`. Å skjule raden fjerner ikke et lagret `terse-cjk`-valg:
innstillings-API-et godtar enhver stil-ID, og lagring av andre stiler på siden beholder det. På
forespørselstidspunktet er språkkontrollen i `applyOutputStyles()` den eneste språkområdebegrensningen.

#### Hvordan injisering fungerer

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) sammenholder
utvalget med katalogen (ukjente ID-er og stiler som ikke samsvarer med språkinnstillingen,
utelates og fører aldri til feil; et utvalg som ikke gir noen stil, lar innholdet forbli
uendret og hoppes over som `no_styles`), slår sammen de valgte instruksjonene i katalogens
rekkefølge,
legger til avgrensningsklausulen **én gang** (samt sikkerhetsklausulen, `SAFETY_BOUNDARIES`
eller oversettelsen av den, når `less-code` eller `ponytail` er valgt), og starter blokken
med én enkelt idempotensmarkør (`[OmniRoute Output Styles]`), slik at en ny anvendelse
ikke gjør noe. Når det løste språket (se Språkvalg nedenfor) har en oversettelse, settes
den lokaliserte instruksjonen inn i stedet for den engelske.

For et innhold med en ikke-tom `messages`-matrise utføres idempotenskontrollen før
innholdsforbikoblingen: Når markøren `[OmniRoute Output Styles]` allerede finnes i
`system`-feltet på toppnivå (en streng eller en matrise med innholdsblokker) eller i en
systemmelding med strenginnhold, forblir innholdet uendret som `already_applied`, og
ingen nøkkelordkontroll utføres. Ellers kontrollerer en innholdsforbikobling
(`shouldBypassCavemanOutputMode()` i
`open-sse/services/compression/outputMode.ts`) teksten i de tre siste meldingene,
uavhengig av rollen deres, og hopper over stilene for hele runden når teksten samsvarer
med nøkkelordene for sikkerhet, irreversible handlinger eller avklaringer, eller med en
rekkefølgefølsom sekvens: `first`, `then`, `after that`, `before`, `rollback` eller
`backup` etterfulgt innen 240 tegn av `delete`, `drop`, `migrate`, `deploy` eller
`release`. Forbikoblingen kjøres så lenge bryteren **Auto-Clarity Bypass**
(`cavemanOutputMode.autoClarity`, på som standard) er på; hvis bryteren slås av, hoppes
nøkkelordkontrollen over.

Når forbikoblingen slipper runden gjennom, plasserer `placeSystemInstruction()` (samme
fil), som aldri oppretter en ny `messages[0]`, blokken på det første av disse stedene den
finner:

1. En innledende systemmelding med strenginnhold: Blokken legges til etter teksten.
2. `system`-feltet på toppnivå: Blokken legges til etter teksten i en streng, eller
   legges til som en ny tekstblokk i en matrise med innholdsblokker.
3. Den første senere systemmeldingen med strenginnhold: Blokken legges til etter
   teksten.
4. Ingen av alternativene ovenfor: Blokken legges i en ny systemmelding på slutten av
   `messages`.

For et innhold uten en `messages`-matrise (eller med en tom matrise) utføres ingen
innholdsforbikobling, og et `system`-felt på toppnivå tas ikke i betraktning. Blokken
legges til etter teksten i et `instructions`-felt av typen streng, med mindre feltet
allerede inneholder markøren `[OmniRoute Output Styles]`. I så fall forblir innholdet
uendret som `already_applied`. Når innholdet ikke har et `instructions`-felt av typen
streng, men inneholder `input` (en streng eller en matrise), blir blokken til
`instructions` og erstatter en eventuell verdi som ikke er en streng, i dette feltet.
Et innhold uten både et `instructions`-felt av typen streng og en `input`-verdi som er en
streng eller matrise, forblir uendret og hoppes over som `no_messages`.

#### Slik aktiverer du det

I kontrollpanelet: **Compression Context → Compression Settings**
(`/dashboard/context/settings`), delen Output styles: én rad per stil med en
av/på-bryter og en nivåvelger. Stiler settes inn mens selve komprimeringen er på
(sidens hovedbryter, `enabled`). Bryteren **Auto-Clarity Bypass** finnes på
**Caveman**-siden (`/dashboard/context/caveman`), i kortet **Output Mode**.
Programmatisk lagrer komprimeringskonfigurasjonen utvalget som:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Bakoverkompatibilitet: Så lenge `outputStyles` er tom, tilordnes den eldre innstillingen
`cavemanOutputMode.enabled` til `terse-prose` med `cavemanOutputMode.intensity`. Blokken
starter da med markøren `[OmniRoute Output Styles]`, mens den eldre injektoren
`applyCavemanOutputMode()` skrev `[OmniRoute Caveman Output Mode]`. Under markøren
samsvarer teksten med den eldre innsettingen på en, pt-BR, es, de, fr, it, ru, id og vi;
på ja og zh inneholder den ett ekstra mellomrom før avgrensningsklausulen. `terse-prose`
er oversatt til pt-BR, es, de, fr, it, ru, zh, ja, id og vi, så en forespørsel med `hu`
som løst språk får den engelske teksten der den eldre injektoren brukte den ungarske.

Språkvalg for utdatastiler (`resolveOutputStyleLanguage()` i
`outputStyles/apply.ts`): Når `languageConfig.enabled` er på, henter `autoDetect` et
utdrag fra den nyeste brukermeldingen i forespørselens `messages`-matrise som inneholder
tekst (strenginnhold eller `text` fra innholdsdelene), og kjører Caveman-motorens
detektor (`detectCompressionLanguage()`) på det. Detektoren returnerer `zh` for tekst med
Han-tegn og ingen kana; ellers returnerer den det av `it`, `pt-BR`, `es`, `de`, `fr`,
`ru`, `ja`, `hu` og `id` som har flest samsvarende indikasjoner, og `en` når ingen
samsvarer — tekst den ikke kan klassifisere, får engelsk, aldri `defaultLanguage`, og
`vi` oppdages aldri selv om stilene leveres med tekst på `vi`. Et Responses API-innhold
oppbevarer rundene sine i `input`, som ikke analyseres, og får derfor
`defaultLanguage`, deretter engelsk. Når ingen brukermelding i `messages` inneholder
tekst, eller når `autoDetect` er av, brukes `defaultLanguage`, deretter engelsk. Når
`languageConfig.enabled` er av, er språket engelsk — med mindre en
komprimeringskombinasjon gjelder for forespørselen (en kombinasjon tilordnet
forespørselens rutingskombinasjon, eller standardkombinasjonen for komprimering som
chatCore faller tilbake på for den innebygde stablede behandlingskjeden): Når en
kombinasjon brukes, slås `languageConfig.enabled` på for den aktuelle forespørselen, og
`defaultLanguage` angis fra kombinasjonens språkpakker (den lagrede verdien hvis den er
en av kombinasjonens pakker, ellers kombinasjonens første pakke, som som standard er
`en`), mens den lagrede `autoDetect`-innstillingen (på som standard) fortsatt gjelder.
Caveman-inndatamotoren velger språk for regelpakken på en annen måte — per tekstdel og,
når automatisk gjenkjenning er av, begrenset av `enabledPacks`.

Stil × språk-matrisen er fastsatt av
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: hver katalogstil må ha en
oppføring i testens `BASELINE_LANGUAGES`; en stil som ikke er avgrenset etter språkinnstilling, må leveres med en
pt-BR-oversettelse (den språkavgrensede `terse-cjk` er unntatt fra denne regelen), med mindre den er
oppført i `KNOWN_ENGLISH_ONLY`, som bare kan inneholde stiler helt uten oversettelser —
en oppført stil som har en oversettelse, får testen til å feile; og en stil får testen til å feile når
den mister et språk som er oppført i dens `BASELINE_LANGUAGES`-oppføring. For å legge til en stil, se
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Komprimering av verktøyresultater

`compressToolResult()` i `open-sse/services/compression/toolResultCompressor.ts`
komprimerer tekst fra verktøyresultater med **5 strategier**. Den prøver dem i denne rekkefølgen, og den
første aktiverte strategien der kontrollen samsvarer med innholdet, bestemmer resultatet:

1. **`fileContent`**: innhold på 3 eller flere linjer der minst én linje, når
   innledende innrykk ignoreres, begynner med `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` eller `return ` (nøkkelordet pluss et mellomrom), eller med `if`,
   `for` eller `while` etterfulgt av `(` eller ` (`, beholder de første 20 og siste 5 linjene, med
   den utelatte midtdelen markert.
2. **`grepSearch`**: innhold med minst én linje på formen `<path>:<digits>:`,
   der teksten før det første kolonnet ikke har mellomrom, beholder bare disse linjene, opptil
   30, etterfulgt av antallet eventuelle ytterligere treff og listen over filer med treff;
   alle andre linjer fjernes. Én slik linje er nok til å utløse strategien, så en
   logglinje som begynner med et tidsstempel som `12:30:45`, teller også.
3. **`shellOutput`**: utdata som inneholder en ANSI CSI-sekvens (`ESC[` etterfulgt av sifre eller
   semikolon og deretter en bokstav, som i fargekoder) eller et `$` etterfulgt av mellomrom
   hvor som helst i teksten, mister disse sekvensene (andre escape-sekvenser, som `ESC[?25l` eller en
   OSC-sekvens for vindustittel, beholdes) og beholder de siste 50 linjene, med sammenhengende
   gjentatte linjer slått sammen. Fordi denne kontrollen kjøres før `json` og `errorMessage`,
   når JSON- eller feilutdata som inneholder et slikt `$`, aldri frem til dem mens
   `shellOutput` er aktivert.
4. **`json`**: en JSON-nyttelast på over 2 000 tegn som begynner med `{` eller `[` (etter
   eventuelle mellomrom) og kan analyseres, oppsummeres: en matrise med mer enn 7 elementer beholder
   de første 5 og siste 2 elementene og det totale antallet, og et objekt beholder sine første 20
   nøkler, der hver nestede objekt- eller matriseverdi erstattes av en `{…N keys}`-plassholder
   (for en matrise er N lengden) og en `_remaining_<N>_keys`-markør som teller nøklene
   som ble fjernet etter de første 20. Skalarverdier kopieres i sin helhet, så et objekt med 20 nøkler
   eller færre uten nestede verdier får bare ny innrykkformatering — et minifisert objekt får flere tegn
   og forblir uendret.
5. **`errorMessage`**: utdata som inneholder, hvor som helst og uavhengig av store og små bokstaver, `error:`,
   `error ` (ordet etterfulgt av et mellomrom, som i `no error found`), `[error]`,
   `exception:`, `exception `, `[exception]` eller `traceback`, beholder den første linjen, de
   neste 10 linjene og de siste 3, med en `… [N frames elided] …`-markør i stedet for
   linjene mellom dem. Markøren vises bare når mer enn 13 linjer følger etter den første
   linjen, så feilutdata på 14 linjer eller færre forkortes ikke (ved 12 eller 13 linjer
   gjentar de siste 3 linjer som allerede er beholdt).

Etter at en strategi har gitt treff, prøves ikke de senere strategiene, selv om den ikke
sparer noe. Når strategien som gir treff, ikke sparer noen estimerte tokener (lengde ÷ 4, rundet opp) —
for eksempel en kodelignende fil på 25 linjer eller færre, eller en JSON-matrise på over 2 000
tegn med 7 elementer eller færre — beholder den aggressive motoren det opprinnelige
verktøyresultatet: begge kallere (`compressAggressive()` og `compressAnthropicToolResultBlock()`)
beholder originalen når `saved` er 0 eller mindre, mens `compressToolResult()` selv fortsatt
returnerer strategiens utdata. Trinnet for verktøyresultater er ikke siste instans:
motorens reserveoppsummerer kan fortsatt forkorte en `tool`- eller `function`-melding som er lengre
enn 8 192 tegn (`maxTokensPerMessage`, 2 048, ganger 4).

#### Når det bør brukes

Komprimering av verktøyresultater er trinn 1 i den aggressive motoren (`compressAggressive()` i
`open-sse/services/compression/aggressive.ts`), så den kjøres i Aggressive-modus og i et
`aggressive`-trinn i en stablet pipeline. Den komprimerer `tool`- og `function`-meldinger i
OpenAI-format og teksten inne i Anthropic-`tool_result`-blokker. Hver strategi har sin egen
bryter under `aggressive.toolStrategies`, og alle er aktivert som standard. I kontrollpanelet
finnes bryterne i **Advanced**-visningen på Caveman-siden når komprimering er aktivert og
standardmodusen er Aggressive.

### Stablet pipeline

Stablet modus kjører **flere motorer i rekkefølge** — vanligvis RTK først
(60–90 % besparelse på verktøyutdata), deretter Caveman på den gjenværende teksten (~46 % besparelse
på inndata). Kombinert gir dette det **kvalifiserte området på 78–95 %** (se beregningen av
oppstrømsbesparelser ovenfor): `1 - (1 - 0.60..0.90) × (1 - 0.46)` gir i gjennomsnitt ≈89 %.

#### Slik fungerer det

```
Inndata (1000 tokener)
  → RTK (kommandobevisst filter) → 200 tokener
    → Caveman (fjerning av fyllstoff) → 108 tokener
  → Utdata (108 tokener, ~89 % besparelse)
```

#### Når det bør brukes

Bruk stablet modus for:

- Verktøytunge arbeidsflyter (agentbasert programmering, forskning)
- Kostnadssensitiv satsvis behandling
- Når du trenger maksimal tokenbesparelse

Stablede pipelines konfigureres gjennom den globale komprimeringsinnstillingen
`stackedPipeline`, eller gjennom en navngitt komprimeringskombinasjon som er tilordnet en
rutingskombinasjon (se overstyring per kombinasjon ovenfor) — ikke gjennom en automatisk kombinasjons
`modePack` (dette feltet omvekter bare modellvalget for automatiske kombinasjoner, og `stacked`
er ikke et gyldig pakkenavn).

---

## Overstyringer for komprimeringskombinasjoner

Du kan overstyre den globale komprimeringsmodusen **per kombinasjon** for å finjustere virkemåten
for ulike bruksområder:

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

Dette er nyttig for:

- **Kodekombinasjoner**: Bruk `aggressive`-modus for lange økter
- **Kombinasjoner for raske spørsmål og svar**: Bruk `lite`-modus for raske svar
- **Verktøytunge kombinasjoner**: Bruk `stacked`-modus for størst mulig besparelse
- **Produksjonskombinasjoner**: La overstyringen være avslått for leverandører med hurtigbufring — den alltid aktive
  hurtigbufferbevisste justeringen nedgraderer `aggressive`/`ultra` til `standard` automatisk
  (det finnes ingen valgbar `cache-aware`-modus)

---

## Se også

- [Miljøkonfigurasjon](../reference/ENVIRONMENT.md) — Miljøvariabler for komprimering
- [Arkitekturveiledning](../architecture/ARCHITECTURE.md) — Intern virkemåte for komprimeringsforløpet
- [Brukerveiledning](../guides/USER_GUIDE.md) — Kom i gang med komprimering
- [RTK-komprimering](./RTK_COMPRESSION.md) — RTK-filtre, tillitsmodell, verifiseringsport og gjenoppretting av rådata
- [Komprimeringsmotorer](./COMPRESSION_ENGINES.md) — Caveman, RTK, stablet modus, API-er, MCP og kontrollpanel
- [Format for komprimeringsregler](./COMPRESSION_RULES_FORMAT.md) — JSON-format for regelpakker
- [Språkpakker for komprimering](./COMPRESSION_LANGUAGE_PACKS.md) — Språkspesifikke Caveman-regler
