# Task management

A simple task management system with authentication, using technologies like NodeJS, Express, MongoDB, and Mongoose to implement the solution.

##

API Endpoint:https://task-management-12.herokuapp.com/api

# Technologies Used

- Backend: Node/Express
- MongoDB
- Mongoose
- Libaries: Es6, Babel-CLI, eslint, sinon. assert, express

# Features

- User can create an account and log in
- Authenticated User create task.
- Authenticated User get a task.
- Authenticated User update a task.
- Authenticated User delete a task.

## API Endpoints

| Endpoint                                   | Functionality           |
| ------------------------------------------ | ----------------------- |
| POST /api/signup                           | Register a user         |
| POST /api/login                            | Login a user            |
| POST /api/task/                            | create a task       |
| GET /api/task/\<task_id>                   | Find a task           |
| PATCH /api/task/\<task_id>                 | update a task     |
| DELETE /api/task/\<task_id>                | delete a task     |


[Task management](https://documenter.getpostman.com/view/16184222/U16bwUQ7#intro)

# To Install

- Download or clone
- Open terminal inside the root directory of clone folder
- Type `npm install` to install all dependencies
- `npm start` to run the app
- `npm run dev` to run development environment
- `npm test` to run the test suits on the app

## Env sample
- MONGO_DB_URL=
- LOG_LABEL=debug
- LOG_LEVEL=info
- LOG_FILE=logs
- HOSTNAME=
- PORT=
- JWT_SECRET=
- NODE_ENV=

API Endpoint: https://task-management-12.herokuapp.com/api

## AUTHOR

[Kayode Adeyemi](https://github.com/karosi12)
