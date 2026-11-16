#!/usr/bin/env bash
set -euo pipefail

# Run inside a Linux lab guest. Output may contain local interface details;
# review and sanitise it before publishing.
printf '%s\n' '=== Interfaces ==='
ip -brief address
printf '%s\n' '=== Routes ==='
ip route
printf '%s\n' '=== Listening services ==='
ss -lntup

if ip route | grep -q '^default'; then
  printf '%s\n' 'NOTICE: a default route exists. Confirm it is intentional.'
else
  printf '%s\n' 'PASS: no default route is configured in this guest.'
fi

