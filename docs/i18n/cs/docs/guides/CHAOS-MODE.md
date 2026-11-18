# Chaos Mode (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Dashboard:** **Režim chaosu** (postranní panel) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (relace dashboardu) · `POST /api/skills/collect/chaos` (klíč API)  
> **Zdroj:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Režim chaosu odesílá **jeden úkol několika poskytovatelům současně** — každý zúčastněný poskytovatel
přispívá jednou instancí modelu a všechny odpovědi získáte vedle sebe (nebo zřetězené). Jde o
rozhraní pro spouštění více modelů, nikoli o strategii směrování: váš běžný provoz
`/v1/chat/completions` tím není nikdy ovlivněn.

**Upřesnění — pod názvem „chaos“ jsou dodávány tři různé věci:**

| Položka                      | Co to je                                                                                                                                                                                   | Kde je dokumentována                         |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| **Režim chaosu**             | Zde popsaná stránka dashboardu + API: rozešle jeden úkol mnoha poskytovatelům (paralelně nebo ve spolupráci).                                                                              | Tato příručka                                |
| `auto/chaos`                 | ID modelu Auto-Combo: paralelní rozeslání, jeden model na poskytovatele, po jednom upstreamovém volání. Nejde o vkládání poruch ([podrobnosti](#autochaos-parallel-fan-out)).              | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Konfigurace kombinace chaosu | Trvale uložená kombinace s `config.chaos.enabled` rozesílá požadavek stejným způsobem (pouze přes API); `judgeModel` pouze vybírá konečnou odpověď, žádné volání pro syntézu se neprovádí. | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: paralelní rozeslání

`auto/chaos` **není** přepínač pro vkládání poruch ani testování odolnosti. Požadavek s
`model: "auto/chaos"` na `/v1/chat/completions`:

1. Sestaví panel s **jedním modelem od každého poskytovatele**: prvním kandidátem každého
   připojeného poskytovatele v pořadí fondu kandidátů, maximálně 5 členů
   (`OMNIROUTE_CHAOS_MAX_PANEL`, omezeno na 10)
   (`open-sse/services/autoCombo/virtualFactory.ts`). Sada vah `chaos-mode`
   pouze nastavuje `weight` každého člena; rozesílání tuto hodnotu nečte.
2. Odešle stejný požadavek všem členům panelu **paralelně**, takže jeden požadavek
   stojí jedno upstreamové volání na každého člena panelu
   (`open-sse/services/autoCombo/chaosEngine.ts`, odesláno z
   `open-sse/services/combo.ts`).
3. Při doručení jednotlivých výsledků streamuje jeden stavový řádek na člena panelu: ve výchozím nastavení komentář SSE
   (`: chaos <index> ok|fail <model>`) a navíc událost `omni-chaos-part`
   (`model`, `index`, `ok`, `error`), pokud požadavek nastaví
   `stream_options.include_chaos_parts: true`. Tyto zprávy neobsahují text odpovědi.
4. Odešle **jednu** odpověď panelu jako konečný blok ve stylu OpenAI: odpověď prvního člena
   panelu (`auto/chaos` jej nastaví jako `judgeModel`), pokud uspěje, jinak
   odpověď posledního úspěšného člena. Ostatní odpovědi panelu se nevracejí, takže
   zaplatíte za N volání a obdržíte jedno dokončení.

## Nastavení

1. OTEVŘENO** Dashboard → Chaos Mode** (`/dashboard/chaos`).
2. Otočte to** na** — lodě v režimu chaosu** ve výchozím nastavení zakázáno** (`enabled: false` v `src/lib/chaos/chaosConfig.ts`). Když je `POST /api/chaos/run` zakázáno, odpovídá `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Vyberte účastníky a výchozí hodnoty (přetrvávají pro každou instanci prostřednictvím úložiště nastavení):

   | Pole                | Význam                                                                          | Výchozí / limity                               |
   | ------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------- |
   | `enabled`           | Hlavní vypínač                                                                  | `false`                                        |
   | `defaultMode`       | `parallel` nebo `collaborative` (viz níže)                                      | `parallel`                                     |
   | `providerOverrides` | Účast jednotlivých poskytovatelů (`providerId`, volitelné `modelId`, `enabled`) | prázdný = každý aktivní poskytovatel, max. 200 |
   | `systemPrompt`      | Přepsání výzvy vestavěného systému Chaos                                        | volitelné, max. 10 000 znaků                   |
   | `timeoutMs`         | Maximální doba na volání modelu                                                 | `120000` (5 000–600 000)                       |
   | `maxTokens`         | `max_tokens` za volání modelu                                                   | `4096` (256–128 000)                           |

4. Dejte každému zúčastněnému poskytovateli a** model** . Model poskytovatele je `modelId` jeho povoleného přepsání na stránce Chaos Mode (vyhrává), jinak** výchozí model** jeho spojení. ID poskytovatele se nikdy nepoužívá jako název modelu. Poskytovatel s ani jedním není** nevolal** : ve výsledcích se zobrazí jako `status: "error"` se zprávou _"Pro tohoto poskytovatele není nastaven žádný model. Nastavte pro něj model na stránce Režim chaosu nebo výchozí model na připojení."_ a prázdné `modelId`, zatímco ostatní poskytovatelé běží normálně. Pokud žádný vybraný poskytovatel nemá model, běh se nezdaří před jakýmkoli upstream požadavkem s _"Žádný poskytovatel nemá nastaven model. …"_ (HTTP 500 na obou koncových bodech).
5. Spustit a** test ze samotné stránky** — panel výsledků zobrazuje odpověď každého poskytovatele, stav a dobu trvání.

## Režimy spuštění

- **`parallel`** — každý model obdrží tentýž úkol současně; všechny odpovědi dostanete
  nezávisle.
- **`collaborative`** — modely běží **v řetězci**: každý z nich vidí výstup předchozího modelu a
  je požádán, aby jej vylepšil, rozšířil, kriticky zhodnotil nebo nabídl alternativu. Pole `summary`
  v odpovědi zřetězí úspěšné výstupy v pořadí řetězce (paralelní spuštění pole `summary` nemají).

## API

### relace řídicího panelu `POST /api/chaos/run` —

Ověřeno souborem cookie (relace správy — viz [MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md) ); používá stránka řídicího panelu.

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

### klíč `POST /api/skills/collect/chaos` — API

Varianta nosiče-tokenu pro externí volající. Klíč musí nést** Povolení režimu Chaos** (`chaosModeEnabled`), což je** ve výchozím nastavení vypnuto** — to povolte na klíč** Dashboard → API Manager → upravit klíč → oprávnění → Chaos Mode** . Stejné tělo jako výše.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Oba koncové body vrátí stejný tvar:

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

## Odstraňování problémů

- **`400 Chaos Mode is not enabled`** — krok 2 výše: globální přepínač je vypnutý.
- **Klíč API je na `/api/skills/collect/chaos` odmítnut** — klíč postrádá oprávnění `chaosModeEnabled` pro každý klíč (ve výchozím nastavení vypnuto; jedná se o nastavení, nikoli o chybu).
- **Poskytovatel ukazuje `No model set for this provider`** — nastaví svůj model na stránce Chaos Mode nebo výchozí model na svém připojení (viz Nastavení, krok 4).
- **Ve výsledcích chybí poskytovatel, kterého jste očekávali** — zkontrolujte `providerOverrides` na stránce Chaos Mode (zakázané přepsání to vylučuje) a zda je připojení poskytovatele aktivní.
