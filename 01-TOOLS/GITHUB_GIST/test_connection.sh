#!/usr/bin/env bash
# Smoke-test of the GitHub Gist that stores the Upword account backup.
#
# Confirms, with the same values Render uses, that the token is valid, has the
# gist permission, and can read the backup gist. Read-only: it never writes.
#
# Exit code: 0 if Render will be able to save accounts, != 0 with the reason otherwise.
#
# Usage:
#   ./test_connection.sh
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_PATH="$SCRIPT_DIR/.env"

[ -f "$ENV_PATH" ] || { echo "ERROR: missing $ENV_PATH (cp .env.example .env and fill it)" >&2; exit 1; }

set -a
# shellcheck disable=SC1090
source "$ENV_PATH"
set +a

: "${BACKUP_GITHUB_TOKEN:?BACKUP_GITHUB_TOKEN not set in $ENV_PATH}"
: "${BACKUP_GIST_ID:?BACKUP_GIST_ID not set in $ENV_PATH}"

GIST_ID="$(printf '%s' "$BACKUP_GIST_ID" | grep -oiE '[0-9a-f]{20,}' | head -1 || true)"
[ -n "$GIST_ID" ] || { echo "ERROR: BACKUP_GIST_ID has no gist id. Copy the long code at the end of the gist address." >&2; exit 1; }

AUTH=(-H "Authorization: Bearer ${BACKUP_GITHUB_TOKEN}" -H "Accept: application/vnd.github+json" -H "User-Agent: upword-test")

HEADERS="$(curl -sS -o /dev/null -D - "${AUTH[@]}" https://api.github.com/user)"
STATUS="$(printf '%s' "$HEADERS" | head -1 | awk '{print $2}')"
[ "$STATUS" = "200" ] || { echo "ERROR: GitHub rejected the token (HTTP $STATUS). Create a new classic token with the gist permission." >&2; exit 1; }
SCOPES="$(printf '%s' "$HEADERS" | grep -i '^x-oauth-scopes:' | cut -d: -f2- | tr -d '\r' || true)"
if [ -n "$SCOPES" ] && ! printf '%s' "$SCOPES" | grep -qw gist; then
  echo "ERROR: the token works but lacks the gist permission (scopes:$SCOPES)." >&2; exit 1
fi

BODY="$(curl -sS -w '\n%{http_code}' "${AUTH[@]}" "https://api.github.com/gists/$GIST_ID")"
CODE="$(printf '%s' "$BODY" | tail -1)"
[ "$CODE" = "200" ] || { echo "ERROR: gist $GIST_ID not readable (HTTP $CODE). Check the id and that the token belongs to the gist owner." >&2; exit 1; }

printf '%s' "$BODY" | sed '$d' | node -e '
let s = ""; process.stdin.on("data", (d) => (s += d)).on("end", () => {
  const f = JSON.parse(s).files?.["upword-backup.json"];
  if (!f) { console.error("ERROR: the gist has no file named upword-backup.json"); process.exit(1); }
  let users = 0, songs = 0;
  try { const d = JSON.parse(f.content || "{}"); users = (d.users || []).length; songs = (d.songs || []).length; } catch {}
  console.log(`OK — token and gist work. Backup: ${f.size} bytes, ${users} accounts, ${songs} songs.`);
});'
