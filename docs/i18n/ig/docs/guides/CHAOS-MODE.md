# Chaos Mode (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Dashboard:** **Chaos Mode** (ogwe akụkụ) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (nnọkọ dashboard) · `POST /api/skills/collect/chaos` (igodo API)  
> **Ebe mmalite:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode na-eziga **otu ọrụ nye ọtụtụ ndị na-enye ọrụ n'otu oge** — onye na-enye ọrụ ọ bụla sonyere
na-eweta otu instance nke model, ị ga-enwetakwa azịza niile n'akụkụ ibe ha (ma ọ bụ jikọta ha n'usoro). Ọ bụ
ebe a na-eme ihe site n'ọtụtụ model, ọ bụghị atụmatụ routing: ọ naghị emetụta traffic `/v1/chat/completions`
gị nke nkịtị ma ọlị.

**Nkọwapụta ọdịiche — e nwere ihe atọ dị iche iche e wepụtara nwere "chaos" n'aha ha:**

| Ihe               | Ihe ọ bụ                                                                                                                                                                         | Ebe e dere nkọwa ya                          |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**    | Ibe dashboard + API akọwara ebe a: gbasaa otu ọrụ gaa ọtụtụ ndị na-enye ọrụ (n'otu oge ma ọ bụ site na mmekorita).                                                               | Ntuziaka a                                   |
| `auto/chaos`      | Id model Auto-Combo: mgbasa n'otu oge, otu model maka onye na-enye ọrụ ọ bụla, otu oku upstream maka nke ọ bụla. Ọ bụghị fault injection ([nkọwa](#autochaos-parallel-fan-out)). | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Nhazi chaos combo | Combo echekwara nke nwere `config.chaos.enabled` na-agbasa n'otu ụzọ ahụ (naanị site na API); `judgeModel` na-ahọrọ naanị azịza ikpeazụ, enweghị oku synthesis.                  | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: mgbasa n'otu oge

`auto/chaos` **abụghị** njikwa maka fault-injection ma ọ bụ nnwale resilience. Mgbe a rịọrọ
`model: "auto/chaos"` na `/v1/chat/completions`:

1. Ọ na-ewulite panel nke nwere **otu model maka onye na-enye ọrụ ọ bụla**: candidate mbụ nke
   onye na-enye ọrụ ọ bụla ejikọrọ, dịka usoro candidate-pool si dị, ruo ndị otu 5
   (`OMNIROUTE_CHAOS_MAX_PANEL`, nke oke ya bụ 10)
   (`open-sse/services/autoCombo/virtualFactory.ts`). Ngwugwu weight `chaos-mode`
   na-edobe naanị `weight` nke onye otu ọ bụla; mgbasa ahụ anaghị agụ ya.
2. Ọ na-eziga otu request ahụ nye onye otu panel ọ bụla **n'otu oge**, ya mere otu request
   na-efu otu oku upstream maka onye otu panel ọ bụla
   (`open-sse/services/autoCombo/chaosEngine.ts`, nke
   `open-sse/services/combo.ts` na-ezipụ).
3. Ọ na-stream otu ahịrị status maka onye otu panel ọ bụla ozugbo ọ bịarutere: comment SSE
   (`: chaos <index> ok|fail <model>`) na ndabara, tinyere event `omni-chaos-part`
   (`model`, `index`, `ok`, `error`) mgbe request ahụ debere
   `stream_options.include_chaos_parts: true`. Ihe ndị a anaghị ebu ederede azịza.
4. Ọ na-eziga **otu** azịza panel dịka chunk ikpeazụ n'ụdị OpenAI: nke onye otu panel
   mbụ (`auto/chaos` na-edobe ya dịka `judgeModel`) mgbe ọ gara nke ọma, ma ọ bụghị ya,
   nke onye otu ikpeazụ gara nke ọma. A naghị eweghachi azịza ndị ọzọ nke panel ahụ, ya mere
   ị na-akwụ ụgwọ maka oku N ma nata otu completion.

## Melite

1. Mepee** Dashboard → Chaos Mode** (`/dashboard/chaos`).
2. Tụgharịa ya** na** — Chaos Mode ụgbọ mmiri** nwere nkwarụ na ndabara** (`enabled: false` na `src/lib/chaos/chaosConfig.ts`). Mgbe enwere nkwarụ, `POST /api/chaos/run` na-aza `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Họrọ ndị sonyere na ndabara (na-aga n'ihu kwa ọmụmaatụ site na ụlọ ahịa ntọala):

   | Ubi                 | Pụtara                                                              | Ihe ndabara / oke                       |
   | ------------------- | ------------------------------------------------------------------- | --------------------------------------- |
   | `enabled`           | Master mgba ọkụ                                                     | `false`                                 |
   | `defaultMode`       | `parallel` ma ọ bụ `collaborative` (lee n'okpuru)                   | `parallel`                              |
   | `providerOverrides` | Ntinye aka onye na-eweta (`providerId`, `modelId` nhọrọ, `enabled`) | efu = onye ọ bụla na-eweta ọrụ, max 200 |
   | `systemPrompt`      | Wepụ maka ngwa ngwa sistemụ Chaos arụnyere n'ime ya                 | nhọrọ, max 10 000 chars                 |
   | `timeoutMs`         | Oge kacha n'otu oku nlereanya                                       | `120000` (5 000–600 000)                |
   | `maxTokens`         | `max_tokens` kwa nlereanya oku                                      | `4096` (256–128 000)                    |

4. Nye onye ọ bụla na-eweta ọrụ a** ihe nlereanya** . Nlereanya onye na-eweta bụ `modelId` nke enyere ya aka ịkagbu na ibe Chaos Mode (ọ na-emeri), ma ọ bụghị ya,** ụdị ndabara** nke njikọ ya. A naghị eji id onye na-eweta ọrụ dịka aha nlereanya. Onye na-eweta enweghị nke ọ bụla** akpọghị ya** : ọ na-egosi na nsonaazụ ya dị ka `status: "error"` na ozi _"Ọ dịghị ihe nlereanya setịpụrụ maka onye na-eweta ihe a. Debe ihe nlereanya maka ya na ibe Chaos Mode ma ọ bụ ihe ndabere na njikọ ahụ." _ na `modelId` efu , ebe ndị ọzọ na-enye ọrụ na-agba ọsọ. Ọ bụrụ na ọnweghị onye na-eweta ahọpụtara nwere ihe nlereanya, ọsọ ahụ ga-ada tupu arịrịọ ọ bụla dị elu na _"Ọnweghị onye na-eweta nwere setịpụrụ ihe nlereanya…"_ (HTTP 500 na njedebe abụọ ahụ).
5. Gbaa a** nwalee site na ibe n'onwe ya** — panel rịzọlt na-egosi azịza onye ọ bụla na-eweta, ọkwa na ogologo oge.

## Ụdị arụmọrụ

- **`parallel`** — ihe nlereanya ọ bụla na-enweta otu ọrụ ahụ n'otu oge; ị na-enweta azịza niile
  n'adabereghị na ibe ha.
- **`collaborative`** — ihe nlereanya na-arụ ọrụ **n'usoro njikọ**: nke ọ bụla na-ahụ nsonaazụ ihe nlereanya gara aga ma
  a gwa ya ka ọ melite, gbasaa, tụlee nkatọ, ma ọ bụ nye ụzọ ọzọ. Oghere `summary` nke nzaghachi ahụ
  na-ejikọta nsonaazụ ndị gara nke ọma n'usoro njikọ ahụ (arụmọrụ parallel enweghị `summary`).

## API

### `POST /api/chaos/run` — dashboard nnọkọ

Kuki-kwetara (nnọkọ njikwa — lee [MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md) ); nke ibe dashboard na-eji.

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

### `POST /api/skills/collect/chaos` — API

Ihe dị iche iche nke bearer maka ndị na-akpọ oku si mpụga. Igodo ahụ ga-eburịrị** Ikike ọnọdụ ọgba aghara** (`chaosModeEnabled`), nke bu** gbanyụọ na ndabara** — mee ya kwa igodo n'ime** Dashboard → API Manager → dezie igodo → ikike → Chaos Mode** . Otu ahụ dị ka n'elu.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Ebe njedebe abụọ a na-eweghachi otu udi:

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

## Nchọpụta nsogbu

- **`400 Chaos Mode is not enabled`** — nzọụkwụ 2 n'elu: agbanyụrụ mgba ọkụ zuru ụwa ọnụ.
- **a na-ajụ igodo API na `/api/skills/collect/chaos`** — igodo enweghị ikike `chaosModeEnabled` kwa-key (gbanyụọ na ndabara; nke a bụ ntọala, ọ bụghị njehie).
- **Onye na-eweta na-egosi `No model set for this provider`** — setịpụrụ ihe nlereanya ya na ibe Chaos Mode ma ọ bụ ihe atụ nke ndabara na njikọ ya (lee Ntọala, nzọụkwụ 4).
- **Onye na-eweta ihe ị tụrụ anya na-efu na nsonaazụ ya** — lelee `providerOverrides` na ibe Chaos Mode (nkwụsị enweghị nkwarụ na-ewepu ya) yana ma njikọ ndị na-eweta ọ na-arụ ọrụ.
