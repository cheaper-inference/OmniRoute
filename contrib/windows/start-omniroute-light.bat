@echo off
setlocal
title OmniRoute Server (Light Mode)
cd /d "%~dp0..\.."

set OMNIROUTE_DISABLE_BACKGROUND_SERVICES=true

echo Starting OmniRoute in Light Mode on http://localhost:20128 ...
echo Dashboard is active. Background services are off: no connection recovery, quota refresh,
echo sync jobs, retention cleanup or scheduled VACUUM. See contrib\windows\README.md.
echo Leave this window open. Close it to stop the server.
echo.
call npm run dev
if errorlevel 1 (
    echo.
    echo The server exited with an error.
    echo.
)
endlocal
pause
