# Egress IP Family Policy (IPv4/IPv6) (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇧🇦 [bs](../../../bs/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

> **Rögzítse a kimenő forgalmat egyetlen IP-családhoz — proxynként `auto`, `ipv4` vagy `ipv6` értékre —, hogy egy kizárólag IPv6-os kimenet soha ne szivárogjon vissza észrevétlenül IPv4-re.**

> **Hiteles forrás:** `open-sse/utils/proxyFamily.ts`, `open-sse/utils/proxyDispatcher.ts`, `open-sse/utils/proxyFetch.ts`, `open-sse/utils/socksConnectorWithFamily.ts`, `open-sse/utils/proxyFamilyResolve.ts`, `src/shared/validation/schemas.ts`, `src/lib/db/proxies.ts`, `src/lib/db/upstreamProxy.ts`, `src/lib/db/migrations/099_proxy_family.sql`

Az OmniRoute lehetővé teszi, hogy minden proxy rendelkezzen egy **címcsalád-alapú kimeneti direktívával**. Alapértelmezés szerint az operációs rendszer választ az IPv4 és az IPv6 közül (kettős protokollverem, „Happy Eyeballs”). Ha a direktívát `ipv4` vagy `ipv6` értékre állítja, az OmniRoute az adott proxyn keresztüli összes kapcsolatot a kiválasztott családhoz rögzíti, és **biztonságosan meghiúsul**, ahelyett, hogy visszaváltana a másik családra.

Ez az oldal bemutatja, hogy mi ez a direktíva, miért létezik, hol konfigurálható, és hogyan oldja fel a futtatókörnyezet.

---

## Tartalomjegyzék

- [Mi ez?](#what-it-is)
- [Miért létezik?](#why-it-exists)
- [A három érték](#the-three-values)
- [Konfigurálás](#how-to-configure-it)
- [Az `auto` feloldása](#how-auto-resolves)
- [Az `ipv4` / `ipv6` kikényszerítése](#how-ipv4--ipv6-are-enforced)
- [SOCKS5-kompatibilitás](#socks5-compatibility)
- [Biztonságos meghiúsulási viselkedés](#fail-closed-behavior)
- [Adatmodell](#data-model)
- [Kapcsolódó dokumentáció](#related-documentation)

---

## Mi ez?

A nyilvántartásban szereplő minden proxy rendelkezik egy `family` mezővel, amely három lehetséges értéket vehet fel, és amelyet egy Zod-enum validál:

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

A mező alapértelmezett értéke `"auto"`, amely megőrzi a korábbi kettős protokollverem működését. Az `ipv4` vagy `ipv6` érték beállítása az adott proxy kapcsolódási címcsaládját a megadott értékhez rögzíti.

A direktívát mindenhol egyetlen segédfüggvény normalizálja, így minden ismeretlen érték `auto` értékre alakul:

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## Miért létezik?

A [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777) számú PR-ben került bevezetésre. A változtatást indokoló problémák:

| Probléma                                                  | Amit a direktíva megold                                                                                                                                                                                                                                                                                                                                                                      |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Kizárólag IPv6-os kimenet IPv4-re szivárgása**          | Ha egy proxyállomás A- és AAAA-rekorddal is rendelkezik (vagy az operációs rendszer az IPv4-et részesíti előnyben), a Happy Eyeballs akkor is IPv4-en keresztül kezdeményezhet kimenő kapcsolatot, ha kizárólag IPv6-os útvonalat szeretne használni. Az `ipv6` rögzítése megszünteti ezt a szivárgást.                                                                                      |
| **Megosztott kimeneti anomáliák miatti visszavonás**      | A rotáló szolgáltatók (codex/openai) visszavonják a tokeneket, ha sok fiók nagy forgalommal **ugyanazon** az IP-címen keresztül kommunikál kifelé. A kimeneti címcsalád szabályozása segít abban, hogy a fiókok elkülönített, kiszámítható kimeneti útvonalakon maradjanak (az ehhez kapcsolódó kimeneti IP-diagnosztikáért lásd: [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts)). |
| **Determinisztikus kimenet megfelelőséghez/teszteléshez** | Ha garantálnia kell, hogy a forgalom egy adott címcsaládon keresztül távozik, az `auto` nem elegendő.                                                                                                                                                                                                                                                                                        |

A direktíva szándékosan **proxynkénti**, nem pedig globális — a készletben lévő különböző proxyk eltérő szabályzatokkal rendelkezhetnek.

---

## A három érték

| Érték  | UI címke            | Viselkedés                                                                                                                                                           |
| ------ | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto` | `Auto (dual-stack)` | OS kiválasztja a családot. Az IP-literális proxy gazdagép esetében a család a literál velejárója; gazdagépnév esetén mindkét család jogosult. Ez az alapértelmezett. |
| `ipv4` | `IPv4 only`         | Rögzíti a kapcsolatot a IPv4. A bezárás sikertelen, ha a proxy gazdagépnek nincs IPv4 (A) rekordja.                                                                  |
| `ipv6` | `IPv6 only`         | Rögzíti a kapcsolatot a IPv6. A bezárás sikertelen, ha a proxy gazdagépnek nincs IPv6 (AAAA) rekordja.                                                               |

UI karakterláncok `src/i18n/messages/en.json` (`labelFamily`, `familyAuto`, `familyIpv4`, `familyIpv6`, `familyHint`).

---

## Hogyan kell konfigurálni

### Műszerfal

A választó a proxy formájában van** Proxy Pool** lap:

1. Nyitott** Dashboard → Settings → Proxy → Proxy Pool**
2. Proxy hozzáadása vagy szerkesztése
3. Állítsa be a**IP család** legördülő menüből `Auto (dual-stack)`, `IPv4 only` vagy `IPv6 only` elemre
4. Megtakarítás

A vezérlést a `ProxyRegistryManager.tsx` adja (a `proxy/ProxyPoolTab.tsx` szerelve).

### API

A `family` mező a proxy-nyilvántartási create/update payloads része, `createProxyRegistrySchema` / `updateProxyRegistrySchema` (`src/shared/validation/schemas.ts`) ellenőrzi, és `POST` / `PATCH /api/v1/management/proxies` kezeli:

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

Ugyanezt a mezőt az upstream proxy bejegyzésekhez használt inline proxy konfigurációs objektum is elfogadja (`upstream_proxy_config.family`, lásd [Adatmodell](#data-model) ).

A CRUD/assignment API proxy többi részéhez lásd [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md) fájlt.

---

## Az `auto` feloldási módja

Ha a `family` értéke `auto`, az OmniRoute **nem** fűz hozzá semmilyen direktívát — a proxy URL-címét változtatás nélkül használja, a kapcsolathoz tartozó címcsalád pedig eleve adott módon lesz meghatározva.

Az URL összeállításakor (az `open-sse/utils/proxyDispatcher.ts` fájl `proxyConfigToUrl` / `normalizeProxyUrl` függvényében) az `auto` beállítású proxy egy jelölő nélküli egyszerű URL-címet eredményez:

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

A továbbításkor (`resolveDispatcherFamily`) az `auto` egy IP-literálként megadott állomás eleve adott címcsaládjára, állomásnév esetén pedig `null` értékre oldódik fel (így az operációs rendszer dönthet):

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // állomásnév esetén null → az operációs rendszer választ
  // ...
}
```

Tehát:

- `auto` + IP-literálként megadott állomás (`192.0.2.1` / `[2001:db8::1]`) → az adott literál címcsaládja.
- `auto` + állomásnév → `null` → az operációs rendszer szabványos, kettős protokollvermet használó névfeloldása.

---

## Az `ipv4` / `ipv6` kikényszerítése

A nem `auto` direktíva egyetlen szintetikus lekérdezési jelölőként — `?family=ipv4` vagy `?family=ipv6` — kerül hozzáfűzésre egyszer a normalizált proxy URL-hez. A `normalizeProxyUrl` gondosan eltávolítja, majd pontosan egyszer újra hozzáfűzi ezt a jelölőt, így az soha nem rontja el a port feldolgozását.

A diszpécser létrehozásakor a rendszer beolvassa a jelölőt, és konkrét kapcsolódási családdá alakítja. Ha a gazdagép a **másik** családba tartozó IP-literál, az OmniRoute hibát dob (ellentmondás esetén zárt hibakezelést alkalmaz):

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Proxy family directive ${directive} contradicts ${literal === 6 ? "IPv6" : "IPv4"} literal host`
  );
}
```

Ezután a rendszer rögzíti a konkrét családot a csatlakozón:

- **HTTP/HTTPS-proxyk** (`ProxyAgent`): `proxyTls: { family, autoSelectFamily: false }` — letiltja a Happy Eyeballs mechanizmust, így kizárólag a kiválasztott családdal történik kapcsolódási kísérlet.
- **SOCKS5-proxyk**: egy egyedi csatlakozó továbbítja a `socket_options: { family, autoSelectFamily: false }` beállítást a SOCKS-kliensnek (lásd: [SOCKS5-kompatibilitás](#socks5-compatibility)).

---

## SOCKS5-kompatibilitás

A családrögzítés SOCKS5-proxykkal is működik, azonban az alapértelmezett `fetch-socks` nem teszi elérhetővé a proxykapcsolat családjának rögzítéséhez szükséges socketbeállításokat. Az OmniRoute ezért saját csatlakozót biztosít:

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

Minden SOCKS5-küldés a `createSocksDispatcherWithFamily` függvényen halad keresztül a `family` értékétől függetlenül (beleértve a `null` / `auto` értéket is gazdagépnév esetén): a `buildSocksFamilySocketOptions(null)` eredménye `{}`, és ugyanaz a `SocksClient.createConnection` + TLS `buildConnector` útvonal használatos a `socket_options` rögzítésével, így a Happy Eyeballs nem választhat IPv4-et egy kizárólag IPv6-ot engedélyező kimenőforgalmi szabályzat esetén.

Maga a SOCKS5-támogatás alapértelmezés szerint be van kapcsolva (a `ENABLE_SOCKS5_PROXY=false` beállítással kapcsolható ki); lásd: [PROXY_GUIDE.md → Környezeti változók](../ops/PROXY_GUIDE.md#environment-variables).

---

## Zárt hibakezelési viselkedés

A direktíva lényege, hogy **elutasítsa** a kapcsolatot ahelyett, hogy észrevétlenül a helytelen családra váltana vissza. Ezt két védelmi mechanizmus biztosítja:

1. **Literális ellentmondás** — ha egy direktíva ellentmond egy IP-literál gazdagépnek, a rendszer hibát dob a diszpécser létrehozásakor (`resolveDispatcherFamily`, lásd fent).

2. **Gazdagépnév előzetes DNS-ellenőrzése** — rögzített családú, gazdagépnévvel megadott proxy esetén a `proxyFetch.ts` az `assertHostnameSupportsFamily` segítségével **a kimenő kapcsolat létrehozása előtt** ellenőrzi, hogy a gazdagépnév valóban rendelkezik-e a szükséges családba tartozó rekorddal:

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

   Hiba esetén a `proxyFetch.ts` a hibát a `code = "PROXY_FAMILY_UNAVAILABLE"` és `statusCode = 503` értékekkel címkézi. A DNS-feloldási hibát a rendszer szintén zárt hibakezeléssel kezeli (megtagadja a kimenő kapcsolatot).

Az IP-literál gazdagépek esetén az előzetes DNS-ellenőrzés nem végez műveletet — a családjuk eleve adott, ezért nincs szükség feloldásra.

---

## Adatmodell

A `family` oszlopot a `099_proxy_family.sql` migráció **két** táblához adta hozzá:

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — a beállításjegyzék bejegyzéseinek proxynkénti direktívája (`src/lib/db/proxies.ts`). A feloldási lekérdezések a többi proxyoszloppal együtt a `family` oszlopot is lekérik, a hiányzó vagy nem karakterlánc típusú értékeket pedig `"auto"` értékre alakítják.
- `upstream_proxy_config.family` — a felsőbb szintű proxy bejegyzéseinek direktívája (`src/lib/db/upstreamProxy.ts`), ugyanazzal az alapértelmezett `"auto"` értékkel.

Ha egy feloldott proxyobjektum nem `auto` értékű `family` mezőt tartalmaz, a `proxyConfigToUrl` hozzáfűzi a `?family=` jelölőt, így a rögzített beállítás egészen a diszpécserig megmarad.

---

## Kapcsolódó dokumentáció

> 📖 **Kapcsolódó dokumentáció:**
>
> - [Proxyútmutató](../ops/PROXY_GUIDE.md) — a teljes proxyrendszer: a beállításjegyzék CRUD-műveletei, négyszintű feloldás, rotáció, állapotellenőrzés és API-referencia
> - `docs/security/STEALTH_GUIDE.md` (git; nincs beépítve a `/docs` könyvtárba) — a proxyra épülő TLS-ujjlenyomat- és CLI-ujjlenyomat-rétegek
> - [Útvonalvédelmi szintek](./ROUTE_GUARD_TIERS.md) — loopback-kényszerítés a kizárólag helyileg elérhető útvonalakhoz
