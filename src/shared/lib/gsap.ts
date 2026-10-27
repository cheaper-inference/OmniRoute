import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Single GSAP entry point for the app. Import `gsap` / `ScrollTrigger` from here
 * (not from "gsap" directly) so every animation runs with the plugins registered.
 *
 * Safe to evaluate during SSR: without a `window`, ScrollTrigger defers its setup,
 * so registration only takes effect when this module runs in the browser.
 */
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
