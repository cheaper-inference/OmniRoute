# Chaos Mode (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Juhtpaneel:** **Chaos Mode** (külgribal) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (juhtpaneeli seanss) · `POST /api/skills/collect/chaos` (API-võti)  
> **Lähtekood:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode saadab **ühe ülesande korraga mitmele teenusepakkujale** — iga osalev teenusepakkuja
panustab ühe mudelieksemplari ning kõik vastused kuvatakse kõrvuti (või ahelana). See on
mitme mudeli käivituskeskkond, mitte marsruutimisstrateegia: see ei mõjuta kunagi teie tavapärast
`/v1/chat/completions` liiklust.

**Täpsustus — nime „chaos” all pakutakse kolme erinevat asja:**

| Asi                                   | Mis see on                                                                                                                                                                             | Kus dokumenteeritud                          |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**                        | Siin kirjeldatud juhtpaneeli leht ja API: ühe ülesande jaotamine paljudele teenusepakkujatele (paralleelselt või koostööpõhiselt).                                                     | See juhend                                   |
| `auto/chaos`                          | Auto-Combo mudeli ID: paralleelne hargnemine, üks mudel teenusepakkuja kohta ja üks ülesvoolupäring igaühele. See pole tõrgete tekitamine ([üksikasjad](#autochaos-parallel-fan-out)). | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaose kombinatsiooni konfiguratsioon | Püsiv kombinatsioon, mille `config.chaos.enabled` hargneb samal viisil (ainult API kaudu); `judgeModel` valib üksnes lõpliku vastuse, sünteesipäringut ei tehta.                       | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: paralleelne hargnemine

`auto/chaos` **ei ole** tõrgete tekitamise ega töökindluse testimise seadistus. Kui taotleda
`model: "auto/chaos"` lõpp-punktil `/v1/chat/completions`, toimub järgmine:

1. Koostatakse paneel, kus on **üks mudel iga teenusepakkuja kohta**: iga
   ühendatud teenusepakkuja esimene kandidaat kandidaatide kogumi järjekorras, kokku kuni 5 liiget
   (`OMNIROUTE_CHAOS_MAX_PANEL`, ülempiiriga 10)
   (`open-sse/services/autoCombo/virtualFactory.ts`). Kaalupakett `chaos-mode`
   määrab ainult iga liikme `weight` väärtuse; hargnemine seda ei loe.
2. Sama päring saadetakse igale paneeliliikmele **paralleelselt**, seega maksab üks päring
   ühe ülesvoolukutse iga paneeliliikme kohta
   (`open-sse/services/autoCombo/chaosEngine.ts`, väljastatakse failist
   `open-sse/services/combo.ts`).
3. Iga paneeliliikme saabumisel voogedastatakse üks olekurida: vaikimisi SSE-kommentaar
   (`: chaos <index> ok|fail <model>`) ning lisaks sündmus `omni-chaos-part`
   (`model`, `index`, `ok`, `error`), kui päring määrab
   `stream_options.include_chaos_parts: true`. Need ei sisalda vastuse teksti.
4. Lõpliku OpenAI-stiilis andmeplokina saadetakse **üks** paneeli vastus: esimese
   paneeliliikme vastus (`auto/chaos` määrab selle väärtuseks `judgeModel`), kui see õnnestub;
   vastasel juhul viimase eduka liikme vastus. Teiste paneeliliikmete vastuseid ei tagastata,
   seega maksate N kutse eest, kuid saate ühe vastuse.

## Seadistamine

1. Avatud** Armatuurlaud → Chaos Mode** (`/dashboard/chaos`).
2. Pöörake seda** sisse** — Chaos Mode laevad** vaikimisi keelatud** (`enabled: false` in `src/lib/chaos/chaosConfig.ts`). Kui see on keelatud, vastab `POST /api/chaos/run` `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Valige osalejad ja vaikeseaded (säilitatakse iga juhtumi kohta seadete poe kaudu):

   | Väli                | Tähendus                                                                | Vaikimisi / piirangud                |
   | ------------------- | ----------------------------------------------------------------------- | ------------------------------------ |
   | `enabled`           | Pealüliti                                                               | `false`                              |
   | `defaultMode`       | `parallel` või `collaborative` (vt allpool)                             | `parallel`                           |
   | `providerOverrides` | Pakkujapõhine osalemine (`providerId`, valikuline `modelId`, `enabled`) | tühi = iga aktiivne pakkuja, max 200 |
   | `systemPrompt`      | Sisseehitatud Chaose süsteemiviipa alistamine                           | valikuline, kuni 10 000 tähemärki    |
   | `timeoutMs`         | Maksimaalne aeg mudelikõne kohta                                        | `120000` (5 000–600 000)             |
   | `maxTokens`         | `max_tokens` mudelikõne kohta                                           | `4096` (256–128 000)                 |

4. Andke igale osalevale pakkujale a** mudel** . Pakkuja mudel on selle lubatud alistamise `modelId` lehel Chaos Mode (see võidab), vastasel juhul** vaikemudel** selle ühendusest. Pakkuja ID-d ei kasutata kunagi mudeli nimena. Pakkuja, kellel pole kumbagi** ei kutsutud** : see kuvatakse tulemustes `status: "error"` na sõnumiga _"Selle pakkuja jaoks pole mudelit määratud. Määrake selle jaoks mudel Chaos Mode lehel või ühenduse vaikemudel."_ ja tühi `modelId`, samal ajal kui teised pakkujad töötavad normaalselt. Kui ühelgi valitud pakkujal pole mudelit, siis käivitamine nurjub enne ülesvoolu päringut _"Ühelgi pakkujal pole mudelit määratud. …"_ (mõlemal lõpp-punktil HTTP 500).
5. Käivita a** test lehelt endalt** — tulemuste paneel näitab iga pakkuja vastust, olekut ja kestust.

## Käitusrežiimid

- **`parallel`** — iga mudel saab sama ülesande korraga; kõik vastused tagastatakse
  üksteisest sõltumatult.
- **`collaborative`** — mudelid käivitatakse **ahelana**: igaüks näeb eelmise mudeli väljundit ning
  tal palutakse seda täiustada, laiendada, kritiseerida või pakkuda alternatiivi. Vastuse väli `summary`
  ühendab edukad väljundid ahela järjekorras (paralleelkäitustel `summary` puudub).

## API

### `POST /api/chaos/run` — armatuurlaua seanss

Küpsise abil autentitud (haldusseanss — vt [MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md) ); mida kasutab armatuurlaua leht.

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

### `POST /api/skills/collect/chaos` — API võti

Kandja märgiga variant välistele helistajatele. Võti peab kandma** Kaoserežiimi luba** (`chaosModeEnabled`), mis on** vaikimisi välja lülitatud** — lubab selle iga sisestusklahvi kohta** Armatuurlaud → API haldur → redigeerimisklahv → load → kaoserežiim** . Sama keha nagu ülal.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Mõlemad lõpp-punktid tagastavad sama kuju:

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

## Veaotsing

- **`400 Chaos Mode is not enabled`** — 2. samm ülal: globaalne lüliti on välja lülitatud.
- **API võti lükatakse `/api/skills/collect/chaos` tagasi** — võtmel puudub klahvipõhine `chaosModeEnabled` luba (vaikimisi väljas; see on säte, mitte viga).
- **Pakkuja näitab `No model set for this provider`** — määras oma mudeli Chaos Mode lehel või vaikemudeli ühenduses (vt Seadistamine, samm 4).
- **Tulemustest puudub oodatud pakkuja** — kontrollige `providerOverrides` lehel Chaos Mode (keelatud alistamine välistab selle) ja seda, kas teenusepakkuja ühendus on aktiivne.
