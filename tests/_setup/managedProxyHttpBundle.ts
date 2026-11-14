import assert from "node:assert/strict";
import path from "node:path";
import { build } from "esbuild";

// Next routes the HTTP requests itself. Only state, credentials and native lifecycle are fake.
const adapters: Record<string, string> = {
  // Match readCache's body-limit projection without loading any persisted settings.
  "src/lib/db/readCache": `
    export async function getCachedSettings(){return {};}
    export async function getCachedBodySizeSettings(){
      return {...(await getCachedSettings()),savedMaxBodySizeMb:null};
    }`,
  // Entra policy imports this eagerly even when SSO is disabled by the empty settings.
  // Logging is outside the deletion contract: do not create Pino workers or real log files.
  "src/sse/utils/logger": `
    export function debug(){}
    export function info(){}
    export function warn(){}
    export function error(){}
    export function request(){}`,
  "src/lib/gracefulShutdown": "export function isDraining(){return false;}",
  "src/lib/config/runtimeSettings":
    "export function getAuthzBypassSnapshot(){return {enabled:false,prefixes:[]};}",
  "src/shared/utils/apiAuth": `
    export async function isAuthRequired(){return true;}
    export async function isDashboardSessionAuthenticated(){return false;}`,
  "src/lib/machineToken": `
    export function getMachineTokenSync(){return "synthetic-cli-token";}
    export function getLegacyCliTokenSync(){return "";}`,
  "src/shared/services/modelSyncScheduler":
    "export function isModelSyncInternalRequest(){return false;}",
  "src/lib/db/apiKeys": `
    export async function getApiKeyMetadata(){return {id:"fixture",scopes:["manage"]};}
    export async function validateApiKey(key){return key==="synthetic-management-key";}`,
  "src/lib/db/ssoIdentities": `
    export function getSsoShadowSecret(){throw new Error("Unexpected fixture SSO lookup");}
    export function provisionSsoIdentity(){throw new Error("Unexpected fixture SSO provisioning");}`,
  "src/lib/db/apiKeyGroups": `
    export function filterExistingActiveKeyGroupIds(){throw new Error("Unexpected fixture SSO groups");}`,
  "src/sse/services/auth": `
    export function extractApiKey(request){return request.headers.get("authorization")?.slice(7)||null;}
    export async function isValidApiKey(key){return key==="synthetic-management-key";}
    export function readNonEmptyUrlToken(){return null;}`,
  "src/lib/db/accessTokens": `
    export function verifyAccessToken(token){return token==="oma_fixture_write"
      ? {id:"fixture",name:"fixture",scope:"write"}:null;}`,
  "src/lib/api/internalServiceAuth": `
    export function isInternalServiceRequest(){return false;}
    export function isTrustedLoopbackInternalServiceRequest(){return false;}`,
  "src/lib/middleware/cliTokenAuth": "export async function isCliTokenAuthValid(){return false;}",
  "open-sse/services/ipFilter": "export function checkRequestIP(){return {allowed:true};}",
  // Auth-touch persistence is outside the deletion contract; keep its DB out of the bundle.
  "src/lib/compliance/index": "export function recordApiKeyAuthTouch(){}",
  "src/shared/utils/featureFlags": `
    export function isRequireApiKeyEnabled(){return true;}
    export function isFeatureFlagEnabled(){return false;}`,
  "open-sse/utils/proxyDispatcher": "export function clearDispatcherCache(){}",
  "src/lib/db/proxies": `
    export async function getProxyById(id){return id==="missing"?null:{id,notes:
      id.startsWith("managed")?JSON.stringify({managedProxyId:id,managedCore:"singbox"}):null};}
    export async function getProxyWhereUsed(){return {count:0,connections:[],combos:[],apiKeys:[]};}
    export async function deleteProxyById(id){return id!=="missing";}`,
  "src/lib/services/managedProxy/remove": `
    export async function removeManagedProxy(core,id,commit){
      if(core!=="singbox"||!id.startsWith("managed"))throw new Error("Invalid fixture removal");
      return commit();
    }`,
};

/** Compile the exact hosted HTTP dependency graph without evaluating it or starting Next. */
export async function buildManagedProxyHttpBundle(project: string, outfile: string) {
  const result = await build({
    write: false,
    stdin: {
      contents: `
      export {runAuthzPipeline} from "./src/server/authz/pipeline";
      export {DELETE,POST} from "./src/app/api/services/managed-proxy/registry-delete/route";
      export {handleProxyDelete} from "./src/lib/api/proxyDeletionHandlers";
      export {POST as batchDelete} from "./src/app/api/settings/proxies/batch-delete/route";`,
      resolveDir: project,
    },
    outfile,
    bundle: true,
    metafile: true,
    platform: "node",
    format: "cjs",
    packages: "external",
    tsconfig: path.join(project, "tsconfig.json"),
    plugins: [
      {
        name: "isolated-managed-state",
        setup(builder) {
          builder.onResolve({ filter: /.*/ }, (args) => {
            let resolved: string | undefined;
            if (args.path.startsWith("@/")) resolved = `src/${args.path.slice(2)}`;
            else if (args.path.startsWith("@omniroute/open-sse/"))
              resolved = `open-sse/${args.path.slice("@omniroute/open-sse/".length)}`;
            else if (args.path.startsWith("."))
              resolved = path
                .relative(project, path.resolve(args.resolveDir, args.path))
                .replaceAll("\\", "/");
            const key = resolved?.replace(/\.(?:ts|tsx)$/, "");
            if (key === "open-sse/utils/error")
              return { path: path.join(project, "open-sse/utils/errorSanitization.ts") };
            return key && key in adapters ? { path: key, namespace: "fixture" } : undefined;
          });
          builder.onLoad({ filter: /.*/, namespace: "fixture" }, (args) => ({
            contents: adapters[args.path],
            loader: "js",
          }));
        },
      },
    ],
  });
  assert.deepEqual(
    Object.keys(result.metafile!.inputs).filter(
      (file) => !file.startsWith("fixture:") && /(?:^|\/)src\/lib\/db\//.test(file)
    ),
    [],
    "HTTP fixture must not bundle real database modules"
  );
  return result;
}
