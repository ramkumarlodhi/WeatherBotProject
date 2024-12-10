const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

let subscribers = []; // Shared with bot.js
let blockedUsers = [];

// Admin Authentication Middleware
const authenticate = (req, res, next) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
};

// API: View Subscribers
app.get('/subscribers', authenticate, (req, res) => {
    res.json({ subscribers });
});

// API: Block User
app.post('/block', authenticate, (req, res) => {
    const { chatId } = req.body;
    if (!blockedUsers.includes(chatId)) {
        blockedUsers.push(chatId);
    }
    res.send('User blocked.');
});

// API: Unblock User
app.post('/unblock', authenticate, (req, res) => {
    const { chatId } = req.body;
    blockedUsers = blockedUsers.filter((id) => id !== chatId);
    res.send('User unblocked.');
});

// API: Update API Key
app.post('/update-api-key', authenticate, (req, res) => {
    const { apiKey } = req.body;
    process.env.WEATHER_API_KEY = apiKey;
    res.send('API key updated.');
});

// Start Admin Panel
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Admin panel is running on http://localhost:${PORT}`);
});