# Frontend Setup Instructions

## Prerequisites
1. Install Node.js (LTS version recommended) from https://nodejs.org/
   - This will also install npm (Node Package Manager)

## Verify Installation
```bash
node --version
npm --version
```

## Initialize React App with Vite

Once Node.js is installed, run:

```bash
npm create vite@latest frontend -- --template react
```

**Note:** If the frontend directory already exists with some files, you may need to:
1. Remove the existing frontend directory, OR
2. Initialize in a temporary directory and merge files manually

After initialization, navigate to the frontend directory:
```bash
cd frontend
npm install
```

## Development Server

To run the development server:
```bash
npm run dev
```

The app will be available at http://localhost:5173

