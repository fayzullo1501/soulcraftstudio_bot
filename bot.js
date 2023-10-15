const TelegramBot = require('node-telegram-bot-api');
const token = '6647221838:AAFxmmP7u5K2MsjlfHWoRsRjNe_5gUmLgX0'; // Replace with your bot token
const bot = new TelegramBot(token, { polling: true });

const serviceKeyboard = [
  [{ text: '📊 Presentation (Slide)' }, { text: '📝 Objective' }],
  [{ text: '📄 Resume' }, { text: '📇 Business Card' }],
];

const userData = {};
let requestCounter = 1;

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "Welcome! Please select a service:", {
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
      deadline: '', // Add a "Deadline" field
      name: '',
      contact: '',
      address: '',
    };
  }

  if (!userData[userId].service) {
    if (serviceKeyboard.some((row) => row.some((item) => item.text === messageText))) {
      userData[userId].service = messageText;
      bot.sendMessage(chatId, 'Please enter the presentation topic:');
    } else {
      bot.sendMessage(chatId, 'Invalid input. Please select a service from the keyboard.');
    }
  } else if (!userData[userId].topic) {
    userData[userId].topic = messageText;
    bot.sendMessage(chatId, 'Please enter the language of the presentation:');
  } else if (!userData[userId].language) {
    userData[userId].language = messageText;
    bot.sendMessage(chatId, 'Please enter the number of pages:');
  } else if (!userData[userId].pages) {
    if (!isNaN(messageText)) {
      userData[userId].pages = parseInt(messageText);
      bot.sendMessage(chatId, 'Please enter the deadline:');
    } else {
      bot.sendMessage(chatId, 'Invalid input. Please enter the number of pages.');
    }
  } else if (!userData[userId].deadline) {
    userData[userId].deadline = messageText;
    bot.sendMessage(chatId, 'Please enter your name:');
  } else if (!userData[userId].name) {
    userData[userId].name = messageText;
    bot.sendMessage(chatId, 'Please enter your contact number:');
  } else if (!userData[userId].contact) {
    userData[userId].contact = messageText;

    if (msg.from.username) {
      userData[userId].address = `@${msg.from.username}`;
    }

    const adminChatId = '6498144305'; // Replace with the admin's chat ID
    const userMessage = `Order #${requestCounter}:\n\nService: ${userData[userId].service}\nTopic: ${userData[userId].topic}\nLanguage: ${userData[userId].language}\nPages: ${userData[userId].pages}\nDeadline: ${userData[userId].deadline}\nName: ${userData[userId].name}\nContact Number: ${userData[userId].contact}\nTelegram Address: ${userData[userId].address}`;
    bot.sendMessage(adminChatId, userMessage);
    bot.sendMessage(chatId, 'Your order has been successfully submitted. Please wait for the operator's response.');
    requestCounter++;
    delete userData[userId];
  }
});

module.exports = bot;
