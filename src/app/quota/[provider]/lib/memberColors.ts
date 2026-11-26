/**
 * Colours of the member usage bar: the theme's chart colour variables, so light, dark and every
 * edition recolour the bar with no palette of its own. The asking key's slice takes the page's
 * accent. The other slices cycle through chart colours 2 to 8 by slot, which keeps them apart
 * from the accent. Colour never carries meaning alone: the legend says every value in words.
 */

const OTHER_MEMBER_COLORS = [2, 3, 4, 5, 6, 7, 8].map((n) => `var(--color-chart-${n})`);

export function memberColor(slot: number, isYou: boolean): string {
  if (isYou) return "var(--color-accent)";
  const count = OTHER_MEMBER_COLORS.length;
  return OTHER_MEMBER_COLORS[(((slot - 2) % count) + count) % count];
}
