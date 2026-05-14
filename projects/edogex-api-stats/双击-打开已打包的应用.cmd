@echo off
setlocal
cd /d "%~dp0"
powershell -ExecutionPolicy Bypass -NoProfile -Command ^
  "$project = Get-Content -LiteralPath '.\\project.json' -Raw | ConvertFrom-Json; " ^
  "$exe = Join-Path '.\\dist' ($project.name + '.exe'); " ^
  "if (!(Test-Path -LiteralPath $exe)) { Write-Host ''; Write-Host '[ERROR] exe not found:' $exe -ForegroundColor Red; exit 1 }; " ^
  "Start-Process -FilePath $exe"
if errorlevel 1 (
  echo.
  pause
  exit /b 1
)
