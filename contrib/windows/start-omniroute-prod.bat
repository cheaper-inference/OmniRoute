@echo off
setlocal
title OmniRoute Server (Production Mode)
cd /d "%~dp0..\.."

set OMNIROUTE_DISABLE_BACKGROUND_SERVICES=true

echo Starting OmniRoute in Production Mode on http://localhost:20128 ...
echo Leave this window open. Close it to stop the server.
echo.
call npm run start:fast
if errorlevel 1 (
    echo.
    echo [AVISO] O servidor nao pode iniciar em modo producao porque o build ainda nao foi feito.
    echo Para usar o modo producao, execute antes: npm run build:fast
    echo Ou use start-omniroute-light.bat para rodar diretamente.
    echo.
)
endlocal
pause
