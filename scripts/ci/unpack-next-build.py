#!/usr/bin/env python3
"""Verify the Actions ZIP and inspect the tar before the workflow extracts it.

Uses only Python's standard library. Payload bytes are streamed; tar links that
remain inside .build/next are allowed, including npm .bin links and hard links.
"""

import hashlib
import json
import os
from pathlib import Path, PurePosixPath
import posixpath
import re
import shutil
import stat
import sys
import tarfile
import zipfile

ARCHIVE = "e2e-build.tar.gz"
MANIFEST = "next-build-provenance.json"
MAX_ARCHIVE = 64 * 1024**3
MAX_MEMBERS = 500000


def require(condition, code):
    if not condition:
        raise ValueError(code)


def hash_file(path):
    require(path.is_file() and not path.is_symlink(), "regular-zip-required")
    digest = hashlib.sha256()
    with path.open("rb") as source:
        for chunk in iter(lambda: source.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def unpack(directory, destination):
    artifact_id = os.environ.get("NEXT_BUILD_ARTIFACT_ID", "")
    expected = os.environ.get("NEXT_BUILD_ARTIFACT_DIGEST", "").removeprefix("sha256:")
    require(re.fullmatch(r"[1-9][0-9]{0,19}", artifact_id), "artifact-id-required")
    require(re.fullmatch(r"[0-9a-f]{64}", expected), "artifact-digest-required")
    require(directory.is_dir() and not directory.is_symlink(), "zip-directory-invalid")
    entries = list(directory.rglob("*"))
    require(not any(entry.is_symlink() for entry in entries), "zip-symlink-invalid")
    files = [entry for entry in entries if entry.is_file()]
    require(len(files) == 1, "one-exact-artifact-required")
    archive = files[0]
    require(0 < archive.stat().st_size <= MAX_ARCHIVE, "zip-size-invalid")
    require(hash_file(archive) == expected, "zip-digest-mismatch")
    with zipfile.ZipFile(archive) as bundle:
        members = bundle.infolist()
        require(len(members) == 2 and {member.filename for member in members} ==
                {ARCHIVE, MANIFEST}, "zip-members-invalid")
        for member in members:
            mode = stat.S_IFMT(member.external_attr >> 16)
            require(not member.is_dir() and mode in (0, stat.S_IFREG), "zip-member-type-invalid")
            require(not member.flag_bits & 1, "encrypted-zip-invalid")
            ceiling = 65536 if member.filename == MANIFEST else MAX_ARCHIVE
            require(0 < member.file_size <= ceiling, "zip-member-size-invalid")
        require(not destination.exists() and not destination.is_symlink(), "zip-destination-exists")
        destination.mkdir(parents=True)
        for member in members:
            # Exact names above: no ZIP path is interpreted as a filesystem path.
            with bundle.open(member) as source, (destination / member.filename).open("xb") as target:
                shutil.copyfileobj(source, target, length=1024 * 1024)
            require((destination / member.filename).stat().st_size == member.file_size,
                    "zip-member-truncated")
    proof = {"schemaVersion": 1, "artifactId": artifact_id,
             "sha256": expected, "sizeBytes": archive.stat().st_size}
    (destination / "zip-verification.json").write_text(json.dumps(proof) + "\n", encoding="utf-8")


def member_path(value):
    require(isinstance(value, str) and value and
            not re.search(r"[\\\x00-\x1f\x7f:]", value), "tar-path-invalid")
    require(not value.startswith("/") and ".." not in value.split("/"), "tar-path-escape")
    path = str(PurePosixPath(value))
    require(path == ".build/next" or path.startswith(".build/next/"), "tar-path-escape")
    require(path != ".build/next/.omniroute-next-input.json" and
            path != ".build/next/cache" and not path.startswith(".build/next/cache/"),
            "tar-excluded-member")
    return path


def inspect_tar(archive):
    require(archive.is_file() and not archive.is_symlink(), "regular-tar-required")
    # No existing link or previous output may influence extraction. Never delete
    # an old output here to turn a failed verification into an apparent fresh one.
    build = Path(".build")
    require(not build.is_symlink() and (not build.exists() or build.is_dir()), "tar-parent-invalid")
    target = build / "next"
    require(not target.exists() and not target.is_symlink(), "tar-destination-exists")
    members = {}
    total = 0
    with tarfile.open(archive, "r:gz") as bundle:
        for member in bundle:
            name = member_path(member.name)
            require(name not in members, "duplicate-tar-member")
            require(len(members) < MAX_MEMBERS, "tar-member-limit")
            require(member.isdir() or member.isfile() or member.issym() or member.islnk(),
                    "special-tar-member")
            require(not member.sparse, "sparse-tar-member")
            require(member.size >= 0, "tar-size-invalid")
            total += member.size
            require(total <= MAX_ARCHIVE, "tar-byte-limit")
            members[name] = member
    require(members.get(".build/next") is not None and members[".build/next"].isdir(),
            "tar-root-invalid")
    for required in (".build/next/BUILD_ID", ".build/next/standalone/server.js"):
        require(required in members and members[required].isfile() and members[required].size > 0,
                "tar-next-output-missing")
    for name, member in members.items():
        for parent in PurePosixPath(name).parents:
            require(str(parent) not in members or members[str(parent)].isdir(), "tar-link-ancestor")
        if member.issym():
            link = member.linkname
            require(link and not link.startswith("/") and
                    not re.search(r"[\\\x00-\x1f\x7f:]", link), "tar-symlink-invalid")
            resolved = posixpath.normpath(posixpath.join(posixpath.dirname(name), link))
            require(resolved == ".build/next" or resolved.startswith(".build/next/"),
                    "tar-symlink-escape")
            require(resolved in members, "tar-symlink-dangling")
        if member.islnk():
            linked = member_path(member.linkname)
            seen = {name}
            while linked in members and members[linked].islnk():
                require(linked not in seen, "tar-hardlink-cycle")
                seen.add(linked)
                linked = member_path(members[linked].linkname)
            require(linked in members and members[linked].isfile(), "tar-hardlink-invalid")


def main():
    if len(sys.argv) == 4 and sys.argv[1] == "unpack":
        unpack(Path(sys.argv[2]), Path(sys.argv[3]))
    elif len(sys.argv) == 3 and sys.argv[1] == "inspect":
        inspect_tar(Path(sys.argv[2]))
    else:
        raise ValueError("transport-usage")


if __name__ == "__main__":
    try:
        main()
    except (OSError, ValueError, RuntimeError, zipfile.BadZipFile, tarfile.TarError, EOFError) as error:
        code = str(error) if isinstance(error, ValueError) and re.fullmatch(r"[a-z][a-z-]+", str(error)) else "transport-incomplete"
        print(f"PREBUILT_NEXT_REQUIRED: {code}", file=sys.stderr)
        sys.exit(1)
