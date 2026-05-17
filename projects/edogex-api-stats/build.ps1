param(
  [switch]$RunAfterBuild = $false
)

$ErrorActionPreference = "Stop"
Set-Location -LiteralPath $PSScriptRoot

function Copy-ItemSafe {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Source,
    [Parameter(Mandatory = $true)]
    [string]$Destination,
    [switch]$Optional
  )

  try {
    Copy-Item -LiteralPath $Source -Destination $Destination -Force
    return $true
  }
  catch {
    if ($Optional) {
      Write-Warning "Skipped copy to '$Destination' because it is locked or unavailable: $($_.Exception.Message)"
      return $false
    }

    throw
  }
}

$project = Get-Content -LiteralPath ".\project.json" -Raw | ConvertFrom-Json
$cliRoot = Resolve-Path "..\..\cli"
$cliEntry = Join-Path $cliRoot "dist\cli.js"
$injectCss = Join-Path $PSScriptRoot "inject.css"
$injectJs = Join-Path $PSScriptRoot "inject.js"
$distDir = Join-Path $PSScriptRoot "dist"
$releaseDir = Join-Path (Resolve-Path "..\..\releases") $project.slug
$exeSource = Join-Path $cliRoot ("src-tauri\target\x86_64-pc-windows-msvc\release\" + $project.exeName)

if (!(Test-Path -LiteralPath $cliEntry)) {
  throw "Missing CLI entry: $cliEntry"
}

if (!(Test-Path -LiteralPath $injectCss)) {
  throw "Missing inject.css: $injectCss"
}

if (!(Test-Path -LiteralPath $injectJs)) {
  throw "Missing inject.js: $injectJs"
}

New-Item -ItemType Directory -Force -Path $distDir | Out-Null
New-Item -ItemType Directory -Force -Path $releaseDir | Out-Null

$injectArg = "$injectCss,$injectJs"
$hideTitleBarArg = @()

if ($project.hideTitleBar) {
  $hideTitleBarArg = @("--hide-title-bar")
}

Write-Host "Building $($project.name) ..." -ForegroundColor Cyan

& node $cliEntry $project.url `
  --name $project.name `
  --width $project.width `
  --height $project.height `
  --inject $injectArg `
  @hideTitleBarArg `
  --targets app

if ($LASTEXITCODE -ne 0) {
  throw "Build failed with exit code $LASTEXITCODE"
}

if (!(Test-Path -LiteralPath $exeSource)) {
  throw "Build finished but exe not found: $exeSource"
}

$msi = Get-ChildItem -LiteralPath $PSScriptRoot -Filter "*.msi" |
  Sort-Object LastWriteTime -Descending |
  Select-Object -First 1

if (-not $msi) {
  throw "Build finished but no MSI found in $PSScriptRoot"
}

$exeDest = Join-Path $distDir ($project.name + ".exe")
$msiDest = Join-Path $distDir ($project.name + ".msi")

Copy-ItemSafe -Source $exeSource -Destination $exeDest | Out-Null
Copy-ItemSafe -Source $msi.FullName -Destination $msiDest | Out-Null
$releaseExeCopied = Copy-ItemSafe -Source $exeDest -Destination (Join-Path $releaseDir ($project.name + ".exe")) -Optional
$releaseMsiCopied = Copy-ItemSafe -Source $msiDest -Destination (Join-Path $releaseDir ($project.name + ".msi")) -Optional

Write-Host ""
Write-Host "[OK] Dist:" -ForegroundColor Green
Write-Host "  $distDir"
if ($releaseExeCopied -and $releaseMsiCopied) {
  Write-Host "[OK] Release:" -ForegroundColor Green
  Write-Host "  $releaseDir"
} else {
  Write-Host "[WARN] Release copy incomplete:" -ForegroundColor Yellow
  Write-Host "  $releaseDir"
}

if ($RunAfterBuild) {
  Start-Process -FilePath $exeDest
}
