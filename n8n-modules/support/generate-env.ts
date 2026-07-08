#!/usr/bin/env node
/**
 * This script reads .env file and generates a TypeScript constants file
 * that embeds the values at build time.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { basename, join } from 'path';

const CWD = join(basename(import.meta.url.replace(/^file:\/\//, '')), '..');
const ROOT_DIR = join(basename(import.meta.url.replace(/^file:\/\//, '')), '../..');
const ENV_FILE = join(ROOT_DIR, '.env');
const OUTPUT_FILE = join(CWD, 'env.ts');

const C_RESET = '\x1b[0m';
const C_RED = '\x1b[31m';
const C_GREEN = '\x1b[32m';
const C_YELLOW = '\x1b[33m';
const C_BLUE = '\x1b[34m';

const LOG = {
  info: (msg: string) => console.log(`${C_GREEN}[INFO] ${C_RESET} ${msg}`),
  debug: (msg: string) => console.log(`${C_BLUE}[DEBUG]${C_RESET} ${msg}`),
  warn: (msg: string) => console.log(`${C_YELLOW}[WARN] ${C_RESET} ${msg}`),
  error: (msg: string) => console.error(`${C_RED}[ERROR]${C_RESET} ${msg}`),
};

function parseEnvFile(content: string): Record<string, string> {
  const result: Record<string, string> = {};

  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const eqIndex = trimmed.indexOf('=');
    if (eqIndex === -1) continue;

    const key = trimmed.slice(0, eqIndex).trim();
    let value = trimmed.slice(eqIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    result[key] = value;
  }

  return result;
}

function main() {
  if (!existsSync(ENV_FILE)) {
    LOG.error(`.env file not found at ${ENV_FILE}`);
    process.exit(1);
  }

  const envContent = readFileSync(ENV_FILE, 'utf-8');
  const envVars = parseEnvFile(envContent);

  const required = ['ACCOUNTING_BASE_URL', 'AUTH_BASE_URL'];

  for (const key of required) {
    if (!envVars[key]) {
      LOG.error(`Missing required env var: ${key}`);
      process.exit(1);
    }
  }

  const output = `// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from .env at build time

export const ENV = {
${required.map((key) => `  ${key}: ${JSON.stringify(envVars[key])},`).join('\n')}
} as const;
`;

  writeFileSync(OUTPUT_FILE, output);
  LOG.info(`Generated ${OUTPUT_FILE}`);
}

main();
