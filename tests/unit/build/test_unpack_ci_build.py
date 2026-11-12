import hashlib
import importlib.util
import json
from pathlib import Path
import stat
import subprocess
import sys
import tempfile
import unittest
import zipfile


SCRIPT = Path(__file__).resolve().parents[3] / "scripts/ci/unpack-ci-build.py"
SPEC = importlib.util.spec_from_file_location("unpack_ci_build", SCRIPT)
MODULE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(MODULE)


class UnpackBuildTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix="dast-zip-fixture-")
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.download = self.root / "download"
        self.download.mkdir()
        self.destination = self.root / "extracted"
        self.artifact = self.download / "name-chosen-by-artifact-service.zip"

    def make_zip(self, members=None):
        if members is None:
            members = [("e2e-build.tar.gz", b"fixture tar"), ("next-build-provenance.json", b"{}")]
        with zipfile.ZipFile(self.artifact, "w", compression=zipfile.ZIP_DEFLATED) as zipped:
            for name, content in members:
                zipped.writestr(name, content)
        return hashlib.sha256(self.artifact.read_bytes()).hexdigest()

    def test_exact_zip_is_hashed_and_only_expected_members_are_extracted(self):
        digest = self.make_zip()
        receipt = MODULE.unpack(self.download, self.destination, "sha256:" + digest, "1234")
        self.assertEqual(receipt["sha256"], digest)
        self.assertEqual(receipt["artifactId"], "1234")
        self.assertEqual((self.destination / "e2e-build.tar.gz").read_bytes(), b"fixture tar")
        self.assertEqual(json.loads((self.destination / "zip-verification.json").read_text()), receipt)

    def test_wrong_digest_rejects_before_any_extraction(self):
        self.make_zip()
        with self.assertRaisesRegex(ValueError, "BUILD_ZIP_DIGEST_MISMATCH"):
            MODULE.unpack(self.download, self.destination, "0" * 64, "1234")
        self.assertFalse(self.destination.exists())

    def test_missing_duplicate_and_symlink_downloads_are_not_selected(self):
        with self.assertRaisesRegex(ValueError, "BUILD_ZIP_AMBIGUOUS_OR_MISSING"):
            MODULE.unpack(self.download, self.destination, "0" * 64, "1234")
        digest = self.make_zip()
        extra = self.download / "another.zip"
        extra.write_bytes(b"extra")
        with self.assertRaisesRegex(ValueError, "BUILD_ZIP_AMBIGUOUS_OR_MISSING"):
            MODULE.unpack(self.download, self.destination, digest, "1234")
        extra.unlink()
        self.artifact.rename(self.root / "outside.zip")
        self.artifact.symlink_to(self.root / "outside.zip")
        with self.assertRaisesRegex(ValueError, "BUILD_ZIP_AMBIGUOUS_OR_MISSING"):
            MODULE.unpack(self.download, self.destination, digest, "1234")

    def test_archive_paths_duplicates_links_and_missing_members_are_rejected(self):
        link = zipfile.ZipInfo("e2e-build.tar.gz")
        link.create_system = 3
        link.external_attr = (stat.S_IFLNK | 0o777) << 16
        cases = [
            [("../e2e-build.tar.gz", b"x"), ("next-build-provenance.json", b"{}")],
            [("e2e-build.tar.gz", b"x")],
            [("e2e-build.tar.gz", b"x"), ("next-build-provenance.json", b"{}"), ("unexpected", b"x")],
            [("e2e-build.tar.gz", b"x"), ("e2e-build.tar.gz", b"duplicate")],
            [(link, b"../../outside"), ("next-build-provenance.json", b"{}")],
            [("e2e-build.tar.gz", b""), ("next-build-provenance.json", b"{}")],
            [("e2e-build.tar.gz", b"x"), ("next-build-provenance.json", b"x" * 65537)],
        ]
        for members in cases:
            with self.subTest(names=[str(name) for name, _ in members]):
                digest = self.make_zip(members)
                with self.assertRaises(ValueError):
                    MODULE.unpack(self.download, self.destination, digest, "1234")
                self.assertFalse(self.destination.exists())

    def test_corrupt_zip_with_a_valid_digest_is_not_an_empty_success(self):
        self.artifact.write_bytes(b"not a zip")
        digest = hashlib.sha256(self.artifact.read_bytes()).hexdigest()
        with self.assertRaises(zipfile.BadZipFile):
            MODULE.unpack(self.download, self.destination, digest, "1234")
        self.assertFalse(self.destination.exists())

    def test_existing_destination_is_not_overwritten(self):
        digest = self.make_zip()
        self.destination.mkdir()
        sentinel = self.destination / "sentinel"
        sentinel.write_text("preserve")
        with self.assertRaises(FileExistsError):
            MODULE.unpack(self.download, self.destination, digest, "1234")
        self.assertEqual(sentinel.read_text(), "preserve")

    def test_cli_preserves_failure_exit_without_extraction(self):
        self.make_zip()
        result = subprocess.run(
            [sys.executable, str(SCRIPT), str(self.download), str(self.destination)],
            env={"NEXT_BUILD_ARTIFACT_DIGEST": "0" * 64, "NEXT_BUILD_ARTIFACT_ID": "1234"},
            capture_output=True, text=True, timeout=5,
        )
        self.assertEqual(result.returncode, 1)
        self.assertIn("BUILD_ZIP_DIGEST_MISMATCH", result.stderr)
        self.assertFalse(self.destination.exists())


if __name__ == "__main__":
    unittest.main()
