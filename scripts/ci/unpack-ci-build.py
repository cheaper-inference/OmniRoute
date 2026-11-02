#!/usr/bin/env python3
"""Verify the uploaded ZIP digest before extracting the two CI build members."""

import hashlib
import json
import os
from pathlib import Path
import re
import shutil
import stat
import sys
import zipfile


def unpack(download_dir, output_dir, digest, artifact_id):
    expected_digest = digest.removeprefix("sha256:")
    if re.fullmatch(r"[a-f0-9]{64}", expected_digest) is None:
        raise ValueError("BUILD_ZIP_DIGEST_INVALID")
    if re.fullmatch(r"[1-9][0-9]*", artifact_id) is None:
        raise ValueError("BUILD_ARTIFACT_ID_INVALID")
    candidates = list(Path(download_dir).iterdir())
    if len(candidates) != 1 or not stat.S_ISREG(candidates[0].lstat().st_mode):
        raise ValueError("BUILD_ZIP_AMBIGUOUS_OR_MISSING")
    artifact = candidates[0]
    with artifact.open("rb") as source:
        actual_digest = hashlib.file_digest(source, "sha256").hexdigest()
    if actual_digest != expected_digest:
        raise ValueError("BUILD_ZIP_DIGEST_MISMATCH")
    with zipfile.ZipFile(artifact) as zipped:
        members = zipped.infolist()
        names = [entry.filename for entry in members]
        if len(names) != 2 or set(names) != {"e2e-build.tar.gz", "next-build-provenance.json"}:
            raise ValueError("BUILD_ZIP_MEMBERS_INVALID")
        for entry in members:
            mode = stat.S_IFMT(entry.external_attr >> 16)
            if entry.is_dir() or mode not in (0, stat.S_IFREG) or entry.file_size <= 0:
                raise ValueError("BUILD_ZIP_MEMBER_INVALID")
            if entry.filename == "next-build-provenance.json" and entry.file_size > 65536:
                raise ValueError("BUILD_MANIFEST_TOO_LARGE")
        destination = Path(output_dir)
        destination.mkdir(parents=True, exist_ok=False)
        for entry in members:
            # Filenames were matched exactly; no extraction of arbitrary ZIP paths.
            with zipped.open(entry) as source, (destination / entry.filename).open("xb") as target:
                shutil.copyfileobj(source, target, length=1024 * 1024)
    receipt = {
        "schemaVersion": 1,
        "artifactId": artifact_id,
        "sha256": actual_digest,
        "bytes": artifact.stat().st_size,
    }
    (destination / "zip-verification.json").write_text(json.dumps(receipt) + "\n", encoding="utf-8")
    return receipt


if __name__ == "__main__":
    try:
        if len(sys.argv) != 3:
            raise ValueError("BUILD_ZIP_USAGE_INVALID")
        receipt = unpack(
            sys.argv[1], sys.argv[2],
            os.environ.get("NEXT_BUILD_ARTIFACT_DIGEST", ""),
            os.environ.get("NEXT_BUILD_ARTIFACT_ID", ""),
        )
        print(f"Next build ZIP verified: {receipt['sha256']}")
    except (ValueError, OSError, zipfile.BadZipFile) as error:
        message = str(error) if isinstance(error, ValueError) else type(error).__name__
        print(f"unpack-ci-build: {message}", file=sys.stderr)
        sys.exit(1)
