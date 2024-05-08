import * as userController from '../../../server/api/User/user.controller';

export default async function Music(message, args, dataUser) {
  const text = args.join(' ');
  const newMusic = text;

  
  
  const exampleEmbed = {
    color: 0xFFC0CB,
    title: title,
    timestamp: new Date().toISOString(),
  };
  const tagMessage = `<@${message.author.id}>`;
  message.channel.send({ content: tagMessage, embeds: [exampleEmbed] });
}