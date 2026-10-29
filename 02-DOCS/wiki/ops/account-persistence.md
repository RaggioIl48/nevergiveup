# Account persistence on Render Free

**Problem.** Render Free has no persistent disk: the SQLite file in `/tmp` is erased on every deploy and every time the instance sleeps (~15 min idle). Accounts, progress, writing and songs vanished.

**Design.** `server/backup.js` mirrors all 7 tables (users, sessions, progress, activity, mistakes, writing_entries, songs) into a secret GitHub Gist (`upword-backup.json`): restore on boot when the DB is empty, save ~15 s after any write, on SIGTERM/SIGINT, and once at boot as a write check. Writes are refused (503) until the restore succeeds, so an empty DB never overwrites the backup.

**Diagnosis 2026-10-29.** The gist was still `{}` (4 bytes) with only manual revisions: the server had never written it. Most likely `BACKUP_GIST_ID` held the URL fragment `gist.github.com/RaggioIl48/` without the id, or the token was changed. Fixes: the server now extracts the id from a pasted URL, explains 401/403/404 in plain words, shows a warning in Profile and in `/api/health` (`backup.problem`). Tool: `01-TOOLS/GITHUB_GIST/test_connection.sh`.

**Alternatives considered.** A hosted database (Turso/libSQL, Neon or Supabase Postgres) would survive without the gist but needs another account and an async rewrite of every query; kept as the next step if the gist ever hits its limits (~1 MB per file read through the API is handled via `raw_url`).
