import HelpList from '../Command/Help/HelpList';
import ChangeName from '../Command/ChangeName/ChangeName';
import Avatar from '../Command/Avatar/Avatar';
import Weather from '../Command/Weather';
import Music from '../Command/Music';
import CallMe from '../Command/CallMe/CallMe';
import City from '../Command/City';
import Love from '../Command/Love';
import Bye from '../Command/Bye/index';
import { getRandomGreeting } from '../../common/random';
import { HELLO, HELLO_LOVE } from '../../constants/CONSTANTS';
import * as userController from '../../server/api/User/user.controller';

async function ListCommand(message, prefix) {
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  const dataUser = await userController.getUserQuery(message.author.id);

  switch (command) {
    case "help":
      case "h":
        HelpList(message);
        break;
    case "hello":
      let title = ''
      if(!dataUser.love){
        title = getRandomGreeting(HELLO).replace(/\{0\}/g, dataUser?.call_me || 'bạn')
      } else{
        title = getRandomGreeting(HELLO_LOVE).replace(/\{0\}/g, dataUser?.call_me || 'anh')
      }
      const exampleEmbed = {
        color: 0xFFC0CB,
        title: title,
        timestamp: new Date().toISOString(),
      };
      const tagMessage = `<@${message.author.id}>`;
      message.channel.send({ content: tagMessage, embeds: [exampleEmbed] });
      break;

    case "changename":  // 
      case "cn":
        ChangeName(message, args, dataUser);
        break;
    case "callme":
      case "cm":
        CallMe(message, args, dataUser)
      break;
    case "avatar":
      case "a":
        Avatar(message, dataUser);
        break;

    
    case "play":
      case "p":
        break;
    case "pause":
      break;
    case "pl":
      break;
    case "remote":
      case "r":
        break;

    case "playlike":
      break;
    case "pll":
      break;
    case "remotelike":
      case "rl":
        break;
    
    case "welecom":
      break;
    case "bye":
      Bye(message, args, dataUser)
      break;
    case "cnn":
      break;
    case "cll":
      break; 
    case "cms":
      break; 
  }
}

export default ListCommand;