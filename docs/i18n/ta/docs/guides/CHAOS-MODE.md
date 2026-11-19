# Chaos Mode (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **டாஷ்போர்டு:** **Chaos Mode** (பக்கப்பட்டி) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (டாஷ்போர்டு அமர்வு) · `POST /api/skills/collect/chaos` (API விசை)  
> **மூலம்:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode **ஒரே பணியை ஒரே நேரத்தில் பல வழங்குநர்களுக்கு** அனுப்புகிறது — பங்கேற்கும் ஒவ்வொரு வழங்குநரும்
ஒரு மாதிரி நிகழ்வைப் பங்களிக்கிறார்கள்; மேலும் எல்லாப் பதில்களும் அருகருகே (அல்லது சங்கிலியாக இணைக்கப்பட்டு) கிடைக்கும். இது
பல-மாதிரி இயக்கத் தளம், வழிச்செலுத்தல் உத்தி அல்ல: உங்கள் வழக்கமான `/v1/chat/completions`
போக்குவரத்தை இது ஒருபோதும் பாதிக்காது.

**தெளிவுபடுத்தல் — "chaos" என்ற பெயருடன் மூன்று வெவ்வேறு அம்சங்கள் வழங்கப்படுகின்றன:**

| அம்சம்                 | அது என்ன                                                                                                                                                                                      | ஆவணப்படுத்தப்பட்டுள்ள இடம்                   |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**         | இங்கே விவரிக்கப்பட்டுள்ள டாஷ்போர்டு பக்கம் + API: ஒரு பணியைப் பல வழங்குநர்களுக்கு விரிவாக்கி அனுப்பும் (இணையாக அல்லது கூட்டாக).                                                               | இந்த வழிகாட்டி                               |
| `auto/chaos`           | Auto-Combo மாதிரி id: இணையான விரிவாக்கம், ஒவ்வொரு வழங்குநருக்கும் ஒரு மாதிரி, ஒவ்வொன்றிற்கும் ஓர் அப்ஸ்ட்ரீம் அழைப்பு. இது பிழை உட்செலுத்தல் அல்ல ([விவரங்கள்](#autochaos-parallel-fan-out)). | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos combo கட்டமைப்பு | `config.chaos.enabled` கொண்ட நிலையாகச் சேமிக்கப்பட்ட combo அதே முறையில் விரிவாக்குகிறது (API-மட்டும்); `judgeModel` இறுதிப் பதிலை மட்டுமே தேர்ந்தெடுக்கிறது, தொகுப்பு அழைப்பு இல்லை.          | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: இணையான விரிவாக்கம்

`auto/chaos` என்பது பிழை உட்செலுத்தல் அல்லது மீட்சித்திறன் சோதனைக்கான கட்டுப்பாடு **அல்ல**.
`/v1/chat/completions` இல் `model: "auto/chaos"` ஐக் கோருவது:

1. **ஒவ்வொரு வழங்குநருக்கும் ஒரு மாதிரி** கொண்ட குழுவை உருவாக்குகிறது: இணைக்கப்பட்ட ஒவ்வொரு
   வழங்குநரின் முதல் வேட்பாளர், வேட்பாளர்-தொகுப்பு வரிசையில், அதிகபட்சமாக 5 உறுப்பினர்கள் வரை
   (`OMNIROUTE_CHAOS_MAX_PANEL`, அதிகபட்ச வரம்பு 10)
   (`open-sse/services/autoCombo/virtualFactory.ts`). `chaos-mode` எடைத்
   தொகுப்பு ஒவ்வொரு உறுப்பினரின் `weight` ஐ மட்டுமே அமைக்கிறது; விரிவாக்கம் அதை வாசிப்பதில்லை.
2. அதே கோரிக்கையை ஒவ்வொரு குழு உறுப்பினருக்கும் **இணையாக** அனுப்புகிறது; எனவே ஒரு கோரிக்கைக்கு
   ஒவ்வொரு குழு உறுப்பினருக்கும் ஓர் அப்ஸ்ட்ரீம் அழைப்பு என்ற அளவில் செலவாகும்
   (`open-sse/services/autoCombo/chaosEngine.ts`, இதிலிருந்து அனுப்பப்படுகிறது:
   `open-sse/services/combo.ts`).
3. ஒவ்வொரு குழு உறுப்பினரின் முடிவும் வந்துசேரும்போது, அதற்கான ஒரு நிலை வரியை ஸ்ட்ரீம் செய்கிறது: இயல்பாக ஓர் SSE கருத்து
   (`: chaos <index> ok|fail <model>`), மேலும் கோரிக்கை
   `stream_options.include_chaos_parts: true` ஐ அமைத்திருந்தால் ஓர் `omni-chaos-part`
   நிகழ்வு (`model`, `index`, `ok`, `error`). இவற்றில் பதில் உரை எதுவும் இருக்காது.
4. இறுதி OpenAI-பாணி துண்டாக **ஒரே ஒரு** குழுப் பதிலை அனுப்புகிறது: முதல் குழு
   உறுப்பினரின் பதில் (`auto/chaos` அதை `judgeModel` ஆக அமைக்கிறது) வெற்றியடைந்தால் அதையும், இல்லையெனில்
   கடைசியாக வெற்றியடைந்த உறுப்பினரின் பதிலையும் அனுப்புகிறது. மற்ற குழுப் பதில்கள் திருப்பி அனுப்பப்படுவதில்லை; எனவே
   நீங்கள் N அழைப்புகளுக்குச் செலுத்தி, ஒரு நிறைவை மட்டுமே பெறுகிறீர்கள்.

## அமைவு

1. திற** டாஷ்போர்டு → கேயாஸ் பயன்முறை** (`/dashboard/chaos`)
2. அதை திருப்பவும்** அன்று** — கேயாஸ் மோட் கப்பல்கள்** முன்னிருப்பாக முடக்கப்பட்டது** (`enabled: false` இல் `src/lib/chaos/chaosConfig.ts`). முடக்கப்பட்டிருக்கும் போது, `POST /api/chaos/run` `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."` பதிலளிக்கிறது.
3. பங்கேற்பாளர்கள் மற்றும் இயல்புநிலைகளைத் தேர்ந்தெடுங்கள் (அமைப்புகள் ஸ்டோர் வழியாக ஒரு நிகழ்வுக்கு தொடர்ந்து):

   | களம்                | பொருள்                                                                  | இயல்புநிலை / வரம்புகள்                                  |
   | ------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------- |
   | `enabled`           | முதன்மை சுவிட்ச்                                                        | `false`                                                 |
   | `defaultMode`       | `parallel` அல்லது `collaborative` (கீழே காண்க)                          | `parallel`                                              |
   | `providerOverrides` | ஒரு வழங்குநர் பங்கேற்பு (`providerId`, விருப்பமான `modelId`, `enabled`) | ஒவ்வொரு செயலில் உள்ள வழங்குநரும் காலி =, அதிகபட்சம் 200 |
   | `systemPrompt`      | உள்ளமைக்கப்பட்ட கேயாஸ் சிஸ்டம் ப்ராம்ட்க்கு மேலெழுதவும்                 | விருப்பமானது, அதிகபட்சம் 10 000 எழுத்துகள்              |
   | `timeoutMs`         | மாடல் அழைப்புக்கு அதிகபட்ச நேரம்                                        | `120000` (5 000–600 000)                                |
   | `maxTokens`         | ஒரு மாதிரி அழைப்புக்கு`max_tokens`                                      | `4096` (256–128 000)                                    |

4. ஒவ்வொரு பங்கேற்பு வழங்குநரையும் கொடுங்கள் a** மாதிரி** . ஒரு வழங்குநரின் மாதிரியானது கேயாஸ் பயன்முறை பக்கத்தில் அதன் இயக்கப்பட்ட மேலெழுதலின் `modelId` ஆகும் (அது வெல்லும்), இல்லையெனில்** இயல்புநிலை மாதிரி** அதன் இணைப்பு. வழங்குநர் ஐடி ஒருபோதும் மாதிரிப் பெயராகப் பயன்படுத்தப்படாது. இரண்டும் இல்லாத ஒரு வழங்குநர்** அழைக்கப்படவில்லை** : இது _"இந்த வழங்குநருக்கு எந்த மாதிரியும் அமைக்கப்படவில்லை. கேயாஸ் பயன்முறை பக்கத்தில் ஒரு மாதிரியை அமைக்கவும் அல்லது இணைப்பில் இயல்புநிலை மாதிரியை அமைக்கவும்."_ மற்றும் வெற்று `modelId`, மற்ற வழங்குநர்கள் சாதாரணமாக இயங்கும் போது இது `status: "error"` என்ற செய்தியுடன் முடிவுகளில் காண்பிக்கப்படும். தேர்ந்தெடுக்கப்பட்ட எந்த வழங்குநருக்கும் மாதிரி இல்லை என்றால், _"எந்தவொரு வழங்குனருக்கும் மாதிரித் தொகுப்பு இல்லை. ..."_ (இரண்டு இறுதிப்புள்ளிகளிலும்HTTP 500) உடன் எந்தவொரு அப்ஸ்ட்ரீம் கோரிக்கைக்கும் முன் ரன் தோல்வியடையும்.
5. ஒரு இயக்கவும்** பக்கத்திலிருந்தே சோதனை** — முடிவுகள் குழு ஒவ்வொரு வழங்குநரின் பதில், நிலை மற்றும் கால அளவைக் காட்டுகிறது.

## இயக்க முறைகள்

- **`parallel`** — ஒவ்வொரு மாதிரியும் ஒரே பணியை ஒரே நேரத்தில் பெறும்; அனைத்துப் பதில்களையும்
  தனித்தனியாகப் பெறுவீர்கள்.
- **`collaborative`** — மாதிரிகள் **ஒரு சங்கிலியாக** இயங்கும்: ஒவ்வொன்றும் முந்தைய மாதிரியின் வெளியீட்டைப் பார்த்து,
  அதைச் செம்மைப்படுத்த, விரிவாக்க, விமர்சிக்க அல்லது மாற்று வழியை வழங்கக் கோரப்படும். பதிலின் `summary` புலம்
  வெற்றிகரமான வெளியீடுகளைச் சங்கிலி வரிசையில் ஒன்றிணைக்கும் (`parallel` இயக்கங்களில் `summary` இருக்காது).

## API

### `POST /api/chaos/run` — டாஷ்போர்டு அமர்வு

குக்கீ அங்கீகரிக்கப்பட்டது (நிர்வாக அமர்வு — பார்க்க [MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md) ); டாஷ்போர்டு பக்கத்தால் பயன்படுத்தப்படுகிறது.

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

### `POST /api/skills/collect/chaos` — API விசை

வெளிப்புற அழைப்பாளர்களுக்கான தாங்கி-டோக்கன் மாறுபாடு. சாவியை எடுத்துச் செல்ல வேண்டும்** கேயாஸ் மோட் அனுமதி** (`chaosModeEnabled`), அதாவது** முன்னிருப்பாக ஆஃப்** — ஒரு விசைக்கு அதை இயக்கவும்** டாஷ்போர்டு → API மேலாளர் → எடிட் கீ → அனுமதிகள் → கேயாஸ் பயன்முறை** . மேலே சொன்ன அதே உடல்.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

இரண்டு முனைப்புள்ளிகளும் ஒரே வடிவத்தை அளிக்கின்றன:

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

## சரிசெய்தல்

- **`400 Chaos Mode is not enabled`** — படி 2 மேலே: உலகளாவிய சுவிட்ச் ஆஃப் செய்யப்பட்டுள்ளது.
- **API விசை `/api/skills/collect/chaos` இல் நிராகரிக்கப்படும்** — விசையில் ஒவ்வொரு விசைக்கும் `chaosModeEnabled` அனுமதி இல்லை (இயல்புநிலையாக ஆஃப்; இது ஒரு அமைப்பு, பிழை அல்ல).
- **ஒரு வழங்குநர் `No model set for this provider` காட்டுகிறது** — அதன் மாதிரியை கேயாஸ் பயன்முறை பக்கத்தில் அல்லது அதன் இணைப்பில் இயல்புநிலை மாதிரியை அமைக்கிறது (அமைவு, படி 4 ஐப் பார்க்கவும்).
- **நீங்கள் எதிர்பார்த்த ஒரு வழங்குநர் முடிவுகளில் இல்லை** — கேயாஸ் பயன்முறை பக்கத்தில் `providerOverrides` சரிபார்க்கவும் (முடக்கப்பட்ட மேலெழுதல் அதை விலக்குகிறது) மற்றும் வழங்குநர் இணைப்பு செயலில் உள்ளதா.
