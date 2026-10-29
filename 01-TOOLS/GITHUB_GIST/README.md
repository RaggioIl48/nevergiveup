# GITHUB_GIST

> Private GitHub Gist that holds the JSON backup of every account, progress, writing entry and song, because Render Free wipes the disk on each deploy or sleep.

## When to use

Before (or after) changing `BACKUP_GITHUB_TOKEN` / `BACKUP_GIST_ID` in Render, to prove the values work. If this script fails, Render cannot save accounts either.

## Setup

1. `cp .env.example .env && chmod 600 .env`
2. Paste the same two values you use in Render (see `CREDENTIALS.md`).
3. `./test_connection.sh` should end with `OK — token and gist work. Backup: … accounts, … songs.`

## Scripts

| Script | What it does | Example |
|--------|--------------|---------|
| `test_connection.sh` | Read-only check: token valid, has `gist` scope, gist readable; prints accounts and songs in the backup. Needs `curl` and `node`. | `./test_connection.sh` |

## Operational notes

- The live server reports the same thing at `https://<your-app>.onrender.com/api/health` (`backup.problem` is null when all is well) and in the app under Profile.
- The server writes the gist once at boot and ~15 s after every change. A backup of `{}` (4 bytes) means the server has never saved.
