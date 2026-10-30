import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

const gateUrl = new URL("../../../scripts/quality/gate-process.mjs", import.meta.url).href;

// Keep the exited grandchild under our own subreaper until the gate has made its
// decision. The gate must not mistake a pending waitpid for executable work.
const subreaper = `
import ctypes,json,os,subprocess,sys,time
assert ctypes.CDLL(None,use_errno=True).prctl(36,1,0,0,0)==0
child=subprocess.Popen(sys.argv[1:],stdout=subprocess.PIPE,stderr=subprocess.PIPE)
stdout,stderr=child.communicate(timeout=10)
reaped=[]
deadline=time.monotonic()+5
while time.monotonic()<deadline:
    try: pid,status=os.waitpid(-1,os.WNOHANG)
    except ChildProcessError: break
    if pid: reaped.append({"pid":pid,"status":status})
    else: time.sleep(0.005)
else: raise RuntimeError("fixture child did not terminate")
assert child.returncode==0,stderr.decode()
print(json.dumps({"gate":json.loads(stdout),"reaped":reaped}))
`;

const zombieChild = `
import json,os,sys,time
pid=os.fork()
if pid==0: os._exit(0)
deadline=time.monotonic()+2
while time.monotonic()<deadline:
    fields=open(f"/proc/{pid}/stat").read().rsplit(")",1)[1].split()
    if fields[0]=="Z" and fields[17]=="1": break
    time.sleep(0.005)
else: raise RuntimeError("fixture child never became an exited zombie")
print(json.dumps({"pid":pid,"state":fields[0],"threads":fields[17]}),flush=True)
os._exit(int(sys.argv[1]))
`;

for (const exitCode of [0, 42]) {
  test(
    `an exited zombie preserves the gate parent's exit ${exitCode}`,
    { skip: process.platform !== "linux" },
    () => {
      const directory = mkdtempSync(join(tmpdir(), "gate-zombie-"));
      try {
        const script = `
          const { runGateProcess } = await import(${JSON.stringify(gateUrl)});
          const result = await runGateProcess("python3", ["-c", ${JSON.stringify(zombieChild)}, ${JSON.stringify(String(exitCode))}], {
            cwd: ${JSON.stringify(directory)}, logPath: ${JSON.stringify(join(directory, "synthetic-output.txt"))},
            timeout: 5000, killGraceMs: 100,
          });
          const fixture = JSON.parse(result.out.split("\\n")[0]);
          console.log(JSON.stringify({ code: result.code, receipt: result.receipt, fixture }));
        `;
        const result = spawnSync(
          "python3",
          ["-c", subreaper, process.execPath, "--input-type=module", "-e", script],
          { encoding: "utf8", timeout: 16000, env: { PATH: process.env.PATH, LANG: "C.UTF-8" } }
        );
        assert.equal(result.status, 0, result.stderr);
        const { gate, reaped } = JSON.parse(result.stdout);
        assert.equal(gate.fixture.state, "Z");
        assert.equal(gate.fixture.threads, "1");
        assert.equal(gate.code, exitCode);
        assert.equal(gate.receipt.exitCode, exitCode);
        assert.equal(gate.receipt.outcome, exitCode === 0 ? "PASS" : "FAIL");
        assert.deepEqual(reaped, [{ pid: gate.fixture.pid, status: 0 }]);
      } finally {
        rmSync(directory, { recursive: true, force: true });
      }
    }
  );
}

test(
  "an incomplete Linux process scan cannot certify a successful gate",
  { skip: process.platform !== "linux" },
  () => {
    const directory = mkdtempSync(join(tmpdir(), "gate-unknown-group-"));
    try {
      const script = `
      import fs from "node:fs";
      import { syncBuiltinESMExports } from "node:module";
      const { runGateProcess } = await import(${JSON.stringify(gateUrl)});
      const readdir = fs.readdirSync;
      fs.readdirSync = (path, ...args) => {
        if (String(path) === "/proc") throw Object.assign(new Error("fixture unreadable process table"), { code: "EACCES" });
        return readdir(path, ...args);
      };
      syncBuiltinESMExports();
      const result = await runGateProcess(process.execPath, ["-e", ""], {
        cwd: ${JSON.stringify(directory)}, logPath: ${JSON.stringify(join(directory, "synthetic-output.txt"))},
        timeout: 5000, killGraceMs: 100,
      });
      console.log(JSON.stringify({ code: result.code, receipt: result.receipt }));
    `;
      const result = spawnSync(process.execPath, ["--input-type=module", "-e", script], {
        encoding: "utf8",
        timeout: 8000,
        env: { PATH: process.env.PATH, LANG: "C.UTF-8" },
      });
      assert.equal(result.status, 0, result.stderr);
      const gate = JSON.parse(result.stdout);
      assert.equal(gate.receipt.exitCode, 0);
      assert.equal(gate.receipt.outcome, "CLEANUP_ERROR");
      assert.notEqual(gate.code, 0);
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  }
);
