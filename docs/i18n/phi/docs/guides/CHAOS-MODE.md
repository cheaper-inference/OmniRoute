# Chaos Mode (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Dashboard:** **Chaos Mode** (sidebar) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (session ng dashboard) · `POST /api/skills/collect/chaos` (API key)  
> **Source:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Nagpapadala ang Chaos Mode ng **isang gawain sa ilang provider nang sabay-sabay** — nag-aambag ang bawat kalahok na provider
ng isang instance ng modelo, at makukuha mo ang lahat ng sagot nang magkakatabi (o magkakasunod na nakakadena). Isa itong
surface para sa pagpapatakbo ng maraming modelo, hindi isang diskarte sa pagruruta: hindi nito kailanman naaapektuhan ang iyong karaniwang trapiko sa
`/v1/chat/completions`.

**Paglilinaw — tatlong magkakaibang bagay ang inilalabas na may "chaos" sa pangalan:**

| Bagay              | Ano ito                                                                                                                                                                                  | Saan nakadokumento                           |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**     | Ang pahina ng dashboard + API na inilalarawan dito: ipamahagi ang isang gawain sa maraming provider (parallel o collaborative).                                                          | Ang gabay na ito                             |
| `auto/chaos`       | Model id ng Auto-Combo: parallel na pamamahagi, isang modelo bawat provider, tig-isang upstream call. Hindi fault injection ([mga detalye](#autochaos-parallel-fan-out)).                | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos combo config | Isang naka-persist na combo na may `config.chaos.enabled` na namamahagi sa parehong paraan (API-only); pinipili lamang ng `judgeModel` ang panghuling sagot, nang walang synthesis call. | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: parallel na pamamahagi

Ang `auto/chaos` ay **hindi** isang kontrol para sa fault injection o pagsusuri ng resilience. Kapag humiling ng
`model: "auto/chaos"` sa `/v1/chat/completions`:

1. Bumubuo ito ng panel na may **isang modelo bawat provider**: ang unang kandidato ng bawat
   nakakonektang provider, ayon sa pagkakasunod-sunod sa candidate pool, hanggang 5 miyembro
   (`OMNIROUTE_CHAOS_MAX_PANEL`, limitado sa 10)
   (`open-sse/services/autoCombo/virtualFactory.ts`). Itinatakda lamang ng `chaos-mode` weight
   pack ang `weight` ng bawat miyembro; hindi ito binabasa ng pamamahagi.
2. Ipinapadala nito ang parehong request sa bawat miyembro ng panel **nang sabay-sabay**, kaya ang isang request
   ay nagkakahalaga ng isang upstream call bawat miyembro ng panel
   (`open-sse/services/autoCombo/chaosEngine.ts`, ipinapadala mula sa
   `open-sse/services/combo.ts`).
3. Nag-i-stream ito ng isang status line bawat miyembro ng panel habang dumarating ang resulta: isang SSE comment
   (`: chaos <index> ok|fail <model>`) bilang default, kasama ang isang `omni-chaos-part`
   event (`model`, `index`, `ok`, `error`) kapag itinakda ng request ang
   `stream_options.include_chaos_parts: true`. Walang nilalamang teksto ng sagot ang mga ito.
4. Nagpapadala ito ng **isang** sagot mula sa panel bilang panghuling chunk na OpenAI-style: ang sagot ng unang miyembro ng panel
   (itinatalaga ito ng `auto/chaos` bilang `judgeModel`) kapag matagumpay ito, o kung hindi,
   ang sagot ng huling matagumpay na miyembro. Hindi ibinabalik ang iba pang sagot ng panel, kaya
   nagbabayad ka para sa N call ngunit isang completion lamang ang natatanggap mo.

## Setup

1. Bukas** Dashboard → Chaos Mode** (`/dashboard/chaos`).
2. Lumiko ito** sa** — Chaos Mode ships** hindi pinagana bilang default** (`enabled: false` sa `src/lib/chaos/chaosConfig.ts`). Habang naka-disable, sinasagot `POST /api/chaos/run` `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Piliin ang mga kalahok at mga default (nagpatuloy bawat pagkakataon sa pamamagitan ng tindahan ng mga setting):

   | Patlang             | Ibig sabihin                                                                | Default / limitasyon                            |
   | ------------------- | --------------------------------------------------------------------------- | ----------------------------------------------- |
   | `enabled`           | Master switch                                                               | `false`                                         |
   | `defaultMode`       | `parallel` o `collaborative` (tingnan sa ibaba)                             | `parallel`                                      |
   | `providerOverrides` | Paglahok ng bawat provider (`providerId`, opsyonal na `modelId`, `enabled`) | walang laman = bawat aktibong provider, max 200 |
   | `systemPrompt`      | I-override para sa built-in na Chaos system prompt                          | opsyonal, max 10 000 char                       |
   | `timeoutMs`         | Max na oras sa bawat modelong tawag                                         | `120000` (5 000–600 000)                        |
   | `maxTokens`         | `max_tokens` sa bawat modelong tawag                                        | `4096` (256–128 000)                            |

4. Bigyan ang bawat kalahok na tagapagkaloob ng a** modelo** . Ang modelo ng provider ay ang `modelId` ng pinagana nitong override sa page ng Chaos Mode (panalo ito), kung hindi, ang** default na modelo** ng koneksyon nito. Ang isang provider id ay hindi kailanman ginagamit bilang isang pangalan ng modelo. Isang provider na wala ni isa** hindi tinawag** : lumalabas ito sa mga resulta bilang `status: "error"` na may mensaheng _"Walang nakatakdang modelo para sa provider na ito. Magtakda ng modelo para dito sa page ng Chaos Mode o isang default na modelo sa koneksyon."_ at isang walang laman `modelId`, habang tumatakbo nang normal ang iba pang mga provider. Kung walang napiling provider na may modelo, mabibigo ang pagtakbo bago ang anumang upstream na kahilingan sa _"Walang provider ang may set ng modelo. ..."_ (HTTP 500 sa parehong mga endpoint).
5. Takbo a** pagsubok mula sa mismong pahina** — ipinapakita ng panel ng mga resulta ang sagot, katayuan at tagal ng bawat provider.

## Mga mode ng execution

- **`parallel`** — natatanggap ng bawat model ang parehong gawain nang sabay-sabay; matatanggap mo ang lahat ng sagot
  nang magkakahiwalay.
- **`collaborative`** — tumatakbo ang mga model **nang magkakasunod sa isang chain**: nakikita ng bawat isa ang output ng naunang model at
  inuutusang paghusayin, palawakin, suriin, o magbigay ng alternatibo. Pinagsasama ng `summary` field
  ng response ang mga matagumpay na output ayon sa pagkakasunod-sunod sa chain (walang `summary` ang mga parallel run).

## API

### `POST /api/chaos/run` — dashboard session

Cookie-authenticated (ang session ng pamamahala — tingnan ang [MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md) ); ginagamit ng pahina ng dashboard.

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

Bearer-token na variant para sa mga external na tumatawag. Dapat dalhin ng susi ang** Pahintulot sa Chaos Mode** (`chaosModeEnabled`), na** naka-off bilang default** — paganahin ito sa bawat key in** Dashboard → API Manager → edit key → mga pahintulot → Chaos Mode** . Parehong katawan tulad ng nasa itaas.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Ang parehong mga endpoint ay nagbabalik ng parehong hugis:

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

## Pag-troubleshoot

- **`400 Chaos Mode is not enabled`** — hakbang 2 sa itaas: naka-off ang global switch.
- **API key ay tinatanggihan sa `/api/skills/collect/chaos`** — ang key ay kulang sa per-key `chaosModeEnabled` na pahintulot (naka-off bilang default; ito ay isang setting, hindi isang error).
- **Ang isang provider ay nagpapakita `No model set for this provider`** itinakda — ang modelo nito sa page ng Chaos Mode o isang default na modelo sa koneksyon nito (tingnan ang Setup, hakbang 4).
- **Ang isang provider na iyong inaasahan ay nawawala sa mga resulta** — check `providerOverrides` sa page ng Chaos Mode (hindi kasama ang isang naka-disable na override) at kung aktibo ang koneksyon ng provider.
