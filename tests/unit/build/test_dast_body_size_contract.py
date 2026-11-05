"""Exercise the actual locked scanner against local request/response fixtures."""

from contextlib import chdir
import copy
import importlib.metadata
import json
from pathlib import Path
import unittest
from unittest.mock import patch

import requests
import schemathesis
from schemathesis.checks import CHECKS, CheckContext
from schemathesis.config import SchemathesisConfig
from schemathesis.config._checks import NegativeDataRejectionConfig
from schemathesis.core.failures import AcceptedNegativeData
from schemathesis.core.parameters import ParameterLocation
from schemathesis.core.transport import Response
from schemathesis.generation import GenerationMode
from schemathesis.generation.meta import (
    CaseMetadata,
    ComponentInfo,
    FuzzingPhaseData,
    GenerationInfo,
    PhaseInfo,
    TestPhase,
)
from schemathesis.openapi.checks import JsonSchemaError, UndefinedStatusCode
from schemathesis.specs.openapi.checks import (
    negative_data_rejection,
    response_schema_conformance,
    status_code_conformance,
)


ROOT = Path(__file__).resolve().parents[3]
LIMIT = 10 * 1024 * 1024
PATH = "/api/keys/{id}/access"
ENVELOPE = {
    "error": {
        "message": "Request body too large. Maximum allowed: 10 MB",
        "type": "payload_too_large",
        "code": "PAYLOAD_TOO_LARGE",
    }
}


class DastBodySizeContract(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # Both HTTP dispatch and socket connection attempts fail this offline test.
        cls.connection = patch("socket.create_connection", side_effect=AssertionError("NETWORK_FORBIDDEN"))
        cls.dispatch = patch("requests.Session.send", side_effect=AssertionError("NETWORK_FORBIDDEN"))
        cls.connection.start()
        cls.dispatch.start()
        cls.addClassCleanup(cls.connection.stop)
        cls.addClassCleanup(cls.dispatch.stop)
        with chdir(ROOT):
            cls.config = SchemathesisConfig.from_path("config/quality/dast-smoke.toml")
            cls.schema = schemathesis.openapi.from_path("docs/openapi.yaml", config=cls.config)
        cls.check = staticmethod(CHECKS.get_one("body_size_rejection_contract"))

    def fixture(self, *, path=PATH, method="POST", declared=str(LIMIT + 1), body="", status=413, envelope=None):
        operation = self.schema[path]["POST"]
        meta = CaseMetadata(
            generation=GenerationInfo(time=0.0, mode=GenerationMode.NEGATIVE),
            components={ParameterLocation.BODY: ComponentInfo(mode=GenerationMode.NEGATIVE)},
            phase=PhaseInfo(
                name=TestPhase.FUZZING,
                data=FuzzingPhaseData(None, None, ParameterLocation.BODY, None),
            ),
        )
        case = operation.Case(
            method=method,
            path_parameters={"id": "local-fixture"} if "{id}" in path else {},
            body=body,
            media_type="application/json",
            _meta=meta,
        )
        request = requests.Request(
            method,
            "http://localhost:20128" + case.formatted_path,
            data=json.dumps(body).encode(),
            headers={"Content-Type": "application/json"},
        ).prepare()
        if declared is None:
            request.headers.pop("Content-Length", None)
        else:
            request.headers["Content-Length"] = declared
        response = Response(
            status_code=status,
            headers={"content-type": ["application/json"]},
            content=json.dumps(ENVELOPE if envelope is None else envelope).encode(),
            request=request,
            elapsed=0.001,
            verify=True,
        )
        context = CheckContext(
            override=None,
            auth=None,
            headers=None,
            config=self.schema.config.checks_config_for(operation=operation),
            transport_kwargs=None,
            response_checks=None,
        )
        return context, response, case

    def test_locked_runtime_is_the_hosted_scanner(self):
        self.assertEqual(importlib.metadata.version("schemathesis"), "4.32.7")

    def test_configuration_preserves_default_checks_and_other_operations(self):
        context, _, _ = self.fixture()
        defaults = set(NegativeDataRejectionConfig().expected_statuses)
        scoped = set(context.config.negative_data_rejection.expected_statuses)
        self.assertTrue(defaults <= scoped)
        self.assertLessEqual(scoped - defaults, {"413"})
        other, _, _ = self.fixture(path="/api/keys")
        self.assertEqual(set(other.config.negative_data_rejection.expected_statuses), defaults)
        for registered in CHECKS.get_all():
            self.assertTrue(context.config.get_by_name(name=registered.__name__).enabled)
        self.assertIn(self.check, context.internals.checks)

    def test_real_negative_check_accepts_only_proven_oversize_rejections(self):
        for body in ("x" * LIMIT, ""):
            args = self.fixture(body=body)
            self.check(*args)
            negative_data_rejection(*args)
            status_code_conformance(*args)
            response_schema_conformance(*args)
        for prefix in ("\t\n\v\f\r ", "\u00a0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000\ufeff"):
            args = self.fixture(declared=prefix + "+0" + str(LIMIT + 1) + "suffix")
            self.check(*args)
            negative_data_rejection(*args)

    def test_arbitrary_413_without_an_oversize_declaration_fails(self):
        invalid_prefixes = ("\u0085", "\u001c", "\u001d", "\u001e", "\u001f")
        declarations = (None, "invalid", "-1", "0", str(LIMIT - 1), str(LIMIT))
        declarations += tuple(prefix + str(LIMIT + 1) for prefix in invalid_prefixes)
        for declared in declarations:
            with self.subTest(declared=declared):
                with self.assertRaisesRegex(AssertionError, "BODY_LIMIT_DECLARATION_NOT_OVERSIZE"):
                    self.check(*self.fixture(declared=declared))

    def test_other_operation_method_or_sent_path_cannot_use_the_exception(self):
        other = self.fixture(path="/api/keys")
        with self.assertRaisesRegex(AssertionError, "BODY_LIMIT_OPERATION_MISMATCH"):
            self.check(*other)
        with self.assertRaises(AcceptedNegativeData):
            negative_data_rejection(*other)
        with self.assertRaisesRegex(AssertionError, "BODY_LIMIT_OPERATION_MISMATCH"):
            self.check(*self.fixture(method="QUERY"))
        args = self.fixture()
        args[1].request.url = "http://localhost:20128/api/auth/status"
        with self.assertRaisesRegex(AssertionError, "BODY_LIMIT_SENT_PATH_MISMATCH"):
            self.check(*args)

    def test_malformed_envelopes_fail_custom_and_openapi_checks(self):
        malformed = [{"error": "too large"}]
        for field, value in (("type", "other"), ("code", "OTHER"), ("message", "")):
            item = copy.deepcopy(ENVELOPE)
            item["error"][field] = value
            malformed.append(item)
        missing = copy.deepcopy(ENVELOPE)
        del missing["error"]["message"]
        malformed.append(missing)
        extra = copy.deepcopy(ENVELOPE)
        extra["error"]["stack"] = "forbidden"
        malformed.append(extra)
        for envelope in malformed:
            with self.subTest(envelope=envelope):
                args = self.fixture(envelope=envelope)
                with self.assertRaisesRegex(AssertionError, "BODY_LIMIT_RESPONSE_ENVELOPE"):
                    self.check(*args)
                with self.assertRaises(JsonSchemaError):
                    response_schema_conformance(*args)
        args = self.fixture()
        args[1].headers["content-type"] = ["text/plain"]
        with self.assertRaisesRegex(AssertionError, "BODY_LIMIT_RESPONSE_CONTENT_TYPE"):
            self.check(*args)

    def test_negative_input_with_2xx_still_fails_the_builtin_check(self):
        args = self.fixture(status=200)
        self.check(*args)
        with self.assertRaises(AcceptedNegativeData):
            negative_data_rejection(*args)

    def test_undocumented_status_still_fails_status_conformance(self):
        args = self.fixture(status=418)
        with self.assertRaises(UndefinedStatusCode):
            status_code_conformance(*args)


if __name__ == "__main__":
    unittest.main()
