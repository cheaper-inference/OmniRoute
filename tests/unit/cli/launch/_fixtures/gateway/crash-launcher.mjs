// Fixture: a launcher process that acquires a gateway and then waits to be killed.
//   node crash-launcher.mjs <gatewayModuleFileUrl> <stateDir> <port> <fakeGatewayPath>
// Prints "READY <serverPid> <leasePid>" once acquired.
const [moduleUrl, stateDir, portArg, fake] = process.argv.slice(2);
const port = Number(portArg);
const { acquireGateway, gatewayStatus } = await import(moduleUrl);
const handle = await acquireGateway({
  target: { kind: "local" },
  flags: { port, startTimeoutMs: 15000 },
  stateDir,
  overrides: {
    gatewayCommand: [process.execPath, fake, "--port", "{port}"],
    graceMs: 300,
    scanMs: 100,
    leaseStaleMs: 800,
    heartbeatMs: 200,
    lockTimeoutMs: 5000,
  },
});
const status = await gatewayStatus({ stateDir, port });
process.stdout.write(`READY ${status.pid} ${process.pid} ${handle.owned}\n`);
setInterval(() => {}, 1 << 30);
