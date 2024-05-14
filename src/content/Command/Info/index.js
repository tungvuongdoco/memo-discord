import * as userController from '../../../server/api/User/user.controller';

export default async function Info(message, args) {
  const text = args.join(' ');
  const newInfo = text;

  const UserTagId = newInfo.match(/<@(\d+)>/);
  let userTagId = null;

  if(UserTagId && UserTagId.length === 2){
    userTagId = UserTagId[1]
  }

  let title = `Người dùng chưa giới thiệu !!`;
  let fields = [];
  const dataUser = await userController.getUserQuery(userTagId || message.author.id);
  const member = message.guild.members.cache.get(userTagId || message.author.id);
  if(dataUser){
    title = `Thông tin của ${member.user.displayName}`;
    
    Object.keys(dataUser).map(function(key) {
      let customKey = "";
      if(key === 'full_name'){
        customKey = "Họ tên"
      }
      if(key === 'date_of_birth'){
        customKey = "Sinh nhật"
      }
      if(key === 'city'){
        customKey = "Địa chỉ"
      }
      if(key === 'game'){
        customKey = "Game"
      }
      if(key === 'content'){
        customKey = "Thông tin riêng"
      }
      if(key === 'character'){
        customKey = "Tính cách"
      }
      if(key === 'gioi_tinh'){
        customKey = "Giới tính"
      }
      if(key === 'tuoi'){
        customKey = "Tuổi"
      }
      if(key === 'so_thich'){
        customKey = "Sở thích"
      }

      if(customKey && dataUser[key]){
        fields.push({ name: `- ${customKey}:`, value: `${dataUser[key]}`,})
      }
    })
    // fields.push({ name: '- Kênh giới thiệu', value: `<#${channelId}>`,})
    // fields.push({ name: '- Vai trò nhận được khi đã giới thiệu', value: `<@&${roleId}>`,})
  }

  const exampleEmbed = {
    color: 0xFFC0CB,
    title: title,
    fields: fields,
    thumbnail: {
      url: member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 4096 }),
    },
    timestamp: new Date().toISOString(),
  };
  const tagMessage = `<@${message.author.id}>`;
  message.channel.send({ content: tagMessage, embeds: [exampleEmbed] });
}