// 6647221838:AAFxmmP7u5K2MsjlfHWoRsRjNe_5gUmLgX0   6498144305

const TelegramBot = require('node-telegram-bot-api');
const token = '6647221838:AAFxmmP7u5K2MsjlfHWoRsRjNe_5gUmLgX0'; // Replace with your token
const bot = new TelegramBot(token, { polling: true });

const serviceKeyboard = [
  [{ text: '📊 Prezentatsiya ( Slayd )' }, { text: '📝 Obyektivka' }],
  [{ text: '📄 Resyume' }, { text: '📇 Vizitka' }],
];

const userData = {};
let requestCounter = 1;

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "Xush kelibsiz! Yo'nalishni tanlang:", {
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
      deadline: '', // Add a deadline field
      name: '',
      contact: '',
      address: '',
    };
  }

  if (!userData[userId].service) {
    if (serviceKeyboard.some((row) => row.some((item) => item.text === messageText))) {
      userData[userId].service = messageText;
      bot.sendMessage(chatId, 'Taqdimot mavzusini kiriting:');
    } else {
      bot.sendMessage(chatId, '');
    }
  } else if (!userData[userId].topic) {
    userData[userId].topic = messageText;
    bot.sendMessage(chatId, 'Taqdimot tilini kiriting:');
  } else if (!userData[userId].language) {
    userData[userId].language = messageText;
    bot.sendMessage(chatId, 'Taqdimotning necha varoqligini kiriting');
  } else if (!userData[userId].pages) {
    if (!isNaN(messageText)) {
      userData[userId].pages = parseInt(messageText);
      bot.sendMessage(chatId, 'Dedlayn kunini kiriting:'); // Prompt for the deadline date
    } else {
      bot.sendMessage(chatId, 'Taqdimotning yaroqli necha varoqligini kiriting:');
    }
  } else if (!userData[userId].deadline) {
    userData[userId].deadline = messageText;
    bot.sendMessage(chatId, 'Ism Familyangizni kiriting:');
  } else if (!userData[userId].name) {
    userData[userId].name = messageText;
    bot.sendMessage(chatId, 'Telefon raqamingizni kiriting:');
  } else if (!userData[userId].contact) {
    userData[userId].contact = messageText;

    if (msg.from.username) {
      userData[userId].address = `@${msg.from.username}`;
      const adminChatId = '6498144305'; // Replace with the admin's chat_id
      const userMessage = `Buyurtma № ${requestCounter}:\n\nServis: ${userData[userId].service}\nMavzu: ${userData[userId].topic}\nTil: ${userData[userId].language}\nVaroqlar soni: ${userData[userId].pages}\nDedlayn: ${userData[userId].deadline}\nFIO: ${userData[userId].name}\nTelefon raqami: ${userData[userId].contact}\nTelegram nik (adres): ${userData[userId].address}`;
      bot.sendMessage(adminChatId, userMessage);
      bot.sendMessage(chatId, 'Buyurtmangiz muvoffaqiyatli yuborildi. Operator javobini kuting!');
      requestCounter++;
    } else {
      const adminChatId = '6498144305'; // Replace with the admin's chat_id
      const userMessage = `Buyurtma № ${requestCounter}:\n\nServis: ${userData[userId].service}\nMavzu: ${userData[userId].topic}\nTil: ${userData[userId].language}\nVaroqlar soni: ${userData[userId].pages}\nDedlayn: ${userData[userId].deadline}\nFIO: ${userData[userId].name}\nTelefon raqami: ${userData[userId].contact}`;
      bot.sendMessage(adminChatId, userMessage);
      bot.sendMessage(chatId, 'Buyurtmangiz muvoffaqiyatli yuborildi. Operator javobini kuting!');
      requestCounter++;
    }

    delete userData[userId];
  }
});

module.exports = bot;

