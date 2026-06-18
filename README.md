# mcp-flowforge

Safe starter templates for n8n, MCP-style webhooks, and local automation flows.

## What it does

- Provides a minimal n8n webhook workflow template.
- Includes a local mock MCP webhook receiver.
- Ships a validation script for template JSON.
- Keeps secrets out of example files.
- Adds safety metadata for authority, risk, approval, dry-run status, and external dispatch blocking.

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
  --data @examples/demo-payload.json
```

## Safety

Templates use placeholder values only. Do not commit live credentials, bot tokens, OAuth files, or production webhook secrets.

The approval-gated starter intentionally stops at a mock response. Use it as a pattern for workflows where a human must review the request before a real MCP tool, provider call, message send, or writeback runs.

## Real-World Use Case

This project is for people prototyping local automation flows that connect webhooks, n8n, and MCP-style tools. The templates favor dry-run behavior, explicit approval gates, and placeholder-only examples so a maintainer can test workflow shape before connecting real credentials or external actions.

## License

MIT
