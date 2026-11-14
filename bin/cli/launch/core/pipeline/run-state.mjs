// bin/cli/launch/core/pipeline/run-state.mjs: what a launch holds open (gateway, session client,
// session, heartbeat) and the single cleanup that runs in runLaunch's `finally`.

/** The launch's mutable resources, all empty until the gateway and session steps fill them. */
export function createRunState(warn) {
  return {
    warn,
    gateway: null,
    client: null,
    session: null,
    revoked: false,
    heartbeat: null,
    revokeOnExit: true,
    // The mint started concurrently with a capabilities call that failed: its session is never
    // used, but is revoked in `finalizeRun` once the mint settles (the result reports no sessionId).
    orphanMint: null,
  };
}

async function revokeSession(run, target) {
  try {
    await run.client.revoke(target);
  } catch (error) {
    run.warn(`could not revoke the launch session: ${error?.message ?? "error"}`);
  }
}

/** Revoke the launch session once, unless the plan keeps it (cleanup.revokeSession false). */
export async function revokeRun(run) {
  if (!run.session || run.revoked || !run.revokeOnExit) return;
  run.revoked = true;
  await revokeSession(run, run.session);
}

async function revokeOrphanMint(run) {
  if (!run.orphanMint) return;
  const minted = await run.orphanMint;
  if (minted.ok && minted.value) await revokeSession(run, minted.value);
}

async function releaseGateway(run) {
  if (!run.gateway) return;
  try {
    await run.gateway.release();
  } catch (error) {
    run.warn(`gateway release failed: ${error?.message ?? "error"}`);
  }
}

/** Stop the heartbeat, revoke the session and any orphan mint, then release the gateway. */
export async function finalizeRun(run) {
  run.heartbeat?.stop();
  await revokeRun(run);
  await revokeOrphanMint(run);
  await releaseGateway(run);
}
