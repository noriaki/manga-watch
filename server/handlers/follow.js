const { TextMessage } = require('@noriaki/linebot/lib/LineMessages');

const followHandler = User => async (event) => {
  const identifier = event.source.userId;
  console.log('[follow] UserId: %s', identifier);
  const user = await User.findOneAndUpdate(
    { identifier }, { identifier, active: true }, { new: true, upsert: true }
  );
  await event.reply(new TextMessage({ text: 'thank you' }));
  console.log('Store user (to active): ', user.id);
};

module.exports = followHandler;
