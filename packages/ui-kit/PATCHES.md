# Patches locais

## deb522b9ba5206c69c4604085e214660a607e652

Snapshot 0.0.84. O kit é escrito contra o recharts 2.x; o OmniRoute usa o recharts 3.x, cujo
`Payload` do `DefaultTooltipContent` exige `graphicalItemId: string`. O tooltip de teclado do
`StackedBarChart` monta entradas sintéticas sem esse campo, o que dá TS2322 no gate
`check:build-typecheck` (introduzido pela #18603) e deixava o tip de `release/v3.8.53` vermelho.
O campo recebe a chave da série; em runtime ele só identifica a entrada.

```diff
--- a/packages/ui-kit/src/reporting-charts.tsx
+++ b/packages/ui-kit/src/reporting-charts.tsx
@@ -121,3 +121,3 @@ export function StackedBarChart({
-          <DefaultTooltipContent label={focused.tooltipLabel ?? focused.label} payload={series.map((item, index) => ({ name: item.label, value: focused.values[item.key] ?? unavailableLabel, color: seriesColor(item, index) }))} formatter={(value, name) => [typeof value === "number" ? valueFormatter(value) : value, name]} contentStyle={tooltipStyle} />
+          <DefaultTooltipContent label={focused.tooltipLabel ?? focused.label} payload={series.map((item, index) => ({ name: item.label, value: focused.values[item.key] ?? unavailableLabel, color: seriesColor(item, index), graphicalItemId: item.key }))} formatter={(value, name) => [typeof value === "number" ? valueFormatter(value) : value, name]} contentStyle={tooltipStyle} />
```

Upstream: a enviar para keak-ai/cheaper-inference-ui-kit (mesma linha em `src/reporting-charts.tsx`).
Ao sincronizar uma versão que já traga o campo, remover esta seção.
