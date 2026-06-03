# Security Checklist

Use this checklist before publishing or importing a workflow.

- Replace placeholder URLs only in your local n8n instance or secret manager.
- Keep API keys, bot tokens, OAuth files, cookies, and webhook signing secrets out of Git.
- Use environment variables or your automation platform's credential store.
- Keep example payloads synthetic.
- Validate templates before committing:

```bash
node scripts/validate-templates.mjs
```

- Review exported n8n workflow JSON before sharing it publicly.
