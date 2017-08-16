const { ImagemapMessage } = require('@noriaki/linebot/lib/LineMessages');
const { ImagemapMessageAction } = require('@noriaki/linebot/lib/LineActions');

const followHandler = User => async (event) => {
  const identifier = event.source.userId;
  console.log('[follow] UserId: %s', identifier);
  const user = await User.findOneAndUpdate(
    { identifier }, { identifier, active: true }, { new: true, upsert: true }
  );
  await event.reply(new ImagemapMessage({
    baseUrl: imageURI,
    altText: '申し訳ありませんが非対応です。LINEバージョン6.7.0以上をご利用ください',
    baseSize: { width: 1040, height: 1540 },
    actions: magazineList.map((magazineName, i) => new ImagemapMessageAction({
      area: { x: 0, y: 420 + i * 160, width: 1040, height: 160 },
      text: `${magazineName}を通知OFF`,
    })),
  }));
  console.log('Store user (to active): ', user.id);
};

module.exports = followHandler;

const magazineList = [
  '週刊少年ジャンプ',
  '週刊少年マガジン',
  '週刊少年サンデー',
  '週刊少年チャンピオン',
  '週刊ヤングジャンプ',
  'モーニング',
  '週刊ヤングマガジン',
];
const imagePath = '/images/magazine-list-v01';
const imageURI = `https://${process.env.AWS_ASSETS_FQDN}${imagePath}`;
