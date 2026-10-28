import assert from "node:assert/strict";
import { Socket } from "node:net";
import test from "node:test";
import { getGlobalDispatcher } from "undici";
import { installOfflineCatalogNetwork } from "../_helpers/offlineCatalogNetwork.ts";

test("offline catalog fixture answers only image discovery and restores network globals", async () => {
  const originalFetch = globalThis.fetch;
  const originalConnect = Socket.prototype.connect;
  const originalDispatcher = getGlobalDispatcher();
  const network = installOfflineCatalogNetwork();
  try {
    const response = await fetch("https://aihorde.net/api/v2/status/models?type=image");
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), []);
    assert.equal(network.hordeRequests, 1);
    assert.deepEqual(network.unexpectedRequests, []);

    await assert.rejects(fetch("https://unexpected.invalid/models"), /unexpected HTTP/);
    await assert.rejects(fetch("invalid-url"), /invalid HTTP/);
    await assert.rejects(
      fetch("https://aihorde.net/api/v2/status/models?type=text"),
      /unexpected HTTP/
    );
    await assert.rejects(
      fetch("https://aihorde.net/api/v2/status/models?type=image", { method: "POST" }),
      /unexpected HTTP/
    );
    await assert.rejects(originalFetch("https://native-bypass.invalid/models"), /fetch failed/);
    const socket = new Socket();
    try {
      assert.throws(() => socket.connect(80, "socket-bypass.invalid"), /forbids socket/);
    } finally {
      socket.destroy();
    }
    assert.deepEqual(network.unexpectedRequests, [
      "https://unexpected.invalid/models",
      "invalid HTTP request URL",
      "https://aihorde.net/api/v2/status/models",
      "https://aihorde.net/api/v2/status/models",
      "dispatcher: https://native-bypass.invalid/models",
      "node:net socket connection",
    ]);
    assert.equal(network.hordeRequests, 1);
  } finally {
    await network.restore();
  }
  assert.equal(globalThis.fetch, originalFetch);
  assert.equal(Socket.prototype.connect, originalConnect);
  assert.equal(getGlobalDispatcher(), originalDispatcher);
  await network.restore();
  assert.throws(() => network.activate(), /already been restored/);
});
