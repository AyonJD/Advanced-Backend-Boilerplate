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
    "ecmaVersion": 12,
    "sourceType": "module"
   },
   "plugins": ["@typescript-eslint"],
   "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
   ],
   "rules": {
    "no-unused-vars": "warn",
    "prefer-const": "error",
    "no-unused-expressions": "error",
    "no-undef": "error",
    "no-console": "warn",
    "@typescript-eslint/consistent-type-definitions": "off"
   },
   "env": {
    "browser": true,
    "es2021": true,
    "node": true
   },
   "globals": {
    "process": "readonly"
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
    "build": "tsc",
    "lint:check": "eslint --ignore-path .eslintignore --ext .js,.ts .",
    "lint:fix": "lint --fix",
    "prettier:format": "prettier --ignore-path .gitignore --write \"**/*.+(js|ts|json)\"",
    "lint-prettier": "yarn lint:check && yarn prettier:format",
    "test": "echo \"Error: no test specified\" && exit 1"
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

10. Make a hook for husky pre-commit

    ```bash
    yarn husky add .husky/pre-commit "yarn lint-staged"
    ```

    - Here yarn lint-staged will target the package.json lint-staged

11. Navigate .husky > pre-commit and add
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
    /_ This code is using the `dotenv` package to load environment variables from a `.env` file located in
    the root directory of the project. process.cwd() means the root directory _/
    dotenv.config({
    path: path.join(process.cwd(), '.env'),
    })
    export default {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 8000,
    database_string: process.env.DATABASE_STRING,
    }
    ```

2.  Make a file named app.ts add the following code

    ```bash
    import express, { Application } from 'express'
    import cors from 'cors'
    import globalErrorHandler from './app/middlewares/globalErrorHandler'
    import httpStatus from 'http-status'
    import { sendSuccessResponse } from './shared/customResponse'
    /_ Import routes _/
    import routes from './app/routes/index'
    const app: Application = express()
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    /_ Testing route _/
    app.get('/', async (req, res, next) => {
    const responseData = {
    message: 'Welcome to Express API template',
    data: null,
    }
    sendSuccessResponse(res, responseData)
    })
    /_ All routes here _/
    /_ app.use('/api/v1', routes) _/
    /_Global error handler _/
    app.use(globalErrorHandler)
    /_ Forbidden routes _/
    app.all('\*', (req, res, next) => {
    res.status(httpStatus.NOT_FOUND).json({
    status: 'false',
    message: `No API endpoint found for ${req.method} ${req.originalUrl}`,
    errorMessages: [
    {
    message: `No API endpoint found for ${req.method} ${req.originalUrl}`,
    path: req.originalUrl,
    },
    ],
    stack: '',
    })
    })
    export default app
    ```

3.  Make a file named server.ts and add this following code

    ```bash
    import mongoose from 'mongoose'
    import app from './app'
    import config from './config'
    import { errorLogger, successLogger } from './shared/logger'
    import { Server } from 'http'
    let server: Server
    /_ This code is setting up a listener for uncaught exception. It's a synchronous process _/
    process.on('uncaughtException', error => {
    errorLogger.error(error)
    process.exit(1)
    })
    /_ This code is setting up a listener for unhandled promise rejections. It's a asynchronous process _/
    process.on('unhandledRejection', error => {
    if (server) {
    server.close(() => {
    errorLogger.error(error)
    process.exit(1)
    })
    }
    })
    /_ `process.on('SIGTERM', () => {...})` sets up a listener for the SIGTERM signal, which is a signal
    sent to a process to request its termination. When this signal is received, the code inside the
    listener function is executed. In this case, if the `server` variable is defined (meaning the server
    is running), it is closed and a success message is logged. This is a way to gracefully shut down the
    server when the process is terminated, such as when the application is deployed to a cloud platform
    and needs to be scaled down or updated. _/
    process.on('SIGTERM', () => {
    if (server) {
    server.close(() => {
    successLogger.info('Process terminated')
    })
    }
    })
    async function databaseConnection() {
    try {
    await mongoose.connect(config.database_string as string)
    successLogger.info('Database connected successfully')

         server = app.listen(config.port, () => {
            successLogger.info(`Server is listening on port ${config.port}`)
         })
    } catch (error) {
    errorLogger.error('Error while connecting database: ', error)
    }
    }
    databaseConnection()
    ```

# Clone the project for all the error handler, logger and custom functions ------------------------------>
