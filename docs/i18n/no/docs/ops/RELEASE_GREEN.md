# Release-Green: candidate validation and evidence (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Release-Green observerer en spesifikk forpliktelse og rapporterer valideringsresultatene. [Quality Gates-referansen](../architecture/QUALITY_GATES.md) definerer gjeldende CI profiler, nødvendige kontroller og akseptpolicy. Den versjonerte opptakspolicyen i `config/quality/admission-policy.json` er den kjørbare kontrakten for `Gate / CI` og `Gate / Quality`.

## CI og observatøromfang

`ci.yml` og `quality.yml` dekning trekker forespørsler til hoved- og utgivelsesgrener. Den valgte profilen avgjør hvilke jobber som gjelder. Full CI inkluderer også baner som en vanlig pull-forespørsel ikke utfører. Et raskt observatørresultat kan ikke erstatte disse jobbene, og en fullført arbeidsflytomslag kan ikke erstatte sine kvitteringer.

Produksjonsbygget tilhører CI. Det er ingen duplikat av rådgivende bygg i `quality.yml`. Manglende gjenstander, kansellert arbeid og ufullstendige målinger etablerer ikke en vellykket påkrevd sjekk. Bekreft gjeldende base, leder og kombinert kandidat før du godtar resultatene.

## Lokal validering

Kjør observatøren i et eid arbeidstre etter å ha forberedt dens avhengigheter. Følg arbeidstreet og ressursprotokollen i `docs/ops/WORKTREE_ISOLATION.md` før tung validering.

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

Hurtigprofilen er delvis. Den fullstendige profilen sjekker de modellerte kravene og bevarer kommandokvitteringer; den sertifiserer ikke distribusjon eller erstatter gjeldende vertskontroller. Rapporten skiller utførelsesfeil fra metrisk drift. Nødvendige skraller forblir blokkerende i henhold til den valgte policyen. Ikke hev en grunnlinje bare for å oppnå et bestått resultat.

## Nattlige og manuelle sveip

De nattlige utgivelses- og kompatibilitetsløserne velger en kanonisk utgivelsesgren. Dette valget må samsvare med grenen som utløste arbeidsflyten, og suitene bruker arrangementets uforanderlige SHA. For manuell utførelse, velg den tiltenkte utgivelsen i `release_branch` og send på samme ref:

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

Sending på tvers av grener avvises før den valgte koden utføres. Vertsbaserte hovedsuiter sjekker ut `main` og kontrollerer at SHA fortsatt samsvarer med det løste målet før installasjon. Hvis hovedtrekk under oppløsningen, kjør det ufullstendige sveipet på nytt på den nye commit. Ikke kombiner suitekvitteringer fra forskjellige kandidater.

## Feil triage og restitusjon

Bruk hendelsen som en diagnostisk indeks, og inspiser deretter den nøyaktige kjøringen, forsøket, feiltrinn og artefakt. Sammenlign tilsvarende grunnlag og kandidatbevis før du tilskriver en svikt til en bidragsyter. Infrastrukturfeil, arvede defekter, kandidatregresjoner og ventende godkjenninger krever ulike rettsmidler.

`/green-prs`, `/sweep-reds`, `/validate-release-green` og `/babysit` -ferdighetene samler bevis og forbereder rettelser under deres dokumenterte omfang. Behold bidragsyterkreditt, bruk isolerte reparasjonsavdelinger og kontroller alle nødvendige kontroller før en autorisert sammenslåing. Ingen automatisk rebaseline eller hendelseslukking erstatter en bestått gjeldende kandidat.
