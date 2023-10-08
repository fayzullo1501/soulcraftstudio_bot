// 6647221838:AAFxmmP7u5K2MsjlfHWoRsRjNe_5gUmLgX0
const TelegramBot = require('node-telegram-bot-api');

const chatContext = {};

const bot = new TelegramBot('6647221838:AAFxmmP7u5K2MsjlfHWoRsRjNe_5gUmLgX0', { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Привет! Я бот для создания презентаций, оферт, резюме и многое другое.');
  const mainMenuKeyboard = {
    reply_markup: {
      keyboard: [
        [{ text: '🌐 Язык' }],
        [{ text: '💼 Услуги' }],
        [{ text: '💬 Чат с оператором' }],
      ],
    },
  };
  chatContext[chatId] = { menu: 'main' };
  bot.sendMessage(chatId, 'Выберите действие:', mainMenuKeyboard);
});

bot.onText(/🌐 Язык/, (msg) => {
  const chatId = msg.chat.id;
  const languageKeyboard = {
    reply_markup: {
      keyboard: [
        [{ text: '🇷🇺 Русский' }],
        [{ text: '🇬🇧 Английский' }],
        [{ text: '🇺🇿 Узбекский' }],
        [{ text: '⬅️ Назад' }],
      ],
    },
  };
  chatContext[chatId].menu = 'language';
  bot.sendMessage(chatId, 'Выберите язык:', languageKeyboard);
});

bot.onText(/💼 Услуги/, (msg) => {
  const chatId = msg.chat.id;
  const servicesKeyboard = {
    reply_markup: {
      keyboard: [
        [{ text: '📊 Презентация' }, { text: '📄 Оферта' }, { text: '📝 Резюме' }],
        [{ text: '📢 Флаер' }, { text: '🎨 Баннер' }, { text: '📖 Журнал' }],
        [{ text: '📚 Буклет' }, { text: '🖌️ UX/UI дизайн' }, { text: '💼 Лого' }],
        [{ text: '📱 СММ' }, { text: '📇 Визитка' }],
        [{ text: '⬅️ Назад' }],
      ],
    },
  };
  chatContext[chatId].menu = 'services';
  bot.sendMessage(chatId, 'Выберите услугу:', servicesKeyboard);
});

// Добавьте обработчики для выбора услуг
bot.onText(/📊 Презентация/, (msg) => {
  const chatId = msg.chat.id;
  const pricesKeyboard = {
    reply_markup: {
      keyboard: [
        [{ text: '1 тариф (+10 страниц) - 15,000 сум' }],
        [{ text: '2 тариф (+20 страниц) - 25,000 сум' }],
        [{ text: '3 тариф (+30 страниц) - 35,000 сум' }],
        [{ text: '⬅️ Назад' }],
      ],
    },
  };
  chatContext[chatId].menu = 'prices_presentation';
  bot.sendMessage(chatId, 'Выберите цену для Презентации:', pricesKeyboard);
});

// Добавьте обработчики для выбора услуг Оферта
bot.onText(/📄 Оферта/, (msg) => {
    const chatId = msg.chat.id;
    const pricesKeyboard = {
      reply_markup: {
        keyboard: [
          [{ text: 'От 15,000 сумов' }],
          [{ text: '⬅️ Назад' }],
        ],
      },
    };
    chatContext[chatId].menu = 'prices_presentation';
    bot.sendMessage(chatId, 'Выберите цену для Оферты:', pricesKeyboard);
  });

// Добавьте обработчики для выбора Резюме
bot.onText(/📝 Резюме/, (msg) => {
    const chatId = msg.chat.id;
    const pricesKeyboard = {
      reply_markup: {
        keyboard: [
          [{ text: 'От 15,000 сумов' }],
          [{ text: '⬅️ Назад' }],
        ],
      },
    };
    chatContext[chatId].menu = 'prices_presentation';
    bot.sendMessage(chatId, 'Выберите цену для Резюме:', pricesKeyboard);
  });

// Добавьте обработчики для выбора Флаер
bot.onText(/📢 Флаер/, (msg) => {
    const chatId = msg.chat.id;
    const pricesKeyboard = {
      reply_markup: {
        keyboard: [
          [{ text: 'От 75,000 сумов' }],
          [{ text: '⬅️ Назад' }],
        ],
      },
    };
    chatContext[chatId].menu = 'prices_presentation';
    bot.sendMessage(chatId, 'Выберите цену для Флаера:', pricesKeyboard);
  });

// Добавьте обработчики для выбора Баннер
bot.onText(/🎨 Баннер/, (msg) => {
    const chatId = msg.chat.id;
    const pricesKeyboard = {
      reply_markup: {
        keyboard: [
          [{ text: 'От 75,000 сумов' }],
          [{ text: '⬅️ Назад' }],
        ],
      },
    };
    chatContext[chatId].menu = 'prices_presentation';
    bot.sendMessage(chatId, 'Выберите цену для Баннера:', pricesKeyboard);
  });


// Добавьте обработчики для выбора Журнал
bot.onText(/📖 Журнал/, (msg) => {
    const chatId = msg.chat.id;
    const pricesKeyboard = {
      reply_markup: {
        keyboard: [
          [{ text: 'От 75,000 сумов' }],
          [{ text: '⬅️ Назад' }],
        ],
      },
    };
    chatContext[chatId].menu = 'prices_presentation';
    bot.sendMessage(chatId, 'Выберите цену для Журнала:', pricesKeyboard);
  });


// Добавьте обработчики для выбора Буклет
bot.onText(/📚 Буклет/, (msg) => {
    const chatId = msg.chat.id;
    const pricesKeyboard = {
      reply_markup: {
        keyboard: [
          [{ text: 'От 75,000 сумов' }],
          [{ text: '⬅️ Назад' }],
        ],
      },
    };
    chatContext[chatId].menu = 'prices_presentation';
    bot.sendMessage(chatId, 'Выберите цену для Буклета:', pricesKeyboard);
  });


// Добавьте обработчики для выбора UX/UI дизайн
bot.onText(/🖌️ UX\/UI дизайн/, (msg) => {
    const chatId = msg.chat.id;
    const pricesKeyboard = {
      reply_markup: {
        keyboard: [
          [{ text: 'От 500,000 сумов' }],
          [{ text: '⬅️ Назад' }],
        ],
      },
    };
    chatContext[chatId].menu = 'prices_uxui';
    bot.sendMessage(chatId, 'Выберите цену для UX/UI дизайна:', pricesKeyboard);
  });



// Добавьте обработчики для выбора Лого
bot.onText(/💼 Лого/, (msg) => {
    const chatId = msg.chat.id;
    const pricesKeyboard = {
      reply_markup: {
        keyboard: [
          [{ text: 'От 75,000 сумов' }],
          [{ text: '⬅️ Назад' }],
        ],
      },
    };
    chatContext[chatId].menu = 'prices_presentation';
    bot.sendMessage(chatId, 'Выберите цену для Лого:', pricesKeyboard);
  });


// Добавьте обработчики для выбора СММ
bot.onText(/📱 СММ/, (msg) => {
    const chatId = msg.chat.id;
    const pricesKeyboard = {
      reply_markup: {
        keyboard: [
          [{ text: 'От 2,000,000 сумов' }],
          [{ text: '⬅️ Назад' }],
        ],
      },
    };
    chatContext[chatId].menu = 'prices_presentation';
    bot.sendMessage(chatId, 'Выберите цену для СММ:', pricesKeyboard);
  });

// Добавьте обработчики для выбора Визитка
bot.onText(/📇 Визитка/, (msg) => {
    const chatId = msg.chat.id;
    const pricesKeyboard = {
      reply_markup: {
        keyboard: [
          [{ text: 'От 75,000 сумов' }],
          [{ text: '⬅️ Назад' }],
        ],
      },
    };
    chatContext[chatId].menu = 'prices_presentation';
    bot.sendMessage(chatId, 'Выберите цену для Визитки:', pricesKeyboard);
  });

// Добавьте обработчики для выбора цен и других услуг
bot.onText(/⬅️ Назад/, (msg) => {
  const chatId = msg.chat.id;
  const currentMenu = chatContext[chatId].menu;

  // Определяем текущий контекст чата и возвращаемся в соответствующее меню
  if (currentMenu === 'language') {
    // Возвращаемся в главное меню
    chatContext[chatId].menu = 'main';
    const mainMenuKeyboard = {
      reply_markup: {
        keyboard: [
          [{ text: '🌐 Язык' }],
          [{ text: '💼 Услуги' }],
          [{ text: '💬 Чат с оператором' }],
        ],
      },
    };
    bot.sendMessage(chatId, 'Выберите действие:', mainMenuKeyboard);
  } else if (currentMenu === 'services' || currentMenu === 'prices_presentation' || currentMenu === 'prices_offer') {
    // Возвращаемся в меню "Услуги"
    chatContext[chatId].menu = 'services';
    const servicesKeyboard = {
      reply_markup: {
        keyboard: [
          [{ text: '📊 Презентация' }, { text: '📄 Оферта' }, { text: '📝 Резюме' }],
          [{ text: '📢 Флаер' }, { text: '🎨 Баннер' }, { text: '📖 Журнал' }],
          [{ text: '📚 Буклет' }, { text: '🖌️ UX/UI дизайн' }, { text: '💼 Лого' }],
          [{ text: '📱 СММ' }, { text: '📇 Визитка' }],
          [{ text: '⬅️ Назад' }],
        ],
      },
    };
    bot.sendMessage(chatId, 'Выберите услугу:', servicesKeyboard);
  }
});

// Обработчики для выбора цен
bot.onText(/1 - 15,000 сум/, (msg) => {
  const chatId = msg.chat.id;
  const currentMenu = chatContext[chatId].menu;

  if (currentMenu === 'prices_presentation') {
    // Здесь можно добавить логику для выбора цены "1 - 15,000 сум" для Презентации
    bot.sendMessage(chatId, 'Вы выбрали цену "1 - 15,000 сум" для Презентации.');
  } else if (currentMenu === 'prices_offer') {
    // Здесь можно добавить логику для выбора цены "1 - 15,000 сум" для Оферты
    bot.sendMessage(chatId, 'Вы выбрали цену "1 - 15,000 сум" для Оферты.');
  }
});

// Продолжайте добавлять обработчики для других услуг и цен











