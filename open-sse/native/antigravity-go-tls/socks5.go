package main

import (
	"context"
	"encoding/binary"
	"errors"
	"fmt"
	"io"
	"net"
	"net/url"
	"strconv"
)

const (
	socks5Version          = 0x05
	socks5AuthNone         = 0x00
	socks5AuthUserPass     = 0x02
	socks5AuthNoAcceptable = 0xff
	socks5CmdConnect       = 0x01
	socks5AtypIPv4         = 0x01
	socks5AtypDomain       = 0x03
	socks5AtypIPv6         = 0x04
)

func dialViaSocks5(
	ctx context.Context,
	proxyURL *url.URL,
	network string,
	targetAddr string,
	resolveRemote bool,
	baseDialer *net.Dialer,
) (net.Conn, error) {
	proxyHost := proxyURL.Hostname()
	proxyPort := proxyURL.Port()
	if proxyPort == "" {
		proxyPort = "1080"
	}
	proxyEndpoint := net.JoinHostPort(proxyHost, proxyPort)

	conn, err := baseDialer.DialContext(ctx, network, proxyEndpoint)
	if err != nil {
		return nil, fmt.Errorf("socks5 dial proxy: %w", err)
	}

	stopCancel := context.AfterFunc(ctx, func() {
		_ = conn.Close()
	})
	defer stopCancel()

	if err := socks5Handshake(ctx, conn, proxyURL, targetAddr, resolveRemote); err != nil {
		_ = conn.Close()
		return nil, err
	}
	return conn, nil
}

func socks5Handshake(
	ctx context.Context,
	conn net.Conn,
	proxyURL *url.URL,
	targetAddr string,
	resolveRemote bool,
) error {
	var username, password string
	hasAuth := false
	if proxyURL.User != nil {
		username = proxyURL.User.Username()
		password, _ = proxyURL.User.Password()
		hasAuth = username != "" || password != ""
	}

	methods := []byte{socks5AuthNone}
	if hasAuth {
		methods = []byte{socks5AuthNone, socks5AuthUserPass}
	}

	greeting := make([]byte, 2+len(methods))
	greeting[0] = socks5Version
	greeting[1] = byte(len(methods))
	copy(greeting[2:], methods)
	if _, err := conn.Write(greeting); err != nil {
		return fmt.Errorf("socks5 greeting write: %w", err)
	}

	var methodChoice [2]byte
	if _, err := io.ReadFull(conn, methodChoice[:]); err != nil {
		return fmt.Errorf("socks5 greeting read: %w", err)
	}
	if methodChoice[0] != socks5Version {
		return errors.New("socks5 unexpected version in method selection")
	}

	switch methodChoice[1] {
	case socks5AuthNone:
		// No authentication required.
	case socks5AuthUserPass:
		if !hasAuth {
			return errors.New("socks5 server required username/password auth")
		}
		if len(username) > 255 || len(password) > 255 {
			return errors.New("socks5 credentials exceed 255 bytes")
		}
		authReq := make([]byte, 0, 3+len(username)+len(password))
		authReq = append(authReq, 0x01, byte(len(username)))
		authReq = append(authReq, username...)
		authReq = append(authReq, byte(len(password)))
		authReq = append(authReq, password...)
		if _, err := conn.Write(authReq); err != nil {
			return fmt.Errorf("socks5 auth write: %w", err)
		}
		var authResp [2]byte
		if _, err := io.ReadFull(conn, authResp[:]); err != nil {
			return fmt.Errorf("socks5 auth read: %w", err)
		}
		if authResp[1] != 0x00 {
			return errors.New("socks5 authentication failed")
		}
	case socks5AuthNoAcceptable:
		return errors.New("socks5 no acceptable auth method")
	default:
		return fmt.Errorf("socks5 unsupported auth method: %d", methodChoice[1])
	}

	host, portStr, err := net.SplitHostPort(targetAddr)
	if err != nil {
		return fmt.Errorf("socks5 invalid target address: %w", err)
	}
	portNum, err := strconv.Atoi(portStr)
	if err != nil || portNum < 0 || portNum > 65535 {
		return fmt.Errorf("socks5 invalid target port: %s", portStr)
	}

	connectReq, err := buildSocks5ConnectRequest(ctx, host, uint16(portNum), resolveRemote)
	if err != nil {
		return err
	}
	if _, err := conn.Write(connectReq); err != nil {
		return fmt.Errorf("socks5 connect write: %w", err)
	}

	var replyHdr [4]byte
	if _, err := io.ReadFull(conn, replyHdr[:]); err != nil {
		return fmt.Errorf("socks5 connect reply read: %w", err)
	}
	if replyHdr[0] != socks5Version {
		return errors.New("socks5 unexpected version in connect reply")
	}
	if replyHdr[1] != 0x00 {
		return fmt.Errorf("socks5 connect failed with reply code %d", replyHdr[1])
	}

	var addrLen int
	switch replyHdr[3] {
	case socks5AtypIPv4:
		addrLen = 4
	case socks5AtypIPv6:
		addrLen = 16
	case socks5AtypDomain:
		var lenBuf [1]byte
		if _, err := io.ReadFull(conn, lenBuf[:]); err != nil {
			return fmt.Errorf("socks5 reply domain len read: %w", err)
		}
		addrLen = int(lenBuf[0])
	default:
		return fmt.Errorf("socks5 invalid reply atyp: %d", replyHdr[3])
	}

	discard := make([]byte, addrLen+2)
	if _, err := io.ReadFull(conn, discard); err != nil {
		return fmt.Errorf("socks5 reply tail read: %w", err)
	}
	return nil
}

func buildSocks5ConnectRequest(
	ctx context.Context,
	host string,
	port uint16,
	resolveRemote bool,
) ([]byte, error) {
	req := make([]byte, 0, 7+len(host))
	req = append(req, socks5Version, socks5CmdConnect, 0x00)

	if ip := net.ParseIP(host); ip != nil {
		if v4 := ip.To4(); v4 != nil {
			req = append(req, socks5AtypIPv4)
			req = append(req, v4...)
		} else {
			req = append(req, socks5AtypIPv6)
			req = append(req, ip.To16()...)
		}
	} else if !resolveRemote {
		addrs, err := net.DefaultResolver.LookupIPAddr(ctx, host)
		if err != nil || len(addrs) == 0 {
			if len(host) > 255 {
				return nil, errors.New("socks5 hostname exceeds 255 bytes")
			}
			req = append(req, socks5AtypDomain, byte(len(host)))
			req = append(req, host...)
		} else if v4 := addrs[0].IP.To4(); v4 != nil {
			req = append(req, socks5AtypIPv4)
			req = append(req, v4...)
		} else {
			req = append(req, socks5AtypIPv6)
			req = append(req, addrs[0].IP.To16()...)
		}
	} else {
		if len(host) > 255 {
			return nil, errors.New("socks5 hostname exceeds 255 bytes")
		}
		req = append(req, socks5AtypDomain, byte(len(host)))
		req = append(req, host...)
	}

	var portBuf [2]byte
	binary.BigEndian.PutUint16(portBuf[:], port)
	req = append(req, portBuf[:]...)
	return req, nil
}
