# Patches locais

## deb522b9ba5206c69c4604085e214660a607e652

The manually constructed keyboard tooltip in `src/reporting-charts.tsx` must provide
Recharts' required `Payload.graphicalItemId`. Use the existing unique series key,
matching the identity already used for each chart series. The values, ordering,
formatting and pointer tooltip are unchanged.

```diff
- ({ name: item.label, value: focused.values[item.key] ?? unavailableLabel, color: seriesColor(item, index) })
+ ({ graphicalItemId: item.key, name: item.label, value: focused.values[item.key] ?? unavailableLabel, color: seriesColor(item, index) })
```

Upstream follow-up: [OmniRoute PR #18849](https://github.com/cheaper-inference/OmniRoute/pull/18849).
The contribution asks the shared maintainer to port this one-property compatibility
fix to the private kit repository; that repository is not accessible from this fork.
Remove this exception after syncing a kit snapshot containing the fix.
