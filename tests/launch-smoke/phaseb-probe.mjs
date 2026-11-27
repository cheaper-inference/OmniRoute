// Manual end-to-end demo of the phase B pieces. Usage: node tests/launch-smoke/phaseb-probe.mjs <tmpdir>
import { startMockUpstream } from "./mockUpstream.mjs";
import {
  startGateway,
  gatewayLogin,
  createApiKey,
  registerUpstream,
  mintLaunchSession,
  revokeLaunchSession,
  listLaunchSessions,
} from "./gateway.mjs";

const dir = process.argv[2];
if (!dir) throw new Error("usage: phaseb-probe.mjs <tmpdir under /tmp>");
const up = await startMockUpstream();
let gw;
try {
  gw = await startGateway({ dataDir: `${dir}/data`, logFile: `${dir}/server.log` });
  console.log("healthy in ms", gw.healthyMs, gw.url);
  const auth = await gatewayLogin({ gatewayUrl: gw.url, password: gw.password });
  const apiKey = await createApiKey({ gatewayUrl: gw.url, auth });
  auth.apiKey = apiKey;
  const reg = await registerUpstream({
    gatewayUrl: gw.url,
    upstreamUrl: up.url,
    models: up.models,
    auth,
  });
  console.log("registered", reg);
  const bearer = { authorization: `Bearer ${apiKey}`, "content-type": "application/json" };
  const m = await (await fetch(`${gw.url}/v1/models`, { headers: bearer })).json();
  console.log(
    "models",
    m.data.map((x) => x.id).filter((i) => i.startsWith(reg.prefix))
  );
  const model = reg.modelIds[0];
  for (const stream of [false, true]) {
    const r = await fetch(`${gw.url}/v1/chat/completions`, {
      method: "POST",
      headers: bearer,
      body: JSON.stringify({ model, stream, messages: [{ role: "user", content: "hi" }] }),
    });
    const t = await r.text();
    console.log(
      "chat",
      { stream, status: r.status, hasOk: t.includes("OMNI-SMOKE-OK") },
      t.slice(0, 200)
    );
  }
  const s = await mintLaunchSession({
    gatewayUrl: gw.url,
    apiKey,
    body: {
      tool: "smoke",
      sessionTag: "smoke:probe",
      metadata: { launchId: "probe-1" },
    },
  });
  console.log("minted", { ...s, token: s.token.slice(0, 8) + "..." });
  const r2 = await fetch(`${gw.url}/v1/chat/completions`, {
    method: "POST",
    headers: { authorization: `Bearer ${s.token}`, "content-type": "application/json" },
    body: JSON.stringify({ model, messages: [{ role: "user", content: "hi" }] }),
  });
  console.log("olx chat", r2.status, (await r2.text()).slice(0, 200));
  await new Promise((r) => setTimeout(r, 1500));
  console.log(
    JSON.stringify(
      await listLaunchSessions({
        gatewayUrl: gw.url,
        auth,
        sessionIds: [s.sessionId],
        tokens: { [s.sessionId]: s.token },
      }),
      null,
      2
    )
  );
  console.log(
    "revoke",
    await revokeLaunchSession({ gatewayUrl: gw.url, token: s.token, sessionId: s.sessionId })
  );
  console.log(
    "mock saw",
    up.requests.map((r) => `${r.method} ${r.path}`)
  );
} finally {
  if (gw) await gw.stop();
  await up.close();
}
