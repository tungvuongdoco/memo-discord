require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const TextToSpeech = require('@google-cloud/text-to-speech');

const prefix = process.env.PREFIX; // Tiền tố cho các lệnh của bot

// Import component DiscordGuideList
import liveGI from './content/LiveGenshin';
import DailyGenshin from './content/DailyGenshin';
import DiscordGuideList from './content/DiscordGuideList';
import TextToSpeechHandler from './content/TextToSpeechHandler';

client.on('message', async (message) => {
  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'help' || command === 'h' ) { // Đăng ký lệnh 'help'
      const helpMessage = 'Đây là danh sách các hướng dẫn:\n';
      message.channel.send(helpMessage);
      message.channel.send(<DiscordGuideList />); // Gửi phản hồi với danh sách hướng dẫn
    }  else if (command === 'n' || command === 'noi') {
      if (args.length === 0) {
        message.channel.send('Bạn chưa nhập nội dung!');
      } else {
        const text = args.join(' ');
        const handler = new TextToSpeechHandler(message, text);
        await handler.speak();
      }
    } else if (command === 'cn' || command === 'changename') { // đăng ký lệnh
      const text = args.join(' ');
      const newNickname = text; // Đặt biệt danh mới tại đây
      message.member.setNickname(newNickname)
          .then(() => {
            message.reply(`Đã đổi biệt danh thành ${newNickname}`);
          })
          .catch(error => {
            console.error(error);
            message.reply('Đổi biệt danh thất bại');
          });
    } else if (command === 'avatar' || command === 'a') {
      const user = message.mentions.users.first(); // Lấy người dùng được tag
      if (user) {
        const avatarURL = user.avatarURL({ format: 'png', dynamic: true, size: 4096 }); // Lấy link đến hình đại diện (avatar) của người dùng đó
        if (avatarURL) {
          message.channel.send(`${user.username}'s avatar: ${avatarURL}`);
        } else {
          message.channel.send(`${user.username} doesn't have an avatar!`);
        }
      } else {
        message.channel.send('You need to tag a user to check their avatar!');
      }
    } else if (command === 'daily' || command === 'd') {
      await DailyGenshin.execute(message, args);
    }  else if (command === 'livegi' || command === 'livegenshin') {
      liveGI(message, args);
    }
  }
});

client.login(process.env.TOKEN);