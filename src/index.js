import React from 'react';
import axios from 'axios';
import schedule from 'node-schedule';
import { WEATHER } from './constants/CONSTANTS';
import * as userController from '../src/server/api/User/user.controller';
import * as settingController from '../src/server/api/Setting/setting.controller';

const dotenv = require('dotenv');
require('dotenv').config();
const { Client } = require('discord.js');
const client = new Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  intents: [
    'GUILDS',
    'GUILD_MEMBERS',
    'GUILD_MESSAGES',
    'DIRECT_MESSAGES',
    'GUILD_VOICE_STATES',
    'GUILD_MESSAGE_REACTIONS',
  ],
});
const prefix = 't!';
const token = process.env.TOKEN;

const express = require('express');
import ListCommand from '../src/content/ListCommand/ListCommand';

client.on('messageCreate', async (message) => {
  if (message.content.startsWith(prefix)) {
    return ListCommand(message, prefix, client);
  }
});

client.on('guildMemberAdd', async(member) => {
  const setting = await settingController.getQuery(member.guild.id);

  if(setting && setting.chanel_welecom){
    const channel = client.channels.cache.get(setting.chanel_welecom);

    if (channel) {
      const avatarURL = member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 4096 });

      const dataBody = [
        { name: `${setting.content_welecom}`, value: "️ :confetti_ball: 💐💐💐 :confetti_ball: " },
      ]; 

      const tagMessage = member.user.id ?`<@${member.user.id}>` : '';
      const exampleEmbed = {
        color: 0x0099ff,
        title: `Chào mừng ${member.user.globalName} đến với ${member.guild.name}`,
        url: avatarURL,
        author: {
          name: member.user.globalName,
          icon_url: avatarURL,
          url: avatarURL,
        },
        thumbnail: {
          url: avatarURL,
        },
        fields: dataBody,
        timestamp: new Date().toISOString(),
      };
      
      channel.send({ content: tagMessage, embeds: [exampleEmbed] });
    }
  }
});

client.on('guildMemberRemove', async(member) => {
  const setting = await settingController.getQuery(member.guild.id);

  if(setting && setting.chanel_goodbye){
    const channel = client.channels.cache.get(setting.chanel_goodbye);
  
  if (channel) {
      const dataBody = [
        { name: `${setting.content_goodbye}`, value: "️🤧🤧🤧" },
      ]; 

      await userController.deleteUse(member.user.id);

      const avatarURL = member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 4096 });
      const exampleEmbed = {
        color: 0x0099ff,
        title: `Tạm biệt ${member.user.globalName}!!`,
        url: avatarURL,
        author: {
          name: member.user.globalName,
          icon_url: avatarURL,
          url: avatarURL,
        },
        thumbnail: {
          url: avatarURL,
        },
        fields: dataBody,
        timestamp: new Date().toISOString(),
      };
     
      channel.send({ embeds: [exampleEmbed] });
  }
  }
});

client.on('message', async(message) => {
  const userId = message.author.id;
  const setting = await settingController.getQuery(message.guild.id);

  if(setting){
    if (message.channel.id === setting.chanel_info) {
      const lines = message.content.split('\n');

      const data = {};
      lines.forEach(line => {
        const [key, value] = line.split(': ');
        let customKey = key;
        if(key === 'Họ tên' || key === 'Họ Tên' || key === 'họ tên' || key === 'ho ten' || key === 'ten' || key === 'Tên'){
          customKey = 'full_name';
        }
        if(key === 'Sinh nhật' || key === 'Sinh Nhật' || key === 'sinh nhật' || key === 'sinh nhat' || key === 'sinh'){
          customKey = 'date_of_birth';
        }
        if(key === 'Địa chỉ' || key === 'Địa Chỉ' || key === 'địa chỉ' || key === 'dia chỉ' || key === 'city'){
          customKey = 'city';
        }
        if(key === 'Game' || key === 'game'){
          customKey = 'game';
        }
        if(key === 'Tính cách' || key === 'Tính Cách' || key === 'tính cách' || key === 'tinh cach'){
          customKey = 'character';
        }
        if(key === 'Giới tính' || key === 'Giới Tính' || key === 'giới tính' || key === 'gioi tinh'){
          customKey = 'gioi_tinh';
        }
        if(key === 'Tuổi' || key === 'tuổi' || key === 'tuoi'){
          customKey = 'tuoi';
        }
        data[customKey] = value;
      });

      const user = await userController.getUserQuery(userId);

      let dataUser = {}

      if(data){
        if(data.full_name){
          dataUser['full_name'] = data.full_name;
          delete data.full_name;
        }
        if(data.date_of_birth){
          dataUser['date_of_birth'] = data.date_of_birth;
          delete data.date_of_birth;
        }
        if(data.city){
          dataUser['city'] = data.city;
          delete data.city;
        }
        if(data.game){
          dataUser['city'] = data.game;
          delete data.game;
        }
        if(data.character){
          dataUser['character'] = data.character;
          delete data.character;
        }
        if(data.gioi_tinh){
          dataUser['gioi_tinh'] = data.gioi_tinh;
          delete data.gioi_tinh;
        }
        if(data.tuoi){
          dataUser['tuoi'] = data.tuoi;
          delete data.tuoi;
        }

        Object.keys(data).map(function(key) {
          dataUser['content'] = `${dataUser.content ? dataUser.content + ", " : ""  }${key}: ${data[key]}`
        })
      }

      const editUser = await userController.updateInfo(user, {...dataUser, discord_id: userId})
      
      if(editUser){
        await message.react('💕');
        if(!user) {
          const member = message.guild.members.cache.get(userId);
          if (member) {
            const role = message.guild.roles.cache.get(setting.role_info);
  
            if (role) {
                try {
                    await member.roles.add(role);
                } catch (error) {
                    console.error("Lỗi khi thêm vai trò:", error);
                }
            } else {
                console.error("Không tìm thấy vai trò!");
            }
          }
        }
      }
    }
  }
});

// schedule.scheduleJob('06 11 * * *', async () => {
// });

client.login(token);

const app = express();

app.use(express.json());

//  Router
import userRouter from './server/api/User/user.router';
import config from './server/config/config';

config();

app.use('/api/users', userRouter);

const PORT = process.env.PORT || 1296;

app.listen(PORT, () => {
  console.log("Tib-chan đã thức dậy! Bây giờ sẽ bắt đầu công việc ngay :))");
});