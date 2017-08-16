const { LineBot } = require('@noriaki/linebot/lib/LineBot');
const { TemplateMessage } = require('@noriaki/linebot/lib/LineMessages');
const { createConnection } = require('../commons/db');
const { userSchema } = require('../commons/model');

// bot client
const client = new LineBot({
  channelSecret: process.env.LINE_CHANNEL_SECRET,
  channelToken: process.env.LINE_CHANNEL_TOKEN,
});

// db connection
const connection = createConnection();
const User = connection.model('User', userSchema);

// main
(async () => {
  const users = await User.find({ active: true });
  for (const user of users) {
    const message = new TemplateMessage({
      altText: '申し訳ありませんが非対応です。LINEバージョン6.7.0以上をご利用ください',
      template: {
        type: 'confirm',
        text: 'はじめの一歩今週お休みだよ！読んでる？',
        actions: [
          {
            type: 'message',
            label: 'はい',
            text: '読んでるよ！',
          },
          {
            type: 'message',
            label: 'いいえ',
            text: 'いまは読んでないなー',
          },
        ],
      },
    });
    await client.push(user.identifier, message);
    console.log('[send push] UserId: %s', user.identifier);
  }
})().then(() => process.exit()).catch(error => console.log(error));

// error handling
process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});
