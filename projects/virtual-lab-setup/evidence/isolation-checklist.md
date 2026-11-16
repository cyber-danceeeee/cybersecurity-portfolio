# Isolation validation checklist

Sanitised record of the controls checked before using the lab.

| Check | Expected result | Recorded result |
|---|---|---|
| Target adapter mode | Host-only; no bridged adapter | Pass |
| Attacker lab interface | Address in documentation range | Pass |
| Target lab interface | Address in same documentation range | Pass |
| Attacker-to-target reachability | Reachable on host-only segment | Pass |
| Target route to physical LAN | No route configured | Pass |
| Update path | NAT enabled only when required | Pass |
| Recovery point | Clean snapshots recorded | Pass |
| Sensitive evidence | Credentials and real addresses excluded | Pass |

Documentation addresses use `192.0.2.0/24`, reserved for examples by RFC 5737. Actual local interface identifiers and addresses are intentionally not published.

