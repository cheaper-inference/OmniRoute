import fs from "node:fs";
import path from "node:path";

/** Own only a fresh child of CI's explicit DATA_DIR; keep production path guards unchanged. */
export function createManagedNativeFixture(env: NodeJS.ProcessEnv = process.env): string {
  if (env.CI !== "true") throw new Error("Native managed-core verification runs only in CI");
  const configured = env.DATA_DIR?.trim();
  if (!configured || !path.isAbsolute(configured))
    throw new Error("Native managed-core verification requires an explicit absolute DATA_DIR");
  const dataDir = path.resolve(configured);
  fs.mkdirSync(dataDir, { recursive: true, mode: 0o700 });
  return fs.mkdtempSync(path.join(dataDir, "managed-core-native-"));
}

/** Clean up the owned fixture after verification, retaining both errors if cleanup also fails. */
export async function withManagedNativeFixtureCleanup(
  root: string,
  verify: () => Promise<void>
): Promise<void> {
  let verificationFailure: { error: unknown } | undefined;
  try {
    await verify();
  } catch (error) {
    verificationFailure = { error };
    throw error;
  } finally {
    try {
      // Windows can briefly keep native files locked after the subprocess exits.
      fs.rmSync(root, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
    } catch (error) {
      if (!verificationFailure) throw error;
      throw new AggregateError(
        [verificationFailure.error, error],
        "Native config verification and fixture cleanup both failed",
        { cause: verificationFailure.error }
      );
    }
  }
}
