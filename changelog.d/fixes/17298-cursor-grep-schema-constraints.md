- **fix(cursor):** bridge Cursor's native Grep to a declared tool whose `pattern` carries
  `minLength`/`maxLength`. The bridge only accepted a bare `{ type: "string" }` property, so a real
  MCP grep tool (`pattern: { type: "string", minLength: 1 }`) was discarded and every Cursor Grep
  ended in the fail-closed rejection "Tool not available in this environment". `selectProperty`
  now receives the literal it is about to send and `propertyAcceptsString` validates the bounds
  against it; bounds the value violates, and any validation keyword the bridge does not implement
  (`pattern`, `format`, `$ref`, …), still fail closed.
