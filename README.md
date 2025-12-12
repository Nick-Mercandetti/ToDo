# Todo App

A full-stack Todo application built with React (frontend) and FastAPI (backend), using Neon PostgreSQL for data storage.

## Features

- Create, read, update, and delete todos
- Mark todos as complete/incomplete
-  Add descriptions to todos
-  Modern, responsive UI
-  Real-time updates

## Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **CSS3** - Styling

### Backend
- **FastAPI** - Python web framework
- **SQLAlchemy** - ORM
- **PostgreSQL** - Database (hosted on Neon)
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server

## Prerequisites

- **Python 3.10+** - [Download here](https://www.python.org/downloads/)
- **Node.js 18+** - [Download here](https://nodejs.org/)
- **Neon Account** - Free account at [neon.tech](https://neon.tech)

## Setup

### 1. Database Setup (Neon)

1. Go to [neon.tech](https://neon.tech) and sign up for a free account
2. Create a new project
3. In the project dashboard, copy the SQLAlchemy connection string
4. The connection string should look like:
   ```
   postgresql+psycopg2://username:password@hostname/database?sslmode=require
   ```
5. Create `backend/.env` file:
   ```bash
   cd backend
   cp env.sample .env
   # Edit .env and paste your DATABASE_URL
   ```

See `NEON_SETUP.md` for detailed instructions.

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows (Git Bash):
source venv/Scripts/activate
# On Windows (PowerShell):
venv\Scripts\Activate.ps1
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

## Running the Application

### Start Backend Server

```bash
cd backend

# Make sure virtual environment is activated
venv\Scripts\Activate.ps1  # Windows PowerShell
# or
source venv/Scripts/activate  # Git Bash

# Run the FastAPI server
uvicorn app.main:app --reload
```

Backend will be available at:
- API: http://localhost:8000
- API Documentation: http://localhost:8000/docs
- Alternative Docs: http://localhost:8000/redoc

### Start Frontend Server

Open a new terminal:

```bash
cd frontend

# Run the development server
npm run dev
```

Frontend will be available at: http://localhost:5173

## Project Structure

```
ToDo/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI app entry point
│   │   ├── models.py            # SQLAlchemy models
│   │   ├── schemas.py           # Pydantic schemas
│   │   ├── database.py          # Database connection
│   │   ├── crud.py              # CRUD operations
│   │   └── api/
│   │       ├── __init__.py
│   │       └── routes.py        # API endpoints
│   ├── venv/                    # Virtual environment
│   ├── requirements.txt         # Python dependencies
│   ├── .env                     # Environment variables (not in git)
│   └── .gitignore
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TodoForm.jsx     # Form to create todos
│   │   │   ├── TodoItem.jsx     # Individual todo item
│   │   │   └── TodoList.jsx     # List of todos
│   │   ├── services/
│   │   │   └── api.js           # API client
│   │   ├── App.jsx              # Main app component
│   │   ├── main.jsx             # React entry point
│   │   └── App.css              # Styles
│   ├── package.json
│   ├── vite.config.js           # Vite configuration with proxy
│   └── .gitignore
├── .gitignore
└── README.md
```

## API Endpoints

### Todos

- `GET /api/todos` - Get all todos
- `GET /api/todos/{id}` - Get a single todo by ID
- `POST /api/todos` - Create a new todo
  ```json
  {
    "title": "My Todo",
    "description": "Optional description"
  }
  ```
- `PUT /api/todos/{id}` - Update a todo
  ```json
  {
    "title": "Updated Title",
    "description": "Updated description",
    "completed": true
  }
  ```
- `DELETE /api/todos/{id}` - Delete a todo

## Testing

### Backend Testing

You can test the API using the interactive documentation:
- Visit http://localhost:8000/docs
- Use the Swagger UI to test all endpoints

Or use curl commands:
```bash
# Get all todos
curl http://localhost:8000/api/todos

# Create a todo
curl -X POST http://localhost:8000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Test Todo", "description": "Testing"}'

# Update a todo (replace {id} with actual ID)
curl -X PUT http://localhost:8000/api/todos/{id} \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'

# Delete a todo (replace {id} with actual ID)
curl -X DELETE http://localhost:8000/api/todos/{id}
```

### Frontend Testing

1. Start both backend and frontend servers
2. Open http://localhost:5173 in your browser
3. Test the following:
   -  Create a new todo
   -  Mark a todo as complete
   -  Edit a todo (click Edit button)
   -  Delete a todo (click Delete button)
   -  Verify todos persist after page refresh

## Troubleshooting

### Backend Issues

**Database connection error:**
- Verify your `backend/.env` file has the correct `DATABASE_URL`
- Check that your Neon database is active
- Ensure the connection string uses `postgresql+psycopg2://` prefix

**Port already in use:**
- Change the port: `uvicorn app.main:app --reload --port 8001`
- Or stop the process using port 8000

### Frontend Issues

**npm not found:**
- Restart your terminal after installing Node.js
- Verify Node.js is installed: `node --version`

**Proxy error / CORS issues:**
- Ensure backend is running on port 8000
- Check `vite.config.js` has correct proxy configuration
- Verify backend CORS settings in `backend/app/main.py`

**Module not found:**
- Run `npm install` in the frontend directory
- Delete `node_modules` and `package-lock.json`, then reinstall

## Development Notes

- Backend uses SQLAlchemy for database operations
- Database tables are created automatically on first run
- Frontend uses Vite proxy to forward `/api` requests to backend
- CORS is configured to allow requests from frontend ports (5173, 3000)

## License

This project is open source and available for educational purposes.

