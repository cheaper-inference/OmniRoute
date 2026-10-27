# Texture & Material Library — 30 CSS Background Textures

Pick per scene based on film material feel. Each is a single CSS snippet.

| # | Name | Film Feel | CSS |
|---|------|-----------|-----|
| 1 | Film grain (fine) | 35mm film stock | `background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); opacity: 0.03;` |
| 2 | Film grain (heavy) | 16mm handheld | Same as above, `opacity: 0.08; mix-blend-mode: overlay;` |
| 3 | Noise static | VHS/CRT monitor | `baseFrequency='1.5' numOctaves='2'; opacity: 0.05; animation: shift 0.2s steps(4) infinite;` |
| 4 | Paper aged | Old manuscript | `background: #f5e6d3; background-image: url("data:...feTurbulence baseFrequency='0.4'..."); opacity: 0.04;` |
| 5 | Linen weave | Fabric/curtain | `background-image: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px), repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px);` |
| 6 | Concrete rough | Brutalist building | `background: #1a1a1a; background-image: url("data:...feTurbulence baseFrequency='0.6' type='turbulence'..."); opacity: 0.06;` |
| 7 | Brushed metal | Industrial/sci-fi | `background: linear-gradient(135deg, #1a1a1a 25%, #222 25%, #222 50%, #1a1a1a 50%, #1a1a1a 75%, #222 75%); background-size: 4px 4px;` |
| 8 | Dot matrix | Print/retro | `background-image: radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px); background-size: 12px 12px;` |
| 9 | Diagonal lines | Blueprint/technical | `background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,150,200,0.03) 10px, rgba(0,150,200,0.03) 11px);` |
| 10 | Cross-hatch | Pencil sketch | `background-image: repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(0,0,0,0.02) 5px, rgba(0,0,0,0.02) 6px), repeating-linear-gradient(-45deg, transparent, transparent 5px, rgba(0,0,0,0.02) 5px, rgba(0,0,0,0.02) 6px);` |
| 11 | Scanlines | CRT/retro TV | `background-image: repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.05) 1px, rgba(0,0,0,0.05) 2px);` |
| 12 | Gradient mesh | Aurora/holographic | `background: conic-gradient(from 45deg at 50% 50%, #0891b2, #6366f1, #ec4899, #f59e0b, #0891b2); filter: blur(80px); opacity: 0.1;` |
| 13 | Vignette | Cinema/spotlight | `box-shadow: inset 0 0 150px 60px rgba(0,0,0,0.5);` |
| 14 | Light leak | Film exposure | `background: radial-gradient(ellipse at 80% 20%, rgba(255,150,50,0.08) 0%, transparent 60%);` |
| 15 | Rain drops | Noir/thriller | `background-image: radial-gradient(circle 1px, rgba(255,255,255,0.08) 0%, transparent 100%); background-size: 20px 40px; animation: rain 0.5s linear infinite;` |
| 16 | Frosted glass | Modern/glass | `backdrop-filter: blur(16px) saturate(1.8); background: rgba(255,255,255,0.05);` |
| 17 | Wood grain | Cabin/vintage | `background: repeating-linear-gradient(90deg, #3a2a1a, #3a2a1a 2px, #352618 2px, #352618 4px);` |
| 18 | Marble | Luxury/classic | `background: linear-gradient(135deg, #f5f0e8, #e8ddd0 30%, #f5f0e8 50%, #e0d4c4 70%, #f5f0e8); opacity: 0.5;` |
| 19 | Grid (fine) | Technical/UI | `background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 20px 20px;` |
| 20 | Grid (wide) | Architecture | Same as above, `background-size: 60px 60px;` |
| 21 | Gradient radial top | Stage lighting | `background: radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.05) 0%, transparent 60%);` |
| 22 | Gradient radial corner | Moody side light | `background: radial-gradient(ellipse at 0% 0%, rgba(100,200,255,0.04) 0%, transparent 50%);` |
| 23 | Dust particles | Abandoned space | `background-image: radial-gradient(1px 1px, rgba(255,255,255,0.15) 0%, transparent 100%); background-size: 100px 100px;` |
| 24 | Halftone | Pop art/comic | `background-image: radial-gradient(circle, #000 1px, transparent 1px); background-size: 6px 6px; opacity: 0.04;` |
| 25 | Silk sheen | Luxury/romance | `background: linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.03) 45%, transparent 55%); animation: silk 3s ease-in-out infinite;` |
| 26 | Sand texture | Desert/epic | `baseFrequency='0.8' type='turbulence'; background-color: #1a1508; opacity: 0.05;` |
| 27 | Water ripple | Mystery/dream | `background: repeating-radial-gradient(circle, transparent, transparent 10px, rgba(100,200,255,0.02) 10px, transparent 20px);` |
| 28 | Smoke/fog | Horror/thriller | `background: radial-gradient(ellipse at 50% 100%, rgba(255,255,255,0.04) 0%, transparent 50%); animation: drift 8s ease-in-out infinite;` |
| 29 | Pixel grid | Digital/8bit | `background-image: linear-gradient(rgba(0,255,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,0,0.02) 1px, transparent 1px); background-size: 4px 4px;` |
| 30 | Leather | Noir/classic | `background: #1a1210; background-image: url("data:...feTurbulence baseFrequency='1.2' type='fractalNoise'..."); opacity: 0.03;` |
