import http from "node:http";

const host = process.env.MCP_FLOWFORGE_HOST || "127.0.0.1";
const port = Number(process.env.MCP_FLOWFORGE_PORT || 8787);

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.setEncoding("utf8");
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1024 * 64) {
        reject(new Error("request body too large"));
      }
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

const server = http.createServer(async (request, response) => {
  if (request.method !== "POST" || request.url !== "/mcp-flowforge-demo") {
    response.writeHead(404, { "content-type": "application/json" });
    response.end(JSON.stringify({ ok: false, error: "not_found" }));
    return;
  }

  try {
    const body = await readBody(request);
    const parsed = body ? JSON.parse(body) : {};
    response.writeHead(200, { "content-type": "application/json" });
    response.end(
      JSON.stringify({
        ok: true,
        receivedAt: new Date().toISOString(),
        safeEcho: parsed.intent || "demo"
      })
    );
  } catch (error) {
    response.writeHead(400, { "content-type": "application/json" });
    response.end(JSON.stringify({ ok: false, error: error.message }));
  }
});

server.listen(port, host, () => {
  console.log(`mcp-flowforge mock listening on http://${host}:${port}/mcp-flowforge-demo`);
});
