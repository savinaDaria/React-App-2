# React-App
Personal Project Management Tool

Run:
>npm i

You can start both the frontend and backend projects from the root of your project using the defined scripts:

>npm run start:frontend

>npm run start:backend

# Creating a new migration cd backend
$ npm run typeorm migration:create ./src/migrations/name-of-the-migration-file

# Running migrations
$ npm run typeorm migration:run -- -d ./src/utils/database-config/connection-config.ts

# Reverting migrations
$ npm run typeorm migration:revert -- -d ./src/utils/database-config/connection-config.ts