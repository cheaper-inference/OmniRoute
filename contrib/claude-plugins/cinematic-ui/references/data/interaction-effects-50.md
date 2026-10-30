# Interaction Effects Library — 50+ Cinematic Micro-Interactions

Reference database of hover/click/scroll/cursor/text/background interaction effects mapped to film techniques.

---

## Hover Effects — Cards

| # | Effect Name | Trigger | CSS/JS Code | Film Analogy | Mood |
|---|------------|---------|-------------|--------------|------|
| 1 | Spotlight reveal | hover | `card { position: relative; overflow: hidden; } card::before { content: ''; position: absolute; width: 200px; height: 200px; background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%); border-radius: 50%; transform: translate(-50%, -50%); opacity: 0; transition: opacity 0.3s; pointer-events: none; } card:hover::before { opacity: 1; } /* JS: card.onmousemove = e => { const r = card.getBoundingClientRect(); card.style.setProperty('--mx', e.clientX-r.left+'px'); card.style.setProperty('--my', e.clientY-r.top+'px'); }; set ::before left/top to var(--mx)/var(--my) */` | Stage spotlight following the actor | dramatic |
| 2 | Perspective tilt | hover | `card { transition: transform 0.3s ease; transform-style: preserve-3d; } /* JS: card.onmousemove = e => { const r = card.getBoundingClientRect(); const x = (e.clientX - r.left - r.width/2) / r.width; const y = (e.clientY - r.top - r.height/2) / r.height; card.style.transform = 'perspective(800px) rotateY('+x*15+'deg) rotateX('+(-y*15)+'deg)'; }; card.onmouseleave = () => card.style.transform = ''; */` | Hitchcock dolly zoom — shifting perspective distorts reality | tense |
| 3 | Color temperature shift | hover | `card { filter: saturate(0.8) brightness(0.95); transition: filter 0.5s ease, box-shadow 0.5s ease; } card:hover { filter: saturate(1.2) brightness(1.05); box-shadow: 0 20px 60px rgba(0,0,0,0.15); }` | Wong Kar-wai warmth — desaturated world blooms with color on attention | romantic |
| 4 | Depth-of-field pop | hover | `card { filter: blur(1px) brightness(0.9); transition: all 0.4s ease; } card:hover { filter: blur(0) brightness(1); transform: translateY(-4px); z-index: 10; }` | Rack focus — shifting sharpness to the subject of attention | elegant |
| 5 | Film frame lift | hover | `card { border: 2px solid transparent; transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); } card:hover { border-color: #fff; transform: translateY(-8px) scale(1.02); box-shadow: 0 30px 60px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.1); }` | IMAX frame — selected film cell elevated from the strip | cinematic |
| 6 | Noir shadow crawl | hover | `card { box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: box-shadow 0.6s ease; } card:hover { box-shadow: 15px 15px 0 rgba(0,0,0,0.8); }` | Film noir venetian blind shadow — dramatic angular shadow appears | noir |
| 7 | Hologram flicker | hover | `card { transition: all 0.3s; } card:hover { box-shadow: 0 0 15px rgba(0,200,255,0.3), 0 0 30px rgba(0,200,255,0.1); border: 1px solid rgba(0,200,255,0.4); animation: hologram 2s ease infinite; } @keyframes hologram { 0%,100% { opacity: 1; } 50% { opacity: 0.95; } 75% { opacity: 0.98; transform: translateX(1px); } }` | Blade Runner hologram — flickering digital projection | futuristic |

## Hover Effects — Buttons

| # | Effect Name | Trigger | CSS/JS Code | Film Analogy | Mood |
|---|------------|---------|-------------|--------------|------|
| 8 | Magnetic snap | hover | `/* JS: btn.onmousemove = e => { const r = btn.getBoundingClientRect(); const cx = r.left + r.width/2; const cy = r.top + r.height/2; const dx = (e.clientX - cx) * 0.3; const dy = (e.clientY - cy) * 0.3; btn.style.transform = 'translate('+dx+'px,'+dy+'px)'; }; btn.onmouseleave = () => { btn.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'; btn.style.transform = ''; }; */` | Tractor beam pull — object drawn toward the viewer | playful |
| 9 | Neon charge-up | hover | `btn { position: relative; color: #fff; background: transparent; border: 1px solid rgba(255,100,200,0.3); transition: all 0.4s; } btn:hover { border-color: #ff64c8; box-shadow: 0 0 10px #ff64c8, 0 0 40px rgba(255,100,200,0.3), inset 0 0 10px rgba(255,100,200,0.1); text-shadow: 0 0 8px #ff64c8; }` | Drive (Refn) — neon signs charging to full glow | electric |
| 10 | Shutter click | hover | `btn { overflow: hidden; } btn::after { content: ''; position: absolute; inset: 0; background: rgba(255,255,255,0.9); transform: scaleX(0); transform-origin: left; transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); } btn:hover::after { transform: scaleX(1); } btn:hover { color: #000; }` | Camera shutter — flash of white exposure across frame | clinical |
| 11 | Elastic bounce | hover | `btn { transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); } btn:hover { transform: scale(1.08); }` | Looney Tunes squash-and-stretch — exaggerated cartoon physics | playful |
| 12 | Underline slide | hover | `btn { position: relative; } btn::after { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 2px; background: currentColor; transition: width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94); } btn:hover::after { width: 100%; }` | Typewriter reveal — text marking its own emphasis | elegant |

## Hover Effects — Images

| # | Effect Name | Trigger | CSS/JS Code | Film Analogy | Mood |
|---|------------|---------|-------------|--------------|------|
| 13 | Ken Burns drift | hover | `img { transition: transform 8s ease; transform: scale(1); } img:hover { transform: scale(1.15) translate(3%, 2%); }` | Ken Burns documentary — slow pan across still photographs | nostalgic |
| 14 | Chromatic aberration | hover | `img { position: relative; } .img-container:hover img { animation: chromatic 0.5s ease forwards; } @keyframes chromatic { 0% { filter: none; } 100% { filter: drop-shadow(-3px 0 0 rgba(255,0,0,0.5)) drop-shadow(3px 0 0 rgba(0,0,255,0.5)); } }` | VHS tracking error — colors separate at the edges | glitch |
| 15 | Parallax depth hover | hover | `/* JS: container.onmousemove = e => { const r = container.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - 0.5; const y = (e.clientY - r.top) / r.height - 0.5; bg.style.transform = 'translate('+x*20+'px,'+y*20+'px)'; mid.style.transform = 'translate('+x*40+'px,'+y*40+'px)'; fg.style.transform = 'translate('+x*60+'px,'+y*60+'px)'; }; */` | Multi-plane camera (Disney) — layered depth creates immersion | dreamy |
| 16 | Curtain lift reveal | hover | `.container { overflow: hidden; position: relative; } .overlay { position: absolute; inset: 0; background: #1a1a1a; transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); } .container:hover .overlay { transform: translateY(-100%); }` | Theater curtain rising — reveals the scene beneath | dramatic |
| 17 | Duotone filter | hover | `img { filter: grayscale(1) contrast(1.1); transition: filter 0.5s ease; } img:hover { filter: grayscale(0) contrast(1); }` | Schindler's List red coat — color emerging from monochrome | emotional |

## Hover Effects — Text

| # | Effect Name | Trigger | CSS/JS Code | Film Analogy | Mood |
|---|------------|---------|-------------|--------------|------|
| 18 | Letter stagger reveal | hover | `.word span { display: inline-block; transition: transform 0.3s, opacity 0.3s; transition-delay: calc(var(--i) * 0.03s); } .word:hover span { transform: translateY(-4px); opacity: 1; }` | Title crawl assembly — letters arriving into position one by one | elegant |
| 19 | Glitch flicker | hover | `.text:hover { animation: textGlitch 0.3s steps(2) 3; } @keyframes textGlitch { 0% { transform: translate(0); text-shadow: none; } 25% { transform: translate(-2px, 1px); text-shadow: 2px 0 #ff0040, -2px 0 #00ff9f; } 50% { transform: translate(2px, -1px); text-shadow: -2px 0 #ff0040, 2px 0 #00ff9f; } 100% { transform: translate(0); } }` | Matrix code glitch — digital world stuttering | cyberpunk |
| 20 | Weight morph | hover | `.text { font-variation-settings: 'wght' 400; transition: font-variation-settings 0.4s ease; } .text:hover { font-variation-settings: 'wght' 900; }` | Dramatic emphasis — bold weight shift like a dramatic zoom-in | bold |

## Click Effects

| # | Effect Name | Trigger | CSS/JS Code | Film Analogy | Mood |
|---|------------|---------|-------------|--------------|------|
| 21 | Card flip reveal | click | `.card { perspective: 1000px; } .card-inner { transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1); transform-style: preserve-3d; } .card.flipped .card-inner { transform: rotateY(180deg); } .card-front, .card-back { backface-visibility: hidden; position: absolute; inset: 0; } .card-back { transform: rotateY(180deg); }` | Se7en box — the terrifying reveal on the other side | suspenseful |
| 22 | Expand to fullscreen | click | `.card { transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1); } .card.expanded { position: fixed; inset: 20px; z-index: 1000; border-radius: 12px; }` | IMAX expansion — from regular frame to immersive full screen | immersive |
| 23 | Ripple burst | click | `/* JS: el.onclick = e => { const ripple = document.createElement('span'); ripple.className = 'ripple'; ripple.style.left = (e.clientX - el.getBoundingClientRect().left) + 'px'; ripple.style.top = (e.clientY - el.getBoundingClientRect().top) + 'px'; el.appendChild(ripple); setTimeout(() => ripple.remove(), 600); }; */ .ripple { position: absolute; border-radius: 50%; background: rgba(255,255,255,0.4); transform: scale(0); animation: rippleExpand 0.6s ease-out forwards; } @keyframes rippleExpand { to { transform: scale(4); opacity: 0; } }` | Inception water drop — ripple expanding through the dream layer | contemplative |
| 24 | Accordion unfold | click | `.content { max-height: 0; overflow: hidden; transition: max-height 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s 0.1s; opacity: 0; } .active .content { max-height: 500px; opacity: 1; }` | Unfolding map — revealing hidden terrain on demand | informative |
| 25 | Morph shape | click | `.shape { width: 60px; height: 60px; border-radius: 50%; background: #3b82f6; transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); } .shape.morphed { width: 300px; height: auto; border-radius: 12px; padding: 24px; }` | Transformers morph — compact form unfolds into full structure | futuristic |
| 26 | Shatter and reform | click | `/* JS: Split element into grid fragments. On click, scatter with random transforms. On second click, reverse. */ .fragment { transition: all 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55); } .shattered .fragment { transform: translate(var(--rx), var(--ry)) rotate(var(--rr)) scale(0.5); opacity: 0.3; }` | Time reversal (Tenet) — fragments reassemble from chaos | dramatic |
| 27 | Toggle light/dark | click | `body { --bg: #ffffff; --fg: #0a0a0a; transition: background 0.6s ease, color 0.6s ease; background: var(--bg); color: var(--fg); } body.dark { --bg: #0a0a0a; --fg: #ffffff; }` | Day-for-night — filmmaking technique toggling perceived time | atmospheric |

## Scroll Effects

| # | Effect Name | Trigger | CSS/JS Code | Film Analogy | Mood |
|---|------------|---------|-------------|--------------|------|
| 28 | Sticky spotlight | scroll | `.hero { position: sticky; top: 0; height: 100vh; } .content { position: relative; z-index: 1; margin-top: 100vh; } /* Hero stays visible as content scrolls over it */` | Opening establishing shot — scene holds while story begins | cinematic |
| 29 | Progress bar | scroll | `.progress { position: fixed; top: 0; left: 0; height: 3px; background: linear-gradient(90deg, #ff6b6b, #ffd93d, #6bcb77); width: calc(var(--scroll-pct) * 100%); z-index: 9999; transition: width 0.1s; }` | Film runtime indicator — visual sense of journey completion | informative |
| 30 | Parallax text float | scroll | `.text { transform: translateY(calc(var(--scroll-offset) * -0.5)); opacity: calc(1 - var(--scroll-offset) * 0.01); }` | Title crawl — text drifting upward through space | epic |
| 31 | Color shift on scroll position | scroll | `/* JS: const hue = (scrollY / document.body.scrollHeight) * 360; document.body.style.setProperty('--hue', hue); */ body { background: hsl(var(--hue, 220), 15%, 8%); transition: background 0.3s; }` | Technicolor shift — emotional color grading changing with the narrative | atmospheric |
| 32 | Horizontal reveal on vertical scroll | scroll | `.horizontal-track { display: flex; width: 400vw; transform: translateX(calc(var(--scroll-pct) * -300vw)); } .sticky-wrapper { position: sticky; top: 0; height: 100vh; overflow: hidden; } .scroll-spacer { height: 400vh; }` | Steadicam lateral tracking — horizontal world revealed by forward motion | immersive |
| 33 | Zoom to detail | scroll | `.zoomable { transform: scale(calc(1 + var(--scroll-pct) * 4)); transform-origin: 60% 40%; transition: transform 0.1s linear; }` | CSI enhance — zooming deeper into detail on investigation | investigative |
| 34 | Typewriter scroll reveal | scroll | `.text { overflow: hidden; white-space: nowrap; width: 0; transition: width 2s steps(40); } .text.visible { width: 100%; }` | Opening crawl typewriter — text mechanically revealed character by character | retro |

## Cursor Effects

| # | Effect Name | Trigger | CSS/JS Code | Film Analogy | Mood |
|---|------------|---------|-------------|--------------|------|
| 35 | Cursor trail | mousemove | `/* JS: document.onmousemove = e => { const dot = document.createElement('div'); dot.className = 'trail-dot'; dot.style.left = e.clientX + 'px'; dot.style.top = e.clientY + 'px'; document.body.appendChild(dot); setTimeout(() => dot.remove(), 500); }; */ .trail-dot { position: fixed; width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.5); pointer-events: none; animation: trailFade 0.5s ease forwards; } @keyframes trailFade { to { transform: scale(0); opacity: 0; } }` | Light painting long exposure — movement leaves luminous trace | dreamy |
| 36 | Custom cursor (crosshair) | mousemove | `body { cursor: none; } .custom-cursor { position: fixed; width: 40px; height: 40px; border: 1px solid rgba(255,255,255,0.5); border-radius: 50%; pointer-events: none; transform: translate(-50%, -50%); transition: width 0.2s, height 0.2s, border-color 0.2s; } .custom-cursor.hover { width: 60px; height: 60px; border-color: #ff6b6b; }` | Sniper scope — precision targeting interface | tense |
| 37 | Flashlight reveal | mousemove | `.dark-section { position: relative; background: #000; color: #000; } .dark-section::after { content: ''; position: absolute; inset: 0; background: radial-gradient(circle 100px at var(--mx) var(--my), transparent 0%, #000 100%); pointer-events: none; }` | Flashlight horror — only what the light touches is visible | horror |
| 38 | Magnetic cursor | mousemove | `/* JS: elements.forEach(el => { el.onmousemove = e => { const r = el.getBoundingClientRect(); const cx = r.left + r.width/2; const cy = r.top + r.height/2; const dist = Math.hypot(e.clientX-cx, e.clientY-cy); if (dist < 100) { const pull = (100 - dist) / 100; el.style.transform = 'translate('+(e.clientX-cx)*pull*0.4+'px,'+(e.clientY-cy)*pull*0.4+'px)'; } }; }); */` | Force field attraction — objects gravitationally drawn to presence | interactive |

## Text Effects

| # | Effect Name | Trigger | CSS/JS Code | Film Analogy | Mood |
|---|------------|---------|-------------|--------------|------|
| 39 | Text scramble decode | scroll-trigger | `/* JS: function scramble(el) { const original = el.textContent; const chars = 'ABCDEFabcdef01234!@#$%'; let iteration = 0; const interval = setInterval(() => { el.textContent = original.split('').map((c,i) => i < iteration ? c : chars[Math.floor(Math.random()*chars.length)]).join(''); iteration += 1/3; if(iteration >= original.length) clearInterval(interval); }, 30); } */` | Enigma decryption — coded message resolving into meaning | cyberpunk |
| 40 | Split line reveal | scroll-trigger | `.line { overflow: hidden; } .line span { display: block; transform: translateY(100%); transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); transition-delay: calc(var(--line-index) * 0.1s); } .line.visible span { transform: translateY(0); }` | Film credits roll-up — text lines ascending into view | cinematic |
| 41 | Highlight wipe | scroll-trigger | `.highlight { background: linear-gradient(90deg, #ffd700 50%, transparent 50%); background-size: 200% 100%; background-position: 100% 0; transition: background-position 0.8s ease; } .highlight.visible { background-position: 0 0; }` | Spotlight sweep — illumination sweeping across the marquee | theatrical |
| 42 | Redacted reveal | click | `.redacted { background: #000; color: #000; cursor: pointer; transition: all 0.3s; user-select: none; } .redacted.revealed { background: transparent; color: inherit; }` | Classified document — blacked-out info revealed on authorization | mysterious |
| 43 | Typing cursor | scroll-trigger | `.typing { border-right: 2px solid; animation: blink 0.7s step-end infinite; overflow: hidden; white-space: nowrap; width: 0; } .typing.active { animation: typing 2s steps(40) forwards, blink 0.7s step-end infinite; } @keyframes typing { from { width: 0; } to { width: 100%; } } @keyframes blink { 50% { border-color: transparent; } }` | Computer terminal — text appearing as if being typed in real time | techy |

## Background Effects

| # | Effect Name | Trigger | CSS/JS Code | Film Analogy | Mood |
|---|------------|---------|-------------|--------------|------|
| 44 | Film grain overlay | always-on | `.grain { position: fixed; inset: 0; pointer-events: none; z-index: 9999; opacity: 0.05; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"); animation: grainShift 0.5s steps(4) infinite; } @keyframes grainShift { 0% { transform: translate(0,0); } 25% { transform: translate(-5%,-5%); } 50% { transform: translate(5%,3%); } 75% { transform: translate(-3%,5%); } }` | 35mm film grain — organic celluloid texture | vintage |
| 45 | Aurora gradient | always-on | `body::before { content: ''; position: fixed; inset: 0; background: linear-gradient(135deg, hsl(240,50%,10%), hsl(280,50%,15%), hsl(200,60%,10%)); background-size: 400% 400%; animation: aurora 15s ease infinite; z-index: -1; } @keyframes aurora { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }` | Northern lights (Interstellar) — cosmic color undulation | ethereal |
| 46 | Noise static | always-on | `/* JS: const canvas = document.createElement('canvas'); canvas.width = 256; canvas.height = 256; const ctx = canvas.getContext('2d'); function noise() { const img = ctx.createImageData(256,256); for(let i=0; i<img.data.length; i+=4) { const v = Math.random()*255; img.data[i]=img.data[i+1]=img.data[i+2]=v; img.data[i+3]=15; } ctx.putImageData(img,0,0); requestAnimationFrame(noise); } noise(); */` | TV static (Poltergeist) — between-channel dead signal | unsettling |
| 47 | Gradient mesh shift | scroll | `body { background: conic-gradient(from calc(var(--scroll-deg)*1deg) at 30% 40%, hsl(220,40%,8%), hsl(280,30%,12%), hsl(200,50%,10%), hsl(220,40%,8%)); transition: background 0.3s; }` | Blade Runner 2049 smog — atmospheric color shifting with movement | atmospheric |
| 48 | Particle float | always-on | `/* JS: for(let i=0;i<30;i++) { const p = document.createElement('div'); p.className = 'particle'; p.style.setProperty('--x', Math.random()*100+'vw'); p.style.setProperty('--d', (5+Math.random()*15)+'s'); p.style.setProperty('--s', (2+Math.random()*4)+'px'); document.querySelector('.particles').appendChild(p); } */ .particle { position: fixed; width: var(--s); height: var(--s); background: rgba(255,255,255,0.15); border-radius: 50%; left: var(--x); bottom: -10px; animation: float var(--d) linear infinite; } @keyframes float { to { transform: translateY(-110vh) translateX(20px); } }` | Fireflies (Grave of the Fireflies) — luminous particles drifting upward | melancholic |
| 49 | Scanline CRT | always-on | `.crt::before { content: ''; position: fixed; inset: 0; background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px); pointer-events: none; z-index: 9998; } .crt::after { content: ''; position: fixed; inset: 0; background: radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.4) 100%); pointer-events: none; z-index: 9997; }` | Videodrome CRT monitor — cathode ray scan lines and vignette | retro-tech |
| 50 | Liquid distortion | mousemove | `/* JS: Apply SVG feTurbulence filter, animate baseFrequency based on mouse speed. const speed = Math.hypot(e.movementX, e.movementY); turbulence.setAttribute('baseFrequency', Math.min(0.02, speed * 0.001)); */ .distort { filter: url(#liquid-filter); } /* SVG: <filter id="liquid-filter"><feTurbulence type="turbulence" baseFrequency="0.005" numOctaves="2" result="turbulence"/><feDisplacementMap in="SourceGraphic" in2="turbulence" scale="10"/></filter> */` | Underwater distortion (The Shape of Water) — liquid warps the view | surreal |
| 51 | Vignette darken on scroll | scroll | `.vignette { box-shadow: inset 0 0 calc(var(--scroll-pct) * 200px) rgba(0,0,0,calc(var(--scroll-pct) * 0.7)); transition: box-shadow 0.1s; }` | Tunnel vision — peripheral darkness increasing with narrative intensity | tense |
| 52 | Rain drops | always-on | `/* CSS-only rain */ .rain { position: fixed; inset: 0; pointer-events: none; background: repeating-linear-gradient(transparent 0%, transparent 97%, rgba(150,180,255,0.1) 97%, rgba(150,180,255,0.15) 100%); background-size: 3px 80px; animation: rainFall 0.4s linear infinite; } @keyframes rainFall { to { background-position: 0 80px; } }` | Blade Runner rain — perpetual urban rainfall | melancholic |
| 53 | Chromatic split background | scroll | `.bg-layer { position: fixed; inset: 0; } .bg-r { background: rgba(255,0,0,0.05); transform: translate(calc(var(--scroll-offset) * 3px), 0); } .bg-g { background: rgba(0,255,0,0.03); transform: translate(calc(var(--scroll-offset) * -2px), 0); } .bg-b { background: rgba(0,0,255,0.05); transform: translate(calc(var(--scroll-offset) * 1px), 0); }` | Chromatic lens aberration — RGB separation at frame edges | psychedelic |
| 54 | Elastic overscroll | scroll-end | `/* JS: let velocity = 0; let position = 0; window.onscroll = () => { velocity = window.scrollY - position; position = window.scrollY; }; // At scroll end, apply bounce: document.body.style.transform = 'translateY('+(-velocity*0.3)+'px)'; document.body.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'; setTimeout(() => document.body.style.transform = '', 500); */` | Cartoon bounce (Pixar) — elastic rebound at momentum end | playful |
| 55 | Morphing blob background | always-on | `.blob { position: fixed; width: 500px; height: 500px; border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; background: linear-gradient(135deg, rgba(120,80,255,0.15), rgba(80,200,255,0.15)); animation: morph 8s ease-in-out infinite; filter: blur(40px); } @keyframes morph { 0%,100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; } 25% { border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%; } 50% { border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%; } 75% { border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%; } }` | Solaris ocean (Tarkovsky) — sentient liquid form shifting and breathing | contemplative |

---

**Total: 55 unique interaction effects across 6 categories**

Categories index: Hover/Cards (1-7), Hover/Buttons (8-12), Hover/Images (13-17), Hover/Text (18-20), Click (21-27), Scroll (28-34), Cursor (35-38), Text (39-43), Background (44-55)

---

# External JS Libraries — CDN 即用工具箱

以下庫全部支持 CDN 引入。分為兩層：**基礎層**（成熟穩定）和**寶藏層**（創意開發者圈子用的，效果獨特不撞車）。

**使用規則：**
- 每頁最多引入 3 個外部庫（避免載入過重）
- 優先使用上方 55 個原生效果，外部庫用於「原生寫法太複雜」的場景
- 所有庫都必須用導演的色彩/節奏重新配置，不能用預設參數
- **寶藏層優先於基礎層** — 如果寶藏庫能解決需求，不要用爛大街的基礎庫

---

## 基礎層（穩定成熟，但容易撞車）

### GSAP + ScrollTrigger — 滾動驅動動畫
```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/ScrollTrigger.min.js"></script>
```
~30KB | scroll-driven 動畫、pin、scrub、timeline。業界標準但用的人太多，必須搭配自定義 ease 和非典型 trigger 才不會撞。
```js
gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray('.scene').forEach(scene => {
  gsap.from(scene.querySelectorAll('[data-reveal]'), {
    y: 60, opacity: 0, stagger: 0.15, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: scene, start: 'top 80%' }
  });
});
```

### SplitType — 文字拆分動畫基礎
```html
<script src="https://unpkg.com/split-type"></script>
```
~4KB | 將文字拆成 line/word/char 供動畫。搭配 GSAP 或 Motion 做逐字飛入。
```js
const text = new SplitType('.hero-title', { types: 'chars, words' });
gsap.from(text.chars, { y: 80, opacity: 0, rotateX: -40, stagger: 0.03, duration: 0.8, ease: 'back.out(1.7)' });
```

### CountUp.js — 數字計數
```html
<script src="https://cdn.jsdelivr.net/npm/countup.js@2.10.0/dist/countUp.umd.js"></script>
```
~2KB | 數字從 0 滾動到目標值。搭配 IntersectionObserver 觸發。

---

## 寶藏層 — 創意開發者的秘密武器

### Lenis — 物理級絲滑滾動
```html
<script src="https://unpkg.com/lenis@1.1.18/dist/lenis.min.js"></script>
```
**~3KB** | Awwwards 等級網站幾乎都在用但普通用戶不知道。改變整個滾動手感 — 從瀏覽器原生的逐幀跳動變成膠片放映機的慣性滑動。
```js
const lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);
// 與 GSAP 同步
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(time => lenis.raf(time * 1000));
```

---

### Theatre.js — 視覺化動畫編輯器 + 引擎
```html
<!-- CDN 方式引入 -->
<script src="https://cdn.jsdelivr.net/npm/@theatre/core@0.7/dist/core.min.js"></script>
```
**核心概念：** 不是寫代碼控制動畫，而是有一個瀏覽器內的「剪輯台」— 可視化 timeline 編輯器。每個動畫的 keyframe 可以像 After Effects 一樣拖拽調整。

**為什麼是寶藏：** 其他庫讓你「寫」動畫，Theatre.js 讓你「導」動畫。開發時用 studio 調參，上線時只打包 core（純播放器）。與 Three.js 深度集成，可以用滑鼠在瀏覽器裡直接調 3D 物件的位置、旋轉、材質。
```js
import { getProject, types } from '@theatre/core';
const project = getProject('My Project');
const sheet = project.sheet('Scene');
const obj = sheet.object('Camera', {
  position: types.compound({ x: types.number(0), y: types.number(5), z: types.number(10) }),
  fov: types.number(45, { range: [10, 120] })
});
obj.onValuesChange(values => {
  camera.position.set(values.position.x, values.position.y, values.position.z);
  camera.fov = values.fov;
});
sheet.sequence.play({ iterationCount: Infinity });
```

---

### OGL — 極簡 WebGL 引擎（Three.js 的瘦身替代）
```html
<script type="module">
import { Renderer, Camera, Program, Mesh, Plane } from 'https://cdn.jsdelivr.net/npm/ogl@1.0.8/src/index.js';
</script>
```
**~22KB（全量）/ 可 tree-shake 到更小** | Three.js 太重（120KB）而且寫出來的 shader 背景全都長一樣。OGL 只做最少的抽象，API 跟 Three.js 相似但強迫你自己寫 shader — 結果就是每個人的輸出都不一樣。

**為什麼是寶藏：** 創意開發圈（Codrops、Awwwards 得獎站）大量使用。零依賴、公共領域授權、跟原生 WebGL 無縫混用。
```js
const renderer = new Renderer({ canvas: document.querySelector('#gl'), alpha: true });
const gl = renderer.gl;
const camera = new Camera(gl);
camera.position.z = 1;

const geometry = new Plane(gl);
const program = new Program(gl, {
  vertex: `attribute vec2 position; attribute vec2 uv; varying vec2 vUv;
    void main() { vUv = uv; gl_Position = vec4(position, 0, 1); }`,
  fragment: `precision highp float; uniform float uTime; varying vec2 vUv;
    void main() {
      vec3 color = 0.5 + 0.5 * cos(uTime + vUv.xyx * 3.0 + vec3(0, 2, 4));
      gl_FragColor = vec4(color, 1.0);
    }`,
  uniforms: { uTime: { value: 0 } }
});
const mesh = new Mesh(gl, { geometry, program });

requestAnimationFrame(function update(t) {
  program.uniforms.uTime.value = t * 0.001;
  renderer.render({ scene: mesh, camera });
  requestAnimationFrame(update);
});
```

---

### Curtains.js — DOM 同步 WebGL Shader 平面
```html
<script src="https://cdn.jsdelivr.net/npm/curtainsjs@8.1/dist/curtains.umd.min.js"></script>
```
**~122KB** | 解決了 WebGL 最煩的問題：shader 平面跟 DOM 元素位置同步。你用 CSS 排版，它自動把圖片/影片變成 WebGL 紋理平面，然後你寫 shader 做任何效果 — 液態扭曲、位移、RGB 分離、波紋。

**為什麼是寶藏：** 圖片 hover 效果的終極武器。普通網站圖片 hover 只能 scale/filter，Curtains.js 能做液態位移、布料扭曲、Voronoi 碎裂。Codrops 大量教程基於它。
```js
const curtains = new Curtains({ container: document.getElementById('canvas') });
const planeEl = document.querySelector('.plane');
const params = {
  vertexShader: document.getElementById('vs').textContent,
  fragmentShader: document.getElementById('fs').textContent,
  uniforms: {
    time: { name: 'uTime', type: '1f', value: 0 },
    mouse: { name: 'uMouse', type: '2f', value: new Float32Array([0, 0]) }
  }
};
const plane = new Curtains.Plane(curtains, planeEl, params);
plane.onRender(() => { plane.uniforms.time.value++; });
```
**後繼者：** gpu-curtains（WebGPU 版本），同作者 Martin Laxenaire，完整 3D 引擎 + DOM 同步。

---

### Barba.js — 頁面轉場（多頁站必備）
```html
<script src="https://cdn.jsdelivr.net/npm/@barba/core@2/dist/barba.umd.js"></script>
```
**~4.4KB** | 把多頁網站變成 SPA 級的絲滑轉場。PJAX 架構 — 只替換變化的內容，不重新載入整頁。搭配 GSAP 可以做出電影級的場景切換。

**為什麼是寶藏：** 多頁站的轉場是瀏覽器最弱的地方（白屏閃爍）。Barba.js 用 4.4KB 解決了這個問題，讓每個頁面切換都像電影的場景轉場。
```js
barba.init({
  transitions: [{
    name: 'fade',
    leave(data) {
      return gsap.to(data.current.container, { opacity: 0, y: -20, duration: 0.5 });
    },
    enter(data) {
      return gsap.from(data.next.container, { opacity: 0, y: 20, duration: 0.5 });
    }
  }]
});
```
**適用場景：** 只有多頁站才需要。單頁站不要引入。

---

### Motion — 超輕量物理動畫引擎
```html
<script type="module">
import { animate, stagger, spring } from 'https://cdn.jsdelivr.net/npm/motion@11/+esm';
</script>
```
**~8KB** | Web Animations API 封裝 + spring 物理。比 GSAP 輕 4 倍，支持 spring 彈性（GSAP 不原生支持）。
```js
animate('.card', { y: [50, 0], opacity: [0, 1], scale: [0.9, 1] }, {
  delay: stagger(0.1),
  easing: spring({ stiffness: 200, damping: 20 })
});
```

---

### Cobe — 5KB 3D 地球儀
```html
<script type="module">
import createGlobe from 'https://cdn.jsdelivr.net/npm/cobe@0.6.1/+esm';
</script>
```
**~5KB** | 一個極小的 WebGL 地球儀。點陣世界地圖、自轉、標記點。Vercel 首頁那個地球就是用的 Cobe。

**為什麼是寶藏：** 用 Three.js 做地球要 120KB + 世界地圖材質。Cobe 用 5KB + 純 shader 點陣做到了同等效果。
```js
let phi = 0;
const globe = createGlobe(document.querySelector('#globe-canvas'), {
  devicePixelRatio: 2, width: 600, height: 600, phi: 0, theta: 0.3,
  dark: 1, diffuse: 1.2, mapSamples: 16000, mapBrightness: 6,
  baseColor: [0.3, 0.3, 0.3], markerColor: [0.1, 0.8, 1],
  glowColor: [0.05, 0.05, 0.2],
  markers: [
    { location: [25.0330, 121.5654], size: 0.06 }, // Taipei
    { location: [35.6762, 139.6503], size: 0.04 }, // Tokyo
  ],
  onRender: state => { state.phi = phi; phi += 0.003; }
});
```
**適用場景：** 全球業務展示、SaaS 客戶分佈、國際物流。

---

### VFX-JS — 一行代碼加 WebGL Shader 特效
```html
<script type="module">
import { VFX } from 'https://cdn.jsdelivr.net/npm/@vfx-js/core/+esm';
</script>
```
**輕量** | 最低門檻的 WebGL shader：對任何 DOM 元素（img、video、甚至文字）施加 shader 效果。內建 preset（glitch、rgbShift、duotone），也支持自定義 GLSL。

**為什麼是寶藏：** 文字 WebGL 效果通常極難（要轉 canvas 再當紋理），VFX-JS 自動處理了這一切。一行代碼讓標題有 glitch 效果。
```js
const vfx = new VFX();
// 內建 preset
vfx.add(document.querySelector('.hero-img'), { shader: 'rgbShift', overflow: 50 });
// 自定義 shader
vfx.add(document.querySelector('h1'), {
  shader: `precision highp float; uniform vec2 resolution; uniform float time; uniform sampler2D src;
    void main() {
      vec2 uv = gl_FragCoord.xy / resolution;
      float distort = sin(uv.y * 20.0 + time * 3.0) * 0.003;
      gl_FragColor = texture2D(src, vec2(uv.x + distort, uv.y));
    }`
});
```

---

### Phenomenon — 2KB GPU 粒子引擎
```html
<script src="https://cdn.jsdelivr.net/npm/phenomenon@1.6.0/dist/phenomenon.min.js"></script>
```
**~2KB** | 比 tsParticles（30KB）輕 15 倍。純 GPU 渲染，用 vertex shader 移動百萬粒子。沒有預設 — 你必須自己寫 shader，所以每個人的效果都不一樣。

**為什麼是寶藏：** tsParticles 用 JSON 配置，所有人配出來都差不多。Phenomenon 用 shader，每個粒子的運動都是你定義的數學函數，不可能撞。

---

### Zdog — 設計師友好的偽 3D 引擎
```html
<script src="https://cdn.jsdelivr.net/npm/zdog@1/dist/zdog.dist.min.js"></script>
```
**~28KB** | Canvas + SVG 偽 3D。不是真 3D — 幾何體存在於 3D 空間但渲染為扁平形狀。結果是一種獨特的「插畫 3D」風格 — 有深度但不寫實。

**為什麼是寶藏：** Three.js/OGL 做出來的 3D 太「真實」，Zdog 做出來的 3D 像動畫插圖。適合品牌/產品展示的輕量 3D 圖形，跟真實 3D 引擎完全不撞車。Metafizzy（Masonry、Flickity 的作者）出品。
```js
const illo = new Zdog.Illustration({ element: '.zdog-canvas', rotate: { x: -0.3, y: 0.5 } });
new Zdog.Box({ addTo: illo, width: 80, height: 80, depth: 80,
  stroke: 2, color: '#E62', leftFace: '#EA0', rightFace: '#636', topFace: '#C25', bottomFace: '#19F'
});
function animate() { illo.rotate.y += 0.01; illo.updateRenderGraph(); requestAnimationFrame(animate); }
animate();
```

---

### Shery.js — 一站式 3D 滑鼠特效
```html
<script src="https://cdn.jsdelivr.net/npm/sheryjs/dist/Shery.js"></script>
<!-- 依賴：需要同時引入 GSAP + Three.js -->
```
**多合一** | 滑鼠跟隨器、圖片遮罩效果、3D 液態扭曲（wind、wave、liquid distortion）— 全部一行代碼調用。底層用 Three.js 做 WebGL shader，但幫你封裝好了常用效果。

**為什麼是寶藏：** 想要 Curtains.js 級別的圖片 shader 效果但不想自己寫 GLSL？Shery.js 提供了 20+ 內建扭曲效果，同時支持完全自定義。跟 Curtains.js 的區別：Curtains 要寫 shader（更底層更獨特），Shery 提供成品效果（更快出成果）。
```js
Shery.imageEffect('.img-container', {
  style: 5, // 液態扭曲效果
  config: { uFrequency: 14, uAmplitude: 0.1, uDensity: 1.5, uSpeed: 0.3 }
});
Shery.mouseFollower({ skew: true, ease: 0.2 });
Shery.makeMagnet('.btn');
```
**注意：** 依賴 Three.js + GSAP，體積較重。只在需要多個 3D 效果的頁面使用，避免只用一個效果卻引入整個庫。

---

### Rough Notation — 手繪標注動畫
```html
<script src="https://unpkg.com/rough-notation/lib/rough-notation.iife.js"></script>
```
**~3.83KB** | 基於 RoughJS 的手繪風格標注：下劃線、框選、圈注、螢光筆高亮、刪除線、括號。動畫過程模擬真人手寫的筆觸路徑，有自然的抖動和不完美感。

**為什麼是寶藏：** 所有其他動畫庫都在追求「精確」和「流暢」，Rough Notation 反其道而行 — 它的美在不完美。用在教育、個人品牌、創意 Agency 類網站，瞬間跟所有精工細作的站拉開差距。
```js
const { annotate, annotationGroup } = RoughNotation;
const n1 = annotate(document.querySelector('.highlight'), { type: 'highlight', color: '#FFE066', iterations: 1, animationDuration: 800 });
const n2 = annotate(document.querySelector('.key-word'), { type: 'circle', color: '#F44', padding: 8, animationDuration: 600 });
const n3 = annotate(document.querySelector('.price'), { type: 'underline', color: '#26B', strokeWidth: 3 });
// 按順序播放
const ag = annotationGroup([n1, n2, n3]);
ag.show(); // 配合 IntersectionObserver 滾動觸發
```
**適用場景：** 教育網站重點標注、Landing page 價值主張強調、個人博客手寫感、創意 Agency 的反主流美學。

---

### Splitting.js — 極簡文字拆分（SplitType 替代）
```html
<link rel="stylesheet" href="https://unpkg.com/splitting/dist/splitting.css" />
<link rel="stylesheet" href="https://unpkg.com/splitting/dist/splitting-cells.css" />
<script src="https://unpkg.com/splitting/dist/splitting.min.js"></script>
```
**~1.5KB** | 跟 SplitType 做一樣的事（拆字母/單詞/行），但更小、更巧妙 — 它不只拆 DOM，還自動給每個元素加 CSS 變數（`--char-index`, `--word-index`）。這意味著你可以純 CSS 做逐字動畫，不需要 JS 動畫庫。

**為什麼是寶藏：** SplitType 拆完還需要 GSAP 動畫（4KB + 30KB）。Splitting.js 拆完直接用 CSS `transition-delay: calc(var(--char-index) * 0.03s)` — 總共 1.5KB 搞定逐字動畫。
```js
Splitting(); // 自動拆分所有 [data-splitting] 元素
```
```css
/* 純 CSS 逐字飛入 — 不需要任何 JS 動畫庫 */
[data-splitting] .char {
  opacity: 0; transform: translateY(1em);
  transition: opacity 0.4s, transform 0.4s;
  transition-delay: calc(var(--char-index) * 30ms);
}
.visible [data-splitting] .char {
  opacity: 1; transform: none;
}
```
**與 SplitType 的選擇：** 需要 GSAP timeline 精確控制 → SplitType。只需逐字入場效果 → Splitting.js（省掉動畫庫依賴）。

---

### Regl — 函數式 WebGL
```html
<script src="https://npmcdn.com/regl/dist/regl.min.js"></script>
```
**~72KB** | 跟 OGL 一樣是底層 WebGL 封裝，但設計哲學完全不同 — Regl 是**函數式**的：每個繪製命令都是一個純函數，沒有狀態、沒有副作用。30,000+ 單元測試。

**為什麼是寶藏：** OGL 像 Three.js 的精簡版（物件導向），Regl 像 WebGL 的 React（聲明式）。如果你習慣函數式思維，Regl 寫 shader 背景更直覺。極其穩定，NASA、Uber 都在用。
```js
const regl = createREGL(document.querySelector('#canvas'));
const draw = regl({
  frag: `precision mediump float;
    uniform float time; varying vec2 uv;
    void main() {
      vec3 c = 0.5 + 0.5 * cos(time + uv.xyx + vec3(0,2,4));
      gl_FragColor = vec4(c, 1);
    }`,
  vert: `precision mediump float;
    attribute vec2 position; varying vec2 uv;
    void main() { uv = position; gl_Position = vec4(position, 0, 1); }`,
  attributes: { position: [[-1,-1],[1,-1],[-1,1],[-1,1],[1,-1],[1,1]] },
  uniforms: { time: regl.context('time') },
  count: 6
});
regl.frame(() => draw());
```
**與 OGL 的選擇：** 需要場景圖（camera、mesh 階層）→ OGL。只需一個全屏 shader 或粒子系統 → Regl 更乾淨。

---

### Locomotive Scroll v5 — Lenis 進階版（視差 + 視口偵測）
```html
<script type="module">
import LocomotiveScroll from 'https://cdn.jsdelivr.net/npm/locomotive-scroll@5/+esm';
</script>
```
**~9.4KB** | v5 是完全重寫，底層就是 Lenis。在絲滑滾動的基礎上加了：`data-scroll-speed` 視差、元素進出視口偵測、滾動進度追蹤。一個庫 = Lenis + IntersectionObserver + 視差計算。

**為什麼是寶藏：** Lenis 只管「滑」，視差和入場要自己寫。Locomotive v5 = Lenis + 視差 + 入場偵測，一步到位。Awwwards 得獎站的隱形基建。
```js
const scroll = new LocomotiveScroll({
  lenisOptions: { duration: 1.2, smoothWheel: true }
});
```
```html
<!-- HTML data 屬性控制視差 -->
<div data-scroll data-scroll-speed="0.5">慢速背景</div>
<div data-scroll data-scroll-speed="1.5">快速前景</div>
<div data-scroll data-scroll-speed="-0.3">反向飄動</div>
```
**與 Lenis 的選擇：** 只要絲滑滾動 → Lenis（3KB）。要滾動 + 視差 + 入場偵測 → Locomotive v5（9.4KB，含 Lenis）。

---

### Flubber — SVG 形狀變形
```html
<script src="https://cdn.jsdelivr.net/npm/flubber@0.4.2/build/flubber.min.js"></script>
```
**~15KB** | 讓任意兩個 SVG path 之間平滑變形 — 不管形狀多不一樣都不會出現跳躍/翻轉。GSAP 的 MorphSVG 要付費，Flubber 免費且效果更自然。
```js
const interpolator = flubber.interpolate(
  'M 10,10 L 90,10 L 90,90 Z',      // 三角形
  'M 50,10 A 40,40 0 1,1 50,90 A 40,40 0 1,1 50,10'  // 圓形
);
// 搭配 requestAnimationFrame 或 GSAP
gsap.to({ t: 0 }, { t: 1, duration: 1.5, ease: 'power2.inOut',
  onUpdate: function() { path.setAttribute('d', interpolator(this.targets()[0].t)); }
});
```
**適用場景：** Logo 動畫、圖標切換、抽象圖形敘事、loading 狀態轉場。

---

## 靈感資源（不是庫，而是去找效果的地方）

### Codrops (tympanus.net/codrops)
創意前端的聖殿。500+ 免費 demo（MIT 授權），每個 demo 都是完整的 GitHub repo 可以直接學。重點看：
- **Playground** — 實驗性互動 demo
- **WebGL tag** — shader / 3D 特效教程
- **Motion Highlights** — 每月精選創意動態
- 搜索時用這些關鍵字：`curtains.js`, `OGL`, `WebGL transition`, `scroll animation`, `text effect`

### React Bits (reactbits.dev)
110+ 動畫組件，每個都有 JS/TS/CSS 版本。雖然叫 React Bits 但裡面的動畫邏輯大多是純 CSS/JS，可以直接搬到 vanilla 環境。重點看：
- Text animations（逐字/scramble/gradient）
- Background effects（粒子/網格/流體）
- Hover/interaction patterns

### 怎麼用這些資源：
1. 去 Codrops/React Bits 找到一個效果 demo
2. 看它的原始碼，理解核心邏輯（通常是一個 shader 或一段 JS）
3. 提取核心邏輯，用導演的色彩/節奏重新參數化
4. **不要整個 demo 搬過來** — 只取你需要的那個效果的核心代碼

---

## 選庫思考框架

不要按導演名查表。問自己三個問題：

1. **這個頁面的核心動態體驗是什麼？**
   - 滾動敘事 → Lenis / Locomotive Scroll v5（含視差）+ GSAP ScrollTrigger
   - 圖片 shader 效果 → Curtains.js（自寫 shader）或 Shery.js（內建效果）或 VFX-JS（一行代碼）
   - 3D 深度 → OGL（輕）或 Regl（函數式）或 Three.js（重）
   - 文字表演 → Splitting.js（純 CSS 驅動）或 SplitType + GSAP/Motion
   - 粒子/氛圍 → Phenomenon（自定義 shader）或上方原生 #44-55
   - 頁面轉場 → Barba.js（僅多頁站）
   - 動畫精確編排 → Theatre.js（可視化）或 GSAP（代碼）
   - 手繪/人文感 → Rough Notation（標注）或 Zdog（插畫 3D）
   - 地球/全球 → Cobe
   - 滑鼠跟隨 + 磁吸 → Shery.js 或自寫 JS（#8 magnetic snap）

2. **這個效果用原生代碼能做嗎？**
   - 上方 55 個原生效果能做到 80% → 不要引入外部庫
   - 只在「原生寫法代碼量翻 3 倍以上」或「效果品質明顯不如」時才引入

3. **這個庫的輸出會不會撞車？**
   - 有預設 JSON 配置的庫（tsParticles, Typed.js）→ 容易撞，必須大幅自定義參數
   - 要自己寫 shader 的庫（OGL, Phenomenon, Curtains.js）→ 天然不撞
   - 越底層 = 越獨特，越高層 = 越容易撞

**禁止固定搭配。** 每次從具體頁面的具體需求出發思考。
