# Neon Database Setup

## Steps to set up Neon PostgreSQL

1. Go to https://neon.tech and sign up (free tier is fine).
2. Create a new project (PostgreSQL 15+).
3. In the project dashboard, copy the SQLAlchemy connection string.
   - It looks like: `postgresql+psycopg2://USERNAME:PASSWORD@HOST/DBNAME?sslmode=require`
4. Create a `.env` file in `backend/` with:
   - `DATABASE_URL=postgresql+psycopg2://USERNAME:PASSWORD@HOST/DBNAME?sslmode=require`
5. Keep `.env` private. It should not be committed to git.

If you prefer, paste your SQLAlchemy URL to me and I will write `backend/.env` for you.


