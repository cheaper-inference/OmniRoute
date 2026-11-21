# OmniRoute Auto-Combo Engine (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇪🇹 [am](../../../am/docs/routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇧🇦 [bs](../../../bs/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ha](../../../ha/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇦🇲 [hy](../../../hy/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ig](../../../ig/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇬🇪 [ka](../../../ka/docs/routing/AUTO-COMBO.md) · 🇰🇭 [km](../../../km/docs/routing/AUTO-COMBO.md) · 🇮🇳 [kn](../../../kn/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ml](../../../ml/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇲🇲 [my](../../../my/docs/routing/AUTO-COMBO.md) · 🇳🇵 [ne](../../../ne/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇮🇳 [or](../../../or/docs/routing/AUTO-COMBO.md) · 🇮🇳 [pa](../../../pa/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇱🇰 [si](../../../si/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇺🇿 [uz](../../../uz/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇳🇬 [yo](../../../yo/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

> **Kasutajatele**: Kas otsite kiiret alustamisjuhendit? Lihtsad selgitused ja näited leiate [Auto-Combo kasutusjuhendist](../getting-started/AUTO-COMBO-GUIDE.md).

> Isehallatavad mudeliahelad adaptiivse hindamise ja seadistamisvaba automaatse marsruutimisega

## Nullkonfiguratsiooniga automaatne marsruutimine (`auto/` prefiks)

> **UUS:** Kombinatsiooni pole vaja luua. Kasutage `auto/` prefiksit otse mis tahes kliendis.

### Kiirnäited

| Mudeli ID      | Variant   | Käitumine                                                                     |
| -------------- | --------- | ----------------------------------------------------------------------------- |
| `auto`         | vaikimisi | Kõik ühendatud pakkujad, LKGP strateegia, tasakaalustatud kaalud              |
| `auto/coding`  | coding    | Kvaliteeti eelistavad kaalud, sobib koodi genereerimiseks                     |
| `auto/fast`    | fast      | Madala latentsusega kaalutud valik                                            |
| `auto/cheap`   | cheap     | Kulude järgi optimeeritud marsruutimine (esmalt madalaim hind)                |
| `auto/offline` | offline   | Eelistab suurima saadaoleva kvoodiga pakkujaid                                |
| `auto/smart`   | smart     | Kvaliteeti eelistav + suurem uurimismäär (10%) mudelite paremaks avastamiseks |
| `auto/lkgp`    | lkgp      | Eksplitsiitne LKGP (sama mis vaikimisi `auto`)                                |
| `auto/chaos`   | chaos     | Paralleelne hargnemine, üks mudel pakkuja kohta (mitte tõrgete tekitamine)    |

### Kategooria × taseme kompositsioon (`auto/<category>:<tier>`)

OpenRouteri-laadsed sufiksid eraldavad **marsruudi liigi** (kategooria) sellest, **kuidas seda optimeerida** (tase), et neid saaks vabalt kombineerida (#4235 Phase B, `open-sse/services/autoCombo/suffixComposition.ts`):

- **Kategooriad** (filtreerivad kandidaatide kogumit võimekuse alusel): `coding` · `reasoning` · `vision` · `chat` · `multimodal`. `vision`/`multimodal` säilitavad nägemisvõimekusega mudelid; `reasoning` säilitab arutlus-/mõtlemismudelid.
- **Tasemed** (määravad hindamiskaalud / kogumi filtri): `fast` (kiire väljastamine) · `cheap` (alias `floor`, kulusäästlik) · `reliable` (kaitselüliti seisund + latentsuse stabiilsus) · `free` / `pro` (filtreerivad kogumit mudeli taseme järgi funktsiooni `classifyTier` kaudu — tasuta tase vs. premium-tase).

| Näide                  | Lahendub järgmiselt                                                  |
| ---------------------- | -------------------------------------------------------------------- |
| `auto/coding:fast`     | koodimiskogum, madala latentsusega kaalud                            |
| `auto/coding:cheap`    | koodimiskogum, kulude järgi optimeeritud (alias `auto/coding:floor`) |
| `auto/reasoning:pro`   | ainult arutlus-/mõtlemismudelid, premium-tase                        |
| `auto/vision`          | nägemisvõimekusega mudelid (tase puudub → tasakaalustatud kaalud)    |
| `auto/multimodal:free` | multimodaalse võimekusega mudelid, ainult tasuta tase                |

Kõik kehtivad `auto/<category>[:<tier>]` variandid lahendatakse nõudmisel; valitud alamhulka reklaamitakse `/v1/models` kaudu ja juhtpaneelil (`AUTO_SUFFIX_VARIANTS` failis `open-sse/services/autoCombo/builtinCatalog.ts`). Filtreerimine on **tõrke korral avatud** — kui ühelegi ühendatud mudelile piirang ei vasta, kasutatakse täielikku kogumit, et marsruutimine ei katkeks. Põhihindaja (`combo.ts`) jääb muutmata; kategooria-/tasemefilter rakendatakse funktsioonis `buildAutoCandidates`.

> **Reaalajas mudeliteave:** kui lipp `ARENA_ELO_SYNC_ENABLED` on sisse lülitatud, kasutab automaatne marsruutimine sobivuse hindamiseks reaalajas **Arena ELO** edetabeleid ja **models.dev** tasemeandmeid (vastasel juhul kasutatakse staatilist sobivuskaarti).

**Kasutamine:**

```bash
# Mis tahes IDE või CLI-tööriist, mis toetab OpenAI vormingut
Baas-URL: http://localhost:20128/v1
API-võti: <teie-lõpp-punkti-võti>

# Määrake oma koodis/konfiguratsioonis mudeliks:
model: "auto"                 # tasakaalustatud vaikeseade
model: "auto/coding"          # parim koodimisülesannete jaoks
model: "auto/fast"            # kiireim saadaolev
model: "auto/cheap"           # odavaim tokeni kohta
```

**Mis toimub:**

1. OmniRoute tuvastab `auto/` prefiksi failis `src/sse/handlers/chat.ts`
2. Pärib andmebaasist kõik **aktiivsed pakkujaühendused**
3. Filtreerib välja need, millel on kehtivad mandaadid (API-võti või OAuthi token)
4. Määrab mudeli ühenduse kohta (`connection.defaultModel` või pakkuja esimene mudel)
5. Koostab mälus **virtuaalse kombinatsiooni** (seda ei salvestata andmebaasi)
6. Marsruudib valitud variandi kaaluprofiili ja LKGP strateegia abil

**Põhiomadused:**

- ✅ **Alati aktiivne:** Pole vaja lülitit, kombinatsiooni loomist ega konfigureerimist
- ✅ **Dünaamiline:** Kajastab automaatselt praegu ühendatud pakkujaid
- ✅ **Seansi püsivus:** LKGP tagab viimase eduka pakkuja eelistamise
- ✅ **Mitme konto tugi:** Igast pakkujaühendusest saab eraldi kandidaat
- ✅ **Andmebaasi ei kirjutata:** Virtuaalne kombinatsioon eksisteerib ainult päringu ajal, püsisalvestuse üldkulu puudub

### Võtmepõhine kandidaatide juhtimine (#7819, Level 1+2)

`GET /v1/auto-combo/{channel}/candidates` (`{channel}` = sufiks pärast `auto/` osa või
literaal `auto` baaskanali puhul) on **kirjutuskaitstud** lõpp-punkt, mis loetleb
`auto/*` kanali praeguse kandidaatide kogumi koos reaalajas kättesaadavuse andmetega,
kasutades uuesti olemasolevaid töökindlusnäite (mitte kunagi kaitselüliti töötlemata
`state` väärtust):

- pakkuja kaitselüliti — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- ühenduse ooteaeg — `rateLimitedUntil` / `testStatus` lahendatud
  `provider_connections` real
- mudeli lukustus — `isModelLocked(provider, connectionId, model)`

Igal kandidaadil on ka selle API-võtme `excluded` lipp. Välistused salvestatakse
API-võtme kohta eraldi (`auto_candidate_overrides` tabel, migratsioon `128`) — OmniRoute
on ühe rentnikuga ning sellel puudub `users` tabel, seega on `apiKeyId` lähim tegelik
helistajapõhine identiteet — ja need jõustatakse kandidaatide kogumi kontrollpunktis
failis `open-sse/services/autoCombo/virtualFactory.ts` puhta, ühiktestitud
funktsiooni `filterExcludedCandidates()` kaudu (`open-sse/services/autoCombo/candidateOverrides.ts`).
Filter on **tõrke korral avatud**: määramata apiKeyId/channel või andmebaasiotsingu tõrge
jätavad mõlemad kogumi filtreerimata, seega näeb ilma seadistatud alistusteta operaator
marsruutimist, mis on bait-baidi haaval identne selle funktsiooni eelse käitumisega.

**Edasi lükatud järelteemasse:** kandidaadipõhised kaalud + eksplitsiitne järjestus (tase 3
— suunatakse olemasolevatesse kaalutud/prioriteedipõhise strateegia voogudesse) ning konkreetse
`combo.ts` strateegia kinnistamine iga `auto/*` kanali jaoks (tase 4). Vt #7819 plaani lahtise
küsimuse kohta, kas ühe rentnikuga mudelit arvestades peaksid alistused jääma API-võtme põhiseks või muutuma globaalseks.

**Taustal toimuv:**

```txt
Päring: { model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts tuvastab prefiksi
   ↓
createVirtualAutoCombo('coding') → candidatePool aktiivsetest ühendustest
   ↓
handleComboChat (sama mootor nagu salvestatud kombinatsioonidel)
   ↓
Automaatne hindamine valib iga päringu jaoks parima pakkuja/mudeli
```

**Teostusfailid:**

| Fail                                                      | Otstarve                                          |
| --------------------------------------------------------- | ------------------------------------------------- |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Prefiksi parser (`parseAutoPrefix`)               |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Loob virtuaalsed `AutoComboConfig` objektid       |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Testikonks pakkujate registri jäljendamiseks      |
| `src/sse/handlers/chat.ts`                                | Integratsioon: automaatse prefiksi korral otsetee |
| `src/shared/constants/providers.ts`                       | `SYSTEM_PROVIDERS.auto` süsteemikirje             |

## Salvestatud automaatkombinatsioonide kontoeelistused

Intelligentne automaatne redaktor pakub valikulist funktsiooni** Konto eelistused** osa. Iga ühendus võib olla eelistatud, tavaline (vaikeseade), reserveeritud või välistatud. Mitu ühendust võivad jagada taset. Automaatne valib esimesest sobilikust astmest, säilitades seal oma scoring/router käitumise; ebaõnnestunud katsed langevad ülejäänud konkreetsete kontode alla, eelistatakse enne tavalist enne reservi. See kombinatsioon ei kasuta kunagi välistatud ühendusi.

Seade salvestatakse kui `config.accountPreferences`, mis on klahvitud ühendusega ID:

```json
{
  "accountPreferences": {
    "connection-a": "preferred",
    "connection-b": "preferred",
    "connection-c": "reserve",
    "connection-d": "excluded"
  }
}
```

Väljajäetud või tühi kaart säilitab olemasoleva marsruudi. Eelistused ei luba keelatud ühendusi, ei anna API-võtmele juurdepääsu, ei taasta kvoodiga blokeeritud kandidaate ega jäta eelarvekontrollidest mööda. Iga katse on piiratud selle konkreetse ühendusega, nii et konto varundus ei saa hüpata kombineeritud ruuteri taha. Olemasolev seansi seanss võib säilitada sobiliku konto; omakeelse pöördega seotud konto väljajätmine peatused, mis vaikselt kontode vahetamise asemel pöörduvad.

Konfigureeritud eelistused kasutavad kontoteadlikku automaatset teed: sidumata konteksti vahemälu, nutikat torujuhet, kaose ja vari otseteid ei saadeta. Spekulatiivne riskimaandamine on nende taotluste puhul keelatud, nii et reservkontod ei saa eelistatud kontodega võistelda. Teised kombineeritud strateegiad seda sätet ei tõlgenda. Kombo muutmine valikust Auto ära jätab salvestatud eelistused hilisemaks tagasilülitamiseks.

## Kombo nimed, mis vastavad tegelikule mudeli ID-le

Kombo, mille `name` on identne alasti mudeli ID-ga (nt kombo nimeks on `gpt-5.5`), on **tahtlik ja toetatud muster**, mitte viga: see on mehhanism per-mudeli-ID pakkuja varundamiseks, mida kirjeldatakse [#6940](https://github.com/diegosouzapw/OmniRoute/issues/6940). Kuna kombo lahendamine kontrollitakse enne alasti mudeli ID lahendamist (`getComboForModel()` `src/sse/services/model.ts`), suunatakse alasti ID `gpt-5.5` päringud läbi kombo sihtmärkide (nt `acme-responses/gpt-5.5`, `backup-responses/gpt-5.5`) asemel otse ühele pakkujale – see kasutab ära kombo-enne-ümbertöötlemise eelistust, mis ehitati [#3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227) jaoks ning mida testitakse regressioonina `tests/unit/responses-combo-resolution-3227.test.ts` ja `tests/unit/combo-name-codex-responses-rewrite.test.ts` abil.

Kombo loomine või ümbernimetamine nimeks, mis varjutab tegeliku mudeli ID, **ei ole kunasi keelatud** – selline tegevus rikuks seda dokumenteeritud töövoogu. Selle asemel (#8530) lisavad `POST /api/combos` ja `PUT /api/combos/[id]` vastusele mitteblokeeriva `warning` välja, kui (uus) nimi kattub tegeliku mudeli ID-ga:

```json
{
  "warning": {
    "code": "COMBO_NAME_SHADOWS_MODEL",
    "modelId": "gpt-5.5",
    "providerId": "openai"
  }
}
```

Käivitamisel logib `scanComboModelNameCollisionsAtBoot()` (`src/instrumentation-node.ts`) ka üherealise `[STARTUP]` hoiatuse, loetledes iga olemasoleva kombo, mis varjutab mudeli ID, nii et operaatorid, kes seda juhuslikult kohtavad (mitte tahtlikult, vastavalt #6940), saavad signaali. Tuvastusabi asub `src/lib/combos/modelNameCollision.ts`.

## Kohandatud kombinatsiooni kutsumine kliendist

Püsivaid kombinatsioone (Seaded → Kombod) kasutatakse ainult siis, kui klient saadab välja `model` kombinatsiooni **täpse nime** — kombinatsiooni nime puhul ei tehta hägusat ega osalist sobitamist ning `auto/` prefiksit ei kasutata. Lahendamise järjekord (`getComboForModel()` failis `src/sse/services/model.ts`):

1. täpne kombinatsiooni nime vaste (`model: "my-combo"`),
2. prefiks `combo/<name>` (`model: "combo/my-combo"`),
3. mudeli→kombinatsiooni globaalsed vastendused (`/api/model-combo-mappings`).

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

Kaks levinud komistuskivi:

- **`auto` ei kasuta teie kombinatsioone.** `auto`/`auto/*` koostab oma nullkonfiguratsiooniga kandidaatide kogumi ja konsulteerib püsivate kombinatsioonidega ainult juhul, kui kombinatsiooni sõnasõnaline nimi on `auto` (pole soovitatav). Kombinatsiooni kaudu suunamiseks saatke selle täpne nimi — mitte `auto`.
- **`openrouter/auto` on päriselt tasuline OpenRouteri toode** ("Auto Best Available"), mitte OmniRoute’i alias. See on OpenRouteri registri ainus staatiline mudelikirje (`open-sse/config/providers/registry/openrouter/index.ts`) ja selle eest esitatakse eraldi arve. Valige Seaded → Suunamine → Peida tasulised mudelid, et see `auto` kogumitest välja jätta.

Algse segaduse kohta, mida see dokument selgitab, vaadake [#7992](https://github.com/diegosouzapw/OmniRoute/issues/7992) ja [#7111](https://github.com/diegosouzapw/OmniRoute/issues/7111).

## Kuidas see töötab (püsivad automaatsed kombinatsioonid)

Auto-Combo Engine valib iga päringu jaoks dünaamiliselt parima pakkuja/mudeli, kasutades **16 teguriga hindamisfunktsiooni** (määratletud failis `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`). Vaikekaalude summa on `1.0`; kohandatud kaalud normaliseeritakse funktsiooniga `normalizeScoringWeights()`. Kuueteistkümnest kaks — `cacheAffinity` ja `resetWindowAffinity` — kannavad vaikimisi kaalu `0`; `reliability` kannab kaalu `DEFAULT_WEIGHTS`-is `0`, kuid üldistes pakettides `0.03` ja paketis `reliability-first` `0.04`, ning `quality` kannab pakettides kaalu `0.02` (`quality-first`-is `0.03`): neid arvutatakse endiselt iga kandidaadi jaoks ning `cacheAffinity` juhib skoorist väljaspool viipade vahemälu deduplitseerimist, mistõttu null-vaikekaalu tegurid vaikimisi hääletamisel ei osale, samas kui paketid kasutavad neid.

![Auto-Combo 16 teguriga hindamine](../diagrams/exported/auto-combo-scoring.svg)

> Allikas: [diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd) (genereeri uuesti käsuga `npm run docs:render-diagrams`). Failinimi on ajalooline; lähtefail ja renderdatud diagramm näitavad kõiki 16 tegurit, mis on deklareeritud failis `DEFAULT_WEIGHTS`.

| Tegur                 | Vaikekaal | Kirjeldus                                                                                                                                                                                                           |
| :-------------------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `quota`               | 0.1429    | Allesjäänud kvoot / kiiruspiirangu varu [0..1]                                                                                                                                                                      |
| `health`              | 0.1605    | Ringkaitsme terviseskoor (CLOSED=1.0, HALF_OPEN=0.5, OPEN=0.0)                                                                                                                                                      |
| `costInv`             | 0.1429    | Pöördkulud **segakulude** põhjal (60% sisend- + 40% väljundmärgi hind, normaliseeritud) — odavam = kõrgem skoor                                                                                                     |
| `latencyInv`          | 0.1143    | Pöördväärtusena esitatud p95-latentsus, normaliseeritud kogumi suhtes — kiirem = kõrgem skoor                                                                                                                       |
| `taskFit`             | 0.0762    | Ülesandetüübi sobivus (kodeerimine, ülevaatus, planeerimine, analüüs, silumine, dokumentatsioon)                                                                                                                    |
| `stability`           | 0.0476    | Latentsuse standardhälbel põhinev stabiilsus — kandidaat, mille reageerimisaeg kõigub, saab madalama skoori                                                                                                         |
| `tierPriority`        | 0.0476    | Konto taseme prioriteet — Ultra=1.0, Pro=0.67, Standard=0.33, Free=0.0                                                                                                                                              |
| `tierAffinity`        | 0.0476    | Kandidaadi taseme ja manifestis soovitatud taseme vaheline sobivus                                                                                                                                                  |
| `specificityMatch`    | 0.0476    | Päringu spetsiifilisuse (manifesti vihje) ja mudeli taseme vaheline sobivus                                                                                                                                         |
| `contextAffinity`     | 0.0476    | Päringu kontekstiakna vajaduse ja mudeli kontekstiakna vaheline sobivus                                                                                                                                             |
| `sessionAvailability` | 0.0476    | Kandidaadi ühenduse OAuth-seansi saadavus selle seansi jaoks (`getOAuthSessionAvailability()`; mitte-OAuth-ühenduste skoor on 1.0)                                                                                  |
| `connectionDensity`   | 0.0476    | Koormuse jaotamine sama pakkuja ühenduste vahel (kontsentratsiooni vältimine)                                                                                                                                       |
| `cacheAffinity`       | 0.00      | Rendezvous-räsi sobivus ühendusega, millel on kõige tõenäolisemalt juba selle päringu viibä vahemälu prefiks (`open-sse/services/combo/promptCacheAffinity.ts`); vaikimisi keelatud (#8008)                         |
| `resetWindowAffinity` | 0.00      | Eelistus ühendustele, mille kvoodi lähtestamise aken on soodne (vaikimisi keelatud)                                                                                                                                 |
| `quality`             | 0.03      | Marsruutmissündmuste kvaliteedijälgija tagasisidel põhinev väljundikvaliteedi signaal; vaatlusteta kandidaadid saavad neutraalse väärtuse 0.5                                                                       |
| `reliability`         | 0.00      | Vaadeldud õnnestumiste osakaal, `1 - failureRate`, 24 tunni kasutusajaloo põhjal, mida piirab kümne valimi miinimum (vastasel juhul reaalaja mõõdikud); vaatlusteta kandidaatide väärtus on 1.0. Vaikimisi keelatud |

Mälusisene `quality`-jälgija (`open-sse/services/routing/quality.ts`) on pärast külma taaskäivitust tühi, mistõttu saab iga kandidaat neutraalse skoori `0.5`, kuni esimesed vaatlused saabuvad.

> **Loetamatu kvoot (#15347).** Kui teenusepakkujal on kvoodiandmete hankija, kuid see ei tagasta midagi
> loetavat (hankimise nurjumine, puuduvad mandaadid, ainult sõnumina esitatud kasutusandmed või vigane
> hetktõmmis, milles puuduvad parsitavad `windows`-id ja lõplik `percentUsed`, sealhulgas
> `percentUsed: null`), saab kandidaat `quota`-teljel hindeks `0` ning tema lõplik skoor korrutatakse
> väärtusega `UNREADABLE_QUOTA_SOFT_DEPRIORITIZE_FACTOR` (0.5, `autoStrategy.ts`), kasutades sama
> pehme karistuse mustrit nagu ühenduse oleku karistus. Ebaõnnestunud kasutusandmete lugemine annab teavet
> telemeetria, mitte teenusepakkuja kohta, seega paikneb see rangelt allpool mis tahes tegelikku näitu,
> sealhulgas kinnitatud 100% kasutusega näitu, kuid seda ei blokeerita ega eemaldata kunagi lõplikult.
> Limiidita teenusepakkuja teatab `unlimited: true` ja saab täiskvoodi skoori; teenusepakkujal, kellel
> pole registreeritud kvoodiandmete hankijat, puudub telemeetriaallikas üldse ning säilib vaikeväärtus
> `100`.

**Summa:** `0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0`, nagu on deklareeritud jaotises `DEFAULT_WEIGHTS`; kasutaja seadistatud kaalud normaliseeritakse enne hindamist funktsiooni `normalizeScoringWeights()` abil jaotuseks.

## Režiimipaketid

Failis `open-sse/services/autoCombo/modePacks.ts` on 6 eelmääratletud kaaluprofiili. Iga pakett asendab vaikekaalud täielikult, et kallutada valikut ühe eesmärgi poole. Iga paketi summa on juba `1.0` (nelja kümnendkohaga kuvatuna `0.9999`), seega pole funktsioonil `normalizeScoringWeights()` aktiivse paketi korral midagi sisulist parandada — alltoodud väärtused on ümardamist arvestades need, mida hindaja rakendab.

| Tegur                 | ship-fast  | cost-saver | quality-first | offline-friendly | reliability-first | chaos-mode |
| :-------------------- | :--------- | :--------- | :------------ | :--------------- | :---------------- | :--------- |
| `quota`               | 0.1133     | 0.1133     | 0.0752        | **0.3324**       | 0.1133            | 0.0376     |
| `health`              | 0.2667     | 0.1810     | 0.1714        | 0.2667           | **0.3524**        | **0.4000** |
| `costInv`             | 0.0276     | **0.3324** | 0.0276        | 0.0752           | 0.0181            | 0.0140     |
| `latencyInv`          | **0.3048** | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0186     |
| `taskFit`             | 0.0952     | 0.0952     | **0.3524**    | 0.0000           | 0.0952            | 0.1905     |
| `stability`           | 0.0000     | 0.0476     | 0.1429        | 0.0952           | 0.1905            | 0.1714     |
| `tierPriority`        | 0.0376     | 0.0376     | 0.0276        | 0.0376           | 0.0276            | 0.0040     |
| `tierAffinity`        | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `specificityMatch`    | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `contextAffinity`     | 0.0095     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0186     |
| `sessionAvailability` | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `resetWindowAffinity` | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `connectionDensity`   | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `quality`             | 0.02       | 0.02       | **0.03**      | 0.02             | 0.02              | 0.02       |
| `reliability`         | 0.03       | 0.03       | 0.03          | 0.03             | **0.04**          | 0.03       |

Märkused:

- **Paketid sisaldavad `quality` ja `reliability` kaale** (`quality 0.02`, `quality-first 0.03`; `reliability 0.03`, `reliability-first 0.04`) ning asendavad kaalukaardi tervikuna (`weights = pack`, mitte liitmine). `DEFAULT_WEIGHTS` sisaldab väärtusi `quality 0.03 / reliability 0`; valiku `balanced`/`default` korral säilivad need vaikeväärtused, paketi valimisel kasutatakse ülaltoodud paketi väärtusi. Külma kogumi puhul (vaatlusi pole veel tehtud, seega `quality 0.5` ja `reliability 1`) lisavad need kaks tegurit üldise paketi korral `+0.04` (`0.03 + 0.01`), paketi `quality-first` korral `+0.045` ja paketi `reliability-first` korral `+0.05`.
- `tierAffinity`, `specificityMatch` ja `resetWindowAffinity` on igas paketis selgesõnaliselt seatud väärtusele `0`.
- Iga paketi rõhuasetus lühidalt:
  - **ship-fast** → latencyInv 0.3048 + health 0.2667 (väikese latentsusega, töökorras ühendused)
  - **cost-saver** → costInv 0.3324 (võidavad odavaimad tokenid)
  - **quality-first** → taskFit 0.3524 + stability 0.1429 + quality 0.03, kõigist pakettidest kõrgeim (ülesande jaoks parim mudel, järjepidev)
  - **offline-friendly** → quota 0.3324 + health 0.2667 (maksimaalne varu kiirusest/kulust sõltumata)
  - **reliability-first** → health 0.3524 + stability 0.1905 + reliability 0.04, kõigist pakettidest kõrgeim (kõige vähem üllatusi)
  - **chaos-mode** → health 0.4000 + taskFit 0.1905 (kaalupakett, mille `auto/chaos` määrab oma paneeli liikmetele; paralleelne hargtäitmine neid kaale ei loe ja see pole tõrgete sisestamise profiil, vt [CHAOS-MODE.md](../guides/CHAOS-MODE.md#autochaos-parallel-fan-out))

### Päringupõhised juhtelemendid (päised) — #6023 / #6024 / #6025 / #3470

Kombot `auto` saab **iga päringu puhul eraldi** juhtida kolme päise kaudu, muutmata
kombo salvestatud konfiguratsiooni. Need rakenduvad ainult strateegiale `auto` ja ainult päringule,
mis neid sisaldab; päise puudumisel kasutatakse kombo salvestatud väärtusi `modePack`/`budgetCap`/`budgetFallback`.

| Päis                          | Aktsepteerib                                                                                                                                                                                  | Mõju                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| :---------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `X-OmniRoute-Mode`            | eelseadistuse alias (`fast`, `balanced`, `quality`, `cheap`, `reliable`, `offline`) või paketi toornimi (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`, `reliability-first`) | Alistab selle päringu hindamiskaalud. `balanced`/`default` sunnivad kasutama vaikimisi kaale (paketti ei kasutata). Tundmatuid väärtusi eiratakse (konfiguratsioon säilitatakse).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `X-OmniRoute-Budget`          | positiivne arv (maksimaalne USD summa päringu kohta)                                                                                                                                          | Range kululagi: kandidaadid, mille hinnanguline maksumus seda ületab, filtreeritakse enne valimist välja. Seda, mis juhtub siis, kui **kõik** kandidaadid seda ületavad, juhib allpool kirjeldatud `X-OmniRoute-Budget-Fallback`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `X-OmniRoute-Budget-Fallback` | `cheapest` (vaikimisi, aliased: `cheapest-viable`, `soft`) või `strict` (aliased: `block`, `hard`)                                                                                            | `cheapest`: varuvariandina valitakse globaalselt odavaim kandidaat, kuigi ka see ületab ülempiiri (varasem käitumine). `strict`: keeldub valikut tegemast — päring nurjub kohe vastusega `HTTP 402`, selle asemel et märkamatult eelarvet ületada. Tundmatuid väärtusi eiratakse.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `X-OmniRoute-Effort`          | `auto` (muud väärtused on reserveeritud)                                                                                                                                                      | Kohanduv mõtlemiseelarve: kui päring ei sisalda **üheski vormis** arutlusvälja (`reasoning_effort`, `reasoning`, `thinking`), teisendab lüüs väärtuse `auto` deterministlike päringu struktuuri signaalide põhjal väärtuseks `low`/`medium`/`high` (viimase kasutajasõnumi pikkus, konteksti maht kuni viimase kasutajasõnumini, varasemad tööriistatulemused, tööriistatsükli sügavus). Signaalid piirduvad praeguse pöördega — kõike pärast viimast kasutajasõnumit eiratakse — seega määratakse tööriistatsükli igale päringule sama tase (olekuta pöördepõhine fikseerimine, seansiolek puudub ja tsükli keskel ei toimu eskaleerimist, mis rikuks ülesvoolu viipade vahemälu prefikseid). Kliendi selgesõnaliselt määratud arutlusväli on alati ülimuslik. Kehtib päringutele, mille ülesvoolu suunamine kasutab OpenAI Chat Completionsi vormingut (`targetFormat === FORMATS.OPENAI`) — `reasoning_effort` on OpenAI vormingule omane väli, mistõttu ei avalda päis Claude'ile või Geminile suunatud päringule mõju (vt `open-sse/handlers/chatCore/adaptiveEffortWiring.ts`). |

```bash
# Sunni kasutama kiireimat profiili, piira selle päringu maksumus 0,05 dollariga ja blokeeri ülekulu lubamise asemel rangelt
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

Lahendamine on puhas funktsioon (`open-sse/services/autoCombo/requestControls.ts`);
lahendatud väärtused edastatakse mootori olemasolevatele sisenditele `config.modePack` / `config.budgetCap` /
`config.budgetFallback`. Kombinatsioonis salvestatud `config.budgetFallback` ("strict" |
"cheapest") määrab püsiva poliitika; päis kirjutab selle ühe päringu jaoks üle.

## Kõik marsruutimisstrateegiad

OmniRoute'i kombineerimismootor toetab **22 marsruutimisstrateegiat** (deklareeritud failis `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`). Auto Combo mootor on saadaval `auto` strateegia all; teised on saadaval püsivate kombinatsioonide jaoks.

| Strategy            | Description                                                                                                                                                                                                                                                           |
| :------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `priority`          | Esimese sihtmärgi põhine järjestatud loend koos selgesõnalise prioriteediga                                                                                                                                                                                           |
| `weighted`          | Kaalutud juhuslik valik sihtmärgipõhise kaalu alusel                                                                                                                                                                                                                  |
| `round-robin`       | Liigu sihtmärkide vahel järjestikku (pakettidena; vt allpool)                                                                                                                                                                                                         |
| `context-relay`     | Edasta kontekst sihtmärkide vahel (pikkade vestluste korral)                                                                                                                                                                                                          |
| `fill-first`        | Täida iga sihtmärgi kvoot enne järgmise juurde liikumist                                                                                                                                                                                                              |
| `p2c`               | Kahe juhuslikult valitud variandi põhine koormuse tasakaalustamine                                                                                                                                                                                                    |
| `random`            | Ühtlane juhuslik valik                                                                                                                                                                                                                                                |
| `least-used`        | Vali sihtmärk, mille praegune koormus on väikseim                                                                                                                                                                                                                     |
| `cost-optimized`    | Minimeeri päringu maksumus kataloogi hinnastuse alusel                                                                                                                                                                                                                |
| `reset-aware` ⭐    | Sea prioriteediks kvoodi lähtestamise aeg — lühemate lähtestamisakendega sihtmärgid järjestatakse ettepoole                                                                                                                                                           |
| `reset-window`      | Eelista sihtmärke, mille kvoodiaken lähtestub kõige varem                                                                                                                                                                                                             |
| `expiry-first`      | Kuluta esmalt selle konto kvoot, mis muidu aeguks kasutamata — kõige suurema jäägiga ja lähima lähtestamistähtajaga konto valitakse esimesena                                                                                                                         |
| `headroom`          | Vali kõige suurema allesjäänud kvoodivaruga sihtmärk                                                                                                                                                                                                                  |
| `quota-weighted`    | Jäta ammendunud kontod vahele, seejärel vali ülejäänute seast sihtmärk allesjäänud kvoodi ja käimasolevate päringute koormuse suhte alusel; olemasolevad vestlused jäävad seotud sihtmärgiga                                                                          |
| `strict-random`     | Juhuslik valik ilma korduste eemaldamiseta                                                                                                                                                                                                                            |
| `auto`              | Kasuta Auto Combo hindamist (16 tegurit) — **soovitatav**                                                                                                                                                                                                             |
| `lkgp`              | Viimati teadaolevalt toimiv tee (seob valiku viimati õnnestunud teenusepakkujaga ja langeb seejärel reeglitele tagasi)                                                                                                                                                |
| `context-optimized` | Vali praeguse konteksti suurusega kõige paremini sobiv sihtmärk                                                                                                                                                                                                       |
| `cache-optimized`   | Järjesta sihtmärgid prompti vahemälu sobivuse alusel — ühendust, millel on kõige tõenäolisemalt juba selle päringu vahemällu salvestatud prefiks, proovitakse esimesena (`open-sse/services/combo/promptCacheAffinity.ts`, #8008)                                     |
| `fusion` 🧬         | Saada päring paralleelselt mudelite paneelile ja koosta seejärel hindaja abil üks vastus (vt allpool)                                                                                                                                                                 |
| `pipeline`          | Käivita sihtmärgid järjestikku, edastades iga sammu väljundi järgmise sammu sisendiks; tagastatakse ainult lõplik vastus (#6396)                                                                                                                                      |
| `jev`               | Kasutaja järjestatud eelistuste loend; TypeSafe Jev otsustab, millised kirjed selle päringu puhul käivitatakse. Võitja valitakse esimesena, teised lubatud sihtmärgid säilitavad kasutaja järjestuse. Kui Jev pole saadaval, kasutatakse kasutaja järjestust (#15276) |

⭐ = Uus versioonis v3.8.0 · 🧬 = Uus versioonis v3.8.36

### `weighted` semantika

`weighted` on **proportsionaalne juhuslik valik iga päringu kohta**
(`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`), mitte võrdsustaja:

- Iga päring valib tõenäosusega **`weight / totalWeight`** ühe sammu; ülejäänud sammud järjestatakse kaalu kahanevas järjekorras selle päringu varuahelaks.
- Samm, mille kaal on `0` (või puudub), **ei ole kunagi valitav**, kui mõne teise sammu kaal on > 0 — see saab olla varuvalik ainult pärast valitud sammu ebaõnnestumist. Valik muutub ühtlaseks alles siis, kui kõik kaalud on 0.
- Sammud, mille kõik sihtmärgid pole saadaval — teenusepakkuja kaitselüliti `OPEN`, ühenduse jahtumisperiood, mudeli lukustus — eemaldatakse enne valiku tegemist (`open-sse/services/combo/targetResolution.ts`), mistõttu võib üks terve samm ajutiselt võita kõik päringud.
- `stickyWeightedLimit` (kombinatsiooni konfiguratsioon, vaikeväärtus `1` = väljas) hoiab valitud sammu kasutusel määratud arvu järjestikuste õnnestumisteni, enne kui tehakse uus valik.

Range pöörlemise jaoks kasutage `round-robin`; võrdsed kaalud strateegias `weighted` tagavad statistilise, mitte range tasakaalu.

### Agentse torujuhtme režiim

Vähemalt kahe mudeliga `pipeline`-kombinatsioon võib `config.agenticOrchestration.enabled` abil lubada planeerija/täitja marsruutimise. Esimene sihtmärk vastutab planeerimise ja lõplike vastuste eest; teine sihtmärk väljastab kliendi loomulikus vormingus tööriistakutseid. OmniRoute tuvastab päringuprotokollist tööriistatulemuste jätkud, küsib planeerijalt, kas vaja on veel üht tööriistavooru, ning määrab dünaamiliselt kliendile nähtavaks lõppsammuks kas täitja või planeerija.

Valikuline `config.agenticOrchestration.contextCompaction` rakendab enne iga planeerija või täitja väljakutset eraldi päringu mahu eelarvet. Lubage see sõnaselgelt:

```json
{
  "enabled": true,
  "defaultMaxChars": 400000,
  "targetRatio": 0.72,
  "toolResultMaxChars": 24000,
  "modelMaxChars": { "provider/planner": 175000, "provider/executor": 300000 }
}
```

Need on operaatori valitud serialiseeritud JSON-märgi eelarved, mitte märgipõhised kontekstiaknad ega ülesvoolu süsteemide garanteeritud piirangud. Täpsed mudeli ID-d alistavad vaikeväärtuse. Lävendi ületamisel eemaldab tihendamine identsed tööriistadefinitsioonid, kärbib liiga suure tööriistatõendi kokkuvõtte abil ning eemaldab vanad lõpetatud ajaloorühmad sihtsuhte suunas. Säilitatakse süsteemi-/arendajajuhised, uusim kasutajapäring, viimane tööriistavoor koos paralleelsete kutsete ja tulemustega ning Gemini juhtiv marsruutimisjuhis. Ülataseme juhised ja tööriistaseaded säilitatakse. Eemaldatud ajaloo kohta lisatakse eemaldamise marker; see on deterministlik kärpimine, mitte semantiline kokkuvõte. Kui allesjäänud kinnistatud kontekst ületab endiselt eelarvet, tagastatakse enne mudeliga ühenduse loomist vastus 413. Kui tihendamine on keelatud või lävi pole ületatud, edastatakse päring muutmata kujul.

Tööriistatulemuste jätkude korral peatab OmniRoute täitmise ka siis, kui kaks järjestikust lõpetatud vooru kordavad samu tööriistakutseid muutmata tulemustega või kui kõik sõnaselgelt märgitud tulemused kahes järjestikuses voorus ebaõnnestusid. Muutunud tulemused lubavad korduvaid kutseid (näiteks küsitluse korral). Valve lähtestatakse uue kasutajapäringu korral, paralleelsed kutsed koondatakse üheks vooruks ning toetatud on Anthropic, Chat Completionsi, Responsesi ja Gemini ajalood. Planeerija saab põhjuse ning vastutab lõpliku vastuse eest isegi siis, kui ta taotleb uut tööriistavooru.

Pärast teist sihtmärki olevad mudelid järjestatakse täitja varuvariantideks. Ebaõnnestunud HTTP-vastus või transpordierand viib järgmise täitjani, edastades sama planeerijaotsuse ja loomulikud tööriistad, kuid kasutades selle täitja enda sammusõnet ja lahendatud ühendust. Esimene edukas vastus tagastatakse muutmata kujul, sealhulgas SSE-voona; pärast eduka voo algust tekkinud tõrkeid ei saa siin uuesti proovida. Kui kõik täitjad ebaõnnestuvad, tagastatakse viimane tõrge. Kliendi katkestus peatab väljasaatmise.

```json
{
  "strategy": "pipeline",
  "models": [{ "model": "provider/planner" }, { "model": "provider/executor" }],
  "config": {
    "agenticOrchestration": { "enabled": true, "maxToolRounds": 8 }
  }
}
```

Täitja võib ühes vastuses väljastada mitu sõltumatut kutset. Sõltuvaid kutseid käsitletakse hilisemates kliendi tööriistatulemuste voorudes ning planeerija vaatab läbi iga tulemuse. `maxToolRounds` vaikeväärtus on `8` ja lubatud vahemik `1`–`32`; limiidi saavutamisel peab planeerija koostama parima saadaoleva lõpliku vastuse. Planeerija sisemised otsused puhverdatakse, samal ajal kui valitud kliendile nähtav vastus säilitab algse voogesituseelistuse.

### `round-robin` kleepuv pakett ja kontode laiendamine

Round-robin toimub pakettidena, mitte ühe päringu kaupa sammu kohta:

- `stickyRoundRobinLimit` (kombinatsiooni konfiguratsioon, seejärel `comboStickyRoundRobinLimit`, seejärel `settings.stickyRoundRobinLimit`, vaikeväärtus **3**) hoiab sama sihtmärki kasutusel määratud arvu järjestikuste õnnestumisteni, enne kui toimub pööramine. Ühe päringu kaupa pööramiseks määrake kombinatsiooni alistamisväärtuseks `1`. Kombinatsiooniredaktor näitab tegelikku väärtust ja selle päritolukihti.
- `connectionAwareExpansion` (kombinatsiooni konfiguratsioon, seejärel seaded, vaikeväärtus **false**) laiendab iga teenusepakkuja taseme sammu enne pööramist kontopõhisteks sihtmärkideks. Group-B strateegiad (priority, weighted, round-robin, random, p2c, least-used, cost-optimized, lkgp, fill-first, strict-random, context-optimized, cache-optimized, context-relay, fusion, pipeline, jev) säilitavad teenusepakkuja taseme vaate, kuni see on sisse lülitatud. Kombinatsiooniredaktor pakub valikuid inherit / on / off; inherit kasutab globaalset vaikeväärtust (off).
- Päringupuhvri lokaalsuse marsruutimine (`promptCacheAffinityEnabled`, vaikeväärtus **true**) järjestab kinnistatud ühendused ümber nii, et sobivate puhvri võtmete korral jäädakse ühele kontole. See on eelisjärjekorras round-robin- ja kaalupõhise pööramise ees kinnistatud kontopõhiste sammude vahel. Range pööramise vajaduse korral lülitage see välja menüüs Seaded → kombinatsioonide vaikeväärtused. Kombinatsioonipõhist alistamist ei ole.

Ühe mudeli mitme konto vahel pööramiseks eelistage **ühte dünaamilise kontoga sammu** (tühi `connectionId`, kogu kogum) kleepuva limiidiga `1`, mitte kolme kinnistatud `connectionId`-d. Kinnistatud sammud koos afiinsusega koonduvad samale kontole isegi siis, kui RR-loendur edasi liigub.

## Fusioonistrateegia

`fusion` on ainus strateegia, mis **ei vali** üht sihtmärki. See saadab viiba
**kõigile paneelimudelitele paralleelselt**, seejärel sünteesib konfigureeritav
**kohtunikumudel** kõigist paneelivastustest ühe lõpliku vastuse. Porditud ülesvoolu projektist `decolua/9router`
(OpenRouteri Fusioni disain); teostus asub failis `open-sse/services/fusion.ts`.

Kuidas see töötab:

0. **Tööriistu sisaldavate päringute möödaviik** — päring, mis sisaldab mittetühja massiivi `tools` ja mille
   `tool_choice` ei ole otseselt `"none"`, jätab paneeli täielikult vahele: see suunatakse otse
   ühele mudelile (konfigureeritud kohtunikule või `panel[0]`-ile), kus `tools`/`tool_choice`
   edastatakse muutmata kujul. Paneeliliikmetel puudub juurdepääs tööriistadele ja kohtuniku sünteesidirektiiv
   heidutab tööriistakutsete väljastamist, seega saavad agentseid/tööriistu kasutavad kliendid
   sünteesitud proosa asemel tegeliku tööriistakutse otsuse (#6771).
1. **Hargnemine** (ainult tööriistu mittesisaldavate päringute korral) — viip saadetakse kõigile paneeli
   mudelitele korraga, sundides kasutama voogedastuseta režiimi ja eemaldades tööriistad (kohtunik vajab
   sünteesimiseks täielikku proosat).
2. **Kvoorumi järelaja kogumine** — niipea kui saabuvad `minPanel` vastust, käivitub mahajääjate jaoks
   lühike järelaja taimer, seejärel jätkub fusioon kõigi selleks hetkeks kogutud vastustega.
   See piirab kõige aeglasema mudeli mõju kogukestusele, mida piirab absoluutne ajalõpp.
3. **Kohtuniku süntees** — paneelivastused muudetakse anonüümseks (`Source 1`, `Source 2`, … — nii
   hindab kohtunik sisu, mitte mudeli kaubamärki) ja antakse kohtunikule, kes analüüsib konsensust /
   vastuolusid / osalist katvust / ainulaadseid tähelepanekuid / pimedaid alasid ning kirjutab seejärel
   **ühe** autoriteetse vastuse. Kohtuniku kutse säilitab kliendi algse `stream` lipu + tööriistad,
   nii et voogedastus ja järgnev tööriistakasutus toimivad endiselt.
4. **Sujuv taandumine** — 0 paneelivastust → `503`; täpselt 1 allesjäänu → see vastus tagastatakse otse
   (midagi pole sünteesida); ühe mudeliga paneel vastab otse.

Paneeliliige võib olla ka `combo-ref` samm (`{kind: "combo-ref", comboName: "..."}`), mis viitab
teisele kombole — see lahendatakse **ühe musta kasti paneelihäälena** (täielik rekursiivne lähetamine
viidatud kombosse, mitte selle combo enda sihtmärkide hargnemine), kasutades sama sügavuse- ja tsüklite
kaitset, mida juba kasutavad kõik teised `combo-ref`-i tarbivad strateegiad (#6764).

### Konfiguratsioon

Konfigureeritakse combo `config`-plokis (skeemi migratsiooni pole vaja — taaskasutatakse olemasolevat
`combos`-tabelit):

| Väli                                     | Tüüp     | Vaikeväärtus         | Otstarve                                                                                               |
| :--------------------------------------- | :------- | :------------------- | :----------------------------------------------------------------------------------------------------- |
| `config.judgeModel`                      | `string` | esimene paneelimudel | Mudel, mis sünteesib lõpliku vastuse                                                                   |
| `config.fusionTuning.minPanel`           | `number` | `2`                  | Enne järelaja taimeri käivitumist nõutavate edukate vastuste arv (piiratud vahemikku `[2, panelSize]`) |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`               | Kui kaua oodata mahajääjaid pärast kvoorumi saavutamist                                                |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`              | Absoluutne ülempiir, et üks hangunud mudel ei saaks päringut peatada                                   |

Vaikeväärtused asuvad `FUSION_DEFAULTS`-is (`open-sse/services/fusion.ts`).

### Näide

```bash
curl -X POST http://localhost:20128/api/combos \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "fusion-panel",
    "strategy": "fusion",
    "targets": [
      { "model": "cc/claude-opus-4-7" },
      { "model": "cx/gpt-5.5" },
      { "model": "glm/glm-5.1" }
    ],
    "config": {
      "judgeModel": "cc/claude-opus-4-7",
      "fusionTuning": { "minPanel": 2, "stragglerGraceMs": 8000, "panelHardTimeoutMs": 90000 }
    }
  }'
```

Seejärel kutsu seda nagu suvalist kombot: `{"model":"fusion-panel","messages":[...]}`.

## Virtuaalse Automaatkombo Tehas

Automaatkombo mootor ei vajaja eelmääratud kombineerimisi. Selle asemel ehitab `open-sse/services/autoCombo/virtualFactory.ts` kandidaate lennult:

1. Tõmbab `getProviderConnections({ isActive: true })` (kõik lubatud ühendused)
2. Filtreerib need, millel on kehtivad volikirjad (API võti või aegunud OAuth-läbi `hasUsableOAuthToken()`)
3. Ristviidab `getProviderRegistry()` -ga mudelite kättesaadavuse + hindade jaoks
4. Iga kolmikule `(provider, model, connection)` ehitab `VirtualAutoComboCandidate`
5. Valib `connection.defaultModel` (või registri esimese mudeli) saatmise sihtmärgiks
6. Skoorib iga kandidaati 16-faktorilise `scorePool()` ja variandi kaalupakettide abil
7. Tagastab tulemuseks oleva mälus oleva `AutoComboConfig` `handleComboChat()` jaoks – ei salvestata kunagi andmebaasi

See tähendab, et **uue pakkujaga `auto/*` lubatud lisamine laieneb automaatselt kandidaatide kogumile** – käsitsi kombineerimise redigeerimist pole vaja. Virtuaalset kombo ehitatakse taotluse kohta uuesti, nii et hiljuti lisatud või hiljuti terveks saanud ühendused kaasatakse kohe.

## Enesetervendav

- **Ajutine välistamine**: Skoor < 0,2 → välistatud 5 minutiks (progressiivne taganemine, maks 30 minutit)
- **Ahelriigi teadlikkus**: AVATUD → automaatselt välistatud; POOLAVATUD → proovikorraldused
- **Intsidendirežiim**: >50% AVATUD → keela uurimine, maksimeeri stabiilsus
- **Jahtumise taastumine**: Pärast välistamist on esimene taotlus "proov" lühendatud aegumisajaga

## Bandiitide Uurimine

5% taotlustest (konfigureeritav) suunatakse juhuslike pakkujate juurde uurimiseks. Keelatud intsidendirežiimis.

## API

**Spetsiaalset lõpp-punkti `POST /api/combos/auto` ei ole** — Auto-Combo kasutamiseks on kaks võimalust:

1. **Nullkonfiguratsioon (soovitatav):** saatke suvaline vestluse lõpetamise päring väärtusega `model: "auto"` või `model: "auto/<variant>"`. Virtuaalne tehas loob kombinatsiooni iga päringu jaoks eraldi — püsivat salvestamist ega API-kutseid pole vaja.

2. **Püsiv kombinatsioon väärtusega `strategy: "auto"`:** looge tavaline kombinatsioon lõpp-punkti `POST /api/combos` kaudu ning määrake `strategy: "auto"` koos väärtustega `config.auto.weights` / `config.auto.candidatePool`. Kasutatakse sama hindamismootorit; kombinatsioon salvestatakse tabelisse `combos` ja seda saab ID alusel korduvalt kasutada.

Avastamiseks loetleb `GET /api/combos/auto` kõik variandid koos nende lahendatud kandidaatide kogumiga ning väärtustega `context_length` / `max_output_tokens` — kandidaatide kogumi kontekstiakende MAKSIMUM. Kliendid (nt opencode'i plugin) peavad reklaamima neid väärtusi, mitte väärtust `0`: nullkontekst keelab opencode'i automaatse tihendamise täielikult, võimaldades seanssidel kasvada seni, kuni lüüsi ajaloopuhastus konteksti hävitab. MAKSIMUMI reklaamimine on ohutu, sest automaatkombinatsiooni konteksti eelfilter suunab liiga suured päringud suure kontekstiaknaga kandidaatidele.

```bash
# Nullkonfiguratsiooniga kasutamine (kombinatsiooni ei looda)
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# Püsiv automaatkombinatsioon tavalise kombinatsioonide lõpp-punkti kaudu
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Automaatruuteri strateegiad

Püsivad `strategy: "auto"` kombinatsioonid võivad määrata võtme `config.routerStrategy` (või pärandvõtme
`config.auto.routerStrategy`) üheks järgmistest:

- `rules` — vaikimisi kaalutud hindamine
- `score` — valib suurima konfigureeritud kaalutud skoori. Täpsete viikide korral säilitatakse konfigureeritud
  kandidaatide järjekord; olemasolev `explorationRate` teeb valimi kogu järjestatud kogumist.
- `cost` / `eco` — odavaim töökorras teenusepakkuja
- `latency` / `fast` — väikseim p95 latentsus koos töökindlustrahviga
- `sla-aware` / `sla` — eelistab kandidaate, mis vastavad p95 latentsuse, veamäära ja valikuliste
  kulude SLO-de nõuetele
- `lkgp` — viimane teadaolevalt toimiv teenusepakkuja esimesena
- `nadir` — küsib [Nadiri](https://getnadir.com) otsustus-API-lt, millist kogumis olevat mudelit
  viip vajab; nõuab selgesõnalist lubamist ja tõrke korral kasutab strateegiat `rules`
- `decision` — küsige konfigureeritud otsustajalt (TypeSafe System One, teie enda otsus URL või mõni kombinatsiooni enda mudelitest), milline kogumis olev mudel päringule sobib; vaikimisi väljalülitatud `COMBO_DECISION_ROUTER_ENABLED` lipu taga, tõrkeavatud `rules`-le

### Ruuteri strateegiad üksikasjalikult

Automaatkombinatsiooni mootor pakub 7 ühendatavat **RouterStrategy** teostust, mida
saate vahetada võtme `config.routerStrategy` (või pärandvõtme `config.auto.routerStrategy`) kaudu.
Iga strateegia valib kandidaatide kogumist ühe teenusepakkuja, lähtudes objektist `RoutingContext`
(ülesande tüüp, tööriista-/nägemisvihjed, hinnanguline sõnemite arv, valikuline SLA-poliitika, valikuline
viimane teadaolevalt toimiv teenusepakkuja).

#### 1. `rules` (vaikimisi) — 16 teguriga kaalutud hindamine

Ümbritseb olemasolevat hindamismootorit. Filtreerib välja kaitselüliti olekuga `OPEN`
kandidaadid, seejärel käivitab `scorePool()` praeguse ülesandetüübi ja funktsiooniga `getTaskFitness()`,
valides suurima skooriga teenusepakkuja.

```ts
class RulesStrategyImpl implements RouterStrategy {
  readonly name = "rules";
  readonly description = "16-factor weighted scoring (see DEFAULT_WEIGHTS)";

  select(pool, context) {
    const eligible = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const ranked = scorePool(
      eligible.length > 0 ? eligible : pool,
      context.taskType,
      undefined,
      getTaskFitness
    );
    return { provider: ranked[0].provider /* ... */ };
  }
}
```

**Millal kasutada**: vaikimisi. Kasutage siis, kui soovite kõigi signaalide vahel tasakaalustatud kompromissi.

**Alias**: `rules` (alias puudub)

---

#### 2. `cost` / `eco` — odavaim töökorras teenusepakkuja

Sordib kandidaatide kogumi väärtuse `costPer1MTokens` järgi (kasvavalt) ja valib odavaima.
Esmalt filtreerib välja olekuga `OPEN` kandidaadid.

```ts
class CostStrategyImpl implements RouterStrategy {
  readonly name = "cost";
  readonly description = "Always selects cheapest available provider";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort((a, b) => a.costPer1MTokens - b.costPer1MTokens);
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Millal kasutada**: kulutundlikud töökoormused, pakktöötlus või taustatööd.

**Aliased**: `cost`, `eco`

---

#### 3. `latency` / `fast` — väikseim p95 latentsus koos töökindlustrahviga

Sordib valemi `p95LatencyMs + (errorRate * 1000)` järgi. Veamäära trahv tagab,
et ebausaldusväärsed teenusepakkujad paigutatakse madalamale isegi siis, kui nende nominaalne latentsus on väike.

```ts
class LatencyStrategyImpl implements RouterStrategy {
  readonly name = "latency";
  readonly description = "Prioritizes lowest p95 latency with reliability weighting";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort(
      (a, b) => a.p95LatencyMs + a.errorRate * 1000 - (b.p95LatencyMs + b.errorRate * 1000)
    );
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Millal kasutada**: latentsustundlikud töökoormused, nagu reaalajas vestlus, automaatteksti lõpetamine või
interaktiivsed programmeerimisabilised.

**Aliased**: `latency`, `fast`

---

#### 4. `sla-aware` / `sla` — vastavus latentsuse/veamäära/kulude SLO-dele

Hindab iga kandidaati selle järgi, kui hästi see vastab konfigureeritud SLO-poliitikale:

| Tegur             | Kaal | Valem                                                    |
| ----------------- | ---- | -------------------------------------------------------- |
| Latentsuse skoor  | 35%  | `threshold / max(value, ε)`                              |
| Vea skoor         | 35%  | `threshold / max(value, ε)`                              |
| Tervise skoor     | 15%  | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN)        |
| Kulude skoor      | 10%  | `threshold / max(value, ε)` või pööratud normaliseeritud |
| Stabiilsuse skoor | 5%   | latentsuse standardhälbe pööratud normaliseeritud        |

Kui `hardConstraints: true`, sorditakse kandidaadid esmalt **rikkumise skoori**
(kui palju nad mõnda SLO-d ületavad) ja seejärel koondskoori järgi. Vastasel juhul
kasutatakse ainult koondskoori.

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Selects the provider most likely to satisfy latency, error-rate, and cost SLOs";

  select(pool, context) {
    // ... hindab iga kandidaati eeskirjade alusel: { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**SLA väljad** (määratakse kombineeritud konfiguratsioonis):

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

**Millal kasutada**: rangete latentsus-, veamäära- või kulupiirangutega tootmiskoormuste puhul.

**Aliased**: `sla-aware`, `sla`

---

#### 5. `lkgp` — esmalt viimane teadaolevalt töötav pakkuja

Proovib esmalt **viimast teadaolevalt töötavat pakkujat** (kui see on määratud), seejärel kasutab
varuvariandina strateegiat `rules`. Kasulik seansi sidususe tagamiseks — sama pakkuja teenindab
vestluse jätkupäringuid.

```ts
class LKGPStrategyImpl implements RouterStrategy {
  readonly name = "lkgp";
  readonly description = "Tries last known good provider first, then falls back to rules";

  select(pool, context) {
    if (context.lkgpEnabled === false) {
      return getStrategy("rules").select(pool, context);
    }

    if (context.lastKnownGoodProvider) {
      const candidates = pool.filter(
        (c) => c.provider === context.lastKnownGoodProvider && c.circuitBreakerState !== "OPEN"
      );
      if (candidates.length > 0) {
        return { provider: candidates[0].provider /* ... */ };
      }
    }

    // Varuvariandina kasutatakse strateegiat rules
    return getStrategy("rules").select(pool, context);
  }
}
```

**Millal kasutada**: mitme vooruga vestluste puhul, kus soovite, et sama pakkuja teenindaks
jätkupäringuid (nt vahemällu salvestamise, konteksti järjepidevuse või hinnastamise ühtsuse tõttu).

**Alias**: `lkgp` (alias puudub)

---

#### 6. `nadir` — viibast lähtuv mudelivalik Nadiri kaudu

Kõik eespool kirjeldatud strateegiad järjestavad kandidaate oma telemeetria alusel; ükski neist ei loe
päringut. `nadir` saadab viimase kasutajavooru koos kogumi mudeli-ID-dega
[Nadiri](https://getnadir.com) otsustus-API-le (`POST /v1/bucket`) ja suunab päringu mudelile,
mille Nadir sellest valikust valib (`simple` → odavaim sobiv mudel, `complex` → kõige võimekam
tippmudel). Seda mudelit teenindav ühendus valitakse endiselt strateegiaga `rules`, seega määravad
konto valiku jätkuvalt kvoot, seisund ja kulu.

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "nadir",
    "nadir": {
      "apiKey": "ndr_...",
      "baseUrl": "https://api.getnadir.com",
      "timeoutMs": 2000
    }
  }
}
```

`OMNIROUTE_NADIR_API_KEY` ja `OMNIROUTE_NADIR_BASE_URL` on nende kahe stringi
keskkonnamuutujapõhised varuvariandid. `baseUrl` on vajalik ainult isemajutatud Nadiri puhul
(lõpus olev `/v1` on lubatud). Võtmeta kutsed suunatakse Nadiri anonüümsesse teenusekihti, millele
rakendatakse IP-põhist kiirusepiirangut. Võtme kasutamisel
([looge võti](https://app.getnadir.com/dashboard/api-keys)) logitakse iga otsus teie Nadiri
juhtpaneelile. Täielikud seadistus- ja kontrollimisjuhised:
[getnadir.com/docs/gateway-omniroute](https://getnadir.com/docs/gateway-omniroute/).

Mis süsteemist väljub: viimase kasutajasõnumi tekst (esimesed 16 000 märki), kandidaatmudelite
ID-d ja kanali silt `source: "omniroute"`. Süsteemiviipa, ajalugu, tööriistu ega päiseid ei saadeta.

Tõrke korral jätkatakse tööd: ajalõpp (vaikimisi 2000 ms), muu kui 2xx-vastus, kättesaamatu
host, vigane vastus või kogumiväline valik lahendatakse strateegia `rules`
otsusega ning põhjuse ette lisatakse `NadirStrategy: fallback (…)`. Pärast nurjunud kutset jätab
strateegia võrgupäringud 30 sekundiks vahele, mistõttu põhjustab katkestus ühe ajalõpu iga 30 sekundi
järel, mitte ühe iga päringu kohta. Marsruutimissündmused kajastavad väärtust `strategy: "nadir"`
ainult siis, kui valiku tegi tegelikult Nadir.

**Millal kasutada**: erineva raskusastmega liikluse puhul mudelikogumis, mis hõlmab eri tasemete
mudeleid (väike, keskmine ja tippmudel), kui soovite vähendada alati tippmudeli kasutamise kulu.

**Alias**: `nadir` (alias puudub)

---

#### 7. `decision` — ühendatav otsustaja valib mudeli

`decision` küsib a** otsustaja** milline kogumi mudel päringule sobib, siis kitsendab kogu selle mudeli järgi ja laseb `rules` valida ühenduse (kvoot, tervis ja kulu valivad siiski konto). Otsustaja määratakse kombinatsiooni otsustusplokis — `config.decision` kui ruuteri nupud asuvad `config` (mida armatuurlaud kirjutab) ülaosas või `config.auto.decision` `config.auto.routerStrategy` kõrval:

| `decider`     | Kes vastab                                                                                                                     | Vajadused                                          |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------- |
| `systemone`   | TypeSafe System One (`POST https://api.typesafe.ai/v1/systemone`), vaikemudel `jev-latest`                                     | `typesafe` -ühendus või env-võti                   |
| `http`        | teie ise otsustaja `baseUrl` juures: `wire: "systemone"` (`{baseUrl}/v1/systemone`) või `"openai-chat"` (vestluse lõpetamised) | `baseUrl` + `model`; võti valikuline               |
| `combo-model` | üks teie teenusepakkuja mudelitest, mida kutsutakse protsessis nagu fusioonikohtunik                                           | `model` kui `provider/model` (mitte kombineeritud) |

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "decision",
    "decision": {
      "decider": "http",
      "baseUrl": "https://decider.example.com",
      "wire": "openai-chat",
      "model": "qwen-small",
      "connectionId": "<stored connection id>",
      "timeoutMs": 2000,
      "minConfidence": 0.6,
      "descriptions": { "gpt-4o-mini": "Quick drafts and short answers" }
    }
  }
}
```

Väljad (kinnitatakse range skeemiga salvestamisel ja uuesti päringu ajal):

- `decider` — `systemone`, `http` või `combo-model`.
- `model` — TypeSafe mudel, teie URL otsustusmudel või kombineeritud mudeli kutse `provider/model` (kuni 200 tähemärki).
- `baseUrl` — ainult `http` : `http(s)` URL kuni 500 tähemärki, ilma mandaatide, päringu või fragmendita. Sellele OmniRoute (loopback + `PORT`) osutavast URL keeldutakse.
- `wire` — ainult `http` : `systemone` (vaikimisi) või `openai-chat`.
- `connectionId` — salvestatud ühendus, mille võtit kasutatakse (ainult helistava API klahvi lubatud ühenduste sees). Ilma selleta loeb `systemone` `typesafe` ühendust ja iga võrgu otsustaja langeb tagasi väärtusele `OMNIROUTE_DECISION_API_KEY`. `apiKey` -välja pole: võtit ei salvestata kunagi kombinatsiooni.
- `timeoutMs` — täisarv, 100–5000, vaikimisi 2000.
- `minConfidence` — 0–1; madalama usaldusväärsusega vastus langeb tagasi `rules` (mitteusaldusväärsuse otsustaja loetakse 0-ks).
- `descriptions` — kuni 50 kirjet (klahv kuni 300, tekst kuni 1000 tähemärki), mis on sisestatud mudeli ID või `provider/model` abil; määramata kirjed saavad genereeritud kuluasetuse kirjelduse.

**Lipp.** `COMBO_DECISION_ROUTER_ENABLED` (vaikimisi `false`) väravad iga otsustaja. Kui see on välja lülitatud, ei loe `decision` kombo mandaati, ei helista ja suunab marsruuti `rules`; logi ütleb `fallback (disabled)`. Ainult salvestatud võti ei lülita seda kunagi sisse. Otsustusplokita kombinatsioone ei mõjuta see üldse.

**Mis jääb kastist välja.** Ainult viimase kasutajateate tekst (kuni 8000 tähemärki; chat/Claude `messages` või Responses `input`) ja mudeli ID-de menüü koos nende kirjeldustega. Mitte kunagi ei küsi süsteem, vastused `instructions`, tööriistad, ajalugu, päised või konto andmed. Võrgukõned läbivad teenusepakkuja väljamineva valve ilma korduskatseteta, ümbersuunamisteta ja 64 KB vastusepiiranguta. `combo-model` -kutse on mittevoogedastus, tööriistavaba, `temperature: 0`, 256-märgise eelarvega; otsustuskutse raames alustatud otsus lükatakse tagasi.

**Ebaõnnestunud käitumine** on tõrkevaba: iga rike lahendab `rules` otsuse ja põhjus on `decision(<decider>): fallback (<reason>)`, `<reason>` puhul `recursion` üks `disabled`, `not_configured`, `missing_credential`, `timeout`, `http_error`, `invalid_response`, `out_of_menu`, `refused`, `cooldown`, `network_error`, `low_confidence` või `single_option` `no_user_text` Pärast ajalõpu, HTTP -tõrget või võrgutõrget jäetakse lõpp-punkt 30 sekundiks vahele. Edukas valik loeb `decision(<decider>): selected <model> from <n>; confidence <c> (<rules reason>)`. Ükski URL, võti, viip või ülesvoolu keha ei jõua logini.

Komboehitaja näitab neid välju, kui ruuteri strateegia on `decision` koos genereeritud kirjeldustega kohahoidjatena ja** Testi otsus** nupp, mis kutsub `POST /api/combos/decision-preview` üks kord välja salvestamata sätetega (sama lipp).

**Millal kasutada** : erineva raskusastmega liiklus, kus soovite, et astme valiks päringu alusel teie valitud klassifikaator, mitte konkreetselt Nadir.

**Alias** : `decision` (ilma varjunimeta)

---

### Kohandatud marsruutimisstrateegiad

Avaliku API kaudu saate registreerida oma `RouterStrategy` teostuse:

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "My custom routing strategy";

  select(pool, context) {
    // Teie marsruutimisloogika
    return {
      provider: pool[0].provider,
      model: pool[0].model,
      strategy: this.name,
      reason: "MyCustomStrategy: ...",
      candidatesConsidered: pool.length,
      finalScore: 1.0,
    };
  }
}

registerStrategy("my-custom", new MyCustomStrategy());
```

Seejärel kasutage seda:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### Marsruutimisstrateegia valimise juhend

| Kasutusjuht                | Strateegia  | Põhjus                                       |
| -------------------------- | ----------- | -------------------------------------------- |
| Tasakaalustatud töökoormus | `rules`     | Vaikimisi — arvestab kõiki tegureid          |
| Kulude minimeerimine       | `cost`      | Valib alati odavaima                         |
| Latentsuse minimeerimine   | `latency`   | Valib kiireima usaldusväärse teenusepakkuja  |
| Ranged SLO-d               | `sla-aware` | Filtreerib p95/veamäära/kulu lävendite järgi |
| Mitmevooruline vestlus     | `lkgp`      | Seansi püsivus                               |
| Erinev raskusaste          | `nadir`     | Valib iga viiba jaoks sobiva mudelitaseme    |
| Oma klassifikaator         | `decision`  | Teie otsustaja valib mudeli                  |

SLA-teadlikud väljad:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

## Ülesande Sobivus

Rohkem kui 30 mudelit hinnati 6 ülesande tüübi (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`) järgi. Toetab metamustrid (nt. `*-coder` → kõrge programmeerimise skoor).

## Auto Variantide kokkuvõte

Lisaks paljale `auto` (vaikimisi) väärtusele ja 6 `AutoVariant` väärtusele, mis on deklareeritud `autoPrefix.ts` failis, on kokku **7 kutsutavat mudeli ID-d**:

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`

(`AutoVariant` ise loetleb 6 väärtust; 7. võimalus on "varianti pole" — paljas `auto` — mida käsitlus `parseAutoPrefix()` funktsioonis `variant: undefined` kujul.)

## Kuidas tasemed Auto-Comboga sobituvad

16 teguriga hindamisfunktsioon (`open-sse/services/autoCombo/scoring.ts`) käsitleb tasemesse
kuulumist kahe signaalina: `tierPriority` (0.0476) ja `tierAffinity` (0.0476). Täieliku
`DEFAULT_WEIGHTS` komplekti leiate eespool olevast kanoonilisest [hindamistegurite tabelist](#how-it-works-persisted-auto-combos) — paketipõhised alistused (ship-fast/cost-saver/quality-first/
offline-friendly) on loetletud tabelis „Kaaluprofiilid pakettide kaupa“.

Ainuüksi tase **ei** sunni 1. taset esimeseks — kui 1. taseme latentsus on halb või
kulu ja kvaliteedi suhe pole optimaalne, võidab 2. tase. Tasemete järjestuse jõustamiseks kasutage kombinatsiooni
strateegiat `priority` ja järjestage pakkujad taseme järgi.

1. taseme (tellimuse) tugevaks eelistamiseks suurendage `tierPriority` kaalu:

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

Tasemete määratlusi ja pakkujate klassifikatsiooni vaadake failist [`docs/guides/TIERS.md`](../guides/TIERS.md).

## Testimine ja katvuse analüüs

### Deterministlik marsruutimisotsuste maatriks (`npm run test:combo:matrix`)

`tests/integration/combo-matrix/*.test.ts` tõestab avalike strateegiate, mida see katab, marsruutimisotsuse
otsast lõpuni läbi tegeliku kombineeritud konveieri, kasutades jäljendatud ülesvooluühendust.
Katvus hõlmab järgmist:

- Kõik 21 `ROUTING_STRATEGY_VALUES` strateegiat (järjestatud, kaalutud, kulupõhised, kontekstipõhised, ühendatud jne).
- `quota-share` (sisemine) otsast lõpuni: DRR-i õiglus + küllastumise tõttu madalam prioriteet tegeliku `selectQuotaShareTarget` ühenduspunkti kaudu (`registerQuotaFetcher` / `setLKGP` /
  `__setHeadroomSaturationFetcherForTests`).
- `context-relay` universaalse üleandmise katvus iga sihtmärkide arvu korral.

See komplekt käivitatakse CI-s (`test:integration` töö) parameetritega `--test-concurrency=1` ja
`--test-force-exit`, mistõttu on see deterministlik ega vaja aktiivseid mandaate.

### Piiratud aktiivne suitsutest (CI-s EI käivitata — tegelikud teenusepakkujad)

| Käsk                                   | Mida see teeb                                                                                                                |
| :------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| `npm run test:combo:live`              | Tegelik marsruutimine samas protsessis parameetriga `RUN_COMBO_LIVE=1`; teeb aktiivsest OmniRoute’i andmebaasist hetktõmmise |
| `npm run test:combo:live:vps`          | HTTP-kutsed aktiivse OmniRoute’i serveri vastu (määrake `COMBO_LIVE_BASE_URL`)                                               |
| `npm run test:combo:live:vps:failover` | Sama, kuid tahtlikult esile kutsutud tõrke ülemineku stsenaariumidega                                                        |

Need suitsutestid kontrollivad tegelikku andmeedastusteed (combo → teenusepakkuja → lõpuleviimine). Need
on CI-st tahtlikult välja jäetud, sest nõuavad aktiivseid mandaate ja VPS-i juurdepääsu.

---

## Failid

| Fail                                                      | Otstarve                                                                                                |
| :-------------------------------------------------------- | :------------------------------------------------------------------------------------------------------ |
| `open-sse/services/autoCombo/scoring.ts`                  | 16 teguriga hindamisfunktsioon, `DEFAULT_WEIGHTS`, kogumi norm                                          |
| `open-sse/services/autoCombo/taskFitness.ts`              | Mudeli × ülesande sobivuse otsing                                                                       |
| `open-sse/services/autoCombo/engine.ts`                   | Valikuloogika, bandiit, eelarve ülempiir                                                                |
| `open-sse/services/autoCombo/selfHealing.ts`              | Välistamine, sondid, intsidendirežiim                                                                   |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 kaaluprofiili (ship-fast, cost-saver, quality-first, offline-friendly, reliability-first, chaos-mode) |
| `open-sse/services/autoCombo/autoPrefix.ts`               | `auto/` prefiksi parser + 6 varianti                                                                    |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Koostab aktiivsete ühenduste põhjal mälusisese `AutoComboConfig`                                        |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Teenusepakkujate registri matkimise testikonks                                                          |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES` (22 strateegiat)                                                              |
| `src/sse/handlers/chat.ts`                                | Integratsioon: auto-prefiksi lühisulg                                                                   |
