#!/bin/bash
# Launch the MarkItDown MCP Server for use with OmniRoute
#
# Usage:
#   ./scripts/integrations/launch-markitdown-mcp.sh [--http] [--port PORT]
#
# Defaults to STDIO transport for IDE integration.
# Use --http to enable HTTP/SSE transport for OmniRoute integration.

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
PYTHON_CMD="${PYTHON_CMD:-python3}"
MCP_PORT=3001
USE_HTTP=false

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --http)
      USE_HTTP=true
      shift
      ;;
    --port)
      MCP_PORT="$2"
      shift 2
      ;;
    --python)
      PYTHON_CMD="$2"
      shift 2
      ;;
    --help)
      echo "Usage: $0 [--http] [--port PORT] [--python PYTHON_CMD] [--help]"
      echo ""
      echo "Options:"
      echo "  --http              Enable HTTP/SSE transport (default: STDIO)"
      echo "  --port PORT         HTTP server port (default: 3001)"
      echo "  --python PYTHON_CMD Python executable (default: python3)"
      echo "  --help              Show this help message"
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
done

# Check if markitdown-mcp is installed
echo -e "${YELLOW}Checking markitdown-mcp installation...${NC}"
if ! $PYTHON_CMD -m markitdown_mcp --help >/dev/null 2>&1; then
  echo -e "${RED}Error: markitdown-mcp is not installed.${NC}"
  echo "Install it with: pip3 install markitdown-mcp"
  exit 1
fi
echo -e "${GREEN}✓ markitdown-mcp is installed${NC}"

# Start the server
if [ "$USE_HTTP" = true ]; then
  echo -e "${GREEN}Starting MarkItDown MCP Server (HTTP transport)${NC}"
  echo -e "${YELLOW}Listening on http://127.0.0.1:${MCP_PORT}${NC}"
  echo ""
  echo "Endpoints:"
  echo "  - Streamable HTTP: http://127.0.0.1:${MCP_PORT}/mcp"
  echo "  - SSE: http://127.0.0.1:${MCP_PORT}/sse"
  echo ""
  echo "To test, use MCP Inspector:"
  echo "  npx @modelcontextprotocol/inspector"
  echo ""
  $PYTHON_CMD -m markitdown_mcp --http --host 127.0.0.1 --port $MCP_PORT
else
  echo -e "${GREEN}Starting MarkItDown MCP Server (STDIO transport)${NC}"
  echo "Use this for IDE integrations (Claude Desktop, Cursor, Cline)"
  echo ""
  $PYTHON_CMD -m markitdown_mcp
fi
