# Reasoning Routing (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_ROUTING.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_ROUTING.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_ROUTING.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_ROUTING.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_ROUTING.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_ROUTING.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_ROUTING.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_ROUTING.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_ROUTING.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_ROUTING.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_ROUTING.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_ROUTING.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_ROUTING.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_ROUTING.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_ROUTING.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_ROUTING.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_ROUTING.md)

---

A következtetési útválasztási szabályok kibővítik a meglévő modell- és kombinációalapú útválasztást. Ha egyetlen aktív szabály sem illeszkedik,
a meglévő gondolkodási, utótag-, alapértelmezett kapcsolat- és szolgáltatói fordítási viselkedés
változatlan marad.

## Kezelés

A szabályok kezelése a **Beállítások → Globális útválasztás** alatt érhető el. Az API-kulcs szerkesztője
ugyanezt a kezelőfelületet biztosítja, a kiválasztott kulcsra szűrve.

A kezelési API a következő útvonalakon érhető el:

- `GET` és `POST` a `/api/settings/reasoning-routing-rules` útvonalon
- `GET`, `PATCH` és `DELETE` a `/api/settings/reasoning-routing-rules/[id]` útvonalon
- `POST` a `/api/settings/reasoning-routing-rules/simulate` útvonalon

Minden útvonal a `requireManagementAuth` használatával működik. A bemenetek ellenőrzése a
`src/shared/validation/schemas/reasoningRouting.ts` fájlban található sémákkal történik. A szimulátor soha nem kezdeményez upstream hívást.

## Szabályfeloldás

A korai kiértékelés pontosan egy szabályt választ ki. A hatókörök ellenőrzése a következő sorrendben történik:

1. `apiKey`
2. `combo`
3. `model`
4. `global`

Egy hatókörön belül először a magasabb `priority` érték nyer, ezt követi a pontos modellegyezés a glob mintával szemben,
majd a stabil `createdAt` és `id` szerinti sorrend. A `requestTags` kizárólag a `metadata.tags`
mezőből származik, és támogatja az `any` vagy `all` szerinti egyezést.

Egy `connection` szabály csak akkor kerül kiértékelésre, ha egyetlen korai szabály sem nyert, és már
kiválasztásra került egy konkrét szolgáltatói kapcsolat. Ez csak az erőfeszítést és a keretet módosíthatja.

## Erőfeszítés és költségvetés

`sourceEffort` elfogadja `any`, `missing`, `none`, `low`, `medium`, `high`, `xhigh`, `max` és `ultra`. `missing` azt jelenti, hogy a kérés nem tartalmaz sem diszkrét erőfeszítést, sem gondolkodási kapcsolót vagy gondolkodási költségvetést. A csak költségvetési jelet ezért csak `any` egyezik meg.

`effortMode` három változata van:

- `inherit` megtartja az ügyfél erőfeszítéseit, miközben lehetővé teszi a modell vagy a kombináció változását.
- `default` csak akkor állítja be `targetEffort`, ha nincs jelen kifejezett érvelési jel.
- `force` a diszkrét erőfeszítést `targetEffort` re cseréli.

`budgetAction` egymástól függetlenül lehet `preserve`, `remove` vagy `set`. `force` `none` fel eltávolítja az összes felismert ráfordítási és költségvetési mezőt, majd beállítja `reasoning_effort: "none"`, mert egyes szolgáltatók bekapcsolják a gondolkodást, ha a mező nincs jelen. A szó szerinti `none` elutasító szolgáltatók kiszállításkor `open-sse/executors/base/reasoningEffort.ts` ban vannak módosítva. A parancskód leképezi `low`-re, kivéve a Válasz alakú kéréseket (`input` `messages` nélkül), ahol megtartja `none`. Cloudflare Workers AI (`cloudflare-ai`) esetén a `none` t elutasító modellek (gpt-oss, qwen3.8, nemotron-3, glm-4.7-flash) `low` kapnak; más dolgozók AI modellek megtartják `none`. A mező eldobása itt nem lehetséges, mert egy hiányzó erőfeszítés a modell alapértelmezett szintjét futtatja. `none` `set` szel együtt érvénytelen.

Az ismert inkompatibilis modelleket célzó kérések a felfelé irányuló hívás előtt elutasításra kerülnek. Kombinált célok esetén az inkompatibilis bejegyzések törlődnek; ha egyik sem marad, a kérés `400` állapotot ad vissza. Az ismeretlen képességadatok figyelmeztetést adnak, és aktívan hagyják a szabályt.

## Biztonság és átviteli módok

A forrás- és célmodellre, illetve a forrás- és célkombinációra továbbra is a meglévő API-kulcsra vonatkozó
szabályzat érvényes. Egy következtetési szabály soha nem bővíti a modell-, kombináció- vagy kvótaengedélyeket.

A motor integrálva van a Chat Completions, Responses, Anthropic Messages és a belső
Codex WebSocket útvonalba. A WebSocket útvonal kizárólag Codex célmodelleket fogad el; kombinációs célok
ott nem hajthatók végre. A szabály döntése titkos adatok nélkül kerül tárolásra a meglévő útvonal-nyomkövetésben.

## Adatmegőrzés

A `src/lib/db/migrations/126_reasoning_routing_rules.sql` migráció létrehozza a
`reasoning_routing_rules` táblát. A szabályok tárolt API-kulcsokra, kombinációkra és szolgáltatói kapcsolatokra hivatkoznak.
A törlések megtisztítják a kapcsolódó szabályokat. A
`src/lib/db/reasoningRoutingRules.ts` adatbázis-hozzáférési réteg érvényteleníthető gyorsítótárat tart fenn a kérési útvonal számára.

A szabályok bekerülnek az SQLite biztonsági mentésekbe, a teljes adatbázis-exportba és a konfigurációszinkronizálási csomagba.
A `reconcileReasoningRulesForSync` letiltja azokat az importált szabályokat, amelyek hivatkozásai hiányoznak, és jelentést készít ezekről
az ütközésekről.
