# Job Tracker

A web app built for tracking your own job applications that you send off to companies.
Built with Next.js and a custom Django REST Framework backend API built by myself. 

- Users can register and login.
- Track applications.
- Upload resumes.
- Delete and edit applications.

Overall a really fun app to create.
&nbsp;
## Environment Variables

To run this project, you will need to add the following environment variables to your .env files.

```bash
cd ./job-tracker-frontend/.env.local
```

`NEXT_PUBLIC_DEV = True`

`NEXT_PUBLIC_PROD_API=""`

`NEXT_PUBLIC_DEV_API="http://localhost:8000"`

&nbsp;

```bash
cd ./backend/.env
```
`SECRET_KEY = [SECRET_KEY]`

`DEBUG_MODE = FALSE`

`JWT_SECRET = [JWT_SECRET]`

`JWT_ALG = [ALG_TYPE]`

`IMAGE_BUCKET = [BUCKET_NAME]`


&nbsp;
## Getting Started

To run this project

Frontend:
```bash
    cd ./job-tracker-frontend
    npm install
    npm run dev
```

Backend:
```bash
    cd ./backend/job_tracker_backend/
    python manage.py runserver
```

