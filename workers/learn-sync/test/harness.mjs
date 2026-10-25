/* Runs the Worker under `wrangler dev` against a throwaway local D1, so the tests hit
   the real HTTP surface (routing, CORS, headers) rather than calling the handler. */
import { spawn, execFile } from "node:child_process";
import { rm } from "node:fs/promises";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";

const run = promisify(execFile);
const ROOT = fileURLToPath(new URL("..", import.meta.url));
const WRANGLER = ROOT + "node_modules/.bin/wrangler";
const STATE = ROOT + ".wrangler/test-state";
const DB = "learn-sync";
const ENV = { ...process.env, WRANGLER_SEND_METRICS: "false", CI: "1" };

export async function resetState() {
  await rm(STATE, { recursive: true, force: true });
  await run(WRANGLER, ["d1", "migrations", "apply", DB, "--local", "--persist-to", STATE], { cwd: ROOT, env: ENV });
}

export async function d1(sql) {
  const { stdout } = await run(
    WRANGLER,
    ["d1", "execute", DB, "--local", "--persist-to", STATE, "--json", "--command", sql],
    { cwd: ROOT, env: ENV }
  );
  return JSON.parse(stdout)[0].results;
}

export async function startWorker({ port, vars = {} }) {
  const args = ["dev", "--port", String(port), "--ip", "127.0.0.1", "--persist-to", STATE];
  for (const [k, v] of Object.entries(vars)) args.push("--var", `${k}:${v}`);
  const child = spawn(WRANGLER, args, { cwd: ROOT, env: ENV, stdio: ["ignore", "pipe", "pipe"] });
  let log = "";
  child.stdout.on("data", (d) => (log += d));
  child.stderr.on("data", (d) => (log += d));

  const base = `http://127.0.0.1:${port}`;
  const deadline = Date.now() + 60000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) throw new Error("wrangler dev exited early:\n" + log);
    try {
      await fetch(base + "/__ready");
      return { base, stop: () => stop(child), log: () => log };
    } catch {
      await new Promise((r) => setTimeout(r, 250));
    }
  }
  await stop(child);
  throw new Error("wrangler dev did not come up:\n" + log);
}

function stop(child) {
  return new Promise((resolve) => {
    if (child.exitCode !== null) return resolve();
    child.once("exit", resolve);
    child.kill("SIGTERM");
  });
}
