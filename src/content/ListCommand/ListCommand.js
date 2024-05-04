import HelpList from '../Command//HelpList';
import ChangeName from '../Command/ChangeName';
import Avatar from '../Command/Avatar';
import Weather from '../Command/Weather';
import Music from '../Command/Music';
import CallMe from '../Command/CallMe';
import City from '../Command/City';
import Love from '../Command/Love';
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
      case "hi":
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
    case "changename":
      case "cn":
        ChangeName(message, args, dataUser);
        break;
    case "callme":
      case "cm":
        CallMe(message, args, dataUser)
      break;
    case "city":
      case "ct":
        City(message, args, dataUser)
      break;
    case "avatar":
      case "av":
        Avatar(message, dataUser);
        break;
    case "love":
      case "l":
        Love(message, args, dataUser)
        break;
    case "music":
      case "m":
        Music(message, args, dataUser)
        break;
    case "remotemusic":
      case "rm":
        Music(message, args, dataUser)
        break;
    case "play":
      case "p":
        Music(message, args, dataUser)
        break;
    // case "weather":
    //   case "we":
    //     Weather(message, dataUser || {city: 'Thanh Hóa'}, args);
    //     break;
  }
}

export default ListCommand;