# Chaos Mode (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Dashboard:** **Chaos Mode** (sidebjælke) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (dashboard-session) · `POST /api/skills/collect/chaos` (API-nøgle)  
> **Kilde:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode sender **én opgave til flere udbydere på én gang** — hver deltagende udbyder
bidrager med én modelinstans, og du får alle svarene side om side (eller sammenkædet). Det er en
kørselsflade til flere modeller, ikke en routingstrategi: din normale trafik til `/v1/chat/completions`
påvirkes aldrig af den.

**Præcisering — tre forskellige ting leveres med "chaos" i navnet:**

| Ting                      | Hvad det er                                                                                                                                                  | Hvor det er dokumenteret                     |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| **Chaos Mode**            | Dashboard-siden + API'et, der beskrives her: send én opgave ud til mange udbydere (parallelt eller kollaborativt).                                           | Denne vejledning                             |
| `auto/chaos`              | Auto-Combo-model-id: parallel fan-out, én model pr. udbyder, ét upstream-kald til hver. Ikke fejlinjektion ([detaljer](#autochaos-parallel-fan-out)).        | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos combo-konfiguration | En permanent gemt combo med `config.chaos.enabled` udfører fan-out på samme måde (kun via API); `judgeModel` vælger kun det endelige svar, uden syntesekald. | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: parallel fan-out

`auto/chaos` er **ikke** en indstilling til fejlinjektion eller robusthedstest. En anmodning med
`model: "auto/chaos"` på `/v1/chat/completions`:

1. Opbygger et panel med **én model pr. udbyder**: den første kandidat fra hver
   tilsluttet udbyder i kandidatpuljens rækkefølge, op til 5 medlemmer
   (`OMNIROUTE_CHAOS_MAX_PANEL`, begrænset til højst 10)
   (`open-sse/services/autoCombo/virtualFactory.ts`). Vægtpakken `chaos-mode`
   angiver kun hvert medlems `weight`; fan-out-processen læser den ikke.
2. Sender den samme anmodning til alle panelmedlemmer **parallelt**, så én anmodning
   koster ét upstream-kald pr. panelmedlem
   (`open-sse/services/autoCombo/chaosEngine.ts`, afsendt fra
   `open-sse/services/combo.ts`).
3. Streamer én statuslinje pr. panelmedlem, efterhånden som resultatet ankommer: som standard en SSE-kommentar
   (`: chaos <index> ok|fail <model>`) samt en `omni-chaos-part`-hændelse
   (`model`, `index`, `ok`, `error`), når anmodningen angiver
   `stream_options.include_chaos_parts: true`. Disse indeholder ingen svartekst.
4. Sender **ét** panelsvar som det endelige chunk i OpenAI-stil: svaret fra det første panelmedlem
   (`auto/chaos` angiver det som `judgeModel`), når det lykkes, og ellers
   svaret fra det senest fuldførte medlem. De øvrige panelsvar returneres ikke, så
   du betaler for N kald og modtager én fuldførelse.

## Opsætning

1. Åben** Dashboard → Chaos Mode** (`/dashboard/chaos`).
2. Vend den** på** — Chaos Mode-skibe** deaktiveret som standard** (`enabled: false` i `src/lib/chaos/chaosConfig.ts`). Mens de er deaktiveret, svarer `POST /api/chaos/run` `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Vælg deltagerne og standardindstillingerne (vedvarende pr. instans via indstillingsbutikken):

   | Felt                | Mening                                                              | Standard / grænser                   |
   | ------------------- | ------------------------------------------------------------------- | ------------------------------------ |
   | `enabled`           | Hovedafbryder                                                       | `false`                              |
   | `defaultMode`       | `parallel` eller `collaborative` (se nedenfor)                      | `parallel`                           |
   | `providerOverrides` | Deltagelse pr. udbyder (`providerId`, valgfri `modelId`, `enabled`) | tomme = hver aktive udbyder, max 200 |
   | `systemPrompt`      | Tilsidesæt for den indbyggede Chaos-systemprompt                    | valgfrit, max 10.000 tegn            |
   | `timeoutMs`         | Max tid pr. modelopkald                                             | `120000` (5 000–600 000)             |
   | `maxTokens`         | `max_tokens` pr model opkald                                        | `4096` (256–128 000)                 |

4. Giv hver deltagende udbyder en** model** . En udbyders model er `modelId` for dens aktiverede tilsidesættelse på siden Chaos Mode (den vinder), ellers** standardmodel** af dens forbindelse. Et udbyder-id bruges aldrig som modelnavn. En udbyder med ingen af dem** ikke kaldet** : det vises i resultaterne som `status: "error"` med beskeden _"Ingen model sat for denne udbyder. Indstil en model for det på Chaos Mode-siden eller en standardmodel på forbindelsen."_ og en tom `modelId`, mens de andre udbydere kører normalt. Hvis ingen valgt udbyder har en model, mislykkes kørslen før enhver opstrømsanmodning med _"Ingen udbyder har et modelsæt. …"_ (HTTP 500 på begge endepunkter).
5. Kør a** test fra selve siden** — resultatpanelet viser hver udbyders svar, status og varighed.

## Kørselstilstande

- **`parallel`** — alle modeller modtager den samme opgave samtidigt; du modtager alle svarene
  uafhængigt af hinanden.
- **`collaborative`** — modellerne kører **i en kæde**: Hver model ser den forrige models output og
  bliver bedt om at forbedre, udvide, kritisere eller tilbyde et alternativ. Svarets `summary`-felt
  sammenkæder de vellykkede output i kædens rækkefølge (parallelle kørsler har ingen `summary`).

## API

### `POST /api/chaos/run` — dashboard session

Cookie-godkendt (administrationssessionen — se [MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md) ); bruges af dashboard-siden.

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

### `POST /api/skills/collect/chaos` — API nøgle

Bærer-token-variant til eksterne opkaldere. Nøglen skal bære** Chaos Mode tilladelse** (`chaosModeEnabled`), hvilket er** slået fra som standard** — aktivere det pr. nøgle ind** Dashboard → API Manager → edit key → tilladelser → Chaos Mode** . Samme krop som ovenfor.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Begge endepunkter returnerer den samme form:

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

## Fejlfinding

- **`400 Chaos Mode is not enabled`** — trin 2 ovenfor: den globale kontakt er slukket.
- **API nøgle bliver afvist på `/api/skills/collect/chaos`** — nøglen mangler per-key `chaosModeEnabled` tilladelsen (deaktiveret som standard; dette er en indstilling, ikke en fejl).
- **En udbyder viser `No model set for this provider`** — indstillede sin model på siden Chaos Mode eller en standardmodel på sin forbindelse (se Opsætning, trin 4).
- **En udbyder, du forventede, mangler i resultaterne** — kontroller `providerOverrides` på siden Chaos Mode (en deaktiveret tilsidesættelse udelukker det), og om udbyderforbindelsen er aktiv.
