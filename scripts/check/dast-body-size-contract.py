"""Constrain the one operation-specific 413 expected by the DAST smoke."""

import re
from urllib.parse import urlsplit

import schemathesis


# The smoke does not override MAX_BODY_SIZE_BYTES. Keep this tied to its real
# proxy/bodySizeGuard regression; this is not a general HTTP 413 exception.
BODY_LIMIT = 10 * 1024 * 1024
OPERATION_PATH = "/api/keys/{id}/access"
EXPECTED_BODY = {
    "error": {
        "message": "Request body too large. Maximum allowed: 10 MB",
        "type": "payload_too_large",
        "code": "PAYLOAD_TOO_LARGE",
    }
}


def _declared_above_limit(value):
    """Match the guard's decimal parseInt prefix, without reading request data."""
    if not isinstance(value, str):
        return False
    # ECMAScript WhiteSpace and LineTerminator; Python \s also accepts NEL/FS/GS/RS/US.
    match = re.match(
        r"^[\u0009-\u000d\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]*([+-]?)([0-9]+)",
        value,
    )
    if match is None or match[1] == "-":
        return False
    digits = match[2].lstrip("0") or "0"
    limit = str(BODY_LIMIT)
    return len(digits) > len(limit) or (len(digits) == len(limit) and digits > limit)


def _require(condition, code):
    if not condition:
        raise AssertionError(code)


@schemathesis.check
def body_size_rejection_contract(ctx, response, case):
    """A 413 is justified only by this method, declared size and exact envelope."""
    if response.status_code != 413:
        return
    _require(
        case.operation.path == OPERATION_PATH
        and case.operation.method.upper() == "POST"
        and case.method.upper() == "POST"
        and response.request.method == "POST",
        "BODY_LIMIT_OPERATION_MISMATCH",
    )
    _require(
        re.fullmatch(r"/api/keys/[^/]+/access", urlsplit(response.request.url).path)
        is not None,
        "BODY_LIMIT_SENT_PATH_MISMATCH",
    )
    _require(
        _declared_above_limit(response.request.headers.get("Content-Length")),
        "BODY_LIMIT_DECLARATION_NOT_OVERSIZE",
    )
    content_types = response.headers.get("content-type", [])
    _require(
        len(content_types) == 1
        and content_types[0].split(";", 1)[0].strip().lower() == "application/json",
        "BODY_LIMIT_RESPONSE_CONTENT_TYPE",
    )
    # Declared size is checked before the product consumes the body. Deliberately
    # do not require it to equal the actual body length or inspect request data.
    try:
        body = response.json()
    except (ValueError, UnicodeError):
        raise AssertionError("BODY_LIMIT_RESPONSE_NOT_JSON") from None
    _require(body == EXPECTED_BODY, "BODY_LIMIT_RESPONSE_ENVELOPE")
