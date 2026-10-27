#!/usr/bin/env python3
# Diagnostic audit: exact body ATX levels, legacy fence counts and table rows (±3).
import collections
import json
import os
import re


def count(pattern, text):
    return len(re.findall(pattern, text, re.M))


def strip_front_matter(text):
    return re.sub(r"\A---[ \t]*\n.*?\n---[ \t]*(?:\n|$)", "", text, count=1, flags=re.S)


def source_body(text):
    text = strip_front_matter(text)
    # Only the initial title is replaced by the generated mirror title. An H1
    # after an introduction belongs to the body and must survive translation.
    return re.sub(r"\A(?:[ \t]*\n)* {0,3}#(?:[ \t]+[^\n]*)?(?:\n|$)", "", text, count=1)


def mirror_body(text, source_has_title):
    # Recognize the generated prefix, including older mirrors without the bar.
    # A horizontal rule inside the document is not a mirror-header boundary.
    body = re.sub(
        r"\A(?:[ \t]*\n)* {0,3}#[ \t]+[^\n]*\n(?:[ \t]*\n)*"
        r"(?:🌐[^\n]*\n(?:[ \t]*\n)*)?---[ \t]*(?:\n|$)",
        "",
        text,
        count=1,
    )
    if body != text:
        return body  # A second title inside the generated body must remain visible.
    # Older mirrors are standalone documents, with their own metadata/title.
    # Remove a standalone title only when the source also has an initial title;
    # otherwise an added H1 is a real body heading and must be diagnosed.
    return source_body(text) if source_has_title else strip_front_matter(text)


def heading_levels(text):
    levels = []
    fence = None
    for line in text.splitlines():
        delimiter = re.match(r"^ {0,3}(`{3,}|~{3,})(.*)$", line)
        if fence:
            if (
                delimiter
                and delimiter[1][0] == fence[0]
                and len(delimiter[1]) >= len(fence)
                and re.fullmatch(r"[ \t]*", delimiter[2])
            ):
                fence = None
            continue
        if delimiter and (delimiter[1][0] == "~" or "`" not in delimiter[2]):
            fence = delimiter[1]
            continue
        heading = re.match(r"^ {0,3}(#{1,6})(?:[ \t]+|$)", line)
        if heading:
            levels.append(len(heading[1]))
    return levels


def legacy_metric_body(text):
    # Keep the existing fence/row diagnostics unchanged; only headings gain the
    # stricter body extraction and parser in this repair.
    i = text.find("\n---\n")
    return text[i + 5:] if 0 <= i < 4000 else text


with open(".i18n-state.json", encoding="utf-8") as state_file:
    sources = json.load(state_file)["sources"]
bad = []
per = collections.Counter()
for rel, entry in sources.items():
    if not rel.endswith(".md") or not os.path.exists(rel):
        continue
    with open(rel, encoding="utf-8") as source_file:
        source = source_file.read()
    source_content = source_body(source)
    source_has_title = source_content != strip_front_matter(source)
    source_levels = heading_levels(source_content)
    sf, sr = count(r"^\s*```", source), count(r"^\s*\|", source)
    for locale in entry.get("locales", {}):
        target = f"docs/i18n/{locale}/{rel}"
        if not os.path.exists(target):
            bad.append((rel, locale, "missing"))
            continue
        with open(target, encoding="utf-8") as target_file:
            translated = target_file.read()
        target_levels = heading_levels(mirror_body(translated, source_has_title))
        metric_body = legacy_metric_body(translated)
        tf, tr = count(r"^\s*```", metric_body), count(r"^\s*\|", metric_body)
        why = []
        if target_levels != source_levels:
            why.append(f"headings {target_levels}/{source_levels}")
        if tf != sf:
            why.append(f"fences {tf}/{sf}")
        if abs(tr - sr) > 3:
            why.append(f"rows {tr}/{sr}")
        if why:
            bad.append((rel, locale, "; ".join(why)))
            per[rel] += 1
print("mirrors with structural mismatch:", len(bad))
for rel, total in per.most_common(25):
    print(f"{total:3d} {rel}")
output = os.environ.get("I18N_OUT", os.path.join("_artifacts", "i18n-waves"))
with open(output + "/audit_all.json", "w", encoding="utf-8") as report_file:
    json.dump(bad, report_file, ensure_ascii=False, indent=0)
