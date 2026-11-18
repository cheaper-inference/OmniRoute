# Chaos Mode (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **ഡാഷ്ബോർഡ്:** **Chaos Mode** (സൈഡ്ബാർ) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (ഡാഷ്ബോർഡ് സെഷൻ) · `POST /api/skills/collect/chaos` (API കീ)  
> **സോഴ്സ്:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode **ഒരേ ടാസ്ക് ഒരേസമയം നിരവധി പ്രൊവൈഡർമാർക്ക് അയയ്ക്കുന്നു** — പങ്കെടുക്കുന്ന ഓരോ പ്രൊവൈഡറും
ഒരു മോഡൽ ഇൻസ്റ്റൻസ് വീതം സംഭാവന ചെയ്യുന്നു, കൂടാതെ എല്ലാ ഉത്തരങ്ങളും അടുത്തടുത്തായോ (അല്ലെങ്കിൽ ശൃംഖലയായോ) നിങ്ങൾക്ക് ലഭിക്കും. ഇത്
ഒരു മൾട്ടി-മോഡൽ എക്സിക്യൂഷൻ പ്രതലമാണ്, റൂട്ടിംഗ് തന്ത്രമല്ല: നിങ്ങളുടെ സാധാരണ `/v1/chat/completions`
ട്രാഫിക്കിനെ ഇത് ഒരിക്കലും ബാധിക്കില്ല.

**വ്യക്തതയ്ക്കായി — പേരിൽ "chaos" ഉൾപ്പെടുന്ന മൂന്ന് വ്യത്യസ്ത കാര്യങ്ങളാണ് ലഭ്യമാകുന്നത്:**

| കാര്യം             | അതെന്താണ്                                                                                                                                                                                        | ഡോക്യുമെന്റേഷൻ എവിടെ                         |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| **Chaos Mode**     | ഇവിടെ വിവരിച്ചിരിക്കുന്ന ഡാഷ്ബോർഡ് പേജ് + API: ഒരു ടാസ്ക് നിരവധി പ്രൊവൈഡർമാരിലേക്ക് വ്യാപിപ്പിക്കുന്നു (സമാന്തരമായോ സഹകരണപരമായോ).                                                                | ഈ ഗൈഡ്                                       |
| `auto/chaos`       | Auto-Combo മോഡൽ id: സമാന്തര ഫാൻ-ഔട്ട്, ഓരോ പ്രൊവൈഡർക്കും ഒരു മോഡൽ, ഓരോന്നിനും ഒരു അപ്സ്ട്രീം കോൾ. ഇത് ഫോൾട്ട് ഇൻജക്ഷനല്ല ([വിശദാംശങ്ങൾ](#autochaos-parallel-fan-out)).                           | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos combo config | `config.chaos.enabled` ഉള്ള ഒരു സ്ഥിരമായി സംഭരിച്ച കോംബോ ഇതേ രീതിയിൽ ഫാൻ-ഔട്ട് ചെയ്യുന്നു (API-യിൽ മാത്രം); `judgeModel` അന്തിമ ഉത്തരം തിരഞ്ഞെടുക്കുക മാത്രമാണ് ചെയ്യുന്നത്, സിന്തസിസ് കോൾ ഇല്ല. | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: സമാന്തര ഫാൻ-ഔട്ട്

`auto/chaos` ഒരു ഫോൾട്ട്-ഇൻജക്ഷൻ അല്ലെങ്കിൽ പ്രതിരോധശേഷി-പരിശോധനാ ക്രമീകരണം **അല്ല**.
`/v1/chat/completions`-ൽ `model: "auto/chaos"` അഭ്യർത്ഥിക്കുമ്പോൾ:

1. **ഓരോ പ്രൊവൈഡറിൽ നിന്നും ഒരു മോഡൽ** ഉൾപ്പെടുന്ന ഒരു പാനൽ നിർമ്മിക്കുന്നു: കാൻഡിഡേറ്റ്-പൂൾ ക്രമത്തിലുള്ള, കണക്റ്റ് ചെയ്ത ഓരോ
   പ്രൊവൈഡറിന്റെയും ആദ്യ കാൻഡിഡേറ്റ്, പരമാവധി 5 അംഗങ്ങൾ വരെ
   (`OMNIROUTE_CHAOS_MAX_PANEL`, പരമാവധി പരിധി 10)
   (`open-sse/services/autoCombo/virtualFactory.ts`). `chaos-mode` വെയ്റ്റ്
   പാക്ക് ഓരോ അംഗത്തിന്റെയും `weight` മാത്രമാണ് സജ്ജമാക്കുന്നത്; ഫാൻ-ഔട്ട് അത് വായിക്കുന്നില്ല.
2. ഒരേ അഭ്യർത്ഥന എല്ലാ പാനൽ അംഗങ്ങൾക്കും **സമാന്തരമായി** അയയ്ക്കുന്നു, അതിനാൽ ഒരു അഭ്യർത്ഥനയ്ക്ക്
   ഓരോ പാനൽ അംഗത്തിനും ഒരു അപ്സ്ട്രീം കോൾ വീതം ചെലവാകും
   (`open-sse/services/autoCombo/chaosEngine.ts`, ഇവിടെനിന്ന് ഡിസ്പാച്ച് ചെയ്യുന്നു:
   `open-sse/services/combo.ts`).
3. ഓരോ പാനൽ അംഗത്തിന്റെയും ഫലം ലഭിക്കുമ്പോൾ അതിനായി ഒരു സ്റ്റാറ്റസ് ലൈൻ സ്ട്രീം ചെയ്യുന്നു: ഡിഫോൾട്ടായി ഒരു SSE കമന്റ്
   (`: chaos <index> ok|fail <model>`), കൂടാതെ അഭ്യർത്ഥന
   `stream_options.include_chaos_parts: true` സജ്ജമാക്കുമ്പോൾ ഒരു `omni-chaos-part`
   ഇവന്റും (`model`, `index`, `ok`, `error`). ഇവയിൽ ഉത്തരത്തിന്റെ ടെക്സ്റ്റ് ഉണ്ടായിരിക്കില്ല.
4. അന്തിമ OpenAI-ശൈലിയിലുള്ള ചങ്കായി **ഒരു** പാനൽ ഉത്തരം അയയ്ക്കുന്നു: ആദ്യ പാനൽ
   അംഗത്തിന്റേത് (`auto/chaos` അതിനെ `judgeModel` ആയി സജ്ജമാക്കുന്നു), അത് വിജയിക്കുമ്പോൾ; അല്ലെങ്കിൽ
   അവസാനം വിജയിച്ച അംഗത്തിന്റേത്. മറ്റ് പാനൽ ഉത്തരങ്ങൾ തിരികെ നൽകുന്നില്ല, അതിനാൽ
   നിങ്ങൾ N കോളുകൾക്കായി പണം നൽകുകയും ഒരു കംപ്ലീഷൻ മാത്രം ലഭിക്കുകയും ചെയ്യും.

## സജ്ജമാക്കുക

1. തുറക്കുക** ഡാഷ്ബോർഡ് → ചാവോസ് മോഡ്** (`/dashboard/chaos`).
2. അത് തിരിക്കുക** ഓൺ** — ചാവോസ് മോഡ് കപ്പലുകൾ** സ്ഥിരസ്ഥിതിയായി പ്രവർത്തനരഹിതമാക്കി** (`enabled: false` ൽ `src/lib/chaos/chaosConfig.ts`). പ്രവർത്തനരഹിതമാക്കിയിരിക്കുമ്പോൾ, `POST /api/chaos/run` ഉത്തരം `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. പങ്കെടുക്കുന്നവരെയും ഡിഫോൾട്ടുകളും തിരഞ്ഞെടുക്കുക (സെറ്റിംഗ്സ് സ്റ്റോർ വഴി ഓരോ സന്ദർഭത്തിലും തുടരുന്നു):

   | ഫീൽഡ്               | അർത്ഥം                                                                | ഡിഫോൾട്ട് / പരിധികൾ                           |
   | ------------------- | --------------------------------------------------------------------- | --------------------------------------------- |
   | `enabled`           | മാസ്റ്റർ സ്വിച്ച്                                                     | `false`                                       |
   | `defaultMode`       | `parallel` അല്ലെങ്കിൽ `collaborative` (ചുവടെ കാണുക)                   | `parallel`                                    |
   | `providerOverrides` | ഓരോ ദാതാവിനും പങ്കാളിത്തം (`providerId`, ഓപ്ഷണൽ `modelId`, `enabled`) | ശൂന്യമായ = എല്ലാ സജീവ ദാതാക്കളും, പരമാവധി 200 |
   | `systemPrompt`      | ബിൽറ്റ്-ഇൻ ചാവോസ് സിസ്റ്റം പ്രോംപ്റ്റിനായി അസാധുവാക്കുക               | ഓപ്ഷണൽ, പരമാവധി 10 000 അക്ഷരങ്ങൾ              |
   | `timeoutMs`         | ഓരോ മോഡൽ കോളിനും പരമാവധി സമയം                                         | `120000` (5 000–600 000)                      |
   | `maxTokens`         | ഓരോ മോഡൽ കോളിനും`max_tokens`                                          | `4096` (256–128 000)                          |

4. പങ്കെടുക്കുന്ന ഓരോ ദാതാവിനും നൽകുക a** മാതൃക** . ഒരു ദാതാവിൻ്റെ മോഡൽ എന്നത് ചാവോസ് മോഡ് പേജിൽ അതിൻ്റെ പ്രവർത്തനക്ഷമമാക്കിയ ഓവർറൈഡിൻ്റെ `modelId` ആണ് (അത് വിജയിക്കുന്നു), അല്ലാത്തപക്ഷം** സ്ഥിര മോഡൽ** അതിൻ്റെ ബന്ധത്തിൻ്റെ. ഒരു പ്രൊവൈഡർ ഐഡി ഒരിക്കലും ഒരു മോഡൽ നാമമായി ഉപയോഗിക്കില്ല. രണ്ടും ഇല്ലാത്ത ഒരു ദാതാവ്** വിളിച്ചിട്ടില്ല** : ഇത് ഫലങ്ങളിൽ `status: "error"` എന്ന സന്ദേശത്തോടെ കാണിക്കുന്നു _"ഈ ദാതാവിന് ഒരു മോഡലും സജ്ജീകരിച്ചിട്ടില്ല. ചാവോസ് മോഡ് പേജിൽ അതിനായി ഒരു മോഡൽ സജ്ജീകരിക്കുക അല്ലെങ്കിൽ കണക്ഷനിൽ ഒരു സ്ഥിര മോഡൽ സജ്ജമാക്കുക."_ കൂടാതെ മറ്റ് ദാതാക്കൾ സാധാരണയായി പ്രവർത്തിക്കുമ്പോൾ ഒരു ശൂന്യമായ `modelId`. തിരഞ്ഞെടുത്ത ദാതാവിന് ഒരു മോഡൽ ഇല്ലെങ്കിൽ, _"ഒരു ദാതാവിനും ഒരു മോഡൽ സെറ്റ് ഇല്ല. ..."_ (രണ്ട് എൻഡ് പോയിൻ്റുകളിലുംHTTP 500) ഉള്ള ഏതെങ്കിലും അപ്സ്ട്രീം അഭ്യർത്ഥനയ്ക്ക് മുമ്പ് റൺ പരാജയപ്പെടും.
5. എ പ്രവർത്തിപ്പിക്കുക** പേജിൽ നിന്ന് തന്നെ പരീക്ഷിക്കുക** — ഫല പാനൽ ഓരോ ദാതാവിൻ്റെയും ഉത്തരവും സ്റ്റാറ്റസും ദൈർഘ്യവും കാണിക്കുന്നു.

## എക്സിക്യൂഷൻ മോഡുകൾ

- **`parallel`** — എല്ലാ മോഡലുകൾക്കും ഒരേ ടാസ്ക് ഒരേസമയം ലഭിക്കുന്നു; എല്ലാ ഉത്തരങ്ങളും നിങ്ങൾക്ക്
  സ്വതന്ത്രമായി ലഭിക്കുന്നു.
- **`collaborative`** — മോഡലുകൾ **ഒരു ശൃംഖലയായി** പ്രവർത്തിക്കുന്നു: ഓരോന്നും മുമ്പത്തെ മോഡലിന്റെ ഔട്ട്പുട്ട് കാണുകയും
  അത് മെച്ചപ്പെടുത്താനോ വികസിപ്പിക്കാനോ വിമർശിക്കാനോ ഒരു ബദൽ നിർദേശിക്കാനോ ആവശ്യപ്പെടുകയും ചെയ്യുന്നു. റെസ്പോൺസിലെ `summary` ഫീൽഡ്
  വിജയകരമായ ഔട്ട്പുട്ടുകളെ ശൃംഖലാക്രമത്തിൽ സംയോജിപ്പിക്കുന്നു (`parallel` റണ്ണുകൾക്ക് `summary` ഇല്ല).

## API

### `POST /api/chaos/run` — ഡാഷ്ബോർഡ് സെഷൻ

കുക്കി-ആധികാരികത (മാനേജ്മെൻ്റ് സെഷൻ — കാണുക [MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md) ); ഡാഷ്ബോർഡ് പേജ് ഉപയോഗിക്കുന്നു.

```jsonc
// body
{
  "task": "Compare approaches to X", // required
  "providers": ["glm", "kimi"], // optional filter
  "mode": "parallel", // optional — overrides defaultMode
  "systemPrompt": "…", // optional override
  "maxTokens": 4096, // optional override
}
```

### `POST /api/skills/collect/chaos` — API കീ

ബാഹ്യ കോളർമാർക്കുള്ള ബെയറർ-ടോക്കൺ വേരിയൻ്റ്. താക്കോൽ വഹിക്കണം** ചാവോസ് മോഡ് അനുമതി** (`chaosModeEnabled`), അതായത്** സ്ഥിരസ്ഥിതിയായി ഓഫ്** — ഓരോ കീയിലും ഇത് പ്രവർത്തനക്ഷമമാക്കുക** ഡാഷ്ബോർഡ് → API മാനേജർ → എഡിറ്റ് കീ → അനുമതികൾ → ചാവോസ് മോഡ്** . മുകളിൽ പറഞ്ഞ അതേ ശരീരം.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

രണ്ട് അവസാന പോയിൻ്റുകളും ഒരേ ആകൃതി നൽകുന്നു:

```jsonc
{
  "task": "…",
  "mode": "parallel",
  "startedAt": "2026-09-01T00:00:00.000Z",
  "totalProviders": 3,
  "totalResults": 3,
  "models": [
    {
      "providerId": "glm",
      "providerName": "GLM",
      "modelId": "glm-4.7",
      "status": "success",
      "content": "…",
      "durationMs": 3210,
    },
  ],
  "summary": "…", // collaborative mode only
}
```

## ട്രബിൾഷൂട്ടിംഗ്

- **`400 Chaos Mode is not enabled`** മുകളിലുള്ള — ഘട്ടം 2: ആഗോള സ്വിച്ച് ഓഫാണ്.
- **`/api/skills/collect/chaos` ൽ API കീ നിരസിക്കപ്പെടും** — കീയിൽ ഓരോ കീ `chaosModeEnabled` അനുമതി ഇല്ല (സ്ഥിരസ്ഥിതിയായി ഓഫ്; ഇതൊരു ക്രമീകരണമാണ്, ഒരു പിശകല്ല).
- **ഒരു ദാതാവ് `No model set for this provider` കാണിക്കുന്നു** — അതിൻ്റെ മോഡൽ ചാവോസ് മോഡ് പേജിലോ അതിൻ്റെ കണക്ഷനിൽ ഒരു ഡിഫോൾട്ട് മോഡലിലോ സജ്ജമാക്കി (സെറ്റപ്പ്, സ്റ്റെപ്പ് 4 കാണുക).
- **നിങ്ങൾ പ്രതീക്ഷിച്ച ഒരു ദാതാവിനെ ഫലങ്ങളിൽ കാണുന്നില്ല** — ചാവോസ് മോഡ് പേജിൽ `providerOverrides` പരിശോധിക്കുക (ഒരു അപ്രാപ്തമാക്കിയ അസാധുവാക്കൽ അത് ഒഴിവാക്കുന്നു), ദാതാവിൻ്റെ കണക്ഷൻ സജീവമാണോ എന്ന്.
