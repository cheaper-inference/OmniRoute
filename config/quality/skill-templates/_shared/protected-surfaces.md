# Protected instruction surfaces: explicit admission

Agent instructions can cause code execution and repository mutations in future
sessions. CI and favorable code review do not establish the intent or authority
of an instruction change.

## Identify the surface

Before admission, list the exact PR files and inspect the relevant hunks. Treat
the following as protected:

- AGENTS.md, CLAUDE.md and GEMINI.md, at any depth.
- .agents/** and .claude/**.
- config/quality/skill-templates/** and published skills/**/SKILL.md.
- llm.txt and its translated mirrors.
- Copilot, Cursor or other files whose purpose is to instruct an assistant.

Analysis and preparation may proceed within the requested scope. Record
protected_surface: true and show the exact instruction changes to the owner.

## Obtain the specific decision

Hold the merge until the owner has approved this PR's protected-surface change.
A batch approval, green check, star rating or permission to edit instructions
does not replace that decision. A later material instruction change needs a
renewed review of the changed hunks.

Owner-authored work may be prepared in the owner's session under the requested
task. Its actual landing still follows the authorization and current-candidate
requirements in merge-gates.md. This document grants no merge, trust-approval,
external execution or administrative bypass authority.
