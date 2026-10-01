@echo off
title SmartBrain DPLI Launcher
echo ===================================================
echo Memulakan SmartBrain DPLI (OnlineStudy Platform)...
echo ===================================================

echo [1/2] Memulakan Backend Server (Port 4000)...
start "SmartBrain Backend" cmd /k "cd backend && node server.js"

echo [2/2] Memulakan Frontend Dev Server (Port 5173)...
start "SmartBrain Frontend" cmd /k "npm.cmd run dev -- --host 0.0.0.0 --port 5173"

echo Menunggu server sedia...
timeout /t 3 /nobreak > nul

echo Membuka aplikasi dalam pelayar web...
start http://localhost:5173

echo ===================================================
echo Aplikasi sedang berjalan di:
echo - Frontend: http://localhost:5173
echo - Backend:  http://localhost:4000
echo.
echo Akaun sedia ada:
echo - Admin: admin / admin123
echo - Pelajar Demo: demo / demo123
echo ===================================================
