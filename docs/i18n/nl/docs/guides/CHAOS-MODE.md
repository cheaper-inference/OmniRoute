# Chaos Mode (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Dashboard:** **Chaos Mode** (zijbalk) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (dashboardsessie) · `POST /api/skills/collect/chaos` (API-sleutel)  
> **Broncode:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode verzendt **één taak tegelijk naar meerdere providers** — elke deelnemende provider
draagt één modelinstantie bij en je krijgt alle antwoorden naast elkaar (of aaneengeschakeld). Het is een
uitvoeringsomgeving voor meerdere modellen, geen routeringsstrategie: je normale verkeer naar
`/v1/chat/completions` wordt er nooit door beïnvloed.

**Verduidelijking — er worden drie verschillende zaken geleverd met "chaos" in de naam:**

| Zaak                    | Wat het is                                                                                                                                                                 | Waar gedocumenteerd                          |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**          | De hier beschreven dashboardpagina + API: verdeel één taak over meerdere providers (parallel of samenwerkend).                                                             | Deze handleiding                             |
| `auto/chaos`            | Auto-Combo-model-ID: parallelle fan-out, één model per provider, elk één upstream-aanroep. Geen foutinjectie ([details](#autochaos-parallelle-fan-out)).                   | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos-comboconfiguratie | Een permanente combo met `config.chaos.enabled` voert dezelfde fan-out uit (alleen via API); `judgeModel` kiest alleen het uiteindelijke antwoord, zonder syntheseaanroep. | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: parallelle fan-out

`auto/chaos` is **geen** instelling voor foutinjectie of weerbaarheidstests. Een aanvraag met
`model: "auto/chaos"` op `/v1/chat/completions`:

1. Stelt een panel samen met **één model per provider**: de eerste kandidaat van elke
   verbonden provider, in de volgorde van de kandidatenpool, tot maximaal 5 leden
   (`OMNIROUTE_CHAOS_MAX_PANEL`, begrensd op 10)
   (`open-sse/services/autoCombo/virtualFactory.ts`). Het `chaos-mode`-gewichtspakket
   stelt alleen de `weight` van elk lid in; de fan-out leest deze niet.
2. Verzendt dezelfde aanvraag **parallel** naar elk panellid, waardoor één aanvraag
   één upstream-aanroep per panellid kost
   (`open-sse/services/autoCombo/chaosEngine.ts`, aangestuurd vanuit
   `open-sse/services/combo.ts`).
3. Streamt één statusregel per panellid zodra deze binnenkomt: standaard een SSE-commentaarregel
   (`: chaos <index> ok|fail <model>`), plus een `omni-chaos-part`-event
   (`model`, `index`, `ok`, `error`) wanneer de aanvraag
   `stream_options.include_chaos_parts: true` instelt. Deze bevatten geen antwoordtekst.
4. Verzendt **één** panelantwoord als het uiteindelijke OpenAI-achtige chunk: dat van het eerste
   panellid (`auto/chaos` stelt dit in als `judgeModel`) wanneer dit slaagt, anders
   dat van het laatste succesvolle lid. De andere panelantwoorden worden niet geretourneerd, dus
   je betaalt voor N aanroepen en ontvangt één aanvulling.

## Installatie

1. Open** Dashboard → Chaos-modus** (`/dashboard/chaos`).
2. Draai het** op** — Chaos Mode-schepen** standaard uitgeschakeld** (`enabled: false` in `src/lib/chaos/chaosConfig.ts`). Wanneer uitgeschakeld, antwoordt `POST /api/chaos/run` `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Kies de deelnemers en standaardinstellingen (per exemplaar gehandhaafd via het instellingenarchief):

   | Veld                | Betekenis                                                             | Standaard / limieten                   |
   | ------------------- | --------------------------------------------------------------------- | -------------------------------------- |
   | `enabled`           | Hoofdschakelaar                                                       | `false`                                |
   | `defaultMode`       | `parallel` of `collaborative` (zie hieronder)                         | `parallel`                             |
   | `providerOverrides` | Deelname per aanbieder (`providerId`, optioneel `modelId`, `enabled`) | lege = elke actieve aanbieder, max 200 |
   | `systemPrompt`      | Overschrijf de ingebouwde Chaos-systeemprompt                         | optioneel, max. 10.000 tekens          |
   | `timeoutMs`         | Maximale tijd per modeloproep                                         | `120000` (5 000–600 000)               |
   | `maxTokens`         | `max_tokens` per modeloproep                                          | `4096` (256–128 000)                   |

4. Geef iedere deelnemende aanbieder een** model** . Het model van een provider is de `modelId` van de ingeschakelde overschrijving op de pagina Chaosmodus (deze wint), anders** standaardmodel** van zijn verbinding. Een provider-ID wordt nooit als modelnaam gebruikt. Een aanbieder die geen van beide heeft, is dat ook** niet gebeld** : het verschijnt in de resultaten als `status: "error"` met het bericht _"Er is geen model ingesteld voor deze provider. Stel er een model voor in op de Chaos Mode-pagina of een standaardmodel voor de verbinding."_ en een lege `modelId`, terwijl de andere providers normaal werken. Als geen enkele geselecteerde provider een model heeft, mislukt de uitvoering vóór elk upstream-verzoek met _"Geen provider heeft een model ingesteld. …"_ (HTTP 500 op beide eindpunten).
5. Voer een uit** test vanaf de pagina zelf** — het resultatenpaneel toont het antwoord, de status en de duur van elke aanbieder.

## Uitvoeringsmodi

- **`parallel`** — elk model krijgt tegelijkertijd dezelfde taak; je ontvangt alle antwoorden
  onafhankelijk van elkaar.
- **`collaborative`** — modellen worden **als een keten uitgevoerd**: elk model ziet de uitvoer van het vorige model en
  krijgt de opdracht deze te verfijnen, uit te breiden, te bekritiseren of een alternatief te bieden. Het veld `summary` van
  de respons voegt de geslaagde uitvoer in de volgorde van de keten samen (parallelle uitvoeringen hebben geen `summary`).

## API

### `POST /api/chaos/run` — dashboardsessie

Cookie-geauthenticeerd (de beheersessie — zie [MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md) ); gebruikt door de dashboardpagina.

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

### `POST /api/skills/collect/chaos` — API sleutel

Bearer-token-variant voor externe bellers. De sleutel moet de** Chaosmodus-toestemming** (`chaosModeEnabled`), dat wil zeggen** standaard uitgeschakeld** — schakel het per sleutel in** Dashboard → API Manager → sleutel bewerken → machtigingen → Chaosmodus** . Hetzelfde lichaam als hierboven.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Beide eindpunten retourneren dezelfde vorm:

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

## Problemen oplossen

- **`400 Chaos Mode is not enabled`** — stap 2 hierboven: de globale schakelaar staat uit.
- **API sleutel wordt afgewezen op `/api/skills/collect/chaos`** — de sleutel mist de `chaosModeEnabled` -machtiging per sleutel (standaard uitgeschakeld; dit is een instelling, geen fout).
- **Een aanbieder toont `No model set for this provider`** — stelt zijn model in op de Chaos Mode-pagina of een standaardmodel op zijn verbinding (zie Installatie, stap 4).
- **Een aanbieder die u verwachtte ontbreekt in de resultaten** — controleer `providerOverrides` op de pagina Chaosmodus (een uitgeschakelde overschrijving sluit dit uit) en of de providerverbinding actief is.
