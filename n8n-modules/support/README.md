# @keloola/support

This is an internal shared package for the Keloola n8n nodes monorepo. It contains build scripts and shared utilities used across different node packages.

## 📦 Components

### Scripts

- **`generate-env.ts`**: A script that generates `env.ts` files for each workspace. It reads from environment variables and ensures type-safe configuration access within the nodes.
- **`distribute-shared.ts`**: A script responsible for copying the contents of the `shared/` directory into each workspace's local `shared/` folder during the prebuild process. This allows nodes to share common logic while remaining standalone packages.

### Shared Code

- **`shared/`**: Contains common utilities, types, and helpers that are distributed to individual node packages.

## 🚀 Usage

This package is primarily used by the root `prebuild.sh` script and workspace-level `prebuild` scripts.

```bash
# From root
npm run prebuild

# Or directly running the generator
node n8n-modules/support/generate-env.mjs
```
