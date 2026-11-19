# Patches locais

Formato: `## <commit do snapshot>` + diff + link da PR upstream. Cada seção vale para o snapshot
fixado em `UPSTREAM.md`; ao sincronizar um commit novo, reaplicar o patch (ou removê-lo se o
upstream já trouxer a correção) e renomear a seção para o novo commit.

## 33891c6ec1738ec1e4682130c7911c54e67a4b22

### `src/checkbox.tsx` — Checkbox sem label envolve o controle num `<label htmlFor>`

- OmniRoute: PR #19961 (@LazyGatto), base `release/v3.8.55`.
- Motivo: o ramo "bare" do `Checkbox` (sem `label`/`description`/`card`, usado em layouts
  próprios) devolvia só `cloneElement(control)`, sem `<label htmlFor>`. O `<input>` nativo é um
  elemento absoluto de 1px com `opacity: 0` e o que o usuário vê e clica é o `.ci-checkbox__box`
  decorativo; sem associação de label, o clique na caixa nunca chega ao input. Desde a v3.8.53
  (migração de `/dashboard/api-manager` para o kit, KEA-7886: commits `25e0ffcdb2` e
  `22e38cc2b5`), o checkbox que seleciona um provider inteiro no editor de API key (listas Models
  e Connections) não respondia ao clique.
- Efeito: o controle bare passa a ser `<label htmlFor={inputId}>` + `.ci-checkbox__control`; o
  `className` continua no `.ci-checkbox__control` e não há `.ci-checkbox__text`. Os ramos com
  `label`/`description`/`card` não mudam.
- Testes: `tests/unit/ui/checkbox-bare-click.test.tsx` e
  `tests/unit/ui/adapters/textarea-checkbox.test.tsx`.
- upstream: pending — to be proposed to the Keak CI UI Kit (o `checkbox.tsx` do upstream continua
  sem a correção até a tag `v0.37.0`).

```diff
--- a/src/checkbox.tsx
+++ b/src/checkbox.tsx
@@ -144,9 +144,18 @@

     // No label/description/card → just the control, for custom layouts.
     if (label == null && description == null && !card) {
-      return cloneElement(control, {
-        className: cn("ci-checkbox__control", className),
-      });
+      // Wrap the bare control in a label: the decorative box renders above the
+      // native input, so without an explicit htmlFor association only a direct
+      // hit on the input toggles it and clicks on the visible box are swallowed.
+      // That made every bare checkbox dead in custom layouts (dashboard
+      // provider/model selection stopped responding in v3.8.53).
+      return (
+        <label htmlFor={inputId}>
+          {cloneElement(control, {
+            className: cn("ci-checkbox__control", className),
+          })}
+        </label>
+      );
     }

     const text = (label != null || description != null) && (
```
