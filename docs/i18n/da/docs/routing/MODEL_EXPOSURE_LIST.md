# Model Exposure Allow/Deny List (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/MODEL_EXPOSURE_LIST.md) · 🇪🇹 [am](../../../am/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇦 [ar](../../../ar/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇿 [az](../../../az/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇬 [bg](../../../bg/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇩 [bn](../../../bn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇦 [bs](../../../bs/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇿 [cs](../../../cs/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇪 [de](../../../de/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇷 [el](../../../el/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇸 [es](../../../es/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇪 [et](../../../et/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇷 [fa](../../../fa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇮 [fi](../../../fi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇷 [fr](../../../fr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇪 [ga](../../../ga/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [gu](../../../gu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ha](../../../ha/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇱 [he](../../../he/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [hi](../../../hi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇷 [hr](../../../hr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇺 [hu](../../../hu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇲 [hy](../../../hy/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇩 [id](../../../id/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ig](../../../ig/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇹 [it](../../../it/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇯🇵 [ja](../../../ja/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇪 [ka](../../../ka/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇭 [km](../../../km/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [kn](../../../kn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇷 [ko](../../../ko/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇹 [lt](../../../lt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇻 [lv](../../../lv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ml](../../../ml/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [mr](../../../mr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇾 [ms](../../../ms/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇹 [mt](../../../mt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇲 [my](../../../my/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇵 [ne](../../../ne/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇱 [nl](../../../nl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇴 [no](../../../no/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [or](../../../or/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [pa](../../../pa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇭 [phi](../../../phi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇱 [pl](../../../pl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇹 [pt](../../../pt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇴 [ro](../../../ro/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇺 [ru](../../../ru/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇰 [si](../../../si/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇰 [sk](../../../sk/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇮 [sl](../../../sl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇸 [sr](../../../sr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇪 [sv](../../../sv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇪 [sw](../../../sw/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ta](../../../ta/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [te](../../../te/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇭 [th](../../../th/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇷 [tr](../../../tr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇰 [ur](../../../ur/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇿 [uz](../../../uz/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇻🇳 [vi](../../../vi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [yo](../../../yo/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/MODEL_EXPOSURE_LIST.md)

---

> Opt-in, slået fra som standard (`modelVisibilityAllowlist`/`modelVisibilityDenylist` begge tomme efterlader `/v1/models` kataloget AND hver `auto/*` kandidatpulje-byte-identisk). En søskende til `hidePaidModels`/`hideAutoCombos` (`src/lib/db/settings.ts`) for operatører, der ønsker en kureret modelliste af årsager, der ikke har noget med omkostninger at gøre.

## Hvorfor dette eksisterer

`hidePaidModels` svarer "er denne model gratis?" og `hideAutoCombos` svarer "skal `auto/*` virtuelle id'er overhovedet annonceres?" — lader heller ikke en operatør kurere en vilkårlig delmængde af modeller (f.eks. præsentere præcis de modeller en given Claude Code / OpenCode klient skal se, uafhængigt af prissætning). #11481 tilføjer det som to uafhængige, opt-in string-array-indstillinger.

## Indstillinger

| Nøgle                      | Type       | Misligholdelse | Mening                                                                             |
| -------------------------- | ---------- | -------------- | ---------------------------------------------------------------------------------- |
| `modelVisibilityDenylist`  | `string[]` | `[]`           | Indlæg, der matcher en kandidat, skjuler den fra catalog/candidate puljen.         |
| `modelVisibilityAllowlist` | `string[]` | `[]`           | Når de ikke er tomme, forbliver ONLY poster, der matcher en kandidat, eksponerede. |

Begge accepterer op til 500 poster på op til 200 tegn hver (Zod-valideret i `src/shared/validation/settingsSchemas.ts`). En post er enten:

- et nøjagtigt katalog-id — `"gpt-4o"` (ulæst model-id) eller `"openai/gpt-4o"` (udbyder-præfiks), eller
- et globmønster ved hjælp af `*`/`?` — f.eks. `"openai/gpt-4*"` eller `"anthropic/*"` — løst via den samme delte `globToRegex()` matcher (`src/shared/utils/globPattern.ts`), som allerede er brugt af `ModelRoutingSection`'s per-model combo mappings og `freeModels.ts::matchesOnlyPaidModels`.

Forrang: afvisningslisten kontrolleres først (en afvist adgang er altid skjult, selvom den også matcher tilladelseslisten); når tilladelseslisten ikke er tom, overlever kun de poster, den matcher.

## To chokepoints, ikke et

Lektionen fra #6512 (et `hidePaidModels` -only -katalogfilter lod stadig `auto/*` lede til en betalt model, da kombinationskandidatpuljen blev bygget uafhængigt) gælder identisk her. Det matchende prædikat `isModelExposureAllowed()` (`src/shared/utils/modelExposureList.ts`) kaldes fra BOTH:

- `src/app/api/v1/models/catalog.ts` — selve `/v1/models` listen, ved de samme 5 pr. kilde chokepoints `shouldHidePaid()` allerede porter (statisk `PROVIDER_MODELS`, synkroniserede udbyderrækker, brugerdefinerede rækker, alias-understøttede rækker, administrerede reserverækker).
- `open-sse/services/autoCombo/modelExposureFilter.ts::filterModelExposureCandidates()` — kaldet fra `virtualFactory.ts::buildPreparedPool`, umiddelbart efter det tilsvarende `filterPaidOnlyCandidates()` kald, så en afvist model kan heller aldrig vælges til en `auto/*` kandidatpulje.

## Hvad er NOT filtreret

Afspejler `hideAutoCombos` eksisterende adfærd: et model-id sendt** eksplicit** (ikke via `auto/*` og ikke opdaget gennem kataloglisten) er aldrig blokeret ved afsendelse — kun advertisement/candidate-pool medlemskab filtreres. Dette er uafhængigt af `hidePaidModels`; en operatør vil måske have et kureret sæt af årsager, der ikke har noget med omkostninger at gøre, så begge indstillinger er sammensat som uafhængige OG-ed-filtre, det samme som den eksisterende multi-flag-sammensætning i `catalog.ts`.

Indstillingseksport (`GET /api/settings/export-json`) inkluderer begge arrays ordret, ligesom ethvert andet indstillingsfelt — i modsætning til `hidePaidModels`'s combo-step eksportfilter, er der ingen rehydreringsrisiko her: et afvist id indlejret i et eksporteret combo-trin er operatørens eget eksplicitte routingvalg, ikke noget eksportgrænsen skal fjerne.

## Fortegnelse med kun kombinationer (`exposeCombosOnly`)

En separat boolean, også opt-in og `false` som standard, for implementeringer, hvor kombinationer er den offentlige modeloverflade, og udbydere kun er backends. Når det er `true`, beholder den offentlige liste (`GET /v1/models`, `GET /v1` og de andre `/v1` -opdagelsesruter bygget på `getUnifiedModelsResponse()`) kun rækker med `owned_by: "combo"`: brugerkombinationer plus de indbyggede `auto/*` kombinationer (medmindre `hideAutoCombos` skjuler dem). Den bruger den samme rækketest som per-key `catalogScope: "combos"`, og en nøgles egne allow/deny/scope filtre gælder stadig ovenpå.

Slå det ind** Indstillinger → Routing → Modeller API liste** , eller med `PATCH /api/settings {"exposeCombosOnly": true}`.

Ligesom listerne ovenfor ændrer det kun annoncen:

- et eksplicit `provider/model` -id sendes stadig, og `GET /v1/models/{id}` løser det stadig;
- dashboardkataloget (`GET /api/models/catalog`, brugt af modelvælgerne) er ikke indsnævret;
- det spejles ikke i `auto/*` kandidatpuljerne, så `auto/*` kombinationer beholder deres fulde pulje.
