const axios = require('axios');
const Discord = require('discord.js');

module.exports = {
  name: 'livegi',
  description: 'Live Genshin Impact',
  async execute(message, args) {
    try {
      // Gửi yêu cầu đến API của trang web https://genshin.gg/ để lấy thông tin về lịch livestream của Genshin Impact
      const response = await axios.get('https://genshin.gg/api/gi/live');
      const data = response.data;
      if (!data.live) {
        message.channel.send('Hiện tại chưa có lịch livestream của Genshin Impact.');
        return;
      }
      // Trả về thông tin lịch livestream và link cho người dùng thông qua Bot Discord
      const embed = new Discord.MessageEmbed()
        .setColor('#f2d1d1')
        .setTitle('Lịch live và link của Genshin Impact')
        .setDescription(`Thời gian: ${data.live.start_time}\nĐịa điểm: ${data.live.title}\nLink: ${data.live.url}`);
      message.channel.send(embed);
    } catch (error) {
      console.error(error);
      message.channel.send('Có lỗi xảy ra trong quá trình lấy thông tin lịch livestream của Genshin Impact.');
    }
  },
};