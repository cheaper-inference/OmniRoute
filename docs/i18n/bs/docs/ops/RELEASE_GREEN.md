# Release-Green: candidate validation and evidence (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Release-Green posmatra određeno urezivanje i prijavljuje rezultate njegove validacije. [Referenca Quality Gates](../architecture/QUALITY_GATES.md) definira trenutne CI profile, potrebne provjere i politiku prihvatanja. Versionirana politika prijema u `config/quality/admission-policy.json` je izvršni ugovor za `Gate / CI` i `Gate / Quality`.

## CI i opseg posmatrača

`ci.yml` i `quality.yml` cover povlače zahtjeve u glavne i otpuštajuće grane. Odabrani profil određuje koji poslovi se primjenjuju. Puni CI također uključuje trake koje običan zahtjev za povlačenjem ne izvršava. Brzi rezultat posmatrača ne može zamijeniti te poslove, a dovršeni omotač toka posla ne može zamijeniti njegove račune.

Proizvodna zgrada pripada CI. U `quality.yml` ne postoji duplikat savjetodavne građe. Nedostatak artefakata, otkazani rad i nepotpuna mjerenja ne utvrđuju uspješnu potrebnu provjeru. Potvrdite trenutnu bazu, šefa i kombinovanog kandidata prije prihvatanja rezultata.

## Lokalna validacija

Pokrenite promatrač u radnom stablu u vlasništvu nakon pripreme njegovih zavisnosti. Slijedite protokol stabla rada i resursa u `docs/ops/WORKTREE_ISOLATION.md` prije teške validacije.

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

Brzi profil je djelomičan. Puni profil provjerava svoje modelirane zahtjeve i čuva potvrde komandi; ne potvrđuje implementaciju niti zamjenjuje primjenjive hostirane provjere. Izvještaj razlikuje neuspjeh izvršenja od metričkog pomaka. Neophodne čegrtaljke ostaju blokirane prema odabranoj politici. Nemojte podizati osnovnu liniju samo da biste dobili prolazan rezultat.

## Noćno i ručno čišćenje

Noćno izdanje i razrješači kompatibilnosti odabiru granu kanonskog izdanja. Taj odabir mora odgovarati grani koja je pokrenula tok posla, a paketi koriste nepromjenjivi SHA događaja. Za ručno izvršenje, odaberite planirano izdanje u `release_branch` i pošaljite na istom ref:

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

Prije izvršenja odabranog koda odbija se slanje u više podružnica. Hostovani glavni paketi preuzimaju `main` i provjerite da li njegov SHA još uvijek odgovara riješenom cilju prije instalacije. Ako se glavni potezi tokom rješavanja, ponovite nepotpuno čišćenje na novom urezivanju. Nemojte kombinovati račune različitih kandidata.

## Trijaža kvarova i oporavak

Koristite incident kao dijagnostički indeks, a zatim provjerite točan rad, pokušaj, neuspješan korak i artefakt. Uporedite ekvivalentnu bazu i dokaze kandidata prije nego što pripišete neuspjeh saradniku. Infrastrukturne greške, naslijeđeni defekti, regresije kandidata i odobrenja na čekanju zahtijevaju različite lijekove.

`/green-prs`, `/sweep-reds`, `/validate-release-green` i `/babysit` vještine prikupljaju dokaze i pripremaju popravke u okviru svog dokumentiranog opsega. Zadržite kredit saradnika, koristite izolirane podružnice za popravke i provjerite sve potrebne provjere prije ovlaštenog spajanja. Nijedna automatska ponovna baza ili zatvaranje incidenta ne mogu zamijeniti trenutnog kandidata koji prolazi.
