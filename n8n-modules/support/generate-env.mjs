import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const MODULE_DIR = process.cwd();
const ROOT_DIR = join(MODULE_DIR, '../..');
const ENV_FILE = join(ROOT_DIR, '.env');
const OUTPUT_FILE = join(MODULE_DIR, 'env.ts');

const C_RESET = '\x1b[0m';
const C_RED = '\x1b[31m';
const C_GREEN = '\x1b[32m';

const LOG = {
  info: (msg) => console.log(`${C_GREEN}[INFO] ${C_RESET} ${msg}`),
  error: (msg) => console.error(`${C_RED}[ERROR]${C_RESET} ${msg}`),
};

function parseEnvFile(content) {
  const result = {};

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

const envVars = existsSync(ENV_FILE) ? parseEnvFile(readFileSync(ENV_FILE, 'utf-8')) : {};
const required = ['ACCOUNTING_BASE_URL', 'AUTH_BASE_URL'];

for (const key of required) {
  envVars[key] ??= process.env[key];

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
