import * as settingController from '../../../server/api/Setting/setting.controller';

export default async function Welecom(message, args) {
  const text = args.join(' ');
  const newBye = text;

  const regex = /<#(\d+)> (.*)/;
  const match = regex.exec(newBye); 

  let title = "Cài đặt `Chào mừng` thất bại !!";
  let fields = []

  if(match && match[1] && match[2]){
    title = "Cài đặt `Chào mừng` thành công";
    fields.push({ name: '- Lời chào mừng', value: "`"+ match[2] +"`",})

    await settingController.update(message.guildId, { chanel_welecom: match[1], content_welecom: match[2] });
  } else{ 
    fields.push({ name: '- Vui lòng chọn kênh gửi tin nhắn', value: "Chọn kênh bằng cách dùng `#` và tìm đến kênh nhận tin nhắn",})
    fields.push({ name: '- Vui lòng nhập nội dung lời chào mừng', value: "Nhấn 1 phím cách sau khi chọn kênh và viết nội dung vào",})
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