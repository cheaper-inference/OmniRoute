// Fake OmniRoute gateway for the C2 lifecycle tests. NOT a real server.
//   node fake-gateway.mjs --port <n> [--mode ok|never-listen]
// ok:           answers 200 on /api/monitoring/health (and 404 elsewhere)
// never-listen: stays alive without binding (readiness never succeeds)
// (env assertions go through env-probe-gateway.mjs)
import http from "node:http";

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : fallback;
};
const port = Number(opt("--port", "0"));
const mode = opt("--mode", "ok");

const done = () => process.exit(0);
process.on("SIGTERM", done);
process.on("SIGINT", done);

if (mode === "never-listen") {
  setInterval(() => {}, 1 << 30);
} else {
  const server = http.createServer((req, res) => {
    if (req.url === "/api/monitoring/health") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ status: "ok", fake: true }));
      return;
    }
    res.writeHead(404);
    res.end();
  });
  server.keepAliveTimeout = 500;
  server.listen(port, "127.0.0.1");
}
