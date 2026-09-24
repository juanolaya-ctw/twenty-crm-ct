# Cuenta (Account / Area) — UI custom object notes

Twenty already supports **custom objects** via Settings → Data model. For Sponsors B2B we use that path for **Cuenta/Área** instead of adding a full standard-object package in this PR.

## Why not a standard object here

Introducing a first-class `cuenta` standard object requires:

- UIDs in `twenty-shared` (`STANDARD_OBJECT_*`)
- Flat metadata builders, indexes, views, viewGroups
- Workspace entity + ORM wiring
- Upgrade commands for existing workspaces
- Seeds, GraphQL schema generation, tests

That is a larger framework change. Product decision: ship **docs + AE Opportunity stages** now; create **Cuenta in UI** on the running instance (`:3000`).

## Intended fields (UI)

See `docs/crm-sponsors-b2b-model.md` and the Project runbook. Minimum:

- Name
- Relation → Company (Empresa), N:1
- Select Estado SDR (kanban axis)
- Relation → Workspace member (SDR dueño)
- ICP / Fuente / Size / País as needed

## Relations from other objects

| From | Field | To |
|------|-------|-----|
| Person | Cuenta (belongs to) | Cuenta |
| Opportunity | Cuenta (belongs to, required in process) | Cuenta |
| Opportunity | Persona principal (optional rename of pointOfContact or extra relation) | Person |
| Opportunity | Producto(s) multi-select | — |

## Do not

- Do not treat Person `sdrStage` (PR #2) as the SDR board.
- Do not put Estado SDR on Company.
