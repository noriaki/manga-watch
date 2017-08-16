const unfollowHandler = User => (event) => {
  const identifier = event.source.userId;
  console.log('[unfollow] UserId: %s', identifier);
  User.findOneAndUpdate(
    { identifier }, { identifier, active: false }, { new: true, upsert: true }
  ).then(user => console.log('Store user (to inactive): ', user.id));
}

module.exports = unfollowHandler;
