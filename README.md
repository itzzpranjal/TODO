# Todo App - Full Stack Application

A full-stack Todo application built with React (Vite) frontend and Express.js backend.

## Project Structure

```
frontend-main/
├── server/              # Backend Express server
│   ├── index.js        # Server entry point
│   ├── config.js       # Initial todo data
│   └── package.json    # Backend dependencies
├── src/                # Frontend React application
│   ├── views/         # React components
│   └── ...
└── package.json        # Root package.json with unified scripts
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Setup Instructions

1. **Install all dependencies:**
   ```bash
   npm run install-all
   ```
   This will install dependencies for both the root project and the server.

2. **Create environment files:**
   
   Create a `.env` file in the root directory:
   ```
   VITE_API_URL=http://localhost:3000/
   ```
   
   Create a `.env` file in the `server/` directory:
   ```
   PORT=3000
   ```

## Running the Application

### Option 1: Run both frontend and backend together (Recommended)
```bash
npm run dev
```
This will start both the backend server (port 3000) and frontend dev server (usually port 5173) concurrently.

### Option 2: Run separately

**Backend only:**
```bash
npm run server
```

**Frontend only:**
```bash
npm run client
```

## Available Scripts

- `npm run dev` - Runs both frontend and backend concurrently
- `npm run server` - Runs only the backend server
- `npm run client` - Runs only the frontend dev server
- `npm run build` - Builds the frontend for production
- `npm run preview` - Preview the production build
- `npm run install-all` - Installs dependencies for both root and server

## API Endpoints

The backend server provides the following endpoints:

- `GET /` - Health check
- `GET /todos` - Get all todos
- `POST /todos` - Create a new todo
- `DELETE /todos/:id` - Delete a todo by ID
- `PATCH /todos/:id` - Update a todo by ID

## Features

- ✅ Create todos with title, priority, and emoji
- ✅ View all todos
- ✅ Delete todos
- ✅ Responsive UI
- ✅ Real-time updates

## Technologies Used

**Frontend:**
- React 19
- Vite
- React Router
- Axios
- Emoji Picker React

**Backend:**
- Express.js
- CORS
- dotenv

## Deploying to Render

1. **Backend service**
   - Push this repo to GitHub.
   - Create a new **Web Service** on Render pointing to the `server` directory.
   - Set the build command to `cd server && npm install`.
   - Set the start command to `cd server && npm start`.
   - Add environment variables as needed (e.g., `PORT=10000` is set automatically by Render).

2. **Frontend service**
   - Create a new **Static Site** on Render pointing to the repo root.
   - Build command: `npm install && npm run build`.
   - Publish directory: `dist`.
   - In the Render static site settings, add the environment variable `VITE_API_URL=https://<your-backend-service>.onrender.com/`.

3. **Verify deployment**
   - Once both services are live, open the frontend URL and confirm that you can create, toggle, and delete tasks.

> Tip: A sample `render.yaml` blueprint is provided so you can deploy both services from a single Render "Blueprint" project. Update the service names or environment variables there if you prefer different naming.

