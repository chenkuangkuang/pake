import assert from "node:assert/strict";
import fs from "node:fs";

const injectJs = fs.readFileSync("D:/works/pake/projects/edogex-api-stats/inject.js", "utf8");
const libRs = fs.readFileSync("D:/works/pake/cli/src-tauri/src/lib.rs", "utf8");
const invokeRs = fs.readFileSync("D:/works/pake/cli/src-tauri/src/app/invoke.rs", "utf8");
const cargoToml = fs.readFileSync("D:/works/pake/cli/src-tauri/Cargo.toml", "utf8");
const windowRs = fs.readFileSync("D:/works/pake/cli/src-tauri/src/app/window.rs", "utf8");

assert.match(injectJs, /core\.invoke\("toggle_always_on_top"\)/);
assert.match(injectJs, /core\.invoke\("get_always_on_top"\)/);
assert.doesNotMatch(injectJs, /setAlwaysOnTop\(/);
assert.match(libRs, /toggle_always_on_top/);
assert.match(libRs, /get_current_app_url/);
assert.match(libRs, /set_current_app_url/);
assert.match(libRs, /reset_app_url/);
assert.match(invokeRs, /SetWindowPos/);
assert.match(invokeRs, /HWND_TOPMOST/);
assert.match(invokeRs, /HWND_NOTOPMOST/);
assert.match(invokeRs, /GetWindowLongW/);
assert.match(invokeRs, /WS_EX_TOPMOST/);
assert.match(invokeRs, /pub\s+(async\s+)?fn\s+get_current_app_url/);
assert.match(invokeRs, /pub\s+(async\s+)?fn\s+set_current_app_url/);
assert.match(invokeRs, /pub\s+(async\s+)?fn\s+reset_app_url/);
assert.match(windowRs, /resolve_runtime_url/);
assert.match(cargoToml, /windows = \{ version = "0\.61\.3"/);

console.log("native pin wiring verified");
