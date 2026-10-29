/**
 * Built-in Oh My Pi (omp) model roles — the keys omp reads from
 * `modelRoles.<role>` in `~/.omp/agent/config.yml`
 * (https://github.com/can1357/oh-my-pi/blob/main/docs/models.md).
 *
 * OmniRoute only ever writes these official keys; custom role keys a user added
 * by hand are left untouched. Keep the list in this one place so omp schema
 * drift is a one-line change.
 */
export const OMP_ROLE_IDS = [
  "default",
  "smol",
  "slow",
  "vision",
  "plan",
  "designer",
  "commit",
  "tiny",
  "task",
  "advisor",
] as const;

export type OmpRoleId = (typeof OMP_ROLE_IDS)[number];
