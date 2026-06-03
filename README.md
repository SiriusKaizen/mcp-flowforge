# mcp-flowforge

Safe starter templates for n8n, MCP-style webhooks, and local automation flows.

## What it does

- Provides a minimal n8n webhook workflow template.
- Includes a local mock MCP webhook receiver.
- Ships a validation script for template JSON.
- Keeps secrets out of example files.

## Status

Early template kit. The goal is to make a small safe starting point for local AI automation operators.

## Quick Start

```bash
node scripts/validate-templates.mjs
node mock/mcp-webhook-server.mjs
```

Send a local test payload:

```bash
curl -sS http://127.0.0.1:8787/mcp-flowforge-demo \
  -H 'content-type: application/json' \
  -d '{"intent":"demo"}'
```

## Safety

Templates use placeholder values only. Do not commit live credentials, bot tokens, OAuth files, or production webhook secrets.

## License

MIT
