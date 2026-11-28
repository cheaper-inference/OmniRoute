# Progressive Web App (PWA) Guide (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/PWA_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/PWA_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/PWA_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/PWA_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/PWA_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/PWA_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/PWA_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/PWA_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/PWA_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/PWA_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/PWA_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/PWA_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/PWA_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/PWA_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/PWA_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/PWA_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/PWA_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/PWA_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/PWA_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/PWA_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/PWA_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/PWA_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/PWA_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/PWA_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/PWA_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/PWA_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/PWA_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/PWA_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/PWA_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/PWA_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/PWA_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/PWA_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/PWA_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/PWA_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/PWA_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/PWA_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/PWA_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/PWA_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/PWA_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/PWA_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/PWA_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/PWA_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/PWA_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/PWA_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/PWA_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/PWA_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/PWA_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/PWA_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/PWA_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/PWA_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/PWA_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/PWA_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/PWA_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/PWA_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/PWA_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/PWA_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/PWA_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/PWA_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/PWA_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/PWA_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/PWA_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/PWA_GUIDE.md)

---

Asenna OmniRoute Dashboard Progressive Web App -sovellukseksi avataksesi sen aloitusnäytöltä tai työpöydältä erillisessä ikkunassa. Asennettu sovellus tarvitsee edelleen yhteyden OmniRoute -palvelimeesi navigointia, kojelautatietoja ja API -pyyntöjä varten. Välimuistissa olevat staattiset resurssit eivät tarjoa offline-yhdyskäytävää tai offline-hallintapaneelia.

## Mikä on PWA?

Progressiivinen verkkosovellus käyttää web-hallintapaneelia, jossa on sovelluskuvake ja erillinen ikkuna. Asennuksen jälkeen OmniRoute:

- Käynnistyy aloitusnäytöltä tai työpöydältä
- Avautuu itsenäisenä tilassa ilman selaimen tavallista osoitepalkkia ja välilehtiä
- Tallentaa välimuistiin valitut staattiset resurssit
- Tukee pysty- ja vaakasuuntauksia

## Asennus

Käytä HTTPS -osoitetta toisen laitteen palvelimelle. Kun palvelin toimii samalla laitteella, `http://localhost:20128` täyttää myös selaimen asennettavuusvaatimukset. Pelkkä `http://YOUR_IP:20128` -osoite ei täytä näitä vaatimuksia. Asennusvalikot ja kehotteet riippuvat selaimesta ja käyttöjärjestelmästä. Katso [MDN:n PWA -asennusvaatimukset](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#https_localhost_or_loopback_are_required).

### Android (Chrome)

1. Avaa OmniRoute HTTPS -osoitteesi tai `http://localhost:20128` palvelimelle samassa puhelimessa.
2. Avaa**⋮** valikko ja valitse** Asenna sovellus** tai** Lisää aloitusnäyttöön** , jos tarjotaan.
3. Vahvista kehote.
4. Avaa OmniRoute aloitusnäytöstä.

### iOS (Safari)

1. Avaa OmniRoute HTTPS -osoitteesi Safarissa.
2. Napauta** Jakaa** →** Lisää aloitusnäyttöön** .
3. Vahvista nimi ja napauta** Lisätä** .
4. Avaa OmniRoute aloitusnäytöstä.

### Työpöytä (Chrome / Edge)

1. Avaa OmniRoute -kojelautasi.
2. Käytä selaimen asennuskuvaketta tai** Asenna sovellus** valikkokohta, jos tarjotaan.
3. Vahvista kehote avata OmniRoute omassa ikkunassaan.

## Ominaisuudet

### Itsenäinen ikkuna

Manifesti asettaa `display: "standalone"` ja `start_url: "/dashboard"`. Asennettu sovellus avaa kojelaudan sovellusikkunassa. Selaimen ja käyttöjärjestelmän ohjaimet voivat silti näkyä; luettelo ei pyydä koko näytön tilaa.

### Välimuistissa olevat resurssit ja verkkovaatimukset

[Palvelutyöntekijä](../../public/sw.js) tallentaa välimuistiin valitut samaa alkuperää olevat resurssit:

| Pyyntö tai omaisuus                      | strategia        | Käyttäytyminen                                                                                                                            |
| ---------------------------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Asennusaikaresurssit                     | Pre-cache        | `/`, `/manifest.webmanifest`, `/icon-512.png` ja `/apple-touch-icon.png` tallennetaan välimuistiin työntekijän asennuksen aikana          |
| Next.js staattiset varat (`/_next/`)     | Verkko ensin     | Onnistuneet vastaukset päivittävät välimuistin; verkkovirhe palaa olemassa olevaan välimuistissa olevaan vastaukseen                      |
| Muut staattiset CSS, JS, kuvat ja fontit | Välimuisti ensin | Olemassa oleva välimuistissa oleva vastaus käytetään uudelleen; onnistuneet verkkovastaukset tallennetaan välimuistiin, jos se ei onnistu |
| Sivulla navigointi                       | Ohittaa          | Selain hakee sivun suoraan; offline-varaa ei tarjota                                                                                      |
| API, kojelauta ja todennusreitit         | Ohittaa          | Työntekijä ei sieppaa tai tallenna näitä pyyntöjä välimuistiin                                                                            |
| Muut ei-staattiset pyynnöt               | Verkko           | Ei välimuistin hakua tai tallennusta                                                                                                      |

Poissuljetut reitit ovat `/api`, `/a2a`, `/dashboard`, `/v1`, `/v1beta`, `/models`, `/chat`, `/responses`, `/codex`, `/callback` ja `/login`, joiden kirjainkoolla ei ole merkitystä polun rajoissa. Ristiinlähtöiset ja ei-GET-pyynnöt ohittavat myös työntekijän.

### Yhteyssivu

`/offline` sivulla on yhteysviesti, online/offline -ilmaisin, a** Yritä muodostaa yhteys uudelleen** -painiketta ja linkin tilasivulle. Se on** ei ole valmiiksi tallennettu** ja huoltotyöntekijä tekee** ei** uudelleenohjaa epäonnistuneet navigoinnit siihen. Sen olemassaolo ei tee uusille sivuille pääsyä ilman palvelinta.

### Sovelluskuvakkeet

Luettelossa mainostetaan näitä PNG kuvakkeita:

| Tiedosto               | Koko    | Käyttää                              |
| ---------------------- | ------- | ------------------------------------ |
| `icon-192.png`         | 192×192 | Yleinen sovelluskuvake               |
| `icon-512.png`         | 512×512 | Yleinen ja maskoitava sovelluskuvake |
| `apple-touch-icon.png` | 180×180 | Applen aloitusnäytön kuvake          |

Selain valitsee asennuskohteelle sopivan kuvakkeen.

### Automaattinen rekisteröinti

`PwaRegister` rekisteröi työntekijän tuotantoon, kun selain tukee palvelutyöntekijöitä. Kehitystila poistaa työntekijöiden rekisteröinnin ja tyhjentää välimuistit, jotta vanhentunut omaisuus ei häiritse kuumaa uudelleenlatausta. Asennuskehotteet jäävät selaimen päätökseen.

## Tekninen arkkitehtuuri

### Verkkosovellusluettelo

Next.js luo `/manifest.webmanifest` :n [`src/app/manifest.ts`](../../src/app/manifest.ts). Sen tärkeimmät asetukset ovat:

| Asetus                | Arvo                                 |
| --------------------- | ------------------------------------ |
| `short_name`          | `OmniRoute`                          |
| `start_url`           | `/dashboard`                         |
| `scope`               | `/`                                  |
| `display`             | `standalone`                         |
| `orientation`         | `any`                                |
| Tausta- ja teemavärit | `PWA_THEME_COLORS` oletusvalopaletti |

Luettelon nimi ja kuvaus ovat staattisia arvoja kyseisessä lähdetiedostossa. Asennettu luettelo ei seuraa esiintymän nimi -asetusta tai aktiivista palettia jokaisella käynnillä.

### Palvelutyöntekijä

[`public/sw.js`](../../public/sw.js) ei ole palvelutyöntekijän kehysriippuvuutta:

- **Asentaa:** tallentaa valmiiksi välimuistiin neljä yllä lueteltua resurssia ja aktivoi uuden työntekijän.
- **Aktivoida:** poistaa vanhemmat välimuistisukupolvet ja vaativat asiakkaat.
- **Hae:** soveltaa yllä olevia staattisen omaisuuden strategioita ja reittien poissulkemisia.
- **Versiointi:** lähdevälimuistin nimi on `omniroute-pwa-v3`; tuotantokoonnos leimaa välimuistin identiteetin.
- **Ilmoitukset:** käsittelee saapuvat `push` -tapahtumat ja tarkentaa tai avaa ikkunan, kun ilmoitusta napsautetaan.

Push-tapahtumakäsittelijät eivät yksin muodosta aktiivista push-tilausta tai määritettyä palvelintoimitusta. Älä oleta, että ilmoitukset ovat käytössä vain siksi, että PWA on asennettu.

### Asettelun metatiedot ja rekisteröinti

[`src/app/layout.tsx`](../../src/app/layout.tsx) tarjoaa manifest-linkin, Applen erilliset metatiedot, teeman värit ja `viewport-fit: cover`. Sivun otsikko ja Apple-verkkosovelluksen otsikko käyttävät ilmentymän nimeä. Live-selaimen teeman väri seuraa palettia; asennusluettelo käyttää oletusvaloväriä.

[`PwaRegister`](../../src/shared/components/PwaRegister.tsx) toimii asiakaskoneessa ja rekisteröi `/sw.js` ID -koontiversioon URL:ssä. Se havaitsee yhteensopimattomat välimuistisukupolvet ja voi nollata työntekijän ja ladata sen uudelleen kerran palauttaakseen vanhan asennuksen. Rekisteröintivirhe ei estä kojelautaa.

## Käytä Termuxin kanssa (Android)

1. Aloita OmniRoute Termuxissa: `npx -y omniroute@latest`.
2. Avaa Chrome samassa puhelimessa: `http://localhost:20128`.
3. Asenna PWA selaimen asennusvalikon kautta.
4. Pidä Termux-palvelin käynnissä, kun käytät kojelautaa.

Puhelimessa on sekä yhdyskäytävä että sen kojelauta. Pyynnöt etä- AI palveluntarjoajille tarvitsevat edelleen verkkoyhteyden. Katso [Termux-oppaasta](TERMUX_GUIDE.md) asennusta ja Android-prosessin elinikää koskevat näkökohdat.

## Käytä muista laitteista

Avaa palvelimen HTTPS -osoite puhelimella, tabletilla tai työpöydällä ja seuraa sitten kyseisen selaimen asennuskulkua. Palvelimen on oltava tavoitettavissa jokaiselta laitteelta. Katso [tunnelioppaasta](../ops/TUNNELS_GUIDE.md) etäkäyttövaihtoehdot.

## Räätälöinti

### Ilmentymän nimi

The** Ilmentymän nimi** asetus muuttaa kojelaudan metatietoja, mukaan lukien sivun otsikko ja Applen verkkosovelluksen otsikko. Luodussa luettelossa käytetään staattista nimeä, joten tämä asetus ei takaa, että jo asennettu sovellus nimetään uudelleen.

### Mukautettu Favicon

Mukautettu favicon muuttaa selaimen suosikkikuvaketta. Asennusluettelo mainostaa edelleen yllä olevia PNG tiedostoja; faviconin muuttaminen ei korvaa näitä aloitusnäytön kuvakkeita.

## Rajoitukset

- **Palvelinyhteys vaaditaan:** sivunavigointi-, hallintapaneelin tila- ja API -pyynnöillä ei ole offline-varaa.
- **Ei taustasynkronointia:** offline-toimintoja ei ole asetettu uusintajonoon.
- **Selaimen erot:** asennusvalikot, ikkunaesitys ja ilmoitustuki vaihtelevat käyttöympäristön mukaan.
- **Ei API -vastausvälimuistia:** työntekijä sulkee pois API, kojelaudan ja todennusreitit.
- **Staattiset asennuskuvakkeet:** näiden kuvakkeiden päivittäminen edellyttää mainostettujen resurssien muuttamista; selaimet voivat säilyttää asennetut metatiedot.

## Tiedostojen viite

| Tiedosto                                                                               | Tarkoitus                                                      |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| [src/app/manifest.ts](../../src/app/manifest.ts)                                       | Luotu verkkosovellusluettelo                                   |
| [public/sw.js](../../public/sw.js)                                                     | Välimuisti, poissulkemiset ja ilmoitustapahtumien käsittelijät |
| [src/shared/components/PwaRegister.tsx](../../src/shared/components/PwaRegister.tsx)   | Tuotannon rekisteröinti ja vanhentuneen välimuistin palautus   |
| [src/app/offline/page.tsx](../../src/app/offline/page.tsx)                             | Yhteyssivu, ei automaattinen offline-varavaihtoehto            |
| [src/app/layout.tsx](../../src/app/layout.tsx)                                         | Sivun metatiedot ja näkymäasetukset                            |
| [src/shared/constants/pwaThemeColors.ts](../../src/shared/constants/pwaThemeColors.ts) | Jaetut teema-väriarvot                                         |
| [public/icon-512.png](../../public/icon-512.png)                                       | 512 × 512 -sovelluskuvake                                      |
| [public/apple-touch-icon.png](../../public/apple-touch-icon.png)                       | 180 × 180 Apple-kuvake                                         |
