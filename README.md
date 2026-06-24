# BOC n8n Modules

Monorepo untuk n8n community node modules milik BOC.

## Modules

| Module | Package | Keterangan |
| --- | --- | --- |
| `n8n-modules/n8n-nodes-wazuh` | `@beyond-ordinary-cloud/n8n-nodes-wazuh` | Wazuh Server API dan Wazuh Indexer API node untuk n8n |

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
n8n-nodes-wazuh@0.1.5
```

Jika repo ini sudah berisi lebih dari satu module, tag semver polos seperti `0.2.0` sebaiknya dihindari karena ambigu.

## Repo-Level Files

- `.env` menyimpan secret lokal seperti `NPMJS_TOKEN` dan tidak dicommit.
- `.env.example` mendokumentasikan key environment yang dipakai repo.
- `.github/` berisi automation untuk semua module.
- `.codex/` dan `.agents/` adalah state lokal AI agent.
