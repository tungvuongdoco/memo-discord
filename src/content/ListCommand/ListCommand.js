import HelpList from '../Command//HelpList';
import ChangeName from '../Command/ChangeName';
import Avatar from '../Command/Avatar';
import Weather from '../Command/Weather';

function ListCommand(message, prefix) {
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  switch (command) {
    case "help":
      case "h":
        HelpList(message);
        break;
    case "changename":
      case "cn":
        ChangeName(message, args, {});
        break;
    case "callme":
      case "cm":
      const exampleEmbed = {
        color: 0xFFC0CB,
        title: `Tính năng này Tib-chan đang học, nên sau mới sử dụng được nhé !!`,
        timestamp: new Date().toISOString(),
      };
      const tagMessage = `<@${message.author.id}>`;
      message.channel.send({ content: tagMessage, embeds: [exampleEmbed] });
      break;
    case "avatar":
      case "a":
        Avatar(message, {});
        break;
    case "weather":
      case "we":
        Weather(message, {city: "Thanh Hóa"});
        break;
  }
}

export default ListCommand;