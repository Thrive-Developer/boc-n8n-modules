# Agent Instructions

Repo ini adalah monorepo untuk n8n community node modules.

## Struktur

- `n8n-modules/<module-name>/` berisi satu package npm n8n community node.
- File package seperti `package.json`, `package-lock.json`, `tsconfig.json`, `eslint.config.mjs`, `nodes/`, `credentials/`, dan `icons/` tetap berada di dalam module masing-masing.
- Konfigurasi repo-level seperti `.github/`, `.gitignore`, `.env.example`, dan instruksi agent berada di root repo.
- `.env`, `.codex/`, dan `.agents/` adalah state lokal dan tidak boleh dicommit.

## Workflow

- Saat mengerjakan module, jalankan command dari directory module, misalnya `cd n8n-modules/n8n-nodes-wazuh`.
- Untuk validasi module yang diubah, jalankan `npm ci`, `npm run lint`, dan `npm run build` di module tersebut.
- Jika module perlu dipublish, pastikan versi package sudah dibump dan publish dijalankan dari directory module yang sama.
- Saat menambah module baru, buat directory baru di `n8n-modules/<module-name>/` dan tambahkan entry module itu ke workflow CI, publish, dan Dependabot bila perlu.
- Jangan mencetak isi rahasia dari `.env`; cukup referensikan nama key seperti `NPMJS_TOKEN` atau `NPM_TOKEN`.
