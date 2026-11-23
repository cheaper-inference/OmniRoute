# Guardrails (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Vir resnice:** `src/lib/guardrails/`
> **Nazadnje posodobljeno:** 2026-08-29 — v3.8.51 (izvor prepisa Video Bridge določi klicatelj,
> strežnik pa ga še ne preverja — pojasnjeno skladno z #11661)

Varovala uveljavljajo varnost, pravilnike in preoblikovanje vsebine na meji
med OmniRoute in ponudniki v zaledju. Vsako varovalo lahko pregleda (in
po želji zavrne, preoblikuje ali opremi z opombami) koristne vsebine zahtev (`preCall`) ter
odzive iz zaledja (`postCall`).

Sistem je zasnovan tako, da ob napaki **dovoli nadaljevanje**: če varovalo med izvajanjem sproži izjemo, register
zabeleži napako in nadaljuje z naslednjim varovalom, namesto da bi
zahteva spodletela. Blokiranje je izrecna odločitev (`block: true`), nikoli naključje.

## Vgrajena varovala

Register ob uvozu samodejno naloži šest varoval po prednostnem vrstnem redu
(glejte `registry.ts` → `registerDefaultGuardrails()`):

| Prednost | Ime                 | Faza/-e        | Datoteka              |
| -------- | ------------------- | -------------- | --------------------- |
| `5`      | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`      | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`      | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`     | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`     | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`     | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Nižje številke prednosti se izvedejo **prej**.

### Most za vid (`visionBridge.ts`) — Most modalnosti PR-1

Prestrezá zahteve, ki vsebujejo slike in so namenjene **modelom brez podpore za vid**, ter
bodisi preusmeri celotno zahtevo na model s podporo za vid bodisi pred
klicem nadrejene storitve zamenja slikovne dele z besedilnimi opisi, ki jih ustvari nastavljiv
model za vid. Tako lahko ponudniki, ki podpirajo samo besedilo, pregledno obdelujejo
večmodalne koristne vsebine.

Potek:

1. Preskoči, če ciljni model že podpira vid (razen če je naveden na
   seznamu modelov s prisilnim mostom `isVisionBridgeForcedModel`).
2. Izloči slikovne dele prek `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), ki obdelavo preda **enotnemu zaznavalniku
   predstavnosti** `detectMediaParts()` v `open-sse/utils/mediaParts.ts` — edinemu
   viru resnice, ki si ga deli s filtrom združljivosti kombinacij.
   Izločanje je omejeno z dovoljenim seznamom oblik vrhnjih delov,
   ki jih lahko `replaceImageParts` vstavi nazaj (pogodba izločanje↔zamenjava): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"` in Responses API `input_image`. Ugnezdeni zadetki in
   oblike, ki vsebujejo samo indikatorje, so namenjeni filtru kombinacij in se nikoli ne izločijo.
   Preskoči, če ni najden noben del.
3. Razreši izvajalne nastavitve prek `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): novi ključi nastavitev `modalityBridge*`
   imajo prednost; podedovani ključi `visionBridge*` ostanejo kot **rezervna možnost za en
   cikel** (obdobje za povrnitev). Pred vsakim pregledovanjem predstavnosti preskoči, ko je
   most onemogočen.
4. Izbirnik načina (`modalityBridgeVisionMode`, glejte spodnjo tabelo) določi
   preusmeritev ali opisovanje. Preusmeritev vrne `modifiedPayload`, v katerem je zamenjan
   samo `model`, skupaj z metapodatki `{ rerouted, fromModel, toModel, imagesKept }`.
5. Pot opisovanja: omeji število slik na `maxImages`, sestavi poziv, prilagojen opravilu,
   preveri predpomnilnik opisov, pokliče model za vid **vzporedno**
   (`Promise.allSettled`) in namesto slik vstavi besedilne dele
   `[Image N]: <description>`. Neuspešno opisovanje vrne `null`, izvirni slikovni del pa se
   **ohrani** (#4012) — razen na poti opisovanja za kombinacije, kadar so neuspešni vsi
   poskusi opisovanja; v tem primeru potrjena nadrejena storitev brez podpore za vid prejme nadomestno besedilo
   `(unavailable — no vision-capable provider connected)` (#8430).
6. Vrne `modifiedPayload` in metapodatke (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Izbirnik načina (`modalityBridgeVisionMode`)

| Način      | Privzeto | Vedenje                                                                                                                                                                                                                                                                                                        |
| ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔        | Podedovana hevristika, nespremenjena (#6640/#7204): modeli, ki niso kombinacijski oziroma so `auto/`, se preusmerijo na najboljši model za vid, razen če ima izvirni model že uporabne poverilnice (takrat se uporabi opisovanje); kombinacijski cilji vedno uporabijo opisovanje.                             |
| `describe` |          | Vedno opiše — blok za preusmerjanje se v celoti preskoči; vedno odgovori model, ki ga je izbral uporabnik.                                                                                                                                                                                                     |
| `reroute`  |          | Vsili preusmeritev: varovalo za ohranitev modela s poverilnicami se zaobide. Varovalo poverilnic za **cilj** preusmeritve še vedno velja — kadar ni uporabnega cilja s podporo za vid, zahteva nadaljuje na opisovanje, tako da neobdelane slike nikoli ne dosežejo zaledja, ki podpira samo besedilo (#8430). |

Prisilni načini se zaključijo **pred** izvajanjem samodejne hevristike; vedenje načina `auto`
je na ravni bajtov enako varovalu pred PR-1.

#### Obseg ključa API (`visionBridgeKeyScope.ts`)

Kadar klicateljev ključ API omejuje `allowedConnections`, skupine kvot
(`allowedQuotas`) ali modele (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), most za preusmerjanje
in opisovanje izbere samo modele, ki jih ključ sme uporabljati, na povezavah, ki jih ključ sme
uporabljati. Klic za opisovanje se nato vedno izvede prek samozanke OmniRoute z
glavo `x-omniroute-self-loop-key-id`, tako da prejemna zahteva za klepet znova
uveljavi pravilnik tega ključa za povezave in modele. `enforceApiKeyPolicy()`
upošteva to glavo samo skupaj z žetonom bearer samozanke, zato lahko dostop zgolj
zoži, identifikator, ki ga ni mogoče razrešiti, pa je zavrnjen.

Če za ključ ni dovoljen noben model za vid, se pot opisovanja umakne in
zahteva se brez sprememb posreduje naprej, kar je enako odprtemu načinu ob napaki kot pri onemogočenem
varovalu (metapodatki `{ skipped: true, reason: "no_permitted_vision_model" }`).
Zahteve brez ključa in ključi brez teh omejitev se vedejo popolnoma enako
kot prej.

#### Poziv za opisovanje, prilagojen opravilu (`modalityBridgeVisionTaskAware`)

Privzeto **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) osnovnemu pozivu za opis doda besedilo **zadnjega uporabnikovega sporočila** (skrajšano na 500 znakov), s čimer opis usmeri k temu, kar je uporabnik dejansko zahteval (vzorec codex-vision-proxy), in modelu za vid naroči, naj prepiše vidno besedilo. Če je zastavica izklopljena — ali če ni uporabniškega besedila — se osnovni poziv uporabi nespremenjen.

Lastna zahteva samopovratne zanke za opis, združljiva z OpenAI (`callVisionModelSingle()`
v `visionBridgeHelpers.ts`), vedno zahteva `image_url.detail: "high"` —
brezpogojno, za vsakega klicatelja/ponudnika, neodvisno od kakršnega koli signala odjemalca.
Vzorčenje z nizko stopnjo podrobnosti poslabša natančnost OCR ravno pri nalogi
prepisovanja besedila, ki jo zahteva ta poziv, zato sam klic za opis vedno zahteva visoko
stopnjo podrobnosti ne glede na to, katero stopnjo podrobnosti je uporabljala prvotna vhodna zahteva. To
vpliva samo na telo interne zahteve za opis; ne spremeni načina, kako
OmniRoute posreduje klicateljev lastni `image_url.detail` v primarni zahtevi —
ta privzeta vrednost se uporabi ločeno in samo za zaznane odjemalce OpenCode v
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Veja samopovratne zanke
za opis z žičnim formatom Anthropic nima polja `detail` in nanjo nobena od teh privzetih
vrednosti ne vpliva.

#### Omejitev izhoda opisa (`modalityBridgeVisionMaxChars`)

| Ključ                          | Privzeto | Razpon            |
| ------------------------------ | -------- | ----------------- |
| `modalityBridgeVisionMaxChars` | `0`      | `0` ali 100–50000 |

`0` (privzeto) pomeni **brez omejitve** — opis, ki ga vrne
`callVisionModel()`, se posreduje nespremenjen, s čimer se ohrani obstoječe
vedenje. Vsaka vrednost v razponu 100–50000 opis skrajša in mu doda
pripono `…`, preden se vstavi nazaj kot `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` v `src/lib/guardrails/visionBridge.ts`).
To vrednost zvišajte za opravila OCR z veliko podrobnostmi, pri katerih nadaljnji model potrebuje
celoten prepis; znižajte jo, da omejite porabo žetonov pri gostobesednih modelih za vid.
Polje na nadzorni plošči je na plošči Advanced zavihka Vision
(`modality-bridge-max-chars` v `ModalityBridgeVisionTab.tsx`) in vsako
vrednost med 1 in 99 omeji navzgor na spodnjo mejo 100, medtem ko izrecno vrednost `0`
pusti nedotaknjeno — `0` je samostojna veljavna vrednost Zod
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`) in ne zgolj
privzeta vrednost »ni nastavljeno«.

#### Predpomnilnik opisov (`modalityBridge/bridgeCache.ts`)

Predpomnilnik LRU + TTL v pomnilniku za izhode opisov, ki je skupen celotnemu procesu.
Ključ = `sha256(imageRef + composedPrompt + configuredBridgeModel)` z
uokvirjanjem s predpono dolžine (brez kolizij na mejah polj). Komponenta modela je
**konfigurirani** premostitveni model, ne model, ki je dejansko odgovoril —
`callVisionModel` lahko interno preklopi na nadomestni model, ustvarjanje ključev za vsak poskus pa bi
razdrobilo predpomnilnik. Neuspešni opisi se nikoli ne predpomnijo. Nastavitve:

| Ključ                           | Privzeto | Razpon  |
| ------------------------------- | -------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`   | —       |
| `modalityBridgeCacheTtlMinutes` | `60`     | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`    | 10–5000 |

#### Normalizacija oddaljenih slik (samopovratni opis/pridobivanje base64)

Ko most sam pridobi **oddaljeno** sliko — pri samoklicu za opis Anthropic
in pretvorbi base64 v žičnem formatu Claude
(`ensureBase64ImagesForClaudeWire`), oboje prek
`fetchRemoteImageAsDataUri()` v `visionBridgeHelpers.ts` — se nastali podatkovni
URI pred vdelavo v zahtevo modelu za vid posreduje skozi `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`).
Prevelike slike se pomanjšajo tako, da je **daljša stranica dolga 2048 px** (kar ustreza
omejitvi spreminjanja velikosti, ki jo OpenAI/Anthropic že uporabljata na strani strežnika), s čimer se zmanjšajo
količina prenesenih bajtov in zakasnitve, ne da bi se spremenilo, kaj vidi model za vid. Spreminjanje velikosti
uporablja `sharp`, naložen prek dinamičnega uvoza: na platformi, kjer njegove izvorne
binarne datoteke ni mogoče naložiti, `normalizeDataUri()` **nikoli ne sproži izjeme** —
namesto tega nespremenjeno prepusti izvirne bajte, zato pot
opisa/pretvorbe base64 vedno deluje. Bajti, ki niso slika (pridobitev, ki ni vrnila
slike, primerne za dekodiranje), se prav tako prepustijo nespremenjeni. Ta normalizacija
je omejena na slike, ki jih most pridobi za lasten samoklic — nikoli
se ne uporabi za klicateljevo neobdelano vsebino, ki se neposredno posreduje, skladno z
načelom spreminjanja samo ob izrecni vključitvi (strogo pravilo št. 20).

#### Shema nastavitev + migracija

Novi ključi `modalityBridge*` so preverjeni z Zod v `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, trojica `modalityBridgeCache*` in
skupina `modalityBridgeAudio*`, ki jo uporablja Audio Bridge. Migracija
`141_modality_bridge_settings.sql` kopira obstoječe podedovane vrednosti
`visionBridge*` v ustrezne nove ključe (idempotentno in brez prepisovanja
vrednosti `modalityBridge*`, ki jo je nastavil upravljavec); podedovani ključi ostanejo sprejeti kot
rezervna možnost za branje v enem ciklu izdaje.

#### Glava za preglednost + statistika

Odzivi, pretvorjeni z opisom, vsebujejo
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(sestavi jo `buildModalityBridgeHeader()` v `modalityBridge/bridgeStats.ts`,
doda pa jo `withModalityBridgeHeader()` v `src/sse/handlers/chatHelpers.ts`).
Preusmerjene zahteve **ne** dobijo glave — vsebina je ostala nespremenjena, zamenjava modela
pa je že vidna v polju `model` telesa odziva.

`GET /api/modality-bridge/stats` (avtentikacija za upravljanje, ista raven kot
`GET /api/settings`) vrne števce v pomnilniku za vsako modalnost
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` za `vision`, `audio` in
`video`. `averageLatencyMs` kot imenovalec uporablja `latencySamples`, ne vseh
poskusov; operacija brez merjenja časa ne ustvari lažnega vzorca z nič
milisekundami. `bridged` ostaja vzvratno združljiv vzdevek za uspešne
pretvorbe; neuspešni poskusi ga ne povečajo.
Števci se načrtno ponastavijo ob ponovnem zagonu procesa
(telemetrija, ne računovodstvo).

#### Konfiguracija nadzorne plošče

Namenska stran nadzorne plošče je
`/dashboard/settings/modality-bridge`. Njeni zavihki `Vision`, `Audio` in
`Video`, ki jih je mogoče nasloviti z URL-jem, med preklapljanjem vrednosti `tab`
ohranijo parametre poizvedbe.
Zavihek Vision omogoča vklop, izbiro načina in modela (vključno s samodejno
privzeto izbiro), pozive glede na opravilo, napredne omejitve časovne omejitve,
slike, dolžine opisa in predpomnilnika, števce izvajanja ter zaščiten vzorčni
zahtevek. Tudi zavihek Audio je aktiven: omogoča vklop, izbirnik modelov samo za
STT z možnostjo Auto, omejitve časovne omejitve in največje dolžine posnetka,
števce za zvok ter vzorčni preskus `input_audio`. Zavihek Video je funkcionalen:
poroča o stanju izvajalnega okolja FFmpeg/ffprobe — enem od štirih izrecnih stanj
uporabniškega vmesnika (`unknown`, medtem ko preverjanje poteka ali ga ni bilo
mogoče dokončati, `restricted` pri gostitelju nadzorne plošče, ki ni povratna
zanka in kjer se preverjanje preskoči na strani odjemalca, `unavailable`, ko je
bila s preverjanjem potrjena odsotnost, ali `available` z različicama
FFmpeg/ffprobe) — trajno shrani omejitve vklopa, modela, sličic, videa in časovne
omejitve, izbirnik modelov filtrira na modele, ki podpirajo vid, ter prikazuje
števce za video.

Nekdanja kartica Vision Bridge v nastavitvah umetne inteligence je povezava za
združljivost do nove strani; ne vsebuje več druge kopije obrazca. Media
Providers prav tako povezuje poteka dela Image-to-Text in Speech-to-Text z
ustreznima zavihkoma Modality Bridge, ne da bi odstranil obstoječe preskusno
okolje Speech-to-Text.

**Obhod preverjanja dostopa za povratno zanko:** ko je opisni klic usmerjen prek
lastne povratne zanke `/v1` sistema OmniRoute (nestandardni model ponudnika),
podzahtevek pošlje `x-omniroute-admission-bypass: internal` in se avtenticira z
razrešeno poverilnico povratne zanke — lokalno nadomestno vrednost
`sk_omniroute` v lokalnem načinu ali ključ okolja `OMNIROUTE_API_KEY` /
`ROUTER_API_KEY`, ki ga konfigurira upravljavec (#1350), tako da lahko uvedbe z
`REQUIRE_API_KEY=true` še vedno izvedejo opisni klic. Obhod je dovoljen samo za
te natančno določene poverilnice, zato zunanji odjemalci ne morejo uporabiti
glave za preskok preverjanja dostopa.

Podedovane privzete vrednosti so v `src/shared/constants/visionBridgeDefaults.ts`;
nove privzete vrednosti za način, upoštevanje opravila in predpomnilnik ter
razreševalnik nastavitev so v
`src/shared/constants/modalityBridgeDefaults.ts`. Zaščitni mehanizem ponuja
možnost konstruktorja `deps`, da lahko preskusi vstavijo lažne implementacije
`getSettings` in `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Prestrezanje zahtevkov za klepet, ki vsebujejo zvok, preden dosežejo cilj, za
katerega ni znano, da sprejema zvočni vhod. Zahtevek za klepet ni nikoli
preusmerjen: zvočni deli se prepišejo prek obstoječe večdelne končne točke,
združljive z OpenAI, izbrani model za klepet pa nadaljuje z besedilnimi prepisi.

Potek:

1. Razreši `supportsAudio` prek `getResolvedModelCapabilities()`. Prednost imajo
   izrecni metapodatki registra ponudnikov, nato statični metapodatki modela in
   nazadnje sinhronizirani `modalities_input`. Deklariran seznam vhodov brez
   `audio` pomeni `false`; če ni nobenih dokazov o zmogljivosti, ostane vrednost
   `null`. Tako `false` kot `null` aktivirata konservativni most, `true` pa ga
   obide.
2. Razreši nastavitve `modalityBridgeAudio*` in iz vsakega sporočila prek
   skupnega detektorja `detectMediaParts()` izloči zamenljive zvočne dele na
   najvišji ravni. Podprte žične oblike so OpenAI `input_audio`, `audio_url` in
   `source.media_type: "audio/*"`. Ugnezdeni zvok je zaznan za usmerjanje,
   vendar ga pot zamenjave ne odstrani. Količina dela je omejena z
   `modalityBridgeAudioMaxClips`; poznejši deli ostanejo nespremenjeni.
3. Upošteva konfigurirani `provider/model` ali pa funkciji
   `selectAudioBridgeModel()` dovoli, da v stabilnem vrstnem redu kataloga
   pregleda `AUDIO_TRANSCRIPTION_PROVIDERS` in izbere prvi model z uporabno
   aktivno poverilnico ponudnika.
4. `callAudioTranscription()` pretvori zvok base64/podatkovni URI v večdelno
   datoteko `file` ali pa oddaljeni `audio_url` prenese prek zaščite za javne
   odhodne povezave s pripenjanjem DNS in omejitvijo 25 MB. Nato datoteko in
   izbrani model pošlje z zahtevo POST v lokalno povratno zanko
   `/v1/audio/transcriptions`, avtenticirano z `resolveSelfLoopBearer()`.
   Obstoječa pot za prepis izvede običajno iskanje poverilnic, obravnavo obdobja
   ohlajanja/omejevanja hitrosti in posredovanje ponudniku.
5. Uspešni klici zamenjajo svoje dele z `[Audio N]: <transcript>`. Klici se
   izvajajo s `Promise.allSettled`: posamezna napaka ohrani izvirni zvočni del
   (#4012 contract). Če vsi klici spodletijo in je za cilj dokazano
   `supportsAudio === false`, deli postanejo
   `[Audio N]: (unavailable — no STT provider connected)` (#8430 contract). Pri
   neznanem cilju (`null`) ostane rezultat, pri katerem so spodleteli vsi klici,
   nespremenjen. Cilj, za katerega je dokazano, da podpira samo besedilo, brez
   uporabne poverilnice STT prejme enako izrecno nadomestilo brez omrežnega
   klica.

Uspešni prepisi uporabljajo predpomnilnik LRU/TTL Modality Bridge, ki velja za
celoten proces. Ključ združuje sklic na zvok, stabilno oznako operacije
`audio-transcription` in izbrani model STT; napake se nikoli ne predpomnijo.
Poskusi za zvok posodobijo skupne števce `bridged`, `cacheHits`, `failures` in
`lastUsedAt`. Preoblikovani odgovori vsebujejo
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`;
nespremenjeni zahtevki ne prejmejo segmenta Audio Bridge.

Nastavitve izvajanja so shranjene v zbirki podatkov in preverjene z Zod:

| Ključ                         | Privzeto | Razpon               |
| ----------------------------- | -------- | -------------------- |
| `modalityBridgeAudioEnabled`  | `true`   | —                    |
| `modalityBridgeAudioModel`    | `""`     | Samodejno ali ID STT |
| `modalityBridgeAudioTimeout`  | `60000`  | 1000–300000          |
| `modalityBridgeAudioMaxClips` | `3`      | 1–10                 |

Skupni predpomnilnik še naprej nadzorujejo `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` in `modalityBridgeCacheMaxEntries`.

### Videomost (`videoBridge.ts`, `videoBridgePipeline.ts`)

Prestrezajo se deli videoposnetkov na vrhnji ravni v `messages` API-ja Chat Completions in
`input` API-ja Responses, preden je poklican ciljni sistem brez znane izvorne podpore
za videoposnetke. Podprte oblike so `input_video`, `video_url`, `video_source`, URL-ji HTTPS
in podatkovni URI-ji `data:video/*;base64,...`. Navadna imena datotek v besedilu niso obravnavana
kot videoposnetki.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) skrbi za pregled zahteve,
preverjanje zmogljivosti/pravilnika, združevanje za posamezno zahtevo in podatke odziva.
Delo za posamezen videoposnetek — pridobivanje, predpomnilnik celotnega rezultata, opisovanje zaporedja
sličic (ki združi morebitni zvočni prepis, ki ga je navedel klicatelj) ter metrike/prekinitev/čiščenje
za posamezen poskus — je skrito za `processVideoPart` v
`videoBridgePipeline.ts`, ki je enkrat poklican za vsak del videoposnetka znotraj zanke funkcije `preCall`.
Ta modul določa tudi eksplicitne meje vrat `VideoMediaBrokerPort`
(pridobivanje bajtov in izvlečenje vzorčenih sličic), `VideoAudioTranscriptionPort`
(združevanje zvočnega prepisa, ki ga je navedel klicatelj, z vzorčenimi opisi) in
`VideoDrilldownPort` (meja trajne hrambe za podrobni pregled sličic; še ni povezana
s `processVideoPart` — trenutno vnose podrobnega pregleda zapisuje samo ločena pot `/api/modality-bridge/video/drilldown`).

Javna pot zahtev `/v1` nikoli ne uvozi ali prikliče podprocesa. Oddaljeni
videoposnetki se prenesejo z omejitvijo 50 MiB; videoposnetki base64 v sami zahtevi imajo
konzervativno omejitev 36 MiB dekodiranih podatkov na videoposnetek, da lahko ovoj
modela/sporočil/uokvirjanja ostane znotraj javne omejitve sprejema zahtev JSON, ki znaša 50 MiB. Dolžina
vstavljene vsebine in ocene dekodirane velikosti se preverijo pred dodelitvijo pomnilnika. HTTPS je
zahtevan za začetni oddaljeni URL in vsako preusmeritev, pri čemer se uporablja obstoječa
zaščita za izhodne povezave samo do javnih naslovov s pripenjanjem DNS. Bajti nato prečkajo natančno notranjo
mejo posrednika `POST /api/modality-bridge/video/extract`. Ta pot je hkrati
`LOCAL_ONLY` in `SPAWN_CAPABLE`, sprejema samo overjeno zahtevo znotraj procesa
prek zaupanja vrednega vmesnika povratne zanke ter nikoli ne sprejme URL-ja, poti datotečnega sistema, izvedljive datoteke
ali seznama argumentov. Cevovod za omejitev velikosti telesa API-ja in postopni bralnik telesa
obravnavalnika neodvisno uveljavljata omejitev 50 MiB za vhod posrednika. Njegova omejena čakalna vrsta izvaja
eno izvlečenje naenkrat, dovoljuje štiri čakajoča opravila in omejuje čakajoči vhod na
100 MiB.

Znotraj posrednika `ffprobe` bere zasebno lokalno datoteko; fiksni seznam dovoljenih
oblik izključuje oblike seznamov predvajanja in manifestov. Pri dovoljenih vsebnikih družine MOV
ostanejo zunanja sklicevanja na podatke MOV privzeto onemogočena, fiksni ukaz pa jih
ne omogoči. Tako `ffprobe` kot `ffmpeg` uporabljata seznam dovoljenih protokolov samo z
`file`, eno nit, fiksna polja argumentov, brez lupine
in izvedljive datoteke, razrešene iz `PATH`. Tokovi naslovnih slik niso
primerni za predvajanje. Vsi tokovi, primerni za predvajanje, morajo izpolnjevati omejitve, pri čemer
ima eksplicitni privzeti tok prednost pred deterministično nadomestno izbiro z najnižjim indeksom.
Videoposnetki so omejeni na 600 sekund, 8.192 slikovnih pik na dimenzijo in
33.554.432 izvornih slikovnih pik. FFmpeg vzorči 1–16 sredinskih sličic JPEG, zmanjša
daljši rob na največ 1.024 slikovnih pik, ne da bi povečal manjše vhode, in
nikoli ne prejme URL-ja. Vzorčenje je privzeto `uniform`. Izbirna pravilnika
`scene_aware` in eksperimentalni `segment_aware` izvedeta en dodaten
fiksni prehod FFmpeg prek že preverjenega lokalnega toka, izbereta omejene
časovne žige prizorov `showinfo` in se ob napaki detektorja, časovni omejitvi, neustrezno oblikovanem izhodu ali praznem
naboru kandidatov deterministično vrneta na iste enakomerno razporejene sredinske točke.
Način, ki upošteva segmente, dodeli vzorce sredinskih točk sorazmerno
preverjenim intervalom prizorov; dokazi za upoštevanje segmentov in obnašanje pri nadomestni izbiri so
podrobneje opisani spodaj. Trda omejitev 16 sličic se
uporabi po izbiri pri vsakem pravilniku. Ko ima zahteva, ki upošteva prizore, na voljo le
eno sličico, uporabi enakomerno sredinsko točko aktivnega celotnega videoposnetka ali fokusnega
okna in poroča `policyEffective: uniform`: ena sama izbrana sličica prizora
ne more ohraniti obeh časovnih koncev. Klicatelj lahko po želji navede
končno fokusno okno (`start`/`end` v sekundah); meje se omejijo na trajanje medija,
obrnjena ali nekončna okna so zavrnjena, vsi pravilniki vzorčenja
pa se izvajajo samo znotraj normaliziranega intervala. Nastalo
okno je vključeno v metapodatke vzorčenja in v predpono nezaupanja vrednega opisa,
da lahko nadaljnji modeli razlikujejo fokusirani izsek od celotne
časovnice.

Semantično osredotočanje opisov je ločena, eksplicitna nastavitev. Privzeti način analize `full`
ohrani obstoječi poziv za sličice in besedila zahteve nikoli ne posreduje modelu
za opisovanje. V načinu `focused` most prebere samo najnovejši
neprazen `text`/`input_text`, ki ga je napisal uporabnik, iz istega vsebnika Chat ali Responses,
ga normalizira v NFC, strne kontrolne znake in presledke
ter omeji na 500 kodnih točk Unicode. Prazen rezultat se vrne na
povsem enak poziv `full`. Uporaben namig se serializira kot JSON v namenskem
bloku nezaupanja vrednega uporabniškega konteksta in lahko daje prednost samo opaznim podrobnostim; ne
more preglasiti ločenega opozorila, naj se ne upoštevajo navodila, ki so vidna
ali slišna v mediju. Besedilni fokus nikoli ne sklepa vrednosti `start`/`end` in ne spreminja
časovnega vzorčevalnika.

#### FU-07 strukturni dokazi o segmentih

`segment_aware` izvede en omejen prehod predhodne analize nad že preverjenim
lokalnim videotokom. Fiksna veriga filtrov najprej zmanjša širino na največ 320
slikovnih pik, zazna spremembe prizorov in zamrznjene intervale, nato pa vzorči
s hitrostjo 1 sličice na sekundo za določanje zamegljenosti, povprečne luminance
ter prostorskih/časovnih informacij. Prehod je omejen na 600 strukturnih vzorcev,
eno nit FFmpeg/filtrov, isti protokol, omejen izključno na `file`, in sezname
dovoljenih vsebnikov, omejitev izhoda procesa 1 MiB ter največ 30 sekund znotraj
posrednikove skupne prekinitve/časovnega roka. Iz zahteve nikoli ne sprejme
ukaza, filtra, poti ali URL-ja.

Strukturne vrednosti so deterministični vzorčni dokazi in ne semantično
razumevanje videa. Ne sklepajo o subjektih, dejanjih, napisih, govoru ali namenu
uporabnika. Meje prizorov in zamrznitev tvorijo segmente; pokritost z zamrznitvijo,
zamegljenost, osvetlitev, prostorske podrobnosti in časovne spremembe vplivajo le
na razporeditev obstoječega proračuna 1–16 sličic. Popolnoma zamrznjen segment
je omejen na eno sličico, medtem ko nezamrznjeni segmenti tekmujejo za preostali
proračun. Ko je mej več kot sličic, se ohrani enakomerna pokritost časovnice,
tako da hitri zgodnji rezi ne morejo skriti dolgega končnega segmenta. Meje
prizorov, ki so znotraj 1-sekundne ločljivosti analize glede na mejo zamrznitve,
se združijo.

Manjkajoči filtri, nepravilno oblikovani/prazni dokazi, napaka detektorja ali
časovna prekoračitev omejene predhodne analize se obravnavajo odprto z uporabo
natanko pravilnika enakomernih sredinskih točk. Prekinitev klicatelja ali časovni
rok posrednika se ne obravnavata odprto: končata izvajajoči se podproces,
preprečita poznejše pridobivanje sličic, zasebno začasno drevo pa se odstrani
v `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` ustvari deterministične dejanske
preizkusne vsebine FFmpeg za prihranke pri klicih za opisovanje po odstranitvi
dvojnikov, razporejanje proračuna pri gostem gibanju, dokaze o
zamegljenosti/osvetlitvi/SI-TI, hitre reze z dolgim zaključkom in lažno pozitivne
rezultate pri postopnem prelivu. Beleži pretečeni čas predhodne analize ter, kjer
je na voljo `/usr/bin/time`, procesorski čas podrejenega procesa in največji RSS.
Preverjanja kakovosti so zgolj strukturni oraklji. Kakovost dejanskega modela za
opisovanje ostaja `HOLD`, ker to preskusno ogrodje nima pooblaščene končne točke
ali zamrznjenega ocenjevalnika. Tudi denarni prihranki ostajajo `HOLD`, razen če
`--caption-cost-per-call-usd` poda izrecno pozitivno oceno stroška na klic;
skript nikoli ne izmisli nobenega od teh rezultatov.

Vsaka sličica je omejena na 4 MiB, vse neobdelane sličice skupaj na 23 MiB,
serializirani odgovor posrednika pa na 32 MiB. Zasebni začasni imenik se odstrani
v `finally`. OmniRoute ne vključuje FFmpeg in ne sprejema poti do izvedljive
datoteke po meri. Pred opisovanjem most uporabi konservativen prehod vizualnega
odstranjevanja dvojnikov: vsak JPEG zmanjša na sivinski medpomnilnik velikosti
16×16 in ga primerja samo z zadnjo ohranjeno sličico. Pri zahtevanem proračunu
za opisovanje, večjem od ene sličice, pridobivanje zagotovi omejen nabor
kandidatov do največ dvakratnika tega proračuna in nikoli več kot 16 sličic.
Zahtevana zgornja meja se uporabi šele po odstranitvi dvojnikov, pri končnem
redčenju pa se ohranita prvi in zadnji izbrani kandidat, kadar je proračun
najmanj dve sličici. Različicami opredeljen pravilnik
`grayscale-16x16-mean-cells-v2` uporablja večjo izmed povprečne razlike luminance
in deleža celic sličice, katerih normalizirana razlika je najmanj 0.05. Prag
podvojenosti je konstanta 0.04, izbrana zaradi predvidljivosti in ne izpostavljena
kot nastavitev med izvajanjem. Ta sekundarni visokokontrastni signal ohrani
majhne premike in spremembe vidnega besedila, ki jih lahko primerjava zgolj
povprečij skrije. Napake primerjalnika ali dekodirnika se obravnavajo odprto in
ohranijo pokritost. Izhodni metapodatki ločujejo pridobljene kandidate, uspešno
uporabljene sličice in odstranjene vizualne dvojnike.

Izrecno označeni videoelement lahko zahteva kontaktni list s časovnimi žigi.
Most ustvari mrežo JPEG z največ 4 stolpci in 16 sličicami. Vsaka celica velikosti
512 slikovnih pik vtisne časovni žig svojega vira v visokokontrastni spodnji pas,
isti časovni žigi pa ostanejo v besedilnih metapodatkih za nadaljnje povezovanje
in revizijo. Celoten JPEG ostane omejen na 32 MiB. Če `sharp` ne more dekodirati
ali sestaviti mreže, most preklopi na posamezne sličice JPEG; prekinitev odjemalca
se še vedno prenese skozi operacijo kontaktnega lista.

Dokazi za uvedbo so namenoma ločeni od sintetičnega mikromerila zmogljivosti
sestavljanja. `scripts/perf/video-bridge-contact-sheet-eval.ts` opredeljuje
različicami sheme določeno preskusno ogrodje A/B za dejanske modele vida,
združljive z OpenAI. Meri žetone, o katerih poroča ponudnik, celotno zakasnitev
(ki vključuje sestavljanje kontaktnega lista), število klicev modela in ohranitev
dejstev, določenih z manifestom. Neobdelani odgovori modela se ne zapišejo v
poročilo; ohranijo se samo izvlečki SHA-256 in ID-ji ujemajočih se dejstev.
Preskusno ogrodje ne izvede nobenega omrežnega ali plačljivega klica modela,
razen če je podan `--execute-real` ter so nastavljeni `--model`,
`OMNIROUTE_BASE_URL` in `OMNIROUTE_API_KEY`. Brez takega izrecnega dejanskega
izvajanja njegov strojno berljiv rezultat ostane `HOLD`; sintetične meritve
koristne vsebine/števila klicev same po sebi niso dokaz za uvedbo.

Klicatelji lahko podprtemu videoelementu priložijo izbirno polje
`transcript.cues`, kadar že imajo časovno poravnano besedilo. Vsaka iztočnica
mora vsebovati `text`, končen interval `start`/`end` znotraj preverjenega trajanja
in `source` z dovoljenega seznama (`client`, `embedded` ali `audio-bridge`);
`confidence` je privzeto `1` in mora ostati med `0` in `1`. Popolnoma enake
iztočnice se združijo. OmniRoute iz teh metapodatkov nikoli ne začne prepisovanja:
preverjene iztočnice se kopirajo v opisani rezultat skupaj z virom, zaupanjem in
intervalom ter se prikažejo kot nezaupanja vredna opažanja ob opisih sličic.
Neveljavno besedilo, besedilo zunaj obsega ali brez podatkov o izvoru se zavrne,
namesto da bi se pomešalo v tok opisov. Oba kanala prepisa v telesu zahteve
normalizirata podani izvor na `client`, vključno s samodeklariranima oznakama
`embedded` ali `audio-bridge`. Samo prilagojevalnik pod nadzorom strežnika lahko
tem zaupanja vrednim oznakam dodeli argument `trustedSource`, ki je dostopen
samo prek kode; polje JSON v zahtevi tega argumenta ne more doseči. Besedilo
prepisa ostaja nezaupanja vredna vsebina, izpeljana iz predstavnosti, ne glede
na svoj izvor, in nikoli ne sme določati avtorizacije.

Napredni klicatelj lahko za isti videoposnetek zagotovi sled `audioTranscript`;
ta se obravnava kot besedilo, ki ga zagotovi odjemalec, in ne kot dokaz strežniškega prepisovanja.
Spoj združevanja izvaja vizualna in zvočna opažanja znotraj
enega roka in z enim signalom za prekinitev, jih razvrsti na skupni časovnici, združi
popolnoma enake dvojnike ter sporoči delni rezultat, kadar uspe samo ena stran.
Neveljaven `audioTranscript` se omeji na tak delni rezultat — vizualni
opis se ohrani, zvočna veja pa zabeleži prečiščeno kodo napake —
namesto da bi celoten videoposnetek spodletel. Razpoložljivost posamezne veje, oznaka delnosti
in prečiščene kode napak se ohranijo v opisanem rezultatu, v
metapodatkih zaščitnih mehanizmov (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), v metapodatkih predpomnilnika rezultatov in v števcih
združevanja mostu. Privzeta pot Video Bridge ne prikliče pretvorbe govora v besedilo
in ne prenese druge kopije predstavnosti; brez te izrecne sledi ostane
omejena samo na video.

**Hranjenje prepisa (#12150 P1).** To se samodejno uporabi vedno, ko
Video Bridge (ki ga je treba posebej omogočiti) upodobi iztočnico prepisa — ločena
oznaka za hranjenje ne obstaja. Ko zahteva upodobi katero koli iztočnico prepisa (s strani klicatelja deklariran
`transcript` ali združen `audioTranscript`), jo zaščitni mehanizem označi kot
`videoBridgeObserved` in ustvari redigirano senčno kopijo opisa videoposnetka —
enako upodobitev, v kateri je telo prostega besedila vsake iztočnice nadomeščeno z
`[redacted-video-transcript]`, ustvarjeno z zamenjavo strukturiranega polja iztočnice,
preden je niz sestavljen (nikoli z razčlenjevanjem sploščenega besedila, zato ne more preživeti nobena
vsebina iztočnice — zlonamerna ali običajna, vključno s telesi, ki vsebujejo `]`, kot sta
`[inaudible]`/`[music]`). Shranjeno telo zahteve v dnevniku klicev zamenja
vsak besedilni del, izpeljan iz videoposnetka, s to redigirano senčno kopijo, pri čemer se ujema po
enakosti vsebine; sidro `fullText` se znova prebere iz dokončane vsebine zaščitnega mehanizma
pred klicem, zato ujemanje še vedno uspe, potem ko poznejši verižni zaščitni mehanizmi (maskirniki osebno določljivih
podatkov in poverilnic s prioritetama 10/95) prepišejo besedilo opisa na mestu ter
potem ko vstavljanje sistemskega poziva/predaje/pomnilnika preoblikuje polje sporočil. Telo,
poslano modelu, ostane nespremenjeno. Opažena zahteva prav tako ne zapolni
trajnega pomnilnika Memory (preskoči se pridobivanje tako iz zahteve kot iz odgovora),
zato niti odgovor samega modela ne more ponoviti besedila prepisa v Memory.

**Neobdelana polja videoposnetka (#12430).** Ko je most omogočen in izvorna podpora videu ni znana ali je ni, definirani polji `transcript`/`audioTranscript` prav tako aktivirata `videoBridgeObserved`, tudi po neuspešnem opisovanju ali omejitvi `maxVideos`. `null` in prazni nizi štejejo; odsotna polja in metapodatki, ki niso povezani z videom, ne štejejo. Shranjene kopije ta polja redigirajo ali zahtevo izpustijo, predpomnilniki/Memory pa se zaobidejo.

Na teh nadomestnih poteh veljavne iztočnice klicatelja postanejo podprti deli `text`/`input_text`
namesto nestandardnih polj ponudnika. Obe s strani zahteve podani sledi
ostaneta nezaupanja vredni opažanji vrste `client` z izrecnim opozorilom, da videoposnetek
ni bil opisan in da časovni žigi niso bili preverjeni glede na predstavnost. Obstoječe
omejitve 256 iztočnic/64 KiB skupno in omejitve na posamezno iztočnico veljajo za obe sledi skupaj;
časovni žigi morajo biti znotraj posrednikove zgornje meje 600 sekund in morebitnega podanega
okna fokusa. Neveljavne sledi se zavržejo in se ne posredujejo kot poljubno besedilo; veljavna
sorodna sled se lahko še vedno uporabi, razen če je presežena njuna skupna omejitev. Ničelna/prazna
polja ne dodajo besedila. Ta nadomestna pot ne doda nobenega pridobivanja predstavnosti ali prepisovanja.
Razširitvena polja prepisa se odstranijo iz nadomestnega nosilca videoposnetka in njegovih
objektov `video_url`/`source`. Seznam dovoljenih elementov v žičnem protokolu OpenAI ostane strog; nosilci videa
z neznano izvorno podporo ostanejo na voljo, znani cilji, ki podpirajo samo besedilo, pa ohranijo varne oznake.
Strukturirane redigirane senčne kopije zaščitijo dodano besedilo prepisa, medtem ko
izvirna zahteva v lasti klicatelja ostane nespremenjena. Cilji z izvorno podporo in
onemogočeni mostovi ohranijo obstoječe obnašanje z zaobidom.

Dodatne shranjene kopije uporabljajo isti signal opažene zahteve. Neobdelani
posnetek zahteve odjemalca pred zaščitnim mehanizmom, čakajoča zahteva v pomnilniku in dnevnik
zgodaj zavrnjenih zahtev strukturno zamenjajo polja prepisa v delih videoposnetka;
nizovni pozivi, ki jih ustvarijo stopnje cevovoda in predaja konteksta, se redigirajo
na ponoru shranjenega telesa zahteve. Shranjena oznaka `video_content_removed`
povzroči, da se nadaljevanje `previous_response_id` varno prekine, namesto da bi rekonstruiralo
besedilo, ki je bilo namerno zavrženo. Če opažena zahteva pred beleženjem izgubi svojo
redigirano senčno kopijo za posamezni del ali če se po poznejših spremembah zahteve ne ujema
celo samo ena od več senčnih kopij videoposnetka, se shranjeno telo zahteve
v celoti izpusti, namesto da bi se ohranil delno redigiran prepis.

Pri opaženi zahtevi lahko odgovor modela citira kateri koli del
prepisa brez strukturirane meje iztočnice. Njegov shranjeni `responseBody` v dnevniku klicev
se zato nadomesti z oznako izpustitve; podroben
artefakt cevovoda (ki lahko vključuje telesa ponudnika/odjemalca in pretočne dele)
se ne shrani. Semantični predpomnilnik, predpomnilnik idempotentnosti in predpomnilnik ponovnega predvajanja sklepanja
za to zahtevo zaobidejo branja in pisanja. Zahteva ponudniku in
odjemalcu viden odgovor ostaneta nespremenjena. Zgodnji bajti za ohranjanje povezave se izpraznijo iz začasnega
medpomnilnika, ko je podroben artefakt izpuščen. Kirovo opozorilo o nepravilno oblikovanem toku EventStream
sporoči samo število bajtov koristne vsebine, nikoli pa njene vsebine ali neobdelane napake
razčlenjevalnika JSON.
To ne pomeni, da je bila pregledana vsaka nepovezana diagnostika ponudnika/vtičnika;
širši pregled ponorov za hranjenje se spremlja v #11658.

Notranji življenjski cikel `/api/modality-bridge/video/drilldown` je ločena predpomnilniška podlaga s povratno zanko in preverjanjem pristnosti z žetonom. Vsaka operacija zahteva tudi kanonični neprosojni ID glavnega subjekta. Preden je produkcijskemu klicatelju omogočen dostop, mora ta ID izpeljati iz overjenega najemnika in nikoli ne sme posredovati vrednosti, ki jo izbere odjemalec. Ključi predpomnilnika povežejo ta glavni subjekt s kanoničnimi ID-ji seje in sklica na videoposnetek, shranjujejo le njihove ključe, izpeljane s SHA-256, ter omejujejo tako branje kot brisanje na isti glavni subjekt. Predpomnilnik shrani največ 16 izpeljanih okvirjev JPEG na vnos, jih po desetih minutah odstrani in podpira omejena branja `start`/`end` ali izrecno brisanje seje.

Vsak glavni subjekt je omejen na 16 vnosov in 64 MiB kanoničnih podatkov JPEG. Te omejitve so neodvisne od globalne zgornje meje 64 vnosov/256 MiB: pritisk kvote glavnega subjekta odstrani le najmanj nedavno uporabljene vnose tega glavnega subjekta, preden se upošteva globalno odstranjevanje LRU. Potekli vnosi se ob dejavnosti predpomnilnika odstranijo tako iz obračuna glavnega subjekta kot iz globalnega obračuna, medtem ko preklic in neuspešno preverjanje veljavnosti ne potrdita delne zamenjave.

Predpomnilnik zavrne nekanonični Base64, odvečno dopolnjevanje, vsebino, ki ni JPEG, nepravilno oblikovane ali okrnjene datoteke JPEG in datoteke JPEG, ki med omejenim dekodiranjem celotne slike s `sharp` povzročijo opozorilo. Vsako sprejeto sliko znova kodira kot kanonični JPEG, širino in višino izpelje iz dekodiranih bajtov, namesto da bi zaupal poljem klicatelja, ter zavrže vse končne poliglotske bajte, namesto da bi jih ohranil. Obe kvoti se bremenita le za omejeni kanonični stisnjeni medpomnilnik. Omejitev prenosa JSON vključuje režijske stroške Base64 za zgornjo mejo 32 MiB dekodiranega vhoda. Vsaka shranjena izpeljava beleži svojo preverjeno obliko/ločljivost JPEG, pravilnik vzorčenja, različico izpeljave, čas nastanka, zgoščeno vrednost vsebine, ki jo izračuna strežnik, in zgoščeni nadrejeni sklic skupaj z zgoščeno vrednostjo nadrejene vsebine zaupanja vrednega klicatelja. Preklic se preverja med asinhronimi fazami dekodiranja/zgoščevanja pred atomsko potrditvijo v predpomnilnik.

Ta sklop še ne povezuje produkcijskega proizvajalca s potjo in ne zagotavlja izbire različic z več ločljivostmi. Pregledna pot zahteve Video Bridge zato ne povzroča dodatnega dela, medtem ko izpeljava glavnega subjekta, vezanega na najemnika, in celoten večločljivostni življenjski cikel FU-08 ostajata izrecno nadaljnje delo, namesto da bi bila dokumentirana kot dokončano vedenje.

Okvirji so zaporedno opremljeni z napisi z nastavljenim modelom Video. Prazna preglasitev Video podeduje nastavitev Vision; če sta obe prazni, samodejni usmerjevalnik Vision izbere dejanski model, ki podpira vid. Uspešni napisi zamenjajo izvirni del s stabilno predpono `[Video description:`, ki besedilo označi tudi kot nezaupanja vredno opažanje, izpeljano iz predstavnostne vsebine, in nadaljnjim modelom naroči, naj ne sledijo navodilom v predstavnostni vsebini. Ključi predpomnilnika napisov okvirjev vključujejo bajte JPEG, poziv, časovni žig in dejanski model; predpomnijo se le uspešni napisi. Vnosi predpomnilnika ohranijo dejanski uspešni model proizvajalca, vključno z nadomestnim modelom; most sporoči `mixed`, kadar so različne okvirje ustvarili različni modeli. Zadetek v predpomnilniku ponovno uporabi to identiteto proizvajalca, namesto da bi jo preimenoval v zahtevani načrt usmerjanja. Predpomnilnik rezultatov celotnega videoposnetka je ključan po vsakem vhodu, ki spremeni izhod — pozivu, dejanskem modelu, pravilniku vzorčenja, številu okvirjev, načinu semantične analize, prstnem odtisu SHA-256 normaliziranega namiga za fokus, oknu fokusa, `transcript`, `audioTranscript` in zastavici kontaktnega lista — zato sprememba katere koli od teh razsežnosti pomeni zgrešitev predpomnilnika, nikoli ponovne uporabe zastarelega vnosa. Različica pravilnika vizualnega odstranjevanja dvojnikov, prag in omejeno število kandidatnih okvirjev so prav tako izrecno vključeni v ključ in metapodatke predpomnilnika rezultatov; sprememba pravilnika zato ne more ponovno uporabiti zastarelega opisa celotnega videoposnetka. Metapodatki predpomnilnika rezultatov v4 ohranijo način in prstni odtis, nikoli pa neobdelane uporabniške naloge. Metapodatki varovalnih mehanizmov poročajo tako o zahtevanem kot dejanskem načinu analize; zahtevani način `focused` brez uporabnega uporabniškega besedila je sporočen kot dejansko `full`.

Varovalni mehanizem izvleče vsak podprt videodel, vendar jih opiše največ `modalityBridgeVideoMaxVideos`. Za cilj, za katerega je dokazano, da ima `supportsVideo === false`, neuspešni videoposnetki in videoposnetki nad omejitvijo postanejo izrecne varne besedilne oznake, tako da ne ostane noben neobdelan videoposnetek. Kadar zmožnost ni znana, ti deli ohranijo svoj videonosilec; vsak nadomestni prepis sledi zgoraj opisani omejeni pretvorbi besedila. Cilji z `supportsVideo === true` obidejo most. Signal odjemalca za prekinitev zahteve se prenese skozi prenos, čakalno vrsto posrednika, podprocese in klice za ustvarjanje napisov; prekinitve ustavijo obdelavo med videoposnetki in nikoli ne povzročijo odprtega nadaljevanja z neobdelano predstavnostno vsebino.

Nastavitve izvajalnega okolja so shranjene v zbirki podatkov in preverjene z Zod:

| Ključ                               | Privzeto    | Razpon / vedenje                                                                                        |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Izbirno izvajalno okolje, omogočeno na zahtevo                                                          |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` ohrani splošne opise; `focused` uporablja omejen, nezaupanja vreden kontekst zadnjega uporabnika |
| `modalityBridgeVideoModel`          | `""`        | Podeduje model Vision Bridge                                                                            |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                    |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` ali sorazmerni `segment_aware`; ob napaki detektorja se uporabi `uniform`      |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                     |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                          |

Starejše trajno shranjene vrednosti časovne omejitve za Video, daljše od 120 sekund, so omejene na
rok posrednika; novi zapisi nastavitev nad to omejitvijo so zavrnjeni.
`GET /api/modality-bridge/video/runtime` pred preverjanjem pristnosti ali
izvajalnega okolja zahteva zaupanja vredno, označeno lokalnost povratne zanke,
nato pa zahteva skrbniško preverjanje pristnosti. Vrne samo `available`,
prečiščene različice FFmpeg/ffprobe in nespremenljiv razlog, kadar izvajalno
okolje ni na voljo. Notranja končna točka za izvlečenje ni javni API za nalaganje:
zasičenost čakalne vrste vrne `503` skupaj z `Retry-After`, prekinitev povezave
klicatelja vrne `499`, nespremenljivi rok posrednika pa vrne `504`. Pretvorjeni odgovori
dodajo `video->text;model=<visionModel>;parts=<videos>` v osrednjo glavo
`x-omniroute-modality-bridge`, ne da bi odstranili segmente Vision ali Audio.

### Maskiranje osebno določljivih podatkov (`piiMasker.ts`)

Izvaja se v **obeh** fazah.

- **`preCall`** klonira koristno vsebino, pregleda `system`, `messages`, `input` in
  `prompt` (vključno z elementi, ki so navadni nizi), ter uporabi `processPII()` (iz
  `@/shared/utils/inputSanitizer`) za polja `content`/`text`, ki vsebujejo nize. Ko je
  `PII_REDACTION_ENABLED=true`, so zaznani osebno določljivi podatki redigirani v odhodni
  koristni vsebini. To je neodvisno od `INPUT_SANITIZER_MODE` (ki nadzoruje samo
  pravilnik za vrivanje pozivov). Ko je redigiranje izklopljeno, klic beleži število
  zaznav, ne da bi prepisal vsebino.
- **`postCall`** globoko klonira odgovor ter izvede `sanitizePIIResponse()` in
  maskiranje oblike API-ja Responses (`maskResponsesOutput` — zajema
  `output_text` in `output[].content[].text`). Če pride do kakršnega koli redigiranja,
  spremenjeni odgovor nadomesti izvirnega.

Zaščitni mehanizem nikoli ne blokira; samo doda opombe (`meta.detections`,
`meta.redacted`) ali prepiše vsebino.

#### Izbira po vrsti, vzorci po meri in števci zaznav

**Nadzorna plošča → Nastavitve → Varnost → Maskiranje osebno določljivih podatkov** določa, _kaj_ se maskira. S tem
se maskiranje ne vklopi: še vedno ga določata `PII_REDACTION_ENABLED` (zahteva) in
`PII_RESPONSE_SANITIZATION` (odgovor + SSE), ki sta privzeto izklopljena.

- **Izbira po vrsti** — vgrajeni ID-ji so navedeni v
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Nenastavljena vrednost pomeni vse
  vrste (vedenje pred uvedbo te nastavitve). Vzorec `ssn_us` mehanizma za zahteve
  se preslika v `ssn`. Predloge (Minimal, Standard, Financial,
  Brazilian, USA, Full) samo izpolnijo potrditvena polja v uporabniškem vmesniku.
- **Vzorci po meri** — do 20 regularnih izrazov ali vzorcev z nadomestnimi znaki (`*` = do 64
  nepreslednih znakov, `?` = en znak). Ujemanja postanejo `[CUSTOM_REDACTED]`.
  Vsak vzorec obravnava `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): največ 500 znakov, zastavice so omejene
  na `g i m s u`, vzorec se mora prevesti, prestati mora preverjanje `safe-regex` (katastrofalno
  vračanje) ter se ne sme ujemati s praznim nizom ali označbo mesta redigiranja.
  Vzorec, ki preverjanja ne prestane, je zavrnjen ob shranjevanju in preizkušanju,
  shranjena vrstica, ki preverjanja ne prestane, pa je med izvajanjem preskočena, namesto
  da bi se prevedla. Vzorci po meri se izvajajo samo, ko je maskiranje vklopljeno.
- **Števci zaznav** — število po vrstah (nikoli ujemajoče se vrednosti), shranjeno v
  pomnilniku in ponastavljeno ob ponovnem zagonu (`src/lib/pii/piiDetectionStats.ts`). Povečuje
  se samo, ko je maskiranje vklopljeno.

Nastavitve so shranjene v tabeli `key_value` (imenski prostor `pii_settings`,
`src/lib/db/piiSettings.ts`) in se berejo prek predpomnilnika z veljavnostjo 1 s. API:

| Metoda | Pot                      | Namen                                                                         |
| ------ | ------------------------ | ----------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Stanje zastavic, `enabledTypes`, `customPatterns`, števci zaznav              |
| `PUT`  | `/api/settings/pii`      | Zamenja `enabledTypes` (`null` = vse) in/ali `customPatterns`                 |
| `POST` | `/api/settings/pii/test` | Poskusni zagon enega vzorca na vzorcu velikosti največ 8 KB; nič se ne shrani |

Vse tri zahtevajo skrbniško preverjanje pristnosti in telo preverijo z Zod
(`src/shared/validation/schemas/piiSettings.ts`).

### Vrinjanje pozivov (`promptInjection.ts`)

Zazna nasprotniške strukture v vsebini, ki jo posreduje uporabnik, in uveljavi
nastavljeni pravilnik. Vedenje določajo spremenljivke okolja in možnosti konstruktorja:

| Nastavitev      | Spremenljivka okolja                                                                                     | Privzeto | Učinek                                                                                                                                                                                                               |
| --------------- | -------------------------------------------------------------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Omogočeno       | `INPUT_SANITIZER_ENABLED`                                                                                | `true`   | Ko je vrednost `false`, se varovalo predčasno zaključi.                                                                                                                                                              |
| Način           | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                          | `warn`   | Pravilnik za vrivanje: `block`, `warn` ali `log`. (`redact` je sprejet zaradi združljivosti za nazaj, vendar **ne** odstrani besedila vrivanja; prepis osebnih podatkov v zahtevi upravlja `PII_REDACTION_ENABLED`.) |
| Prag blokiranja | Možnost `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (vzdevek `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`   | Najnižja stopnja resnosti, potrebna za blokiranje. Pri privzeti nastavitvi je srednja stopnja namenjena samo opazovanju.                                                                                             |

**Prednostni vrstni red načina** (`getMode`): klicateljev `options.mode` →
**preglasitev z zastavico funkcije v zbirki podatkov** za `INJECTION_GUARD_MODE` (Nadzorna plošča → Nastavitve →
Zastavice funkcij) → spremenljivka okolja `INJECTION_GUARD_MODE` → spremenljivka okolja `INPUT_SANITIZER_MODE` →
`warn`. Preglasitev na nadzorni plošči ima zato prednost pred spremenljivkami okolja, tako da uporabniški vmesnik za zastavice funkcij sproti upravlja delujoče varovalo (brez ponovnega zagona). Branje iz zbirke podatkov je varno ob napaki:
če pride do napake, varovalo uporabi vedenje na podlagi spremenljivk okolja; kadar
preglasitev ni nastavljena, pa je vedenje enako razreševanju samo na podlagi spremenljivk okolja.

Viri zaznavanja:

1. `sanitizeRequest()` iz `@/shared/utils/inputSanitizer` (skupni nabor
   detektorjev, ki se uporablja drugje v cevovodu).
2. Vgrajeni `DEFAULT_GUARD_PATTERNS` (trenutno `system_override_inline` in
   `markdown_system_block`, oba z resnostjo `high`).
3. Izbirni `customPatterns`, posredovani prek možnosti konstruktorja (nizi, regularni izrazi
   ali zapisi `{ name, pattern, severity }`).

Ko velja `mode === "block"` **in** vsaj eno zaznavanje doseže prag resnosti,
`preCall` vrne `{ block: true, message: "Request rejected:
suspicious content detected" }`. V načinih `warn`/`log` varovalo dogodek zabeleži, vendar
dovoli klic. Izvožen je tudi skupni pomožni pripomoček `evaluatePromptInjection()`
za klicatelje, ki morajo ovrednotiti pozive, ne da bi uporabili register.

**Omejitev pregledovanja (v3.8.20):** detektor pregleda samo **prvih 16 KB**
združenega besedila poziva — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bajtov) v
`src/shared/utils/inputSanitizer.ts`. Tako `detectInjection()` kot
`evaluatePromptInjection()` pred izvajanjem zanke vzorcev uporabita
`slice(0, MAX_INJECTION_SCAN_BYTES)`. Direktive za vrivanje so blizu začetka vnosa, zato to
omeji porabo CPE in zbiranja smeti zaradi regularnih izrazov pri več sto KB velikih koristnih vsebinah, ne da bi oslabilo zaznavanje (prim.
#3932, #4041).

### Maskirnik poverilnic (`credentialMasker.ts`)

Izvaja se v **obeh** fazah, zadnji v privzeti verigi (prednost `95`). Redigira
dobro znane vzorce ključev API/skrivnih žetonov iz odhodne koristne vsebine (vsebine
sporočil, argumentov klicev orodij in rezultatov orodij) **in** odgovora ponudnika, tako da
poverilnica, prilepljena v poziv (ali vrnjena v rezultatu orodja), ne uhaja
ponudniku v zaledju ali nazaj odjemalcu.

- **Samo z izrecno privolitvijo**, po istem dogovoru kot redigiranje osebnih podatkov (v bližini strogega pravila št. 20):
  onemogočeno, razen če velja `settings.credentialRedactionEnabled === true` **ali**
  `CREDENTIAL_REDACTION_ENABLED=true`. Ko je izklopljeno, varovalo ne naredi ničesar —
  nikoli ne blokira in nikoli ne prepisuje.
- `redactCredentials()` prehodi celotno drevo koristne vsebine/odgovora (`walkValue()`,
  varno pred onesnaževanjem prototipa in cikli zaradi `WeakSet`) ter ujemanja nadomesti z
  označbo `[REDACTED:<type>]`, pri čemer klonira samo veje, ki so se dejansko
  spremenile.
- `CREDENTIAL_PATTERNS` zajema ključe ponudnikov LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), žetone VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), plačilne ključe (Stripe, Square), ključe
  v oblaku (dostopni ključ AWS, Twilio, SendGrid, Mailgun), zasebne ključe/JWT-je,
  povezovalne nize, ki vsebujejo poverilnice (`mongodb://user:pass@...` itd.), in
  splošni vzorec vrednosti glave `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Ključi v obliki glav (`authorization`, `x-api-key`, `api-key`,
  `apikey`) se redigirajo strukturno (samo vrednost, predpona sheme, kot je
  `Bearer `/`Basic `, se ohrani), namesto prek splošnega besedilnega regularnega izraza.
- Varovalo nikoli ne blokira; samo prepisuje (`modifiedPayload` /
  `modifiedResponse`) in dodaja opombe (`meta.credentialsRedacted`, `meta.count`).

Varovalo pred regresijami: `tests/unit/credential-masker-guardrail.test.ts`.

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
  block?: boolean; // vrednost true prekine verigo
  message?: string; // prikazano ob blokiranju
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // vrne preCall za preoblikovanje zahteve
  modifiedResponse?: TValue; // vrne postCall za preoblikovanje odgovora
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

Varovalo sporoči »brez spremembe« tako, da vrne `void`, `{}` ali
`{ block: false }`. Vrnitev `modifiedPayload`/`modifiedResponse` zamenja
vrednost, ki teče skozi verigo do naslednjih varoval.
`signal?: AbortSignal` posreduje življenjski cikel klicatelja varovalom. Prekinitev zahteve je namerna izjema s pristopom »fail-open«: predstavnostni mostovi ustavijo delo in počistijo vire, ne da bi obnovili neobdelano predstavnost za cilj, za katerega je znano, da je ne podpira.

## Register (`registry.ts`)

Edinec `guardrailRegistry` izpostavlja:

- `register(guardrail)` — doda varovalo (ali ga zamenja glede na normalizirano ime) in
  znova razvrsti varovala po naraščajoči vrednosti `priority`.
- `clear()` / `list()` — skrbniški pomožni funkciji.
- `runPreCallHooks(payload, context)` — gre skozi aktivna varovala, posreduje
  koristno vsebino prek `modifiedPayload` in se ustavi pri prvem `block: true`.
- `runPostCallHooks(response, context)` — enak potek na strani odgovora.
- `resetGuardrailsForTests({ registerDefaults })` — počisti stanje in po želji
  znova registrira privzete nastavitve za čisto izolacijo preizkusov.

Oba izvajalnika vrneta `{ blocked, payload|response, results, guardrail?, message? }`,
pri čemer je `results` polje zapisov `GuardrailExecutionResult`, ki vključujejo
polja `blocked`, `skipped`, `modified`, `error` in `meta` za vsako varovalo,
kar je uporabno za sledenje.

### Onemogočanje varoval za posamezno zahtevo

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` zbere
podvojenih vrednosti očiščen seznam imen varoval, ki jih je treba preskočiti za trenutno
zahtevo. Viri (vsi izbirni, vsi združeni):

- `apiKeyInfo.disabledGuardrails`
- `disabledGuardrails` v telesu zahteve (na najvišji ravni)
- `metadata.disabledGuardrails` v telesu zahteve
- Glava `x-omniroute-disabled-guardrails` (ali starejša
  `x-disabled-guardrails`)

Vrednosti so lahko polja nizov ali niz, ločen z vejicami; imena so
normalizirana v male črke in zapis kebab-case (`pii_masker` → `pii-masker`). Rezultat
se prek `context.disabledGuardrails` posreduje registru, ki preskoči
ujemajoča se varovala (`skipped: true` v `results`).

## Vrstni red izvajanja

Za vsako zahtevo, ki teče skozi `src/sse/handlers/chat.ts` in
`open-sse/handlers/chatCore.ts`:

1. `resolveDisabledGuardrails(...)` sestavi seznam za preskok na podlagi ključa API, telesa
   in glav.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` izvede varovalne mehanizme po naraščajočem
   vrstnem redu prioritete:
   - Onemogočeni varovalni mehanizmi so zabeleženi kot `skipped`.
   - `preCall` vsakega varovalnega mehanizma lahko prepiše koristno vsebino prek `modifiedPayload`.
   - Prvi `block: true` prekine verigo, obravnavalnik pa vrne
     odgovor o zavrnitvi s strani varovalnega mehanizma.
3. (Morebiti prepisana) koristna vsebina se posreduje kombiniranemu usmerjanju in
   pošiljanju nadrejenemu ponudniku.
4. Ko je odgovor sestavljen, `guardrailRegistry.runPostCallHooks(...)`
   izvede isto verigo nad odgovorom. `block: true` na tej točki zavrže odgovor
   nadrejenega ponudnika.

Varovalni mehanizmi, ki sprožijo izjemo, so zabeleženi z `error: <message>` in zapisani v dnevnik prek
`logger.warn`, vendar se veriga nadaljuje — zasnovano po načelu odprtega odpovedovanja.

## Konfiguracija

Spremenljivke okolja, ki jih berejo vgrajeni varovalni mehanizmi:

| Spremenljivka                         | Uporablja jo                 | Učinek                                                                                                                       |
| ------------------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`           | Nastavite na `false`, da zaznavanje v celoti onemogočite.                                                                    |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`           | Pravilnik za vrivanje: `warn`, `block` ali `log`. Podedovana vrednost `redact` ne prepisuje vrinjenega besedila.             |
| `INJECTION_GUARD_MODE`                | `prompt-injection`           | Način za zaščito pred vrivanjem; tudi zastavica funkcije v zbirki podatkov, ki **preglasi** spremenljivke okolja (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`           | Najnižja stopnja resnosti, ki jo `MODE=block` zavrne: `high` (privzeto), `medium` ali `low`.                                 |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`           | Podedovan vzdevek za `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                      |
| `PII_REDACTION_ENABLED`               | `pii-masker`                 | Ko je nastavljeno na `true`, se podatki PII v zahtevi zakrijejo (neodvisno od načina vrivanja).                              |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (nadaljnji tok) | Nadzira vedenje prikrivanja na strani odgovora.                                                                              |

Varovalni mehanizmi Modality Bridge berejo izvajalno konfiguracijo iz shrambe
nastavitev, podprte z zbirko podatkov (`getSettings()`), in ne iz spremenljivk okolja. Primarni ključi za slikovni način so
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` in
`modalityBridgeCacheMaxEntries`. Podedovani ključi
`visionBridge*` so sprejeti samo kot dokumentiran nadomestni način branja za en cikel;
zapisi nadzorne plošče uporabljajo primarne ključe. Privzete vrednosti in razreševalnik nadomestnih vrednosti
so v `src/shared/constants/modalityBridgeDefaults.ts`, podedovane
konstante pa so ohranjene v `src/shared/constants/visionBridgeDefaults.ts`.

Zvok uporablja `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` in `modalityBridgeAudioMaxClips` ter skupne
nastavitve `modalityBridgeCache*`. Zvok nima nadomestnega branja podedovanih ključev, ker so bili ti
ključi uvedeni s shemo Modality Bridge.

Video uporablja `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` in
`modalityBridgeVideoTimeout` ter skupne nastavitve `modalityBridgeCache*`.
Privzeto je onemogočen, ker sta FFmpeg/ffprobe izbirni operativni
odvisnosti, opisovanje sličic pa poveča zakasnitev in stroške modela.

## Zaščitni mehanizmi po meri

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
3. Registrirajte ga bodisi ob uvozu (dodajte ga iz `registerDefaultGuardrails`) bodisi
   med izvajanjem pokličite `guardrailRegistry.register(...)` — register zamenja
   vsak predhodni zaščitni mehanizem z enakim normaliziranim imenom.
4. Dodajte teste v `tests/unit/` (obstoječi primeri:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testiranje

Med testi uporabite `resetGuardrailsForTests()`, da začnete iz znanega stanja.
Posredujte `{ registerDefaults: false }`, da začnete s praznim registrom in
registrirate samo zaščitne mehanizme, ki jih testirate. Vision Bridge podpira vstavljanje
odvisnosti (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge ponuja
enakovredne priključne točke za nastavitve, zmogljivosti, izbiro modela STT, preverjanje
poverilnic in prepisovanje. Testi lahko zato preverjajo oba poteka brez dostopa do
podatkovne zbirke ali omrežja.

## Glejte tudi

- `src/lib/guardrails/` — implementacija
- `src/shared/utils/inputSanitizer.ts` — skupni detektor, ki omogoča
  zaznavanje vbrizgavanja pozivov in maskiranje osebno določljivih podatkov
- `src/shared/constants/visionBridgeDefaults.ts` — privzete nastavitve Vision Bridge in
  seznam modelov s prisilno uporabo mostu
- `src/shared/constants/modalityBridgeDefaults.ts` — skupne privzete nastavitve izvajalnega okolja Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — neodvisna plast (varovalka, obdobja mirovanja)
- `docs/reference/ENVIRONMENT.md` — celoten pregled spremenljivk okolja

## Pokritost poti z zaščito pred vbrizgavanjem in red-team testiranje (8. faza · sklop D)

Zaščita pred vbrizgavanjem (`createInjectionGuard` / `withInjectionGuard`) pokriva vse poti,
ki sprejemajo uporabniške pozive. Upošteva `INJECTION_GUARD_MODE` (privzeto `warn` = samo beleženje;
`block` = vrne HTTP 400 `SECURITY_001`).

| Vrsta                | Poti                                                                                                                                                 | Privzeti način |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| Besedilo (obstoječe) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn           |
| Generativno          | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn           |
| Podatki              | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn           |

Izločanje besedila (`extractMessageContents`) pokriva `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team testiranje (vsako noč, `nightly-llm-security.yml`):** promptfoo preverja, ali vsaka pot blokira
korpus OWASP-LLM v načinu `INJECTION_GUARD_MODE=block`; garak izvaja sonde (brez skrivnosti se preskoči).
Pot `moderations` je vključena zaradi doslednosti — upravljavci jo lahko v načinu blokiranja izvzamejo prek
`resolveDisabledGuardrails`.

Nočni delovni tok (`.github/workflows/nightly-llm-security.yml`, cron + ročni
zagon) ima dve opravili:

- **`promptfoo-guard` (blokirajoče)** — izvede `promptfoo eval -c promptfooconfig.yaml`
  z `INJECTION_GUARD_MODE=block`. Vsak nasprotniški primer (npr. »prezri vsa
  prejšnja navodila …«, poskusi pobega iz omejitev v slogu DAN) preveri, ali odgovor vsebuje
  `error.code === "SECURITY_001"`, tj. ali je zaščita dejansko zavrnila zahtevo.
- **`garak` (svetovalno)** — izvede garak `--probes promptinject,dan,leakreplay`
  proti lokalnemu primerku OmniRoute (`http://localhost:20128/v1`). Pogojeno je s
  skrivnostjo ponudnika (`PROMPTFOO_PROVIDER_KEY`); brez nje se elegantno preskoči, ukaz pa ima pripono
  `|| true`, zato poroča, ne da bi povzročil neuspeh CI.

Pokritost pomožne funkcije zaščite (`createInjectionGuard` / `withInjectionGuard`)
obsega vse poti `/v1`, ki sprejemajo pozive; besedilo poziva se pridobi iz
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` s funkcijo
`extractMessageContents()` v `src/shared/utils/inputSanitizer.ts`.
