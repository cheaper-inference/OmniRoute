# Release-Green: candidate validation and evidence (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Cloíonn Release-Green gealltanas ar leith agus tuairiscíonn sé a thorthaí bailíochtaithe. Sainmhíníonn [tagairt Quality Gates](../architecture/QUALITY_GATES.md) na próifílí CI reatha, na seiceálacha riachtanacha agus an beartas glactha. Is é an [polasaí iontrála](../../config/quality/admission-policy.json) versioned ná an conradh inrite do `Gate / CI` agus `Gate / Quality`.

## CI agus raon feidhme an bhreathnóra

Tarraingíonn clúdach `ci.yml` agus `quality.yml` iarratais isteach sna príomhbhrainsí agus scaoiltear iad. Socraíonn an phróifíl roghnaithe na poist a bhfuil feidhm leo. Áiríonn CI Iomlán lánaí freisin nach ndéanann iarratas gnáththarraingthe a fhorghníomhú. Ní féidir le toradh tapa breathnadóireachta athsholáthar a dhéanamh ar na poist sin, agus ní féidir le fillteán sreafa oibre comhlánaithe a fháltais a athsholáthar.

Is le CI an tógáil táirgeachta. Níl aon tógáil chomhairleach dhúblach i `quality.yml`. Ní bhunaíonn déantáin atá ar iarraidh, obair chealaithe agus tomhais neamhiomlána seiceáil riachtanach rathúil. Deimhnigh an bonn reatha, an ceann agus an t-iarrthóir comhcheangailte sula nglacfar leis na torthaí.

## Bailíochtú áitiúil

Rith an breathnóir i crann oibre faoi úinéireacht tar éis a spleáchais a ullmhú. Úsáid an [crann oibre agus an prótacal acmhainne](WORKTREE_ISOLATION.md) roimh bhailíochtú trom.

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

Tá an próifíl tapa páirteach. Seiceálann an phróifíl iomlán a riachtanais mhúnlaithe agus caomhnaítear admhálacha ordaithe; ní dheimhníonn sé imscaradh ná seiceálacha óstaithe infheidhme a ionadú. Déanann an tuarascáil idirdhealú idir teip forghníomhaithe agus sruth méadrach. Fanann raiceanna riachtanacha blocála de réir an bheartais roghnaithe. Ná ardaigh bunlíne ach chun toradh pasála a fháil.

## Scuabadh láimhe agus oíche

Roghnaíonn na réititheoirí scaoilte oíche agus comhoiriúnachta brainse scaoileadh canónach. Caithfidh an roghnú sin a bheith ag teacht leis an mbrainse a spreag an sreabhadh oibre, agus úsáideann na seomraí SHA do-athlasta an imeachta . Chun é a dhéanamh de láimh, roghnaigh an eisiúint atá beartaithe in `release_branch` agus seol ar an tagairt chéanna:

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

Diúltaítear seoladh traschraoibhe roimh an gcód roghnaithe a fhorghníomhú. D'óstáil príomhsvuít seiceála `main` agus deimhnigh go bhfuil a SHA fós ag teacht leis an sprioc réitithe roimh an tsuiteáil. Má dhéantar an príomhaistriú le linn réitigh, déan an scuabadh neamhiomlán ar an ngealltanas nua arís. Ná cuir admhálacha suite ó iarrthóirí éagsúla le chéile.

## Teip triage agus aisghabháil

Bain úsáid as an teagmhas mar innéacs diagnóiseach, ansin déan iniúchadh ar an rith, ar an iarracht, ar an gcéim theip agus ar an déantán. Déan comparáid idir bonn coibhéiseach agus fianaise iarrthóra sula gcuirtear teip i leith rannpháirtí. Teastaíonn réitigh éagsúla ó earráidí bonneagair, lochtanna a fuarthas le hoidhreacht, aischéimniú iarrthóra agus ceaduithe ar feitheamh.

Bailíonn na scileanna `/green-prs`, `/sweep-reds`, `/validate-release-green` agus `/babysit` fianaise agus ullmhaíonn siad réitigh faoina raon feidhme doiciméadaithe. Coinnigh creidmheas ranníocóra, bain úsáid as brainsí deisiúcháin iargúlta, agus fíoraigh gach seiceáil riachtanach roimh chumasc údaraithe. Gan aon athbhunús uathoibríoch nó dúnadh teagmhais a chur in ionad iarrthóir reatha a bhfuil pas faighte aige.
