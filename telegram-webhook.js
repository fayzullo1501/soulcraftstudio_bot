// telegram-webhook.js

const { Telegram } = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_BOT_TOKEN; // Получаем токен из переменных окружения

exports.handler = async (event, context) => {
  const bot = new Telegram(token);

  // Обработка входящего запроса от Telegram (event.body)
  const body = JSON.parse(event.body);

  // Ваша логика обработки запросов здесь

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'OK' }),
  };
};
