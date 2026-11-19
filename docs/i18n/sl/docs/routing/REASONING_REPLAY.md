# REASONING_REPLAY (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Vir resnice:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`** Zadnja posodobitev:** 2026-06-28 — v3.8.40

OmniRoute zajame pomočnika `reasoning_content` ki ga ustvarijo modeli načina razmišljanja, in ga pregledno predvaja na zahtevah z več obrati, ko to zahteva ponudnik navzgor. To odpravlja napake HTTP 400, ki jih sprožijo strogi ponudniki, ko v zgodovini odjemalčevih pogovorov manjka obrazložitev predhodnega obrata.

## Zakaj to obstaja

Več ponudnikov načina razmišljanja zavrne nadaljnji obrat, razen če** prejšnje sporočilo pomočnika vključuje originalni `reasoning_content`** . Navzgor vrne 400 s sporočili, kot so:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

Toda tipični odjemalci (Cursor, Cline, Roo Code, OpenAI SDK) odstranijo `reasoning_content` iz zgodovine, ki jo predvajajo. OmniRoute ga obnovi iz predpomnilnika na strani strežnika, tako da je zahteva, ki jo vidi navzgor, dosledna. Izdaja št. #1628 je predstavila hibridno obstojnost memory/SQLite, tako da predpomnilnik preživi ponovne zagone procesa.

## Arhitektura

```
Turn N (assistant generates):
  → response contains reasoning_content + tool_calls
  → if requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      writes (memory + DB), one entry per tool_call.id within the request scope
  → forward response to client (which may or may not retain reasoning)

Turn N+1 (client sends follow-up):
  → translator detects: requiresReasoningReplay(provider, model) === true
  → for each assistant message with tool_calls and no reasoning_content:
      lookupReasoning(buildToolCallCacheKey(scope, toolCalls[0].id)) → memory → DB
      hit  → msg.reasoning_content = cached; recordReplay()
      miss → msg.reasoning_content = "" (legacy fallback for older DeepSeek)
  → upstream sees consistent history → no 400
```

Zajem poteka v `open-sse/handlers/chatCore.ts` (dve mesti, na dveh klicnih mestih `cacheReasoningFromAssistantMessage` ). Ponovno predvajanje se zgodi v `open-sse/translator/index.ts` po prisili sheme, vendar pred pošiljanjem.

Vnosi klica orodja so shranjeni pod `buildToolCallCacheKey()`, povzetkom obsega zahteve in ID-ja klica orodja, tako da isti ID, ki ga uporablja drug ključ API ali seja, ne izbere vnosa. Obseg izvira iz `buildReasoningCacheScope()`: ID ključa API in ključ seje, če ga ima zahteva. Stolpec `tool_call_id` in nadzorna plošča torej prikazujeta ta izvleček za te vnose.

Navadni (brez klica orodja) zavoji pomočnika so vneseni drugače: `buildAssistantMessageCacheKey()` prebavi obseg seje in normaliziran prepis v formatu OpenAI do tega zavoja, ker DeepSeek zahteva obrazložitev _vsakega_ prejšnjega zavoja, ko je `tools` prisoten. Za cilje Responses-API (na primer `opencode-go/deepseek-v4-flash`, usmerjen v `/responses`) telo navzgor nosi `input`, ne `messages`, tako da `translateRequest()` (`open-sse/translator/index.ts`) poroča o vrtilnem prepisu, ki ga je prebavil prek možnosti povratnega klica, in mesta za zajemanje prebavijo ta isti prepis. Prepustnica za predvajanje odgovorov se izvaja na vrtišču OpenAI za vsako izvorno obliko, tako da se ponovno predvajajo tudi odjemalci sporočil Anthropic (odzivi Claude → OpenAI → ).

## Hibridni pomnilnik — + SQLite

Vroča pot uporablja `Map` v pomnilniku (LRU-by-creation), podprt s tabelo SQLite za obnovitev po zrušitvi in vidnost nadzorne plošče.

| Plast  | Izvedba                                        | Namen                                            |
| ------ | ---------------------------------------------- | ------------------------------------------------ |
| Spomin | `Map` in `open-sse/services/reasoningCache.ts` | Hitro iskanje, izselitev najstarejšega pri 200   |
| DB     | tabela `reasoning_cache` (`src/lib/db/`)       | Vztraja med ponovnimi zagoni, poganja statistiko |

Zapisi gredo obema. Branja se najprej posvetujejo s pomnilnikom, nato pa se vrnejo na DB (zadetki DB se pomaknejo nazaj v pomnilnik). DB napake niso usodne — predpomnilnik v pomnilniku še naprej služi vroči poti.

**Privzete nastavitve:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Največ vnosov v pomnilnik: `200` (`MAX_MEMORY_ENTRIES`)
- Izselitev: najprej najstarejši `createdAt`

## Shema baze podatkov

Selitev: `src/lib/db/migrations/033_create_reasoning_cache.sql`

```sql
CREATE TABLE IF NOT EXISTS reasoning_cache (
  tool_call_id   TEXT PRIMARY KEY,
  provider       TEXT NOT NULL,
  model          TEXT NOT NULL,
  reasoning      TEXT NOT NULL,
  char_count     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at     INTEGER NOT NULL
);
```

Indeksi: `expires_at`, `provider`, `model`, `created_at`. `expires_at` je shranjen kot sekunde epohe Unix; plast SELECT normalizira podedovane besedilne vrednosti prek `EXPIRES_AT_EPOCH_SQL`.

## Odkrivanje ponudnika/modela

Ponovno predvajanje je omogočeno, ko `requiresReasoningReplay(provider, model)` vrne `true`. Funkcija preveri dva seznama v `open-sse/services/reasoningCache.ts`.

**Ponudnik IDs (natančno ujemanje, ne razlikuje med velikimi in malimi črkami):**

- `deepseek`
- `opencode-go`
- `siliconflow`
- `nebius`
- `deepinfra`
- `sambanova`
- `fireworks`
- `together`
- `kimi-coding`
- `kimi-coding-apikey`
- `xiaomi-mimo`

**Modelni vzorci regularnih izrazov (neobčutljivi na velike in male črke):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` in `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, izbirna pripona `-free` )
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Dodajanje novega strogega provider/model pomeni dodajanje na enega od teh seznamov in pisanje testa enote, ki uveljavlja vstavljanje ponovitve. Opis PR mora navajati natančen niz 400 navzgor, ki je motiviral spremembo.

## REST API

Predpomnilnik izpostavi dve končni točki pod `src/app/api/cache/reasoning/route.ts`. Oba zahtevata avtentikacijo upravljanja (`isAuthenticated` iz `@/shared/utils/apiAuth`).

| Metoda | Končna točka                                              | Opis                                                          |
| ------ | --------------------------------------------------------- | ------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Stats + paginirani vnosi                                      |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Filtriran seznam (`limit` pripet na `[1, 200]`)               |
| DELETE | `/api/cache/reasoning`                                    | Počistite vse (pomnilnik + DB) in ponastavite štetje hit/miss |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Počisti samo vnose za enega ponudnika                         |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Izbrišite en vnos                                             |

**oblika odgovora GET :**

```json
{
  "stats": {
    "memoryEntries": 12,
    "dbEntries": 47,
    "totalEntries": 47,
    "totalChars": 138291,
    "hits": 84,
    "misses": 6,
    "replays": 81,
    "replayRate": "90.0%",
    "byProvider": { "deepseek": { "entries": 32, "chars": 98412 } },
    "byModel": { "deepseek-reasoner": { "entries": 32, "chars": 98412 } },
    "oldestEntry": "2026-05-13T10:00:00.000Z",
    "newestEntry": "2026-05-13T11:42:11.000Z"
  },
  "entries": [
    {
      "toolCallId": "call_abc",
      "provider": "deepseek",
      "model": "deepseek-reasoner",
      "reasoning": "...",
      "charCount": 3128,
      "createdAt": "...",
      "expiresAt": "..."
    }
  ]
}
```

## Operativne opombe

- **Čiščenje:** `cleanupReasoningCache()` očisti potekle vnose v pomnilnik in zažene `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Delavci zdravstvenega pregleda to občasno kličejo.
- **Obnovitev po zrušitvi:** Po ponovnem zagonu je pomnilnik prazen, vendar DB še vedno vsebuje nepotečene vnose. Prvo iskanje za dani `tool_call_id` je zadetek DB ; nadaljnja iskanja so spominski zadetki.
- **Brez obrazložitve, brez predpomnilnika:** `cacheReasoningFromAssistantMessage` vrne `0`, ko sporočilo pomočnika nima polja `reasoning_content` / `reasoning`, tako da odgovori brez razmišljanja ne stanejo nič.
- **Tudi pisanje je zaprto:** obe klicni mesti v `chatCore.ts` (nepretočno in pretočno) kličeta samo `cacheReasoningFromAssistantMessage()`, ko je `requiresReasoningReplay(provider, model)` `true` — isti predikat preverja stran za branje. Namestitve, ki se nikoli ne dotaknejo ponudnika ponovnega predvajanja, nehajo plačevati za pisanje, posodobitev indeksa in try/catch za vsak razumni odgovor.
- **Nestriktni ponudniki:** Ko je `requiresReasoningReplay` `false` in je ciljni format OpenAI, prevajalnik** trakovi** katero koli polje `reasoning_content` iz odhodnih sporočil — OpenAI Dokončanje klepeta ga ne sprejme.

## Muse Opaque-Reasoning Lastništvo

Muse (`muse-code`) vrne neprozorno razmišljanje, vezano na klicatelja (`encrypted_content`). Ponovno predvajanje pod drugim računom ali ponovno nastavljenimi poverilnicami ne uspe navzgor, tako da izvorne zahteve OAuth uporabljajo lastništvo na ravni seje namesto rotacije na zahtevo (`src/sse/services/museSessionOwnership.ts`, vsiljeno v `src/sse/handlers/chat.ts`). Eksplicitno izbrane povezave s ključem API in konfiguracije samo s ključem API ohranijo svoje obstoječe usmerjanje brez tega načina lastništva.

- Zagotovite stabilno sejo ID na vsakem koraku: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id` ali `x-codex-session-id`; alternativno uporabite `prompt_cache_key`, `session_id`, `conversation_id` ali `metadata.session_id` v telesu (v tem prednostnem vrstnem redu). Manjkajoči ali prazen IDs vrne 400, ko sta aktivna dva ali več domačih računov OAuth ; z enim samim računom OAuth ni ničesar za rotacijo, zato takšna zahteva ohranja nepripeto usmerjanje. Obseg vključuje klicateljev OmniRoute API-ključ ID.
- Sveže neodvisne seje krožijo po aktivnih domačih računih OAuth ki jih dovoljuje pravilnik o povezovanju ključa API, razvrščenih po povezavi ID. Round-robin preskoči račune v času ohlajanja povezave, s statusom terminala (`banned`, `expired`, `credits_exhausted`) ali zaklenjen model za zahtevani model; Napake Muse navzgor beležijo ohlajanje in stanje prekinitve kot drugi ponudniki. Eksplicitno vsiljena povezava zaobide kroženje za novo sejo, vendar ne more preglasiti obstoječega lastnika.
- Dokler lastnik ne posreduje uspešnega odgovora, se seja, katere lastnik je postal nedosegljiv, ponovno zahteva na zdravem računu. Po prvem uspešnem odgovoru ostane seja pripeta na tega lastnika, dokler ni nedejavna 30 dni (`MUSE_SESSION_IDLE_TTL_MS`).
- Vsako nadaljevanje in obračanje rezultata orodja ostane pripeto na lastnika seje: povezava, identiteta računa in generiranje sklepanja poverilnic, ki se znova preverijo pred poskusi navzgor, vključno s ponovnimi poskusi osvežitve poverilnic. Za to sejo in generiranje morajo biti zabeleženi referenčni klici odzivov IDs/item in klic orodja za dokončanje klepeta IDs.
- Zapisi SQLite `key_value` v imenskem prostoru `muse_session_ownership` (`src/lib/db/museSessionOwnership.ts`) ohranijo lastništvo in rotacijski kazalec med ponovnimi zagoni. Vsak zahtevek in postrežen odgovor osveži žig dejavnosti seje; seja v mirovanju, ki je daljša od `MUSE_SESSION_IDLE_TTL_MS` je odrezana (pin lastnika, servirana zastavica in posneti zgoščeni podatki opaque/reference ), največ enkrat vsakih 10 minut in v omejenih sklopih, tako da poznejše ponovitev njene zgodovine ne uspe zapreti kot neznani lastnik. Zapisi vsebujejo povezavo IDs in zgoščene vrednosti identitete računa, poverilnice, neprozorno vsebino in reference nadaljevanja, ne pa skrivnosti ali zgodovine pogovorov. Stranke morajo hraniti in pošiljati svojo celotno zgodovino in nepregledno obrazložitev.
- Neznano ali tuje neprozorno sklepanje, manjkajoči lastnik, nedosegljiv račun lastnika ali sprememba generacije z zabeleženo zgodovino se ne zapre z eksplicitnim 4xx/503 — nikoli tihim preklopom med računi po napaki in nikoli izpuščenim razlogom.
- Prenovljeni ključ istega računa se sprejme le, če seja ni zabeležila zgodovine, ki bi jo bilo mogoče ponovno predvajati; posnete seje se neuspešno zaprejo, dokler se ne začnejo znova.
- Prazen odziv navzgor (`upstream_empty_response` / `empty_response`, nič oddanega klicatelju) se največ dvakrat ponovi pri istem lastniku, po 0,5 s in nato 1,5 s (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). Če so vsi poskusi prazni, se prvotni 502 vrne brez ohlajanja ali označevanja prekinitve, tako da nezadostni odgovor nikoli ne zaklene lastnika.
- Vse zahteve `muse-code` obidejo branje in pisanje semantičnega predpomnilnika, vključno s pretočnim pisanjem, zato predpomnjeni neprozorni izhod ne more pridobiti drugega lastnika seje.

Regresijska varovala: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts` in `tests/unit/chatcore-semantic-cache.test.ts`.

## Glej tudi

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — odklopniki, ohladitve, izklopi modelov
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — diagnosticiranje upstream 400s
- Vir: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Selitev: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- pot API : `src/app/api/cache/reasoning/route.ts`
- Izvirna številka: #1628
