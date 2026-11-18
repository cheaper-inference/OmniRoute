# Chaos Mode (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Վահանակ:** **Chaos Mode** (կողային վահանակ) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (վահանակի աշխատաշրջան) · `POST /api/skills/collect/chaos` (API բանալի)  
> **Սկզբնաղբյուր:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode-ը **մեկ առաջադրանք միաժամանակ ուղարկում է մի քանի մատակարարների**․ յուրաքանչյուր մասնակից մատակարար տրամադրում է մոդելի մեկ օրինակ, իսկ դուք բոլոր պատասխանները ստանում եք կողք կողքի (կամ շղթայված)։ Այն բազմամոդել կատարման միջավայր է, ոչ թե երթուղավորման ռազմավարություն․ ձեր սովորական `/v1/chat/completions` տրաֆիկը երբեք չի ենթարկվում դրա ազդեցությանը։

**Պարզաբանում․ «chaos» անվամբ տրամադրվում են երեք տարբեր բաղադրիչներ.**

| Բաղադրիչ                 | Ինչ է դա                                                                                                                                                                                             | Որտեղ է փաստաթղթավորված                      |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**           | Այստեղ նկարագրված վահանակի էջը + API-ն․ մեկ առաջադրանքը բաշխում է բազմաթիվ մատակարարների միջև (զուգահեռ կամ համագործակցային եղանակով)։                                                               | Այս ուղեցույցը                               |
| `auto/chaos`             | Auto-Combo մոդելի id․ զուգահեռ բաշխում՝ մեկ մոդել յուրաքանչյուր մատակարարից և մեկ վերին հոսքի կանչ՝ յուրաքանչյուրի համար։ Սա խափանումների ներարկում չէ ([մանրամասներ](#autochaos-parallel-fan-out))։ | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos combo-ի կազմաձևում | Պահպանվող combo-ն, որի `config.chaos.enabled`-ը նույն կերպ բաշխում է հարցումը (միայն API-ի միջոցով)․ `judgeModel`-ը միայն ընտրում է վերջնական պատասխանը՝ առանց համադրման կանչի։                      | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`․ զուգահեռ բաշխում

`auto/chaos`-ը **խափանումների ներարկման կամ դիմակայունության փորձարկման կարգավորիչ չէ**։ `/v1/chat/completions`-ում
`model: "auto/chaos"` հարցումը՝

1. Կազմում է **մեկ մոդել յուրաքանչյուր մատակարարից** բաղկացած խումբ․ յուրաքանչյուր
   միացված մատակարարի առաջին թեկնածուն՝ թեկնածուների խմբի հերթականությամբ, առավելագույնը՝ 5 անդամ
   (`OMNIROUTE_CHAOS_MAX_PANEL`, առավելագույն սահմանը՝ 10)
   (`open-sse/services/autoCombo/virtualFactory.ts`)։ `chaos-mode` կշիռների
   փաթեթը սահմանում է միայն յուրաքանչյուր անդամի `weight`-ը․ բաշխման գործընթացը չի կարդում այն։
2. Նույն հարցումն ուղարկում է խմբի յուրաքանչյուր անդամի **զուգահեռ**, ուստի մեկ հարցումն
   արժե վերին հոսքի մեկ կանչ՝ խմբի յուրաքանչյուր անդամի համար
   (`open-sse/services/autoCombo/chaosEngine.ts`, ուղարկվում է
   `open-sse/services/combo.ts`-ից)։
3. Խմբի յուրաքանչյուր անդամի արդյունքը ստանալուն պես հեռարձակում է մեկ կարգավիճակի տող․ լռելյայն՝ SSE մեկնաբանություն
   (`: chaos <index> ok|fail <model>`), ինչպես նաև `omni-chaos-part`
   իրադարձություն (`model`, `index`, `ok`, `error`), երբ հարցումը սահմանում է
   `stream_options.include_chaos_parts: true`։ Դրանք պատասխանի տեքստ չեն պարունակում։
4. Ուղարկում է խմբի **մեկ** պատասխանը՝ որպես OpenAI ոճի վերջնական հատված․ խմբի առաջին
   անդամինը (`auto/chaos`-ը այն սահմանում է որպես `judgeModel`), եթե այն հաջող է, հակառակ դեպքում՝
   վերջին հաջողված անդամինը։ Խմբի մյուս պատասխանները չեն վերադարձվում, ուստի
   դուք վճարում եք N կանչի համար և ստանում մեկ ամբողջական պատասխան։

## Կարգավորում

1. Բաց** Վահանակ → քաոսի ռեժիմ** (`/dashboard/chaos`):
2. Շրջեք այն** վրա** — Chaos Mode նավեր** լռելյայն անջատված է** (`enabled: false` in `src/lib/chaos/chaosConfig.ts`): Երբ հաշմանդամ է, `POST /api/chaos/run` պատասխանում է `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Ընտրեք մասնակիցներին և կանխադրվածներին (ըստ օրինակի պահպանվում է կարգավորումների խանութի միջոցով).

   | Դաշտ                | Իմաստը                                                                                      | Կանխադրված / սահմանաչափեր                                 |
   | ------------------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
   | `enabled`           | Հիմնական անջատիչ                                                                            | `false`                                                   |
   | `defaultMode`       | `parallel` կամ `collaborative` (տես ստորև)                                                  | `parallel`                                                |
   | `providerOverrides` | Մասնակցություն յուրաքանչյուր մատակարարի համար (`providerId`, կամընտիր `modelId`, `enabled`) | դատարկ = յուրաքանչյուր ակտիվ մատակարար, առավելագույնը 200 |
   | `systemPrompt`      | Չեղարկել ներկառուցված Chaos համակարգի հուշման համար                                         | ընտրովի, առավելագույնը 10 000 նիշ                         |
   | `timeoutMs`         | Յուրաքանչյուր մոդելի զանգի առավելագույն ժամանակը                                            | `120000` (5 000–600 000)                                  |
   | `maxTokens`         | `max_tokens` մեկ մոդելի զանգի համար                                                         | `4096` (256–128 000)                                      |

4. Տվեք յուրաքանչյուր մասնակից մատակարարին ա** մոդել** . Մատակարարի մոդելը «Քաոս ռեժիմ» էջի վրա իր միացված վերափոխման `modelId` է (այն հաղթում է), հակառակ դեպքում՝** լռելյայն մոդել** իր կապի մասին։ Մատակարարի ID-ն երբեք չի օգտագործվում որպես մոդելի անուն: Պրովայդերը, որը ոչ մեկը չունի** չի կանչվել** այն ցուցադրվում է արդյունքներում որպես `status: "error"` հաղորդագրությամբ _«Այս մատակարարի համար մոդել սահմանված չէ: Սահմանեք դրա մոդելը Chaos Mode էջում կամ լռելյայն մոդել կապի վրա»:_ և դատարկ `modelId`, մինչդեռ մյուս մատակարարները աշխատում են նորմալ: Եթե ընտրված ոչ մի մատակարար չունի մոդել, գործարկումը ձախողվում է մինչև վերին հոսքի հարցումը _«Ոչ մի մատակարար չունի մոդելային հավաքածու: …»_ (HTTP 500 երկու վերջնակետերում):
5. Գործարկել ա** փորձարկում հենց էջից** — արդյունքների վահանակը ցույց է տալիս յուրաքանչյուր մատակարարի պատասխանը, կարգավիճակը և տևողությունը:

## Կատարման ռեժիմներ

- **`parallel`** — յուրաքանչյուր մոդել միաժամանակ ստանում է նույն առաջադրանքը․ դուք բոլոր պատասխանները
  ստանում եք միմյանցից անկախ։
- **`collaborative`** — մոդելներն աշխատում են **շղթայով**․ դրանցից յուրաքանչյուրը տեսնում է նախորդ մոդելի արդյունքը և
  ստանում է այն կատարելագործելու, ընդլայնելու, քննադատելու կամ այլընտրանք առաջարկելու առաջադրանք։ Պատասխանի `summary` դաշտը
  միավորում է հաջող արդյունքները՝ շղթայի հերթականությամբ (`parallel` կատարումները `summary` չունեն)։

## API

### `POST /api/chaos/run` — վահանակի նիստ

Cookie-ի վավերացված (կառավարման նիստը — տե՛ս [MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md) ); օգտագործվում է վահանակի էջի կողմից:

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

### `POST /api/skills/collect/chaos` — API բանալի

Արտաքին զանգահարողների համար կրող նշանի տարբերակ: Բանալին պետք է կրի** Քաոսի ռեժիմի թույլտվություն** (`chaosModeEnabled`), որը** լռելյայն անջատված է** — միացրեք այն յուրաքանչյուր ստեղնի մեջ** Վահանակ → API Կառավարիչ → խմբագրել բանալին → թույլտվությունները → քաոսի ռեժիմ** . Նույն մարմինը, ինչպես վերևում:

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Երկու վերջնակետերը վերադարձնում են նույն ձևը.

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

## Անսարքությունների վերացում

- **`400 Chaos Mode is not enabled`** — քայլ 2 վերևում. գլոբալ անջատիչն անջատված է:
- **API ստեղնը մերժվում է `/api/skills/collect/chaos` ում** — բանալին չունի մեկ բանալին `chaosModeEnabled` թույլտվություն (կանխադրված անջատված է. սա կարգավորում է, ոչ թե սխալ):
- **Պրովայդերը ցույց է տալիս `No model set for this provider`** — իր մոդելը դրեց «Քաոս ռեժիմ» էջում կամ լռելյայն մոդելը իր կապի վրա (տես Կարգավորում, քայլ 4):
- **Արդյունքներից բացակայում է ձեր սպասած մատակարարը** — ստուգեք `providerOverrides` «Քաոս ռեժիմ» էջում (անջատված փոխարինումը բացառում է դա) և արդյոք մատակարարի կապն ակտիվ է:
