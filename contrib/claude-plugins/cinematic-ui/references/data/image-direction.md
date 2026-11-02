# Image Direction Guide — 圖片不是 AI 的工作，但指導是

This skill generates TEXT-DRIVEN cinematic websites. Images are the user's responsibility.
But we MUST provide clear direction on what images to use and how to treat them.

## What This Skill Does with Images

1. **Leave placeholder spaces** with clear labels for the user to fill
2. **Provide CSS treatment** for how images should look when placed
3. **Recommend image types** per genre/director style
4. **Set up the HTML structure** so images drop in seamlessly

## What This Skill Does NOT Do

- ❌ Generate images with AI
- ❌ Use random stock photos
- ❌ Hardcode image URLs
- ❌ Leave bare `<img>` tags with broken src

---

## Image Placeholder Pattern

For every section that SHOULD have an image, use this pattern:

```html
<!-- Image placeholder — user replaces src -->
<div class="img-placeholder" style="
  aspect-ratio: 16/9;
  background: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
">
  <span style="color: #333; font-size: 0.7rem; font-family: monospace; text-transform: uppercase; letter-spacing: 0.2em;">
    Replace with: [description of ideal image]
  </span>
</div>
```

The placeholder must describe WHAT image belongs here based on the film style.

---

## Genre → Image Treatment

| Genre | Image Type | CSS Treatment | Aspect Ratio |
|-------|-----------|---------------|-------------|
| Action | High-contrast action photography | `filter: contrast(1.3) saturate(0.8);` sharp | 16:9 or 21:9 |
| Sci-Fi | Abstract tech, dark environments | `filter: saturate(0.6) brightness(0.8); mix-blend-mode: luminosity;` | 16:9 |
| Romance | Soft natural light, warm tones | `filter: saturate(1.1) brightness(1.05); border-radius: 8px;` | 4:3 or 3:2 |
| Thriller | Shadowy, partially obscured | `filter: contrast(1.2) saturate(0.5); clip-path: polygon(...)` cropped | 2.39:1 letterbox |
| Comedy | Bright, colorful, well-lit | `border-radius: 16px; box-shadow: 0 8px 30px rgba(0,0,0,0.15);` | Square or 4:3 |
| Documentary | Raw, journalistic, unprocessed | No filter, natural | Mixed ratios |
| Epic | Panoramic landscapes, vast | Full-bleed, no border-radius | 21:9 ultrawide |
| Noir | B&W or near-B&W, dramatic shadow | `filter: grayscale(0.9) contrast(1.3);` | 4:3 classic |
| Animation | Illustrations, vector, stylized | No photo filter — vector/SVG style | Varies |

## Image Position by Scene Role

| Scene Role | Image Position | CSS |
|-----------|---------------|-----|
| Hero / Opening | Full background, text overlay | `position: absolute; inset: 0; object-fit: cover; z-index: 0;` |
| Feature cards | Inside card, top portion | `aspect-ratio: 16/9; object-fit: cover; border-radius: inherit;` |
| Author profile | Small square, sharp corners | `width: 80px; height: 80px; object-fit: cover;` |
| Case study | Large, side-by-side with text | `grid-column: span 1; height: 100%; object-fit: cover;` |
| Background texture | Full section bg, subtle | `opacity: 0.1; mix-blend-mode: overlay; position: absolute;` |
| Decorative | Abstract, partially visible | `clip-path: circle(40%); opacity: 0.6;` |

## When NOT to Use Images

Some sections are BETTER without images:

- **Breathing/pause sections** — pure color/texture
- **FAQ sections** — text is the content
- **Stats/numbers** — data IS the visual
- **CTA sections** — focus on the action
- **Footer** — keep minimal
- **Typography-heavy scenes** — text IS the visual (like Akihiko/Bellevoire)

## Storyboard Image Notation

In the storyboard, when a scene needs an image, write:

```markdown
### Image Direction
- **Type**: [photography / illustration / abstract / none]
- **Subject**: [what should the image show]
- **Treatment**: [CSS filter + border-radius + blend mode]
- **Position**: [background / inline / overlay / side-by-side]
- **Placeholder label**: "[text that appears in the placeholder]"
```
