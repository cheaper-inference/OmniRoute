import { Socket } from "node:net";
import { getGlobalDispatcher, MockAgent, setGlobalDispatcher } from "undici";

const HORDE_IMAGE_CATALOG_URL = "https://aihorde.net/api/v2/status/models?type=image";

/** Network boundary for catalog contracts that do not exercise live provider discovery. */
export function installOfflineCatalogNetwork(
  hordeResponse: () => Promise<Response> = async () => Response.json([])
) {
  const previousFetch = globalThis.fetch;
  const previousConnect = Socket.prototype.connect;
  const previousDispatcher = getGlobalDispatcher();
  const dispatcher = new MockAgent();
  dispatcher.disableNetConnect();
  const unexpectedRequests: string[] = [];
  let hordeRequests = 0;
  let restored = false;

  // Native fetch captured before this fixture also has to fail closed.
  const dispatch = dispatcher.dispatch.bind(dispatcher);
  dispatcher.dispatch = (options, handler) => {
    const url = new URL(options.path, String(options.origin));
    unexpectedRequests.push(`dispatcher: ${url.origin}${url.pathname}`);
    return dispatch(options, handler);
  };

  const rejectSocket: typeof Socket.prototype.connect = function () {
    unexpectedRequests.push("node:net socket connection");
    throw new Error("Offline catalog fixture forbids socket connections");
  };

  const fixtureFetch: typeof fetch = async (input, init) => {
    let url: URL;
    try {
      url = new URL(input instanceof Request ? input.url : String(input));
    } catch {
      unexpectedRequests.push("invalid HTTP request URL");
      throw new Error("Offline catalog fixture forbids invalid HTTP requests");
    }
    const method = init?.method ?? (input instanceof Request ? input.method : "GET");
    if (url.href === HORDE_IMAGE_CATALOG_URL && method.toUpperCase() === "GET") {
      hordeRequests++;
      return hordeResponse();
    }
    unexpectedRequests.push(`${url.origin}${url.pathname}`);
    throw new Error("Offline catalog fixture forbids unexpected HTTP requests");
  };

  function activate() {
    if (restored) throw new Error("Offline catalog fixture has already been restored");
    globalThis.fetch = fixtureFetch;
    Socket.prototype.connect = rejectSocket;
    setGlobalDispatcher(dispatcher);
  }

  activate();
  return {
    unexpectedRequests,
    get hordeRequests() {
      return hordeRequests;
    },
    // proxyFetch installs a global wrapper during application imports. Select the
    // fixture transport again after those imports, before exercising the catalog.
    activate,
    async restore() {
      if (restored) return;
      restored = true;
      globalThis.fetch = previousFetch;
      Socket.prototype.connect = previousConnect;
      setGlobalDispatcher(previousDispatcher);
      await dispatcher.close();
    },
  };
}
