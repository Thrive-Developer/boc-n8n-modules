# Keloola n8n Modules

Monorepo untuk n8n community node modules milik Keloola.

## Modules

| Module | Package | Keterangan |
| --- | --- | --- |
| `n8n-modules/n8n-nodes-wazuh` | `@keloola/n8n-nodes-wazuh` | Wazuh Server API dan Wazuh Indexer API node untuk n8n |
| `n8n-modules/n8n-nodes-keloola-accounting` | `@keloola/n8n-nodes-keloola-accounting` | Keloola Accounting node untuk n8n |
| `n8n-modules/n8n-nodes-keloola-accounting-saas` | `@keloola/n8n-nodes-keloola-accounting-saas` | Keloola Accounting SaaS node untuk n8n |
| `n8n-modules/n8n-nodes-keloola-projects` | `@keloola/n8n-nodes-keloola-projects` | Keloola Projects node untuk n8n |
| `n8n-modules/support` | `@keloola/support` | Helper internal untuk generate env dan shared source |

## Local Development

Masuk ke directory module yang ingin dikerjakan:

```bash
cd n8n-modules/n8n-nodes-wazuh
```

Install dependency dan validasi:

```bash
npm ci
npm run lint
npm run build
```

Module Accounting membutuhkan env repo-level sebelum build:

```bash
ACCOUNTING_BASE_URL=
AUTH_BASE_URL=
```

## Publish

Publish dilakukan per module dari directory module masing-masing. Untuk module Wazuh:

```bash
cd n8n-modules/n8n-nodes-wazuh
npm run release
```

Workflow publish ada di [`.github/workflows/publish.yml`](.github/workflows/publish.yml) dan mendukung dua cara:

1. OIDC Trusted Publishing ke npm, tanpa secret token di repo.
2. npm automation token lewat secret GitHub `NPM_TOKEN` atau `NPMJS_TOKEN`.

Tag rilis yang disarankan mengikuti format module-specific, misalnya:

```text
n8n-nodes-wazuh@0.1.6
```

Jika repo ini sudah berisi lebih dari satu module, tag semver polos seperti `0.2.0` sebaiknya dihindari karena ambigu.

## Repo-Level Files

- `.env` menyimpan secret lokal seperti `NPMJS_TOKEN`, `ACCOUNTING_BASE_URL`, dan `AUTH_BASE_URL`, dan tidak dicommit.
- `.env.example` mendokumentasikan key environment yang dipakai repo.
- `.github/` berisi automation untuk semua module.
- `.codex/` dan `.agents/` adalah state lokal AI agent.
