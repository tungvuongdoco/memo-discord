import React from 'react';

function HelpList(message) {
  const dataBody = [
    { name: '- Gọi bot để nhận trợ giúp:', value: `"thelp" hoặc "th"` },
    { name: '- Thay đổi biệt danh của bạn:', value: `"tchangename" hoặc "tcn" + tên bạn muốn` },
    { name: '- Thay đổi cách bot gọi bạn:', value: `"tcallme" hoặc "tcm" + tên bạn muốn` },
    { name: '- Xem ảnh đại diện của bạn:', value: `"tavatar" hoặc "ta"` },
    { name: '- Xem ảnh đại diện của người khác:', value: `"tavatar" hoặc "ta" + tag người đó` },
    { name: '- Xem dự báo thời tiết:', value: `"tweather" hoặc "twe"` },
  ]

  const exampleEmbed = {
    color: 0xFFC0CB,
    title: `Đây là các câu lệnh của Tib-chan`,
    fields: dataBody,
    timestamp: new Date().toISOString(),
  };
  const tagMessage = `<@${message.author.id}>`;
  message.channel.send({ content: tagMessage, embeds: [exampleEmbed] });
}

export default HelpList;