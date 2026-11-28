package main

import (
	"bufio"
	"bytes"
	"compress/gzip"
	"crypto/tls"
	"encoding/json"
	"io"
	"net"
	"net/http"
	"net/http/httptest"
	"net/url"
	"strings"
	"testing"
)

func doBridgeRequest(
	t *testing.T,
	bridgeURL string,
	token string,
	meta targetMeta,
	body string,
) (bridgeResponseMeta, []byte) {
	t.Helper()
	metaBytes, err := json.Marshal(meta)
	if err != nil {
		t.Fatalf("marshal meta: %v", err)
	}
	var bodyReader io.Reader
	if body != "" {
		bodyReader = strings.NewReader(body)
	}
	req, err := http.NewRequest(http.MethodPost, bridgeURL+"/fetch", bodyReader)
	if err != nil {
		t.Fatalf("new bridge request: %v", err)
	}
	req.Header.Set("X-Bridge-Token", token)
	req.Header.Set("X-Target-Meta", string(metaBytes))
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		t.Fatalf("bridge Do: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		raw, _ := io.ReadAll(resp.Body)
		t.Fatalf("bridge status=%d body=%s", resp.StatusCode, string(raw))
	}

	reader := bufio.NewReader(resp.Body)
	line, err := reader.ReadBytes('\n')
	if err != nil {
		t.Fatalf("read meta line: %v", err)
	}
	var respMeta bridgeResponseMeta
	if err := json.Unmarshal(line, &respMeta); err != nil {
		t.Fatalf("unmarshal response meta: %v", err)
	}
	rest, err := io.ReadAll(reader)
	if err != nil {
		t.Fatalf("read response body: %v", err)
	}
	return respMeta, rest
}

func TestBridgeHTTP11ALPNAndHeaderFidelity(t *testing.T) {
	var seenProto string
	var seenALPN string
	var seenUA string
	var hasAccept bool
	var seenAcceptEncoding string

	upstream := httptest.NewUnstartedServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		seenProto = r.Proto
		if r.TLS != nil {
			seenALPN = r.TLS.NegotiatedProtocol
		}
		seenUA = r.Header.Get("User-Agent")
		_, hasAccept = r.Header["Accept"]
		seenAcceptEncoding = r.Header.Get("Accept-Encoding")

		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Content-Encoding", "gzip")
		gz := gzip.NewWriter(w)
		_, _ = gz.Write([]byte(`{"ok":true}`))
		_ = gz.Close()
	}))
	upstream.TLS = &tls.Config{
		NextProtos: []string{"h2", "http/1.1"},
	}
	upstream.StartTLS()
	defer upstream.Close()

	pool := newTransportPool()
	defer pool.closeAll()
	// Trust the httptest self-signed certificate inside this unit test transport.
	tr, err := buildTransport(targetMeta{})
	if err != nil {
		t.Fatalf("buildTransport: %v", err)
	}
	tr.TLSClientConfig.RootCAs = upstream.Client().Transport.(*http.Transport).TLSClientConfig.RootCAs
	pool.transports[transportKey{}] = tr

	bridge := httptest.NewServer(newBridgeHandler("test-secret", pool))
	defer bridge.Close()

	meta, body := doBridgeRequest(t, bridge.URL, "test-secret", targetMeta{
		URL:    upstream.URL + "/v1internal:streamGenerateContent?alt=sse",
		Method: http.MethodPost,
		Headers: [][]string{
			{"Content-Type", "application/json"},
			{"User-Agent", "antigravity/cli/1.5.18 (aidev_client; os_type=windows; arch=amd64; auth_method=consumer)"},
		},
	}, `{"hello":"world"}`)

	if meta.Status != 200 {
		t.Fatalf("unexpected status: %d", meta.Status)
	}
	if seenProto != "HTTP/1.1" {
		t.Fatalf("expected HTTP/1.1, got %q", seenProto)
	}
	if seenALPN != "http/1.1" {
		t.Fatalf("expected ALPN http/1.1, got %q", seenALPN)
	}
	if !strings.HasPrefix(seenUA, "antigravity/cli/1.5.18") {
		t.Fatalf("unexpected UA: %q", seenUA)
	}
	if hasAccept {
		t.Fatalf("expected Accept header to be omitted")
	}
	if seenAcceptEncoding != "gzip" {
		t.Fatalf("expected Accept-Encoding: gzip, got %q", seenAcceptEncoding)
	}
	if string(body) != `{"ok":true}` {
		t.Fatalf("expected gunzipped body, got %q", string(body))
	}
}

func TestBridgeDefaultGoUserAgentAndManualRedirect(t *testing.T) {
	var seenUA string
	upstream := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		seenUA = r.Header.Get("User-Agent")
		w.Header().Set("Location", "https://example.com/next")
		w.WriteHeader(http.StatusFound)
	}))
	defer upstream.Close()

	pool := newTransportPool()
	defer pool.closeAll()
	bridge := httptest.NewServer(newBridgeHandler("test-secret", pool))
	defer bridge.Close()

	meta, _ := doBridgeRequest(t, bridge.URL, "test-secret", targetMeta{
		URL:      upstream.URL + "/oauth2/v2/userinfo?alt=json",
		Method:   http.MethodGet,
		Redirect: "manual",
		Headers: [][]string{
			{"Authorization", "Bearer tok"},
		},
	}, "")

	if meta.Status != http.StatusFound {
		t.Fatalf("expected 302, got %d", meta.Status)
	}
	if seenUA != "Go-http-client/1.1" {
		t.Fatalf("expected Go-http-client/1.1, got %q", seenUA)
	}
}

func TestBridgeRejectsBadToken(t *testing.T) {
	pool := newTransportPool()
	defer pool.closeAll()
	bridge := httptest.NewServer(newBridgeHandler("real-secret", pool))
	defer bridge.Close()

	req, _ := http.NewRequest(http.MethodPost, bridge.URL+"/fetch", nil)
	req.Header.Set("X-Bridge-Token", "wrong")
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		t.Fatalf("Do: %v", err)
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusForbidden {
		t.Fatalf("expected 403, got %d", resp.StatusCode)
	}
}

func TestConnectGuardBlocksPrivateAndMetadata(t *testing.T) {
	if !isHostBlockedByGuard("127.0.0.1", "public-only", false) {
		t.Fatalf("expected 127.0.0.1 blocked under public-only")
	}
	if !isHostBlockedByGuard("169.254.169.254", "block-metadata", false) {
		t.Fatalf("expected 169.254.169.254 blocked under block-metadata")
	}
	if !isHostBlockedByGuard("::ffff:169.254.169.254", "block-metadata", false) {
		t.Fatalf("expected ::ffff:169.254.169.254 blocked under block-metadata")
	}
	if isHostBlockedByGuard("8.8.8.8", "public-only", false) {
		t.Fatalf("expected 8.8.8.8 allowed under public-only")
	}
}

func TestSocks5HandshakeWithMockServer(t *testing.T) {
	ln, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		t.Fatalf("listen: %v", err)
	}
	defer ln.Close()

	done := make(chan error, 1)
	go func() {
		conn, acceptErr := ln.Accept()
		if acceptErr != nil {
			done <- acceptErr
			return
		}
		defer conn.Close()

		var greet [3]byte
		if _, err := io.ReadFull(conn, greet[:]); err != nil {
			done <- err
			return
		}
		_, _ = conn.Write([]byte{0x05, 0x00})

		var hdr [4]byte
		if _, err := io.ReadFull(conn, hdr[:]); err != nil {
			done <- err
			return
		}
		var dlen [1]byte
		if _, err := io.ReadFull(conn, dlen[:]); err != nil {
			done <- err
			return
		}
		tail := make([]byte, int(dlen[0])+2)
		if _, err := io.ReadFull(conn, tail); err != nil {
			done <- err
			return
		}
		_, _ = conn.Write([]byte{0x05, 0x00, 0x00, 0x01, 127, 0, 0, 1, 0x01, 0xbb})
		_, _ = conn.Write([]byte("pong"))
		done <- nil
	}()

	proxyURL, _ := url.Parse("socks5h://" + ln.Addr().String())
	conn, err := dialViaSocks5(t.Context(), proxyURL, "tcp", "example.com:443", true, &net.Dialer{})
	if err != nil {
		t.Fatalf("dialViaSocks5: %v", err)
	}
	defer conn.Close()

	buf := make([]byte, 4)
	if _, err := io.ReadFull(conn, buf); err != nil {
		t.Fatalf("read pong: %v", err)
	}
	if !bytes.Equal(buf, []byte("pong")) {
		t.Fatalf("expected pong, got %q", string(buf))
	}
	if err := <-done; err != nil {
		t.Fatalf("mock socks5 server: %v", err)
	}
}
