@echo off
setlocal
cd /d "%~dp0"
powershell -ExecutionPolicy Bypass -File "%~dp0build-preview-userscript.ps1"
if errorlevel 1 (
  echo.
  echo [ERROR] Failed to generate preview userscript.
  pause
  exit /b 1
)
echo.
pause
