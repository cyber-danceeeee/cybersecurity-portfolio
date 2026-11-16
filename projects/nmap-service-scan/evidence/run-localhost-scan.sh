#!/usr/bin/env bash
set -euo pipefail

target='127.0.0.1'
port='8000'

command -v nmap >/dev/null || { printf '%s\n' 'nmap is required.' >&2; exit 1; }
command -v python3 >/dev/null || { printf '%s\n' 'python3 is required.' >&2; exit 1; }

python3 -m http.server "$port" --bind "$target" >/dev/null 2>&1 &
server_pid=$!
cleanup() { kill "$server_pid" 2>/dev/null || true; }
trap cleanup EXIT INT TERM

ready='no'
for _ in 1 2 3 4 5; do
  if python3 -c "import socket; s=socket.create_connection(('$target',$port),.5); s.close()" 2>/dev/null; then
    ready='yes'
    break
  fi
done

if [[ "$ready" != 'yes' ]]; then
  printf '%s\n' 'Local test service did not become ready.' >&2
  exit 1
fi

printf '%s\n' "Scanning authorised loopback target $target only."
nmap -sV -Pn -p "22,$port" "$target"

