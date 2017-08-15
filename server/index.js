const { LineBot } = require('@3846masa/linebot/lib/LineBot');
const { createConnection } = require('./db');
const { userSchema } = require('./model');

const client = new LineBot({
  channelSecret: process.env.LINE_CHANNEL_SECRET,
  channelToken: process.env.LINE_CHANNEL_TOKEN,
});

const connection = createConnection();
const User = connection.model('User', userSchema);

client.on('webhook:follow', (ev) => {
  const identifier = ev.source.userId;
  console.log('[follow] UserId: %s', identifier);
  User.findOneAndUpdate(
    { identifier }, { identifier, active: true }, { new: true, upsert: true }
  ).then((user) => {
    console.log('Store user (to active): ', user.id);
  });
});

client.on('webhook:unfollow', (ev) => {
  const identifier = ev.source.userId;
  console.log('[unfollow] UserId: %s', identifier);
  User.findOneAndUpdate(
    { identifier }, { identifier, active: false }, { new: true, upsert: true }
  ).then((user) => {
    console.log('Store user (to inactive): ', user.id);
  });
});

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
