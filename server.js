const express = require('express');
const app = express();

// Подключение к файлу с вашим ботом
const bot = require('./bot.js'); // Импортируйте бота

// Настройка порта
const port = process.env.PORT || 3000;

// Простой маршрут для проверки работоспособности сервера
app.get('/', (req, res) => {
  res.send('Бот работает!');
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
