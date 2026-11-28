# Quota Sharing Engine (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇧🇦 [bs](../../../bs/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Sanggunian ng dokumento**: `docs/routing/QUOTA_SHARE.md`
> Bahagi ng Group B (mga plan 16 + 22).

---

## Pangkalahatang-ideya

Ipinamamahagi ng Quota Sharing Engine nang patas ang quota na nakabatay sa oras ng isang provider (hal. 5-oras na window ng Codex, 1500 req/h ng Kimi) sa maraming API key na gumagamit ng iisang koneksyon.

**Problemang nilulutas nito:** Maraming API key ang ipinapasa ng OmniRoute sa iisang upstream provider account. Kung walang lohika sa pagbabahagi, maaaring ubusin ng biglaang pagdami ng paggamit mula sa key A ang quota ng provider para sa oras na iyon, kaya maba-block ang mga key B at C hanggang sa mag-reset ang window. Pinipigilan ito ng engine sa pamamagitan ng:

1. Pagsubaybay sa rolling consumption ng bawat key ayon sa dimensyon (%, mga request, mga token, $).
2. Paglalapat ng work-conserving fair-share algorithm: maaaring humiram ang isang key mula sa mga hindi ginagamit na share habang hindi pa saturated ang global pool.
3. Pagpapatupad ng resulta sa hot path (`chatCore.ts`) bago makarating ang request sa upstream executor.

---

## Algorithm: Fair-Share Work-Conserving

Ipinatupad sa `src/lib/quota/fairShare.ts`.

### Mga mode

| Kundisyon                                  | Mode           | Pag-uugali                                                                                      |
| ------------------------------------------ | -------------- | ----------------------------------------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **mapagbigay** | Maaaring humiram ang susi ng hanggang sa pandaigdigang limitasyon bawasan ang nakonsumo-kabuuan |
| `globalUsedPercent >= saturationThreshold` | **Mahigpit**   | Ipatupad nang mahigpit ang indibidwal na patas na bahagi                                        |

Default na `saturationThreshold = 0.5` (env `QUOTA_SATURATION_THRESHOLD`).

Ang dalawang mode na ito ay naglalarawan ng pool sa default na borrow mode, `saturation`. Palaging inilalapat ng pool sa `consent` mode ang mga mahigpit na panuntunan, anuman ang saturation. Tingnan [ang Pinahintulutang pagpapahiram (per-pool opt-in)](#consented-lending-per-pool-opt-in).

### Pagpapasya sa bawat dimensyon

Para sa bawat aktibong dimensyon sa pool, kinukuwenta ng makina ang:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = current rolling value for this key (from QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Para sa mga dimensyon `percent`, `consumed` ay nagmumula sa attribution book sa halip (tingnan [ang Porsiyento na mga dimensyon: per-key attribution](#percent-dimensions-per-key-attribution) ).

Pagkatapos:

- **`policy = hard`** : kung `consumed > fairShareAllowed` at mode ay mahigpit na →** harangan** .
- **`policy = soft`** : kung `consumed > fairShareAllowed` at mode ay mahigpit na →** parusahan** (deprioritize in combo; never hard-block).
- **`policy = burst`** : payagan habang umiiral ang global headroom anuman ang patas na bahagi.

### Cap absoluto

`capValue` + `capUnit` sa isang alokasyon ay isang matigas na kisame na hiwalay sa mode o patakaran. Anumang dimensyon kung saan palaging `consumed >= capValue`** mga bloke** ang kahilingan. Para sa isang `percent` cap, `consumed` ay ang bahagi lamang na iniuugnay sa susi.

### Multi-dimension check

Ang isang kahilingan ay hinarangan kung** anuman** haharangin ito ng sukat sa pool. Ang mga dimensyon ay independiyenteng — at ang 5h% na pagkaubos ay hindi nakakaapekto sa lingguhang% na dimensyon.

### Nanghihiram

Sa generous mode, ang isang susi na ang alokasyon ay kulang sa paggamit ay maaaring gumamit ng sobra mula sa iba pang mga susi na hindi inilalaang bahagi. Ang formula ay:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

saan `consumedByOtherKeys = consumedTotal - consumedByThisKey`. Ang teto global (pool `limit` para sa dimensyong iyon) ay palaging ang matigas na kisame.

### Pinahintulutang pagpapahiram (per-pool opt-in)

May borrow mode ang bawat pool. `saturation` ay ang default at pinapanatili ang mga panuntunan sa itaas. Sa `consent` mode, ipinapasa ng `hard` key ang bahagi nito sa loob lamang ng kapasidad na napagkasunduan ng ibang mga key na ipahiram. Itinatakda ng administrator ang mode ng bawat pool. Ang bawat may hawak ng susi ay nagtatakda ng kanilang sariling pahintulot sa pamamagitan ng [pahintulot sa Pagpautang](#lending-consent).

Ang pahintulot ay isang porsyento mula 0 hanggang 100 at isang opsyonal na deadline sa epoch milliseconds. Ipinahiram ng susi ang porsyentong iyon ng idle share nito habang nasa hinaharap ang deadline.

Para sa isang dimensyon, `L` ay ang mabisang limitasyon: ang limitasyon ng plano ay dumi-time sa mga account sa pool. Nag-compute ang gate, para sa humihiling na susi:

```
share_k         = w_k / 100 × L
idle_k          = max(0, share_k − consumed_k)
lent            = Σ over the other keys of lend_k / 100 × idle_k
taken           = Σ over the other keys of max(0, consumed_k − share_k)
borrowAvailable = max(0, lent − taken)
```

`w_k` ay ang timbang ng susi, o `100 / n` para sa bawat susi kapag walang timbang na higit sa 0. `lend_k` ay ang aktibong porsyento ng susi, at 0 kapag lumipas na ang deadline nito. Ang sariling pahintulot ng humihiling na susi ay hindi kailanman binibilang. Ang `hard` key ay tatanggihan kapag ang pagkonsumo nito ay umabot sa bahagi nito plus `borrowAvailable`.

Ang kapasidad na walang claim sa alokasyon (100 minus ang kabuuan ng mga timbang) ay hindi maipapahiram. Walang susi ang pumayag na ipahiram ito.

**Halimbawa.** `L` ay 1000.

| Susi | Timbang | Ibahagi | Naubos | Nagpahiram |
| ---- | ------- | ------- | ------ | ---------- |
| A    | 50      | 500     | 530    | 0%         |
| B    | 30      | 300     | 100    | 50%        |
| C    | 0       | 0       | 60     | 0%         |

- Ipinahiram ng B ang 50% ng idle nitong 200, na 100. Umabot na ang C ng 60 sa itaas ng bahagi nito. Maaaring humiram si A ng 40.
- Ang A ay inihain sa 530 at tinanggihan kapag ang pagkonsumo nito ay umabot sa 540.
- Bago gumamit si C ng anuman, na ang A ay nasa o nasa ilalim ng bahagi nito, maaaring humiram si C ng 100.
- Bago gumamit si C ng kahit ano, na may A sa 530, maaaring humiram si C ng 70.

**Zero weight.** Ang isang susi na may timbang na 0 ay may bahaging 0. Ito ay inihain lamang habang ang pagkonsumo nito ay mas mababa sa ipinahiram ng iba. Kapag walang nagpapahiram, ito ay tinatanggihan mula sa unang kahilingan nito.

**Mga deadline.** Walang background na gawain ang mag-e-expire ng pahintulot. Inihahambing ng bawat kahilingan ang deadline sa sarili nitong oras, at lumipas na ang deadline na katumbas ng oras na iyon. Ang isang naka-imbak na deadline na hindi isang may hangganang numero, o lumampas sa pinakamalaking petsa na maaaring hawakan ng isang `Date`, ay binibilang na naipasa.

**`soft` at `burst`.** Hindi nililimitahan sila ng pagpapautang. Ang `soft` key ay inaalis sa priyoridad kapag lumampas na sa bahagi nito. Isang `burst` key ang pumasa habang may kwarto ang pool. Tinatanggihan pa rin ng pool ceiling ang bawat susi kapag naabot na ng kabuuang pool ang limitasyon nito.

**Gastos sa landas ng kahilingan.** Ang isang `saturation` pool ay nagbabasa ng wala nang higit pa kaysa dati. Sa isang `consent` pool, binabasa ng isang countable na dimensyon ang iba pang mga key para lang sa isang `hard` key sa bahagi nito o mas mataas habang ang isa pang key ay nagpapahiram. Pagkatapos ay ginagawa nito ang isang read sa bawat isa pang key, sa parallel. Ang isang nabigong pagbasa ay binibilang bilang isang pagkonsumo ng 0 para sa key na iyon. Ang isang `percent` na dimensyon ay nagdaragdag ng walang nabasa, dahil hawak ng attribution book ang bawat key.

**Pag-edit ng pool.** Pinapanatili ng isang pag-edit ang pahintulot ng mga susi na nananatili. Ito ay para sa mga pag-edit ng alokasyon, pagpapalit sa buong pangkat at mga `ensure` na tawag. Ang isang inalis na key ay mawawalan ng pahintulot, at ang isang key na idinagdag pabalik ay magsisimula sa 0. Ang mga ruta ng admin ay nagbabalik ng pahintulot ng bawat key at hindi ito kailanman isusulat. Ang paglipat ng pool pabalik sa `saturation` ay nagpapanatili sa bawat nakaimbak na pahintulot, na walang epekto sa mode na iyon. Ang paglipat muli ng pool sa `consent` ay muling magpapagana sa mga nakaimbak na pahintulot na hindi pa lumipas ang deadline. Maaaring i-clear ng isang may hawak ng key ang isang nakaimbak na pahintulot sa alinmang mode.

**Pag-upgrade.** Kung umiiral na ang mga column `lending_percent` at `lending_until`, ang pag-migrate ay nagdaragdag lamang `borrow_mode`, at ang mga nakaimbak na porsyento ay mananatiling tulad ng mga ito. Nagsisimula ang bawat pool sa `saturation` mode. I-on ang `consent` sa bawat pool sa pool wizard. Walang mahihinuha mula sa mga nakaimbak na halaga.

**Mga Limitasyon.**

- Maaaring mahanap ng isang nagpapahiram ang pool sa kisame nito bago ito gumamit ng sarili nitong bahagi. Ang kapasidad na hiniram ng iba ay binibilang sa kabuuan ng pool.
- Ang tseke ay tumatakbo bago ang kahilingan at walang inilalaan. Ang mga sabay-sabay na kahilingan ay nagbabasa ng pagkonsumo bago ang anuman ay naitala, kaya ang kapasidad ng ipinahiram ay maaaring gastusin nang higit sa isang beses, na nililimitahan ng mga kahilingan sa paglipad. Ang share check ng `saturation` mode ay may parehong property.

---

## Sliding Window Counter

Ipinatupad sa `src/lib/quota/sqliteQuotaStore.ts` at `redisQuotaStore.ts`.

Dalawang bucket kada `(apiKeyId, dimensionKey)`:

- `curr`: kasalukuyang bucket (`floor(nowMs / windowMs)`)
- `prev`: nakaraang bucket (`curr - 1`)

Epektibong rolling value:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Katumpakan**: ~99% tumpak. Ang error ay hindi lalampas sa 1% ng laki ng window sa hangganan sa pagitan ng mga bucket (likas ito sa 2-bucket approximation).

### Concurrency

SQLite driver: pinipigilan ng in-memory mutex kada `(apiKeyId | dimensionKey)` key ang read-modify-write race. Ginagaya ng pattern ang anti-thundering-herd ng `src/sse/services/auth.ts`.

Redis driver: Lua EVAL script para sa atomic increment — tumatakbo bilang iisang Redis command.

---

## Mga Driver

### SQLite (default, 0-install)

- Talahanayan: `quota_consumption` (tingnan ang migration na `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Pinakamainam para sa mga deployment na may iisang instance.
- Ang lahat ng persistence ay nasa umiiral na OmniRoute SQLite DB (`DATA_DIR/storage.sqlite`).

### Redis (opsyonal, multi-instance)

- Nangangailangan ng `ioredis` npm package.
- Iniimbak ang mga counter sa Redis; nananatili sa SQLite ang metadata (mga pool/allocation).
- Pinakamainam para sa mga deployment na may maraming replica kung saan kailangang ibahagi ang mga counter.

### Pagpapalit ng mga driver

Sa pamamagitan ng settings UI (`/dashboard/settings` → Quota Store), o sa pamamagitan ng mga env var:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

Mas nauuna ang setting ng DB kaysa sa env. Kung `driver=redis` ngunit walang URL o
hindi naka-install ang `ioredis`, babalik ang factory sa SQLite at magla-log ng babala.

Pagkakasunud-sunod ng pagpili ng driver:

1. Setting ng DB na `quotaStore.driver`
2. Env na `QUOTA_STORE_DRIVER`
3. Default: `sqlite`

---

## Multi-Dimension

Ang isang pool ay maaaring magkaroon ng maraming dimensyon. Ang bawat dimensyon ay independyente:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // global pool ceiling for this dimension
}
```

**Halimbawa: Codex plan** (5h% + linggu-linggo%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Dapat matugunan ng isang kahilingan ang lahat ng dimensyon upang payagan.

### Mga dimensyon ng porsyento: per-key attribution

Ang isang porsyentong plano ay nag-uulat ng isang numero ng paggamit sa bawat account at window ng plano. Ang provider ay hindi nagbibigay ng counter sa bawat API key.

Para hatiin ang figure na iyon sa pagitan ng mga key, ang bawat pool ay nagpapanatili ng attribution book bawat account at window ng plano. hawak `src/lib/quota/percentLedger.ts` ang mga patakaran ng libro. Ginagawa `src/lib/quota/percentAttribution.ts` ang aklat sa mga numerong ginagamit ng pagpapatupad. Ang resulta ay isang pagtatantya na binuo mula sa mga token sa bawat pangunahing ruta.

#### Mga babasahin na nagpapagalaw sa aklat

Ang aklat ay gumagalaw lamang sa sariling figure ng provider para sa hiniling na window ng plano. Ang mga koneksyong ito ay nag-uulat ng isa:

| Provider                                           | Magplano ng mga bintana |
| -------------------------------------------------- | ----------------------- |
| Claude, sa pamamagitan ng isang OAuth na koneksyon | `5h`, `weekly`          |
| Codex                                              | `5h`, `weekly`          |

Ang mga ito ay hindi binibilang bilang isang pagbabasa:

- isang tugon na minarkahan ng kliyente ng provider bilang lipas na
- isang Claude window na ang porsyento ay hindi iniulat ng provider
- figure ng isa pang window, o ang pinakamasamang kaso sa mga bintana
- ang rate-limit header fallback
- isang nabigong pagbasa

Ang ibang mga provider, kabilang ang Claude na may API key, ay walang libro. Ang bawat key ay sinisingil ng 0 sa kanilang mga porsyentong dimensyon, tulad ng bago ang pagbabagong ito.

Ang isang pagbabasa ay nagbabahagi ng 30 segundong cache ng signal ng saturation. Ang pagbabasa ng Claude ay napetsahan kung kailan naobserbahan ang figure sa mga header ng tugon o nabasa mula sa endpoint ng paggamit, kung kailan alam ang oras na iyon. Ang iba pang mga pagbabasa ay napetsahan noong ginawa ang cache entry na iyon.

#### Ang iniingatan ng aklat

Ang bawat naitala na kahilingan ay nagdaragdag ng mga token nito, isang beses, sa isang counter sa bawat pool, account at key. Ang isang counter ay lumalaki lamang. Ang aklat ay nagpapanatili ng tatlong bagay:

- ang baseline: ang pigura kung kailan binuksan ang aklat o huling lumiko ang bintana
- ang huling inilapat na pigura
- bawat susi, ang token counter nito sa sandaling iyon, ay tinawag ang marka nito

Ina-update ang aklat kapag nakalkula ng pagpapatupad o ruta ng paggamit ang attribution. Ang mga pagsusulat ay pinaghahambing-at-nakatakda sa isang rebisyon na numero. Ang isang manunulat na natatalo ay muling sumusubok sa isang bagong nabasa.

#### Paano nakalkula ang bahagi ng isang susi

Ang bawat bahagi ng key ay kinukuwenta kapag binasa ang aklat. Ang paglaki ng figure mula noong ang baseline ay nahahati sa pagitan ng mga susi ayon sa proporsyon ng mga token na naruta ng bawat isa mula noong marka nito.

Together, ang mga token na iyon ay nagpapaliwanag ng hindi hihigit sa isang punto ng figure sa bawat `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` token (default 1,000). Ang paglago na hindi nila ipinapaliwanag ay panlabas. Ang baseline ay panlabas din.

Halimbawa, ang isang libro ay nagbubukas sa 0. Ang Key A ay nagruruta ng 900,000 token at ang mga pangunahing B na ruta ay 100,000. Sa figure na 60, ang bahagi ni A ay 54 puntos at ang bahagi ni B ay 6.

Ang isang counter sa ibaba ng marka ng susi nito ay nag-restart at nagbibilang nang buo. Ang isang susi na walang marka, tulad ng isang susi na sumasali sa pool sa gitna ng isang window, ay binibilang ang lahat ng mga token nito. Ang figure na nahuhuli sa mga token ay nagdudulot ng error na mawawala sa susunod na pagbabasa. Hindi ito naiipon.

`QUOTA_PERCENT_MIN_TOKENS_PER_POINT` ay binabasa sa bawat pagpapatungkol. Ang isang halaga na hindi isang may hangganang bilang ng hindi bababa sa 1 ay bumabalik sa 1,000.

#### Paano binabago ng pagbabasa ang libro

Nalalapat ang unang panuntunan sa pagtutugma:

1. **Wala pang libro:** ang pagbabasa ay nagbubukas ng libro. Ang figure nito ay ang baseline at bawat counter ay minarkahan.
2. **Mas lumang pagbabasa:** binabalewala ang pagbabasa na may petsang bago ang huling inilapat. Gayundin ang isang pagbabasa na ang oras ng pag-reset ay mas maaga nang higit sa 30 minuto kaysa sa nakaimbak.
3. **Bagong window ng provider:** isang oras ng pag-reset nang higit sa 30 minuto kaysa sa pag-ikot ng aklat sa nakaimbak. Ang figure ay nagiging baseline at bawat counter ay minarkahan muli. Ang mga susi na walang counter ay umalis sa aklat.
4. **Natapos na window:** ang isang nakaimbak na oras ng pag-reset na hindi pagkatapos ng oras ng data ng pagbabasa ay nangangahulugang natapos na ang window na iyon. Ang pagbabasa ay lumiliko ang libro, anuman ang pigura nito.
5. **Mas mataas na figure:** tanging ang huling pigura ang gumagalaw. Ang baseline at ang mga marka ay nananatili.
6. **Parehong figure:** ang figure, baseline at mga marka ay nananatili. Isang reset na oras lang na kulang ang libro ang naisulat.
7. **Mas mababang figure:** ang isang mas mababang figure ay hindi kailanman inilapat bilang tulad. Iniikot lamang nito ang libro kapag may hawak na tatlong bagay. Ito ay hindi bababa sa dalawang minuto na mas bago kaysa sa huling inilapat na pagbabasa. Walang nagsasabing ang bintana ay ang parehong bukas. Ito ay higit sa isang puntong mas mababa.

Ang window ay binibilang bilang parehong bukas kapag may tatlong bagay. Ang parehong oras ng pag-reset ay kilala. Nasa loob sila ng 30 minuto sa isa't isa. Ang nakaimbak ay nauuna pa rin sa pagbabasa. Ang isang mas mababang figure sa loob ng window na iyon ay hindi nagbabago.

Ang oras ng pag-reset ay iniimbak lamang habang nauuna ito sa oras ng data ng pagbabasa na nagdadala nito. Ang isang mas mataas na figure ay nag-iimbak ng oras ng pag-reset ng pagbabasa kapag magagamit ang isang iyon, at pinapanatili ang nakaimbak kung hindi man. Itinatala ng katumbas na numero ang oras ng pag-reset ng pagbasa nito kapag wala ang aklat. Wala itong ibang binago. Ang isang mas mababang figure na hindi iikot ang mga talaan ng libro ay walang pag-reset ng oras.

#### Kapag ginamit ang libro

Pagkatapos ng pagbabasa, gagamitin ang aklat maliban kung ang oras ng pag-reset ng naka-imbak nito ay hindi pagkatapos ng kasalukuyang oras. Ang kasong iyon ay lumitaw kapag ang isang pagbabasa na kinuha bago ang pag-reset, tulad ng isang inihatid mula sa cache, ay naobserbahan pagkatapos nito.

Kung walang magagamit na pagbabasa, ang nakaimbak na aklat ay ginagamit lamang habang maaari pa rin itong maging aklat ng kasalukuyang window. Na hawak sa dalawang kaso:

- ang oras ng pag-reset nito ay kilala at nauuna pa rin
- wala itong oras ng pag-reset, at ang huling pagbabasa na nagpabago nito ay hindi hihigit sa 15 minuto ang edad

Kung hindi, walang maiugnay, tulad ng kapag walang libro. Ang isang aklat na ang oras ng pag-reset ng nakaimbak ay lumipas na ay hindi kailanman sisingilin.

#### Pagpapatupad

Ang pagkonsumo ng isang susi sa isang porsyentong dimensyon ay ang naka-attribute na bahagi nito kasama ang bahagi ng panlabas na bahagi. Ang panlabas na bahagi ay unang gumagamit ng kapasidad na walang paghahabol sa paglalaan (100 minus ang kabuuan ng mga timbang). Tanging ang labis ay ibinabahagi sa mga susi ayon sa timbang.

Ang pagkonsumo na iyon ay inihambing sa patas na bahagi ng susi tulad ng para sa anumang iba pang dimensyon. Magsisimula pa rin ang strict mode kapag umabot sa `QUOTA_SATURATION_THRESHOLD` ang saturation signal (default 0.5). Ang bawat numero ay na-scale sa pamamagitan ng epektibong limitasyon: ang bawat-account na limitasyon ay di-minuto sa bilang ng mga account sa pool.

Ang isang absolute cap na may `capUnit: "percent"` ay binibilang lamang ang bahaging iniuugnay sa susi, na na-scale sa parehong paraan. Kumuha ng limitasyon sa bawat account na 100 at k account. Ang isang takip ng N ay naabot kapag ang bahagi ng susi ng figure ng paghahatid ng account ay umabot N/k na puntos. Ang bawat account ay sinusuri sa sarili nitong aklat. Halimbawa, sa dalawang account, naabot ang cap na 10 sa 5 puntos ng figure ng isang account.

Kapag hindi nababasa ang tindahan, walang na-attribute at sinisingil ng 0 ang bawat susi sa dimensyong iyon. Kapag nabigo ang pagsulat ng isang aklat, ginagamit ng pagpapatungkol na iyon ang aklat habang ito ay nabasa. Ang isang nabigong pagsulat ng token ay nag-iiwan ng mga token ng kahilingang iyon sa labas ng aklat. Wala sa mga pagkabigo na ito ang humaharang sa isang kahilingan.

Sa isang `consent` pool, ginagamit ng formula sa pagpapautang ang pagkonsumo ng bawat key sa porsyentong dimensyon tulad ng inilarawan sa itaas. Kapag nagpahiram ang isa pang susi, babasahin nang isang beses ang aklat at iniuugnay sa bawat susi. Kung walang magagamit na libro, ang bawat susi ay sinisingil ng 0. Ang isang susi na may timbang ay pumasa, at isang susi na may timbang na 0 ay pumasa lamang kapag ang isa pang susi ay nagpapahiram.

#### Ruta ng paggamit

Iniuulat ng `GET /api/quota/pools/{id}/usage` ang parehong mga numero sa pamamagitan ng parehong function. Ang porsyentong dimensyon ay may isang entry sa bawat pool connection sa `accounts`. Ang pinakamataas na antas `consumedTotal` at `perKey` nito ay sumasalamin sa unang entry.

Inilalapat din ng ruta ang kasalukuyang pagbabasa, upang maisulong nito ang aklat tulad ng ginagawa ng isang kahilingan. Maaaring mag-iba `internal + external` sa `consumedTotal` kapag walang magagamit na pagbabasa, o kapag hindi inilapat ang mas mababang figure.

#### Imbakan at pagpapanatili

Ang parehong mga tindahan ng quota ay nagpapanatili ng aklat. Sa SQLite, ang awtomatikong paglilinis ng database, kapag pinagana, ay nag-aalis ng mga row na hindi na-update sa loob ng 60 araw. Sa Redis, ang mga aklat at counter ng isang pool connection ay nagbabahagi ng isang susi. Mag-e-expire ito 60 araw pagkatapos nitong huling pagsulat ng token o pagbabago ng aklat. Ang isang aklat na hindi nagbabago ay hindi muling isinusulat, kaya ang cutoff ay nakatakda sa itaas ng pinakamahabang window ng plano. Ang manu-manong pag-reset ng kasaysayan ng paggamit ay nililimas din ang mga aklat sa SQLite (tingnan ang Mga Limitasyon).

#### Mga Limitasyon

- Ang lahat ng paglago ng account figure mula noong ang baseline ay hinati ng mga token sa bawat key na naruta mula noon. Kapag nangyari ang paglago na iyon ay hindi mahalaga.
- Kaya ang paggamit na ginawa sa labas OmniRoute ay sinisingil sa mga susi hanggang sa kung ano ang pinapayagan ng kanilang mga token. Kasama rito ang paggamit na ginawa bago ang unang kahilingan ng isang susi sa window, noong nakabukas na ang aklat.
- Halimbawa, ang paggamit sa labas ay nagpapataas ng account ng 60 puntos habang walang pangunahing ruta. Ang isang susi ay nagruruta ng 30,000 token at ang bilang ay umabot sa 60.6.
- Kung ang aklat ay bukas bago ang paggamit na iyon, ang bahagi ng susi ay 30 puntos. Mayroon din itong 7.65 na panlabas na paggamit, na may apat na key na may timbang na 25.
- Kung binuksan ang aklat pagkatapos ng paggamit na iyon, ang 60 puntos ay baseline. Ang bahagi ng susi ay 0.6 puntos, at nagdadala ito ng 15 ng panlabas na paggamit.
- Ang isang kahilingan o pagbisita sa ruta ng paggamit ay magbubukas ng aklat. Kaya kung ang naturang paggamit ay binibilang bilang baseline ay depende sa kung kailan binuksan ang aklat.
- Gamit ang default na palapag, ang isang susi na nagruruta ng 60,000 token habang ginagamit sa labas ay nagpapataas ng account na 60 puntos ay makakakuha ng lahat ng 60 bilang sarili nitong bahagi.
- Sa sahig sa 50,000, ang sarili nitong bahagi ay 1.2 puntos. Ang iba pang 58.8 ay panlabas at sinisingil ng timbang, tulad ng anumang panlabas na paggamit.
- Itakda ang `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` malapit sa halaga ng isang punto sa iyong plano. Kasama sa panlabas na paggamit ang trapiko sa parehong account mula sa mga susi sa labas ng pool.
- Nalalapat ang isang porsyentong cap sa bawat mode. Maaaring tanggihan ang isang naka-cap na key habang ang account ay mas mababa sa saturation threshold.
- Kumuha ng takip ng 10 at 12 puntos ng paggamit sa labas nang mas maaga sa bintana. Ang isang susi na nagruruta ng 20,000 token ay tinanggihan sa isang account figure na 12.4%.
- Ang hati ay isang pagtatantya ayon sa dami ng token. Ang isang kahilingan ay binibilang bilang mga prompt token nito kasama ang mga token ng pagkumpleto nito. Ang mga diskwento sa cache at mga presyo ng modelo ay hindi nagbabago sa bilang na iyon.
- Ang isang kahilingan na hindi nagtatapos sa status 200 ay nagtatala ng walang mga token. Ang mga halimbawa ay isang stream na dinidiskonekta ng kliyente at isang upstream na error pagkatapos maubos ang paggamit.
- Ang paggamit ng naturang kahilingan ay sinisingil sa mga key na nagtala ng mga token, hanggang sa kung ano ang pinapayagan ng kanilang mga token. Ang natitira ay panlabas. Hindi ito gumagalaw pabalik. Ang tugon na nag-uulat ng walang paggamit ng token ay hindi rin nagtatala ng mga token.
- Ang paggamit ng kasalukuyang kahilingan ay maaaring lumabas sa bahagi ng isa pang aktibong key para sa buong kahilingan. Umuuwi lang ito kapag natapos ang kahilingan sa status 200.
- Ang paggamit na sa account kapag nagbukas ang isang libro ay binibilang bilang panlabas. Sinasaklaw nito ang isang pag-upgrade, isang bagong pool at isang bagong account. Ang paggamit sa isang bagong window bago ang unang pagbabasa nito ay binibilang din bilang panlabas.
- Ang bawat susi ay nagsisimula sa bigat nitong bahagi ng paggamit na iyon, pagkatapos ng kapasidad walang pag-aangkin ng alokasyon. Sa isang account sa 85% at limang key na may timbang na 20, bawat isa ay nagsisimula sa 17 sa 20 na ginamit nito.
- Sa isang pool na may ilang mga account, inilapat ang figure ng paghahatid ng account sa kabuuan ng badyet. Ito ay hindi binago ng aklat.
- Ang isang mas mababang bilang sa loob ng isang window na iniulat ng provider bilang bukas ay hindi inilalapat. Ang oras ng pag-reset na umuurong nang higit sa 30 minuto ay itinuturing bilang isang lumang pagbabasa.
- Sa parehong mga kaso, pinapanatili ng aklat ang katayuan nito hanggang sa lumipas ang nakaimbak na oras ng pag-reset. Pagkatapos nito, hindi sisingilin ang aklat hanggang sa binabasa ito.
- Ang lunas ay ang manu-manong pag-reset ng kasaysayan ng paggamit (`POST /api/settings/purge-usage-history`). Nililinis nito ang mga attribution book at ang kanilang mga token counter sa SQLite database.
- Nililinis ng panahon `all` ang bawat libro at counter. Ang isang mas maikling panahon ay unang nililimas ang mga aklat na hindi nakasulat sa loob nito. Pagkatapos ay ki-clear nito ang mga counter na hindi nakasulat sa loob nito, ngunit para lamang sa koneksyon sa pool na walang natitirang aklat. Minarkahan pa rin ng isang iniingatang aklat ang bawat susi sa counter nito.
- Ang isang libro na ang figure ay hindi gumagalaw ay hindi muling isinulat, kaya ang isang mas maikling panahon ay maaari ding i-clear ang kasalukuyang window ng libro. Ang susunod na pagbabasa ay magbubukas ng bagong libro sa kasalukuyang figure.
- Ang pag-reset ay hindi nakakaapekto sa isang Redis quota store. Doon nagtatapos ang isang aklat sa window nito, o mag-e-expire 60 araw pagkatapos nitong huling isulat.
- Kapag hindi nagpadala ang provider ng oras ng pag-reset, ang isang window na nagre-reset at nagre-refill sa itaas ng lumang figure sa pagitan ng dalawang reading ay mukhang mas mataas na figure. Pinapanatili ng aklat ang lumang baseline at mga marka.
- Ang mga pagbabasa ay napetsahan ng lokal na orasan. Kapag nauna ito sa provider, o nag-uulat ang isang source ng oras ng pag-reset nang medyo maaga, maaaring maagang maabot ng aklat ang pagkakaibang iyon.
- Ang paglago sa maikling span na iyon ay hinati ng mga token na idinala dito. Itinatama ito ng unang pagbabasa ng susunod na window. Kapag ang nakabukas na aklat ay walang oras ng pag-reset, ang pagwawasto na iyon ay nangangailangan ng mas mababang bilang nang hindi bababa sa dalawang minutong mas bago kaysa sa huling inilapat na pagbabasa.
- Mga pagkakataong nagbabahagi ng mga pagbabasa ng petsa ng Redis store sa sarili nilang mga orasan, kaya panatilihing naka-sync ang mga orasan na iyon. Ang mga pagbabasa ng isang pagkakataon na ang orasan ay tumatakbo sa likod ay mukhang mas luma at hindi pinapansin.
- Kapag walang magagamit na pagbabasa ang dumating pagkatapos ng nakaimbak na oras ng pag-reset, ang bawat-key na porsyentong pagbabahagi at porsyento ng mga cap ay hindi ipapatupad hanggang sa bumalik ang isang pagbabasa. Nang walang oras ng pag-reset, magsisimula ito 15 minuto pagkatapos ng huling pagbabasa na nagpabago sa aklat.
- Sa Redis store, maaaring mag-expire ang isang book idle sa loob ng 60 araw sa pagitan ng tseke ng isang manunulat at pagsulat nito. Ito ay muling gagawin sa isang rebisyon sa itaas 1, na isang wastong estado.

---

## Resolver ng Plan

Ipinatupad sa `src/lib/quota/planResolver.ts`.

Pagkakasunud-sunod ng priyoridad (mula pinakamataas hanggang pinakamababa):

1. **Manu-manong override sa DB** — talahanayang `provider_plans`, para sa bawat `connectionId`.
2. **Kilalang catalog** — `src/lib/quota/planRegistry.ts` (data-only).
3. **Walang-lamang plan** — walang mga dimensyon, kinakailangan ang manu-manong configuration.

### Kilalang catalog

| Provider              | Mga Dimensyon                                                 |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, hindi alam), `tokens/weekly`            |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Walang default — kinakailangan ang manu-manong configuration  |

---

## Pagsasama ng Pipeline

### PRE hook (`open-sse/handlers/chatCore.ts`)

Tumatakbo bago ang upstream executor, pagkatapos ng auth at mga pagsusuri sa patakaran:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() per dimension
      → fairShare.decideFairShare()
      → if block → return 429 (buildErrorBody, Hard Rule #12)
      → if allow + deprioritize → set quotaSoftPenalty=true on candidate
  → executor.execute()
```

**Nabigo-bukas** : kung `enforceQuotaShare` ay naghagis, ang kahilingan ay pinapayagan sa pamamagitan ng isang `pino.warn` log. Pinipigilan nito ang isang quota-engine bug mula sa pagharang sa lahat ng trapiko.

**Kapag bumalik ang kapasidad.** Ang pagtanggi sa bahagi ng susi o sa kisame ng pool ay nagtatapos sa isa sa dalawang pangungusap, sa parehong mga mode ng paghiram:

- `percent` window: `. The <window> window resets at <time>.` Ang oras ay ang pag-reset ng mga ulat ng provider.
- Mabibilang na unit: `. Enough <window> usage is expected to clear by <time>.` Ang oras ay nasa itaas na hangganan mula sa sliding window, kung ang key ay walang ibang ipapadala.

`<time>` ay isang ISO 8601 instant sa UTC. Ang pagtanggi ay nagdadala ng `Retry-After`: ang buong segundo hanggang sa sandaling iyon, kasama ang isa. Ang isang kliyente na naghihintay ng ganoon katagal ay muling sumusubok nang hindi hihigit sa isang segundo pagkatapos ng instant. Kapag hindi alam ang instant, ang pagtanggi ay hindi nagdadala ng pangungusap o header. Ang isang ganap na pagtanggi sa takip ay hindi nagdadala ng alinman. Ang pampublikong code ay nananatiling `quota_share_blocked`.

Ang pagtanggi sa pagbabahagi ay hindi nakakaapekto sa nakabahaging koneksyon. Hindi ito nagtatakda ng cooldown, walang lock ng modelo at walang pagkabigo sa breaker ng provider, at patuloy na inihahatid ang iba pang mga susi ng pool. Kapag ang bawat target ng isang combo ay tumanggi sa susi para sa bahagi nito, ang combo ay sumasagot ng 429 nang hindi naghihintay. Ang sagot nito ay nagdadala ng pahiwatig bilang `Retry-After`. Tinatapos ng embeddings path ang pagtanggi nito sa parehong pangungusap at hindi nagpapadala `Retry-After`.

### POST hook (record na pagkonsumo)

Pagkatapos ng matagumpay na tugon:

```
executor returns success
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() per dimension
      → fail-open: errors logged as pino.warn, never propagated to client
```

**Drift note** : kung nabigo `consume` pagkatapos ng pagtugon, kulang ang bilang ng rolling counter. Itinatama ng saturation signal mula sa provider (hal. `anthropic-ratelimit-unified-5h-utilization`) ang pandaigdigang pagtatantya sa susunod na kahilingan.

### Combo soft penalty (`open-sse/services/combo.ts`)

Kapag `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // default 0.7
}
```

Ang parusa ay inilapat pagkatapos ng lahat ng iba pang mga kadahilanan sa pagmamarka. Pinabababa nito ang posibilidad ng auto-combo na pumili ng saturated key nang hindi ito hinaharangan nang husto.

---

## UI Walkthrough

### `/dashboard/costs/quota-share` — Pangunahing pahina ng pool

Mga bahagi (lahat sa `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Component              | Layunin                                                                                 |
| ---------------------- | --------------------------------------------------------------------------------------- |
| `QuotaConceptCard`     | Panimulang card na nagpapaliwanag ng pagbabahagi ng quota sa mga bagong user            |
| `CreatePoolModal`      | Gumawa ng bagong quota pool (koneksyon + name + initial allocations)                    |
| `PoolCard`             | Buod ng bawat pool: pangalan, koneksyon, bilang ng alokasyon                            |
| `DimensionBar`         | Bawat-dimensyon na nakasalansan na bar: ang bahagi ng bawat key ng + global na paggamit |
| `AllocationTable`      | Mesa na may natupok, patas na bahagi, deficit/surplus, flag ng paghiram                 |
| `BurnRateChart`        | EMA burn-rate line chart (lazy Recharts sa pamamagitan ng `dynamic()`)                  |
| `EditAllocationsModal` | I-edit ang mga timbang, cap, at patakaran ng alokasyon para sa isang pool               |
| `BorrowModeField`      | Hiram ang tagapili ng mode (`saturation` o `consent`) sa wizard                         |
| `LendingBadge`         | Read-only na badge sa isang susi na nagpapahiram, sa mga `consent` pool lang            |

Ipinapakita ng lending badge ang porsyento at, kapag itinakda, ang deadline sa UTC na may pangalang zone. Hinuhusgahan nito ang deadline sa oras ng snapshot ng paggamit. Lumalabas ang isang nag-expire o hindi nababasang deadline bilang `lending expired`.

Ang mga kawit ng pahina:

- Kinukuha ng `usePools` — `GET /api/quota/pools` tuwing 30s.
- Kinukuha ng `usePoolUsage` — `GET /api/quota/pools/[id]/usage` kapag hinihiling.
- `useLocalStoragePoolMigration` — ay tumatakbo nang isang beses sa mount para i-migrate ang legacy LS data.

Ang mga key step ng pool wizard ay may `Show usage by member to key holders` box. Itinatakda nito ang pagpipiliang `memberBreakdown` ng pool (tingnan [ang paggamit ng Miyembro](#member-usage) ). Sa ibaba nito, nagbabala ang wizard na ang isang taong nakakaalam kung ano ang isang key na ginamit ay maaaring tumugma sa isang bar sa key na iyon. Sa pamamagitan ng pag-tick sa kahon, sinasabi nito kapag ang hakbang ay naglilista ng mas kaunti sa tatlo o higit sa 20 key, habang ang mga bar ay nananatiling nakatago. Binibilang nito ang mga susi sa hakbang at hindi masasabi kung alin sa kanila ang maaaring humiling.

### `/dashboard/costs/quota-share/plans` — Provider plan config

- `ProviderPlanConfigClient.tsx`: dropdown para pumili ng provider, tingnan ang nalutas na plano (auto mula sa catalog o manu-manong override), at i-edit ang mga dimensyon.
- Isulat ang mga pagbabago sa `PUT /api/quota/plans/[connectionId]`.
- Ang pagtanggal ay babalik sa catalog o walang laman na plano.

---

## Self-Service Quota API (opt-in)

`GET /api/v1/me/quota/{provider}` (naihatid din sa `/v1/me/quota/{provider}`) ay nagbibigay-daan sa isang API key holder na basahin, gamit ang sarili nilang susi, kung gaano karami sa isang nakabahaging subscription ang sa kanila at kung ano ang humaharang sa kanila. Ang ruta ay isang manipis na shell sa ibabaw ng `src/server/selfService/quotaHandler.ts`; ang view ay binuo ng `src/lib/quota/selfView.ts` at ang tugon ng kontrata nito ay `src/shared/schemas/selfQuota.ts` (`SelfQuotaView` sa `docs/openapi.yaml`).

### Pag-enable at pagpapatunay

- Itinatampok ang flag `QUOTA_SELF_PANEL`, default `false`. Habang ito ay naka-off, ang isang kahilingan na umabot sa ruta ay makakakuha ng 404. Sa `REQUIRE_API_KEY=true`, ang client API policy ay tumatanggi sa isang nawawala o di-wastong key na may 401 bago tumakbo ang ruta, anuman ang flag. Ang isang kahilingan na walang susi ngunit isang naka-sign-in na session ng dashboard ay pumasa sa patakarang iyon at nakakakuha ng sariling sagot ng ruta. Ang flag ay lumulutas tulad ng bawat iba pang flag (dashboard o REST override, pagkatapos ay ang environment variable na may parehong pangalan); tingnan [`FEATURE_FLAGS.md`](../reference/FEATURE_FLAGS.md).
- Ang display name ng bawat pool at ang label ng bawat iskedyul ay ibinabalik sa mga may hawak ng key ng pool nang eksakto tulad ng isinulat ng administrator sa kanila. Bago buksan ang bandila, tingnan kung akma ang mga ito para basahin ng mga may hawak ng key na iyon.
- Ang susi ay binabasa mula sa mga header lamang: `Authorization: Bearer <key>` o `x-api-key: <key>`. Kapag pareho ang ipinadala, ang unang nag-validate ang gagamitin. Binabalewala ang isang susi sa string ng query o isang cookie. Tinanggihan ang environment key ng server (401).
- Kailangan ng susi ang saklaw ng `self:usage` (403 kung wala ito).
- Ang segment ng provider ay na-trim, lower-case at nilagyan ng check laban sa `^[a-z0-9][a-z0-9._-]{0,63}$` (400 kung hindi man), pagkatapos ay niresolba sa pamamagitan ng registry ng provider, kaya binabasa ng alias gaya ng `cc` ang mga `claude` pool. Binasa ng `claude` at `anthropic` ang parehong pool.

### Ano ang ipinapakita ng bawat visibility

| Visibility       | Nangangailangan                                                                        | Mga patlang                                                                                                                                                                                                                                                                                   |
| ---------------- | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sariling bahagi  | `self:usage`                                                                           | `pools[]` (ref, pangalan, provider, patakaran, timbang, cap), `dimensions[].yourShare`, `accounts[]` na may `yourShare` (sa isang `percent` window na walang `attributed` at `external`), `blocks`, `availableModels`, `expiresAt`, `apiBaseUrl`                                              |
| Antas ng account | `self:usage` + `self:account-quota`, at ang provider sa `sharedQuotaProviders` ng susi | nagdaragdag ng `dimensions[].total`, `accounts[].dimensions[].account` at `accounts[].modelWindows`, `attributed` at `external` sa `yourShare` ng isang `percent` window, at `members` sa isang pool na naka-on ang paggamit ng miyembro (tingnan [ang paggamit ng Miyembro](#member-usage) ) |

- `sharedQuotaProviders` ay isang per-key na setting (`PUT /api/keys/[id]/self-service`): `null`, ang default, ay nangangahulugang bawat provider na naaabot ng susi; ang ibig sabihin ng `[]` ay wala. Sinasabi ng `accountVisible` ng bawat pool kung aling visibility ang inilapat dito.
- Ang mga account bar at window ng modelo ay ipinapakita lamang para sa mga account na ang koneksyon ay maaaring gamitin ng key. Kapag ang key ay may listahan ng mga pinapayagang koneksyon, pinapanatili ng isang account sa labas nito ang `Account N` entry nito nang walang `account` o `modelWindows`. Ang walang laman na listahan ay nangangahulugang walang paghihigpit, tulad ng para sa `/v1/me/status`. Ang kabuuang pool (`dimensions[].total`) ay hindi nakadepende sa listahang iyon.
- Dalawang figure na ipinapakita gamit ang `self:usage` lamang ay nagmula sa paggamit ng iba pang mga key. Sinasalamin `exhausted` ng badyet ng iskedyul ang pagkonsumo ng bawat key sa ilalim ng iskedyul na iyon. Sa isang pool na ang mga timbang ay zero lahat, ang `weight` ng susi ay `100 / number of members`. Parehong nalalapat ang pagpapatupad sa susi.
- Nakikilala lang ang pool sa pamamagitan ng `ref`, isang opaque na value na nakatali sa calling key. Ang display name nito (`name`) ay kasama habang isinulat ito ng administrator. Ang isang `ref` ay nagmula sa susi at sa pool na may lihim na API-key ng server (`API_KEY_SECRET`). Hindi ito dapat ipagpatuloy ng mga kliyente: magbabago ito kung paikutin ang sikretong iyon.
- Ang mga account ay nakalista bilang `Account 1`, `Account 2`, … sa pool order. Walang ibinalik na pool id, connection id, account e-mail o pangalan ng account, at ang tugon ay dumadaan sa schema ng kontrata, na bumababa sa anumang field sa labas nito.
- Ang mga mabibilang na unit (`requests`, `tokens`, `usd`) ay iniuulat bilang pool bucket na ipinapatupad ng quota gate: `limit` = plan limit × − sa pool, `fairShare` = weight / 100 × `limit` (equal split kapag ang bawat timbang ay = ), `consumed` = ang susi ng sariling counter sa quota, `remaining` `fairShare` `consumed` sa 0.
- Inililista ng `blocks.schedules` ang mga window ng iskedyul ng susi (`open`/`closed`, `blackout` o `outside-window`, `retryAfterSeconds`, mga reserbang sahig, at kung nagastos ang badyet ng window); Inililista ng `blocks.modelCaps` ang bawat-modelo nitong mga oras-oras na cap na may pagkonsumo.
- Ang isang susi sa labas ng bawat pool ng provider ay makakakuha ng 200 na may `pools: []`; `availableModels` (ang `qtSd/` id na nakikita ng susi sa `/v1/models`), `expiresAt` at `apiBaseUrl` ay napuno pa rin.
- `apiBaseUrl` ay `OMNIROUTE_PUBLIC_API_BASE_URL`, pagkatapos ay `OMNIROUTE_PUBLIC_BASE_URL`, iba pa `null`. Ito ay hindi kailanman pinagmulan ng kahilingan.

### `status` at `reason`

| `status`      | Ibig sabihin                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ok`          | Isang kasalukuyang pagbabasa.                                                                                                                                                                                                                                                                                                                                                                                                             |
| `stale`       | Ang isang naka-cache na pagbabasa ng account ay minarkahang lipas, o isa na ang oras ng pag-reset ay lumipas na mula noong ito ay nabasa. Ang mga numero ay itinatago. Ang isang window ng modelo na lumipas na ang oras ng pag-reset ay nagmamarka ng buong `modelWindows` group `stale`. Para sa sariling bahagi ng susi ng `percent` window: binasa ang aklat nang walang account na nagbabasa sa cache ng gate upang kumpirmahin ito. |
| `unavailable` | Walang pagbabasa; ang mga numero ay `null`, hindi kailanman `0`. sabi `reason` kung bakit.                                                                                                                                                                                                                                                                                                                                                |

| `reason`                          | kailan                                                                                                                                                         |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `store_unavailable`               | Hindi mababasa ang quota store, o hindi ito makakabasa ng mga attribution book.                                                                                |
| `percent_attribution_unavailable` | Sariling bahagi ng susi sa `percent` window: wala pang attribution book para sa account at window na iyon, o hindi inilista ng aklat ang susi.                 |
| `percent_window_ended`            | Sariling bahagi ng susi sa isang `percent` window: nabibilang ang aklat sa isang window ng plano na natapos na.                                                |
| `account_not_used_by_key`         | Sariling bahagi ng susi sa isang `percent` window: ang koneksyon ng account ay nasa labas ng mga pinapayagang koneksyon ng key. Hindi binabasa ang libro nito. |
| `window_not_reported`             | Ang cache ng mga limitasyon ng provider ay walang pagbabasa para sa window ng plan na iyon.                                                                    |
| `connection_lookup_failed`        | Hindi mabasa ang koneksyon ng account.                                                                                                                         |
| `not_supported`                   | Hindi mabasa OmniRoute ang mga limitasyon sa paggamit para sa provider ng account.                                                                             |
| `fetch_failed`                    | Walang magagamit na naka-cache na pagbabasa at nabigo ang pag-refresh ng mga limitasyon ng provider.                                                           |
| `not_available`                   | Ang pagbabasa ay walang mga window ng paggamit, o ang account ay walang pagbabasa.                                                                             |

Kapag hindi mabasa ang tindahan ng quota, ang mga field ng `blocks` na sinusuportahan ng tindahan ( `exhausted` ng badyet ng iskedyul, `consumed` at `reached` ng cap ng modelo ) ay `null` din.

### Pahintulot sa pagpapahiram

Itinatala `PATCH /api/v1/me/quota/{provider}` ang sariling pahintulot ng calling key para sa isang pool. Ginagamit nito ang bandila, mga header at mga panuntunan ng provider ng `GET`. Pinapahintulutan ng saklaw ng `self:usage` ang pagsulat na ito, bagama't ang pangalan nito ay nababasa bilang read-only.

```json
{
  "pool": "qpr_0123456789abcdef0123456789abcdef",
  "lendingPercent": 30,
  "lendingUntil": 1893456000000
}
```

- Ang `pool` ay ang `ref` na ibinabalik ng `GET` para sa pool na iyon.
- `lendingPercent` ay isang integer mula 0 hanggang 100. Ang halaga ng 0 ay nag-clear ng pahintulot at ang deadline nito. Ang katawan na may `lendingPercent` 0 ay tinatanggap sa alinmang mode.
- `lendingUntil` ay opsyonal: epoch milliseconds, o `null` para sa walang deadline. Ito ay dapat sa hinaharap at hindi hihigit sa 8640000000000000. Ang halagang mas mababa sa 100000000000 ay mababasa bilang mga segundo at tinatanggihan.
- Anumang ibang larangan ay tinatanggihan. Ang isang katawan na mas mahaba sa 4096 bytes ay tinanggihan. Ang pagbabasa ay humihinto sa ganoong laki, kaya ang isang mas mahabang katawan ay hindi kailanman gaganapin nang buo.

Ang mga tseke ay tumatakbo sa pagkakasunud-sunod ng talahanayang ito. Ang bawat pagtanggi ay gumagamit ng karaniwang error body na may nakapirming mensahe. Ang pagtanggi ng isa sa mga tseke na ito ay walang isusulat.

| Katayuan | Mensahe                                                                                            | kailan                                                                         |
| -------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| 404      | `Not found`                                                                                        | Naka-off ang `QUOTA_SELF_PANEL` flag.                                          |
| 401      | `Valid API key required`                                                                           | Nawawala o hindi wasto ang susi, o ang environment key ng server.              |
| 403      | `API key lacks the self:usage scope`                                                               | Kulang ng `self:usage` ang susi.                                               |
| 400      | `Invalid provider`                                                                                 | Di-wasto ang segment ng provider.                                              |
| 429      | `Too many lending changes. Retry later.`                                                           | Ang susi ay lumampas sa limitasyon nito. Ang sagot ay nagdadala `Retry-After`. |
| 400      | `Body must be { pool, lendingPercent, lendingUntil }. lendingPercent is an integer from 0 to 100.` | Ang katawan ay hindi JSON, masyadong mahaba, o hindi tumutugma sa schema.      |
| 400      | `lendingUntil must be a Unix time in milliseconds`                                                 | Ang deadline ay nagbabasa bilang mga segundo.                                  |
| 400      | `lendingUntil must be in the future`                                                               | Ang deadline ay sa o bago ang oras ng kahilingan.                              |
| 404      | `Pool not found`                                                                                   | Hindi pinangalanan ng `ref` ang pool ng key na ito para sa provider na ito.    |
| 403      | `Lending is not enabled for this pool`                                                             | Ang pool ay nasa `saturation` mode at `lendingPercent` ay nasa itaas ng 0.     |
| 500      | `Failed to build quota view`                                                                       | Anumang iba pang kabiguan. Ang sanhi nito ay naka-log sa server.               |

Ang limitasyon ay 20 kahilingan sa bawat 60 segundo para sa bawat key. Ang bawat kahilingan na pumasa sa tseke ng provider ay binibilang, kahit isa ay tumanggi sa ibang pagkakataon o isa na walang pagbabago. Mayroon itong sariling counter, bukod sa limitasyon sa rate ng kahilingan ng susi.

Ang isang kahilingan na nagbabago sa nakaimbak na pahintulot ay nagsusulat ng isang `quota.pool.lending.updated` audit record. Pinangalanan nito ang susi ng luma at bagong mga halaga. Ang parehong katawan na ipinadala ng dalawang beses ay nagsusulat ng isang beses at nag-audit ng isang beses. Ang sagot ay 200 na may buong view `GET`, na binuo pagkatapos ng pagsulat.

Ang `GET` view ay nag-uulat ng pagpapahiram tulad ng sumusunod:

- Ang bawat pool ay nagdadala `borrowMode` (`saturation` o `consent`), at ang sariling `lendingPercent` at `lendingUntil` ng susi.
- `lendingActive` ay `true` lamang sa isang `consent` pool, na may porsyentong higit sa 0 at hindi naabot ang deadline.
- Sa isang `consent` pool, ang bawat mabibilang na `dimensions[].yourShare` ay nagdadala `borrowAvailable`. Ito ang maaaring gamitin ng susi sa itaas ng bahagi nito ngayon, na ipinahiram ng iba pang mga susi.
- Ginagamit `borrowAvailable` ang formula ng gate. Binabasa nito ang bawat iba pang susi, habang ang susi ay nasa ilalim ng bahagi nito. Para sa isang `hard` key na isang dagdag na read sa bawat isa pang key at mabibilang na dimensyon, nang magkatulad.
- `borrowAvailable` ay `null` para sa isang `soft` o `burst` key, at `null` kapag nabigo ang isang pagbasa.
- `borrowAvailable` ay isang pigura para sa lahat ng iba pang mga susi nang magkasama. Sa isang pool ng dalawang key, ito ang sariling figure ng isa pang key.
- Hindi pa naiuulat `borrowAvailable` para sa `percent` windows o sa `accounts[]`.
- Sa isang `saturation` pool, iniuulat ng view ang nakaimbak na pahintulot na may `lendingActive: false` at walang `borrowAvailable`.

### Mga pagkakamali

Every response of this route, success or error, carries `Cache-Control: no-store`. A refusal that happens before the route runs does not carry it, for example the client API policy's 401 or the IP filter's 403. Errors of the route use the standard error body with a fixed message: 400 (invalid provider), 401 (missing or invalid key), 403 (missing `self:usage`), 404 (flag off) and 500 (`Failed to build quota view`). The 500 covers any failure once the request reaches the route, including the key lookup itself; its cause is logged on the server and never returned. The errors of the `PATCH` are listed in [Lending consent](#lending-consent).

### Mga Limitasyon

- `remaining` ay bahagi ng patas na bahagi ng susi na hindi nito nagamit. Ito ay hindi isang garantiya. Maaari pa ring maghatid ng susi sa kabila nito habang may silid ang pool. Kapag ang kabuuan ng pool ay umabot `limit`, ang bawat susi ng pool ay tatanggihan, anuman ang sarili nitong `remaining`, at ang isang susi na walang `self:account-quota` ay hindi makikita ang kabuuang iyon.
- Hindi isinasaalang-alang `remaining` ang ganap na `cap` ng alokasyon. Tinatanggihan ng pagpapatupad ang susi kapag naabot ng sarili nitong pagkonsumo sa isang window ng unit ng cap ang halaga ng cap.
- Ang bar sa antas ng account ay nagmumula sa cache ng mga limitasyon ng provider at maaaring ma-lag ang desisyon sa pagpapatupad ng ilang minuto. Ang isang pagbabasa na lumipas na ang oras ng pag-reset ay iniulat bilang `stale`.
- Ang mga per-model window (`modelWindows`) ay iniuulat lamang para sa mga provider na may plan-window mapping: Claude at Codex ngayon. Para sa ibang mga provider, naroroon pa rin ang `modelWindows` kapag ipinakita ang data ng account, na may walang laman na listahan `windows`.
- Ang sariling bahagi ng susi sa isang `percent` window ay isang pagtatantya. Nagmumula ito sa attribution book at naglalaman ng bawat limitasyong nakalista sa ilalim ng "Mga dimensyon ng porsyento: per-key attribution" sa itaas.
- `consumed` ay ang bilang na inihahambing ng pagpapatupad sa patas na bahagi. Ito ay `attributed` plus `external`, eksakto. `attributed` ay ang bahaging ibinibigay ng aklat ng susi para sa mga token na ini-ruta nito. Ang `external` ay bahagi ng susi sa paggamit ng account na hindi isinasaalang-alang ng mga susi ng pool.
- Ang parehong bahagi ay ipinapadala lamang kapag ang `accountVisible` ng pool ay totoo: ang susi ay may `self:account-quota` at ang provider ay nasa `sharedQuotaProviders` nito. Ang isang susi na wala nito ay nakakakuha ng `consumed` nang mag-isa, na may parehong `status` at `reason`.
- Sa parehong bahagi at sa sarili nitong timbang, maaaring gawin ng isang may hawak ang paggamit na ginawa sa labas ng pool na sinisingil sa mga susi ng pool. Nakikita na ng may hawak na may saklaw ng account ang kabuuan ng account.
- Mababasa pa rin ng key na walang ni-ruta sa window ang external charge nito mula sa `consumed`, dahil 0 ang attributed na bahagi nito.
- Halimbawa, ang isang aklat ay nagbubukas sa 0, na may mga susi na A at B na may timbang na 50 bawat isa. Mga ruta ng Key A na 900,000 token at key B 100,000. Ang account pagkatapos ay umabot sa 60% ng limitasyon ng 100. Pagkatapos `attributed` ay 54 para sa key A at 6 para sa key B, at `external` ay 0 para sa pareho.
- Binabasa ng view ang libro at hindi kailanman isinusulat ang estado nito. Hindi ito nagbubukas ng libro, at hindi ito humihingi ng pagbabasa sa provider. Sa Redis store, inaalis ng read ang mga pinalitan na field ng rebisyon sa background, gaya ng ginagawa ng mga reads ng gate.
- Ang bahagi ay `ok` lamang habang ang cache ng gate ay mayroong pagbabasa ng account. Kung walang isa ito ay `stale`, kaya sa isang pool na walang kamakailang kahilingan ito ay nagpapakita na posibleng luma na.
- Hanggang sa dumaan sa pool ang isang kahilingan, hindi available ang bahagi. Binubuksan ng kahilingang iyon ang aklat, at ang numero ng account sa sandaling iyon ay binibilang bilang paggamit na ginawa sa labas ng pool.
- Sa isang pool na may maraming account, ginagamit ng bawat account entry ang sariling aklat ng account na iyon at ang limitasyon ng isang account. Sinusukat ng pagpapatupad ang magkabilang panig ayon sa bilang ng mga account, kaya pareho ang proporsyon.
- Ang mga bintana ng bawat modelo ay walang bahagi para sa susi. Ang aklat ay hindi nagpapanatili ng data sa bawat modelo.
- Ang mga reserbang palapag ng isang iskedyul ay hindi sinusuri ng view: ang isang iskedyul ay maaaring ipakita bilang `open` habang ang isang kahilingan ay tinanggihan nang may dahilan `schedule-reserve`.
- Kapag ang dalawang pool ng parehong key ay nagbahagi ng koneksyon, ilalapat ang pagpapatupad ng isa sa mga ito, at pareho ang listahan ng view.
- Walang limitasyon sa bawat address sa mga nabigong key na pagtatangka: sa likod ng reverse proxy na mga tumatawag ay maaaring magbahagi ng isang address (depende ito kung pinagkakatiwalaan ang mga ipinasa na address ng kliyente), kaya maaaring tanggihan ng lockout ang ruta sa bawat may hawak ng key. Sa `REQUIRE_API_KEY=true`, ang isang invalid na key ay tinanggihan ng client API policy bago tumakbo ang ruta, kasama ang 401 body ng patakarang iyon sa halip na ang rutang ito.

### Paggamit ng miyembro

Maaaring hayaan ng isang administrator ang mga may hawak ng key na makita kung paano nahahati ang paggamit ng isang window sa pagitan ng mga miyembro ng pool. Ang opsyon ay ang `memberBreakdown` ng pool , naka-off bilang default. Ito ay naka-set sa pool wizard o may `PATCH /api/quota/pools/{id}`. iulat ito `GET /api/quota/pools` at `GET /api/quota/pools/{id}`.

Ang isang dimensyon ng view ay nagdadala lamang `members` kapag ang lahat ng ito ay mayroong:

- naka-on ang opsyon ng pool
- ang pool ay may hindi hihigit sa 20 nakalaan na mga susi, at hindi bababa sa tatlo sa kanila ang maaaring gumawa ng mga kahilingan: aktibo, hindi binawi, hindi pinagbawalan at hindi lumampas sa kanilang pag-expire
- totoo ang `accountVisible` ng pool: ang susi ay may `self:account-quota` at ang provider ay nasa `sharedQuotaProviders` nito
- sa isang `percent` window, ang koneksyon ng account ay isa sa susi na maaaring gamitin
- nabasa ang sariling bahagi ng susi sa window na iyon: `status` nito ay hindi `unavailable`

Kung hindi, wala si `members`. Ito ay hindi kailanman isang walang laman na listahan.

- Ang bawat hiwa ay `{ slot, consumed, isYou }`. Tinatanggihan ng response schema ang anumang iba pang property sa isang slice, at isang listahan ng higit sa 20 slice. Ang mga hiwa ay nakalista sa pagkakasunud-sunod ng slot.
- May isang slice sa bawat nakalaan na key, kabilang ang isang key na hindi na makakagawa ng mga kahilingan. Ang isang miyembro na walang gamit ay nagpapakita ng tunay na zero.
- Ang slot 1 ay palaging ang susi sa pagtatanong, na may `isYou` true. Ang iba pang mga numero ng slot ay mga ranggo ng isang naka-key na hash. Naka-key ito ng `API_KEY_SECRET` at tinatakpan ang pool, ang asking key at ang miyembro.
- Kaya't ang mga numero ay hindi pumila sa pagitan ng mga may hawak. Para sa isang may hawak, mananatili silang pareho sa pagitan ng mga pagbisita. Maaari silang magbago kapag ang isang susi ay sumali o umalis sa pool, o kapag ang lihim na iyon ay pinaikot.
- Sa isang mabibilang na window, ang slice ay ang counter ng miyembro sa quota store, ang parehong counter ng sarili nitong `consumed`.
- Sa isang `percent` window ang isang slice ay ang `attributed` na bahagi ng miyembro, mula sa parehong aklat na binasa bilang sariling bahagi ng susi. Ang paggamit sa labas ng pool ay hindi kailanman nahahati sa mga hiwa. Ang singil na iyon ay nahati sa timbang, kaya ang mga hiwa na dala nito ay magpapakita ng mga timbang.
- Ang bawat view ay nagbabasa ng isang halaga sa bawat isa pang miyembro at mabibilang na window, nang magkatulad. Sa isang `percent` window ang mga hiwa ay walang halagang basahin nang lampas sa nabasa ng sariling libro. Kapag hindi mabasa ang isang value, walang `members` ang window na iyon, at mananatili ang sariling share ng key.
- Ang opsyon at ang bilang ng mga magagamit na key ay binabasa nang isang beses bawat pool, at para lang sa isang key na maaaring makakita ng data ng account. Ang bagsak na pagbabasa ng opsyon o ng magagamit na key na bilang ay magpapasara sa mga bar para sa pool na iyon. Ang server ay nag-log ng isang babala, at ang natitirang bahagi ng view ay binuo.

Ang mga bar ay walang mga pangalan o id. Sinasabi pa rin nila sa isang may hawak ng pangunahing bagay ang tungkol sa iba pang mga miyembro:

- Maaari pa ring itugma ng mga may hawak ang mga hiwa ayon sa kanilang mga halaga.
- Ang isang matatag na pagnunumero ay nagbibigay-daan sa isang may hawak na sundan ang isang miyembro sa paglipas ng panahon.
- Ang bilang ng mga hiwa ay nagpapakita kung gaano karaming mga susi ang inilalaan sa pool.
- Sa isang pool ng tatlong susi, maaaring sabihin ng isang taong nakakaalam kung ano ang ginamit ng isang susi kung ano ang ginamit ng huling susi.
- Kapag ang isang pool ay bumaba sa ibaba ng tatlong magagamit na mga susi, ang mga bar ay mawawala. Ang mga view na kinuha kanina ay nagpapakita pa rin kung ano ang ginamit ng bawat miyembro.
- Sa isang mabibilang na window, ang kabuuang pool na binawasan ng mga hiwa ay maaaring magpakita ng paggamit ng mga key na hindi na inilalaan.
- Ang isang miyembro na nagpapakita ng zero sa isang account at gumagamit sa isa pa ay maaaring magpakita kung aling miyembro ang gumagamit ng account.
- Sa isang mabibilang na pool na may patakarang `hard`, ang isang slice na humihinto sa paglaki sa patas na bahagi ng isang miyembro ay nagpapahiwatig sa timbang ng miyembrong iyon.

### Serye ng paggamit (`GET /api/v1/me/usage`)

ibinabalik `GET /api/v1/me/usage?range=<range>` (naihatid din sa `/v1/me/usage`) ang paggamit at halaga ng sariling mga kahilingan ng key sa pagtawag: mga kabuuan, isang entry bawat UTC araw, bawat araw at modelo, bawat modelo at bawat provider. Ibinabahagi nito ang bandila, ang mga panuntunan sa pagpapatotoo, ang saklaw ng `self:usage`, `Cache-Control: no-store` at ang error na gawi ng ruta ng quota sa itaas. Sinusuri ang susi bago `range`. Ang mga error ay 400 (`Invalid range`), 401, 403, 404 at 500 (`Failed to build usage`).

- `range` ay isa sa `1d`, `7d`, `30d` (ang default) o `90d`. Anumang iba pang halaga, isang walang laman na halaga o isang paulit-ulit na parameter ay isang 400. Ang set ay humihinto sa `90d` upang itali ang halaga ng isang tawag. Ang view ay nagbabasa ng hilaw na kasaysayan ng paggamit lamang, hindi kailanman ang mga pang-araw-araw na buod, na walang susi.
- Pinipili ang mga row sa pamamagitan ng id ng key sa pagtawag. Ang column ng key name ay hindi kailanman tumutugma, at ang mga row na naitala nang walang key id ay hindi kailanman binibilang.
- Ang pagbuo ng isang serye ay nagpapatakbo ng limang nakagrupong query sa mga row ng key sa window. Ang built series ay muling ginagamit sa loob ng 60 segundo bawat key at range, at ang isang muling ginamit na tawag ay hindi tumatakbo. `generatedAt` nito ay nagbibigay ng edad.
- Ang window ay nagtatapos kapag ang serye ay binuo. Ang isang row na nakatatak sa ibang pagkakataon, halimbawa sa pamamagitan ng clock skew, ay hindi binibilang.
- `coverage.retentionDays` ay ang raw usage-history retention setting ng operator (`retention.usageHistory` sa mga setting ng database). `coverage.truncatedByRetention` ay totoo kapag ang hiniling na hanay ay mas mahaba kaysa sa setting na iyon. Inihahambing nito ang dalawang numero at hindi sinusuri kung talagang nawawala ang mga hilera.
- Ibinabalik ang provider bilang naitala para sa sariling mga kahilingan ng susi. Ang modelo ay ang naitalang pangalan pagkatapos ng huling `/` nito, at ang mga row ay pinagsama-sama nito. Ang isang combo request na ang bawat target ay tinanggihan ay itinatala kasama ang routing label bilang provider (ang combo name, `auto` o `combo`) at ang modelong string na ipinadala ng kliyente. Iba pang mga tinanggihang kahilingan, halimbawa sa pamamagitan ng isang bukas na circuit breaker, isang modelong cooldown o isang quota-parked na paglaktaw, panatilihin ang target na provider at modelo.
- Bukod sa mga bilang at gastos, ang tugon ay nagdadala ng average na latency, mga rate ng tagumpay at mga oras ng una at huling kahilingan.
- Inililista ng `byModel` ang 50 pares ng provider-at-modelo na may pinakamaraming kahilingan. Sa mas maraming pares ang mga entry nito ay hindi nagdaragdag ng hanggang `summary`, at binibilang ng `summary.uniqueModels` ang bawat naitala na spelling ng modelo. `byModelTruncated` ay totoo, at ang isang modelo na ang mga pares ay nahuhulog sa magkabilang panig ng hiwa ay nagpapakita ng mga bahagyang kabuuan.
- Dalawang gastos ang iniulat. `costUsd` ay ang sinisingil na halaga, gaya ng ipinapakita nito sa analytics ng paggamit. Ang mga flat-rate na subscription provider, gaya ng Claude Code plan, ay nagbibilang ng $0 doon. `listPriceUsd` ay ang parehong paggamit sa presyo sa listahan ng presyo, kasama ang mga subscription. Ang isang kahilingan na ang modelo ay walang hilera ng presyo ay binibilang ang nakaimbak na halaga nito: isang gastos na iniulat ng provider, o isang kinakalkula noong naitala ang kahilingan. Isang kahilingan lang na walang binibilang na 0, na walang marker, kaya ang kabuuan ay maaaring bahagyang.
- Ang kontrata ng tugon ay `src/shared/schemas/selfUsage.ts` (`SelfUsageSeries` sa `docs/openapi.yaml`).

### Pahina ng pansariling serbisyo

Kapag naka-on `QUOTA_SELF_PANEL`, `/quota/{provider}` ay isang pampublikong pahina. Ang isang may hawak ng susi ay nagta-type ng API key doon at nakikita ang mga pool ng key na iyon para sa provider. Ang bawat pool ay nagpapakita ng isang card sa bawat pool window, na may paggamit ng pool para sa lahat at ang sariling bahagi ng susi. Ang bawat account ng pool ay may sariling mga card, kasama ang paggamit ng account at ang bahagi ng susi. Ang paggamit ng account ay lalabas lamang kapag ang susi ay maaaring makakita ng data ng account. Inililista din ng page ang mga limitasyon sa bawat modelo ng bawat account at ang sariling paggamit ng key. Lumilitaw ang isang paunawa kapag hinarangan ng isang iskedyul ang susi ngayon. Inililista ng card ang bawat cap ng bawat modelo ng susi kasama ang paggamit nito, at minarkahan ang mga naabot. `{provider}` ay isang provider id o ang alias nito (`/quota/claude`, `/quota/cc`). Isang hindi kilalang provider, at bawat `/quota/*` path habang naka-off ang flag, sumagot sa 404. Ang mga pool sa custom na OpenAI- o Anthropic-compatible na node ay walang page. Sinasagot pa sila ng API.

Walang session ang page. Ang susi ay ipinadala lamang sa `Authorization` header ng `GET /api/v1/me/quota/{provider}`, `PATCH /api/v1/me/quota/{provider}` at `GET /api/v1/me/usage`, hindi kailanman sa isang URL. Ang isang susi na tinatanggap ng server ay pinananatili sa `sessionStorage` ng tab. Gamit ang "Tandaan sa device na ito," pinananatili ito sa `localStorage` sa halip, at inaalis ito ng "Kalimutan ang key" mula sa dalawa. Ang isang susi na tinanggihan ng server ay tinanggal mula sa imbakan.

Ang isang pool sa `consent` mode ay nagpapakita ng isang lending card. Doon ang may hawak ng susi ay nagtatakda ng isang buong porsyento mula 0 hanggang 100 ng idle share ng susi upang ipahiram. Pinipili din ng may-ari kung gaano katagal ang pahintulot: hanggang sa patayin, 1 oras, 8 oras, 24 na oras, 7 araw o 30 araw. Ang isang tagal ay binibilang mula sa sandali ng pag-save. Habang ang isang deadline ay may bisa, ang may-ari ay maaaring panatilihin ito sa halip. Kung lumipas ang deadline na iyon bago ang I-save, walang ipapadala ang card at humihingi ng isa pang pagpipilian. Sa 0% walang deadline na ipinadala. Ipinapakita ng card ang nakaimbak na deadline na may pangalang time zone nito. Ang isang pahintulot na ang deadline ay lumipas ay ipinapakita bilang natapos na.

Para sa isang `hard` key, nakalista din ang card, bawat pool window, kung ano ang iba pang mga key na ipinahiram sa susi sa ngayon. Ang bawat hilera ay isang pigura para sa lahat ng iba pang mga susi nang magkasama. Sa isang pool ng dalawang key, ito ang sariling figure ng isa pang key. Ang figure na hindi iniulat ng view ay nagbabasa bilang hindi available, hindi bilang zero. Para sa isang `soft` o `burst` key ang card ay nagsasabi na walang figure na nalalapat.

Ang pool sa `saturation` mode na ang key ay nag-iimbak ng porsyento sa itaas ng 0 ay nagpapakita ng withdrawal lang. Sinasabi nito na ang nakaimbak na porsyento ay walang epekto doon. Ang button na Withdraw nito ay nagpapadala ng 0 na walang deadline. Ang pool sa `saturation` mode na may nakaimbak na 0 ay nagpapakita ng walang lending card. Pagkatapos ng pag-save, ang isang card na hindi na kailangan ng ibinalik na view ay mananatili sa mensahe nito hanggang sa muling magbago ang view ng page.

Walang nai-save hanggang sa pinindot ng may hawak ang Save o Withdraw. Ang bawat press ay nagpapadala ng isang `PATCH /api/v1/me/quota/{provider}` request, at ang pangalawang press ay walang ipinapadala habang ang una ay nakabinbin. Ang katawan ay nagdadala ng opaque na `ref` ng pool mula sa view, ang porsyento at ang deadline. Ang sagot ay ang muling itinayong view ng quota, at ipinapakita ito ng pahina nang walang pangalawang pagbabasa. Kapag nag-overlap ang dalawang save, babasahin ng page ang quota nang isang beses pagkatapos ng huling sagot. Hindi pinapanatili ng page ang pahintulot sa storage ng browser.

Ang isang tinanggihang pagbabago ay ipinaliwanag sa card sa pamamagitan ng isang text na pinili mula sa HTTP status. Hindi nababasa ang error body. Sinasabi ng 401 na hindi tinanggap ang susi at nire-reload ang quota. Sinasabi ng 403 na ang pool ay hindi kumukuha ng mga pagbabago sa pagpapautang, at ang isang 404 ay nagsasabing wala na ang pool. Parehong nag-aalok ng button na nagre-reload sa quota. Ang isang 400 o isa pang 4xx na sagot ay humihiling sa may hawak na suriin ang porsyento at ang deadline. Hinihiling ng 429 sa may hawak na maghintay, kasama ang mga segundo ng `Retry-After` kapag ang sagot ay nagbibigay sa kanila. Ang isang 5xx na sagot, isang 408 o isang network failure ay nagsasabing ang pagbabago ay maaaring hindi nai-save, at pinapanatili ang mga nai-type na halaga. Ang sagot sa labas ng kontrata ay nagre-reload ng quota. Ang isang nabigong pag-save ay hindi nag-aalis ng susi nang mag-isa. Kapag tinanggihan ang pag-reload, aalisin ng pahina ang susi tulad ng sa anumang tinanggihang pagbabasa.

Kapag natanggap na ang isang susi, magpapakita rin ang page ng card na "I-set up ang iyong mga tool" na may tatlong tab. Ang "Claude Code" ay nagbibigay ng `env` block para sa `~/.claude/settings.json`. Ang "Shell" ay nagbibigay ng parehong mga variable tulad ng mga linya `export`. Ang "Claude Desktop" ay nagbibigay ng mga halaga para sa window ng inference ng third-party nito. Ang mga modelo ay ang mga modelo ng pagbabahagi ng quota na maaaring tawagan ng susi para sa provider na iyon. Kapag walang ganoong listahan na kasama ng susi, i-on na lang ng block ang pagtuklas ng modelo ng gateway. Ang address ng gateway ay ang pampublikong API na pinagmulan na iniulat ng server (`OMNIROUTE_PUBLIC_API_BASE_URL`, pagkatapos ay `OMNIROUTE_PUBLIC_BASE_URL`). Kapag walang nakatakda, magpapakita ang card ng placeholder at sasabihin sa may hawak na tanungin ang administrator. Ang susi ay ipinapakita bilang isang placeholder. Inilalagay ng "Isama ang aking susi" ang buong susi sa teksto sa screen at kung ano ang kinokopya ng isang pindutan ng kopya. Tatagal iyon hanggang sa ma-clear ang kahon, makalimutan o mapalitan ang susi, o maiiwan ang pahina. Ang card ay hindi nagpapadala ng kahilingan at nag-aalok ng walang pag-download ng file.

Ang pagbabasa ng API marks `stale` ay ipinapakita bilang posibleng luma na. Ang pagbabasa na may markang `unavailable` ay ipinapakita kasama ang dahilan nito, hindi kailanman bilang zero.

Sa porsyento ng mga plano, kinukuha ng pahina ang sariling bahagi ng susi kapag iniulat ito ng API. Sinasabi nito na ang bilang ay isang pagtatantya at pinangalanan ang dalawang bahagi nito. Ipinapakita lamang ng mga limitasyon sa bawat modelo ang account.

Kapag ang isang window ay nagdadala `members`, ang card nito ay nagpapakita rin ng isang bar na may isang segment bawat miyembro, sa pagkakasunud-sunod ng slot. Ginagamit ng segment ng asking key ang kulay ng accent. Ang iba pang mga segment ay umiikot sa mga kulay ng tsart ng tema. Inililista ng isang text legend ang bawat segment na may halaga nito, kaya walang nakadepende sa kulay. Ang mga segment ay may label na `You` o `Member N`, kung saan ang N ang slot.

### Nakatuon na port para sa page

`QUOTA_PANEL_PORT` ay nagbubukas ng pangalawang tagapakinig na nagsisilbi lamang sa pahina ng self-service. Naka-off ito maliban kung nakatakda ang variable. `QUOTA_PANEL_HOST` ay ang bind address at ang default ay `127.0.0.1`.

Inirelay ng tagapakinig ang mga landas na ito sa pangunahing port at sinasagot ang 404 para sa bawat iba pang landas:

| Daan                                                                     | Nagsisilbi                                  |
| ------------------------------------------------------------------------ | ------------------------------------------- |
| `/quota/{provider}`                                                      | Ang pahina                                  |
| `/api/v1/me/quota/{provider}`, `/v1/me/quota/{provider}`                 | Ang quota view na binabasa ng page          |
| `/api/v1/me/usage`, `/v1/me/usage`                                       | Ang serye ng paggamit na binabasa ng pahina |
| `/_next/static/`                                                         | Mga script, istilo at font ng build         |
| `/favicon.ico`, `/favicon.svg`, `/icon-512.png`, `/apple-touch-icon.png` | Mga icon                                    |

`GET` at `HEAD` ay ipinadala nang walang katawan. Ang isang kahilingan na may katawan ay ipinadala din: isang `PATCH` ng path ng view ng quota, na ipinapadala ng page upang mag-save ng pagpipilian sa pagpapahiram. Ang anumang iba pang paraan ay sumasagot sa 404, maliban sa isang CONNECT na kahilingan, na ang koneksyon ay sarado nang walang sagot. Anumang ibang kahilingan na nagdedeklara ng isang katawan ay sumasagot sa 404 at ang koneksyon nito ay sarado. Ang mga kahilingan sa pag-upgrade ay tinatanggihan at ang kanilang koneksyon ay sarado. Ang isang path na may tuldok na segment o isang fragment marker ay tinanggihan, tulad ng sa API port. Gayundin ang target ng kahilingan na may character sa labas ng napi-print ASCII. Ang isang raw control character sa target ay sinasagot ng 400 ng HTTP parser, bago ang sariling tseke ng port na ito. Humiling ng mga header na ang framework ay nakalaan para sa sarili nitong paggamit ay hindi ipinadala: mga pangalan na nagsisimula sa `x-middleware-`, `x-invoke-`, `x-nextjs-`, `x-now-` o `x-next-`, at ang mga pangalang `x-matched-path` at `next-resume`. Ang kahilingan ay ipinadala nang wala sila. Ang dashboard, ang login page, ang management API at ang inference na mga ruta ay hindi maabot sa pamamagitan ng port na ito.

Ang `PATCH` ay dapat na may `Content-Type: application/json`, na walang parameter o may `charset=utf-8` lamang. Dapat itong magdala ng isang `Content-Length` mula 1 hanggang 4096, nakasulat bilang plain digit, at walang `Transfer-Encoding`. Ang `PATCH` na lumalabag sa isa sa mga panuntunang ito ay sumasagot sa 404. Ang ilang maling porma, gaya ng nilagdaan o paulit-ulit, ay sinasagot ng 400 ng HTTP parser bago ang sariling tseke ng port na ito. Binabasa ng port ang mga ipinahayag na byte bago ito makipag-ugnayan sa pangunahing port, at maghintay ng hindi hihigit sa 5 segundo para sa kanila. Ang katawan na hindi kumpleto noon ay sumasagot sa 404 at ang koneksyon nito ay sarado. Walang makakarating sa pangunahing port sa kasong iyon, o kapag unang umalis ang kliyente. Ang port ay nagre-relay nang eksakto sa mga ipinahayag na byte, na may parehong `Content-Length`. Ang mga byte pagkatapos ng mga ito ay binabasa bilang susunod na kahilingan sa koneksyon. Ang isang TLS reverse proxy sa harap ay dapat mag-forward `Content-Length` at hindi dapat muling i-chunk ang request body. Sinusuri ng pangunahing port ang API key sa `Authorization` header, tulad ng para sa `GET`.

Ang 404 body ay `{"error":"not_found","message":"Not found."}`. Ang isang nabigong relay ay sumasagot sa 502 (`api_bridge_unavailable`) o 504 (`api_bridge_timeout`) na walang `detail` na field.

Hindi binabasa ng tagapakinig `QUOTA_SELF_PANEL`, at hindi nito binubuksan ang pahina. Habang naka-off ang flag, ang pahina at ang API nito ay sumasagot sa 404 sa pangunahing port, at ire-relay ng tagapakinig ang sagot na iyon.

Sa ilalim ng development server (`next dev`), hindi nagiging interactive ang page sa pamamagitan ng port na ito. Ang development na hot-reload socket ay isang kahilingan sa pag-upgrade, at tinatanggihan ito ng port. Gamitin ang pangunahing port habang umuunlad.

Naghahain ang port ng plain HTTP at nagpapadala ang page ng mga API key. Panatilihin ang default na bind address at maglagay ng reverse proxy na may TLS sa harap nito. Ang isang bind address maliban sa loopback ay nagla-log sa abisong ito:

```text
[Quota Panel] Bound to <host>. This port serves plain HTTP and the page sends API keys. Put a TLS reverse proxy in front of it.
```

Ang isang loopback peer na hindi nagpapadala ng forwarding header ay binibilang bilang lokal sa pangunahing port. Kaya ang isang proxy sa parehong host ay dapat magpadala `X-Forwarded-For`. Ang isang proxy sa isang pribadong address ay pinagkakatiwalaan para sa header na iyon na may `OMNIROUTE_TRUST_PROXY=private` (o `lan`). Ang anumang iba pang peer ay iniuulat ng address ng koneksyon nito, at ang mga pagpapasahang header na ipinadala nito ay ibinabagsak.

Ang tagapakinig ay mayroong hindi hihigit sa 256 na koneksyon sa isang pagkakataon. Ang isang kliyente ay may 10 segundo upang ipadala ang mga header ng kahilingan at 30 segundo upang ipadala ang buong kahilingan. Magsasara ang isang idle na pinananatiling buhay na koneksyon pagkatapos ng humigit-kumulang 5 segundo. Ang isang koneksyon na walang aktibidad sa loob ng 60 segundo ay sarado. Ang mga halagang ito ay naayos. Magtakda rin ng mga limitasyon sa koneksyon at rate sa reverse proxy sa harap. Ang isang reverse proxy sa harap ay dapat panatilihin ang mga idle upstream na koneksyon nito nang mas mababa sa 5 segundo, o huwag gamitin muli ang mga ito. Ginagamit ng relay sa pangunahing port ang mga upstream na timeout ng API port (`API_BRIDGE_*`).

Magsisimula din ang tagapakinig kapag hindi nakatakda `API_PORT`. `QUOTA_PANEL_PORT` ay dapat na isang port mula 1 hanggang 65535, nakasulat sa mga digit lamang. Dapat itong naiiba sa dashboard port at sa API port. Habang naka-on ang live WebSocket server, dapat ay iba rin ito sa `LIVE_WS_PORT` (default 20132). Anumang iba pang halaga ay walang nagbubukas at nagla-log ng babala. Ang isang babala tungkol sa isang tinanggihang halaga ay pinangalanan ang variable at hindi inuulit ang halaga. Ang isang port na ginagamit na ay walang nagbubukas at nag-log sa babalang ito:

```text
[Quota Panel] Port <port> is already in use. The quota panel port stays off.
```

Sa set `OMNIROUTE_BASE_PATH`, inaasahan ng tagapakinig ang bawat landas sa itaas sa ilalim ng prefix na iyon. Gamitin ang parehong `OMNIROUTE_BASE_PATH` sa oras ng pagbuo at sa oras ng pagtakbo. Isulat ito gamit ang leading slash at walang trailing slash, halimbawa `/omniroute`. Ang isa pang hugis, kabilang ang `/` at `/omniroute/`, ay umaalis sa port na may babala, bagaman tinatanggap ng build ang mga form na iyon. Gayon din ang isang base path na ang unang segment ay pinangalanan ang isang ruta ng aplikasyon: `api`, `v1`, `v1beta`, `_next`, `quota`, `dashboard`, `docs`, `login`, `codex`, `responses`, `anthropic`, `openai`, `v0` o `connect`, sa anumang kaso.

Mga Limitasyon:

- `/quota/{provider}/` na may trailing slash ay sumasagot ng 404 sa port na ito.
- Hindi inihahatid ang service worker at ang manifest ng web app sa port na ito.
- Ang isang custom na favicon na nakatakda sa dashboard ay hindi ipinapakita sa port na ito.
- Hindi ipinapakita ang mga icon kapag tumatakbo ang application sa ilalim ng base path.
- Ang port ay nagsasalita ng plain HTTP/1.1.
- Ang isang bigkis na nabigo ay hindi muling susubukan hanggang sa mag-restart ang proseso.
- Ang tagapakinig ay walang koneksyon o limitasyon sa rate sa bawat address ng kliyente.
- Ang mga setup ng container ay hindi sakop ng seksyong ito.

---

## Mga variable ng kapaligiran

| Variable                             | Default          | Paglalarawan                                                                                       |
| ------------------------------------ | ---------------- | -------------------------------------------------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`                 | `sqlite`         | Driver na gagamitin: `sqlite` o `redis`                                                            |
| `QUOTA_STORE_REDIS_URL`              | _(walang laman)_ | Redis URL, hal `redis://localhost:6379`                                                            |
| `QUOTA_SATURATION_THRESHOLD`         | `0.5`            | 0..1; In-activate `>= threshold` ang strict mode                                                   |
| `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` | `1000`           | Mga token na nagpapaliwanag ng hindi hihigit sa isang punto ng isang palugit ng porsyento ng plano |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`     | `0.7`            | 0..1; multiplier para sa soft-policy combo score                                                   |
| `QUOTA_CONSUMPTION_RETENTION_DAYS`   | `14`             | Mga araw bago alisin GC ang mga lumang `quota_consumption` bucket                                  |
| `QUOTA_PANEL_PORT`                   | _(unset)_        | Nakatuon na port para sa self-service page. Ang ibig sabihin ng unset ay walang nakikinig.         |
| `QUOTA_PANEL_HOST`                   | `127.0.0.1`      | Bind address para sa port na iyon                                                                  |

i-override ang mga setting DB (`quotaStore.*`) sa mga env vars.

---

## Pag-troubleshoot

### Naka-configure ang Redis ngunit hindi kumokonekta

Tiyaking naka-install ang `ioredis` (`npm ls ioredis`) at maaabot ang `QUOTA_STORE_REDIS_URL`.
Kapag nabigo ang koneksyon, bumabalik ang factory sa SQLite (naka-log sa
`warn`).

### Nagbabalik ang `peek` ng luma / fail-open na resulta

Kung nag-throw ang `peek`, itinuturing ng `enforceQuotaShare` ang resulta bilang "payagan" (fail-open).
Tingnan ang mga log ng `pino` para sa mga entry na `quota:enforce` at `quota:factory` upang matukoy
ang ugat na sanhi.

### Paglihis ng consumption counter

Kung naiiba ang aktuwal na paggamit ng provider sa mga counter, inaasahan ito — ang
2-bucket sliding window ay may ~1% error sa mga hangganan ng window, at ang `consume` ay
fire-and-forget pagkatapos ng response. Binabasa ng saturation signal (`saturationSignals.ts`)
ang tunay na paggamit ng provider gamit ang 30s TTL at inaayos ang `globalUsedPercent`
nang naaayon.

### Nagpapakita ang pool ng "walang data" para sa burn rate

Nangangailangan ang `computeBurnRate` ng hindi bababa sa 2 dating sample. Ang mga bagong pool na walang naunang
mga tawag sa `consume` ay magpapakita ng `tokensPerSecond: 0` at `timeToExhaustionMs: null`.

---

## Migrasyon mula sa localStorage

Kapag unang nag-load ang `/dashboard/costs/quota-share`, sinusuri ng hook na `useLocalStoragePoolMigration`
ang mga sumusunod:

1. Hindi walang laman ang `localStorage.getItem("omniroute:quota-share:pools")`.
2. Nagbabalik ang `GET /api/quota/pools` ng `[]` (walang laman ang DB).

Kung parehong totoo ang mga ito, ipinapadala nito ang bawat legacy pool sa `POST /api/quota/pools` nang maramihan,
at pagkatapos ay inaalis ang localStorage key. Idempotent ang migrasyon: pinipigilan ng kundisyon 2 ang
muling pagmimigrasyon.

---

## Panloob na Klasipikasyon ng Strategy

Ang `quota-share` ay isang **panloob-lamang** na routing strategy (`INTERNAL_ROUTING_STRATEGY_VALUES` sa
`src/shared/constants/routingStrategies.ts`). Eksklusibo itong ginagamit ng mga `qtSd/` pool combo na
binuo ng system at sadyang hindi isinama sa `ROUTING_STRATEGY_VALUES` upang hindi ito kailanman
lumitaw bilang opsyong maaaring piliin ng user sa UI o API.

---

## Saklaw ng Pagsubok

Dalawang layer ng automated coverage ship na may quota-share engine:

| Suite                  | Utos                                                                   | Kung ano ang sakop nito                                                                                                                                                                                                             |
| :--------------------- | :--------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Yunit (29 na pagsubok) | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | DRR scheduler, saturation gating, concurrency caps, fairShare math, backlog queuing                                                                                                                                                 |
| Integration matrix     | `npm run test:combo:matrix`                                            | End-to-end na desisyon sa pagruruta sa pamamagitan ng totoong combo pipeline; DRR fairness + saturation deprioritization sa pamamagitan ng live seams (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

Ang integration matrix ay tumatakbo sa CI kasama ng lahat ng 22 pampublikong estratehiya. Ang unit suite ay maaaring patakbuhin nang nakapag-iisa.

---

## DB Buod ng Schema

Tatlong talahanayan na idinagdag ng mga paglilipat `078`, `079` at `085`:

- `quota_pools` + `quota_allocations` — pool na mga kahulugan at bawat key na alokasyon.
- `quota_consumption` — rolling 2-bucket counter bawat `(apiKeyId, dimensionKey)`.
- `provider_plans` — manual provider plan overrides (mga dimensyon JSON per connectionId).

Lahat ng mga talahanayan ay idinagdag sa pamamagitan ng idempotent `CREATE TABLE IF NOT EXISTS` migration.

Ang pinahintulutang pagpapahiram ay nagdaragdag ng tatlong column: `quota_allocations.lending_percent` (integer, default 0), `quota_allocations.lending_until` (epoch milliseconds, o `NULL` para sa walang deadline) at `quota_pools.borrow_mode` (default `saturation`). Ang paglilipat nito ay nagdaragdag lamang ng mga column na ito at nagsusulat ng walang umiiral na row.

Ang porsyento ng attribution book ay nagdaragdag ng `quota_percent_ledger` (isang row sa bawat pool, account at plan window) at `quota_percent_ledger_tokens` (isang token counter bawat pool, account at API key). Binabasa at isinulat `src/lib/db/quotaPercentLedger.ts` ang mga ito.
