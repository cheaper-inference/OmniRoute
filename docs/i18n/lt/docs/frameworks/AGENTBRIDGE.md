# AgentBridge (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/AGENTBRIDGE.md) · 🇪🇹 [am](../../../am/docs/frameworks/AGENTBRIDGE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/AGENTBRIDGE.md) · 🇦🇿 [az](../../../az/docs/frameworks/AGENTBRIDGE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/AGENTBRIDGE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/AGENTBRIDGE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/AGENTBRIDGE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/AGENTBRIDGE.md) · 🇩🇰 [da](../../../da/docs/frameworks/AGENTBRIDGE.md) · 🇩🇪 [de](../../../de/docs/frameworks/AGENTBRIDGE.md) · 🇬🇷 [el](../../../el/docs/frameworks/AGENTBRIDGE.md) · 🇪🇸 [es](../../../es/docs/frameworks/AGENTBRIDGE.md) · 🇪🇪 [et](../../../et/docs/frameworks/AGENTBRIDGE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/AGENTBRIDGE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/AGENTBRIDGE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/AGENTBRIDGE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/AGENTBRIDGE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/AGENTBRIDGE.md) · 🇮🇱 [he](../../../he/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/AGENTBRIDGE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/AGENTBRIDGE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/AGENTBRIDGE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/AGENTBRIDGE.md) · 🇮🇩 [id](../../../id/docs/frameworks/AGENTBRIDGE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/AGENTBRIDGE.md) · 🇮🇹 [it](../../../it/docs/frameworks/AGENTBRIDGE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/AGENTBRIDGE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/AGENTBRIDGE.md) · 🇰🇭 [km](../../../km/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/AGENTBRIDGE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/AGENTBRIDGE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/AGENTBRIDGE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/AGENTBRIDGE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/AGENTBRIDGE.md) · 🇲🇲 [my](../../../my/docs/frameworks/AGENTBRIDGE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/AGENTBRIDGE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/AGENTBRIDGE.md) · 🇳🇴 [no](../../../no/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [or](../../../or/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/AGENTBRIDGE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/AGENTBRIDGE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/AGENTBRIDGE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/AGENTBRIDGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/AGENTBRIDGE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/AGENTBRIDGE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/AGENTBRIDGE.md) · 🇱🇰 [si](../../../si/docs/frameworks/AGENTBRIDGE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/AGENTBRIDGE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/AGENTBRIDGE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/AGENTBRIDGE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/AGENTBRIDGE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [te](../../../te/docs/frameworks/AGENTBRIDGE.md) · 🇹🇭 [th](../../../th/docs/frameworks/AGENTBRIDGE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/AGENTBRIDGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/AGENTBRIDGE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/AGENTBRIDGE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/AGENTBRIDGE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/AGENTBRIDGE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/AGENTBRIDGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/AGENTBRIDGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/AGENTBRIDGE.md)

---

AgentBridge yra „OmniRoute“ MITM („Man-in-the-Middle“, tarpininko) tarpinis serveris, kuris perima HTTPS srautą iš IDE DI agentų ir nukreipia jį per „OmniRoute“ vieningą maršruto parinkimo variklį. Jis palaiko **10 IDE agentų** — Antigravity, Kiro, GitHub Copilot, GHE Copilot, OpenAI Codex, Cursor, Zed, Claude Code, Open Code ir Trae (tiriama) — todėl „OmniRoute“ yra plačiausią DI programavimo pagalbinių priemonių aprėptį rinkoje siūlantis MITM tarpinis serveris.

**Valdymo skydelio vieta:** `/dashboard/tools/agent-bridge`
**Šoninės juostos grupė:** Įrankiai (po „Cloud Agents“)
**Taip pat žr.:** [`TRAFFIC_INSPECTOR.md`](./TRAFFIC_INSPECTOR.md) — stebėkite visą perimtą srautą realiuoju laiku; `docs/security/MITM-TPROXY-DECRYPT.md` (git; nekompiliuojama į `/docs`) — Linux TPROXY skaidraus iššifravimo fiksavimo režimas, valdomas per `/api/tools/agent-bridge/tproxy` maršrutą.

---

## §1 Apžvalga

### Kas yra „AgentBridge“?

Kai IDE agentas (pvz., „GitHub Copilot“, „Cursor“, „Claude Code“) atlieka API iškvietimą, jis tiesiogiai prisijungia prie pirminio DI paslaugų teikėjo („OpenAI“, „Anthropic“ ir kt.). „AgentBridge“ skaidriai perima šį ryšį TLS lygmeniu — nereikalaujant keisti jokios agento konfigūracijos — ir perrašo užklausą, nukreipdamas ją per „OmniRoute“.

Tai suteikia galimybę:

- **Peradresuoti bet kurį agentą į bet kurį paslaugų teikėją**: „Copilot“ komunikuoja su „OpenAI“? Nukreipkite jį į „Anthropic Claude“, „Gemini“ ar bet kurį iš 374 „OmniRoute“ paslaugų teikėjų.
- **Taikyti modelių susiejimus**: `gemini-3-flash` → `claude-sonnet-4.7` skaidriai apdorojimo modulio lygmeniu.
- **Stebėti visą agentų srautą**: kiekviena perimta užklausa publikuojama [srauto inspektoriuje](./TRAFFIC_INSPECTOR.md).
- **Taikyti „OmniRoute“ atsparumo mechanizmus**: kombinuotas maršrutizavimas, grandinės pertraukikliai, atsarginiai maršrutai ir sąnaudų stebėjimas taip pat veikia IDE agentų srautui.

### Pozicionavimas rinkos atžvilgiu

| Funkcija                          | 9router | anti-api | llm-interceptor | **OmniRoute AgentBridge** |
| --------------------------------- | :-----: | :------: | :-------------: | :-----------------------: |
| Antigravity                       |    ✓    |    ✓     |        —        |             ✓             |
| GitHub Copilot                    |    ✓    |    ✓     |        —        |             ✓             |
| Kiro (AWS)                        |    ✓    |    ✓     |        —        |             ✓             |
| OpenAI Codex                      |    —    |    ✓     |        —        |             ✓             |
| Cursor IDE                        |    ✓    |    ✓     |        —        |             ✓             |
| Zed Industries                    |    —    |    ✓     |        —        |             ✓             |
| Claude Code                       |    —    |    —     |        ✓        |             ✓             |
| Open Code                         |    —    |    —     |        ✓        |             ✓             |
| Trae                              |    —    |    —     |        —        |        🔍 Tiriama         |
| Valdymo skydelio sąsaja           |    ✓    |    ✗     |        ✗        |             ✓             |
| Srauto inspektorius               |    ✗    |    ✗     |        ✓        |             ✓             |
| „OmniRoute“ maršrutizavimas       |    ✗    |    ✗     |        ✗        |             ✓             |
| Modelių susiejimo sąsaja          |    ✗    |    ✗     |        ✗        |             ✓             |
| Apėjimo sąrašas                   |    ✗    |    ✗     |        ✓        |             ✓             |
| Pirminio serverio CA sertifikatas |    ✗    |    ✗     |        ✓        |             ✓             |

---

## §2 Architektūra

### 2.1 Komponentų apžvalga

```
IDE agentas (VS Code / Cursor / kt.)
    │  HTTPS (prievadas 443)
    ▼
/etc/hosts — 127.0.0.1 api.githubcopilot.com   ← DNS peradresavimas
    │
    ▼
src/mitm/server.cjs  (prievadas 443, CJS antrinis procesas)
    │  nustato paskirties vietą pagal Host antraštės SNI
    │  generuoja kiekvienam SNI skirtą TLS sertifikatą, pasirašytą AgentBridge CA
    ├── Atitinka apėjimo sąrašą? → TCP tiesioginis perdavimas (be iššifravimo)
    ├── Atitinka paskirties vietą? → fetch → OmniRoute maršrutizatorius (prievadas 20128)
    │       └── handler.intercept() — TypeScript
    │               ├── maskSecrets() užklausos turiniui / antraštėms
    │               ├── TrafficBuffer.push() — paskelbia srauto inspektoriuje
    │               └── fetchRouter() → /v1/chat/completions
    └── Nėra atitikmens? → TCP tiesioginis perdavimas (be iššifravimo)
```

### 2.2 MITM serveris (`src/mitm/server.cjs`)

Pagrindinis MITM serveris veikia kaip Node.js CJS antrinis procesas (kad nereikėtų perrašyti esamos CJS kodų bazės). Jis:

- Klausosi 443 prievado (reikia privilegijų arba `authbind`/`setcap`)
- Priima CONNECT tunelius iš OS (per `/etc/hosts` DNS peradresavimą)
- Generuoja kiekvienam SNI skirtus TLS sertifikatus, pasirašytus AgentBridge CA (`DATA_DIR/mitm/ca.crt`)
- Pagal Host antraštę nustato paskirties agentą, naudodamas `targets/index.ts` registrą
- Per HTTP perduoda užklausas TypeScript apdorojimo sluoksniui adresu `http://127.0.0.1:20128`

`TARGET_HOSTS` įkeliamas iš `DATA_DIR/mitm/targets.json` (paleidimo metu įrašo `targets/index.ts`), todėl galima dinamiškai atnaujinti neperleidžiant CJS serverio.

> **Šakninio CA modelis (#6684).** Anksčiau aprašytas kiekvienam SNI skirto sertifikato, pasirašyto CA,
> modelis yra #6684 pridėtas išliekantis šakninio CA modelis (`src/mitm/cert/rootCa.ts` +
> `src/mitm/_internal/rootCaShim.cjs`, pakartotinai naudojantis CA / galutinio sertifikato kriptografiją, kurios
> veikimas jau patvirtintas TPROXY faile `src/mitm/tproxy/dynamicCert.ts`) — jis pakeičia
> senesnį vieną statinį savarankiškai pasirašytą galutinį sertifikatą (`src/mitm/cert/generate.ts`, vis dar
> apribotą tik antigravity pagrindiniais kompiuteriais), kurį nurodo diske esanti `server.crt`/`server.key`
> pora. **Perkėlimo elgsena**: naujame diegime (be ankstesnio
> `server.crt`) šakninio CA modelis gaunamas automatiškai; diegimas, kuriame jau
> pasitikima senuoju statiniu galutiniu sertifikatu, jį naudoja tol, kol operatorius nustato
> `MITM_ROOT_CA_ENABLED=true` ir iš naujo paleidžia tiltą (`src/mitm/cert/migration.ts`
> yra grynoji sprendimo funkcija — patikimas MITM CA, galintis pasirašyti galutinį sertifikatą
> **bet kuriam** pagrindiniam kompiuteriui, turi gerokai daugiau galių nei senasis fiksuoto SAN galutinis
> sertifikatas, todėl perjungimas niekada neatliekamas nepastebimai diegime, kuriame juo jau pasitikima). CA sertifikatas įdiegiamas
> į tą pačią `omniroute-mitm.crt` patikimumo saugyklos vietą, kurią naudojo senasis galutinis sertifikatas
> (`cert/install.ts::installCaCert`) — dvigubo pasitikėjimo valyti nereikia.

### 2.3 Bazinė apdorojimo klasė (`src/mitm/handlers/base.ts`)

Visi agentų apdorojimo moduliai išplečia `MitmHandlerBase`:

```ts
export abstract class MitmHandlerBase {
  abstract readonly agentId: AgentId;

  abstract intercept(
    req: IncomingMessage,
    res: ServerResponse,
    body: Buffer,
    mappedModel: string
  ): Promise<void>;

  // Apsaugoti pagalbiniai metodai: fetchRouter, pipeSSE, hookBufferStart, hookBufferUpdate
}
```

Kiekvienas apdorojimo modulis prieš tarpinį perdavimą iškviečia `hookBufferStart()`, o užbaigęs — `hookBufferUpdate()`. Šie metodai į `globalTrafficBuffer` įtraukia `InterceptedRequest` įrašus (žr. [Srauto inspektorius](./TRAFFIC_INSPECTOR.md) §4).

### 2.4 Paskirties vietų registras (`src/mitm/targets/`)

Kiekvienas agentas turi deklaratyvų paskirties vietos failą:

```ts
// src/mitm/targets/copilot.ts
export const COPILOT_TARGET: MitmTarget = {
  id: "copilot",
  name: "GitHub Copilot",
  hosts: ["api.githubcopilot.com", "copilot-proxy.githubusercontent.com"],
  port: 443,
  endpointPatterns: ["/chat/completions", "/v1/chat/completions"],
  defaultModels: [{ id: "gpt-4o", name: "GPT-4o", alias: "gpt-4o" }],
  handler: () => import("../handlers/copilot"),
  riskNoticeKey: "providers.riskNotice.oauth",
};
```

Registras (`targets/index.ts`) eksportuoja `ALL_TARGETS` ir paleidimo metu sukuria `DATA_DIR/mitm/targets.json`.

### 2.5 Tiesioginis perdavimas ir apėjimo sąrašas (`src/mitm/passthrough.ts`)

**Apėjimo sąrašas** (tikrinamas pirmiausia ir turi pirmenybę prieš paskirties vietos atitiktį):

- Numatytieji šablonai: bankų pagrindiniai kompiuteriai, `.gov.`, OAuth / SSO teikėjai (Okta, Auth0) ir kt.
- Naudotojo šablonai: saugomi DB lentelėje `agent_bridge_bypass`
- Apeiti pagrindiniai kompiuteriai gauna skaidrų TCP tunelį — TLS **niekada neiššifruojamas**

**Numatytasis tiesioginis perdavimas** (nėra paskirties vietos atitikties ir nėra apėjimo sąraše):

- Taip pat gauna TCP tunelį — ryšiai niekada nenutraukiami
- Neleidžia AgentBridge trikdyti bendro sistemos HTTPS srauto

Maršruto parinkimo pirmumas:

```
apėjimo sąrašas → paskirties vietos atitiktis → tiesioginis perdavimas
```

### 2.6 Išorinio serverio CA sertifikatas (`src/mitm/upstreamTrust.ts`)

Įmonių tinklo aplinkoms, naudojančioms pasirinktinį CA:

```bash
AGENTBRIDGE_UPSTREAM_CA_CERT=/path/to/corporate-ca.pem
```

Kai nustatyta, `undici` visuotinis dispečeris sukonfigūruojamas naudojant papildomą CA sertifikatą, todėl AgentBridge gali pasiekti išorinius teikėjus per įmonės TLS užbaigimo tarpinius serverius.

### 2.7 Paslapčių maskavimas (`src/mitm/maskSecrets.ts`)

Nepriklausomas švarios patalpos skaitytuvas pritaikomas užklausų turiniui ir kredencialų antraštėms
**prieš** jiems patenkant į srauto inspektoriaus buferį ar bet kurį žurnalą. Jis atlieka vieną tiesinį perėjimą:

- `sk-` / `ak-` / `pk-` prefiksais prasidedantys prieigos raktai (OpenAI / Anthropic stiliaus)
- RFC 6750 `Authorization: Bearer <token>` kredencialai, pirmenybę teikiant visam prieigos raktui
- Bendrieji ilgi nepermatomi prieigos raktai (≥40 simbolių), įskaitant formas su taškais ir užpildymu

`sanitizeHeaders()` išsaugotus pavadinimus paverčia mažosiomis raidėmis, deterministiškai sujungia masyvų reikšmes, pašalina
bendrą tarpinių mazgų / kadravimo draudžiamųjų elementų sąrašą (įskaitant tarpinio serverio autentifikavimą), visiškai paslepia `cookie` ir
`set-cookie`, o kredencialų reikšmes perduoda skaitytuvui.

---

## §3 Sąranka

### 3.1 MITM serverio paleidimas / sustabdymas

Naudokite „AgentBridge“ serverio kortelę, esančią `/dashboard/tools/agent-bridge`:

| Veiksmas                         | Aprašymas                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Paleisti serverį                 | Paleidžia `src/mitm/server.cjs` per 443 prievadą. Naudojant šakninės CA modelį, pirmojo paleidimo metu sukuriamas `ca.crt`, o jei pateikiamas sudo slaptažodis, aktyvus sertifikatas pažymimas kaip patikimas                                                                                                                                                                                                                                                        |
| Sustabdyti serverį               | Tvarkingai sustabdo antrinį procesą                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Paleisti serverį iš naujo        | Sustabdo ir paleidžia iš naujo (pritaikomi paskirties pakeitimai ir iš naujo sugeneruotas sertifikatas)                                                                                                                                                                                                                                                                                                                                                              |
| Pažymėti sertifikatą patikimu    | Įdiegia aktyvų sertifikatą į OS patikimų sertifikatų saugyklą: `DATA_DIR/mitm/ca.crt`, kai naudojamas šakninės CA modelis, arba `DATA_DIR/mitm/server.crt`, kai naudojamas senasis galutinio sertifikato diegimo būdas                                                                                                                                                                                                                                               |
| Atsisiųsti sertifikatą           | Atsisiunčia aktyvų sertifikatą, kad jį būtų galima įdiegti rankiniu būdu (`omniroute-mitm-ca.crt` = `ca.crt`, arba `omniroute-mitm.crt` = `server.crt`, kai naudojamas senasis galutinio sertifikato diegimo būdas)                                                                                                                                                                                                                                                  |
| Sugeneruoti sertifikatą iš naujo | Sertifikato modelis niekada nekeičiamas. Senasis galutinio sertifikato diegimo būdas: sukuriami nauji `server.crt` / `server.key` (paleiskite serverį iš naujo, kad jis juos naudotų). Šakninės CA modelis: pakeičiami `ca.crt` / `ca.key`; tai neleidžiama, kol serveris veikia. Pirmiausia panaikinamas pasitikėjimas senu patikimu CA (reikalingas sudo slaptažodis), antraip keitimas nutraukiamas. Po to klientai turi iš naujo pažymėti naują CA kaip patikimą |

### 3.2 Pasitikėjimas sertifikatu

Kad IDE priimtų MITM ryšį, OS turi pasitikėti „AgentBridge“ CA sertifikatu.

**Linux (NSS — Chrome/Firefox):**

```bash
certutil -A -d sql:$HOME/.pki/nssdb -n "OmniRoute AgentBridge" -t CT,, -i ~/.omniroute/mitm/ca.crt
```

**macOS (Keychain):**

```bash
sudo security add-trusted-cert -d -r trustRoot \
  -k /Library/Keychains/System.keychain ~/.omniroute/mitm/ca.crt
```

**Windows (certmgr):**

```powershell
certutil -addstore -f Root $env:USERPROFILE\.omniroute\mitm\ca.crt
```

Arba naudokite valdymo skydelio mygtuką „Trust Cert“ (jis paleidžia jūsų OS tinkamą komandą ir, jei reikia, paprašo sudo slaptažodžio).

#### „Electron“ pagrindu veikiančios IDE nepaiso OS patikimų sertifikatų saugyklos (`NODE_EXTRA_CA_CERTS`)

Kai kurios IDE — ypač **Antigravity IDE** ir kitos iš „Electron“ / VS Code kilusios programos — turi
nuosavą Node.js vykdymo aplinką, kuri siųsdama išorines `fetch` / HTTPS užklausas
**nesikreipia į OS patikimų sertifikatų saugyklą**. Pasitikėjimo CA nustatymo OS / NSS lygmeniu pakanka IDE savajai **vidinei sistemai**
(pvz., Go kalbos serveriui, kuris naudoja OS CA rinkinį), tačiau **Electron sąsajoje**
TLS vis tiek neveiks — tai gali pasireikšti taip, lyg vartotojas būtų _atjungtas_, arba gali būti rodomas
_"ryšio klaidos"_ pranešimas, nors MITM žurnale matyti, kad vidinės sistemos pradinės užklausos grąžina `200`. Būtina atlikti
abu toliau nurodytus veiksmus:

1. Aiškiai nurodykite vykdymo aplinkai CA:
   ```bash
   export NODE_EXTRA_CA_CERTS=/path/to/omniroute-agentbridge-ca.crt
   ```
2. **Paleiskite IDE iš to terminalo apvalkalo.** Paleidus ją darbalaukio piktograma / iš „Dock“ / meniu „Start“,
   terminalo apvalkalo eksportuoti kintamieji **nepaveldimi**, o `~/.config/environment.d/*.conf` pritaikomas tik
   iš naujo prisijungus prie grafinės aplinkos. Pirmiausia visiškai uždarykite IDE — dėl „Electron“ vieno egzemplioriaus
   užrakto antrasis paleidimas tik sufokusuoja esamą procesą, todėl nauja aplinka ignoruojama.

Pirmiau aprašytas OS pasitikėjimo + NSS veiksmas vis tiek būtinas (kai kuriuose tapatybės nustatymo
procesuose naudojamas „Chromium“ tinklo dėklas skaito naudotojo NSS saugyklą ir turi atskirus statinius `*.googleapis.com`
prisegimus, kuriuos pakeičia vietoje patikimu pažymėtas CA). `NODE_EXTRA_CA_CERTS` papildomai apima Node `fetch` kelią.

### 3.3 DNS maršruto parinkimas

Kiekvieno norimo perimti agento API pagrindinis kompiuteris (-iai) turi būti susietas (-i) su `127.0.0.1`. „AgentBridge“ automatiškai tvarko `/etc/hosts` įrašus, kai sąrankos vediklyje įjungiate arba išjungiate agento DNS.

`/etc/hosts` įrašų, skirtų „GitHub Copilot“, pavyzdys:

```
127.0.0.1 api.githubcopilot.com
127.0.0.1 copilot-proxy.githubusercontent.com
```

### 3.4 Modelių susiejimas

Kiekvieno agento kortelėje esančioje modelių susiejimo lentelėje nustatykite šaltinio → paskirties susiejimus:

| Šaltinio modelis (savasis agento) | Paskirties modelis („OmniRoute“) |
| --------------------------------- | -------------------------------- |
| `gpt-4o`                          | `claude-sonnet-4.7`              |
| `*` (pakaitos simbolis)           | `claude-haiku-4.7`               |

Pakaitos simbolis `*` susieja bet kurį neatpažintą modelį su nurodytu paskirties modeliu. Duomenys išsaugomi `agent_bridge_mappings` lentelėje.

> **Patarimas — sužinokite tikruosius agento modelių ID.** IDE gali siųsti modelių pavadinimus, kurie skiriasi nuo
> jos naudotojo sąsajoje rodomų etikečių ir keičiasi tarp pagrindinių versijų. Pavyzdžiui, **Antigravity 2** ryšiu siunčia
> `gemini-3.1-pro-low`, `gemini-pro-agent` ir `gemini-3.1-flash-lite`, o ne senesnėje dokumentacijoje nurodytą
> `gemini-2.5-pro`. Išsiųskite vieną pokalbio užklausą, kai nėra jokios atitinkančios susiejimo taisyklės: MITM
> žurnaluose įrašys tikslią gaunamą `model:` reikšmę ir persiųs užklausą. Susiekite šią pažodinę reikšmę, tada
> kita užklausa bus perimta ir nukreipta į jūsų pasirinktą tikslą.

### 3.5 Pranešimas apie riziką

AgentBridge perima prisijungimo duomenis (OAuth prieigos raktus, API raktus), kuriuos IDE naudoja tapatybei patvirtinti pirminių paslaugų teikėjų sistemose. Prieš įrašant į žurnalą jie yra **užmaskuojami** (žr. §2.7), tačiau juos gali matyti OmniRoute MITM sluoksnis. Pirmą kartą aktyvinant kiekvieną agentą parodomas uždaromas modalinis pranešimas apie riziką.

### 3.6 Priežiūra ir diagnostika

Valdymo skydelyje pateikiama kortelė **Priežiūra ir diagnostika** (`AgentBridgeMaintenanceCard`, esanti `src/app/(dashboard)/dashboard/tools/agent-bridge/components/`), kurioje rodomi operaciniai MITM maršrutai, anksčiau neturėję naudotojo sąsajos. Jos paantraštė: _„Savarankiškai patikrinkite perėmimo grandinę, panaikinkite likusią sistemos būseną ir perkelkite savo sąranką iš vieno kompiuterio į kitą.“_ Kortelės kliento pagalbinės priemonės yra faile `src/lib/inspector/agentBridgeMaintenanceApi.ts`.

| Mygtukas                      | Maršrutas                              | Ką jis atlieka                                                                                                                                                                                                                                 |
| ----------------------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Diagnozuoti**               | `GET /api/tools/agent-bridge/diagnose` | Paleidžia perėmimo grandinės savitikrą ir parodo kiekvienos patikros ataskaitą (✓/✗ ir taisymo patarimą).                                                                                                                                      |
| **Taisyti**                   | `POST /api/tools/agent-bridge/repair`  | Panaikina po strigties ar SIGKILL likusią našlaitinę MITM sistemos būseną (DNS klastojimo įrašus, šakninį CA, sistemos tarpinį serverį). Idempotentinė operacija — kai būsena tvarkinga, praneša „Nėra ką taisyti“.                            |
| **Pašalinti CA**              | `DELETE /api/tools/agent-bridge/cert`  | Atšaukia pasitikėjimą MITM šakniniu CA ir pašalina jį iš OS patikimų sertifikatų saugyklos (aiškiai inicijuojama, idempotentinė operacija). Rodoma tik tada, kai CA šiuo metu yra patikimas; būtinas įterptinis patvirtinimas „Pašalinti CA?“. |
| **Eksportuoti konfigūraciją** | `GET /api/tools/agent-bridge/config`   | Atsisiunčia perkeliamą konfigūracijos JSON (žr. §3.7).                                                                                                                                                                                         |
| **Importuoti konfigūraciją**  | `POST /api/tools/agent-bridge/config`  | Įkelia anksčiau eksportuotą konfigūracijos JSON (žr. §3.7).                                                                                                                                                                                    |

Kiekvieno agento kortelėje taip pat yra atskiras mygtukas **Atkurti numatytuosius nustatymus** (`POST
/api/tools/agent-bridge/agents/{id}/reset`) — vienu spustelėjimu atliekamas konkretaus agento pakeitimų atšaukimas, kuris panaikina tik to
agento pagrindinių kompiuterių vardų klastojimą, išvalo išsaugotus modelių susiejimus ir iš naujo nustato jo `dns_enabled`/`setup_completed`
būseną, kad visiškai iš naujo paleista IDE vėl jungtųsi prie tikrosios pirminės paslaugos. Tai **nepaveikia**
bendrinamo MITM serverio ar šakninio CA (jie vis dar gali būti reikalingi kitiems agentams) — juos ir toliau galima pasiekti
per serverio kortelę ir pirmiau nurodytą veiksmą **Pašalinti CA**. Windows sistemoje taip pat pagal galimybes paleidžiama
`ipconfig /flushdns`, nes Windows DNS klientas podėlyje laiko hosts failo įrašus ir kitu atveju nepašalintų
ką tik panaikinto suklastoto įrašo.

**Diagnostikos patikros** (`summarizeDiagnostics()` faile `src/mitm/inspector/diagnostics.ts`). Maršrutas kiekvienai patikrai paleidžia šalutinį poveikį turintį bandymą ir perduoda logines reikšmes grynajai apibendrinimo funkcijai; grąžinamas vienas `healthy` įvertinimas ir kiekvieno gedimo taisymo patarimas:

| Patikros pavadinimas | Ką ji tikrina                                                              | Patarimas nesėkmės atveju                                                                                                                                                                         |
| -------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `server-running`     | Ar MITM serverio procesas yra aktyvus                                      | „MITM serveris neveikia. Paleiskite jį AgentBridge skirtuke.“                                                                                                                                     |
| `server-reachable`   | Ar MITM serveris priima ryšius savo prievade (TCP bandymas)                | „MITM serveris nepriima ryšių savo prievade. Patikrinkite, ar prievadas laisvas ir ar turite teises jį susieti.“                                                                                  |
| `cert-exists`        | Ar MITM sertifikatas sugeneruotas diske                                    | „MITM sertifikatas dar nesugeneruotas. Sugeneruokite jį AgentBridge skirtuke.“                                                                                                                    |
| `cert-trusted`       | Ar MITM šakninis CA yra OS patikimų sertifikatų saugykloje                 | „OS saugykla nepasitiki MITM šakniniu CA, todėl TLS perėmimas nepavyks. Nurodykite pasitikėti sertifikatu AgentBridge skirtuke.“                                                                  |
| `dns-configured`     | Ar tiksliniai pagrindinių kompiuterių vardai klastojami faile `/etc/hosts` | „Tiksliniai pagrindinių kompiuterių vardai nėra klastojami faile /etc/hosts, todėl srautas niekada nepasiekia tarpinio serverio. Įjunkite DNS agentui (-ams), kurio (-ių) srautą norite perimti.“ |

**Našlaitinės būsenos reklamjuostė:** kai puslapis aptinka po strigties likusią būseną (DNS klastojimą / CA / sistemos tarpinį serverį), kortelėje parodoma gintaro spalvos reklamjuostė — _„Ankstesnis seansas paliko sistemos būseną (DNS klastojimą, CA arba sistemos tarpinį serverį). Paleiskite taisymą, kad ją išvalytumėte.“_ — ir paryškinamas mygtukas **Taisyti**. `Repair` yra programos sluoksnio ProxyBridge vėliavėlės `--cleanup` atitikmuo (jis perduoda užduotį `repairMitm()` funkcijai faile `src/mitm/manager.ts`).

> MITM šakninė CA lieka įdiegta sustabdžius ir vėl paleidus, kad būtų išvengta pasikartojančių sudo
> užklausų (tokia pati elgsena kaip mitmproxy/Charles), todėl jos pašalinimas yra aiškiai pasirenkamas
> veiksmas **Pašalinti CA**, o ne tai, kas automatiškai įvyksta sustabdžius.

### 3.7 Perkeliamos konfigūracijos importavimas / eksportavimas

AgentBridge gali serializuoti **operatoriaus keičiamą** būseną į versijuotą JSON objektą, kad sąranką būtų galima atkartoti kituose kompiuteriuose. Serializatorius yra `src/lib/inspector/configPortability.ts` (`exportConfig()` / `importConfig()`), o validavimas atliekamas naudojant `AgentBridgeConfigSchema`.

Eksportuojamos tiksliai trys dalys (integruotosios numatytosios reikšmės sąmoningai **NĖRA** eksportuojamos, todėl importuojant jos niekada nedubliuojamos ir su jomis nekonfliktuojama):

| Laukas           | Šaltinis                                                                              | Pastabos                                                                     |
| ---------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `bypassPatterns` | naudotojo apibrėžti apėjimo šablonai (`agent_bridge_bypass`)                          | numatytieji bankų / valstybinių institucijų / okta šablonai neįtraukiami     |
| `customHosts`    | Traffic Inspector pasirinktiniai pagrindiniai kompiuteriai (`inspector_custom_hosts`) | kiekvienas: `{ host, kind: "llm"\|"app"\|"custom", label? }`                 |
| `agentMappings`  | kiekvieno agento modelių susiejimai (`agent_bridge_mappings`)                         | `{ [agentId]: [{ source, target }] }` kiekvienam susiejimų turinčiam agentui |

```jsonc
// GET /api/tools/agent-bridge/config
{
  "version": 1,
  "bypassPatterns": ["*.internal.example.com"],
  "customHosts": [{ "host": "api.example.com", "kind": "llm", "label": null }],
  "agentMappings": {
    "copilot": [{ "source": "gpt-4o", "target": "claude-sonnet-4.7" }],
  },
}
```

**Importavimo elgsena** (`POST /api/tools/agent-bridge/config`): apėjimo šablonai ir kiekvieno agento susiejimai **visiškai pakeičiami**; pasirinktiniai pagrindiniai kompiuteriai pridedami **idempotentiškai** (`INSERT OR IGNORE`). Atsakyme nurodoma, kiek kiekvieno tipo elementų buvo pritaikyta:

```jsonc
{ "ok": true, "bypassPatterns": 1, "customHosts": 1, "agents": 1 }
```

Kas **NEĮTRAUKTA** į konfigūraciją: serverio veikimo būsena, sertifikatų keliai, kiekvieno agento DNS būsena, aukštesniojo lygio CA kelias ir TPROXY nustatymai — tai yra pagrindinio kompiuterio / vykdymo aplinkos būsena, o ne perkeliamos nuostatos.

---

## §4 Kiekvieno agento informacija

| #   | Agentas            | Būsena        | Perimami pagrindiniai kompiuteriai                                 | Autentifikavimo tipas |
| --- | ------------------ | ------------- | ------------------------------------------------------------------ | --------------------- |
| 1   | **Antigravity**    | ✅ Palaikomas | `daily-cloudcode-pa.googleapis.com`, `cloudcode-pa.googleapis.com` | Firebase OAuth        |
| 2   | **Kiro (AWS)**     | ✅ Palaikomas | `prod.kiro.aws`, `dev.kiro.aws`                                    | AWS SigV4             |
| 3   | **GitHub Copilot** | ✅ Palaikomas | `api.githubcopilot.com`, `copilot-proxy.githubusercontent.com`     | GitHub OAuth          |
| 4   | **OpenAI Codex**   | ✅ Palaikomas | `api.openai.com` (Codex keliai), `chatgpt.com`                     | OpenAI raktas         |
| 5   | **Cursor IDE**     | ✅ Palaikomas | `api2.cursor.sh`, `api.cursor.sh`                                  | Cursor OAuth          |
| 6   | **Zed Industries** | ✅ Palaikomas | `api.zed.dev`, `llm.zed.dev`                                       | Zed OAuth             |
| 7   | **Claude Code**    | ✅ Palaikomas | `api.anthropic.com` (pasirenkama)                                  | Anthropic raktas      |
| 8   | **Open Code**      | ✅ Palaikomas | `openrouter.ai`, `api.openai.com` (zen keliai)                     | API raktas            |
| 9   | **Trae**           | 🔍 Tiriamas   | Nenustatyta — žr. §8                                               | Nenustatyta           |

### Sąrankos vediklio veiksmai (kiekvienam agentui)

Kiekvienoje agento kortelėje yra 3 veiksmų sąrankos vediklis:

1. **Patikrinkite būtinąsias sąlygas** — ar serveris veikia? Ar sertifikatas patikimas? Ar IDE įdiegta (aptinkama automatiškai)?
2. **Įjunkite DNS** — prideda įrašus į `/etc/hosts` (reikalingas sudo). Tiksliai parodo, kurios eilutės bus pridėtos.
3. **Susiekite modelius** — pasirenkama modelių susiejimo lentelė. Priimami pakaitos simboliai.

### Agento aptikimas

1–8 agentams AgentBridge bando automatiškai aptikti IDE diegimą:

```ts
export async function detectAgent(agentId: AgentId): Promise<DetectionResult>;
// Grąžina: { installed: boolean, version?: string, path?: string }
```

Aptikimui naudojami konkrečiai OS pritaikyti keliai ir dvejetainių failų patikros (pvz., `code --list-extensions | grep github.copilot`, skirta Copilot, `~/.config/antigravity/`, skirta Antigravity).

---

## §5 Saugumas

### Taikomos griežtos taisyklės

| Taisyklė                               | Taikymas                                                                                                |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **#12** `sanitizeErrorMessage`         | Visos apdorojimo programų klaidos išvalomos prieš įtraukiant jas į atsakymą arba buferį                 |
| **#13** Aplinkos perdavimas apvalkalui | Redaguojant `/etc/hosts` naudojama parinktis `env` — keliams netaikoma eilučių interpoliacija           |
| **#15 + #17** `isLocalOnlyPath()`      | `/api/tools/agent-bridge/` yra LOCAL_ONLY + SPAWN_CAPABLE — prieš autentifikavimą užtikrinamas loopback |

### Išimčių sąrašas jautriems pagrindiniams kompiuteriams

Išimčių sąrašas užtikrina, kad finansų įstaigų, OAuth/SSO teikėjų ir kitų jautrių pagrindinių kompiuterių srautas **niekada nebūtų iššifruojamas**. Jų TLS srautas perduodamas kaip skaidrus TCP tunelis — OmniRoute niekada nemato nešifruoto turinio.

Numatytieji išimčių šablonai:

- `*.bank.*`, `*.gov.*` (finansai / valdžios institucijos)
- `*.okta.com`, `*.auth0.com`, `*.microsoft.com` (SSO / tapatybės paslaugos)
- `*.apple.com`, `*.icloud.com` (Apple sistemos paslaugos)

Naudotojo pridėti išimčių šablonai saugomi lentelėje `agent_bridge_bypass` ir turi pirmenybę prieš visa kita.

### Slaptųjų duomenų maskavimas

Taikoma `maskSecrets()` iš `src/mitm/maskSecrets.ts`:

- Kiekvienam užklausos turiniui prieš `TrafficBuffer.push()`
- Kiekvienai antraštei prieš registruojant žurnale arba transliuojant

Šablonai: prieigos raktai su `sk-` / `ak-` / `pk-` priešdėliais, `Bearer` prieigos raktai ir bendrieji bent 40 simbolių ilgio prieigos raktai.

### Aukštesnio lygmens CA sertifikatas

Kai nustatytas `AGENTBRIDGE_UPSTREAM_CA_CERT`, paleidimo metu perskaitomas failas. Jei kelias egzistuoja, tačiau failo negalima perskaityti, AgentBridge užregistruoja aiškią klaidą ir atsisako paleidimo (taip išvengiama nepastebimų TLS trikčių įmonių aplinkose).

### Žinomi apribojimai

- **Prievadui 443 reikalingos privilegijos**: Linux sistemoje AgentBridge reikia Node dvejetainiam failui pritaikyti `setcap 'cap_net_bind_service=+ep'` arba paleisti naudojant `authbind`. Sąrankos vediklis pateikia konkrečiai OS skirtas instrukcijas.
- **Reikia iš naujo paleisti IDE**: po DNS peradresavimo IDE turi būti paleista iš naujo, kad įsigaliotų nauja pagrindinio kompiuterio vardų skyra.
- **Fiksuotai įrašyti OAuth prieigos raktai**: kai kurie agentai (Kiro, Antigravity) OAuth atnaujinimo prieigos raktus saugo vietoje. AgentBridge jų nekeičia — jis mato kiekvienos užklausos `Bearer` prieigos raktą, kuris prieš registruojant žurnale yra užmaskuojamas.
- **Electron sąsajoms reikia `NODE_EXTRA_CA_CERTS`**: IDE, kurių sąsaja veikia įtaisytosios Node/Electron vykdymo aplinkos pagrindu, nepaiso OS/NSS patikimumo saugyklos ir turi būti paleidžiamos iš apvalkalo nustačius `NODE_EXTRA_CA_CERTS` (žr. §3.2). Požymis, kai šio nustatymo nėra: IDE vidinė sistema autentifikuojama (MITM rodo `200`), tačiau naudotojo sąsajoje liekama atsijungus.
- **Keli tos pačios IDE diegimai yra nepriklausomi**: sistemos diegimas (pvz., `/usr/share/antigravity/antigravity`) ir vietinis naudotojo „Full“ diegimas (pvz., `~/AntigravityIDE_Full/antigravity-ide`) yra atskiri procesai su savo vykdymo aplinkomis — kiekvienas turi būti paleistas iš naujo įterpiant CA. Prieš paleisdami iš naujo pagal dvejetainio failo kelią nustatykite, kuris iš jų veikia.
- **Tapatybę nustato agento sistemos užklausa, o ne nukreiptas modelis**: kai agento modelį susiejate su kitu teikėju, atsakyme vis tiek nurodoma agento pirminė tapatybė (pvz., Antigravity atsako „Mane palaiko Gemini“), nes IDE ją įterpia į sistemos užklausą. Tikrąją vidinę sistemą patvirtinkite `call_logs` / `proxy_logs` (`provider`, `model`, `target_format`), o ne klausdami modelio, kas jis yra.

---

## §6 Trikčių šalinimas

### 443 prievado konfliktas

Jei kitas procesas jau klausosi 443 prievade (žiniatinklio serveris, VPN ir pan.):

```bash
lsof -i :443          # rasti procesą
sudo fuser -k 443/tcp  # priverstinai nutraukti (naudokite atsargiai)
```

Arba AgentBridge nustatymuose sukonfigūruokite neprivilegijuotą prievadą ir nustatykite `iptables` / `pf` peradresavimo taisykles.

### Sertifikatas nepatikimas

Jei paleidus AgentBridge IDE rodo TLS klaidas:

1. Patikrinkite, ar sertifikatas buvo įdiegtas: `security find-certificate -c "OmniRoute AgentBridge"` (macOS) arba `certutil -L -d sql:$HOME/.pki/nssdb` (Linux/NSS)
2. Kai kurios programos naudoja savo patikimų sertifikatų saugyklą (Firefox, Chrome Linux sistemoje). Dar kartą paleiskite „Trust Cert“ ir patikrinkite NSS / Firefox skirtą sertifikatų saugyklą.
3. Suteikę sertifikatui pasitikėjimą, paleiskite IDE iš naujo — aktyvūs TLS seansai naudoja ankstesnę pasitikėjimo būseną.

### IDE atsijungusi / „ryšio klaida“, nors CA yra patikima

Požymis: peradresavus DNS ir suteikus CA pasitikėjimą, Electron pagrįsta IDE (pvz., Antigravity)
atsidaro **atsijungusi** arba rodo autentifikavimo / ryšio klaidą, nors MITM žurnale matyti, kad
pradinės užklausos (`loadCodeAssist`, `fetchAvailableModels`, …) grąžina `200`.

Priežastis: IDE **komplektuojama Node/Electron vykdymo aplinka nepaiso OS patikimų sertifikatų saugyklos**. Vietinė
posistemė (Go kalbos serveris) pasitiki OS CA ir autentifikuojasi, tačiau Electron naudotojo sąsaja
nepasitiki, todėl naudotojo sąsaja mano, kad ryšio nėra.

Sprendimas (abu veiksmai): eksportuokite `NODE_EXTRA_CA_CERTS=<ca.crt>` **ir iš naujo paleiskite IDE iš to
apvalkalo**, o ne darbalaukio piktograma. Pirmiausia visiškai uždarykite IDE — Electron vieno egzemplioriaus užraktas reiškia,
kad antrasis paleidimas tik suaktyvina esamą procesą, o nauja aplinka ignoruojama. Žr. §3.2.
Tai atitinka viešą pirminio projekto pranešimą, kuriame atskiras agentas veikia per MITM, tačiau IDE
variantas neveikia naudojant tą pačią konfigūraciją.

### DNS pakeitimai nepritaikyti

Patikrinkite, ar `/etc/hosts` buvo atnaujintas:

```bash
grep "omniroute\|127.0.0.1.*github\|127.0.0.1.*cursor" /etc/hosts
```

Išvalykite DNS podėlį:

```bash
# macOS
sudo dscacheutil -flushcache && sudo killall -HUP mDNSResponder
# Linux (systemd-resolved)
sudo systemctl restart systemd-resolved
# Windows
ipconfig /flushdns
```

### IDE neaptikta

Automatiniam aptikimui naudojami įprasti diegimo keliai. Jei aptikti nepavyksta, nors IDE yra įdiegta:

- Patikrinkite, ar IDE vykdomasis failas yra nestandartinėje vietoje
- Sąrankos vediklis vis tiek veikia — aptikimo klaida tik reiškia, kad ženklelyje nebus rodomas diegimo kelias

### Apdorojimo programos klaidos (nepavyksta gauti duomenų iš pirminio serverio)

Jei AgentBridge perima užklausas, bet jos visos nepavyksta:

1. Patikrinkite, ar bent vienas paslaugų teikėjas prijungtas adresu `/dashboard/providers`
2. Patikrinkite OmniRoute serverio žurnalus: `APP_LOG_LEVEL=debug` faile `.env`
3. Patikrinkite, ar `OMNIROUTE_BASE_URL` nurodo tinkamą maršrutizatoriaus galinį tašką (numatytoji reikšmė: `http://127.0.0.1:20128`)

---

## §7 API žinynas

Visi maršrutai yra `LOCAL_ONLY` (pasiekiami tik per grįžtamąją sąsają; tai užtikrinama prieš autentifikavimą) ir `SPAWN_CAPABLE`. Žr. `src/server/authz/routeGuard.ts`.

Bazinis kelias: `/api/tools/agent-bridge/`

| Metodas             | Kelias                                         | Aprašymas                                                                                                                                               |
| ------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET                 | `/api/tools/agent-bridge/state`                | Visuotinė serverio būsena + kiekvieno agento aptikimo informacija ir būsena                                                                             |
| GET                 | `/api/tools/agent-bridge/agents`               | Registruotų agentų sąrašas (ID, pavadinimas, pagrindiniai kompiuteriai, tinkamumas, būsena)                                                             |
| GET                 | `/api/tools/agent-bridge/agents/{id}`          | Vieno agento būsena (paskirties konfigūracija + aptikimo informacija + išsaugota būsena)                                                                |
| PATCH               | `/api/tools/agent-bridge/agents/{id}`          | Atnaujinti agento `setup_completed`                                                                                                                     |
| GET                 | `/api/tools/agent-bridge/agents/{id}/detect`   | Paleisti agento aptikimo patikrą (`installed`, `version?`, `path?`)                                                                                     |
| POST                | `/api/tools/agent-bridge/agents/{id}/dns`      | Įjungti arba išjungti agento DNS (`{enabled: boolean}`)                                                                                                 |
| GET                 | `/api/tools/agent-bridge/agents/{id}/mappings` | Agento modelių susiejimai                                                                                                                               |
| PUT                 | `/api/tools/agent-bridge/agents/{id}/mappings` | Pakeisti modelių susiejimus                                                                                                                             |
| POST                | `/api/tools/agent-bridge/agents/{id}/reset`    | Atkurti numatytąją būseną: atšaukti šio agento DNS klastojimą, išvalyti jo susiejimus ir iš naujo nustatyti jo būseną (žr. §3.6)                        |
| POST                | `/api/tools/agent-bridge/server`               | Paleisti, sustabdyti arba paleisti iš naujo serverį (`action: "start"\|"stop"\|"restart"\|"trust-cert"\|"regenerate-cert"`)                             |
| GET                 | `/api/tools/agent-bridge/cert`                 | Sertifikato būsena (`exists`, `trusted`, `path`)                                                                                                        |
| POST                | `/api/tools/agent-bridge/cert`                 | Patikėti (įdiegti) MITM šakninę CA                                                                                                                      |
| DELETE              | `/api/tools/agent-bridge/cert`                 | Atšaukti pasitikėjimą MITM šaknine CA (pašalinti ją) — idempotentinė operacija (žr. §3.6)                                                               |
| POST                | `/api/tools/agent-bridge/cert/regenerate`      | Iš naujo sugeneruoti aktyvų sertifikatą nekeičiant sertifikato modelio (senasis galutinio subjekto sertifikatas arba šakninės CA rotacija — žr. §3.1)   |
| GET                 | `/api/tools/agent-bridge/cert/download`        | Srautiniu būdu pateikti aktyvų PEM sertifikatą atsisiųsti (`ca.crt` šakninės CA modelyje, `server.crt` senojo galutinio subjekto sertifikato dieginyje) |
| GET                 | `/api/tools/agent-bridge/bypass`               | Išimčių šablonų sąrašas (`default` + `user`)                                                                                                            |
| POST                | `/api/tools/agent-bridge/bypass`               | Visiškai pakeisti naudotojo apibrėžtus išimčių šablonus                                                                                                 |
| DELETE              | `/api/tools/agent-bridge/bypass?pattern=...`   | Pašalinti vieną naudotojo apibrėžtą išimties šabloną                                                                                                    |
| GET                 | `/api/tools/agent-bridge/diagnose`             | Perėmimo konvejerio savitikra (žr. §3.6)                                                                                                                |
| POST                | `/api/tools/agent-bridge/repair`               | Atšaukti našlaitinę MITM sistemos būseną (žr. §3.6)                                                                                                     |
| GET                 | `/api/tools/agent-bridge/config`               | Eksportuoti perkeliamą konfigūraciją JSON formatu (žr. §3.7)                                                                                            |
| POST                | `/api/tools/agent-bridge/config`               | Importuoti perkeliamą konfigūraciją JSON formatu (žr. §3.7)                                                                                             |
| GET                 | `/api/tools/agent-bridge/upstream-ca`          | Gauti sukonfigūruotą aukštesniojo lygmens CA kelią                                                                                                      |
| POST                | `/api/tools/agent-bridge/upstream-ca`          | Patikrinti ir išsaugoti aukštesniojo lygmens CA kelią                                                                                                   |
| POST                | `/api/tools/agent-bridge/upstream-ca/test`     | Tik patikrinti aukštesniojo lygmens CA kelią (bandomasis vykdymas) — neišsaugoma                                                                        |
| GET / POST / DELETE | `/api/tools/agent-bridge/tproxy`               | TPROXY skaidraus iššifravimo perėmimo režimas — žr. `docs/security/MITM-TPROXY-DECRYPT.md` (git; nekompiliuojama į `/docs`)                             |

Išsamios OpenAPI schemos: `docs/openapi.yaml` → žyma `AgentBridge`.

---

## §8 Veiksmų planas

### Trae tyrimas

Trae yra palyginti naujas DI programavimo asistentas. Prieš įgyvendinant apdorojimo modulį:

1. Identifikuoti vykdomąjį failą / plėtinį VS Code / JetBrains prekyvietėse arba kaip atskirą programą
2. Perimti srautą naudojant mitmproxy, kad būtų nustatyti API serveriai ir galinių taškų struktūros
3. Nustatyti autentifikavimo mechanizmą
4. Įvertinti, ar tęsti, atsižvelgiant į naudojimo sąlygas ir API aptinkamumą

Kol tyrimas nebaigtas, Trae kortelėje valdymo skydelyje rodoma žyma „Tiriama“ su nuoroda „Pranešti apie perspektyvumą“. Apdorojimo modulio ruošinys faile `src/mitm/handlers/trae.ts` pateikia struktūrizuotą klaidą `Dar neįgyvendinta`.

### Laukiantys agentai (būtinas MITM — nėra tinkinto bazinio URL palaikymo)

Toliau nurodyti įrankiai dabartinėse versijose nepalaiko tinkintų bazinių URL, todėl MITM yra vienintelis srauto perėmimo būdas. Perspektyvumo vertinimas dar neatliktas:

- **Windsurf** (Codeium/Cognition)
- **Amp** (Sourcegraph)
- **Amazon Q / Kiro CLI** (AWS Bedrock — atskirai nuo Kiro IDE)
- **Cowork** (Anthropic darbalaukio programa)

Pastaba: GitHub Copilot CLI ≥v1.0.19 palaiko `COPILOT_PROVIDER_BASE_URL` — šiam įrankiui vietoje MITM naudokite tiesioginę konfigūraciją.
