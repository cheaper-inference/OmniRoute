# Upstream snapshot — @keak/cheaper-inference-ui-kit

- repo: https://github.com/keak-ai/cheaper-inference-ui-kit
- commit: 7fb92ac7b66ef018132ebf65f052444ad8aa102a
- version: 0.0.89
- upstream-date: 2026-11-04
- synced: 2026-11-04
- license-authorization: Diego Souza (Keak, dono do repositório), 2026-10-19, por escrito na sessão de planejamento: "a licença está ok e da nossa empresa e livre para esse uso" — kit da própria empresa, autorizado para redistribuição neste repositório MIT.

Fonte consumida (sem build): `src/` é cópia byte a byte do commit acima, exceto pela única
transformação do sync: imports relativos perdem o sufixo `.js` (`./button.js` → `./button`).
Para atualizar: `scripts/dev/sync-ui-kit.sh <commit>` (precisa do clone em `_references/`).
Patches locais são proibidos; quando inevitáveis, documentar em PATCHES.md (seção `## <commit>`) e enviar upstream.
