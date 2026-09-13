---
title: "OmniRoute Integrations"
version: 3.8.50
lastUpdated: 2026-09-13
---

# OmniRoute Integrations

This directory contains documentation and configuration for integrating external services and tools with OmniRoute.

## Available Integrations

### MarkItDown MCP Server

Convert documents, PDFs, images, and web pages to markdown using the Microsoft MarkItDown MCP server.

- **Status**: ✅ Available
- **Type**: External Python MCP Server
- **Documentation**: [MARKITDOWN_MCP.md](./MARKITDOWN_MCP.md)
- **Quick Start**:
  ```bash
  pip install markitdown-mcp
  npm run mcp:markitdown:http
  ```

## Adding New Integrations

To add a new external MCP server integration:

1. **Create documentation** in this directory (e.g., `YOUR_SERVICE_MCP.md`)
2. **Add launch scripts** in `scripts/integrations/` (both `.sh` and `.mjs` versions)
3. **Add npm scripts** in `package.json` for easy launching
4. **Add requirements** file if using Python (e.g., `requirements-your-service.txt`)
5. **Update this README** with a link to the new integration

### Documentation Template

```markdown
---
title: "Your Service MCP Integration"
version: X.Y.Z
lastUpdated: YYYY-MM-DD
---

# Your Service MCP Server Integration

> Brief description of what the service does.

## Installation

Installation instructions with package manager (pip/npm/cargo/etc).

## Running the Server

How to start the MCP server (STDIO and HTTP transports).

## Integration with OmniRoute

How to use the service with OmniRoute (if applicable).

...
```

## Best Practices

1. **Use stdio transport by default** for IDE integration (Claude Desktop, Cursor, Cline)
2. **Support HTTP transport** for testing with MCP Inspector
3. **Document security implications** and best practices
4. **Provide launch scripts** in both Bash and Node.js
5. **Include troubleshooting** section in documentation
6. **Test with MCP Inspector** before documenting

## Resources

- [Model Context Protocol (MCP)](https://modelcontextprotocol.io/)
- [MCP Inspector](https://github.com/modelcontextprotocol/inspector)
- [OmniRoute MCP Server Documentation](../frameworks/MCP-SERVER.md)

## Support

For issues with specific integrations, refer to the integration's documentation or the upstream project's repository.
