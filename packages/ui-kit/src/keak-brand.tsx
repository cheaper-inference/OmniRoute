import { createElement, type HTMLAttributes, type ReactNode, type SVGProps } from "react";
import { cn } from "./lib/utils";
import { KEAK_MARK_PATH, KEAK_WORDMARK_PATH, KEAK_WORDMARK_VIEWBOX } from "./keak-brand-vectors";
import { KEAK_PRODUCT_GLYPHS } from "./keak-product-vectors";

export { KEAK_MARK_PATH, KEAK_WORDMARK_PATH, KEAK_WORDMARK_VIEWBOX } from "./keak-brand-vectors";

export interface KeakMarkProps extends SVGProps<SVGSVGElement> {
  label?: string;
}

export function KeakMark({ label, className, ...props }: KeakMarkProps) {
  return <svg viewBox="0 0 72 72" fill="currentColor" className={cn("ci-keak-mark", className)}
    role={label ? "img" : undefined} aria-label={label}
    aria-hidden={label ? undefined : true} focusable="false" {...props}>
    {label && <title>{label}</title>}<path d={KEAK_MARK_PATH} />
  </svg>;
}

export interface KeakLogoProps extends HTMLAttributes<HTMLSpanElement> {
  label?: string;
  showMark?: boolean;
}

export function KeakLogo({ label = "Keak", showMark = true, className, ...props }: KeakLogoProps) {
  return <span role="img" aria-label={label} className={cn("ci-keak-logo", className)} {...props}>
    {showMark && <KeakMark />}<svg viewBox={KEAK_WORDMARK_VIEWBOX} className="ci-keak-wordmark" aria-hidden="true" focusable="false" fill="currentColor"><path d={KEAK_WORDMARK_PATH} /></svg>
  </span>;
}

export type KeakProduct = "optimize" | "inference" | "omniroute";
export const keakProductNames: Record<KeakProduct, string> = {
  optimize: "Optimize", inference: "Inference", omniroute: "OmniRoute",
};

export interface ProductIconProps extends SVGProps<SVGSVGElement> {
  product: KeakProduct; label?: string; variant?: "badge" | "glyph";
}
/** The supplied product family: test tubes, model capacity, and connected routes. */
export function ProductIcon({ product, label, variant = "badge", className, ...props }: ProductIconProps) {
  const badge = variant === "badge";
  return <svg viewBox={badge ? "0 0 48 48" : "0 0 24 24"} className={cn("ci-keak-product-icon", className)}
    role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true} focusable="false" {...props}>
    {label && <title>{label}</title>}
    {badge && <rect x=".75" y=".75" width="46.5" height="46.5" rx="10.5" fill="var(--ci-color-accent, #d8ff00)" stroke="#040d10" strokeWidth="1.5" />}
    <g transform={badge ? "translate(10 10) scale(1.166667)" : undefined} fill="none" stroke={badge ? "#040d10" : "currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {KEAK_PRODUCT_GLYPHS[product].map(([tag, attributes], index) => createElement(tag, { ...attributes, key: index }))}
    </g>
  </svg>;
}

export interface ProductLockupProps extends HTMLAttributes<HTMLSpanElement> {
  product: KeakProduct;
  showMark?: boolean;
  showIcon?: boolean;
}

export function ProductLockup({ product, showMark = false, showIcon = true, className, ...props }: ProductLockupProps) {
  return <span role="img" aria-label={`Keak ${keakProductNames[product]}`}
    className={cn("ci-keak-lockup", className)} {...props}>
    {showIcon && <ProductIcon product={product} />}<KeakLogo showMark={showMark} aria-hidden="true" />
    <span className="ci-keak-product" aria-hidden="true">{keakProductNames[product]}</span>
  </span>;
}

export interface ProductSwitcherItem { product: KeakProduct; href: string; description?: string; }
export interface ProductSwitcherProps extends HTMLAttributes<HTMLElement> {
  items: ProductSwitcherItem[];
  activeProduct?: KeakProduct;
}

/** Native disclosure and links remain usable without client-side JavaScript. */
export function ProductSwitcher({ items, activeProduct, className, ...props }: ProductSwitcherProps) {
  return <nav aria-label="Keak products" className={cn("ci-keak-switcher", className)} {...props}>
    <details><summary>{activeProduct && <ProductIcon product={activeProduct} />}{activeProduct ? `Keak ${keakProductNames[activeProduct]}` : "Our products"}
      <span className="ci-keak-switcher-caret" aria-hidden="true">+</span></summary>
      <ul>{items.map(item => <li key={item.product}><a href={item.href}
        aria-current={activeProduct === item.product ? "page" : undefined}>
        <span className="ci-keak-switcher-product"><ProductIcon product={item.product} /><span>Keak {keakProductNames[item.product]}</span></span>
        {item.description && <small>{item.description}</small>}
      </a></li>)}</ul>
    </details>
  </nav>;
}

export interface EditorialSectionProps extends HTMLAttributes<HTMLElement> {
  index: string; label: string; children?: ReactNode;
}
export function EditorialSection({ index, label, children, className, ...props }: EditorialSectionProps) {
  return <section className={cn("ci-editorial-section", className)} {...props}>
    <div className="ci-editorial-label"><span>{index}</span><span>{label}</span></div>{children}
  </section>;
}

export interface EditorialCardProps extends HTMLAttributes<HTMLElement> {
  eyebrow: string; title: string; description?: string; href: string; linkLabel?: string;
}
export function EditorialCard({ eyebrow, title, description, href, linkLabel = "Read more", className, ...props }: EditorialCardProps) {
  return <article className={cn("ci-editorial-card", className)} {...props}>
    <span className="ci-editorial-card-eyebrow">{eyebrow}</span>
    <h3><a href={href}>{title}</a></h3>{description && <p>{description}</p>}
    <a className="ci-editorial-card-link" href={href} aria-label={`${linkLabel}: ${title}`}>{linkLabel}<span aria-hidden="true">↗</span></a>
  </article>;
}
