# Creates an "OmniRoute" shortcut on the current user's Windows Desktop.
# Run: right-click this file -> "Run with PowerShell"
$ErrorActionPreference = "Stop"

$launcher = Join-Path $PSScriptRoot "OmniRoute.bat"
if (-not (Test-Path $launcher)) { throw "OmniRoute.bat was not found next to this script." }

# GetFolderPath also works when the Desktop is redirected (OneDrive, school profiles).
$desktop = [Environment]::GetFolderPath("Desktop")
$linkPath = Join-Path $desktop "OmniRoute.lnk"

$shell = New-Object -ComObject WScript.Shell
$link = $shell.CreateShortcut($linkPath)
$link.TargetPath = $launcher
$link.WorkingDirectory = $PSScriptRoot
$link.Description = "Start OmniRoute and open the dashboard"
$link.IconLocation = "shell32.dll,13"
$link.Save()

Write-Host "Shortcut created: $linkPath"
