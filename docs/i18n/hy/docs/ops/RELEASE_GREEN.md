# Release-Green: candidate validation and evidence (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Release-Green-ը դիտում է կոնկրետ պարտավորություն և հայտնում դրա վավերացման արդյունքները: [Որակի դարպասների հղումը](../architecture/QUALITY_GATES.md) սահմանում է ընթացիկ CI պրոֆիլները, պահանջվող ստուգումները և ընդունման քաղաքականությունը: [Ընդունման տարբերակված քաղաքականությունը](../../config/quality/admission-policy.json) `Gate / CI` և `Gate / Quality` համար կատարվող պայմանագիրն է:

## CI և դիտորդի շրջանակը

`ci.yml` և `quality.yml` կափարիչը հարցումները տեղափոխում են հիմնական և թողարկվող մասնաճյուղեր: Ընտրված պրոֆիլը որոշում է, թե որ աշխատատեղերը կկիրառվեն: Full CI ներառում է նաև ուղիներ, որոնք սովորական ձգման հարցումը չի կատարում: Դիտորդի արագ արդյունքը չի կարող փոխարինել այդ աշխատանքները, և ավարտված աշխատանքային հոսքի փաթաթումը չի կարող փոխարինել դրա անդորրագրերը:

Արտադրական կառուցվածքը պատկանում է CI ին: `quality.yml` ում կրկնօրինակ խորհրդատվական կառուցվածք չկա: Բացակայող արտեֆակտները, չեղարկված աշխատանքը և թերի չափումները չեն հաստատում հաջող պահանջվող ստուգում: Նախքան արդյունքներն ընդունելը հաստատեք ներկայիս բազան, ղեկավարը և համակցված թեկնածուն:

## Տեղական վավերացում

Գործարկեք դիտորդին պատկանող աշխատանքային ծառի վրա՝ դրա կախվածությունները պատրաստելուց հետո: Օգտագործեք [աշխատանքային ծառը և ռեսուրսների արձանագրությունը](WORKTREE_ISOLATION.md) մինչև ծանր վավերացումը:

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

Արագ պրոֆիլը մասնակի է: Ամբողջական պրոֆիլը ստուգում է իր մոդելավորված պահանջները և պահպանում հրամանների անդորրագրերը. այն չի հաստատում տեղակայումը կամ փոխարինում է համապատասխան հյուրընկալված ստուգումները: Զեկույցը տարբերակում է կատարման ձախողումը մետրային դրեյֆից: Պահանջվող կապանքները շարունակում են արգելափակվել՝ համաձայն ընտրված քաղաքականության: Մի բարձրացրեք ելակետային ցուցանիշը միայն անցողիկ արդյունք ստանալու համար:

## Գիշերային և ձեռքով ավլումներ

Գիշերային թողարկման և համատեղելիության լուծիչներն ընտրում են կանոնական թողարկման ճյուղ: Այդ ընտրությունը պետք է համապատասխանի ճյուղին, որը գործարկել է աշխատանքային հոսքը, և հավաքակազմերն օգտագործում են միջոցառման անփոփոխ SHA: Ձեռքով կատարման համար ընտրեք նախատեսված թողարկումը `release_branch` ում և ուղարկեք նույն հղումով.

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

Միջճյուղային առաքումը մերժվում է նախքան ընտրված կոդը գործարկելը: Հյուրընկալված հիմնական փաթեթները ստուգեք `main` և ստուգեք, որ դրա SHA դեռևս համապատասխանում է լուծված թիրախին նախքան տեղադրումը: Եթե հիմնականը շարժվում է լուծման ընթացքում, կրկնեք թերի մաքրումը նոր հանձնման վրա: Մի համադրեք տարբեր թեկնածուների հավաքակազմի անդորրագրերը:

## Ձախողման տրաժ և վերականգնում

Օգտագործեք միջադեպը որպես ախտորոշիչ ցուցանիշ, այնուհետև ստուգեք ճշգրիտ վազքը, փորձը, ձախողված քայլը և արտեֆակտը: Համեմատեք համարժեք բազան և թեկնածուի ապացույցները՝ նախքան ներդրում կատարողին ձախողումը վերագրելը: Ենթակառուցվածքի սխալները, ժառանգական թերությունները, թեկնածուների հետընթացը և սպասվող հաստատումները պահանջում են տարբեր միջոցներ:

`/green-prs`, `/sweep-reds`, `/validate-release-green` և `/babysit` հմտությունները հավաքում են ապացույցներ և պատրաստում ուղղումներ իրենց փաստաթղթավորված շրջանակի ներքո: Պահպանեք ներդրողի վարկը, օգտագործեք մեկուսացված վերանորոգման մասնաճյուղեր և ստուգեք բոլոր պահանջվող ստուգումները մինչև լիազորված միաձուլումը: Անցնող գործող թեկնածուին ոչ մի ավտոմատ վերազինման կամ միջադեպի փակում չի փոխարինում:
