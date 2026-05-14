@echo off
setlocal
cd /d "%~dp0"
powershell -ExecutionPolicy Bypass -File "%~dp0build.ps1" -RunAfterBuild
if errorlevel 1 (
  echo.
  echo [ERROR] Build failed.
  pause
  exit /b 1
)
echo.
pause
