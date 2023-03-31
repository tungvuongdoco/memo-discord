const dotenv = require('dotenv');
require('dotenv').config();
const { Client } = require('discord.js');
const client = new Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  intents: [
    'GUILDS',
    'GUILD_MESSAGES',
    'DIRECT_MESSAGES',
    'GUILD_VOICE_STATES',
    'GUILD_MESSAGE_REACTIONS',
  ],
});
const prefix = 'm';
const token = process.env.TOKEN;

const express = require('express');
const liveGI = require('./content/LiveGenshin');
const DiscordGuideList = require('./content/DiscordGuideList');
const TextToSpeechHandler = require('./content/TextToSpeech');

client.on('messageCreate', async (message) => {
  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if (command === 'help' || command === 'h') {
      const helpMessage = 'Đây là danh sách các hướng dẫn:\n';
      message.channel.send(helpMessage);
      message.channel.send(DiscordGuideList()); // Gọi hàm DiscordGuideList
    } else if (command === 'n' || command === 'noi') {
      if (args.length === 0) {
        message.channel.send('Bạn chưa nhập nội dung!');
      } else {
        const text = args.join(' ');
        const handler = new TextToSpeechHandler(message, text);
        await handler.speak();
      }
    } else if (command === 'cn' || command === 'changename') {
      const text = args.join(' ');
      const newNickname = text;
      if (!message.guild.me.permissions.has('CHANGE_NICKNAME')) {
        message.reply('Bot không có quyền đổi biệt danh.');
        return;
      }
      message.member.setNickname(newNickname)
          .then(() => {
            message.reply(`Đã đổi biệt danh thành ${newNickname}`);
          })
          .catch(error => {
            console.error(error);
            message.reply('Đổi biệt danh thất bại');
          });
    } else if (command === 'avatar' || command === 'a') {
      const mentionedUser = message.mentions.users.first();
      const user = mentionedUser || message.author;
      if (user) {
        const avatarURL = user.avatarURL({ format: 'png', dynamic: true, size: 4096 });
        if (avatarURL) {
          message.channel.send(`**${user.username}'s avatar:**`);
          message.channel.send({ files: [avatarURL] });
        } else {
          message.channel.send(`${user.username} doesn't have an avatar!`);
        }
      } else {
        const avatarURL = message.author.avatarURL({ format: 'png', dynamic: true, size: 4096 });
        if (avatarURL) {
          message.channel.send(`**${user.username}'s avatar:**`);
          message.channel.send({ files: [avatarURL] });
        } else {
          message.channel.send('You need to tag a user to check their avatar!');
        }
      }
    }  else if (command === 'livegi' || command === 'livegenshin') {
      liveGI.execute(message);
    }
  }
});

client.login(token);

const app = express();

app.listen(5000, () => {
  console.log("Khởi động server thành công");
});