import React from 'react';
import axios from 'axios';
import { WEATHER } from '../../constants/CONSTANTS';

const dotenv = require('dotenv');
require('dotenv').config();

async function Weather(message, dataUser) {
  const API_KEY = process.env.API_KEY_WEATHER; // Thay YOUR_API_KEY bằng khóa API của bạn từ OpenWeatherMap

  const content = async () => {
    try {
      let response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${dataUser.city}&appid=${API_KEY}&units=metric&lang=vi`);
      response =  response.data;
      return [
        { name: '- Nhiệt độ hiện tại:', value: `${response?.main?.temp }` },
        { name: '- Nhiệt độ:', value: `${response?.main?.temp_min} - ${response?.main?.temp_max}`},
        { name: '- Tầm nhìn:', value: `${response?.visibility}` },
        { name: '- Tốc độ gió:', value: `${response?.wind?.speed}` },
        { name: '- Mây che phủ:', value: `${response?.clouds?.all >= 70 ? "Nhiều mây" : response?.clouds?.all >= 30 ? "Bình thường" : "Ít mây"}` },
      ]
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu thời tiết:', error);
      return {
        name: 'Lỗi ', value: `Tib-chan không thể lấy được thời tiết hôm của ${dataUser ? dataUser.callMe + '! ' : 'bạn'} :((`
      }
    }
  }
  
  const dataBody = await content()

  const exampleEmbed = {
    color: 0x0099ff,
    title: `Thời tiết hôm nay tại ${dataUser?.city}`,
    fields: dataBody,
    timestamp: new Date().toISOString(),
  };
  const tagMessage = `<@${message.author.id}>`;
  message.channel.send({ content: tagMessage, embeds: [exampleEmbed] });
}

export default Weather;