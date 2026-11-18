# Chaos Mode (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Valdymo skydas:** **Chaoso režimas** (šoninėje juostoje) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (valdymo skydo sesija) · `POST /api/skills/collect/chaos` (API raktas)  
> **Šaltinis:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaoso režimas siunčia **vieną užduotį keliems teikėjams vienu metu** — kiekvienas dalyvaujantis teikėjas
pateikia po vieną modelio egzempliorių, o jūs gaunate visus atsakymus greta (arba sujungtus į grandinę). Tai yra
kelių modelių vykdymo sąsaja, o ne maršruto parinkimo strategija: ji niekada nepaveikia jūsų įprasto
`/v1/chat/completions` srauto.

**Patikslinimas — su žodžiu „chaos“ pavadinime pateikiami trys skirtingi dalykai:**

| Dalykas                      | Kas tai yra                                                                                                                                                                               | Kur aprašyta                                 |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaoso režimas**           | Čia aprašytas valdymo skydo puslapis ir API: viena užduotis išskirstoma daugeliui teikėjų (lygiagrečiai arba bendradarbiaujant).                                                          | Šiame vadove                                 |
| `auto/chaos`                 | Auto-Combo modelio ID: lygiagretus išskirstymas, po vieną modelį iš kiekvieno teikėjo ir po vieną išorinę užklausą. Tai nėra trikčių įterpimas ([išsamiau](#autochaos-parallel-fan-out)). | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaoso derinio konfigūracija | Išsaugotas derinys, kuriame `config.chaos.enabled` užduotis išskirsto taip pat (tik per API); `judgeModel` tik parenka galutinį atsakymą, papildomas sintezės iškvietimas neatliekamas.   | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: lygiagretus išskirstymas

`auto/chaos` **nėra** trikčių įterpimo ar atsparumo testavimo parinktis. Užklausiant
`model: "auto/chaos"` per `/v1/chat/completions`:

1. Sudaroma grupė, kurioje yra **po vieną modelį iš kiekvieno teikėjo**: pirmasis kiekvieno
   prijungto teikėjo kandidatas pagal kandidatų telkinio eiliškumą, daugiausia 5 nariai
   (`OMNIROUTE_CHAOS_MAX_PANEL`, ribojama iki 10)
   (`open-sse/services/autoCombo/virtualFactory.ts`). `chaos-mode` svorių
   paketas nustato tik kiekvieno nario `weight`; išskirstymo mechanizmas jo neskaito.
2. Ta pati užklausa siunčiama kiekvienam grupės nariui **lygiagrečiai**, todėl viena užklausa
   kainuoja po vieną išorinį iškvietimą kiekvienam grupės nariui
   (`open-sse/services/autoCombo/chaosEngine.ts`, išsiunčiama iš
   `open-sse/services/combo.ts`).
3. Kiekvienam grupės nariui gavus rezultatą, perduodama po vieną būsenos eilutę: pagal numatytąją
   nuostatą — SSE komentaras (`: chaos <index> ok|fail <model>`), taip pat `omni-chaos-part`
   įvykis (`model`, `index`, `ok`, `error`), kai užklausoje nustatyta
   `stream_options.include_chaos_parts: true`. Juose atsakymo tekstas neperduodamas.
4. Kaip galutinis OpenAI formato fragmentas išsiunčiamas **vienas** grupės atsakymas: pirmojo grupės
   nario (`auto/chaos` jį nustato kaip `judgeModel`), jei jo užklausa sėkminga, kitu atveju —
   paskutinio sėkmingo nario atsakymas. Kitų grupės narių atsakymai negrąžinami, todėl
   mokate už N iškvietimų, o gaunate vieną užbaigtą atsakymą.

## Sąranka

1. Atidaryti** Prietaisų skydelis → Chaos Mode** (`/dashboard/chaos`).
2. Pasukite jį** įjungta** — Chaos Mode laivai** pagal numatytuosius nustatymus išjungtas** (`enabled: false` `src/lib/chaos/chaosConfig.ts`). Kai išjungta, `POST /api/chaos/run` atsako `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Pasirinkite dalyvius ir numatytuosius nustatymus (išliko kiekvienam atvejui nustatymų parduotuvėje):

   | Laukas              | Reikšmė                                                                          | Numatytasis / ribos                              |
   | ------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------ |
   | `enabled`           | Pagrindinis jungiklis                                                            | `false`                                          |
   | `defaultMode`       | `parallel` arba `collaborative` (žr. toliau)                                     | `parallel`                                       |
   | `providerOverrides` | Kiekvieno teikėjo dalyvavimas (`providerId`, pasirinktinai `modelId`, `enabled`) | tuščias = kiekvienas aktyvus teikėjas, maks. 200 |
   | `systemPrompt`      | Integruotos Chaos sistemos raginimo nepaisymas                                   | neprivaloma, daugiausia 10 000 simbolių          |
   | `timeoutMs`         | Maksimalus vieno modelio skambučio laikas                                        | `120000` (5 000–600 000)                         |
   | `maxTokens`         | `max_tokens` už modelio skambutį                                                 | `4096` (256–128 000)                             |

4. Suteikite kiekvienam dalyvaujančiam teikėjui a** modelis** . Teikėjo modelis yra jo įjungto nepaisymo Chaoso režimo puslapyje `modelId` (jis laimi), kitu atveju** numatytasis modelis** jo ryšio. Teikėjo ID niekada nenaudojamas kaip modelio pavadinimas. Tiekėjas, neturintis nei vieno, nei kito** nepaskambino** : rezultatuose jis rodomas kaip `status: "error"` su pranešimu _"Šiam teikėjui nenustatytas modelis. Puslapyje Chaos Mode nustatykite modelį arba numatytąjį ryšio modelį."_ ir tuščias `modelId`, o kiti teikėjai veikia įprastai. Jei nė vienas pasirinktas teikėjas neturi modelio, paleidimas nepavyksta prieš bet kokią ankstesnę užklausą su _"Nė vienas teikėjas nenustatė modelio..."_ (HTTP 500 abiejuose galutiniuose taškuose).
5. Paleisti a** testą iš paties puslapio** — rezultatų skydelyje rodomas kiekvieno teikėjo atsakymas, būsena ir trukmė.

## Vykdymo režimai

- **`parallel`** — kiekvienas modelis vienu metu gauna tą pačią užduotį; visus atsakymus gaunate
  nepriklausomai.
- **`collaborative`** — modeliai vykdomi **grandinėje**: kiekvienas mato ankstesnio modelio išvestį ir
  yra prašomas ją patobulinti, išplėsti, įvertinti arba pasiūlyti alternatyvą. Atsakymo laukas `summary`
  sujungia sėkmingas išvestis grandinės tvarka (lygiagretūs vykdymai lauko `summary` neturi).

## API

### `POST /api/chaos/run` — prietaisų skydelio sesija

Slapukų autentifikavimas (valdymo sesija — žr. [MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md) ); naudojamas prietaisų skydelio puslapyje.

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

### `POST /api/skills/collect/chaos` — API raktas

Nešinio žetono variantas išoriniams skambintojams. Raktas turi neštis** Chaoso režimo leidimas** (`chaosModeEnabled`), kuris yra** išjungtas pagal numatytuosius nustatymus** — įgalinkite jį kiekvienam raktui** Prietaisų skydelis → API tvarkyklė → redagavimo klavišas → leidimai → chaoso režimas** . Tas pats kūnas kaip aukščiau.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Abu galiniai taškai grąžina tą pačią formą:

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

## Trikčių šalinimas

- **`400 Chaos Mode is not enabled`** — 2 veiksmas aukščiau: visuotinis jungiklis išjungtas.
- **API raktas atmetamas `/api/skills/collect/chaos`** — raktui trūksta vieno klavišo `chaosModeEnabled` leidimo (išjungta pagal numatytuosius nustatymus; tai yra nustatymas, o ne klaida).
- **Teikėjas rodo `No model set for this provider`** — nustatė savo modelį Chaoso režimo puslapyje arba numatytąjį savo ryšio modelį (žr. Sąranka, 4 veiksmas).
- **Rezultatuose trūksta teikėjo, kurio tikėjotės** — patikrinkite `providerOverrides` chaoso režimo puslapyje (išjungtas nepaisymas jo neįtraukia) ir ar aktyvus teikėjo ryšys.
