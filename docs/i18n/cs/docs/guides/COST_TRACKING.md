# Cost & Spend Tracking (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/COST_TRACKING.md) · 🇪🇹 [am](../../../am/docs/guides/COST_TRACKING.md) · 🇸🇦 [ar](../../../ar/docs/guides/COST_TRACKING.md) · 🇦🇿 [az](../../../az/docs/guides/COST_TRACKING.md) · 🇧🇬 [bg](../../../bg/docs/guides/COST_TRACKING.md) · 🇧🇩 [bn](../../../bn/docs/guides/COST_TRACKING.md) · 🇧🇦 [bs](../../../bs/docs/guides/COST_TRACKING.md) · 🇩🇰 [da](../../../da/docs/guides/COST_TRACKING.md) · 🇩🇪 [de](../../../de/docs/guides/COST_TRACKING.md) · 🇬🇷 [el](../../../el/docs/guides/COST_TRACKING.md) · 🇪🇸 [es](../../../es/docs/guides/COST_TRACKING.md) · 🇪🇪 [et](../../../et/docs/guides/COST_TRACKING.md) · 🇮🇷 [fa](../../../fa/docs/guides/COST_TRACKING.md) · 🇫🇮 [fi](../../../fi/docs/guides/COST_TRACKING.md) · 🇫🇷 [fr](../../../fr/docs/guides/COST_TRACKING.md) · 🇮🇪 [ga](../../../ga/docs/guides/COST_TRACKING.md) · 🇮🇳 [gu](../../../gu/docs/guides/COST_TRACKING.md) · 🇳🇬 [ha](../../../ha/docs/guides/COST_TRACKING.md) · 🇮🇱 [he](../../../he/docs/guides/COST_TRACKING.md) · 🇮🇳 [hi](../../../hi/docs/guides/COST_TRACKING.md) · 🇭🇷 [hr](../../../hr/docs/guides/COST_TRACKING.md) · 🇭🇺 [hu](../../../hu/docs/guides/COST_TRACKING.md) · 🇦🇲 [hy](../../../hy/docs/guides/COST_TRACKING.md) · 🇮🇩 [id](../../../id/docs/guides/COST_TRACKING.md) · 🇳🇬 [ig](../../../ig/docs/guides/COST_TRACKING.md) · 🇮🇹 [it](../../../it/docs/guides/COST_TRACKING.md) · 🇯🇵 [ja](../../../ja/docs/guides/COST_TRACKING.md) · 🇬🇪 [ka](../../../ka/docs/guides/COST_TRACKING.md) · 🇰🇭 [km](../../../km/docs/guides/COST_TRACKING.md) · 🇮🇳 [kn](../../../kn/docs/guides/COST_TRACKING.md) · 🇰🇷 [ko](../../../ko/docs/guides/COST_TRACKING.md) · 🇱🇹 [lt](../../../lt/docs/guides/COST_TRACKING.md) · 🇱🇻 [lv](../../../lv/docs/guides/COST_TRACKING.md) · 🇮🇳 [ml](../../../ml/docs/guides/COST_TRACKING.md) · 🇮🇳 [mr](../../../mr/docs/guides/COST_TRACKING.md) · 🇲🇾 [ms](../../../ms/docs/guides/COST_TRACKING.md) · 🇲🇹 [mt](../../../mt/docs/guides/COST_TRACKING.md) · 🇲🇲 [my](../../../my/docs/guides/COST_TRACKING.md) · 🇳🇵 [ne](../../../ne/docs/guides/COST_TRACKING.md) · 🇳🇱 [nl](../../../nl/docs/guides/COST_TRACKING.md) · 🇳🇴 [no](../../../no/docs/guides/COST_TRACKING.md) · 🇮🇳 [or](../../../or/docs/guides/COST_TRACKING.md) · 🇮🇳 [pa](../../../pa/docs/guides/COST_TRACKING.md) · 🇵🇭 [phi](../../../phi/docs/guides/COST_TRACKING.md) · 🇵🇱 [pl](../../../pl/docs/guides/COST_TRACKING.md) · 🇵🇹 [pt](../../../pt/docs/guides/COST_TRACKING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/COST_TRACKING.md) · 🇷🇴 [ro](../../../ro/docs/guides/COST_TRACKING.md) · 🇷🇺 [ru](../../../ru/docs/guides/COST_TRACKING.md) · 🇱🇰 [si](../../../si/docs/guides/COST_TRACKING.md) · 🇸🇰 [sk](../../../sk/docs/guides/COST_TRACKING.md) · 🇸🇮 [sl](../../../sl/docs/guides/COST_TRACKING.md) · 🇷🇸 [sr](../../../sr/docs/guides/COST_TRACKING.md) · 🇸🇪 [sv](../../../sv/docs/guides/COST_TRACKING.md) · 🇰🇪 [sw](../../../sw/docs/guides/COST_TRACKING.md) · 🇮🇳 [ta](../../../ta/docs/guides/COST_TRACKING.md) · 🇮🇳 [te](../../../te/docs/guides/COST_TRACKING.md) · 🇹🇭 [th](../../../th/docs/guides/COST_TRACKING.md) · 🇹🇷 [tr](../../../tr/docs/guides/COST_TRACKING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/COST_TRACKING.md) · 🇵🇰 [ur](../../../ur/docs/guides/COST_TRACKING.md) · 🇺🇿 [uz](../../../uz/docs/guides/COST_TRACKING.md) · 🇻🇳 [vi](../../../vi/docs/guides/COST_TRACKING.md) · 🇳🇬 [yo](../../../yo/docs/guides/COST_TRACKING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/COST_TRACKING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/COST_TRACKING.md)

---

Jak OmniRoute odhaduje, zaznamenává a vykazuje náklady každého požadavku — a proč je
číslo na řídicím panelu **ukazatelem úspor**, nikoli účtem.

Viz také: [Uživatelská příručka](./USER_GUIDE.md) · [Přehled funkcí](./FEATURES.md)

---

## Co to je (a co to není)

OmniRoute přiřazuje každému dokončení náklady v USD za jednotlivý požadavek vynásobením počtu
tokenů cenovými sazbami modelu. Tyto údaje slouží jako podklad pro řídicí panel **Náklady**,
CLI `omniroute cost` / `omniroute usage`, exporty CSV/JSON a rozpočty jednotlivých API klíčů.

> **„Náklady“ na řídicím panelu jsou ukazatelem úspor, nikoli účtem.** OmniRoute vám nikdy nic neúčtuje
> — směruje vaše požadavky k poskytovatelům, které jste již připojili (vaše vlastní
> předplatná, bezplatné tarify a API klíče). „Celkové náklady 290 $“ vzniklé výhradně u bezplatných
> modelů znamenají, že jste placenému API **přibližně 290 $ _nezaplatili_**. Tento údaj je _odhadem_
> toho, kolik by stejný provoz stál při standardních ceníkových cenách, abyste viděli, kde
> se vaše využití soustřeďuje a kolik díky směrování k levnějším či bezplatným poskytovatelům ušetříte.

Toto pojetí je výslovně uvedeno v souboru [README](../../README.md) projektu („náklady“
na řídicím panelu jsou ukazatelem úspor, nikoli účtem).

Protože jde o odhad:

- Závisí na cenové tabulce, kterou má OmniRoute pro každý model. Model bez záznamu
  o ceně přispívá náklady `0` (v průzkumníku se zobrazuje jako řádek „Starší / bezplatné“).
- Provoz v rámci bezplatných tarifů a předplatných stále akumuluje _odhadované_ náklady — jde
  o částku, kterou šetříte, nikoli o dlužnou částku.

---

## Jak se odhadují náklady

### Zdroj ceny

Náklady pocházejí ze sloučené cenové tabulky v [`src/lib/db/settings/pricing.ts`](../../src/lib/db/settings/pricing.ts) v tomto pořadí priority (** nejvyšší první** ):

1. **Uživatelské přepisy** ceny — nastavené na řídicím panelu nebo prostřednictvím `PATCH /api/pricing` (jmenný prostor `pricing` ).
2. **synchronizace modelů.dev** — ceny načtené z `https://models.dev/api.json` (jmenný prostor `models_dev_pricing` ).
3. **synchronizace LiteLLM** ceny — získané z veřejného `model_prices_and_context_window.json` LiteLLM(jmenný prostor `pricing_synced` ).
4. **Pevně zakódované výchozí hodnoty** sazby — dodávané v [`src/shared/constants/pricing/`](../../src/shared/constants/pricing/).

Pro stejné provider/model hodnoty z vrstev s vyšší prioritou přepisují odpovídající pole v nižších vrstvách; pole nepřítomná v horní vrstvě mohou stále pocházet z nižší vrstvy. Pořadí je pevné, i když jsou obě nezávislé synchronizační úlohy spuštěny současně. `GET /api/pricing?includeSources=1` vrátí `pricing` a `sourceMap`, jejichž popisky pro model (`user`, `modelsDev`, `litellm`, `default`) označují vrstvu s nejvyšší prioritou obsahující daný model.

**synchronizace LiteLLM** je přihlášení, ve výchozím nastavení zakázáno. Jeho proměnné prostředí (viz [`.env.example`](../../.env.example) ) jsou:

| Env var                 | Výchozí   | Účel                                                                                |
| ----------------------- | --------- | ----------------------------------------------------------------------------------- |
| `PRICING_SYNC_ENABLED`  | `false`   | Povolit synchronizaci cen LiteLLM na pozadí.                                        |
| `PRICING_SYNC_INTERVAL` | `86400`   | Interval synchronizace v sekundách (denně).                                         |
| `PRICING_SYNC_SOURCES`  | `litellm` | Výběr zdroje pouze pro tuto synchronizaci; aktuálně je podporována pouze `litellm`. |

**synchronizace modelů.dev** je oddělená od synchronizace LiteLLM a je také ve výchozím nastavení zakázána. Povolte ji v Nastavení (synchronizace modelů.dev) nebo použijte tyto proměnné:

| Env var                    | Výchozí         | Účel                                                                                                                        |
| -------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `MODELS_DEV_SYNC_ENABLED`  | _(nenastaveno)_ | Unset následuje přepínač Nastavení; `1/true/on/yes` vynutí zapnutí a `0/false/off/no` vypnutí (i když to Nastavení povolí). |
| `MODELS_DEV_SYNC_INTERVAL` | `86400`         | Výchozí interval synchronizace models.dev v sekundách (denně).                                                              |

`PRICING_SYNC_SOURCES` dělá** ne** povolit modely.dev; ovládá pouze synchronizaci LiteLLM. Odstraněním uživatelského přepsání se nevymaže ani synchronizovaný jmenný prostor; začne platit další dostupná cenová vrstva. U cenově dostupného modelu před přidáním ručního přepsání zkontrolujte nastavení synchronizace i `sourceMap`.

### Nákladový vzorec

Cena se počítá na žádost z počtu tokenů a sazeb za milion tokenů v [`src/lib/usage/costCalculator.ts`](../../src/lib/usage/costCalculator.ts) (`computeCostFromPricing` / `calculateCost`):

- **Vstupní tokeny** (mínus čtení z mezipaměti a tokeny pro vytvoření mezipaměti) rychlost × `input`.
- **Tokeny čtení z mezipaměti** × `cached` rychlost (spadne zpět na vstupní rychlost).
- **Tokeny pro vytváření mezipaměti** × `cache_creation` rychlost (spadne zpět na vstupní rychlost).
- **Výstupní tokeny** sazba × `output`.
- **Tokeny zdůvodnění** × `reasoning` rychlost (spadne zpět na výstupní rychlost).

Všechny sazby jsou interpretovány jako USD za 1 000 000 tokenů. Úroveň služeb Codex „rychlá“/„priorita“ nebo „flex“ aplikuje multiplikátor nákladů (`getCodexFastCostMultiplier`) — např. flex je účtován s 50% slevou na tokenu, která se objeví jako** flex spoření** v palubní desce.

Názvy modelů jsou nejprve normalizovány (předpony cesty poskytovatele jako `openai/` nebo `accounts/fireworks/models/` jsou odstraněny), takže historické řádky stále odpovídají ceně.

### Jak se zaznamenává útrata

- Cena za požadavek se vypočítá při dokončení požadavku. Spotřeba sdílené kvóty je naplánována na další zaškrtnutí smyčky událostí prostřednictvím [`src/lib/quota/spendRecorder.ts`](../../src/lib/quota/spendRecorder.ts).
- Výdaje na klíč API jsou ukládány do vyrovnávací paměti a vyprázdněny v dávkách pomocí [`SpendBatchWriter`](../../src/lib/spend/batchWriter.ts) (výchozí interval vyprázdnění 60 s, vyrovnávací paměť 1 000 záznamů). Laditelné přes:

  | Env var                             | Výchozí | Účel                                                             |
  | ----------------------------------- | ------- | ---------------------------------------------------------------- |
  | `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS` | `60000` | Interval splachování v milisekundách.                            |
  | `OMNIROUTE_SPEND_MAX_BUFFER_SIZE`   | `1000`  | Maximální počet záznamů ve vyrovnávací paměti před vyprázdněním. |

Náklady upřednostňují přesný poplatek nahlášený poskytovatelem (`provider_cost_usd`), poté snímek požadavku s cenou podle katalogu (`calculated_cost_usd`) a poté změnu ceny tokenu z aktuálního katalogu. Uložené náklady se znovu neúčtují prostřednictvím jejich počtu tokenů. Starší řádky pouze s tokeny se stále mění, když se změní jejich katalogová cena.

### OCR a vložení

- Úspěšné požadavky `/v1/ocr` používají upstream `usage_info.pages_processed`, nikoli požadovaný rozsah stránek nebo počet vrácených objektů stránky. Odhad je stran × `ocr_cost_per_page` (absolutní USD/page,** ne** USD/million).
- Požadavky s anotací dokumentu nebo ohraničovacího rámečku vyžadují samostatný tarif `ocr_cost_per_annotated_page`. Bez toho zůstávají náklady neznámé; běžný tarif OCR není tiše nahrazen.
- LiteLLM sync mapuje své pole `annotation_cost_per_page` proti proudu na `ocr_cost_per_annotated_page`, přičemž zachovává absolutní hodnotu USD/page a záznamy pouze pro anotaci, včetně explicitní nuly. Dodané kanonické pole má přednost; neplatné hodnoty aliasů jsou ignorovány. Přepisy uživatelských cen si zachovávají svou běžnou prioritu. Viz [cenové klíče OCR společnosti LiteLLM](https://docs.litellm.ai/docs/providers/mistral_batches#batch-ocr-cost-tracking).
- Použití OCR ukládá počet stránek, jednotkovou cenu, vypočítanou cenu USD, klíč API a vybrané připojení. Stránky nejsou nikdy reprezentovány jako tokeny. Protokoly hovorů obsahují fakturační metadata, nikoli dokument URLs, PDF bajty nebo extrahovaný text.
- Úspěšné požadavky `/v1/embeddings` zaznamenají jeden řádek využití na fyzickou dávku, včetně samostatných dávek dokončených za stejnou milisekundu. Poplatky nahlášené poskytovatelem mají přednost před tokenovými odhady; kombinované obaly neúčtují žádný poplatek.
- Tyto poplatky zahrnují historii využití, analýzu nákladů, okna provider/account, limity výdajů na klíč API, knihu nákladů na požadavky a denní souhrny využití. Klíče bez protokolu zachovávají numerické účtování bez zachování zdrojového textu.
- Chybí využití nebo tarify** neznámý** , není zdarma: hlavička response-cost je vynechána a stávající zásada používání bez ceny platí pro omezené klíče API. Explicitně nakonfigurované nulové sazby zůstávají v platnosti s nulovými náklady.

Toto je pouze dopředné účetnictví. Stará volání OCR/embedding, která nikdy nezapsala historii použití, nelze z této migrace rekonstruovat. Katalogové odhady jsou odhady USD, nikoli faktury, a nezahrnují převod měn, daně ani slevy.

### Řeč a obrazy

- Úspěšné pokusy `/v1/audio/transcriptions`, `/v1/audio/speech` a generování obrázků sdílejí numerické účetnictví. Přímé a kombinované hovory nesou klíč API volajícího a vybrané spojení; kombinovaný obal nikdy nepřidá druhý debet.
- Poskytovatelem hlášená USD vítězí nad katalogovým odhadem, včetně explicitního nulového poplatku. OpenRouterJSON `usage.cost` je normalizováno na `cost_usd`. Jinak měřené tokeny používají ceny tokenů, sekundy přepisu používají ceny za sekundu, hlasový vstup používá počet znaků Unicode a obrázky s pevnou cenou používají skutečně vrácené číslo, nikoli požadované `n`.
- Binární OpenRouter TTS nemá tělo použití JSON. Po dokončení zvuku nebo zrušení volajícího se OmniRoute zeptá na své generování ID na** stejný** nakonfigurovaný původ OpenRouter. Požadavek EU se nikdy nevrací zpět ke globálnímu původu. Toto je omezené vyhledávání pouze pro čtení; syntéza se pro účetnictví znovu nezkouší. Fakturační záznamy se mohou objevit po dokončení zvuku: opakování vyhledávání běží na pozadí po dobu až 52 sekund, včetně síťových uzávěrek.
- Během tohoto vyhledávání má zvuková odpověď `X-OmniRoute-Cost-Status: pending` a žádnou hlavičku nákladů na odpověď. Jeho konečný poplatek se po odsouhlasení objeví v historii používání, analýze a hlavní knize. Pokud metadata nejsou k dispozici, použije se konfigurovaný snímek tarifu; jinak cena zůstává neznámá.
- Počty sekund, znaků a obrázků mají samostatná pole fakturačních jednotek, nikdy ne falešné počty tokenů. Účetnictví zachovává pouze numerické použití, nikoli text řeči, přepisy nebo bajty obrázků. Stávající výjimky týkající se neplacených obrázků se nemění: skutečně chybějící tarif pro obrázky nově nezamyká omezený klíč a odpověď vynechává hlavičku ceny, místo aby hovor prohlásil za bezplatný. Selhání obchodu s cenami stále uchovává důkazy o použití pro vynucení, které bylo ukončeno selháním.

Žádný historický náboj speech/image není vynalezen ani zasypán. Účtování poskytovatele zůstává referenční pro faktury a pro hovory, jejichž cena nebyla hlášena.

---

## Dashboard: stránka Náklady

Stránka **Náklady** se nachází na adrese `/dashboard/costs`
(`src/app/(dashboard)/dashboard/costs/`).
Jejím hlavním zobrazením je karta **Přehled nákladů**
(`src/app/(dashboard)/dashboard/costs/CostOverviewTab.tsx`),
která načítá veškerá data z `GET /api/usage/analytics`.

Co zobrazuje:

- **Dlaždice výdajů** — odhadované výdaje za _dnešek (1d)_, _7d_, _30d_ a vybrané
  období. Volba rozsahu: `7d`, `30d`, `90d`, `all`.
- **Hlavní metriky** — požadavky v daném období, aktivní poskytovatelé, aktivní modely,
  průměrné náklady na požadavek.
- **Průzkumník nákladů** — řaditelná a filtrovatelná tabulka seskupená podle
  **poskytovatele**, **modelu**, **API klíče**, **účtu** nebo **úrovně služby**,
  s náklady, požadavky, tokeny, průměrnými náklady na požadavek a procentuálním
  podílem na celku.
- **Využití tokenů** — celkový počet / vstupní / výstupní tokeny a poměr vstupů
  k výstupům.
- **Efektivita směrování** — počet přepnutí na záložní variantu, míra těchto přepnutí
  a pokrytí požadovaných modelů.
- **Měsíční prognóza** — odhaduje výdaje na konci měsíce podle nedávného denního
  průměru.
- **Porovnání období** — procentuální změna mezi první a druhou polovinou období.
- **Grafy** — denní vývoj nákladů, podíl poskytovatelů (výsečový graf), nejvýznamnější
  poskytovatelé, nejpoužívanější modely, náklady podle API klíče, náklady podle účtu,
  týdenní vzorec využití a teplotní mapa aktivity.
- **Export** — stažení aktuálního období ve formátu **CSV** nebo **JSON** (tlačítka se
  zobrazí, jakmile jsou k dispozici údaje s nenulovými náklady).

Pokud neexistuje žádný provoz s přiřazenou cenou, řádky se místo `$0` zobrazí se
štítkem „Starší / zdarma“, což odpovídá modelu sledování úspor.

### Související podstránky Nákladů

Oblast Náklady také obsahuje následující stránky (všechny pod `/dashboard/costs/`):

- **Ceny** (`/dashboard/costs/pricing`) — zobrazení a přepsání cen jednotlivých modelů
  (vykresluje sdílenou kartu Ceny).
- **Rozpočet** (`/dashboard/costs/budget`) — nastavení limitů výdajů pro jednotlivé
  rozsahy (vykresluje sdílenou kartu Rozpočet).
- **Sdílení kvót** (`/dashboard/costs/quota-share`) — fondy sdílených kvót a zobrazení
  rychlosti čerpání.

---

## API koncové body

Všechny tyto vyžadují oprávnění pro správu (loopback/JWT, via `requireManagementAuth`), pokud není uvedeno jinak.

### Analýza využití a nákladů

| Metoda | Koncový bod              | Účel                                                                                                                                                       |
| ------ | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/usage/analytics`   | Úplná analýza cost/usage : souhrn, denní trend, podle provider/model/API key/account/tier. Dotaz: `range`, `startDate`, `endDate`, `apiKeyIds`, `presets`. |
| `GET`  | `/api/usage/utilization` | Využití kvót na poskytovatele v průběhu času. Dotaz: `range` (`1h`/`24h`/`7d`/`30d`), `provider`.                                                          |
| `GET`  | `/api/usage/history`     | Nezpracované řádky historie využití.                                                                                                                       |
| `GET`  | `/api/usage/call-logs`   | Protokoly hovorů podle požadavku (model, tokeny, cena, latence, stav).                                                                                     |
| `GET`  | `/api/usage/quota`       | Stav kvóty poskytovatele.                                                                                                                                  |
| `GET`  | `/api/usage/proxy-logs`  | Protokoly požadavků proxy.                                                                                                                                 |

### Rozpočty

| Metoda | Koncový bod              | Účel                                                                                           |
| ------ | ------------------------ | ---------------------------------------------------------------------------------------------- |
| `GET`  | `/api/usage/budget`      | Souhrn nákladů + kontrola rozpočtu pro jeden klíč API (vyžadován parametr dotazu `apiKeyId` ). |
| `POST` | `/api/usage/budget`      | Nastavit limity daily/weekly/monthly USD prahové hodnoty varování + pro klíč API.              |
| `GET`  | `/api/usage/budget/bulk` | Hromadné souhrny rozpočtu napříč klíči API.                                                    |

> Rozpočet API je vymezen na**API klíč** (`apiKeyId`). Limity vrácené `GET /api/usage/budget` zahrnují `dailyLimitUsd`, `weeklyLimitUsd`, `monthlyLimitUsd`, a `warningThreshold` a průběžné součty (`totalCostToday`, `totalCostMonth`, …).

### Ceny

| Metoda   | Koncový bod             | Účel                                                                                                                                                              |
| -------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/pricing`          | Sloučené čtyřvrstvé ceny (uživatel, models.dev, LiteLLM, výchozí nastavení). `?includeSources=1` vrátí `pricing` + `sourceMap`.                                   |
| `PATCH`  | `/api/pricing`          | Přepsat cenu pro `{ provider: { model: { input, output, cached, … } } }`.                                                                                         |
| `DELETE` | `/api/pricing`          | Odebrat přepsání uživatelských cen (volitelně s rozsahem podle `?provider=&model=`); synchronizované sazby nebo vestavěné výchozí hodnoty zůstávají jako záložní. |
| `GET`    | `/api/pricing/defaults` | Zobrazit výchozí per-1M záložní sazby.                                                                                                                            |
| `GET`    | `/api/pricing/models`   | Cena stanovena podle modelu.                                                                                                                                      |
| `POST`   | `/api/pricing/sync`     | Spusťte ruční synchronizaci z externích zdrojů (LiteLLM).                                                                                                         |
| `GET`    | `/api/pricing/sync`     | Aktuální stav synchronizace.                                                                                                                                      |
| `DELETE` | `/api/pricing/sync`     | Jasné pouze ceny synchronizované LiteLLM (`pricing_synced`); data models.dev jsou oddělená.                                                                       |

### Další nákladově relevantní koncové body

| Metoda | Koncový bod                   | Účel                                                                           |
| ------ | ----------------------------- | ------------------------------------------------------------------------------ |
| `GET`  | `/api/free-tier/summary`      | Celkové součty tokenů zdarma, použité tento měsíc a zbývající volné povolenky. |
| `GET`  | `/api/quota/pools/[id]/usage` | Použití pro fond sdílených kvót.                                               |

---

## CLI

CLI nástroje OmniRoute zpřístupňuje příkazy pro náklady, využití a ceny (registrované v
[`bin/cli/commands/registry.mjs`](../../bin/cli/commands/registry.mjs)).

### `omniroute cost`

Přehled nákladů agregovaný z `/api/usage/analytics`.

```bash
omniroute cost                          # posledních 30 dní, seskupeno podle poskytovatele
omniroute cost --period 7d              # posledních 7 dní
omniroute cost --group-by model         # seskupit podle provider | model | combo | api-key | day
omniroute cost --since 2026-06-01 --until 2026-06-13
omniroute cost --api-key <key> --limit 50
```

Sloupce: skupina, požadavky, vstupní/výstupní tokeny, náklady (USD) a % z celkové částky. Řádek s celkovým součtem
se vypíše na konci (potlačí se pomocí `--quiet` nebo `--output json`).

### `omniroute usage`

```bash
omniroute usage analytics --period 30d [--provider <id>]   # souhrn nákladů podle poskytovatelů
omniroute usage logs [--limit 100] [--follow] [--api-key <k>] [--search <q>]
omniroute usage quota [--provider <id>] [--check]
omniroute usage utilization [--api-key <k>]
omniroute usage history [--limit 100]
omniroute usage proxy-logs [--limit 100]

# Rozpočty
omniroute usage budget list
omniroute usage budget get [scope]
omniroute usage budget set <amount> [--scope global] [--period monthly]
omniroute usage budget reset [scope]
```

### `omniroute pricing`

```bash
omniroute pricing list [--provider <p>] [--model <m>] [--limit 200]
omniroute pricing get <model>
omniroute pricing sync [--provider <p>] [--force]   # POST /api/pricing/sync
omniroute pricing diff [--model <m>]
omniroute pricing defaults show
omniroute pricing defaults set [--input <p>] [--output <p>] [--cache-read <p>] [--cache-write <p>]
```

> `pricing defaults show` načítá `GET /api/pricing/defaults`. Chcete-li místo toho upravit ceny
> jednotlivých modelů, použijte stránku **Pricing** na řídicím panelu nebo `PATCH /api/pricing`.

---

## Řešení problémů

- **Všechny náklady zobrazují $0 / „Legacy / Free“.** Používané modely nemají záznam s cenou.
  Povolte externí synchronizaci (`PRICING_SYNC_ENABLED=true`) a spusťte `omniroute pricing sync`, nebo
  nastavte ceny ručně prostřednictvím stránky Pricing / `PATCH /api/pricing`.
- **Historický model má nesprávnou cenu.** Opravte cenu (přepsáním nebo opětovnou synchronizací) — náklady se
  při každém načtení analytických údajů znovu vypočítají z počtu tokenů, takže se odhady aktualizují zpětně.
- **Údaje o útratě mají oproti reálnému času zpoždění.** Útrata podle jednotlivých klíčů se zpracovává dávkově; pokud potřebujete
  aktuálnější údaje, snižte hodnotu `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS`.

---

Informace o tom, kam tato funkce zapadá v širším kontextu řídicího panelu, najdete v [uživatelské příručce](./USER_GUIDE.md) a
v [galerii funkcí](./FEATURES.md).
