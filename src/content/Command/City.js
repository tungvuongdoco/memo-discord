import axios from 'axios';
import * as userController from '../../server/api/User/user.controller';

import { VIET_NAM_DISTRICTS } from '../../constants/CONSTANTS';

const dotenv = require('dotenv');
require('dotenv').config();

export default async function City(message, args, dataUser) {
  const API_KEY = process.env.API_KEY_WEATHER; // https://developer.accuweather.com/

  const text = args.join(' ');
  const newCity = text; 

  function capitalizeFirstLetterOfWords(str){
    return str.split(' ').map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
  }

  let response = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${capitalizeFirstLetterOfWords(newCity)}`);
  response = response.data
  let title = ''
  if(response && response.length > 0){
    title = await userController.update(dataUser, {discord_id: message.author.id, city: capitalizeFirstLetterOfWords(newCity), id_city: response[0].Key})
  } else {
    title = `Tib-chan đnag bị lỗi mạng, vui lòng thử lại sau vài phút nhé ${dataUser.call_me}!`
  }
  const exampleEmbed = {
    color: 0xFFC0CB,
    title: title,
    timestamp: new Date().toISOString(),
  };
  const tagMessage = `<@${message.author.id}>`;
  message.channel.send({ content: tagMessage, embeds: [exampleEmbed] });
}