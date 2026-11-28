import { config, log } from "./config.js";
import { getContext, resetContext } from "./browser.js";
import { MuseSession } from "./muse.js";

// One-shot login: drives muse.ai through the email OTP (read from tmail.pk) and
// persists the browser profile under DATA_DIR so the server reuses the session.
async function main() {
  const context = await getContext();
  const session = new MuseSession(context);
  try {
    const page = await session.ensureReady();
    const title = await page.title();
    const loggedIn = Boolean(await session.composer(page));
    log(
      "login result:",
      JSON.stringify({ title, loggedIn, proxy: config.proxy ? config.proxy.server : "direct" })
    );
    if (!loggedIn) process.exitCode = 2;
  } finally {
    await resetContext();
  }
}

main().catch((err) => {
  log("login failed:", err.message);
  process.exit(1);
});
