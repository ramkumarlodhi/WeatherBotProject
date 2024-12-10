const { Telegraf } = require('telegraf');
const axios = require('axios');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

let subscribers = []; // Stores subscriber data
let blockedUsers = [];

// Command: Start
bot.start((ctx) => {
    ctx.reply(
        'Welcome to the Weather Update Bot! Use /subscribe to get weather updates and /unsubscribe to stop them.'
    );
});

// Command: Subscribe
bot.command('subscribe', (ctx) => {
    const chatId = ctx.chat.id;
    if (subscribers.includes(chatId)) {
        ctx.reply('You are already subscribed!');
    } else {
        subscribers.push(chatId);
        ctx.reply('You have subscribed to weather updates!');
    }
});

// Command: Unsubscribe
bot.command('unsubscribe', (ctx) => {
    const chatId = ctx.chat.id;
    subscribers = subscribers.filter((id) => id !== chatId);
    ctx.reply('You have unsubscribed from weather updates.');
});

// Command: Weather
bot.command('weather', async (ctx) => {
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${process.env.WEATHER_API_KEY}&units=metric`
        );
        const weather = response.data;
        ctx.reply(
            `Current weather in ${weather.name}: ${weather.main.temp}°C, ${weather.weather[0].description}.`
        );
    } catch (error) {
        ctx.reply('Error fetching weather data.');
    }
});

// Middleware to handle blocked users
bot.use((ctx, next) => {
    if (blockedUsers.includes(ctx.chat.id)) {
        ctx.reply('You are blocked from using this bot.');
    } else {
        next();
    }
});

// Start Bot
bot.launch();
console.log('Bot is running...');