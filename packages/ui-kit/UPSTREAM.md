# Upstream snapshot — @keak/cheaper-inference-ui-kit

- repo: https://github.com/keak-ai/cheaper-inference-ui-kit
- commit: 3b6ba896b87d54daa2e44aba86e6d92235e1a127
- version: 0.0.66
- upstream-date: 2026-10-27
- synced: 2026-10-28
- license-authorization: Diego Souza (Keak, dono do repositório), 2026-10-19, por escrito na sessão de planejamento: "a licença está ok e da nossa empresa e livre para esse uso" — kit da própria empresa, autorizado para redistribuição neste repositório MIT.

Fonte consumida (sem build): `src/` é cópia byte a byte do commit acima, exceto pela única
transformação do sync: imports relativos perdem o sufixo `.js` (`./button.js` → `./button`).
Para atualizar: `scripts/dev/sync-ui-kit.sh <commit>` (precisa do clone em `_references/`).
Patches locais são proibidos; quando inevitáveis, documentar em PATCHES.md (seção `## <commit>`) e enviar upstream.
