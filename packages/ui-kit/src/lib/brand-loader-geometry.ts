/* Exact paths from the supplied CI symbol. No construction intro. */
export const BRAND_PATHS = ["M184.801 39L139.158 74.6572L147.937 39H184.801Z", "M105.808 176.046C102.527 189.375 90.5718 198.744 76.8447 198.744C57.4823 198.744 43.2501 180.584 47.8779 161.783L71.1963 67.0527C75.2514 50.579 90.0267 39 106.992 39H139.542L105.808 176.046ZM114.966 48.8311C111.573 48.8313 108.822 51.5815 108.822 54.9746C108.822 58.3677 111.573 61.1179 114.966 61.1182C118.359 61.1182 121.11 58.3678 121.11 54.9746C121.11 51.5814 118.359 48.8311 114.966 48.8311Z", "M109 198.072L137.5 82L183.797 159.321C194.014 176.385 181.722 198.072 161.833 198.072H109Z"] as const;
export const clamp = (v: number) => Number.isFinite(v) ? Math.max(0, Math.min(1, v)) : 0;
export const mix = (a: number, b: number, t: number) => a + (b - a) * t;
export const phase = (t: number, a: number, b: number) => {
  const x = clamp((t - a) / (b - a));
  return x*x*x*(x*(6*x-15)+10);
};
