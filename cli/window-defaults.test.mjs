import assert from "node:assert/strict";
import fs from "node:fs";

const cliJs = fs.readFileSync(new URL("./dist/cli.js", import.meta.url), "utf8");

assert.match(cliJs, /hideTitleBar:\s*true/);
assert.match(cliJs, /webviewInstallMode\s*=\s*\{\s*type:\s*'offlineInstaller'/s);

console.log("window defaults verified");
