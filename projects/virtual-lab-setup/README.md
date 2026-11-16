# Isolated Virtual Cybersecurity Lab

## Objective

Build a reusable environment for authorised cybersecurity practice while preventing deliberately vulnerable guests from reaching the physical LAN. The design needed a controlled update path, repeatable rollback, and evidence that the trust boundaries were intentional.

## Environment and tools

- VirtualBox on a personal host
- Kali Linux attacker guest
- Intentionally vulnerable Linux target guest
- NAT adapter for controlled updates
- Host-only adapter for lab traffic
- VirtualBox snapshots and Linux networking tools

## Method

1. Created a dedicated host-only network for security-testing traffic.
2. Attached the attacker and target guests to the host-only segment.
3. Kept the target off bridged networking so it was not exposed to the physical LAN.
4. Used a separate NAT adapter on the attacker only when updates were required.
5. Recorded clean snapshots before running exercises.
6. Verified interface addresses, routes, and guest-to-guest reachability.
7. Disabled the update adapter during testing and recorded the final topology.

## Results and evidence

The resulting design separated three purposes: host management, controlled package updates, and intentionally hostile lab traffic. The target remained reachable from the attacker on the private lab segment without being bridged onto the physical network.

- [Sanitised network diagram](evidence/lab-network.svg)
- [Isolation validation checklist](evidence/isolation-checklist.md)
- [Guest-side verification script](evidence/verify-isolation.sh)

## What I would improve

I would add automated packet-capture checks at the host-only boundary and use infrastructure-as-code to rebuild the same network consistently. I would also create separate VLAN-backed ranges for future multi-tier labs and export only sanitised configuration summaries, never complete VM images or credentials.

## Ethics and privacy

The environment is owned by the author and intended only for legal practice. Guest names, host identifiers, MAC addresses, real LAN addressing, credentials, and raw captures are excluded from the repository.

