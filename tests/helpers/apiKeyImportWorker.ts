import { importApiKey } from "../../src/lib/db/apiKeyImport.ts";
import { getDbInstance, resetDbInstance } from "../../src/lib/db/core.ts";
getDbInstance();
process.send?.("ready");
process.on("message", (data: { id: string; key: string }) => {
  try {
    const result = importApiKey(
      {
        ...data,
        name: "concurrent",
        noLog: true,
        usageLimitEnabled: true,
        dailyUsageLimitUsd: 5,
        chaosModeEnabled: true,
      },
      "synthetic-machine"
    );
    process.send?.({ status: result.created ? 201 : 200 });
  } catch (error) {
    process.send?.({ status: error instanceof Error && "code" in error ? error.code : "error" });
  } finally {
    resetDbInstance();
    process.disconnect();
  }
});
