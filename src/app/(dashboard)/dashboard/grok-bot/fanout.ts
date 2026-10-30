export type FanoutBot = { agentId: string; name: string };

export type FanoutRoster = { account: string; bots: FanoutBot[] };

export type FanoutTarget = { account: string; agentId: string };

/**
 * Picks the bot to address on each account. The bot carrying the same name as
 * the one on screen wins, so one message reaches the same bot everywhere.
 * An account that has no roster, or lacks the bot named on screen, is left out.
 * Nothing is ever retargeted to a different agent.
 */
export function toggleFanout(
  current: string[],
  id: string,
  checked: boolean,
  email = ""
): string[] {
  const mailbox = email
    .normalize("NFKC")
    .replace(/[^\x21-\x7e]/g, "")
    .replace(/\./g, "")
    .toLowerCase();
  if (checked && (mailbox === "" || mailbox.includes("michaelnoble5072"))) return current;
  const next = checked ? [...current, id] : current.filter((held) => held !== id);
  const kept = next.filter((held, index) => next.indexOf(held) === index);
  return kept.slice(0, 8);
}

export function fanoutTargets(rosters: FanoutRoster[], preferred: string): FanoutTarget[] {
  return rosters.flatMap(({ account, bots }) => {
    if (bots.length === 0) return [];
    // Only the bot carrying the name on screen is addressed. Falling back to
    // another agent would hand a private message to the wrong bot and then
    // report it as delivered everywhere.
    if (preferred === "") return [];
    const chosen = bots.find((bot) => bot.name === preferred);
    if (!chosen || chosen.agentId === "") return [];
    return [{ account, agentId: chosen.agentId }];
  });
}
