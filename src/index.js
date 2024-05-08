import React from 'react';
import axios from 'axios';
import schedule from 'node-schedule';
import { WEATHER } from './constants/CONSTANTS';
import * as userController from '../src/server/api/User/user.controller';

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
const prefix = 't!';
const token = process.env.TOKEN;

const express = require('express');
import ListCommand from '../src/content/ListCommand/ListCommand';

client.on('messageCreate', async (message) => {
  if (message.content.startsWith(prefix)) {
    console.log(message, "message");
    return ListCommand(message, prefix, client);
  }
});

// schedule.scheduleJob('06 11 * * *', async () => {
//   const arrUser = await userController.getAllUser();

//   if(arrUser.length > 0){
//     arrUser.map( async (item) => {
//       const API_KEY = process.env.API_KEY_WEATHER; // Thay YOUR_API_KEY bằng khóa API của bạn từ OpenWeatherMap
//       const dataUser = item;
//       const content = async () => {
//         try {
//           let response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${dataUser?.city || 'Thanh Hóa'}&appid=${API_KEY}&units=metric&lang=vi`);
//           response = response.data;
    
//           return {
//             data: response,
//             weather: [
//               { name: '- Nhiệt độ hiện tại:', value: `${response?.main?.temp } °C` },
//               { name: '- Tầm nhìn:', value: `${response?.visibility}` },
//               { name: '- Tốc độ gió:', value: `${response?.wind?.speed}` },
//               { name: '- Mây che phủ:', value: `${response?.clouds?.all >= 70 ? "Nhiều mây" : response?.clouds?.all >= 30 ? "Bình thường" : "Ít mây"}` },
//             ]
//           }
    
//         } catch (error) {
//           console.error('Lỗi khi tải dữ liệu thời tiết:', error);
//           return {
//             data: null,
//             weather: [
//               {
//                 name: 'Lỗi Lỗi ....! ', value: `Tib-chan không thể lấy được thời tiết hôm của ${dataUser ? dataUser.call_me + '! ' : 'bạn'} :((`
//               }
//             ]
//           }
//         }
//       };
    
//       const channel = client.channels.cache.get(process.env.CHANNEL_ID);
    
//       if (channel) {
//           const dataBody = await content();
    
//           const exampleEmbed = {
//             color: 0x0099ff,
//             title: `Hôm nay tại ${dataUser?.city} trời ${dataBody?.data?.weather[0]?.description}, ${dataUser?.call_me || 'bạn'} ${WEATHER[dataBody?.data?.weather[0]?.main]?.label || ''}`,
//             fields: dataBody.weather,
//             timestamp: new Date().toISOString(),
//           };
//           const tagMessage = dataUser.id ?`<@${dataUser.id}>` : '';
//           channel.send({ embeds: [exampleEmbed] });
//       } else {
//           console.log("Kênh không tồn tại hoặc Tib-chan không có quyền truy cập vào kênh.");
//       }
//     })
//   }
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