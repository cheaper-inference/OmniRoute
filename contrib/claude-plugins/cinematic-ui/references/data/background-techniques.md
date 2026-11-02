# Background Techniques Encyclopedia (背景技法百科)

> 這不是模板庫。這是你的**武器庫**。
> 讀完這些技法後，根據導演 + 電影 + 利基，自己組合出獨一無二的背景。
> 每個網站的背景應該是 3-6 種技法的混搭。禁止照抄任何單一技法。

---

## 使用規則

1. **Hero 背景必須混搭 3+ 種技法**
2. **顏色/速度/密度全部從 Director's Brief 推導**，不是寫死
3. **每個技法只是一個詞彙** — 你要用這些詞彙寫出獨特的句子
4. **想像你是那個導演** — 他會怎麼打光？怎麼構圖？背景裡有什麼在動？

---

## A. 漸層合成 (Gradient Composition) — 純 CSS

### A1. 多層光球 (Multi-Orb Gradient)
多個不同大小、位置、顏色的 radial-gradient 疊加，營造深度感。
```css
background:
  radial-gradient(600px circle at 25% 20%, rgba(var(--accent-rgb), 0.12), transparent),
  radial-gradient(400px circle at 75% 70%, rgba(var(--secondary-rgb), 0.08), transparent),
  radial-gradient(800px circle at 50% 100%, rgba(var(--highlight-rgb), 0.05), transparent),
  var(--bg);
```

### A2. 方向性光源 (Directional Light)
用 linear-gradient 模擬單一光源方向，像攝影棚的打光。
```css
background: linear-gradient(135deg,
  rgba(var(--warm-rgb), 0.08) 0%,
  transparent 40%,
  rgba(var(--cool-rgb), 0.04) 100%);
```

### A3. 漸層網格 (Gradient Mesh)
多個橢圓形漸層重疊，模擬 Stripe/Linear 的 mesh gradient 效果。
```css
background:
  radial-gradient(ellipse 50% 80% at 20% 30%, rgba(var(--c1), 0.15), transparent),
  radial-gradient(ellipse 80% 50% at 80% 20%, rgba(var(--c2), 0.10), transparent),
  radial-gradient(ellipse 60% 60% at 60% 80%, rgba(var(--c3), 0.12), transparent);
```

### A4. 錐形放射 (Conic Burst)
用 conic-gradient 做放射狀光源，像聚光燈或太陽。
```css
background: conic-gradient(from 180deg at 50% 0%,
  transparent 0%, rgba(var(--accent-rgb), 0.06) 15%,
  transparent 30%);
```

### A5. 漸層文字 (Gradient Text)
標題文字本身帶漸層色，增加視覺層次。
```css
h1 {
  background: linear-gradient(to bottom, var(--text), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### A6. 邊緣光暈 (Edge Glow)
從螢幕邊緣向內發光，像舊電影的暈影但反過來。
```css
box-shadow:
  inset 0 0 200px rgba(var(--accent-rgb), 0.03),
  inset 0 0 80px rgba(var(--accent-rgb), 0.02);
```

### A7. 漸層邊框 (Gradient Border)
元素邊框本身帶漸層，高端的框線效果。
```css
border: 1px solid transparent;
background-clip: padding-box;
background-image: linear-gradient(var(--bg), var(--bg)),
  linear-gradient(135deg, rgba(255,255,255,0.15), transparent 50%, rgba(255,255,255,0.05));
background-origin: border-box;
```

---

## B. 動態效果 (Animated Effects) — CSS Keyframes

### B1. 漸層流動 (Gradient Flow)
背景漸層緩慢位移，像雲層飄動。
```css
@property --angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
.hero-bg {
  background: linear-gradient(var(--angle), var(--c1), var(--c2), var(--c3));
  animation: rotate-gradient 20s linear infinite;
}
@keyframes rotate-gradient { to { --angle: 360deg; } }
```

### B2. 光球呼吸 (Orb Pulse)
漸層光球緩慢擴大縮小，像呼吸。
```css
.orb {
  position: absolute;
  width: 500px; height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(var(--accent-rgb), 0.15), transparent 70%);
  filter: blur(60px);
  animation: orb-pulse 8s ease-in-out infinite;
}
@keyframes orb-pulse {
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.3); opacity: 1; }
}
```

### B3. 極光波紋 (Aurora Wave)
水平方向的色彩波動，像北極光。
```css
.aurora {
  background: linear-gradient(90deg, var(--c1), var(--c2), var(--c3), var(--c1));
  background-size: 300% 100%;
  animation: aurora-shift 15s ease-in-out infinite;
  filter: blur(80px);
  opacity: 0.15;
}
@keyframes aurora-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

### B4. 微動漂浮 (Micro Float)
背景元素極慢速漂移，幾乎察覺不到但增加「活」的感覺。
```css
.bg-element {
  animation: micro-float 25s ease-in-out infinite;
}
@keyframes micro-float {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(15px, -10px) rotate(0.5deg); }
  66% { transform: translate(-10px, 8px) rotate(-0.3deg); }
}
```

### B5. 色相漂移 (Hue Drift)
整個背景的色調極慢速變化，像日落。
```css
.hero { animation: hue-drift 60s linear infinite; }
@keyframes hue-drift {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(15deg); } /* 小幅度！不是彩虹 */
}
```

### B6. 脈衝光線 (Pulse Line)
一條光線從某個方向掃過，像掃描線。
```css
.scan-line::after {
  content: '';
  position: absolute;
  width: 100%; height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  animation: scan 8s ease-in-out infinite;
  opacity: 0.3;
}
@keyframes scan {
  0% { top: -10%; }
  100% { top: 110%; }
}
```

---

## C. 材質紋理 (Textures) — CSS/SVG

### C1. 膠片顆粒 (Film Grain)
SVG noise 做膠片質感，fixed position 覆蓋全頁。
```css
body::after {
  content: '';
  position: fixed; inset: 0; z-index: 9999;
  pointer-events: none; opacity: 0.03;
  background-image: url("data:image/svg+xml,...feTurbulence...");
}
```

### C2. 點陣底紋 (Dot Grid)
規則排列的小圓點背景，像印刷半色調。
```css
background-image: radial-gradient(circle, var(--text-ghost) 1px, transparent 1px);
background-size: 24px 24px;
```

### C3. 線條網格 (Line Grid)
水平+垂直的細線組成網格，像工程圖紙。
```css
background-image:
  linear-gradient(var(--border) 1px, transparent 1px),
  linear-gradient(90deg, var(--border) 1px, transparent 1px);
background-size: 60px 60px;
```

### C4. 對角線紋 (Diagonal Stripes)
對角線紋理，像警示帶或布料紋路。
```css
background-image: repeating-linear-gradient(
  45deg, transparent, transparent 10px,
  rgba(var(--accent-rgb), 0.03) 10px, rgba(var(--accent-rgb), 0.03) 11px);
```

### C5. 噪波紋理 (Noise Texture)
用 CSS filter 產生的有機噪波。
```css
.noise {
  background: url("data:image/svg+xml,...feTurbulence baseFrequency='0.65'...");
  opacity: 0.04;
  mix-blend-mode: overlay;
}
```

### C6. 毛玻璃 (Frosted Glass / Glassmorphism)
半透明面板 + backdrop-filter blur，高端卡片效果。
```css
.glass-panel {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px) saturate(1.2);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
}
```

### C7. Liquid Glass（液態玻璃）
比普通毛玻璃更高端 — 加入漸層邊框 mask。
```css
.liquid-glass {
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(8px);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
  position: relative;
}
.liquid-glass::before {
  content: ''; position: absolute; inset: 0; border-radius: inherit;
  padding: 1px;
  background: linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.1) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  pointer-events: none;
}
```

### C8. 暈影 (Vignette)
邊緣加深，中心明亮，像老電影鏡頭。
```css
.vignette::after {
  content: ''; position: fixed; inset: 0; pointer-events: none;
  background: radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%);
}
```

---

## D. Canvas 程式生成 (Generative Canvas) — JS

### D1. 字符雨 (Character Rain)
Matrix 風格的字符瀑布。可用任何字符集（日文、中文、數字、代碼）。
```js
// canvas 上不斷落下的字符列
// 每列有不同速度、不同字符、漸隱尾巴
// 顏色從 Director's Brief 取 accent color
```

### D2. 星空視差 (Starfield Parallax)
多層星點以不同速度移動，營造深度。
```js
// 3 層星點：遠（小且慢）、中、近（大且快）
// 顏色可以不只是白色 — 用 accent 和 secondary
```

### D3. 粒子連線 (Constellation Network)
粒子隨機移動，距離近的粒子之間畫線。
```js
// 粒子數量 30-60（不要太多）
// 線的顏色和粗細根據距離漸變
// 整體節奏配合導演：Nolan=慢, Wright=快
```

### D4. 波形線 (Wave Lines)
多條 sine 波形疊加，像聲波或海浪。
```js
// 3-5 條波形，不同頻率、振幅、顏色
// 每條波形的 phase 不同，產生干涉圖案
```

### D5. 流場 (Flow Field)
Perlin noise 驅動的方向場，粒子沿場線流動。
```js
// 用 simplex/perlin noise 產生方向場
// 粒子沿方向場移動，畫出流線
// 最有機、最獨特的效果之一
```

### D6. 幾何形變 (Geometric Morph)
幾何圖形（圓、方、三角）之間緩慢變形。
```js
// 使用 canvas path 在不同形狀之間插值
// 可配合 audio 或 scroll position
```

### D7. 掃描線 (Scanline CRT)
CRT 顯示器的掃描線效果，復古科技感。
```js
// 半透明水平線 + 輕微的 RGB 色差
// 可加上隨機的 glitch 跳動
```

### D8. 光線追蹤點 (Light Trace)
一個或多個光點沿著曲線軌跡移動，留下漸隱的尾跡。
```js
// 光點沿 bezier 曲線移動
// 尾跡用漸隱的線段或漸小的圓
// 顏色用 accent，像螢火蟲或信號
```

### D9. 水波紋 (Ripple Effect)
從某個點擴散的同心圓波紋，像雨滴落水。
```js
// 隨機或定時產生波紋圓
// 圓擴大同時漸隱
// 多個波紋重疊產生干涉
```

### D10. 煙霧粒子 (Smoke Particles)
大量半透明圓形粒子，模擬煙霧或雲的運動。
```js
// 50-100 個大型半透明圓（半徑 50-200px）
// 極慢速隨機運動 + 緩慢的 opacity 變化
// 用 globalCompositeOperation: 'screen' 疊加
```

---

## E. WebGL Shader (GLSL) — 進階

### E1. 流體漸層 (Fluid Gradient)
最高端的漸層動畫 — 顏色像液體一樣流動。
```glsl
// fragment shader: 用 sin/cos 的組合 + time uniform
// 產生不斷變化的有機漸層
// 參數化：顏色從 uniform 傳入（導演調色盤）
```

### E2. Voronoi 細胞 (Voronoi Cells)
類似細胞或龜裂的圖案，邊界會緩慢移動。
```glsl
// 計算到最近點的距離產生 voronoi pattern
// 點的位置隨 time 緩慢移動
// 可用於 Park Chan-wook 的有機暗黑風格
```

### E3. 雷射霧 (Volumetric Light)
模擬光線穿過煙霧的體積光效果。
```glsl
// ray marching 簡化版
// 從一個方向射出光線，遇到 noise 產生散射
// 最適合 Ridley Scott、Villeneuve
```

### E4. 扭曲空間 (Warp Field)
畫面像被引力場扭曲。
```glsl
// 用 noise 對 UV 座標做 displacement
// 產生類似黑洞或蟲洞的視覺效果
// 最適合 Nolan（Interstellar）
```

### E5. 色彩分離 (Chromatic Aberration)
RGB 三色微偏移，像劣質鏡頭或故障。
```glsl
// 對 R/G/B 三個 channel 分別取樣，各自偏移
// 偏移量可隨 mouse 或 scroll 變化
// 適合 Fincher、Wong Kar-wai
```

---

## F. 電影場景衍生 (Film-Derived Backgrounds)

> 這些不是技法，而是**思考方向**。
> 看到電影名稱時，問自己：「那部電影最標誌性的視覺元素是什麼？能不能用上面的技法重現？」

### F1. 雨中霓虹 (Blade Runner)
技法組合：A1 多層光球（霓虹色）+ B2 光球呼吸 + C1 grain + D9 水波紋
場景：雨打在霓虹招牌上的倒影

### F2. 沙丘熱浪 (Dune)
技法組合：A2 方向性光源（琥珀色從頂部）+ B5 色相漂移（極慢）+ C4 對角線紋（沙紋）
場景：沙漠的熱空氣扭曲視線

### F3. 字符雨 (The Matrix)
技法組合：D1 字符雨 + C3 線條網格（暗綠）+ A6 邊緣光暈（綠色）
場景：Mother of all hacker backgrounds

### F4. 蟲洞穿越 (Interstellar)
技法組合：E4 扭曲空間 + A4 錐形放射 + B3 極光波紋（琥珀+藍）
場景：Cooper 穿越 Gargantua

### F5. 情書雪景 (Love Letter)
技法組合：D10 煙霧粒子（白色）+ A1 多層光球（暖粉色）+ B4 微動漂浮 + C1 grain（暖色調）
場景：小樽的雪花飄落

### F6. 大飯店走廊 (Grand Budapest Hotel)
技法組合：A2 方向性光源（柔和均勻）+ C2 點陣底紋（粉彩色）+ C7 liquid glass（薄荷色面板）
場景：對稱的粉色走廊，每個元素精確擺放

### F7. 搏擊俱樂部地下室 (Fight Club)
技法組合：D7 掃描線 CRT + C5 噪波紋理（重）+ B6 脈衝光線 + A6 邊緣光暈（深紅）
場景：地下室的閃爍燈管

### F8. 花樣年華走廊 (In the Mood for Love)
技法組合：A2 方向性光源（暖紅側光）+ B2 光球呼吸（極慢）+ C8 暈影（重）+ C1 grain
場景：狹窄走廊裡的一盞紅燈

### F9. 攻殼機動隊城市 (Ghost in the Shell)
技法組合：D1 字符雨（日文/代碼）+ D3 粒子連線 + A1 多層光球（青色+紫色）
場景：數位意識空間

### F10. 乃路上的星光 (Your Name / 你的名字)
技法組合：D2 星空視差（多彩）+ D8 光線追蹤點（彗星）+ A3 漸層網格（twilight 配色）
場景：彗星劃過黃昏天空

### F11. 乃殿 (The Shining)
技法組合：C3 線條網格（地毯花紋的抽象化）+ A2 方向性光源（冷白走廊光）+ C8 暈影
場景：Overlook Hotel 的無盡走廊

### F12. 乃乘客 (Arrival)
技法組合：D10 煙霧粒子（灰色）+ E3 雷射霧 + C1 grain（重）+ B4 微動漂浮
場景：外星船內部的霧氣充滿空間

### F13. 寄生蟲地下室 (Parasite)
技法組合：C8 暈影（極重）+ A6 邊緣光暈（潮濕的黃綠）+ C5 噪波（水漬感）+ B6 脈衝光線（地下室燈管）
場景：越往下越暗，水漬斑斑

### F14. 乃乃子彈 (Baby Driver)
技法組合：D4 波形線（跟著節拍）+ A1 多層光球（霓虹紅藍）+ B1 漸層流動（快速）
場景：音樂驅動的視覺節拍

### F15. 千與千尋油屋 (Spirited Away)
技法組合：D10 煙霧粒子（暖黃色，像蒸氣）+ D8 光線追蹤點（spirit lights）+ A1 多層光球（暖橙紅）
場景：油屋的蒸氣和燈火

---

## G. 合成指南 (Composition Guide)

### 怎麼混搭？

**Step 1:** 從 Director's Brief 取出 2-3 個關鍵色
**Step 2:** 問自己：「這部電影最標誌性的視覺是什麼？」
**Step 3:** 從 Section F 找最接近的電影場景（或自己想一個）
**Step 4:** 用 Section A-E 的技法重現那個場景
**Step 5:** 至少用 3 種不同類型的技法（不要全是漸層，或全是粒子）

### 混搭公式

```
背景 = 基底層 + 氛圍層 + 細節層 + 動態層

基底層 (1個): A1-A4 中選一個漸層合成
氛圍層 (1-2個): C1-C8 中選紋理或材質
細節層 (0-2個): C2/C3/C6/C7 中選裝飾性紋理
動態層 (1個): B1-B6 或 D1-D10 中選一個動態效果
```

### 導演速度指引

| 導演 | 動畫速度 | 背景複雜度 | 色彩飽和度 |
|------|---------|-----------|-----------|
| Villeneuve | 極慢 15-30s | 低（2-3 層）| 低 |
| Nolan | 慢 10-20s | 中（3-4 層）| 中低 |
| Miyazaki | 中 8-15s | 高（4-5 層）| 高 |
| Wes Anderson | 中 10-15s | 中（均勻）| 中高（粉彩）|
| Wong Kar-wai | 慢 12-20s | 中（重點在光）| 中（暖色偏重）|
| Tarantino | 快 5-10s | 高（大膽）| 高（高對比）|
| Fincher | 慢 15-25s | 低（壓抑）| 極低 |
| Edgar Wright | 快 3-8s | 高（跳躍）| 高 |
| Park Chan-wook | 慢 12-20s | 中高（精緻）| 中（偏暗）|
| Ridley Scott | 中 10-18s | 高（工業層次）| 中低 |

### ⚠️ 禁止事項

1. **禁止只用純色背景** — 至少 2 層漸層
2. **禁止只用靜態背景** — 至少 1 個動態元素（B 或 D 類）
3. **禁止全部用 CSS** 或**全部用 Canvas** — 混搭才有層次
4. **禁止照抄 Section F 的電影配方** — 那些是思考起點，不是答案
5. **禁止讓動態效果太快或太明顯** — 背景是氛圍，不是主角
