# Installation

This guide will help you install and set up Devlien in your project.

## Prerequisites

Before installing, ensure you have:

- **Node.js** version 18.x or higher
- **npm** (comes with Node.js) or **yarn**

Check your versions:

```bash
node --version
npm --version
```

## Installation Options

### Option 1: Using CLI (Recommended)

The fastest way to create a new project:

```bash
npx create-devlien my-app
cd my-app
npm install
```

This will create a new directory with a basic project structure.

### Option 2: Manual Installation

Install the framework in an existing project:

```bash
npm install devlien
```

Or with yarn:

```bash
yarn add devlien
```

### Option 3: TypeScript Project

For TypeScript projects:

```bash
npm install devlien
npm install -D typescript @types/node
```

Create a `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

## Project Structure

After installation, your project should look like this:

```
my-app/
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   └── index.ts
├── package.json
└── tsconfig.json
```

## Verify Installation

Create a simple app to verify everything works:

```typescript
// src/index.ts
import { createApp } from 'devlien'

const app = createApp()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
```

Run your app:

```bash
npm run dev
```

Visit `http://localhost:3000` - you should see "Hello World!"

## Next Steps

Now that you have Devlien installed, check out the [Quick Start](/guide/quick-start) guide to build your first application.
