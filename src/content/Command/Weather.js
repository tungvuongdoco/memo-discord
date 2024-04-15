import React from 'react';
import axios from 'axios';
import { WEATHER } from '../../constants/CONSTANTS';

const dotenv = require('dotenv');
require('dotenv').config();

async function Weather(message, dataUser, args) {
  const API_KEY = process.env.API_KEY_WEATHER; // https://developer.accuweather.com/

  const text = args.join(' ');
  const newWether = text;

  const content = async () => {
    try {
      let id_city = dataUser.id_city
      if(newWether){
        const q = newWether.replace(/ /g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        let responseCity = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${q}`);
        responseCity = responseCity.data
        console.log(responseCity[0], "responseCity[0]");
        if(responseCity && responseCity[0]){
          id_city = responseCity[0].Key
        }
      }
      console.log(id_city, "id_city");
      let response = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${id_city}?apikey=${API_KEY}&language=vi`);
      response =  response.data[0] || {};
      return {
        data: response,
        weather: [
          { name: '- Nhiệt độ hiện tại:', value: `${response?.Temperature?.Metric?.Value } °C` },
          { name: '- Có mưa không:', value: `${response?.HasPrecipitation ? "Có" : "Không"}` },
          { name: '- Thời gian:', value: `${response?.IsDayTime ? "Thời tiết ban ngày": "Thời tiết ban đêm"}` },
        ]
      }
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu thời tiết:', error);
      return {
        data: null,
        weather: [
          {
            name: 'Lỗi Lỗi ....! ', value: `Tib-chan không thể lấy được thời tiết hôm của ${dataUser ? dataUser.call_me + '! ' : 'bạn'} :((`
          }
        ]
      }
    }
  }
  
  const dataBody = await content()

  let exampleEmbed = {
    color: 0x0099ff,
    title: `Hôm nay tại ${newWether || dataUser?.city} trời ${dataBody?.data?.WeatherText}, ${dataUser?.call_me || 'bạn'} ${WEATHER[dataBody?.data?.WeatherText]?.label || ''}`,
    fields: dataBody.weather,
    timestamp: new Date().toISOString(),
  };

  if(!dataUser?.city && !newWether){
    delete exampleEmbed.fields;
    exampleEmbed.title = `${dataUser ? dataUser.call_me + ' ' : 'Bạn'} chưa cho Tib-chan biết địa chỉ :((`
  }

  const tagMessage = `<@${message.author.id}>`;
  message.channel.send({ content: tagMessage, embeds: [exampleEmbed] });
}

export default Weather;