@echo off
REM Script de inicio rápido para tu CV en Quarto
REM Para Windows

echo ========================================
echo   CV Carlos A. Falla G. - Quarto
echo ========================================
echo.

REM Verificar si Quarto está instalado
where quarto >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Quarto no está instalado o no está en PATH
    echo.
    echo Descarga Quarto desde: https://quarto.org/docs/get-started/
    echo Luego ejecuta este script de nuevo.
    pause
    exit /b 1
)

echo [OK] Quarto está instalado
echo.

REM Verificar R
where R >nul 2>nul
if %errorlevel% neq 0 (
    echo [ADVERTENCIA] R no está en PATH, pero puede funcionar desde RStudio
    echo.
)

echo Selecciona una opción:
echo.
echo 1. Preview (ver en navegador con auto-actualización)
echo 2. Render (generar HTML final)
echo 3. Render PDF
echo 4. Abrir en RStudio
echo 5. Salir
echo.

set /p opcion="Ingresa el número de tu opción: "

if "%opcion%"=="1" (
    echo.
    echo Iniciando preview...
    echo Tu CV se abrirá en el navegador en unos segundos
    echo Presiona Ctrl+C para detener
    echo.
    quarto preview
)

if "%opcion%"=="2" (
    echo.
    echo Generando HTML...
    quarto render
    echo.
    echo [OK] HTML generado en: docs\index.html
    echo.
    start docs\index.html
    pause
)

if "%opcion%"=="3" (
    echo.
    echo Generando PDF...
    quarto render --to pdf
    echo.
    echo [OK] Si no hubo errores, el PDF está en: index.pdf
    pause
)

if "%opcion%"=="4" (
    echo.
    echo Abriendo en RStudio...
    start cv-carlos.Rproj
)

if "%opcion%"=="5" (
    exit
)

echo.
pause
