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

   - Go to **[ESlint-Prettier Blog](https://blog.logrocket.com/linting-typescript-eslint-prettier/)**
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

   - Use the following code at the top of the tsconfig.js to tell typescript which files to compile and which files to skip

   ```bash
   "include": ["src"], // which files to compile
   "exclude": ["node_modules"], // which files to skip
   ```

5. Make a file named .eslintignore to ignore certhe following files from linting

   ```bash
   dist
   node_modules
   .env
   ```

6. Make a file called .prettierrc(For using Prettier)

   - Go to **[ESlint-Prettier Blog](https://blog.logrocket.com/linting-typescript-eslint-prettier/)**
   - Use the following config into .prettierrc file

   ```bash
   {
   "semi": false,
   "singleQuote": true,
   "arrowParens": "avoid"
   }
   ```

   - In VS Code settings.json add this

   ```bash
   "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
   }
   ```

7. Go to **[Husky GitHub](https://typicode.github.io/husky/getting-started.html)**

   - Make .husky folder with shell with the following command

   ```bash
   yarn husky install
   ```

8. In the package.json add the following scripts

   ```bash
   "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
   "start": "node ./dist/server.js",
   "lint:check": "eslint --ignore-path .eslintignore --ext .js,.ts .",
   "lint:fix": "lint --fix",
   "prettier:format": "prettier --ignore-path .gitignore --write \"**/*.+(js|ts|json)\"",
   "lint-prettier": "yarn lint:check && yarn prettier:format",
   ```

   - yarn dev: Will compile the typescript code and run the server
   - yarn start: Will compile the javascript output
   - yarn lint:check: Will check if there is any problem with the code
   - yarn lint:fix: Will perform linting and attempt to fix the issues it can
   - yarn prettier:format: Will format the code
   - yarn lint-prettier: Will check if there is any problem with the code then it will also format the code

9. Go to **[Lint Staged](https://www.npmjs.com/package/lint-staged?activeTab=readme)**

   - Add these code into the package.json down the script

   ```bash
   "lint-staged": {
   "src/**/*.ts": "yarn lint-prettier"
   }
   ```

   - Here "yarn lint-prettier" used to automatically check the linting problem and formating problem while commiting into git.

10. Navigate .husky > pre-commit and add
    ```bash
    yarn lint-staged
    ```

## The setup of typescript, eslint, prettier, husky and lint-staged completed here

## Server setup-------------->

1.  For using the .env

    - Make a folder named config
    - Make a file named index.ts
    - Into the index.ts

      ```bash
      import dotenv from 'dotenv'
      import path from 'path'
      /* This code is using the `dotenv` package to load environment variables from a `.env` file located in
      the root directory of the project. process.cwd() means the root directory */
      dotenv.config({
      path: path.join(process.cwd(), '.env'),
      })

      export default {
      port: process.env.PORT || 8000,
      database_string: process.env.DATABASE_STRING,
      }
      ```

2.  Make a file named app.ts add the following code

    ```bash
    import express, { Application, Request, Response } from 'express'
    import cors from 'cors'

    const app: Application = express()

    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    // Testing route
    app.get('/', (req: Request, res: Response) => {
    res.send('Route is working!')
    })

    export default app
    ```

3.  Make a file named server.ts and add this following code

    ```bash
    import mongoose from 'mongoose'
    import app from './app'
    import config from './config'

    async function databaseConnection() {
    try {
        await mongoose.connect(config.database_string as string)
        console.log('Database connected successfully')

        app.listen(config.port, () => {
        console.log(`University server is listening on port ${config.port}`)
        })
    } catch (error) {
        console.log('Error while connecting database: ', error)
    }
    }

    databaseConnection()
    ```

# Done ------------------------------>
