import * as userController from '../../server/api/User/user.controller';

export default async function Love(message, args, dataUser) {
  const text = args.join(' ');
  const newLove = text;

  const title = await userController.update(dataUser, {discord_id: message.author.id, love: newLove === 'true' ? true : false})
  
  const exampleEmbed = {
    color: 0xFFC0CB,
    title: title,
    timestamp: new Date().toISOString(),
  };
  const tagMessage = `<@${message.author.id}>`;
  message.channel.send({ content: tagMessage, embeds: [exampleEmbed] });
}