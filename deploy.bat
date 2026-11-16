@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo === 1/2 ビルド中です(1〜2分かかります) ===
call npm run build
if errorlevel 1 (
  echo.
  echo ビルドでエラーが出ました。この画面を写真に撮ってClaudeに送ってください。
  pause
  exit /b 1
)
echo === 2/2 公開中です ===
git add .
git commit -m "Renew site with POP design"
git push
if errorlevel 1 (
  echo.
  echo 公開でエラーが出ました。この画面を写真に撮ってClaudeに送ってください。
  pause
  exit /b 1
)
echo.
echo 完了しました。数分後に https://jotto.co.jp に反映されます。
pause
