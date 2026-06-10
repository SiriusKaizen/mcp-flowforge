import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const templatesDir = path.join(root, "templates");
const examplesDir = path.join(root, "examples");
const forbidden = [/api[_-]?key\s*[:=]\s*[A-Za-z0-9]/i, /bearer\s+[A-Za-z0-9._-]{8,}/i, /xox[baprs]-/i, /gh[pousr]_/i, /sk-[A-Za-z0-9_-]{20,}/i];
const allowedAuthority = new Set(["read-only", "approval-required", "local-automation"]);
const allowedRisk = new Set(["low", "medium", "high"]);

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function validateWorkflow(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  for (const pattern of forbidden) {
    assert(!pattern.test(raw), `${filePath} appears to contain a secret-like value`);
  }

  const workflow = JSON.parse(raw);
  assert(typeof workflow.name === "string" && workflow.name.length > 0, "workflow.name is required");
  assert(Array.isArray(workflow.nodes) && workflow.nodes.length > 0, "workflow.nodes must be non-empty");
  assert(typeof workflow.connections === "object" && workflow.connections !== null, "workflow.connections is required");

  const safety = workflow.metadata?.safety;
  assert(typeof safety === "object" && safety !== null, "workflow.metadata.safety is required");
  assert(allowedAuthority.has(safety.authority), "workflow.metadata.safety.authority is invalid");
  assert(allowedRisk.has(safety.risk), "workflow.metadata.safety.risk is invalid");
  assert(typeof safety.requiredApproval === "boolean", "workflow.metadata.safety.requiredApproval must be boolean");
  assert(typeof safety.dryRunOnly === "boolean", "workflow.metadata.safety.dryRunOnly must be boolean");
  assert(typeof safety.blocksExternalDispatch === "boolean", "workflow.metadata.safety.blocksExternalDispatch must be boolean");
}

function validateExample(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  for (const pattern of forbidden) {
    assert(!pattern.test(raw), `${filePath} appears to contain a secret-like value`);
  }
  const payload = JSON.parse(raw);
  assert(typeof payload === "object" && payload !== null && !Array.isArray(payload), "example payload must be a JSON object");
}

const files = fs
  .readdirSync(templatesDir)
  .filter((name) => name.endsWith(".json"))
  .map((name) => path.join(templatesDir, name));

assert(files.length > 0, "expected at least one template");
for (const file of files) {
  validateWorkflow(file);
}

const examples = fs.existsSync(examplesDir)
  ? fs
      .readdirSync(examplesDir)
      .filter((name) => name.endsWith(".json"))
      .map((name) => path.join(examplesDir, name))
  : [];

for (const file of examples) {
  validateExample(file);
}

console.log(`validated ${files.length} template file(s) and ${examples.length} example payload(s)`);
