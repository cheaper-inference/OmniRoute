@echo off
setlocal
title OmniRoute Server (Production Mode)
cd /d "%~dp0..\.."

echo Starting OmniRoute in Production Mode on http://localhost:20128 ...
echo Leave this window open. Close it to stop the server.
echo.
call npm run start:fast
if errorlevel 1 (
    echo.
    echo The server exited with an error.
    echo If this checkout has not been built yet, run first: npm run build:fast
    echo Or use start-omniroute-light.bat, which does not need a build.
    echo.
)
endlocal
pause
