# Model Exposure Allow/Deny List (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/MODEL_EXPOSURE_LIST.md) · 🇪🇹 [am](../../../am/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇦 [ar](../../../ar/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇿 [az](../../../az/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇬 [bg](../../../bg/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇩 [bn](../../../bn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇦 [bs](../../../bs/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇿 [cs](../../../cs/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇰 [da](../../../da/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇪 [de](../../../de/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇷 [el](../../../el/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇸 [es](../../../es/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇪 [et](../../../et/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇷 [fa](../../../fa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇮 [fi](../../../fi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇷 [fr](../../../fr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇪 [ga](../../../ga/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [gu](../../../gu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ha](../../../ha/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇱 [he](../../../he/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [hi](../../../hi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇷 [hr](../../../hr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇺 [hu](../../../hu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇲 [hy](../../../hy/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇩 [id](../../../id/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ig](../../../ig/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇹 [it](../../../it/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇯🇵 [ja](../../../ja/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇪 [ka](../../../ka/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇭 [km](../../../km/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [kn](../../../kn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇷 [ko](../../../ko/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇹 [lt](../../../lt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇻 [lv](../../../lv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ml](../../../ml/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [mr](../../../mr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇾 [ms](../../../ms/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇹 [mt](../../../mt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇲 [my](../../../my/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇵 [ne](../../../ne/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇱 [nl](../../../nl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [or](../../../or/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [pa](../../../pa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇭 [phi](../../../phi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇱 [pl](../../../pl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇹 [pt](../../../pt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇴 [ro](../../../ro/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇺 [ru](../../../ru/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇰 [si](../../../si/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇰 [sk](../../../sk/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇮 [sl](../../../sl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇸 [sr](../../../sr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇪 [sv](../../../sv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇪 [sw](../../../sw/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ta](../../../ta/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [te](../../../te/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇭 [th](../../../th/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇷 [tr](../../../tr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇰 [ur](../../../ur/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇿 [uz](../../../uz/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇻🇳 [vi](../../../vi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [yo](../../../yo/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/MODEL_EXPOSURE_LIST.md)

---

> Opt-in, av som standard (`modelVisibilityAllowlist`/`modelVisibilityDenylist` begge tomme forlater `/v1/models` katalogen AND hver `auto/*` kandidatpoolbyte er identisk). Et søsken av `hidePaidModels`/`hideAutoCombos` (`src/lib/db/settings.ts`) for operatører som ønsker en kuratert modellliste av grunner som ikke har noe med kostnad å gjøre.

## Hvorfor dette eksisterer

`hidePaidModels` svarer "er denne modellen gratis?" og `hideAutoCombos` svarer "skal virtuelle `auto/*` -IDer annonseres i det hele tatt?" — lar heller ikke en operatør kurere et vilkårlig delsett av modeller (f.eks. presentere nøyaktig modellene en gitt Claude Code / OpenCode -klient skal se, uavhengig av prissetting). #11481 legger til at som to uavhengige, opt-in string-array-innstillinger.

## Innstillinger

| Nøkkel                     | Type       | Misligholde | Betydning                                                                           |
| -------------------------- | ---------- | ----------- | ----------------------------------------------------------------------------------- |
| `modelVisibilityDenylist`  | `string[]` | `[]`        | Oppføringer som samsvarer med en kandidat skjuler den fra catalog/candidate poolen. |
| `modelVisibilityAllowlist` | `string[]` | `[]`        | Når de ikke er tomme, forblir ONLY oppføringer som matcher en kandidat eksponert.   |

Begge godtar opptil 500 oppføringer på opptil 200 tegn hver (Zod-validert i `src/shared/validation/settingsSchemas.ts`). En oppføring er enten:

- en eksakt katalog-ID — `"gpt-4o"` (bar modell-ID) eller `"openai/gpt-4o"` (leverandør-prefiks), eller
- et globmønster som bruker `*`/`?` — f.eks. `"openai/gpt-4*"` eller `"anthropic/*"` —, løst via den samme delte `globToRegex()` matcheren (`src/shared/utils/globPattern.ts`) som allerede er brukt av `ModelRoutingSection` kombinasjonstilordninger per modell og `freeModels.ts::matchesOnlyPaidModels`.

Forrang: denylisten sjekkes først (en avvist oppføring er alltid skjult, selv om den også samsvarer med godkjenningslisten); når tillatelseslisten ikke er tom, overlever bare oppføringer den matcher.

## To chokepoints, ikke ett

Leksjonen fra #6512 (et `hidePaidModels` -only -katalogfilter lar fortsatt `auto/*` rute til en betalt modell, siden kombinasjonskandidatpoolen ble bygget uavhengig) gjelder identisk her. Det matchende predikatet `isModelExposureAllowed()` (`src/shared/utils/modelExposureList.ts`) kalles fra BOTH:

- `src/app/api/v1/models/catalog.ts` — selve `/v1/models` listen, ved de samme 5 per-kilde chokepoints `shouldHidePaid()` allerede porter (statisk `PROVIDER_MODELS`, synkroniserte leverandørrader, egendefinerte rader, aliasstøttede rader, administrerte reserverader).
- `open-sse/services/autoCombo/modelExposureFilter.ts::filterModelExposureCandidates()` — kalt fra `virtualFactory.ts::buildPreparedPool`, umiddelbart etter det tilsvarende `filterPaidOnlyCandidates()` -kallet, så en nektet modell kan heller aldri velges inn i en `auto/*` kandidatpool.

## Hva er NOT filtrert

Speiler `hideAutoCombos` eksisterende oppførsel: en modell-ID sendt** eksplisitt** (ikke via `auto/*`, og ikke oppdaget gjennom katalogoppføringen) er aldri blokkert ved utsendelse — kun advertisement/candidate-pool medlemskap filtreres. Dette er uavhengig av `hidePaidModels`; en operatør vil kanskje ha et kurert sett av grunner som ikke har noe med kostnad å gjøre, så begge innstillingene komponeres som uavhengige OG-ed-filtre, det samme som den eksisterende multi-flagg-sammensetningen i `catalog.ts`.

Innstillingseksport (`GET /api/settings/export-json`) inkluderer begge matrisene ordrett, som alle andre innstillingsfelt — i motsetning til `hidePaidModels` sitt combo-step eksportfilter, er det ingen rehydreringsrisiko her: en nektet id innebygd i et eksportert combo-trinn er operatørens eget eksplisitte rutevalg, ikke noe eksportgrensen trenger å fjerne.

## Oppføring kun for kombinasjoner (`exposeCombosOnly`)

En separat boolsk, også opt-in og `false` som standard, for distribusjoner der kombinasjoner er den offentlige modelloverflaten og leverandører kun er backends. Når det er `true`, beholder den offentlige oppføringen (`GET /v1/models`, `GET /v1`, og de andre `/v1` -oppdagelsesrutene bygget på `getUnifiedModelsResponse()`) bare rader med `owned_by: "combo"`: brukerkombinasjoner pluss de innebygde `auto/*` kombinasjonene (med mindre `hideAutoCombos` skjuler dem). Den bruker samme radtest som per-tast `catalogScope: "combos"`, og en nøkkels egne allow/deny/scope -filtre gjelder fortsatt på toppen.

Slå den inn** Innstillinger → Ruting → Modeller API -oppføring** , eller med `PATCH /api/settings {"exposeCombosOnly": true}`.

I likhet med listene ovenfor, endrer den bare annonse:

- en eksplisitt `provider/model` -id sendes fortsatt, og `GET /v1/models/{id}` løser den fortsatt;
- dashbordkatalogen (`GET /api/models/catalog`, brukt av modellvelgerne) er ikke begrenset;
- den speiles ikke inn i `auto/*` kandidatpoolene, så `auto/*` kombinasjoner beholder sin fulle pool.
