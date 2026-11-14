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

## Vgrajene zaščitne ograje

Register ob uvozu samodejno naloži šest zaščitnih ograj v prednostnem vrstnem redu (glejte `registry.ts` → `registerDefaultGuardrails()`):

| Prioriteta | Ime                 | stopnja(e)     | Datoteka              |
| ---------- | ------------------- | -------------- | --------------------- |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Nižje prioritetne številke tečejo** prvi** .

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Osnovni model GLM 5.3 in `glm-5.3-{low,high,max}` imata eksplicitne metapodatke `supportsVision:false` registry/spec. Različice GLM 5.3 Flash ostajajo modeli z izvorno vizijo. Pot `/v1/messages` kode Claude vstopi v skupno verigo zaščitne ograje pred klicem `handleChat`** prej** prevod Claude-to-OpenAI; ugnezdene slike rezultatov orodja `Read` je treba opisati ali obdelati, preden jih prevod dvigne v vsebino OpenAI `image_url` (#17069).

Prestreže zahteve, ki nosijo sliko in so namenjene** nevizijski modeli** in bodisi preusmeri celotno zahtevo na vizualno zmožen model ali zamenja dele slike z besedilnimi opisi, ki jih ustvari nastavljiv vizualni model pred klicem navzgor. To ponudnikom samo besedila omogoča pregledno upravljanje večmodalnih tovorov.

pretok:

1. Preskočite, če ciljni model že podpira vision (razen če je prikazan na seznamu prisilnih mostov `isVisionBridgeForcedModel`).
2. Ekstrahirajte dele slike prek `extractImageParts(messages)` (`visionBridgeHelpers.ts`), ki prenese na** enoten detektor medijev** `detectMediaParts()` v `open-sse/utils/mediaParts.ts` — edini vir resnice v skupni rabi s kombiniranim filtrom združljivosti. Ekstrakcija je na seznamu dovoljenih za oblike, ki jih lahko `replaceImageParts` zlepi nazaj (izvleček ↔ zamenja pogodbo): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"` in odzivi API `input_image`. Ujemajoče se slike, ugnezdene znotraj kode Claude `tool_result.content` in izhodi orodja Responses, so prav tako ekstrahirani in zamenjani na njihovih izvirnih poteh; oblike samo za indikatorje so material kombiniranega filtra in se ne ekstrahirajo. Preskoči, če ni najden.
3. Razreši konfiguracijo izvajalnega časa prek `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`): novi ključi za nastavitve `modalityBridge*` zmagajo; stari `visionBridge*` ključi ostanejo a** enociklično rezervno delovanje** (povratno okno). Preskoči pred kakršnim koli medijskim prehodom, ko je most onemogočen.
4. Izbirnik načina (`modalityBridgeVisionMode`, glejte spodnjo tabelo) se odloči preusmeriti v primerjavi z opisom. Preusmeritev vrne `modifiedPayload` z zamenjanim samo `model` in meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Opišite pot: omejite slike na `maxImages`, sestavite poziv za upoštevanje opravil, poglejte v predpomnilnik opisa, pokličite model vizije** vzporedno** (`Promise.allSettled`) in na njihovo mesto vstavite besedilne dele `[Image N]: <description>`. Neuspešen opis prinese `null`: neobdelana slika se ohrani za cilje unknown/vision-capable (#4012), vendar** potrjen neposredni cilj samo z besedilom** ali zero-vision combo dobi eksplicitno besedilno škrbino `(unavailable — no vision-capable provider connected)` za vsako neopisano sliko, vključno z delnimi napakami in slikami, ki presegajo zgornjo mejo opisa klica (#17069). Obstoječa popolnoma neuspešna kombinacija opisuje nadomestno ostanke na mestu (#8430).
6. Vrni `modifiedPayload` + meta (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`).

#### Izbirnik načina (`modalityBridgeVisionMode`)

| Način      | Privzeto | Vedenje                                                                                                                                                                                                                                                                               |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔        | Podedovana hevristika, nedotaknjena (#6640/#7204): nekombinirani/`auto/` modeli se preusmerijo na najboljši model vida, razen če izvirni model že ima uporabne poverilnice (nato opišite); kombinirani cilji vedno opisujejo.                                                         |
| `describe` |          | Vedno opišite — blok preusmeritve je v celoti preskočen; vedno odgovarja uporabnikov izbrani model.                                                                                                                                                                                   |
| `reroute`  |          | Prisilna preusmeritev: zaščita modela ohranjanja poverilnic je zaobljena. Preusmeritev -** tarča** varovalo poverilnic še vedno uporablja — ko ni uporabnega ciljnega vida, most blokira z jasno napako, namesto da bi opisoval ali pošiljal neobdelane slike cilju samo z besedilom. |

Prisilni načini kratkega stika** prej** samodejna hevristika teče; Obnašanje `auto` je bajtno identično varovalni ograji pre-PR-1.

#### Obseg ključa API (`visionBridgeKeyScope.ts`)

Ko ključ API klicatelja omejuje `allowedConnections`, kvotne skupine (`allowedQuotas`) ali modele (`allowedModels` / `blockedModels` / `modelAccessMode: "restricted"` / `disableNonPublicModels`), most samo izbere preusmeritev in opiše modele, ki jih ključ lahko uporablja, na povezavah, ki jih lahko uporablja ključ. Klic describe gre nato vedno skozi samozanko OmniRoute z glavo `x-omniroute-self-loop-key-id`, tako da prejemna zahteva za klepet znova uveljavi povezavo in politiko modela tega ključa. `enforceApiKeyPolicy()` spoštuje to glavo samo skupaj z nosilcem samozanke, tako da lahko le zoži dostop, ID, ki se ne razreši, pa je zavrnjen.

Če za ključ ni dovoljen noben vizualni model, a** potrjen samo besedilni cilj** lokalno zavrne slikovno zahtevo s čistim HTTP 400, namesto da posreduje bajte slike nezmožnemu navzgornjemu (#17069). Za cilje z neznano ali izvorno sposobnostjo vida opisna pot ohrani svoje prejšnje vedenje pri odpiranju (meta `{ skipped: true, reason: "no_permitted_vision_model" }`). Zahteve brez ključa in ključi brez teh omejitev se obnašajo natanko tako kot prej.

#### Poziv za opis, ki upošteva opravilo (`modalityBridgeVisionTaskAware`)

Privzeto** res** . `composeVisionPrompt()` (`visionBridgeHelpers.ts`) doda besedilo** zadnje uporabniško sporočilo** (prirezano na 500 znakov) v poziv za osnovni opis, usmerja opis k temu, kar je uporabnik dejansko vprašal (vzorec codex-vision-proxy) in zahteva od modela vida, da prepiše vidno besedilo. Če je zastavica izklopljena — ali brez uporabniškega besedila — se osnovni poziv uporablja nespremenjen.

Opišite lastno zahtevo samozanke, združljivo z OpenAI (`callVisionModelSingle()` in `visionBridgeHelpers.ts`), vedno brezpogojno zahteva `image_url.detail: "high"` — za vsak caller/provider, ki ni prepuščen nobenemu signalu odjemalca. Vzorčenje z nizkimi podrobnostmi poslabša natančnost OCR za natančno nalogo prepisa besedila, ki jo zahteva ta poziv, zato sam klic describe vedno zahteva visoko podrobnost, ne glede na to, katero raven podrobnosti je uporabila izvirna vhodna zahteva. To vpliva samo na notranji opis telesa zahteve; ne spremeni, kako OmniRoute posreduje klicateljev lastni `image_url.detail` na primarno zahtevo —, ki se privzeto uporablja ločeno in samo za zaznane odjemalce OpenCode v `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Veja z žično obliko Anthropic opisne samozanke nima polja `detail` in nobena privzeta vrednost nanjo ne vpliva.

#### Opišite zgornjo mejo izhoda (`modalityBridgeVisionMaxChars`)

| Ključ                          | Privzeto | Razpon            |
| ------------------------------ | -------- | ----------------- |
| `modalityBridgeVisionMaxChars` | `0`      | `0` ali 100–50000 |

`0` (privzeto) pomeni** brez kapice** — se opis, ki ga vrne `callVisionModel()` posreduje nespremenjen, pri čemer se ohrani obstoječe vedenje. Vsaka vrednost v razponu 100–50000 skrajša opis s pripono `…`, preden se zlepi nazaj kot `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` v `src/lib/guardrails/visionBridge.ts`). Zvišajte to vrednost za naloge OCR, ki zahtevajo veliko podrobnosti, kjer spodnji model potrebuje popolno transkripcijo; znižajte na uporabo vezanega žetona na modelih klepetavega vida. Polje nadzorne plošče se nahaja na plošči Napredno zavihka Vizija (`modality-bridge-max-chars` in `ModalityBridgeVisionTab.tsx`) in zaklene katero koli vrednost med 1 in 99 do nadstropja 100, medtem ko pušča eksplicitno `0` nedotaknjeno — `0` je sama po sebi veljavna vrednost Zod (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), ne le "nenastavljena" privzeta vrednost.

#### Opišite predpomnilnik (`modalityBridge/bridgeCache.ts`)

Predpomnilnik LRU + TTL v pomnilniku za opis izhodov, v skupni rabi celotnega procesa. Ključ = `sha256(imageRef + composedPrompt + configuredBridgeModel)` z uokvirjanjem predpone dolžine (brez kolizij meje polja). Sestavni del modela je** konfiguriran** premostitveni model, ne model, ki je dejansko odgovoril — `callVisionModel` se lahko interno vrne nazaj in vnašanje ključev na poskus bi razdrobilo predpomnilnik. Neuspeli opisi se nikoli ne shranijo v predpomnilnik. nastavitve:

| Ključ                           | Privzeto | Razpon  |
| ------------------------------- | -------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`   | —       |
| `modalityBridgeCacheTtlMinutes` | `60`     | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`    | 10–5000 |

#### Oddaljena normalizacija slike (pridobivanje describe/base64 lastno zanko)

Ko most prinese a** na daljavo** sama slika — Anthropic opisuje samoklic in pretvorbo base64 formata claude-wire-format (`ensureBase64ImagesForClaudeWire`), oboje preko `fetchRemoteImageAsDataUri()` v `visionBridgeHelpers.ts` — se nastali podatki URI posredujejo skozi `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`), preden so vdelani v zahtevo za vizijski model. Prevelike slike so zmanjšane na a** Dolg rob 2048px** (ujema se z omejitvijo za spreminjanje velikosti OpenAI/Anthropic ki že velja na strani strežnika), kar zmanjša nalaganje bytes/latency ne da bi spremenilo tisto, kar vidi model vizije. Spreminjanje velikosti uporablja `sharp`, naložen prek dinamičnega uvoza: na platformi, kjer se izvirna dvojiška datoteka ne naloži, `normalizeDataUri()`** nikoli ne vrže** — se vrne na prehod izvirnih bajtov, tako da pot describe/base64-conversion vedno deluje. Neslikovni bajti (pridobivanje, ki ni vrnilo slike, ki jo je mogoče dekodirati) se prav tako prenesejo nedotaknjeni. Ta normalizacija je namenjena slikam, ki jih most pridobi za lasten samoklic — nikoli pa se ne uporabi za klicateljevo neobdelano prepustno koristno obremenitev, skladno z načelom mutacije samo za izbiro (trdo pravilo #20).

#### Selitev + sheme nastavitev

Novi ključi `modalityBridge*` so potrjeni z Zod v `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, trio `modalityBridgeCache*` in skupina `modalityBridgeAudio*`, ki jo uporablja Audio Bridge. Selitev `141_modality_bridge_settings.sql` kopira obstoječe podedovane vrednosti `visionBridge*` v ustrezne nove ključe (idempotenten, nikoli ne prepiše vrednosti `modalityBridge*` ki jo nastavi operater); podedovani ključi ostanejo sprejeti kot nadomestni za branje za en cikel izdaje.

#### Statistika + v glavi preglednosti

Opisno preoblikovani odgovori nosijo `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (sestavil `buildModalityBridgeHeader()` v `modalityBridge/bridgeStats.ts`, žigosal `withModalityBridgeHeader()` v `src/sse/handlers/chatHelpers.ts`). Preusmerjene zahteve dobijo** št** header — koristni tovor je bil nedotaknjen in zamenjava modela je že vidna v polju `model` telesa odgovora.

`GET /api/modality-bridge/stats` (avtor upravljanja, ista raven kot `GET /api/settings`) vrne števce v pomnilniku na modalnost `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` za `vision`, `audio` in `video`. `averageLatencyMs` kot imenovalec uporablja `latencySamples`, ne vseh poskusov; operacija brez merjenja časa ne izdela vzorca nič milisekund. `bridged` ostaja nazaj združljiv vzdevek za uspešne konverzije; neuspeli poskusi ga ne povečajo. Števci se ponastavijo ob ponovnem zagonu procesa po načrtu (telemetrija, ne računovodstvo).

#### Konfiguracija nadzorne plošče

Namenska stran nadzorne plošče je `/dashboard/settings/modality-bridge`. Njegovi zavihki `Vision`, `Audio` in `Video` ki jih je mogoče nasloviti na URL, ohranjajo poizvedbene parametre, medtem ko spreminjajo vrednost `tab`. Zavihek Vision razkriva omogočanje, način, izbiro modela (vključno s samodejno privzeto), pozive glede na opravila, napredne omejitve timeout/image/description-length/cache, števce časa izvajanja in varovano zahtevo za vzorec. Zavihek Zvok je prav tako v živo: razkriva omogočanje, izbirnik modela samo za STT s funkcijo Auto, omejitve timeout/max-clip, zvočne števce in preizkus vzorca `input_audio`. Zavihek Video je funkcionalen: poroča o stanju izvajalnega časa FFmpeg/ffprobe — eno od štirih eksplicitnih stanj UI (`unknown` medtem ko je sonda v letu ali se ne more dokončati, `restricted` na gostitelju nadzorne plošče brez povratne zanke, kjer je sonda preskočena na strani odjemalca, `unavailable` ko je enkrat testiran in potrjeno manjka, ali `available` z različicami FFmpeg/ffprobe ) — ohranja omejitve enable/model/frame/video/timeout, filtrira izbirnik modela vizualno sposobne modele in izpostavi video števce.

Prejšnja kartica Vision Bridge pod nastavitvami AI je združljivostna povezava do nove strani; nima več v lasti drugega izvoda obrazca. Ponudniki medijev tudi povezujejo poteke dela Image-to-Text in Speech-to-Text z ustreznimi zavihki Modality Bridge, ne da bi odstranili obstoječe igrišče Speech-to-Text.

**Obvod vstopa v lastno zanko:** ko klic describe poteka skozi lastno zanko `/v1` OmniRoute(model nestandardnega ponudnika), podzahteva pošlje `x-omniroute-admission-bypass: internal` in je overjena z razrešeno poverilnico samozanke — lokalnega stražarja `sk_omniroute` v lokalnem načinu ali operaterjevo konfiguriranim ključem `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env (#1350), tako da lahko uvedbe `REQUIRE_API_KEY=true` še vedno izvajajo opisni klic. Obvod je upoštevan samo za te natančne poverilnice, tako da zunanji odjemalci ne morejo uporabiti glave za preskok sprejema.

Podedovane privzete vrednosti so v živo v `src/shared/constants/visionBridgeDefaults.ts`; nove privzete nastavitve mode/task-aware/cache in razreševalec nastavitev so v živo v `src/shared/constants/modalityBridgeDefaults.ts`. Zaščitna ograja razkriva možnost konstruktorja `deps`, tako da lahko testi vbrizgajo lažne izvedbe `getSettings` in `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Prestreže zahteve za klepet z zvokom, preden dosežejo cilj, za katerega ni znano, da sprejema zvočni vnos. Zahteve za klepet nikoli ne preusmeri: zvočni deli se prepišejo prek obstoječe večdelne končne točke, združljive z OpenAI, izbrani model klepeta pa se nadaljuje z besedilnimi prepisi.

pretok:

1. Razreši `supportsAudio` prek `getResolvedModelCapabilities()`. Zmagajo eksplicitni metapodatki registra ponudnika, nato metapodatki statičnega modela, nato sinhronizirani `modalities_input`. Deklariran vhodni seznam brez `audio` je `false`; ni nobenega dokaza o zmogljivosti `null`. Tako `false` kot `null` aktivirata konzervativni most, medtem ko ga `true` obide.
2. Razrešite nastavitve `modalityBridgeAudio*` in izvlecite spojljive zvočne dele najvišje ravni iz vsakega sporočila prek skupnega detektorja `detectMediaParts()`. Podprte oblike žic so OpenAI `input_audio`, `audio_url` in `source.media_type: "audio/*"`. Ugnezdeni zvok je zaznan za usmerjanje, vendar ga povezovalna pot ne odstrani. Delo je omejeno z `modalityBridgeAudioMaxClips`; poznejši deli ostanejo nedotaknjeni.
3. Spoštujte konfigurirano `provider/model` ali pustite `selectAudioBridgeModel()` hoditi `AUDIO_TRANSCRIPTION_PROVIDERS` v stabilnem vrstnem redu kataloga in izberite prvi model z uporabnimi aktivnimi poverilnicami ponudnika.
4. `callAudioTranscription()` pretvori zvok base64/data-URI v večdelni `file` ali prenese oddaljeni `audio_url` prek javnega samo izhodnega varovala s pripenjanjem DNS in vezavo 25 MB. Nato POSTs datoteko in izbrani model v lokalno samozanko `/v1/audio/transcriptions`, overjeno z `resolveSelfLoopBearer()`. Obstoječa pot prepisa izvaja običajno iskanje poverilnic, ravnanje cooldown/rate-limit in odpošiljanje ponudnika.
5. Uspešni klici zamenjajo svoje dele z `[Audio N]: <transcript>`. Klici se izvajajo z `Promise.allSettled`: posamezna napaka ohrani tisti izvirni zvočni del (pogodba #4012 ). Če vsak klic ne uspe in je cilj dokazano `supportsAudio === false`, deli postanejo `[Audio N]: (unavailable — no STT provider connected)` (pogodba #8430 ). Pri neznani tarči (`null`) rezultat popolne napake ostane nedotaknjen. Preizkušen samo besedilni cilj brez uporabne poverilnice STT prejme isto eksplicitno škrbino brez izdaje omrežnega klica.

Uspešni prepisi uporabljajo predpomnilnik LRU/TTL Modality Bridge za celoten proces. Ključ združuje zvočno referenco, oznako stabilnega delovanja `audio-transcription` in izbrani model STT ; napake se nikoli ne shranijo v predpomnilnik. Zvočni poskusi posodobijo skupne števce `bridged`, `cacheHits`, `failures` in `lastUsedAt`. Transformirani odgovori nosijo `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; nedotaknjene zahteve ne prejmejo segmenta Audio Bridge.

Nastavitve izvajalnega okolja so podprte z DB in potrjene z Zodom:

| Ključ                         | Privzeto | Razpon          |
| ----------------------------- | -------- | --------------- |
| `modalityBridgeAudioEnabled`  | `true`   | —               |
| `modalityBridgeAudioModel`    | `""`     | Auto ali STT ID |
| `modalityBridgeAudioTimeout`  | `60000`  | 1000–300000     |
| `modalityBridgeAudioMaxClips` | `3`      | 1–10            |

Predpomnilnik v skupni rabi še naprej nadzorujejo `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` in `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Prestreže video dele najvišje ravni v zaključkih klepeta `messages` in odzivih API `input` preden se pokliče cilj brez znane izvorne podpore za video. Podprte oblike so `input_video`, `video_url`, `video_source`, HTTPS URLs in `data:video/*;base64,...` podatki URIs. Navadna imena datotek v besedilu se ne obravnavajo kot video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) ima v lasti prečkanje zahtev, preverjanje capability/policy, združevanje na zahtevo in obremenitev odgovora. Pridobivanje — za delo na videoposnetek, predpomnilnik celotnega rezultata, ki opisuje zaporedje okvirjev (ki združuje vsak zvočni zapis, ki ga je prijavil klicatelj), in metrics/abort/cleanup na poskus — je skrit za `processVideoPart` v `videoBridgePipeline.ts`, ki se kliče enkrat na video del znotraj zanke `preCall`. Ta modul definira tudi eksplicitne meje vrat `VideoMediaBrokerPort` (pridobivanje bajtov in ekstrahiranje vzorčenih okvirjev), `VideoAudioTranscriptionPort` (združevanje zvočnega prepisa, ki ga je prijavil klicatelj, z vzorčenimi napisi) in `VideoDrilldownPort` (podedovana oblika surovega shranjevanja). Proizvodni STT in zadrževanje okvirja sta sestavljena okoli opisanih vrat skozi `createVideoSttAdapter` in `createVideoDrilldownAdapter`; slednji uporablja skupni življenjski cikel opačnega ročaja.

Javna pot zahteve `/v1` nikoli ne uvozi ali prikliče podprocesa. Oddaljeni videoposnetki se prenašajo pod omejitvijo 50 MiB ; videoposnetki inline base64 imajo konzervativno omejitev 36 MiB, dekodirano na videoposnetek, tako da lahko ovojnica model/messages/framing ostane znotraj omejitve sprejema javne zahteve JSON 50 MiB. Dolžina v vrstici in ocene dekodirane velikosti se preverijo pred dodelitvijo. HTTPS je potreben na začetnem oddaljenem URL in vsaki preusmeritvi z uporabo obstoječega javnega izhodnega varovala s pripenjanjem DNS. Bajti nato prečkajo natančno notranjo mejo posrednika `POST /api/modality-bridge/video/extract`. Ta pot je tako `LOCAL_ONLY` kot `SPAWN_CAPABLE`, sprejme le zahtevo za preverjanje pristnosti, zaupanja vredne povratne zanke za vsak proces in nikoli ne sprejme URL, poti do datotečnega sistema, izvršljive datoteke ali seznama argumentov. Cevovod velikosti telesa API in inkrementalni bralnik telesa upravljavca neodvisno uveljavljata omejitev vnosa posrednika 50 MiB. Njegova omejena čakalna vrsta izvaja eno ekstrakcijo naenkrat, omogoča štiri čakajoča opravila in omejuje čakajoči vnos na 100 MiB.

Znotraj posrednika `ffprobe` bere zasebno lokalno datoteko; seznam dovoljenih s fiksno obliko izključuje oblike seznama predvajanja in manifestov. Za dovoljene vsebnike družine MOV ostanejo zunanji sklici na podatke MOV privzeto onemogočeni in fiksni ukaz se ne vključi vnje. Tako `ffprobe` kot `ffmpeg` uporabljata seznam dovoljenih protokolov `file` -only, eno nit, fiksna polja argumentov, brez lupine in izvedljive datoteke, razrešene iz `PATH`. Tokovi naslovnic s priloženimi slikami niso kandidati za predvajanje. Vsi tokovi, ki jih je mogoče predvajati, morajo izpolnjevati omejitve, pri čemer ima prednost eksplicitni privzeti tok pred determinističnim nadomestnim indeksom z najnižjim indeksom. Videoposnetki so omejeni na 600 sekund, 8.192 slikovnih pik na dimenzijo in 33.554.432 izvornih slikovnih pik. FFmpeg vzorči 1–16 srednjih okvirjev JPEG, pomanjša dolgi rob na največ 1024 slikovnih pik brez povečanja manjših vnosov in nikoli ne prejme URL. Vzorčenje je privzeto `uniform`. Izbirni pravilniki `scene_aware` in eksperimentalni `segment_aware` izvedejo en dodaten fiksni prehod FFmpeg čez že preverjen lokalni tok, izberejo omejene časovne žige scene `showinfo` in se deterministično vrnejo na iste enotne srednje točke ob okvari detektorja, časovni omejitvi, nepravilno oblikovanem izhodu ali praznem naboru kandidatov. Način z upoštevanjem segmentov dodeli vzorce sredinske točke sorazmerno potrjenim intervalom prizora; dokazi, ki se zavedajo segmentov, in nadomestno vedenje so podrobno opisani spodaj. Trda omejitev 16 okvirjev se uporabi po izbiri v vsakem pravilniku. Ko ima zahteva, ki se zaveda prizora, samo proračun za eno sličico, uporabi enotno srednjo točko aktivnega polnega videa ali okna fokusa in poroča `policyEffective: uniform`: en sam izbrani okvir scene ne more ohraniti obeh časovnih koncev. Klicatelj lahko izbirno zagotovi končno fokusno okno (`start`/`end` sekund); meje so pritrjene na trajanje medija, obrnjena ali nekončna okna so zavrnjena in vse politike vzorčenja se izvajajo samo znotraj normaliziranega intervala. Nastalo okno je vključeno v metapodatke o vzorčenju in v predpono nezaupljivega opisa, tako da lahko nadaljnji modeli ločijo fokusirani izsek od celotne časovnice.

Fokus pomenskega napisa je ločena, eksplicitna nastavitev. Privzeti način analize `full` ohrani obstoječi poziv za okvir in nikoli ne posreduje besedila zahteve modelu napisov. V načinu `focused` most bere samo najnovejši neprazni `text`/`input_text`, ki ga je avtor uporabnik, iz istega vsebnika za klepet ali odzive, ga normalizira v NFC, strne kontrolne znake in presledke ter ga omeji na 500 kodnih točk Unicode. Prazen rezultat se vrne na natančen poziv `full`. Uporaben namig je serializiran kot JSON v namenskem bloku konteksta nezaupljivega uporabnika in lahko daje prednost le opazovanim podrobnostim; ne more preglasiti ločenega opozorila proti sledenju navodilom, vidnim ali slišnim v medijih. Besedilni fokus nikoli ne izpelje `start`/`end` ali spremeni časovnega vzorčevalnika.

#### dokaz strukturnega segmenta FU-07

`segment_aware` uporablja en omejen prehod pred analizo prek že potrjenega lokalnega videotoka. Fiksna veriga filtrov se najprej poveča na največ 320 slikovnih pik v širino, zazna spremembe scene in zamrznjene intervale, nato pa vzorči pri 1 sličici na sekundo za informacije o zameglitvi, povprečni svetlosti in spatial/temporal. Prepustnica je omejena na 600 strukturnih vzorcev, eno nit FFmpeg/filter, isti protokol `file` -only in sezname dovoljenih vsebnikov, 1 omejitev izhoda procesa MiB in največ 30 sekund znotraj skupnega abort/deadline. posrednika. Nikoli ne sprejme ukaza, filtra, poti ali URL iz zahteve.

Strukturne vrednosti so dokaz determinističnega vzorčenja, ne semantično razumevanje videa. Ne sklepajo na predmete, dejanja, napise, govor ali namero uporabnika. Meje scene in zamrznitve tvorijo segmente; zamrznjena pokritost, zamegljenost, osvetlitev, prostorske podrobnosti in časovne spremembe vplivajo le na to, kako se dodeli obstoječi proračun za 1–16 sličic. Popolnoma zamrznjen segment je omejen na en okvir, medtem ko nezamrznjeni segmenti tekmujejo za preostali proračun. Ko meje presežejo število okvirjev, se ohrani enotna pokritost s časovnico, tako da hitri zgodnji izrezi ne morejo skriti dolgega končnega segmenta. Meje prizora znotraj ločljivosti 1-sekundne analize zamrznjene meje so združene.

Manjkajoči filtri, dokazi malformed/empty, napaka detektorja ali omejena časovna omejitev predanalize ne odprejo natančne politike enotne sredine. Rok za prekinitev klicatelja ali posrednik se ne odpre: prekine podproces med letom, prepreči poznejše ekstrahiranje okvirja in zasebno začasno drevo je odstranjeno v `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` generira deterministične realne napeljave FFmpeg za prihranke pri klicu s podnapisi po odstranitvi, dodelitev proračuna za gosto gibanje, dokaze blur/exposure/SI-TI, hitre reze z dolgim repom in lažne pozitivne rezultate s postopnim bledenjem. Beleži čas stene pred analizo in, kjer je na voljo `/usr/bin/time`, podrejeni CPU in vrh RSS. Njegovi pregledi kakovosti so le strukturni oraklji. Realna kakovost modela napisov ostaja `HOLD` ker ta pas nima pooblaščene končne točke ali zamrznjenega sodnika. Denarni prihranki prav tako ostanejo `HOLD` razen če `--caption-cost-per-call-usd` zagotovi eksplicitno pozitivno oceno na klic; skript nikoli ne izdela nobenega rezultata.

Vsak okvir je omejen na 4 MiB, vsi neobdelani okvirji skupaj na 23 MiB, serializiran posredniški odgovor pa na 32 MiB. Zasebni začasni imenik je odstranjen v `finally`. OmniRoute ne združuje FFmpeg in ne sprejema izvedljive poti po meri. Pred napisom most uporabi konzervativno vizualno deduplikacijo: vsak JPEG je zmanjšan na 16 × 16 medpomnilnik sivin in se primerja samo z zadnjim ohranjenim okvirjem. Za zahtevani proračun za napise nad eno sličico ekstrakcija zagotovi omejeno skupino kandidatov do dvakratnega proračuna in nikoli več kot 16 sličic. Zahtevana omejitev se uporabi šele po deduplikaciji, pri čemer se prvi in zadnji izbrani kandidati ohranijo med končnim redčenjem, ko je proračun vsaj dva. Politika `grayscale-16x16-mean-cells-v2` z različicami uporablja povprečno delto svetilnosti in razmerje celic sličic, katerih normalizirana delta je vsaj 0,05, večjo vrednost. Podvojeni prag je konstanta 0,04, izbrana zaradi predvidljivosti in ne izpostavljena kot nastavitev časa izvajanja. Ta sekundarni visokokontrastni signal ohranja majhne spremembe gibanja in vidnega besedila, ki jih lahko skrije le povprečna primerjava. Napake primerjalnika ali dekoderja se ne odprejo in ohranijo pokritost. Izhodni metapodatki ločujejo ekstrahirane kandidate, uspešno uporabljene okvirje in izpuščene vizualne dvojnike.

Izrecno označen video del lahko zahteva kontaktni list s časovnim žigom. Most zgradi največ mrežo JPEG s 4 stolpci in 16 okvirji. Vsaka celica s 512 slikovnimi pikami zažge svoj izvorni časovni žig v visokokontrastni spodnji pas, medtem ko isti časovni žigi ostanejo v besedilnih metapodatkih za nadaljnjo povezavo in revizijo. Celoten JPEG ostaja omejen na 32 MiB. Če `sharp` ne more dekodirati ali sestaviti mreže, se most vrne na posamezne okvirje JPEG ; prekinitev odjemalca se še vedno širi skozi operacijo lista.

Dokazi o promociji so namenoma ločeni od mikrobenchmarka sintetične sestave. `scripts/perf/video-bridge-contact-sheet-eval.ts` definira snop A/B z različico sheme za prave modele vida, združljive z OpenAI. Meri žetone, ki jih poroča ponudnik, zakasnitev stene od konca do konca (vključno s sestavo lista), število klicev modela in hrambo dejstev, definiranih v manifestu. Neobdelani odgovori modela niso zapisani v poročilo; ohranjeni so samo izvlečki SHA-256 in ujemajoče se dejstvo IDs. Kabelski snop ne izvaja omrežnega ali plačljivega klica, razen če je posredovan `--execute-real` in so konfigurirani `--model`, `OMNIROUTE_BASE_URL` in `OMNIROUTE_API_KEY`. Brez tega eksplicitnega pravega zagona njegova strojno berljiva razsodba ostaja `HOLD`; samo sintetične meritve payload/call-count niso dokaz napredovanja.

Ločeno `scripts/perf/video-bridge-promotion-eval.ts` porabi opazovanja FU-07 ali FU-09. Za sprejem v promocijo je potrebnih vseh osem vrst sintetičnih scenarijev in prečiščen resnični posnetek, vsaj tri izmerjene ponovitve na vlogo in primer, vseh deset prijavljenih metrik, zamrznjeni izvlečki media/prompt/expected-fact/settings, edinstveno opazovanje IDs in preverjen posejani vrstni red A/B. Potrdilo o izvedbi veže povzetek korpusa, natančen kandidat SHA in revizijo modela. Manjkajoče ali neveljavne meritve ostajajo `HOLD`, vključno z CPU nad 30 s, vrhom RSS nad 512 MiB ali predanalizo nad 30 s. To so omejitve za sprejem dokazov, ne novo jamstvo za uveljavljanje RSS med izvajanjem.

FU-07 zahteva vsaj 98-odstotno ohranjanje kakovosti in zakasnitev p95, ki ni večja od 1,2-kratne osnovne vrednosti, plus bodisi 0,05-absolutno izboljšanje povprečnega priklica, uravnoteženega z velikimi in malimi črkami, pri enakovrednih povprečnih klicih napisov ali vsaj 10 % manj povprečnih klicev napisov po odstranitvi. FU-09 zahteva vsaj kakovost 0,85, 95-odstotno zadrževanje, 20-odstotno zmanjšanje mediane zakasnitve in 10-odstotno zmanjšanje žetonov. Izguba kritičnih dejstev, skladnost vbrizgavanja ali manjkajoča uporaba preprečuje napredovanje. Ena izvedba ne more promovirati ničesar: `--previous-report` potrdi dve različni, neprekrivajoči se, zaporedno primerni izvedbi istega policy/model revision/candidate/corpus. Preizkus z vzorčenjem ne more potrditi preizkusa kontaktnega lista.

Zbiralci bi morali oceniti odgovore v pomnilniku in shraniti `responseDigest` ter meritve in vezave opazovanja, nikoli pa besedila odgovora. Potrošnik bere tudi podedovana neobdelana opažanja, vendar tega besedila nikoli ne kopira v svoja poročila. Za vsako opazovanje je sprejet natanko eden od `responseDigest` ali `rawResponseText`. Seznam dovoljenih z različicami ostane prazen z nespremenljivo privzeto vrednostjo `hold`. Primeren vnos zahteva referenco dokazov, pravilnik, revizijo modela, natančen kandidat SHA, izvleček manifesta in dva različna zagona IDs; konfliktni konteksti so zavrnjeni. Ti metapodatki so revizijska pogodba in ne dokaz, da referenčna datoteka vsebuje pristne meritve. Preglejte dejanske račune, preden dodate kateri koli vnos. Končna točka statistike upravljanja in nadzorna plošča Video razkrivata konzervativno pripravljenost. Konfiguriran vzdevek modela sam po sebi ne vzpostavi njegove revizije ali izvajalskega kandidata SHA, zato trenutna nadzorna plošča poroča `HOLD` namesto da ponovno uporabi primernost iz drugega konteksta izvajanja. Eksplicitna poskusna selekcija ostaja ločena od napredovanja; nobena privzeta vrednost se samodejno ne spremeni.

Klicatelji lahko priložijo neobvezno polje `transcript.cues` podprtemu video delu, ko že imajo poravnano besedilo. Vsaka iztočnica mora vsebovati `text`, končni interval `start`/`end` znotraj sondiranega trajanja, in `source` na seznamu dovoljenih (`client`, `embedded` ali `audio-bridge`); `confidence` je privzeto nastavljen na `1` in mora ostati med `0` in `1`. Natančni podvojeni znaki so strnjeni. OmniRoute nikoli ne začne prepisovanja iz teh metapodatkov: potrjeni znaki se prekopirajo v opisani rezultat z izvorom, zanesljivostjo in intervalom ter se upodobijo kot nezaupljiva opazovanja poleg napisov okvirjev. Neveljavno besedilo, besedilo izven obsega ali besedilo brez porekla se zavrne, namesto da se pomeša v tok napisov. Oba kanala za prepis telesa zahteve normalizirata dobavljeno poreklo v `client`, vključno s samouveljavljenimi oznakami `embedded` ali `audio-bridge`. Samo vmesnik v lasti strežnika lahko dodeli te zaupanja vredne oznake prek argumenta `trustedSource` samo za kodo; polje zahteve JSON ne more doseči tega argumenta. Besedilo prepisa ostaja nezaupljiva vsebina, pridobljena iz medijev, ne glede na izvor in ne sme nikoli vplivati na avtorizacijo.

Napredni klicatelj lahko zagotovi sled `audioTranscript` za isti video; obravnava se kot besedilo, ki ga posreduje odjemalec, in ne kot dokaz o strežniškem prepisu. Fusion seam izvaja vizualna in zvočna opazovanja pod enim rokom in signalom za prekinitev, jih razvrsti na skupni časovni premici, strne natančne dvojnike in poroča o delnem rezultatu, ko uspe samo ena stran. Neveljaven `audioTranscript` se razgradi na ta delni rezultat — vizualni opis se ohrani, zvočna veja pa posname prečiščeno kodo napake — namesto da bi bil neuspešen celoten video. Razpoložljivost na vejo, delna zastavica in prečiščene kode napak so ohranjene v opisanem rezultatu, v metapodatkih zaščitne ograje (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`), v metapodatkih predpomnilnika rezultatov in v števcih spajanja mostov. Privzeta pot Video Bridge ne prikliče govora v besedilo ali prenese druge predstavnostne kopije; brez te eksplicitne skladbe ostane samo video.

**Zadrževanje prepisa (#12150 P1).** To velja samodejno vsakič, ko Video Bridge (sam privolitev) upodobi iztočnico prepisa — ni ločene zastavice za hrambo. Ko zahteva upodobi katero koli iztočnico prepisa ( `transcript` ki ga je deklariral klicatelj, ali zlit `audioTranscript`), jo zaščitna ograja označi `videoBridgeObserved` in ustvari redigirano senco opisa videoposnetka — identično upodabljanje, v katerem je telo prostega besedila vsake iztočnice nadomeščeno z `[redacted-video-transcript]`, zgrajeno z zamenjavo polja strukturiranega iztočnice, preden je niz sestavljen (nikoli z razčlenjevanjem sploščenega besedila, torej ne vsebina iztočnice — kontradiktorna ali navadna, vključno s telesi, ki vsebujejo `]` kot je `[inaudible]`/`[music]` — lahko preživijo). Vztrajno telo zahteve dnevnika klicev zamenja vsak del besedila, ki izhaja iz videoposnetka, za to urejeno senco, ki se ujema z enakostjo vsebine; sidro `fullText` se ponovno prebere iz končanega koristnega tovora zaščitne ograje pred klicem, tako da je ujemanje še vedno uspešno, potem ko poznejše zaščitne ograje verige ( PII in maskerji poverilnic, prioritete 10/95) prepišejo opisno besedilo na svoje mesto in po vstavitvi system-prompt/handoff/memory preoblikujejo matriko sporočil. Telo, poslano navzgor do modela, je nespremenjeno. Opazovana zahteva prav tako ne zapolni nobenega trajnega pomnilnika (izvleček, ki izhaja iz zahteve in odgovora, je preskočen), tako da lastni odgovor modela ne more ponoviti besedila prepisa v pomnilnik.

**Neobdelana video polja (#12430).** Ko je most omogočen in izvorna podpora za video ni znana ali je ni, definirana polja `transcript`/`audioTranscript` prav tako aktivirajo `videoBridgeObserved`, tudi po napaki opisa ali omejitvi `maxVideos`. `null` in prazni nizi štejejo; odsotna polja in nevideo metapodatki ne. Ohranjene kopije popravijo ta polja ali izpustijo zahtevo, caches/Memory pa se zaobidejo.

Na teh nadomestnih poteh postanejo veljavni znaki klicatelja podprti deli `text`/`input_text` namesto nestandardnih polj ponudnika. Obe skladbi, posredovani z zahtevo, ostajata nezaupljivi opazki `client` z izrecnim opozorilom, da videoposnetek ni bil opisan in da časovni žigi niso bili preverjeni glede na medije. Obstoječi skupni proračun 256-cue/64-KiB in proračun na iztočnico veljata za obe skladbi skupaj; časovni žigi se morajo ujemati s posrednikovo zgornjo mejo 600 sekund in morebitnim dobavljenim fokusnim oknom. Neveljavne sledi se zavržejo, ne posredujejo kot poljubno besedilo; še vedno se lahko uporablja veljaven brat ali sestra, razen če je njun skupni proračun presežen. polja Null/empty ne dodajajo besedila. Ta nadomestna različica ne dodaja nobenega prenosa predstavnosti ali prepisa. Polja razširitve prepisa so odstranjena iz nadomestnega video nosilca in njegovih objektov `video_url`/`source`. Seznam dovoljenih žic OpenAI ostaja strog; neznani izvorni video nosilci ostajajo na voljo, znani cilji samo z besedilom pa ohranjajo varne oznake. Strukturirane redakcijske sence ščitijo priloženo besedilo prepisa, medtem ko izvirna zahteva v lasti klicatelja ostane nespremenjena. Izvorno podprti cilji in onemogočeni mostovi ohranijo svoje obstoječe obvodno vedenje.

Dodatne zadržane kopije uporabljajo isti signal opazovane zahteve. Neobdelani posnetek zahteve odjemalca pred zaščitno ograjo, zahteva v čakanju v pomnilniku in dnevnik zgodnjih zavrnjenih zahtev strukturno nadomestijo polja za prepis v video delih; nizovni pozivi, ki jih sintetizirajo stopnje cevovoda in predaja konteksta, so redigirani pri ponoru persisted-request-body. Vztrajni označevalec `video_content_removed` povzroči neuspešno zaprtje nadaljevanja `previous_response_id` namesto rekonstrukcije besedila, ki je bilo namerno zavrženo. Če opazovana zahteva izgubi senco redigiranja posameznega dela pred beleženjem ali se celo ena od več senc videoposnetkov ne ujema po kasnejših mutacijah zahteve, se ohranjeno telo zahteve v celoti izpusti, namesto da se ohrani delno redigiran prepis.

Za opazovano zahtevo lahko odziv modela citira kateri koli del prepisa brez strukturirane meje iztočnice. Njegov vztrajni dnevnik klicev `responseBody` je zato nadomeščen z oznako za izpust; podroben artefakt cevovoda (ki lahko vključuje telesa upstream/client in dele toka) se ne ohrani. Semantični predpomnilniki, predpomnilniki idempotence in predpomnilniki ponavljanja sklepanja obidejo branje in pisanje za to zahtevo. Zahteva ponudnika in naročniku viden odgovor ostaneta nespremenjena. Ko je izpuščen podroben artefakt, se iz začasnega vmesnega pomnilnika izpraznijo zgodnji bajti za ohranjanje delovanja. napačno oblikovano opozorilo EventStream Kiro poroča le o številu bajtov koristnega tovora, nikoli o njegovi vsebini ali neobdelani napaki razčlenjevalnika JSON. To ne pomeni, da je bila revidirana vsaka nepovezana diagnostika provider/plugin ; širšemu pregledu zadržanega ponora se sledi v #11658.

Notranji življenjski cikel `/api/modality-bridge/video/drilldown` je ločen substrat predpomnilnika loopback/token-authenticated. Vsaka operacija zahteva tudi kanonični neprozorni glavni ID. Preden je produkcijski klicatelj omogočen, mora izpeljati ta ID iz overjenega najemnika in ne sme nikoli posredovati vrednosti, ki jo izbere odjemalec. Ključi predpomnilnika vežejo tega principala na kanonično sejo in video-referenco IDs, shranijo samo svoje ključe SHA-256-derived in obsegajo branje in brisanje na istem principalu. Predpomnilnik shrani največ 16 izpeljanih okvirjev JPEG na vnos, poteče po desetih minutah in podpira omejena branja `start`/`end` ali izrecno brisanje seje.

Vsak principal je omejen na 16 vnosov in 64 MiB kanoničnih podatkov JPEG. Te omejitve so neodvisne od globalne zgornje meje 64-entry/256 MiB : pritisk na kvoto principala izloči samo nedavno uporabljene vnose tega principala, preden se upošteva globalna izselitev LRU. Potečeni vnosi so pobrisani iz glavnega in globalnega računovodstva dejavnosti predpomnilnika, medtem ko preklic in napaka pri preverjanju ne povzročita delne zamenjave.

Predpomnilnik zavrne nekanonične Base64, odvečno oblazinjenje, medije, ki niso JPEG, napačno oblikovane ali okrnjene JPEGs in JPEGs, ki ustvarijo opozorilo med omejenim dekodiranjem `sharp` polne slike. Ponovno kodira vsako sprejeto sliko kot kanonični JPEG, izpelje širino in višino iz dekodiranih bajtov, namesto da bi zaupal poljem klicatelja, in zavrže vse končne poliglotske bajte, namesto da bi jih obdržal. Samo omejeni kanonični stisnjeni medpomnilnik se zaračuna obema kvotama. Omejitev žice JSON vključuje režijske stroške Base64 za zgornjo mejo dekodiranega vhoda 32 MiB. Vsaka shranjena izpeljava beleži svojo preverjeno JPEG format/resolution, politiko vzorčenja, različico izpeljave, čas ustvarjanja, zgoščeno vrednost vsebine, ki jo izračuna strežnik, in zgoščeno nadrejeno referenco ter zgoščeno vrednost nadrejene vsebine zaupanja vrednega klicatelja. Preklic se preveri med asinhronimi fazami decode/hash pred potrditvijo atomskega predpomnilnika.

Proizvajalec produkcije ponovno uporabi že izpeljane posredniške okvire šele po uspešni vizualni analizi, brez drugega videa download/extraction. Zahteva operater `modalityBridgeVideoDrilldownEnabled=true`, strog `drilldown: true` na del in overjen zapis ključa API ID. Vrednosti principal/session, ki jih deklarira stranka, nikoli ne vzpostavijo lastništva. Brez vseh treh pogojev ne zgosti, spremeni velikosti ali obdrži dodatnih okvirjev. Napaka pri zadrževanju ohrani uporaben vizualni odziv. Zahteve s soglasjem zaobidejo predpomnilnik rezultatov celotnega videoposnetka, tako da predpomnjeni rezultati nikoli ne predvajajo ročk.

Uspešna odziva JSON in SSE izpostavita največ štiri neprozorne ročice v omejeni glavi `x-omniroute-video-drilldown`. Pooblaščeni izvori brskalnika lahko preberejo to glavo brez razširitve pravilnika izvora CORS. Nove ročice uporabljajo `v1.<32-byte random base64url token>`, register pa obdrži samo njihove zgoščene vrednosti SHA-256. Razčlenjevalnik reader/header sprejema tudi podedovane 64-hex žetone. Preverjeni javni porabnik je `GET /api/v1/video-bridge/drilldown?handle=...`, ki ga neodvisno nadzoruje `modalityBridgeVideoDrilldownRemoteEnabled=true`. Izrecno vztrajno napačno prekliče dostop, tudi če je omogočena nadomestna različica `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` env. Ohranjanje proizvodnje ima podobno zapuščino `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED`. Obe nadomestni možnosti sta privzeto izklopljeni.

Potrošnik izpelje lastništvo iz overjenega ključa in uporablja politiko ključev: tako GET kot DELETE spadata v kategorijo končnih točk `video`, vključno z vzdevkoma `/v1` in `/api/v1`. Ključi z nepraznim seznamom dovoljenih končnih točk morajo vključevati `video`; neomejeni ključi ostanejo združljivi. Potrošnik vrne isti 404 za neznane, potekle in druge ključe. Sprejema `variant=preview|standard|detail` (največja dimenzija JPEG 320/640/1280, nikoli povečana), `limit=1..8` (ali stari vzdevek `frames`, nikoli oboje), `page` na osnovi ničle in izbirne sekunde fokusa `start`/`end`. Podvojeni poizvedbeni ključi in okna z obrnjenim fokusom so zavrnjeni. Vsaka vrnjena različica ima zgoščeno vrednost svoje dejanske vsebine in metapodatkov o dejanski ločljivosti, povezanih z ohranjenim virom. Različice so izpeljane ob branju in ne shranjene kot dodatno ohranjene kopije. Odziv JSON, vključno Base64/envelope, je omejen na 32 MiB; prevelika stran vrne 413 in odjemalec mora zahtevati manj okvirjev. Prebere preverjanje preklica pri vsaki spremembi velikosti in ponovno preveri veljavnost ročaja pred vrnitvijo. `DELETE` po lastniku je idempotenten; izbris ali potek TTL sprosti zadržani izvor in obračunavanje uporabe.

Shramba v skupni rabi je lokalna za proces: ročaji potečejo ob ponovnem zagonu in jih ni mogoče prenesti med neodvisnimi procesi OmniRoute. Upravljalni statistični podatki izpostavljajo učinkovito politiko hrambe/na daljavo in zbirajo samo zadržane entries/bytes, nikoli medijev, referenc, glavnega IDs ali ročk. Plošča z nastavitvami videa prikazuje te vrednosti in lahko obdrži obe stikali za soglasje. Ta implementacijska dokumentacija ni dokaz o uvajanju ali promociji v živo; Sprejem realnega modela se spremlja ločeno.

Okvirji so označeni zaporedno s konfiguriranim video modelom. Prazna video preglasitev podeduje nastavitev Vision; če sta oba prazna, samodejni usmerjevalnik Vision izbere učinkovit model, ki omogoča vid. Uspešni napisi nadomestijo izvirni del s stabilno predpono `[Video description:`, ki prav tako označi besedilo kot nezaupljivo opazovanje, pridobljeno iz medijev, in sporoči nadaljnjim modelom, naj ne upoštevajo navodil v medijih. Ključi predpomnilnika napisov okvirjev vključujejo bajte JPEG, poziv, časovni žig in učinkovit model; predpomnjeni so samo uspešni napisi. Vnosi v predpomnilnik ohranijo dejanski uspešen model proizvajalca, vključno z nadomestnim modelom; most poroča `mixed` ko so različni modeli izdelali različne okvirje. Zadetek predpomnilnika ponovno uporabi to identiteto proizvajalca, namesto da bi jo ponovno označil kot zahtevani načrt usmerjanja. Predpomnilnik rezultatov celotnega videoposnetka se vnese pri vsakem vnosu, ki spremeni izhodni poziv —, učinkovit model, politiko vzorčenja, število okvirjev, način semantične analize, prstni odtis SHA-256 normaliziranega namiga za fokus, okno za fokus, `transcript`, `audioTranscript` in zastavico — kontaktnega lista, tako da je spreminjanje katere koli od teh dimenzij zgrešen predpomnilnik, nikoli zastarela ponovna uporaba. Različica pravilnika o vizualni odstranitvi kopij, prag in omejeno število kandidatnih okvirjev so prav tako eksplicitni v ključu predpomnilnika rezultatov in metapodatkih; sprememba pravilnika torej ne more ponovno uporabiti zastarelega opisa celotnega videa. Metapodatki Result-cache v4 ohranjajo način in prstni odtis, nikoli neobdelanega uporabniškega opravila. Metapodatki zaščitne ograje poročajo o zahtevanem in učinkovitem načinu analize; zahtevani način `focused` brez uporabnega uporabniškega besedila je sporočen kot učinkovit `full`.

Zaščitna ograja izvleče vse podprte video dele, vendar ne opisuje več kot `modalityBridgeVideoMaxVideos`. Za tarčo, za katero je dokazano, da ima `supportsVideo === false`, neuspeli videoposnetki in videoposnetki s prekoračitvijo omejitev postanejo eksplicitni označevalci varnega besedila, tako da noben neobdelani video ne preživi. Kadar zmogljivost ni znana, ti deli ohranijo svoj video nosilec; vsak nadomestni prepis sledi zgornji pretvorbi omejenega besedila. Tarče z `supportsVideo === true` obidejo most. Signal za prekinitev zahteve odjemalca se širi prek prenosa, čakalne vrste posrednika, podprocesov in klicev napisov; prekine zaustavitev med videoposnetki in se nikoli ne odpre za neobdelane medije.

Nastavitve izvajalnega okolja so podprte z DB in potrjene z Zodom:

| Ključ                               | Privzeto    | Razpon/vedenje                                                                                         |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------ |
| `modalityBridgeVideoEnabled`        | `false`     | Izbirni čas izvajanja, možnost vključitve                                                              |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` ohranja generične napise; `focused` uporablja omejen, nezaupljiv kontekst zadnjega uporabnika   |
| `modalityBridgeVideoModel`          | `""`        | Podedujte model Vision Bridge                                                                          |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                   |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` ali proporcionalni `segment_aware`; okvara detektorja pade nazaj na `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                    |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                         |

Podedovane vztrajne vrednosti časovne omejitve videa nad 120 sekund so pritrjene na rok posrednika; nove nastavitve, zapisi nad to mejo, so zavrnjeni. `GET /api/modality-bridge/video/runtime` zahteva zaupanja vredno žigosano lokacijo povratne zanke pred avtentikacijo ali sondiranjem izvajalnega časa, nato pa zahteva avtentifikacijo upravljanja. Vrne samo `available`, prečiščene različice FFmpeg/ffprobe in določen razlog, ko izvajalno okolje ni na voljo. Notranja končna točka ekstrakcije ni javno nalaganje API: nasičenost čakalne vrste vrne `503` plus `Retry-After`, prekinitev povezave klicatelja vrne `499` in fiksni rok posrednika vrne `504`. Pretvorjeni odgovori dodajo `video->text;model=<visionModel>;parts=<videos>` v osrednjo glavo `x-omniroute-modality-bridge`, ne da bi odstranili vidne ali zvočne segmente.

### PII masker (`piiMasker.ts`)

Teče naprej** oboje** stopnje.

- **`preCall`** klonira koristni tovor, sprehodi `system`, `messages`, `input` in `prompt` (vključno z navadnimi elementi niza) in uporabi `processPII()` (iz `@/shared/utils/inputSanitizer`) za polja niza `content`/`text`. Ko je `PII_REDACTION_ENABLED=true`, je zaznan PII redigiran v izhodnem koristnem tovoru. To je neodvisno od `INPUT_SANITIZER_MODE` (ki nadzoruje samo politiko hitrega vstavljanja). Ko je redigiranje izklopljeno, šteje zaznavanje zapisov klicev brez ponovnega zapisovanja vsebine.
- **`postCall`** globoko klonira odziv, zažene `sanitizePIIResponse()` in masker oblike Responses-API (`maskResponsesOutput` — pokriva `output_text` in `output[].content[].text`). Če pride do redigiranja, spremenjeni odgovor nadomesti izvirnik.

Zaščitna ograja nikoli ne blokira; samo komentira (`meta.detections`, `meta.redacted`) ali prepisuje.

**Reverzibilni trezor (`PII_REVERSIBLE_VAULT_ENABLED`, privzeto `false`).** Ko sta `PII_REDACTION_ENABLED` in `PII_REVERSIBLE_VAULT_ENABLED` vklopljena (DB preglasi > env > privzeto, preberi enkrat na zahtevo), `handleChat` odpre en trezor na zahtevo odjemalca (`src/lib/pii/requestTokenVaultScope.ts`) in ga posreduje prehodu pred klicem kot `GuardrailContext.tokenVault`. Maskir nato zapiše nadomestne žetone, kot je `<<PII_EMAIL_QWERTYUI_1>>` namesto `[EMAIL_REDACTED]`, za vgrajena, potrjena (GDPR/POPIA) in pravila po meri. Enkratna številka je 8 naključnih velikih črk na zahtevo in ista vrednost dobi isti žeton znotraj zahteve. Samo kovnice maskerja: varovalo za hitro vbrizgavanje in `/api/guardrails/test` delujeta brez trezorja in ohranjata ograde.

- Ponudnik, vsak kombinirani del, ponovni poskus, član fuzijske komisije in fuzijski sodnik vidijo samo žetone. Žetoni so obnovljeni enkrat, na odgovor 2xx, ki pusti `handleChat`: na polje na razčlenjenem SSE (žeton, razdeljen na dogodke, se še vedno razreši; argumenti klica orodja so ubežni JSON) ali na polje v telesu JSON, s ponovno izračunanim `Content-Length`. Vsebina in argumenti za klicanje orodij so obnovljeni. Telesa napak (4xx/5xx) hranijo žetone.
- Napake ostanejo zasebne: če kovanje ne uspe ali trezor zavrne vrednost (1000 vnosov, 256 znakov na vrednost, skupaj 64 KB ), se namesto tega napiše ograda; žeton, ki ga trezor ne more razrešiti, ali obnovitev, ki ne uspe, ostane dobesedna in se zabeleži le štetje. Trezor ne vsebuje časovnikov in globalnega stanja; počisti se, ko se tok odgovorov konča, je preklican ali pride do napak.
- Ko je zahteva skovala žetone, se ekstrakcija pomnilnika, shranjevanje idempotence in oba zapisa semantičnega predpomnilnika preskočijo, ker nobena kasnejša zahteva ne more razrešiti teh žetonov. V dnevnikih klicev zahteva in odgovor ponudnika nosita žetone; zabeleženo telo zahteve odjemalca je še vedno neobdelani vnos odjemalca, tako kot pri navadni redakciji.
- Žetoni uporabljajo naključno nonce na zahtevo, zato se predpona poziva spremeni ob vsakem koraku: predpomnjenje poziva na strani ponudnika ne zadene zamaskiranih obratov in žeton, ki se vrne pozneje (na primer prek `previous_response_id`), pripada stari zahtevi in ostane dobeseden.

#### Izbira po vrsti, vzorci po meri in števci zaznavanja

**Nadzorna plošča → Nastavitve → Varnost → PII maskiranje** izbere _kaj_ je maskirano. Ne vklopi maskiranja: to je še vedno `PII_REDACTION_ENABLED` (zahteva) in `PII_RESPONSE_SANITIZATION` (odziv + SSE), ki sta privzeto izklopljena.

- **Izbira po vrsti** — so vgrajeni ID-ji navedeni v `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Nenastavljeno pomeni vsako vrsto (vedenje, preden je obstajala ta nastavitev). Vzorec `ssn_us` mehanizma zahtev se preslika v `ssn`. Predloge (minimalna, standardna, finančna, brazilska, USA, GDPR, POPIA, polna) samo izpolnijo potrditvena polja v UI.
- **GDPR in POPIA identifikatorja** — dvanajst vgrajenih ID-jev, ki pokrivajo EU in južnoafriške osebne identifikatorje (tabela spodaj). Njihovi regularni izrazi, validatorji in oznake pristojnosti živijo v eni tabeli, `src/shared/utils/piiPatterns.ts`, ki jo uporabljata razkužilo odziva (`src/lib/piiSanitizer.ts`) in masker zahtev (`src/shared/utils/inputSanitizer.ts`). Ujemanje je redigirano šele, ko ga njegov validator sprejme; golo število števk ni nikoli dovolj. Operater, ki je shranil zožen izbor, preden so ti ID-ji obstajali, ohrani takšno vedenje, dokler niso obkljukani novi ID-ji.
- **Vzorci po meri** — do 20 vzorcev regularnih izrazov ali nadomestnih znakov (`*` = do 64 znakov, ki niso presledki, `?` = en). Tekme postanejo `[CUSTOM_REDACTED]`. Vsak vzorec gre skozi `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): največ 500 znakov, zastavice so omejene na `g i m s u`, morajo se prevesti, prenesti morajo `safe-regex` (katastrofalno sledenje nazaj) in se ne smejo ujemati s praznim nizom ali ogrado za redigiranje. Vzorec, ki ne uspe, je zavrnjen, ko je shranjen in preizkušen, shranjena vrstica, ki ne uspe, pa se med izvajanjem preskoči, namesto da bi bila prevedena. Vzorci po meri se izvajajo samo, ko je vklopljeno maskiranje.
- **Števci zaznavanja** — na vrsto šteje (nikoli ujemajoče se vrednosti), hrani se v pomnilniku in se ponastavi ob ponovnem zagonu (`src/lib/pii/piiDetectionStats.ts`). Povečujejo se samo, ko je vklopljena maska.

Nastavitve so v živo v tabeli `key_value` (imenski prostor `pii_settings`, `src/lib/db/piiSettings.ts`) in se berejo skozi 1 s predpomnilnik. API:

| Metoda | Pot                      | Namen                                                               |
| ------ | ------------------------ | ------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Stanje zastave, `enabledTypes`, `customPatterns`, števci zaznavanja |
| `PUT`  | `/api/settings/pii`      | Zamenjaj `enabledTypes` (`null` = vse) and/or `customPatterns`      |
| `POST` | `/api/settings/pii/test` | Preizkusite en vzorec proti vzorcu z največ 8 KB; nič ni shranjeno  |

Vsi trije zahtevajo avtorizacijo upravljanja in potrdijo telo z Zod (`src/shared/validation/schemas/piiSettings.ts`). Ko je prijava onemogočena (`requireLogin=false`), sta `GET` in preskusna končna točka odprta, vendar `PUT` še vedno potrebuje sejo nadzorne plošče, ključ `manage` -scope API, žeton za dostop `oma_` z obsegom pisanja ali višjim ali žeton CLI ali žeton notranje storitve, poslan iz povratne zanke.

#### GDPR (EU) in POPIA (Južna Afrika).

| Id                  | Identifikator              | Validacija                                                                           |
| ------------------- | -------------------------- | ------------------------------------------------------------------------------------ |
| `iban`              | IBAN                       | Znana država, točna dolžina za to državo, ISO 13616 MOD-97-10                        |
| `eu_vat`            | EU VAT številka            | Znana predpona države članice in oblika številke te države (brez iskanja VIES )      |
| `es_dni_nie`        | Španščina DNI / NIE        | Kontrolno pismo (vrednost mod 23); NIE je `X/Y/Z` + 7 števk                          |
| `it_codice_fiscale` | italijanski Codice Fiscale | Kontrolno pismo iz tabele položajev odd/even                                         |
| `pl_pesel`          | poljski PESEL              | Utežena kontrolna vsota in kodiran rojstni datum, ki obstaja                         |
| `nl_bsn`            | nizozemski BSN             | 11-dokaz (uteži 9..2, -1)                                                            |
| `de_steuer_id`      | nemški Steuer-ID           | ISO 7064 Mod 11,10 plus pravila števčne strukture (brez vodilne 0)                   |
| `se_personnummer`   | Švedska personnummer       | Luhn čez zadnjih deset števk in verjeten rojstni datum (10 ali 12 števk)             |
| `za_id`             | Južnoafriška številka ID   | Luhn čez vseh 13 števk, veljaven rojstni month/day, številka državljanstva 0 ali 1   |
| `za_phone`          | Južnoafriški telefon       | predpono `+27` / `27` ali nacionalno obliko `0..`, napisano s presledkom ali vezajem |
| `za_vat`            | Južnoafriška številka VAT  | 10 števk, ki se začnejo z `4`** in** "VAT" / "BTW" v prejšnjih 48 znakih             |
| `za_tax_ref`        | Južnoafriška davčna ref.   | 10 števk z začetkom `0`-`3`, Luhn,** in** "davek" / "SARS" v prejšnjih 48 znakih     |

Ker so samo številčni formati v nasprotju s številkami naročil, številkami zgradb in časovnimi žigi, najšibkejši (`za_vat`, `za_tax_ref`) potrebujejo ključno besedo, gola desetmestna številka `0..` pa se ne obravnava kot južnoafriška telefonska številka. Razmaknjeni IBANs (`GB29 NWBK ...`) se ne ujemajo. Na poti pretakanja se iztočnica išče samo znotraj trenutnega kosa. ID-ji so pred generičnimi telefonskimi vzorci, tako da potrjeni identifikator ohrani svoj nadomestni znak (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Predlogi `gdpr` in `popia` izbereta EU oziroma južnoafriški ID. Maskiranje samo ostane opt-in (Hard Rule #20): nič tukaj ne spremeni privzete zastavice funkcije.

### Takojšnje vbrizgavanje (`promptInjection.ts`)

Zazna kontradiktorne strukture v vsebini, ki jo posreduje uporabnik, in uveljavi konfigurirano politiko. Vedenje poganjajo spremenljivke okolja in možnosti konstruktorja:

| Nastavitev    | Env var                                                                                                | Privzeto | Učinek                                                                                                                                                                                     |
| ------------- | ------------------------------------------------------------------------------------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Omogočeno     | `INPUT_SANITIZER_ENABLED`                                                                              | `true`   | Pri `false` pride do kratkega stika zaščitne ograje.                                                                                                                                       |
| Način         | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                        | `warn`   | Politika vbrizgavanja: `block`, `warn` ali `log`. (`redact` je sprejet za back-compat, vendar pa** ne** besedilo za brizganje traku; zahtevo PII rewrite nadzira `PII_REDACTION_ENABLED`.) |
| Blokiraj prag | možnost `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`   | Najmanjša zahtevana resnost za blokiranje. Medij je privzeto samo opazovanje.                                                                                                              |

**Prednost načina** (`getMode`): klicatelj `options.mode` → `INJECTION_GUARD_MODE`**DB preglasitev zastavice funkcije** (Nadzorna plošča → Nastavitve → Zastavice funkcij) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env → `warn`. Preglasitev armaturne plošče torej prevlada nad spremenljivkami env, tako da zastavice funkcij UI nadzorujejo tekalno zaščito v živo (brez ponovnega zagona). Branje DB je varno pred napakami: če pride do napake, se zaščita vrne na vedenje, ki temelji na env, in ko preglasitev ni nastavljena, je vedenje enako ločljivosti env-only.

Viri zaznavanja:

1. `sanitizeRequest()` iz `@/shared/utils/inputSanitizer` (nabor skupnih detektorjev, uporabljen drugje v cevovodu).
2. Vgrajen `DEFAULT_GUARD_PATTERNS` (trenutno `system_override_inline` in `markdown_system_block`, oba z resnostjo `high` ).
3. Izbirni `customPatterns` posredovan prek možnosti konstruktorja (nizi, regularni izrazi ali zapisi `{ name, pattern, severity }` ).

Ko `mode === "block"`** in** vsaj eno zaznavanje ustreza pragu resnosti, `preCall` vrne `{ block: true, message: "Request rejected: suspicious content detected" }`. V načinih `warn`/`log` se zaščitna ograja prijavi, vendar dovoli klic. Skupni pomočnik `evaluatePromptInjection()` je prav tako izvožen za klicatelje, ki morajo ovrednotiti pozive, ne da bi šli skozi register.

**Vezano skeniranje (v3.8.20):** detektor samo pregleduje** prvih 16 KB** združenega pozivnega besedila — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bajtov) v `src/shared/utils/inputSanitizer.ts`. Tako `detectInjection()` kot `evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` pred izvajanjem zanke vzorca. Injection direktive se nahajajo blizu vrha vnosa, tako da to omejuje regularni izraz CPU/GC na koristne obremenitve z več sto KB brez oslabitve zaznavanja (prim. #3932, #4041).

### Maskir poverilnic (`credentialMasker.ts`)

Teče naprej** oboje** stopnje, zadnje v privzeti verigi (prioriteta `95`). Uredi dobro znane vzorce ključa API/skrivnega žetona iz odhodne koristne vsebine (vsebina sporočila, argumenti klica orodja, rezultati orodja)** in** odziv ponudnika, tako da poverilnica, ki je prilepljena v poziv (ali vrnjena z rezultatom orodja), ne pricurlja do zgornjega ponudnika ali nazaj do odjemalca.

- **Samo prijava** , enaka konvencija kot redakcija PII (trdo pravilo #20-sosednje): onemogočeno, razen če `settings.credentialRedactionEnabled === true`** oz** `CREDENTIAL_REDACTION_ENABLED=true`. Ko je izklopljena, je zaščitna ograja — brez operacije, ki nikoli ne blokira in nikoli ne prepisuje.
- `redactCredentials()` se sprehodi po celotnem drevesu payload/response (`walkValue()`, prototype-pollution-safe, cycle-safe via `WeakSet`) in nadomesti ujemanja z ogrado `[REDACTED:<type>]`, pri čemer klonira samo veje, ki so se dejansko spremenile.
- `CREDENTIAL_PATTERNS` zajema ključe ponudnika LLM (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), VCS/SaaS (GitHub, Slack, Linear, Notion, npm, Postman, Discord), plačilne ključe (Stripe, Square), ključe v oblaku (ključ za dostop AWS, Twilio, SendGrid, Mailgun), zasebni ključi / JWTs, povezovalni nizi s poverilnicami (`mongodb://user:pass@...` itd.) in generični vzorec vrednosti glave `Authorization`/`x-api-key`/`api-key`/`apikey`. Ključi v obliki glave (`authorization`, `x-api-key`, `api-key`, `apikey`) so redigirani strukturno (samo vrednost, ohranjena je predpona sheme, kot je `Bearer `/`Basic ` ) in ne prek splošnega besedilnega regularnega izraza.
- Zaščitna ograja nikoli ne blokira; samo prepisuje (`modifiedPayload` / `modifiedResponse`) in komentira (`meta.credentialsRedacted`, `meta.count`).

Varovalo za regresijo: `tests/unit/credential-masker-guardrail.test.ts`.

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

## Nalog za izvršitev

Za vsako zahtevo, ki teče prek `src/sse/handlers/chat.ts` in `open-sse/handlers/chatCore.ts` (poti družine klepeta, navedene pod [Pokritost in omejitve](#coverage-and-limits) ):

1. `resolveDisabledGuardrails(...)` sestavi seznam preskokov iz ključa API, telesa in glav.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` izvaja zaščitne ograje v naraščajočem prednostnem vrstnem redu:
   - Onesposobljene zaščitne ograje se evidentirajo kot `skipped`.
   - `preCall` vsake zaščitne ograje lahko prepiše koristni tovor prek `modifiedPayload`.
   - Prvi `block: true` povzroči kratek stik v verigi in vodnik vrne odgovor z zavrnitvijo varovalne ograje.
3. Koristni tovor (potencialno prepisan) teče v kombinirano usmerjanje in pošiljanje navzgor.
4. **Samo nepretočno:** potem ko je odgovor sestavljen, `guardrailRegistry.runPostCallHooks(...)` izvede isto verigo na odgovoru. `block: true` tukaj spusti povratni odgovor in vrne HTTP 400. Pretočni odzivi v celoti preskočijo ta korak.
5. **Samo obračalni trezor:** ko zahteva kuje žetone, jih `handleChat` obnovi na odzivu 2xx, ki ga vrne, po kavljih po klicu in pretočnem preoblikovanju PII, tako da `PII_RESPONSE_SANITIZATION` vidi žetone in modelno ustvarjeni PII, nikoli obnovljenega izvirnika.

Zaščitne ograje, ki vržejo, so zabeležene z `error: <message>` in zabeležene prek `logger.warn`, vendar se veriga nadaljuje — fail-open po zasnovi.

## Kritje in omejitve

Register zaščitne ograje je povezan samo s cevovodom za klepet. Te omejitve določata `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` in `tests/unit/guardrail-pipeline-characterization.test.ts`; namerno posodobi te teste, ko se vedenje spremeni.

### Kjer tečejo kljuke

| Kavelj / nadzor                                       | Teče naprej                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                                     | Zahteve, ki jih obravnava `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (in `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*` in proxy za klepet Telegram. Tudi preskusna končna točka nadzorne plošče `/api/guardrails/test`. Blok pred klicem vrne HTTP 400. |
| `runPostCallHooks`                                    | **Brez pretakanja** samo odgovori na klepet (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Pretočni odgovori ga nikoli ne dosežejo.                                                                                                                                                                                                                                                                                              |
| Pretakanje PII                                        | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), napeljan v `streamingPipeline.ts`, ko je `PII_RESPONSE_SANITIZATION` vklopljen. To ni zaščitna ograja, zato onemogočeni kanali ne vplivajo nanj.                                                                                                                                                                                                                            |
| Reverzibilni trezor PII                               | Zahteve obravnava samo `handleChat`, ko sta vklopljeni `PII_REDACTION_ENABLED` in `PII_REVERSIBLE_VAULT_ENABLED`. Žetoni so kovani s predklicem `pii-masker` in obnovljeni na izhodu `handleChat` (`src/lib/pii/requestTokenVaultScope.ts`). Če onemogočite `pii-masker` za zahtevo, to pomeni, da ni nič nakovano.                                                                                                                       |
| Vmesna programska oprema Injection-guard (podedovano) | Vsaka pot `/v1` s hitro smerjo, vključno z družino za klepet (glejte [pokritost poti](#injection-guard-route-coverage--red-team-phase-8--block-d) ). Samo takojšnje injiciranje.                                                                                                                                                                                                                                                          |

### Kaj ni zajeto

- **Mediji, vdelave in podatkovne poti** (`/v1/images/*`, `/v1/embeddings`, `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/rerank`, `/v1/search`, `/v1/moderations`) nikoli ne dosežejo registra. Tam ne poteka nobeno maskiranje PII, maskiranje poverilnic ali modalni most. Njihov edini pregled je podedovana vmesna programska oprema injection-guard.
- **Pretočni odgovori** ne dobite zaščitnih ograj po klicu: brez klica `pii-masker` ali `credential-masker` in blokade po klicu. Velja le pretočna transformacija PII (če je `PII_RESPONSE_SANITIZATION` vklopljen). Poverilnica, vrnjena nazaj v pretočni odgovor, ni redigirana.
- **Onemogoči kanale v primerjavi z vmesno programsko opremo (po zasnovi):** vmesna programska oprema ovrednoti takojšnje vstavljanje z lastnim klicem `evaluatePromptInjection()`, ne da bi posredovala kateri koli seznam onemogočitev, ki ga nadzoruje klicatelj. način `block` je obvezna meja, ki je onemogočitve, ki jih nadzoruje klicatelj, ne morejo obiti, vključno na poteh klepet-družina ( [#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413) ). Če onemogočite `prompt-injection`, preskočite le ograjo registra.

### Kaj vidi odgovor pred naknadnim klicem

Na nepretočni poti je vrstni red: ekstrakcija pomnilnika → vgrajeno orodje izvajanje → zaščitne ograje po klicu → izhod bloka po klicu → semantični predpomnilnik.

- **Ekstrakcija pomnilnika** in** izvedba orodja** oglejte si odgovor, preden ga lahko zaščitne ograje po klicu prepišejo ali blokirajo. Od [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401) ekstrakcija iz pomnilnika izvaja ekstrahirano besedilo prek `sanitizePII` ko je `PII_RESPONSE_SANITIZATION` vklopljen (tako pretočno kot nepretočno), vendar je bil odziv, ki ga poznejši bloki po klicu še vedno ponujen pomnilniku in orodjem.
- **Semantični predpomnilnik** shrani odgovor po naknadnem klicu, tako da shrani prepisan odgovor, blokirani odgovor pa se nikoli ne shrani v predpomnilnik. Vnosi v predpomnilnik so zaklenjeni na ključ API.

## Konfiguracija

Spremenljivke okolja, ki jih berejo vgrajene zaščitne ograje:

| Spremenljivka                         | Uporablja ga               | Učinek                                                                                                             |
| ------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`         | Nastavite `false` tako, da v celoti onemogoči zaznavanje.                                                          |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`         | Politika vbrizgavanja: `warn`, `block` ali `log`. Podedovana vrednost `redact` ne prepisuje vstavljenega besedila. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`         | Način za zaščito pred vbrizgavanjem; tudi zastavo funkcije DB, ki** preglasi** env vars (DB > ENV).                |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`         | Najmanjša resnost, ki jo `MODE=block` zavrne: `high` (privzeto), `medium` ali `low`.                               |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`         | Starejši vzdevek za `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                             |
| `PII_REDACTION_ENABLED`               | `pii-masker`               | Ko je `true`, je zahteva PII redigirana (neodvisno od načina vbrizgavanja).                                        |
| `PII_REVERSIBLE_VAULT_ENABLED`        | `pii-masker`, `handleChat` | Z `PII_REDACTION_ENABLED` kovajte reverzibilne žetone in jih obnovite v 2xx odzivih.                               |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (dolvodno)    | Nadzoruje vedenje maskerja na odzivni strani.                                                                      |

Zaščitne ograje Modality Bridge berejo konfiguracijo časa izvajanja iz shrambe nastavitev, podprte z DB (`getSettings()`), ne iz env vars. Primarni ključi Vision so `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` in `modalityBridgeCacheMaxEntries`. Podedovani ključi `visionBridge*` so sprejeti le kot dokumentirana nadomestna možnost branja z enim ciklom; pisanje na nadzorno ploščo uporablja primarne ključe. Privzete vrednosti in nadomestni razreševalec so v `src/shared/constants/modalityBridgeDefaults.ts`, podedovane konstante pa so ohranjene v `src/shared/constants/visionBridgeDefaults.ts`.

Zvok uporablja `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`, `modalityBridgeAudioTimeout` in `modalityBridgeAudioMaxClips` ter skupne nastavitve `modalityBridgeCache*`. Zvok nima nadomestnega ključa za starejše, ker so bili ti ključi predstavljeni s shemo Modality Bridge.

Video uporablja `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`, `modalityBridgeVideoModel`, `modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`, `modalityBridgeVideoMaxVideos` in `modalityBridgeVideoTimeout` ter skupne nastavitve `modalityBridgeCache*`. Privzeto je onemogočen, ker so FFmpeg/ffprobe izbirne operativne odvisnosti in podnapisi okvirjev dodajo zakasnitev in stroške modela.

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
