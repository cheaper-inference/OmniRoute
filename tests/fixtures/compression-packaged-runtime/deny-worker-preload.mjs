import { isMainThread } from "node:worker_threads";
if (!isMainThread) throw new Error("gateway preload reached worker");
