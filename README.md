# Nova Studio - Fullstack Assignment

This is my submission for the Nova Studio fullstack developer assignment. Its a web app for a digital agency that has a landing page, contact form, admin panel and analytics tracking.

## Tech Stack

- Next.js (pages router)
- Material UI for styling
- PostgreSQL (using Neon) for storing projects and contacts
- MongoDB Atlas for analytics/logs
- Deployed on Vercel

## Features

- Landing page with hero section, services, portfolio, stats and contact form
- All sections fetch data from backend API routes
- Contact form saves to postgres and shows success/error message
- Admin panel at /admin (protected with session cookie)
- Admin can view contact submissions, add new projects and delete projects
- Tracks page visits and CTA button clicks in MongoDB
- Scroll animations and count up animation for stats

## Folder Structure

nova-studio/

components/     # all the UI components

db/             # schema.sql file for reference

hooks/          # custom hooks (useInView, useCountUp)

lib/            # db connection files and auth helper

pages/          # next.js pages

api/            # all backend api routes

admin/          # admin panel pages

public/images/  # project images

styles/         # global css

## How to run locally

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd nova-studio
```

### 2. Install packages

```bash
npm install
```

### 3. Setup environment variables

Make a `.env.local` file in the root and copy the variables from `.env.example` and fill them in.

You'll need:
- A postgres database, I used Neon
- A MongoDB database, I used MongoDB Atlas
- Admin username and password (you can set anything)
- A random string for the session secret, you can generate one with `openssl rand -hex 32`

### 4. Setup the database

Take the SQL from `db/schema.sql` and run it in your postgres database. If you are using Neon just paste it in the SQL editor and hit run. It will create the tables and add some sample projects.

### 5. Start the dev server

```bash
npm run dev
```

App runs on [http://localhost:3000](http://localhost:3000)

Admin panel is on [http://localhost:3000/admin](http://localhost:3000/admin)

## API Routes

| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| GET | `/api/projects` | get all projects | No |
| POST | `/api/projects` | add a project | Yes |
| DELETE | `/api/projects/:id` | delete a project | Yes |
| GET | `/api/stats` | get stats data | No |
| GET | `/api/services` | get services | No |
| POST | `/api/contact` | submit contact form | No |
| GET | `/api/contacts` | view all form submissions | Yes |
| POST | `/api/analytics` | log an event | No |
| GET | `/api/analytics` | view analytics summary | Yes |

## Deployment

Deployed on Vercel.