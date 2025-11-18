# Quick Setup Guide

## Step 1: Install Dependencies

Run this command to install all dependencies:
```bash
npm run install-all
```

Or manually:
```bash
npm install
cd server
npm install
cd ..
```

## Step 2: Create Environment Files

### Create `.env` in the root directory (frontend-main/)
Create a file named `.env` with:
```
VITE_API_URL=http://localhost:3000/
```

### Create `.env` in the server directory (frontend-main/server/)
Create a file named `.env` with:
```
PORT=3000
```

## Step 3: Run the Application

```bash
npm run dev
```

This will start:
- Backend server on http://localhost:3000
- Frontend dev server on http://localhost:5173 (or next available port)

Open your browser and navigate to the frontend URL shown in the terminal.

## Troubleshooting

- If you get connection errors, make sure both servers are running
- Check that the `.env` files are created correctly
- Make sure port 3000 is not already in use

