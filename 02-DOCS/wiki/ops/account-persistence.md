# Account persistence on Render Free

**Problem.** Render Free has no persistent disk: the SQLite file in `/tmp` is erased on every deploy and every time the instance sleeps (~15 min idle). Accounts, progress, writing and songs vanished.

**Design.** `server/backup.js` mirrors all 7 tables (users, sessions, progress, activity, mistakes, writing_entries, songs) into a secret GitHub Gist (`upword-backup.json`): restore on boot when the DB is empty, save ~15 s after any write, on SIGTERM/SIGINT, and once at boot as a write check. Writes are refused (503) until the restore succeeds, so an empty DB never overwrites the backup.

**Diagnosis 2026-10-29.** The gist was still `{}` (4 bytes) with only manual revisions: the server had never written it. Most likely `BACKUP_GIST_ID` held the URL fragment `gist.github.com/RaggioIl48/` without the id, or the token was changed. Fixes: the server now extracts the id from a pasted URL, explains 401/403/404 in plain words, shows a warning in Profile and in `/api/health` (`backup.problem`). Tool: `01-TOOLS/GITHUB_GIST/test_connection.sh`.

**Alternatives considered.** A hosted database (Turso/libSQL, Neon or Supabase Postgres) would survive without the gist but needs another account and an async rewrite of every query; kept as the next step if the gist ever hits its limits (~1 MB per file read through the API is handled via `raw_url`).

**Exact diagnosis 2026-10-29 (REA browser capture of the live app, nevergiveup-2.onrender.com).**
- `/api/health` → `{"enabled":true,"ready":true,"lastSavedAt":null,"lastError":"save: Gist 404"}`. A harmless `POST /api/logout` triggered a save 15 s later: GitHub answered 404 to the write while the boot read had succeeded. So the gist id is right; the token can read the gist but cannot write it (classic token without the `gist` scope, fine-grained token without Gists: write, or a token from another account). Every restart then restored `{}` and wiped the accounts.
- `/api/define` → 404: Render was still running commit 2872e84 or older; the push of 2f716ce never deployed, although the same Docker image builds and boots locally. Auto-deploy is off or the deploy was not triggered.
- Fix: classic token, scope `gist` only, from the account that owns the gist → Render `BACKUP_GITHUB_TOKEN`; then Manual Deploy → Deploy latest commit and turn Auto-Deploy on. Check `/api/health`: `lastSavedAt` must get a time and the gist must grow beyond 4 bytes.
