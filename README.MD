# Project Name

## Description

A brief description of the project.

## Getting Started

These instructions will help to set up ESLint, Prettier, husky, and lint-staged for your TypeScript project.

### Prerequisites

Make sure you have the following dependencies installed globally:

- Node.js
- npm or yarn

### Installation

### Project setup with yarn:

```bash
 npm init -y
```

1. Install these dependencies

   ```bash
   yarn add express mongoose eslint dotenv cors
   ```

2. Install these as devDependencies

   ```bash
   yarn add -D typescript ts-node-dev @types/express @types/cors @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier prettier lint-staged husky
   ```

3. Add a tsconfig.json for typescript configuration

   ```bash
   tsc --init
   ```

    - Set the rootDir and outDir as src and dist folder

4. Make a file called .eslintrc(For using ESlint)

    - Go to **[ESlint Blog](https://blog.logrocket.com/linting-typescript-eslint-prettier/)**
    - Use the following config into .eslintrc file

    ```bash
    {
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
    "ecmaVersion": 13,
    "sourceType": "module"
    },
    "plugins": ["@typescript-eslint"],
    "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
    "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/consistent-type-definitions": ["error", "type"]
    },
    "env": {
    "browser": true,
    "es2021": true
    }
    }
    ```
