# Gamified Learning Platform for Programmers
A dynamic, neon-themed MERN stack application designed to turn boring coding practice into an engaging, interactive game-like experience!

## Tech Stack
- **Frontend:** React, Tailwind CSS v4, Framer Motion, Monaco Editor
- **Backend:** Node.js, Express, MongoDB
- **Security:** JWT Authentication
- **Judge Integration:** Proxy setup to execute code (Mocked for demonstration out-of-the-box!)

## Features
- **User Dashboard** with XP, Level, Diamonds, and Streak metrics.
- **Interactive Coding Challenges** using an integrated IDE setup.
- **Framer Motion Animations** for leveling up, earning diamonds, and claiming rewards.
- **Global Leaderboard** to compete with developers around the world.
- **Neon Dark Mode Theme** that looks and feels like a game.

---

## Folder Structure
```plaintext
/
├── client/                 # Frontend React logic
│   ├── src/
│   │   ├── pages/          # All interactive UI screens
│   │   ├── App.jsx         # Router configuration
│   │   └── index.css       # Custom Neon Tailwind utilities
│   ├── package.json
│   └── vite.config.js
└── server/                 # Backend Node Logic
    ├── config/             # DB connectivity
    ├── models/             # Mongoose schemas (User, Content)
    ├── routes/             # Authentication, Progress, Leaderboard, Judge
    ├── server.js           # REST API entry file
    ├── seed.js             # Dummy Data populator
    └── package.json
```

---

## Setup & Run Instructions

You will need two terminals to run the frontend and backend simultaneously.

### 1. Database Setup
1. Ensure MongoDB is running locally on port 27017, or update the `MONGODB_URI` in `server/.env` to point to your cloud cluster.
2. In the `server` folder, run the following to populate dummy users and mock challenges:
   ```bash
   cd server
   node seed.js
   ```

### 2. Start the Backend
1. Open a new terminal.
2. Navigate to the server folder and start the API:
   ```bash
   cd server
   npm i
   node server.js
   ```
   *The server will run on http://localhost:5000*

### 3. Start the Frontend
1. Open a new terminal.
2. Navigate to the client folder, install dependencies, and start the app:
   ```bash
   cd client
   npm install
   npm run dev
   ```
   *The React app will launch on http://localhost:5173*

## Usage
1. Open the frontend in your browser.
2. Use a dummy account from the leaderboard or Sign Up bounds for a new user.
3. Start a coding challenge, type `console.log("Hello, World!")`, and hit run to see the game rewards in action!
