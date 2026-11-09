# OmniRoute A2A Server Documentation (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — OmniRoute älykkäänä reititysagenttina

A2A-rajapinnalla on kaksi puolta:

- **JSON-RPC 2.0** osoitteessa `POST /a2a` (ensisijainen aloituspiste, määritelty tiedostossa `src/app/a2a/route.ts`).
- **REST** polun `/api/a2a/*` alla koontinäyttöjä ja työkaluja varten (tila, tehtäväluettelo, peruutus).

Tehtäviä hallinnoi `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, oletusarvoinen TTL on 5 minuuttia). Taidot välitetään suoritettaviksi `A2A_SKILL_HANDLERS`-käsittelijöiden kautta tiedostossa `src/lib/a2a/taskExecution.ts`.

## Agentin löytäminen

```bash
curl http://localhost:20128/.well-known/agent.json
```

Palauttaa Agent Card -kuvauksen, joka sisältää OmniRouten ominaisuudet, taidot ja todennusvaatimukset.

Agent Card -kuvauksen `version`-kentän arvo saadaan muuttujasta `process.env.npm_package_version` (katso `src/app/.well-known/agent.json/route.ts:13`), joten se pysyy automaattisesti synkronoituna `package.json`-tiedoston kanssa jokaisessa julkaisussa.

---

## Todennus

Kaikki `/a2a`-pyynnöt edellyttävät API-avainta `Authorization`-otsakkeessa:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Jos palvelimelle ei ole määritetty API-avainta, todennus ohitetaan.

## Käyttöönotto

A2A:ta hallitaan **Endpoints → A2A** -valitsimella, ja se on oletusarvoisesti poistettu käytöstä. Kun se on poistettu käytöstä,
`GET /api/a2a/status` ilmoittaa `status: "disabled"` ja `online: false`; JSON-RPC-kutsut osoitteeseen
`POST /a2a` palauttavat HTTP 503 -vastauksen sekä JSON-RPC-virhekoodin `-32000`.

---

## JSON-RPC 2.0 -menetelmät

### `message/send` — Synkroninen suoritus

Lähettää viestin taidolle ja odottaa täydellistä vastausta.

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/send",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Write a hello world in Python"}],
      "metadata": {"model": "auto", "combo": "fast-coding"}
    }
  }'
```

`smart-routing`-taidossa `metadata.combo` ohittaa eksplisiittisesti
`metadata.model`-arvon yhdyskäytäväpyynnössä. Se lähetetään varsinaisena `model`-arvona
eikä ohitettavana `x-combo`-JSON-kenttänä. Yhdyskäytävän normaali API-avaimeen perustuva ja
kohdekohtainen valtuutus on yhä voimassa. Virheellinen tai tyhjä yhdistelmä hylätään.

Tulos sisältää kentät `requested_combo` (kutsujan aikomus), `dispatched_model`
(varsinainen yhdyskäytäväpyyntö), `response_model` (yhdyskäytävän vastaus) ja
`confirmed_combo`. Viimeisen kentän arvo on `null`, ellei yhdyskäytävä nimenomaisesti
yksilöi yhdistelmää. A2A-päätöslokit kohdistavat suorituksen vain
vahvistettuun yhdistelmään ja säilyttävät vahvistamattoman pyynnön `requestedCombo`-arvona.

**Vastaus:**

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "result": {
    "task": { "id": "uuid", "state": "completed" },
    "artifacts": [{ "type": "text", "content": "..." }],
    "metadata": {
      "routing_explanation": "Selected claude-sonnet via provider \"anthropic\" (latency: 1200ms, cost: $0.003)",
      "requested_combo": "fast-coding",
      "confirmed_combo": null,
      "dispatched_model": "fast-coding",
      "response_model": "claude-sonnet",
      "cost_envelope": { "estimated": 0.005, "actual": 0.003, "currency": "USD" },
      "resilience_trace": [
        { "event": "primary_selected", "provider": "anthropic", "timestamp": "..." }
      ],
      "policy_verdict": { "allowed": true, "reason": "within budget and quota limits" }
    }
  }
}
```

### `message/stream` — SSE-suoratoisto

Toimii kuten `message/send`, mutta palauttaa Server-Sent Events -tapahtumia reaaliaikaista suoratoistoa varten.

```bash
curl -N -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/stream",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Explain quantum computing"}]
    }
  }'
```

**SSE-tapahtumat:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Tehtävän tilan kysely

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Tehtävän peruuttaminen

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Käytettävissä olevat taidot

OmniRoute paljastaa 6 A2A -taitoa, jotka on yhdistetty `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Jokainen taitomoduuli sijaitsee `src/lib/a2a/skills/` ssä.

| Taito                   | ID                   | Kuvaus                                                                                                                                                        | Tunnisteet                  | Esimerkkejä                                       |
| :---------------------- | :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ | :-------------------------- | :------------------------------------------------ |
| Älykäs reititys         | `smart-routing`      | Ohjaa kehotteen optimaalisen provider/combo läpi OmniRoute:n yhdistelmämoottorin + pisteytysten avulla                                                        | reititys, palveluntarjoajat | "Reittiä tämä kehote parhaan mallin kautta"       |
| Kiintiöiden hallinta    | `quota-management`   | Raportoi palveluntarjoajan kiintiön tilan, auttaa soittajia päättämään, milloin throttle/switch                                                               | kiintiö, palveluntarjoajat  | "Tarkista antrooppinen kiintiö"                   |
| Palveluntarjoajan löytö | `provider-discovery` | Luetteloi asennetut palveluntarjoajat ominaisuuksineen, vapaan tason liput, OAuth tilan                                                                       | tarjoajat, löytö            | "Mitä palveluntarjoajia on saatavilla?"           |
| Kustannusanalyysi       | `cost-analysis`      | Arvio request/conversation :n kustannuksista + -luettelon viimeaikaisen käytön perusteella                                                                    | hinta, käyttö               | "Arvio tämän keskustelun kustannuksista"          |
| Terveysraportti         | `health-report`      | Aggregaatit katkaisija, jäähdytys, lukitustila palveluntarjoajakohtaisesti                                                                                    | terveyttä, kestävyyttä      | "Näytä kaikkien palveluntarjoajien terveydentila" |
| Listaa ominaisuudet     | `list-capabilities`  | Palauttaa koko 45 merkinnän Agent Skills -luettelon (23 API + 21 CLI + 1 konfiguraatio) merkintätaulukkona raaka SKILL.md URLs llä kontekstin lisäystä varten | luettelo, löytö, taidot     | "Lista kaikki OmniRoute -ominaisuudet"            |

> Agenttikortti tulee pitää linjassa reaaliaikaisen 385-palveluntarjoajan luettelon kanssa; palveluntarjoajien määrät ja free/no-auth metatiedot saadaan ajonaikaisesta rekisteristä.

### `list-capabilities` Skill Detail

`list-capabilities` taito on erityisen hyödyllinen ulkoisille agenteille, joiden on selvitettävä, mitä OmniRoute paljastaa ennen API -kutsujen lähettämistä. Se palauttaa jäsennellyn merkintätaulukon artefaktin:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Jokainen rivi sisältää `rawUrl` sarakkeen, jotta agentit voivat heti hakea koko SKILL.md. `metadata.totalSkills` -kenttä heijastaa luettelon kokoa (45 tänään). Toteutus: `src/lib/a2a/skills/listCapabilities.ts`. Katso myös [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (apu)

JSON-RPC-päätepiste `/a2a` on kanoninen A2A tulopiste. Alla olevat REST päätepisteet tarjoavat lisäpääsyn kojelaudoille ja ulkoisille työkaluille:

| Päätepiste                   | Menetelmä | Kuvaus                                                           | Tod                                                                                                        |
| :--------------------------- | :-------- | :--------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------- |
| `/api/a2a/status`            | GET       | Palvelimen tila, rekisteröidyt taidot                            | (julkinen)                                                                                                 |
| `/api/a2a/tasks`             | GET       | Listaa tehtävät suodattimilla                                    | hallinta tai API -avain (katso alla)                                                                       |
| `/api/a2a/tasks/[id]`        | GET       | Hae tehtävä ID                                                   | hallinta tai API -avain (katso alla)                                                                       |
| `/api/a2a/tasks/[id]/cancel` | POST      | Peruuta käynnissä oleva tehtävä                                  | hallinta tai API -avain (katso alla)                                                                       |
| `/.well-known/agent.json`    | GET       | Agenttikortti (A2A -löytö)                                       | (julkinen, välimuistissa 3600s)                                                                            |
| `/api/a2a/tasks`             | POST      | Saapuva delegaatio OmniConductor -laivastoon (Conductor PRD RF5) | sama kuin `GET`, plus `OMNIROUTE_API_KEY` jos asetettu, kun `REQUIRE_API_KEY` on pois päältä; `a2aEnabled` |

Kuka pääsee `/api/a2a/tasks*` -reiteille, riippuu kirjautumis- ja API-avaimen asetuksista:

- `requireLogin=true` (oletus): väliohjelmisto hyväksyy vain hallintatiedot (kojelautaistunto, `manage` -scope API avain, `oma_` -käyttöoikeustunnus) ja `OMNIROUTE_API_KEY`. Tavallinen päättelyavain saa `403`. `Authorization` otsikossa väliohjelmisto ottaa `OMNIROUTE_API_KEY` vain nimellä `Bearer <key>`; paljas avain tai sarkain `Bearer` jälkeen saa `401`.
- `requireLogin=false` tai silmukkaikkuna ennen käyttöönottoa: `REQUIRE_API_KEY=true` llä kaikki kelvolliset OmniRoute API -avain- tai hallintatiedot hyväksytään ja anonyymit soittajat saavat `401`; `REQUIRE_API_KEY` pois reitit ovat auki.
- `POST /api/a2a/tasks` vaatii lisäksi `OMNIROUTE_API_KEY` `Authorization` -otsikossa, kun kyseinen muuttuja on asetettu ja `REQUIRE_API_KEY` on pois päältä. Muita otsikoita, kuten `x-api-key`, ei lasketa mukaan. Kun kirjautuminen on pois päältä tai ennen käyttöönottoa, avain kulkee `Bearer` etuliitteellä tai ilman; Kun kirjautuminen on päällä, vain `Bearer <key>` pääsee väliohjelmiston ohi.

Kun valtuustieto vaaditaan, `read` -scope `oma_` -tunnus toimii vain `GET`.

**Saapuvien johtajien delegaatio (`POST /api/a2a/tasks`):** ulkoiset A2A agentit delegoivat koodaustyöt OmniConductor laivastolle OmniRoute kautta. Runko: vain `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — Kapellimestari taidot (agenttikortilla ilmoitetut) ovat siirrettävissä; `metadata.conductor.repo.url` vaaditaan (laivasto toimii git repoissa). Reitti muuttuu keskittimen `POST /v1/tasks` ksi käyttämällä palvelinpuolen `CONDUCTOR_ORCHESTRATOR_TOKEN` (varausvaihtoehto `CONDUCTOR_HUB_TOKEN`) ja palauttaa `201 { conductor_task_id, state: "submitted" }`; tehtävätilat virtaavat takaisin SSE→A2A peilin (RF1) läpi ja ovat näkyvissä `GET /api/a2a/tasks?skill=conductor` kautta .

---

## Uuden taidon lisääminen

1. **Luo taitotiedosto:** `src/lib/a2a/skills/<your-skill>.ts`

   Vie asynkroninen funktio `(task: A2ATask, caller?: A2ACallerContext) => Promise<{ artifacts, metadata }>`. Seuraa olemassa olevien taitojen, kuten `smartRouting.ts` muotoa. Jos taito kutsuu takaisin OmniRoute HTTP kautta, rakenna otsikot `buildSelfLoopHeaders(caller)` llä `src/lib/a2a/selfLoopAuth.ts` :stä, jotta puhelu suoritetaan A2A -soittajan avaimella, ei `OMNIROUTE_API_KEY`, ja välitä `redirect: "error"` `fetch` lle, jotta uudelleenohjaus ei koskaan saa avainta. Auttaja rakentaa vain otsikot; jokainen taito määrittää itse uudelleenohjauskäytännön. Se heittää `UnsafeSelfLoopTargetError` avaimen liittämisen sijaan, kun ratkaistu perus- URL on pelkkä http yksityisen verkon ulkopuolella (palautus, säilön tai palvelun nimi ja yksityiset osoitteet ovat kunnossa) tai sillä on valtuustiedot, joten taidon, joka nielee hylätyt puhelut, on poistettava tämä virhe.

2. **Rekisterinpitäjä:** `src/lib/a2a/taskExecution.ts`:ssa lisää merkintä `A2A_SKILL_HANDLERS`:hen:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...existing skills
     "your-skill": async (task, caller) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task, caller);
     },
   };
   ```

3. **Paljasta agenttikortissa:** `src/lib/a2a/agentCardMetadata.ts` ssa (jakaneet `/.well-known/agent.json` ja `/.well-known/agent-card.json`), lisää `skills` taulukkoon:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **Kirjoita testit:** `tests/unit/a2a-<your-skill>.test.ts`. Kansi onnellinen polku + virhepolku.

5. **Asiakirja** uusi taito tämän tiedoston `Available Skills` taulukossa.

---

## Tehtävien elinaika

Tehtävät vanhenevat `ttlMinutes`-ajan kuluttua (oletus 5 min) — asetus määritetään `A2ATaskManager`-konstruktorissa tiedostossa `src/lib/a2a/taskManager.ts:82`. Voit mukauttaa sitä luomalla oman version `A2ATaskManager`-instanssista ja välittämällä eri arvon (esim. `new A2ATaskManager(15)`, kun elinaika on 15 minuuttia). Taustalla toimiva ajastettu prosessi poistaa vanhentuneet tehtävät 60 sekunnin välein.

---

## Tehtävän elinkaari

```
lähetetty → käsittelyssä → valmis
                         → epäonnistunut
                         → peruutettu
```

- Tehtävät vanhenevat oletusarvoisesti 5 minuutin kuluttua (katso [Tehtävien elinaika](#task-ttl))
- Lopputilat: `completed`, `failed`, `cancelled`
- Tapahtumaloki seuraa jokaista tilasiirtymää

---

## Virhekoodit

| Koodi  | Merkitys                             |
| :----- | :----------------------------------- |
| -32700 | Jäsennysvirhe (virheellinen JSON)    |
| -32600 | Virheellinen pyyntö / Ei valtuutettu |
| -32601 | Menetelmää tai taitoa ei löytynyt    |
| -32602 | Virheelliset parametrit              |
| -32603 | Sisäinen virhe                       |
| -32000 | A2A-päätepiste on poistettu käytöstä |

---

## Integraatioesimerkkejä

### Python (pyynnöt)

```python
import requests

resp = requests.post("http://localhost:20128/a2a", json={
    "jsonrpc": "2.0", "id": "1",
    "method": "message/send",
    "params": {
        "skill": "smart-routing",
        "messages": [{"role": "user", "content": "Hello"}]
    }
}, headers={"Authorization": "Bearer YOUR_KEY"})

result = resp.json()["result"]
print(result["artifacts"][0]["content"])
print(result["metadata"]["routing_explanation"])
```

### TypeScript (hae)

```typescript
const resp = await fetch("http://localhost:20128/a2a", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_KEY",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: "1",
    method: "message/send",
    params: {
      skill: "smart-routing",
      messages: [{ role: "user", content: "Hello" }],
    },
  }),
});
const { result } = await resp.json();
console.log(result.metadata.routing_explanation);
```
