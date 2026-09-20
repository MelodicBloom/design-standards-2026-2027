#!/usr/bin/env bash
set -euo pipefail

EXPECTED_REPO="MelodicBloom/design-standards-2026-2027"
EXPECTED_BASE="1279b0c38cc1183d1c764d5ed7dbc2f91e6660b2"
EXPECTED_BRANCH="agent/motion-drift-scanner-v0"

ROOT="$(git rev-parse --show-toplevel 2>/dev/null || true)"
if [[ -z "$ROOT" ]]; then
  echo "ERROR: run inside a git checkout of $EXPECTED_REPO" >&2
  exit 2
fi
cd "$ROOT"

for cmd in git node npm; do
  command -v "$cmd" >/dev/null 2>&1 || {
    echo "ERROR: required command not found: $cmd" >&2
    exit 2
  }
done

NODE_MAJOR="$(node -p "process.versions.node.split('.')[0]")"
if (( NODE_MAJOR < 20 || NODE_MAJOR >= 23 )); then
  echo "ERROR: Node >=20 and <23 required; found $(node --version)" >&2
  exit 2
fi

CURRENT_BRANCH="$(git branch --show-current)"
if [[ "$CURRENT_BRANCH" != "$EXPECTED_BRANCH" ]]; then
  echo "ERROR: expected branch $EXPECTED_BRANCH; found ${CURRENT_BRANCH:-DETACHED}" >&2
  exit 3
fi

git cat-file -e "$EXPECTED_BASE^{commit}" 2>/dev/null || {
  echo "ERROR: expected base commit $EXPECTED_BASE is unavailable locally. Fetch main first." >&2
  exit 3
}

MERGE_BASE="$(git merge-base HEAD "$EXPECTED_BASE")"
if [[ "$MERGE_BASE" != "$EXPECTED_BASE" ]]; then
  echo "ERROR: branch is not descended from expected base $EXPECTED_BASE" >&2
  echo "Observed merge-base: $MERGE_BASE" >&2
  exit 3
fi

if [[ -n "$(git status --porcelain)" ]]; then
  echo "ERROR: working tree must be clean before bootstrap." >&2
  exit 3
fi

TOOL_DIR="$ROOT/tools/motion-drift-scanner"
WORK_DIR="$ROOT/.work/motion-drift-scanner"
INPUT_DIR="$WORK_DIR/inputs"
mkdir -p "$INPUT_DIR"

checkout_bound_repo() {
  local slug="$1"
  local sha="$2"
  local name="${slug##*/}"
  local dest="$INPUT_DIR/$name"
  local url="https://github.com/$slug.git"

  if [[ ! -d "$dest/.git" ]]; then
    echo "Cloning $slug..."
    git clone --filter=blob:none --no-checkout "$url" "$dest"
  else
    local remote
    remote="$(git -C "$dest" remote get-url origin)"
    if [[ "$remote" != "$url" && "$remote" != "git@github.com:${slug}.git" ]]; then
      echo "ERROR: unexpected origin for $dest: $remote" >&2
      exit 4
    fi
  fi

  git -C "$dest" fetch --depth=1 origin "$sha"
  git -C "$dest" checkout --detach --force "$sha"

  local observed
  observed="$(git -C "$dest" rev-parse HEAD)"
  if [[ "$observed" != "$sha" ]]; then
    echo "ERROR: SHA verification failed for $slug: $observed != $sha" >&2
    exit 4
  fi
}

checkout_bound_repo "qt314wink/nextjs-boilerplate" "b1bcbcc3199b41b37616bd377a0461e4a6f489bf"
checkout_bound_repo "qt314wink/seed-loom" "59da68c0d4a5b5152a3fd34501cb90ef5b81da8c"
checkout_bound_repo "qt314wink/svg-filter-lab" "951f95f974687ee03b574b95a5b96920c39c8172"

cd "$TOOL_DIR"
if [[ -f package-lock.json ]]; then
  npm ci
else
  echo "No package-lock.json yet; installing pinned package.json dependencies."
  npm install
  echo "IMPORTANT: commit the generated tools/motion-drift-scanner/package-lock.json before implementation PR is considered ready."
fi

echo
echo "Bootstrap complete."
echo "Node: $(node --version)"
echo "npm:  $(npm --version)"
echo "Branch: $CURRENT_BRANCH"
echo "Base:   $EXPECTED_BASE"
echo "Inputs:"
printf '  %s\n' \
  "nextjs-boilerplate@$(git -C "$INPUT_DIR/nextjs-boilerplate" rev-parse HEAD)" \
  "seed-loom@$(git -C "$INPUT_DIR/seed-loom" rev-parse HEAD)" \
  "svg-filter-lab@$(git -C "$INPUT_DIR/svg-filter-lab" rev-parse HEAD)"
echo
echo "Next: implement schema + scanner + fixtures, then run: npm run verify"
