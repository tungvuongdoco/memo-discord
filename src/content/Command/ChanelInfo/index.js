import * as settingController from '../../../server/api/Setting/setting.controller';

export default async function ChanelInfo(message, args, client) {
  const text = args.join(' ');
  const newChanelInfo = text;
  
  const getChanelId = newChanelInfo.match(/<#(\d+)>/);

  const getRoleId = newChanelInfo.match(/<@&(\d+)>/);

  const info_move = newChanelInfo.replace(/<#[^\s>]*>|<@&[^\s>]*>/g, '').trim();

  let channelId = null;
  let roleId = null;

  if(getChanelId && getChanelId.length === 2){
    channelId = getChanelId[1]
  }
  if(getRoleId && getRoleId.length === 2){
    roleId = getRoleId[1]
  }

  let title = "Cài đặt `Kênh giới thiệu` thất bại !!";
  let fields = []

  if(channelId && roleId){
    title = "Cài đặt `Kênh giới thiệu` thành công";
    fields.push({ name: '- Kênh giới thiệu', value: `<#${channelId}>`,})
    fields.push({ name: '- Vai trò nhận được khi đã giới thiệu', value: `<@&${roleId}>`,})

    await settingController.update(message.guildId, { chanel_info: channelId, role_info: roleId });

    const channel = client.channels.cache.get(channelId);

    const sentMessage = await channel.send({ embeds: [{
      color: 0xFFC0CB,
      title: "Mẫu giới thiệu bản thân",
      fields: [
        { name: '- Bạn vui lòng nhập thông tin như mẫu dưới đây', value: `
        ${info_move}
Tên: Họ tên
Giới tính: Nam/Nữ
Tuổi: 18
Sinh nhật: 12/01
Địa chỉ: Địa chỉ
Tình trạng: Độc thân / Đã kết hôn
Tính cách: Dễ gần ...
Sở thích: Game ...
        `,}
      ]
    }] });
    await sentMessage.pin();
  } else{ 
    fields.push({ name: '- Vui lòng chọn kênh giới thiệu', value: "Chọn kênh bằng cách dùng `#` và tìm đến kênh",})
    fields.push({ name: '- Vui lòng chọn vai trò khi đã giới thiệu', value: "Chọn kênh bằng cách dùng `@` và tìm đến vai trò",})
  }

  const exampleEmbed = {
    color: 0xFFC0CB,
    title: title,
    fields: fields,
    timestamp: new Date().toISOString(),
  };
  const tagMessage = `<@${message.author.id}>`;
  message.channel.send({ content: tagMessage, embeds: [exampleEmbed] });
}