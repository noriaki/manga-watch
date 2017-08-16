const { TextMessage } = require('@3846masa/linebot/lib/LineMessages');

const followHandler = User => (event) => {
  const identifier = event.source.userId;
  console.log('[follow] UserId: %s', identifier);
  User.findOneAndUpdate(
    { identifier }, { identifier, active: true }, { new: true, upsert: true }
  ).then((user) => {
    event.reply(new TextMessage({ text: 'thank you' }));
    console.log('Store user (to active): ', user.id);
  });
};

module.exports = followHandler;
