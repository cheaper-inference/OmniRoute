"""Parse the actual workflow CLI with the installed, locked scanner. No HTTP calls."""
from contextlib import chdir
import importlib.metadata
import json
from pathlib import Path
import shlex
import unittest
from unittest.mock import patch

import click
import yaml
from schemathesis.cli import schemathesis

ROOT = Path(__file__).resolve().parents[3]
WORKFLOW = yaml.safe_load((ROOT / ".github/workflows/dast-smoke.yml").read_text())
STEPS = WORKFLOW["jobs"]["dast-smoke"]["steps"]


class DastToolchain(unittest.TestCase):
    def test_installed_python_distribution_versions_match_locked_requirements(self):
        pins = (ROOT / "config/quality/requirements-dast.txt").read_text().splitlines()
        self.assertTrue(any(line.startswith("schemathesis==") for line in pins))
        for line in pins:
            if not line or line.startswith("#"):
                continue
            name, version = line.split("==")
            with self.subTest(distribution=name):
                self.assertEqual(importlib.metadata.version(name), version)

    def test_real_schemathesis_arguments_parse_without_network_or_scanning(self):
        run = next(step["run"] for step in STEPS if step.get("name", "").startswith("Schemathesis smoke"))
        args = shlex.split(run.replace("\\\n", " "), comments=True)
        self.assertEqual(args[:4], ["schemathesis", "--config-file", "config/quality/dast-smoke.toml", "run"])
        with chdir(ROOT), patch("socket.create_connection", side_effect=AssertionError("network forbidden")):
            parent = schemathesis.make_context("schemathesis", args[1:4])
            with parent:
                parent.invoke(schemathesis.callback, **parent.params)
            context = schemathesis.commands["run"].make_context("run", args[4:], parent=parent)
        self.assertEqual(parent.obj.projects.default.hooks, "scripts/check/dast-body-size-contract.py")
        self.assertEqual(context.params["base_url"], "http://localhost:20128")
        self.assertEqual(context.params["generation_max_examples"], 8)
        self.assertEqual(context.params["workers"], 4)
        self.assertEqual(context.params["included_check_names"], ["all"])
        self.assertEqual(context.params["max_response_time"], 30)
        self.assertEqual(context.params["request_timeout"], 20)
        self.assertTrue(context.params["no_color"])
        self.assertEqual(context.params["include_path_regex"], "^/api/v1/(chat/completions|models)$|^/api/(auth|keys)")
        self.assertEqual(context.params["exclude_path_regex"], "^/api/auth/(oidc/|login)")

    def test_unknown_cli_argument_is_rejected(self):
        with self.assertRaises(click.NoSuchOption):
            schemathesis.commands["run"].make_context("run", ["docs/openapi.yaml", "--invalid-dast-option"])

    def test_promptfoo_uses_local_lockfile_version_and_no_global_install(self):
        package = json.loads((ROOT / "package.json").read_text())
        lock = json.loads((ROOT / "package-lock.json").read_text())
        version = package["devDependencies"]["promptfoo"]
        self.assertEqual(lock["packages"]["node_modules/promptfoo"]["version"], version)
        command = next(step["run"] for step in STEPS if step.get("name") == "promptfoo injection-guard (blocking)")
        self.assertEqual(command, "./node_modules/.bin/promptfoo eval -c promptfooconfig.yaml --no-cache")
        self.assertFalse(any("npm install -g" in step.get("run", "") for step in STEPS))
        self.assertTrue(any("requirements-dast.txt" in step.get("run", "") for step in STEPS))


if __name__ == "__main__":
    unittest.main()
