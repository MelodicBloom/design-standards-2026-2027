#!/usr/bin/env bash
set -euo pipefail

REMOTE=${1:-origin}
BASE_BRANCH=${2:-main}
TARGET_REPO=${3:-.}
BRANCH=${4:-feat/motion-token-system}
COMMIT_MSG=${5:-"feat(motion): add motion-system-master package"}

ROOT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
PACKAGE_DIR="$ROOT_DIR/output/motion-system-master"

if [ ! -d "$TARGET_REPO/.git" ]; then
  echo "Target repo not found or not a git repo: $TARGET_REPO" >&2
  exit 1
fi

if [ ! -d "$PACKAGE_DIR" ]; then
  echo "Package directory not found: $PACKAGE_DIR" >&2
  exit 1
fi

cd "$TARGET_REPO"

git fetch "$REMOTE"
git checkout "$BASE_BRANCH"
git pull "$REMOTE" "$BASE_BRANCH"
git checkout -b "$BRANCH" || git checkout "$BRANCH"

mkdir -p .kimi/skills
rm -rf .kimi/skills/motion-system-master
cp -R "$PACKAGE_DIR" .kimi/skills/motion-system-master

git add .kimi/skills/motion-system-master
git commit -m "$COMMIT_MSG"
git push -u "$REMOTE" "$BRANCH"

echo "Copied package and pushed $BRANCH to $REMOTE from $TARGET_REPO"
