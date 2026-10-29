# Guardrails (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Vir resnice:** `src/lib/guardrails/`
> **Zadnja posodobitev:** 2026-10-17 — v3.8.52 (dodano [Pokritost in omejitve](#coverage-and-limits):
> katere poti in odzivne poti kljuke dosežejo, združene glave za onemogočanje (#16412), način blokiranja
> vbrizgavanja kot obvezna meja (#16413) in kaj vidi odziv pred post-call)

Guardraili uveljavljajo varnostne, pravilne in vsebinske preoblikovanja na meji
med OmniRoute in ponudniki navzgor (upstream). Vsak guardrail lahko pregleda
(in po potrebi zavrne, preoblikuje ali doda opombe k) koristnim vsebinam
zahtevkov (`preCall`) in odzivom ponudnikov navzgor (`postCall`).

Sistem deluje po načelu **fail-open**: če guardrail med izvajanjem sproži
izjemo, register zabeleži napako in nadaljuje z naslednjim guardrailom, namesto
da bi zahtevek spodletel. Blokiranje je izrecna odločitev (`block: true`),
nikoli naključje. Edina izjema je prekinjen zahtevek: ko je klicateljev
`signal` prekinjen, guardrail, ki sproži izjemo, zavrne zagon kljuke, namesto
da bi bil preskočen.

Kljuke se **ne** izvajajo na vsaki poti ali pri vsakem odzivu. Preden se
zanesete na guardrail kot varnostni nadzor, preberite
[Pokritost in omejitve](#coverage-and-limits).

## Vgrajeni guardraili

Register ob uvozu samodejno naloži šest guardrailov v vrstnem redu prioritet
(glej `registry.ts` → `registerDefaultGuardrails()`):

| Prioriteta | Ime                 | Faza(-e)       | Datoteka              |
| ---------- | ------------------- | -------------- | --------------------- |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Nižje številke prioritete se izvedejo **najprej**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Osnovni model GLM 5.3 in `glm-5.3-{low,high,max}` imata v metapodatkih
registra/specifikacije izrecno nastavljeno `supportsVision:false`. Variante
GLM 5.3 Flash ostajajo modeli z izvorno podporo za vid. Pot `/v1/messages` v
Claude Code vstopi v skupno verigo guardrailov `handleChat` pred klicem
**pred** prevodom Claude→OpenAI; ugnezdene slike iz rezultatov orodja `Read`
je treba opisati ali obravnavati, preden jih ta prevod dvigne v vsebino
OpenAI `image_url` (#17069).

Zajame zahtevke s slikami, namenjene modelom **brez podpore za vid**, in
bodisi preusmeri celoten zahtevek na model, ki podpira vid, bodisi slikovne
dele pred klicem navzgor zamenja z besedilnimi opisi, ki jih ustvari
nastavljivi vidni model. Tako lahko ponudniki, ki podpirajo samo besedilo,
transparentno obravnavajo multimodalne koristne vsebine.

Potek:

1. Preskoči, če ciljni model že podpira vid (razen če je na seznamu
   prisiljenega mostišča `isVisionBridgeForcedModel`).
2. Slikovne dele izloči prek `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), ki se zanaša na **poenoteni detektor medijev**
   `detectMediaParts()` v `open-sse/utils/mediaParts.ts` — edini vir resnice,
   ki ga deli tudi filter združljivosti kombinacij (combo). Izvleček je
   dovoljen samo za oblike, ki jih `replaceImageParts` lahko vstavi nazaj
   (pogodba izvleček↔zamenjava): OpenAI `image_url`, Anthropic base64
   `source.type:"base64"`, Anthropic URL `source.type:"url"` in Responses
   API `input_image`. Ujemajoče slike, ugnezdene znotraj Claude Code
   `tool_result.content` in izhodov orodij Responses, se prav tako izvlečejo
   in zamenjajo na svojih izvirnih poteh; oblike, ki so le indikatorji, so
   gradivo za combo filter in se ne izvlečejo.
   Preskoči, če ni najdenih.
3. Konfiguracijo med izvajanjem razreši prek
   `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): novi ključi nastavitev
   `modalityBridge*` imajo prednost; stari ključi `visionBridge*` ostanejo
   **enociklična rezerva** (okno za povrnitev). Preskoči pred vsakim
   prehodom medijev, ko je most onemogočen.
4. Izbirnik načina (`modalityBridgeVisionMode`, glej spodnjo tabelo) odloči
   med preusmeritvijo in opisovanjem. Preusmeritev vrne `modifiedPayload`,
   v katerem je zamenjan samo `model`, ter meta
   `{ rerouted, fromModel, toModel, imagesKept }`.
5. Pot opisovanja: omeji število slik na `maxImages`, sestavi poziv,
   prilagojen nalogi, preveri predpomnilnik opisov, pokliče vidni model
   **vzporedno** (`Promise.allSettled`) in na njihovo mesto vstavi besedilne
   dele `[Image N]: <description>`. Neuspeli opis vrne `null`: surova slika
   se ohrani za neznane oz. vidno sposobne cilje (#4012), a **potrjen
   neposredni cilj samo z besedilom** ali kombinacija brez vida dobi za vsako
   neopisano sliko izrecen besedilni nadomestek
   `(unavailable — no vision-capable provider connected)`, vključno z delnimi
   napakami in slikami nad omejitvijo klicev opisovanja (#17069). Obstoječa
   rezerva za opisovanje kombinacij, ko vsi opisi spodletijo, ostaja na mestu
   (#8430).
6. Vrne `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Izbirnik načina (`modalityBridgeVisionMode`)

| Način      | Privzeto | Vedenje                                                                                                                                                                                                                                                                                 |
| ---------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔        | Podedovana heuristika, nespremenjena (#6640/#7204): modeli, ki niso combo/`auto/`, se preusmerijo na najboljši vidni model, razen če izvirni model že ima uporabne poverilnice (potem describe); combo cilji vedno opisujejo.                                                           |
| `describe` |          | Vedno opiši — blok preusmeritve se v celoti preskoči; uporabnikov izbrani model vedno odgovori.                                                                                                                                                                                         |
| `reroute`  |          | Vsili preusmeritev: zaščita, ki ohranja model s poverilnicami, se zaobide. Zaščita poverilnic **cilja** preusmeritve še vedno velja — kadar ni uporabnega vidnega cilja, most blokira z jasno napako, namesto da bi opisoval ali pošiljal surove slike cilju, ki podpira samo besedilo. |

Vsiljeni načini se sprožijo **preden** se zažene samodejna heuristika; vedenje `auto` je do bajta enako zaščiti pred PR-1.

#### Obseg API-ključa (`visionBridgeKeyScope.ts`)

Ko klicateljev API-ključ omejuje `allowedConnections`, sklope kvot
(`allowedQuotas`) ali modele (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), most izbira samo
modele za preusmeritev in describe, ki jih ključ sme uporabljati, na
povezavah, ki jih ključ sme uporabljati. Klic describe nato vedno poteka skozi
self-loop zanko OmniRoute z glavo `x-omniroute-self-loop-key-id`, tako da
sprejemni klepetalni zahtevek znova uveljavi politiko povezav in modelov tega
ključa. `enforceApiKeyPolicy()` upošteva to glavo samo skupaj z bearer žetonom
self-loop, zato lahko dostop le zoži, id, ki ga ni mogoče razrešiti, pa je
zavrnjen.

Če za ključ ni dovoljen noben vidni model, **potrjeni cilj, ki podpira samo
besedilo**, zahtevek s sliko lokalno zavrne z jasno napako HTTP 400, namesto
da bi bajte slike posredoval nezmogljivemu upstreamu (#17069). Za cilje z
neznano ali vgrajeno vidno zmogljivostjo pot describe ohranja prejšnje vedenje
fail-open (meta `{ skipped: true, reason: "no_permitted_vision_model" }`).
Zahtevki brez ključa in ključi brez teh omejitev se obnašajo natanko tako kot
prej.

#### Poziv describe, prilagojen nalogi (`modalityBridgeVisionTaskAware`)

Privzeto **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`)
osnovnemu pozivu describe doda besedilo **zadnjega uporabnikovega sporočila**
(okrajšano na 500 znakov), s čimer usmeri opis k temu, kar je uporabnik
dejansko vprašal (vzorec codex-vision-proxy), in prosi vidni model, naj
prepiše vidno besedilo. Če je zastavica izklopljena — ali ni uporabnikovega
besedila — se osnovni poziv uporabi nespremenjen.

Lastni, z OpenAI združljiv zahtevek self-loop zanke describe
(`callVisionModelSingle()` v `visionBridgeHelpers.ts`) vedno zahteva
`image_url.detail: "high"` — brezpogojno, za vsakega klicatelja/ponudnika, ni
pogojen z nobenim odjemalskim signalom. Vzorčenje z nizko podrobnostjo
poslabša natančnost OCR prav pri nalogi prepisovanja besedila, ki jo ta poziv
zahteva, zato klic describe sam vedno zahteva visoko podrobnost, ne glede na
to, kakšno raven podrobnosti je uporabil izvirni dohodni zahtevek. To vpliva
samo na telo internega zahtevka describe; ne spreminja, kako OmniRoute
posreduje klicateljev lastni `image_url.detail` na primarnem zahtevku — ta
privzeta vrednost se uporabi ločeno in samo za zaznane odjemalce OpenCode, v
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Veja
Anthropic wire-format self-loop zanke describe nima polja `detail` in nanjo
nobena od obeh privzetih vrednosti ne vpliva.

#### Omejitev izhoda describe (`modalityBridgeVisionMaxChars`)

| Ključ                          | Privzeto | Obseg             |
| ------------------------------ | -------- | ----------------- |
| `modalityBridgeVisionMaxChars` | `0`      | `0` ali 100–50000 |

`0` (privzeto) pomeni **brez omejitve** — opis, ki ga vrne
`callVisionModel()`, se posreduje nespremenjen, kar ohranja obstoječe
vedenje. Vsaka vrednost v obsegu 100–50000 opis okrajša s pripono `…`, preden
se vstavi nazaj kot `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` v `src/lib/guardrails/visionBridge.ts`).
To vrednost povečajte za naloge OCR, bogate s podrobnostmi, kjer navzdolni
model potrebuje celoten prepis; zmanjšajte jo, da omejite porabo žetonov pri
razgovornih vidnih modelih. Polje nadzorne plošče se nahaja na plošči
Advanced zavihka Vision (`modality-bridge-max-chars` v
`ModalityBridgeVisionTab.tsx`) in vsako vrednost med 1 in 99 omeji navzgor na
spodnjo mejo 100, izrecno `0` pa pusti nespremenjeno — `0` je samostojno
veljavna vrednost Zod
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), ne zgolj
privzeta vrednost »nenastavljeno«.

#### Predpomnilnik describe (`modalityBridge/bridgeCache.ts`)

LRU + TTL predpomnilnik v pomnilniku za izhode describe, deljen v celotnem
procesu. Ključ = `sha256(imageRef + composedPrompt + configuredBridgeModel)`
z uokvirjanjem s predpono dolžine (brez trkov na mejah polj). Komponenta
modela je **konfigurirani** model mostu, ne model, ki je dejansko odgovoril —
`callVisionModel` se lahko interno preklopi na rezervno možnost, ključanje po
poskusu pa bi razdrobljalo predpomnilnik. Neuspeli klici describe se nikoli ne
predpomnijo. Nastavitve:

| Ključ                           | Privzeto | Obseg   |
| ------------------------------- | -------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`   | —       |
| `modalityBridgeCacheTtlMinutes` | `60`     | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`    | 10–5000 |

#### Normalizacija oddaljenih slik (samoklic describe/pridobivanje base64)

Ko most sam pridobi **oddaljeno** sliko — samoklic describe za Anthropic in pretvorba v base64 za format claude-wire (`ensureBase64ImagesForClaudeWire`), obe prek `fetchRemoteImageAsDataUri()` v `visionBridgeHelpers.ts` — se nastali podatkovni URI pred vdelavo v zahtevo za vizijski model spusti skozi `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`). Prevelike slike se pomanjšajo na **2048px na daljšem robu** (kar se ujema z zgornjo mejo spreminjanja velikosti, ki jo OpenAI/Anthropic že uporabljata na strežniški strani), kar zmanjša bajte/zakasnitev nalaganja, ne da bi spremenilo tisto, kar vizijski model vidi. Spreminjanje velikosti uporablja `sharp`, naložen prek dinamičnega uvoza: na platformi, kjer se njegova izvorna binarna datoteka ne uspe naložiti, `normalizeDataUri()` **nikoli ne vrže izjeme** — preide na neposredno posredovanje izvirnih bajtov, tako da pot opisovanja/pretvorbe v base64 vedno še naprej deluje. Bajti, ki niso slika (pridobivanje, ki ni vrnilo dekodirljive slike), se prav tako posredujejo nespremenjeni. Ta normalizacija je omejena na slike, ki jih most pridobi za svoj samoklic — nikoli se ne uporabi za surovo posredovano (passthrough) koristno vsebino klicatelja, skladno z načelom spreminjanja izključno po izbiri (strogo pravilo št. 20).

#### Shema nastavitev + migracija

Novi ključi `modalityBridge*` se preverjajo z Zod v `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, trojica `modalityBridgeCache*` in skupina `modalityBridgeAudio*`, ki jo uporablja zvočni most (Audio Bridge). Migracija `141_modality_bridge_settings.sql` kopira obstoječe podedovane vrednosti `visionBridge*` v ustrezne nove ključe (idempotentno, nikoli ne prepiše vrednosti `modalityBridge*`, ki jo je nastavil operater); podedovani ključi ostanejo sprejeti kot nadomestno branje za en cikel izdaj.

#### Glava preglednosti + statistika

Odzivi, preoblikovani z describe, nosijo glavo `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (sestavi jo `buildModalityBridgeHeader()` v `modalityBridge/bridgeStats.ts`, vtisne pa `withModalityBridgeHeader()` v `src/sse/handlers/chatHelpers.ts`). Preusmerjene zahteve glave **ne** prejmejo — koristna vsebina je ostala nespremenjena in zamenjava modela je že vidna v polju `model` telesa odziva.

`GET /api/modality-bridge/stats` (upravljalska avtentikacija, isti nivo kot `GET /api/settings`) vrne števec v pomnilniku po modalitetah `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` za `vision`, `audio` in `video`. `averageLatencyMs` za imenovalec uporablja `latencySamples`, ne vseh poskusov; operacija brez merjenja časa ne ponaredi vzorca z nič milisekundami. `bridged` ostaja vzvratno združljiv vzdevek za uspešne pretvorbe; neuspeli poskusi ga ne povečajo. Števci se ob ponovnem zagonu procesa ponastavijo — to je zasnovano tako (telemetrija, ne knjigovodstvo).

#### Konfiguracija nadzorne plošče

Namenska stran nadzorne plošče je `/dashboard/settings/modality-bridge`. Njeni prek URL-ja naslovljivi zavihki `Vision`, `Audio` in `Video` med preklapljanjem vrednosti `tab` ohranijo poizvedbene parametre. Zavihek Vision razkriva omogočanje, način, izbiro modela (vključno s samodejno privzeto vrednostjo), spodbujanje ob upoštevanju naloge, napredne omejitve časovne odmike/števila slik/dolžine opisa/predpomnilnika, števce med izvajanjem in zavarovano vzorčno zahtevo. Zavihek Audio je prav tako aktiven: razkriva omogočanje, izbirnik modelov samo za STT z možnostjo Auto, omejitve časovnega odmika/največje dolžine posnetka, zvočne števce in vzorčni preskus `input_audio`. Zavihek Video je funkcionalen: poroča o stanju izvajalnega okolja FFmpeg/ffprobe — enem od štirih izrecnih stanj uporabniškega vmesnika (`unknown`, medtem ko je preverjanje v teku ali se ni moglo dokončati, `restricted` na gostitelju nadzorne plošče, ki ni loopback, kjer se preverjanje preskoči na strani odjemalca, `unavailable`, ko je bilo preverjanje opravljeno in je odsotnost potrjena, ali `available` z različicama FFmpeg/ffprobe) — trajno shrani omejitve omogočitve/modela/sličic/videa/časovnega odmika, filtrira izbirnik modelov na modele z zmogljivostjo obdelave slik in razkriva video števce.

Nekdanja kartica Vision Bridge v nastavitvah AI je zdaj združljivostna povezava na novo stran; ne upravlja več z drugo kopijo obrazca. Media Providers prav tako povezuje delovna toka Image-to-Text in Speech-to-Text z ustreznimi zavihki Modality Bridge, ne da bi odstranil obstoječe preizkusno igrišče Speech-to-Text.

**Zaobiditev sprejema pri samoklicu:** ko klic describe poteka prek lastnega samoklica `/v1` OmniRoute (nestandardni model ponudnika), podzahteva pošlje `x-omniroute-admission-bypass: internal` in se avtenticira z razrešeno poverilnico samoklica — lokalno stražno vrednostjo `sk_omniroute` v lokalnem načinu ali z operatersko konfiguriranim okoljskim ključem `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` (#1350), tako da lahko namestitve z `REQUIRE_API_KEY=true` še vedno izvedejo klic describe. Zaobiditev se upošteva samo za točno te poverilnice, zato zunanji odjemalci glave ne morejo uporabiti za preskok sprejema.

Podedovane privzete vrednosti se nahajajo v `src/shared/constants/visionBridgeDefaults.ts`; nove privzete vrednosti za način/upoštevanje naloge/predpomnilnik in razreševalnik nastavitev se nahajajo v `src/shared/constants/modalityBridgeDefaults.ts`. Zaščitni mehanizem (guardrail) razkriva možnost konstruktorja `deps`, tako da lahko testi vbrizgajo lažni implementaciji `getSettings` in `callVisionModel`.

### Zvočni most (`audioBridge.ts`) — Modality Bridge PR-3

Prestrez zahteve za klepet, ki vsebujejo zvok, preden dosežejo cilj, za katerega ni znano, da sprejema zvočni vhod. Zahteve za klepet nikoli ne preusmeri: zvočni deli se prepišejo prek obstoječe večdelne končne točke, združljive z OpenAI, izbrani model za klepet pa nadaljuje z besedilnimi prepisi.

Potek:

1. Razreši `supportsAudio` prek `getResolvedModelCapabilities()`. Prednost imajo eksplicitni metapodatki registra ponudnikov, nato statični metapodatki modela, nato sinhronizirani `modalities_input`. Deklariran seznam vhodov brez `audio` pomeni `false`; če ni dokazov o zmogljivostih, ostane `null`. Tako `false` kot `null` aktivirata konzervativni most, medtem ko ga `true` zaobide.
2. Razreši nastavitve `modalityBridgeAudio*` in iz vsakega sporočila izlušči zamenljive avdio dele najvišje ravni prek skupnega detektorja `detectMediaParts()`. Podprte oblike prenosa so OpenAI `input_audio`, `audio_url` in `source.media_type: "audio/*"`. Ugnezdeni avdio se zazna za usmerjanje, vendar ga pot zamenjave ne odstrani. Delo omejuje `modalityBridgeAudioMaxClips`; poznejši deli ostanejo nespremenjeni.
3. Upoštevaj konfigurirano vrednost `provider/model`, ali pa pusti, da `selectAudioBridgeModel()` prehodi `AUDIO_TRANSCRIPTION_PROVIDERS` v stabilnem katalogskem vrstnem redu in izbere prvi model z uporabnim aktivnim poverilom ponudnika.
4. `callAudioTranscription()` pretvori avdio base64/data-URI v multipart `file` ali pa prenese oddaljeni `audio_url` prek odhodne zaščite, omejene na javne naslove, z DNS pinningom in mejo 25 MB. Nato z metodo POST pošlje datoteko in izbrani model v lokalno samozanko `/v1/audio/transcriptions`, overjeno z `resolveSelfLoopBearer()`. Obstoječa pot transkripcije izvede običajno iskanje poveril, obravnavo cooldown/rate-limit in odpošiljanje ponudniku.
5. Uspešni klici svoje dele zamenjajo z `[Audio N]: <transcript>`. Klici se izvajajo s `Promise.allSettled`: posamezen neuspeh ohrani tisti izvirni avdio del (pogodba #4012). Če spodletijo vsi klici in je za cilj dokazano `supportsAudio === false`, deli postanejo `[Audio N]: (unavailable — no STT provider connected)` (pogodba #8430). Za neznan cilj (`null`) rezultat, v katerem vsi spodletijo, ostane nespremenjen. Dokazan izključno besedilni cilj brez uporabnega poverila STT prejme enak eksplicitni stub brez izvedbe omrežnega klica.

Uspešni transkripti uporabljajo predpomnilnik LRU/TTL Modality Bridge na ravni celotnega procesa. Ključ združuje sklic na avdio, stabilno oznako operacije `audio-transcription` in izbrani model STT; neuspehi se nikoli ne predpomnijo. Avdio poskusi posodabljajo skupne števce `bridged`, `cacheHits`, `failures` in `lastUsedAt`. Preoblikovani odgovori nosijo `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; nespremenjene zahteve ne prejmejo segmenta Audio Bridge.

Nastavitve izvajalnega okolja so podprte s podatkovno bazo in potrjene z Zod:

| Ključ                         | Privzeto | Razpon               |
| ----------------------------- | -------- | -------------------- |
| `modalityBridgeAudioEnabled`  | `true`   | —                    |
| `modalityBridgeAudioModel`    | `""`     | Samodejno ali ID STT |
| `modalityBridgeAudioTimeout`  | `60000`  | 1000–300000          |
| `modalityBridgeAudioMaxClips` | `3`      | 1–10                 |

Skupni predpomnilnik ostaja pod nadzorom `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` in `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Prestreže video dele najvišje ravni v `messages` Chat Completions in `input` Responses API, preden se pokliče cilj brez znane izvorne podpore za video. Podprte oblike so `input_video`, `video_url`, `video_source`, URL-ji HTTPS in podatkovni URI-ji `data:video/*;base64,...`. Gola imena datotek v besedilu se ne obravnavajo kot video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) skrbi za prehod zahteve, preverjanje zmogljivosti/pravilnikov, agregacijo na zahtevo in koristno obremenitev odgovora. Delo na posameznem videu — pridobivanje, predpomnilnik celotnih rezultatov, opisovanje zaporedja sličic (ki združi morebitni avdio transkript, deklariran s strani klicatelja) ter metrike/prekinitev/čiščenje na poskus — je skrito za `processVideoPart` v `videoBridgePipeline.ts`, ki se pokliče enkrat za vsak video del znotraj zanke `preCall`. Ta modul definira tudi eksplicitne meje vrat: `VideoMediaBrokerPort` (pridobivanje bajtov in ekstrakcija vzorčenih sličic), `VideoAudioTranscriptionPort` (zlivanje avdio transkripta, deklariranega s strani klicatelja, z vzorčenimi podnapisi) in `VideoDrilldownPort` (meja trajnega shranjevanja poglobitev sličic; še ni povezana v `processVideoPart` — danes vnose poglobitev zapisuje samo ločena pot `/api/modality-bridge/video/drilldown`).

Javna pot zahteve `/v1` nikoli ne uvozi niti ne prikliče podprocesa. Oddaljeni videi se prenašajo z mejo 50 MiB; vdelani videi base64 imajo konzervativno omejitev 36 MiB dekodirane velikosti na video, da ovoj modela/sporočil/okvirjanja lahko ostane znotraj javne meje sprejema JSON zahteve 50 MiB. Oceni vdelane dolžine in dekodirane velikosti se preverita pred dodelitvijo. HTTPS je zahtevan na začetnem oddaljenem URL-ju in na vsaki preusmeritvi, z uporabo obstoječe odhodne zaščite, omejene na javne naslove, z DNS pinningom. Bajti nato prečkajo natančno določeno interno mejo posrednika `POST /api/modality-bridge/video/extract`. Ta pot je hkrati `LOCAL_ONLY` in `SPAWN_CAPABLE`, sprejema samo zahtevo, overjeno na ravni procesa in prihajajočo z zaupanja vredne povratne zanke, ter nikoli ne sprejme URL-ja, poti datotečnega sistema, izvedljive datoteke ali seznama argumentov. Cevovod velikosti telesa API-ja in inkrementalni bralec telesa rokovalca neodvisno uveljavljata omejitev vhoda posrednika 50 MiB. Njegova omejena vrsta izvaja eno ekstrakcijo naenkrat, dovoljuje štiri čakajoče naloge in omejuje čakajoči vnos na 100 MiB.

Znotraj posrednika `ffprobe` prebere zasebno lokalno datoteko; fiksni seznam dovoljenih formatov izključuje formate seznamov predvajanja in manifestov. Pri dovoljenih vsebnikih družine MOV ostanejo zunanji podatkovni sklici MOV privzeto onemogočeni in fiksni ukaz jih ne omogoči. Oba, `ffprobe` in `ffmpeg`, uporabljata seznam dovoljenih protokolov, omejen samo na `file`, eno nit, fiksna polja argumentov brez lupine in izvedljivi datoteki, razrešeni iz `PATH`. Pretoki priloženih slik naslovnic niso kandidati za predvajanje. Vsi predvajalni pretoki morajo izpolnjevati omejitve, izrecno privzeti pretok pa ima prednost pred deterministično rezervno izbiro z najnižjim indeksom. Videoposnetki so omejeni na 600 sekund, 8.192 slikovnih pik na dimenzijo in 33.554.432 izvornih slikovnih pik. FFmpeg vzorči 1–16 sredinskih okvirjev JPEG, daljši rob pomanjša na največ 1.024 slikovnih pik, ne da bi povečeval manjše vhode, in nikoli ne prejme URL-ja. Vzorčenje je privzeto `uniform`. Izbirna politika `scene_aware` in poskusna politika `segment_aware` izvedeta en dodaten fiksni prehod FFmpeg nad že preverjenim lokalnim pretokom, izbereta omejene časovne žige prizorov iz `showinfo` in se ob odpovedi detektorja, poteku časa, napačno oblikovanem izhodu ali prazni množici kandidatov deterministično vrneta na iste enakomerne sredinske točke. Način `segment_aware` razporedi sredinske vzorce sorazmerno s preverjenimi intervali prizorov; dokazi in rezervno vedenje tega načina so podrobno opisani spodaj. Trda omejitev 16 okvirjev se v vsaki politiki uporabi po izbiri. Ko ima zahteva `scene_aware` na voljo le proračun enega okvirja, uporabi enakomerno sredinsko točko aktivnega celotnega videa ali okna fokusa in poroča `policyEffective: uniform`: en sam izbran okvir prizora ne more ohraniti obeh časovnih koncev. Klicatelj lahko izbirno poda končno okno fokusa (sekunde `start`/`end`); meje se prirežejo na trajanje medija, obrnjena ali nekončna okna se zavrnejo, vse politike vzorčenja pa se izvajajo le znotraj normaliziranega intervala. Nastalo okno je vključeno v metapodatke vzorčenja in v predpono nezaupljivega opisa, da lahko nadaljnji modeli ločijo fokusiran izvleček od celotne časovnice.

Semantični fokus opisov je ločena, izrecna nastavitev. Privzeti analizni način `full` ohranja obstoječi poziv za okvirje in besedila zahteve nikoli ne posreduje modelu za opise. V načinu `focused` most prebere samo zadnje neprazno uporabnikovo besedilo `text`/`input_text` iz istega vsebnika Chat ali Responses, ga normalizira v NFC, strne nadzorne znake in presledke ter ga omeji na 500 kodnih točk Unicode. Prazen rezultat se vrne na točen poziv `full`. Uporaben namig se serializira kot JSON v namenskem bloku nezaupljivega uporabnikovega konteksta in lahko le daje prednost opazljivim podrobnostim; ne more preglasiti ločenega opozorila pred upoštevanjem navodil, ki so vidna ali slišna v mediju. Besedilni fokus nikoli ne sklepa vrednosti `start`/`end` in ne spreminja časovnega vzorčevalnika.

#### FU-07 strukturni dokazi o segmentih

`segment_aware` izvede en omejen predanalizni prehod nad že preverjenim lokalnim video pretokom. Fiksna veriga filtrov najprej prilagodi širino na največ 320 slikovnih pik, zazna spremembe prizorov in zamrznjene intervale, nato pa vzorči en okvir na sekundo za zamegljenost, povprečno lumo ter prostorske/časovne informacije. Prehod je omejen na 600 strukturnih vzorcev, eno nit FFmpeg/filtrov, iste sezname dovoljenih protokolov (samo `file`) in vsebnikov, omejitev izhoda procesa na 1 MiB ter največ 30 sekund znotraj skupnega mehanizma prekinitve/roka posrednika. Nikoli ne sprejme ukaza, filtra, poti ali URL-ja iz zahteve.

Strukturne vrednosti so deterministični dokazi vzorčenja, ne semantično razumevanje videa. Ne sklepajo subjektov, dejanj, opisov, govora ali uporabnikovega namena. Meje prizorov in zamrznitev tvorijo segmente; pokritost zamrznitev, zamegljenost, osvetljenost, prostorska podrobnost in časovna sprememba vplivajo le na razporeditev obstoječega proračuna 1–16 okvirjev. Popolnoma zamrznjen segment je omejen na en okvir, nezamrznjeni segmenti pa tekmujejo za preostali proračun. Ko je mej več kot okvirjev, se ohrani enakomerna pokritost časovnice, da hitri zgodnji rezi ne morejo skriti dolgega zaključnega segmenta. Meje prizorov, ki so znotraj enosekundne analizne ločljivosti meje zamrznitve, se združijo.

Manjkajoči filtri, napačno oblikovani ali prazni dokazi, napaka detektorja ali potek omejenega časa predanalize ob neuspehu odprejo (fail open) na točno politiko enakomernih sredinskih točk. Prekinitev klicatelja ali rok posrednika se ob neuspehu ne odpre: prekine podproces v teku, prepreči kasnejše pridobivanje okvirjev, zasebno začasno drevo pa se odstrani v bloku `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` ustvari deterministične, resnične FFmpeg testne priprave za prihranke klicev opisov po odstranitvi podvojitev, razporeditev proračuna pri gostem gibanju, dokaze o zamegljenosti/osvetljenosti/SI-TI, hitre reze z dolgim repom in lažno pozitivne rezultate postopnih zatemnitev. Beleži dejanski čas (wall time) predanalize ter, kjer je na voljo `/usr/bin/time`, CPU otroškega procesa in najvišji RSS. Njegove preverbe kakovosti so izključno strukturni oraklji. Dejanska kakovost modela za opise ostaja `HOLD`, ker to preskusno okolje nima pooblaščene končne točke ali zamrznjenega sodnika. Denarni prihranki prav tako ostanejo `HOLD`, razen če `--caption-cost-per-call-usd` zagotovi izrecno pozitivno oceno stroška na klic; skript nikoli ne izmišlja nobenega od obeh rezultatov.

Vsaka sličica je omejena na 4 MiB, vse neobdelane sličice skupaj na 23 MiB,
serializirani odgovor posrednika pa na 32 MiB. Zasebni začasni imenik se odstrani
v bloku `finally`. OmniRoute ne vključuje FFmpeg in ne sprejema poti do izvajalne
datoteke po meri. Pred ustvarjanjem opisov premostitvena plast izvede konservativen
postopek vizualnega odstranjevanja dvojnikov: vsak JPEG se zmanjša na sivinski
medpomnilnik velikosti 16×16 in primerja samo z zadnjo ohranjeno sličico. Pri
zahtevanem proračunu opisov, večjem od ene sličice, postopek pridobivanja zagotovi
omejen nabor kandidatov, ki obsega največ dvakratnik tega proračuna in nikoli več
kot 16 sličic. Zahtevana omejitev se uporabi šele po odstranitvi dvojnikov, pri
končnem redčenju pa se ohranita prvi in zadnji izbrani kandidat, kadar proračun
znaša vsaj dve sličici. Različicena politika
`grayscale-16x16-mean-cells-v2` uporabi večjo od vrednosti povprečne razlike lume
in deleža celic sličice, katerih normalizirana razlika je vsaj 0,05. Prag za
dvojnike je konstanta 0,04, izbrana zaradi predvidljivosti, namesto da bi bila
izpostavljena kot nastavitev med izvajanjem. Ta sekundarni
visokokontrastni signal ohrani majhne premike in spremembe vidnega besedila, ki
jih lahko primerjava samo na podlagi povprečja prikrije. Pri napakah primerjalnika
ali dekodirnika se uporabi odprto odpovedovanje in ohrani pokritost. Izhodni
metapodatki ločujejo pridobljene kandidate, uspešno uporabljene sličice in
odstranjene vizualne dvojnike.

Izrecno označen videodel lahko zahteva kontaktni list s časovnimi oznakami.
Premostitvena plast ustvari mrežo JPEG z največ 4 stolpci in 16 sličicami. Vsaka
celica velikosti 512 slikovnih pik vtisne časovno oznako svojega vira v
visokokontrastni spodnji pas, iste časovne oznake pa ostanejo tudi v besedilnih
metapodatkih za nadaljnje povezovanje in revizijo. Celotna datoteka JPEG ostane
omejena na 32 MiB. Če `sharp` ne more dekodirati ali sestaviti mreže, premostitvena
plast uporabi posamezne sličice JPEG; prekinitev odjemalca se še vedno razširi
skozi operacijo kontaktnega lista.

Dokazila za uvedbo so namenoma ločena od sintetičnega mikromerila zmogljivosti
sestavljanja. `scripts/perf/video-bridge-contact-sheet-eval.ts` določa
različiceno shemo preizkusnega ogrodja A/B za resnične modele vida, združljive z
OpenAI. Meri žetone, ki jih sporoči ponudnik, celotno latenco od začetka do konca
(vključno s sestavljanjem kontaktnega lista), število klicev modela in ohranitev
dejstev, določenih v manifestu. Neobdelani odgovori modela se ne zapišejo v
poročilo; ohranijo se samo izvlečki SHA-256 in ID-ji ujemajočih se dejstev.
Preizkusno ogrodje ne izvede nobenega omrežnega ali plačljivega klica modela,
razen če je podan `--execute-real` in so konfigurirani `--model`,
`OMNIROUTE_BASE_URL` ter `OMNIROUTE_API_KEY`. Brez takšnega izrecnega dejanskega
zagona ostane njegova strojno berljiva odločitev `HOLD`; sintetične meritve
koristne vsebine in števila klicev same po sebi niso dokazilo za uvedbo.

Klicatelji lahko podprtemu videodelu priložijo izbirno polje
`transcript.cues`, kadar že imajo časovno usklajeno besedilo. Vsaka oznaka mora
vsebovati `text`, končen interval `start`/`end` znotraj preverjenega trajanja in
dovoljeni `source` (`client`, `embedded` ali `audio-bridge`); `confidence` ima
privzeto vrednost `1` in mora ostati med `0` ter `1`. Povsem enake oznake se
združijo. OmniRoute na podlagi teh metapodatkov nikoli ne začne prepisovanja:
preverjene oznake se skupaj z virom, zaupanjem in intervalom kopirajo v rezultat
opisa ter upodobijo kot nezaupanja vredna opažanja poleg opisov sličic. Neveljavno
besedilo, besedilo zunaj obsega ali besedilo brez podatkov o izvoru se zavrne,
namesto da bi se pomešalo v tok opisov. Oba kanala prepisa v telesu zahteve
normalizirata navedeni izvor na `client`, vključno s samodeklariranimi oznakami
`embedded` ali `audio-bridge`. Samo prilagojevalnik pod nadzorom strežnika lahko
te zaupanja vredne oznake dodeli prek argumenta `trustedSource`, ki je na voljo
samo v kodi; polje JSON v zahtevi ne more doseči tega argumenta. Besedilo prepisa
ostane nezaupanja vredna vsebina, pridobljena iz predstavnosti, ne glede na svoj
izvor, in nikoli ne sme določati avtorizacije.

Napredni klicatelj lahko za isti videoposnetek zagotovi zvočno sled
`audioTranscript`; obravnava se kot besedilo, ki ga je zagotovil odjemalec, in
ne kot dokaz strežniškega prepisovanja. Točka združevanja izvaja vizualna in
zvočna opažanja z enim rokom in signalom za prekinitev, jih razvrsti na skupni
časovnici, združi povsem enake dvojnike ter sporoči delni rezultat, kadar uspe
samo ena stran. Neveljaven `audioTranscript` povzroči prehod na tak delni
rezultat — vizualni opis se ohrani, zvočna veja pa zabeleži očiščeno kodo napake —
namesto da bi spodletel celoten videoposnetek. Razpoložljivost posamezne veje,
zastavica delnega rezultata in očiščene kode napak se ohranijo v rezultatu opisa,
v metapodatkih zaščitnih mehanizmov (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), v metapodatkih predpomnilnika rezultatov in v števcih
združevanja premostitvene plasti. Privzeta pot Video Bridge ne prikliče pretvorbe
govora v besedilo in ne prenese druge kopije predstavnosti; brez te izrecno
podane sledi ostane omejena samo na video.

**Zadrževanje transkriptov (#12150 P1).** To se uporabi samodejno, kadar koli Video Bridge (ki je sam po sebi izbirno vklopljiv) upodobi cue transkripta — ločene zastavice za zadrževanje ni. Ko zahteva upodobi kateri koli cue transkripta (s strani klicatelja deklariran `transcript` ali združen `audioTranscript`), ga zaščitni mehanizem (guardrail) označi kot `videoBridgeObserved` in ustvari zakrito senco opisa videa — identičen prikaz, v katerem je prosto besedilo telesa vsakega cueja nadomeščeno z `[redacted-video-transcript]`, zgrajeno z zamenjavo strukturiranega polja cueja, preden se niz sestavi (nikoli z razčlenjevanjem sploščenega besedila, tako da nobena vsebina cueja — sovražna ali običajna, vključno s telesi, ki vsebujejo `]`, kot sta `[inaudible]`/`[music]` — ne more preživeti). V trajno shranjenem telesu zahteve v dnevniku klicev se vsak iz videa izpeljan besedilni del zamenja s to zakrito senco, povezano po enakosti vsebine; sidro `fullText` se ponovno prebere iz dokončane koristne obremenitve guardraila pred klicem, zato ujemanje še vedno uspe, potem ko kasnejši guardraili v verigi (maskirnika PII in poverilnic, prioriteti 10/95) na mestu prepišeta besedilo opisa in potem ko injekcija sistemskega poziva/predaje/pomnilnika preoblikuje polje sporočil. Telo, poslano navzgor modelu, ostane nespremenjeno. Opažena zahteva prav tako ne napolni nobenega trajnega pomnilnika Memory (izločanje, izpeljano iz zahteve in iz odgovora, se preskoči), zato lastni odgovor modela ne more odbiti besedila transkripta v Memory.

**Surova video polja (#12430).** Ko je most omogočen in izvorna podpora za video ni znana ali je ni, definirana polja `transcript`/`audioTranscript` prav tako aktivirajo `videoBridgeObserved`, tudi po neuspehu opisovanja ali omejitvi `maxVideos`. Vrednosti `null` in prazni nizi štejejo; odsotna polja in nevideo metapodatki pa ne. Zadržane kopije ta polja zakrijejo ali zahtevo izpustijo, predpomnilniki/Memory pa se zaobidejo.

Na teh pomožnih poteh (fallback) veljavni klicateljevi cueji postanejo podprti deli `text`/`input_text` namesto nestandardnih polj ponudnika. Obe sledi, podani v zahtevi, ostaneta nezaupljivi opažanji `client`, z izrecnim opozorilom, da video ni bil opisan in da časovni žigi niso bili preverjeni glede na medij. Obstoječi skupni proračun 256 cuejev/64 KiB in proračun na cue veljata za obe sledi skupaj; časovni žigi se morajo prilegati zgornji meji posrednika 600 sekund in morebitnemu podanemu fokusnemu oknu. Neveljavne sledi se zavržejo in se ne posredujejo kot poljubno besedilo; veljavna sorodna sled se lahko še vedno uporabi, razen če je njun skupni proračun presežen. Polja z null/prazno vrednostjo ne dodajo besedila. Ta pomožna pot ne doda pridobivanja medija niti prepisovanja. Razširitvena polja transkripta se odstranijo iz pomožnega nosilca videa in njegovih objektov `video_url`/`source`. Dovoljeni seznam žičnega protokola OpenAI ostane strog; nosilci videa z neznano izvorno podporo ostanejo na voljo, znani cilji samo za besedilo pa ohranijo varne označevalce. Strukturirane zakritje-sence ščitijo dodano besedilo transkripta, medtem ko izvirna zahteva v lasti klicatelja ostane nespremenjena. Cilji z izvorno podporo in onemogočeni mostovi ohranijo svoje obstoječe vedenje zaobida.

Dodatne zadržane kopije uporabljajo isti signal opažene zahteve. Surovi posnetek zahteve odjemalca pred guardrailom, čakajoča zahteva v pomnilniku in zgodnji dnevnik zavrnjenih zahtev strukturno zamenjajo polja transkripta v video delih; nizovni pozivi, sintetizirani s strani stopenj cevovoda in predaje konteksta, se zakrijejo na ponoru trajno shranjenega telesa zahteve. Trajno shranjen označevalec `video_content_removed` povzroči, da nadaljevanje prek `previous_response_id` varno spodleti (fail closed), namesto da bi rekonstruiralo besedilo, ki je bilo namerno zavrženo. Če opažena zahteva pred beleženjem izgubi svojo zakrito senco na del ali če celo ena od več video senc po kasnejših mutacijah zahteve ne uspe pri ujemanju, se zadržano telo zahteve v celoti izpusti, namesto da bi se zadržal delno zakrit transkript.

Pri opaženi zahtevi lahko odgovor modela citira kateri koli del transkripta brez strukturne meje cueja. Njen trajno shranjen `responseBody` v dnevniku klicev se zato nadomesti z označevalcem izpusta; podroben artefakt cevovoda (ki lahko vključuje telesa navzgor/odjemalca in kose toka) se ne zadrži. Semantični, idempotentnostni in reasoning-replay predpomnilniki za to zahtevo zaobidejo branja in pisanja. Zahteva ponudnika in odjemalcu viden odgovor ostaneta nespremenjena. Zgodnji bajti keepalive se izpraznijo iz začasnega medpomnilnika, ko se podroben artefakt izpusti. Kirovo opozorilo o poškodovanem EventStream poroča le število bajtov koristne obremenitve, nikoli njeno vsebino ali surovo napako razčlenjevalnika JSON. To ne trdi, da je bila pregledana vsaka nepovezana diagnostika ponudnika/vtičnika; širši pregled zadržanih ponorov se spremlja v #11658.

Notranji življenjski cikel `/api/modality-bridge/video/drilldown` je ločena podlaga predpomnilnika, preverjena prek povratne zanke (loopback)/žetona. Vsaka operacija prav tako zahteva kanonični neprehoden ID subjekta (principal). Preden se produkcijskemu klicatelju omogoči, mora ta ID izpeljati iz preverjenega najemnika in nikoli ne sme posredovati vrednosti, ki jo je izbral odjemalec. Ključi predpomnilnika vežejo tega subjekta na kanonične ID-je seje in video-reference, shranjujejo le njihove iz SHA-256 izpeljane ključe ter omejijo tako branja kot brisanje na istega subjekta. Predpomnilnik shrani največ 16 izpeljanih sličic JPEG na vnos, jim po desetih minutah poteče veljavnost in podpira omejena branja `start`/`end` ali izrecno brisanje seje.

Vsak subjekt je omejen na 16 vnosov in 64 MiB kanoničnih podatkov JPEG. Te omejitve so neodvisne od globalne zgornje meje 64 vnosov/256 MiB: pritisk kvote subjekta izloči le najmanj nedavno uporabljene vnose tega subjekta, preden se upošteva globalno izločanje LRU. Pretečeni vnosi se ob aktivnosti predpomnilnika počistijo iz obračunavanja tako subjekta kot globalnega, medtem ko preklic in neuspešna validacija ne potrdita delne zamenjave.

Predpomnilnik zavrača nekanonični Base64, odvečno polnilo, medije, ki niso JPEG, poškodovane ali odrezane datoteke JPEG ter datoteke JPEG, ki med omejenim dekodiranjem celotne slike z `sharp` sprožijo opozorilo. Vsako sprejeto sliko ponovno kodira kot kanonični JPEG, širino in višino izpelje iz dekodiranih bajtov, namesto da bi zaupal poljem klicatelja, in zavrže vse zadnje poliglotske bajte, namesto da bi jih ohranil. V obe kvoti se všteje samo omejeni kanonični stisnjeni medpomnilnik. Omejitev prenosa JSON vključuje režijske stroške Base64 za zgornjo mejo 32 MiB dekodiranega vhoda. Vsaka shranjena izpeljava beleži svojo potrjeno obliko/ločljivost JPEG, politiko vzorčenja, različico izpeljave, čas ustvarjanja, na strežniku izračunano zgoščeno vrednost vsebine ter zgoščen sklic na nadrejeni element in zgoščeno vrednost nadrejene vsebine zaupanja vrednega klicatelja. Preklic se preverja med asinhronimi fazami dekodiranja/zgoščevanja pred atomičnim zapisom v predpomnilnik.

Ta sklop še ne povezuje produkcijskega proizvajalca s potjo in ne omogoča izbire različic z več ločljivostmi. Transparentna pot zahteve Video Bridge zato ne povzroča dodatnega dela, medtem ko izpeljava principalov, vezana na najemnika, in celoten življenjski cikel več ločljivosti FU-08 ostajata izrecno opredeljeno nadaljnje delo in nista dokumentirana kot dokončano vedenje.

Sličice se zaporedno opisujejo s konfiguriranim modelom Video. Prazna nadomestitev Video podeduje nastavitev Vision; če sta obe prazni, samodejni usmerjevalnik Vision izbere dejanski model z zmogljivostjo vida. Uspešni opisi nadomestijo izvirni del s stabilno predpono `[Video description:`, ki besedilo označi tudi kot nezaupanja vredno opažanje, izpeljano iz medijev, in naknadnim modelom naroči, naj ne sledijo navodilom, najdenim v medijih. Ključi predpomnilnika opisov sličic vključujejo bajte JPEG, poziv, časovni žig in dejanski model; predpomnijo se samo uspešni opisi. Vnosi predpomnilnika ohranijo dejanski uspešni model proizvajalca, vključno z nadomestnim modelom; most poroča `mixed`, kadar so različne sličice izdelali različni modeli. Zadetek predpomnilnika ponovno uporabi to identiteto proizvajalca, namesto da bi jo preimenoval v zahtevani načrt usmerjanja. Predpomnilnik rezultatov celotnega videa je ključiran glede na vsak vhod, ki spremeni izhod — poziv, dejanski model, politika vzorčenja, število sličic, način semantične analize, prstni odtis SHA-256 normaliziranega namiga fokusa, okno fokusa, `transcript`, `audioTranscript` in zastavica kontaktnega lista — zato je sprememba katere koli od teh dimenzij zgrešitev predpomnilnika, nikoli zastarela ponovna uporaba. Različica politike vizualne deduplikacije, prag in omejeno število kandidatnih sličic so prav tako izrecno navedeni v ključu in metapodatkih predpomnilnika rezultatov; sprememba politike zato ne more ponovno uporabiti zastarelega opisa celotnega videa. Metapodatki predpomnilnika rezultatov v4 ohranijo način in prstni odtis, nikoli surovo uporabnikovo nalogo. Metapodatki varovala poročajo tako zahtevani kot dejanski način analize; zahtevani način `focused` brez uporabnega uporabniškega besedila se prijavi kot dejansko `full`.

Varovalo izvleče vsak podprti video del, vendar ne opiše več kot `modalityBridgeVideoMaxVideos`. Za cilj, za katerega je dokazano, da ima `supportsVideo === false`, neuspeli videoposnetki in tisti nad omejitvijo postanejo izrecni varni besedilni označevalci, tako da noben surov video ne preživi. Ko zmogljivost ni znana, ti deli ohranijo svoj video nosilec; vsak nadomestni prepis sledi zgoraj opisani omejeni pretvorbi besedila. Cilji z `supportsVideo === true` zaobidejo most. Signal preklica zahteve odjemalca se širi skozi prenos, čakalno vrsto posrednika, podprocese in klice opisov; preklici se ustavijo med videoposnetki in se ob odpovedi nikoli ne odprejo proti surovim medijem.

Nastavitve izvajanja so podprte z bazo podatkov in potrjene z Zod:

| Ključ                               | Privzeto    | Obseg / vedenje                                                                                          |
| ----------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Izbirno med izvajanjem, vklop po izbiri                                                                  |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` ohranja splošne opise; `focused` uporablja omejen, nezaupanja vreden kontekst zadnjega uporabnika |
| `modalityBridgeVideoModel`          | `""`        | Podeduje model Vision Bridge                                                                             |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                     |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` ali sorazmerni `segment_aware`; ob odpovedi detektorja se vrne na `uniform`     |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                      |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                           |

Podedovane shranjene vrednosti časovne omejitve Video nad 120 sekund se prirežejo na rok posrednika; novi zapisi nastavitev nad to omejitvijo se zavrnejo. `GET /api/modality-bridge/video/runtime` zahteva zaupanja vredno označeno lokalnost loopback pred avtentikacijo ali sondiranjem izvajalnega okolja, nato pa zahteva avtentikacijo za upravljanje. Vrne samo `available`, očiščene različice FFmpeg/ffprobe in stalni razlog, kadar izvajalno okolje ni na voljo. Notranja končna točka ekstrakcije ni javni API za nalaganje: nasičenost čakalne vrste vrne `503` in `Retry-After`, prekinitev povezave klicatelja vrne `499`, fiksni rok posrednika pa vrne `504`. Pretvorjeni odgovori osrednji glavi `x-omniroute-modality-bridge` dodajo `video->text;model=<visionModel>;parts=<videos>`, ne da bi odstranili segmente Vision ali Audio.

### PII Masker (`piiMasker.ts`)

Izvaja se na **obeh** stopnjah.

- **`preCall`** klonira koristni tovor, prehodi `system`, `messages`, `input` in
  `prompt` (vključno s preprostimi nizovnimi elementi) ter uporabi `processPII()` (iz
  `@/shared/utils/inputSanitizer`) na nizovnih poljih `content`/`text`. Ko je
  `PII_REDACTION_ENABLED=true`, se zaznani osebni podatki (PII) v odhodnem koristnem
  tovoru zakrijejo. To je neodvisno od `INPUT_SANITIZER_MODE` (ki nadzoruje le politiko
  vbrizgavanja pozivov). Ko je zakrivanje izklopljeno, klic zabeleži števila zaznav, ne
  da bi prepisal vsebino.
- **`postCall`** globoko klonira odziv, zažene `sanitizePIIResponse()` in
  maskirnik oblike Responses API (`maskResponsesOutput` — pokriva
  `output_text` in `output[].content[].text`). Če pride do kakršnega koli zakrivanja,
  spremenjeni odziv nadomesti izvirnega.

Varovalo nikoli ne blokira; le označi (`meta.detections`,
`meta.redacted`) ali prepiše.

#### Izbira po vrstah, vzorci po meri in števci zaznav

**Nadzorna plošča → Nastavitve → Varnost → Zakrivanje PII** izbira, _kaj_ se zakrije.
Ne vklaplja zakrivanja: to sta še vedno `PII_REDACTION_ENABLED` (zahteva) in
`PII_RESPONSE_SANITIZATION` (odziv + SSE), obe privzeto izklopljeni.

- **Izbira po vrstah** — vgrajeni ID-ji so navedeni v
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Nenastavljeno pomeni vse
  vrste (obnašanje pred uvedbo te nastavitve). Vzorec `ssn_us` mehanizma zahtev se
  preslika v `ssn`. Predloge (Minimal, Standard, Financial,
  Brazilian, USA, Full) le izpolnijo potrditvena polja v uporabniškem vmesniku.
- **Vzorci po meri** — do 20 regularnih ali nadomestnih vzorcev (`*` = do 64
  ne-presledkovnih znakov, `?` = en znak). Zadetki postanejo `[CUSTOM_REDACTED]`.
  Vsak vzorec gre skozi `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): največ 500 znakov, zastavice omejene
  na `g i m s u`, mora se prevesti, mora prestati `safe-regex` (katastrofalno
  povratno sledenje) in ne sme se ujemati s praznim nizom ali opolnilom za zakritje.
  Vzorec, ki preverjanja ne prestane, se zavrne ob shranjevanju in ob testiranju,
  shranjena vrstica, ki ga ne prestane, pa se med izvajanjem preskoči namesto da bi se
  prevedla. Vzorci po meri se izvajajo le, ko je zakrivanje vklopljeno.
- **Števci zaznav** — števila po vrstah (nikoli ujemajoče se vrednosti), shranjena v
  pomnilniku in ponastavljena ob ponovnem zagonu (`src/lib/pii/piiDetectionStats.ts`).
  Povečujejo se le, ko je zakrivanje vklopljeno.

Nastavitve so shranjene v tabeli `key_value` (imenski prostor `pii_settings`,
`src/lib/db/piiSettings.ts`) in se berejo prek 1-sekundnega predpomnilnika. API:

| Metoda | Pot                      | Namen                                                               |
| ------ | ------------------------ | ------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Stanje zastavic, `enabledTypes`, `customPatterns`, števci zaznav    |
| `PUT`  | `/api/settings/pii`      | Zamenja `enabledTypes` (`null` = vse) in/ali `customPatterns`       |
| `POST` | `/api/settings/pii/test` | Poskusni zagon enega vzorca na vzorcu največ 8 KB; nič se ne shrani |

Vsi trije zahtevajo upravljalsko avtentikacijo in preverjajo telo z Zod
(`src/shared/validation/schemas/piiSettings.ts`).

### Vbrizgavanje pozivov (`promptInjection.ts`)

Zaznava sovražne strukture v vsebini, ki jo posreduje uporabnik, in uveljavlja
konfigurirano politiko. Obnašanje nadzorujejo okoljske spremenljivke in možnosti
konstruktorja:

| Nastavitev      | Okoljska spremenljivka                                                                                   | Privzeto | Učinek                                                                                                                                                                                                       |
| --------------- | -------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Vklopljeno      | `INPUT_SANITIZER_ENABLED`                                                                                | `true`   | Pri `false` se varovalo zaobide.                                                                                                                                                                             |
| Način           | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                          | `warn`   | Politika vbrizgavanja: `block`, `warn` ali `log`. (`redact` je sprejet zaradi združljivosti za nazaj, vendar besedila vbrizgavanja **ne** odstrani; prepis PII v zahtevi nadzoruje `PII_REDACTION_ENABLED`.) |
| Prag blokiranja | možnost `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (vzdevek `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`   | Najmanjša resnost, potrebna za blokiranje. Srednja je pri privzeti vrednosti le opazovalna.                                                                                                                  |

**Prednost načina** (`getMode`): `options.mode` klicatelja →
`INJECTION_GUARD_MODE` **prepis prek zastavice funkcij v bazi** (Nadzorna plošča →
Nastavitve → Zastavice funkcij) → okoljska `INJECTION_GUARD_MODE` → okoljska
`INPUT_SANITIZER_MODE` → `warn`. Prepis iz nadzorne plošče torej premaga okoljske
spremenljivke, zato uporabniški vmesnik Zastavic funkcij nadzoruje delujoče varovalo
v živo (brez ponovnega zagona). Branje iz baze je varno ob napaki: če spodleti,
varovalo preide na obnašanje po okoljskih spremenljivkah, ko pa prepis ni nastavljen,
je obnašanje enako razreševanju le iz okolja.

Viri zaznave:

1. `sanitizeRequest()` iz `@/shared/utils/inputSanitizer` (skupni nabor detektorjev,
   uporabljen drugje v cevovodu).
2. Vgrajeni `DEFAULT_GUARD_PATTERNS` (trenutno `system_override_inline` in
   `markdown_system_block`, oba resnosti `high`).
3. Izbirni `customPatterns`, posredovani prek možnosti konstruktorja (nizi, regularni
   izrazi ali zapisi `{ name, pattern, severity }`).

Ko je `mode === "block"` **in** vsaj ena zaznava doseže prag resnosti, `preCall` vrne `{ block: true, message: "Request rejected: suspicious content detected" }`. V načinih `warn`/`log` varovalo (guardrail) zabeleži, a klic dovoli. Skupna pomožna funkcija `evaluatePromptInjection()` je prav tako izvožena za klicatelje, ki morajo ovrednotiti pozive, ne da bi šli skozi register.

**Meja pregleda (v3.8.20):** detektor pregleda samo **prvih 16 KB** združenega besedila poziva — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bajtov) v `src/shared/utils/inputSanitizer.ts`. Tako `detectInjection()` kot `evaluatePromptInjection()` pred zagonom zanke vzorcev izvedeta `slice(0, MAX_INJECTION_SCAN_BYTES)`. Direktive za vbrizgavanje se nahajajo blizu vrha vnosa, zato to omeji porabo CPU/GC regularnih izrazov pri koristnih obremenitvah velikosti več sto KB, ne da bi oslabilo zaznavanje (gl. #3932, #4041).

### Zakrivanje poverilnic (`credentialMasker.ts`)

Izvaja se v **obeh** fazah, zadnje v privzeti verigi (prioriteta `95`). Zakrije dobro znane vzorce ključev API / skrivnih žetonov iz odhodne koristne obremenitve (vsebina sporočil, argumenti klicev orodij, rezultati orodij) **in** iz odgovora ponudnika, tako da poverilnica, prilepljena v poziv (ali vrnjena kot odmev v rezultatu orodja), ne uhaja do višjega ponudnika ali nazaj do odjemalca.

- **Samo po izbiri (opt-in)**, enaka konvencija kot zakrivanje PII (poleg trdega pravila št. 20): onemogočeno, razen če je `settings.credentialRedactionEnabled === true` **ali** `CREDENTIAL_REDACTION_ENABLED=true`. Ko je izklopljeno, je varovalo brez učinka (no-op) — nikoli ne blokira in nikoli ne prepisuje.
- `redactCredentials()` prehodi celotno drevo koristne obremenitve/odgovora (`walkValue()`, varno pred onesnaženjem prototipov, varno pred cikli prek `WeakSet`) in zamenja zadetke z oznako `[REDACTED:<type>]`, pri čemer klonira samo veje, ki so se dejansko spremenile.
- `CREDENTIAL_PATTERNS` zajema ključe ponudnikov LLM (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), žetone VCS/SaaS (GitHub, Slack, Linear, Notion, npm, Postman, Discord), plačilne ključe (Stripe, Square), oblačne ključe (dostopni ključ AWS, Twilio, SendGrid, Mailgun), zasebne ključe / žetone JWT, povezovalne nize s poverilnicami (`mongodb://user:pass@...` itd.) in generični vzorec vrednosti glave `Authorization`/`x-api-key`/`api-key`/`apikey`. Ključi v obliki glave (`authorization`, `x-api-key`, `api-key`, `apikey`) se zakrijejo strukturno (samo vrednost, predpona sheme, kot sta `Bearer `/`Basic `, se ohrani) in ne prek generičnega besedilnega regularnega izraza.
- Varovalo nikoli ne blokira; samo prepisuje (`modifiedPayload` / `modifiedResponse`) in dodaja anotacije (`meta.credentialsRedacted`, `meta.count`).

Regresijsko varovalo: `tests/unit/credential-masker-guardrail.test.ts`.

## Osnovna pogodba (`base.ts`)

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // true prekine izvajanje verige
  message?: string; // prikazano ob blokiranju
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // vrne preCall za prepis zahteve
  modifiedResponse?: TValue; // vrne postCall za prepis odgovora
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  signal?: AbortSignal;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

Varovalka signalizira »brez spremembe« z vračanjem `void`, `{}` ali
`{ block: false }`. Vrnitev `modifiedPayload`/`modifiedResponse` zamenja
vrednost, ki teče skozi verigo, za varovalke, ki sledijo.
`signal?: AbortSignal` prenaša življenjski cikel klicatelja v varovalke. Prekinitev zahteve je namerna izjema načela fail-open: medijski mostovi prenehajo z delom in počistijo, ne da bi surove medije obnovili na cilj, za katerega je znano, da jih ne podpira.

## Register (`registry.ts`)

Singleton `guardrailRegistry` ponuja:

- `register(guardrail)` — doda varovalko (ali jo zamenja po normaliziranem imenu) in
  znova razvrsti po naraščajoči `priority`.
- `clear()` / `list()` — administrativni pomožni funkciji.
- `runPreCallHooks(payload, context)` — iterira čez aktivne varovalke, prevleče
  tovor skozi `modifiedPayload` in se ustavi ob prvem `block: true`.
- `runPostCallHooks(response, context)` — enak potek na strani odgovora.
- `resetGuardrailsForTests({ registerDefaults })` — počisti stanje in po želji
  ponovno registrira privzete varovalke za čisto izolacijo testov.

Oba izvajalca vrneta `{ blocked, payload|response, results, guardrail?, message? }`,
kjer je `results` polje zapisov `GuardrailExecutionResult`, ki za vsako varovalko
vključujejo polja `blocked`, `skipped`, `modified`, `error` in `meta`, kar je
uporabno za sledenje.

### Onemogočanje varovalk za posamezno zahtevo

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` zbere seznam imen
varovalk brez dvojnikov, ki naj se za trenutno zahtevo preskočijo. Obstaja pet
kanalov, prebranih v tem vrstnem redu in združenih v en seznam (pri
odstranjevanju dvojnikov zmaga prva pojavitev):

1. `apiKeyInfo.disabledGuardrails`
2. `disabledGuardrails` v telesu zahteve (najvišja raven)
3. `metadata.disabledGuardrails` v telesu zahteve (samo če je `metadata` objekt)
4. Glava `x-omniroute-disabled-guardrails`
5. Zastarela glava `x-disabled-guardrails`

Vseh pet kanalov se združi, vključno z obema glavama: pošiljanje obeh
`x-omniroute-disabled-guardrails` in `x-disabled-guardrails` preskoči unijo
njunih seznamov, prazna sodobna glava pa ne skrije več zastarele
([#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412), odpravljeno v
[#16805](https://github.com/diegosouzapw/OmniRoute/pull/16805)).

Vrednosti so lahko polja nizov ali niz, ločen z vejicami; imena se obrežejo in
normalizirajo v kebab-case z malimi črkami (`pii_masker` → `pii-masker`), prazni
vnosi pa se izpustijo. Rezultat se prek `context.disabledGuardrails` posreduje
registru, ki preskoči ujemajoče varovalke (`skipped: true` v `results`).

Seznam onemogočanja vpliva samo na **register**. Način `block` varovalke proti
vbrizgavanju pozivov je obvezna meja: vmesna programska oprema injection-guard
(`src/middleware/promptInjectionGuard.ts`) kliče `evaluatePromptInjection()`
brez katerega koli seznama onemogočanja, ki bi ga nadziral klicatelj (mrtvi
klic `resolveDisabledGuardrails({ body })`, ki ga je prej izvajala, je bil
odstranjen v
[#16934](https://github.com/diegosouzapw/OmniRoute/pull/16934)), zato je
zahteva, ki onemogoči `prompt-injection`, v načinu `block` še vedno zavrnjena.
To je namenoma tako zasnovano. Kanale onemogočanja nadzira klicatelj (telo
zahteve, metapodatki, glave), klicatelj pa ne sme imeti možnosti izklopiti
varnostnega nadzora, ki ga je nastavil operater
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Unija glav
iz [#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412) spreminja
le to, katere varovalke v registru se preskočijo; odjemalcu ne omogoča zaobiti
vmesne programske opreme. Obvezna pravila varovalk po ključih in po skupinah se
spremljajo v RFC v4 [#16417](https://github.com/diegosouzapw/OmniRoute/issues/16417).
Glejte [Pokritost in omejitve](#coverage-and-limits).

## Vrstni red izvajanja

Za vsako zahtevo, ki teče skozi `src/sse/handlers/chat.ts` in
`open-sse/handlers/chatCore.ts` (poti družine klepeta, navedene pod
[Pokritost in omejitve](#coverage-and-limits)):

1. `resolveDisabledGuardrails(...)` sestavi seznam preskoka iz ključa API,
   telesa zahteve in glav.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` zažene varovala v naraščajočem
   vrstnem redu prioritete:
   - Onemogočena varovala se zabeležijo kot `skipped`.
   - `preCall` vsakega varovala lahko prepiše koristno obremenitev prek `modifiedPayload`.
   - Prvi `block: true` sproži kratki stik v verigi in obdelovalec vrne
     odziv o zavrnitvi varovala.
3. (Morebiti prepisana) koristna obremenitev priteče v usmerjanje kombinacij (combo routing)
   in odpošiljanje višnjim ponudnikom (upstream).
4. **Samo brez pretakanja:** ko je odziv sestavljen,
   `guardrailRegistry.runPostCallHooks(...)` zažene isto verigo na
   odzivu. `block: true` tukaj zavrže odziv višnjega ponudnika in vrne HTTP 400. Pretakani odzivi ta korak v celoti preskočijo.

Varovala, ki vržejo izjemo, se zabeležijo z `error: <message>` in zapišejo v dnevnik prek
`logger.warn`, veriga pa se nadaljuje — po zasnovi odprto ob napaki (fail-open).

## Pokritost in omejitve

Register varoval je vpeljan samo v cevovod klepeta. Te omejitve so
zasidrane s testoma `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` in
`tests/unit/guardrail-pipeline-characterization.test.ts`; ko se vedenje spremeni, tista
testa namenoma posodobite.

### Kje se kljuke izvajajo

| Kljuka / kontrola                          | Izvaja se pri                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                          | Zahteve, ki jih obdeluje `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (in `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*` in posrednik za klepet Telegram. Prav tako testna končna točka nadzorne plošče `/api/guardrails/test`. Blokada pred klicem vrne HTTP 400. |
| `runPostCallHooks`                         | **Samo nepretakani** odzivi klepeta (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Pretakani odzivi je nikoli ne dosežejo.                                                                                                                                                                                                                                                                                                               |
| PII v pretakanju                           | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), vključen v cevovod v `streamingPipeline.ts`, ko je `PII_RESPONSE_SANITIZATION` vklopljena. Ni varovalo, zato kanali za onemogočanje nanj ne vplivajo.                                                                                                                                                                                                                               |
| Vmesna oprema injection-guard (podedovana) | Vsaka pot `/v1`, ki nosi poziv, vključno z družino klepeta (glej [pokritost poti](#injection-guard-route-coverage--red-team-phase-8--block-d)). Samo vbrizgavanje pozivov.                                                                                                                                                                                                                                                                        |

### Kaj ni zajeto

- **Poti za medije, vdelave in podatke** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) nikoli ne dosežejo registra. Tam ne teče
  nobeno maskiranje PII, maskiranje poverilnic ali most modalnosti. Njihovo edino
  preverjanje je podedovana vmesna oprema injection-guard.
- **Pretakani odzivi** nimajo varoval po klicu: ne `pii-masker` ne
  `credential-masker` po klicu in ni blokade po klicu. Uporabi se samo
  transformacija PII v pretakanju (ko je `PII_RESPONSE_SANITIZATION` vklopljena). Poverilnica,
  odmevana nazaj v pretakanem odzivu, ni zakrita.
- **Kanali za onemogočanje v primerjavi z vmesno opremo (po zasnovi):** vmesna oprema ocenjuje
  vbrizgavanje pozivov s svojim klicem `evaluatePromptInjection()`, brez
  posredovanja kakršnega koli seznama onemogočitev pod nadzorom klicatelja. Način
  `block` je obvezna meja, ki je onemogočitve pod nadzorom klicatelja ne morejo zaobiti,
  tudi na poteh družine klepeta
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Onemogočanje
  `prompt-injection` preskoči samo varovalo registra.

### Kaj vidi odziv pred korakom post-call

Na nepretakani poti je vrstni red: ekstrakcija spomina → izvajanje vgrajenih
orodij → varovala po klicu → izhod ob blokadi po klicu → zapis v semantični predpomnilnik.

- **Pridobivanje spominov** in **izvajanje orodij** vidita odziv, preden ga lahko varnostne zaščite po klicu (post-call) prepišejo ali blokirajo. Od [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401) pridobivanje spominov izvlečeno besedilo pošlje skozi `sanitizePII`, kadar je `PII_RESPONSE_SANITIZATION` vklopljeno (tako pri pretakanju kot brez njega), vendar je bil odziv, ki ga post-call pozneje blokira, že prej posredovan spominu in orodjem.
- **Semantični predpomnilnik** shrani odziv po post-call, zato shrani prepisani odziv, blokirani odziv pa nikoli ni predpomnjen. Vnosi predpomnilnika so vezani na posamezen ključ API.

## Konfiguracija

Okoljske spremenljivke, ki jih berejo vgrajena varovala:

| Spremenljivka                         | Uporablja                      | Učinek                                                                                                                       |
| ------------------------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`             | Nastavite `false`, da zaznavanje popolnoma onemogočite.                                                                      |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`             | Politika injiciranja: `warn`, `block` ali `log`. Podedovana vrednost `redact` ne prepiše besedila injiciranja.               |
| `INJECTION_GUARD_MODE`                | `prompt-injection`             | Način zaščite pred injiciranjem; hkrati zastavica funkcije v bazi podatkov, ki **povozi** okoljske spremenljivke (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`             | Najnižja resnost, ki jo `MODE=block` zavrne: `high` (privzeto), `medium` ali `low`.                                          |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`             | Podedovani vzdevek za `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                     |
| `PII_REDACTION_ENABLED`               | `pii-masker`                   | Ko je `true`, se PII v zahtevku zabriše (neodvisno od načina injiciranja).                                                   |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (navzdol po toku) | Nadzoruje vedenje maskirnika na strani odziva.                                                                               |

Varovala Modality Bridge berejo konfiguracijo izvajanja iz shrambe nastavitev,
podprte z bazo podatkov (`getSettings()`), ne iz okoljskih spremenljivk.
Primarni ključi za Vision so
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` in
`modalityBridgeCacheMaxEntries`. Podedovani ključi
`visionBridge*` se sprejemajo le kot dokumentirano enociklično nadomestno
branje; nadzorna plošča pri pisanju uporablja primarne ključe. Privzete
vrednosti in razreševalnik nadomestnih vrednosti se nahajata v
`src/shared/constants/modalityBridgeDefaults.ts`, podedovane konstante pa so
ohranjene v `src/shared/constants/visionBridgeDefaults.ts`.

Audio uporablja `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` in `modalityBridgeAudioMaxClips`, poleg tega pa
tudi skupne nastavitve `modalityBridgeCache*`. Audio nima nadomestne poti za
podedovane ključe, ker so bili ti ključi uvedeni s shemo Modality Bridge.

Video uporablja `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` in
`modalityBridgeVideoTimeout`, poleg tega pa tudi skupne nastavitve
`modalityBridgeCache*`. Privzeto je onemogočen, ker sta FFmpeg/ffprobe izbirni
operativni odvisnosti, opisovanje sličic pa povečuje zakasnitev in stroške
modela.

## Guardrails po meri

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

Koraki:

1. Ustvarite `src/lib/guardrails/myGuardrail.ts`, ki razširja `BaseGuardrail`.
2. Implementirajte `preCall` in/ali `postCall`.
3. Bodisi registrirajte ob uvozu (potis iz `registerDefaultGuardrails`) bodisi
   pokličite `guardrailRegistry.register(...)` med izvajanjem — register zamenja
   vsak prejšnji guardrail z enakim normaliziranim imenom.
4. Dodajte teste pod `tests/unit/` (obstoječi primeri:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testiranje

Med testi uporabite `resetGuardrailsForTests()`, da začnete iz znanega stanja.
Podajte `{ registerDefaults: false }`, da začnete s praznim registrom in
registrirate samo guardraile, ki jih testirate. Vision Bridge sprejema vbrizgavanje
odvisnosti (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge izpostavlja
enake točke za nastavitve, zmogljivosti, izbiro STT-modela, preverjanje poverilnic
in prepisovanje. Testi lahko zato preizkusijo oba toka brez dostopa do baze
ali omrežja.

## Glejte tudi

- `src/lib/guardrails/` — implementacija
- `src/shared/utils/inputSanitizer.ts` — skupni detektor, ki poganja
  zaznavanje prompt-injection in maskiranje osebnih podatkov (PII)
- `src/shared/constants/visionBridgeDefaults.ts` — privzete vrednosti Vision Bridge in
  seznam modelov s prisiljenim mostom (forced-bridge)
- `src/shared/constants/modalityBridgeDefaults.ts` — skupne privzete vrednosti izvajalnega okolja Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — ortogonalna plast (circuit breaker, ohladitvena obdobja)
- `docs/reference/ENVIRONMENT.md` — popolni referenčni seznam okoljskih spremenljivk

## Pokritost poti z injection-guard in red-team (Faza 8 · Blok D)

Injection-guard (`createInjectionGuard` / `withInjectionGuard`) pokriva vse poti,
ki sprejemajo uporabniške pozive. Upošteva `INJECTION_GUARD_MODE` (privzeto `warn` = samo beleženje;
`block` = vrne HTTP 400 `SECURITY_001`).

| Tip                  | Poti                                                                                                                                                 | Privzeti način |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| Besedilo (obstoječe) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn           |
| Generativni          | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn           |
| Podatki              | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn           |

Ekstrakcija besedila (`extractMessageContents`) pokriva `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (nočno, `nightly-llm-security.yml`):** promptfoo preverja, da vsaka pot blokira
korpus OWASP-LLM v načinu `INJECTION_GUARD_MODE=block`; garak izvaja sonde (preskoči brez skrivnosti).
`moderations` je vključen zaradi doslednosti. Način block je obvezna meja: `evaluatePromptInjection()`
prezre seznam onemogočenih guardrailov za posamezno zahtevo, ki mu ga posreduje vmesna programska oprema (middleware),
zato `disabledGuardrails` poti **ne** izvzame iz njega ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).

Nočni delovni tok (`.github/workflows/nightly-llm-security.yml`, cron + ročni
prožilec) ima dve nalogi:

- **`promptfoo-guard` (blokirna)** — zažene `promptfoo eval -c promptfooconfig.yaml`
  z `INJECTION_GUARD_MODE=block`. Vsak nasprotni primer (npr. "ignore all
  previous instructions…", DAN-jailbreaki) preverja, da odgovor vsebuje
  `error.code === "SECURITY_001"`, tj. da je guard zahtevo dejansko zavrnil.
- **`garak` (svetovalna)** — zažene garak `--probes promptinject,dan,leakreplay`
  proti lokalni instanci OmniRoute (`http://localhost:20128/v1`). Pogojena s
  skrivnostjo ponudnika (`PROMPTFOO_PROVIDER_KEY`); se elegantno preskoči in je zaključena
  z `|| true`, zato poroča brez neuspeha CI.

Pokritost pomožnika guard (`createInjectionGuard` / `withInjectionGuard`)
obsega vsako pot `/v1`, ki nosi pozive; besedilo poziva se izlušči iz
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` z
`extractMessageContents()` v `src/shared/utils/inputSanitizer.ts`.
