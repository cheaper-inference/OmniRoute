# Release-Green: candidate validation and evidence (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Release-Green නිශ්චිත කැපවීමක් නිරීක්ෂණය කර එහි වලංගු කිරීමේ ප්‍රතිඵල වාර්තා කරයි. [තත්ත්ව ගේට්ස් යොමුව](../architecture/QUALITY_GATES.md) වත්මන් CI පැතිකඩ, අවශ්‍ය චෙක්පත් සහ පිළිගැනීමේ ප්‍රතිපත්තිය නිර්වචනය කරයි. `config/quality/admission-policy.json` හි අනුවාදගත ඇතුළත් වීමේ ප්‍රතිපත්තිය `Gate / CI` සහ `Gate / Quality` සඳහා ක්‍රියාත්මක කළ හැකි කොන්ත්‍රාත්තුවයි.

## CI සහ නිරීක්ෂක විෂය පථය

`ci.yml` සහ `quality.yml` ආවරණ ප්‍රධාන සහ නිදහස් ශාඛා වෙත ඉල්ලීම් ඇද දමන්න. තෝරාගත් පැතිකඩ අදාළ වන රැකියා තීරණය කරයි. සම්පූර්ණ CI සාමාන්‍ය ඇදීමේ ඉල්ලීමක් ක්‍රියාත්මක නොවන මංතීරු ද ඇතුළත් වේ. ඉක්මන් නිරීක්ෂක ප්‍රතිඵලයකට එම රැකියා ප්‍රතිස්ථාපනය කළ නොහැකි අතර සම්පූර්ණ කරන ලද කාර්ය ප්‍රවාහ දවටනයකට එහි රිසිට්පත් ප්‍රතිස්ථාපනය කළ නොහැක.

නිෂ්පාදන ගොඩනැගීම CI ට අයත් වේ. `quality.yml` හි අනුපිටපත් උපදේශන ගොඩනැගීමක් නොමැත. අතුරුදහන් වූ කෞතුක වස්තු, අවලංගු කරන ලද වැඩ සහ අසම්පූර්ණ මිනුම් සාර්ථක අවශ්ය චෙක්පතක් ස්ථාපිත නොකරයි. ප්රතිඵල පිළිගැනීමට පෙර වත්මන් පදනම, හිස සහ ඒකාබද්ධ අපේක්ෂකයා තහවුරු කරන්න.

## දේශීය වලංගුකරණය

නිරීක්ෂකයා එහි පරායත්තතා සකස් කිරීමෙන් පසු අයිති වැඩ ගසක ධාවනය කරන්න. දැඩි වලංගු කිරීමට පෙර `docs/ops/WORKTREE_ISOLATION.md` හි වැඩ ගස සහ සම්පත් ප්‍රොටෝකෝලය අනුගමනය කරන්න.

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

ඉක්මන් පැතිකඩ අර්ධ වේ. සම්පූර්ණ පැතිකඩ එහි ආකෘතිගත අවශ්‍යතා පරීක්ෂා කර විධාන ලදුපත් සංරක්ෂණය කරයි; එය යෙදවීම හෝ අදාළ සත්කාරක චෙක්පත් සඳහා ආදේශ කිරීම සහතික නොකරයි. වාර්තාව ක්‍රියාත්මක කිරීමේ අසාර්ථකත්වය මෙට්‍රික් ප්ලාවිතයෙන් වෙන්කර හඳුනා ගනී. තෝරාගත් ප්‍රතිපත්තියට අනුව අවශ්‍ය රැට්චෙට් අවහිර වෙමින් පවතී. සමත් ප්‍රතිඵලයක් ලබා ගැනීම සඳහා මූලික පදනමක් මතු නොකරන්න.

## රාත්‍රී සහ අතින් අතුගා දැමීම

රාත්‍රී නිකුතුව සහ ගැළපුම් විසඳන්නන් කැනොනිකල් මුදා හැරීමේ ශාඛාවක් තෝරා ගනී. එම තේරීම කාර්ය ප්‍රවාහය අවුලුවාලූ ශාඛාවට ගැළපිය යුතු අතර, කට්ටල සිදුවීමේ වෙනස් කළ නොහැකි SHA භාවිතා කරයි. අතින් ක්‍රියාත්මක කිරීම සඳහා, `release_branch` හි අපේක්ෂිත නිකුතුව තෝරා එම ref වෙතම යවන්න:

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

තෝරාගත් කේතය ක්‍රියාත්මක කිරීමට පෙර හරස් ශාඛා යැවීම ප්‍රතික්ෂේප කරනු ලැබේ. සත්කාරක ප්‍රධාන කට්ටල `main` පිරික්සීම සහ එහි SHA තවමත් ස්ථාපනය කිරීමට පෙර විසඳන ලද ඉලක්කයට ගැලපෙන බව තහවුරු කරන්න. විභේදනය අතරතුර ප්‍රධාන චලනයන් සිදු වුවහොත්, නව කැපවීම මත අසම්පූර්ණ අතුගා දැමීම නැවත ක්‍රියාත්මක කරන්න. විවිධ අපේක්ෂකයින්ගෙන් කට්ටල රිසිට්පත් ඒකාබද්ධ නොකරන්න.

## අසාර්ථක ත්‍රිත්වය සහ ප්‍රතිසාධනය

රෝග විනිශ්චය දර්ශකයක් ලෙස සිද්ධිය භාවිතා කරන්න, පසුව නිශ්චිත ධාවනය, උත්සාහය, අසාර්ථක පියවර සහ පුරාවස්තු පරීක්ෂා කරන්න. දායකයෙකුට අසාර්ථක වීමක් ආරෝපණය කිරීමට පෙර සමාන පදනමක් සහ අපේක්ෂක සාක්ෂි සසඳන්න. යටිතල පහසුකම් දෝෂ, ප්‍රවේණිගත දෝෂ, අපේක්ෂක ප්‍රතිගමන සහ අපේක්ෂිත අනුමැතිය සඳහා විවිධ පිළියම් අවශ්‍ය වේ.

`/green-prs`, `/sweep-reds`, `/validate-release-green` සහ `/babysit` කුසලතා ඔවුන්ගේ ලේඛනගත විෂය පථය යටතේ සාක්ෂි එකතු කර නිවැරදි කිරීම් සකස් කරයි. දායකයාගේ ණය තබා ගන්න, හුදකලා අලුත්වැඩියා ශාඛා භාවිතා කරන්න, සහ බලයලත් ඒකාබද්ධ කිරීමකට පෙර අවශ්‍ය සියලුම චෙක්පත් සත්‍යාපනය කරන්න. සමත් වත්මන් අපේක්ෂකයෙකු සඳහා ස්වයංක්‍රීය නැවත සකස් කිරීම හෝ සිදුවීම් වසා දැමීමේ ආදේශක නොමැත.
