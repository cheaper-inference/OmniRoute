#!/usr/bin/env node
/**
 * Launch the MarkItDown MCP Server for use with OmniRoute
 *
 * Usage:
 *   node scripts/integrations/launch-markitdown-mcp.mjs [--http] [--port PORT]
 *
 * Defaults to STDIO transport for IDE integration.
 * Use --http to enable HTTP/SSE transport for OmniRoute integration.
 */

import { spawn, execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Colors for terminal output
const colors = {
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  reset: "\x1b[0m",
};

function log(color, ...args) {
  console.log(`${color}${args.join(" ")}${colors.reset}`);
}

// Parse command-line arguments
let useHttp = false;
let port = 3001;
let pythonCmd = "python3";

for (let i = 2; i < process.argv.length; i++) {
  const arg = process.argv[i];
  if (arg === "--http") {
    useHttp = true;
  } else if (arg === "--port") {
    port = parseInt(process.argv[++i], 10);
  } else if (arg === "--python") {
    pythonCmd = process.argv[++i];
  } else if (arg === "--help") {
    console.log(`
Usage: node scripts/integrations/launch-markitdown-mcp.mjs [options]

Options:
  --http              Enable HTTP/SSE transport (default: STDIO)
  --port PORT         HTTP server port (default: 3001)
  --python PYTHON_CMD Python executable (default: python3)
  --help              Show this help message
`);
    process.exit(0);
  }
}

// Check if markitdown-mcp is installed
log(colors.yellow, "Checking markitdown-mcp installation...");
try {
  execSync(`${pythonCmd} -m markitdown_mcp --help`, {
    stdio: "pipe",
  });
} catch (error) {
  log(colors.red, "Error: markitdown-mcp is not installed.");
  console.log("Install it with: pip3 install markitdown-mcp");
  process.exit(1);
}
log(colors.green, "✓ markitdown-mcp is installed");

// Build command arguments
const args = [];
if (useHttp) {
  args.push("--http");
  args.push("--host");
  args.push("127.0.0.1");
  args.push("--port");
  args.push(String(port));
}

// Start the server
const server = spawn(pythonCmd, ["-m", "markitdown_mcp", ...args], {
  stdio: "inherit",
  shell: true,
});

// Handle process signals
process.on("SIGINT", () => {
  log(colors.yellow, "\nShutting down MarkItDown MCP Server...");
  server.kill("SIGINT");
  process.exit(0);
});

process.on("SIGTERM", () => {
  server.kill("SIGTERM");
  process.exit(0);
});

// Print startup information
if (useHttp) {
  log(colors.green, "Starting MarkItDown MCP Server (HTTP transport)");
  log(colors.yellow, `Listening on http://127.0.0.1:${port}`);
  console.log("\nEndpoints:");
  console.log(`  - Streamable HTTP: http://127.0.0.1:${port}/mcp`);
  console.log(`  - SSE: http://127.0.0.1:${port}/sse`);
  console.log("\nTo test, use MCP Inspector:");
  console.log("  npx @modelcontextprotocol/inspector");
} else {
  log(colors.green, "Starting MarkItDown MCP Server (STDIO transport)");
  console.log("Use this for IDE integrations (Claude Desktop, Cursor, Cline)");
}
console.log("");

// Handle server exit
server.on("close", (code) => {
  if (code !== 0) {
    log(colors.red, `Server exited with code ${code}`);
  }
  process.exit(code || 0);
});
