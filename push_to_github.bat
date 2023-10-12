@echo off

REM Local Repository Path
set localRepoPath=C:\Users\nizamulic\PycharmProjects\pythonProject\heroku_test
set remoteRepo=https://github.com/melodic456/heroku_node_test.git

REM Initialize Git Repository
echo Initializing Git repository...
mkdir %localRepoPath%
cd %localRepoPath%
git init

REM Add Batch Script to Git
echo Adding batch script to Git...
copy "%~f0" "%localRepoPath%\script.bat"
git add .

REM Commit Changes
echo Committing changes...
git commit -m "Initial commit"

REM Set Remote Origin
echo Setting remote origin...
git remote add origin %remoteRepo%

REM Push to GitHub
echo Pushing to GitHub...
git push -u origin master

echo Batch script pushed successfully to the repository!