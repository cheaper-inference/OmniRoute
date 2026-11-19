# Chaos Mode (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Dashboard:** **Chaos Mode** (fil-sidebar) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (sessjoni tad-dashboard) · `POST /api/skills/collect/chaos` (ċavetta tal-API)  
> **Sors:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode jibgħat **kompitu wieħed lil diversi fornituri f'daqqa** — kull fornitur parteċipanti
jikkontribwixxi istanza waħda ta' mudell, u tirċievi t-tweġibiet kollha ħdejn xulxin (jew f'katina). Din hija
interfaċċa ta' eżekuzzjoni b'diversi mudelli, mhux strateġija ta' direzzjonar: it-traffiku normali tiegħek ta'
`/v1/chat/completions` qatt ma jiġi affettwat minnha.

**Distinzjoni — jiġu pprovduti tliet affarijiet differenti li għandhom "chaos" f'isimhom:**

| Ħaġa                            | X'inhi                                                                                                                                                                                     | Fejn hi ddokumentata                         |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| **Chaos Mode**                  | Il-paġna tad-dashboard + l-API deskritta hawnhekk: tqassam kompitu wieħed lil ħafna fornituri (b'mod parallel jew kollaborattiv).                                                          | Din il-gwida                                 |
| `auto/chaos`                    | ID tal-mudell Auto-Combo: tqassim parallel, mudell wieħed għal kull fornitur, sejħa waħda upstream għal kull wieħed. Mhix injezzjoni ta' ħsarat ([dettalji](#autochaos-parallel-fan-out)). | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Konfigurazzjoni tal-combo Chaos | Combo persistita b'`config.chaos.enabled` tqassam bl-istess mod (bl-API biss); `judgeModel` jagħżel biss it-tweġiba finali, mingħajr sejħa ta' sinteżi.                                    | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: tqassim parallel

`auto/chaos` **mhuwiex** kontroll għall-injezzjoni ta' ħsarat jew għall-ittestjar tar-reżiljenza. Meta titlob
`model: "auto/chaos"` fuq `/v1/chat/completions`:

1. Jibni panel ta' **mudell wieħed għal kull fornitur**: l-ewwel kandidat ta' kull
   fornitur konness, skont l-ordni fil-ġabra tal-kandidati, sa 5 membri
   (`OMNIROUTE_CHAOS_MAX_PANEL`, b'limitu massimu ta' 10)
   (`open-sse/services/autoCombo/virtualFactory.ts`). Il-pakkett tal-piżijiet `chaos-mode`
   jistabbilixxi biss il-`weight` ta' kull membru; it-tqassim ma jaqrahx.
2. Jibgħat l-istess talba lil kull membru tal-panel **b'mod parallel**, għalhekk talba waħda
   tiswa sejħa upstream waħda għal kull membru tal-panel
   (`open-sse/services/autoCombo/chaosEngine.ts`, mibgħuta minn
   `open-sse/services/combo.ts`).
3. Jistrimja linja waħda tal-istatus għal kull membru tal-panel hekk kif tasal: kumment SSE
   (`: chaos <index> ok|fail <model>`) b'mod awtomatiku, flimkien ma' avveniment `omni-chaos-part`
   (`model`, `index`, `ok`, `error`) meta t-talba tissettja
   `stream_options.include_chaos_parts: true`. Dawn ma jinkludu ebda test tat-tweġiba.
4. Jibgħat **tweġiba waħda** tal-panel bħala l-aħħar blokka fl-istil ta' OpenAI: dik tal-ewwel membru
   tal-panel (`auto/chaos` jissettjah bħala `judgeModel`) meta jirnexxi, inkella
   dik tal-aħħar membru li rnexxa. It-tweġibiet l-oħra tal-panel ma jiġux irritornati, għalhekk
   tħallas għal N sejħiet u tirċievi tlestija waħda.

## Setup

1. Miftuħa** Dashboard → Chaos Mode** (`/dashboard/chaos`).
2. Dawwarha** fuq** — Chaos Mode vapuri** diżattivat awtomatikament** (`enabled: false` fi `src/lib/chaos/chaosConfig.ts`). Waqt li jkun diżabbli, `POST /api/chaos/run` iwieġeb `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Agħżel il-parteċipanti u l-inadempjenzi (persisti kull istanza permezz tal-maħżen tas-settings):

   | Qasam               | Tifsira                                                                              | Default / limiti                     |
   | ------------------- | ------------------------------------------------------------------------------------ | ------------------------------------ |
   | `enabled`           | Swiċċ ewlieni                                                                        | `false`                              |
   | `defaultMode`       | `parallel` jew `collaborative` (ara hawn taħt)                                       | `parallel`                           |
   | `providerOverrides` | Parteċipazzjoni għal kull fornitur (`providerId`, `modelId` fakultattiv , `enabled`) | = vojta kull provider attiv, max 200 |
   | `systemPrompt`      | Override għas-sistema Chaos integrata fil-pront                                      | fakultattiv, max 10 000 chars        |
   | `timeoutMs`         | Ħin massimu għal kull sejħa mudell                                                   | `120000` (5 000–600 000)             |
   | `maxTokens`         | `max_tokens` kull model call                                                         | `4096` (256–128 000)                 |

4. Agħti lil kull fornitur parteċipanti a** mudell** . Mudell ta' fornitur huwa ż- `modelId` tal-override ppermettiet tiegħu fuq il-paġna tal-Modalità Chaos (jirbaħ), inkella l-** mudell default** tal-konnessjoni tagħha. Id-fornitur qatt ma jintuża bħala isem tal-mudell. Fornitur ma hu** mhux imsejħa** : jidher fir-riżultati bħala `status: "error"` bil-messaġġ _"L-ebda mudell stabbilit għal dan il-fornitur. Issettja mudell għalih fuq il-paġna tal-Modalità Chaos jew mudell default fuq il-konnessjoni."_ u `modelId` vojta , filwaqt li l-fornituri l-oħra jaħdmu b'mod normali. Jekk l-ebda fornitur magħżul ma jkollu mudell, il-ġirja tfalli qabel kwalunkwe talba upstream bi _"L-ebda fornitur m'għandu sett ta' mudell. ..."_ (HTTP 500 fuq iż-żewġ endpoints).
5. Mexxi a** test mill-paġna nnifisha** — il-pannell tar-riżultati juri t-tweġiba, l-istatus u t-tul ta' kull fornitur.

## Modi ta' eżekuzzjoni

- **`parallel`** — kull mudell jirċievi l-istess kompitu fl-istess ħin; tirċievi t-tweġibiet kollha
  indipendentement.
- **`collaborative`** — il-mudelli jitħaddmu **f'katina**: kull wieħed jara l-output tal-mudell preċedenti u
  jintalab jirfinah, jestendih, jikkritikah jew joffri alternattiva. Il-qasam `summary` tar-rispons
  jikkonkatenja l-outputs li rnexxew skont l-ordni tal-katina (l-eżekuzzjonijiet paralleli m'għandhomx `summary`).

## API

### `POST /api/chaos/run` — dashboard session

Cookie awtentikati (is-sessjoni ta' ġestjoni — ara [MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md) ); użata mill-paġna tad-dashboard.

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

### `POST /api/skills/collect/chaos` — API key

Varjant tal-bearer-token għal min iċempel estern. Iċ-ċavetta għandha ġġorr il-** Permess tal-Modalità Chaos** (`chaosModeEnabled`), li hu** off awtomatikament** — jippermettulha għal kull key in** Dashboard → API Manager → edit key → permessi → Chaos Mode** . L-istess korp bħal hawn fuq.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Iż-żewġ endpoints jirritornaw l-istess forma:

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

## Issolvi l-problemi

- **`400 Chaos Mode is not enabled`** — pass 2 hawn fuq: is-swiċċ globali huwa mitfi.
- **API key gets miċħuda fuq `/api/skills/collect/chaos`** — iċ-ċavetta m'għandhiex il-permess `chaosModeEnabled` għal kull ċavetta (off awtomatikament; dan huwa setting, mhux żball).
- **Provider juri `No model set for this provider`** — issettja l-mudell tiegħu fuq il-paġna tal-Modalità Chaos jew mudell default fuq il-konnessjoni tiegħu (ara Setup, pass 4).
- **Fornitur li stennejt huwa nieqes mir-riżultati** — iċċekkja `providerOverrides` fuq il-paġna tal-Modalità Chaos (override b'diżabbiltà jeskludih) u jekk il-konnessjoni tal-fornitur hijiex attiva.
