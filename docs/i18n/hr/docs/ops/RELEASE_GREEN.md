# Release-Green: candidate validation and evidence (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Release-Green promatra određeno preuzimanje i izvješćuje o rezultatima provjere valjanosti. [Referenca Quality Gates](../architecture/QUALITY_GATES.md) definira trenutne CI profile, potrebne provjere i politiku prihvaćanja. [Politika pristupa](../../config/quality/admission-policy.json) s verzijom je izvršni ugovor za `Gate / CI` i `Gate / Quality`.

## CI i opseg promatrača

`ci.yml` i `quality.yml` pokrivaju zahtjeve za povlačenjem u glavne i otpuštajuće grane. Odabrani profil određuje koji će se poslovi primjenjivati. Puni CI također uključuje staze koje obični zahtjev za povlačenjem ne izvršava. Brzi rezultat promatrača ne može zamijeniti te poslove, a dovršeni omotač tijeka rada ne može zamijeniti svoje račune.

Proizvodnja pripada CI. U `quality.yml` nema dvostruke savjetodavne građe. Artefakti koji nedostaju, otkazani radovi i nepotpuna mjerenja ne uspostavljaju uspješnu traženu provjeru. Prije prihvaćanja rezultata potvrdite trenutnu bazu, glavnog i kombiniranog kandidata.

## Lokalna provjera valjanosti

Pokrenite promatrač u radnom stablu u vlasništvu nakon pripreme njegovih ovisnosti. Koristite [radno stablo i protokol resursa](WORKTREE_ISOLATION.md) prije teške provjere valjanosti.

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

Brzi profil je djelomičan. Puni profil provjerava svoje modelirane zahtjeve i čuva potvrde o naredbama; ne potvrđuje implementaciju niti zamjenu za primjenjive hostirane provjere. Izvješće razlikuje neuspjeh izvršenja od pomaka metrike. Potrebne čegrtaljke ostaju blokirane prema odabranoj politici. Nemojte podizati osnovnu liniju samo da biste dobili prolazan rezultat.

## Noćno i ručno čišćenje

Noćno izdanje i razrješivači kompatibilnosti odabiru granu kanonskog izdanja. Taj odabir mora odgovarati grani koja je pokrenula tijek rada, a paketi koriste nepromjenjivi SHA događaja. Za ručno izvršenje odaberite namjeravano izdanje u `release_branch` i pošaljite na isti ref.

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

Slanje između grana se odbija prije izvršenja odabranog koda. Hostirani glavni paketi provjeravaju `main` i provjeravaju odgovara li njegov SHA i dalje razriješenom cilju prije instalacije. Ako se main pomakne tijekom rješavanja, ponovno pokrenite nepotpuno brisanje na novom predanju. Nemojte kombinirati račune različitih kandidata.

## Trijaža kvarova i oporavak

Upotrijebite incident kao dijagnostički indeks, zatim pregledajte točan rad, pokušaj, neuspjeli korak i artefakt. Usporedite ekvivalentnu bazu i dokaze kandidata prije nego što pripišete neuspjeh suradniku. Infrastrukturne pogreške, naslijeđeni nedostaci, regresije kandidata i odobrenja na čekanju zahtijevaju različite lijekove.

Vještine `/green-prs`, `/sweep-reds`, `/validate-release-green` i `/babysit` prikupljaju dokaze i pripremaju popravke u okviru svog dokumentiranog opsega. Zadržite zasluge suradnika, koristite izolirane ogranke za popravak i provjerite sve potrebne provjere prije ovlaštenog spajanja. Nikakva automatska ponovna baza ili zatvaranje incidenta ne zamjenjuje prolaznog trenutnog kandidata.
