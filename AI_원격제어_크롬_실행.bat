@echo off
chcp 65001 > nul
title AI 원격 제어 크롬 실행기
cls
echo ==============================================================
echo 🚀 AI 원격 제어 모드로 크롬(Chrome)을 실행합니다.
echo ==============================================================
echo.
echo [1/2] 실행 중인 기존 크롬 창을 정리합니다...
taskkill /F /IM chrome.exe > nul 2>&1
timeout /t 2 /nobreak > nul

echo [2/2] AI 조종 전용 포트(9222)를 열고 크롬을 실행합니다...
start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222 "https://power-n-life.tistory.com/manage"

echo.
echo ==============================================================
echo ✅ 크롬이 AI 원격 제어 모드로 성공적으로 실행되었습니다!
echo    이제 Antigravity 대화창으로 돌아오시면 AI가 즉시 조종을 시작합니다.
echo ==============================================================
timeout /t 3 > nul
exit
