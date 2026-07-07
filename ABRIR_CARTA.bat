@echo off
cd /d "%~dp0"
if exist "%~dp0index.html" (
  where msedge >nul 2>nul
  if %errorlevel%==0 (
    start "" msedge "%~dp0index.html"
    exit /b
  )

  where chrome >nul 2>nul
  if %errorlevel%==0 (
    start "" chrome "%~dp0index.html"
    exit /b
  )

  if exist "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" (
    start "" "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" "%~dp0index.html"
    exit /b
  )

  if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" (
    start "" "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" "%~dp0index.html"
    exit /b
  )

  echo No encuentro Edge ni Chrome. Abre index.html con clic derecho ^> Abrir con ^> navegador.
  pause
) else (
  echo No se encuentra index.html en esta carpeta.
  pause
)
