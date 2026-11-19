import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

const gateUrl = new URL("../../../scripts/quality/gate-process.mjs", import.meta.url).href;
const linux = { skip: process.platform !== "linux", timeout: 20000 };

// The subreaper owns the fixture's exited grandchild until the gate decides.
// No unrelated process is signalled or inspected; waitpid reaps only our children.
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

const liveChild = `
import json,os,signal
ready_read,ready_write=os.pipe()
pid=os.fork()
if pid==0:
    os.close(ready_read)
    signal.signal(signal.SIGTERM,signal.SIG_IGN)
    os.write(ready_write,b"ready")
    os.close(ready_write)
    while True: signal.pause()
os.close(ready_write)
assert os.read(ready_read,5)==b"ready"
os.close(ready_read)
print(json.dumps({"pid":pid}),flush=True)
os._exit(0)
`;

function observe(childSource, exitCode = 0) {
  const directory = mkdtempSync(join(tmpdir(), "gate-quiescence-"));
  try {
    const source = `
      const { runGateProcess } = await import(${JSON.stringify(gateUrl)});
      const result = await runGateProcess("python3", ["-c", ${JSON.stringify(childSource)}, ${JSON.stringify(String(exitCode))}], {
        cwd: ${JSON.stringify(directory)},
        logPath: ${JSON.stringify(join(directory, "synthetic-output.txt"))},
        timeout: 5000, killGraceMs: 100,
      });
      const fixture = JSON.parse(result.out.split("\\n")[0]);
      console.log(JSON.stringify({ code: result.code, receipt: result.receipt, fixture }));
    `;
    const result = spawnSync(
      "python3",
      ["-c", subreaper, process.execPath, "--input-type=module", "-e", source],
      { encoding: "utf8", timeout: 18000, env: { PATH: process.env.PATH, LANG: "C.UTF-8" } }
    );
    assert.equal(result.error, undefined);
    assert.equal(result.status, 0, result.stderr);
    return JSON.parse(result.stdout);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}

for (const exitCode of [0, 42]) {
  test(`an exited zombie preserves the gate parent's exit ${exitCode}`, linux, () => {
    const { gate, reaped } = observe(zombieChild, exitCode);
    assert.equal(gate.fixture.state, "Z");
    assert.equal(gate.fixture.threads, "1");
    assert.equal(gate.code, exitCode);
    assert.equal(gate.receipt.exitCode, exitCode);
    assert.equal(gate.receipt.outcome, exitCode === 0 ? "PASS" : "FAIL");
    assert.deepEqual(reaped, [{ pid: gate.fixture.pid, status: 0 }]);
  });
}

test(
  "a live TERM-resistant descendant still requires cleanup and cannot certify PASS",
  linux,
  () => {
    const { gate, reaped } = observe(liveChild);
    assert.equal(gate.receipt.exitCode, 0);
    assert.equal(gate.receipt.outcome, "ORPHANED_DESCENDANTS");
    assert.notEqual(gate.code, 0);
    assert.deepEqual(reaped, [{ pid: gate.fixture.pid, status: 9 }]);
  }
);
