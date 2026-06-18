# Contributing

Thanks for helping improve mcp-flowforge.

## Local Setup

This project uses Node.js and the built-in validation script.

```bash
npm test
node mock/mcp-webhook-server.mjs
```

## Contribution Guidelines

- Keep templates dry-run or approval-gated by default.
- Use placeholders only. Do not commit live credentials, tokens, production webhook URLs, or private routing details.
- Add or update example payloads when template behavior changes.
- Run `npm test` before opening a pull request.

## Useful Areas

- More safe starter templates for local automation.
- Stronger metadata validation for risk and approval fields.
- Docker Compose examples for local mock testing.
- Additional mock payloads for webhook and MCP-style workflows.
