function Avatar(message, dataUser) {
  const mentionedUser = message.mentions.users.first();
  const user = mentionedUser || message.author;
  if (user) {
    const avatarURL = user.avatarURL({ format: 'png', dynamic: true, size: 4096 });
    if (avatarURL) {
      const exampleEmbed = {
        color: 0xFFC0CB,
        title: `**Ảnh đại diện của ${ dataUser?.discord_id && user.id === dataUser?.discord_id ? (dataUser?.call_me || user.username) : user.username} :**`,
        description: `<@${user.id}>`,
        image: {
          url: avatarURL,
        },
        timestamp: new Date().toISOString(),
      };
      const tagMessage = `<@${message.author.id}>`;
      message.channel.send({ content: tagMessage, embeds: [exampleEmbed] });
    } else {
      message.channel.send(`${user.username} không có hình đại diện !`);
    }
  } else {
    const avatarURL = message.author.avatarURL({ format: 'png', dynamic: true, size: 4096 });
    if (avatarURL) {
      const exampleEmbed = {
        color: 0xFFC0CB,
        title: `**Ảnh đại diện của ${message.author.username}:**`,
        image: {
          url: avatarURL,
        },
        timestamp: new Date().toISOString(),
      };
      const tagMessage = `<@${message.author.id}>`;
      message.channel.send({ content: tagMessage, embeds: [exampleEmbed] });
    } else {
      message.channel.send('Bạn cần gắn thẻ người dùng để kiểm tra hình đại diện của họ!');
    }
  }
}

export default Avatar;