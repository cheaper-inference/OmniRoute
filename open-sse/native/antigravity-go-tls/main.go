package main

import (
	"bufio"
	"context"
	"crypto/subtle"
	"crypto/tls"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net"
	"net/http"
	"net/url"
	"os"
	"strings"
	"sync"
	"time"
)

type targetMeta struct {
	URL                 string     `json:"url"`
	Method              string     `json:"method"`
	Headers             [][]string `json:"headers"`
	ProxyURL            string     `json:"proxyUrl,omitempty"`
	Redirect            string     `json:"redirect,omitempty"`
	ConnectGuard        string     `json:"connectGuard,omitempty"`
	BlockBenchmarkRange bool       `json:"blockBenchmarkRange,omitempty"`
}

type bridgeResponseMeta struct {
	Status     int        `json:"status"`
	StatusText string     `json:"statusText"`
	Headers    [][]string `json:"headers"`
}

type bridgeErrorPayload struct {
	Code    string `json:"code"`
	Message string `json:"message"`
}

type transportKey struct {
	proxyURL            string
	connectGuard        string
	blockBenchmarkRange bool
}

type transportPool struct {
	mu         sync.RWMutex
	transports map[transportKey]*http.Transport
}

func newTransportPool() *transportPool {
	return &transportPool{
		transports: make(map[transportKey]*http.Transport),
	}
}

func (p *transportPool) get(meta targetMeta) (*http.Transport, error) {
	key := transportKey{
		proxyURL:            meta.ProxyURL,
		connectGuard:        meta.ConnectGuard,
		blockBenchmarkRange: meta.BlockBenchmarkRange,
	}

	p.mu.RLock()
	tr, ok := p.transports[key]
	p.mu.RUnlock()
	if ok {
		return tr, nil
	}

	built, err := buildTransport(meta)
	if err != nil {
		return nil, err
	}

	p.mu.Lock()
	if existing, exists := p.transports[key]; exists {
		p.mu.Unlock()
		built.CloseIdleConnections()
		return existing, nil
	}
	p.transports[key] = built
	p.mu.Unlock()
	return built, nil
}

func (p *transportPool) closeAll() {
	p.mu.Lock()
	defer p.mu.Unlock()
	for _, tr := range p.transports {
		tr.CloseIdleConnections()
	}
}

func buildTransport(meta targetMeta) (*http.Transport, error) {
	baseDialer := &net.Dialer{
		Timeout:   30 * time.Second,
		KeepAlive: 30 * time.Second,
	}

	tr := &http.Transport{
		TLSClientConfig: &tls.Config{
			NextProtos: []string{"http/1.1"},
			MinVersion: tls.VersionTLS12,
		},
		ForceAttemptHTTP2:     false,
		TLSNextProto:          make(map[string]func(authority string, c *tls.Conn) http.RoundTripper),
		DisableCompression:    false,
		MaxIdleConns:          128,
		MaxIdleConnsPerHost:   16,
		IdleConnTimeout:       90 * time.Second,
		TLSHandshakeTimeout:   30 * time.Second,
		ExpectContinueTimeout: 1 * time.Second,
		DialContext:           baseDialer.DialContext,
	}

	if meta.ProxyURL != "" {
		parsedProxy, err := url.Parse(meta.ProxyURL)
		if err != nil {
			return nil, fmt.Errorf("invalid proxy url: %w", err)
		}
		family := strings.ToLower(strings.TrimSpace(parsedProxy.Query().Get("family")))
		dialNetwork := "tcp"
		if family == "ipv4" {
			dialNetwork = "tcp4"
		} else if family == "ipv6" {
			dialNetwork = "tcp6"
		}
		if parsedProxy.RawQuery != "" {
			q := parsedProxy.Query()
			q.Del("family")
			parsedProxy.RawQuery = q.Encode()
		}

		scheme := strings.ToLower(parsedProxy.Scheme)
		switch scheme {
		case "http", "https":
			tr.Proxy = http.ProxyURL(parsedProxy)
			if dialNetwork != "tcp" {
				tr.DialContext = func(ctx context.Context, _ string, addr string) (net.Conn, error) {
					return baseDialer.DialContext(ctx, dialNetwork, addr)
				}
			}
		case "socks5", "socks5h":
			resolveRemote := scheme == "socks5h"
			tr.Proxy = nil
			tr.DialContext = func(ctx context.Context, _ string, addr string) (net.Conn, error) {
				return dialViaSocks5(ctx, parsedProxy, dialNetwork, addr, resolveRemote, baseDialer)
			}
		default:
			return nil, fmt.Errorf("unsupported proxy scheme: %s", parsedProxy.Scheme)
		}
		return tr, nil
	}

	if meta.ConnectGuard != "" && meta.ConnectGuard != "none" {
		tr.DisableKeepAlives = true
		tr.DialContext = makeGuardedDialContext(meta.ConnectGuard, meta.BlockBenchmarkRange, baseDialer)
	}

	return tr, nil
}

func classifyBridgeError(err error) bridgeErrorPayload {
	var guardErr *connectGuardError
	if errors.As(err, &guardErr) {
		return bridgeErrorPayload{Code: guardErr.code, Message: guardErr.msg}
	}
	if errors.Is(err, context.Canceled) {
		return bridgeErrorPayload{Code: "ERR_ABORTED", Message: "Request aborted"}
	}
	if errors.Is(err, context.DeadlineExceeded) {
		return bridgeErrorPayload{Code: "ETIMEDOUT", Message: "Request timed out"}
	}
	var netErr net.Error
	if errors.As(err, &netErr) && netErr.Timeout() {
		return bridgeErrorPayload{Code: "ETIMEDOUT", Message: err.Error()}
	}
	msg := err.Error()
	lower := strings.ToLower(msg)
	switch {
	case strings.Contains(lower, "connection refused"):
		return bridgeErrorPayload{Code: "ECONNREFUSED", Message: msg}
	case strings.Contains(lower, "no such host"):
		return bridgeErrorPayload{Code: "ENOTFOUND", Message: msg}
	case strings.Contains(lower, "connection reset"):
		return bridgeErrorPayload{Code: "ECONNRESET", Message: msg}
	case strings.Contains(lower, "x509:") || strings.Contains(lower, "tls:"):
		return bridgeErrorPayload{Code: "ERR_TLS_CERT", Message: msg}
	case strings.Contains(lower, "redirect_disallowed"):
		return bridgeErrorPayload{Code: "ERR_REDIRECT_DISALLOWED", Message: "Redirect disallowed"}
	default:
		return bridgeErrorPayload{Code: "ERR_NETWORK", Message: msg}
	}
}

func writeBridgeError(w http.ResponseWriter, status int, payload bridgeErrorPayload) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(payload)
}

func newBridgeHandler(expectedToken string, pool *transportPool) http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		token := r.Header.Get("X-Bridge-Token")
		if subtle.ConstantTimeCompare([]byte(token), []byte(expectedToken)) != 1 {
			http.Error(w, "forbidden", http.StatusForbidden)
			return
		}
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte("ok"))
	})

	mux.HandleFunc("/fetch", func(w http.ResponseWriter, r *http.Request) {
		token := r.Header.Get("X-Bridge-Token")
		if subtle.ConstantTimeCompare([]byte(token), []byte(expectedToken)) != 1 {
			http.Error(w, "forbidden", http.StatusForbidden)
			return
		}
		if r.Method != http.MethodPost {
			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
			return
		}

		rawMeta := r.Header.Get("X-Target-Meta")
		var meta targetMeta
		if err := json.Unmarshal([]byte(rawMeta), &meta); err != nil {
			writeBridgeError(w, http.StatusBadRequest, bridgeErrorPayload{
				Code:    "ERR_INVALID_META",
				Message: "Invalid X-Target-Meta JSON",
			})
			return
		}

		targetURL, err := url.Parse(meta.URL)
		if err != nil || (targetURL.Scheme != "http" && targetURL.Scheme != "https") || targetURL.Host == "" {
			writeBridgeError(w, http.StatusBadRequest, bridgeErrorPayload{
				Code:    "ERR_INVALID_URL",
				Message: "Target URL must be an absolute http(s) URL",
			})
			return
		}

		method := strings.ToUpper(strings.TrimSpace(meta.Method))
		if method == "" {
			method = http.MethodGet
		}

		tr, err := pool.get(meta)
		if err != nil {
			writeBridgeError(w, http.StatusBadGateway, bridgeErrorPayload{
				Code:    "ERR_PROXY_CONFIG",
				Message: err.Error(),
			})
			return
		}

		var bodyReader io.Reader
		hasBody := method != http.MethodGet && method != http.MethodHead && r.ContentLength != 0
		if hasBody {
			bodyReader = r.Body
		} else {
			bodyReader = http.NoBody
		}

		upReq, err := http.NewRequestWithContext(r.Context(), method, meta.URL, bodyReader)
		if err != nil {
			writeBridgeError(w, http.StatusBadRequest, bridgeErrorPayload{
				Code:    "ERR_INVALID_REQUEST",
				Message: err.Error(),
			})
			return
		}
		if hasBody && r.ContentLength > 0 {
			upReq.ContentLength = r.ContentLength
		}

		for _, pair := range meta.Headers {
			if len(pair) != 2 {
				continue
			}
			k := pair[0]
			v := pair[1]
			lowerKey := strings.ToLower(k)
			switch lowerKey {
			case "host":
				upReq.Host = v
			case "content-length", "transfer-encoding", "connection":
				// Let net/http manage framing/hop-by-hop headers.
			default:
				upReq.Header[k] = append(upReq.Header[k], v)
			}
		}

		client := &http.Client{Transport: tr}
		switch strings.ToLower(meta.Redirect) {
		case "manual":
			client.CheckRedirect = func(*http.Request, []*http.Request) error {
				return http.ErrUseLastResponse
			}
		case "error":
			client.CheckRedirect = func(*http.Request, []*http.Request) error {
				return errors.New("redirect_disallowed")
			}
		}

		upResp, err := client.Do(upReq)
		if err != nil {
			writeBridgeError(w, http.StatusBadGateway, classifyBridgeError(err))
			return
		}
		defer upResp.Body.Close()

		respHeaders := make([][]string, 0, len(upResp.Header))
		for k, vals := range upResp.Header {
			for _, v := range vals {
				respHeaders = append(respHeaders, []string{k, v})
			}
		}

		metaJSON, err := json.Marshal(bridgeResponseMeta{
			Status:     upResp.StatusCode,
			StatusText: upResp.Status,
			Headers:    respHeaders,
		})
		if err != nil {
			writeBridgeError(w, http.StatusBadGateway, bridgeErrorPayload{
				Code:    "ERR_ENCODE_META",
				Message: err.Error(),
			})
			return
		}

		w.Header().Set("Content-Type", "application/octet-stream")
		w.WriteHeader(http.StatusOK)
		if _, err := w.Write(append(metaJSON, '\n')); err != nil {
			panic(http.ErrAbortHandler)
		}
		flusher, canFlush := w.(http.Flusher)
		if canFlush {
			flusher.Flush()
		}

		buf := make([]byte, 32*1024)
		for {
			n, readErr := upResp.Body.Read(buf)
			if n > 0 {
				if _, writeErr := w.Write(buf[:n]); writeErr != nil {
					panic(http.ErrAbortHandler)
				}
				if canFlush {
					flusher.Flush()
				}
			}
			if readErr == io.EOF {
				break
			}
			if readErr != nil {
				panic(http.ErrAbortHandler)
			}
		}
	})

	return mux
}

func main() {
	stdinReader := bufio.NewReader(os.Stdin)
	tokenLine, err := stdinReader.ReadString('\n')
	if err != nil && len(tokenLine) == 0 {
		fmt.Fprintln(os.Stderr, "missing bridge token on stdin")
		os.Exit(1)
	}
	token := strings.TrimSpace(tokenLine)
	if token == "" {
		fmt.Fprintln(os.Stderr, "empty bridge token")
		os.Exit(1)
	}

	ln, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		fmt.Fprintf(os.Stderr, "listen failed: %v\n", err)
		os.Exit(1)
	}

	pool := newTransportPool()
	srv := &http.Server{
		Handler:           newBridgeHandler(token, pool),
		ReadHeaderTimeout: 30 * time.Second,
	}

	// Exit cleanly when the parent Node process closes stdin (including crash/SIGKILL).
	go func() {
		_, _ = io.Copy(io.Discard, stdinReader)
		ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
		defer cancel()
		_ = srv.Shutdown(ctx)
		pool.closeAll()
		os.Exit(0)
	}()

	tcpAddr := ln.Addr().(*net.TCPAddr)
	readyPayload, _ := json.Marshal(map[string]int{"port": tcpAddr.Port})
	fmt.Println(string(readyPayload))

	if err := srv.Serve(ln); err != nil && !errors.Is(err, http.ErrServerClosed) {
		fmt.Fprintf(os.Stderr, "serve failed: %v\n", err)
		os.Exit(1)
	}
}
