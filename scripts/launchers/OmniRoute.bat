@echo off
rem OmniRoute launcher (Windows). Double-click to start the gateway and open the dashboard.
title OmniRoute
setlocal
set "OMNI_PORT=20128"
set "OMNI_URL=http://localhost:%OMNI_PORT%/dashboard"

where omniroute >nul 2>nul
if errorlevel 1 (
  echo OmniRoute is not installed yet.
  echo Install Node.js 22 or newer from https://nodejs.org, then run:
  echo     npm install -g omniroute
  echo.
  pause
  exit /b 1
)

rem If the server is already listening, only open the dashboard.
powershell -NoProfile -Command "try { (New-Object Net.Sockets.TcpClient('localhost',%OMNI_PORT%)).Close(); exit 0 } catch { exit 1 }"
if not errorlevel 1 (
  start "" "%OMNI_URL%"
  exit /b 0
)

rem Open the dashboard once the server answers (waits up to 60 seconds).
start "" /min powershell -NoProfile -Command "for($i=0;$i -lt 60;$i++){ try{ (New-Object Net.Sockets.TcpClient('localhost',%OMNI_PORT%)).Close(); Start-Process '%OMNI_URL%'; break } catch { Start-Sleep 1 } }"

echo Starting OmniRoute on %OMNI_URL%
echo Keep this window open while you use it. Close it to stop the server.
echo.
omniroute serve --no-open
echo.
echo OmniRoute stopped.
pause
