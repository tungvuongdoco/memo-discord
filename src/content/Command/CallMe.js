import * as userController from '../../server/api/User/user.controller';

export default async function CallMe(message, args, dataUser) {
  const text = args.join(' ');
  const newCallMe = text;

  function capitalizeFirstLetterOfWords(str){
    return str.split(' ').map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
  }

  const title = await userController.update(dataUser, {discord_id: message.author.id, call_me: capitalizeFirstLetterOfWords(newCallMe)})
  
  const exampleEmbed = {
    color: 0xFFC0CB,
    title: title,
    timestamp: new Date().toISOString(),
  };
  const tagMessage = `<@${message.author.id}>`;
  message.channel.send({ content: tagMessage, embeds: [exampleEmbed] });
}