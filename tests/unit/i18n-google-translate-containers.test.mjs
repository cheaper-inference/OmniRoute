import assert from "node:assert/strict";
import test from "node:test";
import { translateMarkdownWithGoogle } from "../../scripts/i18n/lib/google-translate.mjs";

// Code is never sent to transport; prose following its enclosing container is.
const examples = [
  [
    "list then quote indented code on the first line",
    '- >     console.log("code");\n  >     next();\n\nOuter prose.',
    ["Outer prose."],
  ],
  [
    "quote then list indented code preserves marker padding",
    '> -     console.log("code");\n>       next();\n>\n> Outer prose.',
    ["Outer prose."],
  ],
  [
    "quote then ordered list fence retains its marker width",
    '> 12. ```js\n>     console.log("code");\n>     ```\n>\n> Outer prose.',
    ["Outer prose."],
  ],
  [
    "independent list then quote fence reproduction",
    '- > ```js\n  > const message = "preserve code";\n  > console.log(message);\n  > ```',
    [],
  ],
  [
    "list then quote fenced code with literal markers and prose exit",
    "- > ```text\n  > - literal list marker\n  > > literal quote marker\n  > ```\n\nOutside prose.",
    ["Outside prose."],
  ],
  [
    "quote then list fenced code with literal markers and prose exit",
    "> - ```text\n>   - literal list marker\n>   > literal quote marker\n>   ```\n>\n> Outside prose.",
    ["Outside prose."],
  ],
  [
    "list then quote indented code and prose exit",
    "- > Intro prose.\n  >\n  >     - literal list marker\n  >     > literal quote marker\n\nOutside prose.",
    ["Intro prose.", "Outside prose."],
  ],
  [
    "quote then list indented code and prose exit",
    "> - Intro prose.\n>\n>       - literal list marker\n>       > literal quote marker\n>\n> Outside prose.",
    ["Intro prose.", "Outside prose."],
  ],
  [
    "an unclosed list then quote fence releases outer prose",
    "- > ```js\n  > const keep = true;\n\nOutside prose.",
    ["Outside prose."],
  ],
  [
    "an unclosed quote then list fence releases outer quote prose",
    "> - ```js\n>   const keep = true;\n>\n> Outside prose.",
    ["Outside prose."],
  ],
  [
    "indented root code contains literal mixed container markers",
    '    - > ```js\n    > - console.log("keep code");',
    [],
  ],
];

for (const [name, source, expectedProse] of examples) {
  test(name, async () => {
    const submitted = [];
    const fetchImpl = async (_url, init) => {
      const q = new URLSearchParams(init.body).getAll("q");
      submitted.push(...q);
      return { ok: true, status: 200, json: async () => q };
    };
    const output = await translateMarkdownWithGoogle(source, "es", { fetchImpl });
    assert.equal(output, source);
    assert.deepEqual(submitted, expectedProse);
  });
}
