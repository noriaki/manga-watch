const unfollowHandler = User => async (event) => {
  const identifier = event.source.userId;
  console.log('[unfollow] UserId: %s', identifier);
  const user = await User.findOneAndUpdate(
    { identifier }, { identifier, active: false }, { new: true, upsert: true }
  );
  console.log('Store user (to inactive): ', user.id);
}

module.exports = unfollowHandler;
