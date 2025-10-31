# Backend Setup Instructions

## Prerequisites
1. Install Python 3.10 or higher from https://www.python.org/downloads/
   - During installation, check "Add Python to PATH"

## Create Virtual Environment

Once Python is installed, run these commands in your terminal (Git Bash):

```bash
cd backend
python -m venv venv
```

## Activate Virtual Environment

**On Windows (Git Bash):**
```bash
source venv/Scripts/activate
```

**On Windows (PowerShell):**
```powershell
venv\Scripts\Activate.ps1
```

**On macOS/Linux:**
```bash
source venv/bin/activate
```

## Install Dependencies

After activating the virtual environment:

```bash
pip install -r requirements.txt
```

## Verify Installation

```bash
python -c "import fastapi; print('FastAPI installed successfully')"
```

