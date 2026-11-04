"""Synthetic regression tests; Git, npx and all external processes are mocked."""
from pathlib import Path
from contextlib import redirect_stdout, redirect_stderr
from copy import deepcopy
from unittest.mock import patch
import argparse
import hashlib
import io
import json
import os
import runpy
import subprocess
import sys
import tempfile
import unittest

FIXTURE_PARENT = None
SOURCE = b'# Guide\n\n## Policy\n\nRequests stay in memory.\n'
TARGET = b'# Guia\n\n## Politica\n\nAs solicitacoes ficam na memoria.\n'
DOC = 'docs/guide.md'
MIRROR = 'docs/i18n/pt-BR/' + DOC
STAMP = '2026-11-03T00:00:00.000Z'
HEAD_ID = 'b' * 40
INCOMING_ID = 'c' * 40
JS_WHITESPACE = '\t\v\f \u00a0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\ufeff\n\r\u2028\u2029'


def digest(data):
    return hashlib.sha256(data).hexdigest()


def blob_id(data):
    return hashlib.sha1(b'blob ' + str(len(data)).encode() + b'\0' + data).hexdigest()


def record(source=SOURCE, target=TARGET):
    return {'source_hash': digest(source), 'target_hash': digest(target),
            'section_hashes': [digest(b'## Policy\n\nRequests stay in memory.')[:12]],
            'updated_at': STAMP}


def state(source=SOURCE, target=TARGET):
    return {'sources': {DOC: {'source_hash': digest(source), 'locales': {'pt-BR': record(source, target)}}}}


class SyntheticRepository:
    def __init__(self, root):
        self.root = root
        self.states = {'1': state(), '2': state(), '3': state()}
        self.sources = {'HEAD': SOURCE, 'MERGE_HEAD': SOURCE}
        self.stage_targets = {'2': {MIRROR: TARGET}, '3': {MIRROR: TARGET}}
        self.conflicts = []
        self.state_unmerged = True
        self.extra_conflicts = []
        self.source_failure = False
        self.fail_command = None
        self.touched = {'HEAD': [MIRROR], 'MERGE_HEAD': [MIRROR], 'working': []}
        self.stage_modes = {}
        self.stage_zero = {}
        self.working_modes = {}
        self.corrupt_staged_path = None
        self.corrupt_source_on_add = None
        self.corrupt_mirror_on_state_add = False
        self.index_reads = {}
        self.change_index_path = None
        self.change_ref = None
        self.ref_reads = {}
        self.fail_checkout_number = None
        self.checkout_count = 0
        self.commands = []
        self.raw_state = b'<<<<<<< synthetic state conflict\n=======\n>>>>>>> fixture\n'
        self.state_file = root / '.i18n-state.json'
        self.state_file.write_bytes(self.raw_state)
        self.put(DOC, SOURCE)
        self.put(MIRROR, TARGET)

    def stage_bytes(self, stage, path):
        if stage == '0':
            return self.stage_zero.get(path, (self.root / path).read_bytes())
        if path == '.i18n-state.json':
            if not self.state_unmerged:
                raise KeyError(path)
            return json.dumps(self.states[stage]).encode()
        return self.stage_targets[stage][path]

    def index_bytes(self, path):
        self.index_reads[path] = self.index_reads.get(path, 0) + 1
        if path == '.i18n-state.json':
            stages = ['1', '2', '3'] if self.state_unmerged else ['0']
        else:
            stages = ['2', '3'] if path in self.conflicts else ['0']
        entries = []
        for stage in stages:
            data = self.stage_bytes(stage, path)
            oid = blob_id(data)
            mode = self.stage_modes.get((stage, path), '100644')
            if self.change_index_path == path and self.index_reads[path] >= 2:
                oid = 'd' * 40
            entries.append(f'{mode} {oid} {stage}\t{path}\0')
        return ''.join(entries).encode()

    def put(self, relative, data):
        target = self.root / relative
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(data)

    def subprocess(self, args, **kwargs):
        self.commands.append(list(args))
        status = 0
        result = b''
        if args[0] == 'git':
            command = args[1:]
            if command[0] == self.fail_command:
                status = 128
            elif command[0] == 'rev-parse':
                side = command[-1].removesuffix('^{commit}')
                self.ref_reads[side] = self.ref_reads.get(side, 0) + 1
                oid = HEAD_ID if side == 'HEAD' else INCOMING_ID
                if self.change_ref == side and self.ref_reads[side] >= 2:
                    oid = 'e' * 40
                result = (oid + '\n').encode()
            elif command[0] == 'ls-files':
                result = self.index_bytes(command[-1])
            elif command[0] == 'merge-base':
                result = ('a' * 40 + '\n').encode()
            elif command[0] == 'show':
                ref = command[1]
                if ref.startswith(':'):
                    stage, name = ref[1:].split(':', 1)
                    try:
                        result = self.stage_bytes(stage, name)
                    except KeyError:
                        status = 128
                else:
                    side, name = ref.split(':', 1)
                    if self.source_failure:
                        status = 128
                    else:
                        assert name == DOC
                        result = self.sources[{'b' * 40: 'HEAD', 'c' * 40: 'MERGE_HEAD'}.get(side, side)]
            elif command[0] == 'diff':
                if '--diff-filter=U' in command:
                    paths = [*(['.i18n-state.json'] if self.state_unmerged else []), *self.conflicts, *self.extra_conflicts]
                else:
                    refs = [value for value in command if value in ['HEAD', 'MERGE_HEAD', HEAD_ID, INCOMING_ID, 'a' * 40]]
                    side = refs[-1]
                    side = {HEAD_ID: 'HEAD', INCOMING_ID: 'MERGE_HEAD'}.get(side, side)
                    paths = self.touched['working' if len(refs) == 1 else side]
                separator = '\0' if '-z' in command else '\n'
                result = (separator.join(paths) + separator).encode()
            elif command[0] == 'checkout':
                self.checkout_count += 1
                side = '2' if '--ours' in command else '3'
                path = command[-1]
                if self.checkout_count == self.fail_checkout_number:
                    status = 128
                elif self.stage_modes.get((side, path)) == '120000':
                    (self.root / path).unlink()
                    (self.root / path).symlink_to(self.stage_targets[side][path].decode())
                else:
                    self.put(path, self.stage_targets[side][path])
                    self.working_modes[path] = self.stage_modes.get((side, path), '100644')
            elif command[0] == 'add':
                path = command[-1]
                data = (self.root / path).read_bytes() if not (self.root / path).is_symlink() else os.readlink(self.root / path).encode()
                self.stage_zero[path] = data + b'FILTER_CHANGED_INDEX_BYTES\n' if path == self.corrupt_staged_path else data
                self.stage_modes.setdefault(('0', path), self.working_modes.get(path, '100644'))
                if path == self.corrupt_source_on_add:
                    self.stage_zero[DOC] = (self.root / DOC).read_bytes() + b'FILTER_CHANGED_SOURCE_INDEX\n'
                if command[-1] in self.conflicts:
                    self.conflicts.remove(command[-1])
                if command[-1] == '.i18n-state.json':
                    self.state_unmerged = False
                    if self.corrupt_mirror_on_state_add:
                        self.stage_zero[MIRROR] = (self.root / MIRROR).read_bytes() + b'FILTER_CHANGED_MIRROR_INDEX\n'
            else:
                raise AssertionError('UNEXPECTED_SYNTHETIC_GIT_COMMAND')
        elif args[0] == 'npx':
            pass
        else:
            raise AssertionError('UNMOCKED_PROCESS_FORBIDDEN')
        if status and kwargs.get('check'):
            raise subprocess.CalledProcessError(status, args)
        content = result.decode() if kwargs.get('text') else result
        return subprocess.CompletedProcess(args, status, content, '' if kwargs.get('text') else b'')

    def invoke(self, implementation):
        before = Path.cwd()
        output = io.StringIO()
        exit_code = 0
        try:
            os.chdir(self.root)
            with patch('subprocess.run', self.subprocess), patch.object(sys, 'argv', [str(implementation)]), \
                    redirect_stdout(output), redirect_stderr(output):
                try:
                    runpy.run_path(str(implementation), run_name='__main__')
                except SystemExit as error:
                    exit_code = int(error.code or 0)
        finally:
            os.chdir(before)
        return {'exit': exit_code, 'stateChanged': self.state_file.read_bytes() != self.raw_state,
                'mutations': [args for args in self.commands if args[0] == 'git' and args[1] in ['checkout', 'add']],
                'text': output.getvalue()}


class RegressionTests(unittest.TestCase):
    implementation = None

    def fixture(self):
        folder = FIXTURE_PARENT
        folder.mkdir(exist_ok=True)
        context = tempfile.TemporaryDirectory(prefix='case-', dir=folder)
        self.addCleanup(context.cleanup)
        return SyntheticRepository(Path(context.name))

    def assert_blocked_without_mutation(self, fixture):
        result = fixture.invoke(self.implementation)
        self.assertNotEqual(result['exit'], 0, 'UNPROVED_STATE_WAS_ACCEPTED')
        self.assertFalse(result['stateChanged'], 'STATE_MUTATED_BEFORE_PROOF')
        self.assertEqual(result['mutations'], [], 'INDEX_OR_TARGET_MUTATED_BEFORE_PROOF')

    def test_edited_target_cannot_be_rehashed_into_acceptance(self):
        fixture = self.fixture()
        fixture.put(MIRROR, TARGET + b'\nAs solicitacoes agora sao publicadas.\n')
        self.assert_blocked_without_mutation(fixture)

    def test_incoming_source_is_not_the_final_composed_source(self):
        fixture = self.fixture()
        fixture.put(DOC, SOURCE + b'\nRequests are persisted too.\n')
        self.assert_blocked_without_mutation(fixture)

    def test_git_read_failure_is_not_an_empty_valid_source(self):
        fixture = self.fixture()
        fixture.source_failure = True
        fixture.states['3']["sources"][DOC]['source_hash'] = digest(b'')
        fixture.states['3']["sources"][DOC]['locales']['pt-BR']['source_hash'] = digest(b'')
        self.assert_blocked_without_mutation(fixture)

    def test_whole_doc_selection_cannot_discard_local_locale_update(self):
        fixture = self.fixture()
        local_target = TARGET + b'\nTraducao local revisada.\n'
        fixture.states['2']['sources'][DOC]['locales']['pt-BR'].update(
            target_hash=digest(local_target), updated_at='2026-11-03T01:00:00.000Z')
        fixture.put(MIRROR, local_target)
        result = fixture.invoke(self.implementation)
        self.assertEqual(result['exit'], 0, result['text'])
        self.assertEqual(json.loads(fixture.state_file.read_bytes()), fixture.states['2'],
                         'THE_COMPLETE_PROVEN_LOCAL_RECORD_MUST_SURVIVE')


class ProposalTests(RegressionTests):
    def test_independent_locale_updates_survive_as_complete_records(self):
        fixture = self.fixture()
        french = b'# Guide\n\n## Politique\n\nLes demandes restent en memoire.\n'
        french_path = 'docs/i18n/fr/' + DOC
        for value in fixture.states.values():
            value['sources'][DOC]['locales']['fr'] = record(target=french)
        local_target = TARGET + b'\nRevisao local.\n'
        incoming_target = french + b'\nRevision recue.\n'
        fixture.states['2']['sources'][DOC]['locales']['pt-BR'].update(
            target_hash=digest(local_target), updated_at='2026-11-03T01:00:00.000Z')
        fixture.states['3']['sources'][DOC]['locales']['fr'].update(
            target_hash=digest(incoming_target), updated_at='2026-11-03T02:00:00.000Z')
        fixture.put(MIRROR, local_target)
        fixture.put(french_path, incoming_target)
        result = fixture.invoke(self.implementation)
        self.assertEqual(result['exit'], 0, result['text'])
        records = json.loads(fixture.state_file.read_bytes())['sources'][DOC]['locales']
        self.assertEqual(records['pt-BR'], fixture.states['2']['sources'][DOC]['locales']['pt-BR'])
        self.assertEqual(records['fr'], fixture.states['3']['sources'][DOC]['locales']['fr'])

    def test_proved_new_locale_from_one_side_is_preserved(self):
        fixture = self.fixture()
        french = b'# Guide\n\n## Politique\n\nLes demandes restent en memoire.\n'
        fixture.states['3']['sources'][DOC]['locales']['fr'] = record(target=french)
        fixture.put('docs/i18n/fr/' + DOC, french)
        result = fixture.invoke(self.implementation)
        self.assertEqual(result['exit'], 0, result['text'])
        self.assertEqual(json.loads(fixture.state_file.read_bytes()), fixture.states['3'])

    def test_locale_removal_needs_explicit_separate_review(self):
        fixture = self.fixture()
        fixture.states['3']['sources'][DOC]['locales'] = {}
        self.assert_blocked_without_mutation(fixture)

    def test_valid_existing_records_preserve_all_fields_without_rehash(self):
        fixture = self.fixture()
        expected = deepcopy(fixture.states['3'])
        result = fixture.invoke(self.implementation)
        self.assertEqual(result['exit'], 0, result['text'])
        self.assertEqual(json.loads(fixture.state_file.read_bytes()), expected)
        receipt = json.loads(result['text'])
        self.assertEqual(receipt['rehashes'], 0)
        self.assertEqual(receipt['newTranslationRecords'], 0)
        self.assertFalse(receipt['semanticTranslationCertified'])

    def test_absent_legacy_cache_is_preserved_as_absent(self):
        fixture = self.fixture()
        for value in fixture.states.values():
            del value['sources'][DOC]['locales']['pt-BR']['section_hashes']
        result = fixture.invoke(self.implementation)
        self.assertEqual(result['exit'], 0, result['text'])
        leaf = json.loads(fixture.state_file.read_bytes())['sources'][DOC]['locales']['pt-BR']
        self.assertNotIn('section_hashes', leaf)
        self.assertEqual(leaf['updated_at'], STAMP)

    def test_invalid_or_other_snapshot_cache_blocks_before_mutation(self):
        for cache in [[], ['a' * 12], None, ['wrong'], ['a' * 12, 'b' * 12]]:
            with self.subTest(cache=cache):
                fixture = self.fixture()
                for value in fixture.states.values():
                    value['sources'][DOC]['locales']['pt-BR']['section_hashes'] = cache
                self.assert_blocked_without_mutation(fixture)

    def test_missing_target_cannot_be_silently_skipped(self):
        fixture = self.fixture()
        (fixture.root / MIRROR).unlink()
        self.assert_blocked_without_mutation(fixture)

    def test_bilateral_changes_do_not_use_timestamp_as_proof(self):
        fixture = self.fixture()
        for stage, text, stamp in [('2', TARGET + b'Local\n', '2026-11-03T01:00:00.000Z'),
                                   ('3', TARGET + b'Incoming\n', '2026-11-03T02:00:00.000Z')]:
            fixture.states[stage]['sources'][DOC]['locales']['pt-BR'].update(
                target_hash=digest(text), updated_at=stamp)
        fixture.put(MIRROR, TARGET + b'Incoming\n')
        self.assert_blocked_without_mutation(fixture)

    def test_complete_conflict_target_proof_allows_checkout_without_rehash(self):
        fixture = self.fixture()
        fixture.conflicts = [MIRROR]
        fixture.put(MIRROR, b'<<<<<<< fixture\nother\n=======\n' + TARGET + b'>>>>>>> fixture\n')
        result = fixture.invoke(self.implementation)
        self.assertEqual(result['exit'], 0, result['text'])
        self.assertEqual((fixture.root / MIRROR).read_bytes(), TARGET)
        self.assertEqual(json.loads(fixture.state_file.read_bytes()), fixture.states['3'])
        self.assertEqual(len(result['mutations']), 3)

    def test_conflict_target_not_matching_record_blocks_before_checkout(self):
        fixture = self.fixture()
        fixture.conflicts = [MIRROR]
        fixture.stage_targets['3'][MIRROR] = TARGET + b'Unreviewed\n'
        fixture.put(MIRROR, b'<<<<<<< fixture\nconflict\n=======\nother\n>>>>>>> fixture\n')
        self.assert_blocked_without_mutation(fixture)

    def test_source_markers_and_unrelated_conflicts_block(self):
        for scenario in ['source', 'unrelated']:
            fixture = self.fixture()
            if scenario == 'source':
                fixture.put(DOC, b'<<<<<<< fixture\nconflict\n=======\nother\n>>>>>>> fixture\n')
            else:
                fixture.extra_conflicts = ['src/production.ts']
            self.assert_blocked_without_mutation(fixture)

    def test_zero_locales_never_proves_translation_freshness(self):
        fixture = self.fixture()
        for value in fixture.states.values():
            value['sources'][DOC]['locales'] = {}
        self.assert_blocked_without_mutation(fixture)

    def test_unknown_record_fields_and_invalid_timestamps_block(self):
        for change in [{'approved': True}, {'updated_at': '2026-02-31T00:00:00.000Z'},
                       {'updated_at': 'later'}, {'source_hash': None}]:
            fixture = self.fixture()
            for value in fixture.states.values():
                value['sources'][DOC]['locales']['pt-BR'].update(change)
            self.assert_blocked_without_mutation(fixture)

    def test_stale_record_is_blocked_and_is_never_relabelled_current(self):
        fixture = self.fixture()
        for value in fixture.states.values():
            value['sources'][DOC]['locales']['pt-BR']['source_hash'] = digest(b'Older source')
        self.assert_blocked_without_mutation(fixture)

    def test_target_symlink_is_not_proof(self):
        fixture = self.fixture()
        (fixture.root / MIRROR).unlink()
        link = fixture.root / 'synthetic-target.md'
        link.write_bytes(TARGET)
        (fixture.root / MIRROR).symlink_to(link)
        self.assert_blocked_without_mutation(fixture)

    def test_parser_rejects_duplicate_keys_and_unsafe_source_paths(self):
        module = runpy.run_path(str(self.implementation), run_name='synthetic_library')
        with self.assertRaises(module['ProofError']):
            module['parse_state']('{"sources": {}, "sources": {}}')
        for path in ['../README.md', '/README.md', 'docs/../README.md', 'docs//guide.md',
                     '.env', '_tasks/private.md', 'docs/secret\\README.md']:
            with self.subTest(path=path), self.assertRaises(module['ProofError']):
                module['safe_source_path'](path)

    def test_source_cache_examples_use_fences_frontmatter_and_js_whitespace(self):
        module = runpy.run_path(str(self.implementation), run_name='synthetic_library')
        examples = [
            (b'---\ntitle: Fixture\n---\n\n# Heading\n\nLead.\n\n## A\n\n```md\n## not a heading\n```\n\n## B\n\nTail.\n',
             ['Lead.', '## A\n\n```md\n## not a heading\n```', '## B\n\nTail.']),
            ('# H\n\n\ufeff## A\n\nText.\u00a0\n'.encode(), ['## A\n\nText.']),
            ('# H\n\n## A\n\nText.\u0085\n'.encode(), ['## A\n\nText.\u0085']),
            # The canonical regex consumes the first CRLF after H; the remaining
            # CRLF creates an empty preamble section before the first ## heading.
            (b'# H\r\n\r\n## A\r\n\r\nText.\r\n', ['', '## A\r\n\r\nText.']),
        ]
        for source, expected_sections in examples:
            with self.subTest(source=source[:20]):
                self.assertEqual(module['section_hashes'](source),
                                 [digest(part.encode())[:12] for part in expected_sections])


class ReviewTests(ProposalTests):
    """Static-review S1/T1/G1 reproduced without external processes."""

    def add_stale_french(self, fixture):
        historical = b'# Guide\n\n## Policy\n\nRequests used an older policy.\n'
        french = b'# Guide\n\n## Politique\n\nAncienne politique.\n'
        leaf = record(source=historical, target=french)
        leaf['section_hashes'] = [digest(historical.split(b'\n\n', 1)[1].rstrip())[:12]]
        leaf['updated_at'] = '2026-11-01T00:00:00.000Z'
        for value in fixture.states.values():
            value['sources'][DOC]['locales']['fr'] = deepcopy(leaf)
        fixture.put('docs/i18n/fr/' + DOC, french)
        return leaf

    def update_local(self, fixture):
        updated = TARGET + b'\nRevisao local.\n'
        fixture.states['2']['sources'][DOC]['locales']['pt-BR'].update(
            target_hash=digest(updated), updated_at='2026-11-03T01:00:00.000Z')
        fixture.put(MIRROR, updated)

    def test_s1_unchanged_stale_locale_does_not_block_other_valid_locale(self):
        fixture = self.fixture()
        source = b'# Guide\n\n## Rule\n\nNew policy.\n'
        old_source = b'# Guide\n\n## Rule\n\nOld policy.\n'
        original = b'# Guia\n\n## Regra\n\nNova politica.\n'
        current = b'# Guia\n\n## Regra\n\nNova politica revisada.\n'
        french = b'# Guide\n\n## Regle\n\nAncienne politique.\n'
        for stage in fixture.states:
            local = {'source_hash': digest(source), 'target_hash': digest(original),
                     'section_hashes': ['93804d300e53'], 'updated_at': '2026-11-01T00:00:00.000Z'}
            stale = {'source_hash': digest(old_source), 'target_hash': digest(french),
                     'section_hashes': ['884acc13d527'], 'updated_at': '2026-11-01T00:00:00.000Z'}
            fixture.states[stage] = {'sources': {DOC: {'source_hash': digest(source),
                                     'locales': {'pt-BR': local, 'fr': stale}}}}
        fixture.states['2']['sources'][DOC]['locales']['pt-BR'].update(
            target_hash=digest(current), updated_at=STAMP)
        fixture.sources = {'HEAD': source, 'MERGE_HEAD': source}
        fixture.put(DOC, source)
        fixture.put(MIRROR, current)
        fixture.put('docs/i18n/fr/' + DOC, french)
        expected = deepcopy(fixture.states['2'])
        result = fixture.invoke(self.implementation)
        self.assertEqual(result['exit'], 0, result['text'])
        self.assertEqual(json.loads(fixture.state_file.read_bytes()), expected)
        receipt = json.loads(result['text'])
        self.assertEqual(receipt['provenRecords'], 1)
        self.assertEqual(receipt['preservedOutsideDeltaRecords'], 1)
        self.assertFalse(receipt['semanticTranslationCertified'])

    def test_s2_two_fresh_locales_and_one_stale_are_preserved_separately(self):
        fixture = self.fixture()
        stale = self.add_stale_french(fixture)
        self.update_local(fixture)
        spanish = b'# Guia\n\n## Politica\n\nLas solicitudes quedan en memoria.\n'
        for value in fixture.states.values():
            value['sources'][DOC]['locales']['es'] = record(target=spanish)
        incoming = spanish + b'\nRevision recibida.\n'
        fixture.states['3']['sources'][DOC]['locales']['es'].update(target_hash=digest(incoming))
        fixture.put('docs/i18n/es/' + DOC, incoming)
        result = fixture.invoke(self.implementation)
        self.assertEqual(result['exit'], 0, result['text'])
        leaves = json.loads(fixture.state_file.read_bytes())['sources'][DOC]['locales']
        self.assertEqual(leaves['fr'], stale)
        self.assertEqual(leaves['pt-BR'], fixture.states['2']['sources'][DOC]['locales']['pt-BR'])
        self.assertEqual(leaves['es'], fixture.states['3']['sources'][DOC]['locales']['es'])
        self.assertEqual(json.loads(result['text'])['provenRecords'], 2)

    def test_s3_unchanged_stale_document_is_not_read_or_certified(self):
        fixture = self.fixture()
        untouched = {'source_hash': digest(b'Old source'), 'locales': {'fr': record(source=b'Old source')}}
        for value in fixture.states.values():
            value['sources']['docs/unchanged.md'] = deepcopy(untouched)
        self.update_local(fixture)
        result = fixture.invoke(self.implementation)
        self.assertEqual(result['exit'], 0, result['text'])
        self.assertEqual(json.loads(fixture.state_file.read_bytes())['sources']['docs/unchanged.md'], untouched)
        self.assertFalse(any('unchanged.md' in arg for call in fixture.commands for arg in call))

    def test_s4_source_root_advances_without_relabelling_untouched_locale(self):
        fixture = self.fixture()
        old = deepcopy(fixture.states['1']['sources'][DOC]['locales']['pt-BR'])
        advanced = SOURCE + b'\nNew policy applies.\n'
        fixture.sources['MERGE_HEAD'] = advanced
        fixture.states['3']['sources'][DOC]['source_hash'] = digest(advanced)
        fixture.put(DOC, advanced)
        fixture.touched = {'HEAD': [], 'MERGE_HEAD': [], 'working': []}
        result = fixture.invoke(self.implementation)
        self.assertEqual(result['exit'], 0, result['text'])
        actual = json.loads(fixture.state_file.read_bytes())['sources'][DOC]
        self.assertEqual(actual['locales']['pt-BR'], old)
        self.assertEqual(actual['source_hash'], digest(advanced))
        self.assertEqual(json.loads(result['text'])['provenRecords'], 0)

    def test_s5_edited_stale_leaf_is_not_exempted(self):
        for scenario in ['timestamp', 'cache', 'incoming-target', 'working-target']:
            with self.subTest(scenario=scenario):
                fixture = self.fixture()
                self.add_stale_french(fixture)
                self.update_local(fixture)
                leaf = fixture.states['3']['sources'][DOC]['locales']['fr']
                path = 'docs/i18n/fr/' + DOC
                if scenario == 'timestamp':
                    leaf['updated_at'] = STAMP
                elif scenario == 'cache':
                    leaf['section_hashes'] = ['a' * 12]
                else:
                    fixture.put(path, b'Unreviewed change')
                    side = 'MERGE_HEAD' if scenario == 'incoming-target' else 'working'
                    fixture.touched[side] = [path]
                self.assert_blocked_without_mutation(fixture)

    def test_s6_unchanged_stale_cache_is_preserved_in_order(self):
        fixture = self.fixture()
        stale = self.add_stale_french(fixture)
        stale['section_hashes'] = ['a' * 12, 'b' * 12]
        for value in fixture.states.values():
            value['sources'][DOC]['locales']['fr'] = deepcopy(stale)
        self.update_local(fixture)
        result = fixture.invoke(self.implementation)
        self.assertEqual(result['exit'], 0, result['text'])
        self.assertEqual(json.loads(fixture.state_file.read_bytes())['sources'][DOC]['locales']['fr'], stale)
        # Historical cache bytes are transported, not revalidated against current English.
        self.assertEqual(json.loads(result['text'])['preservedOutsideDeltaRecords'], 1)

    def outside_hunk_fixture(self, side):
        fixture = self.fixture()
        source = b'# Guide\n\n## Rule\n\nNew policy.\n'
        base = b'# Guide\n\n## Decision\nBASE\n\n## Retained\nOLD\n'
        chosen = b'# Guide\n\n## Decision\nOURS\n\n## Retained\nOLD\n'
        opposite = b'# Guide\n\n## Decision\nTHEIRS\n\n## Retained\nINCOMING_KEEP\n'
        conflict = (b'# Guide\n\n## Decision\n<<<<<<< HEAD\nOURS\n=======\nTHEIRS\n'
                    b'>>>>>>> incoming\n\n## Retained\nINCOMING_KEEP\n')
        for stage in fixture.states:
            leaf = {'source_hash': digest(source), 'target_hash': digest(base),
                    'section_hashes': ['93804d300e53'], 'updated_at': '2026-11-01T00:00:00.000Z'}
            fixture.states[stage] = {'sources': {DOC: {'source_hash': digest(source), 'locales': {'pt-BR': leaf}}}}
        chosen_stage, other_stage = ('2', '3') if side == 'ours' else ('3', '2')
        fixture.states[chosen_stage]['sources'][DOC]['locales']['pt-BR'].update(
            target_hash=digest(chosen), updated_at=STAMP)
        fixture.stage_targets[chosen_stage][MIRROR] = chosen
        fixture.stage_targets[other_stage][MIRROR] = opposite
        if side == 'theirs':
            conflict = conflict.replace(b'HEAD\nOURS\n=======\nTHEIRS', b'HEAD\nTHEIRS\n=======\nOURS')
        fixture.sources = {'HEAD': source, 'MERGE_HEAD': source}
        fixture.put(DOC, source)
        fixture.put(MIRROR, conflict)
        fixture.conflicts = [MIRROR]
        return fixture

    def test_t1_whole_ours_checkout_cannot_erase_incoming_outside_hunks(self):
        fixture = self.outside_hunk_fixture('ours')
        before = (fixture.root / MIRROR).read_bytes()
        self.assert_blocked_without_mutation(fixture)
        self.assertEqual((fixture.root / MIRROR).read_bytes(), before)

    def test_t2_whole_theirs_checkout_cannot_erase_local_outside_hunks(self):
        fixture = self.outside_hunk_fixture('theirs')
        before = (fixture.root / MIRROR).read_bytes()
        self.assert_blocked_without_mutation(fixture)
        self.assertEqual((fixture.root / MIRROR).read_bytes(), before)

    def test_t4_multiple_marker_blocks_preserve_external_bytes_and_empty_arms(self):
        library = runpy.run_path(str(self.implementation), run_name='synthetic_library')
        raw = (b'prefix\n<<<<<<< HEAD\na\n=======\nb\n>>>>>>> incoming\n\n'
               b'middle\n<<<<<<< HEAD\n=======\nx\n>>>>>>> incoming\nsuffix')
        self.assertEqual(library['resolve_markers'](raw, 'ours'), b'prefix\na\n\nmiddle\nsuffix')
        self.assertEqual(library['resolve_markers'](raw, 'theirs'), b'prefix\nb\n\nmiddle\nx\nsuffix')

    def test_t5_bom_crlf_and_eof_bytes_are_preserved(self):
        library = runpy.run_path(str(self.implementation), run_name='synthetic_library')
        raw = b'\xef\xbb\xbfprefix\r\n<<<<<<< HEAD\r\na\r\n=======\r\nb\r\n>>>>>>> incoming\r\nsuffix'
        self.assertEqual(library['resolve_markers'](raw, 'ours'), b'\xef\xbb\xbfprefix\r\na\r\nsuffix')
        self.assertEqual(library['resolve_markers'](b'<<<<<<< H\na\n=======\nb\n>>>>>>> I', 'theirs'), b'b\n')
        self.assertEqual(library['resolve_markers'](b'no final newline', 'ours'), b'no final newline')

    def test_t6_unsupported_or_ambiguous_markers_fail_closed(self):
        library = runpy.run_path(str(self.implementation), run_name='synthetic_library')
        invalid = [
            b'<<<<<<< H\na\n||||||| base\nb\n=======\nc\n>>>>>>> I\n',
            b'<<<<<<<< H\na\n========\nb\n>>>>>>>> I\n',
            b'<<<<<<< H\na\n=======\nb\n',
            b'<<<<<<< H\n<<<<<<< nested\n=======\na\n>>>>>>> I\n',
            b'=======\n', b'>>>>>>> I\n', b'<<<<<<<\n',
            b'<<<<<<< H\na\n======= trailing\nb\n>>>>>>> I\n',
            b'```md\n=======\n```\n', b' <<<<<<< H\n',
            b'```md\n<<<<<<< H\na\n=======\nb\n>>>>>>> I\n```\n',
        ]
        for raw in invalid:
            with self.subTest(raw=raw[:20]), self.assertRaises(library['ProofError']):
                library['resolve_markers'](raw, 'ours')

    def test_t5_full_preflight_keeps_bom_crlf_and_no_final_newline(self):
        fixture = self.fixture()
        target = b'\xef\xbb\xbf# Guia\r\nconteudo\r\nsuffix'
        for value in fixture.states.values():
            value['sources'][DOC]['locales']['pt-BR']['target_hash'] = digest(target)
        fixture.stage_targets['3'][MIRROR] = target
        fixture.conflicts = [MIRROR]
        fixture.put(MIRROR, b'\xef\xbb\xbf# Guia\r\n<<<<<<< H\r\noutro\r\n=======\r\nconteudo\r\n>>>>>>> I\r\nsuffix')
        result = fixture.invoke(self.implementation)
        self.assertEqual(result['exit'], 0, result['text'])
        self.assertEqual((fixture.root / MIRROR).read_bytes(), target)

    def test_t8_marker_free_edited_working_file_cannot_be_overwritten(self):
        fixture = self.fixture()
        fixture.conflicts = [MIRROR]
        fixture.put(MIRROR, TARGET + b'External addition\n')
        self.assert_blocked_without_mutation(fixture)

    def test_g1_selected_symlink_stage_blocks_before_any_mutation(self):
        fixture = self.fixture()
        payload = b'synthetic-target.md'
        for value in fixture.states.values():
            value['sources'][DOC]['locales']['pt-BR']['target_hash'] = digest(payload)
        fixture.stage_targets['3'][MIRROR] = payload
        fixture.stage_modes[('3', MIRROR)] = '120000'
        fixture.conflicts = [MIRROR]
        fixture.put(MIRROR, b'<<<<<<< H\nother\n=======\nsynthetic-target.md\n>>>>>>> I\n')
        self.assertFalse((fixture.root / MIRROR).is_symlink())
        self.assert_blocked_without_mutation(fixture)
        self.assertFalse((fixture.root / MIRROR).is_symlink())

    def test_g1_gitlink_or_nonregular_state_stage_is_also_blocked(self):
        for path, stage, mode in [(MIRROR, '3', '160000'), ('.i18n-state.json', '2', '120000')]:
            fixture = self.fixture()
            fixture.conflicts = [MIRROR]
            fixture.stage_modes[(stage, path)] = mode
            self.assert_blocked_without_mutation(fixture)

    def test_g1_executable_regular_stage_is_supported(self):
        fixture = self.fixture()
        fixture.conflicts = [MIRROR]
        fixture.stage_modes[('3', MIRROR)] = '100755'
        fixture.put(MIRROR, b'<<<<<<< H\nother\n=======\n' + TARGET + b'>>>>>>> I\n')
        result = fixture.invoke(self.implementation)
        self.assertEqual(result['exit'], 0, result['text'])

    def test_g2_git_failures_are_not_empty_snapshots(self):
        for command in ['show', 'rev-parse', 'ls-files', 'merge-base', 'diff']:
            with self.subTest(command=command):
                fixture = self.fixture()
                fixture.fail_command = command
                self.assert_blocked_without_mutation(fixture)

    def test_g3_stage_identity_change_blocks_before_mutation(self):
        for path in [MIRROR, '.i18n-state.json']:
            fixture = self.fixture()
            fixture.conflicts = [MIRROR]
            fixture.change_index_path = path
            fixture.put(MIRROR, b'<<<<<<< H\nother\n=======\n' + TARGET + b'>>>>>>> I\n')
            self.assert_blocked_without_mutation(fixture)

    def test_g3_branch_ref_change_blocks_before_mutation(self):
        for side in ['HEAD', 'MERGE_HEAD']:
            fixture = self.fixture()
            fixture.change_ref = side
            self.assert_blocked_without_mutation(fixture)

    def test_g4_partial_checkout_failure_never_writes_state_or_claims_pass(self):
        fixture = self.fixture()
        french_path = 'docs/i18n/fr/' + DOC
        for value in fixture.states.values():
            value['sources'][DOC]['locales']['fr'] = record()
        for stage in ['2', '3']:
            fixture.stage_targets[stage][french_path] = TARGET
        fixture.conflicts = [MIRROR, french_path]
        for path in fixture.conflicts:
            fixture.put(path, b'<<<<<<< H\nother\n=======\n' + TARGET + b'>>>>>>> I\n')
        fixture.fail_checkout_number = 2
        result = fixture.invoke(self.implementation)
        self.assertNotEqual(result['exit'], 0)
        self.assertFalse(result['stateChanged'])
        self.assertIn('RECOVERY_REQUIRED', result['text'])
        self.assertEqual(fixture.checkout_count, 2)

    def test_g5_mirror_only_conflict_with_stage_zero_state_holds(self):
        fixture = self.fixture()
        fixture.state_unmerged = False
        fixture.state_file.write_text(json.dumps(fixture.states['3']))
        fixture.raw_state = fixture.state_file.read_bytes()
        fixture.conflicts = [MIRROR]
        fixture.put(MIRROR, b'<<<<<<< H\nother\n=======\n' + TARGET + b'>>>>>>> I\n')
        self.assert_blocked_without_mutation(fixture)

    def test_g6_add_cannot_certify_divergent_or_nonregular_index_zero(self):
        for scenario in ['changed-by-filter', 'symlink-mode']:
            with self.subTest(scenario=scenario):
                fixture = self.fixture()
                fixture.conflicts = [MIRROR]
                fixture.put(MIRROR, b'<<<<<<< H\nother\n=======\n' + TARGET + b'>>>>>>> I\n')
                if scenario == 'changed-by-filter':
                    fixture.corrupt_staged_path = MIRROR
                else:
                    fixture.stage_modes[('0', MIRROR)] = '120000'
                result = fixture.invoke(self.implementation)
                self.assertNotEqual(result['exit'], 0, 'UNPROVED_INDEX_BYTES_WERE_ACCEPTED')
                self.assertFalse(result['stateChanged'], 'STATE_WRITTEN_WITH_UNPROVED_INDEX_BYTES')
                self.assertEqual((fixture.root / MIRROR).read_bytes(), TARGET)
                self.assertIn('RECOVERY_REQUIRED', result['text'])

    def test_g6_existing_index_zero_must_match_proved_nonconflicted_target(self):
        fixture = self.fixture()
        fixture.stage_zero[MIRROR] = TARGET + b'Unstaged discrepancy\n'
        self.assert_blocked_without_mutation(fixture)

    def test_g6_state_add_filter_cannot_produce_a_false_pass(self):
        fixture = self.fixture()
        fixture.corrupt_staged_path = '.i18n-state.json'
        result = fixture.invoke(self.implementation)
        self.assertNotEqual(result['exit'], 0, 'UNPROVED_STAGED_STATE_WAS_ACCEPTED')
        self.assertTrue(result['stateChanged'])
        self.assertIn('RECOVERY_REQUIRED', result['text'])


    def test_source_index0_divergent_bytes_or_nonregular_mode_blocks_before_mutation(self):
        for scenario in ['different-bytes', 'symlink', 'gitlink']:
            with self.subTest(scenario=scenario):
                fixture = self.fixture()
                self.update_local(fixture)
                fixture.stage_zero[DOC] = SOURCE + b'Committed policy differs.\n' if scenario == 'different-bytes' else SOURCE
                if scenario != 'different-bytes':
                    fixture.stage_modes[('0', DOC)] = '120000' if scenario == 'symlink' else '160000'
                self.assert_blocked_without_mutation(fixture)

    def test_source_index0_regular_matching_bytes_preserve_the_proven_tuple(self):
        fixture = self.fixture()
        self.update_local(fixture)
        fixture.stage_zero[DOC] = SOURCE
        fixture.stage_modes[('0', DOC)] = '100644'
        expected = deepcopy(fixture.states['2'])
        result = fixture.invoke(self.implementation)
        self.assertEqual(result['exit'], 0, result['text'])
        self.assertEqual(json.loads(fixture.state_file.read_bytes()), expected)
        self.assertEqual(fixture.stage_zero[DOC], SOURCE)
        self.assertEqual((fixture.root / DOC).read_bytes(), SOURCE)
        self.assertEqual(json.loads(result['text'])['provenRecords'], 1)

    def test_source_index0_changed_by_target_add_blocks_before_state_write(self):
        fixture = self.fixture()
        fixture.stage_zero[DOC] = SOURCE
        fixture.conflicts = [MIRROR]
        fixture.put(MIRROR, b'<<<<<<< H\nother\n=======\n' + TARGET + b'>>>>>>> I\n')
        fixture.corrupt_source_on_add = MIRROR
        result = fixture.invoke(self.implementation)
        self.assertNotEqual(result['exit'], 0, 'DIVERGENT_CANONICAL_INDEX_WAS_ACCEPTED')
        self.assertFalse(result['stateChanged'], 'STATE_WRITTEN_AFTER_SOURCE_INDEX_DRIFT')
        self.assertEqual((fixture.root / DOC).read_bytes(), SOURCE)
        self.assertIn('RECOVERY_REQUIRED', result['text'])

    def test_source_index0_changed_by_state_add_cannot_publish_pass(self):
        fixture = self.fixture()
        self.update_local(fixture)
        fixture.stage_zero[DOC] = SOURCE
        fixture.corrupt_source_on_add = '.i18n-state.json'
        result = fixture.invoke(self.implementation)
        self.assertNotEqual(result['exit'], 0, 'DIVERGENT_CANONICAL_INDEX_WAS_ACCEPTED')
        self.assertTrue(result['stateChanged'])
        self.assertEqual((fixture.root / DOC).read_bytes(), SOURCE)
        self.assertIn('RECOVERY_REQUIRED', result['text'])


    def test_state_add_cannot_change_a_proven_mirror_index_and_publish_pass(self):
        fixture = self.fixture()
        self.update_local(fixture)
        fixture.stage_zero[DOC] = SOURCE
        fixture.corrupt_mirror_on_state_add = True
        result = fixture.invoke(self.implementation)
        self.assertNotEqual(result['exit'], 0, 'DIVERGENT_PROVEN_MIRROR_INDEX_WAS_ACCEPTED')
        self.assertTrue(result['stateChanged'])
        self.assertEqual((fixture.root / DOC).read_bytes(), SOURCE)
        self.assertIn('INDEX_BYTES_UNPROVEN', result['text'])
        self.assertIn('RECOVERY_REQUIRED', result['text'])


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--implementation', choices=['legacy', 'proposal'], required=True)
    parser.add_argument('--receipt')
    parser.add_argument('--resolver', required=True)
    parser.add_argument('--fixtures-root', required=True)
    parser.add_argument('--all-proposal-cases', action='store_true')
    parser.add_argument('--review-regressions', action='store_true')
    parser.add_argument('--staged-regressions', action='store_true')
    parser.add_argument('--source-index-regressions', action='store_true')
    parser.add_argument('--final-readback-regression', action='store_true')
    parser.add_argument('--cache-fixtures', action='store_true')
    args = parser.parse_args()
    implementation = Path(args.resolver).resolve()
    if args.cache_fixtures:
        examples = json.load(sys.stdin)
        assert isinstance(examples, list) and 0 < len(examples) <= 16
        assert all(isinstance(value, str) and len(value) <= 8192 for value in examples)
        library = runpy.run_path(str(implementation), run_name='synthetic_cache_library')
        print(json.dumps([{'sourceText': value, 'hashes': library['section_hashes'](value.encode())}
                          for value in examples]))
        sys.exit(0)
    FIXTURE_PARENT = Path(args.fixtures_root).resolve()
    FIXTURE_PARENT.mkdir(parents=True, exist_ok=True)
    RegressionTests.implementation = implementation
    ProposalTests.implementation = implementation
    ReviewTests.implementation = implementation
    if args.final_readback_regression:
        suite = unittest.TestSuite([ReviewTests(
            'test_state_add_cannot_change_a_proven_mirror_index_and_publish_pass')])
    elif args.source_index_regressions:
        suite = unittest.TestSuite(ReviewTests(name) for name in [
            'test_source_index0_divergent_bytes_or_nonregular_mode_blocks_before_mutation',
            'test_source_index0_regular_matching_bytes_preserve_the_proven_tuple',
            'test_source_index0_changed_by_target_add_blocks_before_state_write',
            'test_source_index0_changed_by_state_add_cannot_publish_pass',
        ])
    elif args.staged_regressions:
        suite = unittest.TestSuite(ReviewTests(name) for name in [
            'test_g6_add_cannot_certify_divergent_or_nonregular_index_zero',
            'test_g6_existing_index_zero_must_match_proved_nonconflicted_target',
            'test_g6_state_add_filter_cannot_produce_a_false_pass',
        ])
    elif args.review_regressions:
        suite = unittest.TestSuite(ReviewTests(name) for name in [
            'test_s1_unchanged_stale_locale_does_not_block_other_valid_locale',
            'test_t1_whole_ours_checkout_cannot_erase_incoming_outside_hunks',
            'test_t2_whole_theirs_checkout_cannot_erase_local_outside_hunks',
            'test_g1_selected_symlink_stage_blocks_before_any_mutation',
        ])
    else:
        suite = unittest.defaultTestLoader.loadTestsFromTestCase(ReviewTests if args.all_proposal_cases else RegressionTests)
    result = unittest.TestResult()
    suite.run(result)
    receipt = {'schemaVersion': 1, 'classification': 'SYNTHETIC_PYTHON_ONLY',
               'implementation': args.implementation, 'testsRun': result.testsRun,
               'failures': [getattr(getattr(case, 'test_case', case), '_testMethodName') for case, _ in result.failures],
               'errors': [getattr(getattr(case, 'test_case', case), '_testMethodName') for case, _ in result.errors],
               'externalProcessesExecuted': 0, 'realStateReadOrWritten': False,
               'nodeExecuted': False, 'nativeNetworkIsolationClaimed': False,
               'status': 'PASS' if result.wasSuccessful() else 'FAIL'}
    receipt['implementationSha256'] = digest(implementation.read_bytes())
    receipt['testSha256'] = digest(Path(__file__).read_bytes())
    if args.receipt:
        output = Path(args.receipt).resolve()
        assert output.parent.is_dir() and not output.exists()
        output.write_text(json.dumps(receipt, indent=2) + '\n')
    print(json.dumps(receipt))
    sys.exit(0 if result.wasSuccessful() else 1)
