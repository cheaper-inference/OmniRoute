# Chaos Mode (ಕನ್ನಡ)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **ಡ್ಯಾಶ್ಬೋರ್ಡ್:** **Chaos Mode** (ಪಾರ್ಶ್ವಪಟ್ಟಿ) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಸೆಷನ್) · `POST /api/skills/collect/chaos` (API ಕೀಲಿ)  
> **ಮೂಲ:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode **ಒಂದು ಕಾರ್ಯವನ್ನು ಏಕಕಾಲದಲ್ಲಿ ಹಲವಾರು ಪೂರೈಕೆದಾರರಿಗೆ ಕಳುಹಿಸುತ್ತದೆ** — ಭಾಗವಹಿಸುವ ಪ್ರತಿಯೊಂದು ಪೂರೈಕೆದಾರರು
ಒಂದು ಮಾದರಿ ನಿದರ್ಶನವನ್ನು ಒದಗಿಸುತ್ತಾರೆ ಮತ್ತು ನೀವು ಎಲ್ಲ ಉತ್ತರಗಳನ್ನು ಅಕ್ಕಪಕ್ಕದಲ್ಲಿ (ಅಥವಾ ಸರಪಳಿಯಾಗಿ) ಪಡೆಯುತ್ತೀರಿ. ಇದು
ಬಹು-ಮಾದರಿ ಕಾರ್ಯಗತಗೊಳಿಸುವಿಕೆ ಮೇಲ್ಮೈಯೇ ಹೊರತು ರೂಟಿಂಗ್ ತಂತ್ರವಲ್ಲ: ನಿಮ್ಮ ಸಾಮಾನ್ಯ `/v1/chat/completions`
ಟ್ರಾಫಿಕ್ ಮೇಲೆ ಇದು ಎಂದಿಗೂ ಪರಿಣಾಮ ಬೀರುವುದಿಲ್ಲ.

**ಅಸಂದಿಗ್ಧೀಕರಣ — "chaos" ಎಂಬ ಹೆಸರಿನೊಂದಿಗೆ ಮೂರು ವಿಭಿನ್ನ ವಿಷಯಗಳನ್ನು ಒದಗಿಸಲಾಗಿದೆ:**

| ವಿಷಯ                 | ಅದು ಏನು                                                                                                                                                                            | ಎಲ್ಲಿ ದಾಖಲಿಸಲಾಗಿದೆ                           |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**       | ಇಲ್ಲಿ ವಿವರಿಸಲಾದ ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಪುಟ + API: ಒಂದು ಕಾರ್ಯವನ್ನು ಅನೇಕ ಪೂರೈಕೆದಾರರಿಗೆ ವಿಸ್ತರಿಸಿ ಕಳುಹಿಸುತ್ತದೆ (ಸಮಾನಾಂತರವಾಗಿ ಅಥವಾ ಸಹಯೋಗಾತ್ಮಕವಾಗಿ).                                              | ಈ ಮಾರ್ಗದರ್ಶಿ                                 |
| `auto/chaos`         | Auto-Combo ಮಾದರಿ id: ಸಮಾನಾಂತರ ವಿಸ್ತರಣೆ, ಪ್ರತಿ ಪೂರೈಕೆದಾರರಿಗೆ ಒಂದು ಮಾದರಿ, ಪ್ರತಿಯೊಂದಕ್ಕೂ ಒಂದು ಅಪ್ಸ್ಟ್ರೀಮ್ ಕರೆ. ದೋಷ ಅಳವಡಿಕೆ ಅಲ್ಲ ([ವಿವರಗಳು](#autochaos-parallel-fan-out)).             | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos ಕಾಂಬೊ ಕಾನ್ಫಿಗ್ | `config.chaos.enabled` ಹೊಂದಿರುವ ಸ್ಥಿರವಾಗಿ ಉಳಿಸಲಾದ ಕಾಂಬೊ ಅದೇ ರೀತಿಯಲ್ಲಿ ವಿಸ್ತರಿಸುತ್ತದೆ (API-ಮಾತ್ರ); `judgeModel` ಅಂತಿಮ ಉತ್ತರವನ್ನು ಮಾತ್ರ ಆರಿಸುತ್ತದೆ, ಯಾವುದೇ ಸಂಶ್ಲೇಷಣಾ ಕರೆ ಇರುವುದಿಲ್ಲ. | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: ಸಮಾನಾಂತರ ವಿಸ್ತರಣೆ

`auto/chaos` ದೋಷ ಅಳವಡಿಕೆ ಅಥವಾ ಸ್ಥಿತಿಸ್ಥಾಪಕತ್ವ ಪರೀಕ್ಷೆಯ ನಿಯಂತ್ರಕ **ಅಲ್ಲ**.
`/v1/chat/completions` ನಲ್ಲಿ `model: "auto/chaos"` ಅನ್ನು ವಿನಂತಿಸುವುದರಿಂದ:

1. **ಪ್ರತಿ ಪೂರೈಕೆದಾರರಿಗೆ ಒಂದು ಮಾದರಿಯಂತೆ** ಪ್ಯಾನೆಲ್ ಅನ್ನು ನಿರ್ಮಿಸಲಾಗುತ್ತದೆ: ಸಂಪರ್ಕಗೊಂಡಿರುವ ಪ್ರತಿಯೊಂದು
   ಪೂರೈಕೆದಾರರ ಮೊದಲ ಅಭ್ಯರ್ಥಿಯನ್ನು ಅಭ್ಯರ್ಥಿ-ಪೂಲ್ ಕ್ರಮದಲ್ಲಿ, ಗರಿಷ್ಠ 5 ಸದಸ್ಯರವರೆಗೆ
   (`OMNIROUTE_CHAOS_MAX_PANEL`, ಗರಿಷ್ಠ ಮಿತಿ 10)
   (`open-sse/services/autoCombo/virtualFactory.ts`). `chaos-mode` ತೂಕದ
   ಪ್ಯಾಕ್ ಪ್ರತಿಯೊಬ್ಬ ಸದಸ್ಯರ `weight` ಅನ್ನು ಮಾತ್ರ ಹೊಂದಿಸುತ್ತದೆ; ವಿಸ್ತರಣೆಯು ಅದನ್ನು ಓದುವುದಿಲ್ಲ.
2. ಅದೇ ವಿನಂತಿಯನ್ನು ಪ್ರತಿಯೊಂದು ಪ್ಯಾನೆಲ್ ಸದಸ್ಯರಿಗೆ **ಸಮಾನಾಂತರವಾಗಿ** ಕಳುಹಿಸಲಾಗುತ್ತದೆ, ಆದ್ದರಿಂದ ಒಂದು ವಿನಂತಿಗೆ
   ಪ್ರತಿ ಪ್ಯಾನೆಲ್ ಸದಸ್ಯರಂತೆ ಒಂದು ಅಪ್ಸ್ಟ್ರೀಮ್ ಕರೆ ವೆಚ್ಚವಾಗುತ್ತದೆ
   (`open-sse/services/autoCombo/chaosEngine.ts`, ಇದರಿಂದ ರವಾನಿಸಲಾಗುತ್ತದೆ:
   `open-sse/services/combo.ts`).
3. ಪ್ರತಿಯೊಂದು ಪ್ಯಾನೆಲ್ ಸದಸ್ಯರ ಫಲಿತಾಂಶ ಬಂದಂತೆ ಅದರ ಸ್ಥಿತಿಯ ಒಂದು ಸಾಲನ್ನು ಸ್ಟ್ರೀಮ್ ಮಾಡಲಾಗುತ್ತದೆ: ಡೀಫಾಲ್ಟ್ ಆಗಿ SSE ಕಾಮೆಂಟ್
   (`: chaos <index> ok|fail <model>`), ಜೊತೆಗೆ ವಿನಂತಿಯು
   `stream_options.include_chaos_parts: true` ಅನ್ನು ಹೊಂದಿಸಿದಾಗ `omni-chaos-part`
   ಈವೆಂಟ್ (`model`, `index`, `ok`, `error`) ಕಳುಹಿಸಲಾಗುತ್ತದೆ. ಇವು ಯಾವುದೇ ಉತ್ತರ ಪಠ್ಯವನ್ನು ಹೊಂದಿರುವುದಿಲ್ಲ.
4. ಅಂತಿಮ OpenAI-ಶೈಲಿಯ ಚಂಕ್ ಆಗಿ **ಒಂದು** ಪ್ಯಾನೆಲ್ ಉತ್ತರವನ್ನು ಕಳುಹಿಸಲಾಗುತ್ತದೆ: ಮೊದಲ ಪ್ಯಾನೆಲ್
   ಸದಸ್ಯರ ಉತ್ತರ (`auto/chaos` ಅದನ್ನು `judgeModel` ಆಗಿ ಹೊಂದಿಸುತ್ತದೆ) ಯಶಸ್ವಿಯಾದರೆ ಅದನ್ನು, ಇಲ್ಲದಿದ್ದರೆ
   ಕೊನೆಯ ಯಶಸ್ವಿ ಸದಸ್ಯರ ಉತ್ತರವನ್ನು ಕಳುಹಿಸಲಾಗುತ್ತದೆ. ಇತರ ಪ್ಯಾನೆಲ್ ಉತ್ತರಗಳನ್ನು ಹಿಂತಿರುಗಿಸಲಾಗುವುದಿಲ್ಲ, ಆದ್ದರಿಂದ
   ನೀವು N ಕರೆಗಳಿಗೆ ಪಾವತಿಸಿ ಒಂದು ಪೂರ್ಣಗೊಳಿಸುವಿಕೆಯನ್ನು ಪಡೆಯುತ್ತೀರಿ.

## ಸೆಟಪ್

1. ತೆರೆಯಿರಿ** ಡ್ಯಾಶ್ಬೋರ್ಡ್ → ಚೋಸ್ ಮೋಡ್** (`/dashboard/chaos`)
2. ಅದನ್ನು ತಿರುಗಿಸಿ** ಮೇಲೆ** — ಚೋಸ್ ಮೋಡ್ ಹಡಗುಗಳು** ಪೂರ್ವನಿಯೋಜಿತವಾಗಿ ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ** (`enabled: false` ನಲ್ಲಿ `src/lib/chaos/chaosConfig.ts`). ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಿದಾಗ, `POST /api/chaos/run` ಉತ್ತರಿಸುತ್ತದೆ `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. ಭಾಗವಹಿಸುವವರು ಮತ್ತು ಡೀಫಾಲ್ಟ್ಗಳನ್ನು ಆರಿಸಿ (ಸೆಟ್ಟಿಂಗ್ಗಳ ಅಂಗಡಿಯ ಮೂಲಕ ಪ್ರತಿ ನಿದರ್ಶನಕ್ಕೆ ಮುಂದುವರಿಯುತ್ತದೆ):

   | ಕ್ಷೇತ್ರ             | ಅರ್ಥ                                                                     | ಡೀಫಾಲ್ಟ್ / ಮಿತಿಗಳು                        |
   | ------------------- | ------------------------------------------------------------------------ | ----------------------------------------- |
   | `enabled`           | ಮಾಸ್ಟರ್ ಸ್ವಿಚ್                                                           | `false`                                   |
   | `defaultMode`       | `parallel` ಅಥವಾ `collaborative` (ಕೆಳಗೆ ನೋಡಿ)                             | `parallel`                                |
   | `providerOverrides` | ಪ್ರತಿ-ಒದಗಿಸುವವರ ಭಾಗವಹಿಸುವಿಕೆ (`providerId`, ಐಚ್ಛಿಕ `modelId`, `enabled`) | ಖಾಲಿ = ಪ್ರತಿ ಸಕ್ರಿಯ ಪೂರೈಕೆದಾರ, ಗರಿಷ್ಠ 200 |
   | `systemPrompt`      | ಅಂತರ್ನಿರ್ಮಿತ ಚೋಸ್ ಸಿಸ್ಟಮ್ ಪ್ರಾಂಪ್ಟ್ಗಾಗಿ ಅತಿಕ್ರಮಿಸಿ                       | ಐಚ್ಛಿಕ, ಗರಿಷ್ಠ 10 000 ಅಕ್ಷರಗಳು            |
   | `timeoutMs`         | ಪ್ರತಿ ಮಾದರಿ ಕರೆಗೆ ಗರಿಷ್ಠ ಸಮಯ                                             | `120000` (5 000–600 000)                  |
   | `maxTokens`         | ಪ್ರತಿ ಮಾದರಿ ಕರೆಗೆ`max_tokens`                                            | `4096` (256–128 000)                      |

4. ಪ್ರತಿ ಭಾಗವಹಿಸುವ ಪೂರೈಕೆದಾರರಿಗೆ ನೀಡಿ a** ಮಾದರಿ** . ಒದಗಿಸುವವರ ಮಾದರಿಯು ಚೋಸ್ ಮೋಡ್ ಪುಟದಲ್ಲಿ ಅದರ ಸಕ್ರಿಯಗೊಳಿಸಿದ ಅತಿಕ್ರಮಣದ `modelId` ಆಗಿದೆ (ಇದು ಗೆಲ್ಲುತ್ತದೆ), ಇಲ್ಲದಿದ್ದರೆ** ಡೀಫಾಲ್ಟ್ ಮಾದರಿ** ಅದರ ಸಂಪರ್ಕದ. ಒದಗಿಸುವವರ ಐಡಿಯನ್ನು ಎಂದಿಗೂ ಮಾದರಿ ಹೆಸರಾಗಿ ಬಳಸಲಾಗುವುದಿಲ್ಲ. ಎರಡನ್ನೂ ಹೊಂದಿರದ ಒದಗಿಸುವವರು** ಕರೆಯಲಿಲ್ಲ** : ಇದು _"ಈ ಪೂರೈಕೆದಾರರಿಗೆ ಯಾವುದೇ ಮಾದರಿಯನ್ನು ಹೊಂದಿಸಲಾಗಿಲ್ಲ. ಚೋಸ್ ಮೋಡ್ ಪುಟದಲ್ಲಿ ಅಥವಾ ಸಂಪರ್ಕದಲ್ಲಿ ಡೀಫಾಲ್ಟ್ ಮಾದರಿಯಲ್ಲಿ ಒಂದು ಮಾದರಿಯನ್ನು ಹೊಂದಿಸಿ."_ ಮತ್ತು ಖಾಲಿ `modelId` ಎಂಬ ಸಂದೇಶದೊಂದಿಗೆ `status: "error"` ನಂತೆ ಇದು ಫಲಿತಾಂಶಗಳಲ್ಲಿ ತೋರಿಸುತ್ತದೆ, ಆದರೆ ಇತರ ಪೂರೈಕೆದಾರರು ಸಾಮಾನ್ಯವಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಾರೆ. ಯಾವುದೇ ಆಯ್ದ ಪೂರೈಕೆದಾರರು ಮಾದರಿಯನ್ನು ಹೊಂದಿಲ್ಲದಿದ್ದರೆ, _"ಯಾವುದೇ ಪೂರೈಕೆದಾರರು ಮಾದರಿಯನ್ನು ಹೊಂದಿಸಿಲ್ಲ. ..."_ (ಎರಡೂ ಅಂತಿಮ ಬಿಂದುಗಳಲ್ಲಿHTTP 500) ನೊಂದಿಗೆ ಯಾವುದೇ ಅಪ್ಸ್ಟ್ರೀಮ್ ವಿನಂತಿಯ ಮೊದಲು ರನ್ ವಿಫಲಗೊಳ್ಳುತ್ತದೆ.
5. ಎ ರನ್ ಮಾಡಿ** ಪುಟದಿಂದಲೇ ಪರೀಕ್ಷೆ** — ಫಲಿತಾಂಶಗಳ ಫಲಕವು ಪ್ರತಿ ಪೂರೈಕೆದಾರರ ಉತ್ತರ, ಸ್ಥಿತಿ ಮತ್ತು ಅವಧಿಯನ್ನು ತೋರಿಸುತ್ತದೆ.

## ಕಾರ್ಯಗತಗೊಳಿಸುವಿಕೆ ಮೋಡ್ಗಳು

- **`parallel`** — ಪ್ರತಿಯೊಂದು ಮಾದರಿಯೂ ಒಂದೇ ಕಾರ್ಯವನ್ನು ಏಕಕಾಲದಲ್ಲಿ ಪಡೆಯುತ್ತದೆ; ನೀವು ಎಲ್ಲಾ ಉತ್ತರಗಳನ್ನು
  ಸ್ವತಂತ್ರವಾಗಿ ಪಡೆಯುತ್ತೀರಿ.
- **`collaborative`** — ಮಾದರಿಗಳು **ಸರಪಳಿಯಲ್ಲಿ** ಚಲಿಸುತ್ತವೆ: ಪ್ರತಿಯೊಂದು ಮಾದರಿಯೂ ಹಿಂದಿನ ಮಾದರಿಯ ಔಟ್ಪುಟ್ ಅನ್ನು ನೋಡಿ,
  ಅದನ್ನು ಪರಿಷ್ಕರಿಸಲು, ವಿಸ್ತರಿಸಲು, ವಿಮರ್ಶಿಸಲು ಅಥವಾ ಪರ್ಯಾಯವನ್ನು ನೀಡಲು ಸೂಚನೆ ಪಡೆಯುತ್ತದೆ. ಪ್ರತಿಕ್ರಿಯೆಯ `summary` ಕ್ಷೇತ್ರವು
  ಯಶಸ್ವಿ ಔಟ್ಪುಟ್ಗಳನ್ನು ಸರಪಳಿಯ ಕ್ರಮದಲ್ಲಿ ಜೋಡಿಸುತ್ತದೆ (`parallel` ಚಾಲನೆಗಳು `summary` ಹೊಂದಿರುವುದಿಲ್ಲ).

## API

### `POST /api/chaos/run` — ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಸೆಷನ್

ಕುಕಿ-ದೃಢೀಕರಿಸಲಾಗಿದೆ (ನಿರ್ವಹಣಾ ಅವಧಿ — ನೋಡಿ [MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md) ); ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಪುಟದಿಂದ ಬಳಸಲಾಗಿದೆ.

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

### `POST /api/skills/collect/chaos` — API ಕೀ

ಬಾಹ್ಯ ಕರೆ ಮಾಡುವವರಿಗೆ ಬೇರರ್-ಟೋಕನ್ ರೂಪಾಂತರ. ಕೀಲಿಯು ಒಯ್ಯಬೇಕು** ಚೋಸ್ ಮೋಡ್ ಅನುಮತಿ** (`chaosModeEnabled`), ಅಂದರೆ** ಪೂರ್ವನಿಯೋಜಿತವಾಗಿ ಆಫ್** — ಪ್ರತಿ ಕೀಲಿಯನ್ನು ಸಕ್ರಿಯಗೊಳಿಸುತ್ತದೆ** ಡ್ಯಾಶ್ಬೋರ್ಡ್ → API ಮ್ಯಾನೇಜರ್ → ಎಡಿಟ್ ಕೀ → ಅನುಮತಿಗಳು → ಚೋಸ್ ಮೋಡ್** . ಮೇಲಿನಂತೆ ಅದೇ ದೇಹ.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

ಎರಡೂ ಅಂತಿಮ ಬಿಂದುಗಳು ಒಂದೇ ಆಕಾರವನ್ನು ನೀಡುತ್ತವೆ:

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

## ದೋಷನಿವಾರಣೆ

- **`400 Chaos Mode is not enabled`** ಮೇಲಿನ — ಹಂತ 2: ಜಾಗತಿಕ ಸ್ವಿಚ್ ಆಫ್ ಆಗಿದೆ.
- **API ಕೀಯನ್ನು `/api/skills/collect/chaos` ನಲ್ಲಿ ತಿರಸ್ಕರಿಸಲಾಗುತ್ತದೆ** — ಕೀಲಿಯು ಪ್ರತಿ-ಕೀ `chaosModeEnabled` ಅನುಮತಿಯನ್ನು ಹೊಂದಿಲ್ಲ (ಡೀಫಾಲ್ಟ್ ಆಗಿ ಆಫ್; ಇದು ಒಂದು ಸೆಟ್ಟಿಂಗ್, ದೋಷವಲ್ಲ).
- **ಒದಗಿಸುವವರು `No model set for this provider` ತೋರಿಸುತ್ತಾರೆ** — ಅದರ ಮಾದರಿಯನ್ನು ಚೋಸ್ ಮೋಡ್ ಪುಟದಲ್ಲಿ ಅಥವಾ ಅದರ ಸಂಪರ್ಕದಲ್ಲಿ ಡೀಫಾಲ್ಟ್ ಮಾದರಿಯನ್ನು ಹೊಂದಿಸುತ್ತದೆ (ಸೆಟಪ್, ಹಂತ 4 ನೋಡಿ).
- **ನೀವು ನಿರೀಕ್ಷಿಸಿದ ಪೂರೈಕೆದಾರರು ಫಲಿತಾಂಶಗಳಲ್ಲಿ ಕಾಣೆಯಾಗಿದ್ದಾರೆ** — ಚೋಸ್ ಮೋಡ್ ಪುಟದಲ್ಲಿ `providerOverrides` ಪರಿಶೀಲಿಸಿ (ಅಶಕ್ತಗೊಂಡ ಅತಿಕ್ರಮಣವು ಅದನ್ನು ಹೊರತುಪಡಿಸುತ್ತದೆ) ಮತ್ತು ಒದಗಿಸುವವರ ಸಂಪರ್ಕವು ಸಕ್ರಿಯವಾಗಿದೆಯೇ.
