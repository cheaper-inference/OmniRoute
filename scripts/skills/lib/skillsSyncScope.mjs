// scripts/skills/lib/skillsSyncScope.mjs
// Which generated agent skills a change must keep in sync, in `pr` gate mode.
//
// skills/<id>/SKILL.md and skills/<id>/references/** are written by
// src/lib/agentSkills/generator.ts from the skill catalog, docs/openapi.yaml and the CLI
// registry. Plan 2026-11-13: a feature PR no longer regenerates them (two PRs that add routes
// to the same skill both rewrote the same file); the release refresh does, once. So in `pr`
// mode `check:agent-skills-sync` judges only the skills the change itself edited:
//
//   - a change that edits a skill's generated text (anything outside the hand-written
//     `<!-- skill:custom-start --> … <!-- skill:custom-end -->` block, or a references/ file)
//     must leave it exactly as the generator writes it → that skill is checked strictly;
//   - a change that edits only the hand-written custom block → nothing generated changed,
//     so drift the base already carried is not this change's doing → not checked;
//   - a skill the change does not touch, or touches only through a hand-written file beside
//     SKILL.md (an example, a note — the generator writes only SKILL.md and references/**)
//     → refreshed at release, not checked.
//
// The markers mirror CUSTOM_START_MARKER / CUSTOM_END_MARKER in src/lib/agentSkills/generator.ts.

export const CUSTOM_START_MARKER = "<!-- skill:custom-start -->";
export const CUSTOM_END_MARKER = "<!-- skill:custom-end -->";

/** The file without its hand-written custom block (markers included); unchanged when absent. */
export function stripCustomBlock(content) {
  const start = content.indexOf(CUSTOM_START_MARKER);
  const end = content.indexOf(CUSTOM_END_MARKER);
  if (start === -1 || end === -1 || end <= start) return content;
  return content.slice(0, start) + content.slice(end + CUSTOM_END_MARKER.length);
}

/** Skill ids with at least one changed file under skills/<id>/, sorted. */
export function touchedSkillIds(changedFiles) {
  const ids = new Set();
  for (const file of changedFiles) {
    const m = /^skills\/([^/]+)\/.+/.exec(file);
    if (m) ids.add(m[1]);
  }
  return [...ids].sort();
}

/**
 * @param {object} args
 * @param {string[]} args.changedFiles repo-relative paths the change touches
 * @param {(path: string) => string | null} args.readBase file content at the diff base (null = absent)
 * @param {(path: string) => string | null} args.readHead file content in the change (null = absent)
 * @returns {{ strict: string[], customOnly: string[] }} skills edited only through hand-written
 *   files beside SKILL.md are in neither list
 */
export function classifyTouchedSkills({ changedFiles, readBase, readHead }) {
  const strict = [];
  const customOnly = [];
  for (const id of touchedSkillIds(changedFiles)) {
    const skillFile = `skills/${id}/SKILL.md`;
    const files = changedFiles.filter((file) => file.startsWith(`skills/${id}/`));
    // references/** is generated end to end: any edit there is judged.
    if (files.some((file) => file.startsWith(`skills/${id}/references/`))) {
      strict.push(id);
      continue;
    }
    // Any other file beside SKILL.md (an example, a note) is hand-written: not the generator's.
    if (!files.includes(skillFile)) continue;
    const before = readBase(skillFile);
    const after = readHead(skillFile);
    if (before === null || after === null || stripCustomBlock(before) !== stripCustomBlock(after)) {
      strict.push(id);
    } else {
      customOnly.push(id);
    }
  }
  return { strict, customOnly };
}
