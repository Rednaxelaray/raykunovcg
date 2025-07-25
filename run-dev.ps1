<# 
  run-dev.ps1  —  Запуск Astro dev‑сервера
  Сохраните файл в корень проекта и запустите:
     .\run-dev.ps1
  Можно передать номер порта:  .\run-dev.ps1 -Port 4000
#>
param(
  [int]$Port = 4321
)
Write-Host "Starting Astro dev server on http://localhost:$Port ..." -ForegroundColor Cyan
Push-Location $PSScriptRoot
npm run dev -- --port $Port
Pop-Location
