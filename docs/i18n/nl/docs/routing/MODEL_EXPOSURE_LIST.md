# Model Exposure Allow/Deny List (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/MODEL_EXPOSURE_LIST.md) · 🇪🇹 [am](../../../am/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇦 [ar](../../../ar/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇿 [az](../../../az/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇬 [bg](../../../bg/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇩 [bn](../../../bn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇦 [bs](../../../bs/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇿 [cs](../../../cs/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇰 [da](../../../da/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇪 [de](../../../de/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇷 [el](../../../el/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇸 [es](../../../es/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇪 [et](../../../et/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇷 [fa](../../../fa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇮 [fi](../../../fi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇷 [fr](../../../fr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇪 [ga](../../../ga/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [gu](../../../gu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ha](../../../ha/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇱 [he](../../../he/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [hi](../../../hi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇷 [hr](../../../hr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇺 [hu](../../../hu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇲 [hy](../../../hy/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇩 [id](../../../id/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ig](../../../ig/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇹 [it](../../../it/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇯🇵 [ja](../../../ja/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇪 [ka](../../../ka/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇭 [km](../../../km/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [kn](../../../kn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇷 [ko](../../../ko/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇹 [lt](../../../lt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇻 [lv](../../../lv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ml](../../../ml/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [mr](../../../mr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇾 [ms](../../../ms/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇹 [mt](../../../mt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇲 [my](../../../my/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇵 [ne](../../../ne/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇴 [no](../../../no/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [or](../../../or/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [pa](../../../pa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇭 [phi](../../../phi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇱 [pl](../../../pl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇹 [pt](../../../pt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇴 [ro](../../../ro/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇺 [ru](../../../ru/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇰 [si](../../../si/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇰 [sk](../../../sk/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇮 [sl](../../../sl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇸 [sr](../../../sr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇪 [sv](../../../sv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇪 [sw](../../../sw/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ta](../../../ta/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [te](../../../te/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇭 [th](../../../th/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇷 [tr](../../../tr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇰 [ur](../../../ur/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇿 [uz](../../../uz/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇻🇳 [vi](../../../vi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [yo](../../../yo/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/MODEL_EXPOSURE_LIST.md)

---

> Opt-in, standaard uitgeschakeld (`modelVisibilityAllowlist`/`modelVisibilityDenylist` beide leeg, laat de `/v1/models` catalogus AND elke `auto/*` kandidaatpool byte-identiek). Een broer of zus van `hidePaidModels`/`hideAutoCombos` (`src/lib/db/settings.ts`) voor operators die een samengestelde modellenlijst willen om redenen die niets met de kosten te maken hebben.

## Waarom dit bestaat

`hidePaidModels` antwoordt "is dit model gratis?" en `hideAutoCombos` antwoordt: "moeten `auto/*` virtuele id's überhaupt worden geadverteerd?" — laat een operator ook geen willekeurige subset van modellen beheren (bijvoorbeeld door precies de modellen te presenteren die een bepaalde Claude -code / OpenCode -client zou moeten zien, onafhankelijk van de prijs). #11481 voegt dat toe als twee onafhankelijke, opt-in string-array-instellingen.

## Instellingen

| Sleutel                    | Type       | Standaard | Betekenis                                                                                      |
| -------------------------- | ---------- | --------- | ---------------------------------------------------------------------------------------------- |
| `modelVisibilityDenylist`  | `string[]` | `[]`      | Inzendingen die overeenkomen met een kandidaat verbergen deze voor de catalog/candidate pool.  |
| `modelVisibilityAllowlist` | `string[]` | `[]`      | Als ze niet leeg zijn, blijven ONLY vermeldingen die overeenkomen met een kandidaat zichtbaar. |

Beide accepteren maximaal 500 vermeldingen van elk maximaal 200 tekens (Zod-gevalideerd in `src/shared/validation/settingsSchemas.ts`). Een vermelding is ofwel:

- een exacte catalogus-ID — `"gpt-4o"` (kale model-ID) of `"openai/gpt-4o"` (voorvoegsel provider), of
- een globpatroon dat gebruik maakt van `*`/`?` — bijvoorbeeld `"openai/gpt-4*"` of `"anthropic/*"` — opgelost via dezelfde gedeelde `globToRegex()` matcher (`src/shared/utils/globPattern.ts`) die al wordt gebruikt door `ModelRoutingSection`'s combo-toewijzingen per model en `freeModels.ts::matchesOnlyPaidModels`.

Voorrang: de weigeringslijst wordt eerst gecontroleerd (een geweigerde invoer is altijd verborgen, zelfs als deze ook overeenkomt met de toelatingslijst); wanneer de toelatingslijst niet leeg is, blijven alleen de vermeldingen die ermee overeenkomen, bestaan.

## Twee knelpunten, niet één

De les uit #6512 (een `hidePaidModels` -only -catalogusfilter laat `auto/*` nog steeds naar een betaald model routeren, aangezien de combo-kandidaatpool onafhankelijk is gebouwd) is hier identiek van toepassing. Het overeenkomende predikaat `isModelExposureAllowed()` (`src/shared/utils/modelExposureList.ts`) wordt aangeroepen vanuit BOTH:

- `src/app/api/v1/models/catalog.ts` — de `/v1/models` -lijst zelf, bij dezelfde 5 knelpunten per bron `shouldHidePaid()` al poorten (statische `PROVIDER_MODELS`, gesynchroniseerde providerrijen, aangepaste rijen, door alias ondersteunde rijen, beheerde fallback-rijen).
- `open-sse/services/autoCombo/modelExposureFilter.ts::filterModelExposureCandidates()` — aangeroepen vanuit `virtualFactory.ts::buildPreparedPool`, onmiddellijk na de equivalente `filterPaidOnlyCandidates()` aanroep, dus een geweigerd model kan ook nooit worden geselecteerd in een `auto/*` kandidaatpool.

## Wat is NOT gefilterd

Spiegelt het bestaande gedrag van `hideAutoCombos`: er wordt een model-ID verzonden** uitdrukkelijk** (niet via `auto/*` en niet ontdekt via de cataloguslijst) wordt nooit geblokkeerd bij verzending — alleen advertisement/candidate-pool lidmaatschap wordt gefilterd. Dit is onafhankelijk van `hidePaidModels`; een operator wil misschien een samengestelde set om redenen die niets met de kosten te maken hebben, dus beide instellingen worden samengesteld als onafhankelijke EN-ed-filters, hetzelfde als de bestaande samenstelling met meerdere vlaggen in `catalog.ts`.

Instellingenexport (`GET /api/settings/export-json`) omvat beide arrays woordelijk, net als elk ander instellingenveld — in tegenstelling tot `hidePaidModels`'s combo-stap exportfilter, is er hier geen risico op rehydratatie: een geweigerde id ingebed in een geëxporteerde combo-stap is de expliciete routeringskeuze van de operator, niet iets dat de exportgrens moet verwijderen.

## Alleen combo's (`exposeCombosOnly`)

Een aparte boolean, standaard ook opt-in en `false`, voor implementaties waarbij combo's het publieke modeloppervlak vormen en providers alleen backends zijn. Als het `true` is, houdt de openbare lijst (`GET /v1/models`, `GET /v1` en de andere `/v1` -ontdekkingsroutes gebouwd op `getUnifiedModelsResponse()`) alleen rijen met `owned_by: "combo"`: gebruikerscombinaties plus de ingebouwde `auto/*` combinaties (tenzij `hideAutoCombos` ze verbergt). Het gebruikt dezelfde rijtest als de `catalogScope: "combos"` per sleutel, en de eigen allow/deny/scope filters van een sleutel zijn er nog steeds bovenop van toepassing.

Schakel het in** Instellingen → Routing → Modellen API -lijst** , of met `PATCH /api/settings {"exposeCombosOnly": true}`.

Net als de bovenstaande lijsten verandert het alleen de advertentie:

- een expliciete `provider/model` id verzendt nog steeds, en `GET /v1/models/{id}` lost het nog steeds op;
- de dashboardcatalogus (`GET /api/models/catalog`, gebruikt door de modelkiezers) is niet beperkt;
- het wordt niet gespiegeld in de `auto/*` kandidaatpools, dus `auto/*` combo's behouden hun volledige pool.
