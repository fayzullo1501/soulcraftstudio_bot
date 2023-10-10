// 6647221838:AAFxmmP7u5K2MsjlfHWoRsRjNe_5gUmLgX0  446415034
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');

const token = '6647221838:AAFxmmP7u5K2MsjlfHWoRsRjNe_5gUmLgX0'; // Замените на ваш токен
const bot = new TelegramBot(token);

const serviceKeyboard = [
  [{ text: '📊 Презентация (Слайд)' }, { text: '📝 Объективка' }],
  [{ text: '📄 Резюме' }, { text: '📇 Визитка' }],
];

const userData = {};
let requestCounter = 1; // Переменная для хранения номера заявки

// Создайте веб-сервер Express
const app = express();

// Используйте bodyParser для обработки JSON входящих данных
app.use(bodyParser.json());

// Роут для обработки входящих обновлений от Telegram
app.post('/webhook', (req, res) => {
  const { message } = req.body;
  const chatId = message.chat.id;
  const userId = message.from.id;
  const messageText = message.text;

  // Обработка входящих сообщений
  if (!userData[userId]) {
    userData[userId] = {
      service: '',
      topic: '',
      language: '',
      pages: 0,
      name: '',
      contact: '',
      address: '',
    };
  }

  if (!userData[userId].service) {
    if (serviceKeyboard.some((row) => row.some((item) => item.text === messageText))) {
      userData[userId].service = messageText;
      bot.sendMessage(chatId, 'Введите тему работы:');
    } else {
      bot.sendMessage(chatId, 'Пожалуйста, выберите услугу, используя кнопки-иконки.');
    }
  } else if (!userData[userId].topic) {
    userData[userId].topic = messageText;
    bot.sendMessage(chatId, 'Введите язык работы:');
  } else if (!userData[userId].language) {
    userData[userId].language = messageText;
    bot.sendMessage(chatId, 'Введите количество страниц работы:');
  } else if (!userData[userId].pages) {
    if (!isNaN(messageText)) {
      userData[userId].pages = parseInt(messageText);
      bot.sendMessage(chatId, 'Введите ваше имя:');
    } else {
      bot.sendMessage(chatId, 'Введите корректное количество страниц:');
    }
  } else if (!userData[userId].name) {
    userData[userId].name = messageText;
    bot.sendMessage(chatId, 'Введите ваш номер телефона:');
  } else if (!userData[userId].contact) {
    userData[userId].contact = messageText;

    if (message.from.username) {
      userData[userId].address = `@${message.from.username}`;
      const adminChatId = '446415034'; // Замените на chat_id администратора
      const userMessage = `Новая заявка номер ${requestCounter}:\n\nУслуга: ${userData[userId].service}\nТема: ${userData[userId].topic}\nЯзык работы: ${userData[userId].language}\nКоличество страниц: ${userData[userId].pages}\nИмя: ${userData[userId].name}\nНомер телефона: ${userData[userId].contact}\nАдрес клиента (ник Telegram): ${userData[userId].address}`;
      bot.sendMessage(adminChatId, userMessage);
      bot.sendMessage(chatId, 'Заявка успешно отправлена, ожидайте ответа оператора.');
      requestCounter++; // Увеличиваем номер заявки
    } else {
      const adminChatId = '446415034'; // Замените на chat_id администратора
      const userMessage = `Новая заявка номер ${requestCounter}:\n\nУслуга: ${userData[userId].service}\nТема: ${userData[userId].topic}\nЯзык работы: ${userData[userId].language}\nКоличество страниц: ${userData[userId].pages}\nИмя: ${userData[userId].name}\nНомер телефона: ${userData[userId].contact}`;
      bot.sendMessage(adminChatId, userMessage);
      bot.sendMessage(chatId, 'Заявка успешно отправлена, ожидайте ответа оператора.');
      requestCounter++; // Увеличиваем номер заявки
    }

    delete userData[userId];
  }

  res.sendStatus(200); // Отправляем статус 200 OK обратно Telegram
});

// Стартовая команда для настройки Webhook
bot.setWebHook('https://soulcraftbot.netlify.app/webhook');

// Установка слушателя на Express для веб-сервера
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Express server is listening on port ${port}`);
});



