# Chaos Mode (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Контролна табла:** **Режим хаоса** (бочна трака) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (сесија контролне табле) · `POST /api/skills/collect/chaos` (API кључ)  
> **Извор:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Режим хаоса шаље **један задатак већем броју добављача одједном** — сваки добављач који учествује
доприноси једном инстанцом модела, а ви добијате све одговоре један поред другог (или уланчане). То је
површина за извршавање на више модела, а не стратегија усмеравања: то никада не утиче на ваш уобичајени
саобраћај ка `/v1/chat/completions`.

**Појашњење — испоручују се три различите ствари које у називу имају „chaos“:**

| Ствар                           | Шта представља                                                                                                                                                             | Где је документовано                         |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Режим хаоса**                 | Овде описана страница контролне табле + API: расподела једног задатка на више добављача (паралелно или сараднички).                                                        | Овај водич                                   |
| `auto/chaos`                    | ID модела Auto-Combo: паралелна расподела, један модел по добављачу, по један узводни позив. Није убризгавање грешака ([детаљи](#autochaos-паралелна-расподела)).          | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Конфигурација chaos комбинације | Трајно сачувана комбинација са `config.chaos.enabled` расподељује захтев на исти начин (само преко API-ја); `judgeModel` само бира коначни одговор, без позива за синтезу. | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: паралелна расподела

`auto/chaos` **није** опција за убризгавање грешака или тестирање отпорности. Захтев за
`model: "auto/chaos"` на `/v1/chat/completions`:

1. Формира панел са **једним моделом по добављачу**: првим кандидатом сваког
   повезаног добављача, према редоследу у скупу кандидата, са највише 5 чланова
   (`OMNIROUTE_CHAOS_MAX_PANEL`, ограничено на 10)
   (`open-sse/services/autoCombo/virtualFactory.ts`). Пакет тежина `chaos-mode`
   само поставља `weight` сваког члана; расподела га не чита.
2. Шаље исти захтев сваком члану панела **паралелно**, тако да један захтев
   кошта један узводни позив по члану панела
   (`open-sse/services/autoCombo/chaosEngine.ts`, прослеђено из
   `open-sse/services/combo.ts`).
3. Емитује по један статусни ред за сваког члана панела када стигне: подразумевано као SSE коментар
   (`: chaos <index> ok|fail <model>`), уз догађај `omni-chaos-part`
   (`model`, `index`, `ok`, `error`) када је у захтеву постављено
   `stream_options.include_chaos_parts: true`. Они не садрже текст одговора.
4. Шаље **један** одговор панела као коначни део у OpenAI стилу: одговор првог
   члана панела (`auto/chaos` га поставља као `judgeModel`) када успе, а у супротном
   одговор последњег успешног члана. Остали одговори панела се не враћају, тако да
   плаћате N позива, а добијате један довршени одговор.

## Сетуп

1. Отвори** Контролна табла → Цхаос Моде** (`/dashboard/chaos`).
2. Окрени га** на** — Хаос Моде бродови** подразумевано онемогућено** (`enabled: false` у `src/lib/chaos/chaosConfig.ts`). Док је онемогућен, `POST /api/chaos/run` одговара `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Изаберите учеснике и подразумеване вредности (трајне по инстанци преко продавнице подешавања):

   | Поље                | Значење                                                           | Подразумевано / ограничења                |
   | ------------------- | ----------------------------------------------------------------- | ----------------------------------------- |
   | `enabled`           | Главни прекидач                                                   | `false`                                   |
   | `defaultMode`       | `parallel` или `collaborative` (види доле)                        | `parallel`                                |
   | `providerOverrides` | Учешће по провајдеру (`providerId`, опционо `modelId`, `enabled`) | празан = сваки активни провајдер, мак 200 |
   | `systemPrompt`      | Замени за уграђени системски промпт Цхаос                         | опционо, максимално 10 000 знакова        |
   | `timeoutMs`         | Максимално време по позиву модела                                 | `120000` (5 000–600 000)                  |
   | `maxTokens`         | `max_tokens` по позиву модела                                     | `4096` (256–128 000)                      |

4. Дајте сваком провајдеру који учествује а** модел** . Модел провајдера је `modelId` његовог омогућеног надјачавања на страници Хаос Моде (он побеђује), у супротном** подразумевани модел** његове повезаности. ИД добављача се никада не користи као назив модела. Провајдер који нема ни једно ни друго** није позван** : појављује се у резултатима као `status: "error"` са поруком _"Није постављен модел за овог провајдера. Поставите модел за њега на страници Хаос режима или подразумевани модел на вези."_ и празан `modelId`, док остали провајдери раде нормално. Ако ниједан изабрани добављач нема модел, покретање не успе пре било каквог упстреам захтева са _"Ниједан добављач нема скуп модела. ..."_ (HTTP 500 на обе крајње тачке).
5. Покрени а** тест са саме странице** — панел резултата приказује одговор сваког провајдера, статус и трајање.

## Режими извршавања

- **`parallel`** — сваки модел истовремено добија исти задатак; добијате све одговоре
  независно.
- **`collaborative`** — модели се извршавају **у ланцу**: сваки види излаз претходног модела и
  од њега се тражи да га побољша, прошири, критикује или понуди алтернативу. Поље `summary` у одговору
  спаја успешне излазе редоследом у ланцу (паралелна извршавања немају `summary`).

## API

### `POST /api/chaos/run` — сесија контролне табле

Цоокие-аутхентицатед (сесија управљања — види [MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md) ); користи страница контролне табле.

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

### `POST /api/skills/collect/chaos` — API кључ

Варијанта носиоца токена за екстерне позиваоце. Кључ мора да носи** Дозвола за режим хаоса** (`chaosModeEnabled`), што је** подразумевано искључено** — омогући га по кључу** Контролна табла → API Манагер → едит кеи → дозволе → Цхаос Моде** . Исто тело као горе.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Обе крајње тачке враћају исти облик:

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

## Решавање проблема

- **`400 Chaos Mode is not enabled`** — корак 2 изнад: глобални прекидач је искључен.
- **API кључ се одбија на `/api/skills/collect/chaos`** — кључу недостаје `chaosModeEnabled` дозвола по кључу (подразумевано искључено; ово је поставка, а не грешка).
- **Провајдер показује `No model set for this provider`** — је поставио свој модел на страници Цхаос Моде или подразумевани модел на својој вези (погледајте Подешавање, корак 4).
- **Провајдер који сте очекивали недостаје у резултатима** — проверите `providerOverrides` на страници Хаос режима (онемогућено замена га искључује) и да ли је веза са провајдером активна.
