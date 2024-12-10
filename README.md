# Weather Update Bot with Admin Panel

This project is a Telegram bot that allows users to subscribe to weather updates and includes an admin panel for managing the bot.

## Features

- Users can subscribe/unsubscribe to weather updates.
- Provides real-time weather information using OpenWeatherMap API.
- Admin panel for blocking/unblocking users and updating API keys.

## Setup

1. Clone this repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the `.env` file with your credentials.
4. Start the bot:
   ```bash
   npm start
   ```
5. Start the admin panel:
   ```bash
   npm run admin
   ```

## Endpoints

- **GET /subscribers** - View all subscribers.
- **POST /block** - Block a user.
- **POST /unblock** - Unblock a user.
- **POST /update-api-key** - Update the weather API key.

## Commands

- `/start` - Start the bot.
- `/subscribe` - Subscribe to weather updates.
- `/unsubscribe` - Unsubscribe from weather updates.
- `/weather` - Get current weather.

---
Happy Coding!