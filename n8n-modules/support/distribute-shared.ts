#!/usr/bin/env node
import { cpSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SHARED_SRC = join(__dirname, 'shared');
const CWD = process.cwd();
const DEST = join(CWD, 'shared');

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

LOG.info(`Copying shared code...`);
LOG.debug(`Source: ${SHARED_SRC}`);
LOG.debug(`Dest:   ${DEST}`);

if (!existsSync(SHARED_SRC)) {
  LOG.error(`Shared source directory not found at ${SHARED_SRC}`);
  process.exit(1);
}

if (!existsSync(DEST)) {
  mkdirSync(DEST, { recursive: true });
}

const files = readdirSync(SHARED_SRC);
for (const file of files) {
  if (!file.endsWith('.ts')) continue;

  const srcFile = join(SHARED_SRC, file);
  const destFile = join(DEST, file);
  cpSync(srcFile, destFile);
  LOG.info(`Copied ${file}`);
}
