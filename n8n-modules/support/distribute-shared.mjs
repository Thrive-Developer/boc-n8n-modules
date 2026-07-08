import { cpSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SHARED_SRC = join(__dirname, 'shared');
const DEST = join(process.cwd(), 'shared');

const C_RESET = '\x1b[0m';
const C_RED = '\x1b[31m';
const C_GREEN = '\x1b[32m';

const LOG = {
  info: (msg) => console.log(`${C_GREEN}[INFO] ${C_RESET} ${msg}`),
  error: (msg) => console.error(`${C_RED}[ERROR]${C_RESET} ${msg}`),
};

LOG.info('Copying shared code...');

if (!existsSync(SHARED_SRC)) {
  LOG.error(`Shared source directory not found at ${SHARED_SRC}`);
  process.exit(1);
}

if (!existsSync(DEST)) {
  mkdirSync(DEST, { recursive: true });
}

for (const file of readdirSync(SHARED_SRC)) {
  if (!file.endsWith('.ts')) continue;
  cpSync(join(SHARED_SRC, file), join(DEST, file));
  LOG.info(`Copied ${file}`);
}
