const READINESS_PATH = "/__omniroute_cancel_test_ready__";

if (process.env.OMNIROUTE_CANCEL_TEST_LOOPBACK_READY !== "1") {
  throw new Error("loopback readiness preload requires its explicit test marker");
}

let api;
try {
  api = new URL(process.env.GITHUB_API_URL ?? "");
} catch {
  throw new Error("loopback readiness preload requires a valid GITHUB_API_URL");
}

if (
  api.protocol !== "http:" ||
  api.hostname !== "127.0.0.1" ||
  !/^\d+$/.test(api.port) ||
  api.username !== "" ||
  api.password !== "" ||
  api.pathname !== "/" ||
  api.search !== "" ||
  api.hash !== ""
) {
  throw new Error("loopback readiness preload accepts only an exact 127.0.0.1 HTTP origin");
}

const response = await fetch(new URL(READINESS_PATH, api), { redirect: "error" });
if (response.status !== 204) {
  throw new Error(`loopback readiness endpoint returned HTTP ${response.status}`);
}
