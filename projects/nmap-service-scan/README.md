# Safe Localhost Service Enumeration with Nmap

## Objective

Practise a tightly scoped service-enumeration workflow against an authorised target and distinguish open and closed TCP ports without sending traffic to any third-party system.

## Environment and tools

- macOS host owned by the author
- Nmap 7.98
- Python 3.12 local HTTP server
- Loopback target `127.0.0.1`
- TCP ports 22 and 8000 only

## Method

1. Confirmed the scope was localhost and selected only two ports.
2. Started Python's test HTTP server bound to `127.0.0.1:8000`.
3. Verified the process was running locally.
4. Ran `nmap -sV -Pn -p 22,8000 127.0.0.1`.
5. Interpreted the port state and service-detection output.
6. Stopped the test server immediately after the scan.
7. Removed volatile details from the published evidence.

## Results and evidence

Port 8000 was open because the controlled Python service was listening. Port 22 was closed: the host responded, but no SSH service accepted the connection. Nmap identified the test web server as Python's SimpleHTTPServer. This finding documents exposure, not a vulnerability by itself.

- [Sanitised scan result](evidence/scan-result.md)
- [Safe reproduction script](evidence/run-localhost-scan.sh)

## What I would do differently

For a larger authorised lab, I would first record an explicit target allowlist, save results in a machine-readable format outside the public repository, verify banners manually, and compare the exposed service with an approved baseline. If port 8000 were unintentionally exposed, I would stop the process, remove unnecessary startup configuration, bind the service to localhost, and confirm the port was closed with a second scan.

## Ethics and privacy

The scan targeted only the author's loopback interface. The reproduction script rejects non-loopback targets by design and cleans up the temporary server when it exits.

