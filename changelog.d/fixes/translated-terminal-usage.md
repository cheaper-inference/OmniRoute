Preserve inclusive accounting and cache evidence when translating streaming usage to Claude. Defer Claude and Responses terminal events until a real finish receipt, trailing receipt, or stream flush, keeping earlier in-band usage separate from final usage. Preserve omitted counters and explicit cache zeros across partial receipts in both Responses adapters.

Ignore bare all-zero tail placeholders after a reported receipt, avoid replaying repeated finishing text or tool fragments, and keep cache-write tiers when the final passthrough event has no newline.
