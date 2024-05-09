import * as settingController from '../../../server/api/Setting/setting.controller';

export default async function Bye(message, args) {
  const text = args.join(' ');
  const newBye = text;

  const regex = /<#(\d+)> (.*)/;
  const match = regex.exec(newBye); 

  let title = "Cài đặt `Tạm biệt` thất bại !!";
  let fields = []

  if(match && match[1] && match[2]){
    title = "Cài đặt `Tạm biệt` thành công";
    fields.push({ name: '- Lời tạm biệt', value: "`"+ match[2] +"`",})

    await settingController.update(message.guildId, { chanel_goodbye: match[1], content_goodbye: match[2] });
  } else{ 
    fields.push({ name: '- Vui lòng chọn kênh gửi tin nhắn', value: "Chọn kênh bằng cách dùng `#` và tìm đến kênh nhận tin nhắn",})
    fields.push({ name: '- Vui lòng nhập nội dung lời tạm biệt', value: "Nhấn 1 phím cách sau khi chọn kênh và viết nội dung vào",})
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