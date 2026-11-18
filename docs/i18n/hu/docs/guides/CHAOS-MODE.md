# Chaos Mode (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Irányítópult:** **Chaos Mode** (oldalsáv) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (irányítópult-munkamenet) · `POST /api/skills/collect/chaos` (API-kulcs)  
> **Forrás:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

A Chaos Mode **egyszerre több szolgáltatónak küld el egy feladatot** — minden részt vevő szolgáltató
egy modellpéldánnyal járul hozzá, Ön pedig az összes választ egymás mellett (vagy láncolva) kapja meg. Ez egy
többmodelles végrehajtási felület, nem pedig útválasztási stratégia: a normál `/v1/chat/completions`
forgalmat soha nem érinti.

**Egyértelműsítés — három különböző dolog nevében szerepel a „chaos” kifejezés:**

| Dolog                           | Mi ez                                                                                                                                                                                                   | Dokumentáció helye                           |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**                  | Az itt ismertetett irányítópult-oldal és API: egy feladat továbbítása több szolgáltatóhoz (párhuzamosan vagy együttműködő módon).                                                                       | Ez az útmutató                               |
| `auto/chaos`                    | Auto-Combo-modellazonosító: párhuzamos továbbítás, szolgáltatónként egy modell, modellenként egy upstream-hívás. Nem hibainjektálás ([részletek](#autochaos-parallel-fan-out)).                         | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos-kombináció konfigurációja | Egy tartósan tárolt kombináció, amelynél a `config.chaos.enabled` ugyanilyen módon továbbítja a kérést (csak API-n keresztül); a `judgeModel` csak a végső választ választja ki, szintézishívás nélkül. | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: párhuzamos továbbítás

Az `auto/chaos` **nem** hibainjektálási vagy rezilienciatesztelési beállítás. Ha a
`/v1/chat/completions` végponton a `model: "auto/chaos"` értéket kéri:

1. Létrehoz egy panelt, amelyben **szolgáltatónként egy modell** található: minden
   csatlakoztatott szolgáltató első jelöltje, a jelöltkészlet sorrendjében, legfeljebb 5 taggal
   (`OMNIROUTE_CHAOS_MAX_PANEL`, maximum 10)
   (`open-sse/services/autoCombo/virtualFactory.ts`). A `chaos-mode` súlycsomag
   csak az egyes tagok `weight` értékét állítja be; a továbbítás ezt nem olvassa ki.
2. Ugyanazt a kérést **párhuzamosan** elküldi minden paneltagnak, így egy kérés
   paneltagonként egy upstream-hívásba kerül
   (`open-sse/services/autoCombo/chaosEngine.ts`, indítása:
   `open-sse/services/combo.ts`).
3. Érkezéskor paneltagonként egy állapotsort streamel: alapértelmezés szerint egy SSE-megjegyzést
   (`: chaos <index> ok|fail <model>`), továbbá egy `omni-chaos-part`
   eseményt (`model`, `index`, `ok`, `error`), ha a kérésben
   `stream_options.include_chaos_parts: true` szerepel. Ezek nem tartalmaznak válaszszöveget.
4. **Egy** panelválaszt küld végső, OpenAI-stílusú adatdarabként: az első paneltag
   válaszát (az `auto/chaos` ezt állítja be `judgeModel` értékként), ha az sikeres, egyébként
   az utolsó sikeres tagét. A többi panelválaszt nem adja vissza, így
   N hívásért fizet, és egyetlen befejezést kap.

## Beállítás

1. Nyitott** Irányítópult → Chaos Mode** (`/dashboard/chaos`).
2. Fordítsa meg** -on** — Chaos Mode hajók** alapértelmezés szerint le van tiltva** (`enabled: false` a `src/lib/chaos/chaosConfig.ts`). Ha le van tiltva, `POST /api/chaos/run` `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."` választ ad.
3. Válassza ki a résztvevőket és az alapértelmezett értékeket (példányonként megmarad a beállítások tárolójában):

   | Mező                | Jelentése                                                                   | Alapértelmezett / határértékek           |
   | ------------------- | --------------------------------------------------------------------------- | ---------------------------------------- |
   | `enabled`           | Főkapcsoló                                                                  | `false`                                  |
   | `defaultMode`       | `parallel` vagy `collaborative` (lásd lent)                                 | `parallel`                               |
   | `providerOverrides` | Szolgáltatónkénti részvétel (`providerId`, opcionális `modelId`, `enabled`) | üres = minden aktív szolgáltató, max 200 |
   | `systemPrompt`      | A beépített Chaos rendszerprompt felülbírálása                              | opcionális, maximum 10 000 karakter      |
   | `timeoutMs`         | Maximális idő modellhívásonként                                             | `120000` (5 000–600 000)                 |
   | `maxTokens`         | `max_tokens` modellhívásonként                                              | `4096` (256–128 000)                     |

4. Adja meg minden résztvevő szolgáltatónak a** modell** . A szolgáltató modellje a Káosz mód oldalon engedélyezett felülírásának `modelId` (nyer), ellenkező esetben a** alapértelmezett modell** kapcsolatáról. A szolgáltatói azonosító soha nem használható modellnévként. Egyik szolgáltató sem** nem hívták** : a találatok között `status: "error"` ként jelenik meg a következő üzenettel: _"Nincs modell beállítva ehhez a szolgáltatóhoz. Állítson be neki egy modellt a Chaos Mode oldalon, vagy egy alapértelmezett modellt a kapcsolaton."_ és egy üres `modelId`, miközben a többi szolgáltató normálisan fut. Ha egyetlen kiválasztott szolgáltató sem rendelkezik modellel, a futtatás meghiúsul minden felfelé irányuló kérés előtt a _"Nincs szolgáltatónak nincs beállítva modellje..."_ (HTTP 500 mindkét végponton).
5. Fuss a** teszt magáról az oldalról** — az eredmények panelen az egyes szolgáltatók válaszai, állapota és időtartama látható.

## Végrehajtási módok

- **`parallel`** — minden modell egyszerre kapja meg ugyanazt a feladatot; az összes választ
  egymástól függetlenül kapja meg.
- **`collaborative`** — a modellek **láncban** futnak: mindegyik látja az előző modell kimenetét, és
  annak finomítására, kibővítésére, kritikájára vagy alternatíva felajánlására kap utasítást. A válasz `summary` mezője
  a sikeres kimeneteket a lánc sorrendjében összefűzi (a párhuzamos futások nem rendelkeznek `summary` mezővel).

## API

### `POST /api/chaos/run` — műszerfali munkamenet

Cookie-hitelesített (a kezelési munkamenet — lásd [MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md) ); az irányítópult oldala használja.

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

### `POST /api/skills/collect/chaos` — API kulcs

Bearer-token változat külső hívók számára. A kulcsnak hordoznia kell a** Chaos Mode engedély** (`chaosModeEnabled`), ami az** alapértelmezés szerint kikapcsolva** — engedélyezze kulcsonként** Irányítópult → API Manager → szerkesztési kulcs → engedélyek → káosz mód** . Ugyanaz a test, mint fent.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Mindkét végpont ugyanazt az alakot adja vissza:

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

## Hibaelhárítás

- **`400 Chaos Mode is not enabled`** — fenti 2. lépés: a globális kapcsoló ki van kapcsolva.
- **API kulcsot elutasítja a `/api/skills/collect/chaos`** — a kulcsból hiányzik a kulcsonkénti `chaosModeEnabled` engedély (alapértelmezés szerint ki van kapcsolva; ez beállítás, nem hiba).
- **Egy szolgáltató `No model set for this provider` mutatja** — beállította a modelljét a Chaos Mode oldalon, vagy egy alapértelmezett modellt a kapcsolatán (lásd: Beállítás, 4. lépés).
- **A várt szolgáltató hiányzik az eredményekből** — ellenőrizze `providerOverrides` a Chaos Mode oldalon (a letiltott felülírás kizárja), és hogy a szolgáltatói kapcsolat aktív-e.
