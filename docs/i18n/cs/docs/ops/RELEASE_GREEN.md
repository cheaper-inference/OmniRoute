# Release-Green: candidate validation and evidence (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Release-Green sleduje konkrétní odevzdání a hlásí výsledky jeho ověření. [Reference Gates kvality](../architecture/QUALITY_GATES.md) definuje aktuální profily CI, požadované kontroly a zásady přijímání. Verzovaná [politika přijímání](../../config/quality/admission-policy.json) je spustitelný kontrakt pro `Gate / CI` a `Gate / Quality`.

## CI a rozsah pozorovatele

`ci.yml` a `quality.yml` pokrývají požadavky na stažení do hlavní a uvolněné větve. Vybraný profil určuje, které úlohy se použijí. Úplné CI také zahrnuje pruhy, které běžný požadavek na vyžádání nevykonává. Výsledek rychlého pozorovatele nemůže nahradit tyto úlohy a dokončený obal pracovního postupu nemůže nahradit jeho účtenky.

Produkční sestava patří CI. V `quality.yml` není žádné duplicitní sestavení poradenství. Chybějící artefakty, zrušená práce a neúplná měření nezakládají úspěšnou požadovanou kontrolu. Před přijetím výsledků potvrďte aktuální základnu, hlavu a kombinovaného kandidáta.

## Místní ověření

Po přípravě jeho závislostí spusťte pozorovatele ve vlastněném pracovním stromu. Před náročným ověřováním použijte [protokol pracovního stromu a prostředků](WORKTREE_ISOLATION.md).

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

Rychlý profil je částečný. Úplný profil kontroluje své modelované požadavky a zachovává příjmy příkazů; necertifikuje nasazení ani nenahrazuje příslušné hostované kontroly. Zpráva rozlišuje selhání provedení od posunu metriky. Požadované ráčny zůstávají blokovány podle zvolené zásady. Nezvyšujte základní linii pouze proto, abyste dosáhli průchozího výsledku.

## Noční a ruční zametání

Noční verze a překladače kompatibility vybírají větev kanonické verze. Tento výběr musí odpovídat větvi, která spustila pracovní postup, a sady používají neměnný SHA události. Pro ruční provedení vyberte zamýšlené vydání v `release_branch` a odešlete na stejnou adresu:

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

Před provedením vybraného kódu je odmítnuto odeslání mezi pobočkami. Hostované hlavní sady před instalací prověří `main` a ověří, že její SHA stále odpovídá vyřešenému cíli. Pokud se hlavní pohne během řešení, spusťte znovu neúplné rozmítání nového odevzdání. Nekombinujte účtenky od různých kandidátů.

## Třídění a zotavení selhání

Použijte incident jako diagnostický index a poté zkontrolujte přesný běh, pokus, neúspěšný krok a artefakt. Než přisoudíte neúspěch přispěvateli, porovnejte ekvivalentní základnu a důkazy kandidátů. Chyby v infrastruktuře, zděděné defekty, regrese kandidátů a čekající na schválení vyžadují různá nápravná opatření.

Dovednosti `/green-prs`, `/sweep-reds`, `/validate-release-green` a `/babysit` shromažďují důkazy a připravují opravy v rámci svého zdokumentovaného rozsahu. Udržujte kredit přispěvatele, používejte izolované větve oprav a ověřte všechny požadované kontroly před autorizovaným sloučením. Žádné automatické přehodnocení nebo uzavření incidentu nenahrazuje procházejícího aktuálního kandidáta.
