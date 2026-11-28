# Egress IP Family Policy (IPv4/IPv6) (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇧🇦 [bs](../../../bs/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

> **Zet uitgaand verkeer vast op één IP-familie — `auto`, `ipv4` of `ipv6` — per proxy, zodat uitgaand verkeer dat uitsluitend via IPv6 hoort te lopen nooit ongemerkt terugvalt op IPv4.**

> **Bron van waarheid:** `open-sse/utils/proxyFamily.ts`, `open-sse/utils/proxyDispatcher.ts`, `open-sse/utils/proxyFetch.ts`, `open-sse/utils/socksConnectorWithFamily.ts`, `open-sse/utils/proxyFamilyResolve.ts`, `src/shared/validation/schemas.ts`, `src/lib/db/proxies.ts`, `src/lib/db/upstreamProxy.ts`, `src/lib/db/migrations/099_proxy_family.sql`

Met OmniRoute kan elke proxy een **adresfamilierichtlijn voor uitgaand verkeer** hebben. Standaard kiest het besturingssysteem IPv4 of IPv6 (dual-stack, "Happy Eyeballs"). Wanneer je de richtlijn instelt op `ipv4` of `ipv6`, zet OmniRoute elke verbinding via die proxy vast op de gekozen familie en **weigert de verbinding veilig** in plaats van terug te vallen op de andere familie.

Deze pagina beschrijft wat de richtlijn is, waarom deze bestaat, waar je deze configureert en hoe deze tijdens runtime wordt verwerkt.

---

## Inhoudsopgave

- [Wat het is](#what-it-is)
- [Waarom het bestaat](#why-it-exists)
- [De drie waarden](#the-three-values)
- [Configuratie](#how-to-configure-it)
- [Hoe `auto` wordt verwerkt](#how-auto-resolves)
- [Hoe `ipv4` / `ipv6` worden afgedwongen](#how-ipv4--ipv6-are-enforced)
- [SOCKS5-compatibiliteit](#socks5-compatibility)
- [Fail-closed-gedrag](#fail-closed-behavior)
- [Gegevensmodel](#data-model)
- [Gerelateerde documentatie](#related-documentation)

---

## Wat het is

Elke proxy in het register heeft een veld `family` met drie mogelijke waarden, gevalideerd door een Zod-enum:

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

De standaardwaarde van het veld is `"auto"`, waarmee het eerdere dual-stack-gedrag behouden blijft. Door het in te stellen op `ipv4` of `ipv6` wordt de verbindingsfamilie voor die proxy vastgezet.

De richtlijn wordt overal via één helper genormaliseerd, zodat elke onbekende waarde wordt teruggebracht tot `auto`:

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## Waarom het bestaat

Geïntroduceerd in PR [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777). De aanleiding bestond uit de volgende problemen:

| Probleem                                                                     | Wat de richtlijn oplost                                                                                                                                                                                                                                                                                                                                                                                                 |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Uitgaand verkeer dat uitsluitend via IPv6 hoort te lopen, lekt naar IPv4** | Wanneer een proxyhost zowel A- als AAAA-records heeft (of het besturingssysteem de voorkeur geeft aan IPv4), kan Happy Eyeballs via IPv4 een uitgaande verbinding maken, zelfs wanneer je uitsluitend een IPv6-pad wilt gebruiken. Vastzetten op `ipv6` voorkomt dat lek.                                                                                                                                               |
| **Intrekking wegens afwijkingen bij gedeeld uitgaand verkeer**               | Roterende providers (codex/openai) trekken tokens in wanneer veel accounts met een hoog volume via **hetzelfde** IP-adres uitgaand verkeer verzenden. Het beheren van de adresfamilie voor uitgaand verkeer helpt accounts op afzonderlijke, voorspelbare uitgaande paden te houden (zie [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts) voor de diagnostiek van uitgaande IP-adressen die hiermee samengaat). |
| **Deterministisch uitgaand verkeer voor compliance/tests**                   | Wanneer je moet garanderen dat verkeer via een specifieke familie naar buiten gaat, is `auto` niet voldoende.                                                                                                                                                                                                                                                                                                           |

De richtlijn is bewust **per proxy** en niet globaal — verschillende proxy's in je pool kunnen verschillende beleidsregels hebben.

---

## De drie waarden

| Waarde | UI label            | Gedrag                                                                                                                                                                                    |
| ------ | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto` | `Auto (dual-stack)` | OS kiest de familie. Voor een IP-letterlijke proxyhost is de familie intrinsiek aan het letterlijke; voor een hostnaam komen beide families in aanmerking. Dit is de standaardinstelling. |
| `ipv4` | `IPv4 only`         | Pint de verbinding met IPv4. Kan niet worden gesloten als de proxyhost geen IPv4 (A)-record heeft.                                                                                        |
| `ipv6` | `IPv6 only`         | Pint de verbinding met IPv6. Kan niet worden gesloten als de proxyhost geen IPv6 record (AAAA) heeft.                                                                                     |

UI -reeksen leven in `src/i18n/messages/en.json` (`labelFamily`, `familyAuto`, `familyIpv4`, `familyIpv6`, `familyHint`).

---

## Hoe het te configureren

### Dashboard

De selector heeft de proxyvorm van de** Proxypool** tabblad:

1. Open** Dashboard → Instellingen → Proxy → Proxypool**
2. Voeg een proxy toe of bewerk deze
3. Stel de**IP familie** vervolgkeuzelijst naar `Auto (dual-stack)`, `IPv4 only` of `IPv6 only`
4. Redden

De besturing wordt weergegeven door `ProxyRegistryManager.tsx` (gemonteerd in `proxy/ProxyPoolTab.tsx`).

### API

Het `family` veld maakt deel uit van de create/update payloads van het proxyregister, gevalideerd door `createProxyRegistrySchema` / `updateProxyRegistrySchema` (`src/shared/validation/schemas.ts`) en afgehandeld door `POST` / `PATCH /api/v1/management/proxies`:

```bash
# Create an IPv6-only proxy
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# Change an existing proxy to IPv4-only
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

Hetzelfde veld wordt ook geaccepteerd door het inline proxy-configuratieobject dat wordt gebruikt voor upstream-proxy-items (`upstream_proxy_config.family`, zie [Data Model](#data-model) ).

Voor de rest van de proxy CRUD/assignment API, zie [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md).

---

## Hoe `auto` Wordt Omgezet

Wanneer `family` is ingesteld op `auto`, voegt OmniRoute **geen** richtlijn toe — de proxy-URL wordt ongewijzigd gebruikt en de verbindingsfamilie wordt intrinsiek bepaald.

Tijdens het opbouwen van de URL (`proxyConfigToUrl` / `normalizeProxyUrl` in `open-sse/utils/proxyDispatcher.ts`) levert een `auto`-proxy een gewone URL zonder markering op:

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

Tijdens het doorsturen (`resolveDispatcherFamily`) wordt `auto` omgezet naar de intrinsieke familie van een IP-literalhost, of naar `null` (laat het besturingssysteem beslissen) voor een hostnaam:

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // null voor een hostnaam → besturingssysteem kiest
  // ...
}
```

Dus:

- `auto` + IP-literalhost (`192.0.2.1` / `[2001:db8::1]`) → familie van dat literal.
- `auto` + hostnaam → `null` → standaard dual-stack-resolutie van het besturingssysteem.

---

## Hoe `ipv4` / `ipv6` worden afgedwongen

Een niet-`auto`-instructie wordt als één synthetische querymarkering doorgegeven — `?family=ipv4` of `?family=ipv6` — die eenmaal aan de genormaliseerde proxy-URL wordt toegevoegd. `normalizeProxyUrl` verwijdert deze markering zorgvuldig en voegt deze exact eenmaal opnieuw toe, zodat de poortinterpretatie nooit wordt verstoord.

Wanneer de dispatcher wordt opgebouwd, wordt de markering gelezen en omgezet in een concrete verbindingsfamilie. Als de host een letterlijk IP-adres van de **tegenovergestelde** familie is, genereert OmniRoute een fout (bij een tegenstrijdigheid wordt uit veiligheidsoverwegingen geweigerd):

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Proxy family directive ${directive} contradicts ${literal === 6 ? "IPv6" : "IPv4"} literal host`
  );
}
```

De concrete familie wordt vervolgens op de connector vastgezet:

- **HTTP/HTTPS-proxy's** (`ProxyAgent`): `proxyTls: { family, autoSelectFamily: false }` — schakelt Happy Eyeballs uit, zodat uitsluitend verbinding wordt gemaakt via de gekozen familie.
- **SOCKS5-proxy's**: een aangepaste connector geeft `socket_options: { family, autoSelectFamily: false }` door aan de SOCKS-client (zie [SOCKS5-compatibiliteit](#socks5-compatibility)).

---

## SOCKS5-compatibiliteit

Het vastzetten van de familie werkt met SOCKS5-proxy's, maar de standaardversie van `fetch-socks` stelt de socketopties die nodig zijn om de familie van de proxysprong vast te zetten niet beschikbaar. OmniRoute bevat hiervoor een eigen connector:

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

Alle SOCKS5-dispatches verlopen via `createSocksDispatcherWithFamily`, ongeacht `family` (inclusief `null` / `auto` via een hostnaam): `buildSocksFamilySocketOptions(null)` levert `{}` op en hetzelfde pad via `SocksClient.createConnection` + TLS `buildConnector` wordt gebruikt, waarbij `socket_options` wordt vastgezet zodat Happy Eyeballs niet IPv4 kan kiezen voor een uitgaand beleid dat uitsluitend IPv6 toestaat.

SOCKS5-ondersteuning is standaard ingeschakeld (uitschakelen kan via `ENABLE_SOCKS5_PROXY=false`); zie [PROXY_GUIDE.md → Omgevingsvariabelen](../ops/PROXY_GUIDE.md#environment-variables).

---

## Fail-closed-gedrag

Het doel van de instructie is om te **weigeren** in plaats van stilzwijgend terug te vallen op de verkeerde familie. Dit wordt afgedwongen door twee controles:

1. **Tegenstrijdig letterlijk adres** — een instructie die in strijd is met een host die als letterlijk IP-adres is opgegeven, genereert een fout tijdens het opbouwen van de dispatcher (`resolveDispatcherFamily`, hierboven weergegeven).

2. **Voorafgaande DNS-controle van de hostnaam** — voor een proxy met een hostnaam en een vastgezette familie controleert `proxyFetch.ts` via `assertHostnameSupportsFamily` of de hostnaam daadwerkelijk een record in de vereiste familie heeft, **voordat** uitgaand verkeer plaatsvindt:

   ```ts
   // open-sse/utils/proxyFamilyResolve.ts
   const hasFamily = records.some((r) => r.family === family);
   if (!hasFamily) {
     throw new Error(
       `[ProxyFamily] Proxy host ${host} has no ${family === 6 ? "IPv6 (AAAA)" : "IPv4 (A)"} record; ` +
         `refusing ${family === 6 ? "IPv6" : "IPv4"}-only egress (fail-closed)`
     );
   }
   ```

   Bij een fout voorziet `proxyFetch.ts` de fout van `code = "PROXY_FAMILY_UNAVAILABLE"` en `statusCode = 503`. Ook een mislukte DNS-resolutie wordt als fail-closed behandeld (uitgaand verkeer wordt geweigerd).

Voor hosts die als letterlijk IP-adres zijn opgegeven, doet de voorafgaande DNS-controle niets: hun familie is inherent aan het adres en hoeft niet te worden opgezocht.

---

## Gegevensmodel

De kolom `family` is door migratie `099_proxy_family.sql` aan **twee** tabellen toegevoegd:

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — de proxy-specifieke instructie voor registervermeldingen (`src/lib/db/proxies.ts`). Resolutiequery's selecteren `family` samen met de andere proxykolommen, en een ontbrekende waarde of een waarde die geen tekenreeks is, wordt omgezet naar `"auto"`.
- `upstream_proxy_config.family` — de instructie voor upstream-proxyvermeldingen (`src/lib/db/upstreamProxy.ts`), met dezelfde standaardwaarde `"auto"`.

Wanneer een opgelost proxyobject een andere `family` dan `auto` bevat, voegt `proxyConfigToUrl` de markering `?family=` toe, zodat de vastlegging helemaal tot aan de dispatcher behouden blijft.

---

## Gerelateerde documentatie

> 📖 **Gerelateerde documentatie:**
>
> - [Proxyhandleiding](../ops/PROXY_GUIDE.md) — volledig proxysysteem: CRUD-bewerkingen voor het register, resolutie op 4 niveaus, rotatie, statuscontroles en API-referentie
> - `docs/security/STEALTH_GUIDE.md` (git; niet gecompileerd in `/docs`) — TLS-vingerafdruk- en CLI-vingerafdruklagen die boven op de proxy functioneren
> - [Route Guard-niveaus](./ROUTE_GUARD_TIERS.md) — afdwinging van loopback voor routes die uitsluitend lokaal toegankelijk zijn
