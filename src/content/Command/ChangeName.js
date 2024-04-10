function ChangeName(message, args, dataUser) {
  const text = args.join(' ');
  const newNickname = text;
  if (!message.guild.me.permissions.has('CHANGE_NICKNAME')) {
    message.reply('Tib-chan không có quyền đổi biệt danh.');
    return;
  }
  message.member.setNickname(newNickname)
    .then(() => {
      const exampleEmbed = {
        color: 0xFFC0CB,
        title: `Tib-chan đã đổi biệt danh của ${dataUser?.callMe || "bạn"} thành ${newNickname}. Cần gì ${dataUser?.callMe || "bạn"} hãy cứ gọi Tib-chan nhé :))`,
        timestamp: new Date().toISOString(),
      };
      const tagMessage = `<@${message.author.id}>`;
      message.channel.send({ content: tagMessage, embeds: [exampleEmbed] });
    })
    .catch(error => {
      console.error(error);
      message.reply(`Tib-chan không thể đổi được biệt danh của ${dataUser?.callMe || "bạn"}`);
    });
}

export default ChangeName;