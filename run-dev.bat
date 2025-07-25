@echo off
REM ---------------------------------------------
REM  run-dev.bat  —  Запуск Astro dev‑сервера
REM  Поместите файл в корень проекта (где package.json)
REM ---------------------------------------------
pushd "%~dp0"
echo Starting Astro dev server on http://localhost:4321 ...
echo (Закрытие этого окна остановит сервер)
npm run dev
popd
pause
