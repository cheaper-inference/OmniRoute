import { renderhourBaseUrl } from "../../open-sse/handlers/mediaGeneration/renderhour.ts";

process.once("message", ({ urls }) => {
  const values = urls.map((baseUrl) => renderhourBaseUrl({ providerSpecificData: { baseUrl } }));
  process.send({ type: "result", values }, () => process.disconnect());
});
process.send({ type: "ready" });
