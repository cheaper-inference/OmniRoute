import {
  AuxiliaryAdmissionRejected,
  withAuxiliaryAdmission,
  type AuxiliaryAdmissionSpec,
} from "./auxiliaryAdmission.ts";

/** The RR owner handles only its own local auxiliary FULL/TIMEOUT rejection. */
export async function runRoundRobinAttempt(
  spec: Omit<AuxiliaryAdmissionSpec, "kind" | "onAdmitted">,
  callback: () => Promise<Response>,
  onAdmitted: () => void
): Promise<{ response: Response | null; attempted: boolean }> {
  let attempted = false;
  let noted = false;
  try {
    const response = await withAuxiliaryAdmission(
      {
        ...spec,
        kind: "round-robin",
        onExecutionStarted: () => {
          attempted = true;
        },
        onAdmitted: () => {
          if (noted) return;
          noted = true;
          onAdmitted();
        },
      },
      callback
    );
    // Cache/no-executor responses retain RR outcome reporting without taking a permit.
    if (!noted) onAdmitted();
    return { response, attempted: true };
  } catch (error) {
    if (
      !(error instanceof AuxiliaryAdmissionRejected) ||
      error.owner !== spec.owner ||
      (error.code !== "SEMAPHORE_TIMEOUT" && error.code !== "SEMAPHORE_QUEUE_FULL")
    )
      throw error;
    return { response: null, attempted };
  }
}
