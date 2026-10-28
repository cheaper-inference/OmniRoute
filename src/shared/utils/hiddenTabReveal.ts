/**
 * Inline <head> script that lets streamed (Suspense) pages reveal while the
 * browser tab is hidden (#16245).
 *
 * React Fizz's `$RC` reveal runtime gates the first boundary swap on
 * requestAnimationFrame unless the global `$RT` is already a number; rAF never
 * fires in a hidden/occluded tab, so "Loading OmniRoute..." stays forever.
 * Seeding `$RT` while hidden makes `$RC` take the setTimeout path instead.
 *
 * Upstream: https://github.com/facebook/react/issues/36741 and
 * https://github.com/vercel/next.js/issues/95588. Remove once Next's vendored
 * React ships the fix.
 */
export const HIDDEN_TAB_REVEAL_SCRIPT =
  'if (document.visibilityState === "hidden" && typeof window.$RT !== "number") window.$RT = performance.now();';
