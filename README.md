# Drive

A Google Drive-style cloud storage app: register, log in, upload files and browse them from a dashboard, built with Node.js, Express, MongoDB and EJS.

## Features

- Account registration and login
- bcrypt password hashing
- JWT issued on registration and stored in a cookie to protect private routes
- File uploads handled with Multer, saved on disk with collision-safe filenames
- Server-rendered pages (register, login, dashboard) using EJS and Tailwind CSS

## Tech stack

- Node.js + Express 5
- MongoDB + Mongoose
- EJS templating
- JWT (jsonwebtoken), bcrypt, Multer, cookie-parser

## Getting started

```bash
npm install
```

Create a `.env` file in the project root:

```
MONGO_URI=your_mongodb_connection_string
SECRET=your_jwt_secret
PORT=3000
```

```bash
npm run dev
```

Open http://localhost:3000, register an account, then upload files from the dashboard.

## Structure

```
Drive/
├── Models/user.js   # user schema
├── views/           # register.ejs, login.ejs, index.ejs
├── uploads/         # uploaded files (git-ignored, kept via .gitkeep)
├── server.js        # app setup and routes
└── package.json
```

## Routes

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/` | Registration page |
| POST | `/register` | Create an account and set the auth cookie |
| GET | `/login` | Login page |
| POST | `/login` | Authenticate a user |
| GET | `/index` | File dashboard |
| POST | `/create` | Upload a file |
| GET | `/logout` | Clear the session |

## Notes

`uploads/` holds runtime user files and is excluded from git; the folder is kept in the repo with `.gitkeep` so a fresh clone can start accepting uploads immediately.
