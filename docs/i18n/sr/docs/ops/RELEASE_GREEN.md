# Release-Green: candidate validation and evidence (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Релеасе-Греен посматра одређено урезивање и пријављује резултате његове валидације. [Референца Куалити Гатес](../architecture/QUALITY_GATES.md) дефинише тренутне CI профиле, потребне провере и политику прихватања. Версионирана политика пријема у `config/quality/admission-policy.json` је извршни уговор за `Gate / CI` и `Gate / Quality`.

## CI и опсег посматрача

`ci.yml` и `quality.yml` цовер повлаче захтеве у главне и отпуштајуће гране. Изабрани профил одређује који послови се примењују. Пун CI такође укључује траке које обичан захтев за повлачењем не извршава. Брзи резултат посматрача не може да замени те послове, а завршени омотач тока посла не може да замени своје признанице.

Производна зграда припада CI. У `quality.yml` нема дуплих саветодавних верзија. Недостатак артефаката, отказани рад и непотпуна мерења не утврђују успешну потребну проверу. Потврдите тренутну базу, шефа и комбинованог кандидата пре прихватања резултата.

## Локална валидација

Покрените посматрач у радном стаблу у власништву након припреме његових зависности. Пратите стабло рада и протокол ресурса у `docs/ops/WORKTREE_ISOLATION.md` пре тешке валидације.

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

Брзи профил је делимичан. Пун профил проверава своје моделоване захтеве и чува пријеме команди; не потврђује примену нити замену за применљиве хостоване провере. Извештај разликује неуспех у извршењу од метричког одступања. Неопходне чегртаљке остају блокиране у складу са изабраном политиком. Немојте подизати основну линију само да бисте добили пролазан резултат.

## Ноћно и ручно чишћење

Ноћно издање и разрешивачи компатибилности бирају грану канонског издања. Тај избор мора да одговара грани која је покренула ток посла, а пакети користе непроменљиви SHA догађаја. За ручно извршење, изаберите планирано издање у `release_branch` и пошаљите на истом реф:

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

Отпремање у више филијала се одбија пре извршења изабраног кода. Хостовани главни пакети преузимају `main` и уверавају се да његов SHA још увек одговара решеном циљу пре инсталације. Ако се главни потези током решавања, поново покрените непотпуно чишћење на новом урезивању. Немојте комбиновати рачуне различитих кандидата.

## Тријажа неуспеха и опоравак

Користите инцидент као дијагностички индекс, а затим проверите тачан рад, покушај, неуспешан корак и артефакт. Упоредите еквивалентну базу и доказе кандидата пре него што припишете неуспех сараднику. Инфраструктурне грешке, наслеђени недостаци, регресије кандидата и одобрења на чекању захтевају различите лекове.

`/green-prs`, `/sweep-reds`, `/validate-release-green` и `/babysit` вештине прикупљају доказе и припремају исправке у оквиру свог документованог опсега. Задржите кредит сарадника, користите изоловане филијале за поправке и проверите све потребне провере пре овлашћеног спајања. Ниједна аутоматска поновна база или затварање инцидента не могу заменити тренутног кандидата који пролази.
