import React from 'react';
import axios from 'axios';
import schedule from 'node-schedule';
import { WEATHER } from './constants/CONSTANTS';

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
const prefix = 't';
const token = process.env.TOKEN;

const express = require('express');
import ListCommand from '../src/content/ListCommand/ListCommand';

client.on('messageCreate', async (message) => {
  if (message.content.startsWith(prefix)) {
    return ListCommand(message, prefix, client);
  }
});

schedule.scheduleJob('0 7 * * *', async () => {
// schedule.scheduleJob('22 16 * * *', async () => { 
  // Thực hiện đoạn mã bạn muốn chạy vào mỗi ngày lúc 7h sáng ở đây
  const API_KEY = process.env.API_KEY_WEATHER; // Thay YOUR_API_KEY bằng khóa API của bạn từ OpenWeatherMap
  const dataUser = {
    city: "Thanh Hóa"
  };
  const content = async () => {
    try {
      let response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${dataUser?.city || 'Thanh Hóa'}&appid=${API_KEY}&units=metric&lang=vi`);
      response = response.data
      return `${dataUser.callMe ? dataUser.callMe + '! ' : ''}Hôm nay tại ${dataUser?.city || ''} có nhiệt độ ${response?.main?.temp} °C trời ${response?.weather[0]?.description}, ${dataUser?.callMe || 'bạn'} ${WEATHER[response?.weather[0]?.main]?.label || ''}`
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu thời tiết:', error);
      return `Lỗi Lỗi ....! Tib-chan không thể lấy được thời tiết hôm của ${dataUser ? dataUser.callMe + '! ' : 'bạn'} :((`
    }
  };

  const channel = client.channels.cache.get(process.env.CHANNEL_ID);

  if (channel) {
      const dataBody = await content();
      channel.send(dataBody);
  } else {
      console.log("Kênh không tồn tại hoặc Tib-chan không có quyền truy cập vào kênh.");
  }
});

client.login(token);

const app = express();

app.listen(5000, () => {
  console.log("Tib-chan đã thức dậy! Bây giờ sẽ bắt đầu công việc ngay :))");
});