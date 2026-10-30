@echo off
setlocal
title OmniRoute Server (Headless Mode)
cd /d "%~dp0..\.."

set OMNIROUTE_HEADLESS=1
set OMNIROUTE_DISABLE_BACKGROUND_SERVICES=true

echo Starting OmniRoute in Headless Mode on http://localhost:20128 ...
echo Proxy endpoints (/v1/*) are active. Dashboard is disabled.
echo Leave this window open. Close it to stop the server.
echo.
call npm run dev
if errorlevel 1 (
    echo.
    echo O servidor encerrou com erro.
    echo.
)
endlocal
pause
