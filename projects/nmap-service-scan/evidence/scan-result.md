# Sanitised Nmap result

**Date:** 16 November 2026 (MYT)  
**Scope:** Author-owned loopback interface only  
**Command:** `nmap -sV -Pn -p 22,8000 127.0.0.1`

```text
Nmap scan report for localhost (127.0.0.1)
Host is up.

PORT     STATE  SERVICE VERSION
22/tcp   closed ssh
8000/tcp open   http    SimpleHTTPServer 0.6 (Python 3.12.4)

Nmap done: 1 IP address (1 host up) scanned.
```

## Interpretation

- `8000/tcp open`: the temporary Python HTTP server accepted a TCP connection.
- `22/tcp closed`: the host was reachable, but no service listened on that port.
- The service banner supports identification; it does not prove a vulnerability.

Volatile timing data was removed. No public or third-party address was scanned.

