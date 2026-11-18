# Chaos Mode (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Nadzorna plošča:** **Način Chaos** (stranska vrstica) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (seja nadzorne plošče) · `POST /api/skills/collect/chaos` (ključ API)  
> **Izvorna koda:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Način Chaos pošlje **eno nalogo več ponudnikom hkrati** — vsak sodelujoči ponudnik
prispeva en primerek modela, vse odgovore pa prejmete drugega ob drugem (ali verižno povezane). To je
vmesnik za izvajanje z več modeli, ne strategija usmerjanja: vaš običajni promet
`/v1/chat/completions` nanj nikoli ne vpliva.

**Pojasnilo — tri različne stvari vsebujejo »chaos« v imenu:**

| Stvar                           | Kaj je                                                                                                                                                                         | Kje je dokumentirano                         |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| **Način Chaos**                 | Tukaj opisana stran nadzorne plošče in API: razpošiljanje ene naloge več ponudnikom (vzporedno ali sodelovalno).                                                               | Ta vodnik                                    |
| `auto/chaos`                    | ID modela Auto-Combo: vzporedno razpošiljanje, en model na ponudnika, po en klic navzgor za vsakega. Ne gre za vstavljanje napak ([podrobnosti](#autochaos-parallel-fan-out)). | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Konfiguracija kombinacije Chaos | Trajno shranjena kombinacija z `config.chaos.enabled` razpošilja na enak način (samo prek API-ja); `judgeModel` zgolj izbere končni odgovor, brez klica za sintezo.            | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: vzporedno razpošiljanje

`auto/chaos` **ni** nastavitev za vstavljanje napak ali preizkušanje odpornosti. Zahteva z
`model: "auto/chaos"` na `/v1/chat/completions`:

1. Sestavi nabor **enega modela na ponudnika**: prvega kandidata vsakega
   povezanega ponudnika, v vrstnem redu nabora kandidatov, z največ 5 člani
   (`OMNIROUTE_CHAOS_MAX_PANEL`, omejeno na največ 10)
   (`open-sse/services/autoCombo/virtualFactory.ts`). Paket uteži `chaos-mode`
   nastavi samo `weight` vsakega člana; razpošiljanje te vrednosti ne bere.
2. Pošlje isto zahtevo vsakemu članu nabora **vzporedno**, zato ena zahteva
   povzroči en klic navzgor na vsakega člana nabora
   (`open-sse/services/autoCombo/chaosEngine.ts`, odpremljeno iz
   `open-sse/services/combo.ts`).
3. Ob prispetju pretaka po eno vrstico stanja za vsakega člana nabora: privzeto
   komentar SSE (`: chaos <index> ok|fail <model>`), dodatno pa dogodek `omni-chaos-part`
   (`model`, `index`, `ok`, `error`), ko zahteva nastavi
   `stream_options.include_chaos_parts: true`. Ti ne vsebujejo besedila odgovora.
4. Pošlje **en** odgovor nabora kot končni kos v slogu OpenAI: odgovor prvega
   člana nabora (`auto/chaos` ga nastavi kot `judgeModel`), če je uspešen, sicer
   odgovor zadnjega uspešnega člana. Drugi odgovori nabora niso vrnjeni, zato
   plačate za N klicev in prejmete en dokončan odgovor.

## Nastavitev

1. Odpri** Nadzorna plošča → Chaos Mode** (`/dashboard/chaos`).
2. Obrni ga** na** — Chaos Mode ladje** privzeto onemogočeno** (`enabled: false` v `src/lib/chaos/chaosConfig.ts`). Ko je onemogočen, `POST /api/chaos/run` odgovarja `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Izberite udeležence in privzete vrednosti (trajajo za vsak primerek prek shrambe nastavitev):

   | Polje               | Pomen                                                                            | Privzeto / omejitve                        |
   | ------------------- | -------------------------------------------------------------------------------- | ------------------------------------------ |
   | `enabled`           | Glavno stikalo                                                                   | `false`                                    |
   | `defaultMode`       | `parallel` ali `collaborative` (glejte spodaj)                                   | `parallel`                                 |
   | `providerOverrides` | Sodelovanje posameznega ponudnika (`providerId`, neobvezno `modelId`, `enabled`) | prazen = vsak aktivni ponudnik, največ 200 |
   | `systemPrompt`      | Preglasitev za vgrajen poziv sistema Chaos                                       | neobvezno, največ 10 000 znakov            |
   | `timeoutMs`         | Največji čas na klic modela                                                      | `120000` (5 000–600 000)                   |
   | `maxTokens`         | `max_tokens` na klic modela                                                      | `4096` (256–128 000)                       |

4. Vsakemu sodelujočemu ponudniku dajte a** model** . Ponudnikov model je `modelId` njegove omogočene preglasitve na strani Chaos Mode (zmaga), sicer** privzeti model** njegove povezave. ID ponudnika se nikoli ne uporablja kot ime modela. Ponudnik z nobenim ni** ni poklican** : v rezultatih se prikaže kot `status: "error"` s sporočilom _"Model ni nastavljen za tega ponudnika. Nastavite model zanj na strani Chaos Mode ali privzeti model na povezavi."_ in praznim `modelId`, medtem ko drugi ponudniki delujejo normalno. Če noben izbrani ponudnik nima modela, zagon ne uspe pred kakršno koli zahtevo navzgor z _"Noben ponudnik nima nastavljenega modela. …"_ (HTTP 500 na obeh končnih točkah).
5. Zaženi a** test na sami strani** — plošča z rezultati prikazuje odgovor, status in trajanje vsakega ponudnika.

## Načini izvajanja

- **`parallel`** — vsak model sočasno prejme isto nalogo; vse odgovore prejmete
  neodvisno.
- **`collaborative`** — modeli se izvajajo **v verigi**: vsak vidi rezultat prejšnjega modela in
  dobi navodilo, naj ga izboljša, razširi, kritično oceni ali ponudi alternativo. Polje `summary`
  v odgovoru združi uspešne rezultate v vrstnem redu verige (vzporedna izvajanja nimajo polja `summary`).

## API

### seja nadzorne plošče `POST /api/chaos/run` —

Preverjeno s piškotki (seja upravljanja — glej [MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md) ); uporablja stran nadzorne plošče.

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

### `POST /api/skills/collect/chaos` — API ključ

Različica žetona nosilca za zunanje klicatelje. Ključ mora nositi** Dovoljenje za način kaosa** (`chaosModeEnabled`), kar je** privzeto izklopljeno** — ga omogočite na ključ** Dashboard → API Manager → edit key → permissions → Chaos Mode** . Enako telo kot zgoraj.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Obe končni točki vrneta enako obliko:

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

## Odpravljanje težav

- **`400 Chaos Mode is not enabled`** — 2. korak zgoraj: globalno stikalo je izklopljeno.
- **ključ API je zavrnjen na `/api/skills/collect/chaos`** — ključ nima dovoljenja `chaosModeEnabled` za posamezen ključ (privzeto izklopljeno; to je nastavitev, ne napaka).
- **Ponudnik prikaže `No model set for this provider`** — nastavi svoj model na strani Chaos Mode ali privzeti model na svoji povezavi (glejte Nastavitev, 4. korak).
- **Med rezultati manjka ponudnik, ki ste ga pričakovali** — preverite `providerOverrides` na strani Chaos Mode (onemogočena preglasitev ga izključuje) in ali je povezava ponudnika aktivna.
