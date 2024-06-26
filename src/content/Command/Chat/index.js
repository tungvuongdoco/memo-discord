import * as settingController from '../../../server/api/Setting/setting.controller';

export default async function Chat(message, args, client) {
  const text = args.join(' ');
  const newChat = text;

  const getChanelId = newChat.match(/<#(\d+)>/);

  const getRoleId = newChat.match(/<@&(\d+)>/);

  const getUserId = newChat.match(/<@(\d+)>/);

  const content = newChat.replace(/<#[^\s>]*>|<@&[^\s>]*>?/g, '').trim();

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
    const title = "Thông báo 🎉️🎉️🎉️";
    const exampleEmbed = {
        color: 0xFFC0CB,
        title: content,
        author: {
          name: title,
          icon_url: 'https://cdn.discordapp.com/avatars/762346326431498281/2af2d19a26d6fe38be1bf124eccca8ee.png?size=4096',
          url: 'https://discord.js.org',
        },
        timestamp: new Date().toISOString(),
    };
    const tagMessage = roleId ? `<@&${roleId}>` : `<@${userId}>`;
    const channel = client.channels.cache.get(channelId);

    const send = {}

    if(roleId || roleId){
      send['content'] = [tagMessage]
    }

    send['embeds'] = [exampleEmbed]
    await channel.send(send);
  }
}