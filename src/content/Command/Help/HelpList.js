import React from 'react';

function HelpList(message) {
  const dataBody = [
    { name: '******** `Lệnh cơ bản` ********', value: `Chi tiết:` },
    { name: 'Danh sách lệnh:', value: "`t!help` hoặc `t!h`", inline: true },
    { name: 'Chào bot:', value: "`t!hello`", inline: true },
    { name: '******** `Lệnh của bạn` ********', value: `Chi tiết:` },
    { name: 'Đổi biệt danh:', value: "`t!cn` + tên", inline: true },
    { name: 'Đổi bot gọi:', value: "`t!cm` + tên", inline: true },
    { name: 'Ảnh đại diện: `t!avatar` hoặc `t!a`', value: "Nếu muốn xem ảnh của người khác thì thêm tag tên người khác VD: `t!a @Tib`" },
    { name: '******** `Lệnh của nghe nhạc` ********', value: `Chi tiết:` },
    { name: 'Phát bài hát:', value: "`t!play` hoặc `t!p` + `tên` hoặc `link`" },
    { name: 'Tạm dừng bài hát:', value: "`t!pause`", inline: true },
    { name: 'Danh sách phát:', value: "`t!pl`", inline: true },
    { name: 'Xóa bài hát:', value: "`t!remote` hoặc `t!r` + `số`" },
    { name: 'Thêm yêu thích:', value: "`t!playlike`  + `tên` hoặc `link`" },
    { name: 'Danh sách yêu thích:', value: "`t!pll`", inline: true },
    { name: 'Xóa khỏi yêu thích:', value: "`t!remotelike` hoặc `t!rl` + `số`", inline: true },
    { name: '- Ghi chú: ', value: "Số là số thứ tự trong danh sách đối với danh sách phát dùng `t!pl` đối với danh sách yêu thích dùng `t!pll` để xem" },
    { name: '******** `Lệnh của kênh chát` ********', value: `Chi tiết:` },
    { name: 'Chào mừng đến kênh chát:', value: "`t!welecom` + `nội dung`"},
    { name: 'Tạm biệt rời kênh chát:', value: "`t!bye` + `nội dung`"},
    { name: 'Chọn kênh đổi tên:', value: "`t!ccn`", inline: true },
    { name: 'Chọn kênh đổi bot gọi:', value: "`t!ccl`", inline: true },
    { name: 'Chọn kênh sử dụng nhạc:', value: "`t!cms`", inline: true },
    { name: '- Ghi chú: ', value: "Đối với câu lệnh phần `Lệnh của kênh chát` thì muốn sử dụng tính năng này ở đâu thì sử dụng ở phòng chát ấy.!" },
  ];

  const exampleEmbed = {
    color: 0xFFC0CB,
    title: 'Cách sử dụng bot Tib-chan',
    url: 'https://cdn.discordapp.com/avatars/762346326431498281/2af2d19a26d6fe38be1bf124eccca8ee.png?size=4096',
    author: {
      name: 'Tib-chan',
      icon_url: 'https://cdn.discordapp.com/avatars/762346326431498281/2af2d19a26d6fe38be1bf124eccca8ee.png?size=4096',
      url: 'https://discord.js.org',
    },
    thumbnail: {
      url: 'https://cdn.discordapp.com/avatars/762346326431498281/2af2d19a26d6fe38be1bf124eccca8ee.png?size=4096',
    },
    fields: dataBody,
    timestamp: new Date().toISOString(),
    footer: {
      text: 'Bot hoàn toàn miễn phí nên để đóng góp ý kiến vui lòng gửi đến email: "mintungit@gmail.com" xin chân thành cảm ơn!',
    }
  };

  const tagMessage = `<@${message.author.id}>`;
  message.channel.send({ content: tagMessage, embeds: [exampleEmbed] });
}

export default HelpList;