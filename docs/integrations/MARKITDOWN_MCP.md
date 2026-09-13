---
title: "MarkItDown MCP Integration"
version: 3.8.50
lastUpdated: 2026-09-13
---

# MarkItDown MCP Server Integration

> Install and configure the Microsoft MarkItDown MCP server to convert documents, PDFs, images, web pages, and other file types to markdown format.

## Overview

The **MarkItDown MCP server** is a Python-based Model Context Protocol (MCP) server that provides a single tool: `convert_to_markdown(uri)`. It can convert:

- **Documents**: PDF, Word (.docx), PowerPoint (.pptx), Excel (.xlsx)
- **Web pages**: HTML from `http://` and `https://` URIs
- **Images**: PNG, JPG, JPEG, GIF, WebP, BMP (with OCR support via Azure)
- **Local files**: Via `file://` URIs
- **Data URIs**: Embedded data

## Installation

### Prerequisites

- Python ≥ 3.10
- pip (Python package manager)

### Install markitdown-mcp

```bash
pip install markitdown-mcp
```

Verify the installation:

```bash
python3 -m markitdown_mcp --help
```

You should see the help output with options like `--http`, `--host`, `--port`.

## Running the Server

### STDIO Transport (Default)

For IDE integrations (Claude Desktop, Cursor, Cline):

```bash
python3 -m markitdown_mcp
```

### HTTP/SSE Transport

For use with OmniRoute or other HTTP-based MCP clients:

```bash
python3 -m markitdown_mcp --http --host 127.0.0.1 --port 3001
```

This starts an HTTP server at `http://127.0.0.1:3001` with both Streamable HTTP and SSE transports.

## Integration with OmniRoute

### Via MCP Inspector (Testing)

The easiest way to test the markitdown-mcp server is using the MCP Inspector:

```bash
# In one terminal, start the markitdown-mcp HTTP server
python3 -m markitdown_mcp --http --port 3001

# In another terminal, launch the MCP Inspector
npx @modelcontextprotocol/inspector
```

In the Inspector UI:
1. Select **Streamable HTTP** as the transport type
2. Enter `http://127.0.0.1:3001/mcp` as the URL
3. Click **Connect**
4. Navigate to the **Tools** tab
5. Click **List Tools** to see `convert_to_markdown`
6. Test the tool by providing a URI (e.g., `https://example.com`, `file:///path/to/file.pdf`)

### Via Claude Desktop

Edit your `claude_desktop_config.json` to use the STDIO transport:

**macOS/Linux:** `~/.claude/claude_desktop_config.json`  
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "markitdown": {
      "command": "python3",
      "args": ["-m", "markitdown_mcp"]
    }
  }
}
```

Restart Claude Desktop and the tool will be available.

### Via Docker

Build and run the Docker image:

```bash
# Clone the Microsoft markitdown repository
git clone https://github.com/microsoft/markitdown.git
cd markitdown/packages/markitdown-mcp

# Build the Docker image
docker build -t markitdown-mcp:latest .

# Run the server
docker run -it --rm markitdown-mcp:latest
```

To mount local files:

```bash
docker run -it --rm -v /home/user/documents:/workdir markitdown-mcp:latest
```

Then reference files as `file:///workdir/filename.pdf`.

## Security Considerations

The markitdown-mcp server:

- **Does not support authentication** — runs with the privileges of the user executing it
- **Has unrestricted file access** — can read any file accessible to the user running the server
- **Can make network requests** — can fetch any URL from the network
- **Should run locally only** — binds to `127.0.0.1` by default, do NOT bind to `0.0.0.0` unless you understand the security implications

### Best Practices

1. **Run in a restricted environment** — use a dedicated user account with minimal permissions
2. **Use containers** — run in Docker with limited mounts and network access
3. **Limit scope** — restrict input URIs to trusted sources (e.g., internal documents only)
4. **Monitor execution** — log and audit all conversions in production use

## Supported URIs

### HTTP/HTTPS

```
https://example.com/document.pdf
https://docs.microsoft.com/en-us/windows/windows-11/
```

### File (Local)

```
file:///home/user/documents/report.docx
file:///Users/jane/Downloads/presentation.pptx
file://C:\\Users\\User\\Documents\\spreadsheet.xlsx  (Windows)
```

### Data URIs

```
data:text/plain;base64,SGVsbG8gV29ybGQ=
```

## Tool Input/Output

### Input

```json
{
  "uri": "https://example.com/document.pdf"
}
```

### Output (Success)

```json
{
  "markdown": "# Document Title\n\nContent converted to markdown...",
  "uri": "https://example.com/document.pdf"
}
```

### Output (Error)

```json
{
  "error": "Failed to fetch resource: 404 Not Found",
  "uri": "https://example.com/missing.pdf"
}
```

## Environment Variables

Configure markitdown-mcp behavior via environment variables:

### Azure Document Intelligence (Optional)

For enhanced OCR on documents and images:

```bash
export AZURE_ENDPOINT="https://your-resource.cognitiveservices.azure.com/"
export AZURE_API_KEY="your-api-key"
```

### Proxy Configuration

```bash
export HTTP_PROXY="http://proxy.example.com:8080"
export HTTPS_PROXY="http://proxy.example.com:8080"
export NO_PROXY="localhost,127.0.0.1"
```

## Troubleshooting

### Module not found error

If you see `ModuleNotFoundError: No module named 'markitdown_mcp'`:

```bash
# Ensure the package is installed
pip3 install markitdown-mcp

# Try using the full path to Python
python3 -m markitdown_mcp --help
```

### Cryptography/CFFI errors

If you encounter cryptography-related errors:

```bash
# Install build dependencies
pip3 install --upgrade cffi cryptography

# Or create a fresh virtual environment
python3 -m venv markitdown-env
source markitdown-env/bin/activate
pip install markitdown-mcp
python3 -m markitdown_mcp --http
```

### Network/Firewall issues

If the server cannot fetch remote URLs:

1. Check your network connectivity: `curl https://example.com`
2. Verify proxy settings (see Environment Variables section)
3. Check firewall rules and corporate proxies

### File access denied

If the server cannot read local files:

1. Verify the file path is correct and the file exists: `ls -la /path/to/file`
2. Check file permissions: `chmod 644 /path/to/file`
3. Ensure the server is running with a user that has read access

## Performance Tuning

### Timeout Configuration

The default timeout for document conversion is **30 seconds**. For large files, increase it:

```bash
# Run with custom timeout (in seconds)
python3 -m markitdown_mcp --timeout 120 --http
```

### Memory Usage

Large PDF conversions can consume significant memory. If you encounter out-of-memory errors:

1. Process files one at a time (avoid parallel batch conversions)
2. Use Python's memory limits: `python3 -m markitdown_mcp --max-memory 2G`
3. Run in a container with memory constraints

## Examples

### Convert a PDF to Markdown

```bash
curl -X POST http://127.0.0.1:3001/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "convert_to_markdown",
      "arguments": {
        "uri": "https://example.com/whitepaper.pdf"
      }
    }
  }'
```

### Convert an Image with OCR

```bash
curl -X POST http://127.0.0.1:3001/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "convert_to_markdown",
      "arguments": {
        "uri": "file:///home/user/screenshot.png"
      }
    }
  }'
```

### Convert a Web Page

```bash
curl -X POST http://127.0.0.1:3001/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "convert_to_markdown",
      "arguments": {
        "uri": "https://docs.python.org/3/library/asyncio.html"
      }
    }
  }'
```

## References

- **Microsoft MarkItDown Repository**: https://github.com/microsoft/markitdown
- **MarkItDown MCP Package**: https://github.com/microsoft/markitdown/tree/main/packages/markitdown-mcp
- **MCP Protocol**: https://modelcontextprotocol.io/
- **MCP Inspector**: https://github.com/modelcontextprotocol/inspector

## Support

For issues with markitdown-mcp:

- **GitHub Issues**: https://github.com/microsoft/markitdown/issues
- **PyPI Package**: https://pypi.org/project/markitdown-mcp/

For OmniRoute integration questions, refer to the main OmniRoute documentation at `docs/frameworks/MCP-SERVER.md`.
