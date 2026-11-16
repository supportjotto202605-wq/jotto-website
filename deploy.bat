@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo === 0/3 前回のビルド結果を削除しています ===
if exist .next rmdir /s /q .next
echo === 1/3 部品を最新の状態にそろえています ===
call npm install --no-audit --no-fund
if errorlevel 1 (
  echo.
  echo 部品の更新でエラーが出ました。この画面を写真に撮ってClaudeに送ってください。
  pause
  exit /b 1
)
echo === 2/3 ビルド中です(1〜2分かかります) ===
call npm run build
if errorlevel 1 (
  echo.
  echo ビルドでエラーが出ました。この画面を写真に撮ってClaudeに送ってください。
  pause
  exit /b 1
)
echo === 3/3 公開中です ===
git add .
git commit -m "Update site"
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
