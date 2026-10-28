@echo off
setlocal
title OmniRoute Server (Light Mode)
cd /d "%~dp0..\.."

set OMNIROUTE_DISABLE_BACKGROUND_SERVICES=true

echo Starting OmniRoute in Light Mode on http://localhost:20128 ...
echo Dashboard is active. Background sync jobs are disabled.
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
