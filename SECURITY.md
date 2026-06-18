# Security Policy

mcp-flowforge is a starter template kit for local automation flows. It should not include real secrets or production endpoints.

## Supported Scope

Templates must use placeholder data, dry-run behavior, and explicit approval gates where a workflow could later connect to a real MCP tool, provider call, message send, or writeback.

## Reporting a Security Issue

Please open a GitHub issue with a minimal template or payload that demonstrates the risk. Remove real credentials, webhook URLs, private routes, and production identifiers before sharing.

## Maintainer Notes

- Keep sample workflows safe to inspect.
- Treat accidental credential or endpoint exposure as a bug.
- Prefer mock receivers and explicit human approval before real external actions.
