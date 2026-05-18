import assert from "node:assert/strict";
import fs from "node:fs";

const styleJs = fs.readFileSync("D:/works/pake/cli/src-tauri/src/inject/style.js", "utf8");
const eventJs = fs.readFileSync("D:/works/pake/cli/src-tauri/src/inject/event.js", "utf8");

assert.match(styleJs, /PAKE_DRAG_REGION_ID/);
assert.match(styleJs, /PAKE_DRAG_SENSOR_ID/);
assert.match(styleJs, /PAKE_MAXIMIZE_BUTTON_ID/);
assert.match(styleJs, /pake-drag-handle/);
assert.match(eventJs, /data-tauri-drag-region/);
assert.match(eventJs, /pake-drag-handle/);
assert.match(eventJs, /pake-top-sensor/);
assert.match(eventJs, /updateMaximizeButtonText/);
assert.match(eventJs, /toggleMaximize/);
assert.match(eventJs, /拖动窗口/);
assert.match(eventJs, /最大化窗口/);
assert.match(eventJs, /还原窗口/);
assert.match(eventJs, /svg/);

console.log("drag region wiring verified");
