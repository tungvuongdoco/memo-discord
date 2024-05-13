import * as settingController from '../../../server/api/Setting/setting.controller';

export default async function Chat(message, args) {
  const text = args.join(' ');
  const newBye = text;

  const getChanelId = newChanelInfo.match(/<#(\d+)>/);

  const getRoleId = newChanelInfo.match(/<@&(\d+)>/);

  const getUserId = newChanelInfo.match(/<@(\d+)>/);

  const content = newChanelInfo.replace(/<#[^\s>]*>|<@&[^\s>]*>/g, '').trim();

  let channelId = null;
  let roleId = null;
  let userId = null;

  if(getChanelId && getChanelId.length === 2){
    channelId = getChanelId[1]
  }
  if(getRoleId && getRoleId.length === 2){
    roleId = getRoleId[1]
  }
  if(getUserId && getUserId.length === 2){
    userId = getUserId[1]
  }

  if(channelId && (roleId || userId) && content){
    title = "Thông báo 🎉️🎉️🎉️";
    const exampleEmbed = {
        color: 0xFFC0CB,
        title: title,
        author: {
          name: content,
          url: 'https://discord.js.org',
        },
        timestamp: new Date().toISOString(),
    };
    const tagMessage = roleId ? `<@&${roleId}>` : `<@${userId}>`;
    const channel = client.channels.cache.get(match[1]);

    const sentMessage = await channel.send({ embeds: [exampleEmbed] });
    }
}