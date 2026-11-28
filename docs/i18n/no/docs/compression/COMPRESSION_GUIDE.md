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

Ingen komprimering utført. Alle meldinger sendes videre uendret.

### Lite-modus (~15 % besparelse, <1 ms latenstid)

Den sikreste modusen — opprydding i formatering. Trunkering av verktøyresultater er tapsbringende, så standardbanen
(uten `allow-lossy`, `engine:lite` eller eksplisitt opt-in for navngitt kombinasjon) kjører lite med
`compressToolResults: false`: tidligere verktøyresultater når leverandøren uendret.

| Teknikk                  | Beskrivelse                                                                                     |
| ------------------------ | ----------------------------------------------------------------------------------------------- |
| `collapseWhitespace`     | Slå sammen etterfølgende tomme linjer og mellomrom på slutten                                   |
| `dedupSystemPrompt`      | Fjern dupliserte systemmeldinger                                                                |
| `compressToolResults`    | Trunker tidligere verktøyresultater til lite-grensen (tapsbringende: kun med eksplisitt opt-in) |
| `removeRedundantContent` | Fjern gjentatte instruksjoner                                                                   |
| `replaceImageUrls`       | Forkort base64-baserte data-URI-er for bilder                                                   |

**Best for:** Alltid-på-bruk og sikkerhetskritiske arbeidsflyter.

### Standardmodus (~30 % besparelse)

Inspirert av [Caveman](https://github.com/JuliusBrussee/caveman) — fjerner fyllord og omstendelige formuleringer samtidig som betydningen bevares:

- Fjerner fyllord («vær så snill», «jeg tror», «i bunn og grunn», «egentlig»)
- Komprimerer omstendelige formuleringer («for å» → «å», «som et resultat av» → «fordi»)
- Fjerner høflig forbehold («Har du noe imot ...», «Hvis du muligens kunne ...»)
- Over 30 regulære uttrykksregler tilpasset kodeforespørsler

**Best for:** Daglige arbeidsflyter for koding og kostnadsbevisste team.

### Aggressiv modus (~50 % besparelse)

Smart historikkhåndtering for lange økter:

- **Meldingsaldring** — eldre meldinger komprimeres gradvis
- **Komprimering av verktøyresultater** — lange verktøyutdata trunkeres eller utelates (første/siste linjer,
  filtrering etter samsvarende linjer, komprimering av JSON-nøkler)
- **Vakter for strukturell integritet** — sikrer at par med `tool_use` + `tool_result` forblir konsistente
- **Bevissthet om kontekstvinduet** — respekterer tokenbegrensninger per modell

**Best for:** Utvidede feilsøkingsøkter og store kodebaser.

### Ultra-modus (~75 % besparelse)

Maksimal komprimering for tokensensitive scenarioer:

- **Heuristisk beskjæring** — tokenbeskjæring av prosa basert på poengsum
- **Bevaring av struktur** — kodeblokker med gjerder, innebygd kode, URL-er og identifikatorer
  markeres og settes sammen igjen ordrett, og beskjæres aldri
- **Valgfritt SLM-nivå** — en liten lokal modell kan forbedre beskjæringen når den er konfigurert
- Uavhengig av aggressiv modus: den kjører ikke meldingsaldring, komprimering av verktøyresultater
  eller reservesammendraget (kun en feil på SLM-nivå kan rute en reservegjennomgang gjennom aggressiv modus)

**Best for:** Når du gjentatte ganger når kontekstgrensene.

### RTK-modus (60–90 % i oppstrømsområdet)

RTK-modus er optimalisert for ordrike verktøyutdata som forekommer i økter med kodeagenter:

- Oppdager kommando-/utdataklasser som `git status`, `git diff`, `git log`, testkjørere,
  TypeScript/Vite/Webpack-bygg, ESLint/Biome/Prettier, npm-revisjoner/-installasjoner, Docker-logger, infrastrukturutdata
  og generiske skallutdata
- Bruker JSON-filterpakker fra `open-sse/services/compression/engines/rtk/filters/`
- Importerer RTK TOML-skjema v1-filtre fra prosjekt- eller globale `filters.toml`-filer, med validering av innebygde tester
  og tillitskontroll for prosjektfiler
- Leveres med 56 innebygde filtre med eksempler for innebygd verifisering
- Fjerner ANSI-kontrollsekvenser, fremdriftslinjer, gjentatte linjer og ikke-handlingsrettet støy
- Bevarer feil, errors, advarsler, endrede filer, sammendrag og slutten av lange utdata
- Støtter tillitskontrollerte prosjektfiltre, globale filtre og valgfri gjenoppretting av redigerte råutdata

**Best for:** Agentøkter med skall-, bygg-, test-, git-, grep- og filutdatatranskripsjoner.

### Stablet modus (78–95 % av kvalifisert område)

Stablet modus kjører flere komprimeringsmotorer i en deterministisk rekkefølge. Standardrørledningen er:

```txt
RTK -> Caveman
```

Denne rekkefølgen holder terminal-/verktøyutdata kompakte først, og bruker deretter Caveman-semantisk kondensering på
den gjenværende teksten i forespørselen. Stablede rørledninger kan konfigureres globalt eller gjennom
komprimeringskombinasjoner som tilordnes rutingskombinasjoner.

**Best for:** Blandet kontekst med store verktøylogger samt menneskelige instruksjoner eller assistentsammendrag.

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

- **Caveman** — modusvalg, språkpakker, forhåndsvisning og globale standardinnstillinger
- **RTK** — forhåndsvisning av kommandofiltre, RTK-sikkerhetsinnstillinger og filterkatalog
- **Compression Combos** — navngitte motorpipelineer tilordnet rutingskombinasjoner
- **Auto-Trigger Threshold** — aktiver komprimering automatisk når antallet tokens overskrider terskelen

### Overstyring per kombinasjon

I `Dashboard → Context & Cache → Compression Combos` tilordner du en komprimeringskombinasjon til en rutingskombinasjon:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Dette lar deg bruke stablet komprimering på gratis-/kodeleverandører, samtidig som lite-modus beholdes på betalte abonnementer.

Denne tilordningen av **Per-Combo Override** er en annen kontroll enn overstyringen av **routing-combo compression mode** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — feltets skjema godtar også `rtk`, `stacked` og `omniglyph`) — denne overstyringen velger ikke en navngitt pipeline for komprimeringskombinasjonen; den angir bare feltet `compressionMode` som brukes av `resolveCompressionPlan`. Den kan angis enten på kombinasjonskortet (`Dashboard → Combos`) eller, siden #6760, per rutingskombinasjon i listen «Assign to routing» på `Dashboard → Context & Cache → Compression Combos`, rett ved siden av avmerkingsboksen for pipeline-tilordning som er dokumentert ovenfor. Begge grensesnittene lagrer via det samme endepunktet `PUT /api/combos/{id}`.

### Overstyring per forespørsel

Send forespørselshodet `x-omniroute-compression` for å overstyre komprimeringsplanen for én enkelt forespørsel. Det har høyest prioritet — det overstyrer overstyringen for rutingskombinasjonen, den aktive profilen, automatisk utløsning og standardinnstillingen i panelet. Ukjente verdier ignoreres (forespørselen avvises aldri), og den globale hovedbryteren gjelder fortsatt for alt: når komprimering er globalt deaktivert, kan ikke headeren aktivere den. Verdier:

| Value         | Effect                                                                                                                           |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `off`         | Ingen komprimering for denne forespørselen.                                                                                      |
| `default`     | Den panelavledede Default-profilen (ignorerer den aktive profilen). Tapsbaserte motorer forblir deaktivert.                      |
| `safe`        | Det samme som å utelate headeren.                                                                                                |
| `allow-lossy` | Behold operatørplanen for denne forespørselen, inkludert sammendrag, relevansfiltre og stilomskrivinger.                         |
| `engine:<id>` | Én enkelt motor når den er aktivert, for eksempel `engine:rtk`. Dette er eksplisitt aktivering av denne motoren per forespørsel. |
| `<combo>`     | En navngitt kombinasjon, først matchet etter navn (uavhengig av store og små bokstaver), deretter etter id.                      |

Uten `allow-lossy`, `engine:<id>` eller en navngitt kombinasjon brukes ikke tapsbaserte motorer. Når en tapsbasert Default-, automatisk utløsings- eller rutingsoverstyring nedgraderes, beholder OmniRoute de gjenkjente tapsfrie trinnene fra den konfigurerte stablede pipelinen i konfigurert rekkefølge. Den faller bare tilbake til `session-dedup → lite` når ingen konfigurert tapsfri trinn overlever.

Forhåndsvisningen **Effective pipeline** i Innstillinger-panelet viser den ordinære planen som er lagret. Når en automatisk utløsning kan kjøres, viser den samme forhåndsvisningen også den betingede effektive pipelinen, slik at panelet og kjøretidsoppløsningen uten header forblir samkjørte.

Den anvendte planen returneres i svarheaderen `X-OmniRoute-Compression: <mode>; source=<source>`, der `<source>` er én av `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` eller `off`.

### API

```bash
# Hent komprimeringsinnstillinger
curl http://localhost:20128/api/settings/compression

# Oppdater komprimeringsinnstillinger
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Forhåndsvis en spesifikk RTK/stacked-nyttelast
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# List RTK-filterpakker
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

## Avanserte kompresjonssystemer

Utover de 7 modusene beskrevet ovenfor (kilden aksepterer også `codex-responses` og `omniglyph` -moduser, som denne veiledningen ikke dekker), dekker delene nedenfor funksjoner som fungerer inne i eller ved siden av disse modusene: Verktøyresultatkomprimering og progressiv aldring er trinn 1 og 2 i den aggressive motoren (aggressiv modus og et `aggressive` trinn i en stablet rørledning), er Stacked-A-nedkjøringen. `aggressive` og `ultra` til `standard` for caching-leverandører mens komprimering er på, og Caveman Output Mode og Output Styles er opt-in system-prompt-instruksjoner, av som standard, som former modellens utdata i stedet for å komprimere forespørselen.

### Cache-bevisst komprimering

Noen leverandører (som Anthropic med hurtigbufring) støtter** hurtigbufring** , som lar dem bufre deler av forespørselen for å redusere kostnader og ventetid. Når caching er aktivert, kan aggressiv komprimering faktisk** skade** ytelse fordi den endrer de bufrede tokenene, og ugyldiggjør cachen.

`cachingAware.ts` modulen løser dette ved** oppdage hurtigbufferkontekst** og** justere kompresjonsstrategien** deretter.

#### Hvordan det fungerer

1. **Oppdag bufringskontekst** — Skanner forespørselsteksten for `cache_control` markører
2. **Identifiser caching-leverandører** — Sjekker om målleverandøren støtter caching
3. **Juster strategi** — Nedgraderer `aggressive`/`ultra` til `standard` for caching-leverandører
4. **Hopp over systemmeldingen** — Systemmeldinger er vanligvis bufret, så ikke komprimer dem

Strategihjelperen returnerer også et `deterministicOnly` flagg, men planbyggeren bruker bare strategien — ingenting nedstrøms leser flagget i dag.

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

#### Når du skal bruke

Cache-bevisst komprimering er** alltid på** — ingen konfigurasjon nødvendig. Den starter når komprimering er på og målleverandøren støtter hurtigbufring (Anthropic, OpenAI, etc.); eksplisitte `cache_control` markører er ikke nødvendig — en caching-leverandør alene utløser nedgraderingen, og markører alene gjør det aldri (markørdeteksjon mater cache-telemetri, ikke strategibeslutningen).

OpenRouter teller som en hurtigbufferleverandør bare for `anthropic/*` modeller: Claude -kodeforespørsler beholder sine `cache_control` bruddpunkter (maks. 4) og guarden beskytter prefikset, mens annenhver OpenRouter familie (`openai/`, `google/`, `qwen/`, ...) forblir strippet og ubevoktet.

### Progressiv aldring

Lange samtaler samler mange meldingsvendinger, men eldre svinger blir mindre relevante. `progressiveAging.ts` -modulen** forringer meldinger etter svingavstand** (avstand målt fra slutten av samtalen). Med de leverte standardinnstillingene (`verbatim: 2, light: 2, moderate: 3`):

- **Siste 2 svinger (avstand ≤ 2)** : Holdes ordrett
- **Avstand 3** : Caveman-komprimering (fjerning av fyllstoff)
- **Avstand 4 +** : Assistentmeldinger oppsummert; brukermeldinger redusert til første linje, begrenset til 120 tegn; andre roller urørt. Systemmeldinger, meldinger som allerede er eldre og siste brukermelding holdes alltid ordrett uavhengig av avstand. Ingenting blir droppet direkte, og `light` båndet er utilgjengelig med de leverte standardinnstillingene (`light` er lik `verbatim`).

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

#### Når du skal bruke

Progressiv aldring er** alltid på** for `aggressive` modus — er det trinn 2 av `compressAggressive()`. Ultra-modus kjører den ikke. Det er spesielt effektivt for:

- Langvarige kodeøkter
- Flerdagers samtaler
- Agentarbeidsflyter med mange verktøykall

### Caveman utgangsmodus

Caveman utgangsmodus legger til** instruksjoner for systemet** som ber selve modellen om kortfattet utgang — `lite` nivået ber om kortfattede svar som beholder hele setninger, `full` ber den om å "svare kortfattet som smart hulemann", og `ultra` ber om telegrafisk utdata; instruksjoner bare spør, de kan ikke garantere det. Forespørsler mottar dem gjennom `applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`): `open-sse/handlers/chatCore.ts` løser først valget med back-compat shim (`resolveOutputStyleSelection()` in `open-sse/services/compression/outputStyles/backCompat.ts`), som, mens `outputStyles` er tom, tilordner en aktivert `cavemanOutputMode` til `terse-prose` -utdatastilen ved `cavemanOutputMode.intensity` (se Back-compat nedenfor); et ikke-tomt `outputStyles` -valg brukes som det er, og `cavemanOutputMode.enabled` og `intensity` har da ingen effekt, mens `autoClarity` vekslingen fortsatt gjelder. `outputMode.ts` inneholder instruksjonstekstene (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), innholdsforløpet og plasseringshjelperen som injeksjonen bruker; sin egen `applyCavemanOutputMode()` injektor har ingen produksjonsanrop.

#### Hvordan det fungerer

Denne modusen komprimerer ikke inngangen. Den legger til en instruksjonsblokk til systemprompten (se Hvordan injeksjon fungerer nedenfor), og enhver inngangskomprimeringsmodus valgt for forespørselen kjører fortsatt etterpå, på kroppen som nå bærer blokken. I forkant av delte grenser-klausulen som hvert nivå slutter med, lyder det engelske `full` nivået:

> "Svar kortfattet som en smart hulemann. Slipp artikler (a/an/the), filler (just/really/basically/actually/simply), hyggelige ting, sikring. Fragmenter OK. Korte synonymer (store ikke omfattende, fiks ikke implementer). Hold all teknisk substans, kode, feil, URLs, identifikatorer nøyaktige."

Dette fungerer spesielt godt for:

- Kodegenerering (terser-utgang = færre tokens)
- Rask spørsmål og svar (ikke behov for detaljerte forklaringer)
- Batchbehandling (maksimer gjennomstrømning)

#### Når du skal bruke

Caveman utgangsmodus er** melde deg på** . Med komprimering på (`enabled: true`, hovedbryteren på siden for komprimeringsinnstillinger), slå den på med `cavemanOutputMode.enabled`; `intensity` velger `lite`, `full` eller `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

En kompresjonskombinasjon** Utgangsmodus** toggle (`outputMode`, nivå i `outputModeIntensity`) setter den samme bryteren for forespørslene som kombinasjonen gjelder for, og `omniroute_set_compression_engine` MCP verktøyet skriver det gjennom det boolske `outputMode` argumentet. Et ikke-tomt `outputStyles` -valg har forrang over denne bryteren. I dashbordet aktiverer du** Terse prosa** output style injiserer den samme blokken (se Output Styles nedenfor).

### Utdatastiler (katalog)

Caveman utgangsmodus ovenfor er** eldre sti i én stil** . Fase 4 generaliserte det til en katalog med komponerbare utdatastiler: `OUTPUT_STYLE_CATALOG` i `open-sse/services/compression/outputStyles/catalog.ts`. Hver stil er en systeminstruksjon som ber selve modellen om billigere produksjon; stiler kan aktiveres sammen og injiseres i katalogrekkefølge.

| Stil                                | `id`            | Hva den gjør                                                                                                                                                                                                                                    | Instruksjonsspråk                             |
| ----------------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Terse prosa                         | `terse-prose`   | Slipp filler/articles/hedging; holde teknisk stoff nøyaktig. Samme tekst som den gamle hulemannens utdatamodus (referert til, ikke skrevet på nytt).                                                                                            | no, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Mindre kode                         | `less-code`     | YAGNI -stige: minste arbeidsforandring, ingen uønskede abstraksjoner.                                                                                                                                                                           | no, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Hestehale (lat seniorutvikler)      | `ponytail`      | "Den beste koden er koden som aldri er skrevet": gjenbruk > omskriving, rotårsak > symptom, korteste arbeidsdiff.                                                                                                                               | no, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Jeg har ADHD (action-first)         | `i-have-adhd`   | Handling først (command/path/snippet før prosa), nummererte avgrensede trinn, ONE konkrete neste trinn, ingen preamble/recap/closers. Tilpasset fra [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT).                          | no, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop UI filter                  | `antislop-ui`   | Hver visuell teknikk må bestå en formålstest (hierarki, identitet, lesbarhet); ingen standard gradients/glass/glow, avkortet palett, ingen maloppsett. Begge antislop-stilene legger til en grense uten-døde-kontroller / ikke-fabrikerte krav. | no, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop kopi og menneskelig filter | `antislop-copy` | Spesifikk kopi (ingen em dash, generisk CTAs, buzzwords, chatbot closers, oppfunnet fakta) pluss folksregler: WCAG AA kontrast, synlig fokus, tastaturrekkevidde, empty/loading/error tilstander, mobil reflow.                                 | no, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Terse CJK (文言)                    | `terse-cjk`     | `full`/`ultra` svar på klassisk kinesisk (文言); `lite` ber bare om korte svar uten funksjonsord, hygge eller pynt.                                                                                                                             | zh (lokale gated, se nedenfor)                |

Hver stil sender tre intensitetsnivåer — `lite`, `full`, `ultra` — og hvert nivå slutter med delte grenser-klausulen (`SHARED_BOUNDARIES` i `outputMode.ts`), som holder kodeblokker, filstier, kommandoer, feil og URLs nøyaktige. `terse-prose` og `terse-cjk` nivåtekstene legger til identifikatorer til den listen.

`terse-cjk` er lokalisert til `zh` på to steder. Komprimeringsinnstillinger-siden viser raden bare når UI språket i dashbordet er kinesisk (`zh-CN` eller `zh-TW`), og `applyOutputStyles()` injiserer det bare når forespørselens løste språk (se Språkvalg nedenfor) er `zh`. Å skjule raden sletter ikke et lagret `terse-cjk` valg: innstillingene API godtar enhver stil-ID, og lagring av andre stiler på siden beholder den. På forespørselstidspunktet er `applyOutputStyles()` språkkontrollen den eneste lokale porten.

#### Hvordan injeksjon fungerer

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) løser utvalget mot katalogen (ukjente id-er og stiler som ikke samsvarer med lokaliteter blir slettet, aldri en feil; et valg som løser seg til ingen stil forlater kroppen uendret, hoppet over som `no_styles`), setter sammen de valgte instruksjonene i katalogrekkefølge, legger til grensesetningen** en gang** (pluss sikkerhetsklausulen, `SAFETY_BOUNDARIES` eller dens oversettelse, når `less-code` eller `ponytail` er valgt), og starter blokken med en enkelt idempotensmarkør (`[OmniRoute Output Styles]`), så re-søking er en no-op. Når det løste språket (se Språkvalg nedenfor) har en oversettelse, injiseres den lokaliserte instruksjonen i stedet for engelsk.

On a body with a non-empty `messages` array, the idempotency check runs before the content bypass: when the `[OmniRoute Output Styles]` marker is already in the top-level `system` field (a string or a content-block array) or in a system message with string content, the body is left unchanged as `already_applied` and no keyword check runs. Otherwise a content bypass (`shouldBypassCavemanOutputMode()` in `open-sse/services/compression/outputMode.ts`) checks the text of the last three messages, whatever their role, and skips the styles for the whole turn when that text matches its security, irreversible-action or clarification keywords, or an order-sensitive sequence: `first`, `then`, `after that`, `before`, `rollback` or `backup` followed within 240 characters by `delete`, `drop`, `migrate`, `deploy` or `release`. The bypass runs while the** Auto-Clarity Bypass** toggle (`cavemanOutputMode.autoClarity`, on by default) is on; turning the toggle off skips the keyword check.

Når bypass slipper svingen gjennom, plasserer `placeSystemInstruction()` (samme fil), som aldri lager en ny `messages[0]`, blokken i den første av disse den finner:

1. En ledende systemmelding med strenginnhold: blokken legges til etter teksten.
2. `system` feltet på øverste nivå: blokken legges til etter teksten til en streng, eller legges til som en ny tekstblokk i en innholdsblokk-array.
3. Den første senere systemmeldingen med strenginnhold: blokken legges til etter teksten.
4. Ingen av de ovennevnte: blokken går inn i en ny systemmelding på slutten av `messages`.

På en body uten en `messages` matrise (eller med en tom en), kjører ingen innholdsforbikoblinger, og et `system` -felt på toppnivå blir ikke konsultert. Blokken legges til etter teksten i et streng `instructions` felt, med mindre det feltet allerede inneholder `[OmniRoute Output Styles]` markøren, i hvilket tilfelle kroppen forblir uendret som `already_applied`. Når kroppen ikke har noe streng `instructions` felt, men bærer `input` (en streng eller en matrise), blir blokken `instructions`, og erstatter enhver ikke-strengverdi som feltet hadde. En kropp med verken et streng `instructions` felt eller en streng eller matrise `input` blir stående uendret og hoppet over som `no_messages`.

#### Hvordan aktivere

I dashbordet:** Compression Context → Compression Settings** (`/dashboard/context/settings`), Output styles section: one row per style with an on/off toggle and a level selector. Styles inject while compression itself is on (the page's master toggle, `enabled`). De** Auto-Clarity Bypass** bryteren er på** Hulemann** page (`/dashboard/context/caveman`), in its** Utgangsmodus** kort. Programmatisk vedvarer komprimeringskonfigurasjonen valget som:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Back-compat: mens `outputStyles` er tom, kartlegges den eldre `cavemanOutputMode.enabled` -innstillingen til `terse-prose` ved `cavemanOutputMode.intensity`. Blokken starter så med `[OmniRoute Output Styles]` -markøren, der den eldre `applyCavemanOutputMode()` injektoren skrev `[OmniRoute Caveman Output Mode]`. Under markøren samsvarer teksten med den gamle injeksjonen i en, pt-BR, es, de, fr, it, ru, id og vi; i ja og zh har den ett ekstra mellomrom før grensesetningen. `terse-prose` oversettes til pt-BR, es, de, fr, it, ru, zh, ja, id og vi, så en forespørsel hvis løste språk er `hu` får den engelske teksten der den gamle injektoren brukte sin ungarske.

Valg av utdatastil (`resolveOutputStyleLanguage()` in `outputStyles/apply.ts`): med `languageConfig.enabled` på, prøver `autoDetect` den siste brukermeldingen i forespørselens `messages` array som har tekst (strenginnhold, eller `text` av innholdsdelene) og kjører Caveman-motorens detektor (`detectCompressionLanguage()`) på den. Detektoren returnerer `zh` for tekst med Han-tegn og ingen kana; ellers returnerer den den av `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` og `id` som har flest hintmatcher, og `en` når ingen samsvarer med — teksten den ikke kan klassifisere får engelsk, aldri `defaultLanguage`, og `vi` blir aldri oppdaget selv om stilene sendes `vi`. En Responses API body beholder sine svinger i `input`, som ikke er samplet, så den får `defaultLanguage`, deretter engelsk. Når ingen brukermeldinger i `messages` har tekst, eller med `autoDetect` av, gjelder `defaultLanguage`, deretter engelsk. Med `languageConfig.enabled` av, er språket engelsk — med mindre en kompresjonskombinasjon gjelder for forespørselen (en kombinasjon som er tildelt forespørselens rutingkombinasjon, eller standard kompresjonskombinasjon chatCore faller tilbake til for den innebygde stablede pipelinen): bruk av en kombinasjon slår på `languageConfig.enabled` for den forespørselen og setter pakken `defaultLanguage` den er lagret fra den ene (scom's) av kombinasjonens pakker, ellers komboens første pakke, som er standard til `en`), mens den lagrede `autoDetect` (på som standard) fortsatt gjelder. Caveman-inndatamotoren velger regelpakken forskjellig — per tekstdel og, med auto-detect av, gated på `enabledPacks`.

Stilen × språkmatrisen er festet av `tests/unit/compression/output-styles-i18n-matrix.test.ts`: hver katalogstil trenger en oppføring i testens `BASELINE_LANGUAGES`; en stil som ikke er lokalisert, må sende en pt-BR-oversettelse (den lokaliserte `terse-cjk` er unntatt fra denne regelen) med mindre den er oppført i `KNOWN_ENGLISH_ONLY`, som kan inneholde bare stiler uten oversettelser i det hele tatt — en oppført stil som har noen oversettelse mislykkes i testen; og en stil mislykkes i testen når den mister et språk som dens `BASELINE_LANGUAGES` oppføring viser. For å legge til en stil, se [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Verktøyresultatkomprimering

`compressToolResult()` i `open-sse/services/compression/toolResultCompressor.ts` komprimerer verktøyresultattekst med** 5 strategier** . Den prøver dem i denne rekkefølgen, og den første aktiverte strategien hvis sjekk samsvarer med innholdet avgjør resultatet:

1. **`fileContent`** : innhold av 3 eller flere linjer der minst én linje, ignorerer innledende innrykk, starter med `import `, `export `, `function `, `class `, `const `, `let `, `var ` eller `return ` (nøkkelordet pluss et mellomrom), eller med `if`, `for` eller `while` etterfulgt av `(` ` (` dens siste 5e 20, behold lokket med 5 første linjer. midt merket.
2. **`grepSearch`** : innhold med minst én linje av formen `<path>:<digits>:`, der teksten før det første kolonet ikke har mellomrom, beholder bare disse linjene, maksimalt 30, etterfulgt av en telling av eventuelle ytterligere treff og listen over samsvarende filer; annenhver linje droppes. En slik linje er nok til å trigge strategien, så en logglinje som starter med et tidsstempel som `12:30:45` teller også.
3. **`shellOutput`** : utdata som inneholder en ANSI CSI sekvens (`ESC[` deretter sifre eller semikolon og deretter en bokstav, som i fargekoder) eller en `$` etterfulgt av mellomrom hvor som helst i teksten mister disse sekvensene (andre escapes, som `ESC[?25l` eller en OSC -vindustittelsekvens, beholdes) og beholder sine siste 50 kollapslinjer gjentatt, med consecutive linjer. Fordi denne sjekken kjører før `json` og `errorMessage`, JSON eller feilutgang som inneholder en slik `$` aldri når dem mens `shellOutput` er på.
4. **`json`** : en JSON nyttelast på over 2000 tegn som starter med `{` eller `[` (etter valgfri mellomrom) og analyser oppsummeres: en matrise med mer enn 7 elementer beholder sine første 5 og siste 2 elementer og det totale antallet, og et objekt beholder sine første 20 nøkler, med hvert nestet objekt eller en matriseverdi erstattet av en `{…N keys}` plassholder og (for en zq-verdiplassholder) `_remaining_<N>_keys` markør som teller nøklene som er falt forbi de første 20. Skalarverdier kopieres hele, så et objekt med 20 nøkler eller færre uten nestede verdier blir bare rykket inn igjen — en minifisert får tegn og forblir uendret.
5. **`errorMessage`** : utdata som inneholder, hvor som helst og uansett store og små bokstaver, `error:`, `error ` (ordet etterfulgt av et mellomrom, som i `no error found`), `[error]`, `exception:`, `exception `, `[exception]` eller `traceback` beholder sin første linje, de neste 10 linjene og de siste 3, med en `… [N frames elided] …` markør i stedet for linjene mellom dem. Markøren vises bare når mer enn 13 linjer følger den første linjen, så feilutgang på 14 linjer eller færre forkortes ikke (ved 12 eller 13 linjer er de siste 3 repeterende linjene allerede holdt).

Etter at en strategi matcher, selv en som ikke sparer noe, blir ikke de senere strategiene prøvd. Når matchingsstrategien ikke lagrer noen estimerte tokens (lengde ÷ 4, rundet opp) — for eksempel en kodelignende fil på 25 linjer eller færre, eller en JSON array på over 2000 tegn med 7 elementer eller færre — beholder den aggressive motoren det opprinnelige verktøyresultatet: begge oppringere (`compressAggressive()` og `compressAnthropicToolResultBlock()` er stille når `saved` er under `compressToolResult()` ) returnerer den strategiens utgang. Verktøy-resultat-trinnet er ikke det siste ordet: motorens fallback summarizer kan fortsatt forkorte en `tool` eller `function` melding med mer enn 8 192 tegn (`maxTokensPerMessage`, 2 048, ganger 4).

#### Når du skal bruke

Verktøyresultatkomprimering er trinn 1 i den aggressive motoren (`compressAggressive()` i `open-sse/services/compression/aggressive.ts`), så den kjører i aggressiv modus og i et `aggressive` trinn i en stablet rørledning. Den komprimerer `tool` og `function` meldinger i OpenAI-form og teksten i Anthropic `tool_result` blokker. Hver strategi har sin egen bryter under `aggressive.toolStrategies`, alt på som standard. I dashbordet er bryterne på Caveman-siden** Avansert** vis mens komprimering er på og standardmodus er Aggressiv.

### Stablet rørledning

Den stablede modusen kjører** flere motorer i rekkefølge** — vanligvis RTK først (60-90 % besparelse på verktøyutgang), deretter Caveman på den gjenværende teksten (~ 46 % besparelse på input). Sammensatt, det er** 78–95 % kvalifisert rekkevidde** (se Upstream Savings Math ovenfor): `1 - (1 - 0.60..0.90) × (1 - 0.46)` er i gjennomsnitt ≈ 89%.

#### Hvordan det fungerer

```
Input (1000 tokens)
  → RTK (command-aware filter) → 200 tokens
    → Caveman (filler removal) → 108 tokens
  → Output (108 tokens, ~89% savings)
```

#### Når du skal bruke

Bruk stablet modus for:

- Verktøytunge arbeidsflyter (agentisk koding, forskning)
- Kostnadssensitiv batchbehandling
- Når du trenger maksimale symbolbesparelser

Stablede rørledninger konfigureres gjennom den globale `stackedPipeline` komprimeringsinnstillingen, eller gjennom en navngitt kompresjonskombinasjon tilordnet en rutingkombinasjon (se Per-Combo Override ovenfor) — ikke gjennom en auto-combo `modePack` (det feltet vekter kun auto-combo modellvalg på nytt, og `stacked` er ikke et gyldig pakkenavn).

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
