#!/usr/bin/env bash

set -euo pipefail

if [[ $# -lt 4 ]]; then
  echo "Usage:"
  echo "  ./deploy_github_pages.sh <git_user_name> <git_user_email> <github_user> <repo_name>"
  echo
  echo "Example:"
  echo "  ./deploy_github_pages.sh \"Chris\" \"chris@example.com\" your-github-name optimum-ppt"
  exit 1
fi

GIT_USER_NAME="$1"
GIT_USER_EMAIL="$2"
GITHUB_USER="$3"
REPO_NAME="$4"
REMOTE_URL="git@github.com:${GITHUB_USER}/${REPO_NAME}.git"

echo "Configuring local git identity..."
git config user.name "${GIT_USER_NAME}"
git config user.email "${GIT_USER_EMAIL}"

if ! git rev-parse --verify HEAD >/dev/null 2>&1; then
  echo "Creating initial commit..."
  git add .
  git commit -m "Initial deploy-ready static presentation site"
else
  echo "Creating/update commit..."
  git add .
  if ! git diff --cached --quiet; then
    git commit -m "Update static presentation site"
  else
    echo "No staged changes to commit."
  fi
fi

if git remote get-url origin >/dev/null 2>&1; then
  echo "Updating existing origin remote..."
  git remote set-url origin "${REMOTE_URL}"
else
  echo "Adding origin remote..."
  git remote add origin "${REMOTE_URL}"
fi

echo "Pushing to GitHub..."
git push -u origin main

cat <<EOF

Push completed.

Next step in GitHub:
1. Open https://github.com/${GITHUB_USER}/${REPO_NAME}
2. Go to Settings > Pages
3. Source: Deploy from a branch
4. Branch: main
5. Folder: / (root)

EOF
