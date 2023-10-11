const TelegramBot = require('node-telegram-bot-api');
const token = '6647221838:AAFxmmP7u5K2MsjlfHWoRsRjNe_5gUmLgX0'; // Замените на ваш токен
const bot = new TelegramBot(token, { polling: true });

const serviceKeyboard = [
  [{ text: '📊 Презентация (Слайд)' }, { text: '📝 Объективка' }],
  [{ text: '📄 Резюме' }, { text: '📇 Визитка' }],
];

const userData = {};
let requestCounter = 1; // Переменная для хранения номера заявки

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Добро пожаловать! Выберите услугу:', {
    reply_markup: {
      keyboard: serviceKeyboard,
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  });
});

bot.on('text', (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const messageText = msg.text;

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
      bot.sendMessage(chatId, '');
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

    if (msg.from.username) {
      userData[userId].address = `@${msg.from.username}`;
      const adminChatId = '6498144305'; // Замените на chat_id администратора
      const userMessage = `Новая заявка номер ${requestCounter}:\n\nУслуга: ${userData[userId].service}\nТема: ${userData[userId].topic}\nЯзык работы: ${userData[userId].language}\nКоличество страниц: ${userData[userId].pages}\nИмя: ${userData[userId].name}\nНомер телефона: ${userData[userId].contact}\nАдрес клиента (ник Telegram): ${userData[userId].address}`;
      bot.sendMessage(adminChatId, userMessage);
      bot.sendMessage(chatId, 'Заявка успешно отправлена, ожидайте ответа оператора.');
      requestCounter++; // Увеличиваем номер заявки
    } else {
      const adminChatId = '6498144305'; // Замените на chat_id администратора
      const userMessage = `Новая заявка номер ${requestCounter}:\n\nУслуга: ${userData[userId].service}\nТема: ${userData[userId].topic}\nЯзык работы: ${userData[userId].language}\nКоличество страниц: ${userData[userId].pages}\nИмя: ${userData[userId].name}\nНомер телефона: ${userData[userId].contact}`;
      bot.sendMessage(adminChatId, userMessage);
      bot.sendMessage(chatId, 'Заявка успешно отправлена, ожидайте ответа оператора.');
      requestCounter++; // Увеличиваем номер заявки
    }

    delete userData[userId];
  }
});

module.exports = bot; // Экспортируем бота
