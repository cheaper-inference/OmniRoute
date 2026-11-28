# Quota Sharing Engine (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇧🇦 [bs](../../../bs/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Documentreferentie**: `docs/routing/QUOTA_SHARE.md`
> Onderdeel van groep B (plannen 16 + 22).

---

## Overzicht

De engine voor quotumdeling verdeelt het tijdsgebonden quotum van een provider (bijv. het
5-uursvenster van Codex, Kimi 1500 req/h) eerlijk over meerdere API-sleutels die
dezelfde verbinding delen.

**Probleem dat hiermee wordt opgelost:** OmniRoute gebruikt veel API-sleutels via hetzelfde upstream
provideraccount. Zonder logica voor quotumdeling kan een piek van sleutel A het
providerquotum voor dat uur uitputten, waardoor sleutels B en C worden geblokkeerd totdat het venster wordt gereset.
De engine voorkomt dit door:

1. Het voortschrijdende verbruik van elke sleutel per dimensie (%, verzoeken, tokens, $) bij te houden.
2. Een werkbehoudend algoritme voor eerlijke verdeling toe te passen: een sleutel mag ongebruikte
   aandelen benutten zolang de globale pool niet verzadigd is.
3. Het resultaat in het kritieke pad (`chatCore.ts`) af te dwingen voordat het verzoek
   de upstream executor bereikt.

---

## Algoritme: eerlijk delen van werkbesparend

Geïmplementeerd in `src/lib/quota/fairShare.ts`.

### Modi

| Voorwaarde                                 | Modus        | Gedrag                                                              |
| ------------------------------------------ | ------------ | ------------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Genereus** | Sleutel kan lenen tot de globale limiet minus het verbruikte totaal |
| `globalUsedPercent >= saturationThreshold` | **Streng**   | Handhaaf de individuele eerlijke verdeling strikt                   |

Standaard `saturationThreshold = 0.5` (env `QUOTA_SATURATION_THRESHOLD`).

Deze twee modi beschrijven een pool in de standaardleningsmodus `saturation`. Een zwembad in `consent` modus hanteert altijd de strikte regels, ongeacht de verzadiging. Zie [Toegestaan lenen (opt-in per pool)](#consented-lending-per-pool-opt-in).

### Beslissing per dimensie

Voor elke actieve dimensie in de pool berekent de engine:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = current rolling value for this key (from QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Voor `percent` dimensies komt `consumed` in plaats daarvan uit het attributieboek (zie [Percentagedimensies: attributie per sleutel](#percent-dimensions-per-key-attribution) ).

Dan:

- **`policy = hard`** : als `consumed > fairShareAllowed` en modus strikt → zijn** blok** .
- **`policy = soft`** : als `consumed > fairShareAllowed` en modus strikt → zijn** straffen** (deprioriteit in combo; nooit hard-block).
- **`policy = burst`** : toestaan zolang er mondiale speelruimte bestaat, ongeacht een eerlijk aandeel.

### Kap absoluut

`capValue` + `capUnit` voor een toewijzing is een hard plafond, onafhankelijk van de modus of het beleid. Elke dimensie waar `consumed >= capValue` altijd is** blokken** het verzoek. Voor een `percent` -cap is `consumed` alleen het deel dat aan de sleutel wordt toegeschreven.

### Multidimensionale controle

Een verzoek wordt geblokkeerd als** elk** afmeting in het zwembad zou dit blokkeren. Afmetingen zijn onafhankelijk — een uitputting van 5u% heeft geen invloed op de wekelijkse% dimensie.

### Lenen

In de genereuze modus kan een sleutel waarvan de toewijzing te weinig wordt geconsumeerd, het overschot van de niet-toegewezen aandelen van andere sleutels gebruiken. De formule is:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

waar `consumedByOtherKeys = consumedTotal - consumedByThisKey`. De teto global (pool `limit` voor die dimensie) is altijd het harde plafond.

### Toegestane leningen (opt-in per pool)

Elke pool heeft een leenmodus. `saturation` is de standaard en behoudt de bovenstaande regels. In `consent` modus geeft een `hard` sleutel zijn aandeel alleen door binnen de capaciteit die andere sleutels hebben afgesproken te lenen. De beheerder stelt de modus van elke pool in. Elke sleutelhouder stelt zijn eigen toestemming in via [Uitleentoestemming](#lending-consent).

Een toestemming is een percentage van 0 tot 100 en een optionele deadline in milliseconden. De sleutel leent dat percentage van zijn inactieve deel uit terwijl de deadline in de toekomst ligt.

Voor één dimensie is `L` de effectieve limiet: de planlimiet maal de accounts in de pool. De poort berekent voor de aanvragende sleutel:

```
share_k         = w_k / 100 × L
idle_k          = max(0, share_k − consumed_k)
lent            = Σ over the other keys of lend_k / 100 × idle_k
taken           = Σ over the other keys of max(0, consumed_k − share_k)
borrowAvailable = max(0, lent − taken)
```

`w_k` is het gewicht van de sleutel, of `100 / n` voor elke sleutel als geen enkel gewicht hoger is dan 0. `lend_k` is het actieve percentage van de sleutel, en 0 zodra de deadline is verstreken. De eigen toestemming van de aanvragende sleutel telt nooit mee. Een `hard` sleutel wordt geweigerd zodra het verbruik zijn aandeel plus `borrowAvailable` bereikt.

Capaciteit waarvoor geen toewijzingsclaims gelden (100 min de som van de gewichten) is niet uitleenbaar. Geen enkele sleutel stemde ermee in om deze uit te lenen.

**Voorbeeld.** `L` is 1000.

| Sleutel | Gewicht | Deel | Verbruikt | leent |
| ------- | ------- | ---- | --------- | ----- |
| A       | 50      | 500  | 530       | 0%    |
| B       | 30      | 300  | 100       | 50%   |
| C       | 0       | 0    | 60        | 0%    |

- B leent 50% van zijn ongebruikte 200, dat is 100. C heeft al 60 boven zijn deel opgenomen. A mag 40 lenen.
- A wordt geserveerd op 530 en geweigerd zodra het verbruik 540 bereikt.
- Voordat C iets gebruikte, met A op of onder zijn aandeel, kon C 100 lenen.
- Voordat C iets gebruikte, met A op 530, kon C 70 lenen.

**Geen gewicht.** Een sleutel met gewicht 0 heeft een aandeel van 0. De sleutel wordt alleen geserveerd als het verbruik lager is dan wat anderen uitlenen. Wanneer niemand leent, wordt deze vanaf het eerste verzoek geweigerd.

**Deadlines.** Bij geen enkele achtergrondtaak verloopt een toestemming. Bij elk verzoek wordt de deadline vergeleken met de eigen tijd, en er is een deadline verstreken die gelijk is aan die tijd. Een opgeslagen deadline die geen eindig getal is, of voorbij de grootste datum ligt die een `Date` kan bevatten, geldt als verstreken.

**`soft` en `burst`.** Kredietverlening beperkt hen niet. Een `soft` sleutel krijgt geen prioriteit zodra hij zijn aandeel heeft overschreden. Een `burst` sleutel gaat voorbij terwijl het zwembad ruimte heeft. Het zwembadplafond weigert nog steeds elke sleutel zodra het totaal van het zwembad de limiet bereikt.

**Kosten op het aanvraagpad.** Een `saturation` pool leest niets meer dan voorheen. In een `consent` pool leest een telbare dimensie de andere sleutels alleen voor een `hard` sleutel op of boven zijn aandeel, terwijl een andere sleutel leent. Vervolgens wordt er één keer gelezen per andere sleutel, parallel. Een mislukte leesbewerking telt als een verbruik van 0 voor die sleutel. Een `percent` dimensie voegt geen leeswaarde toe, omdat het attributieboek elke sleutel bevat.

**Een zwembad bewerken.** Bij een bewerking blijft de toestemming van de sleutels behouden die blijven. Dit geldt voor toewijzingswijzigingen, groepsbrede vervangingen en `ensure` oproepen. Een verwijderde sleutel verliest zijn toestemming, en een opnieuw toegevoegde sleutel begint bij 0. De beheerdersroutes retourneren de toestemming van elke sleutel en schrijven deze nooit. Als u een pool terugschakelt naar `saturation` blijft elke opgeslagen toestemming behouden, wat in die modus geen effect heeft. Als u de pool opnieuw naar `consent` overschakelt, worden de opgeslagen toestemmingen waarvan de deadline nog niet is verstreken, opnieuw geactiveerd. Een sleutelhouder kan in beide modi een opgeslagen toestemming wissen.

**Upgraden.** Als de kolommen `lending_percent` en `lending_until` al bestaan, wordt bij de migratie alleen `borrow_mode` toegevoegd en blijven de opgeslagen percentages zoals ze zijn. Elke pool start in `saturation` modus. Schakel `consent` per pool in de poolwizard in. Uit de opgeslagen waarden wordt niets afgeleid.

**Beperkingen.**

- Een kredietverstrekker kan de pool aan het plafond vinden voordat hij zijn eigen aandeel gebruikt. Capaciteit die anderen hebben geleend, telt mee voor het totaal van de pool.
- De controle loopt vóór de aanvraag en reserveert niets. Gelijktijdige verzoeken lezen het verbruik voordat er iets wordt geregistreerd, zodat de uitgeleende capaciteit meer dan één keer kan worden besteed, begrensd door de verzoeken tijdens de vlucht. De aandelencontrole van `saturation` modus heeft dezelfde eigenschap.

---

## Teller met schuivend venster

Geïmplementeerd in `src/lib/quota/sqliteQuotaStore.ts` en `redisQuotaStore.ts`.

Twee buckets per `(apiKeyId, dimensionKey)`:

- `curr`: huidige bucket (`floor(nowMs / windowMs)`)
- `prev`: vorige bucket (`curr - 1`)

Effectieve voortschrijdende waarde:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Nauwkeurigheid**: ~99% nauwkeurig. De fout bedraagt maximaal 1% van de venstergrootte bij de
grens tussen buckets (inherent aan de benadering met 2 buckets).

### Gelijktijdigheid

SQLite-driver: een in-memory mutex per `(apiKeyId | dimensionKey)`-sleutel voorkomt de
racecondition bij lezen-wijzigen-schrijven. Het patroon volgt de anti-thundering-herd-aanpak van `src/sse/services/auth.ts`.

Redis-driver: Lua EVAL-script voor atomair ophogen — wordt uitgevoerd als één Redis-opdracht.

---

## Drivers

### SQLite (standaard, geen installatie vereist)

- Tabel: `quota_consumption` (zie migratie `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Het meest geschikt voor implementaties met één instantie.
- Alle persistentie vindt plaats in de bestaande OmniRoute SQLite-database (`DATA_DIR/storage.sqlite`).

### Redis (optioneel, meerdere instanties)

- Vereist het npm-pakket `ioredis`.
- Tellers worden opgeslagen in Redis; metadata (pools/toewijzingen) blijven in SQLite.
- Het meest geschikt voor implementaties met meerdere replica's waarbij tellers moeten worden gedeeld.

### Wisselen van driver

Via de instellingeninterface (`/dashboard/settings` → Quotaopslag), of via omgevingsvariabelen:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

De database-instelling heeft voorrang op de omgevingsvariabele. Als `driver=redis` maar de URL ontbreekt of
`ioredis` niet is geïnstalleerd, valt de factory terug op SQLite en wordt een waarschuwing gelogd.

Volgorde voor driverselectie:

1. Database-instelling `quotaStore.driver`
2. Omgevingsvariabele `QUOTA_STORE_DRIVER`
3. Standaard: `sqlite`

---

## Multidimensionaal

Een zwembad kan meerdere afmetingen hebben. Elke dimensie is onafhankelijk:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // global pool ceiling for this dimension
}
```

**Voorbeeld: Codex plan** (5u% + wekelijks%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Een aanvraag moet aan alle afmetingen voldoen om te worden toegestaan.

### Percentage dimensies: attributie per sleutel

Een procentplan rapporteert één gebruikscijfer per account en abonnementsperiode. De aanbieder geeft geen teller per API sleutel.

Om dat bedrag over de sleutels te verdelen, houdt elke pool een attributieboek bij per account en per planvenster. `src/lib/quota/percentLedger.ts` houdt de regels van het boek vast. `src/lib/quota/percentAttribution.ts` maakt van het boek de cijfers die de handhaving hanteert. Het resultaat is een schatting die is opgebouwd uit de tokens van elke belangrijke route.

#### Lezingen die het boek in beweging brengen

Het boek beweegt alleen op het eigen cijfer van de aanbieder voor het gevraagde planvenster. Deze verbindingen rapporteren er één:

| Aanbieder                        | Ramen plannen  |
| -------------------------------- | -------------- |
| Claude, via een OAuth verbinding | `5h`, `weekly` |
| Codex                            | `5h`, `weekly` |

Deze tellen niet mee als lezing:

- een reactie die de providerklant als oud markeert
- een Claude venster waarvan het percentage de aanbieder niet heeft gerapporteerd
- de figuur van een ander raam, of in het slechtste geval over ramen
- de terugval van de rate limit header
- een mislukte lezing

Andere aanbieders, waaronder Claude met een API sleutel, hebben geen boekje. Voor elke sleutel wordt 0 in rekening gebracht op basis van hun procentuele dimensies, net als vóór deze wijziging.

Een meting deelt de cache van 30 seconden van het verzadigingssignaal. Een Claude -lezing wordt gedateerd op het moment waarop het cijfer werd waargenomen in antwoordheaders of werd gelezen vanaf het gebruikseindpunt, wanneer dat tijdstip bekend is. Andere metingen zijn gedateerd op het moment dat dat cache-item werd gebouwd.

#### Wat het boek bewaart

Elk geregistreerd verzoek voegt zijn tokens één keer toe aan een teller per pool, account en sleutel. Een teller groeit alleen maar. Het boek bevat drie dingen:

- de basislijn: het cijfer toen het boek werd geopend of het raam voor het laatst werd omgedraaid
- het laatst toegepaste cijfer
- per sleutel, zijn tokenteller op datzelfde moment, zijn merkteken genoemd

Het boek wordt bijgewerkt wanneer handhaving of de gebruiksroute de toeschrijving berekent. Schrijfbewerkingen worden vergeleken en ingesteld op een revisienummer. Een schrijver die bij een nieuwe lezing nieuwe pogingen verliest.

#### Hoe het deel van een sleutel wordt berekend

Het deel van elke sleutel wordt berekend wanneer het boek wordt gelezen. De groei van het cijfer sinds de basislijn wordt verdeeld over de sleutels in verhouding tot de tokens die elk sinds zijn merkteken is gerouteerd.

Together verklaren deze tokens maximaal één punt van het cijfer per `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` tokens (standaard 1.000). De groei die zij niet verklaren is extern. De basislijn is ook extern.

Een boek opent bijvoorbeeld op 0. Sleutel A stuurt vervolgens 900.000 tokens door en sleutel B stuurt 100.000 tokens. Bij een cijfer van 60 is het aandeel van A 54 punten en het aandeel van B 6.

Een teller onder het sleutelteken is opnieuw gestart en telt volledig. Een sleutel zonder markering, zoals een sleutel die in het midden van een venster bij de pool hoort, telt al zijn tokens. Een cijfer dat achterloopt op de tokens veroorzaakt een fout die bij de volgende lezing verdwijnt. Het stapelt zich niet op.

`QUOTA_PERCENT_MIN_TOKENS_PER_POINT` wordt bij elke toeschrijving gelezen. Een waarde die geen eindig getal van minstens 1 is, valt terug naar 1.000.

#### Hoe een lezing het boek verandert

De eerste matchingregel is van toepassing:

1. **Nog geen boek:** de lezing opent het boek. Het cijfer is de basislijn en elke teller is gemarkeerd.
2. **Oudere lectuur:** een meting die dateert van vóór de laatst toegepaste meting wordt genegeerd. Dat geldt ook voor een meting waarvan de resettijd meer dan 30 minuten eerder is dan de opgeslagen tijd.
3. **Nieuw providervenster:** een resettijd die meer dan 30 minuten later is dan de opgeslagen tijd, draait het boek om. Het cijfer wordt de basislijn en elke teller wordt opnieuw gemarkeerd. Sleutels zonder teller verlaten het boek.
4. **Beëindigd venster:** een opgeslagen resettijd die niet na de datatijd van de meting ligt, betekent dat het venster is beëindigd. Het lezen verandert het boek, wat het ook is.
5. **Hoger cijfer:** alleen het laatste cijfer beweegt. De basislijn en de markeringen blijven.
6. **Hetzelfde cijfer:** het cijfer, de basislijn en de cijfers blijven behouden. Alleen een resettijd die het boek mist, is geschreven.
7. **Onderste figuur:** een lager cijfer wordt nooit als zodanig toegepast. Het boek verandert pas als er drie dingen gelden. Het is minstens twee minuten nieuwer dan de laatst toegepaste meting. Niets zegt dat het raam hetzelfde geopende raam is. Dat is ruim een punt lager.

Het raam geldt als hetzelfde geopende raam als er drie dingen gelden. Beide resettijden zijn bekend. Ze bevinden zich binnen 30 minuten van elkaar. De opgeslagen versie loopt nog steeds voor op de meting. Een lager cijfer binnen dat raam verandert niets.

Een resettijd wordt alleen opgeslagen zolang deze voorloopt op de datatijd van de meting waarop deze betrekking heeft. Een hoger getal slaat de resettijd van de meting op wanneer dat bruikbaar is, en bewaart anders het opgeslagen getal. Een gelijk cijfer registreert alleen de resettijd van het boek als het boek er geen heeft. Het verandert verder niets. Een lager cijfer dat het boek niet omzet, registreert geen resettijd.

#### Wanneer het boek wordt gebruikt

Na het lezen wordt het boek gebruikt, tenzij de opgeslagen resettijd niet na de huidige tijd ligt. Dat geval doet zich voor wanneer een meting die vlak voor de reset is gedaan, zoals een meting uit de cache, vlak daarna wordt waargenomen.

Zonder een bruikbare meting wordt het opgeslagen boek alleen gebruikt zolang het nog het boek van het huidige venster kan zijn. Dat geldt in twee gevallen:

- de resettijd is bekend en ligt nog in het verschiet
- het heeft geen resettijd en de laatste meting waardoor het is gewijzigd, is maximaal 15 minuten oud

Anders wordt er niets toegeschreven, zoals wanneer er geen boek is. Een boek waarvan de opgeslagen resettijd is verstreken, wordt nooit in rekening gebracht.

#### Handhaving

Het verbruik van een sleutel in procenten is het toegeschreven deel plus een deel van het externe deel. Het externe deel gebruikt eerst de capaciteitsclaims zonder toewijzing (100 minus de som van de gewichten). Alleen het overschot wordt per gewicht onder de sleutels verdeeld.

Dat verbruik wordt vergeleken met het eerlijke aandeel van de sleutel, net als voor elke andere dimensie. De strikte modus start nog steeds wanneer het verzadigingssignaal `QUOTA_SATURATION_THRESHOLD` bereikt (standaard 0,5). Elk getal wordt geschaald op basis van de effectieve limiet: de limiet per account maal het aantal accounts in de pool.

Een absolute limiet met `capUnit: "percent"` telt alleen het deel dat aan de sleutel wordt toegeschreven, op dezelfde manier geschaald. Neem een limiet per account van 100 en k-accounts. Een limiet van N wordt dan bereikt wanneer het sleutelgedeelte van het cijfer van de dienende rekening N/k punten bereikt. Elke rekening wordt vergeleken met zijn eigen boek. Met twee accounts wordt bijvoorbeeld een limiet van 10 bereikt bij 5 punten van het cijfer van één account.

Wanneer de winkel niet kan worden gelezen, wordt er niets toegeschreven en wordt elke sleutel op die dimensie 0 in rekening gebracht. Wanneer het schrijven van een boek mislukt, wordt bij die toeschrijving gebruik gemaakt van het boek zoals het werd gelezen. Bij een mislukte tokenschrijfactie blijven de tokens van dat verzoek uit het boek. Geen van deze fouten blokkeert een aanvraag.

In een `consent` pool gebruikt de uitleenformule het verbruik van elke sleutel op de procentuele dimensie, zoals hierboven beschreven. Wanneer een andere sleutel uitleent, wordt het boek één keer gelezen en aan elke sleutel toegeschreven. Zonder bruikbaar boek wordt voor elke sleutel 0 in rekening gebracht. Een sleutel met een gewicht gaat dan over, en een sleutel met gewicht 0 gaat pas over als een andere sleutel uitleent.

#### Gebruiksroute

`GET /api/quota/pools/{id}/usage` rapporteert dezelfde cijfers via dezelfde functie. Een procentdimensie heeft één invoer per poolverbinding in `accounts`. `consumedTotal` en `perKey` op het hoogste niveau weerspiegelen de eerste invoer.

De route past ook de huidige lezing toe, zodat het boek op verzoek vooruit kan worden gezet. `internal + external` kan verschillen van `consumedTotal` als er geen bruikbare meetwaarde is, of als er geen lager cijfer wordt toegepast.

#### Opslag en retentie

Beide quotawinkels houden het boek bij. Op SQLite verwijdert de automatische opschoning van de database, indien ingeschakeld, rijen die gedurende 60 dagen niet zijn bijgewerkt. Op Redis delen de boeken en tellers van een poolverbinding één sleutel. Het vervalt 60 dagen na de laatste tokenschrijf- of boekwijziging. Een boek dat niet verandert, wordt niet herschreven, dus de grenswaarde wordt boven het langste planvenster ingesteld. Het handmatig resetten van de gebruiksgeschiedenis wist ook de boeken op SQLite (zie Beperkingen).

#### Beperkingen

- Alle groei van het accountcijfer sinds de basislijn wordt gesplitst door de tokens die elke sleutel sindsdien heeft gerouteerd. Wanneer die groei heeft plaatsgevonden, doet er niet toe.
- Dus gebruik buiten OmniRoute wordt in rekening gebracht op de sleutels tot wat hun tokens toestaan. Dat omvat het gebruik dat is gemaakt vóór de eerste aanvraag van een sleutel door het venster, toen het boek al open was.
- Buitengebruik levert bijvoorbeeld 60 punten op terwijl er geen belangrijke routes zijn. Een sleutel stuurt vervolgens 30.000 tokens door en het cijfer bereikt 60,6.
- Als het boek vóór dat gebruik open was, bedraagt het sleutelgedeelte 30 punten. Het heeft ook 7,65 extern gebruik, met vier sleutels met een gewicht van 25.
- Als het boek na dat gebruik wordt geopend, zijn de 60 punten de basislijn. Het deel van de sleutel is 0,6 punten en kan 15 punten voor extern gebruik bevatten.
- Een aanvraag of een bezoek aan de gebruiksroute opent het boek. Dus of dergelijk gebruik als basislijn geldt, hangt af van het moment waarop het boek werd geopend.
- Met de standaardvloer krijgt een sleutel die 60.000 tokens routeert terwijl extern gebruik het account 60 punten oplevert, alle 60 als zijn eigen deel.
- Met de bodem op 50.000 bedraagt het eigen deel 1,2 punten. De andere 58.8 zijn extern en worden op gewicht gebracht, zoals bij elk extern gebruik.
- Stel `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` in de buurt van wat één punt kost volgens uw abonnement. Buitengebruik omvat verkeer op hetzelfde account vanaf sleutels buiten het zwembad.
- In elke modus geldt een percentagelimiet. Een afgetopte sleutel kan worden geweigerd terwijl het account ver onder de verzadigingsdrempel zit.
- Neem een dop van 10 en 12 punten buitengebruik eerder in de etalage. Een sleutel die 20.000 tokens routeert, wordt vervolgens geweigerd tegen een accountcijfer van 12,4%.
- De splitsing is een schatting per tokenvolume. Een verzoek telt als de prompttokens plus de voltooiingstokens. Cachekortingen en modelprijzen veranderen daar niets aan.
- Een verzoek dat niet eindigt met status 200 registreert geen tokens. Voorbeelden zijn een stream waarbij de client de verbinding verbreekt en een upstream-fout nadat het gebruik is verbruikt.
- Het gebruik dat een dergelijk verzoek veroorzaakt, wordt in rekening gebracht op de sleutels die tokens hebben geregistreerd, tot wat hun tokens toestaan. De rest is extern. Het beweegt niet terug. Een antwoord dat geen tokengebruik rapporteert, registreert ook geen tokens.
- Het gebruik van een lopend verzoek kan worden weergegeven in het gedeelte van een andere actieve sleutel voor het gehele verzoek. Het gaat alleen terug als het verzoek eindigt met status 200.
- Gebruik dat al op het account staat wanneer een boek wordt geopend, telt als extern. Dit omvat een upgrade, een nieuwe pool en een nieuw account. Gebruik in een nieuw venster vóór de eerste meting telt ook als extern.
- Elke sleutel begint met zijn gewichtsaandeel in dat gebruik, na de capaciteit worden er geen toewijzingsclaims gemaakt. Met één account op 85% en vijf sleutels met een gewicht van 20, begint elk met 17 van de 20 gebruikte sleutels.
- In een pool met meerdere accounts wordt het cijfer van de dienende account toegepast op het opgetelde budget. Dit is volgens het boek onveranderd.
- Een lager cijfer in een venster dat door de provider als open wordt gerapporteerd, wordt niet toegepast. Een resettijd die meer dan 30 minuten teruggaat, wordt behandeld als een oude meting.
- In beide gevallen behoudt het boek zijn status totdat de opgeslagen resettijd is verstreken. Daarna wordt het boek pas in rekening gebracht nadat het is gelezen.
- De oplossing is het handmatig resetten van de gebruiksgeschiedenis (`POST /api/settings/purge-usage-history`). Het wist de attributieboeken en hun tokentellers in de SQLite database.
- De `all` periode wist elk boek en elke teller. Een kortere periode ruimt eerst de boeken op die er niet in geschreven zijn. Vervolgens worden de tellers gewist die er niet in zijn geschreven, maar alleen voor een poolverbinding waarvoor geen boek meer is. Een bewaard boek markeert nog steeds elke sleutel op de toonbank.
- Een boek waarvan de figuur niet is verplaatst, wordt niet herschreven, dus een kortere periode kan ook het boek van het huidige venster leegmaken. De volgende lezing opent dan een nieuw boek met het huidige cijfer.
- De reset raakt niets aan een Redis quotumopslag. Daar eindigt een boek met zijn venster, of vervalt het 60 dagen na zijn laatste schrijfbeurt.
- Wanneer de provider geen resettijd verzendt, lijkt een venster dat tussen twee metingen wordt gereset en opnieuw wordt gevuld boven het oude cijfer, op een hoger cijfer. Het boek behoudt de oude basislijn en markeringen.
- De metingen worden gedateerd door de plaatselijke klok. Als het voorloopt op dat van de aanbieder, of als een bron iets eerder een resettijd meldt, kan het boek dat verschil eerder opduiken.
- De groei in die korte periode wordt gedeeld door de tokens die erin worden gerouteerd. De eerste lezing in het volgende venster corrigeert dit. Wanneer het omgedraaide boek geen resettijd bevat, heeft die correctie een lager getal nodig dat minstens twee minuten nieuwer is dan de laatst toegepaste meting.
- Instanties die een Redis delen, slaan datummetingen op met hun eigen klokken, dus houd die klokken gesynchroniseerd. Metingen van een exemplaar waarvan de klok achterloopt, zien er ouder uit en worden genegeerd.
- Als er na de opgeslagen resettijd geen bruikbare meting binnenkomt, worden de procentuele aandelen en percentagelimieten per sleutel pas afgedwongen als er een meting terugkeert. Zonder resettijd begint deze 15 minuten na de laatste lezing die het boek heeft gewijzigd.
- In de Redis winkel kan een boek dat 60 dagen inactief is, verlopen tussen de cheque van een schrijver en het schrijven ervan. Het wordt vervolgens opnieuw gemaakt bij een revisie boven 1, wat een geldige status is.

---

## Abonnementsresolver

Geïmplementeerd in `src/lib/quota/planResolver.ts`.

Prioriteit (van hoog naar laag):

1. **Handmatige database-override** — tabel `provider_plans`, per `connectionId`.
2. **Bekende catalogus** — `src/lib/quota/planRegistry.ts` (alleen gegevens).
3. **Leeg abonnement** — geen dimensies; handmatige configuratie vereist.

### Bekende catalogus

| Provider              | Dimensies                                                     |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, onbekend), `tokens/weekly`              |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Geen standaardwaarde — handmatige configuratie vereist        |

---

## Pijplijnintegratie

### PRE haak (`open-sse/handlers/chatCore.ts`)

Wordt uitgevoerd vóór de upstream-uitvoerder, na verificatie- en beleidscontroles:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() per dimension
      → fairShare.decideFairShare()
      → if block → return 429 (buildErrorBody, Hard Rule #12)
      → if allow + deprioritize → set quotaSoftPenalty=true on candidate
  → executor.execute()
```

**Fail-open** : als `enforceQuotaShare` gooit, wordt het verzoek doorgelaten met een `pino.warn` logboek. Dit voorkomt dat een bug in de quota-engine al het verkeer blokkeert.

**Wanneer de capaciteit terugkeert.** Een weigering bij het sleutelaandeel of bij het poolplafond eindigt met een van de volgende twee zinnen, in beide leenmodi:

- `percent` venster: `. The <window> window resets at <time>.` De tijd is de reset die de provider meldt.
- Telbare eenheid: `. Enough <window> usage is expected to clear by <time>.` De tijd is een bovengrens vanuit het schuifvenster, als de sleutel niets anders verzendt.

`<time>` is een ISO 8601-instant in UTC. De weigering draagt dan `Retry-After`: de hele seconden tot dat moment, plus één. Een client die zo lang wacht, probeert het maximaal één seconde na het moment opnieuw. Als het moment niet bekend is, bevat de weigering noch de straf, noch de kop. Een absolute weigering van het plafond houdt geen van beide in. De publieke code blijft `quota_share_blocked`.

Een weigering tot delen raakt de gedeelde verbinding niet. Er wordt geen cooldown ingesteld, geen modelvergrendeling en geen storing in de stroomonderbreker van de provider, en de andere sleutels van de pool worden nog steeds bediend. Wanneer elk doelwit van een combo de sleutel voor zijn aandeel weigert, antwoordt de combo 429 zonder te wachten. Het antwoord bevat de hint als `Retry-After`. Het inbeddingspad beëindigt de weigering met dezelfde zin en verzendt geen `Retry-After`.

### POST haak (recordverbruik)

Na een succesvolle reactie:

```
executor returns success
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() per dimension
      → fail-open: errors logged as pino.warn, never propagated to client
```

**Drift opmerking** : als `consume` na de respons mislukt, telt de voortschrijdende teller te weinig. Het verzadigingssignaal van de provider (bijvoorbeeld `anthropic-ratelimit-unified-5h-utilization`) corrigeert de globale schatting bij het volgende verzoek.

### Combo zachte straf (`open-sse/services/combo.ts`)

Wanneer `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // default 0.7
}
```

De straf wordt toegepast na alle andere scorefactoren. Het verlaagt de kans op automatische combinaties van het selecteren van een verzadigde toets zonder deze hard te blokkeren.

---

## UI Walkthrough

### `/dashboard/costs/quota-share` — Hoofdzwembadpagina

Componenten (allemaal in `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Onderdeel              | Doel                                                                              |
| ---------------------- | --------------------------------------------------------------------------------- |
| `QuotaConceptCard`     | Inleidende kaart waarin het delen van quota wordt uitgelegd aan nieuwe gebruikers |
| `CreatePoolModal`      | Maak een nieuwe quotapool aan (verbinding + naam + initiële toewijzingen)         |
| `PoolCard`             | Samenvatting per pool: naam, verbinding, aantal toewijzingen                      |
| `DimensionBar`         | Gestapelde balk per dimensie: het + globale gebruik van elke sleutel              |
| `AllocationTable`      | Tabel met geconsumeerd, eerlijk aandeel, deficit/surplus, leenvlag                |
| `BurnRateChart`        | EMA lijndiagram met verbrandingssnelheid (luie Recharts via `dynamic()`)          |
| `EditAllocationsModal` | Bewerk toewijzingsgewichten, limieten en beleid voor een pool                     |
| `BorrowModeField`      | Leenmoduskiezer (`saturation` of `consent`) in de wizard                          |
| `LendingBadge`         | Alleen-lezen badge op een sleutel die uitleent, alleen in `consent` pools         |

De uitleenbadge toont het percentage en, indien ingesteld, de deadline in UTC met de genoemde zone. Het beoordeelt de deadline op het moment van de gebruiksmomentopname. Een verlopen of onleesbare deadline wordt weergegeven als `lending expired`.

De pagina haakt:

- `usePools` — haalt `GET /api/quota/pools` elke 30s op.
- `usePoolUsage` — haalt `GET /api/quota/pools/[id]/usage` op aanvraag op.
- `useLocalStoragePoolMigration` — wordt één keer op mount uitgevoerd om oudere LS -gegevens te migreren.

De sleutelsstap van de poolwizard heeft een `Show usage by member to key holders` box. Het stelt de `memberBreakdown` optie van de pool in (zie [Lidgebruik](#member-usage) ). Daaronder waarschuwt de wizard dat iemand die weet welke sleutel gebruikt is, een balk aan die sleutel kan koppelen. Als het vakje is aangevinkt, wordt dit aangegeven als de stap minder dan drie of meer dan twintig toetsen bevat, omdat de balken dan verborgen blijven. Het telt de sleutels in de stap en kan niet zeggen wie van hen verzoeken kan doen.

### `/dashboard/costs/quota-share/plans` — Providerplanconfiguratie

- `ProviderPlanConfigClient.tsx`: vervolgkeuzelijst om een provider te selecteren, opgelost plan te bekijken (automatisch uit catalogus of handmatig overschrijven) en dimensies te bewerken.
- Wijzigingen schrijven naar `PUT /api/quota/plans/[connectionId]`.
- Verwijdering keert terug naar catalogus of leeg plan.

---

## Selfservicequota API (opt-in)

`GET /api/v1/me/quota/{provider}` (ook geserveerd bij `/v1/me/quota/{provider}`) laat een API -sleutelhouder met zijn eigen sleutel lezen hoeveel van een gedeeld abonnement van hem is en wat hem blokkeert. De route is een dunne schil over `src/server/selfService/quotaHandler.ts`; de weergave is gebouwd door `src/lib/quota/selfView.ts` en het responscontract ervan is `src/shared/schemas/selfQuota.ts` (`SelfQuotaView` in `docs/openapi.yaml`).

### Inschakeling en authenticatie

- Functievlag `QUOTA_SELF_PANEL`, standaard `false`. Terwijl deze uitstaat, krijgt een verzoek dat de route bereikt 404. Met `REQUIRE_API_KEY=true` weigert het API beleid van de client een ontbrekende of ongeldige sleutel met 401 voordat de route wordt uitgevoerd, ongeacht de vlag. Een verzoek zonder sleutel maar met een ingelogde dashboardsessie passeert dat beleid en krijgt het eigen antwoord van de route. De vlag wordt opgelost zoals elke andere vlag (dashboard of REST overschrijven, daarna de omgevingsvariabele met dezelfde naam); zie [`FEATURE_FLAGS.md`](../reference/FEATURE_FLAGS.md).
- De weergavenaam van elk zwembad en het label van elk schema worden teruggestuurd naar de sleutelhouders van het zwembad, precies zoals de beheerder ze heeft geschreven. Voordat u de vlag aanzet, moet u controleren of deze geschikt is om door de sleutelhouders te worden gelezen.
- De sleutel wordt alleen uit headers gelezen: `Authorization: Bearer <key>` of `x-api-key: <key>`. Wanneer beide worden verzonden, wordt de eerste die valideert gebruikt. Een sleutel in de queryreeks of een cookie wordt genegeerd. De omgevingssleutel van de server wordt geweigerd (401).
- De sleutel heeft de `self:usage` scope nodig (403 zonder).
- Het providersegment wordt ingekort, in kleine letters gezet en vergeleken met `^[a-z0-9][a-z0-9._-]{0,63}$` (anders 400), en vervolgens opgelost via het providerregister, zodat een alias zoals `cc` de `claude` pools leest. `claude` en `anthropic` lezen dezelfde pools.

### Wat elke zichtbaarheid laat zien

| Zichtbaarheid | Vereist                                                                                        | Velden                                                                                                                                                                                                                                                                |
| ------------- | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Eigen aandeel | `self:usage`                                                                                   | `pools[]` (ref, naam, provider, beleid, gewicht, cap), `dimensions[].yourShare`, `accounts[]` met `yourShare` (op een `percent` -venster zonder `attributed` en `external`), `blocks`, `availableModels`, `expiresAt`, `apiBaseUrl`                                   |
| Accountniveau | `self:usage` + `self:account-quota` en de provider in de `sharedQuotaProviders` van de sleutel | voegt `dimensions[].total`, `accounts[].dimensions[].account` en `accounts[].modelWindows`, `attributed` en `external` toe aan de `yourShare` van een `percent` venster, en `members` aan een pool met ledengebruik ingeschakeld (zie [Ledengebruik](#member-usage) ) |

- `sharedQuotaProviders` is een instelling per sleutel (`PUT /api/keys/[id]/self-service`): `null`, de standaard, betekent elke provider die de sleutel bereikt; `[]` betekent geen. `accountVisible` van elke pool geeft aan welke zichtbaarheid erop van toepassing was.
- Accountbalken en modelvensters worden alleen weergegeven voor accounts waarvan de verbinding door de sleutel kan worden gebruikt. Wanneer de sleutel een lijst met toegestane verbindingen heeft, behoudt een account daarbuiten zijn `Account N` invoer zonder `account` of `modelWindows`. Een lege lijst betekent geen beperking, zoals voor `/v1/me/status`. Het pooltotaal (`dimensions[].total`) is niet afhankelijk van die lijst.
- Twee figuren met alleen `self:usage` zijn afkomstig van het gebruik van andere sleutels. `exhausted` van een planningsbudget weerspiegelt het verbruik van elke toets onder dat schema. In een pool waarvan de gewichten allemaal nul zijn, is de `weight` van de sleutel `100 / number of members`. Beide zijn wat handhaving van toepassing is op de sleutel.
- Een pool wordt alleen geïdentificeerd door `ref`, een ondoorzichtige waarde die is gebonden aan de aanroepende sleutel. De weergavenaam (`name`) is opgenomen zoals de beheerder deze heeft geschreven. Een `ref` is afgeleid van de sleutel en de pool met het API-sleutelgeheim van de server (`API_KEY_SECRET`). Klanten mogen het niet volhouden: het verandert als dat geheim wordt geroteerd.
- Accounts worden weergegeven als `Account 1`, `Account 2`, … in poolvolgorde. Er wordt geen pool-ID, verbindings-ID, account-e-mailadres of accountnaam geretourneerd en het antwoord gaat via het contractschema, waardoor elk veld daarbuiten wordt verwijderd.
- Telbare eenheden (`requests`, `tokens`, `usd`) worden gerapporteerd als de poolbucket die door de quotapoort wordt afgedwongen: `limit` = planlimiet × -accounts in de pool, `fairShare` = gewicht / 100 × `limit` (gelijke verdeling wanneer elk gewicht 0 is), `consumed` = de eigen teller van de sleutel in de quotaopslag, `remaining` = `fairShare` − `consumed`, met een minimum van 0.
- `blocks.schedules` geeft een overzicht van de planningsvensters van de sleutel (`open`/`closed`, `blackout` of `outside-window`, `retryAfterSeconds`, reservevloeren, en of het budget van het venster is uitgegeven); `blocks.modelCaps` vermeldt de uurlimieten per model met verbruik.
- Een sleutel buiten elke pool van de aanbieder krijgt met `pools: []` 200; `availableModels` (de `qtSd/` ID's die de sleutel ziet in `/v1/models`), `expiresAt` en `apiBaseUrl` zijn nog steeds gevuld.
- `apiBaseUrl` is `OMNIROUTE_PUBLIC_API_BASE_URL`, dan `OMNIROUTE_PUBLIC_BASE_URL`, anders `null`. Het is nooit de eigen oorsprong van het verzoek.

### `status` en `reason`

| `status`      | Betekenis                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ok`          | Een actuele lezing.                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `stale`       | Een in het cachegeheugen opgeslagen accountlezing is gemarkeerd als verouderd, of een account waarvan de resettijd is verstreken sinds deze is gelezen. Nummers worden bewaard. Eén modelvenster waarvan de resettijd is verstreken, markeert de hele `modelWindows` groep `stale`. Voor het eigen aandeel van de sleutel in een `percent` venster: het boek is gelezen zonder dat er een account in de cache van de poort is gelezen om dit te bevestigen. |
| `unavailable` | Geen lezen; de cijfers zijn `null`, nooit `0`. `reason` zegt waarom.                                                                                                                                                                                                                                                                                                                                                                                        |

| `reason`                          | Wanneer                                                                                                                                                                       |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `store_unavailable`               | Het quotaarchief kan niet worden gelezen of kan geen attributieboeken lezen.                                                                                                  |
| `percent_attribution_unavailable` | Het eigen aandeel van de sleutel in een `percent` venster: er bestaat nog geen attributieboek voor dat account en venster, of het boek vermeldt de sleutel niet.              |
| `percent_window_ended`            | Het eigen aandeel van de sleutel in een `percent` venster: het boek behoort tot een planvenster dat is beëindigd.                                                             |
| `account_not_used_by_key`         | Het eigen aandeel van de sleutel in een `percent` venster: de verbinding van het account valt buiten de toegestane verbindingen van de sleutel. Zijn boek wordt niet gelezen. |
| `window_not_reported`             | De cache met providerlimieten heeft geen waarde voor dat planvenster.                                                                                                         |
| `connection_lookup_failed`        | De verbinding van het account kon niet worden gelezen.                                                                                                                        |
| `not_supported`                   | OmniRoute kan de gebruikslimieten van de accountprovider niet lezen.                                                                                                          |
| `fetch_failed`                    | Er was geen uitlezing in de cache bruikbaar en het vernieuwen van de providerlimieten is mislukt.                                                                             |
| `not_available`                   | De uitlezing heeft geen gebruiksvensters, of het account heeft helemaal geen uitlezing.                                                                                       |

Wanneer het quotumarchief niet kan worden gelezen, zijn de door de opslag ondersteunde velden van `blocks` ( `exhausted` van een planningsbudget, `consumed` en `reached` van een modelcap) ook `null`.

### Toestemming voor lenen

`PATCH /api/v1/me/quota/{provider}` registreert de eigen toestemming van de aanroepende sleutel voor één pool. Het maakt gebruik van de vlag, headers en providerregels van de `GET`. De `self:usage` scope staat deze ene schrijfactie toe, hoewel de naam als alleen-lezen luidt.

```json
{
  "pool": "qpr_0123456789abcdef0123456789abcdef",
  "lendingPercent": 30,
  "lendingUntil": 1893456000000
}
```

- `pool` is de `ref` die `GET` voor die pool retourneert.
- `lendingPercent` is een geheel getal van 0 tot 100. Een waarde van 0 wist de toestemming en de deadline ervan. Een lichaam met `lendingPercent` 0 wordt in beide modi geaccepteerd.
- `lendingUntil` is optioneel: epoch milliseconden, of `null` voor geen deadline. Het moet in de toekomst liggen en maximaal 8640000000000000. Een waarde lager dan 100000000000 wordt gelezen als seconden en wordt geweigerd.
- Elk ander veld wordt geweigerd. Een body langer dan 4096 bytes wordt geweigerd. Het lezen stopt bij dat formaat, dus een langer lichaam wordt nooit heel gehouden.

De controles worden uitgevoerd in de volgorde van deze tabel. Elke weigering gebruikt de standaardfouttekst met een vast bericht. Een weigering door een van deze cheques levert niets op.

| Status | Bericht                                                                                            | Wanneer                                                                         |
| ------ | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| 404    | `Not found`                                                                                        | De `QUOTA_SELF_PANEL` vlag is uit.                                              |
| 401    | `Valid API key required`                                                                           | De sleutel ontbreekt of is ongeldig, of is de omgevingssleutel van de server.   |
| 403    | `API key lacks the self:usage scope`                                                               | De sleutel mist `self:usage`.                                                   |
| 400    | `Invalid provider`                                                                                 | Het providersegment is ongeldig.                                                |
| 429    | `Too many lending changes. Retry later.`                                                           | De sleutel heeft zijn limiet overschreden. Het antwoord draagt `Retry-After`.   |
| 400    | `Body must be { pool, lendingPercent, lendingUntil }. lendingPercent is an integer from 0 to 100.` | Het lichaam is niet JSON, is te lang of past niet in het schema.                |
| 400    | `lendingUntil must be a Unix time in milliseconds`                                                 | De deadline luidt als seconden.                                                 |
| 400    | `lendingUntil must be in the future`                                                               | De deadline ligt op of vóór het aanvraagtijdstip.                               |
| 404    | `Pool not found`                                                                                   | De `ref` noemt geen pool van deze sleutel voor deze provider.                   |
| 403    | `Lending is not enabled for this pool`                                                             | Het zwembad bevindt zich in `saturation` -modus en `lendingPercent` is boven 0. |
| 500    | `Failed to build quota view`                                                                       | Elke andere mislukking. De oorzaak ervan wordt geregistreerd op de server.      |

De limiet is 20 verzoeken per 60 seconden voor elke sleutel. Elk verzoek dat de providercontrole doorstaat, telt, zelfs één die later wordt geweigerd of één die niets verandert. Het heeft een eigen teller, afgezien van de limiet voor de aanvraagsnelheid van de sleutel.

Een verzoek dat de opgeslagen toestemming wijzigt, schrijft één `quota.pool.lending.updated` -auditrecord. Het noemt de sleutel met de oude en nieuwe waarden. Dezelfde instantie die twee keer wordt gestuurd, schrijft één keer en controleert één keer. Het antwoord is 200 met de volledige `GET` weergave, gebouwd na het schrijven.

De `GET` visie rapporteert de kredietverlening als volgt:

- Elke pool bevat `borrowMode` (`saturation` of `consent`), en de eigen `lendingPercent` en `lendingUntil` van de sleutel.
- `lendingActive` is alleen `true` in een `consent` pool, met een percentage boven 0 en een deadline die niet wordt gehaald.
- In een `consent` pool draagt elke telbare `dimensions[].yourShare` `borrowAvailable`. Het is wat de sleutel nu boven zijn aandeel kan gebruiken, uitgeleend door de andere sleutels.
- `borrowAvailable` gebruikt de formule van de poort. Het leest elke andere sleutel, ook als de sleutel onder zijn aandeel ligt. Voor een `hard` sleutel is dat één extra lezing per andere sleutel en telbare dimensie, parallel.
- `borrowAvailable` is `null` voor een `soft` of `burst` sleutel, en `null` als een leesbewerking mislukt.
- `borrowAvailable` is één cijfer voor alle andere sleutels samen. In een verzameling van twee sleutels is dit het eigen figuur van de andere sleutel.
- `borrowAvailable` is nog niet gerapporteerd voor `percent` windows of in `accounts[]`.
- In een `saturation` pool rapporteert de weergave de opgeslagen toestemming met `lendingActive: false` en zonder `borrowAvailable`.

### Fouten

Elke reactie op deze route, succes of fout, draagt `Cache-Control: no-store` met zich mee. Een weigering die plaatsvindt voordat de route wordt uitgevoerd, draagt deze niet over, bijvoorbeeld de 401 van API beleid van de client of de 403 van het IP filter. Fouten van de route gebruiken de standaardfouttekst met een vast bericht: 400 (ongeldige provider), 401 (ontbrekende of ongeldige sleutel), 403 (ontbrekende `self:usage`), 404 (vlag uit) en 500 (`Failed to build quota view`). De 500 dekt elke fout zodra het verzoek de route bereikt, inclusief het opzoeken van de sleutel zelf; de oorzaak ervan wordt op de server geregistreerd en nooit geretourneerd. De fouten van de `PATCH` staan vermeld in [Uitleentoestemming](#lending-consent).

### Beperkingen

- `remaining` is het deel van het eerlijke deel van de sleutel dat niet is gebruikt. Het is geen garantie. Er kan nog steeds een sleutel worden geserveerd terwijl er ruimte is in het zwembad. Zodra het totaal van de pool `limit` bereikt, wordt elke sleutel van de pool geweigerd, ongeacht de eigen `remaining`, en een sleutel zonder `self:account-quota` kan dat totaal niet zien.
- `remaining` houdt geen rekening met de absolute `cap` van de allocatie. De handhaving weigert de sleutel zodra het eigen verbruik in een venster van de cap-eenheid de waarde van de cap bereikt.
- De balk op accountniveau komt uit de cache met providerlimieten en kan een paar minuten achterlopen op de handhavingsbeslissing. Een meting waarvan de resettijd is verstreken, wordt gerapporteerd als `stale`.
- Vensters per model (`modelWindows`) worden alleen gerapporteerd voor providers die een plattegrond-venstertoewijzing hebben: Claude en Codex vandaag. Bij andere aanbieders is `modelWindows` nog steeds aanwezig als accountgegevens worden getoond, met een lege `windows` lijst.
- Het eigen aandeel van de sleutel in een `percent` venster is een schatting. Het komt uit het attributieboek en bevat alle beperkingen die hierboven onder 'Percentage dimensies: attributie per sleutel' worden vermeld.
- `consumed` is de nummerhandhaving in vergelijking met het eerlijke aandeel. Het is precies `attributed` plus `external`. `attributed` is het deel dat het boek de sleutel geeft voor de tokens die het heeft gerouteerd. `external` is het sleutelgedeelte van het accountgebruik waar de sleutels van de pool geen rekening mee houden.
- Beide delen worden alleen verzonden als de `accountVisible` van de pool waar is: de sleutel heeft `self:account-quota` en de provider bevindt zich in zijn `sharedQuotaProviders`. Een sleutel zonder deze krijgt alleen `consumed`, met dezelfde `status` en `reason`.
- Met beide onderdelen en eigen gewicht kan een houder het gebruik buiten het zwembad berekenen dat ten laste komt van de zwembadsleutels. Een houder met het rekeningbereik ziet het rekeningtotaal al.
- Een sleutel die niets in het venster heeft gerouteerd, kan nog steeds zijn externe lading uit `consumed` lezen, omdat het toegeschreven deel dan 0 is.
- Een boek opent bijvoorbeeld op 0, terwijl de toetsen A en B elk een gewicht van 50 hebben. Sleutel A stuurt 900.000 tokens en sleutel B 100.000. De rekening bereikt dan 60% van een limiet van 100. Dan is `attributed` 54 voor sleutel A en 6 voor sleutel B, en `external` is 0 voor beide.
- De visie leest het boek en schrijft nooit de staat ervan. Er wordt geen boek geopend en de aanbieder wordt nooit om een lezing gevraagd. Met de Redis opslag verwijdert een leesbewerking vervangende revisievelden op de achtergrond, net zoals de leesbewerkingen van de poort dat doen.
- Het aandeel is alleen `ok` zolang de cache van de poort een lezing van het account bevat. Zonder één is het `stale`, dus in een pool zonder recent verzoek wordt het weergegeven als mogelijk verouderd.
- Totdat een aanvraag door de pool gaat, is de share niet beschikbaar. Met dat verzoek wordt het boek geopend en geldt het rekeningbedrag op dat moment als gebruik buiten de pool.
- In een pool met meerdere accounts gebruikt elke accountinvoer het eigen boek van die account en de limiet van één account. Bij de handhaving worden beide kanten geschaald op basis van het aantal accounts, dus de verhouding is hetzelfde.
- Ramen per model hebben geen deel van de sleutel. Het boek houdt geen gegevens per model bij.
- Reservevloeren van een planning worden niet geëvalueerd door de weergave: een planning kan worden weergegeven als `open` terwijl een verzoek wordt geweigerd met de reden `schedule-reserve`.
- Wanneer twee groepen met dezelfde sleutel een verbinding delen, wordt één van deze groepen toegepast en wordt in de weergave beide weergegeven.
- Er is geen limiet per adres voor mislukte sleutelpogingen: achter een reverse proxy kunnen bellers één adres delen (het hangt ervan af of doorgestuurde clientadressen worden vertrouwd), dus een uitsluiting zou de route voor elke sleutelhouder kunnen weigeren. Met `REQUIRE_API_KEY=true` wordt een ongeldige sleutel geweigerd door het API -beleid van de client voordat de route wordt uitgevoerd, met de 401-body van dat beleid in plaats van die van deze route.

### Gebruik door leden

Een beheerder kan sleutelhouders laten zien hoe het gebruik van een raam zich verdeelt tussen de leden van de pool. De optie is de `memberBreakdown` van de pool, standaard uitgeschakeld. Het wordt ingesteld in de poolwizard of met `PATCH /api/quota/pools/{id}`. `GET /api/quota/pools` en `GET /api/quota/pools/{id}` rapporteren het.

Een dimensie van de visie draagt alleen `members` als deze allemaal gelden:

- De optie van het zwembad is ingeschakeld
- de pool heeft maximaal 20 toegewezen sleutels, en ten minste drie daarvan kunnen verzoeken indienen: actief, niet ingetrokken, niet verbannen en niet voorbij de vervaldatum
- de `accountVisible` van de pool is waar: de sleutel heeft `self:account-quota` en de provider bevindt zich in zijn `sharedQuotaProviders`
- in een `percent` venster is de verbinding van het account er een die de sleutel kan gebruiken
- het eigen aandeel van de sleutel in dat venster werd gelezen: zijn `status` is niet `unavailable`

Anders is `members` afwezig. Het is nooit een lege lijst.

- Elke plak is `{ slot, consumed, isYou }`. Het antwoordschema wijst elke andere eigenschap van een segment af, evenals een lijst met meer dan twintig segmenten. Segmenten worden weergegeven in slotvolgorde.
- Er is één slice per toegewezen sleutel, inclusief een sleutel die geen verzoeken meer kan doen. Een lid zonder nut toont een echte nul.
- Slot 1 is altijd de vraagsleutel, waarbij `isYou` waar is. De andere slotnummers zijn rangen van een ingetoetste hash. Het is afgesloten met `API_KEY_SECRET` en bedekt het zwembad, de vraagsleutel en het lid.
- De cijfers staan dus niet op één lijn tussen de houders. Voor één houder blijven ze tussen bezoeken hetzelfde. Ze kunnen veranderen wanneer een sleutel de pool binnenkomt of verlaat, of wanneer dat geheim wordt geroteerd.
- In een telbaar venster is een slice de teller van het lid in de quotaopslag, dezelfde teller als zijn eigen `consumed`.
- In een `percent` venster is een slice het `attributed` deel van het lid, uit hetzelfde boek gelezen als het eigen aandeel van de sleutel. Gebruik buiten het zwembad wordt nooit in plakjes verdeeld. Die lading is opgedeeld in gewicht, dus de plakjes die deze droegen zouden de gewichten laten zien.
- Elke weergave leest parallel één waarde per ander lid en telbaar venster. Op een `percent` venster hoeven de plakjes niet te worden gelezen, afgezien van het lezen van het eigen boek van het aandeel. Wanneer één waarde niet kan worden gelezen, heeft dat venster geen `members` en blijft het eigen aandeel van de sleutel behouden.
- De optie en het aantal bruikbare sleutels worden één keer per pool gelezen, en alleen voor een sleutel die accountgegevens mag zien. Als de optie of het aantal bruikbare sleutels niet wordt gelezen, worden de balken voor die pool uitgeschakeld. De server registreert een waarschuwing en de rest van de weergave wordt gebouwd.

De balken dragen geen namen of ID's. Ze vertellen een sleutelhouder nog steeds dingen over de andere leden:

- Houders kunnen segmenten nog steeds matchen op basis van hun waarden.
- Dankzij een stabiele nummering kan een houder één lid in de loop van de tijd volgen.
- Het aantal segmenten geeft aan hoeveel sleutels er in de pool zijn toegewezen.
- In een verzameling van drie sleutels kan iemand die weet welke sleutel gebruikt werd, vertellen wat de laatste sleutel gebruikte.
- Wanneer een pool onder de drie bruikbare toetsen zakt, verdwijnen de balken. Eerdere standpunten laten nog steeds zien wat elk lid gebruikte.
- In een telbaar venster kan het pooltotaal minus de segmenten het gebruik weergeven van sleutels die niet langer zijn toegewezen.
- Een lid dat nul op het ene account en het gebruik op een ander account laat zien, kan laten zien welk lid welk account gebruikt.
- In een telbare pool met het `hard` beleid duidt een deel dat stopt met groeien bij het eerlijke aandeel van een lid op het gewicht van dat lid.

### Gebruiksreeks (`GET /api/v1/me/usage`)

`GET /api/v1/me/usage?range=<range>` (ook aangeboden op `/v1/me/usage`) retourneert het gebruik en de kosten van de eigen verzoeken van de belsleutel: totalen, één invoer per UTC dag, per dag en model, per model en per provider. Het deelt de vlag, de authenticatieregels, de `self:usage` scope, `Cache-Control: no-store` en het foutgedrag van de bovenstaande quotaroute. De sleutel wordt vóór `range` gecontroleerd. Fouten zijn 400 (`Invalid range`), 401, 403, 404 en 500 (`Failed to build usage`).

- `range` is een van `1d`, `7d`, `30d` (de standaard) of `90d`. Elke andere waarde, een lege waarde of een herhaalde parameter is een 400. De set stopt bij `90d` om de kosten van een oproep te beperken. De weergave leest alleen de ruwe gebruiksgeschiedenis, nooit de dagelijkse samenvattingen, die geen sleutel bevatten.
- Rijen worden geselecteerd op basis van de ID van de belsleutel. De kolom met de sleutelnaam komt nooit overeen en rijen die zonder sleutel-ID zijn opgenomen, worden nooit meegeteld.
- Bij het bouwen van een reeks worden vijf gegroepeerde query's uitgevoerd over de rijen van de sleutel in het venster. De ingebouwde serie wordt 60 seconden per sleutel en bereik hergebruikt, en een hergebruikte oproep loopt niet. Zijn `generatedAt` geeft zijn leeftijd aan.
- Het venster eindigt wanneer de serie is gebouwd. Een rij die later wordt gestempeld, bijvoorbeeld door klokafwijking, wordt niet meegeteld.
- `coverage.retentionDays` is de onbewerkte bewaarinstelling voor de gebruiksgeschiedenis van de operator (`retention.usageHistory` in de database-instellingen). `coverage.truncatedByRetention` is waar als het gevraagde bereik langer is dan die instelling. Het vergelijkt de twee getallen en controleert niet of er daadwerkelijk rijen ontbreken.
- De provider wordt geretourneerd zoals vastgelegd voor de eigen verzoeken van de sleutel. Model is de geregistreerde naam na de laatste `/` en rijen worden daarop gegroepeerd. Een combo-verzoek waarvan elk doel is geweigerd, wordt vastgelegd met het routeringslabel als provider (de combo-naam, `auto` of `combo`) en de modelstring die de client heeft verzonden. Andere geweigerde verzoeken, bijvoorbeeld door een open stroomonderbreker, een cooldown van een model of een overslaan van quota-parkeerplaatsen, behouden de doelprovider en het model.
- Naast tellingen en kosten omvat het antwoord de gemiddelde latentie, succespercentages en de tijden van het eerste en het laatste verzoek.
- `byModel` somt de 50 provider-en-modelparen op met de meeste verzoeken. Met meer paren tellen de invoeren niet op tot `summary`, en `summary.uniqueModels` telt elke geregistreerde modelspelling. `byModelTruncated` is dan waar, en een model waarvan de paren aan beide zijden van de snede vallen, toont gedeeltelijke totalen.
- Er worden twee kosten gerapporteerd. `costUsd` zijn de gefactureerde kosten, zoals blijkt uit de gebruiksanalyses. Aanbieders van flatrate-abonnementen, zoals het Claude Code-abonnement, rekenen daar $ 0. `listPriceUsd` is hetzelfde gebruik, geprijsd tegen de catalogusprijs, inclusief abonnementen. Een verzoek waarvan het model geen prijsrij heeft, telt de opgeslagen kosten: kosten die de provider heeft gerapporteerd, of kosten die zijn berekend toen het verzoek werd geregistreerd. Alleen een verzoek zonder beide telt als 0, zonder markering, dus een totaal kan gedeeltelijk zijn.
- Het responscontract is `src/shared/schemas/selfUsage.ts` (`SelfUsageSeries` in `docs/openapi.yaml`).

### Selfservicepagina

Als `QUOTA_SELF_PANEL` is ingeschakeld, is `/quota/{provider}` een openbare pagina. Een sleutelhouder typt daar een API sleutel en ziet de pools van die sleutel voor de aanbieder. Elke pool toont één kaart per poolvenster, met het gebruik van de pool voor iedereen en het eigen aandeel van de sleutel. Elke rekening van de pool heeft zijn eigen kaarten, met het gebruik van de rekening en het sleutelaandeel. Het gebruik van het account wordt alleen weergegeven als de sleutel accountgegevens kan zien. De pagina vermeldt ook de limieten per model van elk account en het eigen gebruik van de sleutel. Er verschijnt een melding wanneer een schema de sleutel op dit moment blokkeert. Op een kaart wordt per model de dop van de sleutel vermeld met het gebruik ervan, en wordt aangegeven welke exemplaren zijn bereikt. `{provider}` is een provider-ID of zijn alias (`/quota/claude`, `/quota/cc`). Een onbekende provider en elk `/quota/*` pad terwijl de vlag uit is, antwoord 404. Pools op een aangepast OpenAI- of Anthropic-compatibel knooppunt hebben geen pagina. De API antwoordt nog steeds voor hen.

De pagina heeft geen sessie. De sleutel wordt alleen verzonden in de `Authorization` header van `GET /api/v1/me/quota/{provider}`, `PATCH /api/v1/me/quota/{provider}` en `GET /api/v1/me/usage`, nooit in een URL. Een sleutel die de server accepteert, wordt bewaard in de `sessionStorage` van het tabblad. Met "Onthoud op dit apparaat" wordt het in plaats daarvan in `localStorage` bewaard, en "Vergeet sleutel" verwijdert het van beide. Een sleutel die de server afwijst, wordt uit de opslag verwijderd.

Een pool in `consent` modus toont een leenkaart. Daar stelt de sleutelhouder een heel percentage van 0 tot 100 van het inactieve deel van de sleutel in om uit te lenen. De houder kiest ook hoe lang de toestemming duurt: totdat de toestemming wordt uitgeschakeld, 1 uur, 8 uur, 24 uur, 7 dagen of 30 dagen. Een looptijd telt vanaf het moment van sparen. Zolang er een deadline van kracht is, kan de houder deze in plaats daarvan behouden. Als die deadline vóór Opslaan verstrijkt, verzendt de kaart niets en wordt om een andere keuze gevraagd. Bij 0% wordt er geen deadline verzonden. De kaart toont de opgeslagen deadline en de bijbehorende tijdzone. Een toestemming waarvan de deadline is verstreken, wordt als beëindigd weergegeven.

Voor een `hard` sleutel vermeldt de kaart ook per poolvenster welke andere sleutels op dit moment aan de sleutel lenen. Elke rij is één cijfer voor alle andere sleutels samen. In een verzameling van twee sleutels is dit het eigen figuur van de andere sleutel. Een cijfer dat de weergave niet rapporteert, wordt gelezen als niet beschikbaar en niet als nul. Voor een `soft` of `burst` sleutel staat op de kaart dat er geen cijfer geldt.

Een pool in `saturation` modus waarvan de sleutel een percentage boven 0 opslaat, toont alleen een opname. Er staat dat het opgeslagen percentage daar geen effect heeft. De knop Terugtrekken stuurt 0 zonder deadline. Een pool in `saturation` modus met een opgeslagen 0 toont geen uitleenkaart. Na het opslaan blijft een kaart die de geretourneerde weergave niet langer nodig heeft, bij het bericht staan totdat de weergave van de pagina weer verandert.

Er wordt niets opgeslagen totdat de houder op Opslaan of Terugtrekken drukt. Elke druk op de knop verzendt één `PATCH /api/v1/me/quota/{provider}` -verzoek, en een tweede druk op de knop verzendt niets terwijl de eerste in behandeling is. Het lichaam draagt de ondoorzichtige `ref` van het zwembad uit het zicht, het percentage en de deadline. Het antwoord is de opnieuw opgebouwde quotaweergave, en de pagina toont deze zonder een tweede keer lezen. Wanneer twee opslagen elkaar overlappen, leest de pagina het quotum één keer na het laatste antwoord. De pagina bewaart de toestemming niet in browseropslag.

Een geweigerde wijziging wordt op de kaart toegelicht met een tekst gekozen uit de HTTP status. De fouttekst wordt niet gelezen. Een 401 geeft aan dat de sleutel niet is geaccepteerd en laadt het quotum opnieuw. Een 403 zegt dat de pool geen wijzigingen in de leningen aanneemt, en een 404 zegt dat de pool verdwenen is. Beide bieden een knop waarmee het quotum opnieuw wordt geladen. Bij een 400 of een ander 4xx antwoord wordt de houder gevraagd het percentage en de deadline te controleren. Een 429 vraagt de houder om te wachten, met de seconden van `Retry-After` wanneer het antwoord hen geeft. Een 5xx-antwoord, een 408 of een netwerkfout geven aan dat de wijziging mogelijk niet is opgeslagen en dat de getypte waarden behouden blijven. Een antwoord buiten het contract herlaadt het quotum. Een mislukte opslag verwijdert de sleutel niet vanzelf. Wanneer het herladen nadat het is geweigerd, verwijdert de pagina de sleutel zoals bij elke geweigerde lezing.

Zodra een sleutel is geaccepteerd, wordt op de pagina ook een kaart 'Uw gereedschap instellen' met drie tabbladen weergegeven. "Claude Code" geeft het `env` blok voor `~/.claude/settings.json`. "Shell" geeft dezelfde variabelen als `export` regels. "Claude Desktop" geeft de waarden voor het inferentievenster van derden. De modellen zijn de quota-share-modellen die de sleutel voor die provider kan gebruiken. Als een dergelijke lijst niet bij de sleutel wordt geleverd, schakelt het blok in plaats daarvan gatewaymodeldetectie in. Het gateway-adres is de openbare API oorsprong die de server rapporteert (`OMNIROUTE_PUBLIC_API_BASE_URL` en vervolgens `OMNIROUTE_PUBLIC_BASE_URL`). Als geen van beide is ingesteld, wordt op de kaart een tijdelijke aanduiding weergegeven en wordt de houder gevraagd dit aan de beheerder te vragen. De sleutel wordt weergegeven als tijdelijke aanduiding. "Include my key" zet de hele sleutel in de tekst op het scherm en in wat een kopieerknop kopieert. Dat duurt totdat de doos wordt leeggemaakt, de sleutel wordt vergeten of vervangen, of de pagina wordt verlaten. De kaart verzendt geen verzoek en biedt geen bestandsdownload.

Een lezing van de API markeringen `stale` wordt als mogelijk verouderd weergegeven. Een waarde die het `unavailable` markeert, wordt weergegeven met de reden ervan, nooit als nul.

Bij percentageplannen trekt de pagina het eigen deel van de sleutel als de API dit meldt. Er staat dat het getal een schatting is en noemt de twee delen ervan. Limieten per model tonen alleen het account.

Wanneer een venster `members` bevat, toont de kaart ook een balk met één segment per lid, in slotvolgorde. Het segment van de vraagtoets gebruikt de accentkleur. De andere segmenten doorlopen de kaartkleuren van het thema. Een tekstlegenda vermeldt elk segment met zijn waarde, dus niets is afhankelijk van de kleur. Segmenten worden gelabeld `You` of `Member N`, waarbij N het slot is.

### Speciale poort voor de pagina

`QUOTA_PANEL_PORT` opent een tweede luisteraar die alleen de zelfbedieningspagina bedient. Het is uitgeschakeld, tenzij de variabele is ingesteld. `QUOTA_PANEL_HOST` is het bindadres en is standaard `127.0.0.1`.

De luisteraar geeft deze paden door aan de hoofdpoort en antwoordt 404 voor elk ander pad:

| Pad                                                                      | Serveert                                        |
| ------------------------------------------------------------------------ | ----------------------------------------------- |
| `/quota/{provider}`                                                      | De pagina                                       |
| `/api/v1/me/quota/{provider}`, `/v1/me/quota/{provider}`                 | De quotaweergave die de pagina leest            |
| `/api/v1/me/usage`, `/v1/me/usage`                                       | De gebruiksreeks die op de pagina wordt gelezen |
| `/_next/static/`                                                         | Scripts, stijlen en lettertypen van de build    |
| `/favicon.ico`, `/favicon.svg`, `/icon-512.png`, `/apple-touch-icon.png` | Pictogrammen                                    |

`GET` en `HEAD` worden doorgegeven zonder lichaam. Er wordt ook één verzoek met een hoofdtekst doorgegeven: een `PATCH` van het quotaweergavepad, dat de pagina verzendt om een uitleenkeuze op te slaan. Elke andere methode antwoordt 404, behalve een CONNECT verzoek, waarvan de verbinding zonder antwoord wordt gesloten. Elk ander verzoek dat een lichaam meldt, antwoordt 404 en de verbinding wordt gesloten. Upgradeverzoeken worden geweigerd en hun verbinding wordt gesloten. Een pad met een puntsegment of een fragmentmarkering wordt geweigerd, zoals op de API poort. Dat geldt ook voor een verzoekdoel met een teken buiten het afdrukbare ASCII. Een onbewerkt controleteken in het doel wordt door de HTTP parser met 400 beantwoord, vóór de eigen controle van deze poort. Verzoekheaders die het raamwerk voor eigen gebruik reserveert, worden niet doorgegeven: namen die beginnen met `x-middleware-`, `x-invoke-`, `x-nextjs-`, `x-now-` of `x-next-`, en de namen `x-matched-path` en `next-resume`. Het verzoek wordt zonder hen doorgegeven. Het dashboard, de inlogpagina, de API en de inferentieroutes zijn via deze poort niet te bereiken.

De `PATCH` moet `Content-Type: application/json` bevatten, zonder parameter of alleen met `charset=utf-8`. Het moet één `Content-Length` van 1 tot 4096 bevatten, geschreven als gewone cijfers, en geen `Transfer-Encoding`. Een `PATCH` die een van deze regels overtreedt, antwoordt 404. Sommige verkeerd opgemaakte lengtes, zoals een ondertekende of een herhaalde lengte, worden door de HTTP parser met 400 beantwoord voordat de poort zelf wordt gecontroleerd. De poort leest de gedeclareerde bytes voordat deze contact maakt met de hoofdpoort en wacht er maximaal 5 seconden op. Een lichaam dat dan nog niet compleet is, antwoordt 404 en de verbinding wordt gesloten. Niets bereikt dan de hoofdhaven, of wanneer de klant als eerste vertrekt. De poort geeft exact de gedeclareerde bytes door, met dezelfde `Content-Length`. Bytes erna worden gelezen als het volgende verzoek op de verbinding. Een TLS reverse proxy aan de voorkant moet `Content-Length` doorsturen en mag de verzoektekst niet opnieuw verdelen. De hoofdpoort controleert de API sleutel in de `Authorization` header, net als voor de `GET`.

Het 404-lichaam is `{"error":"not_found","message":"Not found."}`. Een mislukt relais antwoordt 502 (`api_bridge_unavailable`) of 504 (`api_bridge_timeout`) zonder `detail` veld.

De luisteraar leest `QUOTA_SELF_PANEL` niet en zet de pagina niet aan. Terwijl de vlag uit is, antwoorden de pagina en zijn API 404 op de hoofdpoort, en de luisteraar geeft dat antwoord door.

Onder de ontwikkelingsserver (`next dev`) wordt de pagina via deze poort niet interactief. De hot-reload-socket voor ontwikkeling is een upgradeverzoek en de poort weigert dit. Gebruik de hoofdpoort tijdens het ontwikkelen.

De poort bedient gewone HTTP en de pagina verzendt API sleutels. Behoud het standaard bindadres en plaats een reverse proxy met TLS ervoor. Een ander bindadres dan loopback registreert deze melding:

```text
[Quota Panel] Bound to <host>. This port serves plain HTTP and the page sends API keys. Put a TLS reverse proxy in front of it.
```

Een loopback-peer die geen forwarding header verzendt, telt als lokaal op de hoofdpoort. Een proxy op dezelfde host moet dus `X-Forwarded-For` verzenden. Een proxy op een privéadres wordt alleen voor die header vertrouwd met `OMNIROUTE_TRUST_PROXY=private` (of `lan`). Elke andere peer wordt gerapporteerd op basis van het adres van zijn verbinding, en de doorstuurheaders die hij heeft verzonden, worden verwijderd.

De luisteraar heeft maximaal 256 verbindingen tegelijk. Een client heeft 10 seconden om de verzoekheaders te verzenden en 30 seconden om het hele verzoek te verzenden. Een inactieve Keep-Alive-verbinding wordt na ongeveer 5 seconden gesloten. Een verbinding zonder activiteit gedurende 60 seconden wordt gesloten. Deze waarden staan vast. Stel ook verbindings- en snelheidslimieten in op de reverse proxy aan de voorkant. Een reverse proxy aan de voorkant moet zijn inactieve upstream-verbindingen minder dan vijf seconden behouden, of deze niet opnieuw gebruiken. Het relais naar de hoofdpoort maakt gebruik van de upstream time-outs van de API poort (`API_BRIDGE_*`).

De luisteraar start ook als `API_PORT` niet is ingesteld. `QUOTA_PANEL_PORT` moet een poort zijn van 1 tot 65535, alleen in cijfers geschreven. Deze moet verschillen van de dashboardpoort en de API poort. Terwijl de live WebSocket server aan staat, moet deze ook verschillen van `LIVE_WS_PORT` (standaard 20132). Elke andere waarde opent niets en registreert een waarschuwing. Een waarschuwing over een geweigerde waarde geeft de variabele een naam en herhaalt de waarde niet. Een poort die al in gebruik is, opent niets en registreert deze waarschuwing:

```text
[Quota Panel] Port <port> is already in use. The quota panel port stays off.
```

Met `OMNIROUTE_BASE_PATH` set verwacht de luisteraar elk pad daarboven onder dat voorvoegsel. Gebruik dezelfde `OMNIROUTE_BASE_PATH` tijdens het bouwen en tijdens het uitvoeren. Schrijf het met een schuine streep aan het begin en zonder schuine streep, bijvoorbeeld `/omniroute`. Een andere vorm, inclusief `/` en `/omniroute/`, verlaat de poort met een waarschuwing, hoewel de build deze vormen accepteert. Dat geldt ook voor een basispad waarvan het eerste segment een applicatieroute een naam geeft: `api`, `v1`, `v1beta`, `_next`, `quota`, `dashboard`, `docs`, `login`, `codex`, `responses`, `anthropic`, `openai`, `v0` of `connect` in ieder geval.

Beperkingen:

- `/quota/{provider}/` met een schuine streep antwoordt 404 op deze poort.
- De servicemedewerker en het webapp-manifest worden niet op deze poort aangeboden.
- Een aangepaste favicon die in het dashboard is ingesteld, wordt op deze poort niet weergegeven.
- Pictogrammen worden niet weergegeven als de applicatie onder een basispad draait.
- De haven spreekt duidelijke HTTP/1.1.
- Een mislukte binding wordt pas opnieuw geprobeerd nadat het proces opnieuw is gestart.
- De luisteraar heeft geen verbindings- of snelheidslimiet per clientadres.
- Containerinstellingen vallen niet onder deze sectie.

---

## Omgevingsvariabelen

| Variabel                             | Standaard         | Beschrijving                                                                          |
| ------------------------------------ | ----------------- | ------------------------------------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`                 | `sqlite`          | Te gebruiken stuurprogramma: `sqlite` of `redis`                                      |
| `QUOTA_STORE_REDIS_URL`              | _(leeg)_          | Redis URL, bijv `redis://localhost:6379`                                              |
| `QUOTA_SATURATION_THRESHOLD`         | `0.5`             | 0..1; `>= threshold` activeert de strikte modus                                       |
| `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` | `1000`            | Tokens die maximaal één punt van een percentageplanvenster verklaren                  |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`     | `0.7`             | 0..1; vermenigvuldiger voor comboscore voor zacht beleid                              |
| `QUOTA_CONSUMPTION_RETENTION_DAYS`   | `14`              | Dagen voordat GC oude `quota_consumption` emmers verwijdert                           |
| `QUOTA_PANEL_PORT`                   | _(uitgeschakeld)_ | Speciale poort voor de zelfbedieningspagina. Niet ingesteld betekent geen luisteraar. |
| `QUOTA_PANEL_HOST`                   | `127.0.0.1`       | Bindadres voor die poort                                                              |

DB -instellingen (`quotaStore.*`) overschrijven env vars.

---

## Problemen oplossen

### Redis is geconfigureerd, maar maakt geen verbinding

Controleer of `ioredis` is geïnstalleerd (`npm ls ioredis`) en of
`QUOTA_STORE_REDIS_URL` bereikbaar is. Als de verbinding mislukt, valt de factory
terug op SQLite (gelogd op niveau `warn`).

### `peek` retourneert verouderde gegevens / staat standaard toe

Als `peek` een fout genereert, behandelt `enforceQuotaShare` het resultaat als
"toestaan" (standaard toestaan). Controleer de `pino`-logs op vermeldingen voor
`quota:enforce` en `quota:factory` om de hoofdoorzaak te achterhalen.

### Afwijking in de verbruiksteller

Als het werkelijke providergebruik afwijkt van de tellers, is dat te verwachten —
het glijdende venster met 2 buckets heeft een foutmarge van ongeveer 1% bij
venstergrenzen, en `consume` wordt na het antwoord uitgevoerd zonder op het
resultaat te wachten. Het verzadigingssignaal (`saturationSignals.ts`) leest het
werkelijke providergebruik met een TTL van 30 seconden en past
`globalUsedPercent` dienovereenkomstig aan.

### Pool toont "geen gegevens" voor de verbruikssnelheid

`computeBurnRate` vereist ten minste 2 historische metingen. Nieuwe pools zonder
eerdere aanroepen van `consume` tonen `tokensPerSecond: 0` en
`timeToExhaustionMs: null`.

---

## Migratie vanuit localStorage

Wanneer `/dashboard/costs/quota-share` voor het eerst wordt geladen, controleert de hook `useLocalStoragePoolMigration`:

1. `localStorage.getItem("omniroute:quota-share:pools")` is niet leeg.
2. `GET /api/quota/pools` retourneert `[]` (de DB is leeg).

Als beide voorwaarden waar zijn, wordt elke verouderde pool in een batch naar `POST /api/quota/pools` verzonden, waarna de localStorage-sleutel wordt verwijderd. De migratie is idempotent: voorwaarde 2 voorkomt dat de migratie opnieuw wordt uitgevoerd.

---

## Interne strategieclassificatie

`quota-share` is een routeringsstrategie die **uitsluitend intern** wordt gebruikt (`INTERNAL_ROUTING_STRATEGY_VALUES` in `src/shared/constants/routingStrategies.ts`). Deze wordt uitsluitend gebruikt door door het systeem aangemaakte `qtSd/`-poolcombinaties en is bewust uitgesloten van `ROUTING_STRATEGY_VALUES`, zodat deze nooit als door de gebruiker selecteerbare optie in de UI of API verschijnt.

---

## Testdekking

Twee lagen van geautomatiseerde dekking worden geleverd met de quota-share-engine:

| Suite              | Commando                                                               | Wat het omvat                                                                                                                                                                                          |
| :----------------- | :--------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Eenheid (29 tests) | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | DRR planner, verzadigingspoort, gelijktijdigheidslimieten, fairShare wiskunde, wachtrijen voor achterstanden                                                                                           |
| Integratiematrix   | `npm run test:combo:matrix`                                            | End-to-end routeringsbeslissing via de echte combo-pijplijn; DRR eerlijkheid + verzadiging deprioritering via live naden (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

De integratiematrix loopt in CI naast alle 22 publieke strategieën. De unitsuite kan standalone worden uitgevoerd.

---

## DB Schema Samenvatting

Drie tabellen toegevoegd door migraties `078`, `079` en `085`:

- `quota_pools` + `quota_allocations` — pooldefinities en toewijzingen per sleutel.
- `quota_consumption` — rollende tellers met 2 emmers per `(apiKeyId, dimensionKey)`.
- `provider_plans` — handmatige overschrijvingen van providerplannen (afmetingen JSON per connectionId).

Alle tabellen toegevoegd via idempotente `CREATE TABLE IF NOT EXISTS` migraties.

Toegestaan uitlenen voegt drie kolommen toe: `quota_allocations.lending_percent` (geheel getal, standaard 0), `quota_allocations.lending_until` (epoch milliseconden, of `NULL` voor geen deadline) en `quota_pools.borrow_mode` (standaard `saturation`). De migratie ervan voegt alleen deze kolommen toe en schrijft geen bestaande rij.

Het percentagetoeschrijvingsboek voegt `quota_percent_ledger` (één rij per pool, account en planvenster) en `quota_percent_ledger_tokens` (één tokenteller per pool, account en API sleutel) toe. `src/lib/db/quotaPercentLedger.ts` leest en schrijft ze.
