# Release-Green: candidate validation and evidence (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

A Release-Green megfigyel egy adott véglegesítést, és jelenti annak érvényesítési eredményeit. A [Quality Gates hivatkozás](../architecture/QUALITY_GATES.md) határozza meg az aktuális CI profilokat, a szükséges ellenőrzéseket és az elfogadási szabályzatot. A verziózott [felvételi szabályzat](../../config/quality/admission-policy.json) `Gate / CI` és `Gate / Quality` végrehajtható szerződése.

## CI és megfigyelői kör

`ci.yml` és `quality.yml` cover kéréseket von le a fő- és kiadási ágakba. A kiválasztott profil határozza meg, hogy mely munkák érvényesek. A teljes CI olyan sávokat is tartalmaz, amelyeket egy szokásos lehívási kérés nem hajt végre. A gyors megfigyelő eredménye nem tudja helyettesíteni ezeket a feladatokat, és egy befejezett munkafolyamat-csomagoló nem tudja helyettesíteni a nyugtákat.

A gyártási build CI hoz tartozik. `quality.yml` ben nincs duplikált tanácsadó build. A hiányzó műtermékek, a törölt munkák és a hiányos mérések nem jelentik a sikeres szükséges ellenőrzést. Az eredmények elfogadása előtt erősítse meg az aktuális bázist, fejet és kombinált jelöltet.

## Helyi érvényesítés

Futtassa a megfigyelőt egy saját munkafán, miután elkészítette a függőségeit. Használja a [munkafát és az erőforrás protokollt](WORKTREE_ISOLATION.md) az erős ellenőrzés előtt.

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

A gyorsprofil részleges. A teljes profil ellenőrzi a modellezett követelményeit, és megőrzi a parancs nyugtáit; nem igazolja a telepítést, és nem helyettesíti az alkalmazandó hosztolt ellenőrzéseket. A jelentés megkülönbözteti a végrehajtási hibát a metrikus eltolódástól. A szükséges kilincsek továbbra is blokkolva maradnak a kiválasztott házirendnek megfelelően. Ne emelje meg az alapvonalat pusztán a megfelelő eredmény elérése érdekében.

## Éjszakai és kézi seprés

Az éjszakai kiadás és a kompatibilitási megoldók kiválasztanak egy kanonikus kiadási ágat. Ennek a kijelölésnek meg kell egyeznie a munkafolyamatot elindító ággal, és a csomagok az esemény megváltoztathatatlan SHA használják. A kézi végrehajtáshoz válassza ki a kívánt kiadást `release_branch` ben, és küldje el ugyanazon a hivatkozáson:

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

Az ágak közötti küldést a rendszer a kiválasztott kód végrehajtása előtt elutasítja. A hosztolt fő csomagok ellenőrzik `main`, és a telepítés előtt ellenőrzik, hogy a SHA továbbra is megfelel-e a megoldott célnak. Ha a feloldás során fő lépések történtek, futtassa újra a hiányos sweepet az új véglegesítéskor. Ne kombinálja a különböző jelöltektől származó csomagnyugtákat.

## Kudarcok besorolása és helyreállítása

Használja az incidenst diagnosztikai indexként, majd ellenőrizze a pontos futtatást, kísérletet, sikertelen lépést és műterméket. Hasonlítsa össze az egyenértékű alap- és jelölt bizonyítékokat, mielőtt egy közreműködőnek tulajdonítja a mulasztást. Az infrastrukturális hibák, az öröklött hibák, a jelölt regressziók és a függőben lévő jóváhagyások különböző orvoslást igényelnek.

A `/green-prs`, `/sweep-reds`, `/validate-release-green` és `/babysit` készségek bizonyítékokat gyűjtenek és javításokat készítenek elő a dokumentált hatókörükön belül. Tartsa meg a közreműködő hitelét, használjon elszigetelt javítási ágakat, és ellenőrizze az összes szükséges ellenőrzést az engedélyezett egyesítés előtt. Nem helyettesíti az automatikus alapvonal-bezárást vagy az incidens lezárását az átmenő jelenlegi jelölt helyett.
