#!/usr/bin/env python3
"""Conservatively resolve a docs/state merge without adopting new hashes.

Changed records and targets need exact source/target/cache proof. Unchanged
historical records outside that delta survive verbatim, without fresh approval.
Three-way selection is per complete locale record, never per individual field.
Conflicting targets must preserve every byte outside supported conflict markers;
ambiguous or stale affected records need separate reviewed reconciliation.
No commit, push, translation, dependency install or arbitrary proof override.
"""
from copy import deepcopy
from pathlib import Path
import datetime
import hashlib
import json
import os
import re
import subprocess
import sys
import tempfile

MISSING = object()
HASH = re.compile(r'^[a-f0-9]{64}$')
SECTION_HASH = re.compile(r'^[a-f0-9]{12}$')
LOCALE = re.compile(r'^[A-Za-z][A-Za-z0-9-]*$')
STAMP = re.compile(r'^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,6})?(?:Z|\+00:00)$')
JS_SPACE = '\t\v\f \u00a0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\ufeff\n\r\u2028\u2029'
FENCE = re.compile('^[' + re.escape(JS_SPACE) + r']*(```|~~~)')
OBJECT_ID = re.compile(r'^(?:[a-f0-9]{40}|[a-f0-9]{64})$')
PROTECTED = {'AGENTS.md', 'CLAUDE.md', 'GEMINI.md', 'llm.txt'}
MUTATION_STARTED = False


class ProofError(Exception):
    pass


def require(condition, code):
    if not condition:
        raise ProofError(code)


def sha(data):
    return hashlib.sha256(data).hexdigest()


def git(*args, text=True):
    return subprocess.run(['git', *args], capture_output=True, text=text,
                          check=True, timeout=30).stdout


def unique_pairs(items):
    value = {}
    for key, child in items:
        require(key not in value, 'DUPLICATE_JSON_KEY')
        value[key] = child
    return value


def safe_source_path(relative):
    require(isinstance(relative, str) and relative and '\\' not in relative, 'SOURCE_PATH_INVALID')
    parts = relative.split('/')
    require(all(part and part not in {'.', '..'} and not part.startswith('.') for part in parts),
            'SOURCE_PATH_INVALID')
    require(len(parts) == 1 or parts[0] == 'docs', 'SOURCE_PATH_INVALID')
    require(relative.endswith('.md') or relative == 'llm.txt', 'SOURCE_PATH_INVALID')
    return relative


def read_regular(relative, limit=8 * 1024 ** 2):
    path = Path.cwd()
    for part in relative.split('/'):
        require(part and part not in {'.', '..'}, 'FILE_PATH_INVALID')
        path = path / part
        require(not path.is_symlink(), 'SYMLINK_PROOF_FORBIDDEN')
    require(path.is_file() and path.stat().st_size <= limit, 'PROOF_FILE_MISSING_OR_TOO_LARGE')
    return path.read_bytes()


def pinned_commit(ref):
    value = git('rev-parse', '--verify', ref + '^{commit}').strip()
    require(bool(OBJECT_ID.fullmatch(value)), 'COMMIT_ID_INVALID')
    return value


def index_snapshot(relative):
    raw = git('ls-files', '--stage', '-z', '--', relative)
    entries = {}
    for line in raw.split('\0'):
        if not line:
            continue
        header, separator, path = line.partition('\t')
        fields = header.split(' ')
        require(separator and path == relative and len(fields) == 3, 'INDEX_ENTRY_INVALID')
        mode, oid, stage = fields
        require(stage in {'0', '1', '2', '3'} and stage not in entries
                and bool(OBJECT_ID.fullmatch(oid)), 'INDEX_ENTRY_INVALID')
        entries[stage] = (mode, oid)
    return entries


def stage_bytes(relative, stage, entries):
    require(stage in entries and entries[stage][0] in {'100644', '100755'},
            'REGULAR_INDEX_STAGE_REQUIRED')
    raw = git('show', ':' + stage + ':' + relative, text=False)
    oid = entries[stage][1]
    framed = b'blob ' + str(len(raw)).encode() + b'\0' + raw
    actual = (hashlib.sha1(framed) if len(oid) == 40 else hashlib.sha256(framed)).hexdigest()
    require(actual == oid, 'STAGE_BLOB_ID_CHANGED')
    return raw


def prove_index_zero(relative, expected_digest, expected_mode=None):
    entries = index_snapshot(relative)
    require(set(entries) == {'0'}, 'RESOLVED_INDEX_STAGE_REQUIRED')
    if expected_mode is not None:
        require(entries['0'][0] == expected_mode, 'INDEX_MODE_CHANGED')
    require(sha(stage_bytes(relative, '0', entries)) == expected_digest, 'INDEX_BYTES_UNPROVEN')
    return entries


def byte_lines(raw):
    parts = raw.split(b'\n')
    return [part + b'\n' for part in parts[:-1]] + ([parts[-1]] if parts[-1] else [])


def marker_kind(raw_line):
    line = raw_line[:-1] if raw_line.endswith(b'\n') else raw_line
    if raw_line.endswith(b'\r\n'):
        line = line[:-1]
    candidate = line.lstrip(b' \t')
    prefixes = (b'<<<<<<<', b'=======', b'>>>>>>>', b'|||||||')
    if not candidate.startswith(prefixes):
        return None
    require(candidate == line, 'AMBIGUOUS_CONFLICT_MARKER')
    if line == b'=======':
        return 'separator'
    for prefix, kind in [(b'<<<<<<< ', 'open'), (b'>>>>>>> ', 'close')]:
        if line.startswith(prefix) and line[len(prefix):].strip(b' \t'):
            return kind
    raise ProofError('UNSUPPORTED_CONFLICT_MARKER')


def has_markers(raw):
    return any(marker_kind(line) is not None for line in byte_lines(raw))


def resolve_markers(raw, side):
    """Choose supported two-way marker arms; preserve all other bytes exactly."""
    require(side in {'ours', 'theirs'}, 'MARKER_SIDE_INVALID')
    output = []
    arm = None
    fence = None
    for line in byte_lines(raw):
        kind = marker_kind(line)
        require(not (kind and fence), 'MARKERS_IN_FENCED_CONTENT_REQUIRE_REVIEW')
        if kind == 'open':
            require(arm is None, 'NESTED_CONFLICT_MARKER')
            arm = 'ours'
        elif kind == 'separator':
            require(arm == 'ours', 'AMBIGUOUS_CONFLICT_MARKER')
            arm = 'theirs'
        elif kind == 'close':
            require(arm == 'theirs', 'AMBIGUOUS_CONFLICT_MARKER')
            arm = None
        else:
            # A marker inside a fenced example is ambiguous. This conservative
            # parser does not reinterpret Markdown examples as Git conflicts.
            fence_line = re.match(rb'^[ \t]{0,3}(`{3,}|~{3,})([^\r\n]*)', line)
            if fence_line:
                token, tail = fence_line.groups()
                if fence is None:
                    fence = token
                elif token[:1] == fence[:1] and len(token) >= len(fence) and not tail.strip():
                    fence = None
            if arm is None or arm == side:
                output.append(line)
    require(arm is None, 'UNCLOSED_CONFLICT_MARKER')
    return b''.join(output)


def section_hashes(source):
    # Literal port of lib/section-cache.mjs, using ECMAScript whitespace rather
    # than Python's broader \s. A cross-runtime fixture parity check is required
    # before installation; no runner/application module is imported here.
    text = source.decode('utf-8', errors='strict')
    text = re.sub(r'\A---\r?\n[\s\S]*?\r?\n---\r?\n+', '', text, count=1)
    text = re.sub(r'\A# [^\r\n\u2028\u2029]+\r?\n+', '', text, count=1)
    sections = [[]]
    in_fence = False
    for line in text.split('\n'):
        if FENCE.match(line):
            in_fence = not in_fence
        if not in_fence and line.startswith('## ') and sections[-1]:
            sections.append([])
        sections[-1].append(line)
    return [sha('\n'.join(lines).rstrip(JS_SPACE).strip(JS_SPACE).encode())[:12]
            for lines in sections]


def parse_state(raw):
    require(len(raw.encode()) <= 16 * 1024 ** 2, 'STATE_TOO_LARGE')
    value = json.loads(raw, object_pairs_hook=unique_pairs)
    require(isinstance(value, dict) and set(value) == {'sources'} and isinstance(value['sources'], dict),
            'STATE_SCHEMA_INVALID')
    for relative, entry in value['sources'].items():
        safe_source_path(relative)
        require(isinstance(entry, dict) and set(entry) == {'source_hash', 'locales'}, 'SOURCE_SCHEMA_INVALID')
        require(isinstance(entry['source_hash'], str) and HASH.fullmatch(entry['source_hash']), 'SOURCE_HASH_INVALID')
        require(isinstance(entry['locales'], dict), 'LOCALES_INVALID')
        for locale, record in entry['locales'].items():
            require(isinstance(locale, str) and LOCALE.fullmatch(locale), 'LOCALE_INVALID')
            require(isinstance(record, dict) and {'source_hash', 'target_hash', 'updated_at'} <= set(record)
                    and set(record) <= {'source_hash', 'target_hash', 'updated_at', 'section_hashes'},
                    'RECORD_SCHEMA_INVALID')
            for key in ['source_hash', 'target_hash']:
                require(isinstance(record[key], str) and HASH.fullmatch(record[key]), 'RECORD_HASH_INVALID')
            stamp = record['updated_at']
            require(isinstance(stamp, str) and STAMP.fullmatch(stamp), 'TIMESTAMP_INVALID')
            datetime.datetime.fromisoformat(stamp.replace('Z', '+00:00'))
            if 'section_hashes' in record:
                cache = record['section_hashes']
                require(isinstance(cache, list) and cache and all(isinstance(item, str) and SECTION_HASH.fullmatch(item)
                        for item in cache), 'CACHE_SCHEMA_INVALID')
    return value


def three_way(base, ours, theirs):
    if ours == theirs:
        return ours
    if ours == base:
        return theirs
    if theirs == base:
        return ours
    raise ProofError('DIVERGENT_RECORD_REQUIRES_REVIEW')


def select_existing_records(base, ours, theirs):
    documents = dict.fromkeys([*theirs['sources'], *ours['sources'], *base['sources']])
    selected = {'sources': {}}
    origins = {}
    for relative in documents:
        entries = [state['sources'].get(relative) for state in [base, ours, theirs]]
        require(entries[0] is None or (entries[1] is not None and entries[2] is not None),
                'DOCUMENT_REMOVAL_REQUIRES_REVIEW')
        root = three_way(*(entry['source_hash'] if entry else MISSING for entry in entries))
        require(root is not MISSING, 'DOCUMENT_REMOVAL_REQUIRES_REVIEW')
        selected['sources'][relative] = {'source_hash': root, 'locales': {}}
        root_ours = entries[1] is not None and entries[1]['source_hash'] == root
        root_theirs = entries[2] is not None and entries[2]['source_hash'] == root
        origins[(relative, None)] = 'ours' if root_ours and not root_theirs else 'theirs'
        locales = dict.fromkeys(locale for entry in [entries[2], entries[1], entries[0]] if entry
                                for locale in entry['locales'])
        for locale in locales:
            records = [entry['locales'].get(locale, MISSING) if entry else MISSING for entry in entries]
            require(records[0] is MISSING or (records[1] is not MISSING and records[2] is not MISSING),
                    'LOCALE_REMOVAL_REQUIRES_REVIEW')
            record = three_way(*records)
            require(record is not MISSING, 'LOCALE_REMOVAL_REQUIRES_REVIEW')
            selected['sources'][relative]['locales'][locale] = deepcopy(record)
            origins[(relative, locale)] = 'ours' if record == records[1] and record != records[2] else 'theirs'
    return selected, origins


def prove_record(record, recorded_source, final_source, target):
    require(bool(recorded_source.strip()), 'EMPTY_SOURCE_UNPROVEN')
    require(not has_markers(final_source) and not has_markers(target), 'UNRESOLVED_CONTENT')
    require(sha(recorded_source) == record['source_hash'], 'RECORDED_SOURCE_UNPROVEN')
    require(sha(final_source) == record['source_hash'], 'FINAL_SOURCE_REQUIRES_RECONCILIATION')
    require(sha(target) == record['target_hash'], 'TARGET_REHASH_FORBIDDEN')
    if 'section_hashes' in record:
        require(record['section_hashes'] == section_hashes(recorded_source), 'SECTION_CACHE_UNPROVEN')


def mirror_parts(path):
    parts = path.split('/', 3)
    require(len(parts) == 4 and parts[:2] == ['docs', 'i18n'] and LOCALE.fullmatch(parts[2]),
            'MIRROR_PATH_INVALID')
    safe_source_path(parts[3])
    return parts[2], parts[3]


def main():
    global MUTATION_STARTED
    require(len(sys.argv) == 1, 'NO_ADOPTION_OVERRIDE_SUPPORTED')
    initial = read_regular('.i18n-state.json', 16 * 1024 ** 2)
    state_index = index_snapshot('.i18n-state.json')
    require(set(state_index) == {'1', '2', '3'}, 'THREE_STATE_STAGES_REQUIRED')
    raw_states = {stage: stage_bytes('.i18n-state.json', stage, state_index).decode('utf-8')
                  for stage in ['1', '2', '3']}
    base, ours, theirs = [parse_state(raw_states[stage]) for stage in ['1', '2', '3']]
    commits = {side: pinned_commit(side) for side in ['HEAD', 'MERGE_HEAD']}
    unmerged = [name for name in git('diff', '--name-only', '-z', '--diff-filter=U').split('\0') if name]
    require('.i18n-state.json' in unmerged, 'THREE_STATE_STAGES_REQUIRED')
    require(all(name == '.i18n-state.json' or name.startswith('docs/i18n/') for name in unmerged),
            'UNRELATED_CONFLICT_REQUIRES_REVIEW')
    conflicted = {name for name in unmerged if name.startswith('docs/i18n/')}
    merge_base = git('merge-base', commits['HEAD'], commits['MERGE_HEAD']).strip()
    require(bool(OBJECT_ID.fullmatch(merge_base)), 'MERGE_BASE_ID_INVALID')
    touched = set(conflicted)
    for refs in [(merge_base, commits['HEAD']), (merge_base, commits['MERGE_HEAD']), (commits['HEAD'],)]:
        touched.update(name for name in git('diff', '--name-only', '-z', *refs, '--', 'docs/i18n').split('\0') if name)
    affected = {(relative, locale) for locale, relative in map(mirror_parts, touched)}
    selected, origins = select_existing_records(base, ours, theirs)
    roots = set()
    for relative, entry in selected['sources'].items():
        previous = [value['sources'].get(relative) for value in [base, ours, theirs]]
        root_values = [value['source_hash'] if value else MISSING for value in previous]
        if not root_values[0] == root_values[1] == root_values[2]:
            roots.add(relative)
        for locale in entry['locales']:
            records = [value['locales'].get(locale, MISSING) if value else MISSING for value in previous]
            if not records[0] == records[1] == records[2]:
                affected.add((relative, locale))
    require(all(relative in selected['sources'] and locale in selected['sources'][relative]['locales']
                for relative, locale in affected), 'MIRROR_WITHOUT_RECORD')
    scope = sorted(roots | {relative for relative, _ in affected})
    before_files = {'.i18n-state.json': sha(initial)}
    index_snapshots = {'.i18n-state.json': state_index}
    expected_files = {}
    proven_mirrors = set()
    source_snapshots = {}
    def source_snapshot(relative, side):
        key = (relative, side)
        if key not in source_snapshots:
            origin = commits['HEAD' if side == 'ours' else 'MERGE_HEAD']
            source_snapshots[key] = git('show', origin + ':' + relative, text=False)
        return source_snapshots[key]
    for relative in scope:
        require(Path(relative).name not in PROTECTED, 'PROTECTED_SURFACE_REQUIRES_REVIEW')
        entry = selected['sources'][relative]
        require(bool(entry['locales']), 'EMPTY_LOCALES_ARE_NOT_TRANSLATION_PROOF')
        original_source = source_snapshot(relative, origins[(relative, None)])
        final_source = read_regular(relative)
        require(not has_markers(final_source), 'UNRESOLVED_CONTENT')
        require(entry['source_hash'] == sha(original_source) == sha(final_source), 'ROOT_SOURCE_UNPROVEN')
        before_files[relative] = sha(final_source)
        expected_files[relative] = sha(final_source)
        # The next commit contains index bytes, not merely the working source.
        # Bind each in-scope canonical source before the first mutation.
        index_snapshots[relative] = prove_index_zero(relative, sha(final_source))
        for locale, record in entry['locales'].items():
            if (relative, locale) not in affected:
                continue
            side = origins[(relative, locale)]
            target = 'docs/i18n/' + locale + '/' + relative
            current = read_regular(target)
            before_files[target] = sha(current)
            chosen = current
            index_snapshots[target] = index_snapshot(target)
            if target in conflicted:
                chosen = stage_bytes(target, '2' if side == 'ours' else '3', index_snapshots[target])
                require(resolve_markers(current, side) == chosen, 'OUTSIDE_MARKER_BYTES_REQUIRE_REVIEW')
            else:
                require(set(index_snapshots[target]) == {'0'}, 'RESOLVED_INDEX_STAGE_REQUIRED')
                require(stage_bytes(target, '0', index_snapshots[target]) == current,
                        'WORKTREE_AND_INDEX_BYTES_DIFFER')
            prove_record(record, source_snapshot(relative, side), final_source, chosen)
            expected_files[target] = sha(chosen)
            proven_mirrors.add(target)
    require(conflicted <= proven_mirrors, 'CONFLICT_WITHOUT_RECORD_PROOF')
    for relative, digest in before_files.items():
        require(sha(read_regular(relative, 16 * 1024 ** 2)) == digest, 'PREIMAGE_CHANGED')
    for ref, oid in commits.items():
        require(pinned_commit(ref) == oid, 'MERGE_COMMIT_CHANGED')
    for relative, entries in index_snapshots.items():
        require(index_snapshot(relative) == entries, 'INDEX_STAGE_CHANGED')
    # Input proof precedes mutation. Post-add index proof can still fail after
    # target mutation; such failures leave the merge incomplete and need recovery.
    for target in sorted(conflicted):
        locale, relative = mirror_parts(target)
        side = origins[(relative, locale)]
        MUTATION_STARTED = True
        git('checkout', '--' + side, '--', target)
        git('add', '--', target)
    for relative, digest in expected_files.items():
        require(sha(read_regular(relative, 16 * 1024 ** 2)) == digest, 'POST_CHECKOUT_BYTES_CHANGED')
    # Git clean filters can alter only index bytes while leaving working bytes
    # intact. A proved working file alone cannot authorize a state update.
    for target in sorted(proven_mirrors):
        locale, relative = mirror_parts(target)
        stage = ('2' if origins[(relative, locale)] == 'ours' else '3') if target in conflicted else '0'
        index_snapshots[target] = prove_index_zero(
            target, expected_files[target], index_snapshots[target][stage][0])
    # Target add filters must not change the English source staged for commit.
    for relative in scope:
        prove_index_zero(relative, expected_files[relative], index_snapshots[relative]['0'][0])
    for ref, oid in commits.items():
        require(pinned_commit(ref) == oid, 'MERGE_COMMIT_CHANGED')
    require(index_snapshot('.i18n-state.json') == state_index, 'STATE_STAGE_CHANGED')
    require(sha(read_regular('.i18n-state.json', 16 * 1024 ** 2)) == sha(initial), 'STATE_PREIMAGE_CHANGED')
    serialized = (json.dumps(selected, indent=2, ensure_ascii=False) + '\n').encode('utf-8')
    temporary = None
    try:
        with tempfile.NamedTemporaryFile(mode='wb', dir=Path.cwd(),
                                         prefix='.i18n-state.', suffix='.tmp', delete=False) as handle:
            temporary = Path(handle.name)
            handle.write(serialized)
            handle.flush()
            os.fsync(handle.fileno())
        os.chmod(temporary, Path('.i18n-state.json').stat().st_mode & 0o777)
        MUTATION_STARTED = True
        os.replace(temporary, '.i18n-state.json')
        temporary = None
    finally:
        if temporary is not None:
            temporary.unlink(missing_ok=True)
    git('add', '--', '.i18n-state.json')
    require(read_regular('.i18n-state.json', 16 * 1024 ** 2) == serialized, 'STATE_POSTIMAGE_CHANGED')
    prove_index_zero('.i18n-state.json', sha(serialized))
    # The state add can invoke a filter. Close over every proved source and
    # mirror before PASS; any mismatch after mutation needs explicit recovery.
    for relative, digest in expected_files.items():
        require(sha(read_regular(relative, 16 * 1024 ** 2)) == digest,
                'POST_CHECKOUT_BYTES_CHANGED')
        prove_index_zero(relative, digest, index_snapshots[relative]['0'][0])
    remaining = [name for name in git('diff', '--name-only', '-z', '--diff-filter=U').split('\0') if name]
    require(not remaining, 'UNRESOLVED_PATHS_REMAIN')
    total_records = sum(len(entry['locales']) for entry in selected['sources'].values())
    print(json.dumps({'status': 'PASS', 'provenRecords': len(proven_mirrors),
                      'preservedOutsideDeltaRecords': total_records - len(proven_mirrors),
                      'proofScope': 'CHANGED_RECORDS_AND_TARGETS', 'rehashes': 0,
                      'newTranslationRecords': 0, 'semanticTranslationCertified': False}))


if __name__ == '__main__':
    try:
        main()
    except (ProofError, OSError, ValueError, subprocess.SubprocessError) as error:
        code = str(error) if isinstance(error, ProofError) else type(error).__name__
        print('[i18n-merge] BLOCKED: ' + code, file=sys.stderr)
        if MUTATION_STARTED:
            print('[i18n-merge] RECOVERY_REQUIRED: mutation started; merge remains incomplete.', file=sys.stderr)
        sys.exit(2)
