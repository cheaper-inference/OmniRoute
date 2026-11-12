import { statSync } from "node:fs";

// A consumer of a verified build must never silently turn into a producer.
export function ensureStandaloneInput({ serverPath, requirePrebuilt = false, build }) {
  const present = () => {
    try {
      return statSync(serverPath).isFile();
    } catch (error) {
      if (error.code === "ENOENT" || error.code === "ENOTDIR") return false;
      throw error;
    }
  };
  if (present()) return "reused";
  if (requirePrebuilt) throw new Error("PREBUILT_NEXT_REQUIRED: standalone server is missing");
  build();
  if (!present())
    throw new Error("NEXT_BUILD_INCOMPLETE: standalone server is missing after build");
  return "built";
}
