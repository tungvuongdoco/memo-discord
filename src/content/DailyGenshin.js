// DailyCommand.js

const axios = require('axios');

class DailyCommand {
  static async execute(message, args) {
    const uid = args[0]; // Lấy UID từ tham số đầu tiên
    if (!uid) {
      message.channel.send('Bạn chưa nhập UID!');
      return;
    }

    // Gửi yêu cầu đến API của trang web https://genshin.dev/ để lấy thông tin về số lần thực hiện nhiệm vụ Daily
    const response = await axios.get(`https://api.genshin.dev/dailies/${uid}`);
    const data = response.data;

    if (!data || data.status === 'error') {
      message.channel.send('Không tìm thấy thông tin về UID này!');
      return;
    }

    // Trả về kết quả cho người dùng thông qua Bot Discord
    message.channel.send(`Số lần thực hiện nhiệm vụ Daily của UID ${uid} trong ngày hôm nay: ${data.data.length}`);
  }
}

module.exports = DailyCommand;