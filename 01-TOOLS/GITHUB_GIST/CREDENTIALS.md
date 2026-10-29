# Credentials — GITHUB_GIST

## Provider dashboard

- Gist: https://gist.github.com/RaggioIl48 → `upword-backup.json` (secret)
- Token: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)

## Variables

| Variable | Type | Where to generate | Rotation |
|----------|------|-------------------|----------|
| `BACKUP_GITHUB_TOKEN` | secret | Tokens (classic) → Generate new token → scope **gist** only, No expiration | If it leaks; then update Render and redeploy |
| `BACKUP_GIST_ID` | id | The long code at the end of the gist address | Never |

## If a credential leaks

1. Delete the token in GitHub (Tokens classic).
2. Generate a new one with only the `gist` scope and update `.env`.
3. Update `BACKUP_GITHUB_TOKEN` in Render → Environment → Save, rebuild and deploy.
4. Log the incident here.

## Incidents

- 2026-10-28: token and Groq key visible in a screenshot shared in a chat session; rotation recommended.
