# Model Exposure Allow/Deny List (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/MODEL_EXPOSURE_LIST.md) · 🇪🇹 [am](../../../am/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇦 [ar](../../../ar/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇿 [az](../../../az/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇬 [bg](../../../bg/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇩 [bn](../../../bn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇦 [bs](../../../bs/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇿 [cs](../../../cs/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇰 [da](../../../da/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇪 [de](../../../de/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇷 [el](../../../el/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇸 [es](../../../es/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇪 [et](../../../et/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇷 [fa](../../../fa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇮 [fi](../../../fi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇷 [fr](../../../fr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇪 [ga](../../../ga/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [gu](../../../gu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ha](../../../ha/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇱 [he](../../../he/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [hi](../../../hi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇷 [hr](../../../hr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇺 [hu](../../../hu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇲 [hy](../../../hy/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇩 [id](../../../id/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ig](../../../ig/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇹 [it](../../../it/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇯🇵 [ja](../../../ja/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇪 [ka](../../../ka/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇭 [km](../../../km/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [kn](../../../kn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇷 [ko](../../../ko/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇹 [lt](../../../lt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇻 [lv](../../../lv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ml](../../../ml/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [mr](../../../mr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇾 [ms](../../../ms/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇹 [mt](../../../mt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇲 [my](../../../my/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇵 [ne](../../../ne/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇱 [nl](../../../nl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇴 [no](../../../no/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [or](../../../or/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [pa](../../../pa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇭 [phi](../../../phi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇱 [pl](../../../pl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇹 [pt](../../../pt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇴 [ro](../../../ro/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇺 [ru](../../../ru/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇰 [si](../../../si/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇰 [sk](../../../sk/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇮 [sl](../../../sl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇸 [sr](../../../sr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇪 [sw](../../../sw/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ta](../../../ta/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [te](../../../te/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇭 [th](../../../th/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇷 [tr](../../../tr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇰 [ur](../../../ur/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇿 [uz](../../../uz/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇻🇳 [vi](../../../vi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [yo](../../../yo/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/MODEL_EXPOSURE_LIST.md)

---

> Opt-in, av som standard (`modelVisibilityAllowlist`/`modelVisibilityDenylist` båda tomma lämnar `/v1/models` katalogen AND varje `auto/*` kandidatpool byte-identisk). Ett syskon till `hidePaidModels`/`hideAutoCombos` (`src/lib/db/settings.ts`) för operatörer som vill ha en kurerad modelllista av skäl som inte har med kostnad att göra.

## Varför detta finns

`hidePaidModels` svarar "är den här modellen gratis?" och `hideAutoCombos` svarar "ska virtuella `auto/*` -id:n annonseras överhuvudtaget?" — låter inte heller en operatör kurera en godtycklig delmängd av modeller (t.ex. presentera exakt de modeller som en given Claude Code / OpenCode -klient ska se, oberoende av prissättning). #11481 lägger till det som två oberoende, opt-in string-array-inställningar.

## Inställningar

| Nyckel                     | Typ        | Standard | Menande                                                                      |
| -------------------------- | ---------- | -------- | ---------------------------------------------------------------------------- |
| `modelVisibilityDenylist`  | `string[]` | `[]`     | Inlägg som matchar en kandidat döljer den från catalog/candidate poolen.     |
| `modelVisibilityAllowlist` | `string[]` | `[]`     | När de inte är tomma förblir ONLY poster som matchar en kandidat exponerade. |

Båda accepterar upp till 500 poster på upp till 200 tecken vardera (Zod-validerad i `src/shared/validation/settingsSchemas.ts`). En post är antingen:

- ett exakt katalog-id — `"gpt-4o"` (bar modell-id) eller `"openai/gpt-4o"` (leverantörsprefix), eller
- ett globmönster som använder `*`/`?` — t.ex. `"openai/gpt-4*"` eller `"anthropic/*"` —, löst via samma delade `globToRegex()` matchare (`src/shared/utils/globPattern.ts`) som redan används av `ModelRoutingSection` per-modell combo-mappningar och `freeModels.ts::matchesOnlyPaidModels`.

Företräde: denylistan kontrolleras först (en nekad post döljs alltid, även om den också matchar godkännandelistan); när godkännandelistan inte är tom, är det bara poster som den matchar.

## Två chokepoints, inte en

Lärdomen från #6512 (ett `hidePaidModels` -only -katalogfilter lät fortfarande `auto/*` dirigera till en betald modell, eftersom kombinationskandidatpoolen byggdes oberoende) gäller identiskt här. Det matchande predikatet `isModelExposureAllowed()` (`src/shared/utils/modelExposureList.ts`) anropas från BOTH:

- `src/app/api/v1/models/catalog.ts` — själva `/v1/models` listan, vid samma 5 chokepoints per källa `shouldHidePaid()` redan grindar (statisk `PROVIDER_MODELS`, synkroniserade leverantörsrader, anpassade rader, aliasstödda rader, hanterade reservrader).
- `open-sse/services/autoCombo/modelExposureFilter.ts::filterModelExposureCandidates()` — anropas från `virtualFactory.ts::buildPreparedPool`, omedelbart efter motsvarande `filterPaidOnlyCandidates()` -anrop, så en nekad modell kan aldrig väljas in i en `auto/*` kandidatpool heller.

## Vad är NOT filtrerat

Speglar `hideAutoCombos` befintliga beteende: ett modell-id skickat** uttryckligen** (inte via `auto/*`, och inte upptäckt genom kataloglistan) blockeras aldrig vid avsändning — endast advertisement/candidate-pool medlemskap filtreras. Detta är oberoende av `hidePaidModels`; en operatör kanske vill ha en kurerad uppsättning av skäl som inte har med kostnad att göra, så båda inställningarna består av oberoende AND-ed-filter, samma som den befintliga multi-flaggade sammansättningen i `catalog.ts`.

Inställningsexport (`GET /api/settings/export-json`) inkluderar båda arrayerna ordagrant, precis som alla andra inställningsfält — till skillnad från `hidePaidModels` kombinerade exportfilter, finns det ingen återhydreringsrisk här: ett nekat id inbäddat i ett exporterat kombinationssteg är operatörens eget explicita ruttval, inte något som exportgränsen behöver ta bort.

## Enbart kombinationer (`exposeCombosOnly`)

En separat boolean, även opt-in och `false` som standard, för distributioner där kombinationer är den offentliga modellens yta och leverantörer endast är backends. När det är `true` behåller den offentliga noteringen (`GET /v1/models`, `GET /v1`, och de andra `/v1` -upptäckarvägarna byggda på `getUnifiedModelsResponse()`) endast rader med `owned_by: "combo"`: användarkombinationer plus de inbyggda `auto/*` -kombinationerna (om inte `hideAutoCombos` döljer dem). Den använder samma radtest som per-tangenten `catalogScope: "combos"`, och en nyckels egna allow/deny/scope filter gäller fortfarande ovanpå.

Slå in den** Inställningar → Routing → Modeller API listning** , eller med `PATCH /api/settings {"exposeCombosOnly": true}`.

Liksom listorna ovan ändrar den bara annonsen:

- ett explicit `provider/model` id skickas fortfarande, och `GET /v1/models/{id}` löser det fortfarande;
- instrumentbrädans katalog (`GET /api/models/catalog`, används av modellväljarna) är inte smalare;
- den speglas inte i `auto/*` kandidatpoolerna, så `auto/*` kombinationer behåller sin fulla pool.
