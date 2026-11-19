import type { ChatGptAttempt } from "./chatgptProtocol";

type Entry = {
  attempt: ChatGptAttempt;
  owner: string;
  phase: "pending" | "completing" | "done" | "failed";
  warning?: string;
};
// Single-process, short-lived state only. A restart deliberately requires a fresh sign-in.
const attempts = new Map<string, Entry>();
function prune() {
  for (const [key, value] of attempts)
    if (value.attempt.expiresAt < Date.now()) attempts.delete(key);
}
export function saveChatGptAttempt(attempt: ChatGptAttempt, owner: string) {
  prune();
  if (attempts.size >= 100) throw new Error("Too many pending sign-ins");
  attempts.set(attempt.state, { attempt, owner, phase: "pending" });
}
export function getChatGptAttempt(state: string, owner: string) {
  prune();
  const entry = attempts.get(state);
  return entry?.owner === owner ? entry : null;
}
export function claimChatGptAttempt(state: string, owner: string) {
  const entry = getChatGptAttempt(state, owner);
  if (!entry || entry.phase !== "pending") throw new Error("Sign-in expired or already used");
  entry.phase = "completing";
  return entry;
}
export function cancelChatGptAttempt(state: string, owner: string) {
  const entry = getChatGptAttempt(state, owner);
  if (entry?.phase === "pending") attempts.delete(state);
}
