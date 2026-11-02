# Cinematic UI — Claude Code plugin

A Claude Code plugin that packages the [`cinematic-ui`](https://github.com/akseolabs-seo/cinematic-ui)
skill by akseolabs-seo (MIT). The skill designs websites the way a film director plans a film. It
picks a real director and film, researches the film's visual language, writes that research into
`decisions.md`, `storyboard.md` and `compiled-spec.md`, and then builds HTML, CSS and JS from the
spec.

## Install

From this repository's marketplace, which is declared in [`/.claude-plugin/marketplace.json`](../../../.claude-plugin/marketplace.json):

```bash
claude plugin marketplace add shahass92-commits/omniroute --sparse .claude-plugin contrib/claude-plugins
claude plugin install cinematic-ui@shahass92-plugins
```

`--sparse` limits the checkout to the repository's top-level files plus `.claude-plugin/` and
`contrib/claude-plugins/`, about 20 MB instead of the whole OmniRoute tree. To install from a
branch other than the default one, append `#<branch>` to the repository, for example
`shahass92-commits/omniroute#my-branch`. Inside a Claude Code session, the same commands are
`/plugin marketplace add …` and `/plugin install …`.

To try the plugin from a local checkout for one session without installing it:

```bash
claude --plugin-dir contrib/claude-plugins/cinematic-ui
```

## Use

Run the skill directly:

```text
/cinematic-ui:cinematic-ui
```

Claude also loads the skill on its own when you ask for a cinematic, film-inspired or
director-inspired website. Upstream suggests this prompt:

```text
Use cinematic-ui to build a homepage.
Pick the director and film yourself.
Research the director and film first if web access is available.
Run the Demo Uniqueness Protocol.
Do not reuse shells from previous demos.
```

The skill always starts with a short questionnaire: how to start (screenshot, step-by-step or
surprise me), whether to include image placeholders, and the site's niche and page list. It then
works through four phases:

| Phase | Output                                                          |
| ----- | --------------------------------------------------------------- |
| 1     | `decisions.md`: director, film, research, uniqueness audit      |
| 2     | `storyboard.md`: site grammar, per-page scenes and compositions |
| 3     | `compiled-spec.md`: CSS, JS and library ids for every section   |
| 4     | HTML, CSS and JS, checked against the spec                      |

The working files and the build go into your project. The reference library stays in the plugin.

## Contents

```text
cinematic-ui/
├── .claude-plugin/plugin.json   manifest; "skills": ["./"] makes this folder the skill
├── SKILL.md                     workflow, phases and hard rules
├── references/                  rule files and 18 data libraries, loaded per phase
│   └── data/                    directors, archetypes, motion, color, type, 1,486-site DNA index
├── LICENSE                      upstream MIT license
└── README.md
```

Adding the plugin costs about 170 tokens per session for the skill description. Each run of the
skill loads about 6k tokens for `SKILL.md`, plus whichever reference files the current phase reads.

## Changes from upstream

This plugin is built from upstream commit
[`24a66c1`](https://github.com/akseolabs-seo/cinematic-ui/tree/24a66c1d6140c21ec0d0e4d9ef663a97264003de).

- `references/` and `LICENSE` are copied unchanged.
- In `SKILL.md`, the "Primary Platforms" section (manual install paths and links to other tools'
  files) is replaced by "Plugin Notes". That section tells Claude to read `references/` from
  `${CLAUDE_SKILL_DIR}`, to write the working files into the user's project, and to pin exact
  versions for CDN libraries. The rest of `SKILL.md` is unchanged.
- Files for other agents (`CODEX.md`, `GEMINI.md`, `AGENTS.md`, Cursor, Windsurf and Copilot
  rules), `skill.json`, `agents/openai.yaml`, the translated READMEs and `docs/` (banner and a
  3.7 MB demo video) are not included.

## Updating from upstream

1. Clone upstream at the commit you want and compare it with this folder:
   `diff -r <upstream>/references references` and `diff <upstream>/SKILL.md SKILL.md`.
2. Copy over `references/` and `SKILL.md`, then restore the "Plugin Notes" section in place of
   "Primary Platforms".
3. Review the incoming text before committing. Claude follows `SKILL.md` and the reference files as
   instructions.
4. Bump `version` in `.claude-plugin/plugin.json` and in the root `.claude-plugin/marketplace.json`,
   and update the commit link above.
5. Run `claude plugin validate --strict contrib/claude-plugins/cinematic-ui` and
   `claude plugin validate --strict .` from the repository root.

## License

MIT. The skill content is by akseolabs-seo; see [LICENSE](LICENSE).
