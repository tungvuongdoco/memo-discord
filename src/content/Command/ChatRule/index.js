import * as settingController from '../../../server/api/Setting/setting.controller';

export default async function ChatRule(message, args, client) {
  const text = args.join(' ');
  const newChat = text;

  const getChanelId = newChat.match(/<#(\d+)>/);


  const content = newChat.replace(/<#[^\s>]*>|<@&[^\s>]*>?/g, '').trim();

  let channelId = null;

  if(getChanelId && getChanelId.length === 2){
    channelId = getChanelId[1]
  }

  if(channelId && content){
    const title = `📋🚫 Điều luật khi tham gia vào ${message.guild.name} 🚫📋`;
    const exampleEmbed = {
        color: 0xFFC0CB,
        title: title,
        fields: [
          { name: '- Bạn vui lòng đọc và chấp nhành những nội quy dưới đây', value: content,}
        ],
        author: {
          name: 'Tib-chan',
          icon_url: 'https://cdn.discordapp.com/avatars/762346326431498281/2af2d19a26d6fe38be1bf124eccca8ee.png?size=4096',
          url: 'https://discord.js.org',
        },
        timestamp: new Date().toISOString(),
    };
    const channel = client.channels.cache.get(channelId);
    await channel.send({embeds: [exampleEmbed]});
  }
}