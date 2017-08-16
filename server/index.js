const { LineBot } = require('@3846masa/linebot/lib/LineBot');
const { createConnection } = require('../commons/db');
const { userSchema } = require('../commons/model');

const followHandler = require('./handlers/follow');
const unfollowHandler = require('./handlers/unfollow');

const client = new LineBot({
  channelSecret: process.env.LINE_CHANNEL_SECRET,
  channelToken: process.env.LINE_CHANNEL_TOKEN,
});

const connection = createConnection();
const User = connection.model('User', userSchema);

client.on('webhook:follow', followHandler(User));
client.on('webhook:unfollow', unfollowHandler(User));

client.on('webhook:message', (ev) => {
  const message = ev.message;
  ev.reply(message);
});

const port = process.env.PORT || 3030;
client.listen(port, () => {
  console.log(`Start webhook server: PORT=${port}`);
});

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});
