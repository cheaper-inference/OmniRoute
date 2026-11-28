package main

import (
	"context"
	"fmt"
	"net"
	"net/netip"
	"strconv"
	"strings"
)

const connectGuardBlockedCode = "ERR_OUTBOUND_HOST_BLOCKED"

type connectGuardError struct {
	code string
	msg  string
}

func (e *connectGuardError) Error() string {
	return e.msg
}

func isHostBlockedByGuard(host string, guard string, blockBenchmark bool) bool {
	if guard == "" || guard == "none" {
		return false
	}
	normalized := strings.TrimSuffix(strings.ToLower(strings.TrimSpace(host)), ".")
	normalized = strings.TrimPrefix(strings.TrimSuffix(normalized, "]"), "[")
	if normalized == "" {
		return true
	}

	if addr, err := netip.ParseAddr(normalized); err == nil {
		return isAddrBlockedByGuard(addr, guard, blockBenchmark)
	}

	if guard == "block-metadata" {
		return normalized == "metadata.google.internal" || normalized == "metadata.goog"
	}

	// public-only host suffix rules matching src/shared/network/privateHost.ts
	if normalized == "localhost" ||
		strings.HasSuffix(normalized, ".localhost") ||
		strings.HasSuffix(normalized, ".local") ||
		strings.HasSuffix(normalized, ".internal") {
		return true
	}
	return false
}

func isAddrBlockedByGuard(addr netip.Addr, guard string, blockBenchmark bool) bool {
	addr = addr.WithZone("")
	if !addr.IsValid() {
		return true
	}

	if addr.Is6() {
		if embedded, ok := extractEmbeddedIPv4(addr); ok {
			if isAddrBlockedByGuard(embedded, guard, blockBenchmark) {
				return true
			}
		}
		if addr.Is4In6() {
			return isAddrBlockedByGuard(addr.Unmap(), guard, blockBenchmark)
		}
	}

	if guard == "block-metadata" {
		if addr.Is4() {
			b := addr.As4()
			// 169.254.0.0/16 (AWS/GCP/Azure link-local IMDS), 100.100.100.200 (Alibaba Cloud),
			// 168.63.129.16 (Azure WireServer), 192.0.0.192 (Oracle Cloud secondary IMDS)
			if b[0] == 169 && b[1] == 254 {
				return true
			}
			if b == [4]byte{100, 100, 100, 200} ||
				b == [4]byte{168, 63, 129, 16} ||
				b == [4]byte{192, 0, 0, 192} {
				return true
			}
			return false
		}
		// IPv6 link-local fe80::/10 + AWS EC2 IMDSv2 fd00:ec2::254
		if addr.IsLinkLocalUnicast() || addr.IsLinkLocalMulticast() {
			return true
		}
		ec2Imds := netip.MustParseAddr("fd00:ec2::254")
		return addr == ec2Imds
	}

	// public-only
	if addr.IsLoopback() ||
		addr.IsPrivate() ||
		addr.IsLinkLocalUnicast() ||
		addr.IsLinkLocalMulticast() ||
		addr.IsMulticast() ||
		addr.IsUnspecified() ||
		addr.IsInterfaceLocalMulticast() {
		return true
	}

	if addr.Is4() {
		b := addr.As4()
		// 0.0.0.0/8, 100.64.0.0/10 (CGNAT), 168.63.129.16 (Azure host fabric),
		// 192.0.0.0/24, 192.0.2.0/24, 198.51.100.0/24, 203.0.113.0/24, 224.0.0.0/3
		if b[0] == 0 {
			return true
		}
		if b[0] == 100 && b[1] >= 64 && b[1] <= 127 {
			return true
		}
		if b == [4]byte{168, 63, 129, 16} {
			return true
		}
		if b[0] == 192 && b[1] == 0 && (b[2] == 0 || b[2] == 2) {
			return true
		}
		if b[0] == 198 && b[1] == 51 && b[2] == 100 {
			return true
		}
		if b[0] == 203 && b[1] == 0 && b[2] == 113 {
			return true
		}
		if b[0] >= 224 {
			return true
		}
		if blockBenchmark && b[0] == 198 && (b[1] == 18 || b[1] == 19) {
			return true
		}
		return false
	}

	// IPv6 site-local fec0::/10, documentation 2001:db8::/32, discard-only 100::/64
	siteLocalPrefix := netip.MustParsePrefix("fec0::/10")
	docPrefix := netip.MustParsePrefix("2001:db8::/32")
	discardPrefix := netip.MustParsePrefix("100::/64")
	return siteLocalPrefix.Contains(addr) || docPrefix.Contains(addr) || discardPrefix.Contains(addr)
}

func extractEmbeddedIPv4(addr netip.Addr) (netip.Addr, bool) {
	b := addr.As16()
	// ::ffff:a.b.c.d
	if addr.Is4In6() {
		return addr.Unmap(), true
	}
	// ::a.b.c.d (IPv4-compatible, excluding :: and ::1)
	allZeroPrefix := true
	for i := 0; i < 12; i++ {
		if b[i] != 0 {
			allZeroPrefix = false
			break
		}
	}
	if allZeroPrefix && !(b[12] == 0 && b[13] == 0 && b[14] == 0 && b[15] <= 1) {
		return netip.AddrFrom4([4]byte{b[12], b[13], b[14], b[15]}), true
	}
	// 64:ff9b::/96 (NAT64)
	if b[0] == 0x00 && b[1] == 0x64 && b[2] == 0xff && b[3] == 0x9b {
		zeros := true
		for i := 4; i < 12; i++ {
			if b[i] != 0 {
				zeros = false
				break
			}
		}
		if zeros {
			return netip.AddrFrom4([4]byte{b[12], b[13], b[14], b[15]}), true
		}
	}
	// 2002::/16 (6to4)
	if b[0] == 0x20 && b[1] == 0x02 {
		return netip.AddrFrom4([4]byte{b[2], b[3], b[4], b[5]}), true
	}
	return netip.Addr{}, false
}

func makeGuardedDialContext(
	guard string,
	blockBenchmark bool,
	baseDialer *net.Dialer,
) func(ctx context.Context, network, addr string) (net.Conn, error) {
	return func(ctx context.Context, network, addr string) (net.Conn, error) {
		host, port, err := net.SplitHostPort(addr)
		if err != nil {
			return nil, err
		}
		if isHostBlockedByGuard(host, guard, blockBenchmark) {
			return nil, &connectGuardError{
				code: connectGuardBlockedCode,
				msg:  fmt.Sprintf("Outbound host blocked by %s guard: %s", guard, host),
			}
		}

		if ip, err := netip.ParseAddr(host); err == nil {
			if isAddrBlockedByGuard(ip, guard, blockBenchmark) {
				return nil, &connectGuardError{
					code: connectGuardBlockedCode,
					msg:  fmt.Sprintf("Outbound host resolves to blocked address: %s", host),
				}
			}
			return baseDialer.DialContext(ctx, network, net.JoinHostPort(ip.String(), port))
		}

		ips, err := net.DefaultResolver.LookupIPAddr(ctx, host)
		if err != nil {
			return nil, err
		}
		if len(ips) == 0 {
			return nil, &connectGuardError{
				code: connectGuardBlockedCode,
				msg:  fmt.Sprintf("Outbound host could not be resolved: %s", host),
			}
		}

		for _, ipAddr := range ips {
			parsed, ok := netip.AddrFromSlice(ipAddr.IP)
			if !ok || isAddrBlockedByGuard(parsed, guard, blockBenchmark) {
				return nil, &connectGuardError{
					code: connectGuardBlockedCode,
					msg:  fmt.Sprintf("Outbound host %s resolves to a blocked address (DNS rebinding)", host),
				}
			}
		}

		// Dial the first resolved & validated IP directly (no second DNS lookup).
		var dialErr error
		if _, err := strconv.Atoi(port); err != nil {
			return nil, fmt.Errorf("invalid port %q: %w", port, err)
		}
		for _, ipAddr := range ips {
			parsed, ok := netip.AddrFromSlice(ipAddr.IP)
			if !ok {
				continue
			}
			if ipAddr.Zone != "" {
				parsed = parsed.WithZone(ipAddr.Zone)
			}
			conn, err := baseDialer.DialContext(ctx, network, net.JoinHostPort(parsed.String(), port))
			if err == nil {
				return conn, nil
			}
			dialErr = err
		}
		return nil, dialErr
	}
}
