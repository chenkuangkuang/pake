$ErrorActionPreference = "Stop"
Set-Location -LiteralPath $PSScriptRoot

$cssPath = Join-Path $PSScriptRoot "inject.css"
$jsPath = Join-Path $PSScriptRoot "inject.js"
$previewDir = Join-Path $PSScriptRoot "preview"
$outputPath = Join-Path $previewDir "edogex-api-stats-preview.user.js"

New-Item -ItemType Directory -Force -Path $previewDir | Out-Null

Add-Type -AssemblyName System.Web.Extensions
$serializer = New-Object System.Web.Script.Serialization.JavaScriptSerializer
$cssText = [System.IO.File]::ReadAllText($cssPath)
$jsText = [System.IO.File]::ReadAllText($jsPath)
$cssJson = $serializer.Serialize($cssText)
$jsJson = $serializer.Serialize($jsText)

$userscript = @"
// ==UserScript==
// @name         EDogex API Stats Local Preview
// @namespace    local.pake.preview
// @version      0.1.0
// @description  Preview local inject.css and inject.js changes in the browser before packaging.
// @match        https://crs.edogex.com/admin-next/api-stats*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

    const STYLE_ID = "pake-local-preview-style";
    const SCRIPT_FLAG = "__pakeLocalPreviewLoaded";
    const cssText = $cssJson;
    const jsText = $jsJson;

    function injectCss() {
        const existing = document.getElementById(STYLE_ID);
        if (existing) {
            existing.textContent = cssText;
            return;
        }

        const style = document.createElement("style");
        style.id = STYLE_ID;
        style.textContent = cssText;
        (document.head || document.documentElement).appendChild(style);
    }

    function injectJs() {
        if (window[SCRIPT_FLAG]) {
            return;
        }

        window[SCRIPT_FLAG] = true;
        const script = document.createElement("script");
        script.textContent = jsText;
        (document.documentElement || document.head).appendChild(script);
        script.remove();
    }

    injectCss();
    injectJs();
})();
"@

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($outputPath, $userscript, $utf8NoBom)
Write-Host "[OK] Generated preview userscript: $outputPath" -ForegroundColor Green
