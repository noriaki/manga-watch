const { LineBot } = require('@noriaki/linebot/lib/LineBot');
const { TextMessage } = require('@noriaki/linebot/lib/LineMessages');
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
    const message = new TextMessage({
      text: '明日は週刊少年マガジン発売の日！',
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
