#!/usr/bin/env python3
"""Root-only consistent SQLite snapshots plus configuration; verify every archive."""
import datetime
import json
import os
from pathlib import Path
import shutil
import sqlite3
import tarfile
import tempfile


def sqlite_file(path):
    with path.open('rb') as handle:
        return handle.read(16) == b'SQLite format 3\x00'


def check_databases(root):
    count = 0
    for path in root.rglob('*'):
        if path.is_file() and not path.is_symlink() and sqlite_file(path):
            with sqlite3.connect(path.as_uri() + '?mode=ro', uri=True) as connection:
                if connection.execute('PRAGMA integrity_check').fetchone()[0] != 'ok':
                    raise RuntimeError('Database integrity check failed: ' + str(path))
            count += 1
    return count


def main():
    if os.geteuid() != 0:
        raise SystemExit('Run as root; archives contain private configuration.')
    os.umask(0o077)
    data = Path('/var/lib/omniroute')
    destination = Path('/var/backups/omniroute')
    destination.mkdir(mode=0o700, parents=True, exist_ok=True)
    destination.chmod(0o700)
    stamp = datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%S.%fZ')
    archive = destination / ('omniroute-' + stamp + '.tar.gz')
    with tempfile.TemporaryDirectory(prefix='omniroute-backup-') as temporary:
        root = Path(temporary)
        staged_data = root / 'data'
        staged_data.mkdir()
        for directory, subdirs, files in os.walk(data, followlinks=False):
            subdirs[:] = [name for name in subdirs if name not in {'.cache', '.npm', 'backups'} and not (Path(directory) / name).is_symlink()]
            relative = Path(directory).relative_to(data)
            target = staged_data / relative
            target.mkdir(parents=True, exist_ok=True)
            for name in files:
                source = Path(directory) / name
                if source.is_symlink() or name.endswith(('-wal', '-shm', '-journal')) or not source.is_file():
                    continue
                output = target / name
                if sqlite_file(source):
                    with sqlite3.connect(source.as_uri() + '?mode=ro', uri=True, timeout=60) as original:
                        with sqlite3.connect(output) as snapshot:
                            original.backup(snapshot)
                else:
                    try:
                        shutil.copy2(source, output)
                    except FileNotFoundError:
                        continue  # Ephemeral logs may rotate during the snapshot.
        shutil.copytree('/etc/omniroute', root / 'config')
        current = Path('/opt/omniroute/current')
        (root / 'manifest.json').write_text(json.dumps({'created_utc': stamp, 'release': str(current.resolve()) if current.exists() else None}))
        count = check_databases(staged_data)
        with tarfile.open(archive, 'x:gz') as bundle:
            for child in root.iterdir():
                bundle.add(child, arcname=child.name, recursive=True)
    # Exercise restoration into a fresh private directory, never over live data.
    with tempfile.TemporaryDirectory(prefix='omniroute-restore-test-') as restored:
        with tarfile.open(archive, 'r:gz') as bundle:
            bundle.extractall(restored, filter='data')
        restored_count = check_databases(Path(restored) / 'data')
        if restored_count != count or not (Path(restored) / 'config' / 'omniroute.env').is_file():
            raise RuntimeError('Restoration verification failed')
    print(f'Backup and isolated restore verified: {archive}; SQLite databases: {count}')


if __name__ == '__main__':
    main()
